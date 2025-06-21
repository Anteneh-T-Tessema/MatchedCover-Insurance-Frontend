/**
 * Consolidated Interface Definitions
 * Central location for all shared interfaces to eliminate duplicates
 * and ensure consistency across the platform
 * 
 * @fileoverview Consolidated interface definitions for the MatchedCover platform
 * @author MatchedCover Platform Team
 * @version 2.0.0
 */

/**
 * Standard address interface used throughout the platform
 * Provides consistent address structure for all services
 * 
 * @interface Address
 */
export interface Address {
  /** Street address line */
  street: string;
  /** City name */
  city: string;
  /** State or province */
  state: string;
  /** Postal/ZIP code */
  zipCode: string;
  /** Country code (ISO 3166-1 alpha-2) */
  country: string;
  /** Optional apartment/unit number */
  unit?: string;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
}

/**
 * Economic data interface for regional economic indicators
 * Used consistently across underwriting and risk assessment
 * 
 * @interface EconomicData
 */
export interface EconomicData {
  /** Median household income in USD */
  medianIncome: number;
  /** Unemployment rate percentage (0-100) */
  unemploymentRate: number;
  /** Average property values in USD */
  propertyValues: number;
  /** Economic growth rate percentage */
  economicGrowth: number;
  /** Cost of living index (100 = national average) */
  costOfLivingIndex: number;
  /** Population density per square mile */
  populationDensity: number;
}

/**
 * Quote request interface
 * Standardized structure for all quote requests
 * 
 * @interface QuoteRequest
 */
export interface QuoteRequest {
  /** Unique request identifier */
  requestId: string;
  /** Carrier identifier for targeted quotes */
  carrierId?: string;
  /** Customer user ID */
  userId: string;
  /** Type of insurance product */
  productType: 'auto' | 'home' | 'renters' | 'life' | 'commercial';
  /** Customer information */
  customerInfo: CustomerInfo;
  /** Requested coverage details */
  coverageRequested: CoverageRequested;
  /** Additional risk factors */
  riskFactors?: Record<string, unknown>;
  /** Quote preferences */
  preferences?: QuotePreferences;
  /** Request timestamp */
  timestamp: string;
}

/**
 * Customer information interface
 * Personal and demographic information for quotes
 * 
 * @interface CustomerInfo
 */
export interface CustomerInfo {
  /** Customer's first name */
  firstName: string;
  /** Customer's last name */
  lastName: string;
  /** Date of birth (string or Date) */
  dateOfBirth: string | Date;
  /** Primary email address */
  email: string;
  /** Primary phone number */
  phone: string;
  /** Customer's address */
  address: Address;
  /** Gender (optional) */
  gender?: 'M' | 'F' | 'X';
  /** Marital status (optional) */
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
  /** Occupation (optional) */
  occupation?: string;
  /** Annual income (optional) */
  annualIncome?: number;
  /** Credit score (optional) */
  creditScore?: number;
}

/**
 * Coverage requested interface
 * Specifies the insurance coverage being requested
 * 
 * @interface CoverageRequested
 */
export interface CoverageRequested {
  /** Coverage limits */
  limits: CoverageLimits;
  /** Deductible amounts */
  deductibles: CoverageDeductibles;
  /** Additional coverage options */
  additionalCoverage?: string[];
  /** Coverage effective date */
  effectiveDate: string;
  /** Coverage term in months */
  termLength: number;
}

/**
 * Coverage limits interface
 * Defines monetary limits for different coverage types
 * 
 * @interface CoverageLimits
 */
