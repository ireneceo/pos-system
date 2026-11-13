# Fable 설계 — 매장 알림은 «어느 매장 것을 누가, 어디서» 받는가 (2026-11-13)

작성: Fable(리더) · 구현: Opus(팀원) · 앞 설계: `.claude/fable-design-20261022-notification-addressee.md` §7 R1·R2 (이 문서가 R1 의 «푸시» 절반과 R2 를 확정한다 — 메일 절반은 그대로 보류)
실측 기준: 개발 코드 2026-11-13 + 개발 DB 읽기. **운영 DB 는 보지 못함** — 운영 사실은 작업기록 기준.

> Irene 원문(2026-11-13): «왜 K-DINE 누들 레스토랑 페이지에 왔는데 알림이 K-DINE IPC가 나와? 레스토랑, 유저 역할마다 알림 분리적용 안돼? 이거 어떻게 해야 해? 통합 알림할거면 레스토랑 관리자 주문만이라도 빼야 하는 거 아니야? 아니면 설정에서 추가하거나. 알림이 새 레스토랑에 제대로 나오긴 하는 건지»

---

## 0. 한 줄 결론

**매장 알림(새 주문·예약)은 «사람» 이 아니라 «매장» 의 것이다.** 그래서

1. **받는 사람 = 그 매장 사람 전부** — 원래 그 매장 소속(RA·Staff) + 그 매장에 연결된(모자) RA·Staff. 지금은 앞쪽만 본다.
2. **화면에 뜨는 카드(토스트)·소리 = 지금 보고 있는 매장 것만.** 28 을 보는 동안 IPC 주문 카드는 안 뜬다.
3. **휴대폰·기기 알림(OS 푸시) = 내가 속한 매장 전부, 제목에 매장 이름**(이미 붙어 있음). 원치 않는 매장은 **알림 설정에서 매장별로 끈다.**

Irene 질문에 대한 답:
- «왜 IPC 가 나와?» → 알림을 «계정의 원래 매장» 으로만 보내고, 지금 보는 매장을 전혀 안 보기 때문. 결함 맞음.
- «새 레스토랑에 제대로 나오긴 하나?» → **Kate 에게는 28 주문 알림이 안 간다**(연결 계정을 안 봄). 28 은 원래 28 소속인 사람(직원 계정 69 등)만 받는다. 69 를 지우면 받는 사람이 없어질 수 있다(운영 확인 못 함).
- «분리냐 통합이냐» → 화면은 분리, 기기 알림은 통합 + 매장별 끄기. «RA 주문만 빼기» 는 하지 않는다 — 관리자가 28 에서 일할 때 28 주문은 받아야 하고, 역할로 빼면 그게 막힌다. 빼야 할 기준은 역할이 아니라 «매장» 이다.

---

## 1. 실측 요약 (팀원 실측 + Fable 확인)

| # | 사실 | 근거 |
|---|---|---|
| 1 | 수신자 = `users.restaurant_id = rid ∧ role ∈ (RA, Staff) ∧ push_enabled`. 모자·지금 보는 매장·`is_active` 안 봄 | `services/pushService.js:194-205` |
| 2 | 이 함수를 쓰는 곳은 새 주문 1 + 예약 2 뿐 | `orderNotificationService.js` · `reservationNotificationService.js:68,93` |
| 3 | 화면 카드는 `user:{id}` 룸으로만 나감. 받는 쪽(`NotificationToaster.tsx`)은 매장을 거르지 않음 | `pushService.js:91-103,143` · Toaster `sock.on('notification')` |
| 4 | 소켓은 토큰 기준으로 `user:{id}` 와 `restaurant:{토큰의 매장}` 룸에 들어감. 모자로 전환하면 토큰 매장 = 모자 매장 | `socketService.js:369-380` · `routes/auth.js:821` |
| 5 | 기기 구독(`push_subscriptions`)은 사람 단위 — 매장 정보 없음. 한 기기는 마지막에 알림을 켠 한 사람 것 | `models/PushSubscription.js` · `routes/push.js:49-90` |
| 6 | 알림 설정 화면은 원래 역할(`users.role`)로만 항목을 보여 줌 | `routes/notification-settings.js:68-77` |
| 7 | «매장 사람 = 소속 + 모자» 셈은 이미 한 곳에 있음(요금제 좌석 수) | `services/userContexts.js` `countRestaurantSeats` · `findRestaurantHat` |
| 8 | 개발 DB: 살아 있는 기기 구독 0개 · RA 35 / Staff 18 명이 push_enabled · 매장 모자 1행(user 2001 → 38 Staff) | 2026-11-13 조회 |

