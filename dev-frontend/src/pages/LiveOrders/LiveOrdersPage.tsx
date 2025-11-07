import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { io, Socket } from 'socket.io-client';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import PaymentModal from '../../components/POSTerminal/PaymentModal';

// Helper function to get fetch options with auth token
const getFetchOptions = (options: RequestInit = {}): RequestInit => {
  const token = localStorage.getItem('auth_token');
  return {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  };
};

// Time Ago Display Component - 실시간 업데이트용
const TimeAgoDisplay: React.FC<{ dateString: string }> = ({ dateString }) => {
  const [display, setDisplay] = React.useState('calculating...');
  
  React.useEffect(() => {
    const updateDisplay = () => {
      if (!dateString) {
        setDisplay('just now');
        return;
      }
      
      const now = new Date().getTime();
      const orderTime = new Date(dateString).getTime();
      if (isNaN(orderTime)) {
        console.warn('Invalid dateString:', dateString);
        setDisplay('just now');
        return;
      }
      
      const diffMs = now - orderTime;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);
      
      let result: string;
      if (diffMins < 1) result = 'just now';
      else if (diffMins === 1) result = '1 min ago';
      else if (diffMins < 60) result = `${diffMins} mins ago`;
      else if (diffHours === 1) result = '1 hour ago';
      else if (diffHours < 24) result = `${diffHours} hours ago`;
      else if (diffDays === 1) result = '1 day ago';
      else result = `${diffDays} days ago`;
      
      setDisplay(result);
    };
    
    updateDisplay(); // 즉시 계산
    
    // 10초마다 업데이트
    const timer = setInterval(updateDisplay, 10000);
    
    return () => clearInterval(timer);
  }, [dateString]);
  
  return <span style={{ fontSize: '12px' }}>{display}</span>;
};

// Database Order interface
// Note: OrderCompleteModal은 라이브 오더에서 사용하지 않음 (POS Terminal 전용)
interface DbOrder {
  id: number;
  restaurant_id: number;
  order_number: string;
  customer_name: string | null;
  customer_phone: string | null;
  table_number: string | null;
  total_amount: number;
  status: 'awaiting_payment' | 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  order_type: 'dine_in' | 'takeaway' | 'delivery';
  payment_method: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'payment_verification_pending' | 'paid';
  kitchen_ready?: boolean;
  order_date: string;
  order_items: any;
  createdAt: string;
  updatedAt: string;
}

const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.header`
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const RefreshButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  background: white;
  color: #6B7C93;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #F6F9FC;
    border-color: #C7D2FE;
  }
`;

const AudioToggleButton = styled.button<{ enabled: boolean }>`
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #635BFF;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &:hover {
    color: #5A54E5;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const Content = styled.main`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatusTabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;
`;

const StatusTab = styled.button<{ active?: boolean }>`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#6B7C93'};
  cursor: pointer;
  position: relative;
  transition: all 0.15s;

  &:hover {
    color: #635BFF;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.active ? '#635BFF' : 'transparent'};
    transition: all 0.15s;
  }
`;

const TabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`;

const OrdersCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
  }
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
  }

  tbody {
    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const TableHeader = styled.thead`
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: white;
    border-radius: 10px;
    border: 1px solid #E6EBF1;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TableHead = styled.th`
  padding: 16px 24px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: 20px 24px;
  font-size: 14px;
  color: #0A2540;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 5px);
    min-width: 140px;
    padding: 0;
    border-bottom: none;

    &:before {
      content: attr(data-label);
      display: block;
      font-size: 10px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }

    &:last-child {
      flex: 1 1 100%;
      padding-top: 10px;
      margin-top: 10px;
      border-top: 1px solid #F3F4F6;

      &:before {
        display: none;
      }
    }
  }
`;

const OrderNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`;

const OrderTypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: #FEF3C7;
  color: #F59E0B;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
`;

const PickupNumber = styled.div`
  display: inline-flex;
  align-items: center;
  background: #635BFF;
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
`;

const CustomerInfo = styled.div`
  color: #6B7C93;
  font-size: 13px;
  margin-top: 2px;
`;

const ItemsList = styled.div`
  line-height: 1.6;
`;

const ItemWithOptions = styled.div`
  margin-bottom: 6px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemQuantity = styled.span`
  color: #6B7C93;
  margin-right: 8px;
`;

const ItemOptionsInline = styled.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'awaiting_payment': return '#FEF3C7';
      case 'pending': return '#FEF3C7';
      case 'preparing': return '#DBEAFE';
      case 'ready': return '#D1FAE5';
      case 'served': return '#D1FAE5';
      case 'completed': return '#E5E7EB';
      case 'cancelled': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'awaiting_payment': return '#F59E0B';
      case 'pending': return '#92400E';
      case 'preparing': return '#1E40AF';
      case 'ready': return '#065F46';
      case 'served': return '#065F46';
      case 'completed': return '#374151';
      case 'cancelled': return '#991B1B';
      default: return '#6B7280';
    }
  }};
`;

const TimeInfo = styled.div`
  color: #6B7C93;
  font-size: 13px;
  line-height: 1.4;
`;

const Amount = styled.div`
  font-weight: 600;
  color: #0A2540;
