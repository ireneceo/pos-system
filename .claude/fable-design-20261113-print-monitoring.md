# Fable 설계 — 인쇄 문제 기록 + 자동 점검 («인쇄 지킴이») · 2026-11-13

요청: `.claude/fable-request-20261113-print-monitoring.md` · Irene «다시 프린터 사용에 문제 생기는 것에 대해 로그 심어서 파악하고 우리가 알아서 체크할 수 없어?»

## 0. 결론

**할 수 있다. 🔒 인쇄 보호 파일 8개를 한 줄도 안 건드리고 된다.** 인쇄 동작(방식·타이밍·라우팅)은 그대로다.

매장 28 사건에서 재료는 이미 다 있었다 — 실패 신호(앱이 서버로 보냄), 설정 빈칸 판정(S5), 기기 상태(90초마다). 빠진 것은 세 가지뿐이다:

| 빠진 것 | 지금 | 고친 뒤 |
|---|---|---|
| ① 실패가 DB 에 안 남음 | 텍스트 로그에만(`[print-trace] CLIENT … ok=false`) → Print Health 는 «실패 0» | 같은 신호를 `print_events` 에도 한 줄 |
| ② 아무도 자동으로 안 봄 | 누가 자가진단을 열 때만 계산 | 1시간마다 전 매장을 규칙 6개로 점검 → «발견» 으로 저장 |
| ③ 우리에게 안 올라옴 | SA 가 화면을 열어 봐야 하고, 열어도 0 | Print Health 맨 위 «봐야 할 매장» + 매일 정기 점검 보고에 자동 포함 |

## 1. 실측으로 확인한 사실 (설계의 근거)

- `billPrint.js:2058 _printTrace` 는 **네이티브 앱에서만** 보낸다(`__NATIVE_PRINT` 없으면 즉시 반환). 본문 = `{type, printer, ok, info}` · `info` 는 `ver=0.3.4 fmt=… err=PRINTER_NOT_FOUND …` 문자열. `route-qz`/`route-browser` 줄은 `ok` 가 없다(경로 관찰용).
- `billPrint.js:4603` 통합 티켓 `_rep` 는 **플랫폼 구분 없이** 보낸다(`type:'consolidated'` · `orderNumber` · `ok`).
- → **브라우저(QZ·RawBT) 매장의 일반 주방 티켓 실패는 클라이언트가 지금 아무것도 안 보낸다.** 이건 🔒 파일을 고쳐야만 생긴다(§7 질문 2). 그 매장은 서버가 추론할 수 있는 것(규칙 R1·R3·R4)으로 본다.
- `server.js:468-475` 에 선례가 있다 — `pollerObserver` 가 🔒 `orders-crud.js` 를 안 건드리고 `res.on('finish')` 로 응답을 **관측만** 한다. 같은 방식을 쓴다.
- `print_events` 를 쓰는 곳은 `PrintSelfDiagnosePanel.tsx:201` 하나. 지우는 곳(보관 기한)은 없다.
- `routes/store.js:239` 의 «skipped» 는 직원이 **아무 설정이나** 저장할 때마다 찍힌다(본문에 printer_settings 가 실려 오므로). 그대로 세면 소음이다 → «실제로 프린터 설정을 바꾸려 했을 때만» 으로 좁혀야 신호가 된다(`printerSetupDevice.js` 의 `printerSettingsDiffer` 가 이미 있음).
- `is_auto_print`(`printDiagnostics.ts:121 readIsAutoPrint`)는 워크스테이션을 안 나눈 매장이면 매장 설정 `kitchenPrinter.autoPrint` 를 그대로 읽는다 → 로그인한 기기 전부가 1. 매장 28 의 «5대 전부 1» 이 이것.
- 정기 작업은 `isSchedulerOwner()` 프로세스만 켠다(`server.js:756~`) · `SchedulerRun` 으로 실행 기록.

## 2. 무엇을 기록하나 (심는 로그 3가지)

### 2-1. 인쇄 실패 → `print_events` (관측 미들웨어 · 신규 파일)

