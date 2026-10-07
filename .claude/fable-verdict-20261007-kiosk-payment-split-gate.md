# Fable 게이트 판정 — 키오스크 결제 분리 (2026-10-07, 2회차 · 게이트)

> 1회차 설계: `.claude/fable-verdict-20261007-kiosk-payment-split.md` (Irene: 「Fable 권고대로 해. 우리 완벽한 키오스크 필요해. 카드단말기랑 자동 연동 된」 = Q1 A · Q2 예 · Q3 1단계 먼저).
> 이 판정: 코드 변경 0 · 운영 접근 0 · 개발 DB 쓰기 0(읽기·health-check 재실행만). 줄 번호는 2026-10-07 dev 작업 트리 기준.

---

## 0. 한 줄 결론

**조건부 통과 — 통과 마커는 지금 찍지 않는다.**
설계(D1~D7)와 구현이 일치하고, 서버 방어는 health-check 3건 + 고장주입 4건으로 실증됐으며, 🔒 보호파일 3개의 diff 는 1회차 §D4 표의 줄만이다.
남은 것은 넷 — **코드 2건(작음, 아래 §2 F1·F2)** · **기계 1건(실브라우저 mount sweep, 메모리 부족으로 못 돌림)** · **Irene 1건(실프린터 1회 → 🔒 bless)** · **2단계 실기(앱 기기 + 실단말기, GHL 파일럿 날)**.
F1·F2 를 반영하면 지문이 바뀌므로 마커는 그 뒤 짧은 재확인 1회에서 찍는다(§5).

---

## 1. 내가 직접 확인한 것

### 1-1. 🔒 보호파일 diff = 1회차 §D4 표 그대로 (인쇄 경로 무접촉)

| 파일 | 바뀐 곳 | 판정 |
|---|---|---|
| `routes/orders-crud.js` | 244(mergeable 목록 `notIn ['mobile','kiosk']`) · 287(`isMobile` 헬퍼 = mobile∨kiosk) · 330-334(머지 상대) · 556-566(Defence B 에 `channel` 전달) · 582(테이블 필수 가드) · 629(`isMobileSource`) · 645-647(kiosk+card → `outstanding`) | D4 표와 일치. `KIOSK_NOT_REGISTERED` 는 orders-crud 가 아니라 **`server.js` 미들웨어(`stampKioskOrderSource`)에서** — 🔒 접촉 줄이 설계보다 **적다**. 수용. pending-print / printed / print-claim / kitchen_items 블록 무접촉. |
| `components/Layout/MainLayout.tsx` | 1241(알림 판정에 kiosk) · 1390(cashierName 'Kiosk') | D4 그대로. `_printPollFn` 무접촉. |
| `hooks/useAutoPrintPoller.ts` | 176(cashierName 'Kiosk') | D4 그대로. 폴러 판정·발행 로직 무접촉. |

`check-print-guard` 는 정확히 이 3개만 잡는다(내가 재실행). bless 는 Irene 실프린터 확인 뒤(§6 Q1).

### 1-2. 서버 — 설계 대조 (코드 읽기 + 재실행)

