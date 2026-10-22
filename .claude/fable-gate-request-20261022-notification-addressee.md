# Fable 완료 검증(gate) 요청 — 알림 «수신 자격 · 할 일» (2026-10-22 · 작업방 1f5a0efb)
결과 파일: .claude/fable-gate-20261022-notification-addressee.md (Fable 이 씀)

## 근거
- 설계: .claude/fable-design-20261022-notification-addressee.md (Fable) · 요청서 .claude/fable-request-20261022-notification-addressee.md
- Irene 답(설계 §9): «권고대로 진행해 줘» → ① 꼬리표 맨 앞 A ② 연체 메일 수신자 = 관리자 전원 + 오너 ③ R1 은 다음 설계(이번 범위 밖) ④ 모자 전환 시 확인 1탭 A · (0) 빌드 재시작
- 변경 범위: `git diff HEAD` + 미추적 5개(dev-backend/utils/notificationAddressee.js · utils/notificationLinks.js · scripts/check-notification-links.js · dev-frontend/src/pages/NotificationEntry/ · src/utils/contextMatch.ts). 운영 쓰기·배포·외부 발송 0.

## 팀원이 설계와 다르게 한 곳 (판정 부탁)
1. `trade_invoices_buyer` 의 브랜드/푸드코트 경로를 설계표의 `/pos/brand|foodcourt/trade-invoices` 가 아니라 `/pos/brand/invoices`·`/pos/foodcourt/invoices` 로 — soaScheduler.soaLinkFor 가 2026-09-29(soa2 §5-A)에 «구매자가 자기 청구서를 보는 곳» 으로 정한 주소를 유지.
2. `issued_invoices` 브랜드 총괄 = `/pos/brand/invoices`(BrandInvoicesPage 가 /api/invoices + to-pay 둘 다 보여 줌), 매니저 = `/pos/manager/invoices`(설계표대로).
3. 표에 target 3개 추가: `staff`(/restaurant/:rid/staff · /pos/admin/staff) · `leave_requests` · `my_attendance` — 역할 요청·휴가 메일이 기존에 쓰던 (있는) 화면을 /go 경유로.
4. 체험 만료 메일(emailTemplates.trialExpiringSoonEmail)은 emailLayout 직접 조립이라 받는 분 띠·할 일 칸은 안 붙음 — 제목 꼬리표(옛 «[이름]» 머리를 떼고 자격 꼬리표로)와 버튼 주소 교정만.
5. 공급업체 직원(Supplier Staff)도 자격 «공급업체»(ctx 는 Supplier Admin) — contextMatch 가 두 공급업체 역할을 같은 자리로 본다.
6. buyerReceivedEmail 은 원래 withRenderMeta 에 title/body 를 안 넘겨 재렌더가 안 되던 것을 고침(설계 밖 결함 1).
7. LoginPage 가 로그인 뒤 돌아갈 때 경로만 되살리고 `?…` 를 버리던 것을 고침(/go 가 조건 없이 열림 — 설계 §4-3 ② 의 전제가 실제론 성립 안 했음).
8. 앱 토스트: 주문·예약 알림의 이동 주소가 data.url 안에 있어 토스트 클릭이 아무 데도 안 가던 것 → data.url 도 읽게.

## 팀원 실측 (숫자)
- 렌더 하니스(가짜 전송기 · 실제 발송 0 · DB 무변경, tmp 스크립트 r_po.js/r_all.js): 40통 — 꼬리표·미리보기·받는 분 띠·할 일 칸·/go 버튼 전부 존재. 동사 제목 ↔ 할 일(action) 칸 불일치 0(자동 대조, 오탐 2건은 «Payment received»/«Approved» 접두 겹침 확인).
- 무회귀 ①: HEAD 의 emailTemplates/notificationTemplates 와 새 것 비교 — 메타 없는 메일 4종(추천·지급·인증·역할요청) html·subject 바이트 동일, emailLayout 3인자·wrapTemplate 메타 없음 바이트 동일.
- 자격 리졸버 집합 = 옛 id 함수: 매장 38·2 · 브랜드 10·2 · 푸드코트 44 · 공급업체 20 모두 true.
- 주소 대조 ②(scripts/check-notification-links.js): 표 39경로 App.tsx 미달 0 · 발송 파일 18개 옛 없는 주소 0. **반증**: 고치기 전 26건을 잡고 exit 1.
- /go 실브라우저 4경로(빌드 후, tmp/go_e2e.js): ① 같은 자격 → /restaurant/38/invoices 바로 ② BG 계정+매장38 RA 모자 → «Open as Seoul Garden BBQ · Restaurant Admin?» → Open → /restaurant/38/invoices ③ 공급업체 계정에 오너 자격 링크 → /pos/select-context + 안내 문구 ④ 비로그인 → /pos → 데모 로그인 → /restaurant/38/invoices(쿼리 보존). 콘솔 오류 0. 스크린샷 tmp/go-confirm.png.
- 고장주입 ⑥: contextMatch.sameEntity 의 매장 번호 비교를 `return true` 로 → 대조 테스트 2건 실패(다른 매장 모자가 확인 없이 «현재» 로 통과) → 원본 0 실패.
- 푸시 3종: 제목 «New order · Seoul Garden BBQ» · 예약 url /restaurant/38/reservations · entity 실림(sendPushToRestaurant 가로채 확인, 실제 발송 0).
- health-check 404/404 · print-guard 8/8 · design-guard 신규 0 · i18n verify 통과 · 빌드 성공(경고는 기존 파일 3건, fork-ts-checker OOM 은 알려진 것 — verify-all 의 «타입 오류 기준선» 게이트 ✓) · verify-all --full: 결과는 아래 줄에 팀원이 덧붙임.
- 시험 데이터: demo-brand(user 22)에 매장 38 RA 모자(scripts/test-seed-context.js, 데모 전용 가드).

## 제약
운영 쓰기·배포 없음 · 🔒 인쇄 보호파일/KDS 무접촉(print-guard 8/8) · 마이그 없음
