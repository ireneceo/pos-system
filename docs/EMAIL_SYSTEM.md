# 이메일 발송 시스템

> **최종 업데이트:** 2026-03-17
> **관련 파일:** `utils/emailService.js`, `utils/emailTemplates.js`, `utils/notificationTemplates.js`, `utils/invoiceEmailTemplate.js`, `utils/notificationService.js`

---

## 1. 아키텍처

### SMTP 소스 3가지

| 소스 | 설정 위치 | 용도 |
|------|----------|------|
| **Platform** | `notification_settings` entity_type='admin' | 회원가입, 비밀번호 리셋, 문의 등 |
| **Issuer** | `notification_settings` entity_type='brand'/'foodcourt' | 자기가 발행한 인보이스 발송 |
| **Receiver Entity** | 수신자의 entity SMTP (없으면 Platform fallback) | 알림 메일 |

### 발송 함수

| 함수 | 파일 | SMTP 소스 | 용도 |
|------|------|----------|------|
| `sendPlatformEmail()` | emailService.js | Platform (admin) | 플랫폼 레벨 메일 |
| `sendEmail(entityType, entityId)` | emailService.js | 지정된 엔티티 | 특정 엔티티의 SMTP로 발송 |
| `sendIssuerEmail(issuerType, issuerId)` | emailService.js | 발행자 엔티티 | 인보이스 발송 |
| `sendNotification(userId, category)` | notificationService.js | 수신자 엔티티 (fallback: Platform) | 알림 (preference 체크) |
| `sendNotificationBatch(userIds, category)` | notificationService.js | 각 수신자별 | 다수 알림 |
| `sendTestEmail(entityType, entityId)` | emailService.js | 지정된 엔티티 | SMTP 테스트 |

### 개발/운영 구분

- `NODE_ENV=development`: 모든 메일 제목에 `[DEV]` 자동 추가
- `NODE_ENV=production`: 제목 그대로

---

## 2. 메일 발송 매트릭스

### Platform 메일 (System Admin SMTP)

| # | 유형 | 트리거 | 수신자 | 제목 | 템플릿 |
|---|------|--------|--------|------|--------|
| 1 | 회원가입 환영 | 셀프 가입 완료 | 가입자 | Welcome to PurpleHere - Your account is ready! | `signupWelcomeEmail()` |
| 2 | 가입 알림 | 셀프 가입 완료 | System Admin 전원 | [PurpleHere] New Signup: {이름} ({역할}) | 인라인 HTML |
| 3 | 비밀번호 리셋 | 비번 찾기 요청 | 해당 사용자 | Reset your PurpleHere password | `passwordResetEmail()` |
| 4 | 문의 확인 | 랜딩페이지 문의 | 문의자 | Thank you for contacting {회사명} | 인라인 HTML |

### Issuer 메일 (발행자 SMTP)

| # | 유형 | 트리거 | 수신자 | 제목 | SMTP |
|---|------|--------|--------|------|------|
| 5 | 인보이스 (SA) | 스케줄러 2AM / 수동 | 레스토랑 email | Invoice {번호} - {금액} Due {날짜} | System Admin |
| 7 | 인보이스 (Brand/FC) | 스케줄러 2AM | 레스토랑 email | Invoice {번호} - {발행자명} | Brand/Foodcourt |

### Notification 메일 (수신자 엔티티 SMTP → Platform fallback)

| # | 유형 | 트리거 | 수신자 | 제목 | Preference |
|---|------|--------|--------|------|-----------|
| 6 | 인보이스 알림 | 인보이스 생성 | Restaurant Admin + Owner | Invoice {번호} - {금액} Due {날짜} | invoice_created |
| 11 | 결제 확인 | 인보이스 결제 | 발행자 (Brand/FC/SA) | Payment Confirmed: Invoice {번호} - {금액} | invoice_paid |
| 12 | 공지 수신 | 공지 발송 | 대상 사용자들 | New Notice: {제목} | notice_received |
| 13 | 댓글 알림 | 댓글 작성 | 글 소유자 | New Comment on: {제목} | comment_received |
| 14 | 문의 접수 | 문의 제출 | Admin/매니저 | New Inquiry: {제목} | inquiry_received |
| 15 | 문의 답변 | 답변 작성 | 문의자 | Reply to: {제목} | inquiry_replied |
| 16 | 티켓 상태 변경 | 상태 업데이트 | 티켓 요청자 | Ticket Update: {제목} - {상태} | ticket_status_changed |
| 17 | 운영 티켓 생성 | 티켓 생성 | 담당 매니저 | New Inquiry: {제목} | inquiry_received |

### 기타

| # | 유형 | 트리거 | 수신자 | SMTP |
|---|------|--------|--------|------|
| 9 | 테스트 메일 | 설정 페이지 수동 | 테스트 주소 | 해당 엔티티 |
| 10 | 고객 비밀번호 리셋 | 고객 비번 찾기 | 고객 email | Restaurant |

---

## 3. Notification Preferences

사용자별 `users.notification_preferences` JSON 필드 (opt-out 모델: null = 모두 활성)

| 카테고리 키 | 기본값 | 설명 |
|------------|--------|------|
| invoice_created | true | 인보이스 생성 알림 |
| invoice_overdue | true | 인보이스 연체 알림 |
| invoice_paid | true | 결제 확인 알림 |
| notice_received | true | 공지 수신 알림 |
| comment_received | true | 댓글 알림 |
| inquiry_received | true | 문의 접수 알림 |
| inquiry_replied | true | 문의 답변 알림 |
| ticket_status_changed | true | 티켓 상태 변경 알림 |

---

## 4. 템플릿 파일

| 파일 | 함수 | 용도 |
|------|------|------|
| `utils/emailTemplates.js` | `signupWelcomeEmail()` | 회원가입 환영 |
| | `passwordResetEmail()` | 비밀번호 리셋 |
| | `entityPlanInvoiceEmail()` | Brand/FC 인보이스 |
| | `emailLayout()` | 공통 레이아웃 래퍼 |
| `utils/notificationTemplates.js` | `noticeReceivedEmail()` | 공지 수신 |
| | `commentReceivedEmail()` | 댓글 알림 |
| | `inquiryReceivedEmail()` | 문의 접수 |
| | `inquiryRepliedEmail()` | 문의 답변 |
| | `ticketStatusChangedEmail()` | 티켓 상태 변경 |
| | `invoiceCreatedEmail()` | 인보이스 생성 알림 |
| | `invoicePaidEmail()` | 결제 확인 |
| | `wrapTemplate()` | 알림 공통 래퍼 |
| `utils/invoiceEmailTemplate.js` | `generateInvoiceNotificationEmail()` | 인보이스 메일 (SA 발행) |

---

## 5. SMTP 설정 (notification_settings 테이블)

| entity_type | 용도 | 설정 위치 |
|-------------|------|----------|
| admin | System Admin 메일 | Admin > Notification Settings |
| brand | Brand 인보이스 메일 | Brand > Notification Settings |
| foodcourt | Foodcourt 인보이스 메일 | Foodcourt > Notification Settings |
| restaurant | 레스토랑 고객 메일 | Restaurant > Notification Settings |
| manager | 매니저 메일 | Manager > Notification Settings |

---

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-03-17 | [DEV] prefix 추가 (개발서버 메일 제목 구분) |
| 2026-03-17 | 메일 발송 매트릭스 문서 초판 작성 |
