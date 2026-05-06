# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-06 (v3.25 Pricing/Module Audience — backstage cleanup, 버전 미상승)
**버전:** **v3.24** (운영 배포 완료, v3.25 는 미배포 backstage 정합화)
**작업 상태:** v3.25 커밋 직전

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

## 📦 2026-05-06 작업 (v3.25 Pricing/Module Audience — backstage cleanup)

### 배경
PricingPage 의 모듈 정렬이 깨져 있고 (sort_order=0 모듈 19개 → Basic 그룹 상단에 buyer_*/supplier_* 가 잘못 끼어듦), buyer_* 4개가 `category='basic'` 으로 잘못 분류, target_user_type='all' 이 광범위해서 Owner 에 잘못 노출 + Supplier 에 누락. Features 페이지 빈 캡처 슬롯도 ~50 존재.

### 설계 문서
`docs/PRICING_MODULE_AUDIENCE_v3.25.md` (305줄, 7-단계 작업 계획).

### 수행 내역

| # | 단계 | 결과 |
|---|------|------|
| 1 | DB sort_order + category 정합화 | `update-module-sort-and-category-v3.25.js` 실행. sort_order=0 모듈 0건. buyer_* 4 = advanced. 96 모듈 (target=restaurant 24 / brand 23 / foodcourt 22 / owner 10 / all 4 / supplier 13) |
| 2 | PricingPage filter 분기 | 설계 §4 합성 ENUM 안 대신 한 줄 차단 (line 899: `if owner && code.startsWith('buyer_') return false`). supplier 는 'all' 매치로 자동 노출 |
| 3 | FeaturesPage Supplier 탭 buyer_* 4 카드 | 4 탭 모두 등록 (Supplier 탭 'Procurement' wording 차별화) |
| 4 | 시드 (idempotent) | `seed-buyer-data-v3.25.js` (Brand R10 → Demo Supplier 매입 흐름: contract + 3 PO + trade invoice) / `seed-foodcourt-rich-v3.25.js` (FC 7 admin 4 + staff 5 + branch 2). 모두 기시드 skip |
| 5 | Features 캡처 (supplier 4) | supplier_dashboard / supplier_orders / supplier_contracts / supplier_trade_invoices 신규 캡처. FeaturesPage 의 0→1 갱신. 나머지 28 placeholder 슬롯은 honest "coming soon" 유지 (데이터 시드 큰 작업 동반 필요, 설계 §6 한계와 일관) |
| 6 | 모델 ENUM 확장 | AddonModule.target_user_type +supplier / PlanTemplate.plan_target +supplier / Invoice.issuer_type +supplier / Invoice.status +credit. DB sync 완료 |
| 7 | 빌드 | `build:dev` exit 0, 89초, `main.a29df543.js` (1.5M), nginx 배포 완료. TS 경고 누적 잔여 (POStatus 누락 / Badge variant=neutral) — v3.25 직접 origin 아님, 후속 별도 cleanup |

### 부속 cleanup (같이 묶음)
- `models/index.js` — Ingredient FK 폐기 (IngredientSellerProduct join table 단일화)
- `scripts/sprint1-supply-chain-migration.js` — 위 변경 동기화
- `services/invoiceScheduler.js` — subscription invoice 컬럼 누락 보강 (issued_by, status pending → pending_payment, calculated_amount + total_amount)

### 검증 (10단계)
- v3.25 핵심 6/6 PASS (addon-modules total=96 / buyer_* category=advanced / sort=0 0건 / target=supplier 13 / target=all 4 / owner buyer_* 0건)
- health-check 73/73 PASS
- SPA `/pricing` 200, `/features` 200
- supplier_{dashboard,orders,contracts,trade-invoices}_1.webp 200
- anon `/api/addon-modules` 401, `/api/purchase-orders` 401

### 미커밋 분리 (다음 작업)
- **Signup UX 개선** — `SignupPage.tsx` +364줄 (missing fields UI + 비밀번호 실시간 체크리스트), `ReferralSignupPage.tsx` +236줄, `routes/auth.js` (`INVALID_EMAIL_DOMAIN` 에러), `services/authService.js` (이메일 MX 검증 추정), 4언어 i18n. 별도 검증/커밋.
- **Frontend 잡다 변경** — MainLayout, Admin/BG/FG/Owner Dashboard, Demo, Pricing, Login, AdminManagement, Notices, OwnerOperationInquiry, RestaurantDashboard, roleDisplay.ts, routes/users.js (Brand/FC users 권한 확장), routes/restaurants-crud.js (Brand multi-restaurant view), 4언어 admin/common/settings.json. 의도 분류 후 별도 커밋.

### 수정된 파일 (v3.25 커밋)
**Backend (8)**
- models/AddonModule.js, models/PlanTemplate.js, models/Invoice.js, models/index.js
- scripts/update-module-sort-and-category-v3.25.js (신규), scripts/seed-buyer-data-v3.25.js (신규), scripts/seed-foodcourt-rich-v3.25.js (신규)
- scripts/sprint1-supply-chain-migration.js, services/invoiceScheduler.js

**Frontend (3)**
- src/pages/Landing/PricingPage.tsx, src/pages/Landing/FeaturesPage.tsx
- scripts/capture-features.js
- public/images/features/dashboard/supplier_{dashboard,orders,contracts,trade_invoices}_1.{webp,png} (8 파일)

**Docs (1)**
- docs/PRICING_MODULE_AUDIENCE_v3.25.md (신규)

---

## 📦 2026-05-06 작업 (Signup UX 개선 — backstage cleanup)

**SignupPage / ReferralSignupPage 의 사용자 친화적 흐름 개선. missing-fields UI + 비밀번호 실시간 체크리스트 + 강도 미터 + INVALID_EMAIL_DOMAIN 에러 핸들링 + signup transaction rollback guard.**

### 수행 내역
- `SignupPage.tsx` (+364줄): step-별 missing fields 시각화 + 비밀번호 4-요건 체크리스트 (length/upper/lower/digit) + 강도 미터 (Weak/Fair/Strong) + 비밀번호 일치 표시
- `ReferralSignupPage.tsx` (+236줄): 같은 패턴 적용
- 4언어 i18n landing.json `signupPage.*` 17 신규 키 (×4 = 68 entries)
- `routes/auth.js`: signup / referral-signup 의 `INVALID_EMAIL_DOMAIN` 에러 코드 핸들러 추가
- `services/authService.js`: signup transaction double-rollback guard ("Transaction cannot be rolled back" 노이즈 차단)

### 검증
- /signup, /referral/signup SPA 200
- npm run i18n:verify exit 0 (errors=0, warnings 누적 잔여)
- /api/auth/signup endpoint 200/400 응답 정상 + 표준 에러 형식
- 빌드 main.a29df543.js (이미 v3.25 빌드에 포함됨, exit 0)

---

## 다음 할 일
1. **Frontend 잡다 변경** 의도 분류 후 별도 커밋
   - MainLayout, Admin/BG/FG/Owner Dashboard, Demo, Pricing/Login/AdminManagement/Notices/OwnerOperationInquiry/RestaurantDashboard, roleDisplay.ts
   - routes/users.js (Brand/FC users 권한), routes/restaurants-crud.js (Brand multi-restaurant)
   - 4언어 admin/common/settings.json
   - dev-frontend/package.json + lock (의존성 변경)
2. (v3.25 + Signup UX 운영 배포는 Irene `/배포` 명령 시에만)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
