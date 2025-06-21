/**
 * AI Agent Quote Service
 * Integrates AI agents with carrier services for intelligent quote recommendations
 */

import { geminiAIService } from '@/services/ai/GeminiAIService';
import { carrierIntegrationService, QuoteRequest, QuoteResponse } from '@/services/carriers/CarrierIntegrationService';
import { Locale } from '@/i18n/config';

export interface AgentQuoteRequest {
   private getGreetingPrompt(agentId: string, locale: string = 'en'): string {
    const responses = {
      en: {
        maya: "I'm so excited to help you find amazing insurance deals! 🌟 Could you tell me what type of insurance you're looking for and which state you're in? I'll find you the best savings!",
        alex: "I'd be happy to analyze your insurance needs systematically. 📊 To provide the most accurate assessment, I'll need to know your location, the type of coverage you need, and your current situation.",
        sam: "I'm here to make this process as easy as possible for you! 💙 Let's start with the basics - what type of insurance are you interested in, and how can I best help you today?"
      }
    };
    
    const validAgentIds = ['maya', 'alex', 'sam'] as const;
    const validAgentId = validAgentIds.includes(agentId as any) ? agentId as keyof typeof responses.en : 'maya';
    
    return responses[locale as keyof typeof responses]?.[validAgentId] || responses.en[validAgentId];
  } string;
  agentId: 'maya' | 'alex' | 'sam';
  locale: Locale;
  userProfile?: UserQuoteProfile;
  previousContext?: string[];
}

export interface UserQuoteProfile {
  age: number;
  state: string;
  hasVehicle: boolean;
  hasHome: boolean;
  currentInsurance?: string;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface AgentQuoteResponse {
  aiResponse: string;
  quoteData?: QuoteResponse[];
  nextSteps: string[];
  questionSuggestions: string[];
  carrierRecommendations?: CarrierRecommendation[];
  estimatedSavings?: number;
}

export interface CarrierRecommendation {
  carrierId: string;
  carrierName: string;
  whyRecommended: string;
  strengths: string[];
  estimatedPremium: number;
  confidenceScore: number;
}

interface ExtractedQuoteInfo {
  insuranceType: 'auto' | 'home' | 'life' | 'health' | 'business';
  state?: string;
  hasEnoughInfo?: boolean;
  coverage?: {
    limits?: number;
    deductible?: number;
    type?: string;
  };
  vehicleInfo?: {
    year?: number;
    make?: string;
    model?: string;
    vin?: string;
  };
  personalInfo?: {
    maritalStatus?: string;
    age?: number;
    gender?: string;
    creditScore?: number;
  };
  property?: {
    value?: number;
    type?: string;
    address?: string;
  };
  currentInsurance?: {
    carrier?: string;
    premium?: number;
    expirationDate?: string;
  };
  riskFactors?: string[];
  additionalInfo?: Record<string, unknown>;
}

class AIAgentQuoteService {
  
  /**
   * Process user input through AI agent and provide intelligent quote recommendations
   */
  async processQuoteRequest(request: AgentQuoteRequest): Promise<AgentQuoteResponse> {
    try {
      // Step 1: Analyze user intent and extract quote parameters
      const extractedInfo = await this.extractQuoteInformation(request.userInput, request.locale);
      
      // Step 2: If we have enough info, get real quotes
      let quoteData: QuoteResponse[] | undefined;
      let carrierRecommendations: CarrierRecommendation[] | undefined;
      let estimatedSavings: number | undefined;
      
      if (extractedInfo.hasEnoughInfo) {
        const quoteRequest = this.buildQuoteRequest(extractedInfo, request.userProfile);
        quoteData = await carrierIntegrationService.getMultiCarrierQuotes(quoteRequest);
        carrierRecommendations = this.generateCarrierRecommendations(quoteData, request.agentId);
        estimatedSavings = this.calculatePotentialSavings(quoteData);
      }
      
      // Step 3: Generate agent-specific response
      const aiResponse = await this.generateAgentResponse(
        request.userInput,
        request.agentId,
        request.locale,
        extractedInfo,
        quoteData,
        carrierRecommendations
      );
      
      // Step 4: Generate next steps and suggestions
      const nextSteps = this.generateNextSteps(extractedInfo, request.agentId);
      const questionSuggestions = this.generateQuestionSuggestions(extractedInfo, request.agentId);
      
      return {
        aiResponse,
        quoteData,
        nextSteps,
        questionSuggestions,
        carrierRecommendations,
        estimatedSavings
      };
      
    } catch (error) {
      console.error('AI Quote Service Error:', error);
      
      // Fallback response
      return {
        aiResponse: this.getFallbackResponse(request.agentId, request.locale),
        nextSteps: ['Please provide more details about your insurance needs'],
        questionSuggestions: [
          'What type of insurance are you looking for?',
          'What state are you located in?',
          'What is your current insurance situation?'
        ]
      };
    }
  }
  
