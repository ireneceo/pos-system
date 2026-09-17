import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput } from '../../UI/Modal';
import DateField from '../../Common/DateField';
import { InfoBox } from '../styles';
import { IngredientStock } from '../types';
import { ProducePreview } from '../hooks/useProduceModal';

/**
 * 준비된 재고 «만들기» (2026-09-17 Fable 판정)
 *   확인 한 번에 원재료가 빠지고 준비 재료가 들어온다 — 사람이 두 군데 적을 자리가 없다.
 *   부족한 원재료는 **숨기지 않고 빨간 글씨로 보여 주되 막지는 않는다**(실제로는 만들어졌는데
 *   화면이 거부하면 장부가 더 틀어진다).
 */
interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredient: IngredientStock | null;
  batches: string;
  onBatchesChange: (v: string) => void;
  actualYield: string;
  onActualYieldChange: (v: string) => void;
  expiryDate: string;
  onExpiryDateChange: (v: string) => void;
  preview: ProducePreview | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
  onConfirm: () => void;
}

const ProduceModal: React.FC<Props> = ({
  isOpen, onClose, ingredient, batches, onBatchesChange, actualYield, onActualYieldChange,
  expiryDate, onExpiryDateChange, preview, loading, saving, error, onConfirm,
}) => {
  const { t } = useTranslation(['inventory', 'common']);
  return (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={ingredient ? t('inventory:produce.titleNamed', '만들기 — {{name}}', { name: ingredient.name }) : t('inventory:produce.title', '만들기')}
    size="medium"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>{t('common:button.cancel', '취소')}</ModalButton>
        <ModalButton variant="primary" onClick={onConfirm} disabled={saving || loading}>
          {saving ? t('inventory:produce.saving', '만드는 중…') : t('inventory:produce.title', '만들기')}
        </ModalButton>
      </>
    }
  >
    <InfoBox>
      {preview
        ? t('inventory:produce.recipeLine', '레시피 «{{name}}» 한 판 = {{amount}}{{unit}}', {
            name: preview.recipe.name, amount: preview.recipe.yield_amount, unit: preview.recipe.yield_unit })
        : t('inventory:produce.loadingRecipe', '준비 레시피를 불러오는 중…')}
    </InfoBox>

    <UIFormGroup>
      <FormLabel>{t('inventory:produce.batches', '몇 판 만드나요?')}</FormLabel>
      <FormInput
        type="number"
        min="0.01"
        step="0.01"
        value={batches}
        onChange={(e) => onBatchesChange(e.target.value)}
      />
    </UIFormGroup>

    <ConsumeTitle>{t('inventory:produce.consumes', '빠지는 원재료')}</ConsumeTitle>
    {loading && <Muted>{t('inventory:produce.calculating', '계산 중…')}</Muted>}
    {!loading && preview && preview.consumes.length === 0 && (
      <Muted>{t('inventory:produce.noLines', '이 레시피에 재료 줄이 없습니다 — 재료를 먼저 적어 주세요.')}</Muted>
    )}
    {!loading && preview && preview.consumes.map((c) => (
      <ConsumeRow key={c.ingredient_id} $short={c.short_by > 0}>
        <span>{c.name}</span>
        <span>{c.needed}{c.unit}</span>
        <ConsumeHave $short={c.short_by > 0}>
          {c.short_by > 0
            ? t('inventory:produce.haveShort', '현재 {{have}}{{unit}} — {{short}}{{unit}} 부족', { have: c.current_stock, unit: c.unit, short: c.short_by })
            : t('inventory:produce.have', '현재 {{have}}{{unit}}', { have: c.current_stock, unit: c.unit })}
        </ConsumeHave>
      </ConsumeRow>
    ))}
    {preview?.has_shortage && (
      <ShortageNote>
        {t('inventory:produce.shortageNote', '부족한 원재료가 있습니다. 그래도 만들 수 있지만, 빠지는 양은 남아 있는 만큼까지만 기록됩니다.')}
      </ShortageNote>
    )}

    <UIFormGroup>
      <FormLabel>
        {t('inventory:produce.actualYield', '실제로 나온 양')}{preview ? ` (${preview.ingredient.unit})` : ''}
      </FormLabel>
      <FormInput
        type="number"
        min="0.01"
        step="0.01"
        value={actualYield}
        onChange={(e) => onActualYieldChange(e.target.value)}
        placeholder={preview ? String(preview.expected_yield) : ''}
      />
      <FieldHint>{t('inventory:produce.actualYieldHint', '기본값은 레시피 수율 × 판수입니다. 실제로 나온 무게가 다르면 그대로 적어 주세요 — 원가가 그 양으로 계산됩니다.')}</FieldHint>
    </UIFormGroup>

    <UIFormGroup>
      <FormLabel>{t('inventory:produce.expiry', '유통기한 (선택)')}</FormLabel>
      <DateField value={expiryDate} onChange={onExpiryDateChange} />
    </UIFormGroup>

    {error && <ErrorNote>{error}</ErrorNote>}
  </Modal>
  );
};

const ConsumeTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
  margin: 16px 0 8px;
`;

const ConsumeRow = styled.div<{ $short: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid ${p => (p.$short ? '#FCA5A5' : '#E6EBF1')};
  background: ${p => (p.$short ? '#FEF2F2' : '#FFFFFF')};
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;
  margin-bottom: 6px;
`;

const ConsumeHave = styled.span<{ $short: boolean }>`
  font-size: 12px;
  color: ${p => (p.$short ? '#B91C1C' : '#4B5563')};
  white-space: nowrap;
`;

const ShortageNote = styled.div`
  font-size: 12px;
  color: #B91C1C;
  margin: 6px 0 4px;
  line-height: 1.5;
`;

const FieldHint = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 6px;
  line-height: 1.5;
`;

const Muted = styled.div`
  font-size: 13px;
  color: #4B5563;
  padding: 6px 0;
`;

const ErrorNote = styled.div`
  margin-top: 12px;
  padding: 10px 12px;
  border: 1px solid #FCA5A5;
  background: #FEF2F2;
  border-radius: 6px;
  font-size: 13px;
  color: #B91C1C;
`;

export default ProduceModal;
