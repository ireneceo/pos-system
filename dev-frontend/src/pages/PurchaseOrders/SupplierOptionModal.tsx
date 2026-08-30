/**
 * SupplierOptionModal — 공급업체 상품 옵션 선택 (POS Terminal 패턴)
 *
 * 옵션 있는 supplier_product 카드 클릭 시 호출.
 * is_required + min/max selections 검증 → onConfirm(selectedOptions, adjustedPrice).
 */
import React, { useState, useMemo, useEffect } from 'react';
import { qtyStepForUnit, type OrderMode } from '../../utils/unitConversion';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../../components/UI/Modal';

export interface SupplierOptionItem {
  id: number;
  name: string;
  price_adjustment: number;
}
export interface SupplierOptionGroup {
  id: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  options: SupplierOptionItem[];
}

export interface SelectedOption {
  group_id: number;
  group_name: string;
  option_id: number;
  option_name: string;
  price_adjustment: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  productName: string;
  basePrice: number;
  unit?: string | null;
  /** 주문 방식 — 'measure' 면 수량을 소수로 받는다(kg·L). 미지정이면 'pack'(정수, 기존 동작). */
  orderMode?: OrderMode;
  optionGroups: SupplierOptionGroup[];
  onConfirm: (selectedOptions: SelectedOption[], adjustedUnitPrice: number, quantity: number) => void;
}

const GroupBox = styled.div`
  border: 1px solid #C7CED6;
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 10px;
`;

const GroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const GroupName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #0A2540;
`;

const RequiredHint = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #DC2626;
  background: #FEF2F2;
  padding: 2px 6px;
  border-radius: 999px;
`;

