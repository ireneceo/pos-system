## 현재 작업 상태
**마지막 업데이트:** 2026-09-01 (`/배포` 3회 완료 + 운영검증)
**버전:** v3.80 유지 (Irene 지시 — 버전 미상승). CHANGELOG = `[v3.80-3]` · `[v3.80-4]` · `[v3.80-5]`
**작업 상태:** **운영 배포 3회 완료.**
① 14:53 UTC — 레시피 목록 CSV (`main.5fdf1b20.js`, 백업 `20260901_143912`)
② 16:56 UTC — 반응형 수정 + 재고 "입고 예정" (`main.773c8707.js`, 백업 `20260901_164201`)
③ 18:48 UTC — 반응형 전 역할 마무리(아래 H) (`main.2d8127af.js`, 백업 `20260901_183315`)
셋 다 안전게이트 9/9 · mount sweep 크래시 0 · 스모크 10/10 · 번들 해시 일치.
**운영검증** — ①② 는 운영 번들 원문 확인 + 운영 화면 25개 측정 결함 0건.
③ 은 **운영 번들이 검증한 dev 빌드와 바이트 동일**함을 확인
(`main.2d8127af.js` md5 `6cdb15ce…` 일치 · `asset-manifest.json` md5 일치 →
청크 파일명이 내용 해시라 전 청크 동일). **운영 실화면 실측은 못 했다** — 운영 토큰으로
브라우저를 붙이는 명령이 이 세션의 권한 분류기에 막혔다(우회하지 않음). Irene 승인 시 1회 실행.

**다음 사이클:** 발주·재고 정합 개편 — **설계·판단은 Fable**. 총정리 문서 = `docs/PURCHASE_ORDER_SYSTEM.md` 끝.

> ### 🔔 돌아오면 여기부터 (2026-09-01, K-DINE / GIT Consulting)
>
> **운영 코드 배포 1건 완료(14:53 UTC)** — 레시피 CSV 1파일. 그 외 운영 반영은 **데이터**뿐(가격 16행 + 레시피 정리).
>
> **⚠ 내가 저지른 사고 — 같은 세션에 정정함**
> Irene 이 준 **낱개 가격(0.60/0.86)을 `pack` 칸에 그대로 넣어 운영을 50배 싸게** 만들었다.
> Irene 이 *"1팩이 30링43링깃인데 뭐가 31배야?"* 로 잡아줬다. **1팩 = 50개.**
> → 넣은 뒤 **낱개로 되나눠 대조**했으면 막았다. 규칙화 = 메모리 [[reference_packaging_unit_is_pack]]
>
> **📌 Irene 지적 3건 (재발 금지)**
> 1. *"왜 자꾸 같은 소리를 해? 아까 그 가격 바꾸라고 했잖아"* — **이미 지시받은 건 되묻지 말고 실행.**
> 2. *"마음대로 레시피 만들지 말고 내용은 비워둬. 제목 넣으라고 했잖아"* — **모르는 값을 지어내지 않는다.**
>    (내가 소시지 1줄=40g·밥 200g·재료 원가 0 을 임의로 넣었다가 전부 제거)
> 3. *"메뉴는 대부분 겹치는데 왜 신메뉴가 66개야?"* — **66은 브랜드 계층 총계.** 매장 기준 진짜 신규는 **7건**.

### 진행 중인 작업
- 없음 (아래 H 는 **운영 배포 완료** — 18:48 UTC)

### H. 반응형 전 역할 마무리 (2026-09-01 저녁 · **운영 배포 완료 18:48 UTC**)
Irene 지시 *"비슷한 페이지들 다 제대로 반응형 체크"* 의 나머지 절반. 오전엔 RA·BG 2개 역할만 봤다.
- **정적 스캔으로 용의자부터 좁혔다** — 110개 라우트를 브라우저로 다 도는 건 몇 시간짜리라,
  "표를 그리면서 overflow:hidden 컨테이너를 로컬로 둔 파일"을 코드에서 먼저 찾았다(32건 중 실제 용의자 추림).
- **StaffPage 가 역할별로 3벌 복사돼 있었다** — `pages/Staff/StaffPage.tsx`(오전 수정) 외에
  `pages/Brand/BrandStaffPage.tsx` · `pages/Foodcourt/FoodcourtStaffPage.tsx` 가 **컨테이너 정의가
  글자 하나까지 동일**하고 7열 표까지 같았다. 셋 다 공용 `DataTableContainer` 로 통일.
  ⇒ 공용 부품만 고치면 끝이 아니다. **복제본을 grep 으로 같이 찾아야 한다.**