- **기기 신원(D2·D6)**: `middleware/kioskDevice.js` — `X-Kiosk-Token` → sha256 → `kiosk_devices` active 행 → `req.kioskDevice`. 헤더 없음 = 통과(익명·직원 무영향), 헤더 있는데 없음/해제 = 401 `KIOSK_REVOKED`. `last_seen_at` 60초 throttle. `server.js:462-467` 에서 `app.use('/api/orders', …)`·`app.use('/api/terminal', …)` 정확한 경로로 orders 라우터 **앞에** 주입 — 🔒 밖. 토큰 원문은 등록 응답 1회, DB 는 해시만(health-check 가 DB 행 대조). 등록·목록은 `requireRole(RA·SA)+checkRestaurantAccess`, PATCH·revoke 는 `loadOwned`(남의 매장 404).
- **출처 꼬리표(D4)**: `stampKioskOrderSource` — 토큰 있으면 `source='kiosk'` 강제 + 자기 매장만(403 `KIOSK_WRONG_RESTAURANT`) + 카드인데 단말기 꺼짐 409 `TERMINAL_DISABLED`; 토큰 없이 `kiosk` 보내면 400. POST `/` 에만 작동(폴러 GET 무영향).
- **채널(D3)**: `paymentMethodGuard.methodOpenIn` — `_kioskSplit` 없으면 kiosk = mobile 값, 있으면 `availableIn.includes('kiosk')`, `cash·staffMeal·bankTransfer` 는 항상 false. 화면 `utils/paymentChannel.ts` 가 같은 규칙(단위 테스트 3건 통과 — `react-scripts test` 로 내가 재실행, `npx jest` 직접은 ESM 설정 때문에 안 돈다). `normalizePaymentSettings` 가 `_kioskSplit` 보존, 저장 경로 `restaurants-crud.js:1758 guardPaymentSettings` 도 보존(merged) — 단 §2 F1 참조.
- **단말기(D5)**: `routes/terminal-payments.js` — 키오스크 허용 5개(`GET /config` · `POST /transactions` · `/:id/response|recover|check-status`)만, 나머지 403 `KIOSK_FORBIDDEN`. `/transactions` 는 `order_id` 필수 + 자기 매장 + `source='kiosk'` 주문만(404). `loadTxn` 은 자기 기기 거래만(`device_label` 머리 `kiosk#<id> `). 기존 보호(`AMOUNT_EXCEEDS` · `ALREADY_APPROVED` · `DOUBLE_APPROVAL`)는 키오스크 경로에도 그대로 걸린다(`createSale` 공용).
- **결제 기록(D5)**: `orders-payment.js POST /:id/payments` — `req.kioskDevice` 면 화면 값 무시, **승인된 자기 기기 sale 거래**에서 금액·수단·참조를 읽음(4조건: 매장 일치 · `source='kiosk'` · `approved`+같은 주문 · 자기 기기). 같은 승인 재기록은 `deduped`. 완납이면 **kiosk 주문만** `outstanding→pending`(직원 흐름 무변경). `TerminalTransaction.order_payment_id` 연결. 감사 `OrderAction` 은 `source:'mobile'`·`customer`(§3 N1).
- **health-check `--category=kiosk` 3/3** — 내가 재실행해 통과. 팀원 고장주입 4건(토큰 없는 kiosk 허용 / 매장·기기 확인 제거 / 승인 확인 제거 / 채널 검사 제거 → 각각 잡힘, 원복 뒤 3/3, 매번 pm2 restart) 은 코드와 테스트 본문을 대조해 **수용**.
- **마이그**: `migrate-create-kiosk-devices.js` 신규 표만·멱등·`process.exit` · 레지스트리 `deploy`. dev 표 생성 확인(`SHOW CREATE TABLE`, 테스트 행 0 — 정리됨). `check-enum-parity` 는 운영에 없는 신규 표를 건너뛴다(`:64`) → 배포 차단 없음.
- **`check-sensitive-diff`**: ②③⑤ 대상(이 사안) — 판정 사유 그대로.

### 1-3. 화면 — 설계 대조

