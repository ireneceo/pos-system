# 프로젝트 가이드라인

## 개발 환경 규칙 (중요!)

### 1. 개발 vs 운영 분리
- **모든 작업은 개발서버(dev-frontend, dev-backend)에서 진행**
- 프론트엔드 개발: `/var/www/dev-frontend`
- 백엔드 개발: `/var/www/dev-backend`
- **절대 운영서버에 직접 배포하지 않음**

### 2. 배포 규칙 (절대 준수!)
- **사용자가 명시적으로 "배포" 또는 "/배포" 명령을 하지 않으면 절대 배포하지 않음**
- 빌드 완료 후 자동 배포 금지
- **배포 스크립트: `/var/www/deploy-to-production.sh`** (SSH로 원격 운영서버에 배포)
- 운영서버(87.106.78.146)에 직접 접속하여 코드 수정 금지
- "안 떠", "메뉴 안 보여" 등의 피드백 = 개발서버 문제 → 운영서버 배포가 아님!

### 3. 개발 서버 URL
- 개발서버: `dev.purplehere.com`
- 운영서버: `purplehere.com` (배포 명령 시에만)

### 4. 프론트엔드 빌드 프로세스 (개발서버)
```bash
# 1. 빌드
cd /var/www/dev-frontend && npm run build

# 2. 개발서버에 적용 (빌드 후 반드시 실행!)
cp -r /var/www/dev-frontend/build/* /var/www/dev-frontend-build/
```
**중요**: 빌드만 하면 개발서버에 반영 안 됨! 반드시 2번 복사 명령도 실행해야 함.

### 5. 백엔드 변경 시
```bash
pm2 restart dev-backend
```

## 프로젝트 구조 (개발서버: 87.106.11.184)
- `dev-frontend/`: React 프론트엔드 소스 (개발)
- `dev-frontend-build/`: 개발서버 Nginx가 서빙하는 빌드 폴더
- `dev-backend/`: Node.js/Express 백엔드 (개발, PM2 dev-backend, port 3001)

## 운영 서버 구조 (원격: 87.106.78.146)
- `production-backend/`: 운영 백엔드 (PM2 production-backend, port 3002)
- `production-frontend/`: 운영 프론트엔드 빌드
- **주의**: 운영 디렉토리는 원격 서버에만 존재. 개발서버에 없음!

## 보안 가이드라인 (v2.0 - 2026-02-05)

### 적용된 보안 체계

| 항목 | 상태 | 구현 위치 |
|------|------|----------|
| CORS | ✅ | app.js (allowedOrigins 화이트리스트) |
| CSRF 방어 | ✅ | Cookie SameSite=strict |
| XSS 방지 | ✅ | Helmet + Security Headers + Input Sanitization |
| SSRF 방어 | ✅ | middleware/security.js (ssrfProtection) |
| AuthN/AuthZ | ✅ | JWT + middleware/auth.js |
| RBAC | ✅ | requireRole, checkRestaurantAccess |
| Rate Limit | ✅ | express-rate-limit (API: 1000/15min, Login: 20/15min) |
| Cookie 보안 | ✅ | HttpOnly, Secure, SameSite=strict |
| 입력 검증 | ✅ | express-validator (middleware/validation.js) |
| SQL Injection | ✅ | Sequelize ORM + 패턴 감지 미들웨어 |
| 에러 처리 | ✅ | 통일된 응답 형식, 프로덕션에서 스택 숨김 |
| 의존성 취약점 | ✅ | npm audit fix (0 vulnerabilities) |
| 보안 헤더 | ✅ | X-XSS-Protection, X-Frame-Options, CSP 등 |
| Password 정책 | ✅ | 회원가입 시 8자 이상, 대소문자+숫자 필수 |

### 보안 미들웨어 파일

1. **middleware/security.js**
   - `ssrfProtection`: 외부 URL 검증 (내부 IP 차단)
   - `securityHeaders`: XSS, Clickjacking, Cache 제어 헤더
   - `sqlInjectionProtection`: SQL 패턴 감지 (ORM 위 추가 방어층)
   - `cookieOptions`: 보안 쿠키 설정 옵션
   - `cspMiddleware`: Content Security Policy

2. **middleware/validation.js**
   - `validateLogin`: 로그인 입력 검증
   - `validateRegister`: 회원가입 검증 (강력한 비밀번호 정책)
   - `validateCreateOrder`: 주문 생성 검증
   - `validateMenuItem`: 메뉴 아이템 검증
   - `sanitizeString`: XSS 방지용 문자열 정리

3. **middleware/auth.js**
   - `authenticateToken`: JWT 토큰 검증
   - `requireRole`: 역할 기반 접근 제어
   - `checkRestaurantAccess`: 레스토랑별 접근 권한 확인

### 보안 유지 체크리스트

개발 시 다음 사항 준수:
- [ ] 새 API 엔드포인트에 적절한 인증/인가 미들웨어 적용
- [ ] 사용자 입력은 validation.js의 검증 규칙 사용
- [ ] 외부 URL 접근 시 ssrfProtection 또는 validateExternalUrl 사용
- [ ] 새 의존성 추가 후 `npm audit` 실행
- [ ] 민감한 데이터 로깅 금지 (비밀번호, 토큰 등)
