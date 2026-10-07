# Fable 판정 — 키오스크 결제 분리 (2026-10-07, 설계 1회차)

> 호출 근거: A(돈·매장 영업·결제 단말기) 크다 · B(기기 등록 모델·🔒 파일 접촉은 되돌리기 어렵다) · C(길이 셋으로 갈린다) → 조건 성립.
> 범위: 설계 판단 1회. 구현은 Irene 승인 뒤 팀원, 게이트 판정 1회 더 가능.
> 코드 변경 0 · 운영 접근 0. 아래 줄 번호는 2026-10-07 dev 기준.

---

## 0. 한 줄 결론

**주문 흐름은 한 벌 그대로 두고, «키오스크» 를 URL 이 아니라 «매장이 등록한 기기» 로 만든다.** 등록된 기기에만 세 번째 결제 채널(Kiosk)이 열리고, 그 기기가 Purple POS 앱이면 카드단말기까지 그 자리에서 받는다. 손님 폰은 등록할 수 없으니 모바일 수단만 본다 — 서버가 거절한다.

Irene 질문 세 개에 대한 답:

| 질문 | 답 |
|---|---|
| ① 키오스크에서 카드단말기 결제 | **된다. 단 조건 둘** — 태블릿에 Purple POS 앱(브릿지 `__NATIVE_ECR`)이 있어야 하고, 그 기기가 매장에 등록돼 있어야 한다. 브라우저만으로는 원리상 불가(HTTPS 페이지는 매장 LAN 단말기에 못 닿음 — `docs/CARD_TERMINAL_ECR_DESIGN.md` §1). |
| ② 키오스크·모바일 결제수단 따로 설정 | **된다.** 결제수단마다 POS·Mobile 옆에 **Kiosk** 열을 하나 더 둔다. 처음엔 모바일과 같은 값이고, 키오스크 스위치를 한 번이라도 만지면 그때부터 따로 저장된다(기존 매장 변화 0). |
| ③ 손님 폰엔 키오스크를 안 열어주려면 | **URL 로 구분하지 않는다.** 매장 관리자가 그 태블릿에서 «이 기기를 키오스크로 등록» 을 누르면 서버가 기기 토큰을 발급한다. 토큰 없는 요청은 서버가 «모바일» 로 취급하므로, 폰이 `?kiosk=1` 을 열어도 화면만 넓어질 뿐 결제수단은 모바일 그대로다. |

Irene 추가 질문 「플로우플랜에서도 결제 문제없는 거지? 어차피 포스로 가는 거니까」 — **맞다.** 키오스크 주문은 지금도 FloorPlan·LiveOrders 에 보이고 같은 결제창(`PaymentModal`)으로 단말기 결제가 된다. 이 설계 뒤에도 키오스크에서 카드가 거절되거나 손님이 «카운터에서 결제» 를 고르면 **주문은 그대로 남고 직원이 거기서 처리**한다. 바뀌는 건 «승인된 결제는 키오스크 자리에서 끝난다» 는 것뿐이다.

---

## 1. 실측 — 팀원 실측에 내가 더 확인한 사실

팀원 실측(키오스크=표시 모드·채널 2개·단말기는 POS 결제창에만·기기 모델 없음)은 전부 맞다. 설계를 가르는 추가 사실:

