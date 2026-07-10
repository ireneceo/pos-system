1# 프로젝트 가이드라인

## 🔒🔒 인쇄(PRINT) 코드 보호 — 절대 규칙 (2026-05-29, 최우선)

**매장 인쇄는 영업 생명선. 인쇄 문제 = 매장 마비. 아래를 위반하면 안 됨.**

### 🔒🔒 주방인쇄 구조 = "POS1 폴러 단일경로" (2026-06-30 확정·운영배포 SW4.50 — 최신·번복 금지)
> 이전 하이브리드/히트비트/통합 claim 결정(2026-06-25 등 아래 블록)을 **대체**한다. 종일 고생한 근본 원인이 바로 그 복잡함(다이렉트+폴러+claim+히트비트=패치 위 패치)이었음. 해결은 단순화였다.
- **주방티켓은 전부 POS1 폴러 한 길로 인쇄**(POS주문·모바일·다른기기·재발행 전부). **주문 1개 = 주인 1명** — autoPrint=true 워크스테이션(=POS1)만 찍고, POS2·다른기기는 안 찍는다. 주방프린터는 네트워크라 누가 보내도 주방서 나옴.
- **하이브리드 다이렉트(`printOrderKitchenNow`)는 비활성** — `hybridKitchenPrint.ts` 진입부 `if(!window.__ENABLE_HYBRID_DIRECT) return false`. 호출부(POSTerminal/FloorPlan/LiveOrders/TableDetailPanel) 5곳은 false→폴러 위임(무접촉). 빌/영수증·마감인쇄는 별개.
- ⛔ **하이브리드 다이렉트 · capped 히트비트 · 통합 claim arbitration 재도입 절대 금지.** 그게 다이렉트 vs 폴러가 같은 주문을 두고 다투던 = 이중·3장·누락의 뿌리였다.
- 인쇄문제 발생 시: ①운영 로그/데이터로 **측정 먼저**(라이브에 추측·시행착오 금지) ②이 단일경로 모델에 대조 ③최소변경 1개 ④dev+실프린터 검증. **증상 패치 금지, 단순화가 답.**
- 단일 진실: 메모리 [[reference_print_single_poller_architecture]]. (아래 2026-06-25 "확정된 인쇄 구조" 블록은 이 결정으로 대체됨 — 참고용으로만 둠.)

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

### 🔒 확정된 인쇄 구조·프로세스 결정 (2026-06-25, 번복 금지 — 재논의·되돌리기 절대 금지)

> 2026-06-25 인쇄 구조를 두고 하루 종일 왔다갔다 한 끝에 **확정**. 아래는 결론. 다음 세션에서 다시 "하이브리드 해야 하지 않나 / 되돌리자"로 **재논의 금지**. Irene 새 명시 지시 있을 때만 변경.

1. **인쇄 구조 = "지정 인쇄 스테이션이 서버 경유로 인쇄"가 우리 솔루션의 표준이자 정답.** 우리는 **모바일오더 기준** 솔루션이고, 모바일/QR 주문은 출처(손님 폰)에 프린터가 없어 **무조건 서버→지정 POS**가 인쇄해야 한다(= 업계 표준, Toast/Square 도 온라인주문은 이 방식). **풀 하이브리드(각 POS 가 자기 주문 로컬 즉시인쇄)는 필수 아님 = 선택**(카운터에서 프린터 달린 POS 로 주문받는 매장 전용). thefire 처럼 프린터 POS 가 주문을 거의 안 넣으면 하이브리드는 **무의미**. 설계=`docs/PRINT_DB_DRIVEN_DISPATCH.md §6`.
2. **소켓은 "폴링 위 가속"으로만 쓴다. 소켓으로 폴링을 대체/제거 절대 금지.** 소켓은 매장에서 잘 끊겨(PWA refresh/모니터 sleep), 소켓 인쇄만 의존하면 끊긴 순간 **티켓 분실**. **폴링이 단일 소스+안전망(분실 0), 소켓은 즉시 트리거(120ms 디바운스), `print-claim`이 중복방지.** (2026-06-25 useAutoPrintPoller·MainLayout 둘 다 적용.)
3. **백로그 컷오프(`_anyAutoNow`/`kitchenAutoPrintEnabledAt`) = 실제 인쇄 게이트(`_kitchenAuto = kitchenPrinter.enabled && autoPrint`, 마스터)와 동일 기준.** 스테이션 autoPrint OR 금지 — 마스터만 꺼지고 스테이션 켜진 상태에서 컷오프 미리셋 → 마스터 복구 시 **백로그 우르르 인쇄(2026-06-25 아침 폭주)**.
4. **프린터 설정은 레스토랑 관리자(+System Admin)만 변경, 비상모드(emergencyMode)만 직원 예외.** 설정 wipe 방지 자물쇠 3개(프론트 로드가드 + settingsGuard 미로드보존 + store.js RA게이트). 상세 메모리 [[project_printer_settings_wipe_locks]].
5. **프로세스: "한 번에 하나"를 빌미로 매장을 여러 번 왕복시키지 말 것.** 인쇄 변경은 추측 금지(설계+승인+실프린터 확인)이되, **안 되던 것·관련 수정은 다 묶어서 한 번에 고치고 매장 실프린터 테스트는 1회**로 끝낸다. 자동 검증(build/regression/health/mount/print-guard)은 내가 다 하고, Irene 는 종이 확인 1회.