  /**
   * Extract structured information from user input using AI
   */
  private async extractQuoteInformation(userInput: string, locale: Locale) {
    const extractionPrompt = `
Analyze this user message about insurance and extract key information:
"${userInput}"

Extract and return JSON with:
{
  "insuranceType": "auto|home|life|commercial|renters|umbrella|unknown",
  "state": "state code or unknown",
  "vehicleInfo": {
    "year": number or null,
    "make": "string or null",
    "model": "string or null"
  },
  "personalInfo": {
    "age": number or null,
    "maritalStatus": "single|married|unknown"
  },
  "currentSituation": "has insurance|no insurance|shopping|unknown",
  "urgency": "immediate|soon|exploring|unknown",
  "hasEnoughInfo": boolean (true if we have enough to generate a quote),
  "missingInfo": ["list of missing required information"]
}

Only extract information explicitly mentioned. Return valid JSON only.`;

    try {
      const response = await geminiAIService.simpleChat(extractionPrompt, locale);
      return JSON.parse(response);
    } catch (error) {
      console.error('Information extraction error:', error);
      return {
        insuranceType: 'unknown',
        hasEnoughInfo: false,
        missingInfo: ['insurance type', 'location', 'personal details']
      };
    }
  }
  
  /**
   * Build quote request from extracted information
   */
  private buildQuoteRequest(extractedInfo: ExtractedQuoteInfo, userProfile?: UserQuoteProfile): QuoteRequest {
    // This is a simplified version - in production, you'd need more comprehensive mapping
    return {
      customerId: `user_${Date.now()}`,
      productType: extractedInfo.insuranceType === 'auto' ? 'auto' : 'home',
      applicant: {
        firstName: 'John', // Would come from user profile
        lastName: 'Doe',
        dateOfBirth: userProfile?.age ? new Date(new Date().getFullYear() - userProfile.age, 0, 1).toISOString() : '1985-01-01',
        gender: 'M',
        maritalStatus: extractedInfo.personalInfo?.maritalStatus === 'married' ? 'married' : 'single',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: extractedInfo.state || userProfile?.state || 'OH',
          zipCode: '12345'
        },
        phone: '555-123-4567',
        email: 'user@example.com'
      },
      vehicle: extractedInfo.insuranceType === 'auto' ? {
        year: extractedInfo.vehicleInfo?.year || 2020,
        make: extractedInfo.vehicleInfo?.make || 'Toyota',
        model: extractedInfo.vehicleInfo?.model || 'Camry',
        vin: '1HGBH41JXMN109186',
        usage: 'commute',
        annualMileage: 12000,
        financing: 'owned'
      } : undefined,
      coverage: {
        liability: {
          bodilyInjuryPerPerson: 100000,
          bodilyInjuryPerAccident: 300000,
          propertyDamage: 100000
        },
        collision: { deductible: 500 },
        comprehensive: { deductible: 500 }
      },
      effectiveDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
  }
  
  /**
   * Generate agent-specific response with quote data
   */
  private async generateAgentResponse(
    userInput: string,
    agentId: 'maya' | 'alex' | 'sam',
    locale: Locale,
    extractedInfo: ExtractedQuoteInfo,
    quoteData?: QuoteResponse[],
    recommendations?: CarrierRecommendation[]
  ): Promise<string> {
    
    let agentPrompt = '';
    
    if (agentId === 'maya') {
      agentPrompt = `You are Maya, an enthusiastic insurance sales expert! 🌟
User asked: "${userInput}"

${quoteData ? `I found these amazing quotes for you:
${quoteData.map(q => `• ${q.carrierName}: $${q.premium.annual}/year (Save up to $${Math.max(...quoteData.map(x => x.premium.annual)) - q.premium.annual}!)`).join('\n')}` : ''}

${recommendations ? `My TOP recommendations:
${recommendations.slice(0, 2).map(r => `• ${r.carrierName}: ${r.whyRecommended} (${r.confidenceScore}% confidence)`).join('\n')}` : ''}

Respond with excitement and focus on savings opportunities! Include emojis and highlight the best deals!`;

    } else if (agentId === 'alex') {
      agentPrompt = `You are Alex, a detail-oriented risk analyst. 🧠
User asked: "${userInput}"

${quoteData ? `Risk analysis of available quotes:
${quoteData.map(q => `• ${q.carrierName}: $${q.premium.annual}/year - ${q.ratingFactors?.length || 0} factors analyzed`).join('\n')}` : ''}

${recommendations ? `Risk-based recommendations:
${recommendations.map(r => `• ${r.carrierName}: Risk score analysis - ${r.strengths.join(', ')}`).join('\n')}` : ''}

Provide analytical insights about coverage adequacy, risk factors, and protection levels.`;

    } else {
      agentPrompt = `You are Sam, an empathetic support advocate. ❤️
User asked: "${userInput}"

${quoteData ? `I've found these caring options for you:
${quoteData.map(q => `• ${q.carrierName}: $${q.premium.annual}/year - Great customer service reputation`).join('\n')}` : ''}

${recommendations ? `My caring recommendations:
${recommendations.map(r => `• ${r.carrierName}: Known for excellent customer support and ${r.whyRecommended.toLowerCase()}`).join('\n')}` : ''}

Respond with empathy and focus on peace of mind, customer service, and making insurance easy to understand.`;
    }
    
    return await geminiAIService.simpleChat(agentPrompt, locale);
  }
  
