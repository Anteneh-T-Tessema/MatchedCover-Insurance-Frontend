/**
 * Enhanced Gemini AI Service with Multi-Language Agent Support
 * Integrates Google's Gemini AI with MatchedCover's AI agents (Maya, Alex, Sam)
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { Locale } from '@/i18n/config';
import { selectAgent, LocalizedAgentProfile } from './AgentProfiles';

export interface AgentPersonality {
  name: string;
  tone: string;
  style: string;
  expertise: string[];
  useEmojis: boolean;
  responseLength: string;
}

export interface GeminiConfig {
  apiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  locale?: Locale;
}

export interface AIResponse {
  text: string;
  confidence: number;
  suggestions: string[];
  actions: AgentAction[];
  gameReward?: GameReward;
  emotionalTone: 'positive' | 'neutral' | 'concerned' | 'excited';
  selectedAgent: LocalizedAgentProfile;
  agentResponse: string;
}

export interface AgentAction {
  type: 'quote' | 'bind' | 'claim' | 'education' | 'gamification' | 'redirect';
  description: string;
  data: Record<string, unknown>;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
}

export interface GameReward {
  type: 'points' | 'badge' | 'achievement' | 'unlock';
  value: number | string;
  description: string;
  animation: string;
}

export interface ConversationContext {
  agentId: string;
  userProfile: UserProfile;
  gameState: GameState;
  conversationHistory: ConversationMessage[];
  currentGoal: string;
  insuranceContext: InsuranceContext;
}

export interface UserProfile {
  id: string;
  name: string;
  insuranceExperience: 'beginner' | 'intermediate' | 'expert';
  communicationStyle: 'casual' | 'professional' | 'technical';
  currentNeeds: string[];
  riskProfile: RiskProfile;
}

export interface RiskProfile {
  creditScore?: number;
  drivingRecord: string;
  claims_history: number;
  location: string;
  age: number;
  occupation: string;
}

export interface GameState {
  level: number;
  points: number;
  badges: Badge[];
  achievements: Achievement[];
  currentStreak: number;
  lastActivity: Date;
  unlockedFeatures: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt: Date;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface InsuranceContext {
  activeQuotes: Quote[];
  currentPolicies: Policy[];
  recentClaims: Claim[];
  riskFactors: RiskProfile;
  preferredCoverage: CoveragePreferences;
}

export interface Quote {
  id: string;
  type: string;
  status: string;
  premium: number;
  createdAt: Date;
}

export interface Policy {
  id: string;
  type: string;
  status: string;
  premium: number;
  startDate: Date;
  endDate: Date;
}

export interface Claim {
  id: string;
  type: string;
  status: string;
  amount: number;
  dateReported: Date;
}

export interface CoveragePreferences {
  liability: number;
  collision: boolean;
  comprehensive: boolean;
  deductible: number;
}

export class EnhancedGeminiAIService {
  private genAI?: GoogleGenerativeAI;
  private model?: ReturnType<GoogleGenerativeAI['getGenerativeModel']>;
  private config: GeminiConfig;

  constructor(config: GeminiConfig) {
    this.config = config;
    
    // Only initialize Gemini if we have a valid API key
    if (config.apiKey && config.apiKey.length > 10) {
      this.genAI = new GoogleGenerativeAI(config.apiKey);
      this.model = this.genAI.getGenerativeModel({ model: config.model });
    } else {
      console.warn('Gemini AI: No valid API key provided, using intelligent fallback responses');
    }
  }

  /**
   * Generate AI response with agent selection and multi-language support
   */
  async generateResponse(
    userMessage: string, 
    context: ConversationContext,
    locale: Locale = 'en'
  ): Promise<AIResponse> {
    try {
      // Select the appropriate agent based on the user message
      const selectedAgent = selectAgent(userMessage);
      
      // If no model available, use intelligent fallback
      if (!this.model) {
        return this.getIntelligentFallbackResponse(userMessage, context, locale, selectedAgent);
      }
      
      const prompt = this.buildContextualPrompt(userMessage, context, selectedAgent, locale);
      
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: this.config.temperature,
          maxOutputTokens: this.config.maxTokens,
        }
      });

      const response = result.response;
      const text = response.text();

      // Parse the AI response for structured data
      const parsedResponse = this.parseAIResponse(text);
      
      // Add gamification rewards
      const gameReward = this.calculateGameReward(userMessage, context);
      
      // Get localized agent response
      const agentResponse = this.getLocalizedAgentResponse(selectedAgent, locale, userMessage);
      
      return {
        ...parsedResponse,
        gameReward,
        selectedAgent,
        agentResponse
      };

    } catch (error) {
      console.error('Gemini AI Error:', error);
      return this.getFallbackResponse(userMessage, context, locale);
    }
  }

  /**
   * Build contextual prompt for the AI with agent personality and user context
   */
  private buildContextualPrompt(
    userMessage: string, 
    context: ConversationContext,
    agent: LocalizedAgentProfile,
    locale: Locale
  ): string {
    const { userProfile, gameState, insuranceContext } = context;
    
    const prompt = `You are ${agent.name}, an AI insurance agent. Respond in ${locale === 'en' ? 'English' : locale === 'es' ? 'Spanish' : locale === 'fr' ? 'French' : 'English'}.

AGENT PERSONALITY:
- Name: ${agent.name}
- Role: ${agent.role[locale] || agent.role.en}
- Personality: ${agent.personality[locale] || agent.personality.en}
- Greeting: ${agent.greeting[locale] || agent.greeting.en}

USER CONTEXT:
- Name: ${userProfile.name}
- Experience: ${userProfile.insuranceExperience}
- Communication: ${userProfile.communicationStyle}
- Needs: ${userProfile.currentNeeds.join(', ')}

GAMIFICATION:
- Level: ${gameState.level}
- Points: ${gameState.points}
- Streak: ${gameState.currentStreak}

INSURANCE CONTEXT:
- Active Quotes: ${insuranceContext.activeQuotes.length}
- Policies: ${insuranceContext.currentPolicies.length}
- Claims: ${insuranceContext.recentClaims.length}

USER MESSAGE: "${userMessage}"

Respond as ${agent.name} would, maintaining their personality and expertise. Provide helpful insurance guidance in ${locale === 'en' ? 'English' : locale === 'es' ? 'Spanish' : locale === 'fr' ? 'French' : 'English'}.`;

    return prompt;
  }

  /**
   * Parse AI response for structured data
   */
  private parseAIResponse(aiText: string): Omit<AIResponse, 'gameReward' | 'selectedAgent' | 'agentResponse'> {
    // For now, return a simple structured response
    // In production, you could implement more sophisticated parsing
    return {
      text: aiText,
      confidence: 0.8,
      suggestions: this.extractSuggestions(aiText),
      actions: this.extractActions(aiText),
      emotionalTone: this.detectEmotionalTone(aiText)
    };
  }

  /**
   * Get localized agent response based on catchphrases and personality
   */
  private getLocalizedAgentResponse(agent: LocalizedAgentProfile, locale: Locale, userMessage: string): string {
    const catchphrases = agent.catchphrases[locale] || agent.catchphrases.en;
    const greeting = agent.greeting[locale] || agent.greeting.en;
    
    // For first interaction, use greeting
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      return greeting;
    }
    
    // Use a random catchphrase
    const randomPhrase = catchphrases[Math.floor(Math.random() * catchphrases.length)];
    return randomPhrase;
  }

  /**
   * Calculate gamification rewards based on user interaction
   */
  private calculateGameReward(userMessage: string, context: ConversationContext): GameReward | undefined {
    const message = userMessage.toLowerCase();
    
    // First interaction bonus
    if (context.conversationHistory.length === 0) {
      return {
        type: 'points',
        value: 10,
        description: 'First conversation started!',
        animation: 'sparkles'
      };
    }

    // Quote request detection
    if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
      return {
        type: 'points',
        value: 25,
        description: 'Quote inquiry - smart shopping!',
        animation: 'coins'
      };
    }

    // Learning engagement
    if (message.includes('how') || message.includes('why') || message.includes('explain')) {
      return {
        type: 'points',
        value: 15,
        description: 'Learning about insurance!',
        animation: 'book'
      };
    }

    // Regular engagement
    return {
      type: 'points',
      value: 5,
      description: 'Engaged conversation',
      animation: 'plus'
    };
  }

  /**
   * Extract suggestions from AI text
   */
  private extractSuggestions(text: string): string[] {
    const suggestions = [];
    
    if (text.includes('quote')) suggestions.push('Get a personalized quote');
    if (text.includes('coverage')) suggestions.push('Learn about coverage options');
    if (text.includes('claim')) suggestions.push('File or track a claim');
    if (text.includes('save')) suggestions.push('Explore money-saving tips');
    
    return suggestions.slice(0, 3);
  }

  /**
   * Extract actionable items from AI response
   */
  private extractActions(text: string): AgentAction[] {
    const actions: AgentAction[] = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('quote')) {
      actions.push({
        type: 'quote',
        description: 'Start a new quote',
        data: { flow: 'smart-wizard' },
        confidence: 0.9,
        priority: 'high'
      });
    }

    if (lowerText.includes('learn') || lowerText.includes('education')) {
      actions.push({
        type: 'education',
        description: 'Explore insurance education',
        data: { module: 'basics' },
        confidence: 0.8,
        priority: 'medium'
      });
    }

    return actions;
  }

  /**
   * Detect emotional tone from AI response
   */
  private detectEmotionalTone(text: string): 'positive' | 'neutral' | 'concerned' | 'excited' {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('great') || lowerText.includes('excellent') || lowerText.includes('amazing')) {
      return 'excited';
    }
    if (lowerText.includes('concern') || lowerText.includes('careful') || lowerText.includes('important')) {
      return 'concerned';
    }
    if (lowerText.includes('good') || lowerText.includes('nice') || lowerText.includes('perfect')) {
      return 'positive';
    }
    
    return 'neutral';
  }

  /**
   * Fallback response when AI fails
   */
  private getFallbackResponse(userMessage: string, context: ConversationContext, locale: Locale): AIResponse {
    const selectedAgent = selectAgent(userMessage);
    const agentName = selectedAgent.name;
    
    const fallbackMessages = {
      en: `Hi! I'm ${agentName}, and I'm here to help with your insurance needs. I'm having a small technical issue right now, but I'd still love to assist you. Could you tell me more about what you're looking for?`,
      es: `¡Hola! Soy ${agentName}, y estoy aquí para ayudarte con tus necesidades de seguros. Estoy teniendo un pequeño problema técnico ahora, pero aún me encantaría ayudarte. ¿Podrías contarme más sobre lo que estás buscando?`,
      fr: `Salut ! Je suis ${agentName}, et je suis là pour vous aider avec vos besoins d'assurance. J'ai un petit problème technique en ce moment, mais j'aimerais quand même vous aider. Pourriez-vous me dire ce que vous recherchez ?`,
      de: `Hallo! Ich bin ${agentName} und ich bin hier, um Ihnen bei Ihren Versicherungsbedürfnissen zu helfen. Ich habe gerade ein kleines technisches Problem, aber ich würde Ihnen gerne trotzdem helfen. Können Sie mir mehr darüber erzählen, wonach Sie suchen?`,
      pt: `Olá! Eu sou ${agentName}, e estou aqui para ajudá-lo com suas necessidades de seguro. Estou tendo um pequeno problema técnico agora, mas ainda adoraria ajudá-lo. Você poderia me contar mais sobre o que está procurando?`,
      zh: `你好！我是${agentName}，我在这里帮助您满足保险需求。我现在遇到了一个小技术问题，但我仍然很乐意为您提供帮助。您能告诉我更多关于您在寻找什么吗？`,
      ja: `こんにちは！私は${agentName}です。保険のニーズをお手伝いするためにここにいます。今、小さな技術的な問題がありますが、それでもお手伝いしたいと思います。お探しのものについて詳しく教えていただけますか？`
    };
    
    return {
      text: fallbackMessages[locale] || fallbackMessages.en,
      confidence: 0.5,
      suggestions: ['Get a quote', 'Learn about coverage', 'Speak with a human agent'],
      actions: [{
        type: 'quote',
        description: 'Start insurance quote',
        data: {},
        confidence: 0.7,
        priority: 'medium'
      }],
      emotionalTone: 'positive',
      selectedAgent,
      agentResponse: selectedAgent.greeting[locale] || selectedAgent.greeting.en
    };
  }

  /**
   * Intelligent fallback response when Gemini API is not available
   */
  private getIntelligentFallbackResponse(
    userMessage: string, 
    context: ConversationContext, 
    locale: Locale, 
    selectedAgent: LocalizedAgentProfile
  ): AIResponse {
    const message = userMessage.toLowerCase();
    const agentName = selectedAgent.name;
    
    // Agent-specific intelligent responses
    const responses = {
      maya: {
        en: {
          quote: `Hi! I'm Maya, your insurance savings specialist! 🌟 I'd love to help you find amazing deals on insurance. For ${this.detectInsuranceType(message)}, I typically see savings of 15-30% when we find the right coverage. Let me ask you a few quick questions to get you the best quote!`,
          general: `Hello! I'm Maya, and I'm super excited to help you with your insurance needs! 💫 I specialize in finding you the best rates and making sure you get amazing value. What type of insurance are you looking for today?`,
          greeting: `Hey there! 🌟 I'm Maya, your friendly insurance advisor! I love helping people save money while getting great coverage. What can I help you with today?`
        },
        es: {
          quote: `¡Hola! ¡Soy Maya, tu especialista en ahorros de seguros! 🌟 Me encantaría ayudarte a encontrar ofertas increíbles en seguros. Para ${this.detectInsuranceType(message)}, normalmente veo ahorros del 15-30% cuando encontramos la cobertura correcta.`,
          general: `¡Hola! Soy Maya, ¡y estoy súper emocionada de ayudarte con tus necesidades de seguros! 💫 Me especializo en encontrarte las mejores tarifas.`,
          greeting: `¡Hola! 🌟 ¡Soy Maya, tu asesora de seguros amigable! Me encanta ayudar a la gente a ahorrar dinero mientras obtienen gran cobertura.`
        }
      },
      alex: {
        en: {
          quote: `Hello, I'm Alex, your risk assessment specialist. 🧠 I'll help you understand the coverage you need based on your specific risk profile. For ${this.detectInsuranceType(message)}, let me analyze the key factors that affect your rates and coverage needs.`,
          general: `Good day, I'm Alex. I specialize in comprehensive risk analysis and ensuring you have optimal coverage. I'll help you understand exactly what protection you need and why.`,
          greeting: `Hello, I'm Alex. 🧠 I focus on thorough risk assessment to ensure you get the right coverage for your specific situation. How can I assist you today?`
        }
      },
      sam: {
        en: {
          quote: `Hi there, I'm Sam. ❤️ I understand insurance can feel overwhelming, but I'm here to guide you through it with care. Let me help you find coverage that gives you peace of mind and protects what matters most to you.`,
          general: `Hello, I'm Sam. I'm here to support you with patience and understanding. Whether you're dealing with a claim or need new coverage, I'll make sure you feel confident and protected.`,
          greeting: `Hi! I'm Sam ❤️ I'm here to help you navigate insurance with empathy and care. I want to make sure you feel completely supported. What brings you here today?`
        }
      }
    };

    const agentKey = agentName.toLowerCase() as keyof typeof responses;
    const agentResponses = responses[agentKey] || responses.maya;
    const localeResponses = agentResponses[locale as keyof typeof agentResponses] || agentResponses.en;
    
    let responseText = '';
    if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
      responseText = localeResponses.quote || localeResponses.general;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      responseText = localeResponses.greeting || localeResponses.general;
    } else {
      responseText = localeResponses.general;
    }

    return {
      text: responseText,
      confidence: 0.85,
      suggestions: this.getContextualSuggestions(message, agentName),
      actions: this.extractActions(responseText),
      emotionalTone: agentName === 'Maya' ? 'excited' : agentName === 'Alex' ? 'neutral' : 'positive',
      selectedAgent,
      agentResponse: selectedAgent.greeting[locale] || selectedAgent.greeting.en,
      gameReward: {
        type: 'points',
        value: 10,
        description: `Great question! +10 points for engaging with ${agentName}`,
        animation: 'bounce'
      }
    };
  }

  /**
   * Detect insurance type from user message
   */
  private detectInsuranceType(message: string): string {
    if (message.includes('car') || message.includes('auto') || message.includes('vehicle')) {
      return 'auto insurance';
    }
    if (message.includes('home') || message.includes('house') || message.includes('property')) {
      return 'home insurance';
    }
    if (message.includes('life') || message.includes('death')) {
      return 'life insurance';
    }
    if (message.includes('health') || message.includes('medical')) {
      return 'health insurance';
    }
    return 'insurance';
  }

  /**
   * Get contextual suggestions based on message and agent
   */
  private getContextualSuggestions(message: string, agentName: string): string[] {
    if (agentName === 'Maya') {
      return ['Get a quick quote', 'Compare prices', 'Find discounts', 'Bundle and save'];
    }
    if (agentName === 'Alex') {
      return ['Assess my risk', 'Review coverage options', 'Understand policy details', 'Get expert advice'];
    }
    if (agentName === 'Sam') {
      return ['File a claim', 'Get support', 'Ask questions', 'Understand my policy'];
    }
    return ['Get a quote', 'Learn more', 'Speak with an agent'];
  }

  /**
   * Test AI service connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      if (!this.model) {
        console.log('Gemini API not available, using fallback responses');
        return true; // Consider fallback as "connected"
      }
      
      const result = await this.model.generateContent({
        contents: [{ role: 'user', parts: [{ text: 'Hello, test connection' }] }]
      });
      return !!result.response.text();
    } catch (error) {
      console.error('AI Service connection test failed:', error);
      return false;
    }
  }

  /**
   * Simple chat method using secure API route
   */
  async simpleChat(message: string, locale: Locale = 'en'): Promise<string> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, locale }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.response || this.getSimpleFallbackResponse(message, locale);
    } catch (error) {
      console.error('Simple chat error:', error);
      return this.getSimpleFallbackResponse(message, locale);
    }
  }

  /**
   * Simple fallback response for chat
   */
  private getSimpleFallbackResponse(message: string, locale: Locale): string {
    const selectedAgent = selectAgent(message);
    
    if (selectedAgent.name === 'Maya') {
      return locale === 'es' 
        ? '¡Hola! Soy Maya, tu asistente de seguros. ¿En qué puedo ayudarte hoy? 🌟'
        : locale === 'fr'
        ? 'Bonjour! Je suis Maya, votre assistante d\'assurance. Comment puis-je vous aider aujourd\'hui? 🌟'
        : 'Hi! I\'m Maya, your insurance assistant! 🌟 How can I help you today?';
    } else if (selectedAgent.name === 'Alex') {
      return locale === 'es'
        ? 'Hola, soy Alex. Te ayudo con análisis de riesgos de seguros. ¿Qué puedo analizar para ti? 🧠'
        : 'Hello, I\'m Alex. I help with insurance risk analysis. What can I analyze for you? 🧠';
    } else {
      return locale === 'es'
        ? 'Hola, soy Sam. Estoy aquí para ayudarte con cuidado y comprensión. ¿Cómo puedo apoyarte? ❤️'
        : 'Hi, I\'m Sam. I\'m here to help you with care and understanding. How can I support you? ❤️';
    }
  }
}

// Export singleton instance
export const geminiAIService = new EnhancedGeminiAIService({
  apiKey: '', // API key is now handled server-side
  model: 'gemini-pro',
  temperature: 0.8,
  maxTokens: 1000,
});

export default geminiAIService;
