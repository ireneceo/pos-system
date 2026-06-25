/**
 * TableMoveTrail
 *
 * 2026-06-25 (Irene): 주문이 테이블을 옮긴 내역을 "이전 → 이후" 로 한눈에 보여준다.
 * Floor Plan 우측 패널 + 주문 아이템 리스트에서 사용. order_actions(action_type='table_moved')
 * 의 metadata.from_table/to_table 를 읽어 이동 체인(A → B → C)으로 렌더. 이동이 없으면 null.
 *
 * 표시 전용 — 인쇄/주문 로직과 무관. /actions 는 주문당 1회 가벼운 조회(패널 열릴 때만).
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

interface Move {
  from: string | number | null;
  to: string | number | null;
  mode?: string;
}

interface Props {
  orderId: number | string;
  /** compact: 한 줄 인라인(아이템 리스트 헤더용). 기본은 박스형(우측 패널용). */
  compact?: boolean;
  style?: React.CSSProperties;
}

const TableMoveTrail: React.FC<Props> = ({ orderId, compact, style }) => {
  const { t } = useTranslation('orders');
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/orders/${orderId}/actions`, {
          headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
        });
        const json = await res.json();
        if (cancelled || !json || !json.success || !Array.isArray(json.data)) return;
        const ms: Move[] = json.data
          .filter((a: any) => a.action_type === 'table_moved')
          .map((a: any) => {
            const md = a.metadata || {};
            return { from: md.from_table ?? null, to: md.to_table ?? null, mode: md.mode };
          })
          .filter((m: Move) => m.from != null || m.to != null);
        setMoves(ms);
      } catch { /* 조회 실패 시 조용히 미표시 */ }
    })();
    return () => { cancelled = true; };
  }, [orderId]);

  if (!moves.length) return null;

  // 이동 체인: 첫 출발지 + 각 이동의 도착지 → "A → B → C"
  const chain: (string | number)[] = [];
  if (moves[0].from != null) chain.push(moves[0].from as any);
  moves.forEach(m => { if (m.to != null) chain.push(m.to as any); });
  const merged = moves.some(m => m.mode === 'merged');

  const label = merged
    ? t('moveTrail.merged', 'Merged')
    : t('moveTrail.moved', 'Moved');

  if (compact) {
    return (
      <span style={{ fontSize: 12, color: '#635BFF', fontWeight: 600, ...style }}>
        {label}: {chain.join(' → ')}
      </span>
    );
  }

  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
        background: '#F1F0FE', border: '1px solid #C7CED6',
        borderRadius: 8, padding: '6px 10px', margin: '6px 0',
        fontSize: 12.5, color: '#3B30D9', fontWeight: 600, ...style
      }}
    >
      <span style={{ fontWeight: 700 }}>{label}:</span>
      <span>{chain.join(' → ')}</span>
    </div>
  );
};

export default TableMoveTrail;
