/**
 * 카드단말기 판매 한 건의 흐름 — 결제 창이 부른다 (Fable 설계 .claude/fable-design-20261001-ghl-ecr.md §3-3).
 *
 *   서버에 거래 생성(요청 hex 받음) → 브릿지로 단말기에 운반 → 응답 hex 를 그대로 서버에 올림 → 서버 판정.
 *   응답 없음/통신오류/깨진 응답 → Reprint 로 1회 되찾기. 보류(EA) → Check Status 3초 간격 최대 90초.
 *
 * 이 파일은 프로토콜을 모른다(hex 를 열어 보지 않는다). 승인 여부는 서버 응답의 status 만 믿는다.
 */
import { getAuthToken } from './auth';
import { ecrExchange, ecrDiscoverAndReport, isConnectFailure, ecrErrorBody, EcrTransport, EcrResult } from './nativeEcr';

export interface TerminalTxn {
  id: number; status: string; status_code?: string | null; status_text?: string | null; amount?: string;
  card_type?: string | null; card_brand?: string | null; tender_method?: 'card' | 'ewallet' | null; ewallet_type?: string | null; approval_code?: string | null; masked_pan?: string | null;
  terminal_invoice_no?: string | null; ecr_invoice_no?: string | null; message_prompt?: string | null;
}
export type TerminalPhase = 'starting' | 'waiting' | 'recovering' | 'checking' | 'voiding' | 'terminalBusy';
export type TerminalOutcome =
  /** linkError 'DOUBLE_APPROVAL' = 승인은 됐지만 이 주문에 승인이 주문 금액보다 많다(단말기에서 하나 Void) */
  | { kind: 'approved'; txn: TerminalTxn; linkError?: string | null; reused?: boolean }
  | { kind: 'declined'; txn: TerminalTxn; message: string }
  | { kind: 'unknown'; txn: TerminalTxn; message: string }
  | { kind: 'choose'; hosts: string[]; message: string }
  | { kind: 'error'; message: string };

interface Job { id: number; request_hex: string; timeout_ms: number; connection: { host: string; port: number; transport: EcrTransport } }

async function api(path: string, body: any): Promise<{ ok: boolean; status: number; json: any }> {
  try {
    const res = await fetch(`/api/terminal${path}`, {
      method: 'POST',
      // 직원 로그인이 없으면(등록된 키오스크) 빈 Authorization 을 싣지 않는다 — 기기 토큰은 httpClient 가 싣는다
      headers: { 'Content-Type': 'application/json', ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}) },
      body: JSON.stringify(body || {}),
    });
    let json: any = null;
    try { json = await res.json(); } catch { /* 본문 없음 */ }
    return { ok: res.ok && json?.success !== false, status: res.status, json };
  } catch {
    return { ok: false, status: 0, json: { message: 'Network error' } };
  }
}

/** 같은 와이파이에서 단말기를 찾는다. 1대면 그 주소를 매장 설정에 저장하고 돌려준다. */
async function findTerminal(restaurantId: number, conn: Job['connection']): Promise<{ host?: string; hosts: string[] }> {
  const echo = await api('/echo', { restaurant_id: restaurantId, probe: true });
  if (!echo.ok) return { hosts: [] };
  const hosts = await ecrDiscoverAndReport(restaurantId, { port: conn.port, transport: conn.transport, probeHex: echo.json.data.request_hex });
  if (hosts.length !== 1) return { hosts };
  const saved = await api('/config/host', { restaurant_id: restaurantId, host: hosts[0] });
  return saved.ok ? { host: hosts[0], hosts } : { hosts };
}

/** 저장된 단말기 주소 — 화면이 고른 주소를 저장할 때 쓴다(여러 대가 응답했을 때). */
export async function saveTerminalHost(restaurantId: number, host: string): Promise<boolean> {
  return (await api('/config/host', { restaurant_id: restaurantId, host })).ok;
}

