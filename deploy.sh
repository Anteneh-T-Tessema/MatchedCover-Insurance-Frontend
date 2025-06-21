#!/bin/bash

# SOC 2 AI Agents - Cloud Deployment Script
# Supports AWS, Azure, and GCP deployments

set -e

# Configuration
PROJECT_NAME="soc2-ai-agents"
DOCKER_IMAGE="soc2-compliance-system"
VERSION="1.0.0"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 SOC 2 AI Agents - Cloud Deployment Script${NC}"
echo "============================================="

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    echo "🔍 Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
    fi
    
    # Check environment file
    if [ ! -f ".env.soc2-agents" ]; then
        print_error "Environment file .env.soc2-agents not found. Please create it first."
    fi
    
    print_status "Prerequisites check passed"
}

# Build Docker images
build_images() {
    echo "🔨 Building Docker images..."
    
    # Build main application image
    docker build -t ${DOCKER_IMAGE}:${VERSION} .
    docker tag ${DOCKER_IMAGE}:${VERSION} ${DOCKER_IMAGE}:latest
    
    print_status "Docker images built successfully"
}

# Deploy locally with Docker Compose
deploy_local() {
    echo "🏠 Deploying locally with Docker Compose..."
    
    # Create necessary directories
    mkdir -p logs ssl sql-init
    
    # Generate SSL certificates if they don't exist
    if [ ! -f "ssl/cert.pem" ]; then
        echo "🔐 Generating self-signed SSL certificates..."
        openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
            -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"
    fi
    
    # Start services
    docker-compose up -d
    
    # Wait for services to be ready
    echo "⏳ Waiting for services to start..."
    sleep 30
    
    # Check service health
    docker-compose ps
    
    print_status "Local deployment completed"
    echo "🌐 Dashboard available at: http://localhost:3001"
    echo "📊 Prometheus monitoring: http://localhost:9090"
}

# Deploy to AWS
deploy_aws() {
    echo "☁️  Deploying to AWS..."
    
    # Check AWS CLI
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
    fi
    
    # Check if logged in
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS CLI is not configured. Please run 'aws configure' first."
    fi
    
    # Create ECR repository if it doesn't exist
    REGION=${AWS_DEFAULT_REGION:-us-east-1}
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    ECR_URI="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${PROJECT_NAME}"
    
    echo "📦 Creating ECR repository..."
    aws ecr describe-repositories --repository-names ${PROJECT_NAME} --region ${REGION} &> /dev/null || \
    aws ecr create-repository --repository-name ${PROJECT_NAME} --region ${REGION}
    
    # Login to ECR
    aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ECR_URI}
    
    # Tag and push image
    docker tag ${DOCKER_IMAGE}:${VERSION} ${ECR_URI}:${VERSION}
    docker tag ${DOCKER_IMAGE}:${VERSION} ${ECR_URI}:latest
    docker push ${ECR_URI}:${VERSION}
    docker push ${ECR_URI}:latest
    
    # Create ECS cluster and service
    echo "🏗️  Creating ECS infrastructure..."
    
    # Create task definition
    cat > ecs-task-definition.json << EOF
{
    "family": "${PROJECT_NAME}",
    "networkMode": "awsvpc",
    "requiresCompatibilities": ["FARGATE"],
    "cpu": "1024",
    "memory": "2048",
    "executionRoleArn": "arn:aws:iam::${ACCOUNT_ID}:role/ecsTaskExecutionRole",
    "containerDefinitions": [
        {
            "name": "${PROJECT_NAME}",
            "image": "${ECR_URI}:${VERSION}",
            "portMappings": [
                {
                    "containerPort": 3001,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/${PROJECT_NAME}",
                    "awslogs-region": "${REGION}",
                    "awslogs-stream-prefix": "ecs"
                }
            }
        }
    ]
}
EOF
    
    # Register task definition
    aws ecs register-task-definition --cli-input-json file://ecs-task-definition.json --region ${REGION}
    
    print_status "AWS deployment completed"
    echo "🔗 Check AWS Console for ECS service details"
}

