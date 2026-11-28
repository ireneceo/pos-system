# [Fable 완료 검증] 공급업체 주문제작·전용 상품 (맞춤 제작 루트 1단계 N1·N2) — 2026-11-28

> 종류: gate(되돌리기 어려운 변경의 완료 검증) · 대상 = 보안 경계(전용 상품이 누구에게 보이나) + 운영 DB 칸·표 추가 + 발주 검사 변경.
> 설계: `.claude/fable-design-20261128-quote-custom-product-route.md` · 구조: `docs/TRADE_STRUCTURE.md` §2-6
> 운영 DB·운영 배포 무접촉. 코드 수정 0(판정만). 시험은 개발 DB·데모 매장에서만, 만든 시험 행은 전부 지움(남은 것 0 확인).

## 판정: **보완 필요 — 통과 아님.** Fable 통과 마커 찍지 않음.

N1(상품 종류)은 통과 수준이다. **N2(전용 상품)가 «보이는 곳·담기는 곳 전부를 판정 함수 하나로» 를 채우지 못했다 — 구매자 쪽 문 4곳이 판정을 거치지 않는다.** 그중 하나는 화면에 실제로 있는 문이고, 대상이 아닌 매장에게 전용 상품의 이름과 가격이 그대로 나온다(실호출로 확인).

---

## 1. 막아야 할 것 (필수 · 전부 고친 뒤 다시 검증)

### F1. «카탈로그에서 한꺼번에 담기» 미리보기·담기가 전용 상품을 그대로 보여 준다 — 실측 확인
- 자리: `dev-backend/routes/stock-ledger.js` `loadSellerCatalog()` 공급업체 분기(404행 근처 `SupplierProduct.findAll`). 이 함수를 `GET /api/{restaurants|brands}/:id/catalog-link/preview` 와 `POST …/catalog-link/bulk` 가 같이 쓴다.
- 실측(개발, 공급업체 20):
  - 시험 상품(전용 · 손님 = 아무도 아님)을 매장 38 로 미리보기 → **200, 목록에 나옴, 가격 7.77, blocked=null**(= 담기 가능으로 표시).
  - 팀원이 남긴 확인용 16968·16969(전용 매장 38)를 **매장 2(대상 아님 · 공급업체 20 과 계약 있음)** 로 미리보기 → **둘 다 이름과 RM5.00 이 나옴.** 같은 매장 2 로 정식 카탈로그·상세는 0건(정상).
- 고칠 것: 그 `findAll` 의 where 에 `[Op.and]: [audienceWhere(buyer)]` (`utils/supplierProductAudience.js`). «막힘 사유와 함께 보여 주기» 가 아니라 **아예 안 보이게**(있는지도 알리지 않는다 — 담기 404 와 같은 원칙). bulk 는 같은 목록에서 찾으므로 자동으로 `NOT_IN_CATALOG` 가 된다.

### F2. 재료에 공급처를 직접 붙이는 문 3곳이 상품을 확인하지 않는다 — 실측 확인(1곳) · 코드 확인(2곳)
- 자리:
  1. `routes/ingredient-seller-products.js` `POST /api/ingredients/:ingredientId/seller-sources` (154행~) — 실측: 매장 38 이 대상이 아닌 전용 상품 id 를 넣어 **201, 연결 행 생성**. 이 연결이 생기면 재료 화면들이 그 상품의 이름·규격을 읽어 준다(`routes/ingredient-seller-products.js:99`, `routes/ingredients.js:89·677·928`, `routes/restaurants-ingredients.js:93`).
  2. `routes/product-ingredients.js` `POST /:id/seller-sources` (1356행~, 브랜드 제너럴)
  3. `routes/brand-products.js` `POST /brand-products/:productId/stock-item` 의 `seller_source` (1607행~, 브랜드 제너럴)