export interface CoverageLimits {
  /** Bodily injury liability per person */
  bodilyInjuryPerPerson?: number;
  /** Bodily injury liability per accident */
  bodilyInjuryPerAccident?: number;
  /** Property damage liability */
  propertyDamage?: number;
  /** Personal injury protection */
  personalInjuryProtection?: number;
  /** Uninsured motorist bodily injury per person */
  uninsuredMotoristBI?: number;
  /** Uninsured motorist bodily injury per accident */
  uninsuredMotoristBIAccident?: number;
  /** Uninsured motorist property damage */
  uninsuredMotoristPD?: number;
  /** Comprehensive coverage */
  comprehensive?: number;
  /** Collision coverage */
  collision?: number;
  /** Dwelling coverage (for home insurance) */
  dwelling?: number;
  /** Personal property coverage */
  personalProperty?: number;
  /** Liability coverage */
  liability?: number;
  /** Medical payments coverage */
  medicalPayments?: number;
}

/**
 * Coverage deductibles interface
 * Defines deductible amounts for different coverage types
 * 
 * @interface CoverageDeductibles
 */
export interface CoverageDeductibles {
  /** Comprehensive deductible */
  comprehensive?: number;
  /** Collision deductible */
  collision?: number;
  /** All perils deductible */
  allPerils?: number;
  /** Glass coverage deductible */
  glass?: number;
}

/**
 * Quote preferences interface
 * Customer preferences for quote generation
 * 
 * @interface QuotePreferences
 */
export interface QuotePreferences {
  /** Maximum monthly budget */
  maxMonthlyBudget?: number;
  /** Preferred deductible amount */
  preferredDeductible?: number;
  /** Preferred carriers */
  preferredCarriers?: string[];
  /** Coverage level preference */
  coverageLevel: 'basic' | 'standard' | 'premium';
  /** Payment frequency preference */
  paymentFrequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  /** Electronic delivery preference */
  electronicDelivery: boolean;
  /** Paperless billing preference */
  paperlessBilling: boolean;
}

/**
 * Quote response interface
 * Standardized response for all quote operations
 * 
 * @interface QuoteResponse
 */
export interface QuoteResponse {
  /** Unique quote identifier */
  quoteId: string;
  /** Reference to original request */
  requestId: string;
  /** Carrier information */
  carrier: CarrierInfo;
  /** Premium information */
  premium: PremiumInfo;
  /** Coverage details included */
  coverage: CoverageDetails;
  /** Quote validity period */
  validUntil: string;
  /** Quote confidence score (0-1) */
  confidence: number;
  /** Applied discounts */
  discounts: Discount[];
  /** Available payment options */
  paymentOptions: PaymentOption[];
  /** Terms and conditions */
  terms: string[];
  /** Quote generation timestamp */
  timestamp: string;
}

/**
 * Carrier information interface
 * Details about the insurance carrier
 * 
 * @interface CarrierInfo
 */
export interface CarrierInfo {
  /** Carrier unique identifier */
  carrierId: string;
  /** Carrier company name */
  name: string;
  /** Carrier rating (A.M. Best, S&P, etc.) */
  rating: string;
  /** Financial strength rating */
  financialStrength: string;
  /** Customer service rating */
  customerServiceRating: number;
  /** Claims satisfaction rating */
  claimsSatisfactionRating: number;
  /** Available in states */
  availableStates: string[];
}

/**
 * Premium information interface
 * Detailed premium breakdown
 * 
 * @interface PremiumInfo
 */
export interface PremiumInfo {
  /** Annual premium amount */
  annualPremium: number;
  /** Semi-annual premium amount */
  semiAnnualPremium: number;
  /** Quarterly premium amount */
  quarterlyPremium: number;
  /** Monthly premium amount */
  monthlyPremium: number;
  /** Down payment required */
  downPayment: number;
  /** Premium breakdown by coverage */
  breakdown: PremiumBreakdown[];
  /** Taxes and fees */
  taxesAndFees: number;
  /** Total amount due */
  totalDue: number;
}

/**
 * Premium breakdown interface
 * Individual coverage premium components
 * 
 * @interface PremiumBreakdown
 */
