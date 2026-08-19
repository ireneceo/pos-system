# 에이전트 온보딩 — 어떤 모델이든 이 repo에서 안전하게 일하는 법

> 목적: **모델 독립적(model-agnostic) 안전 개발.** 특정 모델의 판단력에 기대지 않고,
> 구조·가드·검증 하니스가 사고를 자동으로 막게 한다. 이 문서는 "입구"다 —
> 규칙의 원본은 항상 `/var/www/CLAUDE.md` (충돌 시 CLAUDE.md 가 이긴다).

## 0. 30초 요약 (이것만은 무조건)

1. **모든 작업은 dev 에서만** (`dev-frontend/`, `dev-backend/`). 운영서버(87.106.78.146)는 원격이고 직접 수정 금지.
2. **운영 배포는 Irene 의 `/배포` 명령이 있을 때만.** 절대 자동/임의 배포 금지.
3. **🔒 인쇄 보호 8파일 + KDS 단계로직은 무관한 작업 중 열지도 말 것** (아래 §2).
4. **검증은 명령 1개**: `cd /var/www/dev-backend && node scripts/verify-all.js` (아래 §3).
5. **검증 없이 "완료" 보고 금지.** 코드 리뷰만으로 "됐다" 금지 — 실제 실행/호출로 증명.
6. 빌드는 `npm run build:dev` 만 (직접 `npm run build` 금지), 반드시 background 실행.

## 1. 시작 절차 (매 세션)

1. `/개발시작` 스킬 (또는 수동으로): `CLAUDE.md` → `.claude/session-state.md` → `DEVELOPMENT_PLAN.md` 앞부분.
2. 진행 중/확정 작업이 없으면 **"지시 대기"로 보고하고 멈춘다** — 임의로 다음 작업을 만들지 않는다.
3. 착수 전 기존 구현 여부를 grep 으로 먼저 확인한다 (이미 있는 걸 다시 만들지 말 것).

## 2. 절대 경계 지도 (건드리면 매장이 멈추는 곳)

| 구역 | 파일/경로 | 규칙 |
|------|----------|------|
| 🔒 인쇄 생명선 (8파일) | `billPrint.js` · `useAutoPrintPoller.ts` · `stationEnrichment.js` · `orderTotals.js` · `MainLayout.tsx` · `KitchenDisplayPage.tsx` · `POSTerminalPage.tsx` · `orders-crud.js` | Irene 명시 요청+승인 시에만 변경. 편집 시 훅이 확인을 요구하고, 배포 게이트(print-guard sha256)가 무단 변경을 차단. 변경 후 실프린터 종이 확인 필수 |
| 🔒 KDS 단계로직 | `KitchenDisplayPage.tsx` 단계 표시/이동/Ready 분류 | "버그처럼 보여도" 즉시 수정 금지 → 실측·원리 설명·Irene 재확인 후에만 |
| 운영 서버 | `production-*` (원격 전용) | 코드/DB 직접 수정 금지. 조회(pm2 logs, curl health)만 허용 |
| PlanQ / Lingo | `/opt/planq/`, `/var/www/lingo/` | 별도 제품 — 이 창에서 수정 금지 (훅이 차단) |
| 가드 baseline | `*-baseline.json`, `print-guard.manifest.json` | 직접 편집 = 가드 무력화. 정식 경로는 각 스크립트의 `--bless` (승인·검증 후에만) |

인쇄 구조의 단일 진실: **주방티켓 = POS1 폴러 단일경로** (CLAUDE.md 🔒🔒 블록). 하이브리드 다이렉트/히트비트/claim arbitration 재도입 절대 금지.

## 3. 검증 — 명령 1개 (기계 게이트 단일 러너)

```bash
cd /var/www/dev-backend
node scripts/verify-all.js --quick   # 정적 가드만 (수 초) — 코드 저장 직후 습관
node scripts/verify-all.js           # 표준: + health-check·인스펙션·인쇄루트·i18n (~1분)
node scripts/verify-all.js --full    # 표준 + 실브라우저 mount sweep (~6분, 프론트 변경 시 build:dev 후)
node scripts/verify-all.js --list    # 게이트 목록 / --only <id> 단독 실행
```

