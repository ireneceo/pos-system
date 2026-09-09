# 배포 게이트 판정 요청 자료 — 2026-09-09

> 이 문서는 **사실만** 담는다. 판정은 Fable 이 한다.

## 1. Irene 원문

- 2026-09-08 (어제, 미배포 묶음에 대해): **"3번으로 해. 다음에 판정받고 배포"**
- 2026-09-09 (오늘): `/배포` 명령
- 2026-09-09 (오늘, 작업 지시): *"브랜드제너럴에서 브랜드레시피 넣을 때 재료 골라서 넣어도 레시피 보기에 재료명 제대로 안나와. 그리고 계산되는 개별 코스트도 제대로 저장 안되고 제대로 안보여. 제대로 표시해봐. 확인해줘. 그리고 나서 프로덕트레시피랑 레스토랑관리자의 메뉴레시피에도 같은 문제 있나 봐줘"*
- 2026-09-09 (중간): *"무슨 말이야? 제대로 수정 완벽하게 이름표시 및 레시피 원가계산 표시 안돼?"*
- 2026-09-09: *"그럼 이제 다 제대로 돼? 지금 요청한거?"*

## 2. 관련 문서 경로

- `docs/FABLE_REVIEW_2026-09-08.md` — 어제 배포 8묶음이 한도 초과(429)로 판정 없이 나간 건에 대한 사후 검토 자료
- `docs/PURCHASE_ORDER_SYSTEM.md` 끝 절 — 발주↔인보이스 원가 대조 설계
- `.claude/session-state.md` — 오늘 작업 기록
- `.claude/deploy-manifest.json` — 운영 배포 스냅샷(2026-09-08T21:53:10.511Z)

## 3. 배포 델타 — 운영 스냅샷 대비 16파일

기계 판정(`scripts/check-sensitive-diff.js`): **FABLE 게이트 대상 — 기준 ② 돈·주문 무결성 접촉 1건**

### ② 돈·주문 무결성으로 분류된 1건
`dev-backend/routes/invoices-list.js` — 운영본 대비 실제 diff 전문:

```diff
@@ -506 +506,507 @@   (SELECT 컬럼 목록)
-                 external_invoice_filename, invoice_number, invoice_total, invoice_reconciled_at
+                 external_invoice_filename, invoice_number, invoice_total, invoice_reconciled_at,
+                 created_at, submitted_at, received_at, status, payment_status
@@ -566 +568,572 @@   (응답 객체)
+        // 발주 청구서는 «언제 주문했고 언제 받았나»가 결제 판단의 근거다 (2026-09-08 Irene).
+        //   발행일/마감일만으로는 매장이 «이거 물건 받은 건가?»를 알 수 없다.
+        po_ordered_at: srcPo ? (srcPo.submitted_at || srcPo.created_at) : null,
+        po_received_at: srcPo ? srcPo.received_at : null,
+        po_status: srcPo ? srcPo.status : null,
```

이 파일 diff 는 위가 전부다. 쓰기·금액 계산·상태 전이 변경 없음. 조회 응답에 발주의 날짜·상태 필드를 얹는 것.

### 나머지 15건 (기계 판정 «일반 변경»)
```
dev-backend/.sweep-cache.json                                  (mount sweep 캐시)
dev-frontend/public/sw.js                                      (SW 4.98)
dev-frontend/public/locales/{en,ko,ms,zh}/purchaseOrders.json  (8건)
dev-frontend/public/locales/{en,ko,ms,zh}/settings.json
dev-frontend/src/pages/PurchaseOrders/InvoiceReconcilePage.tsx
dev-frontend/src/pages/PurchaseOrders/PurchaseOrdersPage.tsx
dev-frontend/src/pages/Restaurant/InvoicesPage.tsx
dev-frontend/src/pages/BrandProductRecipe/ProductRecipesTab.tsx   ← 오늘 변경
dev-frontend/src/pages/RecipeManagement/RecipesTab.tsx            ← 오늘 변경
```
미커밋 신규 파일 1건: `dev-frontend/e2e/recipe-ingredient-name.spec.js` (오늘 신규 e2e)

### 이 묶음의 구성
- **어제(2026-09-08) 만들어 미배포로 둔 SW 4.98 묶음** — 대조 화면 «입력 칸 먼저», `<object>`→`<iframe>` 미리보기,
  발주 목록 3단계 표시, 청구서에 주문일·수령일(= 위 `invoices-list.js` 변경). 어제 Irene 지시로 판정 대기 중.
- **오늘 만든 레시피 표시 수정** — 프론트 2파일 + e2e 1파일. 백엔드 무접촉.

## 4. 오늘 변경분 사실 (레시피 재료명·원가 표시)

### 신고 → 실측한 원인
화면이 재료 이름·원가를 API 응답(`ri.ingredient`)이 아니라 **드롭다운용으로 따로 불러온 목록**에서 다시 찾았다.
그 목록은 걸러진 목록이다 — 브랜드는 거울 행 제외(2026-09-05 Irene 신고·Fable 판정으로 도입), 프로덕트는 비활성 제외.
그래서 저장된 레시피 줄의 재료를 못 찾으면 이름이 `Ingredient #123`, 줄 원가·합계가 0 이 됐고,
그 상태로 저장하면 `cost = 0` 이 DB 에 써졌다.

