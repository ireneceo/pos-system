# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-25 (v3.18 진행 중 — 다음 세션 이어서)
**버전:** **v3.18 [Unreleased]** — v3.17 배포 후 누적
**작업 상태:** 진행 중 (다음 세션 이어서)

### 진행 중인 작업 (다음 세션 우선순위)

#### A. 주소 시스템 통일 + 자동완성 (Task #12, in_progress)
**완료 (Phase 1):**
- `Settings/SettingsPage.tsx` (`/restaurant/:id/settings`) → `<AddressFields>` 통합
  - `storeSettings.address_line_2` 추가 (type + load + handleSave)
  - country ISO select (`AddressFields` 내장 250국가 ×4언어)
  - 600 ms debounce save (`addressSaveTimerRef`)
  - country 변경 시 timezone auto-update 유지 (COUNTRIES timezone 매핑)
- `routes/store.js` → `address_line_2` allowedFields + GET 응답 추가
- 빌드: `main.a952c113.js` (1.66M)

**Irene 결정 필요 (다음 세션 시작 시):**
1. **자동완성 방식**:
   - Google Places API (정확/유료, key 필요)
   - OpenStreetMap Nominatim (무료, 30 req/min)
   - 하지 않음
2. **AutoSave 패턴 페이지 통일** — BrandCompanyInfoPage / CompanyInformationPage / AdminSettingsPage 3곳도 `<AddressFields>`로 마이그?
   - 현재 5+1=6 input 직접 사용 (동작은 OK, 컴포넌트만 다름)
3. **운영 Restaurant #10 데이터 정리**:
   - A: Irene이 운영 Settings 페이지에서 다시 입력 (안전)
   - B: cleanup 스크립트로 address 한 줄 자동 분리 (위험)

