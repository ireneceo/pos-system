# Fable 판정 — SOA 2차: «수신자 없음» 400 · 월결제 매장의 결제 위치 · SOA 전체 PDF · 지정 발행일 자동발행 (2026-09-29)

근거: 팀원 운영 읽기(매장 8 · users 19 이메일 NULL→설정 완료) + 내가 직접 코드 대조
(`services/soaScheduler.js` issueSoaForPair/processMonthlySoa/generateSoaNow/startSoaCron · `routes/brand-soa.js` generate ·
`utils/notificationService.js` getRestaurantAdminAndOwnerIds · `utils/notificationTemplates.js` monthlySoaEmail ·
`services/purchaseOrderService.js` createTradeInvoice/computeDueDate · `routes/invoices-payment.js` submit/confirm ·
`routes/purchase-invoices.js` soa/current · soa/:id/pdf · `pages/Restaurant/InvoicesPage.tsx` Pay/PDF/View ·
`components/Billing/BillingTermsModal.tsx` · `utils/paymentTerms.js` · `App.tsx` 라우트).
운영 코드는 dev 와 같다고 **가정**(09-24 SOA 배포분까지 동일, R8 만 미배포 — 이전 판정과 같은 근거). 운영에서 직접 grep 한 것은 아니다.

## 판정 요지 (한 줄)
**오늘 정산서는 지금 운영 코드로 다시 «Generate now» 누르면 나간다(이메일이 원인이었고 이미 채웠다). Irene 이 말한 세 가지 — ①월결제 매장은 개별 청구서에 Pay 없음 ②SOA 한 번 다운로드에 청구서 전 페이지 ③지정 발행일 자동발행 + 수동 발행 뒤 자동 건너뜀 — 는 전부 지금 코드에 없다. 설계는 아래처럼 확정하고, 현재 게이트 대기 중인 R1~R8 묶음과 분리해 **다음 묶음**으로 팀원이 구현한다.**

---

## 1. «No recipients to notify» — 원인·의미·바로잡을 것

### 실측 사실
- 정산서 수신자 = **그 매장 Restaurant Admin(이메일 있는 사람) + 매장 오너**(`getRestaurantAdminAndOwnerIds`). 매장 8 은 RA 1명(kdineipc1, 이메일 없었음) + Staff 3명(이메일 없음) + 오너 0명 → 수신자 0.
- `issueSoaForPair` 는 청구서를 다 모은 **뒤** 수신자가 0이면 `no_recipients` 로 **정산서 기록 자체를 안 만든다**(soaScheduler.js:217-218). 그래서 화면 400.
- Irene 의 «인보이스로 보내지는 건데» 에 대한 답: **개별 거래 청구서는 만들어질 때 메일이 전혀 안 나간다**(`createTradeInvoice` 에 알림 호출 0건 — 알림 카테고리 `trade_invoice_created` 는 설정 목록에만 있고 보내는 코드가 없다). 매장이 청구를 메일로 받는 유일한 길이 **정산서 메일** 이고, 그 메일이 RA·오너 이메일로만 간다. 그래서 RA 이메일이 «상관 있다».
- 팀원이 users 19(kdineipc1) email 을 `kate.kim.snkn@gmail.com` 으로 채운 것: **맞게 됐다.** 로그인은 아이디(kdineipc1)로 하니 로그인엔 영향 없다. 단, 이 주소는 이제 정산서만이 아니라 **매장 8 관리자 앞으로 가는 모든 알림**(주문·청구·발주 결과 등, 개인 알림설정 6관문 기준)을 받는다.

