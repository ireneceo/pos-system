/**
 * 인보이스 목록 순서·기간 필터의 기준 날짜 (2026-09-11)
 *
 * Irene: 「최근 주문일 기준으로 리스트업 되어야 하는데 왜 이슈드날짜가 다 같고 날짜별로 안되어서 최신> 오래된 순서를 알 수가 없어.」
 * 운영 실측: 매장 10 구입 청구서 14장의 발행일(issued_at)이 전부 2026-09-08 20:44 — 청구서 없던 지난 발주를 한꺼번에
 * 만든 날(scripts/backfill-trade-invoices.js «발행일은 실행하는 날»). 실제 주문일은 8/27~9/4 로 제각각이다.
 *
 * 규칙: 연결 발주가 있는 청구서(구입)는 **발주 주문일**, 없는 청구서(구독·서비스 등)는 **발행일**.
 * 최신 → 오래된 순. 같은 날짜면 청구서 번호 역순(나중 번호 먼저)으로 흔들리지 않게.
 * ⚠ 발행일 칸의 뜻(청구서가 만들어진 날)은 바꾸지 않는다 — 순서와 필터만 이 날짜를 쓴다.
 */
export interface InvoiceOrderFields {
  issueDate?: string | null;
  poOrderedAt?: string | null;
  invoiceNumber?: string | null;
}

/** 순서·필터 기준 날짜(ms). 둘 다 없거나 읽을 수 없으면 NaN */
export const invoiceListDateMs = (inv: InvoiceOrderFields): number => {
  const raw = inv.poOrderedAt || inv.issueDate || '';
  const t = raw ? new Date(raw).getTime() : NaN;
  return Number.isFinite(t) ? t : NaN;
};

/** 최신 → 오래된 순으로 **새 배열**을 돌려준다(원본 무변경). 날짜 없는 청구서는 맨 뒤. */
export const sortInvoicesRecentFirst = <T extends InvoiceOrderFields>(list: T[]): T[] =>
  [...list].sort((a, b) => {
    const ta = invoiceListDateMs(a);
    const tb = invoiceListDateMs(b);
    const na = Number.isNaN(ta);
    const nb = Number.isNaN(tb);
    if (na !== nb) return na ? 1 : -1;
    if (!na && ta !== tb) return tb - ta;
    return String(b.invoiceNumber || '').localeCompare(String(a.invoiceNumber || ''));
  });
