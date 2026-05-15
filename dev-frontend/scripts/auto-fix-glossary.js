#!/usr/bin/env node
/**
 * Auto-fix glossary mismatches reported by `npm run i18n:verify`.
 *
 * Walks every locale JSON in public/locales/{ko,zh,ms} and replaces values that
 * are exactly the English source term with the canonical translation from
 * glossary.json. Only exact-match leaf values are touched — never partial
 * substring (would corrupt sentences). Dry-run by default; pass --apply to write.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = path.join(ROOT, 'public/locales');
const GLOSSARY = JSON.parse(fs.readFileSync(path.join(LOCALES, 'glossary.json'), 'utf8'));
const TERMS = GLOSSARY.terms;
const APPLY = process.argv.includes('--apply');

const langs = ['ko', 'zh', 'ms'];
let totalFixed = 0;

for (const lang of langs) {
  const dir = path.join(LOCALES, lang);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  for (const file of files) {
    const fp = path.join(dir, file);
    const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
    let fixed = 0;
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value !== 'string') continue;
      const trimmed = value.trim();
      // Exact-match: value === English term, replace with canonical translation
      if (TERMS[trimmed] && TERMS[trimmed][lang] && TERMS[trimmed][lang] !== trimmed) {
        const next = TERMS[trimmed][lang];
        console.log(`  ${lang}/${file} → ${key}: "${value}" → "${next}"`);
        obj[key] = next;
        fixed++;
      }
    }
    if (fixed > 0) {
      totalFixed += fixed;
      if (APPLY) {
        fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + '\n', 'utf8');
      }
    }
  }
}

console.log(`\n${APPLY ? 'Applied' : 'Would fix'} ${totalFixed} glossary mismatches.`);
if (!APPLY) console.log('Re-run with --apply to write.');
