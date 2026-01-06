# 멤버십/포인트 시스템 기획서

## 1. 개요

레스토랑별로 관리자가 직접 설정할 수 있는 멤버십/포인트 시스템

---

## 2. 현재 시스템 분석

### 현재 구조
- **customers 테이블**: 전체 고객 정보 (phone, name, email 등)
- **restaurant_customers 테이블**: 레스토랑별 고객 관계
  - `points`: 현재 포인트 잔액
  - `total_spent`: 총 지출액
  - `loyalty_tier`: 등급 (bronze/silver/gold/vip)
  - `order_count`: 주문 횟수

### 현재 Settings 페이지 탭 구조
```
Settings Page Tabs:
├── Company (회사 정보)
├── Brands (브랜드 관리)
├── Billing (결제/구독)
├── Store (매장 정보)
├── Operations (운영 설정) ← 현재 Loyalty Tier 설정이 여기에 있음
├── Payment (결제 설정)
└── Managers (관리자)
```

### 현재 Loyalty Tier 설정 (Operations 탭 내)
- 기본적인 등급 기준만 설정 가능
- Silver/Gold/VIP 승급 조건 (최소 주문 수, 최소 지출액)
- 포인트 적립/사용 설정 없음

---

## 3. 변경 계획: Membership 별도 탭 구성

### 변경 후 Settings 페이지 탭 구조
```
Settings Page Tabs:
├── Company (회사 정보)
├── Brands (브랜드 관리)
├── Billing (결제/구독)
├── Store (매장 정보)
├── Operations (운영 설정) ← Loyalty Tier 설정 제거
├── Payment (결제 설정)
├── Membership (멤버십) ← 새로운 별도 탭
└── Managers (관리자)
```

---

## 4. Membership 탭 UI 구성

### 4.1 탭 레이아웃

