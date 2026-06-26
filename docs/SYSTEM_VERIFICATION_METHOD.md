# 제대로된 검증 방법 — 주문·인쇄·단계이동 철저 탐지 (안전 우선)

> 2026-06-26 Irene 질문: "소소한 기능들과 전체 주문·인쇄·단계이동 과정을 철저하게 문제 찾아낼 방법 없어? 제대로된 검증 방법."
> 제약(절대): **인쇄와 모바일오더 주문에 문제를 일으키지 않는다.** 검증이 매장 생명선을 건드리면 안 됨.
>
> 이 문서 = 우리가 가진 검증 도구를 **계층(Layer)으로 엮어** "크래시 안 나나?" 수준을 넘어 **흐름의 정확성·경쟁상태(race)·불변식(invariant)·체감품질**까지 자동으로 잡는 단일 방법. 관련: [[reference_print_safety_net]], docs/ORDER_FLOW_MATRIX.md, docs/PRINT_RULES_MATRIX.md.

---

## 0. 🔒 안전 계약 (이걸 어기면 검증 자체가 사고)

검증 엔진은 아래를 **무조건** 지킨다. 어기면 즉시 중단(fail-closed).

1. **데모 매장 전용.** `is_demo=true` 매장에서만 쓰기 동작. 아니면 즉시 중단(verify-order-lifecycle.js 의 기존 가드 재사용). **운영 매장 주문/결제/재고 절대 무접촉.**
2. **인쇄 = "상태"만 검증, 종이 출력 안 함.** 엔진은 물리 프린터·QZ·브라우저 인쇄 경로를 **호출하지 않는다.** 대신 **인쇄 상태기계**(needs_print / printed_at / print_claimed_at / pending-print / pending_reprint)와 **라우팅 미리보기**(`/api/diagnostic/autoprint/preview`, 읽기 전용)만 본다. 실제 종이 = Irene 눈 확인 1회(L6)로 분리.
3. **모바일오더 = 데모에서 공개 엔드포인트로 모사 + 마커 + 멱등 정리.** 실결제 금지(데모 현금/sandbox만). 운영 모바일 주문 흐름 무접촉.
4. **생명선 코드 무수정.** 엔진은 인쇄 상태를 **읽기만** 한다. 인쇄 코드(billPrint/useAutoPrintPoller/orders-crud 인쇄블록)를 고치지 않는다. 매 실행에 `check-print-guard.js`(지문)로 **누가 실수로 생명선을 건드렸는지** 역으로 감시.
5. **모든 쓰기는 마커+멱등 정리.** 테스트 주문은 marker(customer_name 등)로 표시하고 끝에 FK-safe 삭제. 재실행해도 누적 0.
6. **운영서버에는 읽기 전용 불변식 검사만.** 흐름/카오스(쓰기) 계층은 데모에서만. 운영은 L4 읽기 점검만 허용.

---

## 1. 왜 지금 "철저"하지 않은가 (현 상태 진단)

가진 도구는 대부분 **"터지나?"(mount)** 와 **"API 계약 맞나?"(health-check)** 다. 못 잡는 것:
- 주문 한 건의 **전체 일생**(모바일/POS 생성 → KDS 표시 → 단계 pending→preparing→ready→served → 각 시점 인쇄상태 → 결제 → 빌)을 **이어서 관찰**하며 시점마다 불변식 검사 — 지금은 토막(API 단건)으로만.
- **경쟁상태/끊김** — 매장 실제 고장모드(thefire 와이파이): 느린 네트워크·끊김·중복탭·오프라인. 한 번 돌리는 happy-path 로는 안 드러남. **자잘한 문제 = 대부분 나쁜 네트워크에서의 간헐적 race.**
- **불변식** — "티켓 정확히 1번", "needs_print 영구 안 막힘", "단계 거꾸로 안 감", "더블탭으로 주문 2개 안 생김" 을 **사고 난 뒤** 반응적으로 확인. 상시 단언이 아님.
- **체감품질** — 느린 탭 반응·레이아웃 튐·로딩표시 없음·컴포넌트 불일치(=어설픈 느낌).