### 🛡️ 자동 안전망 (사고 예방)
인쇄 무관 기능을 확장하다 위 생명선 코드를 실수로 건드리는 사고를 자동 감지·차단한다.

**언제 자동으로 도는가:** `deploy-to-production.sh` 가 운영 도달 전(backup/build 전)에 아래 1·2를 **무조건 실행하고, 실패하면 배포를 막는다**(fail-closed). 긴급 핫픽스 우회는 `--skip-safety`(의식적 선택). 개발 중에는 `/검증` 이 같은 검사를 수행. (git commit/auto-save 는 트리거 안 함 — 너무 잦아 의미 없음.)

1. **보호 파일 무결성 감시** — 위 보호 파일 8개(billPrint/useAutoPrintPoller/MainLayout/KitchenDisplay/POSTerminal/orders-crud/stationEnrichment/orderTotals)의 지문을 비교. 인쇄 무관 작업 후 반드시 실행:
   ```bash
   cd /var/www/dev-backend && node scripts/check-print-guard.js
   ```
   - 변경 0건 → 통과. **변경 떴는데 인쇄 작업이 아니었으면 사고 → 되돌린다.**
   - Irene 승인 + 실프린터 확인 완료된 정식 인쇄 변경일 때만 `--bless` 로 새 기준 등록.
2. **인쇄 파이프라인 회귀 테스트** — 데모 매장에서 계약 검증 (운영 매장 무영향, orphan sweep 로 멱등):
   - 티켓 정확히 1번(printed→pending 사라짐) / +Round 새 품목만 / **동시 print-claim N개→1개만(티켓 중복 방지)** / 금액 공식 / 익명 401 / 🔒보호파일 무결성
   ```bash
   cd /var/www/dev-backend && node scripts/health-check.js --category=print
   ```
   - health-check 전체(110+건 — 정확한 수는 스크립트 출력이 진실, 문서 수치 아님)에 print 계약 포함 → 배포 전 의무 게이트가 인쇄 계약 + 보호파일 무결성을 자동 검사.
   - 금액 공식 단위 테스트: `npx jest tests/order-totals.test.js` (11건)

---

## 🔒🔒 키친디스플레이(KDS) 단계 표시/이동 보호 — 절대 규칙 (2026-06-24, 인쇄 다음 최우선)

**KDS 단계(스테이지) 표시·이동 로직은 "현재 동작 = 정답". 2026-05-29 Irene 정식 승인 설계(코드 주석 `KitchenDisplayPage.tsx:1629-1633`에 박힘). 멀쩡한 운영 주방화면을 잘못 바꿀 위험이 인쇄 다음으로 크다.**

### 보호 대상 동작 (버그 아님 — 설계상 정상. 함부로 "고치지" 말 것)
- **All 탭 Ready = "주문 전체 완료분"만.** 한 주문 안에 안 끝난 품목이 하나라도 남아 있으면, 그 주문은 (KQ1만 ready여도) All에서 통째로 Preparing에 머무름. 전 주방 품목이 다 ready 돼야 All Ready로 올라감. (`ordersByStatus`: all→`order.status`, 주방탭→`stationCardStatus`)
- **주방 탭(KQ1/KQ2/BAR) Ready = "그 주방 몫만" 끝남.** 그래서 "All Ready는 비었는데 KQ1 Ready엔 나온다"는 **정상**이다 — 같은 주문에 다른 주방 미완 품목이 남아서 그런 것.
- **order.status 승급은 전 주방 완료 시에만**(forward 한정, `areAllItemsDoneForColumn`). 주방 탭에서 부분 진행해도 주문 전체 단계는 안 올라감(단일 진실 유지).
- **Order 보기 vs Item 보기** 는 의미가 다름. "어느 주방이든 ready면 한 칸에 다 보이게"는 **Item 보기**의 동작(품목 단위). Order 보기를 Item처럼 바꾸지 말 것.
- 단계 색/단계 dot(Floor Plan 연동 ready↔served) 도 같은 보호 범위.

