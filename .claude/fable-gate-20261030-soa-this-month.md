# Fable 게이트 판정 — 월 정산서 «This month (up to today)» 미래 오류 고침 (2026-10-30 · 작업방 72ac6d2a)

요청서: `.claude/fable-request-20261030-soa-this-month.md` · diff: `.claude/fable-gate-20261030-soa-this-month.diff` (4파일)
판정 주체: Fable (개발서버 실호출·코드 실측 · 운영 쓰기 0 · fable-gate 마커 안 찍음 — 작업 폴더에 다른 방 d5ebceff 변경이 섞여 있음)

## 판정: **조건부 PASS**

고침 자체는 맞고 단순하다 — «이번 달» 의 날짜를 화면(브라우저 시계)이 아니라 서버가 **구매 매장 달력**으로 만든다. 운영 사고(한국 자정 넘어 누름 → 말레이시아보다 하루 앞선 period_end → 400)의 원인을 뿌리에서 없앴고, 다른 길(지난달 기본 · 직접 고르기 · 외부 공급업체 정산서)은 손대지 않았다. 아래 조건 2개는 **배포 전**에 채우면 된다(코드 재판정 불필요 · 둘 다 빌드 없음).

### 조건
1. **health-check 영구 케이스 추가** — 이 계약(`period`)은 운영 사고에서 나왔는데 지금 health-check 에 `soa/:id/generate` 를 부르는 검사가 0건이다(grep 실측). CLAUDE.md «새 케이스 → health-check 에 추가(영구 안전망)». 쓰기 없는 검사로 충분하다 — 데모 매장 39(안 묶인 청구서 0 · 청구서 없는 확정 발주 0)에:
   - 브랜드·푸드코트 각각 `{period:'this_month'}` → 400 이되 **code ≠ period_end_in_future**(no_invoices 허용) — «오늘까지» 가 매장 달력에서 미래로 읽히지 않는다는 계약
   - `{period:'next_month'}` → 400 `period must be this_month` · `{period:'this_month', period_start, period_end}` → 400 · 익명 → 401
   - (아래 «실호출» B1·B2·B3·B7·F1·F2·F4 가 그대로 케이스가 된다.)
2. **verify-all --full(mount sweep) 결과를 보고에 숫자로** — 요청서에 «진행 중(결과 따로)» 이라 이 판정에서는 **확인 못 함**. 이 변경 4파일 몫에서 실패가 나오면 다시 넘길 것(다른 방·배포 준비 몫 실패는 이 판정과 무관).

## 근거

### ① diff 범위 대조 — 설계 밖 변경 0
- 서버 2라우트: `period` 는 비었거나 `'this_month'` 만(아니면 400) · `period` 와 날짜 둘 다 → 400 · `periodPreset` 전달. 기존 `period_start/period_end` 검사·판정은 그대로(이전 버전 화면과 호환 — 날짜를 보내는 옛 번들도 계속 동작).
- 서비스 `generateSoaNow`: `periodPreset==='this_month'` 일 때만 시작=매장 오늘의 `YYYY-MM-01`, 끝=매장 오늘. 그 뒤 미래·순서 판정·청구서 선발행·정산서 발행은 한 줄도 안 바뀜. `generateExternalSupplierSoaNow`(외부 공급업체) 무접촉 — 그 화면은 날짜를 사람이 직접 넣는 칸뿐(요청서 사실과 일치).
- 화면 `BillingTermsModal.tsx`: «This month» → `{ period: 'this_month' }` 만 보냄 · 쓰지 않게 된 `thisMonthRange` 삭제. `ymd` 는 직접 고르기 `max` 에 남음(아래 비차단 메모).
- `/soa/:id/generate` 호출자는 이 화면 하나(grep). 🔒 인쇄·KDS 보호파일 무접촉.

### ② 가드 스크립트 (내가 돌림)
- `check-print-guard.js` **8/8 변경 없음** · `check-design-guard.js` **신규 0**(299 / baseline 295 — 기존 부채) · `check-sensitive-diff.js` → **FABLE 게이트 대상**(정산 = 돈·무결성) — 이 판정이 그것.
- 서빙 번들 실측: `dev-frontend-build/asset-manifest.json` → `6788.86ef03be.chunk.js`(16:28) 안에 `period:"this_month"` 1 · `thisMonthRange` 0. 백엔드 pm2 재시작 16:27:51 = 3파일 수정(16:23~16:27:51) 뒤 → 떠 있는 코드가 새 코드.

### ③ 실호출·실측 (개발서버 http://127.0.0.1:3001 · 데모 매장 39 · 쓰기 0 — 호출 전후 정산서 0→0 · 5분 내 새 청구서 0)
서버 시각 16:3x UTC = 매장(Asia/Kuala_Lumpur) **10/31** 00:3x. 데모 브랜드(10) · 데모 푸드코트(44) 토큰.

