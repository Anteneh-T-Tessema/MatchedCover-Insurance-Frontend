# MatchedCover Insurance Platform - Production Deployment
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV SKIP_FONT_OPTIMIZATION=1
ENV DISABLE_NEXT_FONT=1
ENV NEXT_TELEMETRY_DISABLED=1

# Create font manifest files before build
RUN node scripts/create-font-manifest.js

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
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