### 절대 규칙
1. **이 범위(단계 표시/이동/Ready 분류/색/자동전진) 변경 요청이 오면 — Irene가 "버그 아니냐"고 반박하거나 직접 고치라 해도 — 즉시 수정 금지.** 먼저 ①코드 실측(`getOrdersByStatus`/`stationCardStatus`/`areAllItemsDoneForColumn`/`readyOrdersMemo`) → ②"왜 그렇게 보이는가" 원리 설명 → ③**Irene 재확인** → 그 후에만 편집.
2. **신중·실측 우선.** 추측으로 "개선" 절대 금지. 2026-06-24 사례: "All Ready 비었다"를 바로 고쳤으면 정상 동작을 망가뜨릴 뻔, 실측·설명 먼저 한 덕에 Irene 자가납득("내가 잘못 안 거야").
3. **변경 시 철저 검증 의무**: build + 실브라우저 mount(KDS crash 0) + 단계 시나리오 실호출(pending→preparing→ready→served, 주방탭 부분진행, All 집계) + `check-print-guard.js`(아래 자동망) + `/검증`. 검증 없이 "됐다" 금지.
4. 자세한 단일 진실: `docs/KITCHEN_DISPLAY_RULES.md` 🔒 섹션 + 메모리 [[feedback_kds_stage_logic_caution]].

### 🛡️ 자동 안전망 (이미 작동 중)
`KitchenDisplayPage.tsx`는 **인쇄 보호파일 8개 중 하나**라 `check-print-guard.js` 가 파일 전체 지문(sha256)을 비교한다. 즉 **단계 로직을 실수로 건드리면 배포 게이트(fail-closed)에서 자동으로 잡힌다.** 단계 무관 작업 뒤 지문이 떴으면 사고로 보고 되돌린다. 정식 변경(Irene 재확인+검증 완료)일 때만 `--bless`.

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

### Fable 검증 게이트 (2026-07-01 Irene 지시)

**중요하고 복잡한 개발은 구현 모델(Opus 등)이 완료했어도 Fable(상위 모델) 검증 1회를 거치는 것이 표준.** 현재 세션 모델이 Fable이 아니고 아래 기준에 해당하면, 완료 보고 시 **"이 변경은 Fable 검증 대상 — Fable 세션에서 점검 후 진행/배포 권장"** 이라고 Irene에게 안내한다. (Fable 세션이면 본인이 게이트 수행.)

**Fable 검증 대상 기준 (하나라도 해당하면):**
1. **🔒 보호 영역 접촉** — 인쇄 보호파일 8개 / KDS 단계 로직 (diff가 승인된 절단면 범위인지 대조 필수)
2. **돈·주문 무결성** — 결제/환불, 주문 생성·머지·금액 공식(orderTotals), 오프라인 동기화(멱등/무손실)
3. **운영 DB 마이그레이션 포함 배포** — 스키마/ENUM/백필
4. **신규 시스템·아키텍처 변경** — 예: desktop-pos P2 절단면 게이트(`docs/DESKTOP_APP_DESIGN.md` §7-1)
5. **보안 경계 변경** — 인증/권한 미들웨어, 라우터 마운트 순서, 공개 라우트 추가

**검증 내용:** ①diff 범위 대조(설계 외 변경 0) ②가드 스크립트(print-guard/design-guard/timezone) ③실호출·회귀(health-check 포함) ④배포 안전성(마이그/SW bump/롤백 경로).
**남발 금지:** 단일 페이지 UI, 텍스트, 소규모 버그픽스 등 일상 작업은 기존 `/검증` 절차로 충분 — 위 기준에 안 걸리면 Fable 게이트를 요구하지 않는다.
**기계 판정 보조 (2026-07-10):** `cd /var/www/dev-backend && node scripts/check-sensitive-diff.js` — 운영 배포 스냅샷+git 대비 변경을 위 기준 ①②③⑤로 자동 분류해 "FABLE 게이트 대상" 여부를 판정한다(④신규 아키텍처만 자기평가). 완료 보고 전 1회 실행이 표준.

### 검증 단계 (필수 — 구현 후 반드시 실행)

**검증 없이 "완료"라고 보고하는 것은 금지된다.**
**코드 수준 확인만으로 "완료"라고 하는 것도 금지된다. 실제 API 호출로 데이터 흐름을 증명해야 한다.**