---

## 2. 결정

### D1. 받는 사람 — «매장 사람» 한 곳에서 정한다
`sendPushToRestaurant(rid)` 의 수신자를 **소속 ∪ 모자**로 바꾼다.

- 소속: `users.restaurant_id = rid ∧ role ∈ (RA, Staff)` (지금 그대로)
- 모자: `user_contexts(entity_type='restaurant', entity_id=rid, role ∈ RESTAURANT_HAT_ROLES)` 보유자
- 공통 조건: `push_enabled` (지금 그대로) **+ `is_active`** (꺼진 계정 제외 — 지금 빠져 있음. 퇴사자 휴대폰에 주문이 가는 길을 닫는다)
- 한 사람이 두 번 잡히면 1번만(Set).
- **함수 하나**: `services/userContexts.js` 에 `listRestaurantPeopleIds(rid)` 를 두고 `countRestaurantSeats` 와 **같은 SQL 조건**을 쓴다(좌석 셈과 알림 수신이 서로 다른 «매장 사람» 정의를 갖지 않게). `pushService` 는 이것만 부른다.
- 역할 분리: Owner 모자·Brand Manager 모자는 매장 운영 알림을 받지 않는다(원래 역할일 때와 같음). Staff 모자의 세부 권한(permissions)으로는 거르지 않는다 — 소속 Staff 도 지금 거르지 않으므로 같게 둔다.

### D2. 화면 카드·소리 — 지금 보는 매장 것만 (서버에서 거른다)
- 소켓 join 때 룸 하나를 더 만든다: 토큰에 사용자와 매장이 둘 다 있으면 `user:{id}@restaurant:{rid}`.
- `sendPushToRestaurant` 가 보내는 알림(= 매장 운영 알림)은 화면 카드를 `user:{id}` 가 아니라 **`user:{id}@restaurant:{rid}`** 로 보낸다. `sendPushToUser` 에 선택 인자(`inAppRoom` 또는 `storeScope: rid`)를 주는 방식 — 다른 호출부(브랜드 재고 알림·테스트 푸시 등)는 지금처럼 `user:{id}`.
- 사람별 관문(push_enabled·항목 끄기)은 그대로 `sendPushToUser` 안에서 탄다. `restaurant:{rid}` 룸 전체에 뿌리지 않는 이유: 그 룸엔 관문을 안 거친 사람도 있고, 사람별 끄기가 사라진다.
- 프론트 변경 없음(카드는 오는 것만 그린다). 서버 재시작 뒤 소켓이 다시 붙으면 바로 적용.
- 결과: Kate 가 28 을 보면 28 주문 카드만, IPC 로 돌아가면 IPC 카드만. 브랜드·오너 모자로 보고 있을 땐(토큰 매장 없음) 매장 주문 카드 없음 — 맞는 동작.

### D3. 기기 알림(OS 푸시) — 속한 매장 전부 + 매장별 끄기
- 앱이 닫혀 있으면 «지금 보는 매장» 이 없다. 그래서 기기 알림은 D1 수신자 전원의 기기로 간다. 제목 «New order · {매장 이름}» 으로 구분(이미 있음).
- **매장별 끄기**: `users.push_store_off` (JSON 배열, 매장 번호 목록, NULL = 전부 받음) 새 칸 1개.
  - `sendPushToUser` 에 `storeScope: rid` 가 오고 그 번호가 목록에 있으면 **기기 알림만** 건너뛴다(로그 `store_off`). 화면 카드는 D2 가 이미 «보는 매장만» 이라 영향 없음 — 보고 있는 매장의 카드는 끄기와 무관하게 뜬다(항목 자체를 끄려면 기존 항목 토글).
  - 화면: 알림 설정의 푸시 카드(`PushPreferencesCard`) 아래 «Stores» 목록 — 내가 속한 매장(소속 + 매장 모자)이 2개 이상일 때만 보이고, 매장마다 켜기/끄기. 1개면 안 보임(대부분의 사용자에겐 화면 변화 없음).
  - 저장 경로는 `PUT /api/push/preferences`(조용한 시간과 같은 자리). 서버는 **내가 실제로 속한 매장 번호만** 받아들인다.
