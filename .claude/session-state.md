## 현재 작업 상태
**마지막 업데이트:** 2026-03-18
**작업 상태:** 완료

### 이번 세션 완료 작업

1. **이메일 템플릿 통일** (14개 유형)
   - 공통 emailLayout: 얇은 보라색 액센트 바 + 컬러 로고(CID 인라인) + 깔끔한 흰 배경
   - notificationTemplates.js → 공유 emailLayout 사용 + CTA 버튼 추가
   - invoiceEmailTemplate.js → 공유 emailLayout 사용
   - emailService.js → 자동 로고 CID 첨부

2. **Free 인보이스 Confirm 프로세스**
   - invoiceScheduler: 금액 0원 자동 paid 제거 → pending_payment로 생성
   - Restaurant InvoicesPage: Confirm 버튼 await + 로딩 상태 + 즉시 반영

3. **Entity 구독 인보이스 생성 버그 수정**
   - invoiceScheduler: plan_prices fallback 조회, issued_by/issued_at 추가, InvoiceItem 필드 추가

4. **Managers 페이지 중복 해결**
   - users.js GET: LEFT JOIN → 별도 쿼리 머지 (Brand General 1명이 Brand 여러 개 소유 시 중복 방지)

5. **구독 데이터 저장 위치 통일**
   - Brand General/Foodcourt General 구독 → brands/foodcourts 테이블에서 users 테이블로 이동 (Owner와 동일)
   - users.js PUT: entity 테이블 라우팅 제거, 직접 users 테이블 저장
   - subscription-status API: users 테이블에서 조회
   - allowed-routes API (brands.js, foodcourts.js, owner.js): users 테이블에서 plan_type 조회

6. **Suspended 로그인 차단**
   - authService.js: suspended 계정 403 차단 (Brand General, Foodcourt General, Owner, Restaurant Admin, Staff)
   - auth.js: ACCOUNT_SUSPENDED 에러 코드 전달
   - AuthContext.tsx + LoginPage.tsx: 에러 메시지 표시

7. **데모/테스트 계정 프리패스**
   - 로그인, subscription-status, allowed-routes 모두 is_demo bypass
   - 데모 계정은 최상위 플랜(Enterprise) 자동 적용

8. **공지 뱃지 버그 수정**
   - badgeCounts.js: 자기가 보낸 공지 제외 + System Admin 지원 + 멀티 브랜드/푸드코트
   - notices.js: System Admin recipient row 생성 + findOne → findAll

9. **SubscriptionsPage 기본 필터 All**

10. **InvoicesPage null safe 처리**
    - Admin/Brand/Foodcourt InvoicesPage: companyName/invoiceNumber null 접근 방지
    - Brand/Foodcourt to-pay 탭: 날짜 필터 제거 (결제 대기는 항상 표시)

11. **Daily Settlement Report 팝업 개선**
    - 브라우저 높이 안에 맞춤 (max-height + 내부 스크롤 + ActionBar 하단 고정)
    - PDF Download 버튼 추가 (jspdf + html2canvas, 80mm 영수증 사이즈, 새 창 없이 직접 다운로드)

12. **Manager RestaurantsPage 수치 구현**
    - todaySales, todayOrders, staffCount → 실제 DB 일괄 쿼리

13. **레시피/재료/공급업체 브랜드 통합 사용**
    - Ingredients, Ingredient Categories: 브랜드 통합 (owner의 모든 브랜드 데이터 공유)
    - Recipe Categories: 브랜드별 유지
    - Suppliers: 브랜드 통합 + 등록 시 자동 전체 브랜드 연결 + UI에서 "Connect to Brands" 제거
    - 레스토랑 연동: brand-ingredients, ingredient-categories, brand-suppliers 모두 owner의 전체 브랜드 데이터 조회
    - 탭 순서: Recipes → Recipe Categories → Ingredients → Ingredient Categories

14. **Active/Inactive 색상 통일**
    - 6개 파일 수정: 표준 Active #ECFDF5/#059669, Inactive #FEE2E2/#DC2626

15. **공급업체 Active/Inactive 토글 아이콘 버튼 추가**

16. **Live Orders 실시간 통계 업데이트**
    - Socket 이벤트 4개 (order-created/updated/deleted/items-added)에서 fetchOrderCounts 재호출
    - fetchOrderCountsRef 패턴 사용

17. **개발 DB 구독 플랜 운영서버 동기화**

### 운영서버 배포 상태
- 4회 배포 완료 (이메일+인보이스, 매니저 중복, 구독 통일+allowed-routes, 구독 상태 수정)
- 미배포: 공지 뱃지, SubscriptionsPage 필터, Settlement PDF, RestaurantsPage 수치, 레시피 통합, 색상 통일, 공급업체 토글, Live Orders 실시간

### 수정된 파일 (전체)
**백엔드:**
- routes/users.js, auth.js, restaurants.js, invoices.js, brands.js, foodcourts.js, owner.js
- routes/badgeCounts.js, notices.js, ingredients.js, recipe-categories.js, ingredient-categories.js, suppliers.js
- services/authService.js, invoiceScheduler.js, subscriptionScheduler.js
- utils/emailTemplates.js, emailService.js, invoiceEmailTemplate.js, notificationTemplates.js

**프론트엔드:**
- pages/Restaurant/InvoicesPage.tsx, Admin/InvoicesPage.tsx, Admin/SubscriptionsPage.tsx
- pages/BrandGeneral/BrandInvoicesPage.tsx, FoodcourtGeneral/FoodcourtInvoicesPage.tsx
- pages/Reports/DailySettlementPrint.tsx, LiveOrders/LiveOrdersPage.tsx
- pages/RecipeManagement/RecipeManagementPage.tsx, Suppliers/SuppliersPage.tsx
- pages/Admin/RestaurantsPage.tsx, Promotions/PromotionsPage.tsx
- pages/Owner/OwnerDashboardPage.tsx, Manager/ManagerCustomersPage.tsx
- pages/FoodcourtGeneral/FoodcourtManagement.tsx
- pages/Login/LoginPage.tsx
- contexts/AuthContext.tsx, PaymentStatusContext.tsx

**이미지:**
- dev-frontend/public/images/logo-email.png (컬러 로고)

### 보류/다음 작업
- 구독 플랜 셀프 변경 UI (프로필 또는 Settings 페이지)
- 공급업체 레스토랑별 오버라이드 (재고 시스템 Phase 2 연계)
- 운영서버 미배포 항목 배포

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