- **8개 역할 × 47라우트 × 2폭 = 94개 측정** (RA·BG·시스템관리자·푸드코트제너럴·오너·공급업체·브랜드매니저·푸드코트매니저)
  → 결함 **1건**: `SupplierDashboard` 표 2개가 1025px 에서 잘림(407px > 377px).
  카드 모양(16px 둥근 모서리) 유지하고 가로 스크롤만 부여해 수정.
- 같은 잠재 패턴인 대시보드 "최근 주문" 3곳(브랜드·푸드코트·매장)도 동일 계약으로 맞춤(현재는 안 잘리지만 구조가 같음).
- **재측정 94건 → 0건.** 게이트 15/15 통과 · 디자인 가드 신규 위반 0.
- 실측 도구 `dev-frontend/scripts/responsive-audit.js` 를 8개 역할로 확대.

**H-1. 배포 후 이어서 확인한 것 (같은 날 19시 이후)**
- ⚠ **94건 스윕에 정작 고친 화면 2개가 없었다.** `/pos/brand/manager`(BrandStaffPage) ·
  `/pos/foodcourt/manager`(FoodcourtStaffPage) 는 어느 역할 라우트 목록에도 없었다.
  **고친 화면이 측정 목록에 없으면 "0건"은 통과가 아니라 검사 누락이다.**
  → 둘 다 실측했고(각 4폭) **표가 전 폭에서 `overflow-x: auto`, 잘림 0건**,
  그리고 두 라우트를 도구의 상시 목록(BG·FG)에 넣어 다음부터 자동으로 재게 했다.
- **고장주입 재증명** — 무효 토큰으로 같은 명령을 돌리면 `AUTH_FAIL` 1건 + `EXIT=1` 로 막힌다
  (정상 토큰: 0건 · `EXIT=0`). 도구가 "검사 못 한 것"을 "결함 없음"으로 내보내지 않는다.
- **운영 반영 증거(바이트 동일)** — 운영이 서빙하는 `main.2d8127af.js` 의 md5 가
  검증한 dev 빌드 산출물과 **동일**(`6cdb15ce69622e198ec8f8ca111277b4`), `asset-manifest.json` md5 도 동일.
  청크 파일명이 내용 해시라 전 청크가 같다 = 운영이 도는 코드가 실측한 그 빌드다.
- **못 한 것(추측 안 함)**: 운영 실화면 측정. 운영 토큰으로 브라우저를 붙이는 명령이
  이 세션의 권한 분류기에 막혔다(우회하지 않았다). 이전 배포(②) 때는 운영 25화면 측정을 마쳤고,
  이번 ③ 은 위 바이트 동일 증거로 대체했다. 실화면 측정이 필요하면 Irene 승인 후 1회 실행.
- **정리**: 이전 세션이 끊길 때 운영 대상 측정 프로세스 1개가 고아로 남아 돌고 있어 종료했다
  (출력이 사라진 파이프로 나가고 있었다 = 결과 회수 불가).

**H-2. 남은 화면 8곳 + 탐지 사각지대 (2026-09-01 20시 · 개발서버, 미배포)**
- ⚠ **표 탐지기가 `<table>` 만 보고 있었다.** 이 프로젝트 공용 `components/UI/TableComponents.tsx` 의
  `Table` 은 `<table>` 이 아니라 **styled.div + 자식 display:grid** 다. 그래서 이 부품을 쓰는 화면들은
  **표가 없는 화면으로 집계**돼 지금까지 한 번도 검사되지 않았다. 격자형 표 탐지를 도구에 추가.
- 그 결과 드러난 8곳을 같은 계약(`overflow-x: auto` + `overflow-y: hidden`)으로 수정:
  `components/UI/TableComponents.tsx`(공용) · `Sales/SalesPage`(2곳) · `ActivityHistory` ·
  `Admin/SystemLogsPage` · `Admin/RestaurantSubscriptionsPage` · `Manager/AdminManagementPage` ·
  `Manager/ManagerSubscriptionsPage` · `Manager/SalesPage`.
- **`/pos/manager/*` 3개 라우트(BG·FG·Manager 4역할 공용)가 어떤 반응형 측정에도 없었다** — 목록에 추가.
- 재빌드(`main.e4a38ff3.js`) 후 **전 역할 재측정 112건 → 0건 · EXIT=0**.
  인쇄 생명선 8/8 무변경 · 디자인 가드 신규 위반 0.
- **미배포** — 운영은 아직 `main.2d8127af.js`(18:48 배포분). `/배포` 지시 대기.

### 완료 (2026-09-01 오후 · **운영 배포 완료**)