1. **모바일 주문 생성은 `POST /api/orders`** (`routes/orders-crud.js:523`, 🔒 보호파일) 이다. `mobile/pages/PaymentPage.tsx:1534·1816` 이 거기로 보낸다. `/api/mobile/order` 는 레거시(PaymentPage 미사용, `docs/ORDER_FLOW_MATRIX.md` §1). → 키오스크를 위해 다른 주문 라우트를 쓰면 «같은 개념에 새 경로» 가 된다. 쓰지 않는다.
2. **`source: 'kiosk'` 는 반쯤 준비돼 있다.** ENUM(`models/Order.js:157`), LiveOrders 뱃지(`LiveOrdersPage.tsx:2046`), 상세 라벨(`OrderDetailModal.tsx:489`), 테이블 패널(`TableDetailPanel.tsx:602`), KDS 타입(`:581`) 은 이미 있다. **그런데 `orders-crud.js` 는 문자열 `'mobile'` 로만 분기한다** — 머지 상대(244 · 330-334), 결제수단×주문유형 가드(558), 테이블 필수 가드(578), `isMobileSource`·자동머지·상태 결정(624-640). 지금 `source:'kiosk'` 로 보내면 **POS 취급**이 된다(자동머지 꺼짐·상태를 클라이언트 값대로·가드 없음). 즉 'kiosk' 를 저장하려면 🔒 파일을 몇 줄 만져야 한다.
3. 같은 이유로 🔒 `MainLayout.tsx:1241` 모바일 주문 알림창은 `source==='mobile'` 만, 🔒 `useAutoPrintPoller.ts:176`·`MainLayout.tsx:1390` 티켓의 cashierName 은 'Mobile Order'/'POS' 두 값뿐이다(키오스크면 'POS' 로 찍힘 — 글자뿐, 인쇄 경로 무관).
4. **단말기 API 와 결제 기록은 둘 다 직원 자격이 필요하다.** `/api/terminal` = `authenticateToken + requirePaymentAccess`(`routes/terminal-payments.js:17`), `POST /orders/:id/payments` 도 같다(`routes/orders-payment.js:399`). 키오스크 손님은 익명이다. → **①의 진짜 과제는 브릿지가 아니라 «누가 어떤 자격으로 부르나»** 다. 이 자격이 곧 ③의 구분 수단이 된다.
5. **승인→주문 연결은 서버가 한다**(`services/terminalPayments.js:248 applyResponse→safeLink`). 승인 뒤 기록이 실패해도(키오스크가 꺼짐) 직원이 FloorPlan 에서 같은 주문에 카드를 고르면 `409 ALREADY_APPROVED` 로 **그 승인을 돌려받아 재청구 없이 기록**한다(ECR 설계 §3 R2). 복구 경로가 이미 있다 — 새 코드 0.
6. **`outstanding → pending` 은 결제 뒤 프론트가 PATCH 한다**(`LiveOrdersPage.tsx:1726`, `TableDetailPanel.tsx:607`). 서버 결제 라우트는 `awaiting_payment` 만 전환한다(`orders-payment.js:469`). 키오스크는 직원 화면이 없으니 이 전환을 서버가 해 줘야 한다(키오스크 주문 한정).
7. **직원 로그인 세션을 손님 기기에 두는 길은 이미 위험 판정이 났다.** 고객 디스플레이가 RA 세션으로 돌아 «손님이 누르면 매장 대시보드» 가 열리는 문제(`.claude/fable-verdict-20261004-display-language-gate.md:35`). 키오스크 안드로이드 앱의 뒤로가기도 같은 구멍이다.
8. 안드로이드 앱 시작 주소는 빌드 시 `/pos` 로 고정(`mobile-app/capacitor.config.ts:16`, `MainActivity.java:55` — origin 이 바뀌면 브릿지가 죽는다는 주석). **같은 origin 안에서 `/mobile/<slug>` 로 이동하는 것은 된다.** 데스크탑앱도 내부 origin 은 통과(`desktop-pos/src/main.js:115`).
9. 공개 slug 라우트는 `config`(게이트웨이 비밀)만 지운다(`restaurants-crud.js:538+`). `card.terminal.host` 는 노출된다 — 사설 IP 라 위험 낮음, 참고만.
10. 기기 신원 모델은 없다. 비슷한 것은 `TableQRSession`(서버 발급 토큰을 익명 손님이 제시 — `mobile-public.js:19`), `print_device_status`(기기 자가 보고), `workstations`(localStorage). 셋 다 «이 기기가 누구인가» 를 서버가 보증하진 않는다.

---

## 2. 길 셋 — 어디서 갈리나

