# [Fable 판정] GHL 단말기 화면 DuitNow QR(C01A) · 직불 D007 · UAT 근무시간 — 게이트 판정 (2026-10-07)

> 입력: `/home/irene/.claude/jobs/084aaec3/tmp/fable-input-duitnow.md` · 핵심 diff `duitnow-core.diff` · 설계 1회차 `.claude/fable-design-20261001-ghl-ecr.md` §2-4 · 추가판정 B/C-3 · `.claude/fable-design-20261004-terminal-void-direct.md` §4·§8-6 · 단일 기준 `docs/CARD_TERMINAL_ECR_DESIGN.md` §4-2
> 작성: Fable 5.1 · 코드 수정 0 · 운영 쓰기 0. 이 사안의 Fable 호출 2회차(게이트). 추가 호출 없음.

---

## 0. 판정 한 줄

**PASS — 개발서버 구현은 설계(2026-10-01 C-3 «버튼 + C01A 한 태그 + 분류(duitnow)»)의 절단면 안에 있고, 돈 규칙(승인 = ewallet/duitnow 고정, 서버 판정)·기본 꺼짐(기존 매장 변화 0)·보호파일 무접촉이 실호출·고장주입으로 증명됐다. 운영 배포 가능. 단, 매장에서 토글을 켜는 것은 실단말기 1회 확인 뒤다(아래 §4).**

---

## 1. 내가 직접 다시 돌린 것 (팀원 보고와 대조)

| 항목 | 팀원 보고 | 내 재실행 | 일치 |
|---|---|---|---|
| 코덱 단위 테스트 `tests/ghl-ecr.test.js` | 41/41 | 41/41 (신규 2건 포함: GHL 메일 샘플 5개 바이트 일치 · requestProduct/모르는 상품 거부) | ✓ |
| 🔒 인쇄 보호파일 지문 `check-print-guard.js` | 8/8 변경 없음 | 8/8 변경 없음 | ✓ |
| `health-check --category=terminal` | 12/12 | 12/12 (신규 «DuitNow C01A» 1건: 꺼짐 409·행 0 / 모르는 상품 400 / C01A 실림 / EA→E3 승인 = ewallet·duitnow / 같은 매장 평범한 판매 = card) | ✓ |
| `check-sensitive-diff.js` | ② PaymentModal.tsx 대상 | ② PaymentModal.tsx(이 사안) + BrandPaymentSettingsPage·migrate-brand-account·brand-account-settings(다른 방 사안, 이미 커밋 eb1797c79) · 안전망 변경 health-check.js = 신규 테스트 1건 추가(근거 있음) | ✓ |
| 번역 4개 언어 | — | pos 5키·settings 2키 en/ko/zh/ms 모두 있음 | ✓ |
| 데모 매장 38 설정 원복 | 건드리지 않음 | `card.terminal` = null(원복됨) · `operation_settings.requireVoidPin` = true(이 사안 이전 상태) | ✓ |

고장주입 2건(수단 고정 줄 제거 → «approved/card/null/null» 로 실패 · 설정 검사 무력화 → 실패)은 재실행하지 않고 **원리로 대조**했다: 목 단말기가 DuitNow 판매의 승인 응답에 일부러 D002·D018·PAN·입력방식을 싣지 않는다 → `tenderFromResult` 는 그 경우 반드시 `card` 를 돌려준다(코드 225~229줄) → 고정 줄이 없으면 health-check 가 ewallet 을 기대하므로 실패한다. 보고된 실패 문구와 정확히 맞는다. (팀원이 pm2 restart 뒤에 주입했다고 보고 — 규율대로.)

## 2. diff 범위 대조 — 설계 밖 변경 0

설계(2026-10-01 C-3)가 2단계 절단면으로 정한 것: **① DuitNow 전용 선택 ② C01A 한 태그 ③ 분류(duitnow)**. 실제 diff:

