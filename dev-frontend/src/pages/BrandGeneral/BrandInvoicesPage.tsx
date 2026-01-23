import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { BaseButton, StatusBadge as CommonStatusBadge, StatusMessage } from '../../components/UI/CommonStyles';
import ConfirmModal from '../../components/ConfirmModal';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription,
  DataTableContainer,
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTableEmpty,
  DataTableAmount,
  ActionButtons
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Tabs, Tab as CommonTab, Badge as TabBadge } from '../../components/Common/TabComponents';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Invoice {
  id: string;
  invoiceNumber: string;
  managerId: string;
  managerName: string;
  companyName: string;
  customerName: string;
  customerAddress: string;
  restaurantId?: string;
  restaurantName?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'draft' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled' | '';
  currency?: string;
  amount: number;
  tax: number;
  total: number;
  items: InvoiceItem[];
  billingPeriod: string;
  planType: string;
  paymentMethod?: string;
  transactionId?: string;
  receiptUrl?: string;
  hasPaymentInfo?: boolean;
  type?: 'automatic' | 'manual';
  payerType?: 'restaurant' | 'foodcourt_manager' | 'brand_manager';
  payerId?: string;
  invoiceCategory?: 'subscription' | 'service' | 'consulting' | 'others';
  customDescription?: string;
  serviceDescription?: string;
  categoryDisplayName?: string;
  issuerType?: 'system_admin' | 'brand' | 'foodcourt';
  issuerName?: string;
  issuerInfo?: {
    name: string;
    logoUrl?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    taxId?: string;
    businessRegistration?: string;
    bankName?: string;
    bankAccount?: string;
    bankAccountName?: string;
    swiftCode?: string;
  };
  payerInfo?: {
    name: string;
    logoUrl?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    email?: string;
    taxId?: string;
    businessRegistration?: string;
  };
}

interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Manager {
  id: string;
  fullName: string;
  email: string;
  role: string;
  companyName?: string;
}

interface Restaurant {
  id: string;
  name: string;
  manager_id: string;
  status: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface Subscription {
  id: string;
  restaurant_id: string;
  plan_type: 'basic' | 'professional' | 'enterprise';
  status: 'Active' | 'Trial' | 'Expired' | 'Suspended' | 'Cancelled';
  billing_cycle: 'monthly' | 'annual';
  menu_limit: number;
  monthly_price: number;
  annual_price: number;
  start_date: string;
  end_date?: string;
}

interface InvoiceCategory {
  id: number;
  name: string;
  code: string;
  description: string;
  display_order: number;
  is_system: boolean;
  is_active: boolean;
}

interface CompanySettings {
  companyName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxNumber: string;
  registrationNumber: string;
  companyLogo?: string; // Company logo for invoices
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  swiftCode?: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrImage?: string;
  qrDescription?: string;
  publishableKey?: string;
  clientId?: string;
}

// Common components now imported from ../../components/UI
// Page-specific styled components below

// FilterBar wrapper for full width layout
const FilterBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const FiltersLeft = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;

  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`;

const FiltersRight = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;

// Button 컴포넌트는 BaseButton으로 교체됨
const Button = styled(BaseButton)``;

const InvoiceInfo = styled.div``;

const InvoiceNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const CompanyName = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const AutoBadge = styled.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`;

// StatusBadge 컴포넌트는 CommonStatusBadge로 교체됨
const StatusBadge = styled(CommonStatusBadge)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`;

const Amount = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.highlight ? '700' : '500'};
  color: #374151;
`;

const LocalActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'email' | 'cancel' | 'success' }>`
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'success' ? `
    background: #10B981;
    color: white;
    border-color: #10B981;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      background: #059669;
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      background: #FEE2E2;
    }
  ` : props.variant === 'email' ? `
    background: #F3F4F6;
    color: #6B7280;
    border-color: #E5E7EB;

    &:hover {
      background: #E5E7EB;
      color: #374151;
    }
  ` : props.variant === 'cancel' ? `
    background: #F6F9FC;
    color: #6B7C93;
    border-color: #E6EBF1;

    &:hover {
      background: #E6EBF1;
      transform: translateY(-1px);
    }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      border-color: #635BFF;
      color: #635BFF;
      background: #F4F3FF;
    }
  `}
`;

const LocalIconButton = styled.button`
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

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconSymbol = styled.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

// Category Card Components (Recipe style)
const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const CategoryCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.isActive !== false ? 1 : 0.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const CategoryStatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.active ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
`;

const CategoryIconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`;

const CategoryEmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

// Period filter components
const PeriodFilterGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 640px) {
    width: 95%;
    max-width: none;
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const ModalTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6B7280;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #F3F4F6;
    color: #374151;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  flex-shrink: 0;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;



const InvoiceSummary = styled.div`
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const SummaryRow = styled.div<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  ${props => props.highlight ? `
    border-top: 1px solid #E6EBF1;
    margin-top: 8px;
    padding-top: 16px;
    font-size: 16px;
  ` : ''}
