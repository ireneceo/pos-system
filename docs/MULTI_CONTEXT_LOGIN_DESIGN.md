# 멀티 역할/매장 선택 로그인 (Multi-Context Login) — 설계 문서

**작성일:** 2026-08-20 · **개정 v2:** 2026-08-20 (독립 검증 `MULTI_CONTEXT_LOGIN_REVIEW.md` 조건부 GO 반영)
**작성:** Fable (Irene 지시 — 설계는 Fable 담당) · **검증:** 독립 Fable 세션 (적대 검증)
**상태:** v2 개정판 — Irene 승인 대기. **코드 변경 0** (이 문서가 이번 작업의 유일한 산출물)
**목표(Irene 원문):** "로그인하면 역할을 멀티로 선택해서 해당 관리페이지들 각각 들어가는 것"
— 한 사람이 여러 매장·여러 자격(브랜드 총괄이면서 특정 매장 관리자 등)을 가질 때, **계정을 여러 개
만들지 않고 하나로 로그인해서 컨텍스트를 고르고 전환**하는 업계 표준 방식
(Google 계정 선택 / Slack 워크스페이스 전환 / Toast·Square 매장 선택).

> 모든 "실측" 표기는 2026-08-20 dev(`purple_dev_db`) + 운영(87.106.78.146, 읽기 전용) 기준.
> 근거는 `파일:줄` 로 표기. 확인 못 한 것은 "미확인"으로 명시.
> **v2 변경 요약과 검증 지적 대응표는 부록 B.** 검증 리뷰 원문: `docs/MULTI_CONTEXT_LOGIN_REVIEW.md` (무수정 보존).

---

## 0. 선행 세션 실측 5개 — 재검증 결과 (정정 포함)

session-state.md "🔜 멀티 역할/매장 선택 로그인" 블록의 실측 사실을 전부 직접 재확인했다.

| # | 선행 세션 주장 | 재검증 판정 | 근거 |
|---|---|---|---|
| 1 | 활성 컨텍스트 = `users.restaurant_id` 스칼라 1개. 멀티 접근은 `restaurant_managers` 로만 (dev oversight 22 / ownership 6) | ✅ 맞음 (행 수 22/6 일치) | `middleware/auth.js:25-42`, dev DB 실측 |
| 1' | "복수 매장 보유 유저 **3명**" | 🔧 **정정 — 7명** (demo 계정 포함. demo·시드 제외 시 5명: user 2, 5, 6, 11, 154) | dev `restaurant_managers` GROUP BY manager_id HAVING n>1 → user 2,5,6,11,22,154,289 |
| 2 | PIN 캐셔 전환이 새 JWT 발급으로 컨텍스트 전체를 교체하는 선례 | ✅ 맞음 | `routes/staff.js:34-43` (jwt.sign), 프론트 `AuthContext.tsx:792` `switchUser()` |
| 3 | HTTP 라우트 권한판정은 stale 하지 않다 — `authenticateToken` 이 매 요청 `User.findByPk` 재조회 | ✅ 맞음 (정정된 버전이 옳다). **토큰 claim 은 HTTP 판정에 사실상 무시**되고 `req.user` 는 전부 DB 컬럼으로 재구성된다 | `middleware/auth.js:25` (findByPk), `:30-42` (req.user 재구성 — decoded 에서 쓰는 건 userId 뿐) |
| 3' | "소켓 등 비-HTTP 경로는 별도 확인 필요" (미확인 상태였음) | 🔧 **확인 완료 — 소켓은 HTTP 와 반대로 순수 claim 기반.** `makeSocketAuth` 가 `socket.data.user` 를 **토큰 claim 그대로**(`d.role`, `d.restaurant_id`, `d.brand_id`, `d.foodcourt_id`)로 만들고 DB 재조회 없음. 추가로 emit 권한판정은 소켓별 `ridAuth` Map 에 **소켓 수명 동안 캐시**된다 | `services/socketService.js:65-69` (claim→socket.data.user), `:129-132` (ridAuth 메모) |
| 4 | 선행 조건 = 접근판정 4중화 통합 (안 하면 "고른 매장 403" / 권한 확대) | 🔧 **부분 정정 — 통합 "완주"(103라우트 전환)는 선행조건이 아니다.** §5 상술. **v2 정밀화**: "일치 경로 투영" 논리는 **restaurant 모자에만** 성립한다(§5.2, 검증 F4) — 그래서 v1 부여 가능 모자를 restaurant 로 한정한다 | `middleware/auth.js:195-206` vs `:400-402` (RA/Staff 는 두 판정처 모두 동일한 스칼라 비교), [[reference_restaurant_access_four_gates]] |
| 5 | 관련 함정 메모리 4건 | ✅ 전부 반영 (§3 UNIQUE 함정, §4.6 id 정규화, §4.4 소켓, §6.5 snake_case) | 각 절 참조 |

**신규 실측 (선행 세션에 없던 것 — v2 수치 정정 포함):**
- `services/restaurantScope.js` 는 **아직 존재하지 않는다** (four-gates 메모리의 "정석 resolver"는 미착수 상태).
- 판독처 규모 — **v2 정정 (v1 의 323/84 는 `targetUser.role` 등 비-`req.user` 판독까지 집계한 과대치였다.
  검증 F9 지적 수용, 재실측):** 백엔드 `req.user.role` **정확 판독 259곳(routes) / 284곳(routes+middleware+services)**
  + 옵셔널체이닝 `req.user?.role` 20곳. `req.user.restaurant_id` **93곳(21파일, routes+middleware+services 기준.
  리뷰의 22파일과 1 차이는 집계 스코프 차이 — 방향 동일)**. 프론트 `user.role` 판독 **68파일**(정확 일치).
  → 수백 곳 무수술이라는 초크포인트 투영 논거는 그대로 유효하다.
- 토큰 저장소는 `localStorage`(`utils/auth.ts:14-30`, 키 `auth_token`) = **브라우저의 모든 탭이 토큰 1개를 공유**한다.
  → v1 은 UX 제약(§10 Q1)으로만 다뤘으나, **v2 에서 운영 사고 벡터로 격상**(§4.7 크로스탭 동기 — 검증 F3).
- 운영 수요 실측: 복수 매장 접근 유저 **6명** (BG 4 / FG 1 / Owner 1), 복수 브랜드 소유 유저 2명, **이메일 중복
  계정 0쌍** — "여러 모자 쓴 한 사람"은 현재 전부 별도 계정(계정 단위 측정 불가 = 미확인, Irene 진술이 수요 근거).
- **🔴 v2 신규 실측 (설계를 바꾼 결정타 — 검증 F1, 운영 DB 로 재확인):** 수요자 6명 중 **BG user 6 과
  FG user 5·38 은 스칼라(brand_id/foodcourt_id) 전부 NULL + 소유행 0** — 접근이 순전히 `restaurant_managers`
  oversight 행으로만 성립한다. dev 에도 동일 케이스(user 148: brand_id NULL 인데 brands.owner_id 로 브랜드 33
  소유). → "스칼라를 컨텍스트 행으로 백필"하는 v1 규칙은 **이 기능의 핵심 대상자에게서 모자 0개**를 만든다.
  §3 을 "가상 기본 컨텍스트" 모델로 재설계했다.
- `middleware/brandScope.js` 실존, **라우트 12개 파일이 사용** — BG/FG 권한의 주류가 스칼라가 아니라
  `brands.owner_id`(= user.id 기반) 판정임을 보여주는 정식 미들웨어 (검증 F4 근거, v1 이 누락).

---

## 1. 요구사항

### 1.1 누가 (수요 실측)

| 대상 | dev | 운영 | 시나리오 |
|---|---|---|---|
| 복수 매장 접근 유저 (`restaurant_managers` n>1) | 7명 (demo 제외 5) | **6명** (BG 4 / FG 1 / Owner 1) | K-DINE Brand(user 11) → rid 10, 8 처럼 브랜드 총괄이 산하 매장 여러 개를 오간다 |
| 복수 브랜드 소유 (brands.owner_id n>1) | 2명 | 2명 | 한 BG 가 브랜드 2~3개 |
| **역할이 다른 두 모자** (예: BG 이면서 특정 매장 RA) | 측정 불가 (별도 계정으로 존재, 이메일 중복 0) | 측정 불가 | Irene 본인 사례 포함 — 지금은 계정을 2개 만들어 로그아웃/로그인으로 오간다 |

운영 총 유저 49명 중 최소 6명(12%)이 이미 멀티 컨텍스트 수요자이고, 브랜드 유료 확장(멀티지점)의
핵심 페르소나가 정확히 이 집단이다. **그리고 그 6명 중 3명이 스칼라 NULL 사용자다(§0)** — 설계는 이
사람들에게서 제일 먼저 성립해야 한다.

