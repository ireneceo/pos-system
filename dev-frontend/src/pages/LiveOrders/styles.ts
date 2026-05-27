import styled, { createGlobalStyle } from 'styled-components';
import { ModalButton } from '../../components/UI';

export const Container = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
  min-height: 100vh;
`;



export const AudioToggleButton = styled.button<{ enabled: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: ${props => props.enabled ? '#635BFF' : '#C7CED6'};

  img {
    width: 22px;
    height: 22px;
    filter: ${props => props.enabled ? 'invert(1)' : 'opacity(0.4)'};
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const SelectModeButton = styled.button<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#1F2937'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#C7CED6'};

  &:hover {
    background: ${props => props.active ? '#5A54E5' : '#F9FAFB'};
  }
`;

export const MergeButton = styled.button`
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
    background: #6B7280;
    cursor: not-allowed;
  }
`;

export const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

// Note: FilterControls, FilterRow, DateButton, DateInput styles moved to DatePeriodFilter component

// Filter toolbar for Live Orders - contains DatePeriodFilter, Search, Download
export const FilterToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  /* Override DatePeriodFilter internal margin */
  & > div:first-child > div {
    margin-bottom: 0 !important;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

// Search input for Live Orders
export const SearchInputContainer = styled.div`
  position: relative;
  width: 220px;
  height: 38px;

  @media (max-width: 768px) {
    width: 100%;
    order: 10;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 38px;
  padding: 0 32px 0 36px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }

  &::placeholder {
    color: #6B7280;
  }
`;

export const ClearSearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #C7CED6;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  color: #4B5563;
  padding: 0;
  line-height: 1;

  &:hover {
    background: #6B7280;
  }
`;

export const DownloadButton = styled.button`
  height: 38px;
  width: 38px;
  background: #F4F6F9;
  color: #0A2540;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 500;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;
  }

  .download-label {
    display: none;
  }

  &:hover {
    background: #C7CED6;
  }

  @media (max-width: 768px) {
    width: 100%;
    order: 11;
    height: 40px;

    .download-label {
      display: inline;
    }
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6B7280;
`;





export const StatusTabs = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  border-bottom: 1px solid #C7CED6;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F4F8;
  }

  &::-webkit-scrollbar-thumb {
    background: #64748B;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #64748B;
  }
`;

export const StatusTab = styled.button<{ active?: boolean }>`
  padding: 12px 0;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.active ? '#635BFF' : '#4B5563'};
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

export const TabBadge = styled.span`
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

export const StatisticsBar = styled.div`
  background: #F1F4F8;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  padding: 12px 20px;
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 13px;
  color: #4B5563;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px 14px;
    font-size: 11px;
  }
`;

export const StatItem = styled.span`
  white-space: nowrap;

  strong {
    color: #0A2540;
    font-weight: 600;
    margin-left: 4px;
  }
`;

export const OrdersCard = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  overflow: visible;

  @media (max-width: 1024px) {
    background: transparent;
    border: none;
  }
`;

// Table components imported from ../../components/UI

export const OrderNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: #635BFF;
    text-decoration: underline;
  }
`;

export const OrderTypeBadge = styled.span`
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


export const CustomerInfo = styled.div`
  color: #4B5563;
  font-size: 13px;
  margin-top: 2px;
`;

export const ItemsList = styled.div`
  line-height: 1.6;
`;

export const ItemWithOptions = styled.div`
  margin-bottom: 6px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemQuantity = styled.span`
  color: #4B5563;
  margin-right: 8px;
`;

export const ItemOptionsInline = styled.span`
  font-size: 12px;
  color: #8898AA;
  display: block;
  margin-left: 24px;
  font-style: italic;
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'outstanding': return '#FEF3C7';
      case 'pending': return '#FEF3C7';
      case 'preparing': return '#DBEAFE';
      case 'ready': return '#D1FAE5';
      case 'served': return '#D1FAE5';
      case 'completed': return '#C7CED6';
      case 'cancelled': return '#FEE2E2';
      case 'rejected': return '#FEE2E2';
      case 'verifying': return '#FEF3C7';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'outstanding': return '#F59E0B';
      case 'pending': return '#92400E';
      case 'preparing': return '#1E40AF';
      case 'ready': return '#065F46';
      case 'served': return '#065F46';
      case 'completed': return '#1F2937';
      case 'cancelled': return '#991B1B';
      case 'rejected': return '#DC2626';
      case 'verifying': return '#F59E0B';
      default: return '#4B5563';
    }
  }};
`;

export const TimeInfo = styled.div`
  color: #4B5563;
  font-size: 13px;
  line-height: 1.4;
`;


export const PaymentMethod = styled.div<{ isPending?: boolean; isVerificationPending?: boolean }>`
  color: ${props => props.isVerificationPending ? '#F59E0B' : props.isPending ? '#FF6B6B' : '#4B5563'};
  font-size: 13px;
  margin-top: 2px;
  font-weight: ${props => (props.isPending || props.isVerificationPending) ? '500' : 'normal'};
`;

export const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  background: ${props => props.variant === 'secondary' ? '#F4F6F9' : '#635BFF'};
  color: ${props => props.variant === 'secondary' ? '#4B5563' : 'white'};
  border: ${props => props.variant === 'secondary' ? '1px solid #C7CED6' : 'none'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover {
    background: ${props => props.variant === 'secondary' ? '#C7CED6' : '#5A51E6'};
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

export const VerifyRejectButton = styled(ModalButton)`
  && {
    background: #FEF2F2;
    border: 1px solid #EF4444;
    color: #EF4444;
  }
  &&:hover:not(:disabled) {
    background: #FEE2E2;
  }
`;

export const VerifyConfirmButton = styled(ModalButton)`
  && { background: #10B981; }
  &&:hover:not(:disabled) { background: #059669; }
`;

export const IconButton = styled.button`
  padding: 6px;
  background: #F4F6F9;
  border: 1px solid #C7CED6;
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
    background: #C7CED6;
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

export const ActionButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-start;

  @media (max-width: 1024px) {
    gap: 8px;
  }
`;

export const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #4B5563;
  display: inline-block;
  line-height: 1;
`;



export const OrderDetailSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #0A2540;
`;

export const DetailLabel = styled.span`
  color: #4B5563;
`;

export const DetailValue = styled.span`
  font-weight: 500;
`;

export const ItemDetail = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  background: #F4F6F9;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;


export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

export const ItemOptions = styled.div`
  font-size: 13px;
  color: #4B5563;
  margin-bottom: 4px;
`;

export const ItemPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #C7CED6;
  margin: 20px 0;
`;

export const TotalSection = styled.div`
  background: #F4F6F9;
  padding: 20px;
  border-radius: 8px;
`;

export const TotalRow = styled.div<{ isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: ${props => props.isTotal ? '18px' : '14px'};
  font-weight: ${props => props.isTotal ? '700' : '400'};
  color: ${props => props.isTotal ? '#0A2540' : '#4B5563'};
`;


// Toast notification styles
export const ToastContainer = styled.div<{ isVisible: boolean; type: 'success' | 'error' | 'info' }>`
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

export const ToastMessage = styled.span`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
`;

export const ToastCloseBtn = styled.button`
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
export const BillPrintContainer = styled.div`
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
export const PrintStyles = createGlobalStyle`
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

export const BillHeader = styled.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const BillTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`;

export const BillSection = styled.div`
  margin: 10px 0;
  padding: 5px 0;
`;

export const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`;




export const BillFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: white;
  border-top: 1px solid #C7CED6;

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 12px;
  }
`;

export const PaginationInfo = styled.div`
  font-size: 14px;
  color: #4B5563;
`;

export const PaginationControls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#C7CED6'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#4B5563'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#5A51E6' : '#F4F6F9'};
    border-color: ${props => props.active ? '#5A51E6' : '#C7D2FE'};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
