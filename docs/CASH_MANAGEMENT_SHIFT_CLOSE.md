# 시재/현금관리 — 교대 마감(Cash-up / Z-Report) 설계

> 출처: with MIN Cafe 운영 피드백(2026-06-18) "시재관리 필요. 현금결제 기록·항목 사전등록, 마감 때 캐시/카드(종류별)/기타 집계 + 실제 잔액 입력·대조(오차 안내), 마감현금=익일 시작현금, 캐시드로어 자동열림, 마감 최종토탈 프린트(데일리스테이트먼트는 체크 전, 이건 체크 완료 후)."
> 상태: 설계 + 구현 진행(2026-06-19). 업계표준 POS Cash-up/Z-Report 정렬.

---

## 0. 재설계 v2 (2026-06-20, Irene 정정) — **두 기능으로 명확히 분리**

> 정정 배경: 초판이 "Cash Up" 단독 메뉴 하나에 (현금시재 + 전수단 마감)을 섞어 혼란. Irene 지시로 **시재관리(현금 책임관리)** 와 **최종 마감(전수단 실제입력 대조)** 를 분리하고, 마감은 기존 **Daily Settlement** 와 연결한다. 업계표준(아래 출처)과 정렬.

### ① 시재관리 (Cash Management / 현금 드로어 책임관리) — 현금 전용, **POS 권한 스탭**
- 목적 = **현금 책임 추적**. "넣다/뺐다"가 핵심이 아니라 **개시·예상·실제·차이·이월**의 현금 회계.
- 흐름: 개시현금(float, 직전 마감현금 자동제시) → 영업 중 현금 입금/출금(paid-in/out, 부차) → **예상현금 = 개시 + 현금매출 − 현금출금**(자동) → 마감 시 **실제 현금 블라인드 카운트** → **차이(over/short)** → 마감현금 일부를 **다음 교대 개시현금으로 이월**.
- 위치: 사이드바 "시재관리"(cash-drawer), **access_pos 권한**(캐셔/스탭). ✅ 1단계(메뉴·권한·라우트·i18n) 완료(커밋 3f9cde2d).

### ② 최종 마감 (Final Settlement / Tender Declaration) — **전 결제수단**, 매니저, **Daily Settlement 연결**
- 목적 = 카드기·이월렛이 POS와 금액 **연동 안 되므로**, 마감자가 **실물 확인 후 실제 금액을 수단별로 직접 입력 → 시스템 예상과 비교 → 문제(차이) 표시**. 이게 **실제 파이널 마감**.
- **Daily Settlement = 예상(시스템 기록) 측.** 마감자가 그 옆에 **실제** 입력:
  - 현금 = 시재관리 카운트값
  - **카드(종류별) = 카드 단말기 배치 정산 출력**을 보고 입력
  - QR / 이월렛 = 각 앱/정산 화면 확인 후 입력
- 시스템: 수단별 **예상 vs 실제 → 차이(over/short) + 문제 플래그**. 확정(close) → **Z-Report**(수단별 예상/실제/차이 + 마감현금).
- 위치: 기존 **Daily Settlement**(플로어플랜·라이브오더·리포트에 이미 있음)에 **"최종 마감(실제 입력·대조)" 단계 추가**. 매니저(RA/Owner) 게이트.

### 데이터/엔진 — 대부분 이미 존재 (UI 연결이 핵심)
- 백엔드 `computeExpected` = 수단별 예상 SUM(현금·카드타입·other=QR/이월렛) — **있음**.
- `reconcile` = 실제 입력 → 수단별 variance — **있음**.
- 모델 CashierShift / CashReconciliation / CashMovement / PaymentMethodSetting — **있음**.
- 즉 **엔진은 있고, "예상 옆 실제 입력칸 + 수단별 차이표"를 Daily Settlement 에 붙이는 UI** + 시재/마감 화면 분리가 남은 작업.

### 업계표준 근거 (조사 2026-06-20)
- **블라인드 카운트**(예상 안 보고 실물 먼저) → expected − counted = variance(over/short).
- **카드는 단말기 배치 정산서 출력**으로 POS 합계와 대조(미연동 보완) = "tender declaration".
- **Z-Report** = 수단별 매출/예상현금/차이 마감 문서. 출처: growexx End-of-Day Reconciliation / restaurantassociation Balance a Cash Drawer / Lightspeed Money In-Out / MS Dynamics shift-drawer management.

