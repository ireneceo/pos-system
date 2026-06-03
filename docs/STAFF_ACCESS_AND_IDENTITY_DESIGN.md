# 직원 식별(이메일 선택) + 접근 프로파일(주방/포스/서빙) — 설계

> 작성 2026-06-03 (Irene 요청). 상태: **DEV 구현 완료(2026-06-03), 미배포. 실브라우저 눈 확인 대기.**
> 두 가지 연동 변경: (1) 직원 이메일 **선택**(직원=직원이지 회원 아님) (2) **주방/포스/서빙 접근 프로파일** 분리(라이브오더=포스). 인쇄 무관. `docs/SERVING_VIEW_DESIGN.md`(서빙 뷰) + `docs/ROLES_AND_PERMISSIONS.md`(권한) 연관.

## 0. 구현 상태 (2026-06-03)

**완료**: 빌드 main.565f4e35.js (타입에러 0).
- 백엔드: `models/User.js`(email allowNull:true) + DB `ALTER users.email NULL` 적용 / `routes/users.js`(Staff 이메일 선택·MX·인증 스킵·OR조건·auto-access 제거·permissions 전달) / `middleware/auth.js`(pos_counter→**access_pos**) / `scripts/backfill-staff-access.js`(신규, dev 11/11 3키 부여).
- 프론트: `contexts/AuthContext.tsx`(canOperatePOS=access_pos, ROLE_PERMISSIONS Staff, **STAFF_ROUTE_ACCESS** 맵 + `canOpenStaffRoute`/`staffHomePath`) / `MainLayout.tsx`(운영 메뉴 6개 access 게이트 — 🔒 print poller 무변경 확인) / `ProtectedRoute.tsx`(Staff 운영 URL 직접진입 차단+랜딩 리다이렉트) / `StaffManagementPage.tsx`(`WorkAccessPicker` 3체크박스 + 이메일 선택) / i18n admin 4언어.

**검증 완료**:
- 이메일 선택: emailless Staff 생성 **201** + username 로그인 **200** + 비-Staff 이메일 필수 유지. DB email NULL 적용.
- 접근 enforcement 실토큰 **5/5** (serving/kitchen void·payment→403, pos→통과).
- 빌드 타입0 / i18n 0 / health-check 92/93(1=MainLayout+orders-crud🔒 지문, 의도됨·poller 무변경) / RA mount 47/47 크래시0 / backfill 11/11.

**남은 검증 (Irene 눈)**: 실 브라우저 로그인으로 — (a) 주방/포스/서빙 직원이 **사이드바에서 자기 메뉴만** 보는지, (b) 직원 추가 폼의 작업접근 체크박스+이메일 선택 UI, (c) 권한 없는 URL 직접진입 리다이렉트. (헤드리스는 이 환경에서 세션 부트스트랩 불가.)
- ⚠️ 배포 시: MainLayout🔒·orders-crud🔒 지문 변경 → `check-print-guard --bless` + 운영 `backfill-staff-access.js` 실행.

---

## 1. 기능 정의 (요구사항)

### 1-A. 이메일 선택화 (직원)
- 직원 추가 시 **이메일 강제 금지.** 직원은 회원(고객)이 아니라 **매장 직원** — 이메일 관리/퇴사 시 변경 부담 제거.
- 로그인 = **사번(username) + 비밀번호**, 또는 공용 단말 **PIN**. (로그인은 이미 username 지원.)
- 이메일 없는 직원 = **메일 알림 안 감**(원하던 바, 발송 가드가 이미 스킵). 비번 분실 = **매니저 리셋**.
- **다른 역할(Restaurant Admin/Owner/Brand/Foodcourt/Supplier/Customer)은 이메일 필수 유지.**

### 1-B. 접근 프로파일 (메뉴 가시성 분리)
- "베이직 다 포함" 폐기 → 직원별로 **주방 / 포스 / 서빙** 중 보이는 것만 선택(복수 가능).
- **라이브오더 = 포스 전용**(Irene).
- 직원이 권한 없는 페이지는 사이드바에서 숨김 + URL 직접 입력해도 차단(리다이렉트).