해결 = 아래 7계층. 핵심 통찰: **흐름을 한 번이 아니라 여러 번·무작위·네트워크 악조건으로 반복**(주문 일생 fuzzer)해야 race 가 드러난다.

---

## 2. 검증 7계층 (L0–L6)

| L | 이름 | 잡는 것 | 안전 | 도구(있음/신규) |
|---|------|---------|------|------------------|
| **L0** | 정적 가드 | 생명선·계약·디자인·타임존·i18n 깨짐 | 무쓰기 | 있음: check-print-guard·check-design-guard·timezone-check·i18n verify·check-print-field-contract·build |
| **L1** | API 계약/헬스 | 라우트 인증·IDOR·핵심 API 동작 | 무쓰기/익명 | 있음: health-check.js (107) |
| **L2** | **전체 흐름 시뮬레이션** | 주문 일생 + **인쇄상태** + 단계규칙 정확성 | 데모+정리 | **확장**: verify-order-lifecycle.js → verify-order-flow.js |
| **L3** | **경쟁/복원력(카오스)** | 중복탭·동시claim·stale-write·죽은claim복구·오프라인 | 데모+정리 | **신규**: verify-order-chaos.js (일부 health-check print 에 있음) |
| **L4** | **불변식 스윕** | 항상참 규칙 위반(티켓1회/안막힘/단조/고아) | 데모쓰기 / **운영 읽기전용** | **신규**: verify-invariants.js (print-status 엔드포인트 활용) |
| **L5** | 마운트 + **체감품질** 스캔 | 크래시·콘솔에러·**탭지연·레이아웃튐·로딩없음·컴포넌트불일치·터치타겟** | 무쓰기(헤드리스) | **확장**: headless-page-sweep.js + 신규 probe |
| **L6** | 실프린터 + 실눈(사람 1회) | 종이 출력·실제 손맛 | 사람 | Irene |

### L2 — 전체 흐름 시뮬레이션 (핵심 엔진)
verify-order-lifecycle.js 를 **흐름 + 인쇄상태 + 단계규칙**까지 단언하도록 확장.

**검증할 흐름(진입 2경로 × 변형):**
- 진입: ① POS 생성 ② **모바일 공개 주문**(table_number 필수 가드 포함)
- 변형: 단일품목 / **다중 스테이션**(KQ1·KQ2·BAR 분배) / **+Round 추가** / 테이블 이동 / 주문 전체 취소 / **부분수량 취소** / **아이템 void** / 합본(takeaway 머지)

**각 전이마다 단언(인쇄는 상태만):**
- 생성 → `needs_print=true`, pending-print 에 등장, 스테이션 라우팅 미리보기가 **각 품목을 옳은 스테이션**으로 버킷.
- 인쇄확정(`/printed`) → `printed_at` 찍힘 1회, pending-print 에서 사라짐, **다시 안 나타남**.
- +Round → **새 회차 품목만** kitchen_items 로(이전 품목 printed_at 보존).
- 이동/취소/void → `pending_reprint` 에 notice + **served 품목 제외**(printed_at 유지) + 1회 후 정리.
- 단계: pending→preparing→ready→served, **All=전 주방 완료여야 승급**, 주방탭=그 주방만(KITCHEN_DISPLAY_RULES §🔒 그대로). 거꾸로(monotonic 위반) 0.
- 금액: computeOrderTotals 공식(서비스차지 dine-in 분모, 세금 afterDiscount).

