# Fable 게이트 요청 — 월 정산서 «This month (up to today)» 미래 오류 (2026-10-30 · 작업방 72ac6d2a)

## Irene 원문 (그대로)
- «안되는데? 오늘까지로 발행하라고 한건데 왜 이런 오류가 떠? … This month (up to today) · Generate now · period_end cannot be in the future»
- «나중에 하기로 했던 일을 지금 진행해 줘.»

## 사실 (팀원 Opus)
- 운영 실패 시각 2026-10-30 15:39 UTC = 한국 10/31 00:39 · 말레이시아(매장) 10/30 23:39.
- 원인: `BillingTermsModal.tsx` 가 «이번 달» 날짜를 브라우저 시간으로 만들어 period_end=10-31 전송 → 서버 `generateSoaNow` 가 매장 달력 오늘(10-30)과 비교해 `period_end_in_future` 400.
- 변경(diff 전문 `.claude/fable-gate-20261030-soa-this-month.diff`, 4파일):
  - 화면: «This month» 는 `{ period: 'this_month' }` 만 보냄(쓰지 않게 된 thisMonthRange 삭제). 지난달·직접 고르기는 그대로.
  - 라우트 brand-soa.js · foodcourt-soa.js generate: `period` 는 비었거나 'this_month' 만(아니면 400) · period 와 날짜 둘 다 오면 400 · `periodPreset` 전달.
  - 서비스 `generateSoaNow`: `periodPreset==='this_month'` → 시작 = 매장 오늘의 YYYY-MM-01, 끝 = 매장 오늘. 그 뒤 기존 판정·발행 그대로.
  - 외부 공급업체 정산서(ExternalSoaIssueButton)는 날짜를 사람이 직접 넣는 칸뿐이라 손대지 않음.
- 검증(개발):
  - API 실호출(데모 브랜드 17 → 매장 38, 배송 완료 데모 발주 38623): A 예전 브라우저 앞선 날짜 → 400 period_end_in_future(직접 고르기 판정 유지) · B period='next_month' 400 · C period+날짜 400 · D period='this_month' 200 → 청구서 발행 + 정산서 기간 2026-10-01~2026-10-31(매장 시간 · 서버 시각 16:24 UTC=매장 10/31) · E 익명 401. 시험 뒤 원복.
  - 고장주입: 라우트에서 periodPreset=null 로 → D 가 지난달로 떨어져 400 no_invoices(잡힘) → 원복.
  - 실브라우저(Playwright, 시간대 Asia/Seoul, 시계 2026-10-30T15:39Z 고정): «This month» → «Generate now» 요청 본문 `{"period":"this_month"}` · 성공 문구 · 화면 오류 0.
  - health-check 435/435 · print-guard 8/8 · design-guard 신규 0 · 빌드 성공(배포 스크립트가 복사 전 exit 1 → 같은 복사 명령 손으로) · verify-all --full 진행 중(결과는 따로 전달).
- 사고 1건(원복 완료): 첫 실호출 때 다른 방(d5ebceff)의 데모 시험 청구서 33277(PO-R38-CHK-AUTO-mvv62jgw)이 제 시험 정산서에 같이 묶였고, 제가 시험 정산서를 지워 parent 가 끊긴 채 남음 → parent_soa_invoice_id NULL 로 되돌림(영향 1행 · pending_payment 그대로).

## 기계적 제약
- 개발서버만 · 운영 배포·운영 DB 쓰기 없음 · 🔒 인쇄/KDS 무접촉.
- 작업 폴더에 다른 방(d5ebceff — 배송 완료 자동 완료) 미커밋 변경이 함께 있음. 이 판정은 위 4파일 몫. fable-gate 마커는 지문이 다른 방 변경까지 묶으므로 찍지 말 것(그 방 게이트 때).

결과 파일: `/var/www/.claude/fable-gate-20261030-soa-this-month.md`