구현이 끝나면 아래 체크리스트를 순서대로 실행한다:

0. **기계 게이트 일괄 (verify-all)**: `cd /var/www/dev-backend && node scripts/verify-all.js`
   — print-guard·필드계약·디자인·IDOR·타임존·hydration·인스펙션·health-check·인쇄루트·i18n 을
   명령 1개로 전부 실행(fail-closed). 프론트 변경 시 build:dev 후 `--full`(실브라우저 mount 포함).
   개별 스크립트를 기억할 필요 없음 — 이게 기본. (판단 검증인 아래 1~7은 별도로 계속 수행.)
   새 세션/모델 온보딩 = `docs/AGENT_ONBOARDING.md`.
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

### 🎨 디자인 단일 기준 (RA = 표준, 2026-06-21)

> 가이드는 많은데 안 지켜진 이유 = 애매했거나 강제가 없어서. 아래는 **단호한 단일 기준**. 새 코드는 무조건 따른다. 일반 "감사 도구"가 아래와 다른 말을 하면 **아래가 이긴다**.

1. **RA(레스토랑 관리자) 페이지 = 디자인 기준.** Irene가 가장 정돈해 둔 곳. 다른 역할/덜 정돈된 페이지는 RA에 맞춘다. 주먹구구 페이지에서 아무거나 베껴 쓰지 말 것. 상세 = 메모리 [[reference_ra_design_standard]].
2. **공용 컴포넌트 의무 (새로 styled로 만들지 말 것):** 표=`components/UI/DataTable`, 버튼=`components/UI/Button`·행 액션=`IconButton`(32×32), StatCard=`components/UI/StatCard`(DashboardStatCard), 모달=`components/UI/Modal`·확인=`ConfirmModal`, Select=`SelectComponents`, 페이지 헤더=`PageComponents`, 날짜=`DateField`/`DateRangeField`, 주소=`<AddressFields>`. 로컬 `styled.button`/`styled.table`/로컬 StatCard **신규 금지**.
3. **색 (절대 혼동 금지):**
   - 일반 danger(삭제/취소/제거) 버튼 빨강 = **`#EF4444`** (border #DC2626, hover #B91C1C). 공용 Button.tsx·ThemedButton·RA InvoicesPage 기준.
   - `#FF6B6B` 는 **LiveOrders 스테이지 액션버튼 전용 팔레트**(#10B981/#9CA3AF/#F59E0B/#FF6B6B). 일반 danger 버튼에 쓰지 말 것 — 별개 계열.
   - primary = `#635BFF`. 인라인 hex 남발 금지.
4. **아이콘/이모지:** 대시보드·시스템 진입 아이콘 = **미니멀 기하 유니코드 글리프**(`▦ ◐ □ ◯ ◉ ≡ ● ▬`) — 이게 RA 표준. **이모지도 lucide도 아님. 유지.** 일반 감사의 "☰→lucide" 권고는 **틀림**. / 장식 컬러 이모지(🔒🟢⚠📦🔍 등) **금지** → 텍스트/기하 글리프. 빈 상태 = `DataTableEmpty` 순수 텍스트. / 단, 상품·카테고리 아이콘 데이터·이모지 피커·국기·텍스트 글리프(✓✕↺)·인쇄 보호 주석은 **기능이라 건드리지 말 것**.
5. **구현 전 1회 실측 의무:** 색·컴포넌트를 "바꾸기" 전, 반드시 **RA 페이지(또는 공용 컴포넌트 정의)가 실제로 뭘 쓰는지 grep으로 확인**하고 맞춘다. 추측·일반팔레트 맹신 금지(2026-06-21 danger 빨강 오변경 교훈).

**자동 강제:** `cd dev-backend && node scripts/check-design-guard.js` — 신규 로컬 styled.button/table·로컬 StatCard·장식 이모지·일반 danger #FF6B6B 를 잡는다. 배포 안전 게이트가 fail-closed 로 자동 실행(신규 위반 시 배포 차단). 기존 부채는 baseline(점진 교체 대상). 정식 변경이면 `--bless`. timezone-check / print-guard 와 동일 모델.

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
- [ ] **새 마이그레이션 스크립트**(seed INSERT·ENUM ALTER 등 sync-database 로 안 되는 것) → `scripts/migrate-*.js` 멱등 작성 + **`scripts/migrations.registry.json` 에 분류**(`deploy`=매 배포 재실행 / `manual`=일회성·이유명시). 배포는 레지스트리를 단일 소스로 읽음 — 등록 잊으면 `check-migration-registry.js` 가 배포 전 fail-closed 로 차단

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