| | A. 등록 기기 + Kiosk 채널 + 단말기 (**권고**) | B. 설정 분리만, 단말기는 카운터에서 | C. 키오스크 = 직원 로그인 POS 앱 |
|---|---|---|---|
| ① 단말기 | 키오스크 자리에서 승인·기록 | 안 됨 — 직원이 FloorPlan 에서(오늘과 같음) | 됨(PaymentModal 그대로) |
| ② 설정 분리 | 됨 | 됨 | 됨 |
| ③ 폰 구분 | **서버가 보증**(토큰) | URL 뿐 — 폰이 `?kiosk=1` 열면 키오스크 수단 그대로 보임(강제 없음) | 세션 유무 |
| 위험 | 새 모델 1개·미들웨어 1개 | 가장 적음. 단 «분리» 가 화면 분리에 그침 | **손님 기기에 직원 자격**(토큰 localStorage·뒤로가기로 대시보드 — 10-04 판정과 같은 구멍) |
| 🔒 접촉 | source 'kiosk' 저장 시 3파일 소폭(§4 D4) — 안 하면 0 | 0 | 0 |
| 크기 | 대(2단계) | 소~중 | 중 |

**C 는 배제.** 빠르지만 10-04 에 이미 «열면 안 되는 문» 으로 판정한 구조를 손님 손에 쥐어 주는 것이다.
**B 는 «키오스크 주문 태블릿 + 카운터 결제» 로 쓰겠다면 정직한 선택**이다. 다만 Irene 원문 「포스터미널처럼 고객이 키오스크로 주문해야 해」 와 ①(키오스크에서 단말기)을 둘 다 채우려면 A 다.
**A 를 권고**한다. B 가 필요로 하는 것(채널·설정)은 A 의 1단계에 전부 들어 있어 B 로 시작해도 버리는 코드가 없다.

---

## 3. 설계 결정 (D1~D8)

### D1. 주문 흐름 한 벌 — 그대로
`kioskMode.ts` 머리 원칙(«주문 흐름을 두 벌 만들지 않는다»)을 지킨다. 새 페이지·새 주문 라우트·새 결제 라우트 없음. 키오스크는 **같은 모바일오더 + (등록 기기 → 채널 'kiosk', source 'kiosk', 단말기 가능)** 이다.

### D2. 키오스크 신원 = 서버 발급 기기 토큰 (새 모델 `KioskDevice`)
- 표 `kiosk_devices`: `id · restaurant_id · name · token_hash(sha256) · status(active|revoked) · terminal_host · terminal_port · terminal_transport(기기별 단말기, 비면 매장 값) · last_seen_at · created_by · created_at`. 마이그 `scripts/migrate-create-kiosk-devices.js`(멱등, 레지스트리 `deploy`).
- **등록(페어링 코드 없음):** 매장 관리자(RA)가 **그 태블릿에서** 로그인 → 설정 «매장 태블릿(키오스크)» → «이 기기를 키오스크로 등록» → 이름 입력 → 서버가 토큰(원문은 이 응답 한 번만, DB 는 해시) → 프론트가 `localStorage` 에 저장 → **직원 세션 삭제(로그아웃)** → `/mobile/<slug>?kiosk=1` 로 이동. RA 가 물리적으로 그 기기 앞에 있으니 코드 입력 단계가 필요 없다.
- **해제:** 설정 카드의 등록 기기 목록(이름·마지막 접속)에서 «해제» → `status=revoked` → 그 기기는 다음 요청에 401 → «등록이 해제됐습니다. 직원 로그인» 화면(`/pos`). 기기를 잃어버려도 다른 기기에서 끊을 수 있다.
- **앱 시작:** 앱은 `/pos` 로 뜬다. 진입 가드 하나 — 토큰이 있고 직원 세션이 없으면 키오스크 주소로 이동. 브라우저 태블릿도 같은 규칙이라 앱 없이도 키오스크(단말기 빼고)는 된다.
- **왜 URL 비밀·페어링 코드·직원 세션이 아닌가:** URL 비밀은 주소에 실린 bearer 토큰이라 QR·주소창·로그에 샌다. 페어링 코드는 RA 가 기기 앞에 없을 때만 의미가 있다(지금은 아님 — 필요해지면 그때 더한다). 직원 세션은 §1-7.

