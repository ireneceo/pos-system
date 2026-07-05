# Purple POS — 개발 세션 상태

## 현재 작업 상태

**마지막 업데이트:** 2026-07-05 (이메일 감사=스팸원인+미인증 반복발송 진단·설계문서화 / 미배포 dev(레거시 supplier 쓰기중단) /검증 재통과 PASS)
**작업 상태:** 중단 (이어서 재개 예정)

---

## ⚡ 빠른 재개 (새 세션에서 이것만 붙여넣기)
```
session-state.md 읽고 이어서 개발해.
```

---

## 🔖 지금 중단 지점

**마지막 작업:** 이메일 감사 2건 완료 — ①스팸=발신도메인 인증(SPF/DKIM/DMARC) 부재+From불일치(코드 아닌 DNS문제) ②"인증 안된 주소로 자꾸" = subscriptionScheduler/예약리마인더가 users에 없는 자유입력 주소로 반복발송. 둘 다 `docs/EMAIL_SYSTEM.md`에 진단+조치 박제. + 미배포 dev(레거시 supplier 쓰기중단) /검증 10단계 재통과(PASS, 배포준비완료).

**바로 다음 작업 (Irene 선택 대기):** ①`/배포`(레거시 supplier 쓰기중단, Fable PASS+검증 PASS 완료분) / ②#24 Manager 구독 변경/취소 미저장(Fable 돈게이트) / ③미인증 suppress-list 구현(설계됨, 청구인접→Fable). + Irene 액션: purplehere.com DNS 3종(SPF/DKIM/DMARC) 발행.

**맥락 유지:**
- 이메일 코드/템플릿은 양호(멀티파트·CID로고·바운스가드). 스팸은 순수 DNS. `screenRecipients` 전역 차단으로 바꾸면 정당한 초대·비번재설정까지 막히므로 금지 — 반복 스케줄러에만 suppress.
- 미배포 dev = 커밋 a0a9e616(운영 7bd7d3ed 이후). /배포 시 함께 나감.

---

## 📦 이번 세션 작업 요약
- 이메일 미인증 발송 누수 전수 감사(누수=비-users 자유입력 주소, 반복 스케줄러 4곳)
- 스팸/전달률 감사(SPF/DKIM/DMARC 실조회=purplehere.com 전무, From 불일치)
- `docs/EMAIL_SYSTEM.md`에 DNS 런북 + suppress-list 설계 추가
- 미배포 dev(레거시 supplier 쓰기중단) /검증 10단계 재통과 PASS

**커밋:** bc9a295b (wip auto-save, 이메일 문서 포함). 미배포 코드=a0a9e616.

---

## 📋 작업계획 (단일 소스)

### 진행 중인 작업
- 없음 (이메일 감사·설계 완료, 구현은 Irene 선택 대기)

### 다음 확정 작업 (Irene 지시 = 로드맵대로)
- 아래 3택 대기: ①미배포 dev `/배포`(레거시 supplier 쓰기중단) ②#24 Manager 구독 변경/취소 미저장(Fable 돈게이트) ③미인증 suppress-list 구현(EMAIL_SYSTEM.md 설계, Fable). 로드맵 순서=#24→AI TrackA→#8/#38→AI TrackB→안드로이드.

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. Irene 지시 기준.
- **이메일 스팸 = purplehere.com DNS(SPF/DKIM/DMARC) 발행 + smtp_user를 help@purplehere.com으로** (Irene/도메인관리자 액션, 런북 EMAIL_SYSTEM.md). 코드 P3=List-Unsubscribe 헤더·text/plain 항상.
- PWA 설치 배너 문구 커스터마이징(브라우저 기본 문구). AI Phase0 Irene 액션. Lingo 상세설계. IOI Mall 매출 API 운영전환(mallSalesService.js:289 tz).
**버전:** 운영=**v3.66 / SW 4.58** (2026-07-04 배포 Backup 20260704_061942, Smoke 9/9). dev 에 레거시 supplier 쓰기중단 미배포분 있음(운영배포는 /배포 지시 때).

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-07-04 #2, dev 검증완료·미배포)
- **레거시 `supplier_name`/`supplier_id` 쓰기 중단 (설계 ④ step2) + P0-5 완전 read-only** — "발주/재고 이름·코드 분리(유저 vs 공급업체)" P0 의 마지막 후속. 이걸로 해당 작업 **완전히 닫힘**.
  - 백엔드 3라우트: `ingredients.js`(RA+BG create/update)·`restaurants-ingredients.js`(RA create/update)·`product-ingredients.js`(BG create/update) — create=레거시 컬럼 null 고정, update=목록 제외(기존값 보존, API 로 수정 불가). 별개 서브시스템(general-stock/inventory-*)·supplier 가입경로 **무접촉**(최소범위).
  - 프론트: `RecipeManagement/IngredientsTab.tsx` "Default supplier" 쓰기 셀렉트 제거→레거시값 read-only 표시+seller-source 유도, create/edit/track-toggle 페이로드 supplier 미전송. `BrandProductRecipe/ProductIngredientsTab.tsx` track-toggle 정리.
  - **백필 = 미실행 (Irene 결정 "자연 이관")**: 매핑은 seller_product_id(NOT NULL)+활성 SupplierContract 를 요구 → 레거시 12건(dev) 이관하려면 SupplierCompany+SupplierProduct+계약을 행마다 날조해야 함(데이터 품질↓). 쓰기중단으로 향후 드리프트 차단됐고 레거시값 read-only 유지되므로, 다음 주문 때 seller-source 1클릭으로 자연 이관(업계 표준 lazy migration). 설계 ④ 에 결정 명시.
  - **검증**: 실 API 왕복(create/update 레거시 null 고정·비레거시 저장·seller 표시 shape 유지 25건) / build+dev배포(내 파일 에러0) / print-guard 보호8 **무접촉**(git 확인, 보고된 billPrint·MainLayout 델타=기존 데스크탑P2 미-bless) / design-guard 신규0 / health 106/107(1=기존 데스크탑 print 델타, 신규실패0).
  - **Fable 게이트 = 실행완료·VERDICT PASS** (Fable 세션 독립검증): 절단면 정확 일치(범위외0)·인쇄 보호8 무접촉(git 교차확인)·쓰기중단/레거시값 보존 실증 25/25·발주 경로(`ingredient_seller_product_id` 기반) 무영향·마이그0·롤백 git revert 안전. 경미 비차단 1건=IngredientsTab `suppliers` fetch dead code(다음 정리). **운영 배포는 Irene /배포 지시만.**

