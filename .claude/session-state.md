# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-22 05:25, idle 2076s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: sw.js,IncomingOrdersView.tsx NewPurchaseOrderPage.tsx
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-21 #5 (장식 이모지 앱 전역 제거 + danger 빨강 RA 표준 재통일 — 0위험 — DEV 완료·/검증 통과·운영 미배포)
**버전:** **v3.60 운영 배포됨 (2026-06-20).** 이후 백스테이지 배포 2건. 6/21 작업(데모버그·쿠폰 + Round2 + 디자인 1~3차)은 DEV 미배포. SW_VERSION=3.73-design-unify-danger-red-20260621.

> **danger 빨강 표준 정정(중요):** 공용 Button.tsx + RA Restaurant/InvoicesPage danger = **#EF4444**(border #DC2626, hover #B91C1C). `#FF6B6B`는 LiveOrders 스테이지버튼 전용 팔레트(별개 계열). 일반 감사가 "#FF6B6B" 라 한 건 일반 danger 버튼엔 틀림 → 디자인 1차에서 4파일(IncomingOrders·SystemProductManagement·BrandProductOptions·OptionManagement)을 #FF6B6B로 잘못 바꾼 것을 **#EF4444로 되돌려 재통일**. [[reference_ra_design_standard]] 에 반영 필요.