/**
 * 단말기 왕복 1회 → 서버 판정 결과(행). 깨진 응답(422)은 «받지 못한 것» 으로 다시 올려 복구 경로로 보낸다.
 * 연결 자체가 안 되면(요청이 단말기에 닿지 않음) 와이파이 안에서 단말기를 찾아 **같은 요청**을 다시 보낸다.
 * 연결 뒤 무응답(TIMEOUT)은 다시 보내지 않는다 — 단말기가 이미 처리했을 수 있다(이중 결제 방지).
 */
export async function roundTrip(job: Job, restaurantId: number): Promise<{ row: TerminalTxn | null; parent: TerminalTxn | null; error?: string; choose?: string[]; linkError?: string | null }> {
  let r: EcrResult = await ecrExchange({ ...job.connection, payloadHex: job.request_hex, timeoutMs: job.timeout_ms });
  if (r.ok !== true && isConnectFailure((r as { error: string }).error)) {
    const found = await findTerminal(restaurantId, job.connection);
    if (found.host) {
      r = await ecrExchange({ ...job.connection, host: found.host, payloadHex: job.request_hex, timeoutMs: job.timeout_ms });
    } else if (found.hosts.length > 1) {
      await api(`/transactions/${job.id}/response`, { error: 'CONNECT_FAILED' });
      return { row: null, parent: null, choose: found.hosts };
    }
  }
  let up = await api(`/transactions/${job.id}/response`, r.ok === true ? { response_hex: r.responseHex } : ecrErrorBody(r as { error: string; rawHex?: string }));
  if (!up.ok && up.status === 422) up = await api(`/transactions/${job.id}/response`, { error: 'BAD_RESPONSE' });
  if (!up.ok) return { row: null, parent: null, error: up.json?.message || 'Server error' };
  const notConnected = r.ok !== true && isConnectFailure((r as { error: string }).error);
  return { row: up.json.data, parent: up.json.data?.parent || null, error: notConnected ? 'NOT_CONNECTED' : undefined, linkError: up.json.data?.link_error || null };
}

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
// 상태 코드 → 우리 문구 키(2026-10-04 Fable 설계 §2-1). 코드 대신 캐셔가 할 일을 말한다.
//   B0 은행 무응답 · CA 호스트 통신 실패 · H4xx 단말기가 바빠 요청을 안 받음 · C0 카드 안 댐 · C7 단말기에서 취소 · C1 받을 수 없는 카드
const CODE_REASON: Record<string, string> = { B0: 'bankTimeout', CA: 'hostComm', C0: 'cardTimeout', C7: 'cancelledOnTerminal', C1: 'notSupported' };
// 그 외: 단말기가 준 문구(영문, 단말기 표기 그대로) 또는 'reason:code:<코드>' — 화면이 키를 번역한다
const failText = (t: TerminalTxn) => {
  const code = t.status_code || '';
  if (CODE_REASON[code]) return `reason:${CODE_REASON[code]}`;
  if (/^H4\d\d$/.test(code)) return 'reason:terminalBusy';
  return t.message_prompt || t.status_text || (code ? `reason:code:${code}` : 'reason:notApproved');
};

