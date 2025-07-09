# 푸드코트 포스시스템 시스템 아키텍처

## 📋 문서 정보
- **문서명**: 시스템 아키텍처 설계서
- **버전**: v1.0
- **최종수정**: 2025-07-08
- **작성목적**: 클로드 코드 개발 가이드용

## 🏗️ 전체 시스템 구조

### 1. 레이어 구조 (4계층)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            클라이언트 레이어                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │포스 터미널   │ │고객 모바일   │ │주방디스플레이│ │고객디스플레이│           │
│  │(React Web)  │ │(React PWA)  │ │(React Web)  │ │(React Web)  │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                           │
│  │관리자패널    │ │솔루션관리자  │ │모니터링대시보드│                           │
│  │(React Web)  │ │(React Web)  │ │(React Web)  │                           │
│  └─────────────┘ └─────────────┘ └─────────────┘                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                              ┌───────▼───────┐
                              │ API Gateway   │
                              │ (Nginx +      │
                              │ Rate Limiting)│
                              └───────┬───────┘
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                          애플리케이션 레이어                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │  API 서버    │ │Socket.IO서버│ │  인증 서버   │ │파일업로드서버│           │
│  │(Express.js) │ │(실시간통신) │ │   (JWT)     │ │  (Multer)   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │스케줄러서버  │ │알림서버     │ │모니터링서버  │ │백업서버     │           │
│  │(Node-Cron)  │ │(Push/Email) │ │(Health Check)│ │(Auto Backup)│           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                            서비스 레이어                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │주문서비스 │ │결제서비스 │ │메뉴서비스 │ │재고서비스 │ │고객서비스 │           │
│ │Order     │ │Payment   │ │Menu      │ │Inventory │ │Customer  │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │매출서비스 │ │업체서비스 │ │구독서비스 │ │브랜딩서비스│ │알림서비스 │           │
│ │Sales     │ │Store     │ │Subscription│ │Branding  │ │Notification│        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│ │픽업서비스 │ │모니터링   │ │지원서비스 │ │백업서비스 │                        │
│ │Pickup    │ │Monitoring │ │Support   │ │Backup    │                        │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
┌─────────────────────────────────────────────────────────────────────────────┐
│                            데이터 레이어                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │MySQL 마스터  │ │MySQL 슬레이브│ │Redis 캐시   │ │Redis 세션   │           │
│  │(Write DB)   │ │(Read DB)    │ │(Menu/Stock) │ │(User Session)│           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │파일스토리지  │ │로그스토리지  │ │백업스토리지  │ │임시스토리지  │           │
│  │(Images/Logo)│ │(System Logs)│ │(DB Backup)  │ │(Temp Files) │           │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 핵심 데이터 흐름

### 1. 주문 처리 프로세스

```javascript
// 주문 프로세스 완전한 데이터 흐름
const orderFlow = {
  // 1. 포스 주문
  posOrder: {
    input: "포스터미널",
    processing: "주문서비스 → 결제서비스 → 재고서비스",
    output: "주방디스플레이 + 픽업번호생성",
    realtime: "Socket.IO → 모든 연결된 클라이언트"
  },

  // 2. 고객 모바일 주문
  mobileOrder: {
    input: "고객모바일(PWA)",
    processing: "주문서비스 → 결제서비스 → 재고서비스",
    output: "주방디스플레이 + 픽업번호생성",
    realtime: "Socket.IO → 모든 연결된 클라이언트"
  },

  // 3. 주문 상태 관리
  statusManagement: {
    states: ["접수", "결제완료", "조리중", "조리완료", "픽업완료"],
    triggers: "주방디스플레이 터치 → Socket.IO → 상태 업데이트",
    notifications: "고객디스플레이 + 포스터미널 실시간 업데이트"
  }
};
```

### 2. 실시간 통신 아키텍처

