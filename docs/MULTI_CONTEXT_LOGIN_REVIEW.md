# 멀티 역할/매장 선택 로그인 설계 — 독립 검증 리포트 (Fable 적대 검증)

**검증일:** 2026-08-20
**검증자:** Fable (독립 세션 — 설계 작성자 아님. 기본 자세 = 반증)
**대상:** `docs/MULTI_CONTEXT_LOGIN_DESIGN.md` (2026-08-20 초안)
**방법:** 문서의 모든 `파일:줄` 인용을 코드에서 직접 대조 + dev/운영 DB 읽기 전용 실측 + 메모리 확정사항 대조. 코드 변경 0, 설계 문서 무수정.

---

## 총평: **조건부 GO**

아키텍처 골격(컨텍스트=토큰 claim + `authenticateToken` 초크포인트 투영 + 매 요청 user_contexts 재검증)은 건전하고, 문서의 코드 인용·수치 대부분이 실측과 일치한다(부록 A). 그러나 **운영 실데이터로 반증되는 결함 1건(F1)** 을 포함해, 구현 착수 전에 설계에 반영해야 할 구멍 4건(F1~F4)과 서술 정정 2건(F5~F6)이 있다. F1~F4를 고치지 않고 구현하면 이 기능의 핵심 대상자(운영 6명 중 최소 2명)에게서 기능이 고장나고, 역할 강등이 무효화되는 보안 구멍이 생긴다.

---

## F1. 🔴 백필 규칙이 운영 실데이터와 충돌 — 핵심 대상자가 컨텍스트 0개 (반증됨)

설계 §3.3: BG/FG 백필 = `('brand', users.brand_id, role)`, **스칼라 NULL 이면 스킵+경고**.

**운영 DB 실측 (읽기 전용):**
- 설계가 지목한 수요자 6명 중 **BG user 6: brand_id NULL + 소유 브랜드 0** (접근은 restaurant_managers oversight 행 r5·r9 로만).
- **FG user 5: foodcourt_id NULL + 소유 푸드코트 0** (oversight r6·r9). FG user 38 도 동일(NULL+무소유).
- 운영 foodcourts 테이블 전체에서 owner_id 있는 푸드코트는 1개(id 1, owner 35)뿐.
- dev 에도 동일 케이스: user 148 (BG, brand_id NULL 인데 **brands.owner_id 로 브랜드 33 소유**).

**결과 시나리오:** user 6 은 백필 스킵 → 컨텍스트 0행. SA 가 매장 RA 모자를 부여(P4)하면 contexts=1 → **§6.1 규칙("≤1 이면 픽커 스킵")에 걸려 로그인 때 새 모자를 고를 화면 자체가 안 나온다.** 스위처로 RA 모자를 쓰고 나면 **본래 BG 정체로 돌아갈 컨텍스트 행이 없어 switch-context 가 403** — 재로그인 외 복귀 불가. 이 기능의 존재 이유인 사람들에게서 기능이 고장난다.

**원인:** "네이티브 정체 = user_contexts 행 1개"라는 전제가 스칼라 NULL 사용자(운영에 7명: users 2,3,5,6,7,8,38)에서 깨진다. BG/FG 의 실제 정체는 스칼라가 아니라 소유행/oversight 행에 있다(F4 와 같은 뿌리).

**수정 방향(둘 중 하나):**
1. **네이티브 정체를 행이 아니라 항상 존재하는 가상 기본 컨텍스트로 취급** — 픽커 목록 = `[users.role 파생 기본 컨텍스트] + user_contexts 행들`, "기본으로 전환" = ctx 없는 토큰 재발급. 백필 스킵 문제가 소멸하고 §5.3 불변식도 유지된다. (권장 — 백필 자체가 default 행을 넣을 필요가 없어져 F2 의 절반도 함께 풀린다.)
2. 백필을 스칼라가 아니라 소유행 기준으로 재설계(brands.owner_id / foodcourts.owner_id / rm oversight) — 단 이러면 "행=모자" 의미가 복잡해지고 F2 가 더 커진다.

---

## F2. 🔴 users.role 변경과 user_contexts 의 생애주기 비동기 — 역할 강등이 무효화된다

