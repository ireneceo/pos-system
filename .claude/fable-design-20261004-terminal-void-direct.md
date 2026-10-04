# Fable 설계 판정 — 2026-10-04 카드단말기 ③ : Void(A2) · PayHere Direct 실패 분류(B0 · HTTP BUSY) · «여기까지가 개발인가» 사실 판정

판정자: Fable 5.1 · 작성 2026-10-04 (UTC) · 선행 판정 `.claude/fable-design-20261001-ghl-ecr.md`, `.claude/fable-verdict-20261004-terminal-direct-gate.md`
구현: 팀원(Opus). 이 문서는 **범위·우선순위·판정 기준**을 정한다. 코드 변경은 하지 않았다.

---

## 0. 결론 한 줄씩

1. **POS↔단말기 연동은 끝까지 동작한다.** 운영 tx 28·29 는 «금액만 전달» 이 아니라 **왕복이 완결된 거래**다(28: 단말기에서 취소 → C7 · 29: 카드 Wave 읽음·VISA·TID/MID·단말기 송장 000007 까지 받았고 **은행이 응답하지 않음 → B0**). 고장 지점은 **단말기↔은행(GHL 호스트)** 이고 우리 코드가 아니다. 다만 **우리가 B0 를 «응답 없음» 으로 잘못 분류**해 Reprint 를 쐈고, 단말기가 그걸 `HTTP 400 BUSY` 로 거절해 화면이 «결과 미확인 / 에러» 로 보였다. **이 분류가 이번에 고칠 우리 결함이다.**
2. **디바이스 세팅으로 결제가 되는 게 아니다.** 단말기가 은행에 못 닿은 것이니 (a) 단말기 자체 네트워크(와이파이/SIM) (b) TID `…`/MID 가 GHL 쪽에서 **활성(라이브)** 인지 — 이 둘은 GHL/단말기 쪽 확인 사항. **단말기 자체 메뉴에서 RM1 판매를 POS 없이 해 보면 즉시 갈린다**: 거기서도 time-out 이면 100% 단말기↔은행 문제.
3. **Void(A2)는 만든다.** 진입점은 **주문 취소 흐름**(LiveOrders · FloorPlan) 이 주다 — «결제된 주문을 취소하면 단말기 카드도 함께 취소». 돈 처리는 **기존 주문취소가 이미 하는 방식 그대로**(cancelled 주문은 보고·마감·몰보고에서 제외) — `order_payments` 는 손대지 않는다. 보조 진입점 2곳은 결제창 패널(이중승인 «이 결제 취소» · 결과 미확인 «안전 취소»).
4. **결제 대기 중 POS 취소(C1)는 이번에 안 만든다.** 규격서에 명령 ID 만 있고 요청/응답 정의가 없다(6.1 표에만 존재, 5.x 절 없음). 추측 구현 금지 → GHL 질문. 화면 문구 «단말기에서 Cancel» 유지.
5. 앱(APK) **재빌드 불필요** — 0.3.4 가 이미 원본 바이트(`raw_hex`)를 올리므로 HTTP 상태·본문 해석은 서버가 한다. 스키마 변경 0(`status` ENUM 에 `voided`, `command` 에 `void` 이미 있음).

---

## 1. 사실 판정 — 운영 실측(매장 13 · PayHere Direct · 앱 0.3.4) 해석

| tx | 보낸 것 | 받은 것 | 뜻 | 우리 처리(현재) | 판정 |
|---|---|---|---|---|---|
| Echo ×4 | C3 | 00, 규격 §9.1 샘플과 동일 | POS↔단말기 통신 정상 | approved | 정상 |
| 28 | Sale RM20.03 | 18초 뒤 **C7** Transaction cancelled | 단말기 화면에서 Cancel 누름 | cancelled → «Card not approved» | **정상** (규격 6.3 · 테스트 8.2 기대값 C7) |
| 29 | Sale RM1.06 | 23초 뒤 **B0** Bank timed out + C007 PAN(마스킹)·D002 VISA·C002/C003·C004 000007·C005 000002·D01A Wave·AID/TC/TVR, **C00A 승인번호 없음** | 카드를 읽고 은행에 보냈는데 **은행 응답 없음**. 단말기가 거래를 승인하지 않았다(TC 가 있어도 승인번호가 없다 = 호스트 승인 없음). 표준 EMV 처리상 단말기는 미응답 거래를 자동 reversal 한다 | `classifyStatus` 가 B0 → `comm_error` → 화면이 Reprint 자동 복구 | **우리 결함**: B0 는 «단말기가 준 최종 답» 이다. «응답 없음» 이 아니다 |
| 30 | Reprint E6 (29 의 자식, **같은 초**에 전송) | `HTTP/1.1 400 Bad Request` · 본문 `BUSY` | 단말기가 명령을 **받기 전에 거절**(프레임 없음 = 거래 처리 없음). 원인은 둘 중 하나 — ① B0 직후 reversal·영수증 인쇄 중이라 바쁨 ② Direct 가 E6 미지원(개정 24 «Applicable only for Payhere ECR»). 1건으로는 못 가른다 | 앱 BAD_RESPONSE → comm_error → 부모 timeout → «결과 미확인 + 수동 기록» | 분류는 보수적이라 돈은 안 틀어졌지만, **캐셔에게 «에러» 로 보였고 원인 문구가 없다** |

