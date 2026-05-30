import React, { useState } from 'react';
import { useMenu } from '../../contexts/MenuContext';
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
  const { optionGroups: allOptionGroups } = useMenu();
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
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm} disabled={!isValid()}>
        Add to Order
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Customize Order"
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
              {group.options.map(option => (
                <RadioButton
                  key={option.id}
                  selected={selectedOptions.includes(option.id)}
                  onClick={() => handleOptionToggle(option.id, group.id, group.multiple, group.required)}
                  style={group.id === 'spice' && selectedOptions.includes(option.id) ? {
                    borderColor: '#F97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    color: '#EA580C'
                  } : {}}
                >
                  <div>{option.name}</div>
                  {option.price > 0 && (
                    <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
                      +{formatCurrency(option.price, operationSettings.currency)}
                    </div>
                  )}
                </RadioButton>
              ))}
            </RadioGroup>
          ) : (
            <CheckboxGroup>
              {group.options.map(option => (
                <CheckboxLabel key={option.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckboxInput
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleOptionToggle(option.id, group.id, group.multiple, group.required)}
                    />
                    <CheckboxText>{option.name}</CheckboxText>
                  </div>
                  {option.price > 0 && (
                    <CheckboxPrice>+{formatCurrency(option.price, operationSettings.currency)}</CheckboxPrice>
                  )}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          )}
        </Section>
      ))}

      <Section>
        <Label>Quantity</Label>
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