# 카드단말기 ECR 자동연동 (GHL / NTT DATA Payment Services)

> 판정: `.claude/fable-design-20261001-ghl-ecr.md` (Fable 2026-10-01 설계 1회차). 이 문서는 구현된 구조의 단일 기준이다.
> ⚠ GHL 규격서(«POS/ECR Extended Device Interface v2.9.26», 기밀)는 저장소에 두지 않는다. 아래는 구현에 필요한 사실만이다.

## 1. 한 줄 구조

**계산대 앱 브릿지 `window.__NATIVE_ECR` 는 바이트 운반만, 프레임 생성·해석·판정·기록은 서버 한 곳.**
승인(Status 00)이 아니면 카드 결제를 자동 기록하지 않는다. 응답을 못 받으면 Reprint(E6)로 되찾고,
그래도 모르면 캐셔가 단말기 영수증을 보고 «수동 기록»(사유 필수·감사기록)으로만 닫는다.

```
결제 창(PaymentModal) ─POST /api/terminal/transactions─▶ 서버: 행 생성 + 요청 hex
        │ 브릿지 exchange(host:port, hex)                         ▲
        ▼                                                         │ POST /:id/response {response_hex|error}
  GHL 단말기 (매장 LAN, 예: 192.168.2.99:33898) ── 응답 hex ──────┘  서버: CRC·명령·금액·ECR송장 대조 → 상태
```

브라우저(HTTPS)는 매장 LAN 의 단말기(HTTP)에 직접 닿을 수 없다(혼합 콘텐츠 차단). 그래서 **단말기 연동 매장은 계산대에 Purple POS 앱**(Windows 데스크탑 / 안드로이드)이 있어야 한다. 앱이 아니면 결제 창은 오늘과 똑같이 «카드 기록만» 한다.

### 1-1. 결제 수단 — 카드와 손님 QR 은 한 버튼 (Fable 추가 판정 2026-10-01)
- 단말기 연동 매장(앱 + 온라인)에서는 Card 버튼이 **«Card / QR (Terminal)»** 하나가 되고 카드종류를 묻지 않는다.
- 규격상 카드 판매와 손님이 보여 주는 지갑 QR 판매(seamless)는 **요청이 같다**(금액만). 단말기 응답으로 서버가 분류한다 —
  `utils/ghlEcr.tenderFromResult`: D018 문자열 → D002 코드(11 TnG · 19 eWallet) → 입력방식 Scan.
  결과 `tender_method`(card|ewallet) · `ewallet_type`(tng|grabpay|boost|shopeepay|duitnow|other) 로 주문·원장에 기록 → 몰 보고·마감이 단말기 사실과 일치.
- **단말기 화면에 DuitNow QR 을 띄우는 방식(Async, Product ID C01A)** 은 2단계 — Product ID 값은 GHL 회신 필요.
- E-Wallet 버튼은 남는다(단말기를 안 거치는 매장 자체 QR 스탠디 수기 기록용). 단말기로만 받는 매장은 설정에서 E-Wallet 을 끈다.
- 수동 기록(결과 미확인)은 캐셔가 영수증을 보고 카드/이월렛 + 종류를 고른다(서버 400 강제).
- 실측 분기: 금액만 보낸 Sale 로 단말기가 QR 을 안 받으면 «QR (단말기)» 버튼 + D003=CD(코덱 인자 준비됨).

## 2. 파일

| 층 | 파일 | 역할 |
|---|---|---|
| 코덱 | `dev-backend/utils/ghlEcr.js` | 프레임(STX·Seq·Src·Dst·Cmd·Status/ACK·Len·TLV·CRC-16/ARC·ETX), 금액 BCD, 결과 해석, 상태 분류 |
| 상태기계 | `dev-backend/services/terminalPayments.js` | 생성·응답 반영·Reprint 복구·Check Status·주문 연결·수동 기록 — `terminal_transactions.status` 는 여기서만 바뀐다 |
| API | `dev-backend/routes/terminal-payments.js` (`/api/terminal`) | 로그인 + 결제권한 + 매장 접근(`userCanAccessRestaurant`) |
| 표 | `terminal_transactions` (`models/TerminalTransaction.js`, `scripts/migrate-create-terminal-transactions.js`, 레지스트리 deploy) | 시도 1건 = 1행. 기존 표 변경 0 — `orders.transaction_id`·`order_payments.transaction_id` 는 색인 복사 |
| 목 단말기 | `dev-backend/scripts/mock-ghl-terminal.js` | 실단말기 없이 개발·검증. `node scripts/mock-ghl-terminal.js --scenario approve` |
| 결제 창 | `dev-frontend/src/components/POSTerminal/PaymentModal.tsx` + `TerminalPanel.tsx` | 카드 + 설정 켜짐 + 브릿지 + 온라인이면 단말기 경유 |
| 흐름 | `dev-frontend/src/utils/terminalSale.ts` · `nativeEcr.ts` · `terminalPaymentLink.ts` | 프로토콜을 모른다(hex 운반만) |
| POS 신규 주문 연결 | `dev-frontend/src/contexts/OrderContext.tsx` addOrder | 승인 순간엔 주문이 없다 → 주문 생성 직후 `/link` (🔒 POSTerminalPage 무접촉) |
| 설정 | `dev-frontend/src/pages/Settings/CardTerminalSettings.tsx` | `payment_settings.card.terminal = {enabled, host, port, transport}` + 연결 테스트(Echo) |
| 데스크탑 브릿지 | `desktop-pos/src/ecr/exchange.js` · `ecr/index.js` · `preload.js` | Node 내장 http/net 만, **사설망 주소만 허용** |