### 구현 단계
1. ✅ 시재관리 메뉴/권한/라우트 분리 (완료)
2. ⬜ 시재관리 페이지를 **현금 책임관리 전용**으로 정리(개시·예상현금·블라인드 현금카운트·차이·이월·입출금·드로어). 전수단 reconcile/close 제거.
3. ⬜ Daily Settlement 에 **"최종 마감" 단계** 추가: 수단별 예상(좌) + 실제 입력(우) + 차이 + 확정 close + Z-Report. (⚠️ Z-Report 인쇄는 🔒인쇄규칙 — Irene 승인+실프린터 확인. 기존 print 로직 무수정, 신규 섹션만 추가.)
4. ⬜ 마감 이력(shift/history) 화면.

---

## 1. 현재 상태(실측) — 전무, 신규 구축
- Shift/CashDrawer/Reconciliation 모델·라우트·페이지 **0**.
- 재사용 토대: `OrderPayment`(payment_method/card_type/amount_received/change_amount/cashier_id) · `dashboard.js reports-summary`(수단별 집계) · `DailySettlementPrint.tsx`(영수증 UI 템플릿) · `billPrint.js` 드로어킥(현금결제만, 🔒보호파일 — 읽기전용).
- 타임존: 모든 날짜/집계는 매장 타임존(getRestaurantTimezone) 기준 — [[reference_deploy_schema_drift]] 주의.

## 2. 핵심 개념
- **교대(Shift)** = 한 캐셔(또는 단말)의 영업 구간. open(개시현금 입력) → 영업 → close → reconcile(대조) → Z-Report.
- **개시현금(opening float)** = 전 교대 마감현금(closing balance)을 자동 제시. 첫 교대만 수기.
- **예상금액(expected)** = 교대 구간 주문의 결제수단별 합(현금=받은금액−거스름, 카드=종류별, 기타). order_payments 기준.
- **실제금액(actual)** = 캐셔가 마감 시 직접 입력(현금 카운트, 카드 단말 정산액 등).
- **차이(variance)** = actual − expected (현금은 개시현금 포함 계산). 양수=초과/음수=부족. 오차 사유 안내.
- **Z-Report** = 대조 완료(승인) 후 발행하는 마감 최종 문서(데일리스테이트먼트와 별개; 이건 체크 후).

## 3. 데이터 모델 (신규, restaurant_id 스코프)
### CashierShift
`id, restaurant_id, cashier_id, cashier_name, business_date(YYYY-MM-DD, 매장tz), opened_at, closed_at, opening_float DECIMAL, status ENUM('open','closed','reconciled'), timezone, notes`
- 매장당 동시 open 교대 1개 권장(MVP: 단일 활성 교대). status 흐름 open→closed→reconciled.

### CashReconciliation
`id, shift_id FK, restaurant_id, expected JSON({cash, card:{visa,master,...}, other:{...}}), actual JSON(동일 구조), variance JSON, cash_counted DECIMAL, closing_balance DECIMAL(다음 개시현금), reconciled_at, reconciled_by_id, reconciled_by_name, status ENUM('pending','matched','variance','approved'), notes`

### PaymentMethodSetting (사전등록, 선택적 — Phase 2)
`id, restaurant_id, method_key, label, type ENUM('cash','card','ewallet','other'), sort_order, enabled`
- MVP는 order_payments 의 실제 사용 수단을 동적 집계 → 사전등록은 Phase 2 편의.

### ZReport
`id, shift_id FK, restaurant_id, summary JSON(주문수·총매출·수단별), reconciliation_id FK, closing_balance, generated_at, generated_by, printed_at`

## 4. API (restaurant 스코프 + 권한: RA/Owner/권한직원)
| 메서드 | 경로 | 동작 |
|--------|------|------|
| GET | `/restaurant/:rid/shift/current` | 현재 open 교대 (없으면 null) |
| POST | `/restaurant/:rid/shift/open` | `{opening_float}` → 교대 open (이전 마감 closing_balance 자동 제시) |
| GET | `/restaurant/:rid/shift/:id/expected` | 교대 구간 order_payments 수단별 예상 집계 |
| POST | `/restaurant/:rid/shift/:id/reconcile` | `{actual:{cash,card{},other{}}, cash_counted, notes}` → variance 계산 + CashReconciliation 저장(status matched/variance) |
| POST | `/restaurant/:rid/shift/:id/close` | 교대 close (reconcile 후) + ZReport 생성 + closing_balance 확정 |
| GET | `/restaurant/:rid/shift/history` | 과거 교대/Z-Report 목록 |

- **예상 집계**: 교대 opened_at~now(또는 closed_at) 사이 `order_payments`(paid_at)를 수단별 합. 현금 expected = Σ(현금결제 amount). closing_balance = opening_float + 현금 expected − 현금 인출(MVP 인출 0). variance.cash = cash_counted − (opening_float + 현금 expected).
- **보안**: authenticateToken + checkRestaurantAccess + (RA/Owner 또는 access_pos 직원). 익명 차단.