**Irene 질문에 대한 사실 답**
- 「금액 전달만 되고 있어, 여기까지가 개발이야?」 → **아니다.** 전달 → 카드 읽기 → 은행 요청 → 결과 수신 → 서버 판정까지 전부 돌았다. tx 29 응답에 카드번호(마스킹)·카드사·단말기 송장이 들어 있다는 게 증거다. 승인이 안 난 이유는 **은행이 답하지 않아서**(B0).
- 「디바이스 세팅을 해야 결제가 되는 거야?」 → POS 쪽 세팅은 더 없다. 단말기↔은행 구간은 **GHL 쪽**(단말기 네트워크·TID/MID 활성). 확인 순서는 §8.
- 「지금 카드 단말기 에러가 확인 돼?」 → **된다.** 15:32:09 B0 «Bank timed out» 1건(카드 VISA Wave) + 그 직후 우리 Reprint 를 단말기가 `400 BUSY` 로 거절 1건.

---

## 2. 결정 ① — Direct 실패 분류 (서버 `utils/ghlEcr.js` · `services/terminalPayments.js` · 화면 문구)

### 2-1. 상태 코드 분류 수정 (`classifyStatus`)
- **B0 (Bank timed out) → `declined`** (현재 comm_error). 근거: 규격 6.3 에서 B0 는 CA 와 별개의 **응답 상태**다. 단말기가 결과를 줬으니 «응답 없음» 복구(E6)를 돌릴 이유가 없고, 오히려 Direct 에서 BUSY 를 유발했다.
- **CA (Communication error) → `declined`** (현재 comm_error). 같은 이유 — 단말기가 «호스트와 통신 실패» 라고 **답한** 것. `comm_error` 는 **우리가 단말기 답을 못 받은 경우**(TIMEOUT · BAD_RESPONSE · 연결 끊김) 전용으로 좁힌다.
- 화면 문구(4개 언어): `reason:code:B0` 같은 코드 노출 대신 전용 키 —
  - B0: «은행이 응답하지 않아 결제가 되지 않았습니다. 손님 카드에는 청구되지 않았습니다(보류 표시가 보이면 자동 취소됩니다). 다시 시도하거나 다른 수단으로 받으세요.»
  - CA: «단말기가 은행과 통신하지 못했습니다. 단말기의 와이파이/SIM 을 확인하고 다시 시도하세요.»
  - C0: «시간 안에 카드를 대지 않아 취소됐습니다.» · C7: «단말기에서 취소됐습니다.» · C1: «이 카드는 받을 수 없습니다.» (C3·C5 는 §3 Void 문구)
  - 그 외 01~99 는 «카드사 거절(코드 NN)» 로 기존 `reason:code` 유지.

