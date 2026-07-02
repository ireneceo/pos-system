# Purple POS Mobile (Android / Capacitor)

Android app that **replaces per-device print apps (RawBT)** — tablets auto-print
to multiple printers with nothing extra to install. Same idea as the Windows
desktop app, for Android.

Design: `docs/ANDROID_APP_DESIGN.md`. Isolated from Purple POS (`/var/www/mobile-app/`).

## How it works
- Capacitor shell loads the **remote** web app (`https://purplehere.com/pos`).
- A native plugin injects `window.__NATIVE_PRINT` using the **exact same §4
  contract** the Windows app uses — so `billPrint.js` (P2) prints via Android
  natively with **zero frontend changes**.

## Layout
```
capacitor.config.ts        remote-load config
src/nativePrintBridge.js    maps Capacitor plugin -> window.__NATIVE_PRINT (§4)
native/NativePrintPlugin.kt native ESC/POS (LAN/USB/BT) — skeleton, built in A1
docs/ANDROID_APP_DESIGN.md  full design + phases
```

## Status (2026-07-02)
- **A0 scaffold**: done (config + JS bridge + plugin skeleton + design).
- **A1 native plugin + A2 APK build**: need **JDK + Android SDK** installed here
  (like `wine` was for Windows) + Kotlin implementation of the ESC/POS paths.
- **A3 verify**: needs a **real tablet + printer** (the one part the server can't do —
  same as the store PC for Windows).

## Build (once toolchain installed)
```bash
npm install
npx cap add android
npx cap sync android
# open in Android Studio / gradle assembleRelease -> signed APK -> sideload
```