- `utils/httpClient.ts`: 기기 토큰은 `/api/orders` · `/api/terminal/` · `/api/kiosk-devices/me` 에만 실림(`needsKioskHeader`). 그 요청의 401 → 토큰 삭제 + `/pos?kiosk_revoked=1`(1회). dedupe 키에 `|kiosk` 분리. 모바일 쪽에 `/api/orders` GET(직원 전용 401) 호출은 없음(추적 페이지는 다른 경로) → 멀쩡한 키오스크가 401 로 풀리는 길 없음.
- `App.tsx /pos` → `KioskEntryGate`: 토큰 있고 직원 세션 없으면 키오스크 주소로. 직원 세션이 있으면 가로채지 않음. `LoginPage` 는 `/pos` 한 곳뿐이라 등록된 태블릿에서 직원이 다시 로그인하는 길은 사실상 없다(§3 N2).
- `KioskDevicesCard.tsx`: 등록 → 토큰 저장 → `/api/auth/logout` + `clearAuthToken` + `user` 삭제 → 키오스크 주소. 해제는 다른 기기에서 가능. 기기별 단말기 주소(호스트·포트 검증 400).
- `SettingsPage.tsx`: 결제수단 줄에 Kiosk 토글(숨김 3종 제외), 첫 토글 때 `splitKioskFromMobile` 로 굳힘, `_kioskSplit` 을 줄로 안 그림.
- `PaymentPage.tsx`: 채널 = 토큰 유무, 키오스크 `card` 는 브릿지(`getEcrBridge`, 7초 재확인) + `GET /terminal/config` 켜짐일 때만. 카드 주문은 counter 와 같은 생성 길 + `skipAutoMerge` + 연결 없으면 오프라인 큐 제외 → 생성 뒤 `runTerminalSale`(계산대와 같은 흐름) → 승인 시 `/payments` 3회 재시도 → 실패면 «결제됨, 주문번호를 직원에게». `KioskCardPanel` 은 공용 `Button` 사용, 수동기록·Void 없음(키오스크 403 과 일치).
- 팀원 재량 ①~⑦ 전부 수용 — 특히 ② `skipAutoMerge`(같은 테이블 남의 계산서까지 긁는 사고 방지)와 ③ 무응답 시 «다시 시도» 제거(이중 청구 방지)는 설계보다 낫다.
- 실브라우저 클릭 흐름 11/11(팀원 e2e, 로그 대조) — 12번째 콘솔 오류 1건은 페이지 이동 중 끊긴 fetch(`Failed to load site settings`)로 판단 수용. **그러나 이것은 8역할 mount sweep 을 대신하지 못한다**(§4).

---

## 2. 고쳐야 할 것 — 배포 전 (둘 다 작음)

### F1. `settingsGuard.guardPaymentSettings` — `_kioskSplit` 이 설정 wipe 자물쇠를 약화시킨다 (실증)
```
all-disabled(마커 없음)      → reject   (오늘과 같음)
all-disabled + _kioskSplit   → save     ← 자물쇠가 안 걸린다
```
원인: `incomingKeys` 가 `_order` 만 빼고 `_kioskSplit`(boolean) 을 «수단» 으로 센다 → `every(enabled===false)` 가 false. «절반 미만» 계산도 1개 어긋남.
**수정(한 줄)**: `:256-257` 두 필터를 `k !== '_order'` → `!k.startsWith('_')` 로. 메타키는 전부 제외(앞으로 생길 `_…` 도 같은 처리).
**증명**: 위 두 케이스를 계약 테스트(설정 wipe)에 추가 — 수정 뒤 `reject`, 수정을 빼면 `save` 로 떨어지는 것 1회(반증).

### F2. D3 «online 은 토글은 열되 기본 OFF» 가 미반영 — 미러 규칙이 `online` 도 모바일을 따라간다
지금: `_kioskSplit` 없는 매장(=전부)에서 모바일에 `online`(Stripe 카드번호 입력) 이 켜져 있으면 등록 키오스크에도 보인다. 공용 기기 카드번호 입력은 1회차에서 «기본 OFF» 로 정한 것. (미등록 `?kiosk=1` 은 모바일 채널이라 오늘과 같이 보임 — 바꾸지 않는다.)
**수정(양쪽 한 줄씩)**: `paymentMethodGuard.methodOpenIn` · `paymentChannel.methodOpenIn` 에서 `channel==='kiosk' && !_kioskSplit && key==='online'` → `false`. `splitKioskFromMobile` 은 `methodOpenIn` 결과를 굳히므로 자동으로 `online` 을 kiosk 에서 뺀 채 분리된다(토글 켜면 그때부터 명시값).
**증명**: `paymentChannel.test.ts` 1건 + health-check kiosk 테스트 2(미분리 비교 루프)에 `online` 예외 반영.

(F1·F2 는 프론트 파일을 건드리므로 **코드를 전부 확정한 뒤 빌드 1회 → `verify-all --full` 1회** — §4.)

---

## 3. 기록만 (지금 안 고침)

