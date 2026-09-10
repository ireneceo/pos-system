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

---

## 6. 🔒 주문 세션 수명 — 낡은 테이블 번호가 다음 주문에 붙지 않게 (2026-09-10)

**Irene 신고**: 「`/mobile/with-min-cafe` 에 테이블 지정 없이 들어갔는데 맨 위에 T001 이 뜬다」.

### 무엇이 문제였나 (실측)
`localStorage.tableNumber` 를 **지우는 곳이 사실상 없었다.** QR 스캔 시 `setActiveTable` 로 저장되고,
`?table=` 없이 들어오면 그 값으로 폴백한다(`OrderTypePage.tsx:594`). 전 코드에서 `clearActiveTable()`
호출은 키오스크 유휴 리셋 한 곳뿐이었다 — 주문을 마쳐도, 탭을 닫아도, 시간이 지나도 남는다.

**표시만의 문제가 아니다.** 대표 QR(테이블 없는 링크) + `tableNumberRequired` 조합에서
강제 테이블 선택이 **낡은 값으로 우회**되고, `PaymentPage.tsx:1092` 가 같은 값을 읽어 주문을 낸다.
→ 지난주 T001 을 찍은 손님이 오늘 링크를 열면 **앉은 자리와 무관하게 T001 로 주방티켓**이 나간다.

### 판정 (2026-09-10 Fable · Irene 승인) — «주문 성공 후 삭제»가 아니라 **세션 만료**
기각된 선택지와 이유:
- 주문 성공 후 삭제 → +Round(추가 주문) 때 매번 다시 찍어야 하고 2026-06-12 규칙이 깨진다
- 탭 단위만 유지(localStorage 폴백 제거) → 2026-06-12 문제 재발(탭 날아가면 테이블 분실)
- 진입 화면에서 확인만 받기 → `PaymentPage` 는 그대로 옛 값으로 주문을 낸다

2026-06-12 「탭이 날아가도 결제 재개 시 테이블을 잃지 않는다」는 옳다. **그 «재개»에 시간 제한이
없던 것이 결함**이다. 제한만 세운다.

### 규칙
| | |
|---|---|
| 스탬프 키 | `localStorage.mobile_order_session_at` |
| 갱신 시점 | **쓰기만** — `setActiveTable` · 장바구니 변경(담기/수량/삭제) · `setOrderType` |
| 갱신 안 함 | **읽기** — 낡은 방문이 스스로를 되살리지 못하게 |
| TTL | **4시간** (한 끼 식사 최대치) |
| 만료 시 | 테이블 · 장바구니 · 주문유형을 **함께** 삭제 |
| 스탬프 없음 | 마지막 쓰기 시각을 모르므로 **만료로 본다** (배포 직후 1회 비워짐) |
| 무변경 | QR 스캔 우선순위 · 탭별 권위 `sessionStorage.qrScanTable` |

셋을 함께 지우는 이유: `MobileOrderContext` 의 불변식 **«장바구니 살아있음 ⇒ 테이블 살아있음»**
(2026-06-12) 을 지켜야 한다. 따로 지우면 테이블 없는 dine-in 주문이 다시 생긴다.

**구현**: `src/mobile/utils/tableSession.ts` (`touchOrderSession` / `isOrderSessionExpired` /
`expireOrderSessionIfStale`), `MobileOrderContext.tsx` (페이지 로드당 1회 만료 sweep + 쓰기 스탬프).

### 키오스크 결제화면 유휴 (같은 묶음)
종전에는 `/payment` 에서 유휴 감시를 **아예 껐다**. 그래서 결제 직전에 떠난 손님의 장바구니가
결제 화면에 영구히 남았다. → **5분** 타임아웃을 주되, 결제 요청이 이미 나간 뒤에는 리셋하지 않는다
(`kioskMode.setPaymentInFlight` / `isPaymentInFlight`, `MobileLayout` 이 읽는다).
`/order/*`(주문 추적)은 종전대로 감시하지 않는다.

### 안전망
`dev-frontend/e2e/mobile-order-session-ttl.spec.js` 5건 — 3회 연속 5/5.
**고장주입 반증 완료**: 만료 검사를 끄고 빌드하니 ①④가 실패해 T001 이 그대로 재현됐고,
원복 빌드의 번들 해시가 주입 이전과 **동일**(`main.da2deb9a.js`)했다.

⛔ 이 영역은 2026-06-29 「A-4 주문이 A22 로 나간 사고」를 고치며 설계한 코드다. 추측 수정 금지.