# Deploy to Azure
deploy_azure() {
    echo "☁️  Deploying to Azure..."
    
    # Check Azure CLI
    if ! command -v az &> /dev/null; then
        print_error "Azure CLI is not installed. Please install it first."
    fi
    
    # Check if logged in
    if ! az account show &> /dev/null; then
        print_error "Azure CLI is not logged in. Please run 'az login' first."
    fi
    
    # Set variables
    RESOURCE_GROUP="${PROJECT_NAME}-rg"
    CONTAINER_REGISTRY="${PROJECT_NAME}acr"
    CONTAINER_APP="${PROJECT_NAME}-app"
    LOCATION="eastus"
    
    # Create resource group
    echo "🏗️  Creating Azure resources..."
    az group create --name ${RESOURCE_GROUP} --location ${LOCATION}
    
    # Create container registry
    az acr create --resource-group ${RESOURCE_GROUP} --name ${CONTAINER_REGISTRY} --sku Basic --admin-enabled true
    
    # Build and push to ACR
    az acr build --registry ${CONTAINER_REGISTRY} --image ${PROJECT_NAME}:${VERSION} .
    
    print_status "Azure deployment completed"
    echo "🔗 Check Azure Portal for Container Apps details"
}

# Deploy to GCP
deploy_gcp() {
    echo "☁️  Deploying to Google Cloud Platform..."
    
    # Check gcloud CLI
    if ! command -v gcloud &> /dev/null; then
        print_error "Google Cloud CLI is not installed. Please install it first."
    fi
    
    # Check if logged in
    if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -1 &> /dev/null; then
        print_error "Google Cloud CLI is not authenticated. Please run 'gcloud auth login' first."
    fi
    
    # Set variables
    PROJECT_ID=${GOOGLE_CLOUD_PROJECT:-$(gcloud config get-value project)}
    REGION="us-central1"
    SERVICE_NAME="${PROJECT_NAME}-service"
    
    if [ -z "$PROJECT_ID" ]; then
        print_error "Google Cloud project not set. Please set GOOGLE_CLOUD_PROJECT environment variable."
    fi
    
    # Enable required APIs
    echo "🔧 Enabling required APIs..."
    gcloud services enable cloudbuild.googleapis.com --project=${PROJECT_ID}
    gcloud services enable run.googleapis.com --project=${PROJECT_ID}
    
    # Build and push to Container Registry
    echo "📦 Building and pushing to Container Registry..."
    gcloud builds submit --tag gcr.io/${PROJECT_ID}/${PROJECT_NAME}:${VERSION} .
    
    # Deploy to Cloud Run
    echo "🚀 Deploying to Cloud Run..."
    gcloud run deploy ${SERVICE_NAME} \
        --image gcr.io/${PROJECT_ID}/${PROJECT_NAME}:${VERSION} \
        --platform managed \
        --region ${REGION} \
        --allow-unauthenticated \
        --port 3001 \
        --memory 2Gi \
        --cpu 1 \
        --project=${PROJECT_ID}
    
    # Get service URL
    SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} --region ${REGION} --project=${PROJECT_ID} --format="value(status.url)")
    
    print_status "GCP deployment completed"
    echo "🌐 Service URL: ${SERVICE_URL}"
}

# Cleanup function
cleanup() {
    echo "🧹 Cleaning up temporary files..."
    rm -f ecs-task-definition.json
}

# Main deployment logic
main() {
    check_prerequisites
    build_images
    
    echo ""
    echo "🎯 Select deployment target:"
    echo "1) Local (Docker Compose)"
    echo "2) AWS (ECS Fargate)"
    echo "3) Azure (Container Apps)"
    echo "4) GCP (Cloud Run)"
    echo "5) Exit"
    
    read -p "Enter your choice (1-5): " choice
    
    case $choice in
        1)
            deploy_local
            ;;
        2)
            deploy_aws
            ;;
        3)
            deploy_azure
            ;;
        4)
            deploy_gcp
            ;;
        5)
            echo "Deployment cancelled."
            exit 0
            ;;
        *)
            print_error "Invalid choice. Please select 1-5."
            ;;
    esac
    
    cleanup
    
    echo ""
    print_status "Deployment completed successfully!"
    echo "📋 Next steps:"
    echo "1. Verify all services are running"
    echo "2. Configure monitoring and alerting"
    echo "3. Set up SSL certificates for production"
    echo "4. Configure backup and disaster recovery"
    echo "5. Run initial SOC 2 compliance assessment"
}

# Trap cleanup on exit
trap cleanup EXIT

# Run main function
main "$@"