- 기본값은 **전부 받음**. 이유: 꺼진 채 시작하면 «새 매장에 알림이 오긴 하나» 가 다시 «안 온다» 가 된다. 주문 알림은 빠지는 쪽이 더 위험하다.
- 새 칸은 NULL 허용 추가 1개(sync-database 로 생김 · 기존 행 무영향 · ENUM 아님).

### D4. 알림 설정 화면의 항목 — 모자 역할도 본다 (앞 설계 R2)
`GET /api/notification-settings` 의 항목 거르기를 `원래 역할 ∪ 가진 모자 역할`로. 저장 쪽도 같은 집합으로. 안 하면 원래 BG 인데 매장 RA 모자를 쓴 사람이 «New Order» 를 끌 방법이 없다(D1 로 새로 받게 되는 사람들).

### D5. 이번에 하지 않는 것
- **메일**의 모자 수신(앞 설계 R1 의 메일 절반 · §9 ③) — 그대로 보류. 이번 변경은 푸시 전용 3종(새 주문·예약 2)만 넓힌다.
- **기기를 매장에 묶기**(«이 기기는 28 알림만») — 사람 단위 구독의 근본 해법이지만 구독 표 구조·켜는 흐름이 바뀐다. D3 의 매장별 끄기로 Kate 사례가 풀리므로 보류. 한 사람이 매장마다 다른 기기를 쓰는데 매장별 끄기로 안 풀리는 실제 사례가 나오면 그때.
- `order_status`·`kitchen_alert`·`staff_call`·`reservation_no_show` — 설정 항목만 있고 보내는 코드가 `sendPushToRestaurant` 를 안 쓴다(쓰는 곳 3곳뿐). 나중에 보내는 코드를 붙일 땐 반드시 `sendPushToRestaurant` 로 — 그러면 D1~D3 이 자동으로 걸린다.
- 🔒 인쇄·KDS 보호 파일 무접촉. `orders-crud.js` 열지 않는다(주문 알림은 모델 훅).

---

## 3. 구현 단위

| 단위 | 내용 | 파일 |
|---|---|---|
| **N1** | `listRestaurantPeopleIds(rid)` (소속 ∪ 모자 · is_active) + `countRestaurantSeats` 와 조건 공유 | `services/userContexts.js` |
| **N2** | `sendPushToRestaurant` 가 N1 사용 · `sendPushToUser(userId, payload, { storeScope })` — 화면 카드 룸 = `user:{id}@restaurant:{rid}` · `push_store_off` 면 기기 알림만 건너뜀 | `services/pushService.js` |
| **N3** | join 때 `user:{id}@restaurant:{rid}` 룸 추가 | `services/socketService.js` (notifications 네임스페이스 join 블록만) |
| **N4** | `users.push_store_off` 칸 + `GET/PUT /api/push/preferences` 에 `stores`(내 매장 목록+켜짐 여부)·저장(내 매장만 허용) | `models/User.js` · `routes/push.js` |
| **N5** | 푸시 카드에 «Stores» 목록(2개 이상일 때만) · 4언어 | `PushPreferencesCard.tsx` · locales |
| **N6** | 설정 항목 거르기에 모자 역할 합치기 | `routes/notification-settings.js` |

순서: N1→N2→N3 가 Irene 이 겪은 문제(①IPC 카드가 28 에서 뜸 ②28 알림이 Kate 에게 안 감)를 푼다. N4~N6 은 같은 배포에 묶는다(D1 로 기기 알림이 넓어지는 순간 끌 방법이 같이 있어야 한다). 프론트는 N5 하나 — 빌드 1회.

