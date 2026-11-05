// 판매자 «주문 준비 보드» (2026-11-05 Fable 판정 .claude/fable-verdict-20261105-bg-order-kds.md Ⅱ-3)
//   Irene «레스토랑 키친디스플레이처럼 … 항목별로 준비했다 배송하면 된다 정도로»
//   칸 = 단계, 카드 = 주문, 카드는 가장 덜 끝난 품목 기준 한 칸(boardColumnOf). 주방화면 코드는 가져오지 않는다(🔒).
//   품목마다 «준비함» 체크 → 다 준비되면 «보내기»(기존 보내기 창). 끌어다 놓기 없음(태블릿 실수 방지).
//   자료·창은 IncomingOrdersView 가 내려 준다 — 확인·거절·보내기·운송정보 창은 목록과 같은 것.
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDate, getDateStringInTimezone } from '../../utils/timezone';
import { calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { lineQtyText } from '../../utils/unitConversion';
import { supplierFacingName } from '../../utils/poShare';
import { BOARD_COLUMNS, BoardColumn, boardColumnOf, lineCounts } from './boardColumn';

// 화면이 읽는 칸만(목록 화면의 자료형과 같은 응답)
export interface BoardItem {
  id: number;
  ingredient_id?: number;
  description?: string | null;
  quantity_ordered: number | string;
  unit?: string | null;
  base_quantity?: number | string | null;
  base_unit?: string | null;
  ingredient?: { id: number; name: string; unit: string } | null;
  seller_product_name?: string | null;
  shipped_at?: string | null;
  prepared_at?: string | null;
  is_service?: boolean;
}

export interface BoardOrder {
  id: number;
  po_number: string;
  buyer_name?: string | null;
  buyer?: { name?: string } | null;
  status: string;
  shipped_at?: string | null;
  is_service_only?: boolean;
  unshipped_count?: number;
  unprepared_count?: number;
  items?: BoardItem[];
  notes?: string | null;
  ordered_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  received_at?: string | null;
  [k: string]: any;
}

interface Props {
  tNs: (key: string, fallback?: string, vars?: Record<string, string | number>) => string;
  /** 바뀔 때마다 다시 불러온다(목록 새로고침·실시간 신호) */
  reloadKey: number;
  search: string;
  newPoIds: Set<number>;
  timeZone: string;
  timeAgo: (iso: string | null | undefined) => string;
  onOpenDetail: (row: any) => void;
  onConfirm: (row: any) => void;
  onReject: (row: any) => void;
  onShip: (row: any) => void;
  onEditTracking: (row: any) => void;
  onDeliver: (row: any) => Promise<void>;
  onComplete: (row: any) => Promise<void>;
  /** 준비 표시가 바뀐 뒤 — 통계·배지 새로고침 */
  onChanged: () => void;
}

// 진행 중 상태는 전부, 끝난 상태는 최근 것만 불러와 «오늘» 만 남긴다
const ACTIVE_STATUSES = ['submitted', 'confirmed', 'shipped', 'in_transit'];
const DONE_STATUSES = ['delivered', 'partial_received', 'received'];

const COLUMN_FALLBACK: Record<BoardColumn, string> = {
  new: 'New',
  preparing: 'Preparing',
  ready: 'Ready to ship',
  shipped: 'Shipped',
  done: 'Done today',
};

const IncomingOrdersBoard: React.FC<Props> = ({
  tNs, reloadKey, search, newPoIds, timeZone, timeAgo,
  onOpenDetail, onConfirm, onReject, onShip, onEditTracking, onDeliver, onComplete, onChanged,
}) => {
  const [orders, setOrders] = useState<BoardOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [busyLines, setBusyLines] = useState<Set<number>>(new Set());
  const [busyOrders, setBusyOrders] = useState<Set<number>>(new Set());
  const [doneOpen, setDoneOpen] = useState(false);
  const [lineError, setLineError] = useState<string | null>(null);
  const seq = useRef(0);

  const load = useCallback(async () => {
    const mySeq = ++seq.current;
    try {
      const token = getAuthToken();
      const get = async (status: string, limit: number) => {
        const r = await fetch(`/api/seller-orders?status=${status}&limit=${limit}`, { headers: { Authorization: `Bearer ${token}` } });
        const d = await r.json().catch(() => null);
        if (!r.ok || !d?.success) throw new Error(`load ${status} ${r.status}`);
        return Array.isArray(d.data) ? d.data : [];
      };
      const lists = await Promise.all([
        ...ACTIVE_STATUSES.map(s => get(s, 100)),
        ...DONE_STATUSES.map(s => get(s, 30)),
      ]);
      if (mySeq !== seq.current) return;
      const byId = new Map<number, BoardOrder>();
      lists.flat().forEach((p: any) => byId.set(p.id, { ...p, buyer_name: p.buyer?.name || p.buyer_name || null }));
      setOrders(Array.from(byId.values()));
      setLoadError(false);
    } catch (e) {
      if (mySeq !== seq.current) return;
      console.error('Failed to load order board:', e);
      setLoadError(true);
    } finally {
      if (mySeq === seq.current) setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load, reloadKey]);

  // 오늘(판매자 시간대 — 브라우저 시간 금지)
  const today = useMemo(() => calculatePeriodDateRange('today', timeZone).start, [timeZone, reloadKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const columns = useMemo(() => {
    const term = search.trim().toLowerCase();
    const out: Record<BoardColumn, BoardOrder[]> = { new: [], preparing: [], ready: [], shipped: [], done: [] };
    for (const o of orders) {
      if (term && !((o.buyer_name || '').toLowerCase().includes(term) || (o.po_number || '').toLowerCase().includes(term))) continue;
      const col = boardColumnOf(o);
      if (!col) continue;
      if (col === 'done') {
        const doneAt = o.received_at || o.updated_at;
        if (!doneAt || getDateStringInTimezone(doneAt, timeZone) !== today) continue;
      }
      out[col].push(o);
    }
    // 오래 기다린 주문이 위로(끝 칸은 최근이 위)
    const at = (o: BoardOrder) => new Date(o.ordered_at || o.created_at || 0).getTime();
    (Object.keys(out) as BoardColumn[]).forEach(k => {
      out[k].sort((a, b) => (k === 'done' ? at(b) - at(a) : at(a) - at(b)));
    });
    return out;
  }, [orders, search, timeZone, today]);

  const togglePrepared = async (order: BoardOrder, item: BoardItem) => {
    if (busyLines.has(item.id)) return;   // 중복 누름 막기
    const next = !item.prepared_at;
    setLineError(null);
    setBusyLines(prev => new Set(prev).add(item.id));
    // 낙관적 반영 — 칸 이동까지 바로 보이게
    const stamp = next ? new Date().toISOString() : null;
    setOrders(prev => prev.map(o => {
      if (o.id !== order.id) return o;
      const items = (o.items || []).map(it => (it.id === item.id ? { ...it, prepared_at: stamp } : it));
      const patched = { ...o, items, unprepared_count: undefined };
      return { ...patched, unprepared_count: lineCounts(patched).unprepared };
    }));
    try {
      const token = getAuthToken();
      const r = await fetch(`/api/seller-orders/${order.id}/prepare`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_ids: [item.id], prepared: next }),
      });
      const d = await r.json().catch(() => null);
      if (!r.ok || !d?.success) {
        setLineError(d?.message || tNs('orders.board.prepareFailed', 'Could not update the item. Please try again.'));
        load();
        return;
      }
      const fresh: Array<{ id: number; prepared_at: string | null }> = d.data?.items || [];
      setOrders(prev => prev.map(o => {
        if (o.id !== order.id) return o;
        const items = (o.items || []).map(it => {
          const f = fresh.find(x => x.id === it.id);
          return f ? { ...it, prepared_at: f.prepared_at } : it;
        });
        return { ...o, items, unprepared_count: d.data?.unprepared_count };
      }));
      onChanged();
    } catch (e) {
      console.error(e);
      setLineError(tNs('orders.board.prepareFailed', 'Could not update the item. Please try again.'));
      load();
    } finally {
      setBusyLines(prev => { const s = new Set(prev); s.delete(item.id); return s; });
    }
  };

  const runOrderAction = async (order: BoardOrder, fn: (row: any) => Promise<void>) => {
    if (busyOrders.has(order.id)) return;
    setBusyOrders(prev => new Set(prev).add(order.id));
    try { await fn(order); } finally {
      setBusyOrders(prev => { const s = new Set(prev); s.delete(order.id); return s; });
    }
  };

  const itemName = (it: BoardItem) =>
    it.seller_product_name || supplierFacingName(it.ingredient?.name || it.description || `#${it.ingredient_id ?? it.id}`);

  const renderCard = (o: BoardOrder, col: BoardColumn) => {
    const items = o.items || [];
    const goods = items.filter(it => !it.is_service);
    const shippedN = goods.filter(it => !!it.shipped_at).length;
    const canPrepare = col === 'preparing' || col === 'ready';
    const isNew = newPoIds.has(o.id);
    const busy = busyOrders.has(o.id);
    return (
      <Card key={o.id} $new={isNew} data-testid={`board-card-${o.id}`}>
        <CardHead onClick={() => onOpenDetail(o)} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') onOpenDetail(o); }}>
          <div>
            <PoNo>{o.po_number}</PoNo>
            <Buyer>{o.buyer_name || '—'}</Buyer>
          </div>
          <Ago>{timeAgo(o.ordered_at || o.created_at)}</Ago>
        </CardHead>

        {shippedN > 0 && shippedN < goods.length && (
          <Tag>{tNs('orders.board.partShipped', '{{shipped}} of {{total}} shipped', { shipped: shippedN, total: goods.length })}</Tag>
        )}

        <Lines>
          {items.map(it => {
            const shipped = !!it.shipped_at;
            const checkable = canPrepare && !it.is_service && !shipped;
            const prepared = !!it.prepared_at;
            return (
              <Line key={it.id} $muted={shipped}>
                {checkable ? (
                  <CheckLabel $on={prepared} $busy={busyLines.has(it.id)}>
                    <input
                      type="checkbox"
                      checked={prepared}
                      disabled={busyLines.has(it.id)}
                      onChange={() => togglePrepared(o, it)}
                      aria-label={tNs('orders.board.markPrepared', 'Prepared') as string}
                    />
                    <span className="box">{prepared ? '✓' : ''}</span>
                  </CheckLabel>
                ) : (
                  <Spacer />
                )}
                <LineText>
                  <span className="name">{itemName(it)}</span>
                  <span className="qty">{lineQtyText(it as any, it.quantity_ordered)}</span>
                </LineText>
                <LineState>
                  {it.is_service
                    ? tNs('orders.board.noDelivery', 'No delivery')
                    : shipped
                      ? `${tNs('orders.board.shipped', 'Shipped')} ✓ ${formatDate(it.shipped_at as string, { timeZone })}`
                      : prepared && canPrepare
                        ? tNs('orders.board.prepared', 'Prepared')
                        : ''}
                </LineState>
              </Line>
            );
          })}
        </Lines>

        {!!o.notes && <Note>{o.notes}</Note>}

        <Actions>
          {col === 'new' && (
            <>
              <ThemedButton variant="primary" onClick={() => onConfirm(o)}>{tNs('orders.actions.confirm', 'Confirm')}</ThemedButton>
              <ThemedButton variant="outline" onClick={() => onReject(o)}>{tNs('orders.actions.reject', 'Reject')}</ThemedButton>
            </>
          )}
          {col === 'ready' && o.is_service_only && (
            <ThemedButton variant="primary" disabled={busy} onClick={() => runOrderAction(o, onComplete)}>
              {tNs('brand:products.fulfillment.completeAction', 'Mark complete')}
            </ThemedButton>
          )}
          {col === 'ready' && !o.is_service_only && (
            <ThemedButton variant="primary" onClick={() => onShip(o)}>{tNs('orders.actions.ship', 'Ship')}</ThemedButton>
          )}
          {col === 'shipped' && !o.is_service_only && (
            <>
              <ThemedButton variant="primary" disabled={busy} onClick={() => runOrderAction(o, onDeliver)}>
                {tNs('orders.actions.deliver', 'Delivered')}
              </ThemedButton>
              <ThemedButton variant="outline" onClick={() => onEditTracking(o)} title={tNs('orders.actions.editTracking', 'Edit tracking') as string}>✎</ThemedButton>
            </>
          )}
        </Actions>
      </Card>
    );
  };

  if (loading) return <Empty>{tNs('orders.loading', 'Loading…')}</Empty>;

  return (
    <div data-testid="incoming-orders-board">
      {loadError && <ErrorLine>{tNs('orders.board.loadFailed', 'Could not load the board. It will retry on the next update.')}</ErrorLine>}
      {lineError && <ErrorLine role="alert">{lineError}</ErrorLine>}
      <Board>
        {BOARD_COLUMNS.filter(c => c !== 'done').map(col => (
          <Column key={col} data-testid={`board-col-${col}`}>
            <ColumnHead $col={col}>
              <span>{tNs(`orders.board.col.${col}`, COLUMN_FALLBACK[col])}</span>
              <Count>{columns[col].length}</Count>
            </ColumnHead>
            <ColumnBody>
              {columns[col].length === 0
                ? <ColumnEmpty>{tNs('orders.board.emptyColumn', 'Nothing here')}</ColumnEmpty>
                : columns[col].map(o => renderCard(o, col))}
            </ColumnBody>
          </Column>
        ))}
      </Board>
      <DoneBar>
        <ThemedButton variant="outline" onClick={() => setDoneOpen(v => !v)} data-testid="board-done-toggle">
          {tNs('orders.board.col.done', COLUMN_FALLBACK.done)} ({columns.done.length}) {doneOpen ? '▴' : '▾'}
        </ThemedButton>
        {doneOpen && (
          <DoneList>
            {columns.done.length === 0
              ? <ColumnEmpty>{tNs('orders.board.emptyColumn', 'Nothing here')}</ColumnEmpty>
              : columns.done.map(o => (
                <DoneRow key={o.id} onClick={() => onOpenDetail(o)}>
                  <strong>{o.po_number}</strong>
                  <span>{o.buyer_name || '—'}</span>
                  <span className="muted">{(o.items || []).length} {tNs('orders.board.items', 'items')}</span>
                </DoneRow>
              ))}
          </DoneList>
        )}
      </DoneBar>
    </div>
  );
};

export default IncomingOrdersBoard;

// ── 모양 ──────────────────────────────────────────────
const COL_ACCENT: Record<BoardColumn, string> = {
  new: '#F59E0B',
  preparing: '#3B82F6',
  ready: '#635BFF',
  shipped: '#10B981',
  done: '#9CA3AF',
};

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(220px, 1fr));
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    overflow-x: visible;
  }
