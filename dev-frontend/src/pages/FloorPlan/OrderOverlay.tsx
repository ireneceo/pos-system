import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useMenu } from '../../contexts/MenuContext';
import { useStore } from '../../contexts/StoreContext';
import { useOrders } from '../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';
import { FloorTable, TableStatusInfo } from './types';
import { formatCurrency } from '../../utils/currency';
import OptionModal from '../../components/POSTerminal/OptionModal';
import { useTranslation } from 'react-i18next';

interface OrderOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  tableInfo: FloorTable | undefined;
  statusInfo: TableStatusInfo | undefined;
  mode: 'new' | 'add';
  restaurantId: number;
  currency: string;
  onOrderComplete: () => void;
}

interface CartItem {
  id: string;
  menuItem: {
    id: string;
    name: string;
    price: number;
    emoji: string;
    image?: string;
    is_set_menu?: boolean;
    set_items?: any[];
  };
  quantity: number;
  options?: string[];
  selectedOptionsData?: { id: string; name: string; price: number }[];
}

// ─── Styled Components (POS Terminal 동일) ───

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: ${p => p.$isOpen ? 'flex' : 'none'};
  background: rgba(0, 0, 0, 0.5);
  align-items: stretch;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const OverlayContent = styled.div`
  width: 100%;
  max-width: 1200px;
  background: #FAFBFC;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    border-radius: 0;
    max-width: 100%;
  }
`;

const OverlayHeader = styled.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const OverlayTitle = styled.div`
  h2 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
  span {
    font-size: 13px;
    color: #6B7C93;
    font-weight: 500;
  }
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #6B7C93;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.15s;
  &:hover { background: #F3F4F6; color: #0A2540; }
`;

const MainLayout = styled.div`
  flex: 1;
  display: flex;
  min-height: 0;
`;

// ─── Menu Section (POS 동일) ───

const MenuSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const SearchSection = styled.div`
  padding: 16px 24px;
  background: white;
  border-bottom: 1px solid #E6EBF1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder { color: #8898AA; }
`;

