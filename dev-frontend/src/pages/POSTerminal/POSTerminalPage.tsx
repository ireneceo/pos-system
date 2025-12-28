import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../../components/POSTerminal/PaymentModal';
import OptionModal from '../../components/POSTerminal/OptionModal';
import OrderCompleteModal from '../../components/POSTerminal/OrderCompleteModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import AlertDialog from '../../components/common/AlertDialog';
import NumberInputModal from '../../components/common/NumberInputModal';
import { useOrders } from '../../contexts/OrderContext';
import { useStore } from '../../contexts/StoreContext';
import { useMenu } from '../../contexts/MenuContext';
import { useCustomer } from '../../contexts/CustomerContext';
import { useStaff } from '../../contexts/StaffContext';
import { useAuth } from '../../contexts/AuthContext';
import CustomerModal from '../../components/Customer/CustomerModal';
// StaffLoginModal removed - authentication handled by ProtectedRoute
import { normalizeCustomerName } from '../../utils/orderUtils';
import { formatCurrency } from '../../utils/currency';
import { useRestaurantId } from '../../hooks/useRestaurantId';

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
  height: 56px;
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
  margin-top: 12px;
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

const QuickActions = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  gap: 12px;
`;

const QuickActionBtn = styled.button`
  padding: 12px 20px;
  background: #F6F9FC;
  color: #6B7C93;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #F6F9FC;
    border-color: #635BFF;
    color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 91, 255, 0.15);
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
  const navigate = useNavigate();
  const { user } = useAuth();
  const restaurantId = useRestaurantId();
  const { addOrder } = useOrders();
  const { getTakeawayCharge, operationSettings } = useStore();
  const { categories, menuItems, getItemsByCategory } = useMenu();
  const {
    updateCustomerOrderStats,
    searchCustomers
  } = useCustomer();
  const { currentStaff, isLoggedIn, logout, updateStaff } = useStaff();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [showOrderCompleteModal, setShowOrderCompleteModal] = useState(false);
  const [completedOrderData, setCompletedOrderData] = useState<any>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{code: string; discount: number} | null>(null);
  const [appliedDiscountPolicy, setAppliedDiscountPolicy] = useState<{name: string; discount: number; requiresApproval: boolean} | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showFeatureAlert, setShowFeatureAlert] = useState(false);
  const [showCouponError, setShowCouponError] = useState(false);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [pagerNumber, setPagerNumber] = useState('');
  const [pagerSearchQuery, setPagerSearchQuery] = useState('');
  const [showPagerDropdown, setShowPagerDropdown] = useState(false);
  const [showCustomAmountModal, setShowCustomAmountModal] = useState(false);
  // Staff login modal removed - authentication handled by ProtectedRoute
  const [showCustomPercentModal, setShowCustomPercentModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [brandLogo, setBrandLogo] = useState<string>('');
  const [paymentMethods, setPaymentMethods] = useState<any>(null);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [selectedCustomerForOrder, setSelectedCustomerForOrder] = useState<any>(null);

  // Currency and rounding settings
  const [currency, setCurrency] = useState<string>('RM');
  const [cashRounding, setCashRounding] = useState<number | null>(null);
  const [roundingApplyTo, setRoundingApplyTo] = useState<'cash_only' | 'all'>('cash_only');

  // Progressive rendering state
  const PROGRESSIVE_THRESHOLD = 50;
  const INITIAL_RENDER_COUNT = 40;
  const LOAD_MORE_COUNT = 30;
  const [visibleCount, setVisibleCount] = useState(INITIAL_RENDER_COUNT);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Load brand logo from site settings
  useEffect(() => {
    const loadBrandLogo = async () => {
      try {
        const response = await fetch('/api/site-settings');
        if (response.ok) {
          const settings = await response.json();
          if (settings.brand_logo) {
            setBrandLogo(settings.brand_logo);
          } else if (settings.brandLogo) {
            setBrandLogo(settings.brandLogo);
          } else if (settings.logo) {
            setBrandLogo(settings.logo);
          }
        }
      } catch (error) {
        console.error('Failed to load brand logo:', error);
      }
    };

    loadBrandLogo();

    // Listen for brand logo update event
    const handleBrandLogoUpdate = () => {
      loadBrandLogo();
    };

    window.addEventListener('brandLogoUpdated', handleBrandLogoUpdate);

    return () => {
      window.removeEventListener('brandLogoUpdated', handleBrandLogoUpdate);
    };
  }, []);

  // Staff login is handled by auth system - no need for modal in POS
  // User must be authenticated to access this page via ProtectedRoute

  // Use effect to update selected category when categories change
  useEffect(() => {
    if (categories.length > 0 && selectedCategory !== 'all' && !categories.find(cat => cat.id === selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [categories, selectedCategory]);

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
            if (restaurant.table_settings) {
              const { enableTableNumbers, totalTables, tablePrefix } = restaurant.table_settings;
              if (enableTableNumbers) {
                const tables = [];
                for (let i = 1; i <= totalTables; i++) {
                  tables.push(`${tablePrefix}${String(i).padStart(3, '0')}`);
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
            setCurrency(restaurant.currency || 'RM');
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

  // Filter menu items based on category and search query
  const getFilteredItems = () => {
    let items = selectedCategory === 'all' ? menuItems : getItemsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        (item.code && item.code.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query))
      );
    }

    // Debug: Log first item with code
    const itemWithCode = items.find(i => i.code);
    if (itemWithCode) {
      console.log('🔍 POS Menu Item with code:', {
        id: itemWithCode.id,
        code: itemWithCode.code,
        name: itemWithCode.name
      });
    }

    return items;
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

  const handleApplyCoupon = () => {
    // Get coupons from promotion management system
    const coupons: {[key: string]: {discount: string; status: string}} = {
      'SUMMER2025': { discount: '10%', status: 'active' },
      'NEWUSER': { discount: `${operationSettings.currency} 5`, status: 'active' },
      'SAVE10': { discount: '10%', status: 'active' },
      'SAVE20': { discount: '20%', status: 'active' },
      'WELCOME5': { discount: `${operationSettings.currency} 5`, status: 'active' },
      'LUNCH15': { discount: '15%', status: 'active' }
    };
    
    const upperCode = couponCode.toUpperCase();
    const coupon = coupons[upperCode];
    
    if (coupon && coupon.status === 'active') {
      // Parse discount value (percentage or fixed amount)
      let discountValue = 0;
      if (coupon.discount.includes('%')) {
        // Percentage discount
        const percentage = parseFloat(coupon.discount.replace('%', ''));
        discountValue = subtotal * (percentage / 100);
      } else if (coupon.discount.includes(operationSettings.currency)) {
        // Fixed amount discount
        discountValue = parseFloat(coupon.discount.replace(`${operationSettings.currency} `, ''));
      }

      setAppliedCoupon({ code: upperCode, discount: discountValue });
      setCouponCode('');
    } else if (couponCode) {
      setShowCouponError(true);
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
          alert('Invalid manager code. Discount not applied.');
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
    logout();
    setShowLogoutConfirm(false);
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
        serviceChargeRate: operationSettings.serviceChargeRate,
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
          is_set_menu: item.menuItem.is_set_menu || false,
          set_items: item.menuItem.set_items || []
        };
      }),
      status: 'pending' as const,
      createdAt: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      subtotal,
      tax,
      taxRate: operationSettings.taxRate,
      serviceCharge,
      serviceChargeRate: operationSettings.serviceChargeRate,
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
      pagerNumber: pagerNumber || undefined
    };

      console.log('🟡 Calling addOrder with orderNumber:', newOrder.orderNumber);
      const savedOrder: any = await addOrder(newOrder, restaurantId ? Number(restaurantId) : undefined);
      console.log('🟢 addOrder completed, savedOrder:', savedOrder);

      // Show order complete modal with actual order number from backend
      // Backend returns snake_case (order_number), convert to camelCase
      setCompletedOrderData({
        ...orderData,
        orderNumber: savedOrder?.order_number || savedOrder?.orderNumber || newOrder.orderNumber,
        pickupNumber: savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : newOrder.pickupNumber),
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        // Ensure takeawayCharge from backend is used if available
        takeawayCharge: savedOrder?.takeaway_charge || savedOrder?.takeawayCharge || orderData.takeawayCharge,
        subtotal: savedOrder?.subtotal || orderData.subtotal,
        tax: savedOrder?.tax || orderData.tax,
        serviceCharge: savedOrder?.service_charge || savedOrder?.serviceCharge || orderData.serviceCharge,
        discount: savedOrder?.discount || orderData.discount,
        discountPolicy: orderData.discountPolicy,
        coupon: orderData.coupon,
        total: savedOrder?.total || orderData.total
      });
      setShowOrderCompleteModal(true);

      // Clear the order
      setOrderItems([]);
      setDiscount(0);
      setAppliedCoupon(null);
      setAppliedDiscountPolicy(null);
      setCouponCode('');
      setTableNumber('');
      setPagerNumber('');
      setPagerSearchQuery('');
      setSelectedCustomerForOrder(null);
      setCustomerSearchQuery('');

      console.log('POS - Order added without payment:', savedOrder?.orderNumber);
    } catch (error) {
      console.error('POS - Error adding order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePayment = () => {
    if (orderItems.length === 0) return;
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async (method: string, amountReceived?: number, change?: number) => {
    // 중복 실행 방지
    if (isProcessingPayment) {
      console.warn('POS - Payment already in progress, ignoring duplicate call');
      return;
    }

    setIsProcessingPayment(true);
    console.log('POS - Processing payment for method:', method);

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
        serviceChargeRate: operationSettings.serviceChargeRate,
        tax,
        taxRate: operationSettings.taxRate,
        total,
        paymentMethod: method,
        amountReceived: amountReceived || total,
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
          is_set_menu: item.menuItem.is_set_menu || false,
          set_items: item.menuItem.set_items || []
        };
      }),
      status: 'pending' as const,
      createdAt: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      subtotal,
      tax,
      taxRate: operationSettings.taxRate,
      serviceCharge,
      serviceChargeRate: operationSettings.serviceChargeRate,
      discount: discountAmount,
      coupon: appliedCoupon ? { code: appliedCoupon.code, amount: appliedCoupon.discount } : undefined,
      discountPolicy: appliedDiscountPolicy ? { name: appliedDiscountPolicy.name, amount: appliedDiscountPolicy.discount } : undefined,
      takeawayCharge: takeawayCharge,
      total,
      paymentMethod: method,
      paymentStatus: 'completed' as const,
      orderType: orderType,
      orderSource: 'pos' as const,
      tableNumber: orderType === 'dine-in' && tableNumber ? tableNumber : undefined,
      pagerNumber: pagerNumber || undefined
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
        pickupNumber: savedOrder?.pickupNumber || (savedOrder?.order_number ? savedOrder.order_number.split('-')[1] : ''),
        pagerNumber: savedOrder?.pager_number || pagerNumber || undefined,
        // Ensure takeawayCharge from backend is used if available
        takeawayCharge: savedOrder?.takeaway_charge || savedOrder?.takeawayCharge || orderData.takeawayCharge,
        subtotal: savedOrder?.subtotal || orderData.subtotal,
        tax: savedOrder?.tax || orderData.tax,
        serviceCharge: savedOrder?.service_charge || savedOrder?.serviceCharge || orderData.serviceCharge,
        discount: savedOrder?.discount || orderData.discount,
        discountPolicy: orderData.discountPolicy,
        coupon: orderData.coupon,
        total: savedOrder?.total || orderData.total
      });
      setShowOrderCompleteModal(true);
      setShowPaymentModal(false);

      // Clear the order
      setOrderItems([]);
      setDiscount(0);
      setAppliedCoupon(null);
      setAppliedDiscountPolicy(null);
      setCouponCode('');
      setTableNumber('');
      setPagerNumber('');
      setPagerSearchQuery('');
      setSelectedCustomerForOrder(null);
      setCustomerSearchQuery('');

      console.log('POS - Payment processing completed:', savedOrder?.orderNumber);
    } catch (error) {
      console.error('POS - Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
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
        // Calculate total quantity of items
        const totalQuantity = orderItems.reduce((sum, item) => sum + item.quantity, 0);
        takeawayCharge = totalQuantity * operationSettings.takeawayPricing.perItemCharge;
      } else {
        // Per category pricing
        orderItems.forEach(item => {
          const charge = getTakeawayCharge(item.menuItem.category);
          takeawayCharge += charge * item.quantity;
        });
      }
    }

    const subtotalWithTakeaway = subtotal + takeawayCharge;
    const discountAmount = discount;
    const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const policyDiscount = appliedDiscountPolicy ? appliedDiscountPolicy.discount : 0;
    const afterDiscount = Math.max(0, subtotalWithTakeaway - discountAmount - couponDiscount - policyDiscount);

    // Apply service charge and tax in parallel (both on afterDiscount amount)
    const serviceCharge = operationSettings.serviceChargeEnabled
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

    return { subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, takeawayCharge, serviceCharge };
  };

  const { subtotal, tax, total, discountAmount, couponDiscount, policyDiscount, takeawayCharge, serviceCharge } = calculateTotal();

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get customers from CustomerContext and filter by search query
  const getFilteredCustomers = () => {
    if (!customerSearchQuery.trim()) return [];

    const results = searchCustomers(customerSearchQuery);
    return results.slice(0, 10); // Limit to 10 results
  };

  const filteredCustomers = getFilteredCustomers();

  const handleSelectCustomer = (customer: any) => {
    setSelectedCustomerForOrder(customer);
    setCustomerSearchQuery('');
    setShowCustomerDropdown(false);
  };

  const handleClearCustomer = () => {
    setSelectedCustomerForOrder(null);
    setCustomerSearchQuery('');
  };

  const handleCustomerSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomerSearchQuery(value);
    setShowCustomerDropdown(value.trim().length > 0);
  };

  return (
    <POSContainer>
      <Header>
        <Logo onClick={handleResetPOS}>
          {brandLogo ? (
            <>
              <LogoImage src={brandLogo} alt="Brand Logo" />
              <span style={{ color: '#6B7C93', fontSize: '14px', fontWeight: 500 }}>POS Terminal</span>
            </>
          ) : (
            <span style={{ color: '#6B7C93', fontSize: '14px', fontWeight: 500 }}>POS Terminal</span>
          )}
        </Logo>
        <HeaderInfo>
          <StaffInfo clickable={false}>
            <span style={{ fontSize: '16px' }}>◆</span>
            <span>
              {isLoggedIn && currentStaff
                ? `Staff: ${currentStaff.name} (${currentStaff.role})`
                : user?.name || 'Staff'
              }
            </span>
          </StaffInfo>
          <DateTime>{formatDateTime(currentDateTime)}</DateTime>
        </HeaderInfo>
      </Header>

      <MainLayout>
        <MenuSection>
          <SearchSection>
            <SearchInputContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput
                type="text"
                placeholder="Search menu items by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <ClearSearchBtn
                  onClick={() => setSearchQuery('')}
                  title="Clear search"
                >
                  ×
                </ClearSearchBtn>
              )}
            </SearchInputContainer>
          </SearchSection>
          
          <CategoryTabs>
            <CategoryTab
              key="all"
              active={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
            >
              All Items
            </CategoryTab>
            {categories.map(category => (
              <CategoryTab
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.emoji} {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>

          <MenuGrid>
            {filteredMenuItems.length > 0 ? (
              <>
                {(useProgressive ? filteredMenuItems.slice(0, visibleCount) : filteredMenuItems).map(item => {
                  // Check if item has option groups defined in menu data
                  const hasOptions = item.optionGroups && item.optionGroups.length > 0;

                  return (
                    <MenuItem
                      key={item.id}
                      soldOut={item.soldOut}
                      onClick={() => handleAddItemDirectly(item)}
                    >
                      {item.is_set_menu && <SetBadge>SET</SetBadge>}
                      <MenuImage hasImage={!!item.image}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} loading="lazy" />
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
            ) : (
              <NoResultsMessage>
                <div className="icon">🔍</div>
                <div className="title">
                  {searchQuery ? `No results for "${searchQuery}"` : 'No items in this category'}
                </div>
                <div className="message">
                  {searchQuery ? 'Try searching with different keywords' : 'Select a different category to view items'}
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
                <CustomerSearchDropdown show={showCustomerDropdown && customerSearchQuery.trim().length > 0 && filteredCustomers.length === 0}>
                  <CustomerSearchItem style={{ cursor: 'default', color: '#6B7C93' }}>
                    No customers found
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
                <option value="">Free Seating</option>
                {availableTables.map(table => (
                  <option key={table} value={table}>{table}</option>
                ))}
              </TableNumberSelect>
            </TableNumberSection>
          )}

          {orderItems.length === 0 ? (
            <EmptyOrder>
              <EmptyText>No items in order</EmptyText>
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
                  <SummaryLabel>Subtotal</SummaryLabel>
                  <SummaryValue>{currency} {subtotal.toFixed(2)}</SummaryValue>
                </SummaryRow>
                {takeawayCharge > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Takeaway Charge</SummaryLabel>
                    <SummaryValue>{currency} {takeawayCharge.toFixed(2)}</SummaryValue>
                  </SummaryRow>
                )}
                {discountAmount > 0 && (
                  <SummaryRow>
                    <SummaryLabel>Discount</SummaryLabel>
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
                  <SummaryLabel>Total</SummaryLabel>
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
                  ) : (
                    <>
                      <DiscountInput
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                      <DiscountButton
                        onClick={handleApplyCoupon}
                        disabled={!couponCode}
                      >
                        Apply Coupon
                      </DiscountButton>
                    </>
                  )}
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

      <QuickActions>
        <QuickActionBtn onClick={() => navigate('/pos/dashboard')}>
          ← Back to Dashboard
        </QuickActionBtn>
      </QuickActions>

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
        suffix=" RM"
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
      
      <ConfirmDialog
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Logout Confirmation"
        message="Are you sure you want to logout from the POS system?"
        confirmText="Logout"
        cancelText="Cancel"
        variant="warning"
      />
    </POSContainer>
  );
};

export default POSTerminalPage;