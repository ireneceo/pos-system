# [Claude Code · 팀원 요청] PIN 세션 매장 이동 — 비밀번호 확인 창 (gate)

- 날짜 2026-11-13 · 작업방 7ed4ec6a · Irene 원문: «pin으로 관리자 들어가면 다른 레스토랑으로 가려는 좌측 이동 (멀티역할 선택 페이지)을 못하잖아. 그럼 다시 핀을 풀던지 하면서 안내를 하던지 해야지. 그리고 관리자가 핀번호 쓸 이유도 없잖아. 없어도 되는 거 아니야?» → Fable 권고 A → Irene «권고대로 진행해 줘»
- 바뀐 파일(이 방): dev-frontend/src/pages/ContextSelect/ContextSelectPage.tsx · public/locales/{en,ko,zh,ms}/auth.json (context.pinUnlock.*). 서버·storePin·인쇄 보호파일 무접촉.
  - 같은 작업 디렉터리의 다른 방 미커밋(매장 알림 분리 — 마커 3dbc90418e37 은 이 변경으로 지문이 바뀌어 무효 · 멀티로그인 라벨 등)은 이 방이 건드리지 않음. 같은 파일 ContextSelectPage.tsx 에 다른 방 주석 1줄(510행) 있음.
- 동작: switchContext 결과 PIN_SESSION → 비밀번호 창(공용 Modal). 계정 칸 = 지금 토큰의 email(없으면 username) 읽기 전용. 제출 = 기존 AuthContext.login(같은 계정) → 성공 시 기존 applySwitch(고른 카드) 다시. 틀리면 login 이 false → 토큰 그대로·문구 «Incorrect password.». 429/비활성은 login 이 던진 문구 표시.
- 실측(개발 · 시험 계정 pinunlock-chk 8054 · 본래 RA 39 PIN 8100 · 38 모자 RA PIN 8100 — 아직 지우지 않음, 판정 뒤 지움):
  - 서버: PIN 토큰으로 switch-context 403(그대로) · 틀린 비밀번호 login 401 · 그 뒤 PIN 토큰 /me 200
  - 실브라우저(모자 PIN 38 → 본래 39 카드): 기기 확인 창 → 비밀번호 창 1 · 틀림 → 문구 + 토큰 그대로 · 맞음 → /restaurant/39/dashboard · /me RA 39 · 새 토큰 amr 없음 · 기기 기억 39(확인 창에서 Switch 를 눌렀으므로) · 다시 38 로 → 창 없이 이동(RA 38) · pageerror 0
  - 실브라우저(본래 PIN 39 → 모자 38 카드): 같은 결과(창 1 · 틀림 유지 · 맞음 → 38 대시보드 · 재전환 창 없음 · pageerror 0)
  - 첫 빌드에서 Enter 제출이 안 되는 결함 발견(입력 2칸 폼 + 제출 버튼 없음) → 비밀번호 칸 onKeyDown 으로 고침 → 재빌드 후 위 결과
- verify-all --full: 23/24 — 실패 1 = deploy-ready(배포 기록 파일 releases/2026-11-13-*.json 이 작업트리에서 archive 로 옮겨져 없음 · 배포 준비 몫, 이 변경 무관) · mount sweep 통과 · health-check 전체 통과 · 타입 신규 0 · i18n 일치 · print-guard 포함 통과
- 참고: 이 변경으로 작업트리 지문이 바뀌어, 다른 방(매장 알림 분리 · .claude/fable-verdict-20261113-notification-store-scope.md)이 받은 마커도 무효가 됨. 그쪽 코드는 이 방이 손대지 않음(git diff 로 확인 가능).
