#!/bin/bash

# Rollback Script for MatchedCover Frontend
# Usage: ./rollback.sh [environment] [steps_back]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_NAME="matched-cover-frontend"

# Parse arguments
ENVIRONMENT=${1:-development}
STEPS_BACK=${2:-1}

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

# Validate environment
validate_environment() {
    case $ENVIRONMENT in
        development|dev|staging|production|prod)
            log "Validated environment: $ENVIRONMENT"
            ;;
        *)
            error "Invalid environment: $ENVIRONMENT"
            echo "Valid environments: development, staging, production"
            exit 1
            ;;
    esac
}

# Get deployment history
get_deployment_history() {
    log "Getting deployment history..."
    
    case $DEPLOYMENT_TYPE in
        docker)
            get_docker_history
            ;;
        pm2)
            get_pm2_history
            ;;
        *)
            error "Unknown deployment type"
            exit 1
            ;;
    esac
}

# Get Docker deployment history
get_docker_history() {
    log "Available Docker images for rollback:"
    
    # List available images
    docker images "$PROJECT_NAME" --format "table {{.Tag}}\t{{.CreatedAt}}\t{{.Size}}" | head -10
    
    # Get the image to rollback to
    ROLLBACK_TAG=$(docker images "$PROJECT_NAME" --format "{{.Tag}}" | sed -n "$((STEPS_BACK + 1))p")
    
    if [[ -z "$ROLLBACK_TAG" ]]; then
        error "No image found for rollback (steps back: $STEPS_BACK)"
        exit 1
    fi
    
    ROLLBACK_IMAGE="$PROJECT_NAME:$ROLLBACK_TAG"
    log "Selected rollback image: $ROLLBACK_IMAGE"
}

# Get PM2 deployment history
get_pm2_history() {
    log "Getting PM2 deployment history..."
    
    # PM2 keeps deployment history automatically
    # We can use pm2 deploy revert command
    log "Using PM2 deployment history (steps back: $STEPS_BACK)"
}

# Confirm rollback
confirm_rollback() {
    echo ""
    echo -e "${YELLOW}⚠️ ROLLBACK CONFIRMATION${NC}"
    echo "=================================="
    echo "Environment: $ENVIRONMENT"
    echo "Steps back: $STEPS_BACK"
    
    if [[ "$DEPLOYMENT_TYPE" == "docker" ]]; then
        echo "Rollback to: $ROLLBACK_IMAGE"
    fi
    
    echo ""
    echo -e "${RED}This will replace the current deployment!${NC}"
    echo ""
    
    read -p "Are you sure you want to proceed with rollback? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        warning "Rollback cancelled"
        exit 0
    fi
}

# Create backup of current deployment
backup_current_deployment() {
    log "Creating backup of current deployment..."
    
    case $DEPLOYMENT_TYPE in
        docker)
            backup_docker_deployment
            ;;
        pm2)
            backup_pm2_deployment
            ;;
    esac
    
    success "Current deployment backed up"
}

# Backup Docker deployment
backup_docker_deployment() {
    local current_container
    current_container=$(docker ps --filter "name=matched-cover" --format "{{.Names}}" | head -1)
    
    if [[ -n "$current_container" ]]; then
        local backup_image="$PROJECT_NAME:backup-$(date +%Y%m%d-%H%M%S)"
        docker commit "$current_container" "$backup_image"
        log "Current container backed up as: $backup_image"
    fi
}

# Backup PM2 deployment
backup_pm2_deployment() {
    # PM2 handles this automatically with its deployment system
    log "PM2 deployment backup is handled automatically"
}

# Execute Docker rollback
rollback_docker() {
    local container_name="matched-cover-${ENVIRONMENT}"
    
    log "Rolling back Docker deployment..."
    
    # Stop current container
    log "Stopping current container..."
    docker stop "$container_name" || true
    docker rm "$container_name" || true
    
    # Start rollback container
    log "Starting rollback container: $ROLLBACK_IMAGE"
    
    local port
    case $ENVIRONMENT in
        development|dev)
            port=3000
            ;;
        staging)
            port=3000
            ;;
        production|prod)
            port=3000
            ;;
    esac
    
    docker run -d \
        --name "$container_name" \
        --restart unless-stopped \
        -p "$port:3000" \
        -e NODE_ENV=production \
        -e ENVIRONMENT="$ENVIRONMENT" \
        "$ROLLBACK_IMAGE"
    
    success "Container rollback completed"
}

# Execute PM2 rollback
rollback_pm2() {
    log "Rolling back PM2 deployment..."
    
    # Use PM2's built-in rollback functionality
    pm2 deploy ecosystem.config.js "$ENVIRONMENT" revert "$STEPS_BACK"
    
    success "PM2 rollback completed"
}

