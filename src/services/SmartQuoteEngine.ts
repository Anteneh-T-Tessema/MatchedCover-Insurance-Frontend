/**
 * Smart Quote Engine - The MGA + AI Sweet Spot
 * Simplified integration layer that focuses on the core MGA business model
 * AI-powered underwriting + carrier partnerships + profitable operations
 */

import { AIUnderwritingEngine, RiskFactors, UnderwritingDecision } from './underwriting/AIUnderwritingEngine';
import { MGABusinessEngine } from './mga/MGABusinessEngine';
import { CarrierIntegrationAPI } from './carriers/CarrierIntegrationAPI';

export interface SmartQuoteInput {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  
  // Address
  street: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Coverage Request
  coverageType: 'auto' | 'homeowners' | 'life' | 'umbrella';
  coverageAmount: number;
  deductible: number;
  
  // Risk Factors (optional but helps AI)
  creditScore?: number;
  priorClaims?: number;
  occupation?: string;
  propertyValue?: number;
  propertyAge?: number;
}

export interface SmartQuoteResult {
  success: boolean;
  quoteId: string;
  
  // AI Analysis
  riskProfile: 'low' | 'medium' | 'high';
  riskScore: number;
  aiConfidence: number;
  
  // Quote Details
  recommendedPremium: number;
  competitivePremium: number;
  ourMargin: number;
  commission: number;
  
  // Carrier Information
  recommendedCarrier: string;
  carrierQuoteId?: string;
  alternativeCarriers: string[];
  
  // Business Intelligence
  profitabilityScore: number;
  lifetimeValuePrediction: number;
  conversionProbability: number;
  
  // Customer Insights
  upsellOpportunities: string[];
  retentionFactors: string[];
  
  error?: string;
}

export interface CarrierConfig {
  id: string;
  name: string;
  commission: number;
  minRiskScore: number;
  maxRiskScore: number;
  specialties: string[];
  processingTime: number;
  acceptanceRate: number;
}

export class SmartQuoteEngine {
  private aiEngine: AIUnderwritingEngine;
  private mgaEngine: MGABusinessEngine;
  private carrierAPI: CarrierIntegrationAPI;
  
  // Hardcoded carrier partners for this demo
  private carriers: CarrierConfig[] = [
    {
      id: 'premier_ins',
      name: 'Premier Insurance',
      commission: 0.12,
      minRiskScore: 0,
      maxRiskScore: 40,
      specialties: ['homeowners', 'auto'],
      processingTime: 2,
      acceptanceRate: 0.95
    },
    {
      id: 'secure_life',
      name: 'Secure Life & Property',
      commission: 0.15,
      minRiskScore: 20,
      maxRiskScore: 70,
      specialties: ['life', 'umbrella'],
      processingTime: 1,
      acceptanceRate: 0.85
    },
    {
      id: 'guardian_auto',
      name: 'Guardian Auto',
      commission: 0.10,
      minRiskScore: 30,
      maxRiskScore: 80,
      specialties: ['auto'],
      processingTime: 3,
      acceptanceRate: 0.80
    },
    {
      id: 'national_general',
      name: 'National General',
      commission: 0.13,
      minRiskScore: 50,
      maxRiskScore: 100,
      specialties: ['homeowners', 'auto', 'life'],
      processingTime: 4,
      acceptanceRate: 0.70
    }
  ];

  constructor() {
    this.aiEngine = new AIUnderwritingEngine();
    this.mgaEngine = new MGABusinessEngine();
    this.carrierAPI = new CarrierIntegrationAPI();
  }

