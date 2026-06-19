# 시재/현금관리 — 교대 마감(Cash-up / Z-Report) 설계

> 출처: with MIN Cafe 운영 피드백(2026-06-18) "시재관리 필요. 현금결제 기록·항목 사전등록, 마감 때 캐시/카드(종류별)/기타 집계 + 실제 잔액 입력·대조(오차 안내), 마감현금=익일 시작현금, 캐시드로어 자동열림, 마감 최종토탈 프린트(데일리스테이트먼트는 체크 전, 이건 체크 완료 후)."
> 상태: 설계 + 구현 진행(2026-06-19). 업계표준 POS Cash-up/Z-Report 정렬.

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
- **Phase 2**: PaymentMethodSetting 사전등록 + ZReport 프린트 정식화 + 캐시드로어 수동오픈(billPrint 🔒 → Irene 승인+실프린터) + 인출/입금(paid in/out).

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
