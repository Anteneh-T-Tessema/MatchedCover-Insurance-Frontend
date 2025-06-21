#!/bin/bash

# Health Check Script for MatchedCover Frontend
# Usage: ./health-check.sh [url] [timeout]

set -e

# Configuration
DEFAULT_URL="http://localhost:3000"
DEFAULT_TIMEOUT=30
DEFAULT_RETRIES=3

# Parse arguments
URL=${1:-$DEFAULT_URL}
TIMEOUT=${2:-$DEFAULT_TIMEOUT}
RETRIES=${3:-$DEFAULT_RETRIES}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
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

# Basic health check
basic_health_check() {
    local url="$1"
    local response
    
    log "Checking basic health at: $url/api/system/health"
    
    response=$(curl -s -w "HTTPSTATUS:%{http_code};TIME:%{time_total}" "$url/api/system/health" || echo "HTTPSTATUS:000;TIME:0")
    
    http_code=$(echo "$response" | grep -o 'HTTPSTATUS:[0-9]*' | cut -d: -f2)
    time_total=$(echo "$response" | grep -o 'TIME:[0-9.]*' | cut -d: -f2)
    
    if [[ "$http_code" == "200" ]]; then
        success "Health check passed (${time_total}s)"
        return 0
    else
        error "Health check failed (HTTP $http_code)"
        return 1
    fi
}

# Detailed application check
detailed_app_check() {
    local url="$1"
    
    log "Running detailed application checks..."
    
    # Check main page
    if curl -s -f "$url/" > /dev/null; then
        success "Main page accessible"
    else
        warning "Main page check failed"
    fi
    
    # Check API endpoints
    local endpoints=(
        "/api/system/health"
        "/api/quotes"
        "/api/policies"
    )
    
    for endpoint in "${endpoints[@]}"; do
        if curl -s -f "$url$endpoint" > /dev/null; then
            success "API endpoint $endpoint accessible"
        else
            warning "API endpoint $endpoint check failed"
        fi
    done
}

# Performance check
performance_check() {
    local url="$1"
    
    log "Running performance checks..."
    
    # Create curl format file
    cat > /tmp/curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
    
    log "Performance metrics for $url:"
    curl -w "@/tmp/curl-format.txt" -o /dev/null -s "$url/"
    
    # Check response time threshold
    response_time=$(curl -w "%{time_total}" -o /dev/null -s "$url/")
    threshold=2.0
    
    if (( $(echo "$response_time < $threshold" | bc -l) )); then
        success "Response time acceptable: ${response_time}s"
    else
        warning "Response time high: ${response_time}s (threshold: ${threshold}s)"
    fi
    
    # Cleanup
    rm -f /tmp/curl-format.txt
}

# Memory and resource check (for Docker containers)
resource_check() {
    log "Checking resource usage..."
    
    # Check Docker containers
    if command -v docker > /dev/null; then
        local containers=$(docker ps --filter "name=matched-cover" --format "{{.Names}}")
        
        if [[ -n "$containers" ]]; then
            echo "$containers" | while read -r container; do
                log "Resource usage for container: $container"
                docker stats --no-stream --format "CPU: {{.CPUPerc}}, Memory: {{.MemUsage}}" "$container"
            done
        else
            log "No MatchedCover containers found"
        fi
    fi
    
    # Check system resources
    log "System resource usage:"
    echo "Memory: $(free -h | awk '/^Mem:/ {print $3 "/" $2}')"
    echo "Disk: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 " used)"}')"
    echo "Load: $(uptime | awk -F'load average:' '{print $2}')"
}

# SSL/TLS check
ssl_check() {
    local url="$1"
    
    if [[ "$url" == https://* ]]; then
        log "Checking SSL/TLS certificate..."
        
        local domain=$(echo "$url" | sed 's|https://||' | sed 's|/.*||')
        local cert_info
        
        cert_info=$(echo | openssl s_client -servername "$domain" -connect "$domain:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
        
        if [[ -n "$cert_info" ]]; then
            success "SSL certificate is valid"
            echo "$cert_info"
        else
            warning "SSL certificate check failed"
        fi
    else
        log "Skipping SSL check for non-HTTPS URL"
    fi
}

# Database connectivity check (if applicable)
database_check() {
    log "Checking database connectivity..."
    
    # This would depend on your database setup
    # Example for PostgreSQL:
    # if command -v psql > /dev/null && [[ -n "$DATABASE_URL" ]]; then
    #     if psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
    #         success "Database connection successful"
    #     else
    #         error "Database connection failed"
    #     fi
    # else
    #     log "Database check skipped (no psql or DATABASE_URL)"
    # fi
    
    log "Database check skipped (configure based on your database)"
}

# External dependencies check
dependencies_check() {
    log "Checking external dependencies..."
    
    # Example external services to check
    local external_services=(
        "https://api.github.com/status"
        # Add your external service URLs here
    )
    
    for service in "${external_services[@]}"; do
        if curl -s -f "$service" > /dev/null; then
            success "External service accessible: $service"
        else
            warning "External service check failed: $service"
        fi
    done
}

# Comprehensive health check
comprehensive_check() {
    local url="$1"
    
    log "Running comprehensive health check for: $url"
    echo "========================================"
    
    basic_health_check "$url"
    detailed_app_check "$url"
    performance_check "$url"
    resource_check
    ssl_check "$url"
    database_check
    dependencies_check
    
    echo "========================================"
    success "Comprehensive health check completed"
}

# Monitoring check (for continuous monitoring)
monitoring_check() {
    local url="$1"
    local interval=${MONITOR_INTERVAL:-60}
    
    log "Starting continuous monitoring (interval: ${interval}s)"
    log "Press Ctrl+C to stop"
    
    while true; do
        if basic_health_check "$url"; then
            echo -n "."
        else
            echo ""
            error "Health check failed at $(date)"
        fi
        sleep "$interval"
    done
}

# Main function
main() {
    local check_type=${CHECK_TYPE:-basic}
    
    case "$check_type" in
        basic)
            for ((i=1; i<=RETRIES; i++)); do
                if basic_health_check "$URL"; then
                    exit 0
                elif [[ $i -lt $RETRIES ]]; then
                    warning "Attempt $i/$RETRIES failed, retrying in 5 seconds..."
                    sleep 5
                fi
            done
            error "Health check failed after $RETRIES attempts"
            exit 1
            ;;
        detailed)
            comprehensive_check "$URL"
            ;;
        performance)
            performance_check "$URL"
            ;;
        monitor)
            monitoring_check "$URL"
            ;;
        *)
            error "Invalid check type: $check_type"
            echo "Valid types: basic, detailed, performance, monitor"
            exit 1
            ;;
    esac
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [URL] [TIMEOUT] [RETRIES]"
        echo ""
        echo "Environment variables:"
        echo "  CHECK_TYPE=basic|detailed|performance|monitor"
        echo "  MONITOR_INTERVAL=60 (for monitor mode)"
        echo ""
        echo "Examples:"
        echo "  $0                                    # Basic check localhost"
        echo "  $0 https://app.example.com           # Basic check remote"
        echo "  CHECK_TYPE=detailed $0               # Detailed check"
        echo "  CHECK_TYPE=monitor $0                # Continuous monitoring"
        exit 0
        ;;
esac

# Run main function
main