export async function runTerminalSale(opts: {
  restaurantId: number; orderId?: number | null; amount: number; cashierName?: string;
  onPhase?: (p: TerminalPhase) => void;
  /** 캐셔가 «기다리기 중지» 를 눌렀는가 — 단말기 사용 중(BUSY) 자동 재시도만 멈춘다 */
  shouldStop?: () => boolean;
  /** 'duitnow' = 단말기 화면에 DuitNow QR 을 띄우는 판매(서버가 C01A 를 싣는다). 결과는 보류 → 아래 Check Status 반복 */
  product?: 'duitnow' | null;
}): Promise<TerminalOutcome> {
  opts.onPhase?.('starting');
  const saleBody = {
    restaurant_id: opts.restaurantId, order_id: opts.orderId || undefined,
    amount: (Math.round(opts.amount * 100) / 100).toFixed(2), cashier_name: opts.cashierName,
    ...(opts.product ? { product: opts.product } : {}),
  };
  const created = await api('/transactions', saleBody);
  if (!created.ok) {
    // 이 주문엔 같은 금액의 승인이 이미 있다(앞 결제 기록만 실패) — 새로 긁지 않고 그 승인으로 기록한다
    if (created.json?.code === 'ALREADY_APPROVED' && created.json?.data?.txn) return { kind: 'approved', txn: created.json.data.txn, reused: true };
    if (created.json?.code === 'ALREADY_APPROVED') return { kind: 'error', message: 'reason:alreadyApproved' };
    return { kind: 'error', message: created.json?.message || 'reason:cannotStart' };
  }
  let sale: Job = created.json.data;

  opts.onPhase?.('waiting');
  const first = await roundTrip(sale, opts.restaurantId);
  if (first.choose) return { kind: 'choose', hosts: first.choose, message: 'reason:chooseTerminal' };
  let txn: TerminalTxn | null = first.row;
  let linkError = first.linkError || null;
  if (!txn) return { kind: 'unknown', txn: { id: sale.id, status: 'sent' }, message: 'reason:noAnswer' };
  // 단말기를 끝내 못 찾았다 — 요청이 단말기에 닿지 않았으니 결제는 일어나지 않았다(복구·수동 기록 대상 아님)
  if (first.error === 'NOT_CONNECTED') return { kind: 'error', message: 'reason:terminalNotFound' };

  // 단말기 사용 중(HTTP 4xx «BUSY») — 요청을 «받기 전에» 거절한 것이라 결제는 일어나지 않았다.
  //   2026-10-05 운영 실측: 승인 직후 20·33초 뒤 새 결제가 BUSY(단말기가 앞 결제 영수증 화면에 머묾), 취소 뒤엔 7초 만에 받음.
  //   캐셔가 다시 누르게 하지 않고 3초마다 새 판매를 보내 최대 60초 기다린다 — 단말기가 받는 순간 평소 결제로 이어진다.
  const isBusy = (x: TerminalTxn | null) => !!x && x.status === 'declined' && /^H4\d\d$/.test(x.status_code || '');
  if (isBusy(txn)) {
    opts.onPhase?.('terminalBusy');
    const until = Date.now() + 60000;
    while (isBusy(txn) && Date.now() < until) {
      await sleep(3000);
      if (opts.shouldStop?.()) break;
      const again = await api('/transactions', saleBody);
      if (!again.ok) break;
      sale = again.json.data;
      const r = await roundTrip(sale, opts.restaurantId);
      if (r.choose) return { kind: 'choose', hosts: r.choose, message: 'reason:chooseTerminal' };
      if (!r.row) return { kind: 'unknown', txn: { id: sale.id, status: 'sent' }, message: 'reason:noAnswer' };
      if (r.error === 'NOT_CONNECTED') return { kind: 'error', message: 'reason:terminalNotFound' };
      txn = r.row;
      linkError = r.linkError || null;
    }
  }

  // 보류(EA) — 규격상 Check Status 를 성공/실패가 날 때까지 반복
  if (txn.status === 'pending') {
    opts.onPhase?.('checking');
    const until = Date.now() + 90000;
    while (Date.now() < until && txn.status === 'pending') {
      await sleep(3000);
      const cs = await api(`/transactions/${sale.id}/check-status`, {});
      if (!cs.ok) break;
      const r = await roundTrip(cs.json.data, opts.restaurantId);
      if (r.parent) txn = r.parent;
      if (r.linkError) linkError = r.linkError;
    }
    if (txn.status === 'pending') return { kind: 'unknown', txn, message: 'reason:stillPending' };
  }

  // 응답 없음·통신오류 — 단말기가 실제로 끝냈을 수 있다. 마지막 결과를 다시 받아 본다(1회).
  if (txn.status === 'timeout' || txn.status === 'comm_error') {
    opts.onPhase?.('recovering');
    const rc = await api(`/transactions/${sale.id}/recover`, {});
    if (rc.ok) {
      let r = await roundTrip(rc.json.data, opts.restaurantId);
      // 단말기가 복구 요청을 HTTP 4xx 로 «받기 전에» 거절했다(운영 «HTTP 400 BUSY») — 3초 뒤 1회만 다시(Fable 설계 §2-3)
      if (r.row && /^H4\d\d$/.test(r.row.status_code || '')) {
        await sleep(3000);
        const rc2 = await api(`/transactions/${sale.id}/recover`, {});
        if (rc2.ok) r = await roundTrip(rc2.json.data, opts.restaurantId);
      }
      if (r.parent) txn = r.parent;
      if (r.linkError) linkError = r.linkError;
    }
  }

  if (txn.status === 'approved') return { kind: 'approved', txn, linkError };
  if (txn.status === 'declined' || txn.status === 'cancelled') return { kind: 'declined', txn, message: failText(txn) };
  if (txn.status === 'not_found') return { kind: 'unknown', txn, message: 'reason:notFound' };
  return { kind: 'unknown', txn, message: 'reason:noAnswer' };
}

