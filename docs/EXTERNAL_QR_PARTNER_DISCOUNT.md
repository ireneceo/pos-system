# External QR + Partner Coupon Auto-Apply

## 목적

협력업체 (호텔, 사무실, 입주사 등) 직원이 식당 주문 시 **External QR 스캔만으로 자동 할인** 적용. 매번 쿠폰 코드 입력 없이.

## 핵심 결정

| 항목 | 결정 |
|------|------|
| 할인 모델 | **기존 Coupon 시스템 재사용** (별도 모델 X) |
| 매핑 단위 | ExternalQR 1개 ↔ Coupon 1개 (1:1) |
| 백워드 호환 | 기존 string-form QR (coupon_id 없음) 그대로 동작 |
| 우선순위 | QR 자동 쿠폰 적용 시 수동 쿠폰 입력 disabled |

**대안 (논의 후 폐기)**:
- A. ExternalQR 자체에 discount 필드 — 쿠폰 시스템 무시. over-engineering reverse (이미 있는 시스템 재사용)
- C. Coupon 에 audience_type 추가 + 탭 분리 — 협력업체 30개+ 수준에서 의미. 일반 식당 use case (5~10개) 에선 over-engineering

## 데이터 모델

### `restaurant.table_settings.externalQRs` JSON 형식 변경

**Before (string array)**:
```json
["Hotel ABC", "Office Tower B"]
```

**After (object array)**:
```json
[
  { "name": "Hotel ABC", "coupon_id": 7 },
  { "name": "Office Tower B" }
]
```

**백필**: `string` → `{ name: string }` 자동 변환 (Settings 페이지 load 시 normalize).

### Coupon 모델
**변경 없음.** 기존 그대로 — `is_active`, `valid_from/until`, `usage_limit` 등 정교한 기능 모두 활용.

## API

### 신규: `GET /api/restaurants/:id/external-qr-coupon?name=<table>`

**용도**: 모바일 주문 진입 시 (`?table=Hotel ABC`) 매핑된 쿠폰 + 유효성 조회.

**인증**: 익명 가능 (모바일 첫 진입). restaurant_id 와 table name 로 매핑 조회.

**응답**:
```json
{
  "success": true,
  "data": {
    "linked": true,
    "coupon": {
      "id": 7,
      "code": "PARTNER10",
      "name": "Hotel ABC partner",
      "type": "percentage",
      "value": 10,
      "min_order": 0,
      "max_discount": null,
      "valid_from": null,
      "valid_until": null,
      "is_active": true,
      "applicable_order_types": null
    }
  }
}
```

매핑 없거나 쿠폰 비활성/만료 시: `{ success: true, data: { linked: false } }`.

### 신규: `GET /api/restaurants/:id/coupons/active`
**용도**: Settings 의 "Link coupon" 드롭다운 채울 active 쿠폰 목록.
**인증**: authenticateToken + checkRestaurantAccess.

## UI

### 1. Settings → External QR 섹션
- 추가 폼: 이름 입력 + **"Link coupon (optional)"** select (active 쿠폰 목록)
- 추가된 QR list 항목 옆: 연결된 쿠폰 이름 + 값 표시 (예: `Hotel ABC — PARTNER10 (10%)`)
- 매핑 변경 가능 — 연필 아이콘 → 쿠폰 select 변경 → 자동 저장 (AutoSave)

### 2. Mobile PaymentPage
- mount 시 `?table=` → `external-qr-coupon` API 호출
- `linked: true` 면 자동 적용:
  - `couponCode` state set
  - `couponDiscount` 계산
  - 안내 배너 (정적, 보라색 #635BFF 톤): `🎁 ${name} partner discount automatically applied — ${value}% off`  *(이모지 X — 텍스트만 사용)*
  - 수동 쿠폰 입력 input `disabled` + helper text: "Partner discount in effect — manual coupon input disabled"

### 3. Coupons list
- 각 쿠폰 row 에 "Linked to" 뱃지 — 해당 쿠폰을 참조하는 ExternalQR 이름 list (예: `Hotel ABC, Office Tower B`)
- 쿠폰 비활성/삭제 시 경고: "이 쿠폰은 N 개 External QR 에 연결됨. 비활성/삭제 시 자동 할인 사라짐"

## 흐름 종단

```
[Restaurant Admin]
Settings → External QR → Add: "Hotel ABC" + Link coupon: PARTNER10 → Save
                          ↓
restaurant.table_settings.externalQRs = [{name:"Hotel ABC", coupon_id:7}]

[Hotel ABC 직원]
QR 스캔 → /mobile/{slug}?table=Hotel%20ABC
            ↓
모바일 메뉴 진입 → (선택) 안내 배너
            ↓
장바구니 → PaymentPage 진입
            ↓
fetch GET /external-qr-coupon?name=Hotel%20ABC
            ↓
linked:true, coupon=PARTNER10
            ↓
state: couponCode=PARTNER10, couponDiscount=계산값
배너: "Hotel ABC partner discount automatically applied — 10% off"
수동 쿠폰 input: disabled
            ↓
결제 → order.coupon_code=PARTNER10, coupon_discount=...
            ↓
백엔드 orders-crud 가 기존 흐름으로 적용 + Coupon.usage_count +=1
```

## 보안

- `external-qr-coupon` 익명 호출 가능 — 노출되는 정보는 쿠폰의 공개 가능 필드 (code/name/value/type) 만. `target_customer_ids` 같은 민감 필드 제외.
- ExternalQR name 은 user 입력 — 응답 분기 시 SQL injection 방어 (Sequelize ORM 자동).
- 매핑 변경 시 checkRestaurantAccess.

## 검증 시나리오

1. 일반 (string) QR — 동작 동일 (linked:false)
2. 매핑 QR — 자동 적용
3. 비활성 쿠폰 매핑 QR — linked:false
4. 만료 쿠폰 매핑 QR — linked:false
5. Min order 미달 — 자동 적용 시도하지만 결제 단계에서 거부 (기존 validate 로직)
6. 같은 쿠폰을 여러 QR 에 연결 — Coupons list 에 다중 표시
7. 쿠폰 삭제 시 unlink — 경고 표시 후 삭제 또는 abort

## i18n

신규 사용자 노출 텍스트:
- "Link coupon (optional)"
- "Partner discount in effect — manual coupon input disabled"
- "{name} partner discount automatically applied — {value}% off"
- "Linked to: ..."

→ `mobile`, `settings` namespace 에 4 언어 키 추가.

## 작업 분량
- DB: 0 (JSON 형식만 변경)
- Backend: 2 endpoint (~150 줄)
- Frontend: 3 페이지 수정 (~250 줄)
- 검증 + 커밋: 30분
