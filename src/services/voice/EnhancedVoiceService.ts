/**
 * Enhanced Voice Service - Strategic Implementation for AI Agent Voices
 * Implements agent-specific voice characteristics and advanced voice interaction
 * Features personality-based speech synthesis and intelligent voice recognition
 */

import { Locale, voiceLanguageMappings } from '@/i18n/config';

export interface VoiceConfig {
  language: string;
  voiceSpeed: number;
  voicePitch: number;
  recognitionLanguage: string;
  continuousRecognition: boolean;
  interimResults: boolean;
  emotionalRange: 'calm' | 'expressive' | 'dynamic';
  personality: 'maya' | 'alex' | 'sam';
  locale?: Locale; // Add locale support
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  alternatives: string[];
  intent?: string; // New: Detected user intent
  agent_preference?: 'maya' | 'alex' | 'sam'; // New: Which agent should respond
}

export interface AgentVoiceProfile {
  name: string;
  voiceName: string;
  pitch: number;
  speed: number;
  volume: number;
  emotionalModulation: {
    excitement: number;
    empathy: number;
    confidence: number;
    enthusiasm: number;
  };
  speechPatterns: {
    pauseLength: number;
    emphasisWords: string[];
    tonalVariation: number;
  };
  catchphraseDelivery: {
    emphasis: number;
    timing: number;
    emotional_impact: number;
  };
}

export interface VoiceGrammar {
  commands: string[];
  weights: Record<string, number>;
  agent_triggers: Record<string, 'maya' | 'alex' | 'sam'>; // New: Agent-specific commands
}

export class EnhancedVoiceService {
  private recognition: unknown = null;
  private synthesis: SpeechSynthesis | null;
  private config: VoiceConfig;
  private isRecording = false;
  private voices: SpeechSynthesisVoice[] = [];
  private agentVoiceProfiles: Map<string, AgentVoiceProfile> = new Map();
  private currentAgent: 'maya' | 'alex' | 'sam' = 'maya';
  private onResultCallback?: (result: VoiceRecognitionResult) => void;
  private onErrorCallback?: (error: string) => void;
  private onStartCallback?: () => void;
  private onEndCallback?: () => void;
  private onAgentSwitchCallback?: (agent: 'maya' | 'alex' | 'sam') => void;

  constructor(config: Partial<VoiceConfig> = {}) {
    this.config = {
      language: 'en-US',
      voiceSpeed: 1.0,
      voicePitch: 1.0,
      recognitionLanguage: 'en-US',
      continuousRecognition: true,
      interimResults: true,
      emotionalRange: 'expressive',
      personality: 'maya',
      ...config
    };

    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.initializeAgentVoiceProfiles();
    this.initializeSpeechRecognition();
    this.loadVoices();
  }

  /**
   * Initialize Speech Recognition
   */
  private initializeSpeechRecognition(): void {
    if (typeof window === 'undefined') return;
    
    const windowAny = window as unknown as Record<string, unknown>;
    const SpeechRecognition = windowAny.SpeechRecognition || windowAny.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.recognition = new (SpeechRecognition as any)();
    
    if (this.recognition) {
      const recognition = this.recognition as {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        maxAlternatives: number;
        start: () => void;
        stop: () => void;
        onstart: (() => void) | null;
        onresult: ((event: { results: { length: number; [key: number]: { isFinal: boolean; [key: number]: { transcript: string; confidence: number } } } }) => void) | null;
        onerror: ((event: { error: string }) => void) | null;
        onend: (() => void) | null;
      };

      recognition.continuous = this.config.continuousRecognition;
      recognition.interimResults = this.config.interimResults;
      recognition.lang = this.config.recognitionLanguage;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        this.isRecording = true;
        console.log('Voice recognition started');
        this.onStartCallback?.();
      };

      recognition.onresult = (event) => {
        const results = event.results;
        const lastResult = results[results.length - 1];
        
        if (lastResult) {
          const transcript = lastResult[0].transcript;
          const confidence = lastResult[0].confidence;
          const isFinal = lastResult.isFinal;
          
          const alternatives: string[] = [];
          // Note: SpeechRecognitionResult may have limited alternatives
          // For now, just use an empty array as alternatives
          try {
            // Try to access additional alternatives if they exist
            for (let i = 1; i < 3; i++) {
              if (lastResult[i] && lastResult[i].transcript) {
                alternatives.push(lastResult[i].transcript);
              }
            }
          } catch {
            // Ignore errors accessing alternatives
          }

          const result: VoiceRecognitionResult = {
            transcript,
            confidence,
            isFinal,
            alternatives
          };

          this.onResultCallback?.(result);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        this.isRecording = false;
        this.onErrorCallback?.(event.error);
      };

      recognition.onend = () => {
        this.isRecording = false;
        console.log('Voice recognition ended');
        this.onEndCallback?.();
      };
    }
  }

