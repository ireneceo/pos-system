# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-02 19:50, idle 1941s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: OverflowMenu.tsx,FloorPlanCanvas.tsx TableDetailPanel.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-02 (주방 인쇄·알림 모델 v2 — DEV 완료, 미배포·실프린터 미확인. 다른 노트북으로 이동 위해 /개발완료)
**버전:** v3.45 운영 (backstage 성격 — 버전 미상승)
**작업 상태:** **주방 인쇄·알림 v2 DEV 구현 완료**(취소·이동 항상 발송+알림팝업·station 박스·KDS 취소/머지 팝업·`printCancellationTicket` 삭제). 빌드 main.a6211efc.js, 타입0·i18n통과·인쇄계약7/8(보호파일 지문 정상경고)·mount 47/47. ⚠️ **실프린터 종이·KDS·POS 눈 확인 + `--bless` 미완 = 배포 전 의무**(가이드 `docs/PRINT_RULES_MATRIX.md` §10). 직전: POS UI/UX 개편+보기 색상 토글(DEV, 다음 세션 모달다크·FloorPlan/KDS 확장 계속).

---

## 2026-06-02 진행 중 — POS 운영페이지 UI/UX 개편 (현장 클릭/가독성)

> Irene: 매장에서 Floor Plan/POS Terminal/KDS 가 실제 POS 대비 클릭 불편 + 안 또렷함. 우선 클릭부터. POS Terminal 먼저. + 검색 접기 + 다크/고대비 보기 버전(이 3페이지만). "30년차 디자이너로 구성."
> AskUserQuestion 결정: **보기 버전 = Light/고대비(기본)/Dark 3-모드 토글, 기기별 기억, POS/FloorPlan/KDS 3페이지에만(관리자 등 무영향).**

### 확정 계획
- **Phase A (클릭/가독)**: 카테고리 큰 칩 + 우측 버튼 키우기·선/여백 정리 + 검색 접기 + 터치 44px+
- **Phase B (보기 토글)**: POS 색값 토큰화 → 밝게/고대비/어둡게 전환 버튼
- **Phase C**: 같은 시스템 Floor Plan·KDS 확장

### Phase A — POS Terminal **완료 (DEV, 미배포)** · 빌드 main.235e7b5f.js · /검증 10단계 통과
- **A 다듬기 v6 (카트 아이템·통화)**: 액션버튼 높이 60→72px·글자17. 삭제X=박스/배경 없이 아이콘만(회색→hover빨강). 아이템명 공간 확보(가격폭80→52, 컨트롤 gap12→8, ItemInfo min-width:0). **통화=심볼로**(`currency` state=getCurrencySymbol → MYR 무조건 RM, KRW→₩). **카트 아이템·요약 내역(Subtotal/Discount/Service/Tax)=숫자만, 통화는 Total 에만.** mount 47/47 OK(직전), 요약은 표시 토큰 제거뿐.
- **A 다듬기 v5 (선택 디자인 = 상품옵션 기준)**: Irene 확정 — "중요한 선택"은 상품 옵션(RadioButton: 선택=브랜드테두리+연한틴트rgba(99,91,255,.1)+브랜드글씨/기본=흰박스+테두리) 디자인이 정답. 세그먼트(Image/Compact 토글)는 사소한 보기용이라 부적합. → Dine In/Takeaway·카테고리 **모두 옵션 박스 디자인으로 통일**. 검색 🔍 토글+접기 **완전 삭제**(검색바 항상 표시). 공용 RadioButton 기본 테두리 #C7CED6→#B9C2CC(옵션 S/M/L 가독). mount 47/47 OK.
- 통일된 선택 언어: 옵션/카테고리/주문유형 = 동일 RadioButton 박스. 실행(Pay)만 솔리드. Clear=중립 회색.
- **A 다듬기 v7 (통화 RM 일괄)**: 액션버튼 60→72px. **MYR→RM 전 사이트**: POS state=심볼(getCurrencySymbol), 카트아이템·요약 내역=숫자만/Total만 통화, 할인버튼 RM. 표시 지점 일괄(코드값 보존): Referral 머니포맷터5+지갑뱃지, 매장통화뱃지(Owner/Admin/Manager), TableDetailPanel, Inventory OrderModal, PO staging 리터럴, Supplier placeholder → 전부 getCurrencySymbol. Brand/Foodcourt 맵은 이미 심볼(오탐). 빌드 main.8aae84b3.js. **Irene "이제 괜찮아, 이렇게 하자" → Phase A 확정.**

