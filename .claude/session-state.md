## 현재 작업 상태
**마지막 업데이트:** 2026-09-07 07:05 UTC
**버전:** SW `4.86-brand-revenue-dedupe-20260907` — 개발서버 반영 완료, **운영 미배포**
**작업 상태:** dev 구현·검증 완료 — `verify-all --full` **18/18** · health-check **221/221** · Fable 게이트 마커 **유효**
**대기:** Irene `/배포` 지시. 운영 DB 는 이번 세션에서 **아무것도 바뀌지 않았습니다**(읽기 전용 실측 + 미리보기만)

### 배포 시 순서 (고정)
1. `/배포` — 코드 배포(SW 4.86, 마이그 `migrate-brand-performance-stores-route.js` 자동 실행)
2. 운영 DB 백업 확인
3. `node scripts/migrate-dedupe-2026-09.js` (미리보기) → 출력 대조
4. `node scripts/migrate-dedupe-2026-09.js --rehearse` (쓰고 롤백)
5. `node scripts/migrate-dedupe-2026-09.js --apply`
6. `node scripts/migrate-dedupe-2026-09.js --deactivate 95,96,97,102,352,92,337,442,445,440 --apply`
7. 운영 인스펙션 ING-UNI-022·023 확인

### 이전 세션 (2026-09-06, SW 4.85 · 운영 배포 3회 완주)

---

## 완료된 작업 (2026-09-06 세션)

### ① 메일 반송 근절 — 커밋 `2e879df10` (14:51 배포)
발단: Irene 신고 — `demo-brand@purplehere.com` 로 "Address not found" 반송 반복.

**원인(Fable 확정)**: 관문이 아니라 **거짓 데이터**. 그 계정은 메일함이 없어 인증 링크를 누른 적이 없는데 `email_verified=1` 이 박혀 있었다. "인증 안 했으면 발송 안 한다" 기준은 코드에 멀쩡했고 플래그가 배신했다. 2026-09-04 데모 차단은 `emailService` 한쪽에만 들어가 알림 경로(`notificationService`, 라우트 37곳)는 그대로 샜다.
⛔ 거짓 플래그 위에 데모 관문을 더 얹는 안은 **증상 패치로 기각**.

적용: `migrate-demo-accounts-unverified.js`(신규·멱등·deploy 등록) · 시드 4곳 `email_verified:false` · `skip_verification` 뒷문 폐쇄 · Supplier Staff `trusted` 폐쇄(+인증메일).

### ② 배포 침묵 결함 + 잔여 정리 — 커밋 `7be034d36` (15:49 배포)
**배포가 두 번 연속 아무 말 없이 죽었다.** `deploy-to-production.sh:11 set -e` 아래에서 `SPRINT_OUTPUT=$(ssh … node $MIG)` 가 마이그 종료코드를 그대로 가져 **그 줄에서 스크립트가 끝났다** — 아래 "실패 출력 25줄" 블록은 **도달 불가**였다. 사유는 운영에서 마이그를 직접 돌려서야 알았다.
진짜 실패 원인: `migrate-package-unit-2-converge.js` 가 운영 ing#970(매장 10 Cockle Meat) 매핑 3건의 `unit_conversion=250,000`(오염값)에 ratio 500 을 곱해 **1.25e8 → DECIMAL(10,4) 초과** → 롤백. **한 매장 오염 행이 전 매장 배포를 세웠다.**

적용: `|| SPRINT_EXIT=$?`(set -e 면제) · 마이그 출력 성공·실패 무관 `logs/deploy-<ts>/` 보존 + 성공 3줄 인라인 · 곱셈 전 검산(매핑·**레시피 줄·재고**) 후 범위 초과면 사람 몫 강등(컬럼 확대·클램프 금지) · **리뷰 행 무접촉**(`unitChanged && !plan.review`) · 채번 잔여 7곳 원자 카운터 이관(인보이스 형식 보존 위해 `separator` 옵션 신설) · 달력 실브라우저 spec · rsync `--exclude 'logs/'` · heavy-task-gate build 분기.

### ③ 안정화 묶음 — 커밋 `36be463d5` (19:22 배포, SW 4.85)
Irene "다 잡아줘. 안정적인 솔루션 서비스로 거듭나게."

