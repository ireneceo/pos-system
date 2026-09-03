/**
 * 오류 보고 계약 — 크래시 화면의 "이 오류 보내기" 가 지켜야 할 것.
 * 이 테스트가 지키는 사고: 같은 오류가 루프로 터질 때 티켓 수십 개 생성 / 로그아웃 상태에서 주인 없는 티켓.
 */
import { reportIssue, buildIssueBody, issueKey } from './reportIssue';

const store: Record<string, string> = {};
beforeEach(() => {
  for (const k of Object.keys(store)) delete store[k];
  (global as any).fetch = jest.fn(async () => ({
    ok: true, json: async () => ({ success: true, data: { id: 'ticket-1', ticketNumber: 'SUPP-X' } }),
  }));
  Object.defineProperty(window, 'localStorage', {
    value: { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; } },
    configurable: true,
  });
  Object.defineProperty(window, 'sessionStorage', {
    value: { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; } },
    configurable: true,
  });
});

const err = () => Object.assign(new Error('Boom happened'), { stack: 'Error: Boom\n at A\n at B' });

test('로그아웃 상태면 보내지 않는다 — 주인 없는 티켓을 만들지 않는다', async () => {
  const r = await reportIssue({ error: err() });
  expect(r).toEqual({ ok: false, reason: 'no-token' });
  expect((global as any).fetch).not.toHaveBeenCalled();
});

test('접수되면 사람이 부를 수 있는 번호를 돌려준다', async () => {
  store['auth_token'] = 'T';
  const r = await reportIssue({ error: err() });
  expect(r).toEqual({ ok: true, id: 'SUPP-X' });
  const body = JSON.parse((global as any).fetch.mock.calls[0][1].body);
  expect(body.category).toBe('bug-report');
  expect(body.description).toContain('Boom happened');
});

test('같은 오류를 다시 눌러도 티켓은 1건 — 루프 폭주 차단', async () => {
  store['auth_token'] = 'T';
  await reportIssue({ error: err() });
  const second = await reportIssue({ error: err() });
  expect(second).toEqual({ ok: false, reason: 'duplicate' });
  expect((global as any).fetch).toHaveBeenCalledTimes(1);
});

test('서버가 거절하면 접수됐다고 말하지 않는다', async () => {
  store['auth_token'] = 'T';
  (global as any).fetch = jest.fn(async () => ({ ok: false, json: async () => ({}) }));
  expect(await reportIssue({ error: err() })).toEqual({ ok: false, reason: 'failed' });
});

test('본문에 componentStack·경로·오류가 들어간다', () => {
  const b = buildIssueBody({ error: err(), componentStack: '\n    in Boom (at X.tsx:1)', note: '주문 저장 중' });
  expect(b).toContain('주문 저장 중');
  expect(b).toContain('Boom happened');
  expect(b).toContain('in Boom');
  expect(issueKey(err())).toContain('Boom happened');
});
