import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { installFetchInterceptor } from './utils/httpClient';
import { startBuildVersionWatcher } from './utils/buildVersionWatcher';

// Sentry 미사용 결정 (2026-05-03) — ErrorBoundary 는 React 표준 class로 inline 정의.

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: (props: { error: Error | null; resetError: () => void }) => React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback: (props: { error: Error | null; resetError: () => void }) => React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }
  resetError = () => this.setState({ hasError: false, error: null });
  render() {
    if (this.state.hasError) {
      return this.props.fallback({ error: this.state.error, resetError: this.resetError });
    }
    return this.props.children;
  }
}

// 단일 fetch 인터셉터 설치 (API_BASE_URL 프리픽스 + POS 토큰 주입 + 401 자동 로그아웃)
installFetchInterceptor();

// Auto-detect new builds and reload — ensures every user picks up fresh code within 5 min
// of deploy without needing Ctrl+Shift+R. Cloudflare's index.html cache is 5 min so we
// poll a little more often.
startBuildVersionWatcher();

// Register service worker for PWA + Web Push (v3.28+).
// Errors are non-fatal: app degrades to in-app socket toaster only.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
      console.warn('[SW] Registration failed:', err);
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
        fallback={({ resetError }) => (
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
            <p style={{ color: '#6B7280', marginBottom: '24px', fontSize: '14px' }}>
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
