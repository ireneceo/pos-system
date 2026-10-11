/**
 * 새로 만들어지는 매장의 결제 기본 설정 — 단일 소스.
 *
 * 2026-10-11 Irene 지시: «레스토랑 결제 기본설정 처음 가입한 고객은 지금 내가 넣은 여기 설정대로 해줘»
 *   (기준 = 개발 데모 매장 38 Settings › Payment, 2026-10-11 03:02 UTC 저장값)
 *   - 현금 꺼짐 · 카드 POS+키오스크(단말기 연동 꺼짐) · 이월렛 POS+모바일 · 계좌이체 꺼짐
 *   - 카운터 결제 모바일(매장·포장·픽업) · 온라인 결제 꺼짐(키 비움) · 직원식사 POS
 *   - 키오스크 열은 따로 정한 상태(_kioskSplit) — 키오스크엔 카드만
 *
 * 쓰는 곳: 매장이 «만들어지는 순간» 3곳(가입 authService · 관리자 생성 restaurants-crud · 오너 생성 owner).
 * 이미 있는 매장(payment_settings 가 비어 있는 매장 포함)은 바뀌지 않는다 — 그 매장들은
 * models/Restaurant.js 의 옛 기본값(getter)을 그대로 읽는다.
 */
function newRestaurantPaymentSettings() {
  return {
    cash: { enabled: false, label: 'Cash', availableIn: [] },
    card: {
      enabled: true,
      label: 'Card',
      availableIn: ['pos', 'kiosk'],
      terminal: { enabled: false, provider: 'ghl_ecr', host: '', port: 33898, transport: 'http-hex', duitnow: true }
    },
    ewallet: { enabled: true, label: 'E-Wallet', availableIn: ['pos', 'mobile'], qrImage: '' },
    bankTransfer: { enabled: false, label: 'Bank Transfer', availableIn: [], bankName: '', accountNumber: '', accountName: '' },
    counter: { enabled: true, label: 'Pay at Counter', availableIn: ['mobile'], allowed_order_types: ['dine-in', 'takeaway', 'pickup'] },
    online: {
      enabled: false,
      label: 'Online Payment',
      availableIn: [],
      provider: '',
      config: { stripePublicKey: '', stripeSecretKey: '', paypalClientId: '', paypalClientSecret: '' }
    },
    staffMeal: { enabled: true, label: 'Staff Meal', availableIn: ['pos'] },
    _kioskSplit: true,
    _order: ['cash', 'card', 'ewallet', 'bankTransfer', 'counter', 'online', 'staffMeal']
  };
}

module.exports = { newRestaurantPaymentSettings };