- 세 곳 모두 «그 공급업체와 계약이 있나» 만 보고, **상품이 그 공급업체 것인지·이 손님에게 보이는 상품인지 보지 않는다.** 상품 번호는 순번이라 번호를 올려 가며 넣을 수 있다. (발주 자체는 마지막 검사 `assertLinesSellerProductActive` 가 400 으로 막는다 — 주문은 안 되지만 **보이는 것**이 샌다. 그리고 그 400 본문에 상품 이름이 실린다.)
- 고칠 것: `utils/supplierProductAudience.js` 에 함수 하나를 더하고 세 곳이 그것만 부른다(조건을 라우트에 복사하지 않는다).
  - 예: `assertSupplierProductLinkable(supplierCompanyId, sellerProductId, buyers[], { transaction })` → 상품이 없거나 · `supplier_company_id` 가 다르거나 · 전용인데 `buyers` 중 누구도 대상이 아니면 **404 `Supplier product not found`**(담기 `resolveSellerProduct` 와 같은 응답).
  - `buyers`: 매장 경로 = `req.buyerEntity` 하나. 브랜드 제너럴 경로 = **그 공급업체와 활성 계약이 있는 자기 브랜드 전부**(지금 코드의 `brandIds` 중 계약 있는 것).
  - `seller_type !== 'supplier'` 인 줄은 손대지 않는다(이번 범위 아님).

### F3. 브랜드 제너럴이 브랜드를 여럿 가질 때 담기 판정이 엉뚱한 브랜드로 나갈 수 있다 — 코드 확인(실측 안 함)
- 자리: `utils/catalogLink.js` `resolveSellerProduct` 의 새 조건이 «찾은 계약의 구매자» 로 판정한다. 브랜드 제너럴 경로(`routes/product-ingredients.js:349`)는 `entity_id: brandIds` 로 **아무 계약 하나**를 찾으므로, 브랜드 A·B 둘 다 계약이 있고 상품이 B 전용이면 A 계약이 잡혀 404 가 날 수 있다(카탈로그에는 보이는데 담기가 안 됨 — 닫히는 쪽이라 새는 것은 아니지만 고장).
- 고칠 것: `resolveSellerProduct` 에 선택 인자 `audienceBuyers`(배열)를 받고, 없으면 지금처럼 계약의 구매자 하나. 브랜드 제너럴 호출부는 F2 와 같은 «계약 있는 자기 브랜드 전부» 를 넘긴다. 판정은 F2 의 같은 함수.

### F4. 검사(health-check)에 위 문들을 더하고, 깨뜨려서 잡히는지 확인
- `scripts/health-check.js` «공급업체 전용 상품 (E1~E4)» 의 E1 에 추가:
  - `GET /restaurants/:rid/catalog-link/preview?seller_type=supplier&seller_entity_id=…&search=ZZ-HC-EXCL` 에 그 상품이 **없음**
  - `POST /ingredients/:ingId/seller-sources`(그 상품 id) → **404** (만들어졌으면 지우고 실패 처리)
  - 다른 공급업체 id 로 그 상품 id 를 넣어도 404
- E2 에 양성 확인: 대상이 되면 미리보기에 나옴.
- 고장주입 2건 추가(미리보기 조건 제거 → 실패 · 직접 연결 검사 제거 → 실패), 원복 후 통과. 기존 3건과 합쳐 5/5.

---

## 2. 같이 고칠 작은 것 (필수는 아니나 이번 묶음에서)

- **S1. 안 쓰는 함수 삭제** — `supplierProductAudience.audienceSql` 은 부르는 곳이 0이다. 보안 판정 파일에 «행이 없으면 참» 인 안 쓰는 조건이 남아 있으면 다음 사람이 잘못 쓴다. 지운다.
- **S2. 재고 금액 합계** — `routes/supplier.js` 대시보드·보고서 요약에서 «재고 부족» 만 비재고 상품을 뺐고 `inventory_value`(재고 × 단가)는 그대로 더한다. 재고 상품을 주문제작으로 바꾸면 남은 수량이 화면에는 안 보이는데 금액 합계에는 계속 들어간다. 같은 조건으로 금액도 뺀다(두 곳).
- **S3. 인스펙션 R-SC-007 «#46656 piece↔hour 환산 1»** — 판단: **검사에서 서비스 상품 연결을 뺀다.** 이유: 서비스 줄은 수령해도 재고를 건드리지 않는다(`services/purchaseOrderReceive.js:203` 이 `serviceLineIdsOf` 로 건너뜀 — 이번에 공급업체 상품도 같은 칸으로 판정). 이 검사가 지키는 것은 «입고 수량이 환산 때문에 어긋남» 인데 서비스 줄에는 입고가 없다. 브랜드 서비스 상품도 같은 구조라 같은 조건으로 뺀다.
  - 자리: `scripts/inspection/suites/supply-chain.js` R-SC-007 쿼리의 WHERE 에 `AND COALESCE(s.product_kind,'stock') <> 'service'`(공급업체·브랜드 두 다리 모두 그 칸이 있다). 주석에 위 이유.
  - ⛔ baseline 에 올려서 넘기지 않는다(같은 모양이 계속 생긴다). 시험 데이터를 지워서 넘기지도 않는다.
  - 반증: 고친 뒤 ① #46656 사라짐 ② 기존 baseline 의 R-SC-007 행(#32·#41 등)이 **여전히 잡힘**(검사가 눈멀지 않았다는 증거) ③ 16969 를 잠깐 `stock` 으로 바꾸면 #46656 이 다시 잡히고, 되돌리면 사라짐.

