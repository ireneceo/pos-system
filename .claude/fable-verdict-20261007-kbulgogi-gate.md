# [Fable 판정] K-Bulgogi 1kg 정리 — 적용 뒤 증명 게이트 (2026-10-07 · 2회차)

> 읽기만 했습니다. 코드·데이터 변경 0 · 운영 서버 명령 0.
> 본 것: 1회차 판정문 §7 · `scripts/migrate-kbulgogi-mirror-swap-20261007.js` · 개발 영수증 2건(`~/.claude/jobs/efb14fd8/tmp/receipts/`) ·
> `services/stockItemMirror.js`(syncMirrors·ensureSourceSellerLink) · `services/sellerLinkConversion.js`(deriveLinkConversion) ·
> `services/purchaseOrderReceive.js:98-110` · `services/costSync.js:140-176` · `routes/purchase-orders-crud.js:853-870` ·
> `routes/seller-orders.js:700-780` · `scripts/inspection/suites/ingredient-unification.js`(002·003·004·018·019·020·032) ·
> `scripts/migrate-merge-product-mirrors.js:156` · `utils/sellerNames.js` · 개발 DB 읽기(브랜드 17 잔여 0 · ING-UNI-018 0) ·
> `fable-gate.js status` · `check-sensitive-diff` · `check-print-guard`(지금 상태) · `.claude/session-state.md`.
> 운영 값은 전부 **팀원 보고를 그대로** 쓴 것이고 내가 운영을 다시 읽지는 않았다.

## 0. 한 줄 결론

