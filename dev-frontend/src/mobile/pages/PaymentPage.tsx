import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useCustomer } from '../../contexts/CustomerContext';
import { useStore } from '../../contexts/StoreContext';
import CustomerModal from '../../components/Customer/CustomerModal';
import api from '../services/api';
import { generateOrderNumber } from '../../utils/orderUtils';

const Container = styled.div`
  padding-bottom: 100px;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

const CustomerSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CustomerCard = styled.div<{ hasCustomer: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 2px solid ${props => props.hasCustomer ? '#10B981' : '#E5E7EB'};
  border-radius: 12px;
  background: ${props => props.hasCustomer ? 'rgba(16, 185, 129, 0.05)' : '#F9FAFB'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`;

const CustomerInfo = styled.div`
  flex: 1;
`;

const CustomerName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const CustomerDetails = styled.div`
  font-size: 14px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CustomerBadge = styled.span<{ type: 'guest' | 'member' }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.type === 'member' ? '#EBF8FF' : '#F3F4F6'};
  color: ${props => props.type === 'member' ? '#1E40AF' : '#6B7280'};
`;

const ChangeButton = styled.button`
  background: none;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
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

const MethodIcon = styled.span`
  font-size: 20px;
  margin-right: 8px;
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
  z-index: 50;

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

const PaymentProofSection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const ProofTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
`;

const UploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.05);
  }

  input[type="file"] {
    display: none;
  }
`;

const ImagePreview = styled.div`
  margin-top: 12px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #E5E7EB;

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

const BankDetails = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #E5E7EB;
`;

const BankDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  font-size: 13px;

  strong {
    color: #6B7280;
    font-weight: 500;
  }

  span {
    color: #1F2937;
    font-weight: 600;
  }
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  margin-bottom: 12px;

  img {
    width: 200px;
    height: 200px;
  }
