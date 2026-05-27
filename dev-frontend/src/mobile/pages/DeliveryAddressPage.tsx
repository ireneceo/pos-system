import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';

const Container = styled.div`
  padding: 24px 16px 100px;
  max-width: 500px;
  margin: 0 auto;
`;

const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
  margin: 0 0 16px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 16px; /* Prevent iOS zoom on focus */
  box-sizing: border-box;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 16px; /* Prevent iOS zoom on focus */
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const ZoneCard = styled.button<{ selected: boolean }>`
  width: 100%;
  background: ${props => props.selected ? '#EFF6FF' : 'white'};
  border: 2px solid ${props => props.selected ? '#635BFF' : '#C7CED6'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ZoneName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const ZoneDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ZoneDescription = styled.div`
  font-size: 13px;
  color: #4B5563;
`;

const ZoneFee = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #635BFF;
`;

const InfoBox = styled.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #92400E;
`;

const SubmitButton = styled.button`
  position: fixed;
  bottom: 68px;
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
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 101;

  &:active {
    background: #635BFF;
  }

  &:disabled {
    background: #6B7280;
    cursor: not-allowed;
  }
`;

interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  description: string;
}

const DeliveryAddressPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { currentStore, currency } = useMobileOrder();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);
  const [minimumOrder, setMinimumOrder] = useState(0);
  const [freeAbove, setFreeAbove] = useState(999999);

  useEffect(() => {
    // Load delivery settings from restaurant
    const loadDeliverySettings = async () => {
      try {
        if (!currentStore?.id) {
          console.warn('⚠️ No currentStore.id available');
          // Use default zones
          setDeliveryZones([
            { id: 'zone-a', name: 'Zone A (City Center)', fee: 3.00, description: '3km 이내' },
            { id: 'zone-b', name: 'Zone B (Near City)', fee: 5.00, description: '3-5km' },
            { id: 'zone-c', name: 'Zone C (Suburbs)', fee: 8.00, description: '5-10km' }
          ]);
          return;
        }

        const response = await fetch(`/api/restaurants/slug/${currentStore.slug}`);
        if (response.ok) {
          const data = await response.json();
          const restaurant = data.data || data;

          // Get delivery settings from operation_settings
          const operationSettings = restaurant.operation_settings || {};
          const deliveryPricing = operationSettings.deliveryPricing || {};

          if (deliveryPricing.zones && deliveryPricing.zones.length > 0) {
            setDeliveryZones(deliveryPricing.zones);
          } else {
            // Default zones
            setDeliveryZones([
              { id: 'zone-a', name: 'Zone A (City Center)', fee: 3.00, description: '3km 이내' },
              { id: 'zone-b', name: 'Zone B (Near City)', fee: 5.00, description: '3-5km' },
              { id: 'zone-c', name: 'Zone C (Suburbs)', fee: 8.00, description: '5-10km' }
            ]);
          }

          setMinimumOrder(deliveryPricing.minimumOrder || 0);
          setFreeAbove(deliveryPricing.freeAbove || 999999);
        }
      } catch (error) {
        console.error('Failed to load delivery settings:', error);
        // Use default zones
        setDeliveryZones([
          { id: 'zone-a', name: 'Zone A (City Center)', fee: 3.00, description: '3km 이내' },
          { id: 'zone-b', name: 'Zone B (Near City)', fee: 5.00, description: '3-5km' },
          { id: 'zone-c', name: 'Zone C (Suburbs)', fee: 8.00, description: '5-10km' }
        ]);
      }
    };

    loadDeliverySettings();
  }, [currentStore?.id]);

  const handleSubmit = () => {
    if (!address.trim() || !phone.trim() || !selectedZone) {
      return;
    }

    // Save delivery info to sessionStorage
    const selectedZoneData = deliveryZones.find(z => z.id === selectedZone);
    sessionStorage.setItem('deliveryInfo', JSON.stringify({
      address,
      phone,
      notes,
      zoneId: selectedZone,
      zoneName: selectedZoneData?.name,
      deliveryFee: selectedZoneData?.fee || 0
    }));

    // Navigate to menu
    navigate(`/mobile/${slug}/menu`);
  };

  const formatCurrency = (amount: number) => {
    return `${currency} ${amount.toFixed(2)}`;
  };

  return (
    <MobileLayout
      title="Delivery Address"
      showBack
      onBack={() => navigate(`/mobile/${slug}/order-type`)}
    >
      <Container>
        {minimumOrder > 0 && (
          <InfoBox>
            ℹ️ Minimum order for delivery: {formatCurrency(minimumOrder)}
            {freeAbove < 999999 && <><br />Free delivery for orders above {formatCurrency(freeAbove)}</>}
          </InfoBox>
        )}

        <Section>
          <SectionTitle>Delivery Information</SectionTitle>

          <FormGroup>
            <Label>Delivery Address *</Label>
            <TextArea
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number *</Label>
            <Input
              type="tel"
              placeholder="+60 12-345 6789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Delivery Notes (Optional)</Label>
            <TextArea
              placeholder="E.g., Gate code, landmark, special instructions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ minHeight: '60px' }}
            />
          </FormGroup>
        </Section>

        <Section>
          <SectionTitle>Select Delivery Zone *</SectionTitle>
          {deliveryZones.map(zone => (
            <ZoneCard
              key={zone.id}
              selected={selectedZone === zone.id}
              onClick={() => setSelectedZone(zone.id)}
            >
              <ZoneName>{zone.name}</ZoneName>
              <ZoneDetails>
                <ZoneDescription>{zone.description}</ZoneDescription>
                <ZoneFee>{formatCurrency(zone.fee)}</ZoneFee>
              </ZoneDetails>
            </ZoneCard>
          ))}
        </Section>
      </Container>

      <SubmitButton
        onClick={handleSubmit}
        disabled={!address.trim() || !phone.trim() || !selectedZone}
      >
        Continue to Menu
      </SubmitButton>
    </MobileLayout>
  );
};

export default DeliveryAddressPage;
