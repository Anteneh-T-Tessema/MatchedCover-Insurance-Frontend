#!/bin/bash

# MatchedCover Frontend Deployment Script
# Usage: ./deploy.sh [environment] [version]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="matched-cover-frontend"
DOCKER_REGISTRY="your-registry.com"
DEFAULT_VERSION="latest"

# Parse arguments
ENVIRONMENT=${1:-development}
VERSION=${2:-$DEFAULT_VERSION}
BUILD_ID=${BUILD_ID:-$(date +%Y%m%d-%H%M%S)}

# Validate environment
case $ENVIRONMENT in
    development|dev)
        TARGET_SERVER="dev.matchedcover.com"
        DOCKER_TAG="dev"
        ;;
    staging)
        TARGET_SERVER="staging.matchedcover.com"
        DOCKER_TAG="staging"
        ;;
    production|prod)
        TARGET_SERVER="matchedcover.com"
        DOCKER_TAG="prod"
        ;;
    *)
        echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
        echo "Usage: $0 [development|staging|production] [version]"
        exit 1
        ;;
esac

log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# Pre-deployment checks
pre_deployment_checks() {
    log "Running pre-deployment checks..."
    
    # Check if Docker is running
    if ! docker info > /dev/null 2>&1; then
        error "Docker is not running or not accessible"
        exit 1
    fi
    success "Docker is running"
    
    # Check if required tools are installed
    command -v node >/dev/null 2>&1 || { error "Node.js is required but not installed"; exit 1; }
    command -v npm >/dev/null 2>&1 || { error "npm is required but not installed"; exit 1; }
    
    success "All required tools are available"
}

# Build application
build_application() {
    log "Building application for $ENVIRONMENT..."
    
    # Install dependencies
    log "Installing dependencies..."
    npm ci --prefer-offline
    
    # Run linting
    log "Running linting..."
    npm run lint || { warning "Linting issues found, continuing..."; }
    
    # Run type checking
    log "Running type checking..."
    npx tsc --noEmit --skipLibCheck
    
    # Build application
    log "Building Next.js application..."
    NODE_ENV=production npm run build
    
    success "Application built successfully"
}

# Build Docker image
build_docker_image() {
    log "Building Docker image..."
    
    IMAGE_NAME="${PROJECT_NAME}:${VERSION}-${BUILD_ID}"
    LATEST_IMAGE="${PROJECT_NAME}:${DOCKER_TAG}"
    
    docker build \
        --build-arg BUILD_ID="${BUILD_ID}" \
        --build-arg GIT_COMMIT="${GIT_COMMIT:-unknown}" \
        --build-arg BUILD_DATE="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
        -t "${IMAGE_NAME}" \
        -t "${LATEST_IMAGE}" \
        .
    
    success "Docker image built: ${IMAGE_NAME}"
}

# Test Docker image
test_docker_image() {
    log "Testing Docker image..."
    
    # Start container for testing
    CONTAINER_ID=$(docker run -d -p 3001:3000 "${PROJECT_NAME}:${VERSION}-${BUILD_ID}")
    
    # Wait for container to start
    sleep 10
    
    # Health check
    if curl -f -s http://localhost:3001/api/system/health > /dev/null; then
        success "Docker image health check passed"
    else
        error "Docker image health check failed"
        docker logs "$CONTAINER_ID"
        docker stop "$CONTAINER_ID"
        docker rm "$CONTAINER_ID"
        exit 1
    fi
    
    # Clean up test container
    docker stop "$CONTAINER_ID"
    docker rm "$CONTAINER_ID"
}

# Deploy with Docker
deploy_docker() {
    log "Deploying with Docker to $ENVIRONMENT..."
    
    case $ENVIRONMENT in
        development|dev)
            deploy_to_development
            ;;
        staging)
            deploy_to_staging
            ;;
        production|prod)
            deploy_to_production
            ;;
    esac
}

deploy_to_development() {
    log "Deploying to development environment..."
    
    # Simple deployment for development
    docker stop matched-cover-dev || true
    docker rm matched-cover-dev || true
    
    docker run -d \
        --name matched-cover-dev \
        --restart unless-stopped \
        -p 3000:3000 \
        -e NODE_ENV=production \
        -e ENVIRONMENT=development \
        "${PROJECT_NAME}:${VERSION}-${BUILD_ID}"
    
    success "Deployed to development"
}

deploy_to_staging() {
    log "Deploying to staging environment..."
    
    # Rolling deployment for staging
    docker stop matched-cover-staging || true
    docker rm matched-cover-staging || true
    
    docker run -d \
        --name matched-cover-staging \
        --restart unless-stopped \
        -p 3000:3000 \
        -e NODE_ENV=production \
        -e ENVIRONMENT=staging \
        "${PROJECT_NAME}:${VERSION}-${BUILD_ID}"
    
    success "Deployed to staging"
}

