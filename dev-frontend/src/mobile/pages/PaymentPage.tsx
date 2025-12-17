import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useCustomer } from '../../contexts/CustomerContext';
import { useStore } from '../../contexts/StoreContext';
import CustomerModal from '../../components/Customer/CustomerModal';
import api from '../services/api';
import { formatCurrency } from '../../utils/currency';
import PhoneInput from '../components/common/PhoneInput';

const Container = styled.div`
  padding-bottom: 100px;
  max-width: 100%;
  box-sizing: border-box;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`;


const QuickOrderCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.2s;

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: #635BFF;
    cursor: pointer;
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: #1F2937;
  }
`;

const CustomerChoiceContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const CustomerChoiceButton = styled.button<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 12px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.05)' : 'white'};
  width: 100%;
  gap: 6px;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ChoiceTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  text-align: center;
`;

const ChoiceSubtitle = styled.div`
  font-size: 11px;
  color: #6B7280;
  text-align: center;
`;

const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PaymentMethod = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.05)' : 'white'};

  &:active {
    transform: scale(0.98);
  }
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  accent-color: #635BFF;
`;

const MethodInfo = styled.div`
  flex: 1;
`;

const MethodName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
  color: #6B7280;

  &.total {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #E5E7EB;
    font-size: 18px;
    font-weight: 600;
    color: #1F2937;
    margin-bottom: 0;
  }
`;

const ItemsList = styled.div`
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E5E7EB;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 2px;
`;

const ItemQuantity = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const ItemSetItems = styled.div`
  font-size: 12px;
  color: #667eea;
  margin-top: 4px;
  font-weight: 500;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-left: 12px;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const CardRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  background: #FEE2E2;
  border: 1px solid #FECACA;
  color: #DC2626;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
`;

const PayButton = styled.button`
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
    background: #5A51E6;
  }

  &:disabled {
    background: #D1D5DB;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const TableSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const CustomerInfoBox = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomerInfoContent = styled.div`
  flex: 1;
`;

const CustomerInfoName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const CustomerInfoDetails = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #9CA3AF;
  font-size: 18px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.2s;
  flex-shrink: 0;
  margin-left: 8px;

  &:hover {
    background: #E5E7EB;
    color: #6B7280;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
`;

const ZoneCard = styled.button<{ selected: boolean }>`
  width: 100%;
  background: ${props => props.selected ? '#EFF6FF' : 'white'};
  border: 2px solid ${props => props.selected ? '#635BFF' : '#E5E7EB'};
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ZoneName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const ZoneDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
`;

const ZoneDescription = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const ZoneFee = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #635BFF;
`;

const InfoBox = styled.div`
  background: #FEF3C7;
  border: 1px solid #FCD34D;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #92400E;