---

## 3. 통과로 본 것 (실측·대조)

| 항목 | 결과 |
|---|---|
| diff 범위 = 설계 1단계 | 일치. 설계 밖 변경 0(무관한 `e2e/playwright.config.js` 는 옛 미커밋, 이번 일 아님) |
| 구조 문서 먼저 | `docs/TRADE_STRUCTURE.md` §2-6 있음 — 단 «읽는 곳 전부» 목록에 F1·F2 자리가 빠져 있다. 고치면서 그 목록에 더한다 |
| 정식 카탈로그·상세·찾기 목록 | 실호출: 매장 38(대상) 상세에 2건 · 매장 2(대상 아님) 카탈로그 0 · 상세 0 · 찾기 목록 상품 수 13 ↔ 11 |
| 담기(`from-catalog`) | health-check E1: 대상 아니면 404 |
| 발주 검사 7곳 buyer 전달 | 코드 대조 7/7. 구매자를 안 넘기면 막힘(닫는 쪽) — E3 |
| 판매자 저장 검증 | 모르는 손님 400 — E4 |
| N1 재고 쓰는 자리 | 공급업체 재고를 쓰는 곳은 출고 1곳·되돌림 1곳뿐(전수 grep) — 둘 다 건너뜀 조건 있음. 서비스 판정은 `orderFulfillment` 한 곳 유지 |
| 판매자가 손님 대신 넣는 주문 | 전용 판정을 걸지 않음 — **허용**(판매자가 규칙 주인 · 최소주문과 같은 갈래). 구조 문서 ⛔ 줄과 일치 |
| 인쇄·KDS 보호파일 | `check-print-guard` 8/8 변경 0 (직접 실행) |
| health-check `po` | 15/15 통과 (직접 실행) |
| 민감 변경 분류 | `check-sensitive-diff` = ②③ 접촉 · Fable 게이트 대상 (직접 실행) |
| 마이그레이션 | 칸 2 + 표 1, 늘리기만 · 기본값 = 지금 동작 · 멱등 · registry `deploy` 등록. 되돌리기 = 옛 코드가 새 칸을 안 읽으므로 코드만 되돌려도 됨 |

## 4. 확인 못 한 것 (감추지 않음)

- **공개 상품 링크 `/shop/:slug`** — 데모 공급업체 20 에 공개 링크가 없어 실호출 못 함. 코드상 `audience_mode='all'` 고정이라 닫혀 있다고 판단.
- **F2 의 브랜드 제너럴 두 문** — 코드로만 확인(매장 문과 같은 모양).
- **화면** — 새 등록 폼을 실브라우저로 본 사람이 아직 없다(팀원 보고 그대로). 빌드·mount sweep 도 끝나지 않았다.
- **mount sweep 1446초 · bm·manager 화면 EMPTY_RENDER** — 원인 미확정. «서버가 느려서» 는 추정이다.

## 5. 다시 검증 받을 때 가져올 것

1. F1~F4 · S1~S3 반영. 고친 뒤 `docs/TRADE_STRUCTURE.md` §2-6 «읽는 곳» 목록 갱신.
2. 코드 확정 → 빌드 1회 → `verify-all --full` 1회.
   - mount sweep 은 **끝까지 돌아야** 한다. bm·manager EMPTY_RENDER 가 또 나오면 그 화면 하나를 직접 열어 «느림» 인지 «안 뜸» 인지 가른 결과를 붙인다. baseline 등재·제외로 넘기지 않는다.