- SA 의 역할 변경 경로 실존: `routes/users.js:763-769` (updateData.role 반영).
- 설계에는 **users.role 이 바뀔 때 user_contexts 를 어떻게 정리하는지 규칙이 없다.**

**공격 시나리오:** 매장 X 의 RA 가 Staff 로 강등됨(users.role='Staff'). 백필로 만들어진 `('restaurant', X, 'Restaurant Admin')` 행은 그대로 남는다 → 강등된 사용자가 그 행으로 switch-context → 매 요청 재검증도 "행 실존"만 보므로 통과 → **투영 role='Restaurant Admin' 으로 requireRole 323곳·checkRestaurantAccess RA 경로 전부 통과 = 강등 무효.** 다음 배포 때 멱등 백필이 `('restaurant', X, 'Staff')` 를 또 넣어 is_default 행이 2개가 되고 유령 모자가 축적된다.

설계의 "user_contexts 는 5번째 판정처가 아니다"(§3.1)는 매장 스코프에 대해선 참이지만, **role 에 대해선 투영이 사실상의 원천이 되므로 users.role 과의 정합 규칙이 보안 요건**이다.

**수정 방향:** ①역할 변경 라우트에 default 컨텍스트 행 동기화(구 role 행 삭제+신 role 행 갱신)를 묶거나, ②F1 수정안 1(가상 기본 컨텍스트)을 택해 default 행 자체를 없애고 **부여된(granted_by NOT NULL) 행만 테이블에 두면** 백필·역할변경 드리프트 문제가 구조적으로 소멸한다. 어느 쪽이든 health-check 에 "강등 후 옛 모자 전환 401" 케이스 추가.

---

## F3. 🔴 크로스탭 토큰 공유 — 전환이 같은 브라우저의 다른 탭(POS·자동인쇄 폴러)을 소리 없이 죽인다

- 토큰 = localStorage 단일 키 `auth_token` (`utils/auth.ts:14`) — 설계도 §0 에서 실측했으나 **"두 탭 동시 열람 불가"라는 UX 제약(Q1)으로만 다루고, 운영 사고 벡터로는 다루지 않았다.**
- AuthContext 는 storage 이벤트를 듣지 않는다 — 탭 간 상태 동기 없음.

**사고 시나리오:** 매니저가 매장 A 카운터 브라우저(탭1 = POS 터미널, MainLayout `_printPollFn` 자동인쇄 폴러 가동 중)에서 탭2를 열어 매장 B 모자로 전환 → 토큰이 브라우저 전역에서 B 로 교체 → **탭1 의 이후 모든 HTTP(주문 조회·결제·pending-print 폴링)가 B 토큰으로 나가고, RA 스칼라 판정에 의해 매장 A 엔드포인트가 전부 403** → 주방 자동인쇄 정지·결제 실패가 **조용히** 발생. 설계 §2.1 이 DB-UPDATE 방식을 기각한 근거("전 기기 동시 플립 → 결제·인쇄 중 매장이 바뀌는 사고")와 같은 부류의 사고가 **같은 기기의 탭 단위**로 남아 있다. §8-6 "결제/주문 진행 중 매장이 바뀌는 경로를 만들지 않는다"는 현 설계로는 보장되지 않는다.

**주의:** 🔒 인쇄 보호 "파일" 접촉이 MainLayout 1곳뿐이라는 주장은 맞다. 그러나 이 경로는 **파일을 안 건드리고도 자동인쇄 폴러의 동작을 멈출 수 있는** 기능적 접촉이다 — 인쇄 생명선 규칙의 정신상 반드시 설계에 명시하고 막아야 한다.

**수정 방향:** 전환 시 `localStorage` storage 이벤트(또는 BroadcastChannel)로 전 탭에 통지 → 다른 탭은 새 컨텍스트로 강제 리로드/네비게이션(Google 방식: 모든 탭이 따라온다). 최소한 "탭이 자기 세션 컨텍스트와 토큰 컨텍스트 불일치를 감지하면 즉시 리로드" 가드. FI 테스트에 "탭2 전환 → 탭1 403 루프 없음" 케이스 추가.

