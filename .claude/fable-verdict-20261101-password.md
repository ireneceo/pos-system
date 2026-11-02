# Fable 게이트 판정 — 비밀번호 찾기·변경 전 역할 점검 (2026-11-01)

**판정: PASS** (조건 없음 · 권고 2건은 배포를 막지 않음)

사실 문서: `.claude/fable-facts-20261101-password.md` · Irene 원문 «브랜드제너럴 매니저가 비밀번호 찾기 및 변경이 안된대. 모든 아이디 역할과 모든 경로에서 문제있는 상황 체크해서 다 해결해줘.» → «권고대로 진행해 줘»

## 1. 게이트 대상 근거
- `check-sensitive-diff.js`: ⑤ 보안 경계(`routes/auth.js`) 접촉 + 외부 발송(메일 판정 완화) + 비밀번호 변경 라우트 권한 변경 → **gate 대상 맞음**.
- 🔒 인쇄 보호파일 무접촉: `check-print-guard.js` 8/8 변경 없음.

## 2. diff 범위 대조 — 설계(사실 문서 «바꾼 것») 밖 변경 0
| 파일 | 본 것 | 판정 |
|---|---|---|
| `routes/users.js` PATCH `/:id/password` | 본인만(403) · 표준 `{success,message}` · 비번 바꾸면 reset_token 비움 · catch 500 일반 문구 · 입력 누락 400 | 범위 안 |
| `routes/users.js` POST `/:id/reset-password` | 404/403/500 응답 형식만 표준화 — 권한 분기(SA/BG/FG/RA/Owner) 본문 무변경 확인 | 범위 안 |
| `utils/emailService.js` | `selfRequested` 가 is_test·«닿는 매장 전부 데모» 두 판정만 건너뜀. 형식/placeholder(`emailLooksValid`)·반송 3회 차단은 그대로. `sendPlatformEmail` 만 전달·전달 후 삭제. 엔티티/발행자 경로(237·445행)는 읽지 않음 | 범위 안 |
| `routes/auth.js` forgot-password | `selfRequested:true` 한 줄. is_demo 는 라우트가 먼저 조용히 200 반환(무변경) · 모르는 메일도 같은 문구(계정 존재 노출 없음) | 범위 안 |
| 화면 4곳 (Profile/Staff/StaffManagement/Managers) | 오류를 항상 글자로. `response.json()` 중복 소비 없음 확인 | 범위 안 |
| `scripts/health-check.js` auth 1건 | 임시 사용자 2명 만들고 finally 삭제 · 실제 메일 발송 없음(판정 함수만 호출) · 같은 파일의 «브랜드 매장 범위» security 1건은 **다른 방(brand performance)** 것 — 이 판정 밖 | 범위 안 |

**권한 설계 점검(내가 본 것):**
- `req.user.id` 는 모자(projectContext) 투영에서도 `...baseUser` 로 **그대로** — 모자 쓴 사용자의 본인 변경이 403 으로 막히지 않는다. 화면 `currentUser.id` 는 dbUser/authUser 의 id(= 본래 계정) 라 서버와 같은 값.
- PATCH `/users/:id/password` 호출자는 전 저장소에서 **ProfilePage 하나(본인 id)** 뿐 — 관리자가 남의 비번을 이 길로 바꾸던 화면 없음 → 본인 한정이 어떤 흐름도 끊지 않음. 관리자 리셋은 별도 `reset-password` 경로 그대로.
- 메일 완화의 범위: 본인이 주소를 쳐서 요청한 비밀번호 찾기 **한 경로**만. 알림·청구 메일의 is_test/데모 차단은 그대로(sendEntityOrPlatformEmail·sendIssuerEmail 은 플래그를 읽지 않음).

## 3. 가드 스크립트
- `check-print-guard.js` 8/8 변경 없음 · `check-sensitive-diff.js` 대상 판정(위) · Opus 보고: design-guard 신규 0 · i18n 통과 · type-baseline 단독 재실행 통과 (Fable 재실행 안 함 — 프론트 번들 재빌드 금지 원칙).

## 4. 실호출·회귀 (Fable 독립 재실행)
- `health-check --category=auth` **21/21** (새 검사 포함).
- **고장주입 1/1**: `users.js` 본인 판정 `if (String(req.params.id) !== String(req.user.id))` → `if (false)` 로 바꾸고 pm2 restart → 새 검사 **실패(«남의 id 변경 200»)** → 사본으로 원복 `cmp` 동일 → restart → **21/21 통과**. 반증 성립.
- 익명 PATCH `/api/users/1/password` → **401**. 모르는 메일 forgot-password → 200 + 같은 문구.
- 임시 사용자 잔재 `zzhcpw%` **0건**. 사실 문서의 11역할·관리자 리셋 3경로·실브라우저 6역할·고장주입 2/2 숫자는 Opus 보고 그대로 수용.

## 5. 배포 안전성
- 마이그레이션 없음 · 롤백 = 코드만.
- 프론트 4화면 변경 → SW 버전은 같은 트리에 다른 방이 올린 `6.05-brand-performance-20261101` 이 있어 함께 나가면 됨. **이 일만 따로 커밋·배포하면 SW 번호가 안 올라가므로 /개발완료·배포 때 bump 가 같이 실리는지 확인.**
- 운영 반영: 다음 배포 때.

## 6. 권고 (배포 조건 아님)
1. `health-check.js` 새 검사의 `brand_id = 1` 하드코딩 → 같은 파일 다른 검사처럼 데모 브랜드를 조회해 쓰는 것이 안전(dev 에서 1 = K-DINE with MIN · is_demo=1 이라 지금은 통과).
2. 범위 밖(Irene 답 대기 중): 고객(모바일) 재설정 토큰이 `routes/customers-auth.js` 메모리 Map — 재시작·다중 프로세스 시 링크 실패. 이 판정에 포함하지 않음.

## 7. 마커
`fable-gate.js pass` 는 워킹트리 전체 지문에 찍힌다. **이 PASS 가 판정한 범위는 위 8개 파일(비밀번호 일)만** — 같은 트리의 brand performance·오너 승인 등 다른 방 변경은 각자의 판정이 유효(오너 승인은 2026-11-01 PASS 기록 있음, brand performance 는 그 방 판정에 따름).
