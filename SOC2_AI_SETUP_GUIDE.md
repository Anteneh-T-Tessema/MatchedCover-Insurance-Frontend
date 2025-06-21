# SOC 2 AI Agents Setup & Deployment Guide

## 🚀 Quick Start (5 Minutes)

### 1. Prerequisites Check
```bash
# Check Node.js version (must be 16+)
node --version

# Check npm version
npm --version

# Check TypeScript (install if needed)
npx tsc --version
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.soc2-agents .env

# Edit environment variables
nano .env
```

**Required Environment Variables:**
```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GEMINI_MODEL=gemini-2.0-flash-exp
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
COMPANY_NAME="Your Company Name"
COMPLIANCE_OFFICER_EMAIL=compliance@yourcompany.com
```

### 3. Installation
```bash
# Install dependencies
npm install

# Install required packages
npm install @google/generative-ai aws-sdk axios dotenv winston typescript ts-node
npm install -D @types/node jest ts-jest
```

### 4. Run SOC 2 Implementation
```bash
# Start the AI agents
npm run compliance-check

# Or run directly
npx ts-node src/run-soc2-agents.ts
```

---

## 🔧 Detailed Setup Instructions

### Step 1: API Keys Setup

#### Google Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Create new API key
3. Add to `.env.local`: `NEXT_PUBLIC_GEMINI_API_KEY=AIza...`
4. Set model: `NEXT_PUBLIC_GEMINI_MODEL=gemini-2.0-flash-exp`

#### AWS Credentials (for cloud infrastructure)
1. Go to AWS IAM Console
2. Create new user with programmatic access
3. Attach policies: `AmazonEC2FullAccess`, `AmazonRDSFullAccess`, `AmazonS3FullAccess`
4. Add credentials to `.env`

### Step 2: Database Setup (Optional)
```bash
# PostgreSQL for compliance data
docker run --name soc2-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:13

# Redis for caching
docker run --name soc2-redis -p 6379:6379 -d redis:7
```

### Step 3: Security Configuration
```bash
# Generate encryption key
openssl rand -hex 32

# Add to .env
ENCRYPTION_KEY=your_generated_key
```

### Step 4: Test Installation
```bash
# Test AI agent connectivity
npm run test

# Check system status
npm run status-check
```

---

## 🤖 AI Agent Usage

### SOC 2 Compliance Agent
```bash
# Full SOC 2 implementation
npx ts-node src/agents/SOC2ComplianceAgent.ts

# Check implementation status
npx ts-node -e "
import { SOC2ComplianceAgent } from './src/agents/SOC2ComplianceAgent';
const agent = new SOC2ComplianceAgent();
agent.getImplementationStatus().then(console.log);
"
```

### Security Implementation Agent
```bash
# Implement security controls
npx ts-node src/agents/SecurityImplementationAgent.ts

# Run security assessment
npx ts-node -e "
import { SecurityImplementationAgent } from './src/agents/SecurityImplementationAgent';
const agent = new SecurityImplementationAgent();
agent.implementAllControls().then(console.log);
"
```

### Compliance Monitoring Agent
```bash
# Start continuous monitoring
npx ts-node src/agents/ComplianceMonitoringAgent.ts

# Check compliance status
npx ts-node -e "
import { ComplianceMonitoringAgent } from './src/agents/ComplianceMonitoringAgent';
const agent = new ComplianceMonitoringAgent();
agent.monitorSOC2Controls().then(console.log);
"
```

---

## 📊 Monitoring & Reporting

### Real-time Compliance Dashboard
```bash
# Start monitoring dashboard
npm run start-dashboard

# View at: http://localhost:3000/compliance-dashboard
```

### Generate Reports
```bash
# Generate compliance report
npm run generate-report

# Export audit evidence
npm run export-evidence

# Create executive summary
npm run executive-summary
```

### Alerting Setup
```bash
# Configure Slack alerts
export SLACK_WEBHOOK_URL="https://hooks.slack.com/your-webhook"

# Configure email alerts
export SMTP_SERVER="smtp.gmail.com"
export SMTP_USERNAME="your-email@company.com"
export SMTP_PASSWORD="your-app-password"
```

---

## 🔄 Automated Workflows

### Daily Compliance Checks
```bash
# Add to crontab for daily compliance monitoring
0 9 * * * cd /path/to/soc2-agents && npm run daily-compliance-check
```

### Weekly Security Scans
```bash
# Weekly vulnerability assessment
0 2 * * 1 cd /path/to/soc2-agents && npm run weekly-security-scan
```

