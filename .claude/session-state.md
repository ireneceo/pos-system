## 현재 작업 상태
**마지막 업데이트:** 2026-08-20 #3
**버전:** v3.76 (운영 배포 완료 — Backup `20260820_190506`)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### 1. v3.76 운영 배포 — 공개 로그인 카드가 실매장을 열던 구멍 차단
- **문제**: 운영 로그인 페이지 "Test Restaurant Admin" 카드 → **rid5 The Fire(주문 335·결제 107·RM4,183)** 의 Restaurant Admin 으로 입장. 기존 방어선이 **계정 꼬리표**(`is_demo||is_test`)만 봐서 `is_test=1` 인 그 계정이 통과. v3.75 가 만든 게 아니라 원래 연결을 드러낸 것(운영 `user_contexts` **0행**).
- **수리**: 판정 기준을 **매장 `is_demo`** 로 교체 + 닿는 매장 **superset**(`restaurant_id`/`admin_id`/**`restaurant_managers`**/브랜드·푸드코트 소유·스코프/`user_contexts`) + 가드·계약 **단일소스**(`utils/demoReachableRestaurants.js`) + 403 에서 실매장 이름 제거 + 실패 사유 표시 + **TEST 카드 운영 노출 제거**(dev 전용) + 검증 하니스의 공개로그인 의존 제거 + 운영 쇼케이스 5곳 라벨 정정 마이그.
- **Fable 1차 반려**: "실제 부여는 `restaurant_managers` 인데 가드가 그 테이블을 안 본다 — 주입을 가드가 보는 테이블에만 해서 반증이 실효를 증명하지 못했다." → 운영 실측이 재확인(옛 구현이면 `test_brand_general`·`test_staff` 도 통과).
- **검증**: 고장주입 3경로 양방향 · health-check 계약을 **가드를 깨서 반증** · `verify-all --full` **16/16** · 🔒 인쇄 **8/8 무접촉** · 인쇄 라우트 34/34 · 마이그 **53/53** · 스모크 **10/10** · **운영 검증 6/6**(TEST 카드 부재 / 데모 5장 200 / The Fire 계열 3장 403 / 번들에 재고 WIP 문자열 0 / rid19~22·27 `is_demo=1` / 빈 컬럼만 배포).
- 배포 후 운영 상태: production-backend online, `/api/health` 200, 익명 `/api/orders` 401.

#### 2. 재고·판매 P1~P6 (dev 완료 · Fable 게이트 대기 · 미배포)
- **P5 배치 0 차감**(가장 큰 것): FIFO 가 배치에서만 빼서 **배치 없는 매장은 팔아도 재고가 안 줄었다**. 실제 소비량으로 줄이고 못 덮은 몫은 `[batch_shortfall N]`. 레시피·옵션·수동 3경로. *증명(롤백):* 배치0 재료 2 요청 → FIFO 0 → 옛 15 vs 현재 13.
- FIFO 함수가 두 벌이던 것(`inventory-extra.js` 사본) 제거 → 서비스 단일 소스.
- P2 소프트 링크 `linked_ingredient_id`(**통합 아님**) + 연결 실재고 별도 필드(미연결은 `null`).
- P1 중복 등록 3층(하드 차단 / 소프트 409+`force` / 제안 전용). 실측: 이름 완전일치는 중복 20쌍을 **0쌍** 잡음.
- P4 브랜드 거래내역에 산하 매장 소비 포함 + `source_scope`.
- `min_stock=0` 알림 제외 / 부족 알림에서 **발주 장바구니 담기**(미연결은 "Link required").
- 실호출 확인: `/product-ingredients` 200(linked_stock 필드 존재) · 중복 POST **409 DUPLICATE_NAME** · 브랜드 거래내역 200.

#### 3. 사고 1건 (재발 방지 기록)
- 배포 격리 중 `git checkout HEAD --` 로 **미커밋 재고 수정 9파일 소실** → 전량 재구현. 메모리 [[feedback_stash_before_deploy_isolation]].

### 다음 확정 작업
- 재고·판매 P1~P6 **Fable 게이트 사전조건 2건** (Fable 지시):
  1. 백엔드 고장주입을 **pm2 재시작 후 실서버 HTTP 경유**로 재실행
  2. health-check 영구 계약 4건 추가 — 완료→차감 트랜잭션 / 배치0 차감 / P1 하드·소프트 409 / min0 알림 제외
  → 그 후 Fable 게이트 → 배포

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- **프로필·구독 통합** (Irene 질문에서 나온 것, Fable 판정 대기 중): 프로필은 이미 유저 단위인데 **구독은 혼재** — RA 는 `restaurants` 행, BG/FG/Owner/Supplier 는 `users` 행. `users` 구독 컬럼이 **유저당 1벌 스칼라**라 한 사람이 두 역할 구독을 동시에 못 가진다. `/subscriptions/my-plan` 은 **컨텍스트가 아니라 `user.role`** 로 대상을 고르고, RA 분기는 `Restaurant.findOne({admin_id})` 에 **order 절이 없다**. 구독 컬럼이 5개 테이블 중복.
- **"역할 하나 더 구독" 경로 부재**: 로그인 상태에서 역할/매장을 **사는** 길이 없다(신규 가입=새 계정 / 매장 생성=결제 없음 / claim=결제 없음 / change-plan=기존 구독만). 지금 구조에선 역할을 늘리려면 계정을 또 만들어야 하고, 그게 프로필·구독이 흩어진 원인.
- Fable 판정 ②: 기기 고정(POS device) 해제 옵션 — 관리자 확인 후 계속. (이번 배포에서 **분리** 결정됨)
- Fable 판정 ③: 계정 통합 절차 — 주 계정 지정 → SA 가 나머지 매장 모자 부여 → 보조 계정 비활성. Irene 이 주 계정을 지정해야 시작.
- dev 에 남은 데이터 정합: 데모 브랜드 산하인데 주문이 있는 rid5(790건)·rid10(5건) 소속 처리 — **파괴적이라 손대지 않음**, 사람 판단 필요.
- 운영 `purchase_orders.status` enum 드리프트(dev 에만 `pending_approval`) — 이번 배포 전부터 있던 별건.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
