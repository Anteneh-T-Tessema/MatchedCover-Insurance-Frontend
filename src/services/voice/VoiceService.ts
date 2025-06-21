/**
 * Open-Source Voice Service - Speech Recognition and Text-to-Speech
 * Uses Web Speech API and open-source alternatives for voice interaction
 */

/**
 * Basic speech recognition interface for type safety
 */
interface BasicSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

export interface VoiceConfig {
  language: string;
  voiceSpeed: number;
  voicePitch: number;
  recognitionLanguage: string;
  continuousRecognition: boolean;
  interimResults: boolean;
}

export interface VoiceRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
  alternatives: string[];
}

export interface VoiceGrammar {
  commands: string[];
  weights: Record<string, number>;
}

export class VoiceService {
  private recognition: BasicSpeechRecognition | null = null;
  private synthesis: SpeechSynthesis | null;
  private config: VoiceConfig;
  private isRecording = false;
  private voices: SpeechSynthesisVoice[] = [];
  private onResultCallback?: (result: VoiceRecognitionResult) => void;
  private onErrorCallback?: (error: string) => void;
  private onStartCallback?: () => void;
  private onEndCallback?: () => void;

  constructor(config: Partial<VoiceConfig> = {}) {
    this.config = {
      language: 'en-US',
      voiceSpeed: 1.0,
      voicePitch: 1.0,
      recognitionLanguage: 'en-US',
      continuousRecognition: true,
      interimResults: true,
      ...config
    };

    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.initializeSpeechRecognition();
    this.loadVoices();
  }

  /**
   * Initialize Speech Recognition
   */
  private initializeSpeechRecognition(): void {
    if (typeof window === 'undefined') return;
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    // Use webkit prefix for Chrome or standard for other browsers
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: new () => BasicSpeechRecognition, webkitSpeechRecognition?: new () => BasicSpeechRecognition }).SpeechRecognition || 
                               (window as unknown as { webkitSpeechRecognition?: new () => BasicSpeechRecognition }).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition() as BasicSpeechRecognition;

      if (this.recognition) {
        this.recognition.continuous = this.config.continuousRecognition;
        this.recognition.interimResults = this.config.interimResults;
        this.recognition.lang = this.config.recognitionLanguage;
        this.recognition.maxAlternatives = 3;

        this.recognition.onstart = () => {
          this.isRecording = true;
          console.log('Voice recognition started');
          this.onStartCallback?.();
        };

        this.recognition.onresult = (event) => {
          const results = (event as { results: unknown[] }).results;
          const lastResult = results[results.length - 1] as { 
            0: { transcript: string; confidence: number }; 
            isFinal: boolean;
            length: number;
          };
          
          if (lastResult) {
            const transcript = lastResult[0].transcript;
            const confidence = lastResult[0].confidence;
            const isFinal = lastResult.isFinal;
            
            const alternatives = Array.from({ length: Math.min(lastResult.length - 1, 2) })
              .map((_, i) => (lastResult as unknown as Array<{ transcript: string }>)[i + 1]?.transcript)
              .filter(Boolean);

            const result: VoiceRecognitionResult = {
              transcript,
              confidence,
              isFinal,
              alternatives
            };

            this.onResultCallback?.(result);
          }
        };

        this.recognition.onerror = (event) => {
          const error = (event as { error: string }).error;
          console.error('Speech recognition error:', error);
          this.isRecording = false;
          this.onErrorCallback?.(error);
        };

        this.recognition.onend = () => {
          this.isRecording = false;
          console.log('Voice recognition ended');
          this.onEndCallback?.();
        };
      }
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
        // Voices might not be loaded yet, try again
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
      this.recognition.start();
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
      this.recognition.stop();
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

      // Cancel any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Configure voice
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
    // Prefer local voices over remote ones
    const localVoices = this.voices.filter(voice => voice.localService);
    const languageVoices = localVoices.filter(voice => 
      voice.lang.startsWith(this.config.language.substring(0, 2))
    );

    if (languageVoices.length > 0) {
      // Prefer female voices for friendlier tone
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
      this.recognition.lang = this.config.recognitionLanguage;
      this.recognition.continuous = this.config.continuousRecognition;
      this.recognition.interimResults = this.config.interimResults;
    }
  }

  /**
   * Enable/disable continuous recognition
   */
  setContinuousRecognition(enabled: boolean): void {
    this.config.continuousRecognition = enabled;
    if (this.recognition) {
      this.recognition.continuous = enabled;
    }
  }

  /**
   * Set recognition language
   */
  setRecognitionLanguage(language: string): void {
    this.config.recognitionLanguage = language;
    if (this.recognition) {
      this.recognition.lang = language;
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
      
      // Exact match
      if (lowerTranscript === lowerCommand) {
        return { command, confidence: 1.0 * weight };
      }
      
      // Contains match
      if (lowerTranscript.includes(lowerCommand)) {
        const score = 0.8 * weight;
        if (score > bestScore) {
          bestScore = score;
          bestMatch = { command, confidence: score };
        }
      }
      
      // Partial word match
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
}

// Export singleton instance
export const voiceService = new VoiceService();