- **Brand Manager 접근**(진짜 고장) — `owner_id` 로 찾아 항상 0건/403 이던 것을 형제 판정식(`user.brand_id`)으로. `brands-core.js` `GET /` `GET /:id` + `middleware/brandScope.js`.
- **돈 경계** — `GET /api/brands` 는 Brand 행 통째(결제·은행·구독)를 내려준다 → BM 에게는 **allowlist 투영**(`BM_BRAND_FIELDS`). exclude 아님 = 컬럼이 늘어도 안 샘. `payment-settings` 403 유지(의도).
- **결제설정 메뉴 숨김** — 프론트 가드는 **세 겹**이고 사이드바는 `useAllowedRoutes` 가 정한다. 거부 목록을 `utils/roleRouteDeny.ts` 한 파일로 모아 두 겹이 같이 읽게 함.
- **그림자 라우트 5개 삭제** — 승자를 잠깐 치우니 그림자가 200 응답(되살아나는 위험 실증). 라우트 1144 → 1139, 중복 6종 → 1종(남은 1개는 인쇄 보호파일이라 보류).
- **도달 불가 화면 2개 삭제** — 기계 판정 도달 역할 0.
- **매장 재료 다섯 칸** — 화면 2칸 + **서버가 두 칸을 아예 안 받던 것**까지. `base_quantity` 0·음수 서버 400.
- **미연결 상품 관측** — 인스펙션 `R-SC-020`(warn, 비차단).

**Fable 판정**: 활성 상품 751 중 **687 미연결(91%)** 은 코드 결함이 아니라 **미입력 데이터**. 이름으로 자동 연결 가능한 것은 운영 전체 **2건**. `track_stock` 은 2026-09-01 에 로직에서 제거된 잔재라 "거짓말하는 스위치" 아님(내 관찰 기각됨).

### ④ 운영검증 (배포 후, 실매장 무접촉)
데모 매장 13 에서 **주문 → 결제 → 인쇄대기 → 빌** 전 단계 실호출: 메뉴 200 · 주문 201 · **인쇄 대기열에 올라감 확인** · 결제(현금 기록) 201 · `payment_status=completed` · 빌 200. **정리 후 잔재 0**(주문·결제·인쇄대기).
이번 배포분 API 8건: BM 4건(민감키 누출 0 · 남의 브랜드 403 · 결제설정 403) · 복구한 `brand-ingredients` 200 · BG 회귀 없음(44개 키 유지) · 익명 401.
**종이 출력은 확인 안 함** — 이번 배포가 인쇄 코드를 안 건드려(보호파일 8/8 무변경) 요청하지 않음.

---

## 작업 규칙 변경 (2026-09-06 Irene 지시 · CLAUDE.md 반영)

1. **Fable 호출 = 3축 판정** — `(파급 크다 OR 비가역) AND 길이 갈린다` 일 때만. 한 사안당 2회(설계 1 + 게이트 1), **구현 중 세부 되묻기 금지**. 조사·재현·실측은 언제나 팀원 몫. 메모리 [[feedback_fable_call_criteria]].
2. **프론트 검증 순서 — 빌드 1회 · sweep 1회** — 코드 확정 → 빌드 1회 → `verify-all --full` 1회. mount sweep 은 번들이 바뀌면 11분 재소요. 중간 검증은 빌드 없는 게이트로만. 메모리 [[feedback_frontend_build_once]].

## 재발 방지로 넣은 기계 검사
- health-check 회귀 2건 — 마이그 루프 `set -e` 삼킴 금지 / **라우트 거부목록이 진입·사이드바 두 겹에 모두 적용**(import·실제 호출·`skipFiltering` 앞 순서·사본 재생성 금지). 반증 3/3.
- e2e 2건 — 달력 월 라벨(UTC 뒤진 존에서만 밀림) · 사이드바 역할 거부(**BG 대조군 필수**).
- `heavy-task-gate` build 분기에 `heavy_node_running()` — PlanQ 빌드 겹침(오늘 실제로 2번 막았다).
- 배포 rsync `--exclude 'logs/'` — 운영 감사 로그 삭제 방지.

