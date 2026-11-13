# [Claude Code · Fable 판정] 연결(모자) 관리자 매장 PIN — gate

- 날짜: 2026-11-13 · 판정: Fable(리더) · 대상: 작업 디렉터리 미커밋분(설계 fable-design-20261113-hat-admin-pin.md · 요청 fable-gate-request-20261113-hat-admin-pin.md)
- **판정: 조건부 — 고칠 것 1건(보안 경계). 지금은 통과 마커를 찍지 않았다.** 아래 1건을 고치고 숫자 3개가 나오면 PASS(그때도 verify-all --full 결과 확인 조건부).

---

## 1. 막는 것 1건 — 모자가 회수되면 PIN 세션이 «본래 매장 관리자» 가 된다

**실호출로 확인(개발 · 데모 매장 1·2 · 시험 계정 만들고 지움 · 남은 행 0):**

| 순서 | 호출 | 결과 |
|---|---|---|
| 모자(매장 1 관리자) PIN 로그인 | POST /staff/verify-pin | 200 · role RA · rid 1 · ctx{restaurant,1,RA} · amr pin |
| 회수 전 | GET /restaurants/2(본래 매장) | 403 |
| 모자 행 삭제(회수) 뒤 같은 토큰 | GET /auth/me | 200 · **restaurant_id 2** · X-Context-Fallback: revoked |
| 〃 | GET /restaurants/2 | **200** |
| 〃 | GET /users | **200 · 본래 매장 직원 6명** |
| 〃 | GET /restaurants/1 | 403 |

뜻: 매장 A 기기에서 4자리 PIN 으로 연 세션이, 그 사람의 A 연결이 끊기는 순간 **그 사람 본래 계정 전체(본래 매장 관리자 · 본래가 브랜드·오너면 그 범위)** 로 바뀐다. A 매장 기기 앞에 있는 누구나 그 화면을 쓴다. `switch-context` 를 PIN 세션에 막은 이유(«PIN 하나가 계정 전체 열쇠가 되지 않게» — 설계 §2.4-1)와 정면으로 어긋난다. 같은 폴백은 모자 확인 쿼리가 오류일 때도 일어난다(`projectContext` catch → fallback).

**원인은 구현이 아니라 내 설계다.** 설계 §4-4 에 «이미 받은 토큰 → 본래로 폴백(권한 확대 0)» 이라고 썼는데, 비밀번호 세션에는 맞고 PIN 세션에는 틀리다. 요청서의 «이미 받은 토큰 store38 403(폴백)» 은 연결 매장이 막히는 것만 봤고 본래 매장이 열리는 쪽은 보지 않았다. 설계 문서 §4-4 는 이 판정으로 고친다: **PIN 세션은 폴백하지 않고 401.**

### 고칠 것 (middleware/auth.js 두 곳 · 그 밖 무변경)
- `authenticateToken`: `decoded.ctx` 투영 결과가 `projection.fallback` 이고 `decoded.amr === 'pin'` 이면 `req.user` 를 바꾸지 말고 **401** `{ success:false, error:{ message:'Session expired', code:'PIN_CONTEXT_REVOKED' } }` 로 끝낸다. (화면은 401 을 로그아웃으로 처리 → PIN 패드로 돌아감 = 맞는 동작.)
- `optionalAuthenticateToken`: 같은 조건이면 **로그인 안 한 것으로** 지나간다(그 함수가 잘못된 토큰을 다루는 방식 그대로 · 본래 계정을 `req.user` 에 싣지 않는다).
- 비밀번호 세션(amr 없음)의 폴백은 지금 그대로.

### 다시 볼 숫자 3개 (이것만 — 빌드 필요 없음 · pm2 restart 뒤 HTTP)
1. health-check `auth` 에 케이스 추가: 모자 PIN 토큰 → 회수 → 같은 토큰으로 `/auth/me` **401** 그리고 본래 매장 조회가 200 이 아님. auth 전체 통과.
2. 고장 주입: 위 401 분기를 빼면 그 케이스가 실제로 실패 → 원복 뒤 통과.
3. 무회귀: 비밀번호로 전환한 모자 토큰은 회수 뒤 지금처럼 200 + `X-Context-Fallback`(기존 케이스 통과) · 본래 직원 PIN 토큰(ctx 없음) 영향 없음.

고친 뒤 이 Fable 세션에 결과를 덧붙여 보내면 그 차이만 보고 마커를 찍는다(전체 재검증 아님). 프론트 번들은 안 바뀌므로 실브라우저 sweep 을 다시 돌릴 필요 없다(백엔드 게이트만 재실행).

---

## 2. 통과로 본 것 (코드 대조 + 요청서 숫자)

