# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

### 2026-04-19
- Sidebar 실시간 뱃지 갱신 — 전역 소켓 이벤트 `order-created/items-added/updated`에 뱃지 재조회 호출 추가 (기존 15초 polling 대기 → 즉시 반영)
- Contract 리스트 카드 UX — 금액 요약 블록 (플랜 연결시 플랜 값, 미연결시 financial_terms + "pending plan" 힌트), 잔여기간 태그 (expired/warning/normal), Foodcourt 카드 유닛/location_description 표시. 공용 헬퍼 `utils/contractBillable.ts` 신규 (getBillableSummary, getRemainingInfo)
- Contract 리스트 파이프라인 레이아웃 정렬 — Column 회색 배경 제거, gap 8px, width 100% — 상단 StatsGrid 와 좌우 full 정렬
- Contract Detail Tab → Smart Accordion 전환 — Parties/Contract/Setup/Documents 4개 섹션 아코디언화. `FormAccordion`+`FormAccordionSection` 신규 컴포넌트, 섹션별 상태 배지 (✓ Complete / ⚠ N required), RequiredBanner 집계 + chip click→scroll, ReadyBanner 초록 안내, 외곽 박스 제거 (선 구분만)
- Contract Detail 필드 하이라이트 — 필수 부족 필드 빨간 테두리 + 인라인 에러 메시지, chip 클릭시 보라 pulse 애니메이션 (1.2s × 2회) 및 smooth scroll
- 버튼 정책 전환 — "필수 부족 시 disabled" → "클릭 허용 + 자동 섹션 펼침/스크롤". UI_DESIGN_GUIDE 4.4 개정
- Notes & Comments 제목/구분선 중복 제거 — CommentSection `titleText` prop + `$embedded` 스타일 (외부 제목 없애고 "Notes & Comments (N)" 단일로 통합)
- Documents 필수 제거 — 외부 DMS 사용 가능 반영. Contracting→Setup 전환 시 Documents 업로드 강제 요건 삭제
- P0 #1 Foodcourt `unit_id` 필수 — Contracting→Setup 시 entity_type='foodcourt' && !unit_id 검증 추가 (기존 허점 보완)
- P0 #2 Applicant 식별 OR 조건 — `applicant_company_name` 또는 `applicant_contact_person` 중 하나만 있으면 통과 (개인 자영업자 대응)
- P0 #3 `contract_tasks.is_required` 필드 신규 — Setup→Active 전환 시 `is_required=true` task만 완료 요구. Marketing 지원 등 진행형 task 유연성 확보. SetupChecklist UI 에 Required/Optional 토글
- i18n 4개국어 13키 추가 (en/ko/zh/ms) — banner/section/applicant/unit/task 관련
- Accordion 패턴 UI_DESIGN_GUIDE 14장 신설
- 설계 문서 `docs/CONTRACT_DETAIL_UX.md` 실제 구현 기준으로 최신화

### 2026-04-18
- Contract Management Enhancement Phase 1 구현 — 당사자/발행자 정보 확장 + 4탭 UI (Parties/Contract/Setup/Documents), 신규 컴포넌트 3개 (BankInfoField, RepresentativeField, SyncMasterToggle)
- Contract Phase 1.5 — Brand/Foodcourt 마스터 정보 수정 시 issuer_sync_with_master=true 계약(proposal/contracting/setup 단계만) 자동 전파 훅
- Contract Phase 2 — Tenancy/Franchise 재무 조건 확장, RentScheduleEditor(연도별, 모바일 카드 뷰) + PercentageRentField 컴포넌트, financial_terms JSON 스키마 validate 훅
- Contract Phase 3 — 계약 조항 5종 JSON 컬럼 추가 (special_conditions/renewal_policy/exclusivity_terms/support_services/legal_terms), Support Services 카탈로그 (Brand/Foodcourt 각 12개), Setup 단계 진입 시 체크된 지원업무 항목 자동 태스크 생성, 신규 컴포넌트 3개 (ConditionListEditor, SupportServicesChecklist, LegalTermsEditor)
- Contract 필수 필드 UX — 라벨에 빨간 `*` 표시 + 필수 미입력 시 상단/하단 "Proceed" 버튼 disabled + tooltip + 단계 전환 에러에 누락 필드명 구체화
- Contract Detail 상단 HeaderActions — 긴 스크롤 없이 상단에서도 "Proceed to X" / "Renew" / "Terminate" 액션 가능 (하단 버튼과 동기화)
- Inquiry Close 버튼 버그 수정 — Brand/Foodcourt Operation Inquiry 카드의 Close 버튼 PATCH → PUT 메서드 변경 (silent fail 해소)
- Inquiry 모달 Close 버튼 UX 변경 — 우측 상단 X = 모달 닫기, 하단 Close Ticket 버튼 = 티켓 상태 closed로 변경 (이미 closed/resolved면 버튼 숨김). 11개 Inquiry 페이지 전체 적용 (Operation × 5 + System × 6)
- UI_DESIGN_GUIDE 4.3/4.4 신규 섹션 — 주요 액션 버튼 상단/하단 양쪽 배치 규칙 + 필수 미입력 시 버튼 비활성화 규칙 명문화
- `/검증` 스킬 8단계 UI/UX 품질 확장 — 7개 서브카테고리 (디자인 시스템/트렌드 디테일/기능 적합성/반응형/i18n/접근성/실제 확인 방법)

### 2026-04-17
- Contract Management Enhancement 설계 완료 (4단계 + 30년차 3개 관점 검증 반영) — 구현은 다음 세션. 주요 보완: issuer 마스터 동기화 토글, financial_terms JSON 검증, Support Services↔Tasks 연동, legal_terms 컬럼, 4탭 인터페이스 도입
- Contract Information 레이아웃 재구성 — 2열×3행 6필드 (Number/Type/Period/SigningDate/Duration/Remarks)
- Contract Franchise/Tenancy Terms 통화 심볼 표시 (`RM 5,000.00` 형식) + Security Deposit 필드 재확인
- Contract Applicant Information 분리 — "Name" 하나 → "Company Name" + "Contact Person" 2개
- ContractDetail 자동저장 실패(빨간 !) fix — whitelist 필드만 PUT
- Link Restaurant 검색 수정 — 백엔드 search/limit 쿼리 지원
- Brand General Dashboard — Active Contracts 위젯 신규 (총 개수 + 최근 5개 목록 + View all)
- Date Input 전면 통일 — `<input type="date">` 42곳 제거, DateField/DateRangeField 컴포넌트 신규 (25개 파일 적용)
- C-6 거대 컴포넌트 분할 — LiveOrders/Admin·Brand·Foodcourt Invoices 4개 파일 17,452→7,015줄 (60% 감소)