## 2. 접근 모델 (단일 진실)

`User.permissions` JSON 배열에 **운영 접근 키 3종**(기존 백오피스 그룹키와 별개):

| 키 | 보이는 것 | 카운터 액션 | 기본 진입 |
|----|----------|:----------:|----------|
| `access_pos` | **POS Terminal · Live Orders · Floor Plan(카운터) · Customer Display · Dashboard** | ✅ (결제/취소/void/현금박스/정산) | POS Terminal |
| `access_serving` | **Floor Plan(서빙=Items 뷰)** | ✗ | Floor Plan ?view=items |
| `access_kitchen` | **Kitchen Display(KDS)** | ✗ | Kitchen Display |

- **`canOperatePOS = role∈{System/Restaurant Admin} || permissions.includes('access_pos')`.**
  → 기존 `pos_counter` 키를 **`access_pos` 로 통합**(미배포라 안전). 카운터 액션 = "포스 접근" 과 동일 개념(POS 단말이 곧 카운터).
- `access_serving` 만 있고 `access_pos` 없음 = **서빙 전용**(canOperatePOS=false → Floor Plan 서빙모드, 카운터 버튼 숨김).
- Floor Plan 은 `access_pos` 또는 `access_serving` 중 하나라도 있으면 보임. 카운터 버튼/정산/드로어는 `access_pos` 일 때만.
- **백오피스 그룹키**(menu_management/inventory/marketing/reports/support/settings) = 기존 그대로(독립). 메뉴/재고/리포트 담당 직원용.

### 2-1. 메뉴 ↔ 키 매핑 (MainLayout 사이드바)
| 메뉴 | 게이트 |
|------|--------|
| POS Terminal | `access_pos` |
| Live Orders | `access_pos` (포스 전용) |
| Floor Plan | `access_pos \|\| access_serving` |
| Kitchen Display | `access_kitchen` |
| Customer Display / Pickup Display | `access_pos` |
| Dashboard / Mobile Order(메뉴설정) | `access_pos` |
| Products/Stock/Marketing/Analytics/Support/Settings | 기존 백오피스 그룹키 |
| Profile | 항상 |

## 3. API / 라우트 가드

### 3-A. 백엔드
- `requirePosCounter` 미들웨어 → **`access_pos` 검사**(키만 교체, 로직 동일). 결제기록·void·취소(cancelled)·정산은 그대로 카운터 전용.
- 이메일: `POST /users` — role==='Staff' 면 **email 필수 해제** + 빈 이메일이면 MX 검증·인증메일 스킵. 그 외 역할은 필수 유지.
- `User.email` 모델 `allowNull: true` (UNIQUE 유지 — MySQL 은 NULL 중복 허용이라 직원 다수 무이메일 OK). 다른 역할은 라우트단에서 필수 강제.
- 비번 재설정: 이메일 없는 직원은 이메일 복구 불가 → **매니저 리셋**(기존 `POST /users/:id/reset-password` / PIN) 안내.

### 3-B. 프론트 라우트 가드 (신규 — permission 기반)
- 지금 `canAccessRoute` = 역할(ROLE_ROUTES)만. **운영 라우트에 permission 가드 추가**:
  - 라우트→필요키 맵: `/pos-terminal`→access_pos, `/live-orders`→access_pos, `/kitchen`→access_kitchen, `/floor-plan`→access_pos∨access_serving, `/display`·`/dashboard`→access_pos.
  - `ProtectedRoute`(또는 canAccessRoute 확장): Staff 가 키 없는 운영 라우트 진입 시 → 본인 기본 진입 페이지로 리다이렉트.
- **기본 진입 페이지**: 로그인 후 Staff 는 보유 키 우선순위(access_pos→POS, 아니면 access_serving→Floor items, 아니면 access_kitchen→KDS)로 랜딩.

## 4. UI (StaffManagementPage)

