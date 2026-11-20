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
  | 'name_unsure'      // 이름이 확실하지 않음
  | 'same_price';      // 이름은 달라도 단가·수량이 발주와 같고 검산이 맞음 (D3 · 2026-11-20)

export interface MatchResult {
  poLineId: number;
  parsed: ParsedInvoiceLine | null;
  state: MatchState;
  score: number;
  /** 왜 이 상태인지 — 화면이 문구로 옮긴다 */
  reason: MatchReason;
  /** 이름 사전으로 붙었나 — 화면이 «사전을 덮어쓰지 않는다» 판단에 쓴다 */
  viaAlias?: boolean;
}

/** 발주 줄과 단가·수량이 같은가 (D3) — 단가 ±0.005, 수량 ±0.0005 */
function samePriceQty(p: ParsedInvoiceLine, line: PoLine): boolean {
  if (p.unitPrice == null || p.quantity == null) return false;
  return Math.abs(p.unitPrice - (Number(line.unit_price) || 0)) < 0.005
    && Math.abs(p.quantity - (Number(line.quantity_ordered) || 0)) < 0.0005;
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
  // 숫자만인 토큰은 버린다 — OCR 이 읽은 줄 앞머리의 **줄번호**(「14 XXXXX LEEK…」)가 이름의 일부로
  // 사전에 들어가 다음 인보이스에서 안 걸리게 만들던 잡음이다. 「338ml」·「5l」 같은 혼합 토큰은 남는다.
  return normalize(s).split(' ')
    .filter((t) => t.length >= 2 && !STOP.has(t) && !/^\d+$/.test(t));
}

/**
 * 이름 사전에 **저장할 값**. 읽힌 이름을 매칭과 **같은 규칙**으로 정규화해 잡음을 걷어낸다.
 *
 * 왜 필요한가(2026-09-24 실측): 화면이 파싱된 줄 이름을 통째로 저장했고
 * (`"2 XXXXX BAWANG HOLLAND k#7% (KG) ."`), 매칭 1단계는 「사전 낱말이 전부 들어 있으면」이라
 * 그 잡음 낱말까지 다음 인보이스에 똑같이 나와야 통과했다. 저장과 매칭이 같은 함수를 봐야 한다.
 */
export function aliasFor(parsedName: string | null | undefined): string {
  return tokens(String(parsedName || '')).join(' ');
}

/**
 * 이번 저장에서 사전을 **갱신할지** 정한다.
 * 사전으로 붙은 줄(viaAlias)은 갱신하지 않는다 — 안 그러면 잘 붙은 깨끗한 사전을
 * 이번에 읽힌 잡음 이름으로 덮어써서 학습이 **퇴화**한다(Fable 적발).
 * 사람이 직접 고른 줄은 항상 갱신한다(공급업체가 인쇄명을 바꿨을 때의 갱신 경로).
 */