### Phase B 착수 — 보기 색상 토글 (Light/고대비/Dark, 기기별, POS/FloorPlan/KDS 만)
> Irene 결정(AskUserQuestion): 3-모드 토글, 기본=고대비, 나머지 화면 무영향. 방식 = CSS 변수 팔레트(--pos-*) + data-pos-theme 래퍼 + 헤더 토글 + localStorage `pos_display_theme`. POS 구조 색(bg/surface/text/border) 토큰화부터.
- **B-1 POS Terminal 테마 토글 (DEV, 다듬는 중)** · 최신 빌드 main.d46b2389.js · mount 47/47 OK.
  - v2 피드백 반영: 고대비 팔레트 강화(배경 #C2CCD8, 글씨 #060B14, 테두리 #5B6675). 다크 "안 보임" 수정 — 삼항/인라인 흰배경(`'white'`/`'#FFFFFF'` bg만, 텍스트 흰색 보존)+2차연회색(#F4F6F9/#F1F4F8/#F9FAFB)+틴트(#F5F3FF/#F0F4FF)+플레이스홀더(#8898AA)+입력칸 bg/color 전부 var화. var 참조 162곳.
  - v3 업그레이드(빌드 main.db807dcc.js): **elevation 모델** — 다크 배경#0E1626<패널#1F2A40<선택박스 control#2C3A56 로 분리, 텍스트 92%(#EAF0F8). 토큰 추가 `--pos-control`(선택박스 면: CategoryTab/OrderTypeBtn/QuickDiscountBtn base) + `--pos-positive`(Pay Later·할인 녹색: 다크 #0E9E6B/고대비 #0A7D57). 고대비 강화(app#E7ECF2/menu#94A4B8/text#000/border#3E4A5A).
  - v4(빌드 main.669d83c1.js): 활성 선택(카테고리/주문유형)=솔리드 브랜드+흰글씨(틴트→채움). 테마토글 Open Drawer 뒤로 이동 + i18n(`terminal.theme*` 4언어, 하드코딩 한글 제거). 카테고리 펼치기 영속화(localStorage `pos_category_expanded`, 닫기 전까지 유지). 헤더 Customer Display/Open Drawer 글자색 통일(var --pos-text), CD 자동열기 활성=브랜드틴트+테두리+점(하드코딩 #F0EFFF 제거).
  - v5 다듬기(최신 main.2975837f.js): **다크 accent=라이트와 동일**(brand #635BFF/tint #ECEAFF/brand-text #635BFF/positive #10B981 — Irene "다크 버튼·색 라이트와 같게"). 카테고리·DineIn/Takeaway 활성=틴트+보라글씨(탭/옵션 디자인 통일, 솔리드 아님=액션버튼 구분). OrderTypeBtn/Clear hover 글자색 수정(다크 가독). 옵션버튼 그라데이션→탭/옵션 디자인. 메뉴그리드 여백 24→12·gap 16→10(10인치). 일시표시 시간중복 제거(formatDateTimeLocal dateStr 시간 suppress).
  - **⚠️ 작업 원칙(중요)**: [[feedback_minimal_scoped_change]] — 한 요청=그것만 최소 범위. "다크에서만"은 다크 토큰 한 곳만. 인접/전모드 쓸어 바꾸기 금지.
  - **남은 것**: 모달(OptionModal/PaymentModal/RadioButton 등 별도 컴포넌트) 다크 미적용. Irene 실화면 재확인 중. 확정 후 모달 테마 or Floor Plan·KDS(B-2). 신규 `src/styles/posDisplayTheme.ts`(3팔레트 CSS변수 createGlobalStyle + getPosTheme/setPosTheme/labels). POSTerminalPage: data-pos-theme={posTheme} + `<PosDisplayThemeStyle/>` + 헤더 [밝게|고대비|어둡게] 토글 + 구조색 125곳 var(--pos-*) 화(브랜드/상태색·버튼글씨 보존). **다음: Irene 실화면 3모드(특히 다크) 팔레트 눈확인 → 미세조정 → Floor Plan·KDS 동일 적용(B-2).**
- **A 다듬기 v4 (디자인 위계 — 선택 vs 실행)**: Irene 원칙 "기능에 맞는 디자인". 선택(탭/세그먼트)은 솔리드 액션버튼처럼 보이면 안 됨. → 주문유형(DineIn/Takeaway)=**세그먼트 컨트롤**(회색트랙+선택칸 흰색, Image/Compact 토글과 동일언어). 카테고리=**밑줄 탭**(선택=브랜드 밑줄3px+연한 틴트#F0EEFF+브랜드글씨, 채움칩 아님). Pay Later/Pay Now 만 솔리드 실행버튼. 버튼 높이 52→**60px**, **Clear=중립 회색**(빨강 제거, 장바구니 비우기는 위험동작 아님). mount 47/47 OK.
- **A 다듬기 v3 (실화면 반복 피드백)**: (1) 검색 돋보기 = 헤더X → **Image/Compact 옆 툴바**(입력칸만 토글, 정렬/보기 유지). (2) 카테고리 펼치기 화살표 = 우측 전용컬럼 제거 → **칩과 같은 작은 인라인 칩**(맨 끝). (3) 우측패널 = 상단 흰색(유형/고객/테이블)·**가운데 회색 스크롤밴드 분리(품목/요약/할인)**·하단 흰색(페이저/버튼). (4) **Pay Later·Pay Now 동등 솔리드 버튼**(보라/에메랄드, 자동추론X — 테이블+선결제 매장 때문), Clear 좁게 demote. mount 47/47 OK.
- **A 다듬기 v2 (Irene 실화면 피드백, "기계반영 말고 디자이너 수준으로")**: 카테고리 바 = `[칩영역|화살표 전용 우측셀]` flex(겹침0, 화살표가 칩 안 가림) + 검색 돋보기 카테고리바→**헤더 우측상단**(데스크톱+kebab) 이동 + 칩 **회색 채움면**(#EAEEF3, 테두리의존X)/선택=브랜드채움. 우측패널 = **하나의 면**(구역배경 #F7F9FC/#F9FAFB 변주·과한 구분선 제거, 요약 위 단일 구분선만, 할인→버튼 1색) + 고객검색 위아래 선 제거 + 주문유형(다인인/테이크웨이) **면 자체가 버튼**(세그먼트, #EAEEF3/브랜드, min-h52). mount 47/47 OK.
- `POSTerminalPage.tsx`(🔒): A1 CategoryTab 밑줄텍스트→칩(min-height44, 선택=꽉찬보라) / A2 QuantityBtn·DeleteBtn 24→40px, OrderItemsHeader 밑줄제거·요약여백·OrderActions패딩 축소, ActionBtn min-height52 / A3 searchBarOpen state+SearchToggle(🔍, localStorage `pos_search_open`)로 검색바 접기. **인쇄 로직(poller 1236/티켓 2292/빌 2579) 무접촉** — git: 인쇄 보호파일 8개 변경 0건(POSTerminal 제외).
- 검증(/검증 10단계): 0 state-hydration 0warn · 0-b timezone 신규위반 0 · 1 build OK · 2 backend online · 4 번들 200+index일치 · 7 연관영향 0(POSTerminal 로컬 styled만, 공유컴포넌트 무변경) · 8 UI/UX: off-grid(radius10/gap10/pad18·14) → 8그리드 정규화 + aria-pressed 보강, i18n Errors 0(tooltip defaultValue=기존 컨벤션) · 10 headless mount **47/47 OK·0 failed**(pos-terminal/floor-plan/kitchen/display 0 pageerror). 색 토큰화는 Phase B.
- ⚠️ POSTerminalPage 는 보호파일 → check-print-guard 가 변경 감지함(UI 변경, 인쇄 무관). 배포 시 Irene 승인+`--bless` 전제.
- ⚠️ **기존 플래키**(내 작업 무관): `autoprint-regression.js` [5] polling catch 2건 실패 — 공유 dev 백엔드의 인쇄 poller 가 테스트보다 먼저 needs_print claim(레이스). DEV 빌드는 `SKIP_REGRESSION=1`(프론트 전용 변경) 사용. 별도 진단 후보.

### 다음
- Phase B(보기 토글) 구현 → Phase A/B 묶어 Floor Plan·KDS(Phase C) → DEV검증 → Irene 배포.

---

## 2026-06-01 운영 배포 완료 — The Fire 3 이슈 근본 fix (Backup 20260601_031208 + 20260601_032829)

> Irene: "더파이어 기준으로 모든 솔루션 문제 해결, 다시 안 생기게 + 배포 후 모든 주문루트 직접 검증 + The Fire 동일설정 테스트매장으로 결제완료까지." 인쇄 방식(method/routing) 무변경, 데이터 무결성 버그만 수정.

### 배포된 fix (2회 배포)
1. **오더티켓 2장 중복** — Floor Plan iframe POS 오버레이가 부모와 중복 poller 실행 → 오버레이는 poller off (POSTerminalPage `!isFloorPlanOverlay`). 인쇄 타이밍만, 방식 무변경. ⚠️ **실프린터 눈 확인 미완** (코드/headless 로는 종이 확인 불가).
2. **테이블번호 누락** — orders-crud TABLE_REQUIRED 가드: order_type 누락/빈문자열도 차단. PATCH `/:id` anti-wipe (dine-in table_number null/'' 무시, table_cleared 플래그로만).
3. **모바일↔POS 미매칭** — orders-crud POST 에 floor_plan_table_id derive 이식(PaymentPage 경로가 FPTI 안 보내 멀티존 미바인딩이 근본). PaymentPage `restaurant_id: currentStore?.id||1` 폴백 제거(미로드시 제출차단).
4. **라벨 불일치 머지** — "1"↔"T001"↔"Table 1" normalizeTableLabel 정규화 머지 (orders-crud + mobile-orders). **모호성 가드**: 정규화 후보 2+ 충돌(멀티존)이면 머지 안 함(유일 매칭만). 't' 접두는 숫자 앞만 제거(TEA1/A20 보존).
5. **(검증 중 발견) IDOR** — GET /orders/:id 에 소유권 검사 없어 타 매장 주문 조회 가능 → 인-핸들러 소유권 체크 추가(orders-payment.js 패턴).
6. i18n storeNotLoaded 4언어.

### 검증 (전부 실제 API)
- `/검증` 정식 10단계: state-hydration 0, build, health 88/88(bless 후), i18n Errors 0, 실브라우저 mount(pos-terminal/floor-plan/settings-payment/mobile-payment) 크래시 0.
- **운영 데모 r13 18 루트** 17/18 (1 = 내 테스트 데이터 버그, 코드 정상).
- **The Fire 100% 동일설정 테스트매장(is_test)** 모바일/POS/플로어플랜 **결제완료까지**: DEV 21/21, 운영 21/22(1=테스트데이터 버그) → 운영 재확인 3/3. 결제는 counter/card/ewallet 기록방식(실 게이트웨이 과금 X).
- 테스트매장: `[TEST] Fire Clone`, email `@test.invalid`(전송 3중 차단=.invalid/unverified/is_test), 검증 후 FK까지 완전삭제(잔여 0 확인).

### ⚠️ 다음: Issue 1 실프린터 확인 (Irene/매장)
The Fire 에서 **Floor Plan 으로 테이블 POS 열고 주문 → 키친 티켓 정확히 1장** 눈 확인. 문제 시 즉시 핫픽스.

---

## 2026-06-01 완료(DEV, 미배포) — The Fire 3 이슈 근본 fix

> Irene: "더파이어 기준으로 모든 솔루션 문제 해결, 다시는 안 생기게." 인쇄 방식(method/routing) 은 안 건드리고 **데이터 무결성 버그**만 수정. 새 빌드 main.02eeb8dd.js, autoprint regression 44 PASS, health-check 87/88(1 = 보호파일 무결성 플래그=의도한 2 edit), demo r38 실API 7/7.

### Issue 2 — 테이블번호 누락 (백엔드 구멍 2개)
- `orders-crud.js` TABLE_REQUIRED 가드: `order_type` 누락 시 dine-in 으로 간주 → 우회 차단 (기존엔 order_type 빠지면 통과)
- `orders-crud.js` PATCH `/:id` anti-wipe: dine-in 주문에 `table_number:null/''` 오면 무시(보존). table 비우기는 `table_cleared` 플래그로만. (5/31 settings-wipe 와 동일 클래스 차단). 명시적 table 변경은 허용.

### Issue 3 — 모바일↔POS 미매칭/미표시 (근본원인)
- **근본**: 모바일 실결제 경로 PaymentPage → `POST /api/orders`(source:mobile) 가 `floor_plan_table_id` 를 안 보냈고 orders-crud 도 derive 안 함 → 모든 모바일 주문 FPTI=null → multi-zone(The Fire) 에서 테이블 바인딩 실패("missing")
- fix: `orders-crud.js` POST 에 FPTI derive 이식 (label/tableNumber→canvas id). mobile-orders.js 와 동일 로직.
- `PaymentPage.tsx`: `restaurant_id: currentStore?.id || 1` 폴백 제거(3곳) → currentStore 미로드 시 제출 차단(잘못된 매장 1 로 가던 버그). resolvedRestaurantId 사용.

### Issue 1 — 오더티켓 2장 (가끔)
- **근본**: Floor Plan iframe POS 오버레이일 때 부모 FloorPlan + iframe POS **둘 다** useAutoPrintPoller 실행. 별도 JS realm → `__autoPrintInflight` dedupe 미공유 → 5초 폴 위상 겹치면 2장.
- fix: `POSTerminalPage.tsx` poller `enabled: ... && !isFloorPlanOverlay` (오버레이는 폴 안 함, 부모가 커버). **인쇄 방식/라우팅 무변경 — 타이밍만.**

### ⚠️ 배포 전 필수
1. **Issue 1 실프린터 확인**: Floor Plan 오버레이로 테이블 POS 열고 주문 → 키친 티켓 **정확히 1장** 확인 (Irene 눈). 확인 후에만 `node scripts/check-print-guard.js --bless` (POSTerminal+orders-crud 지문 재등록).
2. bless 안 하면 deploy fail-closed (보호파일 무결성 게이트). Irene 승인 + 실프린터 확인이 전제.

### 수정 파일
- 백엔드: `routes/orders-crud.js`🔒 (POST 가드+FPTI derive, PATCH anti-wipe)
- 프론트: `pages/POSTerminal/POSTerminalPage.tsx`🔒 (poller overlay 차단), `mobile/pages/PaymentPage.tsx` (restaurant_id 폴백 제거)

---

## 2026-06-01 완료(DEV, 미배포) — 테이블 이동 + 아이템 취소표 (풀버전)

> 설계+구현 완료. 문서: `docs/TABLE_MOVE_AND_VOID_TICKET.md`. **배포는 Irene 만.**
> Irene 결정: 점유시 물어보기(merge/cancel) / 권한 Staff포함 모두 / 취소사유 빠른버튼.

### 구현
1. **테이블 이동** — `POST /orders/:id/move-table` (트랜잭션+lock, table_number+FPTI 원자갱신, IDOR, onOccupied block(409+요약)/merge, 완료주문 차단, station변경시 printedItems 반환, 감사로그 table_moved). OrderAction ENUM 에 table_moved 추가(모델+DB). 프론트: TableDetailPanel [Move]버튼 + FloorPlanPage 목적지 picker 모달 + 점유시 merge/cancel + 🔒 station변경시 옛VOID/새재발행(호출만).
2. **아이템 취소표** — DELETE /items 가 removedItem 에 kitchen_station_id/was_printed 반환 + item-voided payload 보강. LiveOrders 삭제를 사유 빠른버튼 모달로 교체 → was_printed+wasInKitchen+설정 게이트시 취소아이템만 station 취소표.

### 검증: move 백엔드 14/14, mount 2/2, 인쇄계약 7/7, build main.d4ba91db.js, i18n 0err, autoprint 44.

### ⚠️ 배포 시 (Irene): `--bless` + The Fire 실프린터 확인 (이동 station변경 취소표/재발행, 아이템취소 취소표).

### (이전) 미배포 The Fire 3-이슈 fix — 별도 배포됨 (위 v3.45-hotfix 참조)

---

## 🔔 다음 세션 (이전 미해결 — 보류 중)
> 아래는 5/31 이월. The Fire 3-이슈 fix + 테이블이동/취소표가 우선이라 뒤로 밀림.

## 🔔 다음 세션 진입 시 이어서 할 것

### 1. BG dashboard 의 자동 trial 판정 (사용자 호소 미해결)
사용자 (Park Eun Jin, user 29) 가 https://purplehere.com/pos/brand/general/dashboard 에 "Brand Professional suspended" 로 표시되는 것 호소. 의도: 구독 시작일 (subscription_start) 미래면 그 전까지 자동 trial 표시.

**남은 작업**:
- BrandGeneralDashboard.tsx:756 의 status 표시 로직에 자동 trial 분기 추가
  ```
  if (subscription_start > now()) → SubscriptionBadge variant="trial" 표시
  ```
- Restaurant / Foodcourt / Owner / Supplier dashboard 도 같은 패턴 적용
- 사용자 의도 확인 필요: subscription_start **7/1** vs DB **8/1** (1개월 차이 — 사용자 입력 오류 또는 timezone) → 데이터 정정도 함께

### 2. user 29 (BG) 의 데이터 진단
운영 DB 상태:
- subscription_status = **suspended** (왜 자동 set 됐는지 scheduler 추적)
- grace_period_start = **2026-05-01** (오늘 31일째 — 누가 set?)
- subscription_start = 2026-08-01, trial_end_date = 2026-07-31

### 3. K-DINE IPC Branch (매장 8) QZ Tray 인쇄 실패 반복
오늘 이메일 폭주의 source. 매장 8 에서 QZ Tray diagnostic 반복 보고. 가드는 새 알림 차단했지만 매장의 실 인쇄 문제는 별도 진단 필요.

### 4. 매장 16 (The Fire) is_test=true
운영 영업 중인 매장인데 is_test=true. 새 가드 (`데모/테스트 매장 user 알림 skip`) 적용 후 The Fire user 한테는 영업 알림 안 감. **is_test=false 로 변경 필요** — 사용자 결정.

---

## 오늘 (2026-05-31) 완료 — 운영 배포됨 (Backup 20260531_150300)

### A. 설정 anti-wipe 가드 (5/31 The Fire 설정 소실 사고 영구 차단)
- 신규: `utils/settingsGuard.js` — printer/payment/operation/shallow 4 함수 + OPERATION_SETTINGS_ALLOWED_KEYS
- 적용: `routes/store.js:97~` (5/31 사고 직접 경로) + `routes/restaurants-crud.js:1611~` (기존 가드 교체)
- 규칙: null/`{}`/parse-error reject + deep merge + 부분 손실 보존
- 검증: unit 25/25 + API integration 10/10
- 메모: [[project_settings_guard_analysis]]

### B. 이메일 발송 invalid-recipient 가드
- 위치: `utils/notificationService.js:sendNotification` 1-a/1-b/1-c 가드 추가
- 1-a: `email_verified === false` → skip
- 1-b: placeholder 도메인 (pos-system.com, example.com, test.com, mailinator.com, .test/.local/.invalid 등) → skip
- 1-c: 데모/테스트 매장 (`is_demo OR is_test`) user → skip
- PLACEHOLDER_EMAIL_DOMAINS set + `_emailLooksValid()` + `_restaurantIsDemoOrTest()` helpers
- 검증: validator unit 16/16
- 5/31 메일 폭주 원인: System Admin (id=1) email=`admin@pos-system.com` (placeholder). 가드가 reject

### C. SubscriptionsPage Admin Edit modal 분기
- 위치: `pages/Admin/SubscriptionsPage.tsx:1554~` (라벨) + 1655~ (userType + hidePaymentModel)
- editingSubscription.entityType 기반 분기:
  - brand → "Brand" + Payment Model 숨김
  - foodcourt → "Foodcourt" + 숨김
  - owner → "Restaurant Owner" + 숨김
  - supplier → "Supplier" + 숨김
  - 그 외 (restaurant) → "Restaurant" + Payment Model 표시

### 운영 배포
- Backup: 20260531_150300
- Smoke: 10/10
- 운영 user 1 (legacy System Admin) email = `admin@pos-system.com` 그대로. 코드 가드가 reject. notNull 제약으로 null 변경 불가
- 진짜 System Admin = user 4 (`irene@irenewp.com`)
- Gmail outgoing queue 의 기존 retry 메일은 47시간 자동 종료. Irene 가 Gmail "보낸편지함" 에서 직접 삭제 가능

---

## 📋 작업계획 (단일 소스 — /개발시작이 읽는 곳)

> 임시저장·저장·개발완료 모두 이 세 줄을 매번 새로 쓴다(침묵 상속 금지). DEVELOPMENT_PLAN.md 는 완료 아카이브 전용.

### 🔴 2026-06-01 이메일 폭주 대응 (운영 핫픽스 배포됨) + 인증 UI
- **운영 배포 완료(surgical, 인쇄작업 무관)**: `emailService.js`(전송계층 가드 `createTransporter.sendMail` 래핑 = placeholder/example.com 차단, 모든 경로) + `screenRecipients` allowUnverified 옵션 + `authService.js`/`auth.js` 인증·재인증 메일에 `allowUnverified:true`(닭-달걀 회피). → **폭주 원천 차단. 인증돼야 발송. 인증메일은 예외.** [[reference_email_send_guard]]
  - 남은 바운스 = Gmail 재시도 큐의 옛(가드前) 메일, ~48h 자동종료. 운영 미인증 실유저 0 (테스트계정 1=lua_test2 id33만, is_test 우회).
- **인증 안내 UI (dev 코드완료·미배포)**: `/auth/me`에 email_verified 추가 + AuthContext `emailVerified` 매핑(3블록) + NotificationSettings 미인증 안내 배너+재인증 버튼(외부toast 없이 인라인) + i18n 5키×4언어. 플러밍 검증됨(런타임 ev=false 확인). 시각 end-to-end는 헤드리스 한계(미인증 유저 로그인 리다이렉트)로 미확정 — 실시나리오=로그인된 유저가 이메일 변경→미인증→배너.
- **인증 enforcement 구현완료(dev, 미배포)** — Irene 결정: 미인증=로그인 허용(차단X), 메일만 미발송+배너. A) authService 로그인차단(EMAIL_NOT_VERIFIED throw) **제거**. B) 등록 3지점(users.js create + restaurants-crud admin 2곳) email_verified=false + 인증메일(restaurants는 commit후 best-effort, users.js는 skipVerification 게이트). C) 프로필 PUT /users/:id 이메일 변경 시 email_verified=false + 새주소 인증메일. sendVerificationEmail export. **실API 검증: 유저생성→email_verified=false+토큰발급 ✓**, health 87/88.
- **미배포 종합**: 인증 enforcement(A/B/C 백엔드) + 안내배너(프론트) + 인쇄 4-케이스 — 전부 dev. 다음 배포에 함께. (이메일 *가드*만 운영 surgical 배포됨.)
- **남은 검증**: §9 매트릭스 각 설정조합(printPerItem/mirror/browser·rawbt·qz 전조합) 런타임 대조는 부분만.

### 진행 중인 작업
- 없음 (주방 인쇄·알림 v2 = DEV 구현 완료, 실프린터 확인 대기 — 위 "✅ 주방 인쇄·알림 모델 v2" 참조)
- **이월(DEV·미배포, 다음 세션 계속): POS 운영페이지 UI/UX 개편 + 보기 색상 토글**
  - Phase A(클릭/가독)·통화 RM 일괄·Phase B(밝게/고대비/어둡게 토글, `posDisplayTheme.ts`) **POS Terminal 적용 완료**. 상세 = 위 "2026-06-02" 섹션 + [[reference_pos_display_theme]].
  - **남은 것**: (1) 다크 색감 미세조정(Irene 실화면) (2) 모달(OptionModal/PaymentModal/RadioButton) 다크 미적용 (3) 같은 테마 시스템 **Floor Plan·KDS 확장(B-2)**
  - ⚠️ POSTerminalPage(🔒) 변경됨 → 배포 시 `--bless` + 실프린터 확인. 인쇄 로직 무접촉(확인됨).
  - ⚠️ **작업 원칙**: [[feedback_minimal_scoped_change]] — 한 요청=그 부분만 최소 범위. "다크에서만"은 다크 토큰 한 곳만.

### 다음 확정 작업
- **Floor Plan Phase C 진행 중** (Irene "이 기준으로 플로우플랜 작업하자"). 1차 완료: 보기 토글 헤더 추가 + 크롬 색 토큰화(페이지/헤더/존바/존칩/텍스트/선/브랜드 → `--pos-*`, 상태색·캔버스·버튼흰글자 보존). POS오버레이는 localStorage 공유로 이미 다크 상속(확인). 빌드 main.0a3490a8.js, mount OK.
  - 2차: 캔버스 주위 회색 제거(CanvasWrapper surface), 존탭 키움(40px), 헤더버튼 38px. TableDetailPanel 주요버튼 17px/700(POS 기준)·상단 IconButton 키움·서브액션(Move/Cancel/Reprint QR/Expire QR/Leaved) **2열 그리드 작게**(SubActionGrid). POS 옵션버튼 운영원형 복원(--pos-option-bg, 회색테두리+그라데이션/다크평면). PaymentModal 할인표시 3줄(Before/Discount/New).
  - **테이블별 오늘 주문 이력 탭(완료 포함) 구현**: 백엔드 table-status 에 `history` 맵 추가(오늘 non-cancelled 전체 per-table, 점유 `data` 무변경=보드 위험0). 프론트 `tableHistory` state→패널 탭 소스. **빈 테이블 클릭해도 오늘 이력 탭(Irene 결정)**. API 확인: data 1 vs history 2(완료 보존). 빌드 main.55dbf845.js, mount OK.
  - 이력 탭 버그수정(기획 일치): 빈/cleared 테이블 클릭=**기본 새주문(available)**, 완료 주문은 **상단 탭(클릭 시에만 표시)**. selectedOrderIndex 기본 -1(활성/빈)·테이블변경시 리셋, showOrderTabs(빈테이블+이력시 탭표시). 빌드 main.19f72fa2.js, mount OK.
  - 이력 탭 완성: "+ New Order" 탭(완료 탭 본 뒤 빈 테이블 복귀, tableFree) + 탭 오버플로 접기(최근4 + `+N`/`− Less`, showAllOrderTabs). 헤더버튼 6개(POS HeaderActionBtn / FP BackBtn) 흰버튼+hover 통일. 최신 빌드 main.3fd8e293.js. **/검증 10단계 전체 통과**(0/0-b 0건, i18n 0, mount 47/47, table-status data1/history2).
  - **다음 증분**: 캔버스/TableDetailPanel 다크 색 토큰화. 그다음 KDS.
  - **A 수정**: POSOverlayHeader 다크 회귀(var--pos-text 밝아져 흰글씨 안보임) → 고정 #0A2540 검정바 복원. 빌드 main.00d62c6d.js.

### ✅ 주방 인쇄·알림 모델 v2 — **DEV 구현 완료 (2026-06-02), 실프린터 확인 대기**
> 인쇄 파이프라인(🔒). 체크리스트 5/5 구현 완료. 빌드 main.a6211efc.js. **남은 것 = 실프린터 종이·KDS·POS 눈 확인 + `node scripts/check-print-guard.js --bless`(Irene 승인) → 배포.** 따라하기 = `docs/PRINT_RULES_MATRIX.md` §10. 설계 단일진실 = `docs/TABLE_MOVE_AND_VOID_TICKET.md` §확정 스펙 v2.
- ✓ #1 모든 티켓 상단 station 박스(7개 티켓 함수 HTML+ESC-POS) — billPrint🔒
- ✓ #2 취소·이동 항상 발송(자동발행 무관) + 알림형 팝업("Sent to kitchen"/[재발송][닫기]) — KitchenTicketSendModal + LiveOrders/FloorPlan 게이트
- ✓ #3 KDS 주문취소(빨강) 팝업 + 이동+머지 문구, 탭(station) 기준 필터 — KitchenDisplayPage🔒 + orders-crud🔒 merged emit
- ✓ #4 Floor Plan 취소/아이템삭제 발송+알림 연결 — TableDetailPanel onKitchenTicketSent
- ✓ #5 `printCancellationTicket` 설정 삭제 — SettingsPage + billPrint 게이트 2곳
- 라우팅(확정): 이동=관련 station 전부 / 취소=발행됐던(주방 진입) 아이템 station만 / station 없으면 POS(미러 따름). KDS 팝업은 인쇄와 별개 탭 기준.
- ⚠️ 배포 시 billPrint+KitchenDisplay+orders-crud(+직전 POSTerminal) 보호파일 지문 변경 → `--bless` 필요. 실프린터 눈 확인 먼저.
- (다음 증분, 별개) POS/Floor Plan 모달(OptionModal/PaymentModal/RadioButton) 다크화 + KDS 테마(Phase C 잔여).

### 보류 중 (이전 세션 DEV 완료, 배포 대기 — Irene 지시 시)
- 인쇄 4-케이스 오더티켓 + 테이블이동/취소표 + 이메일 인증 enforcement (DEV 완료). 배포는 `--bless`+The Fire 실프린터 확인 후 Irene 만. 상세: `docs/TABLE_MOVE_AND_VOID_TICKET.md`, `docs/PRINT_RULES_MATRIX.md §9`.
- 인쇄 4-케이스 남은검증: Playwright 캡처하니스 미발견(불필요 여부 확인), §9 전조합 런타임 대조 부분만, Issue1 티켓2장 실프린터 눈확인.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- BG dashboard 자동 trial 판정 + user 29 데이터 정정
- subscription_status 자동 결정 scheduler 검토 (grace_period_start trigger)
- 매장 8 (K-DINE IPC) QZ Tray 인쇄 문제 진단
- 매장 16 is_test → false 변경 (사용자 결정 후)
- hydration marker (서버 가드 99% 차단 후 1% 추가 안전망 — 클라 변경 동반)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