- 신규 `dev-backend/middleware/printTraceTee.js` + `server.js` 에 한 줄(`pollerObserver` 블록 바로 아래, `ordersRouter` 마운트 앞).
- 동작: `POST /api/orders/print-debug` 이고, 응답이 끝났고(`finish`), `statusCode===200`, `req.user.restaurant_id` 있고, **`req.body.ok === false`(정확히 false)** 일 때만 `PrintEvent.create` 를 fire-and-forget.
  - `outcome:'failed'` · `reason_code` = `info` 에서 `err=(\S+)` 를 뽑아 48자(없으면 `client_failed`) · `reason_detail` = `uid=<req.user.id> type=<type> ` + `info`(2000자) · `intended_printer` = `printer` · `order_number` = `orderNumber`(있을 때).
  - `ok` 가 true·없음이면 **안 쓴다**(성공·경로 관찰 줄은 양이 많고 분모는 주문 수로 충분).
- 안전: 요청·응답을 바꾸지 않는다(`next()` 먼저, 응답 뒤 기록). 전체 try/catch — 기록 실패가 응답·인쇄에 닿지 않는다. 매장당 **하루 200행 상한**(메모리 카운터 · 넘으면 버림 — 실패 폭주 때 DB 풀 보호, 운영 자원 부족 고려).
- 효과: Print Health «최근 실패» 칸과 자가진단 S7 이 **코드 변경 없이** 살아난다(둘 다 `outcome in (failed,fallback)` 을 센다).
- 알고 두는 것: S4 가 최근 `reason_code` 를 힌트로 쓰는데, 새 코드(`PRINTER_NOT_FOUND` 등)는 `KNOWN_REASONS` 밖이라 «generic» 문구로 나온다. 정상 폴백이라 이번 범위에서 안 고친다.

### 2-2. «직원이 프린터 설정을 바꾸려다 막힘» → `print_events`

- `routes/store.js` 의 printer_settings 분기(보호 아님): 건너뛴 이유가 역할(`reason==='role'`)이고 **들어온 값이 기존과 실제로 다를 때만**(`printerSettingsDiffer`) 한 줄: `outcome:'skipped'` · `reason_code:'settings_write_blocked'` · `reason_detail:'uid=… role=…'`. fire-and-forget.
- `restaurants-crud.js` 도 같은 `applyPrinterWrite` 를 쓰니, 두 라우트에 따로 넣지 말고 **`utils/printerSetupDevice.js` 가 «막혔고 달랐다» 를 결과에 실어 주게**(예: `blockedChange:true`) 하고 기록은 한 함수로.
- ⚠ 구현 전에 실측할 것: 메모리 «설정 저장은 빈 칸을 기본값으로 채움» 때문에 직원이 프린터와 무관한 저장만 해도 «다름» 으로 나올 수 있다. 개발서버에서 직원 계정으로 무관한 설정 저장 3회 → **0행** 이어야 한다. 0 이 안 나오면 이 2-2 와 규칙 R6 은 **빼고** 보고에 적는다(복잡하게 고치지 않는다).

### 2-3. 점검 결과 이력 → 신규 표 `print_watch_findings`

«언제부터 그랬고 언제 풀렸나» 를 남기는 표. 한 발견 = 한 행.

| 칸 | 뜻 |
|---|---|
| `id` BIGINT PK | |
| `restaurant_id` INT | |
| `code` VARCHAR(48) | 규칙 키(§3) |
| `severity` VARCHAR(16) | `critical` / `warn` / `info` (ENUM 쓰지 않음 — expand 사고 여지 없음) |
| `status` VARCHAR(16) | `open` / `resolved` |
| `evidence` JSON | 주방 이름·건수·기기 목록 등 사람이 읽을 물증 |
| `first_seen_at` · `last_seen_at` · `resolved_at` DATETIME | |
| `seen_count` INT | 연속 관측 횟수 |

- 색인: `(status, severity)` · `(restaurant_id, code, status)`.
- 수명: 규칙이 걸리면 열린 행을 찾아 `last_seen_at`·`evidence`·`severity`·`seen_count` 갱신, 없으면 새 행. 규칙이 안 걸리면 열린 행을 `resolved`. 다시 걸리면 **새 행**(재발 횟수가 이력으로 남는다). 정기 작업 주인이 하나라 경합 없음.
- 마이그: `scripts/migrate-create-print-watch-findings.js`(멱등 · `migrate-create-print-events.js` 와 같은 모양) + `migrations.registry.json` 에 `deploy` + `models/index.js` export.

## 3. 어디서 자동으로 점검하나 — 규칙 6개 · 1시간마다

