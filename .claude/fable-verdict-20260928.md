# Fable 판정 원문 (2026-09-28) — 이 사안 2회차 (①AI 키 위치 ②과금 확정 ③배송지역). 남은 Fable = 구현 후 게이트 1회만.

## Ⅰ. Irene 에게 올릴 보고문

### 1. AI 키 — 네, 시스템관리자 화면에서 Irene 이 직접 등록합니다
- 어디에: 시스템관리자 → 설정에 「AI 설정」 칸을 하나 만듭니다. 지금 **Stripe 결제 키를 넣는 자리와 똑같은 방식**입니다(시스템관리자 → Payment Settings 에서 비밀키를 넣으면 서버 안에만 저장되고 화면엔 ••••로 가려짐). 그 방식이 이미 검증돼 있어서 그대로 씁니다.
- 누구 계정: AI 회사 계정은 **PurpleHere(우리) 하나**입니다. 매장은 키를 보지도 넣지도 않고, 「AI 판독」 모듈을 켜기만 합니다. 비용은 우리가 AI 회사에 내고, 매장에는 월정액으로 받습니다(2번).
- 서버 파일(.env)에 넣지 않는 이유: 그러면 키 바꿀 때마다 배포·서버 접속이 필요합니다. 화면 등록이면 Irene 이 언제든 바꿀 수 있습니다.
- 어느 AI 회사 키인지는 착수 때 실측(정확도·장당 비용)으로 정합니다. 칸은 「회사 선택 + 키」라 어느 회사든 들어갑니다.
- 이번 배포엔 AI 코드 0줄(그대로). 이번 배포 끝나면 `/기능설계` 로 들어갑니다.

### 2. 과금 — 「AI 판독」 부가 모듈 월정액 + 월 한도. 확정. 더 물을 것 없음.

### 3. 배송지역 — 세 가지 중 가장 간단한 것 = **「지역은 안내 글로만, 배송비는 지금처럼 통합」**. 이번 묶음에 넣습니다.
- 먼저 사실 하나: 「주소가 배송지로 저장되고 공유되는 것」은 **이미 됩니다.** 발주할 때 매장 주소가 자동으로 배송지로 저장되고, 발주서(인쇄·메일)에 「Deliver to:」로, 판매자 받은 주문 목록에도 그대로 보입니다. 빠진 건 딱 하나 — **판매자가 「우리는 어디까지 배송한다」를 적을 칸**이 브랜드·푸드코트에 없는 것입니다(공급업체엔 있는데 화면에 안 나옴).
- 그래서 하는 것: 판매자 설정의 배송 조건 칸(무료배송 기준·배송비) **옆에 「배송 가능 지역」 글 칸 하나** 추가. 판매자 3종(브랜드·푸드코트·공급업체) 같은 자리·같은 이름. 구매자가 발주 담을 때 배송비 줄 밑에 그 글이 한 줄로 보입니다. 가격 계산 0, 자동 매칭 0.
- 왜 「선택하면 매칭」은 안 하나: 매장 주소는 이미 정해져 있어서 구매자가 지역을 고를 일이 없습니다(고른다고 주소가 생기지 않음). 자동 매칭을 하려면 주소의 주(state)·도시 글자가 정확히 맞아야 하는데 지금 다 자유 입력이라 틀리게 막힐 위험이 있습니다. 위험은 있고 얻는 건 없어서 뺍니다.
- 왜 「지역마다 고정배송비」는 안 하나: 9/25 에 이미 뺀 이유 그대로 — 구매자가 제일 싼 지역을 고를 수 있고, 판매자가 고치려 해도 「구매자 승인 금액 초과 금지」 잠금에 막힙니다. 배송비를 적은 판매자가 아직 0곳이라 필요도 없습니다. 나중에 PJ 밖 매장이 생기면 그때 지역별로 넓힙니다(칸은 그대로 두고).
- GIT 값: 배포 뒤 브랜드 「with MIN」·「K-DINE with MIN」 두 곳에 「Petaling Jaya, Selangor」 를 팀원이 넣고, Irene 은 Plans & Payments → Payment Settings 에서 눈으로 확인. (지금 넣을 수는 없음 — 칸이 배포와 함께 생김. 300/10 두 칸은 오늘 그대로 넣음.)

### 이번 묶음 = 운영 데이터 2건(어제 판정) + 코드 11건(어제 9건 + 오늘 지역 칸 백엔드 1·화면 1). 빌드 1회 · 검증 1회 → Fable 게이트 1회 → Irene `/배포`.

## Ⅱ. 팀원 실행 지시 (어제 판정 Ⅱ 에 추가 — 순서는 어제 것 안에 끼워 넣음)