const CategoryTabs = styled.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar { height: 3px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`;

const CategoryTab = styled.button<{ $active: boolean }>`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
  color: ${p => p.$active ? '#635BFF' : '#6B7C93'};

  &:hover { color: #635BFF; }

  ${p => p.$active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #635BFF;
    }
  `}
`;

const MenuGrid = styled.div`
  flex: 1;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
  overflow-y: auto;
  align-content: start;

  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 3px; }
`;

const MenuCard = styled.div<{ $soldOut?: boolean }>`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  cursor: ${p => p.$soldOut ? 'not-allowed' : 'pointer'};
  opacity: ${p => p.$soldOut ? 0.5 : 1};
  transition: all 0.15s;
  text-align: center;
  position: relative;

  &:hover {
    ${p => !p.$soldOut && `
      border-color: #C7D2FE;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    `}
  }

  &:active {
    ${p => !p.$soldOut && 'transform: translateY(0);'}
  }
`;

const MenuImage = styled.div<{ $hasImage?: boolean }>`
  width: 100%;
  height: 80px;
  background: #F6F9FC;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${p => p.$hasImage ? '0' : '36px'};
  color: #C7D2FE;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
`;

const MenuPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`;

const MenuItemActions = styled.div`
  display: flex;
  margin-top: 12px;
  width: 100%;
`;

const OptionButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: #635BFF;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }

  &:active { transform: translateY(0); }
`;

const SoldOutBadge = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FF6B6B;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
`;

const SetBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`;

const EmptyMenu = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #9CA3AF;
  font-size: 14px;
`;

// ─── Order Section (POS 동일) ───

const OrderSection = styled.div`
  width: 400px;
  min-width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 320px;
    min-width: 320px;
  }
`;

const OrderHeader = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #0A2540;
`;

const GuestSection = styled.div`
  padding: 12px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const GuestLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`;

const GuestSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 80px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const ScrollableOrderContent = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-track { background: #F6F9FC; }
  &::-webkit-scrollbar-thumb { background: #C7D2FE; border-radius: 2px; }
`;

const OrderItems = styled.div`
  padding: 16px 24px;
`;

const OrderItemsHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: #6B7C93;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6B7C93;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }

  &:active { background: #F0F4FF; }
`;

const Quantity = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`;

const DeleteBtn = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #FFF4F4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #FF6B6B;
  transition: all 0.15s;

  &:hover { background: #FFE6E6; }
`;

const EmptyOrder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #9CA3AF;
  font-size: 14px;
  gap: 8px;
  padding: 40px;
`;

const OrderSummary = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;

  &:last-child { margin-bottom: 0; }
`;

const SummaryLabel = styled.span`
  color: #6B7C93;
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: #0A2540;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;

  ${SummaryLabel} { color: #0A2540; }
  ${SummaryValue} { color: #635BFF; }
`;

const OrderActions = styled.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`;

const ActionBtn = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  ${p => p.$variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5243E0;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }

    &:active { transform: translateY(0); }
  ` : `
    background: white;
    color: #6B7C93;
    border: 1px solid #E6EBF1;

    &:hover {
      border-color: #C7D2FE;
      color: #635BFF;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// ─── Component ───

const OrderOverlay: React.FC<OrderOverlayProps> = ({
  isOpen,
  onClose,
  tableNumber,
  tableInfo,
  statusInfo,
  mode,
  restaurantId,
  currency,
  onOrderComplete
}) => {
  const { t } = useTranslation('floorplan');
  const { categories, menuItems, getItemsByCategory } = useMenu();
  const { operationSettings } = useStore();
  const { addOrder } = useOrders();
  const { user } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [guestCount, setGuestCount] = useState<number>(statusInfo?.guestCount || 0);
  const [submitting, setSubmitting] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null);

  // Auto-select first category
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  // Reset state when overlay opens
  useEffect(() => {
    if (isOpen) {
      setCart([]);
      setSearchQuery('');
      setGuestCount(statusInfo?.guestCount || 0);
      setSubmitting(false);
      if (categories.length > 0) {
        setSelectedCategory(categories[0].id);
      }
    }
  }, [isOpen, statusInfo, categories]);

  // Filter menu items
  const filteredItems = useMemo(() => {
    if (searchQuery.trim()) {
      return menuItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      return getItemsByCategory(selectedCategory);
    }
    return menuItems;
  }, [searchQuery, selectedCategory, menuItems, getItemsByCategory]);

  // Cart calculations
  const cartCalc = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => {
      const optionsPrice = (item.selectedOptionsData || []).reduce((s, o) => s + o.price, 0);
      return sum + (item.menuItem.price + optionsPrice) * item.quantity;
    }, 0);

    const taxRate = operationSettings?.taxEnabled ? (operationSettings.taxRate || 0) : 0;
    const serviceChargeRate = operationSettings?.serviceChargeEnabled ? (operationSettings.serviceChargeRate || 0) : 0;

    const tax = subtotal * (taxRate / 100);
    const serviceCharge = subtotal * (serviceChargeRate / 100);
    const total = subtotal + tax + serviceCharge;

    return { subtotal, tax, serviceCharge, total, taxRate, serviceChargeRate };
  }, [cart, operationSettings]);

  // Add item to cart
  const addToCart = useCallback((menuItem: any, quantity: number, optionNames: string[], optionData?: any[]) => {
    const itemId = `${menuItem.id}_${Date.now()}`;
    setCart(prev => [
      ...prev,
      {
        id: itemId,
        menuItem: {
          id: String(menuItem.id),
          name: menuItem.name,
          price: menuItem.price,
          emoji: menuItem.emoji || '',
          image: menuItem.image,
          is_set_menu: menuItem.is_set_menu,
          set_items: menuItem.set_items
        },
        quantity,
        options: optionNames,
        selectedOptionsData: optionData
      }
    ]);
  }, []);

  // Handle menu item click
  const handleMenuItemClick = useCallback((item: any) => {
    if (item.soldOut) return;
    if (item.optionGroups && item.optionGroups.length > 0) {
      setSelectedMenuItem(item);
      setShowOptionModal(true);
    } else {
      addToCart(item, 1, []);
    }
  }, [addToCart]);

  // Update cart quantity
  const updateQty = useCallback((cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === cartId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null as any;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean));
  }, []);

  // Remove item
  const removeItem = useCallback((cartId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartId));
  }, []);

  // Submit order (new order)
  const handleSubmitNewOrder = async () => {
    if (cart.length === 0 || submitting) return;
    setSubmitting(true);

    try {
      const order = {
        id: `fp-${Date.now()}`,
        orderNumber: '',
        customer: {
          name: 'Walk-in Customer',
          phone: ''
        },
        items: cart.map(item => ({
          id: item.id,
          menuItem: item.menuItem,
          quantity: item.quantity,
          options: item.options
        })),
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        subtotal: cartCalc.subtotal,
        tax: cartCalc.tax,
        discount: 0,
        total: cartCalc.total,
        paymentMethod: '',
        paymentStatus: 'pending' as const,
        orderType: 'dine-in' as const,
        orderSource: 'pos' as const,
        tableNumber,
        guest_count: guestCount || null,
        serviceCharge: cartCalc.serviceCharge,
        serviceChargeRate: cartCalc.serviceChargeRate,
        taxRate: cartCalc.taxRate,
        cashier_id: user?.id || null,
        cashier_name: user?.name || user?.full_name || null
      };

      await addOrder(order as any, restaurantId);
      onOrderComplete();
    } catch (err) {
      console.error('Failed to create order:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Submit add items to existing order
  const handleSubmitAddItems = async () => {
    if (cart.length === 0 || submitting || !statusInfo?.orderId) return;
    setSubmitting(true);

    try {
      const token = localStorage.getItem('auth_token');
      const items = cart.map(item => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price,
        options: item.options || []
      }));

      const res = await fetch(`/api/orders/${statusInfo.orderId}/add-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ items })
      });

      if (res.ok) {
        onOrderComplete();
      }
    } catch (err) {
      console.error('Failed to add items:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = mode === 'new' ? handleSubmitNewOrder : handleSubmitAddItems;

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <OverlayContent onClick={(e) => e.stopPropagation()}>
          <OverlayHeader>
            <OverlayTitle>
              <h2>{mode === 'new' ? 'New Order' : 'Add Items'} — Table {tableNumber}</h2>
              <span>
                {tableInfo ? `${tableInfo.seats} seats` : ''}
                {mode === 'add' && statusInfo?.orderNumber ? ` · Order ${statusInfo.orderNumber}` : ''}
              </span>
            </OverlayTitle>
            <CloseBtn onClick={onClose}>&times;</CloseBtn>
          </OverlayHeader>

          <MainLayout>
            {/* Left: Menu (POS 동일) */}
            <MenuSection>
              <SearchSection>
                <SearchInput
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </SearchSection>

              <CategoryTabs>
                <CategoryTab
                  $active={!selectedCategory}
                  onClick={() => { setSelectedCategory(null); setSearchQuery(''); }}
                >
                  All
                </CategoryTab>
                {categories.map(cat => (
                  <CategoryTab
                    key={cat.id}
                    $active={selectedCategory === cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                  >
                    {cat.emoji} {cat.name}
                  </CategoryTab>
                ))}
              </CategoryTabs>

              <MenuGrid>
                {filteredItems.map(item => (
                  <MenuCard
                    key={item.id}
                    $soldOut={item.soldOut}
                    onClick={() => handleMenuItemClick(item)}
                  >
                    {(item as any).is_set_menu && <SetBadge>{'SET'}</SetBadge>}
                    <MenuImage $hasImage={!!item.image}>
                      {item.image
                        ? <img src={item.image} alt={item.name} />
                        : item.emoji}
                    </MenuImage>
                    <MenuName>{item.name}</MenuName>
                    <MenuPrice>{formatCurrency(item.price, currency)}</MenuPrice>
                    <MenuItemActions>
                      <OptionButton onClick={(e) => { e.stopPropagation(); handleMenuItemClick(item); }}>
                        + Add
                      </OptionButton>
                    </MenuItemActions>
                    {item.soldOut && <SoldOutBadge>{'SOLD OUT'}</SoldOutBadge>}
                  </MenuCard>
                ))}
                {filteredItems.length === 0 && (
                  <EmptyMenu>{'No items found'}</EmptyMenu>
                )}
              </MenuGrid>
            </MenuSection>

            {/* Right: Order (POS 동일) */}
            <OrderSection>
              <OrderHeader>
                <OrderTitle>
                  Table {tableNumber}
                </OrderTitle>
                <span style={{ fontSize: '13px', color: '#6B7C93' }}>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </OrderHeader>

              {mode === 'new' && (
                <GuestSection>
                  <GuestLabel>Guests:</GuestLabel>
                  <GuestSelect value={guestCount} onChange={e => setGuestCount(Number(e.target.value))}>
                    <option value={0}>-</option>
                    {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </GuestSelect>
                </GuestSection>
              )}

              {cart.length > 0 ? (
                <ScrollableOrderContent>
                  <OrderItems>
                    <OrderItemsHeader>{totalItems} {totalItems === 1 ? 'item' : 'items'}</OrderItemsHeader>
                    {cart.map(item => (
                      <OrderItem key={item.id}>
                        <ItemInfo>
                          <ItemName>{item.menuItem.name}</ItemName>
                          {item.options && item.options.length > 0 && (
                            <ItemOptions>{item.options.join(', ')}</ItemOptions>
                          )}
                        </ItemInfo>
                        <ItemControls>
                          <QuantityControl>
                            <QuantityBtn onClick={() => updateQty(item.id, -1)}>-</QuantityBtn>
                            <Quantity>{item.quantity}</Quantity>
                            <QuantityBtn onClick={() => updateQty(item.id, 1)}>+</QuantityBtn>
                          </QuantityControl>
                          <ItemPrice>
                            {formatCurrency(
                              (item.menuItem.price + (item.selectedOptionsData || []).reduce((s, o) => s + o.price, 0)) * item.quantity,
                              currency
                            )}
                          </ItemPrice>
                          <DeleteBtn onClick={() => removeItem(item.id)}>✕</DeleteBtn>
                        </ItemControls>
                      </OrderItem>
                    ))}
                  </OrderItems>
                </ScrollableOrderContent>
              ) : (
                <EmptyOrder>
                  <span style={{ fontSize: '36px', opacity: 0.3 }}>&#x1F4CB;</span>
                  <span>{'No items in order'}</span>
                  <span style={{ fontSize: '12px' }}>{'Select menu items to start'}</span>
                </EmptyOrder>
              )}

              <OrderSummary>
                <SummaryRow>
                  <SummaryLabel>{'Subtotal'}</SummaryLabel>
                  <SummaryValue>{formatCurrency(cartCalc.subtotal, currency)}</SummaryValue>
                </SummaryRow>
                {cartCalc.tax > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Tax ({cartCalc.taxRate}%)</SummaryLabel>
                    <SummaryValue>{formatCurrency(cartCalc.tax, currency)}</SummaryValue>
                  </SummaryRow>
                )}
                {cartCalc.serviceCharge > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Service ({cartCalc.serviceChargeRate}%)</SummaryLabel>
                    <SummaryValue>{formatCurrency(cartCalc.serviceCharge, currency)}</SummaryValue>
                  </SummaryRow>
                )}
                <TotalRow>
                  <SummaryLabel>{'Total'}</SummaryLabel>
                  <SummaryValue>{formatCurrency(cartCalc.total, currency)}</SummaryValue>
                </TotalRow>
              </OrderSummary>

              <OrderActions>
                <ActionBtn $variant="secondary" onClick={onClose}>
                  Cancel
                </ActionBtn>
                <ActionBtn
                  $variant="primary"
                  onClick={handleSubmit}
                  disabled={cart.length === 0 || submitting}
                >
                  {submitting ? 'Submitting...' : mode === 'new' ? 'Submit Order' : 'Add Items'}
                </ActionBtn>
              </OrderActions>
            </OrderSection>
          </MainLayout>
        </OverlayContent>
      </Overlay>

      {/* Option Modal (reused from POS Terminal, no modification) */}
      {showOptionModal && selectedMenuItem && (
        <OptionModal
          isOpen={showOptionModal}
          onClose={() => setShowOptionModal(false)}
          menuItem={{
            id: String(selectedMenuItem.id),
            name: selectedMenuItem.name,
            price: selectedMenuItem.price,
            emoji: selectedMenuItem.emoji || '',
            image: selectedMenuItem.image,
            optionGroups: selectedMenuItem.optionGroups
          }}
          onConfirm={(qty, optNames, optData) => {
            addToCart(selectedMenuItem, qty, optNames, optData);
            setShowOptionModal(false);
          }}
        />
      )}
    </>
  );
};

export default OrderOverlay;