  /**
   * Generate carrier recommendations based on agent personality
   */
  private generateCarrierRecommendations(quotes: QuoteResponse[], agentId: string): CarrierRecommendation[] {
    return quotes.map(quote => {
      let whyRecommended = '';
      let strengths: string[] = [];
      let confidenceScore = 85;
      
      if (agentId === 'maya') {
        whyRecommended = 'Best value for money with great discounts';
        strengths = ['Competitive pricing', 'Multiple discounts', 'Quick quotes'];
        confidenceScore = 90;
      } else if (agentId === 'alex') {
        whyRecommended = 'Strong financial stability and comprehensive coverage';
        strengths = ['Financial strength', 'Comprehensive coverage', 'Risk management'];
        confidenceScore = 88;
      } else {
        whyRecommended = 'Excellent customer service and easy claims process';
        strengths = ['Customer service', 'Claims satisfaction', 'Support quality'];
        confidenceScore = 92;
      }
      
      return {
        carrierId: quote.carrierId,
        carrierName: quote.carrierName,
        whyRecommended,
        strengths,
        estimatedPremium: quote.premium.annual,
        confidenceScore
      };
    });
  }
  
  /**
   * Calculate potential savings from quotes
   */
  private calculatePotentialSavings(quotes: QuoteResponse[]): number {
    if (quotes.length < 2) return 0;
    
    const premiums = quotes.map(q => q.premium.annual);
    const highest = Math.max(...premiums);
    const lowest = Math.min(...premiums);
    
    return highest - lowest;
  }
  
  /**
   * Generate next steps based on extracted information
   */
  private generateNextSteps(extractedInfo: ExtractedQuoteInfo, agentId: string): string[] {
    const steps: string[] = [];
    
    if (!extractedInfo.hasEnoughInfo) {
      if (agentId === 'maya') {
        steps.push('🎯 Let me get a few quick details to find you the BEST deals!');
        steps.push('💰 Tell me your state and what type of insurance you need');
        steps.push('✨ I\'ll show you amazing savings opportunities!');
      } else if (agentId === 'alex') {
        steps.push('📊 I need to assess your risk profile properly');
        steps.push('🔍 Please provide your location and coverage requirements');
        steps.push('📈 I\'ll analyze the best protection options for you');
      } else {
        steps.push('🤗 I\'m here to help make this easy for you');
        steps.push('📝 Let\'s gather some basic information step by step');
        steps.push('💙 I\'ll guide you through the whole process');
      }
    } else {
      steps.push('Review the quotes I found for you');
      steps.push('Compare coverage options and savings');
      steps.push('Choose your preferred option and I\'ll help you get started');
    }
    
    return steps;
  }
  
  /**
   * Generate question suggestions for the user
   */
  private generateQuestionSuggestions(extractedInfo: ExtractedQuoteInfo, agentId: string): string[] {
    const suggestions: string[] = [];
    
    if (agentId === 'maya') {
      suggestions.push('How much can I save on car insurance?');
      suggestions.push('What discounts are available?');
      suggestions.push('Can you compare prices from different companies?');
    } else if (agentId === 'alex') {
      suggestions.push('What coverage limits do you recommend?');
      suggestions.push('How do different factors affect my rates?');
      suggestions.push('What are the risks if I choose minimum coverage?');
    } else {
      suggestions.push('Can you help me understand my current policy?');
      suggestions.push('What happens if I need to file a claim?');
      suggestions.push('How do I choose the right insurance company?');
    }
    
    return suggestions;
  }
  
  /**
   * Get fallback response for agent
   */
  private getFallbackResponse(agentId: string, locale: Locale): string {
    const responses = {
      en: {
        maya: "I'm so excited to help you find amazing insurance deals! 🌟 Could you tell me what type of insurance you're looking for and which state you're in? I'll find you the best savings!",
        alex: "I'd be happy to analyze your insurance needs systematically. 📊 To provide the most accurate assessment, I'll need to know your location, the type of coverage you need, and your current situation.",
        sam: "I'm here to make this process as easy as possible for you! 💙 Let's start with the basics - what type of insurance are you interested in, and how can I best help you today?"
      }
    };
    
    return responses[locale as keyof typeof responses]?.[agentId] || responses.en[agentId];
  }
}

// Export singleton instance
export const aiAgentQuoteService = new AIAgentQuoteService();
export default aiAgentQuoteService;
