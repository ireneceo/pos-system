import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { IconButton } from '../UI/TableComponents';
import { OrderDelivery, OrderRule, OrderSchedule, describeRule, intlLocale, weekdayName } from '../../utils/orderCutoff';

/**
 * 판매자 «발주 마감·배송일» 편집기 (2026-10-27 Fable 설계 M-4 — 판매자 3종 + 외부 업체 5곳 공용).
 *
 * 줄마다 ① 요일(7개 = 매일) ② 마감 시각 ③ 배송(안 정해짐 / 당일 / 익일 / N–M일 후 / 매주 X요일).
 * 저장은 바뀔 때 바로(시각·숫자는 칸을 떠날 때) — 배송 지역 편집기와 같은 방식.
 * 검사·정규화·시간대는 서버(utils/orderSchedule.js normalizeScheduleForSave)가 한다 — 여기선 보내기만.
 * readOnly(가입 공급업체를 구매자가 볼 때)면 규칙 문장 목록만 보인다.
 */
interface Props {
  value: OrderSchedule | null;
  /** 규칙 목록을 저장. 빈 목록 = 지움(null). 실패하면 throw. 저장된 값을 돌려주면 시간대 표시가 갱신된다. */
  onCommit?: (schedule: { rules: OrderRule[] } | null) => Promise<OrderSchedule | null | void>;
  readOnly?: boolean;
}

type DeliveryChoice = 'none' | 'same' | 'next' | 'range' | 'weekday';
interface Row { key: string; days: number[]; time: string; choice: DeliveryChoice; min: string; max: string; weekday: number }

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];
const inputStyle: React.CSSProperties = {
  padding: '8px 10px', border: '1px solid #C7CED6', borderRadius: 6, fontSize: 14, boxSizing: 'border-box', background: '#FFFFFF',
};
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 };

function toRow(r: OrderRule, i: number): Row {
  const dv = r.delivery;
  let choice: DeliveryChoice = 'none', min = '1', max = '2', weekday = 6;
  if (dv && dv.kind === 'weekday') { choice = 'weekday'; weekday = dv.weekday; }
  else if (dv && dv.kind === 'after_days') {
    if (dv.min === 0 && dv.max === 0) choice = 'same';
    else if (dv.min === 1 && dv.max === 1) choice = 'next';
    else { choice = 'range'; min = String(dv.min); max = String(dv.max); }
  }
  return { key: `r${i}-${Date.now()}`, days: [...r.days], time: r.time, choice, min, max, weekday };
}

function toRule(r: Row): OrderRule {
  let delivery: OrderDelivery = null;
  if (r.choice === 'same') delivery = { kind: 'after_days', min: 0, max: 0 };
  else if (r.choice === 'next') delivery = { kind: 'after_days', min: 1, max: 1 };
  else if (r.choice === 'range') delivery = { kind: 'after_days', min: Number(r.min) || 0, max: Number(r.max) || 0 };
  else if (r.choice === 'weekday') delivery = { kind: 'weekday', weekday: r.weekday };
  return { days: [...r.days].sort((a, b) => a - b), time: r.time, delivery };
}

const isComplete = (r: Row) => r.days.length > 0 && /^\d{2}:\d{2}$/.test(r.time);

const OrderScheduleEditor: React.FC<Props> = ({ value, onCommit, readOnly }) => {
  const { t, i18n } = useTranslation('common');
  const tt = t as unknown as (k: string, d: string, o?: Record<string, unknown>) => string;
  const locale = intlLocale(i18n.language);
  const [rows, setRows] = useState<Row[]>(() => (value?.rules || []).map(toRow));
  const [tz, setTz] = useState<string | null>(value?.timezone || null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 불러오기가 끝나 값이 들어오면 한 번 채운다(편집 중 덮어쓰지 않게 비어 있을 때만)
  useEffect(() => {
    if (value && rows.length === 0) setRows(value.rules.map(toRow));
    if (value?.timezone) setTz(value.timezone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (readOnly) {
    if (!value || value.rules.length === 0) return null;
    return (
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 13, color: '#0A2540', fontWeight: 600, marginBottom: 4 }}>
          {tt('orderSchedule.title', 'Order cutoff & delivery days')}
        </div>
        <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 6 }}>{tt('orderSchedule.readonlyTitle', 'Set by the supplier')}</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#0A2540' }}>
          {value.rules.map((r, i) => <li key={i}>{describeRule(r, locale, tt)}</li>)}
        </ul>
        <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{tt('orderSchedule.timezoneNote', 'Times are in {{tz}}', { tz: value.timezone })}</div>
      </div>
    );
  }

  const commit = async (next: Row[]) => {
    if (!onCommit) return;
    const complete = next.filter(isComplete);
    setSaving(true); setSaved(false); setError(null);
    try {
      const out = await onCommit(complete.length ? { rules: complete.map(toRule) } : null);
      if (out && out.timezone) setTz(out.timezone);
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || tt('orderSchedule.saveFailed', 'Could not save order cutoffs'));
    } finally {
      setSaving(false);
    }
  };

  const update = (idx: number, patch: Partial<Row>, save = false) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...patch } : r));
    setRows(next);
    setSaved(false);
    if (save) commit(next);
  };
  const toggleDay = (idx: number, d: number) => {
    const r = rows[idx];
    update(idx, { days: r.days.includes(d) ? r.days.filter(x => x !== d) : [...r.days, d] }, true);
  };
  const addRule = () => {
    setRows([...rows, { key: `r-${Date.now()}`, days: [...ALL_DAYS], time: '15:00', choice: 'next', min: '1', max: '2', weekday: 6 }]);
    setSaved(false);
  };
  const removeRule = (idx: number) => {
    const next = rows.filter((_, i) => i !== idx);
    setRows(next);
    commit(next);
  };

  return (
    <div style={{ marginTop: 16 }} data-testid="order-schedule-editor">
      <div style={{ fontSize: 13, color: '#0A2540', fontWeight: 600, marginBottom: 4 }}>
        {tt('orderSchedule.title', 'Order cutoff & delivery days')}
      </div>
      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
        {tt('orderSchedule.help', 'Staff see these when placing orders. Leave empty if the supplier has no fixed cutoff.')}
      </div>

      {rows.map((r, idx) => {
        const everyDay = r.days.length === 7;
        return (
          <div key={r.key} style={{ border: '1px solid #E6EBF1', borderRadius: 8, padding: 12, marginBottom: 10, background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <label style={labelStyle}>{tt('orderSchedule.days', 'Cutoff days')}</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#0A2540', marginRight: 6, cursor: 'pointer' }}>
                    <input type="checkbox" checked={everyDay} onChange={() => update(idx, { days: everyDay ? [] : [...ALL_DAYS] }, true)} />
                    {tt('orderSchedule.everyDay', 'Every day')}
                  </label>
                  {ALL_DAYS.map(d => {
                    const on = r.days.includes(d);
                    return (
                      <button
                        key={d} type="button" aria-pressed={on} onClick={() => toggleDay(idx, d)}
                        style={{
                          minWidth: 44, minHeight: 32, padding: '4px 8px', borderRadius: 16, fontSize: 13, cursor: 'pointer',
                          border: `1px solid ${on ? '#635BFF' : '#C7CED6'}`, background: on ? '#EEF0FF' : '#FFFFFF',
                          color: on ? '#4338CA' : '#4B5563', fontWeight: on ? 600 : 400
                        }}
                      >
                        {weekdayName(d, locale)}
                      </button>
                    );
                  })}
                </div>
              </div>
              <IconButton
                type="button" variant="delete"
                title={tt('orderSchedule.removeRule', 'Remove cutoff')}
                aria-label={tt('orderSchedule.removeRule', 'Remove cutoff')}
                onClick={() => removeRule(idx)}
              >
                ✕
              </IconButton>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 10, alignItems: 'flex-end' }}>
              <div>
                <label style={labelStyle}>{tt('orderSchedule.cutoffTime', 'Cutoff time')}</label>
                <input
                  type="time" style={{ ...inputStyle, width: 130 }} value={r.time}
                  onChange={e => update(idx, { time: e.target.value })}
                  onBlur={() => commit(rows)}
                />
              </div>
              <div>
                <label style={labelStyle}>{tt('orderSchedule.delivery', 'Delivery')}</label>
                <select
                  style={{ ...inputStyle, minWidth: 170 }} value={r.choice}
                  onChange={e => update(idx, { choice: e.target.value as DeliveryChoice }, true)}
                >
                  <option value="none">{tt('orderSchedule.deliveryNone', 'Delivery not fixed')}</option>
                  <option value="same">{tt('orderSchedule.deliverySameDay', 'Same day')}</option>
                  <option value="next">{tt('orderSchedule.deliveryNextDay', 'Next day')}</option>
                  <option value="range">{tt('orderSchedule.deliveryRangeOption', 'Days after cutoff…')}</option>
                  <option value="weekday">{tt('orderSchedule.deliveryWeekdayOption', 'Fixed weekday…')}</option>
                </select>
              </div>
              {r.choice === 'range' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="number" min={0} max={14} style={{ ...inputStyle, width: 64 }} value={r.min}
                    aria-label={tt('orderSchedule.minDays', 'From (days)')}
                    onChange={e => update(idx, { min: e.target.value })} onBlur={() => commit(rows)} />
                  <span style={{ color: '#4B5563' }}>–</span>
                  <input type="number" min={0} max={14} style={{ ...inputStyle, width: 64 }} value={r.max}
                    aria-label={tt('orderSchedule.maxDays', 'To (days)')}
                    onChange={e => update(idx, { max: e.target.value })} onBlur={() => commit(rows)} />
                  <span style={{ fontSize: 13, color: '#4B5563' }}>{tt('orderSchedule.daysAfter', 'days after')}</span>
                </div>
              )}
              {r.choice === 'weekday' && (
                <select
                  style={{ ...inputStyle, minWidth: 130 }} value={r.weekday}
                  aria-label={tt('orderSchedule.deliveryWeekdayOption', 'Fixed weekday…')}
                  onChange={e => update(idx, { weekday: Number(e.target.value) }, true)}
                >
                  {ALL_DAYS.map(d => <option key={d} value={d}>{tt('orderSchedule.deliveryWeekday', 'Every {{weekday}}', { weekday: weekdayName(d, locale, 'long') })}</option>)}
                </select>
              )}
            </div>

            {isComplete(r) && (
              <div style={{ marginTop: 8, fontSize: 12, color: '#4B5563' }}>{describeRule(toRule(r), locale, tt)}</div>
            )}
            {!isComplete(r) && (
              <div style={{ marginTop: 8, fontSize: 12, color: '#B45309' }}>{tt('orderSchedule.incomplete', 'Pick at least one day — this cutoff is saved once it has a day and a time.')}</div>
            )}
          </div>
        );
      })}

      <Button type="button" variant="outline" size="small" onClick={addRule}>
        {tt('orderSchedule.addRule', '+ Add cutoff')}
      </Button>

      <div style={{ marginTop: 8, fontSize: 12, color: '#6B7280' }}>
        {tz ? tt('orderSchedule.timezoneNote', 'Times are in {{tz}}', { tz }) : tt('orderSchedule.timezoneLater', 'Times use your business time zone.')}
        {saving && <span style={{ marginLeft: 8 }}>{t('label.saving', 'Saving…')}</span>}
        {saved && !saving && !error && <span style={{ marginLeft: 8, color: '#059669' }}>✓</span>}
      </div>
      {error && <div style={{ marginTop: 4, fontSize: 12, color: '#DC2626' }}>{error}</div>}
    </div>
  );
};

export default OrderScheduleEditor;
