# [Fable 판정] GHL(NTT DATA Payment) 카드단말기 ECR 자동연동 — 설계 1회차 (2026-10-01)

> Irene 원문(2026-10-01): **「응. 진행해줘. 이거 하고 나면 우리 카드머신 자동연동 해야 하거든. 빨리 좀 해봐. 중요한 거 아닌거 있어? 엄청 오래 걸리는 거 있으면 상의주고」** · 결제사 **「GHL」** · **「내가 정보 줄거야」** · Dropbox **「여기 파일들 체크해봐」**
> Irene 원문(2026-09-08, 다른 세션): **「결제를 태블릿에서 터치하는 것까지 된다고 해서. 완전 심플 사용 포스 판매로 집중할거야.」**
> 작성: Fable 5.1 · 코드 수정 0 · 운영은 읽기만. 구현은 팀원(Opus).
> ⚠ GHL 규격서(«strictly private and confidential»)는 저장소에 복사·커밋하지 않는다. 이 문서는 구현에 필요한 사실만 인용한다. 규격서 원본은 Irene 로컬/스크래치에만 둔다.

---

## 0. 호출 조건 판정

- A 파급: **돈**(카드 수납 기록이 단말기 승인과 어긋나면 매출·마감·회계가 틀어진다) · 매장 영업(결제 화면).
- B 가역성: 신규 테이블·마이그·네이티브앱 재배포·GHL 인증(외부 일정) — 되돌리기 어렵다.
- C 갈림: ① 단말기와 **누가** 통신하나(브라우저 직결 / 네이티브앱 브릿지 / QZ 소켓 / 서버 중계) ② 프로토콜 코덱을 **어디** 두나(프론트/백엔드) ③ 승인 결과를 🔒 POS 주문 생성 경로에 **어떻게 연결**하나 ④ 범위(판매만 / 취소·정산까지 / 인증 시나리오 전부) — 네 갈래 모두 실제로 갈린다.
→ **호출 조건 성립.** 이 문서가 1회차(설계). 2회차(게이트)는 구현 완료 뒤 1회.

---

## 1. 실측으로 확정한 사실

### 1-1. 규격서(v2.9.26, 2026-02-24)에서 구현에 필요한 것만
- **프레임**: `STX(02) · Seq(N2, 기본 00) · Source(B2) · Dest(B2) · Command(B1) · [요청: ACK표시 B1 / 응답: Status B1] · DataLen(B2, 태그부터 CRC 전까지) · TLV… · CRC(B2) · ETX(03)`. TLV = Tag 2바이트 + Len 2바이트 + Value.
- **주소**: ECR = `0C01`, 단말기 = `0B01` (요청 Source 0C01→Dest 0B01, 응답은 반대).
- **CRC**: 규격 C코드 = CRC-16(폴리 0xA001 reflected, init 0) = **CRC-16/ARC**, 결과를 **상위바이트 먼저** 싣는다. 대상 = STX 다음 바이트부터 CRC 직전까지. **내가 노드로 검증** — Echo 요청 `02000C010B01C3100000AF1103`(CRC AF11) · Echo 응답 `02000B010C01C30000003B5003`(3B50) · Sale ACK `02000B010C01A1000000834F03`(834F) 3개 모두 ARC 로 정확히 일치. (텍스트 변환본 `ecr.txt` 의 Sale 요청 샘플은 줄바꿈 추출이 깨져 있어 **벡터로 쓰지 말 것** — 필요하면 PDF 70쪽을 다시 추출.)
- **명령 ID**: Sale `A1` · Void `A2` · Settlement(card) `A3` · Refund `B1` · Cancellation `C1` · Echo `C3` · Get Last Settlement `C5` · Check Status `E3` · Preauth `E4` · Sale Completion `E5` · Reprint `E6`.
- **ACK 표시**: 요청 바이트 `0x10` = ACK 요구(단말기가 ACK 프레임을 먼저 보내고 결과 프레임을 나중에 보냄), `0x00` = ACK 없음(결과 프레임 1개). **우리는 `0x00`** — GHL 캡처(Postman)도 00 이고, HTTP 1요청=1응답 구조에 맞는다.
- **Sale 요청 태그**: `C001` 금액(N12 = BCD 6바이트, 센트 단위; RM 12.34 → `000000001234`) **필수** · `C013` ECR 송장번호(AN..40, **단말기 무응답 때 Void/Reprint 로 되찾는 열쇠** — 반드시 보낸다) · `C012` 캐셔 ID(선택) · `D003` 결제종류(선택).
- **Sale 응답 태그(저장 대상)**: `C001` 금액 · `C004` 단말기 송장번호 · `C005` 배치번호 · `C006` 거래일시(MMDDhhmmss) · `C007` 마스킹 PAN · `C00A` 승인번호 · `C00B` RRN · `C002` TID · `C003` MID · `D002` 카드종류(Payhere ECR 은 ASCII 2자 "04" 식) · `D018` 브랜드 문자열(VISA/MASTER/MYDEBIT…) · `D008`/`D01A` 입력방식 · `D017` 거래참조번호 · `D019` 화면표시 문구 · `C010`/`C017` CVM 문구.
- **Status(응답 6번째 바이트)**: `00` 승인 · `01~99` 호스트 거절(DE39) · `B0` 은행 타임아웃 · `C0` 단말기 타임아웃(카드 안 댐) · `C1` 카드 미지원 · `C3` 거래 없음/송장 무효 · `C4` EMV 거절 · `C5` 이미 취소됨 · `C7` 거래 취소 · `CA` 통신오류 · `D1` CRC 실패 · `D2` 형식오류 · `D5` 태그 누락 · `EA` **거래 보류(Pending) → Check Status(E3) 반복 필수** · `EF` 용지 없음.
- **카드종류(D002)**: 04 VISA · 05 MasterCard · 06 Diners · 07 Amex · 08 JCB · 09 MyDebit · 10 CUP · 11 TnG · 12 NETS · 19 eWallet.
- **Void(A2)**: `C001` 금액 필수 + `C004`(단말기 송장) 또는 `C013`(ECR 송장) 또는 `D017` 중 하나. 응답은 Sale 과 같은 꼴.
- **Reprint(E6)**: `C001` 금액 + `C013` ECR 송장 → 마지막 거래 결과를 다시 받는다. GHL 테스트 스크립트가 **«Sale 보냈는데 120초 타임아웃/통신 끊김인데 단말기는 성공» 복구 수단으로 지정**한 명령.
- **Check Status(E3, Payhere ECR 전용)**: Sale 응답이 `EA` 면 호출. 응답 Status `00` 이고 `C01B` 원래응답코드가 `"00"` 이면 성공, `"EA"` 면 계속, 그 외면 실패.
- **Settlement(A3)**: TID/MID 없이 보내면 전체 배치 정산. 응답에 배치별 Host·건수·금액(`D010~D013`). Get Last Settlement(C5) 로 마지막 정산 재조회.
- **타임아웃**: 테스트 스크립트 **«POS Timeout: MUST set 120 seconds»**. 단말기 쪽 카드 대기 60초(C0).
- **물리 연결**: 규격 §8 «RS232, IP or USB». 우리 대상은 **IP(TCP/IP)** — GHL 그림(POS·단말기 같은 라우터 192.168.2.x, 단말기 192.168.2.99)과 테스트 스크립트 제목 «TCPIP/Local ECR Test Script» 가 그렇다.
- **전송 형식(가장 중요한 미확정)**: GHL Postman 캡처 = **`POST http://10.222.46.15:33898`, 본문 raw 텍스트 = 프레임 전체를 ASCII-hex 로 쓴 문자열**(`02000C010B01E600001B…03`, 디코드하면 Reprint E6 · 금액 0.15 · ECR 송장 "10011" · 태그 C01A 상품ID). 즉 단말기(Payhere 앱)가 **포트 33898 에 HTTP 서버**를 열고 hex 문자열을 받는 것으로 보인다. 응답도 hex 문자열로 돌아올 가능성이 크지만 **캡처에 응답이 없다** → Phase 0 실측 항목.
- **«PayHereDirect»**: 테스트 스크립트 Vendor 칸의 예시값. 규격서에는 «Payhere Direct» 와 «Payhere ECR» 두 프로파일이 있고 태그 길이·적용 명령이 조금 다르다(예: D002 가 Direct=바이너리 1바이트 / ECR=ASCII 2~3자, Check Status·Print Day Total 은 ECR 전용, Notify·Read Card 는 Direct 전용). **우리 단말기가 어느 프로파일인지 GHL 확인 필요** — 파서는 두 길이를 모두 받게 짠다(아래 §3-2).
- **인증 시나리오(테스트 스크립트)**: Visa/Master/MyDebit/eWallet(QR)/DuitNow QR 각 Sale 1.00 + Void(ECR 송장) · 단말기 Cancel→C7 · 카드 미지원→C1 · 60초 미결제→타임아웃 · 이미 취소된 거래 재취소 · DuitNow 조회(60초) · Auth&Completion(D017 만) · Reprint 복구 · Settlement. 결과 칸 = 단말기 송장·ECR 송장·거래참조. «Approved By (GHL)» 서명란 = **GHL 인증(사인오프) 체크리스트**다.