const OptionRow = styled.label<{ $selected: boolean; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${p => p.$selected ? '#635BFF' : '#C7CED6'};
  background: ${p => p.$selected ? '#EEF2FF' : 'white'};
  cursor: ${p => p.$disabled ? 'not-allowed' : 'pointer'};
  margin-bottom: 4px;
  transition: all 0.15s;
  font-size: 13px;
  opacity: ${p => p.$disabled ? 0.5 : 1};
  &:hover { border-color: ${p => p.$disabled ? '#C7CED6' : '#635BFF'}; }
`;

const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: #F1F4F8;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const QtyBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #C7CED6;
  background: white;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover { border-color: #635BFF; color: #635BFF; }
`;

const QtyInput = styled.input`
  flex: 1;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  padding: 6px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  outline: none;
  &:focus { border-color: #635BFF; }
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: #F1F5F9;
  border-radius: 10px;
`;

const SupplierOptionModal: React.FC<Props> = ({ open, onClose, productName, basePrice, unit, orderMode, optionGroups, onConfirm }) => {
  const { t } = useTranslation('purchaseOrders');
  const [selected, setSelected] = useState<Record<number, number[]>>({});  // group_id → [option_id]
  const [quantity, setQuantity] = useState(1);
  // 스텝은 주문 방식이 정한다. measure 만 단위를 보고 소수로 내려간다(kg=0.01, 개=1).
  const qStep = orderMode === 'measure' ? qtyStepForUnit(unit) : 1;
  // 0.1 + 0.2 부동소수 찌꺼기 방지 — 수량은 소수 2자리까지만 의미가 있다.
  const round2 = (v: number) => Math.round(v * 100) / 100;

  useEffect(() => {
    if (open) {
      setSelected({});
      setQuantity(1);
    }
  }, [open, optionGroups]);

  const toggleOption = (group: SupplierOptionGroup, optionId: number) => {
    setSelected(prev => {
      const current = prev[group.id] || [];
      const max = group.max_selections || 1;
      let next: number[];
      if (current.includes(optionId)) {
        next = current.filter(id => id !== optionId);
      } else if (max === 1) {
        next = [optionId];  // single — 교체
      } else if (current.length >= max) {
        return prev;  // 최대치 초과
      } else {
        next = [...current, optionId];
      }
      return { ...prev, [group.id]: next };
    });
  };

  const adjustedUnitPrice = useMemo(() => {
    let price = basePrice;
    for (const g of optionGroups) {
      const sel = selected[g.id] || [];
      for (const oid of sel) {
        const opt = g.options.find(o => o.id === oid);
        if (opt) price += opt.price_adjustment;
      }
    }
    return price;
  }, [selected, optionGroups, basePrice]);

  const validationError = useMemo(() => {
    for (const g of optionGroups) {
      const sel = selected[g.id] || [];
      if (g.is_required && sel.length < (g.min_selections || 1)) {
        return t('optionModal.required', { group: g.name, defaultValue: '"{{group}}" is required' }) as string;
      }
      if (sel.length > (g.max_selections || 1)) {
        return t('optionModal.tooMany', { group: g.name, defaultValue: 'Too many selections in "{{group}}"' }) as string;
      }
    }
    return null;
  }, [selected, optionGroups, t]);

  const handleConfirm = () => {
    if (validationError) return;
    const out: SelectedOption[] = [];
    for (const g of optionGroups) {
      const sel = selected[g.id] || [];
      for (const oid of sel) {
        const opt = g.options.find(o => o.id === oid);
        if (opt) {
          out.push({
            group_id: g.id, group_name: g.name,
            option_id: opt.id, option_name: opt.name,
            price_adjustment: opt.price_adjustment
          });
        }
      }
    }
    onConfirm(out, adjustedUnitPrice, quantity);
  };

  const total = adjustedUnitPrice * quantity;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={productName}
      size="medium"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose}>
            {t('common:cancel', 'Cancel')}
          </ModalButton>
          <ModalButton variant="primary" onClick={handleConfirm} disabled={!!validationError}>
            {t('optionModal.addToCart', 'Add to Cart')}
          </ModalButton>
        </>
      }
    >
      {optionGroups.map(g => (
        <GroupBox key={g.id}>
          <GroupHeader>
            <GroupName>
              {g.name}
              {g.max_selections > 1 && (
                <span style={{ fontSize: 11, color: '#4B5563', marginLeft: 6 }}>
                  ({g.min_selections || 0}–{g.max_selections})
                </span>
              )}
            </GroupName>
            {g.is_required && <RequiredHint>{t('optionModal.requiredBadge', 'Required')}</RequiredHint>}
          </GroupHeader>
          {g.options.map(opt => {
            const sel = selected[g.id] || [];
            const isSelected = sel.includes(opt.id);
            const reachedMax = !isSelected && sel.length >= (g.max_selections || 1);
            return (
              <OptionRow
                key={opt.id}
                $selected={isSelected}
                $disabled={reachedMax}
                onClick={() => !reachedMax && toggleOption(g, opt.id)}
              >
                <span>{opt.name}</span>
                <span style={{ fontSize: 12, color: opt.price_adjustment > 0 ? '#635BFF' : '#6B7280', fontWeight: 600 }}>
                  {opt.price_adjustment > 0 ? `+${opt.price_adjustment.toFixed(2)}`
                    : opt.price_adjustment < 0 ? `−${Math.abs(opt.price_adjustment).toFixed(2)}`
                    : '—'}
                </span>
              </OptionRow>
            );
          })}
        </GroupBox>
      ))}

      <QtyRow>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#0A2540' }}>{t('optionModal.qty', 'Quantity')}</span>
        {/*
          수량 증감·입력은 **단위가 정한다.**
            pack   = 팩·박스라 1 씩 (기존 동작 그대로 유지)
            measure = kg·L 라 0.01 씩, 소수 입력 허용
          그전까지 parseInt 로 강제해 measure 의 1.5kg 이 1 로 잘렸다.
        */}
        <QtyBtn type="button" onClick={() => setQuantity(q => round2(Math.max(qStep, q - qStep)))}>−</QtyBtn>
        <QtyInput
          type="number"
          min={qStep}
          step={qStep}
          value={quantity}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            setQuantity(Number.isFinite(v) && v > 0 ? round2(v) : qStep);
          }}
        />
        <QtyBtn type="button" onClick={() => setQuantity(q => round2(q + qStep))}>+</QtyBtn>
      </QtyRow>

      <TotalRow>
        <span style={{ fontSize: 13, color: '#4B5563' }}>
          {adjustedUnitPrice.toFixed(2)}{unit ? ` / ${unit}` : ''} × {quantity}
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#0A2540' }}>
          {total.toFixed(2)}
        </span>
      </TotalRow>

      {validationError && (
        <div style={{ marginTop: 10, padding: 8, background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 6, fontSize: 12, color: '#991B1B' }}>
          {validationError}
        </div>
      )}
    </Modal>
  );
};

export default SupplierOptionModal;
