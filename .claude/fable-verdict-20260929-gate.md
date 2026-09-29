# Fable 게이트 판정 2026-09-29 — 묶음 SW 5.66-sales-order-share-20260929 (이 사안 2회차 = 게이트)

작성: Fable(리더, 판정 세션). 대상: 운영 스냅샷(2026-09-25 19:16, SW 5.65) 대비 개발서버 묶음 — 09-27·28·29 커밋(최신 56a2c0a91) + 워킹트리(sw.js F2 · releases/2026-09-29-sales-order-share.json · .claude 문서).
근거: 팀원 제출 사실 + 내가 판정 세션에서 직접 돌린 가드·실호출·재현(아래 Ⅱ-③). 운영 쓰기 0(읽기 ssh `ls` 1회). 코드 수정 0. 기록 파일 1곳 정정(Ⅲ-2, 명시).

---

## Ⅰ. 판정 — **PASS. 배포 가능.** (차단 0 · 비차단 발견 4 · 확인 불가 3 — 전부 Ⅲ)

한 줄: 09-27 Ⅱ(R1~R6·F1~F3) · 09-28 Ⅱ(R7·F4) · 09-29 Ⅱ(F2 범위 확장·R7 마이그 수용) 절단면대로 구현됐고, 설계 밖 변경 0. 판정 없이 팀원이 판단해 넣은 3건(Sales Orders 3건·0원 청구서 목록 갱신 F5·판매자 다중 브랜드)은 3축 기준상 팀원 몫이 맞고 코드도 맞다. 🔒 무접촉. 마이그 멱등·롤백 경로 실재. 마커는 이 파일 저장 뒤 내가 찍는다.

---

## Ⅱ. 근거 (검증 규율 4조항 순서)

### ① diff 범위 대조 — 설계 밖 변경 0
스냅샷 대비 54건(코드 33 · 로케일 16 · 문서/기록 5). 항목별:

