import type { CapacitorConfig } from '@capacitor/cli';

// D1: load the REMOTE web app (not a local bundle) — same origin keeps
// IndexedDB / localStorage / cookies / socket.io / Service Worker working,
// exactly like the browser and the Windows app. Web deploy = app UI update.
const config: CapacitorConfig = {
  appId: 'com.purplehere.pos.mobile',
  appName: 'Purple POS',
  webDir: 'src',
  server: {
    url: 'https://purplehere.com/pos',
    cleartext: false,
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: false
  },
  plugins: {
    // NativePrint plugin (Kotlin) backs window.__NATIVE_PRINT — see
    // native/NativePrintPlugin.kt and docs/ANDROID_APP_DESIGN.md §3.
  }
};

export default config;
