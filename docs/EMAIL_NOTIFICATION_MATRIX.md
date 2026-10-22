# 이메일 알림 매트릭스

> **최종 업데이트:** 2026-10-22 (받는 자격 규칙 추가 — 아래 표 전체 갱신은 후속 R5) · 이전 2026-04-04

## 받는 자격 · 할 일 규칙 (2026-10-22 · Fable 설계 `.claude/fable-design-20261022-notification-addressee.md`)

- 모든 알림은 **받는 자격**(`_addressee` = kind · entity · 이름)을 달고 나간다 — 제목 맨 앞 꼬리표 `[K-DINE · Brand]` · 미리보기 줄 · 본문 «받는 분» 띠 · 바닥글 한 줄 · 버튼 주소가 **같은 값**. 자격은 수신자 계정 역할이 아니라 **그 발송의 자리**(판매자 메일 = 판매자 자리).
- 꼬리표는 `utils/notificationService.sendNotification` **한 곳**에서 붙인다(템플릿은 동사 문장만). 템플릿은 `withRenderMeta(…, { action })` 로 «할 일» 칸(action/fyi/result)을 싣는다 — 문장은 `locales/*/email.json` `action.*` 사전 키.
- 수신자 목록 + 자격: `getRestaurantAddressees` · `getEntityAddressees` · `getUserAddressee` · `getNativeAddressee`(공지·댓글·문의) — 집합은 옛 id 함수와 같다. 배치는 `utils/notificationAddressee.mailFor(list, build)`.
- 버튼 주소는 `utils/notificationLinks.goLink(addressee, target)` 표 하나 → `/go?ctx=…&to=…` 진입 화면(다른 모자면 확인 1번 후 전환). 표 경로는 `node scripts/check-notification-links.js` 가 App.tsx 와 대조(옛 없는 주소 0).
- 새 알림을 만들면: 자격 리졸버로 수신자 → 템플릿 `withRenderMeta` + action → `goLink` 버튼. **spread(`{...mail}`) 금지** — 재렌더 메타(비열거)가 지워진다, `Object.assign`.
- 연체 메일 수신자 = 관리자 전원 + 오너(2026-10-22 Irene «권고대로»). 모자(부여 역할) 보유자 수신은 후속 R1(다음 설계).

## SMTP 설정 구조

| Entity Type | 설정 위치 | 용도 |
|-------------|----------|------|
| admin | notification_settings (entity_type='admin') | 플랫폼 기본 SMTP |
| brand | notification_settings (entity_type='brand') | 브랜드 발행 이메일 |
| foodcourt | notification_settings (entity_type='foodcourt') | 푸드코트 발행 이메일 |
| restaurant | notification_settings (entity_type='restaurant') | 레스토랑 수신 SMTP |
| manager | notification_settings (entity_type='manager') | 매니저 수신 SMTP |

## SMTP 해상도 규칙

### 발신 (Issuer) SMTP
- `sendPlatformEmail()` → 항상 admin SMTP
- `sendIssuerEmail(issuerType, issuerId)` → issuer의 entity SMTP
- `sendNotification(userId, category)` → 수신자의 entity SMTP → platform fallback

### 수신자별 SMTP 매핑
- Restaurant Admin/Staff → restaurant entity
- Brand General/Manager → brand entity
- Foodcourt General/Manager → foodcourt entity
- System Admin → admin entity
- Restaurant Owner → platform fallback (전용 SMTP 없음)

## 알림 카테고리 (사용자 설정 가능)

| 카테고리 | 라벨 | 대상 역할 | 섹션 |
|----------|------|----------|------|
| invoice_created | New Invoice Issued | Restaurant Admin, Owner | Invoices |
| invoice_overdue | Invoice Overdue Reminder | Restaurant Admin, Owner | Invoices |
| invoice_paid | Invoice Payment Confirmed | Brand/FC General, System Admin | Invoices |
| notice_received | New Notice Received | all | Communication |
| comment_received | New Comment | all | Communication |
| inquiry_received | New Inquiry Received | Brand/FC General, System Admin | Inquiries |
| inquiry_replied | Inquiry Reply | Restaurant Admin, Owner | Inquiries |
| ticket_status_changed | Ticket Status Changed | all | Inquiries |
| hardware_quote | Hardware Quote Request | System Admin | Inquiries |
| trial_expiry_reminder | Trial Expiry Reminder | RA / Owner / BG / FG | Subscription |

## 전체 이메일 발송 매트릭스

| 이메일 유형 | 트리거 | 발신 함수 | 수신자 | SMTP | 사용자 설정 |
|------------|--------|----------|--------|------|-----------|
| 비밀번호 리셋 | auth.js | sendPlatformEmail | 사용자 | Platform | ✗ |
| 이메일 인증 | authService.js | sendPlatformEmail | 사용자 | Platform | ✗ |
| 가입 환영 | authService.js | sendPlatformEmail | 사용자 | Platform | ✗ |
| 가입 알림 (Admin) | authService.js | sendPlatformEmail | System Admin | Platform | ✗ |
| 레스토랑 환영 | restaurants.js | sendIssuerEmail | Restaurant Admin | Issuer | ✗ |
| 인보이스 이메일 | invoices.js send-email | sendIssuerEmail | 수신자 이메일 | Issuer | ✗ |
| 인보이스 생성 알림 | invoiceScheduler.js | sendNotification | RA + Owner | Receiver | ✓ invoice_created |
| 인보이스 결제 확인 | invoices.js confirm | sendNotificationBatch | Issuer 매니저 | Receiver | ✓ invoice_paid |
| 공지 알림 | notices.js | sendNotificationBatch | 구독자 | Receiver | ✓ notice_received |
| 댓글 알림 | comments.js | sendNotification | 작성자 | Receiver | ✓ comment_received |
| 문의 접수 알림 | support-tickets.js | sendNotificationBatch | 매니저 | Receiver | ✓ inquiry_received |
| 문의 답변 알림 | comments.js | sendNotification | 문의자 | Receiver | ✓ inquiry_replied |
| 티켓 상태 변경 | support-tickets.js | sendNotification | 문의자 | Receiver | ✓ ticket_status_changed |
| 문의 폼 확인 | public.js | sendPlatformEmail | 제출자 | Platform | ✗ |
| 문의 Admin 알림 | public.js | sendNotificationBatch | System Admin | Receiver | ✓ inquiry_received |
| 견적 확인 | public.js | sendPlatformEmail | 제출자 | Platform | ✗ |
| 견적 Admin 알림 | public.js | sendNotificationBatch | System Admin | Receiver | ✓ hardware_quote |
| 시스템 로그 알림 | systemLogger.js | sendPlatformEmail | Admin | Platform | ✗ |
| Trial 만료 알림 (D-3/D-0/D+1) | subscriptionScheduler.processTrialReminders | sendNotification | RA / Owner / BG / FG | Receiver | ✓ trial_expiry_reminder |

## 개발 시 체크리스트

새 이메일 추가 시:
1. 카테고리 필요 → `notification-settings.js` NOTIFICATION_CATEGORIES 추가
2. 템플릿 → `emailTemplates.js` 또는 `notificationTemplates.js`
3. 발송 → `sendNotification/Batch` (수신자 SMTP) 또는 `sendPlatformEmail` (플랫폼 SMTP)
4. URL → 환경변수 사용 (하드코딩 금지)
5. 로고 → CID 자동 감지 (emailLayout 사용 시)
6. `emailLayout(bodyContent)` — 첫 번째 인자가 body (issuerInfo 아님!)