**증상 reminder (운영 #10):**
- Address: "with MIN Cafe, P-02-06A, ..., Selangor" (모든 정보 한 줄)
- City: "Kuala Lumpur" (별도, 모순)
- State: "Wilayah Persekutuan", Postal: "50000", Country: "Malaysia" 풀네임
→ Settings 페이지가 옛 5필드 폼이라 dual-source 누적된 상태. Phase 1 fix로 향후 신규 입력은 정합 보장.

#### B. F3 — 17 이메일 발송 site 전수 audit (Task #10, in_progress)
F1/F2 완료. F3는 미작성.
- `routes/{auth,comments,customers-auth,invoices-helpers,invoices-main,invoices-payment,notices,operationTickets,public,restaurants-crud,restaurants-subscription,support-tickets,users}.js`
- `services/{authService,invoiceScheduler,subscriptionScheduler}.js`
- `utils/{emailService,notificationService,systemLogger}.js`
- 각 site에서 fresh DB fetch / hardcoded 값 / stale snapshot 여부 점검 → `docs/EMAIL_INTEGRITY_AUDIT.md`

#### C. 잔여 v3.18 후보
- Task #9: `MODULE_GATED_ROUTES` prefix 정합성 (`ProtectedRoute.tsx:13-20`의 `/pos/brand/subscriptions` → 실제 `/pos/brand/general/subscriptions` 불일치)
- Task #2: Basic 전수 체험 + gap 기록 (`docs/V3_18_BASIC_TIER_GAPS.md`)
- Task #3: Basic UI gap 보강 (Task #2 결과 기반)
- Task #4: Invoice 수동 발행 prefill (financial_terms 연동)
- Task #5: Contract Detail "Open contract →" 검증
- Task #6: Pricing / FAQ / 블로그 티어 기능표 갱신
- Task #7: v3.18 검증 + 문서 마감 + CHANGELOG

---

### 완료된 작업 (이번 세션 — v3.18 누적)

#### 1. 운영 동기화 점검 + 보강 (Task #8/#11, completed)

**점검 결과:**
- 운영 DB 누락: 1 테이블 (`entity_plan_charges` — dev 잔재) + 2 enum + 13 콘텐츠 (1 blog + 12 다국어 + 11 FAQ)
- 운영 콘텐츠 6개 → 25개 (sync 후)

**적용:**
- `scripts/sync-content-to-prod.js` 신설 → 운영에 INSERT (40 inserted + 13 updated)
- 운영 enum ALTER:
  - `users.subscription_status += 'overdue'`
  - `notification_settings.entity_type += 'brand', 'foodcourt'`
- dev `entity_plan_charges` drop (코드 미참조 dead 테이블)

#### 2. 이메일 정합성 — Invoice (Task #10, partial)

**근본 원인:**
- DB header (subtotal/discount/total) vs items (calc/tax/total) 가 별도 path로 저장
- frontend가 보낸 값을 backend가 그대로 저장 → 일관성 검증 없음
- dev 79건 중 17건 같은 SST 금액이 items.tax_amount + additional_charges 양쪽 저장 (double-count risk)
- 이메일 템플릿이 additional_charges 미표시 → "Tax 0 + 179 = 189.74" 산술 모순

**Single source of truth 도입:**
- `utils/invoiceCalculation.js` 신설 — `recomputeInvoiceTotals` + `finalizeInvoice`
- 데이터 모델 정리: `items.tax_amount = 0` (Path A 폐기), tax는 `header.additional_charges`만 (Path B 표준)
- 공식: `total = subtotal − discount_amount + Σ additional_charges`

**적용된 invoice 생성/수정 site (11곳):**
- `routes/invoices-main.js` POST + PUT (PUT은 partial update 시 기존 items로 재계산)
- `services/invoiceScheduler.js` 3곳 (자동 생성)
- `routes/{brands,foodcourts,restaurants-subscription,subscriptions,hardware-quotes}.js`
- `services/subscriptionInvoiceService.js`

**Backend GET 응답 4곳 `tax` 필드 보강:**
- `routes/invoices-main.js:366, 507, 695, 1064/1254`
- 이전: `items.tax_amount` 합만 → Path B 표준화로 0 → frontend modal 모두 Tax 0 표시
- 수정: `items.tax_amount + additional_charges` 합

**이메일 템플릿 보강:**
- `utils/emailTemplates.js` `invoiceEmail` + `entityPlanInvoiceEmail`
- `additionalCharges` 행 추가, `discountLabel` 추가, phantom 0 라인 suppress (`showItemTax`)

**F2 — invoice 수정 시 이메일 재발송:**
- `PUT /api/invoices/:id` 에 `resend_email: true` 옵션 추가 (fresh fetch 후 재발송)

**Frontend tax 필드 보강:**
- `Restaurant/InvoicesPage.tsx:363`, `Owner/OwnerInvoicesPage.tsx:334`
- `inv.tax_amount` (없는 컬럼) 참조 → `additional_charges.reduce(amount)` 합산 + legacy fallback

**마이그레이션:**
- `scripts/recompute-invoice-totals.js` — 79건 재계산 (46 touched, 33 unchanged)
- `scripts/audit-tax-pattern.js` — tax 저장 패턴 진단

**검증 (3차 라운드):**
- INV-2026040005 100% 할인 적용 → backend 자동 재계산 (subtotal 179, discount 179, total 10.74) ✓
- 이메일: "Subscription 179 + SST 10.74 = Total 189.74" 산술 정확 ✓
- 79건 invariant 모두 만족 ✓
- health-check 40/40, role 5/5 PASS

#### 3. 주소 시스템 통일 (Task #12, partial)
위 "진행 중인 작업 A" 참조.

---

### 미배포 (운영 적용 보류)

이번 세션 변경분은 **운영 미배포**. `/배포` 명령 시 진행:

1. 코드 sync (rsync 자동):
   - `routes/{invoices-main,store,brands,foodcourts,restaurants-subscription,subscriptions,hardware-quotes}.js`
   - `services/{invoiceScheduler,subscriptionInvoiceService}.js`
   - `utils/{invoiceCalculation,emailTemplates}.js`
   - `pages/{Settings/SettingsPage,Restaurant/InvoicesPage,Owner/OwnerInvoicesPage}.tsx`

2. 운영 invoice 마이그레이션 (위험도 검토 필요):
   - 운영에서 `node scripts/audit-tax-pattern.js` 먼저 실행 → dev와 데이터 패턴 비교
   - 패턴 동일 시 `node scripts/recompute-invoice-totals.js --dry-run` → 검토 → apply
   - 패턴 다르면 helper 보정 필요할 수 있음

3. 운영 Restaurant #10 주소 정리:
   - Settings 페이지에서 Irene이 직접 다시 입력 (가장 안전)

---

### 업데이트된 / 신규 파일

**백엔드 신규:**
- `utils/invoiceCalculation.js`
- `scripts/sync-content-to-prod.js`
- `scripts/recompute-invoice-totals.js`
- `scripts/audit-tax-pattern.js`

**백엔드 수정:**
- `routes/invoices-main.js` (POST/PUT helper, GET 4곳 tax, resend_email)
- `routes/store.js` (address_line_2)
- `routes/{brands,foodcourts,restaurants-subscription,subscriptions,hardware-quotes}.js` (finalize)
- `services/invoiceScheduler.js` (finalize 3곳)
- `services/subscriptionInvoiceService.js` (finalize)
- `utils/emailTemplates.js` (additional_charges + discount + phantom suppress)

**프론트엔드 수정:**
- `pages/Settings/SettingsPage.tsx` (AddressFields 통합 + line2 + debounce)
- `pages/Restaurant/InvoicesPage.tsx` (tax field)
- `pages/Owner/OwnerInvoicesPage.tsx` (tax field)

**운영 DB 변경 (직접 적용됨, 코드 sync 외):**
- ALTER `users.subscription_status` enum
- ALTER `notification_settings.entity_type` enum
- INSERT/UPDATE 53 contents (40 new + 13 update)

**Dev DB 변경:**
- DROP `entity_plan_charges` table
- 79 invoices recomputed (header/items 정합성)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
다음 세션 우선순위 (A → B → C 순)와 Irene 결정 필요한 항목 3가지 확인하고 작업 시작.
```