```
┌─────────────────────────────────────────────────────────────────┐
│ Settings                                        [Save Changes]  │
├─────────────────────────────────────────────────────────────────┤
│ Company | Brands | Billing | Store | Operations | Payment       │
│ | Membership | Managers                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Membership Settings                                       │  │
│  │ ──────────────────                                        │  │
│  │ [Toggle] Enable Membership System                         │  │
│  │                                                           │  │
│  │ When enabled, customers can earn and use points           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  (아래 카드들은 Membership이 활성화되었을 때만 표시)              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Point Earning Rules                                       │  │
│  │ ──────────────────                                        │  │
│  │                                                           │  │
│  │ Points per RM 1 spent:        [___1.00___]               │  │
│  │ (e.g., RM 100 order = 100 points)                        │  │
│  │                                                           │  │
│  │ Welcome Points (new member):  [___0___] points            │  │
│  │                                                           │  │
│  │ Points Expiry:                [___0___] days (0=never)    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Point Usage Rules                                         │  │
│  │ ─────────────────                                         │  │
│  │                                                           │  │
│  │ Points to RM 1:               [___100___] points          │  │
│  │ (e.g., 100 points = RM 1 discount)                       │  │
│  │                                                           │  │
│  │ Minimum points to use:        [___100___] points          │  │
│  │                                                           │  │
│  │ Max discount per order:       [___50___] %                │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Loyalty Tiers                                             │  │
│  │ ─────────────                                             │  │
│  │                                                           │  │
│  │ [Toggle] Enable Tier System                               │  │
│  │                                                           │  │
│  │ ┌────────────────────────────────────────────────────┐   │  │
│  │ │ Bronze (Default)                                    │   │  │
│  │ │ • Bonus Rate: 1.0x (base)                          │   │  │
│  │ │ • Discount: 0%                                      │   │  │
│  │ └────────────────────────────────────────────────────┘   │  │
│  │                                                           │  │
│  │ ┌────────────────────────────────────────────────────┐   │  │
│  │ │ Silver                                              │   │  │
│  │ │ • Upgrade at: RM [__500__] total spent             │   │  │
│  │ │ • Bonus Rate: [_1.2_]x                             │   │  │
│  │ │ • Discount: [__0__]%                               │   │  │
│  │ └────────────────────────────────────────────────────┘   │  │
│  │                                                           │  │
│  │ ┌────────────────────────────────────────────────────┐   │  │
│  │ │ Gold                                                │   │  │
│  │ │ • Upgrade at: RM [_2000__] total spent             │   │  │
│  │ │ • Bonus Rate: [_1.5_]x                             │   │  │
│  │ │ • Discount: [__5__]%                               │   │  │
│  │ └────────────────────────────────────────────────────┘   │  │
│  │                                                           │  │
│  │ ┌────────────────────────────────────────────────────┐   │  │
│  │ │ VIP                                                 │   │  │
│  │ │ • Upgrade at: RM [_5000__] total spent             │   │  │
│  │ │ • Bonus Rate: [_2.0_]x                             │   │  │
│  │ │ • Discount: [_10__]%                               │   │  │
│  │ └────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 설정 항목 상세

#### A. 멤버십 활성화
| 항목 | 설명 | 기본값 |
|------|------|--------|
| is_active | 멤버십 시스템 전체 ON/OFF | true |

#### B. 포인트 적립 규칙
| 항목 | 설명 | 기본값 |
|------|------|--------|
| points_per_currency | RM 1당 적립 포인트 | 1.00 |
| welcome_points | 신규 회원 환영 포인트 | 0 |
| points_expiry_days | 포인트 유효 기간 (일), 0=무제한 | 0 |

#### C. 포인트 사용 규칙
| 항목 | 설명 | 기본값 |
|------|------|--------|
| points_to_currency | RM 1 할인에 필요한 포인트 | 100 |
| min_points_to_use | 최소 사용 가능 포인트 | 100 |
| max_points_per_order_percent | 주문당 최대 포인트 사용률 (%) | 50 |

#### D. 등급별 혜택
| 등급 | 승급 기준 (총 지출) | 보너스 적립률 | 할인율 |
|------|---------------------|---------------|--------|
| Bronze | 기본 | 1.0x | 0% |
| Silver | RM 500 | 1.2x | 0% |
| Gold | RM 2,000 | 1.5x | 5% |
| VIP | RM 5,000 | 2.0x | 10% |

---

## 5. 데이터베이스 설계

### 5.1 membership_settings 테이블 (신규)
```sql
CREATE TABLE membership_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL UNIQUE,

  -- 활성화 여부
  is_active TINYINT(1) DEFAULT 1,

  -- 포인트 적립 설정
  points_per_currency DECIMAL(10,2) DEFAULT 1.00,
  welcome_points INT DEFAULT 0,
  points_expiry_days INT DEFAULT 0,

  -- 포인트 사용 설정
  points_to_currency DECIMAL(10,2) DEFAULT 100.00,
  min_points_to_use INT DEFAULT 100,
  max_points_per_order_percent DECIMAL(5,2) DEFAULT 50.00,

  -- 등급 승급 기준 (총 지출액)
  silver_threshold DECIMAL(10,2) DEFAULT 500.00,
  gold_threshold DECIMAL(10,2) DEFAULT 2000.00,
  vip_threshold DECIMAL(10,2) DEFAULT 5000.00,

  -- 등급별 보너스 적립률
  bronze_bonus_rate DECIMAL(3,2) DEFAULT 1.00,
  silver_bonus_rate DECIMAL(3,2) DEFAULT 1.20,
  gold_bonus_rate DECIMAL(3,2) DEFAULT 1.50,
  vip_bonus_rate DECIMAL(3,2) DEFAULT 2.00,

  -- 등급별 할인율
  bronze_discount_percent DECIMAL(5,2) DEFAULT 0.00,
  silver_discount_percent DECIMAL(5,2) DEFAULT 0.00,
  gold_discount_percent DECIMAL(5,2) DEFAULT 5.00,
  vip_discount_percent DECIMAL(5,2) DEFAULT 10.00,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);
