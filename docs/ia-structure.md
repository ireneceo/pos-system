# 푸드코트 포스시스템 IA (정보구조) 설계

## 📋 문서 정보
- **문서명**: IA (Information Architecture) 설계서
- **버전**: v1.0
- **최종수정**: 2025-07-08
- **작성목적**: 클로드 코드 개발 가이드용

## 🏗️ 전체 시스템 접속 구조

### 통합 접속 + 독립 UI 아키텍처

```
푸드코트 포스시스템
📡 단일 도메인: https://pos.orderhere.center/

🏠 메인 허브 (관리자 패널)
├── 🔑 로그인 후 역할별 메뉴 표시
├── 📊 매장 현황 요약 대시보드
├── ⚡ 빠른 접속 링크들:
│   ├── 🖥️ 포스 터미널 (새 탭 열기)
│   ├── 📺 주방 디스플레이 (새 탭 열기)
│   ├── 📺 고객 디스플레이 (새 탭 열기)
│   └── 📱 고객 모바일 QR코드 생성
│
└── 📋 전체 관리 메뉴들 (권한별)

🎯 직접 접속 URL:
├── /pos → 포스 터미널
├── /kitchen → 주방 디스플레이
├── /display → 고객 디스플레이
├── /mobile → 고객 모바일
├── /admin → 솔루션 관리자
└── /setup → 초기 설정 (최초 1회)
```

## 🖥️ 포스 터미널 IA (직원용)

### URL: `/pos`

### 네비게이션 구조

```javascript
const posTerminalIA = {
  // 메인 화면 레이아웃
  layout: {
    menuArea: "좌측 70% - 메뉴 선택 영역",
    orderArea: "우측 30% - 주문 내역 영역",
    quickActions: "하단 고정 - 빠른 기능"
  },

  // 메인 네비게이션 (간소화)
  navigation: {
    home: {
      name: "주문 처리",
      icon: "🏠",
      children: [
        { name: "신규 주문", path: "/pos/new-order" },
        { name: "진행중 주문 확인", path: "/pos/active-orders" },
        { name: "완료 주문 확인", path: "/pos/completed-orders" }
      ]
    },
    
    payment: {
      name: "결제 및 정산",
      icon: "💰",
      children: [
        { name: "결제 처리", path: "/pos/payment" },
        { name: "영수증 출력", path: "/pos/receipt" },
        { name: "현금 관리", path: "/pos/cash" }
      ]
    },
    
    customer: {
      name: "고객 관리",
      icon: "👥",
      children: [
        { name: "고객 검색", path: "/pos/customer-search" },
        { name: "단골 고객", path: "/pos/regular-customers" },
        { name: "주문 이력", path: "/pos/order-history" }
      ]
    },
    
    settings: {
      name: "기본 설정",
      icon: "⚙️",
      children: [
        { name: "직원 로그아웃", path: "/pos/logout" },
        { name: "화면 밝기", path: "/pos/brightness" },
        { name: "알림음 설정", path: "/pos/sound" }
      ]
    }
  },

  // 메인 주문 화면 구조
  orderScreen: {
    menuArea: {
      categoryTabs: ["🍚한식", "🍜중식", "🍣일식", "🍝양식", "☕음료"],
      menuGrid: {
        display: "메뉴 이미지 + 이름 + 가격",
        states: ["available", "soldOut", "popular"],
        interaction: "터치로 주문 추가"
      }
    },
    
    orderArea: {
      selectedItems: "선택된 메뉴 목록",
      options: "옵션 선택 (맵기, 사이즈 등)",
      quantity: "수량 조절 버튼 (+/-)",
      discount: "할인 적용 (직원 권한)",
      total: "총 금액 표시 (큰 글씨)",
      actions: ["🗑️전체취소", "💳결제하기"]
    },
    
    quickActions: {
      fixed: "하단 고정 위치",
      buttons: [
        "🔍고객검색",
        "📋진행중주문",
        "⚙️설정",
        "🔓로그아웃"
      ]
    }
  }
};
```

### 제거된 기능 (관리자 패널로 이동)

