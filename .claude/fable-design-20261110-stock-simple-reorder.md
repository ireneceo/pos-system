# Fable 설계 — 재고 «몇 개 이하면 발주» 한 가지 기준으로 (2026-11-10)

> 종류: `design`(여러 화면이 한 판정을 나눔) + `calc`(발주점·제안 수량 식 두 줄 변경). 구현 뒤 Fable 검증 1회 대상(계산식 변경 · `check-sensitive-diff` 판정에 따름).
> 근거: 개발서버 코드 실측(2026-11-10). 운영 DB 는 읽지 않았다. 코드 수정 없음(설계만).

## Irene 원문
«재고관리에서 스톡없다고 표시되게 하는게 도대체 무슨 기준이야? 뭐가 이렇게 항목이 쓸데없이 많아? 중요한 거면 이름이라도, 설명으로라도 알기 쉽게 해줘. 그냥 재고 몇 개 이하면 발주하는 거 헷갈리지 않게 완전 쉬운 UI/UX 필요한데»

---

## 0. 결론

1. **기준은 하나: 품목마다 «발주 기준» 숫자 하나. 재고가 그 숫자 이하면 «지금 발주».** 사용자가 숫자를 정했으면 그 숫자가 곧 기준이다(사용량을 더해 부풀리지 않는다). 숫자를 안 정한 품목만 사용량으로 자동 추정하고, 화면에 «자동» 이라고 쓴다.
2. **화면의 상태 이름은 한 벌**: 재고 없음 · 지금 발주 · 곧 부족 · 충분 · 발주 기준 없음(+ «주문함 · 오는 중»). 옛 Normal / Low Stock / Out of Stock, 예측 신뢰도(High/Medium/Low/No Data), Urgency(critical/high/normal)는 화면에서 없앤다.
3. **품목 설정 창은 칸 2개**(발주 기준 · 한 번에 최소 발주량). 나머지 3칸(리드타임 · 안전재고 % · 수동 사용량)은 «자동 계산에 쓰는 값» 으로 접어 둔다.
4. 새 표·새 경로·스키마 변경·마이그 0. `min_stock` 칸의 뜻은 원래 «이 이하면 부족» 이었으므로 데이터는 그대로 두고 이름만 «발주 기준» 으로 부른다.

### 왜 지금 헷갈리는가 (실측)
- 같은 화면에 판정이 세 벌이다: ① 옛 Status(재고 ≤ min) ② 발주 전망(재고+오는 중 ≤ 사용량×리드타임 + min) ③ 대시보드 Reorder Suggestions 의 Urgency. 같은 품목이 ①에선 Normal, ②에선 Order now 로 나온다.
- ②는 사용자가 min 5 로 정해도 사용량이 있으면 발주점이 5보다 커진다 → «5 이하면 발주» 라고 정했는데 8에서 «Order now». Irene 이 묻는 «도대체 무슨 기준» 이 이것이다.
- 추가로 찾은 결함: min 만 있고 사용량이 0 인 품목(개발 DB 대부분)은 제안 수량 = min − 재고 → 받아도 재고가 딱 min → 다시 «Order now»(끝나지 않는다).

---

## 1. 판정 규칙 (단일 — `dev-backend/utils/reorderMath.js`)

### 1-1. 식 (바뀌는 것은 `compute()` 두 줄)
```
발주 기준 L  = min_stock > 0 이면 min_stock                    ← 변경(예전: 사용량×리드타임 + min_stock)
             = 아니면 하루 사용량 × 리드타임 × (1 + 안전재고%)   ← 그대로(자동)
채울 여유 C  = 하루 사용량 > 0 이면 하루 사용량 × 7            ← 그대로
             = 아니면 L × 0.5                                   ← 신규(예전: 0 → 받아도 다시 «지금 발주»)
제안 수량    = max(0, L + C − 재고 − 오는 중)
```
- `compute()` 반환에 `level_source: 'manual' | 'auto' | 'none'` 추가(min>0 → manual · 사용량>0 → auto · 둘 다 없음 → none). `safety_stock` 반환값은 호환용으로 남긴다(manual 이면 min_stock).
- `classify()` 는 **바꾸지 않는다**: 재고 없음(가용 ≤ 0) → 지금 발주(가용 + 오는 중 ≤ L) → 곧 부족(사용량 있고 7일 안에 L 도달) → 충분 / 기준 없음.
- `orderQtyFor`(주문 단위 올림 · MOQ) · `leadTimeFor` · BG 약속한 양(committed) · `sellerStockPool` 전부 그대로.