3. 실브라우저로 공급업체 상품 등록 창 1회(자동 스크립트면 됨): 종류를 주문제작으로 → 재고 칸 사라짐 · «고른 손님만» → 손님 목록 뜸 · 저장 → 카드에 «주문제작 / 전용 · 1곳» · 매장 38 발주 화면 카드에 «내 전용». zh·ms 는 글자가 키 이름으로 나오지 않는지만.
4. 배포 기록 파일(`releases/2026-11-28-*.json`).
5. health-check 전체 · 고장주입 5/5 · 인스펙션 신규 0 · print-guard 0.

마커(`fable-gate.js pass`)는 위가 채워진 뒤의 검증에서만 찍는다 — 지문이 내용까지 묶여 있어 지금 찍어도 고치는 순간 죽는다.

## 6. 팀원이 물은 별건 — `GET /api/supplier-catalog?supplier_id=` 

- 실측: 매장 38 이 계약 없는 외부 업체 #60(매장 5 가 등록한 «Demo Beverages Distribution», 상품 3)을 `?supplier_id=60` 으로 부르면 **그 3건이 가격과 함께 나온다.** 기본 목록에는 0건. `where.supplier_company_id = supplierFilter` 가 «내가 볼 수 있는 업체 목록» 을 덮어쓴다.
- 같은 업체가 `GET /api/supplier-directory/60`(상세)으로도 상품 3건이 나온다 — 상세는 «활성 업체면 누구에게나» 라 **다른 매장이 등록한 외부 업체**까지 열린다.
- 판단: **이번 묶음에 넣지 않는다. 바로 다음 일로 따로 한다.** 이유 — 운영에 이미 있는 문이고 전용 상품과 무관하며(전용 상품은 두 곳 다 새 조건으로 막힘), 상세 쪽은 «외부 업체를 누가 볼 수 있나» 규칙(등록자·오너 상속 — 이미 있는 `loadVisibleExternalSupplier`)을 대입해야 해서 이번 diff 범위(설계 1단계)를 넘는다.
- 다음 일의 모양(권고): ① `supplier-catalog` — `supplier_id` 가 `supplierIds` 안에 있을 때만 좁히고 아니면 빈 목록 ② `supplier-directory/:id` — 가입 업체는 지금처럼, 외부 업체(`is_system_registered=0`)는 등록자·오너 상속일 때만 ③ health-check `security` 에 «남이 등록한 외부 업체 상품이 안 보인다» 1건 + 고장주입. 권한 경계라 끝나면 Fable 검증 대상.

## 실측 기록
- 시험 스크립트: `/home/irene/.claude/jobs/9b2ceb4e/tmp/gate-probe.js` · `gate-probe2.js` · `gate-probe3.js` (개발 DB · 읽기 + 시험 행 생성 후 삭제 · 남은 시험 상품 0)
- 출력 요지: `P0 supplier-catalog 노출? false` / `G1 catalog-link/preview 노출? true … price=7.77 blocked=null` / `G2 POST seller-sources 201` / `preview(매장 2) Check - Custom Logo Cup (exclusive) RM5.00 | Check - Logo design work (exclusive) RM5.00` / `G4 ?supplier_id=60 → 외부업체 상품 3건`

---

# 재판정 (gate 2회차) — 2026-11-28

## 판정: **PASS — 이 변경은 통과.** Fable 통과 마커 찍음.
**운영 배포 조건 1개:** 전체 화면 열어 보기(mount sweep) 도구를 고쳐 **전체 1회 통과**한 뒤에 배포한다(아래 §R3). 이번 변경의 결함이 아니라 검사 도구가 오늘부터 눈이 멀어서다 — 배포 스크립트도 같은 sweep 을 돌리므로 어차피 고치기 전에는 배포가 막힌다.

코드 수정 0(판정만). 고친 것은 기록 2곳뿐: 이 문서 · 배포 기록 `releases/2026-11-28-supplier-custom-product.json` 의 `verification.browser`·`fable_note`(«mount sweep 통과» 로 읽히던 문장을 사실대로). 운영 무접촉. 시험 행 전부 지움(남은 시험 상품 0 · 주인 없는 연결 0).