### 2026-04-16
- 모바일 주문 영수증 다운로드 (PNG) + 공유 (WhatsApp/Telegram/Web Share) 기능 추가
- 모바일 주문 API 응답에 재무 데이터 + 레스토랑 정보(사업자번호/세금번호) 포함
- branch_name 표시 전수 점검 — 25개 파일 일괄 `getRestaurantDisplayName()` 유틸 적용
- Recipe 이미지 base64 → 파일 전환 (3건 마이그레이션)
- N:M 조인 테이블 DROP — `brand_product_brands`, `supplier_brands` 삭제 + 죽은 코드 제거
- 구독 전환 이메일 보강 — Active→Overdue, Entity(Brand/Foodcourt/Owner) 전환 알림 추가
- 인보이스 연체 리마인더 — D+3/D+7/D+14 발행자 SMTP로 자동 발송
- 타임존 전체 적용 — `toLocaleString` 계열 ~200곳 유틸로 교체 (~74파일)
- nginx 권한 수정 — 500 에러 해결
- `/기능설계` 스킬 신규 추가 (대규모 기능 개발용 6단계 체계)

### 2026-04-15
- 모바일 주문 카테고리 전환 시 전체 페이지 리로딩 현상 제거 (inline fetch, isLoading 상태 토글 생략)
- 모바일 이미지 파이프라인 전면 재작성 — base64 저장 구조를 파일 URL 로 전환, 운영 DB `products.image` 35.4MB → 0.01MB (289건 sharp 변환)
- 모바일 상품 상세 API 500 에러 복구 (`getPreparationTime is not defined` ReferenceError)
- 모바일 메뉴 카테고리별 초기 로드 + 메모리 캐시 (`categoryCacheRef`) — 재방문 시 네트워크 0
- 이메일 엔티티 브랜딩 시스템 구축 — Restaurant/Brand/Foodcourt 자체 로고·이름·색상을 이메일 헤더/푸터에 반영
- 고객 비밀번호 리셋 메일: 레스토랑 SMTP 우선 → 없으면 플랫폼 fallback, 항상 레스토랑 브랜딩 유지
- Notification 이메일 (공지/댓글/인보이스/티켓): 수신자 entity 브랜딩으로 자동 재렌더 (notificationTemplates metadata + notificationService 재렌더 파이프라인)
- 엔티티 브랜딩 이메일에서 PurpleHere 로고/링크 완전 제거 (헤더 `<a>` 래퍼 + 푸터 링크 + unreferenced CID 첨부 모두 조건부 제거)
- `emailLayout` 로고 텍스트 fallback — 로고 없는 엔티티는 브랜드 이름 텍스트 표시 (PurpleHere 기본 로고로 오해되던 문제 해결)
- 이메일 로고 바이너리 pre-resize (sharp, height 40px / max-width 280px) — CSS 스케일링 의존 제거로 와이드 배너 overflow 방지
- System Admin 발송 메일(POS 비밀번호 리셋/회원가입 환영/랜딩 문의 등)은 기존과 완전 동일 (PurpleHere 브랜딩 유지)

## [v3.14] — 2026-04-14 배포

### 공지 가시성 + Updates 카테고리 배지 (배포 2 — hotfix)
- **증상 1**: 릴리즈 공지가 `/pos/admin/notices` 에 안 보임. 이전 v3.13 공지까지 전부 누락
- **원인**: `/api/notices/sent` 가 `where: { author_id: req.user.id }` 로 본인 작성만 반환. release-post 스크립트가 author=1 로 고정 생성 → Irene(id=4) 로그인 시 0건
- **수정**: System Admin 로그인 시 `author_id IN (모든 System Admin ids)` 로 확장. 다른 역할은 기존대로 본인 작성만
- **증상 2**: 리스트가 "NORMAL" 만 보이고 Updates 카테고리 표시 없음
- **원인**: `NoticesPage.tsx` 5개 역할 모두 `notice.category === 'guide'` 만 배지 렌더, `updates` 누락
- **수정**: 5개 역할 페이지 전부 `updates` 카테고리에 보라색 "Updates" 배지 추가 (기존 `guide` 패턴 재사용)
- **검증**: 운영 Irene (id=4) `/sent` 응답 0 → 14건 (v3.14 포함). 배포 2 smoke 10/10 (07:14 UTC, `main.3fe57608.js`)

### 인보이스 발행자 은행계좌 정보 복구 + PDF 안전 분할
- **증상**: Brand/Foodcourt 가 Payment Settings 모달에 입력한 은행계좌가 인보이스 뷰/프린트/다운로드 어디에도 표시 안 됨. 2장 넘는 긴 인보이스는 PDF 다운로드 시 글자 중간에서 잘림
- **원인 1**: `invoices-helpers.js getIssuerCompanyInfo` 가 brand/foodcourt 분기에서 legacy `brand.bank_name` 직접 컬럼만 읽고 `payment_settings.bankTransfer[currency]` JSON 을 무시
- **원인 2**: 메인 `/api/invoices` GET transform 이 `issuerInfo` 필드를 응답에 포함 안 함. Admin 프론트는 `companySettings.bankName` (별개 엔드포인트) 을 사용하는데 여긴 은행정보 없음
- **원인 3**: 5개 역할 페이지 모두 `html2canvas` → 단일 PNG → 297mm 고정 height slice 로 기계적 분할. 행 중간 절단 방지 장치 없음
- **수정 (백엔드)**: `extractBankFromPaymentSettings(payment_settings, currency)` 헬퍼 추가. brand/foodcourt 분기에서 payment_settings 우선, legacy 컬럼 폴백. 메인 GET 에 `issuerInfo` 추가 (캐시로 N+1 방지)
- **수정 (프론트)**: `dev-frontend/src/utils/invoicePdf.ts` 신규 — `renderIframeToPdf()` 로 캔버스 픽셀 행 스캔 (흰색 행) 후 안전 분할. `INVOICE_PRINT_CSS` 상수 — `.summary-section`, `.items-table tr`, `.bank-section` 등에 `page-break-inside: avoid`. 5개 invoice 페이지 (Admin/Restaurant/Brand/Foodcourt/Owner) 모두 공통 util 호출로 중복 로직 제거
- **수정 (Admin/Brand/Foodcourt view)**: HTML 템플릿 + React 뷰 모달 모두 `invoice.issuerInfo?.bankName` 우선, `companySettings` 폴백
- **검증**: API 실호출 — System Admin 34건 중 33건 issuerInfo.bankName 채움 (1건 EUR 미설정), Brand General 8건 전부 `payment_settings.bankTransfer.MYR` 기반 bank info 매칭. health-check 39/39. 뷰/프린트/다운로드 3경로 모두 표시 확인