```javascript
const removedFromPOS = [
  "메뉴 관리 (추가/수정/삭제)",
  "재고 관리", 
  "매출 분석",
  "직원 관리",
  "매장 설정",
  "카테고리 관리",
  "가격 변경"
];
// 포스 터미널 = 계산대 역할만!
```

## 📱 고객 모바일 IA (고객용)

### URL: `/mobile`

### PWA 네비게이션 구조

```javascript
const mobileAppIA = {
  // 메인 네비게이션 (하단 탭)
  navigation: {
    home: {
      name: "홈",
      icon: "🏠",
      path: "/mobile/home",
      content: [
        "매장 정보",
        "추천 메뉴", 
        "오늘의 특가",
        "공지사항"
      ]
    },
    
    menu: {
      name: "메뉴",
      icon: "🍽️", 
      path: "/mobile/menu",
      content: [
        "카테고리별 메뉴",
        "메뉴 검색",
        "찜한 메뉴 (회원)",
        "인기 메뉴"
      ]
    },
    
    cart: {
      name: "장바구니",
      icon: "🛒",
      path: "/mobile/cart", 
      content: [
        "선택 메뉴 목록",
        "옵션 변경",
        "쿠폰/할인 적용",
        "포인트 사용 (회원)",
        "결제하기"
      ]
    },
    
    orders: {
      name: "주문내역",
      icon: "📋",
      path: "/mobile/orders",
      content: [
        "현재 주문 상태",
        "픽업 번호 확인", 
        "주문 히스토리 (회원)",
        "주문 알림"
      ]
    },
    
    account: {
      name: "계정",
      icon: "👤",
      path: "/mobile/account",
      content: [
        "로그인/회원가입",
        "내 정보 (회원)",
        "포인트/쿠폰 (회원)",
        "찜한 메뉴 (회원)",
        "주문 통계 (회원)",
        "앱 설정"
      ]
    }
  },

  // 주문 프로세스 플로우
  orderFlow: {
    step1: {
      name: "고객 식별",
      options: [
        "회원 로그인 (포인트 적립/사용)",
        "전화번호만 입력 (비회원)",
        "회원가입 (선택적)"
      ]
    },
    
    step2: {
      name: "메뉴 선택",
      process: [
        "카테고리 선택",
        "메뉴 상세보기",
        "옵션 선택 (맵기, 사이즈)",
        "장바구니 담기"
      ]
    },
    
    step3: {
      name: "장바구니 확인",
      process: [
        "수량 조절",
        "쿠폰/할인 적용",
        "포인트 사용 (회원)",
        "최종 금액 확인"
      ]
    },
    
    step4: {
      name: "결제 처리",
      process: [
        "결제 방법 선택",
        "결제 정보 입력",
        "결제 완료"
      ]
    },
    
    step5: {
      name: "픽업 준비",
      process: [
        "픽업 번호 표시",
        "예상 대기시간",
        "포인트 적립 안내 (회원)",
        "실시간 상태 추적"
      ]
    }
  }
};
```

## 📺 주방 디스플레이 IA (주방용)

### URL: `/kitchen`

### 주방 화면 구조

```javascript
const kitchenDisplayIA = {
  // 화면 레이아웃 (가로 3분할)
  layout: {
    newOrders: "좌측 33% - 신규 주문",
    inProgress: "중앙 33% - 조리 중", 
    completed: "우측 33% - 완료 대기"
  },

  // 신규 주문 영역 (좌측)
  newOrdersArea: {
    display: [
      "주문 번호",
      "주문 시간", 
      "메뉴 목록",
      "옵션 정보",
      "특이사항/알레르기",
      "조리 시작 버튼"
    ]
  },

  // 조리 중 영역 (중앙)
  inProgressArea: {
    display: [
      "픽업 번호",
      "경과 시간",
      "메뉴별 진행도",
      "우선순위 표시",
      "완료 버튼"
    ]
  },

  // 완료 대기 영역 (우측)
  completedArea: {
    display: [
      "픽업 번호",
      "완료 시간",
      "고객 호출 상태",
      "픽업 완료 처리"
    ]
  },

  // 주방 작업 플로우
  workFlow: [
    "신규 주문 알림 수신",
    "주문 내용 확인",
    "조리 시작 버튼 터치",
    "타이머 자동 시작",
    "조리 진행 (실시간 표시)",
    "조리 완료 버튼 터치",
    "픽업 대기 영역으로 이동",
    "고객 디스플레이에 번호 표시"
  ]
};
```

