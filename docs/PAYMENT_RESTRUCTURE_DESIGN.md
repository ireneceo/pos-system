# 결제수단 재정리 설계서

> **작성일:** 2026-03-15
> **규모:** 대 (DB 기본값 변경 + 마이그레이션 + Settings UI + PaymentModal + 모바일 + 리포트)

---

## 1. 요구사항 정리

### Before (8개)
| Key | Label | 문제점 |
|-----|-------|--------|
| cash | Cash | 유지 |
| card | Credit/Debit Card | Visa/Master 선택 없음 |
| ewallet | E-Wallet | TNG/GrabPay 등 PG 연동 config → 실제 안 쓰임 |
| bankTransfer | Bank Transfer | 유지 |
| qr | QR Payment | ewallet과 기능 중복 (QR 스캔 = E-Wallet) |
| counter | Pay at Counter | 유지 |
| online | Online Payment | 미구현 상태 |
| fpx | FPX Online Banking | online과 중복 (Stripe/PayPal 하위 기능) |

### After (7개)
| # | Key | Label | POS | Mobile | 변경점 |
|---|-----|-------|:---:|:------:|--------|
| 1 | cash | Cash | ✅ | - | 유지 |
| 2 | card | Card | ✅ | - | Visa/Master/Other 선택 추가. PG config 유지 |
| 3 | ewallet | E-Wallet | ✅ | ✅ | **기존 qr의 QR 이미지 업로드 기능으로 교체.** 기존 ewallet의 TNG/GrabPay config 삭제 |
| 4 | bankTransfer | Bank Transfer | ✅ | ✅ | 유지 |
| 5 | counter | Pay at Counter | - | ✅ | 유지 |
| 6 | online | Online Payment | - | ✅ | Stripe/PayPal 연동 (모바일 전용). 기존 online config 유지 |
| 7 | staffMeal | Staff Meal | ✅ | - | **신규.** 매출 제외, 원가 기록 |

### 삭제
| Key | 이유 | 마이그레이션 |
|-----|------|------------|
| qr | ewallet로 통합 | DB orders의 `payment_method='qr'` → 'ewallet'로 UPDATE |
| fpx | online으로 통합 | DB orders의 `payment_method='fpx'` → 'online'로 UPDATE |

---

## 2. 수정 대상 파일 목록

### 백엔드 (4개 파일)
| 파일 | 수정 내용 |
|------|----------|
| `models/Restaurant.js` | payment_settings 기본값 구조 변경 (qr/fpx 삭제, staffMeal 추가, ewallet 구조 변경, card에 cardType 추가) |
| `routes/store.js` | 저장 시 레거시 키 마이그레이션 (qr→ewallet, fpx→online) |
| `routes/dashboard.js` | 매출 통계에서 staffMeal 제외 |
| `마이그레이션 스크립트` | 기존 DB 데이터 변환 (1회성) |

### 프론트엔드 (7개 파일)
| 파일 | 수정 내용 |
|------|----------|
| `Settings/SettingsPage.tsx` | Payment 탭 UI 재구성 (ewallet→QR업로드, card→cardType, staffMeal 추가, qr/fpx/ewallet-config 삭제) |
| `POSTerminal/PaymentModal.tsx` | card 선택 시 카드종류 서브선택 + staffMeal 표시 |
| `POSTerminal/POSTerminalPage.tsx` | staffMeal 주문 시 매출 제외 플래그 |
| `mobile/pages/PaymentPage.tsx` | qr→ewallet, fpx→online 키 매핑 정리 |
| `mobile/pages/QRPaymentPage.tsx` | ewallet 키에서 qrImage 로드하도록 변경 |
| `LiveOrders/LiveOrdersPage.tsx` | staffMeal 표시 처리 |
| `FloorPlan/FloorPlanPage.tsx` | PaymentModal과 연동 (자동) |

### 리포트 관련 (2개 파일)
| 파일 | 수정 내용 |
|------|----------|
| `routes/dashboard.js` | paymentMethodSales에서 staffMeal 분리 (매출 합계 제외, 별도 항목으로 표시) |
| 프론트 Dashboard/Reports | staffMeal 표시 라벨 |

---

## 3. 상세 설계

### 3-1. Restaurant.js payment_settings 기본값