### 완료된 작업 (이번 세션 — 2026-07-04, 운영 배포됨)
- **P1 브랜드-인벤토리 브랜드모드 클러스터 (#5/6/23/35/36)** — dev 검증완료. 브랜드모드 액션 훅 mode-aware화: useSettingsModal(brand→PUT /product-ingredients/:id) / useOrderModal(brand seller-sources 경로 + PO item=**product_ingredient_id**, 안 그러면 Ingredient 테이블 조회 실패로 발주 깨짐) / useAlertResolver(brand alert=클라생성이라 로컬 제거) / useIngredientAdjustModal(brand→adjust-stock, 히스토리 기록) / InventoryManager(mode 전달) / TransactionHistorySection(brand→신규 `/api/product-ingredients/transactions`, 기존 general-stock 오조회 수정=#23뿌리) / product-ingredients.js(GET /transactions [/:id보다 먼저 등록] + adjust-stock에 InventoryTransaction 기록=#36).
- **P0 "재고아이템 vs 공급업체 판매품목" 이름/코드 분리표시** — 설계·판단 단일진실 `docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md`(Fable). 내부 재고 name/code(내 것) + 공급업체 판매품목 name/sku(공급업체 것) 화면 병기, 스키마 변경 0. Irene 기준 = **copy-on-link(연결등록 시 판매품목명 기본=내부명·수정가능, SKU 별도) + 독립편집**.
  - 백엔드: seller 응답 name/sku 추가(`ingredients.js`·**`restaurants-ingredients.js`=RA 실핸들러**·`product-ingredients.js`·`ingredient-seller-products.js`, SupplierProduct join paranoid:false) / PO PDF SKU열+판매품목명 주·내부명 buyer ref(`purchase-orders-workflow.js`) / PO 상세 아이템 플래튼(`purchase-orders-crud.js`) / 공급업체 수신함 name/sku(`seller-orders.js`).
  - 프론트: 재고 seller목록·피커·주문드롭다운 / 장바구니(NewPurchaseOrderPage) / PO상세 / 공급업체수신함(IncomingOrdersView) / 외부등록폼 name+sku(IngredientsTab) / 레거시 supplier "Default supplier" 라벨 강등+안내.
  - **교훈(실호출로 잡음)**: RA `?include=sellers` 실제 핸들러는 `ingredients.js`(468)가 아니라 **`restaurants-ingredients.js`** — 첫 편집이 죽은 경로였음. /검증 3단계 실호출로 발견·수정.
  - /검증 10단계 전부 통과: hydration0 / timezone 신규0 / build TS에러0 / API 실호출(seller name/sku 왕복·익명401·Write→Read) / 헤드리스 70/70 mount0크래시 / print-guard 보호8 무접촉 / design-guard 신규0 / health 106/107(1=기존 데스크탑red). **Fable 게이트 VERDICT: PASS**(diff 절단면 준수·읽기전용 표시·발주 무결성·마이그0).
- **후속**: ~~레거시 `supplier_name`/`supplier_id` 쓰기중단~~ ✅(2026-07-04 #2) / ~~P0-5 완전 read-only~~ ✅(2026-07-04 #2) / 멱등 백필=**미실행 결정(자연 이관)** / PO PDF·seller name HTML escape 헬퍼 일괄(Fable 비차단 메모, 미착수).

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
