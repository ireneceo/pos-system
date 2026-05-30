import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useMenu } from '../../contexts/MenuContext';
import api from '../services/api';
import { formatCurrency } from '../../utils/currency';
import MobileSetOrder from '../components/MobileSetOrder';
import { isSetSelectionValid } from '../../utils/setMenu';

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
  background: #F1F4F8;
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
  color: #4B5563;
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
  color: #4B5563;
  
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
  color: #374151;
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
  border: 1px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#1F2937'};
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
  border: 1px solid #C7CED6;
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
  color: #1F2937;
  margin-left: 10px;
  flex: 1;
`;

const CheckboxPrice = styled.span`
  font-size: 12px;
  color: #4B5563;
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
  border: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    background: #F1F4F8;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: #4B5563;
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
  border: 1px solid #C7CED6;
  border-radius: 6px;
  padding: 12px;
  font-size: 16px; /* iOS zoom 방지 */
  resize: none;
  font-family: inherit;
  box-sizing: border-box;
  min-height: 80px;
  -webkit-appearance: none;

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
  z-index: 101;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 600px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 12px;
    bottom: 80px;
  }

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #6B7280;
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
  // 세트 선택 상태: groupId -> 선택 product_ids / `${groupId}:${pid}` -> 선택 optionIds
  const [setSel, setSetSel] = useState<Record<string, number[]>>({});
  const [setOpts, setSetOpts] = useState<Record<string, string[]>>({});
  
  useEffect(() => {
    if (!itemId) return;

    const foundItem = getItemById(itemId);
    // 세트는 구성품/상속옵션 resolve 가 필요해 항상 API 상세를 받는다(context 엔 resolved 없음).
    if (foundItem && !foundItem.is_set_menu) {
      setItem(foundItem);
      setIsLoading(false);
    } else {
      // Fetch from API (set resolve 포함, 또는 context 에 없을 때)
      loadItemDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);
  
  const loadItemDetails = async () => {
    if (!itemId) return;

    try {
      // Fetch item details from API
      const response = await api.getItemDetails(itemId);

      // API returns { success: true, data: {...} }
      if (response && response.success && response.data) {
        const itemData = response.data;

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
          optionGroups: itemData.optionGroups || [],
          // 세트 v2 — resolve 된 구성품/상속옵션/품절 (mobile /menu/item/:id 가 첨부)
          is_set_menu: itemData.is_set_menu || false,
          set_groups: itemData.set_groups || null,
          set_groups_resolved: itemData.set_groups_resolved || [],
          set_available: itemData.set_available !== false
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
  
  // ─── 세트 v2 ───
  const setGroupsResolved: any[] = Array.isArray(item?.set_groups_resolved) ? item.set_groups_resolved : [];
  const isSet = !!item?.is_set_menu && setGroupsResolved.length > 0;

  // 세트 로드 시 선택 초기화: fixed=구성품 자동 포함, choice=빈 선택
  useEffect(() => {
    if (!isSet) return;
    const init: Record<string, number[]> = {};
    setGroupsResolved.forEach((g: any) => {
      init[g.id] = g.type === 'fixed' ? (g.items || []).map((it: any) => Number(it.product_id)) : [];
    });
    setSetSel(init);
    setSetOpts({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.id, isSet]);

  // 포함된 구성품 목록 (fixed 전부 + choice 선택분)
  const includedSetComponents = () => {
    const out: { group: any; it: any }[] = [];
    setGroupsResolved.forEach((g: any) => {
      const picks = g.type === 'fixed'
        ? (g.items || [])
        : (g.items || []).filter((it: any) => (setSel[g.id] || []).includes(Number(it.product_id)));
      picks.forEach((it: any) => out.push({ group: g, it }));
    });
    return out;
  };

  const handleToggleSetComponent = (groupId: string, productId: number, _type: 'fixed' | 'choice', max: number) => {
    setSetSel(prev => {
      const cur = prev[groupId] || [];
      const has = cur.includes(productId);
      let next: number[];
      if (has) next = cur.filter(id => id !== productId);
      else if (max <= 1) next = [productId];                 // 라디오
      else next = cur.length >= max ? cur : [...cur, productId]; // 체크(최대 max)
      return { ...prev, [groupId]: next };
    });
    // 선택 해제 시 해당 구성품 옵션도 제거
    setSetOpts(prev => {
      const k = `${groupId}:${productId}`;
      if (prev[k] && !(setSel[groupId] || []).includes(productId)) return prev;
      const { [k]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const handleToggleSetOption = (groupId: string, productId: number, optionId: string, multiple: boolean, required: boolean) => {
    const k = `${groupId}:${productId}`;
    setSetOpts(prev => {
      const cur = prev[k] || [];
      if (multiple) {
        return { ...prev, [k]: cur.includes(optionId) ? cur.filter(id => id !== optionId) : [...cur, optionId] };
      }
      // 단일선택: 같은 그룹 옵션 교체. 그룹 옵션 id 집합 필요 → resolved 에서 찾기
      const grp = setGroupsResolved.find((g: any) => g.id === groupId);
      const item2 = grp?.items?.find((it: any) => Number(it.product_id) === productId);
      const og = (item2?.optionGroups || []).find((o: any) => o.options.some((opt: any) => String(opt.id) === optionId));
      const groupOptIds = (og?.options || []).map((o: any) => String(o.id));
      const isSel = cur.includes(optionId);
      if (isSel && !required) return { ...prev, [k]: cur.filter(id => !groupOptIds.includes(id)) };
      return { ...prev, [k]: [...cur.filter(id => !groupOptIds.includes(id)), optionId] };
    });
  };

  // 세트 유효성: choice min~max 충족 + 포함 구성품의 required 옵션 충족
  const isSetValid = (): boolean => {
    if (!isSet) return true;
    const requiredOk = (c: { group_id: string; product_id: number }) => {
      const grp = setGroupsResolved.find((g: any) => g.id === c.group_id);
      const it = grp?.items?.find((x: any) => Number(x.product_id) === Number(c.product_id));
      const sel = setOpts[`${c.group_id}:${c.product_id}`] || [];
      return (it?.optionGroups || []).filter((og: any) => og.required)
        .every((og: any) => og.options.some((o: any) => sel.includes(String(o.id))));
    };
    const selected = includedSetComponents().map(({ group, it }) => ({ group_id: group.id, product_id: Number(it.product_id) }));
    // soldOut 포함 구성품이 있으면 막기
    if (includedSetComponents().some(({ it }) => it.soldOut)) return false;
    return isSetSelectionValid(setGroupsResolved as any, selected as any, requiredOk as any);
  };

  // 세트 합계 = 세트 기본가 + 포함 구성품 upcharge + 선택 옵션 가격
  const setTotal = (): number => {
    let total = item?.price || 0;
    includedSetComponents().forEach(({ group, it }) => {
      total += Number(it.upcharge) || 0;
      const sel = setOpts[`${group.id}:${it.product_id}`] || [];
      (it.optionGroups || []).forEach((og: any) => og.options.forEach((o: any) => {
        if (sel.includes(String(o.id))) total += Number(o.price) || 0;
      }));
    });
    return total * quantity;
  };

  // Get available option groups for this item - 메뉴에서 설정한 순서대로 정렬
  // Support both formats: array of IDs or array of objects
  const availableOptionGroups = item?.optionGroups
    ? (Array.isArray(item.optionGroups) && item.optionGroups.length > 0 && typeof item.optionGroups[0] === 'object'
        ? item.optionGroups  // Already full objects from API
        : item.optionGroups
            .map((groupId: string) => optionGroups.find((group: any) => group.id === groupId))
            .filter((group: any): group is NonNullable<typeof group> => group !== undefined))  // IDs to filter with order preserved
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
      const group = availableOptionGroups.find((g: any) => g.id === groupId);
      if (group) {
        const groupOptionIds = group.options.map((o: any) => o.id);
        const isCurrentlySelected = selectedOptions.includes(optionId);

        if (isCurrentlySelected && !required) {
          // 이미 선택된 옵션을 다시 클릭 & 필수가 아님 -> 선택 해제
          setSelectedOptions(prev => prev.filter((id: string) => !groupOptionIds.includes(id)));
        } else {
          // 다른 옵션 클릭 또는 필수 옵션 -> 해당 그룹에서 이 옵션만 선택
          setSelectedOptions(prev => [
            ...prev.filter((id: string) => !groupOptionIds.includes(id)),
            optionId
          ]);
        }
      }
    }
  };
  
  const calculateTotal = () => {
    if (!item) return 0;
    if (isSet) return setTotal();   // 세트는 기본가+upcharge+옵션

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
    if (isSet) return isSetValid() && item?.set_available !== false;
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

    // 세트: 구성품 분해(set_components) + 옵션 이름을 카트에 적재
    let setComponents: any[] | undefined;
    if (isSet) {
      setComponents = includedSetComponents().map(({ group, it }) => {
        const sel = setOpts[`${group.id}:${it.product_id}`] || [];
        const optionNames = (it.optionGroups || [])
          .flatMap((og: any) => og.options)
          .filter((o: any) => sel.includes(String(o.id)))
          .map((o: any) => o.name);
        return {
          group_id: group.id,
          group_label: group.label,
          product_id: Number(it.product_id),
          name: it.name,
          qty: it.qty || 1,
          upcharge: Number(it.upcharge) || 0,
          options: optionNames,
        };
      });
    }

    // Create a copy of item with actual option groups instead of IDs
    const itemWithOptions = {
      ...item,
      optionGroups: availableOptionGroups,
      ...(setComponents ? { set_components: setComponents, _setUnitPrice: setTotal() / quantity } : {})
    };

    addToCart(itemWithOptions, quantity, selectedOptions, instructions);
    // 담은 뒤 장바구니로 튀지 않고 메뉴로 복귀 — 카트 뱃지 숫자만 증가하고
    // 사용자는 계속 둘러볼 수 있다 (#4). 메뉴는 직전 탭(?cat=) 그대로 복원된다.
    navigate(-1);
  };
  
  if (isLoading) {
    return (
      <MobileLayout title="Loading..." showBack onBack={() => navigate(-1)}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
          Loading item details...
        </div>
      </MobileLayout>
    );
  }
  
  if (!item) {
    return (
      <MobileLayout title="Item Not Found" showBack onBack={() => navigate(-1)}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>
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

      {/* 세트 v2 — fixed 자동 + choice 피커 + 구성품별 상속옵션 */}
      {isSet && (
        <SetMenuSection>
          <MobileSetOrder
            groups={setGroupsResolved as any}
            selections={setSel}
            onToggleComponent={handleToggleSetComponent}
            componentOptions={setOpts}
            onToggleOption={handleToggleSetOption}
            formatCurrency={(v: number) => formatCurrency(v, currency)}
          />
        </SetMenuSection>
      )}

      {/* 레거시 세트(set_items, resolve 없음) 폴백 표시 */}
      {!isSet && item.is_set_menu && item.set_items && item.set_items.length > 0 && (
        <SetMenuSection>
          <SetMenuTitle>This set includes:</SetMenuTitle>
          <SetMenuItems>
            {item.set_items.map((setItem: any, index: number) => (
              <SetMenuItem key={index}>• {setItem.name} x{setItem.quantity}</SetMenuItem>
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
                  onClick={() => handleOptionToggle(option.id, group.id, group.multiple, group.required)}
                >
                  <div>{option.name}</div>
                  {option.price > 0 && (
                    <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px' }}>
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
                      onChange={() => handleOptionToggle(option.id, group.id, group.multiple, group.required)}
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