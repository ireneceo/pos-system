import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

/**
 * Shared client-side pagination — the single standard for long list pages
 * (invoices, etc.). Pages already load their full list into memory, so this
 * slices that array; no backend/API change. Styling matches the established
 * SupplierInvoicesPage PageBtn look (RA design standard: no local one-off
 * styled buttons per page).
 *
 * Usage:
 *   const { pageItems, page, setPage, totalPages, total, pageSize } =
 *     usePagination(filteredInvoices, 20);
 *   ...
 *   {pageItems.map(render)}
 *   <Pagination page={page} totalPages={totalPages} total={total}
 *              pageSize={pageSize} onChange={setPage} />
 */

export interface UsePaginationResult<T> {
  pageItems: T[];
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  total: number;
  pageSize: number;
}

export function usePagination<T>(items: T[], pageSize = 20): UsePaginationResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const [page, setPage] = useState(1);

  // Clamp when the list shrinks (e.g. filter change) so we never sit on an
  // empty out-of-range page.
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  return { pageItems, page, setPage, totalPages, total, pageSize };
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const Info = styled.div`
  font-size: 13px;
  color: var(--pos-text-muted, #6B7280);
  font-variant-numeric: tabular-nums;
`;

const Buttons = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 34px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid ${p => (p.$active ? '#635BFF' : '#C7CED6')};
  background: ${p => (p.$active ? '#635BFF' : 'white')};
  border-radius: 6px;
  font-size: 13px;
  font-weight: ${p => (p.$active ? 600 : 500)};
  color: ${p => (p.$active ? 'white' : '#1F2937')};
  cursor: pointer;
  transition: all 0.15s;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
  &:hover:not(:disabled):not([data-active='true']) {
    border-color: #635BFF;
    color: #635BFF;
  }
`;

const Ellipsis = styled.span`
  min-width: 20px;
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
  align-self: center;
`;

// Build a compact page window: 1 … (p-1) p (p+1) … last
function pageWindow(page: number, totalPages: number): (number | 'gap')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const out: (number | 'gap')[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(totalPages - 1, page + 1);
  if (left > 2) out.push('gap');
  for (let i = left; i <= right; i++) out.push(i);
  if (right < totalPages - 1) out.push('gap');
  out.push(totalPages);
  return out;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
  /** Optional noun for the count label, e.g. "invoices". Default: "items". */
  label?: string;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, total, pageSize, onChange, label = 'items' }) => {
  if (totalPages <= 1) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(total, page * pageSize);
  const go = (p: number) => onChange(Math.min(totalPages, Math.max(1, p)));

  return (
    <Bar>
      <Info>{from}–{to} of {total} {label}</Info>
      <Buttons>
        <PageBtn onClick={() => go(page - 1)} disabled={page <= 1}>‹</PageBtn>
        {pageWindow(page, totalPages).map((p, i) =>
          p === 'gap'
            ? <Ellipsis key={`g${i}`}>…</Ellipsis>
            : <PageBtn key={p} $active={p === page} data-active={p === page} onClick={() => go(p)}>{p}</PageBtn>
        )}
        <PageBtn onClick={() => go(page + 1)} disabled={page >= totalPages}>›</PageBtn>
      </Buttons>
    </Bar>
  );
};

export default Pagination;