## 3. 상태기계

```
created ─send─▶ sent ─00─▶ approved ─link─▶ order_id · orders.transaction_id = GHL:{단말기송장}:{승인번호}
                 │─01~99/C1/C4/C0/…─▶ declined     │─C7─▶ cancelled      (기록 없음)
                 │─EA─▶ pending ─E3 반복─▶ approved | declined
                 │─응답 없음/통신오류/깨진 응답─▶ timeout|comm_error ─E6 Reprint─▶ approved(복구) | not_found
                                                            └─캐셔 사유 입력─▶ manual (감사기록 terminal_manual_override)
```
- 같은 행에 응답이 두 번 오면 첫 결과 고정(멱등).
- 같은 주문에 승인 합계가 주문 금액을 넘으면 연결 거부 `DOUBLE_APPROVAL`(캐셔가 단말기에서 하나를 Void). 승인 자체는 저장된 채 남는다.
- 금액이 요청과 1센트라도 다르거나 ECR 송장이 다르면 `422` 로 거부, 상태 불변.
- (2026-10-02 R2) 주문이 있는 판매 생성 시 «그 주문의 승인 합 + 이번 금액 > 주문 금액» 이면 단말기에 보내기 전에 `409 ALREADY_APPROVED`. 같은 금액 승인이 있으면 그 행을 `data.txn` 으로 돌려주고 화면은 **새로 긁지 않고 그 승인으로 기록**한다(승인 뒤 결제 기록만 실패한 재시도). 분할 몫(합 ≤ 주문 금액)은 막지 않는다. 승인 뒤 link 가 `DOUBLE_APPROVAL` 이면 화면이 기록하지 않고 «단말기에서 하나 Void» 경고.
- (R1) 분할 결제도 전액과 같은 규칙 — 거절·미확인 뒤 하단 Confirm 잠김, 패널 «다시 시도»(단말기 재전송) 또는 «수동 기록»(감사기록 뒤에만 수단 실음)으로만 진행.
- (R3·R4) POS 신규 주문 대기 연결은 금액이 같은 주문에만 · 주문 있는 경로의 수동 기록은 `/manual` 에서 바로 link(주문 참조 채움).

## 4. 검증 (2026-10-01 dev)

- `npx jest tests/ghl-ecr.test.js` 23/23 — 규격 샘플 Echo·ACK·Sale 응답 CRC 바이트 일치, 금액 BCD 왕복, 카드종류 두 프로파일.
- `health-check --category=terminal` 3건 — 승인·카드종류·주문 연결·멱등·401/403·이중 승인 / CRC·금액·송장 위변조 422 상태 불변 / timeout→Reprint 복구·C3 not_found·EA→Check Status·수동 사유 필수.
- 고장주입: CRC 검사 제거 · 금액 대조 제거 · 멱등 두 겹 제거 → 각각 해당 계약 실패 확인 후 원복.
- `desktop-pos/test/ecr-units.js` 9/9 — http-hex 왕복, tcp ACK 건너뛰기, 타임아웃, 연결 거부, 공인 IP·도메인 차단.
- e2e `dev-frontend/e2e/card-terminal.spec.js` — 목 브릿지로 승인·거절·무응답 복구·브릿지 없음.

## 5. 남은 것

- **2026-10-02 Fable 판정(Irene 「모든 테스트는 실 운영에서」 수용)**: 개발용 앱(.dev) 경로는 접는다. 안드로이드 **정식 앱 0.3.0**(운영 URL·브릿지·같은 서명키=덮어 설치)을 `/desktop/PurplePOS.apk` 로 배포 → **운영 데모 매장 1곳만** 단말기 켜고 실측(RM 1.00 카드 + TnG QR, 단말기에서 Void). 설정 안 켠 매장은 결제 창·서버 모두 변화 0.

- **GHL 회신 대기**(Irene 발송): 실단말기 전송 형식(HTTP hex 확정 여부·응답 형식), 프로파일(Payhere ECR/Direct), 샌드박스 TID/MID·테스트 단말기, 인증 필수 시나리오, DuitNow QR 처리, Tap-to-Phone 옵션.
- 실단말기 Echo 1회로 `transport` 기본값 확정 → 데스크탑앱 버전 올려 설치본 배포 → 파일럿 매장 1곳 설치.
- 2단계: Void(A2)·Settlement(A3)·마감 카드금액 자동입력·이월렛 단말 경유. Android 브릿지(평문 HTTP 허용 설정 필요).
