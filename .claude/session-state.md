# Claude Code 세션 상태

> 이 파일은 대화가 끊겼을 때 진행 상황을 파악하기 위한 파일입니다.
> Claude가 작업 중간에 이 파일을 업데이트합니다.

---

## 현재 작업 상태

**마지막 업데이트:** 2026-01-19
**작업 상태:** Payment Model 3가지 타입 및 역할별 인보이스 API 수정 완료

---

## 현재 세션 (2026-01-19)

### 완료된 작업

#### Phase 1: DB 스키마 확장
- **brands 테이블**: payment_settings, invoice_settings, supported_currencies, subscription_status, subscription_start, subscription_end, plan_type 추가
- **foodcourts 테이블**: 동일 필드 추가
- **invoices 테이블**: issuer_type, issuer_id, payment_provider, payment_intent_id, confirmed_by, confirmed_at, rejection_reason, payment_submitted_at 추가
- sync-database.js 실행 완료

#### Phase 2: Backend API 개발
- **brands.js**: GET/PUT /:id/payment-settings, GET/PUT /:id/subscription
- **foodcourts.js**: 동일 API 추가
- **invoices.js**:
  - POST /:id/submit-payment (결제 제출)
  - POST /:id/confirm-payment (결제 확인)
  - POST /:id/reject-payment (결제 반려)
  - GET /issued-by/:issuerType/:issuerId (발행자별 청구서)
  - GET /to-pay (결제해야 할 청구서)

#### Phase 3: 통합 컴포넌트 개발
- **/src/components/Invoice/**
  - types.ts: 통합 타입 정의
  - InvoiceStatusBadge.tsx: 상태 배지 컴포넌트
  - InvoiceList.tsx: 청구서 목록 (mode: issuer/payer/both)
  - InvoicePaymentModal.tsx: 결제 제출 모달
  - PaymentConfirmModal.tsx: 결제 확인/반려 모달
  - index.ts: 컴포넌트 export

- **/src/services/invoiceService.ts**
  - invoiceService: 청구서 API 호출
  - brandService: 브랜드 결제설정 API
  - foodcourtService: 푸드코트 결제설정 API

#### Phase 4: 역할별 페이지 생성
- **BrandGeneral/BrandInvoicesPage.tsx**: 브랜드 청구서 관리 (발행 + 결제)
- **FoodcourtGeneral/FoodcourtInvoicesPage.tsx**: 푸드코트 청구서 관리 (발행 + 결제)

#### Phase 5: 빌드 테스트
- 프론트엔드 빌드 성공
- 배포 위치: /var/www/dev-frontend/build

#### Phase 6: Payment Model 수정 (2026-01-19)
- **Restaurant 모델**: payment_model, foodcourt_id 필드 추가
  - payment_model: 'restaurant' | 'brand_manager' | 'foodcourt_manager'
  - Restaurant Pays = 'restaurant' (Restaurant Admin이 결제)
  - Manager Pays = 'brand_manager' (Brand General이 결제)
- **restaurants.js 라우트**: POST/PUT에서 payment_model 저장 로직 추가
- **Frontend (Admin/Manager)**: payment_model을 payment_model로 백엔드 전송 수정
- **invoices.js**: 정기구독 인보이스 생성 시 restaurant.payment_model 기반 payer_type 설정

#### Phase 7: Invoice 회사정보/은행정보 표시 (2026-01-19)
- **CompanySettings 모델**: bank_name, bank_account, bank_account_name, swift_code 필드 추가
- **admin-settings.js 라우트**: GET/POST에서 은행정보 반환/저장 추가
- **Admin/InvoicesPage.tsx**: View Modal에 전문적인 인보이스 형식 적용
  - 발행자 회사 로고/이름, 주소, 연락처 표시
  - Bill To 섹션 (고객 정보)
  - Items 테이블 (Description, Qty, Unit Price, Amount)
  - Summary 섹션 (Subtotal, Tax, Total)
  - Bank Details 섹션 (은행명, 계좌명, 계좌번호)
  - 등록번호/세금번호 표시
- **invoiceService.ts**: CompanyInfo 변환 함수 및 issuerCompany/payerCompany 지원 추가
- **Invoice/types.ts**: CompanyInfo 인터페이스 추가
- **InvoiceDetailModal.tsx**: 통합 인보이스 상세 모달 컴포넌트 생성

#### Phase 8: Payment Model 3가지 타입 및 역할별 인보이스 수정 (2026-01-19)
- **Payment Model 타입 수정**: `'restaurant' | 'brand_manager' | 'foodcourt_manager'`
  - Restaurant Admin 결제 = 'restaurant'
  - Brand General/Manager 결제 = 'brand_manager'
  - Foodcourt General/Manager 결제 = 'foodcourt_manager'
- **Admin/RestaurantsPage.tsx**: Payment Model 드롭다운 3가지 옵션으로 수정
- **invoices.js /to-pay API 수정**:
  - Brand General/Manager: 직접 발행된 인보이스 + brand_manager 레스토랑 인보이스
  - Foodcourt General/Manager: 직접 발행된 인보이스 + foodcourt_manager 레스토랑 인보이스
  - 직접 manager에게 발행된 인보이스 (payer_type: 'manager') 포함
- **Profile 페이지 수정**: dbUser가 없을 때 authUser 폴백 처리

### 다음 작업 (필요시)

1. **라우팅 설정**: 새 페이지 라우트 추가
2. **사이드바 메뉴**: Brand/Foodcourt 사이드바에 Invoice 메뉴 추가
3. **Stripe/PayPal Stub**: 실제 연동 전 테스트용 Stub 구현
4. **통합 테스트**: 역할별 워크플로우 테스트

---

## 파일 변경 내역

### Backend 변경
- `/var/www/dev-backend/models/Brand.js` - payment_settings 등 필드 추가
- `/var/www/dev-backend/models/Foodcourt.js` - payment_settings 등 필드 추가
- `/var/www/dev-backend/models/Invoice.js` - issuer_type 등 필드 추가
- `/var/www/dev-backend/routes/brands.js` - payment-settings API 추가
- `/var/www/dev-backend/routes/foodcourts.js` - payment-settings API 추가
- `/var/www/dev-backend/routes/invoices.js` - 결제 워크플로우 API 추가

### Frontend 변경
- `/var/www/dev-frontend/src/components/Invoice/` - 통합 컴포넌트 폴더 생성
- `/var/www/dev-frontend/src/services/invoiceService.ts` - API 서비스 생성
- `/var/www/dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` - 신규
- `/var/www/dev-frontend/src/pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` - 신규

---

## 참고 문서

- `/var/www/docs/BILLING_SYSTEM_INTEGRATION_PLAN.md`: 전체 통합 기획서
- `/var/www/docs/ROLES_AND_PERMISSIONS.md`: 역할별 권한 정의
