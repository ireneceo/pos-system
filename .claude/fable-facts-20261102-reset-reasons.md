# 사실 전달 — 비밀번호 재설정 «이유 없는 실패» (작업방 cd0a3032 · Opus 팀원 · 2026-11-02)

## Irene 원문
«비번 변경하기 이메일로 받으면 받은 링크로 가서 비밀번호 변경하려면 실패로 뜬대. 제대로 확인해. 모든 비번 변경 경로를. 이메일로 확인해서 바꿀 때 어떤 링크로 똑바로 하는지. 그리고 비번 잘못 넣거나 그러면 무조건 실패이유를 안내해야지. 그냥 실패가 뭐야.»

## 이전 (이미 커밋 5424b2a02 · Fable PASS 2회)
.claude/fable-verdict-20261101-password.md · .claude/fable-verdict-20261102-customer-reset.md

## 재현 (고치기 전 · 개발서버 · 실제 메일 내용을 가로채 그 링크를 실브라우저로 열어 저장)
- 링크 모양 https://dev.purplehere.com/reset-password?token=…&email=… (운영은 FRONTEND_URL 없어 개발 주소로 가던 것 — 09c037091 에서 고침, 미배포 → 운영에서 메일 링크 = 무조건 실패의 1차 원인)
- 정상 링크 = 성공. 같은 링크 다시 / 두 번 요청 후 첫 메일 / 1시간 지난 링크 → 화면 «Failed to reset password» 만(이유 없음)
- 원인: 서버 errorResponse 가 이유를 error.message 에만 넣음 ↔ ResetPasswordPage·ForgotPasswordPage 는 data.message 를 읽음
- 찾기에 아이디를 넣으면 메일이 안 감(찾기는 email 만 조회 · 화면 입력칸 type=email)
- 찾기·재설정이 같은 한도(IP 15분 5회) — 메일 몇 번 다시 받으면 저장이 429

## 바꾼 것 (이 일)
- dev-backend/middleware/errorHandler.js: errorResponse 응답 맨 위에 message 덧붙임(error.message 그대로 유지 · 52곳 공통)
- dev-backend/routes/auth.js: reset-password 실패 이유 3가지(RESET_LINK_USED 계정 없음·이미 씀 같은 문구 / RESET_LINK_REPLACED 해시 불일치 / RESET_LINK_EXPIRED) · 재설정 한도 분리(resetPasswordLimiter 10/15분) · 찾기 한도 문구 · forgot-password 메일 또는 아이디 조회(메일은 계정 등록 주소로만 · 메일 없는 계정은 조용히 같은 응답)
- dev-backend/routes/customers-auth.js: 손님 링크 실패 문구 2종(이미 씀·바뀜·잘못 / 만료)
- 화면: Landing/ResetPasswordPage(이유 표시 · 링크 문제면 «새 링크 요청» · 연결 실패 문구) · Landing/ForgotPasswordPage(입력 type=text «Email or username» · 메일 없는 직원 안내 · «가장 최근 메일만» 안내 · 이유 표시) · mobile/ResetPasswordPage(확인 실패 이유 표시 · 연결 실패 문구) · mobile/ForgotPasswordPage(실패 응답을 성공으로 보던 것 → 이유 · 연결 실패 문구) · mobile/AccountPage(연결 실패 문구) · landing.json 4언어 키 4개
- dev-backend/scripts/health-check.js: 기존 비밀번호 검사에 이유 3종(code + 맨 위 message)·아이디 찾기 추가 · 호출마다 다른 X-Forwarded-For(한도 거짓 실패 방지)

## 검증 숫자
- 실제 메일 링크 → 실브라우저(빌드 후): 정상 성공→로그인 200 · 같은 링크 «already been used…» · 옛 메일 «replaced by a newer one…» · 만료 «expired (links work for 1 hour)…» · 약한 비번 규칙 문구 · 아이디로 찾기 → 등록 메일로 발송 → 그 링크로 성공 → 로그인 200
- 손님 실브라우저: 정상 성공 · 같은 링크 «already been used, was replaced…» · 만료 «expired…» · 직원 찾기 화면 아이디 입력 → 완료 화면 + 안내 2줄
- 한도: 같은 주소 찾기 6번째 429(새 문구) → 그 뒤 재설정은 429 아님(400 이유)
- health-check auth 22/22 · 고장주입 2/2(맨 위 message 제거 → «NOMSG» 실패 / 옛 auth.js → «INVALID_TOKEN» 실패) → cmp 원복 → 통과
- verify-all --full 23/24: 남은 1 = deploy-ready(배포 기록 파일 · 배포 준비 몫) · health-check 전체 통과 · mount sweep 8역할 크래시 0 · i18n 통과 · inspection 통과
- 운영 접속·쓰기 없음. 임시 계정·손님 삭제.