### 1-2. 현재 코드(팀원 조사 + 내가 보탠 것)
- 단말기 연동 코드 0. 카드 = 캐셔가 «Card» 누르면 기록만. `OrderPayment`(order_payments)에 `transaction_id STRING(255)` 칸이 **이미 있고**(Stripe/PayPal 용으로 비어 있음) `Order` 에도 `transaction_id` 가 있다. 승인번호·TID·끝4자리 전용 칸은 없다.
- **결제 완료 경로 3개와 보호 여부**:
  | 경로 | 호출 | 파일 보호 | 원장(order_payments) |
  |---|---|---|---|
  | POS 신규주문 | `PaymentModal.onConfirmPayment` → 🔒`POSTerminalPage.handleConfirmPayment`(:2663) → **`OrderContext.addOrder`(비보호, :144)** → `POST /api/orders`(🔒 orders-crud) `payment_status:'completed'` | 중간 1곳만 비보호 | 생성 시 원장 행 **없음**(ledger 는 PATCH 전이에서만) |
  | FloorPlan/LiveOrders 전액 | `PaymentModal` → `PATCH /api/orders/:id`(🔒 orders-crud :1030) → `recordOrderPayment`(비보호 `utils/orderPaymentLedger.js`) | 라우트 🔒, 원장 유틸 비보호 | 행 1 (`transaction_id: ctx.transactionId || order.transaction_id`) |
  | 분할/부분 | `PaymentModal.handleSplitConfirm` → `POST /api/orders/:id/payments`(비보호 `orders-payment.js:399`) | **비보호** | 행 1, `transaction_id` 저장함 |
- `PaymentModal`(비보호)은 세 화면 공용이고 `orderId`(FloorPlan/LiveOrders 는 넘김, POS 는 없음)·`restaurantId`·`cashierName` 을 받는다. 🔒 POSTerminalPage·orders-crud 를 **한 줄도 건드리지 않고** 연동할 수 있는 길이 있다(§2-3).
- **브라우저는 단말기와 직접 못 말한다(구조 결정 사실)**: 운영 POS = `https://purplehere.com`(HTTPS). HTTPS 페이지에서 `http://192.168.2.99:33898` 로 fetch 하면 Chrome 이 **혼합 콘텐츠로 차단**한다. (Chrome 138+ 의 Local Network Access + `targetAddressSpace` 옵션으로 열릴 수는 있으나 **단말기 응답에 CORS 헤더가 있어야 읽힌다** — GHL 단말기가 CORS 를 줄 가능성은 낮다. Phase 0 에서 1회 실측해 닫는다.)
- **네이티브 브릿지 토대는 둘 다 있다**: Windows `desktop-pos/`(Electron 31, 원격 URL 로드, `preload.js` 가 `window.__NATIVE_PRINT` 노출, main 에 `net.Socket`(rawLan.js)·IPC 패턴, 자동업데이트, 설치파일 `purplehere.com/desktop/`) · Android `mobile-app/`(Capacitor 6, `NativePrintPlugin.kt` 에 `java.net.Socket` TCP, `nativePrintBridge.js` 주입). **실사용 매장 0**(2026-07-27 실측: 운영 기기 17대 = web-rawbt 8 / web 5 / web-qz 4). 즉 지금 매장 계산대는 전부 **브라우저**다 → 단말기 연동 매장은 앱을 깔아야 한다.
- 마감(Cash-up): 카드 예상액은 원장 합, 실제액은 캐셔가 단말기 배치 정산서 보고 수기 입력(`docs/CASH_MANAGEMENT_SHIFT_CLOSE.md`).
- `check-sensitive-diff.js` 는 `routes/orders|payments…` 를 민감으로 본다. 새 라우트 `routes/terminal-payments.js` 는 정규식에 안 걸리지만 **돈 경로이므로 Fable 게이트 대상**(이 문서가 1회차).

### 1-3. Irene 가 아직 답하지 않은 것(팀원 보고)과 그 영향
범위 · 첫 매장 · 계산대 기기 · 단말기 모델/대수 · 9-08 «태블릿에서 터치» 의미 · GHL 샌드박스 TID/MID 발급 여부. 이 중 **계산대 기기**와 **GHL 샌드박스/테스트 단말기**가 일정을 좌우한다(§5).

---

## 2. 판정

### 2-0. 한 줄
**단말기 통신은 계산대 네이티브앱(Electron/Android) 브릿지가 «바이트 운반만» 하고, 프로토콜 코덱·판정·기록은 백엔드 한 곳이 한다. 승인(Status 00)이 아닌 결제는 절대 자동 기록하지 않으며, 응답을 못 받은 거래는 Reprint(E6) 로 되찾고, 그래도 모르면 캐셔가 «단말기 영수증 확인 후 수동 기록»(감사 표시) 으로만 닫는다. 🔒 보호파일 접촉 0.**

### 2-1. 갈림 ① 누가 단말기와 말하나 → **네이티브앱 브릿지 `window.__NATIVE_ECR`** (기각 3개)
- **브라우저 직결** — HTTPS→HTTP 혼합 콘텐츠 차단(§1-2). Chrome LNA+CORS 가 다 맞아야 하는데 단말기 쪽을 우리가 못 고친다. **기각(단, Phase 0 에서 curl 로 응답 헤더 1회 확인 — ACAO 가 있으면 재검토)**.
- **서버 중계** — 서버는 매장 LAN 에 못 들어간다. **기각.**
- **QZ Tray 소켓(`qz.socket`)** — 웹+QZ 매장(Win7 포함)에서 앱 없이 될 수도 있으나 QZ 버전 의존·응답 프레이밍 불확실·QZ 끊김 이력(16초 idle). **1순위 아님.** Win7 매장이 단말기 연동을 원할 때만 조사.
- **채택**: 인쇄에서 이미 검증한 «원격 웹번들 + 네이티브는 전송만» 모델(`docs/DESKTOP_APP_DESIGN.md` D1~D3)을 그대로 복제. 새 전역 `window.__NATIVE_ECR`(🔒 인쇄 계약 `__NATIVE_PRINT` 는 손대지 않는다). 브라우저(브릿지 없음)에서는 **오늘과 바이트 단위 동일 동작**(수동 기록) — 회귀 0.