## 📺 고객 디스플레이 IA (픽업용)

### URL: `/display`

### 디스플레이 화면 구조

```javascript
const customerDisplayIA = {
  // 화면 레이아웃 (세로 구조)
  layout: {
    header: "상단 15% - 매장 브랜딩",
    mainContent: "중앙 60% - 픽업 완료 번호",
    waitingInfo: "하단 20% - 조리 중 번호",
    advertisement: "유휴시간 - 광고/프로모션"
  },

  // 매장 브랜딩 영역 (상단)
  brandingArea: {
    content: [
      "매장명 표시",
      "브랜드 컬러 적용",
      "매장 로고",
      "모바일 주문 QR코드"
    ]
  },

  // 픽업 완료 영역 (중앙)
  pickupReadyArea: {
    display: [
      "'픽업 가능' 대형 텍스트",
      "완료된 번호들 (대형 표시)",
      "알림음 재생",
      "깜빡임 효과"
    ]
  },

  // 대기 정보 영역 (하단)
  waitingArea: {
    display: [
      "'조리 중' 텍스트",
      "조리중인 번호들",
      "예상 대기시간",
      "대기 순서 표시"
    ]
  },

  // 광고 영역 (유휴시간)
  advertisementArea: {
    content: [
      "신메뉴 소개",
      "할인 이벤트",
      "앱 다운로드 안내",
      "매장 프로모션"
    ]
  }
};
```

## 🏠 관리자 패널 IA (업체용)

### URL: `/` (메인 허브)

### 통합 관리 구조 (실제 UI 기반)

