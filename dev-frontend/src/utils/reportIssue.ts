/**
 * 오류 보고 — 크래시 화면에서 문의를 **바로 생성**한다.
 *
 * Irene 요구(2026-09-03): "오류 있는 거 바로 바로 넣기 편하면 좋겠는데."
 *
 * 왜 "이동" 이 아니라 "즉시 생성" 인가:
 *  - 앱이 이미 깨진 상태라 문의 화면으로 **이동하는 것 자체가 실패**할 수 있다.
 *  - 문의 페이지는 역할별로 6벌 복제돼 있어, 거기에 미리 채우기를 심으면 6곳을 고쳐야 한다.
 *  - fallback 은 크래시한 React 트리 **밖**이라, 컨텍스트·훅에 기대지 않는 순수 함수가 가장 튼튼하다.
 *    그래서 이 파일은 React 를 import 하지 않는다.
 */

const TOKEN_KEY = 'auth_token';          // AuthContext 와 같은 키 (contexts/PwaInstallContext 이웃 규칙)
const SENT_PREFIX = 'issue.sent.';

export interface IssueContext {
  error: Error | null;
  componentStack?: string | null;
  note?: string;
}

function token(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}

function swVersion(): string {
  // 번들 해시로 어느 빌드인지 남긴다 — "고쳤는데 그대로" 신고의 첫 번째 확인 항목.
  try {
    const s = document.querySelector('script[src*="/static/js/main."]') as HTMLScriptElement | null;
    const m = s?.src.match(/main\.([a-f0-9]+)\.js/);
    return m ? m[1] : 'unknown';
  } catch { return 'unknown'; }
}

/** 같은 오류가 루프로 터질 때 티켓이 수십 개 생기는 것을 막는다(세션 내 1회). */
function alreadySent(key: string): boolean {
  try { return sessionStorage.getItem(SENT_PREFIX + key) === '1'; } catch { return false; }
}
function markSent(key: string) {
  try { sessionStorage.setItem(SENT_PREFIX + key, '1'); } catch { /* ignore */ }
}

export function issueKey(error: Error | null): string {
  const msg = (error && (error.message || String(error))) || 'unknown';
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  return `${path}|${msg.slice(0, 120)}`;
}

export function buildIssueBody({ error, componentStack, note }: IssueContext): string {
  const msg = (error && (error.message || String(error))) || '(no message)';
  const stack = (error && error.stack ? error.stack.split('\n').slice(0, 20).join('\n') : '(no stack)');
  const lines = [
    note ? `무엇을 하던 중: ${note}` : '무엇을 하던 중: (적지 않음)',
    '',
    `오류: ${msg}`,
    `화면: ${typeof window !== 'undefined' ? window.location.pathname + window.location.search : '-'}`,
    `빌드(번들 해시): ${swVersion()}`,
    `시각: ${new Date().toISOString()}`,
    `브라우저: ${typeof navigator !== 'undefined' ? navigator.userAgent : '-'}`,
    '',
    '--- 스택 ---',
    stack,
  ];
  if (componentStack) lines.push('', '--- 컴포넌트 ---', componentStack.split('\n').slice(0, 15).join('\n'));
  return lines.join('\n');
}

export type ReportResult =
  | { ok: true; id: number | string }
  | { ok: false; reason: 'no-token' | 'duplicate' | 'failed' };

/** 문의를 즉시 생성한다. 성공하면 접수 번호를 돌려준다. */
export async function reportIssue(ctx: IssueContext): Promise<ReportResult> {
  const t = token();
  if (!t) return { ok: false, reason: 'no-token' };       // 로그아웃 상태 — 문의 주인을 못 정한다
  const key = issueKey(ctx.error);
  if (alreadySent(key)) return { ok: false, reason: 'duplicate' };

  const msg = (ctx.error && (ctx.error.message || String(ctx.error))) || 'Unknown error';
  const path = typeof window !== 'undefined' ? window.location.pathname : '-';
  try {
    const res = await fetch('/api/support-tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
      body: JSON.stringify({
        // 필드명·ENUM 은 models/SupportTicket.js 실측 기준: description(=본문),
        // category ENUM 에 'bug-report' 존재, priority ENUM 'high'.
        subject: `[auto] ${path} — ${msg.slice(0, 60)}`,
        description: buildIssueBody(ctx),
        category: 'bug-report',
        priority: 'high',
      }),
    });
    if (!res.ok) return { ok: false, reason: 'failed' };
    const j = await res.json().catch(() => null);
    markSent(key);
    // 사람이 부를 수 있는 번호(SUPP-…)를 먼저 — 내부 id 는 'ticket-1757…' 라 안내에 쓸 수 없다
    const id = j?.data?.ticketNumber ?? j?.ticketNumber ?? j?.data?.id ?? '접수';
    return { ok: true, id };
  } catch {
    return { ok: false, reason: 'failed' };
  }
}
