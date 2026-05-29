1# 프로젝트 가이드라인

## 🔒🔒 인쇄(PRINT) 코드 보호 — 절대 규칙 (2026-05-29, 최우선)

**매장 인쇄는 영업 생명선. 인쇄 문제 = 매장 마비. 아래를 위반하면 안 됨.**

### 보호 대상 (이 파일/경로는 "현재 동작 = 정답". 함부로 변경 금지)
- `dev-frontend/src/utils/billPrint.js` (특히 `sendHTMLViaQZTray` / `sendViaQZTray` / `printKitchenTicketViaRawBT` / `printBillViaRawBT` / `printKitchenTicketsByStation` / `sendToRawBTPrinter` / mirror 블록)
- `dev-frontend/src/hooks/useAutoPrintPoller.ts`
- `dev-frontend/src/components/Layout/MainLayout.tsx` 의 `_printPollFn`
- `dev-frontend/src/pages/KitchenDisplay/KitchenDisplayPage.tsx` 의 order-created / order-items-added 핸들러
- `dev-frontend/src/pages/POSTerminal/POSTerminalPage.tsx` 의 직접 인쇄 블록
- 백엔드 `routes/orders-crud.js` 의 pending-print / printed / kitchen_items

### 절대 규칙
1. **다른 기능 작업 중 위 인쇄 코드를 절대 같이 건드리지 않는다.** 인쇄 무관한 작업이면 인쇄 파일은 열지도 말 것.
2. **인쇄 동작(방식/타이밍/라우팅) 변경은 Irene 명시 요청 + 승인 시에만.** 추측으로 "개선" 금지.
3. **변경 시 반드시 실제 매장 프린터에서 출력 확인** (코드/헤드리스로는 종이 출력을 못 봄 — Irene 눈 확인 필수). 검증 없이 "됐다" 금지.
4. **한 번에 한 가지만**, 변경 후 Irene 확인 받고 다음. 여러 인쇄 변경 동시 금지.
5. **검증된 현재 사실 (건드리면 회귀)**:
   - 주방/빌 프린터(QZ Tray, OS 이름 프린터 예: KITCHEN/KITCHEN 2/BAR/POS-80C)는 **HTML pixel**(`sendHTMLViaQZTray`)로 한글·디자인 정상. raw ESC/POS 는 한글 깨짐.
   - LAN IP 프린터만 raw ESC/POS(`sendViaQZTray`).
   - **KDS = 표시 전용**(자동 인쇄 안 함). 카운터 POS 직접인쇄 + poller 가 인쇄 주체. KDS 도 인쇄하면 **티켓 2장 중복**.
   - `printer-availability 게이트`(qzHasPrinter) 절대 재도입 금지 — 수동인쇄까지 막았던 사고.
   - station 라우팅은 item.kitchen_station_id 로 분배(`enrichItemsWithStation`/`resolveProductId`). +Round 는 printed_at 히스토리로 추가분만.
6. 자세한 단일 진실: `docs/PRINT_RULES_MATRIX.md` 🔒 섹션 + 메모리 [[reference_kitchen_print_pipeline]].

---

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

### 🚨 CRITICAL — Build 통과 ≠ Runtime 안전 (v3.37 TDZ 크래시 교훈)

**state-hydration / health-check / build / lint / type check 다 통과해도 실제 runtime 에서 크래시 가능.**
TDZ (Temporal Dead Zone) / hydration error / lazy chunk 초기화 순서 / SSR mismatch 는 **정적 분석으로 못 잡음**.

**운영 critical 페이지 변경 시 실 브라우저 mount 검증 의무**:
- POS Terminal / 모바일 메뉴 / KDS / Floor Plan / 결제 흐름 / 매장 설정
- 검증 방법: Playwright headless 자동 (`scripts/headless-page-sweep.js` 또는 신규 spec)
- 기준: 진입 즉시 크래시 0 + `console.error` 0 + ErrorBoundary fallback 0
- **2026-05-22 사례**: v3.37 운영 배포 모바일 메뉴 TDZ 크래시 → 매장 모바일 주문 차단. state-hydration 0 + health-check 80/80 + build success 다 통과했지만 mount 안 해서 못 잡음. hotfix 즉시 배포.

### E2E (Multi-step UI) 정책

**대상**: 큰 변경 (UI 흐름 추가/변경, 신규 페이지, 결제 흐름 변경) 시 `/검증 --e2e` 실행.

