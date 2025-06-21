/**
 * Carrier Integration API
 * Handles communication with insurance carrier partners
 * Supports real-time quoting, binding, and policy management
 * 
 * @fileoverview Carrier integration API with standardized interfaces
 * @author MatchedCover Platform Team
 * @version 2.0.0
 */

import {
  QuoteRequest,
  CustomerInfo
} from '../../types/consolidated-interfaces';

/**
 * Carrier API response wrapper interface
 * Standardizes responses from all carrier integrations
 * 
 * @templa      // Transform request to carrier format
      const carrierRequest = await this.transformBindi      const carrierClaimData = await this.transformClaimData(claimData);

      const response = await this.submitCarrierRequest(
        endpoint.claimsUrl,
        carrierClaimData,
        claimData.carrierId
      );

      const claimResponse = await this.transformClaimResponse(response);(request);

      // Submit to carrier API
      const response = await this.submitCarrierRequest(
        endpoint.bindingUrl,
        carrierRequest,
        request.carrierId
      );

      // Transform response
      const transformedResponse = await this.transformPolicyResponse(response);of the response data
 * @interface CarrierAPIResponse
 */
export interface CarrierAPIResponse<T = unknown> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Response data payload */
  data?: T;
  /** Error message if request failed */
  error?: string;
  /** Response timestamp */
  timestamp: Date;
  /** Carrier identifier */
  carrierId: string;
  /** Unique request identifier */
  requestId: string;
}

/**
 * Extended applicant information for carrier APIs
 * Uses consolidated CustomerInfo as base
 * 
 * @interface ApplicantInfo
 */
export interface ApplicantInfo extends CustomerInfo {
  /** Social Security Number (encrypted) */
  ssn?: string;
  /** Date of birth as Date object */
  dateOfBirth: Date;
}

export interface RiskData {
  priorInsurance: PriorInsuranceInfo;
  claimsHistory: ClaimInfo[];
  drivingRecord?: DrivingInfo;
  propertyInfo?: PropertyInfo;
  creditHistory?: CreditInfo;
  additionalRisks: AdditionalRisk[];
}

export interface PriorInsuranceInfo {
  hasInsurance: boolean;
  carrierId?: string;
  policyNumber?: string;
  expirationDate?: Date;
  lapseReason?: string;
  yearsInsured?: number;
}

export interface ClaimInfo {
  claimNumber?: string;
  type: string;
  dateOfLoss: Date;
  amount: number;
  description: string;
  atFault?: boolean;
  settled: boolean;
}

export interface DrivingInfo {
  licenseNumber: string;
  licenseState: string;
  yearsLicensed: number;
  violations: ViolationInfo[];
  accidents: AccidentInfo[];
  defensiveDrivingCourse?: boolean;
  annualMileage: number;
}

export interface ViolationInfo {
  type: string;
  date: Date;
  description: string;
  points?: number;
  fine?: number;
}

export interface AccidentInfo {
  date: Date;
  type: string;
  atFault: boolean;
  damageAmount: number;
  injuries: boolean;
  description: string;
}

export interface PropertyInfo {
  propertyType: string;
  yearBuilt: number;
  squareFootage: number;
  constructionType: string;
  roofType: string;
  heatingType: string;
  foundationType: string;
  garageType?: string;
  swimmingPool?: boolean;
  alarm?: boolean;
  sprinklerSystem?: boolean;
  distanceToFireStation: number;
  distanceToHydrant: number;
  floodZone?: string;
  marketValue: number;
  replacementCost: number;
  occupancy: string;
  rentalProperty?: boolean;
}

export interface CreditInfo {
  score: number;
  reportDate: Date;
  bureau: string;
  bankruptcy?: boolean;
  bankruptcyDate?: Date;
  foreclosure?: boolean;
  foreclosureDate?: Date;
}

export interface AdditionalRisk {
  type: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  details: Record<string, unknown>;
}

export interface CoverageDetails {
  limits: CoverageLimits;
  deductibles: Deductibles;
  endorsements: Endorsement[];
  discounts: DiscountRequest[];
}