### 2-2. HTTP 거절 해석 (앱 0.3.4 `raw_hex` 를 서버가 읽는다)
- `applyResponse` 의 `!response_hex` 분기에서 `raw_hex` 가 `HTTP/` 로 시작하면 **상태줄 + 본문**을 뽑는다(`parseHttpRaw(raw) → { status:400, body:'BUSY' }`, 본문은 비hex·80자 이내로 잘라 둠). 저장: `status_message = 'HTTP 400 BUSY'` (현재는 `BAD_RESPONSE` 만 남아 원인이 안 보임), `status_code = 'H400'`(STRING(4)).
- **분류 규칙**
  - **4xx + 프레임 없는 짧은 본문 = 단말기가 명령을 받기 전에 거절 → 그 명령은 처리되지 않았다.**
    - `sale` 행: `declined`(status_message 위와 같이) + 화면 «단말기가 바빠서 요청을 받지 않았습니다. 단말기 화면의 작업을 끝내거나 취소한 뒤 다시 시도하세요.» (`reason:terminalBusy`). 캐셔의 «다시 시도» 가 새 Sale 을 만든다 — 거절된 요청은 처리된 적이 없으니 이중 결제 아님.
    - `reprint`/`check_status`/`void` 자식: 자식 `comm_error`(status_message HTTP …) · **부모는 지금처럼** 되돌린다(reprint 면 recovering→timeout). 단 §2-3 의 재시도 1회를 먼저 한다.
  - **5xx · 상태줄 없음 · 본문이 프레임처럼 보이나 깨짐 = 처리 여부 불명 → 지금처럼 `comm_error`**(복구 경로).
  - 근거의 한계(정직하게): 4xx=미처리 는 HTTP 의미론 + Notify 0004 «Device is busy» 어휘 + 실측 1건(E6 직후 BUSY) 위에 선 판단이다. **운영 첫 실측에 «BUSY 유발 테스트» 를 넣어 반증한다**(§7-3 ③): 단말기 메뉴를 열어 둔 채 POS 에서 RM1 Sale → 400 BUSY 기대 → 단말기 영수증·배치에 거래 0 확인. 거래가 있으면 즉시 이 규칙을 `comm_error` 로 되돌린다(1줄).
- 앱 무변경. 데스크탑 `exchange.js` 는 raw 를 안 올리지만 실사용 0 — 그대로.

### 2-3. 복구(E6) 재시도와 Direct 미지원 대비
- `recover` 자식이 HTTP 4xx 로 거절되면 **3초 뒤 1회만** 다시 E6(화면 `terminalSale.ts` 의 recovering 단계 안에서). 두 번째도 거절이면 지금처럼 `unknown`.
- `unknown` 화면에 §3-3 의 **«안전 취소(이 시도를 단말기에서 취소)»** 버튼을 더한다 — 규격 3.2.2 가 정한 **Direct 호환 복구**: Sale 응답을 못 받으면 ECR 송장으로 Void 한다. 결과가 00 이면 «결제가 됐었고 지금 취소됐습니다 → 다시 시도», C3 면 «단말기에 이 결제 기록이 없습니다 = 청구 안 됨 → 다시 시도», C5 면 «이미 취소돼 있습니다». 어느 쪽이든 손님이 이중 청구될 길이 없다. «영수증 보고 기록(수동)» 버튼은 그대로 둔다(영수증에 APPROVED 가 있고 그 결제를 살리고 싶을 때).

---

## 3. 결정 ② — Void(A2)

### 3-1. 어디서 누르는가 (갈림 → 결정)

| 후보 | 결정 | 이유 |
|---|---|---|
| **주문 취소 흐름**(LiveOrders `confirmCancelOrder` · FloorPlan `performCancelOrder`) | **주 진입점 (A-1)** | 우리 POS 의 «돈 되돌림» 모델은 **주문 취소** 하나다(환불/결제 역전 모델 없음 — `order_payments` 는 append-only, 보고·마감(`cash-management.js:71,119,332`)·몰보고(`mallSalesService.js:155`)는 **주문 status=cancelled 로 제외**). 카드 Void 는 «현금을 손님에게 돌려주는 동작» 의 카드판이므로 **취소에 붙이는 게 정석**이고 원장 구조를 안 건드린다. Irene 의 실제 동작(「걸은 거 다시 취소」)과도 일치. |
| 결제창 패널 — 이중승인(`DOUBLE_APPROVAL`) | **보조 (A-2)** | 10-01 게이트 R2 때 이미 «Void 가 들어오면 이 경고가 버튼이 된다» 로 예고. 손님이 두 번 긁힌 상황을 캐셔가 그 자리에서 푼다. |
| 결제창 패널 — 결과 미확인(`unknown`) «안전 취소» | **보조 (A-3)** | §2-3. Direct 에서 E6 가 안 될 때의 유일한 확정 수단. |
| 결제 직후 패널 | 안 함 | 승인되면 모달이 바로 닫히고 주문이 생긴다 → 취소는 A-1 로 간다. |
| 주문·결제 내역의 결제 1건 단위 Void(분할 결제 중 하나만) | **이번엔 안 함** | 주문은 살리고 결제 1건만 되돌리는 건 **새 원장 개념(결제 역전)** 이다. `order_payments` 에 상태 칸이 없고, 음수 행은 건수·영수증을 흐린다. 돈 모델 변경 = 별도 Fable 설계. 지금 캐셔 대안: 주문 취소(전체 Void) 뒤 다시 받기. |
| 설정 화면의 거래 목록 Void | 안 함 | 거래 목록 화면이 없다(`GET /api/terminal/transactions` 는 소비자 0). 새 화면을 지금 만들지 않는다. |

