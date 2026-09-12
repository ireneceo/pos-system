## 현재 작업 상태
**마지막 업데이트:** 2026-09-11 (16:29 UTC 운영 배포 #3 이후 /저장)
**버전:** 변경 없음 (오늘 배포 3회 모두 버전 미상승 — 올릴지 Irene 결정 대기, 아래 «하실 일» 6번)
**운영:** 번들 `main.a3373f8b.js` · SW `5.10-reconcile-honest-read-20260911` · 백업 `/var/www/backups/20260911_162405` · 배포 16:24~16:29 UTC · 스모크 10/10 · 마이그 87/87 · 배포 후 오류 로그 0
**작업 상태:** 완료 — 진행 중 작업 없음. 다음 확정 작업 없음(지시 대기).

---

## 👉 Irene 님이 하실 일 (Claude 가 대신 못 하는 것만 — 급한 순서)

> Claude 는 이 목록을 `/개발시작` 때 **그대로 안내**한다. 하나 끝내면 Claude 에게 «N번 했어»라고만 말하면 된다.

### 1번. 오늘 배포 두 건 운영 화면에서 눌러보기 — 약 10분
**SW 5.09 (발주 «용량 · 포장단위 × 수량»)**
1. 외부 공급업체 상품(예: 김치)에 «포장당 용량 10 · kg · 기준단위(포장) BOX» 저장 → 발주 담기 → Staging 에 «10 kg/BOX · × 3 BOX»
2. 같은 발주 WhatsApp/PDF 에 «(10 kg/BOX) 3 BOX»
3. 공급업체·브랜드 상품 폼에 «기준단위(포장)» 칸이 보이고 저장됨
4. 배포 전에 담은 발주는 예전 표시 그대로(용량 문구 없음)

**SW 5.10 (대조 정직 읽기 + 재고 환산)**
5. 운영 발주 32 대조 화면(purchase-orders/32/reconcile)이 노랑 «자동으로 읽지 못했습니다» · 고르기 목록 없음. 인쇄 인보이스(발주 33 TaiYang)는 초록 그대로
6. 재고 화면 → 재료 카드 → «Register on external supplier» 창에 «재고 환산» 칸 · «10 · kg · BOX» 적으면 «1 BOX = 10 kg» 자동
7. 그 상품으로 발주 3 BOX → 입고 → 재고 +30 kg
- **끝나면 Claude 에게**: «배포 확인했어» (이상하면 번호만)

### 2번. 운영 발주 32 손 수정 — 대조 화면에서 3줄 (손글씨라 자동으로 안 채워짐)
- Fable 이 원본을 눈으로 읽은 값: Chicken Chop L 단가 21.50 → **22.50** · Minced Chicken 단가 17.00 → **17.50** · Halal chicken 수량 2.00 → **2.2 kg**, 단가 12.30 → **13.00** · 머리 번호 **257506** · 날짜 **2026-09-08** · 합계 **RM 121.30**
- **끝나면**: «발주 32 고쳤어»

### 3번. 발주 22 의 인보이스 첨부 — ✅ 완료 (2026-09-11 17:1x UTC, Irene 선택 «3번 발주 22 첨부 지우기»)
- 운영 발주 22 의 `external_invoice_url/filename/uploaded_at` 3칸 NULL(ssh·운영 백엔드 계정, 현재값=백업 일치 확인 후 트랜잭션, 영향 1행). 미결제 · 청구서 136 연결 · 발주 32 첨부 무접촉. 파일 자체는 서버에 남음 · `updated_at` 은 raw SQL 이라 안 바뀜.
- 되돌리기 값: url `/uploads/attachments/2026-09/1789042465092_670192920b968a37_WhatsApp_Image_2026-09-08_at_12_07_32.jpeg` · filename `WhatsApp Image 2026-09-08 at 12.07.32.jpeg` · uploaded_at `2026-09-10T12:14:25Z`

### 4번. 운영 «piece» 대기 발주 2건 — 담기 화면에서 줄 지우고 다시 담기 (Fable 권고: 운영 DB 안 고침)
- with MIN Cafe(매장 10) · PO-R10-20260909-001(LSH 연유 1줄) · PO-R10-20260911-001(New Seoul Mart 10줄 중 9줄) — 배포 전에 담겨 단위가 piece 로 저장됨.
- 김치는 먼저 상품에 «10 · kg · BOX» 저장 후 다시 담기(1번 확인과 한 번에 끝남). Claude 가 운영 DB 로 고치길 원하면 «고쳐»(김치 제외 9줄).

### 5번. 발주 33 의 단위 확인 — 말로 «맞아/아니야»만
- kg 로 바꿀 것 7개: 방울토마토 · 당근 · 홍청양 · 무 · 대파 · 양파 · 미니적양파 / 새송이 → **팩** · 순두부 → **개** · 팽이 → 그대로
- **끝나면**: «발주 33 단위 그대로 고쳐» (다르면 어느 품목이 무슨 단위인지만)

### 6번. 결정만
- **버전 번호 올릴지**: 오늘 배포 3회, 버전 그대로. 올리면 릴리즈 노트·공지를 만든다. «올려» / «그대로».
- **나라별 날짜 형식 설정을 만들지**: «만들어» / «필요 없어».

### 7번. (급하지 않음 · 안전장치) 운영 DB «읽기만 되는» 계정 — 약 5분
- 운영 조회는 이미 배포 경로(ssh → 운영 백엔드 계정)로 **SELECT 만** 해서 된다. 그 계정은 쓰기 권한이 있어 약속에 기댄다 → 읽기 전용 계정은 **DB 가 실수를 막는 울타리**(Fable 2026-09-11).
- `/var/www/docs/PROD_READONLY_DB_SETUP.md` 순서대로. **끝나면**: «운영 DB 읽기 전용 계정 만들었어»
- 그전까지 규칙: 배포 경로 · SELECT 한 문장씩 · 보고에 «ssh·운영 백엔드 계정으로 읽음» · 쓰기는 Irene 명시 지시가 있을 때만.

### 8번. 운영서버 nginx 설정 폴더의 백업 파일 치우기 — 급하지 않음, 1분
- `ssh irene@87.106.78.146` 후: `sudo mkdir -p /etc/nginx/backups && sudo mv /etc/nginx/sites-enabled/purplehere.com.bak /etc/nginx/backups/ && sudo nginx -t && sudo systemctl reload nginx`
- 성공: `syntax is ok` · `test is successful`. **끝나면**: «nginx 백업 치웠어»

---

### 진행 중인 작업
- **(2026-09-12) 재고아이템 삭제 안내 — dev 구현·검증 중, 미배포.** Irene 「GGIT consulting 스톡아이템에서 Rice Cakes 가 중복이 있어서 지우려는데 안지워져 … 연결 끊고 지울건지 아니면 연결된 레시피 보러가기 할 수 있게 안내해줘야해 … 이 라이스케이크는 연결이 없는데 왜 안지워지는지 알려줘」 · 「fable 토큰 없어. 삭제할 수 없으면 그냥 그리로 보내서 확인하게 해.」 · 「연결 안되었는데 삭제 안되는 건 뭐야? 거울항목? 그걸 어쩌라고.」
  - **원인(운영 실측, 읽기만)**: GIT(브랜드 1 · owner user 23) Stock Items 에 «Rice Cake» 2행 — **137**(PI-132, 활성) · **327**(PI-307, 비활성). 둘 다 프로덕트 레시피 0 · 옵션 0. **327 은 거울 `ingredients` 29(브랜드 2 K-DINE with MIN)** 를 갖고, 그 거울이 **브랜드 레시피 5줄**(Tteokbokki 140g · Rose 40 · Ramen 55 · Jjajang Tteokbokki 140 · Jjajang Ramen 55)과 **매장 8 K-DINE IPC 재고 1행**에 쓰임 → 서버는 400 으로 막는데 **화면이 사유(객체)를 문장 자리에 넣어 «Delete Failed» 만** 보였다. 137 은 막을 조건 없음(발주 줄 0 · 재고이동 0 · 공급처 1은 SET NULL).
  - **구현(Fable 토큰 소진 → 팀원 판단)**: 서버 `routes/product-ingredients.js` DELETE 사유를 **한 형태로 통일** `error:{code:'IN_USE', message, uses[]}` — 프로덕트 레시피·**상품 옵션(신규 검사, FK NO ACTION 이라 전엔 500)**·거울의 브랜드 레시피/매장 재고/공급처 연결을 이름까지 실어 준다. 화면 `ProductIngredientsTab.tsx` 에 «쓰는 곳 + 보러가기» 안내창(공용 Modal) · 이동 `/pos/recipes?brandId=&search=` · `/pos/brand-product-recipes?search=` · `/pos/brand-products?search=` · `/restaurant/:rid/inventory` · i18n 11키 4언어. **«연결 끊고 삭제»는 만들지 않음**(남의 브랜드 레시피 줄을 지우는 비가역 변경 — 그 화면에서 하게 한다).
  - 검증: dev 재현 2경우 PASS(거울 레시피 · 상품 옵션) · 고장주입 1건 성립(거울 수집 제거 → uses 빈 채 FAIL, 원복 sha256 일치 후 재통과) · print-guard 8/8 · design 신규 0 · 죽은 핸들러 0 · i18n Errors 0 · 시험 잔재 0.
  - ⚠ **실브라우저 1차 FAIL → 원인 확정·수정**: 공용 `utils/api.js fetchAPI` 가 실패 응답을 `new Error(error.message || error.error …)` 로 바꿔 **본문을 버린다**. 사유가 객체(`error.uses`)라 «[object Object]» 만 남고 화면 안내 분기에 도달조차 못 했다(콘솔 «Failed to delete ingredient: Error: [object Object]»). 공용 헬퍼는 전 화면이 쓰므로 무접촉, **이 삭제 호출만 직접 fetch** 로 바꿔 400 본문을 읽게 함. 재빌드 진행 중.
  - 빌드: 1차 main.3d62d82f.js → (fetchAPI 수정) 재빌드 **main.9fc550bd.js**, 두 번 다 변경 파일 경고 0.
  - **실브라우저 PASS**(dev `/pos/brand-ingredients`, BG user 22): Delete → 안내창 «Still in use — cannot delete» · 항목 «Brand recipe / test_recipe / 다른 브랜드 사본» · «Open» → `/pos/recipes?brandId=17&search=test_recipe` 이동 · 화면 오류는 의도한 400 하나 · 픽스처 잔재 0 · 재고아이템 무사.
    - ⚠ 프로브 1차 오판: 판정이 `document.body.innerText` 를 1200자에서 잘라 읽어 모달을 놓침 → 모달 요소만 보도록 수정 후 PASS(화면은 처음부터 정상이었다, 스크린샷 `ui-stockitem-blocked.png`).
  - verify-all --full(1차, 삭제 안내분) **18/19** — 실패 1 = deploy-ready(릴리즈 기록·SW, 배포 요청 없어 정상) · mount sweep 668.5s 크래시 0.
- **(2026-09-12 이어서) Irene 추가 지시 — 쓰는 레시피 표시 + 비활성은 재료 검색에서 제외**
  - 원문: 「같은 떡 메뉴로 바꾸면 되잖아. 브랜드 레시피에서 사용한다고 알려줘야지. 스톡아이템에 연결된 프로덕트레시피와 연결된 브랜드레시피를 다 표시되게 해줘. 그리고 비활성화하면 레시피에서 재료검색에 안뜨게 해주고」
  - 서버 `GET /api/product-ingredients` 에 **`used_in_recipes`** 추가 — 프로덕트 레시피(직접) + 브랜드 레시피(거울 경유), 이름·브랜드까지. dev 실호출 PASS(«Grilled Chicken» + «test_recipe», 잔재 0).
  - 화면 카드에 «쓰는 레시피» 칩 줄(누르면 그 레시피 화면으로 이동) · i18n `usedInRecipes` 4언어.
  - 비활성 필터 실측: 브랜드 레시피 선택기는 **이미** `is_active !== false` 로 거름 / **매장(RA) 경로는 안 걸러** `RecipesTab` else 분기에 필터 추가(조회용 목록은 그대로 — 저장된 줄이 «Ingredient #123» 이 되는 2026-09-09 사고 방지).
  - 거울 동기화 실호출 확인: 재고아이템 끄기 → 거울 [1,0]→[0,0], 되돌리기 → [1,1] **PASS**(끄면 브랜드·매장 검색에서 함께 사라짐).
  - 정적 검사 통과(디자인 신규 0 · 죽은 핸들러 0 · 인쇄 8/8 · 신규 하드코딩 0 · i18n Errors 0).
  - 빌드 1회 **main.e278e8b9.js**(변경 파일 경고 0). **실브라우저 PASS**: 카드에 «Recipes · Product recipe · Grilled Chicken · Brand recipe · test_recipe» 표시 · 끄면 선택 대상에서 빠짐(끄기 전 포함 true → 끈 뒤 false) · 화면 오류 0 · 픽스처 잔재 0 · 재고아이템 원래대로 켜짐.
    - ⚠ 프로브 2차 오판: 브라우저에서 같은 주소를 다시 불러 **캐시 응답**을 받아 «안 꺼졌다» 로 나옴 → 서버 직접 호출로 API 는 DB 를 즉시 반영함을 확인(끈 뒤 is_active false) → 프로브에 `cache:'no-store'`+쿼리 붙여 재실행 PASS.
  - Irene 「검증하고 배포해」 → SW `5.13` → **`5.14-stock-item-recipe-uses-20260912`** · 빌드 1회(main.e278e8b9.js, 변경 파일 경고 0) · 배포 기록 `releases/2026-09-12-stock-item-recipe-uses.json` · 민감 판정 **비대상**(돈·스키마 무변경, Fable 한도 소진으로 판정 미수령 — 기록에 명시).
  - **verify-all --full 19/19 전 게이트 통과**(mount sweep 668.5s 크래시 0) → ✅ **운영 배포 07:21~07:26 UTC**: 안전 게이트 10/10 · 배포 전 mount sweep 통과 · 마이그 87/87 · 스모크 10/10 · 백업 `/var/www/backups/20260912_072105` · 배포 기록 운영 적재.
  - 배포 후 운영 확인: 번들 `main.e278e8b9.js` · SW `5.14-stock-item-recipe-uses-20260912` · `/api/health` ok · **재시작 후 실제 오류 0건**(«Error» 로 걸린 1줄은 재료 이름 «Roasted Sesame Seed…» 가 든 재고 부족 안내).
  - 남은 안내(Irene): 운영 GIT «Rice Cake» 중복은 K-DINE 레시피 5개(떡볶이·로제·라면·짜장 떡볶이·짜장 라면)에서 같은 떡 아이템으로 바꾼 뒤 꺼진 `PI-307` 을 지울 수 있다. 배포됐으므로 카드의 «Recipes» 칩에서 바로 이동 가능.
  - 운영 조치 안내(Irene): `PI-307`(꺼짐)은 K-DINE 레시피 5개에서 빼기 전에는 못 지운다 · 중복 정리는 `PI-132`(켜짐) 한 줄만 남기고 `PI-307` 은 꺼둔 채 두는 것이 지금으로선 안전.
- (2026-09-11 17시 UTC~) Irene 「해」→ 선택: 3번 ✅ · 4번 piece 대기발주 DB 보정 · 5번 발주 33 단위 보정 — Fable 판정 수령(4번: 줄 글자 아닌 연결 환산값 8건 + 다시 담기 / 5번: 약 17행 한 번에 · 순두부 재고 6 g→1,800 g). Irene 원문 전달 완료, «고쳐» 전 운영 쓰기 0.
- (같은 세션) **Irene 새 지시 — 공급업체 상품 이름 «영문(한글)» · 포장단위 정리 · «1kg/pack» 붙여 표시 · 수량 1pack/2pack · 목록 기준으로 DB 수정/추가(브랜드 with MIN · with MIN Cafe)**. 목록 원본: 세션 scratchpad `irene-supplier-list-raw.txt`(359행) · 칸 분리 `irene-supplier-list-cells.json` · 운영 실측 `prod-supplier-catalog.json`(외부 공급업체 38 · 상품 352 · 연결 672). 4·5번과 겹쳐 같은 Fable 에 원문+실측 전달 → **Fable 설계 수령**(Irene 에게 원문 전달): 순서 ①규칙 확정 ②개발 정리 ③검토표 ④운영 반영 ⑤4·5번 잔여. **Irene 확인 대기 4문항**(5·6칸=예전 값? · 공급업체 문서 영문만? · 포장단위 풀네임 통일? · 가격 덮어쓰기?). 매장 13 = Seoul Garden BBQ(데모) → 목록 무관. 준비 완료: 해석기 초안 `catalog-parser-draft.py`(update 299 · add 27 · check 30 · exclude 3) · 문서 `TRADE_STRUCTURE.md` §2-2 규칙(컨펌 대기 표시)·§5-4 해결 예정 · `EXTERNAL_SUPPLIER_PRODUCTS.md` §11 절차. 화면 조사 완료 → `EXTERNAL_SUPPLIER_PRODUCTS.md` §11-4.
- **Irene 「fable 권고대로」(4문항 확정) → dev 구현 진행 중(빌드 전)**: 공통 util(CONTENT_UNIT_OPTIONS·withCurrentUnit·sellerSpecLabel·supplierFacingName 화면/서버) · 공급업체 문서 5곳(WhatsApp·인쇄·PDF·메일·수신) 영문·Buyer ref 제거·수량+단위 한 칸 · 판매 상품 카드/폼 4화면 · 재고 카드 발주처 칩(IngredientsTab·ProductIngredientsTab + 서버 product-ingredients.js 2곳·ingredient-seller-products.js). jest 서버 5/5 · 화면 packSpec 17/17.
- **Irene 추가 원문**(구현 중): 「레시피나 재고관리에 사용하는 단위는 포장 기준수량에 사용하는 단위와 같아야 해 … 발주에서는 1kg/pack … 모든 아이템 정보에 다 똑같이」 → 운영 실측과 함께 Fable 전달 → **Fable 판정 수령·Irene 에게 원문 전달**: 설계 변경 아님 · 규칙 4 교체(용량 미상 → piece/1/포장 이름, 표시 «1 bottle» 접기) · 재료/재고아이템 카드도 같은 규격 함수(`stockSpecLabel`) · 기존 재료 pack→g/kg 수렴은 범위 밖(별도 설계). 용량 미상 → «1 bottle / 1 pack» 개수로 두고 «용량 미상» 표시 — **Irene 「fable 권고대로 해」 확정**. 브랜드 2 = K-DINE with MIN(GIT Consulting · 실매장 8).
- 진행: 접기 규칙(서버 poLineSpec·화면 unitConversion) · 재고 카드 3곳 stockSpecLabel · 해석기 `utils/catalogSpecParser.js` + jest · 목록 원본 `scripts/data/irene-supplier-catalog-2026-09-11.txt` · CLI `scripts/catalog-alignment.js` review/apply(기본 연습 · --commit · 적용 직전 from 대조 · 커밋 전 백업 파일)/rollback.
- 검증까지: jest 서버 po-line-spec·supplier-facing-name·catalog-spec-parser 전부 통과 · 화면 packSpec 19/19 · dev API 실호출 11/11(PDF 영문·Buyer ref 없음·수량+단위 한 칸 · 메일 품목 영문 · seller-sources/include=sellers 규격 4칸) · print-guard 8/8 · design-guard 신규 0.
- 운영 검토표(오프라인, 운영 SELECT 스냅샷): update 291 · same 1 · add 26 · check 38 · exclude 3 · 용량 미상 92 · 연결 환산 146 · 가격 변경 5 · 새 공급업체 Hero Market·Mr. DIY. dev 연습 적용에서 «X (X)» 이름 결함 발견·수정.
- **Irene 추가 지시(같은 세션)**: 「아이템명은 공급업체쪽에는 영어만 표시되면 돼. 발주할 때도, New Seoul Mart 만 영어(한글) 그대로 해줘.」「원래 공급업체 아이템 이름이랑 우리 재고아이템 이름 달라.」「DB 항목 다 있어」 → 판매 상품 이름 영문(New Seoul Mart 만 «English (한글)», 해석기 옵션) · 공급업체 문서는 판매 상품 이름 그대로 · 연결 없는 줄의 우리 재고 이름만 한글 괄호 제거. 반영 중.
- dev 적용 시험 중 발견: 한 트랜잭션 안 연속 채번이 code_sequences 잠금 대기로 건당 ~50초 → 적용 순서 «대조 → 새 공급업체 커밋 → 트랜잭션 밖 채번 → 재대조+본 적용» 으로 변경. 멈춘 시험은 롤백(스냅샷 대조로 확인 예정).
- 검증(18:20 UTC 무렵): jest 서버 30/30 · 화면 packSpec 19/19 · dev API 실호출 11/11 · dev 적용(1초, 새 상품 20·공급업체 2·SKU 중복 0)→되돌리기→스냅샷 대조 일치 · 고장주입 5건 성립(stale 대조 exit 3·DB 무변경 / 해석 불가 3실패 / 짝2 2실패 / 서버 접기 1실패 / 화면 접기 1실패, 원복 sha256 일치) · 빌드 1회 완료(Compiled with warnings — 변경 파일 해당 여부 확인 중).
  - 시험 중 발견·수정: 한 트랜잭션 연속 채번 잠금 대기 · 한글 칸 영문 «X (X)» · 어긋난 한글 check 누락(모든 공급업체로 복원) · 첫 stale 주입이 대조 밖 칸이라 조용히 통과(시험 설계 오류 → 대조 칸으로 재주입).
  - dev 잔여: 시험으로 만든 공급업체 4 · 계약 4 · 상품 40 전부 soft-delete.
- 운영 검토표(오프라인·SELECT 스냅샷, New Seoul Mart 만 한글): update 285 · same 7 · add 26 · check 38 · exclude 3 · 용량 미상 92 · 연결 환산 146 · 가격 변경 5(냅킨 7.80→78 carton · 건전지 9.90→14.9 등) · 새 공급업체 Hero Market·Mr. DIY.
- **Irene 추가 요청**: 「기존 발주한 내용들이나 POs에 있는 것도 정보 맞춰서 나오게 해줘」 — 운영 실측(SELECT, 범위 brand 1·restaurant 10 외부 공급업체): 발주 21건(8/25~9/11) · received 15(90줄) · cancelled 3(8) · draft 2(11) · submitted 1(1) · **규격 스냅샷 있는 줄 0/110** · 연결 110/110(이름은 read-time 이라 자동 반영) · 줄 unit kg 53·pack 24·piece 21·pkt 4·g 4·ea 2·bottle 1·can 1 · 현재 상품 단위와 다른 줄 32 · 대조 1(발주 33)·결제 1. 스냅샷 설계(9/11 «지난 발주서가 흔들리지 않게»)와 부딪쳐 → 게이트 요청과 함께 Fable 판단 요청 예정.
- ⚠ 순서 착오: 화면 고장주입(unitConversion.ts)을 **빌드 뒤**에 해서, 내용은 원복 sha256 일치인데 수정 시각이 번들보다 늦어 verify-all 의 «소스가 번들보다 새롭다» 가 실패. 규칙(«프론트 고장주입은 빌드 전에 몰아서») 위반 — 재빌드 1회 + verify 재실행으로 처리(mtime 조작 금지).
- verify-all --full 1차: **17/19** — mount sweep 686s 크래시 0 · health · 계약 · 인스펙션 · 인쇄 라우트 · i18n 통과 / 실패 2: deploy-ready(릴리즈 기록·SW 미상승 — 배포 전) · 번들 신선도(위 순서 착오).
- **Fable 게이트 판정: 조건부 통과**(Irene 에게 원문 전달) — 보정 1 가격 배수(≥2·≤0.5 → check) · 보정 2 지난 발주 줄(received 라벨·규격만 / draft·submitted 환산까지 / cancelled 무접촉). **Irene 답 필요 4건(배포 뒤 운영 검토표와 함께)**: check 행 · 새 공급업체 등록 주체(권고 브랜드) · 냅킨 78/carton(권고 목록대로) · 지난 발주 채움 방식(권고 예).
- 보정 반영 완료: `catalogSpecParser.js` 가격 배수 · `buildPoLinePlan`/`poLineWritableFields`/`assertPoLineWrite` · CLI ⑥단계(apply)·review `po_lines` 절·rollback. jest 서버 34/34(parser 25) · 고장주입 6번째(받은 줄 보호 제거 → 3실패, 원복 sha256 일치) · dev 지난 발주 줄 e2e(submitted 환산까지 / received 환산 무접촉 → 되돌리기 → 원복 일치).
- 운영 검토표(오프라인): update 284 · same 7 · add 26 · check 39 · exclude 3 · 용량 미상 91 · 연결 환산 146 · **지난 발주 줄 11건 49줄(received 37 · draft 11 · submitted 1 · 환산 변경 11, received 환산 0)**.
- SW `5.11-supplier-catalog-align-20260911` · 빌드 1회(main.783cd600.js, 새 경고 0) · 릴리즈 기록 `dev-backend/releases/2026-09-11-supplier-catalog-align.json`. **verify-all --full 19/19 통과**(mount sweep 번들 동일 재사용) → **Fable 게이트 최종 통과(마커 8ca23508b568, Irene 에게 원문 전달)** → Irene 「배포해.」 → **운영 배포 완료** 19:03 UTC · SW 5.11-supplier-catalog-align-20260911 · 스모크 10/10 · 백업 20260911_185725 · main.783cd600.js · 운영 health 200 · 배포 뒤 오류 로그 0 · 운영에 CLI·해석기·목록 파일 존재 확인.
- Irene 「staging 여기 표시 안바뀌었어. 뭘 한거야?」→「무슨 말이야? 표시 좀 제대로 하라니까」→「기본포장용량 X 수량 (취급단위) 이렇게 나와야지」 → **운영 DB 반영 실행**(Fable 권고대로: 새 공급업체 두 곳 브랜드 1 · 지난 발주 줄 채움 · check 39행 무접촉). 폴더 운영 `/var/www/backups/catalog-alignment-20260911/`(review·answers·dryrun·applied·log). 운영 검토표(DB) = 오프라인 예상과 summary 일치.
  - 결과: updates 284 · adds 26 · 새 회사 42 Hero Market·43 Mr. DIY(brand 1) · 계약 40·41 · links 141 · po_lines 48(received 37 환산 무접촉 · draft 11) · conflicts 0 · actor user 4.
  - **검토표와 다른 값 3건 → Fable 지시대로 추가 운영 쓰기 정지 · 사실 전달(재판정 대기)**: ①발주 줄 48(검토표 49 — submitted Sliced Beef 는 실제 바뀔 값 없음, 검토표 흉내 한계) ②원가 전파 오류 2(식초 173 · 고추장 172 «unit_cost Out of range» — PI 10 g·19440 연결 환산 1 잔존) ③same 행 연결 환산 5건 미반영.
  - ⚠ CLI 가 끝나고 종료 안 됨(review·apply) → 결과 줄 확인 후 PID kill. 코드 수정 없음.
  - 되돌리기: `node scripts/catalog-alignment.js rollback --backup /var/www/backups/catalog-alignment-20260911/applied.json --commit`(운영).
- **Fable 재판정(원문 전달)**: 되돌리지 않음 · 결함 1(same 행 연결 5건) · 2차 묶음 지시. 원가 오류 원인 재현 확정 = 매장 재료 806·801 package_quantity 18000·14000(옛 데이터) → 1,890,000/1,932,000 상한 초과, 잘못 쓰인 값 0(Fable 이 짚은 PI 10 은 단위 비호환 skip).
- Irene 「1 kg X 2pack 발주할 때 내역은 이렇게 나오면 되지. 1kg/pack 이 표기는 아이템/상품 정보에」 → 2차 묶음(dev): `lineQtyText`/`lineBaseText`(화면·서버) · Staging·상세·인쇄·PDF·메일·WhatsApp(«@» 가격)·대조·수신 · same 행 연결 환산 포함 · CLI process.exit · 검토표 줄별 연결 흉내. jest 서버 37 · 화면 20 · 고장주입 3건.
- Irene 「restaurant/10/invoices … 브랜드는 브랜드제너럴 회사명 … 이슈드날짜가 다 같고 … 최신>오래된 순서」 → 조사(Explore)·운영 실측(구입 청구서 14장 issued 9/8 20:44 백필) → `invoices-helpers.getIssuerCompanyInfo` 브랜드·푸드코트 발행자 = 회사명 우선 · 화면 `utils/invoiceListOrder`(주문일 우선 정렬·필터) + jest 3 · 고장주입 1.
- check 39행 추천표·answers: 세션 scratchpad `check39-table.md` · `answers-check39-draft.json` — **Irene 「추천대로」 확정**. 2차 배포 뒤 운영 검토표 재생성 → 이 answers 로 apply --commit(39행 · same 행 연결 5건 · 멸치액젓 줄) → 대조.
  - answers 연습 계산에서 결함 발견·수정: 영문명 없는 행(217 New Seoul Mart 면사랑 육수)이 공급업체 없이 check 로 빠져 «추가» 답이 건너뛰어짐 → `buildReview` 공급업체 찾기를 영문명 검사 앞으로 + jest 1 · 고장주입 1 성립 · jest 서버 38/38. verify-all 은 이 수정 전에 시작돼 재실행 필요(번들 동일 → mount 재사용).
- SW 5.12-po-line-qty-text-20260911 · 릴리즈 기록 `releases/2026-09-11-po-line-qty-text.json` · verify-all --full 19/19 ×2 · **Fable 2차 게이트 통과(마커 9b94cc1ad3c9, 원문 전달)** · Irene 「추천대로」「해」 → 운영 배포 진행 중(백그라운드). ⚠ Fable 판정 세션에 «Production Deploy» 보안 경고 → 확인 결과 운영 무변경(SW 5.11 · main.783cd600 · 백업·manifest 그대로).
- **🔴 운영 원가 손상 발견(2차 반영 정지)**: 1차 반영 원가 전파가 기준양 결함 행(package_quantity = base_quantity > 1)에서 원가를 ×base_quantity 로 저장 — cost_change_logs 19:10 이후 23건 중 15건: product_ingredients 7·8·14·15·17·18·19 · ingredients 803·804·805·810·811·813·814·815 (예 MSG 18.8→18,800 · 무 4.8→4,800 · 식용유 42.9→128,700). 영향: 브랜드 레시피 줄 7 · 브랜드 2 거울 41(고운 고춧가루)·22(무) · 매장 10 재료 8(매장 레시피 0) · 매장 원가행 815 무변경. 결함 행 전체: ingredients 53 · product_ingredients 42. 원인식 `costSync.convertPrice` × myPackageQty. 되돌리기 자료 = cost_change_logs old_value. ⚠ `rollback` 은 원가를 다시 전파해 같은 부풀림 → 쓰면 안 됨.
  - **Fable 사고 판정(원문 전달)**: rollback 금지 · ①영향 조사 ②15건+파생 행 old_value 복원(incident-restore 로그) ③결함 95행 package_quantity→1(원가값 무접촉) ④재발 방지 코드(costSync 배수 안전장치·인스펙션 규칙·검토표 원가 미리보기·rollback 원가 복원·결함 써 넣는 코드 자리) → 게이트 1 → 배포 ⑤그 뒤 2차 반영. **Irene «고쳐» 대기**.
  - **Fable 게이트 통과**(마커 f2283598e56c) · Irene «해 승인»(배포 + 원가 20행 복원) → ✅ **배포 21:26 UTC**(서버만, SW 5.12 그대로, 스모크 10/10, 마이그 87/87, 백업 20260911_212145, 운영 costSync 새 식 확인) → ✅ **복원 21:34 UTC 20/20 일치**(백업 cost-incident-restore-2026-09-11T21-34-38-200Z.json · incident-restore 기록 20 · 재연습 대상 0) → ✅ 운영 읽기 대조: 3배 어긋남 20행 사라짐, 남은 2행 196·1084(무관 옛 행) → **rollback 매핑 사본 복원(Fable 잔여)**: dev 구현(apply ⑤ 전 `mapping_prices_before` · rollback 복원/충돌) · dev 3시나리오 + 고장주입 · verify-all --full 19/19 · Fable 게이트 통과 f43257bd1a58(조건: 2차 반영 --commit 직후 rollback 연습으로 `restored_mapping_prices` > 0 확인, 0 이면 멈추고 Fable) · Irene «응» → 배포 중.
  - ✅ **매핑 사본 묶음 배포 21:55 UTC**(스모크 10/10 · 백업 20260911_215503 · 운영 md5 일치) · ✅ **2차 반영 apply --commit 22:03 UTC**: 수정 30 · 추가 8(상품 385~392) · 연결 5 · 건너뜀 2 · 충돌 0 · 발주 줄 2(PO 24 줄 110 «1.9 L × 6 bottle» · 112 «24 piece × 1 carton») · 백업 applied2.json(batch catalog-align-1789164181027 · mapping_prices_before 54) · **Fable 조건 충족: 직후 rollback 연습 restored_mapping_prices 6 · 쓰기 0 · 충돌 0** · 운영 전수 대조 3배 행 2(옛 196·1084 뿐) · 발주 줄 표시 «10 kg × 2 carton» 확인.
  - **Fable 판정(호떡)**: 되돌리지 않음 — 0.0369 = 2.40 ÷ 65 가 식대로 맞고 옛 2.4 가 «1 g 에 2.40»(호떡 1개 RM156)이라 틀렸던 값 · 레시피 줄 0. 진짜 문제는 **매핑 환산값 1**(1 piece 받으면 재고 +1 g) · 원인은 도구 결함: `buildApplyPlan` 답(answers) 경로 update 는 link_conversions·cost_preview 를 답의 규격으로 다시 계산하지 않음(catalogSpecParser :353-355) — 2차 반영 update 30건 전부 답 경로. Fable 지시: ①환산 전수 확인(읽기) ②PDF 확인 ③Staging 은 Irene 눈 1회 ④(a) 묶음 행 단위 판정 후 스크립트 1개로 쓰기 ⑤도구 결함 dev 수정(오늘 배포 아님, 팀원 실행).
  - ✅ Irene «모두 권고대로 해» → **연결 환산 14건 쓰기 완료**(14/14 일치 · 원가 기록 50 그대로 · 백업 links-fix.json) · **후속 ①②③ 쓰기 완료**(연결 1022 → 상품 389 · 환산 1000 유지 · 원가 10.7143 → 24 / 연결 144 환산 5400 / 상품 189 규격 g/800 · bottle → 액젓 원가 21 → 19 두 행 · 기록 50 → 53 · 백업 followups-123.json). **④(목록 밖 한글 이름 3건)만 Irene 확인 대기** — 그 3건은 공급업체 상품 이름이고 우리 재고아이템·재료 이름은 «영문(한글)» 유지임을 설명함.
  - 빌드 1회 새 번들 `main.1ce52c48.js`(경고에 변경 파일 없음) · verify-all --full 18/19(mount sweep 678.7s 크래시 0) → 실패는 «미배포 기록 2개» 뿐 → 기록을 `2026-09-11-po-item-seller-name.json` 하나로 합침(answer-path-links 흡수·삭제) → `--only deploy-ready` 통과 = 19/19 · **Fable 게이트 판정 요청 중** · 그 뒤 Irene «배포».
  - **dev: 발주 내용 이름 순서**(Irene 「POs에서부터 발주내용이니까 공급업체 이름으로야」 · 「우리 재고 리스트는 우리 이름 한글까지」): 발주 상세 품목 표·입고 줄·반품 줄을 공급업체 상품 이름 우선으로(우리 이름은 작은 줄/괄호) · 규칙은 `utils/poShare.poItemName` 단일 소스 · POs 첫 화면 «발주 제안»은 우리 재고 목록이라 무변경 · SW 5.13-po-item-seller-name-20260911 · 배포 기록 작성. **발견: poShare 공유 문구 테스트 5건이 09-11 계약 변경(«10 kg × 2 carton @ … = …») 뒤 실패한 채 방치 → 정정**(화면 jest 는 verify-all 게이트에 없음 — 게이트 편입 여부는 별건). 화면 jest 32 통과 · 고장주입 1건 성립 · 빌드 진행 중 → verify-all --full → Fable 게이트 → Irene 배포 대기.
  - **Fable 티슈 판정**: 그대로 둔다(쓰기 0) — §1 규칙은 «GIT 프로덕트가 있을 때» 적용이고 티슈는 GIT 프로덕트가 없음 · 브랜드가 등록한 외부 공급업체를 매장이 상속받아 직접 발주하는 것은 설계된 경로(SUPPLIER_CONTRACT_SYSTEM §G · supplier-directory.js:1203-1211) · 이미 received 발주는 사실이라 판매자 변경 불가. 문서 §1 에 적용 조건 한 줄 메모 추가함.
  - ✅ **공급업체 상품명 한글 제거 3건**(Irene 「공급업체 상품명은 한글 빼」): 상품 354·355·356 영문만 · 우리 재고아이템 307·308 · 매장 재료 1082·1083·1087 이름 무접촉 확인 · 백업 names-fix.json.
  - **공급 체인 실측(Irene 「레스토랑에게 공급업체는 UGS 아니고 깃컨설팅이야. 제대로 하는 거 맞지?」)**: 컵·뚜껑은 규칙대로 — UGS 상품 354·355 → 브랜드 재고아이템 307·308(GIT) → 브랜드 프로덕트 185·186(14.70·5.25) → 매장 10 재료 1082·1083 의 활성 연결은 brand:1 GIT(1199·1200), UGS 직접 연결 1144·1145 는 꺼짐 · 실제 발주 PO-R10-20260827-001 판매자 = GIT Consulting. **예외 1건: 티슈** — 매장 10 재료 1087 이 IKEA(41) 직접 연결 1261 활성 · PO-R10-20260828-003(received) 판매자 IKEA · 대응 브랜드 프로덕트 없음 · IKEA 계약은 brand:1 뿐 → **Fable 판정 요청 중**.
  - ✅ **액젓 후속**(③의 결과 정리 · Fable «미수령 발주 줄도 같은 값으로» 지시 범위): 연결 207·1138 환산 1 → 800 · 제출 발주 줄 191 규격 스냅샷 채움(bottle · 800 g · 환산 800) → 표시 «800 g × 1 bottle» · 원가 기록 53 그대로 · 백업 anchovy-links.json. 연결 853 은 이미 800.
  - **dev 도구 결함 수정(Fable ⑤, 오늘 배포 아님)**: 배포 기록 `releases/2026-09-11-answer-path-links.json` 작성 · 검토표에 `links_by_product` 추가 · `buildApplyPlan` 답 경로 update 가 답의 규격으로 연결 환산 제안 + 원가 3배 검사(넘기려면 답에 `accept_cost_change`) · jest 29→41 통과 · 고장주입 2건(환산 push 제거 · 3배 검사 제거) 각각 1 실패 → 원복 cmp 일치. Fable 지시상 이 건은 게이트 재호출 없이 기계 게이트로 종결.
  - **Fable (a) 행 단위 판정**: 14건 쓰기(봉투 10·8 · 호떡 65 · 배 12 · 단팥 3000) · 1022(당면)은 보류 — 환산이 아니라 «연결이 14kg 카톤에 붙은 것»이 문제, 새 상품 389 로 옮기고 1000 유지 권고 · (b) 39건 무접촉(§2-2 수렴은 별도 설계) · 한글 이름 3건은 괄호 한글만 제거 권고. **Irene 질문 5개 대기**(14건 승인 + ①당면 재연결 ②소금 5400 ③액젓 800ml/bottle ④한글 3건 · Staging 눈 확인 부탁).
  - 쓰기 스크립트 준비 `prod-links-fix.js`(연습 기본 · COMMIT=1 · NAMES=1 · 표와 다르면 전체 중단 · 백업 links-fix.json · 원가 기록 건수 전후 동일 증명). **연습 결과: 연결 14 · 이름 3 · 중단 사유 0 · 원가 기록 50건 그대로.**
  - **환산 전수 확인 결과**(읽기 전용): (a) 지금 1·공식값 있음 = **15건**(쓰레기봉투 8 · 호떡 212·996 → 65 · 갈아만든배 2 → 12 · 단팥 2 → 3000 · 당면 1022 1000 → 14000) — 전부 재고 0 · 레시피 줄 0 · 미수령 발주 0 · (b) 차원 불일치 39 · (c) 이미 같음 5. 원가 skip 사유는 전부 «단위 비호환». **Fable 행 단위 판정 요청 중.**
  - ✅ 운영 PDF 실호출: PO-R10-20260911-001 «10 kg × 2 carton» 확인 · Buyer ref·SP 코드 없음 · 공급업체 New Seoul Mart(한글 병기 허용 대상).
  - 목록 밖 한글 이름 상품 3건(UGS 354·355 · IKEA 356) — 영어만 규칙 대상이나 목록 밖이라 무접촉, Irene 질문 예정.
  - ⚠ 적용이 만든 원가 3배 2건(호떡 pi#156·ing#938 2.4 → 0.0369 = 2.40 ÷ 65, 상품 194 가 g/65 piece 로 규격 정정된 결과, 레시피 줄 0) → Fable 지시대로 판정 요청 중.
  - **2차 반영 준비 완료**(운영 읽기만): 검토표 `review2.json`(같음 316 · 수정 0 · 추가 0 · 확인필요 40 · 연결 환산 5 · 지난 발주 줄 0) · 답 `answers2.json`(39행 Irene «추천대로» + 208 건너뜀 — 1차에서 #181 에 이미 반영) · 연습 `dryrun2.json`: 수정 30 · 추가 8 · 연결 5 · 건너뜀 2 · 충돌 0(행 177 김밥용 김 10매는 목록에 가격 없어 0 으로 들어감). 확인 스크립트 `prod-post-apply-check.js`. CHANGELOG #5(5.12)·#6(원가 수정) 기록. 게이트 잔여: rollback 이 매핑 사본(isp.unit_price) 미복원 — 2차 반영 전 후속 · 운영 옛 행 196·1084(1/3 이하) 단위 정리 때.
  - **Fable 재판정(원문 전달함)**: 원인 = costSync 원가식이 기준양을 한 번 더 곱함(95행은 결함 아님) · ③(기준양→1) 철회 · ④-a 식 수정+테스트 72→12 · ④-b 인스펙션 «원가 ↔ 판매자 가격 계산 3배» · ④-c 차단막 안 넣음 · ④-d 검토표 원가 미리보기 · ④-e rollback 원가 기록 거꾸로 · ④-f 마이그 미리보기·주석만. 순서 ② 운영 복원(Irene 승인) → ④ → 게이트 → 배포 → 2차 반영.
  - 운영 대조로 복원 대상 **20행**으로 정정(Irene 에 알림): 기록 15 일치 + 기록 없음 5(PI 12 깐마늘 7000→7 · 재료 800 양파 7800→7.8 · 808 깐마늘 7000→7 — 오늘 전부터 부풀어 있었음, cost_change_logs 는 09-11 19:24 부터만 · 거울 41·22). 충돌 0. 레시피·매장 원가표 번짐 없음. 스크립트 `prod-cost-incident-restore.js`(재료 칸 무접촉, 판매자 가격 계산값 = 지금 값 ÷ 기준양 두 쪽 일치할 때만). **Irene 승인 대기.**
  - **dev ④ 구현 완료**: costSync 식 · cost-sync.test(12, 고치기 전 2 실패 반증) · ING-UNI-025(dev 시험 데이터 4행 재계산으로 정리 · 고장주입 재료 72 ×1000 → FAIL exit1 → 원복 PASS) · catalogSpecParser 원가 미리보기(check «원가 3배 이상 변동» · 고장주입 1 실패) · catalog-alignment `cost_batch_id` + `restoreCosts`(dev 가짜 백업: 연습 1·쓰기 2500→2.5·충돌 거부) · converge 미리보기·머리 주석. jest 40/40. verify-all --full 진행 중.
  - (옛 메모) **새 사실(재판정 요청 중)**: 복구 연습 17건(로그 15+거울 41·22)·충돌 0. 운영 15행 모두 원가식에서 기준양을 안 곱하면 old 값과 정확히 일치 → 문서 §2-2(`base_quantity`=가격이 사는 양, 항등식 `bq×unit = pq×package_unit`)로는 g/1000·pu g·pq 1000 이 규칙에 맞고 **costSync `× myPackageQty`(7229b33ab, 09-05) 가 문서와 어긋남**. 95행 100% package_unit=unit. 써 넣은 코드 = `migrate-package-unit-2-converge.js:421-425`(머리 주석은 manual 인데 registry `deploy` — 매 배포 재실행, 운영 NULL 대기 행 중 ingredient 103 piece/50 이 다음 배포에 같은 모양이 됨). ③(pq→1) 은 Fable 재판정 전까지 보류.
  - 영향 조사(SELECT): 거울 파생 = 브랜드 2 재료 41(고운 고춧가루 29,000)·22(무 4,800) · 레시피 줄 cost·레시피 합계·recipe_costs·ingredient_costs 는 19:10 이후 갱신 0(저장된 파생값 무손상, 화면 실시간 계산 여부 확인 못 함) · 매장 원가행 815 무변경. 결함 95행 백업 `pkgqty-defect-95-backup.json` · 복구 전 이미지 `cost-damage-before-image.json` · 복구 스크립트(연습 기본, COMMIT=1) `prod-cost-incident-restore.js`(세션 scratchpad).
- **2차 배포 완료** 20:1x UTC · SW 5.12-po-line-qty-text-20260911 · main.3a736a5f.js · 스모크 10/10 · 백업 `/var/www/backups/20260911_201034` · health 200 · 오류 로그 0. Fable 판정 세션의 «Production Deploy» 경고는 실제 배포 없음(확인).
- 발행일 몰림 청구서: 매장 10 구입 청구서 12장(외부 11 · 브랜드 1, Fable 은 13 으로 적음) 대응표 준비(SELECT). Irene «같이» 대기.
- 버전 번호 결정 대기(Fable 의견 없음). → 운영 검토표 재생성(운영 DB) → check 38 행 + 새 공급업체 주체 Irene 답 → 운영 적용. 운영 쓰기 0.

### 완료된 작업 (이번 세션 — 2026-09-11 오후, 운영 배포 2회: SW 5.09 · 5.10)
1. **발주 줄 «용량 · 포장단위 × 수량»** — SW 5.09 · 14:19 UTC
   - 원인(Fable): `resolveOrderUnit` 이 supplier 상품을 매장 메뉴 표에서 찾아 'piece' · 판매 상품에 포장단위 칸 없음 · 확정 발주 줄 8표면에 용량 없음 · 외부 공급업체 등록창에 용량 칸 없음
   - 마이그 `scripts/migrate-seller-package-unit.js`(registry deploy): 판매 상품 3표 `package_unit` · 발주 줄 `base_quantity`/`base_unit` 스냅샷 · 규칙 단일소스 서버 `utils/poLineSpec.js` / 화면 `unitConversion.ts`
   - 운영 이행: supplier 184/352 · brand 121/155 · foodcourt 0/0
2. **인보이스 대조 정직 읽기** — SW 5.10 · 16:29 UTC
   - 운영 발주 32 = Guan Kee **손글씨** 양식지 → 무료 OCR 원리적 불가. `InvoiceReconcilePage` `readResult` 세 상태 · `invoiceMatcher.parseInvoiceLine` 상식 검사
   - Fable 게이트 1차 불합격(짝 0 이면 목록 숨김 → 이름만 안 겹치는 인쇄 인보이스도 «못 읽음») → 세 상태로 보정
3. **외부 공급업체 등록 창 «재고 환산» 칸** — SW 5.10 · `RegisterExternalSupplierModal` `unit_conversion: 1` 고정 제거 · `defaultLinkConversion` · 입고 증명 재고 36→66 · 원가 18→12
4. **외부 공급업체 상품 API NaN 무응답 → 404** — SW 5.10 · `routes/supplier-directory.js` `loadOwnedExternalSupplier`
5. **운영 조회·조사**(ssh·운영 백엔드 계정 SELECT + 첨부 scp, 사본 삭제): piece draft 10줄 2건(제출 0) · 인보이스 첨부 5장 중 손글씨 2(같은 종이) → **손글씨 유료 OCR 안 붙임**(Fable)
- 검증 합계: API 실호출(포장단위 12/12 · 재고환산 10/10 · NaN 3/3) · jest 28/28 · 고장주입 A·B·C·D·E2·F 성립(E 는 이중 방어로 불성립 → E2 로 재증명) · verify-all --full 19/19(5.09) · 18/19 ×3(5.10, deploy-ready 만) · 실브라우저 대조 3경우 · Fable 게이트 PASS(마커 f463eda63a99 → a9a5db37d76c)
- 첫 배포 시도 실패: 같은 서버 PlanQ `tsc -b`(3.8GB)와 겹쳐 메모리 게이트 차단 → 운영 무변경 확인 → 끝난 뒤 재시도 성공
- 문서: `docs/TRADE_STRUCTURE.md` §2-2 · `docs/PURCHASE_ORDER_SYSTEM.md` 1352행 뒤 스냅샷 메모 · §2-⑤ 재고 환산 · §8-2 손글씨 한계 · `CHANGELOG.md` #2·#3 · `DEVELOPMENT_PLAN.md` · 배포 기록 `dev-backend/releases/archive/2026-09-11-po-pack-unit.json` · `…-reconcile-honest-read-and-stock-conversion.json`
- 메모리: `reference_fable_gate_fingerprint_scope`(미추적 배포 기록 JSON 도 지문) · `reference_invoice_ocr_browser` 함정 5(손글씨) · `feedback_fable_budget_minimal`(Irene 「fable 좀 그만 써」→「중요하고 복잡한 거에는 불러야지」) · MEMORY.md 요약 2줄

### 다음 확정 작업
- **무료 구매자 등급(B2B 유입)** — 설계 초안 `docs/BUYER_FREE_TIER_DESIGN.md`, **Irene 승인 대기**(확인 3문항: 요금제 이름 · 브랜드 카탈로그 링크 열쇠 · 매장 1곳 기준).
  - Irene 원문: 「그냥 기본 가입은 시켜서 소비자 역할로 하는 건 어때? 공급업체에 발주하려는 사용자? 무료 가입?」 · 「1. 발주 전후 연결되는 모든 기능은 추가해놔 … 재고관리 업체관리 레시피관리까지 메뉴에서 자동으로 계산하는 거 어필해서 레스토랑관리자로 전환유도 해. 2. 한도를 왜 줘 … 계약신청하는 것도 있는 거지? 가능하면 프로필에서 인보이스 관련 정보는 필수로 받아. 3. … 브랜드제너럴이랑 공급업체도 프로덕트 링크 만들어주고 보여주기만 해서 주문하려면 사용자 무료 가입 유도」 · 「소비자용 공개가게는 안해도 돼. 장기적으로 B를 전략적으로 유도하자. 공급업체들과 b2b 전략 제대로 가자.」
  - 구조 실측(근거): 발주·공급업체 라우트에 요금제 문 **없음**(무료 등급에서 그대로 열림) · 재고·레시피·상품은 `requireRestaurantModule` 이 이미 지킴(모듈에서 빼면 자동 차단) · 화면은 `ProtectedRoute.MODULE_GATED_ROUTES` 에 줄 추가 · 사이드바만 요금제를 안 봐서 조건 1줄 필요 · 계약 신청(`POST /supplier-contracts`)·인보이스용 매장 칸(법인명·사업자등록번호·세금번호·법인주소) **이미 있음** · 0원 요금제 선례(오너 3종) + 화면이 0원을 «Free» 로 표기.
  - **Irene 추가 지시(2026-09-12)**: 「사용자 친화적으로 알기쉬운 직접적인 이름과 안내 … UI/UX 자체로 바로 바로 알게. 발주하는 화면들 레스토랑과 겹치니 같은 컴포넌트 … 카탈로그 링크는 브랜드제너럴도 만들어. 브랜드제너럴이 브랜드에만 판매할지 다른 바이어에게도 판매할지 선택 … 가입신청 과정이 공급업체에 있지? 브랜드제너럴에게는 프랜차이즈 등록인데 공급형 이라고 표시 … 관리는 프랜차이즈와 같은 맥락으로 하되 따로 보고 체크」 → 설계 §5 에 반영.
    - 실측 근거: `brand_products.distribution_mode`(all 5·specific_brands 31·specific_restaurants 1)에 **`external_buyers` 한 값 추가** · `contracts.contract_type`(varchar, franchise/tenancy/standard/… 혼재) + `stage`(proposal→contracting→setup→active) **이미 있음** → 공급형 = `contract_type:'supply'` 한 값 + 관리 화면 구분 탭 1개(프랜차이즈 화면은 공용 `ContractManagementPage` 를 감싼 10줄 껍데기) · 발주 화면 4개는 **이미 역할 공용**(구매자 종류로만 분기 15곳) → 신규 화면 0 · 카탈로그 링크 열쇠는 공급업체 `shop_slug` 재사용 + 브랜드에 같은 칸 추가.
    - 이름 확정(사용자 말투): 요금제 «발주 전용 (무료)» · 가입 선택지 «공급업체에 주문만 할래요 — 무료» · 잠금 배지 «업그레이드하면 자동 계산» · 링크 «주문용 상품 링크» → 열면 «상품 보기 — 주문하려면 무료 가입» · 계약 «가맹형/공급형».
  - **Irene 추가 지시(폼)**: 「모든 폼들 필수랑 아닌 거 표시가 없어. 필수를 최소화하고 불편함 없게 하자.」 → 설계 §5-7 + `UI_DESIGN_GUIDE.md` §4.3-1 신설.
    - 실측: 규칙은 이미 §4.4 에 있음(별표·부족 배너·저장 막지 않음) / 구현이 갈림 — 가입 화면 로컬 `RequiredStar`, 계약 상세 `Label required`, 나머지 표시 없음(표시 사용 5파일 vs 폼 178파일) / 화면이 서버보다 더 요구하는 곳 있음(브랜드 상품 별표 4 vs 서버 이름·단위).
    - 확정 규칙: 필수 기준 = 서버 400 · 표시는 공용 `FormLabel required` 한 곳 · 선택 칸은 무표시 · 버튼 막지 않음 · 자동저장 폼은 저장 차단 아님.
  - **폼 종류 선택(2026-09-12)**: Irene 「브랜드 프랜차이즈를 폼 바꾸는 거 아니지? 2가지 종류로 선택해서 계약하게」 → **폼 교체 없음**. `ContractDetail.tsx:1414` 에 계약 종류 선택 상자가 이미 있어 «공급형» 한 줄 추가 + 생성 시 자동 `franchise` 대신 «가맹형/공급형» 선택(`ContractManagementPage.tsx:212`).
  - **소비자 공개 가게는 보류**(Irene 결정) — `docs/SUPPLIER_CONSUMER_COMMERCE_DESIGN.md` 를 `main` 커밋 `f87cd631f` 에서 복원해 맨 위에 보류 표시. 백엔드 골격(모델 6·라우트 2·미들웨어·재고 서비스·slug 유틸·공급업체 고객 화면)은 **`main` 에만** 있고 현재 브랜치엔 없음. DB 표 6개·상품/회사 shop 칸은 **운영에 이미 반영**(전부 0행, 건드리지 않음).

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **인보이스 번호 중복 첨부 경고** (Fable «후속 후보, 착수 안 함») — 같은 인보이스 번호/파일이 다른 발주에 이미 붙어 있으면 경고. 사례: 운영 발주 22·32 에 Guan Kee No 257506.
- **입고 배치 원가가 포장 단가로 남음** (관찰, 무접촉) — `services/purchaseOrderReceive.js` `receiveIntoIngredient` 가 `inventory_batches.initial_quantity` = 수량×환산(30 kg) · `unit_cost` = 발주 단가(48, BOX 당). 매장 가중평균 원가는 맞음. Fable: 백엔드에서 읽는 곳 없음 — 표시·보고서 사용처 확인 후 정리.
- 외부 공급업체 등록 창: 오류 문구가 값을 고친 뒤에도 다음 저장까지 남음 · 재고 단위 소문자 «l» 은 자동 계산 대신 손입력 요구 (Fable 비차단 관찰).
- 푸드코트 상품 폼·라우트에 포장단위 입력 없음(모델·DB 칸만).
- 옛 `dev-frontend/src/utils/poShare.test.ts` 는 8/31 이전 문구 형식 기대 — 낡은 테스트(게이트 미포함).
- **다매장 오너·BG 두 번째 브랜드 발주 스코프**: `buyerScope` primary 엔티티 한계 → 발주 라우터 403/404. Fable 「착수 금지, 기록만」.
- 0원 청구서 Confirm 은 서버가 Staff 를 막지 않지만 화면에선 가려짐 — 필요하면 그 조건만 플래그 해제(Fable).
- `owner.js` `isExternalIssuer` 행마다 1쿼리 → 배치 조회 정리(결함 아님).
- safety-guard 화이트리스트 부분문자열 매칭 — 인지.
- `/restaurant/:id/suppliers`(옛 SuppliersPage) 403 1건 관찰 — RA 사이드바는 `/pos/suppliers`.
- PlanQ `tsc -b`(4~5GB)와 겹치면 빌드·verify-all 이 막히거나 강제 종료 — 기다렸다가 재시도(우회 금지). 오늘 배포 1회가 여기 걸림.
- 기존 대기(09-10 이전): 메뉴판 프로브 headless-page-sweep 시나리오화 · P1 공급업체·재고 소유 경계 · P2 직접구입 · P3 발주 품목 찾기/추가.

### Git 상태 (저장 시점)
- 브랜치 `deploy-isolation` · 이 저장과 함께 오늘 오후 변경 전부를 커밋한다(직전 커밋 `94e15349e` 09-11 08:45).
- ⚠ 미커밋 상태에서 `git checkout`/`reset --hard` 금지(메모리 feedback_stash_before_deploy_isolation — 영구 소실 2회)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