```javascript
// Socket.IO 네임스페이스 구조
const socketNamespaces = {
  '/kitchen': {
    purpose: '주방 디스플레이 전용',
    events: ['new-order', 'order-update', 'stock-change'],
    clients: ['주방디스플레이']
  },

  '/display': {
    purpose: '고객 디스플레이 전용',
    events: ['pickup-ready', 'pickup-completed'],
    clients: ['고객디스플레이']
  },

  '/pos': {
    purpose: '포스 터미널 전용',
    events: ['order-status', 'payment-result', 'stock-alert'],
    clients: ['포스터미널', '관리자패널']
  },

  '/mobile': {
    purpose: '고객 모바일 전용',
    events: ['order-status', 'pickup-notification'],
    clients: ['고객모바일앱']
  },

  '/admin': {
    purpose: '관리/모니터링 전용',
    events: ['system-alert', 'customer-support', 'analytics-update'],
    clients: ['솔루션관리자', '모니터링대시보드']
  }
};

// 안정성 보장 메커니즘
const reliabilityMechanism = {
  reconnection: {
    attempts: 5,
    delay: 1000,
    delayMax: 5000,
    randomizationFactor: 0.5
  },

  fallback: {
    method: 'HTTP 폴링',
    interval: 3000,
    condition: 'WebSocket 연결 실패 시'
  },

  dataSync: {
    method: 'DB 기반 상태 동기화',
    trigger: '재연결 시 마지막 상태 복구',
    validation: '클라이언트-서버 상태 검증'
  }
};
```

## 💳 결제 시스템 아키텍처

### 이중 결제 시스템 구조

```javascript
const paymentArchitecture = {
  // A. 고객 결제 (푸드코트 매출)
  customerPayment: {
    services: ["결제서비스", "Stripe API", "영수증서비스"],
    flow: "주문확인 → 결제처리 → 영수증발행 → 주방전송",
    methods: ["현금(포스)", "카드", "간편결제(모바일)"],
    validation: "결제 성공 후에만 주문 확정"
  },

  // B. 구독료 결제 (솔루션 수익)
  subscriptionPayment: {
    services: ["구독서비스", "Stripe Subscription", "인보이스서비스"],
    flow: "월 자동결제 → 성공/실패 처리 → 서비스 활성화/중지",
    methods: ["자동카드결제", "은행이체", "페이팔"],
    features: ["자동갱신", "실패재시도", "환불처리"]
  }
};
```

## 🎨 브랜딩 시스템 아키텍처

```javascript
// 업체별 브랜딩 적용 시스템
const brandingArchitecture = {
  storage: {
    logos: "파일스토리지 + CDN",
    themes: "업체서비스 + Redis 캐시",
    fonts: "웹폰트 + 로컬 캐시"
  },

  application: {
    pos: "로고 + 컬러테마 + 폰트 동적 적용",
    mobile: "PWA 매니페스트 동적 생성",
    display: "브랜드 컬러 + 로고 실시간 적용",
    receipt: "업체정보 자동 삽입"
  },

  management: {
    upload: "관리자패널에서 업로드",
    preview: "실시간 미리보기",
    approval: "솔루션관리자 승인 프로세스"
  }
};
```

## 🗄️ 데이터베이스 아키텍처

### 1. 데이터베이스 분산 전략

```sql
-- 마스터-슬레이브 구조
Master DB (Write Only):
- orders (주문 생성/수정)
- payments (결제 처리)
- inventory (재고 업데이트)
- user_sessions (세션 관리)

Slave DB (Read Only):
- menu_items (메뉴 조회)
- sales_reports (매출 조회)
- customer_data (고객 정보 조회)
- analytics_data (분석 데이터)

-- 캐싱 전략
Redis Cache Structure:
- menus:{store_id} → 메뉴 데이터 (1시간 캐시)
- stock:{store_id} → 재고 현황 (5분 캐시)
- orders:active → 활성 주문 목록 (실시간)
- pickup:numbers → 픽업 번호 큐 (실시간)
- themes:{store_id} → 브랜딩 테마 (24시간 캐시)
```