| # | 보낸 것 | 결과 | 뜻 |
|---|---|---|---|
| B1 | brand `{period:'this_month'}` | 400 `no_invoices` | 매장 오늘=10/31 로 끝을 만들어 **미래 판정을 통과**(묶을 게 없어서 멈춤) |
| B2 | brand `{period:'next_month'}` | 400 `period must be this_month` | 모르는 값 거부 |
| B3 | brand `{period:'this_month', period_start, period_end}` | 400 `Send either period or …` | 둘 다 보내면 거부 |
| B4 | brand `{period_start:'2026-10-01', period_end:'2026-11-01'}` | 400 `period_end_in_future` | 직접 고르기 판정 유지 |
| B5 | brand `{period_start:'2026-10-01', period_end:'2026-10-31'}` | 400 `no_invoices` | 오늘(=10/31)은 미래가 아님 — B4 와 짝으로 경계가 갈림 |
| B6 | brand `{period:''}` | 400 `no_invoices` | 빈 값 = 안 보낸 것(지난달 기본) |
| B7 | brand 익명 | **401** | |
| B8 | brand 라우트에 푸드코트 토큰 | **403** `Brand General access only` | 범위 가드 그대로 |
| F1 | foodcourt `{period:'this_month'}` | 400 `no_invoices` | 브랜드와 같은 판정 |
| F2 | foodcourt `{period:'x'}` | 400 `period must be this_month` | |
| F3 | foodcourt `{period:'this_month', period_end}` | 400 `Provide both …` | 한쪽 날짜 검사가 먼저 걸림(정상) |
| F4 | foodcourt 익명 | **401** | |

- 날짜 계산 두 줄 순수 재현(`getCurrentLocalDate` → `slice(0,7)+'-01'`): KL 오늘 2026-10-31 → `2026-10-01~2026-10-31` · 월 첫날(`2026-11-01`·`2026-01-01`) → `11-01~11-01`·`01-01~01-01`(시작>끝 아님 · 끝>오늘 아님) · 12-31 → `12-01~12-31`. 월 경계에서 깨지지 않는다.
- 200 발행 길: 팀원 검증 D(데모 브랜드 17→38 · 정산서 기간 2026-10-01~2026-10-31 · 매장 10/31) 를 받아들인다. 내가 다시 돌리지 않은 이유 — 매장 38 의 유일한 안 묶인 청구서 33277 이 **다른 방(d5ebceff) 시험 데이터**라 또 묶이면 그 방을 흔든다(요청서 사고 1건과 같은 길). B1·F1 이 «미래 판정 통과» 를 가르고, 그 뒤 발행 코드는 변경 0 이라 D 와 합쳐 충분하다고 본다.
- 고장주입(팀원): 라우트 `periodPreset=null` → D 가 지난달로 떨어져 400 `no_invoices` → 원복. 반증으로 인정. 내 B4↔B5 는 미래 판정이 실제로 가르는 것을 보임.
- 실브라우저(팀원): Playwright · 시간대 Asia/Seoul · 시계 2026-10-30T15:39Z(사고 시각) 고정 → 요청 본문 `{"period":"this_month"}` · 화면 오류 0. 사고 재현 조건에서 날짜가 더는 안 나간다는 증명으로 받아들인다.

### ④ 배포 안전성
- 마이그 0 · 스키마 0 · ENUM 0. 롤백 = 4파일 되돌리기(데이터 모양 변화 없음).
- 혼재 안전: 새 서버 + 옛 화면(날짜 보냄) → 그대로 동작(B4·B5). 옛 서버 + 새 화면(`period` 만 보냄) → 옛 서버는 `period` 를 무시해 **지난달 기본**으로 떨어진다 — 배포는 백엔드·프론트 한 번에 나가므로 실제로는 생기지 않지만, 배포 순서를 바꾸지 말 것.
- SW 버전 올림은 배포 준비 몫(프론트 변경 포함).

## 비차단 메모 (고치지 않아도 됨)
- 직접 고르기 날짜 칸의 `max={ymd(new Date())}` 는 브라우저 날짜다. 한국 자정 넘어 쓰면 매장 기준 «내일» 까지 고를 수 있고 그러면 서버가 400 `period_end cannot be in the future` 로 막는다 — 서버가 진실이라 틀린 동작은 아니고, 메시지도 보인다. 매장 시간대로 `max` 를 만들려면 화면에 매장 타임존이 필요해 범위가 커진다 — 이번엔 두는 게 맞다.
- 매장 39 는 `operation_settings.timeZone` 이 null → 기본 Asia/Kuala_Lumpur 로 떨어진다(기존 동작 · 이번 변경과 무관).

## health-check (내가 돌림)
- `node scripts/health-check.js --quiet` → **435/435 통과 (exit 0)** · 16:3x UTC · 팀원 숫자(435/435)와 같다. 단, 이 안에 `soa/:id/generate` 를 부르는 케이스는 없다(조건 1).

## 판정 요지 (마커용 — 이 방이 아니라 d5ebceff 방 변경이 빠진 뒤 팀원이 찍을 때 쓸 문구)
`soa this_month: 날짜 판정 서버 단일화 · 실호출 12건 · 쓰기 0 · 조건: health-check 케이스 + verify-all --full 숫자`
