## 현재 작업 상태
**마지막 업데이트:** 2026-01-21 20:50
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. JWT 토큰에 brand_id, foodcourt_id, restaurant_id, manager_id 추가
2. authenticateToken 미들웨어에 역할별 ID (brand_id, foodcourt_id 등) 설정
3. Express Router 순서 수정 (/to-pay가 /:id보다 앞에)
4. Invoice 발행 시 issuer_type, issuer_id 정보 저장
5. Invoices to Pay에서 draft 상태 인보이스 제외
6. Payment Submit Modal에 시스템 관리자 결제 방법(QR/Bank) 표시
7. BrandPaymentSettingsPage API 응답 구조 파싱 수정

### 다음 할 일
- Stripe Integration (결제 연동)
- PayPal Integration (결제 연동)
- Auto Payment System (자동 결제)
