#!/bin/bash

# Test Jenkins CI/CD Setup Script
# Usage: ./test-jenkins-setup.sh

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Test Node.js and npm
test_nodejs() {
    log "Testing Node.js and npm..."
    
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version)
        success "Node.js is installed: $NODE_VERSION"
    else
        error "Node.js is not installed"
        return 1
    fi
    
    if command -v npm >/dev/null 2>&1; then
        NPM_VERSION=$(npm --version)
        success "npm is installed: $NPM_VERSION"
    else
        error "npm is not installed"
        return 1
    fi
}

# Test Docker
test_docker() {
    log "Testing Docker..."
    
    if command -v docker >/dev/null 2>&1; then
        DOCKER_VERSION=$(docker --version)
        success "Docker is installed: $DOCKER_VERSION"
        
        if docker info >/dev/null 2>&1; then
            success "Docker daemon is running"
        else
            warning "Docker daemon is not running"
        fi
    else
        warning "Docker is not installed (optional for PM2 deployment)"
    fi
}

# Test application build
test_build() {
    log "Testing application build..."
    
    if [[ -f "package.json" ]]; then
        success "package.json found"
    else
        error "package.json not found"
        return 1
    fi
    
    log "Installing dependencies..."
    npm ci --prefer-offline >/dev/null 2>&1
    success "Dependencies installed"
    
    log "Running build..."
    npm run build >/dev/null 2>&1
    success "Build completed successfully"
    
    if [[ -d ".next" ]]; then
        success ".next directory created"
    else
        error ".next directory not found"
        return 1
    fi
}

# Test Dockerfile
test_dockerfile() {
    log "Testing Dockerfile..."
    
    if [[ -f "Dockerfile" ]]; then
        success "Dockerfile found"
        
        # Validate Dockerfile syntax
        if docker build --dry-run . >/dev/null 2>&1; then
            success "Dockerfile syntax is valid"
        else
            warning "Dockerfile has syntax issues"
        fi
    else
        error "Dockerfile not found"
        return 1
    fi
}

# Test Jenkinsfile
test_jenkinsfile() {
    log "Testing Jenkinsfile..."
    
    if [[ -f "Jenkinsfile" ]]; then
        success "Jenkinsfile found"
    else
        error "Jenkinsfile not found"
        return 1
    fi
    
    if [[ -f "Jenkinsfile.enhanced" ]]; then
        success "Enhanced Jenkinsfile found"
    else
        warning "Enhanced Jenkinsfile not found"
    fi
}

# Test deployment scripts
test_deployment_scripts() {
    log "Testing deployment scripts..."
    
    local scripts=(
        "deploy/deploy.sh"
        "deploy/health-check.sh"
        "deploy/rollback.sh"
    )
    
    for script in "${scripts[@]}"; do
        if [[ -f "$script" ]]; then
            if [[ -x "$script" ]]; then
                success "$script is executable"
            else
                warning "$script is not executable"
                chmod +x "$script"
                success "Made $script executable"
            fi
        else
            error "$script not found"
        fi
    done
}

# Test configuration files
test_configuration_files() {
    log "Testing configuration files..."
    
    local configs=(
        "next.config.ts"
        "tsconfig.json"
        "package.json"
        "ecosystem.config.js"
        "docker-compose.yml"
    )
    
    for config in "${configs[@]}"; do
        if [[ -f "$config" ]]; then
            success "$config found"
        else
            error "$config not found"
        fi
    done
}

# Test environment files
test_environment_files() {
    log "Testing environment files..."
    
    if [[ -f ".env.example" ]]; then
        success ".env.example found"
    else
        warning ".env.example not found"
    fi
    
    if [[ -f ".nvmrc" ]]; then
        success ".nvmrc found"
    else
        warning ".nvmrc not found"
    fi
}

# Test health endpoint
test_health_endpoint() {
    log "Testing health endpoint..."
    
    # Start the application in background
    log "Starting application..."
    npm start &
    APP_PID=$!
    
    # Wait for application to start
    sleep 10
    
    # Test health endpoint
    if curl -f -s http://localhost:3000/api/system/health >/dev/null; then
        success "Health endpoint is working"
    else
        warning "Health endpoint is not responding"
    fi
    
    # Stop the application
    kill $APP_PID 2>/dev/null || true
    wait $APP_PID 2>/dev/null || true
}

# Test PM2 configuration
test_pm2_config() {
    log "Testing PM2 configuration..."
    
    if [[ -f "ecosystem.config.js" ]]; then
        success "PM2 ecosystem config found"
        
        # Validate PM2 config syntax
        if node -c ecosystem.config.js >/dev/null 2>&1; then
            success "PM2 config syntax is valid"
        else
            error "PM2 config has syntax errors"
        fi
    else
        error "PM2 ecosystem config not found"
    fi
}

# Generate test report
generate_report() {
    local total_tests=$1
    local passed_tests=$2
    local failed_tests=$((total_tests - passed_tests))
    
    echo ""
    echo "========================================"
    echo "           TEST REPORT"
    echo "========================================"
    echo "Total Tests: $total_tests"
    echo "Passed: $passed_tests"
    echo "Failed: $failed_tests"
    echo "Success Rate: $(( (passed_tests * 100) / total_tests ))%"
    echo "========================================"
    
    if [[ $failed_tests -eq 0 ]]; then
        success "All tests passed! 🎉"
        echo "Your Jenkins CI/CD setup is ready!"
    else
        warning "Some tests failed. Please review the output above."
        echo "Refer to JENKINS_SETUP.md for troubleshooting guidance."
    fi
}

# Main test function
main() {
    log "Starting Jenkins CI/CD Setup Test"
    echo "=================================="
    
    local total_tests=0
    local passed_tests=0
    
    # Run tests
    local tests=(
        "test_nodejs"
        "test_docker"
        "test_build"
        "test_dockerfile"
        "test_jenkinsfile"
        "test_deployment_scripts"
        "test_configuration_files"
        "test_environment_files"
        "test_pm2_config"
    )
    
    for test_func in "${tests[@]}"; do
        total_tests=$((total_tests + 1))
        echo ""
        if $test_func; then
            passed_tests=$((passed_tests + 1))
        fi
    done
    
    # Optional: Test health endpoint (requires build)
    if [[ "${TEST_HEALTH:-}" == "true" ]]; then
        total_tests=$((total_tests + 1))
        echo ""
        if test_health_endpoint; then
            passed_tests=$((passed_tests + 1))
        fi
    fi
    
    echo ""
    generate_report $total_tests $passed_tests
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h          Show this help message"
        echo "  --health            Test health endpoint (requires build)"
        echo ""
        echo "Environment variables:"
        echo "  TEST_HEALTH=true    Enable health endpoint testing"
        echo ""
        echo "Examples:"
        echo "  $0                  # Run all tests except health endpoint"
        echo "  $0 --health         # Run all tests including health endpoint"
        echo "  TEST_HEALTH=true $0 # Same as above using environment variable"
        exit 0
        ;;
    --health)
        export TEST_HEALTH=true
        ;;
esac

# Run main function
main
