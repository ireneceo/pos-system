const { buildRedisClients } = require('../services/socketService');

function fakeCreateClient() {
  const made = [];
  const mk = (opts) => {
    const c = { opts, handlers: {}, on(ev, fn) { this.handlers[ev] = fn; return this; }, duplicate() { return mk(opts); } };
    made.push(c);
    return c;
  };
  return { fn: jest.fn(mk), made };
}

describe('buildRedisClients (redis v5 옵션)', () => {
  test('v5 형식 — url · socket.reconnectStrategy, 옛 host/port/retry_strategy 없음', () => {
    const { fn } = fakeCreateClient();
    const { options } = buildRedisClients(fn, {});
    expect(options.url).toBe('redis://127.0.0.1:6379');
    expect(typeof options.socket.reconnectStrategy).toBe('function');
    expect(options.host).toBeUndefined();
    expect(options.retry_strategy).toBeUndefined();
    expect(fn).toHaveBeenCalledTimes(1);
  });
  test('REDIS_URL 환경변수 우선', () => {
    const { fn } = fakeCreateClient();
    expect(buildRedisClients(fn, { REDIS_URL: 'redis://x:1' }).options.url).toBe('redis://x:1');
  });
  test('재접속 10번 넘으면 멈춤(Error), 그 전엔 최대 3초 간격', () => {
    const { fn } = fakeCreateClient();
    const rs = buildRedisClients(fn, {}).options.socket.reconnectStrategy;
    expect(rs(1)).toBe(100);
    expect(rs(10)).toBe(1000);
    expect(rs(11)).toBeInstanceOf(Error);
  });
  test('pub·sub 둘 다 error 리스너 등록(없으면 끊길 때 프로세스 종료)', () => {
    const { fn, made } = fakeCreateClient();
    const { pubClient, subClient } = buildRedisClients(fn, {});
    expect(made.length).toBe(2);
    expect(typeof pubClient.handlers.error).toBe('function');
    expect(typeof subClient.handlers.error).toBe('function');
    expect(() => pubClient.handlers.error(new Error('down'))).not.toThrow();
  });
});
