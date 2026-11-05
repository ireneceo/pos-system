# Fable 설계 판정 (2026-11-05) — 브랜드제너럴 «주문 준비 보드» (판매 주문을 주방화면처럼)

> Irene 원문: «브랜드제너럴에 주문관리를 할 수 있게 레스토랑 키친디스플레이처럼 관리하게 해주면 좋겠어. 항목별로 준비했다 배송하면 된다 정도로. 이거 가져다가 맞춤기획 가능한지 fable에게 물어봐.»
> 호출 조건: 공용 기준 ① **설계**(새 화면 + 줄 단위 새 칸 + 여러 판매자 화면이 같은 규칙을 나눔). 이 사안의 Fable 호출은 설계 1(이 문서) + 게이트 1(구현 뒤 · DB 칸 추가 마이그 포함 배포) 로 끝낸다.
> 코드는 읽기만 했다(변경 0). 운영 서버·운영 DB 접속 0. 팀원은 Ⅰ 을 가공 없이 Irene 에게 전달한다.

---

## Ⅰ. Irene 에게 올리는 보고문

### 한 줄 결론
**됩니다 — 주방화면 «코드» 를 가져오는 게 아니라 «모양» 을 가져옵니다.** 들어온 주문을 단계별 칸에 카드로 늘어놓고, 카드 안 품목마다 «준비함» 체크 → 다 준비되면 «보내기» 한 번. 새 상태·새 표 없이 **줄마다 «준비한 시각» 칸 하나**만 더하면 됩니다. 이미 있는 «품목별 보냄 표시»(10-09) 위에 얹는 거라 규모는 **중간**(파일 6~8개 · 마이그 1).

### 지금 상태 (실측 · 개발서버 코드 기준)
- 브랜드제너럴의 «들어온 주문» 화면은 **표**입니다(탭: 전체 / 새 주문 / 확인됨 / 보냄 / 받음 / 취소). 같은 화면을 **푸드코트·공급업체 판매자도 그대로** 씁니다(한 파일 — 2,367줄).
- 주문 흐름: 새 주문(submitted) → **확인** → **보내기**(운송사·송장 적는 창, 품목 체크 목록 — 10-09 것) → 배송 완료 → 매장이 받음. 품목마다 «보냈다/안 보냈다» 는 이미 줄에 기록됩니다(`shipped_at`). «준비했다» 는 **없습니다** — 지금은 «보내기» 창에서 체크하는 것이 곧 발송이라 «준비 중» 을 따로 둘 자리가 없습니다.
- 10-09 «품목별 발송 표시» 는 10-27 배포 준비 커밋과 11-02 배포 커밋에 **들어 있습니다**(마이그도 배포 목록에 등록). 운영 DB 에 칸이 실제로 생겼는지는 제가 보지 않았습니다(운영 접속 안 함) — 배포 기록상으로는 나간 것.
- 설계 문서(`SELLER_ORDER_MANAGEMENT_SYSTEM.md` §3·§7-1)의 «브랜드·푸드코트는 보내기 없음(내부 분배)» 줄은 **옛말**입니다. 2026-09-01 부터 브랜드도 «보내기» 를 쓰고(재고가 그때 빠짐), 10-08 운영 실측에서 브랜드 판매 주문 18건 전부 «보내기» 기록이 있었습니다. 이번에 그 줄을 고칩니다.
- 실시간: 판매 주문 화면은 이미 소켓으로 새 주문이 오면 소리 + 자동 새로고침을 합니다. 보드도 같은 줄을 씁니다(새로 만들 것 없음).
- 주문 규모: 브랜드 판매 주문은 주문당 품목 **1~4줄**, 매장당 주 1~2회(개발 DB 159건 실측 · 문서 §3). 즉 보드는 «많은 카드를 빨리 넘기는 화면» 이 아니라 **«빠뜨리지 않는 화면»** 이어야 합니다 — 단순하게.
- 🔒 주방화면(`KitchenDisplayPage.tsx`)은 인쇄·KDS 보호 파일이라 **열지도 않습니다.** 가져오는 것은 «칸 = 단계, 카드 = 주문, 카드는 가장 덜 끝난 품목 기준으로 한 칸에만» 이라는 원리뿐입니다.