export interface PremiumBreakdown {
  /** Coverage type */
  coverageType: string;
  /** Premium amount for this coverage */
  premium: number;
  /** Coverage limit */
  limit?: number;
  /** Deductible amount */
  deductible?: number;
}

/**
 * Coverage details interface
 * Complete coverage information
 * 
 * @interface CoverageDetails
 */
export interface CoverageDetails {
  /** Coverage limits */
  limits: CoverageLimits;
  /** Deductibles */
  deductibles: CoverageDeductibles;
  /** Included features */
  features: string[];
  /** Coverage endorsements */
  endorsements: string[];
  /** Policy form */
  policyForm: string;
  /** Territory code */
  territory: string;
}

/**
 * Discount interface
 * Applied discount information
 * 
 * @interface Discount
 */
export interface Discount {
  /** Discount identifier */
  discountId: string;
  /** Discount name */
  name: string;
  /** Discount description */
  description: string;
  /** Discount type */
  type: 'percentage' | 'dollar';
  /** Discount value */
  value: number;
  /** Applied to coverage types */
  appliedTo: string[];
  /** Savings amount */
  savings: number;
}

/**
 * Payment option interface
 * Available payment methods and schedules
 * 
 * @interface PaymentOption
 */
export interface PaymentOption {
  /** Payment method */
  method: 'credit_card' | 'debit_card' | 'bank_transfer' | 'check';
  /** Payment frequency */
  frequency: 'monthly' | 'quarterly' | 'semi-annual' | 'annual';
  /** Down payment required */
  downPayment: number;
  /** Monthly payment amount */
  monthlyPayment?: number;
  /** Processing fee */
  processingFee: number;
  /** Auto-pay discount available */
  autoPayDiscount?: number;
}

/**
 * Risk factors interface
 * Comprehensive risk assessment factors
 * 
 * @interface RiskFactors
 */
export interface RiskFactors {
  /** Overall risk score (0-100) */
  overallRiskScore: number;
  /** Credit-based insurance score */
  creditScore?: number;
  /** Driving record factors */
  drivingRecord?: DrivingRecord;
  /** Claims history */
  claimsHistory?: ClaimsHistory;
  /** Location-based risks */
  locationRisks?: LocationRisks;
  /** Vehicle-specific risks (for auto) */
  vehicleRisks?: VehicleRisks;
  /** Property-specific risks (for home/renters) */
  propertyRisks?: PropertyRisks;
}

/**
 * Driving record interface
 * Driving history and violations
 * 
 * @interface DrivingRecord
 */
export interface DrivingRecord {
  /** Years licensed */
  yearsLicensed: number;
  /** License status */
  licenseStatus: 'valid' | 'suspended' | 'revoked' | 'expired';
  /** Moving violations in last 3 years */
  violations: Violation[];
  /** Accidents in last 5 years */
  accidents: Accident[];
  /** Defensive driving course completion */
  defensiveDrivingCourse?: boolean;
  /** Annual mileage */
  annualMileage?: number;
}

/**
 * Violation interface
 * Traffic violation details
 * 
 * @interface Violation
 */
export interface Violation {
  /** Violation type */
  type: string;
  /** Violation date */
  date: string;
  /** Conviction status */
  convicted: boolean;
  /** Points assessed */
  points?: number;
  /** Fine amount */
  fine?: number;
}

/**
 * Accident interface
 * Accident history details
 * 
 * @interface Accident
 */
export interface Accident {
  /** Accident date */
  date: string;
  /** At fault determination */
  atFault: boolean;
  /** Damage amount */
  damageAmount?: number;
  /** Injuries involved */
  injuries: boolean;
  /** Claim filed */
  claimFiled: boolean;
  /** Claim amount */
  claimAmount?: number;
}

/**
 * Claims history interface
 * Previous insurance claims
 * 
 * @interface ClaimsHistory
 */