### 3-2. 서버 (`routes/terminal-payments.js` · `services/terminalPayments.js`)

**`POST /api/terminal/transactions/:id/void`** body `{ void_pin? }` → 201 `{ data: job }` (Sale 과 같은 «요청 hex 묶음»; 화면은 같은 `roundTrip` 으로 브릿지 왕복 후 `/:id/response` 에 올린다 — 즉 **자식 행 1개**, 기존 흐름 재사용).

- `createVoid(parent, { user, voidPin })`
  - 허용 부모: `command='sale'` 이고 status ∈ `approved | manual | timeout | comm_error | recovering | not_found`. (`pending` 은 Check Status 흐름에 맡김 · `declined/cancelled` 는 취소할 게 없음 → 409 BAD_STATE · `voided` → 409 ALREADY_VOIDED.)
  - 요청 프레임: `ecr.voidRequest({ amount: parent.amount, ecrInvoiceNo: parent.ecr_invoice_no })` — **C013 ECR 송장**(GHL 테스트 1.2·2.2·3.2·4.2 가 «Void(ECR Invoice Num)» 을 요구). 실측: 우리 빌더에 `ackIndicator:0x10` 을 주면 규격 샘플 9.7 요청과 **바이트·CRC(9622)까지 동일** — 프레임 계약 jest 로 고정(§7-1).
  - **권한 — «기록된 결제인가» 로 갈린다**(서버가 계산, 화면 주장 안 믿음):
    - `counted` = 부모가 approved|manual **이고** (`order_payment_id` 가 있거나, `orders.transaction_id === transactionRef(parent)`) — 즉 매출에 잡혀 있는 결제. → `userCanVoid(req.user)`(access_void) **그리고** `enforceVoidPin(restaurant, void_pin)` (주문 취소와 동일 게이트 · 코드 그대로 재사용, `utils/voidPinGuard.js`). 실패 시 그 응답(400 VOID_PIN_REQUIRED / 403 등) 그대로.
    - 아니면(고아 승인 = 이중승인·주문 없는 승인·결과 미확인 시도) → 라우터 공통 `requirePaymentAccess` 만. 이유: 매출 기록을 바꾸지 않고 **손님 보호**만 하는 동작이라 PIN 으로 늦출 이유가 없다.
  - 자식 행: `command='void'`, `parent_id`, 금액·송장은 부모 것, `status='sent'`. 감사: `logActivity(entity_type:'terminal_void', changes:{ parent_id, counted, approver })`.
- `applyResponse` 의 자식 `void` 결과 → **부모 전이(이 파일 한 곳)**
  | 자식 응답 | 자식 status | 부모 |
  |---|---|---|
  | 00 | approved | **`voided`** · `status_message 'Voided via POS'` · 응답의 카드 필드가 비어 있던 부모(미확인 시도)면 `pick(result)` 로 채움(감사) |
  | C5 Transaction already voided | declined(C5) | **`voided`**(멱등 — 단말기 메뉴에서 먼저 취소했거나 Void 재시도) |
  | C3 No transaction found | not_found(C3) | 부모가 approved|manual 이면 **불변** + 화면 «단말기에 기록이 없습니다(정산이 끝났으면 단말기에서 Refund)» · 부모가 미확인(timeout/comm_error/recovering/not_found)이면 **`declined`**(C3, «단말기에 이 결제가 없음 = 청구 안 됨») |
  | 그 외(01~99·C9…) | declined | 불변 + 문구(코드) |
  | 응답 없음/HTTP 거절 | timeout/comm_error | 불변 — **복구 = Void 재시도**(갔으면 C5 가 돌아온다). E6 안 쓴다 |
  - 금액 대조·송장 대조·CRC 는 기존 5겹 그대로 적용된다(`CMD_OF.void` 이미 있음).
  - `voided` 는 `createSale` 의 ALREADY_APPROVED 합·`link` 의 DOUBLE_APPROVAL 합에서 **자동 제외**(둘 다 `['approved','manual']` 만 집계) — 변경 0.
- `GET /api/terminal/transactions` 에 **`order_id` 필터 1개 추가**(기존 `restaurant_id` 접근판정 뒤) — 취소 흐름이 «이 주문에 단말기 승인이 있나» 를 묻는 데 쓴다.
- 🔒 **`routes/orders-crud.js` 무접촉.** 따라서 서버는 «Void 안 된 승인이 있는 주문의 취소» 를 막지 않는다 — **알려진 틈**(오늘과 동일: 손님만 과청구 → 매장 손실 아님). 다음에 orders-crud 가 정식 변경될 때 `PATCH status=cancelled` 에 «approved 단말기 승인이 남아 있으면 409 TERMINAL_VOID_REQUIRED(브릿지 없는 기기는 `terminal_voided_outside:true` 로 통과)» 를 넣는다. 지금은 문서에만.