- **범위:** 바뀐 파일이 설계 §3 목록과 일치. 인쇄 보호파일 8개·KDS·K-DINE 메뉴 무접촉(print-guard 8/8). 범위 밖 미커밋(GTM: index.html·tracking.ts·MARKETING_TRACKING.md·gtm json · playwright.config · oneoff)은 **이 커밋에 넣지 않는다**.
- **PIN 조회 한 곳:** 매장 PIN 을 찾는 5곳(verify-pin · verify-pin-permission · void · cash · 출퇴근 관리자)이 전부 `findStorePinHolder` 만 부른다. 남은 `pin_code` 조회는 공급업체(다른 범위)와 출퇴근 본인 찍기(설계상 제외)뿐 — grep 확인.
- **무회귀:** 본래 계정 조건은 호출처마다 종전 역할 조건을 그대로 넘김(`nativeRoles`). 본래 토큰 claim = 이전 + amr.
- **경계:** `context-pin` 은 토큰의 모자 행 하나만 대상(주소·본문으로 행을 고르지 않음) · PIN 세션 403 · 4자리 검사 · 겹침은 세 군데 모두 `isPinTaken`(양쪽 조회). 공개 응답은 성공/«Invalid PIN» 둘뿐. PIN 토큰을 amr 없이 다시 내주는 길 없음(토큰 발급처 7곳 확인 — 새로 받는 길은 switch-context 하나이고 막혀 있음).
- **D2:** 기억은 비었을 때만 채움 · 매장 고르기에서 다른 매장은 기존 확인 창을 거친 뒤에만 바뀜(확인 창 실재 확인). 지금 «8번 기기» 로 잘못 적힌 28번 기기는 Kate 가 이메일 로그인 → 28 고르기 → 확인 하면 28로 돌아온다.
- **D3·D4:** 429·비활성·그 밖 문구 갈림(LoginPage 가 던진 문구를 그대로 표시) · 비활성 계정 PIN 거부.
- **마이그:** 칸 하나 ADD · 멱등 · exit · 레지스트리 deploy 등록. 롤백은 코드만 되돌리면 됨(남는 칸은 무해).
- **설계와 다르게 한 3건:** 전부 수용. ① 연결 관리자 본인만(System Admin 대리 설정 없음) — 더 좁은 쪽이라 안전 ② 기기 기억 갱신 위치 ③ 정렬 방식 맞춘 비교.

## 3. 막지 않지만 적어 둘 것
- `staff.js` 모자 토큰의 `branch_id: staff.branch_id` — 조회 칸에 branch_id 가 없어 항상 비어 있다. 투영이 어차피 null 로 덮어 무해. 줄을 빼거나 그대로 두거나 무방.
- 새 health-check 케이스의 PIN 이 난수(8000~8998)라 그 매장에 같은 PIN 이 있으면 헛실패한다 — `isPinTaken` 으로 빈 번호를 고르게 하면 끝(이번 수정 때 같이).
- 다른 매장으로 넘어가는 확인 창 문구가 «이 기기의 매장이 바뀐다» 는 말을 하지 않는다. 이번엔 그대로(다음 문구 정리 때).

## 4. 확인 못 한 것
- verify-all --full 최종 결과(요청 시점에 실브라우저 단계 진행 중) — **PASS 는 이 결과 실패 0 확인 조건부.**
- 운영 데이터의 PIN 겹침(본래 계정끼리) 읽기 · 운영 매장 28 연결 행의 역할. **역할이 Restaurant Admin 이 아니면 배포해도 Kate 는 «Set my PIN» 이 안 보이고 403 이다** — 배포 전에 읽어서 확인해야 «kdineipc1 제대로 되게» 가 성립한다.
- 실기기 안드로이드 앱.

## 5. 배포 뒤 운영 순서(Irene·Kate — 설계 §5 그대로, 한 줄 보탬)
Kate: 28번 기기에서 «Use email sign-in» → kdineipc1 → 28번 고르기(확인) → Staff 화면 본인 줄 «Set my PIN»(직원 69 의 PIN 과 다른 번호) → 이후 그 PIN 으로 관리자 로그인. 69 정리는 그 뒤.

---

## 6. 재판정 (같은 날 · 고친 차이만) — **PASS · verify-all --full 결과 확인 조건부**

- 고친 것: `middleware/auth.js` 두 곳(PIN 세션 + 모자 회수 → 401 `PIN_CONTEXT_REVOKED` / optional 은 비로그인) + `routes/auth.js` GET `/me`(미들웨어 없이 투영을 직접 부르던 세 번째 자리 — 팀원이 찾음 · 같은 규칙이라 수용). 투영을 부르는 곳은 이 3곳이 전부(grep) · 소켓은 원래 회수 시 연결 거부.
- Fable 직접 실호출(데모 1·2 · 시험 계정 지움 · 남은 행 0): 회수 뒤 PIN 토큰 → `/auth/me`·본래 매장·연결 매장·`/users`·`/auth/contexts` **전부 401 PIN_CONTEXT_REVOKED** · `switch-context` 401. 비밀번호로 전환한 모자 토큰은 회수 뒤 종전대로 200 + `X-Context-Fallback`(무회귀).
- Fable 직접: health-check auth 24/24 · print-guard 8/8. 팀원 실측 수용: 고장 주입(401 분기 제거 → 1건 실패 → 원복 24/24).
- **조건:** verify-all --full(실브라우저 sweep) 실패 0. 실패가 나오면 이 PASS 는 무효로 보고 그 실패를 Fable 에 다시 보낸다(sweep 도중 pm2 restart 3회가 있었으므로 실패 시 먼저 그 영향인지 가른다). 마커를 찍은 뒤 코드를 한 줄이라도 고치면 마커는 죽는다.
- 배포 전 남은 읽기 1건(§4): 운영 매장 28 연결 행의 역할이 Restaurant Admin 인지.
