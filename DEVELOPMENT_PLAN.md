# Purple POS - 개발 진행 현황

> **최종 업데이트:** 2026-02-09
> **데이터베이스:** purple_dev_db (MySQL)
> **프로젝트:** 구독 기반 POS 시스템 with 모듈 관리

---

## 📐 플랫폼 역할 & 인보이스 아키텍처

### 역할 계층
```
System Admin (플랫폼 운영)
├── 독립 레스토랑 직접 등록/관리
├── Brand / Foodcourt 생성 및 관리
└── POS 구독 플랜 관리 → 모든 레스토랑에 POS 구독료 인보이스 발행

Brand General (브랜드 운영, 1:1 매칭)
├── 브랜드 소속 레스토랑(가맹점) 관리
├── 자체 구독 플랜 생성 (로얄티, 브랜드비, 매출% 등)
└── 소속 레스토랑에 브랜드 플랜 인보이스 발행

Foodcourt General (푸드코트 운영, 1:1 매칭)
├── 푸드코트 입점 레스토랑 관리
├── 자체 구독 플랜 생성 (임대료, 관리비, 매출% 등)
└── 입점 레스토랑에 푸드코트 플랜 인보이스 발행

Restaurant Admin (레스토랑 운영, 1:1 매칭)
└── 자기 레스토랑 POS 운영
```

### 레스토랑 연결 구조 (멀티)
한 레스토랑은 Brand와 Foodcourt에 **동시에** 속할 수 있음 (독립적 FK)
```
Case 1: 독립 레스토랑        → 인보이스: System Admin만
Case 2: Brand 소속           → 인보이스: System Admin + Brand GM
Case 3: Foodcourt 입점       → 인보이스: System Admin + Foodcourt GM
Case 4: Brand + Foodcourt    → 인보이스: System Admin + Brand GM + Foodcourt GM
```

### 인보이스 발행 주체별 분리
| issuer_type | 발행자 | 대상 | 과금 항목 |
|-------------|--------|------|-----------|
| `system_admin` | System Admin | 모든 레스토랑 | POS 구독료 (고정비) |
| `brand` | Brand General | 소속 레스토랑 | 로얄티, 브랜드비, 매출%, 고정비 등 |
| `foodcourt` | Foodcourt General | 입점 레스토랑 | 임대료, 관리비, 매출%, 고정비 등 |

### 이메일 SMTP (각 역할 독립)
- 각 역할이 자기 notification_settings에 SMTP 설정
- 자기가 발행한 인보이스는 자기 SMTP로 발송
- System Admin SMTP를 다른 역할이 대신 쓰지 않음

---

## 🔜 다음 개발: Brand/Foodcourt 구독 플랜 & 이메일 시스템 (2026-02-09 기획)

### 개요
Brand General / Foodcourt General이 각자 구독 플랜을 만들고, 소속 레스토랑에 자동 인보이스를 발행하는 시스템.
이메일 발송은 각 역할이 자기 SMTP 설정으로 독립 발송.

### Phase 1: DB 스키마 & 이메일 SMTP 확장

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 1-1 | `entity_plans` 테이블 생성 | 공통 플랜 테이블. entity_type(brand/foodcourt), entity_id, plan_name, subscription_fee(고정비), revenue_percentage(매출%), rent_type(fixed/percentage/combined), rent_fixed/rent_percentage/rent_minimum, billing_cycle, auto_generate, tax_rate, is_active | ⬜ |
| 1-2 | `entity_plan_restaurants` 테이블 생성 | entity_plan_id ↔ restaurant_id 연결 (어떤 레스토랑이 어떤 플랜 적용) | ⬜ |
| 1-3 | `notification_settings` ENUM 확장 | entity_type에 `'brand'`, `'foodcourt'` 추가 마이그레이션 | ⬜ |
| 1-4 | emailService.js 리팩터링 | `sendIssuerEmail(issuerType, issuerId, mailOptions)` — 발행 주체별 SMTP 자동 선택 | ⬜ |
| 1-5 | NotificationSettingsPage 보강 | Brand/Foodcourt entity_type 정확히 저장되도록 수정 | ⬜ |

### Phase 2: Brand Plans CRUD & 레스토랑 연결 (Brand GM 우선)

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 2-1 | Brand Plans API | `GET/POST/PUT/DELETE /api/brands/:id/plans` — Brand GM이 자기 플랜 CRUD | ⬜ |
| 2-2 | 플랜→레스토랑 연결 API | `POST/DELETE /api/brands/:id/plans/:planId/restaurants` — 플랜에 레스토랑 배정/해제 | ⬜ |
| 2-3 | Brand PlansPage 재개발 | 하드코딩 제거, Brand GM 전용 플랜 CRUD UI (고정비 + 매출% + 임대료 설정) | ⬜ |
| 2-4 | 플랜→레스토랑 연결 UI | 플랜 상세에서 소속 레스토랑 배정/해제 인터페이스 | ⬜ |

### Phase 3: 매출 기반 % 계산 & 자동 인보이스

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 3-1 | 매출 조회 API | 기간별 레스토랑 orders.total 합산 (Brand 인보이스 계산 근거) | ⬜ |
| 3-2 | % 계산 엔진 | fixed(고정비) + percentage(매출%) + combined(MAX(최소금액, 매출%)) 계산 로직 | ⬜ |
| 3-3 | invoiceScheduler 확장 | 기존 system_admin 자동생성 + entity_plans 기반 Brand/Foodcourt 자동 인보이스 병렬 실행 | ⬜ |
| 3-4 | Brand SubscriptionsPage 보강 | 레스토랑별 플랜 현황, 청구 예상액, 자동발행 상태 표시 | ⬜ |

### Phase 4: 이메일 발송 전체 보강

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 4-1 | 인보이스 이메일 트리거 보강 | 자동 생성 + 수동 생성 인보이스 모두 발행자 SMTP로 이메일 발송 | ⬜ |
| 4-2 | `/api/invoices/:id/send-email` 구현 | placeholder → 실제 구현 (발행자의 SMTP 사용) | ⬜ |
| 4-3 | Welcome 이메일 발송 주체 변경 | Brand가 레스토랑 만들면 Brand SMTP, System Admin이면 Admin SMTP | ⬜ |
| 4-4 | 이메일 템플릿 보강 | Brand/Foodcourt 로고, 발신자 정보 반영한 인보이스 이메일 | ⬜ |

### Phase 5: Foodcourt 적용 (Brand 완성 후)

| # | 작업 | 설명 | 상태 |
|---|------|------|:----:|
| 5-1 | Foodcourt Plans API | Brand와 동일 구조, entity_type='foodcourt'로 재사용 | ⬜ |
| 5-2 | Foodcourt PlansPage | Brand PlansPage 기반으로 Foodcourt GM 전용 UI | ⬜ |
| 5-3 | Foodcourt 자동 인보이스 | invoiceScheduler에서 foodcourt entity_plans도 처리 | ⬜ |
| 5-4 | Foodcourt SubscriptionsPage | 입점 레스토랑별 플랜 현황 UI | ⬜ |

### 핵심 설계 원칙
- **entity_plans 공통 테이블**: Brand/Foodcourt 공용. entity_type 필드로 구분 (별도 테이블 X)
- **매출% 계산**: orders 테이블에서 billing_period 기간 내 completed 주문의 total 합산
- **Combined 방식**: `MAX(고정 최소금액, 매출%계산액)` — 최소 보장 금액 이상만 청구
- **이메일 독립**: sendPlatformEmail 폐기 → sendIssuerEmail로 통일 (issuer의 SMTP 사용)
- **Foodcourt 나중에**: Brand에서 먼저 완성도 높인 후 동일 구조로 적용

### 범위 외 (이번 개발에서 제외)
- 결제 게이트웨이 연동 (수동 결제 확인 방식 유지)
- 시스템관리자 POS 구독 플랜 변경 (기존 plan_templates 그대로 유지)

---

## 🚀 개발 성능 가이드라인 (필독)

### 1. 데이터 처리 원칙

| 원칙 | 잘못된 예 | 올바른 예 |
|------|----------|----------|
| **서버 집계 우선** | 10000개 주문 클라이언트 전송 → useMemo 계산 | 서버에서 집계 후 요약 데이터만 전송 |
| **필요한 데이터만** | `SELECT * FROM orders` | `SELECT id, total_amount FROM orders` |
| **페이지네이션 필수** | `limit: '10000'` | `limit: '50'` + 페이지네이션 UI |
| **인덱스 활용** | WHERE 절 미인덱스 컬럼 | 자주 조회되는 컬럼에 인덱스 추가 |

### 2. API 설계 패턴

```javascript
// ❌ BAD: 대량 데이터를 클라이언트로 전송 후 계산
const orders = await Order.findAll({ limit: 10000 });
// 클라이언트에서 reduce, map, filter로 집계

// ✅ GOOD: 서버에서 집계 후 요약만 전송
router.get('/reports-summary', async (req, res) => {
  const summary = await Order.findAll({
    attributes: [
      [sequelize.fn('SUM', sequelize.col('total_amount')), 'totalRevenue'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'totalOrders']
    ],
    where: { status: 'completed', order_date: { [Op.between]: [startDate, endDate] } }
  });
  res.json({ success: true, data: summary });
});
```

### 3. 프론트엔드 최적화

```typescript
// ❌ BAD: 대량 데이터 클라이언트 계산
const totalRevenue = useMemo(() => {
  return orders.reduce((sum, order) => sum + order.total_amount, 0);
}, [orders]); // orders가 10000개면 매 렌더링마다 계산

// ✅ GOOD: 서버 집계 데이터 직접 사용
const totalRevenue = useMemo(() => {
  return reportsSummary?.summary?.totalRevenue || 0;
}, [reportsSummary]); // 이미 계산된 값 사용
```

### 4. 리포트/대시보드 페이지 개발 시 체크리스트

- [ ] 서버에서 집계 API 먼저 구현 (`/reports-summary`, `/stats` 등)
- [ ] 클라이언트는 집계된 데이터만 받아서 렌더링
- [ ] 날짜 범위 필터는 서버로 전달하여 서버에서 필터링
- [ ] 차트 데이터도 서버에서 그룹화하여 제공
- [ ] `limit: '10000'` 같은 대량 조회 절대 금지

### 5. 실제 적용 사례 (2026-02-05)

**Reports 페이지 성능 개선:**
- 기존: `/api/orders?limit=10000` → 클라이언트 useMemo로 모든 통계 계산
- 개선: `/api/dashboard/restaurant/:id/reports-summary` → 서버에서 일별/카테고리별/메뉴별/시간대별 집계
- 결과: 데이터 전송량 대폭 감소, 페이지 로딩 속도 향상

---

