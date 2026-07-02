'use strict';

// Resolves which web app URL the Electron shell loads.
// Single source of truth for dev/prod switching.
//
// Priority:
//   1. PURPLE_POS_URL  — explicit full URL override (any origin)
//   2. PURPLE_POS_ENV  — 'dev' | 'prod' shorthand
//   3. --dev CLI flag  — same as PURPLE_POS_ENV=dev
//   4. default         — production
//
// D1 (design §2): we always load a REMOTE https origin, never a local bundle,
// so IndexedDB / localStorage / cookies / socket.io / Service Worker keep
// working against the same origin exactly like the browser+QZ setup does.

const PROD_URL = 'https://purplehere.com/pos';
const DEV_URL = 'https://dev.purplehere.com/pos';

function resolveAppUrl(argv = process.argv) {
  if (process.env.PURPLE_POS_URL) {
    return process.env.PURPLE_POS_URL;
  }

  const envFlag = (process.env.PURPLE_POS_ENV || '').toLowerCase();
  const hasDevFlag = argv.includes('--dev');

  if (envFlag === 'dev' || hasDevFlag) {
    return DEV_URL;
  }
  if (envFlag === 'prod' || envFlag === 'production') {
    return PROD_URL;
  }
  return PROD_URL;
}

// The set of origins we consider "internal" — in-window navigation to these
// is allowed; everything else is opened in the system browser (§6-5).
function allowedOrigins() {
  return new Set([
    'https://purplehere.com',
    'https://www.purplehere.com',
    'https://dev.purplehere.com'
  ]);
}

module.exports = {
  PROD_URL,
  DEV_URL,
  resolveAppUrl,
  allowedOrigins
};