## R1. 1차 지적 대조 (직접 실호출 — `jobs/9b2ceb4e/tmp/re-probe.js`·`re-probe2.js`)

| 지적 | 결과 | 직접 확인한 것 |
|---|---|---|
| F1 한꺼번에 담기 미리보기·담기 | 닫힘 | 대상 아닌 매장 38: 미리보기 0건 · 담기 `NOT_IN_CATALOG`. 매장 2(대상 아님): 전체 11건은 보이는데 전용 16967~16970 은 0건(검사가 눈멀지 않음). 대상이 되면 나옴. 매장 38 에는 16968 보임 |
| F2 매장 직접 연결 | 닫힘 | 대상 아님 404 · 본문에 상품 이름 없음 · 다른 업체 번호(4019)로 업체 20 상품 404 · 대상이면 201 |
| F2 BG 직접 연결 2곳 | 닫힘 — **1차·팀원 «확인 못 함» 을 실호출로 채움** | BG 22 · 브랜드 10 ↔ 업체 4105(활성 계약): 대상 없음 404 · 대상이 «계약 없는 내 브랜드 17» 뿐이면 404 · 업체 불일치 404 · 브랜드 10 이 대상이면 성공 · `brand-products/:id/stock-item` 의 seller_source 404 + 트랜잭션 되돌림(상품 연결·재고아이템 안 생김) |
| F3 다브랜드 담기 | 닫힘 | `from-catalog`: 대상 = 계약 없는 17 뿐 → 404 · 대상 = 계약 있는 10 → 201 |
| F4 검사 + 고장주입 | 채움 | health-check `po` 15/15(직접). **고장주입 1건 직접 재현**: 매장 직접 연결 검사를 끄면 «E1c 직접 연결 201 (404 기대)» 로 실패 → 원복(sha256 일치) 후 15/15. 나머지 4건은 팀원 기록 |
| S1 안 쓰는 함수 | 지워짐 | `audienceSql` 없음(exports 대조) |
| S2 재고 금액 | 반영 | `routes/supplier.js` 두 곳 금액·부족 같은 조건 |
| S3 인스펙션 | 반영 | 직접 실행 84/102 · 신규 0 · baseline 11. 반증 3/3 은 팀원 기록 |

합계: 직접 실호출 21/21 통과(1차 probe 16 중 내 스크립트 오류 3건은 고쳐 재실행 — 서버 결함 아님).

## R2. 그 밖의 대조
- diff 범위: 1차 이후 늘어난 것 = F·S 반영 + 손님 고르기 목록의 번호·도시 표시(`supplier-products.js` 후보 API 가 매장 city 추가 · 화면 · 4언어 키). 후보 집합은 저장 검증과 같은 «아는 손님» 이라 새로 새는 정보 없음. 설계 밖 변경 0.
- 구조 문서 `docs/TRADE_STRUCTURE.md` §2-6 «읽는 곳» 에 F1~F3 자리·S3 들어감.
- print-guard 8/8 변경 0(직접) · 민감 분류 ②③ 그대로 · deploy-ready 통과(직접) · verify-all 23/24(팀원 로그 12:10Z — 그 뒤 코드 변경 없음, 파일 시각 대조).
- 실브라우저: 새 e2e 직접 1회 5/5(등록 창 1440·390 · zh·ms · 매장 발주 카드 «FOR YOU»). 스크린샷 2장 눈으로 확인.
- 남은 길(판단: 막지 않음): `stock-ledger.js` 의 «브랜드 재고아이템 공급처를 매장 재료로 복제» 는 브랜드가 정당하게 붙인 전용 상품 연결을 소속 매장에 복사한다 → 매장은 그 상품 이름을 보지만 발주는 마지막 검사가 400 으로 막는다. 브랜드 자기 재료 정보가 자기 매장에 가는 것이라 새는 것으로 보지 않는다. 2단계 설계 때 «브랜드 전용 상품을 소속 매장이 주문할 수 있나» 와 같이 정한다.
- 작은 것(막지 않음): 폰 폭(390) 손님 목록에서 이름이 같은 줄 둘이 줄 간격 없이 붙어 보인다 — 다음 화면 손볼 때 줄 사이 간격.

