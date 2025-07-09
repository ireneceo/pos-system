# 푸드코트 포스시스템 API 설계

## 📋 문서 정보
- **문서명**: API 설계 명세서
- **버전**: v1.0
- **최종수정**: 2025-07-08
- **작성목적**: 클로드 코드 개발 가이드용

## 🌐 기본 정보

- **Base URL**: `https://pos.orderhere.center/api`
- **인증**: JWT Bearer Token
- **응답 형식**: JSON
- **HTTP 상태코드**: 200(성공), 400(잘못된요청), 401(인증필요), 403(권한없음), 404(없음), 500(서버오류)

## 📄 공통 응답 구조

```json
{
  "success": true,
  "data": {...},
  "message": "string",
  "error": null
}
```

### 에러 응답 예시

```json
{
  "success": false,
  "data": null,
  "message": "메뉴를 찾을 수 없습니다",
  "error": {
    "code": "MENU_NOT_FOUND",
    "details": "Menu ID 999 does not exist"
  }
}
```

## 🔐 1. 인증 API

### POST /auth/register
**업체 회원가입**

```json
Request:
{
  "store_info": {
    "name": "맛있는 푸드코트",
    "business_number": "123-45-67890",
    "owner_name": "김사장",
    "phone": "010-1234-5678",
    "email": "store@example.com",
    "address": "서울시 강남구..."
  },
  "admin_info": {
    "email": "admin@store.com",
    "password": "password123",
    "name": "김사장",
    "phone": "010-1234-5678"
  }
}

Response:
{
  "success": true,
  "data": {
    "store_id": 1,
    "user_id": 1,
    "message": "회원가입이 완료되었습니다. 승인 후 이용 가능합니다."
  }
}
```

### POST /auth/login
**로그인**

```json
Request:
{
  "email": "admin@store.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "admin@store.com",
      "name": "김사장",
      "role": "store_admin",
      "store_id": 1,
      "store": {
        "id": 1,
        "name": "맛있는 푸드코트",
        "logo_url": "https://...",
        "primary_color": "#2563EB"
      }
    }
  }
}
```

### POST /auth/logout
**로그아웃**

```json
Request: {} (Header에 Authorization)
Response: {"success": true}
```

### GET /auth/me
**현재 사용자 정보**

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "email": "admin@store.com",
    "name": "김사장",
    "role": "store_admin",
    "store_id": 1,
    "permissions": ["manage_menu", "manage_staff", "view_sales"]
  }
}
```

## 🏪 2. 매장 정보 API

### GET /stores/my
**내 매장 정보**

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "맛있는 푸드코트",
    "logo_url": "https://...",
    "primary_color": "#2563EB",
    "secondary_color": "#EF4444",
    "open_time": "09:00:00",
    "close_time": "22:00:00",
    "is_open": true
  }
}
```

### PUT /stores/my
**매장 정보 수정 (관리자만)**

```json
Request:
{
  "name": "새로운 매장명",
  "primary_color": "#FF0000",
  "open_time": "08:00:00"
}
```

## 📂 3. 메뉴 카테고리 API

### GET /categories
**카테고리 목록**

```json
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "한식",
      "sort_order": 1,
      "is_active": true
    }
  ]
}
```

### POST /categories
**카테고리 추가 (관리자만)**

```json
Request:
{
  "name": "한식",
  "sort_order": 1
}
```

## 🍽️ 4. 메뉴 API

### GET /menus
**메뉴 목록**

```json
Query Parameters:
- category_id: number (선택)
- available_only: boolean (기본값: true)

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "김치찌개",
      "description": "맛있는 김치찌개",
      "base_price": 8000,
      "image_url": "https://...",
      "category_id": 1,
      "category_name": "한식",
      "is_available": true,
      "is_popular": false,
      "options": [
        {
          "group_id": 1,
          "group_name": "맵기 정도",
          "selection_type": "single",
          "is_required": true,
          "items": [
            {
              "id": 1,
              "name": "안 맵게",
              "price_adjustment": 0
            }
          ]
        }
      ]
    }
  ]
}
```