### 2-2. 갈림 ② 코덱은 어디 → **백엔드 단일(`dev-backend/lib/ghlEcr.js`), 프론트는 프로토콜을 모른다**
- 프론트에 코덱을 두면 캐셔 기기가 «승인됐다» 고 주장하는 JSON 을 서버가 믿어야 한다. 백엔드가 **원본 응답 hex 를 받아 직접 파싱·CRC 검증·금액/송장 대조**하면 위조 기록이 막히고, 코덱이 한 곳이라 jest 로 규격 벡터 테스트가 게이트 안에 들어간다(`tests/ghl-ecr.test.js`, `order-totals.test.js` 패턴).
- 흐름: 서버가 요청 hex 를 만들어 주고 → 프론트가 브릿지로 보내고 → 받은 hex 를 그대로 서버에 올린다. 프론트 코드 = «보내고 받아 전달» 뿐.
- 대가: 오프라인 중엔 단말기 자동연동 불가(요청을 서버가 만든다). **허용** — 단말기 자체가 은행과 통신해야 하고, 오프라인은 오늘 경로(수동 기록, `recordOfflineOp('pay')`) 그대로.

### 2-3. 갈림 ③ 🔒 POS 생성 경로와의 연결 → **ECR 송장번호를 열쇠로 한 사후 link, 보호파일 무접촉**
- 승인 시점에 POS 신규주문은 **아직 없다**(주문은 `onConfirmPayment` 뒤에 생성). 그래서:
  1. `PaymentModal` 이 승인을 받으면 비보호 유틸 `utils/terminalPaymentLink.ts` 에 `{txnId, amount}` 를 «대기 연결» 로 둔 뒤 기존 `onConfirmPayment('card', …, 매핑된 cardType)` 을 그대로 부른다(🔒 POSTerminalPage 는 지금과 똑같이 받는다).
  2. **`OrderContext.addOrder`(비보호)** 가 `POST /api/orders` 성공 응답에서 서버 주문 id 를 얻는 지점에서, 대기 연결이 있고 `paymentMethod==='card'` 면 `POST /api/terminal/transactions/:id/link {order_id}` 를 부르고 대기를 비운다. 실패해도 주문은 막지 않는다(비치명, 서버에 «미연결 승인» 으로 남아 보고서에서 보임).
  3. FloorPlan/LiveOrders/분할 경로는 `orderId` 를 이미 알므로 **시작 시점에** `order_id` 를 넣는다. 분할 경로는 `body.transaction_id` 에 단말기 송장번호를 실어 `orders-payment.js` 가 저장한다(비보호).
- 서버 link 는 `terminal_transactions.order_id` + `orders.transaction_id` + (원장 행이 있으면) `order_payments.transaction_id` 를 채운다. 값 = `GHL:{단말기송장}:{승인번호}` 처럼 사람이 읽는 꼴.
- **진실의 원천은 `terminal_transactions` 표**(시도 1건 = 1행, 실패·취소·복구까지). 원장 `transaction_id` 는 색인용 복사.
- 기각: 금액·캐셔·시간으로 **추정 매칭**(두 POS 가 같은 금액을 동시에 받으면 틀린다) / `fetch` 가로채기(마법) / 🔒 파일 수정(절단면 승인+bless 왕복, «빨리» 와 반대).

### 2-4. 갈림 ④ 범위 → **1단계 = 판매 승인 자동 기록 + 미확정 복구 + 수동 폴백. 2단계 = 취소(Void)·정산(Settlement)·마감 자동입력·단말기 화면 QR(DuitNow·Product ID). 손님 QR(seamless, 지갑 앱 바코드)은 1단계(추가 판정 C-3).* Preauth/Completion 은 GHL 이 인증에 요구할 때만.**
- 1단계만으로 Irene 목적(«금액 보내고 결과 자동 기록»)이 닫히고, 테스트 스크립트의 Sale·Cancel(C7)·미지원(C1)·타임아웃·Reprint 가 증명된다.
- 2단계 Void/Settlement/Check Status(DuitNow) 는 **인증 체크리스트에 있으므로 GHL 사인오프 전에는 필요**하다. 코덱이 있으면 명령 하나당 반나절 안팎.
- Preauth(E4)/Completion(E5)·Read Card·Manual Inquiry·Print Day Total·NETS 는 식당 POS 에 불필요 — GHL 이 «필수» 라고 하면 그때 추가.

---

## 3. 절단면 (구현 범위 — 이 밖은 손대지 않는다)

### 3-1. 데이터 — 새 표 `terminal_transactions` (모델 `TerminalTransaction`, 마이그 `scripts/migrate-create-terminal-transactions.js` 멱등 + `migrations.registry.json` `deploy` 등록)
| 칸 | 뜻 |
|---|---|
| `id` PK · `restaurant_id` FK · `order_id` FK null · `order_payment_id` FK null · `parent_id` FK null(Void/Reprint/CheckStatus 가 가리키는 원 거래) | |
| `provider` ENUM('ghl_ecr') · `command` ENUM('sale','void','refund','reprint','check_status','settlement','echo') | expand-only 유틸 `expandEnum` 사용 |
| `ecr_invoice_no` VARCHAR(40) **UNIQUE** | 우리가 발급. 영숫자만(C013 은 AN). 형식 `PH{restaurant_id}A{id}` (id 는 행 PK → 전역 유일, ≤ 20자) |
| `amount` DECIMAL(10,2) · `currency` CHAR(3)='MYR' | |
| `status` ENUM('created','sent','approved','declined','cancelled','timeout','comm_error','recovering','not_found','voided','manual') · `status_code` CHAR(2) · `status_message` VARCHAR(200) | 상태기계 §3-4 |
| `request_hex` TEXT · `response_hex` TEXT | 감사·재파싱용 원본 |
| `terminal_invoice_no` · `terminal_batch_no` · `approval_code` · `rrn` · `masked_pan` · `card_type_code` · `card_brand`(D018) · `card_type`(우리 키 visa/master/amex/debit/other) · `entry_mode` · `terminal_id` · `merchant_id` · `txn_ref`(D017) · `txn_datetime` · `message_prompt` | 응답 파싱 결과 |
| `cashier_id` · `cashier_name` · `device_label` VARCHAR(80) | |
| `manual_override` BOOL · `manual_note` VARCHAR(300) | 수동 기록 폴백 감사 |
| `sent_at` · `responded_at` · 타임스탬프 | |
| 인덱스 `(restaurant_id, created_at)` · `(order_id)` · `(parent_id)` | |

- **기존 표 변경 0** — `order_payments.transaction_id`·`orders.transaction_id` 는 있는 칸을 쓴다.
- 매장 설정: `payment_settings.card.terminal = { enabled:false, provider:'ghl_ecr', host:'', port:33898, transport:'http-hex', profile:'payhere_ecr' }` — 기존 `Restaurant.js` getter 기본값에 **키만 추가**(없으면 미사용 = 전 매장 동작 변화 0). 저장은 기존 설정 라우트·RA 잠금 3개 그대로(`project_printer_settings_wipe_locks` 와 같은 모델). 2단계에서 기기별 단말기(POS 2대) 가 필요하면 `localStorage` 기기 덮어쓰기.

