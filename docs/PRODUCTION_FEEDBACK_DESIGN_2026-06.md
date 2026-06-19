# 운영 피드백 기획설계 로드맵 — with MIN Cafe (2026-06-19)

> 출처: 운영서버 support/operation 티켓 (with MIN Cafe / IOI Mall Food Court, help@withmin.info, 6/18~19 open). 실매장 실사용 피드백 6건을 코드 실측 후 우선순위·설계 정리. 각 항목 구현 시 해당 기존 docs(괄호)에 상세 반영.

## 우선순위 요약

| # | 항목 | 유형 | 규모 | 우선순위 | 기존 문서 |
|---|------|------|------|:--------:|-----------|
| 1 | 발주 통화 MYR/RM 오류 | 버그(영업차단) | 소 | **P0** | PURCHASE_ORDER_SYSTEM, CONTRACT_PLAN_CURRENCY |
| 2 | QZ 진단 티켓 인박스 노이즈 | 버그/위생 | 소 | **P0** | QZ_TRAY_INTEGRATION |
| 3 | 취소/삭제 사유 설정화 + 감사표시 | 기능확장 | 중 | **P1** | VOID_PIN_GATE_DESIGN |
| 4 | 스탭 PIN 로그인 UI | 기능 | 중 | **P1** | STAFF_ACCESS_AND_IDENTITY_DESIGN |
| 5 | 시재/현금관리 마감(Cash-up) | 신규 시스템 | 대 | **P2** | (신규: PETTY_CASH 인접) |
| 6 | 예약 ↔ 플로어플랜 연결 | 신규 시스템 | 대 | **P2** | RESERVATION_SYSTEM |
| (별) | 발주↔재고↔레시피 구조 정리 | 설계자문/연동 | 중 | P2 | SELLER_PRODUCT_INVENTORY_SYSTEM |

---

## 1. 발주 통화 MYR/RM 오류 (P0 버그)

**문제:** 레스토랑→BG 발주 시 "MYR이랑 RM이 안 맞다" 오류. RM은 MYR의 표시심볼, ISO코드는 MYR — 같은 통화인데 차단.

**근본원인(실측):** `routes/purchase-orders-crud.js:801` 가 `sellerCurrency !== buyerCurrency` **문자열 완전일치** 비교. DB는 ISO `'MYR'` 저장이 원칙이나, 프론트 일부 기본값이 `'RM'`으로 저장됨: `SettingsPage.tsx`, `BrandManagement.tsx`, `OwnerDashboardPage.tsx`, `contexts/StoreContext.tsx`. 한쪽 'RM' + 한쪽 'MYR' → 불일치.

**설계(수정):**
1. **정규화 단일함수**: `utils/currency.ts:156` `SYMBOL_TO_CODE`(RM→MYR) 활용해 `normalizeCurrencyCode()` 백엔드 util 신설. 비교를 `normalize(a) === normalize(b)`로.
2. **저장측 정규화**: 프론트 통화 저장 4지점 기본값 'RM'→'MYR' + 저장 시 정규화(재발 방지).
3. **데이터 마이그**: 운영 DB의 `restaurants/brands/...currency='RM'` → `'MYR'` 일괄(멱등). 표시심볼 RM은 `formatCurrency`가 담당(저장은 ISO).
4. 검증: RM/MYR 혼합 발주 201 통과, 실제 다른통화(SGD 등)는 정상 차단 유지.

**규모:** 소(버그fix + 1마이그). 영업차단이라 최우선.

---

## 2. QZ 진단 티켓 인박스 노이즈 (P0 위생)

**문제:** QZ 프린트 안 쓰는 매장 Support 인박스에 `[QZ Tray] printing diagnostic` 티켓이 쌓임.

**근본원인(실측):** `routes/qz-tray.js:343` `POST /diagnose`가 `support_tickets`를 생성. `auto-*` scope는 이미 억제(353), 자동 텔레메트리도 2026-05-29 비활성(POSTerminal:2588 주석). 남은 생성원 = **수동 "Send diagnostics to support" 버튼**(SettingsPage:6206, scope 없음). 노출 원인: `routes/inbox.js:128` `fetchSupportTickets`가 `customerId`만 필터, `category='technical'` 진단을 매장 인박스에 그대로 노출.

