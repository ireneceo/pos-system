# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-03 (v3.24 + backstage cleanup 후속 배포 완료)
**버전:** **v3.24** (운영, backstage cleanup — 버전 미상승)
**작업 상태:** 완료

---

## ⚡ 빠른 재개 (새 세션에서)

```
session-state.md 읽고 이어서 개발해.
```

---

## 📦 오늘 완료한 작업 요약

### 라운드 A — v3.24 운영 진입 (오전)
- Stripe / PayPal 결제 표준화 (Subscriptions API + Hosted Checkout + Customer Portal)
- Webhook 8종 + signature + dedupe
- External QR ↔ Coupon 자동 매핑 (협력업체 할인)
- 4 issuer PaymentSettings 정합화 + autoCharge 토글 제거
- PayPal 가이드 보완 (Subscriptions/Vault + 8 events)
- 운영 진입 v3.24 + 랜딩 블로그 + System Admin 공지 자동 등록

### 라운드 B — backstage cleanup 후속 배포 (오후, 버전 미상승)
- **데모 5 역할 정합화** — Foodcourt General + Multi-Restaurant Owner 신규 user 생성, 순서 정렬
- **Multi-Restaurant Owner 표시명** — `utils/roleDisplay.ts` 헬퍼 (점진 sweep)
- **헤더 PlanBadge** — 대시보드 우측 상단 보라 그라데이션 pill (현재 plan 표시)
- **5 역할 enterprise fallback 정합** — Owner Enterprise (13 modules) / Supplier Advanced (13 modules)
- **demo-login endpoint** — 번들에서 password 평문 0건 (`/api/auth/demo-login` + 화이트리스트 + is_demo/is_test 가드)
- **App.tsx Supplier default redirect** — /pos/supplier/dashboard case 추가
- **Pricing 19 누락 모듈** + **Features 13 누락 entry** 보강 (supplier / fc / buyer)
- **운영 DB demo user 5종** 정합 (foodcourt + owner + supplier 신규 생성)

---

## 🔖 다음 할 일

1. **Multi-Restaurant Owner 표시 sweep** — 157곳의 'Restaurant Owner' 텍스트를 `getRoleDisplayName()` 헬퍼로 점진 적용 (Profile / Notices / Reports / Admin 페이지 등)
2. **데모 sample data 확장** — Multi-Owner 의 multi-restaurant 매핑 (`restaurant_managers` ownership), Foodcourt 의 sample tenants, Supplier 의 product/contract sample
3. **i18n 4 언어** — Multi-Restaurant Owner / B2B Procurement / 신규 모듈 description ko/zh/ms 키
4. **결제 Test mode 검증** — Stripe Test mode 키 등록 후 자동 검증 또는 운영에서 본인 카드 1 MYR 결제

---

## 🔑 환경변수 / 인증 현황

기존 그대로. 결제는 issuer 별 PaymentSettings (`/admin|brand|foodcourt|supplier/payment-settings`) 에서 등록.

---

## 📂 주요 문서 위치

- 개발 로드맵: `/var/www/DEVELOPMENT_PLAN.md`
- CHANGELOG: `/var/www/CHANGELOG.md`
- 결제 아키텍처: `/var/www/docs/PAYMENT_ARCHITECTURE.md`
- External QR 협력업체 할인: `/var/www/docs/EXTERNAL_QR_PARTNER_DISCOUNT.md`
- 데모 계정 가이드: `/var/www/docs/DEMO_ACCOUNT_GUIDE.md` (5 역할 + demo-login + enterprise fallback 추가)
- UI 가이드: `/var/www/dev-frontend/UI_DESIGN_GUIDE.md`
- 프로젝트 규칙: `/var/www/CLAUDE.md`

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
