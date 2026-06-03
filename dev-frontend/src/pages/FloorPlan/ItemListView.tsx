import React, { useMemo, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { TableStatusInfo } from './types';
import { ItemStatusPill, toDisplayStatus } from './orderItemStatus';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { computePrep, getServedDurationMin, PrepTimerChip } from '../../utils/prepTimer';
import { useAuth } from '../../contexts/AuthContext';
import { playPresetSound } from '../../utils/notificationSound';

/**
 * 아이템별 리스트 (Expo / Runner) — 서빙(홀) 직원용 (2026-06-03).
 * KDS OrderCard + 상세패널 ItemStatusPill 재사용. 세트는 구성품 각각 별도 줄(옵션·상태·서빙 토글).
 * 상단 툴바: 검색 · 카테고리 · 주방 스테이션 필터 + 정렬(주문시간/이름/단계). 우측에 주문시간·서브시간.
 * docs/PRINT_RULES_MATRIX.md §11 / docs/SERVING_VIEW_DESIGN.md §8.
 */

const Wrap = styled.div` flex: 1; min-height: 0; display: flex; flex-direction: column; `;
const Bar = styled.div`
  display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 2px 2px 10px;
  .search { flex: 1 1 200px; min-width: 160px; }
  .search input {
    height: 42px; width: 100%; border: 1px solid var(--pos-border, #C7CED6); border-radius: 8px;
    padding: 0 12px; font-size: 14px; background: var(--pos-surface, #fff); color: var(--pos-text, #0A2540);
    font-family: inherit; box-sizing: border-box;
  }
  .sel { flex: 0 0 auto; width: 180px; }
`;
const Count = styled.div`
  padding: 0 2px 8px; font-size: 13px; color: var(--pos-text-muted, #4B5563);
  strong { color: var(--pos-text, #0A2540); } .rdy { color: #10B981; font-weight: 700; }
`;
const List = styled.div`
  flex: 1; min-height: 0; overflow-y: auto; padding: 2px;
  display: flex; flex-direction: column; gap: 8px;
`;
const Card = styled.div<{ $served?: boolean; $active?: boolean; $color: string }>`
  position: relative; display: flex; align-items: stretch; gap: 0; cursor: pointer;
  background: ${p => (p.$served ? '#F1F4F8' : 'var(--pos-surface, #FFFFFF)')};
  opacity: ${p => (p.$served ? 0.6 : 1)};
  border: 1px solid ${p => (p.$active ? p.$color : 'var(--pos-border, #C7CED6)')};
  box-shadow: ${p => (p.$active ? `inset 0 0 0 3px ${p.$color}` : 'none')};
  border-radius: 8px; transition: box-shadow .15s, border-color .15s;
  &:hover { border-color: ${p => (p.$active ? p.$color : 'var(--pos-brand, #C7D2FE)')}; }
`;
const PillCell = styled.div` display: flex; padding: 10px 0 10px 10px; flex-shrink: 0; width: 132px; box-sizing: border-box; `;
const Body = styled.div` flex: 1; min-width: 0; padding: 10px 14px; display: flex; flex-direction: column; gap: 5px; `;
const Line1 = styled.div`
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  .loc { font-size: 14px; font-weight: 800; color: var(--pos-surface, #fff); background: var(--pos-text, #0A2540);
    border-radius: 6px; padding: 3px 10px; letter-spacing: .3px; }
  .progress { font-size: 12px; font-weight: 700; color: var(--pos-text-muted, #6B7C93);
    background: var(--pos-surface-2, #EDF1F5); border-radius: 6px; padding: 3px 9px; }
  .progress b { color: var(--pos-positive, #10B981); }
  .times { font-size: 12px; color: var(--pos-text-muted, #6B7C93); margin-left: auto; text-align: right; white-space: nowrap; }
  .times .served { color: var(--pos-positive, #10B981); font-weight: 700; }
  .times .ord { color: var(--pos-text-muted, #6B7C93); }
  .times .rel { color: var(--pos-text-muted, #6B7C93); }
  .times .rel.over { color: #EF4444; font-weight: 700; }
`;
const Line2 = styled.div`
  display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;
  .qty { font-size: 18px; font-weight: 800; color: var(--pos-brand-text, #635BFF); }
  .name { font-size: 17px; font-weight: 700; color: var(--pos-text, #0A2540); }
  .name.struck { text-decoration: line-through; color: var(--pos-text-muted, #9CA3AF); }
`;
const SetBadge = styled.span`
  display: inline-block; padding: 3px 9px; border-radius: 6px; font-size: 12px; font-weight: 800; letter-spacing: .4px;
  background: var(--pos-brand, #635BFF); color: #fff;
`;
const StationBadge = styled.span`
  display: inline-block; padding: 3px 9px; border-radius: 6px; font-size: 12px; font-weight: 700;
  background: var(--pos-surface-2, #EDF1F5); color: var(--pos-text-muted, #4B5563);
`;
const Tag = styled.span<{ $set?: boolean }>`
  display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 13px; font-weight: 600;
  background: ${p => p.$set ? 'var(--pos-surface-2, #EDF1F5)' : 'var(--pos-brand-tint, #EDE9FE)'};
  color: ${p => p.$set ? 'var(--pos-text-muted, #4B5563)' : 'var(--pos-brand-text, #6D28D9)'};
`;
const PillLines = styled.span` display: flex; flex-direction: column; align-items: center; gap: 1px; line-height: 1.2; `;
const Empty = styled.div` flex: 1; display: flex; align-items: center; justify-content: center; color: var(--pos-text-muted, #6B7C93); font-size: 15px; `;

const SORT_ORDER: Record<string, number> = { ready: 0, cooking: 1, queued: 2, served: 3 };

interface FlatRow {
  key: string; orderId: number; itemIndex: number; compIndex: number | null;
  name: string; qty: number; opt: string[]; setName: string | null;
  status: string; loc: string; isTakeaway: boolean; tableNumber: string | null;
  orderTime: string | null; servedAt: string | null; category: string; stationId: string; stationName: string;
  servedCount: number; totalCount: number; setServed: number; setTotal: number;
}

interface ItemListViewProps {
  dineInOrders: TableStatusInfo[];
  takeawayOrders: any[];
  activeOrderId?: number | null;
  categoryByName?: Record<string, string>;
  stationById?: Record<string, string>;
  categories?: string[];
  stations?: { id: string; name: string }[];
  timezone?: string;
  prepMinutes?: number;
  prepTracking?: boolean;
  prepPerItem?: number;
  prepThreshold?: number;
  audioEnabled?: boolean;
  onServe: (orderId: number, itemIndex: number, compIndex: number | null, makeServed: boolean) => void;
  onOpenDineIn: (tableNumber: string, orderId: number) => void;
  onOpenTakeaway: (orderId: number) => void;
}

const optList = (x: any): string[] => (Array.isArray(x.options) ? x.options : []).map((o: any) => typeof o === 'string' ? o : (o?.name || '')).filter(Boolean);

const ItemListView: React.FC<ItemListViewProps> = ({ dineInOrders, takeawayOrders, activeOrderId, categoryByName = {}, stationById = {}, categories = [], stations = [], timezone, prepMinutes = 15, prepTracking = false, prepPerItem = 10, prepThreshold = 80, audioEnabled = true, onServe, onOpenDineIn, onOpenTakeaway }) => {
  const { t } = useTranslation(['floorplan', 'common']);
  const { hasPermission } = useAuth();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [stationFilter, setStationFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'time' | 'name' | 'stage'>('time');

  // 상대 시간("몇 분 전")이 살아 움직이도록 30초마다 갱신.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 30000); return () => clearInterval(id); }, []);

  const fmtTime = (iso: string | null): string => {
    if (!iso) return '';
    try { return new Date(iso).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: timezone || undefined }); }
    catch { return ''; }
  };

  // 주문 후 경과 시간 → "3m ago" / "1h 20m ago". mins 도 같이 반환(준비시간 초과 판정용).
  const ago = (iso: string | null): { label: string; mins: number } | null => {
    if (!iso) return null;
    const ms = now - new Date(iso).getTime();
    if (isNaN(ms) || ms < 0) return null;
    const mins = Math.floor(ms / 60000);
    if (mins < 1) return { label: t('floorplan:itemList.justNow', { defaultValue: 'just now' }), mins: 0 };
    if (mins < 60) return { label: t('floorplan:itemList.minAgo', { defaultValue: '{{n}}m ago', n: mins }), mins };
    const h = Math.floor(mins / 60), m = mins % 60;
    return { label: t('floorplan:itemList.hrAgo', { defaultValue: '{{h}}h {{m}}m ago', h, m }), mins };
  };

  const rows = useMemo<FlatRow[]>(() => {
    const out: FlatRow[] = [];
    const setComps = (item: any): any[] | null => (Array.isArray(item.set_components) && item.set_components.length ? item.set_components
      : (item.is_set_menu && Array.isArray(item.set_items) && item.set_items.length ? item.set_items : null));
    const push = (order: any, loc: string, isTakeaway: boolean, tableNumber: string | null) => {
      const status = String(order.orderStatus || order.status || '');
      if (status === 'cancelled' || status === 'completed') return;
      const items = order.orderItems || order.order_items || [];
      const arr = Array.isArray(items) ? items : [];
      const oid = order.orderId || order.id;
      const orderTime = order.orderCreatedAt || order.createdAt || order.order_date || null;
      let totalCount = 0, servedCount = 0;
      arr.forEach((it: any) => {
        const comps = setComps(it);
        if (comps) { totalCount += comps.length; servedCount += comps.filter((c: any) => toDisplayStatus(String(c.status || it.status || status)) === 'served').length; }
        else { totalCount += 1; if (toDisplayStatus(String(it.status || status)) === 'served') servedCount += 1; }
      });
      const meta = (name: string, it: any) => {
        const sid = it.kitchen_station_id != null ? String(it.kitchen_station_id) : '';
        return { category: categoryByName[name] || '', stationId: sid, stationName: sid ? (stationById[sid] || '') : '' };
      };
      arr.forEach((item: any, idx: number) => {
        const comps = setComps(item);
        const baseName = item.menuItem?.name || item.name || 'Item';
        if (comps) {
          const setTotal = comps.length;
          const setServed = comps.filter((c: any) => toDisplayStatus(String(c.status || item.status || status)) === 'served').length;
          comps.forEach((c: any, ci: number) => {
            const m = meta(c.name, c.kitchen_station_id != null ? c : item);
            out.push({ key: `${oid}-${idx}-${ci}`, orderId: oid, itemIndex: idx, compIndex: ci,
              name: c.name || 'Item', qty: (c.qty || c.quantity || 1) * (item.quantity || 1), opt: optList(c), setName: baseName,
              status: String(c.status || item.status || status || 'pending'), loc, isTakeaway, tableNumber,
              orderTime, servedAt: c.served_at || null, ...m, servedCount, totalCount, setServed, setTotal });
          });
        } else {
          const m = meta(baseName, item);
          out.push({ key: `${oid}-${idx}`, orderId: oid, itemIndex: idx, compIndex: null,
            name: baseName, qty: item.quantity || 1, opt: optList(item), setName: null,
            status: String(item.status || status || 'pending'), loc, isTakeaway, tableNumber,
            orderTime, servedAt: item.served_at || null, ...m, servedCount, totalCount, setServed: 0, setTotal: 0 });
        }
      });
    };
    dineInOrders.forEach((o: any) => {
      const tnum = o.tableNumber != null ? String(o.tableNumber) : null;
      const tlabel = o.tableLabel || (tnum ? `${t('floorplan:itemList.table', { defaultValue: 'TABLE' })} ${tnum}` : t('floorplan:itemList.dineIn', { defaultValue: 'DINE-IN' }));
      push(o, tlabel, false, tnum);
    });
    takeawayOrders.forEach((o: any) => {
      const pager = o.pager_number || o.pagerNumber;
      push(o, pager ? `${t('floorplan:itemList.pager', { defaultValue: 'PAGER' })} ${pager}` : t('floorplan:itemList.takeaway', { defaultValue: 'TAKEAWAY' }), true, null);
    });
    return out;
  }, [dineInOrders, takeawayOrders, t, categoryByName, stationById]);

  // 2026-06-03: 서빙(홀) 직원 'ready' 진입 알림음 (1회). 서브권한(access_serving) 만 —
  // POS 권한만 있는 카운터 직원 화면에선 울리지 않음(소음·혼선 방지). 진입 직후 기존
  // ready 는 안 울리게 첫 렌더는 시드만. 주방 KDS 와 같은 notificationSound.
  const prevReadyRef = useRef<Set<string> | null>(null);
  useEffect(() => {
    const readyKeys = new Set(rows.filter(r => toDisplayStatus(r.status) === 'ready').map(r => r.key));
    const prev = prevReadyRef.current;
    prevReadyRef.current = readyKeys;
    if (prev === null) return;                      // 첫 렌더 — 시드만
    if (audioEnabled === false) return;             // 스피커 토글 OFF
    if (!hasPermission('access_serving')) return;   // 서브권한만 소리
    let hasNew = false;
    readyKeys.forEach(k => { if (!prev.has(k)) hasNew = true; });
    if (hasNew) { try { playPresetSound('bell'); } catch {} }
  }, [rows, hasPermission, audioEnabled]);

  const view = useMemo(() => {
    const q = search.trim().toLowerCase();
    let r = rows.filter(x => {
      if (q && !(`${x.name} ${x.setName || ''} ${x.loc} ${x.opt.join(' ')}`.toLowerCase().includes(q))) return false;
      if (catFilter !== 'all' && x.category !== catFilter) return false;
      if (stationFilter !== 'all' && x.stationId !== stationFilter) return false;
      return true;
    });
    r = r.slice().sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'stage') return (SORT_ORDER[toDisplayStatus(a.status)] - SORT_ORDER[toDisplayStatus(b.status)]) || ((a.orderTime || '') < (b.orderTime || '') ? -1 : 1);
      // time (default) — 오래된 주문 먼저, served 는 아래로
      const sd = (toDisplayStatus(a.status) === 'served' ? 1 : 0) - (toDisplayStatus(b.status) === 'served' ? 1 : 0);
      if (sd !== 0) return sd;
      return (a.orderTime || '') < (b.orderTime || '') ? -1 : (a.orderTime || '') > (b.orderTime || '') ? 1 : 0;
    });
    return r;
  }, [rows, search, catFilter, stationFilter, sortBy]);

  const activeCount = rows.filter(r => toDisplayStatus(r.status) !== 'served').length;
  const readyCount = rows.filter(r => toDisplayStatus(r.status) === 'ready').length;
  const openPanel = (r: FlatRow) => { if (r.isTakeaway) onOpenTakeaway(r.orderId); else if (r.tableNumber) onOpenDineIn(r.tableNumber, r.orderId); };

  return (
    <Wrap>
      <Bar>
        <div className="search">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t('floorplan:itemList.search', { defaultValue: 'Search item / table' })} />
        </div>
        {categories.length > 0 && (
          <div className="sel">
            <SearchableSelect
              allowClear={false}
              value={catFilter}
              onChange={v => setCatFilter(v ? String(v) : 'all')}
              placeholder={t('floorplan:itemList.allCategories', { defaultValue: 'All categories' })}
              options={[{ value: 'all', label: t('floorplan:itemList.allCategories', { defaultValue: 'All categories' }) }, ...categories.map(c => ({ value: String(c), label: c }))]}
            />
          </div>
        )}
        {stations.length > 0 && (
          <div className="sel">
            <SearchableSelect
              allowClear={false}
              value={stationFilter}
              onChange={v => setStationFilter(v ? String(v) : 'all')}
              placeholder={t('floorplan:itemList.allStations', { defaultValue: 'All stations' })}
              options={[{ value: 'all', label: t('floorplan:itemList.allStations', { defaultValue: 'All stations' }) }, ...stations.map(s => ({ value: String(s.id), label: s.name }))]}
            />
          </div>
        )}
        <div className="sel">
          <SearchableSelect
            allowClear={false}
            value={sortBy}
            onChange={v => setSortBy((v as any) || 'time')}
            placeholder={t('floorplan:itemList.sortTime', { defaultValue: 'Sort: Order time' })}
            options={[
              { value: 'time', label: t('floorplan:itemList.sortTime', { defaultValue: 'Sort: Order time' }) },
              { value: 'name', label: t('floorplan:itemList.sortName', { defaultValue: 'Sort: Item name' }) },
              { value: 'stage', label: t('floorplan:itemList.sortStage', { defaultValue: 'Sort: Stage' }) },
            ]}
          />
        </div>
      </Bar>
      <Count>
        <strong>{activeCount}</strong> {t('floorplan:itemList.active', { defaultValue: 'active' })}
        {readyCount > 0 && <> · <span className="rdy">{readyCount} {t('floorplan:itemList.ready', { defaultValue: 'ready' })}</span></>}
        {view.length !== rows.length && <> · {t('floorplan:itemList.showing', { defaultValue: 'showing' })} {view.length}</>}
      </Count>
      {view.length === 0 ? (
        <Empty>{t('floorplan:itemList.empty', { defaultValue: 'No active items' })}</Empty>
      ) : (
        <List>
          {view.map(r => {
            const ds = toDisplayStatus(r.status);
            const isServed = ds === 'served';
            // KDS 색상과 동일: 대기 노랑 / 조리중 파랑 / 준비됨·서빙됨 초록
            const statusColor = ds === 'queued' ? '#FBBF24' : ds === 'cooking' ? '#2563EB' : ds === 'ready' ? '#34D399' : '#059669';
            const badgeLabel = t(`floorplan:tableDetailPanel.itemStatus.${ds}`);
            return (
              <Card key={r.key} $served={isServed} $color={statusColor}
                $active={activeOrderId != null && r.orderId === activeOrderId}
                onClick={() => openPanel(r)} title={t('floorplan:itemList.tapOpen', { defaultValue: 'Open order' })}>
                <PillCell>
                  <ItemStatusPill type="button" $status={ds} $clickable $lg
                    onClick={(e) => { e.stopPropagation(); onServe(r.orderId, r.itemIndex, r.compIndex, !isServed); }}
                    title={isServed ? t('floorplan:tableDetailPanel.itemStatus.unmarkServed') : t('floorplan:tableDetailPanel.itemStatus.markServed')}>
                    <PillLines>
                      <span>{badgeLabel}</span>
                      {!isServed && <span>{t('common:itemServe.serveHint', { defaultValue: 'Serve' })}</span>}
                    </PillLines>
                  </ItemStatusPill>
                </PillCell>
                <Body>
                  <Line1>
                    <span className="loc">{r.loc}</span>
                    {r.totalCount > 1 && <span className="progress"><b>{r.servedCount}</b>/{r.totalCount} {t('floorplan:itemList.servedLabel', { defaultValue: 'served' })}</span>}
                    {r.setName && <SetBadge>{t('floorplan:itemList.setBadge', { defaultValue: 'SET' })} {r.setServed}/{r.setTotal}</SetBadge>}
                    {r.stationName && <StationBadge>{r.stationName}</StationBadge>}
                    <span className="times">
                      {isServed && r.servedAt ? (
                        <>
                          <span className="served">{t('floorplan:itemList.served', { defaultValue: 'served' })} {fmtTime(r.servedAt)}</span>
                          {(() => { const dur = getServedDurationMin(r.orderTime, r.servedAt); return dur != null ? <span className="ord"> · {t('floorplan:itemList.took', { defaultValue: '{{n}}m', n: dur })}</span> : (r.orderTime ? <span className="ord"> · {fmtTime(r.orderTime)}</span> : null); })()}
                        </>
                      ) : prepTracking ? (
                        <>
                          {(() => { const p = computePrep(r.orderTime, prepPerItem, prepThreshold, now); return p ? <PrepTimerChip prep={p} /> : null; })()}
                          {r.orderTime && <span className="ord"> · {fmtTime(r.orderTime)}</span>}
                        </>
                      ) : (
                        <>
                          {(() => { const a = ago(r.orderTime); return a ? <span className="rel">{a.label}</span> : null; })()}
                          {r.orderTime && <span className="ord"> · {fmtTime(r.orderTime)}</span>}
                        </>
                      )}
                    </span>
                  </Line1>
                  <Line2>
                    <span className="qty">{r.qty} ×</span>
                    <span className={`name${isServed ? ' struck' : ''}`}>{r.name}</span>
                    {r.setName && <Tag $set>{r.setName}</Tag>}
                    {r.opt.map((o, i) => <Tag key={`o${i}`}>{o}</Tag>)}
                  </Line2>
                </Body>
              </Card>
            );
          })}
        </List>
      )}
    </Wrap>
  );
};

export default ItemListView;
