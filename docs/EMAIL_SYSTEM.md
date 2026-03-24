# 이메일 발송 시스템

> **최종 업데이트:** 2026-03-23
> **관련 파일:** `utils/emailService.js`, `utils/emailTemplates.js`, `utils/notificationTemplates.js`, `utils/invoiceEmailTemplate.js`, `utils/notificationService.js`

---

## 1. 아키텍처

### SMTP 소스 3가지

| 소스 | 설정 위치 | 용도 | 예시 |
|------|----------|------|------|
| **Platform** | `notification_settings` entity_type='admin' | PurpleHere 시스템 자체가 보내는 메일 | 회원가입, 비밀번호 리셋, Contact 문의, 구독 상태 알림 |
| **Issuer** | `notification_settings` entity_type='brand'/'foodcourt'/'admin' | 발행자가 자기 이름으로 보내는 메일 | 인보이스 발행, 레스토랑 생성 Welcome |
| **Receiver Entity** | 수신자의 entity SMTP (없으면 Platform fallback) | 수신자 조직의 SMTP로 보내는 알림 | 문의 접수/답변, 공지, 결제 확인 |

### 핵심 원칙

- **인보이스/결제 관련**: 항상 **발행자(Issuer) SMTP** 사용. 수신자는 "이 메일이 누구한테서 온 건지" 알 수 있어야 함
- **플랫폼 알림**: 특정 발행자와 무관한 시스템 메일은 **Platform SMTP** 사용
- **수신 알림**: 수신자 조직의 SMTP → Platform fallback. 수신자의 Notification Preferences 체크

### 발송 함수

| 함수 | 파일 | SMTP 소스 | 용도 |
|------|------|----------|------|
| `sendPlatformEmail()` | emailService.js | Platform (admin) | 플랫폼 레벨 메일 |
| `sendEmail(entityType, entityId)` | emailService.js | 지정된 엔티티 | 특정 엔티티의 SMTP로 발송 |
| `sendIssuerEmail(issuerType, issuerId)` | emailService.js | 발행자 엔티티 | 인보이스 발송 |
| `sendNotification(userId, category)` | notificationService.js | 수신자 엔티티 (fallback: Platform) | 알림 (preference 체크) |
| `sendNotificationBatch(userIds, category)` | notificationService.js | 각 수신자별 | 다수 알림 |
| `sendTestEmail(entityType, entityId)` | emailService.js | 지정된 엔티티 | SMTP 테스트 |

### SMTP 해석 순서 (Receiver)

```
1. 수신자 역할에 맞는 entity SMTP 조회
   - Restaurant Admin/Staff → restaurant SMTP
   - Brand General/Manager → brand SMTP
   - Foodcourt General/Manager → foodcourt SMTP
   - System Admin → admin SMTP
   - Restaurant Owner → (없음, 바로 fallback)
2. 없으면 → Platform (System Admin) SMTP
3. Platform도 없으면 → 메일 발송 생략
```

### 개발/운영 구분

- `NODE_ENV=development`: 모든 메일 제목에 `[DEV]` 자동 추가
- `NODE_ENV=production`: 제목 그대로

---

## 2. 메일 발송 매트릭스

### A. Platform 메일 (System Admin SMTP) — 시스템 자체가 보내는 메일

| # | 유형 | 트리거 | 수신자 | 템플릿 | 상태 |
|---|------|--------|--------|--------|------|
| 1 | 회원가입 환영 | 셀프 가입 완료 | 가입자 | `signupWelcomeEmail()` | ✅ |
| 2 | 가입 알림 | 셀프 가입 완료 | System Admin 전원 | 인라인 HTML | ✅ |
| 3 | 비밀번호 리셋 (관리자) | 비번 찾기 요청 | 해당 사용자 | `passwordResetEmail()` | ✅ |
| 4 | Contact 문의 확인 | 랜딩페이지 문의 | 문의자 | 인라인 HTML → emailLayout 교체 필요 | ✅ (옛 템플릿) |
| 5 | **Contact 문의 알림** | 랜딩페이지 문의 | **System Admin** | - | ❌ **미구현** |
| 6 | **구독 Trial 만료 알림** | subscriptionScheduler | 해당 유저 | - | ❌ **미구현** |
| 7 | **구독 Suspended 전환 알림** | subscriptionScheduler | 해당 유저 | - | ❌ **미구현** |

### B. Issuer 메일 (발행자 SMTP) — 발행자가 자기 이름으로 보내는 메일