- **N1.** `order_actions.source` ENUM 에 `kiosk` 없음 → 키오스크 결제 기록은 `source:'mobile'·role:'customer'`. 다음 orders 정식 변경 때 `expandEnum(…, 'order_actions', 'source', ['kiosk'])` 로 묶는다(expand-only).
- **N2.** 직원 로그인 + 기기 토큰이 한 기기에 같이 있으면 그 직원의 POS 주문이 `kiosk` 로 찍히고 단말기 호출이 403 이 된다. 도달 경로는 «등록 직후 로그아웃 실패» 뿐이고 `/pos` 관문이 재로그인을 막아 사실상 없음. 원하면 `httpClient` 에서 **직원 토큰이 있으면 기기 헤더를 싣지 않는다** 한 줄(선택, 이번에 안 넣어도 됨).
- **N3.** `isKioskTxnOf` 가 `device_label` 접두어로 판정 — 직원이 같은 접두어를 적어도 얻는 게 없다(기록은 어차피 직원 권한). 수용.
- **N4. 개발 DB 잔재**: 데모 매장 38 에 `source='kiosk'` 주문 **8건**(id 28567·28570·28574·28578·28582·28586·28606·28651, 전부 `pending/completed/7.50`, 고장주입·e2e 잔재). 거래·원장 행은 지워졌고 주문만 남았다. dev 전용 — 지울 것(`Order.destroy force`).
- **N5. 사고(데모 38 결제 설정)**: 원본 복구는 **불가 확정** — `backups/dev-daily` 는 코드 tar 만(DB 덤프 없음), 바이너리 로그 권한 없음. e2e 스크립트가 덮어쓴 값은 정확히 넷(`card.enabled/availableIn/terminal` · `counter.allowed_order_types` · `_kioskSplit`)이고 나머지 수단은 무접촉. 팀원의 카탈로그 기본값 복원(card `['pos']` · counter 3종 · terminal 삭제)을 수용. 운영 무관. 이후 실행은 시작 시 원본 저장·원복 일치 확인 — 재발 방지 됨.

---

## 4. 아직 증명 안 된 것 → 완료 조건 (확인 불가는 확인 불가로)

| 항목 | 상태 | 언제 |
|---|---|---|
| 실브라우저 mount sweep(8역할, 크래시 0) | **확인 못 함** — 시스템 메모리 부족으로 강제 종료. 변경이 `httpClient`·`App.tsx`·`MainLayout` 등 전 화면 공용이라 **필수** | F1·F2 반영 → `npm run build:dev` 1회 → `verify-all --full` 1회 (지금 메모리는 비어 있다: available 5.0GB) |
| 타입 기준선(tsc) | 빌드 전 사전 실행 신규 0 — 게이트 안에서는 메모리 게이트 차단 | 같은 `--full` 에서 |
| 🔒 bless | 실프린터 1회 전 | §6 Q1 |
| 2단계 실기 | 앱 기기 + 실단말기 없음 | GHL 파일럿 날: 승인→paid·pending·티켓 1장 / 거절→outstanding·FloorPlan 처리 / 승인 직후 앱 강제 종료→FloorPlan 카드→`ALREADY_APPROVED` 재청구 0 / 해제 뒤 401 |

---

## 5. 마커 · 호출 횟수

- **마커 보류.** F1·F2 는 지문을 바꾸므로 지금 찍어도 죽는다. F1·F2 + §4 기계 항목이 끝나면 **짧은 재확인 1회**(diff = §2 지정 줄만인지 + `verify-all --full` 결과 + 반증 1회)에서 찍는다. «한 사안 2회» 규칙의 예외 조건(사안이 실제로 바뀜 = 판정이 수정을 요구함)에 해당한다.
- 팀원이 `.fable-gate-skip` 으로 넘기지 말 것 — 자물쇠(F1) 가 걸린 사안이다.

---

## 6. Irene 에게 — 결정·주의 (선택지 · 결과 · Fable 권고)

