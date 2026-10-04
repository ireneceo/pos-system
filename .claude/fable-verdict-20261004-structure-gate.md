# Fable 게이트 판정 2026-10-04 — K-DINE 구조 코드 묶음 + Docs/Download + 사이드바 Help + 단말기 설정 (SW 5.73)

작성: Fable(리더). 이 사안의 코드 묶음 게이트 **1회**(판정서 09-29 §6-13 · 지시서 10-04 §5-4). 근거 = 운영 배포 기준(1223a2975) 대비 diff 84파일 전수 읽기 + 내가 직접 돌린 게이트·테스트 + 운영 읽기 전용 SELECT 8건(쓰기 0).
범위 문서: `.claude/fable-verdict-20260929-structure.md` §6 항목 4~13 · `.claude/fable-instruction-20261004-brand-manager.md` · Irene 원문 2건(Docs/사이드바/Download · 단말기 주소 자동).

---

## 0. 판정 — **PASS (조건부)**

코드는 배포해도 된다. 조건은 §4(배포)·§5(데이터 단계)·§6(Irene 결정) 에 있다. 판정의 네 기둥:

| 기둥 | 결과 |
|---|---|
| ① diff 범위 대조 | 84파일 전부 세 근거(판정서 §6 · 지시서 A~N · Irene 원문 2건) 안. **설계 밖 변경 0.** 팀원이 스스로 더한 것 3건(§2)은 전부 설계 방향을 지키기 위한 것 — 수용 |
| ② 가드 스크립트 | 내가 재실행: `verify-all` **23/23** · `check-print-guard` 8/8 · `check-design-guard` 신규 0 · `check-migration-registry` 통과 · `i18n:verify` 통과 · `check-sensitive-diff` ①③⑤ 대상(=이 게이트) |
| ③ 실호출·회귀 | 내가 재실행: jest `user-contexts-switch` + `store-cost-base-quantity` **41/41** · health-check 전체(verify-all 안) 통과 · dev `/api/contents/public/docs` 200 · `/docs`·`/download` 200 · 서빙 sw.js = 소스 `5.73-brand-structure-docs-20261004` 일치. 팀원 보고(verify-all --full 24/24 · mount sweep 크래시 0 · 실호출 16/16 · e2e 3회×2폭 · 고장주입 5종)는 내 재실행과 모순 없음 |
| ④ 배포 안전성 | 마이그 2개 멱등·레지스트리 deploy·롤백 경로 주석 있음 · ENUM expand-only(`expandEnum`) · 운영 `contents.type` 현재 `('blog','faq')` → 배포 뒤 parity 검사는 마이그 **이후**(deploy 스크립트 :830)라 막히지 않음 · SW bump 있음 · 운영 다운로드 파일 2개 실존(HEAD 200) |

---

## 1. 내가 직접 확인한 것 (팀원 보고와 별개)

### 1-1 공급처 연결(돈 경로) — `ingredient_seller_products` 조회 전수 grep (routes·services·utils 55곳)
- 매장 구매자에 닿는 곳은 전부 `sellerLinkVisible / sellerLinkVisibleWhere / buyer NULL` 중 하나를 탄다: seller-sources GET/POST/PUT/DELETE · brand-ingredients include=sellers · inventory 연결표시 · 발주 제안(:456) · **발주 생성 매핑(:919·:930)** · 대조 `cost-changes` · supplier-catalog 「이미 담음」 · catalog preview/bulk · poAmend · supplierShare · costSync.
- 안 바꾼 곳은 전부 매장 경로가 아니다: `purchase-orders-crud.js:831·871`(프로덕트·BG 재고아이템 라인 — 판정서가 지목한 823·863 은 이 둘이고 매장 `ingredient_id` 경로가 아니다) · `stock-ledger.js:166·319`(BG 이관) · `:673`(coverage, 매장 소유 행만) · `product-ingredients.js`·`sellerProductIdentity.js`·`orderFulfillment.js`(id 기준).
- 비차단 1건: `purchase-orders-crud.js:1305`(PUT 발주 품목 교체)가 클라이언트가 준 매핑 id 를 가시성 검사 없이 **단위 스냅샷에만** 쓴다 — 단가는 raw 에서 오고, 배포 전에도 같았다(회귀 아님). 후속.
- 「선호 1개」 범위를 `buyer_restaurant_id` 로 잘라 매장이 자기 연결을 선호로 해도 형제 매장의 공용 선호가 안 바뀜 — 맞다.
- `costSync.recomputeUnitCost` 가 공용 연결만 보게 한 것(팀원 추가) — **맞다.** 안 했으면 매장 거래처 가격이 브랜드 `unit_cost` 를 덮어 형제 매장 원가가 바뀐다.