### GET /menus/:id
**메뉴 상세**

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "김치찌개",
    "base_price": 8000,
    "options": [...]
  }
}
```

### POST /menus
**메뉴 추가 (관리자만)**

```json
Request:
{
  "name": "김치찌개",
  "description": "맛있는 김치찌개",
  "base_price": 8000,
  "category_id": 1,
  "image_url": "https://...",
  "option_group_ids": [1, 2]
}
```

### PUT /menus/:id
**메뉴 수정 (관리자만)**

### PUT /menus/:id/availability
**메뉴 품절/판매 상태 변경**

```json
Request:
{
  "is_available": false
}
```

## ⚙️ 5. 옵션 API

### GET /option-groups
**옵션 그룹 목록 (관리자만)**

```json
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "맵기 정도",
      "selection_type": "single",
      "is_required": true,
      "items": [
        {
          "id": 1,
          "name": "안 맵게",
          "price_adjustment": 0,
          "is_available": true
        }
      ]
    }
  ]
}
```

### POST /option-groups
**옵션 그룹 추가 (관리자만)**

```json
Request:
{
  "name": "맵기 정도",
  "selection_type": "single",
  "is_required": true
}
```

### POST /option-groups/:id/items
**옵션 항목 추가 (관리자만)**

```json
Request:
{
  "name": "안 맵게",
  "price_adjustment": 0,
  "sort_order": 1
}
```

## 📋 6. 주문 API

### GET /orders
**주문 목록**

```json
Query Parameters:
- status: string (pending|paid|preparing|ready|completed)
- order_source: string (pos|mobile)
- date: string (YYYY-MM-DD)
- limit: number
- offset: number

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "pickup_number": "042",
      "status": "preparing",
      "order_source": "pos",
      "total_amount": 17000,
      "final_amount": 17000,
      "customer_phone": "010-1234-5678",
      "ordered_at": "2025-01-15T10:30:00Z",
      "items": [
        {
          "id": 1,
          "menu_name": "김치찌개",
          "quantity": 2,
          "unit_price": 8500,
          "total_price": 17000,
          "selected_options": [
            {
              "group_name": "맵기 정도",
              "item_name": "매운맛",
              "price_adjustment": 500
            }
          ]
        }
      ]
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0
  }
}
```

### GET /orders/:id
**주문 상세**

```json
Response: 위와 동일한 구조의 단일 주문
```

### POST /orders
**주문 생성**

```json
Request:
{
  "items": [
    {
      "menu_item_id": 1,
      "quantity": 2,
      "selected_options": [
        {
          "option_group_id": 1,
          "option_item_id": 3
        }
      ],
      "special_notes": "알레르기 주의"
    }
  ],
  "order_source": "pos|mobile",
  "payment_method": "cash|card|mobile_card|mobile_pay",

  // 고객 정보 (비회원도 주문 가능)
  "customer_phone": "010-9999-8888",
  "customer_name": "김고객",
  "customer_id": 1, // 회원인 경우만

  // 포인트 사용 (회원만)
  "points_to_use": 500,

  // 포스 주문시 직원 할인
  "staff_discount_reason": "단골 할인" // 포스에서만
}

Response:
{
  "success": true,
  "data": {
    "order_id": 123,
    "pickup_number": "042",
    "total_amount": 17000,
    "points_used": 500,
    "points_earned": 170,
    "final_amount": 16500,
    "payment_url": "https://..." // 모바일 결제시에만
  }
}
```

### PUT /orders/:id/status
**주문 상태 변경**

```json
Request:
{
  "status": "preparing|ready|completed|cancelled"
}
```

### GET /orders/current
**현재 활성 주문들 (주방/디스플레이용)**

```json
Response:
{
  "success": true,
  "data": {
    "preparing": [...], // 조리중 주문들
    "ready": [...],     // 완료된 주문들
    "pickup_queue": ["042", "043", "044"] // 픽업 대기 번호들
  }
}
```

## 💳 7. 결제 API

### POST /payments/process
**결제 처리**

```json
Request:
{
  "order_id": 123,
  "payment_method": "card|cash|mobile_card|mobile_pay",
  "amount": 17000,
  "card_info": {...} // 카드 결제시
}