### 3-2. 백엔드 — `lib/ghlEcr.js`(순수 CommonJS, 의존 0) + `routes/terminal-payments.js` + `services/terminalPayments.js`
- 코덱: `crc16Arc(buf)` · `buildFrame({cmd, tags, ackIndicator:0x00, seq:'00'})` · `parseFrame(hex)`(STX/ETX/길이/CRC 검증, TLV 분해) · `encodeAmount(decimalString)`(센트 정수 문자열, 부동소수 금지) · `decodeAmount` · 태그 상수 · 상태코드 사전 · `mapCardType(d002, d018)`(D002 는 1바이트 바이너리와 ASCII 2~3자 **둘 다** 받는다 — Direct/ECR 프로파일 차이, D018 문자열이 있으면 우선) · 명령별 빌더 `sale/void/reprint/checkStatus/settlement/echo`.
- 라우트(전부 `authenticateToken` + `requirePaymentAccess` + 매장 소유 검사; `restaurant_id` 는 토큰 기준, 바디 값 신뢰 금지):
  | 메서드 | 경로 | 하는 일 |
  |---|---|---|
  | POST | `/api/terminal/transactions` `{order_id?, amount, kind:'sale'}` | 매장 설정 읽어 enabled 아니면 409. `order_id` 있으면 `amount ≤ 잔액` 검증. 행 생성(created) → ECR 송장 발급 → 요청 hex 생성 → `{id, ecr_invoice_no, request_hex, connection:{host,port,transport}, timeout_ms:120000}` |
  | POST | `/api/terminal/transactions/:id/response` `{response_hex}` 또는 `{error:'TIMEOUT'|'COMM_ERROR'|'BRIDGE_UNAVAILABLE'}` | 파싱·CRC·명령ID·**금액 일치·(있으면) ECR 송장 일치** 검증 → status 전이(§3-4). 승인이면 `order_id` 있을 때 link 수행. **멱등**: 이미 종결된 행에 두 번째 응답이 오면 상태 불변 + `deduped:true`. 반환 = 파싱 요약 |
  | POST | `/api/terminal/transactions/:id/recover` | 부모가 timeout/comm_error 일 때만. 자식 행(command reprint, parent_id) 생성 + Reprint 요청 hex 반환. 자식 응답이 승인이면 **부모를 approved(복구)** 로, C3 면 부모 `not_found`(=실패) |
  | POST | `/api/terminal/transactions/:id/check-status` | 부모가 `EA` 일 때만. 자식(check_status) + E3 요청 hex. 응답 규칙 §1-1 Check Status 4조 |
  | POST | `/api/terminal/transactions/:id/link` `{order_id}` | 승인 행에만. 같은 매장 주문인지 검사. `terminal_transactions.order_id` + `orders.transaction_id` + 원장 행 있으면 `order_payments.transaction_id` |
  | POST | `/api/terminal/transactions/:id/manual` `{note}` | timeout/comm_error/not_found 행만 → `manual`+`manual_override=true`. 감사로그 `terminal_manual_override` |
  | POST | `/api/terminal/echo` | 설정 화면 «연결 테스트» 용 Echo 요청 hex(응답은 `/response` 로 같은 경로) |
  | GET | `/api/terminal/transactions?restaurant_id&from&to&status` | 보고서·마감용 목록 |
- `recordOrderPayment`(ledger) 변경 0 — link 가 사후에 `transaction_id` 를 채운다.

### 3-3. 프론트 — `PaymentModal.tsx`(비보호) + `OrderContext.tsx`(비보호 addOrder 성공 지점 1곳) + `utils/terminalPaymentLink.ts`(신규) + `utils/nativeEcr.ts`(브릿지 감지·호출) + 설정 화면 카드 섹션
- 조건: `paymentMethod==='card'` **AND** `payment_settings.card.terminal.enabled` **AND** `window.__NATIVE_ECR?.available` **AND** 온라인. 하나라도 아니면 **오늘 그대로**(브릿지 없으면 작은 안내 1줄 «이 기기는 단말기 자동연동을 지원하지 않습니다 — 수동 기록»).
- 흐름(전액·분할 공통): 확인 버튼 → `POST /transactions`(금액 = 전액은 `total − pointDiscount`, 분할은 `splitTotal` — **Opus 는 POS 포인트 차감 뒤 실제 청구액이 무엇인지 코드로 확인하고 그 값**을 보낸다) → 브릿지 `exchange` → `POST /:id/response` → 결과:
  - **승인** → 카드종류 자동 태깅(서버 `card_type`) → 전액: `onConfirmPayment('card', …)` 그대로 + POS 경로면 대기 연결 등록 / 분할: 기존 `POST /payments` 에 `transaction_id` 추가.
  - **거절/취소/미지원**(01~99, C1, C4, C7, C0 …) → 상태코드 사전 문구 + «다시 시도» / «다른 수단». 기록 안 함.
  - **타임아웃(120초)/통신오류** → 자동으로 `/recover`(Reprint) 1회 → 승인이면 위 승인 흐름, C3/실패면 «단말기에서 승인되지 않았습니다» → 재시도 / 수동 폴백 버튼 «단말기 영수증 확인 후 수동 기록»(사유 입력 필수 → `/manual` → 오늘 경로로 기록).
  - **EA(보류)** → `/check-status` 를 3초 간격, 최대 90초 반복(규칙 §1-1).
- 화면: 모달 안 상태 패널(«단말기에서 카드를 대 주세요» · 경과초 · 취소 버튼은 **단말기에서 취소하라는 안내**로만 — POS 측 C1 전송은 1단계 제외). 공용 컴포넌트(`Modal`/`Button`) · RA 기준 · 장식 이모지 금지 · `t()` 4언어.
- 설정(RA): 카드 섹션 아래 «카드 단말기 연동» — 켜기 · 호스트 · 포트 · 전송방식(기본 http-hex) · **«연결 테스트»**(Echo). 기존 `AutoSaveField` 패턴.
- 브릿지 계약 `window.__NATIVE_ECR`(throw 금지, 항상 `{ok, …}`):
  ```ts
  { available: true,
    exchange(job: { host: string; port: number; transport: 'http-hex'|'tcp-hex'|'tcp-bin'; payloadHex: string; timeoutMs: number })
      : Promise<{ ok: true; responseHex: string } | { ok: false; error: 'TIMEOUT'|'CONNECT_REFUSED'|'NET_ERROR'|'BAD_RESPONSE'|string }> }
  ```
  `tcp-*` 는 ETX(0x03) 수신 후 CRC 가 맞을 때 종료, ACK 프레임(DataLen 0000·명령 같음)이 먼저 오면 버리고 다음 프레임을 기다린다.

### 3-4. 상태기계 (돈 무결성 규칙 — 이 표 밖의 전이는 없다)
```
created ─send─▶ sent ─00─▶ approved ─link─▶ (order_id/transaction_id 채움)
                 │─01~99/C1/C4/C0/C7/…─▶ declined|cancelled   (기록 없음)
                 │─EA─▶ pending ─E3 반복─▶ approved | declined
                 │─no response/net─▶ timeout|comm_error ─Reprint─▶ approved(복구) | not_found
                                                   └─캐셔 사유 입력─▶ manual (감사 표시, 오늘 경로로 기록)
approved ─Void(2단계)─▶ voided
```
- **approved 가 아니면 카드 결제를 자동 기록하지 않는다. 예외는 `manual` 하나이고 반드시 사유·캐셔·시각이 남는다.**
- 같은 행에 응답 2회 → 첫 결과 고정(멱등). 같은 주문에 승인 2건(재시도 후 둘 다 승인) → 두 번째 승인은 `link` 거부 + «이중 승인 의심» 경고(캐셔가 단말기에서 하나를 Void).