**Q1. 🔒 3파일 bless 전 실프린터 확인 — 하시겠습니까, 생략하시겠습니까?**
- 바뀐 것은 티켓 계산원 칸 글자(`Kiosk`)와 알림 판정뿐, 인쇄 발행·폴러 로직은 무접촉입니다. 그래도 규칙(보호파일 변경 = Irene 눈 확인 뒤 bless)은 그대로입니다.
- 확인 방법: 데모 매장(또는 매장 1곳)에서 **키오스크 주문 1건 → 주방 티켓 1장**, 계산원 칸에 «Kiosk» · 티켓 1장(중복 0)만 보면 됩니다.
- **Fable 권고: 확인 1회.** 2026-06-25 결정대로 «매장 왕복은 1회» — F1·F2·sweep 까지 끝낸 뒤 한 번에.

**Q2. 1단계(웹)와 2단계(단말기) 코드를 함께 배포할까요?**
- 2단계 코드는 «등록 기기 + 앱 브릿지 + 단말기 켜짐» 이 다 있어야 깨어납니다. 기존 매장 변화 0 근거: 토큰 없음 → 미들웨어 통과 / `_kioskSplit` 없음 → 키오스크 = 모바일 / 🔒 `kiosk` 분기는 kiosk 주문이 없으면 실행 안 됨.
- **Fable 권고: 함께 배포.** 실기 검증(§4)은 GHL 파일럿 날 한 번에. 2단계를 따로 빼면 같은 파일을 두 번 만지게 됩니다.

**Q3. F2 — 등록 키오스크에서 «온라인 결제(카드번호 입력)» 는 매장이 Kiosk 토글을 켜기 전까지 안 보이게 합니다.** 1회차 설계(D3) 그대로입니다. 다르게 원하시면 한 줄만.

**주의:** 운영 배포는 F1·F2 → 빌드 1회 → `verify-all --full` → 실프린터 → bless → 재확인 마커 뒤. SW 버전은 프론트 변경이 다 끝난 뒤 마지막에.

---

## 7. 재확인 (2026-10-07 · F1·F2 반영 뒤 · 이 사안 게이트의 마무리)

> 코드 변경 0 · 운영 접근 0 · 개발 DB 쓰기는 `health-check --category=kiosk` 재실행(자기 정리)뿐. 반증은 저장소 밖 임시 사본으로.

### 7-1. 내가 직접 확인한 것

| 항목 | 결과 |
|---|---|
| **diff 범위** | 1회차 이후 새로 바뀐 파일 = `settingsGuard.js` · `paymentMethodGuard.js` · `paymentChannel.ts` · `settings-guard.test.js` · `paymentChannel.test.ts` · `health-check.js`(kiosk 2 online 예외 + kiosk 2·3 정리 앞 `order_actions` 삭제) — **§2 가 지정한 범위 그대로, 그 밖 0.** 🔒 3파일 hunk 위치(orders-crud 243·287·331·334·559·565·582·629·645 / MainLayout 1241·1390 / useAutoPrintPoller 176)는 §1-1 표와 동일 — F1·F2 가 보호파일을 건드리지 않았다. |
| **F1 코드** | `:256-257` 필터 `!k.startsWith('_')` · `_kioskSplit` 보존 1줄 · 일반 저장이 `merged` 반환. 팀원이 덧붙인 «일반 저장도 merged» 는 내가 §2 에 안 적었지만 **필요한 수정이다** — 안 하면 보존한 `_order`·`_kioskSplit` 이 `save` 경로에서 버려져 F1 의 보존 분기가 죽은 코드였다. 수용. 결제수단 값은 incoming 그대로라 동작 변화는 메타 키 2개뿐. |
| **F1 증명** | 계약 테스트 8/8(내 재실행). **반증(저장소 무접촉)**: `settingsGuard.js` 를 `/tmp` 에 복사해 필터만 옛 것(`k !== '_order'`)으로 되돌린 사본 → `all-off + _kioskSplit` 이 **save**, 현재 코드는 **reject**. 표시 없이 저장해도 `_kioskSplit:true`·`_order` 보존 확인. |
| **F2 코드** | 서버 `methodOpenIn` · 화면 `methodOpenIn` 둘 다 «kiosk · 미분리 · `online` → false» 한 줄, 분리 뒤엔 명시값. 두 쪽 규칙 문자 그대로 같다. |
| **F2 증명** | 화면 jest 4/4(내 재실행: 미분리 online kiosk=false·mobile=true · 분리 직후 false · 토글 켜면 true). `health-check --category=kiosk` **3/3**(내 재실행, 잔재 0). |
| **mount sweep** | `verify-all --full` 로그: 24 중 21 ✓, sweep ✓ **755초 실행**(캐시 아님 · 0/0 스킵이면 초 단위라 실행은 확실). `.sweep-cache.json` 의 번들 지문 = 지금 서빙 번들 지문(`75d3db78…`) 일치 → **F1·F2 뒤 빌드된 그 번들**을 검사했다. 번들(14:16)이 모든 프론트 소스(최신 14:13)보다 새것. 타입 기준선 ✓ · i18n ✓ · 인스펙션 ✓ · 계약 테스트 ✓ · 인쇄 라우트 가드 ✓. |
| **✗3 의 성격** | print-guard(🔒 3파일, bless 전) · health-check 302/303(같은 보호파일 1건) · 배포 준비(배포 기록 파일 — 배포 때) — **전부 예상된 것, 코드 결함 0.** |
| **N4 잔재** | dev DB `source='kiosk'` 주문 0 · `kiosk_devices` 0 · 고아 `order_actions` 0(읽기 전용 조회). health-check 재실행 뒤에도 0 — FK 정리 수정이 맞다. |
| **`check-sensitive-diff`** | 여전히 ①②③⑤ 대상(사안 성격 그대로). `fable-gate status`: 지문 `2648d2d91cca`, 마커 무효(지난 5.88 도장 이후 코드 변경). |

