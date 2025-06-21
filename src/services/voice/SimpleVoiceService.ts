/**
 * Enhanced Voice Service - Simple Voice Integration
 * Handles basic TTS and STT with fallback capabilities
 */

export interface VoiceConfig {
  language: string;
  voiceSpeed: number;
  voicePitch: number;
  recognitionLanguage: string;
}

export interface VoiceResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export class SimpleVoiceService {
  private synthesis: SpeechSynthesis | null;
  private config: VoiceConfig;
  private isRecording = false;
  private voices: SpeechSynthesisVoice[] = [];

  constructor(config: Partial<VoiceConfig> = {}) {
    this.config = {
      language: 'en-US',
      voiceSpeed: 1.0,
      voicePitch: 1.0,
      recognitionLanguage: 'en-US',
      ...config
    };

    this.synthesis = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.loadVoices();
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
        options.onStart?.();
      };

      utterance.onend = () => {
        options.onEnd?.();
        resolve();
      };

      utterance.onerror = (event) => {
        const error = `Speech error: ${event.error}`;
        options.onError?.(error);
        reject(new Error(error));
      };

      this.synthesis.speak(utterance);
    });
  }

  /**
   * Basic speech recognition (placeholder - will be enhanced)
   */
  startRecognition(
    onResult: (result: VoiceResult) => void,
    onError?: (error: string) => void,
    onStart?: () => void,
    onEnd?: () => void
  ): boolean {
    // For now, return false - will be enhanced with actual recognition
    onError?.('Speech recognition implementation pending');
    return false;
  }

  /**
   * Stop voice recognition
   */
  stopRecognition(): void {
    this.isRecording = false;
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
        voice.name.toLowerCase().includes('samantha')
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
   * Cancel any ongoing speech
   */
  cancelSpeech(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  /**
   * Check if speech is currently speaking
   */
  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<VoiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Check if speech recognition is supported
   */
  isRecognitionSupported(): boolean {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  }
}

// Export singleton instance
export const simpleVoiceService = new SimpleVoiceService();