### 1.2 무엇을
1. **로그인 1회** → 내 컨텍스트(모자) 목록이 나오고 → 골라서 해당 관리페이지로 진입.
2. 로그인 상태에서 **재로그인 없이 상시 전환** (본래 정체로의 복귀 포함 — 항상 가능해야 한다).
3. 컨텍스트가 **1개뿐인 사용자는 선택 화면을 건너뛴다** — 현행 UX 무회귀 (운영 49명 중 43명이 여기 해당).
4. 전환 즉시 권한·데이터·실시간(소켓)이 새 컨텍스트로 정합하고, **같은 브라우저의 다른 탭도 함께 따라온다**
   (v2 — 탭이 어긋난 채 남아 결제·자동인쇄가 조용히 죽는 경로 차단, §4.7).

### 1.3 왜
- 계정 여러 개 = 비밀번호 여러 개, 로그아웃/로그인 왕복, 알림·설정 분산, 감사 추적 분열.
- 업계 표준(Google/Slack/Toast/Square)이 전부 "1 신원 = N 멤버십 + 활성 컨텍스트 선택" 모델.

### 1.4 비범위 (이 설계에서 제외 — §10 에서 기본값 확정)
- 접근판정 4중화 통합의 **완주** (103라우트·소켓 전환) — 확정 순서대로 별도 트랙 (§5).
- 두 컨텍스트 **동시** 열람(두 탭) — 도입하지 않음 (§10 Q1 확정: 전환식 + 전 탭 팔로우).
- 기존 별도 계정 2개의 **병합 기능** — 만들지 않음 (§10 Q2 확정: 모자 부여 + 구계정 비활성).
- **brand/foodcourt 모자의 "부여"** — v1 제외 (§5.2/§10 Q3, 검증 F4). 네이티브 브랜드/푸드코트 정체는
  기본 컨텍스트로 당연히 지원된다 — 제외되는 것은 "남에게 브랜드 총괄 모자를 씌우는" 부여뿐.
- 모바일 고객(Customer JWT) — 완전 별개 토큰 체계, 무접촉.

---

## 2. 현재 구조의 문제 정의 — 왜 선택 UI 를 그냥 못 얹는가

### 2.1 활성 컨텍스트가 "신원 컬럼" 이다
`req.user` 는 매 요청 `users` 행에서 재구성된다(`middleware/auth.js:25-42`). 즉 "지금 이 사람이 어느
매장에 있는가" = `users.restaurant_id` 컬럼 그 자체. 이 컬럼을 UPDATE 해서 전환하는 방식은 **불가**:
- **전 기기 동시 플립**: HTTP 판정이 DB 컬럼이므로, 매니저가 폰에서 매장 B 로 전환하는 순간 매장 A
  카운터 POS 에 꽂혀 있던 같은 계정 세션도 즉시 B 매장이 된다 → 결제·인쇄 중 매장이 바뀌는 사고.
- **신원 변조**: 컬럼은 "이 계정이 소속된 곳"이라는 신원 데이터인데 세션 상태로 오염된다. 감사 로그의
  주체 해석도 깨진다.
- 컨텍스트는 **세션(토큰) 속성**이어야 하고, 신원(DB 행)은 불변이어야 한다.
- **v2 주의**: 같은 부류의 사고가 "같은 브라우저의 탭 단위"로도 존재한다(토큰이 탭 간 공유되므로).
  §4.7 크로스탭 동기가 이 잔여 사고면을 닫는다 (검증 F3).

### 2.2 역할이 단일 ENUM 이고, BG/FG 정체는 스칼라조차 아니다
`users.role` = ENUM 1값(`models/User.js:29-38`). "BG 이면서 매장 X 의 RA" 를 한 계정으로 표현할 자리가
없다 → 현재는 계정 2개. 게다가 **BG/FG 의 실제 정체는 `brand_id` 스칼라가 아니라 소유행/oversight 행에
있다**(운영 BG user 6 = 스칼라 전부 NULL 인데 정상 영업 중, §0) — 판정도 `brands.owner_id`/
`restaurant_managers` 기반이 주류(`middleware/brandScope.js` 12개 라우트 파일, `auth.js:426-434`).
따라서 "정체를 테이블 행으로 복사"하는 접근은 애초에 성립하지 않고, **정체는 파생으로, 부여된 모자만
행으로** 다뤄야 한다(§3).

### 2.3 접근판정 4중화 — 판정처마다 규칙이 다르다
[[reference_restaurant_access_four_gates]] 재인용 (전부 현행 코드에서 재확인):

| 판정처 | 사용처 | 규칙 차이 (실측) |
|---|---|---|
| `checkRestaurantAccess` (`auth.js:148`) | 라우트 103개 | BG-owns-brand / FG-owns-foodcourt 폴백 없음 |
| `userCanAccessRestaurant` (`auth.js:395`) | 11파일 (**소켓 room·emit 포함**) | Manager 감독 스코프 없음, BG/FG 폴백은 있음 |
| 목록 인라인 WHERE (`restaurants-crud.js`) | 목록 | 또 다른 기준 |
| `requireRestaurantScope` (`auth.js:449`) | 매장 라우트 6곳 | 목록 규칙을 수동 미러링 |

Owner/General/Manager 경로에서 4곳이 서로 다르므로, "고를 수 있는 목록"을 이 중 아무 한 곳 기준으로
만들면 다른 판정처에서 403(축소) 또는 통과(확대)가 난다. **단, RA/Staff 경로만은 4곳 전부 동일한 스칼라
비교**(`req.user.restaurant_id === target`, `auth.js:195-206`·`:400-402`)다 — §4·§5 는 이 유일한 일치 경로
**위로만** 부여 모자를 태우는 설계다 (v2: 이 등가성이 restaurant 모자에 한정된 참임을 명시 — §5.2).

### 2.4 낡는 곳은 프론트 캐시와 소켓, HTTP 가 아니다
- HTTP: 매 요청 DB 재구성이라 stale 없음 (§0 사실 3 확정).
- 프론트: 로그인 응답의 user 를 AuthContext 가 메모리 보관(`AuthContext.tsx:469`), 갱신은 `refreshUser()`
  → `/api/auth/me` (`:829`). **탭 간 동기는 없다**(storage 이벤트 미청취 — v2 실측).
