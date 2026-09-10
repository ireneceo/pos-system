/**
 * 인보이스 ↔ 발주 라인 매칭기 (2026-09-08 · docs/PURCHASE_ORDER_SYSTEM.md §1)
 *
 * **순수 함수다.** 서버를 부르지 않고, 아무것도 저장하지 않는다.
 * 자동 매칭 결과는 화면에 제안으로만 뜨고, 사람이 확인을 눌러야 서버로 간다 —
 * 파싱 실수가 원가로 굳는 것을 막는 유일한 자물쇠(설계 §1).
 *
 * 입력은 셋 중 하나에서 온다:
 *   ① 종이 사진  → 매칭기를 쓰지 않는다. 발주 라인 기본값에서 다른 줄만 사람이 고친다(현장 기본형)
 *   ② 왓츠앱·메일 붙여넣기 → 이 매칭기
 *   ③ 글자 PDF 자동 추출 → 이 매칭기
 */

export interface PoLine {
  id: number;
  description: string | null;
  seller_product_name?: string | null;
  /**
   * 이 판매자가 **자기 인보이스에 찍는 이름**. 한 번 사람이 짝지어 주면 서버가 기억한다
   * (`supplier_products.invoice_name`). 우리 이름(Yellow Onion)과 인쇄명(BAWANG HOLLAND)이
   * 전혀 안 겹치는 경우가 실측 19줄 중 6줄이었다 — 그 6줄을 살리는 것이 이 칸의 존재 이유다.
   */
  seller_invoice_name?: string | null;
  unit?: string | null;
  quantity_ordered: number | string;
  unit_price: number | string;
}

export interface ParsedInvoiceLine {
  raw: string;
  name: string;
  quantity: number | null;
  unitPrice: number | null;
  amount: number | null;
}

export type MatchState = 'matched' | 'needs_check' | 'unmatched';

/**
 * 왜 이 상태인지 — **코드로 돌려준다.**
 * 이 파일은 순수 함수라 번역을 쓸 수 없다(hook 은 컴포넌트 안에서만). 문구는 화면이 붙인다.
 */
export type MatchReason =
  | 'no_candidate'     // 이름이 비슷한 줄을 못 찾음
  | 'no_lines'         // 읽어들인 줄 자체가 없음
  | 'ok'               // 이름·금액 모두 맞음
  | 'amount_mismatch'  // 금액이 수량×단가와 안 맞음
  | 'name_unsure';     // 이름이 확실하지 않음

export interface MatchResult {
  poLineId: number;
  parsed: ParsedInvoiceLine | null;
  state: MatchState;
  score: number;
  /** 왜 이 상태인지 — 화면이 문구로 옮긴다 */
  reason: MatchReason;
}

