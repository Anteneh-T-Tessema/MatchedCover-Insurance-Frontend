/**
 * AI-Powered Underwriting Engine
 * Core system for risk assessment, pricing, and underwriting decisions
 * Designed for MGA operations with carrier partnerships
 */

export interface RiskFactors {
  // Personal Information
  age: number;
  creditScore?: number;
  occupation: string;
  educationLevel: string;
  maritalStatus: string;
  
  // Property/Asset Information
  propertyValue?: number;
  propertyAge?: number;
  propertyType?: string;
  constructionType?: string;
  locationRiskScore: number;
  crimeRate?: number;
  naturalDisasterRisk?: number;
  
  // Behavioral Data
  claimsHistory: ClaimHistory[];
  drivingRecord?: DrivingRecord;
  socialMediaRiskScore?: number;
  financialStability: number;
  
  // External Data
  weatherPatterns?: WeatherData;
  economicFactors?: EconomicData;
  marketConditions?: MarketData;
}

export interface ClaimHistory {
  id: string;
  type: string;
  amount: number;
  date: Date;
  cause: string;
  wasAtFault: boolean;
  fraudRisk: number;
}

export interface DrivingRecord {
  yearsLicensed: number;
  violations: Violation[];
  accidents: Accident[];
  milesPerYear: number;
  vehicleType: string;
  vehicleAge: number;
  safetyRating: number;
}

export interface Violation {
  type: string;
  date: Date;
  severity: 'minor' | 'major' | 'severe';
  points: number;
}

export interface Accident {
  date: Date;
  atFault: boolean;
  damageAmount: number;
  injuries: boolean;
  type: string;
}

export interface WeatherData {
  averageRainfall: number;
  hurricaneRisk: number;
  floodZone: string;
  earthquakeRisk: number;
  wildFireRisk: number;
}

export interface EconomicData {
  localUnemploymentRate: number;
  medianIncome: number;
  propertyValueTrend: number;
  inflationRate: number;
}

export interface MarketData {
  competitorPricing: number[];
  marketPenetration: number;
  seasonalFactors: number;
  regulatoryChanges: string[];
}

export interface UnderwritingDecision {
  approved: boolean;
  riskScore: number;
  premiumBase: number;
  premiumAdjustments: PremiumAdjustment[];
  finalPremium: number;
  confidence: number;
  reasoning: string[];
  requiredDocuments: string[];
  conditions: string[];
  carrierRecommendations: CarrierMatch[];
  fraudRisk: number;
  profitabilityScore: number;
}

export interface PremiumAdjustment {
  factor: string;
  adjustment: number;
  reason: string;
}

export interface CarrierMatch {
  carrierId: string;
  carrierName: string;
  matchScore: number;
  commission: number;
  acceptanceProbability: number;
  turnaroundTime: number;
  specialPrograms: string[];
}

export class AIUnderwritingEngine {
  private modelWeights: ModelWeights;
  private carriers: CarrierPartner[];
  private riskThresholds: RiskThresholds;
  
  constructor() {
    this.modelWeights = this.initializeModelWeights();
    this.carriers = this.loadCarrierPartners();
    this.riskThresholds = this.initializeRiskThresholds();
  }