## R3. mount sweep 실패 — 판정과 고칠 사람
- **원인 확정(추정 아님):** 개발 사이트 로그인 관문이 오늘 09:49Z 에 PurpleHere 에 켜졌다(`~/dev-server/board/log` gate-settings `purplehere:on:3`). 그 뒤로는 시험 표식 머리글(X-Board-Gate-Test)이나 로그인 쿠키가 없으면 **모든 주소**가 로그인 화면으로 돌아간다 — 직접 curl: `/` · `/pos/login` · `/pos/manager/dashboard` · `/pos/brand-menus` 전부 302 → `/__gate/login`. sweep 두 스크립트에는 그 머리글이 없다.
- **«앞쪽 화면은 왜 통과했나» 의 답:** 통과한 것이 아니다. verify-all 은 실패 때 **출력 마지막 15줄만** 보여 준다(`verify-all.js` `slice(-15)`). bm 3 + manager 12 는 sweep 순서상 맨 끝 15줄일 뿐이고, 1차·2차가 «같은 목록» 인 것도 그래서다. 관문 구조상 머리글 없는 sweep 은 어떤 화면도 열 수 없다(전체 출력은 저장되지 않아 눈으로 세지는 못함 — 근거는 관문 판정 코드 `board/gate.js decide` + curl 4건).
- **이번 변경의 판정에서:** «실패» 가 아니라 **판정 불능(도구 고장)** 으로 본다. 대신한 증거 — 프런트 변경은 화면 2개(`SupplierProductsTab.tsx` · `NewPurchaseOrderPage.tsx`)와 번역 파일뿐이고 공용 컴포넌트 변경 0, 그 두 화면은 실브라우저 e2e 로 열어 확인(팀원 15/15×3 + 직접 5/5), 팀원이 «실패» 15개 중 7개를 머리글 붙여 열어 7/7 정상. 타입·i18n·hydration·죽은 핸들러·TDZ 정적 검사 통과.
- **고칠 사람·방법:** PurpleHere 작업방(팀원)이 **다음 일로 따로**(이 묶음을 먼저 커밋한 뒤 — 같은 작업 폴더에서 고치면 통과 마커 지문이 죽는다). Fable 불필요(도구 수리 · 기계로 갈림).
  1. 머리글 읽기를 한 곳으로: `e2e/playwright.config.js` 가 하는 것(비밀 파일을 읽어 머리글로만 붙이고 출력 안 함)을 작은 공용 모듈로 빼고 `headless-page-sweep.js`·`headless-roles-sweep.js` 의 `newContext` 에 `extraHTTPHeaders` 로. e2e 설정의 미커밋 머리글 추가도 같이 커밋.
  2. **관문에 막히면 크게 실패:** 첫 화면을 연 뒤 주소가 `/__gate/login` 이면 `GATE_BLOCKED` 로 즉시 끝낸다(24분 동안 전부 EMPTY_RENDER 로 찍지 않게). verify-all 은 실패 때 «마지막 15줄» 이 아니라 **실패 줄 전부 + 건수**를 보여 준다.
  3. 반증 2건: 머리글 빼면 `GATE_BLOCKED` 로 실패 · 화면 하나를 일부러 깨면 그 화면만 실패.
  4. 그 뒤 `verify-all --full` 1회 → 전체 통과가 **이 묶음의 운영 배포 전제**. 배포 스크립트의 sweep 도 같은 스크립트라 같이 고쳐진다.
  - 비밀 파일 읽기가 권한 창에서 막히면 우회하지 않는다 — 관문을 설치한 서버 방에 «sweep 용 통과 방법» 을 넘긴다.

## R4. 확인 못 한 것
- 공개 상품 링크 `/shop/:slug` 실호출(데모 업체에 공개 링크 없음 — 1차와 같음 · 코드상 `all` 고정).
- 전체 mount sweep(§R3 — 도구 수리 뒤).
- 고장주입 5건 중 4건·S3 반증 3건은 팀원 기록(1건만 직접 재현).

## R5. 별건(1차 §6) 그대로 — 다음 일
`GET /api/supplier-catalog?supplier_id=` · `/api/supplier-directory/:id` 로 남이 등록한 외부 업체 상품이 보이는 문. 운영에 이미 있는 문이라 이번 배포와 무관하게 따로 한다(권한 경계 → 끝나면 Fable 검증).