### Kitchen Stations 3개 이슈
- **증상 1**: 신규 레스토랑이 메뉴 아이템에 카테고리 다 배정했는데도 "2 uncategorized menu items" 오경고 표시
- **원인**: `SettingsPage.tsx:4697` 필터가 `p.category` 를 검사하는데 백엔드 `/api/menu` 응답은 `categoryId` (camelCase) 로 반환 → 항상 undefined → 전부 오탐
- **수정**: `p.categoryId ?? p.category_id` 둘 다 허용
- **증상 2**: 주방이 1개뿐인데도 복잡한 Assignment Mode 카드 + 경고 배너 표시. 사용자가 "세팅 안 해도 되는데 헷갈린다" 호소
- **수정 (백엔드)**: `kitchen-stations.js GET /` 에서 stations 0개이면 "Kitchen" default station 자동 INSERT (lazy create)
- **수정 (프론트)**: stations ≤ 1 일 때 초록색 안내 배너 ("You have 1 kitchen station. All orders will be routed here. No setup needed.") 표시 + Assignment Mode 카드 + Unassigned 경고 블록 숨김
- **증상 3**: 대시보드 "Complete Your Setup" 체크리스트에서 "Set up Kitchen Stations" 가 설정 후에도 체크 안 됨
- **원인**: `useSetupStatus.ts:103` 가 `result.data` 를 array 로 취급하는데 실제 응답은 `{ data: { assignment_mode, stations: [...] } }` 구조 → 항상 length=0
- **수정**: `result.data?.stations || []` 로 올바르게 파싱
- **검증**: lazy create idempotent (Settings/KitchenDisplay/Dashboard 3경로 동일 ID 반환, DB 중복 없음)

### Legacy email 템플릿 2개 → emailLayout() 교체
- **증상**: 운영에서 신규 회원가입 admin 알림 이메일이 옛날 템플릿으로 발송 — 로고 없음, 텍스트 `<h1>PurpleHere</h1>` 헤더, "No-reply email" 레거시 footer
- **원인**: 2개 사이트가 `emailLayout()` 미사용 raw HTML
  - `services/authService.js:437 notifyAdminNewSignup` (이번 운영 사건의 템플릿)
  - `routes/public.js:356` 문의 답변
- **수정**: 둘 다 `bodyContent` 만 구성 → `emailLayout(bodyContent)` 로 래핑. `sendPlatformEmail` 이 `cid:purplehere-logo` 자동 감지 → `getLogoAttachment()` 로 로고 CID 첨부
- **검증**: 테스트 이메일 실발송 → 신규 템플릿 렌더링 확인 (액센트 바 + 로고 + preferences footer). 다른 모든 email 발송 사이트 감사 — 모두 `emailLayout()` 기반 정상

### POST /api/restaurants 역할 가드 보강 (HIGH 보안 갭)
- **증상**: `POST /api/restaurants` 에 `requireRole` 미들웨어 없음. `validateBrandPermission` 은 brand_id 파라미터가 있을 때만 작동하므로 Restaurant Admin/Staff/Customer 가 brand_id 생략하고 호출하면 restaurant 생성 가능
- **수정**: `restaurants-crud.js:638` 에 `requireRole('System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner')` 명시 추가. 회원가입 흐름은 `authService.js:193 Restaurant.create` 직접 호출이므로 이 endpoint 미경유 — 영향 없음
- **영구 안전망**: `scripts/health-check.js` 에 "Restaurant Admin POST /restaurants → 403 (역할 가드)" regression test 추가 (39 → 40)
- **검증**: 8개 역할 매트릭스 — 6 allow + 2 BLOCK. Attack 시나리오 — Restaurant Admin 가 POST 시도 → 403, DB 에 생성 안 됨. Write→Read 왕복 (System Admin) 201 → GET 200 확인

## 2026-04-13 배포 4 — Brand Cross-Tenant 누수 fix (치명 보안, 버전 미상승)

### Brand General 격리 (운영 발견 누수)
- **증상**: BG 사용자가 다른 BG 소유 재료/공급업체/상품을 조회/수정 가능 (`/pos/brand-ingredients`, `/pos/suppliers`)
- **모델 정립**: 한 BG가 여러 brand를 소유 (`brands.owner_id`). 재료/공급업체/BG 프로덕트는 BG 소유자 단위 공유. 레시피는 브랜드별 사용
- **DB 변경**: 7개 BG-level 테이블에 `owner_user_id` 컬럼 추가 (`product_ingredients`, `product_ingredient_categories`, `suppliers`, `brand_products`, `brand_product_categories`, `brand_product_option_groups`, `brand_product_options`). 2개 brand-level 테이블에 `brand_id` 컬럼 추가 (`product_recipes`, `product_recipe_categories`)
- **운영 백필**: 기존 N:M 조인(`brand_product_brands`, `supplier_brands`) + 레시피→재료 추적으로 자동 백필. 한국 음식 K-DINE 시리즈 고아 데이터(재료 7건, 카테고리 4건, 레시피 2건, 공급업체 1건)는 K-DINE owner(user 23)에 수동 할당
- **신규 미들웨어** `middleware/brandScope.js`: `requireBGScope`/`applyBGFilter`/`assertBGOwnsRow` (BG 단위) + `requireBrandScope`/`applyBrandFilter`/`assertBrandOwnsRow` (브랜드 단위, `brands.owner_id` 검증)
- **라우트 패치 (6개)**: product-ingredients.js / product-ingredient-categories.js / product-recipes.js / product-recipe-categories.js / suppliers.js / brand-products.js — GET 필터 + POST owner 자동 세트 + PUT/DELETE 소유권 검증 (404 존재 은닉)
- **suppliers.js**: `|| supplier.connectedBrands.length === 0` 폴백 제거 (누수의 직접 원인). N:M `supplier_brands` 읽기 중단
- **`isBrandManager` free pass 제거**: URL에 brand_id가 없을 때 `Brand.count({where:{owner_id:user.id}})` 검증 (dangling BG 차단)
- **9개 모델** 업데이트 — owner_user_id 또는 brand_id 필드 추가
- **검증**: dev 21/21 격리 테스트 통과, health-check 39/39, 운영 smoke 10/10
- **운영 영향**: 배포 후 user 23(K-DINE)/user 24(K-Taste)/user 29(The Fire) 각각 본인 데이터만 표시. 교차 GET/PUT/DELETE 모두 404

### 이월 항목 (이전 [Unreleased])
- AddonModule 전체 역할 1:1 분리 (restaurant/brand/foodcourt/owner). 신규 8개 advanced 모듈: `work_manuals`, `ingredients`, `suppliers`, `brand_work_manuals`, `brand_ingredients`, `brand_suppliers`, `fc_work_manuals`, `owner_work_manuals`. dev + 운영 DB 직접 반영 (코드 변경 없음)
- `inventory_management` + `brand_inventory` 모듈 이름을 "Inventory & Supplier Management" → "Inventory"로 정리 (suppliers가 독립 모듈로 승격)
- 기존 플랜 자동 마이그레이션 없음 — System Admin이 `/pos/admin/plans`에서 수동 체크 필요