### 3-3. 화면

**A-1 주문 취소 흐름** — 공용 `utils/terminalVoid.ts` 하나, 두 페이지가 부른다.
- `voidTerminalForOrder({ restaurantId, orderId, voidPin }) → { kind: 'none' | 'voided' | 'no-bridge' | 'failed' | 'unknown', amount?, message? }`
  1. `GET /api/terminal/transactions?restaurant_id&order_id&status=approved,manual` → 0건이면 `none`(오늘과 완전히 같은 취소).
  2. 브릿지 없음(`getEcrBridge()==null`) 또는 오프라인 → `no-bridge`(취소는 진행 — **오늘 동작 유지** — 토스트 «카드 RM X 는 여기서 취소되지 않았습니다. 단말기에서 Void 하세요.»).
  3. 승인 행마다(보통 1) `POST /void` → `roundTrip`(terminalSale.ts 의 것을 export) → 부모 상태 확인. 00/C5 → 계속. 실패(declined/not_found) → `failed` + 문구 → **주문 취소를 진행하지 않는다**(토스트 에러, 주문 그대로). 응답 없음 → `unknown` → 토스트 «단말기 응답이 없습니다. 단말기 화면을 확인하고 취소를 다시 누르세요(이미 취소됐으면 그대로 이어집니다).» → 취소 진행 안 함.
- LiveOrders `confirmCancelOrder` / FloorPlan `performCancelOrder`: 사유·PIN 을 받은 **직후, PATCH 전에** 한 번 호출. `voided|none|no-bridge` 만 PATCH 로 진행. **낙관적 취소(`patchOrderLocal`)는 Void 가 끝난 뒤로 옮긴다**(LiveOrders 는 지금 fetch 전에 cancelled 로 그려 둠 — Void 실패 시 되돌릴 일을 만들지 않기 위해). 그 뒤 취소표 인쇄 코드는 **한 글자도 안 바꾼다**(🔒 billPrint 호출부 — 인쇄 무관 삽입만).
- 취소 확인 모달(LiveOrders `CommonModal` 'Cancel Order' · FloorPlan 사유 모달)에 **정보 1줄**: «이 주문의 카드 결제 RM X 도 단말기에서 함께 취소됩니다.» (모달 열 때 1 조회) — 캐셔가 뭐가 일어날지 알고 누르게.
- 진행 표시: 모달 버튼 비활성 + 문구 «단말기에서 카드 결제를 취소하는 중…»(최대 120초, 단말기 응답 대기). 브릿지 호출 중 모달 닫기 금지(PaymentModal 과 같은 규칙).
- 오프라인 FloorPlan 분기(`recordOfflineOp('cancel_order')`)는 **무접촉** — 오프라인은 서버가 없어 프레임을 못 만든다 → `no-bridge` 토스트와 같은 문구만 추가.

**A-2 결제창 이중승인** — `PaymentModal.runTerminal`: `DOUBLE_APPROVAL` 분기에서 `txnId: out.txn.id` 를 issue 에 싣는다(지금 `undefined`). `TerminalPanel` `issue.kind==='error' && issue.txnId` 이면 버튼 «이 결제를 단말기에서 취소» → `voidTerminalTxn(txnId)`(고아 → PIN 없음) → 성공 시 패널 «취소됐습니다. 손님 카드에는 한 번만 청구됩니다.» + Confirm 잠김 유지(결제는 이미 첫 승인으로 기록돼 있다).

**A-3 결제창 결과 미확인** — `issue.kind==='unknown' && issue.txnId` 패널에 버튼 «이 시도를 단말기에서 취소(안전)» 추가(기존 «다시 시도»·«영수증 보고 기록» 옆). 결과 문구 §2-3. 00/C5/C3 뒤엔 «다시 시도» 가 새 Sale 을 만든다(부모가 voided/declined 라 ALREADY_APPROVED 에 안 걸림).

i18n: `pos.json` 4개 언어 — `cardTerminal.void.*`(버튼·진행·결과 6개) · `cardTerminal.reason.{bankTimeout,hostComm,terminalBusy,cardTimeout,cancelledOnTerminal,notSupported,voidNotFound,voidAlready}` · `orders.json` 취소 모달 1줄. `npm run i18n:verify`.

