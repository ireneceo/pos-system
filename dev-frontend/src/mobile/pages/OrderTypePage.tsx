import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { API_BASE_URL } from '../../config/api';

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

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
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
  const { setCurrentStore, setIsLoading } = useMobileOrder();
  const [tableFromQR, setTableFromQR] = useState<string | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);

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

  const handleOrderTypeSelection = async (orderType: 'dine-in' | 'takeaway' | 'pickup' | 'delivery') => {
    console.log('Order type selected:', orderType);
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

      // Store order type and restaurant ID in session
      sessionStorage.setItem('orderType', orderType);
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

  useEffect(() => {
    const table = searchParams.get('table');
    if (table) {
      setTableFromQR(table);
      sessionStorage.setItem('tableNumber', table);
    }

    if (slug) {
      sessionStorage.setItem('restaurantSlug', slug);
    }
  }, [searchParams, slug]);

  const orderTypes = storeData?.orderTypes || { dineIn: true, takeaway: true, pickup: false, delivery: false };

  return (
    <Container>
      <Header>
        <Title>{storeData?.name || 'Welcome'}</Title>
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
          Table {tableFromQR}
        </div>
      )}

      <OptionsContainer>
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

        {/* Pre-order Pickup과 Delivery는 테이블 QR 접속 시 숨김 (매장에 있으니까) */}
        {!tableFromQR && orderTypes.pickup && (
          <OptionCard onClick={() => handleOrderTypeSelection('pickup')}>
            <OptionIcon>📦</OptionIcon>
            <OptionTitle>Pre-order Pickup</OptionTitle>
          </OptionCard>
        )}

        {!tableFromQR && orderTypes.delivery && (
          <OptionCard onClick={() => handleOrderTypeSelection('delivery')}>
            <OptionIcon>🚚</OptionIcon>
            <OptionTitle>Delivery</OptionTitle>
          </OptionCard>
        )}
      </OptionsContainer>

      <Footer>
        Powered by Purple Here POS
      </Footer>
    </Container>
  );
};

export default OrderTypePage;
