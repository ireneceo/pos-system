import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import * as Sentry from '@sentry/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getApiBaseUrl } from './config/api';

// ============================================
// Sentry 초기화 (가장 먼저 실행 — 다른 코드의 에러를 캐치하기 위해)
// ============================================
const SENTRY_DSN = 'https://ed2a54d6e74db63ffb9e3da5dad5d888@o4511194201391104.ingest.us.sentry.io/4511194295042048';

// 환경 자동 감지: hostname 기준
const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
const sentryEnvironment =
  hostname === 'purplehere.com' || hostname === 'www.purplehere.com'
    ? 'production'
    : hostname === 'dev.purplehere.com'
      ? 'development'
      : 'local';

// localhost는 Sentry 전송 안 함 (로컬 개발 시 노이즈 방지)
if (sentryEnvironment !== 'local') {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: sentryEnvironment,

    // 프론트엔드/백엔드 구분 태그 (같은 Sentry 프로젝트 공유)
    initialScope: {
      tags: { component: 'frontend' }
    },

    // PII 자동 수집 (IP, user-agent 등). 민감 데이터는 별도 필터링.
    sendDefaultPii: true,

    // 통합 (자동 에러/성능/세션 추적)
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // 성능 추적: 운영 10%, 개발 100%
    tracesSampleRate: sentryEnvironment === 'production' ? 0.1 : 1.0,

    // Session Replay: 운영은 에러 발생 세션의 100%만, 개발은 모든 세션의 10%
    replaysSessionSampleRate: sentryEnvironment === 'production' ? 0 : 0.1,
    replaysOnErrorSampleRate: 1.0,

    // 에러 필터링 (민감 정보 제거 + 무시 패턴)
    beforeSend(event, hint) {
      // 비밀번호 / 토큰 / 카드정보 마스킹
      if (event.request?.data) {
        const data = event.request.data as Record<string, unknown>;
        ['password', 'currentPassword', 'newPassword', 'token', 'auth_token', 'mobile_token', 'cardNumber', 'cvv'].forEach(key => {
          if (data[key]) data[key] = '[REDACTED]';
        });
      }
      // 헤더에서 Authorization 마스킹
      if (event.request?.headers && (event.request.headers as Record<string, string>)['Authorization']) {
        (event.request.headers as Record<string, string>)['Authorization'] = '[REDACTED]';
      }
      return event;
    },

    // 무시할 에러 (브라우저 확장프로그램, 네트워크 끊김 등)
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
      'NetworkError when attempting to fetch resource',
      'Failed to fetch',
      'Load failed',
      'AbortError',
      // 브라우저 확장
      'top.GLOBALS',
      'chrome-extension',
      'moz-extension',
    ],
  });

  console.log(`[Sentry] Initialized — environment: ${sentryEnvironment}`);
}

// Auto-detect environment and override fetch for API calls
const originalFetch = window.fetch;
const API_BASE_URL = getApiBaseUrl();

window.fetch = (url: string | URL | Request, init?: RequestInit) => {
  // Convert URL to string if needed
  const urlString = typeof url === 'string' ? url : url.toString();

  // If it's an API call and we have a base URL, prepend it
  if (urlString.startsWith('/api/') && API_BASE_URL) {
    const fullUrl = `${API_BASE_URL}${urlString}`;
    return originalFetch(fullUrl, init);
  }

  // If it's an API call but API_BASE_URL is empty (like in Codespaces), use relative path
  if (urlString.startsWith('/api/')) {
    return originalFetch(url, init);
  }

  // For all other calls, use original fetch
  return originalFetch(url, init);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Sentry.ErrorBoundary
        fallback={({ error, resetError }) => (
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
              The error has been reported. Please try again or contact support if the problem persists.
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
        showDialog={false}
      >
        <App />
      </Sentry.ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
