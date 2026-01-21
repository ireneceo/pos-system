## 현재 작업 상태
**마지막 업데이트:** 2026-01-21 21:00 UTC
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### Invoice System 개선 및 버그 수정

1. **to_pay 탭에서 본인이 발행한 인보이스 제외**
   - Brand/Foodcourt가 발행한 인보이스가 본인의 to_pay 탭에서 제외
   - `[Op.not]` 조건 추가로 issuer_type/issuer_id 매칭 제외

2. **결제 시 영수증 이미지 업로드 기능**
   - Bank Transfer/QR Payment 시 영수증 이미지 업로드 가능
   - Base64 인코딩으로 receipt_url에 저장

3. **시스템관리자 결제 컨펌 팝업 개선**
   - Confirm Payment 클릭 시 고객 결제정보 표시
   - paymentMethod, transactionId, receiptUrl 표시
   - 영수증 이미지 클릭 시 새 탭에서 확대

4. **인보이스 생성 시 수신인 통화 자동 적용**
   - payment_settings.defaultCurrency 우선 적용
   - supported_currencies[0] fallback

5. **Payment Settings 통화 제한**
   - Brand/Foodcourt General이 시스템 지원 통화 내에서만 선택 가능
   - /api/currencies/supported API 연동

6. **Company Info 저장 문제 해결**
   - Express 라우트 순서 수정 (/company-info가 /:id 앞에 오도록)

7. **결제 권한 체크 수정**
   - checkPaymentPermission 함수에서 brand_manager, foodcourt_manager, manager payer_type 처리

### 수정된 파일

**Backend:**
- `routes/invoices.js` - to_pay 필터링, checkPaymentPermission, 인보이스 응답에 payment 정보 추가
- `routes/brands.js` - company-info 라우트 순서 수정

**Frontend:**
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - 영수증 업로드, currency 필드 추가
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - 시스템 통화 제한 적용
- `pages/Admin/InvoicesPage.tsx` - 결제 컨펌 팝업에 고객 결제정보 표시, 통화 자동설정

### 다음 할 일
- Foodcourt Payment Settings도 동일하게 시스템 통화 제한 적용
- Stripe/PayPal Integration (결제 연동)
- Kitchen Display 개선 (Pending 컬럼 아이템별 Done 버튼)
