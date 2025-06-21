/**
 * MGA (Managing General Agent) Business Logic
 * Handles the business operations between customers and carrier partners
 */

import { AIUnderwritingEngine, RiskFactors, UnderwritingDecision, CarrierMatch } from '../underwriting/AIUnderwritingEngine';

export interface MGAPolicy {
  id: string;
  customerID: string;
  carrierID: string;
  policyNumber: string;
  coverageType: string;
  coverageAmount: number;
  premium: number;
  deductible: number;
  effectiveDate: Date;
  expirationDate: Date;
  status: PolicyStatus;
  underwritingDecision: UnderwritingDecision;
  commissionEarned: number;
  documents: PolicyDocument[];
  riskFactors: RiskFactors;
}

export interface PolicyDocument {
  id: string;
  type: DocumentType;
  url: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
  dateOfBirth: Date;
  ssn?: string;
  creditScore?: number;
  riskProfile: CustomerRiskProfile;
  policies: MGAPolicy[];
  totalPremium: number;
  lifetimeValue: number;
  acquisitionCost: number;
  profitability: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CustomerRiskProfile {
  overallScore: number;
  creditRisk: number;
  behavioralRisk: number;
  locationRisk: number;
  claimsRisk: number;
  fraudRisk: number;
  lastUpdated: Date;
}

export interface CarrierPartnership {
  id: string;
  name: string;
  amBestRating: string;
  financialStrength: string;
  licenseStates: string[];
  coverageTypes: string[];
  commissionStructure: CommissionStructure;
  bindingAuthority: BindingAuthority;
  apiIntegration: APIIntegration;
  performance: CarrierPerformance;
  contractTerms: ContractTerms;
}

export interface CommissionStructure {
  baseRate: number;
  performanceBonuses: PerformanceBonus[];
  volumeTiers: VolumeTier[];
  renewalBonus: number;
  overrideCommissions: number;
}

export interface PerformanceBonus {
  metric: 'loss_ratio' | 'retention_rate' | 'growth_rate';
  threshold: number;
  bonusRate: number;
}

export interface VolumeTier {
  minPremium: number;
  maxPremium: number;
  commissionRate: number;
}

export interface BindingAuthority {
  maxPolicyLimit: number;
  maxAggregateLimit: number;
  restrictedRisks: string[];
  requiresCarrierApproval: string[];
  autoBindingEnabled: boolean;
}

export interface APIIntegration {
  quotingAPI: boolean;
  bindingAPI: boolean;
  claimsAPI: boolean;
  documentsAPI: boolean;
  paymentsAPI: boolean;
  ratingsAPI: boolean;
  autoBindingEnabled: boolean;
}

export interface CarrierPerformance {
  lossRatio: number;
  expenseRatio: number;
  combinedRatio: number;
  averageClaimSettlementTime: number;
  customerSatisfactionScore: number;
  financialStability: number;
  marketShare: number;
}

export interface ContractTerms {
  effectiveDate: Date;
  expirationDate: Date;
  terminationNoticePeriod: number;
  exclusiveStates: string[];
  minimumPremiumRequirement: number;
  performanceStandards: PerformanceStandard[];
}

export interface PerformanceStandard {
  metric: string;
  target: number;
  measurement: 'monthly' | 'quarterly' | 'annually';
  consequence: string;
}

export enum PolicyStatus {
  QUOTED = 'quoted',
  BOUND = 'bound',
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  PENDING_RENEWAL = 'pending_renewal',
  RENEWED = 'renewed'
}

export enum DocumentType {
  APPLICATION = 'application',
  DRIVERS_LICENSE = 'drivers_license',
  INSURANCE_SCORE = 'insurance_score',
  PROPERTY_INSPECTION = 'property_inspection',
  FINANCIAL_STATEMENT = 'financial_statement',
  CLAIMS_HISTORY = 'claims_history',
  POLICY_DOCUMENTS = 'policy_documents',
  PAYMENT_RECEIPT = 'payment_receipt'
}

export class MGABusinessEngine {
  private underwritingEngine: AIUnderwritingEngine;
  private carriers: Map<string, CarrierPartnership>;
  private policies: Map<string, MGAPolicy>;
  private customers: Map<string, Customer>;

