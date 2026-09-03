## 현재 작업 상태
**마지막 업데이트:** 2026-09-03 18:40 UTC (운영 배포 #5 완료)
**버전:** v3.81 (SW 4.77 — 버전 상승 여부 Irene 답 대기)
**작업 상태:** 배포 완료

### 진행 중인 작업
- 없음

### 이번 배포 (2026-09-03 #5 — SW 4.77 `dev-issues-i18n`)
- **운영 반영 완료** 18:40 UTC. 백업 `/var/www/backups/20260903_182510` · 스모크 10/10 · PM2 online(restart 6)
- 게이트: verify-all 표준 **16/16** · 배포 안전게이트 **10/10** · post-build 실브라우저 mount sweep **674.5초 크래시 0** · Fable 통과 마커 유효(지문 `3dc6c2b1214c`)
- 운영 실측: `sw.js` = `4.77-dev-issues-i18n-20260903` · 번들 해시 `main.5ed0d9c7.js` 일치 · 4개 언어 `nav.section.solutionIssues` 존재 · `/api/admin/deploy-records` 401(마운트됨) · 운영 releases 에 이번 기록 존재
- 내용: 소스 한글 하드코딩 게이트 신설(`check-i18n-hardcoded.js`, verify-all + 배포 3b/10 fail-closed) · 개발이슈 화면 4개 언어 24건 · 알림함 상대시간 `Intl.RelativeTimeFormat` · 플로어플랜 안내 4건 · 문의 본문 2줄+더보기 공용 `ClampText`(7화면) · 배포기록 '접수된 문의' 섹션 + `resolves` 칸 · 좌측 메뉴 개발이슈 별도 섹션. 닫은 문의 `SUPP-2026-9449-255`
- **1회 실패 후 재시도(우리 코드 무관)**: 첫 시도의 프론트 빌드가 메모리 게이트에 막힘(가용 1574MB < 필요 2500MB — 같은 서버 `/opt/planq` tsc 3.8GB 동시 실행). 그 빌드가 끝난 뒤 재실행해 성공. **남의 빌드를 죽이지 않았음**
- 남은 육안 확인(Irene): 문의 목록 '더 보기' 펼침 · 배포기록 하단 접수 문의 섹션 · 언어 전환 시 개발이슈 화면 문구
- ⚠ 배포 로그 WARN 1건(차단 아님): `purchase_orders.status` ENUM **값 집합은 동일**, 순서만 dev↔운영 상이

### 완료된 작업 (앞 세션)
- **판매 차감 계약 불일치 수정 (4차 배포)** — POS 주문 라인에 `product_id` 가 없어 카트 임시 id(`order-<ts>`)를 상품 id 로 오인, **POS 주문 전체가 전 매장에서 한 번도 재고를 깎지 못하고 있었다**(운영 완료 라인 1,444건 중 product_id 0건 / 매장8 `order_deduct` 0건, 그 사이 완료 주문 13,833건). 인쇄가 이미 쓰던 `resolveProductId` 재사용으로 수정 — 새 규칙 만들지 않음. 세트 경로는 정상이었음(`set_components` 103/103 무접촉). 커밋 `f2b56389`
- **관측 구멍 분리** — `unresolved_line`(상품 식별 불가) ≠ `skipped_no_recipe`(레시피 없음). 둘을 섞은 것이 결함을 오래 숨겼다
- **POS 라인 모양 계약 신설 + 고장주입 반증** — 기존 3건(2106·2149·2180)은 `product_id` 를 손으로 넣어 직접 호출해 못 잡았다. 옛 코드 복원 시 새 계약만 실패함을 확인
- **🔒 `stationEnrichment.js` export 1줄** — 인쇄 계약 10/10 통과로 동작 무변화 증명 후 Fable bless(manifest 2줄만 변경, 나머지 7개 지문 불변 — 독립 검증함)
- **K-DINE with MIN 레시피 운영 반영** — 45건 보완 · 7건 신규(해물비빔밥·육개장·Pre-cook 5, RCP-069~075). 이름변경 0(209 `Jjajang Ramen` 유지) · 재료링크 267→267 무변화 · 스펙 밖 23건 `updated_at` 불변 · 스냅샷 `/var/www/backups/kdine-recipes-before-2026-09-02T1703.json`
- **레시피 다운로드 재구성 (5차 배포)** — "재료 1건=1줄"이라 조리법 열이 아예 없던 것 → **레시피 1건=1줄** + `Recipe Summary`·`Instructions` 열, 재료는 한 칸에 `이름 수량단위; …`. 셀 내 줄바꿈 ` | ` 치환. 13열. SW 4.73. 커밋 `7419ee41`
- **재료 대조표(읽기 전용)** — 스펙 재료 문자열 ↔ 브랜드 재료 146건. 연결 29줄 · 신규 후보 4종 · 결정 필요 3줄. **자동 연결·생성은 하지 않음**(Fable 규칙: 옵션·[REDUCED] 제외, g/ml/ea/pack 만, 정규화 완전일치+별칭, 물만 g=ml 예외)
- 배포 사후 확인: 3차(라우트 append + 해시 5/5) · 4차(해시 3/3) · 5차(운영 번들 새 열 2개 · 옛 열 0 · SW 4.73)

### 검증 규율 추가 (2026-09-03 — 오늘 3회 오판에서 나옴)
- **대조 스크립트는 "두 값의 단위가 같은가" 를 첫 줄 주석에 박는다.** 오늘 판정 기계가 3번 틀렸고 셋 다 **다른 단위를 비교한 것**이었다: ①스냅샷 날짜(ISO 문자열) vs 라이브(Date 객체) → 105행 거짓 불일치 ②`SUM(quantity_ordered)`(수량 합) vs 원장 **행 수** → "원장 결손" 오진 ③원장 합(재료 단위, 5000) vs `quantity_received`(라인 단위, 5) → 백필 규칙 오류 직전. 셋 다 결과가 이상해 파고들어 잡았지만, 처음부터 단위를 맞추는 게 정석이다. 메모리 [[reference_snapshot_fingerprint_date_normalize]]

### 기록만 (다음 사이클 — 지금 손대지 않음)
- **K-DINE `unit_cost` 가 포장당 의심** — `Rice Cake`(g) 13.0 = Irene 말한 1kg 팩 RM13 과 일치, `Glass Noodle`(g) 150.0 도 같은 모양. `base_quantity` 실측 필요. 원가 표시 문제이고 재고 차감과 무관 — 원가 정리 때
- **brand 2 재료 코드 중복 2쌍** — `ING-046`: id 46/47 · `ING-054`: id 55/56. `count+1` 채번 사고 흔적(2026-01). 재료 id 34 이름 앞뒤 공백(`" Sunflower & Canola Oil "`)과 묶어 별도 정리
- **자체재고를 쓰는지에 대한 정의 불일치 (결함 아님)** — 편집 화면(`MenuManagementPage.tsx:1365`)은 "`recipe_id` 있음 = 자체재고 안 씀" 으로 정의하고, 차감 서비스(`inventoryDeductionService.js:210`)는 "재료 1줄 이상 = 재료 경로" 로 정의한다. **두 정의가 "레시피는 있는데 재료 0줄" 에서 갈린다.** 실해는 IPC 13개 메뉴 한정 · 현재 재고 0 이라 0. 어느 쪽을 정본으로 맞출지 **지금 정하지 않는다**(폴백도 P1 설계도 각각 합리적, 고치면 코드 변경 + Fable 게이트). 해소는 코드가 아니라 13개에 재료를 거는 것 → 차이표 첫 항목
- **(격하) 메뉴 편집 자체재고 0 덮기** — `MenuManagementPage.tsx:1365-1369`. **의도된 설계**(커밋 `5e04aa50` P1, 옆줄 주석이 근거: 레시피 걸린 메뉴는 자체재고를 안 쓴다는 전제). 재료 오버레이는 안 건드리므로 50건은 무관. 위 13건에만 유효 · 실해 0 · 저순위. 코드 수정 안 함
- **(무해 확인) `MenuManagementPage.tsx:1175-1179`** — 레시피 이름이 `(auto)` 로 끝날 때만 화면에서 recipe_id 제거. DB 전체 `(auto)` 레시피 **0건**이라 걸리지 않음(G4)
- **`routes/menu.js:490·701·737` directIngredients 분기** — 편집 저장이 브랜드 레시피 재료 줄을 바꾸는지 **미확인**. 재고 수량 문제는 아님
- **`Order.order_items` getter 무방비 `JSON.parse`** (`models/Order.js:212`) — 값이 한 번 깨지면 그 주문을 읽는 모든 경로(목록·KDS·pending-print 조회)가 함께 죽는 단일 실패점. 라우트 6곳(`665·720·992·1123·1409·1547`)은 이미 `try/catch → []` 로 방어하는데 모델만 무방비 = 방어 비대칭. setter 가 항상 stringify 하므로 **실해 관측 0**. 수정은 pending-print 경로라 print-guard + Fable 게이트 대상
- **기존 29건 링크가 본문 수량과 어긋남** — `[REDUCED]` 문단이 있는 5건은 5/5 전부 REDUCED 쪽 작은 값을 링크. 규칙 1(기본 부분 사용)과 방향이 반대. 차이표 작업 때 규칙 1 재검토 근거. 이번 대상 7건에는 `[REDUCED]` 가 없어 무영향(실측 확인)

### 완료 (2026-09-03)
- **K-DINE 재료 연결 적용 — Fable 판정 PASS.** 운영 반영. 코드 변경 0 → 배포 없음
  - 신규 재료 1건 `Seafood Mix_Prepared`(pack, 단가 0, `ING-058`, id 1090). `Green Onion` 은 **만들지 않음** — 실측이 Fable 초기 판정을 뒤집었다([32] 는 본문에 K-leek 없이 `green onions` 만 있는데 Korean Leek 25g 링크 = 브랜드가 같은 재료의 두 이름으로 써 왔음). 파 계열 링크가 2줄인 레시피 0건
  - 연결 **33줄 / 레시피 7건**: [203] 7 · [205] 5 · [206] 4 · [207] 3 · [208] 1 · [209] 8 · [230] 5. 링크 267 → 300
  - Irene 답 반영: 기름 = **식용유 Sunflower & Canola(34)**, 튀김용 38 아님(운영 선례로 확인 — 볶음 14건이 34, 튀김치킨 3건만 38). 떡 `3ea` = **55g**([34] Ramen Tteokbokki 가 같은 문장에 건 값). 파 = Korean Leek **35g** 한 줄(30g K-leek + 5g green onions 합산)
  - **무접촉 증명**: 적용 전 스냅샷 `/var/www/backups/kdine-links-before-2026-09-03T0450.json` + 대상 외 267줄의 `(id,recipe_id,ingredient_id,quantity,unit)` sha256 지문 전후 동일(`c485f70128ce767e`). 단위 불일치 0 · 기존 재료 변경 0 · 고아 조인 0
  - 미연결 3줄: `2T cooking oil`([203]) · `1t anchovy sauce`([208]) — 스푼 단위 / `30g 해물볶음`([229]) — 조리 중간재. **[229] 해물비빔밥은 여전히 차감 안 됨**
  - 스크립트 `scratchpad/apply-kdine-links.js`(드라이런 기본 · 트랜잭션 1개 · 대상 링크 0건 assert · 저장단위≠재료단위 중단 · 채번 최대값+1)
  - ⚠ 세션 중 내 오보 1건: 운영 SSH 를 "차단" 으로 보고했으나 실제로는 `.env` grep·`scp` 두 명령만 거부된 것. Irene 이 "배포하면서 다 하는 거 아니야?" 로 잡아냄

- **IPC 메뉴 ↔ 브랜드 레시피 연결 — Fable 판정 PASS.** 운영 반영. 코드 변경 0 → 배포 없음
  - IPC = 매장 8 `K-DINE IPC Branch`(brand 2, is_demo 0). 메뉴 105건 중 연결 **1 → 63건**
  - **62건 연결**: 정규화 완전일치 36 + 손 별칭 26(별칭표는 `scratchpad/ipc-link.js` 안 `ALIAS_MENU_TO_RECIPE`). 그중 재료 걸린 레시피 **50건** · 재료 0줄 13건
  - **무접촉 증명**: 스냅샷 `/var/www/backups/ipc-products-before-2026-09-03T0551.json` + 실제 달라진 컬럼 전수 `{"recipe_id":62,"updatedAt":62}`, 나머지 전 컬럼 지문 동일(`a35b2f78d92a4cf3`). 매장 8 외 667행 무변화 · [349] recipe 19 그대로 · `product_recipe_id` 무접촉
  - 롤백 1회: `products` 는 `updated_at` 이 아니라 **`updatedAt`**(camelCase). 트랜잭션이 막아 쓰기 0 확인 후 재실행
  - 게이트: G1 소비처 전수 · G2 고장주입(dev 38) · G3 오버레이 분기 · G4 `(auto)` 레시피 0건
  - **추가 2건 (Irene 답 "같은 음식이야. 그냥 Egg 빼")**: [49][355] `Sausage Egg Fried Rice` → 레시피 [20] `Sausage Veggie Fried Rice`(재료 8줄). 연결 **63 → 65건**, 재료 있는 레시피 **52건** · 재료 0줄 13건. 스냅샷 `/var/www/backups/ipc-products-before-2026-09-03T0610.json` · 달라진 컬럼 `{"recipe_id":2,"updatedAt":2}` · 나머지 지문 동일(`a35b2f78d92a4cf3`) · 매장8 외 667행 무변화
- **9/2 판매 차감 수정 — 운영 작동 확인(앞 세션 "확인 불가" 종결).** 9/3 IPC 주문 21건에서 `✓ [INVENTORY] Deducted N ingredients` + `product_id: 42/43/60` 로 상품이 정확히 해석됨. 주문 라인엔 여전히 `product_id` 없음(`menuItem.id` 경유) — 고친 그 경로가 돈다
- **운영 전체에 깎을 재고가 없다(실측)** — 메뉴 자체재고 >0 매장 0곳 · 재료 오버레이 >0 매장 0곳 · 매장 자체재료만 매장10(40) 매장13(11). `order_deduct` 원장은 역대 전 매장 0건인데 **결함이 아니라 재고 0 이라 정상**(`take=min(qty,0)=0`, `take>0` 일 때만 원장)
- **고장주입 2건 모두 1차가 가짜였다** — ①`order_items` 깨진 문자열 주입 → `models/Order.js:212` getter 에서 먼저 터져 400(차감 블록 미도달) ②지문 대조가 날짜 직렬화 형식 차이로 105행 거짓 불일치. 둘 다 결과를 의심해 원인을 판정 기계에서 찾았다

### ⏸ Irene 답 대기 — 실행 순서 (세션 여기서 멈춤)
셋은 서로 독립. 어느 것부터 와도 됨. 스크립트는 전부 준비·검증 완료, **운영 쓰기 0**.

1. ~~**`/배포`**~~ **완료(2026-09-03 #1 회차에 반영됨)** → 운영 스모크(`health-check --category=po`; 운영에 데모 매장 없으면 **SKIP 이 크게 찍히는지 확인하고 그 사실을 보고**) → 백필 `scratchpad/backfill-received.js --apply`(스냅샷 먼저) → 대조(바뀐 컬럼 `quantity_received` 50행·`updated_at` 뿐, PO별 주문합=수령합 9/9) → Fable 판정 → **Irene 화면 확인 2곳**(`PurchaseOrderDetailPage.tsx:1217` 수령 수량 · 반품 최대 수량)
   - 배포 내용: `services/purchaseOrderReceive.js`(라인 수령량 쓰기 단일화 + `markAllReceived` 남은양만) · `routes/purchase-orders-workflow.js`(자체 쓰기 3곳 제거) · `scripts/health-check.js`(계약 5건 추가) · `docs/PURCHASE_ORDER_SYSTEM.md`(§10 설계). 마이그 0 · SW bump 0 · 프론트 0
   - Fable 게이트 PASS (지문 `756d1e8d5c9a`) — **워킹트리 바뀌면 무효, 재판정 필요**
2. **설계 컨펌**(§10) → `scratchpad/apply-brand2-mappings.js` 드라이런 재실행(시점 차이 확인) → Fable → `--apply` 9건
3. **K-Yukgaejang 1봉 kg** → 10건째, 같은 스크립트(별도 승인 불필요). 안 오면 9건 유지

### 다음 확정 작업
- **IPC 재료 재고 입력 (Irene 진행) → 첫 판매 로그 확인** — Fable 판정: **재고 입력이 먼저, 결함 수정은 선행 조건 아님.** 근거 실측: 재고 입력은 재고실사(`StockTakePage` → `POST /restaurants/:id/stock-takes`)·발주수령 → `applyStock` → `restaurant_ingredient_stocks` 오버레이. **`products` 도 `routes/menu.js` 도 지나지 않는다.** Irene 이 재고를 넣고 첫 판매가 나면 내가 로그로 차감 확인
- **차이표 작업 (K-DINE 기존 29건 + 후속)** — ①**첫 항목**: 재료 0줄 레시피 13개에 재료 걸기 — 재료는 브랜드에 이미 있음(에이드=`… Base`, Rice=`Rice Carlos`, Fried Egg=`Egg`, Kimchi=`K-Kimchi`). **없는 건 수량**(1잔에 베이스 몇 ml, 밥 몇 g)이고 Irene 스펙에서 와야 함 → 차이표 지시가 올 때 첫 질문으로 묶어 올린다. 그 전엔 착수 안 함 ②육개장 두 벌([19] 7줄 — 메뉴 349 연결 / [230] 5줄 — 9/2 스펙) 정본 결정 ③`[REDUCED]` 규칙 재검토(기존 5건이 5/5 REDUCED 값을 링크 — 규칙 1과 방향 반대)
- **9/2 신메뉴 7개 연결** — IPC 메뉴판에 등록되면 같은 방식으로 연결(현재 IPC 메뉴 105건에 이름 없음)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **재고 0 에서 팔린 부족분이 어디에도 안 남는다** — `StockAlert` 에 `product_id`·`order_id`·부족수량 자리가 없음. P1 의 "0 에서 0 빼는 줄 안 남김" 결정과 충돌하므로 설계 필요(반응 패치 금지)
- 브랜드 재료가 `K-Jjajang`(g) 과 `K-Jjajang Sauce 1kg`(piece) 로 **두 벌** — 목록 갈라짐(④) 설계에서 다룸. 지금 합치지 않음
- 발주↔인보이스 원가 대조 (데이터 0건)
- `all` 배포모드 제외 (`brand_products.excluded_brand_ids`)
- FK `ON DELETE SET NULL` 로 과거 발주 라인 포인터 소실 (운영 사고 관측 없음, 최하위)
- Irene 직접 확인 대기: GIT 계정 화면(컵·뚜껑 18 pack) · `PO-R10-20260827-001` 실출고

### 확인 불가 (감추지 않고 남김)
- **브랜드 공유 재료 오버레이(`restaurant_ingredient_stocks`) 분기의 실제 차감 미증명** — health-check `:2080` 이 증명하는 건 *매장 자체 재료* 경로다. IPC 가 타는 건 `brandStockAccess.stockFor` 오버레이 분기이고 dev·운영 모두 증거 없음(코드 실측으로 형제 매장 오염 없음만 확인). **IPC 가 재고를 처음 넣는 날 첫 판매 1건의 로그(`Deducted N ingredients` + `inventory_transactions.order_deduct` 1행)로 닫는다**
- **K-DINE 레시피 화면 실HTTP 확인** — 9/2 `BG_TOKEN` 만료(403), 비밀번호는 쓰지 않음. 핸들러(`routes/recipes.js:61`)와 동일 include 로 운영 조회해 [209] 8줄·고아 0 까지는 확인. 남은 건 `isBrandManager` 통과한 실응답 — Irene 이 브랜드 레시피 화면에서 Jjajang Ramen 열어 재료 8줄 보이면 닫힘
- 3차 배포 ④ 운영 BG 사이드바 실노출 — 플랜 테이블 구조(`entity_plans`/`plan_templates`)가 달라 짚지 못함. 메뉴가 안 보이면 플랜에 Ingredients 모듈 포함 여부 확인

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
