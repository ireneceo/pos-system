# Fable 판정 — 판매자 결제 설정 = 계정(회사) 하나 (2026-10-07 · 1회차 · 설계+게이트 조건 포함)

> 사안: «결제 설정 화면이 첫 브랜드(users.brand_id) 행에만 저장 → 같은 주인의 다른 브랜드가 발행한 청구서는 빈 칸을 읽어 "Payment Not Available"». 운영 임시조치(10-05, brands#2 ← #1 복사)는 계좌 변경을 안 따라감.
> 판정 주체: Fable 5.1(읽기 전용 · 코드 무변경). 구현·검증은 팀원(Opus).
> 3축: A 파급 큼(돈 경로 · 청구서 결제 · Stripe/PayPal 키) · B 운영 데이터 쓰기 포함 · C 길이 갈림((a)/(b)/(c)) → Fable 대상 맞음. **이 1회로 설계와 게이트 조건을 함께 정한다.**

---

## 0. 실측 사실 (판정 근거 — 팀원 보고 + 내가 추가로 읽은 것)

| 항목 | 사실 |
|---|---|
| 쓰기 경로 | `brands.payment_settings` 를 쓰는 곳은 **`routes/brands-core.js` PUT `/:id/payment-settings` 한 곳뿐**(:762). invoice_settings(:775) · supported_currencies(:787) · min_order_amount/delivery_fee/delivery_policy(:737-748) 도 같은 라우트. |
| 읽기 경로 | 발행 브랜드 행 기준으로 **10곳+**: invoices-crud:234 · invoices-payment:462 · invoices-helpers:99·204 · invoiceScheduler:597 · brands-plans:911 · stripeService:48·104·143 · paypalService:50·98·137 · brands-core:824(결제창 available). 전부 `Brand.findByPk(issuerId).payment_settings` 형태. |
| 브랜드 생성 | `brands-core.js:305` POST `/api/brands`(BG 는 owner_id=본인 · SA 는 body) → **두 번째 이후 브랜드가 여기서 생긴다**. `services/authService.js:336` 가입 생성은 첫 브랜드(형제 없음). |
| 개발 DB | owner 6 → 1(값·기본) · 2(NULL, currency USD) · 4(NULL); owner 22 → 10(값+invoice_settings·기본) · 17(NULL). 배송 조건 전부 NULL. brands 34·35 는 owner NULL. 브랜드 발행 청구서: #1 39건 · #10 24건 · **#4 1건**(값 없는 행이 이미 발행자). |
| 운영 | #1 값 있음 · #2 는 10-05 복사본. 둘 다 GIT Consulting(owner 1명) 소유. |
| 둘째 BG 계정 | user 11 (`irene@gitconsulting.group`) brand_id=1 · 소유 0 → 이 화면은 지금도 403(소유자 전용). **이번 범위 아님**(sellerScope 형제 규칙은 발주 조회 전용). |
| 회사정보 | company_name/bank_* 는 별도 화면(company-info PUT, :100-125)이 **보낸 칸만** 저장. bank_* 는 어떤 라우트도 쓰지 않음(레거시 폴백 전용: invoices-helpers:220). |
| 검사 기반 | health-check `payment` 카테고리 존재 · 인스펙션 하니스 `scripts/inspection/suites/*.js`(`{name, run(ctx)}`) · 마이그 레지스트리 deploy/manual · 데모 BG = user 22(브랜드 10·17, is_demo=1). |

---

## 1. 방식 — **(a) 쓰기 펼치기** 로 간다 (+ 불변식 3중 보강)

**결정: PUT 이 같은 `owner_id` 의 모든 브랜드 행에 같은 값을 쓴다. 읽는 곳 10곳+ 은 한 줄도 바꾸지 않는다.**

이유:
1. **쓰기는 1곳, 읽기는 10곳+ — 그것도 전부 돈 경로**(Stripe secret·webhook secret·PayPal·청구서 결제수단 검증). (b)는 바로 그 10곳을 전부 고쳐야 하고, 하나라도 빠지면 «어떤 청구서는 되고 어떤 건 안 되는» 지금과 같은 모양의 결함이 다른 자리에 생긴다. (a)는 돈 경로 **무접촉**.
2. (b)의 «기준 행» 정의가 약하다. `users.brand_id` 는 **사람 속성**이지 회사 속성이 아니다(user 148 은 brand_id NULL 인데 브랜드 33 소유 · user 11 은 brand_id=1 인데 소유 0). 기준 행을 `Brand.findOne({owner_id})` 로 잡으면 정렬 미지정 비결정(메모리 catalogLink 주석과 같은 함정).
3. (c) «계정 테이블로 이사»(users 또는 새 표에 저장)가 개념상 가장 맞지만 읽는 곳 10곳+ 전부 수정 + Foodcourt/Supplier 와 모델이 갈라짐 + 마이그 범위가 크다. 지금 증상 대비 과하다. **다음에 다중 BG 계정(둘째 소유자)을 정식으로 풀 때** 그 설계로 가면 되고, (a)는 그때 걸림돌이 아니다(행 값이 모두 같으므로 이사가 쉽다).

(a)의 약점 = «나중에 생긴 쓰기 경로가 펼치기를 안 거치면 어긋남». 이를 **불변식**으로 못 박아 3중으로 막는다:
- **불변식**: `owner_id` 가 같은(NULL 제외) brands 행들은 §2 의 «계정 칸» 값이 **전부 동일**하다.
- ① 런타임: PUT 펼치기(한 트랜잭션) + POST `/api/brands` 생성 시 형제에서 복사.
- ② 배포: 멱등 정렬 마이그(deploy 등록 → 매 배포 자가치유).
- ③ 게이트: 인스펙션 스위트가 어긋남을 잡는다(신규 위반 → verify-all·배포 차단). **②와 ③은 같은 탐지 SQL(함수)을 공유한다**(메모리 feedback_check_and_fix_same_sql).

SA 가 특정 브랜드 id 로 PUT 해도 **같은 규칙으로 펼친다**(계정 = 하나라는 설계에 SA 예외 없음). `owner_id IS NULL` 브랜드(34·35)는 자기 행만 쓴다.

---

## 2. 함께 묶는 칸 — **이 화면이 저장하는 칸 전부**, 그 외는 제외

| 칸 | 판정 | 이유 |
|---|---|---|
| `payment_settings` | **포함** | Irene 지시 그 자체. |
| `invoice_settings` | **포함** | 같은 화면·같은 라우트. 브랜드 밖 읽는 곳 없음(supplier/foodcourt 는 각자 모델). 위험 0. |
| `supported_currencies` | **포함** | 같은 화면 «요금제·청구서에 쓸 통화». brands-core:1230 이 브랜드 id 로 읽으므로 형제가 같아야 둘째 브랜드 플랜도 같은 통화를 허용. |
| `min_order_amount` · `delivery_fee` · `delivery_policy` | **포함** | 같은 화면이 저장하고 화면엔 브랜드 선택이 없다 → 빼면 둘째 브랜드 발주에 배송 규칙이 조용히 비는 **같은 종류의 결함**. 09-17 판정 ⑦(공급업체와 같은 이름·같은 뜻)은 유지 — 바뀌는 건 «누가 값을 채우나»뿐. 현재 전부 NULL 이라 정렬 비용 0. 브랜드별 배송 규칙이 필요해지면 그때 화면에 브랜드 선택을 붙이는 별도 설계. |
| `currency`(브랜드 기본통화) | **제외** | 이 화면이 저장하지 않음(응답에만 실림). dev #2 가 USD 로 브랜드마다 다름. 건드리지 않는다. |
| 회사정보 `company_name` · `registration_no` · `bank_name/bank_account/bank_account_name` 등 | **제외** | 별도 화면·별도 라우트·Irene 지시 밖. company_name 은 청구서 발행자명으로 **브랜드 행마다** 쓰인다(09-11 규칙). bank_* 는 payment_settings 은행이 비었을 때의 레거시 폴백이라 펼치기 뒤엔 형제에서 사실상 안 쓰임. 변경 0. |

→ 코드에서 이 6칸을 **상수 배열 하나**(`ACCOUNT_LEVEL_FIELDS`)로 두고 PUT 펼치기·생성 복사·마이그·인스펙션이 **같은 목록**을 쓴다. 목록을 네 군데 따로 적지 말 것.

---

## 3. 기존 데이터 정렬 (개발·운영)

**기준 행 = 소유자 `users.brand_id` 행.** 이유: 화면이 지금까지 **그 행에만** 써 왔으므로, 거기 있는 값이 곧 사용자가 입력한 의도다. 운영 #2 는 10-05 복사본(의도 아님)이라 #1 과 달라졌더라도 #1 이 이긴다.

규칙(owner 별, 브랜드 2개 이상인 owner 만 대상):
1. 소유자(`brands.owner_id` → users)의 `brand_id` 행이 형제 안에 있으면 그 행이 기준. 기준 행 값을 형제 전부에 복사(6칸 모두 · NULL 도 NULL 로 복사 — «기준이 비었으면 형제도 빈다»).
2. 소유자 `brand_id` 가 NULL 이거나 형제 밖이면: 6칸 중 값이 있는 행이 **정확히 1개**면 그 행이 기준. **2개 이상이고 값이 다르면 건드리지 않고 보고만**(owner id · 브랜드 id · 어느 칸이 다른지 출력). 이 경우는 사람 판단.
3. 삭제·NULL 화는 하지 않는다(기준 행이 NULL 인 칸을 형제에 복사하는 것만 예외 — 이건 «계정에 설정 없음»의 정직한 반영이고, 운영 #1·#2 에선 발생하지 않는다: #1 에 값 있음).
4. 출력: owner 마다 `기준 행 · 바뀐 형제 id · 바뀐 칸` 한 줄. `--dry-run` 플래그로 쓰기 없이 같은 출력(운영 사전 확인용 — 메모리 reference_prod_readonly_script_pattern 방식으로 scp→production-backend 에서 dry-run 1회 돌려 Irene 에게 «#2 가 #1 값으로 바뀐다» 결과를 미리 보여 준다).

**레지스트리: `deploy`** (멱등 · 매 배포 재실행 = 불변식 자가치유). 이름 `migrate-brand-account-payment-settings.js`. 트랜잭션 1개 · `process.exit`.
dev 예상 결과: owner 6 → #2·#4 에 #1 값 복사(#4 는 이미 청구서 1건의 발행자 — 결제창이 비로소 열림). owner 22 → #17 에 #10 값 복사. 운영 예상: #2 ← #1(차이 없으면 변경 0건).
**운영 적용 = 배포 안의 마이그 실행 = Irene `/배포` 지시로만.** 배포 노트에 «brands#2 결제 설정이 #1 값으로 덮인다» 를 명시해 승인 대상임을 보이게 한다.

---

## 4. 화면 — 한 줄만, 기능 변경 0

- `BrandPaymentSettingsPage.tsx` PageHeader 아래 HelpText 한 줄: **«이 설정은 계정의 모든 브랜드에 적용됩니다: {names}»** — 소유 브랜드가 2개 이상일 때만 표시(1개면 숨김). 이름 목록은 GET 응답에 서버가 `applies_to_brands: [{id,name}]`(같은 owner_id 형제, 자기 포함)를 추가해 준다. 화면 저장 로직·brandId 결정(:317)은 그대로 둔다.
- i18n: `brand.json` 4개 언어(en→ko→zh→ms)에 `brandPaymentSettingsPage.appliesToAllBrands` 1키, `{{names}}` 보간. `npm run i18n:verify` 통과.
- 이유: 결함의 뿌리가 «화면은 계정, 저장은 브랜드»라는 어긋남이었고, 펼치기가 실제로 됐는지 사용자가 눈으로 보는 유일한 자리다. 이게 없으면 다음에 또 «브랜드별 설정 하세요»류 안내가 나온다.
- BrandInvoicesPage:437 · Admin/InvoicesPage:598 은 `user.brand_id` 로 읽지만 불변식 뒤엔 어느 행이든 같으므로 **무변경**.

---

## 5. 구현 절단면 (이 밖은 변경 금지)

| 파일 | 변경 |
|---|---|
| `dev-backend/utils/brandAccountSettings.js` **신규** | `ACCOUNT_LEVEL_FIELDS`(6칸) · `siblingBrandIds(ownerId)` · `fanOutAccountFields(sourceBrand, {transaction})` · `copyAccountFieldsFromSibling(newBrand, {transaction})` · `findAccountDrift()`(어긋난 owner 목록 반환 — 마이그·인스펙션 공용). JSON 칸은 모델 setter 를 타도록 **인스턴스 `update`/`save`** 로 쓴다(`Brand.update` 정적 호출 시 문자열화가 다를 수 있음 — terminalPayments.js:357 주석과 같은 이유). |
| `dev-backend/routes/brands-core.js` | PUT `/:id/payment-settings`: `brand.save()` 를 트랜잭션으로 감싸고 `fanOutAccountFields` 호출. GET: `applies_to_brands` 추가. POST `/api/brands`(:305): 생성 직후 owner_id 있으면 `copyAccountFieldsFromSibling`. 그 외 라우트 무변경. |
| `dev-backend/scripts/migrate-brand-account-payment-settings.js` **신규** + `migrations.registry.json` deploy 등록 | §3 규칙 · `--dry-run` · 트랜잭션 · exit. |
| `dev-backend/scripts/inspection/suites/brand-account-settings.js` **신규** | 검사 1건: `findAccountDrift()` 결과 0건. baseline 등록 금지(정렬 마이그를 먼저 돌려 0건으로 만든 뒤 켠다). |
| `dev-backend/scripts/health-check.js` | `payment` 카테고리 테스트 2건(§6). |
| `dev-frontend/src/pages/BrandGeneral/BrandPaymentSettingsPage.tsx` + `public/locales/*/brand.json` ×4 | §4 한 줄. |

**금지**: invoices-*.js · invoiceScheduler.js · brands-plans.js · stripeService.js · paypalService.js · paymentSettingsHelper.js · foodcourts-core.js · supplier.js · 🔒 인쇄 보호파일 8개 · KDS — **전부 0줄**. `brands.currency` · company_name/bank_* 쓰기 0.
구현 중 설계와 다른 판단이 필요해지면(예: `Brand.update` 로밖에 못 쓴다, 생성 경로가 더 있다) **중단하고 결과에 붙여 보고** — 세부는 팀원 판단, 되돌리기 어려운 것만 되묻기.

---

## 6. 검증 기준 (전부 통과해야 «통과»)

**A. 실호출 — health-check `payment` 2건 (데모 BG user 22 · 브랜드 10·17, is_demo=1 · 실매장 무접촉)**
1. **펼치기 양성**: 시작 전 brands 10·17 의 6칸 원본을 `JSON.stringify` 로 보관(메모리 feedback_test_save_original_first) → BG 토큰으로 PUT `/brands/10/payment-settings` (bankTransfer.MYR.bankName 에 마커 `ZZHC<ts>`) → GET `/brands/17/payment-settings` 의 같은 자리에 마커 → GET `/brands/17/payment-settings/available/MYR` 의 methods 에 `bank_transfer` 가 그 마커 bankName 으로 나옴 → **brand 1(owner 6) 은 변화 0**(타 owner 무누출) → finally 로 두 행 원복 후 GET 재확인.
2. **권한·격리 음성**: 다른 BG(또는 임시 `@example.com` BG) 토큰으로 PUT `/brands/10/...` → 403 이고 10·17 모두 변화 0. (기존 403 규칙이 펼치기와 함께도 유지됨을 증명.)

**B. 고장주입 2건 (반증 없는 통과는 통과가 아님)**
1. `fanOutAccountFields` 호출을 주석 → A-1 이 **실패**해야 함(17 에 마커 없음) → 원복. pm2 restart 뒤 주입(watch 꺼짐 — 보고에 재시작 여부).
2. dev DB 에서 brand 17 의 payment_settings 를 NULL 로 → 인스펙션 `brand-account-settings` 가 **실패**해야 함 → 마이그 실행 → 17 복구 → 인스펙션 통과. (②와 ③이 같은 탐지 함수를 쓴다는 증명이 여기서 같이 된다.)

**C. 마이그**: dev 에서 `--dry-run` 출력 → 실행 → 재실행 변경 0건(멱등) → `check-migration-registry.js` 통과. 운영은 scp dry-run 1회로 «#2 ← #1 · 바뀌는 칸» 출력을 Irene 보고에 첨부(쓰기 없음).

**D. 기계 게이트**: 코드 확정 → 프론트 빌드 **1회** → `verify-all --full` 1회(print-guard · design-guard · i18n · health-check 전체 · 인스펙션 · mount sweep 포함). `check-sensitive-diff.js` 1회(brands-core 는 돈 경계 판정 가능 — 그게 이 판정의 대상 범위임을 결과에 적는다). `check-print-guard.js` 변경 0건.

**E. 유저 흐름 1회(실브라우저)**: user 22 로 `/pos/brand/payment-settings` 진입 → 한 줄 문구에 «K-Taste Group, K-Dine» 표시 → 저장 → BG 청구서 화면에서 브랜드 17 발행 청구서(없으면 데모용 1건 생성 후 삭제)의 결제창에 은행이체가 뜸.

---

## 7. 게이트 판정 — **조건부 통과(지금)** · 도장은 구현 뒤 1회

- 위 §5 절단면 안에서 구현되고 §6 A~E 가 전부 통과(고장주입 2/2 실패-원복 증명 포함)하면 **설계 재판정은 필요 없다**.
- 다만 통과 마커(`fable-gate.js pass`)는 **판정 세션만, 구현 지문 위에** 찍어야 하므로 지금은 찍을 수 없다(지문이 구현으로 바뀐다). 따라서 **2회차 호출 1회 = 도장 전용**으로 쓴다: 팀원이 ①diff 파일 목록(§5 대조) ②§6 A~E 결과(실호출 응답·고장주입 전후·마이그 dry-run 출력) ③check-sensitive-diff 결과를 **사실로만** 넘기면, 다음 Fable 은 이 문서 §5·§6 체크리스트에 대조만 하고 `pass --note` 를 찍는다(설계 논의 없음·짧게). 한 사안 2회 상한 안이다.
- 조건을 하나라도 못 맞추면(절단면 밖 파일 · 고장주입 미증명 · 운영 dry-run 미첨부) 그때는 도장이 아니라 **재판정**이다.
- 운영 반영은 별개: 마이그가 운영 #2 를 덮어쓰므로 **배포 승인 시 Irene 에게 «#2 결제 설정 ← #1 값»** 을 한 줄로 알린다(dry-run 출력 첨부). 10-05 임시조치 메모리(reference_brand_payment_settings_per_brand_row)는 배포 뒤 «해결 — 계정 단위 펼치기(v…)» 로 갱신.

---

## 8. 범위 밖 (기록만 — 이번에 하지 않음)
- 둘째 BG 계정(user 11 류 · 소유 0)의 결제 설정 접근 403 — 다중 소유자 정식 설계(project_brand_multi_owner) 때 (c)안과 함께.
- `brands.currency` 가 형제마다 다른 것(dev #2 USD) — 설계상 허용인지 별건.
- invoices-helpers:220 bank_* 레거시 폴백 제거 — 펼치기 뒤 사실상 사문이나 이번 범위 아님.

---

## 2회차 (2026-10-07 · 도장 전용) — **통과 · `fable-gate.js pass` 찍음**

판정 주체: Fable 5.1(코드 무변경 · diff 직접 열람 + 재확인 3건). 팀원(Opus) 보고 ①②③을 §5·§6 에 대조.

**§5 절단면 대조 — 일치.** 변경 8 + 신규 3 이 §5 표의 파일과 정확히 같다. brands-core.js 는 import 1줄 + PUT(트랜잭션 + fanOut) + GET(applies_to_brands) + POST(형제 복사) 세 자리뿐 · 금지 목록(invoices-* · stripe/paypal · helper · foodcourts · supplier · 🔒 8개) 0줄 · `check-print-guard` 8/8 변경 없음(내가 재실행). 인스펙션 baseline 에 B-ACC 미등록(내가 grep: 0건) — §5 지시대로.

**§6 대조 — A~E 전부 통과.** A 실호출 2건(payment 8/8 — 내가 재실행해도 8/8) · B 고장주입 2/2 실패→원복 증명(pm2 restart 뒤 주입, 백업 cmp 동일) · C dev 3건→재실행 0건 · 레지스트리 통과 · 운영 dry-run 첨부(쓰기 0) · D verify-all --full 23/24(실패 1 = 배포 기록 파일, 배포 때 생성 — 예상된 것) · check-sensitive-diff ②③+안전망 = 이 판정의 대상 범위 그대로 · E 실브라우저 7/7(문구 표시 → 브랜드 17 청구서 결제창 은행이체).

**팀원 재량 a~d — 전부 수용.**
- a) 기준 행 없을 때 «값 있는 행 여럿이나 6칸 전부 같으면 그 행 기준»: 불변식과 모순 없고(결과가 어차피 같은 값) ORDER BY id 라 결정적. 서로 다를 때만 보고 — §3-2 취지 유지.
- b) 문구를 Content 안 SectionDescription 으로: 조건(2개 이상)·키 동일. 위치는 팀원 몫.
- c) `getDataValue/setDataValue` 원문 복사 + `save({fields})`: 내가 §5 에 «setter 를 타라»고 썼으나 팀원 지적이 맞다 — 모델 getter 가 NULL 을 기본값 객체로 돌려주므로 getter→setter 경로는 «미설정»을 «설정됨(전부 꺼짐)» 으로 바꾼다. 원문 복사가 정답. 내가 재확인: 3개 JSON 칸은 모두 `TEXT`(문자열 저장)라 원 SQL 비교 `String()` 이 유효하고, 현재 dev drift 0.
- d) 보호파일 0줄 — 확인.

**기록할 사실(결함 아님 · 다음 설계 때 참고):**
- POST `/api/brands` 의 형제 복사는 `Brand.create` 와 같은 트랜잭션이 아니다(생성 자체가 트랜잭션 없음). 복사가 실패해도 브랜드는 남고, 다음 배포 마이그(deploy)·인스펙션 B-ACC 가 자가치유·감지한다. 지금 범위에서 수용.
- 운영 dry-run 결과가 §3 예상(«#2 ← #1»)과 다르다: 실고객 owner 23 의 #1·#2 는 이미 동일(10-05 복사본) → **변경 0건**. 바뀌는 건 데모 owner 24 의 #10·#12 ← #4(payment_settings·invoice_settings) 2건뿐. **배포 노트에는 이 사실대로** 적는다(«실고객 변경 0 · 데모 브랜드 2건 정렬»).

**운영 반영**: 별개 — Irene `/배포` 지시로만. 배포 뒤 메모리 reference_brand_payment_settings_per_brand_row 를 «해결 — 계정 단위 펼치기(v…)» 로 갱신.