Response:
{
  "success": true,
  "data": {
    "payment_id": 456,
    "status": "completed",
    "transaction_id": "TXN123456"
  }
}
```

## 🔢 8. 픽업 번호 API

### GET /pickup/current
**현재 픽업 현황**

```json
Response:
{
  "success": true,
  "data": {
    "ready_numbers": ["041", "042", "043"],
    "preparing_numbers": ["044", "045", "046"],
    "next_number": "047"
  }
}
```

### POST /pickup/complete
**픽업 완료 처리**

```json
Request:
{
  "pickup_number": "042"
}
```

## 📊 9. 매출/분석 API

### GET /analytics/dashboard
**대시보드 데이터**

```json
Response:
{
  "success": true,
  "data": {
    "today_sales": 450000,
    "today_orders": 52,
    "today_customers": 48,
    "avg_wait_time": "8분",
    "popular_menus": [...],
    "hourly_sales": [...]
  }
}
```

### GET /analytics/sales
**매출 분석**

```json
Query Parameters:
- period: string (today|week|month|year)
- start_date: string
- end_date: string
- group_by: string (hour|day|week|month)

Response:
{
  "success": true,
  "data": {
    "total_sales": 1250000,
    "total_orders": 156,
    "avg_order_value": 8012,
    "chart_data": [
      {"date": "2025-01-15", "sales": 450000, "orders": 52}
    ],
    "top_menus": [...]
  }
}
```

## 👨‍💼 10. 직원 관리 API

### GET /staff
**직원 목록 (관리자만)**

```json
Response:
{
  "success": true,
  "data": [
    {
      "id": 2,
      "email": "staff1@store.com",
      "name": "이직원",
      "phone": "010-2345-6789",
      "role": "staff",
      "position": "계산원",
      "hourly_wage": 9500.00,
      "is_active": true,
      "last_login_at": "2025-01-15T09:00:00Z"
    }
  ]
}
```

### POST /staff
**직원 추가 (관리자만)**

```json
Request:
{
  "email": "staff2@store.com",
  "password": "temp_password",
  "name": "박직원",
  "phone": "010-3456-7890",
  "role": "staff|kitchen",
  "position": "계산원",
  "hourly_wage": 9500.00,
  "permissions": ["process_orders", "view_menu"]
}
```

### PUT /staff/:id
**직원 정보 수정 (관리자만)**

### DELETE /staff/:id
**직원 삭제 (관리자만)**

## 👥 11. 고객 관리 API

### GET /customers
**고객 목록 (관리자만)**

```json
Query Parameters:
- is_member: boolean (회원만/비회원만)
- search: string (이름/전화번호 검색)

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "phone": "010-9999-8888",
      "name": "김고객",
      "email": "customer@example.com",
      "is_member": true,
      "total_points": 1500,
      "total_orders": 12,
      "total_spent": 156000,
      "last_order_at": "2025-01-15T12:30:00Z"
    }
  ]
}
```

### GET /customers/:id
**고객 상세 정보**

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "phone": "010-9999-8888",
    "name": "김고객",
    "total_points": 1500,
    "favorite_menus": [...],
    "recent_orders": [...],
    "preferences": {
      "맵기 정도": "많이 맵게"
    }
  }
}
```

### POST /customers/register
**고객 회원가입 (모바일에서)**

```json
Request:
{
  "phone": "010-9999-8888",
  "email": "customer@example.com",
  "password": "password123",
  "name": "김고객",
  "birth_date": "1990-01-01"
}

Response:
{
  "success": true,
  "data": {
    "customer_id": 1,
    "welcome_points": 1000
  }
}
```

