import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { IconButton } from '../UI/TableComponents';
import { formatCurrency } from '../../utils/currency';
import { MY_STATES, DeliveryZone, isZoneComplete, zonesForSave } from '../../utils/deliveryZones';

/**
 * 판매자 «배송 지역» 편집기 (2026-10-07 Fable 판정 — 브랜드·푸드코트·가입 공급업체 설정 3곳 공용).
 *
 * 줄마다 지역 이름 · 그 지역 배송비 · 포함 주(州). 매장 주소의 주로 시스템이 지역을 자동으로 고른다.
 * 같은 주는 한 지역에만(다른 지역이 가진 주는 체크 불가). 무료배송 기준은 판매자당 하나(위 칸).
 * 저장은 칸을 떠날 때·체크할 때 바로 — 완성된 줄(이름·배송비·주 1개 이상)만 보낸다.
 */
interface Props {
  zones: DeliveryZone[];
  onChange: (zones: DeliveryZone[]) => void;
  /** 완성된 줄만 담아 저장. 실패하면 throw(메시지를 화면에 보인다). */
  onCommit: (zones: ReturnType<typeof zonesForSave>) => Promise<void>;
  /** 판매자 기본 배송비(«그 미만이면 배송비») — 지역에 안 맞는 매장에 쓰인다. null = 미설정 */
  defaultFee: number | null;
  currency?: string;
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', border: '1px solid #C7CED6', borderRadius: 6, fontSize: 14, boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, color: '#4B5563', marginBottom: 4 };

const DeliveryZonesEditor: React.FC<Props> = ({ zones, onChange, onCommit, defaultFee, currency = 'MYR' }) => {
  const { t } = useTranslation('common');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const commit = async (next: DeliveryZone[]) => {
    setSaving(true); setSaved(false); setError(null);
    try {
      await onCommit(zonesForSave(next));
      setSaved(true);
    } catch (e: any) {
      setError(e?.message || t('deliveryZones.saveFailed', 'Could not save delivery zones'));
    } finally {
      setSaving(false);
    }
  };

  const update = (idx: number, patch: Partial<DeliveryZone>, save = false) => {
    const next = zones.map((z, i) => (i === idx ? { ...z, ...patch } : z));
    onChange(next);
    setSaved(false);
    if (save) commit(next);
  };

  const ownerOf = (state: string, exceptIdx: number) =>
    zones.find((z, i) => i !== exceptIdx && z.states.includes(state));

  const addZone = () => {
    onChange([...zones, { id: `zone-${Date.now()}`, name: '', fee: '', states: [] }]);
    setSaved(false);
  };

  const removeZone = (idx: number) => {
    const next = zones.filter((_, i) => i !== idx);
    onChange(next);
    commit(next);
  };

  const money = (n: number) => formatCurrency(n, currency);
  const hasIncomplete = zones.some(z => !isZoneComplete(z));

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 13, color: '#0A2540', fontWeight: 600, marginBottom: 4 }}>
        {t('deliveryZones.title', 'Delivery zones')}
      </div>
      <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
        {t('deliveryZones.hint', 'Set a different delivery fee per zone. The zone is picked automatically from the store address state. The free-delivery amount above applies to every zone.')}
      </div>

      {zones.map((z, idx) => (
        <div key={z.id} style={{ border: '1px solid #E6EBF1', borderRadius: 8, padding: 12, marginBottom: 10, background: '#FFFFFF' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr) 32px', gap: 10, alignItems: 'end' }}>
            <div>
              <label style={labelStyle}>{t('deliveryZones.name', 'Zone name')}</label>
              <input
                type="text" maxLength={60} style={inputStyle}
                placeholder={t('deliveryZones.namePlaceholder', 'e.g. Klang Valley') as string}
                value={z.name}
                onChange={e => update(idx, { name: e.target.value })}
                onBlur={() => commit(zones)}
              />
            </div>
            <div>
              <label style={labelStyle}>{t('deliveryZones.fee', 'Delivery fee')}</label>
              <input
                type="number" min="0" step="0.01" style={inputStyle} placeholder="10"
                value={z.fee}
                onChange={e => update(idx, { fee: e.target.value })}
                onBlur={() => commit(zones)}
              />
            </div>
            <IconButton
              type="button" variant="delete"
              title={t('deliveryZones.remove', 'Remove zone') as string}
              aria-label={t('deliveryZones.remove', 'Remove zone') as string}
              onClick={() => removeZone(idx)}
            >
              ✕
            </IconButton>
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={labelStyle}>{t('deliveryZones.states', 'States in this zone')}</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '4px 12px' }}>
              {MY_STATES.map(s => {
                const other = ownerOf(s, idx);
                const checked = z.states.includes(s);
                return (
                  <label
                    key={s}
                    title={other ? t('deliveryZones.stateTaken', 'Already in zone «{{zone}}»', { zone: other.name || '—' }) as string : undefined}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: other ? '#9CA3AF' : '#0A2540', cursor: other ? 'not-allowed' : 'pointer' }}
                  >
                    <input
                      type="checkbox" checked={checked} disabled={!!other}
                      onChange={() => update(idx, { states: checked ? z.states.filter(x => x !== s) : [...z.states, s] }, true)}
                    />
                    {s}
                  </label>
                );
              })}
            </div>
          </div>

          <div style={{ marginTop: 10 }}>
            <label style={labelStyle}>{t('deliveryZones.description', 'Note (optional)')}</label>
            <input
              type="text" maxLength={200} style={inputStyle}
              placeholder={t('deliveryZones.descriptionPlaceholder', 'e.g. Delivered Tue · Fri') as string}
              value={z.description || ''}
              onChange={e => update(idx, { description: e.target.value })}
              onBlur={() => commit(zones)}
            />
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" size="small" onClick={addZone}>
        {t('deliveryZones.add', '+ Add delivery zone')}
      </Button>

      <div style={{ marginTop: 10, fontSize: 13, color: '#4B5563' }}>
        {defaultFee === null
          ? t('deliveryZones.otherUnset', 'Other areas → delivery fee not set')
          : t('deliveryZones.other', 'Other areas → default delivery fee {{fee}}', { fee: money(defaultFee) })}
        {saving && <span style={{ marginLeft: 8, color: '#6B7280' }}>{t('label.saving', 'Saving…')}</span>}
        {saved && !saving && !error && <span style={{ marginLeft: 8, color: '#059669' }}>✓</span>}
      </div>
      {hasIncomplete && (
        <div style={{ marginTop: 4, fontSize: 12, color: '#B45309' }}>
          {t('deliveryZones.incomplete', 'A zone is saved once it has a name, a fee and at least one state.')}
        </div>
      )}
      {error && <div style={{ marginTop: 4, fontSize: 12, color: '#DC2626' }}>{error}</div>}
    </div>
  );
};

export default DeliveryZonesEditor;