---

## 이번 세션에 내가 저지른 것 (감추지 않고 기록)
- 1차 배포를 `| tail` 로 실행해 **전체 로그와 진짜 종료코드를 잃었다**(exit 0 으로 보임).
- "메모리 부족으로 죽은 듯" **오진** → 재현에서 메모리 정상인데 같은 자리에서 죽어 철회.
- 그림자 삭제를 **줄 번호로 잘라** 살아 있는 `GET /restaurants/:id/brand-ingredients` 까지 삭제(health-check 계약이 잡음, 복구). **지울 때는 라우트를 하나씩 확인할 것.**
- 인쇄 보호파일(`MainLayout.tsx`)을 인쇄 무관 작업으로 수정 → print-guard 가 잡아 되돌림.
- **공허한 통과 3회** — 달력 spec(시간대 방향) · 사이드바 spec(접힌 메뉴, BG 대조군이 잡음) · 운영 BG 회귀 판정(빈 결과를 회귀로 오독).
- 게이트 제출물에 `CLAUDE.md` 변경을 빠뜨림 → 다음부터 `git status --short` 전체 첨부.
- 운영 점검 스크립트가 13분 멈춤 · API 경로 2회 오류(404)로 재실행.
- **가드는 한 가지 방법으로만 깨뜨려 보면 부족하다** — 내가 만든 거부목록 검사를 "줄 삭제"로만 반증했는데, Fable 이 "주석 처리"로 깨뜨리니 통과했다(Fable 이 직접 보수).

---

## 진행 중인 작업
- 없음

## 개발서버 반영 · 배포 대기 (2026-09-07)
### 브랜드 성과 화면 기간 필터에 오늘/어제 추가
Irene 지시: "브랜드제너럴 performance 필터에 오늘, 어제도 넣어줘. 레스토랑관리자 라이브오더처럼."
- 변경 1파일 — `dev-frontend/src/pages/BrandGeneral/BrandPerformance.tsx`
  ① 공용 `DatePeriodFilter` 에 `includeToday` 전달(오늘·어제 버튼 노출 — LiveOrders 와 같은 방식)
  ② `calculatePeriodDateRange(period, storeTimeZone)` — 매장 설정 타임존 기준(CLAUDE.md 타임존 규칙). 종전엔 인자 없이 호출해 브라우저 로컬이었음
  ③ 기간 라벨 맵에 `yesterday: 'Yesterday'` (없으면 화면에 원문 'yesterday' 노출)