### 2. 데이터 무결성 보장

```javascript
// 트랜잭션 처리 예제
const orderTransaction = async (orderData) => {
  const transaction = await db.beginTransaction();

  try {
    // 1. 재고 차감
    await inventoryService.reduceStock(orderData.items, transaction);

    // 2. 주문 생성
    const order = await orderService.create(orderData, transaction);

    // 3. 결제 처리
    const payment = await paymentService.process(orderData.payment, transaction);

    // 4. 픽업 번호 발급
    const pickupNumber = await pickupService.generate(order.id, transaction);

    await transaction.commit();

    // 5. 실시간 알림 (트랜잭션 외부)
    socketService.broadcastNewOrder(order, pickupNumber);

    return { order, payment, pickupNumber };

  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
```

## 🔒 보안 아키텍처

### 다층 보안 구조

```javascript
const securityLayers = {
  // Layer 1: Network Level
  network: {
    ssl: "TLS 1.3 강제 적용",
    firewall: "포트 제한 + IP 화이트리스트",
    ddos: "Rate Limiting + CAPTCHA"
  },

  // Layer 2: Application Level
  application: {
    authentication: "JWT + Refresh Token",
    authorization: "RBAC (Role-Based Access Control)",
    validation: "입력값 검증 + SQL Injection 방어"
  },

  // Layer 3: Data Level
  data: {
    encryption: "AES-256 (민감 데이터)",
    hashing: "bcrypt (비밀번호)",
    tokenization: "결제 정보 토큰화"
  },

  // Layer 4: Business Logic Level
  business: {
    rateLimit: "API 호출 제한",
    sessionTimeout: "30분 비활성 시 자동 로그아웃",
    auditLog: "모든 중요 작업 로깅"
  }
};
```

### 권한 관리 시스템

```javascript
// 역할 기반 접근 제어
const rolePermissions = {
  'solution_admin': ['*'], // 모든 권한

  'store_admin': [
    'manage_store', 'manage_staff', 'view_sales', 'manage_menu',
    'manage_inventory', 'customer_management', 'view_analytics'
  ],

  'staff': [
    'process_orders', 'view_menu', 'view_customers', 'basic_pos_functions',
    'apply_staff_discount'
  ],

  'kitchen': [
    'view_orders', 'update_order_status', 'manage_kitchen_display'
  ],

  'customer': [
    'create_order', 'view_own_orders', 'manage_own_profile',
    'use_points', 'view_menu'
  ]
};

// JWT 토큰 구조
const jwtPayload = {
  user_id: 1,
  email: "admin@store.com",
  role: "store_admin",
  store_id: 1,
  permissions: ["manage_store", "manage_staff", "view_sales"],
  exp: 1640995200
};
```

## 📊 모니터링 아키텍처

### 종합 모니터링 시스템

```javascript
const monitoringArchitecture = {
  // 시스템 메트릭
  systemMetrics: {
    server: "CPU, Memory, Disk, Network 사용률",
    database: "쿼리 성능, 커넥션 풀, 슬로우 쿼리",
    application: "응답시간, 에러율, 처리량"
  },

  // 비즈니스 메트릭
  businessMetrics: {
    orders: "주문 수, 평균 처리시간, 취소율",
    payments: "결제 성공률, 평균 결제 시간",
    customer: "활성 고객 수, 재방문율",
    revenue: "실시간 매출, 구독료 수익"
  },

  // 사용자 경험 메트릭
  userExperience: {
    frontend: "페이지 로드 시간, 상호작용 지연",
    mobile: "앱 크래시율, 네트워크 오류",
    pos: "터치 응답시간, 결제 완료 시간"
  }
};
```

### 알림 시스템

