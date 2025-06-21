/**
 * Internationalization Provider and Hooks
 * Provides translation functionality throughout the app
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, defaultLocale, locales } from './config';
import { Messages } from './messages';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  messages: Messages;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);
  const [messages, setMessages] = useState<Messages | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load translations dynamically
  useEffect(() => {
    async function loadMessages() {
      setIsLoading(true);
      try {
        const messagesModule = await import(`./translations/${locale}.ts`);
        setMessages(messagesModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
        // Fallback to default locale
        if (locale !== defaultLocale) {
          const fallbackModule = await import(`./translations/${defaultLocale}.ts`);
          setMessages(fallbackModule.default);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMessages();
  }, [locale]);

  // Persist locale preference
  const setLocale = (newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      localStorage.setItem('preferred-locale', newLocale);
      
      // Update document language
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLocale;
      }
      
      // Trigger locale change event for other parts of the app
      window.dispatchEvent(new CustomEvent('localechange', { detail: { locale: newLocale } }));
    }
  };

  // Translation function with nested key support and parameter interpolation
  const t = (key: string, params?: Record<string, string | number>): string => {
    if (!messages) return key;

    // Support nested keys like 'navigation.home'
    const keys = key.split('.');
    let value: unknown = messages;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && value !== null && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${key}`);
      return key;
    }

    // Parameter interpolation
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  // Initialize locale from localStorage or browser preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferred-locale') as Locale;
      if (savedLocale && locales.includes(savedLocale)) {
        setLocaleState(savedLocale);
      } else {
        // Detect browser language
        const browserLang = navigator.language.slice(0, 2) as Locale;
        if (locales.includes(browserLang)) {
          setLocaleState(browserLang);
        }
      }
    }
  }, []);

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    messages: messages || ({} as Messages),
    isLoading
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

// Custom hook to use translations
export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

// Hook for just the translation function
export function useT() {
  const { t } = useTranslation();
  return t;
}

// Hook for locale management
export function useLocale() {
  const { locale, setLocale } = useTranslation();
  return { locale, setLocale };
}

// Utility function to get message by key
export function getMessage(messages: Messages, key: string): string {
  const keys = key.split('.');
  let value: unknown = messages;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}
