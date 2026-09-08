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
export function matchInvoiceToPo(poLines: PoLine[], parsedLines: ParsedInvoiceLine[]): MatchResult[] {
  const used = new Set<number>();

  return poLines.map((line) => {
    const target = line.seller_product_name || line.description || '';
    let best = -1;
    let bestScore = 0;

    parsedLines.forEach((p, i) => {
      if (used.has(i)) return;
      const s = nameScore(target, p.name);
      if (s > bestScore) { bestScore = s; best = i; }
    });

    if (best < 0 || bestScore < 0.3) {
      return {
        poLineId: line.id,
        parsed: null,
        state: 'unmatched' as MatchState,
        score: Math.round(bestScore * 100) / 100,
        reason: (parsedLines.length ? 'no_candidate' : 'no_lines') as MatchReason
      };
    }

    used.add(best);
    const parsed = parsedLines[best];
    const consistent = amountConsistent(parsed);

    if (bestScore >= 0.6 && consistent) {
      return { poLineId: line.id, parsed, state: 'matched', score: Math.round(bestScore * 100) / 100,
        reason: 'ok' };
    }
    return {
      poLineId: line.id, parsed, state: 'needs_check', score: Math.round(bestScore * 100) / 100,
      reason: !consistent ? 'amount_mismatch' : 'name_unsure'
    };
  });
}
