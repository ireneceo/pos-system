## 현재 작업 상태
**마지막 업데이트:** 2026-01-23 23:26 KST
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### Invoice System UI/UX 개선 (2026-01-23)

1. **Send Invoice 버튼 스타일 개선**
   - LocalActionButton에 `success` variant 추가 (#10B981 녹색)
   - Draft 상태에서 Send Invoice 버튼 녹색으로 변경
   - Brand General: 아이콘만 표시 (텍스트 제거)

2. **Send Invoice 모달 개선**
   - Confirm 버튼 녹색으로 변경 (variant="success")
   - "Manager" → "Recipient"로 표기 변경
   - 수신인 정보 올바르게 표시 (Unknown Manager 버그 수정)

3. **인보이스 수정 제한 로직**
   - 자동 인보이스(automatic 타입) Edit 버튼 숨김
   - paid, payment_submitted, cancelled 상태 수정 불가
   - Backend PUT API에서 검증 로직 추가

4. **인보이스 수신인 정보 수정**
   - Backend: payer_type에 따라 올바른 payer 이름 조회
   - brand_manager, foodcourt_manager 타입도 정확한 이름 표시

5. **운영서버 배포**
   - category_display_name 컬럼 운영 DB에 추가
   - 모든 변경사항 운영서버에 배포 완료

### 수정된 파일

**Backend:**
- `routes/invoices.js` - payer 이름 조회 로직 수정, 수정 제한 검증
- `models/Invoice.js` - category_display_name 필드 추가

**Frontend:**
- `pages/Admin/InvoicesPage.tsx` - Send Invoice 버튼/모달 스타일, Edit 제한
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Send Invoice 버튼/모달 스타일, Edit 제한

### 다음 할 일
- Payment System Integration (Stripe, PayPal)
- Auto Payment System
- Kitchen Display 개선 (Pending 컬럼 아이템별 Done 버튼)