### 1-2 GIT 출처 연결 자동(D3′)
- 프로덕트 출처 거울 **생성 경로는 `routes/recipes.js:49~60` 하나**다(grep). `syncProductMirrors` 는 「갱신만, 절대 생성 안 함」(F5) 이라 연결 보장이 필요 없다 — 판정서 §6-7 이 둘 다 지목했지만 생성은 한 곳이 맞다. 재활성 분기 뒤에도 `ensureSourceSellerLink` 가 돌아 꺼졌다 켜진 거울도 연결을 갖는다. 환산 = 거울 `base_quantity`(§2-2 다섯 칸) ✓.

### 1-3 원가 E
- 쓰는 손 3개(수령·대조·만들기) `× base_quantity` ✓ · 읽는 쪽 `product-recipe.js` 6곳 `÷ base_quantity` ✓ · `recipes.js:627` 는 이미 `÷ baseQty` 라 변경 0 ✓ · 화면 `costPerBaseText` 「RM 27.90 / 1000 g · g 당 RM 0.0279」 ✓ · 수동 입력 칸 옆 「/ 1000 g」 라벨 ✓.
- **판정서 §1-4 E 의 가정 하나가 틀렸다 — 내 실측으로 정정한다.** 「매장 소유 행은 base_quantity=1 이라 무영향」 이라 썼는데, 운영 읽기: **매장 소유 활성 재료 중 `base_quantity ≠ 1` 이고 `unit_cost > 0` 인 행 112, 그중 발주 수령 이력이 있는 행 41.** `writeStoreCost` 는 매장 소유 행이면 재료 행 `unit_cost` 에 직접 쓰므로(D-5) 이 41행의 값은 옛 규칙(취급단위 1 가격)으로 앉아 있을 수 있고, 레시피 원가(÷bq)는 그만큼 작게 나왔다. **코드는 맞다**(앞으로는 기준양 가격). **데이터 정정 ⑦ 의 범위가 오버레이에서 이 41행까지 넓어진다** → §5.

### 1-4 브랜드 관리자(보안 경계)
- 고친 판정처 정확히 둘(브랜드 메뉴 3파일 `assertBrandOwnership` → `userCanManageBrand` · `recipeAuth.isBrandManager` → `brandIdsForUser`) ✓. `requireBGScope` 본문·`bgOwnerId` 무접촉 ✓. `isSysAdmin` 은 brandScope.js:20 에 있음 ✓.
- `brandIdsForUser` 에서 role=BM 이면 소유 조회 생략 — 모자=교체(FI-12 가 증명) ✓. **운영 전제 §6-A 를 내가 읽었다: 소유자 역할이 BM 인 브랜드 0건 ✓ · 브랜드 2 owner_id=23 ✓ · `user_contexts` 브랜드 행 0 ✓.**
- 부여 라우트는 SA 전용 유지 · 모자 검증 JOIN 표명은 상수 맵에서만 옴(주입 0) · `validateGrantedContext` 공유라 소켓 변경 0(⑧-9 증명) ✓.
- 지시서 ⑧-6 이탈(매장 38 → 403 기대) — **내 지시가 틀렸다.** 38 은 브랜드 17 소속이라 BM 이 브랜드 경로로 여는 것이 설계상 맞다(`requireRestaurantScope`). 팀원 수정(38=200 브랜드 경로 · 브랜드 밖 18=403) 수용. 「교체」 는 ③(매장 스칼라 null)·FI-12 로 충분히 증명됐다.
- 운영 사실 1건(§6 결정 필요): **운영 user 11 은 irene@ 가 아니다** — `kdine-brand@gitconsulting.group` · Brand General · brand_id=1. user 19 = `kate.kim.snkn@gmail.com` · RA · 매장 8. 지시서 §6 이 「user 11(irene@)」 라 쓴 것은 09-29 판정서의 추정을 그대로 옮긴 것. 부여 대상은 **이메일로** 다시 확정해야 한다.

