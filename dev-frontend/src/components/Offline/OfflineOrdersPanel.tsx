/**
 * OfflineOrdersPanel — 오프라인 4단계 화면 반영(읽기전용).
 * 끊긴 동안 로컬(IndexedDB)에 보관된 미동기화 주문을 라이브 주문 화면 상단에 별도 패널로 보여준다.
 * 라이브 주문 렌더 파이프라인(useOrdersRealtime/DbOrder)을 건드리지 않는 격리 컴포넌트 — 크래시 위험 0.
 * 동기화되면 목록에서 자동으로 빠진다(unsynced 만 표시). 액션 없음(연결되면 자동 전송).
 * 설계: docs/OFFLINE_MODE_DESIGN.md §5-2.
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOffline } from '../../contexts/OfflineContext';

interface Row {
  localId: string;
  provisionalNumber: string;
  tableNumber?: string | number | null;
  itemCount: number;
  total?: number;
  syncState: string;
}

const OfflineOrdersPanel: React.FC = () => {
  const { isOffline, isReconnecting } = useOffline();
  const { t } = useTranslation('common');
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    let alive = true;
    const load = () => {
      import('../../utils/offlineOps')
        .then(({ listOfflineOrders }) => listOfflineOrders())
        .then((orders) => {
          if (!alive) return;
          setRows((orders || []).map((o: any) => ({
            localId: o.localId,
            provisionalNumber: o.provisionalNumber,
            tableNumber: o.tableNumber,
            itemCount: Array.isArray(o.items) ? o.items.reduce((s: number, it: any) => s + (Number(it.quantity) || 1), 0) : 0,
            total: o.total,
            syncState: o.syncState,
          })));
        })
        .catch(() => {});
    };
    load();
    // 오프라인/복구 중엔 자주, 평소엔 느리게(미동기화 잔여가 있으면 계속 비춤).
    const iv = setInterval(load, (isOffline || isReconnecting) ? 4000 : 15000);
    return () => { alive = false; clearInterval(iv); };
  }, [isOffline, isReconnecting]);

  if (rows.length === 0) return null;

  return (
    <div
      style={{
        margin: '0 0 14px', border: '1px solid #FCD34D', borderRadius: 10,
        background: '#FFFBEB', overflow: 'hidden',
      }}
    >
      <div style={{ padding: '8px 14px', background: '#FEF3C7', color: '#92400E', fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{t('offlineHeldTitle', { defaultValue: 'Offline orders held locally', })} ({rows.length})</span>
        <span style={{ fontWeight: 500, opacity: 0.85 }}>· {t('offlineHeldHint', { defaultValue: 'will send automatically when reconnected' })}</span>
      </div>
      <div>
        {rows.map((r) => (
          <div key={r.localId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', borderTop: '1px solid #FDE68A', fontSize: 13, color: '#1F2937' }}>
            <span style={{ fontWeight: 700, color: '#92400E', minWidth: 120 }}>{r.provisionalNumber}</span>
            <span style={{ minWidth: 60, color: '#6B7C93' }}>{r.tableNumber ? `T-${r.tableNumber}` : '—'}</span>
            <span style={{ flex: 1 }}>{t('offlineHeldItems', { defaultValue: '{{count}} item(s)', count: r.itemCount })}</span>
            {typeof r.total === 'number' && <span style={{ fontWeight: 600 }}>{r.total.toFixed(2)}</span>}
            <span style={{ fontSize: 11, fontWeight: 700, color: r.syncState === 'syncing' ? '#0A7D57' : '#B45309' }}>
              {r.syncState === 'syncing'
                ? t('offlineHeldSyncing', { defaultValue: 'sending…' })
                : t('offlineHeldWaiting', { defaultValue: 'held' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfflineOrdersPanel;