| 게이트 | 잡는 사고 |
|--------|-----------|
| print-guard | 인쇄 보호 8파일 무단 변경 |
| print-field-contract | 빌/주방 티켓 세트 구성품 누락 |
| design-guard | 공용 컴포넌트 미사용·장식 이모지 등 신규 디자인 위반 |
| route-guard | 신규 무방비 `/restaurant/:param` (IDOR) |
| migration-registry | 새 마이그가 배포목록에 미등록 (운영 스키마 드리프트) |
| timezone | 브라우저 로컬시간 사용 (매장 타임존 규칙 위반) |
| hydration | 새 state field 의 defensive merge 누락 (legacy 캐시 crash) |
| dead-handlers | 선언 없는 `setXxx(` 호출 = **클릭 즉시 ReferenceError → 버튼이 통째로 죽음**. 2026-08-19 with MIN #260819-010 에서 Live Orders `Confirm Payment` 가 2.5개월간 죽어 있었다(`setAudioEnabled` — 리팩터로 사라진 setter). **이 프로젝트는 타입검사가 게이트가 아니다**: `typescript@4.9.5` vs `i18next` TS5 `.d.ts` 로 파서가 먼저 터지고 CRA 가 타입오류를 warning 으로만 낸다 → `TS2304` 가 아무것도 막지 못한다 |
| sensitive-diff | (정보성) 민감영역 접촉 → Fable 게이트 대상 판정 |
| inspection | DB 구조 불변식 (공급망/플랜모듈/주문 돈 무결성) |
| health | 전체 회귀 110+ (인증/보안/POS/모바일/결제/인쇄 계약) |
| print-routes | 자동인쇄 전 루트 실제 실행 (방식×프린터×native/web) |
| i18n | 4언어(en/ko/zh/ms) 키 일치 |
| mount | 실브라우저 mount 크래시 0 — RA·BG(page-sweep) + FG·Owner·Supplier·**System Admin·Brand/Foodcourt Manager·`/pos/manager/*`**(roles-sweep), 8역할 (**build 통과 ≠ runtime 안전** — TDZ 교훈). demo 계정 없는 역할은 verify-all 이 DB 계정으로 JWT 직접 서명(`signRoleToken`) — 2026-07-11 커버 갭 해소 |

**verify-all 통과 = 끝이 아니다.** 판단 검증은 별도: 기능의 실제 API Write→Read 왕복,
유저 흐름(로그인→페이지→저장→재조회), 요구사항 대조표(✓/✗). `/검증` 스킬이 전체 절차.

## 4. 민감영역 자가판정 (Fable 검증 게이트)

```bash
cd /var/www/dev-backend && node scripts/check-sensitive-diff.js
```

운영 배포 스냅샷(`.claude/deploy-manifest.json`, 배포 성공 시 자동 기록) + git 대비 변경을
5기준(🔒보호영역/💰돈·주문/🗄️마이그레이션/🔐보안 경계/안전망 자체)으로 자동 분류한다.
**"FABLE 게이트 대상"이 뜨면**: 완료 보고에 "이 변경은 Fable 검증 대상 — Fable 세션 점검 후
진행/배포 권장"을 명시한다 (CLAUDE.md 규칙). ④신규 시스템·아키텍처 변경은 기계로 못 잡으니
스스로 판단해 같은 문구를 붙인다.

## 5. 아키텍처 지도 (최소한)

- **dev-backend** — Express + Sequelize(MySQL). 엔트리는 `server.js` 하나 (app.js 없음).
  `routes/`(API, 500줄↑ 분리) · `middleware/`(auth/security/validation — 보호 API는
  `authenticateToken → requireRole/checkRestaurantAccess` 순서 필수) · `models/`(+ `models/index.js`
  association) · `utils/`(orderTotals=돈 공식 단일소스, settingsGuard=설정 anti-wipe) ·
  `services/` · `scripts/`(가드·마이그레이션·검증).
- **dev-frontend** — React(CRA+react-app-rewired) + styled-components. `pages/`(역할별) ·
  `components/UI/`(공용 — DataTable/Button/Modal/Select/DateField/AddressFields **의무 사용**, 로컬
  styled.button/table 신규 금지) · `contexts/` · `utils/`(billPrint=🔒, dateFormat=타임존).
  디자인 기준 = RA(레스토랑 관리자) 페이지. i18n 4언어 필수.
- **desktop-pos** — Electron 셸(윈도우 네이티브 인쇄, QZ 대체). 자동업데이트 피드 = `*/desktop/latest.yml`.
- **배포 모델** — 깔끔 커밋 없이 **working tree 전체 rsync** (`deploy-to-production.sh`).
  안전 게이트 9개(fail-closed) + post-build 실브라우저 mount sweep + 배포 스냅샷 기록.
  DB 는 `sync-database.js`(컬럼 ALTER) + 명시 마이그레이션 스크립트.

