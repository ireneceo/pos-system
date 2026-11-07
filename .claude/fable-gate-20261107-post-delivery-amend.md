# Fable 게이트 판정 — 출고 뒤 수량 정정(correct-delivery) (2026-11-07)

> 설계: `.claude/fable-design-20261107-post-delivery-amend.md` · 요청: `.claude/fable-request-20261107-post-delivery-amend.md` · 작업방 51367c8d
> 판정자: Fable (리더) · 구현: Opus (팀원)

## 판정: **PASS**

## 1. diff 범위 대조 (설계 §6 ↔ 실제 변경) — 설계 외 변경 0

| 설계 | 실제 | 판정 |
|---|---|---|
| 신규 `services/poStockReversal.js` (반품 승인 재고 두 블록 추출 + 브랜드 자체재고 분기 + (d) product/brand_product 분기) | 220줄 · `reverseBuyerStock`·`restoreSellerStock` · 금액 근거·clampAtZero·unit_mismatch·directDeductConversion 그대로 | ✓ |
| `routes/po-returns.js` 재고 블록 → 함수 호출(기본값 return_out/return_in/return_approved) | 171줄 중 150줄 삭제·20줄 추가. 반품 행의 ingredient_id·product_ingredient_id·unit 을 그대로 넘김. 승인 합산·크레딧 노트·반품 행 갱신은 남음 | ✓ |
| `utils/poAmend.js` `CORRECTABLE_STATUSES`·`sellerCorrectionBlock` | 설계 코드와 글자 단위로 같음(BAD_STATUS·ALREADY_PAID·ALREADY_RECONCILED·INVOICE_LOCKED 409) | ✓ |
| `services/purchaseOrderService.js` `tradeInvoiceLineAttrs` 추출 | billReceived 규칙·설명 폴백·반올림 그대로. createTradeInvoice 의 다른 줄 무접촉 | ✓ |
| `routes/seller-orders.js` POST `/:id/correct-delivery` · `attachCorrectionState`(목록·상세 한 쿼리) · `changesTableHtml` 공용화 | 한 트랜잭션 순서 = 설계 §3-1 ①~⑨ · 커밋 뒤 `followChildToSoa`·소켓·메일(setImmediate) · `computePurchaseOrderTotals`(배송비 재계산 없음) · status 불변 · `AMENDABLE_STATUSES` 무접촉 | ✓ |
| `scripts/health-check.js` inventory 검사 + pos 글자 검사 위치 갱신 | 5건(C1·C6·C8 / C2·C4 / C3·C5 / C9 / C10) + pos 검사가 라우트의 두 함수 호출까지 확인 | ✓ |
| 화면 2개 · i18n 2 네임스페이스 × 4 언어 · 문서 절 추가 | 버튼 노출 = 서버 판정(`correct_blocked.code !== 'BAD_STATUS'`) · 모달·확인·완료 안내 · 구매자 배너 `corrected` | ✓ |
| 무접촉: 🔒 인쇄·KDS 8개 · markAllReceived · poAutoReceiveService · reconcileInvoiceSync · invoiceCalculation · DB/ENUM/마이그 | print-guard 8/8 변경 없음 · 위 파일 diff 없음 · 마이그 0 | ✓ |

작업트리의 다른 방 미커밋(GTM 4파일·playwright.config·oneoff 스크립트·index.html·tracking.ts)은 이 일과 무관 — 범위 밖으로 둠.

## 2. 설계와 다른 점 4건 — 모두 수용

1. **브랜드 자체재고 되돌림 상한** (`taken − given`, 같은 발주·같은 brand_product 장부 기준) — Fable 이 `/ship` 코드를 직접 대조: 자체재고 분기만 `takeBp = min(주문량, 재고)` 로 0 에서 멈추고(`seller-orders.js:911`), 레시피(`-useQty`)·다이렉트(`-takeD`)는 음수 허용. 따라서 그 분기에만 상한을 두는 것이 정확한 대칭이다. 상한 없이는 재고 0 상품 출고 → 정정이 없는 재고를 만들어 낸다(실측 사례). 반품 승인도 같은 상한을 타는 것이 맞다(출고가 안 뺀 것을 반품이 돌려주면 같은 부풀림). **설계 §3-2 보다 나은 판단 — 채택.** 검사 C10 이 지킨다.
2. **(d) product/brand_product 분기는 ingredient_id·product_ingredient_id 둘 다 없을 때만** — 수령(`receiveLine`: product_id → product_ingredient_id → ingredient_id 순서)과 같은 순서. 반품 승인도 이 분기를 새로 타게 되는데(예전엔 product 줄 반품 시 구매자 재고 무접촉), 입고가 올린 것을 되돌리는 대칭이라 맞다.
3. **서비스 줄은 재고 되돌림 둘 다 건너뜀** — 출고·수령이 서비스 줄 재고를 안 움직이므로 대칭.
4. **NOT_FOUND 에 SELLER_HIDDEN(draft·pending_approval) 포함** — 판매자 목록에 안 보이는 상태는 «없는 주문» 이 맞다.