export interface ClaimsHistory {
  /** Claims in last 5 years */
  recentClaims: Claim[];
  /** Total claim count */
  totalClaims: number;
  /** Total claim amount */
  totalClaimAmount: number;
  /** Claims-free years */
  claimsFreePeriod: number;
}

/**
 * Claim interface
 * Individual claim details
 * 
 * @interface Claim
 */
export interface Claim {
  /** Claim number */
  claimNumber: string;
  /** Claim type */
  type: string;
  /** Loss date */
  lossDate: string;
  /** Claim amount */
  amount: number;
  /** Claim status */
  status: 'open' | 'closed' | 'denied';
  /** At fault determination */
  atFault?: boolean;
}

/**
 * Insurance history interface
 * Complete insurance history for a user
 * 
 * @interface InsuranceHistory
 */
export interface InsuranceHistory {
  /** Previous insurance carriers */
  previousCarriers: string[];
  /** Years of continuous coverage */
  yearsOfCoverage: number;
  /** Current insurance status */
  currentlyInsured: boolean;
  /** Claims history */
  claimsHistory: ClaimsHistory;
  /** Lapse in coverage periods */
  coverageLapses: CoverageLapse[];
  /** Policy types held */
  policyTypes: string[];
}

/**
 * Coverage lapse interface
 * Period without insurance coverage
 * 
 * @interface CoverageLapse
 */
export interface CoverageLapse {
  /** Start of lapse period */
  startDate: string;
  /** End of lapse period */
  endDate: string;
  /** Reason for lapse */
  reason: string;
  /** Duration in days */
  duration: number;
}

/**
 * Account settings interface
 * User account configuration settings
 * 
 * @interface AccountSettings
 */
export interface AccountSettings {
  /** Email notifications enabled */
  emailNotifications: boolean;
  /** SMS notifications enabled */
  smsNotifications: boolean;
  /** Push notifications enabled */
  pushNotifications: boolean;
  /** Two-factor authentication enabled */
  twoFactorAuth: boolean;
  /** Account privacy level */
  privacyLevel: 'public' | 'private' | 'limited';
  /** Data sharing preferences */
  dataSharing: boolean;
  /** Auto-renewal preferences */
  autoRenewal: boolean;
  /** Password last changed */
  passwordLastChanged: string;
}

// Privacy Compliance Interfaces
export interface PrivacyUserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone?: string;
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface UserQuote {
  id: string;
  userId: string;
  productType: string;
  premium: number;
  coverage: CoverageDetails;
  status: string;
  createdAt: string;
  expiresAt: string;
}

export interface UserApplication {
  id: string;
  userId: string;
  quoteId: string;
  status: string;
  submittedAt: string;
  approvedAt?: string;
  policyNumber?: string;
}

export interface LoginHistoryEntry {
  id: string;
  userId: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  success: boolean;
}

export interface UserPreferences {
  id: string;
  userId: string;
  emailMarketing: boolean;
  smsMarketing: boolean;
  pushNotifications: boolean;
  dataSharing: boolean;
  language: string;
  currency: string;
  updatedAt: string;
  // CCPA specific fields
  optedOutOfSale?: boolean;
  optOutDate?: Date;
  optOutMethod?: string;
}

export interface DataSharingRecord {
  id: string;
  userId: string;
  thirdPartyName: string;
  purpose: string;
  dataTypes: string[];
  consentDate: string;
  status: 'active' | 'revoked' | 'expired';
}

export interface PrivacyAccessRequestData {
  profile: PrivacyUserProfile;
  quotes: UserQuote[];
  applications: UserApplication[];
  loginHistory: LoginHistoryEntry[];
  preferences: UserPreferences;
  dataSharing: DataSharingRecord[];
  retentionSchedule: RetentionSchedule;
  userRights: UserRightsInfo;
}

export interface RetentionSchedule {
  [dataType: string]: {
    retentionPeriod: number; // in days
    action: 'delete' | 'anonymize' | 'archive';
    legalBasis: string;
  };
}