# Verify rollback
verify_rollback() {
    log "Verifying rollback..."
    
    # Determine health check URL
    local health_url
    case $ENVIRONMENT in
        development|dev)
            health_url="http://localhost:3000/api/system/health"
            ;;
        staging)
            health_url="http://staging.matchedcover.com/api/system/health"
            ;;
        production|prod)
            health_url="http://matchedcover.com/api/system/health"
            ;;
    esac
    
    # Wait for service to be ready
    log "Waiting for service to be ready..."
    sleep 15
    
    # Health check with retries
    local retries=5
    for ((i=1; i<=retries; i++)); do
        if curl -f -s "$health_url" > /dev/null; then
            success "Health check passed (attempt $i)"
            break
        elif [[ $i -eq $retries ]]; then
            error "Health check failed after $retries attempts"
            log "Rollback may have failed - check logs"
            return 1
        else
            warning "Health check failed (attempt $i/$retries), retrying in 10 seconds..."
            sleep 10
        fi
    done
    
    # Additional verification
    log "Running additional verification..."
    
    # Check if main page loads
    local main_url
    case $ENVIRONMENT in
        development|dev)
            main_url="http://localhost:3000"
            ;;
        staging)
            main_url="http://staging.matchedcover.com"
            ;;
        production|prod)
            main_url="http://matchedcover.com"
            ;;
    esac
    
    if curl -f -s "$main_url" > /dev/null; then
        success "Main page verification passed"
    else
        warning "Main page verification failed"
    fi
    
    success "Rollback verification completed"
}

# Show rollback status
show_rollback_status() {
    log "Rollback Status Report"
    echo "======================"
    echo "Environment: $ENVIRONMENT"
    echo "Steps back: $STEPS_BACK"
    echo "Deployment type: $DEPLOYMENT_TYPE"
    
    if [[ "$DEPLOYMENT_TYPE" == "docker" ]]; then
        echo "Rollback image: $ROLLBACK_IMAGE"
        
        # Show current container status
        local container_name="matched-cover-${ENVIRONMENT}"
        if docker ps --filter "name=$container_name" --format "{{.Names}}" | grep -q "$container_name"; then
            echo "Container status: Running"
            docker ps --filter "name=$container_name" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        else
            echo "Container status: Not running"
        fi
    fi
    
    echo "Timestamp: $(date)"
    echo "======================"
}

# Emergency rollback (quick rollback without confirmations)
emergency_rollback() {
    warning "EMERGENCY ROLLBACK MODE - Skipping confirmations"
    
    # Determine deployment type
    if docker ps --filter "name=matched-cover" --format "{{.Names}}" | grep -q "matched-cover"; then
        DEPLOYMENT_TYPE="docker"
        get_docker_history
        rollback_docker
    elif pgrep -f "pm2" > /dev/null; then
        DEPLOYMENT_TYPE="pm2"
        rollback_pm2
    else
        error "Cannot determine deployment type for emergency rollback"
        exit 1
    fi
    
    verify_rollback
    success "Emergency rollback completed"
}

# Main rollback function
main() {
    log "Starting rollback process for MatchedCover Frontend"
    
    # Check if this is an emergency rollback
    if [[ "${3:-}" == "emergency" ]]; then
        emergency_rollback
        exit 0
    fi
    
    validate_environment
    
    # Determine deployment type
    if docker ps --filter "name=matched-cover" --format "{{.Names}}" | grep -q "matched-cover"; then
        DEPLOYMENT_TYPE="docker"
    elif pgrep -f "pm2" > /dev/null; then
        DEPLOYMENT_TYPE="pm2"
    else
        error "Cannot determine deployment type"
        error "No Docker containers or PM2 processes found for MatchedCover"
        exit 1
    fi
    
    log "Detected deployment type: $DEPLOYMENT_TYPE"
    
    get_deployment_history
    confirm_rollback
    backup_current_deployment
    
    case $DEPLOYMENT_TYPE in
        docker)
            rollback_docker
            ;;
        pm2)
            rollback_pm2
            ;;
    esac
    
    verify_rollback
    show_rollback_status
    
    success "Rollback completed successfully! 🔄"
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [environment] [steps_back] [emergency]"
        echo ""
        echo "Arguments:"
        echo "  environment    Target environment (development, staging, production)"
        echo "  steps_back     Number of deployments to rollback (default: 1)"
        echo "  emergency      Skip confirmations for emergency rollback"
        echo ""
        echo "Examples:"
        echo "  $0 production 1              # Rollback production by 1 step"
        echo "  $0 staging 2                 # Rollback staging by 2 steps"
        echo "  $0 production 1 emergency    # Emergency rollback"
        exit 0
        ;;
esac

# Handle script termination
trap 'error "Rollback interrupted"; exit 1' INT TERM

# Run main function
main "$@"
