# 테이블별 QR 세션 시스템

> **작성일:** 2026-04-03
> **상태:** 구현 중

## 1. 목표

Floor Plan에서 테이블별로 만료 기반 QR 코드를 인쇄하여,
고객이 매장 밖에서 이전 QR로 주문하는 것을 방지한다.

## 2. 핵심 개념

- QR URL에 랜덤 토큰 포함: `/mobile/slug?table=T001&token=abc123`
- 새 QR 발급 시 이전 토큰 자동 만료
- 설정한 시간(기본 3시간) 경과 시 자동 만료
- Settings에서 Static(영구) / Session(만료) 모드 선택

## 3. DB 모델

### TableQRSession
| 필드 | 타입 | 설명 |
|------|------|------|
| id | INT PK | |
| restaurant_id | FK | |
| table_number | STRING(20) | |
| token | STRING(64) UNIQUE | UUID v4 |
| status | ENUM('active','expired') | |
| expires_at | DATETIME | 생성시각 + 만료시간 |
| expired_by | STRING | 'new_qr' / 'time' / 'manual' / null |

### Restaurant.table_settings 확장
```json
{
  "qrMode": "session",
  "qrExpirationMinutes": 180,
  "allowWithoutToken": false
}
```

## 4. API

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | /api/restaurants/:id/tables/:tableNumber/qr | 새 QR 세션 생성 |
| GET | /api/restaurants/:id/tables/:tableNumber/qr | 현재 활성 QR 조회 |
| DELETE | /api/restaurants/:id/tables/:tableNumber/qr | 수동 만료 |
| GET | /api/mobile/verify-qr?token=xxx | 모바일 QR 유효성 확인 |

## 5. 프론트엔드 변경

### Floor Plan - TableDetailPanel
- [Print QR] 버튼 추가 (available/occupied 모두)
- QR 상태 표시 (Active 잔여시간 / No active QR)
- [Expire QR] 버튼 (수동 만료)

### Settings - Table Settings
- QR Mode: Static / Session 선택
- Expiration Time 입력 (Session 모드)

### Mobile Order
- token 파라미터 검증 로직 추가
- 만료 시 안내 화면
