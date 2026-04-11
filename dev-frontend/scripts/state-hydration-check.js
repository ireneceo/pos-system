#!/usr/bin/env node
/**
 * State Hydration Safety Check
 *
 * Catches the class of bugs where:
 *   1. A new field is added to a useState shape
 *   2. The state has multiple hydration sources (DB load, localStorage,
 *      JSON.parse, etc.) and at least one source omits the new field
 *   3. The JSX accesses the field with `.length`, `.map`, `.filter`, etc.
 *      without a defensive default → runtime crash on legacy data
 *
 * What we check (against the previous commit, or staged changes):
 *   A) For each new state field added to a useState({...}) literal,
 *      ensure every setSetters/hydration call either:
 *      - includes the field explicitly, or
 *      - uses a functional update form `setX(prev => ({...prev, ...}))`
 *   B) For each new field, scan the file for unsafe accessors
 *      `field.length`, `field.map`, `field.filter`, `field.includes`,
 *      `field[`, `field.forEach`, `field.find`, `field.reduce`
 *      that are NOT prefixed with `(... || [])` / `?.` / `Array.isArray`.
 *
 * Exit code: 0 = clean, 1 = at least one warning.
 *
 * Usage:
 *   node scripts/state-hydration-check.js               # check working tree vs HEAD
 *   node scripts/state-hydration-check.js --staged      # check staged changes
 *   node scripts/state-hydration-check.js --range a..b  # check commit range
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const stagedOnly = args.includes('--staged');
const rangeIdx = args.indexOf('--range');
const range = rangeIdx >= 0 ? args[rangeIdx + 1] : null;

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { cwd: '/var/www', encoding: 'utf-8' });
  } catch (e) {
    return '';
  }
}

const diffCmd = stagedOnly
  ? 'diff --cached --unified=0'
  : range
    ? `diff ${range} --unified=0`
    : 'diff HEAD --unified=0';

const diff = git(diffCmd);
if (!diff.trim()) {
  console.log('No changes to check.');
  process.exit(0);
}

// Parse the diff to extract per-file added lines + new state fields
const fileChanges = {}; // path → { addedLines: [{lineNo, text}], newFields: Set<fieldName> }
let currentFile = null;
let currentLineNo = 0;

for (const line of diff.split('\n')) {
  const fileMatch = line.match(/^\+\+\+ b\/(.+)$/);
  if (fileMatch) {
    currentFile = fileMatch[1];
    if (!currentFile.match(/\.(tsx?|jsx?)$/)) {
      currentFile = null;
    } else if (!fileChanges[currentFile]) {
      fileChanges[currentFile] = { addedLines: [], newFields: new Set() };
    }
    continue;
  }
  if (!currentFile) continue;

  const hunkMatch = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
  if (hunkMatch) {
    currentLineNo = parseInt(hunkMatch[1], 10);
    continue;
  }

  if (line.startsWith('+') && !line.startsWith('+++')) {
    fileChanges[currentFile].addedLines.push({ lineNo: currentLineNo, text: line.slice(1) });
    currentLineNo++;
  } else if (!line.startsWith('-')) {
    currentLineNo++;
  }
}

// For each changed file, locate the owner of each new field by finding which
// useState({...}) declaration in the CURRENT source contains the field. We then
// only flag set calls to that specific setter.
//
// Returns: { file: { fieldName: { ownerStateName, ownerSetterName } } }
const newFieldsPerFile = {};
for (const [file, info] of Object.entries(fileChanges)) {
  const candidateFields = new Set();
  for (const { text } of info.addedLines) {
    const m = text.match(/^\s*(\w+):\s*(\[\]|''|""|null|true|false|0|\{\}|new |Array|Object)/);
    if (m && !text.includes('=>') && !text.includes('style:')) {
      candidateFields.add(m[1]);
    }
  }
  if (candidateFields.size === 0) continue;

  const fullPath = path.join('/var/www', file);
  if (!fs.existsSync(fullPath)) continue;
  const src = fs.readFileSync(fullPath, 'utf-8');

  // Find all `const [foo, setFoo] = useState({...})` declarations and capture
  // the owner state for each new field.
  const useStateRegex = /const\s*\[\s*(\w+)\s*,\s*(set\w+)\s*\]\s*=\s*useState\s*<?[^(]*\(\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g;
  const fields = {};
  let m;
  while ((m = useStateRegex.exec(src)) !== null) {
    const stateName = m[1];
    const setterName = m[2];
    const body = m[3];
    for (const fieldName of candidateFields) {
      if (new RegExp(`\\b${fieldName}\\s*:`).test(body)) {
        fields[fieldName] = { stateName, setterName };
      }
    }
  }
  if (Object.keys(fields).length > 0) newFieldsPerFile[file] = fields;
}

let warningCount = 0;
const warn = (file, line, msg) => {
  console.log(`  ⚠ ${file}${line ? `:${line}` : ''} — ${msg}`);
  warningCount++;
};

console.log('\n=== State Hydration Safety Check ===');

for (const [file, fields] of Object.entries(newFieldsPerFile)) {
  if (fields.size === 0) continue;

  const fullPath = path.join('/var/www', file);
  if (!fs.existsSync(fullPath)) continue;
  const src = fs.readFileSync(fullPath, 'utf-8');
  const lines = src.split('\n');

  console.log(`\n📄 ${file}`);
  for (const [field, { stateName, setterName }] of Object.entries(fields)) {
    console.log(`   "${field}" owner: ${stateName} (setter: ${setterName})`);
  }

  for (const [field, { stateName, setterName }] of Object.entries(fields)) {
    // (A) Hydration safety: find setX calls for THIS specific setter only
    const setRegex = new RegExp(`\\b${setterName}\\s*\\(\\s*\\{`, 'g');
    let m;
    while ((m = setRegex.exec(src)) !== null) {
      const lineNo = src.slice(0, m.index).split('\n').length;
      // Find balanced end of the call
      let depth = 1;
      let i = m.index + m[0].length;
      while (i < src.length && depth > 0) {
        if (src[i] === '(') depth++;
        else if (src[i] === ')') depth--;
        i++;
      }
      const callBody = src.slice(m.index, i);

      // Safe if: the field is explicitly set, OR the call spreads prev state
      // (functional form), OR the call spreads a variable that includes the field
      const safe =
        new RegExp(`\\b${field}\\s*:`).test(callBody) ||
        /set\w+\s*\(\s*\w+\s*=>/.test(src.slice(Math.max(0, m.index - 30), m.index + 50)) ||
        new RegExp(`\\.\\.\\.${stateName}\\b`).test(callBody) ||
        /\.\.\.prev\b/.test(callBody);

      if (!safe) {
        warn(file, lineNo, `${setterName}({...}) call drops "${field}" — add it or use functional form`);
      }
    }

    // (A1b) Variable form: setX(someVar) where someVar comes from JSON.parse,
    // localStorage, fetch response, etc. Cannot statically verify the variable
    // includes the field — flag for review.
    const varRegex = new RegExp(`\\b${setterName}\\s*\\(\\s*(\\w+)\\s*\\)`, 'g');
    while ((m = varRegex.exec(src)) !== null) {
      const arg = m[1];
      // Skip if arg is `prev` or matches the state name (functional self-update)
      if (arg === 'prev' || arg === stateName) continue;
      const lineNo = src.slice(0, m.index).split('\n').length;
      // Heuristic: look at the surrounding 200 chars before this call to see
      // if the variable came from JSON.parse / localStorage / fetch / API
      const ctxStart = Math.max(0, m.index - 400);
      const ctx = src.slice(ctxStart, m.index);
      const fromUntrustedSource =
        new RegExp(`${arg}\\s*=\\s*JSON\\.parse`).test(ctx) ||
        new RegExp(`${arg}\\s*=\\s*await\\s+\\w+\\.json`).test(ctx) ||
        new RegExp(`const\\s+${arg}\\s*=\\s*\\w+\\.data`).test(ctx) ||
        new RegExp(`localStorage`).test(ctx);
      if (fromUntrustedSource) {
        warn(file, lineNo, `${setterName}(${arg}) hydrates from untrusted source — merge with defaults so "${field}" isn't dropped on legacy data`);
      }
    }

    // (A2) Functional form check: setX(prev => ({...})) without field is also unsafe
    const funcRegex = new RegExp(`\\b${setterName}\\s*\\(\\s*(\\w+)\\s*=>\\s*\\(?\\s*\\{`, 'g');
    while ((m = funcRegex.exec(src)) !== null) {
      const lineNo = src.slice(0, m.index).split('\n').length;
      let depth = 1;
      let i = m.index + m[0].length;
      while (i < src.length && depth > 0) {
        if (src[i] === '{') depth++;
        else if (src[i] === '}') depth--;
        i++;
      }
      const callBody = src.slice(m.index, i);
      const prevVar = m[1];
      const safe =
        new RegExp(`\\b${field}\\s*:`).test(callBody) ||
        new RegExp(`\\.\\.\\.${prevVar}\\b`).test(callBody);
      if (!safe) {
        warn(file, lineNo, `${setterName}(${prevVar} => ...) drops "${field}" — spread ${prevVar} or set the field`);
      }
    }

    // (B) Unsafe accessors: stateName.field.<arrayMethod> without defensive guard
    const accessRegex = new RegExp(`\\b${stateName}\\.${field}\\.(length|map|filter|forEach|find|reduce|includes|some|every|slice|push|pop|shift|unshift|indexOf|join|concat|sort)\\b`, 'g');
    while ((m = accessRegex.exec(src)) !== null) {
      const idx = m.index;
      const lineNo = src.slice(0, idx).split('\n').length;
      const lineText = lines[lineNo - 1];
      // Safe if the line wraps with `(stateName.field || [])` OR uses ?. OR Array.isArray
      const safe =
        new RegExp(`\\(\\s*${stateName}\\.${field}\\s*\\|\\|\\s*\\[\\]\\s*\\)`).test(lineText) ||
        new RegExp(`${stateName}\\.${field}\\?\\.`).test(lineText) ||
        new RegExp(`Array\\.isArray\\s*\\(\\s*${stateName}\\.${field}`).test(lineText);
      if (!safe) {
        warn(file, lineNo, `unsafe access "${m[0]}" — wrap with (${stateName}.${field} || []) or ?.`);
      }
    }
  }
}

console.log(`\n=== ${warningCount} warning(s) ===`);
process.exit(warningCount > 0 ? 1 : 0);
