# Fable 판정(gate) — 인쇄 지킴이 구현 · 2026-11-13

설계 `.claude/fable-design-20261113-print-monitoring.md` · 요청 `.claude/fable-gate-request-20261113-print-monitoring.md`

## 판정: PASS (운영 반영 가능 — 다음 배포 때)

되돌리기 어려운 세 가지(새 표 운영 마이그 · 🔒 라우트 옆 관측 · 새 SA 라우트)는 모두 설계 범위 안이고 실행으로 확인됐다. 인쇄 동작은 바뀌지 않는다. 남은 것은 «신호 품질»(오탐 수준)이며 매장에 닿지 않고 코드로 언제든 고칠 수 있어 배포를 막지 않는다 — 아래 «배포 뒤 첫 읽기에서 할 일» 로 미리 정해 둔다.

## 1. 내가 직접 다시 돌린 것 (숫자)

| 항목 | 결과 |
|---|---|
| `check-print-guard.js` | 8/8 변경 없음 · 보호 파일 6경로 `git diff --stat` 0줄 |
| `health-check --category=print` | 14/14 (새 3건 포함: 관측 기록 · /watch 권한 · 발견 수명) |
| jest `print-watch` + `printer-setup-device` | 44/44 |
| 수명 검사 뒤 데모 매장 38 `printer_settings` | 검사 전·후 MD5 같음(`f0008eac…`) — 복원 확인. 칸 타입이 TEXT 라 문자열 그대로 되돌아감 |
| `judge()` 직접 호출 — 매장 28 사건 모양 | setup_gap critical · print_failures critical · multi_auto_print warn · old_app warn · settings_blocked info (설계 표와 일치) |
| `judge()` — 자동 인쇄 끈 매장 + 미인쇄 9건 + 막힘 2회 + 기준판 앱 + 윈도 앱 | 발견 0 (수동 인쇄 매장 오탐 없음 · 기준 미달 아님) |
| `print-watch-report.js --dry-run --all` (개발 DB) | 대상 4 · setup_gap 3 · multi_auto_print 2 · old_app 1 — 요청서 숫자와 일치 |
| 4개 언어 문구 | en·ko·zh·ms 각 25키 · `admin.severity.info` 있음 |
| 번들·서버 최신 여부 | 화면 소스 02:08 < 번들 02:10 · 서버 파일 02:04 ≤ pm2 시작 02:04 — 옛 번들·옛 프로세스를 검사한 것이 아님 |
| `check-sensitive-diff` | ③ 마이그 3파일 · ⑤ printTraceTee·server.js — 예상한 그대로, 그 밖의 민감 접촉 없음 |

## 2. diff 범위 대조 (설계 «무접촉»)

- 🔒 8개 파일 무접촉. `orders-crud.js` 의 print-debug 본문 그대로(읽기만 함).
- `server.js` 두 줄(관측 · 정기 작업 등록, 등록은 `SCHEDULER_OWNER` 블록 안) · `print-diagnostics.js` 는 `/watch` 추가뿐(S1~S8·fleet 무변경) · `store.js`·`restaurants-crud.js` 각 1줄 · `printerSetupDevice.js` 는 `blockedChange` 계산과 기록 함수 추가(저장 판정 결과 action/value 는 그대로).
- 관측 미들웨어: 요청·응답 무변경, 응답 뒤 기록, 매장 번호는 토큰에서만(본문으로 남의 매장에 못 씀), 문자열 길이 자름, 하루 200행 상한.
- `/watch`: `authenticateToken + requireRole('System Admin')` — RA·BG 403, 익명 401 확인.
- 마이그: 새 표 CREATE 하나 · 멱등 · ENUM 없음 · `process.exit` 있음 · 레지스트리 `deploy`. 롤백은 표를 둔 채 코드만 되돌리면 된다(표가 없어도 서버는 뜨고 정기 작업만 error 로 기록).
- 설계와 다르게 한 1건(정기 점검이 스크립트 대신 `prod-query` SELECT 로 읽음): **수용.** 정기 점검 방의 운영 접근 규칙에 맞춘 것이고 결과는 같다.
- 테스트 정규식 1줄을 좁힌 것(`printerMode 기본값`)은 더 엄격해진 쪽이라 문제 없음.

## 3. 확인 못 한 것 (감추지 않는다)

- **운영 기준선(§6-9) — 확인 불가.** 내가 `prod-query.js` 읽기 조회를 1회 시도했으나 권한 창에서 거부됨. 우회하지 않았다. → 배포 뒤 첫 읽기가 기준선이 된다(아래 4).
- HTTP 고장주입 2건(관측 줄 제거 → 검사 실패 / 기록 throw → 응답 200)과 실브라우저 화면, `verify-all --full` 은 팀원 실측을 받았고 내가 다시 돌리지 않았다(서버·번들이 그 뒤 안 바뀐 것은 위 시각으로 확인).
- 직원 «실브라우저» 저장 경로의 소음(2-2)은 API 로만 잼.