`;

const OrDivider = styled.div`
  text-align: center;
  margin: 12px 0;
  color: #9CA3AF;
  font-size: 12px;
  position: relative;

  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40%;
    height: 1px;
    background: #E5E7EB;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
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
  const { cartItems, cartTotal, clearCart, setCurrentOrder, currentStore, setCurrentStore } = useMobileOrder();
  const {
    currentCustomer,
    guestInfo,
    setShowCustomerModal,
    setCustomerModalMode,
    updateCustomerOrderStats,
    setGuestInfo,
    logoutCustomer
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

  // Calculate takeaway charge (using existing function from StoreContext)
  const orderType = sessionStorage.getItem('orderType') as 'dine-in' | 'takeaway' || 'dine-in';
  const calculateTakeawayCharge = () => {
    if (orderType !== 'takeaway' || !operationSettings.takeawayPricing.enabled) {
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
        const itemCharge = getTakeawayCharge(item.menuItem.category);
        charge += itemCharge * item.quantity;
      });
    }
    return charge;
  };

  const subtotal = cartTotal;
  const takeawayCharge = calculateTakeawayCharge();
  const tax = subtotal * 0.06;
  const discountedSubtotal = subtotal - couponDiscount;
  const total = discountedSubtotal + tax + takeawayCharge;

  // Get available payment methods for mobile - recalculates when paymentMethods changes
  const availableMethods = React.useMemo(() => {
    // If payment methods haven't loaded yet, return empty array
    if (!paymentMethods) {
      console.log('⚠️ paymentMethods is null/undefined, returning empty array');
      return [];
    }

    console.log('🔍 Filtering payment methods for mobile. Raw paymentMethods:', JSON.stringify(paymentMethods, null, 2));

    const methods: any[] = [];
    Object.keys(paymentMethods).forEach(key => {
      const method = paymentMethods[key];
      console.log(`🔍 Checking ${key}:`, {
        enabled: method.enabled,
        availableIn: method.availableIn,
        passesCheck: method.enabled && method.availableIn && method.availableIn.includes('mobile')
      });

      // Only show enabled methods that are available in mobile
      if (method.enabled && method.availableIn && method.availableIn.includes('mobile')) {
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
  }, [paymentMethods]);

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

      // Get order type from session
      const orderType = sessionStorage.getItem('orderType') as 'dine-in' | 'takeaway' || 'dine-in';

      console.log('🔵 Step 3: Preparing order...');
      console.log('Order type:', orderType);
      console.log('Payment method:', paymentMethod);

      // Process payment
      console.log('🔵 Step 4: Processing payment for method:', paymentMethod);

        if (paymentMethod === 'payAtCounter' || paymentMethod === 'counter') {
          console.log('🔵 Processing counter payment...');

          // Create order in DATABASE (without order_number - let backend generate it)
          try {
            const dbOrderData = {
              restaurant_id: currentStore?.id || 1,
              // order_number will be auto-generated by backend
              customer_name: currentCustomer ? currentCustomer.name : (guestInfo ? guestInfo.name || 'Guest' : 'Guest'),
              customer_phone: currentCustomer ? currentCustomer.phone : (guestInfo ? guestInfo.phone || null : null),
              table_number: selectedTable || null,
              total_amount: total,
              takeaway_charge: takeawayCharge,
              status: 'awaiting_payment',
              order_type: orderType === 'dine-in' ? 'dine_in' : orderType,
              payment_method: 'counter',
              payment_status: 'pending',
              kitchen_ready: false,
              order_date: new Date(),
              order_items: cartItems.map(item => ({
                name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
                quantity: item.quantity,
                price: item.menuItem.price,
                options: item.selectedOptions || [],
                special_instructions: item.specialInstructions || null,
                is_set_menu: item.menuItem.is_set_menu || false,
                set_items: item.menuItem.set_items || []
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

          // Don't create order yet - just store data for the payment confirmation page
          const pendingOrderData = {
            restaurant_id: currentStore?.id || 1,
            customer_name: currentCustomer ? currentCustomer.name : (guestInfo ? guestInfo.name || 'Guest' : 'Guest'),
            customer_phone: currentCustomer ? currentCustomer.phone : (guestInfo ? guestInfo.phone || null : null),
            table_number: selectedTable || null,
            total_amount: total,
            takeaway_charge: takeawayCharge,
            status: 'awaiting_payment',
            order_type: orderType === 'dine-in' ? 'dine_in' : orderType,
            payment_method: (paymentMethod === 'qr' || paymentMethod === 'qrPayment' || paymentMethod === 'qr_payment') ? 'QR Payment' : 'Bank Transfer',
            payment_status: 'pending',
            kitchen_ready: false,
            order_date: new Date(),
            order_items: cartItems.map(item => ({
              name: item.menuItem.name,
              quantity: item.quantity,
              price: item.menuItem.price,
              options: item.selectedOptions || []
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

          // Create order in DATABASE
          try {
            const dbOrderData = {
              restaurant_id: currentStore?.id || 1,
              // order_number will be auto-generated by backend
              customer_name: currentCustomer ? currentCustomer.name : (guestInfo ? guestInfo.name || 'Guest' : 'Guest'),
              customer_phone: currentCustomer ? currentCustomer.phone : (guestInfo ? guestInfo.phone || null : null),
              table_number: selectedTable || null,
              total_amount: total,
              takeaway_charge: takeawayCharge,
              status: 'pending',
              order_type: orderType === 'dine-in' ? 'dine_in' : orderType,
              payment_method: paymentMethod === 'card' ? 'Card' : 'FPX',
              payment_status: 'completed',
              kitchen_ready: false,
              order_date: new Date(),
              order_items: cartItems.map(item => ({
                name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
                quantity: item.quantity,
                price: item.menuItem.price,
                options: item.selectedOptions || [],
                special_instructions: item.specialInstructions || null,
                is_set_menu: item.menuItem.is_set_menu || false,
                set_items: item.menuItem.set_items || []
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
      setCouponError(`Minimum order of RM ${coupon.minOrder.toFixed(2)} required`);
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
                <ItemPrice>RM {item.totalPrice.toFixed(2)}</ItemPrice>
              </ItemRow>
            ))}
          </ItemsList>

          <SummaryRow>
            <span>Subtotal</span>
            <span>RM {subtotal.toFixed(2)}</span>
          </SummaryRow>
          {couponDiscount > 0 && (
            <SummaryRow>
              <span>Discount</span>
              <span style={{ color: '#059669' }}>-RM {couponDiscount.toFixed(2)}</span>
            </SummaryRow>
          )}
          {takeawayCharge > 0 && (
            <SummaryRow>
              <span>Takeaway Charge</span>
              <span>RM {takeawayCharge.toFixed(2)}</span>
            </SummaryRow>
          )}
          <SummaryRow>
            <span>Tax (6%)</span>
            <span>RM {tax.toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow className="total">
            <span>Total</span>
            <span>RM {total.toFixed(2)}</span>
          </SummaryRow>
        </OrderSummary>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <CustomerSection>
          <SectionTitle>Customer Information</SectionTitle>

          {/* Quick Order 체크박스 */}
          <QuickOrderCheckbox>
            <input
              type="checkbox"
              checked={!!(guestInfo && guestInfo.name === 'Guest' && !guestInfo.phone)}
              onChange={(e) => {
                if (e.target.checked) {
                  // Quick Order 체크 - 아무 정보 없이 바로 게스트로 등록
                  setGuestInfo({
                    name: 'Guest',
                    phone: ''
                  });
                } else {
                  // 체크 해제 - guestInfo 초기화
                  setGuestInfo(null);
                }
              }}
            />
            <span>Quick Order (No customer info required)</span>
          </QuickOrderCheckbox>

          <CustomerChoiceContainer>
            <CustomerChoiceButton
              selected={!!(guestInfo && guestInfo.name !== 'Guest')}
              onClick={() => {
                // Guest Order - 팝업 열어서 정보 입력받기
                setCustomerModalMode('guest');
                setShowCustomerModal(true);
              }}
            >
              <ChoiceTitle>Guest Order</ChoiceTitle>
              <ChoiceSubtitle>Enter basic info</ChoiceSubtitle>
            </CustomerChoiceButton>

            <CustomerChoiceButton
              selected={!!currentCustomer}
              onClick={() => {
                setCustomerModalMode('member');
                setShowCustomerModal(true);
              }}
            >
              <ChoiceTitle>Member</ChoiceTitle>
              <ChoiceSubtitle>Login / Sign up</ChoiceSubtitle>
            </CustomerChoiceButton>
          </CustomerChoiceContainer>

          {/* Show selected customer details below buttons */}
          {currentCustomer && (
            <CustomerInfoBox>
              <CustomerInfoContent>
                <CustomerInfoName>{currentCustomer.name}</CustomerInfoName>
                <CustomerInfoDetails>
                  {currentCustomer.phone}
                </CustomerInfoDetails>
              </CustomerInfoContent>
              <ClearButton
                onClick={() => logoutCustomer()}
                title="Clear customer info"
              >
                ×
              </ClearButton>
            </CustomerInfoBox>
          )}

          {/* Show guest info if entered */}
          {guestInfo && guestInfo.name !== 'Guest' && (
            <CustomerInfoBox>
              <CustomerInfoContent>
                <CustomerInfoName>{guestInfo.name}</CustomerInfoName>
                <CustomerInfoDetails>
                  {guestInfo.phone || 'No phone number'}
                </CustomerInfoDetails>
              </CustomerInfoContent>
              <ClearButton
                onClick={() => setGuestInfo(null)}
                title="Clear guest info"
              >
                ×
              </ClearButton>
            </CustomerInfoBox>
          )}
        </CustomerSection>
        
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
              Coupon applied! You saved RM {couponDiscount.toFixed(2)}
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
            Pay RM {total.toFixed(2)}
          </>
        )}
      </PayButton>
      
      <CustomerModal />
    </MobileLayout>
  );
};

export default PaymentPage;