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
**코드 수준 확인만으로 "완료"라고 하는 것도 금지된다. 실제 API 호출로 데이터 흐름을 증명해야 한다.**

구현이 끝나면 아래 체크리스트를 순서대로 실행한다:

1. **빌드 확인**: `npm run build` 성공 (경고 0건) + dev 서버 배포
2. **API 실동작 테스트** (코드 리뷰가 아닌 실제 호출):
   - 로그인 → 토큰 획득
   - 해당 기능의 핵심 API를 실제 호출 (GET/POST/PUT/DELETE)
   - **저장 (Write)**: 데이터를 실제로 DB에 저장하고, 응답에서 성공 확인
   - **불러오기 (Read)**: 저장한 데이터를 다시 GET으로 조회하여 값이 일치하는지 검증
   - **DB 컬럼 매칭**: API 응답의 필드명이 프론트엔드에서 참조하는 필드명과 일치하는지 확인 (예: `total` vs `total_amount`)
   - **정상 케이스 + 경계 케이스** 최소 1개씩 (예: 0값, null, 100% 할인 등)
   - 테스트 후 원래 데이터로 복원
3. **유저 흐름 검증** (실제 사용자가 하는 동작 순서대로):
   - 로그인 → 사이드바 메뉴 클릭 → 페이지 로드 → 데이터 표시 → 필터/검색 → 저장/수정
   - 역할별 접근 가능 페이지가 실제로 데이터를 표시하는지 확인
   - API 응답 데이터가 0건일 때도 빈 상태가 정상 표시되는지 (에러 아닌 빈 목록)
4. **프론트엔드 렌더링 확인**: 변경한 페이지의 HTML/JS가 정상 서빙되는지 확인
5. **요구사항 대조**: 원래 요청한 항목을 하나씩 나열하고, 각각 구현 완료 여부를 ✅/❌로 표시
6. **연관 페이지 영향 확인**: 수정한 공통 컴포넌트를 사용하는 다른 페이지에 부작용이 없는지 확인
7. **검증 결과 보고**: 실제 API 호출 결과 포함하여 Irene에게 보고. 문제가 있으면 즉시 수정

**API 테스트 패턴** (Node.js 스크립트로 실행):
```bash
# 임시 테스트 파일 생성 → 실행 → 결과 확인 → 파일 삭제
cd /var/www/dev-backend
node test-xxx.js    # Login → API 호출 → 검증 → 원복
rm test-xxx.js      # 반드시 삭제
```

**규모별 검증 범위:**
- **소**: 해당 API 1~2개 실호출 검증
- **중**: 해당 기능 전체 API 흐름 (생성→조회→수정→재조회) + 연관 페이지
- **대**: 역할별 API 흐름 검증 (Admin, Brand, Foodcourt, Restaurant, Owner)

### 규모별 자동 조절
| 규모 | 기준 | 워크플로우 |
|------|------|-----------|
| **소** | 버그 수정, 텍스트 변경, 단일 파일 수정 | 바로 구현 → **검증** |
| **중** | 기능 추가/수정 (2~5 파일) | 기술 설계 요약 → 승인 → 구현 → **검증** |
| **대** | 신규 시스템, 다수 파일, DB 변경 포함 | 전 단계 수행 → **검증** |

### 설계 문서
- **대규모 작업**: `docs/` 폴더에 설계 문서 저장
- **기존 문서가 있으면 기존 문서에 추가** — 새 파일 만들지 않는다
- **관련 없는 주제를 하나의 문서에 묶지 않는다** — 1문서 = 1주제
- **문서 생성 전 기존 docs/ 파일 목록을 확인**하고, 해당 주제의 문서가 이미 있는지 확인
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
# 프론트엔드 빌드 + 개발서버 반영 (이 한 줄로 빌드+배포 완료)
cd /var/www/dev-frontend && npm run build:dev

# ⚠️ npm run build 직접 실행 금지! build:dev가 빌드+nginx 배포까지 자동 처리
# deploy-dev.sh: 권한 수정 → 빌드 → dev-frontend-build/ 복사

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

## 코딩 가이드 (점진적 적용)

> 새로 작성하는 코드는 반드시 따른다. 기존 코드를 수정할 때는 **수정하는 파일/함수 범위 내에서** 같이 정리한다. 수정하지 않는 파일까지 리팩토링하지 않는다.

### API 응답 형식 (표준)
```javascript
// 성공
res.json({ success: true, data: result });
res.json({ success: true, data: result, message: '선택적 메시지' });

// 실패
res.status(400).json({ success: false, message: 'Error description' });
res.status(404).json({ success: false, message: 'Resource not found' });
res.status(500).json({ success: false, message: 'Internal server error' });
```
- `res.json({ error: '...' })` 형식 사용 금지 (레거시)
- 기존 파일 수정 시 해당 파일의 응답 형식이 비표준이면 수정 범위 내에서 표준으로 변경

### 파일 크기 기준
- **라우트 파일**: 500줄 이상이면 기능별 분리 검토 (예: `invoices.js` → `invoices-crud.js` + `invoices-generation.js`)
- **컴포넌트 파일**: 800줄 이상이면 하위 컴포넌트 분리 검토
- 새로 만드는 파일은 처음부터 적절히 분리

### 백엔드 엔트리 포인트
- **PM2 실행 파일: `server.js`만 사용** (app.js는 제거됨)
- 라우트 등록, 미들웨어, 스케줄러 모두 server.js에서 관리

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

### 개발 시 보안 체크리스트 (필수 — 새 API 작성 시 반드시 적용)

#### 1. 인증/인가 — 3단계 필수 적용
```javascript
// 모든 보호 API는 반드시 이 순서로 미들웨어 적용:
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => { ... });
router.put('/:id', authenticateToken, checkRestaurantAccess, async (req, res) => { ... });
```
- **authenticateToken**: 로그인 여부 확인 (JWT 유효성)
- **requireRole(...)**: 허용된 역할인지 확인 (System Admin, Brand General 등)
- **checkRestaurantAccess**: 해당 레스토랑에 접근 권한이 있는지 확인 (restaurant_id 기반)

#### 2. 접근 제어 필수 규칙
| API 유형 | 필수 미들웨어 |
|----------|-------------|
| 공개 (로그인, 모바일 메뉴 조회) | 없음 또는 optionalAuth |
| 사용자 본인 데이터 (프로필) | authenticateToken |
| 레스토랑 데이터 (주문, 메뉴) | authenticateToken + checkRestaurantAccess |
| 역할 전용 (유저 관리, 플랜) | authenticateToken + requireRole |
| 시스템 관리 (설정, 삭제) | authenticateToken + requireRole('System Admin') |

#### 3. 입력 검증
- 사용자 입력은 반드시 validation.js의 검증 규칙 사용
- **restaurant_id 파라미터를 신뢰하지 않는다** — 항상 checkRestaurantAccess로 소유권 확인
- 외부 URL 접근 시 ssrfProtection 사용

#### 4. 기타
- 새 의존성 추가 후 `npm audit` 실행
- 민감한 데이터 로깅 금지 (비밀번호, 토큰 등)
- XSS: 사용자 입력을 DB에 저장할 때 sanitizeString 적용
