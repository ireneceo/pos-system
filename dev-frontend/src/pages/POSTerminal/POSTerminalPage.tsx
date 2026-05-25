import React, { useState, useEffect, useRef } from 'react';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import OptionModal from '../../components/POSTerminal/OptionModal';
import OrderCompleteModal from '../../components/POSTerminal/OrderCompleteModal';
import CashierPinModal from '../../components/POSTerminal/CashierPinModal';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import AlertDialog from '../../components/Common/AlertDialog';
import NumberInputModal from '../../components/Common/NumberInputModal';
import { useOrders } from '../../contexts/OrderContext';
import { useStore } from '../../contexts/StoreContext';
import { useMenu } from '../../contexts/MenuContext';
import { useCustomer } from '../../contexts/CustomerContext';
import { useStaff } from '../../contexts/StaffContext';
import { printBillViaRawBT, printKitchenTicketViaRawBT, getPrinterSettings } from '../../utils/billPrint';
import { useAuth } from '../../contexts/AuthContext';
import CustomerModal from '../../components/Customer/CustomerModal';
// StaffLoginModal removed - authentication handled by ProtectedRoute
import { normalizeCustomerName } from '../../utils/orderUtils';
import { getCurrencySymbol } from '../../utils/currency';
import { formatDateTime, formatTime } from '../../utils/timezone';
import { useRestaurantId } from '../../hooks/useRestaurantId';
import { openCustomerDisplay, tryAutoReopen, isAutoOpenEnabled } from '../../utils/customerDisplay';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
const POSContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const LogoImage = styled.img`
  max-width: 180px;
  max-height: 40px;
  object-fit: contain;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  color: #0A2540;
`;

const StaffInfo = styled.div<{ clickable?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  padding: ${props => props.clickable ? '8px 12px' : '0'};
  border-radius: ${props => props.clickable ? '8px' : '0'};
  transition: all 0.2s;
  color: #6B7C93;

  &:hover {
    background: ${props => props.clickable ? '#F6F9FC' : 'transparent'};
    color: ${props => props.clickable ? '#0A2540' : '#6B7C93'};
  }
`;

const DateTime = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
  font-variant-numeric: tabular-nums;
  min-width: 200px;
  text-align: right;
  white-space: nowrap;

  @media (max-width: 768px) {
    min-width: auto;
    text-align: left;
    font-size: 13px;
  }
`;

const MainLayout = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const MenuSection = styled.div`
  flex: 1;
  background: #FAFBFC;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SearchSection = styled.div`
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Segmented toggle (KDS Order/Item 토글과 동일 스타일 — 시스템 통일).
const ViewToggle = styled.div`
  display: flex;
  background: #F3F4F6;
  border-radius: 6px;
  padding: 2px;
`;

const ViewToggleBtn = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#0A2540' : '#6B7C93'};
  box-shadow: ${props => props.active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none'};
  flex-shrink: 0;
  white-space: nowrap;
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;
  
  &:hover {
    background: #E6EBF1;
    color: #0A2540;
  }
`;

const NoResultsMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6B7C93;
  text-align: center;
  
  .icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .title {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .message {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  background: white;
  border-bottom: 1px solid #E6EBF1;
  padding: 0 24px;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  position: relative;
  color: ${props => props.active ? '#635BFF' : '#6B7C93'};

  &:hover {
    color: #635BFF;
  }

  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: #635BFF;
    }
  `}
`;

const MenuGrid = styled.div`
  flex: 1;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-auto-rows: max-content;
  gap: 16px;
  overflow-y: auto;
  align-content: start;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 3px;
  }
`;

const MenuItem = styled.div<{ soldOut?: boolean }>`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  /* height:100% 제거 — grid auto-rows 가 stretch 시키지 않도록.
     같은 row 카드 옵션 일치는 grid default align-self:stretch 로 자연 처리.
     단일 카드 카테고리에서 카드가 grid container 까지 stretch 되는 부작용 차단. */

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${props => props.soldOut && `
    opacity: 0.5;
    cursor: not-allowed;
    
    &::after {
      content: 'SOLD OUT';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #FF6B6B;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
  `}
`;

const MenuImage = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: 80px;
  background: #F6F9FC;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.hasImage ? '0' : '36px'};
  color: #C7D2FE;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MenuName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

const MenuPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`;

const SetBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(102, 126, 234, 0.3);
  z-index: 1;
`;

const SetItemsPreview = styled.div`
  font-size: 10px;
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
  font-weight: 500;
`;

const MenuItemActions = styled.div`
  display: flex;
  margin-top: auto;   /* 카드 하단 정렬 — 제목 1줄/2줄 관계 없이 옵션 버튼 같은 위치 */
  padding-top: 12px;
  width: 100%;
`;

const OptionButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #F8FAFC 0%, #F0F4FF 100%);
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #635BFF;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  
  &:hover {
    background: linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%);
    border-color: #635BFF;
    color: #5A51E6;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(99, 91, 255, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;


const OrderSection = styled.div`
  width: 400px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
`;

const TableNumberSection = styled.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TableNumberLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #6B7C93;
`;

const TableNumberSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 160px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const ScrollableOrderContent = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #F6F9FC;
  }

  &::-webkit-scrollbar-thumb {
    background: #C7D2FE;
    border-radius: 2px;
  }
`;

const OrderItems = styled.div`
  padding: 16px 24px;
`;

const OrderItemsHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #F6F9FC;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 4px;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: #6B7C93;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuantityBtn = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #E6EBF1;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #6B7C93;
  transition: all 0.15s;
  
  &:hover {
    border-color: #635BFF;
    color: #635BFF;
  }
  
  &:active {
    background: #F0F4FF;
  }
`;

const Quantity = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  min-width: 20px;
  text-align: center;
`;

const ItemPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  min-width: 80px;
  text-align: right;
`;

const DeleteBtn = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: #FFF4F4;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #FF6B6B;
  transition: all 0.15s;
  
  &:hover {
    background: #FFE6E6;
  }
`;

const OrderSummary = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  color: #6B7C93;
`;

const SummaryValue = styled.span`
  font-weight: 500;
  color: #0A2540;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 18px;
  font-weight: 600;
  padding-top: 12px;
  border-top: 1px solid #F6F9FC;
  
  ${SummaryLabel} {
    color: #0A2540;
  }
  
  ${SummaryValue} {
    color: #635BFF;
  }
`;

const OrderActions = styled.div`
  padding: 24px;
  background: #FAFBFC;
  display: flex;
  gap: 12px;
`;