/** 결과를 끝내 알 수 없을 때 — 캐셔가 단말기 영수증을 보고 기록(사유 필수, 서버 감사기록). */
export async function recordTerminalManually(
  txnId: number, note: string,
  tender: { tender_method: 'card' | 'ewallet'; card_type?: string; ewallet_type?: string },
): Promise<{ ok: boolean; message?: string; txn?: TerminalTxn }> {
  const r = await api(`/transactions/${txnId}/manual`, { note, ...tender });
  return r.ok ? { ok: true, txn: r.json.data } : { ok: false, message: r.json?.message || 'Could not save' };
}

export type VoidOutcome =
  | { kind: 'voided'; parent: TerminalTxn | null; already: boolean }
  | { kind: 'notFound'; parent: TerminalTxn | null; message: string }
  | { kind: 'failed'; parent: TerminalTxn | null; message: string }
  | { kind: 'unknown'; message: string }
  | { kind: 'error'; code?: string; message: string };

/**
 * 단말기 결제 취소(Void A2) 1건 — 서버가 프레임을 만들고 판정한다(Fable 설계 2026-10-04 §3).
 * voided = 00(지금 취소됨) 또는 C5(이미 취소돼 있음). 응답이 없으면 unknown — 다시 눌러도 안전하다(갔으면 C5).
 */
export async function voidTerminalTxn(txnId: number, restaurantId: number, voidPin?: string): Promise<VoidOutcome> {
  const v = await api(`/transactions/${txnId}/void`, voidPin ? { void_pin: voidPin } : {});
  if (!v.ok) {
    if (v.json?.code === 'ALREADY_VOIDED') return { kind: 'voided', parent: null, already: true };
    return { kind: 'error', code: v.json?.code, message: v.json?.message || 'reason:voidFailed' };
  }
  const r = await roundTrip(v.json.data, restaurantId);
  if (r.choose) return { kind: 'unknown', message: 'reason:chooseTerminal' };
  if (!r.row || r.error === 'NOT_CONNECTED') return { kind: 'unknown', message: r.error === 'NOT_CONNECTED' ? 'reason:terminalNotFound' : 'reason:voidNoAnswer' };
  const parent = r.parent;
  if (parent?.status === 'voided') return { kind: 'voided', parent, already: r.row.status_code === 'C5' };
  if (r.row.status === 'not_found') return { kind: 'notFound', parent, message: parent?.status === 'declined' ? 'reason:voidNoRecord' : 'reason:voidNotFound' };
  if (r.row.status === 'timeout' || r.row.status === 'comm_error') return { kind: 'unknown', message: /^H4\d\d$/.test(r.row.status_code || '') ? 'reason:terminalBusy' : 'reason:voidNoAnswer' };
  return { kind: 'failed', parent, message: failText(r.row) };
}

export async function linkTerminalTxn(txnId: number, orderId: number): Promise<boolean> {
  const r = await api(`/transactions/${txnId}/link`, { order_id: orderId });
  return r.ok;
}

/** 서버가 주문에 남기는 참조와 같은 꼴 — 분할 결제 원장 행에 싣는다. */
export const terminalRef = (t: TerminalTxn) => `GHL:${t.terminal_invoice_no || t.ecr_invoice_no}:${t.approval_code || '-'}`;