### 7-2. 판정

**키오스크 결제 분리 — PASS.** F1·F2 가 지정한 줄로 반영됐고, 자물쇠 반증 1회·채널 단위 테스트·서버 health-check·실브라우저 sweep 까지 §4 의 기계 항목이 전부 증명됐다. 코드로 더 고칠 것 없음. 남는 것은 §4 그대로 **Irene 실프린터 1회 → 🔒 bless** 와 **2단계 실기(GHL 파일럿 날)** 뿐이다.

### 7-3. 통과 마커 — 지금 찍지 않는다 (§5 를 한 번 더 미룸, 이유 둘)

1. **bless 가 마커를 죽인다.** `print-guard.manifest.json`·`print-guard.bless-log.md` 는 **추적 파일**이라 bless 순간 지문이 바뀐다. 지금 찍어도 실프린터 확인 뒤 반드시 다시 찍어야 하므로 의미가 없다. §5 를 쓸 때 이 점을 빠뜨렸다.
2. **마커는 작업트리 전체에 하나다.** 같은 트리에 **영수증 방 변경(Fable 판정 없음 — 그 방 기록 «Fable 게이트 남음»)** 이 섞여 있다. 지금 찍으면 내가 보지 않은 코드에 도장이 올라간다. K-Bulgogi 방은 이미 PASS(마커만 보류)라 문제없다.

**최종 도장 조건(기계적 — 짧은 Fable 1회, 새 판정 아님):** ①실프린터 확인 뒤 bless 완료 ②영수증 방이 자기 Fable 게이트를 받았거나 작업트리에서 빠짐 ③그때 `git diff` 가 «지문 `2648d2d91cca` 의 내용 + bless 2파일 + 영수증 게이트가 요구한 수정» 뿐이면 → 그 자리에서 `fable-gate.js pass --note "키오스크 PASS(이 파일 §7) · K-Bulgogi PASS · 영수증 게이트 판정 경로"` 로 찍는다. 그 전에 `.fable-gate-skip` 으로 넘기지 말 것(§5).

### 7-4. Irene 에게

- 코드는 끝났습니다. **하실 일은 §6 Q1 한 가지** — 키오스크 주문 1건 → 주방 티켓 1장(계산원 칸 «Kiosk» · 중복 0)만 보시면 됩니다. 그 뒤 bless → 영수증 방 게이트 → 도장 → `/배포` 순서입니다.
- §6 Q2(1·2단계 함께 배포)·Q3(미분리 키오스크에서 온라인 결제 숨김)은 그대로 권고합니다. 다르게 원하시면 한 줄만.