  /**
   * Generate Smart Quote - The Core MGA Operation
   * This is where the magic happens: AI + Carriers + Profitability
   */
  async generateSmartQuote(input: SmartQuoteInput): Promise<SmartQuoteResult> {
    try {
      console.log('🎯 Generating Smart Quote for:', input.email);
      
      // Step 1: AI Risk Assessment
      const riskAnalysis = await this.performAIRiskAssessment(input);
      
      // Step 2: Smart Carrier Selection
      const optimalCarrier = this.selectOptimalCarrier(riskAnalysis, input.coverageType);
      
      // Step 3: AI-Optimized Pricing
      const pricing = await this.calculateOptimalPricing(riskAnalysis, optimalCarrier, input);
      
      // Step 4: Business Intelligence
      const businessInsights = this.generateBusinessInsights(riskAnalysis, pricing, input);
      
      // Step 5: Generate Quote ID for tracking
      const quoteId = this.generateQuoteId(input);
      
      return {
        success: true,
        quoteId,
        
        // AI Analysis
        riskProfile: this.getRiskProfile(riskAnalysis.riskScore),
        riskScore: riskAnalysis.riskScore,
        aiConfidence: riskAnalysis.confidence,
        
        // Quote Details
        recommendedPremium: pricing.recommendedPremium,
        competitivePremium: pricing.marketPremium,
        ourMargin: pricing.margin,
        commission: pricing.commission,
        
        // Carrier Information
        recommendedCarrier: optimalCarrier.name,
        alternativeCarriers: this.getAlternativeCarriers(riskAnalysis, input.coverageType),
        
        // Business Intelligence
        profitabilityScore: businessInsights.profitabilityScore,
        lifetimeValuePrediction: businessInsights.lifetimeValue,
        conversionProbability: businessInsights.conversionProbability,
        
        // Customer Insights
        upsellOpportunities: businessInsights.upsellOpportunities,
        retentionFactors: businessInsights.retentionFactors
      };
      
    } catch (error) {
      console.error('❌ Smart Quote Generation failed:', error);
      return {
        success: false,
        quoteId: '',
        riskProfile: 'high',
        riskScore: 100,
        aiConfidence: 0,
        recommendedPremium: 0,
        competitivePremium: 0,
        ourMargin: 0,
        commission: 0,
        recommendedCarrier: '',
        alternativeCarriers: [],
        profitabilityScore: 0,
        lifetimeValuePrediction: 0,
        conversionProbability: 0,
        upsellOpportunities: [],
        retentionFactors: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * AI Risk Assessment - Leverage our AI engine
   */
  private async performAIRiskAssessment(input: SmartQuoteInput): Promise<UnderwritingDecision> {
    const riskFactors: RiskFactors = {
      age: this.calculateAge(input.dateOfBirth),
      creditScore: input.creditScore,
      occupation: input.occupation || 'Professional',
      educationLevel: 'College',
      maritalStatus: 'Single',
      propertyValue: input.propertyValue,
      propertyAge: input.propertyAge,
      locationRiskScore: await this.calculateLocationRisk(input.zipCode),
      financialStability: input.creditScore ? input.creditScore / 850 : 0.7,
      claimsHistory: [],
      naturalDisasterRisk: await this.calculateNaturalDisasterRisk(input.zipCode),
      crimeRate: await this.getCrimeRiskScore(input.zipCode)
    };

    return await this.aiEngine.underwrite(
      riskFactors,
      input.coverageType,
      input.coverageAmount,
      input.deductible
    );
  }

  /**
   * Smart Carrier Selection - The MGA Sweet Spot
   * Choose the carrier that maximizes profitability while ensuring acceptance
   */
  private selectOptimalCarrier(riskAnalysis: UnderwritingDecision, coverageType: string): CarrierConfig {
    const eligibleCarriers = this.carriers.filter(carrier => 
      carrier.specialties.includes(coverageType) &&
      riskAnalysis.riskScore >= carrier.minRiskScore &&
      riskAnalysis.riskScore <= carrier.maxRiskScore
    );

    if (eligibleCarriers.length === 0) {
      // Fallback to most flexible carrier
      return this.carriers.find(c => c.id === 'national_general') || this.carriers[0];
    }

    // Score each carrier based on:
    // 1. Commission rate (higher is better for MGA)
    // 2. Acceptance probability
    // 3. Processing speed
    // 4. Risk fit
    const scoredCarriers = eligibleCarriers.map(carrier => {
      const commissionScore = carrier.commission * 100;
      const acceptanceScore = carrier.acceptanceRate * 50;
      const speedScore = (5 - carrier.processingTime) * 10;
      const riskFitScore = 50 - Math.abs((carrier.minRiskScore + carrier.maxRiskScore) / 2 - riskAnalysis.riskScore);
      
      return {
        carrier,
        score: commissionScore + acceptanceScore + speedScore + riskFitScore
      };
    });

    return scoredCarriers.sort((a, b) => b.score - a.score)[0].carrier;
  }

  /**
   * AI-Optimized Pricing - Maximize Profitability
   */
  private async calculateOptimalPricing(
    riskAnalysis: UnderwritingDecision, 
    carrier: CarrierConfig, 
    input: SmartQuoteInput
  ) {
    // Base premium from AI engine
    const basePremium = riskAnalysis.finalPremium;
    
    // Market competition adjustment based on real market data
    const marketPremium = await this.calculateMarketAdjustedPremium(basePremium, carrier, input);
    
    // Our commission from carrier
    const commission = basePremium * carrier.commission;
    
    // Our margin (profit after operational costs)
    const operationalCostRate = 0.03; // 3% operational costs
    const margin = commission * (1 - operationalCostRate);
    
    // Competitive pricing strategy - consider coverage amount for adjustments
    const coverageAdjustment = input.coverageAmount > 250000 ? 1.02 : 1.0;
    const competitivePremium = Math.min(basePremium * 1.05 * coverageAdjustment, marketPremium * 0.98);
    
    return {
      basePremium,
      recommendedPremium: competitivePremium,
      marketPremium,
      commission,
      margin
    };
  }

  /**
   * Business Intelligence Generation
   */
  private generateBusinessInsights(
    riskAnalysis: UnderwritingDecision, 
    pricing: {
      basePremium: number;
      recommendedPremium: number;
      marketPremium: number;
      commission: number;
      margin: number;
    }, 
    input: SmartQuoteInput
  ) {
    // Profitability score (0-100)
    const profitabilityScore = Math.min(100, (pricing.margin / pricing.recommendedPremium) * 200);
    
    // Lifetime value prediction
    const avgRetentionYears = this.getRiskProfile(riskAnalysis.riskScore) === 'low' ? 5.5 : 3.2;
    const lifetimeValue = pricing.recommendedPremium * avgRetentionYears * 1.15; // Cross-sell factor
    
    // Conversion probability based on risk and pricing
    const baseConversion = 0.65;
    const riskAdjustment = (100 - riskAnalysis.riskScore) / 200; // Better risk = higher conversion
    const priceAdjustment = Math.max(-0.2, Math.min(0.2, (pricing.marketPremium - pricing.recommendedPremium) / pricing.marketPremium));
    const conversionProbability = Math.max(0.2, Math.min(0.95, baseConversion + riskAdjustment + priceAdjustment));
    
    // Upsell opportunities
    const upsellOpportunities = this.identifyUpsellOpportunities(input);
    
    // Retention factors
    const retentionFactors = this.identifyRetentionFactors(riskAnalysis, input);
    
    return {
      profitabilityScore,
      lifetimeValue,
      conversionProbability,
      upsellOpportunities,
      retentionFactors
    };
  }

  /**
   * Calculate market-adjusted premium based on competitive analysis
   */
  private async calculateMarketAdjustedPremium(
    basePremium: number, 
    carrier: CarrierConfig, 
    input: SmartQuoteInput
  ): Promise<number> {
    try {
      // Fetch competitor pricing data
      const competitorData = await this.getCompetitorPricing(input);
      
      if (competitorData && competitorData.length > 0) {
        const averageMarketPrice = competitorData.reduce((sum, price) => sum + price, 0) / competitorData.length;
        const marketPosition = basePremium / averageMarketPrice;
        
        // Adjust based on our strategic positioning
        let adjustment = 1.0;
        
        if (marketPosition > 1.15) {
          // We're too expensive, adjust down
          adjustment = 0.95;
        } else if (marketPosition < 0.85) {
          // We're too cheap, we can increase
          adjustment = 1.05;
        } else {
          // Good position, minor market variance
          adjustment = 0.98 + (Math.sin(Date.now() / 1000000) * 0.04); // Small systematic variation
        }
        
        return basePremium * adjustment;
      }
    } catch (error) {
      console.warn('Failed to get competitor pricing:', error);
    }
    
    // Fallback: Use carrier-specific market adjustment
    const carrierMarketAdjustment = this.getCarrierMarketAdjustment(carrier);
    return basePremium * carrierMarketAdjustment;
  }

  /**
   * Get competitor pricing for comparison
   */
  private async getCompetitorPricing(input: SmartQuoteInput): Promise<number[]> {
    try {
      const response = await fetch('/api/market/competitor-pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MARKET_API_KEY}`
        },
        body: JSON.stringify({
          coverageType: input.coverageType,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          coverage: input.coverageAmount,
          deductible: input.deductible
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.prices || [];
      }
    } catch (error) {
      console.warn('Failed to fetch competitor pricing:', error);
    }
    
    return [];
  }

  /**
   * Get carrier-specific market adjustment factor
   */
  private getCarrierMarketAdjustment(carrier: CarrierConfig): number {
    // Different carriers have different market positioning strategies
    const adjustments: Record<string, number> = {
      'premier-insurance': 1.02, // Premium positioning
      'national-insurance': 0.98, // Competitive positioning  
      'regional-insurance': 0.95, // Value positioning
      'budget-insurance': 0.92,  // Low-cost leader
      'specialty-insurance': 1.05 // Specialized/niche
    };
    
    return adjustments[carrier.id] || 1.0;
  }

  // Helper methods
  private calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
      return age - 1;
    }
    return age;
  }

  private async calculateLocationRisk(zipCode: string): Promise<number> {
    // In production, this would call external APIs for crime, weather, etc.
    // For now, simulate based on zip code patterns
    const numericZip = parseInt(zipCode.slice(0, 3));
    return (numericZip % 100) / 2; // Normalize to 0-50 range
  }

  private getRiskProfile(riskScore: number): 'low' | 'medium' | 'high' {
    if (riskScore < 30) return 'low';
    if (riskScore < 70) return 'medium';
    return 'high';
  }

  private getAlternativeCarriers(riskAnalysis: UnderwritingDecision, coverageType: string): string[] {
    return this.carriers
      .filter(carrier => 
        carrier.specialties.includes(coverageType) &&
        riskAnalysis.riskScore >= carrier.minRiskScore &&
        riskAnalysis.riskScore <= carrier.maxRiskScore
      )
      .map(carrier => carrier.name)
      .slice(1, 4); // Top 3 alternatives
  }

  private identifyUpsellOpportunities(input: SmartQuoteInput): string[] {
    const opportunities = [];
    
    if (input.coverageType === 'auto') {
      opportunities.push('Homeowners Insurance', 'Umbrella Policy');
    } else if (input.coverageType === 'homeowners') {
      opportunities.push('Auto Insurance', 'Life Insurance');
    } else if (input.coverageType === 'life') {
      opportunities.push('Disability Insurance', 'Long-term Care');
    }
    
    if (input.propertyValue && input.propertyValue > 500000) {
      opportunities.push('High-Value Home Coverage');
    }
    
    return opportunities;
  }

  private identifyRetentionFactors(riskAnalysis: UnderwritingDecision, input: SmartQuoteInput): string[] {
    const factors = [];
    
    if (riskAnalysis.riskScore < 30) {
      factors.push('Excellent risk profile - priority customer');
    }
    
    if (input.coverageAmount > 100000) {
      factors.push('High-value customer');
    }
    
    const age = this.calculateAge(input.dateOfBirth);
    if (age >= 25 && age <= 45) {
      factors.push('Prime demographic for long-term retention');
    }
    
    factors.push('Multi-policy discount opportunities', 'Annual review recommendations');
    
    return factors;
  }

  private generateQuoteId(input: SmartQuoteInput): string {
    const timestamp = Date.now();
    const userSeed = input.email.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
    const secureId = Math.abs(userSeed + timestamp).toString(36).substr(2, 6);
    const typeCode = input.coverageType.charAt(0).toUpperCase();
    return `MGA${typeCode}${timestamp}${secureId}`;
  }

  /**
   * Get Real-Time MGA Metrics - For Business Dashboard
   */
  async getMGAMetrics(): Promise<{
    totalQuotes: number;
    conversionRate: number;
    avgCommission: number;
    topCarriers: { name: string; percentage: number }[];
    riskDistribution: { low: number; medium: number; high: number };
    profitabilityTrend: number[];
  }> {
    // Mock data - in production this would come from database
    return {
      totalQuotes: 1247,
      conversionRate: 0.73,
      avgCommission: 186.50,
      topCarriers: [
        { name: 'Premier Insurance', percentage: 35 },
        { name: 'Secure Life & Property', percentage: 28 },
        { name: 'Guardian Auto', percentage: 22 },
        { name: 'National General', percentage: 15 }
      ],
      riskDistribution: { low: 45, medium: 40, high: 15 },
      profitabilityTrend: [12.5, 13.2, 14.1, 13.8, 15.2, 14.9]
    };
  }

  /**
   * Calculate natural disaster risk from real data sources
   */
  private async calculateNaturalDisasterRisk(zipCode: string): Promise<number> {
    try {
      // In production, integrate with NOAA, FEMA, or other disaster risk APIs
      const response = await fetch(`https://api.weather.gov/zones/forecast/${zipCode}`, {
        headers: {
          'User-Agent': 'MatchedCover-Insurance-Platform/1.0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Process real weather data to calculate risk score
        return this.processWeatherDataForRisk(data);
      }
    } catch (error) {
      console.warn('Failed to fetch real disaster risk data:', error);
    }
    
    // Fallback to basic risk assessment based on geographic region
    return this.getFallbackDisasterRisk(zipCode);
  }

  /**
   * Get weather risk score from meteorological APIs
   */
  private async getWeatherRiskScore(zipCode: string): Promise<number> {
    try {
      // In production, use services like:
      // - AccuWeather API
      // - Weather Underground
      // - NOAA Weather Service
      
      const response = await fetch(`/api/weather/risk/${zipCode}`, {
        headers: {
          'Authorization': `Bearer ${process.env.WEATHER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const weatherData = await response.json();
        return this.calculateWeatherRiskFromData(weatherData);
      }
    } catch (error) {
      console.warn('Failed to fetch weather risk data:', error);
    }
    
    return this.getBasicWeatherRisk(zipCode);
  }

  /**
   * Get flood risk score from FEMA and hydrological data
   */
  private async getFloodRiskScore(zipCode: string): Promise<number> {
    try {
      // In production, integrate with:
      // - FEMA Flood Map Service Center
      // - National Flood Insurance Program
      // - FirstStreet Foundation API
      
      const response = await fetch(`/api/flood/risk/${zipCode}`, {
        headers: {
          'Authorization': `Bearer ${process.env.FEMA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const floodData = await response.json();
        return this.processFloodRiskData(floodData);
      }
    } catch (error) {
      console.warn('Failed to fetch flood risk data:', error);
    }
    
    return this.getBasicFloodRisk(zipCode);
  }

  /**
   * Get earthquake risk from seismic monitoring services
   */
  private async getEarthquakeRiskScore(zipCode: string): Promise<number> {
    try {
      // In production, integrate with:
      // - USGS Earthquake Hazards Program
      // - Seismic risk assessment services
      
      const response = await fetch(`/api/seismic/risk/${zipCode}`, {
        headers: {
          'Authorization': `Bearer ${process.env.USGS_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const seismicData = await response.json();
        return this.processSeismicRiskData(seismicData);
      }
    } catch (error) {
      console.warn('Failed to fetch earthquake risk data:', error);
    }
    
    return this.getBasicEarthquakeRisk(zipCode);
  }

  /**
   * Get crime risk from law enforcement and demographic data
   */
  private async getCrimeRiskScore(zipCode: string): Promise<number> {
    try {
      // In production, integrate with:
      // - FBI Crime Data API
      // - Local law enforcement APIs
      // - Demographic risk assessment services
      
      const response = await fetch(`/api/crime/risk/${zipCode}`, {
        headers: {
          'Authorization': `Bearer ${process.env.CRIME_DATA_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const crimeData = await response.json();
        return this.processCrimeRiskData(crimeData);
      }
    } catch (error) {
      console.warn('Failed to fetch crime risk data:', error);
    }
    
    return this.getBasicCrimeRisk(zipCode);
  }

  // Helper methods for risk data processing

  private processWeatherDataForRisk(weatherData: any): number {
    // Process NOAA/weather service data
    if (!weatherData || typeof weatherData !== 'object') return 3;
    const data = weatherData as Record<string, unknown>;
    const properties = data.properties as Record<string, unknown> | undefined;
    const hazards = properties?.hazards as string[] || [];
    const severityScore = hazards.length * 2;
    return Math.min(severityScore, 10);
  }

  private calculateWeatherRiskFromData(weatherData: any): number {
    // Calculate risk from comprehensive weather data
    if (!weatherData || typeof weatherData !== 'object') return 3;
    const data = weatherData as Record<string, unknown>;
    let riskScore = 0;
    
    const severeWeatherHistory = data.severeWeatherHistory as Record<string, number> | undefined;
    const averageWindSpeed = data.averageWindSpeed as number | undefined;
    const precipitationLevels = data.precipitationLevels as number | undefined;
    
    if (severeWeatherHistory?.tornadoes) riskScore += severeWeatherHistory.tornadoes * 2;
    if (severeWeatherHistory?.hurricanes) riskScore += severeWeatherHistory.hurricanes * 3;
    if (averageWindSpeed && averageWindSpeed > 15) riskScore += 2;
    if (precipitationLevels && precipitationLevels > 50) riskScore += 1;
    
    return Math.min(riskScore, 10);
  }

  private processFloodRiskData(floodData: any): number {
    // Process FEMA flood zone data
    if (!floodData || typeof floodData !== 'object') return 3;
    const data = floodData as Record<string, unknown>;
    const { floodZone, baseFloodElevation, historicalFloods } = data;
    
    let riskScore = 0;
    if (floodZone === 'AE' || floodZone === 'A') riskScore += 8;
    else if (floodZone === 'X') riskScore += 2;
    
    if (typeof historicalFloods === 'number' && historicalFloods > 0) riskScore += historicalFloods;
    if (typeof baseFloodElevation === 'number' && baseFloodElevation > 0) riskScore += 1;
    
    return Math.min(riskScore, 10);
  }

  private processSeismicRiskData(seismicData: any): number {
    // Process USGS seismic risk data
    if (!seismicData || typeof seismicData !== 'object') return 3;
    const data = seismicData as Record<string, unknown>;
    const { peakGroundAcceleration, faultLineDistance, historicalActivity } = data;
    
    let riskScore = 0;
    if (typeof peakGroundAcceleration === 'number' && peakGroundAcceleration > 0.3) riskScore += 8;
    else if (typeof peakGroundAcceleration === 'number' && peakGroundAcceleration > 0.1) riskScore += 4;
    
    if (typeof faultLineDistance === 'number' && faultLineDistance < 10) riskScore += 3;
    if (typeof historicalActivity === 'number' && historicalActivity > 5) riskScore += 2;
    
    return Math.min(riskScore, 10);
  }

  private processCrimeRiskData(crimeData: any): number {
    // Process crime statistics
    if (!crimeData || typeof crimeData !== 'object') return 3;
    const data = crimeData as Record<string, unknown>;
    const { violentCrimeRate, propertyCrimeRate, overallSafetyIndex } = data;
    
    let riskScore = 0;
    if (typeof violentCrimeRate === 'number' && violentCrimeRate > 500) riskScore += 6;
    else if (typeof violentCrimeRate === 'number' && violentCrimeRate > 250) riskScore += 3;
    
    if (typeof propertyCrimeRate === 'number' && propertyCrimeRate > 2000) riskScore += 4;
    else if (typeof propertyCrimeRate === 'number' && propertyCrimeRate > 1000) riskScore += 2;
    
    if (typeof overallSafetyIndex === 'number' && overallSafetyIndex < 40) riskScore += 2;
    
    return Math.min(riskScore, 10);
  }

  // Fallback methods when APIs are unavailable

  private getFallbackDisasterRisk(zipCode: string): number {
    // Basic geographic risk assessment
    const zip = parseInt(zipCode.substring(0, 2));
    
    // High risk areas (example zip prefixes)
    if ([90, 91, 92, 93, 94, 95].includes(zip)) return 7; // California
    if ([33, 34].includes(zip)) return 8; // Florida
    if ([77, 78].includes(zip)) return 6; // Texas Gulf Coast
    if ([29].includes(zip)) return 6; // South Carolina
    
    return 3; // Default moderate risk
  }

  private getBasicWeatherRisk(zipCode: string): number {
    const zip = parseInt(zipCode.substring(0, 2));
    
    // Tornado Alley
    if ([73, 74, 67, 66, 68, 69].includes(zip)) return 8;
    // Hurricane zones
    if ([33, 34, 32, 39, 28, 29].includes(zip)) return 7;
    // Severe winter weather
    if ([1, 2, 3, 4, 5].includes(zip)) return 5;
    
    return 3;
  }

  private getBasicFloodRisk(zipCode: string): number {
    const zip = parseInt(zipCode.substring(0, 2));
    
    // Coastal areas
    if ([33, 34, 90, 91, 92, 93, 94, 95, 98, 99].includes(zip)) return 6;
    // River valleys
    if ([63, 64, 65, 38, 41, 42].includes(zip)) return 5;
    
    return 2;
  }

  private getBasicEarthquakeRisk(zipCode: string): number {
    const zip = parseInt(zipCode.substring(0, 2));
    
    // California
    if ([90, 91, 92, 93, 94, 95].includes(zip)) return 8;
    // New Madrid fault area
    if ([63, 64, 65, 38, 41, 42].includes(zip)) return 4;
    // Pacific Northwest
    if ([97, 98, 99].includes(zip)) return 6;
    
    return 1;
  }

  private getBasicCrimeRisk(zipCode: string): number {
    const zip = parseInt(zipCode.substring(0, 2));
    
    // Major metropolitan areas (higher crime potential)
    if ([100, 101, 102, 103, 104, 105].includes(zip)) return 6; // NYC
    if ([606, 607, 608, 609].includes(zip)) return 5; // Chicago
    if ([900, 901, 902, 903, 904, 905].includes(zip)) return 5; // LA
    
    return 3; // Default moderate risk
  }
}

export default SmartQuoteEngine;