### 1-2. 이 변경이 뜻하는 것
- min 5 · 재고 6 → 충분. 재고 5 → 지금 발주. **정한 숫자와 표시가 항상 일치한다.**
- 숫자를 낮게 잡아 배송 중에 떨어질 수 있는 품목은 «곧 부족(약 n일분)» 노란 배지가 먼저 뜬다(classify 의 soon — 11-03 «미리 안내» 는 이 단계로 유지된다). 설정 창에는 «사용량 기준 권장: N» 한 줄을 보여 준다(§3). 상태를 몰래 바꾸지는 않는다.
- min 10 · 사용량 0 · 재고 2 → 제안 13(예전 8). 받으면 15 > 10 → 충분(끝난다). 2026-11-03 이전의 옛 식(min×1.5 − 재고)과 같은 답이다.
- 숫자를 안 정한 품목(자동)의 판정·수량은 **변화 없음**.

### 1-3. 이 식을 쓰는 곳 — 전부 자동으로 같은 답
`/purchase-orders/suggestions`(재고 띠 · 목록 배지 · 일괄 발주 · 발주 화면 제안 패널) · `inventory-core` reorder-suggestions · `inventory-extra` par-level · 브랜드 아침 알림(`brandStockAlertService`). 호출부는 수정하지 않는다.

### 1-4. 서버의 옛 `stock_status` · `stock_alerts`
- 라우트 3곳(`inventory-core.js:185` · `brand-inventory.js:181` · `general-stock.js:56`)의 `stock_status` 필드와 `utils/stockAlerts.js` 는 **손대지 않는다**. 새 규칙에서 «재고 ≤ 발주 기준» 과 같은 뜻이 됐다(차이는 «오는 중» 을 안 뺀다는 것 하나).
- 화면이 `stock_status` 를 직접 배지로 쓰지 않게만 한다(§2-1 한 함수). 응답 추가 1개: `suggestions` 응답에 `auto_levels: { [id]: 발주 기준 }`(level_source = auto 인 품목만 — 목록 «발주 기준» 칸 표시용).

---

## 2. 화면

### 2-1. 판정 한 함수 (새 파일 1개 — `components/Inventory/stockVerdict.ts`)
`stockVerdict(item, sugg, noBasisIds, suggestionsLoaded) → 'out' | 'order_now' | 'soon' | 'ok' | 'no_basis' | 'incoming'`
1. 재료 + 전망 로드됨: `sugg` 있으면 그 status · `noBasisIds` 에 있으면 no_basis · 아니면 ok.
2. ok 인데 `min_stock > 0 && current_stock ≤ min_stock && on_order_quantity > 0` → `incoming`(«주문함 · 오는 중»).
3. 일반재고(General Stock) 또는 전망 못 읽음: out_of_stock → out · low_stock → order_now · normal → (min_stock > 0 ? ok : no_basis).
배지 · 상태 필터 · 대시보드 숫자 · 띠 숫자가 **전부 이 함수**를 쓴다. `getStatusLabel` · `StatusBadge(stock_status)` · `ConfidenceBadge` · `UrgencyBadge` 의 화면 사용처는 없앤다(`calculateStockStatus` 는 로컬 상태 갱신용으로 남겨도 됨).

### 2-2. 이름 · 색 (i18n `inventory:verdict.*` — 4개 언어)
| 키 | en | ko | zh | ms | 색 |
|---|---|---|---|---|---|
| out | Out of stock | 재고 없음 | 无库存 | Stok habis | #EF4444 |
| orderNow | Order now | 지금 발주 | 立即订货 | Pesan sekarang | #F59E0B |
| soon | Running low · ~{{n}}d left | 곧 부족 · 약 {{n}}일분 | 即将不足 · 约剩{{n}}天 | Hampir habis · ~{{n}} hari | #EAB308 |
| ok | OK | 충분 | 充足 | Cukup | #10B981 |
| noLevel | No reorder number | 발주 기준 없음 | 未设订货点 | Tiada had pesanan | #9CA3AF |
| incoming | Ordered · on the way | 주문함 · 오는 중 | 已订货 · 在途 | Sudah dipesan · dalam perjalanan | #0EA5E9 |
(색은 지금 띠·배지가 쓰는 값 그대로. 장식 이모지 금지.)

