# Fable 설계 요청 — 인쇄 문제 기록·자동 점검 (2026-11-13 · 작업방 52e6d237)

## Irene 원문
«다시 프린터 사용에 문제 생기는 것에 대해 로그 심어서 파악하고 우리가 알아서 체크할 수 없어?»
(앞 맥락: K-DINE Noodles 매장 28 — 안드로이드 앱 «QZ 오류»·«저장하면 리셋». Irene «설정 안된 거 있으면 정확히 알려줘서 미싱 못하게 해야 하고»)

## 이번 사건에서 실측한 것 (운영 읽기만)
- 매장 28 Noodles 주방(24) 칸 qztray·주소 빈칸 → 앱 0.3.4 인쇄 실패 `PRINTER_NOT_FOUND` 11-10 2건·11-11 8건. 이 실패는 **운영 텍스트 로그 `/var/www/logs/production/out.log` 의 `[print-trace] CLIENT … ok=false err=…` 줄에만** 남음. 
- 그 줄을 남기는 길 = 클라 `billPrint.js`(🔒) → `POST /api/orders/print-debug`(🔒 `routes/orders-crud.js:3234` — console.log 만, DB 안 씀).
- 인쇄 기록 표 `print_events`(models/PrintEvent.js · outcome success/failed/skipped/fallback · reason_code · intended_printer …)는 **자가진단 패널(PrintSelfDiagnosePanel.tsx:201)만 씀** → 매장 28 은 14일 0행. 그래서 관리자 «Print Health»(`/api/print-diagnostics/fleet` · PrintHealthPage) 와 진단 S7 recent_failures 가 실패 0으로 보임.
- 진단 S5 station_drift(`routes/print-diagnostics.js` ~133행)는 «주방 칸 프린터 미지정»을 잡지만, 누가 자가진단을 열 때만 계산됨 — 자동으로 아무도 안 봄.
- 직원 계정 저장의 printer_settings 건너뜀은 텍스트 로그 `🔒 printer_settings skipped (role=Staff)` 에만(11-11 6건·11-12 4건, 사용자 69). `routes/store.js`(보호 아님).
- 기기 상태 `print_device_status`(90초마다 기기별 1행: platform·app_version·is_auto_print·snapshot): 매장 28 은 기기 5대 전부 is_auto_print=1(앱 1 + 브라우저 RawBT 4) — 단일 폴러 원칙과 어긋남, 아무도 몰랐음. 앱 0.3.4(고친 판 0.4.1).
- 11-12 한 것(커밋 184388306, 개발만): `utils/printerSetupGaps.ts`(화면 · 인쇄 코드와 같은 «안 나갈 주방» 판정) + 매장 화면 알림 + 설정 › 프린터 맨 위 상자.
- 기존 정기 작업 틀: `services/*Scheduler.js` 여러 개 · `SchedulerRun` 모델 · 알림 `sendNotification`(카테고리) — 메모리 reference_scheduler_run · reference_notification_six_gates.
- 운영 서버 자원 부족(메모리 reference_prod_server_resource_constraint) · 운영 fork 1.
- «우리가 체크» 에 쓸 수 있는 사람 쪽 창구: 관리자(SA) Print Health 화면 · 이 개발서버 Claude 작업방의 매일 정기 점검(/개발시작 이 운영 읽기 전용 조회를 함 — prod-query) · 상황판(localhost:8800).

## 기계적 제약
- 🔒 인쇄 보호 파일 8개(billPrint.js · useAutoPrintPoller.ts · MainLayout.tsx · KitchenDisplayPage.tsx · POSTerminalPage.tsx · orders-crud.js · stationEnrichment · orderTotals) — 바꾸려면 Irene 승인 + print-guard bless + 실프린터 확인(CLAUDE.md 🔒 절). 인쇄 동작(방식·타이밍·라우팅) 변경 금지.
- 운영 배포·운영 DB 쓰기·외부 발송은 Irene 지시 없이 안 함. 개발서버에서 구현·검증까지.
- 이 방에서 운영 접속 명령은 허락 창에서 거부됨(읽기 전용 운영 조회는 정기 점검 방이 함).
