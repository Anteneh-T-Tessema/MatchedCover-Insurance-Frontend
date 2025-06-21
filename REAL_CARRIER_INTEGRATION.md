# Real Carrier API Integration Guide

## Overview
This guide explains how to implement actual insurance carrier API integrations instead of the current mock implementation.

## 🏗️ Architecture Requirements

### 1. **Business Prerequisites**
- [ ] Licensed insurance agency/broker credentials
- [ ] Carrier partnership agreements signed
- [ ] E&O insurance policy
- [ ] State producer licenses
- [ ] FINRA compliance (if applicable)

### 2. **Technical Infrastructure**
- [ ] Secure server environment (SOC 2 compliant)
- [ ] Database for storing quotes/applications
- [ ] Redis for caching and rate limiting
- [ ] Monitoring and logging system
- [ ] SSL certificates and security hardening

### 3. **API Credentials Setup**

#### Progressive
```bash
# Sandbox Environment
PROGRESSIVE_CLIENT_ID=sandbox_client_id
PROGRESSIVE_CLIENT_SECRET=sandbox_secret
PROGRESSIVE_API_URL=https://sandbox-api.progressive.com/v1

# Production Environment
PROGRESSIVE_CLIENT_ID=prod_client_id
PROGRESSIVE_CLIENT_SECRET=prod_secret
PROGRESSIVE_API_URL=https://api.progressive.com/v1
```

#### GEICO
```bash
# Requires partnership agreement and broker credentials
GEICO_API_KEY=your_geico_api_key
GEICO_PARTNER_ID=your_partner_id
GEICO_API_URL=https://partner-api.geico.com/v2
```

#### State Farm
```bash
# Often uses SOAP/XML and certificate-based auth
STATE_FARM_USERNAME=your_username
STATE_FARM_PASSWORD=your_password
STATE_FARM_CERT_PATH=/path/to/certificate.pem
STATE_FARM_API_URL=https://api.statefarm.com/v1
```

#### Allstate
```bash
ALLSTATE_API_KEY=your_api_key
ALLSTATE_AGENT_CODE=your_agent_code
ALLSTATE_API_URL=https://api.allstate.com/v1
```

## 🔧 Implementation Steps

### Step 1: Replace Mock Services

1. **Update the carrier dashboard to use `RealCarrierService`:**

```typescript
// In your carrier dashboard page
import { RealCarrierService } from '@/services/carriers/RealCarrierService';

const carrierService = new RealCarrierService();

const loadCarrierData = useCallback(async () => {
  try {
    // Use real service instead of fetch to mock endpoints
    const quotes = await carrierService.getQuotesFromAllCarriers(sampleQuoteRequest);
    
    // Transform quotes to carrier status data
    const carrierStatuses = quotes.map(quote => ({
      carrierId: quote.carrierId,
      name: getCarrierDisplayName(quote.carrierId),
      status: quote.status === 'quoted' ? 'online' : 'offline',
      // ... other mappings
    }));
    
    setCarriers(carrierStatuses);
  } catch (error) {
    // Fallback to current mock implementation
    console.error('Real carrier service failed:', error);
  }
}, []);
```

### Step 2: Database Schema

```sql
-- Quotes table
CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  carrier_id VARCHAR(50) NOT NULL,
  quote_id VARCHAR(100) NOT NULL,
  customer_data JSONB NOT NULL,
  quote_data JSONB NOT NULL,
  premium DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  valid_until TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Applications table
CREATE TABLE applications (
  id UUID PRIMARY KEY,
  quote_id UUID REFERENCES quotes(id),
  carrier_id VARCHAR(50) NOT NULL,
  application_data JSONB NOT NULL,
  status VARCHAR(20) NOT NULL,
  submission_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Carrier status tracking
CREATE TABLE carrier_status_log (
  id UUID PRIMARY KEY,
  carrier_id VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  response_time_ms INTEGER,
  error_message TEXT,
  checked_at TIMESTAMP DEFAULT NOW()
);
```

### Step 3: Rate Limiting and Monitoring

```typescript
// Redis-based rate limiting
import Redis from 'ioredis';

class RateLimiter {
  private redis = new Redis(process.env.REDIS_URL);
  
  async checkLimit(carrierId: string, limit: number, window: number): Promise<boolean> {
    const key = `rate_limit:${carrierId}`;
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, window);
    }
    
    return current <= limit;
  }
}

// Monitoring service
class CarrierMonitoringService {
  async logAPICall(carrierId: string, responseTime: number, success: boolean, error?: string) {
    // Log to database
    await db.query(`
      INSERT INTO carrier_status_log (carrier_id, status, response_time_ms, error_message)
      VALUES ($1, $2, $3, $4)
    `, [carrierId, success ? 'success' : 'error', responseTime, error]);
    
    // Send to monitoring service (DataDog, CloudWatch, etc.)
    metrics.increment('carrier.api.calls', 1, { carrier: carrierId, status: success ? 'success' : 'error' });
    metrics.histogram('carrier.api.response_time', responseTime, { carrier: carrierId });
  }
}
```