- 소켓: **claim 기반 + 소켓 수명 캐시** (§0 사실 3'). 전환 시 소켓을 끊고 새 토큰으로 다시 붙이는 것이
  유일한 정합 수단이며, 소켓 생성 effect 가 `restaurantId` 종속이라(`OrdersRealtimeContext.tsx:177-226`)
  전환 → 자동 teardown/재연결이 구조적으로 성립한다. **단 "회수" 반영은 소켓엔 자동이 아니다** —
  §4.4 에서 ctx 토큰 한정 재검증을 추가한다 (v2, 검증 F6).

---

## 3. 데이터 모델 (v2 재설계 — 검증 F1·F2 반영)

### 3.1 핵심 원칙: **정체는 파생, 모자만 행**

| 개념 | 표현 | 왜 |
|---|---|---|
| **네이티브 정체(기본 컨텍스트)** | **행 없음 — `users.role`+스칼라+소유행에서 파생되는 "항상 존재하는 가상 컨텍스트"**. 이 정체로의 전환 = **ctx claim 없는 일반 토큰 재발급**(로그인 토큰과 동일 shape) = 기존 경로 그대로 | 운영 BG/FG 3명이 스칼라 NULL(§0) — 정체를 행으로 복사하면 이들에게서 모자 0개(검증 F1). 파생이면 ①백필 자체가 불필요 ②`users.role` 변경(강등·승격, `routes/users.js:769` nextRole 경로 실존)이 **즉시·구조적으로** 반영돼 유령 모자가 생길 수 없다(검증 F2 의 절반이 구조로 소멸) ③본래 정체 복귀가 **항상** 가능 |
| **부여된 모자** | `user_contexts` 행 (`granted_by` NOT NULL 필수) | SA 가 명시적으로 부여한 추가 자격만 데이터로 존재 — 출처·감사가 명확 |

### 3.2 신규 테이블 `user_contexts` — 부여된 모자 전용

```
user_contexts
├── id             INT PK auto
├── user_id        INT NOT NULL           (FK users.id)
├── entity_type    ENUM('restaurant','brand','foodcourt','supplier') NOT NULL
│                   ⚠ v1 은 'restaurant' 만 부여 허용 (앱 레벨 정합 검사 — §5.2/F4. ENUM 은 미래 대비)
├── entity_id      INT NOT NULL
├── role           ENUM(= users.role 과 동일 11값) NOT NULL
│                   ⚠ v1 은 'Restaurant Admin' 만 부여 허용 (Staff 모자는 permissions 모델 미비로 제외 — §4.3)
├── granted_by     INT NOT NULL           (FK users.id — 부여자. v1 은 System Admin)
├── last_used_at   DATETIME NULL          (픽커 정렬용)
├── created_at / updated_at
└── UNIQUE (user_id, entity_type, entity_id, role)
```

- v1 유효 조합은 **(restaurant, 매장id, 'Restaurant Admin')** 뿐. 부여·전환·매요청 재검증 3곳 모두
  `entity_type↔role` 정합 검사(위반 400/403) + 인스펙션 하니스([[reference_inspection_harness]])에
  "v1 비허용 조합 행 0" 불변식 등록.
- ~~is_default~~ 삭제 (v1) — 기본 정체는 파생이라 열이 필요 없다.

**의미 경계 — 절대 오해 금지:** `user_contexts` 는 "**부여받은 모자가 있는가**"에만 답한다. "그 모자로
어느 매장·자원까지"는 지금처럼 기존 4개 판정처가 계속 답한다. **5번째 접근판정처가 아니다**(⛔ §8-4).
단, **role 에 대해서는 투영이 사실상의 원천이므로**(검증 F2 지적) 위 정합 검사+생애주기(§3.5)가 보안
요건이다.

### 3.3 `restaurant_managers` 재사용을 기각하는 이유 (v1 과 동일)
1. **매장 전용** — 다른 엔티티 타입을 담을 수 없다(ENUM 은 미래 확장 대비지만 현 테이블은 구조 자체가 매장 고정).
2. **역할 개념이 없다** — relationship_type ENUM('oversight','ownership') 뿐.
3. **UNIQUE(restaurant_id, manager_id) 함정 실증** — Owner claim 승격 패치 전례([[reference_owner_restaurant_claim]]).
4. **기존 의미 보존** — Owner 목록/oversight 판정의 데이터 소스. 무접촉이 정석.

### 3.4 마이그레이션 — **CREATE TABLE 만, 백필 0행** (v2 — v1 백필 규칙 폐기)
`scripts/migrate-user-contexts.js` = 테이블 생성만(멱등), `scripts/migrations.registry.json` `deploy` 등록,
끝에 `process.exit`([[reference_deploy_migration_must_exit]]). **v1 의 "전 유저 역할 1:1 백필"은 폐기한다**
— 운영 실측(§0)이 반증했고(스칼라 NULL 3명 스킵 → 핵심 대상자 고장), 파생 모델에서는 백필할 것 자체가
없다. 배포 시점에 모든 유저의 픽커 = [파생 기본 컨텍스트] 하나 → 전원이 자동으로 "컨텍스트 1개 = 픽커
스킵" = **완전 무회귀**.

### 3.5 생애주기 규칙 (v2 신설 — 검증 F2)

| 사건 | user_contexts 처리 | 근거·효과 |
|---|---|---|
| `users.role` 변경 (강등/승격, `routes/users.js:769`) | **아무것도 안 함** — 기본 정체는 파생이라 즉시 반영. 부여 모자는 별개 자격이라 자동 소멸시키지 않음(부여·회수는 SA 의 명시 행위) | 유령 기본 모자 구조적 불가. "강등 후 옛 역할로 전환" 시도는 파생 목록에 그 역할이 없으므로 400/403 (§9 영구 케이스) |
| SA 모자 회수 (P4) | 행 DELETE | 다음 요청부터 폴백(§4.3-F5) + 새 소켓 차단(§4.4) |
| 유저 비활성 (`is_active=false`) | 행 유지(로그인 자체가 차단 — `authService.js:86-91`) + **switch-context 도 is_active 검사 추가** | 기존 24h 토큰 잔존 성질은 불변(기존과 동일) |
| 매장 삭제/정지 | 전환 시점에 매장 실존+status 확인(없으면 403 + 픽커에 비활성 표시). 행은 SA 회수로 정리 — P4 화면이 대상 매장 소멸 행을 표시 | 폴리모픽 entity_id 라 FK CASCADE 불가 — 전환 시점 검증이 정석 |
| 멱등 마이그 재실행 | 영향 없음 (CREATE TABLE IF NOT EXISTS 만) | v1 의 "백필 재실행 → default 행 중복" 문제 자체가 소멸 |

### 3.6 `users.restaurant_id`/`brand_id`/`foodcourt_id`/`role` 의 운명 — **유지 (호환 필수)**
- 파생 기본 정체의 원천으로 그대로 쓴다. `req.user.role` 판독 259+곳·`restaurant_id` 93곳(§0 정정치)이
  전부 이 값(또는 §4 투영)에서 나오므로 드롭·개명 절대 금지.
- **전환 시 이 컬럼들을 절대 쓰지(UPDATE) 않는다** (§2.1). 새 모자 부여 시에도 불변 — user_contexts 행만 추가.
- 장기(4중화 통합 완주 후) 재검토는 이 설계의 범위 밖.

---

## 4. 인증·토큰 전략

### 4.1 PIN 선례 분석 — 그대로는 못 쓰는 이유와 재사용 범위
PIN 캐셔 전환(`routes/staff.js:34-43`)은 **새 JWT 발급 + 프론트 `switchUser(token, user)`**
(`AuthContext.tsx:792`)로 무리로드 전환을 이미 증명했다. 재사용: 토큰 재발급 방식, switchUser 프론트 경로,
`auth-ready` 이벤트. **차이점**: PIN 은 **신원 교체**(userId 가 바뀜)라 `authenticateToken` 의 DB 재조회가
자동으로 일관된다. 컨텍스트 전환은 **신원 유지 + 모자 교체**인데 users 행은 모자를 모른다 → 토큰에
컨텍스트 claim 이 필요하다.

### 4.2 결정 — 컨텍스트는 토큰 claim, 판정은 매 요청 서버 재검증 (둘 다)
**토큰 = 어느 컨텍스트인지(세션 상태), 서버 = 그 컨텍스트를 지금도 가졌는지(권한) — 역할을 나눈다.**

`GET /api/auth/contexts`: **[파생 기본 컨텍스트 1개] + user_contexts 부여 행들** (+ 엔티티 표시명 join).
기본 컨텍스트는 목록에 항상 존재하고 "기본" 배지로 표시된다 — **본래 정체 복귀가 항상 가능**(검증 F1 해소).
목록 계산과 전환 검증이 같은 서비스(`services/userContexts.js`) 함수를 쓴다.

`POST /api/auth/switch-context` `{ target: 'default' }` 또는 `{ entity_type, entity_id, role }`:
1. `'default'` → **ctx claim 없는 일반 토큰 재발급** (로그인 토큰과 동일 shape — 기존 경로 그대로).
2. 부여 모자 → ①`^\d+$` 정규화(§4.6) ②entity_type↔role v1 정합(restaurant×RA만) ③행 실존
   ④매장 실존+status ⑤유저 is_active — 통과 시 **새 JWT**: 표준 claim(`role`,`restaurant_id`,
   `brand_id`,`foodcourt_id`)에 **투영값**(role='Restaurant Admin', restaurant_id=X, 나머지 null) +
   마커 `ctx: {v:1, t, id, r}`. 만료는 기존과 동일 24h.
3. 응답 shape 은 PIN 전환과 동일(`token` + `user`) → 프론트 `switchUser` 재사용.

### 4.3 서버 투영 — `authenticateToken` 한 곳(초크포인트)만 수정 + **회수 시 기본 정체 폴백** (v2, 검증 F5)
`middleware/auth.js` `authenticateToken`/`optionalAuthenticateToken` + `routes/auth.js` `/me` — 공유 헬퍼
`projectContext(user, decoded.ctx)` 1개:

```
decoded.ctx 없음  → 기존 경로 바이트 동일 (무회귀)
decoded.ctx 있음 → user_contexts 실존 재검증 (UNIQUE 인덱스 1쿼리, 매 요청)
  ├─ 통과: req.user 투영 (아래 표 — 전 필드 명세)
  └─ 실패(모자 회수됨): 401 이 아니라 **네이티브 정체로 폴백**(ctx 무시 = DB 컬럼 그대로)
       + 응답 헤더 `X-Context-Fallback: revoked` 부착
```

**왜 401 이 아닌가 (v1 정정):** 프론트 `utils/httpClient.ts:80-87,104` 가 **모든 401 을 전역 자동
로그아웃**으로 처리한다(실측) — 401 을 쓰면 "픽커로 복귀"가 아니라 강제 로그아웃이 되고, 회수된 토큰으로는
`/contexts` 호출조차 불가능해 v1 문서의 UX 와 메커니즘이 모순이었다(검증 F5). 폴백은 **그 사람의 진짜
정체**로 내려가는 것이라 권한 확대가 없고, "회수 = 그 모자만 소멸, 세션은 생존" 의미에 정확히 부합한다.
프론트는 전역 fetch 인터셉터(기존 httpClient 확장)에서 `X-Context-Fallback` 을 1회 감지 → 알림 배너 +
컨텍스트 재동기(§4.7 과 동일 팔로우 메커니즘) + 픽커 표시. **자동인쇄 폴러가 폴백 상태로 남아 엉뚱한
매장을 폴링하는 잔류가 없도록, 헤더 감지 즉시 탭 팔로우를 강제한다.**

**투영 필드 전체 명세 (v2 — 검증 F8 누락 보완):**

| req.user 필드 | ctx(restaurant×RA) 투영값 | 근거 |
|---|---|---|
| role | 'Restaurant Admin' | v1 부여 유일 role |
| restaurant_id | ctx.id | RA 스칼라 일치 경로 |
| brand_id / foodcourt_id | **null** | "한 번에 모자 하나" (§8-5) |
| branch_id / manager_id | **null** | FM 지점 스코프(getManagerScope, `auth.js:380-388`)·매니저 링크는 RA 모자와 무관 |
| permissions | **[]** | RA 는 permissions 미사용 — `POS_COUNTER_ROLES` 에 역할로 포함(`auth.js:84`). **Staff 모자를 v1 에서 제외하는 이유가 바로 이 필드**(매장별 액션권한 모델이 user_contexts 에 없음 — 필요 시 후속 설계) |
| id / email / full_name / is_demo | 원값 유지 | 신원 불변 |

### 4.4 소켓 — **v1 "서버 코드 변경 0" 철회** → ctx 토큰 한정 재검증 추가 (v2, 검증 F6)
v1 은 "표준 claim 에 투영값이 있으니 소켓 무변경"이라 했다. **HTTP 폴백/회수를 도입하면 이 주장은 회수
시나리오에서 깨진다**: 소켓 핸드셰이크는 claim 만 보므로(`socketService.js:65-69`) 회수된 모자의 ctx
토큰으로 **새 소켓 연결+join 이 토큰 만료(≤24h)까지 가능**하고, RA 스칼라 경로는 DB 를 안 봐서 회수가
반영될 지점이 없다 — 회수 후에도 그 매장 라이브 주문(테이블·품목·금액)을 계속 수신한다. v1 §4.4 의
"정당하게 가진 모자라 확대 아님" 서술은 **회수 후에는 정당성이 소멸**하므로 과소포장이었다(정정).

**결정 (선택지 3개 중):**
- ✅ **핸드셰이크+join 에서 ctx 토큰 한정 재검증** — `makeSocketAuth` 에서 `decoded.ctx` 가 있으면
  user_contexts 실존 1쿼리(async 미들웨어 — socket.io 표준 지원), 실패 시 연결 거부. `canJoinRestaurant`
  도 ctx 소켓이면 동일 재검증. **ctx 없는 토큰(전 매장 함대)은 기존 경로 바이트 동일 = 무영향.**
  `SOCKET_AUTH_ENFORCE` 체계·`/notifications` 패턴과 정합.
- ❌ 전환 시 서버측 강제 소켓 킬 — 세션-소켓 매핑 인프라 신설 필요(과설계), 그리고 "회수" 주체는
  SA 라 전환 이벤트와 무관하게 필요.
- ❌ 토큰 수명 단축 — 전 함대의 재로그인 주기를 바꾸는 운영 비용이 이 좁은 창의 이득을 초과.
  기존 역할 강등에도 같은 24h 창이 있다(이 기능이 만든 창이 아님).

**잔존 한계(정직하게, §8 에도 명시):** 이미 연결돼 있는 소켓은 재검증 없이 **소켓 수명까지** 산다
(`ridAuth` 캐시 포함, `socketService.js:129-132`). 이는 오늘의 역할 강등과 동일한 성질이고, 연결이
끊기는 순간(PWA refresh·sleep — 매장에서 잦음) 재수립이 차단된다. 소켓 미드스트림 회수까지 필요해지면
후속(백로그): 주기적 room 재검증.

### 4.5 프론트 상태 정합
- `switchUser` 재사용 + `auth-ready` 이벤트로 StoreContext 재로드(기존 PIN 경로와 동일).
- user 객체 필드는 기존 혼용 유지([[reference_user_object_snake_case]]) — 새 규약 금지(68파일 무접촉).
- `/api/auth/me` 가 ctx 투영+폴백을 반영하므로 `refreshUser()`/부팅 복원도 정합.
- `pos_device_restaurant`(기기-매장 고정, `AuthContext.tsx:619`)은 **로그인 시에만** 기록되는 현행 유지 —
  컨텍스트 전환이 기기 고정을 덮어쓰지 않는다(§6.3 가드의 기준값이 된다).

### 4.6 입력 정규화 (절대 규칙)
`switch-context`/부여 API 의 `entity_id` 는 `/^\d+$/` 만 허용 + 판정값으로 param 고정 — `parseInt` 단독
금지([[reference_id_normalization_bypass]]). health-check 에 지수표기 위조 케이스 영구 등록(§9).

### 4.7 크로스탭 동기 — 전환은 브라우저 단위, 전 탭이 따라온다 (v2 신설, 검증 F3 — 🔒 인쇄 안전 직결)

**문제 (실측):** 토큰은 localStorage 1키 = 전 탭 공유(`utils/auth.ts:14`)인데 AuthContext 는 `storage`
이벤트를 듣지 않는다 → 탭2 에서 매장 B 로 전환하면 **탭1(매장 A POS + MainLayout `_printPollFn` 자동인쇄
폴러)의 이후 모든 HTTP 가 B 토큰으로 나가 403** — 주방 자동인쇄가 **조용히 정지**한다(403 은 401 이
아니라 자동 로그아웃도 안 떠 무증상). 🔒 보호파일을 한 줄도 안 건드리고 인쇄를 멈추는 기능적 경로 —
인쇄 생명선 규칙의 정신상 이 동기 없이는 스위처를 출시할 수 없다. **따라서 크로스탭 동기는 P3b(헤더)가
아니라 스위처가 처음 생기는 P3a 의 필수 구성요소다.**

**설계 (Google 방식 — 모든 탭이 따라온다):**
1. **통지 채널 = `storage` 이벤트.** `setAuthToken` 의 localStorage 쓰기가 다른 탭들에 `storage` 이벤트를
   자동 발화한다(브라우저 표준) — BroadcastChannel 등 새 채널 도입 불필요(과설계). AuthContext 에
   리스너 1개: `auth_token` 키 변경 감지 → `/api/auth/me` 재조회 → 메모리 user 와 컨텍스트가 다르면
   **탭 팔로우**.
2. **탭 팔로우 동작**: 일반 페이지 = 새 컨텍스트 대시보드로 네비게이션. **POS/KDS/전체화면 라우트 =
   차단 오버레이**("이 브라우저가 다른 컨텍스트로 전환되었습니다") 표시 후 이동 — 어긋난 화면으로 조작을
   계속하는 것 자체를 차단. 폴링·소켓은 언마운트로 자연 정리.
3. **전환 전 확인 모달** (스위처 UI): "이 브라우저의 모든 탭이 함께 전환됩니다" 고지. **기기 고정
   (`pos_device_restaurant`) 매장과 다른 컨텍스트로 전환할 때는 강한 경고**(이 기기는 매장 A 의 POS 로
   지정되어 있음 — 진행 중 결제/인쇄 완료 후 전환하라) + 명시 확인. "진행 중 작업" 감지는 v1 범위에서
   이 고지+오버레이로 갈음한다(탭 간 작업상태 공유 인프라는 과설계 — 오버레이가 어긋난 후속 조작을 막고,
   이미 서버에 접수된 주문·인쇄 claim 은 서버측 폴러/재시도 체계가 완결한다).
4. **FI 검증**: 탭2 전환 → 탭1 이 403 루프 없이 팔로우하는지 + 자동인쇄 폴러가 어긋난 매장으로 폴링을
   계속하지 않는지 (§9 FI-7).

---

## 5. 선행 구조화(접근판정 통합)와의 관계

### 5.1 확정 순서는 그대로 존중한다 (뒤집기 금지)
[[reference_restaurant_access_four_gates]] 확정 순서: ①불변식 health-check 유지(완료) → ②resolver
(`services/restaurantScope.js` — 미존재, 실측) shadow 1주 → ③목록+requireRestaurantScope →
④`userCanAccessRestaurant` 11파일(소켓 최후) → ⑤`checkRestaurantAccess` 103라우트 최후. 무변경.

### 5.2 이 기능이 얹히는 지점 — "일치 경로 위 투영"은 **restaurant 모자 한정** (v2 정정, 검증 F4)
- v1 문서는 "brand/foodcourt 컨텍스트 전환도 네이티브 BG/FG 와 동일한 스칼라를 만들 뿐"이라 썼다 —
  **틀렸다(철회).** BG/FG 권한은 스칼라가 아니라 **소유행(user.id 기반) 판정이 주류**다:
  `middleware/brandScope.js`(12개 라우트 파일 — `brands.owner_id === req.user.id`),
  `userCanAccessRestaurant` 의 BG/FG 폴백(`auth.js:426-434`), `owner_id: req.user.id` 인라인 다수.
  소유행 판정은 신원(user.id) 기반이라 **투영으로 흉내낼 수 없다**(신원은 불변이므로). 비소유자에게
  브랜드 모자를 부여하면 스칼라 라우트만 열리고 소유행 라우트는 403 — 스스로 금지한 "예측 불가 조합"
  (§8-5)이 된다.
- **따라서 v1 부여 가능 모자 = restaurant × 'Restaurant Admin' 만** — 4곳 판정이 유일하게 일치하는
  스칼라 경로 위에서만 부여한다. 네이티브 브랜드/푸드코트 정체는 **ctx 없는 기본 토큰 = 기존 경로
  그대로**라 아무 문제가 없다(부여가 아니라 파생이므로). 브랜드/푸드코트 모자 "부여"가 장차 필요해지면
  그것은 투영이 아니라 **소유행을 실제로 만들어 주는 데이터 부여** — 별도 설계 건.
- **이 기능이 새로 만드는 판정은 단 하나**: "부여 모자 실존"(user_contexts). 픽커 목록·전환 검증·매요청
  재검증·소켓 재검증이 **같은 서비스** `services/userContexts.js` 를 쓴다 — four-gates 정석("resolver 1 +
  투영, 불변식을 구조로")의 축소 적용이며 향후 `restaurantScope.js` 의 씨앗.
- ⛔ **금지**: user_contexts 를 매장 상세 접근판정(5번째)으로 쓰는 것, 기존 4곳 판정 규칙을 이번 절단면에서
  수정하는 것, `userCanAccessRestaurant` 를 느슨하게 만드는 것.

### 5.3 불변식 `list ⊆ detail` 유지
- 기존 매장 list⊆detail health-check 케이스는 무접촉 유지(판정처 미수정이므로 자동 보존).
- 신규 불변식: **"픽커에 보인 컨텍스트는 전환이 100% 성공한다"** — 목록과 검증이 같은 함수라 구조 보장
  (기본 컨텍스트 = 파생이므로 항상 전환 가능, 부여 모자 = 같은 행 조회) + health-check 실호출로 이중 증명.

---

## 6. UI/UX

### 6.1 로그인 후 선택 화면 (Context Picker)
- 로그인 응답(`authService.login`)에 `contexts: [파생 기본 + 부여 행]` 포함.
  - `contexts.length <= 1`(= 부여 모자 0개) → **현행 그대로** 역할별 대시보드 직행(`LoginPage.tsx:486`
    스위치를 유틸 `getDashboardPath(role, ids)` 로 추출해 재사용). 무회귀 — 배포 직후 전 유저가 여기 해당(§3.4).
  - `>= 2` → `/pos/select-context` 픽커. 카드 목록: 엔티티명, 역할 라벨, **기본 정체 카드는 "기본" 배지로
    항상 표시**, last_used_at 정렬. 카드 탭 → switch-context → 대시보드.
- 디자인: **RA 표준**([[reference_ra_design_standard]]) — 공용 `Button`/`PageComponents`, 장식 이모지 0
  (기하 글리프 `● ▦ ◐`), 로컬 styled 신규 금지(`check-design-guard.js`), primary `#635BFF`.
- **터치스크린 전제** — 터치 타깃 최소 44px([[feedback_touchscreen_no_keyboard]]).
- i18n: `auth` namespace 4언어(en→ko→zh→ms) 동시 추가, `npm run i18n:verify` 통과.

### 6.2 상시 전환 — 2단 진입점
- **1단(P3a, 보호파일 0접촉): 대시보드 퀵액션 "Switch Context"** — 기존 퀵액션 카드 패턴(RA 표준 기하
  글리프)에 카드 1개 추가 → `/pos/select-context` 재진입. 대시보드 파일들은 보호파일 8종에 미포함(실측:
  `check-print-guard.js` PROTECTED_FILES 전수 대조). **이것만으로 상시 전환이 완결**된다.
  ⚠ P3a 에는 §4.7 크로스탭 동기 + 전환 확인 모달이 **필수 포함**(스위처가 생기는 순간부터 필요).
- **2단(P3b, UX 완성): MainLayout 헤더 "현재 컨텍스트 ▾" 드롭다운** — 헤더 기존 자식(`InboxBell`/
  `LanguageSelector`, MainLayout.tsx:2504-2505) 옆에 별도 컴포넌트로 배치. 컨텍스트 1개면 렌더 생략.
- ⚠ **MainLayout.tsx = 🔒 인쇄 보호파일(shared 티어, `_printPollFn` 1177~1429줄)** — P3b 삽입(2505줄 부근,
  import 1줄+배치 1줄)은 인쇄 블록과 1,000줄 이상 거리. 절차는 소켓 하드닝 선례
  ([[project_socket_auth_hardening]] — 보호파일에 io() 줄만, 인쇄 키워드 0건 diff 증명 → bless) 그대로:
  `_printPollFn` 무접촉 diff + 인쇄 회귀(`health-check --category=print` + print-route-guard) +
  **⚠️ Irene 사인오프 후 `--bless`**. bless 전까지 1단으로 기능 완결 유지.
- 전환 직후: 확인 모달(§4.7-3) → `switchUser` → StoreContext 재로드 → `getDashboardPath` 네비게이션 →
  소켓 자연 재연결(§4.4) → 타 탭 팔로우(§4.7).

### 6.3 POS 현장(공용 단말)과의 관계 (v2 — 검증 F7 보강)
- POS 단말 화면(POSTerminal/KDS/FloorPlan)에 스위처 **비노출**(§10 Q4 확정). 현장의 "사람 바꾸기"는
  기존 PIN 캐셔 전환이 정답.
- **POS 진입 가드 (v2 신설, F7-2):** 비노출만으로는 부족하다 — B 매장 모자를 쓴 사용자가 A 매장 고정
  기기에서 **네비게이션으로 POS 에 진입할 수 있다**(B 매장의 정식 RA 이므로 권한상 정당). 이때 PIN 전환은
  기기 고정 매장(A) 기준으로 스탭을 찾아(`CashierPinModal.tsx:167-181`) 화면-기기-세션 3자가 어긋난다.
  → **POS/KDS/FloorPlan 진입 시 "세션 컨텍스트 매장 ≠ `pos_device_restaurant` 고정 매장"이면 경고 화면**
  (진입 차단 + "이 기기의 매장으로 전환" 버튼 = 기기 매장 컨텍스트/기본 정체로 switch). 기기 고정이 없는
  브라우저는 가드 미적용(기존 동작).
- **PIN 전환과의 마찰 문서화 (F7-1):** `switchUser` 는 토큰을 통째로 교체하고 원토큰을 보관하지 않는다
  (`AuthContext.tsx:792-811`) — 모자 쓴 상태에서 PIN 전환하면 ctx 세션은 소멸하고, 그 단말에서 원래
  모자로 돌아가려면 재로그인 후 픽커다. 보안 문제 아님(의도된 신원 교체) — 알려진 UX 사실로 §8 에 명시.

---

## 7. 단계별 실행 계획 (각 단계 독립 배포 가능)

| 단계 | 내용 | 산출물 | 검증 | 롤백 | 운영 마이그 |
|---|---|---|---|---|---|
| **P1** 데이터 기반 (2일) | `models/UserContext.js` + `migrate-user-contexts.js`(**CREATE TABLE 만 — 백필 0행**, §3.4) + registry 등록 + `services/userContexts.js`(목록=파생+부여 / 검증 단일소스) + 인스펙션 불변식(v1 비허용 조합 0) | 테이블+서비스. **동작 변경 0** | verify-all · health-check 전체 | 테이블 미사용 — 코드 롤백만으로 무해 | **포함** (CREATE TABLE — 멱등) |
| **P2** 백엔드 전환 (5일) | `GET /contexts` · `POST /switch-context`(default 포함) · `projectContext`(투영 표 §4.3 + **폴백+`X-Context-Fallback`**) · **소켓 ctx 한정 재검증**(§4.4) · login 응답 contexts | ctx 토큰 없으면 **바이트 동일** = 무회귀 | 계약+FI 테스트(§9) · health-check 신규 케이스 · 판독처 무접촉 diff | 라우트 제거+auth.js/socketService 원복 (잔존 ctx 토큰은 projectContext 부재 시 ctx 무시=기본 정체 동작이라 무해) | 없음 |
| **P3a** 프론트 픽커+퀵액션+**크로스탭** (5~6일) | `/pos/select-context` + 대시보드 퀵액션 + `getDashboardPath` 추출 + AuthContext `switchContext()`+storage 리스너+탭 팔로우/오버레이(§4.7) + 전환 확인 모달 + **POS 진입 가드(§6.3)** + `X-Context-Fallback` 인터셉트 + i18n 4언어 | 부여 0 유저는 화면 변화 0. **보호파일 0접촉으로 상시 전환 완결** | build:dev · mount sweep(8역할 크래시 0) · e2e(로그인→픽커→전환→대시보드 / 탭 팔로우) 3회 연속 | 프론트 롤백만 | 없음 |
| **P3b** 헤더 스위처 (2일) | 별도 컴포넌트 + 🔒MainLayout 최소 삽입(2줄) | UX 완성(상시 노출) | print-guard diff(`_printPollFn` 무접촉) · print 회귀 · **⚠️ Irene 사인오프 + bless** (§10 Q5) | MainLayout 원복 | 없음 |
| **P4** 모자 부여 (3일) | SA 관리화면 부여/회수 (**restaurant×RA 한정** — entity_type↔role 정합 서버 강제) + 소멸 매장 행 표시 | 실수요 6명에게 부여 가능 | IDOR/권한 케이스 · 부여→전환→회수→**폴백** 실호출 · 비허용 조합 400 | 라우트 제거 | 없음 |
| **P5** 운영 배포 (1주 — 관찰 포함) | `/배포` (Irene 지시 시에만) — **Fable 게이트 필수** (기준 ③운영 마이그 + ④신규 아키텍처 + ⑤보안 경계) | — | check-sensitive-diff · verify-all --full · 운영검증 | Backup + 멱등 재실행 안전 | P1 분 재실행(멱등) |

### 7.1 구현 규율 — "마음대로"가 구조적으로 불가능한 이유 (팀 규칙의 기계 강제 지점)

구현은 Opus(팀원) 세션이 하더라도, 아래 장치들이 **fail-closed(막히면 진행 불가)** 로 이탈을 차단한다.
약속이 아니라 기존 가드 인프라에 걸리는 구조다:

| 이탈 시나리오 | 막는 장치 (전부 기존 인프라) |
|---|---|
| 설계 절단면 밖 파일을 건드림 | 각 단계 착수 전 이 문서 §7 의 해당 단계 산출물 목록이 절단면 정의 — 완료 보고 시 `git diff` 를 목록과 대조(불일치 = 반려). `check-sensitive-diff.js` 가 보안경계·마이그 접촉을 기계 분류해 **Fable 게이트 대상** 판정 |
| 🔒 인쇄 보호파일 접촉 (P3b 외) | `check-print-guard.js` 지문 검사 — 배포 게이트 fail-closed. P3b 의 MainLayout 2줄도 **Irene bless 사인오프 없이는 배포 자체가 불가** |
| 마이그레이션 미등록·비멱등 | `check-migration-registry.js` fail-closed |
| 검증 생략하고 "완료" 보고 | 각 단계 검증란(§7 표)이 통과 조건 — verify-all·health-check 신규 케이스(§9.3)는 등록 후 영구 게이트가 되어 이후 회귀도 기계 검출 |
| 임의 운영 배포 | 운영 배포는 Irene `/배포` 명시 지시로만 — 배포 스크립트가 원격 SSH 명시 실행이라 "실수로 배포"가 물리적으로 없음 |
| 단계 건너뛰기 | P1→P2→P3a 는 산출물 의존(테이블 없으면 P2 컴파일 불가, API 없으면 P3a 동작 불가) — 순서가 코드 의존성으로 강제됨 |

**기계로 강제 못 하는 것 1개(정직):** "판단·설계 변경은 Fable 에게"라는 팀 규칙 자체는 사회적 규칙이라
훅이 위반을 검출할 수 없다. 이 문서가 그 대체물이다 — 구현 중 설계와 다른 판단이 필요해지는 순간
= 구현 중단 + Fable 재설계 요청이 규칙이며, 이 조항이 문서에 있으므로 위반은 "몰랐다"가 아니라
"어겼다"가 된다.

**일정: 실작업 ~17일 + 게이트·관찰 = 총 5주 (v2 정정 — v1 "4주" 표기는 과소).**
검증 리뷰 판정(+3~5일)을 수용: F3 크로스탭(+1.5일)·F5 폴백(+0.5일)·F4 소켓 재검증(+1일)·F7-2 가드(+0.5일)가
P2/P3a 에 순증. 반대로 F1 재설계는 백필 폐기로 P1 을 **1일 단축**시켰다. v1 의 "4~5주 상한" 안에는 들어가나
단독 표기는 5주가 정직하다. (4중화 통합 완주는 별도 트랙 — 이 일정에 불포함.)

---

## 8. 위험·절대금지·알려진 한계

1. **🔒 인쇄 보호파일 8개** — 파일 접촉은 P3b 의 MainLayout 1개뿐(2줄). 절차 §6.2. 나머지 7개 무접촉.
   **v2 추가 — 파일 무접촉이어도 인쇄를 멈출 수 있는 기능 경로(크로스탭 토큰 플립, 검증 F3)가 있다** →
   §4.7 동기 없이는 스위처(P3a 포함) 출시 금지. FI-7 로 증명.
2. **KDS 단계 로직 무접촉** — 이 기능은 KDS 파일을 열지 않는다.
3. **크로스테넌트 확대 금지** — 새 문은 switch-context/부여 API 뿐: 부여 행 실존 + `^\d+$` + entity_type↔role
   정합 + 매 요청 재검증 + **소켓 핸드셰이크 재검증(ctx 한정)**. `requireRole` 259+곳이 투영 role 을 읽으므로
   **부여 행 = 그 역할의 전체 권한** → 행 생성 경로를 P4 SA 전용으로 봉인(셀프 부여 없음).
4. **5번째 판정처 금지** — user_contexts 로 매장 상세 접근을 판정하지 않는다. 4중화 통합 순서 불변.
   단 **role 원천으로서의 정합은 보안 요건**(§3.5 생애주기 — 검증 F2).
5. **투영은 "모자 하나"** — 다른 스코프 스칼라 null(§4.3 표). 권한 합집합 금지. **알려진 예외(검증 F8):**
   `userCanAccessEntity`(`auth.js:505-524`, 인보이스·알림설정 등)는 brand/foodcourt 를 role 무시하고
   `owner_id` 로 판정 → RA 모자를 쓴 BG 가 **자기** 브랜드 인보이스·알림설정에는 여전히 접근된다.
   자기 소유 데이터라 보안 결함은 아니며(크로스테넌트 아님), "모자 하나" 격리의 문서화된 누수로 둔다
   (막으려면 owner_id 판정에 ctx 인지 추가 = 판정처 수정 — 이번 절단면 밖).
6. **POS 현장 보호** — 스위처 비노출 + **POS 진입 가드(§6.3, 세션≠기기 매장이면 차단)** + 기기 고정
   무변경 + PIN 경로 무변경 + 전환 확인 모달(기기 고정 브라우저 강한 경고).
7. **알려진 한계 — 소켓 회수 창(검증 F6):** 이미 연결된 소켓은 모자 회수 후에도 **소켓 수명까지** 유지
   (재검증은 신규 연결/join 에만). 기존 역할 강등과 동일 성질. 미드스트림 재검증은 백로그(§4.4).
8. **알려진 한계 — PIN 전환 시 모자 세션 소멸(검증 F7-1):** §6.3. 재로그인+픽커로 복귀.
9. **구독·청구 경계** — `checkSubscriptionStatus` 는 투영 role 로 분기(컨텍스트별 청구 상태 각자 적용)하나
   **현재 미마운트**(session-state 실측) — 마운트 결정 시 컨텍스트 상호작용 재검토.
10. **데모 리셋** — 부여 행 없는 demo 계정은 영향 0. `demoProtection` 은 user 행 기준 무접촉.

### 8.1 구독·청구·프로필 모델과의 관계 (2026-08-20 보강 — Irene 질문 반영)

> 정직한 기록: v2 까지 이 문서는 §8-9 에서 "정지(suspension) 게이트 경계"만 다뤘고, **"모자가 여러 개면
> 청구서도 여러 개가 되는가"라는 질문 자체는 명시하지 않았다.** 아래는 그 질문에 대한 실측 답이다.

**결론: 모자는 청구서를 만들지 않는다 — 청구서 수는 이 기능 전후로 불변이다.**

1. **청구 주체는 사람이 아니라 사업체다 (실측 `middleware/auth.js:394-409`):**

| 역할 | 청구가 붙는 곳 |
|---|---|
| RA/Staff | `restaurants.status` — **매장 단위** |
| BG/BM | `brands.subscription_status` — **브랜드 단위** |
| FG/FM | `foodcourts.subscription_status` — **푸드코트 단위** |
| Restaurant Owner | `users.subscription_status` — 유저 단위 (**유일한 예외**) |

2. **모자 부여 = 이미 존재하는(= 이미 자기 청구를 내는) 사업체에 접근권을 주는 것**이지, 사업체나
   구독을 만드는 것이 아니다. BG 가 매장 X 의 RA 모자를 받아도 매장 X 의 구독은 매장 X 가 원래 내던
   그대로이고, BG 의 브랜드 구독도 그대로다. 한 매장에 관리자가 몇 명이든 청구는 1장 — 이건 이 기능
   이전부터의 모델이며(예: Owner 다매장), 업계 표준(Toast/Square 도 지점 단위 과금)과 같다.
3. **유일한 유저 단위 청구(Owner)와의 상호작용 = 0** — v1 부여 가능 모자는 restaurant×RA 뿐이라
   Owner 역할을 만들지도 건드리지도 않는다.
4. **정지된 사업체의 모자**: 전환은 허용하되 응답에 `restaurantStatus` 를 실어 프론트가 네이티브 RA 와
   동일하게 인보이스 pin 으로 처리한다(§4.2, P2 구현). `checkSubscriptionStatus` 미마운트 사실(§8-9)은 불변.
5. **"한 사람이 여러 사업체의 청구를 한 화면에서 통합 관리/결제"(유저 단위 통합 청구서)는 현 솔루션에
   없는 개념이고 이 기능도 도입하지 않았다.** 필요해지면 별도 기능 설계 대상(백로그) — 모자 체계 위에
   자연스럽게 얹을 수 있다(내 모자 목록 = 내가 관여한 사업체 목록이므로).

**프로필: 사람 단위 1벌 — 모자와 무관하다.**
- 이름·이메일·전화·언어 등 프로필은 `users` 행 1개가 단일 소스다. 투영(`projectContext`)은
  `role`/스코프 스칼라/`permissions` 만 덮고 **신원·프로필 필드는 원값 유지**(§4.3 표, 구현 일치 실측).
  어떤 모자로 있든 같은 프로필이 보이고, 수정도 한 곳(본인 계정 수정 경로, `req.user.id` 기준 —
  투영이 id 를 바꾸지 않으므로 모자 상태에서도 항상 본인 행에 저장된다).
- 매장 연락처·브랜드 회사정보 같은 "사업체 프로필"은 유저가 아니라 **그 사업체의 데이터**라, 그 사업체에
  접근하는 모든 관리자가 공유한다 — 모자를 써도 같은 것을 보는 게 정답이다.

---

## 9. 테스트 시나리오

### 9.1 역할별 실호출 (P2~P4 각 단계)
1. 부여 0 유저(전 역할) 로그인 → contexts 1(기본) → 픽커 스킵 → 기존 흐름 바이트 동일 (무회귀 증명).
2. **스칼라 NULL BG(운영 user 6 동형 데이터를 dev 에 재현)** 로그인 → 기본 컨텍스트로 정상 진입 →
   RA 모자 부여 → 픽커 2개 → RA 전환 → 매장 실호출 200 + 타 매장 403 → **기본(브랜드 정체)으로 복귀
   전환 → 브랜드 페이지 200** (F1 회귀 박제).
3. 전환 상태에서 `/api/auth/me` 투영값 반환 → 새로고침(부팅 복원) 후 컨텍스트 유지.
4. SA 회수 → 다음 요청 **기본 정체 폴백 + `X-Context-Fallback` 헤더** → 프론트 배너+픽커 복귀
   (강제 로그아웃 아님 — F5 회귀 박제).
5. PIN 캐셔 전환 회귀 + POS 진입 가드(세션≠기기 매장 → 차단 화면, 일치 → 통과).

### 9.2 고장주입 ([[feedback_fault_injection_is_mandatory]] — 주입엔 반드시 assert)
- **FI-1 위조 컨텍스트**: 부여 없는 (t,id,r) switch → 403. 서명 유효+행 없음 ctx 토큰 → **폴백+헤더**(401 아님).
- **FI-2 id 정규화 우회**: `entity_id:"1.16e2"`·전각·`%00`·배열 → 400. 타 매장 전환 불성립 assert.
- **FI-3 전환 중 소켓 잔류**: A 소켓 연결 → B 전환 → A 주문 생성 → 미수신 assert (+B 는 수신).
- **FI-4 투영 제거 주입**: projectContext 무력화 시 시나리오 9.1-2 실패 확인(헛테스트 방지) 후 복원.
- **FI-5 목록-전환 불일치**: GET /contexts 전 항목 switch 전수 성공(불변식 §5.3).
- **FI-6 강등 후 옛 모자 (v2, F2)**: RA→Staff 강등(users.role UPDATE) → ①픽커에 RA 기본 컨텍스트 부재
  ②강등 전 발급된 기본 토큰은 다음 요청부터 Staff 로 재구성(기존 성질) ③'restaurant×RA' **부여** 행이
  있는 별개 유저는 강등과 무관하게 부여 회수 전까지 유효 — 각각 assert.
- **FI-7 크로스탭 (v2, F3)**: 탭1 = 매장 A POS(모의 폴러) + 탭2 전환 → 탭1 이 storage 이벤트로 팔로우
  (오버레이 표시·네비게이션)하고 **A 매장으로의 403 폴링 루프가 지속되지 않음** assert.
- **FI-8 소켓 회수 (v2, F6)**: 모자 회수 후 그 ctx 토큰으로 **새 소켓 핸드셰이크 → 거부** assert
  (ctx 없는 토큰 핸드셰이크는 기존과 동일 통과 = 무회귀 대조군).
- **FI-9 비허용 조합 (v2, F4)**: 부여 API 에 ('brand', B, 'Brand General') → 400. user_contexts 직접
  INSERT 주입 후 전환 → 403(서버 정합 검사) + 인스펙션 하니스 검출 assert.

### 9.3 영구 안전망 (health-check / verify-all 등록)
- health-check `auth`: 픽커↔전환 전수 일치 / 위조 ctx 폴백+헤더 / 지수표기 400 / 회수 후 폴백 /
  강등 후 옛 기본 모자 부재 / 비허용 조합 400 / 부여 0 유저 응답 필드 무회귀.
- verify-all `contract-tests`: switch-context 계약 + 소켓 ctx 재검증(FI-8). FI-3·7 은 e2e spec.
- e2e(`--e2e` 대상): 로그인→픽커→전환→대시보드 + 탭 팔로우, 3회 연속 100%.
- 기존 print-route-guard 7/7 · print-guard 8/8 · design-guard · mount sweep 전 단계 통과 의무.
- 인스펙션 하니스: user_contexts 불변식(granted_by NOT NULL, v1 조합 한정, 고아 entity_id 경고).

---

## 10. 결정 사항 — Fable 권고 (기본값 확정, v2 갱신 — 독립 검증 Q1~Q5 전부 동의 판정)

> 원칙(CLAUDE.md §역할 분담): 판단·제안은 Fable, Irene 은 승인/반려만. **Q1~Q4 는 기술 결정이라
> 아래 권고를 기본값으로 확정하고 진행한다**(반려 시에만 변경). 사람 사인오프가 규칙상 필수인 것은
> **Q5 하나**뿐이다. 독립 검증도 5건 전부 권고 방향에 동의했다(리뷰 §Q1~Q5 판정 — 단서 조항은 v2 에 반영).

### Q1. 두 컨텍스트 동시 열람 (두 탭에 두 매장)
- **권고: 도입하지 않는다 — v1 은 전환식(한 브라우저 = 한 컨텍스트) + 전 탭 팔로우(Google 방식).**
- 근거: 토큰 localStorage 단일 키(`utils/auth.ts:14`) — 탭별 분리는 저장 체계 전면 재설계(+2주 이상),
  수요 실측(운영 6명) 대비 과설계. 급하면 브라우저 프로필/시크릿 창으로 지금도 가능.
  **v2 추가(검증 F3 승격 수용):** 전환식은 크로스탭 동기(§4.7)가 **전제조건** — 동기 없는 전환식은
  다른 탭의 POS·자동인쇄를 조용히 죽인다. P3a 필수 구성요소로 편입 완료.
- 반대편을 택하면: 저장 체계 별건 선행으로 전체 일정 6주+ , 기기-매장 고정·자동인쇄 폴러 전제가 흔들림.
- 되돌리기: **쉬움** — 전환식 위에 나중에 얹는 순수 확장.
- 승인: 불요 (기술 결정, 확정).

### Q2. 기존 별도 계정 2개(같은 사람)의 병합
- **권고: 병합 기능을 만들지 않는다. 주 사용 계정에 모자 부여(P4), 구계정은 본인 요청 시
  기존 비활성 체계(`is_active=false`, [[reference_user_deactivation]])로 잠근다.**
- 근거: 운영 이메일 중복 **0쌍** 실측 = 자동 병합의 매칭 근거 부재(오매칭 위험). 병합은 주문·감사·소유권
  FK 전체 이관 대공사인데 모자 부여만으로 목적(로그인 1회) 100% 달성.
- 반대편: 계정연결 셀프서비스 2~3주 + 계정 탈취 벡터 신설.
- 되돌리기: **쉬움**. 승인: 불요 (확정).

### Q3. 모자 부여 권한 주체·범위
- **권고: v1 = System Admin 전용, 부여 가능 모자 = 매장(restaurant) × Restaurant Admin 만.**
  (v2 — 검증 F4 수용으로 타입 한정 추가. Staff 모자는 매장별 액션권한(permissions) 모델 미비로 제외 §4.3.)
- 근거: 부여 행 = 그 역할 전체 권한(`req.user.role` 판독 259+곳). BG 셀프 부여는 `checkRestaurantAccess`
  103라우트 RA 경로를 여는 실질 권한 확대(§8-3). 브랜드/푸드코트 모자는 소유행(user.id) 기반이라 투영
  불가(브랜드 권한의 정식 미들웨어 `brandScope.js` 12파일 실측 — §5.2). 수요 전수(운영 6명)는 SA 수동으로 충분.
- 반대편: 초대·승인 흐름 +1주 + Fable 게이트 ⑤ 재통과 / 브랜드 모자 부여는 반쪽 권한(스칼라 라우트만
  열리고 소유행 라우트 403)이라는 예측 불가 상태.
- 되돌리기: **쉬움** — BG 위임·브랜드 소유행 부여는 후속 별건으로 순수 추가.
- 승인: 불요 (기술 결정, 확정).

### Q4. POS 공용 단말에서 스위처 숨김
- **권고: 숨김 확정 + POS 진입 가드 추가(v2).** 현장의 "사람 바꾸기"는 기존 PIN 전환만.
- 근거: POS 화면은 별도 레이아웃(`PosLayout.tsx`)이라 비노출 = 코드 0. **v2(검증 F7-2 수용):** 비노출만으론
  네비게이션 직접 진입(B 매장 모자로 A 고정 기기의 POS)이 남으므로, "세션 매장 ≠ 기기 고정 매장 → 진입
  차단+안내" 가드를 §6.3 에 신설. 기기-매장 고정(`pos_device_restaurant`)·자동인쇄·PIN 매장 해석
  (`CashierPinModal.tsx:167-181`)의 3자 정합 보호.
- 반대편: 결제·주방 인쇄가 순간적으로 딴 매장으로 가는 현장 사고 경로. 이득 없음.
- 되돌리기: **쉬움**. 승인: 불요 (확정).

### Q5. 헤더 상시 스위처 — 🔒 MainLayout 접촉 ⚠️ **Irene 승인 필요 (유일)**
- **권고: 2단으로 간다. ①P3a 에 대시보드 퀵액션 진입점(보호파일 0접촉) + 크로스탭 동기를 포함해 상시
  전환을 먼저 완결하고, ②P3b 헤더 스위처는 MainLayout 2줄 최소 삽입으로 진행하되 착수 시점에 Irene
  사인오프 1회를 받는다.**
- 근거(대안 실측 후 기각): ①헤더 기존 자식(`LanguageSelector`/`InboxBell`/`PlanBadge`/`WorkstationChip`,
  MainLayout.tsx:12-15)에 얹기 = 의미 오염(임시조치 금지, [[feedback_canonical_discipline]])
  ②App.tsx 포털 = 레이아웃 위치 결합 hack ③전용 유저 메뉴 컴포넌트 = **부재**(로그아웃도 인라인,
  :1485-1487 실측). → 정석은 최소 삽입: 삽입 지점(2505줄 부근)은 인쇄 블록(1177~1429줄)과 1,000줄+
  거리, 소켓 하드닝이 같은 절차(키워드 0건 diff + bless)로 통과한 선례 존재.
- 왜 이것만 사람 승인인가: 비즈니스 판단이 아니라 **인쇄 보호 절대규칙의 절차** — 보호파일 지문 갱신
  (`--bless`)은 Irene 승인 없이 하지 않는다. 남은 것은 "라이프라인 파일 2줄"에 대한 소유자 사인오프 1회.
- 반대편(끝까지 무접촉): 기능 손실 없음(퀵액션으로 완결). 잃는 것은 헤더 상시 노출 UX 마감뿐.
- 되돌리기: **쉬움** — 2줄 원복 + re-bless.

---

## 부록 A. 실측 근거 색인

| 사실 | 근거 |
|---|---|
| 매 요청 DB 재조회 + req.user 재구성 | `dev-backend/middleware/auth.js:25, 30-42` |
| RA/Staff 스칼라 비교 (두 판정처 동일) | `middleware/auth.js:195-206`, `:400-402` |
| Owner ownership 조회 (매 요청 DB) | `middleware/auth.js:209-216`, `:404-408` |
| checkRestaurantAccess / userCanAccessRestaurant / requireRestaurantScope 정의 | `middleware/auth.js:148, 395, 449` |
| BG/FG 소유행 판정 (F4) | `middleware/brandScope.js`(12개 라우트 파일 사용), `auth.js:426-434`, `auth.js:505-524`(userCanAccessEntity) |
| 토큰 발급 4지점 (24h) | `services/authService.js:108, 527, 845` · `routes/staff.js:34` |
| PIN 전환 = 새 JWT + switchUser | `routes/staff.js:10-88` · `dev-frontend/src/contexts/AuthContext.tsx:792-811` |
| 소켓 = claim 기반 + ridAuth 캐시 | `services/socketService.js:65-69, 129-132` |
| 소켓 effect restaurantId 종속 = 자연 재연결 | `dev-frontend/src/contexts/OrdersRealtimeContext.tsx:177-226` |
| 401 전역 자동 로그아웃 (F5 근거) | `dev-frontend/src/utils/httpClient.ts:80-87, 104` |
| 역할 변경 경로 실존 (F2 근거) | `dev-backend/routes/users.js:769` (nextRole) |
| 역할별 대시보드 경로 맵 | `dev-frontend/src/pages/Login/LoginPage.tsx:486-527` |
| 토큰 = localStorage 단일 키 (탭 공유) | `dev-frontend/src/utils/auth.ts:14-30` |
| users.role ENUM 11값 | `dev-backend/models/User.js:29-38` |
| restaurant_managers 스키마 (UNIQUE, relationship_type) | dev DB SHOW COLUMNS 실측 · [[reference_owner_restaurant_claim]] |
| 판독처 규모 (v2 정정치: role 259/284곳+옵셔널 20, restaurant_id 93곳/21파일, 프론트 68파일) | grep 재실측 2026-08-20 (스코프 명시 §0) |
| 수요 실측 (dev 7명 / 운영 6명 / 이메일 중복 0쌍) | dev·운영 DB 읽기 전용 쿼리 2026-08-20 |
| **스칼라 NULL 핵심 대상자 (F1)** | 운영 users 5·6·38 (스칼라 전 NULL + 소유행 0) · dev user 148 (NULL + brands.owner_id 소유) — 운영 DB 재실측 2026-08-20 |
| restaurantScope.js 미존재 | `ls dev-backend/services` 실측 |
| MainLayout = 🔒 shared 티어 (`_printPollFn`) | `dev-backend/scripts/check-print-guard.js:42` |
| 기기-매장 고정 / PIN 매장 해석 | `AuthContext.tsx:619` · `components/POSTerminal/CashierPinModal.tsx:167-181` |

## 부록 B. 독립 검증(REVIEW.md) 대응표 — v2 에서 무엇이 바뀌었나

| 지적 | 수용 여부 | v2 반영 위치 |
|---|---|---|
| F1 네이티브 정체가 백필에서 스킵(스칼라 NULL) | **전면 수용** (운영 DB 재실측으로 재확인 — users 5·6·38 NULL) | §3 전면 재설계: 정체=파생 가상 기본 컨텍스트, 백필 폐기(§3.4), 복귀=기본 토큰(§4.2) |
| F2 role 변경 ↔ 모자 드리프트 | **전면 수용** | 기본 정체 파생화로 구조 소멸 + 생애주기 표(§3.5) + FI-6/영구 케이스(§9) |
| F3 크로스탭 토큰 플립 → POS·자동인쇄 무증상 정지 | **전면 수용 + 인쇄 안전으로 격상** | §4.7 신설(storage 이벤트 팔로우+오버레이+확인 모달), P3a 필수 편입(§7), §8-1, FI-7. *미세 정밀화: 결제 확인 모달은 v3.74 이후 실패 배너가 떠 완전 무증상은 아니다 — 무증상 정지의 본체는 자동인쇄 폴러(403은 로그아웃도 안 뜸). 결론 불변* |
| F4 brand/foodcourt 투영 등가성 주장은 오류 | **전면 수용 — v1 주장 철회** (brandScope.js 12파일 재실측) | §5.2 정정, 부여 타입 restaurant×RA 한정(§3.2/§10 Q3), 정합 검사 3중(부여·전환·매요청)+인스펙션, FI-9 |
| F5 회수 401 = 강제 로그아웃 모순 | **전면 수용** (httpClient.ts:80-87 재실측) | 기본 정체 폴백 + `X-Context-Fallback` 헤더(§4.3), FI-1/9.1-4 |
| F6 소켓 회수 후 24h 창 — "즉시 반영" 과대 서술 | **수용** — 핸드셰이크·join ctx 한정 재검증 채택. **단 토큰 수명 단축 선택지는 기각**(전 함대 재로그인 비용 > 좁은 창 이득, 기존 강등과 동일 성질) | §4.4 재작성("변경 0" 철회), §8-7 알려진 한계, FI-8 |
| F7 PIN 마찰 2건 | **수용** | §6.3: POS 진입 가드 신설(F7-2) + 모자 세션 소멸 문서화(F7-1, §8-8) |
| F8 userCanAccessEntity 누수 + 투영 필드 누락 | **수용** | §8-5 알려진 예외 명시 + 투영 전 필드 표(§4.3 — Staff 모자 제외 사유 포함) |
| F9 수치 부풀림(323/84) | **수용 — 재실측으로 정정** (role 정확 259/284+20, restaurant_id 93곳/21파일 — 리뷰의 22파일과 1 차이는 집계 스코프, 방향 동일) | §0, §3.6, §8-3, 부록 A |
| 일정 "4주 과소, 현실 5주" | **수용** | §7: 5주로 정정 (F1 재설계가 P1 을 1일 단축, F3~F5 가 +3~4일 순증) |
