import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TableStatusInfo } from './types';

/**
 * 아이템별 리스트 (Expo / Runner) — 서빙(홀) 직원용 (2026-06-03).
 * 활성 주문의 아이템을 한 줄씩, 주문 순서대로 펼쳐 보여준다. 옵션·테이블번호 표시 →
 * 음식이 나오면 바로 어디로 가는지 안다. 행 탭 = 그 아이템 서빙 완료 토글.
 * "주문 전체보기" → 해당 테이블/테이크웨이 우측 패널 오픈.
 * 인쇄·결제·취소 없음(카운터 전용). docs/SERVING_VIEW_DESIGN.md §8.
 */

const Wrap = styled.div`
  flex: 1; min-height: 0; display: flex; flex-direction: column;
  background: var(--pos-menu-bg, #F1F4F8);
`;
const Head = styled.div`
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 16px; font-size: 14px; color: var(--pos-text-muted, #4B5563);
  border-bottom: 1px solid var(--pos-border, #E6EBF1);
  strong { color: var(--pos-text, #0A2540); font-weight: 700; }
`;
const List = styled.div`
  flex: 1; min-height: 0; overflow-y: auto; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 8px;
`;
const Row = styled.button<{ $served?: boolean; $color: string }>`
  display: grid; grid-template-columns: 8px 1fr auto; gap: 12px; align-items: center;
  width: 100%; text-align: left; min-height: 60px; padding: 10px 14px;
  background: var(--pos-surface, #FFFFFF);
  border: 1px solid var(--pos-border, #E6EBF1);
  border-left: 6px solid ${p => p.$color};
  border-radius: 12px; cursor: pointer; transition: background .12s, opacity .12s;
  opacity: ${p => (p.$served ? 0.5 : 1)};
  &:hover { background: var(--pos-surface-2, #F7F9FC); }
`;
const Dot = styled.span<{ $color: string }>`
  width: 12px; height: 12px; border-radius: 50%; background: ${p => p.$color}; display: inline-block;
`;
const Main = styled.div`
  min-width: 0;
  .name { font-size: 17px; font-weight: 700; color: var(--pos-text, #0A2540);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .name .qty { color: var(--pos-brand-text, #635BFF); }
  .name .struck { text-decoration: line-through; }
  .opts { font-size: 13px; color: var(--pos-text-muted, #6B7C93); margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;
const Right = styled.div`
  display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0;
  .loc { font-size: 15px; font-weight: 800; color: var(--pos-text, #0A2540); white-space: nowrap; }
  .meta { font-size: 12px; color: var(--pos-text-muted, #6B7C93); white-space: nowrap; }
`;
const ViewOrder = styled.span`
  font-size: 12px; font-weight: 700; color: var(--pos-brand-text, #635BFF);
`;
const Empty = styled.div`
  flex: 1; display: flex; align-items: center; justify-content: center;
  color: var(--pos-text-muted, #6B7C93); font-size: 15px;
`;

// 상태 → 색/순서(낮을수록 위). 준비됨(ready) 최우선, 그다음 진행, 마지막 서빙됨(dimmed).
const STATUS_META: Record<string, { color: string; order: number; served?: boolean }> = {
  ready:      { color: '#10B981', order: 0 },
  preparing:  { color: '#F59E0B', order: 1 },
  pending:    { color: '#9CA3AF', order: 2 },
  outstanding:{ color: '#9CA3AF', order: 2 },
  served:     { color: '#9CA3AF', order: 3, served: true },
  completed:  { color: '#9CA3AF', order: 3, served: true },
};
const metaFor = (s?: string) => STATUS_META[String(s || 'pending')] || STATUS_META.pending;

interface FlatRow {
  key: string;
  orderId: number;
  itemIndex: number;
  name: string;
  qty: number;
  options: string;
  status: string;
  loc: string;         // TABLE 5 / TAKEAWAY / PAGER 3
  isTakeaway: boolean;
  tableNumber: string | null;
  seq: number;         // 주문 순서(오래된 순) 정렬용
}

interface ItemListViewProps {
  dineInOrders: TableStatusInfo[];
  takeawayOrders: any[];
  onServe: (orderId: number, itemIndex: number, makeServed: boolean) => void;
  onOpenDineIn: (tableNumber: string, orderId: number) => void;
  onOpenTakeaway: (orderId: number) => void;
}

const optionsText = (item: any): string => {
  const parts: string[] = [];
  (item.options || []).forEach((o: any) => parts.push(typeof o === 'string' ? o : (o?.name || '')));
  (item.set_components || []).forEach((c: any) => {
    if (c?.name) parts.push(c.options && c.options.length ? `${c.name} (${c.options.join(', ')})` : c.name);
  });
  return parts.filter(Boolean).join(' · ');
};

const ItemListView: React.FC<ItemListViewProps> = ({ dineInOrders, takeawayOrders, onServe, onOpenDineIn, onOpenTakeaway }) => {
  const { t } = useTranslation(['floorplan']);

  const rows = useMemo<FlatRow[]>(() => {
    const out: FlatRow[] = [];
    const pushOrder = (order: any, loc: string, isTakeaway: boolean, tableNumber: string | null, seq: number) => {
      const status = String(order.orderStatus || order.status || '');
      if (status === 'cancelled') return;
      const items = order.orderItems || order.order_items || [];
      (Array.isArray(items) ? items : []).forEach((item: any, idx: number) => {
        out.push({
          key: `${order.orderId || order.id}-${idx}`,
          orderId: order.orderId || order.id,
          itemIndex: idx,
          name: item.menuItem?.name || item.name || 'Item',
          qty: item.quantity || 1,
          options: optionsText(item),
          status: String(item.status || status || 'pending'),
          loc, isTakeaway, tableNumber,
          seq,
        });
      });
    };
    // dine-in: 활성 테이블 주문(완료/취소 제외 — 진행 흐름)
    dineInOrders.forEach(o => {
      const st = String(o.orderStatus || o.status || '');
      if (st === 'cancelled' || st === 'completed') return;
      const tnum = o.tableNumber != null ? String(o.tableNumber) : null;
      pushOrder(o, tnum ? `${t('floorplan:itemList.table', { defaultValue: 'TABLE' })} ${tnum}` : t('floorplan:itemList.dineIn', { defaultValue: 'DINE-IN' }),
        false, tnum, -(o.elapsedMinutes || 0));
    });
    // takeaway
    takeawayOrders.forEach(o => {
      const st = String(o.orderStatus || o.status || '');
      if (st === 'cancelled' || st === 'completed') return;
      const pager = o.pager_number || o.pagerNumber;
      const loc = pager ? `${t('floorplan:itemList.pager', { defaultValue: 'PAGER' })} ${pager}` : t('floorplan:itemList.takeaway', { defaultValue: 'TAKEAWAY' });
      pushOrder(o, loc, true, null, -(o.elapsedMinutes || 0));
    });
    // 정렬: 상태(ready→preparing→pending→served) → 주문 오래된 순
    out.sort((a, b) => {
      const om = metaFor(a.status).order - metaFor(b.status).order;
      if (om !== 0) return om;
      return a.seq - b.seq;
    });
    return out;
  }, [dineInOrders, takeawayOrders, t]);

  const activeCount = rows.filter(r => !metaFor(r.status).served).length;
  const readyCount = rows.filter(r => r.status === 'ready').length;

  return (
    <Wrap>
      <Head>
        <span>{t('floorplan:itemList.title', { defaultValue: 'Items to serve' })}</span>
        <span>
          <strong>{activeCount}</strong> {t('floorplan:itemList.active', { defaultValue: 'active' })}
          {readyCount > 0 && <> · <strong style={{ color: '#10B981' }}>{readyCount}</strong> {t('floorplan:itemList.ready', { defaultValue: 'ready' })}</>}
        </span>
      </Head>
      {rows.length === 0 ? (
        <Empty>{t('floorplan:itemList.empty', { defaultValue: 'No active items' })}</Empty>
      ) : (
        <List>
          {rows.map(r => {
            const m = metaFor(r.status);
            return (
              <Row
                key={r.key}
                $served={m.served}
                $color={m.color}
                onClick={() => onServe(r.orderId, r.itemIndex, !m.served)}
                title={m.served
                  ? t('floorplan:itemList.tapUnserve', { defaultValue: 'Tap to mark not served' })
                  : t('floorplan:itemList.tapServe', { defaultValue: 'Tap to mark served' })}
              >
                <Dot $color={m.color} />
                <Main>
                  <div className="name">
                    <span className="qty">{r.qty} ×</span>{' '}
                    <span className={m.served ? 'struck' : ''}>{r.name}</span>
                  </div>
                  {r.options && <div className="opts">{r.options}</div>}
                </Main>
                <Right>
                  <div className="loc">{r.loc}</div>
                  <ViewOrder
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (r.isTakeaway) onOpenTakeaway(r.orderId);
                      else if (r.tableNumber) onOpenDineIn(r.tableNumber, r.orderId);
                    }}
                  >
                    {t('floorplan:itemList.viewOrder', { defaultValue: 'View order' })}
                  </ViewOrder>
                </Right>
              </Row>
            );
          })}
        </List>
      )}
    </Wrap>
  );
};

export default ItemListView;
