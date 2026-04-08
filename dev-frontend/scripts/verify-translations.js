#!/usr/bin/env node

/**
 * i18n Translation Verification Script
 *
 * Checks:
 * 1. Key sync — all languages have the same keys as English (source)
 * 2. Empty values — no blank translations
 * 3. Interpolation match — {{variables}} are consistent across languages
 * 4. Glossary compliance — translations match the official glossary
 * 5. Duplicate values — same translation text for different keys (info only)
 *
 * Exit code 1 if errors found, 0 if only warnings/info.
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'public', 'locales');
const LANGUAGES = ['en', 'ko', 'zh', 'ms'];
const SOURCE_LANG = 'en';

let errors = 0;
let warnings = 0;
let infos = 0;

function log(level, msg) {
  const prefix = { ERROR: '\x1b[31m[ERROR]\x1b[0m', WARN: '\x1b[33m[WARN]\x1b[0m', INFO: '\x1b[36m[INFO]\x1b[0m', PASS: '\x1b[32m[PASS]\x1b[0m' };
  console.log(`${prefix[level] || ''} ${msg}`);
  if (level === 'ERROR') errors++;
  if (level === 'WARN') warnings++;
  if (level === 'INFO') infos++;
}

// Flatten nested JSON to dot-notation keys
function flattenObj(obj, prefix = '') {
  const result = {};
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      Object.assign(result, flattenObj(val, fullKey));
    } else {
      result[fullKey] = val;
    }
  }
  return result;
}

// Extract {{interpolation}} variables from a string
function extractInterpolations(str) {
  if (typeof str !== 'string') return [];
  const matches = str.match(/\{\{(\w+)\}\}/g) || [];
  return matches.sort();
}

// Load all translation files
function loadTranslations() {
  const translations = {};
  for (const lang of LANGUAGES) {
    translations[lang] = {};
    const langDir = path.join(LOCALES_DIR, lang);
    if (!fs.existsSync(langDir)) {
      log('ERROR', `Language directory not found: ${langDir}`);
      continue;
    }
    const files = fs.readdirSync(langDir).filter(f => f.endsWith('.json'));
    for (const file of files) {
      const ns = file.replace('.json', '');
      try {
        const content = JSON.parse(fs.readFileSync(path.join(langDir, file), 'utf8'));
        translations[lang][ns] = flattenObj(content);
      } catch (e) {
        log('ERROR', `Failed to parse ${lang}/${file}: ${e.message}`);
      }
    }
  }
  return translations;
}

// Load glossary
function loadGlossary() {
  const glossaryPath = path.join(LOCALES_DIR, 'glossary.json');
  if (!fs.existsSync(glossaryPath)) {
    log('WARN', 'glossary.json not found — skipping glossary check');
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
  } catch (e) {
    log('ERROR', `Failed to parse glossary.json: ${e.message}`);
    return null;
  }
}

console.log('\n=== i18n Verification Report ===\n');

const translations = loadTranslations();
const glossary = loadGlossary();

// 1. Key Sync Check
console.log('--- 1. Key Sync ---');
let totalKeys = 0;
for (const ns of Object.keys(translations[SOURCE_LANG])) {
  const sourceKeys = Object.keys(translations[SOURCE_LANG][ns]);
  if (sourceKeys.length === 0) continue;
  totalKeys += sourceKeys.length;

  for (const lang of LANGUAGES.filter(l => l !== SOURCE_LANG)) {
    const langKeys = translations[lang][ns] ? Object.keys(translations[lang][ns]) : [];
    const missing = sourceKeys.filter(k => !langKeys.includes(k));
    const extra = langKeys.filter(k => !sourceKeys.includes(k));

    if (missing.length > 0) {
      log('ERROR', `${lang}/${ns}.json — missing ${missing.length} keys: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`);
    }
    if (extra.length > 0) {
      log('WARN', `${lang}/${ns}.json — ${extra.length} extra keys not in source: ${extra.slice(0, 3).join(', ')}`);
    }
  }
}
if (errors === 0) {
  log('PASS', `Key sync: ${LANGUAGES.length} languages, ${totalKeys} keys each`);
}

// 2. Empty Values Check
console.log('\n--- 2. Empty Values ---');
let emptyCount = 0;
for (const lang of LANGUAGES) {
  for (const ns of Object.keys(translations[lang])) {
    for (const [key, val] of Object.entries(translations[lang][ns])) {
      if (typeof val === 'string' && val.trim() === '') {
        log('ERROR', `${lang}/${ns}.json → "${key}" is empty`);
        emptyCount++;
      }
    }
  }
}
if (emptyCount === 0) {
  log('PASS', 'No empty values found');
}

// 3. Interpolation Match
console.log('\n--- 3. Interpolation Variables ---');
let interpErrors = 0;
for (const ns of Object.keys(translations[SOURCE_LANG])) {
  for (const key of Object.keys(translations[SOURCE_LANG][ns])) {
    const sourceVars = extractInterpolations(translations[SOURCE_LANG][ns][key]);
    if (sourceVars.length === 0) continue;

    for (const lang of LANGUAGES.filter(l => l !== SOURCE_LANG)) {
      if (!translations[lang][ns] || !translations[lang][ns][key]) continue;
      const langVars = extractInterpolations(translations[lang][ns][key]);
      if (JSON.stringify(sourceVars) !== JSON.stringify(langVars)) {
        log('ERROR', `${lang}/${ns}.json → "${key}" interpolation mismatch: en=${sourceVars.join(',')} vs ${lang}=${langVars.join(',')}`);
        interpErrors++;
      }
    }
  }
}
if (interpErrors === 0) {
  log('PASS', 'Interpolation variables match across all languages');
}

// 4. Glossary Compliance
if (glossary && glossary.terms) {
  console.log('\n--- 4. Glossary Compliance ---');
  let glossaryViolations = 0;

  for (const [term, translations_map] of Object.entries(glossary.terms)) {
    for (const lang of LANGUAGES.filter(l => l !== SOURCE_LANG)) {
      const expected = translations_map[lang];
      if (!expected) continue;

      // Check all translation values for this language
      for (const ns of Object.keys(translations[lang])) {
        for (const [key, val] of Object.entries(translations[lang][ns])) {
          if (typeof val !== 'string') continue;
          // Only check exact single-word matches (value is exactly the term translation)
          // Skip if the value is part of a longer phrase
          if (val === term && val !== expected) {
            log('WARN', `${lang}/${ns}.json → "${key}": "${val}" should be "${expected}" (glossary: ${term})`);
            glossaryViolations++;
          }
        }
      }
    }
  }
  if (glossaryViolations === 0) {
    log('PASS', `Glossary compliance: ${Object.keys(glossary.terms).length} terms verified`);
  }
}

// 5. Duplicate Values (info only)
console.log('\n--- 5. Duplicate Values ---');
let dupeCount = 0;
for (const lang of LANGUAGES) {
  const valueMap = {};
  for (const ns of Object.keys(translations[lang])) {
    for (const [key, val] of Object.entries(translations[lang][ns])) {
      if (typeof val !== 'string' || val.length < 3) continue;
      const fullKey = `${ns}.${key}`;
      if (valueMap[val]) {
        // Only report if in the same namespace
        if (valueMap[val].startsWith(ns + '.')) {
          dupeCount++;
          if (dupeCount <= 5) {
            log('INFO', `${lang}: "${valueMap[val]}" and "${fullKey}" both = "${val}"`);
          }
        }
      } else {
        valueMap[val] = fullKey;
      }
    }
  }
}
if (dupeCount > 5) {
  log('INFO', `... and ${dupeCount - 5} more duplicates`);
}
if (dupeCount === 0) {
  log('PASS', 'No duplicate values within namespaces');
}

// Summary
console.log('\n=== Summary ===');
console.log(`Errors: ${errors}, Warnings: ${warnings}, Info: ${infos}`);
if (errors > 0) {
  console.log('\x1b[31m❌ Verification FAILED\x1b[0m');
  process.exit(1);
} else {
  console.log('\x1b[32m✅ Verification passed\x1b[0m');
  process.exit(0);
}
