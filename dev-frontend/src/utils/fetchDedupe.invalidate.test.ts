import { dedupedFetch, invalidateDedupe } from './fetchDedupe';

// 쓰기 뒤 재조회가 옛 응답을 받지 않는다 (2026-09-25 현금 원장 삭제 후 줄이 남던 결함).
const resp = (body: string) => new Response(body, { status: 200 });

describe('fetchDedupe 무효화', () => {
  beforeEach(() => invalidateDedupe());

  test('TTL 안의 같은 GET 은 캐시를 쓴다 (기존 동작)', async () => {
    let n = 0;
    const run = () => Promise.resolve(resp(`v${++n}`));
    expect(await (await dedupedFetch('k1', undefined, run)).text()).toBe('v1');
    await new Promise(r => setTimeout(r, 0));
    expect(await (await dedupedFetch('k1', undefined, run)).text()).toBe('v1');
    expect(n).toBe(1);
  });

  test('무효화 뒤의 같은 GET 은 새로 나간다', async () => {
    let n = 0;
    const run = () => Promise.resolve(resp(`v${++n}`));
    await (await dedupedFetch('k2', undefined, run)).text();
    await new Promise(r => setTimeout(r, 0));
    invalidateDedupe();
    expect(await (await dedupedFetch('k2', undefined, run)).text()).toBe('v2');
  });

  test('쓰기 전에 출발한 GET 이 무효화 뒤 도착해도 캐시에 들어가지 않는다', async () => {
    let release: (r: Response) => void = () => {};
    const slow = () => new Promise<Response>(r => { release = r; });
    const p1 = dedupedFetch('k3', undefined, slow);
    invalidateDedupe();                    // 쓰기 완료
    release(resp('old'));
    expect(await (await p1).text()).toBe('old');   // 기다리던 호출자는 그대로 받는다
    await new Promise(r => setTimeout(r, 0));
    let fresh = 0;
    const run = () => Promise.resolve(resp(`new${++fresh}`));
    expect(await (await dedupedFetch('k3', undefined, run)).text()).toBe('new1');
  });
});
