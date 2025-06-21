/**
 * Internationalization Configuration
 * Supports multiple languages for global insurance market expansion
 */

export const locales = ['en', 'es', 'fr', 'de', 'pt', 'zh', 'ja'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français', 
  de: 'Deutsch',
  pt: 'Português',
  zh: '中文',
  ja: '日本語'
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸', 
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇧🇷',
  zh: '🇨🇳',
  ja: '🇯🇵'
};

// Voice language mappings for speech synthesis
export const voiceLanguageMappings: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR', 
  de: 'de-DE',
  pt: 'pt-BR',
  zh: 'zh-CN',
  ja: 'ja-JP'
};

// Currency mappings for pricing display
export const currencyMappings: Record<Locale, { code: string; symbol: string }> = {
  en: { code: 'USD', symbol: '$' },
  es: { code: 'EUR', symbol: '€' },
  fr: { code: 'EUR', symbol: '€' },
  de: { code: 'EUR', symbol: '€' },
  pt: { code: 'BRL', symbol: 'R$' },
  zh: { code: 'CNY', symbol: '¥' },
  ja: { code: 'JPY', symbol: '¥' }
};
