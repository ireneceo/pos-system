# Fable 게이트 판정 — 비밀번호 재설정 «이유 없는 실패» 고침 (2026-11-02)

**판정: PASS** (조건 없음 · 관찰 3건은 배포를 막지 않음)

사실 문서: `.claude/fable-facts-20261102-reset-reasons.md` · Irene 원문 «비번 변경하기 이메일로 받으면 … 실패로 뜬대 … 무조건 실패이유를 안내해야지. 그냥 실패가 뭐야.»
앞선 판정: `fable-verdict-20261101-password.md` · `fable-verdict-20261102-customer-reset.md`(커밋 5424b2a02). 그 판정의 권고 2(health-check 가 한도에 걸려 거짓 429)가 이번에 반영됨(호출마다 다른 X-Forwarded-For).

## 1. 게이트 대상 근거
- `check-sensitive-diff.js`: ⑤ 보안 경계(`routes/auth.js` · `middleware/errorHandler.js`) + 안전망 자체(`scripts/health-check.js`) → **gate 대상 맞음**.
- 🔒 인쇄 보호파일 무접촉: `check-print-guard.js` **8/8 변경 없음**.

## 2. diff 범위 대조 — 사실 문서 «바꾼 것» 밖 변경 0
| 파일 | 본 것 | 판정 |
|---|---|---|
| `middleware/errorHandler.js` | `errorResponse` 응답 맨 위에 `message` 1줄 **덧붙임**(`error.message`·`code` 그대로). 전역 핸들러·`successResponse` 무변경. 화면에서 맨 위 `message` 를 읽는 곳(`if (result.message)` 1곳 — LiveOrders 실패 분기 토스트)은 이유가 보이게 되는 쪽이라 개선 | 범위 안 |
| `routes/auth.js` | ① `resetPasswordLimiter`(10/15분) 신설 → `/reset-password` 에 적용(찾기 5/15분과 분리) ② `/forgot-password` 조회 `email OR username`(소문자 — users 칸 collation utf8mb4_unicode_ci 라 대소문자 무관 · 대소문자 섞인 username 0) · `!user.email` 도 같은 성공 문구 · 메일은 `user.email` 로만 ③ `/reset-password` 실패 3갈래(USED 계정없음·토큰없음 / REPLACED 해시불일치 / EXPIRED) · 순서 = 토큰 일치 확인 뒤 만료 판정 · 성공 경로(비번+토큰 비움 한 update) 무변경 | 범위 안 |
| `routes/customers-auth.js` | 문구 4곳만(verify·reset 의 «없음/바뀜» · «만료») — 상태코드·로직 무변경 | 범위 안 |
| `scripts/health-check.js` (defineAuthTests 비밀번호 검사) | 이유 3종을 `error.code` + 맨 위 `message` 글자 여부로 검사 · 아이디로 찾기 → DB 토큰 생성 확인 · 호출마다 다른 XFF(`trust proxy 1` + 직결이라 req.ip 가 그 값 — 운영은 nginx 가 뒤에 실주소를 붙여 우회 아님). 같은 파일 `defineSecurityTests` 덩어리는 다른 방 — 이 판정 밖 | 범위 안 |
| Landing `ResetPasswordPage` | `data.message ?? error.message` 읽기 · 링크 문제 3코드면 «새 링크 요청» 링크 노출 · `res.json()` 실패 보호 · 네트워크(TypeError) 는 연결 실패 문구 | 범위 안 |
| Landing `ForgotPasswordPage` | 입력 `type=text` 라벨 «Email or username» · 안내 2줄(메일 없는 직원 · 가장 최근 메일만) · 실패 이유 표시 | 범위 안 |
| mobile `ResetPasswordPage`·`ForgotPasswordPage`·`AccountPage` | 확인 실패 이유 표시 · `!response.ok` 를 성공으로 보던 것 고침 · 연결 실패 문구 — 손님 API 계약 무변경(forgot 는 200+`emailExists:false` 유지) | 범위 안 |
| `locales/{en,ko,zh,ms}/landing.json` | 키 4개 × 4언어 모두 존재(grep 4/4/4/4) · `requestNewResetLink` 는 기존 키 | 범위 안 |

## 3. 가드 스크립트 (Fable 독립 실행)
- `check-print-guard` 8/8 · `check-design-guard` 신규 위반 0(299/baseline 295 — 기존 부채) · `npm run i18n:verify` Errors 0 · `check-sensitive-diff` 대상 판정(위).

## 4. 실호출·회귀 (Fable 독립 재실행)
- `health-check --category=auth` **22/22 통과**(이 일의 이유 3종·아이디 찾기 포함).
- **고장주입 1/1 (Opus 와 다른 지점)**: `auth.js` 만료 판정을 무력화(`getTime() <= Date.now()` → `<= 0`) → `pm2 restart` → 같은 검사 **실패 «만료 이유 undefined:msg»**(만료 링크가 200 으로 통과한 것을 잡음) → 사본 `cp` 원복 `cmp` 동일 → restart → **22/22 통과**. 반증 성립(«만료 링크는 거절» 단언이 실제로 검사된다).
- Opus 고장주입 2/2(맨 위 message 제거 → NOMSG / 옛 auth.js → INVALID_TOKEN)·실브라우저 메일 링크 시나리오(정상·같은 링크·옛 메일·만료·약한 비번·아이디 찾기, 손님 3종)·한도 분리(찾기 6번째 429 → 재설정 400)·`verify-all --full` 23/24(남은 1 = deploy-ready 배포 준비 몫)·mount sweep 8역할 크래시 0 은 보고 그대로 수용(프론트 재빌드·sweep 재실행은 요청대로 하지 않음).
- 잔재: `users zz%` 0 · `customers reset_token_hash` 보유 0 · `/var/www/dev-backend/test-*.js` 없음.

## 5. 배포 안전성
- DB 마이그 0 · 스키마 접촉 0. 백엔드 응답은 **덧붙임만**(기존 키 전부 유지) → 옛 번들과도 호환.
- 프론트 변경 있음 → SW 버전은 Opus 몫(이미 빌드·반영 보고). 롤백은 코드만 되돌리면 끝.
- 한도 분리로 `/reset-password` 가 10/15분으로 늘었지만 토큰은 32바이트 무작위 + bcrypt 비교라 추측 불가. 운영 반영: 다음 배포 때.

## 6. 관찰 (배포 조건 아님)
1. `RESET_LINK_USED` 와 `RESET_LINK_REPLACED` 를 가르면 «이 메일 계정이 있고 재설정 요청이 걸려 있다» 가 응답으로 드러난다. 다만 가입 라우트가 이미 «already registered» 로 계정 존재를 알려 주고, 로그인도 `EMAIL_NOT_VERIFIED` 로 드러내므로 **새 노출면이 아니다**(한도 10/15분 안). Irene 지시(이유 안내)가 우선 — 그대로 둠.
2. Landing 찾기 화면 placeholder 가 여전히 `you@example.com`(라벨은 «Email or username») — 다음에 손댈 때 `you@example.com or username` 로.
3. `void Op;` 한 줄(쓰지 않는 import 잠재우기) — 다음에 손댈 때 `Op` require 자체를 지우면 정석.

## 7. 마커
`fable-gate.js pass` 는 워킹트리 전체 지문에 찍힌다. **이 PASS 가 판정한 범위는 위 표의 파일(비밀번호 재설정 이유 일 + health-check 의 defineAuthTests 비밀번호 검사)** 이다. 같은 트리의 `middleware/auth.js`·brand performance·GTM·playwright.config·index.html·oneoff 등 다른 방 변경은 각자의 판정에 따른다.
