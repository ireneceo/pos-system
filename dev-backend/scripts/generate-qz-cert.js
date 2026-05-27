#!/usr/bin/env node
/**
 * Generate a self-signed RSA certificate for QZ Tray request signing.
 *
 * Run ONCE per environment (dev/prod). The output is:
 *   config/qz-cert/private-key.pem     ← stays on the server; never expose
 *   config/qz-cert/digital-certificate.txt ← public; merchants install in QZ Tray
 *
 * Merchants then install the certificate as override.crt in QZ Tray:
 *   Windows:  %APPDATA%\qz\override.crt
 *   macOS:    ~/Library/Application Support/Qz/override.crt
 *   Linux:    /usr/share/qz/override.crt   (or /opt/qz-tray/override.crt)
 *
 * Once installed, QZ Tray accepts signed requests from our backend without
 * prompting the user for permission on every print.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CERT_DIR = path.join(__dirname, '..', 'config', 'qz-cert');
const PRIVATE_KEY_PATH = path.join(CERT_DIR, 'private-key.pem');
const CERTIFICATE_PATH = path.join(CERT_DIR, 'digital-certificate.txt');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  ensureDir(CERT_DIR);

  const force = process.argv.includes('--force');
  if (fs.existsSync(PRIVATE_KEY_PATH) && !force) {
    console.log('Private key already exists at', PRIVATE_KEY_PATH);
    console.log('Pass --force to regenerate (NOTE: all merchants must reinstall the new cert).');
    process.exit(0);
  }

  const subject = '/CN=PurpleHere POS/O=PurpleHere/C=MY';
  const days = 3650; // 10 years — re-issue before this if needed

  console.log('Generating RSA 2048 self-signed certificate (valid', days, 'days)...');
  execSync(
    `openssl req -x509 -newkey rsa:2048 ` +
    `-keyout "${PRIVATE_KEY_PATH}" ` +
    `-out "${CERTIFICATE_PATH}" ` +
    `-days ${days} -nodes ` +
    `-subj "${subject}"`,
    { stdio: 'inherit' }
  );

  // Tighten permissions on the private key — never world-readable.
  try { fs.chmodSync(PRIVATE_KEY_PATH, 0o600); } catch (e) { /* non-fatal on some FS */ }

  console.log('');
  console.log('  Private key:', PRIVATE_KEY_PATH, '(keep secret)');
  console.log('  Certificate:', CERTIFICATE_PATH, '(distribute to merchants as override.crt)');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Restart the backend so it picks up the new key.');
  console.log('  2. Each merchant downloads override.crt from Settings → Printer.');
  console.log('  3. Merchant copies it to the OS-specific QZ Tray folder and restarts QZ Tray.');
}

main();
