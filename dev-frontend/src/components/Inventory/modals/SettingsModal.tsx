import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import { InfoBox } from '../styles';
import { IngredientStock, SettingsForm } from '../types';
import { SuggestionRow } from '../hooks/useBulkOrder';
import { formatStock } from '../utils';
import VerdictBadge from '../VerdictBadge';
import { StockVerdict } from '../stockVerdict';

/**
 * 품목 «발주 설정» 창 (2026-11-10 Fable 설계 .claude/fable-design-20261110-stock-simple-reorder.md §2-7)
 *   Irene «뭐가 이렇게 항목이 쓸데없이 많아? … 그냥 재고 몇 개 이하면 발주하는 거»
 *   보이는 칸 2개: ① 이 수량 이하면 발주(min_stock) ② 한 번에 최소 발주량(min_order).
 *   리드타임 · 여유분 % · 하루 사용량 직접 입력은 «자동 계산에 쓰는 값» 으로 접어 둔다(기본 닫힘).
 */
interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredient: IngredientStock | null;
  form: SettingsForm;
  onFormChange: (form: SettingsForm) => void;
  saving: boolean;
  onSave: () => void;
  /** 발주 전망 줄(있으면 측정 사용량·출처를 그것으로) */
  sugg?: SuggestionRow;
}

const help: React.CSSProperties = { fontSize: 12, color: '#4B5563', marginTop: 4, lineHeight: 1.45 };

