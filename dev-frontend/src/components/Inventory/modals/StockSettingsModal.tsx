import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup, FormLabel, FormSelect } from '../../UI/Modal';
import { getAuthToken } from '../../../utils/auth';

/**
 * 브랜드 «재고 설정» 한 창 (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-phase2.md §4-1)
 *   Irene: «막을지 안막을지는 설정으로 … 재고관리 관련 설정 어딘가에 같이 묶어서 알기 쉽게»
 *   ① 매장 주문이 남은 재고보다 많을 때: 안내만(기본) / 보내기 막기
 *   ② 아침 재고 알림: 켬(기본) · 시각(브랜드 시간대)
 *   ③ «필요한 것 담기» 에 «곧 부족» 기본 포함
 * 저장 = PUT /api/brands/:brandId/stock-settings (그 사용자 범위 브랜드 전부 · 서버가 그 칸만 바꾼다).
 * Brand Manager 는 읽기만(저장 버튼 없음).
 */
export interface StockSettings {
  short_order_policy: 'warn' | 'block';
  morning_alert: { enabled: boolean; hour: number };
  include_soon_default: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  brandId: number;
  onSaved: (s: StockSettings) => void;
}

const radioRow: React.CSSProperties = { display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', border: '1px solid #C7CED6', borderRadius: 8, cursor: 'pointer' };
const hint: React.CSSProperties = { fontSize: 12, color: '#6B7280', marginTop: 2, lineHeight: 1.45 };

const StockSettingsModal: React.FC<Props> = ({ isOpen, onClose, brandId, onSaved }) => {
  const { t } = useTranslation(['inventory']);
  const [s, setS] = useState<StockSettings | null>(null);
  const [applies, setApplies] = useState<Array<{ id: number; name: string }>>([]);
  const [tz, setTz] = useState('');
  const [canEdit, setCanEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !brandId) return;
    let alive = true;
    setError(null);
    (async () => {
      try {
        const res = await fetch(`/api/brands/${brandId}/stock-settings`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        const j = await res.json();
        if (!alive) return;
        if (!res.ok || !j.success) { setError(j?.message || 'Failed to load'); return; }
        setS(j.data.settings);
        setApplies(j.data.applies_to || []);
        setTz(j.data.timezone || '');
        setCanEdit(!!j.data.can_edit);
      } catch { if (alive) setError('Network error'); }
    })();
    return () => { alive = false; };
  }, [isOpen, brandId]);

  const save = async () => {
    if (!s || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/brands/${brandId}/stock-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(s),
      });
      const j = await res.json();
      if (!res.ok || !j.success) { setError(j?.message || 'Failed to save'); return; }
      onSaved(j.data.settings);
      onClose();
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  };

  const hours = Array.from({ length: 24 }, (_, h) => h);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('stockSettings.title', 'Stock settings')}
      size="medium"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose} disabled={saving}>{t('stockSettings.close', 'Close')}</ModalButton>
          {canEdit && (
            <ModalButton variant="primary" onClick={save} disabled={saving || !s}>
              {saving ? t('stockSettings.saving', 'Saving…') : t('stockSettings.save', 'Save')}
            </ModalButton>
          )}
        </>
      }
    >
      {error && <div style={{ marginBottom: 12, padding: 10, background: '#FEF2F2', border: '1px solid #DC2626', borderRadius: 8, fontSize: 13, color: '#991B1B' }}>{error}</div>}
      {!s ? (
        <div style={{ padding: 24, textAlign: 'center', color: '#6B7280' }}>{t('stockSettings.loading', 'Loading…')}</div>
      ) : (
        <div style={{ display: 'grid', gap: 18 }}>
          {applies.length > 1 && (
            <div style={{ fontSize: 12, color: '#4B5563' }}>
              {t('stockSettings.appliesTo', { defaultValue: 'Applies to: {{names}} (they share the same stock)', names: applies.map(a => a.name).join(', ') })}
            </div>
          )}

          <FormGroup>
            <FormLabel>{t('stockSettings.policyTitle', 'When a store orders more than your available stock')}</FormLabel>
            <div style={{ display: 'grid', gap: 8 }}>
              {(['warn', 'block'] as const).map(p => (
                <label key={p} style={{ ...radioRow, borderColor: s.short_order_policy === p ? '#635BFF' : '#C7CED6', opacity: canEdit ? 1 : 0.8 }}>
                  <input
                    type="radio"
                    name="short_order_policy"
                    checked={s.short_order_policy === p}
                    disabled={!canEdit}
                    onChange={() => setS({ ...s, short_order_policy: p })}
                    style={{ marginTop: 3, accentColor: '#635BFF' }}
                  />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540' }}>
                      {p === 'warn' ? t('stockSettings.warn', 'Warn only (default)') : t('stockSettings.block', 'Block sending')}
                    </div>
                    <div style={hint}>
                      {p === 'warn'
                        ? t('stockSettings.warnHint', 'The order still comes in. Stores see «Out at brand» when ordering, and your incoming orders show «Stock short». Restock to cover it.')
                        : t('stockSettings.blockHint', 'Stores can\'t send an order above what you have left and are asked to reduce the quantity. Turn on only when your stock numbers are accurate (they are estimates until a stock take).')}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </FormGroup>

          <FormGroup>
            <FormLabel>{t('stockSettings.morningTitle', 'Morning stock alert')}</FormLabel>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#0A2540', cursor: canEdit ? 'pointer' : 'default' }}>
              <input
                type="checkbox"
                checked={s.morning_alert.enabled}
                disabled={!canEdit}
                onChange={(e) => setS({ ...s, morning_alert: { ...s.morning_alert, enabled: e.target.checked } })}
                style={{ width: 16, height: 16, accentColor: '#635BFF' }}
              />
              {t('stockSettings.morningOn', 'Send an app notification each morning')}
            </label>
            {s.morning_alert.enabled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                <span style={{ fontSize: 13, color: '#4B5563' }}>{t('stockSettings.at', 'At')}</span>
                <FormSelect
                  value={s.morning_alert.hour}
                  disabled={!canEdit}
                  onChange={(e) => setS({ ...s, morning_alert: { ...s.morning_alert, hour: parseInt(e.target.value, 10) } })}
                  style={{ width: 110 }}
                >
                  {hours.map(h => <option key={h} value={h}>{String(h).padStart(2, '0')}:00</option>)}
                </FormSelect>
                {tz && <span style={{ fontSize: 12, color: '#6B7280' }}>{tz}</span>}
              </div>
            )}
            <div style={hint}>
              {t('stockSettings.morningHint', 'Only when items are out or at their reorder point, once a day, to every manager of this brand. No email. To turn it off just for yourself: Notifications › Low Stock Alert.')}
            </div>
          </FormGroup>

          <FormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#0A2540', cursor: canEdit ? 'pointer' : 'default' }}>
              <input
                type="checkbox"
                checked={s.include_soon_default}
                disabled={!canEdit}
                onChange={(e) => setS({ ...s, include_soon_default: e.target.checked })}
                style={{ width: 16, height: 16, accentColor: '#635BFF' }}
              />
              {t('stockSettings.includeSoon', 'Include items running low soon in «Add what\'s needed» by default')}
            </label>
          </FormGroup>

          <div style={{ fontSize: 12, color: '#6B7280', borderTop: '1px solid #E5E7EB', paddingTop: 10 }}>
            {t('stockSettings.perItemHint', 'Each item\'s reorder number is set in that item\'s settings.')}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default StockSettingsModal;