### 3-4. 결제 대기 중 취소 (C1 Cancellation) — 보류
규격 6.1 명령표에 `C1 Cancellation` 만 있고 요청/응답 절·샘플이 없다. 프레임을 추측해 보내면 Direct 가 D3 Invalid command 를 내거나(최선) 진행 중 거래를 어지럽힌다(최악). **GHL 회신 전 구현 금지.** 화면은 지금처럼 «취소는 단말기의 Cancel 키». 질문은 §8.

---

## 4. 범위 밖 · 손대지 않는 것
- 🔒 인쇄 보호파일 8개(특히 `orders-crud.js`, `POSTerminalPage.tsx`) · KDS 단계 로직 — **무접촉**. A-1 삽입 지점은 LiveOrdersPage/TableDetailPanel 의 `fetch PATCH` **앞**이며 그 뒤 취소표 코드는 그대로.
- `order_payments` 구조 · `orderPaymentLedger.js` · `mallSalesService.js` · 마감 집계 — 변경 0(cancelled 제외 규칙이 이미 Void 뒤 돈을 맞춘다).
- Settlement(A3) · 마감 카드금액 자동입력 · DuitNow(C01A) · D007 Account Type(직불) · Refund(B1, 정산 뒤) — 다음 단계. **직불 첫 테스트는 여전히 피한다**(D007 없음 → 거절 가능).
- 앱 APK · 데스크탑 설치본 — 재빌드 없음.
- 같은 묶음에서 팀원이 진행 중인 직원 발주 화면(App.tsx PO 라우트 · requireBuyerRole) — 파일 겹침 0, 서로 기다리지 않는다. 단 **SW 버전은 두 작업 프론트 변경이 다 끝난 뒤 마지막 1회**(빌드 1회·sweep 1회 규칙).

---

## 5. 파일별 변경 (예상 크기)

| 파일 | 변경 | 크기 |
|---|---|---|
| `dev-backend/utils/ghlEcr.js` | `classifyStatus` B0·CA → declined · `parseHttpRaw(rawHex)` 신설 · STATUS_TEXT 그대로 | ~25줄 |
| `dev-backend/services/terminalPayments.js` | `createVoid`(counted 계산·권한·PIN) · `applyResponse` 의 void 자식→부모 전이 · `!response_hex` 분기에 HTTP 해석(4xx sale→declined · 그 외 comm_error · status_message) · `recover` 허용상태 그대로 | ~80줄 |
| `dev-backend/routes/terminal-payments.js` | `POST /transactions/:id/void` · `GET /transactions` `order_id` 필터 · 감사 로그 | ~30줄 |
| `dev-backend/scripts/mock-ghl-terminal.js` | 시나리오 `bank-timeout`(B0 + 카드 태그, 승인번호 없음) · `busy`(HTTP 400 본문 BUSY) · void 분기는 이미 있음(00/C3/C5) — `void-notfound` 강제 시나리오만 추가 | ~20줄 |
| `dev-frontend/src/utils/terminalSale.ts` | `roundTrip` export · `voidTerminalTxn(txnId, voidPin?)` · recovering 단계 E6 4xx 거절 시 3초 뒤 1회 재시도 · 결과 문구 키 | ~40줄 |
| `dev-frontend/src/utils/terminalVoid.ts` **신설** | `voidTerminalForOrder` (§3-3) | ~60줄 |
| `dev-frontend/src/components/POSTerminal/TerminalPanel.tsx` | unknown 에 «안전 취소» 버튼 · error+txnId 에 «이 결제 취소» 버튼 · 결과 문구 | ~30줄 |
| `dev-frontend/src/components/POSTerminal/PaymentModal.tsx` | DOUBLE_APPROVAL 에 txnId 전달 · 두 버튼 핸들러(void → 패널 갱신) | ~30줄 |
| `dev-frontend/src/pages/LiveOrders/LiveOrdersPage.tsx` | `confirmCancelOrder` 에 void 1단계 삽입(PATCH 앞) · 낙관적 취소 이동 · 모달 정보 1줄 | ~30줄 |
| `dev-frontend/src/pages/FloorPlan/TableDetailPanel.tsx` | `performCancelOrder` 온라인 분기에 같은 삽입 · 사유 모달 정보 1줄 | ~25줄 |
| `dev-frontend/public/locales/{en,ko,zh,ms}/pos.json`, `orders.json` | 키 추가 | 4×~16키 |
| `dev-backend/tests/ghl-ecr.test.js` · `scripts/health-check.js` · `dev-frontend/e2e/card-terminal.spec.js` | §7 | — |
| `docs/CARD_TERMINAL_ECR_DESIGN.md` | §3 상태기계에 void 전이·B0/CA/HTTP 분류 · §5 «남은 것» 갱신 · C1 보류 사유 | ~25줄 |