export function aliasToRemember(
  result: { parsed: { name?: string } | null; viaAlias?: boolean } | null | undefined,
  pickedByHuman = false
): string | undefined {
  if (!result || !result.parsed) return undefined;
  if (result.viaAlias && !pickedByHuman) return undefined;
  const a = aliasFor(result.parsed.name);
  return a || undefined;
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

/** 인보이스 한 줄 금액의 상한 — 이보다 크면 전화번호·계좌번호가 금액 자리에 걸린 것이다. */
const MAX_LINE_AMOUNT = 1000000;
/** 수량×단가 와 금액이 이 배수를 넘게 어긋나면 품목 줄이 아니다(한 자리 오독 3.5배는 통과 → 확인 필요). */
const MAX_AMOUNT_RATIO = 10;

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

  let quantity: number | null = null;
  let unitPrice: number | null = null;
  let amount: number | null = null;

  let nameEnd = tail[0].index;
  if (tail.length === 3) {
    [quantity, unitPrice, amount] = tail.map((n) => n.value);
    // D1 수량 구제 (2026-11-20 운영 발주 249 · LOW SEAT HOONG · Fable 설계):
    //   «. 2 #ETong [1 31.3000 62.60» — 단위 옆 빈 네모 «[]» 가 «[1» 로 읽혀 수량 자리에 1 이 앉았다.
    //   뒤 3개가 «수량×단가=금액» 을 못 맞추면 단가·금액은 그대로 두고, **그 앞 1~2번째 숫자** 중
    //   검산이 맞는 것을 수량으로 쓴다. 못 찾으면 지금 동작 그대로(28.00→8.00 오독은 «확인 필요» 로 남는다).
    if (unitPrice !== null && amount !== null && Math.abs(Math.abs(quantity as number) * unitPrice - amount) > 0.01) {
      const before = nums.slice(Math.max(0, nums.length - 5), nums.length - 3).reverse();
      const hit = before.find((n) => n.value !== 0 && Math.abs(Math.abs(n.value) * (unitPrice as number) - (amount as number)) <= 0.01);
      if (hit) { quantity = hit.value; nameEnd = hit.index; }
    }
  } else if (tail.length === 2) {
    // 수량·금액만 준 형태가 흔하다. 단가는 나눠서 만든다.
    [quantity, amount] = tail.map((n) => n.value);
    unitPrice = quantity > 0 ? Math.round((amount / quantity) * 10000) / 10000 : null;
  } else {
    amount = tail[0].value;
  }

  const name = line.slice(0, nameEnd).trim().replace(/[-–—:|]+$/, '').trim();
  if (!name) return null;

  // 금액이 0 이하면 품목 줄이 아니다(문서번호·페이지수 등이 걸린 것).
  if (!(amount !== null && amount > 0)) return null;

  // «설명 - 1 Paket» 의 구분 대시가 수량에 붙어 «-1» 로 읽힌다 (2026-11-04 운영 발주 93 · LOW SEAT HOONG 실측:
  //   Black Fungus · Squid Cube 등 3줄이 수량 −1 → 아래 상식 검사에 걸려 줄째 사라졌다).
  //   금액이 양수인 줄의 음수 수량은 반품이 아니라(반품은 금액도 음수라 위에서 이미 빠진다) 대시다 → 부호만 뗀다.
  if (quantity !== null && quantity < 0) {
    quantity = -quantity;
    if (tail.length === 2) unitPrice = quantity > 0 ? Math.round((amount / quantity) * 10000) / 10000 : null;
  }

  // ── 상식 검사 (2026-09-11 Fable 판정) — 품목 줄이 될 수 없는 숫자 조합은 버린다.
  //   실측: 운영 발주 32(Guan Kee **손글씨** 인보이스)를 OCR 하면 전화번호 줄
  //   «Hand Phone: 019-3221326, 0122031628» 이 수량 19 · 단가 −3,221,326 · 금액 122,031,628 로 통과해
  //   발주 6줄 모두의 «이 줄 고르기» 목록에 그 한 줄만 떴다(Irene: «전혀 맞지도 않아 … 리스트는 2-3개»).
  //   ⚠ «수량×단가 ≠ 금액» 만으로는 버리지 않는다 — 인쇄 인보이스에서 OCR 이 금액 한 자리를 놓친 줄(28.00→8.00)은
  //     매칭기가 amount_mismatch(확인 필요)로 사람에게 보여 줘야 한다(계약 테스트 (b)). **자릿수가 통째로 다른 것만** 버린다.
  if (amount >= MAX_LINE_AMOUNT) return null;
  if (quantity !== null && !(quantity > 0)) return null;
  if (unitPrice !== null && !(unitPrice > 0)) return null;
  if (tail.length === 3 && quantity !== null && unitPrice !== null) {
    const ratio = (quantity * unitPrice) / amount;
    if (!(ratio <= MAX_AMOUNT_RATIO && ratio >= 1 / MAX_AMOUNT_RATIO)) return null;
  }

  return { raw: line, name, quantity, unitPrice, amount };
}

