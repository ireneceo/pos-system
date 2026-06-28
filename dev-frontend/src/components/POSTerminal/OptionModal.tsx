import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMenu } from '../../contexts/MenuContext';
import { getAuthToken } from '../../utils/auth';
import { Modal, ModalButton as Button, FormLabel as Label } from '../UI/Modal';
import {
  RequiredStar,
  Section,
  RadioGroup,
  RadioButton,
  CheckboxGroup,
  CheckboxLabel,
  CheckboxInput,
  CheckboxText,
  CheckboxPrice,
  QuantityControl,
  QuantityButton,
  QuantityValue,
  TotalSection,
  TotalLabel,
  TotalPrice,
  ProductInfo,
  ProductIcon,
  ProductDetails,
  ProductName,
  ProductPrice
} from '../Common/Modal';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';

// interface Option {
//   id: string;
//   name: string;
//   price: number;
// }

interface SelectedOptionData {
  id: string;
  name: string;
  price: number;
}

interface OptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItem: {
    id: string;
    name: string;
    price: number;
    emoji: string;
    image?: string;
    optionGroups?: string[];
  };
  onConfirm: (quantity: number, selectedOptions: string[], selectedOptionsData: SelectedOptionData[]) => void;
}

const OptionModal: React.FC<OptionModalProps> = ({ isOpen, onClose, menuItem, onConfirm }) => {
  const { t } = useTranslation('pos');
  const { optionGroups: allOptionGroups, applyOptionSoldOut } = useMenu();
  const { operationSettings } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Get option groups for this menu item - 메뉴에서 설정한 순서대로 정렬.
  // ⚠ 브랜드 푸시 상품은 optionGroups 가 숫자([99])로, MenuContext 그룹 id 는 문자열("99")로
  // 들어와 strict === 매칭이 실패(옵션이 통째로 안 나옴) → String() 으로 느슨하게 매칭.
  const availableOptionGroups = menuItem.optionGroups
    ? menuItem.optionGroups
        .map(groupId => allOptionGroups.find(group => String(group.id) === String(groupId)))
        .filter((group): group is NonNullable<typeof group> => group !== undefined)
    : [];

  const handleOptionToggle = (optionId: string, groupId: string, multiple: boolean, required: boolean) => {
    if (multiple) {
      // 다중 선택 - 토글
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // 단일 선택
      const group = availableOptionGroups.find(g => g.id === groupId);
      if (group) {
        const groupOptionIds = group.options.map(o => o.id);
        const isCurrentlySelected = selectedOptions.includes(optionId);

        if (isCurrentlySelected && !required) {
          // 이미 선택된 옵션을 다시 클릭 & 필수가 아님 -> 선택 해제
          setSelectedOptions(prev => prev.filter(id => !groupOptionIds.includes(id)));
        } else {
          // 다른 옵션 클릭 또는 필수 옵션 -> 해당 그룹에서 이 옵션만 선택
          setSelectedOptions(prev => [
            ...prev.filter(id => !groupOptionIds.includes(id)),
            optionId
          ]);
        }
      }
    }
  };

  // 2026-06-28 (2-1): 옵션 품절 — 롱프레스(600ms)로 직원이 토글, 품절 옵션은 선택 불가/회색.
  // 상품 솔드아웃(POSTerminalPage)과 동일 패턴. 데이터의 opt.sold_out + 낙관적 오버레이.
  const [optSoldOut, setOptSoldOut] = useState<Record<string, boolean>>({});
  const effOptSold = (opt: any) => optSoldOut[opt.id] ?? !!opt.sold_out;
  const lpTimer = useRef<any>(null);
  const lpFired = useRef(false);
  const toggleOptSoldOut = async (opt: any) => {
    const next = !effOptSold(opt);
    setOptSoldOut(p => ({ ...p, [opt.id]: next }));
    try {
      const token = getAuthToken();
      const parts = window.location.pathname.split('/');
      const ridIdx = parts.indexOf('restaurant');
      const rid = ridIdx >= 0 ? parts[ridIdx + 1] : null;
      const res = await fetch(`/api/menu/option/${opt.id}/toggle-soldout${rid ? `?restaurantId=${rid}` : ''}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ soldOut: next })
      });
      if (!res.ok) throw new Error('fail');
      applyOptionSoldOut(opt.id, next); // 2026-06-28 (M1) 공유 optionGroups 반영 → 재오픈/타 기기 일관
    } catch { setOptSoldOut(p => ({ ...p, [opt.id]: !next })); }
  };
  const startOptLongPress = (opt: any) => { lpFired.current = false; lpTimer.current = setTimeout(() => { lpFired.current = true; toggleOptSoldOut(opt); }, 600); };
  const cancelOptLongPress = () => { if (lpTimer.current) { clearTimeout(lpTimer.current); lpTimer.current = null; } };

  const calculateTotal = () => {
    let total = menuItem.price * quantity;
    
    // Add option prices
    selectedOptions.forEach(optionId => {
      const option = availableOptionGroups
        .flatMap(g => g.options)
        .find(o => o.id === optionId);
      if (option) {
        total += option.price * quantity;
      }
    });
    
    return total;
  };

  const isValid = () => {
    // Check if all required options are selected
    return availableOptionGroups
      .filter(group => group.required)
      .every(group => 
        selectedOptions.some(optionId => 
          group.options.some(option => option.id === optionId)
        )
      );
  };

  const handleConfirm = () => {
    if (isValid()) {
      const selectedOptionNames = selectedOptions.map(optionId => {
        const option = availableOptionGroups
          .flatMap(g => g.options)
          .find(o => o.id === optionId);
        return option ? option.name : '';
      }).filter(Boolean);

      const selectedOptionsData: SelectedOptionData[] = selectedOptions.map(optionId => {
        const option = availableOptionGroups
          .flatMap(g => g.options)
          .find(o => o.id === optionId);
        return option ? { id: option.id, name: option.name, price: option.price } : null;
      }).filter((opt): opt is SelectedOptionData => opt !== null);

      onConfirm(quantity, selectedOptionNames, selectedOptionsData);
      // Reset state
      setQuantity(1);
      setSelectedOptions([]);
    }
  };

  const handleClose = () => {
    setQuantity(1);
    setSelectedOptions([]);
    onClose();
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>
        {t('optionModal.cancel', 'Cancel')}
      </Button>
      <Button variant="primary" onClick={handleConfirm} disabled={!isValid()}>
        {t('optionModal.addToOrder', 'Add to Order')}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t('optionModal.customizeOrder', 'Customize Order')}
      footer={footer}
    >
      <ProductInfo>
        <ProductIcon style={{ 
          backgroundImage: menuItem.image ? `url(${menuItem.image})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          fontSize: menuItem.image ? '0' : '32px'
        }}>
          {!menuItem.image && menuItem.emoji}
        </ProductIcon>
        <ProductDetails>
          <ProductName>{menuItem.name}</ProductName>
          <ProductPrice>{formatCurrency(menuItem.price, operationSettings.currency)}</ProductPrice>
        </ProductDetails>
      </ProductInfo>

      {availableOptionGroups.map(group => (
        <Section key={group.id}>
          <Label>
            {group.name}
            {group.required && <RequiredStar>*</RequiredStar>}
          </Label>
          
          {!group.multiple ? (
            <RadioGroup>
              {group.options.map(option => {
                const so = effOptSold(option);
                return (
                <RadioButton
                  key={option.id}
                  selected={selectedOptions.includes(option.id)}
                  onMouseDown={() => startOptLongPress(option)}
                  onMouseUp={cancelOptLongPress}
                  onMouseLeave={cancelOptLongPress}
                  onTouchStart={() => startOptLongPress(option)}
                  onTouchEnd={cancelOptLongPress}
                  onClick={() => { if (lpFired.current) { lpFired.current = false; return; } if (so) return; handleOptionToggle(option.id, group.id, group.multiple, group.required); }}
                  style={{
                    ...(group.id === 'spice' && selectedOptions.includes(option.id) ? {
                      borderColor: '#F97316', backgroundColor: 'rgba(249, 115, 22, 0.1)', color: '#EA580C'
                    } : {}),
                    ...(so ? { opacity: 0.55, cursor: 'not-allowed' } : {})
                  }}
                >
                  <div style={so ? { textDecoration: 'line-through' } : undefined}>{option.name}</div>
                  {so ? (
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#DC2626', marginTop: '2px' }}>{t('terminal.soldOut', { defaultValue: 'Sold out' })}</div>
                  ) : option.price > 0 && (
                    <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                      +{formatCurrency(option.price, operationSettings.currency)}
                    </div>
                  )}
                </RadioButton>
                );
              })}
            </RadioGroup>
          ) : (
            <CheckboxGroup>
              {group.options.map(option => {
                const so = effOptSold(option);
                return (
                <CheckboxLabel key={option.id}
                  onMouseDown={() => startOptLongPress(option)}
                  onMouseUp={cancelOptLongPress}
                  onMouseLeave={cancelOptLongPress}
                  onTouchStart={() => startOptLongPress(option)}
                  onTouchEnd={cancelOptLongPress}
                  style={so ? { opacity: 0.6 } : undefined}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckboxInput
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      disabled={so}
                      onChange={() => { if (lpFired.current) { lpFired.current = false; return; } if (so) return; handleOptionToggle(option.id, group.id, group.multiple, group.required); }}
                    />
                    <CheckboxText style={so ? { textDecoration: 'line-through' } : undefined}>{option.name}</CheckboxText>
                  </div>
                  {so ? (
                    <CheckboxPrice style={{ color: '#DC2626', fontWeight: 700 }}>{t('terminal.soldOut', { defaultValue: 'Sold out' })}</CheckboxPrice>
                  ) : option.price > 0 && (
                    <CheckboxPrice>+{formatCurrency(option.price, operationSettings.currency)}</CheckboxPrice>
                  )}
                </CheckboxLabel>
                );
              })}
            </CheckboxGroup>
          )}
        </Section>
      ))}

      <Section>
        <Label>{t('optionModal.quantity', 'Quantity')}</Label>
        <QuantityControl>
          <QuantityButton 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </QuantityButton>
          <QuantityValue>{quantity}</QuantityValue>
          <QuantityButton onClick={() => setQuantity(quantity + 1)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </QuantityButton>
        </QuantityControl>
      </Section>

      <TotalSection>
        <TotalLabel>Total:</TotalLabel>
        <TotalPrice>{formatCurrency(calculateTotal(), operationSettings.currency)}</TotalPrice>
      </TotalSection>
    </Modal>
  );
};

export default OptionModal;