| 항목 | 파일 | 판정 원문 대조 |
|---|---|---|
| R1 오너행 보존 | `routes/restaurants-crud.js` :91·:296·:807·:853·:1931·:2006 | 09-27 Ⅱ 그대로 — destroy 를 `relationship_type:'oversight'` 한정, 소유자 manager_id 는 bulkCreate 제외(모델 기본값 `oversight` 로 생성), 목록·상세 응답 through 에 relationship_type 포함해 ownership 제외. 생성 :1270 무변경 ✓ |
| R2 마감 교대 잠금 | `routes/cash-management.js` `assertShiftOpen` + PUT :459·DELETE :476 | 400 `SHIFT_NOT_OPEN`, POST 와 같은 코드·문구. 고아(shift 없음)도 차단. 금액 공식 무접촉 ✓ |
| R3 타입 게이트 | `scripts/check-type-baseline.js`(신규) · `type-baseline.json`(436, 09-29 bless) · `verify-all.js` 1줄 등록 | 힙 3584MB + tsconfig.verify.json, 파일별 기준, 검사기 고장(비정상 종료·src 밖 오류·0건)을 실패로 봄, heavy-task-gate 존중. 09-27 「기준 439」보다 낮은 436 으로 bless = 더 엄격 ✓ |
| R4 배포 자동원복·롤백 v3 | `deploy-to-production.sh` · `rollback-production.sh` · `scripts/deploy-layout.sh`(신규) | 경로·복원 함수 단일 소스. rsync 직후 `DEPLOY_CODE_TOUCHED=true` → pm2 restart 성공 후 false, EXIT trap 에서 실패면 이번 백업으로 코드 원복(DB 무접촉, 덤프 경로 안내). 롤백은 제외 rsync(.env·uploads·logs·node_modules 보존), 되돌린 것 0 이면 exit 1. 배포가 코드 접촉 **전**에 롤백 도구 2파일을 운영에 동기화 ✓ |
| R5 임시파일 | `_tmp_uname.js` 삭제 · rsync `--exclude '_tmp_*' --exclude 'tmp/'` | ✓ |
| R6 문서 | `docs/SUPPLIER_CONTRACT_SYSTEM.md` 1줄 · `DEPLOYMENT.md` 2줄 · `docs/TRADE_STRUCTURE.md` ⑦ 1줄 | ✓ |
| R7 배송 가능 지역 | `models/Brand.js`·`Foodcourt.js`(TEXT NULL, SupplierCompany 와 같은 이름·주석) · `brands-core.js`·`foodcourts-core.js` GET/PUT · `supplier.js` allowed+정규화 · `utils/sellerNames.js`(attributes+map+`normalizeDeliveryPolicy` 한 곳) · `restaurants-ingredients.js` `seller_delivery_policy`(getSeller 같은 패턴) · `scripts/migrate-add-seller-delivery-policy.js` + 레지스트리 deploy | 09-28 Ⅱ 그대로. 정규화 규칙(undefined 무변경 / ''·null→null / sanitize 500자)이 3종 라우트 공용 함수 1개 ✓. `computeDeliveryFee`·`deliveryFee.ts` diff 없음 ✓ |
| R8 발신명 회사명 | `utils/emailBranding.js` brand 분기 name · `services/soaScheduler.js` 월 자동·수동 두 경로 | 같은 규칙(company_name ‖ name) ✓ |
| F1 RA 부여 입구 | `StaffManagementPage.tsx` Edit 모달에 `UserContextsSection`(RA 만) | 공용 컴포넌트, 새 styled 0 ✓ (09-27 마커 note 의 후속 「RA 입구 없음」 해소) |
| F2 새로고침 1회 | `index.tsx` hadController 가드 + `public/sw.js` activate `w.navigate` 루프 제거·`clients.claim()` 유지·주석 1줄·SW_VERSION 5.66 | 09-29 Ⅱ 그대로. sw.js 나머지(install·fetch·푸시) 무접촉 ✓ |
| F3 설치 배너 | `PwaInstallBanner.tsx` zIndex 9000→900 | ✓ |
| F4 지역 칸 화면 | `BrandPaymentSettingsPage.tsx`·`FoodcourtPaymentSettingsPage.tsx`(같은 PUT 한 번) · `SupplierCompanyInfoPage.tsx`(AutoSaveField 패턴) · `NewPurchaseOrderPage.tsx`(terms **밖**에 실어 배송비 줄 아래 한 줄) · 로케일 4언어×4 ns | ✓ |
| **판정 밖·팀원 판단** F5 0원 청구서 목록 갱신 | `BrandInvoicesPage.tsx`·`FoodcourtInvoicesPage.tsx` — Confirm 성공 후 두 목록+배지 재조회 | 파급 작음·길 하나 → 팀원 몫. 맞음 ✓ |
| **판정 밖·팀원 판단** Sales Orders 3건 | `IncomingOrdersView.tsx`(Buyer 세로·WhatsApp 공유·카테고리 묶음) · `utils/poShare.ts`(+test) · `utils/sellerProductIdentity.js` `attachSellerProductCategory` · `seller-orders.js` GET /:id 1줄 | 표시 전용. 카테고리 조회는 `attachSellerProductIdentity` 와 분리해 메일·대조·반품 경로 쿼리 무증가 ✓. 판매자 카테고리(구매자 재료 분류 아님) 기준 = 맞는 선택 |
| **판정 밖·팀원 판단** 판매자 다중 브랜드 | `seller-orders.js` `sellerIdForBuyer` — sellable-products·POST / 공용 | 3축: 주문 경로(A 큼)이나 길 하나(판매자 = 그 매장의 브랜드) → 팀원 실행+게이트가 맞다. 코드 대조: `se.ids` 는 `sellerScope.js` 가 BG=resolveBrandScopeIds, BM=[자기 브랜드] 로 채움 · 매장 brand_id 가 내 목록에 없으면 404(POST 는 rollback 후) · 푸드코트·공급업체·SA 종전 그대로 ✓. 부수 변화 1: brand_id NULL 매장은 이제 404(전엔 기본 브랜드로 목록) — 브랜드는 자기 매장에만 파니 맞음 |