---

## F4. 🟠 투영 등가성은 restaurant 모자에서만 성립 — brand/foodcourt 모자 부여는 반쪽짜리

설계 §5.2: "brand/foodcourt 컨텍스트 전환도 마찬가지로 네이티브 BG/FG 와 동일한 스칼라를 만들 뿐" — **이 주장은 틀렸다.** BG/FG 권한은 스칼라가 아니라 **소유행 기반**이 주류다:

- `brands.owner_id`/`foodcourts.owner_id`/`restaurant_managers` 기반 판정: `checkRestaurantAccess` General 경로, `userCanAccessRestaurant`(auth.js:426-434), `middleware/brandScope.js`(12개 라우트 파일 — **ROLES_AND_PERMISSIONS.md 가 "user.brand_id 단일 브랜드 가정은 deprecated" 라고 명시한 정식 스코프 미들웨어인데 설계 문서가 전혀 언급하지 않음**), `owner_id: req.user.id` 인라인 31곳.
- 반면 `req.user.brand_id` 스칼라를 읽는 곳 14곳(brands-core.js:31-32 의 `Brand.findByPk(req.user.brand_id)` 등).
- 소켓 하드닝 메모리도 명시: "판정 claim = id·role·restaurant_id (**브랜드/푸드코트는 owner_id 조회**)".

**결과:** 비소유자에게 ('brand', B, 'Brand General') 모자를 부여하면 — 스칼라 라우트는 브랜드 B 데이터가 열리고, 소유행 라우트는 403/빈 화면. 설계 스스로 §8-5 에서 금지한 "예측 불가 조합"이다. 소유행 판정은 user.id 기반이라 투영으로 흉내낼 수 없다(신원이 그대로이므로).

**수정 방향:** **v1 의 P4 부여 가능 타입을 'restaurant'(RA/Staff)로 제한**한다 — 4곳 판정이 유일하게 일치하는 스칼라 경로 위에서만 모자를 부여. brand/foodcourt 모자는 네이티브 정체(F1 수정안의 가상 기본 컨텍스트)로만 존재. 브랜드/푸드코트 모자 "부여"가 필요해지면 소유행(brands.owner_id 등)을 실제로 만들어 주는 별도 흐름으로 — 그건 이 설계의 투영이 아니라 데이터 부여다. 추가로 P4 전환·부여 검증에 entity_type↔role 정합 검사(restaurant↔RA/Staff 만) 명시.

---

## F5. 🟠 회수(CONTEXT_REVOKED) 복구 흐름이 현 프론트 구조와 모순

- `httpClient.ts:87,104` — **모든 401 이 on401Handler → `logout()`** (AuthContext:783-789 등록).
- 회수된 ctx 토큰은 매 요청 401 이므로, 그 토큰으로는 `GET /contexts` 도 `POST /switch-context` 도 401 이다.
- 따라서 설계 §4.3·§9.1-4 의 "프론트가 픽커로 복귀(남은 모자로 재전환 가능)"는 **현 설계로는 구현 불가** — 실제 동작은 강제 로그아웃이 된다(치명은 아니나 문서화된 UX 와 문서화된 메커니즘이 서로 모순).

**수정 방향(둘 중 하나 명시):** ①auth 미들웨어가 revoked ctx 를 401 대신 **기본 정체로 폴백**(+응답 헤더로 프론트에 통지 → 픽커 표시), ②httpClient 가 `CONTEXT_REVOKED` 코드를 특례 처리하고 `/contexts`·`/switch-context` 는 ctx 무시(신원만) 인증으로 선언. ①이 단순하고 "회수=그 모자만 소멸, 세션은 생존" 의미에 부합.

---

## F6. 🟡 "권한 즉시 반영" 은 HTTP 한정 — 소켓은 회수 후에도 최대 24h 열려 있다