  constructor() {
    this.underwritingEngine = new AIUnderwritingEngine();
    this.carriers = new Map();
    this.policies = new Map();
    this.customers = new Map();
    this.initializeCarrierPartnerships();
  }

  /**
   * Complete quote-to-bind workflow
   */
  async processApplication(
    customerData: Partial<Customer>,
    riskFactors: RiskFactors,
    coverageType: string,
    coverageAmount: number,
    deductible: number
  ): Promise<ApplicationResult> {
    
    try {
      // Step 1: Customer onboarding and risk assessment
      const customer = await this.onboardCustomer(customerData);
      
      // Step 2: AI underwriting decision
      const underwritingDecision = await this.underwritingEngine.underwrite(
        riskFactors,
        coverageType,
        coverageAmount,
        deductible
      );

      // Step 3: Carrier selection and pricing
      const carrierSelection = await this.selectOptimalCarrier(
        underwritingDecision.carrierRecommendations,
        customer,
        coverageType
      );

      // Step 4: Generate quote
      const quote = await this.generateQuote(
        customer,
        underwritingDecision,
        carrierSelection,
        coverageType,
        coverageAmount,
        deductible
      );

      // Step 5: Risk-based pricing optimization
      const optimizedQuote = await this.optimizeQuotePricing(quote, customer, underwritingDecision);

      return {
        success: true,
        customer,
        underwritingDecision,
        quote: optimizedQuote,
        carrierSelection,
        nextSteps: this.generateNextSteps(underwritingDecision),
        estimatedCommission: this.calculateEstimatedCommission(optimizedQuote, carrierSelection),
        profitabilityAnalysis: this.analyzeProfitability(optimizedQuote, underwritingDecision)
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        customer: null,
        underwritingDecision: null,
        quote: null,
        carrierSelection: null,
        nextSteps: ['Contact underwriting for manual review'],
        estimatedCommission: 0,
        profitabilityAnalysis: null
      };
    }
  }

  /**
   * Bind policy with selected carrier
   */
  async bindPolicy(
    quoteId: string,
    paymentInformation: PaymentInformation,
    additionalDocuments: PolicyDocument[] = []
  ): Promise<BindingResult> {
    
    try {
      const quote = await this.getQuote(quoteId);
      if (!quote) {
        throw new Error('Quote not found');
      }

      // Step 1: Validate quote is still valid
      await this.validateQuoteExpiration(quote);

      // Step 2: Process payment
      const paymentResult = await this.processPayment(paymentInformation, quote.premium);

      // Step 3: Submit to carrier for binding
      const carrierBindingResult = await this.submitToCarrierForBinding(quote, paymentResult);

      // Step 4: Create policy record
      const policy = await this.createPolicyRecord(quote, carrierBindingResult, additionalDocuments);

      // Step 5: Generate policy documents
      const policyDocuments = await this.generatePolicyDocuments(policy);

      // Step 6: Setup automated processes
      await this.setupPolicyAutomation(policy);

      return {
        success: true,
        policy,
        policyDocuments,
        carrierConfirmation: carrierBindingResult,
        paymentConfirmation: paymentResult,
        commissionEarned: this.calculateCommission(policy),
        nextSteps: this.generatePostBindingSteps(policy)
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Binding failed',
        policy: null,
        policyDocuments: [],
        carrierConfirmation: null,
        paymentConfirmation: null,
        commissionEarned: 0,
        nextSteps: ['Contact customer service for assistance']
      };
    }
  }

  /**
   * Portfolio management and analytics
   */
  async getPortfolioAnalytics(dateRange: DateRange): Promise<PortfolioAnalytics> {
    const policies = Array.from(this.policies.values()).filter(
      policy => policy.effectiveDate >= dateRange.start && policy.effectiveDate <= dateRange.end
    );

    const totalPremium = policies.reduce((sum, policy) => sum + policy.premium, 0);
    const totalCommission = policies.reduce((sum, policy) => sum + policy.commissionEarned, 0);
    
    const carrierDistribution = this.calculateCarrierDistribution(policies);
    const riskDistribution = this.calculateRiskDistribution(policies);
    const profitabilityAnalysis = this.calculatePortfolioProfitability(policies);

    return {
      totalPolicies: policies.length,
      totalPremium,
      totalCommission,
      averagePremium: totalPremium / policies.length || 0,
      conversionRate: this.calculateConversionRate(dateRange),
      retentionRate: this.calculateRetentionRate(dateRange),
      lossRatio: this.calculateLossRatio(policies),
      carrierDistribution,
      riskDistribution,
      profitabilityAnalysis,
      growthMetrics: this.calculateGrowthMetrics(dateRange),
      predictiveInsights: await this.generatePredictiveInsights(policies)
    };
  }