직원 추가/편집 폼에 **"작업 접근(Work access)" 섹션** — 3개 체크박스(복수 선택):
- ☐ **POS / Counter** — POS·라이브오더·플로어플랜(결제/취소 포함)
- ☐ **Serving** — 플로어플랜 서빙(Items)만, 결제 없음
- ☐ **Kitchen** — 주방 디스플레이

규칙:
- 이메일 입력 = **선택**(라벨 `*` 제거, "직원은 비워도 됨 — 사번+비번/PIN 로그인" 힌트).
- 생성 시 **운영 접근 최소 1개 권장**(0개면 경고: "이 직원은 어떤 작업 화면도 못 봅니다").
- 통일 디자인: 기존 토글/체크박스 패턴(`role="switch"`/checkbox + 라벨+힌트), `--pos` 무관(관리 페이지=일반 팔레트 #635BFF).
- 백오피스 그룹(기존)과 시각적으로 분리(섹션 헤더).

## 5. 마이그레이션 / 백워드 호환

- **기존 Staff**(현재 모든 운영 메뉴 봄) → 백필로 **access_pos + access_serving + access_kitchen 3개 모두 부여**(현 동작 보존). `pos_counter` 보유분은 `access_pos` 로 치환.
  - 스크립트: `scripts/backfill-staff-access.js`(신규) — 멱등, --dry. (기존 `backfill-pos-counter.js` 대체/확장.)
- **신규 Staff**: 자동 부여 없음 → 폼에서 admin 이 선택(기존 "auto pos_counter" 제거).
- 이메일: 기존 직원 이메일 그대로(영향 0). 신규부터 선택.

## 6. 영향 / 비범위
- `canOperatePOS` 기반 서빙 뷰(이미 구현)는 키 교체만으로 그대로 동작(access_pos).
- LiveOrders 페이지 자체는 access_pos 라우트 가드로 서빙/주방 직원에게서 숨김 → 별도 버튼 게이트 불필요(접근 자체 차단).
- 비범위: 순수 PIN-only 직원 프로필(별도 로그인 없는 모델)은 차기. 이번은 username+선택이메일.

## 7. 6-단계 매핑
1. 기능정의 §1 · 2. API/route §3 · 3. DB(email nullable + permissions 키) §2/§3 · 4. UI §4 · 5. 코드(touch points 아래) · 6. 테스트 §8.

### Touch points
- 백엔드: `models/User.js`(email allowNull) · `routes/users.js`(Staff email 선택 + access 기본 제거) · `middleware/auth.js`(pos_counter→access_pos) · `routes/orders-crud.js`·`orders-payment.js`(키 교체는 미들웨어 내부라 무변경) · `scripts/backfill-staff-access.js`(신규).
- 프론트: `contexts/AuthContext.tsx`(canOperatePOS=access_pos, ROLE_PERMISSIONS Staff, 라우트→키 맵, 기본 랜딩) · `components/Layout/MainLayout.tsx`(메뉴 게이트) · `components/ProtectedRoute.tsx`(permission 가드) · `pages/Admin/StaffManagementPage.tsx`(접근 체크박스 + 이메일 선택) · `pages/FloorPlan/*`(canOperatePOS 그대로) · i18n admin/auth.

## 8. 테스트 시나리오
- **이메일 선택**: 이메일 없이 Staff 생성 → 성공(username/PIN 로그인). 다른 역할은 이메일 없으면 400. 무이메일 직원 → 알림 발송 스킵 확인.
- **접근 분리(실토큰)**: serving 직원 → /pos-terminal·/live-orders·/kitchen 접근 차단(리다이렉트), /floor-plan(서빙) 허용. kitchen 직원 → /kitchen 만. pos 직원 → 전부.
- **카운터 액션**: access_pos 없는 직원 → 결제/취소/void 403(기존 enforcement, 키만 access_pos).
- **백필**: 기존 Staff 3키 부여 후 동작 동일.
- mount(역할별 랜딩 크래시 0) · build · i18n · health-check.