신규 `services/printWatch.js`(판정 — DB 를 읽어 발견 목록을 돌려주는 함수, 쓰기 없음) + `services/printWatchScheduler.js`(매시 7분 · `isSchedulerOwner` 블록에 등록 · `SchedulerRun` job `print_watch_hourly` · 발견 upsert · 60일 지난 `print_events` 와 90일 지난 resolved 발견 삭제(회당 5000행 상한)).

대상 매장: 최근 48시간 안에 주문이 있거나 기기 보고가 있는 매장만(죽은 매장 제외). 데모·시험 매장도 계산은 하되 `evidence.demo=true` 를 달아 화면·보고에서 기본으로 뺀다(판정은 기존 실고객 표시 기준 — 메모리 reference_real_customer_flag).

| 코드 | 무엇을 잡나 | 판정 (서버 데이터만) | 심각도 | 이번 사건에서 |
|---|---|---|---|---|
| `setup_gap` | 프린터 안 정해져 종이가 안 나올 주방 | 매장 `printer_settings` + 켜진 주방 목록 → `findPrinterSetupGaps` 와 **같은 규칙** | critical | Noodles 주방(24) 빈칸 |
| `print_failures` | 기기가 보고한 인쇄 실패 | `print_events` 24h `outcome in (failed,fallback)` ≥1 · 사유별·프린터별 건수 | 1~4건 warn · 5건 이상 critical | PRINTER_NOT_FOUND 10건 |
| `unprinted_orders` | 자동 인쇄가 켜졌는데 안 나간 주문 | 자동 인쇄 켜짐(S1 과 같은 식) && 10분~24시간 전 주문 중 `needs_print=true`·미삭제 ≥1 | critical | (브라우저 매장의 주 안전망) |
| `multi_auto_print` | 자동 인쇄 기기가 여럿 | 24h 안에 보고한 `is_auto_print=1` 기기 ≥2 · 기기 목록 | warn | 5대 전부 1 |
| `old_app` | 결함 있는 옛 앱 | 7일 안에 보고한 앱 기기의 `app_version` < 기준판(상수 한 곳: android-app `0.4.1`) | warn | 0.3.4 |
| `settings_blocked` | 권한 없는 사람이 프린터 설정을 고치려 함 | `print_events` 24h `settings_write_blocked` ≥3 | info | 사용자 69 · 10건 |

규칙별 주의:
- **`setup_gap`** — 화면용 `dev-frontend/src/utils/printerSetupGaps.ts` 를 서버에 `dev-backend/utils/printerSetupGaps.js` 로 옮긴다. 같은 규칙이 두 벌이 되므로 **같은 입력·기대값 JSON 한 벌**(`dev-backend/tests/fixtures/printer-setup-gaps.json`)을 양쪽 테스트가 읽게 해 어긋나면 테스트가 깨지게 한다. «켜진 주방» 기준은 11-12 커밋(184388306)이 화면에 넘기는 목록과 같은 조건. 한계: 서버는 매장 설정의 `printerMode` 만 안다(기기 사본이 다르면 다를 수 있음) — evidence 에 `basis:'store_settings'`.
- **`unprinted_orders`** — 자동 인쇄를 끄고 수동으로 찍는 매장은 `needs_print` 가 원래 쌓인다(print-diagnostics S3 주석). 반드시 «자동 인쇄 켜짐» 일 때만. 취소 주문 등 오탐 수준은 §6 기준선 실측에서 본다.
- **`multi_auto_print`** — 정상적으로도 흔할 수 있다(워크스테이션을 안 나눈 매장은 구조상 전부 1). 그래서 warn 이고, 기준선 실측에서 매장 대부분이 걸리면 조건을 «보고 기기 중 프린터 방식·플랫폼이 서로 다름» 으로 좁힐지 판정한다(Fable 검증 때). **자동 인쇄 구조 자체는 이번에 건드리지 않는다.**
- **`old_app`** — 기준판 상수는 새 앱을 낼 때 같이 올린다(`docs/PRINT_SELF_DIAGNOSE_DESIGN.md` 새 절에 한 줄). Windows 앱 기준판은 확인된 것이 없으면 넣지 않는다.

## 4. 누가 어떻게 보나