  /**
   * Load available voices
   */
  private loadVoices(): void {
    if (!this.synthesis) return;
    
    const loadVoicesWhenReady = () => {
      this.voices = this.synthesis!.getVoices();
      if (this.voices.length === 0) {
        setTimeout(loadVoicesWhenReady, 100);
      }
    };

    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoicesWhenReady;
    }
    loadVoicesWhenReady();
  }

  /**
   * Start voice recognition
   */
  startRecognition(
    onResult: (result: VoiceRecognitionResult) => void,
    onError?: (error: string) => void,
    onStart?: () => void,
    onEnd?: () => void
  ): boolean {
    if (!this.recognition) {
      onError?.('Speech recognition not available');
      return false;
    }

    if (this.isRecording) {
      console.warn('Recognition already in progress');
      return false;
    }

    this.onResultCallback = onResult;
    this.onErrorCallback = onError;
    this.onStartCallback = onStart;
    this.onEndCallback = onEnd;

    try {
      (this.recognition as { start: () => void }).start();
      return true;
    } catch (error) {
      console.error('Failed to start recognition:', error);
      onError?.('Failed to start voice recognition');
      return false;
    }
  }

  /**
   * Stop voice recognition
   */
  stopRecognition(): void {
    if (this.recognition && this.isRecording) {
      (this.recognition as { stop: () => void }).stop();
    }
  }

  /**
   * Speak text using text-to-speech
   */
  speak(
    text: string, 
    options: {
      voiceName?: string;
      rate?: number;
      pitch?: number;
      volume?: number;
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (error: string) => void;
    } = {}
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        const error = 'Text-to-speech not available';
        options.onError?.(error);
        reject(new Error(error));
        return;
      }

      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      const voice = this.getVoiceByName(options.voiceName) || this.getBestVoice();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.rate = options.rate ?? this.config.voiceSpeed;
      utterance.pitch = options.pitch ?? this.config.voicePitch;
      utterance.volume = options.volume ?? 1.0;
      utterance.lang = this.config.language;

      utterance.onstart = () => {
        console.log('Speech started');
        options.onStart?.();
      };

      utterance.onend = () => {
        console.log('Speech ended');
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        const error = `Speech error: ${event.error}`;
        console.error(error);
        options.onError?.(error);
        reject(new Error(error));
      };

      this.synthesis.speak(utterance);
    });
  }

  /**
   * Get voice by name
   */
  private getVoiceByName(voiceName?: string): SpeechSynthesisVoice | null {
    if (!voiceName) return null;
    return this.voices.find(voice => 
      voice.name.toLowerCase().includes(voiceName.toLowerCase())
    ) || null;
  }

  /**
   * Get the best available voice for the current language
   */
  private getBestVoice(): SpeechSynthesisVoice | null {
    const localVoices = this.voices.filter(voice => voice.localService);
    const languageVoices = localVoices.filter(voice => 
      voice.lang.startsWith(this.config.language.substring(0, 2))
    );

    if (languageVoices.length > 0) {
      const femaleVoice = languageVoices.find(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('woman') ||
        voice.name.toLowerCase().includes('samantha') ||
        voice.name.toLowerCase().includes('karen')
      );
      return femaleVoice || languageVoices[0];
    }

    return this.voices[0] || null;
  }

  /**
   * Get available voices
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.voices;
  }

  /**
   * Check if voice recognition is supported
   */
  isRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  /**
   * Check if text-to-speech is supported
   */
  isSpeechSupported(): boolean {
    return !!this.synthesis;
  }

  /**
   * Check if currently recording
   */
  isCurrentlyRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (this.recognition) {
      const recognition = this.recognition as {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
      };
      recognition.lang = this.config.recognitionLanguage;
      recognition.continuous = this.config.continuousRecognition;
      recognition.interimResults = this.config.interimResults;
    }
  }

  /**
   * Update configuration based on locale
   */
  updateLocale(locale: Locale): void {
    const voiceLanguage = voiceLanguageMappings[locale] || voiceLanguageMappings.en;
    
    this.updateConfig({
      locale,
      language: voiceLanguage,
      recognitionLanguage: voiceLanguage
    });

    // Update speech recognition language if active
    if (this.recognition) {
      const recognition = this.recognition as { lang: string };
      recognition.lang = voiceLanguage;
    }

    console.log(`Voice service updated to locale: ${locale} (${voiceLanguage})`);
  }

  /**
   * Enable/disable continuous recognition
   */
  setContinuousRecognition(enabled: boolean): void {
    this.config.continuousRecognition = enabled;
    if (this.recognition) {
      (this.recognition as { continuous: boolean }).continuous = enabled;
    }
  }

  /**
   * Set recognition language
   */
  setRecognitionLanguage(language: string): void {
    this.config.recognitionLanguage = language;
    if (this.recognition) {
      (this.recognition as { lang: string }).lang = language;
    }
  }

  /**
   * Set speech language
   */
  setSpeechLanguage(language: string): void {
    this.config.language = language;
  }

  /**
   * Cancel any ongoing speech
   */
  cancelSpeech(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Pause speech
   */
  pauseSpeech(): void {
    if (this.synthesis) {
      this.synthesis.pause();
    }
  }

  /**
   * Resume speech
   */
  resumeSpeech(): void {
    if (this.synthesis) {
      this.synthesis.resume();
    }
  }

  /**
   * Check if speech is currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }

  /**
   * Process voice commands with grammar matching
   */
  processVoiceCommand(
    transcript: string, 
    grammar: VoiceGrammar
  ): { command: string; confidence: number } | null {
    const lowerTranscript = transcript.toLowerCase().trim();
    
    let bestMatch: { command: string; confidence: number } | null = null;
    let bestScore = 0;

    for (const command of grammar.commands) {
      const lowerCommand = command.toLowerCase();
      const weight = grammar.weights[command] || 1.0;
      
      if (lowerTranscript === lowerCommand) {
        return { command, confidence: 1.0 * weight };
      }
      
      if (lowerTranscript.includes(lowerCommand)) {
        const score = 0.8 * weight;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = { command, confidence: score };
        }
      }
      
      const words = lowerCommand.split(' ');
      const matchedWords = words.filter(word => lowerTranscript.includes(word));
      if (matchedWords.length > 0) {
        const score = (matchedWords.length / words.length) * 0.6 * weight;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = { command, confidence: score };
        }
      }
    }

    return bestMatch && bestMatch.confidence > 0.3 ? bestMatch : null;
  }

  /**
   * Strategic Implementation: Initialize Agent-Specific Voice Profiles
   * Maya: Enthusiastic, energetic voice for sales
   * Alex: Professional, confident voice for risk assessment
   * Sam: Warm, empathetic voice for customer care
   */
  private initializeAgentVoiceProfiles(): void {
    // Maya - Enthusiastic Sales Specialist
    this.agentVoiceProfiles.set('maya', {
      name: 'Maya',
      voiceName: 'Microsoft Zira - English (United States)', // Fallback to available voice
      pitch: 1.2, // Higher pitch for enthusiasm
      speed: 1.1, // Slightly faster for energy
      volume: 1.0,
      emotionalModulation: {
        excitement: 0.9, // High excitement
        empathy: 0.8,
        confidence: 0.9,
        enthusiasm: 1.0 // Maximum enthusiasm
      },
      speechPatterns: {
        pauseLength: 80, // Shorter pauses for energy
        emphasisWords: ['perfect', 'amazing', 'fantastic', 'incredible', 'wonderful'],
        tonalVariation: 0.8 // High tonal variation for expressiveness
      },
      catchphraseDelivery: {
        emphasis: 1.3, // Strong emphasis on catchphrases
        timing: 0.9, // Slightly faster delivery
        emotional_impact: 1.2 // High emotional impact
      }
    });

    // Alex - Professional Risk Assessment Specialist
    this.agentVoiceProfiles.set('alex', {
      name: 'Alex',
      voiceName: 'Microsoft David - English (United States)',
      pitch: 0.9, // Lower pitch for authority
      speed: 0.95, // Slightly slower for clarity
      volume: 1.0,
      emotionalModulation: {
        excitement: 0.6, // Moderate excitement
        empathy: 0.7,
        confidence: 1.0, // Maximum confidence
        enthusiasm: 0.7
      },
      speechPatterns: {
        pauseLength: 120, // Longer pauses for emphasis
        emphasisWords: ['important', 'crucial', 'significant', 'essential', 'protect'],
        tonalVariation: 0.5 // Moderate tonal variation for professionalism
      },
      catchphraseDelivery: {
        emphasis: 1.1, // Moderate emphasis
        timing: 1.0, // Standard timing
        emotional_impact: 1.0 // Standard emotional impact
      }
    });

    // Sam - Empathetic Customer Care Specialist
    this.agentVoiceProfiles.set('sam', {
      name: 'Sam',
      voiceName: 'Microsoft Hazel - English (Great Britain)',
      pitch: 1.0, // Neutral pitch
      speed: 0.9, // Slower for compassion
      volume: 0.9, // Slightly softer volume
      emotionalModulation: {
        excitement: 0.6,
        empathy: 1.0, // Maximum empathy
        confidence: 0.8,
        enthusiasm: 0.7
      },
      speechPatterns: {
        pauseLength: 150, // Longer pauses for comfort
        emphasisWords: ['understand', 'help', 'support', 'together', 'care'],
        tonalVariation: 0.6 // Moderate variation for warmth
      },
      catchphraseDelivery: {
        emphasis: 1.0, // Natural emphasis
        timing: 1.1, // Slightly slower for comfort
        emotional_impact: 1.1 // High emotional support
      }
    });
  }

  /**
   * Strategic Implementation: Agent-Aware Speech Synthesis
   * Applies agent-specific voice characteristics to text-to-speech
   */
  async speakAsAgent(text: string, agent: 'maya' | 'alex' | 'sam' = this.currentAgent): Promise<void> {
    const profile = this.agentVoiceProfiles.get(agent);
    if (!profile) {
      console.error(`Voice profile not found for agent: ${agent}`);
      return this.speak(text);
    }

    // Check for catchphrases and apply special delivery
    const isCatchphrase = this.detectCatchphrase(text, agent);
    
    // Create speech synthesis utterance with agent-specific settings
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find the best available voice for this agent
    const voice = this.findBestVoiceForAgent(agent);
    if (voice) {
      utterance.voice = voice;
    }
    
    // Apply agent-specific voice characteristics
    utterance.pitch = profile.pitch * this.config.voicePitch;
    utterance.rate = profile.speed * this.config.voiceSpeed;
    utterance.volume = profile.volume;
    
    // Apply emotional modulation based on text content
    const emotionalContext = this.analyzeEmotionalContext(text);
    utterance.pitch *= this.calculateEmotionalPitchModifier(profile, emotionalContext);
    utterance.rate *= this.calculateEmotionalSpeedModifier(profile, emotionalContext);
    
    // Apply special delivery for catchphrases
    if (isCatchphrase) {
      utterance.pitch *= profile.catchphraseDelivery.emphasis;
      utterance.rate *= profile.catchphraseDelivery.timing;
      // Add pause before and after catchphrase for impact
      const enhancedText = `... ${text} ...`;
      utterance.text = enhancedText;
    }
    
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not available'));
        return;
      }
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      this.synthesis.speak(utterance);
    });
  }

  /**
   * Strategic Implementation: Intelligent Agent Selection from Voice Input
   * Analyzes voice input to determine which agent should respond
   */
  private analyzeAgentPreference(transcript: string): 'maya' | 'alex' | 'sam' {
    const lowerTranscript = transcript.toLowerCase();
    
    // Maya triggers (sales, quotes, shopping)
    const mayaTriggers = [
      'quote', 'price', 'cost', 'cheap', 'deal', 'save', 'money', 'compare',
      'shopping', 'buy', 'purchase', 'affordable', 'discount', 'bundle'
    ];
    
    // Alex triggers (risk, coverage, technical)
    const alexTriggers = [
      'risk', 'coverage', 'protect', 'assess', 'underwriting', 'approve',
      'decline', 'policy', 'terms', 'conditions', 'technical', 'analysis'
    ];
    
    // Sam triggers (claims, help, support)
    const samTriggers = [
      'claim', 'accident', 'damage', 'help', 'support', 'problem', 'issue',
      'file', 'report', 'trouble', 'emergency', 'assistance', 'care'
    ];
    
    // Count trigger words for each agent
    const mayaScore = mayaTriggers.filter(trigger => lowerTranscript.includes(trigger)).length;
    const alexScore = alexTriggers.filter(trigger => lowerTranscript.includes(trigger)).length;
    const samScore = samTriggers.filter(trigger => lowerTranscript.includes(trigger)).length;
    
    // Return agent with highest score, default to Maya
    if (samScore > mayaScore && samScore > alexScore) return 'sam';
    if (alexScore > mayaScore && alexScore > samScore) return 'alex';
    return 'maya';
  }

  /**
   * Set the current agent for voice interactions
   */
  setCurrentAgent(agent: 'maya' | 'alex' | 'sam'): void {
    this.currentAgent = agent;
    this.config.personality = agent;
  }

  /**
   * Get the current agent
   */
  getCurrentAgent(): 'maya' | 'alex' | 'sam' {
    return this.currentAgent;
  }

  // Private helper methods for voice personality implementation
  private detectCatchphrase(text: string, agent: 'maya' | 'alex' | 'sam'): boolean {
    const catchphrases = {
      maya: ['perfect match', 'amazing deals', 'work my insurance magic'],
      alex: ['every detail matters', 'protect', 'systematic'],
      sam: ['make this easy', 'here to help', 'together']
    };
    
    const agentCatchphrases = catchphrases[agent];
    return agentCatchphrases.some(phrase => 
      text.toLowerCase().includes(phrase.toLowerCase())
    );
  }

  private findBestVoiceForAgent(agent: 'maya' | 'alex' | 'sam'): SpeechSynthesisVoice | null {
    const profile = this.agentVoiceProfiles.get(agent);
    if (!profile) return null;
    
    // First try to find the preferred voice
    let voice = this.voices.find(v => v.name === profile.voiceName);
    
    // Fallback to gender and language appropriate voices
    if (!voice) {
      const fallbacks = {
        maya: (v: SpeechSynthesisVoice) => v.name.includes('female') || v.name.includes('Zira') || v.name.includes('Jessa'),
        alex: (v: SpeechSynthesisVoice) => v.name.includes('male') || v.name.includes('David') || v.name.includes('Mark'),
        sam: (v: SpeechSynthesisVoice) => v.name.includes('female') || v.name.includes('Hazel') || v.name.includes('Susan')
      };
      
      voice = this.voices.find(v => v.lang.startsWith('en') && fallbacks[agent](v)) || undefined;
    }
    
    return voice || null;
  }

  private analyzeEmotionalContext(text: string): { excitement: number; empathy: number; confidence: number } {
    const lowerText = text.toLowerCase();
    
    // Excitement indicators
    const excitementWords = ['amazing', 'fantastic', 'wonderful', 'incredible', 'perfect', '!'];
    const excitement = excitementWords.filter(word => lowerText.includes(word)).length / excitementWords.length;
    
    // Empathy indicators
    const empathyWords = ['understand', 'sorry', 'help', 'support', 'care', 'feel'];
    const empathy = empathyWords.filter(word => lowerText.includes(word)).length / empathyWords.length;
    
    // Confidence indicators
    const confidenceWords = ['certainly', 'definitely', 'absolutely', 'guarantee', 'ensure'];
    const confidence = confidenceWords.filter(word => lowerText.includes(word)).length / confidenceWords.length;
    
    return { excitement, empathy, confidence };
  }

  private calculateEmotionalPitchModifier(profile: AgentVoiceProfile, context: { excitement: number; empathy: number; confidence: number }): number {
    let modifier = 1.0;
    modifier += context.excitement * profile.emotionalModulation.excitement * 0.1;
    modifier += context.empathy * profile.emotionalModulation.empathy * 0.05;
    modifier += context.confidence * profile.emotionalModulation.confidence * 0.05;
    return Math.max(0.8, Math.min(1.3, modifier)); // Clamp between 0.8 and 1.3
  }

  private calculateEmotionalSpeedModifier(profile: AgentVoiceProfile, context: { excitement: number; empathy: number; confidence: number }): number {
    let modifier = 1.0;
    modifier += context.excitement * profile.emotionalModulation.excitement * 0.1;
    modifier -= context.empathy * profile.emotionalModulation.empathy * 0.05; // Slower for empathy
    return Math.max(0.7, Math.min(1.4, modifier)); // Clamp between 0.7 and 1.4
  }
}

// Export singleton instance
export const voiceService = new EnhancedVoiceService();
