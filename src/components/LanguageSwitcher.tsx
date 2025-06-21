/**
 * Language Switcher Component
 * Provides elegant language selection with flags and smooth transitions
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { useTranslation } from '@/i18n/provider';
import { locales, localeNames, localeFlags, Locale } from '@/i18n/config';

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export default function LanguageSwitcher({ className = '', compact = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
    
    // Analytics tracking for language changes
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', 'language_change', {
        event_category: 'internationalization',
        event_label: newLocale,
        value: 1
      });
    }
  };

  if (compact) {
    return (
      <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center w-10 h-10 text-gray-500 bg-white rounded-full border border-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label={t('navigation.changeLanguage') || 'Change Language'}
        >
          <span className="text-lg">{localeFlags[locale]}</span>
        </button>

        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
            <div className="py-1" role="menu">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={`${
                    locale === loc
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  } group flex items-center w-full px-4 py-2 text-sm transition-colors duration-150`}
                  role="menuitem"
                >
                  <span className="mr-3 text-lg">{localeFlags[loc]}</span>
                  <span className="flex-1 text-left">{localeNames[loc]}</span>
                  {locale === loc && (
                    <span className="ml-2">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        aria-label={t('navigation.changeLanguage') || 'Change Language'}
      >
        <GlobeAltIcon className="w-5 h-5 mr-2 text-gray-400" />
        <span className="mr-2 text-lg">{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <ChevronDownIcon className={`ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1" role="menu">
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
              {t('navigation.selectLanguage') || 'Select Language'}
            </div>
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`${
                  locale === loc
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } group flex items-center w-full px-4 py-3 text-sm transition-colors duration-150`}
                role="menuitem"
              >
                <span className="mr-3 text-lg">{localeFlags[loc]}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{localeNames[loc]}</div>
                  <div className="text-xs text-gray-500 capitalize">{loc}</div>
                </div>
                {locale === loc && (
                  <span className="ml-2">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
          
          {/* Global Expansion Message */}
          <div className="border-t border-gray-200 px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center text-xs text-blue-600">
              <GlobeAltIcon className="w-4 h-4 mr-2" />
              <span className="font-medium">
                {t('competitive.globalReach') || 'Global Multi-Language Support'}
              </span>
            </div>
            <p className="mt-1 text-xs text-blue-500">
              {t('navigation.globalMessage') || 'Insurance coverage available worldwide'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