### 완료된 작업 (이번 세션 #6, 2026-06-21 · 디자인 자동강제 도구(design-guard) + 주문 생명주기 배포수준 실검증)
> Irene "design-guard 만들고 배포 게이트 연결 + 주문 전 생명주기 배포수준 검증(생성·단계·취소·삭제·테이블이동·결제)".
- **`dev-backend/scripts/check-design-guard.js` 신규** (print-guard/timezone-check 동일 baseline 모델). 검사: 신규 로컬 styled.button/table·로컬 StatCard·장식 컬러 이모지·일반 danger #FF6B6B. baseline 299지문 등록(기존=점진교체 추적, **신규만 fail-closed**). 네거티브 테스트로 검출 확인. **deploy-to-production.sh 안전게이트 3/4 로 연결**(fail-closed, --bless 우회). CLAUDE.md "🎨 디자인 단일 기준" 섹션 + 강제 도구 문서화.
- **`dev-backend/scripts/verify-order-lifecycle.js` 신규** (데모 #38 Seoul Garden BBQ, is_demo 전용·운영 무접촉·정리). **10/10 통과:** 생성·단계(preparing→ready)·+Round(add-items)·**테이블이동(move-table T001→T002 HTTP200)**·결제(cash HTTP201 payment_status=completed)·취소(cancelled+사유)·취소사유가드·삭제(DELETE). 자식 FK(order_actions/order_payments) 선삭제 정리.
- **배포수준 게이트 전체 GREEN:** health 107/107 · print-guard 8/8 · design-guard 신규0 · timezone 신규0 · lifecycle 10/10. (프론트 무변경 = 재빌드 불필요, 현 배포본 main.ccfe7b7f 유지)
- **배포 준비 완료** — 6/21 누적분(데모버그·쿠폰·PO승인·디자인 1~5차) 전체. 실제 운영 반영은 Irene `/배포` 명시 지시만.

### 완료된 작업 (이번 세션 #5, 2026-06-21 · 장식 이모지 앱 전역 제거 → RA 기준 · /검증 통과 · 운영 미배포)
> Irene "기능 아무것도 만지지 말고 디자인만, 통일된 고급 디자인 계속, 그만 물어봐" → 순수 표현(이모지/색/텍스트)만, 안 묻고 연속 진행.
- **Admin 3파일**(SecurityPage·SystemConfigPage·SystemLogsPage): ⚠️ WarningIcon 제거(스타일 콜아웃·텍스트 유지), 🔄 Refresh→Refresh, 📊📄📝 ExportIcon 제거(CSV/JSON/TXT 텍스트·onClick 유지). 고아 styled 정의도 제거(경고 0).
- **components 다수**: InvoicePaymentModal 결제수단아이콘(🏦💳🅿️📱) 제거(수단명 텍스트 유지), Inventory(📦🥗 폴백), ImportDataTab(📄📤⚠), AccessBlocked/PaymentStatusModals(🧾📧📞🕐⛔→•), Contract(⚠🔒🔴), InboxItemCard(📢🎫🛠→●), **공용 CommonStyles alert ::before ⚠→`!`(전 페이지 일관)**. 인쇄(AutoPrint·thermal)·피커·국기 파일 무접촉.
- **유지:** 기능 이모지(상품/카테고리 아이콘 데이터·이모지 피커 배열)·국기·기하 글리프(▦◐□◯◉≡●)·텍스트 글리프(✓✕↺)·보호 주석 마커(🔒 // billPrint).
- **/검증 통과:** hydration 0 · build exit0 경고 0(main.22ad2a18) · health 107/107 · print-guard 8/8 · timezone 신규 0 · i18n 0 · 서빙 200 · 장식 이모지 잔존 0(보호 주석만) grep 확인.
- **상태:** 순수-표현(이모지/색) 0위험 통일은 앱 전역 거의 완료. 다음 단계 통일(로컬 StatCard→공용 DashboardStatCard, 수제 table→DataTable, 버튼→공용)은 **컴포넌트 교체 = 중위험(mount 검증 필요)**.

### 완료된 작업 (이번 세션 #4, 2026-06-21 · 다른 역할 관리화면 → RA 디자인 기준 정렬 · /검증 통과 · 운영 미배포)
> Irene 지시 핵심: "정돈된 RA(레스토랑관리자) 페이지를 **기준**으로 삼아 주먹구구 페이지를 맞춰라. 아무거나 갖다 쓰지 마라." → [[reference_ra_design_standard]] 신규 메모.
> **비자명 발견:** RA 대시보드 퀵액션 아이콘 = 기하 유니코드 글리프(▦◐□◯◉≡), 이모지/lucide 아님 = Irene 의도 표준. 일반 이모지 감사의 "☰→lucide" 권고는 **틀림**(따랐으면 RA에서 벗어남). 빈상태=텍스트만, 컬러 이모지 0 이 RA 기준.
- **수정(8지점, RA 어긋나는 컬러 이모지만 제거·기하 글리프 보존):** BrandGeneralDashboard 1098 🔒 / BrandFranchiseMap 722 🔒 / BrandSubscriptions 936 ⚠ / FoodcourtGeneralDashboard 1116 🔒 / FoodcourtFloorPlan 864 🔒 / FoodcourtTenancyMap 846 🔒 / FoodcourtSubscriptions 934 ⚠ → 이모지 제거(텍스트·스타일 콜아웃이 의미 유지) / AdminDashboard 1479-1481 🟢🟡🔴 → 기하 글리프 `●`+팔레트색(#10B981/#F59E0B/#FF6B6B). Owner 대시보드 ☰=RA 글리프라 무변경.
- **/검증 통과:** 0 hydration 0 · 0-b 타임존 신규 0 · build exit0+배포(main.f22d2270) · health 107/107 · print-guard 8/8 · i18n 0 error · 서빙 200/SW3.71 · 기하 글리프 보존·컬러 이모지 제거 grep 확인.
- **미수정(다음, 추가 지시 시):** Admin SystemLogs/Security/SystemConfig 의 ⚠️ WarningIcon·🔄📊📄 ExportIcon(WarningIcon styled 점검 필요). 중위험(컴포넌트 교체: 로컬 StatCard→DashboardStatCard, 수제 table→DataTable).

**작업 상태:** 완료 (DEV 검증 통과) — **운영 배포 대기(Irene /배포)**

### 완료된 작업 (이번 세션 #7, 2026-06-21 · BG 제품체인을 RA 동일 기능으로 통합 — 백엔드 루프 완성·검증 · DEV·미배포)
> "완전 똑같게 RA, 기능 똑같이(테이블 갖다쓰기 아님), 재고아이템↔공급업체상품 연결해 발주관리". BG 자기 테이블(BrandProduct→ProductRecipe→ProductIngredient) 유지 + 공용 공급망(PO·재고거래·공급업체카탈로그, 이미 brand 지원) 재사용.
- **완료·e2e 검증(BG 공급망 6/6):** 매핑생성→매핑조회→발주생성(재고아이템 라인)→발주라인(product_ingredient_id, ingredient_id null)→입고 재고자동증가(40→50)→거래로그(entity=brand). 데모 #1 K-DINE, 유저6, 자동정리.
- **백엔드:** 멱등 마이그(`migrate-bg-product-supply-chain.js`, deploy 9a-2 등록) — ingredient_seller_products/purchase_order_items/inventory_transactions 에 `product_ingredient_id` nullable+FK, 3곳 ingredient_id nullable 완화. 모델 3개 컬럼+association. `product-ingredients.js` 공급업체-소스 매핑 라우트 3개(GET/POST/DELETE, 계약은 BG 브랜드 기준). `purchase-orders-crud` createPO 가 product_ingredient_id 라인 수용(소유=owner_user_id===userId). `purchase-orders-workflow` mark-received+receive 에 ProductIngredient 재고증가+거래로그 분기(**RA Ingredient 경로 완전 무변경=격리 분기**).
- **프론트:** 사이드바 라벨 Ingredients→Stock Items + Suppliers/Inventory를 Operations로 이동(RA 순서). ProductIngredientsTab 공급업체 자유입력→공용 SearchableSelect(supplier_id). SW=3.74.
- **RA 회귀 0:** health 107/107 · 주문 생명주기 10/10 · 기존 PO라인 87건 ingredient_id 무손상 · print-guard 8/8(MainLayout 사이드바=print-neutral re-bless) · design-guard 0 · timezone 0 · hydration 0 · i18n 0 · BG페이지 mount 크래시 0.
- **ⓐ 완료(2026-06-21 #7-2):** NewPurchaseOrderPage(공유)에 **BG 분기** — `fetchMine`이 `/api/product-ingredients?include=sellers` 도 로드해 재고아이템(seller보유분)을 발주 목록에 병합, 카트행에 `product_ingredient_id` 운반, submit이 BG행은 product_ingredient_id 로 전송. **restaurant/foodcourt 경로 100% 무변경**(piKey null fall-through). 백엔드 GET include=sellers + bulk(createPurchaseOrderCore) 수용 검증.
- **ⓑ 완료:** ProductIngredientsTab 편집모달에 **공급업체상품 매핑(seller-source) 관리 UI** — 목록+삭제(IconButton) + 추가(`/api/supplier-catalog` SearchableSelect→단가/환산→POST). 공용 컴포넌트만, 디자인가드 0.
- **검증(ⓐⓑ):** build exit0+배포(main.a0331bf4, SW=3.75) · health 107/107 · 생명주기 10/10 · **BG 공급망 6/6** · bulk 발주 product_ingredient_id 수용 · print-guard 8/8 · design-guard 0 · timezone 0 · hydration 0 · i18n 0 · **mount: BG발주·BG StockItem·RA발주(회귀) 전부 크래시 0**. 기존 dead-code 경고 9건(우리 추가 줄 0회=별건).
- **ⓒ 완료(2026-06-21 #7-3):** **아웃바운드 — 브랜드가 BrandProduct 를 레스토랑에 판매(출고) 시 그 제품 레시피(ProductRecipe BOM)대로 ProductIngredient 자동 차감 + order_deduct 로그.** RA 주문완료 차감(inventoryDeductionService) 미러. 훅 지점=`routes/seller-orders.js` `/:id/ship` 의 supplier 재고차감 블록 옆에 **brand 분기 격리 삽입**(seller_type==='brand' → seller_product_id→BrandProduct→product_recipe_id→ProductRecipeIngredient→ProductIngredient 차감). 레시피 없으면 차감 없음(RA 동일). supplier 출고 무변경.
- **검증(ⓒ):** BG 아웃바운드 e2e **3/3**(출고 200 · ProductIngredient 40→37=-0.3×10 · order_deduct 로그). RA 회귀: health 107/107 · 생명주기 10/10 · supplier 출고 무손상 · print 8/8 · design 0 · timezone 0 · 치명에러 0.
- **BG 제품체인 = RA 완전 동일 달성:** Product↔Recipe↔StockItem↔공급업체상품↔발주↔재고(입고↑/판매↓) 한 바퀴 닫힘. 차이=BrandProduct가 "연결 레스토랑에 판매"뿐. (인바운드 6/6 + 아웃바운드 3/3, UI ⓐⓑ 포함 전부 검증.)
- **실제 외부공급업체 발주 전루프 전수검증(2026-06-21 #7-4):** `scripts/verify-external-supplier-po.js` **11/11** — RA(매장2→공급업체20): 매핑(활성계약)→발주(seller=supplier)→제출→**공급업체 확정→출고(공급업체재고 차감)**→매장 입고(재료+10)→거래로그. BG(브랜드1→공급업체14): 재고아이템↔공급업체상품 매핑(활성계약)→발주→입고(ProductIngredient+10)→거래로그. system_admin 지름길 아닌 **실 supplier 루트** 검증. 부수확인: 매장 발주 오너승인 게이트 정상(supplier 발주와 직교).
- **영구 검증도구 3종:** verify-bg-supply-chain.js(인바운드) · verify-bg-outbound.js(판매차감) · verify-external-supplier-po.js(실 외부공급업체 전루프).

### 진행 중인 작업
- 없음 (BG 공급망 백엔드 루프 완성·검증, 잔여 UI 확장은 위 ⓐⓑ)

### 완료된 작업 (이번 세션 #3, 2026-06-21 · 전면 디자인 통일성 전수감사 + 1차 수정 · DEV 검증 통과 · 운영 미배포)
> Irene "전수검사 — 모든 사용 루트, 글로벌 수준 통일 컴포넌트 사용 여부" 지시. 6개 차원 병렬 감사(general-purpose 에이전트).
- **감사 결과(핵심):** 표준 컴포넌트(Modal/Button/IconButton/DataTable/StatCard/AddressFields/DateField 등)는 잘 갖춰졌으나 적용률이 낮음. 표준 IconButton import 1곳·ActionButton 1곳뿐, 로컬 styled.button 338개(144파일). 모달/alert HIGH ~81, 이모지 ~150줄(67파일), 수제 table 9파일+로컬 StatCard 9+로컬 Tab 5, 공용 Card 컴포넌트 부재(구조갭). 폼입력 양호(type=date 0). 타임존 진짜 5건, 쿠폰 2페이지 i18n 0%. 대부분 이번 세션 아닌 앱 전반 누적.
- **Irene 결정: "눈에 보이는 것부터"** 1차 수정(저위험·고가시성, 프린터영역 무접촉):
  - 팔레트 밖 버튼색 5파일(파랑 #2563EB→#10B981, 잘못된 빨강 #EF4444/#DC2626→#FF6B6B, off-green #16A34A→#10B981)
  - 빈상태/랭킹 이모지 제거: 🥇🥈🥉→텍스트 rank, 🍰/🔥/🤖 제거, 빈상태 이모지(📭/📬/📄/📜/⚙️/📂/🛒/🚫/📋)→lucide 아이콘. 13파일
  - 쿠폰 2페이지 i18n: ManagerPromotionsPage+PromotionsPage 0%→완전 번역. promotions 네임스페이스 신설(i18n.ts 등록)+locales 4언어 95키(parity 확인)
  - 타임존 2건 수정: CheckoutDisplay:384, SettingsPage:6024(프린터 긴급카드 타임스탬프 표시=print-neutral). useStore→getRestaurantTimezone
- **flag-only 보류(프린터 영역, 미수정):** AutoPrintPreviewModal:146 · thermalPrinter:110 · POSTerminal:3901(보호파일) 타임존 / POSTerminal·KitchenDisplay 이모지
- **검증:** build exit0(74초)+dev배포 · i18n:verify 0 error · health 107/107 · print-guard 8/8(보호파일 무변경) · tsc 통과
- **기존 경고 1건(우리 무관):** pages/Supplier/SupplierInvoiceSettingsPage.tsx:153 Badge variant="neutral" 타입 union 누락 — 미수정(범위 밖 파일)
- **미수정(대규모, Irene 추가 지시 시):** 버튼 338개·수제 table·StatCard·PageHeader 표준화 + 공용 Card 신설 + 모달/alert 81건 + 잠금🔒 이모지 8파일 + native select 37건. 감사 리포트는 이 대화에 있음(docs 미작성).

### 완료된 작업 (이번 세션 #2, 2026-06-21 · 운영 피드백 Round2 · DEV 검증 통과 · 운영 미배포)
> 운영 support_tickets 재확인(IOI Mall Food Court 6/21 신규) → "오프라인 운영 빼고 다 해" 지시. 6/18~19 건은 직전 사이클에 이미 처리됨.
- **발주관리 #1 (BG=레스토랑 동일구조)** — 구조체크 감사: 이미 단일 컴포넌트(`pages/PurchaseOrders/*`)+단일 백엔드(`entity_type`/`buyerEntity`). BG 전용 분기 없음 확인(코드 변경 0). 설계 PURCHASE_ORDER_SYSTEM.md §G-1.
- **발주관리 #2 (오너 승인 워크플로우)** — 레스토랑 발주 submit→(오너연결&설정ON)pending_approval→오너 승인→submitted(판매자) / 반려→draft(사유). 오너연결 시 기본 ON. PO status ENUM+`pending_approval`+승인/반려 컬럼(멱등 마이그 deploy 9a-2), `requirePoOwnerApproval`(settingsGuard 화이트리스트), 별도 승인 라우터(멀티매장 오너 scope, purchaseOrdersRouter 앞 마운트), 알림 2종, 오너 승인 큐 페이지(표준 컴포넌트)+사이드바+badge, 설정 토글, 상세 pending/반려 배너. 설계 §G.
- **R2-② base64 sweep 메일** — sweep 알림 수신자를 테넌트 미바인딩 진짜 System Admin 으로 제한(매장 누출 차단). 티켓 미생성 확인.
- **R2-③ 메일 발신전용 표시** — 공통 emailLayout 푸터에 발신전용·수신불가 1줄(4언어). 플랫폼+매장발송 메일 전체 적용.
- **R2-④ 문의 리스트 truncate** — System Inquiry 7개 페이지 TicketDescription 2줄 clamp(상세 모달 영향 없음).
- **검증**: 빌드 exit0(78초) · health 107/107 · print-guard 8/8(MainLayout 사이드바=print-neutral 증명 후 re-bless) · i18n 0 error · 발주승인 실API 17/17+통합 6/6(allowed-routes·badge·승인·반려·회귀없음) · mount 3/3 클린(오너승인큐·설정operations·발주이력)
- 미착수: ⑤ 오프라인 복원력 sync 아키텍처(별도 자문). 신규 쿠폰 페이지 i18n.

### 완료된 작업 (이번 세션 #1, 2026-06-21 · DEV 검증 통과 · 운영 미배포)
- **데모 버그 8건 일괄 수정** (운영 데모=고객사 노출용, "6/16 수정 반영 안 됨" 보고를 3개 역할 병렬 조사로 근본원인 확정):
  - FG/Brand System Inquiry 등록 실패(500) — create 카테고리값이 ENUM 밖 → 유효값
  - BG Recipe category 등록(400) — brand_id 미전송 → 전송
  - BG Linked Recipe 드롭다운 빔 — 브랜드 선택 상태 localStorage 키 공유
  - BG Add Admin 매장필수(403) — users.js allow-list에 BG/FG(소유권 스코프·매장 optional) + 프론트 필수 해제
  - BG Deactivate(403) — auth.js userCanAccessRestaurant 에 브랜드/푸드코트 소유권 분기 추가
  - Owner 추가매장 목록 안 보임 — 응답 shape + claim oversight→ownership 승격([[reference_owner_restaurant_claim]])
  - Owner Operation Inquiry Status 항상 closed — 푸터 하드코딩 제거(4파일), 드롭다운 선택 저장
  - Owner send-to-work-manual 무반응(500) — author_name null 폴백 + Owner 매장 귀속
  - (이미 dev 정상이던 FG 매장추가·BG 댓글삭제는 SW bump+빌드로 데모 반영)
- **시재(Cash Management)** — Today's Cash Drawer 버튼 렌더 누락 수정 + 페이지에 팝업과 동일 드로어 잔액(개시+입−출) 표시로 계산 동기화
- **다매장 쿠폰 신축(FG/BG)** — "전 매장/선택 매장" 타게팅. 매장당 1행 materialize + scope_group_id 묶음(결제/검증/orders-crud 무변경). migrate-coupon-scope.js(coupons 4컬럼, deploy 9a-2 등록) + routes/coupon-groups.js + ManagerPromotionsPage 전면 교체. 설계=docs/COUPON_MULTI_RESTAURANT.md, [[reference_coupon_groups]]
- **검증(/검증 10단계 전부 실행)**: 실API 16/16(Write→Read 왕복) · 쿠폰 백엔드 9/9 · 실브라우저 mount 10/10(pageerror/console/ErrorBoundary 0) · health 107/107 · print-guard 8/8(인쇄 무관) · state-hydration 0 · timezone 신규 0 · i18n:verify 0 error

### 다음 확정 작업
- 없음 — 지시 대기
  (단, **운영 배포 미실행 상태**: Irene 이 "쿠폰까지 만들고 한 번에 배포" 결정 → /배포 시 6/21 작업 전체 + 밀려있던 6/16 수정이 운영 반영. migrate-coupon-scope.js 가 deploy 9a-2 에서 자동 실행됨)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- ⑤ 오프라인 복원력 sync 아키텍처 — IOI Mall Food Court 6/21 요청(풀 오프라인 아님, 일시 끊김 대비). 별도 설계 자문 필요(미착수)
- 새 쿠폰 페이지 i18n — 현재 영어 라벨 하드코딩(기존 쿠폰 PromotionsPage 도 영어). 4언어 t() 적용 여지
- FG-B 쿠폰 후속 — 고객/등급 타게팅, 쿠폰 사용 리포트(매장별 사용수), 만료 자동 비활성
- 인앱 Docs/매뉴얼 시스템 — docs/IN_APP_DOCS_MANUAL_SYSTEM.md 기획만 됨
- 매장 실프린터 확인 대기 — Z-Report 종이·드로어·주방티켓(v3.60 시재/마감) 현장 눈확인
- 운영시간(요일별)+라스트오더 게이트 — 기획 확정·미구현(설계 문서 있음)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