`;

// Mock coupon codes for demo
const VALID_COUPONS: Record<string, { type: 'percentage' | 'fixed'; value: number; minOrder?: number }> = {
  'SAVE10': { type: 'percentage', value: 10, minOrder: 30 },
  'SAVE5': { type: 'fixed', value: 5, minOrder: 20 },
  'WELCOME': { type: 'percentage', value: 15, minOrder: 0 },
  'FOODIE20': { type: 'percentage', value: 20, minOrder: 50 }
};

const PaymentPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, setCurrentOrder, currentStore, setCurrentStore, currency } = useMobileOrder();
  const {
    currentCustomer,
    guestInfo,
    updateCustomerOrderStats,
    updateCustomer,
    setGuestInfo,
    logoutCustomer,
    loginCustomer,
    registerCustomer
  } = useCustomer();
  const { getTakeawayCharge, operationSettings } = useStore();
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Table selection
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState('');

  // Coupon code
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Delivery address state
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [deliveryZones, setDeliveryZones] = useState<Array<{id: string; name: string; fee: number; description: string}>>([]);

  // Pickup time state
  const [selectedPickupTime, setSelectedPickupTime] = useState<string | null>(null);
  const [isImmediatePickup, setIsImmediatePickup] = useState(true);
  const [availablePickupSlots, setAvailablePickupSlots] = useState<string[]>([]);

  // Guest info inline form state
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);

  // Registration state
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  // Member login state
  const [memberPassword, setMemberPassword] = useState('');

  // Forgot password inline state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  // Calculate takeaway charge (using existing function from StoreContext)
  const orderType = sessionStorage.getItem('orderType') as 'dine-in' | 'takeaway' | 'pickup' | 'delivery' || 'dine-in';

  // Get scheduled pickup time from state (not sessionStorage anymore)
  // Convert time slot (HH:mm) to full datetime for today
  const getScheduledPickupDateTime = () => {
    if (orderType !== 'pickup' || isImmediatePickup || !selectedPickupTime) {
      return null;
    }
    const today = new Date();
    const [hour, min] = selectedPickupTime.split(':').map(Number);
    today.setHours(hour, min, 0, 0);
    return today.toISOString();
  };
  const scheduledPickupTime = getScheduledPickupDateTime();
  const calculateTakeawayCharge = () => {
    // Apply takeaway charge for both takeaway and pickup orders
    if ((orderType !== 'takeaway' && orderType !== 'pickup') || !operationSettings.takeawayPricing.enabled) {
      return 0;
    }

    let charge = 0;
    if (operationSettings.takeawayPricing.pricingType === 'per-item') {
      // Per-item charge
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      charge = totalQuantity * operationSettings.takeawayPricing.perItemCharge;
    } else {
      // Per-category charge
      cartItems.forEach(item => {
        const itemCharge = getTakeawayCharge((item.menuItem as any).categoryId || (item.menuItem as any).category);
        charge += itemCharge * item.quantity;
      });
    }
    return charge;
  };

  // Calculate delivery fee
  const calculateDeliveryFee = () => {
    if (orderType !== 'delivery' || !selectedZone) {
      return 0;
    }

    // Get selected zone's fee
    const zone = deliveryZones.find(z => z.id === selectedZone);
    if (!zone) return 0;

    // Check if order qualifies for free delivery
    const deliveryPricing = operationSettings.deliveryPricing;
    const freeAbove = deliveryPricing?.freeAbove || 999999;

    if (subtotal >= freeAbove) {
      console.log('✅ Order qualifies for free delivery (subtotal >= freeAbove)');
      return 0;
    }

    return zone.fee;
  };

  // Rounding settings
  const cashRounding = currentStore?.cash_rounding;
  const roundingApplyTo = currentStore?.rounding_apply_to || 'cash_only';

  // Helper function for rounding
  const applyRounding = (amount: number): number => {
    if (!cashRounding) return amount;
    // Round to nearest cash_rounding value
    return Math.round(amount / cashRounding) * cashRounding;
  };

  const subtotal = cartTotal;
  const takeawayCharge = calculateTakeawayCharge();
  const deliveryFee = calculateDeliveryFee();

  // Apply tax from operation settings
  const tax = operationSettings.taxEnabled ? subtotal * (operationSettings.taxRate / 100) : 0;

  // Apply service charge from operation settings (if enabled)
  const serviceCharge = operationSettings.serviceChargeEnabled ? subtotal * (operationSettings.serviceChargeRate / 100) : 0;

  const discountedSubtotal = subtotal - couponDiscount;
  const totalBeforeRounding = discountedSubtotal + tax + serviceCharge + takeawayCharge + deliveryFee;

  // Apply rounding based on settings
  const total = roundingApplyTo === 'all' && cashRounding
    ? applyRounding(totalBeforeRounding)
    : totalBeforeRounding;

  // Get available payment methods for mobile - recalculates when paymentMethods changes
  const availableMethods = React.useMemo(() => {
    // If payment methods haven't loaded yet, return empty array
    if (!paymentMethods) {
      console.log('⚠️ paymentMethods is null/undefined, returning empty array');
      return [];
    }

    console.log('🔍 Filtering payment methods for mobile. Raw paymentMethods:', JSON.stringify(paymentMethods, null, 2));

    const methods: any[] = [];

    // Use saved order if available, otherwise use Object.keys
    const savedOrder = paymentMethods._order;
    const methodKeys = savedOrder && Array.isArray(savedOrder)
      ? savedOrder.filter((k: string) => k !== '_order' && paymentMethods[k])
      : Object.keys(paymentMethods).filter(k => k !== '_order');

    methodKeys.forEach((key: string) => {
      const method = paymentMethods[key];
      if (!method) return;

      console.log(`🔍 Checking ${key}:`, {
        enabled: method.enabled,
        availableIn: method.availableIn,
        passesCheck: method.enabled && method.availableIn && method.availableIn.includes('mobile')
      });

      // Only show enabled methods that are available in mobile
      if (method.enabled && method.availableIn && method.availableIn.includes('mobile')) {
        // Exclude "Pay at Counter" for delivery orders
        if (orderType === 'delivery' && key === 'payAtCounter') {
          console.log(`❌ ${key} excluded - Pay at Counter not allowed for delivery`);
          return;
        }

        console.log(`✅ ${key} passed filter - adding to available methods`);
        // Use DB keys directly - no transformation needed
        methods.push({
          key: key,
          label: method.label,
          ...method
        });
      } else {
        console.log(`❌ ${key} failed filter - excluded from mobile`);
      }
    });

    console.log('🔍 Final available methods for mobile:', methods.map(m => m.key));
    return methods;
  }, [paymentMethods, orderType]);

  const [paymentMethod, setPaymentMethod] = useState<string>(''); // No default - user must select

  // Load restaurant info from slug
  React.useEffect(() => {
    const loadRestaurant = async () => {
      if (slug) {
        console.log('🏪 Loading restaurant from slug:', slug);
        try {
          // Load restaurant by slug from API
          const response = await fetch(`/api/restaurants/slug/${slug}`);
          if (response.ok) {
            const result = await response.json();
            if (result.success && result.data) {
              const restaurant = result.data;
              console.log('✅ Restaurant loaded from slug API:', restaurant);
              setCurrentStore({
                id: restaurant.id.toString(),
                name: restaurant.name,
                slug: restaurant.slug,
                description: restaurant.description || '',
                logo: restaurant.logo_url || '',
                isOpen: restaurant.status === 'active',
                openingHours: restaurant.opening_hours || ''
              });
            }
          } else {
            console.error('Failed to load restaurant by slug:', response.status);
          }
        } catch (error) {
          console.error('Failed to load restaurant:', error);
        }
      }
    };
    loadRestaurant();
  }, [slug, setCurrentStore]);

  // Set Quick Order as default on page load
  React.useEffect(() => {
    // Only set if no customer info is already set
    if (!currentCustomer && !guestInfo) {
      setGuestInfo({
        name: 'Guest',
        phone: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load payment settings from restaurant
  React.useEffect(() => {
    const loadPaymentSettings = async () => {
      try {
        // Use currentStore.id from MobileOrderContext
        if (!currentStore?.id) {
          console.warn('⚠️ No currentStore.id available, cannot load payment settings');
          return;
        }

        console.log('💳 Loading payment settings for restaurant ID:', currentStore.id);
        const response = await fetch(`/api/restaurants/${currentStore.id}`);
        if (response.ok) {
          const data = await response.json();
          const restaurant = data.data || data;
          if (restaurant.payment_settings) {
            console.log('✅ Payment settings loaded:', restaurant.payment_settings);
            setPaymentMethods(restaurant.payment_settings);
          } else {
            console.warn('⚠️ No payment_settings found in restaurant data');
          }
        }
      } catch (error) {
        console.error('Failed to load payment settings:', error);
      }
    };

    loadPaymentSettings();
  }, [currentStore?.id]);

  // Load available tables from restaurant settings
  React.useEffect(() => {
    const loadTableSettings = async () => {
      try {
        if (!currentStore?.id) {
          console.warn('⚠️ No currentStore.id available, cannot load table settings');
          return;
        }

        console.log('🍽️ Loading table settings for restaurant ID:', currentStore.id);
        const response = await fetch(`/api/restaurants/${currentStore.id}`);
        if (response.ok) {
          const data = await response.json();
          const restaurant = data.data || data;
          if (restaurant.operation_settings?.enableTableNumbers) {
            const { totalTables, tablePrefix } = restaurant.operation_settings;
            console.log('✅ Table settings loaded:', { totalTables, tablePrefix });
            const tables = [];
            for (let i = 1; i <= totalTables; i++) {
              tables.push(`${tablePrefix || 'T'}${String(i).padStart(3, '0')}`);
            }
            setAvailableTables(tables);
          } else {
            console.log('ℹ️ Table numbers not enabled for this restaurant');
            setAvailableTables([]);
          }
        }
      } catch (error) {
        console.error('Failed to load table settings:', error);
      }
    };

    loadTableSettings();

    // Check if table was pre-selected from QR code
    const preSelectedTable = sessionStorage.getItem('tableNumber');
    if (preSelectedTable) {
      setSelectedTable(preSelectedTable);
    }
  }, [currentStore?.id]);

  // Load delivery zones from operationSettings
  React.useEffect(() => {
    console.log('🔍 Delivery zone effect triggered');
    console.log('Order type:', orderType);
    console.log('operationSettings.deliveryPricing:', operationSettings.deliveryPricing);

    if (orderType === 'delivery') {
      if (operationSettings.deliveryPricing && operationSettings.deliveryPricing.zones && operationSettings.deliveryPricing.zones.length > 0) {
        const zones = operationSettings.deliveryPricing.zones;
        console.log('🚚 Loading delivery zones:', zones);
        setDeliveryZones(zones);
        // Don't set default zone - let customer choose
      } else {
        console.log('ℹ️ No delivery zones configured - delivery zone selection not required');
        setDeliveryZones([]);
      }
    }
  }, [orderType, operationSettings.deliveryPricing]);

  // Load member's saved address for delivery and sync phone from customer/guest
  React.useEffect(() => {
    if (orderType === 'delivery') {
      // For logged-in members
      if (currentCustomer) {
        console.log('📍 Loading member address:', currentCustomer);

        // Get default address or first address from addresses array
        const defaultAddress = currentCustomer.addresses?.find(addr => addr.isDefault) || currentCustomer.addresses?.[0];

        if (defaultAddress) {
          setDeliveryAddress(defaultAddress.address || '');
        }

        setDeliveryPhone(currentCustomer.phone || '');
        // Note: delivery_notes would be stored at order level, not customer level
      }
      // For guest orders
      else if (guestInfo && guestInfo.phone) {
        console.log('📍 Syncing guest phone for delivery:', guestInfo.phone);
        setDeliveryPhone(guestInfo.phone);
      }
    }
  }, [currentCustomer, guestInfo, orderType]);

  // Handle Quick Order + Delivery conflict
  React.useEffect(() => {
    // If Quick Order is enabled but order type is delivery, disable Quick Order
    if (orderType === 'delivery' && guestInfo && guestInfo.name === 'Guest' && !guestInfo.phone) {
      console.log('⚠️ Quick Order not allowed for delivery - clearing guest info');
      setGuestInfo(null);
    }
  }, [orderType, guestInfo, setGuestInfo]);

  // Generate pickup time slots for pre-order pickup
  React.useEffect(() => {
    if (orderType !== 'pickup') return;

    const generateTimeSlots = () => {
      const slots: string[] = [];
      const now = new Date();

      // Get opening/closing times from operationSettings or use defaults
      const openingTime = operationSettings.openingTime || '09:00';
      const closingTime = operationSettings.closingTime || '22:00';

      const [openHour, openMin] = openingTime.split(':').map(Number);
      const [closeHour, closeMin] = closingTime.split(':').map(Number);

      // Start from the next 30-minute slot after now (at least 30 mins from now)
      let currentMinutes = now.getHours() * 60 + now.getMinutes();
      const nextSlot = Math.ceil((currentMinutes + 30) / 30) * 30;

      const openMinutes = openHour * 60 + openMin;
      const closeMinutes = closeHour * 60 + closeMin;

      // Start from either opening time or next available slot (whichever is later)
      let startMinutes = Math.max(openMinutes, nextSlot);
      startMinutes = Math.ceil(startMinutes / 30) * 30;

      // Get break times from currentStore (loaded from API)
      const breakTimes = currentStore?.breakTimes || [];

      for (let mins = startMinutes; mins < closeMinutes; mins += 30) {
        const hour = Math.floor(mins / 60);
        const min = mins % 60;
        const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;

        // Check if this slot falls within any break time
        const isInBreak = breakTimes.some((bt: any) => {
          if (!bt.start || !bt.end) return false;
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
    };

    const slots = generateTimeSlots();
    console.log('📦 Generated pickup time slots:', slots);
    setAvailablePickupSlots(slots);
  }, [orderType, operationSettings, currentStore]);

  // Helper function to save delivery address to member profile
  const saveDeliveryAddressToMember = async () => {
    if (!currentCustomer || orderType !== 'delivery' || !deliveryAddress.trim()) {
      return;
    }

    try {
      console.log('💾 Saving delivery address to member profile...');

      // Check if address already exists
      const existingAddresses = currentCustomer.addresses || [];
      const addressExists = existingAddresses.some(addr => addr.address === deliveryAddress);

      if (!addressExists) {
        // Create new address entry
        const newAddress = {
          id: `addr_${Date.now()}`,
          label: 'Delivery Address',
          address: deliveryAddress,
          isDefault: existingAddresses.length === 0 // Set as default if it's the first address
        };

        // Update customer with new address
        await updateCustomer(currentCustomer.id, {
          addresses: [...existingAddresses, newAddress]
        });

        console.log('✅ Delivery address saved to member profile');
      } else {
        console.log('ℹ️ Address already exists in member profile');
      }
    } catch (error) {
      console.error('❌ Failed to save delivery address:', error);
      // Don't block order completion if address save fails
    }
  };

  // Helper function to get option names - now options are already stored as names
  const getOptionNames = (item: typeof cartItems[0]): string[] => {
    // selectedOptions now contains option names directly
    return item.selectedOptions || [];
  };

  const handlePayment = async () => {
    console.log('🔵🔵🔵 PAY BUTTON CLICKED! 🔵🔵🔵');
    console.log('Payment method selected:', paymentMethod);
    console.log('Cart items count:', cartItems.length);

    setError('');

    // Check if payment method is selected
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsProcessing(true);

    try {
      // Validate cart
      console.log('🔵 Step 1: Validating cart...');
      const validationResponse = await api.validateCart(
        cartItems.map(item => ({
          id: item.menuItem.id,
          quantity: item.quantity,
          price: item.totalPrice / item.quantity,
          options: item.selectedOptions
        })),
        currentStore?.id || '1'
      );

      console.log('🔵 Step 2: Validation response:', validationResponse);

      if (!validationResponse.success || !validationResponse.data.isValid) {
        const errorMsg = 'Some items in your cart have changed. Please review your order.';
        console.error('❌ Validation failed:', errorMsg);
        setError(errorMsg);
        setIsProcessing(false);
        return;
      }

      console.log('🔵 Step 3: Preparing order...');
      console.log('Order type:', orderType);
      console.log('Payment method:', paymentMethod);

      // Process payment
      console.log('🔵 Step 4: Processing payment for method:', paymentMethod);

        if (paymentMethod === 'payAtCounter' || paymentMethod === 'counter') {
          console.log('🔵 Processing counter payment...');

          // Validate delivery info for delivery orders
          if (orderType === 'delivery') {
            // Check if customer/guest info is provided
            if (!currentCustomer && (!guestInfo || !guestInfo.phone)) {
              setError('Please enter your contact information (Guest Order or Member)');
              setIsProcessing(false);
              return;
            }

            if (!deliveryAddress.trim()) {
              setError('Please enter your delivery address');
              setIsProcessing(false);
              return;
            }
            if (!deliveryPhone.trim()) {
              setError('Please enter your phone number in Customer Information');
              setIsProcessing(false);
              return;
            }
            // Only validate zone if zones are configured
            if (deliveryZones.length > 0 && !selectedZone) {
              setError('Please select a delivery zone');
              setIsProcessing(false);
              return;
            }
          }

          // Create order in DATABASE (without order_number - let backend generate it)
          try {
            // Get delivery zone name for delivery orders
            let deliveryZoneName = null;
            if (orderType === 'delivery' && selectedZone && deliveryZones.length > 0) {
              const zone = deliveryZones.find(z => z.id === selectedZone);
              deliveryZoneName = zone?.name || null;
            }

            const dbOrderData = {
              restaurant_id: currentStore?.id || 1,
              // order_number will be auto-generated by backend
              customer_name: currentCustomer ? currentCustomer.name : (guestInfo ? guestInfo.name || 'Guest' : 'Guest'),
              customer_phone: currentCustomer ? currentCustomer.phone : (guestInfo ? guestInfo.phone || null : null),
              table_number: selectedTable || null,
              total_amount: total,
              takeaway_charge: takeawayCharge,
              delivery_fee: deliveryFee,
              // Store delivery info as JSON object
              delivery_info: orderType === 'delivery' ? {
                address: deliveryAddress,
                phone: deliveryPhone,
                notes: deliveryNotes,
                zoneName: deliveryZoneName,
                zoneId: selectedZone
              } : null,
              scheduled_pickup_time: orderType === 'pickup' && scheduledPickupTime ? scheduledPickupTime : null,
              status: 'awaiting_payment',
              order_type: orderType === 'dine-in' ? 'dine_in' : orderType,
              source: 'mobile',  // Mobile order source
              payment_method: 'counter',
              payment_status: 'pending',
              kitchen_ready: false,
              order_date: new Date(),
              order_items: cartItems.map(item => ({
                name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
                quantity: item.quantity,
                price: item.menuItem.price,
                options: getOptionNames(item),
                special_instructions: item.specialInstructions || null,
                is_set_menu: (item.menuItem as any).is_set_menu || false,
                set_items: (item.menuItem as any).set_items || []
              }))
            };

            console.log('💾 Saving order to DATABASE...');
            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dbOrderData)
            });

            if (!response.ok) {
              throw new Error('Failed to save order to database');
            }

            const result = await response.json();
            const savedOrder = result.data;
            console.log('✅ Order saved to DB with ID:', savedOrder.id);

            // Get order number and pickup number from backend response
            const backendOrderNumber = savedOrder.order_number;
            const backendPickupNumber = backendOrderNumber ? backendOrderNumber.split('-')[1] : '001';

            // Update customer stats if member
            if (currentCustomer) {
              updateCustomerOrderStats(currentCustomer.id, total);
            }

            // Save delivery address to member profile if delivery order
            await saveDeliveryAddressToMember();

            // Save order ID to localStorage for customer order history
            const customerOrderIds = JSON.parse(localStorage.getItem('customerOrderIds') || '[]');
            if (!customerOrderIds.includes(savedOrder.id)) {
              customerOrderIds.push(savedOrder.id);
              localStorage.setItem('customerOrderIds', JSON.stringify(customerOrderIds));
            }

            // Set order as current and clear cart
            setCurrentOrder({
              id: savedOrder.id,
              pickupNumber: backendPickupNumber,
              items: cartItems,
              total: total,
              status: 'awaiting_payment',
              createdAt: new Date(),
              estimatedPickupTime: new Date(Date.now() + 30 * 60000), // 30 minutes from now
              paymentStatus: 'pending'
            });
            clearCart();

            // Navigate to order tracking
            navigate(`/mobile/${slug}/order/${savedOrder.id}`);
          } catch (error) {
            console.error('❌ Failed to save order to DB:', error);
            setError('Failed to create order. Please try again.');
            setIsProcessing(false);
            return;
          }
        } else if (paymentMethod === 'bankTransfer' || paymentMethod === 'bank_transfer' || paymentMethod === 'bank' ||
                   paymentMethod === 'qr' || paymentMethod === 'qrPayment' || paymentMethod === 'qr_payment') {
          console.log('🔵 Processing QR / Bank Transfer payment - NOT saving order yet...');

          // Validate delivery info for delivery orders
          if (orderType === 'delivery') {
            console.log('🚚 Delivery validation check:', {
              currentCustomer: !!currentCustomer,
              guestInfo,
              deliveryAddress,
              deliveryPhone,
              selectedZone
            });

            // Check if customer/guest info is provided
            if (!currentCustomer && (!guestInfo || !guestInfo.phone)) {
              console.log('❌ Validation failed: No customer/guest info');
              const errorMsg = 'Please enter your contact information (Guest Order or Member)';
              setError(errorMsg);
              alert(errorMsg);
              setIsProcessing(false);
              return;
            }

            if (!deliveryAddress.trim()) {
              console.log('❌ Validation failed: No delivery address');
              const errorMsg = 'Please enter your delivery address';
              setError(errorMsg);
              alert(errorMsg);
              setIsProcessing(false);
              return;
            }
            if (!deliveryPhone.trim()) {
              console.log('❌ Validation failed: No delivery phone');
              const errorMsg = 'Please enter your phone number in Customer Information';
              setError(errorMsg);
              alert(errorMsg);
              setIsProcessing(false);
              return;
            }
            // Only validate zone if zones are configured
            if (deliveryZones.length > 0 && !selectedZone) {
              console.log('❌ Validation failed: No delivery zone selected');
              const errorMsg = 'Please select a delivery zone';
              setError(errorMsg);
              alert(errorMsg);
              setIsProcessing(false);
              return;
            }
            console.log('✅ Delivery validation passed');
          }

          // Get delivery zone name for delivery orders
          let deliveryZoneName = null;
          if (orderType === 'delivery' && selectedZone && deliveryZones.length > 0) {
            const zone = deliveryZones.find(z => z.id === selectedZone);
            deliveryZoneName = zone?.name || null;
          }

          // Don't create order yet - just store data for the payment confirmation page
          const pendingOrderData = {
            restaurant_id: currentStore?.id || 1,
            customer_name: currentCustomer ? currentCustomer.name : (guestInfo ? guestInfo.name || 'Guest' : 'Guest'),
            customer_phone: currentCustomer ? currentCustomer.phone : (guestInfo ? guestInfo.phone || null : null),
            table_number: selectedTable || null,
            total_amount: total,
            takeaway_charge: takeawayCharge,
            delivery_fee: deliveryFee,
            // Store delivery info as JSON object
            delivery_info: orderType === 'delivery' ? {
              address: deliveryAddress,
              phone: deliveryPhone,
              notes: deliveryNotes,
              zoneName: deliveryZoneName,
              zoneId: selectedZone
            } : null,
            scheduled_pickup_time: orderType === 'pickup' && scheduledPickupTime ? scheduledPickupTime : null,
            status: 'awaiting_payment',
            order_type: orderType === 'dine-in' ? 'dine_in' : orderType,
            source: 'mobile',  // Mobile order source
            payment_method: (paymentMethod === 'qr' || paymentMethod === 'qrPayment' || paymentMethod === 'qr_payment') ? 'QR Payment' : 'Bank Transfer',
            payment_status: 'pending',
            kitchen_ready: false,
            order_date: new Date(),
            order_items: cartItems.map(item => ({
              name: item.menuItem.name,
              quantity: item.quantity,
              price: item.menuItem.price,
              options: getOptionNames(item),
              special_instructions: item.specialInstructions || null
            })),
            customer_id: currentCustomer?.id || null
          };

          // Store pending order data in sessionStorage (will be created after payment confirmation)
          sessionStorage.setItem('pendingOrderData', JSON.stringify(pendingOrderData));

          // Navigate to QR or Bank Transfer page
          const targetPath = (paymentMethod === 'qr' || paymentMethod === 'qrPayment' || paymentMethod === 'qr_payment')
            ? `/mobile/${slug}/payment/qr`
            : `/mobile/${slug}/payment/bank-transfer`;

          console.log('🔵 Navigating to:', targetPath);
          navigate(targetPath);
          setIsProcessing(false);
        } else if (paymentMethod === 'card' || paymentMethod === 'fpx') {
          console.log('🔵 Processing card / FPX payment...');

          // Validate delivery info for delivery orders
          if (orderType === 'delivery') {
            // Check if customer/guest info is provided
            if (!currentCustomer && (!guestInfo || !guestInfo.phone)) {
              setError('Please enter your contact information (Guest Order or Member)');
              setIsProcessing(false);
              return;
            }

            if (!deliveryAddress.trim()) {
              setError('Please enter your delivery address');
              setIsProcessing(false);
              return;
            }
            if (!deliveryPhone.trim()) {
              setError('Please enter your phone number in Customer Information');
              setIsProcessing(false);
              return;
            }
            // Only validate zone if zones are configured
            if (deliveryZones.length > 0 && !selectedZone) {
              setError('Please select a delivery zone');
              setIsProcessing(false);
              return;
            }
          }

          // Create order in DATABASE
          try {
            // Get delivery zone name for delivery orders
            let deliveryZoneName = null;
            if (orderType === 'delivery' && selectedZone && deliveryZones.length > 0) {
              const zone = deliveryZones.find(z => z.id === selectedZone);
              deliveryZoneName = zone?.name || null;
            }

            const dbOrderData = {
              restaurant_id: currentStore?.id || 1,
              // order_number will be auto-generated by backend
              customer_name: currentCustomer ? currentCustomer.name : (guestInfo ? guestInfo.name || 'Guest' : 'Guest'),
              customer_phone: currentCustomer ? currentCustomer.phone : (guestInfo ? guestInfo.phone || null : null),
              table_number: selectedTable || null,
              total_amount: total,
              takeaway_charge: takeawayCharge,
              delivery_fee: deliveryFee,
              // Store delivery info as JSON object
              delivery_info: orderType === 'delivery' ? {
                address: deliveryAddress,
                phone: deliveryPhone,
                notes: deliveryNotes,
                zoneName: deliveryZoneName,
                zoneId: selectedZone
              } : null,
              scheduled_pickup_time: orderType === 'pickup' && scheduledPickupTime ? scheduledPickupTime : null,
              status: 'pending',
              order_type: orderType === 'dine-in' ? 'dine_in' : orderType,
              source: 'mobile',  // Mobile order source
              payment_method: paymentMethod === 'card' ? 'Card' : 'FPX',
              payment_status: 'completed',
              kitchen_ready: false,
              order_date: new Date(),
              order_items: cartItems.map(item => ({
                name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
                quantity: item.quantity,
                price: item.menuItem.price,
                options: getOptionNames(item),
                special_instructions: item.specialInstructions || null,
                is_set_menu: (item.menuItem as any).is_set_menu || false,
                set_items: (item.menuItem as any).set_items || []
              }))
            };

            console.log('💾 Saving card/FPX order to DATABASE...');

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dbOrderData)
            });

            if (!response.ok) {
              throw new Error('Failed to save order to database');
            }

            const result = await response.json();
            const savedOrder = result.data;
            console.log('✅ Card/FPX order saved to DB with ID:', savedOrder.id);

            // Get order number and pickup number from backend response
            const backendOrderNumber = savedOrder.order_number;
            const backendPickupNumber = backendOrderNumber ? backendOrderNumber.split('-')[1] : '001';

            // Update customer stats if member
            if (currentCustomer) {
              updateCustomerOrderStats(currentCustomer.id, total);
            }

            // Save delivery address to member profile if delivery order
            await saveDeliveryAddressToMember();

            // Save order ID to localStorage for customer order history
            const customerOrderIds = JSON.parse(localStorage.getItem('customerOrderIds') || '[]');
            if (!customerOrderIds.includes(savedOrder.id)) {
              customerOrderIds.push(savedOrder.id);
              localStorage.setItem('customerOrderIds', JSON.stringify(customerOrderIds));
            }

            // Set order as current and clear cart
            setCurrentOrder({
              id: savedOrder.id,
              pickupNumber: backendPickupNumber,
              items: cartItems,
              total: total,
              status: 'pending',
              createdAt: new Date(),
              estimatedPickupTime: new Date(Date.now() + 30 * 60000), // 30 minutes from now
              paymentStatus: 'completed'
            });
            clearCart();

            console.log('✅ Card / FPX payment saved, navigating...');
            // Navigate to order tracking
            navigate(`/mobile/${slug}/order/${savedOrder.id}`);
          } catch (error) {
            console.error('❌ Failed to save card/FPX order to DB:', error);
            setError('Failed to create order. Please try again.');
            setIsProcessing(false);
            return;
          }
        } else {
          // Invalid payment method
          console.error('❌ Invalid payment method:', paymentMethod);
          setError('Invalid payment method selected.');
          setIsProcessing(false);
        }
    } catch (err: any) {
      const errorMsg = err?.message || 'Payment failed. Please try again.';
      console.error('❌❌❌ PAYMENT ERROR CAUGHT ❌❌❌');
      console.error('Error details:', err);
      console.error('Error message:', errorMsg);
      setError(errorMsg);
      alert(`Payment Error: ${errorMsg}`);
    } finally {
      console.log('🔵 Finally block executing...');
      console.log('Current processing state:', isProcessing);
      setIsProcessing(false);
      console.log('✅ Finally block complete');
    }
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };
  
  const handleApplyCoupon = () => {
    setCouponError('');

    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const coupon = VALID_COUPONS[couponCode];

    if (!coupon) {
      setCouponError('Invalid coupon code');
      setCouponDiscount(0);
      return;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      setCouponError(`Minimum order of ${formatCurrency(coupon.minOrder, currency)} required`);
      setCouponDiscount(0);
      return;
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.value) / 100;
    } else {
      discount = Math.min(coupon.value, subtotal); // Can't discount more than subtotal
    }

    setCouponDiscount(discount);
    setCouponError('');
  };
  
  return (
    <MobileLayout title="Payment" showBack onBack={() => navigate(`/mobile/${slug}/cart`)}>
      <Container>
        <OrderSummary>
          <ItemsList>
            {cartItems.map((item, index) => (
              <ItemRow key={index}>
                <ItemInfo>
                  <ItemName>{item.menuItem.emoji} {item.menuItem.code ? `${item.menuItem.code} ` : ''}{item.menuItem.name}</ItemName>
                  <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                  {item.menuItem.is_set_menu && item.menuItem.set_items && item.menuItem.set_items.length > 0 && (
                    <ItemSetItems>
                      🍱 Includes: {item.menuItem.set_items.map((setItem: any) =>
                        `${setItem.name} x${setItem.quantity}`
                      ).join(', ')}
                    </ItemSetItems>
                  )}
                </ItemInfo>
                <ItemPrice>{formatCurrency(item.totalPrice, currency)}</ItemPrice>
              </ItemRow>
            ))}
          </ItemsList>

          <SummaryRow>
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal, currency)}</span>
          </SummaryRow>
          {couponDiscount > 0 && (
            <SummaryRow>
              <span>Discount</span>
              <span style={{ color: '#059669' }}>-{formatCurrency(couponDiscount, currency)}</span>
            </SummaryRow>
          )}
          {takeawayCharge > 0 && (
            <SummaryRow>
              <span>Takeaway Charge</span>
              <span>{formatCurrency(takeawayCharge, currency)}</span>
            </SummaryRow>
          )}
          {deliveryFee > 0 && (
            <SummaryRow>
              <span>Delivery Fee</span>
              <span>{formatCurrency(deliveryFee, currency)}</span>
            </SummaryRow>
          )}
          {serviceCharge > 0 && (
            <SummaryRow>
              <span>Service Charge ({operationSettings.serviceChargeRate}%)</span>
              <span>{formatCurrency(serviceCharge, currency)}</span>
            </SummaryRow>
          )}
          {tax > 0 && (
            <SummaryRow>
              <span>Tax ({operationSettings.taxRate}%)</span>
              <span>{formatCurrency(tax, currency)}</span>
            </SummaryRow>
          )}
          <SummaryRow className="total">
            <span>Total</span>
            <span>{formatCurrency(total, currency)}</span>
          </SummaryRow>
        </OrderSummary>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Section>
          <SectionTitle>Customer Information</SectionTitle>

          {/* Quick Order 체크박스 - disabled for delivery */}
          <QuickOrderCheckbox style={{ opacity: orderType === 'delivery' ? 0.5 : 1 }}>
            <input
              type="checkbox"
              checked={!!(guestInfo && guestInfo.name === 'Guest' && !guestInfo.phone)}
              disabled={orderType === 'delivery'}
              onChange={(e) => {
                if (e.target.checked) {
                  // Quick Order 체크 - 아무 정보 없이 바로 게스트로 등록
                  setGuestInfo({
                    name: 'Guest',
                    phone: ''
                  });
                  // Reset Guest/Member button selection
                  setShowGuestForm(false);
                  setShowMemberForm(false);
                  setShowRegisterForm(false);
                } else {
                  // 체크 해제 - guestInfo 초기화
                  setGuestInfo(null);
                }
              }}
            />
            <span>Quick Order (No customer info required){orderType === 'delivery' ? ' - Not available for delivery' : ''}</span>
          </QuickOrderCheckbox>

          <CustomerChoiceContainer>
            <CustomerChoiceButton
              selected={showGuestForm || showRegisterForm || (guestInfo && guestInfo.name !== 'Guest')}
              onClick={() => {
                setShowGuestForm(!showGuestForm);
                setShowMemberForm(false);
                setShowRegisterForm(false);
                if (currentCustomer) logoutCustomer();
              }}
            >
              <ChoiceTitle>Guest Or Register</ChoiceTitle>
              <ChoiceSubtitle>Order as guest or sign up</ChoiceSubtitle>
            </CustomerChoiceButton>

            <CustomerChoiceButton
              selected={showMemberForm || !!currentCustomer}
              onClick={() => {
                setShowMemberForm(!showMemberForm);
                setShowGuestForm(false);
                setShowRegisterForm(false);
                setGuestInfo(null);
              }}
            >
              <ChoiceTitle>Member</ChoiceTitle>
              <ChoiceSubtitle>Login</ChoiceSubtitle>
            </CustomerChoiceButton>
          </CustomerChoiceContainer>

          {/* Guest Form - Inline */}
          {showGuestForm && !currentCustomer && (
            <div style={{ marginTop: '16px' }}>
              {/* Registration checkbox */}
              <QuickOrderCheckbox>
                <input
                  type="checkbox"
                  checked={showRegisterForm}
                  onChange={(e) => setShowRegisterForm(e.target.checked)}
                />
                <span>Register as a Member (Earn points & benefits)</span>
              </QuickOrderCheckbox>

              <FormGroup>
                <Label>Name *</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number *</Label>
                <PhoneInput
                  value={guestPhone}
                  onChange={setGuestPhone}
                  defaultCountryCode={currentStore?.country}
                  placeholder="Phone number"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email {showRegisterForm ? '*' : '(Optional)'}</Label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </FormGroup>

              {/* Show password fields only if registering */}
              {showRegisterForm && (
                <>
                  <FormGroup>
                    <Label>Password *</Label>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password *</Label>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                    />
                  </FormGroup>
                </>
              )}

              <button
                onClick={async () => {
                  if (!guestName.trim() || !guestPhone.trim()) {
                    alert('Please enter name and phone number');
                    return;
                  }

                  // If registering as member
                  if (showRegisterForm) {
                    if (!guestEmail.trim()) {
                      alert('Email is required for member registration');
                      return;
                    }
                    if (!registerPassword.trim()) {
                      alert('Password is required for member registration');
                      return;
                    }
                    if (registerPassword !== registerConfirmPassword) {
                      alert('Passwords do not match');
                      return;
                    }

                    try {
                      const customer = await registerCustomer({
                        name: guestName,
                        phone: guestPhone,
                        email: guestEmail,
                        password: registerPassword
                      } as any);
                      console.log('✅ Customer registered:', customer);
                      alert('Registration successful! You are now logged in as a member.');
                      setShowGuestForm(false);
                      setShowRegisterForm(false);
                      setGuestName('');
                      setGuestPhone('');
                      setGuestEmail('');
                      setRegisterPassword('');
                      setRegisterConfirmPassword('');
                    } catch (error: any) {
                      console.error('Registration failed:', error);
                      alert(error.message || 'Registration failed. Please try again.');
                    }
                  } else {
                    // Guest order only
                    setGuestInfo({
                      name: guestName,
                      phone: guestPhone
                    });
                    setShowGuestForm(false);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#635BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {showRegisterForm ? 'Register & Continue' : 'Save Guest Info'}
              </button>
            </div>
          )}

          {/* Member Form - Inline */}
          {showMemberForm && !currentCustomer && (
            <div style={{ marginTop: '16px' }}>
              <FormGroup>
                <Label>Email or Phone Number *</Label>
                <Input
                  type="text"
                  placeholder="Email or phone number"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Password *</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={memberPassword}
                  onChange={(e) => setMemberPassword(e.target.value)}
                />
              </FormGroup>
              <button
                onClick={async () => {
                  if (!guestPhone.trim()) {
                    alert('Please enter your phone number');
                    return;
                  }
                  if (!memberPassword.trim()) {
                    alert('Please enter your password');
                    return;
                  }
                  try {
                    const customer = await loginCustomer(guestPhone, memberPassword);
                    if (customer) {
                      console.log('✅ Member logged in:', customer);
                      setShowMemberForm(false);
                      setGuestPhone('');
                      setMemberPassword('');
                    } else {
                      alert('Login failed. Please check your phone number and password.');
                    }
                  } catch (error) {
                    console.error('Login error:', error);
                    alert('Login failed. Please try again.');
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#635BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  marginBottom: '12px'
                }}
              >
                Login as Member
              </button>
              <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', marginBottom: '8px' }}>
                <span
                  onClick={() => {
                    setShowForgotPassword(true);
                    setForgotPasswordSent(false);
                    setForgotPasswordError('');
                    setForgotEmail('');
                  }}
                  style={{ color: '#635BFF', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Forgot password?
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>
                Not a member yet?{' '}
                <span
                  onClick={() => {
                    setShowMemberForm(false);
                    setShowGuestForm(true);
                    setShowRegisterForm(true);
                  }}
                  style={{ color: '#635BFF', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Sign up here
                </span>
              </div>
            </div>
          )}

          {/* Forgot Password Inline Form */}
          {showForgotPassword && !currentCustomer && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: '600', color: '#1F2937' }}>Reset Password</span>
                <span
                  onClick={() => setShowForgotPassword(false)}
                  style={{ cursor: 'pointer', color: '#6B7280', fontSize: '18px' }}
                >
                  ×
                </span>
              </div>

              {!forgotPasswordSent ? (
                <>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
                    Enter your email address and we'll send you a link to reset your password.
                  </p>
                  <FormGroup>
                    <Label>Email Address *</Label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setForgotPasswordError('');
                      }}
                    />
                  </FormGroup>
                  {forgotPasswordError && (
                    <div style={{ color: '#DC2626', fontSize: '13px', marginBottom: '12px' }}>
                      {forgotPasswordError}
                    </div>
                  )}
                  <button
                    onClick={async () => {
                      if (!forgotEmail.trim()) {
                        setForgotPasswordError('Please enter your email address');
                        return;
                      }
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(forgotEmail)) {
                        setForgotPasswordError('Please enter a valid email address');
                        return;
                      }
                      setForgotPasswordLoading(true);
                      try {
                        const response = await fetch('/api/customers/forgot-password', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: forgotEmail.trim(), slug })
                        });
                        const result = await response.json();
                        if (result.emailExists === false) {
                          setForgotPasswordError('No account found with this email. Would you like to sign up?');
                        } else {
                          setForgotPasswordSent(true);
                        }
                      } catch (error) {
                        setForgotPasswordError('Failed to send reset email. Please try again.');
                      } finally {
                        setForgotPasswordLoading(false);
                      }
                    }}
                    disabled={forgotPasswordLoading}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#635BFF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: forgotPasswordLoading ? 'not-allowed' : 'pointer',
                      opacity: forgotPasswordLoading ? 0.7 : 1
                    }}
                  >
                    {forgotPasswordLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                  <p style={{ fontSize: '14px', color: '#059669', fontWeight: '500', marginBottom: '8px' }}>
                    Reset link sent!
                  </p>
                  <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
                    Check your email ({forgotEmail}) for the password reset link.
                  </p>
                  <button
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotPasswordSent(false);
                    }}
                    style={{
                      padding: '10px 20px',
                      background: 'transparent',
                      color: '#635BFF',
                      border: '1px solid #635BFF',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Show selected customer details */}
          {currentCustomer && (
            <CustomerInfoBox>
              <CustomerInfoContent>
                <CustomerInfoName>{currentCustomer.name}</CustomerInfoName>
                <CustomerInfoDetails>
                  {currentCustomer.phone}
                  {currentCustomer.email && ` • ${currentCustomer.email}`}
                </CustomerInfoDetails>
              </CustomerInfoContent>
              <ClearButton
                onClick={() => {
                  logoutCustomer();
                  setShowMemberForm(false);
                }}
                title="Clear customer info"
              >
                ×
              </ClearButton>
            </CustomerInfoBox>
          )}

          {/* Show guest info if saved */}
          {guestInfo && guestInfo.name !== 'Guest' && !currentCustomer && (
            <CustomerInfoBox>
              <CustomerInfoContent>
                <CustomerInfoName>{guestInfo.name}</CustomerInfoName>
                <CustomerInfoDetails>
                  {guestInfo.phone || 'No phone number'}
                </CustomerInfoDetails>
              </CustomerInfoContent>
              <ClearButton
                onClick={() => {
                  setGuestInfo(null);
                  setGuestName('');
                  setGuestPhone('');
                  setGuestEmail('');
                  setShowGuestForm(false);
                }}
                title="Clear guest info"
              >
                ×
              </ClearButton>
            </CustomerInfoBox>
          )}
        </Section>

        {/* Delivery Address Section - only show for delivery orders */}
        {orderType === 'delivery' && (
          <Section>
            <SectionTitle>Delivery Information *</SectionTitle>

            {/* Disable Quick Order for delivery */}
            {guestInfo && guestInfo.name === 'Guest' && !guestInfo.phone && (
              <InfoBox>
                ⚠️ Quick Order is not available for delivery. Please enter your contact information and address.
              </InfoBox>
            )}

            {/* Show minimum order warning if applicable */}
            {operationSettings.deliveryPricing?.minimumOrder > 0 && subtotal < operationSettings.deliveryPricing.minimumOrder && (
              <InfoBox>
                ℹ️ Minimum order for delivery: {formatCurrency(operationSettings.deliveryPricing.minimumOrder, currency)}
              </InfoBox>
            )}

            <FormGroup>
              <Label>Delivery Address *</Label>
              <TextArea
                placeholder="Enter your full delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Delivery Notes (Optional)</Label>
              <TextArea
                placeholder="E.g., Gate code, landmark, special instructions..."
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                style={{ minHeight: '60px' }}
              />
            </FormGroup>

            {deliveryZones.length > 0 && (
              <FormGroup>
                <Label>Select Delivery Zone *</Label>
                {deliveryZones.map(zone => (
                  <ZoneCard
                    key={zone.id}
                    selected={selectedZone === zone.id}
                    onClick={() => setSelectedZone(zone.id)}
                    type="button"
                  >
                    <ZoneName>{zone.name}</ZoneName>
                    <ZoneDetails>
                      <ZoneDescription>{zone.description}</ZoneDescription>
                      <ZoneFee>
                        {operationSettings.deliveryPricing?.freeAbove && subtotal >= operationSettings.deliveryPricing.freeAbove
                          ? 'FREE'
                          : formatCurrency(zone.fee, currency)}
                      </ZoneFee>
                    </ZoneDetails>
                  </ZoneCard>
                ))}
              </FormGroup>
            )}
          </Section>
        )}

        {/* Pre-order Pickup Time Section - only show for pickup orders */}
        {orderType === 'pickup' && (
          <Section>
            <SectionTitle>Pickup Time *</SectionTitle>

            <button
              type="button"
              onClick={() => {
                setIsImmediatePickup(true);
                setSelectedPickupTime(null);
              }}
              style={{
                width: '100%',
                padding: '16px',
                marginBottom: '12px',
                border: `1px solid ${isImmediatePickup ? '#635BFF' : '#E6EBF1'}`,
                borderRadius: '8px',
                background: isImmediatePickup ? '#F0F4FF' : 'white',
                color: isImmediatePickup ? '#635BFF' : '#0A2540',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              Ready as soon as possible
            </button>

            <div style={{ fontSize: '14px', fontWeight: '600', color: '#0A2540', marginBottom: '12px', textAlign: 'center' }}>
              Or schedule a pickup time
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {availablePickupSlots.map(slot => {
                const [hour, min] = slot.split(':').map(Number);
                const startPeriod = hour >= 12 ? 'PM' : 'AM';
                const startHour12 = hour % 12 || 12;

                // Calculate end time (30 minutes later)
                const endMinutes = (hour * 60 + min + 30);
                const endHour = Math.floor(endMinutes / 60);
                const endMin = endMinutes % 60;
                const endPeriod = endHour >= 12 ? 'PM' : 'AM';
                const endHour12 = endHour % 12 || 12;

                // Format: "9:00 - 9:30 AM" or "11:30 AM - 12:00 PM"
                const startTime = `${startHour12}:${min.toString().padStart(2, '0')}`;
                const endTime = `${endHour12}:${endMin.toString().padStart(2, '0')}`;
                const displayTime = startPeriod === endPeriod
                  ? `${startTime} - ${endTime} ${endPeriod}`
                  : `${startTime} ${startPeriod} - ${endTime} ${endPeriod}`;

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setIsImmediatePickup(false);
                      setSelectedPickupTime(slot);
                    }}
                    style={{
                      padding: '12px 8px',
                      border: `1px solid ${!isImmediatePickup && selectedPickupTime === slot ? '#635BFF' : '#E6EBF1'}`,
                      borderRadius: '8px',
                      background: !isImmediatePickup && selectedPickupTime === slot ? '#F0F4FF' : 'white',
                      color: !isImmediatePickup && selectedPickupTime === slot ? '#635BFF' : '#0A2540',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {displayTime}
                  </button>
                );
              })}
            </div>

            {availablePickupSlots.length === 0 && (
              <div style={{ textAlign: 'center', color: '#6B7C93', padding: '20px' }}>
                No available pickup times for today
              </div>
            )}
          </Section>
        )}

        <Section>
          <SectionTitle>Coupon Code</SectionTitle>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              style={{ flex: 1 }}
            />
            <button
              onClick={handleApplyCoupon}
              style={{
                padding: '12px 20px',
                background: '#635BFF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#5A51E6'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#635BFF'}
            >
              Apply
            </button>
          </div>
          {couponError && (
            <div style={{ color: '#DC2626', fontSize: '12px', marginTop: '8px' }}>
              {couponError}
            </div>
          )}
          {couponDiscount > 0 && (
            <div style={{ color: '#059669', fontSize: '12px', marginTop: '8px' }}>
              Coupon applied! You saved {formatCurrency(couponDiscount, currency)}
            </div>
          )}
        </Section>
        
        {sessionStorage.getItem('orderType') === 'dine-in' && availableTables.length > 0 && (
          <TableSection>
            <SectionTitle>Table Number</SectionTitle>
            <TableSelect
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
            >
              <option value="">Free Seating</option>
              {availableTables.map(table => (
                <option key={table} value={table}>{table}</option>
              ))}
            </TableSelect>
          </TableSection>
        )}
        
        <Section>
          <SectionTitle>Payment Method *</SectionTitle>
          {!paymentMethod && (
            <div style={{
              fontSize: '13px',
              color: '#DC2626',
              marginBottom: '12px',
              padding: '8px 12px',
              background: '#FEE2E2',
              borderRadius: '8px'
            }}>
              Please select a payment method to continue
            </div>
          )}
          <PaymentMethods>
            {availableMethods.map(method => (
              <PaymentMethod key={method.key} selected={paymentMethod === method.key}>
                <RadioInput
                  type="radio"
                  name="payment"
                  checked={paymentMethod === method.key}
                  onChange={() => {
                    console.log('🔵 Payment method changed to:', method.key);
                    setPaymentMethod(method.key);
                    setError(''); // Clear error when method is selected
                  }}
                />
                <MethodInfo>
                  <MethodName>{method.label}</MethodName>
                </MethodInfo>
              </PaymentMethod>
            ))}
          </PaymentMethods>
          
          {paymentMethod === 'card' && (
            <CardForm>
              <Input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
              />
              <Input
                type="text"
                placeholder="Cardholder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <CardRow>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                  maxLength={5}
                />
                <Input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  maxLength={3}
                />
              </CardRow>
            </CardForm>
          )}

        </Section>
      </Container>
      
      <PayButton 
        onClick={handlePayment} 
        disabled={isProcessing || cartItems.length === 0}
      >
        {isProcessing ? (
          <>
            <LoadingSpinner />
            Processing...
          </>
        ) : (
          <>
            Pay {formatCurrency(total, currency)}
          </>
        )}
      </PayButton>
      
      <CustomerModal />
    </MobileLayout>
  );
};

export default PaymentPage;