| # | 유형 | 트리거 | 발행자 | 수신자 | 템플릿 | 상태 |
|---|------|--------|--------|--------|--------|------|
| 8 | POS 인보이스 | 스케줄러 2AM / 수동 | System Admin | 레스토랑 email | `generateInvoiceNotificationEmail()` | ✅ |
| 9 | Brand/FC 인보이스 | 스케줄러 2AM | Brand/Foodcourt | 레스토랑 email | `entityPlanInvoiceEmail()` | ✅ |
| 10 | 레스토랑 생성 Welcome | Admin이 레스토랑 생성 | System Admin/Brand/FC | Restaurant Admin | `welcomeEmail()` | ✅ |
| 11 | **인보이스 연체 리마인더** | 스케줄러 (D+3, D+7, D+14) | 각 발행자 | Restaurant Admin/Owner | - | ❌ **미구현** |
| 12 | **구독 만료 임박** | 스케줄러 (D-7, D-3, D-1) | 각 발행자 | 해당 유저 | - | ❌ 미구현 (추후) |

### C. Receiver 메일 (수신자 SMTP → Platform fallback) — 알림 메일

| # | 유형 | 트리거 | 수신자 | Preference 키 | 상태 |
|---|------|--------|--------|--------------|------|
| 13 | 인보이스 생성 알림 | 인보이스 생성 | Restaurant Admin + Owner | `invoice_created` | ✅ |
| 14 | 결제 확인 | 인보이스 결제 | 발행자 (Brand/FC/SA) | `invoice_paid` | ✅ |
| 15 | 공지 수신 | 공지 발송 | 대상 사용자들 | `notice_received` | ✅ |
| 16 | 댓글 알림 | 댓글 작성 | 글 소유자 | `comment_received` | ✅ |
| 17 | System Inquiry 접수 | 문의 제출 | System Admin 전원 | `inquiry_received` | ✅ |
| 18 | System Inquiry 답변 | 답변 작성 | 상대방 | `inquiry_replied` | ✅ |
| 19 | Operation Inquiry 접수 | 문의 제출 | 담당 매니저 | `inquiry_received` | ✅ |
| 20 | Operation Inquiry 답변 | 답변 작성 | 상대방 | `inquiry_replied` | ✅ |
| 21 | 티켓 상태 변경 | 상태 업데이트 | 티켓 요청자 | `ticket_status_changed` | ✅ |

### D. Restaurant 메일 (Restaurant SMTP) — 레스토랑이 고객에게 보내는 메일

| # | 유형 | 트리거 | 수신자 | 템플릿 | 상태 |
|---|------|--------|--------|--------|------|
| 22 | 고객 비밀번호 리셋 | 고객 비번 찾기 | 고객 email | 인라인 HTML → emailLayout 교체 필요 | ✅ (옛 템플릿) |
| 23 | **고객 회원가입 Welcome** | 고객 가입 | 고객 email | - | ❌ 미구현 (추후) |
| 24 | **주문 확인/완료** | 주문 접수/완료 | 고객 email | - | ❌ 미구현 (추후) |
| 25 | **멤버십/포인트 알림** | 적립/사용/등급 변경 | 고객 email | - | ❌ 미구현 (추후) |
| 26 | **쿠폰 발급** | 쿠폰 발급 | 고객 email | - | ❌ 미구현 (추후) |

### E. 기타

| # | 유형 | 트리거 | 수신자 | SMTP | 상태 |
|---|------|--------|--------|------|------|
| 27 | SMTP 테스트 | 설정 페이지 수동 | 테스트 주소 | 해당 엔티티 | ✅ |

---

## 3. 서버 스케줄러 발송

| 스케줄러 | 실행 시간 | 이메일 발송 | 상태 |
|----------|----------|-----------|------|
| **invoiceScheduler** | 매일 2AM | 인보이스 생성 → 발행자 SMTP + 수신자 알림 | ✅ |
| **subscriptionScheduler** | 매일 3AM | Trial→Overdue, Overdue→Suspended 전환 알림 | ❌ **미구현** |
| **demoResetScheduler** | 매시간 | 없음 (내부 작업만) | - |

---

## 4. Notification Preferences

사용자별 `users.notification_preferences` JSON 필드 (opt-out 모델: null = 모두 활성)