  /**
   * Claims processing and management
   */
  async processClaim(
    policyId: string,
    claimData: ClaimSubmission
  ): Promise<ClaimProcessingResult> {
    
    const policy = this.policies.get(policyId);
    if (!policy) {
      throw new Error('Policy not found');
    }

    // Step 1: Initial claim validation
    const validation = await this.validateClaim(claimData, policy);

    // Step 2: Fraud detection
    const fraudAnalysis = await this.analyzeFraudRisk(claimData, policy);

    // Step 3: Coverage verification
    const coverageAnalysis = await this.verifyCoverage(claimData, policy);

    // Step 4: Initial reserves calculation
    const reservesEstimate = await this.calculateInitialReserves(claimData, policy);

    // Step 5: Carrier notification
    const carrierNotification = await this.notifyCarrier(claimData, policy, fraudAnalysis);

    // Step 6: Assign claim handler
    const claimHandler = await this.assignClaimHandler(claimData, fraudAnalysis.riskLevel);

    return {
      claimNumber: this.generateClaimNumber(),
      status: 'submitted',
      validation,
      fraudAnalysis,
      coverageAnalysis,
      reservesEstimate,
      carrierNotification,
      claimHandler,
      nextSteps: this.generateClaimNextSteps(fraudAnalysis.riskLevel),
      estimatedSettlementTime: this.estimateSettlementTime(claimData.type, fraudAnalysis.riskLevel)
    };
  }

  // Private helper methods

  private async onboardCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customerId = this.generateCustomerId();
    
    const customer: Customer = {
      id: customerId,
      firstName: customerData.firstName || '',
      lastName: customerData.lastName || '',
      email: customerData.email || '',
      phone: customerData.phone || '',
      address: customerData.address || {} as Address,
      dateOfBirth: customerData.dateOfBirth || new Date(),
      ssn: customerData.ssn,
      creditScore: customerData.creditScore,
      riskProfile: await this.generateRiskProfile(customerData),
      policies: [],
      totalPremium: 0,
      lifetimeValue: 0,
      acquisitionCost: this.calculateAcquisitionCost(),
      profitability: 0
    };

    this.customers.set(customerId, customer);
    return customer;
  }

  private async selectOptimalCarrier(
    carrierRecommendations: CarrierMatch[],
    customer: Customer,
    coverageType: string
  ): Promise<CarrierSelection> {
    
    // Score each carrier based on multiple factors
    const scoredCarriers = carrierRecommendations.map(rec => {
      const carrier = this.carriers.get(rec.carrierId);
      if (!carrier) return null;

      const score = this.calculateCarrierScore(rec, carrier, customer, coverageType);
      
      return {
        carrier,
        recommendation: rec,
        score,
        reasoning: this.generateCarrierSelectionReasoning(score, carrier, rec)
      };
    }).filter(Boolean);

    // Sort by score and return top choice
    scoredCarriers.sort((a, b) => (b?.score || 0) - (a?.score || 0));
    
    const selectedCarrier = scoredCarriers[0];
    if (!selectedCarrier) {
      throw new Error('No suitable carrier found');
    }

    return {
      carrierId: selectedCarrier.carrier!.id,
      carrierName: selectedCarrier.carrier!.name,
      selectionScore: selectedCarrier.score,
      reasoning: selectedCarrier.reasoning,
      commissionRate: selectedCarrier.carrier!.commissionStructure.baseRate,
      bindingAuthority: selectedCarrier.carrier!.bindingAuthority,
      alternativeCarriers: scoredCarriers.slice(1, 3).map(alt => ({
        carrierId: alt!.carrier!.id,
        carrierName: alt!.carrier!.name,
        score: alt!.score
      }))
    };
  }