### 2-3. 띠 `sections/ForesightPanel.tsx`
- 제목 «Reorder outlook» → **«What to order» / «발주할 것»**.
- 설명 한 줄(이게 Irene 질문의 답이다):
  - en: `An item shows “Order now” when its stock is at or below the reorder number you set for it. No number yet? We estimate one from the last 28 days of use.`
  - ko: `품목마다 정해 둔 «발주 기준» 숫자 이하로 재고가 내려가면 «지금 발주» 로 표시됩니다. 숫자를 안 정한 품목은 최근 28일 사용량으로 자동 계산합니다.`
  - 브랜드 모드만 뒤에 덧붙임: en `Store orders waiting to ship are taken off first.` / ko `매장이 이미 주문해 둔 양은 먼저 뺍니다.`
- 카드 **4 → 3**: 재고 없음(설명: en `Nothing left` · 브랜드 `Nothing left after store orders waiting` / ko `남은 재고 없음` · 브랜드 `매장 주문을 빼면 남는 게 없음`) · 지금 발주(en `At or below the reorder number` / ko `발주 기준 이하`) · 발주 기준 없음(en `Set a number and we'll tell you when to order` / ko `숫자를 정하면 발주할 때를 알려 드립니다`).
- «곧 부족» 카드는 없애고 카드 밑 한 줄: en `{{count}} more will run low within 7 days — View` / ko `7일 안에 부족해질 품목 {{count}}개 — 보기`(누르면 fs_soon 필터). 0개면 숨김.
- 체크 «Include items running low soon» 은 띠에서 빼고 일괄 발주 창 맨 위로 옮긴다(§2-6).
- 버튼 «Add what's needed (N)» → **en `Order these ({{count}})` / ko `발주 담기 ({{count}})`**. 브랜드 «Stock settings» 버튼 유지.
- 밑줄 `noBasisLine` 은 카드 설명과 겹치므로 삭제. `blockingOn` 줄 유지.

### 2-4. 목록 `sections/StockListSection.tsx`
- 상태 필터 **9 → 5**: All / Out of stock / Order now / Running low / No reorder number. (Zero Stock · Normal · Low Stock · 옛 Out of Stock 삭제.) 필터 값은 기존 `fs_*` 를 그대로 써서 `?filter=fs_out` 링크(아침 알림)를 지킨다. 걸러내기는 `stockVerdict` 로 — 일반재고도 걸린다(지금은 `fs_` 면 일반재고가 전부 빠진다).
- Status 칸: `stockVerdict` 배지 하나(재료·일반재고 공통).
- 칸 «Min / Prediction» → **«Reorder at» / «발주 기준»**. 내용 한 줄:
  - 정함: `5 kg`
  - 자동: en `Auto · 24 kg` / ko `자동 · 24 kg`(`auto_levels`)
  - 없음: en `Not set` / ko `미정` + 링크 `Set` / `정하기`
  - 누르면 그 품목 설정 창이 열린다. 예측 신뢰도 배지 삭제(데스크톱 · 모바일 카드 둘 다).
- Ingredient 밑줄 `x.xx unit/day (28d)` · «Store orders waiting» 줄 · Current Stock 의 incoming 알약 · Supplier 칸 제안 수량은 유지.
- 일반재고 표: «Min Stock» 칸 → «Reorder at», Status 는 같은 배지. 일반재고 만들기/고치기 폼(`useGeneralStockForm` 쪽)과 재고 화면 안의 «Min Stock / Minimum Stock Level» 라벨은 전부 **«Reorder when stock is at or below» / «이 수량 이하면 발주»** 로(라벨만 · 저장 칸은 `min_stock` 그대로).

### 2-5. 대시보드 `sections/DashboardSection.tsx`
- 위 카드 4개 중 Low Stock · Out of Stock 삭제(바로 위 띠와 같은 숫자를 다른 기준으로 또 세고 있다). Total · Monthly Loss 만 남긴다.
- «Stock Alerts» 블록과 «Reorder Suggestions» 표(«last 30 days» 문구 포함) 삭제 — 띠 + 목록 필터 + 일괄 발주 창이 같은 일을 한 기준으로 한다. Expiry 알림 · 나머지 블록은 그대로.
- `useInventoryData` 의 reorder-suggestions 호출과 alerts 조립은 화면에서 안 쓰게 되면 제거(서버 라우트는 남긴다).

### 2-6. 일괄 발주 창 `modals/BulkOrderModal.tsx`
- 맨 위 체크 한 줄: en `Also add {{count}} items that will run low within 7 days` / ko `7일 안에 부족해질 {{count}}개도 같이 담기`. 기본값 = 브랜드 설정 `include_soon_default`(매장은 꺼짐). 상태는 지금처럼 `InventoryManager` 의 `includeSoon`.
- 줄의 단계 표시는 §2-2 이름으로. 수량 · MOQ · 보내기 흐름 변화 없음.