### Monthly Audit Preparation
```bash
# Monthly evidence collection
0 1 1 * * cd /path/to/soc2-agents && npm run monthly-audit-prep
```

---

## 🐳 Docker Deployment

### Build Docker Image
```bash
# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]
EOF

# Build image
docker build -t soc2-ai-agents .
```

### Run with Docker Compose
```yaml
# docker-compose.yml
version: '3.8'
services:
  soc2-agents:
    build: .
    environment:
      - NODE_ENV=production
    env_file:
      - .env
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
  
  postgres:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  redis:
    image: redis:7-alpine
    
volumes:
  postgres_data:
```

```bash
# Deploy with Docker Compose
docker-compose up -d
```

---

## ☁️ Cloud Deployment

### AWS Deployment
```bash
# Deploy to AWS ECS
aws ecs create-cluster --cluster-name soc2-agents

# Create task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create service
aws ecs create-service --cluster soc2-agents --service-name soc2-compliance --task-definition soc2-agents:1
```

### Azure Deployment
```bash
# Deploy to Azure Container Instances
az container create \
  --resource-group soc2-rg \
  --name soc2-agents \
  --image soc2-ai-agents \
  --cpu 2 \
  --memory 4 \
  --environment-variables OPENAI_API_KEY=$OPENAI_API_KEY
```

---

## 🛠️ Troubleshooting

### Common Issues

#### "Gemini API Key not found"
```bash
# Check environment variable
echo $NEXT_PUBLIC_GEMINI_API_KEY

# Verify in .env.local file
grep NEXT_PUBLIC_GEMINI_API_KEY .env.local

# Test API connectivity
curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models
```

#### "AWS credentials not configured"
```bash
# Check AWS credentials
aws sts get-caller-identity

# Configure if needed
aws configure
```

#### "Permission denied" errors
```bash
# Fix file permissions
chmod +x src/run-soc2-agents.ts

# Fix directory permissions
sudo chown -R $USER:$USER .
```

### Debug Mode
```bash
# Run with debug logging
DEBUG=* npm run compliance-check

# Enable verbose output
LOG_LEVEL=debug npm run compliance-check
```

### Health Checks
```bash
# Check system health
npm run health-check

# Verify all services
npm run verify-setup

# Test connectivity
npm run test-connections
```

---

## 📈 Performance Optimization

### Scaling Configuration
```bash
# Increase AI processing power
export NEXT_PUBLIC_GEMINI_MODEL=gemini-2.0-flash-exp
export MAX_CONCURRENT_REQUESTS=10

# Optimize database connections
export DATABASE_POOL_SIZE=20
export DATABASE_TIMEOUT=30000
```

### Monitoring Performance
```bash
# Monitor CPU/memory usage
npm run performance-monitor

# Track API response times
npm run api-metrics

# Monitor compliance processing time
npm run timing-analysis
```

---

## 🔒 Security Best Practices

### Secure Environment Variables
```bash
# Use encrypted environment file
gpg --symmetric --cipher-algo AES256 .env
mv .env.gpg production/

# Decrypt for use
gpg --decrypt .env.gpg > .env
```

### Network Security
```bash
# Configure firewall
sudo ufw allow 22    # SSH
sudo ufw allow 443   # HTTPS
sudo ufw enable

# Setup VPN for remote access
# (Implementation depends on your infrastructure)
```

### Access Control
```bash
# Restrict file permissions
chmod 600 .env
chmod 700 src/

# Setup proper user accounts
sudo useradd -m -s /bin/bash soc2agent
sudo usermod -aG docker soc2agent
```

---

## 📞 Support & Maintenance

### Regular Maintenance Tasks
```bash
# Update dependencies monthly
npm update

# Rotate API keys quarterly
npm run rotate-keys

# Update security signatures
npm run update-security-db
```

### Backup & Recovery
```bash
# Backup compliance data
npm run backup-compliance-data

# Backup configuration
cp .env .env.backup.$(date +%Y%m%d)

# Recovery procedure
npm run restore-from-backup
```

### Getting Help
- **Documentation**: Check `/docs` directory
- **Logs**: Review `/var/log/soc2-agents.log`
- **Support**: Email compliance-support@yourcompany.com
- **Issues**: Create GitHub issue with error logs

---

**🎉 You're now ready to implement SOC 2 compliance using AI agents!**

The agents will automatically:
- ✅ Implement all required security controls
- ✅ Generate comprehensive documentation
- ✅ Setup continuous monitoring
- ✅ Collect audit evidence
- ✅ Prepare for SOC 2 audit

**Estimated timeline: 6 months to full SOC 2 compliance**