### 1-5 Docs / Download / 사이드바(🔒 MainLayout)
- 공개 라우트 2개(`/public/docs` 목차 · `/public/docs/:slug`)는 `status='published'` 만, `type` 은 클로저 상수(사용자 입력 아님), 쓰기 라우트는 SA 전용 그대로 ✓. 본문은 SA 가 쓴 HTML 을 블로그와 같은 신뢰 경계로 렌더 ✓.
- **MainLayout.tsx**: diff 의 +/- 줄에 print·poll·qz·kitchen·autoPrint·`_printPollFn` 일치 **0**(내 grep). 변경은 import 1줄(아이콘) + 푸터 버튼 블록 2곳(레일·펼침)만. Irene 명시 요청. → `--bless` 수용. 이 파일은 공유 보호파일이라 「인쇄 변경이 아닌 승인된 UI 변경」 으로 bless 하는 것이 맞다.
- `/docs`·`/download` 를 `seoPages.js` 에 넣지 않은 것 — **맞다**(SEO 규칙: 운영 nginx 변경은 승인 뒤). verify-all 「마케팅 주소 목록」 게이트 통과.
- 다운로드 파일 `/desktop/PurplePOS.apk`·`PurplePOS-Setup.exe` dev·운영 모두 실존(HEAD 200) ✓.

### 1-6 단말기 설정 화면
- 화면 열 때 1회: 저장 주소로 echo → 실패면 같은 와이파이에서 찾아 **1대일 때만** 저장(`set(host, true)`), 여러 대면 고르게 함, 브릿지 없는 브라우저는 아무 것도 안 함 ✓. ref 로 1회 보장 · `enabled` 가 꺼져 있으면 안 돈다 ✓. 결제 때 하는 일(`terminalSale.ts roundTrip`)과 같은 규칙 — 새 경로가 아니다.
- 비차단: 브릿지 기기에서 화면을 열 때마다 echo 거래 1행이 생긴다(수동 테스트와 같은 행). 양은 작다.
- **실제 태블릿 확인은 못 했다**(팀원도 나도) → §4 배포 뒤 확인 항목.

### 1-7 adopt 스크립트(`--refresh`·`--lock`·undo)
- 모델을 `models/index` 로 읽게 고친 것 — **운영 매장 8 옵션그룹 미러가 전부 NULL 이던 원인**이다(모델 직접 require → `brand_menu_option_group_id` 칸 없음 → update 가 조용히 버림). 09-13 `--options` 가 실제로는 반쯤 실패했던 것. 데이터 단계 ④ 가 이 칸을 채운다.
- refresh: 매장 쪽 값 변경 0(연결 칸·미러 칸만) · 공유 메뉴는 건너뛰고 경고 · 세트 역변환 · 스냅샷·undo ✓. lock: 잠금 5칸+auto+version+1 → 그 매장 sync 1회(트랜잭션 1개) · undo 가 매장 상품 전체 행을 복원 ✓. dev 데모 왕복(매장 값 변화 0 · 옵션 중복 0) 팀원 보고와 코드가 일치.
- 운영 미리보기에서 봐야 할 것(§5): 매장 8 옵션그룹 12개 중 **「111111」·「Add Cheese 」(뒤 공백)·「Add Cheese」** — 상품이 쓰면 브랜드에 그대로 생긴다(이름 중복 경고가 뜨게 돼 있음). 안 쓰면 `unused-skip`.

