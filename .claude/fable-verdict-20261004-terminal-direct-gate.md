# Fable 게이트 판정 — 2026-10-04 카드단말기 PayHere Direct 대비(Notify 처리) · 찾기용 Echo 행 0 · 프로필 칸 · 앱 새로고침 (SW 5.78 · APK 0.3.3)

**판정: PASS (조건부 — 아래 §4 조건은 배포 뒤 Irene 실측에 붙는 것, 코드 조건 아님)**
판정자: Fable 5.1 · 작성 2026-10-04 12:0x UTC

## 1. 왜 게이트 대상인가
- `check-sensitive-diff` ① 🔒 보호영역 접촉 1건(`dev-frontend/src/components/Layout/MainLayout.tsx`) · ⚠ 안전망 자체 1건(`scripts/health-check.js` 신규 케이스 추가).
- 돈 경계: `services/terminalPayments.applyResponse` 해석 경로가 바뀜(단일 parseFrame → pickResultFrame). 카드 결제 승인·거절 판정의 입구다.

## 2. 내가 직접 확인한 것 (코드 리뷰만으로 끝내지 않음)
### 2-1. diff 범위 대조 — 설계 외 변경 0
16 파일 +150/−26, 미추적 1(releases JSON). 전부 읽음.
- `utils/ghlEcr.js`: `CMD.notify=0xC2` · `pickResultFrame` 신설. 분할 규칙 `end = p+10+len+3` 은 `parseFrame` 의 길이식 `1+9+len+2+1` 과 동일, GHL 메일 Postman 프레임(`02 000C 010B 01 E6 00 001B … 551A 03`)으로 손으로 재계산 — 명령 [6]=E6, 상태 [7]=00, 길이 [8..9]=0x1B=27, 데이터 10+9+8=27, CRC 뒤 ETX. 레이아웃 일치.
- 조각마다 `parseFrame`(CRC 포함) 통과 필수 → 손상 조각 1개면 전체 거부. 잡바이트 `FRAME_DELIMITER`, 잘림 `FRAME_LENGTH`. «고르기로 위조를 덮지 않는다» 가 코드에 실제로 있다.
- `applyResponse`: 되돌림 검사(FRAME_REFLECTED) → pickResultFrame → 명령 대조 → 금액 대조 → 송장 대조(INVOICE_MISMATCH) → 승인인데 금액 없음 거부(AMOUNT_MISSING). **방어 5겹 그대로**, 바뀐 것은 해석 1줄 + ACK 전용 검사가 pickResultFrame 안으로 이동(FRAME_ACK_ONLY 코드 유지).
- «마지막 결과 프레임» 선택 — 결과 프레임이 둘 오는 경우(옛 거래 잔류)는 명령·금액·송장 대조가 뒤에서 잡는다. 수용.
- `createEcho({probe})`: probe=true 면 `TerminalTransaction.create` 를 타지 않고 `{id:null, request_hex, timeout_ms, connection}` 반환. 프론트 두 호출부(`CardTerminalSettings.runFind`, `terminalSale.findTerminal`)는 `data.request_hex` 만 쓰고 `id` 를 어디에도 보내지 않음(`/transactions/:id/response` 호출 없음) — `id:null` 이 깨뜨리는 곳 없음. 연결 테스트(runTest)는 그대로 행 생성 → 응답 반영. 운영 'sent' 9행의 원인 경로가 막힘.
- 안드로이드 `NativeEcrPlugin.kt` tcp 루프: `end = s+10+len+2` 가 ETX 인덱스 — 서버 식과 동일. `isNotify=(frame[s+6]==0xC2)` 건너뜀 1줄. http-hex 경로는 본문 전체를 서버에 올리고 서버가 고름 — 일관.
- `desktop-pos/src/ecr/exchange.js` 동일 1줄(설치본 미빌드 — 데스크탑 실사용 0, remaining 에 명시됨).
- 🔒 `MainLayout.tsx`: styled 상수 5개(UserInfo/UserCard/UserAvatar/UserName/UserEmail) · `RotateCw` import · `isInApp`/`reloadApp` · 도움말 버튼 2곳. **diff 안 'print' 문자열 0줄**(`git diff … | grep -ci print` = 0). `_printPollFn` 무접촉. 새로고침은 `window.location.reload()` — 주방인쇄는 POS1 폴러 DB 단일경로라 새로고침으로 티켓이 분실되지 않는 구조(폴링=안전망). 당겨서 새로고침은 넣지 않음(주석에 이유). `isInApp` 은 렌더마다 재평가 → 늦은 브릿지 주입도 도움말을 여는 순간 반영. `__PURPLE_DESKTOP` 은 데스크탑 preload **와** 안드로이드 `nativePrintBridge.js:22` 둘 다 세움 → «앱(안드로이드·Windows)» 표기 사실.
- i18n `nav.reload` 4언어 · sw.js 5.78 · releases JSON 형식 정상.