```

### 5.2 point_transactions 테이블 (신규)
```sql
CREATE TABLE point_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  customer_id INT NOT NULL,
  order_id INT DEFAULT NULL,

  type ENUM('earn', 'use', 'expire', 'adjust', 'welcome', 'refund') NOT NULL,
  points INT NOT NULL,           -- 변동 포인트 (+/-)
  balance_after INT NOT NULL,    -- 거래 후 잔액

  description VARCHAR(255),
  bonus_rate DECIMAL(3,2) DEFAULT 1.00,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL,

  INDEX idx_restaurant_customer (restaurant_id, customer_id),
  INDEX idx_created (created_at)
);
```

---

## 6. API 설계

### 6.1 멤버십 설정 API

```
GET    /api/membership/settings              # 설정 조회
PUT    /api/membership/settings              # 설정 저장
```

### 6.2 포인트 API

```
GET    /api/customers/:id/points             # 고객 포인트 조회
GET    /api/customers/:id/point-history      # 포인트 거래 내역
POST   /api/points/earn                      # 포인트 적립 (주문 완료 시)
POST   /api/points/use                       # 포인트 사용
POST   /api/points/adjust                    # 포인트 수동 조정
```

---

## 7. 비즈니스 로직

### 7.1 포인트 적립 (주문 완료 시)

```
적립 포인트 = 주문금액 × points_per_currency × 등급별 bonus_rate

예시 (Gold 등급, RM 100 주문):
= 100 × 1.00 × 1.5 = 150 포인트
```

### 7.2 등급 자동 업그레이드

```
주문 완료 후 total_spent 업데이트 시:

IF total_spent >= vip_threshold THEN tier = 'vip'
ELSE IF total_spent >= gold_threshold THEN tier = 'gold'
ELSE IF total_spent >= silver_threshold THEN tier = 'silver'
ELSE tier = 'bronze'
```

### 7.3 포인트 사용

```
사용 가능 포인트 검증:
1. 현재 포인트 >= min_points_to_use
2. 사용 포인트 <= 현재 포인트
3. 할인 금액 <= 주문금액 × max_points_per_order_percent / 100

할인 금액 = 사용 포인트 / points_to_currency
```

---

## 8. 마이그레이션 계획

### 8.1 기존 데이터 처리
- Operations 탭의 loyaltyTiers 설정은 그대로 유지 (백워드 호환)
- 새 membership_settings 테이블로 점진적 마이그레이션
- 기존 restaurant_customers.points, total_spent, loyalty_tier 계속 사용

### 8.2 Operations 탭 변경
- Loyalty Tier Settings 카드를 Operations 탭에서 제거
- Membership 탭으로 이동하면서 확장된 설정 제공

---

## 9. 개발 순서 (예정)

1. **DB 스키마 생성**
   - membership_settings 테이블
   - point_transactions 테이블

2. **Backend API**
   - 멤버십 설정 CRUD
   - 포인트 적립/사용/조회 API

3. **자동화 로직**
   - 주문 완료 시 포인트 자동 적립
   - 등급 자동 업그레이드

4. **Frontend**
   - Settings 페이지에 Membership 탭 추가
   - Operations 탭에서 Loyalty Tier Settings 제거
   - 포인트 히스토리 UI (선택)

---

## 10. 참고: 현재 Operations 탭 Loyalty Settings

현재 `/var/www/dev-frontend/src/pages/Settings/SettingsPage.tsx` 라인 3325-3510에 위치:

```javascript
<CardTitle>Loyalty Tier Settings</CardTitle>
<Toggle>
  <ToggleLabel>Enable Loyalty Tier System</ToggleLabel>
  <ToggleSwitch>
    <ToggleInput
      checked={operationSettings?.loyaltyTiers?.enabled || false}
      ...
    />
  </ToggleSwitch>
</Toggle>
// Silver, Gold, VIP 등급 설정 (minOrders, minSpent)
```

이 부분을 Membership 탭으로 이동하면서 확장된 포인트 설정 추가 예정.