### 1-8 인스펙션·health-check(안전망 자체 변경 — 근거 확인)
- ING-UNI-031/032/033 비차단 목록. 033 에 「프로덕트가 그 Stock Item 을 직접 가리키면 정상」 제외 — **맞다**(TRADE_STRUCTURE §2-1 재고아이템 다이렉트 = 사서 되파는 물건). 그 결과 운영 033=0 이고, 315/319(이름이 상품과 다름)는 기계가 못 가른다 → D2′ 표의 사람 몫(판정서가 이미 그렇게 썼다).
- UC-002 허용 조합에 brand×BM 추가 · UC-004 고아 브랜드 모자 신설 ✓. health-check 「매장 쓰기 403」 → 새 계약(자기 연결 201·buyer=매장 · 공용 PUT 403) 으로 교체 — 계약이 바뀐 것이니 테스트가 바뀌는 게 맞다. 쓰기 2행은 finally 로 정리.

---

## 2. 팀원이 설계 밖에서 스스로 정한 것 — 전부 수용
1. `costSync` 공용 연결만(§1-1) — 필요했다.
2. ING-UNI-033 다이렉트 재고 제외(§1-8) — 거짓 양성 57건을 걷어낸 것.
3. adopt 스크립트 `require('../models')` 전환(§1-7) — 실제 결함 수정.
4. ⑧-6 테스트 재작성(§1-4) — 내 지시의 전제가 틀렸다.
5. 브랜드 메뉴 POST 가 manual 에서도 범위 매장에 상품을 만드는 것 — 기존 동작, 무접촉이 맞다(이번 범위 밖).

---

## 3. 비차단 메모(고치지 않는다 · 후속)
- `purchase-orders-crud.js:1305` 매핑 id 가시성(§1-1).
- 화면이 「내 연결 / 공용 연결」 을 구분해 그리지 않는다(`buyer_restaurant_id` 프론트 참조 0) — 매장이 공용 연결을 고치려 하면 서버 403 문구만 뜬다. 후속 UI.
- `Content.js` 주석 「blog or faq」 낡음.
- 단말기 화면 echo 거래 1행/열기(§1-6).
- 지시서 §7 알려진 한계(BM 아래 BG 사용자 소유 카탈로그 안 보임 · brands-plans BM 허용) — 그대로 사실.

---

## 4. 배포 조건 (Irene `/배포` 시)
1. 표준 게이트 그대로(백업 · 마이그 레지스트리 2건 자동 · parity 사후 검사 · SW 5.73). `--skip-safety` 불필요.
2. 배포 뒤 확인(팀원 실행 · 운영 쓰기 0):
   - `GET /api/contents/public/docs?lang=en` 200(sections 비어 있음이 정상) · `/docs`·`/download` 200 · 운영 sw.js 5.73.
   - 운영 `contents.type`·`content_categories.type` ENUM 에 `docs` 있음 · `ingredient_seller_products.buyer_restaurant_id` 칸 있음.
   - **회귀 1건 반드시**: 브랜드 2 소유자(user 23, help@) 토큰으로 `/api/brand-menus?brand_id=2` 200(판정처 교체 뒤 소유자가 여전히 열리는지).
   - 매장 8 재료 화면: 브랜드 재료 행에 공급업체 연결 버튼이 보이고, K-소스 브랜드 원가가 「RM 34.90 / 1000 g · g 당 0.0349」 로 읽힘. **매장 My Cost(오버레이 0.0279)는 데이터 ⑦ 전까지 「RM 0.0279 / 1000 g」 로 틀리게 보인다 — 예정된 상태**(Irene 에게 미리 말할 것).
3. **단말기 설정 자동 확인은 운영 계산대 태블릿(브릿지)에서 1회 눈 확인** — 화면 열면 「✓ 같은 와이파이」 또는 「다시 찾음」 이 뜨는지. 못 보면 「확인 불가」 로 남긴다.
4. 사람 규칙(판정서 §3-0) 계속: 데이터 단계 끝까지 브랜드 push/저장 · 매장 sync/sync-all 누르지 않기.

