/**
 * Backend i18n utility for email templates
 * Loads translation files from /locales/{lang}/email.json
 */

const fs = require('fs');
const path = require('path');

const SUPPORTED_LANGUAGES = ['en', 'ko', 'zh', 'ms'];
const FALLBACK_LANG = 'en';

// Cache loaded translations
const cache = {};

/**
 * Load email translations for a language
 */
function loadTranslations(lang) {
  if (cache[lang]) return cache[lang];

  const safeLang = SUPPORTED_LANGUAGES.includes(lang) ? lang : FALLBACK_LANG;
  const filePath = path.join(__dirname, '..', 'locales', safeLang, 'email.json');

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    cache[safeLang] = JSON.parse(content);
    return cache[safeLang];
  } catch (e) {
    // Fallback to English
    if (safeLang !== FALLBACK_LANG) {
      return loadTranslations(FALLBACK_LANG);
    }
    console.error('[i18n] Failed to load translations:', e.message);
    return {};
  }
}

/**
 * Get translated email text
 * @param {string} lang - Language code (en, ko, zh, ms)
 * @param {string} key - Dot-notation key (e.g., 'notice.subject')
 * @param {Object} params - Interpolation parameters (e.g., { title: 'My Notice' })
 * @returns {string} Translated text with interpolated values
 */
function getEmailText(lang, key, params = {}) {
  const translations = loadTranslations(lang || FALLBACK_LANG);

  // Navigate nested keys
  const keys = key.split('.');
  let value = translations;
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      value = undefined;
      break;
    }
  }

  // Fallback to English if key not found
  if (value === undefined && (lang || FALLBACK_LANG) !== FALLBACK_LANG) {
    return getEmailText(FALLBACK_LANG, key, params);
  }

  if (typeof value !== 'string') {
    return key; // Return key itself as last resort
  }

  // Interpolate {{variable}} patterns
  return value.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
    return params[varName] !== undefined ? params[varName] : `{{${varName}}}`;
  });
}

/**
 * Clear translation cache (for hot-reload in development)
 */
function clearCache() {
  Object.keys(cache).forEach(k => delete cache[k]);
}

module.exports = { getEmailText, clearCache, SUPPORTED_LANGUAGES };
