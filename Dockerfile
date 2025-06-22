# SOC 2 AI Agents - Production Deployment
FROM node:18-alpine

LABEL maintainer="SOC2 AI Agent System" \
      description="Containerized SOC 2 compliance automation system" \
      version="1.0.0"

# Create app directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    git \
    openssl \
    ca-certificates \
    tzdata

# Set timezone
ENV TZ=UTC

# Copy package files
COPY soc2-agents-package.json package.json
COPY package-lock.json* ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Create necessary directories
RUN mkdir -p /app/src/agents \
             /app/soc2-documentation \
             /app/soc2-evidence \
             /app/soc2-audit-prep \
             /app/soc2-dashboard \
             /app/soc2-alerts \
             /app/soc2-metrics \
             /app/logs

# Copy source code
COPY src/ ./src/
COPY .env.soc2-agents .env

# Copy configuration files
COPY docker-config/ ./config/

# Set permissions
RUN chmod +x src/run-soc2-agents.ts && \
    chmod 755 /app/soc2-* && \
    chown -R node:node /app

# Switch to non-root user
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

# Expose ports
EXPOSE 3001

# Environment variables
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV DASHBOARD_PORT=3001

# Start the application
CMD ["npm", "start"]
