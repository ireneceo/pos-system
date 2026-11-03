# Fable 설계 — 재고 «미리 안내» 2단계: 매장 주문의 브랜드 재고 부족을 BG 가 보고·막을지 정하고·한곳에서 설정하기 (2026-11-03)

> 종류: `design`(여러 화면이 같은 «가용량» 공식을 나눔 + 설정 구조) · 끝난 뒤 `gate` 1회(구매자 발주 경로에 새 400 · 새 설정 라우트 · 자동 알림).
> 1단계 설계 `.claude/fable-design-20261103-stock-foresight-oneclick-po.md`(구현·게이트 PASS 723d6f8f48aa · 커밋 59e8e3eb7) 위에 쌓는다. 1단계 공식(`utils/reorderMath`)은 바꾸지 않는다.
> 실측 근거는 전부 개발서버 코드·개발 DB(2026-11-03). 운영 DB 는 읽지 않았다.

## Irene 원문 (그대로)
1. «권고대로 진행해 줘. (권고: Fable 권고: Q1 (a) 안내만 — 재고 숫자는 실사 전까지 근사치라 판매를 막지 않는다(믿을 만해지면 막기는 설정 하나로) · Q2 (a) 앱 알림+푸시만 — 조용하고 끄기 쉽다, 메일은 빼고 시작.)»
2. «재고 부족한 거 주문들어오면 브랜드제너럴에서 관리를 하게 해줘. 재고없음 표시되서 문제 인지하게. 그리고 막을지 안막을지는 설정으로 할 수 있게 해야 하는 거 아니야? 재고관리 관련 설정 어딘가에 같이 묶어서 알기 쉽게 안될까? fable 권고대로 a만 해도 돼. 내 말을 참고하고 최종 판단 fable에게 시켜»

---

## 0. 최종 판단 (한 줄)

**기본은 (a) 안내만 — 그러나 «막기» 를 2단계에서 설정 한 칸으로 같이 만든다.** 이유: ① Irene 두 번째 말이 그걸 묻고 있고 ② 막기의 구현이 «보내는 순간 검사 1개» 라 안내용 가용량 계산을 만들면 거의 공짜이며 ③ 기본값 «안내만» 이라 켜기 전엔 아무것도 달라지지 않는다(되돌리기 쉬움). 안내는 **세 자리**에 같은 숫자로 뜬다 — 매장이 담을 때(카탈로그·장바구니) · BG 받은 주문 목록·상세 · BG 재고 화면 띠(1단계). 설정은 **BG 재고 화면 띠 옆 «재고 설정» 한 창**에 모은다(막기 여부 · 아침 알림 · «곧 부족» 기본 포함). 아침 알림은 (a) 앱 알림+푸시만, 기본 켬, 알릴 게 없으면 조용.

| Irene 두 번째 말 | 이 설계에서 |
|---|---|
| «재고 부족한 거 주문 들어오면 BG 에서 관리» | 받은 주문 목록 행에 **«재고 부족 N품목»** 배지 · 상세 줄마다 «가용 3 pack · 부족 2 pack» · 상단 «지금 재고로 다 못 보내는 주문 N건 → 재고 화면» 한 줄 (§5-2) |
| «재고없음 표시되서 문제 인지하게» | 매장 쪽(카탈로그·장바구니) «Brand stock: 12 pack left / Out at brand» + BG 쪽 배지 + 아침 알림 — **같은 가용량 함수 하나**(§3) |
| «막을지 안막을지는 설정으로» | 설정 `short_order_policy = warn(기본) \| block`. block 이면 **보내는 순간**(submit·bulk·정기발주 — 셋 다 같은 함수) 400 `BRAND_STOCK_SHORT`. 담는 건 막지 않는다(§4-3) |
| «재고관리 설정 어딘가에 같이 묶어서 알기 쉽게» | BG 재고 화면 «발주 전망» 띠 오른쪽 **«재고 설정» 버튼 → 모달 하나**(§4-1). 품목별 최소치·사용량은 종전 행 설정, 개인 알림 켜고 끄기는 종전 Notifications — 모달 안에서 그 둘로 가는 링크만 |
| «a 만 해도 돼» | 기본값이 a 다. block 은 BG 가 직접 켜기 전엔 잠잠하다 |

---

## 1. 조사 사실 (실측 · 2단계에 필요한 것만)

