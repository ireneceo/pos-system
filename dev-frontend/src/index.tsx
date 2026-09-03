import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CrashReportBox from './components/Common/CrashReportBox';
import { installFetchInterceptor } from './utils/httpClient';
import { startBuildVersionWatcher } from './utils/buildVersionWatcher';

// Sentry 미사용 결정 (2026-05-03) — ErrorBoundary 는 React 표준 class로 inline 정의.

type FallbackProps = { error: Error | null; componentStack: string | null; resetError: () => void };

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: (props: FallbackProps) => React.ReactNode },
  { hasError: boolean; error: Error | null; componentStack: string | null }
> {
  constructor(props: { children: React.ReactNode; fallback: (props: FallbackProps) => React.ReactNode }) {
    super(props);
    // componentStack 도 담는다 — "이 오류 보내기" 가 어느 컴포넌트에서 터졌는지 함께 보낸다.
    this.state = { hasError: false, error: null, componentStack: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
    this.setState({ componentStack: info?.componentStack || null });
    // ChunkLoadError = the browser cached an OLD main.js whose lazy-chunk hashes
    // no longer exist after a fresh deploy. The fix is a hard reload that drops
    // the cached main.js. Guard with sessionStorage so we don't loop if the
    // server is genuinely missing the chunk.
    const msg = (error && (error.message || String(error))) || '';
    const isChunkErr = error?.name === 'ChunkLoadError' || /Loading chunk \d+ failed/.test(msg) || /Failed to fetch dynamically imported/.test(msg);
    if (isChunkErr && !sessionStorage.getItem('__chunk_reload_done')) {
      sessionStorage.setItem('__chunk_reload_done', '1');
      console.warn('[ErrorBoundary] ChunkLoadError detected → hard reloading to pick up fresh main.js');
      window.location.reload();
      return;
    }
    // Boot-window crash auto-recovery (Irene 2026-06-12): a stale SW/cache pairing
    // an OLD bundle with a NEW backend repeatedly broke store logins ("로그인이 안
    // 된다" = boot crash, not credentials). If the app crashes within the first
    // 15s after navigation (login/boot phase — no in-progress user work to lose),
    // wipe SW registrations + caches ONCE and reload clean. Auth token in
    // localStorage is untouched, so a logged-in user comes back logged in.
    const bootMs = (() => { try { return performance.now(); } catch { return Infinity; } })();
    if (bootMs < 15000 && !sessionStorage.getItem('__boot_recover_done')) {
      sessionStorage.setItem('__boot_recover_done', '1');
      console.warn('[ErrorBoundary] boot crash → auto-clearing SW + caches, reloading once');
      (async () => {
        try {
          if ('serviceWorker' in navigator) {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map((r) => r.unregister().catch(() => {})));
          }
        } catch (_) { /* non-fatal */ }
        try {
          const names = await caches.keys();
          await Promise.all(names.map((n) => caches.delete(n)));
        } catch (_) { /* non-fatal */ }
        window.location.reload();
      })();
    }
  }
  resetError = () => this.setState({ hasError: false, error: null, componentStack: null });
  render() {
    if (this.state.hasError) {
      return this.props.fallback({ error: this.state.error, componentStack: this.state.componentStack, resetError: this.resetError });
    }
    return this.props.children;
  }
}

// 단일 fetch 인터셉터 설치 (API_BASE_URL 프리픽스 + POS 토큰 주입 + 401 자동 로그아웃)
installFetchInterceptor();

// Global ChunkLoadError catch — fires when a lazy import() rejects before any
// React boundary sees it (e.g. while suspended). Same reload guard as the boundary.
window.addEventListener('unhandledrejection', (e) => {
  const r: any = e.reason;
  const msg = (r && (r.message || String(r))) || '';
  const isChunkErr = r?.name === 'ChunkLoadError' || /Loading chunk \d+ failed/.test(msg) || /Failed to fetch dynamically imported/.test(msg);
  if (isChunkErr && !sessionStorage.getItem('__chunk_reload_done')) {
    sessionStorage.setItem('__chunk_reload_done', '1');
    console.warn('[chunk-error] hard-reloading to pick up fresh main.js');
    window.location.reload();
  }
});

// Clear the reload guard once the app booted successfully so the next deploy
// can self-heal too. setTimeout deferred so a crash during initial render still
// triggers the reload path above.
setTimeout(() => { try { sessionStorage.removeItem('__chunk_reload_done'); } catch {} }, 5000);

// Auto-detect new builds and reload — ensures every user picks up fresh code within 5 min
// of deploy without needing Ctrl+Shift+R. Cloudflare's index.html cache is 5 min so we
// poll a little more often.
startBuildVersionWatcher();

// Register service worker for PWA + Web Push (v3.28+).
// Errors are non-fatal: app degrades to in-app socket toaster only.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // 2026-06-12: register with a per-build query (?b=<main.js hash>) so the SW
    // script URL changes every deploy. Cloudflare had cached the bare /sw.js for
    // a YEAR (immutable, edge entry from 6/3) — every SW_VERSION bump since 5/30
    // silently never reached store devices. A new URL per build is a guaranteed
    // edge-cache MISS → origin serves fresh (no-store since 6/9) → devices
    // self-update again. Stable within a build, so no reinstall loop.
    const buildId = (() => {
      try {
        const s = document.querySelector('script[src*="/static/js/main."]') as HTMLScriptElement | null;
        const m = s?.src.match(/main\.([a-f0-9]+)\.js/);
        return m ? m[1] : '1';
      } catch { return '1'; }
    })();
    navigator.serviceWorker.register(`/sw.js?b=${buildId}`, { scope: '/' }).then((reg) => {
      // 2026-06-04 (Irene): kiosk POS devices that never navigate were getting
      // stuck on an OLD service worker serving an OLD bundle — a plain app reopen
      // didn't help (the old SW intercepts and serves its cached main.js), so
      // store deploys silently never reached the device. Poll for a new SW every
      // 60s so the browser fetches the freshly deployed sw.js; the new SW's install
      // wipes caches + skipWaiting + clients.claim, then we reload once on
      // controllerchange to run the fresh code. No user action / hard-refresh ever
      // needed — the device self-updates within ~1 min of a deploy.
      try { setInterval(() => { reg.update().catch(() => {}); }, 60 * 1000); } catch (_) { /* non-fatal */ }
    }).catch((err) => {
      console.warn('[SW] Registration failed:', err);
    });
    let _swReloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (_swReloaded) return;
      _swReloaded = true;
      // A fresh SW just took control → reload once to run the new bundle.
      try { window.location.reload(); } catch (_) { /* non-fatal */ }
    });
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary
        fallback={({ error, componentStack, resetError }) => (
          <div style={{
            padding: '40px 20px',
            maxWidth: '600px',
            margin: '60px auto',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            <h1 style={{ fontSize: '24px', marginBottom: '12px', color: '#1F2937' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#4B5563', marginBottom: '24px', fontSize: '14px' }}>
              Please try again or contact support if the problem persists.
            </p>
            <button
              onClick={resetError}
              style={{
                padding: '10px 24px',
                background: '#635BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            {/* 오류를 그 자리에서 접수 — 이동하면 앱이 깨진 상태라 실패할 수 있다 */}
            <CrashReportBox error={error} componentStack={componentStack} />
          </div>
        )}
      >
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