  /**
   * Main underwriting decision engine
   */
  async underwrite(
    riskFactors: RiskFactors, 
    coverageType: string,
    coverageAmount: number,
    deductible: number
  ): Promise<UnderwritingDecision> {
    
    // Step 1: Calculate base risk score
    const riskScore = await this.calculateRiskScore(riskFactors, coverageType);
    
    // Step 2: Fraud detection
    const fraudRisk = await this.detectFraud(riskFactors);
    
    // Step 3: Base premium calculation
    const basePremium = await this.calculateBasePremium(
      riskScore, 
      coverageAmount, 
      deductible, 
      coverageType
    );
    
    // Step 4: Apply AI-driven adjustments
    const adjustments = await this.calculatePremiumAdjustments(riskFactors, coverageType);
    
    // Step 5: Calculate final premium
    const finalPremium = this.applyAdjustments(basePremium, adjustments);
    
    // Step 6: Make underwriting decision
    const approved = await this.makeUnderwritingDecision(riskScore, fraudRisk, riskFactors);
    
    // Step 7: Find best carrier matches
    const carrierMatches = await this.findCarrierMatches(riskFactors, coverageType, riskScore);
    
    // Step 8: Generate reasoning and conditions
    const reasoning = this.generateReasoning(riskScore, adjustments, approved);
    const conditions = this.generateConditions(riskScore, riskFactors);
    const requiredDocs = this.getRequiredDocuments(riskScore, coverageType);
    
    // Step 9: Calculate confidence and profitability
    const confidence = this.calculateConfidence(riskFactors, coverageType);
    const profitabilityScore = this.calculateProfitability(finalPremium, riskScore, coverageAmount);

    return {
      approved,
      riskScore,
      premiumBase: basePremium,
      premiumAdjustments: adjustments,
      finalPremium,
      confidence,
      reasoning,
      requiredDocuments: requiredDocs,
      conditions,
      carrierRecommendations: carrierMatches,
      fraudRisk,
      profitabilityScore
    };
  }

