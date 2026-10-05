/**
 * 단말기 사용 중(BUSY) 자동 대기 — 2026-10-05 운영: 승인 직후 다음 결제가 «HTTP 400 BUSY» 로 안 시작됨.
 * runTerminalSale 이 BUSY 판매를 3초 간격으로 새로 보내 단말기가 받는 순간 평소 결제로 이어지는지 고정한다.
 * (서버·브릿지는 모의 — 이 파일은 «다시 보내는 규칙» 만 본다)
 */
import { runTerminalSale } from './terminalSale';
import * as nativeEcr from './nativeEcr';

jest.mock('./auth', () => ({ getAuthToken: () => 't' }));

type Row = { id: number; status: string; status_code?: string | null };

function setup(rows: Row[]) {
  let created = 0;
  const responses = [...rows];
  (global as any).fetch = jest.fn(async (url: string) => {
    const path = String(url).replace('/api/terminal', '');
    if (path === '/transactions') {
      created += 1;
      return { ok: true, status: 201, json: async () => ({ success: true, data: { id: created, request_hex: 'AA', timeout_ms: 1000, connection: { host: 'h', port: 1, transport: 'http-hex' } } }) };
    }
    if (/\/transactions\/\d+\/response$/.test(path)) {
      const row = responses.shift();
      return { ok: true, status: 200, json: async () => ({ success: true, data: row }) };
    }
    return { ok: false, status: 404, json: async () => ({ success: false }) };
  });
  jest.spyOn(nativeEcr, 'ecrExchange').mockResolvedValue({ ok: true, responseHex: 'BB' } as any);
  return { created: () => created };
}

describe('runTerminalSale — 단말기 사용 중(BUSY)', () => {
  // 3초 대기는 즉시 넘긴다(jest 27 에는 비동기 가짜 타이머 전진이 없다)
  beforeEach(() => { jest.spyOn(global, 'setTimeout').mockImplementation(((cb: () => void) => { cb(); return 0 as any; }) as any); });
  afterEach(() => { jest.restoreAllMocks(); });

  const busy = (id: number): Row => ({ id, status: 'declined', status_code: 'H400' });

  it('BUSY 2번 뒤 승인 → 판매 3번 보내고 승인으로 끝난다', async () => {
    const s = setup([busy(1), busy(2), { id: 3, status: 'approved', status_code: '00' }]);
    const phases: string[] = [];
    const out = await runTerminalSale({ restaurantId: 1, amount: 1, onPhase: (x) => phases.push(x) });
    expect(out.kind).toBe('approved');
    expect(s.created()).toBe(3);
    expect(phases).toContain('terminalBusy');
  });

  it('«기다리기 중지» → 더 보내지 않고 BUSY 사유로 끝난다', async () => {
    const s = setup([busy(1), busy(2), busy(3)]);
    const out = await runTerminalSale({ restaurantId: 1, amount: 1, shouldStop: () => true });
    expect(out.kind).toBe('declined');
    expect((out as any).message).toBe('reason:terminalBusy');
    expect(s.created()).toBe(1);
  });

  it('카드 거절(BUSY 아님)은 다시 보내지 않는다', async () => {
    const s = setup([{ id: 1, status: 'declined', status_code: '51' }]);
    const out = await runTerminalSale({ restaurantId: 1, amount: 1 });
    expect(out.kind).toBe('declined');
    expect(s.created()).toBe(1);
  });
});