### L3 — 경쟁/복원력 (매장 실고장 재현)
thefire 실패모드를 **일부러** 만들어 분실/중복 0 확인:
- **중복탭**: 같은 idempotency_key 2회 → 주문 1개.
- **동시 print-claim N개 → 정확히 1개만 claimed**(티켓 중복 0). (health-check print 에 이미 1건 — 여기서 N·반복).
- **stale-write**: 옛 base_updated_at PATCH → 409 STALE_WRITE, 수량 보존.
- **죽은 claim 복구**: claim 후 /printed·/rearm 둘 다 안 보냄 → 10초 뒤 needs_print 되살아남(분실 0).
- **오프라인→온라인**: 큐잉 후 flush 시 멱등(주문 1개).
- **네트워크 throttle/끊김** 하에 L2 흐름 1회 재생 → 분실·중복·멈춤 0.

### L4 — 불변식 스윕 (상시 참 규칙)
데모 쓰기 후 + **운영은 읽기 전용**으로 주기 점검. (방금 만든 `/api/print-events/restaurant/:id/status` 가 미인쇄/사유의 단일 소스 — 여기에 물림.)
- 인쇄된 주문은 `printed_at` **정확히 1회**.
- `needs_print=true` 가 **사유 없이** N분 초과 정체 0(있으면 사유코드 동반).
- 모든 품목은 스테이션 보유 **또는** 첫 스테이션 흡수(고아 0).
- 단계 **단조**(거꾸로 0), served 후 부활 0.
- **같은 테이블·유사 주문 N초 내 중복 0**(더블오더 감지).
- 익명 보호/IDOR 0(L1 과 겹치되 흐름 데이터로 재확인).

### L5 — 체감품질 스캔 (어설픈 느낌 → 데이터)
headless-page-sweep(95페이지, 크래시·콘솔에러) 위에 **체감 probe** 추가, 핫스크린(POS·플로어플랜·결제·KDS) 중심으로 **"어설픈 순간 Top 20"** 산출:
- **탭→반응 지연**(누른 뒤 화면 변화까지 ms) 임계 초과 지점.
- **레이아웃 튐**(CLS) — 글자/칸 점프.
- **로딩/빈상태 없음** — 데이터 대기 중 멈춘 화면(흰/굳음).
- **상호작용 중 콘솔에러**.
- **컴포넌트 불일치** — RA 표준/공용부품 안 쓴 버튼·표·모달(check-design-guard 확장).
- **터치타겟 < 44px**, hover 의존, 터치 후 색 굳음.

---

## 3. 실행 방식 (게이트 + 증거)

- **모든 변경/배포 전 자동 게이트(fail-closed):** L0 → L1 → L2 → L3 → L4(데모). 하나라도 빨강이면 막힘.
- **안정화 증거(이 이니셔티브):** L5 를 핫스크린에 돌려 Top 20 → docs/PERCEIVED_STABILITY_INITIATIVE.md 의 백로그로.
- **반복/카오스가 핵심:** L2·L3 을 **루프(예: 20회)·무작위 변형·throttle** 로 돌려 간헐 race 를 끌어냄(1회 통과 ≠ 안정).
- **운영:** L4 읽기 전용만(쓰기 0). 실프린터·실손맛(L6)은 사람 1회.

## 4. 신규로 만들 것 (우선순위)
1. `dev-backend/scripts/verify-order-flow.js` — L2(흐름+인쇄상태+단계, 2경로·8변형). verify-order-lifecycle.js 확장.
2. `dev-backend/scripts/verify-order-chaos.js` — L3(중복탭·동시claim·stale·죽은claim·오프라인·throttle, 루프).
3. `dev-backend/scripts/verify-invariants.js` — L4(불변식, 데모쓰기+운영읽기). print-status 활용.
4. `dev-frontend/scripts/perceived-quality-scan.js` — L5(체감 probe, 핫스크린 Top 20).
5. 게이트 묶음 스크립트 + `health-check.js` 카테고리 추가(`--category=flow`).

> **불변:** 전부 §0 안전계약 준수. 인쇄=상태만, 모바일오더=데모 공개경로+정리, 생명선 무수정. 종이·손맛만 사람.
