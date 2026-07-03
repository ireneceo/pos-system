import type { CapacitorConfig } from '@capacitor/cli';

// D1: load the REMOTE web app (not a local bundle) — same origin keeps
// IndexedDB / localStorage / cookies / socket.io / Service Worker working,
// exactly like the browser and the Windows app. Web deploy = app UI update.
const config: CapacitorConfig = {
  appId: 'com.purplehere.pos.mobile',
  appName: 'Purple POS',
  webDir: 'src',
  server: {
    // Default = dev, so a debug build can never accidentally hit production
    // ("검증은 전부 dev", design §7-5). Release builds override to
    // https://purplehere.com/pos in MainActivity via BuildConfig.DEBUG.
    url: 'https://dev.purplehere.com/pos',
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
