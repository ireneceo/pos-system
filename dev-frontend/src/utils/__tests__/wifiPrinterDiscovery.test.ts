import { findWifiPrinters, PRINTER_PORT } from '../wifiPrinterDiscovery';

// 와이파이 프린터 자동 찾기(2026-11-02) — 이미 깔린 앱의 단말기 찾기(__NATIVE_ECR.discover)를 프린터 포트로 돌린다.
describe('findWifiPrinters', () => {
  afterEach(() => { delete (window as any).__NATIVE_ECR; });

  test('앱이 찾기를 못 하면 supported=false (브라우저·옛 앱)', async () => {
    expect(await findWifiPrinters()).toEqual({ supported: false, hosts: [], scanned: null });
    (window as any).__NATIVE_ECR = { available: true, exchange: async () => ({ ok: false }) }; // discover 없는 옛 앱
    expect((await findWifiPrinters()).supported).toBe(false);
  });

  test('9100 포트·상태 질의(DLE EOT 1 — 종이에 안 찍힘)로 묻고, 연결된 기기(probed)를 주소 순으로 돌려준다', async () => {
    const calls: any[] = [];
    (window as any).__NATIVE_ECR = {
      available: true,
      exchange: async () => ({ ok: false }),
      discover: async (job: any) => {
        calls.push(job);
        // 프린터는 단말기 응답 형식이 아니라 hosts 는 비고, probed 에 연결된 기기가 온다(앱 0.3.2+).
        return { ok: true, hosts: [], scanned: 254, probed: [
          { host: '192.168.1.120', ok: false, error: 'TIMEOUT' },
          { host: '192.168.1.9', ok: false, error: 'CLOSED' },
          { host: '192.168.1.120', ok: false, error: 'TIMEOUT' },
        ] };
      },
    };
    const r = await findWifiPrinters();
    expect(calls).toEqual([{ port: PRINTER_PORT, transport: 'tcp-bin', probeHex: '100401' }]);
    expect(r).toEqual({ supported: true, hosts: ['192.168.1.9', '192.168.1.120'], scanned: 254 });
  });

  test('찾기가 실패하거나 throw 해도 빈 목록(화면이 «못 찾음» 안내)', async () => {
    (window as any).__NATIVE_ECR = { available: true, exchange: async () => ({}), discover: async () => { throw new Error('x'); } };
    expect(await findWifiPrinters()).toEqual({ supported: true, hosts: [], scanned: null });
  });
});