```javascript
const alertingSystem = {
  critical: {
    triggers: ["서버 다운", "DB 연결 실패", "결제 시스템 오류"],
    actions: ["즉시 SMS", "이메일 알림", "자동 재시작 시도"],
    escalation: "5분 내 미해결 시 관리자 직접 전화"
  },

  warning: {
    triggers: ["높은 CPU 사용률", "느린 응답시간", "재고 부족"],
    actions: ["이메일 알림", "대시보드 표시"],
    escalation: "30분 내 확인 필요"
  },

  info: {
    triggers: ["새 고객 가입", "일일 매출 리포트", "시스템 업데이트"],
    actions: ["대시보드 업데이트", "일일 리포트"],
    escalation: "없음"
  }
};
```

## ⚡ 성능 최적화 아키텍처

### 캐싱 전략

```javascript
const cachingStrategy = {
  // CDN 캐싱 (Static Assets)
  cdn: {
    files: ["이미지", "CSS", "JavaScript", "폰트"],
    ttl: "1년",
    invalidation: "배포 시 자동"
  },

  // Redis 캐싱 (Dynamic Data)
  redis: {
    menus: { ttl: "1시간", key: "menu:{store_id}" },
    inventory: { ttl: "5분", key: "stock:{store_id}" },
    themes: { ttl: "24시간", key: "theme:{store_id}" },
    sessions: { ttl: "30분", key: "session:{user_id}" }
  },

  // 브라우저 캐싱 (Client Side)
  browser: {
    static: "1년 캐시",
    api: "ETag 기반 조건부 요청",
    images: "브라우저 캐시 + Service Worker"
  }
};
```

### 확장성 아키텍처

```javascript
const scalabilityArchitecture = {
  // 현재 (Phase 1)
  current: {
    setup: "단일 서버 + Redis",
    capacity: "동시 사용자 100명",
    database: "MySQL 단일 인스턴스"
  },

  // 확장 1단계 (Phase 2)
  expansion1: {
    setup: "로드밸런서 + 2대 서버",
    capacity: "동시 사용자 500명",
    database: "MySQL 마스터-슬레이브"
  },

  // 확장 2단계 (Phase 3)
  expansion2: {
    setup: "마이크로서비스 분리",
    capacity: "동시 사용자 2000명",
    database: "샤딩 + 읽기 전용 복제본 다수"
  }
};
```

## 🚀 배포 아키텍처

### Plesk 환경 설정

```nginx
# Nginx 설정 (Plesk 환경)
server {
    listen 443 ssl http2;
    server_name pos.domain.com;

    # SSL 설정
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    # 정적 파일 캐싱
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # API 프록시
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.IO 프록시
    location /socket.io/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### PM2 클러스터 설정

```javascript
// PM2 설정
module.exports = {
  apps: [
    {
      name: 'pos-api',
      script: 'dist/server.js',
      instances: 'max', // CPU 코어 수만큼
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_HOST: 'localhost',
        REDIS_HOST: 'localhost'
      }
    }
  ]
};
```

## 🔗 외부 서비스 연동

### 주요 외부 서비스

```javascript
const externalServices = {
  payment: {
    stripe: "결제 처리",
    webhook: "결제 상태 알림"
  },
  
  notification: {
    smtp: "이메일 발송",
    sms: "SMS 알림",
    push: "모바일 푸시"
  },
  
  storage: {
    cdn: "정적 파일 서빙",
    backup: "데이터 백업"
  },
  
  monitoring: {
    uptime: "서비스 가용성",
    analytics: "로그 분석"
  }
};
```

---

## 📝 클로드 코드 개발 가이드

### 중요 원칙
1. **핵심 설계 문서는 절대 수정 금지**
2. **HTML 변경 시 인간이 직접 문서 업데이트**
3. **트랜잭션 처리 필수 (주문/결제/재고)**
4. **실시간 통신 안정성 보장**
5. **보안 레이어 준수**

### 개발 순서
1. 데이터베이스 스키마 생성
2. API 서버 기본 구조
3. 인증/권한 시스템
4. 주문 처리 로직
5. 실시간 통신 구현
6. 프론트엔드 클라이언트