/** 붙여넣은 덩어리를 줄 단위로 쪼갠다. 빈 줄과 합계 줄은 버린다. */
const TOTAL_WORDS = /(total|subtotal|amount due|balance|sst|gst|tax|delivery|discount|합계|총액|소계|세금|배송|할인)/i;

/** 표 머리줄 — 수량 칸과 금액 칸 이름이 함께 있는 줄 (D2). */
const TABLE_HEAD_QTY = /\b(qty|quantity)\b/i;
const TABLE_HEAD_MONEY = /(price|total|amount)/i;
/** 표 구역을 닫는 줄 — 합계어(추가 비용 줄은 제외) 또는 Remark·Notes·Terms 로 시작 */
const TABLE_END = /^\W*(remarks?|notes?|terms)\b/i;
/** 추가 비용 줄 (D4) — 품목이 아니라 배송비·추가 비용 칸으로 간다 */
const CHARGE_WORDS = /(extra\s*charges?|surcharge|delivery|transport|freight|handling|service\s*charge)/i;

/**
 * 읽은 글자를 **품목 줄**과 **추가 비용**으로 나눈다 (2026-11-20 운영 발주 249 · Fable 설계 D2·D4).
 *
 * D2 표 구역만 읽기: 문서에 표 머리줄(«Qty … Price/Total»)이 하나라도 있으면 품목 줄은 머리줄 뒤부터
 *   합계어 줄 또는 Remark·Notes·Terms 줄 전까지만 인정한다(쪽마다 다시 열린다). 주소·계좌·주문번호 줄
 *   («D/Order No. : DO2611-3570» 이 수량 3570 으로 읽혔다)이 고르기 목록에 섞이던 것을 막는다.
 *   머리줄이 없으면(붙여넣기·다른 양식) 예전 동작 그대로다.
 * D4 추가 비용: 표 구역 안에서 «Extra Charges·Delivery…» 이고 «수량×단가=금액» 검산이 맞는 줄은 품목에서 빼
 *   합계를 `charges` 로 돌려준다(화면이 배송비·추가 비용 칸에 넣는다).
 */
function scanInvoiceText(text: string): { items: ParsedInvoiceLine[]; charges: number | null } {
  const lines = String(text || '').split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
  const isHead = (l: string) => TABLE_HEAD_QTY.test(l) && TABLE_HEAD_MONEY.test(l);
  const hasTable = lines.some(isHead);
  const items: ParsedInvoiceLine[] = [];
  if (!hasTable) {
    for (const l of lines) {
      if (TOTAL_WORDS.test(l)) continue;
      const p = parseInvoiceLine(l);
      if (p) items.push(p);
    }
    return { items, charges: null };
  }
  let inTable = false;
  let charges: number | null = null;
  for (const l of lines) {
    if (isHead(l)) { inTable = true; continue; }
    if (!inTable) continue;
    const isCharge = CHARGE_WORDS.test(l);
    if (TABLE_END.test(l) || (TOTAL_WORDS.test(l) && !isCharge)) { inTable = false; continue; }
    const p = parseInvoiceLine(l);
    if (!p) continue;
    if (isCharge) {
      if (amountConsistent(p)) charges = Math.round(((charges ?? 0) + (p.amount as number)) * 100) / 100;
      continue;
    }
    items.push(p);
  }
  // 표 안 구역 제목 줄 거르기 (2026-11-20 실브라우저 실측 · 발주 249):
  //   «Storage Met: Dry Goods (Cool Dry Place) F# (4:8 Bis FRA FI)» — 한자가 숫자 4·8 로 읽혀 «4 × 2.00 = 8.00» 품목이 됐다.
  //   표의 품목 줄들이 **소수점 금액**(62.60·9.20)을 쓰면, 소수점 없는 금액 줄은 품목이 아니다.
  //   소수점 금액 줄이 둘 미만이면(정수로만 적는 양식) 거르지 않는다.
  const decimalAmount = (p: ParsedInvoiceLine) => {
    const nums = p.raw.match(NUM) || [];
    return /\.\d/.test(nums[nums.length - 1] || '');
  };
  const withDecimals = items.filter(decimalAmount).length;
  if (withDecimals >= 2) return { items: items.filter(decimalAmount), charges };
  return { items, charges };
}

