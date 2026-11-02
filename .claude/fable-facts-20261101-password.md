# 사실 전달 — 비밀번호 찾기·변경 전 역할 점검 (작업방 cd0a3032 · Opus 팀원)

## Irene 원문
«브랜드제너럴 매니저가 비밀번호 찾기 및 변경이 안된대. 모든 아이디 역할과 모든 경로에서 문제있는 상황 체크해서 다 해결해줘. 이거 기본기능인데.»
이후 «권고대로 진행해 줘» (운영 nginx 접속 기록은 읽지 않고 바로 고침)

## 실측 (고치기 전)
- 운영 DB(읽기): aidan(id 65, Brand Manager, is_test=0) 11-01 05:28 UTC 찾기 요청 → reset_token 미사용·06:28 만료. 운영 .env FRONTEND_URL 없음 → 링크가 dev 주소(09c037091 에서 이미 고침, 미배포).
- 개발 11역할 임시 계정 실호출: 로그인·변경·찾기·재설정은 전 역할 동작. 문제:
  1) PATCH /api/users/:id/password 틀린 현재 비번 → 400 `{error:{message,code}}` → ProfilePage.tsx 가 `setPasswordError(errorData.error)` 로 객체를 렌더 → 화면 깨짐(전 역할)
  2) 같은 라우트가 req.params.id ≠ req.user.id 를 허용(남의 현재 비번만 알면 변경) — 실측 200
  3) 찾기 메일: utils/emailService.js screenRecipients 가 is_test 계정 주소와 «닿는 매장 전부 데모» 계정 주소를 버림 → 운영에 실제 사람으로 보이는 is_test 계정 있음(오너 naver.com · 푸드코트 gmail.com 등)
  4) POST /api/users/:id/reset-password(관리자) 403/404/500 도 error 객체·문자 섞임 → StaffPage.tsx:711 이 객체 렌더 가능, StaffManagementPage 는 "[object Object]"
- 참고: middleware demoProtection 은 req.user.is_test 를 보지만 authenticateToken 의 req.user 에 is_test 가 없어 is_test 본인 변경은 원래 막히지 않음(변경 안 함).

## 바꾼 것 (이 일 파일만 — 같은 폴더 다른 미커밋은 다른 방 것: middleware/auth.js·restaurants-crud·managerBrandScope·brand performance 등)
- dev-backend/routes/users.js: PATCH /:id/password = 본인만(403) · 표준 {success,message} · 변경 시 reset_token 비움 · 500 은 일반 문구. POST /:id/reset-password 응답만 표준화(권한 판정 무변경).
- dev-backend/utils/emailService.js: screenRecipients opts.selfRequested → is_test·데모전용 도달 판정 건너뜀(형식·placeholder·반송 3회 차단 유지). sendPlatformEmail 만 전달(전달 후 mailOptions 에서 삭제). screenRecipients export(검사용).
- dev-backend/routes/auth.js: forgot-password 의 sendPlatformEmail 에 selfRequested:true (is_demo 사용자는 라우트가 먼저 조용히 반환 — 무변경).
- 화면: ProfilePage.tsx · StaffPage.tsx · StaffManagementPage.tsx · ManagersPage.tsx — 오류를 항상 문자열로(message → error.message → 문자열 error).
- dev-backend/scripts/health-check.js: auth «비밀번호 — 본인 변경·남의 id 403·틀린 현재 비번은 글자 응답·재설정 링크 1회용·찾기 메일 본인요청» 1건 추가.

## 검증 숫자
- 11역할(SA·BG·BM·FG·FM·Owner·RA·Staff·SupA·SupStaff·Referral) 임시 계정 API: 로그인(메일·아이디) 200 · 틀린 현재 비번 400 문자열 · 변경 200 → 새 비번 로그인 200 · 찾기 200+토큰 · 재설정 200 → 로그인 200 · 재사용 400 · 남의 id 변경 403(전 200) · 메일 판정 is_test 기본 버림 / selfRequested 보냄.
- 관리자 리셋: BG→BM(brands·users) · FG→FM(foodcourts) · RA→Staff(users) 200 → 임시 비번 로그인 200 · RA→BM 403 문자열 · 없는 id 404 문자열.
- 실브라우저(빌드 후, dev.purplehere.com): BM·BG·RA·Staff·FM·SupA 6역할 프로필 Change Password — 틀린 현재 비번 안내 글자 표시·ErrorBoundary 0 · 정상 변경 성공 문구 · 새 비번 로그인 200 · console.error 0(SupA 1건 = 임시 공급업체 회사 없음, 무관).
- 고장주입 2/2: 본인 확인 제거 → 새 검사 실패 / selfRequested 무력화 → 실패 → 원복(cmp 동일) → 통과.
- health-check auth 21/21 · verify-all --full 21/24: 실패 3 = deploy-ready(배포 준비 몫, 이전과 같음) · inspection O-INT-001 1건 = 주문 41909(매장 38 «[확인용] Performance boundary» — 다른 방 brand performance 시험 데이터, 이 일과 무관) · type-baseline 은 PlanQ tsc 메모리 게이트로 막혔다가 단독 재실행 통과. mount sweep 8역할 크래시 0 · print-guard 8/8 · design-guard 신규 0 · i18n 통과.
- 임시 계정 전부 삭제.

## 남은 것 (Irene 답 대기 — 이번 판정 범위 밖)
- 고객(모바일) 재설정 토큰이 routes/customers-auth.js 메모리 Map(resetTokens) → 재시작·다중 프로세스 시 링크 실패. 상황판 질문 A(DB 저장)/B/C 답 대기.

---
## 추가 (2026-11-02) — 고객(모바일) 재설정 링크 DB 보관 · Irene «권고대로 진행해 줘»(A: DB 저장)
- 첫 게이트 PASS 판정문: .claude/fable-verdict-20261101-password.md (권고 1 brand_id=1 하드코딩 → 데모 브랜드 조회로 반영)
- 바꾼 파일(이 일): dev-backend/routes/customers-auth.js(메모리 Map 삭제 → sha256 해시를 customers 에 저장 · 확인/재설정은 해시 조회 · 만료 시 칸 비움 · 재설정 시 비번+칸 한 번에) · models/Customer.js(칸 3 + toJSON 에서 3칸 제외) · scripts/migrate-customer-reset-token.js(새 · 멱등 ADD COLUMN ×3 + 인덱스) · scripts/migrations.registry.json(deploy 끝에 추가) · scripts/health-check.js(auth 1건 추가 + 권고 1 반영)
- 개발 DB 마이그 적용 1회(칸 3·인덱스 1). 재실행 시 전부 skip(멱등) 은 아직 운영 미실행.
- 실호출: forgot 200 → 해시 저장·만료 60분 · 확인 valid(slug 포함) → **pm2 restart 뒤에도 valid** · 틀린 토큰 400 · 재설정 200 → 새 비번 손님 로그인 200 · 재사용 400 · 만료 400 + 칸 비움 · toJSON 에 reset_token 칸 0
- health-check auth 22/22 · 고장주입 1/1(옛 메모리 Map 판을 git HEAD 에서 넣고 restart → 새 검사 실패 → cmp 원복 → 22/22)
- verify-all(정적+회귀) 20/23: deploy-ready(배포 기록 파일 — 배포 준비 몫) · inspection O-INT-001(다른 방 시험 주문 41909) · type-baseline(PlanQ 빌드 메모리 게이트 — 재실행 예정). health-check 전체 통과 · migration-registry 통과.
- 화면 변경 없음(손님 화면은 같은 API 계약).
