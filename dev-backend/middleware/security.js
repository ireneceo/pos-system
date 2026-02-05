/**
 * 보안 미들웨어 모음
 * What and Why: SSRF 방어, Cookie 보안, 추가 보안 헤더
 */

const url = require('url');

// ============================================
// SSRF 방어
// ============================================

// 허용된 외부 도메인 목록
const ALLOWED_EXTERNAL_DOMAINS = [
  'ipapi.co',
  'api.stripe.com',
  'hooks.stripe.com'
];

// 내부 IP 대역 체크
const isInternalIP = (hostname) => {
  // localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;

  // Private IP ranges
  const privateRanges = [
    /^10\./,           // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
    /^192\.168\./,     // 192.168.0.0/16
    /^169\.254\./,     // Link-local
    /^0\./,            // 0.0.0.0/8
    /^::1$/,           // IPv6 localhost
    /^fc00:/,          // IPv6 private
    /^fe80:/           // IPv6 link-local
  ];

  return privateRanges.some(range => range.test(hostname));
};

// URL 검증 (SSRF 방어용)
const validateExternalUrl = (targetUrl) => {
  try {
    const parsed = new URL(targetUrl);

    // HTTPS만 허용
    if (parsed.protocol !== 'https:') {
      return { valid: false, reason: 'Only HTTPS URLs are allowed' };
    }

    // 내부 IP 차단
    if (isInternalIP(parsed.hostname)) {
      return { valid: false, reason: 'Internal IP addresses are not allowed' };
    }

    // 허용된 도메인만 허용 (선택적)
    if (ALLOWED_EXTERNAL_DOMAINS.length > 0) {
      const isAllowed = ALLOWED_EXTERNAL_DOMAINS.some(domain =>
        parsed.hostname === domain || parsed.hostname.endsWith('.' + domain)
      );
      if (!isAllowed) {
        return { valid: false, reason: 'Domain not in allowed list' };
      }
    }

    return { valid: true };
  } catch (e) {
    return { valid: false, reason: 'Invalid URL format' };
  }
};

// SSRF 방어 미들웨어
const ssrfProtection = (req, res, next) => {
  // URL 파라미터 검사
  const urlParams = ['url', 'redirect', 'callback', 'return_url', 'next'];

  for (const param of urlParams) {
    const value = req.body?.[param] || req.query?.[param];
    if (value) {
      const validation = validateExternalUrl(value);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: {
            message: `Invalid URL parameter: ${param}`,
            reason: validation.reason
          }
        });
      }
    }
  }

  next();
};

// ============================================
// Cookie 보안 설정
// ============================================

const cookieOptions = {
  httpOnly: true,           // JavaScript 접근 차단
  secure: process.env.NODE_ENV === 'production', // HTTPS에서만 전송
  sameSite: 'strict',       // CSRF 방어
  maxAge: 24 * 60 * 60 * 1000, // 24시간
  path: '/'
};

// 세션 쿠키 옵션 (더 짧은 만료)
const sessionCookieOptions = {
  ...cookieOptions,
  maxAge: 60 * 60 * 1000    // 1시간
};

// ============================================
// 추가 보안 헤더
// ============================================

const securityHeaders = (req, res, next) => {
  // XSS 방어
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Content Type 스니핑 방지
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Clickjacking 방지
  res.setHeader('X-Frame-Options', 'DENY');

  // Referrer 정책
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // 권한 정책 (민감한 기능 제한)
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // 캐시 제어 (민감한 데이터)
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
};

// ============================================
// CSP 설정 (Content Security Policy)
// ============================================

const cspMiddleware = (req, res, next) => {
  // API 요청에는 CSP 불필요
  if (req.path.startsWith('/api/')) {
    return next();
  }

  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://js.stripe.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.stripe.com https://ipapi.co wss:",
    "frame-src 'self' https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ];

  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
  next();
};

// ============================================
// SQL Injection 패턴 감지 (추가 방어층)
// ============================================

const sqlInjectionPatterns = [
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
  /(\%3D)|(=)[^\s]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
  /\w*((\%27)|(\'))((\%6F)|o|(\%4F))((\%72)|r|(\%52))/i,
  /union[\s\S]*select/i,
  /exec(\s|\+)+(s|x)p\w+/i
];

const sqlInjectionProtection = (req, res, next) => {
  const checkValue = (value, path) => {
    if (typeof value === 'string') {
      for (const pattern of sqlInjectionPatterns) {
        if (pattern.test(value)) {
          console.warn(`[SECURITY] Potential SQL injection detected at ${path}: ${value.substring(0, 50)}`);
          return true;
        }
      }
    }
    return false;
  };

  // Query params 검사
  for (const [key, value] of Object.entries(req.query)) {
    if (checkValue(value, `query.${key}`)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid characters detected in request' }
      });
    }
  }

  // Body 검사 (단순 문자열 값만)
  if (req.body && typeof req.body === 'object') {
    for (const [key, value] of Object.entries(req.body)) {
      if (checkValue(value, `body.${key}`)) {
        return res.status(400).json({
          success: false,
          error: { message: 'Invalid characters detected in request' }
        });
      }
    }
  }

  next();
};

module.exports = {
  ssrfProtection,
  validateExternalUrl,
  isInternalIP,
  cookieOptions,
  sessionCookieOptions,
  securityHeaders,
  cspMiddleware,
  sqlInjectionProtection
};