export function parseInvoiceText(text: string): ParsedInvoiceLine[] {
  return scanInvoiceText(text).items;
}

/** 읽은 글자의 추가 비용(배송·운송·Extra Charges) 합계 — 표 구역에서만. 없으면 null. */
export function parseInvoiceCharges(text: string): number | null {
  return scanInvoiceText(text).charges;
}

/** 금액 = 수량 × 단가 가 맞는지 (반올림 오차 1센트 허용). */
export function amountConsistent(p: ParsedInvoiceLine): boolean {
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
  /** 추가 비용(Extra Charges·Delivery…) 합계 — 표 구역에서만 읽는다(D4). 없으면 null */
  charges: number | null;
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

    // 번호 — «INVOICE : XXX». **줄 안 마지막 «invoice» 낱말 뒤** 콜론 다음 토큰.
    //   2026-11-20 운영 발주 249: «Account No: 300-W117 Registration No: | Invoice Ne. :[Va611-3295» 에서
    //   첫 콜론 뒤를 읽어 계좌번호 300-W117 이 인보이스 번호 칸에 들어갔다(Fable D6).
    if (number === null && /invoice/i.test(line)) {
      const at = line.toLowerCase().lastIndexOf('invoice');
      const rest = line.slice(at);
      const colon = rest.indexOf(':');
      if (colon >= 0) {
        const after = rest.slice(colon + 1).trim();
        const tok = after.replace(/[|\]\[]/g, ' ').trim().split(' ')[0];
        if (tok && /[0-9]/.test(tok) && tok.length >= 4) number = tok;
      }
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
  return { number, date, total, charges: parseInvoiceCharges(text) };
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
  const assigned = new Map<number, { idx: number; score: number; viaAlias: boolean; samePrice?: boolean }>();

  // ── 1단계: 이름 사전. 가장 확실한 근거라 점수 경쟁을 시키지 않는다.
  //   ⚠ **완전일치로 하면 안 된다** — OCR 이 읽은 이름에는 줄번호·잡음이 붙는다
  //     (실측: 사전 «BAWANG HOLLAND» vs 읽힌 «2 XXXXX BAWANG HOLLAND k#7% (KG) .»).
  //   2026-09-24: **양방향 부분집합**으로 넓혔다 — 어느 한쪽 낱말이 다른 쪽에 전부 들어 있으면 짝.
  //     사전이 깨끗하고 줄이 지저분해도(전에도 됨), 사전이 지저분하고 줄이 깨끗해도(전엔 안 됨) 잡는다.
  //     옛 사전에는 잡음이 통째로 저장돼 있어 후자가 실제로 많다.
  //     `cili api merah` vs `cili api hijau` 는 어느 쪽도 부분집합이 아니라 안 섞인다(임계값 없는 규칙).
  //   그리고 2단계처럼 **전역 greedy** 로 — 발주 줄 순서에 따라 앞 줄이 남의 짝을 채가지 않게.
  const aliasPairs: Array<{ lineId: number; idx: number; gap: number; extra: number }> = [];
  for (const line of poLines) {
    const aliasTokens = tokens(line.seller_invoice_name || '');
    if (!aliasTokens.length) continue;
    const aliasSet = new Set(aliasTokens);
    parsedLines.forEach((p, i) => {
      const parsedTokens = tokens(p.name);
      if (!parsedTokens.length) return;
      const parsedSet = new Set(parsedTokens);
      const aliasInParsed = aliasTokens.every((t) => parsedSet.has(t));
      const parsedInAlias = parsedTokens.every((t) => aliasSet.has(t));
      if (!aliasInParsed && !parsedInAlias) return;
      aliasPairs.push({
        lineId: line.id,
        idx: i,
        // 낱말 수 차이가 작을수록 «더 가까운 이름» — 겹치는 후보가 여럿일 때의 순서.
        gap: Math.abs(aliasTokens.length - parsedTokens.length),
        extra: nameScore(line.seller_invoice_name || '', p.name)
      });
    });
  }
  aliasPairs.sort((x, y) => (x.gap - y.gap) || (y.extra - x.extra) || (x.lineId - y.lineId));
  for (const pair of aliasPairs) {
    if (assigned.has(pair.lineId) || takenInvoice.has(pair.idx)) continue;
    takenInvoice.add(pair.idx);
    assigned.set(pair.lineId, { idx: pair.idx, score: 1, viaAlias: true });
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

  // ── 2.5단계: «가격이 같으면» (D3(b) · 2026-11-20 Irene «가격이 같으면 좀 알아서 가져올 수 없어?»)
  //   이름으로 못 붙은 발주 줄 ↔ 남은 인보이스 줄(검산 통과분만) 사이에서 **단가·수량이 같은 짝이
  //   양쪽 모두 유일할 때만** 붙인다. 같은 가격 줄이 둘 이상이면 어느 것인지 모르므로 붙이지 않는다.
  const freeParsed = parsedLines
    .map((p, i) => ({ p, i }))
    .filter(({ p, i }) => !takenInvoice.has(i) && amountConsistent(p));
  const freeLines = poLines.filter((l) => !assigned.has(l.id));
  for (const line of freeLines) {
    const cands = freeParsed.filter(({ p }) => samePriceQty(p, line));
    if (cands.length !== 1) continue;
    const only = cands[0];
    const rivals = freeLines.filter((other) => samePriceQty(only.p, other));
    if (rivals.length !== 1) continue;
    takenInvoice.add(only.i);
    assigned.set(line.id, { idx: only.i, score: 0, viaAlias: false, samePrice: true });
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
      return { poLineId: line.id, parsed, state: 'matched' as MatchState, score, reason: 'ok' as MatchReason, viaAlias: a.viaAlias };
    }
    // D3: 가격으로 붙은 줄(2.5단계) · 이름이 애매하게 붙었지만 단가·수량이 발주와 같고 검산이 맞는 줄 → 확실
    if (consistent && (a.samePrice || (!a.viaAlias && samePriceQty(parsed, line)))) {
      return { poLineId: line.id, parsed, state: 'matched' as MatchState, score, reason: 'same_price' as MatchReason, viaAlias: false };
    }
    return {
      poLineId: line.id, parsed, state: 'needs_check' as MatchState, score,
      reason: (!consistent ? 'amount_mismatch' : 'name_unsure') as MatchReason,
      viaAlias: a.viaAlias,
    };
  });
}