## 6. 흔한 함정 (과거 사고에서 박제 — 반복 금지)

- **새 마이그레이션**: `scripts/migrate-*.js`(또는 `YYYYMMDD_*.js`) 작성(멱등 + 끝에 `process.exit` 필수) +
  dev 실행 + **`scripts/migrations.registry.json` 에 분류** (`deploy`=매 배포 재실행·멱등 / `manual`=일회성·이유명시).
  배포 스크립트가 레지스트리 `deploy` 목록을 단일 소스로 읽는다. 등록을 잊으면 `check-migration-registry.js`
  가 배포 전 fail-closed 로 잡는다(더 이상 하드코딩 목록 아님 — 드리프트 구조적 차단).
- **새 매장 설정 키 = settingsGuard 화이트리스트 등록** (안 하면 저장 시 silent-strip 으로 증발).
- **`sync-database.js --alter` 금지** — 컬럼 드롭 사고 이력. 옵션 없이 사용.
- **모델 getter 가 키를 strip 하는 함정** — Restaurant.js printer_settings 등. 저장 후 재조회로 검증.
- **user 객체는 snake_case** (`brand_id` 등) — camelCase 로 읽으면 undefined.
- **"고쳤는데 매장에서 여전하다" = SW 캐시 옛 번들**부터 의심 (서비스워커 버전 bump).
- **ENUM 확장 = 모델 + ALTER TABLE + (Comment 계열은 3파일)** 모두.
- **이모지 ✅/❌ 대신 텍스트 글리프 ✓/✗** (UI·보고 공통). 장식 이모지 금지 (design-guard 가 잡음).
- **API 테스트 시 기존 계정 비밀번호 변경 금지.** 테스트 파일은 실행 후 삭제.
- **운영 버그 보고 = 물어보지 말고 SSH/DB 로 직접 실측** 후 근본원인으로 보고.
  운영 SSH 는 **`irene@87.106.78.146`** (배포 스크립트와 동일 계정, 키 있음). `root@` 는 안 된다 —
  2026-07-25 에 `root@` 로 시도해 실패하고는 "SSH 불가" 로 단정해 Irene 에게 확인을 떠넘긴 사고가 있었다.
  **읽기 전용**(SELECT·로그·상태 조회)만. 코드·설정 변경은 `/배포` 로만.