`;

const Column = styled.section`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-height: 160px;
`;

const ColumnHead = styled.div<{ $col: BoardColumn }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
  border-top: 4px solid ${p => COL_ACCENT[p.$col]};
  border-radius: 10px 10px 0 0;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
`;

const Count = styled.span`
  min-width: 26px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #EEF2FF;
  color: #4338CA;
  font-size: 12px;
  text-align: center;
`;

const ColumnBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
`;

const ColumnEmpty = styled.div`
  color: #9CA3AF;
  font-size: 13px;
  text-align: center;
  padding: 16px 0;
`;

const Card = styled.article<{ $new?: boolean }>`
  background: ${p => (p.$new ? '#EEF2FF' : '#FFFFFF')};
  border: 1px solid ${p => (p.$new ? '#A5B4FC' : '#E5E7EB')};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
`;

const PoNo = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: #111827;
`;

const Buyer = styled.div`
  font-size: 13px;
  color: #4B5563;
  margin-top: 2px;
  word-break: break-word;
`;

const Ago = styled.span`
  font-size: 12px;
  color: #6B7280;
  white-space: nowrap;
`;

const Tag = styled.span`
  align-self: flex-start;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #A7F3D0;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #F3F4F6;
`;

const Line = styled.div<{ $muted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #F3F4F6;
  opacity: ${p => (p.$muted ? 0.6 : 1)};
`;

const CheckLabel = styled.label<{ $on: boolean; $busy: boolean }>`
  position: relative;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${p => (p.$busy ? 'wait' : 'pointer')};
  input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: inherit;
  }
  .box {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    border: 2px solid ${p => (p.$on ? '#10B981' : '#D1D5DB')};
    background: ${p => (p.$on ? '#10B981' : '#FFFFFF')};
    color: #FFFFFF;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }
  input:focus-visible + .box {
    outline: 2px solid #635BFF;
    outline-offset: 2px;
  }
`;

const Spacer = styled.span`
  flex: 0 0 44px;
`;

const LineText = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  .name { font-size: 14px; color: #111827; word-break: break-word; }
  .qty { font-size: 12px; color: #6B7280; }
`;

const LineState = styled.span`
  flex: 0 0 auto;
  font-size: 12px;
  color: #047857;
  text-align: right;
`;

const Note = styled.div`
  font-size: 12px;
  color: #92400E;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 6px;
  padding: 6px 8px;
  white-space: pre-wrap;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  &:empty { display: none; }
  & > * { min-height: 44px; }
`;

const DoneBar = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const DoneList = styled.div`
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
`;

const DoneRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  padding: 10px 12px;
  border-bottom: 1px solid #F3F4F6;
  cursor: pointer;
  font-size: 13px;
  .muted { color: #6B7280; }
  &:last-child { border-bottom: none; }
`;

const Empty = styled.div`
  color: #6B7280;
  text-align: center;
  padding: 40px 0;
`;

const ErrorLine = styled.div`
  margin: 0 0 10px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  color: #991B1B;
  font-size: 13px;
`;