---

## 6. 상태기계 (갱신본 — 문서 §3 에 이 그림으로 교체)

```
created ─send─▶ sent ─00─▶ approved ─link─▶ order … ─(주문 취소 흐름 / 이중승인 버튼) A2─▶ voided
                 │─01~99/C0/C1/C4/C7…─▶ declined|cancelled        ▲ 00 또는 C5(이미 취소)
                 │─B0/CA(단말기가 답함)─▶ declined   ◀── 이번 변경   │
                 │─HTTP 4xx 거절(처리 전)─▶ declined «terminalBusy» │
                 │─EA─▶ pending ─E3 반복─▶ approved | declined       │
                 │─응답 없음/깨짐/HTTP 5xx─▶ timeout|comm_error ─E6(4xx 거절이면 3초 뒤 1회 더)─▶ approved(복구) | not_found
                                             │                    └─A2 «안전 취소»─▶ voided(00/C5) | declined(C3 = 기록 없음)
                                             └─캐셔 사유·수단 입력─▶ manual ─(취소 흐름) A2─▶ voided
void 자식: sent ─00─▶ approved(부모 voided) · C5 → declined(부모 voided) · C3 → not_found · 그 외 declined · 무응답 → timeout(부모 불변, 재시도=Void 다시)
```

---

## 7. 검증 기준 (팀원 실행 · Fable 게이트 판정 1회)

### 7-1. 계약 (jest `tests/ghl-ecr.test.js`)
- Void 요청 프레임: `voidRequest({amount:'10.00', ecrInvoiceNo:'ECR-202502060934'})` 에 ack 0x10 → 규격 샘플 9.7 요청 hex **바이트 동일**(CRC 9622). (내가 실측 완료 — 테스트로 고정.)
- `classifyStatus(sale,'B0')==='declined'` · `'CA'→'declined'` · `'C7'→'cancelled'` · `'EA'→'pending'`(불변 확인).
- `parseHttpRaw`: 운영 tx30 꼴(`HTTP/1.1 400 Bad Request … Content-Length: 4 … BUSY`) → `{status:400, body:'BUSY'}` · 상태줄 없음 → null · 본문이 hex 프레임이면 null(응답으로 취급 안 함).

### 7-2. health-check `--category=terminal` (신규 4건, 운영 무영향·데모 매장)
1. **Void 정식**: 주문 있는 Sale 승인(link 됨=counted) → `/void` 를 access_void 없는 계정 → 403 · requireVoidPin 매장 흉내(fixture 에서 operation_settings 토글 후 원복) 로 void_pin 없음 → 400 VOID_PIN_REQUIRED · 정상 → 201 → 목 응답 00 → 자식 approved · **부모 voided** · 같은 주문 새 Sale 생성 시 ALREADY_APPROVED **안 걸림**(voided 제외 증명).
2. **멱등 C5**: 다시 `/void` → 목 C5 → 부모 voided 유지 · 자식 declined(C5). 그리고 `voided` 부모에 `/void` → 409 ALREADY_VOIDED.
3. **고아 승인 PIN 면제 + 미확인 안전취소**: 주문 없는 Sale 승인 → `/void` void_pin 없이 201(counted=false) · timeout 부모에 `/void` → 목 C3 → 부모 **declined**(C3) · approved 부모에 C3 → 부모 **불변**.
4. **B0·BUSY 분류**: 목 `bank-timeout` → 부모 declined(B0) · `/recover` 호출 → 409 BAD_STATE(declined 는 복구 대상 아님 = Reprint 0회 증명) · `/response {error:'BAD_RESPONSE', raw_hex:<HTTP 400 BUSY>}` sale 행 → declined · status_message `HTTP 400 BUSY` · reprint 자식에 같은 raw → comm_error.
- 기존 8건 전부 유지(특히 timeout→Reprint 복구는 `TIMEOUT` 경로라 영향 없음을 확인).