1. **매장이 브랜드 물건을 담는 길은 둘** — ① 카탈로그 `GET /api/supplier-catalog`(`routes/supplier-directory.js:656-1000`, 브랜드 상품 행은 `extraData.push({ id, name, …, supplier:{seller_type:'brand'} })` 908-940) ② «내 재고» 행의 공급처 목록 `sellerSources`(세 빌더: `routes/ingredients.js:731` · `routes/restaurants-ingredients.js:465`(product) · `routes/product-ingredients.js:300`(BG 자기 재고)). **둘 다 판매자 재고를 싣지 않는다.** 화면 `NewPurchaseOrderPage.tsx` 가 보여 주는 «In stock N» 은 **구매자 자기 재고**(`row.current_stock`)다 — 브랜드 재고가 아니다.
2. 판매자 상품 상태를 공급처 줄에 붙이는 선례 = `utils/poSellerProductActive.js attachSellerProductActive(sellerSources)` — 세 빌더가 같은 함수를 부르고(`seller_product_active`), 서버 검사 `assertLinesSellerProductActive` 가 **보내는 길 3곳**(`services/purchaseOrderService.submitDraftInTx:436` · `purchase-orders-crud.js:1473` bulk auto-submit · `purchase-orders-workflow.js:382` mark-sent-external)에 있다. 2단계 «막기» 는 이 자리를 그대로 쓴다.
3. BG 받은 주문 `GET /api/seller-orders`(`routes/seller-orders.js:209`) 는 `items`+`ingredient` 만 싣고 `attachShipmentState`(미발송 수) · `attachSellerProductIdentity`(판매 상품명) 를 붙인다. `GET /stats`(280) 가 탭 숫자. 화면 `pages/IncomingOrders/IncomingOrdersView.tsx`(2,327줄 · 상태 칸 1427-1450 에 이미 «N item(s) not yet dispatched» 배지 · 상세 품목 줄 2214-2235 에 «Not dispatched yet» 줄).
4. 출고 차감(`seller-orders.js:854-915`)의 프로덕트→재고 갈래 셋: **레시피**(`product_recipe_id` → Σ qty×레시피양 → `product_ingredients`) · **다이렉트**(`product_ingredient_id` → qty×`directDeductConversion.conv`) · **자체 재고**(둘 다 없고 `product_kind='stock'` → `brand_products.current_stock`, 음수 금지 clamp) · 그 밖(주문제작·서비스) 안 깎음. 1단계 `committedOutboundBrand` 는 앞 둘만 환산(자체 재고 프로덕트는 재고아이템이 아니라 0) — 2단계 «가용량» 은 **자체 재고 갈래까지** 같은 규칙으로 센다.
5. 개발 DB 데모 브랜드(주인 user 22 · 브랜드 10·17): 활성 프로덕트 26 = 자체 재고 17 · 레시피 1 · 다이렉트 8. 미출고 열린 판매 주문 1건(PO 38623 · 매장 38 → 브랜드 10 · submitted). BG 사용자 = 22(Brand General, is_test 0, push_enabled 1) · 2212(Brand Manager, is_test 1).
6. 알림: `inventory_low` 는 `routes/notification-settings.js:51` 정의만(push_only · roles RA·BG·FG — **Brand Manager 없음**) · 발화 코드 0. `services/pushService.sendPushToUser` 가 **앱 안 토스트(`user:{id}` 룸 `notification` 이벤트)+OS 푸시+`push_logs`** 를 한 번에 처리하고 카테고리 OFF·마스터 OFF·조용한 시간을 스스로 지킨다. `sendPushToBrand` 는 **owner 한 명만** 보낸다 — 수신자는 `utils/notificationService.getBrandManagerIds(brandId)`(users.brand_id 의 BG·BM + brands.owner_id) 로 받아 `sendPushToUser` 를 사람마다 부른다. 앱 안 토스트 `components/Common/NotificationToaster.tsx` 는 `url` 을 누르면 이동. 영구 «알림함» 은 없다(토스트+OS 알림이 전부).
7. 스케줄러 선례 = `services/recurringPoScheduler.js`(매 정각 cron → `poScheduleService.runDueSchedules({ now, io })` · 구매자 시간대 07:00 이후 첫 정각 · `utils/poScheduleDates.localParts(now, tz)` · `SchedulerRun 'recurring_po_hourly'`). 브랜드 시간대 = `brands.operation_settings.timeZone`(모델 getter 기본 `Asia/Kuala_Lumpur`).
8. 브랜드 설정 그릇 = `brands.operation_settings` JSON(이미 `sales_access`·`shop_display_name`·영업시간). 읽기 선례 `utils/salesAccess.js`(모르면 닫는 쪽 기본값) · 쓰기 선례 `routes/profitability.js:115-170`(**행 잠금으로 원문을 읽고 그 칸만 바꿔 통째로 저장** — 부분 저장 사고 방지). `PUT /api/brands/company-info` 는 얕은 병합이라 다른 키를 지우지 않는다(151-182).
9. BG 사이드바(`MainLayout.tsx:1663-1810`)에 «설정» 묶음 = My Profile · Company Info · Managers · Notifications · Change History. **BG 전용 설정 화면은 없다**(매장 `SettingsPage` 의 운영 탭은 BG 가 안 본다). BG 재고 화면 = `/pos/brand-inventory` → `InventoryManager mode="brand"` → 1단계 `ForesightPanel`(띠).
10. 1단계 남은 과제: `routes/inventory-core.js:1170` 대시보드 `reorder-suggestions` 리드타임이 `eff.lead_time_days || 2`(품목만) — PO `suggestions` 는 `leadTimeFor(item, link)`(연결까지). 같은 재료에 두 답이 날 수 있다(health-check ③ 은 수량·발주점만 비교하므로 지금은 통과).
11. 구매자 발주 400 선례 모양: `utils/poMinOrder.js MinOrderError {code:'BELOW_MIN_ORDER', status:400, violations}` + `minOrderErrorBody` · 라우트가 `instanceof` 로 받아 `res.status(400).json(body)`. 정기 발주 스케줄러도 `submitDraftInTx` 를 타므로 거기서 던지면 그 회차가 `failed` 로 기록된다.

---

## 2. 범위 (2단계 — 이번에 만든다)

**스키마 변경 0 · 마이그 0 · 인쇄·KDS 보호파일 0 접촉 · 외부 메일 0.** 전부 «읽어서 계산해 보여 주고, 보내는 순간 설정에 따라 400, 아침에 푸시 한 번».

