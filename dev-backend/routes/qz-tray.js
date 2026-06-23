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
const { authenticateToken } = require('../middleware/auth');
const SupportTicket = require('../models/SupportTicket');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const { sendNotificationBatch, getSystemAdminIds } = require('../utils/notificationService');

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
    // QZ Tray 데스크톱 버전별 서명 알고리즘. 2.2.x+ = SHA512(기본, POS1 무변경). Windows 7 의
    // QZ 2.1.x 는 SHA512 검증을 못 맞춰 "Validity: Invalid / anonymous" → Allow 팝업 무한.
    // 프론트가 connectQZTray 에서 버전 감지해 ?algorithm=SHA1 을 붙여 보낸다(2.1.x 만).
    const algo = String(req.query.algorithm || 'SHA512').toUpperCase() === 'SHA1' ? 'SHA1' : 'SHA512';
    const signer = crypto.createSign('RSA-' + algo);
    signer.update(toSign);
    const signature = signer.sign(loadPrivateKey(), 'base64');
    res.type('text/plain').send(signature);
  } catch (err) {
    console.error('[QZ Tray] Sign failed:', err.message);
    res.status(500).type('text/plain').send('');
  }
});

/**
 * QZ Tray app installer PROXY — streams the official QZ Tray installer through
 * our own server so the one-click .bat can download it from THIS domain (which
 * the merchant's browser already reached over TLS 1.2) instead of GitHub.
 *
 * Why: on Windows 7 the in-script GitHub download fails (old .NET PowerShell
 * can't negotiate TLS 1.2 to github.com), surfacing as a misleading "check the
 * internet" error. Downloading from our domain via certutil (WinINet — same
 * stack as the browser that already loaded the site) sidesteps that entirely.
 *
 *   ?win7=1            → QZ Tray 2.1.6 (last line that supports Windows 7 SP1)
 *   else  &arch=...    → QZ Tray 2.2.6 (Windows 10/11, x86_64 | arm64)
 * Public (no auth) — same as /installer; it only proxies a public release asset.
 */
router.get('/app', async (req, res) => {
  try {
    const win7 = ['1', 'true', 'yes'].includes(String(req.query.win7 || '').toLowerCase());
    const arch = String(req.query.arch || 'x86_64').toLowerCase() === 'arm64' ? 'arm64' : 'x86_64';
    const url = win7
      ? 'https://github.com/qzind/tray/releases/download/v2.1.6/qz-tray-2.1.6+3.exe'
      : `https://github.com/qzind/tray/releases/download/v2.2.6/qz-tray-2.2.6-${arch}.exe`;
    const upstream = await fetch(url, { redirect: 'follow' });
    if (!upstream.ok || !upstream.body) {
      return res.status(502).json({ success: false, message: 'Could not fetch QZ Tray installer upstream' });
    }
    res.setHeader('Content-Disposition', 'attachment; filename="qz-tray-setup.exe"');
    res.setHeader('Content-Type', 'application/octet-stream');
    const len = upstream.headers.get('content-length');
    if (len) res.setHeader('Content-Length', len);
    const { Readable } = require('stream');
    Readable.fromWeb(upstream.body).pipe(res);
  } catch (e) {
    res.status(502).json({ success: false, message: e.message });
  }
});

/**
 * Java (JRE 11) installer PROXY — streams the Eclipse Temurin OpenJDK 11 JRE
 * MSI through our server. QZ Tray 2.1.x (the Windows 7/8 line) does NOT bundle a
 * JRE and pops a "Java is required → download from adoptium.net" loop; on old
 * Windows that adoptium download fails (TLS) so it never ends. We pre-install
 * Java from THIS domain (certutil/WinINet) before running QZ so the loop never
 * appears.  ?arch=x64 (default) | x86  → matches the OS bitness.
 * Temurin 11.0.21+9 has both x64 and x86-32 Windows JRE MSIs. Public (no auth).
 */