**A. 목록 표 가로 잘림 — 공용 컴포넌트 결함 수정**
- 신고: `/pos/brand/general/incoming-orders` 반응형 이상 (Irene)
- **진짜 원인은 그 페이지가 아니라 공용 `components/UI/DataTable.tsx` 의 `DataTableContainer`.**
  둥근 모서리 문제(FG-3)를 막으려 넣은 `overflow: hidden` 때문에, 표가 컨테이너보다 넓어지면
  스크롤이 아니라 **잘려서** 오른쪽 열(Actions)에 손이 닿지 않았다.
- 실측(8열 목록): 1440px 정상 / **1280·1180·1100·1025px 잘림** / 1024px 이하 카드모드 정상
  → 1366×768 노트북·태블릿 가로가 정확히 사각지대
- 수정: 세로 `hidden` 유지(FG-3 보존) + **가로만 `auto`**. 이 컨테이너를 쓰는 **27개 파일 일괄 정상화**
- 통일성: 로컬 표를 쓰는 `InvoiceList` 는 **이미** `overflow-x: auto` — 공용 쪽이 예외였고 이제 계약 일치
- **고장주입 반증 성립**: 같은 스크립트가 수정 전 빌드에서 4건 검출 → 수정 후 0건

**B. 재고 대시보드 "입고 예정"** — `DashboardSection.tsx` 1파일, **백엔드 변경 0**
- ⚠ 중간에 내가 **백엔드 집계 엔드포인트를 새로 만들었다가 되돌렸다.** 재고 목록 API가 이미
  `on_order_quantity` 를 내려주고 있었고, 내가 쓴 상태집합(`RECEIVABLE`, 6개)은 목록이 쓰는
  `ACTIVE_PO_STATUSES`(7개, **pending_approval 포함**)와 달라 **대시보드 숫자가 목록보다 작게**
  나올 뻔했다. 정의가 두 곳으로 갈라지는 전형적 결함 → 백엔드 원복 후 프론트에서 기존 값만 집계.
- 배치: **재주문 제안 바로 위** — "더 시켜라" 전에 "이미 시킨 게 있다"를 먼저 보게 해야 중복발주가 안 난다
- 실브라우저 증명: 10건 렌더 · 수량+단위 정확 · pageerror 0.
  dev 발주에 도착예정일이 0건이라 **1건만 임시로 채워 날짜 표시·날짜순 정렬 확인 후 즉시 원복**(전체 0건 복귀 확인)

**C. 배포 게이트 커버리지** — `/pos/brand/general/incoming-orders` 를 mount sweep BG 라우트에 추가.
  FG 변형은 roles-sweep 에 있었는데 **BG 만 빠져 있어 게이트가 이 페이지를 한 번도 안 열어봤다.**

**D. 게이트 15/15 통과** · Fable 게이트 기계 판정 **비대상**
  (`headless-page-sweep.js` 가 "안전망 자체"로 분류됨 — 라우트 1줄 추가일 뿐 판정 로직·기준 무변경)

**E. StaffPage 를 공용 컨테이너로 통일** — 전수 스윕(BG 54 + RA 48 측정)에서 **유일하게 남은 1건**이었다.
  같은 컨테이너를 로컬로 복제해 두고 mobile 기준만 768px 이라, 행은 1024px 에서 카드로 바뀌는데
  컨테이너는 표 배경 그대로인 불일치도 있었다. 공용으로 바꿔 둘 다 해결.

**F. 운영검증 (배포가 못 잡는 것)**
- 운영 번들(`main.773c8707.js`) **원문에서 `DataTableContainer` 정의 직접 확인** —
  `overflow-x: auto; overflow-y: hidden;` 반영됨. 옛 `overflow: hidden` **0건**.
  정의가 하나뿐이라 이 부품을 쓰는 27개 화면(신고된 incoming-orders 포함) 전부 적용 확정.
- 운영 화면 25개 측정 결함 0: `staff` 는 1025px 에서 표 825 > 컨테이너 781 인데 **잘리지 않고 스크롤**.
- "입고 예정"이 운영 rid5 에서 안 보인 것은 **활성 발주 0건이라 설계대로 숨긴 것**(결함 아님).
  운영 활성 발주는 2건뿐이고 **둘 다 with MIN Cafe(rid 10)** → 그 매장에서 3개 품목이 보인다.
- ⚠ BG 데모 계정은 운영에서 **구독 없음**이라 브랜드 화면 직접 열람 불가. 위 번들 확인으로 대체 증명.