`;

const PaymentMethod = styled.div<{ isPending?: boolean; isVerificationPending?: boolean }>`
  color: ${props => props.isVerificationPending ? '#F59E0B' : props.isPending ? '#FF6B6B' : '#6B7C93'};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${props => (props.isPending || props.isVerificationPending) ? '500' : 'normal'};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  background: ${props => props.variant === 'secondary' ? '#F6F9FC' : '#635BFF'};
  color: ${props => props.variant === 'secondary' ? '#6B7C93' : 'white'};
  border: ${props => props.variant === 'secondary' ? '1px solid #E6EBF1' : 'none'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: ${props => props.variant === 'secondary' ? '#E6EBF1' : '#5A51E6'};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 11px;
    flex: 0 0 auto;
  }
`;

const IconButton = styled.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
    margin-left: 0;
  }
`;

const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #6B7280;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

// Modal styles
const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const OrderDetailSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`;

const DetailLabel = styled.span`
  color: #6B7C93;
`;

const DetailValue = styled.span`
  font-weight: 500;
`;

const ItemDetail = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F6F9FC;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ItemOptions = styled.div`
  font-size: 13px;
  color: #6B7C93;
  margin-bottom: 4px;
`;

const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #E6EBF1;
  margin: 20px 0;
`;

const TotalSection = styled.div`
  background: #F6F9FC;
  padding: 20px;
  border-radius: 8px;
`;

const TotalRow = styled.div<{ isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${props => props.isTotal ? '18px' : '14px'};
  font-weight: ${props => props.isTotal ? '700' : '400'};
  color: ${props => props.isTotal ? '#0A2540' : '#6B7C93'};
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// Bill print styles
const BillPrintContainer = styled.div`
  display: none;
  position: absolute;
  top: 0;
  left: -9999px;
  width: 80mm;
  background: white;
  padding: 10mm;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #000;
  
  * {
    color: #000 !important;
    background: white !important;
  }
`;

// Global print styles
const PrintStyles = createGlobalStyle<{ isPrinting: boolean }>`
  @media print {
    ${props => props.isPrinting && `
      body * {
        visibility: hidden !important;
      }
      
      #bill-print-content, #bill-print-content * {
        visibility: visible !important;
      }
      
      #bill-print-content {
        display: block !important;
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 80mm !important;
        background: white !important;
        padding: 10mm !important;
        margin: 0 !important;
      }
    `}
  }
`;

const BillHeader = styled.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const BillTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`;

const BillSection = styled.div`
  margin: 10px 0;
  padding: 5px 0;
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`;

const BillItem = styled.div`
  margin: 8px 0;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
`;

const BillItemName = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

const BillItemOptions = styled.div`
  font-size: 11px;
  margin-left: 10px;
  font-style: italic;
`;

const BillTotal = styled.div`
  border-top: 2px solid #000;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

const BillFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`;

interface CompanyInfo {
  companyName: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  taxNo?: string;
}

const LiveOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderForPayment, setOrderForPayment] = useState<DbOrder | null>(null);
  const [showOrderCompleteModal, setShowOrderCompleteModal] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [timeDisplayKey, setTimeDisplayKey] = useState(0); // Time display update key
  const [audioEnabled, setAudioEnabled] = useState(true); // Audio notification toggle

  // Audio notification for new orders
  const playNotificationSound = useCallback(() => {
    if (!audioEnabled) return;

    try {
      // Create a simple notification sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Configure sound (pleasant notification tone)
      oscillator.frequency.value = 800; // Hz
      oscillator.type = 'sine';

      // Volume envelope
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      // Play sound
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);

      // Play a second tone for double beep
      setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();

        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);

        oscillator2.frequency.value = 1000;
        oscillator2.type = 'sine';

        gainNode2.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode2.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.5);
      }, 200);

      console.log('🔔 New order notification sound played');
    } catch (error) {
      console.error('Failed to play notification sound:', error);
    }
  }, [audioEnabled]);

  // Update time display key every 10 seconds to trigger re-render of TimeAgoDisplay components
  useEffect(() => {
    // 즉시 한 번 업데이트
    setTimeDisplayKey(prev => prev + 1);
    
    // 10초마다 업데이트하여 모든 시간 표시를 갱신
    const timer = setInterval(() => {
      setTimeDisplayKey(prev => prev + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  // Fetch orders from database
  const fetchOrders = useCallback(async () => {
    if (!user?.restaurantId) return;

    try {
      const response = await fetch(`/api/orders/restaurant/${user.restaurantId}`, getFetchOptions());
      const result = await response.json();

      if (result.success && result.data) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.restaurantId]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!user?.restaurantId) {
      console.warn('⚠️ Cannot initialize Socket.IO: No restaurantId');
      return;
    }

    console.log('🔌 Initializing Socket.IO connection to /orders namespace...');
    console.log('   Restaurant ID:', user.restaurantId);

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to /orders namespace, Socket ID:', newSocket.id);
      console.log('   Joining restaurant room:', user.restaurantId);
      newSocket.emit('join-restaurant', user.restaurantId);
    });

    newSocket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection error:', error);
    });

    newSocket.on('order-created', (order: DbOrder) => {
      console.log('📥 New order received via Socket.IO:', {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status
      });
      setOrders(prev => [order, ...prev]);

      // Play notification sound for new order
      playNotificationSound();
    });

    newSocket.on('order-updated', (order: DbOrder) => {
      console.log('📝 Order updated via Socket.IO:', {
        id: order.id,
        orderNumber: order.order_number,
        status: order.status
      });
      setOrders(prev => prev.map(o => o.id === order.id ? order : o));
    });

    newSocket.on('order-deleted', ({ id }: { id: number }) => {
      console.log('🗑️ Order deleted via Socket.IO:', id);
      setOrders(prev => prev.filter(o => o.id !== id));
    });

    newSocket.on('disconnect', (reason) => {
      console.warn('⚠️ Disconnected from /orders namespace. Reason:', reason);
    });

    setSocket(newSocket);

    return () => {
      console.log('🔌 Cleaning up Socket.IO connection');
      newSocket.disconnect();
    };
  }, [user?.restaurantId, playNotificationSound]);

  // Initial fetch
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Load company information for bill printing
  useEffect(() => {
    const loadCompanyInfo = async () => {
      if (!user?.restaurantId) return;

      try {
        const response = await fetch(`/api/restaurants/${user.restaurantId}`, getFetchOptions());
        const result = await response.json();

        if (result.success || response.ok) {
          const data = result.data || result;
          setCompanyInfo({
            companyName: data.name || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            postcode: data.postal_code || '',
            phone: data.phone || '',
            email: data.email || '',
            taxNo: data.tax_id || ''
          });

          // Load payment methods from restaurant settings
          if (data.payment_settings) {
            setPaymentMethods(data.payment_settings);
          }
        }
      } catch (error) {
        console.error('Failed to load company info:', error);
      }
    };

    loadCompanyInfo();
  }, [user?.restaurantId]);

  // Helper function to determine if order is Outstanding
  const isOutstanding = (order: DbOrder) => {
    return order.status === 'awaiting_payment' ||
           order.payment_status === 'payment_verification_pending';
  };

  // Helper function to get display status
  const getDisplayStatus = (order: DbOrder): string => {
    if (isOutstanding(order)) {
      return 'awaiting_payment';
    }
    return order.status;
  };

  // Format status for display (replace underscores with spaces, capitalize properly)
  const formatStatusDisplay = (status: string): string => {
    if (status === 'awaiting_payment') {
      return 'Outstanding';
    }
    // Replace underscores with spaces and capitalize each word
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getFilteredOrders = () => {
    let filtered;
    if (activeTab === 'all') {
      filtered = orders;
    } else if (activeTab === 'outstanding') {
      filtered = orders.filter(order => isOutstanding(order));
    } else {
      filtered = orders.filter(order => order.status === activeTab);
    }

    // Sort by createdAt descending (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.order_date).getTime();
      const dateB = new Date(b.createdAt || b.order_date).getTime();
      return dateB - dateA;
    });
  };

  const getStatusCount = (status: string) => {
    if (status === 'all') return orders.length;
    if (status === 'outstanding') {
      return orders.filter(order => isOutstanding(order)).length;
    }
    return orders.filter(order => order.status === status).length;
  };

  const handleStatusChange = async (orderId: number, newStatus: DbOrder['status'], setKitchenReady: boolean = false) => {
    // Stop notification sound when status changes
    setAudioEnabled(false);

    // Optimistically update UI immediately
    setOrders(prev => prev.map(order =>
      order.id === orderId ? {
        ...order,
        status: newStatus,
        ...(setKitchenReady && { kitchen_ready: true })
      } : order
    ));

    try {
      const updateData: any = { status: newStatus };

      // If setting kitchen_ready, include it in the update
      if (setKitchenReady) {
        updateData.kitchen_ready = true;
      }

      const response = await fetch(`/api/orders/${orderId}/status`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify(updateData)
      }));

      const result = await response.json();
      if (result.success) {
        console.log('Status updated successfully');
      } else {
        // Revert on error
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      // Revert on error
      fetchOrders();
    }
  };

  const getNextStatus = (currentStatus: DbOrder['status'], paymentStatus?: string): DbOrder['status'] | null => {
    const statusFlow: Record<string, DbOrder['status'] | null> = {
      awaiting_payment: 'pending',
      pending: 'preparing',
      preparing: 'ready',
      ready: paymentStatus === 'completed' ? 'completed' : 'served',
      served: 'completed',
      completed: null,
      cancelled: null
    };
    return statusFlow[currentStatus] || null;
  };

  const getActionLabel = (status: DbOrder['status'], paymentStatus?: string) => {
    const labels: Record<string, string> = {
      awaiting_payment: 'Proceed Without Payment',
      pending: 'Start Cooking',
      preparing: 'Mark Ready',
      ready: 'Served',
      served: 'Complete Order',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return labels[status] || '';
  };

  const getPreviousStatus = (currentStatus: DbOrder['status']): DbOrder['status'] | null => {
    const reverseFlow: Record<string, DbOrder['status'] | null> = {
      preparing: 'pending',
      ready: 'preparing',
      served: 'ready',
      completed: 'served',
      pending: null,
      cancelled: null
    };
    return reverseFlow[currentStatus] || null;
  };

  const handleOrderClick = (order: DbOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handlePrintReceipt = () => {
    if (selectedOrder) {
      setIsPrinting(true);
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          setIsPrinting(false);
        }, 100);
      }, 100);
    }
  };

  const handlePrintBill = (order?: DbOrder) => {
    const orderToPrint = order || selectedOrder;
    if (orderToPrint) {
      setSelectedOrder(orderToPrint);
      setIsPrinting(true);
      setTimeout(() => {
        window.print();
        setTimeout(() => {
          setIsPrinting(false);
        }, 100);
      }, 100);
    }
  };

  const handleConfirmPayment = async () => {
    console.log('💳 Confirm Payment clicked');

    if (!selectedOrder) {
      console.error('❌ No selected order');
      alert('No order selected');
      return;
    }

    console.log('💳 Confirming payment for order:', selectedOrder.id);

    // Stop notification sound when payment confirmed
    setAudioEnabled(false);

    try {
      // 결제 완료 처리
      const response = await fetch(`/api/orders/${selectedOrder.id}`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify({
          payment_status: 'completed'
        })
      }));

      console.log('📨 Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API error:', errorText);
        throw new Error('Failed to confirm payment');
      }

      console.log('✅ Payment confirmed successfully');

      // 결제 완료 후 awaiting_payment이면 pending으로 변경 (주방에 전송)
      if (selectedOrder.status === 'awaiting_payment') {
        console.log('🍳 Sending to kitchen (awaiting_payment → pending)...');
        const statusResponse = await fetch(`/api/orders/${selectedOrder.id}`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({
            status: 'pending'
          })
        }));

        if (statusResponse.ok) {
          console.log('✅ Order sent to kitchen');
        }
      }

      handleCloseModal();
      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error('❌ Error confirming payment:', error);
      alert('Failed to confirm payment. Please try again.');
    }
  };

  const handleQuickConfirmPayment = async (orderId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
    console.log('⚡ Quick Confirm clicked for order:', orderId);

    // Stop notification sound when payment confirmed
    setAudioEnabled(false);

    try {
      // 주문 정보 찾기
      const order = orders.find((o: any) => o.id === orderId);

      // 결제 완료 처리
      const response = await fetch(`/api/orders/${orderId}`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify({
          payment_status: 'completed'
        })
      }));

      console.log('📨 Quick confirm response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Quick confirm API error:', errorText);
        throw new Error('Failed to confirm payment');
      }

      console.log('✅ Quick confirm successful');

      // 결제 완료 후 awaiting_payment이면 pending으로 변경 (주방에 전송)
      if (order && order.status === 'awaiting_payment') {
        console.log('🍳 Sending to kitchen (awaiting_payment → pending)...');
        const statusResponse = await fetch(`/api/orders/${orderId}`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({
            status: 'pending'
          })
        }));

        if (statusResponse.ok) {
          console.log('✅ Order sent to kitchen');
        }
      }

      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error('❌ Error in quick confirm:', error);
      alert('Failed to confirm payment. Please try again.');
    }
  };

  const handleDeleteOrder = (orderId: number) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteOrder = async () => {
    if (orderToDelete) {
      const orderIdToDelete = orderToDelete;

      // Optimistically update UI immediately
      setOrders(prev => prev.filter(o => o.id !== orderIdToDelete));
      setShowDeleteConfirm(false);
      setOrderToDelete(null);

      try {
        const response = await fetch(`/api/orders/${orderIdToDelete}`, getFetchOptions({
          method: 'DELETE'
        }));

        const result = await response.json();
        if (result.success) {
          console.log('Order deleted successfully');
        } else {
          // Revert on error
          fetchOrders();
        }
      } catch (error) {
        console.error('Failed to delete order:', error);
        // Revert on error
        fetchOrders();
      }
    } else {
      setShowDeleteConfirm(false);
    }
  };

  const cancelDeleteOrder = () => {
    setOrderToDelete(null);
    setShowDeleteConfirm(false);
  };

  const handleCancelOrder = (orderId: number) => {
    setOrderToCancel(orderId);
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = async () => {
    if (!orderToCancel) return;

    // Optimistically update UI immediately
    setOrders(prev => prev.map(order =>
      order.id === orderToCancel ? { ...order, status: 'cancelled' as any } : order
    ));

    // Close modals
    setShowCancelConfirm(false);
    if (selectedOrder?.id === orderToCancel) {
      handleCloseModal();
    }

    try {
      const response = await fetch(`/api/orders/${orderToCancel}/status`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify({ status: 'cancelled' })
      }));

      const result = await response.json();
      if (result.success) {
        console.log('Order cancelled successfully');
      } else {
        // Revert on error
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
      // Revert on error
      fetchOrders();
    } finally {
      setOrderToCancel(null);
    }
  };

  const cancelCancelOrder = () => {
    setOrderToCancel(null);
    setShowCancelConfirm(false);
  };

  const handlePaymentClick = (order: DbOrder, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent opening the order detail modal
    }

    // PaymentModal 열기 (결제 방법 선택)
    setOrderForPayment(order);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async (method: string, amountReceived?: number, change?: number) => {
    if (!orderForPayment) return;

    // Stop notification sound when payment confirmed
    setAudioEnabled(false);

    try {
      // 결제 완료 처리 - POS Terminal과 동일한 로직
      const response = await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify({
          payment_status: 'completed',
          payment_method: method
        })
      }));

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      // 결제 완료 후 상태 변경
      if (orderForPayment.status === 'awaiting_payment') {
        // awaiting_payment이면 pending으로 변경 (주방에 전송)
        await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({
            status: 'pending'
          })
        }));
      } else if (orderForPayment.status === 'served') {
        // Served 상태에서 결제 완료 시 바로 completed로 변경
        await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({
            status: 'completed'
          })
        }));
      }

      // PaymentModal 닫기
      setShowPaymentModal(false);
      setOrderForPayment(null);

      // 라이브 오더에서는 OrderCompleteModal 표시하지 않음 (바로 반영)
      // 주문 목록 새로고침하여 결제 상태 반영
      await fetchOrders();

      // 상세 모달이 열려있으면 닫기
      if (isModalOpen) {
        setIsModalOpen(false);
        setSelectedOrder(null);
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      alert('Failed to confirm payment. Please try again.');
    }
  };

  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-MY', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <MainLayout>
      <PrintStyles isPrinting={isPrinting} />
      <Container>
        <Header>
          <HeaderTitle>Live Orders Management</HeaderTitle>
          <HeaderActions>
            <AudioToggleButton
              enabled={audioEnabled}
              onClick={() => setAudioEnabled(!audioEnabled)}
              title={audioEnabled ? 'Stop notification sound' : 'Play notification sound'}
            >
              {audioEnabled ? (
                <svg viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </AudioToggleButton>
          </HeaderActions>
        </Header>

        <Content>
          <StatusTabs>
            <StatusTab
              active={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            >
              All Orders
              <TabBadge>{getStatusCount('all')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'outstanding'}
              onClick={() => setActiveTab('outstanding')}
            >
              Outstanding
              <TabBadge>{getStatusCount('outstanding')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'pending'}
              onClick={() => setActiveTab('pending')}
            >
              Pending
              <TabBadge>{getStatusCount('pending')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'preparing'}
              onClick={() => setActiveTab('preparing')}
            >
              Preparing
              <TabBadge>{getStatusCount('preparing')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'ready'}
              onClick={() => setActiveTab('ready')}
            >
              Ready
              <TabBadge>{getStatusCount('ready')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'served'}
              onClick={() => setActiveTab('served')}
            >
              Served
              <TabBadge>{getStatusCount('served')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'completed'}
              onClick={() => setActiveTab('completed')}
            >
              Completed
              <TabBadge>{getStatusCount('completed')}</TabBadge>
            </StatusTab>
            <StatusTab
              active={activeTab === 'cancelled'}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
              <TabBadge>{getStatusCount('cancelled')}</TabBadge>
            </StatusTab>
          </StatusTabs>

          <OrdersCard>
          {getFilteredOrders().length > 0 ? (
            <OrdersTable>
              <TableHeader>
                <tr>
                  <TableHead>Order</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </tr>
              </TableHeader>
              <tbody>
                {getFilteredOrders().map(order => (
                  <TableRow key={order.id}>
                    <TableCell data-label="ORDER">
                      <OrderNumber onClick={() => handleOrderClick(order)}>
                        {order.order_number}
                        {order.order_type === 'takeaway' && (
                          <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>
                        )}
                      </OrderNumber>
                      <CustomerInfo>
                        {order.customer_name || 'Guest'}<br />
                        {order.customer_phone}
                        {order.table_number && (
                          <><br />Table: {order.table_number}</>
                        )}
                      </CustomerInfo>
                    </TableCell>
                    <TableCell data-label="ITEMS">
                      <ItemsList>
                        {order.order_items && Array.isArray(order.order_items) && order.order_items.map((item: any, index: number) => (
                          <ItemWithOptions key={index}>
                            <div>
                              <ItemQuantity>{item.quantity}x</ItemQuantity>
                              {item.name || item.menuItem?.name || 'Item'}
                            </div>
                            {item.options && item.options.length > 0 && (
                              <ItemOptionsInline>
                                {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                              </ItemOptionsInline>
                            )}
                          </ItemWithOptions>
                        ))}
                      </ItemsList>
                    </TableCell>
                    <TableCell data-label="STATUS">
                      <StatusBadge status={getDisplayStatus(order)}>
                        {formatStatusDisplay(getDisplayStatus(order))}
                      </StatusBadge>
                    </TableCell>
                    <TableCell data-label="TIME">
                      <TimeInfo>
                        {new Date(order.createdAt || order.order_date).toLocaleString()}<br />
                        {/* TimeAgoDisplay 컴포넌트 사용 - 각 주문마다 독립적으로 시간 계산 */}
                        <TimeAgoDisplay 
                          key={`time-${order.id}-${timeDisplayKey}`}
                          dateString={order.createdAt || order.order_date || ''}
                        />
                      </TimeInfo>
                    </TableCell>
                    <TableCell data-label="AMOUNT">
                      <Amount>RM {Number(order.total_amount).toFixed(2)}</Amount>
                      <PaymentMethod
                        isPending={order.payment_status === 'pending'}
                        isVerificationPending={order.payment_status === 'payment_verification_pending'}
                      >
                        {order.payment_status === 'pending' ? 'Pending' :
                         order.payment_status === 'payment_verification_pending' ? 'Verifying' :
                         order.payment_method}
                      </PaymentMethod>
                    </TableCell>
                    <TableCell data-label="ACTION">
                      <ActionButtonsGroup>
                        {/* Served 상태가 아닌 경우에만 Complete Order/다음 단계 버튼 표시 */}
                        {order.status !== 'completed' && order.status !== 'cancelled' && order.status !== 'served' && (
                          <>
                            {/* Show "Proceed Without Payment" button for Outstanding orders */}
                            {isOutstanding(order) ? (
                              <ActionButton
                                onClick={() => {
                                  // Change status to pending (send to kitchen)
                                  handleStatusChange(order.id, 'pending');
                                }}
                                style={{ background: '#F59E0B', borderColor: '#F59E0B', color: 'white' }}
                              >
                                Proceed Without Payment
                              </ActionButton>
                            ) : (
                              <ActionButton
                                onClick={() => {
                                  const nextStatus = getNextStatus(order.status, order.payment_status);
                                  if (nextStatus) {
                                    handleStatusChange(order.id, nextStatus);
                                  }
                                }}
                                style={order.status === 'ready' ? { background: '#10B981', borderColor: '#10B981', color: 'white' } : undefined}
                              >
                                {getActionLabel(order.status, order.payment_status)}
                              </ActionButton>
                            )}
                          </>
                        )}
                        {order.status !== 'cancelled' && order.status !== 'awaiting_payment' && !isOutstanding(order) && (
                          <ActionButton
                            variant="secondary"
                            onClick={() => {
                              // Pending 단계에서는 awaiting_payment로 돌아감
                              if (order.status === 'pending') {
                                handleStatusChange(order.id, 'awaiting_payment');
                              } else {
                                const previousStatus = getPreviousStatus(order.status);
                                if (previousStatus) {
                                  handleStatusChange(order.id, previousStatus);
                                }
                              }
                            }}
                            title="Revert to previous status"
                          >
                            ↺
                          </ActionButton>
                        )}
                        {/* Payment 버튼 - 결제 미완료 시 PaymentModal 열기 (Served 상태에서는 녹색) */}
                        {order.payment_status === 'pending' && (
                          <ActionButton
                            onClick={(e) => handlePaymentClick(order, e)}
                            style={order.status === 'served' ? { background: '#10B981', borderColor: '#10B981', color: 'white' } : { background: '#F6F9FC', color: '#6B7C93', border: '1px solid #E6EBF1' }}
                          >
                            Payment
                          </ActionButton>
                        )}
                        {/* payment_verification_pending 상태에서는 Confirm 버튼 표시 */}
                        {(order.payment_status as any) === 'payment_verification_pending' && (
                          <ActionButton
                            onClick={(e) => handleQuickConfirmPayment(order.id, e)}
                            style={{ background: '#10B981', borderColor: '#10B981', color: 'white' }}
                          >
                            Confirm
                          </ActionButton>
                        )}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOrderClick(order);
                          }}
                          title="View Details"
                        >
                          <IconSymbol>◉</IconSymbol>
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrintBill(order);
                          }}
                          title="Print Bill"
                        >
                          <IconSymbol>🖨</IconSymbol>
                        </IconButton>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOrder(order.id);
                          }}
                          title="Delete Order"
                        >
                          <IconSymbol>✕</IconSymbol>
                        </IconButton>
                      </ActionButtonsGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </OrdersTable>
          ) : (
            <EmptyState>
              No orders found in this category
            </EmptyState>
          )}
        </OrdersCard>

        {/* Order Detail Modal */}
        <ModalOverlay isOpen={isModalOpen} onClick={handleCloseModal} data-modal="order-detail">
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {selectedOrder && (
              <>
                <ModalHeader>
                  <ModalTitle>Order {selectedOrder.order_number}</ModalTitle>
                  <CloseButton onClick={handleCloseModal}>×</CloseButton>
                </ModalHeader>

                <ModalBody>
                  {/* Customer Information */}
                  <OrderDetailSection>
                    <SectionTitle>Customer Information</SectionTitle>
                    <DetailRow>
                      <DetailLabel>Name:</DetailLabel>
                      <DetailValue>{selectedOrder.customer_name || 'Guest'}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Phone:</DetailLabel>
                      <DetailValue>{selectedOrder.customer_phone || 'N/A'}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Order Type:</DetailLabel>
                      <DetailValue>{selectedOrder.order_type?.replace('_', ' ').toUpperCase()}</DetailValue>
                    </DetailRow>
                    {selectedOrder.table_number && (
                      <DetailRow>
                        <DetailLabel>Table Number:</DetailLabel>
                        <DetailValue>{selectedOrder.table_number}</DetailValue>
                      </DetailRow>
                    )}
                  </OrderDetailSection>

                  <Divider />

                  {/* Order Information */}
                  <OrderDetailSection>
                    <SectionTitle>Order Information</SectionTitle>
                    <DetailRow>
                      <DetailLabel>Order Time:</DetailLabel>
                      <DetailValue>{new Date(selectedOrder.createdAt).toLocaleString()}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Status:</DetailLabel>
                      <DetailValue>
                        <StatusBadge status={selectedOrder.status}>
                          {formatStatusDisplay(selectedOrder.status)}
                        </StatusBadge>
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Payment Method:</DetailLabel>
                      <DetailValue>{selectedOrder.payment_method || 'N/A'}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Payment Status:</DetailLabel>
                      <DetailValue>
                        {(selectedOrder.payment_status as any) === 'payment_verification_pending' ? (
                          <span style={{ color: '#F59E0B', fontWeight: 500 }}>⏳ Verification Pending</span>
                        ) : selectedOrder.payment_status === 'pending' ? (
                          <span style={{ color: '#FF6B6B', fontWeight: 500 }}>Pending</span>
                        ) : selectedOrder.payment_status === 'paid' ? (
                          <span style={{ color: '#10B981', fontWeight: 500 }}>✓ Paid</span>
                        ) : (
                          selectedOrder.payment_status || 'N/A'
                        )}
                      </DetailValue>
                    </DetailRow>
                  </OrderDetailSection>

                  {/* Payment Proof Section */}
                  {(selectedOrder as any).payment_proof && (selectedOrder.payment_status as any) === 'payment_verification_pending' && (
                    <>
                      <Divider />
                      <OrderDetailSection>
                        <SectionTitle style={{ color: '#F59E0B' }}>Payment Proof (Customer Submitted)</SectionTitle>
                        {(selectedOrder as any).payment_proof.reference && (
                          <DetailRow>
                            <DetailLabel>Transaction Reference:</DetailLabel>
                            <DetailValue style={{ fontWeight: 600, fontFamily: 'monospace' }}>
                              {(selectedOrder as any).payment_proof.reference}
                            </DetailValue>
                          </DetailRow>
                        )}
                        {(selectedOrder as any).payment_proof.file_name && (
                          <DetailRow>
                            <DetailLabel>Receipt File:</DetailLabel>
                            <DetailValue>{(selectedOrder as any).payment_proof.file_name}</DetailValue>
                          </DetailRow>
                        )}
                        {(selectedOrder as any).payment_proof.uploaded_at && (
                          <DetailRow>
                            <DetailLabel>Submitted At:</DetailLabel>
                            <DetailValue>
                              {new Date((selectedOrder as any).payment_proof.uploaded_at).toLocaleString()}
                            </DetailValue>
                          </DetailRow>
                        )}
                        {(selectedOrder as any).payment_proof.image && (
                          <div style={{ marginTop: '16px' }}>
                            <DetailLabel style={{ marginBottom: '8px' }}>Receipt Image:</DetailLabel>
                            <div style={{ position: 'relative' }}>
                              <img
                                src={(selectedOrder as any).payment_proof.image}
                                alt="Payment receipt"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '400px',
                                  borderRadius: '8px',
                                  border: '1px solid #E5E7EB',
                                  cursor: 'pointer',
                                  display: 'block'
                                }}
                                onClick={() => window.open((selectedOrder as any).payment_proof.image, '_blank')}
                              />
                            </div>
                          </div>
                        )}
                      </OrderDetailSection>
                    </>
                  )}

                  <Divider />

                  {/* Items */}
                  <OrderDetailSection>
                    <SectionTitle>Order Items</SectionTitle>
                    {selectedOrder.order_items && Array.isArray(selectedOrder.order_items) && selectedOrder.order_items.map((item: any, idx: number) => (
                      <ItemDetail key={idx}>
                        <ItemInfo>
                          <ItemName>{item.name || item.menuItem?.name || 'Item'}</ItemName>
                          {item.options && item.options.length > 0 && (
                            <ItemOptions>
                              {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                            </ItemOptions>
                          )}
                          <ItemPrice>
                            <span>{item.quantity} × RM {parseFloat(item.price || item.menuItem?.price || 0).toFixed(2)}</span>
                            <span>RM {(item.quantity * parseFloat(item.price || item.menuItem?.price || 0)).toFixed(2)}</span>
                          </ItemPrice>
                        </ItemInfo>
                      </ItemDetail>
                    ))}
                  </OrderDetailSection>

                  <Divider />

                  {/* Payment Summary */}
                  <TotalSection>
                    <TotalRow isTotal>
                      <span>Total</span>
                      <span>RM {Number(selectedOrder.total_amount).toFixed(2)}</span>
                    </TotalRow>
                  </TotalSection>
                </ModalBody>

                <ModalFooter>
                  <ActionButton variant="secondary" onClick={handleCloseModal}>
                    Close
                  </ActionButton>
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                    <ActionButton
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      style={{ background: '#FF6B6B', borderColor: '#FF6B6B', color: 'white' }}
                    >
                      Cancel Order
                    </ActionButton>
                  )}
                  {/* Payment 버튼 - 결제 미완료 시 표시 (라이브 오더에서는 바로 결제 확인) */}
                  {selectedOrder.payment_status === 'pending' && (
                    <ActionButton
                      onClick={() => handlePaymentClick(selectedOrder)}
                      style={{ background: '#10B981', borderColor: '#10B981', color: 'white' }}
                    >
                      Payment
                    </ActionButton>
                  )}
                  {/* payment_verification_pending 상태에서는 Confirm Payment 버튼 표시 */}
                  {(selectedOrder.payment_status as any) === 'payment_verification_pending' && (
                    <ActionButton
                      onClick={handleConfirmPayment}
                      style={{ background: '#10B981', borderColor: '#10B981', color: 'white' }}
                    >
                      Confirm Payment
                    </ActionButton>
                  )}
                  <ActionButton onClick={handlePrintReceipt}>
                    Print Bill
                  </ActionButton>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </ModalOverlay>

        {/* Bill Print Content - Hidden until print */}
        {selectedOrder && (
          <BillPrintContainer id="bill-print-content">
            <BillHeader>
              <BillTitle>{companyInfo?.companyName || 'Restaurant'}</BillTitle>
              {companyInfo && (
                <>
                  <div style={{ fontSize: '11px', marginTop: '5px' }}>
                    {companyInfo.address}
                  </div>
                  <div style={{ fontSize: '11px' }}>
                    {companyInfo.city}, {companyInfo.state} {companyInfo.postcode}
                  </div>
                  <div style={{ fontSize: '11px' }}>
                    Tel: {companyInfo.phone}
                  </div>
                  {companyInfo.email && (
                    <div style={{ fontSize: '11px' }}>
                      Email: {companyInfo.email}
                    </div>
                  )}
                  {companyInfo.taxNo && (
                    <div style={{ fontSize: '11px', marginTop: '3px' }}>
                      Tax No: {companyInfo.taxNo}
                    </div>
                  )}
                </>
              )}
              <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>
                ORDER RECEIPT
              </div>
            </BillHeader>

            <BillSection style={{ borderTop: '2px solid #000', paddingTop: '10px' }}>
              <BillRow>
                <strong>Order No:</strong>
                <span>{selectedOrder.order_number}</span>
              </BillRow>
              <BillRow>
                <strong>Date:</strong>
                <span>{formatDateTime()}</span>
              </BillRow>
              <BillRow>
                <strong>Customer:</strong>
                <span>{selectedOrder.customer_name || 'Guest'}</span>
              </BillRow>
              <BillRow>
                <strong>Phone:</strong>
                <span>{selectedOrder.customer_phone || 'N/A'}</span>
              </BillRow>
              <BillRow>
                <strong>Order Type:</strong>
                <span>{selectedOrder.order_type === 'dine_in' ? 'DINE IN' : selectedOrder.order_type?.toUpperCase()}</span>
              </BillRow>
              {selectedOrder.table_number && (
                <BillRow>
                  <strong>Table:</strong>
                  <span>{selectedOrder.table_number}</span>
                </BillRow>
              )}
              {selectedOrder.order_type === 'takeaway' && (
                <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0' }}>
                  PICKUP #{selectedOrder.order_number.split('-')[1] || '000'}
                </div>
              )}
            </BillSection>

            <BillSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
              <table style={{ width: '100%', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px dashed #000' }}>
                    <th style={{ textAlign: 'left', padding: '5px 0' }}>Item</th>
                    <th style={{ textAlign: 'center', width: '40px' }}>Qty</th>
                    <th style={{ textAlign: 'right', width: '60px' }}>Price</th>
                    <th style={{ textAlign: 'right', width: '60px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.order_items && Array.isArray(selectedOrder.order_items) && selectedOrder.order_items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td style={{ padding: '5px 0' }}>
                        {item.name || item.menuItem?.name || 'Item'}
                        {item.options && item.options.length > 0 && (
                          <div style={{ fontSize: '10px', fontStyle: 'italic', marginLeft: '10px' }}>
                            {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                          </div>
                        )}
                      </td>
                      <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                      <td style={{ textAlign: 'right' }}>{parseFloat(item.price || item.menuItem?.price || 0).toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>{(item.quantity * parseFloat(item.price || item.menuItem?.price || 0)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </BillSection>

            <BillSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
              <BillRow style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                <span>TOTAL:</span>
                <span>RM {Number(selectedOrder.total_amount).toFixed(2)}</span>
              </BillRow>
            </BillSection>

            <BillSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
              <BillRow>
                <span>Payment Method:</span>
                <span>{selectedOrder.payment_method ? selectedOrder.payment_method.toUpperCase() : 'N/A'}</span>
              </BillRow>
              <BillRow>
                <span>Order Status:</span>
                <span>{selectedOrder.status.toUpperCase()}</span>
              </BillRow>
            </BillSection>

            <BillFooter>
              <div>*** CUSTOMER COPY ***</div>
              <div>Thank you for your purchase!</div>
              <div>Please keep this receipt for your records</div>
            </BillFooter>
          </BillPrintContainer>
        )}

        {/* Delete Confirmation Modal */}
        <ModalOverlay isOpen={showDeleteConfirm} onClick={cancelDeleteOrder} data-modal="delete-confirm">
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Delete Order</ModalTitle>
              <CloseButton onClick={cancelDeleteOrder}>×</CloseButton>
            </ModalHeader>
            
            <ModalBody>
              <p>Are you sure you want to delete this order? This action cannot be undone.</p>
              <p style={{ color: '#FF6B6B', fontWeight: 500, marginTop: '16px' }}>
                Order #{orderToDelete && orders.find(o => o.id === orderToDelete)?.order_number}
              </p>
            </ModalBody>

            <ModalFooter>
              <ActionButton variant="secondary" onClick={cancelDeleteOrder}>
                Cancel
              </ActionButton>
              <ActionButton 
                onClick={confirmDeleteOrder}
                style={{ 
                  background: '#FF6B6B', 
                  borderColor: '#FF6B6B',
                  color: 'white'
                }}
              >
                Delete Order
              </ActionButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>

        {/* Cancel Order Confirmation Modal */}
        <ModalOverlay
          isOpen={showCancelConfirm}
          onClick={(e) => e.target === e.currentTarget && cancelCancelOrder()}
        >
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Cancel Order</ModalTitle>
              <CloseButton onClick={cancelCancelOrder}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                Are you sure you want to cancel this order? The order history will be kept for your records.
              </p>
            </ModalBody>
            <ModalFooter>
              <ActionButton variant="secondary" onClick={cancelCancelOrder}>
                No, Keep Order
              </ActionButton>
              <ActionButton
                onClick={confirmCancelOrder}
                style={{
                  background: '#FF6B6B',
                  borderColor: '#FF6B6B',
                  color: 'white'
                }}
              >
                Yes, Cancel Order
              </ActionButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>

        {/* Payment Modal - POS Terminal과 동일한 모달 사용 (OrderCompleteModal만 제외) */}
        {/* Payment Modal - POS Terminal과 동일한 모달 사용 */}
        {showPaymentModal && orderForPayment && (
          <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setTimeout(() => {
                setOrderForPayment(null);
              }, 100);
            }}
            total={Number(orderForPayment.total_amount)}
            subtotal={Number(orderForPayment.total_amount) / 1.06}
            tax={Number(orderForPayment.total_amount) * 0.06 / 1.06}
            discountAmount={0}
            couponDiscount={0}
            onConfirmPayment={handlePaymentConfirm}
            paymentMethods={paymentMethods}
          />
        )}
        
        {/* Order Complete Modal - 라이브 오더에서는 사용하지 않음 */}
        {/* POS Terminal에서만 사용하는 모달이므로 여기서는 렌더링하지 않음 */}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default LiveOrdersPage;