### 어떻게 만드나 (Fable 설계)
1. **보기 전환 하나** — «들어온 주문» 화면 상단에 «보드 / 목록» 단추. 목록(지금 표·필터·기간·통계·주문 만들기·품목 수정)은 그대로 두고, 보드는 **진행 중인 주문만** 보여 주는 작업 화면. 기기마다 마지막 선택을 기억(처음은 목록 — 지금 쓰는 사람 화면이 갑자기 안 바뀌게. 브랜드만 보드를 기본으로 두고 싶으시면 한 줄 변경).
2. **칸 5개 (왼→오)**
   | 칸 | 들어오는 주문 | 카드 단추 |
   |---|---|---|
   | **새 주문** | 매장이 보낸 것(submitted) | 확인 · 거절 (지금 것 그대로) |
   | **준비 중** | 확인됐고, 아직 안 보낸 품목 중 «준비함» 안 된 줄이 하나라도 있음 | 품목마다 **✓ 준비함** 체크(되돌리기 가능) |
   | **보낼 준비 끝** | 안 보낸 품목이 전부 «준비함» | **보내기**(지금 창 그대로 — 준비된 줄이 체크된 채 열림) |
   | **보냄** | 전부 보냈고 매장이 아직 안 받음 | 배송 완료 · ✎ 운송정보 |
   | **끝** | 오늘 배송 완료·받음 (접힌 줄) | 없음 |
   - 카드 자리는 **가장 덜 끝난 품목** 기준 한 곳 — 주방화면 «주문 보기» 와 같은 원리. 일부만 보낸 주문(10-09 기능)은 남은 줄이 준비 안 됐으면 «준비 중» 에 «3개 중 2개 보냄» 꼬리표로.
   - 배송이 없는 줄(서비스 품목)은 준비 체크 대상이 아님(보내기와 같은 판정). 서비스만 담긴 주문은 «보낼 준비 끝» 칸에 «완료 처리» 단추(지금 것).
   - 취소·거절은 보드에 안 보임(목록에서).
3. **카드 한 장** — 주문번호 · 매장 이름 · 주문 시각(얼마나 지났는지) · 품목 줄(이름 · 수량·단위 · ✓ 준비함 / 보냄 ✓ 날짜) · 메모 · 단추. 손가락으로 누르는 화면(창고 태블릿)이니 단추는 크게, 끌어다 놓기는 **안 함**(체크·단추만 — 실수 방지).
4. **데이터 = 줄에 칸 하나** `purchase_order_items.prepared_at`(비어 있음 = 준비 안 함). 새 주문 상태 없음(주문 상태 목록은 안 건드림 — 매장 화면·통계·메일이 전부 그 목록을 읽음). 새 표 없음. 재고·돈 **무관**(재고는 지금처럼 «보내기» 때만 빠짐).
5. **서버 길 하나** — «이 주문의 이 줄들을 준비함/준비 취소». 확인된 주문부터만(새 주문은 먼저 «확인»), 이미 보낸 줄은 못 바꿈. 보내기를 누르면 그 줄의 «준비함» 이 비어 있어도 같이 채워집니다(기록이 안 어긋나게). 바꾸면 지금 소켓 신호를 그대로 쏴서 **같은 브랜드의 다른 태블릿 보드도 즉시** 바뀝니다.
6. **매장(구매자) 화면은 이번엔 안 바꿉니다.** «준비 중» 을 매장에 보여 주는 건 다음에 원하시면(한 줄 추가).
7. **같은 화면을 쓰는 푸드코트·공급업체에도 보기 전환이 같이 생깁니다**(비용 0 — 같은 부품). 공급업체는 «보내기» 를 거의 안 써서(운영 47건 전부 매장이 바로 받음) 보드를 안 켜면 그만입니다. 브랜드만 보이게 막는 것도 한 줄이지만, 막을 이유가 없어 **안 막는 쪽을 권고**합니다.

### 안 하는 것 (범위 밖 · 이유)
- **주방화면 코드 재사용·공용화** — 🔒 보호 파일이고, 하는 일이 다릅니다(주방 = 조리 단계·스테이션별, 여기 = 주문 이행). 모양만.
- **새 주문 상태(«준비 중» 등) 추가** — 상태 목록 하나를 매장 화면·보고서·메일·통계가 같이 읽습니다. 줄 칸 하나로 충분합니다.
- **끌어다 놓기** — 태블릿에서 오동작·실수. 체크와 단추로.
- **수량 일부만 준비** — 10-09 때와 같은 이유(수량 분할은 돈 문제). 줄 단위 «했다/안 했다».
- **스테이션·구역별 나눔**(냉장/냉동/건조) — 지금 주문 1~4줄에 과함. 나중에 필요하면 줄 속성으로.
- **피킹 목록 인쇄** — 주문 «인쇄» 단추가 이미 있음.

### Irene 확인 (하나)
| 선택 | 결과 | Fable 권고 |
|---|---|---|
| **A. 위 설계대로** — 보드 + 품목 «준비함» 체크 + 보내기 연결 | 원하신 «항목별로 준비했다 → 배송» 그대로. 마이그 1(칸 추가 · 되돌리기 쉬움). 규모 중간 | **권고** |
| B. 보드만(준비 체크 없이) | 표를 카드로 바꾼 것뿐 — «준비했다» 가 없어서 보내기 창 체크와 다를 게 없음 | 비권고 |
| C. 안 함(지금 표 + 보내기 창 체크로 운용) | 비용 0. «준비 중» 추적 불가 | 지금도 되긴 함 |