### 3-5. 네이티브 — Windows `desktop-pos/src/ecr/exchange.js` + preload 노출 / Android `NativeEcrPlugin.kt` + 브릿지 js 1줄
- Electron: `http.request`(POST, `Content-Type: text/plain`, 본문 hex, 타임아웃 = `timeoutMs`) / `net.Socket`(연결 5초, 총 `timeoutMs`). **네이티브 모듈 금지 원칙 유지**(Node 내장만). 버전 bump + 자동업데이트 피드.
- Android: OkHttp 또는 `HttpURLConnection` + `java.net.Socket`(인쇄 플러그인 패턴). **평문 HTTP 허용**이 필요하다 — `android:usesCleartextTraffic` 또는 network-security-config 로 사설 IP 평문 허용(API 28+ 기본 차단). Opus 가 현 설정을 실측하고 보고.
- 첫 구현은 **Irene 답(계산대 기기) 쪽 1종**. 다른 쪽은 1일 추가.

### 3-6. 손대지 않는 것
🔒 8개 보호파일 전부(billPrint · useAutoPrintPoller · MainLayout `_printPollFn` · KitchenDisplayPage · **POSTerminalPage** · **orders-crud** · stationEnrichment · orderTotals) · `__NATIVE_PRINT` 계약 · `orderPaymentLedger.js` · Stripe/PayPal 게이트웨이 경로(`reference_payment_standard`) · 모바일 손님 결제 · 오프라인 재생 경로.

---

## 4. 단계와 증명 기준

### Phase 0 — 실측·외부 확인 (0.5일 + GHL 회신 대기)
1. **GHL 질문서**(Irene 가 전달, §5-4 문안) → 샌드박스 TID/MID · 테스트 단말기 또는 시뮬레이터 · 전송 형식 · 프로파일 · 인증 필수 시나리오.
2. 테스트 단말기가 손에 오면 PC 에서 **curl 로 Echo 1회**: `POST http://<단말기>:33898` 본문 `02000C010B01C3000000{CRC}03`(ACK 00 버전, CRC 는 코덱으로 계산) → 응답 본문이 hex 인지, 헤더에 `Access-Control-Allow-Origin` 이 있는지 기록. 이 한 번이 `transport` 기본값과 «브라우저 직결 가능성» 을 닫는다.
3. 단말기 없이도 진행 가능한 것: 아래 Phase 1 전부(목 단말기로).

### Phase 1 — 판매 자동 기록 (코드 3~4일, 기기 1종)
산출물: 코덱+테스트 · 모델/마이그 · 라우트 · PaymentModal 흐름 · OrderContext link · 설정 UI · 브릿지 1종 · **목 단말기 `dev-backend/scripts/mock-ghl-terminal.js`**(HTTP :33898, 코덱 재사용, 시나리오 플래그 approve/decline/timeout/EA/C3) · health-check `--category=terminal` · 문서 `docs/CARD_TERMINAL_ECR_DESIGN.md`(이 문서를 정리해 옮김, 규격 인용은 §1-1 수준까지만).

**증명 기준(전부 통과 + 고장주입 3건 반증)**:
| # | 항목 | 방법 | 기준 |
|---|---|---|---|
| P1 | 코덱 규격 벡터 | `npx jest tests/ghl-ecr.test.js` | Echo 요청/응답·ACK 3벡터 바이트 일치 · 금액 BCD 왕복(0.01 / 12.34 / 9999999999.99) · 깨진 CRC → 거부 · ASCII D002 "09"→debit, 바이너리 0x04→visa |
| P2 | 계약(데모 매장 38) | health-check terminal | 생성→목 승인 응답→approved+카드종류 · 금액 다른 응답→거부(status 불변) · 같은 응답 2회→deduped · 익명 401 · 타매장 403 · link 로 `orders.transaction_id` 채워짐 · timeout→recover→Reprint 승인→부모 approved · C3→not_found · manual 은 사유 없으면 400 |
| P3 | 실브라우저 흐름 | Playwright(dev, 브릿지 목 주입 `window.__NATIVE_ECR`) | POS·FloorPlan·분할 3경로에서 승인→결제 완료·주문 `transaction_id`·거절→기록 0·타임아웃→복구 UI |
| P4 | 브릿지 1종 | Electron: `desktop-pos/test/` 노드 단위(목 단말기 상대 exchange http/tcp·타임아웃) + Xvfb 스모크 / Android: 에뮬레이터 또는 실기기 | 응답 hex 왕복·타임아웃 `{ok:false,error:'TIMEOUT'}` · throw 0 |
| P5 | 회귀 | `verify-all --full` · `check-print-guard` 변경 0 · 브릿지 없는 브라우저에서 카드 결제 = 오늘과 동일 | 통과 |
| 고장주입 | ① CRC 1바이트 변조 ② 금액 1센트 변조 ③ 응답 재전송 | 각각 거부/불변 **실패하는 것을 먼저 확인**한 뒤 통과 |

### Phase 1.5 — 두 번째 기기(1일) · Phase 2 — Void·Settlement·마감 자동입력·단말기 이월렛(2~3일)
- Void: 결제 상세 «단말기 취소» → `POST /:id/void`(A2, C013 우선) → 승인 시 `voided` + 환불/취소 흐름의 기존 기록. 정산 전만(정산 후는 Refund B1 — 2단계 후반).
- Settlement: 마감(Cash-up) 단계에 «단말기 정산 실행» → A3 → 응답 합계를 **실제 카드 금액 칸에 자동 채움**(캐셔가 수정 가능). Get Last Settlement 로 재조회.
- 이월렛: 결제수단 ewallet 도 단말기 경유 토글 → D018 로 `ewallet_type` 매핑(duitnow/tng…).

### GHL 인증(외부, 일정 미정)
테스트 스크립트 시나리오를 실단말기로 실행·기록 → GHL 사인오프. **Phase 1+2 가 끝나야 전 항목이 채워진다.**

---

## 5. Irene 에게 — 질문과 Fable 권고 (팀원은 이 블록을 그대로 전달)

### 5-1. 「빨리」「오래 걸리는 거 있으면 상의」 에 대한 답
- **코드 자체는 길지 않다**: 1단계 3~4일(브릿지 1종 포함), 2단계 2~3일.
- **오래 걸릴 수 있는 것은 둘 다 외부 의존**이라 지금 알립니다:
  1. **GHL 샌드박스 TID/MID + 테스트 단말기(또는 시뮬레이터)** — 이게 없으면 목 단말기까지만 증명되고 실단말기 확인·인증을 못 한다. GHL 회신 속도가 일정을 정한다.
  2. **계산대에 앱 설치가 필수** — 브라우저는 단말기와 직접 통신할 수 없다(HTTPS 보안 차단). 단말기 연동 매장은 Windows 10/11 이면 Purple POS 데스크탑앱, 안드로이드 태블릿이면 APK 를 깔아야 한다. **Win7 PC 는 불가**(Electron 미지원). 지금 운영 매장 계산대는 전부 브라우저라, 파일럿 매장 1곳의 설치가 선행된다.