/**
 * 인보이스에 **없는** 발주 줄을 찾는다 (D5 · 2026-11-20 운영 발주 249 — 후추 82.00 이 인보이스에 없었다).
 *
 * 산수가 맞을 때만 말한다: 읽은 총액이 있고, 짝이 붙은 줄 금액 합 + 추가 비용 = 총액(±0.01)인데
 * 못 붙은 발주 줄이 남아 있으면 → 그 줄들은 청구되지 않은 것이다(화면이 청구 수량 0 으로 채운다).
 * 산수가 안 맞으면 빈 배열 — 지어내지 않는다.
 */
export function inferNotInvoiced(
  results: MatchResult[],
  poLines: PoLine[],
  opts: { total: number | null | undefined; charges?: number | null },
): number[] {
  const total = opts.total;
  if (total == null || !Number.isFinite(Number(total)) || !(Number(total) > 0)) return [];
  const missing = poLines
    .map((l) => l.id)
    .filter((id) => { const r = results.find((x) => x.poLineId === id); return !r || !r.parsed || r.state === 'unmatched'; });
  if (!missing.length) return [];
  const matchedSum = results.reduce((s, r) => (r.parsed && r.state !== 'unmatched' && r.parsed.amount != null ? s + r.parsed.amount : s), 0);
  const sum = Math.round((matchedSum + (Number(opts.charges) || 0)) * 100) / 100;
  return Math.abs(sum - Math.round(Number(total) * 100) / 100) <= 0.01 ? missing : [];
}
