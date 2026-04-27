# 데모/테스트 계정 관리 가이드

> **최종 업데이트:** 2026-03-18
> **목적:** 데모/테스트 계정이 실제 매출 통계에 영향을 주지 않도록 관리

---

## 1. 핵심 원칙

### 데모 계정 = 실제 매출에서 반드시 제외
- System Admin 대시보드, 인보이스 통계, 매출 리포트에 데모/테스트 데이터가 포함되면 안 됨
- 데모 계정의 POS 기능은 100% 동일하게 동작해야 함 (데모 시연 목적)
- `is_demo` 플래그로 분리 (DB 필터링)

---

## 2. is_demo / is_test 플래그 체계 (2026-03-18 분리)

### 이원 플래그

| 플래그 | 대상 | 배지 색상 | 구독 탭 | 매일 리셋 | 통계 제외 |
|--------|------|----------|---------|----------|----------|
| `is_demo=true` | DemoPage 전용 계정 (demo-brand, demo-restaurant) | 주황 #F59E0B | 숨김 | O | O |
| `is_test=true` | 테스트 계정 (brand_general, kdine_admin 등) | 보라 #8B5CF6 | 보임 | X | O |

### 적용 대상 테이블

| 테이블 | is_demo | is_test | 설명 |
|--------|---------|---------|------|
| `users` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 유저 |
| `restaurants` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 레스토랑 |
| `brands` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 브랜드 |
| `foodcourts` | BOOLEAN DEFAULT false | BOOLEAN DEFAULT false | 푸드코트 |

### 보호 규칙 (2026-04-03 확장, 2026-04-11 업데이트)

| 보호 | is_demo | is_test |
|------|:---:|:---:|
| 프로필/비밀번호 변경 차단 (demoProtection 미들웨어) | ✅ | ✅ |
| 비밀번호 리셋 API 차단 (reset-password) | ✅ | ✅ |
| 매일 리셋 (demoResetScheduler) | ✅ | ❌ |
| 관리자 공지 이메일 발송 제외 (2026-04-11) | ✅ | ✅ |

**관리자 공지 이메일 제외 상세** (`routes/notices.js`):
- broadcast 4개 target (`all`/`role`/`brand`/`foodcourt`)의 recipient 생성 시 User/Restaurant 양쪽에서 `is_demo=false, is_test=false` 필터 적용
- `select_restaurants`(명시 선택)는 관리자가 의도적으로 데모를 고를 수 있도록 필터 적용하지 않음
- Role=Restaurant Admin/Staff의 경우 소속 레스토랑이 데모면 해당 유저도 제외

### 필터링 범위

| System Admin 페이지 | is_demo=false만 | is_demo 전체 (뱃지 표시) |
|---------------------|:-:|:-:|
| Dashboard 매출/통계 | ✅ | |
| 인보이스 목록 | ✅ (토글로 전체 보기 가능) | |
| 구독 관리 | ✅ | |
| 레스토랑 관리 | | ✅ |
| 유저/매니저 관리 | | ✅ |

---

## 3. 현재 운영 계정 분류 (2026-03-11 기준)

### 실제 계정 (is_demo = false)

| 유형 | Username | 역할 | 연결 엔티티 |
|------|----------|------|------------|
| System Admin | systemadmin (ID:4) | System Admin | - |
| Brand | gitconsulting (ID:23) | Brand General | Brand: with MIN, K-DINE with MIN |
| Restaurant | kdineipc1 (ID:19) | Restaurant Admin | K-DINE IPC Branch (ID:8) |
| Restaurant | withmin1 (ID:22) | Restaurant Admin | with MIN Cafe (ID:10) |
| Restaurant | kdine_admin (ID:9) | Restaurant Admin | K-Dine Korean Restaurant (ID:5) |
| Staff | Moon (ID:28) | Staff | K-DINE IPC Branch (ID:8) |
| Staff | kdine_staff (ID:10) | Staff | K-Dine Korean Restaurant (ID:5) |

### 데모/테스트 계정 (is_demo = true)

| 유형 | Username | 역할 | 연결 엔티티 | 용도 |
|------|----------|------|------------|------|
| Admin | admin (ID:1) | System Admin | - | 기존 테스트용 |
| Brand GM | brand_general (ID:6) | Brand General | - | 테스트 |
| Brand GM | demo-brand (ID:24) | Brand General | Brand: K-Taste Group (ID:4) | 로그인 페이지 데모 |
| Brand Mgr | john_manager (ID:2) | Brand Manager | - | 테스트 |
| Brand Mgr | jane_manager (ID:3) | Brand Manager | - | 테스트 |
| Brand Mgr | brand_manager1 (ID:8) | Brand Manager | - | 테스트 |
| Brand GM | K-DINE Brand (ID:11) | Brand General | - | 테스트 |
| FC GM | foodcourt_general (ID:5) | Foodcourt General | - | 테스트 |
| FC Mgr | foodcourt_manager1 (ID:7) | Foodcourt Manager | - | 테스트 |
| FC Mgr | ㅇ (ID:20) | Foodcourt Manager | - | 테스트 |
| Rest Admin | demo-restaurant (ID:25) | Restaurant Admin | Seoul Garden BBQ (ID:13) | 로그인 페이지 데모 |
| Staff | teststaff_kdine (ID:26) | Staff | K-Dine Korean Restaurant (ID:5) | 테스트 |
| Owner | owner_test (ID:27) | Restaurant Owner | Seoul BBQ House, Downtown Pizza, Sunset Cafe | 테스트 |
| Supplier | demo-supplier (ID:227) | Supplier Admin | SupplierCompany: Demo Supplier Co. (ID:20, plan=supplier_advanced) | 로그인 페이지 데모 (2026-04-27 추가) |