**설계:**
1. **분리**: 진단 티켓 `category='diagnostic'`로 생성(qz-tray.js). `inbox.js`/`support-tickets.js` 매장 조회에서 `category != 'diagnostic'` 제외. System Admin 전용 채널로만 노출.
2. **생성 조건 축소**: 오류시(`connected===false || silentPrint==='failed'`)만 티켓화. 정상 진단은 202 무생성.
3. **기존 노이즈 정리(운영)**: `UPDATE support_tickets SET category='diagnostic'`(또는 status='closed') WHERE subject LIKE '%[QZ Tray]%'. **운영 데이터 변경 → Irene 승인 + 백업 후 실행.**

**규모:** 소. 매장 신뢰 직결.

---

## 3. 취소/삭제 사유 설정화 + 감사 표시 (P1, 현재작업 연장)

**요청:** "아이템삭제·주문삭제 시 사유 넣기/안넣기/필수 를 샵 오퍼레이션에서 선택. **필수가 기본**. 데일리스테이트먼트에 취소를 누가·어느단계·몇건 표시."

**현재상태(실측):** 이번 세션에 LiveOrders+FloorPlan **주문취소** 사유 퀵픽 추가 완료(항상 필수). 아이템보이드는 LiveOrders/FloorPlan 있음, POS Terminal/KDS는 삭제기능 자체 없음. 설정 없음(항상). `orderAuditLog.js:42`에 'Cancellation reason is required' 가드 존재하나 orders-crud는 'No reason provided' 폴백(불일치). 데일리(`DailySettlementPrint.tsx:31`)는 취소 **건수·금액만**, 누가/단계/사유 없음.

**설계:**
1. **3단 설정**: `operation_settings.requireCancelReason ∈ off|optional|required`(기본 required). `settingsGuard OPERATION_KEYS`에 추가(anti-wipe). SettingsPage "Manager PIN Approvals" 섹션 옆에 토글(세그먼트).
2. **UI 게이트**: 사유 퀵픽을 설정값으로 분기 — off=모달 없이 즉시, optional=사유선택+"사유없이 진행", required=사유선택 강제(현 동작). LiveOrders+FloorPlan 아이템삭제/주문취소 4지점 일관.
3. **서버 강제**: orders-crud 취소(1493)·아이템삭제(2409)에서 `required`면 reason 누락 시 400. orderAuditLog 가드와 통일.
4. **감사 리포트**: 신규 `GET /reports/void-cancel-log`(order_actions의 reason/performed_by/from_status/metadata.amount) + 데일리스테이트먼트에 "취소·삭제: N건, 금액, 사유별, 승인자" 블록. Void & Cancel Log 페이지(사장 손실방지).

**규모:** 중. 이번 작업의 완성형(실매장 명시 요청).

---

## 4. 스탭 PIN 로그인 UI (P1)

**요청:** "스탭은 이메일 없는데 ID/비번 로그인 수월하게. 비번 분실 시 RA가 리셋. 아이디=레스토랑ID+PIN?"

**현재상태(실측):** 인프라 대부분 존재 — PIN 로그인 엔드포인트 `POST /api/staff/verify-pin`(staff.js:40), 스탭 email optional, username 네임스페이스 `r{rid}:id`(users.js:384), **RA 비번리셋 완비** `POST /users/:id/reset-password`(users.js:1133, 임시비번 반환·메일없음). **갭=공식 로그인 화면에 PIN 입력 UI 없음** + 스탭이 네임스페이스 username을 모름.

**설계:**
1. **로그인 UI "Staff ID + PIN" 모드**: 로그인 화면에 매장코드(또는 매장 URL 진입 시 자동) + PIN 4자리 온스크린 키패드(터치스크린 전제, 메모리 touchscreen-no-keyboard). `verify-pin` 호출.
2. **백엔드**: `verify-pin`을 정식 로그인 경로로 노출(restaurant scope + PIN). username 노출 제거(스탭은 PIN만).
3. **RA 관리**: StaffManagementPage에 비번/PIN 리셋 버튼 노출(이미 API 있음) + 임시PIN 복사/전달 UX.
4. (장기) 결제기기 블루투스 금액전달은 별도 R&D 메모(범위 밖).

**규모:** 중. API 재사용이라 주로 UI.

---

## 5. 시재/현금관리 마감 (Cash-up) (P2 신규 대형)

**요청:** 현금결제 기록, 마감 시 캐시/카드별 집계 + 실제잔액 입력·대조(오차 안내), 마감현금=익일 시작현금, 캐시드로어 자동열림, 마감 토탈 프린트(데일리스테이트먼트는 체크 전, 이건 체크 완료 후 = Z-Report).

