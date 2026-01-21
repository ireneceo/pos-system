## 현재 작업 상태
**마지막 업데이트:** 2026-01-21 17:30 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 1. Admin InvoicesPage 수정
- 개별 인보이스 발행 시 `draft` 대신 `pending_payment` 상태로 생성
- 리스트 정렬: Issue Date → Due Date 기준 최신순

#### 2. Backend /api/invoices/to-pay API 개선
- amount, customerName, billingPeriod, planType, issuerName, issuerType 필드 추가
- categoryDisplayName을 사람이 읽을 수 있는 이름으로 변환 (subscription → Subscription Plan, consulting → Consulting 등)
- items 배열 포함

#### 3. BrandInvoicesPage 개선
- to_pay 탭: "Restaurant" → "Issuer" 컬럼 변경 (발행자 정보 표시)
- categories 탭 추가 (Invoice Categories 관리)
- 리스트 정렬: Due Date 기준 최신순
- 회사 정보: 시스템관리자 설정 대신 Brand 회사정보 사용 (`/api/brands/company-info`)
- Invoice 타입에 issuerType, issuerName 필드 추가

#### 4. DB 수정
- INV-2026010007 상태를 draft → pending_payment로 업데이트

### 수정된 파일
- `/var/www/dev-backend/routes/invoices.js` - to-pay API 응답 개선, categoryDisplayName 변환
- `/var/www/dev-frontend/src/pages/Admin/InvoicesPage.tsx` - 인보이스 생성 시 pending_payment, 정렬 수정
- `/var/www/dev-frontend/src/pages/BrandGeneral/BrandInvoicesPage.tsx` - to_pay 탭 UI, categories 탭, 회사정보, 정렬 수정

### 확인 필요 사항
1. https://dev.purplehere.com/pos/brand/invoices?tab=to_pay 에서 INV-2026010007 표시 확인
2. https://dev.purplehere.com/pos/brand/invoices?tab=categories 에서 Categories 탭 동작 확인
3. https://dev.purplehere.com/pos/admin/invoices 에서 새 인보이스 생성 시 pending_payment 상태 확인

### 다음 할 일
- Phase 4: Purchase Order System 개발
- Stripe Integration (결제 연동)
- PayPal Integration (결제 연동)
