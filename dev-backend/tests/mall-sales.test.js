// IOI Mall (Tangent SalesHourly) 매출 보고 계약 회귀 테스트 (순수 함수 + fetch stub, DB/네트워크 불필요).
//
// The Fire(IOI Mall 입점)의 시간별 매출을 몰에 보고한다. 2026-07-23 Tangent 공식 스펙 대조로
// 버그 2건을 수정했고, 이 파일이 그 수정을 회귀로 박제한다 (Fable 게이트 CONDITIONAL GO 조건):
//   1. tender 필드는 gto 와 같은 "SST 전" 기준 → tender 합계 == gto (몰의 tender↔GTO 대조 통과).
//   2. 검증 실패가 HTTP 200 + {"status":"error"} 로 온다 → status 가 'success' 가 아니면 실패로 던진다
//      (fail-closed: 부재·비JSON 200 도 실패 — 조용한 미보고 금지).

const svc = require('../services/mallSalesService');
const { accrueOrderTenders, emptyHour } = svc._internal;

const tenderSum = (b) =>
  b.cash + b.tng + b.visa + b.mastercard + b.amex + b.voucher + b.othersamount;

describe('tender = SST 전, 합계 == gto (버그1)', () => {
  test('단일 결제(ewallet): othersamount = gto, SST 제외', () => {
    // The Fire 7/12 실주문: total 279.00, tax(SST) 14.43 → gto 264.57
    const b = emptyHour();
    accrueOrderTenders(b, 279.00, 14.43, [{ payment_method: 'ewallet', card_type: null, amount: 279.00 }], null, null);
    expect(b.othersamount).toBeCloseTo(264.57, 2);   // 279.00 아님 — SST 제거됨
    expect(tenderSum(b)).toBeCloseTo(264.57, 2);      // == gto
  });

  test('주문레벨 폴백(결제 미기록): gto 전액이 주문 결제수단으로', () => {
    const b = emptyHour();
    accrueOrderTenders(b, 106.00, 6.00, null, 'cash', null); // gto 100
    expect(b.cash).toBeCloseTo(100.00, 2);
    expect(tenderSum(b)).toBeCloseTo(100.00, 2);
  });

  test('분할 결제(cash+visa): 각 tender 가 SST 전으로 안분, 합계 == gto', () => {
    const b = emptyHour();
    // total 212.00, tax 12.00 → gto 200. 결제 cash 100 + visa(card) 112 = 212
    accrueOrderTenders(b, 212.00, 12.00, [
      { payment_method: 'cash', card_type: null, amount: 100.00 },
      { payment_method: 'card', card_type: 'visa', amount: 112.00 },
    ], null, null);
    expect(tenderSum(b)).toBeCloseTo(200.00, 2);      // == gto
    expect(b.cash + b.visa).toBeCloseTo(200.00, 2);
  });

  test('overpay(현금 초과수령, Σamount>total): 여전히 tender 합계 == gto (Fable 권고3)', () => {
    const b = emptyHour();
    // total 50.00, tax 2.83 → gto 47.17. 현금 60 기록(초과) — 분모를 paySum(60)으로 정규화
    accrueOrderTenders(b, 50.00, 2.83, [{ payment_method: 'cash', card_type: null, amount: 60.00 }], null, null);
    expect(tenderSum(b)).toBeCloseTo(47.17, 2);        // 56.60(버그) 아님
    expect(b.cash).toBeCloseTo(47.17, 2);
  });

  test('total=0 (무료/100% 할인): tender 0, 예외 없음', () => {
    const b = emptyHour();
    accrueOrderTenders(b, 0, 0, [{ payment_method: 'cash', card_type: null, amount: 0 }], null, null);
    expect(tenderSum(b)).toBe(0);
  });
});