### 2-2. 가드·게이트 (내가 재실행)
- `jest tests/ghl-ecr.test.js` **34/34** (신규 6: 단일 그대로 · Notify×2+ACK+결과→결과만 · Notify만 FRAME_NOTIFY_ONLY · ACK만 FRAME_ACK_ONLY · CRC 손상 조각 거부 · 잡바이트 거부).
- `health-check --category=terminal` **8/8** (신규: Notify+결과 이어붙음→approved · Notify만→422 · probe Echo 행 0).
- `check-sensitive-diff` → ① 1건 = 대상 판정 정상 작동.
- 고장주입(팀원 보고, 비공허 확인): 코덱 Notify 제외 제거→jest 1건 실패→원복 34/34 · applyResponse 옛 단일 해석 되돌림→pm2 재시작 후 신규 케이스 FRAME_LENGTH 로 실패(=승인 버림 재현)→cp 원복·재시작 8/8. 두 주입 모두 **바뀐 그 줄**을 겨눔 — 엉뚱한 경로 아님.
- APK: `dev-frontend-build/desktop/PurplePOS-0.3.3.apk` sha256 `f4a98c27…` = `PurplePOS.apk` = `android-latest.json` sha · versionCode 6 · signer `b55813cf…` 동일(덮어 설치). APK mtime 11:34:39 > `NativeEcrPlugin.kt` 11:33:57 / `build.gradle` 11:34:01 → 현재 소스로 빌드됨. 배포 7a 단계가 `desktop/` 를 운영에 동기화.
- 서빙 번들 `dev-frontend-build/sw.js` = 5.78 확인.

### 2-3. 규격 대조
- §3.4.2 Notify «receiver **if required** will reply», §5.2 Notify «Applicable only for Payhere Direct», 5.2.2 Response 는 **빈 표**(정의 없음). ACK Indicator(§4 헤더 6번): 0x00=ACK 불요 / 0x10=ACK 요구. 즉 단말기 Notify 가 ACK 를 요구하는지는 **그 프레임의 [7] 바이트가 정한다** — 우리 브릿지는 Notify 에 ACK 를 보내지 않는다. 단말기가 0x10 으로 보내고 ACK 를 기다리면 결과가 늦어 TIMEOUT → Reprint 복구 경로로 떨어진다(돈은 안 틀어짐, 느릴 뿐). 이전 코드는 Notify 가 오면 어차피 승인을 버렸으므로 **회귀 아님**, 개선분만 있다.

## 3. 받아들인 한계 (확인 불가 — 추측하지 않음)
1. 실단말기가 Notify 를 **실제로** 보내는지, HTTP 본문에 어떤 형태로 담기는지 — 단말기가 33898 연결을 거절 중이라 실측 불가. 코드는 «프레임 하나면 종전과 동일» 이라 Notify 가 안 와도 손해 없음.
2. Notify ACK 요구 여부(§2-3) — 첫 실거래 로그의 `response_hex` 로 확정.
3. Direct 직불(MyDebit) 판매의 D007 Account Type — 규격 «Mandatory for Debit if Payhere Direct». 지금 코드는 넣지 않음 → 직불 카드 첫 테스트는 단말기가 **거절**할 수 있다(돈 손실 아닌 가시적 거절). releases remaining 에 적혀 있음. 첫 RM1 테스트는 신용카드·QR 로.

## 4. 핵심 사실 — 이 배포가 Irene 의 «안 잡혀» 를 고치는가
**아니다.** 운영 기록: 직접 입력 Echo 3회 전부 `CONNECT_REFUSED`, 자동 찾기 253대 응답 0. 우리 요청 프레임은 GHL 예시와 바이트까지 일치(CRC 551A). 연결을 **단말기가 거절**하고 있다 = 단말기 쪽 로컬 ECR(33898 수신)이 켜져 있지 않다. GHL 자료 전수에 활성 방법 없음. 이 배포는 (a) 단말기가 켜졌을 때 Direct 특유의 진행 알림 때문에 승인을 버리지 않게 미리 막고, (b) 자동 찾기가 기록을 더럽히던 것을 멈추고, (c) 화면 2건을 고친다. **연결 자체는 GHL/단말기 쪽 조치가 필요하다** — 보고에 이 순서를 분명히.

## 5. 순서 결정 — bless 먼저, 마커 나중 (실행 완료)
`scripts/print-guard.manifest.json` 은 **git 추적 파일** → bless 가 내용을 바꾸면 `git diff HEAD` 가 바뀌고 fable-gate 지문이 죽는다. 그래서 순서는:
1. `check-print-guard.js --bless` → 기준 등록 2026-10-04T12:00:38Z ✓ → 재검 **8/8 변경 없음** ✓
2. `health-check --category=print` **11/11** ✓ (bless 뒤 인쇄 계약 재확인)
3. 이 판정문 · bless-log 기록 (둘 다 지문 포함)
4. `fable-gate.js pass` (마지막)
**팀원이 이 뒤에 한 줄이라도 고치면 마커가 죽는다 — 그때는 다시 가져올 것.** session-state.md 만 예외.

## 6. 배포 뒤 확인(팀원 실행·Fable 판정 아님)
- 운영 `/desktop/android-latest.json` versionName 0.3.3 · sha `f4a98c27…` · 운영 sw.js 5.78.
- 운영 `terminal_transactions` 에 command=echo & status=sent **신규 행 0** (자동 찾기 뒤에도) — probe 경로 증명.
- Irene 태블릿: 앱 0.3.3 카드 → 업데이트 → 사이드바 프로필 칸·도움말 «새로고침» 보임.
- 단말기 로컬 ECR 활성 뒤 첫 RM1(신용카드 또는 QR) 거래의 `response_hex` 를 보고 Notify 유무·ACK Indicator 확정 → D007 결정.