**현재상태(실측):** Shift/CashDrawer/Reconciliation **전무**. 재사용 토대: `OrderPayment`(amount_received/change_amount/cashier 기록 가능), `DailySettlementPrint`(집계 UI), `billPrint.js:1810` 드로어킥(현금결제만, 보호파일=읽기전용), `dashboard.js:570` 결제수단별 집계.

**설계(/기능설계 6단계 권장):**
- **데이터모델 신규**: `CashierShift`(opening_float/opened_at/closed_at/status), `CashReconciliation`(수단별 expected vs actual + variance), `ZReport`(마감문서/closing_balance), `PaymentMethodSettings`(현금/visa/master 등 사전등록·표시명·순서).
- **흐름**: Shift open(개점현금=전일 마감현금 자동제시) → 영업 중 주문 결제수단 사전등록 드롭다운 → 마감 시 수단별 예상금액 자동집계 + 실제 입력 → variance("현금 RM500 초과/카드 RM1000 부족") 안내 → 승인 → ZReport 프린트 + closing_balance가 익일 opening_float.
- **API**: shifts/reconciliations/z-reports 라우트. **드로어 수동오픈**은 billPrint 보호코드라 Irene 승인+실프린터 필수.
- **규모:** 대(모델4+라우트3+컴포넌트4+20~30 API). 업계표준 Z-Report 정렬. 단독 스프린트.

---

## 6. 예약 ↔ 플로어플랜 연결 (P2 신규 대형)

**요청:** 예약 저장 시 해당 날짜 플로어플랜 테이블에 연결·클로즈, 예약정보 표시, 주문 들어오면 예약과 연결, 예약 통계.

**현재상태(실측):** `Reservation`은 `table_number`(텍스트)만, **`floor_plan_table_id` 없음**. `Order.reservation_id` 필드는 **존재하나 미사용**(관계·API 없음). 플로어 테이블 상태에 'reserved'/'closed' 없음(table_cleared 플래그만). 예약 통계 없음.

**설계(단계):**
- **P1 데이터**: Reservation에 `floor_plan_table_id` 추가, Order.reservation_id 관계 정식화(`belongsTo`), 플로어 `tables[].reservation_id`/`reserved_until`/status_ext('available|reserved|occupied|closed').
- **P2 연결**: 예약 Timeline 테이블 배정 시 floor_plan_table_id 자동매칭. 플로어 캔버스에 예약 배지(손님명·시각). 예약시간 테이블 'reserved' 표시.
- **P3 주문링크**: 예약된 테이블에 주문생성 시 `order.reservation_id` 자동세팅 + 예약 arrived→seated 전이. `GET /reservations/:id/orders`.
- **P4 통계/클로즈**: 예약 점유율·노쇼율 리포트. 테이블 일시폐쇄(`/tables/:id/close`, closed_until+reason) — 모바일 예약 가용성에서 제외.
- **규모:** 대(다단계). 단독 스프린트.

---

## (별첨) 발주↔재고↔레시피 구조 (설계 자문)

매장 질문 "레시피·재료·스톡·발주상품 연결 구조?" — **이미 잘 구축됨**(실측):
```
Recipe ─1:N─ RecipeIngredient ─N:1─ Ingredient(=재고단위, current_stock/track_stock)
Ingredient ─1:N─ IngredientSellerProduct ─→ Supplier/Brand/FoodcourtProduct (발주처별 가격·환산)
Ingredient ─1:N─ InventoryBatch(FIFO, purchase_order_id) / InventoryTransaction(감사)
PurchaseOrder ─1:N─ PurchaseOrderItem(ingredient_id + ingredient_seller_product_id)
PO receive → InventoryBatch 생성 + Ingredient.current_stock += + InventoryTransaction
```
**갭(개선):** ① 발주상품→Ingredient 자동등록 옵션(현재 catalog 수동매핑) ② 발주 receive 시 미등록 재료 자동 stock 등록 ③ **Recipe 조리→Stock 자동차감 미구현**(Order delivered hook). → SELLER_PRODUCT_INVENTORY_SYSTEM / RECIPE_MANAGEMENT_SYSTEM에 연동 설계 추가.

---

## 권장 실행 순서
1. **P0 즉시(소): 통화버그 + QZ 노이즈** — 실매장 차단·신뢰. 1배포로 묶음.
2. **P1(중): 취소사유 설정화** — 이번 작업 완성. 이어서 **스탭 PIN 로그인**.
3. **P2(대): 시재관리 / 예약↔플로어플랜** — 각각 `/기능설계` 단독 스프린트, Irene go 시.