## 4. 배포 뒤 첫 읽기(0-C단계)에서 할 일 — 미리 정해 둠(다시 Fable 부르지 않아도 됨)

첫 정기 점검 때 규칙별 걸린 실고객 매장 수를 보고에 적는다. 그리고:

1. **프린터 설정을 한 번도 저장 안 한 매장** — 실측: 개발 매장 6·39 는 `printer_settings` 가 NULL 인데 `setup_gap`(«Kitchen printer»)이 걸린다. 모델 getter 가 빈 설정을 `kitchenPrinter {enabled:true, autoPrint:true, method:'qztray', address:''}` 로 채워 주기 때문이다. 같은 이유로 그런 매장은 `unprinted_orders` 도 걸릴 수 있다(자동 인쇄 기본값 켜짐). 실고객 매장에서 이 모양이 보이면: `evaluate` 에서 원본 값(`getDataValue('printer_settings')`)에 `kitchenPrinter`·`kitchenStationPrinters` 가 둘 다 없을 때 그 두 규칙의 심각도를 `info` 로 낮추고 `evidence.unconfigured=true` 를 단다 + 단위 테스트 2건. 데모 매장만 걸리면(기본 숨김) 그대로 둔다.
2. **`multi_auto_print`** — 실고객 매장 절반 이상이 걸리면 설계 §3 대로 «보고 기기의 방식·플랫폼이 서로 다를 때» 로 좁힌다.
3. **정기 작업 걸린 시간** — `scheduler_runs.duration_ms` 가 5초를 넘으면 `orders` 조회 두 개에 `order_date >= (48시간 전 날짜 - 1일)` 조건을 더한다(`idx_orders_restaurant_date` 를 타게). 지금은 `createdAt` 색인이 없어 전체를 한 번 훑는다 — 매장 폴러가 몇 초마다 하는 조회와 같은 모양이라 시간당 1회는 막을 이유가 아니다.

세 가지 모두 보호 영역·돈·권한에 닿지 않는 조정이라 팀원이 하고 보고에 «Fable 판정서 §4 대로» 라고 적으면 된다.

## 5. 알고 두는 작은 것 (지금 고치지 않음)

- 매장이 48시간 대상에서 빠지면(휴무 등) 열린 발견이 풀리지도 갱신되지도 않고 남는다(`last_seen_at` 만 옛것). 문제가 사라진 게 아니라 못 본 것이므로 열린 채 두는 쪽이 안전 — 화면에 «마지막 확인» 표시는 다음에.
- 진단 S4 의 «최근 사유» 힌트가 새 코드(`PRINTER_NOT_FOUND`·`settings_write_blocked`)를 읽으면 일반 문구로 나온다(설계 §2-1 에 적은 폴백). `settings_write_blocked` 가 힌트로 잡히는 것은 뜻이 어긋나니 S4 를 다음에 손볼 때 `outcome='skipped'` 를 빼는 것을 같이.
- health-check 수명 검사가 돌 때마다 개발 DB 에 풀린 데모 행이 1개씩 남는다(지금 6행 · 데모라 기본 숨김 · 90일 뒤 정리). 검사 끝에 자기가 만든 행을 지우면 깔끔하다 — 급하지 않음.
- 토큰에 매장 번호가 없는 계정(오너·브랜드 계정으로 POS 를 쓸 때)의 실패 보고는 안 남는다. 기존 텍스트 로그도 같은 한계(`rid=NaN`).
- 실고객 표시(`is_real_customer`)가 안 세워진 새 실매장은 «데모» 로 분류돼 기본 숨김이다 — 기존 플랫폼 규칙과 같다(새 실고객은 플래그를 세운다).

## 6. 판정 범위 밖 (이 마커가 보증하지 않는 것)

같은 작업 디렉터리의 다른 미커밋 — `.claude/deploy-manifest.json` · `dev-backend/releases/*` · GTM 4파일(`tracking.ts`·`index.html`·`MARKETING_TRACKING.md`·`gtm-container-purplehere.json`) · `playwright.config` · oneoff 스크립트들. 게이트 지문은 이것들까지 한 덩어리로 해시하지만 **검증하지 않았다.** 특히 GTM 변경은 컨테이너 게시 전 운영에 나가면 GA4 가 멈춘다고 그 파일 주석이 말한다 — 배포 방이 따로 확인할 것.

## 7. Irene 에게 — 정할 것(기다리지 않고 권고대로 진행 중 · 설계 §7 그대로)

1. **새 인쇄 문제가 잡히면 메일로도 알릴까요?** — Fable 권고: 지금은 아니오. 운영에서 2주 오탐 수준을 본 뒤.
2. **브라우저(QZ·RawBT) 매장의 «종이 실패» 까지 기록하려고 🔒 `billPrint.js` 에 관찰용 줄을 넣을까요?** — Fable 권고: 지금은 넣지 않는다. 서버 추론으로 못 잡은 사고가 실제로 나오면 그때 묶어서 한 번에(보호 파일이라 승인 + 실프린터 확인 1회 필요).

새로 생긴 질문은 없다.
