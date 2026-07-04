# Purple POS — 개발 세션 상태

<!-- 2026-07-04: P1 브랜드-인벤토리 클러스터 + P0 공급업체 판매품목 표시 = Fable게이트 PASS 후 운영 배포 완료. -->

## 현재 작업 상태

**마지막 업데이트:** 2026-07-04 (P1 브랜드-인벤토리 클러스터 + P0 공급업체 판매품목 이름/SKU 분리표시 — Fable게이트 PASS → **운영 배포 완료**)
**버전:** 운영=**v3.66 / SW 4.58** (2026-07-04 배포 Backup 20260704_061942, Smoke 9/9. 마케팅 버전 넘버 bump + 공개 릴리즈 공지(블로그·전체공지)는 Irene 복귀 후 결정 — outward-facing이라 보류.)
**작업 상태:** 완료 (배포됨)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-04, 운영 배포됨)
- **P1 브랜드-인벤토리 브랜드모드 클러스터 (#5/6/23/35/36)** — dev 검증완료. 브랜드모드 액션 훅 mode-aware화: useSettingsModal(brand→PUT /product-ingredients/:id) / useOrderModal(brand seller-sources 경로 + PO item=**product_ingredient_id**, 안 그러면 Ingredient 테이블 조회 실패로 발주 깨짐) / useAlertResolver(brand alert=클라생성이라 로컬 제거) / useIngredientAdjustModal(brand→adjust-stock, 히스토리 기록) / InventoryManager(mode 전달) / TransactionHistorySection(brand→신규 `/api/product-ingredients/transactions`, 기존 general-stock 오조회 수정=#23뿌리) / product-ingredients.js(GET /transactions [/:id보다 먼저 등록] + adjust-stock에 InventoryTransaction 기록=#36).
- **P0 "재고아이템 vs 공급업체 판매품목" 이름/코드 분리표시** — 설계·판단 단일진실 `docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md`(Fable). 내부 재고 name/code(내 것) + 공급업체 판매품목 name/sku(공급업체 것) 화면 병기, 스키마 변경 0. Irene 기준 = **copy-on-link(연결등록 시 판매품목명 기본=내부명·수정가능, SKU 별도) + 독립편집**.
  - 백엔드: seller 응답 name/sku 추가(`ingredients.js`·**`restaurants-ingredients.js`=RA 실핸들러**·`product-ingredients.js`·`ingredient-seller-products.js`, SupplierProduct join paranoid:false) / PO PDF SKU열+판매품목명 주·내부명 buyer ref(`purchase-orders-workflow.js`) / PO 상세 아이템 플래튼(`purchase-orders-crud.js`) / 공급업체 수신함 name/sku(`seller-orders.js`).
  - 프론트: 재고 seller목록·피커·주문드롭다운 / 장바구니(NewPurchaseOrderPage) / PO상세 / 공급업체수신함(IncomingOrdersView) / 외부등록폼 name+sku(IngredientsTab) / 레거시 supplier "Default supplier" 라벨 강등+안내.
  - **교훈(실호출로 잡음)**: RA `?include=sellers` 실제 핸들러는 `ingredients.js`(468)가 아니라 **`restaurants-ingredients.js`** — 첫 편집이 죽은 경로였음. /검증 3단계 실호출로 발견·수정.
  - /검증 10단계 전부 통과: hydration0 / timezone 신규0 / build TS에러0 / API 실호출(seller name/sku 왕복·익명401·Write→Read) / 헤드리스 70/70 mount0크래시 / print-guard 보호8 무접촉 / design-guard 신규0 / health 106/107(1=기존 데스크탑red). **Fable 게이트 VERDICT: PASS**(diff 절단면 준수·읽기전용 표시·발주 무결성·마이그0).
- **후속(선택, 미착수)**: 레거시 `supplier_name`/`supplier_id` 쓰기중단+멱등 백필(설계 §④ 후속) / PO PDF·seller name HTML escape 헬퍼 일괄(Fable 비차단 메모) / P0-5 완전 read-only 전환.

### (직전) 완료된 작업 (2026-07-03)
- **데모 버그 4건** — 전부 현재 dev 정상(원인=SW 캐시 옛 번들) 확인, dev SW 4.57→4.58 bump+재빌드 배포.
- **BG/Owner 전수감사 — 32건 수정·검증·배포** (Fable 감사→적대검증→Opus 수정, 40건 중 32건). 단일진실 `docs/BG_OWNER_AUDIT_2026-07-03.md`:
  - 보안 5(IDOR·인보이스 PATCH·SMTP·구독스코프·owner self-entity, userCanAccessEntity 신설, 크로스테넌트 403/정상 200 검증)
  - 크래시·500 8(오너 댓글/매뉴얼 author_name·삭제 FK캐스케이드·React#31 공용 getErrorMessage)
  - 주소 3(브랜드 전체필드 round-trip·삭제 응답표준·owner null 정규화 — 레스토랑 표준)
  - 리포트/성능 7 + **#9 Manager Sales 실매출 엔드포인트**(`/api/manager/sales-summary` 신규·타임존정확·테스트주문 검증) + **#31 PhoneInput 크로스컨트리 오파싱**
  - /검증: hydration0·design신규0·health106/107(1=의도된 desktopP2)·i18n통과·mount crash0
- **AI 음식인식 서빙 설계 확정**(Fable) — `docs/AI_FOOD_RECOGNITION_DESIGN.md`. 결정 3개 잠금(사진보관X / 참조사진=메뉴+설정업로드 / RM179 Enterprise 게이팅). 메모리 [[project_ai_food_recognition]].
- **개발순서 로드맵**(Fable 판단) 확정 — 아래 섹션.

### 다음 확정 작업 (Irene 지시 = 로드맵대로) — P1 완료·배포됨, 다음은:
- **P0/P1 공개 릴리즈 마무리**: 마케팅 버전 bump + 릴리즈노트 공개(블로그+전체공지) 여부 Irene 결정(현재 보류 — outward-facing). 원하면 CHANGELOG→create-release-post.js.
- 로드맵 다음: **#24 구독 변경/취소 미저장(Manager, Fable 돈게이트)** → AI Track A(아이템 썸네일·순수FE) → #8 Manager Reports + #38 Customer Insights(실 analytics) → AI Track B(카메라 인식, Fable) → 안드로이드.

### 후속 후보 (아이디어 메모, 확정 X) — 추가분
- **PWA 설치 배너 문구 정리** (2026-07-04 Irene 질문): 현재 "Install Purple POS / Install this app for push notifications, a standalone window, and faster access / Install"은 **브라우저 기본 PWA 설치 프롬프트**(우리 문구 아님). "무엇이 설치/다운되는지" 명확히 하려면 커스텀 배너(PwaInstallContext/PwaInstallBanner)로 대체 필요. 윈도우 .exe 다운로드와 구분 표기도. Irene 문구 방향 결정 후 착수.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.
- **AI Phase 0 (Irene 액션)**: ①GCP/Vertex 프로젝트+자격증명 ②안드로이드 태블릿1+BT프린터 ③#8 데이터소스 결정(직원/고객 지표 원천 없음 → 숨김 vs 추적기능 신설).
- 앱 진입 UX(아래) — 안드로이드/윈도우 앱 완료기준.
- Lingo 상세 개발설계(Fable)·dev 서브도메인. 오더노트 실프린터 눈확인. IOI Mall 매출 API 운영전환(+ mallSalesService.js:289 타임존 검토).

---

## 📌 앱 진입 UX 요구 (2026-07-03 Irene 지시) — 안드로이드/윈도우 앱 공통
- **접속 즉시 바로 접근 가능한 "제대로 된 UI/UX"**여야 함. 앱(안드로이드·윈도우) 실행→로그인→POS 도달까지 매끄럽고 정돈된 진입경험 필수. 스플래시/로그인/기기설정 화면 품질 = 앱 작업 완료기준에 포함.

## 🧭 개발 순서 로드맵 (2026-07-03, Fable 판단 · Irene 위임 · 정석대로)
원리: ①살아있는 제품의 능동적 피해부터 멈춤 ②저위험 성과+미래자산 ③프리미엄 빌드 ④리드타임 항목은 Day0 병렬. 트랙 간 코드충돌 없음(FE/BE/네이티브), 인쇄 8파일 무접촉.
- **P0(즉시 병렬, Irene 액션):** Vertex 세팅(→AI TrackB) · 안드로이드 하드웨어(→Track3 실기기) · #8 데이터소스 결정(→#8·#38).
- **P1 라이브 정합성:** #31 PhoneInput ✅ → 브랜드-인벤토리 클러스터(#5/6/36/23/35, 5-for-1) → #24 구독 미저장(돈=Fable게이트).
- **P2 빠른성과+B예열:** AI Track A(아이템 썸네일·탭상세, 순수FE·저위험, P1과 병렬 가능). 매장이 사진 채움→Track B 정확도 레퍼런스.
- **P3:** #8 Manager Reports + #38 Customer Insights(실 analytics 엔드포인트).
- **P4 프리미엄:** AI Track B(카메라 인식→Serve, Enterprise게이트, Fable게이트).
- **P5:** 안드로이드 완성(에뮬 단계 P1~P4 병렬, 실기기 V1~V4는 하드웨어 후). ⚠️예외: 안드로이드 인쇄 막혀 영업지장 라이브 매장 생기면 즉시 P1급.
- 한 줄: (P0 병렬)→#31✅→인벤토리클러스터→#24(Fable)→AI TrackA→#8+#38→AI TrackB(Fable)→안드로이드.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