### 2-7. 품목 설정 창 `modals/SettingsModal.tsx` (+ `hooks/useSettingsModal.ts`)
전부 `t()` 로(지금 영어 하드코딩). 제목 en `Reorder settings: {{name}}` / ko `발주 설정: {{name}}`.
1. **칸 1 (맨 위 · 크게)** — en `Reorder when stock is at or below ({{unit}})` / ko `이 수량 이하면 발주 ({{unit}})`
   - 도움말: en `When stock drops to this number the item shows “Order now”. Leave 0 and we estimate it from your usage.` / ko `재고가 이 숫자까지 내려가면 «지금 발주» 로 표시됩니다. 0 으로 두면 사용량으로 자동 계산합니다.`
   - 바로 밑 미리보기(입력에 따라 즉시): en `Now: {{stock}} {{unit}} → {{verdict}}` / ko `지금 재고 {{stock}} {{unit}} → {{verdict}}`
   - 사용량이 있고 입력값 < 하루 사용량 × 리드타임 일 때만 회색 한 줄: en `You use about {{daily}} {{unit}} a day and delivery takes {{lead}} days — {{suggest}} or more is safer.` / ko `하루 약 {{daily}} {{unit}} 쓰고 배송에 {{lead}}일 걸립니다 — {{suggest}} 이상이 안전합니다.`(suggest = 사용량×리드타임×(1+안전%) 올림)
2. **칸 2** — en `Order at least ({{unit}})` / ko `한 번에 최소 발주량 ({{unit}})` · 도움말 en `Optional. We never suggest less than this.` / ko `선택. 제안 수량이 이보다 적게 나오지 않습니다.`(칸 `min_order` — 뜻 그대로)
3. **접힌 묶음(기본 닫힘)** — en `Automatic estimate (optional)` / ko `자동 계산에 쓰는 값 (선택)` · 안내 en `Used to estimate a reorder number when you haven't set one, and to work out how much to order.` / ko `발주 기준을 안 정한 품목의 자동 계산과 제안 수량에 씁니다.`
   - 첫 줄(읽기 전용): en `Measured use: {{daily}} {{unit}}/day (last 28 days, {{days}} days recorded)` / ko `측정된 사용량: 하루 {{daily}} {{unit}} (최근 28일 중 {{days}}일 기록)` — 7일 미만이면 en `Not enough history yet` / ko `아직 기록이 부족합니다`. «Current Prediction» 신뢰도 배지는 삭제.
   - `Delivery time (days)` / `배송에 걸리는 날` · `Extra buffer (%)` / `여유분 (%)` · `Daily use, if history is short ({{unit}}/day)` / `하루 사용량 직접 입력 ({{unit}}/일) — 기록이 부족할 때만 씁니다`
- 안내 상자의 «PAR Level» 문구 삭제. 브랜드 공유 재료 문구는 en `Name, unit and suppliers are managed by your brand. The numbers below apply to this store only.` / ko `이름·단위·공급처는 브랜드가 관리합니다. 아래 숫자는 이 매장에만 적용됩니다.`
- 버튼 `Save` / `저장`.
- 저장 뒤: 로컬 `stock_status` 갱신에 더해 **전망을 다시 읽는다**(`bulk.loadSuggestions`) — 안 그러면 숫자를 바꿔도 배지·띠가 그대로다.
- 같이 고칠 것(실측 결함): `useSettingsModal.open` 이 리드타임이 비어 있으면 `1` 을 채우고 그대로 저장한다(서버 기본은 2). 비어 있으면 빈 칸 + placeholder `2` 로 두고, 사용자가 안 건드린 칸은 원래 값 그대로 보낸다.

### 2-8. 그 밖 문구
- `modals/StockSettingsModal.tsx` 하단: en `Each item's reorder number is set in that item's settings.` / ko `품목별 발주 기준은 각 품목의 설정에서 정합니다.`
- `pages/PurchaseOrders/PurchaseOrdersPage.tsx` 제안 패널의 단계 이름은 §2-2 키를 같이 쓴다(표시만).
- 옛 `foresight.*` 키 중 안 쓰게 된 것은 4개 언어에서 같이 지운다. `npm run i18n:verify` 통과.

---