describe('이월렛 서브타입 → 몰 tender 매핑 (2026-07-23)', () => {
  const gto = (b) => b; // 편의
  test("ewallet + ewallet_type='tng' → tng 버킷", () => {
    const b = emptyHour();
    // total 106, tax 6 → gto 100
    accrueOrderTenders(b, 106.00, 6.00, null, 'ewallet', null, 'tng');
    expect(b.tng).toBeCloseTo(100.00, 2);
    expect(b.othersamount).toBe(0);
    expect(tenderSum(b)).toBeCloseTo(100.00, 2);
  });

  test("ewallet + ewallet_type='grabpay' → othersamount (몰에 필드 없음)", () => {
    const b = emptyHour();
    accrueOrderTenders(b, 106.00, 6.00, null, 'ewallet', null, 'grabpay');
    expect(b.othersamount).toBeCloseTo(100.00, 2);
    expect(b.tng).toBe(0);
  });

  test('ewallet 서브타입 미지정 → othersamount (기존 동작 유지)', () => {
    const b = emptyHour();
    accrueOrderTenders(b, 106.00, 6.00, null, 'ewallet', null, null);
    expect(b.othersamount).toBeCloseTo(100.00, 2);
    expect(b.tng).toBe(0);
  });

  test('분할결제: cash + ewallet(tng) → cash·tng 분리, 합계 gto', () => {
    const b = emptyHour();
    // total 212, tax 12 → gto 200. cash 100 + ewallet(tng) 112
    accrueOrderTenders(b, 212.00, 12.00, [
      { payment_method: 'cash', card_type: null, ewallet_type: null, amount: 100.00 },
      { payment_method: 'ewallet', card_type: null, ewallet_type: 'tng', amount: 112.00 },
    ], null, null, null);
    expect(b.cash).toBeCloseTo(94.34, 1);   // 100 × 200/212
    expect(b.tng).toBeCloseTo(105.66, 1);   // 112 × 200/212
    expect(tenderSum(b)).toBeCloseTo(200.00, 2);
  });
});

describe('postSalesHourly: HTTP 200 거절 감지 (버그2, fail-closed)', () => {
  const integration = { provider: 'tangent_synthesis', environment: 'staging', sales_url: 'https://x/api' };
  const origFetch = global.fetch;
  const mockFetch = (bodyObj, ok = true, httpStatus = 200) => {
    global.fetch = async () => ({ ok, status: httpStatus, text: async () => JSON.stringify(bodyObj) });
  };
  afterEach(() => { global.fetch = origFetch; });

  test("status:'success' → 통과", async () => {
    mockFetch({ status: 'success', message: 'total sales records received: 24. total sales records created in Tangent: 24.' });
    await expect(svc.postSalesHourly(integration, 'tok', [])).resolves.toHaveProperty('status', 'success');
  });

  test("HTTP 200 + status:'error' → throw (몰 거절)", async () => {
    mockFetch({ status: 'error', errors: [{ status_code: 'MachineID', message: 'ERROR: No corresponding MachineID was found.' }] });
    await expect(svc.postSalesHourly(integration, 'tok', [])).rejects.toThrow(/No corresponding MachineID/);
  });

  test('HTTP 200 + status 부재(프록시/WAF 200) → throw (fail-closed)', async () => {
    mockFetch({ ok: true }); // status 필드 없음
    await expect(svc.postSalesHourly(integration, 'tok', [])).rejects.toThrow(/not confirmed/);
  });

  test('HTTP 200 + 비JSON 바디 → throw', async () => {
    global.fetch = async () => ({ ok: true, status: 200, text: async () => '<html>gateway</html>' });
    await expect(svc.postSalesHourly(integration, 'tok', [])).rejects.toThrow(/not confirmed/);
  });

  test("'Success'(대문자)·공백 변형 → 통과 (trim+lowercase)", async () => {
    mockFetch({ status: '  Success ' });
    await expect(svc.postSalesHourly(integration, 'tok', [])).resolves.toBeDefined();
  });
});