- 🔴 **"버튼이 안 눌린다" 신고 = 핸들러 첫 줄들이 실존하는 식별자인지부터 본다.** 선언 없는 `setXxx()`
  호출은 클릭 즉시 ReferenceError 라 **요청이 아예 안 나가고** 화면엔 아무 반응이 없다(2026-08-19
  with MIN #260819-010, Live Orders `Confirm Payment` 2.5개월 사망). 판별법: ①운영 로그·DB 로
  **요청이 서버에 도달했는지** 먼저 확인(도달 0건 = 클라이언트) ②운영 번들에서 그 이름이 **축약 안 된 채**
  남아 있으면 미정의 확정(`grep -o '.\{200\}이름.\{300\}' chunk.js` — 정상 지역변수는 `Ot`,`It` 로 축약된다).
  게이트 = verify-all `dead-handlers`. **이 프로젝트의 TS 타입검사는 게이트가 아니다**(위 표 참조).
- **실패는 반드시 보이게** — `res.ok` 미확인 + `catch(_){}` 무음 + 타임아웃 없는 `fetch` 3종은 전부
  "버튼이 죽은 것처럼 보임"을 만든다. 타임아웃은 신규 유틸 대신 `utils/offlineOrderQueue` 의
  `fetchWithTimeout` 재사용, 사유는 **모달 안**에 띄운다(토스트는 모달 오버레이 뒤로 갈 수 있다).
- **매장 접근 게이트는 아무거나 쓰면 안 된다** — `:id` 가 매장이면 `requireRestaurantScope`,
  리소스면 핸들러 안 `userCanAccessRestaurant`. `checkRestaurantAccess` 는 BG/FG 소유 폴백이 없어
  정상 사용자를 403 낸다. 불변식 `list ⊆ detail` 필수. 단일 진실 = `docs/ROLES_AND_PERMISSIONS.md`.
- 🔴 **권한판정에 `isNaN(parseInt(id))` 금지** — `parseInt('1.16e2')===1` 인데 MySQL 은 `116` 으로 읽어
  **게이트가 검사한 행과 핸들러가 조회한 행이 달라진다**(2026-07-25 앱 전역 우회 실증). `/^\d+$/` + param 고정.
- **보안 테스트는 정수 id 만 쓰면 그 클래스를 영영 못 잡는다** — 지수표기·전각·배열 쿼리까지 넣을 것.
  그리고 **새로 만든 회귀 테스트는 반드시 고장 주입으로 검출력을 증명**한다(조용히 skip 되는 테스트가 실제로 있었다).
- 🔴 **소켓은 join 만 검증해도 안 막힌다** — `socket.to(room)` 은 **가입 여부와 무관하게** 아무 룸에나 쏜다.
  emit 핸들러가 payload 의 `restaurantId` 를 그대로 믿으면 타 매장 화면에 위조 카트·강제 초기화·
  회원 붙이기(로열티 적립)가 가능하다(2026-07-26 봉인). 새 소켓 이벤트는 `canEmitToRestaurant` 를 통과시킬 것.
  회귀 박제 = `tests/socket-auth.test.js`(강제·모니터 두 모드), 게이트 = verify-all `contract-tests`.
- 🔴 **"로그인만 확인"하는 미들웨어가 남아 있다** — `authenticateToken` 만 달고 `body.restaurant_id` /
  `:restaurantId` 를 신뢰하면 타 매장 데이터가 샌다. 2026-07-26 실측 사례: membership 의 `customerSelfOrAdmin`
  admin 경로가 그래서 **타 매장 손님 이름·전화·이메일·포인트 이력**을 200 으로 내줬고, 포인트 쓰기 5개는
  타 매장 손님 포인트를 조작할 수 있었다(호출부 0건인 죽은 라우트여도 게이트는 달아야 한다).
- **프리픽스 마운트 표면의 보호는 "우산"일 수 있다** — `/api/restaurants/:rid/*` 는 inventory-core 배럴 가드가
  **마운트 순서 덕에** 덮고 있다(server.js 라인 순서 의존). 그 순서를 바꾸면 조용히 열린다 —
  라우터 마운트 순서 변경은 보안 변경으로 취급하고 health-check 라이브 403 으로 재확인할 것.

## 7. 보고 규율

- 검증(§3 + 실호출) 없이 "완료" 금지. 실제 실행 결과(출력/응답)를 보고에 포함.
- 민감영역 접촉 시 Fable 게이트 문구 명시 (§4).
- 완료 시 `.claude/session-state.md` + `DEVELOPMENT_PLAN.md` 즉시 갱신 (자동 수행 규칙).
- 남은 것 중 "코드로 불가능한 것"(실프린터 종이 확인 등)은 정직하게 Irene 몫으로 분리 표기.

## 8. 안전망을 확장하는 법 ("피드백 1건 = 불변식 1개")

버그/사고를 고쳤으면 같은 클래스의 재발을 **기계 게이트로 박제**한다. 위치 선택:

| 사고 클래스 | 박제 위치 |
|-------------|-----------|
| DB 구조/완결성 결함 | `dev-backend/scripts/inspection/suites/` 에 불변식 추가 (파일 1개 = 스위트, `{name, run(ctx)}`) |
| 배포 마이그레이션 누락 | `dev-backend/scripts/migrations.registry.json` 에 분류 (guard 가 미분류 차단) |
| API 계약/보안 회귀 | `dev-backend/scripts/health-check.js` 에 케이스 추가 |
| 인쇄 라우팅 회귀 | `dev-frontend/scripts/print-route-guard/cases.js` 에 루트 추가 |
| 코드 패턴 위반 (grep 가능) | `check-design-guard.js` / `timezone-check.js` 류의 baseline 가드 신설·확장 |
| 민감영역 누락 분류 | `check-sensitive-diff.js` 의 CLASSES 에 패턴 1줄 |
| 페이지 runtime 크래시 | `headless-page-sweep.js` 라우트 목록에 추가 |

새 가드는 반드시 **fail-closed 실증**(고장 주입 → exit 1 → 복원 → exit 0)을 하고,
배포 게이트 편입 시 `deploy-to-production.sh` 안전 게이트 블록에 추가한다.
가드 자체를 약화시키는 변경(게이트 제거, baseline 몰래 확대)은 금지 — 근거와 승인 필요.