- **중요하지 않은 것(뒤로 미룸)**: Preauth/Completion · Read Card · Print Day Total · NETS · POS 측 취소 명령(C1) · 기기별 단말기 2대.

### 5-2. 결정이 필요한 것 (각각 권고 포함)
| # | 질문 | Fable 권고 |
|---|---|---|
| Q1 | 첫 매장과 계산대 기기(Windows 10/11 PC / 안드로이드 태블릿 / Win7)? | **Windows 10/11 + 데스크탑앱으로 파일럿** — 브릿지·자동업데이트·설치파일이 이미 있어 가장 빠르다. 태블릿이면 안드로이드 브릿지를 먼저 만든다(+1일). Win7 이면 그 매장은 파일럿 부적합 |
| Q2 | 단말기 모델·대수, 매장당 1대로 시작해도 되나? | **매장당 1대, 고정 IP(라우터 DHCP 예약)** 로 시작. 2대는 2단계 |
| Q3 | 범위 | **1단계 = 판매 승인 자동 기록(금액 전송·결과·카드종류·승인번호)** 먼저 운영 투입 → **2단계 = 취소·정산·마감 자동입력·이월렛(QR) 단말 경유**. GHL 인증은 2단계까지 끝난 뒤 |
| Q4 | 9-08 「결제를 태블릿에서 터치하는 것까지」 가 뜻하는 것 — ① GHL 단말기가 터치형(Android 단말, 지금 설계 그대로) ② 우리 POS 태블릿 자체로 카드 탭(Tap-to-Phone SDK, 전혀 다른 연동) | 받은 자료는 전부 ①(별도 단말기 + LAN)이다. **①로 진행**하고, ②였다면 GHL SDK 문서를 받은 뒤 별도 설계. Q5 문안에 함께 묻는다 |
| Q5 | GHL 에 보낼 질문(Irene 가 전달) | 아래 5-4 문안 |

### 5-3. Irene 확인 없이 팀원이 진행할 것
Phase 0-3 와 Phase 1 전체(목 단말기 기준). 실단말기·앱 설치·GHL 질문서 발송만 Irene 손이 필요하다.

### 5-4. GHL 에 보낼 질문 문안(영문, 그대로 전달 가능)
1. Which profile does our terminal run — «Payhere ECR» or «Payhere Direct» (spec v2.9.26)? Terminal model name?
2. For TCP/IP (local network) integration: is the frame sent as an **HTTP POST with the hex string as the body to port 33898** (as in your Postman example), or as raw TCP bytes? Is the response also a hex string in the HTTP body? Does the HTTP response include CORS headers (`Access-Control-Allow-Origin`)?
3. Please issue **sandbox TID/MID** and advise how we can get a test terminal (or a terminal simulator) for development in Kuala Lumpur.
4. Which scenarios in «NDPSTestScript - ECR integration» are mandatory for a restaurant POS certification? Are Preauth / Sale Completion required?
5. For eWallet / DuitNow QR sales, does the terminal scan the customer's QR itself (we only send amount), or must the POS send Product ID (tag C01A)?
6. Is there any «tap on tablet» (SoftPOS / Tap-to-Phone SDK) option in addition to the ECR terminal integration? If yes, please share its SDK documentation.

---

## 6. 메모리·문서 후속(구현 완료 뒤, 게이트 2회차에서)
- 새 메모리 `reference_card_terminal_ghl_ecr.md`(구조 한 줄: 브릿지=운반, 코덱=백엔드, 승인 아니면 기록 없음, Reprint 복구) · `docs/CARD_TERMINAL_ECR_DESIGN.md` 신설(1문서=1주제) · `docs/PAYMENT_SYSTEM_PLAN.md:153` «Card (단말기)» 줄에 링크 1줄 · `docs/CASH_MANAGEMENT_SHIFT_CLOSE.md` 2단계 때 «카드 정산 자동입력» 추가.
- 규격서 PDF·엑셀·캡처는 **저장소 밖**에 둔다(`.gitignore` 대상 아님 — 애초에 넣지 않는다).

---

## 추가 판정 — 결제수단 선택(2026-10-01)

> Irene 원문: **「GHL 터미널을 쓰는 고객이랑 설정 안한 고객이 결제할 때 선택이 다른 거 맞아? GHL 터미널에서 QR 자동으로 표시하고 카드 자동으로 표시하는 거ㅓ 우리 포스에서부터 할 필요 없어?」** · 앞서 **「자동으로 찾게 해줘... 바뀌면 자동으로 찾아야 하는 거 아니야?」** · 09-08 **「완전 심플 사용 포스 판매로 집중할거야.」**
> 작성: Fable 5.1 · 코드 수정 0. 같은 사안(GHL ECR)의 설계 보강이라 호출 횟수는 늘리지 않는다 — 게이트 2회차는 구현 완료 뒤 1회 그대로.

### A. 실측 — 지금 코드와 규격이 말하는 것

**현 구현(dev, 미배포)** — 결제 창 버튼은 단말기 설정과 무관하게 같다(매장 `payment_settings` 의 enabled·availableIn 'pos' 목록, `PaymentModal.tsx:473`). 단말기 경유는 **Card 를 골랐을 때만**(`:536 useTerminal`). 승인 뒤 항상 `onConfirmPayment('card', …, txn.card_type)`(`:898`) · 분할도 `payment_method` 는 선택값 그대로, `card_type` 만 덮어씀(`:766`). 서버 `mapCardType`(`utils/ghlEcr.js:181`) 은 D018 문자열에서 VISA/MASTER/AMEX/DEBIT 만 알아보고, 코드 11(TnG)·19(eWallet) 은 **'other' 카드**로 떨어진다. `link()` 는 원장 행을 `payment_method:'card'` 로만 찾는다(`services/terminalPayments.js:200`).
→ 팀원 관찰이 맞다: **캐셔가 Card 를 누르고 손님이 단말기에 TnG 지갑 QR 을 보여 주면 «카드(other)» 로 기록된다.** IOI 몰 보고(`mallSalesService.js:101`, `ewallet_type==='tng'` 로 분류)·마감 카드/이월렛 예상액·영수증 표기가 전부 틀어진다. 이건 **분류 결함**이며 지금 고쳐야 한다(배포 전).

**규격(v2.9.26)** — 구현에 필요한 사실만:
1. §9.2 카드 판매(seamless) 와 §9.4 이월렛 판매(seamless) 의 **요청 프레임은 태그까지 같다**(C001 금액 + C013 ECR 송장, 결제종류 D003 없음). 응답이 무엇이었는지 알려 준다 — §9.4 응답: D018 `"TNGWALLET"` · D002 `"19"`(eWallet) · D008 `0x08`(Scan) · D01A `"Scan"` · D017 거래참조. 팀원 해석 **확인**: «금액만 보내고 결과로 구분» 은 규격이 보여 주는 그대로다.
2. D003 결제종류는 **선택(O)** — 개정이력 2.9.7 에서 «Mandatory → Optional» 로 바뀌었다. 값 CC 신용 · CF 직불 · **CD Scan-QR** 등.
3. §9.9 이월렛 판매(**Async**) 는 요청에 **C01A Product ID**(B4) 가 더 붙고, 응답 Status `EA`(보류) → Check Status 반복. §5.3 C01A 주석: «Required for **non-seamless** payment like DUITNOW, Applicable only for Payhere ECR». §9.9 응답 D018 `"DuitNow QR"`.
4. §3.1 흐름: «사용자가 카드/현금/기타 결제 버튼을 누른다 → POS 가 명령을 보낸다 → 단말기가 처리한다».

