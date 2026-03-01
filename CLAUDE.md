1# 프로젝트 가이드라인

## 작업 워크플로우 (최우선 규칙)

모든 작업 요청은 아래 흐름을 자동으로 따른다. Irene이 단계 이름을 말할 필요 없다.

### 흐름
**요구사항 정리 → 화면/UX 설계 → 기술 설계 → 구현 → 검증**

### 규칙
- 이전 단계 산출물을 반드시 참조한 후 다음 단계 진행
- 각 단계 완료 시 핵심 요약을 보여주고 승인 확인
- Irene이 수정 지시하면 해당 단계에서 반영 후 재확인
- 승인되면 다음 단계로 자동 이동
- **구현 중 설계에 없는 것을 임의로 추가하지 않는다**
- **구현 완료 후 반드시 검증 단계를 실행한다 (절대 생략 금지)**

### 검증 단계 (필수 — 구현 후 반드시 실행)

**검증 없이 "완료"라고 보고하는 것은 금지된다.**

구현이 끝나면 아래 체크리스트를 순서대로 실행한다:

1. **빌드 확인**: `npm run build` 성공 + dev 서버 배포
2. **수정 파일 동작 확인**: 수정한 모든 파일이 포함된 페이지를 curl 또는 브라우저 경로로 접근 가능한지 확인
3. **요구사항 대조**: 원래 요청한 항목을 하나씩 나열하고, 각각 구현 완료 여부를 ✅/❌로 표시
4. **연관 페이지 영향 확인**: 수정한 공통 컴포넌트(Modal, Button, Table 등)를 사용하는 다른 페이지에 부작용이 없는지 확인
5. **검증 결과 보고**: 위 결과를 Irene에게 요약 보고하고, 문제가 있으면 즉시 수정

**규모별 검증 범위:**
- **소**: 해당 페이지 동작 확인
- **중**: 해당 페이지 + 연관 페이지 확인
- **대**: 전체 역할별 주요 페이지 확인 (Admin, Brand, Foodcourt, Restaurant, Owner)

### 규모별 자동 조절
| 규모 | 기준 | 워크플로우 |
|------|------|-----------|
| **소** | 버그 수정, 텍스트 변경, 단일 파일 수정 | 바로 구현 → **검증** |
| **중** | 기능 추가/수정 (2~5 파일) | 기술 설계 요약 → 승인 → 구현 → **검증** |
| **대** | 신규 시스템, 다수 파일, DB 변경 포함 | 전 단계 수행 → **검증** |

### 설계 문서
- **대규모 작업**: `docs/` 폴더에 설계 문서 저장
- **중소규모 작업**: 대화 내에서 정리하고 승인 (문서 생성 불필요)

### 핵심 원칙
- Irene은 "뭘 만들고 싶은지"만 말하면 된다
- 나머지는 자동으로 적합한 관점에서 작업한다
- 방향이 바뀌거나 중요한 결정이 필요하면 반드시 Irene에게 묻는다
- 작은 구현 디테일은 묻지 않고 최선의 판단으로 진행한다

---

## 개발 환경 규칙

### 1. 개발 vs 운영 분리
- **모든 작업은 개발서버(dev-frontend, dev-backend)에서 진행**
- 프론트엔드: `/var/www/dev-frontend`
- 백엔드: `/var/www/dev-backend`
- **절대 운영서버에 직접 코드 수정/배포하지 않음**

### 2. 배포 규칙 (절대 준수!)
- **Irene이 "배포" 또는 "/배포" 명령을 하지 않으면 절대 배포하지 않음**
- 빌드 완료 후 자동 배포 금지
- **배포 스크립트: `/var/www/deploy-to-production.sh`** (SSH로 원격 운영서버에 배포)
- "안 떠", "메뉴 안 보여" 등의 피드백 = 개발서버 문제 → 운영서버 배포가 아님!

### 3. 서버 URL
- 개발: `dev.purplehere.com`
- 운영: `purplehere.com` (배포 명령 시에만)

### 4. 빌드 & 반영
```bash
# 프론트엔드 빌드 + 개발서버 반영 (두 단계 모두 필수!)
cd /var/www/dev-frontend && npm run build
sudo cp -r /var/www/dev-frontend/build/* /var/www/dev-frontend-build/

# 백엔드 변경 시
pm2 restart dev-backend

# DB 스키마 변경 시
cd /var/www/dev-backend && node sync-database.js
pm2 restart dev-backend
```

### 5. 작업 히스토리 자동 기록 (필수!)
Claude는 **각 기능 완료 시** 아래 파일을 즉시 업데이트한다. `/저장` 명령 없이도 자동 수행.

| 파일 | 타이밍 | 내용 |
|------|--------|------|
| `/var/www/.claude/session-state.md` | 작업 시작/완료 시 | 진행 중 → 완료 이동 |
| `/var/www/DEVELOPMENT_PLAN.md` | 기능 완료 시 | 해당 항목 ✅ 표시 |

**목적**: 세션 중단 시 복구 + `/개발시작` 시 정확한 현황 표시

---

## 프로젝트 구조

### 개발서버 (87.106.11.184)
- `dev-frontend/`: React 프론트엔드 소스
- `dev-frontend-build/`: Nginx가 서빙하는 빌드 폴더
- `dev-backend/`: Node.js/Express (PM2 dev-backend, port 3001)

### 운영서버 (원격: 87.106.78.146)
- `production-backend/`: PM2 production-backend, port 3002
- `production-frontend/`: 운영 프론트엔드 빌드
- **주의**: 운영 디렉토리는 원격 서버에만 존재

---

## 보안 가이드라인

### 적용된 보안 체계

| 항목 | 구현 위치 |
|------|----------|
| CORS | app.js (allowedOrigins 화이트리스트) |
| CSRF 방어 | Cookie SameSite=strict |
| XSS 방지 | Helmet + Security Headers + Input Sanitization |
| SSRF 방어 | middleware/security.js (ssrfProtection) |
| AuthN/AuthZ | JWT + middleware/auth.js |
| RBAC | requireRole, checkRestaurantAccess |
| Rate Limit | express-rate-limit (API: 1000/15min, Login: 20/15min) |
| Cookie 보안 | HttpOnly, Secure, SameSite=strict |
| 입력 검증 | express-validator (middleware/validation.js) |
| SQL Injection | Sequelize ORM + 패턴 감지 미들웨어 |
| 에러 처리 | 통일된 응답 형식, 프로덕션에서 스택 숨김 |
| 보안 헤더 | X-XSS-Protection, X-Frame-Options, CSP |
| Password 정책 | 8자 이상, 대소문자+숫자 필수 |

### 보안 미들웨어
- **middleware/security.js**: ssrfProtection, securityHeaders, sqlInjectionProtection, cookieOptions, cspMiddleware
- **middleware/validation.js**: validateLogin, validateRegister, validateCreateOrder, validateMenuItem, sanitizeString
- **middleware/auth.js**: authenticateToken, requireRole, checkRestaurantAccess

### 개발 시 보안 체크리스트
- 새 API 엔드포인트에 적절한 인증/인가 미들웨어 적용
- 사용자 입력은 validation.js의 검증 규칙 사용
- 외부 URL 접근 시 ssrfProtection 사용
- 새 의존성 추가 후 `npm audit` 실행
- 민감한 데이터 로깅 금지 (비밀번호, 토큰 등)