### R7 배송 가능 지역 — 백엔드 (돈 공식 0줄 · computeDeliveryFee 무접촉)
1. `models/Brand.js`·`models/Foodcourt.js` 에 `delivery_policy: { type: TEXT, allowNull: true }` — `models/SupplierCompany.js:55` 와 **같은 이름·같은 주석**(「배송 메모(지역·요일) 자유 텍스트, 계산엔 안 씀」). `sync-database.js` 로 컬럼 추가(ENUM 없음·마이그 스크립트 불필요·NULL 이라 백필 없음).
2. `routes/brands-core.js` GET `/:id/payment-settings`(~700) 응답과 PUT(~730) 에 `delivery_policy` 추가. PUT: `undefined` 면 무변경, `''`/null → null, 그 외 `sanitizeString(String(v)).slice(0, 500)`. `routes/foodcourts-core.js` GET(:575·:667)/PUT(:607) 동일.
3. `routes/supplier.js` GET/PUT `/company`(:352·:366) — `delivery_policy` 읽기·쓰기 되는지 확인, 빠져 있으면 같은 규칙으로 추가. (`supplier-directory.js:1101` 외부업체 PUT 은 이미 됨.)
4. `utils/sellerNames.js:65` attributes 에 `'delivery_policy'` 추가 + map 값에 `delivery_policy: row.delivery_policy || null`. `routes/restaurants-ingredients.js:185` 옆에 `seller_delivery_policy` 를 **같은 패턴**(getSeller 에서 꺼냄)으로. 별도 조회 금지.
5. 실호출(dev 브랜드·데모): PUT `{delivery_policy:"Petaling Jaya, Selangor"}` → GET 에 그대로 / PUT `''` → null / 600자 → 500자 / `<script>` 포함 → sanitize 결과 확인 / 담기 목록 API 에 `seller_delivery_policy` 등장. 고장주입 1회: sellerNames attributes 에서 빼면 담기 목록에 null 로 떨어지는 것을 테스트가 잡음.

### F4 배송 가능 지역 — 프론트
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx`(:565~677)·`pages/FoodcourtGeneral/FoodcourtPaymentSettingsPage.tsx`(:336~674) 배송 조건 카드에 세 번째 칸 textarea 「Delivery areas」(안내: 「배송 가능 지역·요일 등 안내 글. 배송비 계산엔 쓰지 않습니다」). 상태 `deliveryTerms` 에 `delivery_policy: string` 추가, 저장은 **같은 PUT** 한 번에. DeliveryTermsText 무변경.
- `pages/Supplier/SupplierCompanyInfoPage.tsx`(:444~463) 두 칸 옆에 같은 textarea, 기존 `AutoSaveField`/`saveField('delivery_policy', …)` 패턴.
- `pages/PurchaseOrders/NewPurchaseOrderPage.tsx` — `SellerOption` 타입(:47)에 `seller_delivery_policy?: string|null`, groups 의 terms 옆에 실어 배송비 줄(:2518) 아래 `seller_delivery_policy` 있을 때만 한 줄 `{t('newPo.deliveryAreas','배송 지역')}: …`(11px·#6B7280, 기존 줄과 같은 스타일). `computeDeliveryFee`·`deliveryFee.ts` 무접촉.
- i18n: 해당 namespace(brand/foodcourt/supplier/purchaseOrders — 실제 파일에서 확인) 4개 언어. 새 styled 금지.
- 검증: 실브라우저 BG Payment Settings 에 칸 → 저장 → 새로고침 값 유지 / RA 담기 화면에 지역 한 줄. sweep 은 어제와 같이 1회.

### 순서(어제 것에 합침)
백엔드 R1~R7 실호출·고장주입 → 프론트 F1~F4 → i18n:verify → SW bump 1회 → build:dev 1회 → verify-all --full 1회 → check-sensitive-diff → 게이트 제출(Fable 2회차 게이트 1회 — 어제 목록 + R7/F4 실호출 결과).

### 문서(코드와 같은 묶음, 게이트 마커 전에)
`docs/TRADE_STRUCTURE.md` ⑦ §5(b) 끝에 한 줄: 「2026-09-28 Fable: 지역 = 판매자 3종 공통 `delivery_policy` 자유 텍스트(안내만). 매칭·가격 없음. 지역별 배송비는 여전히 별도 사안」. 메모리 갱신은 게이트 뒤.

### 배포 뒤(Irene `/배포` 후, 운영 검증 안에서)
운영 `PUT /api/brands/1/payment-settings`·`/2/…` body `{"delivery_policy":"Petaling Jaya, Selangor"}` (1-B 와 같은 자격·같은 경로). 사후 GET 첨부. 다른 브랜드·공급업체 무접촉.

### 하지 말 것
지역 목록·zone JSON·주소 매칭·지역별 요금 코드 0줄. AI 코드 0줄(설정 칸 포함 — `/기능설계` 뒤). 어제 「하지 말 것」 전부 유지(409 완화·printOrder*·보호파일 8개·발주 총액 공식·computeDeliveryFee 무접촉).

## Ⅲ. Irene 컨펌
- 없음. ①②③ 모두 Irene 답으로 닫힘. ③의 「가장 간단한 방법」 은 Fable 이 위와 같이 골랐고 이번 묶음에 넣는다. 다른 뜻이면 한 줄만.