- 설계 §4.3: "모자 회수가 다음 요청부터 즉시 401. 24h 토큰 잔존 문제가 컨텍스트에는 **없다**" — **HTTP 에만 참.**
- 소켓 핸드셰이크는 claim 만 본다(socketService.js:65-69 실측 일치). 회수된 모자의 ctx 토큰(투영 claim: role=RA, restaurant_id=X)으로 **새 소켓 연결+join 이 가능**하고, RA 스칼라 경로는 DB 를 아예 안 보므로 user_contexts 회수가 반영될 지점이 없다 → 회수 후에도 그 매장 라이브 주문(테이블·품목·금액)을 토큰 만료까지 수신.
- 설계 §4.4 잔존위험 ①은 "그 사람이 정당하게 가진 이전 모자라 권한 확대가 아니다"라고 서술하나, **회수 시나리오에서는 정당성이 소멸한 뒤**다 — 위험 과소포장. (기존 역할 강등에도 같은 창이 있으므로 "악화"는 아니지만, 회수를 일상 운영 기능으로 만드는 설계라면 §4.4 서술을 정정하고, 최소한 "회수 후 소켓 24h 창"을 알려진 한계로 §8 에 명시 + 필요 시 후속(소켓 핸드셰이크에서 ctx 재검증 1쿼리)을 백로그로.)

---

## F7. 🟡 PIN 전환 상호작용 — "직교" 주장은 대체로 맞으나 두 가지 마찰 누락

1. **모자 복귀 불가:** `switchUser`(AuthContext:792-811)는 토큰을 통째로 교체하고 원토큰을 보관하지 않는다. 모자 쓴 상태에서 PIN 전환하면 ctx 토큰이 소멸 — 그 단말에서 원래 모자로 돌아가려면 **전체 재로그인**뿐. (보안 문제 아님. UX 사실로 문서화 필요.)
2. **기기 고정 vs 세션 매장 불일치:** PIN 전환의 매장 해석은 `pos_device_restaurant`(CashierPinModal.tsx:167-181, 로그인 시에만 기록) 기준이다. A 매장에 고정된 기기에서 B 매장 모자로 전환한 뒤 POS 화면에 들어가면(스위처 비노출이어도 **네비게이션으로 진입 가능** — B 매장의 정식 RA 이므로), PIN 전환은 A 매장 스탭을 찾는다. 결과 토큰 자체는 자기정합이지만 화면-기기-세션 3자가 어긋나는 상태. v1 에서 "세션 컨텍스트 매장 ≠ 기기 고정 매장이면 POS 진입 시 경고/차단" 규칙을 §6.3 에 추가 권장.

---

## F8. 🟡 "한 번에 모자 하나" 격리의 알려진 누수 + 투영 명세 누락 필드

- `userCanAccessEntity`(auth.js:505-524, invoices-crud·notification-settings 사용)는 brand/foodcourt 를 **role 무시하고 owner_id 로 판정** → RA 모자를 쓴 BG 가 자기 브랜드 인보이스·알림설정에 여전히 접근. 자기 데이터라 보안 결함은 아니나 §8-5 불변식("다른 스코프 격리")의 예외 — 문서에 알려진 누수로 명시할 것.
- 투영 명세(§4.3)가 `branch_id`(Foodcourt Manager 의 지점 스코프, getManagerScope:380-388)·`permissions`(Staff 모자의 pos_counter 등 액션 권한)·`manager_id` 를 다루지 않는다. FM 모자·Staff 모자를 v1 에서 배제한다면 그렇게 명시, 아니면 투영 규칙 추가.

---

## F9. 수치·주장 반증 (검증 가능 주장 전수 대조)