  /**
   * AI-powered risk scoring algorithm
   */
  private async calculateRiskScore(riskFactors: RiskFactors, coverageType: string): Promise<number> {
    let score = 50; // Base score (0-100, lower is better)
    
    // Age factor (varies by coverage type)
    if (coverageType === 'auto') {
      if (riskFactors.age < 25) score += 15;
      else if (riskFactors.age > 65) score += 10;
      else if (riskFactors.age >= 30 && riskFactors.age <= 50) score -= 5;
    } else if (coverageType === 'home') {
      if (riskFactors.age < 30) score += 8;
      else if (riskFactors.age > 60) score -= 3;
    }
    
    // Credit score impact
    if (riskFactors.creditScore) {
      if (riskFactors.creditScore > 750) score -= 10;
      else if (riskFactors.creditScore < 600) score += 15;
      else if (riskFactors.creditScore < 650) score += 8;
    }
    
    // Claims history analysis
    const claimsImpact = this.analyzeClaimsHistory(riskFactors.claimsHistory);
    score += claimsImpact;
    
    // Location risk
    score += riskFactors.locationRiskScore;
    
    // Property-specific factors
    if (riskFactors.propertyAge && riskFactors.propertyAge > 30) {
      score += 5;
    }
    
    // Driving record (for auto)
    if (riskFactors.drivingRecord && coverageType === 'auto') {
      const drivingImpact = this.analyzeDrivingRecord(riskFactors.drivingRecord);
      score += drivingImpact;
    }
    
    // Financial stability
    score += (10 - riskFactors.financialStability) * 2;
    
    // External factors
    if (riskFactors.weatherPatterns) {
      score += this.analyzeWeatherRisk(riskFactors.weatherPatterns, coverageType);
    }
    
    // Ensure score is within bounds
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Fraud detection using AI patterns
   */
  private async detectFraud(riskFactors: RiskFactors): Promise<number> {
    let fraudScore = 0;
    
    // Multiple recent claims
    const recentClaims = riskFactors.claimsHistory.filter(
      claim => claim.date > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
    );
    if (recentClaims.length > 3) fraudScore += 30;
    
    // Suspicious claim patterns
    const largeClaims = riskFactors.claimsHistory.filter(claim => claim.amount > 50000);
    if (largeClaims.length > 1) fraudScore += 20;
    
    // Social media risk indicators
    if (riskFactors.socialMediaRiskScore && riskFactors.socialMediaRiskScore > 7) {
      fraudScore += 15;
    }
    
    // Inconsistent information patterns
    if (riskFactors.creditScore && riskFactors.creditScore < 500 && riskFactors.propertyValue && riskFactors.propertyValue > 1000000) {
      fraudScore += 25;
    }
    
    return Math.min(100, fraudScore);
  }

  /**
   * AI-driven premium calculation
   */
  private async calculateBasePremium(
    riskScore: number, 
    coverageAmount: number, 
    deductible: number, 
    coverageType: string
  ): Promise<number> {
    
    // Base rate per $1000 of coverage by type
    const baseRates = {
      'auto': 0.8,
      'home': 0.4,
      'life': 0.2,
      'renters': 0.15
    };
    
    const baseRate = baseRates[coverageType as keyof typeof baseRates] || 0.5;
    
    // Calculate base premium
    let premium = (coverageAmount / 1000) * baseRate;
    
    // Risk adjustment
    const riskMultiplier = 1 + (riskScore - 50) / 100;
    premium *= riskMultiplier;
    
    // Deductible adjustment
    const deductibleFactor = Math.max(0.5, 1 - (deductible / coverageAmount) * 2);
    premium *= deductibleFactor;
    
    return Math.round(premium * 100) / 100;
  }

  /**
   * Calculate AI-driven premium adjustments
   */
  private async calculatePremiumAdjustments(
    riskFactors: RiskFactors, 
    coverageType: string
  ): Promise<PremiumAdjustment[]> {
    const adjustments: PremiumAdjustment[] = [];
    
    // Multi-policy discount
    adjustments.push({
      factor: 'multi_policy',
      adjustment: -0.1,
      reason: 'Multi-policy discount available'
    });
    
    // Good credit bonus
    if (riskFactors.creditScore && riskFactors.creditScore > 750) {
      adjustments.push({
        factor: 'excellent_credit',
        adjustment: -0.15,
        reason: 'Excellent credit score bonus'
      });
    }
    
    // Claims-free bonus
    if (riskFactors.claimsHistory.length === 0) {
      adjustments.push({
        factor: 'claims_free',
        adjustment: -0.2,
        reason: 'Claims-free history bonus'
      });
    }
    
    // High-risk location penalty
    if (riskFactors.locationRiskScore > 15) {
      adjustments.push({
        factor: 'high_risk_location',
        adjustment: 0.25,
        reason: 'High-risk geographic location'
      });
    }
    
    // Technology adoption bonus (smart home, telematics)
    adjustments.push({
      factor: 'technology_adoption',
      adjustment: -0.05,
      reason: 'Technology adoption incentive'
    });
    
    return adjustments;
  }

  /**
   * Find matching carrier partners
   */
  private async findCarrierMatches(
    riskFactors: RiskFactors, 
    coverageType: string, 
    riskScore: number
  ): Promise<CarrierMatch[]> {
    
    return this.carriers
      .filter(carrier => {
        // Filter carriers based on risk appetite
        return riskScore >= carrier.minRiskScore && riskScore <= carrier.maxRiskScore;
      })
      .map(carrier => ({
        carrierId: carrier.id,
        carrierName: carrier.name,
        matchScore: this.calculateCarrierMatch(carrier, riskFactors, coverageType),
        commission: carrier.commissionRate,
        acceptanceProbability: this.calculateAcceptanceProbability(carrier, riskScore),
        turnaroundTime: carrier.averageTurnaroundTime,
        specialPrograms: carrier.specialPrograms
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5); // Top 5 matches
  }

  /**
   * Evaluate a quote for binding approval
   */
  async evaluateForBinding(bindingData: {
    quoteId: string;
    customerInfo;
    riskFactors: RiskFactors;
  }): Promise<{
    approved: boolean;
    riskScore: number;
    confidence: number;
    reasoning: string[];
  }> {
    try {
      // Perform final underwriting check before binding
      const decision = await this.underwrite(
        bindingData.riskFactors, 
        'comprehensive',
        500000, // Default coverage amount
        1000    // Default deductible
      );
      
      return {
        approved: decision.approved,
        riskScore: decision.riskScore,
        confidence: decision.confidence,
        reasoning: decision.reasoning
      };
    } catch (error) {
      console.error('❌ Binding evaluation failed:', error);
      return {
        approved: false,
        riskScore: 100,
        confidence: 0,
        reasoning: ['Technical error during binding evaluation']
      };
    }
  }

  // Helper methods
  private analyzeClaimsHistory(claims: ClaimHistory[]): number {
    if (claims.length === 0) return -5; // Bonus for no claims
    
    let impact = 0;
    claims.forEach(claim => {
      impact += Math.min(15, claim.amount / 10000); // Cap impact per claim
      if (claim.wasAtFault) impact += 5;
      if (claim.fraudRisk > 5) impact += 10;
    });
    
    return Math.min(30, impact); // Cap total claims impact
  }

  private analyzeDrivingRecord(record: DrivingRecord): number {
    let impact = 0;
    
    // Violations
    record.violations.forEach(violation => {
      switch (violation.severity) {
        case 'minor': impact += 2; break;
        case 'major': impact += 8; break;
        case 'severe': impact += 15; break;
      }
    });
    
    // Accidents
    record.accidents.forEach(accident => {
      if (accident.atFault) impact += 10;
      if (accident.injuries) impact += 5;
      impact += Math.min(5, accident.damageAmount / 10000);
    });
    
    // Experience bonus
    if (record.yearsLicensed > 10) impact -= 3;
    
    return Math.min(25, impact);
  }

  private analyzeWeatherRisk(weather: WeatherData, coverageType: string): number {
    if (coverageType !== 'home') return 0;
    
    let risk = 0;
    risk += weather.hurricaneRisk * 2;
    risk += weather.earthquakeRisk * 1.5;
    risk += weather.wildFireRisk * 2;
    if (weather.floodZone === 'high') risk += 5;
    
    return Math.min(15, risk);
  }

  private applyAdjustments(basePremium: number, adjustments: PremiumAdjustment[]): number {
    let finalPremium = basePremium;
    
    adjustments.forEach(adj => {
      if (adj.adjustment > 0) {
        finalPremium *= (1 + adj.adjustment);
      } else {
        finalPremium *= (1 + adj.adjustment);
      }
    });
    
    return Math.round(finalPremium * 100) / 100;
  }

  private makeUnderwritingDecision(riskScore: number, fraudRisk: number, riskFactors: RiskFactors): boolean {
    // Automatic decline conditions
    if (fraudRisk > 50) return false;
    if (riskScore > 85) return false;
    if (riskFactors.claimsHistory.filter(c => c.fraudRisk > 8).length > 0) return false;
    
    // Automatic approval conditions
    if (riskScore < 30 && fraudRisk < 10) return true;
    
    // Risk-based decision
    return riskScore < 70 && fraudRisk < 30;
  }

  private generateReasoning(riskScore: number, adjustments: PremiumAdjustment[], approved: boolean): string[] {
    const reasons: string[] = [];
    
    if (approved) {
      reasons.push('Application meets underwriting guidelines');
      if (riskScore < 40) reasons.push('Low risk profile identified');
    } else {
      reasons.push('Application exceeds risk tolerance');
      if (riskScore > 70) reasons.push('High risk score identified');
    }
    
    adjustments.forEach(adj => {
      if (Math.abs(adj.adjustment) > 0.1) {
        reasons.push(adj.reason);
      }
    });
    
    return reasons;
  }

  private generateConditions(riskScore: number, riskFactors: RiskFactors): string[] {
    const conditions: string[] = [];
    
    if (riskScore > 60) {
      conditions.push('Annual risk assessment required');
    }
    
    if (riskFactors.claimsHistory.length > 2) {
      conditions.push('Claims monitoring program enrollment required');
    }
    
    if (riskFactors.propertyAge && riskFactors.propertyAge > 40) {
      conditions.push('Home inspection required within 30 days');
    }
    
    return conditions;
  }

  private getRequiredDocuments(riskScore: number, coverageType: string): string[] {
    const docs = ['Driver license copy', 'Proof of address'];
    
    if (riskScore > 50) {
      docs.push('Credit report authorization');
    }
    
    if (coverageType === 'home') {
      docs.push('Property deed or mortgage statement');
      docs.push('Home inspection report (if property age > 20 years)');
    }
    
    if (riskScore > 70) {
      docs.push('Financial statements');
      docs.push('Employment verification');
    }
    
    return docs;
  }

  private calculateConfidence(riskFactors: RiskFactors, coverageType: string): number {
    let confidence = 50;
    
    // More data = higher confidence
    if (riskFactors.creditScore) confidence += 10;
    if (riskFactors.claimsHistory.length > 0) confidence += 15;
    if (riskFactors.drivingRecord) confidence += 15;
    if (riskFactors.socialMediaRiskScore) confidence += 5;
    if (riskFactors.weatherPatterns) confidence += 5;
    
    return Math.min(95, confidence);
  }

  private calculateProfitability(premium: number, riskScore: number, coverageAmount: number): number {
    // Simple profitability model
    const expectedLossRatio = Math.min(0.8, riskScore / 125);
    const expectedProfit = premium - (coverageAmount * expectedLossRatio * 0.001);
    
    return Math.max(0, Math.min(100, (expectedProfit / premium) * 100));
  }

  private calculateCarrierMatch(carrier: CarrierPartner, riskFactors: RiskFactors, coverageType: string): number {
    let score = 50;
    
    // Risk appetite match
    const riskScore = 50; // Simplified for this example
    if (riskScore >= carrier.minRiskScore && riskScore <= carrier.maxRiskScore) {
      score += 20;
    }
    
    // Coverage type preference
    if (carrier.preferredCoverageTypes.includes(coverageType)) {
      score += 15;
    }
    
    // Commission attractiveness
    score += carrier.commissionRate * 100;
    
    // Turnaround time (faster is better)
    score += Math.max(0, 10 - carrier.averageTurnaroundTime);
    
    return Math.min(100, score);
  }

  private calculateAcceptanceProbability(carrier: CarrierPartner, riskScore: number): number {
    // Higher risk score = lower acceptance probability
    return Math.max(10, Math.min(95, 100 - riskScore));
  }

  // Initialization methods
  private initializeModelWeights(): ModelWeights {
    return {
      ageWeight: 0.15,
      creditWeight: 0.20,
      claimsWeight: 0.25,
      locationWeight: 0.15,
      drivingWeight: 0.20,
      propertyWeight: 0.05
    };
  }

  private loadCarrierPartners(): CarrierPartner[] {
    return [
      {
        id: 'carrier-001',
        name: 'Premier Insurance Group',
        minRiskScore: 0,
        maxRiskScore: 60,
        commissionRate: 0.12,
        averageTurnaroundTime: 2,
        preferredCoverageTypes: ['home', 'auto'],
        specialPrograms: ['first-time-buyer', 'military-discount']
      },
      {
        id: 'carrier-002',
        name: 'Secure Life & Property',
        minRiskScore: 20,
        maxRiskScore: 80,
        commissionRate: 0.15,
        averageTurnaroundTime: 3,
        preferredCoverageTypes: ['home', 'life'],
        specialPrograms: ['green-home', 'loyalty-rewards']
      },
      {
        id: 'carrier-003',
        name: 'Guardian Auto Insurance',
        minRiskScore: 0,
        maxRiskScore: 70,
        commissionRate: 0.10,
        averageTurnaroundTime: 1,
        preferredCoverageTypes: ['auto'],
        specialPrograms: ['safe-driver', 'telematics']
      }
    ];
  }

  private initializeRiskThresholds(): RiskThresholds {
    return {
      maxRiskScore: 85,
      maxFraudRisk: 50,
      minCreditScore: 500,
      maxClaimsInYear: 3
    };
  }
}

// Supporting interfaces
interface ModelWeights {
  ageWeight: number;
  creditWeight: number;
  claimsWeight: number;
  locationWeight: number;
  drivingWeight: number;
  propertyWeight: number;
}

interface CarrierPartner {
  id: string;
  name: string;
  minRiskScore: number;
  maxRiskScore: number;
  commissionRate: number;
  averageTurnaroundTime: number;
  preferredCoverageTypes: string[];
  specialPrograms: string[];
}

interface RiskThresholds {
  maxRiskScore: number;
  maxFraudRisk: number;
  minCreditScore: number;
  maxClaimsInYear: number;
}

export default AIUnderwritingEngine;