**6 핵심 시나리오**:
a) auth roles — RA/BG/FG/Owner/Supplier/Manager 로그인 + 권한 분기
b) mobile order full flow — 메뉴 → 장바구니 → 결제 → 주문 생성
c) POS Terminal — 주문 + sandbox 결제 + 영수증
d) Floor Plan zone — zone filter chip + 테이블 클릭
e) Settings zones & groups — zone/group CRUD + table QR
f) KDS 자동 진입 — 결제 후 키친 ticket 자동

**필수 룰** (절대 금지 포함):
- **Flaky rate 100%** — 3회 연속 돌려 100% 통과. 95% 기준 X (false negative = 매장 신뢰 손상)
- **LLM auto-fix 범위 한정**: selector / waitFor / locator timing 만. assertion text / network mock drift / 비즈니스 로직 자동 수정 **절대 금지**
- **결제 sandbox 만**: Stripe test card / PayPal sandbox. 운영 webhook URL e2e **절대 금지**
- **운영 데이터 e2e 절대 금지**: demo restaurant (dev: id=38) 만 사용. 운영 매장 주문/결제/재고 변경 차단
- **e2e 통과 ≠ 운영 배포 자동**: 운영 배포는 사람 `/배포` 명시 지시만
- **backward compat 자동 검증**: 옛 데이터 형식 (v1) + 새 코드 → 자동 마이그 검증 시나리오 포함

**API 테스트 패턴** (Node.js 스크립트로 실행):
```bash
# 임시 테스트 파일 생성 → 실행 → 결과 확인 → 파일 삭제
cd /var/www/dev-backend
node test-xxx.js    # Login → API 호출 → 검증 → 원복
rm test-xxx.js      # 반드시 삭제
```

### Health Check (필수 — 모든 검증 마지막 단계)

**개발 완료 후 반드시 실행. 실패 시 "완료" 보고 금지.**

```bash
cd /var/www/dev-backend
node scripts/health-check.js              # 전체 (37+ 테스트)
node scripts/health-check.js --category=security  # 보안만
node scripts/health-check.js --category=auth      # 인증만
node scripts/health-check.js --quiet              # 실패만 출력
```

**5개 카테고리 자동 검증**:
- `auth` — POS Admin JWT, Customer JWT, cross-access
- `security` — 익명 차단 (9건), IDOR 방어 (3건), token 격리
- `pos` — POS 핵심 API 10개 (orders, menu, invoices, dashboard 등)
- `mobile` — 모바일 공개 + customer self-service (8건)
- `payment` — 결제 라우트 위변조 방어 (3건)

**Exit code**: 0 = 모두 통과, 1 = 하나라도 실패 (CI/스크립트 통합 가능)

**언제 실행?**
- 모든 검증 단계의 마지막에 실행 (코드 변경이 기존 기능을 깨지 않았는지 확인)
- 운영 배포 전 반드시 실행
- 새 라우트 추가 시 health-check.js에도 해당 케이스 추가 (영구 안전망 강화)

**규모별 검증 범위:**
- **소**: 해당 API 1~2개 실호출 검증
- **중**: 해당 기능 전체 API 흐름 (생성→조회→수정→재조회) + 연관 페이지
- **대**: 역할별 API 흐름 검증 (Admin, Brand, Foodcourt, Restaurant, Owner)

### 규모별 자동 조절
| 규모 | 기준 | 워크플로우 |
|------|------|-----------|
| **소** | 버그 수정, 텍스트 변경, 단일 파일 수정 | 바로 구현 → **검증** |
| **중** | 기능 추가/수정 (2~5 파일) | 기술 설계 요약 → 승인 → 구현 → **검증** |
| **대** | 신규 시스템, 다수 파일, DB 변경 포함 | **`/기능설계` 스킬 사용** (6단계 구조화) |

**`/기능설계` 스킬 사용 기준 (대규모 전용):**
- 신규 DB 모델 3개 이상
- 신규 라우트 파일 여러 개
- 역할별 UI 페이지 추가
- 외부 연동/결제/이메일 파이프라인
- 6단계: 기능 정의 → API → DB → UI → 코드 → 테스트 시나리오
- 각 단계 Irene 승인 후 다음 진행, 설계 문서 `docs/`에 저장

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

**빌드 실행 규칙 (절대 준수!):**
- **반드시 `run_in_background: true`로 실행** (포그라운드 시 Claude Code가 not responding됨)
- **빌드 실행 후 "빌드 진행 중입니다" 안내** → 완료 알림 오면 결과 보고
- **node_modules/.cache 삭제 금지** (삭제 시 빌드 5분+ 소요, 캐시 있으면 1분 이내)
- **이전 빌드가 실행 중이면 kill 후 새 빌드 시작** (동시 실행 시 메모리 부족)

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