### 판정
1. **오늘 발행: 코드 변경 없이 진행.** 브랜드(GIT) 계정 → Restaurants → K-DINE IPC «청구» → «This month (up to today)» → Generate now. 결과 RM 5,705.90 · 7장 · 마감 10/15 · kate 주소로 메일. (이전 판정 그대로.)
2. **결함 1건 — «수신자 0 = 정산서 못 만듦» 은 잘못된 결합.** 정산서는 채권 기록이고 메일은 부수 효과다. 매장에 이메일 가진 관리자가 없다고 브랜드가 청구 자체를 못 하면 안 된다. → 정산서는 만들고, 메일만 건너뛰고, 화면에 «정산서는 만들어졌으나 매장에 이메일 수신자가 없음(관리자 이메일을 등록하세요)» 경고를 띄운다. (절단면 §5-A)
3. **결함 2건 — 정산서 메일의 «View SOA & Pay» 링크가 죽은 경로.** 링크 = `${FRONTEND_URL}/pos/purchase-invoices/soa` 인데 App.tsx 에 그 라우트가 없다(«/pos/purchase-invoices removed — B1 재설계» 주석만 남음). 매장의 실제 청구서 화면은 `/restaurant/:id/invoices`. 이전 판정에서 내가 «메일 링크와 같은 곳» 이라고 쓴 것은 **틀렸다 — 정정.** 오늘 kate 가 받는 메일의 버튼도 이 죽은 링크다(정산서·금액·목록은 정상, 버튼만 엉뚱한 곳). 화면 진입은 로그인 → Invoices 메뉴로 안내. (절단면 §5-A)

---

## 2. «월결제 매장은 개별 청구서 Pay 없음, SOA 에서 한 번에» — 지금과 다르고, Irene 규칙이 맞다

### 실측 사실
- `InvoicesPage.tsx:1279` Pay 는 `!parentSoaInvoiceId` 면 뜬다. 즉 **월결제(monthly_soa) 매장이라도 정산서에 묶이기 전(월중)엔 청구서마다 Pay 가 보이고 실제로 낼 수 있다**(`submit-payment` 에도 월결제 가드 없음). 묶인 뒤에만 «Pay via SOA».
- 화면·결제 라우트 어디에도 매장의 `invoice_cycle` 을 보는 곳이 없다. 청구서 행엔 계약 조건이 저장돼 있지 않다(마감일만 `computeDueDate` 로 계산해 저장).
- 반면 `routes/purchase-invoices.js soa/current` 는 이미 «이 매장의 월결제 판매자» 를 판별하는 로직(브랜드 `brand_billing_terms` / 푸드코트 `foodcourt_billing_terms` / 공급업체 `SupplierContract.payment_terms`)을 갖고 있다 — 화면은 사라졌지만 판별 규칙은 살아 있다.
- «월결제인데 한 장씩 내면» 생기는 문제: 정산서는 `status NOT IN (paid, cancelled)` 만 묶으므로 낸 장은 빠진다(이중 청구는 안 남). 문제는 **정산 단위가 깨지는 것**(브랜드 확인 작업이 장 단위로 흩어지고 정산서 총액이 계약과 달라짐) — Irene 규칙(정산서에서만 총액 결제)이 설계상 맞다.

### 판정
- **월결제 조건인 판매자의 거래 청구서는 묶이기 전에도 Pay 를 숨기고 «Pay via monthly statement» 로 표시. 서버도 같은 기준으로 개별 결제를 400 으로 막는다**(화면만 숨기면 장식이다).
- 판별은 **한 곳**: 백엔드 헬퍼 `payViaSoa(invoice)` (구매자 기준 판매자 조건이 `monthly_soa` 인가 — `soa/current` 의 규칙을 함수로 빼서 공유). 목록 API 가 `pay_via_soa` 를 내려주고, 결제 라우트(submit-payment · create-payment-intent · create-paypal-order)가 같은 함수로 거부한다.
- **범위 밖**: 외부 공급업체(로그인 없음) 청구서의 «결제함(기록만)» 은 그대로. 입고하며 현금 낸 `receive-and-pay`(이미 paid 로 생성)는 청구서 결제가 아니라 그대로. 0원 Confirm 그대로.

---

## 3. «SOA 한 번 다운로드에 청구서 전 페이지» — 지금은 표지도 없다