### 데모/테스트 레스토랑 (is_demo = true)

| ID | 이름 | 연결된 데모 유저 |
|----|------|-----------------|
| 1 | Seoul BBQ House | owner_test (ownership) |
| 2 | Downtown Pizza | owner_test (ownership) |
| 3 | Sunset Cafe | owner_test (ownership) |
| 4 | Fresh Sushi | - |
| 6 | Sunway Pyramid Foodcourt | foodcourt_general, foodcourt_manager1 |
| 7 | KFC Sunway Pyramid | brand_manager1 |
| 9 | test_lua | jane_manager, foodcourt_general, brand_general, K-DINE Brand |
| 13 | Seoul Garden BBQ | demo-brand, demo-restaurant |
| 14 | Gangnam Noodle House | demo-brand |

### 데모/테스트 브랜드 (is_demo = true)

| ID | 이름 | owner_id |
|----|------|----------|
| 4 | K-Taste Group | demo-brand (ID:24) |

---

## 4. 새 데모 계정 생성 체크리스트

**새 역할의 데모 계정을 추가할 때 아래 항목을 반드시 확인:**

### 4-1. DB 설정
- [ ] `users` 레코드 생성 시 `is_demo = true` 설정
- [ ] 연결된 `restaurants` 레코드에 `is_demo = true` 설정
- [ ] 연결된 `brands` / `foodcourts` 레코드에 `is_demo = true` 설정 (해당 시)
- [ ] `restaurant_managers` junction 레코드 생성 (oversight/ownership)

### 4-2. Seed 스크립트 업데이트
- [ ] `/var/www/dev-backend/seed-demo-data.js` 에 데모 데이터 추가
- [ ] 데모 리셋 스케줄러 반영 확인: `/var/www/dev-backend/services/demoResetScheduler.js`

### 4-3. 프론트엔드 업데이트
- [ ] 로그인 페이지 데모 계정 목록 업데이트: `/var/www/dev-frontend/src/pages/Login/LoginPage.tsx`
- [ ] DemoPage 업데이트 (해당 시): `/var/www/dev-frontend/src/pages/Landing/DemoPage.tsx`

### 4-4. 통계/인보이스 필터 확인
- [ ] Admin Dashboard API에서 `is_demo = false` 필터 적용 확인
- [ ] 인보이스 목록 API에서 `is_demo` 필터 적용 확인
- [ ] 통계/리포트 API에서 `is_demo` 필터 적용 확인
- [ ] 구독 관리 페이지에서 `is_demo` 필터 적용 확인

### 4-5. 검증
- [ ] 데모 계정으로 로그인 → 모든 POS 기능 정상 동작 확인
- [ ] System Admin으로 로그인 → 데모 데이터가 매출/통계에서 제외되는지 확인
- [ ] 인보이스 목록에서 "전체 보기" 토글 시 데모 인보이스도 표시되는지 확인

---

## 5. 역할별 데모 계정 필수 구성

### 각 역할 데모 시 필요한 엔티티

| 데모 역할 | 필수 엔티티 | 비고 |
|-----------|------------|------|
| Brand General | Brand(is_demo) + Restaurant(is_demo) 1~2개 | 인보이스 발행 시연 필요 |
| Foodcourt General | Foodcourt(is_demo) + Restaurant(is_demo) 1~2개 | 인보이스 발행 시연 필요 |
| Restaurant Admin | Restaurant(is_demo) 1개 + Menu/Order 데모 데이터 | POS 시연 필요 |
| Restaurant Owner | Restaurant(is_demo) 2~3개 (ownership) | 비교 통계 시연 필요 |
| Staff | Restaurant(is_demo) 1개 + PIN 4자리 | POS 캐셔 전환 시연 |

### 연쇄 마킹 규칙
```
데모 Brand General 생성 시:
  → User.is_demo = true
  → Brand.is_demo = true
  → 소속 Restaurant.is_demo = true (모두)
  → 해당 레스토랑의 Restaurant Admin.is_demo = true
  → 해당 레스토랑의 Staff.is_demo = true
  → restaurant_managers 레코드 생성
```

---

## 6. API 필터링 패턴 (구현 시 참고)

### Backend (Sequelize)
```javascript
// System Admin 통계/인보이스에서 데모 제외
const where = { ...filters };

// 레스토랑 기반 필터
const restaurantWhere = includeDemo ? {} : { is_demo: false };

// 인보이스 조회
const invoices = await Invoice.findAll({
  include: [{
    model: Restaurant,
    where: restaurantWhere
  }]
});
```

### Frontend (Admin 페이지)
```tsx
// 인보이스/통계 페이지에 토글 추가
const [includeDemo, setIncludeDemo] = useState(false);

// API 호출 시 쿼리 파라미터
fetch(`/api/invoices?includeDemo=${includeDemo}`)
```

---

## 7. 관련 파일

| 파일 | 역할 |
|------|------|
| `/var/www/dev-backend/seed-demo-data.js` | 데모 데이터 시드 스크립트 |
| `/var/www/dev-backend/services/demoResetScheduler.js` | 데모 데이터 자동 리셋 |
| `/var/www/dev-frontend/src/pages/Login/LoginPage.tsx` | 로그인 페이지 데모 계정 표시 |
| `/var/www/dev-frontend/src/pages/Landing/DemoPage.tsx` | 데모 체험 페이지 |
| `/var/www/docs/DEMO_ACCOUNT_GUIDE.md` | 이 문서 |