## 5. 데이터 단계 조건 (배포 뒤 · 현지 22:00~09:00 · 단계별 드라이런 표 → Irene 승인 → 트랜잭션 → 같은 검사 SQL 재실행)
순서는 판정서 §3-2 ①~⑧ 그대로. 아래만 **추가·정정**:
- **(0) 브랜드 관리자 부여를 `--lock` 보다 먼저**(지시서 §6) — 단, 대상 계정은 **이메일로 재확정**(§6-2). 사전 읽기는 내가 끝냈다: BM 소유 브랜드 0 · 브랜드 2 owner 23.
- **① refresh 미리보기에서 볼 것**: 「한 브랜드 메뉴를 여러 상품이 공유」 경고 0인지(있으면 `--fix-shared` 먼저) · 옵션그룹 「111111」·「Add Cheese 」 가 `create` 로 뜨면 반영 전에 매장에서 정리(§6-3) · 「세트 구성품 중 연결 없는 상품」 경고 수.
- **⑦ 원가 정정 범위 확장**: 오버레이 `base_quantity ≠ 1` 행(비율표로 1 근처만 ×bq) **+ 매장 소유 활성 재료 중 `base_quantity ≠ 1` 이고 발주 수령 이력이 있는 41행** — 각 행 「현재 unit_cost ÷ (최근 수령 price/conv)」 비율표를 먼저 뽑아, 비율 ≈1(옛 규칙으로 쓰인 행)만 `× base_quantity`. ≈bq(이미 기준양 가격, 사람이 넣은 값)는 건드리지 않는다. 매장 10 의 매장 소유 오버레이 행(storeCost 가 읽지 않는 유령 행)은 **정정이 아니라 목록만** — 읽는 코드가 없어 값이 어디에도 안 들어간다.
- **⑧ 재검사**: ING-UNI-031(운영 28→0) · 032(77→0) · 033(0 유지) · UC-002/004 0.

## 6. Irene 결정 요청 (각각 Fable 권고 첨부)
| # | 결정 | 권고 |
|---|---|---|
| 1 | 이 묶음 운영 배포(SW 5.73) | **승인 권고.** §4 조건으로. |
| 2 | 브랜드 관리자(K-DINE 브랜드 2) 부여 대상 | 운영 **user 11 은 irene@ 가 아니라 `kdine-brand@gitconsulting.group`(브랜드 1 소유자 계정)** 이다. 권고: 부여 대상을 **이메일로 지정**해 주시면(Irene 본인 계정 + 매장 8 관리자 `kate.kim.snkn@gmail.com`), SA 화면에서 부여한다. `kdine-brand@` 에도 줄지는 Irene 판단 — 그 계정은 지금 브랜드 1 의 BG 라, 모자를 쓰면 그 아래에서는 브랜드 2 만 보인다(교체). |
| 3 | 매장 8 옵션그룹 「111111」·「Add Cheese 」(뒤 공백) | refresh 미리보기에서 상품이 쓰는 것으로 뜨면 **반영 전에 매장 화면에서 삭제/이름 정리** 권고(안 쓰면 자동으로 건너뜀 — 결정 불필요). |
| 4 | `/docs`·`/download` 를 검색 노출 목록(seoPages+운영 nginx)에 넣기 | **지금은 보류 권고.** Docs 글이 0건이라 노출 가치가 없고 운영 nginx 변경이 필요하다. 글이 몇 편 쌓이면 SEO 절차(`/SEO점검`)로 별건. |
| 5 | 원가 ⑦ 범위 확장(§5) | 보고. 선택지 없음 — 표를 보고 승인만. |

---

## 7. 마커
`node dev-backend/scripts/fable-gate.js pass` — 이 문서 저장 직후 찍는다(지문에 이 파일이 포함되므로 순서 고정). 이후 `session-state.md` 외 수정 금지 — 한 줄이라도 바뀌면 마커가 죽고 다시 게이트다.
