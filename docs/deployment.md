# Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the SOC 2 & GRC Platform to production environments.

## Prerequisites

### System Requirements
- **Node.js**: 18.0.0 or higher
- **TypeScript**: 5.0.0 or higher
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: Minimum 10GB available space
- **Network**: HTTPS support required for production

### Environment Setup
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your production values

# Build the application
npm run build

# Run tests to ensure everything works
npm test
```

## Environment Variables

### Required Variables
```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database
DATABASE_SSL=true

# Security Configuration
JWT_SECRET=your-super-secure-jwt-secret-key
ENCRYPTION_KEY=your-32-character-encryption-key

# Application Configuration
NODE_ENV=production
PORT=3000
API_BASE_URL=https://your-domain.com/api

# Compliance Configuration
SOC2_AUDIT_MODE=true
COMPLIANCE_REPORTING_ENABLED=true

# Monitoring Configuration
LOG_LEVEL=info
MONITORING_ENABLED=true
HEALTH_CHECK_ENABLED=true
```

### Optional Variables
```bash
# External Integrations
SLACK_WEBHOOK_URL=https://hooks.slack.com/your-webhook
EMAIL_SERVICE_API_KEY=your-email-service-key

# Performance Configuration
CACHE_TTL=3600
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100

# Development/Debug
DEBUG_MODE=false
VERBOSE_LOGGING=false
```

## Deployment Steps

### 1. Prepare Production Environment
```bash
# Create production directory
mkdir -p /opt/soc2-grc-platform
cd /opt/soc2-grc-platform

# Clone repository
git clone https://github.com/your-org/soc2-grc-platform.git .

# Install production dependencies
npm ci --only=production
```

### 2. Configure Security
```bash
# Set proper file permissions
chmod 600 .env
chmod -R 755 src/
chmod +x scripts/start-production.sh

# Create SSL certificates directory
mkdir -p certs/
# Copy your SSL certificates to certs/
```

### 3. Database Setup
```bash
# Run database migrations
npm run db:migrate

# Seed initial data (if needed)
npm run db:seed:production
```

### 4. Build and Start Application
```bash
# Build the application
npm run build

# Start the application
npm run start:production

# Or use PM2 for process management
pm2 start ecosystem.config.js --env production
```

## Production Monitoring

### Health Checks
- **Application Health**: `GET /health`
- **Database Health**: `GET /health/db`
- **Compliance Status**: `GET /health/compliance`

### Logging
- **Log Location**: `/var/log/soc2-grc-platform/`
- **Log Rotation**: Configured for daily rotation
- **Log Levels**: ERROR, WARN, INFO (DEBUG disabled in production)

### Performance Monitoring
- **Response Time Monitoring**: Enabled
- **Memory Usage Tracking**: Enabled
- **Database Query Performance**: Monitored
- **Compliance Check Performance**: Tracked

## Backup and Recovery

### Database Backup
```bash
# Daily automated backup
0 2 * * * pg_dump $DATABASE_URL > /backup/daily/soc2_db_$(date +\%Y\%m\%d).sql

# Weekly full backup
0 3 * * 0 pg_dump $DATABASE_URL | gzip > /backup/weekly/soc2_db_$(date +\%Y\%m\%d).sql.gz
```

### Application Backup
```bash
# Configuration backup
tar -czf /backup/config/config_$(date +\%Y\%m\%d).tar.gz .env ecosystem.config.js

# Evidence and compliance data backup
tar -czf /backup/compliance/compliance_$(date +\%Y\%m\%d).tar.gz compliance-validation-output/
```

## Security Configuration

### Firewall Rules
```bash
# Allow HTTP/HTTPS traffic
ufw allow 80/tcp
ufw allow 443/tcp

# Allow SSH (change port as needed)
ufw allow 22/tcp

# Block all other incoming traffic
ufw --force enable
```

### SSL/TLS Configuration
- **Certificate**: Use Let's Encrypt or commercial SSL certificate
- **TLS Version**: Minimum TLS 1.2
- **Cipher Suites**: Modern, secure cipher suites only
- **HSTS**: Enabled with max-age=31536000

### Security Headers
```javascript
// security headers configuration
{
  "Content-Security-Policy": "default-src 'self'",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

## Compliance Considerations

### SOC 2 Requirements
- **Audit Logging**: All access and changes logged
- **Data Encryption**: At rest and in transit
- **Access Controls**: Role-based access implemented
- **Monitoring**: Continuous compliance monitoring active

### Data Protection
- **Personal Data**: Encrypted and access-controlled
- **Retention Policies**: Automated data retention enforcement
- **Backup Encryption**: All backups encrypted at rest

## Troubleshooting

### Common Issues

#### Application Won't Start
1. Check environment variables are set correctly
2. Verify database connectivity
3. Check file permissions
4. Review application logs

#### Database Connection Issues
1. Verify DATABASE_URL format
2. Check network connectivity
3. Validate SSL certificate if using SSL
4. Test connection manually

#### Performance Issues
1. Monitor memory usage with `htop`
2. Check database query performance
3. Review application logs for errors
4. Analyze response time metrics

### Log Analysis
```bash
# Check application logs
tail -f /var/log/soc2-grc-platform/application.log

# Check error logs
grep ERROR /var/log/soc2-grc-platform/application.log

# Monitor compliance checks
tail -f /var/log/soc2-grc-platform/compliance.log
```

## Maintenance

### Regular Tasks
- **Daily**: Review logs for errors
- **Weekly**: Check compliance scores
- **Monthly**: Update dependencies
- **Quarterly**: Security audit and penetration testing

### Updates
```bash
# Update application
git pull origin main
npm ci --only=production
npm run build
pm2 restart all

# Update dependencies (scheduled maintenance window)
npm update
npm audit fix
```

## Support

### Emergency Contacts
- **Technical Lead**: technical-lead@company.com
- **Security Team**: security@company.com
- **Compliance Officer**: compliance@company.com

### Documentation
- **API Documentation**: `/docs/api.md`
- **Security Guide**: `/docs/security.md`
- **Architecture Overview**: `/docs/architecture.md`

---

**Last Updated**: June 20, 2025  
**Version**: 1.0.0  
**Environment**: Production