router.get('/java', async (req, res) => {
  try {
    const x86 = ['x86', 'x86-32', 'x32', '32'].includes(String(req.query.arch || '').toLowerCase());
    const tag = 'jdk-11.0.21+9';
    const file = x86
      ? 'OpenJDK11U-jre_x86-32_windows_hotspot_11.0.21_9.msi'
      : 'OpenJDK11U-jre_x64_windows_hotspot_11.0.21_9.msi';
    const url = `https://github.com/adoptium/temurin11-binaries/releases/download/${encodeURIComponent(tag)}/${file}`;
    const upstream = await fetch(url, { redirect: 'follow' });
    if (!upstream.ok || !upstream.body) {
      return res.status(502).json({ success: false, message: 'Could not fetch Java runtime upstream' });
    }
    res.setHeader('Content-Disposition', 'attachment; filename="qz-java-runtime.msi"');
    res.setHeader('Content-Type', 'application/octet-stream');
    const len = upstream.headers.get('content-length');
    if (len) res.setHeader('Content-Length', len);
    const { Readable } = require('stream');
    Readable.fromWeb(upstream.body).pipe(res);
  } catch (e) {
    res.status(502).json({ success: false, message: e.message });
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
      //
      // QZ Tray 2.2.x searches three locations for override.crt (in priority):
      //   1. Install dir (C:\Program Files\QZ Tray\) — write-protected, skipped
      //   2. SHARED_DIR  = %PROGRAMDATA%\qz\  — needs admin; QZ checks this FIRST after install dir
      //   3. USER_DIR    = %APPDATA%\qz\      — per-user, writeable without admin
      //
      // We self-elevate via PowerShell so SHARED_DIR is also populated; then we
      // also write USER_DIR as a fallback so the cert survives even if the user
      // declines UAC. If UAC is declined we keep going (USER_DIR is still valid
      // but a lower-priority hit, so the prompt may stay until QZ is restarted).
      // ONE-CLICK combined installer (.bat). A single file does everything so the
      // merchant never visits qz.io or moves a certificate by hand:
      //   1) self-elevate to admin
      //   2) install the QZ Tray app itself if missing — download the official,
      //      code-signed v2.2.6 installer from GitHub, run NSIS silent `/S`
      //      (interactive fallback if silent didn't land the exe)
      //   3) write our override.crt → %PROGRAMDATA%\qz + %APPDATA%\qz (auto-trust,
      //      kills the per-print "Allow?" prompt)
      //   4) (re)launch QZ Tray so it loads the freshly-installed cert
      const QZ_VERSION = '2.2.6';
      // The .bat downloads the QZ Tray app from OUR domain (this same host) so the
      // merchant's PC only needs to reach a site its browser already opened — fixes
      // Windows 7 where the direct GitHub TLS download fails. See /app proxy above.
      const safeHost = (req.get('host') || 'purplehere.com').replace(/[^a-zA-Z0-9.\-:]/g, '');
      const appBase = `https://${safeHost}/api/qz-tray/app`;
      const javaBase = `https://${safeHost}/api/qz-tray/java`;
      const certEchoLines = [];
      cert.split('\n').forEach(line => {
        // `(` `)` `^` `&` `|` `>` `<` `%` `!` are reserved in cmd — escape with ^
        const escaped = line.replace(/[\^&|<>()%!]/g, '^$&');
        certEchoLines.push(`  echo ${escaped}`);
      });
      const writeCert = (varName) => [
        `if not exist "%${varName}%" mkdir "%${varName}%"`,
        `> "%${varName}%\\override.crt" (`,
        ...certEchoLines,
        ')',
        `echo   - trust certificate written to %${varName}%\\override.crt`,
      ];
      const lines = [
        '@echo off',
        'setlocal EnableDelayedExpansion',
        'title PurpleHere Printer Setup',
        '',
        'rem ===== Self-elevate to administrator =====',
        'net session >nul 2>&1',
        'if %errorlevel% neq 0 (',
        '  echo Requesting administrator permission ...',
        '  powershell -Command "Start-Process -FilePath \'%~f0\' -Verb RunAs" >nul 2>&1',
        '  exit /b 0',
        ')',
        '',
        'echo ============================================',
        'echo   PurpleHere Printer Setup',
        'echo ============================================',
        'echo.',
        '',
        'rem ===== Step 0: detect OS + ensure Java on Windows 7/8/8.1 =====',
        'rem QZ Tray 2.1.x (the only line that runs on Win7/8) does NOT bundle Java and',
        'rem loops on a "download Java from adoptium.net" prompt that fails on old Windows.',
        'rem So we install the matching Temurin JRE 11 ourselves FIRST, from this domain.',
        'set "WIN7=0"',
        'ver | findstr /C:"6.1." /C:"6.2." /C:"6.3." >nul && set "WIN7=1"',
        'set "JARCH=x86"',
        'if /I "%PROCESSOR_ARCHITECTURE%"=="AMD64" set "JARCH=x64"',
        'if /I "%PROCESSOR_ARCHITECTURE%"=="ARM64" set "JARCH=x64"',
        'if defined PROCESSOR_ARCHITEW6432 set "JARCH=x64"',
        'if "%WIN7%"=="1" (',
        '  set "HASJAVA=0"',
        '  java -version >nul 2>&1 && set "HASJAVA=1"',
        '  if exist "%ProgramFiles%\\Eclipse Adoptium\\" set "HASJAVA=1"',
        '  if exist "%ProgramFiles(x86)%\\Eclipse Adoptium\\" set "HASJAVA=1"',
        '  if "!HASJAVA!"=="1" (',
        '    echo [Java] Java runtime already present.',
        '  ) else (',
        '    echo [Java] Installing Java runtime for QZ Tray ^(Windows 7/8 needs this^) ...',
        `    set "JREURL=${javaBase}?arch=!JARCH!"`,
        '    set "JREMSI=%TEMP%\\qz-java-runtime.msi"',
        '    if exist "!JREMSI!" del /f /q "!JREMSI!" >nul 2>&1',
        '    certutil.exe -urlcache -split -f "!JREURL!" "!JREMSI!" >nul 2>&1',
        '    if not exist "!JREMSI!" powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor 3072 } catch {}; try { (New-Object Net.WebClient).DownloadFile(\'!JREURL!\',\'!JREMSI!\') } catch {}" >nul 2>&1',
        '    if not exist "!JREMSI!" bitsadmin /transfer qzjre /download /priority normal "!JREURL!" "!JREMSI!" >nul 2>&1',
        '    if exist "!JREMSI!" (',
        '      echo  Installing Java ^(silent, about a minute^) ...',
        '      msiexec /i "!JREMSI!" /qn /norestart ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJavaHome,FeatureOracleJavaSoft',
        '      timeout /t 5 /nobreak >nul',
        '      rem Make the just-installed Java visible to THIS session so the QZ installer below finds it',
        '      rem (msiexec sets the system vars, but our already-running cmd would not see them).',
        '      for /d %%D in ("%ProgramFiles%\\Eclipse Adoptium\\jre-11*") do set "JAVA_HOME=%%~fD"',
        '      for /d %%D in ("%ProgramFiles(x86)%\\Eclipse Adoptium\\jre-11*") do set "JAVA_HOME=%%~fD"',
        '      if defined JAVA_HOME set "PATH=!JAVA_HOME!\\bin;!PATH!"',
        '    ) else (',
        '      echo  WARNING: could not auto-install Java. If QZ Tray asks for Java, install',
        '      echo           "Temurin JRE 11" ^(!JARCH!^) manually, then re-run this file.',
        '    )',
        '  )',
        ')',
        'echo.',
        '',
        'rem ===== Step 1: install the QZ Tray app if it is missing =====',
        'set "QZEXE=%ProgramFiles%\\QZ Tray\\qz-tray.exe"',
        'if exist "%ProgramFiles(x86)%\\QZ Tray\\qz-tray.exe" set "QZEXE=%ProgramFiles(x86)%\\QZ Tray\\qz-tray.exe"',
        'if exist "%QZEXE%" (',
        '  echo [1/3] QZ Tray printing app already installed.',
        ') else (',
        '  set "ARCH=x86_64"',
        '  if /I "%PROCESSOR_ARCHITECTURE%"=="ARM64" set "ARCH=arm64"',
        `  if "!WIN7!"=="1" ( set "QZURL=${appBase}?win7=1" ) else ( set "QZURL=${appBase}?arch=!ARCH!" )`,
        '  set "QZDL=%TEMP%\\qz-tray-setup.exe"',
        '  if exist "!QZDL!" del /f /q "!QZDL!" >nul 2>&1',
        '  if "!WIN7!"=="1" ( echo [1/3] Windows 7 detected - downloading compatible QZ Tray ... ) else ( echo [1/3] Downloading QZ Tray printing app ... )',
        '  rem (a) certutil uses WinINet - the SAME network stack as the browser that already',
        '  rem     reached this site - so it works on Win7 where PowerShell .NET TLS fails.',
        '  certutil.exe -urlcache -split -f "!QZURL!" "!QZDL!" >nul 2>&1',
        '  rem (b) fallback: PowerShell forcing NUMERIC TLS 1.2 (3072). The enum name "Tls12"',
        '  rem     is undefined on old Win7 .NET, but the integer value still works.',
        '  if not exist "!QZDL!" (',
        '    powershell -Command "try { [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor 3072 } catch {}; try { (New-Object Net.WebClient).DownloadFile(\'!QZURL!\',\'!QZDL!\') } catch {}" >nul 2>&1',
        '  )',
        '  rem (c) last-resort fallback: bitsadmin.',
        '  if not exist "!QZDL!" (',
        '    bitsadmin /transfer qzdl /download /priority normal "!QZURL!" "!QZDL!" >nul 2>&1',
        '  )',
        '  if not exist "!QZDL!" (',
        '    echo.',
        '    echo  ERROR: could not download the printer app.',
        '    echo   - Make sure this PC can open purplehere.com in a web browser.',
        '    echo   - On Windows 7: install the latest Windows Updates ^(adds TLS 1.2^), then retry.',
        '    echo.',
        '    pause',
        '    exit /b 1',
        '  )',
        '  echo  Installing QZ Tray ^(this can take a minute^) ...',
        '  start /wait "" "!QZDL!" /S',
        '  timeout /t 8 /nobreak >nul',
        '  if exist "%ProgramFiles%\\QZ Tray\\qz-tray.exe" set "QZEXE=%ProgramFiles%\\QZ Tray\\qz-tray.exe"',
        '  if exist "%ProgramFiles(x86)%\\QZ Tray\\qz-tray.exe" set "QZEXE=%ProgramFiles(x86)%\\QZ Tray\\qz-tray.exe"',
        '  if not exist "%QZEXE%" (',
        '    echo  Finishing QZ Tray install ^(follow the installer window^) ...',
        '    start /wait "" "!QZDL!"',
        '    if exist "%ProgramFiles%\\QZ Tray\\qz-tray.exe" set "QZEXE=%ProgramFiles%\\QZ Tray\\qz-tray.exe"',
        '    if exist "%ProgramFiles(x86)%\\QZ Tray\\qz-tray.exe" set "QZEXE=%ProgramFiles(x86)%\\QZ Tray\\qz-tray.exe"',
        '  )',
        ')',
        '',
        'rem ===== Step 2: install the trust certificate (no more Allow prompts) =====',
        'echo [2/3] Installing trust certificate ...',
        'rem (a) QZ Tray install folder — the HIGHEST-priority location QZ reads.',
        'rem     We run as admin (self-elevated above) so we can write here.',
        'if exist "%ProgramFiles%\\QZ Tray\\" (',
        '  > "%ProgramFiles%\\QZ Tray\\override.crt" (',
        ...certEchoLines,
        '  )',
        '  echo   - trust certificate written to %ProgramFiles%\\QZ Tray\\override.crt',
        ')',
        'rem (a2) 32-bit install path (common on Windows 7) — write the cert there too.',
        'if exist "%ProgramFiles(x86)%\\QZ Tray\\" (',
        '  > "%ProgramFiles(x86)%\\QZ Tray\\override.crt" (',
        ...certEchoLines,
        '  )',
        '  echo   - trust certificate written to %ProgramFiles(x86)%\\QZ Tray\\override.crt',
        ')',
        'rem (b) shared + per-user data folders — fallbacks so trust survives reinstalls.',
        'set "SYSTARGET=%PROGRAMDATA%\\qz"',
        ...writeCert('SYSTARGET'),
        'set "USRTARGET=%APPDATA%\\qz"',
        ...writeCert('USRTARGET'),
        '',
        'rem ===== Step 3: (re)start QZ Tray so it loads the new certificate =====',
        'echo [3/3] Starting QZ Tray ...',
        'taskkill /F /IM qz-tray.exe /T >nul 2>&1',
        'timeout /t 2 /nobreak >nul',
        'if exist "%QZEXE%" ( start "" "%QZEXE%" )',
        '',
        'echo.',
        'echo ============================================',
        'echo  Done. QZ Tray is installed and trusted.',
        'echo ============================================',
        'echo.',
        'echo Next: go back to PurpleHere ^> Settings ^> Printer',
        'echo       and click "Check Connection".',
        'echo.',
        'pause',
      ];
      const body = lines.join('\r\n');
      res.setHeader('Content-Disposition', 'attachment; filename="PurpleHere-Printer-Setup.bat"');
      res.type('application/octet-stream').send(body);
      return;
    }

    if (os === 'mac') {
      // QZ Tray 2.2 macOS search order:
      //   /Library/Application Support/qz/  (SHARED_DIR — needs sudo)
      //   ~/Library/Application Support/qz/  (USER_DIR — no sudo)
      // Write USER_DIR always (no prompt); attempt SHARED_DIR with sudo for higher
      // priority. Lowercase "qz" is the official DATA_DIR; older docs sometimes
      // showed "Qz" but the constant is "qz".
      const body = [
        '#!/bin/bash',
        '# PurpleHere QZ Tray certificate installer (macOS)',
        'set +e',
        'USR="$HOME/Library/Application Support/qz"',
        'SYS="/Library/Application Support/qz"',
        'mkdir -p "$USR"',
        'cat > "$USR/override.crt" <<\'PEM_EOF\'',
        cert,
        'PEM_EOF',
        'echo "  wrote $USR/override.crt"',
        'echo ""',
        'echo "Attempting system-wide install (you may be prompted for your password)..."',
        'if sudo mkdir -p "$SYS" 2>/dev/null && sudo tee "$SYS/override.crt" >/dev/null <<\'PEM_EOF2\'',
        cert,
        'PEM_EOF2',
        'then',
        '  echo "  wrote $SYS/override.crt"',
        'else',
        '  echo "  (skipped system-wide — user-level cert is still valid)"',
        'fi',
        'echo ""',
        'echo "============================================"',
        'echo " Certificate installed."',
        'echo "============================================"',
        'echo ""',
        'echo "Next: right-click the QZ Tray menu-bar icon > Exit, then relaunch QZ Tray."',
        'echo "      Return to PurpleHere and press \"Auto-Configure & Test\" in Settings > Printer."',
        'echo ""',
        'read -p "Press Enter to close..."',
        ''
      ].join('\n');
      res.setHeader('Content-Disposition', 'attachment; filename="install-purplehere-cert.command"');
      res.type('application/octet-stream').send(body);
      return;
    }

    // linux — QZ Tray search: /srv/qz/ (SHARED) → ~/.qz/ (USER)
    const body = [
      '#!/bin/bash',
      '# PurpleHere QZ Tray certificate installer (Linux)',
      'set +e',
      'USR="$HOME/.qz"',
      'SYS="/srv/qz"',
      'mkdir -p "$USR"',
      'cat > "$USR/override.crt" <<\'PEM_EOF\'',
      cert,
      'PEM_EOF',
      'echo "  wrote $USR/override.crt"',
      'echo ""',
      'if [ "$(id -u)" -ne 0 ]; then',
      '  echo "Attempting system-wide install (sudo)..."',
      '  if sudo mkdir -p "$SYS" 2>/dev/null && sudo tee "$SYS/override.crt" >/dev/null <<\'PEM_EOF2\'',
      cert,
      'PEM_EOF2',
      '  then echo "  wrote $SYS/override.crt"',
      '  else echo "  (skipped system-wide — user-level cert is still valid)"',
      '  fi',
      'else',
      '  mkdir -p "$SYS"',
      '  cat > "$SYS/override.crt" <<\'PEM_EOF3\'',
      cert,
      'PEM_EOF3',
      '  echo "  wrote $SYS/override.crt"',
      'fi',
      'echo ""',
      'echo "============================================"',
      'echo " Certificate installed."',
      'echo "============================================"',
      'echo ""',
      'echo "Next: kill the QZ Tray process and relaunch it,"',
      'echo "      then press \"Auto-Configure & Test\" in PurpleHere."',
      ''
    ].join('\n');
    res.setHeader('Content-Disposition', 'attachment; filename="install-purplehere-cert.sh"');
    res.type('application/octet-stream').send(body);
  } catch (err) {
    console.error('[QZ Tray] Installer build failed:', err.message);
    res.status(500).type('text/plain').send('Installer build failed: ' + err.message);
  }
});