1. **관리자(SA) › Print Health 맨 위 «Needs attention»** — 열린 발견 목록(심각한 것 먼저): 매장 · 무엇(쉬운 한 줄) · 언제부터 · 물증 한 줄(주방 이름 / «PRINTER_NOT_FOUND ×10 · KITCHEN» / 기기 5대). 아래 접힌 «지난 7일에 풀린 것». 데모 매장은 기본 숨김(토글).
   - 신규 `GET /api/print-diagnostics/watch` — `authenticateToken + requireRole('System Admin')` 만(브랜드 범위는 이번에 안 연다 — 보안 경계를 넓히지 않는다).
   - 화면은 공용 `DataTable`·`DataTableEmpty` 그대로, 장식 이모지 없음, 날짜는 매장 타임존 유틸. 문구는 `printDiagnostics` 네임스페이스 4개 언어.
2. **매일 정기 점검(개발서버 Claude 방)** — 신규 읽기 전용 스크립트 `scripts/print-watch-report.js`: 열린 발견 + 지난 24h 새로 생긴 것·풀린 것을 글로 출력. 정기 점검이 운영 읽기 조회 때 이걸 돌려 보고에 «인쇄 지킴이: 새 문제 N · 계속 M · 풀림 K (매장·한 줄)» 를 넣는다 → 상황판으로 Irene 에게 간다. 이게 «우리가 알아서 체크». 정기 점검 절차 문서(/개발시작 이 읽는 곳)에 한 단계 추가.
   - 같은 스크립트에 `--dry-run`: 발견 표를 안 쓰고 `printWatch` 판정만 돌려 출력(기준선 실측·운영 배포 전 확인용).
3. **매장 쪽** — 11-12 에 넣은 화면 알림·설정 상자(184388306) 그대로. 이번에 추가 없음.
4. **메일·푸시 없음(1차)** — §7 질문 1.

## 5. 구현 범위 · 파일

신규(백엔드): `middleware/printTraceTee.js` · `utils/printerSetupGaps.js` · `services/printWatch.js` · `services/printWatchScheduler.js` · `models/PrintWatchFinding.js` · `scripts/migrate-create-print-watch-findings.js` · `scripts/print-watch-report.js` · `tests/print-watch.test.js` · `tests/fixtures/printer-setup-gaps.json`
수정(백엔드): `server.js`(관측 한 줄 + 정기 작업 등록 한 줄) · `models/index.js` · `routes/print-diagnostics.js`(`/watch` 추가만 — 기존 S1~S8·fleet 무변경) · `utils/printerSetupDevice.js` + `routes/store.js`·`routes/restaurants-crud.js`(2-2, 실측 통과 시만) · `scripts/migrations.registry.json` · `scripts/health-check.js`(print 카테고리 2건 추가 — §6)
수정(프론트): `pages/Admin/PrintHealthPage.tsx`(맨 위 절) · `public/locales/*/printDiagnostics.json` 4개 · `utils/printerSetupGaps.test.ts`(공용 fixture 읽기)
문서: `docs/PRINT_SELF_DIAGNOSE_DESIGN.md` 에 «자동 점검(인쇄 지킴이)» 절 추가(새 문서 만들지 않음) · 정기 점검 절차.

**무접촉(어기면 중단)**: 🔒 8개 파일 전부 — 특히 `billPrint.js` · `orders-crud.js`(print-debug 라우트 본문 그대로) · `MainLayout.tsx`. 자동 인쇄 설정·claim·폴러. 메일 발송. 기존 S1~S8 판정식.
설계와 다른 판단이 필요해지면(예: 🔒 파일을 안 고치고는 안 되는 지점) 즉시 멈추고 Fable 에게.

## 6. 검증 방법