export interface CoverageLimits {
  bodilyInjuryPerPerson?: number;
  bodilyInjuryPerAccident?: number;
  propertyDamage?: number;
  personalInjuryProtection?: number;
  uninsuredMotorist?: number;
  underinsuredMotorist?: number;
  comprehensive?: number;
  collision?: number;
  dwelling?: number;
  personalProperty?: number;
  liability?: number;
  medicalPayments?: number;
  lossOfUse?: number;
}

export interface Deductibles {
  comprehensive?: number;
  collision?: number;
  dwelling?: number;
  personalProperty?: number;
  hurricane?: number;
  earthquake?: number;
}

export interface Endorsement {
  code: string;
  description: string;
  premium?: number;
  required: boolean;
  selected: boolean;
}

export interface DiscountRequest {
  code: string;
  description: string;
  qualifying: boolean;
  amount?: number;
  percentage?: number;
}

export interface AgentInfo {
  agentId: string;
  licenseNumber: string;
  agencyName: string;
  agencyCode?: string;
  producerCode?: string;
  commissionRate?: number;
}

export interface CarrierQuoteResponse {
  quoteId: string;
  carrierId: string;
  premium: PremiumBreakdown;
  coverages: CoverageResponse[];
  discounts: DiscountResponse[];
  surcharges: SurchargeResponse[];
  underwritingInfo: UnderwritingInfo;
  bindingInfo: BindingInfo;
  forms: FormInfo[];
  validUntil: Date;
  ratingFactors: RatingFactor[];
}

export interface PremiumBreakdown {
  totalPremium: number;
  basePremium: number;
  coveragePremiums: { [coverage: string]: number };
  discountAmount: number;
  surchargeAmount: number;
  taxes: number;
  fees: number;
  installmentFee?: number;
  paymentPlans: PaymentPlan[];
}

export interface CoverageResponse {
  code: string;
  description: string;
  limit: number;
  deductible?: number;
  premium: number;
  required: boolean;
  included: boolean;
}

export interface DiscountResponse {
  code: string;
  description: string;
  amount: number;
  percentage: number;
  applied: boolean;
}

export interface SurchargeResponse {
  code: string;
  description: string;
  amount: number;
  percentage: number;
  reason: string;
}

export interface UnderwritingInfo {
  approved: boolean;
  conditions: string[];
  exclusions: string[];
  requiredDocuments: string[];
  underwriterNotes: string[];
  riskClass: string;
  tierRating: string;
}

export interface BindingInfo {
  canBind: boolean;
  bindingDeadline?: Date;
  requiredSignatures: string[];
  requiredDocuments: string[];
  downPayment: number;
  effectiveDate: Date;
  expirationDate: Date;
}

export interface FormInfo {
  formNumber: string;
  formName: string;
  edition: string;
  required: boolean;
  description?: string;
}

export interface RatingFactor {
  factor: string;
  value: string | number;
  impact: 'increase' | 'decrease' | 'neutral';
  description: string;
}

export interface PaymentPlan {
  planId: string;
  description: string;
  installments: number;
  downPayment: number;
  installmentAmount: number;
  installmentFee: number;
  totalCost: number;
}

export interface BindingRequest {
  quoteId: string;
  carrierId: string;
  paymentInfo: PaymentInfo;
  effectiveDate: Date;
  selectedCoverages: SelectedCoverage[];
  selectedEndorsements: string[];
  selectedDiscounts: string[];
  applicantSignature: SignatureInfo;
  agentAttestation: AgentAttestation;
  additionalInfo?: Record<string, unknown>;
}

export interface PaymentInfo {
  method: 'credit_card' | 'ach' | 'check' | 'money_order';
  amount: number;
  paymentPlan?: string;
  creditCard?: CreditCardInfo;
  bankAccount?: BankAccountInfo;
}