## 5. 프론트엔드
- POS 내 "마감/시재(Cash-up)" 진입 — Shift 미오픈이면 [개시현금 입력→교대 시작], open이면 [마감하기].
- **마감 워크플로우**: ① 예상 자동 집계 표시(현금/카드종류별/기타) ② 실제 입력(현금 카운트 + 카드 정산액) ③ variance 표시("현금 RM5 초과" 등 + 색상) ④ 승인 → Z-Report 미리보기 → 프린트(billPrint 재사용, 🔒방식 무변경) ⑤ closing_balance가 익일 개시현금.
- 표준 컴포넌트(Modal/FormGroup/CurrencyInput) + 타임존 유틸. AutoSave 아님(명시적 마감 액션).

## 6. 단계
- **Phase 1(MVP, 본 구현)**: CashierShift + CashReconciliation 모델 + open/expected/reconcile/close API + 마감 UI. 현금 중심 대조 + closing_balance carry-forward.
- **Phase 2 (구현 완료 2026-06-20, DEV·미배포)**: 4파트 — ①인출/입금(paid in/out) `CashMovement` 모델+API, 현금예상=개시+현금매출+입금−출금 반영 ②Z-Report 정식화(요약 JSON+`zreport_printed_at` 를 CashReconciliation 에 보관 — 별도 ZReport 테이블 대신 1:1 단순화, 설계 §3 ZReport 갈음) + `printSettlementReport` 호출(빌 인쇄와 동일 경로) ③캐시드로어 수동오픈 `openCashDrawer` 호출 ④`PaymentMethodSetting` 사전등록 CRUD+병합.
  - 🔒 **billPrint.js 무수정** — 기존 export(`printSettlementReport`/`openCashDrawer`)만 CashUpPage 에서 호출. print-guard 8/8 GREEN(방식/라우팅 무변경).
  - **물리 검증 미완**: Z-Report 실제 종이 출력 + 드로어 실제 개방은 **Irene 실프린터 눈 확인 필수**(헤드리스 불가). 배포 후 확인.
  - 마이그: `migrate-cash-phase2.js`(cash_movements + payment_method_settings + cash_reconciliations.zreport/zreport_printed_at, deploy 9a-2 등록). 검증: build0·hydration0·i18n0·print-guard8/8·health101/101·실API 18/18·mount0.
- **향후(미구현)**: 다중 동시 교대(단말별), 인출 사유 카테고리 통계.

### Phase 2 하드닝 (2026-06-20, 30년차 감사 반영) — DEV·미배포
> 적대적 코드리뷰로 발견한 P0/P1 결함 수정. billPrint/orders-crud 등 🔒 보호 파일 무접촉(print-guard 8/8 GREEN).
- **P0 — 취소/삭제 주문 결제 제외**: `computeExpected` 가 cancelled/is_deleted 주문 결제까지 합산해 expected 현금을 부풀려 '가짜 부족'(직원 횡령 누명)을 만들던 결함. dashboard 매출과 동일 규칙으로 제외(스코프 서브쿼리). 실증: 취소60 제외→expected.cash=40.
- **P0 — 권한 게이트**: cash 쓰기 라우트(open/reconcile/close/movement/zreport-printed/payment-methods)에 `requirePosCounter`(현금박스/정산 권한) 적용. 서빙전용 직원 open→403 실증.
- **P1 — 대조 무결성**: reconcile non-open 거부 + **1교대 1대조 upsert**(첫 variance 은폐 방지), 대조 후 movement 잠금(ALREADY_RECONCILED), 대조 없는 close 거부(NO_RECONCILIATION).
- **P1 — 진짜 블라인드 카운트**: `/expected` 가 예상 '금액'을 카운트 전 클라에 보내던 누수 제거 → 수단 키만 전송. 실제 금액/variance 는 reconcile 응답에서만 공개.
- 검증: 적대 API 13/13 + health101/101 + print-guard8/8 + mount0. (잔여 후속: 동시 open DB 유니크 가드, 통화별 variance 임계값.)

### 🔴 P0 근본 수정 — 기대금액이 항상 0이던 결함 (2026-07-26, dev·미배포)

> 운영 실측(읽기 전용 SSH)에서 발견. 이 문서가 §5·§7 에서 "**order_payments 기준**"이라고 적어 둔 전제가
> **현실과 달랐다** — 매장 POS 는 그 원장을 안 쓴다.

