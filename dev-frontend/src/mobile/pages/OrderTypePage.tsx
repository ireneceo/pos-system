import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import {
  Utensils, ShoppingBag, Clock, Truck, CalendarDays, ChevronRight, MapPin
} from 'lucide-react';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { API_BASE_URL } from '../../config/api';
import MobileAlertModal from '../components/common/MobileAlertModal';
import OrderingBanner from '../components/OrderingBanner';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { getActiveTable, setActiveTable } from '../utils/tableSession';

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 24px 24px;
  box-sizing: border-box;

  /* Tablet support */
  @media (min-width: 768px) {
    background: #C7CED6;
    padding: 80px 24px 24px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 48px;
`;

const StoreLogo = styled.img`
  max-height: 48px;
  max-width: 220px;
  object-fit: contain;
  margin: 0 0 8px 0;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const BranchName = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  margin: 10px auto 22px;
  width: fit-content;
  background: #F1F4F8;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  letter-spacing: 0.2px;

  svg {
    width: 12px;
    height: 12px;
    color: #635BFF;
    flex-shrink: 0;
  }
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #4B5563;
  margin: 0;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 400px;

  /* Tablet support */
  @media (min-width: 768px) {
    max-width: 500px;
    background: white;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

// 라인 아이콘 + 좌측 정렬 row 카드 (POS 사이드바와 동일한 lucide line 스타일)
const OptionCard = styled.button`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  width: 100%;

  &:hover {
    border-color: #635BFF;
    background: #FAFBFF;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #F4F2FF;
  color: #635BFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s;

  ${OptionCard}:hover & {
    background: #635BFF;
    color: white;
  }

  svg {
    width: 22px;
    height: 22px;
    stroke-width: 1.75;
  }
`;

const OptionBody = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OptionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const OptionSubtitle = styled.div`
  font-size: 12px;
  color: #4B5563;
  font-weight: 400;
`;

const OptionChevron = styled.div`
  color: #6B7280;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  ${OptionCard}:hover & {
    color: #635BFF;
    transform: translateX(2px);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2;
    transition: all 0.15s;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 48px;
  padding-bottom: 24px;
  text-align: center;
  font-size: 12px;
  color: #8898AA;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const FooterLink = styled.button`
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: 12px;
  color: #635BFF;
  cursor: pointer;
  text-decoration: none;
  transition: opacity 0.15s;
  &:hover { opacity: 0.75; }
`;

const TablePickerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  /* Anchor near the TOP (not bottom sheet) so the search dropdown stays visible
     ABOVE the on-screen keyboard — bottom sheet got hidden behind the keyboard. */
  align-items: flex-start;
  justify-content: center;
  padding: 11vh 16px 16px;
  z-index: 9999;
`;

const TablePickerSheet = styled.div`
  background: #fff;
  width: 100%;
  max-width: 420px;
  border-radius: 16px;
  padding: 20px 18px;
  /* overflow visible so the SearchableSelect dropdown isn't clipped */
`;

const TablePickerTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
`;

const TablePickerHint = styled.p`
  margin: 0 0 14px;
  font-size: 13px;
  color: #6B7280;
  line-height: 1.4;
`;

const TableSearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 12px 14px;
  border: 1px solid #C7CED6;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

// Searchable scrolling list (replaces the chip grid — too cluttered with many tables).
// Search filters; matches show as a clean vertical dropdown list that scrolls.
const TableList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #E6EBF1;
  border-radius: 10px;
`;

const TableRow = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  padding: 14px 16px;
  min-height: 48px;
  border: 0;
  border-bottom: 1px solid #F1F4F8;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #1F2937;
  cursor: pointer;
  &:last-child { border-bottom: 0; }
  &:active { background: rgba(99,91,255,0.1); }
`;

const TableEmptyNote = styled.div`
  font-size: 14px;
  color: #6B7280;
  text-align: center;
  padding: 24px 8px;
  line-height: 1.5;
`;

const TableManualInput = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

// iOS Safari auto-zooms (and shifts the layout) when focusing an input whose
// font-size is under 16px. SearchableSelect's inner input is 14px — override to
// 16px here so picking/typing the table number never zooms (Irene 2026-06-12).
const TableSelectWrap = styled.div`
  input { font-size: 16px; }
`;

const TableManualBtn = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  background: #635BFF;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

interface StoreData {
  id: string;
  slug: string;
  name: string;
  branchName: string | null;
  description: string;
  logo: string;
  isOpen: boolean;
  openingHours: Record<string, string>;
  openingTime?: string;
  closingTime?: string;
  timeZone?: string;
  orderTypes?: {
    dineIn: boolean;
    takeaway: boolean;
    pickup: boolean;
    delivery: boolean;
  };
  reservationsEnabled?: boolean;
  pickupSettings?: {
    prepMinutes?: number;
    locationNote?: string;
    confirmationRequired?: boolean;
  };
  takeawaySettings?: {
    prepMinutes?: number;
    packagingNote?: string;
  };
  pauseOrdering?: boolean;
  pauseMessage?: string;
  tableNumberRequired?: boolean;
  floorTables?: string[];
  ordering?: import('../contexts/MobileOrderContext').OrderingState;
}

const OrderTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { setCurrentStore, setIsLoading, clearCart, orderType: currentOrderType, setOrderType, cartItems } = useMobileOrder();
  const [tableFromQR, setTableFromQR] = useState<string | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  // Modal state for cart reset warning
  const [showCartResetModal, setShowCartResetModal] = useState(false);
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [pendingOrderType, setPendingOrderType] = useState<'dine-in' | 'takeaway' | 'pickup' | 'delivery' | null>(null);

  // Set when the URL pins to an unavailable order type — surface as a notice on the picker.
  const [pinFallbackNotice, setPinFallbackNotice] = useState<string | null>(null);
  // True once we've consumed the URL pin so the user is free to override via the picker.
  const autoSkippedRef = React.useRef(false);

  // 매장 응답 → StoreData 매핑 **단일소스**. 마운트 로드와 주문 시작 시 재확정이 같은 것을 쓴다.
  // 매장 id 가 확정되지 않으면 null 을 돌려 호출부가 진행을 멈추게 한다 —
  // 예전 `id: ... || '1'` 폴백은 매장 식별 실패 시 손님 세션을 **1번 매장**에 묶었다(크로스테넌트).
  const mapStoreData = React.useCallback((data: any, fallbackSlug: string): StoreData | null => {
    const id = data?.id != null ? String(data.id).trim() : '';
    if (!/^\d+$/.test(id)) return null;
    return {
      id,
      slug: data.slug || fallbackSlug,
      name: data.name || 'Restaurant',
      branchName: data.branch_name || null,
      description: data.description || 'Welcome to our restaurant',
      logo: data.logo || '/images/store-logo.png',
      isOpen: data.isOpen !== false,
      openingHours: data.openingHours || {},
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      timeZone: data.timeZone,
      orderTypes: data.orderTypes || {
        dineIn: true,
        takeaway: true,
        pickup: false,
        delivery: false
      },
      reservationsEnabled: !!data.reservationsEnabled,
      pickupSettings: data.pickupSettings || undefined,
      takeawaySettings: data.takeawaySettings || undefined,
      pauseOrdering: !!data.pauseOrdering,
      pauseMessage: data.pauseMessage || '',
      tableNumberRequired: !!data.tableNumberRequired,
      floorTables: Array.isArray(data.floorTables) ? data.floorTables : [],
      ordering: data.ordering
    };
  }, []);

  const fetchStoreBySlug = React.useCallback(async (storeSlug: string): Promise<StoreData | null> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mobile/store/${storeSlug}`);
      if (!response.ok) return null;
      const result = await response.json();
      if (!result.success || !result.data) return null;
      return mapStoreData(result.data, storeSlug);
    } catch (error) {
      console.error('Error loading store data:', error);
      return null;
    }
  }, [mapStoreData]);

  // Load store data on mount
  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    fetchStoreBySlug(slug).then((mapped) => {
      if (!cancelled && mapped) setStoreData(mapped);
    });
    return () => { cancelled = true; };
  }, [slug, fetchStoreBySlug]);

  // Helper function to get display name for order type
  const getOrderTypeDisplayName = (type: string): string => {
    const displayNames: Record<string, string> = {
      'dine-in': 'Dine In',
      'takeaway': 'Takeaway',
      'pickup': 'Pre-order Pickup',
      'delivery': 'Delivery'
    };
    return displayNames[type] || type;
  };

  const handleOrderTypeSelection = async (newOrderType: 'dine-in' | 'takeaway' | 'pickup' | 'delivery') => {
    console.log('Order type selected:', newOrderType);
    console.log('Previous order type:', currentOrderType);
    console.log('Cart items count:', cartItems.length);

    // Check if cart has items and order type is different
    if (cartItems.length > 0 && currentOrderType && currentOrderType !== newOrderType) {
      // Show warning modal
      setPendingOrderType(newOrderType);
      setShowCartResetModal(true);
      return;
    }

    // Proceed with selection
    await proceedWithOrderType(newOrderType);
  };

  const proceedWithOrderType = async (newOrderType: 'dine-in' | 'takeaway' | 'pickup' | 'delivery') => {
    setIsLoading(true);

    try {
      const guestToken = 'guest_' + Date.now();
      localStorage.setItem('mobileToken', guestToken);

      const restaurantSlug = slug || sessionStorage.getItem('restaurantSlug');

      if (!restaurantSlug) {
        throw new Error('Restaurant not found');
      }

      // 매장이 아직 안 실렸으면(첫 로드 실패 / 느린 망 경합) 여기서 한 번 더 확정한다.
      // ⛔ 하드코딩 `id: '1'` 폴백 금지 — 그 폴백은 손님 세션·장바구니·주문을 **1번 매장**에
      // 붙여 버렸다(아래 sessionStorage 'restaurantId' 가 그 값을 그대로 쓴다).
      let store = storeData;
      if (!store) {
        store = await fetchStoreBySlug(restaurantSlug);
        if (store) setStoreData(store);
      }
      if (!store) {
        throw new Error('Restaurant not found');
      }

      setCurrentStore(store);

      // If order type changed, clear the cart — but NEVER drop the QR/access-link
      // table number. Irene rule (2026-06-04): a customer who scanned a TABLE QR
      // keeps that table even after switching to takeaway (the takeaway is still
      // delivered to that table). clearCart() wipes tableNumber for a fresh-session
      // reset; here we preserve the scanned table across the order-type switch.
      // Only a genuinely table-less entry (takeaway/generic QR) has nothing to keep.
      if (currentOrderType && currentOrderType !== newOrderType) {
        console.log('Order type changed - clearing cart (preserving scanned table)');
        const qrTable = tableFromQR || getActiveTable();
        clearCart();
        if (qrTable) {
          setActiveTable(qrTable);
          setTableFromQR(qrTable);
        }
      }

      // Update order type in context (syncs with sessionStorage)
      setOrderType(newOrderType);
      sessionStorage.setItem('restaurantId', store.id);

      // Clear any previous pickup time (will be set in PaymentPage)
      sessionStorage.removeItem('scheduledPickupTime');

      // Dine-in table requirement: the customer entered via the generic /
      // representative QR (no table scanned). Force a table pick before the
      // menu so the order lands on the correct Floor Plan table instead of
      // showing up as a table-less "pickup N" order.
      const currentTable = tableFromQR || getActiveTable();
      if (newOrderType === 'dine-in' && storeData?.tableNumberRequired && !currentTable) {
        setShowTablePicker(true);
        setIsLoading(false);
        return;
      }

      navigate(`/mobile/${restaurantSlug}/menu`);
    } catch (error) {
      console.error('Error initializing order:', error);
      alert('Error initializing order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmCartReset = async () => {
    setShowCartResetModal(false);
    if (pendingOrderType) {
      await proceedWithOrderType(pendingOrderType);
    }
    setPendingOrderType(null);
  };

  // Table picked from the in-app picker (generic-QR dine-in flow).
  const handleTablePicked = (tableLabel: string) => {
    const label = (tableLabel || '').trim();
    if (!label) return;
    setActiveTable(label);
    setTableFromQR(label);
    setShowTablePicker(false);
    setTableSearch('');
    const restaurantSlug = slug || sessionStorage.getItem('restaurantSlug');
    navigate(`/mobile/${restaurantSlug}/menu`);
  };

  const handleCancelCartReset = () => {
    setShowCartResetModal(false);
    setPendingOrderType(null);
    // Navigate back to menu with current order type
    if (currentOrderType) {
      const restaurantSlug = slug || sessionStorage.getItem('restaurantSlug');
      navigate(`/mobile/${restaurantSlug}/menu`);
    }
  };

  useEffect(() => {
    const table = searchParams.get('table');
    if (table) {
      // Fresh QR scan. If it differs from the cached table, treat the scan as an
      // ABSOLUTE reset: the old cart belongs to the old table, so wipe it before
      // pinning the new one (stops the old table bleeding onto the new order — the
      // A-4→A22 wrong-table bug). Same table = resume, no reset.
      const prev = getActiveTable();
      if (prev && prev.trim() !== table.trim()) {
        clearCart();
      }
      setTableFromQR(table);
      // Pins both the durable (localStorage) and per-tab (sessionStorage) value so a
      // stale tab can't clobber THIS tab's scan at order time. See utils/tableSession.
      setActiveTable(table);
    } else {
      // Check if table number exists (returning from menu/cart, or resuming after a
      // mobile tab eviction — durable localStorage fallback).
      const existingTable = getActiveTable();
      if (existingTable) {
        setTableFromQR(existingTable);
      }
    }

    if (slug) {
      sessionStorage.setItem('restaurantSlug', slug);
    }
  }, [searchParams, slug, clearCart]);

  // Auto-skip the picker when the URL pins an order type (or implies one via ?table=).
  // Runs after storeData is loaded so we can validate against enabled order types.
  // Triggers exactly once — if the user reaches the picker again (via Change chip on Menu),
  // we don't loop back into auto-skip.
  useEffect(() => {
    if (!storeData || autoSkippedRef.current) return;
    if (showCartResetModal) return;

    const isPickerNav = searchParams.get('picker') === '1';
    if (isPickerNav) {
      autoSkippedRef.current = true;
      return;
    }

    const enabled = storeData.orderTypes;
    if (!enabled) return;

    const explicit = searchParams.get('order_type');
    const validKeys: Record<string, keyof typeof enabled> = {
      'dine-in': 'dineIn', 'takeaway': 'takeaway', 'pickup': 'pickup', 'delivery': 'delivery'
    };

    let resolved: 'dine-in' | 'takeaway' | 'pickup' | 'delivery' | null = null;

    if (explicit && validKeys[explicit]) {
      if (enabled[validKeys[explicit]]) {
        resolved = explicit as any;
      } else {
        setPinFallbackNotice(
          getOrderTypeDisplayName(explicit) + ' is not currently available at this restaurant. Please choose another option.'
        );
        autoSkippedRef.current = true;
        return;
      }
    } else if (!explicit && searchParams.get('table')) {
      // Table-only QR → dine-in is the only sensible interpretation.
      if (enabled.dineIn) {
        resolved = 'dine-in';
      }
    }

    if (resolved) {
      autoSkippedRef.current = true;
      // Reuse the existing flow so cart-reset modal still triggers if needed.
      handleOrderTypeSelection(resolved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeData, searchParams, showCartResetModal]);

  const orderTypes = storeData?.orderTypes || null;

  return (
    <Container>
      <Header>
        {storeData?.logo && storeData.logo !== '/images/store-logo.png' ? (
          <>
            <StoreLogo src={storeData.logo} alt={storeData.name} />
            {storeData.branchName && (
              <BranchName>
                <MapPin /> {storeData.branchName}
              </BranchName>
            )}
          </>
        ) : (
          <>
            <Title>{storeData?.name || 'Welcome'}</Title>
            {storeData?.branchName && (
              <BranchName>
                <MapPin /> {storeData.branchName}
              </BranchName>
            )}
          </>
        )}
        <Subtitle>How would you like your order?</Subtitle>
      </Header>

      {tableFromQR && (
        <div style={{
          margin: '0 0 24px 0',
          padding: '12px 20px',
          background: '#F0F4FF',
          borderRadius: '8px',
          color: '#635BFF',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          border: '1px solid #C7D2FE'
        }}>
          {tableFromQR}
        </div>
      )}

      {pinFallbackNotice && (
        <div style={{
          margin: '0 0 24px 0',
          padding: '12px 20px',
          background: '#FEF3C7',
          borderRadius: '8px',
          color: '#92400E',
          fontSize: '14px',
          fontWeight: '500',
          textAlign: 'center',
          border: '1px solid #FCD34D',
          maxWidth: '400px'
        }}>
          {pinFallbackNotice}
        </div>
      )}

      <OptionsContainer>
        {!orderTypes ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#6B7280', fontSize: '14px' }}>Loading...</div>
        ) : storeData?.pauseOrdering ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 24px',
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            borderRadius: '12px',
            color: '#7F1D1D'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>⏸</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '8px' }}>
              Mobile ordering paused
            </div>
            <div style={{ fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
              {storeData.pauseMessage || `${storeData?.name || 'This restaurant'} is not accepting mobile orders right now. Please order in person at the counter, or check back later.`}
            </div>
          </div>
        ) : (() => {
          const anyEnabled = orderTypes.dineIn || orderTypes.takeaway || orderTypes.pickup || orderTypes.delivery;
          if (!anyEnabled) {
            return (
              <div style={{
                textAlign: 'center',
                padding: '40px 24px',
                background: '#FFF8E1',
                border: '1px solid #FFE082',
                borderRadius: '12px',
                color: '#6B5B20'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛎️</div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '8px' }}>
                  Mobile ordering is currently unavailable
                </div>
                <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                  {storeData?.name || 'This restaurant'} is not accepting mobile orders right now.
                  Please order in person at the counter, or check back later.
                </div>
              </div>
            );
          }
          // Business-hours/last-order gate: immediate types (dine-in/takeaway/delivery)
          // are blocked when closed; pickup pre-order stays available (guided to a valid time).
          const timeClosed = !!(storeData?.ordering?.enabled && !storeData.ordering.canOrder);
          const disabledCardStyle: React.CSSProperties = { opacity: 0.45, cursor: 'not-allowed' };
          return (
            <>
              {timeClosed && (
                <OrderingBanner
                  ordering={storeData?.ordering}
                  pickupAvailable={!!orderTypes.pickup}
                  style={{ marginBottom: '16px' }}
                />
              )}
              {orderTypes.dineIn && (
                <OptionCard
                  onClick={timeClosed ? undefined : () => handleOrderTypeSelection('dine-in')}
                  style={timeClosed ? disabledCardStyle : undefined}
                >
                  <OptionIcon><Utensils /></OptionIcon>
                  <OptionBody>
                    <OptionTitle>Dine In</OptionTitle>
                    <OptionSubtitle>Order from your table</OptionSubtitle>
                  </OptionBody>
                  <OptionChevron><ChevronRight /></OptionChevron>
                </OptionCard>
              )}
              {orderTypes.takeaway && (
                <OptionCard
                  onClick={timeClosed ? undefined : () => handleOrderTypeSelection('takeaway')}
                  style={timeClosed ? disabledCardStyle : undefined}
                >
                  <OptionIcon><ShoppingBag /></OptionIcon>
                  <OptionBody>
                    <OptionTitle>Takeaway</OptionTitle>
                    <OptionSubtitle>
                      {storeData?.takeawaySettings?.prepMinutes
                        ? `Ready in ~${storeData.takeawaySettings.prepMinutes} min · pick up at counter`
                        : 'Order and pick up at counter'}
                    </OptionSubtitle>
                  </OptionBody>
                  <OptionChevron><ChevronRight /></OptionChevron>
                </OptionCard>
              )}
              {orderTypes.pickup && (
                <OptionCard onClick={() => handleOrderTypeSelection('pickup')}>
                  <OptionIcon><Clock /></OptionIcon>
                  <OptionBody>
                    <OptionTitle>Pre-order Pickup</OptionTitle>
                    <OptionSubtitle>
                      {storeData?.pickupSettings?.prepMinutes
                        ? `Schedule a pickup · prep time ~${storeData.pickupSettings.prepMinutes} min`
                        : 'Schedule a pickup time'}
                    </OptionSubtitle>
                  </OptionBody>
                  <OptionChevron><ChevronRight /></OptionChevron>
                </OptionCard>
              )}
              {orderTypes.delivery && (
                <OptionCard
                  onClick={timeClosed ? undefined : () => handleOrderTypeSelection('delivery')}
                  style={timeClosed ? disabledCardStyle : undefined}
                >
                  <OptionIcon><Truck /></OptionIcon>
                  <OptionBody>
                    <OptionTitle>Delivery</OptionTitle>
                    <OptionSubtitle>Order delivered to your address</OptionSubtitle>
                  </OptionBody>
                  <OptionChevron><ChevronRight /></OptionChevron>
                </OptionCard>
              )}
              {storeData?.reservationsEnabled && (
                <OptionCard onClick={() => navigate(`/mobile/${slug}/reservation`)}>
                  <OptionIcon><CalendarDays /></OptionIcon>
                  <OptionBody>
                    <OptionTitle>Reserve a Table</OptionTitle>
                    <OptionSubtitle>Book a table in advance</OptionSubtitle>
                  </OptionBody>
                  <OptionChevron><ChevronRight /></OptionChevron>
                </OptionCard>
              )}
            </>
          );
        })()}
      </OptionsContainer>

      <Footer>
        <FooterLinks>
          {user?.restaurantId ? (
            <FooterLink type="button" onClick={() => navigate(`/restaurant/${user.restaurantId}/dashboard`)}>
              ← {t('common:backToDashboard', 'Back to Dashboard')}
            </FooterLink>
          ) : (
            <FooterLink type="button" onClick={() => navigate('/')}>
              {t('common:visitHomepage', 'Visit PurpleHere homepage')}
            </FooterLink>
          )}
        </FooterLinks>
        <a href="https://purplehere.com" target="_blank" rel="noopener noreferrer"
           style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px dotted currentColor' }}>
          Powered by Purple Here POS
        </a>
      </Footer>

      {/* Cart Reset Warning Modal */}
      <MobileAlertModal
        isOpen={showCartResetModal}
        onClose={handleCancelCartReset}
        type="warning"
        title="Change Order Type?"
        message={`You are currently ordering as ${getOrderTypeDisplayName(currentOrderType || '')}. Changing to ${getOrderTypeDisplayName(pendingOrderType || '')} will reset your cart.`}
        confirmText="Continue"
        cancelText="Back to Menu"
        onConfirm={handleConfirmCartReset}
        showCancel={true}
      />

      {/* Dine-in table picker — shown when the store requires a table and the
          customer arrived without one (generic / representative QR). */}
      {showTablePicker && (() => {
        const tables = storeData?.floorTables || [];
        const hasTables = tables.length > 0;
        return (
          <TablePickerOverlay onClick={() => setShowTablePicker(false)}>
            <TablePickerSheet onClick={(e) => e.stopPropagation()}>
              <TablePickerTitle>{t('common:selectYourTable', 'Select your table')}</TablePickerTitle>
              <TablePickerHint>
                {t('common:selectYourTableHint', 'Please choose the table you are seated at to continue your dine-in order.')}
              </TablePickerHint>
              {hasTables ? (
                <TableSelectWrap>
                  <SearchableSelect
                    options={tables.map(tb => ({ value: tb, label: tb }))}
                    value={null}
                    onChange={(v) => { if (v != null && String(v).trim()) handleTablePicked(String(v)); }}
                    placeholder={t('common:searchTablePlaceholder', 'Search table number')}
                    noOptionsMessage={t('common:noTableMatch', 'No matching table. Check the number on your table.')}
                  />
                </TableSelectWrap>
              ) : (
                <>
                  <TableSearchInput
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    placeholder={t('common:enterTablePlaceholder', 'Enter your table number')}
                  />
                  <TableManualInput>
                    <TableManualBtn
                      disabled={!tableSearch.trim()}
                      onClick={() => handleTablePicked(tableSearch)}
                      style={{ width: '100%' }}
                    >
                      {t('common:continue', 'Continue')}
                    </TableManualBtn>
                  </TableManualInput>
                </>
              )}
            </TablePickerSheet>
          </TablePickerOverlay>
        );
      })()}
    </Container>
  );
};

export default OrderTypePage;