deploy_to_production() {
    log "Deploying to production environment..."
    
    # Confirmation for production
    echo -e "${YELLOW}⚠️ You are about to deploy to PRODUCTION${NC}"
    echo "Environment: $ENVIRONMENT"
    echo "Version: $VERSION"
    echo "Build ID: $BUILD_ID"
    echo ""
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        warning "Deployment cancelled"
        exit 0
    fi
    
    # Blue-green deployment for production
    CURRENT_CONTAINER=$(docker ps --filter "name=matched-cover-prod" --format "{{.Names}}" | head -1)
    
    if [[ -n "$CURRENT_CONTAINER" ]]; then
        NEW_CONTAINER="matched-cover-prod-new"
        OLD_CONTAINER="$CURRENT_CONTAINER"
    else
        NEW_CONTAINER="matched-cover-prod"
        OLD_CONTAINER=""
    fi
    
    # Start new container
    log "Starting new production container: $NEW_CONTAINER"
    docker run -d \
        --name "$NEW_CONTAINER" \
        --restart unless-stopped \
        -p 3001:3000 \
        -e NODE_ENV=production \
        -e ENVIRONMENT=production \
        "${PROJECT_NAME}:${VERSION}-${BUILD_ID}"
    
    # Health check new container
    sleep 15
    if curl -f -s http://localhost:3001/api/system/health > /dev/null; then
        success "New container health check passed"
        
        # Switch traffic (update port mapping)
        docker stop "$NEW_CONTAINER"
        docker rm "$NEW_CONTAINER"
        
        if [[ -n "$OLD_CONTAINER" ]]; then
            docker stop "$OLD_CONTAINER"
            docker rm "$OLD_CONTAINER"
        fi
        
        # Start final production container
        docker run -d \
            --name matched-cover-prod \
            --restart unless-stopped \
            -p 3000:3000 \
            -e NODE_ENV=production \
            -e ENVIRONMENT=production \
            "${PROJECT_NAME}:${VERSION}-${BUILD_ID}"
        
        success "Production deployment completed"
    else
        error "New container health check failed"
        docker logs "$NEW_CONTAINER"
        docker stop "$NEW_CONTAINER"
        docker rm "$NEW_CONTAINER"
        exit 1
    fi
}

# Deploy with PM2
deploy_pm2() {
    log "Deploying with PM2 to $ENVIRONMENT..."
    
    case $ENVIRONMENT in
        development|dev)
            pm2 deploy ecosystem.config.js development
            ;;
        staging)
            pm2 deploy ecosystem.config.js staging
            ;;
        production|prod)
            # Confirmation for production
            echo -e "${YELLOW}⚠️ You are about to deploy to PRODUCTION with PM2${NC}"
            read -p "Are you sure you want to continue? (y/N): " -n 1 -r
            echo
            
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                pm2 deploy ecosystem.config.js production
            else
                warning "Deployment cancelled"
                exit 0
            fi
            ;;
    esac
}

# Post-deployment checks
post_deployment_checks() {
    log "Running post-deployment checks..."
    
    # Health check
    local health_url="http://${TARGET_SERVER}/api/system/health"
    if [[ "$ENVIRONMENT" == "development" ]]; then
        health_url="http://localhost:3000/api/system/health"
    fi
    
    log "Checking health endpoint: $health_url"
    
    # Wait for deployment to be ready
    sleep 10
    
    for i in {1..5}; do
        if curl -f -s "$health_url" > /dev/null; then
            success "Health check passed"
            break
        else
            warning "Health check attempt $i/5 failed, retrying in 10 seconds..."
            sleep 10
        fi
        
        if [[ $i == 5 ]]; then
            error "Health check failed after 5 attempts"
            exit 1
        fi
    done
    
    # Performance check
    log "Running performance check..."
    RESPONSE_TIME=$(curl -w "%{time_total}" -o /dev/null -s "$health_url")
    log "Response time: ${RESPONSE_TIME}s"
    
    success "Post-deployment checks completed"
}

# Cleanup
cleanup() {
    log "Cleaning up..."
    
    # Remove old Docker images (keep last 3)
    docker images "${PROJECT_NAME}" --format "table {{.Tag}}\t{{.ID}}" | \
        tail -n +4 | \
        awk '{print $2}' | \
        xargs -r docker rmi || true
    
    # Clean up Docker system
    docker system prune -f || true
    
    success "Cleanup completed"
}

# Rollback function
rollback() {
    log "Rolling back deployment..."
    
    case $DEPLOYMENT_TYPE in
        docker)
            # Find previous image
            PREVIOUS_IMAGE=$(docker images "${PROJECT_NAME}" --format "{{.Tag}}" | sed -n '2p')
            if [[ -n "$PREVIOUS_IMAGE" ]]; then
                log "Rolling back to image: ${PROJECT_NAME}:${PREVIOUS_IMAGE}"
                deploy_docker
            else
                error "No previous image found for rollback"
                exit 1
            fi
            ;;
        pm2)
            # PM2 rollback
            pm2 deploy ecosystem.config.js "$ENVIRONMENT" revert 1
            ;;
    esac
    
    success "Rollback completed"
}

# Main deployment flow
main() {
    log "Starting deployment of MatchedCover Frontend"
    log "Environment: $ENVIRONMENT"
    log "Version: $VERSION"
    log "Build ID: $BUILD_ID"
    
    # Determine deployment type
    DEPLOYMENT_TYPE=${DEPLOYMENT_TYPE:-docker}
    
    if [[ "$1" == "rollback" ]]; then
        rollback
        exit 0
    fi
    
    # Execute deployment steps
    pre_deployment_checks
    
    if [[ "$DEPLOYMENT_TYPE" == "docker" ]]; then
        build_application
        build_docker_image
        test_docker_image
        deploy_docker
    elif [[ "$DEPLOYMENT_TYPE" == "pm2" ]]; then
        deploy_pm2
    else
        error "Invalid deployment type: $DEPLOYMENT_TYPE"
        exit 1
    fi
    
    post_deployment_checks
    cleanup
    
    success "Deployment completed successfully! 🚀"
    log "Application is now running at: http://${TARGET_SERVER}"
}

# Handle script termination
trap 'error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@"