기계로 가르는 것(팀원):
1. `check-print-guard.js` 변경 0건(전·후).
2. 관측 미들웨어 실호출(데모 매장 38 토큰): `ok:false` + `err=PRINTER_NOT_FOUND` → `print_events` +1·`reason_code` 맞음 / `ok:true` → +0 / `ok` 없음(route-qz 모양) → +0 / 토큰 없음 → 401·+0 / 응답 본문은 넣기 전과 동일(`{success:true}`).
3. **반증(고장주입)**: `server.js` 한 줄을 빼면 health-check 새 케이스가 실패하는지 1회 · `PrintEvent.create` 를 던지게 해도 응답 200 인지 1회(HTTP 주입은 pm2 restart 뒤).
4. 규칙 단위 테스트: 6개 규칙 각각 «걸림·안 걸림» 입력 + `setup_gap` 은 프론트와 같은 fixture. 수동 인쇄 매장(자동 꺼짐)에서 `unprinted_orders` 가 **안** 걸리는 사례 포함.
5. 수명 실호출(데모 38 · 원본 먼저 저장하고 끝나면 복원): 주방 칸 주소 비움 → 작업 함수 실행 → `setup_gap` open → 한 번 더 실행 → 같은 행 `seen_count` 2(행 안 늘어남) → 복원 → 실행 → resolved. health-check `print` 카테고리에 «관측 기록» · «발견 열림→풀림» 2건 상시 등록.
6. `/watch`: SA 200 · 매장 관리자·브랜드 403 · 익명 401.
7. 2-2 소음 실측: 직원 계정 무관 저장 3회 → 0행 / 프린터 칸 바꾼 저장 → 1행·설정은 안 바뀜.
8. 프론트는 변경 확정 뒤 빌드 1회 → `verify-all --full` 1회. Print Health 실브라우저: 발견 있음·없음(빈 상태) 둘 다.
9. **운영 기준선(배포 전)**: 정기 점검 방이 운영 읽기 전용으로 `print-watch-report.js --dry-run` → 규칙별 걸리는 매장 수를 기록. 이 숫자가 `multi_auto_print`·`unprinted_orders` 오탐 판정의 근거.

Fable 검증 1회(끝난 뒤 · gate): 새 표 운영 마이그 + 🔒 라우트 옆 관측 + 정기 작업 추가라 대상이다. 넘길 것 = diff 범위(위 «무접촉» 대조) · 2~7번 숫자 · 9번 기준선 숫자. 인쇄 동작을 안 바꾸므로 실프린터 확인은 필요 없다.

## 7. Irene 에게 물을 것 — 둘 다 기다리지 않고 권고대로 진행

1. **새 인쇄 문제가 잡히면 메일로도 알릴까요?**
   - 예 → 하루 1통(새 critical 있을 때만) SA 에게. 화면을 안 열어도 안다. 단, 초기 오탐이 메일로 간다.
   - 아니오 → Print Health 화면 + 매일 정기 점검 보고(상황판)로만.
   - **Fable 권고: 지금은 아니오.** 규칙 6개의 오탐 수준을 운영에서 2주 본 뒤 정한다. 정기 점검 보고가 매일 상황판에 올라오므로 그 사이 놓치는 것은 없다. 외부 발송이라 켜는 것은 Irene 지시가 있을 때만.
2. **브라우저(QZ·RawBT) 매장의 «종이 실패» 까지 기록하려면 🔒 `billPrint.js` 에 관찰용 줄을 넣어야 합니다 — 넣을까요?**
   - 지금 기록되는 것: 앱 매장의 모든 실패 + 전 매장의 통합 티켓 실패. 브라우저 매장은 «안 나간 주문»·«설정 빈칸»·«기기 여럿» 으로만 본다(서버 추론).
   - 넣으면: QZ 실패 사유까지 남는다. 대신 보호 파일 변경이라 Irene 승인 + 실프린터 확인 1회가 든다. RawBT 는 넣어도 성공 여부를 기기가 모른다.
   - **Fable 권고: 지금은 넣지 않는다.** 1차를 운영에서 돌려 «서버 추론으로 못 잡은 브라우저 매장 사고» 가 실제로 나오면 그때 묶어서 한 번에.

두 질문 모두 구현을 막지 않는다 — 보고에는 ⏸ 가 아니라 ✅ 아래 «정할 것(권고대로 진행 중)» 으로 Fable 권고와 함께 적는다. 운영 반영은 다음 배포 때.

## 8. 이 설계가 못 잡는 것 (감추지 않는다)

- 브라우저 매장에서 «찍혔다고 표시됐는데 종이가 안 나옴/다른 프린터로 나감» — 클라이언트만 아는 일(질문 2).
- 점검이 1시간 간격이라 «지금 이 순간 안 나옴» 의 실시간 경보는 아니다. 매장 실시간 알림은 기존 KDS 미인쇄 알림·11-12 설정 알림이 맡는다.
- 0.3.4 등 옛 앱이 `print-debug` 를 안 보내는 경로로 실패하면 안 남는다(그래서 `old_app`·`setup_gap` 이 따로 있다).
- 서버 재시작 직후 하루 상한 카운터는 0 으로 돌아간다(상한이 느슨해질 뿐, 해 없음).