  private async generateQuote(
    customer: Customer,
    underwritingDecision: UnderwritingDecision,
    carrierSelection: CarrierSelection,
    coverageType: string,
    coverageAmount: number,
    deductible: number
  ): Promise<InsuranceQuote> {
    
    const quoteId = this.generateQuoteId();
    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

    return {
      id: quoteId,
      customerId: customer.id,
      carrierId: carrierSelection.carrierId,
      coverageType,
      coverageAmount,
      deductible,
      premium: underwritingDecision.finalPremium,
      underwritingDecision,
      carrierSelection,
      createdAt: new Date(),
      expiresAt: expirationDate,
      status: 'active',
      discounts: this.calculateAvailableDiscounts(customer, underwritingDecision),
      coverageDetails: this.generateCoverageDetails(coverageType, coverageAmount, deductible),
      termsAndConditions: this.generateTermsAndConditions(carrierSelection.carrierId, coverageType)
    };
  }

  private calculateCarrierScore(
    recommendation: CarrierMatch,
    carrier: CarrierPartnership,
    customer: Customer,
    coverageType: string
  ): number {
    let score = recommendation.matchScore;
    
    // Financial strength bonus
    score += this.getFinancialStrengthScore(carrier.amBestRating);
    
    // Commission attractiveness
    score += carrier.commissionStructure.baseRate * 100;
    
    // Performance metrics
    score += (100 - carrier.performance.combinedRatio);
    score += carrier.performance.customerSatisfactionScore;
    
    // API integration capabilities
    if (carrier.apiIntegration.autoBindingEnabled) score += 10;
    
    // Geographic preference
    if (carrier.licenseStates.includes(customer.address.state)) score += 15;
    
    return Math.min(100, score);
  }

  private getFinancialStrengthScore(rating: string): number {
    const ratings: { [key: string]: number } = {
      'A++': 20, 'A+': 18, 'A': 15, 'A-': 12,
      'B++': 10, 'B+': 8, 'B': 6, 'B-': 4,
      'C++': 2, 'C+': 1, 'C': 0
    };
    return ratings[rating] || 0;
  }