### 실측 사실
- 매장 화면 Download PDF(`generateInvoicePDF`)는 청구서 1장 HTML 만 그린다. 정산서 행은 `InvoiceItem` 이 없어 «Monthly Statement of Account / 1 / 총액» 한 줄짜리 PDF 가 나온다. View 모달도 같은 한 줄.
- 정산서 메일 본문엔 자식 청구서 번호·날짜·금액 목록이 있고 **첨부는 없다**.
- 백엔드에 `GET /api/purchase-invoices/soa/:supplierCompanyId/pdf` 라는 «표지 + 청구서별 페이지» HTML 렌더러가 있으나 **공급업체 전용·정산서 기록과 무관(현재 미결 전부)·타임존 없는 toLocaleDateString** 이라 재사용 대상이 아니다. 백엔드엔 PDF 라이브러리(puppeteer/pdfkit)가 없고, 프론트엔드엔 jspdf/html2canvas 가 있다.
- 매장 목록 API(`/api/invoices/restaurant/:id`)는 자식 청구서를 **품목(items) 포함**으로 이미 내려준다(`parent_soa_invoice_id` 로 부모 연결). 즉 PDF 를 합치는 데 필요한 데이터는 화면에 이미 다 있다.

### 판정
- **프론트에서 합친다.** 정산서 Download/Print = ①표지(정산서 번호 · 판매자 · Bill To · 기간 · 발행/마감일 · 자식 청구서 표 · 총액 · 은행정보) + ②자식 청구서 각각을 **기존 `generateInvoiceHTML` 그대로** 페이지 나눔으로 이어 붙임. 청구서 디자인은 지금 매장이 보는 그 디자인 하나만 존재하게(백엔드 렌더러를 두 번째 디자인으로 키우지 않는다).
- 브랜드 쪽 Trade Invoices 화면에 정산서 다운로드가 있으면 같은 합성 유틸을 쓴다(중복 구현 금지). 있는지는 팀원이 확인해 보고.
- **메일 PDF 첨부는 이번에 안 한다.** 서버에 PDF 엔진이 없고, 운영서버는 자원이 빠듯하다(메모리 [[reference_prod_server_resource_constraint]]). 메일은 목록+링크(§1 의 링크 수정 포함), 전체 PDF 는 화면에서 내려받는다. Irene 이 첨부를 꼭 원하면 별도 사안(서버 PDF 엔진 도입)으로 다시 판정.

---

## 4. «지정 발행일 자동발행 · 수동 발행 뒤엔 자동 안 함» — 둘 다 지금 없다

### 실측 사실
- 자동발행 = **매월 1일 00:30 고정**(`startSoaCron '30 0 1 * *'`), 기간 = **지난달 1일~말일 고정**. 청구 조건(`brand_billing_terms`)엔 `payment_due_day`(결제 마감일, 기본 15)만 있고 **발행일 칸은 없다.** Irene 이 «원래 지정한 발행일» 이라고 아는 설정은 존재하지 않는다 — 있는 것은 마감일 뿐.
- 수동 발행(generateSoaNow)은 기간을 고를 수 있고, **수동 발행이 자동을 막는 표시가 없다.** 9/29 수동 발행 뒤 10/1 cron 은 그대로 돌아, 9/29 이후~9/30 에 생긴 안 묶인 청구서가 있으면 **두 번째 정산서**를 만들고, 없으면 `no_invoices` 로 건너뛴다.

