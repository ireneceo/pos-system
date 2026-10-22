# Fable gate — 정기 발주(Standing order) 구현 검증 (2026-10-22)

> 설계 `.claude/fable-design-20261022-recurring-po.md` (§12 Irene 답 반영) · 종류 `gate` (돈·자동 생성·DB 구조·보안 경계)
> 판정자: Fable · 구현·실측: Opus(팀원) · 대상: 미커밋 워킹트리 43건(전부 이 작업)

## 판정: **PASS** (조건 0 · 사소한 문구 1건은 판정 세션이 직접 고침)

## ① diff 범위 대조 — 설계 밖 변경 0
- 바뀐 파일 전부 설계 §2·§3·§7·§8·§9·§11 에 대응. 🔒 인쇄 보호파일 접촉 0(print-guard 8/8 변경 없음).
- 설계와 다르게 한 9건 판정:
  1. 오너 일시정지·종료 경로 `owner-pause`/`owner-end` 분리 — **수용.** approval 라우터가 앞에 마운트돼 같은 경로면 매장 관리자가 403. 실호출로 오너·RA 양쪽 확인.
  2. 소켓 `fakeReq(io)` — **수용.** `emitPoEvent` 는 `req.app.get('io')` 만 읽는다(코드 확인). 쪼개는 것보다 작다.
  3. 밀림 복구 = 예정일에서 주기만큼 밀어 오늘 뒤로 — **수용.** 격주 박자 유지가 설계 취지보다 낫고 매주·매월은 결과 같음. jest 6/6.
  4. 데모 자정 초기화에 틀 정리 미추가 — **수용.** `demoResetScheduler` 가 purchase_orders 를 안 건드림(grep 0건) — 설계 §6 전제가 틀렸음. `[확인용]` 틀은 ends_on 으로 끝남.
  5. 정기 발주 승인 시 notePlaced 한 통 + 틀 approved_by/at 채움 — **수용.** 같은 수신자 이중 메일 방지 · §4-2 ① «새 오너가 한 번은 본다» 를 승인 1회로 닫는 올바른 처리.
  6. 가입 업체 생성 시 fireBuyerConfirm 대신 po_schedule_placed — **수용.** 같은 이유.
  7. send-external-email 결함 2개 동반 수정(추적 기록 누락 · 바운스 차단을 «보냄» 으로 셈) — **수용.** 본문을 함수로 빼는 설계 §5 범위 안이고 «보냈다고 거짓말하지 않는다» 원칙. `source` 가 tracking 최상위→이벤트 안으로 옮겨졌는데 읽는 곳 0(grep).
  8. 요일 이름을 브라우저 Intl(UTC 고정 날짜) — **수용.** 2026-10-25(일) 기준 맞음, 매장 시간대 무관(요일 이름만).
  9. DATEONLY 를 `toDateStr` 로 정규화 — **수용.** config `timezone:'+00:00', dateStrings:false` 라 Date 로 오는 것이 사실.
- Irene §12 답 반영 확인: 외부 업체로 나가는 길 0 — 스케줄러·승인 라우트 어디서도 `sendExternalPoEmail` 을 부르지 않음(호출부는 사람이 누르는 라우트 하나). 남은 옛 문구 1건(`notification-settings.js` po_schedule_placed 설명의 «needs sending») → 판정 세션이 «recorded for a subscription supplier» 로 고침.

## ② 가드 — verify-all 23/23 (판정 세션이 직접 실행)
print-guard 8/8 · 디자인 신규 0 · 타임존 신규 0 · IDOR 신규 0 · 마이그 레지스트리 ✓ · 배포 준비 ✓ · tsc 기준선 신규 0 · i18n 4언어 일치(recurring 85키 ×4 · email po.schedule 43키 ×4) · 계약 테스트 ✓ · 인스펙션 ✓ · health-check 전체 ✓(이 변경 뒤 실행).

## ③ 실호출·반증 (판정 세션이 직접)
- health-check inventory **88/88** (정기 발주 ①~⑦ + 정리) · jest po-schedule-dates **6/6** · 마이그 2회 실행 멱등(UNIQUE `uq_po_schedule_run_date` · `purchase_orders.schedule_id` 확인).
- **고장주입(판정 세션)**: `applySubmitGate` preApproved 분기 끔 → inventory **4건 실패(③④⑤⑥)** / 원복(cmp 동일) → **88/88**. 계약이 방어를 실제로 본다.
- 보안·IDOR 실호출: 익명 401 · 다른 매장 RA 가 남의 틀 runs/PUT/pause → 404 ×3 · RA 가 오너 승인 목록 → 403 · 오너가 안 가진 매장 틀 approve/owner-pause → 404 ×2 · 공급업체 계정 → 403 · `/purchase-orders/schedules` 가 crud `:id` 에 먹히지 않음(200).
- 입력 검사: day_of_month 31 / weekday 7 / frequency daily → 400 ×3 · PUT 줄 수 불일치 → 400 · 이름만 수정 → 상태 유지.
- 드라이런 롤백: preview 전후 purchase_orders 259→259, 틀 수 변화 0.
- 실브라우저: Opus 가 verify-all --full(mount sweep 745s, 요일 수정 전 번들) + 요일 수정 뒤 빌드 1회·Playwright 클릭 11항목 PASS·콘솔 오류 0. 요일 수정은 두 파일의 요일 배열 한 줄이라 sweep 재실행 없이 수용. **Fable 이 화면을 직접 보지는 않음**(사람 확인은 아래 «확인할 곳»).

## ④ 배포 안전
- 마이그: 새 표 2 + 칸 1 + 색인, `Model.sync` 안 씀, information_schema 로 멱등, registry deploy 등록(check-migration-registry ✓). `purchase_orders.status` ENUM 무접촉.
- 롤백 = 코드만 되돌리면 됨(새 표·NULL 칸은 옛 코드에 무해). 운영에 틀 0건이라 배포 직후 스케줄러는 아무것도 안 만든다 — 운영 첫 틀은 Irene 매장에서 1개.
- 배포 방 몫: 프론트가 바뀌었으니 **SW 버전 bump**(최근 커밋 6.01 은 이 작업 전) — 가드가 배포 때 잡는다.

## 남는 것(결함 아님 · 기록)
- 실제 발주를 매일 07:00 이후 첫 정각에 만든다 — 운영 첫 주는 Irene 매장 틀 1개로 보고 알림 문구를 확인하는 것이 좋다.
- health-check ④ 가 데모 매장 2 매핑 단가를 ×1.2 했다가 되돌린다 — 중간에 죽으면 데모 단가가 남을 수 있음(데모 전용·다음 실행 전 setup 은 매핑을 모르면 못 되돌림). 운영 무관.

## Irene 에게
- 정기 발주는 **외부 업체로 아무것도 보내지 않고 우리 쪽 기록만** 남깁니다(10-22 답 그대로). 가입 업체는 평소처럼 앱 알림.
- 오너 승인은 틀 1번 · 그 뒤 총액이 승인 때보다 10% 넘게 달라질 때만 다시 묻습니다.
- 확인할 곳(Opus 보고의 링크 그대로): 매장 38 RA — 정기 발주 목록 `[확인용] 주간 채소 (외부 업체)` 진행 중·발주 1건 기록됨 / 매장 2 오너 — `[확인용] 주간 소스 (오너 승인)` 승인 대기 → 검토 창에서 지금 가격 확인.