| # | 무엇 | 어디 |
|---|---|---|
| A | **가용량 단일 함수** — 열린 미출고 판매 주문을 접수 순으로 재고에 배정해 ① 프로덕트별 «지금 남은 양» ② 주문 줄별 «부족분» 을 낸다 (§3) | `dev-backend/utils/sellerStockPool.js` (신규) · `utils/reorderMath.committedOutboundBrand` 가 같은 줄 조회를 쓰게 재지향 |
| B | 매장 쪽 안내 — 카탈로그 브랜드 행·«내 재고» 공급처 줄에 `seller_stock` | `routes/supplier-directory.js` · 세 `sellerSources` 빌더 · `NewPurchaseOrderPage.tsx` |
| C | BG 받은 주문 — 목록 배지·상세 줄·요약 수 | `routes/seller-orders.js`(GET / · /:id · /stats) · `IncomingOrdersView.tsx` |
| D | 설정 한 창 — `short_order_policy` · `morning_alert` · `include_soon_default` | `utils/brandStockPolicy.js`(신규, 읽기) · `routes/brand-stock-settings.js`(신규, GET/PUT) · `components/Inventory/modals/StockSettingsModal.tsx`(신규) · `ForesightPanel.tsx` 버튼 |
| E | 막기 — `block` 이면 보내는 순간 400 `BRAND_STOCK_SHORT` | `utils/sellerStockPool.assertLinesWithinBrandStock` · 보내는 길 3곳(§1-2) |
| F | 아침 알림 — 브랜드 시간대 설정 시각(기본 07:00) 이후 첫 정각에 «품절 N · 지금 발주 N» 앱 알림+푸시, 하루 1번, 알릴 게 없으면 조용 | `services/brandStockAlertService.js`(신규) · `services/brandStockAlertScheduler.js`(신규) · `server.js` 1줄 · `notification-settings.js` roles 에 Brand Manager |
| G | 1단계 과제 — 대시보드 `reorder-suggestions` 리드타임을 `leadTimeFor` 로 | `routes/inventory-core.js` · `preferredLinkMap` 을 `utils/reorderMath` 로 이동 |
| H | i18n 4개 언어 · jest · health-check 4건 · 고장주입 3건 | `public/locales/*/{purchaseOrders,brand,inventory}.json` · `tests/seller-stock-pool.test.js`(신규) · `scripts/health-check.js` |

**하지 않는다(기각):** 담을 때(장바구니) 막기 — 담는 건 계획이고 보내는 게 약속이다 · 출고(ship) 막기 — 현행대로 BG 판단(음수 재고는 재고 화면이 보여 준다) · 오너 승인 뒤(approve) 재검사 — 승인 대기 중 재고가 변해도 다시 막지 않는다(막으면 승인 대기가 갇힌다 · 아래 §4-3 한계) · 메일 · 사이드바 재고 메뉴 점(badge-counts) — 받은 주문 메뉴는 이미 새 주문에 켜진다 · FG(푸드코트)·공급업체 판매자 재고 안내 — 같은 함수로 갈 수 있지만 이번은 BG 만(Irene 원문이 BG) · `stock_alerts` 표 확장 · 영구 알림함.

---

## 3. 가용량 — 단일 공식 `utils/sellerStockPool.js` (신규 · 순수 배정 + 조회 2개)

### 3-1. 입력 조회 (전부 `IN (:ids)` 묶음 · N+1 금지)
- `openOutboundLines(brandIds)` — 1단계 `committedOutboundBrand` 의 줄 SQL **그대로**(`seller_type='brand' AND seller_entity_id IN (:bids) AND status IN OPEN_OUTBOUND_STATUSES AND deleted_at IS NULL AND i.shipped_at IS NULL`) 에 **`p.id po_id, i.id item_id, p.submitted_at, p.created_at, p.entity_type, p.entity_id, bp.product_kind, bp.current_stock bp_stock`** 를 더 싣는다. 정렬 = 접수 순(`COALESCE(p.submitted_at, p.created_at), p.id, i.id`) — «먼저 들어온 주문이 먼저 가져간다».
- `lineNeeds(lines)` — 줄 → 필요량 `{ kind:'pi'|'bp', id, qty }[]`. 환산은 **출고 차감과 1:1**(§1-4): 레시피 → `product_recipe_ingredients` Σ · 다이렉트 → `directDeductConversion({stock, sellerProduct}).conv`(호환 안 되면 1 — 출고와 같음) · 자체 재고(`product_kind==='stock'` 이고 둘 다 없음) → `{kind:'bp', id:bp.id, qty}` · 그 밖(주문제작·서비스) → `[]`(안 센다).
- `poolOnHand({ piIds, bpIds })` — `product_ingredients.current_stock` · `brand_products.current_stock`.

### 3-2. 배정 `allocate({ lines, needsByItem, onHand })` (순수 · jest 대상)
```
pool = Map(onHand)                       // pi:{id} → g · bp:{id} → 주문단위
for line in lines (접수 순):
  short_units = 0
  for need in needsByItem[line.item_id]:
    per = need.qty / line.qty            // 주문 1단위가 먹는 양
    left = pool[need]                    // 음수 가능
    take = min(need.qty, max(0, left))
    pool[need] = left − need.qty         // 다음 줄은 이 줄이 가져간 뒤의 양을 본다(음수로 내려가도 기록)
    if (need.qty > take) short_units = max(short_units, ceil((need.qty − take) / per − 1e-9))
  result.lines[item_id] = { short_units, tracked: needs.length > 0 }
result.pool = pool                       // 전부 배정한 뒤 남은 양(= on_hand − committed · 1단계 committed 와 같은 수)
```
- **프로덕트별 지금 남은 양**(새 주문에 안내) `availableUnitsFor(bp, pool)`: 레시피 → `floor(min_i(pool[pi_i] / 레시피양_i))` · 다이렉트 → `floor(pool[pi] / conv)` · 자체 재고 → `pool[bp]` · 그 밖 → `null`(tracked false). 음수면 음수 그대로(«이미 2 pack 모자람» 도 정보다) — 화면은 0 이하를 «Out» 으로.
- `committed(pi)` = `onHand[pi] − pool[pi]` — 1단계 `committedOutboundBrand` 의 답과 **같아야 한다**(health-check ⑦ 이 대조). 그래서 `reorderMath.committedOutboundBrand` 는 본문을 지우고 `sellerStockPool.openOutboundLines + lineNeeds` 를 불러 합만 낸다(줄 SQL 한 벌 · compute·classify 무변경).
- 브랜드 범위 `brandIds` = 재고 주인(`brands.owner_id`)이 가진 **모든 브랜드**(1단계 §3-2 와 같다 — 같은 재고를 여러 브랜드가 깎는다). 판매자 상품 → 주인 = `brand_products.owner_user_id`.