## 2026-04-13 배포 3 — 인보이스 안정화 + Dangling Admin 가드

### 인보이스 인쇄/PDF/View i18n + 레이아웃
- 인보이스 인쇄/PDF/View 모달의 i18n 키가 그대로 출력되던 버그 수정 (5개 역할)
- 인보이스 PDF가 1장에 잘리던 문제 해결 (다중 페이지 분할 + iframe 동적 높이)
- 인보이스 금액 RM이 줄바꿈되던 UI 깨짐 fix (`white-space: nowrap`)
- Pricing 페이지 탭별 URL 딥링크 (`/pricing?tab=brand` 등)

### 인보이스 정합성
- Payment Settings 변경 시 미결제 인보이스 자동 재계산 + "수정됨" 배지 자동 표시
- 시스템 자동 수정도 modification_history 기록 (수동 수정과 동일 UX)
- 인보이스 view 모달 크래시 fix (modification_history 이중 인코딩 + 양형식 호환 렌더러)
- Hardware 인보이스 QTY/단가 표시 정상화 (description "x4" → 별도 quantity 컬럼)
- Hardware Quote 모달 payment_settings 자동 로드
- 인보이스 삭제 시 hardware_quotes FK 해제 (500 에러 제거)

### Brand ↔ Restaurant 연결
- Brand General 레스토랑 생성/편집에 "Link to Brand" 드롭다운 신규 (브랜드-레스토랑 연결 UI)

### Dangling Restaurant Admin 가드 (치명)
- 백엔드 `POST /api/users`: role이 Restaurant Admin/Staff인데 restaurant_id 없이 생성 요청 시 400 차단
- 백엔드 `PUT /api/users/:id`: restaurant_id 클리어 또는 role 변경으로 dangling 상태 만드는 시도 차단
- 백엔드 `POST /api/users`: `skipVerification is not defined` ReferenceError 수정 (req.body destructure 누락)
- 프론트 `App.tsx`: `user.restaurantId || '1'` 하드코딩 폴백 제거 — dangling 사용자에게 `NoRestaurantAssigned` 에러 화면 렌더 (다른 테넌트 누수 차단)
- 프론트 `ProtectedRoute.tsx`: restaurant-scoped 역할이 restaurant_id 없이 `/restaurant/:id/*` 접근 시 `/pos`로 바운스. `|| '1'` 폴백 4건 모두 제거
- 프론트 `LoginPage.tsx` / `OperationInquiryPage.tsx`: 하드코딩 폴백 정리

## 2026-04-13 배포 2 (v3.13 유지 — 회계/인보이스 정합성 복구)

### Payment settings → Invoice additional_charges 자동 적용 (치명)
- fix(services/subscriptionInvoiceService.js): 기존엔 tax 6% 하드코딩이었는데, 이제 `SystemSettings.payment_settings.additionalCharges[currency]`에서 조회해 적용. enabled=true + rate>0 인 charge만 필터. 각 charge를 `{name, rate, amount}` JSON으로 `invoices.additional_charges` 컬럼에 저장
- fix: `invoices` 테이블의 `total_amount`가 base + 모든 charge 합으로 정확히 계산됨 (이전엔 6% 고정이라 SST 이외의 service charge 등이 누락)
- fix(syncPendingInvoice): 비교 로직에 `additional_charges` 포함. total_amount는 같아도 charges JSON이 다르면 업데이트 수행

### A 방안: Activate Subscription 토글 (하드웨어 전용 고객 대응)
- feat(restaurants-crud.js POST): `activate_subscription` 플래그 수용. false면 `createInitialInvoice` 호출 skip
- feat(Admin/RestaurantsPage 생성 모달): "Activate subscription now" 체크박스 추가. 기본 ON (backward compat). OFF 시 주황 배경 + 경고 텍스트 "No subscription invoice will be generated"
- 유스케이스: 하드웨어만 주문한 고객 / 플레이스홀더 계정 / 파트너 셋업 등 — 구독 결정 전까지 인보이스 미발행. 나중에 PUT으로 플랜 변경 시 자동 동기화 (no_pending → createInitialInvoice 전환)

### Unknown Restaurant 표시 제거
- fix(routes/invoices-main.js): customerName/customerCompany/payerName/restaurantName 전부 폴백 체인 변경. `restaurant?.name → external_payer_company → external_payer_name → '—'`. "Unknown Restaurant" 텍스트 완전 제거

### 운영 DB 인보이스 정비
- chore: INV-2025110001 (Sunway Pyramid Basic Annual) — additional_charges=[{SST, 6, 29.40}] 수동 추가
- chore: INV-2025110002 (KFC Professional Monthly) — additional_charges=[{SST, 6, 5.94}] 수동 추가
- INV-2026040001 (Enterprise)는 이미 정상 (189.74 + SST 10.74)

### 선행 이슈 기록 (다음 세션)
- `POST /api/restaurants`에 `requireRole` 없음. Staff/Brand Manager도 restaurant 생성 가능한 보안 갭. DEVELOPMENT_PLAN.md에 HIGH로 기록

## 2026-04-13 배포 (v3.13 유지 — 시스템관리자 버그 수정 위주)

### 구독 플랜 한도 시스템 정합성
- fix(users.js POST): Staff / Restaurant Admin 생성 시 `staff_limit` 체크 로직 추가. 초과 시 403 + `{limit, current, upgradeRequired}` 반환. 이전엔 플랜 한도 무시하고 무제한 생성 가능했음 (치명)
- fix(subscriptions.js): Downgrade 검증에 `order_limit` 체크 추가. 기존엔 staff/menu만 체크 → Professional→Basic 같은 다운그레이드 시 월 주문 한도 위반해도 통과하던 버그
- feat(Profile/SubscriptionTab): 플랜 사용량 섹션 신규. Staff / Menu Items / Orders (this month) 3개 카드 + 진행바. 80% 접근 시 주황 경고 배너, 100% 도달 시 빨강 차단 배너 자동. 이전엔 백엔드가 `current_usage` 반환하는데 프론트가 렌더 안 함
- fix(Profile/SubscriptionTab): Unlimited 플랜(`-1`) 처리 추가 — "Unlimited" 텍스트 표시, 진행바 숨김