## 3. 2026-11-03 설계와의 관계
- `.claude/fable-design-20261103-stock-foresight-oneclick-po.md` §3 «계산 정의» 중 **두 줄만 개정**: ① min_stock 이 있으면 발주점 = min_stock(예전: 사용량×리드타임 + min_stock) ② 사용량 0 일 때 채울 여유 = 발주점 × 0.5(예전 0). 그 문서 §3 머리에 «2026-11-10 개정 → 이 문서 §1» 한 줄을 달 것. `reorderMath.js` 머리 주석의 식도 같이 고친다.
- 그대로인 것: 사용량 정의(28일 장부 · 7일 미만이면 수동값) · 오는 중 · BG 약속한 양 · 단계 5개와 `classify` · 주문 단위 올림 + MOQ · 일괄 발주 경로 · phase2(가용량 `sellerStockPool` · 막기 · 아침 알림 · 재고 설정 창).
- 화면: §5-1 띠 4칸 → 3칸 + 한 줄, «곧 부족 포함» 체크 위치 이동. 기능 삭제는 없다.

---

## 4. 구현 순서 · 범위
스키마 0 · 마이그 0 · 🔒 인쇄·KDS 보호파일 0 · 운영 쓰기 0.
1. **변경 전 스냅샷**: 데모 매장 38 · 브랜드 10 의 `/purchase-orders/suggestions` 응답(품목 · status · 제안 수량) 저장.
2. 서버: `reorderMath.compute` 두 줄 + `level_source` · `buildSuggestionRows` 에 `auto_levels` · jest · health-check 기대값(11063 줄 근처 8 → 13 등).
3. 프론트: `stockVerdict.ts` → 띠 · 목록 · 대시보드 · 일괄 발주 창 · 설정 창 · 문구 · i18n 4개 언어.
4. 빌드 1회 → `verify-all --full` 1회.

## 5. 검증 기준 (Fable 판정에 넘길 것)
1. **식(jest `tests/reorder-math.test.js`)**: 기존 «10×2+15 = 35» 는 15 로(의도된 변경) + 새 사례 — (a) min 5 · 하루 10 · 리드 2: 재고 6 → order_now 아님(soon) · 재고 5 → order_now (b) min 10 · 사용량 0 · 재고 2 → 제안 13, 받은 뒤 재고 15 → ok (c) min 0 · 하루 10 · 리드 2 · 20% → 발주점 24(변화 없음) (d) 둘 다 0 → no_basis.
2. **전후 대조표**: 1번 스냅샷과 변경 뒤 응답을 품목별로 대조. status 가 바뀐 품목은 **전부 min_stock > 0 이고 사용량 > 0** 이어야 하고, 수량만 바뀐 품목은 전부 min_stock > 0 · 사용량 0 이어야 한다. 그 밖에서 바뀐 게 1건이라도 있으면 실패. 표를 보고에 붙인다.
3. **불변식(health-check 1건 추가)**: 데모 매장에서 min_stock > 0 인 모든 재료에 대해 «가용 + 오는 중 ≤ min_stock» ⇔ status ∈ {out, order_now}. 고장주입: compute 를 옛 식으로 되돌리면 이 검사와 jest (a) 가 실패하는지 1회 확인(HTTP 주입은 pm2 restart 뒤).
4. **기존 계약 유지**: health-check «재고 전망» ①~⑩(제안 그대로 201 · −1 이면 400 · 약속한 양 · 아침 알림) 통과.
5. **실브라우저(매장 38 `[as=restaurant store=38]` · 브랜드 `[as=brand store=38]`)**: 한 품목을 min 5 로 두고 재고 6 → «충분», 5 → «지금 발주», 0 → «재고 없음» · 띠 숫자 = 그 필터로 건 목록 행 수 · 상태 필터 5개 · 설정 창 칸 2개 + 접힌 묶음 · 저장 직후 배지·띠 갱신 · 일반재고 필터 동작 · 4개 언어에서 키 원문 노출 0 · 폰 너비 넘침 0 · console.error 0.
6. `check-print-guard` 변경 0 · `check-design-guard` 신규 위반 0 · 로컬 styled 버튼/표 신규 0.

## 6. Irene 에게 물을 것
**없음.** 스키마·데이터 변경이 없고 식 두 줄은 코드로 되돌릴 수 있다. 다만 아래 둘은 보고에 알린다.
- 발주 기준 숫자와 사용량이 둘 다 있는 품목은 «지금 발주» 가 **예전보다 늦게**(정한 숫자에 닿았을 때) 뜬다. 그 사이에는 «곧 부족 · 약 n일분» 이 먼저 뜬다. 숫자가 사용 속도에 비해 낮으면 설정 창이 권장값을 알려 준다.
- 개발 DB 기준 발주 기준을 정한 품목은 매장 101개 중 35개 · 브랜드 39개 중 5개뿐이다. 나머지는 «자동» 또는 «발주 기준 없음» 으로 보이고, 띠의 «발주 기준 없음» 카드가 채우도록 이끈다.
