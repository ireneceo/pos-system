# QZ Tray Permission Prompt — Root Cause Investigation Plan

> Status: **OPEN** as of 2026-05-26.
> Shop: The Fire Korean Restaurant (rest 16). Production at https://purplehere.com.
> Symptom: "Untrusted website" prompt with "Validity: Invalid Certificate" every print,
> even after `override.crt` install + "Allow + Remember" click + QZ Tray restart.

## What we already know (confirmed today)

- **Server cert/sign pair is valid.** `crypto.verify(cert, sig)` PASS for both SHA512
  and SHA1 builds. dev cert == prod cert byte-for-byte.
- **Backend endpoints return 200**, correct PEM, correct base64 signatures
  (cert HTTP 200, 1220 bytes; sign HTTP 200, 344 chars).
- **`override.crt` download endpoint** returns the right file with
  `Content-Disposition: attachment; filename=override.crt`.
- **Cert details:** RSA 2048, `sha256WithRSAEncryption`, self-signed,
  `CN=PurpleHere POS, O=PurpleHere, C=MY`, valid until 2036.
- **Server cert SHA-256 fingerprint:**
  `05:78:24:3B:03:10:9C:1F:73:F8:A1:84:5B:17:95:43:8A:F5:D7:8F:8B:BD:05:9D:16:97:16:B6:2B:47:AB:6C`
- **Frontend setup** calls `setCertificatePromise` + `setSignaturePromise` and
  now **rejects on fetch failure** (no more silent anonymous-fallback).
- **Algorithm:** both sides now on SHA1 (QZ 2.x default) — earlier mismatch with SHA512
  was a candidate but the prompt may still come from another layer.

## What still needs to be verified at the shop (do these IN ORDER)

### Step 1 — Confirm the file on disk matches the server cert

On the POS PC, PowerShell:

```powershell
certutil -hashfile "$env:APPDATA\qz\override.crt" SHA256
```

Compare the output (uppercase, no colons) to the server fingerprint above
(remove colons). They must match exactly.

If they don't match:
- File was corrupted during download (browser saved differently).
- Re-download: open the printer settings page, click **Download Certificate**.
  Verify the file size on disk is exactly **1220 bytes**.

### Step 2 — Confirm the file is in the right folder

`override.crt` must sit DIRECTLY inside `%APPDATA%\qz\`. Not:
- `%APPDATA%\qz\override.crt.txt` (Windows added .txt extension)
- `%LOCALAPPDATA%\qz\override.crt` (Local instead of Roaming)
- `%APPDATA%\QZ Tray\override.crt` (different folder name)

In Explorer: turn ON "File name extensions" (View → Show → File name extensions).

### Step 3 — Confirm QZ Tray actually re-read the file

QZ Tray reads `override.crt` only at startup. To force a reload:

1. Right-click the QZ Tray tray icon → **Exit**.
   - If no icon visible: open Task Manager → find any `qz-tray` / `QZ Tray` / `java` process running QZ → End task.
2. Start menu → search "QZ Tray" → launch.
3. Wait ~5 seconds for the tray icon to appear.

### Step 4 — Confirm the frontend is actually sending the signed request

POS PC browser → F12 → Console tab → click "Connect to QZ Tray" in Settings.

You should see (now that we log explicitly):

```
[QZ Tray] requesting certificate from /api/qz-tray/certificate
[QZ Tray] certificate OK (1220 chars)
[QZ Tray] signing payload (NNN chars)
[QZ Tray] signature OK (344 chars)
```

If you see "certificate load failed" or "signing failed" — that's the bug.
If you see no `[QZ Tray]` logs at all — the page is on an old cached bundle
(force-reload, then check `document.querySelector('script[src*="main"]').src`
shows the latest `main.<hash>.js`).

### Step 5 — Confirm QZ Tray actually saved "Allow + Remember"

QZ Tray stores trusted fingerprints in:

```
%APPDATA%\qz\allowed.dat
```

After clicking "Allow + Remember", open this file in Notepad. It should contain
the cert fingerprint (long hex string). If it's empty after clicking, QZ Tray
isn't saving — likely a QZ Tray bug or permission issue on the folder. Try
running QZ Tray as Administrator once.

### Step 6 — Try the absolute fallback: turn off prompts entirely

QZ Tray → tray icon → Advanced → **uncheck "Block anonymous requests"**.
This makes QZ Tray accept any unsigned connection silently (less secure but
proves whether the prompt path is the issue). If prints work without prompts
after this, the cert/sign chain is the remaining problem.

## If all six steps pass and prompt still comes

Switch to QZ Tray's **community certificate flow** (Self-signing wizard):

1. QZ Tray → tray icon → Advanced → Site Manager
2. Add `https://purplehere.com` → **Allow** → **Remember** → **Save**

This bypasses our cert entirely and tells QZ Tray "trust this origin always."
Not signing-based but works for community licence.

## Long-term fix (after the shop is unblocked)

- **Commercial signing certificate** from qz.io (paid) — eliminates "Invalid
  Certificate" message entirely, no override.crt needed on any device.
- Cost: ~USD 150 per year per organisation.
- Apply the .crt to the backend, redeploy, every shop's QZ Tray accepts
  silently — no per-device install.

Open this issue early in tomorrow's session and run Step 1 → Step 6 with a
real POS device on the floor. Capture the F12 console output from Step 4 —
that's the deciding evidence for whether the bug is server-side, cert-side,
or QZ Tray-side.