### POST /customers/login
**고객 로그인 (모바일에서)**

```json
Request:
{
  "phone": "010-9999-8888",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "token": "customer_jwt_token",
    "customer": {
      "id": 1,
      "name": "김고객",
      "phone": "010-9999-8888",
      "total_points": 1500,
      "is_member": true
    }
  }
}
```

### GET /customers/me
**내 정보 (고객용)**

```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "김고객",
    "phone": "010-9999-8888",
    "email": "customer@example.com",
    "total_points": 1500,
    "total_orders": 12,
    "favorite_menus": [...],
    "recent_orders": [...]
  }
}
```

## 📁 12. 파일 업로드 API

### POST /upload/image
**이미지 업로드**

```json
Request: FormData with 'image' field

Response:
{
  "success": true,
  "data": {
    "url": "https://pos.orderhere.center/uploads/menu_123.jpg"
  }
}
```

## 🔄 13. 실시간 WebSocket API

### Connection

```javascript
// 주방용
socket = io('https://pos.orderhere.center/kitchen')

// 고객 디스플레이용
socket = io('https://pos.orderhere.center/display')

// 포스용
socket = io('https://pos.orderhere.center/pos')
```

### Events

#### 새 주문 (주방으로)

```javascript
socket.emit('new-order', {
  order_id: 123,
  pickup_number: "042",
  items: [...],
  special_notes: "알레르기 주의"
})
```

#### 조리 완료 (모든 클라이언트로)

```javascript
socket.emit('order-ready', {
  order_id: 123,
  pickup_number: "042"
})
```

#### 픽업 완료 (디스플레이에서 번호 제거)

```javascript
socket.emit('order-completed', {
  pickup_number: "042"
})
```

#### 재고/메뉴 변경 (모든 클라이언트로)

```javascript
socket.emit('menu-updated', {
  menu_id: 1,
  is_available: false
})
```

## 🔒 인증 및 권한

### JWT 토큰 구조

```json
{
  "user_id": 1,
  "email": "admin@store.com",
  "role": "store_admin",
  "store_id": 1,
  "permissions": ["manage_menu", "manage_staff", "view_sales"],
  "exp": 1640995200
}
```

### 권한별 API 접근

```javascript
const apiPermissions = {
  // 솔루션 관리자 (모든 API)
  solution_admin: ["*"],
  
  // 업체 관리자
  store_admin: [
    "/auth/*", "/stores/*", "/categories/*", "/menus/*", 
    "/option-groups/*", "/orders/*", "/payments/*", 
    "/pickup/*", "/analytics/*", "/staff/*", "/customers/*", 
    "/upload/*"
  ],
  
  // 직원
  staff: [
    "/auth/me", "/auth/logout", "/menus", "/orders", 
    "/orders/current", "/pickup/*", "/payments/process"
  ],
  
  // 주방 직원
  kitchen: [
    "/auth/me", "/auth/logout", "/orders/current", "/orders/:id/status"
  ],
  
  // 고객
  customer: [
    "/customers/register", "/customers/login", "/customers/me",
    "/menus", "/orders", "/pickup/current"
  ]
};
```

## 📝 클로드 코드 개발 가이드

### API 구현 시 주의사항

1. **인증 미들웨어**
   - JWT 토큰 검증
   - 권한별 접근 제어
   - 토큰 만료 처리

2. **데이터 검증**
   - 입력값 유효성 검사
   - SQL Injection 방지
   - XSS 공격 방지

3. **에러 처리**
   - 표준화된 에러 응답
   - 적절한 HTTP 상태코드
   - 로깅 및 모니터링

4. **실시간 통신**
   - Socket.IO 네임스페이스 분리
   - 재연결 처리
   - 데이터 동기화

### 구현 우선순위

1. **1단계**: 인증 API + 기본 CRUD
2. **2단계**: 주문 API + 결제 API  
3. **3단계**: 실시간 Socket.IO
4. **4단계**: 분석/매출 API
5. **5단계**: 파일 업로드 + 최적화