const SettingsModal: React.FC<Props> = ({ isOpen, onClose, ingredient, form, onFormChange, saving, onSave, sugg }) => {
  const { t } = useTranslation(['inventory']);
  const [showAuto, setShowAuto] = useState(false);
  React.useEffect(() => { if (isOpen) setShowAuto(false); }, [isOpen, ingredient?.id]);

  if (!ingredient) return null;
  const unit = ingredient.unit || '';
  const stock = Number(ingredient.current_stock) || 0;
  const level = parseFloat(form.min_stock) || 0;
  const daily = sugg && sugg.daily_usage !== undefined ? Number(sugg.daily_usage) || 0 : (parseFloat(String(ingredient.avg_daily_usage)) || 0);
  const fromLedger = sugg ? sugg.usage_source === 'ledger' : daily > 0;
  const lead = parseInt(form.lead_time_days, 10) > 0 ? parseInt(form.lead_time_days, 10) : 2;
  const bufferPct = form.safety_stock_percent.trim() !== '' ? (parseFloat(form.safety_stock_percent) || 0) : 20;
  const suggestLevel = Math.ceil(daily * lead * (1 + bufferPct / 100));
  // 미리보기 — 입력한 숫자로 목록에 어떻게 보일지. 서버 reorderMath.classify 와 같은 순서(Fable 게이트 후속 2026-11-10):
  //   약속한 양 초과 → 재고 없음 · 기준 없음 · 가용 ≤ 0 → 재고 없음 · 가용+오는 중 ≤ 기준 → 지금 발주 · 7일 안 기준 도달 → 곧 부족 · 충분
  const committed = sugg ? Number(sugg.committed) || 0 : 0;
  const available = sugg && sugg.available !== undefined ? Number(sugg.available) : stock - committed;
  const onOrder = sugg && sugg.on_order !== undefined ? Number(sugg.on_order) || 0 : Number(ingredient.on_order_quantity) || 0;
  const point = level > 0 ? level : daily * lead * (1 + bufferPct / 100);
  const preview: StockVerdict =
    committed > 0 && available < 0 ? 'out'
      : !(daily > 0 || level > 0) ? 'no_basis'
      : available <= 0 ? 'out'
      : available + onOrder <= point ? 'order_now'
      : daily > 0 && available + onOrder <= point + daily * 7 ? 'soon'
      : 'ok';
  const previewDays = preview === 'soon' && daily > 0 ? Math.round(((available + onOrder) / daily) * 10) / 10 : null;
  const showRecommend = daily > 0 && level > 0 && level < daily * lead;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('reorderSettings.title', { defaultValue: 'Reorder settings: {{name}}', name: ingredient.name })}
      size="small"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>
            {t('reorderSettings.cancel', 'Cancel')}
          </ModalButton>
          <ModalButton variant="primary" onClick={onSave} disabled={saving}>
            {saving ? t('reorderSettings.saving', 'Saving…') : t('reorderSettings.save', 'Save')}
          </ModalButton>
        </>
      }
    >
      {ingredient.is_brand_shared && (
        <InfoBox>
          {t('reorderSettings.brandShared', 'Name, unit and suppliers are managed by your brand. The numbers below apply to this store only.')}
        </InfoBox>
      )}

      <UIFormGroup>
        <FormLabel style={{ fontSize: 15 }}>
          {t('reorderSettings.level', { defaultValue: 'Reorder when stock is at or below ({{unit}})', unit })}
        </FormLabel>
        <FormInput
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          value={form.min_stock}
          onChange={(e) => onFormChange({ ...form, min_stock: e.target.value })}
          placeholder="0"
          style={{ fontSize: 18, fontWeight: 600 }}
          autoFocus
        />
        <div style={help}>
          {t('reorderSettings.levelHelp', 'When stock drops to this number the item shows “Order now”. Leave 0 and we estimate it from your usage.')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 10, padding: '8px 10px', background: '#F9FAFB', borderRadius: 8, fontSize: 13, color: '#0A2540' }}>
          <span>{t('reorderSettings.preview', { defaultValue: 'Now: {{stock}} {{unit}} →', stock: formatStock(stock), unit })}</span>
          <VerdictBadge verdict={preview} days={previewDays} />
        </div>
        {showRecommend && (
          <div style={{ ...help, color: '#6B7280' }}>
            {t('reorderSettings.recommend', {
              defaultValue: 'You use about {{daily}} {{unit}} a day and delivery takes {{lead}} days — {{suggest}} or more is safer.',
              daily: formatStock(daily), unit, lead, suggest: suggestLevel,
            })}
          </div>
        )}
      </UIFormGroup>

      <UIFormGroup>
        <FormLabel>{t('reorderSettings.minOrder', { defaultValue: 'Order at least ({{unit}})', unit })}</FormLabel>
        <FormInput
          type="number"
          step="0.01"
          min="0"
          inputMode="decimal"
          value={form.min_order}
          onChange={(e) => onFormChange({ ...form, min_order: e.target.value })}
          placeholder="0"
        />
        <div style={help}>{t('reorderSettings.minOrderHelp', 'Optional. We never suggest less than this.')}</div>
      </UIFormGroup>

      <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 10 }}>
        <button
          type="button"
          onClick={() => setShowAuto(v => !v)}
          aria-expanded={showAuto}
          style={{ background: 'none', border: 'none', padding: '4px 0', fontSize: 13, fontWeight: 600, color: '#4B5563', cursor: 'pointer' }}
        >
          {showAuto ? '▾' : '▸'} {t('reorderSettings.autoGroup', 'Automatic estimate (optional)')}
        </button>
        {showAuto && (
          <div style={{ marginTop: 8 }}>
            <div style={{ ...help, marginTop: 0, marginBottom: 10 }}>
              {t('reorderSettings.autoGroupHelp', 'Used to estimate a reorder number when you haven\'t set one, and to work out how much to order.')}
            </div>
            <div style={{ fontSize: 13, color: '#0A2540', marginBottom: 12 }}>
              {fromLedger && daily > 0
                ? t('reorderSettings.measuredShort', { defaultValue: 'Measured use: {{daily}} {{unit}}/day', daily: formatStock(daily), unit })
                : t('reorderSettings.notEnough', 'Not enough history yet')}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
              <UIFormGroup>
                <FormLabel>{t('reorderSettings.leadTime', 'Delivery time (days)')}</FormLabel>
                <FormInput
                  type="number"
                  min="1"
                  value={form.lead_time_days}
                  onChange={(e) => onFormChange({ ...form, lead_time_days: e.target.value })}
                  placeholder="2"
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>{t('reorderSettings.buffer', 'Extra buffer (%)')}</FormLabel>
                <FormInput
                  type="number"
                  min="0"
                  max="100"
                  value={form.safety_stock_percent}
                  onChange={(e) => onFormChange({ ...form, safety_stock_percent: e.target.value })}
                  placeholder="20"
                />
              </UIFormGroup>
            </div>
            <UIFormGroup>
              <FormLabel>{t('reorderSettings.manualDaily', { defaultValue: 'Daily use, if history is short ({{unit}}/day)', unit })}</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                min="0"
                value={form.manual_daily_usage}
                onChange={(e) => onFormChange({ ...form, manual_daily_usage: e.target.value })}
              />
            </UIFormGroup>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default SettingsModal;
