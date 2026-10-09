import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * `?invoice=<id>` 로 들어오면 그 청구서 상세 창을 연다 — 발주 상세 «청구서 보기» 가 보내는 링크 (2026-10-09 Fable C-2 공통결함 ②).
 * 매장 화면(Restaurant/InvoicesPage)은 같은 일을 자기 안에서 하고, 오너·브랜드·푸드코트 화면이 이 훅을 쓴다.
 * 목록 여러 개(낼 것 · 낸 것 · 전체)에서 찾고, 한 번 연 뒤 쿼리를 지운다(새로고침해도 다시 안 열리게).
 */
export function useInvoiceDeepLink<T extends { id: string | number }>(lists: T[][], open: (inv: T) => void): void {
  const [searchParams, setSearchParams] = useSearchParams();
  const wanted = searchParams.get('invoice');
  const doneRef = useRef(false);
  useEffect(() => {
    if (!wanted || doneRef.current) return;
    for (const list of lists) {
      const hit = (list || []).find(i => String(i.id) === String(wanted));
      if (hit) {
        doneRef.current = true;
        open(hit);
        setSearchParams(prev => { const next = new URLSearchParams(prev); next.delete('invoice'); return next; }, { replace: true });
        return;
      }
    }
  }, [wanted, ...lists]); // eslint-disable-line react-hooks/exhaustive-deps
}