### D3. 결제 채널 3번째 = `kiosk`
- `availableIn: ('pos'|'mobile'|'kiosk')[]` (`types/index.ts:80`). 설정 화면(`SettingsPage.tsx:2810-2865`)에 **Kiosk 토글 열** 추가. 보이는 수단: `card`(단말기 연동 전제 — 설명 1줄 «단말기 연동 매장·앱 기기에서만»), `ewallet`(매장 QR 스탠디, 손님 자가 신고 → 기존 `payment_verification_pending` 흐름), `counter`, `online`(토글은 열되 **기본 OFF** — 공용 기기에서 카드번호 입력은 권하지 않는다는 문구). 숨김: `cash` · `staffMeal` · `bankTransfer`(송금 증빙 업로드는 공용 기기에 부적합).
- **기존 매장 무변화 규칙(마이그 없음·운영 쓰기 없음):** 결제 설정 JSON 에 마커 `_kioskSplit` 이 **없으면 kiosk = mobile 미러**(읽기 정규화 `utils/settingsGuard.js normalizePaymentSettings` 에서 `availableIn` 에 'mobile' 이 있으면 'kiosk' 를 더해 응답). RA 가 Kiosk 토글을 하나라도 만지면 프론트가 `_kioskSplit: true` 와 함께 저장 → 이후 명시값만 쓴다. (`_order` 와 같은 메타키 선례. 구현 확인: `guardPaymentSettings` 가 `_kioskSplit` 키를 보존하는지.)
- **서버 강제(단일 진실 = `utils/paymentMethodGuard.checkPaymentMethodAllowed`)**: 인자 `channel` 추가 → `availableIn.includes(channel)` 도 검사. 채널 판정은 호출부(orders-crud Defence B, 🔒 556-561)에서 `req.kioskDevice ? 'kiosk' : (source==='mobile' ? 'mobile' : null)`; POS 직원(null)은 오늘처럼 무검사. **`body.source==='kiosk'` 인데 토큰 없음 → 400 `KIOSK_NOT_REGISTERED`**, 토큰 있으면 source 를 'kiosk' 로 강제. 폰이 키오스크 전용 수단을 보내면 400 — ③의 실제 강제 지점.
- 모바일 결제 화면(`PaymentPage.tsx:861`) 필터: `channel = hasKioskToken() ? 'kiosk' : 'mobile'`. `card` 는 추가로 (브릿지 있음 && `card.terminal.enabled`) 일 때만 표시 — 서버는 브릿지를 모르므로 kiosk+card+terminal.enabled 만 검사하고, 브릿지 없는 기기에선 화면이 숨긴다.

### D4. `source = 'kiosk'` 저장 + orders-crud 가 «모바일 계열» 로 취급 (🔒 정식 변경 — Irene 승인 항목 Q2)
Irene 이 원하는 «분리» 는 보고서(`dashboard.js:904` source 집계)·LiveOrders 뱃지·주문 상세까지 닿아야 의미가 있다. 그러려면 🔒 세 파일에 글자 수준 변경이 필요하다. **인쇄 경로(pending-print·printed·kitchen_items·billPrint·폴러 판정)는 한 줄도 안 건드린다.**

| 파일 | 줄 | 변경 |
|---|---|---|
| `routes/orders-crud.js` | 244 · 330-334 | 머지 상대: `'mobile'` 단독 → `['mobile','kiosk']` 묶음(키오스크↔폰 같은 테이블 한 계산서, POS 와는 안 섞임 — 현 규칙 유지) |
| 〃 | 556-561 | Defence B 에 `channel` 전달 + `KIOSK_NOT_REGISTERED` (D3) |
| 〃 | 558 · 578 · 624-625 | `source === 'mobile'` → 모바일 계열(`mobile` or `kiosk`) |
| 〃 | 640 | 상태: 기존 규칙 + **kiosk && payment_method==='card' 이면 무조건 `outstanding`**(승인 전 주방 X — 거절된 카드 주문을 조리하지 않는다) |
| `components/Layout/MainLayout.tsx` | 1241 | 모바일 주문 알림: `'mobile'` → 모바일 계열(키오스크 주문도 직원이 안 넣은 주문이니 알림 대상) |
| 〃 · `hooks/useAutoPrintPoller.ts` | 1390 · 176 | 티켓 cashierName 에 `'kiosk' → 'Kiosk'` 글자 한 갈래 |