### 사용자/매니저 검색 수정
- fix(users.js GET): `?search=` 파라미터 지원 추가. `%term%` LIKE substring 매칭으로 중간글자 검색 가능. 이전엔 param이 무시되어 프론트가 전체 목록을 받고 `slice(0,20)`으로 잘라서 알파벳 순 상위 20명만 보이던 버그 — Hardware Quote 등에서 Restaurant Admin 검색이 작동 안 하던 근본 원인
- fix(users.js GET): `?q=` 파라미터도 backward compat로 수용

### Hardware Quote → Link Restaurant Admin 전용
- feat(Admin/HardwareQuotesPage): "Link User" → "Link Restaurant Admin" 이름 변경. 하드웨어 인보이스가 레스토랑 관리자에게 청구되므로 역할 명확화
- feat(Admin/HardwareQuotesPage): 검색 쿼리에 `role=Restaurant Admin` 필터 추가 + client-side 이중 필터 방어. 다른 역할(Manager, Staff 등) 노출 차단
- feat(Admin/HardwareQuotesPage): 모달 내부에 설명 텍스트 추가 ("Only Restaurant Admins are shown — hardware invoices are billed to the restaurant admin")
- feat(Admin/HardwareQuotesPage): 검색 결과 없음 메시지 명확화 ("No Restaurant Admin found matching your search")

### 공지 Updates 카테고리 UI
- feat(NoticesPage x5 — Admin/Brand/Foodcourt/Owner/Restaurant): 카테고리 필터 탭에 `Updates` 추가. 이전엔 백엔드 Notice.category ENUM에 'updates' 있는데 프론트 타입/필터/라벨이 'general'/'guide' 만 하드코딩되어 Updates 카테고리 공지(v3.0.1~v3.13 릴리즈 노트 12건 포함)가 탭에서 필터링되지 않던 문제

## [v3.13] — 2026-04-12 배포 (구독/인보이스 시스템 정합성 복구 + 업무매뉴얼/News 신규)

### 구독/인보이스 정합성 복구 (치명 버그 수정)
- fix(users.js POST): Brand General / Foodcourt General 유저 생성 시 구독 필드(plan_type, plan_amount, billing_cycle, subscription_start/end, trial_end_date 등)가 저장 안 되던 버그. role 체크가 'Restaurant Owner' 만 되어 있어 Brand General/Foodcourt General은 프론트에서 보낸 구독 정보가 무시됨. 이게 프로덕션에 Brand/Foodcourt 인보이스 0건인 근본 원인
- fix(users.js POST): Restaurant Owner 구독의 `calcSubscriptionEnd` 변수가 정의 안 되어 `subscription_end`가 `undefined` 저장되던 버그
- fix(users.js POST): `subscription_status` 논리 오류 — `subscription_start ? 'active' : 'trial'` 이 아니라 "start가 미래면 trial, 오늘/과거면 active"로 수정
- feat(users.js POST): Brand General / Foodcourt General / Restaurant Owner 생성 시 첫 구독 인보이스 자동 발행 (레스토랑 생성과 동일 패턴)
- feat(users.js PUT): 구독 필드 변경 시 미결제 인보이스 자동 동기화. 미결제 인보이스 없으면 신규 생성
- feat(restaurants-crud.js PUT): 구독 필드 변경 시 미결제 인보이스 자동 동기화. 결제된 인보이스는 절대 건드리지 않음 (`status IN ('draft','pending_payment','overdue')` 필터)
- fix(invoiceScheduler.js `isTodayAdvanceOf`): 정확히 14일 전인 날에만 true 반환하던 1일 창문 브리틀니스. Catch-up 모드(`today >= generationDate`)로 전환. cron 하루 실패해도 다음날 발행됨. 중복 방지는 기존 `billing_period_start` 체크로 보장

### 리팩토링 — 공용 인보이스 헬퍼
- refactor(services/subscriptionInvoiceService.js 신규): Restaurant/User 공용 `createInitialInvoice(subject)` + `syncPendingInvoice(subject)`. 기존 `routes/restaurants-crud.js` 의 인보이스 생성 로직을 헬퍼로 교체. `invoice.modification_history` JSON에 before/after/reason 감사 추적 기록
- refactor(utils/subscriptionDates.ts 신규): `calcEndDate`, `deriveStatus`, `calcTrialEnd`, `formatDateISO`, `parseDateLocal` 공용 날짜 함수

### 레스토랑/매니저 등록 UI
- feat(Admin/RestaurantsPage): End Date 필드 readonly 전환 (자동 계산, 회색 배경). Start Date 변경 시 `+1개월-1일`(Monthly) 또는 `+1년-1일`(Annual) 자동 재계산
- feat(Admin/RestaurantsPage): Billing Cycle 변경 시 End Date 즉시 재계산
- feat(Admin/RestaurantsPage): "Apply 7-Day Free Trial" 체크박스 → "Treat as trial until subscription starts"로 일반화. 7일 하드코드 제거. Start Date가 미래면 그 기간이 자동으로 트라이얼 (20일/30일/자유)
- feat(Admin/ManagersPage): `calcSubscriptionEnd` 함수에 `-1일` 규칙 적용 (기존: +1개월, 수정: +1개월-1일)
- fix(Admin/RestaurantsPage 편집 모달): 트라이얼 체크박스 신규 추가 (기존에는 편집 시 변경 불가였음)

### 업무매뉴얼 (신규 기능)
- feat: 5개 역할(Admin/Brand/Foodcourt/Owner/Restaurant) 전용 업무매뉴얼 메뉴 추가. 블로그 형식 카드 그리드 + 상세 모달 + 댓글
- feat: 스코프별 격리 (System=company-wide, Brand=brand_id, Foodcourt=foodcourt_id, Restaurant Admin/Staff=restaurant_id, Owner=per-restaurant 선택)
- feat: 사용자 자체 카테고리 CRUD (100% 자율 관리)
- feat: 공지 guide 카테고리 상세 모달에 "업무매뉴얼로 보내기" 버튼 — 타역할 가이드를 복사해 자기 스코프로 가져오기
- feat: 매뉴얼 간 복사 기능 (Owner는 대상 레스토랑 선택 가능)
- model: `WorkManual`, `WorkManualCategory` 신규. `Comment.entity_type` ENUM에 `work_manual` 추가

### 랜딩 페이지 News 메뉴 (신규)
- feat: 상단 GNB에 `Setup Quote` 제거 → `News` 추가 (4개 언어 번역 포함)
- feat: `/news` 페이지 신규 — 블로그와 동일 구조, 카테고리 탭 `All / Product News / Updates`
- feat: `GET /api/contents/public/news` 엔드포인트 — Product News + Updates 카테고리만 반환
- refactor: `GET /api/contents/public/blog` — Product News/Updates 카테고리 제외
- fix: 두 엔드포인트 모두 **포스트가 있는 카테고리만** 반환 (빈 카테고리 숨김)
- feat: `BlogPostPage`가 `/news/:slug` 도 처리 — 경로로 back 버튼 목적지 분기 (/blog vs /news)