🔒 인쇄·KDS: print-guard 8/8 무변경. 돈 공식(orderTotals·computeDeliveryFee·발주 총액) 무접촉. 보안 경계(auth·라우터 마운트·공개 라우트) 변경 0.

### ② 가드 스크립트 (내가 재실행 — 판정 세션)
- `check-print-guard` 8/8 무변경 · `check-sensitive-diff` ②(cash-management·결제설정 화면 2) ③(모델 2·마이그 1) 안전망 3 → 대상 맞음 · `check-migration-registry` 미분류·유령·중복 0 · `check-design-guard` 신규 0(합계 299/기준 295 차이는 지문 dedup, 증가 아님 — 스크립트 :102·:115 확인) · `timezone-check` 신규 0 · `verify-all --only deploy-ready` 1/1 · **`health-check --quiet` 269/269**.
- 게이트 밖 jest: `src/utils/poShare.test.ts` **11/11**(react-scripts test 로 직접).
- 팀원 실행 인용(재실행 안 함): `verify-all --full` 23/24 → 기록 작성 후 24, mount sweep 689.9초 크래시 0, i18n Errors 0, build:dev 1회.

### ③ 실호출·재현 (내가 dev 에서 직접 · 데이터 변경 0)
- **R2**: RA(user 23) `PUT /api/cash/restaurant/38/movement/10`(shift 23 = reconciled) → **400 SHIFT_NOT_OPEN** · `DELETE` 동일 → 400 · 행 10 전/후 동일.
- **R1**: SA `GET /api/restaurants/3` → 감독 목록 ['3'], 소유자 289 **제외** · DB ownership 행 1 유지.
- **다중 브랜드**: user 6(brand_general, brand_id 1, 브랜드 1·2·4 소유) — 매장 10(브랜드 4) `sellable-products` → **200 상품 3** / 매장 1(브랜드 1) → 200 상품 0(dev 연결 없음) / 매장 39(브랜드 10) → **404 Buyer not found**.
- **R7**: `GET /api/brands/1/payment-settings` → `delivery_policy` 키 존재(null).
- **R4 복원 함수 재현**(scratchpad 가짜 디렉터리, `deploy-layout.sh` 환경변수 덮어쓰기): ⓐ 백업 TS1 복원 rc 0 · server.js OLD · .env/uploads/node_modules/logs/desktop 보존 · 배포 후 생긴 파일 제거 · 빌드 OLD ⓑ 같은 크기·mtime 다른 내용 → `--checksum` 으로 복원됨 ⓒ 빈 백업 rc 1 무변경 ⓓ ts 없음 rc 1.
- **배포 스크립트 원복 구간**(rsync :509 → pm2 restart :852): `exit 0`·`read -p` 0건 → 이 구간 실패는 전부 `error`(exit 1) → trap 발동. 마이그(:662~:700)도 이 구간 안 → 실패 시 코드 원복·DB 그대로(칸 남아도 무해).
- **운영 읽기(ssh ls)**: `/var/www/scripts/` 존재(롤백 도구 rsync 대상 OK) · 운영 `rollback-production.sh` = **v2.0(2026-01-26)** → 이번 배포가 v3 로 교체 · `/var/backups/orderhere/pre-deploy/db_predeploy_20260925_185824.sql.gz` 실재(덤프 경로 규칙 일치).
- 팀원 실측 인용: F2 새 프로필 첫 방문 문서 1회·site-settings 1회·SW 제어 true / 서빙 sw.js 교체 후 문서 +1(총 2) / 제거 전 2·2 → 09-29 Ⅱ 기준 충족. R8 3/3. 고장주입 R1·R2·R3·R4(2)·R8·다중 브랜드(3 실패 재현).