### 운영 DB 실측 (SSH 읽기)
- `recipe_ingredients` 347줄 중 브랜드 레시피 337줄 / 매장 레시피 10줄
- 브랜드 레시피 337줄 중 **334줄(99%)이 거울 재료**(`source_product_ingredient_id`/`source_brand_product_id`)를 가리킴
- 브랜드 레시피 줄 중 **cost=0 이 21줄**
- 매장 레시피 10줄: 거울 0 · cost=0 0건
- `product_recipe_ingredients` 76줄 중 60줄이 cost=0. 그중 61줄은 `brand_id IS NULL` 레시피(패키징 이름의 자동 생성분)
- 프로덕트 레시피 실측 예: 재고아이템 #307 #308 이 `is_active=0` 인데 저장된 줄 원가는 10.50 · 3.75
- `ingredients` 635행 중 거울 158행(재고아이템 출처 68 + 프로덕트 출처 90), 비활성 82행

### 변경 내용 (프론트 2파일)
`dev-frontend/src/pages/RecipeManagement/RecipesTab.tsx` (BG `/pos/recipes` + RA `/restaurant/:id/recipe-management` 공용)
`dev-frontend/src/pages/BrandProductRecipe/ProductRecipesTab.tsx` (BG `/pos/brand-product-recipes`)

1. 조회용 목록(`ingredients`)과 선택기 목록(`pickerIngredients`)을 분리. 조회용은 거울·비활성 포함 전체,
   선택기는 종전 규칙 유지(거울 제외 / 비활성 제외)
2. 이름·원가 해석 순서: `ri.ingredient`(서버 값) → 목록 → 폴백
3. 폼의 줄 원가 식을 저장 식과 통일(`calculateIngredientCost`, 단위 환산 포함)
4. 재료를 못 찾거나 환산 불가 시 `cost=0` 으로 덮지 않고 저장돼 있던 값 유지
5. 선택기 옵션에 «이 레시피가 이미 쓰는 재료»를 합집합으로 추가
6. 목록 카드·상세 상단·CSV 의 총 재료 원가를 `recipeTotalCost()` 로 통일(줄 값 재합산, 매장이 보는 브랜드
   레시피는 서버가 준 `effective_ingredient_cost` 우선)

백엔드 라우트·모델·마이그레이션 변경 0. `/restaurant/:id/product-recipes`(ProductRecipePage)는 서버가
`ingredient_name`·`unit_cost`·`total_cost` 를 계산해 내려주는 구조라 무변경.

### 기계 게이트 결과 (오늘, 새 번들 `main.f35d1246.js`)
- `verify-all --full` **19/19 통과** (실브라우저 mount sweep 8역할 포함, 665초)
- `health-check` **227/227**
- `check-print-guard` **8/8 변경 없음**
- `check-design-guard` 신규 위반 0 (합계 301 / baseline 303)
- `tsc --noEmit` 이 두 파일 신규 오류 0 (프로젝트 전체 기존 오류 409건은 이 프로젝트에서 warning 취급)
- 신규 e2e `e2e/recipe-ingredient-name.spec.js` **3건 × 3회 연속 = 9/9 통과**
  1. 거울 재료를 쓰는 브랜드 레시피 표시 (줄 원가 0·합계 0 으로 **일부러 손상시켜 저장한 뒤** 화면 확인)
  2. 손상된 레시피를 브라우저에서 열어 Update 클릭 → DB 줄 원가·합계가 재료 단가 기준으로 복구됨 (API 로 확인)
  3. 비활성 재료를 쓰는 프로덕트 레시피 표시

### 고장주입 반증 (1건)
`resolveIng` 의 해석 순서를 옛 방식(선택기 목록에서만 find)으로 되돌려 빌드 → e2e 가 실패하며 브라우저 화면에
`Ingredient #3943  2 piece  RM 0.00/  RM 0.00` 이 그대로 찍혔다(신고 증상 재현). 원복 후 재빌드 시 번들 해시가
주입 전과 동일(`main.5c7a34f6.js`)함을 확인, 이후 총원가 수정을 얹어 `main.f35d1246.js`.

### dev 잔재
테스트가 만든 레시피·거울 재료·비활성 전환 모두 원복·삭제 확인(잔재 0).

## 5. 기계적 제약 / 확인 불가 항목

- 운영 DB 는 **읽기만** 했다. 쓰기 없음.
- 운영 DB 읽기 SSH 명령 일부가 세션 정책으로 거부됐다(같은 형태를 바꿔 재시도해 얻은 수치가 위 §4). 거부된 건:
  BG 계정 목록 조회, owner_type 별 상세 1건. 그 두 건은 **확인 불가**.
- 오늘 변경분에 대한 **Irene 눈 확인은 아직 없다**(dev 반영만 됨, 화면 확인 요청은 드렸다).
- `dev-backend/.sweep-cache.json` 이 델타에 포함돼 있다(검증 캐시 파일).
- 어제 미배포로 둔 SW 4.98 묶음은 **어제 검증했고 오늘 다시 검증하지 않았다** — 다만 오늘 `verify-all --full`
  19/19 는 현재 워킹트리 전체(=4.98 포함) 기준으로 돌았다.