```javascript
const adminPanelIA = {
  // 좌측 사이드바 네비게이션 (실제 UI 구조)
  sidebar: {
    header: {
      logo: "orderhere",
      userInfo: "K-DINE" // 우상단 사용자명
    },
    
    mainNavigation: [
      {
        name: "Dashboard",
        icon: "📊", 
        path: "/dashboard",
        active: true
      },
      {
        name: "Live Orders",
        icon: "📋",
        path: "/live-orders"
      }
    ],
    
    systemAccessSection: {
      title: "SYSTEM ACCESS",
      items: [
        {
          name: "POS Terminal",
          icon: "📱",
          path: "/pos",
          target: "_blank"
        },
        {
          name: "Kitchen Display", 
          icon: "🍳",
          path: "/kitchen",
          target: "_blank"
        },
        {
          name: "Customer Display",
          icon: "📺",
          path: "/display", 
          target: "_blank"
        },
        {
          name: "Mobile Order",
          icon: "📱",
          path: "/mobile",
          target: "_blank"
        }
      ]
    },
    
    managementSection: {
      title: "MANAGEMENT", 
      items: [
        {
          name: "Menu Management",
          icon: "🍽️",
          path: "/menu"
        },
        {
          name: "Order Management",
          icon: "📋", 
          path: "/orders"
        },
        {
          name: "Sales Management",
          icon: "💰",
          path: "/sales"
        },
        {
          name: "Customer Management",
          icon: "👥",
          path: "/customers"
        }
      ]
    },
    
    settingsSection: {
      title: "SETTINGS",
      items: [
        {
          name: "Store Settings",
          icon: "🏪",
          path: "/store-settings"
        },
        {
          name: "Logout", 
          icon: "🔓",
          path: "/logout"
        }
      ]
    }
  },
  // 메인 대시보드 (실제 UI 기반)
  dashboard: {
    kpiCards: {
      position: "상단 4개 카드",
      items: [
        {
          title: "TODAY'S SALES",
          value: "RM 12,500",
          change: "+12% from yesterday",
          color: "green"
        },
        {
          title: "TOTAL ORDERS", 
          value: "156",
          subtitle: "Avg order: RM 80.13"
        },
        {
          title: "PENDING ORDERS",
          value: "8", 
          subtitle: "Avg wait: 12 min"
        },
        {
          title: "CUSTOMERS",
          value: "124",
          subtitle: "18 new customers"
        }
      ]
    },
    
    systemQuickAccess: {
      position: "중앙 좌측",
      title: "System Quick Access",
      items: [
        {
          name: "POS Terminal",
          icon: "📱",
          description: "Order processing and payment",
          action: "새 탭에서 열기"
        },
        {
          name: "Kitchen Display", 
          icon: "🍳",
          description: "Cooking status and order management",
          action: "새 탭에서 열기"
        },
        {
          name: "Customer Display",
          icon: "📺", 
          description: "Pickup number display screen",
          action: "새 탭에서 열기"
        },
        {
          name: "Mobile Order QR",
          icon: "📱",
          description: "Customer mobile ordering QR code",
          action: "QR 코드 생성"
        }
      ]
    },
    
    liveOrderStatus: {
      position: "중앙 하단",
      title: "Live Order Status", 
      columns: ["ORDER #", "ITEMS", "STATUS", "TIME"],
      statusTypes: {
        COOKING: { color: "blue", label: "조리중" },
        READY: { color: "green", label: "픽업 준비" },
        PENDING: { color: "orange", label: "대기중" }
      }
    },
    
    storeStatus: {
      position: "우측",
      title: "Store Status",
      items: [
        {
          category: "OPERATION STATUS",
          status: "Open & Operating", 
          color: "green"
        },
        {
          category: "STAFF ON DUTY",
          status: "3 Staff Members"
        },
        {
          category: "KITCHEN STATUS", 
          status: "Normal Operation",
          color: "green"
        },
        {
          category: "NEXT PICKUP",
          status: "#002",
          highlight: true
        }
      ]
    }
  }
};
```

## 🛡️ 솔루션 관리자 IA (운영자용)

### URL: `/admin`

### SaaS 운영자 구조

```javascript
const solutionAdminIA = {
  navigation: {
    dashboard: {
      name: "운영 대시보드",
      icon: "📊",
      content: [
        "전체 고객사 현황",
        "구독료 수익",
        "시스템 사용률", 
        "시스템 알림",
        "성장 지표"
      ]
    },
    
    clients: {
      name: "고객사 관리",
      icon: "🏪",
      children: [
        { name: "고객사 목록", path: "/admin/clients/list" },
        { name: "신규 가입 승인", path: "/admin/clients/approval" },
        { name: "계정 관리", path: "/admin/clients/accounts" },
        { name: "구독 상태", path: "/admin/clients/subscription" },
        { name: "사용량 분석", path: "/admin/clients/usage" },
        { name: "지원 티켓", path: "/admin/clients/tickets" }
      ]
    },
    
    subscription: {
      name: "구독 관리",
      icon: "💰",
      children: [
        { name: "결제 현황", path: "/admin/subscription/payments" },
        { name: "수익 분석", path: "/admin/subscription/revenue" },
        { name: "갱신 관리", path: "/admin/subscription/renewal" },
        { name: "결제 실패", path: "/admin/subscription/failed" },
        { name: "환불 처리", path: "/admin/subscription/refund" }
      ]
    },
    
    system: {
      name: "시스템 관리",
      icon: "🔧",
      children: [
        { name: "서버 모니터링", path: "/admin/system/monitoring" },
        { name: "성능 지표", path: "/admin/system/performance" },
        { name: "업데이트 관리", path: "/admin/system/updates" },
        { name: "보안 관리", path: "/admin/system/security" },
        { name: "백업 관리", path: "/admin/system/backup" }
      ]
    },
    
    support: {
      name: "고객 지원",
      icon: "🎫",
      children: [
        { name: "지원 티켓", path: "/admin/support/tickets" },
        { name: "원격 지원", path: "/admin/support/remote" },
        { name: "가이드 관리", path: "/admin/support/guides" },
        { name: "교육 자료", path: "/admin/support/training" },
        { name: "만족도 조사", path: "/admin/support/survey" }
      ]
    },
    
    analytics: {
      name: "분석 및 리포트",
      icon: "📊",
      children: [
        { name: "비즈니스 분석", path: "/admin/analytics/business" },
        { name: "사용자 행동", path: "/admin/analytics/behavior" },
        { name: "수익 분석", path: "/admin/analytics/revenue" },
        { name: "시장 동향", path: "/admin/analytics/market" },
        { name: "정기 리포트", path: "/admin/analytics/reports" }
      ]
    }
  }
};
```