### 릴리즈 콘텐츠 자동 등록 인프라
- feat: `scripts/create-release-post.js` 신규 — 배포 시 JSON을 입력받아 (1) 랜딩 블로그 포스트(영어, ContentCategory=updates) + (2) System Admin 공지(영어+한글 이중언어, Notice.category=updates, target_type=all) 동시 생성. `--sync-prod` 플래그로 SSH 운영 DB 자동 동기화
- model: `Notice.category` ENUM에 `updates` 추가 (dev + prod 둘 다 동기화)
- chore: 운영 DB 기존 릴리즈 공지 12개(v3.0.1~v3.12)를 `general` → `updates` 카테고리로 마이그레이션
- chore: 운영 DB 기존 릴리즈 공지 12개의 영어 섹션만 추출하여 `contents` 테이블에 `release-v{version}` slug로 블로그 포스트 생성
- docs: `/배포` 스킬 문서에 "릴리즈 콘텐츠 자동 등록" 섹션 추가

### 자동저장 정리 (SettingsPage)
- fix: `brands` / `billing` 탭에서 의미 없는 "Save Changes" 버튼 4곳 제거. 두 탭 모두 편집 가능 필드가 없는 표시 전용이라 Save 버튼이 혼란만 줬음. 실제 편집 가능한 모든 설정은 `AutoSaveField`로 자동저장 동작 확인 완료

### UI 수정
- fix: `Admin/ContactInquiriesPage` 헤더 높이가 공통 `PageComponents.Header` (56px)와 달라서 다른 페이지와 정렬 안 맞던 문제 수정

### i18n
- fix: `i18next-http-backend` 캐시버스트 추가 — 페이지 로드 시 `/locales/{lng}/{ns}.json?v={timestamp}` 쿼리 파라미터. 번역 키 추가 시 사용자가 수동 캐시 클리어 없이 반영됨 (ETag 유지로 내용 미변경 시 304)
- feat: `common.json`에 `nav.workManuals` 4개 언어 추가 (en/ko/zh/ms)
- feat: `landing.json`에 `nav.news` 4개 언어 추가

## 2026-04-11 배포 (v3.12 유지 — 버그 수정 및 UI 조정 위주)

### notices 데모/테스트 제외 + admin 하드웨어 max_quantity 무제한 + /packages Quote 모달 수정 + External QR + inventory adjust fix

- fix(notices): 관리자 공지 이메일 발송 시 `is_demo=true`/`is_test=true` 계정 제외. broadcast 4개 target(all/role/brand/foodcourt)의 recipient 생성 로직에서 User/Restaurant 양쪽 필터. `select_restaurants`(명시 선택)는 관리자 의도 존중 — `routes/notices.js`
- fix(admin/system-products): Hardware Package 편집 모달의 addon Max 입력 필드에서 `0`(무제한) 설정 불가하던 버그. (1) loader `|| 1`이 기존 `max_quantity=0` 값을 로드 시 1로 변조하던 핵심 버그를 `?? 0`으로 수정, (2) 신규 addon 기본값 `1 → 0`, (3) input `min="1" → "0"`, `|| 1 → || 0`, (4) `(0 = unlimited)` 힌트 문구 추가 — `SystemProductManagementPage.tsx`
- chore(db): 운영 DB `system_product_addons.max_quantity=1`인 108건을 `0`(무제한)으로 일괄 UPDATE. 12건(max_quantity=5)은 유지. 백업 `/var/www/backups/system_product_addons_20260411_175650.sql`. 운영 /packages 에서 Additional Equipment 1개만 추가되던 증상 해소
- feat(packages): Request a Quote 모달 Quote Summary에 소프트웨어 구독 라인 신규. 플랜명 + 청구주기 (monthly/annual) + 가격 + "Billed separately from hardware (recurring invoice)" 안내. 하드웨어 총액은 one-time 그대로, 구독은 dashed divider 아래 별도 섹션. 체크박스 해제/플랜/가격 없을 때 숨김 가드 — `PackagesPage.tsx` + `locales/{en,ko,zh,ms}/landing.json` (2 keys × 4 lang)
- fix(packages): Request a Quote 모달 레이아웃/z-index 수정. (1) z-index `200 → 10000` — Landing 헤더(1000) 뒤로 숨던 문제, (2) ModalContent `max-height: calc(100vh - 40px)` + flex column, (3) ModalTitle `flex-shrink:0` 상단 고정, (4) ModalForm `overflow-y: auto` 중앙만 스크롤, (5) ModalButtonRow `position: sticky; bottom:0` 하단 고정, (6) 모바일(≤640px) 풀스크린. 타이틀/버튼이 스크롤로 사라지던 문제 해소
- fix(admin/payment-settings): `GET/POST /api/admin/payment-settings` 응답을 `{success, data}` 표준으로 래핑. 에러 응답도 `{success:false, message}`로 정규화. 프론트에 legacy flat/새 래핑 둘 다 수용하는 defensive 언랩 — `admin-payment-settings.js`, `Admin/PaymentSettingsPage.tsx`

### 2026-04-11 (External QR + inventory adjust fix + hydration 검증 자동화)
- feat(settings): External QR 카드 신규 — Operations 탭에 커스텀 이름 QR 생성 섹션 추가. 파트너 가게, 호텔 로비, 사무실 등 외부 지점에 주는 QR. 이름(최대 20자) 입력 → SVG/PNG/Print/삭제. 손님이 스캔 시 모바일 메뉴 진입, 주문의 `table_number` 컬럼에 이름 그대로 저장(내부 테이블 QR과 동일 경로). 저장 위치: `table_settings.externalQRs: string[]` — DB 마이그레이션/백엔드 변경 0건
- fix(settings): External QR 카드 좌우 풀폭 — `gridColumn: 1 / -1`로 2열 SettingsGrid에서 한 행 통째 사용. 생성된 QR들은 `TablesGrid auto-fill minmax(180px, 1fr)`로 가로 wrap
- fix(mobile): OrderTypePage의 `Table {tableFromQR}` 하드코딩 제거 — 내부(`T001`)에선 prefix 중복이었고 외부(`Cafe Maru`)에선 어색했음. 이제 값 그대로 표시
- fix(settings): External QR runtime crash 수정 — legacy `localStorage.tableSettings` 캐시에 `externalQRs` 필드가 없어서 `setTableSettings(parsedSettings)` 로 통째 덮어쓰면서 `undefined.length` 접근. 함수형 업데이트 + 기본값 머지로 전환, JSX 5개 접근 모두 `(... || [])` 가드
- fix(inventory): `POST /api/restaurants/:id/inventory/adjust` 라우트가 `quantity`(incremental delta)만 받아서 프론트 인라인 편집(`new_quantity` absolute 전달)이 작동 안 함. 두 파라미터 모두 수용하도록 수정 (new_quantity 우선, 없으면 quantity 폴백, new_quantity=0 정상 처리). General Stock은 별도 라우트라 이미 정상이었음. long-standing 버그
- chore(검증): `/검증` 스킬 0단계 신규 — `dev-frontend/scripts/state-hydration-check.js` 정적 분석 스크립트. 새 state field 추가 시 legacy hydration source(localStorage/JSON.parse/fetch)에서 defensive merge 안 하면 warning, JSX에서 `.length`/`.map`/`.filter` 접근 시 `(... || [])` / `?.` 가드 없으면 warning. 위 External QR 버그를 자동 차단 가능. npm run check:hydration으로 실행

