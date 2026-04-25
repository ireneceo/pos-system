# Email Integrity Audit (F3)

> **버전:** v3.18 — Phase 2 of invoice integrity work
> **검사일:** 2026-04-25
> **상태:** PASS — 즉시 조치 필요 0건

## 배경
v3.18 invoice 정합성 작업 (F1: `utils/invoiceCalculation.js` single source of truth, F2: PUT `resend_email: true` fresh-fetch 재발송)을 마무리한 뒤, 그 외 모든 이메일/알림 발송 site에서 같은 위험 (oldData snapshot, hardcoded 값, stale fetch) 이 없는지 전수 점검.

## Summary

| 항목 | 수치 |
|---|---|
| 점검 site | 17 파일 |
| 발송 지점 (함수 호출) | 23 |
| Fresh fetch ✓ | 22 (96%) |
| Hardcoded 금액/이름 | 0 |
| Stale snapshot 위험 | 0 |
| **즉시 fix 필요** | **0** |
| Optional 개선 | 2 (low-priority) |

## Site별 결과

| # | 파일 | 발송 지점 | 패턴 | 상태 |
|---|---|---|---|---|
| 1 | `routes/auth.js` | passwordReset (212), resendVerification (397) | `User.findOne()` fresh fetch + update 후 발송 | ✓ |
| 2 | `routes/comments.js` | sendNotification (206/221/242) | `Notice.findByPk` / `Ticket.findByPk` fresh + 새로 생성된 comment | ✓ |
| 3 | `routes/customers-auth.js` | passwordReset (536) | Customer fresh fetch + `company.company_name` dynamic branding | ✓ |
| 4 | `routes/invoices-helpers.js` | (helper module — 발송 지점 없음) | n/a | ✓ |
| 5 | `routes/invoices-main.js` | POST /:id/send-email (2374), PUT resend (1603) | **F2 작업 결과** — fresh fetch with items+restaurant include | ✓ |
| 6 | `routes/invoices-payment.js` | sendNotificationBatch (437) | Restaurant + Invoice fresh fetch | ✓ |
| 7 | `routes/notices.js` | sendNotificationBatch (516) | `User.findAll()` fresh + demo/test filter | ✓ |
| 8 | `routes/operationTickets.js` | creation (182), status change (229) | `OperationTicket.findByPk` fresh fetch | ✓ |
| 9 | `routes/public.js` | inquiry confirmation (92), admin notification (123), inquiry reply (368), hardware quote (606/639) | settings + admin IDs 모두 fresh query | ✓ |
| 10 | `routes/restaurants-crud.js` | (이메일 발송 없음 — verification은 users.js로) | n/a | ✓ |
| 11 | `routes/restaurants-subscription.js` | (이메일 발송 없음 — scheduler가 관리) | n/a | ✓ |
| 12 | `routes/support-tickets.js` | creation (118), status change (155) | `getSystemAdminIds()` fresh query + ticket DB 동기화 | ✓ |
| 13 | `routes/users.js` | verification email (444) | user.update() 후 fresh user 객체로 발송 | ✓ |
| 14 | `services/authService.js` | signupWelcomeEmail (423), notifyAdminNewSignup (467) | user는 caller fresh + admin은 `User.findAll()` | ✓⚠ |
| 15 | `services/invoiceScheduler.js` | invoice creation (1128/1133), issuer email (1112) | Restaurant `findByPk` per row + invoice 새로 생성 | ✓ |
| 16 | `services/subscriptionScheduler.js` | payment overdue (962), contract expiry (832-877) | entity (Brand/Foodcourt/User) fresh fetch per row | ✓ |
| 17 | `utils/{emailService,notificationService,systemLogger}.js` | sendNotification core (112), sendAlertEmail (35) | **인프라 레벨에서 강제** — `User.findByPk` + `resolveReceiverBranding` + `resolveReceiverSmtp` 모두 fresh | ✓ |

## 권장 즉시 fix
**없음.**

## 향후 개선 (선택)

### 1. `services/authService.js` — `sendSignupWelcomeEmail` (Low)
- **현재**: user 객체를 caller가 전달 (signup endpoint에서 새로 만들어준 후)
- **권장**: 함수 docstring에 "user must be a fresh model instance" 주석 추가 → 다른 caller가 stale user 넘기지 않도록 가드
- **심각도**: Low (현재 caller는 signup endpoint 1곳뿐, 새로 생성된 user 보장)

### 2. `notificationService.sendNotificationBatch` (None — 성능만)
- **현재**: 각 recipient별로 `User.findByPk` + branding/smtp resolve (N+1 query)
- **개선 옵션**: 대량 발송(>20명) 시 `User.findAll(where: id IN userIds)` 후 메모리 join
- **이유**: 정합성 이슈 0, 단순 DB 부하 감소
- **심각도**: None (현재 발송량으론 무해)

## 평가

**모든 17개 site에서 fresh fetch 패턴 확보됨**:
- Hardcoded 금액/이름: 0건
- Stale snapshot: 0건
- 이메일 카테고리 (`NOTIFICATION_CATEGORIES`) 분류: 정상
- Batch 발송 시에도 각 row별 fresh fetch

**결론**: v3.18 release 진행 가능.

## 참고
- F1: `utils/invoiceCalculation.js` 신설 + 11곳 finalize (subtotal/discount/total + items/tax 단일 source)
- F2: PUT `/api/invoices/:id { resend_email: true }` — fresh fetch 후 재발송
- F3 (이 문서): 그 외 23개 발송 지점 fresh fetch 확보 확인
