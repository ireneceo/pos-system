# Socket 인증 하드닝 (라이브 주문 소켓 매장 격리)

> 목적: `/orders`·`/checkout-display`·`/kitchen`·`/display` Socket.IO 네임스페이스의 **무인증 + 클라이언트 입력 신뢰** 문제를 닫아 **매장 간 라이브 주문 데이터 누출**을 차단한다.
> 관련: 데이터 흐름은 `ORDER_REALTIME_SYNC_UNIFICATION.md`(v3.55 동기화 통일). 본 문서는 그 소켓 계층의 **인증/인가**만 다룬다.
> 시작: 2026-06-13 (Phase A 구현 — DEV).

## 1. 문제 (실측)

- `services/socketService.js`: `/orders`, `/kitchen`, `/display` 네임스페이스에 **연결 인증(`io.use()`) 없음.**
- `socket.on('join-restaurant', (restaurantId) => socket.join('restaurant_' + restaurantId))` — **클라이언트가 보낸 restaurantId를 그대로 룸에 join.** 인증·소유권 검증 0.
- 결과: 누구든 socket.io 클라이언트로 붙어 `join-restaurant(임의_id)` → 그 매장의 `order-created`/`order-updated`(테이블·품목·금액·상태) 실시간 수신 가능. CORS는 브라우저에만 적용 → 스크립트 접속은 못 막음.
- `/checkout-display` 도 동일 패턴.
- v3.55 실시간 동기화 통일로 이 경로에 흐르는 데이터·구독 화면이 늘어 **노출면 증가**(원인은 사전부터 존재).

## 2. 정답 패턴 — 코드베이스에 이미 있음

`/notifications` 네임스페이스(v3.28+, socketService.js:104~)가 정석:
- `io.of('/notifications').use((socket, next) => { jwt.verify(handshake.auth.token) })` — handshake JWT 검증.
- 룸은 **검증된 토큰의 claim**(`auth.restaurant_id`/`brand_id`/`foodcourt_id`)으로만 join. "스푸핑된 payload 무시, 인증 신원만 신뢰".
→ 이 패턴을 `/orders`·`/checkout-display`·`/kitchen`·`/display`에 복제한다.

## 3. 롤아웃 — Expand / Contract (무중단 표준)

살아있는 채널에 인증을 추가하는 표준 2단계. 즉시 서버 강제 시 **토큰 안 보내는 현재 매장 클라이언트가 전부 끊김** → 단계 분리 필수.

### Phase 0 (선결 — Irene, 인프라)
- Cloudflare `sw.js` Custom Purge. 안 하면 Phase A 프론트가 매장 기기에 안 닿음(SW 캐시 고착). `reference_sw_version_stale_bundle`.