### 3-3. 검산 사례 (jest `tests/seller-stock-pool.test.js`)
| | 입력 | 기대 |
|---|---|---|
| A 둘 다 됨 | pi 2,000 g · 다이렉트 500 g/pack · 주문1 3 pack · 주문2 1 pack | 주문1 short 0 · 주문2 short 0 · pool 0 · available 0 → «Out»(새 주문은 못 받음, 들어온 건 다 보낼 수 있음) |
| B 둘째가 모자람 | 위에서 주문2 2 pack | 주문2 short **1**(500 g 모자람 ÷ 500) · pool −500 · available −1 |
| C 레시피 둘 중 하나 | 레시피 {pi1 100 g, pi2 50 g} · pi1 1,000 g · pi2 120 g · 주문 5개 | pi2 가 250 필요 → 130 부족 → short ceil(130/50)=3 · available = floor(min(1000/100, 120/50)) 전 → 배정 뒤 floor(min(500/100, −130/50)) = −3 |
| D 자체 재고 | bp.current_stock 4 · 주문1 3 · 주문2 3 | 주문2 short 2 · available −2 |
| E 안 세는 종류 | product_kind 'made_to_order' | tracked false · short 0 · available null |
| F 접수 순서 | 주문 B(먼저 submitted) 3 pack · 주문 A(나중, id 작음) 3 pack · 재고 4 pack | **B 0 · A 2** — id 가 아니라 submitted_at 순 |
| G 1단계 대조 | A 의 입력 | `committed(pi) = 2,000` = 1단계 `committedOutboundBrand` 답 |

---

## 4. 설정 — 한 창 · 한 키 · 한 읽기 함수

### 4-1. 어디서 보나 (BG 만)
`/pos/brand-inventory` 상단 «발주 전망» 띠(`ForesightPanel`) 오른쪽, «필요한 것 담기» 왼쪽에 공용 `Button variant="secondary"` **«Stock settings»** → 공용 `Modal` `components/Inventory/modals/StockSettingsModal.tsx`(신규). `mode==='brand'` 이고 `user.role==='Brand General'` 일 때만 보인다(Brand Manager 는 읽기 전용으로 열리되 저장 버튼 없음 · 매장 모드는 없음 — 매장 쪽 재고 설정은 이번 범위 밖).

모달 내용(세 묶음 · 공용 폼 규칙):
1. **매장 주문이 지금 재고보다 많을 때** (라디오)
   - ◉ 안내만 (기본) — «주문은 들어오고, 매장 화면과 받은 주문 목록에 «브랜드 재고 부족» 으로 표시됩니다. 입고로 메우면 됩니다.»
   - ○ 보내기 막기 — «매장이 보내는 순간 막히고, 지금 남은 양 이하로 수량을 줄이라고 안내합니다. 재고 숫자가 정확할 때만 켜세요(실사 전엔 근사치).»
2. **아침 재고 알림** — 토글(기본 켬) + 시각(`SelectComponents` 00~23 시, 기본 07) · «품절·지금 발주 품목이 있을 때만, 브랜드 시간대(Asia/Kuala_Lumpur)로 하루 한 번 앱 알림과 푸시. 받을 사람은 이 브랜드의 관리자 전원 — 개인별로 끄려면 Notifications › Low Stock Alert.»(링크 `/pos/manager/notification-settings`)
3. **«필요한 것 담기» 에 «곧 부족» 기본 포함** — 토글(기본 꺼짐 · 1단계 Q3). 띠의 체크박스 초기값이 된다(체크박스 자체는 그대로 둔다).
4. 바닥 한 줄: «품목별 최소 재고·하루 사용량·리드타임은 각 행의 설정(⚙)에서» — 설명만.

여러 브랜드를 가진 BG(user 22 = 브랜드 10·17): 모달 머리에 «적용: K-Taste Group, K-Dine» 를 보여 주고 **저장은 그 BG 범위의 브랜드 전부에 같은 값**(`brandIdsForUser(user)` — 소유 ∪ 배정). 재고가 주인 단위 한 덩어리(`product_ingredients.owner_user_id`)라 브랜드마다 다른 정책은 뜻이 없다. 읽을 때(막기 판정·아침 알림)는 **그 판매 주문의 `seller_entity_id` 브랜드 행**을 본다 — 값이 없는 브랜드(17 처럼 `operation_settings` null)는 기본값.

### 4-2. 저장 모양 · 읽기 함수
`brands.operation_settings.stock = { short_order_policy: 'warn'|'block', morning_alert: { enabled: boolean, hour: 0..23 }, include_soon_default: boolean }`

`utils/brandStockPolicy.js`(신규 · `salesAccess.js` 와 같은 꼴 · DB 안 읽음):
- `stockSettingsOf(operationSettings)` → 위 모양 전부 채운 객체. **모르면 안전한 쪽**: policy 모르면 `'warn'`(막지 않는다) · morning_alert 모르면 `{enabled:true, hour:7}` · include_soon 모르면 false.
- `isBlockPolicy(operationSettings)`.

라우트 `routes/brand-stock-settings.js`(신규 · `server.js` 에 `app.use('/api/brands/:brandId/stock-settings', …)` — profitability 와 같은 «정확한 경로 마운트»):
- `GET` — `authenticateToken` + 역할 BG·BM·System Admin + `brandIdsForUser(req.user)` 에 `:brandId` 포함(아니면 404 · 다른 브랜드 id 를 넣어도 존재를 안 알린다). 응답 `{ settings, applies_to:[{id,name}] (그 사용자 범위 브랜드 전부), timezone }`.
- `PUT` — BG·System Admin 만(BM 403). 본문 검사: policy ∈ {warn,block} · hour 정수 0~23 · boolean 들 · 모르는 키 버림. **행 잠금 + `stock` 칸만 바꿔 통째로 저장**(profitability.js:146-160 과 같은 코드) 을 **범위 브랜드마다** 한 트랜잭션에서. `ActivityLog`/변경 이력은 발주 승인 스위치 선례(`purchase-orders-approval.js:217` `entity_name:'requirePoOwnerApproval'`) 와 같은 한 줄 — `entity_name:'brand_stock_settings'`, `changes:{from,to}` (block 을 켜고 끈 기록은 남아야 한다 — 매장이 «왜 못 보냈나» 를 물을 때).
- `settingsGuard` 는 매장(`restaurants`) 전용이라 해당 없음. `PUT /api/brands/company-info` 의 얕은 병합은 `stock` 키를 건드리지 않는다(§1-8) — health-check ⑩ 이 확인.

