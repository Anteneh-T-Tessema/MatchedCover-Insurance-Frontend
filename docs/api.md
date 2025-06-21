# API Documentation

## SOC 2 & GRC Platform API Reference

### Authentication

All API endpoints require authentication via JWT tokens:

```bash
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### Compliance Validation

**POST** `/api/compliance/validate`
- Validates compliance against specified framework
- Body: `{ framework: 'SOC2' | 'ISO27001' | 'PCIDSS' }`
- Returns: `ComplianceValidationResult`

**GET** `/api/compliance/status/{framework}`
- Gets current compliance status
- Returns: Current compliance percentage and details

#### Risk Assessment

**POST** `/api/risk/assess`
- Performs risk assessment
- Body: `RiskAssessment` object
- Returns: Risk analysis with mitigation strategies

**GET** `/api/risk/dashboard`
- Gets risk dashboard data
- Returns: Current risk metrics and trends

#### Integration Testing

**POST** `/api/testing/comprehensive`
- Runs comprehensive integration tests
- Returns: `ComprehensiveTestResult`

**GET** `/api/testing/status`
- Gets current test status
- Returns: Test results and health metrics

### Response Formats

All responses follow the standard format:

```json
{
  "success": boolean,
  "data": object,
  "error": string | null,
  "timestamp": string
}
```

### Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Rate Limiting

API calls are limited to 1000 requests per hour per authenticated user.