/** 이름 비교용 정규화: 소문자, 기호 제거, 연속 공백 하나로. */
function normalize(s: string): string {
  return String(s || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 의미 없는 짧은 토큰과 단위어는 이름 점수에서 뺀다. */
const STOP = new Set(['kg', 'g', 'l', 'ml', 'pc', 'pcs', 'piece', 'pack', 'box', 'ctn', 'unit', 'x', 'the', 'of']);

function tokens(s: string): string[] {
  return normalize(s).split(' ').filter((t) => t.length >= 2 && !STOP.has(t));
}

/** 두 이름의 토큰 겹침 비율(0~1). 짧은 쪽 기준이라 "Beef" ↔ "Australian Beef Rib" 도 잡는다. */
export function nameScore(a: string, b: string): number {
  const ta = tokens(a);
  const tb = tokens(b);
  if (!ta.length || !tb.length) return 0;
  const setB = new Set(tb);
  const hit = ta.filter((t) => setB.has(t)).length;
  return hit / Math.min(ta.length, tb.length);
}

const NUM = /-?\d[\d,]*(?:\.\d+)?/g;

/**
 * 붙여넣은 텍스트 한 줄을 {이름, 수량, 단가, 금액} 으로 쪼갠다.
 * 숫자를 뒤에서부터 최대 3개 읽는다 — 인보이스는 대개 `이름 … 수량 단가 금액` 순서다.
 * 이름에 든 숫자(예: "Tiger Beer 338ml")를 수량으로 오인하지 않도록 **뒤쪽 숫자만** 본다.
 */
export function parseInvoiceLine(raw: string): ParsedInvoiceLine | null {
  const line = String(raw || '').trim();
  if (!line) return null;

  const matches = [...line.matchAll(NUM)];
  if (!matches.length) return null;

  const nums = matches.map((m) => ({ value: Number(m[0].replace(/,/g, '')), index: m.index ?? 0, text: m[0] }));
  // 품목 줄이려면 숫자가 **최소 둘**(수량과 금액)은 있어야 한다.
  // 이 조건이 없으면 머리글의 문서번호("INVOICE INV-2291")가 금액 한 줄로 잡힌다.
  if (nums.length < 2) return null;
  const tail = nums.slice(-3);
  const name = line.slice(0, tail[0].index).trim().replace(/[-–—:|]+$/, '').trim();
  if (!name) return null;

  let quantity: number | null = null;
  let unitPrice: number | null = null;
  let amount: number | null = null;

  if (tail.length === 3) {
    [quantity, unitPrice, amount] = tail.map((n) => n.value);
  } else if (tail.length === 2) {
    // 수량·금액만 준 형태가 흔하다. 단가는 나눠서 만든다.
    [quantity, amount] = tail.map((n) => n.value);
    unitPrice = quantity > 0 ? Math.round((amount / quantity) * 10000) / 10000 : null;
  } else {
    amount = tail[0].value;
  }

  // 금액이 0 이하면 품목 줄이 아니다(문서번호·페이지수 등이 걸린 것).
  if (!(amount !== null && amount > 0)) return null;

  return { raw: line, name, quantity, unitPrice, amount };
}

/** 붙여넣은 덩어리를 줄 단위로 쪼갠다. 빈 줄과 합계 줄은 버린다. */
const TOTAL_WORDS = /(total|subtotal|amount due|balance|sst|gst|tax|delivery|discount|합계|총액|소계|세금|배송|할인)/i;

export function parseInvoiceText(text: string): ParsedInvoiceLine[] {
  return String(text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !TOTAL_WORDS.test(l))
    .map(parseInvoiceLine)
    .filter((x): x is ParsedInvoiceLine => x !== null);
}

/** 금액 = 수량 × 단가 가 맞는지 (반올림 오차 1센트 허용). */
function amountConsistent(p: ParsedInvoiceLine): boolean {
  if (p.quantity == null || p.unitPrice == null || p.amount == null) return false;
  return Math.abs(p.quantity * p.unitPrice - p.amount) <= 0.01;
}

/**
 * 발주 라인마다 가장 잘 맞는 인보이스 줄을 붙인다. 한 인보이스 줄은 한 번만 쓰인다.
 *
 * 상태 규칙:
 *   `matched`     이름이 충분히 겹치고(≥0.6) 금액 정합이 맞음 → 그래도 사람이 확인은 눌러야 한다
 *   `needs_check` 후보는 있으나 이름이 애매(≥0.3)하거나 금액이 안 맞음
 *   `unmatched`   쓸 만한 후보 없음 → 발주 라인 값을 기본으로 두고 사람이 채운다
 */
/**
 * **자동으로 칸에 넣어도 되는 값인가** — 돈 칸의 마지막 문 (2026-09-10 Fable 게이트).
 *
 * 왜 필요한가: 인보이스에는 품목 외에 사업자등록번호·우편번호·계좌번호도 찍혀 있고,
 * 글자인식이 그런 줄을 «수량 5648 × 단가 7456» 처럼 읽어 낸다(실측). 이름 점수가 대부분을
 * 막지만 뚫린 적이 있다 — 실브라우저에서 줄 합계가 186 이어야 할 자리에 **18,132** 가 나왔다.
 *
 * 규칙:
 *   발주 줄 금액 > 0  → 읽은 줄 금액이 그 **20배 초과·1/20 미만**이면 넣지 않는다.
 *                       (실제 단가 차이는 ±50% 안이고, 쓰레기 줄은 수백~수천 배다)
 *   발주 줄 금액 ≤ 0  → 20배 벽을 세울 기준이 없다. 이때는 **matched 일 때만** 넣는다
 *                       (= 이름이 확실하고 «수량×단가=금액» 검산까지 통과). 쓰레기 줄은
 *                       세 숫자가 서로 안 맞아 검산을 못 넘는다.
 *                       ⛔ 운영에 단가 0 인 발주 줄이 실제로 있다. 여기가 열려 있으면
 *                          엉뚱한 값이 저장되어 **원가 전파까지 오염**된다.
 */
export interface InvoiceHeader {
  number: string | null;
  date: string | null;     // YYYY-MM-DD
  total: number | null;
}

/**
 * 인보이스 **머리 정보**(번호·일자·총액)를 읽어낸 글자에서 뽑는다.
 *
 * 2026-09-10 Irene: 「토탈 금액이 여전히 인보이스에서 자동으로 안들어오는데?」
 * 줄만 채우고 머리 칸은 비워 두고 있었다. 사람 눈에 바로 보이는 칸이라 채워도 안전하다(Fable D2).
 *
 * 실측 대상(TAIYANG FRESH):
 *   `INVOICE :IV-26/09-02369` · `Date 8/9/2026` · `Total (RM)| 186.16]`
 */
export function parseInvoiceHeader(text: string): InvoiceHeader {
  const lines = String(text || '').split('\n');
  let number: string | null = null;
  let date: string | null = null;
  let total: number | null = null;

  for (const raw of lines) {
    const line = raw.replace(/\s+/g, ' ').trim();
    if (!line) continue;

    // 번호 — «INVOICE : XXX». 콜론 뒤에서 공백/괄호를 뺀 토큰.
    if (number === null && /invoice/i.test(line) && /:/.test(line)) {
      const after = line.split(':').slice(1).join(':').trim();
      const tok = after.replace(/[|\]\[]/g, ' ').trim().split(' ')[0];
      if (tok && /[0-9]/.test(tok) && tok.length >= 4) number = tok;
    }

    // 일자 — d/m/yyyy 또는 d-m-yyyy. 말레이시아 표기라 **일/월/년** 으로 읽는다.
    if (date === null && /date/i.test(line)) {
      const m = line.match(/(\d{1,2})\s*[/\-.]\s*(\d{1,2})\s*[/\-.]\s*(\d{4})/);
      if (m) {
        const d = m[1].padStart(2, '0');
        const mo = m[2].padStart(2, '0');
        if (Number(mo) >= 1 && Number(mo) <= 12 && Number(d) >= 1 && Number(d) <= 31) date = `${m[3]}-${mo}-${d}`;
      }
    }

    // 총액 — «Total» 이 있는 줄의 **마지막** 소수 두 자리 숫자.
    if (/total/i.test(line)) {
      const nums = line.match(/\d[\d,]*\.\d{2}/g);
      if (nums && nums.length) {
        const v = Number(nums[nums.length - 1].replace(/,/g, ''));
        if (Number.isFinite(v) && v > 0) total = v;
      }
    }
  }
  return { number, date, total };
}

export function shouldAutoFill(result: MatchResult, poLine: PoLine): boolean {
  if (!result.parsed || result.state === 'unmatched') return false;

  const orderedQty = Number(poLine.quantity_ordered) || 0;
  const orderedPrice = Number(poLine.unit_price) || 0;
  const orderedTotal = orderedQty * orderedPrice;

  const readQty = result.parsed.quantity != null ? result.parsed.quantity : orderedQty;
  const readPrice = result.parsed.unitPrice != null ? result.parsed.unitPrice : orderedPrice;
  const readTotal = readQty * readPrice;

  if (orderedTotal > 0) {
    if (!(readTotal > 0)) return true;              // 0 으로 읽힌 것은 사람이 보게 그대로 둔다
    return readTotal <= orderedTotal * 20 && readTotal >= orderedTotal / 20;
  }
  // 기준이 없을 때(발주 0원) — 확실한 줄만 통과시킨다.
  return result.state === 'matched';
}

export function matchInvoiceToPo(poLines: PoLine[], parsedLines: ParsedInvoiceLine[]): MatchResult[] {
  const takenInvoice = new Set<number>();
  const assigned = new Map<number, { idx: number; score: number; viaAlias: boolean }>();

  // ── 1단계: 이름 사전. 가장 확실한 근거라 점수 경쟁을 시키지 않는다.
  //   ⚠ **완전일치로 하면 안 된다** — OCR 이 읽은 이름에는 줄번호·잡음이 붙는다
  //     (실측: 사전 «BAWANG HOLLAND» vs 읽힌 «2 XXXXX BAWANG HOLLAND k#7% (KG) .»).
  //     그래서 «사전 이름의 낱말이 **전부** 들어 있으면 그 줄» 로 판정한다.
  //     BAWANG PUTIH KOPEK 은 holland 가 없어 안 걸리므로 서로 안 헷갈린다.
  for (const line of poLines) {
    const aliasTokens = tokens(line.seller_invoice_name || '');
    if (!aliasTokens.length) continue;
    let bestIdx = -1;
    let bestExtra = -1;
    parsedLines.forEach((p, i) => {
      if (takenInvoice.has(i)) return;
      const parsedTokens = new Set(tokens(p.name));
      if (!aliasTokens.every((t) => parsedTokens.has(t))) return;
      // 여러 줄이 걸리면 사전 이름과 더 가까운 쪽을 고른다.
      const extra = nameScore(line.seller_invoice_name || '', p.name);
      if (extra > bestExtra) { bestExtra = extra; bestIdx = i; }
    });
    if (bestIdx >= 0) { takenInvoice.add(bestIdx); assigned.set(line.id, { idx: bestIdx, score: 1, viaAlias: true }); }
  }

  // ── 2단계: 남은 것끼리 **점수 높은 짝부터** 붙인다(전역 greedy).
  //   ⛔ 발주 라인 순서대로 «각자 최선» 을 고르면 앞 줄이 남의 짝을 먼저 채간다.
  //      실측(2026-09-10 발주 33): 청양고추가 CILI API MERAH(홍청양) 를 가져가 오매칭이 났다.
  //      한 인보이스 줄은 한 발주 줄에만 붙는다 — 자동 채움을 켜는 전제 조건이다.
  const pairs: Array<{ lineId: number; idx: number; score: number }> = [];
  for (const line of poLines) {
    if (assigned.has(line.id)) continue;
    const target = line.seller_product_name || line.description || '';
    parsedLines.forEach((p, i) => {
      if (takenInvoice.has(i)) return;
      const sc = nameScore(target, p.name);
      if (sc >= 0.3) pairs.push({ lineId: line.id, idx: i, score: sc });
    });
  }
  pairs.sort((a, b) => b.score - a.score || a.lineId - b.lineId || a.idx - b.idx);
  for (const pair of pairs) {
    if (assigned.has(pair.lineId) || takenInvoice.has(pair.idx)) continue;
    takenInvoice.add(pair.idx);
    assigned.set(pair.lineId, { idx: pair.idx, score: pair.score, viaAlias: false });
  }

  // ── 3단계: 판정
  return poLines.map((line) => {
    const a = assigned.get(line.id);
    if (!a) {
      return {
        poLineId: line.id,
        parsed: null,
        state: 'unmatched' as MatchState,
        score: 0,
        reason: (parsedLines.length ? 'no_candidate' : 'no_lines') as MatchReason,
      };
    }
    const parsed = parsedLines[a.idx];
    const consistent = amountConsistent(parsed);
    const score = Math.round(a.score * 100) / 100;

    // 사전으로 붙은 줄도 **금액 검산은 통과해야** matched 다 — OCR 오독(28→8)을 여기서 잡는다.
    if ((a.viaAlias || a.score >= 0.6) && consistent) {
      return { poLineId: line.id, parsed, state: 'matched' as MatchState, score, reason: 'ok' as MatchReason };
    }
    return {
      poLineId: line.id, parsed, state: 'needs_check' as MatchState, score,
      reason: (!consistent ? 'amount_mismatch' : 'name_unsure') as MatchReason,
    };
  });
}