**PASS — K-불고기는 이제 «GIT 가 파는 주문제작 상품 하나 + 브랜드 재료 한 줄(#23)» 이 됐고, 이력·숫자·레시피 원가는 하나도 안 움직였다. 되돌릴 것 없음.**
남은 건 두 가지다. ① K-DINE 쪽 발주 연결 숫자(1팩 = 1,000 g)가 지금 판매 규격(100 g)과 10배 어긋나 있다 — Irene 「우린 알아서 맞추고」라 손대지 않았고, 이 문서로 알린다. ② **통과 마커는 찍지 않는다** — 지금 작업트리에 이 사안과 무관한 키오스크 구현(🔒 orders-crud · 서버 마운트)이 섞여 있어, 마커가 그것까지 덮게 된다(§5).

## 1. §7 증명 기준 대조

| §7 기준 | 결과 | 근거 |
|---|---|---|
| 운영 인스펙션 018·004·002·019 = 0 | **조건은 전부 충족, 하니스 실행은 안 함** | 팀원 운영 읽기: #23 출처 = bp#30 하나(004 ✔) · #89 비활성(002 는 활성만 봄 ✔) · #23 원가 75 > 0(019 ✔) · 018 모양 운영 전역 0(스크립트 P1 이 018 과 **같은 SQL** — `ingredient-unification.js:256` 과 `migrate…swap.js:135` 대조 완료) |
| #23: 출처 bp#30 · PI 출처 NULL · 활성 · 레시피 4줄 그대로 · 오버레이·원장·배치 전후 동일 | **✔** | 운영 P5 지문 «레시피 4·qty 250·매핑 1·원장 129·배치 4·batch_qty 7870·오버레이 1·7870» 전후 같음. 1회차에 적은 8,590 g 이 7,870 g 인 것은 10-05 이후 판매차감 10건(−720 g) — 스크립트가 움직인 게 아니다(원장 119→129 도 같은 이유) |
| #89: 비활성 · 출처 NULL | **✔** | 운영 적용 뒤 읽기 |
| 레시피 원가 g 당 0.075 전후 동일 | **✔** | 운영 P6 0.075 → 0.075. 100 g 줄 = 7.50 |
| 재발 반증(bp#30 저장 → #89 안 켜짐 · #23 이 따라감) | **개발에서만 ✔ · 운영은 안 함 → 코드로 수용** | 동기화는 `source_brand_product_id = 30` 인 행만 찾는다(`syncMirrors` sourceKey). #89 는 그 칸이 NULL 이라 **찾히지 않는다 = 켜질 길이 없다.** 운영에서 저장해 보는 건 운영 쓰기라 안 한 것이 맞다 |
| 출고 반증(개발 38) | **안 함 → 운영 bp#30 모양상 불필요** | 운영 bp#30: 다이렉트 NULL · product_recipe_id 2(줄 0). `seller-orders.js:714` 다이렉트 분기 건너뜀 → 레시피 분기(:772)는 줄 0 이라 아무것도 안 깎음 → 자체재고 분기는 `product_kind !== 'stock'` 이라 건너뜀. 1회차가 걱정한 «주문제작인데 PI-302 가 계속 깎임» 은 **애초에 걸려 있지 않았다** |
| 합치기 마이그 운영 드라이런 «⏸ K-Bulgogi» 사라짐 | **안 함 → SQL 동일로 수용** | `migrate-merge-product-mirrors.js:156` 의 쌍 찾기가 018 과 같은 JOIN(`bpm.source_brand_product_id = isp.seller_product_id AND bpm.is_active = 1`). #89 가 둘 다 아니므로 쌍이 안 잡힌다. 다음 배포 게이트 출력으로 저절로 확인된다 |
| 스크립트 안전장치 | **✔** | 드라이런 = 적용·증명·무조건 롤백 / 증명 실패 시 롤백·영수증 미작성(개발 고장주입 확인) / 멱등(«손대지 않음») / undo 는 영수증 **커밋 전** 작성 / 레지스트리 `manual` |
| 개발 재현 데이터 정리 | **✔** | 지금 개발 DB: 브랜드 17 «ulgogi» 재료 0 · ING-UNI-018 0. 영수증 2건(12:58·12:59 — 적용→undo→재적용 순)이 남아 있고 내용이 보고와 맞다 |

**추가로 한 with MIN Cafe 연결(isp#1421)**도 맞게 들어갔다: 화면이 쓰는 함수(`linkCatalogProductToRestaurant`)를 그대로 불렀고, 환산 100 은 `deriveLinkConversion` ② 규칙(pack 주문 + 같은 단위 → 판매 기준양)대로다 = **1팩 입고 → +100 g**, 입고 원가 7.50 ÷ 100 = 0.075/g. 다른 K-소스 14건과 같은 `seller_type brand · entity 1` 이라 거래처 이름도 그 14건과 **같은 함수·같은 행**으로 풀린다(`buildSellerDisplayName` = 회사명 단독) → 그 14건이 «GIT Consulting» 으로 보이면 이것도 그렇게 보인다. 직접 본 건 아니다.

## 2. 남은 위험 (되돌릴 사유 아님)

**R1. K-DINE IPC 의 발주 연결 isp#1272 환산 1000 — 판매 규격과 10배 어긋남.**
bp#30 은 이제 100 g 짜리 1팩 @ 7.50 인데, K-DINE 연결은 «1팩 = 1,000 g» 이다. 다음에 K-DINE 이 1 을 주문하면 GIT 는 100 g 을 보내고 값은 7.50(스크립트 ③ 원가 재계산이 연결 단가를 현재가로 맞춘다 — `costSync.js:171`), **매장 재고는 +1,000 g** 이 올라간다(`purchaseOrderReceive.js:98` 수량 × 환산). 원가도 7.50 ÷ 1000 = 0.0075/g 로 10배 싸게 잡힌다. **지금 당장 틀어진 숫자는 없다 — 다음 발주부터** 생긴다.
→ 고치는 것은 숫자 하나: 매장 재료 화면 → K-Bulgogi → 거래처 연결 → 환산 **1000 → 100** (PUT /api/ingredient-seller-products/:id — 아직 안 받은 발주 줄에만 전파, 받은 것은 무접촉). Irene 「우린 알아서」 범위라 팀원이 손대지 않은 것이 맞다.

**R2. K-DINE 매장 소유 ing#1122 «K-Bulgogi 1kg»(kg, 4, 연결 isp#1295 환산 1)** — 같은 물건 두 번째 줄. 이 줄로 주문하면 1 → +1 kg @ 7.50, 역시 10배. 1회차 Q2 권고 그대로: 실사 0 뒤 삭제. 레시피는 #23 만 보니 이 줄에 재고가 있어도 레시피 숫자는 안 움직인다.

**R3. 이름 «K-Bulgogi 1kg» 과 규격 100 g.** bp#30 을 다음에 한 번 저장하면 #23 이름도 «K-Bulgogi 1kg» 로 따라간다(MIRRORED_FIELDS 에 name). 매장이 «1kg» 을 보고 1 을 시키면 100 g 이 온다. 이름을 «K-Bulgogi 100g» 로 바꾸는 것(판매상품 화면 한 칸)을 권한다. 안 바꿔도 숫자는 안 틀어진다.

**R4. Q1 은 사실상 (b) 로 정해진 것이다.** Irene 「이미 내가 정리했는데」= 10-05 의 100 g @ 7.50 이 의도. with MIN 연결 환산 100 은 그 규격에 맞춰 만들어졌다. **나중에 bp#30 을 다시 1 kg 으로 되돌리면 이번엔 with MIN 쪽 100 이 틀린 값이 된다**(기존 연결은 자동으로 다시 계산되지 않는다 — `ensureSourceSellerLink` 는 있으면 무접촉). 규격은 한 번 정했으면 두지 말고 흔들지 않는 것이 좋다.

**R5. bp#30 의 product_recipe_id = 2 는 줄 0 짜리 빈 레시피 연결.** 해롭지 않다(깎을 게 없음). 비우면 ING-UNI-005 목록에 «미연결» 로 올라가므로 **그대로 두는 쪽**이 깨끗하다.

**R6. 확인 못 한 것(사실 그대로).** 운영 인스펙션 하니스 전체 실행 · isp#1272 의 `buyer_restaurant_id`·`unit_price` 현재값(R1 의 «7.50 으로 맞춰졌다» 는 코드로 추론, 운영 재조회는 안 함) · 거래처 표시 이름 실제 화면 · 운영 영수증 파일 내용(운영 서버에 있어 못 봄).

## 3. Irene 에게 알릴 말 (팀원이 그대로 전달)

> K-불고기 정리는 끝났습니다. 브랜드 재료는 한 줄(#23)만 남았고, 레시피 4줄·매장 재고 7,870 g·입출고 기록은 하나도 안 움직였습니다. 레시피 원가도 그대로(100 g = 7.50)입니다. with MIN Cafe 에는 GIT 판매상품으로 연결해 두었습니다(1팩 = 100 g, 7.50).
>
> 「우린 알아서 맞추고」 하신 K-DINE 쪽은 안 건드렸는데, 숫자 하나가 지금 판매 규격과 어긋나 있어 알려 드립니다:
> - K-DINE 의 K-Bulgogi 거래처 연결이 «1팩 = 1,000 g» 으로 돼 있습니다. 상품은 이제 100 g 짜리라, 다음에 1 을 주문하면 GIT 는 100 g 을 보내고 값은 7.50 인데 매장 재고는 +1,000 g 이 올라갑니다. 매장 재료 화면 → K-Bulgogi → 거래처 연결에서 환산을 **100** 으로 바꾸면 끝입니다(이미 받은 발주는 영향 없음).
> - K-DINE 에 매장 소유 «K-Bulgogi 1kg» 줄(4 kg)이 따로 하나 더 있습니다. 이 줄로 주문하면 같은 문제(1 → +1 kg)가 납니다. 실사 뒤 0 으로 맞추고 지우시는 걸 권합니다.
> - 상품 이름이 «K-Bulgogi 1kg» 인데 규격은 100 g 입니다. 이름을 «K-Bulgogi 100g» 로 바꾸시면 매장이 헷갈리지 않습니다(안 바꿔도 숫자는 안 틀어집니다).
>
> 규격(100 g @ 7.50)은 이제 두 매장 연결이 그 기준으로 맞춰져 있으니, 나중에 1 kg 으로 되돌리면 그때는 with MIN 쪽 숫자를 다시 맞춰야 합니다.

## 4. 팀원이 더 할 일

1. 작업기록 «답 기다림 — K-Bulgogi» 절을 «완료» 로 옮기고, R1~R3 를 «Irene 이 해야 할 일» 로 남긴다(운영 쓰기라 팀원이 하지 않는다). 메모리 `project_kbulgogi_made_to_order` 를 «완료 · K-DINE 환산 100 대기» 로 갱신.
2. 운영 영수증 경로(`/var/www/backups/data-migrations/kbulgogi-mirror-swap-2026-10-07T13-21-09-724Z.json`, 운영 서버)와 되돌리기 명령(`--undo=<영수증> --apply`, production-backend 에서)을 작업기록에 적는다.
3. 운영 읽기가 다시 열리면(읽기 전용 계정) isp#1272 의 `unit_price`·`buyer_restaurant_id` 를 한 번 읽어 R1 의 «7.50» 추론을 사실로 바꾼다. 안 열리면 «확인 못 함» 그대로.
4. 다음 배포 게이트 출력에서 합치기 마이그 «⏸ K-Bulgogi» 줄이 사라진 것을 확인해 기록한다(따로 돌릴 필요 없음).
5. **완료 보고에 «print-guard 8/8» 을 그대로 쓰지 말 것** — 지금 작업트리에서는 `check-print-guard` 가 **orders-crud.js 변경 1건으로 실패**한다(§5). 그 변경은 K-Bulgogi 가 아니라 키오스크 것이다. 보고에는 «K-Bulgogi 변경분은 인쇄 보호파일 무접촉, 작업트리의 print-guard 실패는 키오스크 작업분» 이라고 사실대로 적는다.

## 5. 통과 마커 — 찍지 않음 (이유)

`fable-gate.js status`: 지문 e505d2d5032f · 민감 판정 «대상» · 마커 무효. `check-sensitive-diff` 가 잡은 것 중 **이 사안 것은 `migrate-kbulgogi-mirror-swap-20261007.js`(③) 하나**다. 나머지 — `middleware/kioskDevice.js`(⑤) · `server.js` 마운트(⑤) · `models/KioskDevice.js`·`migrate-create-kiosk-devices.js`(③) · **`routes/orders-crud.js`(① 🔒 · ②)** — 는 키오스크 결제 분리 구현이고, 작업기록상 그 사안은 **«Irene 답 기다림 · 승인 없이 착수 불가»** 상태이며 2회차 게이트 판정도 없다. 마커는 지문 단위라 찍으면 그것까지 «Fable 통과» 가 된다.
→ **K-Bulgogi 는 PASS 이되 마커는 보류.** 찍을 수 있는 때: 키오스크 분이 자기 게이트(2회차)를 받은 뒤, 또는 키오스크 파일이 작업트리에서 빠진 뒤. 그때 이 판정문을 근거로 `fable-gate.js pass --note "K-Bulgogi 스왑 PASS(fable-verdict-20261007-kbulgogi-gate.md) + <키오스크 판정>"` 로 찍는다. 정지 훅은 같은 지문에 한 번만 막으니 작업이 갇히지는 않는다.
