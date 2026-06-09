# Purple POS — 개발 세션 상태

<!-- AUTOSAVE-STALE-BANNER -->
> **[AUTO-SAVE STALE] (2026-06-09 01:20, idle 17727s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.
> 변경된 작업 파일: brand.json,brand.json brand.json,brand.json
<!-- /AUTOSAVE-STALE-BANNER -->

## 현재 작업 상태
**마지막 업데이트:** 2026-06-08
**버전:** v3.51 (2026-06-08 운영 배포, Backup 20260608_190859, smoke 9/9)
**작업 상태:** 진행 중 — 첫 유료 멀티지점 브랜드 출시 하드닝. **Phase 1+2+3 완료·검증·운영 배포 완료(2026-06-08, Backup 20260608_151213).** **v3.51 배포(2026-06-08, Backup 20260608_190859, Smoke 9/9): 메뉴/아이템 시간제한 스케줄 + 카테고리 이모지 피커 + Settings 모바일주문 정돈. 배포 중 `products.availability` 컬럼 운영 누락 적발→수동 ALTER 보정·검증(원인=배포가 sync-database를 --alter 없이 호출, 메모리 정정함).** 다음 = Phase 4(전파) 또는 지시 대기.

추가 작업(이번 세션): GC(GIT Consulting, owner 23) brand-products 48건 운영 카테고리 재분류 — Sauces(15)/Packaging(20)/Branding(3)/Ingredients(10)/Printing(0), 빈 K-DINE Brunch 삭제. category_id만 변경(브랜드 연결 보존).

### 진행 중인 작업
- **첫 유료 멀티지점 브랜드 출시 하드닝 (설계: docs/OPERATIONAL_READINESS_AUDIT.md §8, 메모리 [[project_paid_launch_audit]])**
  - 결정(Irene): ① 멀티지점 청구 = 지점별 인보이스 경로 통일 ② 전체 설계 먼저 → 단계별 구현·매 단계 /검증
  - **Phase 1 (격리) 완료·검증·DEV반영**: P0-5 dashboard 미인증 5라우트 폐기 / P0-6 IDOR 가드(auth.js `userCanAccessRestaurant` + coupons/optionGroups/store/orders PATCH 5·merge). 실호출 7/7 차단·본인지점 정상. print-guard 재bless
  - **Phase 2 (게이팅) Wave A 완료·검증·DEV반영**: P0-2 `resolveRestaurantModules`(plan_type ∪ 활성 entity plan = 합집합) + requireRestaurantModule 배열 any-of + allowed-routes 정렬(UI=백엔드). P0-3 레스토랑 재고/레시피/재료 게이트(inventory-routes barrel / recipes.js / restaurants-ingredients.js + ingredients.js, path-prefix 좁힘). brand-* 읽기 비차단. **영향측정 과차단 0건**
  - health-check **100/100** (격리 11 + 게이팅 2 케이스 영구 추가). 인쇄 보호파일 무접촉
  - **Phase 2 Wave B-1 (브랜드 Advanced) 완료·검증·DEV반영**(2026-06-08): brand-products(requireBrandUserModule, BG경로만, 레스토랑 카탈로그 읽기 비차단) + brand-inventory(requireBrandModule '/brands/:brandId/inventory*'). requireBrandModule param화 + requireBrandUserModule 신규. 영향측정 과차단 0(차단=plan없는 테스트브랜드 2건). 유닛 3경로 + 실API + health-check 100/100 + print-guard 8/8
  - **Phase 2 완료.** Wave B-2(buyer 버티컬)는 실익0(buyer_* 전 플랜 포함)+지점 과차단 리스크로 **보류(Irene 결정)**
  - **Phase 3 (결제 정확성) 완료·검증·DEV반영**(2026-06-08):
    - **P0-1** 엔티티 구독 결제→복구 부재 해결: `subscriptionScheduler.restoreEntitySubscription(payerType,payerId)` 신규(User.subscription_status overdue/suspended→active) + `invoiceLifecycle.handleInvoicePaid` 에 엔티티 payer(brand_manager/foodcourt_manager/restaurant_owner) 복구 분기. 실 인보이스(inv178, restaurant_id=null) 결제→복구 라운드트립 검증, 원복. (스케줄러는 suspended 엔티티를 재조회 안 함 → 결제가 유일 복구 트리거임 확인)
    - **P0-4** PayPal webhook fail-open→**fail-closed**: webhookId 미설정 시 400 거부(Stripe와 동일). 위조 PAYMENT.CAPTURE.COMPLETED 실HTTP→400 미처리 검증. dev엔 webhookId 0개라 그 전엔 완전 fail-open이었음
    - **P1-1** 인보이스 음수 total: `recomputeInvoiceTotals` 에 `discount=min(max(0,d),subtotal)` + `total=max(0,...)` 캡. jest 3건
    - **P1-2** webhook 금액 교차검증: `passesAmountCrossCheck` 헬퍼(3 paid 사이트 적용) — 과소결제/통화불일치 시 paid 보류(payment_notes 기록). 과다/오차내/판독불가는 통과(정상결제 차단 금지). jest 6건
    - **P1-3** 중복 결제 세션: Stripe(open session retrieve) / PayPal(CREATED order retrieve) 재사용 가드 — 이중 세션→이중 결제 방지. 모듈 로드 OK, **full 검증은 sandbox e2e 필요**
    - **P1-4** 비결함 확정: brand_manager 인보이스는 `payer_type='brand'`(게이트웨이 축)로 결제, `ensurePayerAccess('brand')`=owner_id 통과. ALLOWED_PAYER에 brand_manager 추가는 범주오류(추가 안 함). BG user6→brand1/2/4 데이터로 확인
    - 회귀 안전망 영구 추가: health-check **101/101**(P0-4 위조 webhook 케이스) + jest payment-flow **13/13**(P1-1×3+P1-2×6) + print-guard 8/8
  - **운영 배포 완료(2026-06-08, Backup 20260608_151213, Smoke 9/9).** 배포 전 운영 PayPal **webhookId 누락** 발견(enabled+clientId 있는데 webhookId 없어 fail-closed 시 webhook 전부 거부 위험) → PayPal에 **이미 등록된 라이브 webhook**(id=`8MU24345NX395951Y`, url=purplehere.com/api/webhooks/paypal, events=PAYMENT.CAPTURE.COMPLETED/DENIED) 발견 → 운영 system_settings.payment_settings.paypal.webhookId 에 병합 저장. 운영 검증: 위조 webhook→400 서명거부, health 200. (Stripe는 webhookSecret 기설정·정상)
  - 잔여(배포 무관): **sandbox 결제 e2e**(dev에 test 게이트웨이 키 없어 미실행) — 차후 demo 매장으로 실행 가능. P1-3 세션재사용 full 검증도 여기 포함.
  - ⚠ **운영 배포 전 필수**: 운영 DB로 §8.5-1 영향측정 재실행 + 실 Enterprise 지점 200 허용 확인(dev엔 비데모 Enterprise 0개). 그 후 /배포
  - 이후: Phase 3(결제 지점별 인보이스 통일 — 인쇄급 신중 + sandbox e2e 의무) → Phase 4(전파) → Phase 5(안전망) → Phase 6(구조 정리)

### 완료된 작업 (이번 세션 — DEV 미배포)
- 전수감사 5영역(격리/결제/게이팅/전파/구조) → P0~P3 + 설계문서 §8
- Phase 1 격리: dashboard 누출 폐기 + 지점 간 IDOR 차단(주문/쿠폰/옵션/설정)
- Phase 2 게이팅 Wave A: 멀티지점 합집합 resolver + 레스토랑 재고/레시피/재료 API 요금제 게이트
- health-check 100/100 (보안 13케이스 추가)

### 완료된 작업 — 메뉴 가용 스케줄 + 이모지 피커 통일 (이번 세션, DEV 미배포)
- **카테고리 스케줄(파트1, 직전)**: 요일 토글 + 이벤트 시작/종료일 + 표시방식(hide/disable). 매장 타임존 평가, 공용 헬퍼 `dev-backend/utils/availabilitySchedule.js`(isWithinSchedule/offScheduleMode)
- **아이템별 스케줄(이번)**: `Product.availability` JSON 컬럼(ALTER 완료) + GET 노출 + mobile-public 평가(카테고리 AND 아이템, 아이템이 더 구체적→우선). hide=목록 제외 / disable=회색+주문불가. 신규 `ItemScheduleEditor.tsx`를 add/edit/set 3모달에 배선. MenuContext 타입+create/update payload. 로케일 4언어(menuManagementPage.*) 14키
- **브랜드 카테고리 이모지 피커 통일**: 신규 공용 `components/Common/EmojiPickerField.tsx`(레스토랑과 동일 60개 grid). BrandMenuCategoriesPage 텍스트입력 → 피커로 교체
- 검증: 빌드+DEV배포 / API 전경로 9/9(create→DB→mobile disable→hide→해제, cleanup) / 집중 headless mount 7/7(메뉴관리 모달 ItemScheduleEditor + 브랜드 이모지 grid + 모바일 메뉴) / health-check **101/101** / print-guard 8/8(인쇄 무접촉) / i18n 0 errors. **운영 배포는 /배포 지시 대기**
- **Settings>Mobile Order 정돈 + Item Time Restrictions 중앙관리 추가**(이번, Irene 지시): ① Popular "Source Categories"를 Show Popular Menu 토글 아래 중첩(독립 카드 제거=auto-flow 밀림 근본해결) ② Category+Item Time Restrictions를 반응형 2열 쌍으로 묶음 ③ **Item Time Restrictions 신규**(Category와 평행): 아이템 검색 picker→ItemScheduleEditor(hideToggle 신모드)→PUT /menu/product availability. Product.availability 중앙관리(메뉴관리 개별편집도 유지=둘 다 같은 데이터, Irene 결정). i18n 7키×4언어. 검증: 빌드+배포(main.5d5328ea) / Settings mount + Item 추가 E2E+DB왕복(Spring Rolls→PUT→저장→cleanup) / 메뉴관리 토글모드 회귀 5/5 / hydration 0 / print-guard 8/8 / health 101/101

### 다음 확정 작업
- 없음 — 지시 대기. (Phase 3 완료·DEV반영. 다음은 Irene 지시: 운영 배포(/배포 + 위 ⚠ 3 게이트 선행) 또는 Phase 4(전파 P1-6/7).)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- 운영 배포 전: 운영 DB 영향측정 재실행 + 실 Enterprise 지점 허용 경로 확인
- Phase 3~6 (결제 통일 / 브랜드 전파 backfill·lock / 구조 정리: models/index.js 6모델, SettingsPage 분리, app.js 문서 드리프트)
- 직전 v3.48~v3.50 실화면/실프린터 눈확인 (아이템취소 티켓 / KDS 헤더 로그인)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