| 카테고리 키 | 기본값 | 설명 | 대상 역할 |
|------------|--------|------|----------|
| `invoice_created` | true | 인보이스 생성 알림 | Restaurant Admin, Owner |
| `invoice_overdue` | true | 인보이스 연체 알림 | Restaurant Admin, Owner |
| `invoice_paid` | true | 결제 확인 알림 | System Admin, Brand General, Foodcourt General |
| `notice_received` | true | 공지 수신 알림 | 전체 |
| `comment_received` | true | 댓글 알림 | 전체 |
| `inquiry_received` | true | 문의 접수 알림 | System Admin, Brand General, Foodcourt General |
| `inquiry_replied` | true | 문의 답변 알림 | Restaurant Admin, Owner |
| `ticket_status_changed` | true | 티켓 상태 변경 알림 | 전체 |

---

## 5. 템플릿 파일

### emailLayout() 사용 현황

| 파일 | 함수 | emailLayout 사용 | 비고 |
|------|------|:---:|------|
| `emailTemplates.js` | `signupWelcomeEmail()` | ✅ | |
| | `passwordResetEmail()` | ✅ | |
| | `welcomeEmail()` | ✅ | 발행자 브랜딩 지원 |
| | `entityPlanInvoiceEmail()` | ✅ | 발행자 브랜딩 지원 |
| | `emailLayout()` | - | 공통 레이아웃 래퍼 |
| | `getLogoAttachment()` | - | CID 로고 첨부 |
| `notificationTemplates.js` | `noticeReceivedEmail()` | ✅ (wrapTemplate) | |
| | `commentReceivedEmail()` | ✅ (wrapTemplate) | |
| | `inquiryReceivedEmail()` | ✅ (wrapTemplate) | |
| | `inquiryRepliedEmail()` | ✅ (wrapTemplate) | |
| | `ticketStatusChangedEmail()` | ✅ (wrapTemplate) | |
| | `invoiceCreatedEmail()` | ✅ (wrapTemplate) | |
| | `invoiceOverdueEmail()` | ✅ (wrapTemplate) | |
| | `invoicePaidEmail()` | ✅ (wrapTemplate) | |
| `invoiceEmailTemplate.js` | `generateInvoiceNotificationEmail()` | ✅ | SA 인보이스 발행 |
| `emailService.js` | `sendTestEmail()` | ✅ | 2026-03-23 교체 |
| `routes/public.js` | Contact 확인 메일 | ❌ **인라인 HTML** | emailLayout 교체 필요 |
| `routes/customers.js` | 고객 비밀번호 리셋 | ❌ **인라인 HTML** | emailLayout 교체 필요 |

---

## 6. SMTP 설정 (notification_settings 테이블)

| entity_type | 용도 | 설정 위치 | 비고 |
|-------------|------|----------|------|
| `admin` | Platform 메일 + System Admin 발행 인보이스 | Admin > Notification Settings | 다른 역할의 fallback |
| `brand` | Brand 인보이스 + Brand 조직 메일 | Brand > Notification Settings | |
| `foodcourt` | Foodcourt 인보이스 + Foodcourt 조직 메일 | Foodcourt > Notification Settings | |
| `restaurant` | 레스토랑 고객 메일 (비번 리셋 등) | Restaurant > Notification Settings | |
| `manager` | 매니저 메일 | Manager > Notification Settings | 현재 미사용 |

### 역할별 SMTP 접근

| 역할 | 자체 SMTP 설정 | 발송 시 사용하는 SMTP |
|------|:-:|------|
| System Admin | ✅ (admin) | admin SMTP |
| Brand General/Manager | ✅ (brand) | brand SMTP |
| Foodcourt General/Manager | ✅ (foodcourt) | foodcourt SMTP |
| Restaurant Admin | ✅ (restaurant) | restaurant SMTP (고객 메일) |
| Restaurant Owner | ❌ | Platform fallback |
| Staff | ❌ (Restaurant Admin 설정 공유) | restaurant SMTP |

---

## 7. UI 구조 (현재 → 개선 예정)

### 현재

`Notification Settings` 페이지에 2개 탭이 섞여 있음:
- **Notification Preferences** 탭 — 개인 설정 (어떤 메일을 받을지)
- **Email Setup** 탭 — 조직 인프라 설정 (SMTP)

### 문제

성격이 완전히 다른 설정이 한 페이지에 있어서 혼란

### 개선 방향

| 설정 | 이동 위치 | 이유 |
|------|----------|------|
| Notification Preferences | **Profile > Notifications 탭** | 개인 설정은 Profile에서 관리 |
| Email Setup (SMTP) | **사이드바: Email Settings** | 조직 인프라 설정은 독립 메뉴 |

