import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useMenu } from '../../contexts/MenuContext';
import api from '../services/api';
import { formatCurrency } from '../../utils/currency';

const ItemHeader = styled.div`
  background: white;
  margin: 0 0 16px 0;
  padding-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ItemImage = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: 250px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.hasImage ? '0' : '120px'};
  margin-bottom: 16px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ItemInfo = styled.div`
  padding: 0 16px;
`;

const ItemName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const ItemDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6B7280;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SetMenuSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SetMenuTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SetMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SetMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 6px;
  font-size: 14px;
  color: #4B5563;
`;

const OptionSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const OptionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RequiredBadge = styled.span`
  font-size: 12px;
  color: #EF4444;
  font-weight: 500;
  background: #FEE2E2;
  padding: 2px 8px;
  border-radius: 4px;
`;

const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`;

const RadioButton = styled.button<{ selected?: boolean }>`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#374151'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:active {
    transform: scale(0.98);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  min-height: 44px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:active {
    background: #F9FAFB;
  }
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`;

const CheckboxText = styled.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`;

const CheckboxPrice = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

const QuantitySection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: #F3F4F6;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #6B7280;
  }
`;

const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  min-width: 30px;
  text-align: center;
`;

const SpecialInstructions = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 80px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const InstructionsInput = styled.textarea`
  width: 100%;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  resize: none;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const AddToCartButton = styled.button`
  position: fixed;
  bottom: 68px; /* Space for bottom navigation */
  left: 0;
  right: 0;
  background: #635BFF;
  color: white;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 50;

  &:active {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const PriceDisplay = styled.span`
  font-size: 18px;
`;

const ItemDetailPage: React.FC = () => {
  const { slug, itemId } = useParams<{ slug: string; itemId: string }>();
  const navigate = useNavigate();
  const { addToCart, currency } = useMobileOrder();
  const { getItemById, optionGroups } = useMenu();
  
  const [item, setItem] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!itemId) return;

    const foundItem = getItemById(itemId);
    if (foundItem) {
      setItem(foundItem);
      setIsLoading(false);
    } else {
      // Fetch from API if not in context
      loadItemDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  
  const loadItemDetails = async () => {
    if (!itemId) return;

    try {
      // Fetch item details from API
      const response = await api.getItemDetails(itemId);

      if (response.data && response.data.success && response.data.data) {
        const itemData = response.data.data;

        // Transform API data to match component format
        const transformedItem = {
          id: itemData.id,
          name: itemData.name,
          price: parseFloat(itemData.price),
          emoji: itemData.emoji,
          image: itemData.image,
          description: itemData.description || '',
          preparationTime: itemData.preparationTime || 15,
          calories: itemData.calories || 0,
          isAvailable: itemData.isAvailable !== false,
          optionGroups: itemData.optionGroups || []
        };

        setItem(transformedItem);
      } else {
        console.error('Item not found');
        navigate(-1); // Go back if item not found
      }
    } catch (error) {
      console.error('Error loading item details:', error);
      navigate(-1); // Go back on error
    } finally {
      setIsLoading(false);
    }
  };
  
  // Get available option groups for this item
  // Support both formats: array of IDs or array of objects
  const availableOptionGroups = item?.optionGroups
    ? (Array.isArray(item.optionGroups) && item.optionGroups.length > 0 && typeof item.optionGroups[0] === 'object'
        ? item.optionGroups  // Already full objects from API
        : optionGroups.filter((group: any) => item.optionGroups.includes(group.id)))  // IDs to filter
    : [];

  const handleOptionToggle = (optionId: string, groupId: string, multiple: boolean) => {
    if (multiple) {
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      // For single selection, remove other options from the same group
      const group = availableOptionGroups.find((g: any) => g.id === groupId);
      if (group) {
        const groupOptionIds = group.options.map((o: any) => o.id);
        setSelectedOptions(prev => [
          ...prev.filter((id: string) => !groupOptionIds.includes(id)),
          optionId
        ]);
      }
    }
  };
  
  const calculateTotal = () => {
    if (!item) return 0;
    
    let total = item.price * quantity;
    
    // Add option prices
    selectedOptions.forEach(optionId => {
      const option = availableOptionGroups
        ?.flatMap((g: any) => g.options)
        ?.find((o: any) => o.id === optionId);
      if (option) {
        total += option.price * quantity;
      }
    });
    
    return total;
  };
  
  const isValid = () => {
    if (!availableOptionGroups.length) return true;
    
    // Check if all required options are selected
    return availableOptionGroups
      .filter((group: any) => group.required)
      .every((group: any) => 
        selectedOptions.some(optionId => 
          group.options.some((option: any) => option.id === optionId)
        )
      );
  };
  
  const handleAddToCart = () => {
    if (!item || !isValid()) return;

    // Create a copy of item with actual option groups instead of IDs
    const itemWithOptions = {
      ...item,
      optionGroups: availableOptionGroups
    };

    addToCart(itemWithOptions, quantity, selectedOptions, instructions);
    navigate(`/mobile/${slug}/cart`);
  };
  
  if (isLoading) {
    return (
      <MobileLayout title="Loading..." showBack onBack={() => navigate(-1)}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
          Loading item details...
        </div>
      </MobileLayout>
    );
  }
  
  if (!item) {
    return (
      <MobileLayout title="Item Not Found" showBack onBack={() => navigate(-1)}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
          This item could not be found.
        </div>
      </MobileLayout>
    );
  }
  
  return (
    <MobileLayout title={item.code ? `${item.code} ${item.name}` : item.name} showBack onBack={() => navigate(-1)}>
      <ItemHeader>
        <ItemImage hasImage={!!item.image}>
          {item.image ? (
            <img src={item.image} alt={item.name} />
          ) : (
            item.emoji
          )}
        </ItemImage>
        <ItemInfo>
          <ItemName>{item.code ? `${item.code} ` : ''}{item.name}</ItemName>
          <ItemDescription>{item.description}</ItemDescription>
          <ItemDetails>
            {item.preparationTime > 0 && (
              <DetailItem>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                {item.preparationTime} min
              </DetailItem>
            )}
            {item.calories && (
              <DetailItem>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14C19 18.4183 15.4183 22 11 22C6.58172 22 3 18.4183 3 14C3 9.58172 6.58172 2 11 2C11 6.41828 14.5817 10 19 10V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item.calories} cal
              </DetailItem>
            )}
          </ItemDetails>
        </ItemInfo>
      </ItemHeader>

      {/* Set Menu Items Display */}
      {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
        <SetMenuSection>
          <SetMenuTitle>
            🍱 This set includes:
          </SetMenuTitle>
          <SetMenuItems>
            {item.set_items.map((setItem: any, index: number) => (
              <SetMenuItem key={index}>
                • {setItem.name} x{setItem.quantity}
              </SetMenuItem>
            ))}
          </SetMenuItems>
        </SetMenuSection>
      )}

      {availableOptionGroups?.map((group: any) => (
        <OptionSection key={group.id}>
          <OptionTitle>
            {group.name}
            {group.required && <RequiredBadge>Required</RequiredBadge>}
          </OptionTitle>

          {!group.multiple ? (
            <RadioGroup>
              {group.options.map((option: any) => (
                <RadioButton
                  key={option.id}
                  selected={selectedOptions.includes(option.id)}
                  onClick={() => handleOptionToggle(option.id, group.id, group.multiple)}
                >
                  <div>{option.name}</div>
                  {option.price > 0 && (
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                      +{formatCurrency(option.price, currency)}
                    </div>
                  )}
                </RadioButton>
              ))}
            </RadioGroup>
          ) : (
            <CheckboxGroup>
              {group.options.map((option: any) => (
                <CheckboxLabel key={option.id}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckboxInput
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleOptionToggle(option.id, group.id, group.multiple)}
                    />
                    <CheckboxText>{option.name}</CheckboxText>
                  </div>
                  {option.price > 0 && (
                    <CheckboxPrice>+{formatCurrency(option.price, currency)}</CheckboxPrice>
                  )}
                </CheckboxLabel>
              ))}
            </CheckboxGroup>
          )}
        </OptionSection>
      ))}
      
      <QuantitySection>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1F2937' }}>
          Quantity
        </div>
        <QuantityControl>
          <QuantityButton 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </QuantityButton>
          <QuantityValue>{quantity}</QuantityValue>
          <QuantityButton onClick={() => setQuantity(quantity + 1)}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </QuantityButton>
        </QuantityControl>
      </QuantitySection>
      
      <SpecialInstructions>
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#1F2937', marginBottom: '8px' }}>
          Special Instructions
        </div>
        <InstructionsInput
          rows={3}
          placeholder="Any special requests? (optional)"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </SpecialInstructions>
      
      <AddToCartButton
        onClick={handleAddToCart}
        disabled={!isValid()}
      >
        <span>Add to Cart</span>
        <PriceDisplay>{formatCurrency(calculateTotal(), currency)}</PriceDisplay>
      </AddToCartButton>
    </MobileLayout>
  );
};

export default ItemDetailPage;