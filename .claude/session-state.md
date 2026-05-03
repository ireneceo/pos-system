# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-03 (v3.24 운영 배포 완료 — /개발완료)
**버전:** **v3.24** (운영, 2026-05-03 배포 — 결제 시스템 표준화 + External QR ↔ Coupon)
**작업 상태:** 완료

---

## ⚡ 빠른 재개 (새 세션에서)

```
session-state.md 읽고 이어서 개발해.
```

---

## 📦 이번 세션 (v3.24) 완료 작업 요약

### 1. Stripe / PayPal 결제 표준화 (큰 라운드)
- Phase 1-3 (cron + off_session) 폐기 → revert
- **Stripe Subscriptions API** + Hosted Checkout (subscription · payment) + Customer Portal
- **PayPal Subscriptions API** + Orders v2 (직접 fetch v1/billing + v2/checkout)
- Webhook 8종 + signature 검증 + WebhookEvent dedupe
- 4 issuer (System/Brand/Foodcourt/Supplier) PaymentSettings 통합 (autoCharge 토글 4 페이지에서 제거)
- 3 결제자 (Restaurant/Brand/Foodcourt) InvoicesPage SubscriptionPanel mount
- 신규 모델: PaymentCustomer / Subscription (payment_subscriptions) / WebhookEvent
- Invoice 확장: gateway_session_id, subscription_id
- `docs/PAYMENT_ARCHITECTURE.md` (truth source)

### 2. External QR ↔ Coupon 자동 매핑 (협력업체 할인)
- `restaurant.table_settings.externalQRs`: string[] → `{name, coupon_id?}[]`
- `routes/external-qrs.js`: GET external-qr-coupon (익명) / coupons-linked-qrs (인증)
- inventory-core router-level middleware fall-through 회피 위해 mount 순서 조정
- Settings UI: ✕ 우상단 / Add 폼 단순화 / inline coupon select AutoSaveField wrap
- Promotions: "Linked to" 뱃지 + 삭제 confirm 경고
- Mobile PaymentPage: 자동 적용 + partner 배너 + 수동 input disabled
- `docs/EXTERNAL_QR_PARTNER_DISCOUNT.md`

### 3. PayPal 가이드 보완
- PaymentGatewayGuide.tsx — Subscriptions/Vault 활성화 단계 + webhook events 8종 명시

### 4. 리퍼럴 로고 v2 + Cookie /referral 제외 (이전 누적, v3.24 함께 배포)

### 운영 진입
- v3.24 운영 배포 완료 (Smoke 2/4 통과 + 신규 endpoints 검증)
- 운영 DB 마이그레이션 자동 (sequelize sync 시 새 테이블 자동 생성, JSON 형식 자동 호환)
- 랜딩 블로그 (/blog/release-v3.24) + System Admin 공지 (id=53) 생성

---

## 🔖 다음 할 일

1. **결제 시스템 사용자 검증** — Stripe Test mode 키 등록 후 자동 검증, 또는 운영에서 본인 카드 1 MYR 결제 테스트
2. **i18n 4 언어 키 추가** — 신규 영어 텍스트 (Linked to, Manual coupon input disabled, partner discount 등) ko/zh/ms 키
3. **External QR 관련 콘텐츠** — FAQ "협력업체 할인 설정" / 블로그 가이드
4. (옵션) Partner coupon 활성 시 멤버십 포인트 동시 사용 정책 검토

---

## 🔑 환경변수 / 인증 현황

기존 그대로. Stripe / PayPal 자격증명은 PaymentSettings UI 에서 issuer 별 등록.

---

## 📂 주요 문서 위치

- 개발 로드맵: `/var/www/DEVELOPMENT_PLAN.md`
- CHANGELOG: `/var/www/CHANGELOG.md`
- 결제 아키텍처: `/var/www/docs/PAYMENT_ARCHITECTURE.md`
- External QR 협력업체 할인: `/var/www/docs/EXTERNAL_QR_PARTNER_DISCOUNT.md`
- UI 가이드: `/var/www/dev-frontend/UI_DESIGN_GUIDE.md`
- 프로젝트 규칙: `/var/www/CLAUDE.md`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
