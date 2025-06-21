/**
 * Translation Messages Type Definition
 * Ensures type safety across all language files
 */

import en from './translations/en';

export type Messages = typeof en;

// Re-export all translations
export { default as en } from './translations/en';
export { default as es } from './translations/es'; 
export { default as fr } from './translations/fr';
