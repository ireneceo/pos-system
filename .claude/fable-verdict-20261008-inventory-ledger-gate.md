# [Fable 게이트 판정] 재고 → 원가 묶음 0 + 묶음 1 «장부 = 단일 진실» (2026-10-08 · 2회차)

> 설계 = `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-1 · Ⅱ-2 · G(증명 기준). Irene 컨펌 «권고대로» ①a ②a ③b ④b ⑤a.
> 입력 = `.claude/fable-input-20261008-inventory-ledger-gate.md`(팀원 실측). 작성 Fable 5.1 · 코드 수정 0 · 운영 접근 0.
> 이 사안의 Fable 호출 2회차(게이트) — 여기서 끝. 묶음 2 는 별도 사안으로 1회차(설계 확인)+2회차.

## 판정: **PASS — 개발 완료 · 배포 가능.** 배포 전 기계 조건 1개(SW 버전) · 묶음 2 착수 전 정리 2건 · 기록 1건.

---

# Ⅰ. Irene 보고문 (팀원이 그대로 전달)

**Fable 판정: 통과입니다. 재고 장부를 «단 하나의 문»으로 모으는 묶음 1 과 숫자 결함 수정 묶음 0 은 설계대로 됐고, 제가 직접 다시 확인한 결과도 같습니다.**

**제가 직접 확인한 것(팀원 보고를 믿지 않고 다시 돌린 것)**
- 재고 수량을 바꾸는 코드가 코드 전체에서 **장부 함수 한 곳**만 남았는지 — 맞습니다(검색 결과 1곳).
- 장부 불변식 4개 검사: «장부 합 = 현재고» 47건 어긋남은 **전부 옛 누수**(새 코드가 들어온 오늘 이후 줄은 0건) · 오늘 이후 줄의 사슬 끊김 0 · 금액 빈 줄 0 · 폐기 사유 빈 줄 0.
- **검사기를 일부러 깨 봤습니다** — 장부를 안 거친 재고 변경을 흉내 낸 두 줄을 넣자 사슬 검사가 정확히 그 두 줄을 잡았고, 넣은 것은 전부 되돌렸습니다(잔재 0).
- 마이그레이션 두 번 돌려 두 번째는 «추가 0» — 멱등. 레지스트리 등록 ✓. 인쇄 보호파일 8/8 무접촉 ✓.
- 자동 검증 재실행: 재고 54/54 · 보안 72/72(새로 추가된 «Staff 는 조정·초기재고·실사 확정 403» 포함).
- 매장 원가 = **마지막 실제 매입가**(컨펌 ③) — 가중평균 코드가 지워졌고, 수령 2회(25 → 30) 뒤 원가 30 · 변경 이력 2줄이 남는 것을 팀원 실호출로 확인(가중평균이면 24 가 나왔을 값).

**설계와 다르게 한 다섯 가지 — 전부 수용**
1. 장부 줄에 «그때 기준양» 칸 1개 추가(설계엔 없음) — 나중에 재료 기준양이 바뀌어도 옛 금액을 설명할 수 있어 더 낫습니다.
2. 소모품(일반재고) 장부엔 금액 칸을 안 더함 — 이미 같은 뜻의 칸이 있어서. «같은 개념에 두 벌 금지» 규칙에 맞습니다.
3. 메뉴·브랜드 상품·푸드코트 상품 **수정 창**에서 수량을 고치면 거부(400) 대신 **장부 조정 1줄로 반영** — 화면이 이미 수량을 보내고 있어 거부하면 화면이 깨집니다. 장부를 거치므로 목적은 같습니다.
4. 새 자동 검사 1개 추가(장부 줄 사슬) — «장부 합 = 현재고» 가 옛 누수 때문에 아직 경고 단계인 동안 **새 누수를 즉시 막는** 살아 있는 문. 제가 깨뜨려 확인했습니다.
5. 실사 확정 장부 = **실측 − 지금 재고**(설계는 실측 − 시작 때 값) — 실사 중 판매가 있어도 장부 합이 현재고와 맞는 더 정확한 식입니다.

**배포하면 매장에서 바뀌는 것(Irene 가 알아 둘 것)**
- 폐기할 때 **사유 선택이 필수**가 됩니다(상함·유통기한·조리 실패·파손·손질 손실·기타).
- **Staff 계정**은 재고 수량 직접 고치기·초기재고·실사 확정/취소가 막힙니다(입고·폐기·실사 입력은 그대로). 운영 매장 Staff 가 이걸 쓰고 있었는지는 **측정 못 했습니다** — 배포 뒤 "안 된다"는 말이 오면 이 변경입니다.
- 배포 뒤 첫 수령부터 매장 원가가 **그 수령 가격**으로 바뀝니다(되돌리기 없음, 이력은 남음).
- 배포 뒤 할 일 1개: 운영에서 «장부 합 ≠ 현재고» 목록을 드라이런으로 뽑아 Irene 께 표로 보여 드리고, 승인하시면 장부에 보정 줄을 넣습니다(재고 숫자는 안 바꿈). 그 뒤 이 검사를 차단 단계로 올립니다.

**묶음 0 에서 한 건 남음** — 구매 비용 보고서 수정(부분 수령·상위 200줄 합계)은 다른 작업방이 그 파일을 고치는 중이라 설계대로 **미룬 것**입니다. 그 방 커밋 뒤 팀원이 합니다.

**운영 배포는 Irene 지시 때만. 배포 직전 SW 버전 올리기(옛 화면이 사유 없이 폐기를 보내면 400 이 나므로)는 팀원이 합니다.**

---

# Ⅱ. 판정 근거 (검증 규율 4조항 대조)

## ① diff 범위 대조 — 설계 밖 변경 0 · 이탈 5건 수용(위 Ⅰ)
| 설계 | 결과 | 내가 본 것 |
|---|---|---|
| Ⅱ-1 0-① 실사 손실 ÷기준양 | ✓ | `inventory-core.js` items PUT·complete 둘 다 `perBaseCost` · `StockTakePage.tsx:401` 같은 식 · 응답에 `ingredient.base_quantity` |
| 0-② 레시피 원가 조회 단위 환산 | ✓ | `product-recipe.js` lineCost(convertQuantity) · `recipes.js:630` · `prepIngredientSync.js:62` 모두 `utils/recipeCost.convertQuantity` 한 규칙 |
| 0-③ purchase-cost-report | **미착수(설계대로)** | 359d0949 미커밋 변경 중 — 그 방 커밋 뒤 |
| 0-④ 폐기 장부 = 실제 깎인 양 | ✓ | `clampAtZero` · 응답 `clamped/wasted` · health-check ① 이 재고 100 에 폐기 500 → 장부 −100·clamped 를 검사 |
| 0-⑤ order_id | ✓ | `inventoryDeductionService.resolveOrderRef` — 🔒 `orders-crud.js` 무접촉(print-guard 8/8 내가 실행) |
| Ⅱ-2-A 칸·함수 | ✓ (+base_quantity) | `stockLedger.record`: 한 트랜잭션 강제(없으면 throw) · after−before · 0 변화 줄 없음 · «0 = 모름» 폴백 · `InventoryTransaction.create` 는 `stockLedger.js` 1곳(+ 보정 스크립트·레거시 마이그) |
| A 기록 경로 전부 이전 | ✓ | inventory-core(initial·receive·waste·adjust·complete) · inventory-extra(수동 deduct·배치 폐기·일반재고) · inventory-produce · purchaseOrderReceive 3경로 · inventoryDeductionService 3경로 · seller-orders 4경로 · po-returns 6경로 · product-ingredients adjust-stock |
| B 문 5개 봉인 | ✓ (400 → 장부 조정) | product-ingredients PUT 허용필드 제거·POST 0+initial · 일반재고 PUT 수량 무시 · 푸드코트 adjust/receive record + 스텁 → 조회 · menu/brand-products/foodcourt-products 생성 0+initial · 수정 → adjustment |
| C 사유 코드 | ✓ | `utils/wasteReasons.js` 6개 · 폐기 400 `WASTE_REASON_REQUIRED` · 폐기도 `deductStockFIFO`(배치만 줄임 — 확인) · 배치 폐기 기본 `expired` · 수동 deduct 유형 4개 고정 |
| D 마지막 매입가 | ✓ | 가중평균 블록 삭제 · `writeStoreCost(incomingCostPerIng)` · `> 0` 가드 · `cost_change_logs` source receive/production(expand-only) |
| E 권한 | ✓ | `STOCK_MANAGER_ROLES` 7개 — `middleware/auth.js` 실재 역할명과 대조(Restaurant Owner 포함, 매장엔 Manager 역할 없음 → Staff 만 빠짐). BG adjust-stock 은 BG 전용 라우트 — 수용 |
| F 인스펙션 | ✓ (+LEDGER-004) | 검사·보정 같은 SQL(`utils/ledgerDrift`) · reconcile 드라이런/--apply/--undo |
| G 증명 | ✓ | 아래 ②③④ |

## ② 가드 스크립트 (내가 실행)
- `check-print-guard` 8/8 변경 없음 · `check-migration-registry` 미분류 0 · `check-sensitive-diff` 대상(③ 스키마 — 예상대로) · 인스펙션 `stock-ledger` LEDGER-001 ⚠47(목록) · 004·002·003 ✅ · 마이그 2회차 «추가 0칸 · ENUM 추가값 없음».
- **반증(규율 2조)**: 트랜잭션 안에서 재료 46(데모 38)에 사슬이 끊긴 두 줄 삽입 → `chainBreakSql` 결과 0 → 2(정확히 그 두 줄: prev 69+10≠110, 110−3≠999) → 롤백, 잔재 0.
- 팀원 고장주입 4건(record 장부 insert 제거 · PUT current_stock 재허용 · 마지막 매입가 블록 제거 · 권한 미들웨어 통과) 보고 — 각각 대응 health-check 가 ✗ 로 떨어졌다는 보고. 재실행은 안 했고 보고를 수용(위 반증 1건을 내가 따로 함).

## ③ 실호출·회귀
- health-check `--category=inventory` 54/54 · `--category=security` 72/72 (내가 재실행). 전체 331/331 은 팀원 보고.
- 데모 38 흐름 실호출 13/14 — ✗1 은 시험 Staff 계정이 매장 소속이 없어 404 였던 것, health-check ② + 직접 서명 토큰으로 403 확인(adjust·initial·complete) · 200(summary·waste). 수용.
- 「장부 합 = 현재고」 47건이 **옛 누수인지** 내가 DB 로 확인: 장부 2,127줄 전부 `entity_type='restaurant'`(모델 beforeCreate 훅이 채움 — SQL 조인 조건 문제 아님) · 오늘 이후 줄 8건 전부 금액 있음 · 어긋난 재료의 줄 구성이 «장부 0줄인데 재고 있음» 또는 초기재고를 «새 값» 으로 적던 옛 방식. 보정 스크립트는 현재고를 안 바꾸고 장부에 1줄만 더한다 — 맞는 방향.

## ④ 배포 안전성
- 마이그 1개(칸 4 NULL 허용 + ENUM 값 2 expand-only) — 옛 코드와 공존 · 롤백 = 칸 둔 채 옛 코드. 배포 스크립트는 마이그(§9a-2) 뒤에 ENUM 패리티(§830)를 보므로 팀원이 우려한 순서 문제 없음.
- 창함수(`LAG`)는 인스펙션(dev MySQL 8.0.46)에서만 돈다 — 배포 게이트도 dev 에서 실행. 운영 MySQL 버전은 **확인 못 함**(운영 접근 0) — 운영검증 때 이 스위트를 운영에 돌릴 일이 생기면 그때 8.0 이상인지 먼저 볼 것.
- 폐기 사유 필수 ↔ 옛 SW 캐시 화면 400 → **배포 직전 SW 버전 bump 필수**(묶음 1 프론트 변경이 끝났으므로 지금이 그 «마지막»).
- LEDGER-001 은 warn 으로 배포 → 운영 reconcile 드라이런 표 → Irene 승인 → `--apply`(운영 쓰기 = Irene 지시) → baseline 갱신해 차단 승격.

---

# Ⅲ. 팀원 후속 목록 (판정에 영향 없음 — 순서대로)

**A. 배포 직전(기계적)**
1. SW 버전 bump 1회(프론트 변경 종결 뒤) → build:dev 1회. 이 변경은 지문을 바꾸므로 마커가 죽는다 — bump 는 판단이 없는 변경이라 **마커 재발급 없이 `.fable-gate-skip` 기록으로 넘겨도 된다**(skip 사유에 «SW bump only · Fable PASS 20261008-inventory-ledger-gate» 명시). 기록 파일(DEVELOPMENT_PLAN 등)도 같은 이유로 지문을 바꾸니 **배포 뒤에** 쓴다.

**B. 묶음 2 착수 전 정리 2건(묶음 2 의 «매입액» 이 장부 `purchase.cost_value` 를 그대로 믿으므로 먼저)**
2. **수동 입고(`inventory/receive`) 장부 금액** — 지금은 «그 순간 매장 원가» 로 적고 본문 `unit_cost` 는 배치에만 쓴다. 배치의 `unit_cost` 뜻은 이미 «취급단위 1 의 값»(inventory-produce 가 `row.unit_cost × quantity_deducted` 로 쓴다)이라 뜻이 불분명하지 않다. 장부 금액 근거 = `unit_cost(본문) × base_quantity`(없으면 그 순간 원가 폴백)로 맞추고, 매장 원가도 «마지막 매입가» 규칙대로 `writeStoreCost(... log:{source:'receive'})` 를 태울지 — **태운다**(수동 입고도 실제 매입이다). 판단은 여기서 끝났으니 Fable 재호출 없이 묶음 2 첫 줄로 구현.
3. **LEDGER-002 분모** — 지금 `ingredients.unit_cost > 0` 을 보는데 금액 근거는 `effectiveStoreCost`(브랜드 공유 재료는 매장 오버레이). 오버레이 원가가 0 인 매장이 생기면 브랜드 원가 > 0 이라 거짓 차단이 난다. 검사 SQL 을 «그 줄의 unit_cost 가 NULL 이고 (매장 소유면 재료 unit_cost>0 · 브랜드 공유면 오버레이 또는 재료 unit_cost>0)» 로 맞추거나, 간단히 `t.unit_cost IS NULL AND t.base_quantity IS NULL` 줄만 세되 «원가 미정 재료 수» 는 준비도가 따로 센다는 설계대로 둔다. 처음 거짓 차단이 날 때가 아니라 묶음 2 에서 미리.

**C. 알아 둘 한계(고치지 않음)**
4. `record()` 는 호출부가 준 행 인스턴스의 현재고를 믿는다 — seller-orders·po-returns 는 `LOCK.UPDATE` 로 잠그지만 주문 차감(inventoryDeductionService)은 잠그지 않는다(종전과 같음). 같은 재료를 두 주문이 동시에 깎으면 사슬이 끊길 수 있다. LEDGER-004 가 운영에서 울리면 «우회»가 아니라 «경합»일 수도 있다 — 그때 원인 가르기부터.
5. 묶음 0-③(purchase-cost-report) 은 359d0949 커밋 뒤 팀원이 — 게이트 없음(길 하나).
6. Staff 화면 버튼 숨김은 실브라우저로 **확인 못 함**(서버 403 은 확인) — 다음 프론트 빌드 때 Staff 로 1회 클릭.

---

# Ⅳ. 마커
이 판정문 저장 뒤 `node dev-backend/scripts/fable-gate.js pass --note "..."` 1회. 지문에는 다른 방(359d0949 외부 SOA·직원식 / 0ec1e1c3 배송 지역 / 5cdb5680 청구서 권한) 미커밋 변경이 함께 들어 있다 — 이 마커가 보증하는 범위는 **입력 파일 «이 방이 바꾼 파일» 목록뿐**이고 다른 방 변경은 각자의 게이트 판정이 따로 있다(0ec1e1c3 은 `fable-verdict-20261008-seller-delivery-zones-gate.md`, 5cdb5680 은 `fable-verdict-20261007-invoice-payer-structure-gate.md`).