- 공용 컴포넌트는 **무변경** — 오늘/어제는 이미 `PeriodType` 에 있었고 이 화면만 안 켜고 있었다.
- 검증: build 경고 0(변경파일) · `verify-all --full` **17/18** · 실브라우저에서 버튼 6개 렌더 · Today/Yesterday/Month 클릭 시 라벨과 선택색(#635BFF) 정확히 전환 · pageerror 0 · 하루창 API 실호출이 날짜별로 4/0/4/5/0 로 판별됨 · 익명 401
- 미통과 1건 = `deploy-ready`(릴리즈 기록 파일 없음 + SW 버전 미상승) — **배포 시점 항목**, 코드 결함 아님
- **운영 미배포** (Irene `/배포` 지시 대기)
- 참고: dev 에서 BG 계정에 보이는 매장이 1곳(24번, 주문 0건)이라 dev 화면 숫자는 전부 0 이다 — 개발 시드 데이터 상태이지 필터 문제가 아님

### 오염값·중복 정리 (2026-09-07) — dev 구현 완료 · Fable 게이트 판정 중
Irene 승인: "승인해. 파악한 대로 추천대로 해. 요일 특가 유지 당연히 하고 중복 빼는 거 연결고리 없어서 문제 없으면 그렇게 해"
- 신규 `dev-backend/scripts/survey-dirty-data.js` (읽기 전용 실측) · `scripts/migrate-dedupe-2026-09.js` (레지스트리 manual, 기본 미리보기, --apply/--rehearse)
- 인스펙션 3건 추가(ING-UNI-022·023·024) + **고장주입 3/3 반증**
- `docs/DATA_CLEANUP_2026-09.md` — 사람이 채울 목록 A~F, 운영 데이터로 생성
- 운영 미리보기: 매핑 36줄 삭제 · 재료 7쌍 병합 · **K-Gochujang 1쌍 정지**(재고 이력) · 코드 16건 재번호
- dev `--rehearse`(쓰고 롤백) + `--apply` 통과. 레시피 줄 불변·고아 증가 0
- **내가 만들었다 고친 결함 (Fable 게이트가 1건 반려)**
  ① 🔴 **`ING_REFS` 에 남의 테이블 2개를 넣었다** — `product_recipe_ingredients.ingredient_id` 와
     `brand_product_option_ingredients.ingredient_id` 는 이름만 ingredient 이고 실제 FK 는
     **`product_ingredients`(재고아이템)** 다(`information_schema` 실측). 그대로 돌렸으면 재료 병합이
     **브랜드 프로덕트레시피 4줄**(운영 실측)을 엉뚱한 재고아이템으로 덮어썼고, 줄 수·고아 가드가 전부 통과했다.
     Fable 이 잡았다. → 두 테이블 제거. **목록의 근거는 컬럼 이름이 아니라 FK 실측이다.**
  ② 위 ①의 파생 — 내가 보고한 "운영에 이미 고아 48줄"과 "K-소스 옛 줄이 프로덕트레시피를 물고 있다"는
     **잘못된 조인으로 센 허수**였다. 정정함.
  ③ 재번호 seed 를 count+1 로 계산 → 9/6 에 고친 "지운 번호 재사용" 결함 재도입할 뻔 → 공용 generateCode 로 교체
  ④ 고아 가드를 절대값 0 으로 둠 → 증분 비교로 수정(①ndash;② 정정 후 조항 자체가 축소됨)
  ⑤ 종료 가드를 APPLY 조건 없이 넣어 미리보기가 통째로 실패 → APPLY 일 때만 검사
  ⑥ `set_items` 가 JSON 컬럼인데 `<> '[]'` 문자열 비교로 조회 → 11개 전부 "세트 있음"으로 오독. 실제는 전부 비어 있음
  ⑦ 상품 중복을 매장 **이름**으로 묶어 136건으로 오보 → The Fire 3지점 때문. 매장 id 로 고쳐 10건
- 운영 `--apply` 는 `/배포` 지시 때 (채번 코드 배포 → 백업 → 미리보기 대조 → apply 순서 고정)

### 🔴 발견 — 수령된 발주 14건 전부 거래 인보이스 미발행 (운영, 합계 RM 4,020.57)
원인 확정: `routes/purchase-orders-workflow.js` **`mark-received`(623줄)가 `createTradeInvoice` 를 부르지 않는다.** `/receive`(1042줄)만 부른다. 매장이 쓰는 경로는 mark-received 였다.
연쇄: 거래 인보이스 0 → SOA 는 기존 인보이스를 묶는 구조(`soaScheduler.js:114 no_invoices`)라 SOA 도 0 → **BG 매출 기록이 통째로 비어 있음**.
⛔ Fable 지시로 **수정은 하지 않음**(이번 범위 밖, 사실만 보고).

### 브랜드 리포트/퍼포먼스 재구성 (2026-09-07) — dev 구현 완료
Irene: "리포트는 브랜드제너럴이 파는 프로덕트랑 구독판매 또는 개별판매(인보이스)랑 연결해줘" · "모두 개발하고 검증해. 나한테 뭐 묻지마."
- **`/pos/brand/general/reports` = 브랜드 자기 매출**(신규 `BrandRevenueReportPage.tsx`). 진실원장 = 브랜드 발행 인보이스. 세 묶음(trade / brand_plan / 나머지) × 청구·수금·미수. **`soa` 는 이중집계라 제외**
- **매장 판매 6탭 → `/pos/brand/general/performance/stores`** (BrandReportsPage 내부 로직 무변경). 사이드바 Performance 를 그룹으로
- 백엔드 신규 `routes/brand-revenue.js` — 범위는 `requireBrandScope` 만 신뢰(쿼리 brand_id 불신)
- 허용목록 마이그 `migrate-brand-performance-stores-route.js`(deploy 등록, **덧붙이기만**) — `isRouteAllowed` 는 정확일치라 하위 경로 자동 허용이 없다
- i18n 4언어 17키 · health-check 3건 추가(익명 401 / 돈 경계 / 이중집계)
- **인쇄 가드 bless** — 사이드바는 MainLayout 에만 있는데 가드가 파일 전체를 해시한다(`block` 은 메시지 힌트일 뿐). `_printPollFn` 블록 sha256 동일·인쇄 단어 변경 0·다른 보호파일 7개 무변경을 증명하고 기준 갱신. **Fable 승인**(앞선 "블록만 대상" 발언은 Fable 이 정정)

**내가 저지른 것**
- `require('../models')` 가 `sequelize` 를 안 내보내는데 `sequelize.escape` 를 써서 기간 필터가 **500**. 실브라우저 검증이 잡았다(직접 API 테스트는 파라미터를 안 줘서 못 잡음) → 원시 SQL 제거, `Op.or` 로 교체
- **"옛 경로 링크 0건"이 오보** — 실제 5곳(BrandGeneralDashboard · BrandManagerDashboard ×2 · RestaurantsPage ×2). Fable 이 잡음. 전부 재지정
- **돈 경계 health-check 가 헛통과** — 기준을 자기 API 응답으로 잡아, 범위 필터를 제거해도 기준이 같이 새서 통과했다. DB 소유 브랜드로 기준을 독립화한 뒤 반증 성공(PASS→FAIL→PASS)

## 다음 확정 작업
- 없음 — `/배포` 지시 대기

## 사람 몫 (Irene 이 화면에서 하실 일)
- **매장 10 `Cockle Meat(Blood Clam)`** 공급업체 매핑 `1팩 = 250,000팩` **3건 + PI-144 매핑 199** — 오염값, 화면에서 정정 필요
- **레시피 입력 687건** — 코드로 자동 연결 불가(이름 일치 2건). **K-DINE 부터 권고**(`docs/KDINE_MENU_AND_RECIPE_PLAN.md` 존재). 다른 매장(with MIN 223 · The Fire 126×3지점 · Seoul Garden 28) 일정은 Irene 결정
- **Brand Manager 소속 지정** — 활성 BM 4명 전원 `is_test=1`, 그중 3명은 `brand_id` NULL 이라 이번 수정으로도 화면이 안 채워짐
- 프로덕트 가격 0 인 소모품 20건 · 원가 출처 없는 재고아이템 5건 · `K-Bulgogi 1kg` 공유 켜기 · `Beef(Tenderized)`(ing#26 비활성) 쓰는 레시피 2개(#17·#237)
- 배포 후 확인 4가지: ①BM 계정으로 브랜드 메뉴 설정 탭·브랜드 관리 화면 ②BM 사이드바에 결제 설정 없는지 ③매장 재료 다섯 칸 저장·재조회 ④매장 재료·브랜드 재료 목록 정상

## 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **BM 접근 모델 나머지** — `brands-core.js` 인라인 소유권 검사 중 아직 안 본 곳. 넓히기 전에 `brands?owner=me` 호출부 전수 조사 필요(돈 경계)
- **가격변동 알림** — 설계 없음. 별건 Fable 설계 1회 필요
- **카탈로그 서버 검색** — 지금은 전량(상한 2,000)을 받아 브라우저에서 거름. 공급업체 최대 61건이라 급하지 않음
- `orders-crud.js` 그림자 라우트 1종 — 인쇄 보호파일이라 **다음 인쇄 작업 때 함께**
- 옛 중복 코드 백필 — Irene 지시로 안 함(체계만)
- 레시피 줄·재고 곱셈은 아직 사전 검산 없음(컬럼 거부 시 사유는 보임)
- 매장(RA) 화면 다섯 칸의 **다른 진입점**들 — 이번엔 `RecipeManagement/IngredientsTab` 하나만 했음
- 배포 전 게이트가 **개발 DB 로만** 전수 실행 — 운영 데이터에만 있는 조합은 여전히 못 잡는다(오늘 converge 가 그 사례)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