## 3. 가드·기계 게이트 (Fable 직접 실행 · 2026-11-07 16:5x · dev-backend 는 16:42 재시작 = 최신 코드)

- `check-print-guard.js` → **변경 없음 8/8**
- `check-design-guard.js` → **신규 위반 0** (합계 299 · baseline 295 = 다른 방 변경분 포함, 이 일 신규 0)
- `npm run i18n:verify` → **Errors 0** (Warnings 27 기존)
- `check-sensitive-diff.js` → FABLE 게이트 대상(②돈·주문) — 이 판정이 그 게이트
- `health-check --category=inventory` → **111/111** (C10 포함)
- `health-check --category=po` → **12/12**
- `health-check --category=pos` → **60/60** (반품 net 0 글자 검사 새 위치)
- `health-check --category=trade` → **1/1**
- 팀원 보고 `verify-all --full` 24/24 · mount sweep 8역할 크래시 0 · 타입 기준선 신규 0 — Fable 재실행 안 함(빌드 1회 규칙 · 번들 지문 캐시), 보고 수치 그대로 인용.

## 4. 실호출·실데이터 증명

- health-check 5건이 실제 HTTP 로 출고→배송→정정→수령/자동완료→반품 승인까지 돌린다(데모 매장 38 · 브랜드 자체재고 픽스처). 숫자: C1 판매자 재고 17→18 · 청구서 11→9(배송비 5 유지) · 뒤에 받으면 구매자 +2 · C2 구매자 3→1(adjustment −2 seller_correction) · 판매자 17→19 · 반품 승인 뒤 return_out/return_in 그대로 · C3 코드 9종 + 거부 뒤 롤백(총액·재고 불변) · C5 줄 제거 → 청구서 1줄 · C9 정산서 합계 따라감 · C10 재고 1→0 출고 뒤 정정 → 1 만 돌아오고 두 번째 정정은 0.
- Fable 읽기 전용 대조(개발 DB, PO 63477 `[확인용]`): 상태 delivered·unpaid · 총액 30→26 · 줄 Coffee 2(shipped_at 보존) · 청구서 TRD-BRD17-20261107-001 26.00 is_modified · 이력 source seller_correction · 추적 마지막 이벤트 `corrected` tb 30 ta 26. — 팀원 실브라우저 보고와 일치.
  - 그 이벤트의 `seller_stock_restored:[{item 64900, qty 1}]` 는 상한 추가 **전** 코드가 남긴 것(팀원이 재고·장부는 되돌렸고 이벤트 기록만 남음). 데모 데이터라 두어도 된다 — 지금 코드는 `back ≤ 0` 이면 기록하지 않는다.

## 5. 고장주입 (팀원 보고 · 6건 · 전부 원복 후 통과)

ⓐ 판매자 되돌림 뺌 → 3건 실패 ⓑ 청구서 재작성 뺌 → 4건 실패 ⓒ 받은 양 낮추기 뺌 → C2 실패 ⓓ ALREADY_PAID 뺌 → C3 실패 ⓔ C10 상한 뺌 → C10 실패 ⓕ pos 글자 검사(브랜드 분기에 Ingredient.findByPk) → 실패. 설계 §7-11 의 4건 + 상한·글자 검사 2건. 검사기가 고장을 잡는다는 반증 있음.

## 6. 배포 안전성

- DB 변경 0 · 마이그 0 · ENUM 0 · 새 상태값 0(`corrected` 는 이벤트 이름). 롤백 = 코드만.
- SW 버전: 프론트 변경 있음 — 팀원 보고에 없음. **배포 준비 때(상황판 배포 버튼·정기 점검) SW bump 1회**로 충분(이 방이 올리지 않아도 됨 — 배포 기록 d4224f0ca 가 6.14 로 올렸고 그 뒤 프론트 변경이므로 다음 배포 준비가 다시 올린다).
- 운영 건 PO-R28-20261104-001 은 설계 §8 그대로 — 배포 뒤 판매자가 화면에서 직접. 운영 DB 손대지 않음.

## 7. 확인 못 한 것 (추측하지 않음)

- 구매자 «Order Corrected» 메일의 실제 렌더 — 데모·시험 수신자는 메일 가드가 그리기 전에 건너뛴다. HTML 은 amend 메일과 같은 `buyerMail`·`changesTableHtml` 틀이라 구조 위험은 낮음. 오류 로그 0.
- 구매자 상세 배너의 실브라우저 표시 — API 이벤트 모양만 확인(`corrected`·`reason`·`changes`·`buyer_stock_reversed`). 배너 코드는 amended 와 같은 렌더에 조건 하나 더한 것.

## 8. Fable 이 직접 고친 것

- `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` 1344줄 검증 건수(4건→5건·고장주입 4→6) 와 자체재고 상한 한 줄 — 문서만. 마커는 이 수정 뒤에 찍음.

## 9. 지시

없음(막는 것 없음). 운영 반영: 다음 배포 때(SW bump 는 배포 준비가 한다).