## ✅ 완료: Blog/FAQ CMS 및 랜딩 페이지 디자인 통일 (2026-02-05)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Content Management 시스템 | Blog/FAQ 콘텐츠 관리 페이지 (4탭 구조: Blog, Blog Categories, FAQ, FAQ Categories) | ✅ 완료 |
| Public Blog/FAQ 페이지 | 랜딩 사이트용 Blog, FAQ 공개 페이지 및 상세 페이지 | ✅ 완료 |
| 랜딩 페이지 디자인 통일 | About 페이지 스타일로 FAQ/Blog 페이지 HeroSection 통일 (gradient 배경) | ✅ 완료 |
| GNB 서브배너 높이 통일 | 모든 랜딩 페이지 HeroSection padding 40px 20px로 통일 | ✅ 완료 |
| 카테고리 아이콘 제거 | FAQ/Blog 카테고리 탭에서 이모지 아이콘 제거, 텍스트만 표시 | ✅ 완료 |
| 작성자 표시 개선 | 이메일 대신 full_name 표시, 이메일 형식이면 'PurpleHere Team' 표시 | ✅ 완료 |
| 홈페이지 버튼 hover 수정 | Try Demo 버튼 hover 시 메인 컬러(#635BFF) 배경 + 흰색 글자 | ✅ 완료 |
| 홈페이지 Feature 카드 수정 | 첫번째 카드를 Restaurant Management로 변경, 아이콘 크기 통일 | ✅ 완료 |

### 수정된 파일
- `dev-backend/models/Content.js` - 콘텐츠 모델
- `dev-backend/models/ContentCategory.js` - 콘텐츠 카테고리 모델
- `dev-backend/routes/contents.js` - 콘텐츠 API (공개/관리자)
- `dev-backend/middleware/auth.js` - full_name 필드 추가
- `dev-frontend/src/pages/Admin/ContentManagementPage.tsx` - CMS 관리 페이지
- `dev-frontend/src/pages/Landing/FAQPage.tsx` - 공개 FAQ 페이지 (LandingLayout, gradient hero)
- `dev-frontend/src/pages/Landing/BlogPage.tsx` - 공개 Blog 페이지 (LandingLayout, gradient hero)
- `dev-frontend/src/pages/Landing/BlogPostPage.tsx` - Blog 상세 페이지 (Back to Blog 위치 변경)
- `dev-frontend/src/pages/Landing/HomePage.tsx` - 버튼 hover 색상, Feature 카드 내용 수정

---

## ✅ 완료: Contact Form 개선 및 배포 시스템 수정 (2026-02-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Contact Form Free Trial 옵션 | Inquiry Type에 "Start Free Trial (7 days free)" 추가 | ✅ 완료 |
| Preferred Username 필드 | Free Trial 선택 시 원하는 아이디 입력 필드 표시 | ✅ 완료 |
| Backend API 수정 | inquiry_type, preferred_username 필드 저장 지원 | ✅ 완료 |
| Pricing 페이지 통화 수정 | 설정된 통화 가격 없을 시 "Contact Us" 표시 | ✅ 완료 |
| Plans 관리 페이지 통화 수정 | 설정된 통화 가격 없을 시 "Price Not Set" 표시 | ✅ 완료 |
| addon-modules 메뉴 삭제 | 불필요한 메뉴 및 라우트 제거 | ✅ 완료 |
| deploy-dev.sh 수정 | nginx 배포 폴더(/var/www/dev-frontend-build)로 자동 복사 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Landing/ContactPage.tsx` - Free Trial 옵션, Preferred Username 필드
- `dev-frontend/src/pages/Landing/PricingPage.tsx` - 통화별 가격 표시 개선
- `dev-frontend/src/pages/Admin/PlansPage.tsx` - 통화별 가격 표시 개선
- `dev-backend/models/ContactInquiry.js` - inquiry_type, preferred_username 필드 추가
- `dev-backend/routes/public.js` - Free Trial 필수 필드 검증 추가
- `dev-backend/routes/siteSettings.js` - Contact 정보(phone, whatsapp, business_hours) 반환
- `dev-frontend/src/components/Layout/MainLayout.tsx` - addon-modules 메뉴 제거
- `dev-frontend/src/App.tsx` - AddonModulesPage 라우트 제거
- `dev-frontend/deploy-dev.sh` - nginx 배포 폴더 복사 단계 추가

---

## ✅ 완료: Support Ticket 필터링 및 API 개선 (2026-02-03)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Support Ticket customerId 필터링 | Brand/Foodcourt General이 본인 티켓만 보도록 수정 | ✅ 완료 |
| Backend API 개선 | GET /api/support-tickets에 customerId 파라미터 추가 | ✅ 완료 |
| Frontend API 호출 수정 | SystemInquiryPage에서 customerId로 필터링 | ✅ 완료 |
| API 테스트 | curl로 필터링 동작 검증 완료 | ✅ 완료 |

### 작업 상세

**문제:**
- Brand General과 Foodcourt General이 System Inquiry 페이지에서 모든 사용자의 티켓을 볼 수 있었음
- 본인이 생성한 티켓만 표시되어야 하는데 전체 티켓이 노출됨

**해결:**
1. Backend API (`/api/support-tickets`):
   - `customerId` 쿼리 파라미터 지원 추가
   - WHERE 절에 customerId 필터 추가

2. Frontend (Brand/Foodcourt SystemInquiryPage):
   - API 호출 시 `?customerId=${currentUserId}` 파라미터 전달
   - 기존 `userId`, `userRole` 파라미터 제거

**테스트 결과:**
- 필터 없이: 5개 티켓 반환
- `customerId=6` (Brand General): 1개 티켓만 반환
- 데이터베이스 조회 검증 완료

### 수정된 파일
- `dev-backend/routes/support-tickets.js` - customerId 필터 추가
- `dev-frontend/src/pages/Brand/SystemInquiryPage.tsx` - API 호출 수정
- `dev-frontend/src/pages/Foodcourt/SystemInquiryPage.tsx` - API 호출 수정

---

## ✅ 완료: 데모 계정 설정 및 운영서버 배포 (2026-02-02)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 데모 계정 데이터 수정 | Restaurant 1 메뉴 및 카테고리 재구성 | ✅ 완료 |
| 테스트 계정 수정 | LoginPage.tsx TEST_ACCOUNTS 업데이트 | ✅ 완료 |
| 데모 계정 플랜 업그레이드 | Enterprise Plan으로 모든 기능 활성화 | ✅ 완료 |
| 운영서버 배포 | 개발서버 → 운영서버 배포 완료 | ✅ 완료 |

### 데모 계정 설정 상세

**Restaurant 1 (Seoul BBQ House) 데이터 정비:**
- 기존 잘못된 카테고리 삭제 ("test 123", "222", "3333")
- 새 카테고리 4개 생성:
  - 🥗 Appetizers (3개 메뉴)
  - 🍽️ Main Dishes (4개 메뉴)
  - 🥤 Beverages (3개 메뉴)
  - 🍰 Desserts (2개 메뉴)
- 총 12개 메뉴 아이템 추가 (코드, 가격, 이모지 포함)
- 주문 방식 4가지 모두 활성화 (Dine In, Takeaway, Pre-order Pickup, Delivery)

**플랜 업그레이드:**
- Restaurant 1: Enterprise Plan (주문 무제한, 메뉴 무제한, 스태프 무제한)
- Brand 1 (K-DINE): Enterprise Plan (10년 구독)
- demo-brand@purplehere.com → Brand 1에 연결
- demo-restaurant@purplehere.com → Restaurant 1에 연결

**테스트 계정 수정:**
- Restaurant Admin 계정을 `admin@kdine.com` (300+ 주문 데이터)로 변경
- 기존 `restaurant_admin@orderhere.center` 제거 (DB에 없음)

### 수정된 파일
- `dev-frontend/src/pages/Login/LoginPage.tsx` - 데모/테스트 계정 업데이트
- `dev-frontend/src/components/Landing/LandingHeader.tsx` - 로고 텍스트 수정
- `dev-frontend/src/pages/Landing/AboutPage.tsx` - About 페이지 업데이트
- `dev-frontend/src/pages/Landing/FeaturesPage.tsx` - Features 페이지 업데이트
- `dev-frontend/src/pages/Landing/DemoPage.tsx` - Demo 페이지 업데이트
- `dev-frontend/src/pages/Admin/InvoicesPage.tsx` - Invoices 페이지 업데이트

### 운영서버 배포
- 배포 시간: 2026-02-02 21:15:14 UTC
- 백업 위치: /var/www/backups/20260202_211411
- 배포 방식: 개발서버 → 운영서버 (rsync)
- 헬스체크: ✅ 통과

---

## ✅ 완료: Restaurant-Admin 1:1 매칭 구현 (2026-02-08)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Backend POST /api/restaurants 수정 | adminAction(create/assign)으로 Restaurant Admin 동시 생성 | ✅ 완료 |
| Backend GET 응답에 admin 필드 추가 | 레스토랑 응답에 admin 객체 포함, managers에서 Admin 제외 | ✅ 완료 |
| Backend PUT /api/restaurants/:id 수정 | Admin 변경(create/change) 트랜잭션 지원 | ✅ 완료 |
| GET /api/users/available-admins | 미배정 유저(Restaurant Admin, Staff) 검색 API | ✅ 완료 |
| validateRestaurantCreation 미들웨어 | adminAction 조건부 검증 규칙 | ✅ 완료 |
| Admin RestaurantsPage Add Modal | 새 계정 생성/기존 유저 선택 토글, 감독 매니저 분리 | ✅ 완료 |
| Admin RestaurantsPage Edit/View Modal | Admin 정보 읽기전용 표시, Change Admin, View 분리 표시 | ✅ 완료 |
| Manager RestaurantsPage 수정 | Add 모달에 Admin 생성 필드, 현재 매니저 자동 감독자 등록 | ✅ 완료 |
| SubscriptionsPage 소규모 수정 | 레스토랑 선택 시 Admin 정보 표시 | ✅ 완료 |
| StaffManagementPage 경고 추가 | Restaurant Admin 직접 생성 시 안내 메시지 | ✅ 완료 |
| 데이터 마이그레이션 스크립트 | Brand/Foodcourt Manager → restaurant_managers 이동 | ✅ 완료 |

### 수정된 파일
- `dev-backend/routes/restaurants.js` - POST/GET/PUT Admin 로직
- `dev-backend/routes/users.js` - available-admins 엔드포인트
- `dev-backend/middleware/validation.js` - validateRestaurantCreation
- `dev-backend/scripts/migrate-restaurant-admins.js` - 마이그레이션 스크립트 (신규)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` - Add/Edit/View 모달 + 카드
- `dev-frontend/src/pages/Manager/RestaurantsPage.tsx` - Add 모달 Admin 섹션
- `dev-frontend/src/pages/Admin/SubscriptionsPage.tsx` - Admin 정보 표시
- `dev-frontend/src/pages/Admin/StaffManagementPage.tsx` - 경고 메시지

---

## ✅ 완료: 블로그 UI 개선 & Brand/Foodcourt 구독 플랜 기획 (2026-02-09)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 블로그 썸네일 배경색 변경 | 보라색 그라데이션 → 연회색 3단계 그라데이션 (#F8F9FA→#E9ECEF→#DEE2E6) | ✅ 완료 |
| 이메일/인보이스 시스템 현황 분석 | Welcome/Invoice 이메일 발송 현황, SMTP 구조, 자동생성 인보이스 이메일 미구현 확인 | ✅ 완료 |
| 플랫폼 아키텍처 정리 | 역할별 인보이스 발행 구조, 멀티 연결(Brand+Foodcourt), SMTP 독립 구조 문서화 | ✅ 완료 |
| Brand/Foodcourt 구독 플랜 5 Phase 기획 | DB 스키마, API, 매출% 계산 엔진, 이메일 보강, Foodcourt 적용 계획 수립 | ✅ 완료 |
| MEMORY.md 아키텍처 보강 | 역할 구조, 레스토랑 연결 4가지 케이스, 인보이스 발행 주체, SMTP 독립 구조 | ✅ 완료 |

### 수정된 파일
- `dev-frontend/src/pages/Landing/BlogPage.tsx` - 썸네일 배경색 변경
- `DEVELOPMENT_PLAN.md` - 아키텍처 섹션 + 5 Phase 개발 계획 추가

---

## 🚀 서비스 오픈 준비 로드맵 (현재 진행 중)

### 현재 상황

**목표:** 현재까지 구현된 기능(재고관리까지)으로 서비스 오픈

**필요한 3가지 영역:**
1. 구독/결제 플랜 완성 → ✅ 완료
2. 고객 회계 서포트 (기존 메뉴 버그 수정) → ✅ 완료
3. 홍보 웹페이지 → ✅ 완료

---

### Phase A: 오픈 필수 ✅ 완료 (2026-02-05)

| 순서 | 작업 | 영역 | 상태 |
|:----:|------|------|:----:|
| 1 | CSV 다운로드 버그 수정 | 회계 | ✅ 완료 |
| 2 | PDF 다운로드 버그 수정 | 회계 | ✅ 완료 |
| 3 | Pricing 페이지 | 홍보 | ✅ 완료 |
| 4 | Contact 페이지 | 홍보 | ✅ 완료 |
| 5 | 랜딩페이지 SEO 최적화 | 홍보 | ✅ 완료 |

### Phase B: 오픈 직후

| 작업 | 설명 | 상태 |
|------|------|:----:|
| FAQ 페이지 | 자주 묻는 질문 | ⬜ |
| 데모 콘텐츠 | 영상/스크린샷 | ⬜ |
| 이메일 템플릿 | Welcome, Invoice 이메일 | ⬜ |

### Phase C: 고객 피드백 후

| 작업 | 트리거 |
|------|--------|
| 셀프 회원가입 | 문의량 급증 시 |
| Stripe/PayPal 연동 | 해외 고객 요청 시 |
| 세금계산서 | 특정 국가 요구 시 |

---

### ✅ 버그 수정 완료 (2026-02-05 확인)

| # | 위치 | 문제 | 상태 |
|:-:|------|------|:----:|
| 1 | Reports 페이지 | CSV 다운로드 - `csvDownload.ts` 유틸로 Safari 호환 + 메모리 누수 방지 | ✅ 완료 |
| 2 | Invoice 페이지 | PDF 다운로드 - `jsPDF` + `html2canvas`로 안정적 렌더링 | ✅ 완료 |

---

## 📋 재료/재고/발주 시스템 (v3.0) - 오픈 후 진행

### 개발 Phase (8단계)

| Phase | 내용 | 상태 |
|-------|------|:----:|
| **Phase 1** | 기반 정비 (Track Stock 토글 등) | ✅ 완료 |
| **Phase 2** | DB 테이블 생성 (10개 테이블) | ⬜ 진행예정 |
| **Phase 3** | Supplier 시스템 | ⬜ |
| **Phase 4** | 거래 관계 | ⬜ |
| **Phase 5** | Supplier Product → Ingredient 연동 | ⬜ |
| **Phase 6** | 발주 시스템 | ⬜ |
| **Phase 7** | 청구/결제 시스템 | ⬜ |
| **Phase 8** | SOA 월정산 | ⬜ |

> **상세 기획:** 이 문서 하단의 "📋 개발 예정: 재료/재고/발주 시스템 (v3.0)" 섹션 참조

---

## ✅ 완료: 주방 티켓 개별 출력 + 배포 스크립트 개선 (2026-01-30)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| 주방 티켓 개별 출력 | Settings에 "Print separate ticket for each item" 토글 추가 | ✅ 완료 |
| 배포 스크립트 v3.0 | sudo 비밀번호 제거, 88초로 단축, --auto 플래그 | ✅ 완료 |
| 레시피/상품 이미지 URL | yield_amount, yield_unit, image_thumbnail 컬럼 추가 | ✅ 완료 |
| 운영서버 배포 | 커밋 6b0a156 배포 완료 | ✅ 완료 |

### 주방 티켓 개별 출력 상세

- Settings > Printer Settings에 토글 추가
- RawBT(Android): 아이템별 500ms 간격 개별 출력
- 브라우저 인쇄: 멀티페이지 HTML, page-break-after 적용

**수정된 파일:**
- `dev-frontend/src/pages/Settings/SettingsPage.tsx`
- `dev-frontend/src/utils/billPrint.js`

### 배포 스크립트 v3.0 상세

- **문제:** sudo 비밀번호 필요, 배포 10분+ 소요
- **해결:**
  - nginx 명령만 NOPASSWD로 sudoers 설정
  - 불필요한 단계 제거, 병렬 처리
  - --auto 플래그로 CI/CD 자동화 지원
- **결과:** 배포 시간 88초로 단축

**수정된 파일:**
- `deploy-production-v3.sh`
- `/etc/sudoers.d/deploy-permissions`

---

## ✅ 완료: 서버 안정화 및 배포 (2026-01-28 저녁)

### 완료된 작업

| 작업 | 설명 | 상태 |
|------|------|:----:|
| PM2 메모리 설정 수정 | Heap OOM 크래시 방지 (384MB → 768MB) | ✅ 완료 |
| 운영 DB 스키마 동기화 | general_stock.owner_id, general_stock_categories.owner_id 추가 | ✅ 완료 |
| /저장 명령어 생성 | 세션 상태 저장 명령어 추가 | ✅ 완료 |
| 운영서버 배포 완료 | 30b405f 커밋 배포 | ✅ 완료 |

### PM2 설정 변경 (ecosystem.config.js)

| 항목 | 이전 | 변경 후 |
|------|------|---------|
| node_args | --max-old-space-size=384 | --max-old-space-size=768 |
| max_memory_restart | 512M | 800M |

**원인:** production-backend가 538MB 힙 메모리 사용 중 OOM 크래시 발생

---

## 📋 현재 개발: 재료/재고/발주 시스템 (v3.0)

### 개발 Phase (8단계)

| Phase | 내용 | 상태 |
|-------|------|:----:|
| **Phase 1** | 기반 정비 (Track Stock 토글 등) | ✅ 완료 |
| **Phase 2** | DB 테이블 생성 (11개 테이블) | ⬜ 진행예정 |
| **Phase 3** | Supplier 시스템 | ⬜ |
| **Phase 4** | 거래 관계 | ⬜ |
| **Phase 5** | Supplier Product → Ingredient 연동 | ⬜ |
| **Phase 6** | 발주 시스템 | ⬜ |
| **Phase 7** | 청구/결제 시스템 | ⬜ |
| **Phase 8** | SOA 월정산 | ⬜ |

> **상세 기획:** 이 문서 하단의 "📋 개발 예정: 재료/재고/발주 시스템 (v3.0)" 섹션 참조

---

### Phase 1 완료 (2026-01-28)

| 작업 | 설명 | 상태 |
|------|------|:----:|
| Track Stock 토글 복원 | 재료 카드에 Track in Inventory 토글 추가 | ✅ 완료 |
| Recipes 메뉴 접근 버그 | Brand Manager가 Recipes 메뉴 클릭 불가 수정 | ✅ 완료 |
| 토글 ON/OFF 버그 수정 | 토글이 꺼지지 않던 문제 수정 (관계 객체 제외) | ✅ 완료 |

**수정된 파일:**
- `pages/RecipeManagement/IngredientsTab.tsx` - Track Stock 토글 UI, handleTrackStockToggle 함수
- `pages/BrandProductRecipe/ProductIngredientsTab.tsx` - Track Stock 토글 UI, 관계 객체 제외 수정
- `App.tsx` - Recipes 메뉴 requiredRole에 'Brand Manager' 추가

---

## ✅ 완료: Invoice 시스템 개선 (2026-01-27 오후)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Additional Charges 연동 | Payment Settings 추가비용이 Create Invoice에 반영 | ✅ 완료 |
| 시스템관리자 Draft 저장 | Create Invoice 시 Draft로 먼저 저장 | ✅ 완료 |
| Period 자동 입력 제거 | 개별 발행 시 billing_period null | ✅ 완료 |
| 리스트 정렬 개선 | Due Date → Issue Date 최신순 정렬 | ✅ 완료 |
| Overdue 표시 | due_date 기반 동적 계산으로 빨간색 표시 | ✅ 완료 |

### 핵심 구현 사항

1. **Additional Charges 연동**
   - BrandInvoicesPage에서 payment_settings.additionalCharges 로드
   - Create/Edit Invoice 금액 계산 시 설정된 추가비용 적용
   - Summary에서 각 항목별 (이름, 비율%) 동적 표시

2. **시스템관리자 Invoice 워크플로우**
   - Create Invoice → status: 'draft' (기존 pending_payment)
   - Send 아이콘 클릭 → pending_payment로 변경

3. **Overdue 동적 계산**
   - `isInvoiceOverdue()`: due_date < 오늘 && status가 paid/cancelled/draft 아님
   - `getEffectiveStatus()`: overdue 상태 반환
   - StatusBadge에서 빨간색(overdue) 표시

### 관련 파일

**Frontend:**
- `pages/Admin/InvoicesPage.tsx` - Draft 저장, Overdue 계산, 정렬 개선
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Additional Charges 연동, Overdue 계산
- `pages/Restaurant/InvoicesPage.tsx` - Overdue 계산 추가

---

## ✅ 완료: 결제설정 추가비용, 메뉴 관리, 재료/레시피 개선 (2026-01-27)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Additional Charges 설정 | 결제설정에 추가비용 항목 3개 (Tax, Service Charge 등) | ✅ 완료 |
| 메뉴 복사 기능 | 기존 메뉴 복제하여 새 메뉴 생성 | ✅ 완료 |
| 메뉴 비활성화 기능 | 삭제 없이 메뉴 숨김 처리 | ✅ 완료 |
| 재료 모달 Track Stock 제거 | Add/Edit 모달에서 불필요한 체크박스 제거 | ✅ 완료 |
| 레시피 소수점 2자리 표시 | 재료 수량 표시를 2자리로 제한 (0.5000 → 0.50) | ✅ 완료 |
| Invoice 페이지 버그 수정 | StatCard color prop, currency 필드 수정 | ✅ 완료 |

### 핵심 구현 사항

1. **Additional Charges (결제설정 추가비용)**
   - Invoice 모델에 additional_charges JSON 필드 추가
   - PaymentSettingsPage (Admin, Brand)에 추가비용 UI 추가
   - 최대 3개 항목 설정 가능 (enabled, name, rate)

2. **메뉴 복사/비활성화 기능**
   - Product 모델에 is_active 필드 추가
   - `/product/:id/copy` API 추가 (메뉴 복제)
   - `/product/:id/toggle-active` API 추가 (활성화 토글)
   - MenuManagementPage에 아이콘 버튼 (복사, 비활성화, 품절, 삭제)

3. **재료/레시피 개선**
   - IngredientsTab.tsx: 모달에서 Track in Inventory 체크박스 제거
   - ProductIngredientsTab.tsx: 동일하게 체크박스 제거
   - RecipesTab.tsx: 재료 수량 .toFixed(2)로 2자리 표시

### 관련 파일

**Backend:**
- `models/Invoice.js` - additional_charges 필드
- `models/Product.js` - is_active 필드
- `routes/menu.js` - copy, toggle-active API
- `routes/admin-payment-settings.js` - additionalCharges 처리

**Frontend:**
- `pages/Admin/PaymentSettingsPage.tsx` - 추가비용 UI
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - 추가비용 UI
- `pages/MenuManagement/MenuManagementPage.tsx` - 아이콘 버튼, 비활성화 상태
- `pages/RecipeManagement/IngredientsTab.tsx` - 체크박스 제거
- `pages/BrandProductRecipe/ProductIngredientsTab.tsx` - 체크박스 제거
- `pages/RecipeManagement/RecipesTab.tsx` - 소수점 2자리

---

## ✅ 완료: Live Orders 성능 최적화 및 버그 수정 (2026-01-26)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Orders Counts API | 탭 카운트 전용 API 추가 (10,000개 fetch 제거) | ✅ 완료 |
| 서버사이드 필터링 | 날짜/검색 필터를 백엔드에서 처리 | ✅ 완료 |
| 빌프린트 테이블번호 | Table > Pager > Pickup 우선순위 적용 | ✅ 완료 |

### 핵심 구현 사항

1. **Orders Counts API (`/api/orders/restaurant/:id/counts`)**
   - SQL 집계로 상태별 카운트만 반환
   - 날짜 범위 파라미터 지원 (startDate, endDate)
   - 전체 주문 fetch 없이 빠른 탭 카운트 제공

2. **서버사이드 필터링**
   - 기존 orders API에 startDate, endDate, search 파라미터 추가
   - 클라이언트에서 10,000개 필터링 → 서버에서 100개 필터링

3. **프론트엔드 최적화 (LiveOrdersPage.tsx)**
   - `allOrders` 상태 제거, `orderCounts` 상태로 변경
   - `fetchOrderCounts` 함수로 카운트만 가져옴
   - 소켓 이벤트에서 카운트 최적화 업데이트

4. **빌프린트 테이블번호 수정**
   - POSTerminalPage.tsx: `setCompletedOrderData`에 tableNumber 추가
   - LiveOrdersPage.tsx: `handlePrintBill`에 tableNumber, pagerNumber 추가

### 관련 파일

**Backend:**
- `routes/orders.js` - counts API 추가, 날짜/검색 필터 추가

**Frontend:**
- `pages/LiveOrders/LiveOrdersPage.tsx` - 성능 최적화
- `pages/POSTerminal/POSTerminalPage.tsx` - tableNumber 추가
- `components/POSTerminal/OrderCompleteModal.tsx` - tableNumber 인터페이스 추가

---

## ✅ 완료: Restaurant Admin Invoice 페이지 개선 (2026-01-25)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Restaurant Invoice 페이지 생성 | Brand General의 To Pay 탭 기반으로 신규 생성 | ✅ 완료 |
| 탭 UI 구현 | All Invoices / Invoices to Pay 탭 | ✅ 완료 |
| Issuer 정보 표시 | 인보이스 발행자 정보 (issuerInfo) 표시 | ✅ 완료 |
| 결제 제출 기능 | Payment Submit 모달 및 API 연동 | ✅ 완료 |
| Company Info API 추가 | /api/restaurants/:id/company-info 엔드포인트 추가 | ✅ 완료 |
| Restaurant Admin 권한 수정 | to-pay, payment permission 버그 수정 | ✅ 완료 |

### 핵심 구현 사항

1. **Restaurant Invoice 페이지 (InvoicesPage.tsx)**
   - All Invoices: 모든 인보이스 표시 (draft 포함)
   - Invoices to Pay: 결제 대기 인보이스 (draft 제외)
   - View, Pay, PDF Download, Print 기능
   - Issuer 정보 및 Payer 정보 표시

2. **Backend API 수정**
   - `/api/invoices/to-pay`: Restaurant Admin용 restaurant_id 조건 수정
   - `checkPaymentPermission()`: Restaurant Admin 권한 체크 수정
   - `/api/restaurants/:id/company-info`: 신규 엔드포인트

3. **버그 수정**
   - Restaurant Admin이 to-pay 인보이스 조회 불가 → restaurant_id로 수정
   - All Invoices 탭 데이터 미표시 → user.restaurant_id fallback 추가

### 관련 파일

**Backend:**
- `routes/invoices.js` - to-pay API, payment permission 수정
- `routes/restaurants.js` - company-info API 추가

**Frontend:**
- `pages/Restaurant/InvoicesPage.tsx` - 신규 페이지 생성

---

## ✅ 완료: 배포 시스템 및 문서 정리 (2026-01-25)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| deploy-production.sh 개선 | .env 백업 타이밍 수정, 중복 단계 제거 (481줄→257줄) | ✅ 완료 |
| 배포.md 정리 | 잘못된 정보 수정, 불필요한 섹션 제거 (247줄→211줄) | ✅ 완료 |
| 개발시작.md 정리 | 중복 내용 제거, 문서 참조 방식으로 변경 (227줄→144줄) | ✅ 완료 |
| 개발완료.md 개선 | 시스템 문서 업데이트 테이블 추가 | ✅ 완료 |
| DEPLOYMENT.md 업데이트 | 현재 스크립트와 일치하도록 수정 | ✅ 완료 |

### 핵심 변경 사항

1. **deploy-production.sh 개선**
   - .env 백업을 rsync 전에 수행 (손상 방지)
   - 중복 DB 스키마 비교 단계 제거
   - health check 검증 추가

2. **문서 관리 체계 정립**
   - 개발시작.md: 실행 지시만 포함, 내용은 원본 문서 참조
   - 개발완료.md: 변경 영역에 따라 관련 문서 업데이트하도록 명시
   - DEPLOYMENT.md: 실제 스크립트와 일치하도록 수정

### 관련 파일

- `deploy-production.sh` - 배포 스크립트 개선
- `DEPLOYMENT.md` - 배포 가이드 업데이트
- `.claude/commands/개발시작.md` - 개발 시작 가이드 정리
- `.claude/commands/개발완료.md` - 문서 업데이트 프로세스 추가
- `.claude/commands/배포.md` - 배포 명령어 정리

---

## ✅ 완료: Printer Settings DB 저장 (2026-01-24)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| printer_settings DB 컬럼 추가 | restaurants 테이블에 프린터 설정 저장 | ✅ 완료 |
| Backend API 수정 | PUT /api/restaurants/:id에서 printer_settings 저장 | ✅ 완료 |
| Frontend Settings 연동 | DB에서 로드, DB에 저장 + localStorage 동기화 | ✅ 완료 |

### 핵심 구현 사항

1. **printer_settings 컬럼 추가**
   - `printerMode`: 'rawbt' | 'browser'
   - `billPrinter`: { enabled, name, autoPrint }
   - `kitchenPrinter`: { enabled, name, autoPrint }

2. **Settings 페이지 수정**
   - 페이지 로드 시 DB에서 printer_settings 조회
   - 저장 시 DB에 저장 + localStorage 동기화 (billPrint.js 호환)
   - 어떤 기기/브라우저에서 접속해도 동일한 설정 사용

### 관련 파일

**Backend:**
- `models/Restaurant.js` - printer_settings 컬럼 추가
- `routes/restaurants.js` - PUT API에서 printer_settings 처리

**Frontend:**
- `pages/Settings/SettingsPage.tsx` - DB 로드/저장 로직

---

## ✅ 완료: Invoice System UI/UX 개선 (2026-01-23)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Send Invoice 버튼 스타일 | Draft 상태에서 녹색 아이콘 버튼으로 변경 | ✅ 완료 |
| Confirm 버튼 스타일 | Send Invoice 모달 확인 버튼 녹색으로 변경 | ✅ 완료 |
| 수신인 정보 수정 | Unknown Manager → 올바른 payer 이름 표시 | ✅ 완료 |
| 자동 인보이스 수정 제한 | automatic 타입 인보이스 Edit 버튼 숨김 | ✅ 완료 |
| 상태별 수정 제한 | paid, payment_submitted, cancelled 상태 수정 불가 | ✅ 완료 |
| 인보이스 번호 형식 수정 | 발행자별 올바른 번호 형식 적용 | ✅ 완료 |
| category_display_name 추가 | 구독 플랜 이름 표시 (Subscription - Professional) | ✅ 완료 |

### 핵심 구현 사항

1. **Send Invoice 버튼 녹색 스타일**
   - LocalActionButton에 `success` variant 추가 (#10B981 녹색)
   - Draft 상태에서 Send Invoice 버튼에 녹색 적용
   - Brand General: 아이콘만 표시 (텍스트 제거)

2. **수신인 정보 올바르게 표시**
   - Backend: payer_type에 따라 올바른 payer 이름 조회
   - Frontend: managerName || customerName 폴백 처리
   - Send Invoice 모달에서 "Manager" → "Recipient" 표기 변경

3. **인보이스 수정 제한 로직**
   - Backend: PUT /api/invoices/:id에서 type, status 검증
   - Frontend: Edit 버튼을 조건부 렌더링
   - System Admin, Brand General 양쪽 적용

### 관련 파일

**Backend:**
- `routes/invoices.js` - payer 이름 조회 로직 수정, 수정 제한 검증
- `models/Invoice.js` - category_display_name 필드 추가

**Frontend:**
- `pages/Admin/InvoicesPage.tsx` - Send Invoice 버튼/모달 스타일, Edit 제한
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Send Invoice 버튼/모달 스타일, Edit 제한

---

## ✅ 완료: Invoice System 버그 수정 및 개선 (2026-01-21)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| JWT 토큰 개선 | brand_id, foodcourt_id 등 JWT 및 req.user에 추가 | ✅ 완료 |
| Express Router 순서 수정 | /to-pay 라우트가 /:id 앞에 오도록 수정 | ✅ 완료 |
| Invoice 발행자 정보 저장 | issuer_type, issuer_id가 인보이스에 저장 | ✅ 완료 |
| Draft 인보이스 제외 | Invoices to Pay에서 draft 상태 제외 | ✅ 완료 |
| Payment Submit Modal 개선 | 시스템 관리자 결제 방법(QR/Bank) 표시 | ✅ 완료 |
| Currency Settings 버그 수정 | API 응답 구조 파싱 수정 | ✅ 완료 |
| to_pay 본인 발행 제외 | Invoices to Pay에서 본인이 발행한 인보이스 제외 | ✅ 완료 |
| 영수증 이미지 업로드 | Bank Transfer/QR 결제 시 영수증 이미지 첨부 | ✅ 완료 |
| Admin 결제 컨펌 팝업 | 시스템관리자 결제 확인 시 고객 결제정보 표시 | ✅ 완료 |
| 인보이스 통화 자동설정 | 수신인의 defaultCurrency 실시간 반영 | ✅ 완료 |
| Payment Settings 통화제한 | Brand 통화선택 시 시스템 지원 통화만 표시 | ✅ 완료 |
| Company Info 저장 수정 | Express 라우트 순서 수정 (/company-info 우선) | ✅ 완료 |
| 결제권한 체크 수정 | brand_manager, foodcourt_manager payer_type 처리 | ✅ 완료 |

### 핵심 구현 사항

1. **JWT 토큰에 역할별 ID 포함**
   - `brand_id`, `foodcourt_id`, `restaurant_id`, `manager_id`를 JWT 토큰에 포함
   - `authenticateToken` 미들웨어에서 `req.user`에 동일 필드 설정

2. **Invoice 발행자 정보**
   - Brand General이 인보이스 생성 시 `issuer_type: 'brand'`, `issuer_id: brandId` 저장
   - "Issued Invoices" 탭에서 해당 브랜드가 발행한 인보이스만 표시

3. **Payment Submit Modal 개선**
   - `/api/admin/payment-settings/available/:currency` API 활용
   - Bank Transfer: 은행명, 계좌번호, 예금주 표시
   - QR Payment: QR 이미지 및 설명 표시

### 관련 파일

**Backend:**
- `services/authService.js` - JWT 토큰에 역할별 ID 추가
- `middleware/auth.js` - req.user에 brand_id, foodcourt_id 등 추가
- `routes/invoices.js` - /to-pay 라우터 순서 수정, draft 제외

**Frontend:**
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - Payment Submit Modal 개선, issuer 정보 저장
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - API 응답 파싱 수정

---

## ✅ 완료: Billing System Integration (2026-01-19)

> **상세 기획서:** [docs/BILLING_SYSTEM_INTEGRATION_PLAN.md](/docs/BILLING_SYSTEM_INTEGRATION_PLAN.md)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Invoice Page 역할별 | Brand/Foodcourt General/Manager용 Invoice 페이지 | ✅ 완료 |
| Payment Model 3가지 | restaurant, brand_manager, foodcourt_manager | ✅ 완료 |
| to-pay API 수정 | 역할별 결제해야 할 인보이스 조회 | ✅ 완료 |
| Invoice 발행/결제 분리 | Issued Invoices / Invoices to Pay 탭 분리 | ✅ 완료 |
| Plans Page 역할별 | Brand/Foodcourt용 Custom Subscription 전용 | ✅ 완료 |
| Payment Settings 역할별 | Brand/Foodcourt용 다중 통화 결제설정 | ✅ 완료 |
| Profile 페이지 버그 수정 | dbUser null일 때 authUser 폴백 처리 | ✅ 완료 |

### 핵심 구현 사항

1. **Payment Model 3가지 타입**
   - `restaurant` - Restaurant Admin이 결제
   - `brand_manager` - Brand General/Manager가 결제
   - `foodcourt_manager` - Foodcourt General/Manager가 결제

2. **역할별 Invoice 페이지**
   - Brand/Foodcourt General/Manager: 2개 탭 (Issued Invoices + Invoices to Pay)
   - Issued Invoices: 발행한 인보이스 (Create, Edit, Send)
   - Invoices to Pay: 결제해야 할 인보이스 (View, Pay)

3. **Backend /to-pay API**
   - Brand: 직접 발행 인보이스 + brand_manager 레스토랑 인보이스 + 매니저로 직접 발행된 인보이스
   - Foodcourt: 직접 발행 인보이스 + foodcourt_manager 레스토랑 인보이스 + 매니저로 직접 발행된 인보이스

### 관련 파일

**Backend:**
- `routes/invoices.js` - /to-pay API 역할별 로직 추가

**Frontend:**
- `pages/Admin/RestaurantsPage.tsx` - Payment Model 3가지 옵션
- `pages/BrandGeneral/BrandInvoicesPage.tsx` - 브랜드 인보이스 (Issued + To Pay)
- `pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` - 푸드코트 인보이스
- `pages/BrandGeneral/BrandPlansPage.tsx` - 브랜드 플랜 (Custom only)
- `pages/FoodcourtGeneral/FoodcourtPlansPage.tsx` - 푸드코트 플랜
- `pages/BrandGeneral/BrandPaymentSettingsPage.tsx` - 브랜드 결제설정
- `pages/FoodcourtGeneral/FoodcourtPaymentSettingsPage.tsx` - 푸드코트 결제설정
- `pages/Profile/ProfilePage.tsx` - dbUser null 폴백 처리

---

## ✅ 완료: Payment Settings UI (2026-01-16)

> **상세 기획서:** [docs/PAYMENT_SYSTEM_PLAN.md](/docs/PAYMENT_SYSTEM_PLAN.md)

### 완료된 기능

| 기능 | 설명 | 상태 |
|------|------|:----:|
| Payment Settings Page | System Admin 결제 설정 UI | ✅ 완료 |
| Currency Settings | 통화 설정 (Payment Settings 내) | ✅ 완료 |
| Online Payment Settings | Stripe/PayPal 전역 설정 | ✅ 완료 |
| Manual Payment Settings | Bank Transfer/QR 통화별 설정 | ✅ 완료 |
| Backend API | 결제 설정 CRUD API | ✅ 완료 |
| Role-based Documentation | 역할별 결제 시스템 문서화 | ✅ 완료 |

### 핵심 구현 사항

1. **결제 설정 구조**
   - Stripe/PayPal: 전역 설정 (한 번만 설정, 다중 통화 자동 지원)
   - Bank Transfer/QR: 통화별 설정 (각 통화마다 다른 계좌/QR)

2. **역할별 통화 설정**
   - System Admin, Brand General/Manager, Foodcourt General/Manager: 다중 통화
   - Restaurant Admin: 단일 통화 (기존 구조 유지)

3. **Invoice 통화 규칙**
   - Invoice 통화 = 수신자의 Default Currency

### 관련 파일

**Backend:**
- `routes/admin-payment-settings.js` - Payment Settings API
- `app.js` - Router 등록 (System Admin 전용)

**Frontend:**
- `pages/Admin/PaymentSettingsPage.tsx` - Payment Settings UI

**Documentation:**
- `docs/PAYMENT_SYSTEM_PLAN.md` - 결제 시스템 통합 기획서

---

## ✅ 완료: Phase 3.5 주문 관리 개선 (2026-01-15)

> **상세 기획서:** [docs/ORDER_MANAGEMENT_IMPROVEMENTS.md](/docs/ORDER_MANAGEMENT_IMPROVEMENTS.md)

### 완료된 기능

| 기능 | 설명 | API 테스트 |
|------|------|:----:|
| Auto-merge | 같은 테이블/조건 주문 자동 통합 | ✅ 통과 |
| Manual Merge | 선택한 주문들 수동 병합 | ✅ 통과 |
| Add Items | 기존 주문에 메뉴 추가 + 키친티켓 | ✅ 통과 |
| Coupon Model/API | 쿠폰 CRUD + 검증 API | ✅ 통과 |
| Coupon Frontend UI | POS Terminal + Mobile Order 쿠폰 적용 | ✅ 통과 |
| Printer Settings UI | 빌/키친 프린터 분리 설정 | ✅ UI 완료 |
| total_amount 재계산 | 아이템 추가/병합 시 자동 계산 | ✅ 통과 |

### 버그 수정 (2026-01-15)

| 이슈 | 원인 | 해결 |
|------|------|------|
| URL /promotions → /coupons | 메뉴명 변경 후 URL 미수정 | App.tsx, MainLayout.tsx, DB addon_modules 수정 |
| 쿠폰 API 인증 오류 | Express 라우터 순서 문제 | server.js에서 coupons 라우터 최상단 배치 |
| 쿠폰 할인액 미반영 | 응답 파싱 오류 (result.data.discountAmount) | POSTerminalPage.tsx, PaymentPage.tsx 수정 |

### API 테스트 결과 (2026-01-15)

#### 1. Coupon API
```bash
# Create: POST /api/coupons
{"success":true,"data":{"id":2,"code":"SAVE10","type":"percentage","value":10}}

# Validate: POST /api/coupons/validate
{"success":true,"valid":true,"data":{"discountAmount":10,"finalTotal":90}}
```

#### 2. Auto-merge (같은 테이블 주문 자동 병합)
```bash
# 두 번째 주문 생성 시 자동 병합
POST /api/orders (table_number: "A99")
{"success":true,"merged":true,"mergeInfo":{"orderGroup":2}}
```

#### 3. Add Items API
```bash
POST /api/orders/801/merge-items
{"success":true,"addedItems":[...],"orderGroup":3,"newTotal":90}
```

#### 4. Manual Merge API
```bash
POST /api/orders/merge {"orderIds":[802,803],"targetOrderId":802}
{"success":true,"deletedOrderIds":[803],"message":"Successfully merged 2 orders"}
```

### 핵심 구현 사항

1. **Auto-merge 조건**: same restaurant + same table + same order_type + payment pending + not served/completed/cancelled
2. **order_group**: 아이템 추가 시마다 증가 (원본=0, 첫 추가=1, ...)
3. **added_at**: 추가된 아이템에 타임스탬프 기록
4. **merged_from/merged_at**: 병합된 아이템에 원본 주문 정보 기록
5. **skipAutoMerge**: true로 설정하면 자동 병합 건너뜀

### 관련 파일

**Backend:**
- `routes/orders.js` - Auto-merge, Manual Merge, Add Items API
- `routes/coupons.js` - Coupon CRUD + Validate API
- `models/Coupon.js` - Coupon 모델

**Frontend:**
- `pages/Settings/SettingsPage.tsx` - Printer Settings UI
- `pages/LiveOrders/LiveOrdersPage.tsx` - Add Items 모달

---

## ✅ 완료: Live Orders Add Items 모달 개선 (2026-01-14)

### 변경 사항

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | POS Terminal OptionModal 컴포넌트 재사용 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | optionGroups 문자열→배열 파싱 버그 수정 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | 아이템 클릭 시 바로 추가, Options 버튼 시 옵션 모달 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | Cancel/Add to Order 버튼 동작 개선 (전체 모달 닫힘) | `pages/LiveOrders/LiveOrdersPage.tsx` |

### 수정 내용

1. **OptionModal 컴포넌트 재사용**
   - POS Terminal의 `OptionModal` 컴포넌트를 Live Orders에서도 사용
   - MenuContext의 optionGroups를 활용하여 옵션 데이터 조회

2. **optionGroups 파싱 버그 수정**
   - DB에서 `optionGroups`가 문자열 `"[]"`로 저장됨
   - `fetchMenuForAddItems`에서 JSON.parse 처리 추가
   - `Array.isArray()` 체크가 실패하던 문제 해결

3. **UI 동작 개선**
   - 아이템 클릭: 바로 장바구니에 추가 (옵션 없이)
   - Options 버튼: 옵션 선택 모달 표시
   - Cancel 버튼: 전체 모달 닫힘 (order detail로 돌아가지 않음)
   - Add to Order 버튼: 주문에 추가 후 전체 모달 닫힘

### 테스트 필요 항목

- [ ] 옵션 있는 메뉴 추가 테스트
- [ ] 옵션 없는 메뉴 추가 테스트
- [ ] 장바구니 수량 조절 테스트
- [ ] Add to Order 후 팝업 닫힘 확인

---

## ✅ 완료: 멤버십/포인트 시스템 구조 개선 (2026-01-13)

### 구조 변경
- **멤버십**: 항상 활성화 (로그인, 티어, 티어별 할인)
- **포인트 시스템**: `is_active` 필드로 ON/OFF 제어

### 완료된 작업

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | Settings 페이지 "Points System" 토글 위치 개선 (Points Settings 카드 내부로 이동) | `pages/Settings/SettingsPage.tsx` |
| ✅ | Mobile AccountPage 포인트 조건부 표시 (pointsEnabled) | `mobile/pages/AccountPage.tsx` |
| ✅ | PaymentModal 내부 데이터 fetch 로직 개선 (customerId/restaurantId 기반) | `components/POSTerminal/PaymentModal.tsx` |
| ✅ | LiveOrders PaymentModal 포인트 연동 | `pages/LiveOrders/LiveOrdersPage.tsx` |
| ✅ | POS Terminal 포인트 적립/사용 완료 | `pages/POSTerminal/POSTerminalPage.tsx` |
| ✅ | OrderCompleteModal 포인트 할인 표시 | `components/POSTerminal/OrderCompleteModal.tsx` |
| ✅ | billPrint 포인트 할인 출력 | `utils/billPrint.js` |
| ✅ | API 레벨 검증 - 포인트 비활성화 시 적립/사용 차단 확인 | `services/pointService.js` |

### 포인트 시스템 체크 위치

| 컴포넌트 | is_active 체크 |
|----------|---------------|
| PaymentModal | `membershipSettings?.is_active` |
| Mobile PaymentPage | `membershipSettings?.is_active` |
| Mobile AccountPage | `pointsEnabled` (is_active 기반) |
| Backend pointService | `settings.is_active` (적립/사용 차단) |

---

## ✅ 완료: UI 개선 및 코드 정리 (2026-01-12)

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | POS 할인 입력 통화 기호 동적 표시 | `pages/POSTerminal/POSTerminalPage.tsx` |
| ✅ | Loyalty Tier Settings UI 제거 (미사용 기능 정리) | `pages/Settings/SettingsPage.tsx` |

---

## ✅ 완료: 레시피/재료/재고관리 구조 통합 (2026-01-12)

### 핵심 구조 차이

| 구분 | 레스토랑 관리자 | 브랜드제너럴/매니저 |
|-----|---------------|-------------------|
| **재료 관리** | Ingredients (RecipeManagement) | ProductIngredients (BrandProductRecipe) |
| **레시피 관리** | Recipes (RecipesPage) | ProductRecipes (ProductRecipesTab) |
| **재고 관리** | InventoryManager mode='restaurant' | InventoryManager mode='brand' |
| **재고 추적** | 모든 재료 자동 추적 | track_stock 토글로 선택 |
| **재고 차감** | 주문 완료 시 자동 (deductInventoryForOrder) | 수동 조정만 (향후 PO 연동) |

### 구조도

```
[레스토랑 관리자] ─────────────────────────────────────────────────────

  /pos/recipes?tab=ingredients     /pos/recipes?tab=recipes     /pos/inventory
  ┌──────────────────────┐        ┌──────────────────────┐     ┌──────────────────┐
  │   IngredientsTab     │───────►│    RecipesPage       │     │  InventoryPage   │
  │  (재료 CRUD)          │        │  (레시피 CRUD)        │     │ (InventoryManager│
  │  - 토글 없음 (전체추적) │        │  - View/Edit/Delete  │     │   mode=restaurant)│
  └──────────────────────┘        └──────────────────────┘     └──────────────────┘
           │                                │                          │
           └───────── 재료 선택 ─────────────┘                          │
                                            │                          │
                                     Recipe 연결된 Product              │
                                            │                          │
                                     주문 완료 ─────────────────────────┘
                                            │
                                     자동 재고 차감 (deductInventoryForOrder)

[브랜드제너럴/매니저] ────────────────────────────────────────────────────

  /pos/brand-product-recipes?tab=ingredients    ?tab=recipes      /pos/brand-inventory
  ┌──────────────────────┐        ┌──────────────────────┐     ┌──────────────────┐
  │ ProductIngredientsTab│───────►│  ProductRecipesTab   │     │BrandInventoryPage│
  │  (재료 CRUD)          │        │  (레시피 CRUD)        │     │ (InventoryManager│
  │  - track_stock 토글   │        │  - View/Edit/Delete  │     │   mode=brand)    │
  └──────────────────────┘        └──────────────────────┘     └──────────────────┘
           │                                                           │
     track_stock=true ─────────────────────────────────────────────────┘
           │
     재고관리 대상으로 표시 (/api/product-ingredients?track_stock=true)
```

### 완료된 작업

| 상태 | 항목 | 파일 |
|:---:|------|------|
| ✅ | InventoryManager 브랜드 모드 | `components/Inventory/InventoryManager.tsx` |
| ✅ | BrandInventoryPage 통합 | `pages/BrandInventory/BrandInventoryPage.tsx` |
| ✅ | ProductIngredientsTab track_stock 토글 추가 | `pages/BrandProductRecipe/ProductIngredientsTab.tsx` |
| ✅ | IngredientsTab track_stock 토글 제거 | `pages/RecipeManagement/IngredientsTab.tsx` |
| ✅ | ProductRecipesTab UI 통일 (View 버튼, 시간정보) | `pages/BrandProductRecipe/ProductRecipesTab.tsx` |
| ✅ | **InventoryPage 중복 제거** (~2900줄→22줄) | `pages/Inventory/InventoryPage.tsx` |
| ✅ | **RecipesPage ActionButton 스타일 통일** | `pages/Recipes/RecipesPage.tsx` |
| ✅ | **개발시작 가이드 컴포넌트 통일 규칙 추가** | `.claude/commands/개발시작.md` |

### API 매핑

| 기능 | 레스토랑 | 브랜드 |
|------|---------|--------|
| 재료 조회 | `/api/restaurants/:id/ingredients` | `/api/product-ingredients` |
| 재료 수정 | `PUT /api/restaurants/:id/ingredients/:id` | `PUT /api/product-ingredients/:id` |
| 레시피 조회 | `/api/restaurants/:id/recipes` | `/api/product-recipes` |
| 재고 조회 | `/api/restaurants/:id/inventory` | `/api/product-ingredients?track_stock=true` |
| 재고 조정 | `/api/restaurants/:id/inventory/adjust` | `PUT /api/product-ingredients/:id` |

### 향후 작업: Purchase Order 시스템

```
레스토랑 발주 요청 → 브랜드 승인/출고 → 브랜드 ProductIngredient 차감
                                   → 레스토랑 Ingredient 증가
```

---

## 다음 개발 작업: Phase 4 - Purchase Order System

**설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

**상태:** 설계 완료, 개발 대기 중

---

## 완료된 테스트

### 멤버십/포인트 시스템 (2026-01-12 코드 리뷰 완료)

**코드 리뷰 결과:**
- [x] Settings > Membership 탭 UI 구현 완료
- [x] 모바일 오더 포인트 사용 UI 구현 완료
- [x] POS 시스템 포인트 사용 UI 구현 완료
- [x] Backend API 전체 구현 완료 (membership.js, pointService.js)
- [x] DB 모델 구현 완료 (MembershipSettings, PointTransaction)
- [x] 주문 연동 구현 완료 (orders.js)
- [x] UI 디자인 가이드 준수 확인 및 수정 완료 (2026-01-12)
  - 성공 메시지 제거 (가이드 위반 수정)
  - 에러 메시지 이모지 제거

**관련 파일:**
- `/var/www/dev-frontend/src/pages/Settings/SettingsPage.tsx` (Membership 탭)
- `/var/www/dev-frontend/src/mobile/pages/PaymentPage.tsx` (모바일 포인트)
- `/var/www/dev-frontend/src/components/POSTerminal/PaymentModal.tsx` (POS 포인트)
- `/var/www/dev-backend/services/pointService.js` (포인트 비즈니스 로직)
- `/var/www/dev-backend/routes/membership.js` (멤버십 API)
- `/var/www/dev-backend/routes/orders.js` (주문 생성 시 포인트 처리)

---

## 📋 목차
1. [시스템 구조](#시스템-구조)
2. [완료된 작업](#완료된-작업)
3. [진행 중인 작업](#진행-중인-작업)
4. [예정된 작업](#예정된-작업)
5. [데이터베이스 스키마](#데이터베이스-스키마)
6. [주요 파일 목록](#주요-파일-목록)
7. [트러블슈팅 히스토리](#트러블슈팅-히스토리)

---

## 🏗️ 시스템 구조

### 사용자 계층 구조
```
시스템 관리자 (Admin)
├─ Restaurant Owners
│  ├─ 레스토랑 소유자
│  └─ 구독: Restaurant Plans (Basic/Professional/Enterprise)
│
├─ Foodcourt General (구독 관리)
│  ├─ Foodcourt Manager들 생성/관리
│  └─ 구독: Foodcourt Plans (Basic/Professional/Enterprise)
│
└─ Brand General (구독 관리)
   ├─ Brand Manager들 생성/관리
   └─ 구독: Brand Plans (Basic/Professional/Enterprise)
```

### 플랜 구조
```
Restaurant Plans (레스토랑 소유자용)
├─ Basic Plan (RM 29/month)
├─ Professional Plan (RM 59/month)
└─ Enterprise Plan (RM 99/month)

Brand Plans (브랜드 관리용)
├─ Brand Basic (RM 149/month)
├─ Brand Professional (RM 299/month)
└─ Brand Enterprise (RM 499/month)

Foodcourt Plans (푸드코트 관리용)
├─ Foodcourt Basic (RM 149/month)
├─ Foodcourt Professional (RM 299/month)
└─ Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 체계
```
Restaurant Modules (target_user_type: 'restaurant')
├─ Basic: POS Terminal, Menu Management, Customer Management, etc.
└─ Advanced: Mobile Ordering, Recipe Management, Advanced Inventory

Brand Modules (target_user_type: 'brand')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Brand Management, User Management, Subscription Management

Foodcourt Modules (target_user_type: 'foodcourt')
├─ Basic: Manager Dashboard, Operation Inquiry
└─ Advanced: Foodcourt Management, User Management, Subscription Management

Shared Modules (target_user_type: 'all')
└─ Restaurant Management (multi-restaurant management)
```

---

## ✅ 완료된 작업

### Phase 1: 데이터베이스 구조 개선 (2025-11-18 ~ 2025-11-19)

#### 1.1 Plan Template 모델 재구조화
**파일:** `/var/www/dev-backend/models/PlanTemplate.js`

**변경사항:**
- `plan_target` ENUM 추가: `'restaurant'`, `'brand'`, `'foodcourt'`
- Manager Plans를 Brand/Foodcourt Plans로 분리
- 기존 Manager Plans 삭제 후 재생성

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE plan_templates
MODIFY COLUMN plan_target ENUM('restaurant', 'brand', 'foodcourt');

-- 기존 Manager Plans 삭제
DELETE FROM plan_templates WHERE id IN (4, 5, 6);

-- Brand Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('brand_basic', 'Brand Basic', 149.00, 1490.00, ..., 'brand'),
('brand_professional', 'Brand Professional', 299.00, 2990.00, ..., 'brand'),
('brand_enterprise', 'Brand Enterprise', 499.00, 4990.00, ..., 'brand');

-- Foodcourt Plans 추가
INSERT INTO plan_templates (name, display_name, base_price_monthly, base_price_annual, ..., plan_target) VALUES
('foodcourt_basic', 'Foodcourt Basic', 149.00, 1490.00, ..., 'foodcourt'),
('foodcourt_professional', 'Foodcourt Professional', 299.00, 2990.00, ..., 'foodcourt'),
('foodcourt_enterprise', 'Foodcourt Enterprise', 499.00, 4990.00, ..., 'foodcourt');
```

#### 1.2 Addon Module 모델 재구조화
**파일:** `/var/www/dev-backend/models/AddonModule.js`

**변경사항:**
- `target_user_type` ENUM 변경: `'restaurant'`, `'brand'`, `'foodcourt'`, `'all'`
- 모듈 분류 재정의
- Restaurant 전용 모듈과 Manager 전용 모듈 명확히 분리

**SQL 실행:**
```sql
-- ENUM 변경
ALTER TABLE addon_modules
MODIFY COLUMN target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all');

-- Restaurant 전용 모듈 설정
UPDATE addon_modules
SET target_user_type = 'restaurant'
WHERE module_code IN ('mobile_ordering', 'recipe_management', 'advanced_inventory');

-- Brand/Foodcourt 공통 모듈 설정
UPDATE addon_modules
SET target_user_type = 'all'
WHERE module_code IN ('brand_management', 'foodcourt_management');

-- 카테고리 재분류
UPDATE addon_modules SET category = 'basic'
WHERE module_code IN ('manager_dashboard', 'operation_inquiry');
```

#### 1.3 모듈 설명 개선
**변경사항:**
- Brand Management 상세 설명 추가
- Foodcourt Management 상세 설명 추가

**SQL 실행:**
```sql
UPDATE addon_modules
SET description = 'Manage multiple restaurant brands, standardize menus across locations, control brand-wide pricing and promotions, enforce brand guidelines, track brand performance metrics'
WHERE module_code = 'brand_management';

UPDATE addon_modules
SET description = 'Manage foodcourt operations, coordinate multiple vendors and restaurants, shared payment processing, unified customer queue system, foodcourt-wide promotions and events'
WHERE module_code = 'foodcourt_management';
```

### Phase 2: Admin 페이지 UI 개선 (2025-11-19)

#### 2.1 Plans Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/PlansPage.tsx`

**완료 항목:**
1. ✅ Plan Target 드롭다운을 3개로 확장 (Restaurant/Brand/Foodcourt)
2. ✅ 모듈 선택 시 target_user_type 기반 필터링
3. ✅ 체크박스 UI 정렬 개선 (align-items: flex-start)
4. ✅ Plan Name 필드 단순화 (Display Name만 입력, 내부 이름 자동 생성)
5. ✅ Features 필드를 Modules 아래로 이동
6. ✅ 리스트 카드 순서 변경 (Limits → Modules → Features)
7. ✅ 섹션 여백 축소 (12px → 8px)
8. ✅ Edit Plan JSON 파싱 에러 수정

#### 2.2 Restaurants Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/RestaurantsPage.tsx`

**완료 항목:**
1. ✅ Restaurant Plans만 표시되도록 필터링
2. ✅ Add Restaurant 모달에 동적 플랜 로딩
3. ✅ Edit Restaurant 모달에 기존 플랜 데이터 유지
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

#### 2.3 Managers Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/ManagersPage.tsx`

**완료 항목:**
1. ✅ Manager Role을 General만 선택 가능하도록 제한 (Foodcourt General, Brand General)
2. ✅ 구독 설정 필드 추가 (Subscription Plan, Billing Cycle, Dates, Auto-renew)
3. ✅ Role 변경 시 플랜 자동 업데이트
4. ✅ Edit Manager 기능 추가 (Edit 버튼 ✎ 추가)
5. ✅ Edit Manager 모달에 구독 설정 필드 추가
6. ✅ 기본 Role을 Foodcourt General로 변경

**Manager 계층 구조:**
- 시스템 관리자는 **General만** 추가/관리
- General은 자신의 Manager들을 별도 페이지에서 관리 (향후 구현)

#### 2.4 Subscriptions Page 개선
**파일:** `/var/www/dev-frontend/src/pages/Admin/SubscriptionsPage.tsx`

**완료 항목:**
1. ✅ User Type 선택기 추가 (Restaurant/Brand Manager/Foodcourt Manager)
2. ✅ User Type별 플랜 동적 필터링
3. ✅ User Type 변경 시 검색 대상 자동 변경 (Restaurant ↔ Manager)
4. ✅ 첫 번째 사용 가능한 플랜을 기본값으로 설정

### Phase 3: 모달 UI/UX 개선 (2025-11-19)

#### 3.1 모든 페이지 모달 기본값 설정
**완료 항목:**
1. ✅ Plans API 응답 확인 (9개 플랜 정상 반환)
2. ✅ Restaurants Page 모달 기본값 설정
3. ✅ Managers Page 모달 기본값 설정
4. ✅ Subscriptions Page 모달 기본값 설정

---

## ✅ 완료된 작업 (최근)

### Phase 2: Recipe Management (2025-11-20 ~ 2025-12-10) - 완료

**상세 설계 문서:** `/var/www/docs/RECIPE_MANAGEMENT_SYSTEM.md`

#### 최종 구현된 권한 구조 (owner_type 기반)

```javascript
// 레시피/재료의 소유권은 owner_type으로 구분
if (recipe.owner_type === 'brand') {
  // Brand General/Manager: CRUD 가능
  // Restaurant Admin: 조회만 가능 (수정 불가)
} else {
  // Restaurant Admin: CRUD 가능
  // Brand General/Manager: 접근 불가 (표시 안됨)
}
```

**핵심 구현사항:**
- `recipe_manager_type` 방식 → `owner_type` 방식으로 단순화
- 브랜드 레시피: Brand General/Manager만 수정, Restaurant Admin은 조회만
- 레스토랑 레시피: Restaurant Admin만 수정, Brand에는 표시 안됨

#### 구현 완료 항목:

**Phase 2.1: 기본 인프라 구축**
1. [x] DB 스키마 생성 (recipes, ingredients, recipe_ingredients, recipe_categories, ingredient_categories)
2. [x] Backend Models 구현 (Recipe, Ingredient, RecipeIngredient)
3. [x] owner_type ENUM('brand', 'restaurant') 기반 소유권 구분
4. [x] 권한 체크 미들웨어 구현 (isBrandManager, checkRestaurantAccess)

**Phase 2.2: Backend APIs 구현**
5. [x] Brand Recipe CRUD API (`/api/brands/:brandId/recipes`)
6. [x] Restaurant Recipe CRUD API (`/api/restaurants/:restaurantId/recipes`)
7. [x] Brand-recipes 조회 API (`/api/restaurants/:restaurantId/brand-recipes`)
8. [x] Ingredient CRUD API
9. [x] Recipe/Ingredient Category API
10. [x] Recipe → Product 변환 API

**Phase 2.3: Frontend UI 구현**
11. [x] RecipeManagementPage (Brand General용 - 4개 탭)
12. [x] RecipesTab - 레시피 CRUD
13. [x] IngredientsTab - 재료 CRUD
14. [x] RecipeCategoriesTab, IngredientCategoriesTab - 카테고리 관리
15. [x] RecipesPage (Restaurant Admin용)
16. [x] IngredientsPage (Restaurant Admin용)

**Phase 2.4: UI 기능 추가 (2025-12-10)**
17. [x] 리스트 카드에 요리시간(prep_time, cook_time) 표시
18. [x] 리스트 카드에 조리방법(instructions) 미리보기 표시
19. [x] 리스트 카드에 재료명 태그(IngredientTags) 표시
20. [x] 카드 클릭 시 Recipe Details 팝업 (View 모드)
21. [x] View 모드에서 Edit 전환 기능

### 버그 수정 및 개선 (2025-12-11)

#### Reports 페이지 필터 버그 수정
**파일:** `/var/www/dev-frontend/src/pages/Reports/ReportsPage.tsx`

**문제:**
- Month 필터 선택 시 그래프가 지난 달 1일~30일 데이터를 잘못 표시
- 30일 범위가 두 달에 걸쳐있을 때 일자(day number)만으로 그룹화되어 데이터 혼합

**해결:**
- 그래프 데이터를 `MM/DD` 형식(예: `11/10`, `12/09`)으로 표시
- 두 달에 걸친 30일 데이터가 올바르게 구분되어 표시

**변경 코드:**
```typescript
// Before: day number만 사용 (11월9일, 10월9일 모두 "9"로 표시)
const day = getOrderDate(order).getDate().toString();

// After: MM/DD 형식으로 구분
const dateKey = `${(orderDate.getMonth() + 1).toString().padStart(2, '0')}/${orderDate.getDate().toString().padStart(2, '0')}`;
```

#### 환경변수 관리 개선
**파일:** `/var/www/dev-backend/.env`, `/var/www/dev-frontend/package.json`

**변경사항:**
- SUDO_PASSWORD를 .env 파일에서 중앙 관리
- 빌드 스크립트에서 .env 파일 읽어서 사용
- 하드코딩된 비밀번호 제거

#### Claude 명령어 추가
**파일:** `/var/www/.claude/commands/개발완료.md`

**기능:**
- 개발 세션 종료 시 사용하는 명령어
- 문서 자동 업데이트 (DEVELOPMENT_PLAN.md 등)
- Git 커밋 및 푸시 자동화

---

## ✅ 완료된 작업 (2026-01-09)

### 보안 강화 작업

**목적:** 프로젝트 전반적인 보안 취약점 점검 및 개선

**완료 항목:**

#### 1. 파일 권한 보안
- [x] `.env` 파일 권한 600 적용 (dev, production)
- [x] `.gitignore` 강화 - `.env` 관련 패턴 추가

#### 2. 민감정보 제거
- [x] `SUDO_PASSWORD` 환경변수 제거 (dev-backend/.env)
- [x] `restart-dev.sh` 스크립트에서 하드코딩된 비밀번호 제거
- [x] `deploy-dev.sh`에서 SUDO_PASSWORD 의존성 제거 (sudo -n 사용)

#### 3. JWT 보안 강화
- [x] `authService.js` - JWT 폴백 시크릿 제거
- [x] `authService.js` - JWT_SECRET 환경변수 필수 검증 추가
- [x] 개발서버 JWT_SECRET 128자로 강화

#### 4. API 보안
- [x] `helmet` 패키지 설치 및 적용 (HTTP 헤더 보안)
- [x] `express-rate-limit` 패키지 설치 및 적용
  - 전체 API: 15분당 1000회
  - 로그인 API: 15분당 20회
- [x] `/api/deploy` 엔드포인트에 System Admin 인증 추가

#### 5. 문서 업데이트
- [x] `ARC.md` 생성 - 프로젝트 아키텍처 요약
- [x] `CLAUDE.md` - AI 보안 규칙 추가
- [x] `개발시작.md` - 보안 필수 규칙, 4줄 규칙 추가
- [x] `개발완료.md` - 배포 전 체크리스트 추가

**변경 파일:**
- `/var/www/dev-backend/.env`
- `/var/www/dev-backend/services/authService.js`
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh`
- `/var/www/dev-frontend/deploy-dev.sh`
- `/var/www/production-backend/restart-dev.sh`
- `/var/www/.gitignore`
- `/var/www/CLAUDE.md`
- `/var/www/ARC.md` (신규)
- `/var/www/.claude/commands/개발시작.md`
- `/var/www/.claude/commands/개발완료.md`

**보류 작업 (야간 작업 예정):**
- [ ] 운영서버 JWT_SECRET 128자로 강화

---

## ✅ 완료된 작업 (2026-01-07)

### 배포 스크립트 권한 문제 근본 해결

**문제:** `sudo`로 배포 스크립트 실행 시 build 폴더가 root 소유로 생성되어 이후 배포에서 권한 오류 발생

**해결:**
- [x] `deploy-production.sh` - `npm run build`를 `su - $SUDO_USER`로 실행하여 원래 사용자 권한으로 빌드
- [x] `deploy-production.sh` - Step 0에서 dev-frontend, dev-backend 권한도 체크
- [x] `deploy-dev.sh` - 캐시, 빌드, node_modules 폴더 권한 자동 수정 함수 추가
- [x] `CLAUDE.md` - 개발서버 배포 규칙 명시 (`npm run build:dev` 스크립트 사용 필수)

**변경 파일:**
- `/var/www/deploy-production.sh`
- `/var/www/dev-frontend/deploy-dev.sh`
- `/var/www/CLAUDE.md`

---

## ✅ 완료된 작업 (2026-01-06)

### 멤버십/포인트 시스템 구현

**목적:** 레스토랑별 고객 포인트 적립/사용 시스템

**완료 항목:**

#### 1. 데이터베이스 설계
- [x] `membership_settings` 테이블 생성 (포인트 설정, 등급별 보너스)
- [x] `point_transactions` 테이블 생성 (포인트 거래 내역)
- [x] `restaurant_customers` 테이블에 points, loyalty_tier 필드 추가
- [x] `orders` 테이블에 points_used, point_discount 컬럼 추가

#### 2. Backend 구현
- [x] MembershipSettings 모델 (`/var/www/dev-backend/models/MembershipSettings.js`)
- [x] PointTransaction 모델 (`/var/www/dev-backend/models/PointTransaction.js`)
- [x] 포인트 서비스 (`/var/www/dev-backend/services/pointService.js`)
  - earnPointsForOrder: 주문 완료 시 포인트 적립
  - usePointsForOrder: 주문 시 포인트 사용
  - refundPointsForOrder: 주문 취소 시 포인트 환불
- [x] 멤버십 API (`/var/www/dev-backend/routes/membership.js`)
  - GET `/settings/:restaurantId` - 설정 조회
  - PUT `/settings/:restaurantId` - 설정 저장
  - GET `/customer/:restaurantId/:customerId` - 고객 포인트 조회
- [x] orders.js에 포인트 처리 로직 추가

#### 3. Frontend - 모바일 오더
- [x] PaymentPage.tsx에 포인트 UI 추가
  - 포인트 사용 체크박스/슬라이더
  - 포인트 할인 금액 실시간 계산
  - 예상 적립 포인트 표시
- [x] 주문 생성 시 points_used, point_discount 전송

#### 4. Frontend - POS 시스템
- [x] PaymentModal.tsx에 포인트 UI 추가
  - 고객 포인트 표시
  - 포인트 사용 토글/슬라이더
  - 할인 금액 계산
- [x] POSTerminalPage.tsx에 포인트 상태/로딩 로직 추가

#### 5. Frontend - Settings
- [x] SettingsPage.tsx에 Membership 탭 추가
  - Enable Membership 토글
  - 포인트 적립 비율 설정
  - 포인트 사용 환율 설정
  - 최소 사용 포인트 설정
  - 최대 사용 비율 설정
  - 등급별 threshold/bonus 설정

**관련 파일:**
- Backend: `membership.js`, `pointService.js`, `orders.js`, Order 모델
- Frontend: `PaymentPage.tsx`, `PaymentModal.tsx`, `POSTerminalPage.tsx`, `SettingsPage.tsx`
- Migration: `add-points-columns-to-orders.sql`

**알려진 이슈:**
- `/var/www/html/static/js` 권한 문제로 프론트엔드 배포 실패 (root 소유)
- 해결 필요: 권한 수정 또는 수동 배포

---

### Dashboard 타임존 설정 문제 해결

**문제:** Dashboard "오늘의 매출" 통계가 레스토랑 타임존 설정을 무시하고 있었음

**원인:**
- Dashboard API가 "오늘" 날짜 계산 시 고정된 자정(00:00)을 사용
- Brand/Foodcourt 역할은 operation_settings 필드가 없어서 타임존 설정 자체가 불가능

**해결:**
1. **Brand/Foodcourt 모델에 operation_settings 필드 추가**
   - `dev-backend/models/Brand.js` - JSON getter/setter로 operation_settings 추가
   - `dev-backend/models/Foodcourt.js` - 동일하게 추가
   - 기본값: `{ openingTime: '09:00', closingTime: '22:00', timeZone: 'Asia/Kuala_Lumpur' }`

2. **Brand/Foodcourt API 업데이트**
   - `dev-backend/routes/brands.js` - GET/PUT company-info에 operation_settings 포함
   - `dev-backend/routes/foodcourts.js` - GET/PUT company-info에 operation_settings 포함

3. **Company Information 페이지에 Operation Settings UI 추가**
   - `dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx`
   - `dev-frontend/src/pages/Foodcourt/FoodcourtCompanyInfoPage.tsx`
   - Opening Time, Closing Time, Timezone 필드 추가
   - 16개 주요 타임존 선택 가능

4. **Dashboard API 타임존 기반 날짜 계산 적용**
   - `dev-backend/routes/dashboard.js` - getTodayBounds() 함수 추가
   - operation_settings.timeZone에 따라 "오늘"의 시작/끝 시간 계산

**테스트 완료:**
- DB 저장/로드 테스트 성공
- Frontend 빌드 성공

**수정된 파일 (7개):**
- `dev-backend/models/Brand.js`
- `dev-backend/models/Foodcourt.js`
- `dev-backend/routes/brands.js`
- `dev-backend/routes/foodcourts.js`
- `dev-backend/routes/dashboard.js`
- `dev-frontend/src/pages/Brand/BrandCompanyInfoPage.tsx`
- `dev-frontend/src/pages/Foodcourt/FoodcourtCompanyInfoPage.tsx`

---

## ✅ 완료된 작업 (2026-01-05)

### 운영서버 문제 해결 및 빌드 시스템 개선

#### Nginx 500 에러 해결
**문제:** 운영서버(purplehere.com)에서 500 Internal Server Error 발생

**원인:** Nginx 설정의 `.html` location 블록에서 `try_files $uri /index.html;`가 무한 리다이렉트 루프 발생

**해결:**
- `/etc/nginx/sites-available/purplehere.com`에서 `.html` location 블록 수정
- `try_files $uri /index.html;` → `try_files $uri =404;`

#### 빌드 캐시 권한 문제 영구 해결
**문제:** `node_modules/.cache` 폴더의 root 소유권으로 빌드 실패 (index.html 미생성)

**해결:**
1. `dev-frontend/deploy-dev.sh` - 빌드 전 캐시 권한 자동 수정
2. `dev-frontend/package.json` - build 스크립트에 권한 수정 로직 추가
3. `deploy-production.sh` - Step 9에 캐시 권한 자동 수정 추가
4. `BUILD_TROUBLESHOOTING.md` 가이드 문서 생성

#### 레시피 상세 필드 API 응답 누락 해결
**문제:** 운영서버에서 레시피 상세 필드(prep_time, cook_time, instructions_summary, instructions_detail)가 API 응답에 누락

**원인:** `brand-products.js`에 중복 라우트가 있어 `attributes` 제한으로 필드 누락
```javascript
// 문제의 중복 라우트 (brand-products.js)
router.get('/brands/:brandId/recipes', authenticateToken, async (req, res) => {
  const recipes = await Recipe.findAll({
    attributes: ['id', 'name', 'description', 'category', 'total_ingredient_cost', 'owner_type'],
    // ... prep_time, cook_time 등 누락
  });
});
```

**해결:**
- `dev-backend/routes/brand-products.js` 중복 라우트 제거
- `production-backend/routes/brand-products.js` 동일하게 수정

#### 중복 라우트 검사 시스템 구축
**목적:** 향후 중복 라우트 문제 사전 방지

**구현:**
1. `dev-backend/scripts/check-duplicates.js` 스크립트 생성
   - `/brands/` 및 `/restaurants/` 경로의 중복만 검사 (실제 문제 발생 경로)
2. `package.json`에 스크립트 추가
   - `npm run check`: 수동 중복 검사
   - `prestart`: 서버 시작 전 자동 검사
3. `deploy-production.sh`에 Step 5.5 추가 (배포 전 중복 검사)

#### inventory.js 중복 라우트 수정
**발견:** `npm run check` 실행 결과 inventory.js에서 중복 발견
```
DUPLICATE: GET /restaurants/:restaurantId/inventory/reorder-suggestions
  - inventory.js:1191 (이전 버전)
  - inventory.js:1482 (PAR-level 기반 버전)
```

**해결:**
- dev-backend/routes/inventory.js: 라인 1191의 이전 버전 삭제
- production-backend/routes/inventory.js: 동일하게 수정

---

## 🚧 진행 중인 작업

### Phase 4: Purchase Order System - 설계 완료 (2026-01-06)

**상태:** 설계 완료, 다음 개발 예정

**상세 설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

**핵심 기능:**
1. **2가지 발주 경로**
   - 재고관리 Stock List에서 수량 입력 → [+ Order]
   - 발주관리에서 재료 검색 → 직접 추가

2. **공급업체별 발주서 그룹핑**
   - 같은 날 + 같은 공급업체 = 1개 발주서
   - Order Cart에서 공급업체별로 분리 표시

3. **메신저 공유**
   - WhatsApp, Telegram, KakaoTalk 직접 공유
   - PDF 다운로드, 이미지 저장
   - 텍스트 복사

4. **실 단가 관리 + 가격 히스토리**
   - 입고 시 실제 인보이스 단가 입력
   - 단가 변경 시 재료 원가 업데이트 옵션
   - 모든 가격 변동 히스토리 기록 (어디서 바꿨든)
   - 재료별 가격 변동 팝업 조회

5. **인보이스 연동**
   - 입고 시 인보이스 번호/날짜/금액/파일 저장
   - 발주서에서 인보이스 정보 조회

6. **입고 → 재고 자동 반영**
   - current_stock 증가
   - inventory_transactions 기록
   - inventory_batches 생성 (로트/유통기한)

**신규 테이블 (4개):**
- `purchase_orders` - 발주서 마스터 (인보이스 포함)
- `purchase_order_items` - 발주 품목 (예상단가 + 실단가)
- `order_cart_items` - 발주 대기 목록 (장바구니)
- `ingredient_price_history` - 가격 변동 히스토리

---

### Socket.io 실시간 주문 알림 시스템 (일시 중단)

**상태:** Git stash에 저장됨 (`git stash pop`으로 복원 가능)

**구현 내용 (미완성):**
- `OrderContext.tsx`: Socket.io 연결 및 실시간 주문 수신
- `MainLayout.tsx`: 실시간 pending order count 표시
- 새 주문 알림 사운드 기능
- 알림 설정 (on/off) localStorage 저장

**복원 명령어:**
```bash
git stash pop
```

---

## ✅ 완료된 작업 (2026-01-04)

### Product Recipe 탭 UI 개선

**목적:** BrandProductRecipe 페이지의 Ingredients, Recipe Categories, Ingredient Categories 탭을 RecipeManagement 스타일로 통일

**수정된 파일 (3개):**
- `dev-frontend/src/pages/BrandProductRecipe/ProductIngredientsTab.tsx`
- `dev-frontend/src/pages/BrandProductRecipe/ProductRecipeCategoriesTab.tsx`
- `dev-frontend/src/pages/BrandProductRecipe/ProductIngredientCategoriesTab.tsx`

**변경 내용:**
- **ProductIngredientsTab**: 테이블 → 카드 그리드 레이아웃, 이미지 업로드 기능, ConfirmModal 적용
- **ProductRecipeCategoriesTab**: OrderControls(순서변경 버튼) 추가, SVG 아이콘 버튼, ConfirmModal 적용
- **ProductIngredientCategoriesTab**: OrderControls(순서변경 버튼) 추가, SVG 아이콘 버튼, ConfirmModal 적용
- ThemedButton 사용, 카테고리 reorder API 연동

---

## ✅ 완료된 작업 (2026-01-01)

### PhoneInput 컴포넌트 표준화

**목적:** 모든 페이지의 전화번호 입력을 국가코드를 지원하는 PhoneInput 컴포넌트로 통일

**수정된 파일 (12개):**
- `dev-frontend/src/pages/Settings/SettingsPage.tsx`
- `dev-frontend/src/pages/Profile/ProfilePage.tsx`
- `dev-frontend/src/pages/Admin/ManagersPage.tsx` (신규/수정 폼)
- `dev-frontend/src/pages/Admin/RestaurantsPage.tsx` (신규/수정 폼)
- `dev-frontend/src/pages/Manager/SignupPage.tsx`
- `dev-frontend/src/components/Staff/StaffProfileModal.tsx`
- `dev-frontend/src/pages/CompanyProfile/CompanyProfilePage.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandGeneralDashboard.tsx`
- `dev-frontend/src/pages/BrandGeneral/BrandManagement.tsx`
- `dev-frontend/src/pages/FoodcourtGeneral/FoodcourtGeneralDashboard.tsx`
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx`
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**변경 내용:**
- 기존 `<Input type="tel">` → `<PhoneInput>` 컴포넌트로 교체
- 국가 선택에 따른 국가코드 자동 변경 지원
- `defaultCountry` prop으로 기본 국가 설정

### Country Select 표준화

**목적:** 국가 선택 드롭다운을 COUNTRIES 상수를 사용하도록 통일

**수정된 파일:**
- `dev-frontend/src/pages/CompanyInformation/CompanyInformationPage.tsx`

**변경 내용:**
- 하드코딩된 국가 옵션 → `COUNTRIES` 상수 import 사용
- 기본값 `'Malaysia'` → `'MY'` (국가 코드 표준)

### Foodcourt 메뉴 구조 개선

**수정된 파일:**
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**변경 내용:**
- Foodcourt General/Manager 메뉴에 Company Information 항목 추가
- 메뉴 섹션 구조화 (Management, Analytics, Administration, Support)

---

## ✅ 완료된 작업 (2025-12-30)

### 데이터베이스 스키마 수정

**문제:** Recipe Management, Inventory 페이지에서 500 에러 발생

**원인:** Sequelize 모델에 정의된 컬럼이 실제 DB 테이블에 없음

**해결:** 누락된 컬럼 추가
```sql
-- ingredients 테이블
ALTER TABLE ingredients ADD COLUMN track_stock TINYINT(1) NOT NULL DEFAULT 1;
ALTER TABLE ingredients ADD COLUMN min_order DECIMAL(10,2) DEFAULT 0;

-- general_stock 테이블
ALTER TABLE general_stock ADD COLUMN image_url MEDIUMTEXT;
ALTER TABLE general_stock ADD COLUMN min_order DECIMAL(10,2) DEFAULT 0;
```

### 메뉴 깜빡임(flickering) 버그 수정

**문제:** 네비게이션 메뉴 클릭할 때마다 메뉴가 나타났다 사라졌다 반복

**원인:** `MainLayout.tsx`의 `isMenuAllowed` 헬퍼 함수가 로딩 중일 때 `false` 반환
```typescript
// 문제 코드
const isMenuAllowed = (route: string) => {
  if (loading) return false;  // 로딩 중 메뉴 숨김 → 깜빡임 발생
  return isRouteAllowed(route);
};
```

**해결:** `isMenuAllowed` 헬퍼 제거, `isRouteAllowed` 직접 사용
- `isRouteAllowed`는 `allowedRoutes.length === 0`일 때 `true` 반환 (fail-open)
- 로딩 중에도 메뉴 유지됨

**수정 파일:**
- `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx`

### General Stock Categories 탭 위치 변경

**사용자 요청:** "General Stock Categories는 왜 레시피에 있어? 재고관리에 있어야지"

**변경 내용:**
- Recipe Management 페이지에서 General Stock Categories 탭 제거
- Inventory 페이지에 Categories 탭 추가 (History 옆)

**수정 파일:**
- `/var/www/dev-frontend/src/pages/RecipeManagement/RecipeManagementPage.tsx` - 탭 제거
- `/var/www/dev-frontend/src/pages/Inventory/InventoryPage.tsx` - 탭 추가

### Product Recipes 메뉴 접근 권한 수정

**사용자 요청:** "Product Recipes 메뉴가 레스토랑 관리자에서는 아예 안나와야 해"

**변경 내용:**
- Restaurant Admin 메뉴에서 Product Recipes NavItem 제거
- 이 메뉴는 Brand General/Manager에게만 표시

**수정 파일:**
- `/var/www/dev-frontend/src/components/Layout/MainLayout.tsx`

### 개발/운영 DB 설정값 동기화

**사용자 요청:** "운영서버 세팅값이 개발서버에서 배포하면 자꾸 바뀌고 있어"

**분석:**
- 개발 DB와 운영 DB의 레스토랑 설정값이 다름
- 개발 DB: `cash_rounding: NULL`, `rounding_apply_to: cash_only`, `operation_settings: NULL`
- 운영 DB: `cash_rounding: 0.10`, `rounding_apply_to: all`, `operation_settings: {...}`
- 배포 스크립트는 스키마(테이블/컬럼)만 동기화하고 데이터는 변경하지 않음
- 문제의 원인은 DB 데이터 불일치가 아닌, 프론트엔드에서 기본값으로 병합하는 로직

**해결:**
1. 개발 DB의 restaurant 10 설정값을 운영 DB와 동기화
   ```sql
   UPDATE restaurants SET
     cash_rounding = 0.10,
     rounding_apply_to = 'all',
     operation_settings = (운영 DB의 operation_settings)
   WHERE id = 10;
   ```
2. 배포 스크립트는 데이터를 변경하지 않으므로 운영 설정값은 보존됨

**확인 완료:**
- 운영 API `/api/restaurants/10` → 올바른 설정값 반환
- 프론트엔드 코드: DB 컬럼값(currency, cash_rounding, rounding_apply_to)을 우선 사용

---

## ✅ 완료된 작업 (2025-12-29)

### Inventory 페이지 버그 수정 및 개선

**수정된 파일:**
- `dev-backend/routes/inventory-routes.js`
- `dev-frontend/src/pages/Inventory/InventoryPage.tsx`
- `dev-frontend/src/hooks/useAllowedRoutes.ts`
- `dev-frontend/src/components/Layout/MainLayout.tsx`

**해결된 문제들:**

1. **재고 페이지 "No ingredients found" 문제**
   - 원인: API가 `restaurant_id`만 쿼리하고 `brand_id` 재료를 포함하지 않음
   - 해결: `inventory-routes.js`에서 브랜드 재료도 포함하도록 OR 조건 추가
   ```javascript
   const orConditions = [{ restaurant_id: restaurantId }];
   if (restaurant?.brand_id) {
     orConditions.push({ brand_id: restaurant.brand_id });
   }
   ```

2. **404 오류: `/inventory/expiring` API 누락**
   - 원인: `inventory.js`에 있던 API가 실제 사용되는 `inventory-routes.js`에 없음
   - 해결: `inventory-routes.js`에 `/expiring` 엔드포인트 추가

3. **`toFixed is not a function` 오류**
   - 원인: DB에서 `avg_daily_usage`가 문자열("0.0000")로 반환됨
   - 해결: `parseFloat(String(value))`로 변환 후 `toFixed()` 호출
   ```typescript
   // 수정 전
   <div>{item.avg_daily_usage.toFixed(2)}</div>
   // 수정 후
   <div>{(parseFloat(String(item.avg_daily_usage)) || 0).toFixed(2)}</div>
   ```

4. **Authorization 헤더 누락**
   - 원인: `fetchAPI`가 쿠키 기반이나 시스템은 Bearer 토큰 사용
   - 해결: `authFetch` 헬퍼 함수 추가하여 `Authorization: Bearer` 헤더 포함

5. **디버그 로그 제거**
   - `MainLayout.tsx`와 `useAllowedRoutes.ts`에서 과도한 console.log 제거
   - 콘솔 스팸 문제 해결

### Reports 페이지 통계 분석

**분석 완료 - 코드 정확성 확인:**
- `filteredOrders`에서 `status === 'completed'`만 필터링됨
- 모든 통계(salesData, categoryData, menuData, drilldownData)가 completed 주문 기준
- cancelled 주문은 정확하게 제외됨

**운영 DB 확인 (restaurant_id=8, 2025-12-29):**
- completed: 32건, RM 785.50
- cancelled: 2건, RM 37.00

---

## ✅ 완료된 작업 (2025-12-28)

### 프론트엔드 빌드 오류 수정

**문제:**
- 500 Internal Server Error 발생
- `node_modules/.cache` 폴더 권한 문제로 빌드 불완전 (index.html 미생성)

**해결:**
1. sudo로 `node_modules/.cache` 폴더 삭제
2. `DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true` 옵션으로 재빌드
3. 빌드 성공 확인 (HTTP 200 정상 응답)

**명령어:**
```bash
echo "$SUDO_PASSWORD" | sudo -S rm -rf /var/www/dev-frontend/node_modules/.cache
DISABLE_ESLINT_PLUGIN=true TSC_COMPILE_ON_ERROR=true CI=false npm run build
```

---

## ✅ 완료된 작업 (2025-12-22)

### 통화 설정 시스템 개선

**문제 1: 통화 코드 불일치**
- 메뉴 페이지에서 레스토랑 통화가 RM으로 설정되어 있어도 $로 표시됨
- `useBrandCurrency` 훅이 브랜드 API에서 통화를 가져오고 있었음

**해결:**
1. `useBrandCurrency` 훅을 레스토랑 기반으로 변경
   - `/api/restaurants/${restaurantId}`에서 통화 가져오기
   - 토큰 키 수정 (`token` → `auth_token`)
2. `CURRENCY_CONFIG`에 `RM` 키 추가 (말레이시아 현지 관례)
3. 모든 페이지의 기본 통화값을 `MYR` → `RM`으로 변경 (23개 파일)

**문제 2: 배포 시 설정값 리셋**
- 운영 배포 후 통화 반올림, Pager 설정 등이 초기화됨
- `operation_settings` JSON과 개별 컬럼(`cash_rounding`, `currency`) 값이 불일치

**해결:**
1. 백엔드 `store.js`에서 설정 저장 시 `operation_settings` 내부 값도 개별 컬럼과 동기화
2. 프론트엔드에서 `cash_rounding`이 null일 때 기본값 설정하지 않음 (비활성화 상태 보존)
3. 운영 DB의 불일치 데이터 동기화 쿼리 실행

**수정된 파일:**
- `dev-backend/routes/store.js` - operation_settings 동기화 로직 추가
- `dev-frontend/src/hooks/useBrandCurrency.ts` - 레스토랑 기반으로 변경
- `dev-frontend/src/utils/currency.ts` - RM 키 추가, 기본값 RM
- `dev-frontend/src/pages/Settings/SettingsPage.tsx` - null 보존 로직
- 23개 페이지의 통화 기본값 변경

---

## ✅ 완료된 작업 (2025-12-19)

### 재고관리 시스템 완료

**구현 내용:**
1. **Backend API 라우터 수정**
   - `inventory.js` auth middleware import 수정 (`authenticateToken` destructuring)
   - `inventory-routes.js` 생성 (restaurants.js에서 마운트)
   - `server.js`에 inventory-routes 마운트 추가
   - 기존 중복 라우터 등록 정리

2. **API 엔드포인트 (모두 동작 확인됨)**
   - GET `/api/restaurants/:id/inventory` - 재고 현황
   - GET `/api/restaurants/:id/inventory/summary` - 요약
   - GET `/api/restaurants/:id/inventory/alerts` - 알림 목록
   - GET `/api/restaurants/:id/inventory/transactions` - 거래 내역
   - GET `/api/restaurants/:id/inventory/reorder-suggestions` - 발주 제안
   - GET `/api/restaurants/:id/stock-takes` - 재고 실사 목록
   - POST 엔드포인트들 (receive, waste, adjust, initial, stock-take 등)

3. **Frontend**
   - InventoryPage.tsx 구현 완료 (Dashboard, Stock List, History 탭)
   - StockTakePage.tsx 구현 완료 (재고 실사 기능)
   - 공통 UI 컴포넌트 활용 (Table, TableHeader, TableRow 등)

**관련 파일:**
- `/var/www/dev-backend/routes/inventory-routes.js` (신규)
- `/var/www/dev-backend/routes/inventory.js`
- `/var/www/dev-backend/server.js` (라우터 마운트 추가)
- `/var/www/dev-frontend/src/pages/Inventory/InventoryPage.tsx`
- `/var/www/dev-frontend/src/pages/Inventory/StockTakePage.tsx`
- `/var/www/docs/INVENTORY_MANAGEMENT_SYSTEM.md` (설계문서)

### RM 하드코딩 통화 수정 (18개 파일)

**문제:** 여러 페이지에서 통화가 'RM'으로 하드코딩되어 있었음

**해결:** `useBrandCurrency` 훅과 `formatCurrency` 유틸리티를 사용하여 동적 통화 표시

**수정된 파일:**
- Manager 페이지 (11개): SalesPage, ManagerDashboard, ManagerCustomersPage, ManagerPromotionsPage, ManagerReportsPage, InvoicesPage, RestaurantsPage, StaffManagementPage, ManagerSubscriptionsPage, SignupPage, SubscriptionsPage
- BrandGeneral 페이지 (3개): BrandGeneralDashboard, BrandReportsPage, BrandPerformance
- 기타 페이지 (4개): CustomersPage, RestaurantDashboard, MenuManagementPage, DashboardContent

---

## ✅ 완료된 작업 (2025-12-16)

### PM2 Port 충돌 문제 영구 해결

**문제:** dev-backend가 "Port 3001 is already in use" 에러로 무한 재시작 루프 발생

**근본 원인:**
- `server.js`와 `app.js` 양쪽에서 `startServer()` 호출
- server.js가 모듈을 로드할 때 app.js도 실행되어 같은 포트에 두 번 바인딩 시도

**해결:**
1. `app.js`에 `require.main === module` 체크 추가 (직접 실행 시에만 서버 시작)
2. `ecosystem.config.js`에 PM2 안정성 설정 추가:
   - `exec_mode: 'fork'` (명시적)
   - `max_restarts: 10`, `min_uptime: 5000`, `restart_delay: 4000`
   - `kill_timeout: 5000`
3. `/var/www/dev-backend/restart-dev.sh` 스크립트 생성 (포트 정리 후 재시작)

**수정 파일:**
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/ecosystem.config.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh` (신규)
- `/var/www/dev-backend/README.md` (트러블슈팅 섹션 추가)

### Notification Settings 페이지 토큰 키 수정

**문제:** 로그인 상태인데 "No authentication token found" 에러 발생

**근본 원인:**
- NotificationSettingsPage에서 `localStorage.getItem('token')` 사용
- 프로젝트 전체에서는 `localStorage.getItem('auth_token')` 키 사용

**해결:**
- NotificationSettingsPage.tsx의 3곳에서 `'token'` → `'auth_token'`으로 변경
  - 377번줄: loadSettings Authorization 헤더
  - 397번줄: handleSave 토큰 가져오기
  - 442번줄: sendTestEmail Authorization 헤더

**수정 파일:**
- `/var/www/dev-frontend/src/pages/NotificationSettings/NotificationSettingsPage.tsx`

---

## ✅ 완료된 작업 (2025-12-15)

### Phase 3: 브랜드 제품 관리 시스템 - 완료

**구현 완료 항목:**

#### 3.1 데이터베이스
- [x] `brand_product_categories` 테이블 생성
- [x] `brand_products` 테이블 생성 (base_quantity, sync_to_ingredients 추가)
- [x] `brand_product_option_groups` 테이블 생성
- [x] `brand_product_options` 테이블 생성
- [x] `brand_product_brands` 연결 테이블 (N:M 관계)
- [x] `brand_product_option_group_products` 연결 테이블 (N:M 관계)

#### 3.2 Backend 구현
- [x] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
- [x] Routes: `/api/brand-products` (통합 관리 - CRUD)
- [x] Routes: `/api/brand-product-categories` (CRUD)
- [x] Routes: `/api/brand-product-option-groups` (CRUD)
- [x] Routes: `/api/brands/:brandId/products` (브랜드별 제품 조회)
- [x] `isBrandManager` 미들웨어 개선 (brand_id 없는 요청도 허용)

#### 3.3 Frontend 구현
- [x] Brand General 메뉴에 "Product Management" 추가 (`/pos/brand-general/products`)
- [x] BrandProductManagementPage - 3개 탭 구조
- [x] BrandProductCategoriesTab - 카테고리 관리
- [x] BrandProductsTab - 제품 목록/CRUD (이미지, 가격, 옵션 그룹, 브랜드 연결)
- [x] BrandProductOptionsTab - 옵션 그룹/옵션 관리

### Phase 4: 제품-재료 연동 시스템 - 완료

#### 4.1 연동 로직 구현
- [x] `ingredients` 테이블에 `brand_product_id` FK 추가
- [x] `ingredients` 테이블에 `image_url` 필드 추가 (MEDIUMTEXT)
- [x] `ingredients` 테이블에 `base_quantity` 필드 추가
- [x] Brand Product 생성/수정 시 자동으로 Ingredient 레코드 생성/업데이트
- [x] `sync_to_ingredients` 플래그로 연동 여부 선택 가능 (패키지 등 비재료 제품 지원)
- [x] Brand Product 삭제 시 연결된 Ingredient 자동 삭제

#### 4.2 Frontend 구현
- [x] IngredientsTab에 이미지 표시 (카드에 이미지 표시)
- [x] IngredientsTab에 이미지 업로드 기능 추가
- [x] IngredientsTab에 base_quantity 필드 추가 (Base Qty / Unit 표시)
- [x] 브랜드 재료는 "Brand" 배지로 구분 표시

### 주요 변경 파일

**Backend:**
- `/var/www/dev-backend/models/BrandProduct.js` - base_quantity, sync_to_ingredients 추가
- `/var/www/dev-backend/models/Ingredient.js` - brand_product_id, image_url, base_quantity 추가
- `/var/www/dev-backend/models/index.js` - BrandProduct-Ingredient 연관관계 추가
- `/var/www/dev-backend/routes/brand-products.js` - syncProductToIngredients 함수 구현
- `/var/www/dev-backend/routes/ingredients.js` - image_url, base_quantity 필드 지원
- `/var/www/dev-backend/middleware/recipeAuth.js` - isBrandManager 개선
- `/var/www/dev-backend/scripts/sync-brand-products.js` - 기존 제품 동기화 스크립트

**Frontend:**
- `/var/www/dev-frontend/src/pages/BrandProductManagement/BrandProductsTab.tsx` - base_quantity, sync_to_ingredients UI
- `/var/www/dev-frontend/src/pages/RecipeManagement/IngredientsTab.tsx` - 이미지, base_quantity UI

---

## 📅 예정된 작업 (Supply Chain Management 로드맵)

### 전체 흐름도
```
[Brand General/Manager]
        │
        ▼
 Brand Products 등록 (제품 관리)
 ├── 제품 카테고리
 └── 제품 옵션 (옵션 그룹 + 옵션)
        │
        ▼ (brand_id 연결된 레스토랑에 자동 노출)
        │
[Restaurant Admin]
        │
        ├─→ 레시피 생성 시 재료로 선택
        │   ├── 브랜드 재료 (View & Select만)
        │   └── 자체 재료 (CRUD 가능)
        │
        ├─→ 주문 발생 → 재고 차감
        │
        └─→ 발주 관리
              ├── 브랜드로 발주 (Brand Products)
              └── 외부 공급업체 발주 (자체 재료)
```

### 핵심 개념
- **Brand Product = Ingredient**: 브랜드 제품은 연결된 레스토랑에서 레시피 재료로 사용
- **제품 수정은 제품에서만**: Brand General/Manager가 제품을 수정하면 재료 정보도 자동 반영
- **이중 발주 경로**: 브랜드 제품 → 브랜드 발주 / 자체 재료 → 외부 공급업체 발주

---

### Phase 3: 브랜드 제품 관리 시스템 ✅ 완료

**상태:** 2025-12-15 완료 (상세 내용은 위 "완료된 작업" 섹션 참조)

---

### Phase 4: 제품-재료 연동 시스템 ✅ 완료

**상태:** 2025-12-15 완료 (상세 내용은 위 "완료된 작업" 섹션 참조)

---

### ~~Phase 3: 브랜드 제품 관리 시스템~~ (완료됨)

~~**목적:** Brand General/Manager가 레스토랑에 판매할 제품(원재료)을 등록/관리~~

#### ~~3.1 데이터베이스 설계~~
```sql
-- 브랜드 제품 카테고리
CREATE TABLE brand_product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 브랜드 제품
CREATE TABLE brand_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NOT NULL,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),                    -- 제품 코드
  unit VARCHAR(50),                    -- 기본 단위 (kg, L, 개 등)
  unit_price DECIMAL(10, 2) NOT NULL,  -- 단가
  min_order_quantity INT DEFAULT 1,    -- 최소 주문 수량
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  FOREIGN KEY (category_id) REFERENCES brand_product_categories(id)
);

-- 브랜드 제품 옵션 그룹 (포장 단위, 등급 등)
CREATE TABLE brand_product_option_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "포장 단위", "등급"
  is_required BOOLEAN DEFAULT FALSE,
  min_selections INT DEFAULT 0,
  max_selections INT DEFAULT 1,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES brand_products(id) ON DELETE CASCADE
);

-- 브랜드 제품 옵션
CREATE TABLE brand_product_options (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_group_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,          -- "1kg", "5kg", "프리미엄"
  price_adjustment DECIMAL(10, 2) DEFAULT 0,  -- 추가 금액
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (option_group_id) REFERENCES brand_product_option_groups(id) ON DELETE CASCADE
);
```

#### 3.2 Backend 구현
1. [ ] Models: BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption
2. [ ] Routes: `/api/brands/:brandId/products` (CRUD)
3. [ ] Routes: `/api/brands/:brandId/product-categories` (CRUD)
4. [ ] Routes: `/api/brands/:brandId/products/:productId/option-groups` (CRUD)
5. [ ] 권한 체크: Brand General/Manager만 수정 가능

#### 3.3 Frontend 구현
1. [ ] Brand General 메뉴에 "제품 관리" 추가
2. [ ] BrandProductsPage - 제품 목록/CRUD
3. [ ] BrandProductCategoriesPage - 카테고리 관리
4. [ ] 제품 상세 모달 - 옵션 그룹/옵션 관리

**산출물:**
- Brand General/Manager가 제품 등록/수정/삭제
- 제품 카테고리로 분류
- 제품별 옵션(포장 단위, 등급 등) 설정

---

### Phase 4: 제품-재료 연동 시스템

**목적:** 브랜드 제품이 연결된 레스토랑의 레시피 재료로 자동 노출

#### 4.1 연동 로직
```
Brand Product (브랜드 제품)
       │
       ▼ brand_id로 연결된 레스토랑에서
       │
Ingredient로 자동 표시 (owner_type = 'brand')
       │
       └── Restaurant Admin: View & Select만 가능
```

#### 4.2 Backend 구현
1. [ ] 기존 ingredients 테이블에 `brand_product_id` FK 추가
2. [ ] Brand Product 생성 시 자동으로 Ingredient 레코드 생성 (트리거 또는 서비스 로직)
3. [ ] Brand Product 수정 시 연결된 Ingredient 자동 업데이트
4. [ ] Restaurant의 재료 조회 API에서 브랜드 제품 포함

#### 4.3 Frontend 구현
1. [ ] RecipesPage 재료 선택에서 브랜드 재료 구분 표시
2. [ ] 브랜드 재료는 View만 가능 (수정 버튼 숨김)
3. [ ] 재료 출처 표시 (브랜드명 또는 "자체 재료")

**산출물:**
- 브랜드 제품 → 재료 자동 연동
- Restaurant Admin이 레시피에서 브랜드 재료 선택 가능
- 제품 정보 변경 시 재료 정보 자동 반영

---

### Phase 5: 재고 관리 시스템

**목적:** 실시간 재고 추적 및 자동 차감

#### 5.1 데이터베이스 설계
```sql
-- 레스토랑별 재고
CREATE TABLE inventory (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  current_quantity DECIMAL(10, 2) DEFAULT 0,
  unit VARCHAR(50),
  min_quantity DECIMAL(10, 2) DEFAULT 0,  -- 최소 재고량 (알림 기준)
  max_quantity DECIMAL(10, 2),             -- 최대 재고량
  last_stock_take_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (restaurant_id, ingredient_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 재고 거래 내역
CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT NOT NULL,
  transaction_type ENUM('in', 'out', 'adjustment', 'stock_take') NOT NULL,
  quantity DECIMAL(10, 2) NOT NULL,
  reference_type VARCHAR(50),    -- 'order', 'purchase_order', 'manual'
  reference_id INT,              -- order_id, purchase_order_id 등
  notes TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (inventory_id) REFERENCES inventory(id)
);

-- 재고 알림
CREATE TABLE stock_alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  alert_type ENUM('low_stock', 'out_of_stock', 'expiring') NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
```

#### 5.2 Backend 구현
1. [ ] Models: Inventory, InventoryTransaction, StockAlert
2. [ ] APIs: 재고 조회, 조정, 재고 실사
3. [ ] 주문 완료 시 Recipe → Ingredient → Inventory 자동 차감
4. [ ] 최소 재고 도달 시 알림 생성

#### 5.3 Frontend 구현
1. [ ] `/pos/inventory` - 재고 현황 페이지
2. [ ] `/pos/inventory/transactions` - 거래 내역
3. [ ] `/pos/inventory/stock-take` - 재고 실사
4. [ ] `/pos/inventory/alerts` - 재고 알림

**산출물:**
- 실시간 재고 추적
- 주문 시 자동 재고 차감
- 재고 부족 알림

---

### Phase 6: 발주 관리 시스템

**목적:** 브랜드 제품 및 외부 공급업체 발주 관리

#### 6.1 데이터베이스 설계
```sql
-- 공급업체 (브랜드 + 외부)
CREATE TABLE suppliers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  supplier_type ENUM('brand', 'external') NOT NULL,
  brand_id INT,                  -- supplier_type = 'brand'인 경우
  contact_name VARCHAR(100),
  contact_phone VARCHAR(50),
  contact_email VARCHAR(100),
  address TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- 공급업체-재료 매핑
CREATE TABLE supplier_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  supplier_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  unit_price DECIMAL(10, 2),
  min_order_quantity INT DEFAULT 1,
  lead_days INT DEFAULT 1,       -- 배송 소요일
  is_preferred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY (supplier_id, ingredient_id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

-- 발주서
CREATE TABLE purchase_orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  supplier_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE,
  status ENUM('draft', 'pending', 'approved', 'ordered', 'partial_received', 'received', 'cancelled') DEFAULT 'draft',
  order_date DATE,
  expected_date DATE,
  received_date DATE,
  total_amount DECIMAL(15, 2) DEFAULT 0,
  notes TEXT,
  created_by INT,
  approved_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- 발주 상세
CREATE TABLE purchase_order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  purchase_order_id INT NOT NULL,
  ingredient_id INT NOT NULL,
  brand_product_id INT,          -- 브랜드 제품인 경우
  quantity DECIMAL(10, 2) NOT NULL,
  unit VARCHAR(50),
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(15, 2) NOT NULL,
  received_quantity DECIMAL(10, 2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (purchase_order_id) REFERENCES purchase_orders(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (brand_product_id) REFERENCES brand_products(id)
);
```

#### 6.2 Backend 구현
1. [ ] Models: Supplier, SupplierIngredient, PurchaseOrder, PurchaseOrderItem
2. [ ] APIs: 공급업체 CRUD, 발주서 CRUD, 입고 처리
3. [ ] 브랜드 연결 시 자동 공급업체 생성
4. [ ] 입고 처리 → 재고 증가 연동

#### 6.3 Frontend 구현
1. [ ] `/pos/suppliers` - 공급업체 관리
2. [ ] `/pos/purchase-orders` - 발주서 목록
3. [ ] `/pos/purchase-orders/create` - 발주서 생성
4. [ ] `/pos/purchase-orders/:id` - 발주 상세/입고 처리

**산출물:**
- 공급업체 관리 (브랜드 자동 + 외부 수동)
- 발주서 생성/승인/입고 프로세스
- 입고 시 재고 자동 증가

---

### Phase 7: AI 재고 예측 (향후)

**목적:** 주문 통계 기반 재고 예측 및 자동 발주 제안

#### 구현 예정
- 과거 주문 데이터 분석
- 요일/시간/계절별 패턴 분석
- 재고 예측 알고리즘
- 자동 발주량 계산
- 낭비 분석

---

### Phase 8: Restaurant Owner 역할

**목적:** 여러 독립 레스토랑을 소유한 오너가 통합 관리할 수 있는 역할

#### 8.1 역할 정의

**Restaurant Owner의 핵심 특징:**
- 브랜드/푸드코트와 무관하게 본인 소유 레스토랑 통합 조회
- 실제 운영(POS, 주문처리)은 Restaurant Admin/Staff가 담당

#### 8.2 권한 구조

**독립 레스토랑 (brand_id = NULL) 소유 시:**
| 기능 | Restaurant Owner | Restaurant Admin |
|------|:----------------:|:----------------:|
| 레스토랑 생성/삭제 | O | X |
| 레스토랑 설정 변경 | O | O |
| 메뉴/카테고리/옵션 관리 | O | O |
| 직원(Staff) 관리 | O | O |
| 매출/리포트 조회 | O (통합) | O (해당 매장) |
| POS 터미널 사용 | X | O |
| 주문 접수/처리 | X | O |

**브랜드 소속 레스토랑 (brand_id = 있음) 소유 시:**
| 기능 | Restaurant Owner |
|------|:----------------:|
| 매출/리포트 조회 | O (읽기 전용) |
| 그 외 모든 관리 | X (Brand General 권한) |
| POS 터미널 사용 | X |

#### 8.3 데이터베이스 설계
```sql
-- Restaurant 테이블에 owner_id 추가
ALTER TABLE restaurants ADD COLUMN owner_id INT NULL;
ALTER TABLE restaurants ADD FOREIGN KEY (owner_id) REFERENCES users(id);

-- User role ENUM에 'Restaurant Owner' 추가
ALTER TABLE users MODIFY COLUMN role ENUM(
  'System Admin',
  'Foodcourt General',
  'Brand General',
  'Foodcourt Manager',
  'Brand Manager',
  'Restaurant Owner',  -- 신규
  'Restaurant Admin',
  'Staff'
);
```

#### 8.4 구현 항목
1. [ ] User role에 'Restaurant Owner' 추가
2. [ ] Restaurant 테이블에 owner_id 필드 추가
3. [ ] Restaurant Owner 전용 대시보드 (통합 매출/리포트)
4. [ ] 레스토랑 전환 기능 (드롭다운)
5. [ ] 독립 레스토랑 생성 기능
6. [ ] 브랜드 소속 레스토랑 연결 (Brand General이 owner_id 설정)

#### 8.5 시나리오

**독립 레스토랑 운영:**
```
김사장 (Restaurant Owner)
├── 김사장 치킨집 (독립) → 직접 생성, 전체 관리
├── 김사장 카페 (독립) → 직접 생성, 전체 관리
└── 통합 대시보드에서 두 매장 합산 매출 조회
```

**브랜드 레스토랑 소유:**
```
이사장 (Restaurant Owner)
├── BBQ 강남점 (Brand: BBQ) → Brand General이 owner_id 연결
│   └── 매출 조회만 가능, 관리는 BBQ본사
└── 통합 대시보드에서 조회
```

**독립 → 브랜드 전환:**
```
독립 치킨집 → BBQ 프랜차이즈 가입
- owner_id: 유지
- brand_id: BBQ 추가
- 관리 권한: Brand General로 이전
```

---

### Phase 9: 구독 서비스 구조 개편

**목적:** 역할별 명확한 과금 체계 수립

#### 9.1 과금 원칙

**핵심:** 각 역할이 자기 기능 사용료를 직접 지불

#### 9.2 과금 구조

| 역할 | 과금 유형 |
|------|----------|
| Brand General | 기본 무료 + 추가 기능 유료 |
| Foodcourt General | 기본 무료 + 추가 기능 유료 |
| Restaurant Owner | 유료 (역할 사용료) |
| Brand Manager | 유료 (역할 사용료) |
| Foodcourt Manager | 유료 (역할 사용료) |
| Restaurant Admin | 유료 (역할 사용료) |
| Staff | 유료 (역할 사용료) |

#### 9.3 무료 제공 범위 (General 역할)

**Brand General 무료 기능:**
- 브랜드 생성/관리
- 소속 레스토랑 조회
- 기본 대시보드
- Brand Manager 생성

**Foodcourt General 무료 기능:**
- 푸드코트 생성/관리
- 소속 레스토랑 조회
- 기본 대시보드
- Foodcourt Manager 생성

**유료 추가 기능 (예시):**
- 고급 분석/리포트
- 대량 데이터 내보내기
- API 접근
- 우선 지원

#### 9.4 구현 항목
1. [ ] 역할별 기본/유료 기능 정의
2. [ ] 구독 플랜 테이블 재설계 (역할 기반)
3. [ ] 무료 기능 제한 로직
4. [ ] 유료 기능 활성화 체크
5. [ ] 과금 대시보드 (System Admin용)

---

### 개발 우선순위 요약

| 순서 | Phase | 내용 | 상태 |
|------|-------|------|--------|
| 1 | Phase 3 | 브랜드 제품 관리 | ✅ 완료 (2025-12-15) |
| 2 | Phase 4 | 제품-재료 연동 | ✅ 완료 (2025-12-15) |
| 3 | Phase 5 | 재고 관리 | ✅ 완료 (2025-12-19) |
| 4 | Phase 6 | 발주 관리 | 📝 설계 완료 (2026-01-06), 다음 개발 |
| 5 | Phase 7 | AI 재고 예측 | 대기 중 |
| 6 | Phase 8 | Restaurant Owner 역할 | 대기 중 |
| 7 | Phase 9 | 구독 서비스 구조 개편 | 대기 중 |

**Phase 6 (발주 관리) 상세 설계 문서:** `/var/www/docs/PURCHASE_ORDER_SYSTEM.md`

---

## 📅 기타 예정된 작업

### 브랜드 통합 고객 포인트/등급 시스템 (보류)

**목적:** Brand General이 소속 레스토랑들의 고객 포인트/등급을 통합 또는 분리 관리

*(상세 내용은 별도 문서로 분리 예정)*

### General 사용자 페이지 구현 (보류)

- Foodcourt/Brand General 전용 대시보드
- Manager 관리 페이지
- 권한 관리 시스템

### 구독 관리 시스템 (보류)

- 구독 활성화/비활성화
- UI Routes 제어
- 결제 연동

---

## 🗄️ 데이터베이스 스키마

### plan_templates
```sql
CREATE TABLE plan_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  base_price_monthly DECIMAL(10, 2) NOT NULL,
  base_price_annual DECIMAL(10, 2) NOT NULL,
  order_limit INT DEFAULT 1000 COMMENT '-1 for unlimited',
  menu_item_limit INT DEFAULT 50 COMMENT '-1 for unlimited',
  staff_limit INT DEFAULT 5 COMMENT '-1 for unlimited',
  category ENUM('basic', 'custom') DEFAULT 'basic',
  plan_target ENUM('restaurant', 'brand', 'foodcourt') DEFAULT 'restaurant',
  features TEXT,
  included_modules JSON,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### addon_modules
```sql
CREATE TABLE addon_modules (
  id INT PRIMARY KEY AUTO_INCREMENT,
  module_code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('basic', 'advanced', 'revenue', 'operation', 'analytics') NOT NULL,
  target_user_type ENUM('restaurant', 'brand', 'foodcourt', 'all') DEFAULT 'restaurant',
  base_price_monthly DECIMAL(10, 2) DEFAULT 0.00,
  base_price_annual DECIMAL(10, 2) DEFAULT 0.00,
  ui_routes JSON COMMENT 'Array of allowed UI routes',
  features JSON COMMENT 'Feature descriptions for display',
  dependencies JSON COMMENT 'Required module codes',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 현재 플랜 목록 (9개)
```
Restaurant Plans:
1. Basic Plan (RM 29/month)
2. Professional Plan (RM 59/month)
3. Enterprise Plan (RM 99/month)

Brand Plans:
10. Brand Basic (RM 149/month)
11. Brand Professional (RM 299/month)
12. Brand Enterprise (RM 499/month)

Foodcourt Plans:
13. Foodcourt Basic (RM 149/month)
14. Foodcourt Professional (RM 299/month)
15. Foodcourt Enterprise (RM 499/month)
```

### 모듈 분류 (target_user_type 기준)

**Restaurant Modules:**
- pos_terminal, menu_management, customer_management
- table_management, kitchen_display, customer_display
- staff_management, reports_analytics, invoice_management
- promotions, support_tickets, activity_logs
- mobile_ordering, recipe_management, advanced_inventory

**Brand Modules:**
- brand_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Foodcourt Modules:**
- foodcourt_management, manager_dashboard, operation_inquiry
- user_management, subscription_management, system_settings

**Shared Modules (all):**
- restaurant_management

---

## 📁 주요 파일 목록

### Backend Models
```
/var/www/dev-backend/models/
├── PlanTemplate.js           # 구독 플랜 모델
├── AddonModule.js            # 애드온 모듈 모델
├── Restaurant.js             # 레스토랑 모델
├── User.js                   # 사용자 모델 (Manager 포함)
└── index.js                  # 모델 연관관계 정의
```

### Backend Routes
```
/var/www/dev-backend/routes/
├── plans.js                  # 플랜 관리 API
├── restaurants.js            # 레스토랑 관리 API
└── managers.js               # 매니저 관리 API (향후 확장 예정)
```

### Frontend Pages
```
/var/www/dev-frontend/src/pages/Admin/
├── PlansPage.tsx             # 플랜 관리 페이지
├── RestaurantsPage.tsx       # 레스토랑 관리 페이지
├── ManagersPage.tsx          # 매니저 관리 페이지 (General만)
└── SubscriptionsPage.tsx     # 구독 관리 페이지
```

### Frontend Hooks
```
/var/www/dev-frontend/src/hooks/
└── useAllowedRoutes.ts       # 라우트 권한 체크 Hook
```

---

## 🔗 관련 페이지

### 개발 환경
- **Admin Plans:** https://dev.purplehere.com/pos/admin/plans
- **Admin Restaurants:** https://dev.purplehere.com/pos/admin/restaurants
- **Admin Managers:** https://dev.purplehere.com/pos/admin/managers
- **Admin Subscriptions:** https://dev.purplehere.com/pos/admin/subscriptions

### 프로덕션 환경
- **URL:** https://orderhere.wor-pro.com

---

## 📝 개발 노트

### 주요 설계 결정사항

1. **General vs Manager 구분**
   - General: 구독 관리, Manager 생성/관리
   - Manager: 실무 작업, 구독 공유

2. **플랜 분리 이유**
   - Restaurant Plans: 개별 레스토랑 소유자용
   - Brand Plans: 다중 브랜드 관리용
   - Foodcourt Plans: 푸드코트 관리용
   - 각각 다른 가격 책정 및 기능 제공

3. **모듈 분류 기준**
   - target_user_type으로 명확히 구분
   - 'all'은 여러 타입이 공통으로 사용하는 모듈

4. **UI/UX 개선 원칙**
   - 기본값 자동 설정으로 사용자 편의성 증대
   - Role 변경 시 관련 필드 자동 업데이트
   - 동적 필터링으로 혼란 최소화

---

## 🔧 트러블슈팅 히스토리

### 문제 1: Brand General 사용자 레스토랑 필터링 미작동 (2025-11-20 해결)

**증상:**
- Brand General 사용자가 연결된 2개 레스토랑만 봐야 하는데 전체 9개 레스토랑 표시
- URL: https://dev.purplehere.com/pos/manager/restaurants
- DB `restaurant_managers` 테이블에는 정상적으로 연결되어 있음

**근본 원인:**
```typescript
// 문제 코드: RestaurantsPage.tsx:462
const token = localStorage.getItem('token'); // ❌ null 반환
// 실제 사용: 'auth_token' 키 사용 중
```
- localStorage 키 불일치로 인해 Authorization 헤더가 `Bearer null`로 전송됨
- 백엔드가 익명 사용자로 인식하여 role-based 필터링 미작동

**해결 방법:**
```typescript
// 수정: RestaurantsPage.tsx:462
const token = localStorage.getItem('auth_token'); // ✅ 정상 작동
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/Manager/RestaurantsPage.tsx` (Line 462)
- `/var/www/production-backend/routes/restaurants.js` (optionalAuth 미들웨어 추가)

**디버깅 팁:**
1. 백엔드 로그에서 Authorization header 확인
2. localStorage 키 이름 일치 여부 확인
3. 빌드 파일에서 실제 사용 키 검증: `grep 'localStorage.getItem' build/static/js/main.*.js`
4. 네트워크 탭에서 실제 헤더 값 확인

**예방책:**
- localStorage 키를 상수로 관리
- API 헬퍼 함수로 인증 헤더 통일
- 타입스크립트 유틸리티 함수 사용

### 문제 2: PM2 Port 충돌 무한 재시작 (2025-12-16 해결)

**증상:**
- dev-backend PM2 프로세스가 "Port 3001 is already in use" 에러로 무한 재시작
- PM2 로그에 반복적인 재시작 기록

**근본 원인:**
- `server.js`와 `app.js` 양쪽에서 `startServer()` 호출
- server.js가 app.js를 require할 때 app.js도 서버를 시작하려고 시도
- 결과적으로 같은 포트에 두 번 바인딩 시도

**해결 방법:**
```javascript
// app.js 수정
if (require.main === module) {
  startServer();
}
module.exports = { app, startServer };
```

**PM2 설정 추가 (ecosystem.config.js):**
```javascript
{
  max_restarts: 10,      // 최대 재시작 횟수 제한
  min_uptime: 5000,      // 최소 실행 시간
  restart_delay: 4000,   // 재시작 간 딜레이
  kill_timeout: 5000     // 종료 타임아웃
}
```

**수정 파일:**
- `/var/www/dev-backend/app.js`
- `/var/www/dev-backend/ecosystem.config.js`
- `/var/www/dev-backend/server.js`
- `/var/www/dev-backend/restart-dev.sh` (포트 정리 스크립트)

### 문제 3: NotificationSettingsPage 토큰 키 불일치 (2025-12-16 해결)

**증상:**
- 로그인 상태인데 "No authentication token found" 에러 표시
- Save Settings 버튼 클릭 시 저장 실패

**근본 원인:**
- NotificationSettingsPage에서 `localStorage.getItem('token')` 사용
- 프로젝트 전체는 `localStorage.getItem('auth_token')` 사용
- 키 불일치로 토큰이 null 반환

**해결 방법:**
```typescript
// 수정: NotificationSettingsPage.tsx
const token = localStorage.getItem('auth_token'); // 'token' → 'auth_token'
```

**수정 파일:**
- `/var/www/dev-frontend/src/pages/NotificationSettings/NotificationSettingsPage.tsx` (3곳 수정)

---

## 🐛 알려진 이슈

**현재 알려진 이슈 없음**

---

## 📞 연락처

**프로젝트:** Purple POS System
**개발 환경:** Development Server
**데이터베이스:** purple_dev_db (MySQL)
**마지막 업데이트:** 2026-01-06

---

## 📋 개발 예정: 재료/재고/발주 시스템 (v3.0)

> **기획일:** 2026-01-28
> **상태:** 검토 중

### 1. 현재 상태 (AS-IS)

| 구성요소 | 현재 상태 | 비고 |
|---------|----------|------|
| Supplier | ✅ 구현됨 | Brand/Restaurant별 공급업체 관리 |
| Ingredient | ✅ 구현됨 | PAR Level, track_stock 지원 |
| Inventory | ✅ 구현됨 | Transaction, Batch, StockTake |
| BrandProduct | ✅ 구현됨 | Ingredient 동기화 지원 |
| PurchaseOrder | ❌ 미구현 | InventoryBatch에 FK만 존재 |
| PurchaseInvoice | ❌ 미구현 | 기존 Invoice는 SaaS 구독용 |
| SOA (월정산) | ❌ 미구현 | - |
| SupplierProduct | ❌ 미구현 | 공급업체 판매 품목 |

### 2. 목표 구조 (TO-BE)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      SUPPLIER (공급업체)                             │
│  - SupplierProduct 등록/관리                                        │
│  - Live Orders로 발주 수신                                          │
│  - PurchaseInvoice 발행 → SOA 월정산                                │
└─────────────────────────────────────────────────────────────────────┘
                                │
                     (거래 관계 승인)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   BRAND GENERAL (본사)                               │
│  - Supplier Product → Ingredient로 등록                             │
│  - BrandProduct 관리 (가맹점에 공급) ← 기존                          │
│  - 가맹점 발주 Live Orders로 수신                                    │
│  - 외부 Supplier에게 발주 가능                                       │
└─────────────────────────────────────────────────────────────────────┘
                                │
                     (Brand 소속)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                RESTAURANT ADMIN (가맹점/매장)                        │
│  - BrandProduct 또는 SupplierProduct → Ingredient로 등록            │
│  - 재고 관리 (track_stock=true인 Ingredient)                        │
│  - 발주 생성 → Brand 또는 Supplier에게 전송                          │
│  - PurchaseInvoice 수신 → 결제                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### 3. 핵심 개념

#### 3.1 역할별 정의

| 역할 | 정의 | 공급자 역할 | 구매자 역할 |
|------|------|-----------|-----------|
| Supplier | 외부 공급업체 | ✅ SupplierProduct 판매 | ❌ |
| Brand General | 프랜차이즈 본사 | ✅ BrandProduct 공급 | ✅ Supplier에게 발주 |
| Restaurant Admin | 개별 매장 | ❌ | ✅ Brand/Supplier에게 발주 |

#### 3.2 데이터 계층

```
[공급층] SupplierProduct / BrandProduct
              ↓ "검색 → 선택 → 등록"
[재료층] Ingredient (source_type: manual/supplier_product/brand_product)
              ↓ track_stock = true
[재고층] InventoryTransaction / InventoryBatch / StockAlert
              ↓ "발주 생성"
[발주층] PurchaseOrder → PurchaseInvoice → SOA
```

#### 3.3 기존 Invoice vs PurchaseInvoice

| 항목 | Invoice (기존) | PurchaseInvoice (신규) |
|------|---------------|----------------------|
| 용도 | SaaS 구독료 | B2B 물품 발주 대금 |
| 발급자 | System Admin, Brand | Supplier, Brand |
| 결제자 | Restaurant | Restaurant, Brand |
| 연결 대상 | PlanTemplate | PurchaseOrder |

### 4. 신규 테이블

| 테이블 | 용도 |
|--------|------|
| supplier_products | 공급업체 판매 품목 |
| supplier_product_categories | 공급업체 상품 카테고리 |
| trade_relationships | 거래 관계 (구매자↔판매자) |
| purchase_orders | 발주서 |
| purchase_order_items | 발주 품목 |
| purchase_invoices | 발주 청구서 |
| purchase_invoice_items | 청구 품목 |
| statements_of_account | SOA 월정산 |
| soa_payments | SOA 결제 기록 |

### 5. 기존 테이블 수정

| 테이블 | 수정 내용 |
|--------|----------|
| ingredients | source_type, supplier_product_id 추가 |
| suppliers | is_external, linked_brand_id, user_id 추가 |
| inventory_batches | purchase_order_id FK 연결 |

### 6. 거래 관계 플로우

#### 6.1 거래 관계 규칙

| 관계 | 신청 필요 | 설명 |
|------|----------|------|
| Brand ↔ Restaurant | ❌ 자동연결 | Restaurant 생성 시 소속 Brand와 자동 연결, 해제 불가 |
| Supplier ↔ Restaurant | ✅ 신청/승인 | Restaurant에서 신청 → Supplier에서 승인 |
| Supplier ↔ Brand | ✅ 신청/승인 | Brand에서 신청 → Supplier에서 승인 |

#### 6.2 거래 상태

| 상태 | Badge 색상 | 가능한 액션 |
|------|-----------|-----------|
| 자동연결 (Brand) | 회색 Default | 발주하기 |
| 승인대기 | 노랑 Pending | 취소 |
| 승인됨 | 초록 Approved | 발주하기, 연결해제 |
| 거절됨 | 빨강 Rejected | 재신청 |
| 중단됨 | 회색 Suspended | - |

#### 6.3 Restaurant > Suppliers 페이지 UI

```
┌─────────────────────────────────────────────────────────────────┐
│  Suppliers                                    [+ 거래 신청]     │
├─────────────────────────────────────────────────────────────────┤
│  [연결된 공급업체]                                               │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Brand HQ (본사)              [자동연결] [발주하기]          │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ABC Foods                    [승인됨]   [발주하기]          │ │
│  └────────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Fresh Produce Co.            [승인대기]                    │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.4 Supplier > Customers 페이지 UI (거래 신청 관리)

```
┌─────────────────────────────────────────────────────────────────┐
│  Customers                                                      │
├─────────────────────────────────────────────────────────────────┤
│  [Tab: 거래 신청 (2)] [Tab: 연결된 거래처]                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Restaurant ABC                                              │ │
│  │ Brand: Purple Cafe | 신청일: 2026-01-28                    │ │
│  │                                    [Reject]  [Approve]     │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.5 승인 시 거래 조건 설정

- 결제 조건: 월정산(Monthly) / 건별 후불(Net 30) / 선결제(COD)
- 결제 기한: SOA 발행 후 N일
- 신용 한도: RM (0 = 무제한)

### 7. UI/UX 개발 가이드 (필수 준수)

#### 7.1 재사용할 기존 컴포넌트

| 용도 | 컴포넌트 | 위치 |
|------|---------|------|
| 모달 | Modal | components/common/Modal |
| 버튼 | Button | components/common/Button |
| 테이블 | Table | components/common/Table |
| 뱃지 | StatusBadge | components/common/StatusBadge |
| 카드 | Card | components/common/Card |
| 검색 | SearchInput | components/common/SearchInput |
| 탭 | Tabs | components/common/Tabs |
| 폼 | Input, Select | components/common/Form |
| 확인창 | ConfirmDialog | components/common/ConfirmDialog |

#### 7.2 참고할 기존 페이지

| 신규 페이지 | 참고할 기존 페이지 |
|------------|------------------|
| Suppliers 목록 | SuppliersPage.tsx |
| 거래 신청 모달 | AddSupplierModal 패턴 |
| Live Orders | OrdersPage.tsx |
| Invoices | InvoicesPage.tsx, BrandInvoicesPage.tsx |

#### 7.3 절대 금지

- 새 버튼 스타일 만들기
- 새 모달 디자인 만들기
- 새 색상 추가
- 기존 컴포넌트 복제 후 수정
- inline style 사용

### 8. 개발 순서 (상세)

> **원칙**: 각 단계별 DB 연동 + API 테스트 + UI 테스트 완료 후 다음 단계 진행

#### Phase 1: 기반 정비

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 1-1 | Track Stock 토글 복구 | Ingredient 카드에서 토글 ON/OFF → DB 반영 확인 | ⬜ |
| 1-2 | Recipes 메뉴 클릭 버그 | Brand General 좌측 메뉴 정상 작동 확인 | ⬜ |
| 1-3 | dev 서버 빌드/배포 | 프론트엔드 빌드 성공, 페이지 정상 로드 | ⬜ |

#### Phase 2: DB 테이블 생성

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 2-1 | suppliers 테이블 수정 | is_external, linked_brand_id, user_id 컬럼 추가 확인 | ⬜ |
| 2-2 | ingredients 테이블 수정 | source_type, supplier_product_id 컬럼 추가 확인 | ⬜ |
| 2-3 | supplier_product_categories 생성 | 테이블 생성, CRUD 테스트 | ⬜ |
| 2-4 | supplier_products 생성 | 테이블 생성, FK 연결, CRUD 테스트 | ⬜ |
| 2-5 | trade_relationships 생성 | 테이블 생성, unique key 테스트 | ⬜ |
| 2-6 | purchase_orders 생성 | 테이블 생성, 상태 ENUM 확인 | ⬜ |
| 2-7 | purchase_order_items 생성 | 테이블 생성, FK 연결 | ⬜ |
| 2-8 | purchase_invoices 생성 | 테이블 생성, 상태 ENUM 확인 | ⬜ |
| 2-9 | purchase_invoice_items 생성 | 테이블 생성, FK 연결 | ⬜ |
| 2-10 | statements_of_account 생성 | 테이블 생성, unique key (period) 테스트 | ⬜ |
| 2-11 | soa_payments 생성 | 테이블 생성, FK 연결 | ⬜ |
| 2-12 | inventory_batches FK 추가 | purchase_order_id FK 연결 확인 | ⬜ |

#### Phase 3: Supplier 역할 및 Product

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 3-1 | Supplier 역할 추가 | User role_id 추가, 권한 설정 | ⬜ |
| 3-2 | SupplierProductCategory Model | Sequelize 모델, API CRUD 테스트 | ⬜ |
| 3-3 | SupplierProduct Model | Sequelize 모델, API CRUD 테스트 | ⬜ |
| 3-4 | Supplier Products API | GET/POST/PUT/DELETE 전체 테스트 | ⬜ |
| 3-5 | Supplier Dashboard 페이지 | 페이지 로드, 데이터 표시 확인 | ⬜ |
| 3-6 | Supplier Products 페이지 | 목록 조회, 생성, 수정, 삭제 전체 테스트 | ⬜ |

#### Phase 4: 거래 관계

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 4-1 | TradeRelationship Model | Sequelize 모델 생성 | ⬜ |
| 4-2 | Trade API (조회) | GET 거래 관계 목록 | ⬜ |
| 4-3 | Trade API (신청) | POST 거래 신청 → status='pending' | ⬜ |
| 4-4 | Trade API (승인/거절) | PUT 승인 → status='approved', 거래조건 저장 | ⬜ |
| 4-5 | Brand 자동 연결 로직 | Restaurant 생성 시 Brand 자동 연결 확인 | ⬜ |
| 4-6 | Restaurant Suppliers 페이지 | 연결된 공급업체 목록, 상태별 표시 | ⬜ |
| 4-7 | 거래 신청 모달 | 공급업체 검색 → 신청 → DB 저장 확인 | ⬜ |
| 4-8 | Supplier Customers 페이지 | 거래 신청 목록, 승인/거절 버튼 | ⬜ |
| 4-9 | 거래 승인 모달 | 거래조건 설정 → 승인 → DB 저장 확인 | ⬜ |
| 4-10 | Brand Suppliers 페이지 | Brand General용 공급업체 관리 | ⬜ |

#### Phase 5: Supplier Product → Ingredient 연동

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 5-1 | Ingredient Model 수정 | source_type, supplier_product_id 필드 추가 | ⬜ |
| 5-2 | 연결된 공급업체 Product 조회 API | 승인된 거래처의 Product만 조회 | ⬜ |
| 5-3 | "From Supplier Product" 모달 | 공급업체 선택 → Product 검색 → 선택 | ⬜ |
| 5-4 | Ingredient 생성 로직 | source_type 자동 설정, track_stock 연동 | ⬜ |
| 5-5 | Restaurant Ingredients 페이지 확장 | [+ From Supplier/Brand] 버튼 동작 | ⬜ |
| 5-6 | Brand Ingredients 페이지 확장 | [+ From Supplier Product] 버튼 동작 | ⬜ |
| 5-7 | Inventory 페이지 확장 | [+ From Supplier/Brand] 버튼 동작 | ⬜ |

#### Phase 6: 발주 시스템

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 6-1 | PurchaseOrder Model | Sequelize 모델 생성 | ⬜ |
| 6-2 | PurchaseOrderItem Model | Sequelize 모델 생성 | ⬜ |
| 6-3 | PO API (CRUD) | 생성/조회/수정/삭제 테스트 | ⬜ |
| 6-4 | PO API (상태변경) | submit/confirm/ship/receive 테스트 | ⬜ |
| 6-5 | PO 번호 자동생성 | PO-{YYMMDD}{NNN} 포맷 확인 | ⬜ |
| 6-6 | Restaurant Ordering 페이지 | 발주 목록, 상태별 필터 | ⬜ |
| 6-7 | 발주 생성 모달 | 공급업체 선택 → 품목 추가 → 저장 | ⬜ |
| 6-8 | 발주 제출 | Submit → status='submitted' → 알림 | ⬜ |
| 6-9 | Supplier Live Orders 페이지 | 신규 주문 목록, 상태별 탭 | ⬜ |
| 6-10 | 주문 확인/처리 | Confirm → Processing → Ship 상태 변경 | ⬜ |
| 6-11 | Brand Live Orders 페이지 | 가맹점 발주 수신 | ⬜ |
| 6-12 | 입고 처리 모달 | 품목별 입고수량 입력 → 저장 | ⬜ |
| 6-13 | InventoryBatch 자동 생성 | 입고 완료 시 Batch 생성 확인 | ⬜ |
| 6-14 | InventoryTransaction 생성 | type='purchase' 트랜잭션 확인 | ⬜ |
| 6-15 | current_stock 업데이트 | Ingredient 재고 증가 확인 | ⬜ |

#### Phase 7: 청구/결제 시스템

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 7-1 | PurchaseInvoice Model | Sequelize 모델 생성 | ⬜ |
| 7-2 | PurchaseInvoiceItem Model | Sequelize 모델 생성 | ⬜ |
| 7-3 | PI API (CRUD) | 생성/조회/수정 테스트 | ⬜ |
| 7-4 | PI API (상태변경) | issue/submit-payment/confirm 테스트 | ⬜ |
| 7-5 | PI 번호 자동생성 | PI-{prefix}{YYMMDD}{NNN} 포맷 확인 | ⬜ |
| 7-6 | 자동 Invoice 발행 | 입고 완료 → PI 자동 생성 (설정에 따라) | ⬜ |
| 7-7 | Supplier Invoices 페이지 | 청구서 목록, 발행, 결제확인 | ⬜ |
| 7-8 | Restaurant Purchase Invoices 탭 | 받은 청구서 목록 | ⬜ |
| 7-9 | 결제 제출 모달 | 결제방법, 참조번호, 영수증 업로드 | ⬜ |
| 7-10 | 결제 확인/거절 | Supplier측 확인 → status='paid' | ⬜ |

#### Phase 8: SOA 월정산

| # | 작업 | 테스트 항목 | 완료 |
|---|------|-----------|:----:|
| 8-1 | StatementOfAccount Model | Sequelize 모델 생성 | ⬜ |
| 8-2 | SOAPayment Model | Sequelize 모델 생성 | ⬜ |
| 8-3 | SOA API (생성) | 수동 SOA 생성 테스트 | ⬜ |
| 8-4 | SOA API (조회) | 판매자/구매자별 조회 | ⬜ |
| 8-5 | SOA 자동 생성 로직 | 월정산 거래처 Invoice 묶기 | ⬜ |
| 8-6 | 이월 잔액 계산 | 전월 미납분 자동 계산 | ⬜ |
| 8-7 | Cron Job 설정 | 매월 1일 자동 생성 | ⬜ |
| 8-8 | Supplier SOA 페이지 | SOA 목록, 발행, 결제기록 | ⬜ |
| 8-9 | Restaurant SOA 페이지 | SOA 조회, 결제 | ⬜ |
| 8-10 | 부분 결제 처리 | partial_paid 상태 테스트 | ⬜ |
| 8-11 | 연체 처리 | due_date 경과 → overdue 상태 | ⬜ |

### 9. 결정 필요 사항

1. **Supplier 로그인**: 새 역할 ID vs 별도 Portal
2. **결제 수단**: 은행 이체만 / 온라인 결제 추가
3. **신용 한도**: 거래처별 설정 여부
4. **알림 채널**: 이메일/SMS/인앱

### 10. 시스템 부하 체크리스트

| # | 항목 | 확인 내용 | 상태 |
|---|------|----------|:----:|
| 1 | DB 테이블 증가 | 11개 테이블 추가 시 용량/성능 | ⬜ |
| 2 | 인덱스 설계 | 조회 성능용 인덱스 | ⬜ |
| 3 | Cron Job 부하 | SOA 월정산 자동 생성 | ⬜ |
| 4 | 동시 접속 | Supplier Portal 추가 | ⬜ |
| 5 | API 응답 시간 | 발주/Live Orders 조회 | ⬜ |
| 6 | 파일 스토리지 | 영수증 이미지 저장 | ⬜ |
| 7 | 알림 발송 | 대량 발송 시 부하 | ⬜ |
| 8 | 트랜잭션 처리 | 발주→입고→Invoice 연쇄 | ⬜ |
| 9 | 권한 체계 | Supplier 역할 추가 영향 | ⬜ |
| 10 | 데이터 마이그레이션 | 기존 데이터 호환성 | ⬜ |

