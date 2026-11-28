/**
 * 청구서 줄 표시 규칙 — 화면·인쇄(PDF) 공용 (2026-11-28 · Fable 설계 .claude/fable-design-20261128-invoice-detail-lines.md §3-1)
 *
 * 세부 줄(내용만 · item_type 'line_detail'): 바로 위 금액 줄 밑에 «- 내용», 단가·금액 칸은 빈칸,
 *   수량은 1 이 아닐 때만. 판별은 표식 하나뿐 — 금액 0·단가 없음으로 가르지 않는다(0원 구독 줄은 «RM 0.00» 그대로).
 * 금액 줄은 지금 출력과 글자 하나도 달라지지 않는다.
 */
export const DETAIL_ITEM_TYPE = 'line_detail';

export const isDetailLine = (item: any): boolean =>
  !!item && (item.isDetail === true || item.itemType === DETAIL_ITEM_TYPE || item.item_type === DETAIL_ITEM_TYPE);

export interface InvoiceLineCells {
  detail: boolean;
  description: string;
  qty: string;
  unitPrice: string;
  amount: string;
}

export function invoiceLineCells(
  item: any,
  money: (n: number) => string,
  qtyText?: (item: any) => string,
): InvoiceLineCells {
  const detail = isDetailLine(item);
  const qty = qtyText ? qtyText(item) : String(item?.quantity ?? '');
  if (!detail) {
    return {
      detail,
      description: item.description,
      qty,
      unitPrice: money(item.unitPrice ?? item.unit_price ?? 0),
      amount: money(item.total ?? item.total_amount ?? 0),
    };
  }
  return {
    detail,
    description: `- ${item.rawDescription ?? item.description ?? ''}`,
    qty: Number(item.quantity ?? 1) === 1 ? '' : qty,
    unitPrice: '',
    amount: '',
  };
}

/** 세부 줄 칸 모양 — 화면(React style) */
export const DETAIL_CELL_STYLE = { paddingLeft: 28, color: '#6B7280', fontSize: 13 } as const;
/** 세부 줄 칸 모양 — 인쇄 HTML(style 속성) */
export const DETAIL_CELL_CSS = 'padding-left:28px;color:#6B7280;font-size:13px;';
/** 세부 줄 행 위아래 여백(화면) */
export const DETAIL_ROW_PADDING = '4px 8px';

/** 입력칸 글 → 세부 줄 설명 목록 (줄마다 trim · 빈 줄 제거 · 맨 앞 하이픈 제거) */
export const DETAIL_MAX_LINES = 30;
export const DETAIL_MAX_LEN = 255;
export function parseDetailLines(text: string): { lines: string[]; error: 'too_long' | 'too_many' | null } {
  const lines = String(text || '')
    .split(/\r?\n/)
    .map(l => l.trim().replace(/^[-–•]\s*/, '').trim())
    .filter(Boolean);
  if (lines.some(l => l.length > DETAIL_MAX_LEN)) return { lines, error: 'too_long' };
  if (lines.length > DETAIL_MAX_LINES) return { lines, error: 'too_many' };
  return { lines, error: null };
}

/** 세부 줄 → 새 청구서 items 에 붙일 행 */
export const detailItemRow = (description: string) => ({
  item_type: DETAIL_ITEM_TYPE,
  description,
  quantity: 1,
  calculation_method: 'fixed',
  calculated_amount: 0,
  tax_rate: 0,
  tax_amount: 0,
  total_amount: 0,
});

/** 세부 줄이 아닌(금액) 줄 수 */
export const countAmountLines = (items: any[] | undefined | null): number =>
  (items || []).filter(it => !isDetailLine(it)).length;
