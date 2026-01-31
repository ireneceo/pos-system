# Phase A-3+ 최종 기획 문서

**작성일:** 2026-01-31
**최종 수정:** 2026-01-31
**상태:** 개발 진행

---

## 목차

1. [전체 UI/UX 흐름](#1-전체-uiux-흐름)
2. [Task 1: Addon Module 정리](#2-task-1-addon-module-정리)
3. [Task 2: 랜딩 페이지 (Pricing, Contact, Demo)](#3-task-2-랜딩-페이지)
4. [Task 3: 7일 무료 체험 시스템](#4-task-3-7일-무료-체험-시스템)
5. [Task 4: 미결제 서비스 차단 구현](#5-task-4-미결제-서비스-차단-구현)
6. [Task 5: BrandGeneral/FoodcourtGeneral 구독 플랜 분리](#6-task-5-구독-플랜-분리)
7. [구현 순서 및 체크리스트](#7-구현-순서-및-체크리스트)

---

## 1. 전체 UI/UX 흐름

### 1.1 신규 고객 유입 → 서비스 이용 흐름

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           [Landing Page: purplehere.com]                     │
│                                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │ Pricing  │    │ Contact  │    │  Demo    │    │  Login   │             │
│   │  /pricing│    │ /contact │    │  /demo   │    │  /login  │             │
│   └────┬─────┘    └────┬─────┘    └────┬─────┘    └────┬─────┘             │
│        │               │               │               │                    │
│        │               │               │               │                    │
│        ▼               ▼               ▼               ▼                    │
│   가격 확인        문의 제출       데모 체험       기존 고객 로그인          │
│        │               │               │                                    │
│        └───────┬───────┘               │                                    │
│                ▼                       │                                    │
│        System Admin이                  │                                    │
│        계정 생성 (수동)                │                                    │
│                │                       │                                    │
│                ▼                       │                                    │
│   ┌────────────────────────┐           │                                    │
│   │ 트라이얼 옵션 선택     │           │                                    │
│   │ (System Admin만 가능)  │           │                                    │
│   │                        │           │                                    │
│   │ ☑ 7일 무료 체험 시작  │           │                                    │
│   │ ☐ 즉시 결제 시작      │           │                                    │
│   └──────────┬─────────────┘           │                                    │
│              │                         │                                    │
│              ▼                         │                                    │
│   ┌────────────────────────────────────┴────────────────┐                   │
│   │                    서비스 이용 시작                  │                   │
│   └─────────────────────────┬───────────────────────────┘                   │
│                             │                                                │
└─────────────────────────────┼────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         [서비스 이용 중]                                     │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ 트라이얼 기간 (7일)                                                  │   │
│   │                                                                      │   │
│   │  Day 1-4: 전체 기능 이용 가능                                       │   │
│   │  Day 5: "트라이얼 3일 남음" 알림                                    │   │
│   │  Day 7: 트라이얼 종료 → 첫 인보이스 자동 발행                       │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                              │                                               │
│                              ▼                                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │ 정식 구독 기간                                                       │   │
│   │                                                                      │   │
│   │  구독 시작일마다 자동 인보이스 발행 (invoiceScheduler.js 동작)      │   │
│   │                                                                      │   │
│   │  미결제 시 단계적 제한:                                              │   │
│   │  ├─ 1~3일 연체: Warning (경고 배너)                                 │   │
│   │  ├─ 4~7일 연체: Partial (POS, Reports 등 제한)                      │   │
│   │  └─ 8일+ 연체: Blocked (Invoice 페이지만 접근 가능)                 │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 역할별 레스토랑 추가 시 트라이얼 옵션

| 역할 | 레스토랑 추가 | 트라이얼 옵션 | 이유 |
|------|:------------:|:------------:|------|
| System Admin | O | **O** | 신규 고객 유치 목적 |
| Brand General | O | **X** | 이미 본인이 구독료 지불 중, 하위 레스토랑은 "지점" 개념 |
| Foodcourt General | O | **X** | 이미 본인이 구독료 지불 중, 하위 레스토랑은 "입점" 개념 |

---

## 2. Task 1: Addon Module 정리

### 2.1 현재 상태 분석

**활성화된 모듈 25개 중 미개발 5개 확인:**

| 모듈코드 | 대상 | 사이드바 메뉴 상태 | 조치 |
|---------|------|-------------------|------|
| table_management | restaurant | **메뉴 없음** | 비활성화 |
| purchase_order | restaurant | Coming Soon | 비활성화 |
| ai_prediction | restaurant | **메뉴 없음** | 비활성화 |
| subscription_management | brand | Coming Soon | 비활성화 |
| system_settings | brand | **메뉴 없음** | 비활성화 |

### 2.2 구현 내용

**DB 업데이트:**
```sql
UPDATE addon_modules SET is_active = 0
WHERE module_code IN (
  'table_management',
  'purchase_order',
  'ai_prediction',
  'subscription_management',
  'system_settings'
);
```

### 2.3 수정 파일

- DB 데이터 업데이트만 (모델 변경 없음)

---

## 3. Task 2: 랜딩 페이지

### 3.1 GNB (Global Navigation Bar)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Logo]              Pricing    Demo    Contact              [Login]    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Pricing 페이지 (/pricing)

**구성:**
```
[GNB]

[Hero Section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Simple, Transparent Pricing
     Choose the plan that fits your business
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Plan Type Tabs]
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│  Restaurant    │ │  Brand         │ │  Foodcourt     │
└────────────────┘ └────────────────┘ └────────────────┘

[Plan Cards - Restaurant 선택 시]
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Basic          │ │  Professional   │ │  Enterprise     │
│  MYR 99/month   │ │  MYR 199/month  │ │  Contact Us     │
│                 │ │  ★ Popular     │ │                 │
│ ────────────── │ │ ────────────── │ │ ────────────── │
│ ✓ POS Terminal │ │ ✓ All Basic    │ │ ✓ All Pro      │
│ ✓ Menu Mgmt    │ │ ✓ Mobile Order │ │ ✓ API Access   │
│ ✓ Kitchen KDS  │ │ ✓ Recipe Mgmt  │ │ ✓ Custom Dev   │
│ ✓ Reports      │ │ ✓ Inventory    │ │ ✓ Priority     │
│ ...            │ │ ...            │ │    Support      │
│                 │ │                 │ │                 │
│ [Contact Us]    │ │ [Contact Us]    │ │ [Contact Us]    │
└─────────────────┘ └─────────────────┘ └─────────────────┘

[FAQ Section]
Q: How do I sign up?
A: Contact our sales team. We'll set up your account personally.

Q: Is there a free trial?
A: Yes! We offer a 7-day free trial for all plans.

Q: What payment methods do you accept?
A: Bank transfer, Credit card (coming soon), PayPal (coming soon)

[CTA Section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Ready to get started?
     [Contact Us] → /contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Footer]
```

**데이터:**
- `GET /api/public/plans` (owner_type=system, is_active=true)
- 인증 불필요 (공개 API)

### 3.3 Contact 페이지 (/contact)

**구성:**
```
[GNB]

[Hero Section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Get in Touch
     Our team is here to help you get started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Two Column]
┌──────────────────────────┬────────────────────────────┐
│                          │                            │
│  Contact Form            │  Contact Information       │
│  ─────────────          │  ─────────────────────    │
│                          │                            │
│  Name *                  │  Email                     │
│  ┌────────────────────┐ │  support@purplehere.com   │
│  │                    │ │                            │
│  └────────────────────┘ │  Phone                     │
│                          │  +60-XX-XXX-XXXX          │
│  Email *                 │                            │
│  ┌────────────────────┐ │  WhatsApp                  │
│  │                    │ │  +60-XX-XXX-XXXX          │
│  └────────────────────┘ │                            │
│                          │  Business Hours            │
│  Phone                   │  Mon-Fri 9AM-6PM (GMT+8)  │
│  ┌────────────────────┐ │                            │
│  │                    │ │                            │
│  └────────────────────┘ │                            │
│                          │                            │
│  Company Name            │                            │
│  ┌────────────────────┐ │                            │
│  │                    │ │                            │
│  └────────────────────┘ │                            │
│                          │                            │
│  Interested Plan         │                            │
│  ┌────────────────────┐ │                            │
│  │ Select...       ▼  │ │                            │
│  └────────────────────┘ │                            │
│                          │                            │
│  Message *               │                            │
│  ┌────────────────────┐ │                            │
│  │                    │ │                            │
│  │                    │ │                            │
│  └────────────────────┘ │                            │
│                          │                            │
│  [Send Message]          │                            │
│                          │                            │
└──────────────────────────┴────────────────────────────┘

[Footer]
```

**폼 제출:**
1. `POST /api/public/contact` (DB 저장)
2. 시스템 관리자에게 이메일 알림 발송

**신규 테이블:**
```sql
CREATE TABLE contact_inquiries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company_name VARCHAR(255),
  interested_plan VARCHAR(100),
  message TEXT NOT NULL,
  status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
  assigned_to INT DEFAULT NULL,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 3.4 Demo 페이지 (/demo)

**구성:**
```
[GNB]

[Hero Section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Try PurpleHere POS
     Experience our system with demo accounts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Demo Account Cards]
┌─────────────────────────────┐  ┌─────────────────────────────┐
│                             │  │                             │
│  Brand General              │  │  Restaurant Admin           │
│                             │  │                             │
│  Manage multiple brands     │  │  Full restaurant            │
│  and restaurants from       │  │  management experience      │
│  a single dashboard         │  │                             │
│                             │  │                             │
│  ─────────────────────     │  │  ─────────────────────     │
│                             │  │                             │
│  Features:                  │  │  Features:                  │
│  • Multi-brand dashboard    │  │  • POS Terminal             │
│  • Restaurant management    │  │  • Kitchen Display          │
│  • Centralized inventory    │  │  • Menu Management          │
│  • Performance reports      │  │  • Reports & Analytics      │
│                             │  │                             │
│  ┌───────────────────────┐ │  │  ┌───────────────────────┐ │
│  │ Login as Brand General│ │  │  │ Login as Restaurant   │ │
│  └───────────────────────┘ │  │  └───────────────────────┘ │
│                             │  │                             │
└─────────────────────────────┘  └─────────────────────────────┘

[Notice Box]
┌─────────────────────────────────────────────────────────────────┐
│  Demo accounts are reset daily at midnight (GMT+8).             │
│  Your changes will not be saved permanently.                    │
└─────────────────────────────────────────────────────────────────┘

[CTA Section]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
     Want your own account?
     [Contact Us] → /contact
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Footer]
```

**데모 계정:**
```javascript
const DEMO_ACCOUNTS = {
  brand_general: {
    email: 'demo-brand@purplehere.com',
    password: 'Demo@2024',
    role: 'Brand General'
  },
  restaurant_admin: {
    email: 'demo-restaurant@purplehere.com',
    password: 'Demo@2024',
    role: 'Restaurant Admin'
  }
};
```

**로그인 버튼 클릭 시:**
1. 자동으로 해당 계정 정보로 로그인 API 호출
2. 성공 시 대시보드로 리다이렉트

**데모 데이터 리셋:**
- 매일 자정 cron job으로 데모 계정의 데이터 초기화
- 샘플 메뉴, 주문, 고객 데이터 자동 생성

### 3.5 수정/신규 파일

| 파일 | 상태 | 설명 |
|-----|------|------|
| `src/pages/Landing/PricingPage.tsx` | 신규 | Pricing 페이지 |
| `src/pages/Landing/ContactPage.tsx` | 신규 | Contact 페이지 |
| `src/pages/Landing/DemoPage.tsx` | 신규 | Demo 페이지 |
| `src/components/Landing/LandingHeader.tsx` | 신규 | 공통 GNB |
| `src/components/Landing/LandingFooter.tsx` | 신규 | 공통 Footer |
| `src/App.tsx` | 수정 | 라우터 추가 |
| `routes/public.js` | 신규 | 공개 API (plans, contact) |
| `models/ContactInquiry.js` | 신규 | 문의 모델 |

---

## 4. Task 3: 7일 무료 체험 시스템

### 4.1 트라이얼 옵션 표시 조건

**System Admin - Restaurant 추가 시:**
```
[Restaurant 추가 폼]

Name: _______________
Email: _______________
Plan: [Basic ▼]

☑ Start with 7-day free trial    ← 표시됨
  Trial ends: 2026-02-07
  First invoice will be issued after trial period.

[Create Restaurant]
```

**Brand General - Restaurant 추가 시:**
```
[Restaurant 추가 폼]

Name: _______________
Location: _______________
Manager: [Select... ▼]

                                  ← 트라이얼 옵션 없음
                                  ← 하위 레스토랑은 Brand의 구독에 포함

[Add Restaurant]
```

### 4.2 DB 필드 추가

**restaurants 테이블:**
```sql
ALTER TABLE restaurants ADD COLUMN is_trial BOOLEAN DEFAULT FALSE;
ALTER TABLE restaurants ADD COLUMN trial_start_date DATETIME DEFAULT NULL;
ALTER TABLE restaurants ADD COLUMN trial_end_date DATETIME DEFAULT NULL;
ALTER TABLE restaurants ADD COLUMN trial_converted BOOLEAN DEFAULT FALSE;
```

**brands 테이블:** (동일하게 추가)
```sql
ALTER TABLE brands ADD COLUMN is_trial BOOLEAN DEFAULT FALSE;
ALTER TABLE brands ADD COLUMN trial_start_date DATETIME DEFAULT NULL;
ALTER TABLE brands ADD COLUMN trial_end_date DATETIME DEFAULT NULL;
ALTER TABLE brands ADD COLUMN trial_converted BOOLEAN DEFAULT FALSE;
```

**foodcourts 테이블:** (동일하게 추가)
```sql
ALTER TABLE foodcourts ADD COLUMN is_trial BOOLEAN DEFAULT FALSE;
ALTER TABLE foodcourts ADD COLUMN trial_start_date DATETIME DEFAULT NULL;
ALTER TABLE foodcourts ADD COLUMN trial_end_date DATETIME DEFAULT NULL;
ALTER TABLE foodcourts ADD COLUMN trial_converted BOOLEAN DEFAULT FALSE;
```

### 4.3 트라이얼 상태 표시 (대시보드)

**트라이얼 중 (상단 배너):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  Trial Period: 5 days remaining                                         │
│  Your trial ends on Feb 7, 2026. [View Plans] [Contact Sales]          │
└─────────────────────────────────────────────────────────────────────────┘
```

**트라이얼 종료 3일 전 (강조 배너):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│  Your trial ends in 3 days!                                             │
│  To continue using all features, please complete payment.               │
│  [View Invoice] [Contact Sales]                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.4 트라이얼 종료 시 처리

```
트라이얼 종료일 (Day 7 → Day 8):

1. is_trial = false 로 변경
2. subscription_status = 'active' 유지
3. subscription_start = trial_end_date (정식 구독 시작일)
4. 첫 인보이스 자동 발행 (invoiceScheduler 활용)
   - billing_period_start = trial_end_date
   - billing_period_end = trial_end_date + 1 month
   - due_date = trial_end_date (즉시 결제 필요)
5. trial_converted = true (결제 완료 시)
```

### 4.5 수정 파일

| 파일 | 설명 |
|-----|------|
| `models/Restaurant.js` | 트라이얼 필드 추가 |
| `models/Brand.js` | 트라이얼 필드 추가 |
| `models/Foodcourt.js` | 트라이얼 필드 추가 |
| `routes/restaurants.js` | POST 시 트라이얼 처리 |
| `services/invoiceScheduler.js` | 트라이얼 종료 인보이스 발행 |
| `src/pages/Admin/RestaurantsPage.tsx` | 트라이얼 옵션 UI |
| `src/components/Dashboard/TrialBanner.tsx` | 신규 - 트라이얼 배너 |

---

## 5. Task 4: 미결제 서비스 차단 구현

### 5.1 현재 상태

| 항목 | 상태 | 위치 |
|------|------|------|
| 인보이스 자동발행 | 구현됨 | `services/invoiceScheduler.js` |
| 연체 상태 변경 | **미구현** | - |
| Payment Status API | **미구현** | - |
| Frontend 결제 상태 | MOCK 데이터 | `utils/paymentStatus.ts` |

### 5.2 연체 인보이스 자동 상태 변경

**신규 스케줄러 추가 (invoiceScheduler.js 확장):**

```javascript
// 매일 자정 실행 - 연체 인보이스 상태 업데이트
cron.schedule('0 0 * * *', async () => {
  const today = new Date();

  // due_date가 지난 pending_payment 인보이스 → overdue로 변경
  await Invoice.update(
    { status: 'overdue' },
    {
      where: {
        status: 'pending_payment',
        due_date: { [Op.lt]: today }
      }
    }
  );
});
```

### 5.3 Payment Status API

**신규 엔드포인트:**
```
GET /api/payment-status

Response:
{
  "hasOverdue": true,
  "overdueAmount": 199.00,
  "overdueDays": 5,
  "restrictionLevel": "partial",
  "nextRestrictionDate": "2026-02-03",
  "overdueInvoices": [
    {
      "id": 123,
      "invoiceNumber": "INV-202601-0001",
      "amount": 199.00,
      "currency": "MYR",
      "dueDate": "2026-01-26",
      "overdueDays": 5
    }
  ]
}
```

**제한 레벨 계산:**
```javascript
function calculateRestrictionLevel(maxOverdueDays) {
  if (maxOverdueDays >= 8) return 'blocked';
  if (maxOverdueDays >= 4) return 'partial';
  if (maxOverdueDays >= 1) return 'warning';
  return 'none';
}
```

### 5.4 제한 레벨별 동작

| 레벨 | 연체일 | 표시 | 제한 기능 |
|------|--------|------|----------|
| none | 0일 | - | 없음 |
| warning | 1~3일 | 경고 배너 | 없음 |
| partial | 4~7일 | 경고 모달 | POS, Reports, Analytics, Coupons |
| blocked | 8일+ | 차단 화면 | Invoice, Profile, Settings 외 전체 |

**blocked 상태 화면:**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                    Account Suspended                                     │
│                                                                          │
│     Your account has been suspended due to overdue payments.            │
│                                                                          │
│     Outstanding Amount: MYR 199.00                                       │
│     Overdue Since: January 26, 2026 (5 days)                            │
│                                                                          │
│     Please settle your payment to restore access.                        │
│                                                                          │
│     [View Invoices]                [Contact Support]                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.5 Frontend 연동

**paymentStatus.ts 수정:**
```typescript
// MOCK 데이터 제거, 실제 API 호출로 변경
export const checkPaymentStatus = async (): Promise<PaymentStatus> => {
  const token = localStorage.getItem('auth_token');
  const response = await fetch('/api/payment-status', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

### 5.6 수정/신규 파일

| 파일 | 설명 |
|-----|------|
| `services/invoiceScheduler.js` | 연체 상태 변경 로직 추가 |
| `routes/invoices.js` | GET /api/payment-status 추가 |
| `src/utils/paymentStatus.ts` | MOCK → 실제 API 연동 |
| `src/contexts/PaymentStatusContext.tsx` | async 처리로 변경 |

---

## 6. Task 5: 구독 플랜 분리 (Phase B)

### 6.1 개요

- System Admin의 플랜: 모든 고객에게 적용
- Brand General의 플랜: 자사 레스토랑에만 적용
- Foodcourt General의 플랜: 소속 레스토랑에만 적용

### 6.2 DB 스키마 변경

```sql
ALTER TABLE plan_templates
ADD COLUMN owner_type ENUM('system', 'brand', 'foodcourt') DEFAULT 'system',
ADD COLUMN owner_id INT DEFAULT NULL;
```

### 6.3 구현 범위 (Phase B)

이 작업은 Phase B에서 진행:
1. DB 스키마 변경
2. API 수정 (owner_type, owner_id 필터)
3. Brand General Plans 페이지 활성화
4. Foodcourt General Plans 페이지 활성화
5. Sidebar Coming Soon 제거

---

## 7. 구현 순서 및 체크리스트

### 7.1 Phase A (오픈 필수) - 현재 진행

| 순서 | Task | 예상 시간 | 체크 |
|:----:|------|----------|:----:|
| 1 | Task 1: Addon Module 비활성화 (5개) | 10분 | ☐ |
| 2 | Task 2-1: LandingHeader/Footer 컴포넌트 | 30분 | ☐ |
| 3 | Task 2-2: Pricing 페이지 | 1시간 | ☐ |
| 4 | Task 2-3: Contact 페이지 + API | 1시간 | ☐ |
| 5 | Task 2-4: Demo 페이지 + 데모 계정 | 1시간 | ☐ |
| 6 | Task 3: 트라이얼 시스템 (System Admin 전용) | 2시간 | ☐ |
| 7 | Task 4: 미결제 서비스 차단 API | 1시간 | ☐ |

### 7.2 Phase B (오픈 직후)

| Task | 설명 |
|------|------|
| Task 5 | BrandGeneral/FoodcourtGeneral 구독 플랜 분리 |
| 데모 데이터 리셋 | 매일 자정 자동 초기화 cron job |

### 7.3 Phase C (고객 피드백 후)

| Task | 설명 |
|------|------|
| 결제 연동 | Stripe, PayPal |
| 자동 갱신 | 카드 자동 결제 |
| 세금계산서 | 자동 발행 시스템 |

---

## 개발 시작 준비 완료

위 기획대로 Task 1부터 순서대로 구현 진행합니다.
