# Development Guide

## SOC 2 & GRC Platform Development

### Getting Started

#### Prerequisites
- Node.js 18+ with npm/yarn
- Docker and Docker Compose
- PostgreSQL 14+
- Redis 6+

#### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/soc2-grc-platform.git
cd soc2-grc-platform

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
cp .env.soc2-agents.example .env.soc2-agents

# Start development services
docker-compose up -d

# Run database migrations
npm run db:migrate

# Start the development server
npm run dev
```

### Development Workflow

#### Code Organization
- `src/app/` - Next.js app router pages and layouts
- `src/components/` - Reusable React components
- `src/agents/` - AI evaluation and compliance agents
- `src/services/` - Business logic and external integrations
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions and helpers

#### Coding Standards
- TypeScript strict mode enabled
- ESLint and Prettier for code formatting
- Conventional commits for version control
- 80%+ test coverage requirement

### Agent Development

#### Creating New Agents
1. Extend the `BaseAgent` class
2. Implement required abstract methods
3. Add agent configuration to `agent-config.json`
4. Create comprehensive unit tests
5. Add integration tests

#### Agent Testing
```bash
# Test specific agent
npm run test:agent QualityAssuranceAgent

# Test all agents
npm run test:agents

# Run integration tests
npm run test:integration
```

### Compliance Framework Integration

#### Adding New Frameworks
1. Create framework definition in `src/frameworks/`
2. Implement validation logic
3. Add control mappings
4. Create test suite
5. Update documentation

#### Framework Validation
```bash
# Validate SOC 2 compliance
npm run validate:soc2

# Validate ISO 27001 compliance
npm run validate:iso27001

# Validate PCI DSS compliance
npm run validate:pcidss
```

### Testing Strategy

#### Unit Tests
- Jest framework with TypeScript support
- React Testing Library for component tests
- Mock external dependencies
- Aim for 90%+ code coverage

#### Integration Tests
- Test agent interoperability
- Validate API endpoints
- Database integrity checks
- End-to-end workflows

#### Performance Tests
- Load testing with k6
- Memory leak detection
- Database query optimization
- API response time monitoring

### Database Management

#### Migrations
```bash
# Create new migration
npm run db:migration:create migration_name

# Run pending migrations
npm run db:migrate

# Rollback last migration
npm run db:rollback
```

#### Seeding
```bash
# Seed development data
npm run db:seed

# Seed production data (use with caution)
npm run db:seed:production
```

### Quality Assurance

#### Code Quality Checks
```bash
# Run all quality checks
npm run qa

# TypeScript type checking
npm run type-check

# Linting
npm run lint

# Security vulnerability scan
npm run security:scan
```

#### Continuous Integration
- GitHub Actions for CI/CD
- Automated testing on PR
- Security scanning
- Performance regression detection

### Deployment

#### Development
```bash
# Build application
npm run build

# Start production server
npm run start
```

#### Production
```bash
# Build Docker image
docker build -t soc2-grc-platform:latest .

# Deploy with Kubernetes
kubectl apply -f k8s/

# Deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Monitoring and Debugging

#### Application Monitoring
- Health check endpoints
- Metrics collection with Prometheus
- Error tracking with Sentry
- Performance monitoring

#### Debugging
- VS Code debugger configuration
- Chrome DevTools integration
- Network request inspection
- Database query analysis

### Contributing

#### Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation
4. Run full test suite
5. Submit PR with detailed description

#### Code Review Guidelines
- Security considerations
- Performance implications
- Test coverage adequacy
- Documentation completeness

### Environment Configuration

#### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `JWT_SECRET` - JWT signing secret
- `API_BASE_URL` - Base API URL
- `GEMINI_API_KEY` - Google Gemini API key

#### Security Configuration
- Enable HTTPS in production
- Configure CORS policies
- Set up rate limiting
- Implement request validation