## 🔗 URL 구조 및 라우팅

### 전체 URL 맵 (실제 UI 기반)

```javascript
const urlStructure = {
  // 메인 허브
  main: "https://pos.orderhere.center/",
  
  // 직접 접속 URL (실제 사용)
  directAccess: {
    dashboard: "/", // 메인 대시보드
    liveOrders: "/live-orders",
    pos: "/pos",
    kitchen: "/kitchen", 
    display: "/display",
    mobile: "/mobile",
    admin: "/admin", // 솔루션 관리자용
    setup: "/setup"
  },
  
  // 관리자 패널 세부 경로 (실제 UI 메뉴 기반)
  managementRoutes: {
    menu: "/menu",
    orders: "/orders",
    sales: "/sales", 
    customers: "/customers"
  },
  
  // 설정 경로
  settingsRoutes: {
    storeSettings: "/store-settings",
    logout: "/logout"
  },
  
  // 모바일 앱 경로 (기존 유지)
  mobileRoutes: {
    home: "/mobile/home",
    menu: "/mobile/menu/*",
    cart: "/mobile/cart",
    orders: "/mobile/orders/*",
    account: "/mobile/account/*"
  },
  
  // API 엔드포인트 (기존 유지)
  apiRoutes: {
    base: "/api/v1",
    auth: "/api/v1/auth/*",
    orders: "/api/v1/orders/*",
    menu: "/api/v1/menu/*",
    payment: "/api/v1/payment/*"
  }
};
```

## 🔒 권한별 접근 제어

### 접근 권한 매트릭스 (실제 UI 기반)

```javascript
const accessControl = {
  permissions: {
    // 솔루션 관리자 (모든 권한)
    solution_admin: ["*"],
    
    // 업체 관리자 (K-DINE과 같은 사용자)
    store_admin: [
      "/", "/dashboard", "/live-orders",
      "/menu", "/orders", "/sales", "/customers",
      "/store-settings",
      "/pos", "/kitchen", "/display"
    ],
    
    // 직원 (포스 터미널 위주)
    staff: [
      "/pos", "/pos/*", 
      "/live-orders" // 주문 현황 확인만
    ],
    
    // 주방 직원
    kitchen: [
      "/kitchen", "/kitchen/*",
      "/live-orders" // 주문 현황 확인만
    ],
    
    // 고객 (로그인 불필요)
    customer: [
      "/mobile", "/mobile/*", "/display"
    ]
  },

  // 자동 리다이렉트 규칙 (로그인 후)
  redirectRules: {
    solution_admin: "/admin",
    store_admin: "/dashboard", // K-DINE 같은 사용자는 대시보드로
    staff: "/pos",
    kitchen: "/kitchen",
    guest: "/mobile"
  },
  
  // 사이드바 메뉴 표시 권한
  sidebarAccess: {
    store_admin: {
      showAll: true,
      sections: ["navigation", "systemAccess", "management", "settings"]
    },
    staff: {
      showAll: false,
      sections: ["navigation"] // Dashboard, Live Orders만
    },
    kitchen: {
      showAll: false, 
      sections: [] // 사이드바 숨김, 주방 디스플레이만
    }
  }
};
```

## 📱 반응형 디자인 가이드

### 디바이스별 최적화