### 판정 (설계 확정)
1. **발행일 설정 추가**: 청구 조건 JSON 에 `soa_issue_day`(1~28, 기본 1). 자리 = 기존 BillingTermsModal 의 월결제 블록(마감일 옆) — 브랜드·푸드코트·공급업체 계약 셋 다 같은 JSON 구조라 같은 칸. 스키마 변경 없음. 검증은 `utils/paymentTerms.js` 한 곳.
2. **cron 은 매일 00:30 에 돌고, 구매 매장 달력의 오늘이 그 쌍의 `soa_issue_day` 인 쌍만 발행한다.** 기간 = **지난 정산서 다음 날 ~ 어제**(매장 달력). 지난 정산서가 없으면 시작 = 직전 발행일(한 달 전), 그 이전 안 묶인 것은 지금처럼 `includeOlderUnbundled` 로 같이 담는다. 발행일 1이면 지금과 결과가 같다(«September 2026» 라벨 그대로).
3. **수동 발행이 있으면 그 주기의 자동은 건너뛴다**: 그 쌍에 취소되지 않은 정산서가 **직전 발행일 이후**에 발행돼 있으면 skip(사유 `manual_issued_this_cycle`, SchedulerRun results 에 기록). 그 뒤 생긴 청구서는 **다음 주기**에 자연히 묶인다(정산서는 «지난 정산서 이후 전부» 를 담으므로 누락 없음). 이게 Irene 원문 «그러고 나면 자동발행 안되어야 해» 의 구현이다.
4. 수동 발행의 기간 선택(지난달 / 이번달 오늘까지 / 직접)은 그대로 둔다. «날짜 바꾸고 싶으면 바꾸는 거야» 는 ①설정의 발행일을 바꾸는 것과 ②수동 발행 때 기간을 고르는 것 둘 다 가능해진다.
5. 같은 날 두 번 돌아도 한 번만 나가게 — 3 의 skip 규칙이 그대로 멱등 가드가 된다(같은 주기에 이미 발행 → skip).
6. 한계(정직하게): 서버가 UTC 라 00:30 UTC = 말레이시아 08:30. 말레이시아 기준 «그 날» 발행이 맞고, UTC 보다 뒤인 시간대 매장은 하루 이르게 발행될 수 있다. 시장이 말레이시아라 받아들인다.

---

## 3축 판정
A 파급 크다(돈·청구·매장 결제 경로) · B 설정 기본값 유지·JSON 칸·코드 지점 한정이라 되돌릴 수 있다 · C 길이 갈렸다(결제 가드 위치 / PDF 서버 vs 프론트 / 자동발행 주기 규칙) → **이 1회로 설계 확정.** 구현·검증은 팀원. 게이트 1회(돈 접촉 · `check-sensitive-diff` 대상).

## 5. 절단면 (팀원 구현 범위 — 이 밖으로 나가면 중단하고 보고)

**A. 정산서 생성·메일 (soaScheduler.js · brand-soa.js · foodcourt-soa.js)**
1. `issueSoaForPair`: 수신자 0 이어도 정산서를 만든다. 반환 `{issued:true, mailed:false, reason:'no_recipients'}`. 라우트는 200 + `data.warning='no_recipients'`, 모달 문구 «Statement created. No email recipient at the restaurant — add an admin email.»(i18n 4개).
2. 메일 링크: 구매자가 restaurant 이면 `${FRONTEND_URL}/restaurant/${id}/invoices`, brand/foodcourt 구매자는 각자의 청구서 화면(팀원이 App.tsx 라우트로 확정해 보고). 이 죽은 링크가 다른 메일(리마인더 등)에도 있으면 같이 — 단 grep 으로 찾은 **같은 문자열**만.

**B. 월결제 매장 결제 가드 (invoices-helpers.js · invoices-list.js · invoices-payment.js · InvoicesPage.tsx)**
3. `payViaSoa(invoice)` 헬퍼 1개 — `purchase-invoices.js soa/current` 의 판별 규칙을 함수로 추출해 **둘 다 그 함수**를 쓴다. 조건: `invoice_category==='trade'` · 판매자가 brand/foodcourt/등록 공급업체 · 그 구매자에 대한 조건이 `monthly_soa`. 외부 공급업체는 false.
4. 매장 목록 응답에 `pay_via_soa` 추가. 화면: `parentSoaInvoiceId || payViaSoa` 면 Pay 숨기고 «Pay via SOA» 표시(문구 하나로 통일, i18n).
5. `submit-payment` · `create-payment-intent` · `create-paypal-order`: `payViaSoa` 면 400 `{code:'pay_via_soa'}`. `mark-paid-external` 은 손대지 않는다.