| 설계 주장 | 실측 | 판정 |
|---|---|---|
| 백엔드 `req.user.role` 판독 **323곳** | **254곳** (+`req.user?.role` 19곳 = 273) | ❌ 부풀림(~20%). 초크포인트 논거 자체는 유효 |
| `req.user.restaurant_id` **84곳(19파일)** | **93곳(22파일)** | ❌ 소폭 불일치 (방향 동일) |
| 프론트 user.role 판독 68파일 | 68파일 | ✅ 정확 일치 |
| MainLayout 삽입 "2줄", 인쇄 블록과 1,000줄+ 거리 | 헤더 자식 2504-2505 / `_printPollFn` 1177-1429 → 거리 ~1,076줄. import 1+배치 1 = 2줄 성립 | ✅ (단 F3 의 "파일 무접촉 기능 접촉" 별도) |
| 소켓 "서버 코드 변경 0" | 핸드셰이크·join·emit 전부 claim/기존 함수로 동작 → 성립. **단 F6 의 회수 24h 창을 대가로** | ⚠️ 조건부 참 |
| 운영 멀티 유저 6명(BG4/FG1/Owner1)·49명·43명 단일·이메일 중복 0쌍·복수브랜드 2명 | 전부 일치 (users 5,6,23,24,27,29) | ✅ |
| dev 멀티 7명(2,5,6,11,22,154,289)·oversight 22/ownership 6 | 일치 | ✅ |
| 소켓 생성부 11곳 / userCanAccessRestaurant 11파일 | 11곳(하드닝 문서)·11파일(13-스캐너-정의부) | ✅ |
| restaurantScope.js 미존재 / checkSubscriptionStatus 미마운트 | 일치 | ✅ |
| auth.js·socketService·staff.js·AuthContext·OrdersRealtimeContext·LoginPage·User.js·auth.ts·check-print-guard 인용 줄번호 | 전수 대조 일치 | ✅ |
| HTTP 진입점 = authenticateToken + optionalAuth + `/me`(자체 verify) 3곳 | jwt.verify 전수 스캔으로 확인(controllers/authController.js 는 미마운트 사장 코드) | ✅ 완전 |
| Q5 대안 기각(유저 메뉴 컴포넌트 부재 등) | 로그아웃 인라인 1487 확인 — 기각 타당 | ✅ |

---

## 일정·단계 판정

- **단계 독립 배포:** P1(테이블+백필, 판독자 0)→P2(ctx 없으면 기존 경로)→P3a→P3b/P4 — 구조는 성립. P2 롤백 주장("잔존 ctx 토큰은 무해")도 HTTP 는 참, 소켓 claim 은 잔존(정당 모자 범위라 한정적).
- **4주 추정:** F1(백필/네이티브 컨텍스트 재설계)·F2(role 동기화)·F3(크로스탭 동기)·F5(회수 복구 경로) 반영으로 **+3~5일**. 현실적 추정 **5주** — 설계의 "4~5주 상한" 안에는 들어가나 "4주" 단독 표기는 과소.
- **🔒 보호영역:** 파일 접촉 = P3b MainLayout 1곳 주장 맞음(8개 목록 check-print-guard.js:38-46 대조). 단 **F3 = 파일 무접촉 상태의 인쇄 기능 영향 경로** — P3a 시점부터 해당(스위처가 생기는 순간). KDS 무접촉 확인.

## Q1~Q5 권고 판정

- Q1(전환식) **동의** — 단 F3 크로스탭 동기가 전제조건으로 승격돼야 함. Q2(병합 안 함) **동의**(이메일 중복 0 실측 확인). Q3(SA 전용) **동의** — 단 F4 의 부여 타입 restaurant 제한 추가. Q4(POS 비노출) **동의** — 단 F7-2 네비게이션 진입 경로 보완. Q5(2단+사인오프) **동의**.

---

## 결론

**설계의 뼈대(토큰 claim + 초크포인트 투영 + 매 요청 재검증 + restaurant 스칼라 일치 경로 활용)는 재검증을 통과했다.** 그러나 아래를 설계에 반영한 **개정판 승인 후** 구현 착수해야 한다:

1. F1 — 네이티브 정체를 가상 기본 컨텍스트로 (백필 default 행 제거, 부여 행만 테이블에) — F2 의 절반도 함께 해소
2. F2 — users.role 변경 시 user_contexts 정합 규칙 + "강등 후 옛 모자 401" 테스트
3. F3 — 크로스탭 토큰 동기(BroadcastChannel/storage 이벤트) — POS·자동인쇄 폴러 보호
4. F4 — v1 부여 타입 'restaurant' 제한 + entity_type↔role 정합 검사
5. F5 — CONTEXT_REVOKED 복구 경로를 기본 정체 폴백으로 재설계
6. F6·F7·F8 — 알려진 한계로 §8 에 명시(+백로그), F9 수치 정정