### 4-3. 막기(`block`) — 어디서 · 무엇을
- 검사 함수 `sellerStockPool.assertLinesWithinBrandStock(items, { transaction })`: 줄 중 `ingredient_seller_product_id → seller_type='brand'` 인 것만 모아 **판매 브랜드별**로 ① 그 브랜드 행 `stock.short_order_policy` 가 `block` 인지(아니면 그 브랜드 줄은 통과) ② `openOutboundLines(그 주인의 brandIds)` 로 배정한 **남은 양**(`pool`) 과 이 주문 줄들의 필요량을 비교 — 이 주문은 아직 `draft` 라 열린 줄에 없다(제출 전 검사라 자기 자신을 두 번 세지 않는다). 모자라면 `BrandStockShortError { code:'BRAND_STOCK_SHORT', status:400, lines:[{ item_id?, description, seller_product_name, requested, available_units, order_unit }] }` · 본문 `brandStockShortErrorBody(err)` (poSellerProductActive 와 같은 꼴).
- 부르는 자리 = **`assertLinesSellerProductActive` 바로 뒤, 같은 3곳**(§1-2): `submitDraftInTx:436`(submit + 정기 발주) · `purchase-orders-crud.js:1473`(bulk auto-submit — 여기서 던지면 기존 catch 가 초안으로 남기고 로그) · `purchase-orders-workflow.js:382`(mark-sent-external — 브랜드 판매자는 이 길을 안 타지만 선례와 같은 3곳을 맞춘다). 라우트 `catch` 에 `instanceof BrandStockShortError → 400` 한 줄씩(submit · mark-sent-external · bulk 응답은 기존 `result`/catch 흐름).
- `createPurchaseOrderCore`(담기·초안 합치기)는 **부르지 않는다** — 담는 건 막지 않는다.
- 정기 발주: `submitDraftInTx` 가 던지면 `poScheduleService` 가 그 회차를 `failed` 로 기록한다(§1-11) — 구현 때 그 catch 가 메시지(`err.code`)를 `results` 에 남기는지 확인하고, 없으면 `reason: err.code` 한 칸. 새 재시도 로직은 만들지 않는다.
- **한계(기록)**: 오너 승인 매장은 `pending_approval` 로 서 있는 동안 BG 재고가 더 줄 수 있다 — 승인 때 다시 막지 않는다(막으면 승인 대기가 갇힌다). BG 쪽 배지가 그걸 보여 준다.
- 매장 화면은 서버가 막기 전에 미리 안다: `seller_stock.policy` 를 같이 싣는다(§5-1) — block 인데 담은 수량 > 남은 양이면 장바구니 줄이 빨간 «Brand accepts up to 12 pack right now» 를 보이고, 400 이 오면 `data.lines` 를 그대로 풀어 보여 준다(«최소주문» 400 처리와 같은 자리).

---

## 5. API · 화면

### 5-1. 매장 쪽 안내 (`seller_stock` 한 모양 · 네 곳)
```jsonc
"seller_stock": { "tracked": true, "available_units": 12, "status": "ok" | "out", "policy": "warn" | "block", "computed_at": "…" } | null
```
- `status`: `available_units <= 0 → 'out'`, 그 외 `'ok'`. `tracked:false`(주문제작·서비스·레시피·재고 연결 없음) 면 `null` 로 보낸다(화면이 아무것도 안 붙임).
- 붙이는 곳(함수 하나 `sellerStockPool.attachBrandSellerStock(rows, { bpIdOf, assign })` 또는 `brandSellerStockMap(bpIds)` → 호출부가 꽂음):
  1. `GET /api/supplier-catalog` 브랜드 행(`supplier-directory.js:908-940` `extraData.push` 뒤 한 번에).
  2. `routes/ingredients.js:736` · `restaurants-ingredients.js:478` · `product-ingredients.js:300` 의 `sellerSources` — `attachSellerProductActive` 와 **나란히** 같은 try/catch(«표시용 — 실패해도 목록은 준다»). `seller_type==='brand'` 줄만.