export interface UserRightsInfo {
  rightOfAccess: boolean;
  rightToRectification: boolean;
  rightToErasure: boolean;
  rightToPortability: boolean;
  rightToObject: boolean;
  rightToRestrictProcessing: boolean;
  contactInfo: {
    dpoEmail: string;
    supportPhone: string;
  };
}

export interface ConsentRecord {
  id: string;
  userId: string;
  purpose: string;
  lawfulBasis: LawfulBasis;
  granted: boolean;
  timestamp: string;
  metadata: ConsentMetadata;
  withdrawnAt?: string;
}

export interface ConsentMetadata {
  ipAddress: string;
  userAgent: string;
  source: string;
  version: string;
}

export interface PrivacyImpactAssessment {
  id: string;
  processingActivity: string;
  riskLevel: 'low' | 'medium' | 'high';
  dataTypes: string[];
  lawfulBasis: LawfulBasis[];
  safeguards: string[];
  riskMitigations: string[];
  approvedBy: string;
  approvedAt: string;
  reviewDate: string;
}

export interface RetentionPolicy {
  id: string;
  dataType: string;
  retentionPeriod: number;
  action: 'delete' | 'anonymize' | 'archive';
  legalBasis: string;
  lastReviewed: string;
}

export interface ExpiredRecord {
  id: string;
  userId: string;
  dataType: string;
  createdAt: string;
  retentionPolicy: RetentionPolicy;
}

export interface AuditLogEntry {
  id: string;
  userId?: string;
  action: string;
  resourceType: string;
  resourceId: string;
  timestamp: string;
  details: Record<string, unknown>;
  performedBy: string;
}

export interface PersonalDataUpdates {
  [field: string]: any;
}

export type LawfulBasis = 
  | 'consent'
  | 'contract'
  | 'legal_obligation'
  | 'vital_interests'
  | 'public_task'
  | 'legitimate_interests';

/**
 * Location risks interface
 * Geographic and location-based risk factors
 * 
 * @interface LocationRisks
 */
export interface LocationRisks {
  /** ZIP code risk score */
  zipCodeRisk: number;
  /** Crime rate score */
  crimeRate: number;
  /** Weather risk score */
  weatherRisk: number;
  /** Natural disaster risk */
  catastropheRisk: number;
  /** Population density factor */
  populationDensity: number;
  /** Proximity to fire station (miles) */
  fireStationDistance?: number;
  /** Proximity to hospital (miles) */
  hospitalDistance?: number;
}

/**
 * Vehicle risks interface
 * Vehicle-specific risk factors for auto insurance
 * 
 * @interface VehicleRisks
 */
export interface VehicleRisks {
  /** Vehicle safety rating */
  safetyRating: number;
  /** Theft risk score */
  theftRisk: number;
  /** Repair cost factor */
  repairCostFactor: number;
  /** Performance/speed factor */
  performanceFactor: number;
  /** Age-related depreciation factor */
  ageFactor: number;
  /** Mileage-based risk */
  mileageRisk: number;
  /** Anti-theft devices present */
  hasAntiTheftDevices: boolean;
  /** Safety features score */
  safetyFeatures: number;
}

/**
 * Property risks interface
 * Property-specific risk factors for home/renters insurance
 * 
 * @interface PropertyRisks
 */
export interface PropertyRisks {
  /** Property age factor */
  propertyAge: number;
  /** Construction type risk */
  constructionRisk: number;
  /** Roof condition score */
  roofCondition: number;
  /** Electrical system risk */
  electricalRisk: number;
  /** Plumbing system risk */
  plumbingRisk: number;
  /** Foundation condition */
  foundationCondition: number;
  /** Security system present */
  hasSecuritySystem: boolean;
  /** Fire protection systems */
  fireProtection: number;
  /** Flood zone risk */
  floodZoneRisk: number;
  /** Wildfire risk */
  wildfireRisk: number;
}
