# Fable 검증 요청(gate) — 연결(모자) 관리자 매장 PIN (설계 fable-design-20261113-hat-admin-pin.md)

Irene: «빨리 고쳐서 배포 준비해» · «코드를 고치고 나서 운영DB에서 바꿀 거 있어? kdineipc1 제대로 되게 해줘.»
앞선 작업(인쇄 지킴이 + N 잠금)은 b3b2bbc1b · 배포 준비 65f206101 로 커밋됨. 이 요청은 그 뒤 미커밋분만.

## 바뀐 파일(이 작업분)
- 백엔드: models/UserContext.js(pin_code) · scripts/migrate-add-user-context-pin.js(새 · 칸 하나 ADD · 멱등 · registry deploy) · utils/storePin.js(새 · findStorePinHolder · isPinTaken) · routes/staff.js(verify-pin 2모양 + amr · verify-pin-permission) · utils/voidPinGuard.js · utils/cashPinGuard.js · routes/attendance.js(관리자 PIN) · middleware/auth.js(req.authMethod 2곳) · routes/auth.js(switch-context PIN_SESSION 403 · PUT /context-pin) · routes/users.js(겹침 2곳 isPinTaken · include_contexts 에 RA 모자 행 has_pin/linked_admin/is_self) · scripts/health-check.js(auth 2건) · scripts/inspection/suites/user-contexts.js(UC-011)
- 화면: contexts/AuthContext.tsx(D2 기억은 비었을 때만 · D3 429/403/기타 문구) · pages/ContextSelect/ContextSelectPage.tsx(매장 확정 시 기억 갱신 · PIN_SESSION 안내) · pages/Staff/StaffPage.tsx(연결 관리자 읽기 전용 행 · 본인 «Set my PIN» 창) · locales auth·staff 4개 언어
- 범위 밖 미커밋(손대지 않음): GTM 4파일 · playwright.config · oneoff

## 설계와 다르게 한 것
1. `PUT /context-pin` 을 연결 «관리자»(Restaurant Admin 모자)로 한정(설계 §2.7 «연결 직원 PIN 은 2단계» 를 서버에서도 막음). System Admin 이 남의 모자 PIN 을 정하는 길은 만들지 않음(설계 §2.4-2 «+SA» — 이번엔 본인만).
2. 기기 기억 갱신은 ContextSelectPage.applySwitch 성공 시(매장 카드) — 기억이 비었거나 다른 매장(onPick 의 기존 «다른 매장 기기» 확인을 거친 경우)일 때. 기본 카드는 이름을 비움(카드 이름이 사람 이름이라).
3. 인스펙션 UC-011 은 두 표 정렬 방식이 달라 CONVERT … COLLATE utf8mb4_unicode_ci 로 비교.

## 검증 숫자
- 실호출(개발 · 데모 38·39 · 시험 계정 만들고 지움): 전환 200 · 모자 PIN 겹침(본래 0430) 400 · 형식 오류 400 · 저장 200 · 모자 아닌 토큰 400 · PIN 로그인 200 role RA rid 38 claim ctx{restaurant,38,RA}+amr pin · 그 토큰으로 프린터 설정 저장 200·DB 반영 · 다른 매장 39 GET 403 · switch-context 403 PIN_SESSION · PIN 세션 context-pin 403 · verify-pin-permission(void) authorized true · 본래 직원 0430 무회귀(id 428 Staff rid 38 · claim 키 = 이전 + amr · ctx 없음) · 본래 PIN 세션 switch 403(동작 변경 1건) · 직원 생성 겹침 400 · 남의 매장 401 · 비활성 401 · 모자 회수 뒤 PIN 401 · 이미 받은 토큰 store38 403(폴백) · 프린터 설정 원본 복원 일치
- health-check auth 24/24(새 2) · 고장 주입: switch-context 차단 제거 → 새 1건 실패 · isPinTaken 한쪽만 → 새 1건 실패 · 원복(cmp) 24/24
- 인스펙션 UC-011 0건 · 고장 주입(겹치는 모자 PIN 넣기) → 1쌍 실패 · 원복 0건
- D2 재현: 고치기 전 번들 → 기기 기억 38→39 덮임·PIN 패드 39 표시 / 고친 번들 → 38 유지 · 매장 38 직원 PIN 0430 → 200 → /restaurant/38/dashboard
- D3: 로그인 429(가로챔) → «Too many login attempts from this network…» 표시
- Kate 시나리오(실브라우저): 직원 화면 연결 관리자 행 «Linked account · RESTAURANT ADMIN · Set my PIN» → 0430 «already used» → 7391 저장(DB) → «**** · Change my PIN» → PIN 패드 7391 → /restaurant/38/dashboard · /me role RA rid 38 · 프린터 칸 잠김 0 · 화면 오류 0
- print-guard 8/8 · design-guard 신규 0 · i18n 오류 0 · tsc 바뀐 파일 오류 0 · jest 기존 PIN 관련 통과
- verify-all --full: (돌아가는 중 — 결과는 아래 덧붙임)

## 확인 못 함
- 운영 데이터 UC-011(본래 PIN 겹침) 읽기 — 운영 읽기 허락 없음. 운영엔 pin_code 칸이 아직 없어 모자 쪽은 0.
- 운영 매장 28 모자 행 역할(Irene 읽기 명령 대기).
- 실기기 안드로이드 앱(웹 번들 원격 로드라 같은 화면).