규칙대로: Irene 명시 승인 → 한 번에 묶어 → `check-print-guard` diff 가 **정확히 이 줄들뿐**인지 게이트에서 대조 → health-check print/matrix → 데모 매장 실프린터 1회(인쇄 로직 변화는 없지만 bless 규칙이 Irene 눈 확인을 요구한다 — 생략 여부는 Irene 결정) → `--bless`.
**승인하지 않으면:** 1단계는 `source:'mobile'` 유지, 키오스크 구분은 서버 토큰으로만(채널·단말기는 전부 동작). 뱃지·보고서 분리 없음. 'kiosk' 저장은 이미 대기 중인 orders-crud 정식 변경(`409 TERMINAL_VOID_REQUIRED`, ECR 설계 §3) 때 묶는다.

### D5. 키오스크 단말기 결제 흐름 (2단계)
전제: 키오스크 = Purple POS 안드로이드 앱(브릿지) + 등록 토큰 + 매장 `card.terminal.enabled` (+ 기기별 단말기 주소 — 키오스크 옆 단말기가 카운터 것과 다르면 `KioskDevice.terminal_*` 가 매장 값을 덮는다. `services/terminalPayments.createSale` 에 override 인자 1개).

```
키오스크 결제 화면 [card]
 1. POST /api/orders  (기기 토큰 · source kiosk · payment_method card)  → 주문 outstanding (주방 X)
 2. POST /api/terminal/transactions (기기 토큰 · order_id 필수 · amount = 남은 금액)  → 요청 hex
 3. 브릿지 exchange → POST /transactions/:id/response  → 서버 검증·approved·link(주문 연결)
 4. POST /api/orders/:id/payments (기기 토큰 · transaction_id · amount · tender)
      서버: 기기 매장 == 주문 매장 · order.source==='kiosk' · 그 주문에 연결된 approved 거래와 금액·수단 일치 → 기록
      완납이면 서버가 outstanding → pending (kiosk 주문 한정 · POS 흐름 무변경)  → 주방 발행은 기존 폴러가
 5. 추적 화면(기존 45초 자동 복귀)
거절·취소·무응답: TerminalPanel 재사용 — «다시 시도»(재전송) / «카운터에서 결제»(주문 outstanding 그대로 → 직원이 FloorPlan·LiveOrders 에서 오늘처럼 처리)
```
- `utils/terminalSale.runTerminalSale`(BUSY 자동 대기 5.85 포함)과 `TerminalPanel` 을 **그대로 재사용**. 바뀌는 건 인증 헤더 한 줄(직원 토큰 또는 기기 토큰).
- 키오스크 토큰으로 **되는 것**: `/config`, `/transactions`(order_id 필수), `/:id/response`, `/:id/recover`(Reprint 복구), `/:id/check-status`. **안 되는 것(403)**: 수동 기록·Void·discovery·echo — 전부 직원 판단 영역이다.
- 승인 뒤 기록 실패(앱 꺼짐·네트워크): §1-5 그대로 — 직원이 FloorPlan 카드 결제 → `409 ALREADY_APPROVED` → 재청구 없이 기록. 새 코드 0.
- 유휴: 결제 화면 5분·`setPaymentInFlight` 보호는 이미 있다(`kioskMode.ts:60-83`). 2단계는 2~4 사이를 in-flight 로 감싸기만 하면 된다.