**A 로 진행할까요?**

### 진행하면 (팀원이 할 일 · 순서)
① 마이그 `prepared_at`(배포 목록 deploy · 멱등) ② 서버 «준비함» 길 + 목록·상세에 줄 `prepared_at`·머리 «준비 안 된 줄 수» ③ 보드 부품(새 파일) + 보기 전환 ④ 번역 4언어 ⑤ health-check inventory 2건(준비 가드 · 보내기가 준비를 채움) + 고장주입 ⑥ 설계 문서 §3·§7-1 옛 줄 고침 ⑦ verify-all --full(빌드 1회 · sweep 1회 — 브랜드 역할 보드 mount 포함) ⑧ Fable 게이트 1회 → 운영 반영은 다음 배포 때.

---

## Ⅱ. 팀원 설계 명세 (구현 기준 · 설계와 다른 판단이 필요해지면 즉시 중단하고 Fable 에게)

### Ⅱ-1. 데이터
- `purchase_order_items.prepared_at DATETIME NULL` — «판매자가 이 줄을 준비 완료로 표시한 시각. null = 미준비». 모델 주석에 이 판정문 경로.
- 마이그 `scripts/migrate-po-item-prepared-at.js`: 칸 없으면 추가(멱등) · **백필 없음**(옛 주문은 미준비로 두되, 보낸 줄은 아래 규칙으로 보냄 = 준비됨 취급). `migrations.registry.json` 에 `deploy`.
- 주문 상태 ENUM **무변경**. 새 표 0. `TRADE_STRUCTURE.md` 무관(재료·상품·가격 아님).

### Ⅱ-2. 서버 (`routes/seller-orders.js` — 기존 라우터 가드 안)
- **`POST /api/seller-orders/:id/prepare`** body `{ item_ids: number[], prepared: boolean }` (prepared 기본 true).
  - PO 행 잠금 트랜잭션(ship 과 같은 틀). `checkSellerOwnership` 실패 → 404.
  - 상태 가드: `['draft','pending_approval','submitted','cancelled','rejected']` → 409 `BAD_STATUS`(«확인 먼저»). 
  - 줄 가드: 남의 줄 → 400 `BAD_ITEM` · 서비스 줄(`serviceLineIdsOf`) → 조용히 뺌 · **이미 보낸 줄(`shipped_at`) → 400 `ALREADY_SHIPPED_LINE`**(준비 취소도 불가).
  - `prepared_at = now` 또는 `null`. 재고·금액·tracking_info **무접촉**. 이벤트 기록 안 남김(준비는 내부 작업 — 추적 이력은 발송부터).
  - 끝에 `emitPoEvent(req, po, 'seller-order-updated')`(기존 함수 — 판매자 방·구매자 방 둘 다 받지만 구매자 화면은 새로고침만 하므로 무해).
  - 응답 `{ success, data: { id, unprepared_count, items:[{id, prepared_at}] } }`.
- **`POST /:id/ship`** 한 줄 추가: `PurchaseOrderItem.update({ shipped_at: now })` 자리에서 `prepared_at` 이 null 인 줄은 `prepared_at: now` 도 같이 채움(🔒 아님 — seller-orders.js 는 보호 파일이 아니다. 단, 10-09 가드·차감 분기는 손대지 않는다).
- **GET `/` · `/:id`**: 줄에 `prepared_at` 포함 · 헤더 `unprepared_count`(= 서비스 아닌 줄 중 `shipped_at` null 이고 `prepared_at` null 인 수 — `unshipped_count` 세는 자리 옆에서 같이).

### Ⅱ-3. 화면
- 새 파일 `dev-frontend/src/pages/IncomingOrders/IncomingOrdersBoard.tsx`(2,367줄 파일에 더 넣지 않는다). `IncomingOrdersView` 가 자료·핸들러(`openShipModal`·confirm·reject·deliver·complete·`refreshAll`)를 props 로 내려 준다. 보내기·확인·거절 **창은 기존 것 재사용**(보드에서 열어도 같은 Modal).
- 보기 전환: `PageComponents` 헤더 자리에 세그먼트 «Board | List». `localStorage` 키 `incomingOrders.view.<sellerScope>`, 기본 `list`. 읽기·쓰기 try/catch.
- 보드 자료 = 목록 API 를 `status` 없이(전체) + 취소 제외 + 기간 = 진행 중은 전부 · «끝» 칸만 오늘(판매자 시간대 — 기존 `calculatePeriodDateRange` 사용, 브라우저 로컬 금지).
- 칸 배치 함수 `boardColumnOf(row)` 하나(순수 함수 · 단위 테스트 가능):
  ```
  submitted                         → 'new'
  cancelled/rejected/draft          → 숨김
  delivered/received/closed         → 'done' (오늘만)
  is_service_only && confirmed      → 'ready'   (완료 처리 단추)
  goods 줄 중 unshipped 0           → 'shipped' (배송 완료 단추)
  unshipped 중 unprepared > 0       → 'preparing'
  unshipped 전부 prepared           → 'ready'   (보내기 단추 · 창은 준비된 줄 체크)
  ```
  `unshipped_count`·`unprepared_count` 는 서버 값 우선, 없으면 items 로 계산.
