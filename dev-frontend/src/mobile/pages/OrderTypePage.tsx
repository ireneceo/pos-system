import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useMobileOrder } from '../contexts/MobileOrderContext';

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
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
  margin: 0 0 6px 0;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 12px;
  color: #8898AA;
`;

const OrderTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { setCurrentStore, setIsLoading } = useMobileOrder();
  const [tableFromQR, setTableFromQR] = useState<string | null>(null);

  const handleOrderTypeSelection = async (orderType: 'dine-in' | 'takeaway' | 'delivery') => {
    console.log('Order type selected:', orderType);
    setIsLoading(true);

    try {
      // Simple localStorage-based approach - no server needed
      const guestToken = 'guest_' + Date.now();
      localStorage.setItem('mobileToken', guestToken);

      // Get restaurant slug from URL or session
      const restaurantSlug = slug || sessionStorage.getItem('restaurantSlug');

      if (!restaurantSlug) {
        throw new Error('Restaurant not found');
      }

      // Try to fetch actual restaurant data by slug
      let store: any;
      try {
        const response = await fetch(`/api/restaurants/slug/${restaurantSlug}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched restaurant data:', data);
          store = {
            id: data.id || '1',
            slug: data.slug || restaurantSlug,
            name: data.name || 'Restaurant',
            description: data.description || 'Welcome to our restaurant',
            logo: data.logo || '/images/store-logo.png',
            isOpen: true,
            openingHours: data.opening_hours || {
              monday: '10:00 - 22:00',
              tuesday: '10:00 - 22:00',
              wednesday: '10:00 - 22:00',
              thursday: '10:00 - 22:00',
              friday: '10:00 - 23:00',
              saturday: '10:00 - 23:00',
              sunday: '10:00 - 22:00'
            }
          };
        } else {
          throw new Error('Restaurant not found');
        }
      } catch (error) {
        console.error('Error fetching restaurant:', error);
        // Fallback to default store
        store = {
          id: '1',
          slug: restaurantSlug,
          name: 'Restaurant',
          description: 'Welcome to our restaurant',
          logo: '/images/store-logo.png',
          isOpen: true,
          openingHours: {
            monday: '10:00 - 22:00',
            tuesday: '10:00 - 22:00',
            wednesday: '10:00 - 22:00',
            thursday: '10:00 - 22:00',
            friday: '10:00 - 23:00',
            saturday: '10:00 - 23:00',
            sunday: '10:00 - 22:00'
          }
        };
      }

      setCurrentStore(store);

      // Store order type and restaurant ID in session
      sessionStorage.setItem('orderType', orderType);
      sessionStorage.setItem('restaurantId', store.id);

      // Navigate based on order type
      console.log('Navigating with order type:', orderType);
      // All order types go to menu first
      navigate(`/mobile/${restaurantSlug}/menu`);
    } catch (error) {
      console.error('Error initializing order:', error);
      alert('Error initializing order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if table number is in URL (from QR code scan)
    const table = searchParams.get('table');
    if (table) {
      setTableFromQR(table);
      // Store table number in session
      sessionStorage.setItem('tableNumber', table);
    }

    // Store restaurant slug for later use
    if (slug) {
      sessionStorage.setItem('restaurantSlug', slug);
    }
  }, [searchParams, slug]);

  return (
    <Container>
      <Header>
        <Title>Welcome to FoodCourt</Title>
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
        <OptionCard onClick={() => handleOrderTypeSelection('dine-in')}>
          <OptionIcon>🍽️</OptionIcon>
          <OptionTitle>Dine In</OptionTitle>
        </OptionCard>

        <OptionCard onClick={() => handleOrderTypeSelection('takeaway')}>
          <OptionIcon>🥡</OptionIcon>
          <OptionTitle>Takeaway</OptionTitle>
        </OptionCard>

        <OptionCard onClick={() => handleOrderTypeSelection('delivery')}>
          <OptionIcon>🚚</OptionIcon>
          <OptionTitle>Delivery</OptionTitle>
        </OptionCard>
      </OptionsContainer>

      <Footer>
        Powered by Purple Here POS
      </Footer>
    </Container>
  );
};

export default OrderTypePage;