/**
 * Remote diagnostics — Settings → Printer → "Send to Support" button.
 *
 * The browser collects what it can see locally (QZ Tray version & connection
 * state, cert handshake result, silent-print probe outcome, user-agent, last
 * error) and ships it here. We file it as a SupportTicket with category
 * `printing` so admins see it in the existing inbox, and email System Admins.
 *
 * No new model — SupportTicket is the canonical inbox.
 */
router.post('/diagnose', authenticateToken, async (req, res) => {
  try {
    const payload = req.body || {};
    // 2026-05-29: Auto telemetry (auto-kitchen-skip / auto-bill-skip / auto-*-fail)
    // must NEVER create a ticket or email admins. These fire on every order — even
    // in a perfectly healthy "kitchen auto-print OFF" config — and spammed System
    // Admins with diagnostic mail. The frontend was already no-op'd, but a store
    // device running a stale cached bundle can keep POSTing; this server-side guard
    // drops it for good. Only the manual Settings → Printer "Send to Support" button
    // (which carries no `auto-` scope) files a report and notifies admins.
    if (typeof payload.scope === 'string' && payload.scope.startsWith('auto-')) {
      return res.status(202).json({ success: true, skipped: 'auto-telemetry suppressed' });
    }
    // Only file a ticket when there is an actual printing problem. A healthy probe
    // (browser print, connected, autoPrint simply off) is not an issue — filing it
    // spammed the support inbox of shops that don't even use QZ (with MIN Cafe report).
    const hasProblem = payload.connected === false
      || payload.silentPrint === 'failed'
      || (payload.lastError && String(payload.lastError).trim() && String(payload.lastError).trim() !== '(none)');
    if (!hasProblem) {
      return res.status(202).json({ success: true, skipped: 'no printing problem detected' });
    }
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const ticketNumber = `QZ-${new Date().getFullYear()}-${String(timestamp % 10000)}-${String(random).padStart(3, '0')}`;

    let restaurantName = null;
    if (req.user.restaurant_id) {
      try {
        const r = await Restaurant.findByPk(req.user.restaurant_id, { attributes: ['name'] });
        restaurantName = r?.name || null;
      } catch (_) { /* non-fatal */ }
    }

    const summaryLines = [
      `QZ Tray version: ${payload.qzVersion || 'unknown'}`,
      `Connected:       ${payload.connected ? 'yes' : 'no'}`,
      `Cert handshake:  ${payload.certHandshake || 'n/a'}`,
      `Silent print:    ${payload.silentPrint || 'n/a'}`,
      `Last error:      ${payload.lastError || '(none)'}`,
      `Print method:    ${payload.method || 'unknown'}`,
      `User agent:      ${payload.userAgent || req.headers['user-agent'] || 'unknown'}`,
      `OS guess:        ${payload.os || 'unknown'}`,
      `Probed at:       ${payload.probedAt || new Date().toISOString()}`,
    ];
    const description = summaryLines.join('\n') +
      '\n\n--- raw diagnostic payload ---\n' + JSON.stringify(payload, null, 2);

    const ticket = await SupportTicket.create({
      id: `ticket-${timestamp}-${random}`,
      ticketNumber,
      customerId: String(req.user.id),
      customerName: req.user.full_name || req.user.email,
      customerEmail: req.user.email,
      customerRole: req.user.role,
      restaurantId: req.user.restaurant_id || null,
      restaurantName,
      subject: `[QZ Tray] printing diagnostic from ${restaurantName || 'shop'}`,
      description,
      // Admin-only diagnostic channel — hidden from the merchant support inbox so QZ
      // printing diagnostics don't clutter shops (esp. those not using QZ).
      category: 'diagnostic',
      priority: payload.silentPrint === 'failed' || payload.connected === false ? 'high' : 'medium',
      status: 'open'
    });

    // Notify System Admins (non-blocking)
    (async () => {
      try {
        const adminIds = await getSystemAdminIds();
        const filteredIds = (adminIds || []).filter(id => id !== req.user.id);
        if (filteredIds.length > 0) {
          await sendNotificationBatch(filteredIds, 'inquiry_received', {
            subject: `[QZ Tray] ${restaurantName || 'Shop'} reported a printing problem`,
            text: description,
            html: '<pre style="font-family:monospace;white-space:pre-wrap;">' +
                  description.replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c])) +
                  '</pre>'
          });
        }
      } catch (e) {
        console.error('[QZ Tray diagnostic notification error]', e.message);
      }
    })();

    res.status(201).json({ success: true, data: { ticketNumber: ticket.ticketNumber, id: ticket.id } });
  } catch (error) {
    console.error('[QZ Tray] diagnose failed:', error.message);
    res.status(500).json({ success: false, message: 'Failed to file diagnostic report' });
  }
});

module.exports = router;
