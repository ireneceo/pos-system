import React, { useEffect, useState, useMemo } from 'react';
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
  margin: 0;
`;

const OptionSubtitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #6B7C93;
  margin-top: 4px;
`;

const PickupTimeSelector = styled.div`
  margin-top: 24px;
  width: 100%;
  max-width: 400px;
`;

const PickupTimeTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
  text-align: center;
`;

const TimeSlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const TimeSlot = styled.button<{ selected?: boolean }>`
  padding: 12px 8px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E6EBF1'};
  border-radius: 8px;
  background: ${props => props.selected ? '#F0F4FF' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#0A2540'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const ImmediateOption = styled.button<{ selected?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E6EBF1'};
  border-radius: 8px;
  background: ${props => props.selected ? '#F0F4FF' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#0A2540'};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 12px;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }
`;

const ProceedButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  margin-top: 24px;
  border: none;
  border-radius: 8px;
  background: #635BFF;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  margin-top: 16px;
  padding: 12px 24px;
  background: transparent;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  color: #6B7C93;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    border-color: #0A2540;
    color: #0A2540;
  }
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

interface BreakTime {
  id: string;
  start: string;
  end: string;
}

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
  breakTimes?: BreakTime[];
}

const OrderTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const { setCurrentStore, setIsLoading } = useMobileOrder();
  const [tableFromQR, setTableFromQR] = useState<string | null>(null);
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [showPickupTime, setShowPickupTime] = useState(false);
  const [selectedPickupTime, setSelectedPickupTime] = useState<string | null>(null);
  const [isImmediate, setIsImmediate] = useState(true);

  // Generate 30-minute time slots based on opening hours and break times
  const availableTimeSlots = useMemo(() => {
    if (!storeData?.openingTime || !storeData?.closingTime) return [];

    const slots: string[] = [];
    const now = new Date();
    const [openHour, openMin] = storeData.openingTime.split(':').map(Number);
    const [closeHour, closeMin] = storeData.closingTime.split(':').map(Number);

    // Start from the next 30-minute slot after now
    let currentMinutes = now.getHours() * 60 + now.getMinutes();
    const nextSlot = Math.ceil((currentMinutes + 30) / 30) * 30; // At least 30 mins from now

    const openMinutes = openHour * 60 + openMin;
    const closeMinutes = closeHour * 60 + closeMin;

    // Start from either opening time or next available slot (whichever is later)
    let startMinutes = Math.max(openMinutes, nextSlot);
    // Round up to nearest 30 minutes
    startMinutes = Math.ceil(startMinutes / 30) * 30;

    for (let mins = startMinutes; mins < closeMinutes; mins += 30) {
      const hour = Math.floor(mins / 60);
      const min = mins % 60;
      const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;

      // Check if this slot falls within any break time
      const isInBreak = (storeData.breakTimes || []).some(bt => {
        const [btStartH, btStartM] = bt.start.split(':').map(Number);
        const [btEndH, btEndM] = bt.end.split(':').map(Number);
        const btStartMins = btStartH * 60 + btStartM;
        const btEndMins = btEndH * 60 + btEndM;
        return mins >= btStartMins && mins < btEndMins;
      });

      if (!isInBreak) {
        slots.push(timeStr);
      }
    }

    return slots;
  }, [storeData]);

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
              },
              breakTimes: result.data.breakTimes || []
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
    // If pickup is selected and we haven't shown pickup time selector yet
    if (orderType === 'pickup' && !showPickupTime) {
      setShowPickupTime(true);
      return;
    }

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

      // Store pickup time if selected
      if (orderType === 'pickup' && !isImmediate && selectedPickupTime) {
        sessionStorage.setItem('scheduledPickupTime', selectedPickupTime);
      } else {
        sessionStorage.removeItem('scheduledPickupTime');
      }

      navigate(`/mobile/${restaurantSlug}/menu`);
    } catch (error) {
      console.error('Error initializing order:', error);
      alert('Error initializing order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePickupProceed = () => {
    if (!isImmediate && !selectedPickupTime) {
      alert('Please select a pickup time');
      return;
    }
    handleOrderTypeSelection('pickup');
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

  // Format time for display (e.g., "14:30" -> "2:30 PM")
  const formatTimeDisplay = (time: string) => {
    const [hour, min] = time.split(':').map(Number);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${min.toString().padStart(2, '0')} ${period}`;
  };

  const orderTypes = storeData?.orderTypes || { dineIn: true, takeaway: true, pickup: false, delivery: false };

  // Pickup time selection view
  if (showPickupTime) {
    return (
      <Container>
        <Header>
          <Title>Select Pickup Time</Title>
          <Subtitle>When would you like to pick up your order?</Subtitle>
        </Header>

        <PickupTimeSelector>
          <ImmediateOption
            selected={isImmediate}
            onClick={() => {
              setIsImmediate(true);
              setSelectedPickupTime(null);
            }}
          >
            🚀 Ready as soon as possible
          </ImmediateOption>

          <PickupTimeTitle>Or schedule a pickup time</PickupTimeTitle>

          <TimeSlotGrid>
            {availableTimeSlots.map(slot => (
              <TimeSlot
                key={slot}
                selected={!isImmediate && selectedPickupTime === slot}
                onClick={() => {
                  setIsImmediate(false);
                  setSelectedPickupTime(slot);
                }}
              >
                {formatTimeDisplay(slot)}
              </TimeSlot>
            ))}
          </TimeSlotGrid>

          {availableTimeSlots.length === 0 && (
            <div style={{ textAlign: 'center', color: '#6B7C93', padding: '20px' }}>
              No available pickup times for today
            </div>
          )}
        </PickupTimeSelector>

        <ProceedButton onClick={handlePickupProceed}>
          Continue to Menu
        </ProceedButton>

        <BackButton onClick={() => setShowPickupTime(false)}>
          ← Back to order type
        </BackButton>

        <Footer>
          Powered by Purple Here POS
        </Footer>
      </Container>
    );
  }

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

        {orderTypes.pickup && (
          <OptionCard onClick={() => handleOrderTypeSelection('pickup')}>
            <OptionIcon>📦</OptionIcon>
            <OptionTitle>Takeaway</OptionTitle>
            <OptionSubtitle>(Pre-order Pickup)</OptionSubtitle>
          </OptionCard>
        )}

        {orderTypes.delivery && (
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