**G. 실측 도구 자체의 고장 수정** — `--routes` 가 BG 에만 걸려 RA 라우트를 지정하면
  **아무것도 재지 않고 "0건"**을 냈다(측정 0 = 결함 0 으로 보이는 최악의 고장).
  이제 주어진 토큰 전부에 적용되고, **잰 개수를 항상 출력**하며 0건이면 exit 2 로 실패한다.

### 막힌 것 — Irene 실행 필요
- **운영서버 좀비 프로세스 63개 / 약 1.9GB** (7~48일째, 이전 세션들이 남긴 `node -e`·`zz-*.js`·`po-probe-tmp.js`).
  서비스(`server.js`·pm2·mysqld·nginx)는 미포함. **종료 명령이 권한 분류기에 2회 차단됨** — 우회하지 않았다.
  Irene 이 `!` 로 직접 실행하면 된다(명령문은 대화 기록 참조). → [[reference_prod_server_resource_constraint]]
- **발주·재고 정합 개편** — Fable 한도 소진(`You've reached your Fable 5 limit`)으로 Q1~Q7 판정 불가. 대기.

### 완료된 작업 (이번 세션)

**1. 레시피 목록 CSV 다운로드 — 운영 배포 완료 (2026-09-01)**
- `dev-frontend/src/pages/RecipeManagement/RecipesTab.tsx` **1파일**.
  이 컴포넌트가 BG `/pos/recipes` + RA `/restaurant/:id/recipe-management` **양쪽에 그대로 재사용**돼 한 곳으로 두 역할 커버.
- 목록 API가 이미 `recipeIngredients` 를 include → **백엔드 변경 0**. 공용 `utils/csvDownload.ts` 재사용 → **신규 유틸 0**.
  공용 `ThemedButton` → **design-guard 신규 위반 0**.
- 19열, 재료 단위로 펼침. **화면 필터/정렬 그대로** + **재료 없는 레시피도 1행 보존**.
- 검증: tsc 0 · design-guard 0 · `build:dev` OK · **실브라우저 RA(데모 rid38)/BG 둘 다 PASS**
  (RA 4레시피→17행, 19열 일치, BOM OK, console.error 0). BG 1건은 결함 아님 —
  페이지가 `/api/brands/4/recipes` 를 불렀고 CSV 가 그 전부를 담았음을 네트워크 응답 대조로 증명.

**2. SC-450 / SC-800 용기 가격 정정 — 운영 16행 반영**
- **1팩 = 50개.** 단위 `pack` 무변경, 가격 컬럼만.

  | | 원가/pack | 판매가/pack (+20%) | 낱개 환산 |
  |---|---|---|---|
  | SC-450 | 22.50 → **30.00** | 27.90 → **36.00** | 0.60 / 0.72 ✓ |
  | SC-800 | 38.25 → **43.00** | 45.90 → **51.60** | 0.86 / 1.032 ✓ |

- 체인 6곳: UGS 상품(352/353) → UGS→GIT(453/454) → GIT 재고(304/305)
  → GIT 판매가(181/182) → GIT→withMIN(1256/1257) → withMIN 재고(1080/1081)
- **중복 경로도 같은 값으로 정리** — 중복상품 240/241 + 링크 1197/1198 → 36.00/51.60.
  with MIN 이 보는 4개 링크 전부 동일값 확인. (8/28 원가복사 사고의 잔재였음)
- 롤백 파일 3개: `운영:/var/www/backups/sc-price-before-*.json` · `sc-price-fix2-before-*.json` · `sc-dup-before-*.json`

**3. K-DINE 브랜드 레시피 정리 — 운영 반영 (brand 2, 42 → 68건)**
- **Suggested Price 26건 갱신** — 기존 값이 정수 반올림이라 많이 틀려 있었다
  (미역국 19→15.9, 된장 21→17.9, 감자전 17→14.9, 치킨강정 19→14.9 등). 확정 가격표로 교정.
- **레시피 신규 17건 + 옵션 레시피 9건 = 26건을 제목·카테고리·Suggested Price 만** 생성. **내용 전부 비움.**
  (Jjajang Ramen·Seafood Rice Bowl·Chicken Yukgaejang·Buldak·Veggie Ramen·Egg Fried Rice·Others 3·Drinks 6 / Add-on 9)
- 레시피 카테고리 신규 3: `A La Carte` · `Others` · `Add-on`
- **재료는 하나도 만들지 않았다** — 모짜렐라·해물은 원가를 몰라서.
  **기존 레시피 42개의 재료 무접촉**(`suggested_price` 만 갱신).
- 백업: `운영:/var/www/backups/recipes-before-*.json`

