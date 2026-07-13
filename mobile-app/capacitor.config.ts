import type { CapacitorConfig } from '@capacitor/cli';

// D1: load the REMOTE web app (not a local bundle) — same origin keeps
// IndexedDB / localStorage / cookies / socket.io / Service Worker working,
// exactly like the browser and the Windows app. Web deploy = app UI update.
//
// The origin is fixed at BUILD time, never swapped at runtime (design §8-4 P0-5):
// Capacitor injects its runtime for the configured origin only, so a runtime
// loadUrl() to another host can drop Capacitor.Plugins.NativePrint — the bridge
// IIFE would then return silently and printing would be dead in release, with no
// error anywhere.
//   dev  (default): npx cap sync android
//   prod          : PURPLE_APP_URL=https://purplehere.com/pos npx cap sync android
// Default = dev, so a debug build can never accidentally hit production
// ("검증은 전부 dev", design §7-5). scripts/build-release.sh sets the prod URL.
const APP_URL = process.env.PURPLE_APP_URL || 'https://dev.purplehere.com/pos';

const config: CapacitorConfig = {
  appId: 'com.purplehere.pos.mobile',
  appName: 'Purple POS',
  webDir: 'src',
  server: {
    url: APP_URL,
    cleartext: false,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false
  },
  plugins: {
    // NativePrint plugin (Kotlin) backs window.__NATIVE_PRINT (the §4 contract shared
    // with the Windows app) and the Android-only window.__NATIVE_PRINT_SETUP (printer
    // registration / BT permission — read by the web Settings page only).
    // See android/app/src/main/java/com/purplehere/pos/mobile/NativePrintPlugin.kt
    // and docs/ANDROID_APP_DESIGN.md §8.
  }
};

export default config;