export interface CreditCardInfo {
  cardNumber: string;
  expiryMonth: number;
  expiryYear: number;
  cvv: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface BankAccountInfo {
  accountNumber: string;
  routingNumber: string;
  accountType: 'checking' | 'savings';
  bankName: string;
}

export interface SelectedCoverage {
  code: string;
  limit: number;
  deductible?: number;
}

export interface SignatureInfo {
  signatureDate: Date;
  ipAddress: string;
  userAgent: string;
  electronicConsent: boolean;
}

export interface AgentAttestation {
  agentId: string;
  attestationDate: Date;
  disclosureProvided: boolean;
  regulatoryCompliance: boolean;
}

export interface PolicyIssuanceResponse {
  success: boolean;
  policyNumber: string;
  effectiveDate: Date;
  expirationDate: Date;
  premium: number;
  documents: PolicyDocument[];
  paymentSchedule: PaymentScheduleItem[];
  carrierContact: CarrierContactInfo;
  claimsContact: CarrierContactInfo;
  accountNumber?: string;
  onlineAccessInfo?: OnlineAccessInfo;
}

export interface PolicyDocument {
  documentId: string;
  type: 'policy' | 'declarations' | 'endorsement' | 'certificate';
  name: string;
  url?: string;
  base64Content?: string;
  mimeType: string;
  pageCount?: number;
}

export interface PaymentScheduleItem {
  dueDate: Date;
  amount: number;
  description: string;
  paymentMethod?: string;
}

export interface CarrierContactInfo {
  name: string;
  phone: string;
  email: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hours: string;
  website?: string;
}

export interface OnlineAccessInfo {
  portalUrl: string;
  username?: string;
  temporaryPassword?: string;
  setupInstructions: string[];
}

export class CarrierIntegrationAPI {
  private carrierEndpoints: Map<string, CarrierEndpoint>;
  private apiKeys: Map<string, string>;
  private rateLimits: Map<string, RateLimit>;

  constructor() {
    this.carrierEndpoints = new Map();
    this.apiKeys = new Map();
    this.rateLimits = new Map();
    this.initializeCarrierEndpoints();
  }

  /**
   * Submit quote request to carrier
   */
  async requestQuote(request: QuoteRequest): Promise<CarrierAPIResponse<CarrierQuoteResponse>> {
    const startTime = Date.now();
    
    try {
      // Validate required carrierId
      if (!request.carrierId) {
        throw new Error('Carrier ID is required for quote requests');
      }

      // Validate rate limits
      await this.checkRateLimit(request.carrierId);

      // Get carrier endpoint configuration
      const endpoint = this.carrierEndpoints.get(request.carrierId);
      if (!endpoint) {
        throw new Error(`Carrier ${request.carrierId} not configured`);
      }

      // Transform request to carrier format
      const carrierRequest = await this.transformQuoteRequest(request);

      // Submit to carrier API
      const response = await this.submitCarrierRequest(
        endpoint.quoteUrl,
        carrierRequest,
        request.carrierId
      );

      // Transform response from carrier format
      const transformedResponse = await this.transformQuoteResponse(response);

      // Log metrics
      await this.logAPIMetrics(request.carrierId, 'quote', Date.now() - startTime, true);

      return {
        success: true,
        data: transformedResponse,
        timestamp: new Date(),
        carrierId: request.carrierId,
        requestId: request.requestId
      };

    } catch (error) {
      const carrierId = request.carrierId || 'unknown';
      await this.logAPIMetrics(carrierId, 'quote', Date.now() - startTime, false);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date(),
        carrierId: carrierId,
        requestId: request.requestId
      };
    }
  }

