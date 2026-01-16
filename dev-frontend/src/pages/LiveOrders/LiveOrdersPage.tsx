import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { io, Socket } from 'socket.io-client';
import MainLayout from '../../components/Layout/MainLayout';
import PageHeader from '../../components/common/PageHeader';
import { useAuth } from '../../contexts/AuthContext';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import OptionModal from '../../components/POSTerminal/OptionModal';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
// OLD: import { printBill } from '../../utils/thermalPrinter';
import { printBillViaRawBT, generateBillContent, printKitchenTicketViaRawBT, generateKitchenTicketPreview } from '../../utils/billPrint';
import { formatDateTime as formatDateTimeUtil, getTimeElapsed } from '../../utils/timezone';

// Helper function to format pickup time as range (e.g., "9:00 - 9:30 AM")
const formatPickupTimeRange = (dateString: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const formatTime = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    const displayMin = minutes.toString().padStart(2, '0');
    return { time: `${displayHour}:${displayMin}`, period };
  };

  const start = formatTime(date);
  const end = formatTime(endDate);

  // If periods are the same, show period only at the end
  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
};

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

// Time Ago Display Component - 실시간 업데이트용 (글로벌 유틸리티 사용)
const TimeAgoDisplay: React.FC<{ dateString: string }> = ({ dateString }) => {
  const [display, setDisplay] = React.useState('calculating...');

  React.useEffect(() => {
    const updateDisplay = () => {
      setDisplay(getTimeElapsed(dateString));
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
  pager_number: string | null;
  total_amount: number;
  status: 'outstanding' | 'awaiting_payment' | 'pending' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  order_type: 'dine_in' | 'takeaway' | 'pickup' | 'delivery';
  scheduled_pickup_time?: string | null;
  payment_method: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'payment_verification_pending' | 'paid';
  kitchen_ready?: boolean;
  order_date: string;
  order_items: any;
  served_at?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Period type for date filtering
type PeriodType = 'today' | 'week' | 'month' | 'year' | 'all';

const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
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

const SelectModeButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#1F2937'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};

  &:hover {
    background: ${props => props.active ? '#5A54E5' : '#F9FAFB'};
  }
`;

const MergeButton = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: #10B981;
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background: #059669;
  }

  &:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
  }
`;

const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const FilterControls = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #E6EBF1;
      border-radius: 4px;
    }
  }
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? '#635BFF' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#6B7C93'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#5A51E6' : '#F8FAFC'};
    border-color: ${props => props.active ? '#5A51E6' : '#CBD5E1'};
  }
`;

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;







const StatusTabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid #E6EBF1;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F8FAFC;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }
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
  white-space: nowrap;
  flex-shrink: 0;

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

const StatisticsBar = styled.div`
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 12px 20px;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: #6B7280;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px 14px;
    font-size: 11px;
  }
`;

const StatItem = styled.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`;

const OrdersCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: visible;

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
  white-space: nowrap;

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
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
`;

// Toast notification styles
const ToastContainer = styled.div<{ isVisible: boolean; type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  transform: translateX(${props => props.isVisible ? '0' : '120%'});
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: transform 0.3s ease, opacity 0.3s ease;
  background: ${props => {
    switch(props.type) {
      case 'success': return '#10B981';
      case 'error': return '#EF4444';
      case 'info': return '#3B82F6';
      default: return '#10B981';
    }
  }};
  color: white;
  max-width: 400px;
`;

const ToastMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

const ToastCloseBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
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

  @media print {
    display: block !important;
    position: static !important;
    left: 0 !important;
  }

  * {
    color: #000 !important;
    background: white !important;
  }
`;

// Global print styles
const PrintStyles = createGlobalStyle`
  @media print {
    @page {
      size: 80mm auto;
      margin: 0mm;
    }

    body {
      margin: 0;
      padding: 0;
      background: white;
    }

    .no-print {
      display: none !important;
    }

    #bill-print-content {
      display: block !important;
      width: 80mm !important;
      max-width: 80mm !important;
      margin: 0 !important;
      padding: 5mm !important;
      background: white !important;
      border: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    #bill-print-content button {
      display: none !important;
    }
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





const BillFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: white;
  border-top: 1px solid #E6EBF1;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 12px;
  }