### ④ 배포 안전성
- 마이그 1: `migrate-add-seller-delivery-policy.js` — information_schema 확인 후 ADD(멱등), ENUM 무관, 백필 0, `deploy` 레지스트리. 롤백 = 코드만 백업으로(칸은 옛 코드가 안 읽음) · 칸까지 지우려면 `ALTER TABLE brands DROP COLUMN delivery_policy` / foodcourts 동일.
- SW 5.66 bump 완료. 서빙 `dev-frontend-build/sw.js` activate 에 navigate 블록 0(파일에 남은 `navigate` 3곳 = fetch `req.mode==='navigate'` 판정·푸시 알림 클릭 창 이동 — 별개, 무접촉).
- 롤백 경로: 배포 전 DB 덤프 + 코드 백업 TS + v3 롤백 스크립트(배포가 코드 접촉 전에 운영에 복사).
- 운영 데이터 무접촉(이 묶음). users 19 이메일 1행은 SOA 건, 이 묶음과 무관 — 팀원 보고 그대로.

---

## Ⅲ. 발견 (전부 비차단)

1. **Stop 훅이 이 묶음 내내 무력했다.** `.claude/.fable-gate-skip` 이 **09-25 16:10** 부터 남아 있어 오늘 skip 5회 기록(15:02~15:24). 규칙상 skip 은 「사람이 넘길 때」 1회용. → 마커 찍힌 뒤 팀원이 삭제(gitignore 대상이라 지문 무관 — `git ls-files --others` 에 안 뜸 확인).
2. **배포 기록 `verification.migration` 문장이 사실과 달랐다** — 「롤백 = brands/foodcourts/supplier_companies.delivery_policy DROP(스크립트 주석)」: 스크립트 주석은 「칸을 남긴 채 옛 코드 복원」이고 DROP 문 없음, supplier_companies 는 이 마이그 대상 아님. 사고 때 읽는 문장이라 **내가 그 문자열 1곳만 정정**(JSON 유효성 확인). 코드 무접촉. 마커는 정정본 지문으로 찍는다.
3. 팀원 보고 「서빙 sw.js 에 navigate 0」은 부정확 — activate 블록 0 이 맞고 파일엔 별개 3곳 남음(Ⅱ-④). 판정엔 영향 없음, 보고 정확성만.
4. `DEVELOPMENT_PLAN.md` 09-29 절이 F2 🟡·「sw.js(버전만)」으로 낡음 · `session-state.md` 「Fable 게이트 판정 요청 중」 → **배포 후** 갱신(DEVELOPMENT_PLAN 은 지문 안, 배포 전 손대면 마커 사망).

**확인 불가(추측 안 함):**
- 다중 브랜드 **주문 실생성**(POST) — 메일 발송 우려로 dev 미실행. 코드 대조와 sellable-products 200/404 로 판정. 배포 후 Irene 이 실제 주문 1건으로 확인(기록 `irene_actions_after_deploy` 3번).
- R8 SOA 메일 **실발송 머리글** — 개발서버에서 볼 수 없음. 다음 운영 발행(SOA 2차 뒤) 때 확인.
- mount sweep·F2 브라우저 실측 — 팀원 수치 인용, 내가 재실행 안 함(11분 규칙).

---

## Ⅳ. 팀원 실행 지시

**지금(배포 전)** — 마커가 찍힌 뒤 코드·기록 무변경 유지(session-state.md 만 예외).
1. `.claude/.fable-gate-skip` 삭제.
2. Ⅴ 보고문을 그대로 Irene 에게 전달 → Irene `/배포`.

**배포 안(운영검증 절차 안에서)**
3. 마이그 로그에 `brands.delivery_policy 추가`·`foodcourts.delivery_policy 추가` 2줄 확인 · 운영 `head -2 /var/www/rollback-production.sh` 가 v3.0 · `/var/www/scripts/deploy-layout.sh` 존재.
4. 09-28 판정대로 운영 `PUT /api/brands/1/payment-settings`·`/2/…` `{"delivery_policy":"Petaling Jaya, Selangor"}` → 사후 GET 첨부(다른 브랜드·공급업체 무접촉).
5. 운영 sw.js SW_VERSION 5.66 실측.

**배포 후**
6. 기록 갱신: DEVELOPMENT_PLAN F2 ✅·sw.js 항목 정정 · CHANGELOG Unreleased → 버전 · session-state.
7. Irene 확인 3건(기록 그대로): 0원 청구서 93·88·69·61 Confirm · 브랜드 계정으로 K-DINE IPC 주문 추가에서 «None of your products are linked» 소멸 · Payment Settings 지역 칸.
8. 다음 묶음 = SOA 2차(`fable-verdict-20260929-soa2.md` §5 A~E) + invoice_trigger(`-soa.md` 추가 판정 절단면 1~6). Fable 재호출은 그 묶음 게이트 1회.