```javascript
const responsiveDesign = {
  // 포스 터미널 (태블릿/터치스크린)
  posTerminal: {
    screenSize: "10-15인치",
    orientation: "landscape",
    interaction: "터치",
    optimization: [
      "큰 버튼 (44px 이상)",
      "간단한 네비게이션",
      "터치 친화적 인터페이스"
    ]
  },
  
  // 주방 디스플레이 (모니터)
  kitchenDisplay: {
    screenSize: "19-24인치",
    orientation: "landscape", 
    interaction: "터치",
    optimization: [
      "원거리 가독성",
      "큰 폰트 크기",
      "명확한 색상 구분"
    ]
  },
  
  // 고객 디스플레이 (대형 모니터)
  customerDisplay: {
    screenSize: "32인치 이상",
    orientation: "portrait/landscape",
    interaction: "view-only",
    optimization: [
      "멀리서도 보이는 큰 텍스트",
      "브랜드 컬러 활용",
      "시각적 효과"
    ]
  },
  
  // 고객 모바일 (스마트폰)
  mobileApp: {
    screenSize: "4-7인치",
    orientation: "portrait",
    interaction: "터치",
    optimization: [
      "엄지 터치 영역",
      "세로 스크롤",
      "PWA 최적화"
    ]
  },
  
  // 관리자 패널 (PC/태블릿)
  adminPanel: {
    screenSize: "13인치 이상",
    orientation: "landscape",
    interaction: "마우스/터치",
    optimization: [
      "데이터 테이블",
      "차트/그래프",
      "멀티태스킹"
    ]
  }
};
```

## 📈 사용성 원칙

### 핵심 설계 원칙

```javascript
const usabilityPrinciples = {
  // 사용자 중심 설계
  userCentric: {
    staff: "빠른 주문 처리 중심",
    customer: "직관적인 주문 중심", 
    kitchen: "효율적인 조리 관리",
    admin: "종합적인 매장 관리"
  },
  
  // 작업 중심 구조
  taskOriented: [
    "주요 작업을 2클릭 내 접근",
    "자주 사용하는 기능 우선 배치",
    "작업 플로우에 맞는 순서"
  ],
  
  // 일관성 유지
  consistency: {
    branding: "색상, 타이포그래피, 아이콘",
    interaction: "버튼, 모달, 알림 방식",
    language: "메뉴 명명법, 메시지, 용어"
  },
  
  // 접근성 고려
  accessibility: {
    visual: "충분한 대비율 (4.5:1 이상)",
    auditory: "시각적 알림 (진동, 깜빡임)",
    physical: "터치 영역 44px 이상",
    cognitive: "단순 명확한 언어"
  }
};
```

---

## 📝 클로드 코드 개발 가이드

### IA 구현 시 주의사항 (실제 UI 기반)

1. **사이드바 네비게이션 구현**
   - 섹션별 제목 (SYSTEM ACCESS, MANAGEMENT, SETTINGS)
   - 아이콘 + 텍스트 조합
   - 활성 상태 표시 (파란색 하이라이트)
   - 외부 링크는 새 탭 열기

2. **대시보드 레이아웃**
   - 상단 4개 KPI 카드 (그리드 레이아웃)
   - System Quick Access (2x2 그리드)
   - Live Order Status (테이블)
   - Store Status (우측 고정)

3. **실시간 데이터 표시**
   - 주문 상태별 색상 구분
   - 픽업 번호 하이라이트
   - 자동 새로고침 (Socket.IO)

4. **반응형 디자인**
   - 태블릿/데스크톱 최적화
   - 카드형 레이아웃
   - 터치 친화적 버튼 크기

### 개발 우선순위 (실제 UI 기준)

1. **1단계**: 사이드바 네비게이션 + 기본 라우팅
2. **2단계**: 대시보드 레이아웃 (KPI 카드 + Quick Access)
3. **3단계**: Live Orders 테이블 + 실시간 업데이트
4. **4단계**: Store Status 위젯
5. **5단계**: 각 관리 페이지 (Menu, Orders, Sales, Customers)
6. **6단계**: Store Settings + 사용자 관리