**C. 정산서 전체 PDF (InvoicesPage.tsx + 공유 유틸)**
6. `generateInvoicePDF`/Print 에서 `invoiceCategory==='soa'` 면: 표지 HTML + 자식(`parentSoaInvoiceId===soa.id`, 목록에서 필터) 각각 `generateInvoiceHTML` 본문을 `page-break-before` 로 이어 붙인 한 문서. 표지 항목 = 정산서 번호 · 판매자(issuerInfo) · Bill To · 기간(billing_period) · 발행일/마감일 · 자식 표(번호·날짜·금액) · 총액 · 은행정보. 날짜는 매장 타임존(`formatDate`). 자식이 0장이면 표지만.
7. View 모달의 정산서 행: 빈 품목표 대신 자식 청구서 표(번호·날짜·금액). 같은 데이터, 같은 컴포넌트 안.
8. 브랜드 Trade Invoices 화면에 정산서 다운로드가 있으면 같은 유틸 사용(팀원이 유무 확인 후 보고). 백엔드 `soa/:supplierCompanyId/pdf` 는 손대지 않는다.

**D. 발행일·자동발행 (paymentTerms.js · BillingTermsModal.tsx · soaScheduler.js)**
9. `soa_issue_day` 1~28 정수, 월결제일 때만 유효, 없으면 1. 검증 `paymentTerms.js`. 모달에 «Statement issue day» 숫자칸(마감일 옆), 요약 문자열(`formatTermsSummary`)에 «issue day N» 추가. i18n 4개.
10. `startSoaCron` → `'30 0 * * *'`(매일). `processMonthlySoa` → 각 쌍마다 `getCurrentLocalDate(buyerTz)` 의 일(day) 이 `soa_issue_day` 와 같을 때만 후보. 기간 = 마지막 유효 정산서(`invoice_category='soa'`, 같은 issuer·payer, status≠cancelled, `billing_period_end` 최대)의 `billing_period_end`+1일 ~ 어제(매장 달력). 없으면 시작 = 직전 발행일 날짜. `includeOlderUnbundled=true` 유지.
11. skip 규칙: 같은 쌍의 취소 안 된 정산서가 `issued_at ≥ 직전 발행일 00:00(매장 tz)` 이면 `manual_issued_this_cycle` 로 skip. SchedulerRun `results` 에 쌍별 사유 집계(`skipped_manual` 카운트).
12. 수동 발행(generateSoaNow)·프리셋·기존 SOA 번호 규칙·마감일 `nextDueDate` 는 무변경. 소급·백필 스크립트 없음. 기존 운영 쌍(K-DINE IPC)은 `soa_issue_day` 없음 → 1 → 동작 동일.

**E. 검증(데모 매장 38·브랜드 데모 쌍 — 운영 무접촉)**
- A: RA 이메일 전부 NULL 로 만든 뒤 generate → 정산서 생성·경고·메일 0건 / 복원 후 → 메일 1건, 링크가 `/restaurant/38/invoices` 인지 본문 grep.
- B: monthly_soa 매장의 미묶음 trade 청구서 → 목록 `pay_via_soa:true` · 화면 Pay 없음 · `submit-payment` 400 / immediate 매장 → Pay 있음·200. **고장주입**: 헬퍼를 항상 false 로 바꿔 400 이 200 이 되는지 1회 확인 후 원복.
- C: 자식 3장 정산서 PDF → 페이지 수 = 1+3, 표지 총액 = 자식 합. 자식 0장 → 표지만.
- D: `processMonthlySoa` 를 참조일 주입으로 3회 — ①발행일=오늘·수동 없음 → 발행, 기간 라벨 확인 ②같은 주기에 수동 발행 있음 → skip 사유 기록 ③발행일≠오늘 → 후보 0. **고장주입**: skip 규칙 제거 시 ②가 두 번째 정산서를 만드는지 1회 확인 후 원복.
- `check-sensitive-diff` → FABLE 게이트 1회. 프론트 빌드 1회 · verify-all --full 1회(코드 확정 후).