### 2026-04-11 (Phase C-6 + UX 정리 + repo hygiene)
- refactor(C-6): `components/Inventory/InventoryManager.tsx` 3141줄 → 26개 파일로 분할 (types/styles/utils + 11 hooks + 3 sections + 9 modals + 슬림 main 340줄). 공개 API 불변(`<InventoryManager mode restaurantId />`) — 2개 consumer 무수정. 패턴: hook = state+API capsule, mode 분기는 hook 내부에만, Add+Edit는 mode prop으로 통합
- fix(Inventory): 대시보드 카드 5 → 4 (Expiring Soon 제거 — 아래 Expiring Items 섹션과 중복)
- fix(Inventory): 9개 모달 모두 표준 `Modal footer={...}` prop 사용 → ButtonGroup이 body 안에 있어 본문 길어지면 사라지던 문제 해결, sticky footer + border-top
- fix(Inventory): 테이블 반응형 정렬 깨짐 — `& > div:nth-child(N)`은 MobileGrid의 `display: contents` 때문에 grandchildren에 도달 못 함. 클래스 기반(`.col-min`, `.col-cost`, `.col-supplier`, `.col-last`) 셀렉터로 교체. 1280px 미만에서 5컬럼으로 줄이고 Actions 컬럼 폭 160px → 260px로 4개 액션 버튼이 한 줄에 나란히
- fix(Inventory): 버튼에서 `+` prefix 제거 (Receive Stock / Record Waste / Add General Stock)
- fix(StatsGrid): 15개 페이지의 로컬 StatsGrid styled-component 표준화. 모두 `repeat(4,1fr) → ≤1024px repeat(2,1fr) → ≤768px repeat(2,1fr)` 패턴. 이전엔 12개가 `auto-fit minmax(200px,1fr)`로 모바일에서 1열로 무너지거나, AddonModulesPage는 ≤640px에서 명시적 1열이었음. 영향 페이지: Admin/{AddonModules,ContactInquiries,HardwareQuotes,RestaurantSubscriptions}, Brand/Foodcourt/Owner/Manager/Restaurant 5종 OperationInquiry, Manager/{Invoices,ManagerPromotions,ManagerSubscriptions,Sales,Subscriptions}, Owner/Notices
- chore(repo): `dev-frontend/public/static/`(4 파일) + `dev-frontend/nginx-build/`(138 파일) git untrack — Auto-commit이 잡아간 옛 빌드 산출물. CRA가 `public/`을 빌드에 그대로 복사하기 때문에 매 빌드마다 옛 main.js 해시가 함께 들어와 brower cache miss 시 ChunkLoadError 유발했음. 이제 단일 main.js만 출력
- chore(repo): `dev-frontend-build/` (495 파일) git untrack — 로컬 nginx 서빙 디렉토리. 매 빌드마다 거대 diff를 생성하던 hygiene 이슈. 디렉토리는 디스크에 남아 nginx 서빙 정상

### 2026-04-10 (저녁 — Phase C 구조 개선)
- refactor(C-3): Fetch 인터셉터 단일화 — `utils/httpClient.ts` 추출, `index.tsx` 시작 시 1회만 설치. `AuthContext`의 이중 fetch 패치 제거 → StrictMode/HMR 인터셉터 누락/중복 위험 해소
- refactor(C-4): `CustomerContext` 내부 분할 — `useMobileCustomerState` + `usePosCustomersState` + composite provider. 공개 API 불변으로 10개 consumer 수정 없음
- fix(C-4): 모바일 로그인 세션이 레스토랑 간 공유되던 버그 — localStorage 키를 slug별로 분리 (`mobile_customer:<slug>`, `mobile_token:<slug>`). SPA 네비게이션 시 `history.pushState` 패치로 `locationchange` 이벤트 발생 → 즉시 상태 재로드. 레거시(스코프 없는) 세션은 첫 로드 시 자동 정리
- refactor(C-5): 백엔드 5개 거대 라우트 파일 → 16개로 기능별 분할
  - `routes/customers.js` 1263 → barrel + self/admin/auth 3개
  - `routes/mobile.js` 1304 → barrel + helpers + public/orders 2개
  - `routes/orders.js` 2140 → barrel + crud/views/payment 3개
  - `routes/restaurants.js` 2204 → barrel + subscription/crud/ingredients 3개
  - `routes/invoices.js` 3170 → barrel + helpers + main/payment 2개 (routes/owner.js 호환 위해 getIssuerCompanyInfo/getPayerCompanyInfo 배럴 re-export)
- fix: `mobile-public.js`에서 `Order` import 누락 → `GET /popular/:slug` 500 에러 수정 (분할 회귀)
- chore: 63개 백엔드/셸 스크립트의 상태 이모지 ✅/❌ → 텍스트 문자 ✓/✗ 일괄 치환 (터미널 가독성)

### 🐛 추가 버그 수정 (2026-04-10 오후)
- fix: 모바일 메뉴 로딩 속도 개선 — `MenuPage.tsx` init 흐름 개편. 백그라운드 `limit=500` 전체 메뉴 호출 제거, 검색용 전체 메뉴는 검색창 포커스/입력 시 lazy load. 첫 호출 `limit=1`로 카테고리만 빠르게 받기
- fix: 모바일 AccountPage My Coupons에 본인 것이 아닌 매장 전체 공개 쿠폰까지 모두 표시되던 버그 — `routes/coupons.js` 응답을 `myCoupons`(명시적 타겟)/`promotions`(전체공개)/`available`(호환) 3개로 분리. AccountPage는 `myCoupons`만 표시
- fix: 모바일 멤버십 비활성 매장에서 points UI 숨김 — `AccountPage` `pointsEnabled` 기본값 `false`로 변경 (깜빡임 방지), `PaymentPage` 비회원 결제 폼의 "Register as a Member" 체크박스를 `membershipSettings?.is_active` 조건부로 변경
- fix: `routes/coupons.js GET /customer/:customerId` dual auth 적용 — POS Admin 또는 모바일 customer 본인 (IDOR 방어 포함)