### D6. 기기 인증 미들웨어 `authenticateKioskDevice` (선택적)
- 헤더 `X-Kiosk-Token` → sha256 → `kiosk_devices` active 행 → `req.kioskDevice = { id, restaurant_id, name, terminal }`, `last_seen_at` 갱신(분 단위 throttle). 없으면 그냥 통과(익명).
- 붙이는 곳: `server.js` 에서 `app.use('/api/orders', authenticateKioskDevice)` 를 **orders 라우터 앞에**(🔒 파일 밖에서 주입, `mobileOrderLimiter` 와 같은 자리·같은 방식 — `router.use` 가 아니라 `app.use(정확한 경로)`), `/api/terminal` 은 `router.use(staffOrKiosk)`, `POST /orders/:id/payments` 는 핸들러 안 분기. 다른 라우트는 토큰을 읽지 않는다(401 그대로).
- 토큰은 매장 1개에 묶인다. 다른 매장 주문은 404(존재도 안 알림 — terminal-payments `loadTxn` 과 같은 태도).
- 익명 rate-limit(`/api/orders`)은 그대로.

### D7. 화면
- 설정 «매장 태블릿(키오스크)» 카드: **등록 버튼 + 등록 기기 목록(이름·마지막 접속·단말기 주소·해제)**. 기존 URL/QR 은 남기되 문구를 «등록하지 않은 기기로 열면 화면만 넓어지고 결제수단은 모바일과 같습니다» 로. → `?kiosk=1` 회귀 0.
- 키오스크 화면: 계정 탭 숨김(이미), 결제수단 목록(D3), 2단계에 단말기 패널. 등록 해제 시 안내 화면.
- i18n 4개 언어: `settings.kiosk.*`, `menu.kiosk.terminal.*`.

### D8. 범위 밖
손님 QR 세션·메뉴판 모드·🔒 인쇄 경로·KDS 단계·GHL 미회신 항목(DuitNow·직불)·POS 2대 기기별 단말기(ECR §5 2단계와 합류)·안드로이드 키오스크 잠금(매장 기기 설정)·오프라인 키오스크(온라인 전제).

---

## 4. 단계와 파일 (팀원용)

**1단계 — 웹만(앱 불필요, 데모 매장에서 전부 검증 가능)**
- 모델 `models/KioskDevice.js` + `models/index.js` + 마이그(레지스트리 deploy)
- `middleware/kioskDevice.js` + `server.js` 주입 3곳
- `routes/kiosk-devices.js`(RA 전용: 등록·목록·해제, `requireRole('Restaurant Admin','System Admin')`+매장 스코프)
- `utils/paymentMethodGuard.js` channel · `utils/settingsGuard.js` 미러 규칙 · jest 단위 테스트
- 🔒 D4 (승인 시) 또는 미승인 시 source 'mobile' 유지
- 프론트: `types/index.ts` · `SettingsPage.tsx` Kiosk 열 + 기기 카드 · `mobile/utils/kioskMode.ts`(토큰 보관·헤더·`hasKioskToken`) · `PaymentPage.tsx` 필터 · `App.tsx` 진입 가드 · i18n
- 문서: 새 `docs/KIOSK_MODE.md`(키오스크 주제 문서가 없다 — `TABLE_QR_SESSION_SYSTEM.md` 에 유휴 절만 있음) + `ORDER_FLOW_MATRIX.md` §1 표에 «키오스크» 한 줄
- health-check 추가: kiosk 카테고리(아래 §5)

**2단계 — 앱 + 단말기(ECR 파일럿과 같은 날 실기)**
- `routes/terminal-payments.js` staffOrKiosk + 기기 허용 목록 · `services/terminalPayments.createSale` 단말기 override
- `routes/orders-payment.js` 기기 분기(검증 4조건) + kiosk 한정 outstanding→pending
- `utils/terminalSale.ts` 헤더 · `PaymentPage.tsx` 단말기 흐름(TerminalPanel 재사용) · 앱 진입 확인
- 운영 데모 매장 1곳 실기 1회(RM 1.00 카드 + 거절 1회 + 앱 강제 종료 뒤 FloorPlan 복구)

---

## 5. 게이트에서 볼 것 (검증 기준 — 팀원이 증명, 내가 판정)