  /**
   * Bind policy with carrier
   */
  async bindPolicy(request: BindingRequest): Promise<CarrierAPIResponse<PolicyIssuanceResponse>> {
    const startTime = Date.now();
    
    try {
      await this.checkRateLimit(request.carrierId);

      const endpoint = this.carrierEndpoints.get(request.carrierId);
      if (!endpoint) {
        throw new Error(`Carrier ${request.carrierId} not configured`);
      }

      // Validate binding eligibility
      await this.validateBindingRequest(request);

      // Transform request to carrier format
      const carrierRequest = await this.transformBindingRequest(request);

      // Submit binding request
      const response = await this.submitCarrierRequest(
        endpoint.bindingUrl,
        carrierRequest,
        request.carrierId
      );

      // Transform response
      const transformedResponse = await this.transformPolicyResponse(response);

      await this.logAPIMetrics(request.carrierId, 'binding', Date.now() - startTime, true);

      return {
        success: true,
        data: transformedResponse,
        timestamp: new Date(),
        carrierId: request.carrierId,
        requestId: request.quoteId
      };

    } catch (error) {
      await this.logAPIMetrics(request.carrierId, 'binding', Date.now() - startTime, false);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Binding failed',
        timestamp: new Date(),
        carrierId: request.carrierId,
        requestId: request.quoteId
      };
    }
  }

  /**
   * Get policy information from carrier
   */
  async getPolicyInfo(carrierId: string, policyNumber: string): Promise<CarrierAPIResponse<PolicyInfo>> {
    try {
      await this.checkRateLimit(carrierId);

      const endpoint = this.carrierEndpoints.get(carrierId);
      if (!endpoint) {
        throw new Error(`Carrier ${carrierId} not configured`);
      }

      const response = await this.submitCarrierRequest(
        `${endpoint.policyUrl}/${policyNumber}`,
        null,
        carrierId,
        'GET'
      );

      const policyInfo = await this.transformPolicyInfo(response);

      return {
        success: true,
        data: policyInfo,
        timestamp: new Date(),
        carrierId,
        requestId: `policy-${policyNumber}-${Date.now()}`
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to retrieve policy',
        timestamp: new Date(),
        carrierId,
        requestId: `policy-${policyNumber}-${Date.now()}`
      };
    }
  }

  /**
   * Submit claim to carrier
   */
  async submitClaim(carrierId: string, claimData: ClaimSubmissionData): Promise<CarrierAPIResponse<ClaimResponse>> {
    try {
      await this.checkRateLimit(carrierId);

      const endpoint = this.carrierEndpoints.get(carrierId);
      if (!endpoint) {
        throw new Error(`Carrier ${carrierId} not configured`);
      }

      const carrierClaimData = await this.transformClaimData(claimData);

      const response = await this.submitCarrierRequest(
        endpoint.claimsUrl,
        carrierClaimData,
        carrierId
      );

      const claimResponse = await this.transformClaimResponse(response);

      return {
        success: true,
        data: claimResponse,
        timestamp: new Date(),
        carrierId,
        requestId: claimData.reportId
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Claim submission failed',
        timestamp: new Date(),
        carrierId,
        requestId: claimData.reportId
      };
    }
  }

  /**
   * Get available carriers for coverage type
   */
  async getAvailableCarriers(coverageType: string): Promise<CarrierInfo[]> {
    const availableCarriers: CarrierInfo[] = [];
    
    for (const [carrierId, endpoint] of this.carrierEndpoints) {
      // Check if carrier supports the coverage type
      if (endpoint.supportedCoverageTypes?.includes(coverageType)) {
        availableCarriers.push({
          carrierId,
          name: endpoint.name,
          supportedCoverageTypes: endpoint.supportedCoverageTypes || [coverageType],
          apiEnabled: true,
          responseTime: endpoint.timeout || 30000
        });
      }
    }
    
    return availableCarriers;
  }

  // Private helper methods

  private async checkRateLimit(carrierId: string): Promise<void> {
    const rateLimit = this.rateLimits.get(carrierId);
    if (!rateLimit) return;

    const now = Date.now();
    const windowStart = now - rateLimit.windowMs;
    
    // Filter recent requests
    rateLimit.requests = rateLimit.requests.filter(timestamp => timestamp > windowStart);
    
    if (rateLimit.requests.length >= rateLimit.maxRequests) {
      throw new Error(`Rate limit exceeded for carrier ${carrierId}`);
    }
    
    rateLimit.requests.push(now);
  }

  private async submitCarrierRequest(
    url: string,
    data: any,
    carrierId: string,
    method: string = 'POST'
  ): Promise<unknown> {
    const apiKey = this.apiKeys.get(carrierId);
    if (!apiKey) {
      throw new Error(`API key not configured for carrier ${carrierId}`);
    }

    const requestConfig = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'MatchedCover-MGA/1.0'
      },
      body: method !== 'GET' ? JSON.stringify(data) : undefined
    };

    const response = await fetch(url, requestConfig);
    
    if (!response.ok) {
      throw new Error(`Carrier API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  private async transformQuoteRequest(request: QuoteRequest): Promise<unknown> {
    // Transform to carrier-specific format
    // This would be implemented per carrier based on their API specification
    return request;
  }

  private async transformQuoteResponse(response: any): Promise<CarrierQuoteResponse> {
    // Transform from carrier-specific format to standard format
    // This would be implemented per carrier
    return response as CarrierQuoteResponse;
  }

  private async transformBindingRequest(request: BindingRequest): Promise<unknown> {
    // Transform to carrier-specific binding format
    return request;
  }

  private async transformPolicyResponse(response: any): Promise<PolicyIssuanceResponse> {
    // Transform from carrier-specific format
    return response as PolicyIssuanceResponse;
  }

  private async validateBindingRequest(request: BindingRequest): Promise<void> {
    // Validate binding request meets carrier requirements
    if (!request.paymentInfo) {
      throw new Error('Payment information required for binding');
    }
    
    if (!request.applicantSignature) {
      throw new Error('Applicant signature required for binding');
    }
  }

  private async logAPIMetrics(
    carrierId: string,
    operation: string,
    duration: number,
    success: boolean
  ): Promise<void> {
    // Log metrics for monitoring and analytics
    console.log(`Carrier API - ${carrierId} ${operation}: ${duration}ms (${success ? 'success' : 'failure'})`);
  }

  private async transformPolicyInfo(response: any): Promise<PolicyInfo> {
    return response as PolicyInfo;
  }

  private async transformClaimData(claimData: ClaimSubmissionData): Promise<unknown> {
    return claimData;
  }

  private async transformClaimResponse(response: any): Promise<ClaimResponse> {
    return response as ClaimResponse;
  }

  private initializeCarrierEndpoints(): void {
    // Initialize carrier endpoint configurations
    // In production, this would load from secure configuration
    
    this.carrierEndpoints.set('carrier-001', {
      carrierId: 'carrier-001',
      name: 'Premier Insurance Group',
      quoteUrl: 'https://api.premier-insurance.com/v2/quotes',
      bindingUrl: 'https://api.premier-insurance.com/v2/policies',
      policyUrl: 'https://api.premier-insurance.com/v2/policies',
      claimsUrl: 'https://api.premier-insurance.com/v2/claims',
      authType: 'bearer',
      timeout: 30000,
      retryAttempts: 3,
      supportedCoverageTypes: ['auto', 'home'],
      apiVersion: 'v2'
    });

    // Set rate limits
    this.rateLimits.set('carrier-001', {
      maxRequests: 100,
      windowMs: 60000, // 1 minute
      requests: []
    });

    // Set API keys (in production, these would come from secure storage)
    this.apiKeys.set('carrier-001', 'mock-api-key-premier');
  }
}

// Supporting interfaces
interface CarrierEndpoint {
  carrierId: string;
  name: string;
  quoteUrl: string;
  bindingUrl: string;
  policyUrl: string;
  claimsUrl: string;
  authType: 'bearer' | 'api_key' | 'basic';
  timeout: number;
  retryAttempts: number;
  supportedCoverageTypes: string[];
  apiVersion: string;
}

interface RateLimit {
  maxRequests: number;
  windowMs: number;
  requests: number[];
}

interface PolicyInfo {
  policyNumber: string;
  status: string;
  effectiveDate: Date;
  expirationDate: Date;
  premium: number;
  coverages: CoverageResponse[];
  insured: ApplicantInfo;
}

interface ClaimSubmissionData {
  reportId: string;
  policyNumber: string;
  claimantInfo: ApplicantInfo;
  lossInfo: LossInfo;
  reportingInfo: ReportingInfo;
}

interface LossInfo {
  dateOfLoss: Date;
  timeOfLoss?: string;
  causeOfLoss: string;
  lossDescription: string;
  lossLocation: string;
  estimatedAmount?: number;
  policeReportNumber?: string;
  injuries?: boolean;
  witnesses?: WitnessInfo[];
}

interface ReportingInfo {
  reportedBy: string;
  reportedDate: Date;
  reportedTo: string;
  initialContactMethod: string;
}

interface WitnessInfo {
  name: string;
  phone?: string;
  address?: string;
  statement?: string;
}

interface ClaimResponse {
  claimNumber: string;
  status: string;
  adjusterInfo: AdjusterInfo;
  nextSteps: string[];
  estimatedSettlementTime: number;
  requiredDocuments: string[];
}

interface AdjusterInfo {
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
}

export default CarrierIntegrationAPI;

interface CarrierInfo {
  carrierId: string;
  name: string;
  supportedCoverageTypes: string[];
  apiEnabled: boolean;
  responseTime: number;
}