---

## Ⅴ. Irene 에게 올릴 보고문 (그대로 전달)

> **이번 배포 묶음 — Fable 게이트 판정: 통과. 배포하셔도 됩니다.**
>
> **무엇이 나가나(운영에서 달라지는 것):**
> - 판매자 주문(Sales Orders): Buyer 칸이 위아래로, 주문 상세에서 「WhatsApp 으로 공유」(그룹 선택 화면이 열림), 품목이 판매자 카테고리별로 묶여 보임.
> - **브랜드 계정으로 K-DINE IPC 에 주문 추가** — 「연결된 상품 없음」이 사라짐(판매자를 첫 브랜드로 고정하던 것을 「그 매장이 속한 내 브랜드」로).
> - 판매자 설정에 「배송 가능 지역」 글 칸(브랜드·푸드코트·공급업체), 매장이 발주 담을 때 한 줄로 보임. 배송비 계산엔 안 씀.
> - 매장 정보 수정 저장해도 오너 연결이 안 벗겨짐 · 마감한 교대의 현금 입출금은 수정·삭제 불가 · 판매자 메일·정산서 발신명이 회사명 · 0원 청구서 Confirm 뒤 목록 바로 갱신 · 직원 관리에서 매장 관리자에게 다른 매장 권한 부여 · 설치 배너가 창을 안 가림 · 앱 업데이트 때 화면이 **한 번만** 새로고침.
> - 배포 안전망: 코드 복사 뒤 실패하면 자동으로 되돌리고 멈춤 · 되돌리기 도구가 실제 백업 구조에 맞게 재작성(운영에 있던 건 1월판이라 아무것도 안 되돌리면서 「완료」를 찍던 상태였음) · 타입 오류가 늘면 배포 전 게이트가 막음.
>
> **제가 직접 확인한 것:** 인쇄·주방화면 파일 무접촉 8/8 · 전체 회귀 269/269 · 마감 교대 입출금 수정·삭제 → 거부됨 · 오너 연결이 감독 목록에 안 섞임 · 브랜드 계정으로 두 번째 브랜드 매장 상품 목록 나옴(남의 매장은 404) · 되돌리기 함수를 가짜 폴더로 4가지 경우 재현(설정·사진·로그 보존, 빈 백업이면 실패로 끝남) · 운영 서버에 롤백 도구가 들어갈 자리와 배포 전 DB 덤프 있음.
>
> **DB 변경:** 칸 2개 추가(브랜드·푸드코트 「배송 가능 지역」). 기존 데이터 변경 0. 되돌릴 때 칸은 남겨도 옛 코드가 안 읽어 무해.
>
> **배포 뒤 Irene 확인 3가지:** ① 브랜드(GIT) 계정으로 K-DINE IPC 에 주문 추가 화면에서 상품이 뜨고 주문 1건이 들어가는지 ② 0원 청구서 93·88·69·61 Confirm ③ Plans & Payments → Payment Settings 에 「배송 가능 지역」 칸(팀원이 「Petaling Jaya, Selangor」 넣어 둠).
>
> **확인 못 한 것(솔직히):** 브랜드 계정 주문 **실제 생성**은 개발서버에서 메일이 나갈까 봐 안 눌렀습니다 — 위 ①로 확인. 정산서 메일 머리글 회사명은 다음 발행 때 보입니다.
>
> **한 가지 정리:** 검증 후 완료를 막는 자동 훅이 09-25 부터 「건너뛰기」 파일 때문에 꺼져 있었습니다(코드 문제 아님, 팀원이 지웁니다). 이번 묶음은 제가 직접 판정했으니 영향 없습니다.
>
> 다음 묶음은 말씀하신 대로 K-DINE 정산서 2차 + 청구서 발행 시점 설정입니다. 이 배포 끝나면 바로 착수합니다.
