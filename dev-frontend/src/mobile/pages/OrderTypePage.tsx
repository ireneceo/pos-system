import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { API_BASE_URL } from '../../config/api';
import MobileAlertModal from '../components/common/MobileAlertModal';

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 60px 24px 24px;
  box-sizing: border-box;

  /* Tablet support */
  @media (min-width: 768px) {
    background: #E5E7EB;
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

const BranchName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin: 4px 0 0 0;
  letter-spacing: 0.3px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #6B7C93;
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

const OptionCard = styled.button`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 32px 24px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionIcon = styled.div`
  font-size: 48px;
  margin-bottom: 4px;
`;

const OptionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 48px;
  padding-bottom: 24px;
  text-align: center;
  font-size: 12px;
  color: #8898AA;
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
}

const OrderTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { setCurrentStore, setIsLoading, clearCart, orderType: currentOrderType, setOrderType, cartItems } = useMobileOrder();
  const [tableFromQR, setTableFromQR] = useState<string | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

  // Modal state for cart reset warning
  const [showCartResetModal, setShowCartResetModal] = useState(false);
  const [pendingOrderType, setPendingOrderType] = useState<'dine-in' | 'takeaway' | 'pickup' | 'delivery' | null>(null);

  // Load store data on mount
  useEffect(() => {
    const loadStoreData = async () => {
      if (!slug) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/mobile/store/${slug}`);
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            console.log('Store data loaded:', result.data);
            setStoreData({
              id: result.data.id?.toString() || '1',
              slug: result.data.slug || slug,
              name: result.data.name || 'Restaurant',
              branchName: result.data.branch_name || null,
              description: result.data.description || 'Welcome to our restaurant',
              logo: result.data.logo || '/images/store-logo.png',
              isOpen: result.data.isOpen !== false,
              openingHours: result.data.openingHours || {},
              openingTime: result.data.openingTime,
              closingTime: result.data.closingTime,
              timeZone: result.data.timeZone,
              orderTypes: result.data.orderTypes || {
                dineIn: true,
                takeaway: true,
                pickup: false,
                delivery: false
              }
            });
          }
        }
      } catch (error) {
        console.error('Error loading store data:', error);
      }
    };

    loadStoreData();
  }, [slug]);

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

      const store = storeData || {
        id: '1',
        slug: restaurantSlug,
        name: 'Restaurant',
        description: 'Welcome to our restaurant',
        logo: '/images/store-logo.png',
        isOpen: true,
        openingHours: {}
      };

      setCurrentStore(store);

      // If order type changed, clear the cart
      if (currentOrderType && currentOrderType !== newOrderType) {
        console.log('Order type changed - clearing cart');
        clearCart();
      }

      // Update order type in context (syncs with sessionStorage)
      setOrderType(newOrderType);
      sessionStorage.setItem('restaurantId', store.id);

      // Clear any previous pickup time (will be set in PaymentPage)
      sessionStorage.removeItem('scheduledPickupTime');

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
      // Table from URL parameter (QR code scan)
      setTableFromQR(table);
      sessionStorage.setItem('tableNumber', table);
    } else {
      // Check if table number exists in sessionStorage (returning from menu/cart)
      const existingTable = sessionStorage.getItem('tableNumber');
      if (existingTable) {
        setTableFromQR(existingTable);
      }
    }

    if (slug) {
      sessionStorage.setItem('restaurantSlug', slug);
    }
  }, [searchParams, slug]);

  const orderTypes = storeData?.orderTypes || null;

  return (
    <Container>
      <Header>
        {storeData?.logo && storeData.logo !== '/images/store-logo.png' ? (
          <>
            <StoreLogo src={storeData.logo} alt={storeData.name} />
            {storeData.branchName && <BranchName>{storeData.branchName}</BranchName>}
          </>
        ) : (
          <>
            <Title>{storeData?.name || 'Welcome'}</Title>
            {storeData?.branchName && <BranchName>{storeData.branchName}</BranchName>}
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

      <OptionsContainer>
        {!orderTypes ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#9CA3AF', fontSize: '14px' }}>Loading...</div>
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
          return (
            <>
              {orderTypes.dineIn && (
                <OptionCard onClick={() => handleOrderTypeSelection('dine-in')}>
                  <OptionIcon>🍽️</OptionIcon>
                  <OptionTitle>Dine In</OptionTitle>
                </OptionCard>
              )}
              {orderTypes.takeaway && (
                <OptionCard onClick={() => handleOrderTypeSelection('takeaway')}>
                  <OptionIcon>🥡</OptionIcon>
                  <OptionTitle>Takeaway</OptionTitle>
                </OptionCard>
              )}
              {orderTypes.pickup && (
                <OptionCard onClick={() => handleOrderTypeSelection('pickup')}>
                  <OptionIcon>📦</OptionIcon>
                  <OptionTitle>Pre-order Pickup</OptionTitle>
                </OptionCard>
              )}
              {orderTypes.delivery && (
                <OptionCard onClick={() => handleOrderTypeSelection('delivery')}>
                  <OptionIcon>🚚</OptionIcon>
                  <OptionTitle>Delivery</OptionTitle>
                </OptionCard>
              )}
            </>
          );
        })()}
      </OptionsContainer>

      <Footer>
        Powered by Purple Here POS
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
    </Container>
  );
};

export default OrderTypePage;
