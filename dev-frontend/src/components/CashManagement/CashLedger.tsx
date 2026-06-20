import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import { formatDateTime } from '../../utils/timezone';
import DateRangeField from '../Common/DateRangeField';
import { C, Label, Chip } from './cashUi';

// 시재관리 회계 리스트 — 기간필터(오늘/어제/7·30일/전체/직접) + 날짜별 그룹 + 소계/총계.
// 모든 현금 입출금(넣다/뺐다) 내역, 과거 전체. created_at 기준.

interface Props { restaurantId?: string; refreshKey?: number; }

type RangeKey = 'today' | 'yesterday' | 'last7' | 'last30' | 'all' | 'custom';

const CashLedger: React.FC<Props> = ({ restaurantId, refreshKey }) => {
  const { t } = useTranslation();
  const store = useStore();
  const currency = store?.operationSettings?.currency || 'MYR';
  const opSettings = store?.operationSettings;
  const tz = opSettings?.timeZone || 'Asia/Kuala_Lumpur';
  const fc = (n: number) => formatCurrency(Number(n) || 0, currency);

  const [range, setRange] = useState<RangeKey>('today');
  const [custom, setCustom] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [list, setList] = useState<any[]>([]);
  const [summary, setSummary] = useState<{ totalIn: number; totalOut: number; net: number; count: number }>({ totalIn: 0, totalOut: 0, net: 0, count: 0 });
  const [loading, setLoading] = useState(false);

  // 매장 타임존 기준 오늘 YYYY-MM-DD
  const tzDay = useCallback((offsetDays = 0) => {
    const d = new Date(Date.now() + offsetDays * 86400000);
    return d.toLocaleDateString('en-CA', { timeZone: tz });
  }, [tz]);

  const dateBounds = useMemo(() => {
    switch (range) {
      case 'today': return { start: tzDay(0), end: tzDay(0) };
      case 'yesterday': return { start: tzDay(-1), end: tzDay(-1) };
      case 'last7': return { start: tzDay(-6), end: tzDay(0) };
      case 'last30': return { start: tzDay(-29), end: tzDay(0) };
      case 'custom': return { start: custom.start, end: custom.end };
      case 'all': default: return { start: '', end: '' };
    }
  }, [range, custom, tzDay]);

  const fetchList = useCallback(async () => {
    if (!restaurantId) return;
    setLoading(true);
    const qs = new URLSearchParams({ limit: '2000' });
    if (dateBounds.start) qs.set('startDate', dateBounds.start);
    if (dateBounds.end) qs.set('endDate', dateBounds.end);
    try {
      const r = await fetch(`/api/cash/restaurant/${restaurantId}/movements?${qs.toString()}`, { credentials: 'include' });
      const j = await r.json().catch(() => null);
      setList(Array.isArray(j?.data) ? j.data : []);
      setSummary(j?.summary || { totalIn: 0, totalOut: 0, net: 0, count: 0 });
    } catch { setList([]); }
    finally { setLoading(false); }
  }, [restaurantId, dateBounds]);

  useEffect(() => { fetchList(); }, [fetchList, refreshKey]);

  // 날짜별 그룹 (list 는 created_at DESC)
  const groups = useMemo(() => {
    const dKey = (d: any) => { try { return new Date(d).toLocaleDateString('en-CA', { timeZone: tz }); } catch { return ''; } };
    const dLabel = (d: any) => { try { return formatDateTime(d, opSettings, { year: 'numeric', month: 'short', day: 'numeric' }); } catch { return ''; } };
    const g: any[] = [];
    for (const m of list) {
      const k = dKey(m.created_at || m.createdAt);
      let grp = g.find(x => x.k === k);
      if (!grp) { grp = { k, label: dLabel(m.created_at || m.createdAt), items: [], inSum: 0, outSum: 0 }; g.push(grp); }
      grp.items.push(m);
      if (m.type === 'in') grp.inSum += Number(m.amount) || 0; else grp.outSum += Number(m.amount) || 0;
    }
    return g;
  }, [list, tz, opSettings]);

  const tLabel = (d: any) => { try { return formatDateTime(d, opSettings, { hour: '2-digit', minute: '2-digit' }); } catch { return ''; } };

  const RANGES: { k: RangeKey; label: string }[] = [
    { k: 'today', label: t('cash:rangeToday', { defaultValue: 'Today' }) },
    { k: 'yesterday', label: t('cash:rangeYesterday', { defaultValue: 'Yesterday' }) },
    { k: 'last7', label: t('cash:range7', { defaultValue: '7 days' }) },
    { k: 'last30', label: t('cash:range30', { defaultValue: '30 days' }) },
    { k: 'all', label: t('cash:rangeAll', { defaultValue: 'All' }) },
  ];

  return (
    <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, marginTop: 16 }}>
      <Label>{t('cash:movementLog', { defaultValue: 'Cash in / out history' })}</Label>

      {/* 기간 필터 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {RANGES.map(r => <Chip key={r.k} active={range === r.k} onClick={() => setRange(r.k)}>{r.label}</Chip>)}
        <Chip active={range === 'custom'} onClick={() => setRange('custom')}>{t('cash:rangeCustom', { defaultValue: 'Custom' })}</Chip>
      </div>
      {range === 'custom' && (
        <div style={{ marginBottom: 12 }}>
          <DateRangeField
            startDate={custom.start}
            endDate={custom.end}
            onChange={(start: string, end: string) => setCustom({ start, end })}
          />
        </div>
      )}

      {/* 총계 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg, borderRadius: 8, padding: '10px 14px', marginBottom: 8, flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontSize: 12.5, color: C.subtle, fontWeight: 600 }}>{t('cash:total', { defaultValue: 'Total' })} · {summary.count}</span>
        <span style={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: C.match }}>+{fc(summary.totalIn)}</span>{'  '}
          <span style={{ color: C.bad }}>−{fc(summary.totalOut)}</span>{'  '}
          <span style={{ color: C.text }}>· {t('cash:netLabel', { defaultValue: 'Net' })} {fc(summary.net)}</span>
        </span>
      </div>

      {loading ? (
        <div style={{ fontSize: 13, color: C.subtle, padding: '12px 0', textAlign: 'center' }}>{t('common:loading', { defaultValue: 'Loading…' })}</div>
      ) : groups.length === 0 ? (
        <div style={{ fontSize: 13, color: C.subtle, padding: '12px 0' }}>{t('cash:noMovements', { defaultValue: 'No cash in/out records yet.' })}</div>
      ) : (
        <div>
          {groups.map(g => (
            <div key={g.k} style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '6px 2px', borderBottom: `2px solid ${C.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{g.label}</span>
                <span style={{ fontSize: 12, color: C.subtle, fontVariantNumeric: 'tabular-nums' }}>
                  <span style={{ color: C.match }}>+{fc(g.inSum)}</span> / <span style={{ color: C.bad }}>−{fc(g.outSum)}</span> · {t('cash:netLabel', { defaultValue: 'Net' })} {fc(g.inSum - g.outSum)}
                </span>
              </div>
              {g.items.map((m: any) => {
                const isIn = m.type === 'in';
                return (
                  <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, padding: '10px 2px', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                        <span style={{ color: isIn ? C.match : C.bad }}>{isIn ? t('cash:paidIn', { defaultValue: 'Cash in' }) : t('cash:paidOut', { defaultValue: 'Cash out' })}</span>
                        {m.reason ? <span style={{ color: C.subtle, fontWeight: 500 }}> · {m.reason}</span> : null}
                      </div>
                      <div style={{ fontSize: 12, color: C.subtle }}>{tLabel(m.created_at || m.createdAt)}{m.created_by_name ? ` · ${m.created_by_name}` : ''}</div>
                    </div>
                    <span style={{ fontSize: 15, fontWeight: 700, color: isIn ? C.match : C.bad, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{isIn ? '+' : '−'} {fc(m.amount)}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CashLedger;