- 화면 `NewPurchaseOrderPage.tsx`:
  - 카탈로그 카드(`metaText` 2575-2580): `seller_stock` 있으면 끝에 «Brand stock: 12 pack» / `out` 이면 주황(#F59E0B) «Out at brand — order still accepted, brand will restock»(policy warn) 또는 빨강(#EF4444) «Out at brand — not accepting now»(block).
  - «내 재고» 카드(2375 `stockText` 옆): 대표 공급처(`leadSeller`)가 브랜드이고 `seller_stock` 있으면 같은 문구.
  - 장바구니 줄(2768-2780 «In stock» 자리): «Brand stock: 12 pack left» · 담은 수량 > available 이면 warn 은 주황 «Only 12 pack at the brand right now — the rest ships when restocked», block 은 빨강 «Brand accepts up to 12 pack right now». 보내기 버튼은 **막지 않는다**(서버가 400 으로 답하고 화면이 `data.lines` 를 보여 준다 — 1단계 «MOQ 400» 처리와 같은 흐름).
  - 데이터는 이미 받는 응답에 실려 온다 — 새 호출 0.

### 5-2. BG 받은 주문 (`routes/seller-orders.js`)
- `GET /`·`GET /:id`: `seller_type==='brand'` 응답에 `attachStockShortage(data)` — `openOutboundLines(그 브랜드 주인의 brandIds)` 한 번 배정 → 각 `item` 에 `stock_short_units`(0 이상 정수) · `stock_available_units`(이 줄까지 배정한 뒤 남은 양 ÷ per — 참고용) · `stock_tracked`; 헤더에 `stock_short_count`(= short>0 인 미발송 줄 수). 이미 발송된 줄(`shipped_at`)은 0. 미출고 주문이 아닌 상태(received·cancelled)도 0.
- `GET /stats`: `stock_short`(= `stock_short_count>0` 인 열린 주문 수) 한 칸 추가 — 열린 주문 전부를 한 번 배정하면 나온다(최대 수백 줄).
- 화면 `IncomingOrdersView.tsx`:
  - 목록 상태 칸(1427-1450 기존 «not yet dispatched» 배지 옆): `stock_short_count>0` 이면 `DataTableStatus variant="danger"` «Stock short · {{count}} item(s)».
  - 상세 품목 줄(2214-2235 «Not dispatched yet» 밑): `stock_tracked && !shipped_at` 이면 «Available now {{available}} · short {{short}}»(short>0 빨강 #EF4444 / 0 이면 회색 «Available now N»). 레시피 프로덕트는 «available» 이 가장 모자란 재료 기준임을 툴팁 한 줄.
  - 표 위 한 줄(`stats.stock_short>0` 일 때만): «{{count}} open order(s) can't be fully shipped from current stock → Inventory»(링크 `/pos/brand-inventory?filter=fs_out` · 1단계 띠의 품절 필터). 탭은 늘리지 않는다.
  - 발송 모달(`shipModalRow` 932-1000): 고른 줄에 short>0 이 있으면 주황 안내 «N item(s) short — stock will go negative» · **막지 않는다**(현행 출고 규칙 그대로).
- FG(`seller_type==='foodcourt'`)·공급업체는 이 함수가 아무것도 붙이지 않는다(필드 자체 없음 · 화면은 `undefined` 를 안 그림).

### 5-3. BG 재고 화면 (1단계 띠 + 설정)
- `ForesightPanel`: «Stock settings» 버튼(§4-1) · `includeSoon` 초기값을 `GET stock-settings`(BG 모드에서 1회 · `useBulkOrder` 가 아니라 `InventoryManager` 에서 받아 내려 준다)의 `include_soon_default` 로.
- 띠 밑 한 줄에 `policy==='block'` 이면 «Stores can't send orders beyond your available stock (blocking on)» 작은 글씨 — 켜 둔 걸 잊지 않게.
- 1단계 행의 «매장 주문 대기 1,500 g» 은 그대로(같은 수 — §3-2 G).

### 5-4. 아침 알림 (`services/brandStockAlertService.js` + `brandStockAlertScheduler.js`)
- cron 매 정각 → `runDue({ now })`(health-check 가 `now` 를 넣어 직접 부른다 — recurringPo 와 같은 계약). `SchedulerRun 'brand_stock_alert_hourly'` `results:{ brands, sent, skipped_quiet, skipped_done, skipped_off, failed }`.
- 대상 = `brands` 중 `owner_id` 있는 전부(데모·테스트 브랜드도 같은 길 — `sendNotification` 관문과 달리 푸시는 `push_enabled`·카테고리·구독 유무로 걸러진다. `is_test` 사용자에게 OS 푸시가 가도 해가 없고 데모 상황판 확인에 필요하다).
- 브랜드마다: `tz = operation_settings.timeZone` · `stockSettingsOf(...).morning_alert` · `localParts(now, tz).hour >= hour` 이고 **오늘 그 브랜드 수신자에게 아직 안 보냈으면**(`push_logs` 에 `user_id = 수신자 AND category='inventory_low' AND sent_at >= 오늘 00:00(브랜드 tz)` 행 유무 — 상태 무관 · 새 표 없이 하루 1번) → `brandStockItemSuggestionsFor(brandId)`(§6 ②) 의 `summary.out + summary.order_now > 0` 일 때만 발송. 0 이면 `skipped_quiet` 로 기록만(조용). 수신자 = `getBrandManagerIds(brandId)`(BG·BM·owner · §1-6) 각자 `sendPushToUser(uid, payload)`.
- payload: `{ category:'inventory_low', title: 'Stock outlook — 1 out · 3 to order now', body: '<품절 이름 최대 2개> · <지금 발주 이름 최대 2개> …', url:'/pos/brand-inventory?filter=fs_out', tag:'inventory_low', data:{ brand_id, out, order_now } }` — 문구는 `locales/en/…` 백엔드 i18n 대신 **영어 고정**(푸시 카테고리 알림이 전부 영어 고정 — `order_new` 등 선례).
- 한 사람이 두 브랜드(22 → 10·17)면 같은 재고라 같은 숫자 — 두 번째 브랜드는 `push_logs` 오늘 행이 있어 `skipped_done`. 수신자별 중복 0.
- `notification-settings.js:51` `inventory_low.roles` 에 `'Brand Manager'` 추가(개인 토글이 BM 화면에 보이게 · 설명문 «…or, for brands, each morning when items are out or at their reorder point»).
- `server.js` 에 `require('./services/brandStockAlertScheduler').start()` 1줄(다른 스케줄러 옆).

---

## 6. 바꿀 파일 · 함수 (팀원 실행 순서)

| 순서 | 파일 | 할 일 |
|---|---|---|
| 1 | `dev-backend/utils/sellerStockPool.js` (신규) | `openOutboundLines(brandIds)` · `lineNeeds(lines)` · `poolOnHand({piIds,bpIds})` · `allocate()`(순수) · `availableUnitsFor()` · `brandSellerStockMap(bpIds)`(브랜드 상품 id → §5-1 객체 · 주인별 묶음 조회) · `attachBrandSellerStock(sellerSources)` · `attachStockShortage(pos)` · `assertLinesWithinBrandStock(items,{transaction})` · `BrandStockShortError`/`brandStockShortErrorBody`. 머리 주석에 이 문서 경로 + «출고 차감과 같은 갈래». |
| 2 | `dev-backend/utils/reorderMath.js` | `committedOutboundBrand` 본문을 `sellerStockPool.openOutboundLines + lineNeeds` 합산으로 교체(답 동일 · 시험 G) · `preferredLinkMap` 을 여기로 옮겨 export(순수) |
| 3 | `dev-backend/tests/seller-stock-pool.test.js` (신규) | §3-3 A~G |
| 4 | `dev-backend/utils/brandStockPolicy.js` (신규) | `stockSettingsOf` · `isBlockPolicy` · 기본값(§4-2) |
| 5 | `dev-backend/routes/brand-stock-settings.js` (신규) + `server.js` 마운트 | §4-2 GET/PUT · 행 잠금 · 범위 브랜드 전부 · 변경 기록 |
| 6 | `dev-backend/services/purchaseOrderService.js` · `routes/purchase-orders-crud.js`(bulk 1473) · `routes/purchase-orders-workflow.js`(382 · submit catch 1 줄) | `assertLinesWithinBrandStock` 호출 + `instanceof` 400 |
| 7 | `dev-backend/routes/supplier-directory.js` · `routes/ingredients.js` · `routes/restaurants-ingredients.js` · `routes/product-ingredients.js` | `seller_stock` 부착(§5-1) |
| 8 | `dev-backend/routes/seller-orders.js` | GET / · /:id `attachStockShortage` · /stats `stock_short` |
| 9 | `dev-backend/routes/purchase-orders-crud.js` | `brandStockItemSuggestions(req)` → `brandStockItemSuggestionsFor(brandId)` 로 본문 분리(라우트는 그걸 부름) · `module.exports.brandStockItemSuggestionsFor` |
| 10 | `dev-backend/services/brandStockAlertService.js` · `brandStockAlertScheduler.js` (신규) · `server.js` 1줄 · `routes/notification-settings.js:51` | §5-4 |
| 11 | `dev-backend/routes/inventory-core.js` | reorder-suggestions: 재료별 우선 연결(`IngredientSellerProduct is_active` → `preferredLinkMap`, `sellerLinkVisible` 로 이 매장에 보이는 것만) → `leadTimeFor(eff, link)` |
| 12 | `dev-backend/scripts/health-check.js` | §7-2 ⑦~⑩ (`inventory` 카테고리) |
| 13 | `dev-frontend/src/components/Inventory/modals/StockSettingsModal.tsx` (신규) · `sections/ForesightPanel.tsx` · `InventoryManager.tsx` | §4-1 · §5-3 |
| 14 | `dev-frontend/src/pages/PurchaseOrders/NewPurchaseOrderPage.tsx` | §5-1 화면 세 자리 + 400 `BRAND_STOCK_SHORT` 풀어 보이기 |
| 15 | `dev-frontend/src/pages/IncomingOrders/IncomingOrdersView.tsx` | §5-2 배지·상세 줄·표 위 한 줄·발송 모달 안내 |
| 16 | `dev-frontend/public/locales/{en,ko,zh,ms}/{purchaseOrders,brand,inventory}.json` | 새 키 · `npm run i18n:verify` |
| 17 | 빌드 1회 `npm run build:dev` → `verify-all --full` 1회 → SW 버전 맨 마지막 | |
| 18 | `docs/PURCHASE_ORDER_SYSTEM.md` 끝에 절 «브랜드 재고 부족 안내·막기 설정(2026-11-03 · Fable 설계 · [Claude Code])» — 결정·키·함수·검증 요약(이 문서 경로) | 1문서 1주제: 발주 시스템 문서가 맞다(판매자 주문·제출 게이트가 거기 있다) |

⛔ 손대지 않는 파일: `createPurchaseOrderCore` 본문(검사 추가 안 함) · `poMinOrder.js` · `stockLedger.js` · `seller-orders.js` 출고 블록(854-1015) · `poOwnerApproval.js` · 인쇄·KDS 보호파일 · 레시피 화면 파일(다른 방 작업 중). 설계와 다른 판단이 필요해지면 **중단하고 Fable 에게**.

---

## 7. 검증 (팀원이 기계로 · 게이트 전에 끝낸다)

### 7-1. 단위
- `npx jest tests/seller-stock-pool.test.js tests/reorder-math.test.js` — §3-3 + 1단계 전부 통과(committed 재지향 뒤에도).

### 7-2. health-check `inventory` (데모 BG user 22 · 브랜드 10 · 매장 38 · 공급업체 20 · 이름 `[확인용]` · 끝나면 되돌림 · 설정은 **원래 값을 먼저 읽어 두고** 되돌린다)
7. **가용량·배지·안내 = 같은 수**: `[확인용]` 재고아이템(g · 2,000) + 브랜드 10 다이렉트 프로덕트(500 g/pack · 매장 38 에 노출) → 매장 38 이 3 pack `submitted`(PO-A) → 다시 3 pack(PO-B). 검사: (가) BG `GET /seller-orders` 에서 PO-A `stock_short_count 0`·PO-B `1`, PO-B 줄 `stock_short_units 2` · `GET /stats stock_short = 1` (나) 매장 38 `GET /supplier-catalog` 그 상품 `seller_stock.available_units = −2 · status 'out' · policy 'warn'` (다) `GET /purchase-orders/suggestions`(BG) 그 행 `committed = 3,000` (= 1단계 함수 답 · §3-3 G) (라) PO-B 발송(ship) 은 **여전히 200**(막지 않는다).
8. **막기 설정**: `GET /api/brands/10/stock-settings`(BG) 200 `short_order_policy 'warn'` · `applies_to` 에 10·17 · `PUT {short_order_policy:'block'}` → 브랜드 10·17 둘 다 바뀜(DB 원문 확인) → 매장 38 이 1 pack 더 보내기(`submit`) → **400 `BRAND_STOCK_SHORT`** `data.lines[0].available_units ≤ 0` · bulk auto_submit 도 초안으로 남음(응답 orders[].status 'draft') · `PUT {short_order_policy:'warn'}` → 같은 submit 201 · BM(2212) PUT → 403 · 브랜드 1 의 BG 토큰으로 `GET /api/brands/10/stock-settings` → 404.
9. **아침 알림**: 원래 `push_logs` 수를 세고 → `runDue({ now: 브랜드 tz 07:30 })` → user 22 `inventory_low` 행 +1(상태 `no_subscription` 이어도 됨 — 보냈다는 기록) · `SchedulerRun brand_stock_alert_hourly` 1행 `results.sent ≥ 1` → 같은 now 로 다시 → +0(`skipped_done`) → `now` 06:30 → +0 → `PUT morning_alert.enabled:false` → 07:30 에도 +0(`skipped_off`) → 품절·지금 발주 0 인 상태(시험 품목 치운 뒤) → +0(`skipped_quiet`). 끝에 설정·로그 원복(만든 push_logs 행은 `[확인용]` 표식이 없으니 **id 로 지운다**).
10. **설정 저장이 남의 칸을 안 지움**: 8 의 PUT 전후 `operation_settings` 의 `timeZone`·`sales_access`·`openingTime` 동일 · `PUT /api/brands/company-info`(영업시간만) 뒤에도 `stock` 키 그대로.
(1단계 ③ 대시보드 대조는 리드타임까지 같아진다 — 기존 검사에 `lead_time_days` 비교 한 줄 추가.)

### 7-3. 고장주입 (각각 넣고 → 해당 검사가 **실패하는지** 보고 → 원복 · 전부 백엔드라 빌드 불필요 · HTTP 주입은 `pm2 restart dev-backend` 뒤)
- `allocate` 가 접수 순 대신 항상 `short_units 0` 을 내면 → ⑦(가)·(나) 깨짐.
- `assertLinesWithinBrandStock` 호출을 `submitDraftInTx` 에서 빼면 → ⑧ 의 400 이 201 로.
- `runDue` 의 `push_logs` 오늘 행 검사를 빼면 → ⑨ 두 번째(+0 이어야 할 것이 +1).

### 7-4. 실브라우저 (빌드 1회 뒤 `verify-all --full` 1회)
- `/pos/brand/general/incoming-orders` [as=brand store=38] — PO-B 행 «Stock short · 1 item» · 상세 줄 «Available now −2 · short 2» · 표 위 «1 open order can't be fully shipped…» 링크 → `/pos/brand-inventory?filter=fs_out` 띠가 품절 필터로.
- `/pos/brand-inventory` [as=brand store=38] — «Stock settings» 모달 열고 block 저장 → 띠 밑 «blocking on» 문구 · 다시 warn.
- `/pos/purchase-orders/new` [as=restaurant store=38] — 카탈로그 그 상품 «Out at brand — order still accepted…» · 장바구니 담고 보내기 → (block 일 때) 400 문구가 줄 밑에.
- console.error 0 · ErrorBoundary 0.

### 7-5. 게이트에서 Fable 이 볼 것 (`gate` 1회 — 공용 기준 ②돈·주문 무결성: 구매자 발주 경로의 새 400 · 새 설정 라우트 · 자동 알림)
diff 가 §6 표 안인지 · 보호파일 지문 0 · ⑦~⑩ 숫자 · 고장주입 3/3 · `committedOutboundBrand` 재지향 뒤 1단계 health-check ①②③ 그대로 통과 · `assertLinesWithinBrandStock` 가 **구매자 경로 3곳에만** 있고 `createPurchaseOrderCore`·판매자 대리주문(`seller-orders POST /`)·approve 에는 없는지 grep · 기본값이 `warn`/알림 켬 인지(설정 없는 브랜드 17 로 확인).

---

## 8. 되돌리기 · 배포
- 스키마 0 · 마이그 0. 코드 되돌리기만으로 원복. `operation_settings.stock` 키는 남아도 읽는 코드가 없으면 무해.
- 아침 알림은 코드가 돌면 **기본 켬**이다 — 운영 배포 직후 첫 07:00 에 품절·지금 발주가 있는 브랜드 관리자에게 푸시가 간다(구독이 없으면 로그만). 배포 보고에 한 줄 «브랜드 관리자에게 아침 재고 알림이 켜졌습니다 — 끄려면 재고 › Stock settings 또는 Notifications › Low Stock Alert».
- 운영 반영: 다음 배포 때(이 일에서는 안 한다). SW bump 는 프론트 마지막에 1회.

---

## 9. Irene 질문

**없음 — 되돌리기 어려운 선택이 남지 않았다.** 아래는 Fable 이 정한 기본값이라 바꾸고 싶으면 설정 칸 또는 상수 한 줄이다:

| 정한 것 | 값 | 바꾸는 자리 |
|---|---|---|
| 매장 주문이 재고보다 많을 때 | 안내만(warn) — Irene «a 만 해도 돼» | BG 재고 › Stock settings |
| 아침 알림 | 켬 · 07:00 · 앱+푸시 · 메일 없음 · 알릴 게 없으면 조용 | 같은 창 · 개인은 Notifications |
| «곧 부족» 기본 포함 | 꺼짐(1단계 Q3) | 같은 창 |
| 막기 시점 | 보내는 순간(담기·출고·승인 뒤는 안 막음) | 설계 — 바꾸려면 Fable |
| 설정 범위 | BG 범위 브랜드 전부 같은 값(재고가 주인 단위) | 설계 |

**지금 바로 시작할 수 있는 순서(막히는 것 없음):** §6 1→3(함수+jest) → 2 → 4·5 → 6 → 7·8·9 → 10 → 11 → 12(+고장주입) → 13~16 → 17 → 18 → Fable 게이트.