### Step 4: Error Handling and Fallbacks

```typescript
class CarrierAPIClient {
  async getQuoteWithFallback(request: QuoteRequest): Promise<CarrierQuoteResponse> {
    const maxRetries = 3;
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const startTime = Date.now();
        const result = await this.getQuote(request);
        const responseTime = Date.now() - startTime;
        
        // Log successful call
        await this.monitoring.logAPICall(this.carrierId, responseTime, true);
        
        return result;
      } catch (error) {
        lastError = error as Error;
        
        // Log failed call
        await this.monitoring.logAPICall(this.carrierId, 0, false, error.message);
        
        // Exponential backoff
        if (attempt < maxRetries) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }
      }
    }
    
    // All retries failed - use fallback/cached data if available
    const fallbackQuote = await this.getFallbackQuote(request);
    if (fallbackQuote) {
      return fallbackQuote;
    }
    
    throw lastError;
  }
  
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

## 🔒 Security Requirements

### Data Encryption
```typescript
// Encrypt sensitive data before storing
import crypto from 'crypto';

class DataEncryption {
  private readonly algorithm = 'aes-256-gcm';
  private readonly key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  
  encrypt(text: string): { encrypted: string; iv: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.key);
    cipher.setAAD(Buffer.from('insurance-data'));
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      tag: tag.toString('hex')
    };
  }
  
  decrypt(encrypted: string, iv: string, tag: string): string {
    const decipher = crypto.createDecipher(this.algorithm, this.key);
    decipher.setAAD(Buffer.from('insurance-data'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

### API Key Management
```typescript
// Secure API key rotation
class APIKeyManager {
  private keys = new Map<string, { key: string; expiresAt: Date }>();
  
  async getValidKey(carrierId: string): Promise<string> {
    const cached = this.keys.get(carrierId);
    
    if (cached && cached.expiresAt > new Date()) {
      return cached.key;
    }
    
    // Fetch new key from secure vault (AWS Secrets Manager, etc.)
    const newKey = await this.fetchKeyFromVault(carrierId);
    
    this.keys.set(carrierId, {
      key: newKey,
      expiresAt: new Date(Date.now() + 3600000) // 1 hour
    });
    
    return newKey;
  }
}
```

## 📊 Monitoring and Alerting

### Health Checks
```typescript
class CarrierHealthChecker {
  async runHealthChecks(): Promise<HealthReport[]> {
    const carriers = ['progressive', 'geico', 'state_farm', 'allstate'];
    const reports: HealthReport[] = [];
    
    for (const carrierId of carriers) {
      const report = await this.checkCarrierHealth(carrierId);
      reports.push(report);
      
      // Send alerts if health is degraded
      if (report.status !== 'healthy') {
        await this.sendAlert(carrierId, report);
      }
    }
    
    return reports;
  }
  
  private async checkCarrierHealth(carrierId: string): Promise<HealthReport> {
    try {
      const startTime = Date.now();
      await this.pingCarrierAPI(carrierId);
      const responseTime = Date.now() - startTime;
      
      return {
        carrierId,
        status: 'healthy',
        responseTime,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        carrierId,
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date()
      };
    }
  }
}
```

## 🚀 Deployment Considerations

### 1. **Environment Setup**
- Use separate environments: dev, staging, production
- Carrier sandbox APIs for development
- Production APIs only in production environment

### 2. **Secrets Management**
- Use AWS Secrets Manager, Azure Key Vault, or similar
- Rotate API keys regularly
- Never commit credentials to code

### 3. **Scaling**
- Use load balancers for high availability
- Implement circuit breakers for carrier API failures
- Cache frequently accessed data (Redis)

### 4. **Compliance**
- Regular security audits
- Data retention policies
- GDPR/CCPA compliance for customer data
- PCI compliance if handling payments

## 📋 Testing Strategy

### Unit Tests
```typescript
describe('CarrierAPIClient', () => {
  it('should handle API failures gracefully', async () => {
    const client = new ProgressiveAPIClient();
    
    // Mock API failure
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('API Down'));
    
    const request = createMockQuoteRequest();
    
    await expect(client.getQuote(request)).rejects.toThrow('API Down');
  });
});
```

### Integration Tests
```typescript
describe('Real Carrier Integration', () => {
  it('should get quotes from sandbox APIs', async () => {
    const service = new RealCarrierService();
    const request = createValidQuoteRequest();
    
    const quotes = await service.getQuotesFromAllCarriers(request);
    
    expect(quotes).toHaveLength(4);
    expect(quotes[0]).toHaveProperty('premium');
  });
});
```

## 🎯 Migration Strategy

### Phase 1: Parallel Implementation
- Keep existing mock system running
- Implement real APIs alongside
- A/B test with small percentage of traffic

### Phase 2: Gradual Rollout
- Start with least critical carrier
- Monitor error rates and performance
- Gradually increase real API usage

### Phase 3: Full Migration
- Switch all traffic to real APIs
- Remove mock implementations
- Implement full monitoring and alerting

## 📞 Support and Maintenance

### Carrier Support Contacts
- Progressive: partner-support@progressive.com
- GEICO: api-support@geico.com
- State Farm: developer-support@statefarm.com
- Allstate: api-help@allstate.com

### Regular Maintenance Tasks
- [ ] Monitor API rate limits and adjust
- [ ] Update carrier API credentials quarterly
- [ ] Review and update data mappings
- [ ] Performance optimization based on metrics
- [ ] Security patches and updates

---

**⚠️ Important Notes:**
1. Real carrier integrations require significant business partnerships and compliance
2. Start with sandbox environments for all development
3. Budget for ongoing maintenance and support costs
4. Consider using existing insurance API platforms (like Applied Systems) as intermediaries
5. Ensure proper insurance licensing before handling real customer data

---

## 🛡️ E&O Insurance & SOC 2 Compliance Action Plan

### **Phase 1: E&O Insurance (Immediate - 2-4 weeks)**

#### Week 1: Insurance Assessment & Research
- [ ] **Determine coverage needs**
  - Business revenue projections
  - Number of policies handled annually
  - Geographic coverage areas
  - Types of insurance products offered

- [ ] **Research insurance providers**
  - Hiscox (popular for tech companies)
  - CNA (comprehensive professional liability)
  - Travelers (good for insurance agencies)
  - PIIC (Professional Insurance Industry Coalition)
  - Compare quotes from 3-5 providers

- [ ] **Gather required documentation**
  - Business license and formation documents
  - Revenue statements/projections
  - Employee count and roles
  - Technology infrastructure overview
  - Existing security measures documentation

#### Week 2: Application & Underwriting
- [ ] **Complete insurance applications**
  - Provide accurate business information
  - Detail technology security measures
  - Describe data handling procedures
  - List any prior claims or incidents

- [ ] **Underwriting review**
  - Answer underwriter questions promptly
  - Provide additional documentation if requested
  - Schedule site visits if required

#### Week 3-4: Policy Finalization
- [ ] **Review policy terms**
  - Coverage limits ($1M-$5M recommended)
  - Deductible amounts
  - Exclusions and limitations
  - Claims reporting procedures

- [ ] **Finalize and activate policy**
  - Sign policy documents
  - Pay initial premium
  - Receive certificates of insurance
  - Add carrier requirements to policy if known

**Estimated Cost: $2,000-$8,000 annually**

### **Phase 2: SOC 2 Preparation (3-6 months)**

#### Month 1: Assessment & Planning

**Week 1-2: Initial Assessment**
- [ ] **SOC 2 readiness assessment**
  - Engage SOC 2 consultant/auditor
  - Gap analysis of current controls
  - Risk assessment and scope definition
  - Timeline and budget planning

- [ ] **Choose SOC 2 type**
  - Type I (point-in-time assessment) - faster, cheaper
  - Type II (operational effectiveness over 6-12 months) - more valuable
  - **Recommendation: Start with Type I, plan for Type II**

**Week 3-4: Documentation Framework**
- [ ] **Establish information security program**
  - Create Information Security Policy
  - Define security roles and responsibilities
  - Establish security governance structure
  - Create incident response procedures

#### Month 2: Control Implementation

**Security Controls (Trust Service Criteria)**

**1. Security**
- [ ] **Access Controls**
  - Implement multi-factor authentication (MFA)
  - Role-based access control (RBAC)
  - Regular access reviews and deprovisioning
  - Password policy enforcement

- [ ] **Network Security**
  - Firewall configuration and monitoring
  - Network segmentation
  - VPN for remote access
  - Intrusion detection/prevention systems

- [ ] **Endpoint Security**
  - Antivirus/anti-malware on all devices
  - Device encryption requirements
  - Mobile device management (MDM)
  - Regular security patching

**2. Availability**
- [ ] **System Monitoring**
  - 24/7 monitoring of critical systems
  - Automated alerting for outages
  - Performance monitoring and capacity planning
  - Disaster recovery testing

- [ ] **Backup and Recovery**
  - Automated daily backups
  - Offsite backup storage
  - Recovery time objective (RTO) < 4 hours
  - Recovery point objective (RPO) < 1 hour

**3. Processing Integrity**
- [ ] **Data Validation**
  - Input validation on all forms
  - Data integrity checks
  - Error handling and logging
  - Transaction monitoring

**4. Confidentiality**
- [ ] **Data Encryption**
  - Encryption at rest (AES-256)
  - Encryption in transit (TLS 1.3)
  - Key management procedures
  - Secure data disposal

**5. Privacy**
- [ ] **Privacy Controls**
  - Data mapping and classification
  - Consent management
  - Data subject rights procedures
  - Privacy by design implementation

#### Month 3: Process Implementation

**Week 1-2: Operational Procedures**
- [ ] **Security Operations**
  - Security incident response plan
  - Vulnerability management program
  - Security awareness training
  - Vendor risk management

- [ ] **Change Management**
  - Code review procedures
  - Testing and approval processes
  - Production deployment controls
  - Configuration management

**Week 3-4: Monitoring & Logging**
- [ ] **Security Monitoring**
  - SIEM (Security Information Event Management)
  - Log aggregation and analysis
  - User activity monitoring
  - Automated threat detection

#### Month 4: Documentation & Testing

**Week 1-2: Control Documentation**
- [ ] **Policy and Procedure Documentation**
  - Information Security Policy
  - Access Control Procedures
  - Incident Response Plan
  - Business Continuity Plan
  - Vendor Management Policy

**Week 3-4: Control Testing**
- [ ] **Internal Testing**
  - Penetration testing
  - Vulnerability assessments
  - Control effectiveness testing
  - Process walkthrough documentation

#### Month 5-6: Audit Preparation & Execution

**Week 1-2: Pre-Audit Activities**
- [ ] **Auditor Selection**
  - Choose qualified CPA firm
  - Define audit scope and timeline
  - Prepare audit artifacts
  - Schedule audit activities

**Week 3-4: SOC 2 Audit**
- [ ] **Audit Execution**
  - Provide requested documentation
  - Facilitate control testing
  - Address any findings promptly
  - Review draft report

**Week 5-6: Report Finalization**
- [ ] **Final Report**
  - Review and approve final SOC 2 report
  - Address any management letter points
  - Plan remediation for any exceptions
  - Distribute report to stakeholders

**Estimated Cost: $25,000-$75,000 (first year)**

### **Phase 3: Ongoing Compliance (Continuous)**

#### Monthly Activities
- [ ] **Security Reviews**
  - Access review and cleanup
  - Security metrics reporting
  - Incident review and lessons learned
  - Vendor security assessments

#### Quarterly Activities
- [ ] **Risk Assessments**
  - Updated threat assessments
  - Control effectiveness reviews
  - Policy and procedure updates
  - Security training refreshers

#### Annual Activities
- [ ] **SOC 2 Type II Audit**
  - Plan next audit cycle
  - Update controls based on business changes
  - Continuous monitoring improvements
  - Insurance policy renewals

**Annual Ongoing Cost: $15,000-$35,000**

### **Implementation Timeline Summary**

```
Month 1: E&O Insurance + SOC 2 Planning
├── Week 1: E&O research and applications
├── Week 2: E&O underwriting process
├── Week 3: E&O policy finalization
└── Week 4: SOC 2 assessment and planning

Month 2-3: Core Security Controls
├── Technical controls implementation
├── Process documentation
└── Staff training

Month 4: Testing and Documentation
├── Control testing
├── Policy finalization
└── Audit preparation

Month 5-6: SOC 2 Audit
├── Auditor engagement
├── Audit execution
└── Report finalization

Ongoing: Continuous Compliance
├── Monthly security reviews
├── Quarterly assessments
└── Annual audits
```

### **Budget Planning**

| Item | Year 1 | Annual Ongoing |
|------|--------|----------------|
| E&O Insurance | $5,000 | $5,000 |
| SOC 2 Consultant | $15,000 | $10,000 |
| SOC 2 Audit | $25,000 | $20,000 |
| Security Tools | $10,000 | $12,000 |
| Staff Training | $3,000 | $2,000 |
| **Total** | **$58,000** | **$49,000** |

### **Quick Start Checklist**

**This Week:**
- [ ] Request E&O insurance quotes from 3 providers
- [ ] Research SOC 2 consultants in your area
- [ ] Document current security measures
- [ ] Create project timeline and budget

**Next 30 Days:**
- [ ] Finalize E&O insurance policy
- [ ] Engage SOC 2 consultant
- [ ] Begin security control implementation
- [ ] Start security awareness training

**Success Metrics:**
- E&O policy active within 30 days
- SOC 2 Type I report within 6 months
- Zero security incidents during audit period
- Carrier partnerships secured within 12 months