`;

type TabType = 'issued' | 'to_pay' | 'categories';

type PeriodType = 'week' | 'month' | 'year' | 'all';

const BrandInvoicesPage: React.FC = () => {
  const { operationSettings } = useStore();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    // Default to current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    return {
      start: formatDate(firstDay),
      end: formatDate(lastDay)
    };
  });
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
  const [showSendConfirmModal, setShowSendConfirmModal] = useState(false);
  const [showResendConfirmModal, setShowResendConfirmModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [emailInvoice, setEmailInvoice] = useState<Invoice | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // URL-based tab management
  const activeTab = (searchParams.get('tab') as TabType) || 'issued';
  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  // Period filter handlers
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);

    const now = new Date();
    let start = new Date();
    let end = new Date();

    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    switch (period) {
      case 'week':
        // Start of week (Sunday)
        start.setDate(now.getDate() - now.getDay());
        break;
      case 'month':
        // Start of month
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'year':
        // Start of year
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case 'all':
        // All time - set very old start date
        start = new Date(2000, 0, 1);
        break;
    }

    setDateRange({
      start: formatDate(start),
      end: formatDate(end)
    });
  };

  const handleDateRangeChange = (type: 'start' | 'end', value: string) => {
    setIsCustomDateRange(true);
    setDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // State for invoices to pay (from system admin)
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);

  // To Pay tab filters (separate from Issued tab)
  const [toPaySearchTerm, setToPaySearchTerm] = useState('');
  const [toPayActivePeriod, setToPayActivePeriod] = useState<PeriodType>('month');
  const [toPayIsCustomDateRange, setToPayIsCustomDateRange] = useState(false);
  const [toPayDateRange, setToPayDateRange] = useState(() => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    return {
      start: formatDate(firstDay),
      end: formatDate(lastDay)
    };
  });

  // To Pay period filter handlers
  const handleToPayPeriodChange = (period: PeriodType) => {
    setToPayActivePeriod(period);
    setToPayIsCustomDateRange(false);

    const now = new Date();
    let start = new Date();
    let end = new Date();

    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    switch (period) {
      case 'week':
        start.setDate(now.getDate() - now.getDay());
        break;
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'year':
        start = new Date(now.getFullYear(), 0, 1);
        end = new Date(now.getFullYear(), 11, 31);
        break;
      case 'all':
        start = new Date(2000, 0, 1);
        break;
    }

    setToPayDateRange({
      start: formatDate(start),
      end: formatDate(end)
    });
  };

  const handleToPayDateRangeChange = (type: 'start' | 'end', value: string) => {
    setToPayIsCustomDateRange(true);
    setToPayDateRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Payment submission states
  const [showPaymentSubmitModal, setShowPaymentSubmitModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'bank_transfer',
    transactionId: '',
    notes: '',
    receiptImage: '' // Base64 encoded receipt image
  });
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [paymentSubmitError, setPaymentSubmitError] = useState<string | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);

  // Category management states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<InvoiceCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({ name: '', code: '', description: '' });
  const [savingCategory, setSavingCategory] = useState(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<InvoiceCategory | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editInvoice, setEditInvoice] = useState<any>(null);
  const [editSearchQuery, setEditSearchQuery] = useState('');
  const [editSearchResults, setEditSearchResults] = useState<{managers: Manager[], restaurants: Restaurant[]}>({managers: [], restaurants: []});
  const [showEditSearchDropdown, setShowEditSearchDropdown] = useState(false);
  const [editSelectedTarget, setEditSelectedTarget] = useState<{type: 'manager' | 'restaurant', data: Manager | Restaurant} | null>(null);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchResults, setSearchResults] = useState<{managers: Manager[], restaurants: Restaurant[]}>({managers: [], restaurants: []});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<{type: 'manager' | 'restaurant', data: Manager | Restaurant} | null>(null);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [invoiceCategories, setInvoiceCategories] = useState<InvoiceCategory[]>([]);
  const [newInvoice, setNewInvoice] = useState({
    managerId: '',
    managerName: '',
    companyName: '',
    restaurantId: '',
    restaurantName: '',
    amount: '',
    tax: '0',
    total: '0',
    description: '',
    dueDate: '',
    planType: 'professional',
    billingCycle: 'monthly',
    invoiceCategory: 'service',
    customDescription: '',
    serviceDescription: '',
    currency: 'MYR'
  });

  // Fetch invoices from API
  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      console.log('🔐 [INVOICES] Token present:', !!token);
      console.log('🔐 [INVOICES] Token first 50 chars:', token ? token.substring(0, 50) + '...' : 'NULL');

      if (!token) {
        console.error('❌ [INVOICES] No auth token found in localStorage');
        setInvoices([]);
        return;
      }

      const response = await fetch('/api/invoices', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 [INVOICES] API response status:', response.status);

      if (response.ok) {
        const invoicesData = await response.json();
        console.log('✅ [INVOICES] Fetched invoices count:', invoicesData.length);
        console.log('📋 [INVOICES] First 3 invoices:', invoicesData.slice(0, 3).map((inv: any) => ({ id: inv.id, invoiceNumber: inv.invoiceNumber })));
        setInvoices(invoicesData);
      } else {
        const errorText = await response.text();
        console.error('❌ [INVOICES] Failed to fetch invoices:', response.status, errorText);
        setInvoices([]);
      }
    } catch (error) {
      console.error('❌ [INVOICES] Error fetching invoices:', error);
      setInvoices([]);
    }
  };

  // Fetch invoices to pay (from system admin)
  const fetchInvoicesToPay = async () => {
    console.log('[BrandInvoices] fetchInvoicesToPay called');
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.log('[BrandInvoices] No token found');
        setInvoicesToPay([]);
        return;
      }

      console.log('[BrandInvoices] Calling /api/invoices/to-pay...');
      const response = await fetch('/api/invoices/to-pay', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('[BrandInvoices] Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('[BrandInvoices] Received invoices to pay:', data.length, data);
        setInvoicesToPay(data);
      } else {
        const errorText = await response.text();
        console.error('[BrandInvoices] Failed to fetch invoices to pay:', response.status, errorText);
        setInvoicesToPay([]);
      }
    } catch (error) {
      console.error('[BrandInvoices] Error fetching invoices to pay:', error);
      setInvoicesToPay([]);
    }
  };

  // Submit payment for an invoice
  const handleSubmitPayment = async () => {
    if (!selectedInvoice) return;

    setPaymentSubmitError(null);
    setIsSubmittingPayment(true);

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/submit-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payment_method: paymentData.paymentMethod,
          transaction_id: paymentData.transactionId,
          notes: paymentData.notes,
          receipt_url: paymentData.receiptImage || null // Send receipt image as base64
        })
      });

      if (response.ok) {
        setShowPaymentSubmitModal(false);
        setSelectedInvoice(null);
        setPaymentData({ paymentMethod: 'bank_transfer', transactionId: '', notes: '', receiptImage: '' });
        setPaymentSubmitError(null);
        setSuccessMessage('Payment submitted successfully! The issuer will review and confirm your payment.');
        setShowSuccessModal(true);
        await fetchInvoicesToPay();
      } else {
        const errorData = await response.json();
        setPaymentSubmitError(errorData.error || errorData.message || 'Failed to submit payment');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      setPaymentSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  // Fetch available payment methods for a currency
  const fetchPaymentMethods = async (currency: string) => {
    setLoadingPaymentMethods(true);
    try {
      const response = await fetch(`/api/admin/payment-settings/available/${currency}`);
      if (response.ok) {
        const data = await response.json();
        setAvailablePaymentMethods(data.methods || []);
        // Set default payment method if available
        if (data.methods && data.methods.length > 0) {
          setPaymentData(prev => ({ ...prev, paymentMethod: data.methods[0].id }));
        }
      } else {
        setAvailablePaymentMethods([]);
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      setAvailablePaymentMethods([]);
    } finally {
      setLoadingPaymentMethods(false);
    }
  };

  // Open payment submit modal
  const handlePayInvoice = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({ paymentMethod: '', transactionId: '', notes: '', receiptImage: '' });
    setShowPaymentSubmitModal(true);
    // Fetch available payment methods for invoice currency
    await fetchPaymentMethods(invoice.currency || 'MYR');
  };

  // Resize image to reduce base64 size
  const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 800, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Convert to base64 with compression
        const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(resizedBase64);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Handle receipt image upload with auto-resize
  const handleReceiptImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setPaymentSubmitError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    // Validate file size (max 10MB before resize)
    if (file.size > 10 * 1024 * 1024) {
      setPaymentSubmitError('File size must be less than 10MB');
      return;
    }

    try {
      setPaymentSubmitError(null);
      // Resize image to reduce storage size
      const resizedImage = await resizeImage(file, 1024, 1024, 0.8);
      setPaymentData(prev => ({ ...prev, receiptImage: resizedImage }));
    } catch (error) {
      console.error('Error processing image:', error);
      setPaymentSubmitError('Failed to process image. Please try another file.');
    }
  };

  // Fetch invoice categories from API
  const fetchInvoiceCategories = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/invoices/categories/all', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setInvoiceCategories(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching invoice categories:', error);
    }
  }, []);

  // Category management functions
  const handleOpenCategoryModal = (category?: InvoiceCategory) => {
    if (category) {
      setEditingCategory(category);
      setCategoryFormData({
        name: category.name,
        code: category.code,
        description: category.description || ''
      });
    } else {
      setEditingCategory(null);
      setCategoryFormData({ name: '', code: '', description: '' });
    }
    setShowCategoryModal(true);
  };

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryFormData({ name: '', code: '', description: '' });
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.name.trim() || !categoryFormData.code.trim()) return;

    try {
      setSavingCategory(true);
      const token = localStorage.getItem('auth_token');
      const url = editingCategory
        ? `/api/invoices/categories/${editingCategory.id}`
        : '/api/invoices/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: categoryFormData.name.trim(),
          code: categoryFormData.code.trim().toLowerCase().replace(/\s+/g, '_'),
          description: categoryFormData.description.trim() || null
        })
      });

      const data = await response.json();
      if (data.success) {
        handleCloseCategoryModal();
        fetchInvoiceCategories();
      } else {
        alert(data.error || 'Failed to save category');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category');
    } finally {
      setSavingCategory(false);
    }
  };

  const handleDeleteCategoryClick = (category: InvoiceCategory) => {
    setCategoryToDelete(category);
    setDeleteCategoryModalOpen(true);
  };

  const handleDeleteCategoryConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/categories/${categoryToDelete.id}?force=true`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setDeleteCategoryModalOpen(false);
        setCategoryToDelete(null);
        fetchInvoiceCategories();
      } else {
        alert(data.error || 'Failed to delete category');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
    }
  };

  const handleToggleCategoryActive = async (category: InvoiceCategory) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: !category.is_active })
      });

      const data = await response.json();
      if (data.success) {
        fetchInvoiceCategories();
      }
    } catch (error) {
      console.error('Failed to toggle category:', error);
    }
  };

  // Sample data fallback - kept for reference but not currently used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const setSampleData = () => {
    const sampleInvoices: Invoice[] = [
      {
        id: 'inv-001',
        invoiceNumber: 'INV-2025-001',
        managerId: 'mgr-001',
        managerName: 'Ahmad Rahman',
        companyName: 'Sunway Food Court',
        customerName: 'Ahmad Rahman',
        customerAddress: 'Sunway Food Court',
        issueDate: '2025-01-01',
        dueDate: '2025-01-31',
        paidDate: '2025-01-15',
        status: 'paid',
        amount: 2190,
        tax: 131.4,
        total: 2321.4,
        billingPeriod: 'Jan 2025 - Dec 2025',
        planType: 'Enterprise',
        items: [
          { description: 'Enterprise Plan - Annual', quantity: 1, unitPrice: 2190, total: 2190 }
        ]
      },
      {
        id: 'inv-002',
        invoiceNumber: 'INV-2025-002',
        managerId: 'mgr-002',
        managerName: 'Sarah Lim',
        companyName: 'IOI Mall Restaurants',
        customerName: 'Sarah Lim',
        customerAddress: 'IOI Mall Restaurants',
        issueDate: '2025-01-15',
        dueDate: '2025-02-15',
        status: 'pending_payment',
        amount: 99,
        tax: 5.94,
        total: 104.94,
        billingPeriod: 'Feb 2025',
        planType: 'Professional',
        hasPaymentInfo: false,
        items: [
          { description: 'Professional Plan - Monthly', quantity: 1, unitPrice: 99, total: 99 }
        ]
      },
      {
        id: 'inv-003',
        invoiceNumber: 'INV-2025-003',
        managerId: 'mgr-003',
        managerName: 'David Tan',
        companyName: 'Pavilion Food Hub',
        customerName: 'David Tan',
        customerAddress: 'Pavilion Food Hub',
        issueDate: '2024-12-10',
        dueDate: '2025-01-10',
        status: 'overdue',
        amount: 2190,
        tax: 131.4,
        total: 2321.4,
        billingPeriod: 'Nov 2024 - Oct 2025',
        planType: 'Enterprise',
        items: [
          { description: 'Enterprise Plan - Annual Renewal', quantity: 1, unitPrice: 2190, total: 2190 }
        ]
      },
      {
        id: 'inv-004',
        invoiceNumber: 'INV-2025-004',
        managerId: 'mgr-005',
        managerName: 'John Doe',
        companyName: 'Single Restaurant Chain',
        customerName: 'John Doe',
        customerAddress: 'Single Restaurant Chain',
        issueDate: '2025-01-20',
        dueDate: '2025-02-20',
        status: 'draft',
        amount: 29,
        tax: 1.74,
        total: 30.74,
        billingPeriod: 'Feb 2025',
        planType: 'Basic',
        items: [
          { description: 'Basic Plan - Monthly', quantity: 1, unitPrice: 29, total: 29 }
        ]
      },
      {
        id: 'inv-005',
        invoiceNumber: 'INV-2024-125',
        managerId: 'mgr-004',
        managerName: 'Lisa Wong',
        companyName: 'Mid Valley Dining',
        customerName: 'Lisa Wong',
        customerAddress: 'Mid Valley Dining',
        issueDate: '2024-12-20',
        dueDate: '2025-01-20',
        status: 'cancelled',
        amount: 99,
        tax: 5.94,
        total: 104.94,
        billingPeriod: 'Jan 2025',
        planType: 'Professional',
        items: [
          { description: 'Professional Plan - Trial Conversion', quantity: 1, unitPrice: 99, total: 99 }
        ]
      },
      {
        id: 'inv-006',
        invoiceNumber: 'INV-2025-006',
        managerId: 'mgr-006',
        managerName: 'Michael Chen',
        companyName: 'Gateway Mall Food Court',
        customerName: 'Michael Chen',
        customerAddress: 'Gateway Mall Food Court',
        issueDate: '2025-01-20',
        dueDate: '2025-02-20',
        status: 'payment_submitted',
        amount: 290,
        tax: 17.4,
        total: 307.4,
        billingPeriod: 'Feb 2025 - Jan 2026',
        planType: 'Basic',
        paymentMethod: 'Bank Transfer',
        transactionId: 'TXN-2025-001',
        receiptUrl: '/receipts/inv-006-receipt.pdf',
        hasPaymentInfo: true,
        items: [
          { description: 'Basic Plan - Annual', quantity: 1, unitPrice: 290, total: 290 }
        ]
      }
    ];
    
    setInvoices(sampleInvoices);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchInvoices();
    fetchInvoicesToPay();
    fetchManagers();
    fetchRestaurants();
    fetchCompanySettings();
    fetchCurrencyConfig();
    fetchInvoiceCategories();
  }, []);

  const fetchCurrencyConfig = async () => {
    try {
      const response = await fetch('/api/currencies/config');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.currencies) {
          setCurrencyConfig(data.currencies);
        }
      }
    } catch (error) {
      console.error('Error fetching currency config:', error);
    }
  };

  const fetchManagers = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch all manager types: Manager, Foodcourt_Manager, Brand_Manager
      const [managerRes, foodcourtRes, brandRes] = await Promise.all([
        fetch('/api/users?role=Manager', { headers }),
        fetch('/api/users?role=Foodcourt_Manager', { headers }),
        fetch('/api/users?role=Brand_Manager', { headers })
      ]);

      let allManagers: Manager[] = [];

      if (managerRes.ok) {
        const response = await managerRes.json();
        const users = response.success ? response.data : (Array.isArray(response) ? response : []);
        if (Array.isArray(users)) {
          const transformed = users.map((user: any) => ({
            id: user.id.toString(),
            fullName: user.full_name || user.username,
            email: user.email,
            role: user.role,
            companyName: user.company_name || 'Restaurant Manager'
          }));
          allManagers = [...allManagers, ...transformed];
        }
      }

      if (foodcourtRes.ok) {
        const response = await foodcourtRes.json();
        const users = response.success ? response.data : (Array.isArray(response) ? response : []);
        if (Array.isArray(users)) {
          const transformed = users.map((user: any) => ({
            id: user.id.toString(),
            fullName: user.full_name || user.username,
            email: user.email,
            role: user.role,
            companyName: user.company_name || 'Foodcourt Manager'
          }));
          allManagers = [...allManagers, ...transformed];
        }
      }

      if (brandRes.ok) {
        const response = await brandRes.json();
        const users = response.success ? response.data : (Array.isArray(response) ? response : []);
        if (Array.isArray(users)) {
          const transformed = users.map((user: any) => ({
            id: user.id.toString(),
            fullName: user.full_name || user.username,
            email: user.email,
            role: user.role,
            companyName: user.company_name || 'Brand Manager'
          }));
          allManagers = [...allManagers, ...transformed];
        }
      }

      setManagers(allManagers);
    } catch (error) {
      console.error('Error fetching managers:', error);
      setManagers([]);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/restaurants', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched restaurants:', data);
        // Transform API data to match interface
        const transformedRestaurants = data.map((restaurant: any) => ({
          id: restaurant.id.toString(),
          name: restaurant.name,
          manager_id: restaurant.manager_id?.toString() || restaurant.managerId?.toString() || '',
          status: restaurant.status,
          address: restaurant.address || ''
        }));
        setRestaurants(transformedRestaurants);
        console.log('Transformed restaurants:', transformedRestaurants);
      } else {
        console.error('Failed to fetch restaurants');
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    }
  };


  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearchDropdown(true);

    if (query.length < 2) {
      setSearchResults({managers: [], restaurants: []});
      return;
    }

    console.log('Searching with query:', query);
    console.log('Available restaurants:', restaurants);

    // Brand General/Foodcourt General only search restaurants (not managers)
    // They can only issue invoices to restaurants under their management
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log('Filtered restaurants:', filteredRestaurants);

    setSearchResults({
      managers: [], // Brand General doesn't search managers
      restaurants: filteredRestaurants.slice(0, 5)
    });
  };

  const handleEditSearch = (query: string) => {
    setEditSearchQuery(query);
    setShowEditSearchDropdown(true);

    if (query.length < 2) {
      setEditSearchResults({managers: [], restaurants: []});
      return;
    }

    // Brand General/Foodcourt General only search restaurants (not managers)
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

    setEditSearchResults({
      managers: [], // Brand General doesn't search managers
      restaurants: filteredRestaurants.slice(0, 5)
    });
  };

  const handleEditTargetSelect = (type: 'manager' | 'restaurant', data: Manager | Restaurant) => {
    setEditSelectedTarget({type, data});
    setEditSearchQuery(type === 'manager' ? (data as Manager).fullName : (data as Restaurant).name);
    setShowEditSearchDropdown(false);

    // Update editInvoice with new target data
    if (type === 'manager') {
      const manager = data as Manager;
      setEditInvoice({
        ...editInvoice,
        managerId: manager.id,
        managerName: manager.fullName,
        companyName: manager.companyName || '',
        restaurantId: '',
        restaurantName: ''
      });
    } else {
      const restaurant = data as Restaurant;
      const manager = managers.find(m => m.id === restaurant.manager_id);
      setEditInvoice({
        ...editInvoice,
        managerId: manager?.id || '',
        managerName: manager?.fullName || '',
        companyName: manager?.companyName || '',
        restaurantId: restaurant.id,
        restaurantName: restaurant.name
      });
    }
  };

  const selectTarget = (type: 'manager' | 'restaurant', data: Manager | Restaurant) => {
    setSelectedTarget({type, data});
    setShowSearchDropdown(false);
    setSearchQuery(type === 'manager' ? (data as Manager).fullName : (data as Restaurant).name);

    // Auto-populate invoice data
    if (type === 'manager') {
      const manager = data as Manager;
      setNewInvoice({
        ...newInvoice,
        managerId: manager.id,
        managerName: manager.fullName,
        companyName: manager.companyName || '',
        restaurantId: '',
        restaurantName: ''
      });
    } else {
      const restaurant = data as Restaurant;
      const manager = managers.find(m => m.id === restaurant.manager_id);
      // Get restaurant currency (convert RM to MYR)
      let currency = (restaurant as any).currency || 'MYR';
      if (currency === 'RM') currency = 'MYR';
      setNewInvoice({
        ...newInvoice,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        managerId: restaurant.manager_id,
        managerName: manager ? manager.fullName : '',
        companyName: restaurant.name,
        currency: currency
      });
    }
  };

  const fetchCompanySettings = async () => {
    try {
      // Brand General/Manager: 자신의 브랜드 회사정보를 사용
      const token = localStorage.getItem('auth_token');
      const brandResponse = await fetch('/api/brands/company-info', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (brandResponse.ok) {
        const brandData = await brandResponse.json();
        setCompanySettings({
          companyName: brandData.company_name || brandData.name || '',
          address: brandData.address || '',
          city: brandData.city || '',
          state: brandData.state || '',
          postalCode: brandData.postal_code || '',
          country: brandData.country || '',
          phone: brandData.phone || '',
          email: brandData.email || '',
          website: brandData.website || '',
          taxNumber: brandData.tax_no || '',
          registrationNumber: brandData.registration_no || '',
          companyLogo: brandData.logo_url || '',
          bankName: brandData.bank_name || '',
          bankAccount: brandData.bank_account || '',
          bankAccountName: brandData.bank_account_name || ''
        });
        return;
      }

      // Fallback: 시스템 관리자 설정 사용
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setCompanySettings(data);
      } else {
        console.warn('Company settings not found');
        setCompanySettings({
          companyName: '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
          phone: '',
          email: '',
          website: '',
          taxNumber: '',
          registrationNumber: '',
          companyLogo: ''
        });
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);
      setCompanySettings({
        companyName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        phone: '',
        email: '',
        website: '',
        taxNumber: '',
        registrationNumber: '',
        companyLogo: ''
      });
    }
  };

  // Generate invoice HTML content (shared for PDF, Print, Email)
  const generateInvoiceHTML = (invoice: Invoice) => {
    // For received invoices (to_pay tab), use issuer's company info
    const isReceivedInvoice = activeTab === 'to_pay' && invoice.issuerInfo;
    const displayCompany = isReceivedInvoice ? {
      companyName: invoice.issuerInfo?.name,
      companyLogo: invoice.issuerInfo?.logoUrl,
      address: invoice.issuerInfo?.address,
      city: invoice.issuerInfo?.city,
      state: invoice.issuerInfo?.state,
      postalCode: invoice.issuerInfo?.postalCode,
      country: invoice.issuerInfo?.country,
      phone: invoice.issuerInfo?.phone,
      email: invoice.issuerInfo?.email,
      bankName: invoice.issuerInfo?.bankName,
      bankAccount: invoice.issuerInfo?.bankAccount,
      bankAccountName: invoice.issuerInfo?.bankAccountName,
      swiftCode: invoice.issuerInfo?.swiftCode,
      taxNumber: invoice.issuerInfo?.taxId,
      registrationNumber: invoice.issuerInfo?.businessRegistration
    } : companySettings;

    if (!displayCompany) return '';

    const getStatusClass = (status: string) => {
      switch (status) {
        case 'paid': return 'status-paid';
        case 'pending_payment': return 'status-pending';
        case 'payment_submitted': return 'status-submitted';
        case 'overdue': return 'status-overdue';
        case 'cancelled': return 'status-cancelled';
        case 'draft': return 'status-draft';
        default: return 'status-pending';
      }
    };

    const getStatusText = (status: string) => {
      switch (status) {
        case 'paid': return 'PAID';
        case 'pending_payment': return 'PENDING PAYMENT';
        case 'payment_submitted': return 'PAYMENT SUBMITTED';
        case 'overdue': return 'OVERDUE';
        case 'cancelled': return 'CANCELLED';
        case 'draft': return 'DRAFT';
        default: return 'PENDING';
      }
    };

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Invoice ${invoice.invoiceNumber}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #333; background: #fff; }
        .invoice-container { max-width: 800px; margin: 0 auto; padding: 40px; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #E5E7EB; }
        .logo-section { flex: 1; }
        .company-logo { max-height: 60px; margin-bottom: 10px; }
        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }
        .company-details { font-size: 13px; color: #6B7280; line-height: 1.6; }
        .invoice-title { text-align: right; }
        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }
        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }
        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-paid { background: #ECFDF5; color: #059669; }
        .status-pending { background: #FEF3C7; color: #D97706; }
        .status-submitted { background: #DBEAFE; color: #1E40AF; }
        .status-overdue { background: #FEE2E2; color: #DC2626; }
        .status-cancelled { background: #FEF2F2; color: #DC2626; }
        .status-draft { background: #F3F4F6; color: #6B7280; }

        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }
        .bill-to-section { flex: 1; }
        .section-label { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }
        .customer-details { font-size: 13px; color: #6B7280; margin-top: 4px; }

        .dates-section { text-align: right; }
        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }
        .date-label { color: #6B7280; }
        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }

        .items-section { margin-bottom: 24px; }
        .items-table { width: 100%; border-collapse: collapse; }
        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #6B7280; text-transform: uppercase; border-bottom: 2px solid #E5E7EB; }
        .items-table th.text-center { text-align: center; }
        .items-table th.text-right { text-align: right; }
        .items-table td { padding: 12px 8px; font-size: 14px; color: #374151; border-bottom: 1px solid #F3F4F6; }
        .items-table td.text-center { text-align: center; }
        .items-table td.text-right { text-align: right; }

        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }
        .summary-box { width: 280px; }
        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; }
        .summary-row.subtotal { color: #6B7280; }
        .summary-row.tax { color: #6B7280; }
        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }

        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }
        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }

        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }

        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }
        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }

        @media print {
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            .invoice-container { padding: 20px; }
            .no-print { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo-section">
                ${displayCompany.companyLogo ? `<img src="${displayCompany.companyLogo}" alt="Company Logo" class="company-logo">` : ''}
                <div class="company-name" style="${displayCompany.companyLogo ? 'font-size: 14px;' : ''}">${displayCompany.companyName || 'Company Name'}</div>
                <div class="company-details">
                    ${displayCompany.address ? `${displayCompany.address}<br>` : ''}
                    ${[displayCompany.city, displayCompany.state, displayCompany.postalCode].filter(Boolean).join(', ')}${displayCompany.city || displayCompany.state || displayCompany.postalCode ? '<br>' : ''}
                    ${displayCompany.country ? `${displayCompany.country}<br>` : ''}
                    ${displayCompany.phone ? `Tel: ${displayCompany.phone}<br>` : ''}
                    ${displayCompany.email ? `Email: ${displayCompany.email}` : ''}
                </div>
            </div>
            <div class="invoice-title">
                <div class="invoice-label">INVOICE</div>
                <div class="invoice-number">${invoice.invoiceNumber}</div>
                <span class="invoice-status ${getStatusClass(invoice.status)}">${getStatusText(invoice.status)}</span>
            </div>
        </div>

        <div class="billing-info">
            <div class="bill-to-section">
                <div class="section-label">Bill To</div>
                ${isReceivedInvoice ? `
                <div class="customer-name">${companySettings?.companyName || 'Your Company'}</div>
                ${companySettings?.address ? `<div class="customer-details">${companySettings.address}</div>` : ''}
                ${[companySettings?.city, companySettings?.state, companySettings?.postalCode].filter(Boolean).length > 0 ? `<div class="customer-details">${[companySettings?.city, companySettings?.state, companySettings?.postalCode].filter(Boolean).join(', ')}</div>` : ''}
                ${companySettings?.country ? `<div class="customer-details">${companySettings.country}</div>` : ''}
                ${companySettings?.email ? `<div class="customer-details">${companySettings.email}</div>` : ''}
                ` : `
                <div class="customer-name">${invoice.customerName || invoice.managerName || 'Customer'}</div>
                ${invoice.customerAddress ? `<div class="customer-details">${invoice.customerAddress}</div>` : ''}
                ${invoice.payerType === 'restaurant' && invoice.restaurantName && invoice.restaurantName !== 'Unknown' ? `<div class="customer-details">Restaurant: ${invoice.restaurantName}</div>` : ''}
                `}
            </div>
            <div class="dates-section">
                <div class="date-row">
                    <span class="date-label">Billing Period:</span>
                    <span class="date-value">${invoice.billingPeriod || '-'}</span>
                </div>
                <div class="date-row">
                    <span class="date-label">Issue Date:</span>
                    <span class="date-value">${formatDate(invoice.issueDate)}</span>
                </div>
                <div class="date-row">
                    <span class="date-label">Due Date:</span>
                    <span class="date-value">${formatDate(invoice.dueDate)}</span>
                </div>
                ${invoice.paidDate ? `
                <div class="date-row">
                    <span class="date-label">Paid Date:</span>
                    <span class="date-value">${formatDate(invoice.paidDate)}</span>
                </div>
                ` : ''}
            </div>
        </div>

        <div class="items-section">
            <div class="section-label">Items</div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th class="text-center">Qty</th>
                        <th class="text-right">Unit Price</th>
                        <th class="text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td class="text-center">${item.quantity}</td>
                        <td class="text-right">${formatCurrency(item.unitPrice, invoice.currency || 'MYR')}</td>
                        <td class="text-right">${formatCurrency(item.total, invoice.currency || 'MYR')}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <div class="summary-section">
            <div class="summary-box">
                <div class="summary-row subtotal">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(invoice.amount, invoice.currency || 'MYR')}</span>
                </div>
                <div class="summary-row tax">
                    <span>Tax (6%):</span>
                    <span>${formatCurrency(invoice.tax, invoice.currency || 'MYR')}</span>
                </div>
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${formatCurrency(invoice.total, invoice.currency || 'MYR')}</span>
                </div>
            </div>
        </div>

        ${displayCompany.bankName ? `
        <div class="bank-section">
            <div class="bank-title">Payment Details</div>
            <div class="bank-details">
                <strong>Bank:</strong> ${displayCompany.bankName}<br>
                <strong>Account Name:</strong> ${displayCompany.bankAccountName || '-'}<br>
                <strong>Account Number:</strong> ${displayCompany.bankAccount || '-'}
                ${displayCompany.swiftCode ? `<br><strong>SWIFT Code:</strong> ${displayCompany.swiftCode}` : ''}
            </div>
        </div>
        ` : ''}

        ${(displayCompany.taxNumber || displayCompany.registrationNumber) ? `
        <div class="registration-info">
            ${displayCompany.registrationNumber ? `Reg No: ${displayCompany.registrationNumber}` : ''}
            ${displayCompany.registrationNumber && displayCompany.taxNumber ? ' | ' : ''}
            ${displayCompany.taxNumber ? `Tax No: ${displayCompany.taxNumber}` : ''}
        </div>
        ` : ''}

        <div class="footer">
            <div class="footer-text">Thank you for your business!</div>
            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>
        </div>
    </div>
</body>
</html>`;
  };

  // Download invoice as PDF file
  const generateInvoicePDF = async (invoice: Invoice) => {
    // For received invoices, use issuerInfo; for issued invoices, use companySettings
    const hasCompanyInfo = (activeTab === 'to_pay' && invoice.issuerInfo) || companySettings;
    if (!hasCompanyInfo) {
      setSuccessMessage('Company settings not loaded. Please try again.');
      setShowSuccessModal(true);
      return;
    }

    try {
      const invoiceHTML = generateInvoiceHTML(invoice);

      // Create iframe for PDF generation (prevents layout shifts)
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-10000px';
      iframe.style.top = '-10000px';
      iframe.style.width = '800px';
      iframe.style.height = '1200px';
      iframe.style.visibility = 'hidden';
      iframe.style.pointerEvents = 'none';
      document.body.appendChild(iframe);

      // Write HTML to iframe
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        document.body.removeChild(iframe);
        throw new Error('Could not access iframe document');
      }
      iframeDoc.open();
      iframeDoc.write(invoiceHTML);
      iframeDoc.close();

      // Wait for content to render
      await new Promise(resolve => setTimeout(resolve, 150));

      // Convert iframe body to canvas
      const canvas = await html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
        windowHeight: 1200
      });

      // Remove the iframe
      document.body.removeChild(iframe);

      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice-${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSuccessMessage('Failed to generate PDF. Please try again.');
      setShowSuccessModal(true);
    }
  };

  // Print invoice directly
  const handlePrintInvoice = (invoice: Invoice) => {
    // For received invoices, use issuerInfo; for issued invoices, use companySettings
    const hasCompanyInfo = (activeTab === 'to_pay' && invoice.issuerInfo) || companySettings;
    if (!hasCompanyInfo) {
      setSuccessMessage('Company settings not loaded. Please try again.');
      setShowSuccessModal(true);
      return;
    }

    const invoiceHTML = generateInvoiceHTML(invoice);
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  // Open email modal with default recipient based on payer type
  const handleOpenEmailModal = async (invoice: Invoice) => {
    setEmailInvoice(invoice);

    // Get default email based on payer type
    let defaultEmail = '';

    if (invoice.payerType === 'restaurant' && invoice.restaurantId) {
      // Find restaurant email
      const restaurant = restaurants.find(r => r.id === invoice.restaurantId);
      if (restaurant?.email) {
        defaultEmail = restaurant.email;
      }
    } else if (invoice.payerType === 'foodcourt_manager' || invoice.payerType === 'brand_manager') {
      // Find manager email
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager?.email) {
        defaultEmail = manager.email;
      }
    }

    // If no specific email found, try to get from the invoice customer
    if (!defaultEmail && invoice.managerId) {
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager?.email) {
        defaultEmail = manager.email;
      }
    }

    setEmailRecipient(defaultEmail);
    setShowEmailModal(true);
  };

  // Send invoice via email
  const handleSendInvoiceEmail = async () => {
    if (!emailInvoice || !emailRecipient) {
      setSuccessMessage('Please enter a valid email address.');
      setShowSuccessModal(true);
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${emailInvoice.id}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientEmail: emailRecipient
        })
      });

      if (response.ok) {
        setSuccessMessage(`Invoice sent successfully to ${emailRecipient}`);
        setShowEmailModal(false);
        setEmailInvoice(null);
        setEmailRecipient('');
      } else {
        const data = await response.json();
        setSuccessMessage(data.error || 'Failed to send invoice email.');
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending invoice email:', error);
      setSuccessMessage('Failed to send invoice email. Please try again.');
      setShowSuccessModal(true);
    }
  };

  const resetInvoiceForm = () => {
    setNewInvoice({
      managerId: '',
      managerName: '',
      companyName: '',
      restaurantId: '',
      restaurantName: '',
      amount: '',
      tax: '0',
      total: '0',
      description: '',
      dueDate: '',
      planType: 'professional',
      billingCycle: 'monthly',
      invoiceCategory: 'service',
      customDescription: '',
      serviceDescription: '',
      currency: 'MYR'
    });
    setSelectedTarget(null);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  // Helper functions - must be defined before filteredInvoices
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY');
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'draft': return 'Draft';
      case 'pending_payment': return 'Pending';
      case 'payment_submitted': return 'Payment Submitted';
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      case 'cancelled': return 'Cancelled';
      case '': case null: case undefined: return 'Pending';
      default: return status;
    }
  };

  const getPayerDisplay = (payerType: string) => {
    switch(payerType) {
      case 'restaurant': return 'Restaurant Admin';
      case 'foodcourt_manager': return 'Foodcourt General';
      case 'brand_manager': return 'Brand General';
      default: return 'Restaurant Admin';
    }
  };

  const getTypeDisplay = (type: string) => {
    switch(type) {
      case 'automatic': return 'Automatic';
      case 'manual': return 'Manual';
      default: return type || 'Manual';
    }
  };

  // Universal search filter with date range
  const filteredInvoices = invoices.filter(invoice => {
    // Universal search - search across all visible fields
    const term = searchTerm.toLowerCase();
    const statusText = getStatusDisplay(invoice.status).toLowerCase();
    const typeText = getTypeDisplay(invoice.type || '').toLowerCase();
    const payerText = getPayerDisplay(invoice.payerType || '').toLowerCase();

    const matchesSearch = !searchTerm ||
      invoice.companyName.toLowerCase().includes(term) ||
      invoice.invoiceNumber.toLowerCase().includes(term) ||
      invoice.managerName.toLowerCase().includes(term) ||
      (invoice.restaurantName || '').toLowerCase().includes(term) ||
      statusText.includes(term) ||
      typeText.includes(term) ||
      payerText.includes(term) ||
      (invoice.categoryDisplayName || '').toLowerCase().includes(term) ||
      (invoice.planType || '').toLowerCase().includes(term);

    // Date range filter
    let matchesDateRange = true;
    if (dateRange.start && dateRange.end) {
      const invoiceDate = new Date(invoice.issueDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      matchesDateRange = invoiceDate >= startDate && invoiceDate <= endDate;
    }

    return matchesSearch && matchesDateRange;
  }).sort((a, b) => {
    // Sort by due date descending (newest first)
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateB - dateA;
  });

  // Stats - Combined totals (issued + to_pay)
  const allInvoices = [...invoices, ...invoicesToPay];
  const totalIssuedCount = invoices.length;
  const totalToPayCount = invoicesToPay.length;
  const overdueInvoices = allInvoices.filter(i => i.status === 'overdue').length;
  const pendingInvoices = allInvoices.filter(i => i.status === 'pending_payment' || i.status === 'payment_submitted').length;
  const totalOutstanding = allInvoices.filter(i => i.status !== 'paid' && i.status !== 'cancelled' && i.status !== 'draft').reduce((sum, i) => sum + i.total, 0);

  // Filtered invoices to pay with search and date range
  const filteredInvoicesToPay = invoicesToPay.filter(invoice => {
    // Universal search
    const term = toPaySearchTerm.toLowerCase();
    const statusText = getStatusDisplay(invoice.status).toLowerCase();

    const matchesSearch = !toPaySearchTerm ||
      invoice.invoiceNumber.toLowerCase().includes(term) ||
      (invoice.issuerName || '').toLowerCase().includes(term) ||
      (invoice.restaurantName || '').toLowerCase().includes(term) ||
      statusText.includes(term) ||
      (invoice.categoryDisplayName || '').toLowerCase().includes(term) ||
      (invoice.planType || '').toLowerCase().includes(term);

    // Date range filter
    let matchesDateRange = true;
    if (toPayDateRange.start && toPayDateRange.end) {
      const invoiceDate = new Date(invoice.issueDate);
      const startDate = new Date(toPayDateRange.start);
      const endDate = new Date(toPayDateRange.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      matchesDateRange = invoiceDate >= startDate && invoiceDate <= endDate;
    }

    return matchesSearch && matchesDateRange;
  }).sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    return dateB - dateA;
  });

  const handleExportInvoices = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalInvoices: invoices.length,
      summary: {
        totalAmount: invoices.reduce((sum, inv) => sum + inv.total, 0),
        paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
        overdueInvoices: invoices.filter(inv => inv.status === 'overdue').length,
        draftInvoices: invoices.filter(inv => inv.status === 'draft').length,
        paidAmount: invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
        outstandingAmount: invoices.filter(inv => inv.status !== 'paid' && inv.status !== 'cancelled').reduce((sum, inv) => sum + inv.total, 0)
      },
      statusBreakdown: {
        draft: invoices.filter(inv => inv.status === 'draft').length,
        pending_payment: invoices.filter(inv => inv.status === 'pending_payment').length,
        paid: invoices.filter(inv => inv.status === 'paid').length,
        overdue: invoices.filter(inv => inv.status === 'overdue').length,
        cancelled: invoices.filter(inv => inv.status === 'cancelled').length
      },
      invoices: invoices.map(invoice => ({
        invoiceNumber: invoice.invoiceNumber,
        managerName: invoice.managerName,
        companyName: invoice.companyName,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        paidDate: invoice.paidDate || 'N/A',
        status: invoice.status,
        amount: invoice.amount,
        tax: invoice.tax,
        total: invoice.total,
        billingPeriod: invoice.billingPeriod,
        planType: invoice.planType
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoices-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCreateInvoice = () => {
    resetInvoiceForm();
    setShowCreateInvoiceModal(true);
  };

  const handleGenerateSubscriptionInvoices = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/invoices/generate-for-subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        await fetchInvoices(); // Refresh the invoice list
        setSuccessMessage(`Successfully generated ${result.generated} subscription invoices!`);
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to generate subscription invoices: ${errorData.error || 'Unknown error'}`);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error generating subscription invoices:', error);
      setSuccessMessage('Error generating subscription invoices. Please try again.');
      setShowSuccessModal(true);
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);

    // Format date to yyyy-MM-dd for input type="date"
    const formatDateForInput = (dateStr: string | undefined) => {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    };

    // Set up editInvoice with all Create Invoice fields
    setEditInvoice({
      managerId: invoice.managerId,
      managerName: invoice.managerName,
      companyName: invoice.companyName || '',
      restaurantId: invoice.restaurantId || '',
      restaurantName: invoice.restaurantName || '',
      amount: invoice.amount.toString(),
      tax: invoice.tax.toString(),
      total: invoice.total.toString(),
      dueDate: formatDateForInput(invoice.dueDate),
      status: invoice.status,
      planType: invoice.planType,
      billingCycle: 'monthly', // Default, can be derived from planType
      description: invoice.items?.[0]?.description || '',
      payerType: invoice.payerType || 'restaurant',
      payerId: invoice.payerId || '',
      invoiceCategory: invoice.invoiceCategory || 'service',
      customDescription: invoice.customDescription || '',
      serviceDescription: invoice.serviceDescription || '',
      currency: invoice.currency || 'MYR',
      items: invoice.items
    });

    // Set up edit target selection
    if (invoice.restaurantId) {
      const restaurant = restaurants.find(r => r.id === invoice.restaurantId);
      if (restaurant) {
        setEditSelectedTarget({type: 'restaurant', data: restaurant});
        setEditSearchQuery(restaurant.name);
      }
    } else if (invoice.managerId) {
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager) {
        setEditSelectedTarget({type: 'manager', data: manager});
        setEditSearchQuery(manager.fullName);
      }
    }

    setShowEditModal(true);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowSendConfirmModal(true);
  };

  const confirmSendInvoice = async () => {
    if (!selectedInvoice) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'pending_payment'
        })
      });

      if (response.ok) {
        // Refresh invoices list
        await fetchInvoices();
        setShowSendConfirmModal(false);
        setSelectedInvoice(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to send invoice: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      alert('Error sending invoice. Please try again.');
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedInvoice || !editInvoice) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: parseFloat(editInvoice.amount),
          tax: parseFloat(editInvoice.tax),
          total: parseFloat(editInvoice.total),
          dueDate: editInvoice.dueDate,
          status: editInvoice.status,
          payerType: editInvoice.payerType,
          payerId: editInvoice.payerId,
          items: editInvoice.items
        }),
      });

      if (response.ok) {
        const updatedInvoice = {
          ...selectedInvoice,
          amount: parseFloat(editInvoice.amount),
          tax: parseFloat(editInvoice.tax),
          total: parseFloat(editInvoice.total),
          dueDate: editInvoice.dueDate,
          status: editInvoice.status,
          payerType: editInvoice.payerType,
          payerId: editInvoice.payerId,
          items: editInvoice.items
        };

        setInvoices(invoices.map(inv =>
          inv.id === selectedInvoice.id ? updatedInvoice : inv
        ));

        setShowEditModal(false);
        setSelectedInvoice(null);
        setEditInvoice(null);
        setSuccessMessage('Invoice updated successfully!');
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to update invoice: ${errorData.error || 'Unknown error'}`);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
      setSuccessMessage('Error updating invoice. Please try again.');
      setShowSuccessModal(true);
    }
  };

  const handleSubmitInvoice = async () => {
    if (!selectedTarget || !newInvoice.amount || !newInvoice.dueDate) {
      alert('Please select a manager/restaurant, enter amount, and set due date.');
      return;
    }

    try {
      const amount = parseFloat(newInvoice.amount);
      const tax = parseFloat(newInvoice.tax);
      const total = parseFloat(newInvoice.total);

      // Prepare data for API
      const billingPeriodStart = new Date();
      billingPeriodStart.setDate(1); // First day of current month

      const billingPeriodEnd = new Date();
      billingPeriodEnd.setMonth(billingPeriodEnd.getMonth() + 1);
      billingPeriodEnd.setDate(0); // Last day of current month

      let description = '';
      if (newInvoice.invoiceCategory === 'others') {
        description = newInvoice.customDescription || '';
      } else {
        description = newInvoice.serviceDescription || '';
      }

      // Prepare customer information based on target type
      let customerName = '';
      let customerAddress = '';
      let companyName = '';
      let restaurantName = '';

      if (selectedTarget.type === 'restaurant') {
        const restaurant = selectedTarget.data as Restaurant;
        customerName = restaurant.name;
        restaurantName = restaurant.name;
        companyName = restaurant.name;

        // Build full address from restaurant data
        const addressParts = [];
        if (restaurant.address) addressParts.push(restaurant.address);
        if (restaurant.phone) addressParts.push(`Phone: ${restaurant.phone}`);
        if (restaurant.email) addressParts.push(`Email: ${restaurant.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget.type === 'manager') {
        const manager = selectedTarget.data as Manager;
        customerName = manager.fullName;
        companyName = manager.companyName || manager.fullName;

        // Build address from manager data
        const addressParts = [];
        if (manager.companyName) addressParts.push(manager.companyName);
        if (manager.email) addressParts.push(`Email: ${manager.email}`);
        customerAddress = addressParts.join('\n');
      }

      // Determine payer_type and payer_id based on selected target
      let payerType = 'restaurant';
      let payerId: number | null = null;

      if (selectedTarget.type === 'restaurant') {
        const restaurant = selectedTarget.data as Restaurant;
        payerType = 'restaurant';
        payerId = parseInt(restaurant.id);
      }

      const invoiceData = {
        restaurant_id: selectedTarget.type === 'restaurant' ? (selectedTarget.data as Restaurant).id : null,
        customer_name: customerName,
        customer_address: customerAddress,
        company_name: companyName,
        restaurant_name: restaurantName,
        type: 'manual',
        billing_period_start: billingPeriodStart.toISOString(),
        billing_period_end: billingPeriodEnd.toISOString(),
        due_date: new Date(newInvoice.dueDate).toISOString(),
        total_amount: total,
        currency: newInvoice.currency || 'MYR',
        status: 'draft',
        notes: description,
        issued_by: user?.id || 1,
        issued_at: new Date().toISOString(),
        // Issuer info - Brand General issuing invoice
        issuer_type: 'brand',
        issuer_id: user?.brand_id || null,
        // Payer info - who needs to pay
        payer_type: payerType,
        payer_id: payerId,
        // Invoice category
        invoice_category: newInvoice.invoiceCategory || 'service',
        custom_description: newInvoice.invoiceCategory === 'others' ? newInvoice.customDescription : null,
        service_description: newInvoice.invoiceCategory !== 'others' ? newInvoice.serviceDescription : null
      };

      const items = [{
        item_type: newInvoice.invoiceCategory,
        description: description,
        calculation_method: 'fixed',
        fixed_amount: amount,
        calculated_amount: amount,
        tax_rate: 6,
        tax_amount: tax,
        total_amount: total
      }];

      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          invoice_data: invoiceData,
          items: items
        })
      });

      if (response.ok) {
        // Refresh invoices list
        await fetchInvoices();
        setShowCreateInvoiceModal(false);
        resetInvoiceForm();
      } else {
        const errorData = await response.json();
        alert(`Failed to create invoice: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice. Please try again.');
    }
  };

  const handleConfirmPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentConfirmModal(true);
  };

  const handleMarkAsPaid = async () => {
    if (!selectedInvoice) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'paid',
          paid_at: new Date().toISOString()
        })
      });

      if (response.ok) {
        // Refresh invoices list
        await fetchInvoices();
        setShowPaymentConfirmModal(false);
        setSelectedInvoice(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to update payment status: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Error updating payment status. Please try again.');
    }
  };

  const handleResendInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowResendConfirmModal(true);
  };

  const confirmResendInvoice = () => {
    if (!selectedInvoice) return;

    setShowResendConfirmModal(false);
    setSelectedInvoice(null);
  };


  const handleDeleteInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowDeleteConfirmModal(true);
  };

  const confirmCancelInvoice = async () => {
    if (!selectedInvoice) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: 'cancelled'
        })
      });

      if (response.ok) {
        // Refresh invoices list
        await fetchInvoices();
        setShowCancelConfirmModal(false);
        setSelectedInvoice(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to cancel invoice: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error cancelling invoice:', error);
      alert('Error cancelling invoice. Please try again.');
    }
  };

  const confirmDeleteInvoice = async () => {
    if (!selectedInvoice) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Refresh invoices list
        await fetchInvoices();
        setShowDeleteConfirmModal(false);
        setSelectedInvoice(null);
      } else {
        const errorData = await response.json();
        alert(`Failed to delete invoice: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Error deleting invoice. Please try again.');
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Invoices</Title>
          <ActionSection>
          </ActionSection>
        </Header>
        <Content>

        {/* Stats - Combined totals shown on all tabs */}
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalIssuedCount}</StatValue>
            <StatLabel>Issued</StatLabel>
            <StatDescription>Invoices you sent</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{totalToPayCount}</StatValue>
            <StatLabel>To Pay</StatLabel>
            <StatDescription>Invoices received</StatDescription>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{pendingInvoices}</StatValue>
            <StatLabel>Pending</StatLabel>
            <StatDescription>Awaiting payment</StatDescription>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{overdueInvoices}</StatValue>
            <StatLabel>Overdue</StatLabel>
            <StatDescription>Requires attention</StatDescription>
          </StatCard>
        </StatsGrid>

        <Tabs>
          <CommonTab active={activeTab === 'issued'} onClick={() => handleTabChange('issued')}>
            Issued Invoices<TabBadge count={invoices.length} />
          </CommonTab>
          <CommonTab active={activeTab === 'to_pay'} onClick={() => handleTabChange('to_pay')}>
            Invoices to Pay<TabBadge count={invoicesToPay.filter(i => i.status === 'pending_payment' || i.status === 'overdue').length} variant="warning" />
          </CommonTab>
          <CommonTab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>
            Categories<TabBadge count={invoiceCategories.length} />
          </CommonTab>
        </Tabs>

        {activeTab === 'issued' && (
          <>
        <FilterBarWrapper>
          <FiltersLeft>
            <SearchInput
              placeholder="Search invoice, status, company, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <PeriodFilterGroup>
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
              <DateInput
                type="date"
                value={dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
              />
            </PeriodFilterGroup>
          </FiltersLeft>
          <FiltersRight>
            <Button variant="primary" onClick={handleCreateInvoice}>Create Invoice</Button>
          </FiltersRight>
        </FilterBarWrapper>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>Invoice</DataTableHeaderCell>
                <DataTableHeaderCell>Customer</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Period</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Issued</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Due</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Status</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Amount</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Total</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Actions</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <DataTableRow key={invoice.id}>
                  <DataTableCell data-label="Invoice">
                    <InvoiceInfo>
                      <InvoiceNumber>
                        {invoice.invoiceNumber}
                        {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>AUTO</AutoBadge>}
                      </InvoiceNumber>
                      <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                    </InvoiceInfo>
                  </DataTableCell>
                  <DataTableCell data-label="Customer">
                    <InvoiceInfo>
                      <InvoiceNumber>{invoice.customerName || invoice.restaurantName || 'Unknown'}</InvoiceNumber>
                      <CompanyName>{getPayerDisplay(invoice.payerType || 'restaurant')}</CompanyName>
                    </InvoiceInfo>
                  </DataTableCell>
                  <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>{invoice.billingPeriod || '-'}</DataTableCell>
                  <DataTableCell data-label="Issued" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</DataTableCell>
                  <DataTableCell data-label="Due" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</DataTableCell>
                  <DataTableCell data-label="Status" align="center">
                    <StatusBadge status={invoice.status}>
                      {getStatusDisplay(invoice.status)}
                    </StatusBadge>
                  </DataTableCell>
                  <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="" mobileFullWidth>
                    <ActionButtons>
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>
                      {invoice.status === 'draft' && (
                        <>
                          {invoice.type !== 'automatic' && (
                            <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
                          )}
                          <LocalActionButton variant="success" onClick={() => handleSendInvoice(invoice)} title="Send Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="22" y1="2" x2="11" y2="13"/>
                              <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                            </svg>
                          </LocalActionButton>
                          <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice">
                            <IconSymbol>×</IconSymbol>
                          </LocalIconButton>
                        </>
                      )}
                      {(invoice.status === 'pending_payment' || invoice.status === '' || !invoice.status) && (
                        <>
                          {invoice.type !== 'automatic' && (
                            <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
                          )}
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7,10 12,15 17,10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6,9 6,2 18,2 18,9"/>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                              <rect x="6" y="14" width="12" height="8"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Send Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <polyline points="22,6 12,13 2,6"/>
                            </svg>
                          </LocalActionButton>
                          <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice">
                            <IconSymbol>×</IconSymbol>
                          </LocalIconButton>
                        </>
                      )}
                      {invoice.status === 'payment_submitted' && (
                        <>
                          {invoice.hasPaymentInfo && (
                            <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>Confirm</LocalActionButton>
                          )}
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7,10 12,15 17,10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6,9 6,2 18,2 18,9"/>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                              <rect x="6" y="14" width="12" height="8"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Resend Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <polyline points="22,6 12,13 2,6"/>
                            </svg>
                          </LocalActionButton>
                        </>
                      )}
                      {invoice.status === 'overdue' && (
                        <>
                          {invoice.type !== 'automatic' && (
                            <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
                          )}
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7,10 12,15 17,10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6,9 6,2 18,2 18,9"/>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                              <rect x="6" y="14" width="12" height="8"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Resend Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                              <polyline points="22,6 12,13 2,6"/>
                            </svg>
                          </LocalActionButton>
                          <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice">
                            <IconSymbol>×</IconSymbol>
                          </LocalIconButton>
                        </>
                      )}
                      {invoice.status === 'paid' && (
                        <>
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7,10 12,15 17,10"/>
                              <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                          </LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6,9 6,2 18,2 18,9"/>
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                              <rect x="6" y="14" width="12" height="8"/>
                            </svg>
                          </LocalActionButton>
                        </>
                      )}
                      {invoice.status === 'cancelled' && (
                        <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download Invoice">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7,10 12,15 17,10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                          </svg>
                        </LocalActionButton>
                      )}
                    </ActionButtons>
                  </DataTableCell>
                </DataTableRow>
              ))}

              {filteredInvoices.length === 0 && (
                <DataTableRow>
                  <DataTableCell colSpan={9}>
                    <DataTableEmpty>
                      <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No Invoices Found</div>
                      <div style={{ fontSize: '14px' }}>
                        {invoices.length === 0 ? 'Create your first invoice to get started' : 'Try adjusting your filters'}
                      </div>
                    </DataTableEmpty>
                  </DataTableCell>
                </DataTableRow>
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
          </>
        )}

        {activeTab === 'to_pay' && (
          <>
            <FilterBarWrapper>
              <FiltersLeft>
                <SearchInput
                  placeholder="Search invoice, status, issuer..."
                  value={toPaySearchTerm}
                  onChange={(e) => setToPaySearchTerm(e.target.value)}
                />

                <PeriodFilterGroup>
                  <DateButton
                    active={toPayActivePeriod === 'week' && !toPayIsCustomDateRange}
                    onClick={() => handleToPayPeriodChange('week')}
                  >
                    Week
                  </DateButton>
                  <DateButton
                    active={toPayActivePeriod === 'month' && !toPayIsCustomDateRange}
                    onClick={() => handleToPayPeriodChange('month')}
                  >
                    Month
                  </DateButton>
                  <DateButton
                    active={toPayActivePeriod === 'year' && !toPayIsCustomDateRange}
                    onClick={() => handleToPayPeriodChange('year')}
                  >
                    Year
                  </DateButton>
                  <DateButton
                    active={toPayActivePeriod === 'all' && !toPayIsCustomDateRange}
                    onClick={() => handleToPayPeriodChange('all')}
                  >
                    All
                  </DateButton>

                  <DateInput
                    type="date"
                    value={toPayDateRange.start}
                    onChange={(e) => handleToPayDateRangeChange('start', e.target.value)}
                  />
                  <DateInput
                    type="date"
                    value={toPayDateRange.end}
                    onChange={(e) => handleToPayDateRangeChange('end', e.target.value)}
                  />
                </PeriodFilterGroup>
              </FiltersLeft>
            </FilterBarWrapper>

            <DataTableContainer>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell>Invoice</DataTableHeaderCell>
                    <DataTableHeaderCell>Issuer</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Period</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Issued</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Due</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Status</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">Amount</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">Total</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Actions</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {filteredInvoicesToPay.length > 0 ? (
                    filteredInvoicesToPay.map(invoice => (
                      <DataTableRow key={invoice.id}>
                        <DataTableCell data-label="Invoice">
                          <InvoiceInfo>
                            <InvoiceNumber>
                              {invoice.invoiceNumber}
                              {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>AUTO</AutoBadge>}
                            </InvoiceNumber>
                            <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                          </InvoiceInfo>
                        </DataTableCell>
                        <DataTableCell data-label="Issuer">
                          <InvoiceInfo>
                            <InvoiceNumber>{invoice.issuerName || (invoice.issuerType === 'system_admin' ? 'System Admin' : invoice.issuerType === 'brand' ? 'Brand' : 'Foodcourt')}</InvoiceNumber>
                            <CompanyName>{invoice.restaurantName && invoice.restaurantName !== 'Unknown' ? `For: ${invoice.restaurantName}` : ''}</CompanyName>
                          </InvoiceInfo>
                        </DataTableCell>
                        <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>{invoice.billingPeriod || '-'}</DataTableCell>
                        <DataTableCell data-label="Issued" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</DataTableCell>
                        <DataTableCell data-label="Due" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</DataTableCell>
                        <DataTableCell data-label="Status" align="center">
                          <StatusBadge status={invoice.status}>
                            {getStatusDisplay(invoice.status)}
                          </StatusBadge>
                        </DataTableCell>
                        <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                        <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                        <DataTableCell data-label="" mobileFullWidth>
                          <ActionButtons>
                            <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>

                            {/* Pay button for pending/overdue invoices */}
                            {(invoice.status === 'pending_payment' || invoice.status === 'overdue') && (
                              <LocalActionButton variant="success" onClick={() => handlePayInvoice(invoice)}>Pay</LocalActionButton>
                            )}

                            {/* Download PDF */}
                            <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7,10 12,15 17,10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                              </svg>
                            </LocalActionButton>

                            {/* Print */}
                            <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6,9 6,2 18,2 18,9"/>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                                <rect x="6" y="14" width="12" height="8"/>
                              </svg>
                            </LocalActionButton>

                            {/* Email - for received invoices */}
                            <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Email Invoice">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                              </svg>
                            </LocalActionButton>
                          </ActionButtons>
                        </DataTableCell>
                      </DataTableRow>
                    ))
                  ) : (
                    <DataTableRow>
                      <DataTableCell colSpan={9}>
                        <DataTableEmpty>No invoices to pay</DataTableEmpty>
                      </DataTableCell>
                    </DataTableRow>
                  )}
                </tbody>
              </DataTable>
            </DataTableContainer>
          </>
        )}

        {activeTab === 'categories' && (
          <div style={{ padding: '24px 0' }}>
            <HeaderRow>
              <div>
                <SectionTitle>Invoice Categories</SectionTitle>
                <p style={{ color: '#6B7280', fontSize: '14px', margin: '8px 0 0 0' }}>
                  Manage invoice categories for organizing different types of charges.
                </p>
              </div>
              <Button variant="primary" onClick={() => {
                setEditingCategory(null);
                setCategoryFormData({ name: '', code: '', description: '' });
                setShowCategoryModal(true);
              }}>
                Add Category
              </Button>
            </HeaderRow>

            {invoiceCategories.length === 0 ? (
              <CategoryEmptyState>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0 0 8px 0' }}>No categories yet</h4>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>Create your first invoice category to organize charges.</p>
                <Button variant="primary" onClick={() => {
                  setEditingCategory(null);
                  setCategoryFormData({ name: '', code: '', description: '' });
                  setShowCategoryModal(true);
                }}>Add Category</Button>
              </CategoryEmptyState>
            ) : (
              <CategoryGrid>
                {invoiceCategories.map(category => (
                  <CategoryCard key={category.id} isActive={category.is_active}>
                    <CategoryIcon>
                      {category.name.charAt(0).toUpperCase()}
                    </CategoryIcon>
                    <CategoryInfo>
                      <CategoryName>
                        {category.name}
                        <CategoryStatusBadge active={category.is_active}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </CategoryStatusBadge>
                      </CategoryName>
                      <CategoryMeta>
                        <span>Code: <strong>{category.code}</strong></span>
                        {category.description && <span>{category.description}</span>}
                      </CategoryMeta>
                    </CategoryInfo>
                    <CategoryActions>
                      <CategoryIconButton onClick={() => {
                        setEditingCategory(category);
                        setCategoryFormData({
                          name: category.name,
                          code: category.code,
                          description: category.description || ''
                        });
                        setShowCategoryModal(true);
                      }} title="Edit Category">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </CategoryIconButton>
                      <CategoryIconButton onClick={() => {
                        setCategoryToDelete(category);
                        setDeleteCategoryModalOpen(true);
                      }} title="Delete Category">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3,6 5,6 21,6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </CategoryIconButton>
                    </CategoryActions>
                  </CategoryCard>
                ))}
              </CategoryGrid>
            )}
          </div>
        )}

        {/* Payment Submit Modal */}
        {showPaymentSubmitModal && selectedInvoice && (
          <Modal onClick={() => setShowPaymentSubmitModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
              <ModalHeader>
                <ModalTitle>Submit Payment</ModalTitle>
                <CloseButton onClick={() => setShowPaymentSubmitModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#F8FAFC', borderRadius: '8px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280' }}>Invoice: <strong>{selectedInvoice.invoiceNumber}</strong></p>
                  <p style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#0A2540' }}>
                    {formatCurrency(selectedInvoice.total, selectedInvoice.currency)}
                  </p>
                </div>

                {loadingPaymentMethods ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#6B7280' }}>Loading payment methods...</div>
                ) : availablePaymentMethods.length === 0 ? (
                  <div style={{ padding: '16px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '16px' }}>
                    <p style={{ margin: 0, color: '#92400E' }}>No payment methods configured for {selectedInvoice.currency}. Please contact the administrator.</p>
                  </div>
                ) : (
                  <>
                    <FormGroup>
                      <FormLabel>Payment Method *</FormLabel>
                      <FormSelect
                        value={paymentData.paymentMethod}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                      >
                        {availablePaymentMethods.map(method => (
                          <option key={method.id} value={method.id}>{method.name}</option>
                        ))}
                      </FormSelect>
                    </FormGroup>

                    {/* Show payment details based on selected method */}
                    {(() => {
                      const selectedMethod = availablePaymentMethods.find(m => m.id === paymentData.paymentMethod);
                      if (!selectedMethod) return null;

                      return (
                        <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', marginBottom: '16px' }}>
                          {selectedMethod.id === 'bank_transfer' && (
                            <>
                              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>Bank Transfer Details</h4>
                              <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                                <p style={{ margin: '0' }}><strong>Bank:</strong> {selectedMethod.bankName}</p>
                                <p style={{ margin: '0' }}><strong>Account Number:</strong> {selectedMethod.accountNumber}</p>
                                <p style={{ margin: '0' }}><strong>Account Name:</strong> {selectedMethod.accountName}</p>
                              </div>
                            </>
                          )}
                          {selectedMethod.id === 'qr_payment' && (
                            <>
                              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>QR Payment</h4>
                              {selectedMethod.qrImage && (
                                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                                  <img
                                    src={selectedMethod.qrImage}
                                    alt="Payment QR Code"
                                    style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                                  />
                                </div>
                              )}
                              {selectedMethod.qrDescription && (
                                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', textAlign: 'center' }}>{selectedMethod.qrDescription}</p>
                              )}
                            </>
                          )}
                          {selectedMethod.id === 'stripe' && (
                            <p style={{ margin: 0, fontSize: '14px', color: '#1E40AF' }}>Pay securely with your credit/debit card via Stripe.</p>
                          )}
                          {selectedMethod.id === 'paypal' && (
                            <p style={{ margin: 0, fontSize: '14px', color: '#1E40AF' }}>Pay with your PayPal account or card.</p>
                          )}
                        </div>
                      );
                    })()}
                  </>
                )}

                {/* Required field notice */}
                <div style={{
                  padding: '12px 16px',
                  background: '#FEF3C7',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '13px',
                  color: '#92400E',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}>
                  <span style={{ fontWeight: '600', flexShrink: 0 }}>*</span>
                  <span>Please provide either a <strong>Transaction ID / Reference Number</strong> or upload a <strong>Payment Receipt Image</strong> to submit your payment.</span>
                </div>

                <FormGroup>
                  <FormLabel>Transaction ID / Reference Number</FormLabel>
                  <FormInput
                    type="text"
                    placeholder="Enter transaction ID or reference number"
                    value={paymentData.transactionId}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))}
                  />
                </FormGroup>

                {/* Receipt Image Upload for bank_transfer and qr_payment */}
                {(() => {
                  const selectedMethod = availablePaymentMethods.find(m => m.id === paymentData.paymentMethod);
                  if (selectedMethod && (selectedMethod.id === 'bank_transfer' || selectedMethod.id === 'qr_payment')) {
                    return (
                      <FormGroup>
                        <FormLabel>Payment Receipt Image</FormLabel>
                        <div style={{
                          border: '2px dashed #E6EBF1',
                          borderRadius: '8px',
                          padding: '20px',
                          textAlign: 'center',
                          background: paymentData.receiptImage ? '#F0FDF4' : '#FAFBFC',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}>
                          {paymentData.receiptImage ? (
                            <div>
                              <img
                                src={paymentData.receiptImage}
                                alt="Payment Receipt"
                                style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '12px' }}
                              />
                              <div>
                                <button
                                  type="button"
                                  onClick={() => setPaymentData(prev => ({ ...prev, receiptImage: '' }))}
                                  style={{
                                    background: '#DC2626',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px'
                                  }}
                                >
                                  Remove Image
                                </button>
                              </div>
                            </div>
                          ) : (
                            <label style={{ cursor: 'pointer', display: 'block' }}>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleReceiptImageUpload}
                                style={{ display: 'none' }}
                              />
                              <div style={{ color: '#6B7280', fontSize: '14px' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
                                <div>Click to upload payment receipt</div>
                                <div style={{ fontSize: '12px', marginTop: '4px' }}>Supports JPG, PNG (max 5MB)</div>
                              </div>
                            </label>
                          )}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '8px' }}>
                          Upload a screenshot or photo of your payment confirmation
                        </div>
                      </FormGroup>
                    );
                  }
                  return null;
                })()}

                <FormGroup>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormTextarea
                    placeholder="Any additional information about the payment..."
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <Button variant="secondary" onClick={() => { setShowPaymentSubmitModal(false); setPaymentSubmitError(null); }}>Cancel</Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitPayment}
                    disabled={!paymentData.paymentMethod || loadingPaymentMethods || isSubmittingPayment || (!paymentData.transactionId && !paymentData.receiptImage)}
                  >
                    {isSubmittingPayment ? 'Submitting...' : 'Submit Payment'}
                  </Button>
                </div>
                {paymentSubmitError && (
                  <StatusMessage type="error" style={{ marginTop: '12px', wordBreak: 'break-word' }}>
                    {paymentSubmitError}
                  </StatusMessage>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Legacy Category Modal - kept for compatibility */}
        {showCategoryModal && (
          <Modal onClick={handleCloseCategoryModal}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
              <ModalHeader>
                <ModalTitle>{editingCategory ? 'Edit Category' : 'Add Category'}</ModalTitle>
                <CloseButton onClick={handleCloseCategoryModal}>×</CloseButton>
              </ModalHeader>
              <form onSubmit={handleCategorySubmit}>
                <ModalBody>
                  <FormGroup>
                    <FormLabel>Name *</FormLabel>
                    <FormInput
                      value={categoryFormData.name}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                      placeholder="e.g., Hardware"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Code *</FormLabel>
                    <FormInput
                      value={categoryFormData.code}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, code: e.target.value })}
                      placeholder="e.g., hardware"
                      required
                      disabled={editingCategory?.is_system}
                    />
                    <small style={{ color: '#6B7280', fontSize: '12px' }}>
                      Unique identifier used in the system. Use lowercase letters and underscores.
                    </small>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormTextarea
                      value={categoryFormData.description}
                      onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                      placeholder="Brief description of this category"
                      rows={3}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button variant="secondary" type="button" onClick={handleCloseCategoryModal}>Cancel</Button>
                  <Button variant="primary" type="submit" disabled={savingCategory || !categoryFormData.name || !categoryFormData.code}>
                    {savingCategory ? 'Saving...' : (editingCategory ? 'Update' : 'Create')}
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        )}

        {/* Delete Category Confirmation Modal */}
        <ConfirmModal
          isOpen={deleteCategoryModalOpen}
          onCancel={() => setDeleteCategoryModalOpen(false)}
          onConfirm={handleDeleteCategoryConfirm}
          title="Delete Category"
          message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
        />

        {/* Create Invoice Modal */}
        {showCreateInvoiceModal && (
          <Modal onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateInvoiceModal(false);
              resetInvoiceForm();
            }
          }}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Create Invoice</ModalTitle>
                <CloseButton onClick={() => {
                  setShowCreateInvoiceModal(false);
                  resetInvoiceForm();
                }}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Search Restaurant *</FormLabel>
                  <div style={{position: 'relative'}}>
                    <FormInput
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSearchDropdown(true)}
                      onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                      placeholder="Type to search for restaurants"
                      required
                    />
                    {showSearchDropdown && (searchResults.managers.length > 0 || searchResults.restaurants.length > 0) && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #E6EBF1',
                        borderRadius: '8px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}>
                        {searchResults.managers.length > 0 && (
                          <div>
                            <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                              MANAGERS
                            </div>
                            {searchResults.managers.map(manager => (
                              <div
                                key={manager.id}
                                onClick={() => selectTarget('manager', manager)}
                                style={{
                                  padding: '12px',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #F3F4F6',
                                  transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                              >
                                <div style={{fontWeight: '500', color: '#0A2540'}}>{manager.fullName}</div>
                                <div style={{fontSize: '13px', color: '#6B7280'}}>{manager.companyName || manager.email}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {searchResults.restaurants.length > 0 && (
                          <div>
                            <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                              RESTAURANTS
                            </div>
                            {searchResults.restaurants.map(restaurant => {
                              const manager = managers.find(m => m.id === restaurant.manager_id);
                              return (
                                <div
                                  key={restaurant.id}
                                  onClick={() => selectTarget('restaurant', restaurant)}
                                  style={{
                                    padding: '12px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #F3F4F6',
                                    transition: 'background 0.2s'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                  <div style={{fontWeight: '500', color: '#0A2540'}}>{restaurant.name}</div>
                                  <div style={{fontSize: '13px', color: '#6B7280'}}>Manager: {manager?.fullName || 'Unknown'}</div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {selectedTarget && (
                    <div style={{
                      marginTop: '8px',
                      padding: '12px',
                      background: '#F0F7FF',
                      border: '1px solid #B3D9FF',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{fontWeight: '500', color: '#0A2540'}}>
                          {selectedTarget.type === 'manager'
                            ? (selectedTarget.data as Manager).fullName
                            : (selectedTarget.data as Restaurant).name}
                        </div>
                        <div style={{fontSize: '13px', color: '#6B7280'}}>
                          {selectedTarget.type === 'manager'
                            ? `${(selectedTarget.data as Manager).companyName} • Manager`
                            : `${(selectedTarget.data as Restaurant).address || 'No address'} • Restaurant`}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedTarget(null);
                          setSearchQuery('');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6B7280',
                          cursor: 'pointer',
                          fontSize: '18px',
                          lineHeight: '1',
                          padding: '4px'
                        }}
                        title="Remove selection"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Amount (RM) *</FormLabel>
                    <FormInput
                      type="number"
                      step="0.01"
                      min="0"
                      value={newInvoice.amount}
                      onChange={(e) => {
                        const amount = parseFloat(e.target.value) || 0;
                        const tax = amount * 0.06;
                        const total = amount + tax;
                        setNewInvoice({
                          ...newInvoice,
                          amount: e.target.value,
                          tax: tax.toFixed(2),
                          total: total.toFixed(2)
                        });
                      }}
                      placeholder="0.00"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Due Date *</FormLabel>
                    <FormInput
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel>Invoice Category</FormLabel>
                  <FormSelect
                    value={newInvoice.invoiceCategory || 'service'}
                    onChange={(e) => setNewInvoice({...newInvoice, invoiceCategory: e.target.value})}
                  >
                    {invoiceCategories.length > 0 ? (
                      invoiceCategories
                        .filter(cat => cat.code !== 'subscription')
                        .map(cat => (
                          <option key={cat.id} value={cat.code}>{cat.name}</option>
                        ))
                    ) : (
                      <>
                        <option value="service">Service</option>
                        <option value="consulting">Consulting</option>
                        <option value="others">Others</option>
                      </>
                    )}
                  </FormSelect>
                </FormGroup>

                {/* Show item/description input for all categories */}
                <FormGroup>
                  <FormLabel>Item/Description</FormLabel>
                  <FormTextarea
                    value={newInvoice.invoiceCategory === 'others' ? (newInvoice.customDescription || '') : (newInvoice.serviceDescription || '')}
                    onChange={(e) => {
                      if (newInvoice.invoiceCategory === 'others') {
                        setNewInvoice({...newInvoice, customDescription: e.target.value});
                      } else {
                        setNewInvoice({...newInvoice, serviceDescription: e.target.value});
                      }
                    }}
                    placeholder={`Enter ${newInvoice.invoiceCategory || 'service'} description...`}
                    rows={3}
                  />
                </FormGroup>
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(parseFloat(newInvoice.amount || '0'), newInvoice.currency || operationSettings.currency)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(parseFloat(newInvoice.tax || '0'), newInvoice.currency || operationSettings.currency)}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{formatCurrency(parseFloat(newInvoice.total || '0'), newInvoice.currency || operationSettings.currency)}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => {
                  setShowCreateInvoiceModal(false);
                  resetInvoiceForm();
                }}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSubmitInvoice}
                  disabled={!selectedTarget || !newInvoice.amount || !newInvoice.dueDate}
                >
                  Create Invoice
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* View Invoice Modal */}
        {showViewModal && selectedInvoice && (() => {
          // For to_pay tab, use issuer's company info; for issued tab, use logged-in user's company info
          const isReceivedInvoice = activeTab === 'to_pay' && selectedInvoice.issuerInfo;
          const displayCompany = isReceivedInvoice ? {
            companyName: selectedInvoice.issuerInfo?.name,
            companyLogo: selectedInvoice.issuerInfo?.logoUrl,
            address: selectedInvoice.issuerInfo?.address,
            city: selectedInvoice.issuerInfo?.city,
            state: selectedInvoice.issuerInfo?.state,
            postalCode: selectedInvoice.issuerInfo?.postalCode,
            country: selectedInvoice.issuerInfo?.country,
            phone: selectedInvoice.issuerInfo?.phone,
            email: selectedInvoice.issuerInfo?.email,
            bankName: selectedInvoice.issuerInfo?.bankName,
            bankAccount: selectedInvoice.issuerInfo?.bankAccount,
            bankAccountName: selectedInvoice.issuerInfo?.bankAccountName,
            taxNumber: selectedInvoice.issuerInfo?.taxId,
            registrationNumber: selectedInvoice.issuerInfo?.businessRegistration
          } : companySettings;

          return (
          <Modal onClick={() => setShowViewModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
              <ModalHeader>
                <ModalTitle>Invoice Details</ModalTitle>
                <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                {/* Invoice Header with Company Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #E5E7EB' }}>
                  <div>
                    {displayCompany?.companyLogo && (
                      <img src={displayCompany.companyLogo} alt="Company Logo" style={{ maxHeight: '60px', marginBottom: '8px' }} />
                    )}
                    <div style={{ fontSize: displayCompany?.companyLogo ? '14px' : '20px', fontWeight: '700', color: '#0A2540', marginBottom: '8px' }}>
                      {displayCompany?.companyName || 'Company Name'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.6' }}>
                      {displayCompany?.address && <div>{displayCompany.address}</div>}
                      {(displayCompany?.city || displayCompany?.state || displayCompany?.postalCode) && (
                        <div>{[displayCompany?.city, displayCompany?.state, displayCompany?.postalCode].filter(Boolean).join(', ')}</div>
                      )}
                      {displayCompany?.country && <div>{displayCompany.country}</div>}
                      {displayCompany?.phone && <div>Tel: {displayCompany.phone}</div>}
                      {displayCompany?.email && <div>Email: {displayCompany.email}</div>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#635BFF', marginBottom: '8px' }}>INVOICE</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>{selectedInvoice.invoiceNumber}</div>
                    <StatusBadge status={selectedInvoice.status} style={{ marginTop: '8px' }}>
                      {getStatusDisplay(selectedInvoice.status)}
                    </StatusBadge>
                  </div>
                </div>

                {/* Bill To + Dates Section (Side by Side) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  {/* Bill To - For received invoices (to_pay), show logged-in user's company (companySettings) */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Bill To</div>
                    {isReceivedInvoice ? (
                      <>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{companySettings?.companyName || 'Your Company'}</div>
                        {companySettings?.address && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{companySettings.address}</div>
                        )}
                        {(companySettings?.city || companySettings?.state || companySettings?.postalCode) && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                            {[companySettings?.city, companySettings?.state, companySettings?.postalCode].filter(Boolean).join(', ')}
                          </div>
                        )}
                        {companySettings?.country && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{companySettings.country}</div>
                        )}
                        {companySettings?.email && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{companySettings.email}</div>
                        )}
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{selectedInvoice.customerName}</div>
                        {selectedInvoice.customerAddress && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{selectedInvoice.customerAddress}</div>
                        )}
                        {selectedInvoice.payerType === 'restaurant' && selectedInvoice.restaurantName && selectedInvoice.restaurantName !== 'Unknown' && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Restaurant: {selectedInvoice.restaurantName}</div>
                        )}
                      </>
                    )}
                  </div>
                  {/* Dates */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ color: '#6B7280' }}>Billing Period:</span>
                      <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{selectedInvoice.billingPeriod || '-'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ color: '#6B7280' }}>Issue Date:</span>
                      <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(selectedInvoice.issueDate)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ color: '#6B7280' }}>Due Date:</span>
                      <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(selectedInvoice.dueDate)}</span>
                    </div>
                    {selectedInvoice.paidDate && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                        <span style={{ color: '#6B7280' }}>Paid Date:</span>
                        <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(selectedInvoice.paidDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Table */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '12px', textTransform: 'uppercase' }}>Items</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>Description</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>Qty</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>Unit Price</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151' }}>{item.description}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'center' }}>{item.quantity}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>{formatCurrency(item.unitPrice, selectedInvoice.currency || 'MYR')}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>{formatCurrency(item.total, selectedInvoice.currency || 'MYR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <div style={{ width: '280px' }}>
                    <InvoiceSummary>
                      <SummaryRow>
                        <span>Subtotal:</span>
                        <span>{formatCurrency(selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</span>
                      </SummaryRow>
                      <SummaryRow>
                        <span>Tax (6%):</span>
                        <span>{formatCurrency(selectedInvoice.tax, selectedInvoice.currency || 'MYR')}</span>
                      </SummaryRow>
                      <SummaryRow highlight>
                        <span>Total:</span>
                        <span><strong>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</strong></span>
                      </SummaryRow>
                    </InvoiceSummary>
                  </div>
                </div>

                {/* Bank Details (if company has bank info) */}
                {displayCompany?.bankName && (
                  <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Payment Details</div>
                    <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                      <div><strong>Bank:</strong> {displayCompany.bankName}</div>
                      <div><strong>Account Name:</strong> {displayCompany.bankAccountName}</div>
                      <div><strong>Account Number:</strong> {displayCompany.bankAccount}</div>
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                {(displayCompany?.taxNumber || displayCompany?.registrationNumber) && (
                  <div style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '16px' }}>
                    {displayCompany?.registrationNumber && <span>Reg No: {displayCompany.registrationNumber}</span>}
                    {displayCompany?.registrationNumber && displayCompany?.taxNumber && <span> | </span>}
                    {displayCompany?.taxNumber && <span>Tax No: {displayCompany.taxNumber}</span>}
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
          );
        })()}

        {/* Payment Confirmation Modal */}
        {showPaymentConfirmModal && selectedInvoice && (
          <Modal onClick={() => setShowPaymentConfirmModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Confirm Payment - {selectedInvoice.invoiceNumber}</ModalTitle>
                <CloseButton onClick={() => setShowPaymentConfirmModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Payment Confirmation</FormLabel>
                  <InvoiceSummary>
                    <SummaryRow>
                      <span>Manager:</span>
                      <span>{selectedInvoice.managerName}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Company:</span>
                      <span>{selectedInvoice.companyName}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Invoice Number:</span>
                      <span>{selectedInvoice.invoiceNumber}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Due Date:</span>
                      <span>{formatDate(selectedInvoice.dueDate)}</span>
                    </SummaryRow>
                    <SummaryRow highlight>
                      <span><strong>Payment Amount:</strong></span>
                      <span><strong>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}</strong></span>
                    </SummaryRow>
                  </InvoiceSummary>
                </FormGroup>
                
                <div style={{ 
                  background: '#FEF3C7', 
                  border: '1px solid #F59E0B', 
                  borderRadius: '8px', 
                  padding: '16px', 
                  margin: '16px 0' 
                }}>
                  <p style={{ margin: 0, color: '#92400E', fontSize: '14px' }}>
                    <strong>⚠️ Confirm Payment Receipt</strong><br />
                    Only mark this invoice as paid if you have received and verified the payment from the manager.
                    This action will update the invoice status to "Paid" and cannot be easily undone.
                  </p>
                </div>
                
                <FormGroup>
                  <FormLabel>Confirmation Details</FormLabel>
                  <div style={{ 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    color: '#374151',
                    background: '#F8FAFC',
                    padding: '12px',
                    borderRadius: '6px'
                  }}>
                    • Payment Date: {new Date().toLocaleDateString('en-MY')}<br />
                    • Status Change: {selectedInvoice.status} → Paid<br />
                    • This will update the invoice status immediately
                  </div>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowPaymentConfirmModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleMarkAsPaid}>
                  Confirm Payment Received
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Edit Invoice Modal */}
        {showEditModal && selectedInvoice && editInvoice && (
          <Modal onClick={() => setShowEditModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Edit Invoice - {selectedInvoice.invoiceNumber}</ModalTitle>
                <CloseButton onClick={() => setShowEditModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Search Restaurant *</FormLabel>
                  <div style={{position: 'relative'}}>
                    <FormInput
                      type="text"
                      value={editSearchQuery}
                      onChange={(e) => handleEditSearch(e.target.value)}
                      onFocus={() => setShowEditSearchDropdown(true)}
                      onBlur={() => setTimeout(() => setShowEditSearchDropdown(false), 200)}
                      placeholder="Type to search for restaurants"
                      required
                    />
                    {showEditSearchDropdown && (editSearchResults.managers.length > 0 || editSearchResults.restaurants.length > 0) && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'white',
                        border: '1px solid #E6EBF1',
                        borderRadius: '8px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                        zIndex: 1000,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}>
                        {editSearchResults.managers.length > 0 && (
                          <div>
                            <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                              MANAGERS
                            </div>
                            {editSearchResults.managers.map(manager => (
                              <div
                                key={manager.id}
                                onClick={() => handleEditTargetSelect('manager', manager)}
                                style={{
                                  padding: '12px',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #F3F4F6',
                                  transition: 'background 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                              >
                                <div style={{fontWeight: '500', color: '#0A2540'}}>{manager.fullName}</div>
                                <div style={{fontSize: '13px', color: '#6B7280'}}>{manager.companyName || manager.email}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {editSearchResults.restaurants.length > 0 && (
                          <div>
                            <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                              RESTAURANTS
                            </div>
                            {editSearchResults.restaurants.map(restaurant => {
                              const manager = managers.find(m => m.id === restaurant.manager_id);
                              return (
                                <div
                                  key={restaurant.id}
                                  onClick={() => handleEditTargetSelect('restaurant', restaurant)}
                                  style={{
                                    padding: '12px',
                                    cursor: 'pointer',
                                    borderBottom: '1px solid #F3F4F6',
                                    transition: 'background 0.2s'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                                  onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                                >
                                  <div style={{fontWeight: '500', color: '#0A2540'}}>{restaurant.name}</div>
                                  <div style={{fontSize: '13px', color: '#6B7280'}}>
                                    {manager ? `Manager: ${manager.fullName}` : 'No manager assigned'} • {restaurant.address || 'No address'}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {editSelectedTarget && (
                    <div style={{
                      marginTop: '8px',
                      padding: '12px',
                      background: '#F0F7FF',
                      border: '1px solid #B3D9FF',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{fontWeight: '500', color: '#0A2540'}}>
                          {editSelectedTarget.type === 'manager'
                            ? (editSelectedTarget.data as Manager).fullName
                            : (editSelectedTarget.data as Restaurant).name}
                        </div>
                        <div style={{fontSize: '13px', color: '#6B7280'}}>
                          {editSelectedTarget.type === 'manager'
                            ? `${(editSelectedTarget.data as Manager).companyName} • Manager`
                            : `${(editSelectedTarget.data as Restaurant).address || 'No address'} • Restaurant`}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setEditSelectedTarget(null);
                          setEditSearchQuery('');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#6B7280',
                          cursor: 'pointer',
                          fontSize: '16px',
                          padding: '4px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </FormGroup>


                <FormRow>
                  <FormGroup>
                    <FormLabel>Amount (RM)</FormLabel>
                    <FormInput
                      type="number"
                      value={editInvoice.amount}
                      onChange={(e) => {
                        const amount = parseFloat(e.target.value) || 0;
                        const tax = amount * 0.06;
                        const total = amount + tax;
                        setEditInvoice({
                          ...editInvoice,
                          amount: e.target.value,
                          tax: tax.toFixed(2),
                          total: total.toFixed(2)
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Due Date</FormLabel>
                    <FormInput
                      type="date"
                      value={editInvoice.dueDate}
                      onChange={(e) => setEditInvoice({...editInvoice, dueDate: e.target.value})}
                    />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <FormLabel>Status</FormLabel>
                  <FormSelect
                    value={editInvoice.status}
                    onChange={(e) => setEditInvoice({...editInvoice, status: e.target.value})}
                  >
                    <option value="draft">Draft</option>
                    <option value="pending_payment">Pending Payment</option>
                    <option value="payment_submitted">Payment Submitted</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Invoice Category</FormLabel>
                  <FormSelect
                    value={editInvoice.invoiceCategory || 'service'}
                    onChange={(e) => setEditInvoice({...editInvoice, invoiceCategory: e.target.value})}
                  >
                    {invoiceCategories.length > 0 ? (
                      invoiceCategories
                        .filter(cat => cat.code !== 'subscription')
                        .map(cat => (
                          <option key={cat.id} value={cat.code}>{cat.name}</option>
                        ))
                    ) : (
                      <>
                        <option value="service">Service</option>
                        <option value="consulting">Consulting</option>
                        <option value="others">Others</option>
                      </>
                    )}
                  </FormSelect>
                </FormGroup>


                {editInvoice.invoiceCategory === 'others' && (
                  <FormGroup>
                    <FormLabel>Plan/Item</FormLabel>
                    <FormTextarea
                      value={editInvoice.customDescription || ''}
                      onChange={(e) => setEditInvoice({...editInvoice, customDescription: e.target.value})}
                      rows={3}
                    />
                  </FormGroup>
                )}

                {((editInvoice.invoiceCategory || 'service') === 'service' || editInvoice.invoiceCategory === 'consulting') && (
                  <FormGroup>
                    <FormLabel>Plan/Item</FormLabel>
                    <FormTextarea
                      value={editInvoice.serviceDescription || ''}
                      onChange={(e) => setEditInvoice({...editInvoice, serviceDescription: e.target.value})}
                      rows={3}
                    />
                  </FormGroup>
                )}

                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(parseFloat(editInvoice.amount || '0'), editInvoice.currency || 'MYR')}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(parseFloat(editInvoice.tax || '0'), editInvoice.currency || 'MYR')}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{formatCurrency(parseFloat(editInvoice.total || '0'), editInvoice.currency || 'MYR')}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSaveEdit}>
                  Save Changes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Send Invoice Confirmation Modal */}
        {showSendConfirmModal && selectedInvoice && (
          <Modal onClick={() => setShowSendConfirmModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Send Invoice</ModalTitle>
                <CloseButton onClick={() => setShowSendConfirmModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A2540',
                    marginBottom: '12px'
                  }}>Send Invoice</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    Are you sure you want to send invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.restaurantName || selectedInvoice.customerName}</strong>?
                  </p>
                  <div style={{
                    background: '#F8FAFC',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #E6EBF1'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Invoice:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Recipient:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.managerName || selectedInvoice.restaurantName || selectedInvoice.customerName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Company:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.customerName || selectedInvoice.restaurantName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Amount:</span>
                      <span style={{ fontWeight: '600', color: '#059669' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowSendConfirmModal(false)}>
                  Cancel
                </Button>
                <Button variant="success" onClick={confirmSendInvoice}>
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Resend Invoice Confirmation Modal */}
        {showResendConfirmModal && selectedInvoice && (
          <Modal onClick={() => setShowResendConfirmModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Resend Invoice</ModalTitle>
                <CloseButton onClick={() => setShowResendConfirmModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A2540',
                    marginBottom: '12px'
                  }}>Resend Invoice</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    marginBottom: '20px',
                    lineHeight: '1.6'
                  }}>
                    Resend invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.restaurantName || selectedInvoice.customerName}</strong>?
                  </p>
                  <div style={{
                    background: '#FEF3C7',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #F59E0B',
                    fontSize: '13px',
                    color: '#92400E'
                  }}>
                    This will send another copy of the invoice to the restaurant's email.
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowResendConfirmModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={confirmResendInvoice}>
                  Resend Invoice
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Cancel Invoice Confirmation Modal */}
        {showCancelConfirmModal && selectedInvoice && (
          <Modal onClick={() => setShowCancelConfirmModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Cancel Invoice</ModalTitle>
                <CloseButton onClick={() => setShowCancelConfirmModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A2540',
                    marginBottom: '12px'
                  }}>Cancel Invoice</h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6B7280', 
                    marginBottom: '20px',
                    lineHeight: '1.6' 
                  }}>
                    Are you sure you want to cancel invoice <strong>{selectedInvoice.invoiceNumber}</strong>?
                  </p>
                  <div style={{
                    background: '#FEE2E2',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #FCA5A5',
                    marginBottom: '16px'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: '#991B1B', 
                      fontSize: '14px', 
                      fontWeight: '500'
                    }}>
                      <strong>⚠️ This action cannot be undone</strong>
                    </p>
                    <p style={{ 
                      margin: '8px 0 0 0', 
                      color: '#7F1D1D', 
                      fontSize: '13px'
                    }}>
                      The invoice will be marked as cancelled and cannot be sent or processed for payment.
                    </p>
                  </div>
                  <div style={{
                    background: '#F8FAFC',
                    padding: '16px',
                    borderRadius: '8px',
                    border: '1px solid #E6EBF1'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Invoice:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Manager:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.managerName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Amount:</span>
                      <span style={{ fontWeight: '600', color: '#DC2626' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'USD')}</span>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowCancelConfirmModal(false)}>
                  Keep Invoice
                </Button>
                <Button 
                  variant="primary" 
                  onClick={confirmCancelInvoice}
                  style={{ background: '#DC2626', borderColor: '#DC2626' }}
                >
                  Cancel Invoice
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Delete Invoice Confirmation Modal */}
        {showDeleteConfirmModal && selectedInvoice && (
          <Modal onClick={() => setShowDeleteConfirmModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Delete Invoice</ModalTitle>
                <CloseButton onClick={() => setShowDeleteConfirmModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A2540',
                    marginBottom: '12px'
                  }}>Delete Invoice</h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    lineHeight: '1.5'
                  }}>
                    Are you sure you want to permanently delete invoice <strong>#{selectedInvoice.invoiceNumber}</strong>?
                    <br />This action cannot be undone.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}>
                  Keep Invoice
                </Button>
                <Button
                  variant="primary"
                  onClick={confirmDeleteInvoice}
                  style={{ background: '#DC2626', borderColor: '#DC2626' }}
                >
                  Delete Invoice
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Email Invoice Modal */}
        {showEmailModal && emailInvoice && (
          <Modal onClick={() => setShowEmailModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Send Invoice via Email</ModalTitle>
                <CloseButton onClick={() => setShowEmailModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Invoice</FormLabel>
                  <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', marginBottom: '16px' }}>
                    <div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>{emailInvoice.invoiceNumber}</div>
                    <div style={{ fontSize: '13px', color: '#6B7280' }}>{emailInvoice.customerName}</div>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#635BFF', marginTop: '8px' }}>
                      {formatCurrency(emailInvoice.total, emailInvoice.currency || 'MYR')}
                    </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Recipient Email *</FormLabel>
                  <FormInput
                    type="email"
                    value={emailRecipient}
                    onChange={(e) => setEmailRecipient(e.target.value)}
                    placeholder="Enter recipient email address"
                    required
                    style={{ maxWidth: '100%' }}
                  />
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                    {emailRecipient ? (
                      <>Default email for {emailInvoice.payerType === 'restaurant' ? 'Restaurant' :
                       emailInvoice.payerType === 'foodcourt_manager' ? 'Foodcourt Manager' :
                       emailInvoice.payerType === 'brand_manager' ? 'Brand Manager' : 'Customer'}</>
                    ) : (
                      <>Enter the {emailInvoice.payerType === 'restaurant' ? 'restaurant' :
                       emailInvoice.payerType === 'foodcourt_manager' ? 'foodcourt manager' :
                       emailInvoice.payerType === 'brand_manager' ? 'brand manager' : 'customer'} email address</>
                    )}
                  </div>
                </FormGroup>

                <div style={{
                  background: '#F0F9FF',
                  border: '1px solid #0EA5E9',
                  borderRadius: '8px',
                  padding: '12px',
                  marginTop: '16px'
                }}>
                  <p style={{ margin: 0, fontSize: '13px', color: '#0369A1' }}>
                    The invoice will be sent to the recipient email address using the system email settings.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => {
                  setShowEmailModal(false);
                  setEmailInvoice(null);
                  setEmailRecipient('');
                }}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSendInvoiceEmail}
                  disabled={!emailRecipient || !emailRecipient.includes('@')}
                >
                  Send Email
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <Modal onClick={() => setShowSuccessModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Success</ModalTitle>
                <CloseButton onClick={() => setShowSuccessModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{
                    fontSize: '16px',
                    color: '#0A2540',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>{successMessage}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                  OK
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Download Success Modal */}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandInvoicesPage;