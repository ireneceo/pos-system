import React from 'react';
import { useTranslation } from 'react-i18next';
import DateField from '../../components/Common/DateField';

/**
 * Per-menu-item availability schedule (events). Mirrors the category schedule
 * shape and is evaluated by the backend's utils/availabilitySchedule, combined
 * (AND) with the category schedule. null = always available.
 */
export interface ItemSchedule {
  start_time?: string;
  end_time?: string;
  days?: number[];               // JS getDay() 0=Sun; empty = every day
  start_date?: string | null;
  end_date?: string | null;
  display?: 'hide' | 'disable';  // how to show when off-schedule
}

interface Props {
  value?: ItemSchedule | null;
  onChange: (v: ItemSchedule | null) => void;
  /**
   * List/embedded mode (e.g. Settings > Item Time Restrictions): always render the
   * schedule fields with no enable checkbox. The host provides its own add/remove,
   * so `value` is expected to be a schedule object (never null) here.
   */
  hideToggle?: boolean;
}

const labelStyle: React.CSSProperties = { fontSize: '12px', fontWeight: 600, color: '#4B5563', marginBottom: '4px' };
// maxWidth/minWidth/boxSizing guarantee the field never exceeds its container —
// native <input type="time"> (12-hour "09:00 AM" + clock icon) has a wide intrinsic
// size that could otherwise spill past a narrow card on the store screen.
const inputStyle: React.CSSProperties = { width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box', display: 'block', padding: '10px 12px', border: '1px solid #C7CED6', borderRadius: '8px', fontSize: '14px', background: '#FFFFFF' };

const ItemScheduleEditor: React.FC<Props> = ({ value, onChange, hideToggle }) => {
  const { t } = useTranslation();
  const enabled = hideToggle ? true : !!value;
  const v: ItemSchedule = value || {};
  const update = (patch: Partial<ItemSchedule>) => onChange({ ...v, ...patch });
  const dayNames = t('menu:menuManagementPage.weekdayShortList', 'Su,Mo,Tu,We,Th,Fr,Sa').split(',');

  const panel = (
        <div style={{ marginTop: hideToggle ? 0 : '10px', padding: '12px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #C7CED6' }}>
          <div style={{ display: 'flex', gap: hideToggle ? '10px' : '12px', flexDirection: hideToggle ? 'column' : 'row' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={labelStyle}>{t('menu:menuManagementPage.availableFrom', 'Available from')}</div>
              <input type="time" value={v.start_time || ''} onChange={(e) => update({ start_time: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={labelStyle}>{t('menu:menuManagementPage.availableUntil', 'Available until')}</div>
              <input type="time" value={v.end_time || ''} onChange={(e) => update({ end_time: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <div style={labelStyle}>{t('menu:menuManagementPage.days', 'Days')}</div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[0, 1, 2, 3, 4, 5, 6].map(d => {
                const days = Array.isArray(v.days) ? v.days : [];
                const on = days.includes(d);
                return (
                  <button key={d} type="button"
                    onClick={() => {
                      const cur = Array.isArray(v.days) ? v.days : [];
                      const next = cur.includes(d) ? cur.filter(x => x !== d) : [...cur, d].sort((a, b) => a - b);
                      update({ days: next });
                    }}
                    style={{ width: '42px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
                      border: on ? '1px solid #635BFF' : '1px solid #C7CED6', background: on ? '#635BFF' : '#FFFFFF', color: on ? '#FFFFFF' : '#4B5563' }}>
                    {dayNames[d]}
                  </button>
                );
              })}
            </div>
            {(!v.days || v.days.length === 0) && (
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>{t('menu:menuManagementPage.everyDay', 'Every day')}</div>
            )}
          </div>

          <div style={{ marginTop: '10px', display: 'flex', gap: hideToggle ? '10px' : '12px', flexDirection: hideToggle ? 'column' : 'row' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={labelStyle}>{t('menu:menuManagementPage.eventStart', 'Event start (optional)')}</div>
              <DateField value={v.start_date || ''} placeholder={t('menu:menuManagementPage.noDateLimit', 'No limit')} onChange={(d) => update({ start_date: d || null })} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={labelStyle}>{t('menu:menuManagementPage.eventEnd', 'Event end (optional)')}</div>
              <DateField value={v.end_date || ''} placeholder={t('menu:menuManagementPage.noDateLimit', 'No limit')} onChange={(d) => update({ end_date: d || null })} />
            </div>
          </div>

          <div style={{ marginTop: '10px' }}>
            <div style={labelStyle}>{t('menu:menuManagementPage.whenOffSchedule', 'When off-schedule')}</div>
            <select value={v.display || 'hide'} onChange={(e) => update({ display: e.target.value as 'hide' | 'disable' })} style={inputStyle}>
              <option value="hide">{t('menu:menuManagementPage.offScheduleHide', 'Hide from menu')}</option>
              <option value="disable">{t('menu:menuManagementPage.offScheduleDisable', 'Show as unavailable')}</option>
            </select>
          </div>
        </div>
  );

  if (hideToggle) return panel;

  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <input type="checkbox" checked={enabled}
          onChange={(e) => onChange(e.target.checked ? { start_time: '09:00', end_time: '22:00', days: [], display: 'hide' } : null)} />
        <span style={{ fontSize: '14px', color: '#0A2540', fontWeight: 500 }}>{t('menu:menuManagementPage.scheduleAvailability', 'Schedule availability (for events)')}</span>
      </label>
      {enabled && panel}
    </div>
  );
};

export default ItemScheduleEditor;