### 타임존 규칙 (절대 준수!)
- **브라우저 로컬 시간 사용 금지** — 모든 날짜/시간 표시는 레스토랑 설정 타임존 기준
- **`toLocaleString`, `toLocaleDateString`, `toLocaleTimeString` 사용 시 반드시 `{ timeZone }` 옵션 포함**
- 타임존 소스: `operationSettings.timeZone` (StoreContext) 또는 `getStoreInfo().timeZone`
- **유틸 함수**: `formatDateTime()`, `formatDate()`, `formatTime()` (utils/dateFormat.ts) 사용 권장
- 새 코드에서 `new Date().toLocaleString()` (타임존 없이) 작성하면 즉시 수정

```javascript
// ❌ 금지 — 브라우저 로컬 시간 사용
date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' });

// ✅ 올바름 — 레스토랑 타임존 사용
date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', timeZone: storeInfo.timeZone });
```

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

## 기능 확장 시 필수 체크리스트

새 기능을 추가하거나 기존 기능을 확장할 때 아래 항목을 반드시 점검한다.

### 이메일 알림 연동
- [ ] 새 이벤트가 이메일 알림이 필요한지 확인
- [ ] 필요하면 `NOTIFICATION_CATEGORIES`에 카테고리 추가 (`notification-settings.js`)
- [ ] `sendNotification` 또는 `sendNotificationBatch` 호출 시 카테고리 문자열 전달 (2번째 인자)
- [ ] 이메일 템플릿: `emailLayout(bodyContent)` 사용 (첫 번째 인자가 bodyContent)
- [ ] 로고 첨부: `sendPlatformEmail`은 CID 자동 감지, `sendNotificationBatch`는 `attachments: getLogoAttachment()` 포함
- [ ] URL: 하드코딩 금지 → `process.env.FRONTEND_URL || (NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com')` 사용
- [ ] Comment 모델 ENUM 확장 시 → `Comment.js`, `CommentRead.js`, `comments.js validTypes` 3곳 모두 수정

### DB 스키마 변경
- [ ] 모델 + DB 테이블 + `models/index.js` association + export 모두 확인
- [ ] ENUM 추가 시 → 모델 파일 + ALTER TABLE 쿼리 모두 실행

### 프론트엔드 연동
- [ ] 새 Admin 메뉴 → `MainLayout.tsx` 사이드바 + `App.tsx` 라우트 + lazy import
- [ ] 새 공개 페이지 → `LandingHeader.tsx` GNB + `App.tsx` 라우트 + static import
- [ ] API 응답 필드명 일치 확인 (snake_case ↔ camelCase 매핑)
- [ ] 인터페이스 타입과 실제 API 응답 구조 대조
- [ ] **주소 입력**: `<AddressFields />` 공용 컴포넌트 사용 (직접 input 6개 쪼개지 말 것). `docs/ADDRESS_STANDARDIZATION.md` 참조
- [ ] **주소 표시**: `formatAddress(addr, format, locale)` 유틸 사용. `[a, b, c].filter(Boolean).join(', ')` 패턴 금지
- [ ] **Country**: CHAR(2) ISO 3166-1 alpha-2 (`MY`, `KR` 등). 풀네임 저장 금지. 표시명은 `getCountryName(iso2, locale)` 또는 `<AddressFields>` 의 select

### 콘텐츠 연동
- [ ] 새 기능/페이지 추가 시 FAQ 페이지에 관련 Q&A 추가 필요 여부 확인
- [ ] 블로그에 기능 소개 콘텐츠 필요 여부 확인
- [ ] Landing 페이지(Features, Pricing 등) 업데이트 필요 여부 확인
- [ ] 운영 DB에도 콘텐츠 동기화 필요 시 배포 스크립트에 포함

### 다국어 (i18n) 연동
- [ ] 새 페이지/컴포넌트에 하드코딩 텍스트가 없는지 확인 → `t('ns:key')` 사용
- [ ] 새 도메인 용어 → `public/locales/glossary.json`에 먼저 추가
- [ ] 해당 namespace의 4개 언어 파일 모두에 키 추가 (en → ko → zh → ms)
- [ ] `npm run i18n:verify` 통과 확인
- [ ] 새 이메일 템플릿 → 백엔드 `locales/` 4개 언어 모두 추가
- [ ] 모듈 스코프(컴포넌트 함수 밖)에서 `t()` 호출 금지 — React hook은 컴포넌트 안에서만 사용

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