### Phase A — Expand (프론트, 동작 무변경) ✅ 2026-06-13 운영 배포·검증 완료 (Backup 20260613_155548, Smoke 9/9)
> 검증: 소켓 주방단계 실시간 스모크(preparing·ready·served order-updated 수신)+checkout-display 연결 통과 / 운영 번들 auth:{token: 12회·9청크 / 운영 라이브 소켓 auth 연결+join OK(데모 r1 읽기전용). print-guard: socket-only 재확인 후 bless.
- 모든 `/orders`·`/checkout-display` 소켓 생성부에 `auth: { token: getAuthToken() }` 추가. **현재 서버는 미강제라 토큰 무시 → 회귀 0.**
- 적용 11곳 / 9파일:
  - `/orders`: OrdersRealtimeContext(162), KitchenDisplayPage(1009), CustomerDisplayPage(338), IncomingOrdersView(651), POSTerminalPage(1815)🔒, MainLayout(1139·1374)🔒
  - `/checkout-display`: CheckoutDisplayPage(209), FloorPlanPage(686), LiveOrdersPage(332), POSTerminalPage(2732)🔒
- 🔒 인쇄 보호 파일(MainLayout/POSTerminal): **소켓 `io()` 한 줄만** 변경. 인쇄 로직(`_printPollFn`/직접인쇄블록) 무접촉(git diff 인쇄 키워드 0건). 인쇄는 HTTP 폴링(`useAutoPrintPoller`, "socket 의존 없이")이라 소켓과 무관 → 인쇄 위험 0. check-print-guard 가 파일 지문 변경을 플래그하면 socket-only diff 증명 후 `--bless`.
- 배포 후: 매장 기기가 토큰을 보내기 시작하는지 운영 로그/소켓 핸드셰이크 확인.

### Phase B — Contract (백엔드, 인증 강제) ☐ Phase A 매장 도달 후
- `io.of('/orders').use()` + `io.of('/checkout-display').use()` 등에 JWT 검증(/notifications 동일). 토큰 없으면 reject.
- `join-restaurant(id)`: 인증 신원으로 검증 — System Admin=전체, 아니면 `userCanAccessRestaurant`(매장 일치 OR 브랜드/푸드코트 소유). 권한 없으면 join 거부.
- `join-seller`/`join-buyer` 도 인증 신원 기준으로 제한(현재 payload 신뢰).
- `/kitchen`·`/display` 도 인증 적용(혹은 최소 인증 + 검증된 룸).

### Phase B-2 — emit 방향 봉인 ✅ 2026-07-26 (dev 완료·미배포)

> **join 만 검증해서는 구멍이 안 막힌다**는 것을 실측으로 확인해 추가된 단계.

- 근거: `socket.to(room)` 은 **그 룸에 가입했는지와 무관하게** 아무 룸에나 emit 할 수 있다.
  즉 Phase B 의 join 검증을 통과한 뒤에도 payload 의 `restaurantId` 를 바꿔 보내면
  ① 타 매장 고객화면에 **위조 장바구니** 표시(cart-update) ② **강제 초기화**(cart-clear)
  ③ 타 매장 **진행 중 판매에 회원 붙이기 → 로열티 적립**(customer-checkin·pos-customer-update)
  ④ 서버 카트 캐시(cartCache) 오염 → 그 매장 화면 재접속 시 **위조 카트 재생** 이 가능했다.
- 조치: `canEmitToRestaurant(socket, rid, ns)` 신설 — join 과 **동일 기준**(`userCanAccessRestaurant`)
  으로 emit 도 검증. 모드 의미도 동일(모니터=로깅만·동작 무변경 / 강제=드랍). 소켓별 판정 메모(성능).
  `/checkout-display` 5개 핸들러 전부 + `/orders` join 에 적용. rid 정규화(`^\d+$`) 공통.
- `/kitchen`·`/display`: 클라이언트 0건(웹 번들·데스크탑앱·안드로이드앱 전수 grep)인 죽은 네임스페이스인데
  `io.of(ns).emit()` = **네임스페이스 전체 브로드캐스트**였다(가짜 주문 주입 채널). 삭제 대신
  join-restaurant + 룸 스코프로 통일 — 지금은 클라가 없어 동작 변화 0, 나중에 써도 경계 유지.
- ⚠️ **강제 전환(`SOCKET_AUTH_ENFORCE=true`) 전에 이 단계가 배포돼 있어야 한다.** 그러지 않으면
  핸드셰이크·join 은 막히는데 emit 경로는 열린 채로 남는다.

## 4. 검증

- 서버 소켓 실테스트: 무토큰 연결 거부 / 타 매장 join 거부 / 본인 매장 정상 수신 / SysAdmin 전체.
- e2e 3회 무결: 라이브오더·KDS·플로어플랜 실시간 회귀 0 + 인쇄 정상(실프린터 sanity — 보호파일 변경 절차).
- health-check 에 소켓 인증 케이스 영구 추가(무토큰 거부 / 타매장 거부).
- ✅ 2026-07-26 영구 박제: `dev-backend/tests/socket-auth.test.js` **15건** — 강제 모드(무토큰·위조토큰 거부 /
  5개 emit 크로스테넌트 드랍 / 캐시 오염 없음 / `/orders` join 거부 / `/kitchen` 룸 스코프) +
  모니터 모드(무토큰 연결 유지·정상 전달·crossRestaurant 계측). verify-all `contract-tests` 게이트에 포함.
  고장주입으로 검출력 확인(게이트 제거 시 실패).

## 5. 갭 / 위험

- Phase A↔B 사이엔 leak 잔존(사전부터 존재 → 악화 아님). 보안 목적상 A 충분 도달 후 B를 hard 로 직행.
- Phase B 강제 시 토큰 누락 클라이언트는 **라이브 주문 UI**(배지/실시간/품절동기화)가 끊김 — **인쇄는 무관**(HTTP 폴러). 그래서 Phase A 도달 확인이 전제.