  private async generateRiskProfile(customerData: Partial<Customer>): Promise<CustomerRiskProfile> {
    const now = new Date();
    
    // Credit risk assessment (0-100, lower is better)
    let creditRisk = 50;
    if (customerData.creditScore) {
      if (customerData.creditScore >= 750) creditRisk = 10;
      else if (customerData.creditScore >= 700) creditRisk = 20;
      else if (customerData.creditScore >= 650) creditRisk = 35;
      else if (customerData.creditScore >= 600) creditRisk = 55;
      else creditRisk = 80;
    }

    // Behavioral risk based on age (calculated from dateOfBirth)
    let behavioralRisk = 30;
    if (customerData.dateOfBirth) {
      const age = Math.floor((Date.now() - customerData.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 25) behavioralRisk += 20;
      else if (age >= 50) behavioralRisk -= 10;
    }
    
    // Location risk using address zip code
    let locationRisk = 25;
    if (customerData.address?.zipCode) {
      const zip = parseInt(customerData.address.zipCode.substring(0, 2));
      // High cost areas (CA, NY, FL)
      if ([90, 91, 92, 93, 94, 95, 96, 10, 11, 33, 34].includes(zip)) {
        locationRisk = 45;
      }
      // Low cost rural areas
      else if ([50, 51, 52, 53, 54, 55, 56, 57, 58, 59].includes(zip)) {
        locationRisk = 15;
      }
    }

    // Claims risk assessment based on existing policies
    let claimsRisk = 20;
    if (customerData.policies && customerData.policies.length > 0) {
      const hasHighValuePolicies = customerData.policies.some(p => p.premium > 2000);
      const hasMultiplePolicies = customerData.policies.length > 2;
      
      if (hasHighValuePolicies) claimsRisk += 15;
      if (hasMultiplePolicies) claimsRisk -= 5; // Multi-policy discount for loyalty
    }

    // Fraud risk indicators
    let fraudRisk = 10;
    if (customerData.email && customerData.email.includes('temp')) {
      fraudRisk += 25;
    }
    if (customerData.phone && customerData.phone.replace(/\D/g, '').length !== 10) {
      fraudRisk += 15;
    }

    const overallScore = Math.round(
      (creditRisk * 0.3) + 
      (behavioralRisk * 0.2) + 
      (locationRisk * 0.2) + 
      (claimsRisk * 0.2) + 
      (fraudRisk * 0.1)
    );

    return {
      overallScore,
      creditRisk,
      behavioralRisk,
      locationRisk,
      claimsRisk,
      fraudRisk,
      lastUpdated: now
    };
  }

  private calculateAcquisitionCost(): number {
    // Average customer acquisition cost
    return 150;
  }

  private generateCustomerId(): string {
    return `CUST_${Date.now()}_${this.generateSecureId(9)}`;
  }

  private generateQuoteId(): string {
    return `QUOTE_${Date.now()}_${this.generateSecureId(9)}`;
  }

  private generateClaimNumber(): string {
    return `CLM_${Date.now()}_${this.generateSecureId(9)}`;
  }

  private generateSecureId(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const now = Date.now();
    
    for (let i = 0; i < length; i++) {
      // Use timestamp and position for deterministic but unique generation
      const index = (now + i * 37) % chars.length;
      result += chars[index];
    }
    
    return result;
  }

  private initializeCarrierPartnerships(): void {
    // Initialize with sample carrier partnerships
    // In production, this would load from database
  }

  // Additional helper methods would be implemented here...
  private async getQuote(quoteId: string): Promise<InsuranceQuote | null> {
    // Implementation placeholder
    return null;
  }

  private async validateQuoteExpiration(quote: InsuranceQuote): Promise<void> {
    if (quote.expiresAt < new Date()) {
      throw new Error('Quote has expired');
    }
  }

  private async processPayment(paymentInfo: PaymentInformation, amount: number): Promise<PaymentResult> {
    // Implementation placeholder
    return { success: true, transactionId: 'TXN_' + Date.now() };
  }

  private async submitToCarrierForBinding(quote: InsuranceQuote, payment: PaymentResult): Promise<CarrierBindingResult> {
    // Implementation placeholder
    return { success: true, policyNumber: 'POL_' + Date.now(), carrierId: quote.carrierId };
  }

  private async createPolicyRecord(quote: InsuranceQuote, binding: CarrierBindingResult, docs: PolicyDocument[]): Promise<MGAPolicy> {
    // Implementation placeholder
    const policy: MGAPolicy = {
      id: 'POL_' + Date.now(),
      customerID: quote.customerId,
      carrierID: quote.carrierId,
      policyNumber: binding.policyNumber,
      coverageType: quote.coverageType,
      coverageAmount: quote.coverageAmount,
      premium: quote.premium,
      deductible: quote.deductible,
      effectiveDate: new Date(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      status: PolicyStatus.ACTIVE,
      underwritingDecision: quote.underwritingDecision,
      commissionEarned: this.calculateCommission({ premium: quote.premium } as MGAPolicy),
      documents: docs,
      riskFactors: {} as RiskFactors
    };
    
    this.policies.set(policy.id, policy);
    return policy;
  }

  private calculateCommission(policy: MGAPolicy): number {
    // Simplified commission calculation
    return policy.premium * 0.12; // 12% commission
  }

  // Placeholder implementations for other private methods...
  private async generatePolicyDocuments(policy: MGAPolicy): Promise<PolicyDocument[]> { return []; }
  private async setupPolicyAutomation(policy: MGAPolicy): Promise<void> { }
  private generatePostBindingSteps(policy: MGAPolicy): string[] { return []; }
  private generateNextSteps(decision: UnderwritingDecision): string[] { return []; }
  private calculateEstimatedCommission(quote: InsuranceQuote, carrier: CarrierSelection): number { return 0; }
  private analyzeProfitability(quote: InsuranceQuote, decision: UnderwritingDecision): ProfitabilityAnalysis | null { return null; }
  private async optimizeQuotePricing(quote: InsuranceQuote, customer: Customer, decision: UnderwritingDecision): Promise<InsuranceQuote> { return quote; }
  private calculateCarrierDistribution(policies: MGAPolicy[]): CarrierDistribution[] { return []; }
  private calculateRiskDistribution(policies: MGAPolicy[]): RiskDistribution[] { return []; }
  private calculatePortfolioProfitability(policies: MGAPolicy[]): PortfolioProfitability { return { totalRevenue: 0, totalExpenses: 0, netProfit: 0, profitMargin: 0, commissionEarned: 0, lossRatio: 0 }; }
  private calculateConversionRate(dateRange: DateRange): number { return 0; }
  private calculateRetentionRate(dateRange: DateRange): number { return 0; }
  private calculateLossRatio(policies: MGAPolicy[]): number { return 0; }
  private calculateGrowthMetrics(dateRange: DateRange): GrowthMetrics { return { periodStart: new Date(), periodEnd: new Date(), newPolicies: 0, renewedPolicies: 0, cancelledPolicies: 0, netGrowth: 0, growthRate: 0, premiumGrowth: 0 }; }
  private async generatePredictiveInsights(_policies: MGAPolicy[]): Promise<Record<string, unknown>> { return {}; }
  private async validateClaim(claim: ClaimSubmission, policy: MGAPolicy): Promise<ClaimValidation> { return { isValid: true, coverageExists: true, withinPolicyPeriod: true, deductibleMet: true, exclusionsApply: false, estimatedValue: 0, validationNotes: [] }; }
  private async analyzeFraudRisk(claim: ClaimSubmission, policy: MGAPolicy): Promise<FraudAnalysis> { return { riskScore: 0, riskLevel: 'low', indicators: [], recommendedAction: 'approve', confidence: 100, flaggedPatterns: [] }; }
  private async verifyCoverage(claim: ClaimSubmission, policy: MGAPolicy): Promise<CoverageAnalysis> { return { coverageType: '', isApplicable: true, coverageLimit: 0, deductible: 0, availableBenefit: 0, exclusions: [], conditions: [] }; }
  private async calculateInitialReserves(claim: ClaimSubmission, policy: MGAPolicy): Promise<number> { return 0; }
  private async notifyCarrier(_claim: ClaimSubmission, _policy: MGAPolicy, _fraud: FraudAnalysis): Promise<CarrierNotification> { return { notificationId: 'NOTIF_' + Date.now(), carrierId: '', claimId: '', priority: 'medium', sentAt: new Date(), acknowledged: false }; }
  private async assignClaimHandler(claim: ClaimSubmission, riskLevel: string): Promise<ClaimHandler> { return { handlerId: 'HANDLER_' + Date.now(), name: 'John Doe', specialties: [], currentCaseload: 0, averageResolutionTime: 0, experienceYears: 0, contactInfo: { email: '', phone: '' } }; }
  private generateClaimNextSteps(riskLevel: string): string[] { return []; }
  private estimateSettlementTime(_claimType: string, _riskLevel: string): number { return 30; }
  private calculateAvailableDiscounts(_customer: Customer, _decision: UnderwritingDecision): Array<{name: string; amount: number; type: string}> { return []; }
  private generateCoverageDetails(_type: string, _amount: number, _deductible: number): Record<string, unknown> { return {}; }
  private generateTermsAndConditions(_carrierId: string, _coverageType: string): string[] { return []; }
  private generateCarrierSelectionReasoning(_score: number, _carrier: CarrierPartnership, _rec: CarrierMatch): string[] { return []; }
}

/**
 * Distribution analysis interfaces
 */
export interface CarrierDistribution {
  carrierId: string;
  carrierName: string;
  policyCount: number;
  totalPremium: number;
  averagePremium: number;
  marketShare: number;
}

export interface RiskDistribution {
  riskLevel: 'low' | 'medium' | 'high';
  policyCount: number;
  totalPremium: number;
  averageLossRatio: number;
  profitability: number;
}

export interface PortfolioProfitability {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  commissionEarned: number;
  lossRatio: number;
}

export interface GrowthMetrics {
  periodStart: Date;
  periodEnd: Date;
  newPolicies: number;
  renewedPolicies: number;
  cancelledPolicies: number;
  netGrowth: number;
  growthRate: number;
  premiumGrowth: number;
}

export interface ClaimValidation {
  isValid: boolean;
  coverageExists: boolean;
  withinPolicyPeriod: boolean;
  deductibleMet: boolean;
  exclusionsApply: boolean;
  estimatedValue: number;
  validationNotes: string[];
}

export interface FraudAnalysis {
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  indicators: string[];
  recommendedAction: 'approve' | 'investigate' | 'deny';
  confidence: number;
  flaggedPatterns: string[];
}

export interface CoverageAnalysis {
  coverageType: string;
  isApplicable: boolean;
  coverageLimit: number;
  deductible: number;
  availableBenefit: number;
  exclusions: string[];
  conditions: string[];
}

export interface CarrierNotification {
  notificationId: string;
  carrierId: string;
  claimId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sentAt: Date;
  acknowledged: boolean;
  response?: string;
}

export interface ClaimHandler {
  handlerId: string;
  name: string;
  specialties: string[];
  currentCaseload: number;
  averageResolutionTime: number;
  experienceYears: number;
  contactInfo: {
    email: string;
    phone: string;
  };
}

// Supporting interfaces and types
export interface ApplicationResult {
  success: boolean;
  customer: Customer | null;
  underwritingDecision: UnderwritingDecision | null;
  quote: InsuranceQuote | null;
  carrierSelection: CarrierSelection | null;
  nextSteps: string[];
  estimatedCommission: number;
  profitabilityAnalysis: ProfitabilityAnalysis | null;
  error?: string;
}

export interface InsuranceQuote {
  id: string;
  customerId: string;
  carrierId: string;
  coverageType: string;
  coverageAmount: number;
  deductible: number;
  premium: number;
  underwritingDecision: UnderwritingDecision;
  carrierSelection: CarrierSelection;
  createdAt: Date;
  expiresAt: Date;
  status: string;
  discounts: Array<{name: string; amount: number; type: string}>;
  coverageDetails: Record<string, unknown>;
  termsAndConditions: string[];
}

export interface CarrierSelection {
  carrierId: string;
  carrierName: string;
  selectionScore: number;
  reasoning: string[];
  commissionRate: number;
  bindingAuthority: BindingAuthority;
  alternativeCarriers: { carrierId: string; carrierName: string; score: number; }[];
}

export interface BindingResult {
  success: boolean;
  policy: MGAPolicy | null;
  policyDocuments: PolicyDocument[];
  carrierConfirmation: CarrierBindingResult | null;
  paymentConfirmation: PaymentResult | null;
  commissionEarned: number;
  nextSteps: string[];
  error?: string;
}

export interface PaymentInformation {
  method: 'credit_card' | 'ach' | 'check';
  amount: number;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  bankAccount?: string;
  routingNumber?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  error?: string;
}

export interface CarrierBindingResult {
  success: boolean;
  policyNumber: string;
  carrierId: string;
  error?: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface PortfolioAnalytics {
  totalPolicies: number;
  totalPremium: number;
  totalCommission: number;
  averagePremium: number;
  conversionRate: number;
  retentionRate: number;
  lossRatio: number;
  carrierDistribution: CarrierDistribution[];
  riskDistribution: RiskDistribution[];
  profitabilityAnalysis: PortfolioProfitability;
  growthMetrics: GrowthMetrics;
  predictiveInsights: Record<string, unknown>;
}

export interface ClaimSubmission {
  type: string;
  description: string;
  dateOfLoss: Date;
  estimatedAmount: number;
  location: string;
  witnesses: string[];
  policeReport?: string;
  photos: string[];
}

export interface ClaimProcessingResult {
  claimNumber: string;
  status: string;
  validation: ClaimValidation;
  fraudAnalysis: FraudAnalysis;
  coverageAnalysis: CoverageAnalysis;
  reservesEstimate: number;
  carrierNotification: CarrierNotification;
  claimHandler: ClaimHandler;
  nextSteps: string[];
  estimatedSettlementTime: number;
}

export interface ProfitabilityAnalysis {
  expectedProfitMargin: number;
  lossRatio: number;
  expenseRatio: number;
  combinedRatio: number;
  breakEvenPremium: number;
  riskAdjustedReturn: number;
}

export default MGABusinessEngine;