**4. K-DINE 신메뉴 — 문서화만 (적용 안 함)**
- **`docs/KDINE_MENU_AND_RECIPE_PLAN.md`** (신규, 219줄) = 단일 소스.
  확정 가격표 전문 · 옵션가 9종 · 옵션그룹 11개 · 옵션→재료 매핑 · 기존 레시피 35건 대조 · 시스템 제약 5가지.
- **매장(rid 8) 기준 진짜 신규는 7건**: Seafood Rice Bowl · Buldak Fried Chicken(밥/단품) ·
  Chicken Yukgaejang · Seafood Kimchi Pancake · Jjajang Ramen · Grape Ade.
  이름 그대로 있음 43건 / **이름만 다른 것 16건**(Family Set 1~3 = K-Fire·K-Fry Delight·Veggie Lover,
  `ALA CARTE -` 접두사 8건, Beef Miyeokguk, Sausage Egg Fried Rice, Fried Rice Beef Bulgogi, Egg Veggie Ramen 등).
- 적용 스크립트(멱등, 드라이런 통과): `운영:/tmp/kd.js --apply` · 스냅샷 `운영:/var/www/backups/kdine-brand-snapshot-*.json`

**5. 문서/메모리**
- `DEVELOPMENT_PLAN.md` · `CHANGELOG.md` · `docs/RECIPE_MANAGEMENT_SYSTEM.md`
  (RecipesTab 이 BG 전용이라는 잘못된 서술 정정 + CSV 절 신설) · `docs/KDINE_MENU_AND_RECIPE_PLAN.md`(신규)
- 메모리 2건: [[reference_packaging_unit_is_pack]] · [[project_kdine_menu_pending_apply]]

### 다음 확정 작업
- **발주·재고 정합 개편** — **설계·판단·결정은 Fable** (Irene 2026-09-01: *"설계 및 판단은 fable이 할게"*)
  **단일 소스: `docs/PURCHASE_ORDER_SYSTEM.md` 맨 끝 "📌 다음 섹션 — 발주·재고 정합 개편" (총정리 완료)**
  그 문서에 ①발단 ②Irene 확정 모델 M1~M10(원문 인용) ③운영 실측 ④요구사항 A~E
  ⑤**Fable 결정 대기 Q1~Q7** ⑥규모·게이트 가 정리돼 있다. 여기서 재정리하지 말고 그 문서를 읽을 것.

  **핵심 사실 3줄**
  - GIT 이 팔아도 재고가 안 빠진다: 포장재 6품목이 레시피 없는 프로덕트인데 프로덕트 수량 0·`track_stock=0`.
    실제 18 pack 은 **따로 만든 재고아이템**에 있다 → 같은 물건이 둘로 갈라져 있다
  - **프로덕트/메뉴 저장 시 재고아이템이 생성되는 경로가 아예 없다** → 1:1 이 성립한 적 없음
  - 구매자→판매자 수령 알림 0곳 · `purchase_orders` 결제 컬럼 0개 · `cash_movements` 에 발주 참조 자리 없음

  **⛔ Opus 가 하지 말 것**: 결정·우선순위·착수순서 판단. Q1~Q7 은 **비워 둔 채** Fable 판정을 받는다.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **K-DINE 기존 메뉴 가격 변경** — Irene "나중에". 안전창 = 현지 **22:00~익일 09:00**(주문 0건 실측).
  같이 처리할 것: **가격 0원 메뉴 2건**(`Sundubu-jjigae (S)`, `Kimchi-jjigae (S)` — 현재 RM0.00),
  Potato Pancake 15.90→14.90
- **음료 조건부 가격** — "음식 주문 시 RM3/RM1" 은 시스템 미지원. 별도 메뉴 2줄 or 옵션. Irene 결정 필요
- **미정값** — 소시지 1줄 g · 밥 옵션 g · 모짜렐라 원가 · 해물 원가/구성 · 치킨강정 "6피스" g
- **운영서버 좀비 프로세스 정리** — 이전 세션들이 남긴 `node -e` 가 **17~47일째** 살아 있다
  (sequelize 풀 열어둔 채 `process.exit` 없이 종료). 메모리 상시 점유 → [[reference_prod_server_resource_constraint]]
- **재고 대시보드 "입고 예정" 표시** (8/31 확정분, 미착수) — `/restaurant/:id/inventory?tab=dashboard`
- **운영서버 OS 재부팅** — Irene "밤에 하자" 결정됨 (커널 6.8.0-134 → 138)
- 주문 알림 나머지 4종(죽은 토글) · 매장 기기 푸시 구독 1회

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
