# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-06-08
**버전:** v3.50 (2026-06-05 운영 배포, Backup 20260605_191333, smoke 9/9)
**작업 상태:** 진행 중 — 첫 유료 멀티지점 브랜드 출시 하드닝. **Phase 1(격리) + Phase 2(게이팅) 완료·검증(100/100), DEV 미배포.** 다음 = Phase 3(결제, 인쇄급 신중+sandbox e2e).

### 진행 중인 작업
- **첫 유료 멀티지점 브랜드 출시 하드닝 (설계: docs/OPERATIONAL_READINESS_AUDIT.md §8, 메모리 [[project_paid_launch_audit]])**
  - 결정(Irene): ① 멀티지점 청구 = 지점별 인보이스 경로 통일 ② 전체 설계 먼저 → 단계별 구현·매 단계 /검증
  - **Phase 1 (격리) 완료·검증·DEV반영**: P0-5 dashboard 미인증 5라우트 폐기 / P0-6 IDOR 가드(auth.js `userCanAccessRestaurant` + coupons/optionGroups/store/orders PATCH 5·merge). 실호출 7/7 차단·본인지점 정상. print-guard 재bless
  - **Phase 2 (게이팅) Wave A 완료·검증·DEV반영**: P0-2 `resolveRestaurantModules`(plan_type ∪ 활성 entity plan = 합집합) + requireRestaurantModule 배열 any-of + allowed-routes 정렬(UI=백엔드). P0-3 레스토랑 재고/레시피/재료 게이트(inventory-routes barrel / recipes.js / restaurants-ingredients.js + ingredients.js, path-prefix 좁힘). brand-* 읽기 비차단. **영향측정 과차단 0건**
  - health-check **100/100** (격리 11 + 게이팅 2 케이스 영구 추가). 인쇄 보호파일 무접촉
  - **Phase 2 Wave B-1 (브랜드 Advanced) 완료·검증·DEV반영**(2026-06-08): brand-products(requireBrandUserModule, BG경로만, 레스토랑 카탈로그 읽기 비차단) + brand-inventory(requireBrandModule '/brands/:brandId/inventory*'). requireBrandModule param화 + requireBrandUserModule 신규. 영향측정 과차단 0(차단=plan없는 테스트브랜드 2건). 유닛 3경로 + 실API + health-check 100/100 + print-guard 8/8
  - **Phase 2 완료.** Wave B-2(buyer 버티컬)는 실익0(buyer_* 전 플랜 포함)+지점 과차단 리스크로 **보류(Irene 결정)**
  - **다음 진입점 = Phase 3 (결제 정확성)**: 결정1 지점별 인보이스 통일 + P0-1(엔티티 결제→suspended 복구 부재) + P0-4(PayPal webhookId 미설정 fail-open→fail-closed) + P1-1~4. **인쇄급 신중 + sandbox 결제 e2e 의무.** 운영 webhook URL 절대 금지
  - ⚠ **운영 배포 전 필수**: 운영 DB로 §8.5-1 영향측정 재실행 + 실 Enterprise 지점 200 허용 확인(dev엔 비데모 Enterprise 0개). 그 후 /배포
  - 이후: Phase 3(결제 지점별 인보이스 통일 — 인쇄급 신중 + sandbox e2e 의무) → Phase 4(전파) → Phase 5(안전망) → Phase 6(구조 정리)

### 완료된 작업 (이번 세션 — DEV 미배포)
- 전수감사 5영역(격리/결제/게이팅/전파/구조) → P0~P3 + 설계문서 §8
- Phase 1 격리: dashboard 누출 폐기 + 지점 간 IDOR 차단(주문/쿠폰/옵션/설정)
- Phase 2 게이팅 Wave A: 멀티지점 합집합 resolver + 레스토랑 재고/레시피/재료 API 요금제 게이트
- health-check 100/100 (보안 13케이스 추가)

### 다음 확정 작업
- **Phase 3 (결제 정확성)** — Phase 2(게이팅) 완료. Wave B-2 buyer 버티컬은 실익0+지점 과차단 리스크로 **보류(Irene 결정)**. Phase 3 = 결정1(지점별 인보이스 통일) + P0-1(엔티티 결제→suspended 복구) + P0-4(PayPal fail-closed) + P1-1~4. **인쇄급 신중 + sandbox 결제 e2e 의무.** (Irene: "안전하게 정석대로 제대로 + 매번 /검증")

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