- `utils/ghlEcr.js` — `PRODUCT={duitnow:'DUITNOW QR'}` · `saleRequest({product})` 가 C01A 를 싣는다 · `requestProduct(hex)` 가 요청 원본에서 Product ID 를 읽는다. **②에 해당.** 표 칸을 안 늘리고 `request_hex` 를 단일 기록으로 쓴 것은 옳다 — 스키마 0.
- `services/terminalPayments.js` — `terminalConfig.duitnow`(기본 false) · `createSale` 이 모르는 상품 400 / 꺼진 매장 409 를 **행 생성 전에** 던진다(확인: 68줄이 `cents`·row.create 보다 앞) · `applyResponse` 가 판매(또는 reprint/check_status 자식의 부모) 요청 원본에 C01A duitnow 가 있으면 결과 수단을 `ewallet/duitnow/card_type=null` 로 고정. **③에 해당.** 고정 위치가 `pick(result)` 로 행·부모에 쓰기 **전**이라 부모 승격(`Recovered via check_status`)에도 그대로 실린다 — 맞다.
- `routes/terminal-payments.js` — `GET /config` 에 `duitnow` 노출 · `POST /transactions` 에 `product`(직원 경로만, 키오스크 분기는 넘기지 않는다 — diff 24줄 확인). 키오스크 화면은 `duitnow` 를 읽지 않는다(grep 0건).
- `PaymentModal.tsx` — 상태 1개(`terminalProduct`) · `runTerminalSale` 에 product 전달 · TerminalPanel 에 3개 prop. 승인 뒤 기록은 **기존** 963줄(`txn.tender_method==='ewallet'` → `onConfirmPayment('ewallet', …, txn.ewallet_type)`)이 그대로 받는다 — POS 신규주문 경로도 서버가 준 duitnow 로 기록된다. 🔒 POSTerminalPage 무접촉.
- `TerminalPanel.tsx` — 켠 매장만 «카드·손님 QR / 단말기 화면 DuitNow QR» 칩 · DuitNow 대기 문구. **①에 해당.** 설계 원칙 «POS 버튼 = 미리 알아야 하는 것»과 일치(카드·손님 QR 은 버튼 하나 유지).
- `CardTerminalSettings.tsx` — 토글 1개, 힌트에 «단말기에 DuitNow 가 활성된 매장만(GHL 에 문의)».
- `terminalSale.ts` — body 에 `product` 조건부 1줄. 기존 EA→E3 3초 간격 90초 루프 재사용(새 폴링 경로 없음 — 2026-06-25 «단순화» 원칙과 같은 방향).
- 테스트·목·e2e·문서(§4-2) — 증명 장치. `docs/CARD_TERMINAL_ECR_DESIGN.md` 2단계 목록에서 DuitNow 가 빠지고 §4-2 가 신설됐다.

워킹트리의 나머지(email.json 4개·poNotifications·notificationTemplates·BrandProductsTab·TRADE_STRUCTURE·`.claude/wip/`)는 **다른 방 사안**(외부공급업체 SOA/직원식사 · 판매자 지역배송비)이다. 이 판정의 범위 밖이며, 그 방의 판정문이 따로 있다(`fable-verdict-20261007-ext-soa-staffmeal.md` · `…-seller-delivery-zones.md`).

## 3. 배포 안전성

- 스키마 변경 0(설정 JSON 키 1개) · 마이그 0 · ENUM 0.
- **기본 꺼짐** = 운영 매장 전부 결제창·서버 동작이 오늘과 같다(토글을 켠 매장만 선택지가 생기고, 서버도 꺼진 매장은 409). 회귀 면이 «토글 켠 매장» 하나로 좁다.
- SW 버전은 배포 때 올린다(팀원 보고대로 — 프론트 변경이 다 끝난 뒤 마지막에).
- 롤백 = 직전 번들 재배포. 설정 키는 남아도 옛 코드가 읽지 않아 무해.
- `verify-all --full` 23/24 — 실패 1 = deploy-ready «releases 기록 파일 없음»(배포가 쓰는 기록, 코드 결함 아님). tsc = 알려진 막힘(react-i18next d.ts), 기준선 신규 0 게이트 통과.

## 4. 열린 것 — Irene 결정·할 일 (Fable 권고 포함)