`;

const PaginationInfo = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#5A51E6' : '#F6F9FC'};
    border-color: ${props => props.active ? '#5A51E6' : '#C7D2FE'};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
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
  const { getStoreInfo, operationSettings } = useStore();
  const [orders, setOrders] = useState<DbOrder[]>([]); // Paginated orders for display
  const [allOrders, setAllOrders] = useState<DbOrder[]>([]); // ALL orders for tab counts
  const [, setSocket] = useState<Socket | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<DbOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderForPayment, setOrderForPayment] = useState<DbOrder | null>(null);
  const [, ] = useState(false);
  const [, ] = useState<any>(null);
  const [showReceiptView, setShowReceiptView] = useState(false);
  const [showKitchenTicketView, setShowKitchenTicketView] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [totalCount, setTotalCount] = useState(0);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [timeDisplayKey, setTimeDisplayKey] = useState(0); // Time display update key
  const [audioEnabled, setAudioEnabled] = useState(true); // Audio notification toggle

  // Membership settings (used by PaymentModal for membership info display)
  const [membershipSettings, setMembershipSettings] = useState<any>(null);

  // Date filter state (default to 'today')
  const [activePeriod, setActivePeriod] = useState<PeriodType>('today');
  const [dateRange, setDateRange] = useState(() => {
    // Get today's date in LOCAL timezone (not UTC)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const localDate = `${year}-${month}-${day}`;
    return {
      start: localDate,
      end: localDate
    };
  });
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Select Mode for merging orders
  const [selectMode, setSelectMode] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeTargetOrderId, setMergeTargetOrderId] = useState<number | null>(null);

  // Add Items View state (inside order detail modal)
  const [showAddItemsView, setShowAddItemsView] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
  const [addItemsSelectedCategory, setAddItemsSelectedCategory] = useState<string | null>(null);
  const [addItemsCart, setAddItemsCart] = useState<any[]>([]);
  const [isAddingItems, setIsAddingItems] = useState(false);
  const [addItemsSearchQuery, setAddItemsSearchQuery] = useState('');
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedMenuItemForOption, setSelectedMenuItemForOption] = useState<any>(null);

  // Toast notification state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // New items added notification (for merged orders)
  const [itemsAddedAlert, setItemsAddedAlert] = useState<{
    isVisible: boolean;
    orderId: number | null;
    orderNumber: string;
    tableNumber: string | null;
    orderGroup: number;
    itemCount: number;
  } | null>(null);

  // Order group print selector
  const [showGroupPrintSelector, setShowGroupPrintSelector] = useState(false);
  const [selectedPrintGroup, setSelectedPrintGroup] = useState<number | null>(null);

  // Show toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
    // Auto-hide after 4 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 4000);
  }, []);

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
  const fetchOrders = useCallback(async (page = 1) => {
    if (!user?.restaurantId) return;

    try {
      const response = await fetch(
        `/api/orders/restaurant/${user.restaurantId}?page=${page}&limit=50&includeCompleted=true`,
        getFetchOptions()
      );
      const result = await response.json();

      if (result.success && result.data) {
        setOrders(result.data);
        if (result.pagination) {
          setCurrentPage(result.pagination.currentPage);
          setTotalPages(result.pagination.totalPages);
          setTotalCount(result.pagination.totalCount);
        }
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.restaurantId]);

  // Fetch ALL orders (not paginated) for tab counts
  const fetchAllOrders = useCallback(async () => {
    if (!user?.restaurantId) {
      return;
    }

    try {
      const response = await fetch(
        `/api/orders/restaurant/${user.restaurantId}?page=1&limit=10000&includeCompleted=true`,
        getFetchOptions()
      );
      const result = await response.json();

      if (result.success && result.data) {
        setAllOrders(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch all orders:', error);
    }
  }, [user?.restaurantId]);

  // Fetch membership settings
  const fetchMembershipSettings = useCallback(async () => {
    if (!user?.restaurantId) return;
    try {
      const response = await fetch(`/api/membership/settings/${user.restaurantId}`, getFetchOptions());
      const result = await response.json();
      if (result.success && result.data) {
        setMembershipSettings(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch membership settings:', error);
    }
  }, [user?.restaurantId]);


  // Store playNotificationSound in ref to avoid socket reconnection on audio state changes
  const playNotificationSoundRef = useRef(playNotificationSound);
  useEffect(() => {
    playNotificationSoundRef.current = playNotificationSound;
  }, [playNotificationSound]);

  // Initialize Socket.IO connection
  useEffect(() => {
    if (!user?.restaurantId) {
      return;
    }

    const newSocket = io('/orders', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.IO /orders namespace');
      newSocket.emit('join-restaurant', user.restaurantId);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    newSocket.on('order-created', (order: DbOrder) => {
      console.log('📥 Socket: order-created', order.id);
      setOrders(prev => [order, ...prev]);
      setAllOrders(prev => [order, ...prev]); // Add to allOrders for tab counts

      // Play notification sound for new order (use ref to avoid dependency)
      playNotificationSoundRef.current();
    });

    newSocket.on('order-updated', (order: DbOrder) => {
      console.log('📥 Socket: order-updated', order.id, order.status);
      setOrders(prev => prev.map(o => o.id === order.id ? order : o));
      setAllOrders(prev => prev.map(o => o.id === order.id ? order : o)); // Update in allOrders too
    });

    newSocket.on('order-deleted', ({ id }: { id: number }) => {
      console.log('📥 Socket: order-deleted', id);
      setOrders(prev => prev.filter(o => o.id !== id));
      setAllOrders(prev => prev.filter(o => o.id !== id)); // Remove from allOrders too
    });

    // New items added to existing order (merged order notification)
    newSocket.on('order-items-added', (data: {
      orderId: number;
      orderNumber: string;
      tableNumber: string | null;
      orderGroup: number;
      addedItems: any[];
      itemCount: number;
    }) => {
      console.log('📥 Socket: order-items-added', data.orderId, `+Order ${data.orderGroup}`);

      // Play notification sound
      playNotificationSoundRef.current();

      // Show alert notification (stays until manually dismissed or View Order clicked)
      setItemsAddedAlert({
        isVisible: true,
        orderId: data.orderId,
        orderNumber: data.orderNumber,
        tableNumber: data.tableNumber,
        orderGroup: data.orderGroup,
        itemCount: data.itemCount
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user?.restaurantId]); // Removed playNotificationSound - using ref instead

  // Initial fetch
  useEffect(() => {
    fetchOrders(currentPage);
  }, [fetchOrders, currentPage]);

  // Fetch all orders for tab counts
  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // Initialize date filter to 'today' on mount
  useEffect(() => {
    handlePeriodChange('today');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset page to 1 when tab or date filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, dateRange.start, dateRange.end, activePeriod]);

  // Handle period change
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);

    const now = new Date();
    let start = new Date();

    // Helper to format date as YYYY-MM-DD in LOCAL timezone
    const formatLocalDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    switch (period) {
      case 'today':
        start = new Date(now);
        start.setHours(0, 0, 0, 0);
        break;
      case 'week':
        start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
        if (allOrders.length > 0) {
          const earliestOrder = allOrders.reduce((earliest, order) => {
            const orderDate = new Date(order.order_date || order.createdAt);
            return orderDate < earliest ? orderDate : earliest;
          }, new Date());
          start = earliestOrder;
        } else {
          start = new Date(now.getFullYear() - 5, 0, 1);
        }
        break;
    }

    setDateRange({
      start: formatLocalDate(start),
      end: formatLocalDate(now)
    });
  };

  // Filter orders by date range and search query
  const getFilteredOrders = () => {
    if (!dateRange.start || !dateRange.end) return allOrders;

    const startDate = new Date(dateRange.start);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(dateRange.end);
    endDate.setHours(23, 59, 59, 999);

    let filtered = allOrders.filter(order => {
      // Use order_date or createdAt (database columns)
      const dateValue = order.order_date || order.createdAt;
      if (!dateValue) {
        return false;
      }

      const orderDate = new Date(dateValue);

      // Check if date is valid
      if (isNaN(orderDate.getTime())) {
        return false;
      }

      const isInRange = orderDate >= startDate && orderDate <= endDate;
      return isInRange;
    });

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(order => {
        // Search in order number
        if (order.order_number?.toLowerCase().includes(query)) return true;

        // Search in customer name
        if (order.customer_name?.toLowerCase().includes(query)) return true;

        // Search in customer phone
        if (order.customer_phone?.replace(/\D/g, '').includes(query.replace(/\D/g, ''))) return true;

        // Search in table number
        if (order.table_number?.toString().includes(query)) return true;

        // Search in order items
        if (order.order_items && Array.isArray(order.order_items)) {
          const hasMatchingItem = order.order_items.some((item: any) =>
            item.menu_item_name?.toLowerCase().includes(query) ||
            item.name?.toLowerCase().includes(query)
          );
          if (hasMatchingItem) return true;
        }

        // Search in payment method
        if (order.payment_method?.toLowerCase().includes(query)) return true;

        return false;
      });
    }

    return filtered;
  };

  // Handle custom date range change
  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    setDateRange(prev => ({ ...prev, [field]: value }));
    setIsCustomDateRange(true);
    setActivePeriod('today'); // Reset active period when using custom dates
  };

  // CSV Download function
  const handleDownloadCSV = () => {
    const filtered = getFilteredOrders();

    if (filtered.length === 0) {
      showToast('No orders to download', 'info');
      return;
    }

    // CSV Headers - 모든 컬럼 포함
    const headers = [
      'Order Number',
      'Date & Time',
      'Customer Name',
      'Phone',
      'Order Type',
      'Table Number',
      'Status',
      'Payment Method',
      'Payment Status',
      'Subtotal',
      'Service Charge',
      'Tax',
      'Discount',
      'Total Amount',
      'Items'
    ];

    // CSV Rows - 모든 항목 포함
    const rows = filtered.map(order => {
      const orderDate = new Date(order.order_date || order.createdAt);
      const formattedDate = orderDate.toLocaleString('en-MY', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const items = order.order_items?.map((item: any) =>
        `${item.quantity}x ${item.menu_item_name || item.name || 'Unknown'}`
      ).join('; ') || '';

      const orderAny = order as any;

      return [
        order.order_number || '',
        formattedDate,
        order.customer_name || 'Guest',
        order.customer_phone || '',
        (order.order_type || '').replace('_', ' ').toUpperCase(),
        order.table_number || '',
        order.status || '',
        order.payment_method || '',
        order.payment_status || 'completed',
        formatCurrency(orderAny.subtotal || order.total_amount || 0, operationSettings.currency),
        formatCurrency(orderAny.service_charge || 0, operationSettings.currency),
        formatCurrency(orderAny.tax || 0, operationSettings.currency),
        formatCurrency(orderAny.discount || 0, operationSettings.currency),
        formatCurrency(order.total_amount || 0, operationSettings.currency),
        items
      ];
    });

    // Generate CSV content with UTF-8 BOM for Excel compatibility
    const csvContent = '\uFEFF' + [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `live_orders_${dateRange.start}_to_${dateRange.end}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    fetchMembershipSettings();
  }, [user?.restaurantId, fetchMembershipSettings]);

  // Helper function to determine if order is Outstanding (not yet sent to kitchen)
  // Mobile order creates orders with status='outstanding', POS creates with status='awaiting_payment'
  // Only checks status, NOT payment_status - they are independent
  const isOutstanding = (order: DbOrder) => {
    return order.status === 'outstanding' ||
           order.status === 'awaiting_payment';
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

  const getFilteredOrdersByTab = () => {
    // Start with date-filtered orders (all orders, not paginated)
    const dateFiltered = getFilteredOrders();

    let filtered;
    if (activeTab === 'all') {
      // All Orders 탭에서는 모든 주문 표시 (cancelled 포함)
      filtered = dateFiltered;
    } else if (activeTab === 'outstanding') {
      filtered = dateFiltered.filter(order => isOutstanding(order));
    } else {
      filtered = dateFiltered.filter(order => order.status === activeTab);
    }

    // Sort by createdAt descending (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.order_date).getTime();
      const dateB = new Date(b.createdAt || b.order_date).getTime();
      return dateB - dateA;
    });
  };

  // Calculate statistics from filtered orders
  const calculateStatistics = () => {
    // Exclude cancelled orders from statistics
    const orders = getFilteredOrdersByTab().filter(order => order.status !== 'cancelled');

    if (orders.length === 0) {
      return {
        totalSales: 0,
        avgOrderAmount: 0,
        maxOrderAmount: 0,
        ordersAbove20Percent: 0,
        avgServeTime: 0,
        maxServeTime: 0,
        minServeTime: 0
      };
    }

    // Calculate sales from orders in current tab (excluding cancelled)
    const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount.toString()), 0);
    const avgOrderAmount = totalSales / orders.length;
    const maxOrderAmount = Math.max(...orders.map(o => parseFloat(o.total_amount.toString())));

    // Calculate percentage of orders >= RM 20
    const ordersAbove20 = orders.filter(o => parseFloat(o.total_amount.toString()) >= 20).length;
    const ordersAbove20Percent = (ordersAbove20 / orders.length) * 100;

    // Calculate serve times (only for orders that have been served)
    const servedOrders = orders.filter(o => o.served_at && o.createdAt);
    let avgServeTime = 0;
    let maxServeTime = 0;
    let minServeTime = 0;

    if (servedOrders.length > 0) {
      const serveTimes = servedOrders.map(o => {
        const created = new Date(o.createdAt).getTime();
        const served = new Date(o.served_at!).getTime();
        return (served - created) / 1000 / 60; // Convert to minutes
      });

      avgServeTime = serveTimes.reduce((sum, time) => sum + time, 0) / serveTimes.length;
      maxServeTime = Math.max(...serveTimes);
      minServeTime = Math.min(...serveTimes);
    }

    return {
      totalSales,
      avgOrderAmount,
      maxOrderAmount,
      ordersAbove20Percent,
      avgServeTime,
      maxServeTime,
      minServeTime
    };
  };

  const getStatusCount = (status: string) => {
    const dateFiltered = getFilteredOrders();

    if (status === 'all') {
      // All 탭 카운트 - 모든 주문 포함 (cancelled 포함)
      return dateFiltered.length;
    }
    if (status === 'outstanding') {
      return dateFiltered.filter(order => isOutstanding(order)).length;
    }
    return dateFiltered.filter(order => order.status === status).length;
  };

  const handleStatusChange = async (orderId: number, newStatus: DbOrder['status'], setKitchenReady: boolean = false) => {
    // Stop notification sound when status changes
    setAudioEnabled(false);

    // Get current timestamp for served_at
    const now = new Date().toISOString();

    // Optimistically update UI immediately
    setOrders(prev => prev.map(order =>
      order.id === orderId ? {
        ...order,
        status: newStatus,
        ...(setKitchenReady && { kitchen_ready: true }),
        ...((newStatus === 'served' || newStatus === 'completed') && !order.served_at && { served_at: now })
      } : order
    ));

    try {
      const updateData: any = { status: newStatus };

      // If setting kitchen_ready, include it in the update
      if (setKitchenReady) {
        updateData.kitchen_ready = true;
      }

      // If changing to served or completed status, include served_at timestamp (if not already set)
      const order = orders.find(o => o.id === orderId);
      if ((newStatus === 'served' || newStatus === 'completed') && !order?.served_at) {
        updateData.served_at = now;
      }

      const response = await fetch(`/api/orders/${orderId}/status`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify(updateData)
      }));

      const result = await response.json();
      if (!result.success) {
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
      outstanding: 'pending',
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

  const getActionLabel = (status: DbOrder['status'], _paymentStatus?: string, orderType?: string) => {
    // For delivery orders, use delivery-specific labels
    if (orderType === 'delivery') {
      const deliveryLabels: Record<string, string> = {
        outstanding: 'Proceed Without Payment',
        awaiting_payment: 'Proceed Without Payment',
        pending: 'Start Preparing',
        preparing: 'Mark Ready',
        ready: 'Out for Delivery',
        served: 'Mark Delivered',
        completed: 'Completed',
        cancelled: 'Cancelled'
      };
      return deliveryLabels[status] || '';
    }

    const labels: Record<string, string> = {
      outstanding: 'Proceed Without Payment',
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

  // Select Mode handlers for merging orders
  const handleSelectOrder = (orderId: number) => {
    setSelectedOrderIds(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  const handleSelectAll = () => {
    const mergeableOrders = getFilteredOrdersByTab()
      .slice((currentPage - 1) * 50, currentPage * 50)
      .filter(order =>
        order.payment_status === 'pending' &&
        !['served', 'completed', 'cancelled'].includes(order.status)
      );

    if (selectedOrderIds.length === mergeableOrders.length) {
      setSelectedOrderIds([]);
    } else {
      setSelectedOrderIds(mergeableOrders.map(o => o.id));
    }
  };

  const toggleSelectMode = () => {
    if (selectMode) {
      // Exiting select mode
      setSelectedOrderIds([]);
    }
    setSelectMode(!selectMode);
  };

  const handleMergeOrders = async () => {
    if (selectedOrderIds.length < 2) {
      showToast('Please select at least 2 orders to merge', 'info');
      return;
    }

    // Get selected orders
    const selectedOrders = orders.filter(o => selectedOrderIds.includes(o.id));

    // Validate: all orders should have pending payment
    const invalidOrders = selectedOrders.filter(o =>
      o.payment_status !== 'pending' ||
      ['served', 'completed', 'cancelled'].includes(o.status)
    );

    if (invalidOrders.length > 0) {
      showToast('Cannot merge orders that are already paid, served, completed, or cancelled.', 'error');
      return;
    }

    // Show modal to select which order to merge INTO
    setShowMergeModal(true);
  };

  // Execute the actual merge after target is selected
  const executeMergeOrders = async (targetId: number) => {
    try {
      setIsMerging(true);
      setShowMergeModal(false);

      const allOrderIds = selectedOrderIds;

      const response = await fetch('/api/orders/merge', getFetchOptions({
        method: 'POST',
        body: JSON.stringify({
          orderIds: allOrderIds,
          targetOrderId: targetId
        })
      }));

      if (!response.ok) {
        let errorMessage = 'Failed to merge orders';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          if (response.status === 403) {
            errorMessage = 'Session expired. Please refresh the page and try again.';
          } else if (response.status === 401) {
            errorMessage = 'Authentication required. Please log in again.';
          }
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();

      // Show success message
      showToast(`Successfully merged ${allOrderIds.length} orders into ${result.data.order_number}`, 'success');

      // Reset select mode
      setSelectMode(false);
      setSelectedOrderIds([]);
      setMergeTargetOrderId(null);

      // Refresh orders
      fetchOrders();
    } catch (error: any) {
      console.error('Merge error:', error);
      showToast(error.message || 'Failed to merge orders', 'error');
    } finally {
      setIsMerging(false);
    }
  };

  const canOrderBeMerged = (order: DbOrder): boolean => {
    return order.payment_status === 'pending' &&
           !['served', 'completed', 'cancelled'].includes(order.status);
  };

  // Fetch menu items for Add Items modal
  const fetchMenuForAddItems = async () => {
    try {
      // Use restaurant_id from selected order, or user's restaurantId
      const restaurantId = selectedOrder?.restaurant_id || user?.restaurantId;
      if (!restaurantId) {
        console.error('No restaurant ID available for fetching menu');
        return;
      }

      const [categoriesRes, itemsRes] = await Promise.all([
        fetch(`/api/menu/categories?restaurantId=${restaurantId}`, getFetchOptions()),
        fetch(`/api/menu?restaurantId=${restaurantId}`, getFetchOptions())
      ]);

      if (categoriesRes.ok && itemsRes.ok) {
        const categoriesResult = await categoriesRes.json();
        const itemsResult = await itemsRes.json();

        // Extract data from API response format { success: true, data: { categories, items } }
        const categories = categoriesResult.data?.categories || categoriesResult.categories || [];
        const items = itemsResult.data?.items || itemsResult.items || [];

        console.log('📦 Add Items - Categories loaded:', categories.length);
        console.log('📦 Add Items - Items loaded:', items.length);

        setMenuCategories(categories.filter((c: any) => c.is_active !== false));
        // Normalize category ID field and parse optionGroups if it's a string
        const normalizedItems = items.map((i: any) => {
          let optionGroups = i.optionGroups;
          // Parse optionGroups if it's a string
          if (typeof optionGroups === 'string') {
            try {
              optionGroups = JSON.parse(optionGroups);
            } catch {
              optionGroups = [];
            }
          }
          return {
            ...i,
            category_id: i.category_id || i.categoryId,
            optionGroups: Array.isArray(optionGroups) ? optionGroups : []
          };
        });
        setMenuItems(normalizedItems.filter((i: any) => i.is_available !== false));
        if (categories.length > 0) {
          // Store as string for consistent comparison
          setAddItemsSelectedCategory(String(categories[0].id));
        }
      } else {
        console.error('Failed to fetch menu - Categories:', categoriesRes.status, 'Items:', itemsRes.status);
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    }
  };

  // Open option modal or add directly
  const handleMenuItemClick = (item: any) => {
    const hasOptions = item.optionGroups && item.optionGroups.length > 0;
    if (hasOptions) {
      setSelectedMenuItemForOption(item);
      setOptionSelections({});
      setOptionQuantity(1);
      setShowOptionModal(true);
    } else {
      // Add directly without options
      handleAddToItemsCart(item, 1, []);
    }
  };

  // Add item to cart in Add Items modal (with options support)
  const handleAddToItemsCart = (item: any, quantity: number = 1, selectedOptions: any[] = []) => {
    const optionsKey = selectedOptions.map((o: any) => o.id || o.name).sort().join(',');

    setAddItemsCart(prev => {
      // For items without options, check if same item exists
      if (selectedOptions.length === 0) {
        const existing = prev.find(i => i.menuItemId === item.id && (!i.selectedOptions || i.selectedOptions.length === 0));
        if (existing) {
          return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
        }
      } else {
        // For items with options, check if same item with same options exists
        const existing = prev.find(i =>
          i.menuItemId === item.id &&
          i.selectedOptions?.map((o: any) => o.id || o.name).sort().join(',') === optionsKey
        );
        if (existing) {
          return prev.map(i => i.cartId === existing.cartId ? { ...i, quantity: i.quantity + quantity } : i);
        }
      }

      // Calculate total price including options
      const optionsTotalPrice = selectedOptions.reduce((sum: number, opt: any) => sum + (parseFloat(opt.price) || 0), 0);
      const unitPrice = parseFloat(item.price) + optionsTotalPrice;

      return [...prev, {
        cartId: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        unitPrice: unitPrice,
        quantity: quantity,
        selectedOptions: selectedOptions,
        is_set_menu: item.is_set_menu,
        set_items: item.set_items
      }];
    });
  };

  // Remove item from cart in Add Items modal (by cartId)
  const handleRemoveFromItemsCart = (cartId: string) => {
    setAddItemsCart(prev => {
      const existing = prev.find(i => i.cartId === cartId);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.cartId !== cartId);
    });
  };

  // Increase quantity in cart
  const handleIncreaseCartItem = (cartId: string) => {
    setAddItemsCart(prev =>
      prev.map(i => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i)
    );
  };

  // Submit Add Items - uses mergeItemsIntoOrder API for order_group support
  const handleSubmitAddItems = async () => {
    if (!selectedOrder?.id || addItemsCart.length === 0) return;

    try {
      setIsAddingItems(true);

      // Format items with options for the merge API
      const items = addItemsCart.map(item => ({
        menu_item_id: item.menuItemId,
        menu_item_name: item.name,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        unitPrice: item.unitPrice || item.price,
        options: item.selectedOptions?.map((opt: any) => ({
          name: opt.name,
          price: opt.price || 0
        })) || [],
        is_set_menu: item.is_set_menu,
        set_items: item.set_items
      }));

      // Use merge API which supports order_group tracking
      const response = await fetch(`/api/orders/${selectedOrder?.id}/merge-items`, getFetchOptions({
        method: 'POST',
        body: JSON.stringify({ items, source: 'live_orders' })
      }));

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add items');
      }

      showToast('Items added successfully', 'success');

      // Reset state and close the entire modal
      setShowAddItemsView(false);
      setAddItemsCart([]);
      setAddItemsSearchQuery('');
      handleCloseModal();

      // Refresh orders
      fetchOrders();
    } catch (error: any) {
      console.error('Add items error:', error);
      showToast(error.message || 'Failed to add items', 'error');
    } finally {
      setIsAddingItems(false);
    }
  };

  // Open Add Items modal effect
  useEffect(() => {
    if (showAddItemsView) {
      fetchMenuForAddItems();
    } else {
      setAddItemsCart([]);
      setAddItemsSelectedCategory(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddItemsView]);

  const handleOrderClick = (order: DbOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setShowReceiptView(false);
    setShowKitchenTicketView(false);
    setShowAddItemsView(false);
    setAddItemsCart([]);
  };

  const handlePrintReceipt = async () => {
    if (selectedOrder) {
      const storeInfo = getStoreInfo();

      // Convert DB order to thermalPrinter format
      const orderData = {
        orderNumber: selectedOrder.order_number,
        pickupNumber: selectedOrder.order_number.split('-')[1],
        date: new Date(selectedOrder.order_date || selectedOrder.createdAt),
        items: selectedOrder.order_items.map((item: any) => ({
          menuItem: {
            name: item.menu_item_name,
            price: parseFloat(item.price)
          },
          quantity: item.quantity,
          options: item.options || []
        })),
        subtotal: parseFloat((selectedOrder as any).subtotal || '0'),
        discount: parseFloat((selectedOrder as any).discount || '0'),
        coupon: (selectedOrder as any).coupon_code ? {
          code: (selectedOrder as any).coupon_code,
          discount: parseFloat((selectedOrder as any).coupon_discount || '0')
        } : null,
        serviceCharge: parseFloat((selectedOrder as any).service_charge || '0'),
        serviceChargeRate: parseFloat((selectedOrder as any).service_charge_rate || '10'),
        tax: parseFloat((selectedOrder as any).tax || '0'),
        taxRate: parseFloat((selectedOrder as any).tax_rate || '6'),
        total: parseFloat((selectedOrder as any).final_price || selectedOrder.total_amount || '0'),
        paymentMethod: selectedOrder.payment_method || 'cash',
        amountReceived: parseFloat((selectedOrder as any).amount_received || '0'),
        change: parseFloat((selectedOrder as any).change || '0')
      };

      // OLD: const success = await printBill(orderData, storeInfo);
      const success = await printBillViaRawBT(orderData, storeInfo);
      if (success) {
        console.log('Receipt printed successfully via RawBT');
      }
    }
  };

  const handlePrintBill = async (order?: DbOrder) => {
    const orderToPrint = order || selectedOrder;
    if (orderToPrint) {
      console.log('🔍 Print Bill - Full order object:', orderToPrint);
      console.log('📦 order_items field:', orderToPrint.order_items);
      console.log('📦 order_items type:', typeof orderToPrint.order_items);
      console.log('📦 Is array?:', Array.isArray(orderToPrint.order_items));

      const storeInfo = getStoreInfo();

      // Ensure order_items is an array
      const orderItems = Array.isArray(orderToPrint.order_items) ? orderToPrint.order_items : [];

      console.log('📦 Processed orderItems:', orderItems);
      console.log('📦 orderItems length:', orderItems.length);

      if (orderItems.length === 0) {
        console.error('❌ No items found in order!');
        showToast('Cannot print: Order has no items.', 'error');
        return;
      }

      // Convert DB order to thermalPrinter format
      const orderData = {
        orderNumber: orderToPrint.order_number,
        pickupNumber: orderToPrint.order_number.split('-')[1],
        date: new Date(orderToPrint.order_date || orderToPrint.createdAt),
        items: orderItems.map((item: any) => {
          // Parse options if it's a JSON string
          let itemOptions = item.options || [];
          if (typeof itemOptions === 'string') {
            try {
              itemOptions = JSON.parse(itemOptions);
            } catch (e) {
              console.warn('Failed to parse options:', itemOptions);
              itemOptions = [];
            }
          }
          // Ensure it's an array
          if (!Array.isArray(itemOptions)) {
            itemOptions = [];
          }

          return {
            menuItem: {
              name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
              price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0')
            },
            quantity: item.quantity || 1,
            options: itemOptions
          };
        }),
        subtotal: parseFloat((orderToPrint as any).subtotal || '0'),
        discount: parseFloat((orderToPrint as any).discount || '0'),
        coupon: (orderToPrint as any).coupon_code ? {
          code: (orderToPrint as any).coupon_code,
          discount: parseFloat((orderToPrint as any).coupon_discount || '0')
        } : null,
        takeawayCharge: parseFloat((orderToPrint as any).takeaway_charge || '0'),
        serviceCharge: parseFloat((orderToPrint as any).service_charge || '0'),
        serviceChargeRate: parseFloat((orderToPrint as any).service_charge_rate || '10'),
        tax: parseFloat((orderToPrint as any).tax || '0'),
        taxRate: parseFloat((orderToPrint as any).tax_rate || '6'),
        total: parseFloat((orderToPrint as any).final_price || orderToPrint.total_amount || '0'),
        paymentMethod: orderToPrint.payment_method || 'cash',
        amountReceived: parseFloat((orderToPrint as any).amount_received || '0'),
        change: parseFloat((orderToPrint as any).change || '0')
      };

      // OLD: const success = await printBill(orderData, storeInfo);
      const success = await printBillViaRawBT(orderData, storeInfo);
      if (success) {
        console.log('Bill printed successfully via RawBT');
      }
    }
  };

  const handlePrintKitchenTicket = async (order?: DbOrder) => {
    const orderToPrint = order || selectedOrder;
    if (orderToPrint) {
      const storeInfo = getStoreInfo();
      const orderItems = Array.isArray(orderToPrint.order_items) ? orderToPrint.order_items : [];

      if (orderItems.length === 0) {
        console.error('❌ No items found in order!');
        showToast('Cannot print: Order has no items.', 'error');
        return;
      }

      const orderData = {
        orderNumber: orderToPrint.order_number,
        pickupNumber: orderToPrint.order_number.split('-')[1],
        date: new Date(orderToPrint.order_date || orderToPrint.createdAt),
        orderType: orderToPrint.order_type,
        orderSource: (orderToPrint as any).order_source || 'pos',
        tableNumber: orderToPrint.table_number || null,
        pagerNumber: orderToPrint.pager_number || null,
        customerName: orderToPrint.customer_name || 'Walk-in Customer',
        items: orderItems.map((item: any) => {
          // Parse options if it's a JSON string
          let itemOptions = item.options || [];
          if (typeof itemOptions === 'string') {
            try {
              itemOptions = JSON.parse(itemOptions);
            } catch (e) {
              console.warn('Failed to parse options:', itemOptions);
              itemOptions = [];
            }
          }
          // Ensure it's an array
          if (!Array.isArray(itemOptions)) {
            itemOptions = [];
          }

          return {
            menuItem: {
              name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
              price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0'),
              is_set_menu: item.is_set_menu || false,
              set_items: item.set_items || []
            },
            quantity: item.quantity || 1,
            options: itemOptions
          };
        }),
        notes: (orderToPrint as any).notes || '',
        takeawayCharge: parseFloat((orderToPrint as any).takeaway_charge || '0')
      };

      const success = await printKitchenTicketViaRawBT(orderData, storeInfo);
      if (success) {
        console.log('Kitchen ticket printed successfully via RawBT');
      }
    }
  };

  // Print kitchen ticket for a specific order group (merged orders)
  const handlePrintGroupTicket = async (groupNum: number, groupItems: any[]) => {
    if (!selectedOrder) return;

    const storeInfo = getStoreInfo();

    if (groupItems.length === 0) {
      showToast('No items in this group', 'error');
      return;
    }

    const orderData = {
      orderNumber: selectedOrder.order_number,
      pickupNumber: selectedOrder.order_number.split('-')[1],
      date: groupItems[0]?.added_at ? new Date(groupItems[0].added_at) : new Date(selectedOrder.order_date || selectedOrder.createdAt),
      orderType: selectedOrder.order_type,
      orderSource: (selectedOrder as any).order_source || 'pos',
      tableNumber: selectedOrder.table_number || null,
      pagerNumber: selectedOrder.pager_number || null,
      customerName: selectedOrder.customer_name || 'Walk-in Customer',
      // Add group label to show this is a partial ticket
      groupLabel: groupNum === 0 ? 'Original Order' : `+Order ${groupNum}`,
      items: groupItems.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') {
          try { itemOptions = JSON.parse(itemOptions); } catch (e) { itemOptions = []; }
        }
        if (!Array.isArray(itemOptions)) itemOptions = [];

        return {
          menuItem: {
            name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
            price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0'),
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || []
          },
          quantity: item.quantity || 1,
          options: itemOptions
        };
      }),
      notes: (selectedOrder as any).notes || '',
      takeawayCharge: 0 // Don't include in group ticket
    };

    const success = await printKitchenTicketViaRawBT(orderData, storeInfo);
    if (success) {
      showToast(`Kitchen ticket for ${groupNum === 0 ? 'Original Order' : `+Order ${groupNum}`} printed`, 'success');
    }
  };

  // Print kitchen ticket for the LATEST order group only (for merged orders)
  const handlePrintLatestGroupTicket = async (order: DbOrder) => {
    const storeInfo = getStoreInfo();
    const orderItems = Array.isArray(order.order_items) ? order.order_items : [];

    if (orderItems.length === 0) {
      showToast('No items in order', 'error');
      return;
    }

    // Find the latest (highest) order_group
    const groups = orderItems.map((item: any) => item.order_group || 0);
    const latestGroup = Math.max(...groups);

    // If only group 0, print the full ticket
    if (latestGroup === 0) {
      handlePrintKitchenTicket(order);
      return;
    }

    // Filter items for latest group only
    const latestGroupItems = orderItems.filter((item: any) => (item.order_group || 0) === latestGroup);

    const orderData = {
      orderNumber: order.order_number,
      pickupNumber: order.order_number.split('-')[1],
      date: latestGroupItems[0]?.added_at ? new Date(latestGroupItems[0].added_at) : new Date(order.order_date || order.createdAt),
      orderType: order.order_type,
      orderSource: (order as any).order_source || 'pos',
      tableNumber: order.table_number || null,
      pagerNumber: order.pager_number || null,
      customerName: order.customer_name || 'Walk-in Customer',
      groupLabel: `+Order ${latestGroup}`,
      items: latestGroupItems.map((item: any) => {
        let itemOptions = item.options || [];
        if (typeof itemOptions === 'string') {
          try { itemOptions = JSON.parse(itemOptions); } catch (e) { itemOptions = []; }
        }
        if (!Array.isArray(itemOptions)) itemOptions = [];

        return {
          menuItem: {
            name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
            price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0'),
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || []
          },
          quantity: item.quantity || 1,
          options: itemOptions
        };
      }),
      notes: '',
      takeawayCharge: 0
    };

    const success = await printKitchenTicketViaRawBT(orderData, storeInfo);
    if (success) {
      showToast(`Kitchen ticket for +Order ${latestGroup} printed`, 'success');
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedOrder) {
      return;
    }

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

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      // 결제 완료 후 outstanding/awaiting_payment이면 pending으로 변경 (주방에 전송)
      // payment_verification_pending 상태 (pay at counter)도 동일하게 처리
      if (selectedOrder.status === 'awaiting_payment' || selectedOrder.status === 'outstanding') {
        await fetch(`/api/orders/${selectedOrder.id}/status`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({
            status: 'pending'
          })
        }));
      }

      handleCloseModal();
      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

  const handleQuickConfirmPayment = async (orderId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal

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

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      // 결제 완료 후 outstanding/awaiting_payment이면 pending으로 변경 (주방에 전송)
      if (order && (order.status === 'awaiting_payment' || order.status === 'outstanding')) {
        await fetch(`/api/orders/${orderId}/status`, getFetchOptions({
          method: 'PATCH',
          body: JSON.stringify({
            status: 'pending'
          })
        }));
      }

      fetchOrders(); // Refresh orders list
    } catch (error) {
      console.error('Error in quick confirm:', error);
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

    // PaymentModal 열기 - 모달이 내부에서 customer points를 직접 로드함
    setOrderForPayment(order);
    setShowPaymentModal(true);
  };

  const handlePaymentConfirm = async (method: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscount?: number) => {
    if (!orderForPayment) return;

    // Stop notification sound when payment confirmed
    setAudioEnabled(false);

    try {
      // Build update payload
      const updatePayload: any = {
        payment_status: 'completed',
        payment_method: method
      };

      // Include points if used
      if (pointsUsed && pointsUsed > 0 && pointDiscount && pointDiscount > 0) {
        updatePayload.points_used = pointsUsed;
        updatePayload.point_discount = pointDiscount;
        // Recalculate total
        updatePayload.total_amount = Number(orderForPayment.total_amount) - pointDiscount;
      }

      // 결제 완료 처리 - POS Terminal과 동일한 로직
      const response = await fetch(`/api/orders/${orderForPayment.id}`, getFetchOptions({
        method: 'PATCH',
        body: JSON.stringify(updatePayload)
      }));

      if (!response.ok) {
        throw new Error('Failed to confirm payment');
      }

      // 결제 완료 후 상태 변경
      if (orderForPayment.status === 'awaiting_payment' || orderForPayment.status === 'outstanding') {
        // awaiting_payment 또는 outstanding이면 pending으로 변경 (주방에 전송)
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
    }
  };

  // Format date/time with restaurant timezone (using global utility)
  const formatDateTime = (date?: Date | string) => {
    return formatDateTimeUtil(date, (companyInfo as any)?.operation_settings);
  };

  return (
    <MainLayout>
      <PrintStyles />

      {/* Items Added Alert - for merged orders */}
      {itemsAddedAlert?.isVisible && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#FEF3C7',
            border: '2px solid #F59E0B',
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 10000,
            maxWidth: '320px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#92400E' }}>
              New Items Added
            </div>
            <button
              onClick={() => setItemsAddedAlert(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#92400E',
                padding: '0',
                lineHeight: 1
              }}
            >
              ×
            </button>
          </div>
          <div style={{ color: '#78350F', fontSize: '14px', marginBottom: '12px' }}>
            <strong>Order {itemsAddedAlert.orderNumber}</strong>
            {itemsAddedAlert.tableNumber && ` (Table ${itemsAddedAlert.tableNumber})`}
            <br />
            <span style={{ background: '#FCD34D', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
              +Order {itemsAddedAlert.orderGroup}
            </span>
            {' '}{itemsAddedAlert.itemCount} item{itemsAddedAlert.itemCount > 1 ? 's' : ''} added
          </div>
          <button
            onClick={() => {
              // Set search query to order number and switch to All tab to show filtered results
              setSearchQuery(itemsAddedAlert.orderNumber);
              setActiveTab('all');
              setItemsAddedAlert(null);
            }}
            style={{
              width: '100%',
              padding: '10px',
              background: '#F59E0B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            View Order
          </button>
        </div>
      )}

      <Container className="no-print">
        <PageHeader title="Live Orders">
          {/* Select Mode Toggle & Merge Button */}
          {selectMode && (
            <>
              <MergeButton
                onClick={handleMergeOrders}
                disabled={selectedOrderIds.length < 2 || isMerging}
              >
                {isMerging ? 'Merging...' : `Merge (${selectedOrderIds.length})`}
              </MergeButton>
              <SelectModeButton active={false} onClick={toggleSelectMode}>
                Cancel
              </SelectModeButton>
            </>
          )}
          {!selectMode && (
            <SelectModeButton active={selectMode} onClick={toggleSelectMode}>
              Select to Merge
            </SelectModeButton>
          )}
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
        </PageHeader>

        <Content>
          <FilterControls>
            <FilterRow>
              <DateButton
                active={activePeriod === 'today' && !isCustomDateRange}
                onClick={() => handlePeriodChange('today')}
              >
                Today
              </DateButton>
              <DateButton
                active={activePeriod === 'week' && !isCustomDateRange}
                onClick={() => handlePeriodChange('week')}
              >
                Week
              </DateButton>
              <DateButton
                active={activePeriod === 'month' && !isCustomDateRange}
                onClick={() => handlePeriodChange('month')}
              >
                Month
              </DateButton>
              <DateButton
                active={activePeriod === 'year' && !isCustomDateRange}
                onClick={() => handlePeriodChange('year')}
              >
                Year
              </DateButton>
              <DateButton
                active={activePeriod === 'all' && !isCustomDateRange}
                onClick={() => handlePeriodChange('all')}
              >
                All
              </DateButton>

              <DateInput
                type="date"
                value={dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
              />
              <span style={{ color: '#6B7C93' }}>to</span>
              <DateInput
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
              />

              <div style={{
                position: 'relative',
                width: '250px',
                marginLeft: '16px'
              }}>
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '16px',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 40px',
                    border: '1px solid #E6EBF1',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box'
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#E5E7EB',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '18px',
                      color: '#6B7280',
                      zIndex: 2
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                onClick={handleDownloadCSV}
                title="Download CSV"
                style={{
                  padding: '10px',
                  background: '#635BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '8px'
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '18px', height: '18px' }}>
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </FilterRow>
          </FilterControls>

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

          <StatisticsBar>
            {(() => {
              const stats = calculateStatistics();
              return (
                <>
                  <StatItem>Total Sales <strong>RM{stats.totalSales.toFixed(2)}</strong></StatItem>
                  <StatItem>Avg <strong>RM{stats.avgOrderAmount.toFixed(2)}</strong></StatItem>
                  <StatItem>Max <strong>RM{stats.maxOrderAmount.toFixed(2)}</strong></StatItem>
                  <StatItem>≥RM20 <strong>{stats.ordersAbove20Percent.toFixed(1)}%</strong></StatItem>
                  <StatItem>Avg Serve <strong>{stats.avgServeTime.toFixed(1)}m</strong></StatItem>
                  <StatItem>Max Serve <strong>{stats.maxServeTime.toFixed(1)}m</strong></StatItem>
                  <StatItem>Min Serve <strong>{stats.minServeTime.toFixed(1)}m</strong></StatItem>
                </>
              );
            })()}
          </StatisticsBar>

          <OrdersCard>
          {getFilteredOrdersByTab().length > 0 ? (
            <OrdersTable>
              <TableHeader>
                <tr>
                  {selectMode && (
                    <TableHead style={{ width: '50px', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedOrderIds.length > 0 && selectedOrderIds.length === getFilteredOrdersByTab()
                          .slice((currentPage - 1) * 50, currentPage * 50)
                          .filter(o => canOrderBeMerged(o)).length}
                        onChange={handleSelectAll}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </TableHead>
                  )}
                  <TableHead>Order</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Action</TableHead>
                </tr>
              </TableHeader>
              <tbody>
                {getFilteredOrdersByTab()
                  .slice((currentPage - 1) * 50, currentPage * 50)
                  .map(order => (
                  <TableRow key={order.id} style={selectMode && selectedOrderIds.includes(order.id) ? { backgroundColor: '#EEF2FF' } : {}}>
                    {selectMode && (
                      <TableCell style={{ width: '50px', textAlign: 'center' }}>
                        {canOrderBeMerged(order) ? (
                          <input
                            type="checkbox"
                            checked={selectedOrderIds.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          />
                        ) : (
                          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>-</span>
                        )}
                      </TableCell>
                    )}
                    <TableCell data-label="ORDER">
                      <OrderNumber onClick={() => handleOrderClick(order)}>
                        {order.order_number}
                        {order.order_type === 'takeaway' && (
                          <OrderTypeBadge>TAKEAWAY</OrderTypeBadge>
                        )}
                        {order.order_type === 'pickup' && (
                          <OrderTypeBadge style={{ background: '#EDE9FE', color: '#7C3AED' }}>PICKUP</OrderTypeBadge>
                        )}
                        {order.order_type === 'delivery' && (
                          <OrderTypeBadge style={{ background: '#D1FAE5', color: '#059669' }}>DELIVERY</OrderTypeBadge>
                        )}
                      </OrderNumber>
                      <CustomerInfo>
                        {order.customer_name || 'Guest'}<br />
                        {order.customer_phone || ((order as any).source === 'mobile' ? 'Mobile Order' : 'POS Terminal')}
                        {order.table_number && (
                          <><br /><span style={{ color: '#635BFF', fontWeight: 500 }}>Table: {order.table_number}</span></>
                        )}
                        {order.pager_number && (
                          <><br />Pager: {order.pager_number}</>
                        )}
                        {order.order_type === 'pickup' && (
                          <><br /><span style={{ color: '#8B5CF6', fontWeight: 500 }}>Pickup: {order.scheduled_pickup_time ? formatPickupTimeRange(order.scheduled_pickup_time) : 'ASAP'}</span></>
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
                        {formatDateTime(order.createdAt || order.order_date)}<br />
                        {/* Show elapsed time only if not served yet */}
                        {!order.served_at && (
                          <TimeAgoDisplay
                            key={`time-${order.id}-${timeDisplayKey}`}
                            dateString={order.createdAt || order.order_date || ''}
                          />
                        )}
                        {/* Show served time for served and completed orders */}
                        {order.served_at && (
                          <span style={{ fontSize: '11px', color: '#0A2540' }}>
                            Served: {formatDateTime(order.served_at)}
                            {(() => {
                              const orderTime = new Date(order.createdAt || order.order_date).getTime();
                              const servedTime = new Date(order.served_at).getTime();
                              const diffMinutes = Math.round((servedTime - orderTime) / 1000 / 60);
                              return ` (${diffMinutes}min)`;
                            })()}
                          </span>
                        )}
                      </TimeInfo>
                    </TableCell>
                    <TableCell data-label="AMOUNT">
                      <Amount>
                        {formatCurrency(Number(order.total_amount), operationSettings.currency)}
                        {/* Points used display */}
                        {Number((order as any).points_used) > 0 && (
                          <span style={{ fontSize: '11px', color: '#10B981', marginLeft: '4px' }}>
                            (-{Number((order as any).points_used).toLocaleString()}P)
                          </span>
                        )}
                        {/* Coupon discount display */}
                        {Number((order as any).coupon_discount) > 0 && (
                          <span style={{ fontSize: '11px', color: '#F59E0B', marginLeft: '4px' }}>
                            (Coupon)
                          </span>
                        )}
                      </Amount>
                      <PaymentMethod
                        isPending={order.payment_status === 'pending'}
                        isVerificationPending={order.payment_status === 'payment_verification_pending'}
                      >
                        {order.payment_method || 'N/A'}
                        {order.payment_status === 'pending' && ' (Pending)'}
                        {order.payment_status === 'payment_verification_pending' && ' (Verifying)'}
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
                                onClick={(e) => {
                                  e.stopPropagation();
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
                                {getActionLabel(order.status, order.payment_status, order.order_type)}
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
                        {/* Quick Complete Button - Show for all statuses except completed, cancelled, and payment pending */}
                        {order.status !== 'completed' && order.status !== 'cancelled' && order.payment_status !== 'pending' && (
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(order.id, 'completed');
                            }}
                            title="Mark as Completed"
                          >
                            <IconSymbol>✓</IconSymbol>
                          </IconButton>
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
                            handlePrintKitchenTicket(order);
                          }}
                          title="Print Kitchen Ticket"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                          </svg>
                        </IconButton>
                        {/* Print Latest Group Ticket (only show if order has multiple groups) */}
                        {(() => {
                          const items = Array.isArray(order.order_items) ? order.order_items : [];
                          const maxGroup = items.length > 0 ? Math.max(...items.map((item: any) => item.order_group || 0)) : 0;
                          return maxGroup > 0 ? (
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrintLatestGroupTicket(order);
                              }}
                              title={`Print +Order ${maxGroup} Ticket`}
                              style={{ background: '#FEF3C7', color: '#92400E' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 4v16m8-8H4"/>
                              </svg>
                            </IconButton>
                          ) : null;
                        })()}
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            if (order.status === 'cancelled') {
                              handleDeleteOrder(order.id);
                            } else {
                              handleCancelOrder(order.id);
                            }
                          }}
                          title={order.status === 'cancelled' ? "Remove Order" : "Cancel Order"}
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
                  <ModalTitle>
                    {showAddItemsView ? 'Add Items to Order' : showReceiptView ? 'Receipt Preview' : showKitchenTicketView ? 'Kitchen Order Ticket Preview' : `Order ${selectedOrder.order_number}`}
                  </ModalTitle>
                  <CloseButton onClick={() => {
                    // X button always closes the entire modal
                    setShowReceiptView(false);
                    setShowKitchenTicketView(false);
                    setShowAddItemsView(false);
                    setAddItemsCart([]);
                    handleCloseModal();
                  }}>×</CloseButton>
                </ModalHeader>

                {showAddItemsView ? (
                  /* Add Items View - Improved UI with options support */
                  <>
                    <ModalBody style={{ padding: '20px', maxHeight: 'calc(70vh - 80px)', overflow: 'auto' }}>
                      {/* Search Input - Fixed width */}
                      <div style={{ marginBottom: '20px' }}>
                        <input
                          type="text"
                          placeholder="Search menu items..."
                          value={addItemsSearchQuery}
                          onChange={(e) => setAddItemsSearchQuery(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #E5E7EB',
                            borderRadius: '8px',
                            fontSize: '15px',
                            outline: 'none',
                            transition: 'border-color 0.15s',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => e.currentTarget.style.borderColor = '#635BFF'}
                          onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                          autoFocus
                        />
                      </div>

                      {/* Search Results - Click to add */}
                      {addItemsSearchQuery.length > 0 && (
                        <div style={{ marginBottom: '20px', maxHeight: '200px', overflowY: 'auto', border: '1px solid #E5E7EB', borderRadius: '8px' }}>
                          {menuItems
                            .filter((item: any) => {
                              if (!item || !item.name) return false;
                              const searchLower = addItemsSearchQuery.toLowerCase();
                              const nameMatch = item.name.toLowerCase().includes(searchLower);
                              const codeMatch = item.code ? item.code.toLowerCase().includes(searchLower) : false;
                              return nameMatch || codeMatch;
                            })
                            .slice(0, 15)
                            .map((item: any) => {
                              // Check if item has optionGroups (can be ID array or object array)
                              const hasOptions = Array.isArray(item.optionGroups) && item.optionGroups.length > 0;
                              return (
                                <div
                                  key={item.id}
                                  style={{
                                    padding: '12px 16px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #F3F4F6',
                                    transition: 'background 0.1s'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                  <div
                                    style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}
                                    onClick={() => {
                                      // Like POS Terminal: Click item area = add directly without options
                                      handleAddToItemsCart(item, 1, []);
                                      setAddItemsSearchQuery('');
                                    }}
                                  >
                                    <span style={{ fontWeight: 500 }}>{item.code ? `${item.code} ` : ''}{item.name}</span>
                                    {item.is_set_menu && <span style={{ marginLeft: '8px', fontSize: '11px', background: '#EDE9FE', color: '#7C3AED', padding: '2px 6px', borderRadius: '4px' }}>SET</span>}
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                    <span style={{ color: '#635BFF', fontWeight: 500 }}>
                                      {formatCurrency(parseFloat(item.price) || 0, operationSettings.currency)}
                                    </span>
                                    {hasOptions && (
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Set item for OptionModal - optionGroups contains ID array like ["6", "7"]
                                          // OptionModal will use MenuContext to get actual option data
                                          setSelectedMenuItemForOption(item);
                                          setShowOptionModal(true);
                                        }}
                                        style={{
                                          padding: '4px 10px',
                                          fontSize: '12px',
                                          background: '#FEF3C7',
                                          color: '#D97706',
                                          border: '1px solid #FCD34D',
                                          borderRadius: '4px',
                                          cursor: 'pointer',
                                          fontWeight: 500
                                        }}
                                      >
                                        Options
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          {menuItems.filter((item: any) =>
                            item.name.toLowerCase().includes(addItemsSearchQuery.toLowerCase()) ||
                            (item.code && item.code.toLowerCase().includes(addItemsSearchQuery.toLowerCase()))
                          ).length === 0 && (
                            <div style={{ padding: '16px', textAlign: 'center', color: '#9CA3AF' }}>
                              No items found
                            </div>
                          )}
                        </div>
                      )}

                      {/* Items to Add */}
                      <div>
                        <h4 style={{ margin: '0 0 12px 0', fontWeight: 600, color: '#0A2540' }}>
                          Items to Add ({addItemsCart.reduce((sum: number, item: any) => sum + item.quantity, 0)})
                        </h4>
                        {addItemsCart.length === 0 ? (
                          <div style={{ padding: '24px', textAlign: 'center', color: '#9CA3AF', background: '#F9FAFB', borderRadius: '8px' }}>
                            Search and select items to add
                          </div>
                        ) : (
                          <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                            {addItemsCart.map((item: any) => (
                              <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #F3F4F6' }}>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontWeight: 500 }}>{item.name}</div>
                                  {item.selectedOptions && item.selectedOptions.length > 0 && (
                                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                                      {item.selectedOptions.map((opt: any) => opt.name).join(', ')}
                                    </div>
                                  )}
                                  <div style={{ color: '#6B7280', fontSize: '13px' }}>
                                    {formatCurrency(item.unitPrice || parseFloat(item.price), operationSettings.currency)} each
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                                  <button
                                    onClick={() => handleRemoveFromItemsCart(item.cartId)}
                                    style={{ width: '32px', height: '32px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '18px', fontWeight: 500 }}
                                  >-</button>
                                  <span style={{ minWidth: '28px', textAlign: 'center', fontWeight: 600, fontSize: '15px' }}>{item.quantity}</span>
                                  <button
                                    onClick={() => handleIncreaseCartItem(item.cartId)}
                                    style={{ width: '32px', height: '32px', border: '1px solid #E5E7EB', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '18px', fontWeight: 500 }}
                                  >+</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </ModalBody>

                    {/* Fixed Footer - Total and Buttons */}
                    <ModalFooter style={{ borderTop: '1px solid #E5E7EB', padding: '16px 20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div style={{ fontWeight: 600 }}>
                          Total: {formatCurrency(
                            addItemsCart.reduce((sum: number, item: any) => sum + ((item.unitPrice || parseFloat(item.price)) * item.quantity), 0),
                            operationSettings.currency
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <ActionButton
                            onClick={() => {
                              // Cancel closes the entire modal
                              setShowAddItemsView(false);
                              setAddItemsCart([]);
                              setAddItemsSearchQuery('');
                              handleCloseModal();
                            }}
                            style={{ background: 'white', color: '#6B7C93', border: '1px solid #E5E7EB' }}
                          >
                            Cancel
                          </ActionButton>
                          <ActionButton
                            onClick={handleSubmitAddItems}
                            disabled={addItemsCart.length === 0 || isAddingItems}
                            style={{
                              background: addItemsCart.length === 0 ? '#E5E7EB' : '#635BFF',
                              color: 'white',
                              cursor: addItemsCart.length === 0 ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {isAddingItems ? 'Adding...' : 'Add to Order'}
                          </ActionButton>
                        </div>
                      </div>
                    </ModalFooter>
                  </>
                ) : showKitchenTicketView ? (
                  <ModalBody style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <div style={{
                      width: '302px',
                      padding: '20px',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      lineHeight: '1.3',
                      whiteSpace: 'pre',
                      backgroundColor: '#ffffff',
                      border: '2px solid #333',
                      borderRadius: '4px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      maxHeight: '600px',
                      overflowY: 'auto',
                      overflowX: 'hidden'
                    }}>
                      {(() => {
                        const storeInfo = getStoreInfo();
                        const orderItems = Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];

                        const orderData = {
                          orderNumber: selectedOrder.order_number,
                          pickupNumber: selectedOrder.order_number.split('-')[1],
                          date: new Date(selectedOrder.order_date || selectedOrder.createdAt),
                          orderType: selectedOrder.order_type,
                          orderSource: (selectedOrder as any).order_source || 'pos',
                          tableNumber: selectedOrder.table_number || null,
                          pagerNumber: selectedOrder.pager_number || null,
                          customerName: selectedOrder.customer_name || 'Walk-in Customer',
                          scheduledPickupTime: selectedOrder.scheduled_pickup_time || null,
                          items: orderItems.map((item: any) => ({
                            menuItem: {
                              name: item.menu_item_name || item.name || 'Unknown Item',
                              price: parseFloat(item.price || '0'),
                              is_set_menu: item.is_set_menu || false,
                              set_items: item.set_items || []
                            },
                            quantity: item.quantity || 1,
                            options: item.options || []
                          })),
                          notes: (selectedOrder as any).notes || '',
                          takeawayCharge: parseFloat((selectedOrder as any).takeaway_charge || '0')
                        };

                        const content = generateKitchenTicketPreview(orderData, storeInfo);
                        return content.split('\n').map((line, i) => <div key={i}>{line || '\u00A0'}</div>);
                      })()}
                    </div>
                  </ModalBody>
                ) : showReceiptView ? (
                  <ModalBody style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                    <div style={{
                      width: '302px',
                      padding: '20px',
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      lineHeight: '1.3',
                      whiteSpace: 'pre',
                      backgroundColor: '#ffffff',
                      border: '2px solid #333',
                      borderRadius: '4px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      maxHeight: '600px',
                      overflowY: 'auto',
                      overflowX: 'hidden'
                    }}>
                      {(() => {
                        const storeInfo = getStoreInfo();
                        const orderItems = Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];

                        const orderData = {
                          orderNumber: selectedOrder.order_number,
                          pickupNumber: selectedOrder.order_number.split('-')[1],
                          pagerNumber: selectedOrder.pager_number || null,
                          date: new Date(selectedOrder.order_date || selectedOrder.createdAt),
                          orderType: selectedOrder.order_type,
                          scheduledPickupTime: selectedOrder.scheduled_pickup_time || null,
                          items: orderItems.map((item: any) => ({
                            menuItem: {
                              name: item.menu_item_name || item.name || (item.menuItem && item.menuItem.name) || 'Unknown Item',
                              price: parseFloat(item.price || (item.menuItem && item.menuItem.price) || '0')
                            },
                            quantity: item.quantity || 1,
                            options: item.options || []
                          })),
                          subtotal: parseFloat((selectedOrder as any).subtotal || '0'),
                          discount: parseFloat((selectedOrder as any).discount || '0'),
                          discountPolicy: (selectedOrder as any).discount_policy_name ? {
                            name: (selectedOrder as any).discount_policy_name,
                            amount: parseFloat((selectedOrder as any).discount_policy_amount || '0')
                          } : undefined,
                          coupon: (selectedOrder as any).coupon_code ? {
                            code: (selectedOrder as any).coupon_code,
                            discount: parseFloat((selectedOrder as any).coupon_discount || '0')
                          } : null,
                          takeawayCharge: parseFloat((selectedOrder as any).takeaway_charge || '0'),
                          serviceCharge: parseFloat((selectedOrder as any).service_charge || '0'),
                          serviceChargeRate: parseFloat((selectedOrder as any).service_charge_rate || '10'),
                          tax: parseFloat((selectedOrder as any).tax || '0'),
                          taxRate: parseFloat((selectedOrder as any).tax_rate || '6'),
                          total: parseFloat((selectedOrder as any).final_price || selectedOrder.total_amount || '0'),
                          paymentMethod: selectedOrder.payment_method || 'cash',
                          amountReceived: parseFloat((selectedOrder as any).amount_received || '0'),
                          change: parseFloat((selectedOrder as any).change || '0'),
                          deliveryInfo: (selectedOrder as any).delivery_info || null,
                          deliveryFee: parseFloat((selectedOrder as any).delivery_fee || '0')
                        };

                        // Generate bill content and remove ESC/POS control characters for display
                        const billContent = generateBillContent(orderData, storeInfo);
                        // Remove all ESC/POS control sequences
                        // ESC sequences: \x1B followed by 1-3 characters
                        // GS sequences: \x1D followed by 1-3 characters
                        return billContent
                          // eslint-disable-next-line no-control-regex
                          .replace(/\x1B[@E][\x00\x01]/g, '')  // INIT, BOLD ON/OFF
                          // eslint-disable-next-line no-control-regex
                          .replace(/\x1Ba[\x00-\x02]/g, '')    // ALIGN LEFT/CENTER/RIGHT
                          // eslint-disable-next-line no-control-regex
                          .replace(/\x1D![\x00-\x11]/g, '')    // TEXT SIZE
                          // eslint-disable-next-line no-control-regex
                          .replace(/\x1DB[\x00\x01]/g, '')     // REVERSE ON/OFF
                          // eslint-disable-next-line no-control-regex
                          .replace(/\x1DV\x41\x00/g, '')       // PAPER CUT
                          // eslint-disable-next-line no-control-regex
                          .replace(/[\x1B\x1D]./g, '');        // Any remaining ESC/GS sequences
                      })()}
                    </div>
                  </ModalBody>
                ) : (
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
                    <DetailRow>
                      <DetailLabel>Source:</DetailLabel>
                      <DetailValue>{(selectedOrder as any).source === 'mobile' ? 'Mobile Order' : (selectedOrder as any).source === 'kiosk' ? 'Kiosk' : 'POS Terminal'}</DetailValue>
                    </DetailRow>
                    {selectedOrder.table_number && (
                      <DetailRow>
                        <DetailLabel>Table Number:</DetailLabel>
                        <DetailValue>{selectedOrder.table_number}</DetailValue>
                      </DetailRow>
                    )}
                    {selectedOrder.order_type === 'pickup' && (
                      <DetailRow>
                        <DetailLabel>Scheduled Pickup:</DetailLabel>
                        <DetailValue style={{ color: '#8B5CF6', fontWeight: 600 }}>
                          {selectedOrder.scheduled_pickup_time ? formatPickupTimeRange(selectedOrder.scheduled_pickup_time) : 'ASAP'}
                        </DetailValue>
                      </DetailRow>
                    )}
                  </OrderDetailSection>

                  {/* Delivery Information */}
                  {selectedOrder.order_type === 'delivery' && (selectedOrder as any).delivery_info && (
                    <>
                      <Divider />
                      <OrderDetailSection>
                        <SectionTitle>Delivery Information</SectionTitle>
                        <DetailRow>
                          <DetailLabel>Address:</DetailLabel>
                          <DetailValue>{(selectedOrder as any).delivery_info.address}</DetailValue>
                        </DetailRow>
                        <DetailRow>
                          <DetailLabel>Phone:</DetailLabel>
                          <DetailValue>{(selectedOrder as any).delivery_info.phone}</DetailValue>
                        </DetailRow>
                        {(selectedOrder as any).delivery_info.zoneName && (
                          <DetailRow>
                            <DetailLabel>Zone:</DetailLabel>
                            <DetailValue>{(selectedOrder as any).delivery_info.zoneName}</DetailValue>
                          </DetailRow>
                        )}
                        {(selectedOrder as any).delivery_info.notes && (
                          <DetailRow>
                            <DetailLabel>Notes:</DetailLabel>
                            <DetailValue style={{ fontStyle: 'italic' }}>{(selectedOrder as any).delivery_info.notes}</DetailValue>
                          </DetailRow>
                        )}
                        {(selectedOrder as any).delivery_fee > 0 && (
                          <DetailRow>
                            <DetailLabel>Delivery Fee:</DetailLabel>
                            <DetailValue>{formatCurrency(parseFloat((selectedOrder as any).delivery_fee || '0'), operationSettings.currency)}</DetailValue>
                          </DetailRow>
                        )}
                      </OrderDetailSection>
                    </>
                  )}

                  <Divider />

                  {/* Order Information */}
                  <OrderDetailSection>
                    <SectionTitle>Order Information</SectionTitle>
                    <DetailRow>
                      <DetailLabel>Order Time:</DetailLabel>
                      <DetailValue>{formatDateTime(selectedOrder.createdAt)}</DetailValue>
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
                              {formatDateTime((selectedOrder as any).payment_proof.uploaded_at)}
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

                  {/* Items - grouped by order_group */}
                  <OrderDetailSection>
                    <SectionTitle>Order Items</SectionTitle>
                    {(() => {
                      const items = selectedOrder.order_items && Array.isArray(selectedOrder.order_items) ? selectedOrder.order_items : [];
                      // Group items by order_group
                      const groupedItems: { [key: number]: any[] } = {};
                      items.forEach((item: any) => {
                        const group = item.order_group || 0;
                        if (!groupedItems[group]) groupedItems[group] = [];
                        groupedItems[group].push(item);
                      });
                      const groupKeys = Object.keys(groupedItems).map(Number).sort((a, b) => a - b);
                      const hasMultipleGroups = groupKeys.length > 1 || (groupKeys.length === 1 && groupKeys[0] > 0);

                      return groupKeys.map((groupNum) => (
                        <div key={groupNum}>
                          {hasMultipleGroups && (
                            <div style={{
                              background: groupNum === 0 ? '#F3F4F6' : '#FEF3C7',
                              padding: '6px 12px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: groupNum === 0 ? '#6B7280' : '#92400E',
                              marginTop: groupNum > 0 ? '12px' : '0',
                              marginBottom: '8px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <span>{groupNum === 0 ? 'Original Order' : `+Order ${groupNum}`}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {groupNum > 0 && groupedItems[groupNum][0]?.added_at && (
                                  <span style={{ fontWeight: 400, fontSize: '11px' }}>
                                    {new Date(groupedItems[groupNum][0].added_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                )}
                                <button
                                  onClick={() => handlePrintGroupTicket(groupNum, groupedItems[groupNum])}
                                  style={{
                                    background: groupNum === 0 ? '#6B7280' : '#F59E0B',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    fontWeight: 500,
                                    cursor: 'pointer'
                                  }}
                                  title="Print kitchen ticket for this group"
                                >
                                  Print
                                </button>
                              </div>
                            </div>
                          )}
                          {groupedItems[groupNum].map((item: any, idx: number) => (
                            <ItemDetail key={`${groupNum}-${idx}`}>
                              <ItemInfo>
                                <ItemName>{item.name || item.menuItem?.name || 'Item'}</ItemName>
                                {item.options && item.options.length > 0 && (
                                  <ItemOptions>
                                    {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                                  </ItemOptions>
                                )}
                                <ItemPrice>
                                  <span>{item.quantity} × {formatCurrency(parseFloat(item.price || item.menuItem?.price || 0), operationSettings.currency)}</span>
                                  <span>{formatCurrency(item.quantity * parseFloat(item.price || item.menuItem?.price || 0), operationSettings.currency)}</span>
                                </ItemPrice>
                              </ItemInfo>
                            </ItemDetail>
                          ))}
                        </div>
                      ));
                    })()}
                  </OrderDetailSection>

                  <Divider />

                  {/* Payment Summary */}
                  <TotalSection>
                    <TotalRow>
                      <span>Subtotal</span>
                      <span>{formatCurrency(Number((selectedOrder as any).subtotal || selectedOrder.total_amount), operationSettings.currency)}</span>
                    </TotalRow>
                    {(selectedOrder as any).takeaway_charge && parseFloat((selectedOrder as any).takeaway_charge) > 0 && (
                      <TotalRow>
                        <span>Takeaway Charge</span>
                        <span>{formatCurrency(parseFloat((selectedOrder as any).takeaway_charge), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    {(selectedOrder as any).discount > 0 && (
                      <TotalRow>
                        <span>Discount</span>
                        <span>{formatCurrency(-Number((selectedOrder as any).discount), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    {(selectedOrder as any).discount_policy_amount > 0 && (
                      <TotalRow>
                        <span>Discount ({(selectedOrder as any).discount_policy_name})</span>
                        <span>{formatCurrency(-Number((selectedOrder as any).discount_policy_amount), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    {(selectedOrder as any).coupon_discount > 0 && (
                      <TotalRow>
                        <span>Coupon ({(selectedOrder as any).coupon_code})</span>
                        <span>{formatCurrency(-Number((selectedOrder as any).coupon_discount), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    {Number((selectedOrder as any).point_discount) > 0 && (
                      <TotalRow>
                        <span>Points ({Number((selectedOrder as any).points_used || 0).toLocaleString()} pts)</span>
                        <span>{formatCurrency(-Number((selectedOrder as any).point_discount), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    {(selectedOrder as any).service_charge > 0 && (
                      <TotalRow>
                        <span>Service Charge ({(selectedOrder as any).service_charge_rate || 10}%)</span>
                        <span>{formatCurrency(Number((selectedOrder as any).service_charge), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    {(selectedOrder as any).tax > 0 && (
                      <TotalRow>
                        <span>Tax ({(selectedOrder as any).tax_rate || 6}%)</span>
                        <span>{formatCurrency(Number((selectedOrder as any).tax), operationSettings.currency)}</span>
                      </TotalRow>
                    )}
                    <TotalRow isTotal>
                      <span>Total</span>
                      <span>{formatCurrency(Number(selectedOrder.total_amount), operationSettings.currency)}</span>
                    </TotalRow>
                  </TotalSection>
                </ModalBody>
                )}

                {/* Hide footer for Add Items view - it has its own buttons */}
                {!showAddItemsView && (
                <ModalFooter>
                  {showReceiptView ? (
                    <ActionButton onClick={() => setShowReceiptView(false)}>
                      Back to Order Details
                    </ActionButton>
                  ) : showKitchenTicketView ? (
                    <ActionButton onClick={() => setShowKitchenTicketView(false)}>
                      Back to Order Details
                    </ActionButton>
                  ) : (
                    <>
                      <ActionButton
                        variant="secondary"
                        onClick={() => handleDeleteOrder(selectedOrder.id)}
                        style={{ background: '#6B7280', borderColor: '#6B7280', color: 'white' }}
                      >
                        Remove
                      </ActionButton>
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                    <ActionButton
                      onClick={() => handleCancelOrder(selectedOrder.id)}
                      style={{ background: '#FF6B6B', borderColor: '#FF6B6B', color: 'white' }}
                    >
                      Cancel Order
                    </ActionButton>
                  )}
                  {/* Outstanding 상태에서 Proceed Without Payment 버튼 */}
                  {isOutstanding(selectedOrder) && selectedOrder.status !== 'pending' && (
                    <ActionButton
                      onClick={() => {
                        handleStatusChange(selectedOrder.id, 'pending');
                        handleCloseModal();
                      }}
                      style={{ background: '#F59E0B', borderColor: '#F59E0B', color: 'white' }}
                    >
                      Proceed Without Payment
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
                  {/* Add Items button - only show for unpaid orders */}
                  {selectedOrder.payment_status === 'pending' && !['served', 'completed', 'cancelled'].includes(selectedOrder.status) && (
                    <ActionButton
                      onClick={() => setShowAddItemsView(true)}
                      style={{ background: '#8B5CF6', borderColor: '#8B5CF6', color: 'white' }}
                    >
                      Add Items
                    </ActionButton>
                  )}
                  <ActionButton onClick={() => setShowReceiptView(true)} style={{ marginRight: '10px' }}>
                    View Receipt
                  </ActionButton>
                  <ActionButton onClick={() => setShowKitchenTicketView(true)} style={{ marginRight: '10px' }}>
                    View Order Ticket
                  </ActionButton>
                  <ActionButton onClick={handlePrintReceipt}>
                    Print Bill
                  </ActionButton>
                    </>
                  )}
                </ModalFooter>
                )}
              </>
            )}
          </ModalContent>
        </ModalOverlay>

        {/* Bill Print Content - Portal to body */}
        {selectedOrder && ReactDOM.createPortal(
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
                <span>{formatDateTime(selectedOrder.order_date || selectedOrder.createdAt)}</span>
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
              {(selectedOrder.order_type === 'takeaway' || selectedOrder.order_type === 'pickup') && (
                <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0' }}>
                  PICKUP #{selectedOrder.order_number.split('-')[1] || '000'}
                </div>
              )}
              {selectedOrder.order_type === 'pickup' && (
                <div style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', margin: '5px 0', color: '#8B5CF6' }}>
                  Pickup: {selectedOrder.scheduled_pickup_time ? formatPickupTimeRange(selectedOrder.scheduled_pickup_time) : 'ASAP'}
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
              <BillRow>
                <span>Subtotal:</span>
                <span>{formatCurrency(Number((selectedOrder as any).subtotal || selectedOrder.total_amount), operationSettings.currency)}</span>
              </BillRow>
              {(selectedOrder as any).discount > 0 && (
                <BillRow>
                  <span>Discount:</span>
                  <span>{formatCurrency(-Number((selectedOrder as any).discount), operationSettings.currency)}</span>
                </BillRow>
              )}
              {(selectedOrder as any).coupon_discount > 0 && (
                <BillRow>
                  <span>Coupon ({(selectedOrder as any).coupon_code}):</span>
                  <span>{formatCurrency(-Number((selectedOrder as any).coupon_discount), operationSettings.currency)}</span>
                </BillRow>
              )}
              {parseFloat((selectedOrder as any).takeaway_charge || 0) > 0 && (
                <BillRow>
                  <span>Takeaway Charge:</span>
                  <span>{formatCurrency(parseFloat((selectedOrder as any).takeaway_charge), operationSettings.currency)}</span>
                </BillRow>
              )}
              {(selectedOrder as any).service_charge > 0 && (
                <BillRow>
                  <span>Service Charge ({(selectedOrder as any).service_charge_rate || 10}%):</span>
                  <span>{formatCurrency(Number((selectedOrder as any).service_charge), operationSettings.currency)}</span>
                </BillRow>
              )}
              {(selectedOrder as any).tax > 0 && (
                <BillRow>
                  <span>Tax ({(selectedOrder as any).tax_rate || 6}%):</span>
                  <span>{formatCurrency(Number((selectedOrder as any).tax), operationSettings.currency)}</span>
                </BillRow>
              )}
              <BillRow style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                <span>TOTAL:</span>
                <span>{formatCurrency(Number(selectedOrder.total_amount), operationSettings.currency)}</span>
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
          </BillPrintContainer>,
          document.body
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
            subtotal={Number((orderForPayment as any).subtotal || 0)}
            tax={Number((orderForPayment as any).tax || 0)}
            serviceCharge={Number((orderForPayment as any).service_charge || 0)}
            discountAmount={Number((orderForPayment as any).discount || 0)}
            couponDiscount={Number((orderForPayment as any).coupon_discount || 0)}
            onConfirmPayment={handlePaymentConfirm}
            paymentMethods={paymentMethods}
            customerId={(orderForPayment as any).customer_id || undefined}
            restaurantId={user?.restaurantId ? Number(user.restaurantId) : undefined}
            membershipSettings={membershipSettings}
          />
        )}
        
        {/* Order Complete Modal - 라이브 오더에서는 사용하지 않음 */}
        {/* POS Terminal에서만 사용하는 모달이므로 여기서는 렌더링하지 않음 */}

        {/* Option Modal for Add Items - POS Terminal과 동일한 모달 사용 */}
        {selectedMenuItemForOption && (
          <OptionModal
            isOpen={showOptionModal}
            onClose={() => {
              setShowOptionModal(false);
              setSelectedMenuItemForOption(null);
            }}
            menuItem={{
              id: selectedMenuItemForOption.id,
              name: selectedMenuItemForOption.name,
              price: parseFloat(selectedMenuItemForOption.price) || 0,
              emoji: selectedMenuItemForOption.emoji || '🍽️',
              image: selectedMenuItemForOption.image,
              optionGroups: selectedMenuItemForOption.optionGroups
            }}
            onConfirm={(quantity, selectedOptions, selectedOptionsData) => {
              // Add item to cart with options
              handleAddToItemsCart(selectedMenuItemForOption, quantity, selectedOptionsData);
              setShowOptionModal(false);
              setSelectedMenuItemForOption(null);
              setAddItemsSearchQuery('');
            }}
          />
        )}

        {/* Merge Target Selection Modal */}
        <ModalOverlay isOpen={showMergeModal} onClick={() => setShowMergeModal(false)} data-modal="merge-target">
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <ModalHeader>
              <ModalTitle>Select Target Order</ModalTitle>
              <CloseButton onClick={() => setShowMergeModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p style={{ marginBottom: '16px', color: '#6B7C93', fontSize: '14px' }}>
                Select which order to merge INTO. The selected order's table/pager number will be kept.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {orders
                  .filter(o => selectedOrderIds.includes(o.id))
                  .sort((a, b) => new Date(a.createdAt || a.order_date).getTime() - new Date(b.createdAt || b.order_date).getTime())
                  .map(order => (
                    <div
                      key={order.id}
                      onClick={() => setMergeTargetOrderId(order.id)}
                      style={{
                        padding: '16px',
                        border: `2px solid ${mergeTargetOrderId === order.id ? '#635BFF' : '#E6EBF1'}`,
                        borderRadius: '8px',
                        cursor: 'pointer',
                        background: mergeTargetOrderId === order.id ? '#F0EEFF' : 'white',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '16px', color: '#0A2540' }}>
                            {order.order_number}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6B7C93', marginTop: '4px' }}>
                            {order.table_number ? `Table ${order.table_number}` : ''}
                            {order.table_number && order.pager_number ? ' / ' : ''}
                            {order.pager_number ? `Pager ${order.pager_number}` : ''}
                            {!order.table_number && !order.pager_number ? 'No Table/Pager' : ''}
                          </div>
                          {/* Customer name display for logged-in customers */}
                          {order.customer_name && order.customer_name !== 'Guest' && order.customer_name !== 'Mobile Guest' && (
                            <div style={{ fontSize: '12px', color: '#635BFF', marginTop: '2px', fontWeight: 500 }}>
                              {order.customer_name}
                            </div>
                          )}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#0A2540' }}>
                            {formatCurrency(order.total_amount, operationSettings.currency)}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6B7C93' }}>
                            {order.order_items?.length || 0} items
                          </div>
                        </div>
                      </div>
                      {mergeTargetOrderId === order.id && (
                        <div style={{
                          marginTop: '8px',
                          fontSize: '12px',
                          color: '#635BFF',
                          fontWeight: 500
                        }}>
                          Other orders will be merged into this order
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </ModalBody>
            <ModalFooter>
              <ActionButton
                onClick={() => setShowMergeModal(false)}
                style={{ background: 'white', color: '#374151', border: '1px solid #E5E7EB' }}
              >
                Cancel
              </ActionButton>
              <ActionButton
                onClick={() => mergeTargetOrderId && executeMergeOrders(mergeTargetOrderId)}
                disabled={!mergeTargetOrderId || isMerging}
                style={{
                  background: mergeTargetOrderId ? '#635BFF' : '#E5E7EB',
                  color: mergeTargetOrderId ? 'white' : '#9CA3AF',
                  cursor: mergeTargetOrderId ? 'pointer' : 'not-allowed'
                }}
              >
                {isMerging ? 'Merging...' : 'Merge Orders'}
              </ActionButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
        </Content>

        {/* Pagination */}
        {(() => {
          const filteredOrdersCount = getFilteredOrdersByTab().length;
          const filteredTotalPages = Math.ceil(filteredOrdersCount / 50);
          return filteredTotalPages > 1 && (
          <PaginationContainer>
            <PaginationInfo>
              Showing {((currentPage - 1) * 50) + 1}-{Math.min(currentPage * 50, filteredOrdersCount)} of {filteredOrdersCount} orders
            </PaginationInfo>
            <PaginationControls>
              <PageButton
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                First
              </PageButton>
              <PageButton
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </PageButton>

              {/* Page numbers */}
              {[...Array(Math.min(5, filteredTotalPages))].map((_, idx) => {
                let pageNum;
                if (filteredTotalPages <= 5) {
                  pageNum = idx + 1;
                } else if (currentPage <= 3) {
                  pageNum = idx + 1;
                } else if (currentPage >= filteredTotalPages - 2) {
                  pageNum = filteredTotalPages - 4 + idx;
                } else {
                  pageNum = currentPage - 2 + idx;
                }

                return (
                  <PageButton
                    key={pageNum}
                    active={currentPage === pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </PageButton>
                );
              })}

              <PageButton
                onClick={() => setCurrentPage(prev => Math.min(filteredTotalPages, prev + 1))}
                disabled={currentPage === filteredTotalPages}
              >
                Next
              </PageButton>
              <PageButton
                onClick={() => setCurrentPage(filteredTotalPages)}
                disabled={currentPage === filteredTotalPages}
              >
                Last
              </PageButton>
            </PaginationControls>
          </PaginationContainer>
        );
        })()}
      </Container>

      {/* Toast Notification */}
      {ReactDOM.createPortal(
        <ToastContainer isVisible={toast.isVisible} type={toast.type}>
          <ToastMessage>{toast.message}</ToastMessage>
          <ToastCloseBtn onClick={() => setToast(prev => ({ ...prev, isVisible: false }))}>
            ×
          </ToastCloseBtn>
        </ToastContainer>,
        document.body
      )}
    </MainLayout>
  );
};

export default LiveOrdersPage;