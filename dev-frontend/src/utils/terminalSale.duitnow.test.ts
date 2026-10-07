/**
 * 단말기 화면 DuitNow QR(C01A) — 결제창이 product 'duitnow' 를 서버 판매 생성에 싣고,
 * 보류(EA)면 Check Status 를 반복해 손님이 스캔한 순간 승인으로 끝나는지 고정한다.
 * (서버·브릿지는 모의 — 수단 판정(ewallet/duitnow)은 서버 health-check 가 증명한다)
 */
import { runTerminalSale } from './terminalSale';
import * as nativeEcr from './nativeEcr';

jest.mock('./auth', () => ({ getAuthToken: () => 't' }));

describe('runTerminalSale — 단말기 화면 DuitNow QR', () => {
  beforeEach(() => { jest.spyOn(global, 'setTimeout').mockImplementation(((cb: () => void) => { cb(); return 0 as any; }) as any); });
  afterEach(() => { jest.restoreAllMocks(); });

  function setup(product: boolean) {
    const bodies: any[] = []; let checks = 0;
    const job = (id: number) => ({ id, request_hex: 'AA', timeout_ms: 1000, connection: { host: 'h', port: 1, transport: 'http-hex' } });
    (global as any).fetch = jest.fn(async (url: string, init: any) => {
      const path = String(url).replace('/api/terminal', '');
      const body = JSON.parse(init?.body || '{}');
      if (path === '/transactions') { bodies.push(body); return { ok: true, status: 201, json: async () => ({ success: true, data: job(1) }) }; }
      if (path === '/transactions/1/check-status') { checks += 1; return { ok: true, status: 201, json: async () => ({ success: true, data: job(10 + checks) }) }; }
      if (path === '/transactions/1/response') return { ok: true, status: 200, json: async () => ({ success: true, data: { id: 1, status: product ? 'pending' : 'approved' } }) };
      if (/^\/transactions\/1\d\/response$/.test(path)) {
        const parent = checks < 2 ? { id: 1, status: 'pending' } : { id: 1, status: 'approved', tender_method: 'ewallet', ewallet_type: 'duitnow' };
        return { ok: true, status: 200, json: async () => ({ success: true, data: { id: 10 + checks, status: parent.status, parent } }) };
      }
      return { ok: false, status: 404, json: async () => ({ success: false }) };
    });
    jest.spyOn(nativeEcr, 'ecrExchange').mockResolvedValue({ ok: true, responseHex: 'BB' } as any);
    return { bodies, checks: () => checks };
  }

  it('product 를 실어 보내고 보류 → 조회 2번 → 승인(DuitNow)', async () => {
    const s = setup(true);
    const phases: string[] = [];
    const out = await runTerminalSale({ restaurantId: 1, amount: 2.5, product: 'duitnow', onPhase: (x) => phases.push(x) });
    expect(s.bodies[0].product).toBe('duitnow');
    expect(phases).toContain('checking');
    expect(s.checks()).toBe(2);
    expect(out.kind).toBe('approved');
    expect((out as any).txn.ewallet_type).toBe('duitnow');
  });

  it('선택 안 하면 product 를 보내지 않는다(오늘과 같은 판매)', async () => {
    const s = setup(false);
    const out = await runTerminalSale({ restaurantId: 1, amount: 2.5 });
    expect('product' in s.bodies[0]).toBe(false);
    expect(out.kind).toBe('approved');
  });
});