```javascript
{
  cash: {
    enabled: true,
    label: 'Cash',
    availableIn: ['pos']
  },
  card: {
    enabled: true,
    label: 'Card',
    availableIn: ['pos'],
    cardType: '',  // 'visa', 'master', 'amex', 'other', '' (미지정)
    provider: '',
    config: {
      ipay88MerchantCode: '', ipay88MerchantKey: '',
      molpayMerchantId: '', molpayVerifyKey: '', molpaySecretKey: '',
      '2c2pMerchantId': '', '2c2pSecretKey': '',
      stripePublicKey: '', stripeSecretKey: '',
      paypalClientId: '', paypalClientSecret: ''
    }
  },
  ewallet: {
    enabled: true,
    label: 'E-Wallet',
    availableIn: ['pos', 'mobile'],
    qrImage: ''  // QR 이미지 (기존 qr.qrImage에서 이동)
  },
  bankTransfer: {
    enabled: true,
    label: 'Bank Transfer',
    availableIn: ['pos', 'mobile'],
    bankName: '', accountNumber: '', accountName: ''
  },
  counter: {
    enabled: true,
    label: 'Pay at Counter',
    availableIn: ['mobile']
  },
  online: {
    enabled: false,
    label: 'Online Payment',
    availableIn: ['mobile'],
    provider: '',  // 'stripe', 'paypal', 'both'
    config: {
      stripePublicKey: '', stripeSecretKey: '',
      paypalClientId: '', paypalClientSecret: ''
    }
  },
  staffMeal: {
    enabled: false,
    label: 'Staff Meal',
    availableIn: ['pos']
  }
}
```

### 3-2. Settings UI 변경

**ewallet 섹션 (기존 qr 기능으로 교체):**
- 기존: E-Wallet Provider 선택 (TNG/GrabPay/Boost/ShopeePay) + API config
- 신규: QR Code Image 업로드 (ImageUploadDropzone) — 기존 QR Payment과 동일

**card 섹션 (cardType 추가):**
- 기존: Provider 선택 (iPay88/MOLPay 등) + API config
- 신규: Card Type 선택 (Visa/Master/Amex/Other) + 기존 Provider/config 유지

**staffMeal 섹션:**
- 토글만 (POS 전용, 추가 설정 없음)
- 설명 텍스트: "Staff meals are recorded at full price but excluded from revenue reports."

**삭제:**
- qr/qrPayment 섹션 전체
- fpx 섹션 전체
- ewallet의 TNG/GrabPay/Boost/ShopeePay config 전체

### 3-3. PaymentModal 변경

**card 선택 시:**
- Cash의 Quick Amount 버튼처럼, Card 선택 시 카드종류 버튼 그리드 표시
- 버튼: Visa / Master / Amex / Other (4개 그리드)
- 기본 선택: 없음 (필수 선택)
- orders 테이블에 `card_type` VARCHAR(20) 필드 추가
- 저장: payment_method='card', card_type='visa'|'master'|'amex'|'other'
- Dashboard/Reports에서 카드종류별 매출 통계 표시

**staffMeal 선택 시:**
- 거스름돈/입금액 UI 불필요 (금액 0원 처리 아님, 원가 기록)
- "This order will be recorded as staff meal and excluded from revenue." 안내 문구

### 3-4. 모바일 PaymentPage 변경

- `qr` / `qrPayment` 키 → `ewallet` 키에서 qrImage 로드
- `fpx` 키 → 삭제 (online으로 통합)
- QRPaymentPage: `payment_settings.ewallet.qrImage` 에서 이미지 로드

### 3-5. Dashboard/Reports - staffMeal 처리

**dashboard.js paymentMethodSales:**
```javascript
// 기존: 모든 payment_method 합산
// 변경: staffMeal은 별도 집계
const isStaffMeal = order.payment_method === 'staffMeal';
if (!isStaffMeal) {
  // 일반 매출에 포함
  totalRevenue += orderAmount;
}
// staffMeal은 별도 카운터
```

### 3-6. DB 마이그레이션 (1회성 스크립트)

```javascript
// 1. orders 테이블: payment_method 값 변환
UPDATE orders SET payment_method = 'ewallet' WHERE payment_method IN ('qr', 'QR Payment');
UPDATE orders SET payment_method = 'online' WHERE payment_method IN ('fpx', 'FPX');

// 2. restaurants 테이블: payment_settings JSON 변환
// - qr/qrPayment의 qrImage → ewallet.qrImage로 이동
// - fpx 키 삭제
// - ewallet의 provider/config 삭제, qrImage 추가
// - staffMeal 키 추가
// - _order 배열에서 qr/qrPayment/fpx 제거, staffMeal 추가
```

---

## 4. 구현 순서

| 단계 | 작업 | 의존성 |
|------|------|--------|
| 1 | Restaurant.js 기본값 변경 | - |
| 2 | store.js 저장 시 레거시 키 마이그레이션 | 1 |
| 3 | DB 마이그레이션 스크립트 실행 | 1 |
| 4 | SettingsPage.tsx Payment UI 재구성 | 1 |
| 5 | PaymentModal.tsx card/staffMeal 처리 | 1 |
| 6 | mobile PaymentPage + QRPaymentPage 수정 | 1, 3 |
| 7 | dashboard.js staffMeal 매출 제외 | 1 |
| 8 | 빌드 + 검증 | 1-7 |

---

## 5. 하위 호환성

- **기존 저장된 payment_settings**: store.js에서 저장 시 자동 마이그레이션 (qr→ewallet, fpx→online)
- **기존 orders**: 마이그레이션 스크립트로 일괄 변환
- **API 응답**: payment_method 값은 문자열이므로 호환 문제 없음