**착수 시점**: 현재 R1~R8·F1~F5·Sales Orders 묶음은 F2 → 검증 → 게이트 → /배포 로 **먼저 끝낸다.** 이 SOA 2차는 **그 다음 묶음**. 이전 판정의 `invoice_trigger(on_confirmed)` 절단면도 같은 다음 묶음에 함께(둘 다 청구 조건 JSON·같은 모달을 건드리므로 한 번에 하는 게 맞다) — 단 그건 Irene 컨펌 4건이 아직 없으니 컨펌 받은 항목만.

---

## 6. Irene 확인 필요 (권고 포함)

| 질문 | 선택지 | Fable 권고 |
|---|---|---|
| kate 이메일 | A. 지금대로 kdineipc1(RA) 이메일로 둔다 — 매장 8 관리자 알림 전부 이 주소로 / B. 정산서만 받게 하려면 별도 오너 계정을 만든다 | **A**. 지금 구조에서 매장 청구 메일은 이 길뿐이고, 알림 종류별 끄기는 개인 알림설정에서 된다. |
| 오늘 발행 | A. 지금 운영 코드로 다시 Generate now(메일 버튼 링크는 죽은 경로 — 로그인 후 Invoices 메뉴로 안내) / B. 링크·PDF 수정 배포 뒤 발행 | **A**. 청구는 오늘, 수정은 다음 배포. |
| 월결제 개별 Pay | A. 묶이기 전에도 Pay 숨기고 서버도 거부(정산서에서만 총액 결제) / B. 화면만 숨김 | **A**. 화면만 숨기면 API 로는 낼 수 있어 규칙이 아니다. |
| 정산서 PDF | A. 화면 다운로드에서 표지+청구서 전 페이지 합침, 메일은 목록+링크 / B. 메일에도 PDF 첨부 | **A**. 서버에 PDF 엔진이 없고 운영서버 자원이 빠듯하다. 첨부는 별도 사안. |
| 자동발행 규칙 | A. 청구 조건에 «발행일(1~28)» 추가·매일 검사·기간=지난 정산서 다음 날~어제·수동 발행 있으면 그 주기 자동 skip / B. 지금처럼 1일 고정 + 수동 발행 시 자동 skip 만 | **A**. Irene 원문 «지정한 발행일» 이 되려면 칸이 있어야 한다. |
| 착수 순서 | A. 현재 묶음 배포 먼저 → SOA 2차 + invoice_trigger 를 다음 묶음으로 / B. 지금 묶음에 끼움 | **A**. 지금 묶음은 게이트 직전이라 끼우면 빌드·검증이 처음부터다. |

---

## 7. 팀원 지시 (Opus)
1. Irene 에게 §8 보고문을 **그대로** 전달. 컨펌 6건은 §6 표 그대로(권고 포함).
2. Irene 이 다시 Generate now 를 누르면 운영 읽기로 확인: `invoices` 에 `invoice_category='soa'`·payer restaurant 8·total 5705.90·due_date 2026-10-15 1행, 7장 `parent_soa_invoice_id` 채워짐, pm2 로그에 `monthly_soa` 발송 1건(수신 users 19). 숫자 그대로 보고. 메일 실수신은 Irene/kate 확인 사항.
3. 코드 변경은 **컨펌 뒤, 현재 묶음 배포 뒤** 절단면 §5 A~E 로. 구현 중 세부는 판단해 결과에 붙여 보고. 게이트 전 되묻기 없음. 예외: Irene 이 «메일 첨부(B)» 또는 «1일 고정(B)» 을 고르면 그때만 나에게 되돌려라(범위가 달라진다).
4. 확인해 보고할 것(읽기): ①브랜드 Trade Invoices 화면에 정산서 다운로드 유무 ②`/pos/purchase-invoices/soa` 링크가 운영에서 실제로 어디로 떨어지는지(로그인 상태 브라우저 1회) ③메일 템플릿 밖에 같은 죽은 링크 문자열이 더 있는지 grep.
5. 운영 쓰기 0. 이 판정으로 users 19 이메일 설정 외 운영 데이터 변경 없음.

