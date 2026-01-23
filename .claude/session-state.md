## 현재 작업 상태
**마지막 업데이트:** 2026-01-23 14:30 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### InvoicesPage 개선 및 버그 수정

1. **Payment Settings 세율 적용**
   - 백엔드 admin-payment-settings.js에 tax 필드 저장 추가
   - 프론트엔드 InvoicesPage.tsx에서 하드코딩된 6% 세율 제거
   - Payment Settings에서 설정한 세율이 인보이스 생성에 적용되도록 수정

2. **Due Date 기본 정렬 (최신순)**
   - filteredInvoices 정렬 로직 수정
   - 기본 정렬: Due Date 내림차순 (최신이 먼저)

3. **테이블 헤더 클릭 정렬 기능**
   - sortField, sortDirection state 추가
   - 클릭 가능한 헤더: Invoice, Customer, Due, Status, Amount
   - 정렬 방향 표시 (▲/▼)

4. **Payment Submitted 탭 추가**
   - 결제 컨펌 대기 중인 인보이스 전용 탭
   - 빨간색 뱃지로 대기 건수 표시
   - 바로 Confirm Payment 버튼 사용 가능

5. **Invoice 카테고리/아이템 표시 버그 수정**
   - InvoiceItem 조회 시 item_type 필드 포함
   - items가 없는 인보이스도 fallback 아이템 생성
   - categoryDisplayName에 custom description 또는 notes 사용

### 수정된 파일

**Backend:**
- `routes/admin-payment-settings.js` - tax 필드 저장/조회 추가
- `routes/invoices.js` - item_type 포함, fallback items, categoryDisplayName 개선

**Frontend:**
- `pages/Admin/InvoicesPage.tsx`
  - taxSettings state 및 fetchPaymentSettings 함수 추가
  - sortField, sortDirection state 및 handleSort 함수 추가
  - Payment Submitted 탭 UI 추가
  - 테이블 헤더 클릭 정렬 UI 추가

### 다음 할 일
- Foodcourt Payment Settings도 동일하게 시스템 통화 제한 적용
- Stripe/PayPal Integration (결제 연동)
- Kitchen Display 개선 (Pending 컬럼 아이템별 Done 버튼)
