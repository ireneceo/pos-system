# Fable 검증 요청(gate) — 인쇄 지킴이 구현 (2026-11-13 · 작업방 52e6d237)

설계: `.claude/fable-design-20261113-print-monitoring.md` · Irene 원문 «다시 프린터 사용에 문제 생기는 것에 대해 로그 심어서 파악하고 우리가 알아서 체크할 수 없어?»

## 바뀐 파일 (이 작업분 · 미커밋)
- 새: dev-backend/middleware/printTraceTee.js · utils/printerSetupGaps.js · services/printWatch.js · services/printWatchScheduler.js · models/PrintWatchFinding.js · scripts/migrate-create-print-watch-findings.js · scripts/print-watch-report.js · tests/print-watch.test.js · tests/fixtures/printer-setup-gaps.json
- 고침: dev-backend/server.js(관측 한 줄 478행 · 정기 작업 등록 한 줄) · models/index.js · routes/print-diagnostics.js(/watch 추가만) · utils/printerSetupDevice.js(blockedChange · withoutEmergency · recordBlockedPrinterChange) · routes/store.js·routes/restaurants-crud.js(각 1줄 기록 호출) · scripts/migrations.registry.json(deploy 추가) · scripts/health-check.js(print 3건)
- 화면: pages/Admin/PrintHealthPage.tsx(맨 위 «Needs attention» 절 · 상태 표시 nowrap) · locales */printDiagnostics.json · utils/printerSetupGaps.test.ts(공용 fixture 읽기)
- 문서: docs/PRINT_SELF_DIAGNOSE_DESIGN.md §9 · .claude/commands/개발시작.md 0-C단계
- 이 작업분 아님(손대지 않음): .claude/deploy-manifest.json · dev-backend/releases/* (배포 방 11-13 6.18 배포 뒤 기록) · GTM 보류 4파일 · playwright.config

## 설계와 다르게 한 것 (1건)
- §4-2 «정기 점검 방이 print-watch-report.js 를 운영에서 돌림» → `/개발시작` 규칙상 정기 점검 방은 운영에 ssh/scp 를 못 보내고 `prod-query.js`(읽기 전용 계정 · SELECT 한 문장)만 쓴다(2026-10-07 실측: 허락 창에서 멈춤). 그래서 0-C단계는 `print_watch_findings` 를 prod-query SELECT 로 읽게 했다(데모 거르기 = `JSON_UNQUOTE(JSON_EXTRACT(evidence,'$.demo'))<>'true'` — 처음 쓴 `JSON_EXTRACT(..)=false` 는 개발 DB 실측에서 데모를 못 걸러 고침). report 스크립트는 사람·운영 서버에서 쓰는 도구로 남김.
- 같은 이유로 §6-9 운영 기준선(`--dry-run`)은 이 방에서 실행 못 함(운영 접속 허락 창 «아니오» 받음 · 11-12). 실측 안 됨.

## 검증 숫자 (설계 §6)
1. print-guard 8/8 변경 0 (전·후).
2. 관측 실호출(health-check 케이스 · 데모 매장 RA 토큰): ok:false → +1 · ok:true +0 · ok 없음(route-qz 모양) +0 · 익명 401·+0 · 응답 `{success:true}` 그대로 — 통과.
3. 반증: server.js 관측 줄 뺌 + pm2 restart → 그 케이스 ✗(1건 실패/13) · PrintEvent.create 대신 throw 주입 → print-debug 응답 200 `{"success":true}` · 둘 다 원복(cmp 동일) 후 13/13.
4. jest: 서버 tests/print-watch.test.js 18/18(규칙 6개 걸림·안 걸림 · 수동 인쇄 매장 unprinted_orders 안 걸림 · 버전 비교 · 기록 줄) · 화면 printerSetupGaps.test.ts 14/14(같은 fixture 10사례 + billPrint 규칙 대조 3) · 고장 주입(화면 kpAddr 폴백 제거) 잡힘 · 기존 tests/printer-setup-device.test.js 26/26.
5. 수명(health-check 케이스 · 원본 printer_settings 먼저 저장·finally 복원): 빈칸 → open 1행 → 다시 실행 같은 id·seen_count 2 → 채움 → resolved·resolved_at — 통과.
6. /watch: SA 200(open 배열) · 데모 RA 403 · 데모 BG 403 · 익명 401 — health-check 케이스 통과.
7. 2-2 소음 실측(API · 데모 38 직원 Staff 토큰 · 원본 복원·시험 줄 삭제): 무관한 저장 3회(불러온 printer_settings 그대로 + 다른 칸) → 0행 · 비상 모드 켜기/끄기 2회 → 0행 · 주방칸 주소를 바꾼 저장 → 1행 · 설정은 비상 칸 빼고 그대로. 실브라우저 직원 화면 저장 경로는 따로 안 잼(직원 화면은 프린터 칸이 잠겨 있음 — 11-12 확인).
8. 빌드 3회(1회차 뒤 상태 표시 두 줄 꺾임 발견 → nowrap 1줄 · 원래 1회 원칙 대비 +1) · Print Health 실브라우저 SA 1366·390: 절 1 · 실고객 0건이라 빈 상태 «인쇄 문제가 없습니다» 보임 → 데모 토글 켜면 10행 · 가로 스크롤 없음 · 오류 0. verify-all --full 23/24(실패 = 배포 준비 기록·SW 버전 — 배포 때) · health-check 전체 통과 · mount sweep 통과 · check-sensitive-diff = ③ DB 마이그 · ⑤ 보안 경계(새 /watch 라우트) 대상.
9. 운영 기준선: 실측 못 함(위).

## 개발 DB 판정 결과(참고)
대상 매장 4(전부 데모): setup_gap 3 · multi_auto_print 2 · old_app 1 · print_failures 0 · unprinted_orders 0 · settings_blocked 0. 매장 38 은 자동 인쇄 기기 11대(시험 기기 누적).

## 운영 사실
11-13 01:1x 배포 6.18(184388306 까지)로 11-12 화면 알림·직원 잠금은 이미 운영에 있음. 이 작업분은 운영 미반영.