### 4-1. 실단말기 확인 전에는 매장 토글을 켜지 않는다 (권고: 배포는 해도 됨, 켜기는 확인 뒤)
규격서는 C01A 를 «B4·Payhere ECR 전용», E3 도 «ECR 전용» 이라 하는데 우리 매장 단말기는 PayHere **Direct** 다. 팀원은 GHL 이 2026-09-28 메일에 **Direct 용** 이라며 준 샘플(ASCII 10바이트 «DUITNOW QR», E3 포함)을 따랐고, 우리 빌더가 그 샘플 5개를 바이트까지 똑같이 만든다. **GHL 샘플을 따른 선택은 옳다**(규격 표보다 그 단말기용으로 GHL 이 직접 준 프레임이 더 가깝다). 그러나 실단말기가 이걸 받는지, 응답에 무엇이 실리는지는 코드로 못 본다.
- 켠 매장에서 실패하면 보이는 것: 단말기가 D5(태그 누락)/D2(형식오류)/C1 로 거절 → 결제창에 «거절» 로 뜨고 **기록은 남지 않는다**(승인 아니면 기록 0 규칙). 돈이 틀어질 길은 없다. 캐셔는 «카드·손님 QR» 로 다시 하면 된다.
- **Irene 할 일(WhatsApp, GHL Anson Kok)** — 한 번에 묶어서:
  1. 매장 13 단말기(TID)에 **DuitNow QR 이 활성**돼 있는가. 안 돼 있으면 활성 요청.
  2. PayHere **Direct** 에서 C01A 값 «DUITNOW QR»(ASCII)과 Query Status(E3)가 메일 샘플대로 동작하는가(규격 표의 B4·ECR 전용 표기와 달라서 확인).
  3. (D007, 아래 4-2) MyDebit 카드를 D007 없이 대면 단말기가 계좌 종류(Saving/Current)를 **단말기에서 묻는가, 거절하는가**.
- 답이 오면: **평일 근무시간**(UAT 은행 연결)에 매장 13 설정 토글 켜고 RM0.10 «단말기 화면 DuitNow QR» 판매 1회 → 단말기에 QR 뜨는지 · 스캔 뒤 결제창이 자동으로 닫히는지 · 주문이 «이월렛·DuitNow» 로 기록되는지. 그 자리에서 Void 1회(GHL 샘플 Void 도 같은 송장으로 바이트 일치 확인됨). 통과하면 §4-2 에 «실단말기 확인 2026-xx-xx» 한 줄.

### 4-2. 직불 D007(Account Type) — 권고: 지금 구현하지 않는다(팀원 판단과 같다)
규격은 «Direct 에서 직불이면 필수» 라 하지만 계산대는 카드를 대기 **전에** 직불인지 모른다. 10-05 운영 VISA 승인 2건은 D007 없이 났다. 추측으로 넣으면(예: 항상 Saving 으로 보내기) 신용카드 승인에까지 영향을 줄 수 있고, 안 넣으면 MyDebit 에서 무슨 일이 나는지 실측 0건. **길이 데이터로 정해진다 — GHL 답(위 3번) 또는 MyDebit 1건 실측 뒤에 정한다.** 그 전까지 직불 첫 테스트는 피한다(2026-10-04 판정 그대로).

### 4-3. UAT 근무시간 — 코드 대상 아님
이미 기록돼 있다(메모리·§4-2). 실측 일정만 평일 낮으로 잡으면 된다.

## 5. 팀원 지시 (배포 전 · 판단 불필요한 것만)

1. **e2e J·K(주문 취소 Void) 2건 실패를 닫는다 — 제품 코드가 아니라 테스트 장치다.** 원인은 데모 매장 38 `operation_settings.requireVoidPin=true`(이 사안 이전 상태, 내가 DB 로 확인). 취소 경로 코드는 이번 diff 가 건드리지 않았다. `card-terminal.spec.js` 의 픽스처가 **원본을 먼저 저장하고** 테스트 동안 `requireVoidPin=false` 로 둔 뒤 복원하게 고치고(규칙: 검사가 설정 바꾸면 원본 파일 먼저 — `payment_settings` 와 같은 방식), J·K 3회 연속 통과를 보고에 붙인다. 매장 설정을 손으로 바꾸지 않는다.
   - **2026-10-07 19:42 완료 확인(Fable):** `card-terminal.spec.js` 만 변경 — `disableVoidPin()` 이 원본 `operation_settings` 를 `/tmp/e2e-card-terminal-ops38-*.json` 에 먼저 기록, 켜져 있을 때만 테스트 동안 false, `afterAll` 에서 원본값 복원. J·K 3회 연속 통과. 실행 뒤 DB: requireVoidPin=true · card.terminal=null(원복) — 내가 다시 읽어 확인. 제품 코드 변경 0 → 판정 불변, 마커 재발급.
2. 작업기록 `.claude/session-state.md` 의 «Irene 님 확인·결정 대기 — GHL: UAT 근무시간·직불(D007)·DuitNow QR» 항목을 «답 대기: GHL 질문 3개(§4-1) · 답이 오면 할 일 = 평일 실단말기 1회» 로 바꾼다.
3. 운영 배포는 Irene 지시가 있을 때 다음 배포 묶음에 포함(SW 버전은 그때). 배포 뒤 운영 재검사에 «토글 꺼진 매장 결제창 변화 0» 1건.