const ActionBtn = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  ${props => {
    switch(props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          
          &:hover {
            background: #5243E0;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
      case 'danger':
        return `
          background: #FFE6E6;
          color: #FF6B6B;
          
          &:hover {
            background: #FFD9D9;
          }
        `;
      default:
        return `
          background: white;
          color: #6B7C93;
          border: 1px solid #E6EBF1;
          
          &:hover {
            border-color: #C7D2FE;
            color: #635BFF;
          }
        `;
    }
  }}
`;

const EmptyOrder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6B7C93;
  padding: 40px;
  text-align: center;
`;


const EmptyText = styled.div`
  font-size: 14px;
`;

const DiscountSection = styled.div`
  padding: 16px 24px;
  background: #FAFBFC;
  border-top: 1px solid #E6EBF1;
`;

const DiscountRow = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DiscountInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.15s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
  
  &::placeholder {
    color: #8898AA;
  }
`;

const DiscountButton = styled.button`
  padding: 10px 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  
  &:hover {
    background: #5243E0;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuickDiscountButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const QuickDiscountBtn = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  background: ${props => props.active ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.active ? '#635BFF' : '#374151'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: ${props => props.active ? '#635BFF' : '#D1D5DB'};
    background: ${props => props.active ? 'rgba(99, 91, 255, 0.1)' : '#F9FAFB'};
  }
`;

const AppliedCoupon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 6px;
  font-size: 13px;
  color: #635BFF;
`;

const OrderTypeToggle = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`;

const OrderTypeBtn = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  min-height: 44px;
  background: ${props => props.active ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.active ? '#635BFF' : '#374151'};
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;

  &:hover {
    border-color: ${props => props.active ? '#635BFF' : '#D1D5DB'};
    background: ${props => props.active ? 'rgba(99, 91, 255, 0.1)' : '#F9FAFB'};
  }

  span {
    font-size: 18px;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #FF6B6B;
  cursor: pointer;
  font-size: 16px;
  padding: 0 4px;

  &:hover {
    color: #FF5252;
  }
`;

const CustomerSearchSection = styled.div`
  padding: 16px 24px;
  background: #F7F9FC;
  border-bottom: 1px solid #E6EBF1;
`;

const CustomerSearchContainer = styled.div`
  position: relative;
`;

const CustomerSearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const CustomerSearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #8898AA;
  font-size: 14px;
  pointer-events: none;
`;

const CustomerSearchDropdown = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.show ? 'block' : 'none'};
  margin-top: 4px;
`;

const CustomerSearchItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CustomerItemName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
  font-size: 14px;
`;

const CustomerItemDetails = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const SelectedCustomerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #F0F4FF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  margin-top: 8px;
`;

const SelectedCustomerInfo = styled.div`
  flex: 1;
`;

const SelectedCustomerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 2px;
`;

const SelectedCustomerMeta = styled.div`
  font-size: 12px;
  color: #6B7C93;
`;

// Pager Search Components (same style as Customer Search)
const PagerSearchContainer = styled.div`
  position: relative;
  width: 140px;
`;

const PagerSearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &:hover {
    border-color: #D1D5DB;
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const PagerSearchDropdown = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: ${props => props.show ? 'block' : 'none'};
  margin-top: 4px;

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #F1F3F5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #CBD5E0;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #A0AEC0;
  }
`;

const PagerSearchItem = styled.div`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F1F3F5;
  transition: background-color 0.2s;
  font-size: 14px;
  color: #0A2540;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ClearCustomerBtn = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #E6F0FF;
  }
`;

interface MenuItemType {
  id: string;
  code?: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  soldOut?: boolean;
  image?: string;
  is_set_menu?: boolean;
  set_items?: Array<{
    menuItemId: number;
    name: string;
    quantity: number;
  }>;
  optionGroups?: string[];
}

interface SelectedOption {
  id: string;
  name: string;
  price: number;
}

interface OrderItemType {
  id: string;
  menuItem: MenuItemType;
  quantity: number;
  options?: string[];  // For display purposes (option names)
  selectedOptions?: SelectedOption[];  // For price calculation
}

const POSTerminalPage: React.FC = () => {
  const { t } = useTranslation('pos');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromParam = searchParams.get('from') || '';
  const fromFloorPlan = fromParam === 'floor-plan' || fromParam === 'floor-plan-overlay';
  const isFloorPlanOverlay = fromParam === 'floor-plan-overlay';
  const initialTableFromUrl = searchParams.get('table');
  const { user, switchUser, logout: authLogout } = useAuth();
  const restaurantId = useRestaurantId();
  const { addOrder } = useOrders();
  const { getTakeawayCharge, operationSettings, getStoreInfo } = useStore();
  const { categories: allCategories, menuItems, getItemsByCategory, loadMenuByCategory, isLoadingMenu } = useMenu();

  // POS Terminal shows only active categories (customer-facing view)
  const categories = allCategories.filter(cat => cat.isActive !== false);
  const {
    updateCustomerOrderStats,
    searchCustomers
  } = useCustomer();
  const { currentStaff, updateStaff } = useStaff();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [previousCategory, setPreviousCategory] = useState<string | null>(null); // 검색 전 카테고리 저장
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false); // 검색 모드 여부
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Auto-merge → 명시 선택 흐름: 결제 진행 시 같은 테이블에 진행 중 주문이 있으면
  // "기존 추가 / 별도 생성" 모달. POS default 는 별도 (백엔드 skipAutoMerge 자동).
  const [mergeableOrders, setMergeableOrders] = useState<any[]>([]);
  const [showMergeChoiceModal, setShowMergeChoiceModal] = useState(false);
  const [forceMergeOrderId, setForceMergeOrderId] = useState<number | null>(null);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showOrderCompleteModal, setShowOrderCompleteModal] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discount: number} | null>(null);
  // Searchable coupon combobox (Takeaway pattern)
  const [availableCoupons, setAvailableCoupons] = useState<Array<{ id: number; code: string; name?: string; type?: string; value?: number | string; min_order?: number | string; valid_until?: string | null }>>([]);
  const [couponsLoaded, setCouponsLoaded] = useState(false);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const [appliedDiscountPolicy, setAppliedDiscountPolicy] = useState<{name: string; discount: number; requiresApproval: boolean} | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showFeatureAlert, setShowFeatureAlert] = useState(false);
  const [showCouponError, setShowCouponError] = useState(false);
  // Initial order type is `dine-in` unless the URL says otherwise. Floor Plan's "+ Takeaway Walk-in"
  // pill navigates here with `?order_type=takeaway`, so we honor that on first mount.
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>(() => {
    const ot = searchParams.get('order_type');
    return ot === 'takeaway' ? 'takeaway' : 'dine-in';
  });
  const [tableNumber, setTableNumber] = useState('');
  const [guestCount, setGuestCount] = useState(0);
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [pagerNumber, setPagerNumber] = useState('');
  const [pagerSearchQuery, setPagerSearchQuery] = useState('');
  const [showPagerDropdown, setShowPagerDropdown] = useState(false);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  // Cashier quick switch (PIN → 실제 로그인 전환)
  const [showCashierPinModal, setShowCashierPinModal] = useState(false);
  const [showCustomPercentModal, setShowCustomPercentModal] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedCustomerForOrder, setSelectedCustomerForOrder] = useState<any>(null);
  const [apiSearchResults, setApiSearchResults] = useState<any[]>([]);
  const [isSearchingCustomers, setIsSearchingCustomers] = useState(false);
  const customerSearchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Currency and rounding settings
  const [currency, setCurrency] = useState<string>('RM');
  const [cashRounding, setCashRounding] = useState<number | null>(null);
  const [roundingApplyTo, setRoundingApplyTo] = useState<'cash_only' | 'all'>('cash_only');

  // Membership/Points state
  const [membershipSettings, setMembershipSettings] = useState<any>(null);
  const [customerPoints, setCustomerPoints] = useState(0);
  const [customerTier, setCustomerTier] = useState('Bronze');

  // Display mode: 'photo' (default — image card grid) vs 'simple' (text-only, denser grid)
  // Per-device toggle, saved to localStorage. Default per Irene 2026-05-22 = photo.
  const [displayMode, setDisplayMode] = useState<'photo' | 'simple'>(() => {
    try { return localStorage.getItem('pos_display_mode') === 'simple' ? 'simple' : 'photo'; }
    catch { return 'photo'; }
  });

  // Sort order applied to every category / mode / search result. Default = newest.
  type SortKey = 'newest' | 'name' | 'price_asc' | 'price_desc';
  const [sortBy, setSortBy] = useState<SortKey>(() => {
    try {
      const saved = localStorage.getItem('pos_sort_by') as SortKey | null;
      if (saved && ['newest', 'name', 'price_asc', 'price_desc'].includes(saved)) return saved;
    } catch { /* ignore */ }
    return 'newest';
  });
  const setSortByPersistent = (s: SortKey) => {
    setSortBy(s);
    try { localStorage.setItem('pos_sort_by', s); } catch { /* ignore */ }
  };
  const setDisplayModePersistent = (m: 'photo' | 'simple') => {
    setDisplayMode(m);
    try { localStorage.setItem('pos_display_mode', m); } catch { /* ignore */ }
    if (m === 'simple') {
      // Compact 모드 = 텍스트 only = 한꺼번에 다 보기 좋음. 자동 All 선택.
      if (!isSearchMode) {
        setSelectedCategory('all');
        loadMenuByCategory('all');
      }
    } else if (m === 'photo' && selectedCategory === 'all' && !isSearchMode && categories.length > 0) {
      // Image 모드 = 카테고리별 (사진 동시 로딩 비용). 'all' 이면 첫 카테고리로.
      const firstCategoryId = categories[0].id;
      setSelectedCategory(firstCategoryId);
      loadMenuByCategory(firstCategoryId);
    }
  };

  // Progressive rendering state
  const PROGRESSIVE_THRESHOLD = 50;
  const INITIAL_RENDER_COUNT = 40;
  const LOAD_MORE_COUNT = 30;
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Brand logo: 고정 파일 경로 사용
  useEffect(() => {
    setBrandLogo('/uploads/logos/brand-logo.png');

    const handleBrandLogoUpdate = () => {
      setBrandLogo(`/uploads/logos/brand-logo.png?v=${Date.now()}`);
    };

    window.addEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    return () => {
      window.removeEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    };
  }, []);

  // Customer Display auto-reopen (one-shot on next user gesture if pref enabled)
  useEffect(() => {
    if (!user?.restaurantId) return;
    return tryAutoReopen(user.restaurantId);
  }, [user?.restaurantId]);

  // activeCashier 제거 - PIN 전환 시 AuthContext user가 직접 교체됨

  // 초기 카테고리 설정: displayMode 따라 분기.
  // Compact 모드는 항상 'all' (텍스트 only — 메뉴 다 보기 자연스러움).
  // Image 모드는 첫 카테고리 (사진 동시 로딩 비용 회피).
  useEffect(() => {
    if (categories.length === 0 || selectedCategory !== null) return;
    if (displayMode === 'simple') {
      setSelectedCategory('all');
      loadMenuByCategory('all');
    } else {
      const firstCategoryId = categories[0].id;
      setSelectedCategory(firstCategoryId);
      loadMenuByCategory(firstCategoryId);
    }
  }, [categories, selectedCategory, displayMode, loadMenuByCategory]);

  // Photo 모드는 "All" 카테고리 미지원 (이미지 동시 로드 비용). 만약 Simple→Photo 전환 시
  // 'all' 이 선택되어 있으면 첫 카테고리로 자동 폴백.
  useEffect(() => {
    if (displayMode === 'photo' && selectedCategory === 'all' && !isSearchMode && categories.length > 0) {
      const firstCategoryId = categories[0].id;
      setSelectedCategory(firstCategoryId);
      loadMenuByCategory(firstCategoryId);
    }
  }, [displayMode, selectedCategory, isSearchMode, categories, loadMenuByCategory]);

  // 카테고리 변경 시 해당 카테고리 메뉴 로딩
  const handleCategorySelect = (categoryId: string) => {
    if (isSearchMode) {
      // 검색 모드에서 탭 클릭하면 검색 모드 해제
      setIsSearchMode(false);
      setSearchQuery('');
    }
    setSelectedCategory(categoryId);
    loadMenuByCategory(categoryId);
  };

  // 검색어 입력 처리
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      // 검색 모드 진입: 현재 카테고리 저장 후 전체 검색
      if (!isSearchMode) {
        setPreviousCategory(selectedCategory);
        setIsSearchMode(true);
        setSelectedCategory(null); // 탭 선택 해제
        // 전체 메뉴 로딩 (검색용)
        loadMenuByCategory('all');
      }
    } else {
      // 검색어 지움: 이전 카테고리로 복귀
      if (isSearchMode) {
        setIsSearchMode(false);
        const restoreCategory = previousCategory || categories[0]?.id || null;
        setSelectedCategory(restoreCategory);
        setPreviousCategory(null);
      }
    }
  };

  // 검색 클리어 버튼
  const handleClearSearch = () => {
    setSearchQuery('');
    if (isSearchMode) {
      setIsSearchMode(false);
      const restoreCategory = previousCategory || categories[0]?.id || null;
      setSelectedCategory(restoreCategory);
      setPreviousCategory(null);
    }
  };

  // 선택된 카테고리가 삭제된 경우 처리
  // 단 'all' 은 가상 카테고리 (Compact 모드 전용) — 실제 카테고리 목록에 없어도 유효.
  useEffect(() => {
    if (categories.length > 0 && selectedCategory && selectedCategory !== 'all' && !isSearchMode && !categories.find(cat => cat.id === selectedCategory)) {
      setSelectedCategory(categories[0]?.id || null);
    }
  }, [categories, selectedCategory, isSearchMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Load table settings from DB
    const loadTableSettings = async () => {
      if (user?.restaurantId) {
        try {
          const response = await fetch(`/api/restaurants/${user.restaurantId}`, {
            credentials: 'include'
          });
          if (response.ok) {
            const data = await response.json();
            const restaurant = data.data || data;
            // v3.39 hotfix #2: table identifiers come from the v2 floor_plan (each table's `label`
            // or `tableNumber`), NOT from the legacy `table_settings.tablePrefix + totalTables`
            // pool. Old pool was out-of-sync with Zones & Groups (prefix B/T/A 등) and produced
            // table dropdowns that didn't match the actual floor plan.
            const enableTableNumbers = restaurant.table_settings?.enableTableNumbers !== false;
            if (enableTableNumbers && restaurant.floor_plan?.tables) {
              const allTables = (restaurant.floor_plan.tables || [])
                .filter((t) => t && (t.tableType === undefined || t.tableType === 'table'))
                .map((t) => t.label || t.tableNumber)
                .filter(Boolean);
              setAvailableTables(allTables);
            } else if (enableTableNumbers && restaurant.table_settings) {
              // Fallback for restaurants that never set up Zones & Groups (no floor_plan.tables yet).
              const { totalTables, tablePrefix } = restaurant.table_settings;
              if (totalTables) {
                const tables = [];
                for (let i = 1; i <= totalTables; i++) {
                  tables.push(`${tablePrefix || ''}${String(i).padStart(3, '0')}`);
                }
                setAvailableTables(tables);
              }
            }
          }
        } catch (error) {
          console.error('Failed to load table settings:', error);
        }
      }
    };

    loadTableSettings();
  }, [user?.restaurantId]);

  // Set initial table from floor plan URL param.
  // v3.37 Floor Plan v2 (group prefixes O/I/P 등) 는 매장 옛 table_settings.tablePrefix
  // 로 생성된 availableTables 와 mismatch 가능. fromFloorPlan 일 때는 사용자가 직접 클릭한
  // 식별자를 신뢰하고 강제 setTableNumber 한다 — 그렇지 않으면 주문이 빈 table 로 생성되어
  // Floor Plan 에 attach 되지 않는 버그가 재현됨.
  useEffect(() => {
    if (!initialTableFromUrl) return;
    if (fromFloorPlan || availableTables.length === 0 || availableTables.includes(initialTableFromUrl)) {
      setTableNumber(initialTableFromUrl);
      setOrderType('dine-in');
    }
  }, [initialTableFromUrl, availableTables, fromFloorPlan]);

  // Load payment settings and currency settings from restaurant API
  useEffect(() => {
    const loadPaymentSettings = async () => {
      if (user?.restaurantId) {
        try {
          const response = await fetch(`/api/restaurants/${user.restaurantId}`);
          if (response.ok) {
            const data = await response.json();
            const restaurant = data.data || data;
            if (restaurant.payment_settings) {
              setPaymentMethods(restaurant.payment_settings);
            }
            // Load currency settings
            setCurrency(restaurant.currency || 'MYR');
            setCashRounding(restaurant.cash_rounding ? parseFloat(restaurant.cash_rounding) : null);
            setRoundingApplyTo(restaurant.rounding_apply_to || 'cash_only');
          }
        } catch (error) {
          console.error('Failed to load payment settings:', error);
        }
      }
    };

    loadPaymentSettings();
  }, [user?.restaurantId]);

  // Load membership settings
  useEffect(() => {
    const loadMembershipSettings = async () => {
      if (user?.restaurantId) {
        try {
          const token = getAuthToken();
          const response = await fetch(`/api/membership/settings/${user.restaurantId}`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setMembershipSettings(data.data);
              console.log('✅ Membership settings loaded for POS:', data.data);
            }
          }
        } catch (error) {
          console.error('Failed to load membership settings:', error);
        }
      }
    };

    loadMembershipSettings();
  }, [user?.restaurantId]);

  // Load customer points when a customer is selected
  useEffect(() => {
    const loadCustomerPoints = async () => {
      if (user?.restaurantId && selectedCustomerForOrder?.id) {
        try {
          const token = getAuthToken();
          const response = await fetch(`/api/membership/customer/${user.restaurantId}/${selectedCustomerForOrder.id}`, {
            headers: token ? { 'Authorization': `Bearer ${token}` } : {}
          });
          if (response.ok) {
            const data = await response.json();
            if (data.success && data.data) {
              setCustomerPoints(data.data.points || 0);
              setCustomerTier(data.data.loyalty_tier || 'Bronze');
              console.log('✅ Customer points loaded:', data.data.points, 'Tier:', data.data.loyalty_tier);
            }
          }
        } catch (error) {
          console.error('Failed to load customer points:', error);
        }
      } else {
        // Reset points when no customer selected
        setCustomerPoints(0);
        setCustomerTier('Bronze');
      }
    };

    loadCustomerPoints();
  }, [user?.restaurantId, selectedCustomerForOrder?.id]);

  // Filter menu items based on category and search query
  const getFilteredItems = () => {
    let items: typeof menuItems = [];

    if (isSearchMode) {
      // 검색 모드: 전체 메뉴에서 검색
      const query = searchQuery.toLowerCase().trim();
      items = menuItems.filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.code && item.code.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    } else if (selectedCategory === 'all') {
      // All 탭: 모든 활성 카테고리 메뉴 합치기
      items = menuItems.filter(item => !item.isInactive);
    } else if (selectedCategory) {
      // 일반 모드: 선택된 카테고리 메뉴만 표시
      items = getItemsByCategory(selectedCategory);
    }

    // 정렬 적용 — 모든 카테고리 / 검색 / All 결과에 일관 적용.
    // mutate 회피 위해 slice() 로 카피.
    const sorted = items.slice();
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'price_asc':
        sorted.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price_desc':
        sorted.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'newest':
      default: {
        // createdAt DESC (최신순). createdAt 없으면 id DESC fallback.
        sorted.sort((a, b) => {
          const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          if (tb !== ta) return tb - ta;
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        });
        break;
      }
    }
    return sorted;
  };
  
  const filteredMenuItems = getFilteredItems();

  // Progressive rendering - only activate for large lists (50+ items)
  const useProgressive = filteredMenuItems.length > PROGRESSIVE_THRESHOLD;

  // Reset visible count when category or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_RENDER_COUNT);
  }, [selectedCategory, searchQuery]);

  // Intersection Observer for progressive loading - only when needed
  useEffect(() => {
    if (!useProgressive) return;

    const trigger = loadMoreTriggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + LOAD_MORE_COUNT);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [useProgressive, visibleCount, filteredMenuItems.length]);

  const handleAddItemDirectly = (menuItem: MenuItemType) => {
    if (menuItem.soldOut) return;

    // For set menus, convert set_items to options format (as strings)
    let setMenuOptions: string[] = [];
    if (menuItem.is_set_menu && menuItem.set_items && menuItem.set_items.length > 0) {
      setMenuOptions = menuItem.set_items.map(item => {
        const itemDetails = menuItems.find(m => parseInt(m.id) === item.menuItemId);
        const itemCode = itemDetails?.code;
        return `${itemCode ? `${itemCode} ` : ''}${item.name} x${item.quantity}`;
      });
    }

    // Add directly without options (use default options for items that have them)
    const existingItem = orderItems.find(item =>
      item.menuItem.id === menuItem.id && (!item.options || item.options.length === 0) && !menuItem.is_set_menu
    );

    if (existingItem && !menuItem.is_set_menu) {
      setOrderItems(orderItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        id: `order-${Date.now()}`,
        menuItem,
        quantity: 1,
        options: setMenuOptions.length > 0 ? setMenuOptions : undefined
      }]);
    }
  };

  const handleShowOptions = (menuItem: MenuItemType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (menuItem.soldOut) return;
    
    setSelectedMenuItem(menuItem);
    setShowOptionModal(true);
  };

  const handleConfirmOptions = (quantity: number, selectedOptions: string[], selectedOptionsData: SelectedOption[]) => {
    if (!selectedMenuItem) return;

    // For set menus, add set items to options array (for display purposes)
    // Regular options (like spice level) are also included
    let finalOptions = [...selectedOptions];

    if (selectedMenuItem.is_set_menu && selectedMenuItem.set_items && selectedMenuItem.set_items.length > 0) {
      const setMenuOptions = selectedMenuItem.set_items.map(item => {
        const itemDetails = menuItems.find(m => parseInt(m.id) === item.menuItemId);
        const itemCode = itemDetails?.code;
        return `${itemCode ? `${itemCode} ` : ''}${item.name} x${item.quantity}`;
      });
      // Set items first, then regular options
      finalOptions = [...setMenuOptions, ...selectedOptions];
    }

    // Check if same item with same options exists
    const optionsKey = finalOptions.sort().join(',');
    const existingItem = orderItems.find(item =>
      item.menuItem.id === selectedMenuItem.id &&
      item.options?.sort().join(',') === optionsKey
    );

    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setOrderItems([...orderItems, {
        id: `order-${Date.now()}`,
        menuItem: selectedMenuItem,
        quantity: quantity,
        options: finalOptions.length > 0 ? finalOptions : undefined,
        selectedOptions: selectedOptionsData
      }]);
    }

    setShowOptionModal(false);
    setSelectedMenuItem(null);
  };

  const handleQuantityChange = (orderId: string, change: number) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === orderId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleDeleteItem = (orderId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== orderId));
  };

  const handleClearOrder = () => {
    if (orderItems.length > 0) {
      setShowClearConfirm(true);
    }
  };

  const confirmClearOrder = () => {
    setOrderItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
    setAppliedDiscountPolicy(null);
    setCouponCode('');
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
    setPagerNumber('');
    setPagerSearchQuery('');
    setShowClearConfirm(false);
  };

  // Pager Search Handlers
  const handlePagerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPagerSearchQuery(value);

    // Also update pagerNumber directly when typing
    setPagerNumber(value);

    // Show dropdown if there's input
    if (value.trim()) {
      setShowPagerDropdown(true);
    } else {
      setShowPagerDropdown(false);
    }
  };

  const handleSelectPager = (pagerNum: number) => {
    setPagerNumber(pagerNum.toString());
    setPagerSearchQuery(pagerNum.toString());
    setShowPagerDropdown(false);
  };

  const getFilteredPagers = () => {
    const total = operationSettings.pagerSystem.totalPagers;
    const query = pagerSearchQuery.trim();

    if (!query) {
      // 입력이 없으면 전체 목록 표시
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // 입력값으로 시작하는 번호들 필터링
    return Array.from({ length: total }, (_, i) => i + 1)
      .filter(num => num.toString().startsWith(query));
  };

  const handleResetPOS = () => {
    // Reset all states to initial values
    setOrderItems([]);
    setDiscount(0);
    setAppliedCoupon(null);
    setAppliedDiscountPolicy(null);
    setCouponCode('');
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
    setOrderType('dine-in');
    setTableNumber('');
    setGuestCount(0);
    setPagerNumber('');
    setPagerSearchQuery('');
    setSearchQuery('');
    setSelectedCategory('all');
    setShowClearConfirm(false);
    setShowPaymentModal(false);
    setShowOptionModal(false);
    setShowOrderCompleteModal(false);
    setCompletedOrderData(null);
    setSelectedMenuItem(null);
  };

  const handleApplyDiscount = (amount: number) => {
    // Toggle: if same discount is clicked again, reset to 0
    if (discount === amount) {
      setDiscount(0);
      setAppliedDiscountPolicy(null);
    } else {
      setDiscount(amount);
    }
  };

  const handleApplyCoupon = async (codeOverride?: string) => {
    const codeToApply = (codeOverride ?? couponCode).toUpperCase();
    if (!codeToApply) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/coupons/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          code: codeToApply,
          restaurant_id: user?.restaurantId,
          order_amount: subtotal,
          order_type: orderType,
          customer_id: selectedCustomerForOrder?.id || null
        })
      });

      if (!response.ok) {
        setShowCouponError(true);
        return;
      }

      const result = await response.json();

      if (result.valid && result.data) {
        setAppliedCoupon({ code: codeToApply, discount: result.data.discountAmount });
        setCouponCode('');
        setShowCouponDropdown(false);
      } else {
        setShowCouponError(true);
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      setShowCouponError(true);
    }
  };

  // Lazy-load active coupons for this restaurant on first focus.
  const fetchAvailableCoupons = async () => {
    if (couponsLoaded || !user?.restaurantId) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/coupons?restaurantId=${user.restaurantId}&active=true`, {
        headers: { 'Authorization': `Bearer ${getAuthToken()}` }
      });
      if (!res.ok) return;
      const j = await res.json();
      const list = Array.isArray(j.data) ? j.data : [];
      // Only show coupons usable now (within validity, not exhausted).
      const now = Date.now();
      const usable = list.filter((c: any) => {
        if (c.valid_from && new Date(c.valid_from).getTime() > now) return false;
        if (c.valid_until && new Date(c.valid_until).getTime() < now) return false;
        if (c.usage_limit != null && Number(c.usage_count || 0) >= Number(c.usage_limit)) return false;
        return true;
      });
      setAvailableCoupons(usable);
      setCouponsLoaded(true);
    } catch (e) {
      console.error('Failed to load coupons:', e);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleApplyDiscountPolicy = (policyName: string) => {
    // Toggle: if same policy is clicked again, reset discount
    if (appliedDiscountPolicy && appliedDiscountPolicy.name === policyName) {
      setAppliedDiscountPolicy(null);
      setDiscount(0);
      return;
    }

    // Get discount policies from promotion management system
    const discountPolicies: {[key: string]: {discount: string; requiresApproval: boolean; status: string}} = {
      'Staff': { discount: '20%', requiresApproval: false, status: 'active' },
      'VIP': { discount: '15%', requiresApproval: true, status: 'active' }
    };

    const policy = discountPolicies[policyName];
    if (policy && policy.status === 'active') {
      // Calculate discount amount
      const percentage = parseFloat(policy.discount.replace('%', ''));
      const discountValue = subtotal * (percentage / 100);

      if (policy.requiresApproval) {
        // Show approval dialog for manager approval
        const managerCode = prompt(`${policyName} requires manager approval. Enter manager code:`);
        if (managerCode === 'MANAGER123') {
          setAppliedDiscountPolicy({
            name: policyName,
            discount: discountValue,
            requiresApproval: true
          });
          setDiscount(0); // Clear fixed discount when applying percentage
        } else {
          setInfoModal({ open: true, title: 'Invalid Code', message: 'Invalid manager code. Discount not applied.' });
          return;
        }
      } else {
        setAppliedDiscountPolicy({
          name: policyName,
          discount: discountValue,
          requiresApproval: false
        });
        setDiscount(0); // Clear fixed discount when applying percentage
      }
    }
  };

  const handleCustomAmountConfirm = (value: string) => {
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount >= 0) {
      setDiscount(amount);
      setAppliedDiscountPolicy(null); // Clear percentage discount when applying fixed amount
    }
    setShowCustomAmountModal(false);
  };

  const handleCustomPercentConfirm = (value: string) => {
    const percentage = parseFloat(value);
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      const discountValue = subtotal * (percentage / 100);
      setAppliedDiscountPolicy({
        name: `${percentage}%`,
        discount: discountValue,
        requiresApproval: false
      });
      setDiscount(0); // Clear fixed discount when applying custom percentage
    }
    setShowCustomPercentModal(false);
  };

  const handleLogout = () => {
    authLogout();
  };

  const handleAddOrder = async () => {
    console.log('🔵 handleAddOrder called');
    if (orderItems.length === 0) return;

    // 중복 실행 방지
    if (isProcessingPayment) {
      console.warn('POS - Order already in progress, ignoring duplicate call');
      return;
    }

    console.log('🟢 Starting order creation, setting isProcessingPayment=true');
    setIsProcessingPayment(true);

    try {
      const now = new Date();

      // Backend will generate order number automatically
      const orderData = {
        date: now,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
        coupon: appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : null,
        takeawayCharge,
        serviceCharge,
        serviceChargeRate: effectiveServiceChargeRate,
        tax,
        taxRate: operationSettings.taxRate,
        total,
        paymentMethod: 'Pending',
        amountReceived: 0,
        change: 0
      };

      const newOrder = {
        id: `order-${Date.now()}`,
        // Backend will set orderNumber and pickupNumber
        orderNumber: '',
        pickupNumber: '',
      customer: {
        name: selectedCustomerForOrder ? selectedCustomerForOrder.name : normalizeCustomerName('Walk-in Customer'),
        phone: selectedCustomerForOrder ? selectedCustomerForOrder.phone : 'POS Terminal',
        email: selectedCustomerForOrder ? (selectedCustomerForOrder.email || '') : '',
        type: selectedCustomerForOrder ? 'member' : 'guest',
        customerId: selectedCustomerForOrder?.id,
        loyaltyTier: selectedCustomerForOrder?.loyaltyTier,
        points: selectedCustomerForOrder?.points
      },
      items: orderItems.map(item => {
        // Calculate item price including options
        let itemPrice = item.menuItem.price;
        if (item.selectedOptions && item.selectedOptions.length > 0) {
          const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
          itemPrice += optionsTotal;
        }
        return {
          id: item.id,
          menuItem: {
            id: item.menuItem.id,
            name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
            price: itemPrice,  // Include option prices in the item price
            emoji: item.menuItem.emoji,
            is_set_menu: item.menuItem.is_set_menu,
            set_items: item.menuItem.set_items
          },
          quantity: item.quantity,
          options: item.options,
          selectedOptions: item.selectedOptions || [],
          is_set_menu: item.menuItem.is_set_menu || false,
          set_items: item.menuItem.set_items || []
        };
      }),
      status: 'pending' as const,
      createdAt: formatTime(now, operationSettings),
      subtotal,
      tax,
      taxRate: operationSettings.taxRate,
      serviceCharge,
      serviceChargeRate: effectiveServiceChargeRate,
      discount: discountAmount,
      coupon: appliedCoupon ? { code: appliedCoupon.code, amount: appliedCoupon.discount } : undefined,
      discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
      takeawayCharge: takeawayCharge,
      total,
      paymentMethod: 'Pending',
      paymentStatus: 'pending' as const,
      orderType: orderType,
      orderSource: 'pos' as const,
      tableNumber: orderType === 'dine-in' && tableNumber ? tableNumber : undefined,
      guest_count: orderType === 'dine-in' && guestCount > 0 ? guestCount : null,
      pagerNumber: pagerNumber || undefined,
      cashier_id: user?.id ? Number(user.id) : null,
      cashier_name: user?.name || null,
      // 사용자가 "기존 주문에 추가" 선택했으면 명시 머지.
      forceMergeIntoOrderId: forceMergeOrderId || undefined
    };

      console.log('🟡 Calling addOrder with orderNumber:', newOrder.orderNumber);
      const savedOrder: any = await addOrder(newOrder, restaurantId ? Number(restaurantId) : undefined);
      console.log('🟢 addOrder completed, savedOrder:', savedOrder);

      // Show order complete modal with actual order number from backend
      // Backend returns snake_case (order_number), convert to camelCase
      setCompletedOrderData({
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || newOrder.orderNumber,
        pickupNumber: savedOrder?.pickup_number || savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : newOrder.pickupNumber),
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        tableNumber: savedOrder?.table_number || tableNumber || undefined,
        // Ensure takeawayCharge from backend is used if available
        takeawayCharge: savedOrder?.takeaway_charge || savedOrder?.takeawayCharge || orderData.takeawayCharge,
        subtotal: savedOrder?.subtotal || orderData.subtotal,
        tax: savedOrder?.tax || orderData.tax,
        serviceCharge: savedOrder?.service_charge || savedOrder?.serviceCharge || orderData.serviceCharge,
        discount: savedOrder?.discount || orderData.discount,
        discountPolicy: orderData.discountPolicy,
        coupon: orderData.coupon,
        pointsUsed: 0,
        pointDiscount: 0,
        total: savedOrder?.total || orderData.total,
        cashierName: user?.name || null
      });
      setShowOrderCompleteModal(true);

      // Notify checkout display
      if (checkoutSocketRef.current) {
        checkoutSocketRef.current.emit('checkout-complete', {
          restaurantId: user?.restaurantId,
          orderNumber: completedOrderData?.orderNumber || '',
          total: savedOrder?.total || orderData.total || total,
          currency: operationSettings.currency || 'MYR'
        });
      }

      // Clear the order
      setOrderItems([]);
      setDiscount(0);
      setAppliedCoupon(null);
      setAppliedDiscountPolicy(null);
      setCouponCode('');
      setTableNumber('');
      setGuestCount(0);
      setPagerNumber('');
      setPagerSearchQuery('');
      setSelectedCustomerForOrder(null);
      setCustomerSearchQuery('');

      console.log('POS - Order added without payment:', savedOrder?.orderNumber);
    } catch (error) {
      console.error('POS - Error adding order:', error);
      setInfoModal({ open: true, title: 'Order Failed', message: 'Failed to create order. Please try again.' });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePayment = async () => {
    if (orderItems.length === 0) return;

    // 같은 테이블에 진행 중 주문이 있으면 "기존 추가 / 별도 생성" 사용자 선택.
    if (orderType === 'dine-in' && tableNumber && user?.restaurantId) {
      try {
        const params = new URLSearchParams({
          restaurant_id: String(user.restaurantId),
          table_number: tableNumber,
          order_type: 'dine_in'
        });
        const res = await fetch(`/api/orders/mergeable?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          const list: any[] = (data && data.data) || [];
          if (list.length > 0) {
            setMergeableOrders(list);
            setShowMergeChoiceModal(true);
            return;
          }
        }
      } catch (e) {
        // Network 오류 시엔 기본 흐름 (별도 주문) 으로 진행 — 안전 fallback.
        console.warn('[POS] mergeable check failed, proceeding as separate order', e);
      }
    }
    setForceMergeOrderId(null);
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (method: string, amountReceived?: number, change?: number, pointsUsed?: number, pointDiscountAmount?: number, cardType?: string) => {
    // 중복 실행 방지
    if (isProcessingPayment) {
      console.warn('POS - Payment already in progress, ignoring duplicate call');
      return;
    }

    setIsProcessingPayment(true);
    console.log('POS - Processing payment for method:', method, 'Points used:', pointsUsed);

    // Adjust total if points were used
    const adjustedTotal = pointDiscountAmount ? total - pointDiscountAmount : total;

    try {
      const now = new Date();

      // Backend will generate order number automatically
      const orderData = {
        date: now,
        items: orderItems,
        subtotal,
        discount: discountAmount,
        discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
        coupon: appliedCoupon ? { code: appliedCoupon.code, discount: appliedCoupon.discount } : null,
        takeawayCharge,
        serviceCharge,
        serviceChargeRate: effectiveServiceChargeRate,
        tax,
        taxRate: operationSettings.taxRate,
        total: adjustedTotal,
        pointsUsed: pointsUsed || 0,
        pointDiscount: pointDiscountAmount || 0,
        paymentMethod: method,
        cardType: method === 'card' ? (cardType || null) : null,
        amountReceived: amountReceived || adjustedTotal,
        change: change || 0
      };

      // Add to OrderContext for LiveOrders
      const newOrder: any = {
        id: `order-${Date.now()}`,
        // Backend will set orderNumber and pickupNumber
        orderNumber: '',
        pickupNumber: '',
      customer: {
        name: selectedCustomerForOrder ? selectedCustomerForOrder.name : 'Walk-in Customer',
        phone: selectedCustomerForOrder ? selectedCustomerForOrder.phone : 'POS Terminal',
        email: selectedCustomerForOrder ? (selectedCustomerForOrder.email || '') : '',
        type: selectedCustomerForOrder ? 'member' : 'guest',
        customerId: selectedCustomerForOrder?.id,
        loyaltyTier: selectedCustomerForOrder?.loyaltyTier,
        points: selectedCustomerForOrder?.points
      },
      items: orderItems.map(item => {
        // Calculate item price including options
        let itemPrice = item.menuItem.price;
        if (item.selectedOptions && item.selectedOptions.length > 0) {
          const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
          itemPrice += optionsTotal;
        }
        return {
          id: item.id,
          menuItem: {
            id: item.menuItem.id,
            name: item.menuItem.code ? `${item.menuItem.code} ${item.menuItem.name}` : item.menuItem.name,
            price: itemPrice,  // Include option prices in the item price
            emoji: item.menuItem.emoji,
            is_set_menu: item.menuItem.is_set_menu,
            set_items: item.menuItem.set_items
          },
          quantity: item.quantity,
          options: item.options,
          selectedOptions: item.selectedOptions || [],
          is_set_menu: item.menuItem.is_set_menu || false,
          set_items: item.menuItem.set_items || []
        };
      }),
      status: 'pending' as const,
      createdAt: formatTime(now, operationSettings),
      subtotal,
      tax,
      taxRate: operationSettings.taxRate,
      serviceCharge,
      serviceChargeRate: effectiveServiceChargeRate,
      discount: discountAmount,
      coupon: appliedCoupon ? { code: appliedCoupon.code, amount: appliedCoupon.discount } : undefined,
      discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
      takeawayCharge: takeawayCharge,
      total: adjustedTotal,
      points_used: pointsUsed || null,
      point_discount: pointDiscountAmount || null,
      paymentMethod: method,
      card_type: method === 'card' ? (cardType || null) : null,
      paymentStatus: 'completed' as const,
      orderType: orderType,
      orderSource: 'pos' as const,
      tableNumber: orderType === 'dine-in' && tableNumber ? tableNumber : undefined,
      guest_count: orderType === 'dine-in' && guestCount > 0 ? guestCount : null,
      pagerNumber: pagerNumber || undefined,
      cashier_id: user?.id ? Number(user.id) : null,
      cashier_name: user?.name || null,
      forceMergeIntoOrderId: forceMergeOrderId || undefined
    };

      const savedOrder: any = await addOrder(newOrder, user?.restaurantId ? Number(user.restaurantId) : undefined);

      // Update customer stats if it's a member
      if (selectedCustomerForOrder) {
        updateCustomerOrderStats(selectedCustomerForOrder.id, total);
      }

      // Update staff performance if logged in
      if (currentStaff) {
        const updatedPerformance = {
          ...currentStaff.performance,
          ordersProcessed: currentStaff.performance.ordersProcessed + 1
        };

        updateStaff(currentStaff.id, {
          totalSales: currentStaff.totalSales + total,
          totalShifts: currentStaff.totalShifts, // Keep existing shifts
          performance: updatedPerformance
        });
      }

      // Show order complete modal with actual order number from backend
      // Backend returns snake_case (order_number), convert to camelCase
      setCompletedOrderData({
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || '',
        pickupNumber: savedOrder?.pickup_number || savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : null),
        tableNumber: savedOrder?.table_number || tableNumber || undefined,
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        // Ensure takeawayCharge from backend is used if available
        takeawayCharge: savedOrder?.takeaway_charge || savedOrder?.takeawayCharge || orderData.takeawayCharge,
        subtotal: savedOrder?.subtotal || orderData.subtotal,
        tax: savedOrder?.tax || orderData.tax,
        serviceCharge: savedOrder?.service_charge || savedOrder?.serviceCharge || orderData.serviceCharge,
        discount: savedOrder?.discount || orderData.discount,
        discountPolicy: orderData.discountPolicy,
        coupon: orderData.coupon,
        pointsUsed: orderData.pointsUsed || 0,
        pointDiscount: orderData.pointDiscount || 0,
        total: savedOrder?.total || orderData.total,
        cashierName: user?.name || null
      });
      setShowOrderCompleteModal(true);
      setShowPaymentModal(false);

      // Notify checkout display
      if (checkoutSocketRef.current) {
        checkoutSocketRef.current.emit('checkout-complete', {
          restaurantId: user?.restaurantId,
          orderNumber: completedOrderData?.orderNumber || '',
          total: savedOrder?.total || orderData.total || total,
          currency: operationSettings.currency || 'MYR'
        });
      }

      // Auto-print bill + kitchen ticket
      const printSettings = getPrinterSettings();
      const printStoreInfo = getStoreInfo();
      const printData = {
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || '',
        pickupNumber: savedOrder?.pickup_number || savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : null),
        tableNumber: savedOrder?.table_number || tableNumber || undefined,
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        total: savedOrder?.total || orderData.total,
        cashierName: user?.name || null
      };

      if (printSettings.billPrinter?.enabled && printSettings.billPrinter?.autoPrint) {
        setTimeout(() => {
          printBillViaRawBT(printData, printStoreInfo).catch(e => console.error('Auto bill print failed:', e));
        }, 300);
      }

      const kitchenAuto = printSettings.kitchenPrinter?.enabled && printSettings.kitchenPrinter?.autoPrint;
      if (kitchenAuto) {
        setTimeout(() => {
          printKitchenTicketViaRawBT(printData, printStoreInfo).catch(e => console.error('Auto kitchen print failed:', e));
        }, 800);
      }

      // Clear the order
      setOrderItems([]);
      setDiscount(0);
      setAppliedCoupon(null);
      setAppliedDiscountPolicy(null);
      setCouponCode('');
      setTableNumber('');
      setGuestCount(0);
      setPagerNumber('');
      setPagerSearchQuery('');
      setSelectedCustomerForOrder(null);
      setCustomerSearchQuery('');

      console.log('POS - Payment processing completed:', savedOrder?.orderNumber);
    } catch (error) {
      console.error('POS - Error processing payment:', error);
      setInfoModal({ open: true, title: 'Payment Failed', message: 'Failed to process payment. Please try again.' });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => {
      let itemTotal = item.menuItem.price * item.quantity;
      // Add option prices
      if (item.selectedOptions && item.selectedOptions.length > 0) {
        const optionsTotal = item.selectedOptions.reduce((optSum, opt) => optSum + opt.price, 0);
        itemTotal += optionsTotal * item.quantity;
      }
      return sum + itemTotal;
    }, 0);

    // Calculate takeaway charges if applicable
    let takeawayCharge = 0;
    if (orderType === 'takeaway' && operationSettings.takeawayPricing.enabled) {
      if (operationSettings.takeawayPricing.pricingType === 'per-item') {
        // Same flat charge for every item
        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        takeawayCharge = totalQuantity * operationSettings.takeawayPricing.perItemCharge;
      } else {
        // per-category and per-item-individual both route through getTakeawayCharge,
        // which inspects the menu item (category for per-category, takeaway_charge for per-item-individual).
        orderItems.forEach(item => {
          const charge = getTakeawayCharge(item.menuItem as any);
          takeawayCharge += charge * item.quantity;
        });
      }
    }

    const subtotalWithTakeaway = subtotal + takeawayCharge;
    const discountAmount = discount;
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const policyDiscount = appliedDiscountPolicy ? appliedDiscountPolicy.discount : 0;
    const afterDiscount = Math.max(0, subtotalWithTakeaway - discountAmount - couponDiscount - policyDiscount);

    // Apply service charge and tax in parallel (both on afterDiscount amount).
    // SC 는 보통 매장 식사에만 부과 — Settings 의 "Exclude takeaway" 토글 (default true) 시 takeaway 면 0.
    const scExcludeTakeaway = operationSettings.serviceChargeExcludeTakeaway ?? true;
    const scApplies = operationSettings.serviceChargeEnabled && !(orderType === 'takeaway' && scExcludeTakeaway);
    const serviceCharge = scApplies
      ? afterDiscount * (operationSettings.serviceChargeRate / 100)
      : 0;

    const tax = operationSettings.taxEnabled
      ? afterDiscount * (operationSettings.taxRate / 100)
      : 0;

    const totalBeforeRounding = afterDiscount + serviceCharge + tax;

    // Apply rounding based on settings
    let total = totalBeforeRounding;
    if (roundingApplyTo === 'all' && cashRounding) {
      total = Math.round(totalBeforeRounding / cashRounding) * cashRounding;
    }

    // SC rate: scApplies=false 시 0 으로 일관 전송. backend 주문 수정 재계산 시 안전.
    const effectiveServiceChargeRate = scApplies ? operationSettings.serviceChargeRate : 0;

    return { subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, takeawayCharge, serviceCharge, effectiveServiceChargeRate };
  };

  const { subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, takeawayCharge, serviceCharge, effectiveServiceChargeRate } = calculateTotal();

  // Checkout Display: WebSocket connection for customer-facing screen
  const checkoutSocketRef = useRef<Socket | null>(null);
  useEffect(() => {
    if (!user?.restaurantId) return;
    const socket = io('/checkout-display', { transports: ['websocket', 'polling'] });
    checkoutSocketRef.current = socket;
    socket.on('connect', () => { socket.emit('join-restaurant', user.restaurantId); });
    // Receive customer phone from checkout display
    socket.on('customer-checkin', async (data: { phone: string }) => {
      if (data.phone && user?.restaurantId) {
        setCustomerSearchQuery(data.phone);
        // 자동 검색 + 1건이면 자동 선택
        try {
          const res = await fetch(`/api/customers/${user.restaurantId}?search=${encodeURIComponent(data.phone)}`);
          if (res.ok) {
            const result = await res.json();
            if (result.success && result.data && result.data.length > 0) {
              const item = result.data[0];
              const cust = {
                id: item.customer?.id || item.customer_id,
                name: item.customer?.name || 'Unknown',
                phone: item.customer?.phone || data.phone,
                email: item.customer?.email || '',
                type: item.customer?.type || 'member',
                points: item.points || 0,
                loyaltyTier: item.loyalty_tier || 'Bronze',
                totalOrders: item.total_orders || 0,
                totalSpent: item.total_spent || 0
              };
              setSelectedCustomerForOrder(cust);
              setCustomerSearchQuery('');
              setShowCustomerDropdown(false);
            }
          }
        } catch { /* silent */ }
      }
    });
    return () => { socket.disconnect(); };
  }, [user?.restaurantId]);

  // Emit cart updates to checkout display
  useEffect(() => {
    if (!checkoutSocketRef.current || !user?.restaurantId) return;
    const items = orderItems.map(item => ({
      name: item.menuItem.name,
      quantity: item.quantity,
      price: item.menuItem.price + (item.selectedOptions?.reduce((s, o) => s + o.price, 0) || 0),
      options: item.selectedOptions?.map(o => o.name) || []
    }));
    checkoutSocketRef.current.emit('cart-update', {
      restaurantId: user.restaurantId,
      items,
      subtotal,
      tax,
      taxRate: operationSettings.taxEnabled ? operationSettings.taxRate : 0,
      serviceCharge,
      serviceChargeRate: effectiveServiceChargeRate,
      discount: discountAmount + couponDiscount + policyDiscount,
      total,
      currency: operationSettings.currency || 'MYR'
    });
  }, [orderItems, subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, serviceCharge, user?.restaurantId, operationSettings]);

  const formatDateTimeLocal = (date: Date) => {
    const dateStr = formatDateTime(date, operationSettings, {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    const time = formatDateTime(date, operationSettings, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      year: undefined,
      month: undefined,
      day: undefined
    });
    return `${dateStr}  ${time}`;
  };

  // API-based customer search for real-time results
  const searchCustomersFromAPI = async (query: string) => {
    if (!query.trim() || !user?.restaurantId) {
      setApiSearchResults([]);
      return;
    }

    setIsSearchingCustomers(true);
    try {
      const response = await fetch(`/api/customers/${user.restaurantId}?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Transform API response to match expected format
          const transformedResults = data.data.map((item: any) => ({
            id: item.customer?.id || item.customer_id,
            name: item.customer?.name || 'Unknown',
            phone: item.customer?.phone || '',
            email: item.customer?.email || '',
            type: item.customer?.type || 'member',
            points: item.points || 0,
            loyaltyTier: item.loyalty_tier || 'Bronze',
            totalOrders: item.total_orders || 0,
            totalSpent: item.total_spent || 0
          }));
          setApiSearchResults(transformedResults.slice(0, 10));
        }
      }
    } catch (error) {
      console.error('Customer search error:', error);
    } finally {
      setIsSearchingCustomers(false);
    }
  };

  // Get customers - use API results if available, fallback to local search
  const getFilteredCustomers = () => {
    if (!customerSearchQuery.trim()) return [];

    // Prefer API results
    if (apiSearchResults.length > 0) {
      return apiSearchResults;
    }

    // Fallback to local search
    const results = searchCustomers(customerSearchQuery);
    return results.slice(0, 10);
  };

  const filteredCustomers = getFilteredCustomers();

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomerForOrder(customer);
    setCustomerSearchQuery('');
    setShowCustomerDropdown(false);
    setApiSearchResults([]);
  };

  const handleClearCustomer = () => {
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
    setApiSearchResults([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleCustomerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerSearchQuery(value);
    setShowCustomerDropdown(value.trim().length > 0);

    // Debounced API search
    if (customerSearchTimeoutRef.current) {
      clearTimeout(customerSearchTimeoutRef.current);
    }

    if (value.trim().length >= 2) {
      customerSearchTimeoutRef.current = setTimeout(() => {
        searchCustomersFromAPI(value);
      }, 300);
    } else {
      setApiSearchResults([]);
    }
  };

  return (
    <POSContainer>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Logo onClick={handleResetPOS}>
            {brandLogo ? (
              <>
                <LogoImage src={brandLogo} alt="Brand Logo" />
                <span style={{ color: '#6B7C93', fontSize: '14px', fontWeight: 500 }}>{'POS Terminal'}</span>
              </>
            ) : (
              <span style={{ color: '#6B7C93', fontSize: '14px', fontWeight: 500 }}>{'POS Terminal'}</span>
            )}
          </Logo>
          <button
            onClick={() => navigate(`/restaurant/${restaurantId}/dashboard`)}
            style={{
              background: 'none',
              border: '1px solid #E6EBF1',
              borderRadius: '6px',
              padding: '6px 12px',
              cursor: 'pointer',
              color: '#6B7C93',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ← Dashboard
          </button>
        </div>
        <HeaderInfo>
          <StaffInfo clickable={true} onClick={() => setShowCashierPinModal(true)} title="Click to switch cashier">
            <span style={{ fontSize: '16px' }}>◆</span>
            <span>Cashier: {user?.name || 'Staff'}</span>
            <span style={{ fontSize: '11px', color: '#8898AA', marginLeft: '4px' }}>▼</span>
          </StaffInfo>
          <DateTime>{formatDateTimeLocal(currentDateTime)}</DateTime>
          <button
            type="button"
            onClick={async () => {
              const result = await openCustomerDisplay(user?.restaurantId || '');
              if (result.title && result.message) {
                setInfoModal({ open: true, title: result.title, message: result.message });
              }
            }}
            title={isAutoOpenEnabled() ? 'Customer Display (auto-open enabled)' : 'Open Customer Display on secondary monitor'}
            style={{
              padding: '6px 12px', fontSize: '12px', fontWeight: 500,
              border: '1px solid #E6EBF1', borderRadius: '6px',
              background: isAutoOpenEnabled() ? '#F0EFFF' : '#F6F9FC',
              color: isAutoOpenEnabled() ? '#635BFF' : '#6B7C93',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px'
            }}
          >
            {isAutoOpenEnabled() && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#635BFF', display: 'inline-block' }} />}
            Customer Display
          </button>
        </HeaderInfo>
      </Header>

      <MainLayout>
        <MenuSection>
          <SearchSection>
            <SearchInputContainer style={{ maxWidth: 360 }}>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              {searchQuery && (
                <ClearSearchBtn
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  ×
                </ClearSearchBtn>
              )}
            </SearchInputContainer>

            {/* Sort dropdown — applied to every category / mode / search result.
                Default = newest. localStorage persists per-device. */}
            <select
              aria-label={t('pos:terminal.sortLabel', 'Sort by')}
              value={sortBy}
              onChange={(e) => setSortByPersistent(e.target.value as SortKey)}
              style={{
                height: 36, padding: '0 28px 0 12px',
                border: '1px solid #E6EBF1',
                borderRadius: 6,
                background: 'white',
                fontSize: 13,
                fontWeight: 500,
                color: '#0A2540',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\' fill=\'none\'%3E%3Cpath d=\'M3 4.5L6 7.5L9 4.5\' stroke=\'%236B7C93\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 8px center'
              }}
            >
              <option value="newest">{t('pos:terminal.sortNewest', 'Newest')}</option>
              <option value="name">{t('pos:terminal.sortName', 'Name A–Z')}</option>
              <option value="price_asc">{t('pos:terminal.sortPriceAsc', 'Price ↑')}</option>
              <option value="price_desc">{t('pos:terminal.sortPriceDesc', 'Price ↓')}</option>
            </select>

            {/* View mode segmented toggle — Image (default, with photos)
                vs Compact (text-only, denser, surfaces the "All" tab). */}
            <div style={{ flex: 1 }} />
            <ViewToggle role="group" aria-label={t('pos:terminal.viewMode', 'View mode')}>
              <ViewToggleBtn
                type="button"
                active={displayMode === 'photo'}
                onClick={() => setDisplayModePersistent('photo')}
                title={t('pos:terminal.switchToPhoto', 'Switch to image mode')}
              >
                {t('pos:terminal.photoMode', 'Image')}
              </ViewToggleBtn>
              <ViewToggleBtn
                type="button"
                active={displayMode === 'simple'}
                onClick={() => setDisplayModePersistent('simple')}
                title={t('pos:terminal.switchToSimple', 'Switch to compact mode')}
              >
                {t('pos:terminal.simpleMode', 'Compact')}
              </ViewToggleBtn>
            </ViewToggle>
          </SearchSection>

          <CategoryTabs>
            {/* "All" tab is only available in Simple mode — text rendering scales,
                but loading every category's images at once is too slow for large menus. */}
            {displayMode === 'simple' && (
              <CategoryTab
                active={selectedCategory === 'all' && !isSearchMode}
                onClick={() => handleCategorySelect('all')}
              >
                {t('pos:terminal.categoryAll', 'All')}
              </CategoryTab>
            )}
            {categories.map(category => (
              <CategoryTab
                key={category.id}
                active={selectedCategory === category.id && !isSearchMode}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.emoji} {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          {isSearchMode && (
            <div style={{
              padding: '8px 16px',
              background: '#f0f7ff',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#1a73e8',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span>🔍</span>
              <span>Search results for "{searchQuery}" ({filteredMenuItems.length} items)</span>
            </div>
          )}

          <MenuGrid style={displayMode === 'simple'
            ? { gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }
            : undefined}>
            {filteredMenuItems.length > 0 ? (
              <>
                {(useProgressive ? filteredMenuItems.slice(0, visibleCount) : filteredMenuItems).map(item => {
                  // Check if item has option groups defined in menu data
                  const hasOptions = item.optionGroups && item.optionGroups.length > 0;

                  if (displayMode === 'simple') {
                    return (
                      <MenuItem
                        key={item.id}
                        soldOut={item.soldOut}
                        onClick={() => handleAddItemDirectly(item)}
                        style={{ padding: '10px 12px', textAlign: 'left' }}
                      >
                        {item.is_set_menu && <SetBadge>{'SET'}</SetBadge>}
                        <MenuName style={{ marginBottom: 2 }}>{item.code ? `${item.code} ` : ''}{item.name}</MenuName>
                        <MenuPrice style={{ fontSize: 14 }}>{currency} {item.price.toFixed(2)}</MenuPrice>
                        {hasOptions && (
                          <MenuItemActions>
                            <OptionButton
                              onClick={(e) => handleShowOptions(item, e)}
                              disabled={item.soldOut}
                            >
                              {t('pos:terminal.options', 'Options')}
                            </OptionButton>
                          </MenuItemActions>
                        )}
                      </MenuItem>
                    );
                  }

                  return (
                    <MenuItem
                      key={item.id}
                      soldOut={item.soldOut}
                      onClick={() => handleAddItemDirectly(item)}
                    >
                      {item.is_set_menu && <SetBadge>{'SET'}</SetBadge>}
                      <MenuImage hasImage={!!item.image}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                        ) : (
                          item.emoji
                        )}
                      </MenuImage>
                      <MenuName>{item.code ? `${item.code} ` : ''}{item.name}</MenuName>
                      <MenuPrice>{currency} {item.price.toFixed(2)}</MenuPrice>
                      {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
                        <SetItemsPreview>
                          {item.set_items.map(si => `${si.name} x${si.quantity}`).join(', ')}
                        </SetItemsPreview>
                      )}
                      {hasOptions && (
                        <MenuItemActions>
                          <OptionButton
                            onClick={(e) => handleShowOptions(item, e)}
                            disabled={item.soldOut}
                          >
                            Options
                          </OptionButton>
                        </MenuItemActions>
                      )}
                    </MenuItem>
                  );
                })}
                {/* Progressive loading trigger - only show when using progressive rendering */}
                {useProgressive && visibleCount < filteredMenuItems.length && (
                  <div ref={loadMoreTriggerRef} style={{ gridColumn: '1 / -1', height: '20px' }} />
                )}
              </>
            ) : isLoadingMenu ? (
              <NoResultsMessage>
                <div className="icon">⏳</div>
                <div className="title">{'Loading...'}</div>
              </NoResultsMessage>
            ) : (
              <NoResultsMessage>
                <div className="icon">🔍</div>
                <div className="title">
                  {isSearchMode ? `No results for "${searchQuery}"` : 'No items in this category'}
                </div>
                <div className="message">
                  {isSearchMode ? 'Try searching with different keywords' : 'Select a different category to view items'}
                </div>
              </NoResultsMessage>
            )}
          </MenuGrid>
        </MenuSection>

        <OrderSection>
          <OrderTypeToggle>
            <OrderTypeBtn
              active={orderType === 'dine-in'}
              onClick={() => setOrderType('dine-in')}
            >
              Dine In
            </OrderTypeBtn>
            <OrderTypeBtn
              active={orderType === 'takeaway'}
              onClick={() => setOrderType('takeaway')}
            >
              Takeaway
            </OrderTypeBtn>
          </OrderTypeToggle>

          <CustomerSearchSection>
            {selectedCustomerForOrder ? (
              <SelectedCustomerDisplay>
                <SelectedCustomerInfo>
                  <SelectedCustomerName>{selectedCustomerForOrder.name}</SelectedCustomerName>
                  <SelectedCustomerMeta>
                    {selectedCustomerForOrder.phone && `${selectedCustomerForOrder.phone} • `}
                    {selectedCustomerForOrder.id}
                  </SelectedCustomerMeta>
                </SelectedCustomerInfo>
                <ClearCustomerBtn onClick={handleClearCustomer}>
                  Clear
                </ClearCustomerBtn>
              </SelectedCustomerDisplay>
            ) : (
              <CustomerSearchContainer>
                <CustomerSearchIcon>🔍</CustomerSearchIcon>
                <CustomerSearchInput
                  type="text"
                  placeholder="Walk-in Customer"
                  value={customerSearchQuery}
                  onChange={handleCustomerSearchChange}
                  onFocus={() => {
                    if (customerSearchQuery.trim()) {
                      setShowCustomerDropdown(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowCustomerDropdown(false), 200)}
                />
                <CustomerSearchDropdown show={showCustomerDropdown && filteredCustomers.length > 0}>
                  {filteredCustomers.map((customer: any) => (
                    <CustomerSearchItem
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <CustomerItemName>{customer.name}</CustomerItemName>
                      <CustomerItemDetails>
                        {customer.phone && `${customer.phone} • `}
                        {customer.id}
                      </CustomerItemDetails>
                    </CustomerSearchItem>
                  ))}
                </CustomerSearchDropdown>
                <CustomerSearchDropdown show={showCustomerDropdown && customerSearchQuery.trim().length > 0 && filteredCustomers.length === 0 && !isSearchingCustomers}>
                  <CustomerSearchItem style={{ cursor: 'default', color: '#6B7C93' }}>
                    No customers found
                  </CustomerSearchItem>
                </CustomerSearchDropdown>
                <CustomerSearchDropdown show={showCustomerDropdown && isSearchingCustomers}>
                  <CustomerSearchItem style={{ cursor: 'default', color: '#6B7C93' }}>
                    Searching...
                  </CustomerSearchItem>
                </CustomerSearchDropdown>
              </CustomerSearchContainer>
            )}
          </CustomerSearchSection>

          {orderType === 'dine-in' && availableTables.length > 0 && (
            <TableNumberSection>
              <TableNumberLabel>Table Number:</TableNumberLabel>
              <TableNumberSelect
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              >
                <option value="">{'Free Seating'}</option>
                {availableTables.map(table => (
                  <option key={table} value={table}>{table}</option>
                ))}
              </TableNumberSelect>
              {tableNumber && (
                <>
                  <TableNumberLabel>Guests:</TableNumberLabel>
                  <TableNumberSelect
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    style={{ width: '80px' }}
                  >
                    <option value={0}>-</option>
                    {[1,2,3,4,5,6,7,8,9,10,12,15,20].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </TableNumberSelect>
                </>
              )}
            </TableNumberSection>
          )}

          {orderItems.length === 0 ? (
            <EmptyOrder>
              <EmptyText>{'No items in order'}</EmptyText>
              <EmptyText style={{ marginTop: '8px', fontSize: '12px' }}>
                Select menu items to start
              </EmptyText>
            </EmptyOrder>
          ) : (
            <ScrollableOrderContent>
              <OrderItems>
                <OrderItemsHeader>{orderItems.length} {orderItems.length === 1 ? 'item' : 'items'}</OrderItemsHeader>
                {orderItems.map(item => (
                  <OrderItem key={item.id}>
                    <ItemInfo>
                      <ItemName>{item.menuItem.code ? `${item.menuItem.code} ` : ''}{item.menuItem.name}</ItemName>
                      {item.options && item.options.length > 0 && (() => {
                        // Separate set menu items and regular options
                        const setItems: string[] = [];
                        const regularOptions: string[] = [];

                        item.options.forEach(option => {
                          // Check if this is a set menu item (format: "item name xN")
                          if (/^.+\sx\d+$/.test(option)) {
                            setItems.push(option);
                          } else {
                            regularOptions.push(option);
                          }
                        });

                        return (
                          <>
                            {setItems.length > 0 && (
                              <ItemOptions style={{ fontWeight: 600 }}>
                                {setItems.join(', ')}
                              </ItemOptions>
                            )}
                            {regularOptions.length > 0 && (
                              <ItemOptions>
                                ⭐ {regularOptions.join(', ')}
                              </ItemOptions>
                            )}
                          </>
                        );
                      })()}
                    </ItemInfo>
                    <ItemControls>
                      <QuantityControl>
                        <QuantityBtn onClick={() => handleQuantityChange(item.id, -1)}>
                          -
                        </QuantityBtn>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityBtn onClick={() => handleQuantityChange(item.id, 1)}>
                          +
                        </QuantityBtn>
                      </QuantityControl>
                      <ItemPrice>
                        {currency} {(() => {
                          let itemTotal = item.menuItem.price * item.quantity;
                          if (item.selectedOptions && item.selectedOptions.length > 0) {
                            const optionsTotal = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
                            itemTotal += optionsTotal * item.quantity;
                          }
                          return itemTotal.toFixed(2);
                        })()}
                      </ItemPrice>
                      <DeleteBtn onClick={() => handleDeleteItem(item.id)}>
                        ×
                      </DeleteBtn>
                    </ItemControls>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderSummary>
                <SummaryRow>
                  <SummaryLabel>{'Subtotal'}</SummaryLabel>
                  <SummaryValue>{currency} {subtotal.toFixed(2)}</SummaryValue>
                </SummaryRow>
                {takeawayCharge > 0 && (
                  <SummaryRow>
                    <SummaryLabel>{'Takeaway Charge'}</SummaryLabel>
                    <SummaryValue>{currency} {takeawayCharge.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {discountAmount > 0 && (
                  <SummaryRow>
                    <SummaryLabel>{'Discount'}</SummaryLabel>
                    <SummaryValue style={{ color: '#10B981' }}>-{currency} {discountAmount.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {appliedCoupon && (
                  <SummaryRow>
                    <SummaryLabel>Coupon ({appliedCoupon.code})</SummaryLabel>
                    <SummaryValue style={{ color: '#10B981' }}>-{currency} {couponDiscount.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {appliedDiscountPolicy && (
                  <SummaryRow>
                    <SummaryLabel>Discount ({appliedDiscountPolicy.name})</SummaryLabel>
                    <SummaryValue style={{ color: '#10B981' }}>-{currency} {policyDiscount.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {operationSettings.serviceChargeEnabled && serviceCharge > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Service Charge ({operationSettings.serviceChargeRate}%)</SummaryLabel>
                    <SummaryValue>{currency} {serviceCharge.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {operationSettings.taxEnabled && tax > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Tax ({operationSettings.taxRate}%)</SummaryLabel>
                    <SummaryValue>{currency} {tax.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                <TotalRow>
                  <SummaryLabel>{'Total'}</SummaryLabel>
                  <SummaryValue>{currency} {total.toFixed(2)}</SummaryValue>
                </TotalRow>
              </OrderSummary>

              <DiscountSection>
                <DiscountRow>
                  {appliedCoupon ? (
                    <AppliedCoupon>
                      <span>Coupon: {appliedCoupon.code} (-{currency} {appliedCoupon.discount.toFixed(2)})</span>
                      <RemoveBtn onClick={handleRemoveCoupon}>×</RemoveBtn>
                    </AppliedCoupon>
                  ) : (() => {
                    const searchLower = couponCode.trim().toLowerCase();
                    const filteredCoupons = searchLower
                      ? availableCoupons.filter(c =>
                          (c.code && c.code.toLowerCase().includes(searchLower)) ||
                          (c.name && c.name.toLowerCase().includes(searchLower))
                        )
                      : availableCoupons;
                    const formatCouponLabel = (c: any) => {
                      const v = Number(c.value || 0);
                      if (c.type === 'percentage') return `${v}% off`;
                      return `${currency} ${v.toFixed(2)} off`;
                    };
                    return (
                      <div style={{ position: 'relative', flex: 1, display: 'flex', gap: '8px' }}>
                        <DiscountInput
                          type="text"
                          placeholder={t('pos:pOSTerminalPage.searchOrEnterCoupon', 'Search or enter coupon code') as string}
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          onFocus={() => { fetchAvailableCoupons(); setShowCouponDropdown(true); }}
                          onBlur={() => setTimeout(() => setShowCouponDropdown(false), 200)}
                          onKeyDown={(e) => { if (e.key === 'Enter') handleApplyCoupon(); if (e.key === 'Escape') { setCouponCode(''); setShowCouponDropdown(false); (e.target as HTMLInputElement).blur(); } }}
                          style={{ flex: 1 }}
                        />
                        <DiscountButton
                          onClick={() => handleApplyCoupon()}
                          disabled={!couponCode}
                        >
                          {t('pos:pOSTerminalPage.applyCoupon', 'Apply Coupon')}
                        </DiscountButton>
                        {showCouponDropdown && (
                          <div
                            onMouseDown={(e) => e.preventDefault()}
                            style={{
                              position: 'absolute',
                              top: 'calc(100% + 4px)',
                              left: 0,
                              right: 0,
                              maxHeight: '280px',
                              overflowY: 'auto',
                              background: 'white',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                              boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                              zIndex: 100
                            }}
                          >
                            {availableCoupons.length === 0 ? (
                              <div style={{ padding: '14px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
                                {couponsLoaded
                                  ? t('pos:pOSTerminalPage.noActiveCoupons', 'No active coupons. Enter a code manually if you have one.')
                                  : t('pos:pOSTerminalPage.loadingCoupons', 'Loading...')}
                              </div>
                            ) : filteredCoupons.length === 0 ? (
                              <div style={{ padding: '14px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
                                {t('pos:pOSTerminalPage.noMatchingCoupons', 'No matching coupons.')}
                              </div>
                            ) : (
                              filteredCoupons.slice(0, 20).map((c: any) => {
                                const minOrder = Number(c.min_order || 0);
                                const eligible = minOrder === 0 || subtotal >= minOrder;
                                return (
                                  <div
                                    key={c.id}
                                    onClick={() => { if (eligible) handleApplyCoupon(c.code); }}
                                    style={{
                                      padding: '10px 14px',
                                      cursor: eligible ? 'pointer' : 'not-allowed',
                                      opacity: eligible ? 1 : 0.5,
                                      fontSize: '13px',
                                      color: '#0A2540',
                                      borderBottom: '1px solid #F3F4F6',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      gap: '12px',
                                      background: 'white',
                                      transition: 'background 0.1s'
                                    }}
                                    onMouseEnter={(e) => { if (eligible) e.currentTarget.style.background = '#F5F3FF'; }}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                  >
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                                      <span style={{ fontWeight: 600, color: '#635BFF', marginRight: '8px' }}>{c.code}</span>
                                      {c.name && <span style={{ color: '#6B7280' }}>{c.name}</span>}
                                      {minOrder > 0 && !eligible && (
                                        <span style={{ marginLeft: '6px', fontSize: '11px', color: '#EF4444' }}>
                                          ({t('pos:pOSTerminalPage.minOrder', 'min')} {currency} {minOrder.toFixed(2)})
                                        </span>
                                      )}
                                    </span>
                                    <span style={{ color: '#635BFF', fontWeight: 500, flexShrink: 0 }}>
                                      {formatCouponLabel(c)}
                                    </span>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </DiscountRow>

                <DiscountRow>
                  <QuickDiscountButtons>
                    <QuickDiscountBtn
                      active={discount === 5}
                      onClick={() => handleApplyDiscount(5)}
                    >
                      {operationSettings.currency} 5
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={discount === 10}
                      onClick={() => handleApplyDiscount(10)}
                    >
                      {operationSettings.currency} 10
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={discount === 15}
                      onClick={() => handleApplyDiscount(15)}
                    >
                      {operationSettings.currency} 15
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      onClick={() => setShowCustomAmountModal(true)}
                    >
                      Custom {operationSettings.currency}
                    </QuickDiscountBtn>
                  </QuickDiscountButtons>
                </DiscountRow>

                <DiscountRow>
                  <QuickDiscountButtons>
                    <QuickDiscountBtn
                      active={appliedDiscountPolicy?.name === 'Staff'}
                      onClick={() => handleApplyDiscountPolicy('Staff')}
                    >
                      20%
                    </QuickDiscountBtn>
                    <QuickDiscountBtn
                      active={appliedDiscountPolicy?.name === 'VIP'}
                      onClick={() => handleApplyDiscountPolicy('VIP')}
                    >
                      15%
                    </QuickDiscountBtn>
                    <QuickDiscountBtn onClick={() => setShowCustomPercentModal(true)}>
                      Custom %
                    </QuickDiscountBtn>
                  </QuickDiscountButtons>
                </DiscountRow>
              </DiscountSection>
            </ScrollableOrderContent>
          )}

          {operationSettings.pagerSystem.enabled && orderItems.length > 0 && (
            <TableNumberSection>
              <TableNumberLabel>Pager Number:</TableNumberLabel>
              <PagerSearchContainer>
                <PagerSearchInput
                  type="text"
                  value={pagerSearchQuery}
                  onChange={handlePagerSearchChange}
                  onFocus={() => {
                    if (pagerSearchQuery.trim() || !pagerNumber) {
                      setShowPagerDropdown(true);
                    }
                  }}
                  onBlur={() => setTimeout(() => setShowPagerDropdown(false), 200)}
                  placeholder={pagerNumber ? `#${pagerNumber}` : "Type or click..."}
                />
                <PagerSearchDropdown show={showPagerDropdown}>
                  {getFilteredPagers().length > 0 ? (
                    getFilteredPagers().map(num => (
                      <PagerSearchItem
                        key={num}
                        onClick={() => handleSelectPager(num)}
                      >
                        Pager #{num}
                      </PagerSearchItem>
                    ))
                  ) : (
                    <PagerSearchItem style={{ cursor: 'default', color: '#6B7C93' }}>
                      No matching pagers
                    </PagerSearchItem>
                  )}
                </PagerSearchDropdown>
              </PagerSearchContainer>
            </TableNumberSection>
          )}

          <OrderActions>
            <ActionBtn variant="danger" onClick={handleClearOrder}>
              Clear
            </ActionBtn>
            <ActionBtn variant="secondary" onClick={handleAddOrder}>
              Pay Later
            </ActionBtn>
            <ActionBtn
              variant="primary"
              onClick={handlePayment}
              style={{ flex: 2 }}
            >
              Pay Now
            </ActionBtn>
          </OrderActions>
        </OrderSection>
      </MainLayout>


      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        total={total}
        subtotal={subtotal}
        tax={tax}
        serviceCharge={serviceCharge}
        takeawayCharge={takeawayCharge}
        discountAmount={discountAmount}
        couponDiscount={couponDiscount}
        onConfirmPayment={handleConfirmPayment}
        paymentMethods={paymentMethods}
        taxRate={operationSettings.taxRate}
        serviceChargeRate={operationSettings.serviceChargeRate}
        taxEnabled={operationSettings.taxEnabled}
        serviceChargeEnabled={operationSettings.serviceChargeEnabled}
        cashierName={user?.name}
        customerPoints={customerPoints}
        customerTier={customerTier}
        membershipSettings={membershipSettings}
        selectedCustomerId={selectedCustomerForOrder?.id}
      />
      
      {selectedMenuItem && (
        <OptionModal
          isOpen={showOptionModal}
          onClose={() => {
            setShowOptionModal(false);
            setSelectedMenuItem(null);
          }}
          menuItem={selectedMenuItem}
          onConfirm={handleConfirmOptions}
        />
      )}
      
      {completedOrderData && (
        <OrderCompleteModal
          isOpen={showOrderCompleteModal}
          onClose={() => {
            handleResetPOS();
            if (isFloorPlanOverlay && window.parent !== window) {
              window.parent.postMessage({ type: 'pos-order-complete' }, '*');
            } else if (fromFloorPlan) {
              navigate(`/restaurant/${restaurantId}/floor-plan`);
            }
          }}
          orderData={completedOrderData}
          onPrintBill={() => {
            // Print is now handled inside OrderCompleteModal
            // No action needed here
          }}
        />
      )}
      
      <ConfirmDialog
        isOpen={showClearConfirm}
        onClose={() => setShowClearConfirm(false)}
        onConfirm={confirmClearOrder}
        title="Clear Order"
        message="Are you sure you want to clear all items from the order?"
        confirmText="Clear Order"
        cancelText="Cancel"
        variant="warning"
      />

      {showMergeChoiceModal && (
        <div
          onClick={() => setShowMergeChoiceModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 9200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 12, padding: 24,
              width: 480, maxWidth: 'calc(100vw - 32px)',
              maxHeight: '80vh', overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0A2540', marginBottom: 4 }}>
              {t('pos:mergeChoice.title', 'Existing order on this table')}
            </div>
            <div style={{ fontSize: 13, color: '#6B7C93', marginBottom: 16 }}>
              {t('pos:mergeChoice.subtitle', { defaultValue: 'Table {{table}} already has {{count}} pending order(s). Add to one, or create a separate order?', table: tableNumber, count: mergeableOrders.length })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {mergeableOrders.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => {
                    setForceMergeOrderId(Number(o.id));
                    setShowMergeChoiceModal(false);
                    setShowPaymentModal(true);
                  }}
                  style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '12px 14px',
                    border: '1px solid #DDD9FF',
                    background: '#F0F4FF',
                    borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#3B30D9' }}>
                      #{o.order_number || o.id} {o.customer_name ? '— ' + o.customer_name : ''}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7C93', marginTop: 2 }}>
                      {new Date(o.createdAt).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: false })}
                      {' · '}{currency} {Number(o.total_amount).toFixed(2)}
                    </div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#3B30D9' }}>
                    {t('pos:mergeChoice.addToThis', 'Add to this →')}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setShowMergeChoiceModal(false)}
                style={{
                  flex: 1, padding: '10px 14px', border: '1px solid #E6EBF1',
                  background: 'white', color: '#6B7C93', borderRadius: 8,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer'
                }}
              >
                {t('pos:mergeChoice.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setForceMergeOrderId(null);
                  setShowMergeChoiceModal(false);
                  setShowPaymentModal(true);
                }}
                style={{
                  flex: 2, padding: '10px 14px', border: 'none',
                  background: '#635BFF', color: 'white', borderRadius: 8,
                  fontSize: 13, fontWeight: 600, cursor: 'pointer'
                }}
              >
                {t('pos:mergeChoice.separate', 'Create separate order')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <AlertDialog
        isOpen={showFeatureAlert}
        onClose={() => setShowFeatureAlert(false)}
        title="Coming Soon"
        message="This feature is coming soon"
        variant="info"
      />
      
      <AlertDialog
        isOpen={showCouponError}
        onClose={() => setShowCouponError(false)}
        title="Invalid Coupon"
        message="The coupon code you entered is not valid. Please check and try again."
        variant="error"
      />
      
      <NumberInputModal
        isOpen={showCustomAmountModal}
        onClose={() => setShowCustomAmountModal(false)}
        onConfirm={handleCustomAmountConfirm}
        title="Custom Discount Amount"
        label="Enter discount amount:"
        placeholder="25"
        min={0}
        suffix={` ${getCurrencySymbol(currency)}`}
        confirmText="Apply Discount"
        cancelText="Cancel"
      />
      
      <NumberInputModal
        isOpen={showCustomPercentModal}
        onClose={() => setShowCustomPercentModal(false)}
        onConfirm={handleCustomPercentConfirm}
        title="Custom Discount Percentage"
        label="Enter discount percentage:"
        placeholder="10"
        min={0}
        max={100}
        suffix="%"
        confirmText="Apply Discount"
        cancelText="Cancel"
      />

      <CustomerModal />
      
      <CashierPinModal
        show={showCashierPinModal}
        onClose={() => setShowCashierPinModal(false)}
        onVerified={(result) => {
          if (result.token && result.user) {
            switchUser(result.token, result.user);
          }
          setShowCashierPinModal(false);
        }}
        onLogout={handleLogout}
        currentCashierName={user?.name}
      />
      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </POSContainer>
  );
};

export default POSTerminalPage;