---

## 8. 미구현 항목 (우선순위)

### 즉시 필요

| # | 항목 | SMTP | 비고 |
|---|------|------|------|
| 1 | Contact → System Admin 알림 | Platform | 문의 들어왔는데 관리자가 모름 |
| 2 | 구독 Trial→Overdue 전환 알림 | 발행자 | 만료 후 아무 알림 없음 |
| 3 | 구독 Overdue→Suspended 전환 알림 | 발행자 | 서비스 정지 후 아무 알림 없음 |
| 4 | Contact 확인 메일 emailLayout 교체 | Platform | 옛 하드코딩 HTML |
| 5 | 고객 비밀번호 리셋 emailLayout 교체 | Restaurant | 옛 하드코딩 HTML |

### 추후

| # | 항목 | SMTP | 비고 |
|---|------|------|------|
| 6 | 인보이스 연체 리마인더 (D+3, +7, +14) | 발행자 | |
| 7 | 구독 만료 임박 알림 (D-7, -3, -1) | 발행자 | |
| 8 | 고객 회원가입 Welcome | Restaurant | |
| 9 | 주문 확인/완료 알림 | Restaurant | |
| 10 | 멤버십/포인트 알림 | Restaurant | |
| 11 | 쿠폰 발급 알림 | Restaurant | |

---

---

## 템플릿 개선 (v3.5 예정)

### 로고 — Base64 직접 삽입
- **현재**: `cid:purplehere-logo` CID 방식 (일부 메일 클라이언트에서 차단)
- **변경**: 로고를 Base64로 변환하여 `<img src="data:image/png;base64,...">` 직접 삽입
- **파일**: `utils/emailService.js` — emailLayout()

### 본문 줄바꿈
- **현재**: 공지 내용 HTML 태그 제거 후 plain text → 줄바꿈 사라짐
- **변경**: `content.replace(/\n/g, '<br>')` 처리
- **파일**: `utils/notificationTemplates.js` — noticeReceivedEmail()

### 수신거부 링크
- **현재**: 푸터에 텍스트만 있음
- **변경**: `{FRONTEND_URL}/pos/profile?tab=notifications` 링크 추가
- **파일**: `utils/emailService.js` — emailLayout() 푸터

---

## 이메일 인증 시스템 (v3.5 예정)

### DB 변경 (users 테이블)
- `email_verified` BOOLEAN DEFAULT FALSE
- `email_verification_token` VARCHAR(255) NULL
- `email_verification_expires` DATETIME NULL
- `email_bounce_count` INT DEFAULT 0

### 인증 흐름
1. 계정 생성 → email_verified=false → 인증 메일 발송 (링크 포함)
2. 사용자 링크 클릭 → GET /api/auth/verify-email?token=...&email=... → email_verified=true
3. 로그인 시 email_verified=false → 차단 + "인증 메일 재발송" 안내
4. 이메일 변경 시 → email_verified=false 리셋 → 새 인증 메일 발송

### 예외
- `is_demo=true`: 인증 bypass
- `is_test=true`: 인증 bypass
- System Admin 계정 생성 시: "인증 완료 상태로 생성" 옵션

### MX 레코드 검증
- 이메일 등록/변경 시 `dns.resolveMx()` 로 도메인 메일 서버 존재 확인
- MX 없으면 에러 반환
- **파일**: `utils/emailValidator.js` (신규)

### 바운스 처리
- 이메일 발송 실패 시 `email_bounce_count` +1
- bounce_count >= 3 → 해당 이메일로 발송 차단
- 이메일 변경 시 bounce_count 리셋

---

## 변경 이력

| 날짜 | 변경 |
|------|------|
| 2026-03-24 | 이메일 인증/MX 검증/바운스/템플릿 개선 설계 추가 |
| 2026-03-23 | 문서 전면 재정리: SMTP 주체별 매트릭스, 스케줄러 발송, 미구현 목록, UI 개선 방향, 옛 템플릿 교체 목록 추가 |
| 2026-03-23 | sendTestEmail() emailLayout 교체 완료 |
| 2026-03-23 | Inquiry badge에 in-progress 상태 추가 |
| 2026-03-17 | [DEV] prefix 추가 (개발서버 메일 제목 구분) |
| 2026-03-17 | 메일 발송 매트릭스 문서 초판 작성 |