---

## 8. Irene 보고문 (그대로 전달)

**에러 원인과 지금 상태**
«No recipients to notify»는 K-DINE IPC 매장에 이메일이 등록된 관리자가 한 명도 없어서였습니다. 정산서 메일은 매장 관리자·오너 이메일로만 나가는데, kdineipc1 계정에 이메일이 비어 있었습니다. 지금은 kate.kim.snkn@gmail.com 으로 채워 두었으니 브랜드 계정에서 «This month (up to today)» → Generate now 를 다시 누르시면 RM 5,705.90 정산서 1장이 만들어지고 kate 주소로 메일이 갑니다. 그 주소는 앞으로 K-DINE IPC 관리자 앞 알림(주문·청구 등)도 받게 됩니다. 로그인 아이디와는 무관합니다.

«인보이스로 보내지는 건데»에 대해: 개별 청구서는 만들어질 때 메일이 아예 안 나갑니다. 매장이 청구를 메일로 받는 유일한 길이 정산서 메일이라 관리자 이메일이 필요했던 겁니다.

두 가지 결함을 더 찾았습니다. ①이메일 수신자가 없으면 정산서 자체를 못 만들게 돼 있는데, 정산서는 청구 기록이니 만들고 메일만 건너뛰도록 바꿉니다. ②정산서 메일의 «View SOA & Pay» 버튼이 없어진 옛 주소를 가리킵니다(제가 지난 판정에서 «메일 링크와 같은 곳»이라 한 건 틀렸습니다). 오늘 kate 가 받는 메일도 버튼만 엉뚱한 곳으로 가니, 로그인 → Invoices 메뉴로 들어가면 됩니다. 링크는 다음 배포에서 고칩니다.

**말씀하신 세 가지 — 지금 코드엔 없고, 이렇게 만듭니다**
1. 월결제 매장의 개별 청구서 Pay: 지금은 정산서에 묶이기 전(월중)에는 청구서마다 Pay 가 보이고 실제로 낼 수 있습니다. 말씀대로 월결제 조건인 판매자의 청구서는 처음부터 Pay 를 숨기고 «Pay via SOA» 만 보이게, 서버에서도 개별 결제를 거부하게 바꿉니다(화면만 숨기면 API 로는 낼 수 있어서요).
2. 정산서 PDF: 지금 정산서 다운로드는 «Monthly Statement of Account / 총액» 한 줄짜리입니다. 표지(번호·기간·마감일·청구서 목록·총액·은행정보) 뒤에 청구서 전부를 페이지마다 이어 붙여 한 번에 내려받게 만듭니다. 메일에는 PDF 첨부 대신 목록과 링크만 둡니다 — 서버에 PDF 엔진이 없고 운영서버 자원이 빠듯해서입니다. 첨부가 꼭 필요하시면 따로 잡겠습니다.
3. 자동발행: 지금은 «매월 1일 고정, 기간은 지난달» 뿐이고 발행일을 지정하는 칸이 없습니다(있는 건 결제 마감일 15일뿐). 그리고 수동으로 발행해도 1일 자동발행이 그대로 돌아 그 사이 청구서가 있으면 정산서가 한 장 더 나갑니다. 청구 조건에 «발행일(1~28)» 칸을 넣고, 매일 확인해서 그 날에만 «지난 정산서 다음 날부터 어제까지»로 발행하고, 그 주기에 수동 발행이 이미 있으면 자동은 건너뛰게 합니다. 수동 발행 때 기간 고르는 건 지금대로입니다.

**순서**: 오늘 정산서는 지금 바로 발행하시고, 위 수정은 지금 검증 대기 중인 묶음을 먼저 배포한 뒤 다음 묶음으로 넣겠습니다(지난번 «주문 확정 시 청구서 발행» 설정도 같은 묶음). 컨펌해 주실 것 6건은 표로 드립니다.