- 카드: 공용 토큰(primary `#635BFF` · danger `#EF4444`) · 단추는 `components/UI/Button`/`ThemedButton`(로컬 `styled.button` 금지 — design-guard) · 글리프는 텍스트(✓ ✕ · 장식 이모지 금지). 터치 단추 44px 이상. 카드 컨테이너·칸 레이아웃은 styled div 허용.
- 품목 줄 체크 → `/prepare` 호출 → 낙관적 반영 → 실패 시 `refreshAll`. 중복 제출 가드(버튼 async guard 패턴).
- 소켓: 기존 `seller-order-created/updated` 핸들러의 `refresh()` 가 보드도 갱신(보드는 같은 `rows` 를 본다). 새 주문 소리·NEW 강조 그대로.
- 반응형: 칸은 가로 스크롤(태블릿 가로 5칸 · 세로/폰은 칸을 세로로 쌓음 · 16px 가터).
- i18n: `supplier` 네임스페이스(`orders.board.*`) 4언어. 하드코딩 0 · `npm run i18n:verify`.

### Ⅱ-4. 검증(기계)
- health-check `inventory` 2건 추가: ① prepare 가드(submitted 409 · 남의 줄 400 · 보낸 줄 400 · 서비스 줄 제외 · 되돌리기 null) ② ship 이 미준비 줄의 `prepared_at` 을 채움. 고장주입: ship 의 prepared 채움 한 줄 제거 → ② 실패 → 원복.
- `boardColumnOf` jest(화면 jest 는 게이트 밖 — 결과 숫자만 보고).
- verify-all --full 1회(빌드 1회) · 실브라우저 sweep 에 `brand`·`foodcourt`·`supplier` 역할의 incoming-orders 보드 보기 mount 포함(localStorage 로 board 강제 1회).
- print-guard 8/8 무접촉 · design-guard · timezone-check · i18n 4언어 · 마이그 레지스트리 검사 · check-sensitive-diff(③ 마이그 포함 → 게이트 대상).
- 문서: `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` §3 «배송 추적 X(내부 분배)» · §7-1 «Brand/Foodcourt 는 [Ship] 없음» → 현행(2026-09-01 Q6 · 10-08 품목별 발송 · 이번 준비 보드)으로 고치고 «주문 준비 보드» 절 추가. `docs/PURCHASE_ORDER_SYSTEM.md` 품목별 발송 절에 `prepared_at` 한 줄.

### Ⅱ-5. 범위 밖(이번 묶음에 넣지 않는다)
구매자 화면의 «준비 중» 표시 · 끌어다 놓기 · 수량 분할 준비 · 스테이션 분리 · 피킹 목록 인쇄 · 주문 상태 ENUM 추가 · KDS 코드 import.

### Ⅱ-6. 사실 메모 (읽은 곳)
- `routes/seller-orders.js` 699~830(ship · 줄 shipped_at · 차감 분기) · `models/PurchaseOrderItem.js:25` · `models/PurchaseOrder.js:20~23`(상태 목록) · `IncomingOrdersView.tsx` 162~204(자료형)·496(탭)·796~832(소켓)·1486~1580(단추)·1616~1700(보내기 창) · `services/poRealtimeService.emitPoEvent` · `SupplierOrdersPage.tsx`·`BrandIncomingOrdersPage.tsx`·`FoodcourtIncomingOrdersPage.tsx`(같은 View) · `docs/KITCHEN_DISPLAY_RULES.md` 🔒 절(원리만) · `.claude/fable-verdict-20261008-partial-shipment*.md` · `docs/PURCHASE_ORDER_SYSTEM.md:2812~2822`.
- 개발 DB(읽기): 브랜드 판매 주문 159건(draft 3 · submitted 12 · confirmed 2 · shipped 2 · delivered 1 · partial_received 1 · received 137 · cancelled 1) · 주문당 품목 최대 4. 10-08 운영 실측(그 판정문): 브랜드 판매 18건 전부 «보내기» 기록 · 공급업체 47건 전부 «보내기» 없이 수령.
- 배포 포함 여부: `git merge-base --is-ancestor e0100cfd3 25145aa38`(10-27 배포 준비) · `22568bad8`(11-02 배포 기록) 둘 다 참. 운영 DB 칸 존재는 미확인.