1. **고장주입 3(필수):** ⓐ 토큰 없이 `source:'kiosk'` → 400 `KIOSK_NOT_REGISTERED` ⓑ 기기 토큰으로 **다른 매장** 주문 결제 기록 → 404 ⓒ 승인 없는·금액 다른 `transaction_id` 로 기록 → 400. 각각 방어를 빼면 실제로 통과돼 버리는지 1회.
2. **채널:** 모바일 OFF·키오스크 ON 인 수단을 폰(토큰 없음)이 보내면 400 / 마커 없는 매장의 kiosk 응답 == mobile 응답(바이트 비교) / 토글 한 번 뒤 `_kioskSplit` 저장·보존(settingsGuard 통과).
3. **🔒 변경(D4 승인 시):** `check-print-guard` 가 잡는 파일 = 정확히 3개, diff = §D4 표의 줄만 · `health-check --category=print` · `matrix` · `terminal` · `mobile` · mount sweep `--full` · 실프린터 1회 → `--bless`.
4. **회귀:** 미등록 브라우저 `?kiosk=1` 결제수단 목록 == 오늘(스냅샷) / 폰 QR 흐름 무변화 / `kioskIdle.guard.test` 유지.
5. **2단계 실기:** 승인→주문 paid·pending·주방 티켓 1장 / 거절→outstanding 유지·FloorPlan 에서 처리 / 승인 직후 앱 강제 종료 → FloorPlan 카드 → `ALREADY_APPROVED` 로 기록·재청구 0 / 기기 해제 뒤 401.
6. 기계 게이트: `verify-all`(1단계 `--full` 1회), `check-sensitive-diff`, 마이그 레지스트리.

---

## 6. Irene 에게 — 결정 질문 (선택지 · 결과 · Fable 권고)

**Q1. 어느 길로 갈까요?**
- **A. 등록 기기 + Kiosk 채널 + 키오스크 단말기 (권고)** — 질문 ①②③ 전부 해결. 2단계(앱+단말기)는 GHL 파일럿과 같은 날 실기. 크기 «대».
- B. 결제 설정만 분리, 단말기는 카운터(FloorPlan)에서 — 빠르고 안전하지만 ① 미해결, ③은 URL 이라 강제 없음. 「포스터미널처럼」 과는 거리가 있음.
- C. 키오스크를 직원 로그인 POS 앱으로 — **비권고.** 손님 기기에 직원 자격이 남는 구조(10-04 고객 디스플레이와 같은 구멍).
- **Fable 권고: A.** B 로 시작해도 A 의 1단계와 겹쳐 버리는 코드는 없으니, 확신이 안 서면 «A 의 1단계만 먼저» 도 됩니다.

**Q2. 🔒 보호파일 3개(orders-crud · MainLayout · useAutoPrintPoller)에 §D4 표의 글자 수준 변경을 승인하시겠습니까?** (인쇄 경로 무접촉, 목적 = 주문에 «키오스크» 꼬리표를 저장해 뱃지·보고서·알림이 구분되게)
- 예 → 1단계에 포함, 게이트에서 diff 줄 대조 + 실프린터 1회 + bless.
- 아니오 → 1단계는 source 'mobile' 유지(채널·단말기·기기 등록은 전부 동작). 뱃지·보고서 분리는 다음 orders-crud 정식 변경 때.
- **Fable 권고: 예.** «분리» 의 핵심이 이 꼬리표이고, 변경이 인쇄 블록 밖 분기 문자열뿐이라 지금 묶는 편이 왕복이 적습니다.

**Q3. 순서 — 1단계 먼저 배포하고 2단계를 따로 할까요, 한 번에 할까요?**
- 1단계 먼저(권고) → 웹만으로 데모 매장에서 검증·배포 가능. 2단계는 앱 설치 기기·실단말기가 있어야 증명되므로 ECR 파일럿 일정에 맞춤.
- 한 번에 → 실기 검증 전까지 1단계 성과(설정 분리·기기 등록)도 묶여 대기.
- **Fable 권고: 1단계 먼저.**

(참고 — Q 가 아닌 팀원 재량으로 정한 것: 키오스크 Kiosk 열에 `online` 토글은 열되 기본 OFF, `bankTransfer`·`cash`·`staffMeal` 은 숨김. 이견 있으면 한 줄로.)