### 🛡 보안 정석화 (Phase A)
- 익명 고객 DB 덤프/삭제/비밀번호 변경 차단 (`routes/customers.js` 라우트별 인증 정책)
- 모바일 주문 IDOR 차단 (`routes/mobile.js` GET /orders restaurant_id 필수)
- 결제 라우트 위변조 방어 — 30분 시간 윈도우 + 중복결제 방지 + PayPal orderId 검증 (`routes/orders.js`)
- inventory IDOR 차단 (`routes/inventory-routes.js` checkRestaurantAccess 적용)
- 사업자등록번호/은행계좌 무인증 노출 차단 (`routes/restaurants.js`)
- addon-modules GET 인증 추가
- 모바일 고객 JWT 시스템 신규 — `utils/customerJwt.js`, `middleware/customerAuth.js`
- POST /customers/auth, /register이 customer 토큰 발급
- 모바일 자가서비스 라우트 IDOR 방어 (`requireCustomerSelf`)
- 모바일 페이지에 `mobileFetch` 헬퍼 + `mobile_token` 분리 저장
- POS 관리자와 모바일 고객 세션 완전 분리

### 🔧 안정화 인프라 (Phase D)
- Sentry 에러 추적 도입 (프론트엔드 + 백엔드)
- 환경 자동 감지 (production/development), component 태그로 프론트/백 구분
- AuthContext 4곳에 user context 동기화 (login/checkSession/logout/switchUser)
- 백엔드 admin/customer 미들웨어 user context 자동 첨부
- 민감정보 자동 마스킹 (password, token, Authorization, cookie)
- ErrorBoundary 폴백 UI ("Try again" 버튼)
- Health-check 스크립트 신규 (`dev-backend/scripts/health-check.js`)
- 5개 카테고리 / 39개 자동 테스트 (auth/security/pos/mobile/payment)
- CLI 옵션 (--category, --quiet, --host, --verbose)
- CLAUDE.md에 검증 단계 마지막에 health-check 필수 실행 규칙 추가

### 🐛 깨진 기능 복구 (Phase B)
- fix: Activity Log Stats 500 에러 — `routes/activityLogs.js` sequelize 구조분해 import 누락 수정
- fix: NotificationSettings 잘못된 token 키 (`'token'` → `'auth_token'`) 3곳
- fix: POS 결제 모달 포인트 사용 UI 미노출 — PaymentModal에 `selectedCustomerId` prop 추가, 회원 선택 시 0 pts여도 적립 안내 표시
- fix: **인쇄 다이얼로그 이중 트리거** — `printHTMLContent`의 `iframe.onload`가 두 번 트리거되어 print 다이얼로그가 2번 큐잉되던 문제. 취소 시 두 번째가 즉시 표시되어 "취소해도 또 뜬다" 증상. doc.close() 직후 setTimeout 단일 호출 + hasPrinted flag로 해결. POS 결제/Bill/Kitchen/Settlement/Table QR 등 8개 인쇄 흐름 전체 영향.

---

## [v3.12] — 2026-04-09 배포
- Franchise & Tenancy Management Phase 1 구현 (DB 모델 7개, API 20개, 프론트 Pipeline/List/Detail)
- ContractManagementPage UI 개선: StatCard 색상 분리, ViewToggle 연회색, DatePeriodFilter 통합
- ContractPipeline 카드 정보 보강 (이름/전화/위치/타입/기간/진행률)
- ContractDetail 레이아웃 전체폭, 입력란 width:100%
- 레스토랑 연결 섹션 추가 (검색→선택→연결/해제)
- Notes → CommentSection 교체 (파일첨부, 읽음표시 통합)
- Document 업로드/다운로드/삭제 기능 (upload/files API 활용)
- 통합검색 서버사이드 전환 (코멘트 내용 포함 검색)
- URL 기반 상태 유지 (view/id → 새로고침 시 화면 유지)
- Settings 3개 페이지 AutoSaveField 적용 (InvoiceSettings, CompanySettings, CompanyProfile)
- AutoSaveField 아이콘 위치 점프 수정 + 즉시 spinner 반응
- Owner Plan 매니저 설정 필터 버그 수정
- Comment/CommentRead ENUM에 'contract' 추가
- CHANGELOG 시스템 도입
- fix: 프린터 설정 저장 안 되는 버그 수정 (store.js allowedFields에 printer_settings 누락)
- fix: ImageUploadDropzone 자동저장 안정화 (수동 triggerSave 추가)
- fix: 브라우저 간 설정 불일치 수정 (StoreContext auth-ready 이벤트 재로드)
- fix: LiveOrders 빌프린트 미리보기/출력 로고 누락 수정
- fix: StoreContext 기본값 'FOODCOURT CENTRAL' 제거
- fix: AuthProvider > StoreProvider 구조 변경 (모든 기기에서 설정 로드 안정화)
- fix: 영수증 인쇄 시 로고/멤버십QR/커스텀QR/푸터 누락 수정 (React state 직접 전달)
- fix: 멤버십 QR URL `/m/{id}` → `/mobile/{slug}/account` (올바른 프로필 페이지로 연결)
- fix: 영수증 QR 아래 불필요한 URL 텍스트 삭제
- fix: 멤버십 QR 외부 API 의존 제거 → 로컬 생성 (QRCode.toDataURL)
- fix: getStoreInfo()에 receiptSettings/slug/membershipQR 통합 (모든 인쇄 경로 통일)
- fix: QR Code Mode (Static/Session) 자동저장 안 되는 버그 수정
- fix: FloorPlan Print QR이 브라우저 인쇄 모드를 무시하던 버그 수정
- fix: Table QR 프린트 레이아웃 개선 + @page margin:0 + 시간/만료 표시 + 타임존 적용
- fix: QR Code Mode AutoSaveField 개별 라디오 감싸기 (클릭한 항목에 아이콘)
- fix: StoreContext URL 레스토랑 ID 변경 감지 (다른 레스토랑 데이터 혼재 방지)
- CLAUDE.md 타임존 규칙 추가, UI_DESIGN_GUIDE.md AutoSaveField 필수 규칙 추가

---

## [v3.10] — 2026-04-07 배포
- v3.10 다국어 시스템 (i18n) — 4개 언어 지원 (EN/KO/ZH/MS)
- react-i18next 인프라 + 용어집 + 검증 스크립트
- User.preferred_language + 언어 변경 API
- 160개 페이지 t() 래핑, 4,698키 x 4개 언어
- 언어 선택 UI (Landing globe, POS sidebar, Mobile, Login)
- 이메일 템플릿 다국어