**규격이 말하지 않는 것(정직한 한계)** — «금액만 보낸 Sale 하나로 단말기가 카드 탭과 손님 QR 스캔을 **동시에** 기다리는가». 프레임이 같고 D003 이 선택이라는 사실은 «그렇다» 쪽 증거지만, 문장으로 적혀 있지는 않다. 이건 **실단말기 1회 실측(또는 GHL 질문 5번 회신)** 으로만 닫힌다.

### B. 원리 — «seamless» 와 «non-seamless» 는 QR 의 방향이다
- **seamless(손님이 보여 주는 QR)**: 손님이 TnG 앱의 결제 바코드를 띄우고 **단말기가 스캔**한다. 단말기가 즉시 승인 응답을 준다. POS 는 미리 알 필요가 없다 — 카드와 같은 명령.
- **non-seamless/Async(단말기가 보여 주는 QR, DuitNow)**: 단말기 화면에 QR 을 **띄우고 손님이 스캔**한다. 어떤 QR 상품을 띄울지(Product ID)를 POS 가 **미리** 알려 줘야 하고, 결과는 보류(EA)→조회로 온다.
→ 설계 원칙 한 줄: **POS 버튼 = 캐셔가 미리 알아야 하는 것. 단말기 응답 = 사후 분류.** 미리 알 필요가 없는 것(카드·손님 QR)은 버튼 하나, 미리 알아야 하는 것(단말기 화면 QR)은 버튼이 따로 필요하다.

### C. 판정

**C-1. 단말기 연동 매장의 선택지 = «Card / QR (단말기)» 버튼 하나. E-Wallet 버튼은 오늘과 같은 수기 기록으로 남긴다.**
| 선택지 | 판정 | 이유 |
|---|---|---|
| ① 현행(Card 만 단말기, 결과는 항상 카드) | **기각** | A 의 분류 결함. 지갑 QR 결제가 카드로 기록된다 |
| ② Card / QR 버튼 분리(둘 다 단말기) | **기각(이번엔)** | 캐셔가 미리 고르게 하는데 규격은 그럴 필요가 없다고 보여 준다. Irene 「심플」 과 반대. 단, **실측에서 단말기가 D003 없이는 QR 을 안 받는 것으로 드러나면 이 안으로 간다**(D-5 분기) |
| ③ «Card / QR (단말기)» 하나 + 응답으로 분류 | **채택** | 캐셔 동작 = 버튼 1번 + «단말기에서 결제해 주세요». 카드종류·지갑종류 질문 0. 결과(카드/지갑, 브랜드)는 단말기가 말해 준다 |
| ④ E-Wallet 버튼 제거 | **기각** | 매장은 GHL 단말기와 **별개로** 자기 DuitNow/TnG 스탠디 QR 을 둘 수 있다(말레이시아 식당 흔한 구성). 그 결제는 단말기를 안 거치니 수기 기록이 맞다. 단말기로만 받는 매장은 **설정에서 E-Wallet 을 끄면** 된다 — 코드 0, 매장 설정 1개 |

- 단말기 **미연동 매장**: 변화 0(바이트 동일).
- 단말기 연동 매장이라도 브릿지 없는 기기(브라우저)·오프라인: 오늘 그대로 수기 Card(기존 안내 1줄).
- Irene 질문 ①「선택이 다른 거 맞아?」 → **지금 코드는 «같다»(버튼 동일, Card 만 뒤에서 단말기로). 이 판정 뒤에는 «조금 다르다»: 연동 매장은 Card 버튼이 «Card / QR (단말기)» 가 되고 카드종류를 묻지 않는다. 그 외 버튼은 같다.**
- Irene 질문 ②「QR·카드 자동 표시를 POS 에서부터 할 필요 없어?」 → **없다 — 카드 탭과 손님이 보여 주는 지갑 QR 은.** POS 는 금액만 보내고 단말기가 처리한 뒤 무엇이었는지 알려 준다(우리가 자동 분류). **있다 — 단말기 화면에 DuitNow QR 을 띄워 손님이 찍게 하는 방식은.** 규격이 POS 더러 Product ID 를 미리 보내라 한다. 이건 2단계(C-3).

**C-2. 결과 분류·기록 규칙 (돈 무결성 — 서버가 정하고 화면은 따른다)**
- 서버 코덱에 `tenderFromResult(result)` → `{ method:'card'|'ewallet', card_type|null, ewallet_type|null }`. 우선순위: **D018 문자열 → D002 코드 → 입력방식(D008 0x08 / D01A "Scan")**.
  - ewallet 판정: D018 에 `WALLET|TNG|TOUCH|DUITNOW|GRAB|BOOST|SHOPEE|QR` 중 하나 **또는** D002 ∈ {11, 19} **또는** 입력방식 Scan.
  - `ewallet_type` = `EWALLET_TYPE_OPTIONS` 키만(`tng|grabpay|boost|shopeepay|duitnow|other`, DB 저장값이라 그 밖 금지): TNG/TOUCH→tng · DUITNOW→duitnow · GRAB→grabpay · BOOST→boost · SHOPEE→shopeepay · 그 외→other.
  - card 판정: 기존 `mapCardType`(VISA/MASTER/AMEX/MYDEBIT→debit, UnionPay·JCB·Diners→other).