### 7-3. e2e `card-terminal.spec.js` (목 브릿지, 데모 38)
- **J** 결제완료 주문 → LiveOrders 취소(사유) → 단말기로 `A2` 1회 전송 확인(`state.calls`) → 주문 cancelled · 부모 voided.
- **K** Void 목 응답 무응답 → 주문 **취소되지 않음**(status 그대로) · 토스트 · 다시 취소 → 목 C5 → 취소 완료.
- **L** `bank-timeout` → 모달 유지 · 문구 «은행이 응답하지 않아…» · `state.calls` 에 `E6` **0회** · 원장 0.
- **M** 이중승인(H 시나리오 변형) → 패널 «이 결제 취소» → `A2` → 문구 · 원장은 첫 승인 1건.
- 3회 연속 100%.
- 프론트 변경 전부 확정 후 **빌드 1회 → `verify-all --full` 1회**(발주 화면 작업과 합쳐서). SW bump 는 맨 끝.

### 7-4. 고장주입 (각 1회, 반증 없는 통과는 통과 아님)
- `applyResponse` C5→voided 매핑 제거 → 7-2 ② 실패 확인 → 원복.
- `createVoid` 의 counted PIN 게이트 제거 → 7-2 ① 400 기대 케이스 실패 → 원복(pm2 restart 뒤 주입·원복 보고에 재시작 여부).
- `classifyStatus` B0 되돌림 → 7-2 ④ 실패.
- 프론트: `voidTerminalForOrder` 결과 무시하고 PATCH 진행하게 바꿈 → e2e K 실패(빌드가 필요하니 **프론트 주입은 다른 프론트 변경과 같은 빌드 안에서 몰아서**).

### 7-5. 운영 첫 실측 절차 (배포 뒤 · Irene 눈 · 매장 13)
① 단말기 **자체 메뉴**에서 RM1 판매 1회 → 승인되면 은행 연결 OK / time-out 이면 GHL 에 TID 활성·네트워크 문의(POS 무관).
② ①이 OK 일 때만: POS Sale RM1(신용카드 또는 TnG QR) → 승인 → LiveOrders 에서 그 주문 취소 → 단말기가 Void 영수증 출력 · 주문 cancelled · `terminal_transactions` 부모 voided 확인(읽기).
③ **BUSY 반증**: 단말기 메뉴 화면을 열어 둔 채 POS Sale RM1 → 화면 «단말기가 바빠서…» → 단말기 배치/영수증에 거래 **0** 확인. 거래가 있으면 §2-2 규칙을 즉시 `comm_error` 로 되돌린다(1줄).
④ 같은 주문 취소를 **두 번**(두 번째는 C5 멱등) — 단말기 영수증 1장만.

---

## 8. GHL 에 보낼 질문 (Irene 발송 · 사실만)
1. **PayHere Direct 에서 Reprint(E6)·Check Status(E3) 지원 여부.** 2026-10-04 15:32:09 E6 요청에 단말기가 `HTTP 400` 본문 `BUSY` 로 응답했다(요청 hex 첨부). 미지원이면 Direct 의 «응답 분실 복구» 권장 절차는 무엇인가(규격 3.2.2 의 ECR 송장 Void 가 맞는가).
2. **Cancellation(C1)** 의 요청/응답 정의 — 6.1 표에만 있고 5.x 절이 없다. POS 에서 진행 중 거래를 취소할 수 있는가.
3. **HTTP 거절의 의미**: `400 BUSY` 외에 어떤 상태코드/본문이 있는가, 거절된 요청은 단말기에서 처리되지 않은 것으로 확정해도 되는가.
4. **B0 Bank timed out** 뒤 단말기가 자동 reversal 을 하는가(손님 카드 보류 해제) — 15:31:46 RM1.06 VISA Wave 건.
5. TID/MID(응답 C002/C003 값 첨부)가 **라이브(활성)** 인지 · 단말기 호스트 연결 방식(와이파이/SIM) 점검 요청.
6. (기존) D007 Account Type 직불 필수 여부 · DuitNow Product ID.

---

## 9. 팀원 실행 순서
1. 서버 3파일(§5) → `jest tests/ghl-ecr.test.js` → 목 시나리오 → `health-check --category=terminal`(기존 8 + 신규 4) → 서버 고장주입 3건.
2. 프론트 6파일 + i18n → 발주 화면 작업과 **같은 빌드 1회** → `verify-all --full` 1회 → e2e J·K·L·M ×3.
3. `docs/CARD_TERMINAL_ECR_DESIGN.md` 갱신 · releases JSON · `check-sensitive-diff`(돈 경계 = 게이트 대상 예상) → **Fable 게이트 1회** 제출(이 문서 §7 체크리스트에 결과를 붙여서).
4. 배포는 Irene `/배포`. 배포 뒤 §7-5 ①~④ 는 Irene 눈 확인 + 팀원 운영 읽기.
5. §8 질문은 Irene 에게 전달용 — 발송은 Irene.