**설계와 다른 판단이 필요해지면 멈추고 Fable 에게.** 특히: 모자 전환 뒤 소켓이 새 토큰으로 다시 붙지 않는 경우(아래 V3 가 실패하면) — 프론트를 고치기 전에 보고.

---

## 4. 검증 (무엇을 증명할지)

개발 시드: 시험 계정 A(원래 매장 38 RA)에게 매장 39 RA 모자(또는 기존 user 2001 → 38 Staff 모자 활용). 데모 매장만.

| # | 증명할 것 | 방법 |
|---|---|---|
| V1 | 39 주문 → 수신자에 A 포함(모자) · 38 주문 → A 포함(소속) · 꺼진 계정·push 끈 계정 제외 · 중복 0 | `push_logs` 행(구독 0이면 `no_subscription` 로 남음)으로 사람별 확인 |
| V2 | A 가 39 를 보는 소켓: 39 주문 카드 **옴**, 38 주문 카드 **안 옴**. 38 로 돌아가면 반대 | 소켓 클라이언트 2개(토큰 2종)로 `notification` 이벤트 수 세기 |
| V3 | 실브라우저: 모자 전환 직후(새로고침 없이) 카드가 새 매장 것으로 바뀜 | Playwright — 전환 → 데모 주문 생성 → 카드의 매장 이름 |
| V4 | `push_store_off=[39]` → 39 주문 로그 `store_off`(기기 알림 건너뜀), 39 를 보는 화면의 카드는 그대로 옴 · 38 은 정상 | 로그 + 소켓 |
| V5 | 남의 매장 번호를 `push_store_off` 로 저장 시도 → 거부/무시 | API 실호출 |
| V6 | 모자 없는 일반 RA·Staff: 수신·카드·설정 화면이 전과 같음(Stores 목록 안 보임) | 회귀 — 전후 `push_logs` 수신자 집합 비교 |
| V7 | 예약 알림 2종도 V1·V2 와 같게 | 예약 생성 실호출 |
| V8 | 브랜드 재고 알림·테스트 푸시(`user:{id}` 그대로)가 어느 화면에서든 옴 | 소켓 |
| 반증 | N3 룸 추가를 빼면 V2 «39 카드 옴» 이 실패하는지 · N1 모자 절을 빼면 V1 이 실패하는지 각 1회 | 고장주입(백엔드만 · pm2 restart 뒤) |

health-check 에 V1·V2·V5 를 상시 케이스로 추가(`security`/`pos`). 기기에 실제로 뜨는 OS 알림은 개발 구독이 0개라 **확인 불가** — `push_logs` 의 판정까지만 증명한다고 보고에 적는다.

게이트 판정: 접근 권한 미들웨어·공개 주소·돈·보호 파일을 건드리지 않는다. 새 칸 1개(NULL 허용)가 운영 DB 구조 변경이므로 `check-sensitive-diff` 결과를 따르고, 대상이면 끝난 뒤 Fable 검증 1회.

---

## 5. Irene 에게

**되돌리기 어려운 선택은 없다** — 전부 설정·코드로 되돌릴 수 있어 질문으로 세우지 않고 위대로 진행한다. 다만 아래 두 가지는 알려야 한다.

1. **직원 계정 r28:Kate(69) 삭제는 이 변경이 운영에 나간 뒤로 미루기를 권한다(Fable 권고).** 지금 구조에선 28 주문 알림이 원래 28 소속 계정에게만 가므로, 69 를 먼저 지우면 28 알림을 받는 사람이 없을 수 있다(운영 미확인). Live Orders 화면 자체의 주문 표시·소리는 이 알림과 다른 길이라 영향 없다고 보지만 이번에 실측하지 않았다 — 확인 못 함.
2. **바뀌는 체감**: 매장에 연결된(모자) 관리자·직원은 이 배포 뒤 그 매장 주문·예약 알림을 휴대폰/기기에서도 받기 시작한다(알림을 켜 둔 기기가 있는 사람만). 원치 않으면 알림 설정 › Stores 에서 그 매장을 끄면 된다.

보류 중인 옛 질문(10-22 §9 ③ «모자로도 **메일**을 받게 할지»)은 이번 범위 밖이라 그대로 열려 있다.
