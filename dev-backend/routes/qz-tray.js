/**
 * QZ Tray request signing.
 *
 * QZ Tray will prompt the user for permission on every print unless the page
 * sends RSA-signed requests AND the matching public certificate is installed
 * as the QZ Tray `override.crt`.
 *
 * This router exposes three endpoints:
 *   GET  /api/qz-tray/certificate           → returns the public cert as text/plain
 *   GET  /api/qz-tray/certificate/download  → same content, as an attachment (override.crt)
 *   POST /api/qz-tray/sign                  → signs the body with the private key
 *
 * Generate the key pair once via: node scripts/generate-qz-cert.js
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const router = express.Router();

const CERT_DIR = path.join(__dirname, '..', 'config', 'qz-cert');
const PRIVATE_KEY_PATH = path.join(CERT_DIR, 'private-key.pem');
const CERTIFICATE_PATH = path.join(CERT_DIR, 'digital-certificate.txt');

// In-memory cache — avoid hitting disk on every print
let privateKeyCache = null;
let certificateCache = null;

function loadPrivateKey() {
  if (privateKeyCache) return privateKeyCache;
  if (!fs.existsSync(PRIVATE_KEY_PATH)) {
    throw new Error('QZ Tray private key not found. Run: node scripts/generate-qz-cert.js');
  }
  privateKeyCache = fs.readFileSync(PRIVATE_KEY_PATH, 'utf8');
  return privateKeyCache;
}

function loadCertificate() {
  if (certificateCache) return certificateCache;
  if (!fs.existsSync(CERTIFICATE_PATH)) {
    throw new Error('QZ Tray certificate not found. Run: node scripts/generate-qz-cert.js');
  }
  certificateCache = fs.readFileSync(CERTIFICATE_PATH, 'utf8');
  return certificateCache;
}

/** Public certificate (PEM) — sent on every QZ Tray handshake. */
router.get('/certificate', (req, res) => {
  try {
    res.type('text/plain').send(loadCertificate());
  } catch (err) {
    console.error('[QZ Tray] Certificate read failed:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

/** Same content, but as a downloadable override.crt file for merchants. */
router.get('/certificate/download', (req, res) => {
  try {
    res.setHeader('Content-Disposition', 'attachment; filename="override.crt"');
    res.type('text/plain').send(loadCertificate());
  } catch (err) {
    console.error('[QZ Tray] Certificate download failed:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * Sign a payload with the server-side private key (RSA-SHA512).
 *
 * QZ Tray ≥2.1 expects SHA512 (default in 2.2.x+). Frontend MUST also call
 * `qz.security.setSignatureAlgorithm('SHA512')` to match. With both sides
 * aligned and the matching public cert installed as `override.crt`, QZ Tray
 * accepts the signed request silently — no per-print "Allow?" prompt, and the
 * "remember" checkbox becomes enabled.
 *
 * Body: arbitrary text (whatever QZ Tray asked us to sign).
 * Response: base64 signature, text/plain. QZ Tray verifies this against the
 *           public cert it has on disk.
 */
router.post('/sign', express.text({ type: '*/*', limit: '256kb' }), (req, res) => {
  try {
    const toSign = req.body || '';
    const signer = crypto.createSign('RSA-SHA512');
    signer.update(toSign);
    const signature = signer.sign(loadPrivateKey(), 'base64');
    res.type('text/plain').send(signature);
  } catch (err) {
    console.error('[QZ Tray] Sign failed:', err.message);
    res.status(500).type('text/plain').send('');
  }
});

/**
 * Auto-installer — picks the right one-click script for the user's OS so they
 * never have to navigate to %APPDATA% / Application Support / /usr/share by hand.
 *
 *  - Windows → .bat (double-click runs it; embeds the cert as text)
 *  - macOS   → .command (double-click runs it via Terminal)
 *  - Linux   → .sh (chmod +x then ./install.sh)
 *
 * The script writes the cert into the correct QZ Tray data folder, creating
 * the folder if missing. After running, the user just restarts QZ Tray.
 *
 * Query: ?os=windows|mac|linux  (defaults to User-Agent guess)
 */
router.get('/installer', (req, res) => {
  try {
    const cert = loadCertificate().trim();
    const ua = (req.headers['user-agent'] || '').toLowerCase();
    let os = (req.query.os || '').toString().toLowerCase();
    if (!['windows', 'mac', 'linux'].includes(os)) {
      if (ua.includes('windows')) os = 'windows';
      else if (ua.includes('mac')) os = 'mac';
      else os = 'linux';
    }

    if (os === 'windows') {
      // .bat — embed cert as `echo`'d lines. Use CRLF so Notepad shows it nicely.
      const lines = [
        '@echo off',
        'setlocal',
        'echo Installing PurpleHere QZ Tray Certificate ...',
        'set "TARGET=%APPDATA%\\qz"',
        'if not exist "%TARGET%" mkdir "%TARGET%"',
        '> "%TARGET%\\override.crt" (',
      ];
      cert.split('\n').forEach(line => {
        // `(` `)` `^` `&` `|` `>` `<` `%` 가 cmd 에서 reserved — 안전하게 escape
        const escaped = line.replace(/[\^&|<>()%!]/g, '^$&');
        lines.push(`  echo ${escaped}`);
      });
      lines.push(')');
      lines.push('echo.');
      lines.push('echo Certificate installed: %TARGET%\\override.crt');
      lines.push('echo.');
      lines.push('echo Next step: right-click the QZ Tray tray icon, choose Exit,');
      lines.push('echo then launch QZ Tray again from the Start menu.');
      lines.push('echo.');
      lines.push('pause');
      const body = lines.join('\r\n');
      res.setHeader('Content-Disposition', 'attachment; filename="install-purplehere-cert.bat"');
      res.type('application/octet-stream').send(body);
      return;
    }

    if (os === 'mac') {
      const body = [
        '#!/bin/bash',
        '# PurpleHere QZ Tray certificate installer (macOS)',
        'set -e',
        'TARGET="$HOME/Library/Application Support/Qz"',
        'mkdir -p "$TARGET"',
        'cat > "$TARGET/override.crt" <<\'PEM_EOF\'',
        cert,
        'PEM_EOF',
        'echo ""',
        'echo "Certificate installed: $TARGET/override.crt"',
        'echo ""',
        'echo "Next: right-click the QZ Tray menu-bar icon, choose Exit, then relaunch QZ Tray."',
        'echo ""',
        'read -p "Press Enter to close..."',
        ''
      ].join('\n');
      res.setHeader('Content-Disposition', 'attachment; filename="install-purplehere-cert.command"');
      res.type('application/octet-stream').send(body);
      return;
    }

    // linux
    const body = [
      '#!/bin/bash',
      '# PurpleHere QZ Tray certificate installer (Linux)',
      'set -e',
      'TARGET="/usr/share/qz"',
      'if [ ! -w "$TARGET" ] && [ "$(id -u)" -ne 0 ]; then',
      '  echo "Need root to write to $TARGET — re-running with sudo..."',
      '  exec sudo "$0" "$@"',
      'fi',
      'mkdir -p "$TARGET"',
      'cat > "$TARGET/override.crt" <<\'PEM_EOF\'',
      cert,
      'PEM_EOF',
      'echo ""',
      'echo "Certificate installed: $TARGET/override.crt"',
      'echo ""',
      'echo "Next: kill the QZ Tray process and relaunch it."',
      ''
    ].join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename="install-purplehere-cert.sh"');
    res.type('application/octet-stream').send(body);
  } catch (err) {
    console.error('[QZ Tray] Installer build failed:', err.message);
    res.status(500).type('text/plain').send('Installer build failed: ' + err.message);
  }
});

module.exports = router;
