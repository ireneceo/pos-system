# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-11
**버전:** **v3.28** (Unreleased 누적, 운영 배포 시 버전 결정)
**작업 상태:** 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-05-11)

**Sprint 1 — RestaurantsPage SubscriptionFormFields 통합**
- v3.27 sprint 4 의 4 페이지 구독 form 통일을 RestaurantsPage Add/Edit 모달까지 확장
- SubscriptionFormFields 에 hideCurrency/hideSectionHeader 옵션 추가 (backward-compatible)
- Adapter 함수 toSubscriptionValues / fromSubscriptionPatch (legacy camelCase ↔ snake_case)
- Backend POST 핸들러 보강: discount_* 필드 처리 + subscription_end auto-calc fallback (PUT 에만 있던 로직)
- 검증: API 25/25 + health-check 73/73 + 빌드 0 new warning

**Sprint 2 — ManagersPage Edit SubscriptionFormFields 통합 + User.auto_renew 컬럼 추가**
- Manager interface 에 discount/treatAsTrial 필드 추가
- ManagersPage Edit 모달의 5 필드 → `<SubscriptionFormFields userType="brand|foodcourt|owner">` 1 컴포넌트
- handleUpdateManager 에 discount_type/value/reason + subscription_status 전송 추가
- Pre-existing bug 발견 + fix: User 모델에 auto_renew 컬럼 없어서 BG/FG/Owner 의 auto_renew 데이터 silently drop. ALTER TABLE 로 컬럼 추가
- 검증: API 9/9 + health-check 73/73 + 빌드 0 new warning

**Sprint 3 — Reservation R1 customer_id 결함 fix + 추가 결함 3건**
- 결함 A (customer_id NULL): POST 트랜잭션 + RestaurantCustomer.findOrCreate + reservation_count++ 원자적 실행. 첫 예약 사용자의 본인 /me 조회·취소 차단되던 critical defect 수정
- 결함 B (이중계산): PATCH /:id/status status='completed' 분기의 reservation_count++ 제거 (POST 에서 이미 증가)
- 결함 C (정책 우회): PATCH /me/:id 의 party_size min/max + 새 슬롯 캐파/min_advance 재검증 추가
- scripts/backfill-reservation-customer-id.js 운영 안전망 + health-check reservation 카테고리 5 케이스 신규
- 검증: R1 fix flow 14/14 + health-check 73 → 78

**Sprint 4 — Reservation 모듈화 + Settings UI 통일**
- AddonModule 등록: reservations (target=restaurant, advanced, sort_order=235 — 모바일오더 230 다음, price=$0)
- PlanTemplate Basic/Pro/Enterprise 모두 included_modules 에 reservations 추가
- middleware requireRestaurantModule 신규 + store.js PUT settings 의 reservation_settings.enabled=true 토글 시 module 검증 (미보유 plan 매장 403)
- MainLayout NavItem hasModule gate + RestaurantsPage 매장 카드 보라색 배지
- list API transform 에 reservation_settings 명시 추가 (검증 중 발견한 누락 결함)
- FeaturesPage Restaurant 탭 + PricingPage 모듈 라벨 + landing.json 4언어
- PageHeader 산업표준 ⚙️ Settings 단축 (Stripe 패턴). settingsHref/settingsLabel prop + `<PageSettingsLink>` 재사용 컴포넌트
- 4 페이지 적용: Reservations / LiveOrders / KitchenDisplay / Customers (의미 적합한 곳만 — Promotions/Reports 는 부적합 차단)
- 검증: 모듈 gating 9/9 + flow 6/6 + deep link 4단 검증 통과 + health-check 78/78

### 다음 할 일

세션 마무리 시점. 후속 작업 후보 (Irene 우선순위 결정):
1. 운영 배포 (`/배포`) — Unreleased 4 sprint 누적 + DB 마이그레이션 (User.auto_renew 컬럼, addon_modules reservations, PlanTemplate included_modules, dev backfill 스크립트 운영 실행 점검)
2. 운영 demo 시드 ID 파라미터화 (트랙 C 운영 적용)
3. SubscriptionsPage Edit SubscriptionFormFields 통합 검토 (Status/others 보존 design 필요)
4. PageSettingsLink i18n 4언어 (현재 영문 fallback)
5. Reservation R2 (deposit 결제 UI / 캘린더 monthly view / WaitingList / 보증금 자동 환불 cron)
6. RestaurantCustomer 모델/DB 컬럼 불일치 cleanup (name/phone/email silently dropped)
7. Reservation 동시 booking race window — advisory lock

---

## 운영 배포 시 액션 (Unreleased → v3.x 시)

1. 코드 배포 (`/배포`)
2. 운영 DB 자동 sync (User.auto_renew 컬럼 추가)
3. AddonModule + PlanTemplate seed 적용 (운영용 별도 스크립트 또는 SQL)
4. `node scripts/backfill-reservation-customer-id.js --dry-run` → 손상 있으면 실행
5. (선택) 과거 reservation_count 이중계산 정정 SQL — Irene 결정

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
