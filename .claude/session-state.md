## 현재 작업 상태
**마지막 업데이트:** 2026-01-21 18:50 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 1. BrandCompanyInfoPage 회사정보 저장 문제 해결
- **문제 원인**: Express 라우트 순서 문제
  - `/api/brands/company-info`가 `/api/brands/:id` 뒤에 정의되어 있어서 `company-info`가 `:id` 파라미터로 매칭됨
- **해결 방법**: `/company-info` 라우트들을 `/:id` 라우트 앞으로 이동
- Brand 찾기 로직 개선: `brand_id`로 먼저 시도, 없으면 `owner_id`로 fallback

#### 2. BrandCompanyInfoPage Banking Information 섹션 제거
- Banking Information 섹션 전체 제거 (UI)
- CompanyInfo interface에서 bankName, bankAccount, bankAccountName 필드 제거
- 은행 정보는 Payment Settings에서 관리하도록 분리

#### 3. 인보이스 결제 권한 오류 수정
- **문제**: "You do not have permission to pay this invoice" 오류
- **원인**: `checkPaymentPermission` 함수가 `brand_manager`, `foodcourt_manager` payer_type을 처리하지 않음
- **해결**:
  - Brand General/Manager: `brand`, `brand_manager`, `manager` payer_type 모두 처리
  - Foodcourt General/Manager: `foodcourt`, `foodcourt_manager`, `manager` payer_type 모두 처리

#### 4. Payment Settings 통화 제한 (Brand)
- 시스템관리자가 설정한 통화 내에서만 Brand가 선택 가능하도록 수정
- `/api/currencies/supported` API를 호출하여 시스템 지원 통화 목록 가져옴
- 통화 선택 모달에서 시스템 지원 통화만 표시

### 수정된 파일
- `/var/www/dev-backend/routes/brands.js` - company-info 라우트 순서 수정
- `/var/www/dev-backend/routes/invoices.js` - checkPaymentPermission 함수 수정
- `/var/www/dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx` - Banking Information 섹션 제거
- `/var/www/dev-frontend/src/pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - 시스템 통화 제한 적용

### 확인 필요 사항
1. https://dev.purplehere.com/pos/brand/company-info - 회사정보 저장 확인
2. https://dev.purplehere.com/pos/brand/invoices?tab=to_pay - 결제 버튼 클릭 테스트
3. https://dev.purplehere.com/pos/brand/payment-settings - 통화 선택 시 시스템 설정 통화만 표시 확인

### 인보이스 발행인/수신인 정리 (참고)
- **issued 탭** (브랜드가 발행한 인보이스): Customer 컬럼 표시 (수신자/결제자)
- **to_pay 탭** (브랜드가 받은 인보이스): Issuer 컬럼 표시 (발행자)
- 시스템관리자 인보이스 페이지: Customer 컬럼만 (발행자 입장)

### 다음 할 일
- Foodcourt Payment Settings도 동일하게 시스템 통화 제한 적용 (현재는 시스템 설정 직접 수정 가능)
- 인보이스 PDF: 발행자/수신자에 따른 은행정보 표시 로직 확인/구현
- Phase 4: Purchase Order System 개발
- Stripe/PayPal Integration (결제 연동)