- **실측**: 매장 POS 의 결제 완료는 `PATCH /api/orders/:id {payment_status:'completed'}` 로 **주문 행에만** 기록된다
  (`FloorPlanPage.tsx`·`TableDetailPanel.tsx`·`LiveOrdersPage.tsx`). `POST /orders/:id/payments`(분할결제)만 원장을 남긴다.
  운영 최근 7일 결제완료 **408건 중 order_payments 0행**(전 기간 5행), `orders.amount_paid` 도 전부 0.
- **증상**: `computeExpected` 가 원장만 합산 → 교대를 닫는 순간 기대현금·기대카드·기대이월렛이 **전부 0** →
  세어 넣은 현금 전액이 "초과(surplus)"로 표시된다. **아직 사고 없음** — 운영 `cashier_shifts` 3건 전부 미마감,
  `cash_reconciliations` **0건**(마감을 닫은 매장이 아직 없다).
- **수정**: `computeExpected` 에 대시보드와 **같은 폴백 구조**를 도입 —
  주문 1건당 **원장 행이 있으면 그 행들**(분할결제 정확), **없으면 주문의 `payment_method` × `total_amount`**.
  원장이 있는 주문은 폴백에서 제외해 **이중 계상 0**. 취소/삭제/미결제 제외 규칙은 그대로.
- **⚠️ 필터 기준은 대시보드와 의도적으로 다르다** — 마감은 `payment_status='completed'`(드로어에 들어온 돈),
  대시보드는 `status='completed'`(매출). 운영에 **결제완료인데 status 가 served/preparing 인 주문 77건 RM3,042** 가 있어
  status 로 거르면 그 돈이 통째로 빠진다. 그래서 Z-Report 합계와 대시보드 매출은 **항상 일치하지 않을 수 있고 그게 정상**이다.
- **staffMeal(직원식) 제외** — 실제로 받은 돈이 아니라, 포함하면 카운트 화면에 'Staffmeal' 행이 생기고 필연적 '부족'이 난다(운영 9건).
- **Z-Report `payment_count` 도 폴백 반영** — 예전엔 원장 행만 세어 total_sales 는 큰데 건수가 0 으로 찍혔다.
- **창 기준**: 원장은 `paid_at`, 폴백은 주문 `order_date`(주문 행에 결제 시각 컬럼이 없음). 같은 날 교대에선 사실상 동일.
  교대 경계를 넘겨 수납한 주문은 접수한 교대로 잡힌다 — 정확히 하려면 결제 경로(🔒 `orders-crud.js`)가 원장을 써야 해서 **별건**.
- **🔒 보호파일 무접촉** — `routes/cash-management.js` 만 수정(print-guard 8/8).
- **회귀 박제**: `tests/cashup-expected.test.js` 4건(원장 없는 결제 집계 / 취소·삭제 제외 / 미결제 제외 / 원장 우선·이중계상 0)
  → verify-all `contract-tests` 게이트. **고장주입 3/3 검출**(폴백 제거·취소 제외 해제·이중 계상).
- **운영 데이터 대조**: rid=8 오늘 기준 수정 후 기대금액 = **ewallet RM1,851.40(72건)**, 현재 운영 코드 = **0**.

## 8. 프론트 UX 확정 (2026-06-19, 글로벌 POS 표준 + 극단적 단순함)
**원칙:** ① 블라인드 카운트(예상 숨기고 실물 먼저 입력 → 손실방지 표준) ② 1화면 1결정 위저드 ③ 차이=평문+신호등색 ④ 터치 숫자패드(키보드 없음).
**위저드 4단계:** ① 교대 시작(개시현금=직전 마감 자동제시, 숫자패드) → ② 카운트(예상 숨김, 수단별 실제 입력) → ③ 차이 공개(Expected/Counted/Diff + "RM2 short" 평문 + 색 + 마감현금) → ④ Z-Report(수단별 매출·차이·마감현금, Print/Done).
**진입:** 사이드바 `/restaurant/:rid/cash-up` (RA/Owner/access_pos). 상태인지: 교대없음→시작 / 열림→마감.
**디자인:** 표준 Modal/FormGroup, #635BFF 액션, 차이 신호등(#10B981 일치/#F59E0B 소액/#FF6B6B 큰차이), 터치타겟 56px+, i18n cash.* 4언어, 교대시간=매장tz, 색+텍스트 동시(색맹).
**페이지:** `pages/CashManagement/CashUpPage.tsx` (위저드) — 백엔드 §4 API 소비.

## 7. 검증
- 단위: variance 계산(초과/부족/일치), closing_balance carry-forward.
- 실API: open→주문 결제 N건→expected 집계 정합→reconcile variance→close→다음 open 개시현금=이전 closing. 권한(익명401/타매장403). 데모 매장 정리.
- print-guard 8/8(billPrint 무변경) + health + mount + build + i18n 4언어.