- **단말기 응답이 진실이다.** 매장 `acceptedTypes` 목록으로 거부하지 않는다(그 목록은 수기 입력용). 응답에 D018·D002·입력방식이 전부 없으면 `card/null`(오늘과 같음).
- `terminal_transactions` 에 `tender_method ENUM('card','ewallet')` + `ewallet_type VARCHAR(20)` 2칸(미배포 표라 마이그 스크립트에 멱등 ADD COLUMN — 운영엔 없고 dev 에만 있을 수 있다). `publicRow` 가 두 칸을 돌려준다.
- `link()`: 원장 행 매칭 `payment_method: row.tender_method`(지금은 'card' 고정).
- `PaymentModal`: 승인 뒤 **`onConfirmPayment(txn.tender_method, …, cardType=txn.card_type, …, ewalletType=txn.ewallet_type)`**. 🔒 `POSTerminalPage.handleConfirmPayment(:2663)` 는 이미 8번째 인자 `ewalletType` 과 `method==='ewallet'`(`:2697, :2770`) 을 처리한다 → **보호파일 변경 0**. 분할 경로는 `body.payment_method = txn.tender_method` + `ewallet_type`. 오프라인 분기는 단말기를 안 타므로 무변경.
- **수동 폴백(`/manual`)** 은 응답이 없으니 분류를 캐셔가 적는다: 사유 입력 옆에 **Card / E-Wallet 선택 + 매장 서브타입 규칙(`resolvePaymentSubtype`) 그대로**를 필수로. `markManual(row, note, tender)` 가 `tender_method`·`card_type|ewallet_type` 를 저장(키 검증). 선택 없으면 400.
- 결과: 마감 카드/이월렛 예상액 · IOI 몰 tng 분류 · 영수증 «E-Wallet (Touch 'n Go)» 가 단말기 사실과 일치한다. `orderPaymentLedger.js` · 🔒 8개 파일 · 몰 보고 코드 **무변경**.

**C-3. DuitNow(단말기 화면 QR · Product ID) — 이번엔 넣지 않는다. 2단계.**
- 넣으려면 ①Product ID 값(규격 샘플 `0x000007F3` 이 우리 가맹점에도 같은지 GHL 이 줘야 함) ②우리 단말기가 Payhere **ECR** 프로파일인지(C01A 는 ECR 전용) ③«DuitNow» 전용 버튼(미리 알아야 하므로 버튼 하나로 못 묶는다) — 셋 중 ①②가 GHL 회신 의존. 추측으로 넣으면 실단말기에서 D5(태그 누락)/형식오류를 보게 된다.
- 지금 코드에 **EA→Check Status 폴링은 이미 있다**(§3-3). 2단계는 «버튼 + C01A 한 태그 + 분류(duitnow)» 뿐이라 반나절 안팎.
- 기존 §2-4 문구 수정: «단말기 이월렛(QR) = 2단계» → **«손님 QR(seamless) = 1단계(이 판정), 단말기 화면 QR(DuitNow·Product ID) = 2단계»**.

### D. 절단면 (이 밖은 손대지 않는다)
| # | 파일 | 변경 |
|---|---|---|
| D-1 | `dev-backend/utils/ghlEcr.js` | `tenderFromResult()` 추가 + `readResult` 결과에 `tender_method`·`ewallet_type` 포함. `saleRequest` 에 **선택 인자 `paymentType`(D003)** 를 받게만 한다(기본은 안 보냄, 어디서도 안 넘김 — D-5 분기 대비) |
| D-2 | `tests/ghl-ecr.test.js` | 벡터 3: §9.4 응답(TNGWALLET/"19"/Scan)→`ewallet/tng` · §9.9 응답 D018 "DuitNow QR"→`ewallet/duitnow`(분류만) · §9.2 VISA→`card/visa`. +D003 넣은 Sale 왕복 1 |
| D-3 | `models/TerminalTransaction.js` · `scripts/migrate-create-terminal-transactions.js` | 2칸 멱등 추가(`information_schema` 확인 뒤 ADD COLUMN). `tender_method` 는 ENUM 이므로 `expandEnum` 유틸로 |
| D-4 | `services/terminalPayments.js` · `routes/terminal-payments.js` | RESULT_FIELDS 2칸 · `link()` 매칭 method · `markManual` tender 인자+검증(400) · `/manual` 바디 · `publicRow` |
| D-5 | `scripts/mock-ghl-terminal.js` | 시나리오 `approve-tng`(D002 "19", D018 "TNGWALLET", D01A "Scan", D017) |
| D-6 | `scripts/health-check.js` terminal | +1 케이스: approve-tng → `tender_method=ewallet, ewallet_type=tng` · 이월렛 원장 행에 link · `/manual` tender 없으면 400 · 기존 VISA 케이스는 `card/visa` 유지 |
| D-7 | `PaymentModal.tsx` · `TerminalPanel.tsx` · `utils/terminalSale.ts`(TerminalTxn 타입 2칸) | 연동 매장(`terminalOn`) 이면 Card 버튼 라벨 `t('pos:cardTerminal.methodLabel')`(«Card / QR · Terminal») · ready 문구 «단말기에서 카드를 대거나 QR 을 보여 달라고 하세요» · 승인 뒤 method 를 txn 에서 · 분할 body · 수동 폴백에 Card/E-Wallet+서브타입 선택 |
| D-8 | `public/locales/{en,ko,zh,ms}/pos.json` | 새 키 4언어 · `npm run i18n:verify` |
| D-9 | 이 문서 §2-4 · `docs/CARD_TERMINAL_ECR_DESIGN.md`(있으면) | C-3 문구 |

**손대지 않는 것**: 🔒 8개 보호파일 · `orderPaymentLedger.js` · `mallSalesService.js` · 매장 결제설정 화면(새 토글 없음 — E-Wallet 끄기는 기존 enabled) · D003 송신(코덱 인자만, 미배선) · Product ID/Async UI · Void/Settlement.

**D-5 분기(실측 뒤 결정, 지금 코드로 안 정한다)**: Irene 태블릿 실단말기 테스트에 **«TnG 앱 QR 스캔 판매 1건»** 을 넣는다. 금액만 보낸 Sale 로 QR 이 스캔되면 끝. **안 되면**(단말기가 카드만 기다림) → «QR (단말기)» 버튼 1개 추가 + 그 버튼만 D003=CD 송신(코덱 인자는 D-1 로 준비됨, 반나절). 이건 데이터가 정하는 일이라 Fable 재호출 없이 팀원이 실측 결과에 붙여 보고.

### E. 증명 기준(기존 P1~P5 에 더함)
- P1+: D-2 벡터 4건 통과. **고장주입**: `tenderFromResult` 의 D018 판정을 지우면 §9.4 벡터가 `card/other` 로 떨어져 **실패하는 것을 먼저 확인**.
- P2+: D-6 케이스. 고장주입: `link()` 매칭을 'card' 고정으로 되돌리면 이월렛 원장 행 link 가 빈손이 되는 것 확인.
- P3+: Playwright 브릿지 목에 approve-tng 응답 → POS 신규주문 `payment_method=ewallet, ewallet_type=tng` · 분할 경로 동일 · 수동 폴백에서 선택 없이 기록 버튼 비활성.
- P5: `verify-all --full` · `check-print-guard` 변경 0 · 미연동 매장 결제 창 바이트 동일(스크린샷 대조).
- 프론트 빌드 1회·sweep 1회 규칙 — D-7·D-8 을 다 확정한 뒤 빌드.

### F. Irene 에게 (팀원은 이 블록을 그대로 전달)
1. **「선택이 다른 거 맞아?」** — 지금 만들어 둔 코드는 **같습니다**(버튼은 똑같고 Card 만 뒤에서 단말기로 감). 그런데 그 상태로는 손님이 단말기에 TnG 지갑 QR 을 보여 줘도 **카드로 기록되는 결함**이 있어 배포 전에 고칩니다. 고친 뒤에는 단말기 매장만 Card 버튼이 **«Card / QR (단말기)»** 하나가 되고 카드종류를 묻지 않습니다. 단말기 없는 매장은 지금과 똑같습니다.
2. **「QR·카드 자동을 POS 에서부터 할 필요 없어?」** — **카드 탭과 손님이 보여 주는 지갑 QR 은 없습니다.** GHL 규격에서 카드 판매와 지갑 판매는 POS 가 보내는 명령이 같고(금액만), 단말기가 처리한 뒤 «VISA 였다 / TNG 였다» 를 알려 줍니다. 우리는 그걸 받아 카드/이월렛·종류를 자동으로 기록합니다. **단말기 화면에 DuitNow QR 을 띄워 손님이 찍게 하는 방식은 다릅니다** — 규격이 POS 더러 «어떤 QR 인지(Product ID)» 를 미리 보내라고 해서 버튼이 따로 필요하고, 그 값은 GHL 이 줘야 합니다(질문 5번). 이건 2단계로 뒤에 붙입니다(반나절).
3. **확인 하나만** — 단말기 매장에도 **E-Wallet 버튼은 남깁니다**(단말기 안 거치는 매장 자체 QR 스탠디용 수기 기록). 단말기로만 QR 을 받는 매장은 설정에서 E-Wallet 을 끄면 됩니다. **이렇게 가도 될까요?** (Fable 권고: 이대로. 버튼을 없애면 스탠디 QR 매장이 기록할 곳이 없어집니다.)
4. **태블릿 테스트 때 한 건 추가** — Echo 외에 **TnG 앱 QR 스캔 판매 1건(RM 1.00)**. 금액만 보낸 명령으로 단말기가 QR 도 받는지 눈으로 확인하는 것. 안 받으면 «QR (단말기)» 버튼 하나를 더 두는 작은 분기로 갑니다.
