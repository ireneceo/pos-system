// Lightweight logger wrapper — single point of console output.
// Why: Sentry 미사용 결정 (2026-05-03) 이후 PM2 stdout/stderr 가 prod 추적 유일 수단.
//   직접 console.* 호출은 prefix/level/환경 필터 없음 → noise + PII 노출 위험.
//   향후 winston/pino 로 swap 시 호출 지점은 그대로, 이 모듈만 교체.
//
// Usage:
//   const logger = require('../utils/logger');
//   logger.info('user logged in', { userId });
//   logger.warn('slow query', { ms, query });
//   logger.error('payment failed', { invoiceId, error: err.message });
//   logger.debug('cache miss', { key });   // DEBUG=true env 에서만 출력

const isProduction = process.env.NODE_ENV === 'production';
const debugEnabled = process.env.DEBUG === 'true';

function fmt(level, args) {
  const ts = new Date().toISOString();
  return [`[${ts}] [${level}]`, ...args];
}

const logger = {
  // Only printed in non-prod (or if DEBUG=true). Avoid for hot paths.
  info(...args) {
    if (!isProduction || debugEnabled) {
      console.log(...fmt('INFO', args));
    }
  },

  // Always printed. For non-fatal anomalies (slow query, deprecated path, retry).
  warn(...args) {
    console.warn(...fmt('WARN', args));
  },

  // Always printed → PM2 stderr → logrotate. Goes to prod alerting later (winston/pino).
  error(...args) {
    console.error(...fmt('ERROR', args));
  },

  // Only when DEBUG=true env is set. Verbose tracing.
  debug(...args) {
    if (debugEnabled) {
      console.log(...fmt('DEBUG', args));
    }
  }
};

module.exports = logger;