## 6. 관찰(수정 지시 없음 — 기록만)

- **미확인(timeout/comm_error) 상태의 DuitNow 판매를 Void 했을 때** `applyResponse` 의 void 분기가 `pick(result)` 로 Void 응답의 수단(브랜드 없으면 card)을 부모에 찍는다. 부모는 `voided` 라 결제 기록에 쓰이지 않으므로 돈 영향 0 — 보고서의 «취소된 거래 수단» 표기만 달라질 수 있다. 실단말기 Void 응답에 D018 «DuitNow QR» 이 실리면 자연히 맞는다. 실측 뒤에도 틀리면 그때 한 줄.
- 결제창 안에서 «DuitNow QR» 칩을 고른 상태는 그 결제창이 열려 있는 동안 유지된다(분할 결제의 다음 몫에도). 칩이 대기 화면에 항상 보이므로 캐셔가 바꿀 수 있다 — 그대로 둔다.
- 손님이 90초 안에 스캔하지 않으면 기존 «결과 미확인» 처리로 간다(Try again / 영수증 보고 수동 기록). 단말기 자체의 QR 표시 시간(GHL 스크립트 «DuitNow 조회 60초»)이 더 짧아 90초로 충분하다.

---

## Irene 보고 (그대로 전달)

✅ **판정: 통과.** 단말기 화면에 DuitNow QR 을 띄우는 결제가 개발서버에 들어갔고, 제가 테스트를 다시 돌려 확인했습니다(코덱 41/41 · 단말기 실호출 12/12 · 인쇄 보호파일 8/8 변경 없음). 돈 규칙 — «이 방식으로 승인되면 무조건 이월렛·DuitNow 로 기록, 서버가 정한다» — 는 일부러 망가뜨려 보는 검사까지 통과했습니다. 기본은 **꺼짐**이라 운영에 올려도 기존 매장은 아무것도 달라지지 않습니다. 운영 배포는 Irene 님이 지시하실 때 다음 묶음에 넣으면 됩니다.

**Irene 님이 하실 일 — GHL(Anson) 에 WhatsApp 으로 세 가지를 한 번에:**
1. 매장 13 단말기에 **DuitNow QR 이 켜져 있나요?** (안 돼 있으면 켜 달라고)
2. GHL 이 9월 28일 메일로 준 DuitNow 샘플(Product ID 글자 «DUITNOW QR», 상태조회 E3)이 **우리 단말기(PayHere Direct) 에서 그대로 되는지** — 규격서 표에는 다른 방식(ECR 전용)으로 적혀 있어서 확인이 필요합니다. 저희 코드는 GHL 샘플 쪽을 따랐고, 그게 맞는 선택입니다.
3. **직불카드(MyDebit)** 를 특별한 값(D007) 없이 대면 단말기가 «저축/당좌» 를 직접 묻는지, 아니면 거절하는지.

답이 오면 **평일 낮(UAT 은행 연결 시간)** 에 매장 13 설정에서 «단말기 화면 DuitNow QR» 을 켜고 RM0.10 한 번 → 단말기에 QR 이 뜨고 스캔하면 결제창이 저절로 닫히며 주문이 «이월렛·DuitNow» 로 남는지 보시면 됩니다. 그 전에는 **매장 설정을 켜지 마세요**(켜도 돈이 틀어지진 않지만, 단말기가 거절하면 «거절» 로만 뜹니다).

**직불 D007 은 지금 넣지 않습니다(권고).** 계산대는 카드를 대기 전엔 직불인지 모르고, 10월 5일 VISA 2건은 그 값 없이 승인됐습니다. 추측으로 넣으면 신용카드까지 영향을 줄 수 있어 GHL 답이나 MyDebit 1건 실측 뒤에 정합니다. 그때까지 직불 첫 테스트는 피합니다.

**확인할 곳**
- https://dev.purplehere.com/settings → 결제 → 카드 단말기: 단말기 켠 상태에서 «단말기 화면 DuitNow QR» 토글이 보이고 기본은 꺼져 있는지.
- https://dev.purplehere.com/pos → 카드 결제(단말기 연동 기기) 대기 화면: 토글 켠 매장만 «카드·손님 QR / 단말기 화면 DuitNow QR» 선택이 뜨는지. 꺼진 매장은 오늘과 같은지.

팀원에게는 e2e 취소 테스트 2건(데모 매장의 «취소 시 매니저 PIN» 설정 때문에 멈춘 것 — 이번 변경과 무관)을 테스트 장치 쪽에서 닫으라고 지시했습니다.
