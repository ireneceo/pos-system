import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';
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
  Table,
  TableHeader as CommonTableHeader,
  TableRow as CommonTableRow,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  EmptyState
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
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
  admin_id: string;
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

const PeriodFilterGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.active ? '#059669' : '#FFFFFF'};
  color: ${props => props.active ? '#FFFFFF' : '#6B7C93'};
  border: 1px solid ${props => props.active ? '#059669' : '#E6EBF1'};
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#047857' : '#F8FAFC'};
    border-color: ${props => props.active ? '#047857' : '#CBD5E1'};
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
    border-color: #059669;
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

const LocalActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'email' | 'cancel' }>`
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

const TabContainer = styled.div`
  display: flex;
  gap: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #E6EBF1;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
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

// 페이지별 반응형 테이블 헤더 (Invoices 전용)
// Header columns: Invoice(1), Customer(2), Period(3), Issued(4), Due(5), Status(6), Amount(7), Total(8), Actions(9)
const InvoiceTableHeader = styled(CommonTableHeader)`
  /* 1400px 이하: Period, Issued 숨김 - 7개 칼럼 */
  @media (max-width: 1400px) {
    grid-template-columns: 1.6fr 1.3fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(140px, 180px) !important;
    & > span.col-period,
    & > span.col-issued {
      display: none;
    }
  }

  /* 1100px 이하: Period, Issued, Amount, Total 숨김 - 5개 칼럼 */
  @media (max-width: 1100px) {
    grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr minmax(130px, 160px) !important;
    & > span.col-period,
    & > span.col-issued,
    & > span.col-amount,
    & > span.col-total {
      display: none;
    }
  }

  /* 900px 이하: Period, Issued, Status, Amount, Total 숨김 - 4개 칼럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1.4fr 1.2fr 0.8fr minmax(120px, 150px) !important;
    & > span.col-period,
    & > span.col-issued,
    & > span.col-status,
    & > span.col-amount,
    & > span.col-total {
      display: none;
    }
  }
`;

// 페이지별 반응형 테이블 행 (Invoices 전용)
// 클래스명으로 칼럼을 식별하여 숨김 처리
const InvoiceTableRow = styled(CommonTableRow)`
  /* 1400px 이하: Period, Issued 숨김 - 7개 칼럼 */
  @media (max-width: 1400px) {
    grid-template-columns: 1.6fr 1.3fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(140px, 180px) !important;
    .col-period,
    .col-issued {
      display: none;
    }
  }

  /* 1100px 이하: Period, Issued, Amount, Total 숨김 - 5개 칼럼 */
  @media (max-width: 1100px) {
    grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr minmax(130px, 160px) !important;
    .col-period,
    .col-issued,
    .col-amount,
    .col-total {
      display: none;
    }
  }

  /* 900px 이하: Period, Issued, Status, Amount, Total 숨김 - 4개 칼럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1.4fr 1.2fr 0.8fr minmax(120px, 150px) !important;
    .col-period,
    .col-issued,
    .col-status,
    .col-amount,
    .col-total {
      display: none;
    }
  }
`;

type TabType = 'to_pay' | 'paid' | 'issued';

const FoodcourtInvoicesPage: React.FC = () => {
  const { operationSettings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
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
  const activeTab = (searchParams.get('tab') as TabType) || 'to_pay';
  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  // State for invoices to pay (from system admin)
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);
  const [paidInvoicesList, setPaidInvoicesList] = useState<Invoice[]>([]);

  // Paid tab filters
  type PeriodType = 'week' | 'month' | 'year' | 'all';
  const [paidSearchTerm, setPaidSearchTerm] = useState('');
  const [paidActivePeriod, setPaidActivePeriod] = useState<PeriodType>('all');
  const [paidIsCustomDateRange, setPaidIsCustomDateRange] = useState(false);
  const [paidDateRange, setPaidDateRange] = useState({ start: '', end: '' });

  const handlePaidPeriodChange = (period: PeriodType) => {
    setPaidActivePeriod(period);
    setPaidIsCustomDateRange(false);

    const now = new Date();
    let start = new Date();
    let end = new Date();

    const fmtDate = (d: Date) => {
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

    setPaidDateRange({
      start: period === 'all' ? '' : fmtDate(start),
      end: period === 'all' ? '' : fmtDate(end)
    });
  };

  const handlePaidDateRangeChange = (type: 'start' | 'end', value: string) => {
    setPaidIsCustomDateRange(true);
    setPaidDateRange(prev => ({
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
    receiptImage: ''
  });
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
  const [, setSubscriptions] = useState<Subscription[]>([]);
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
    serviceDescription: ''
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
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setInvoicesToPay([]);
        return;
      }

      const response = await fetch('/api/invoices/to-pay', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInvoicesToPay(data);
      } else {
        console.error('Failed to fetch invoices to pay');
        setInvoicesToPay([]);
      }
    } catch (error) {
      console.error('Error fetching invoices to pay:', error);
      setInvoicesToPay([]);
    }
  };

  const fetchPaidInvoices = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) { setPaidInvoicesList([]); return; }

      const response = await fetch('/api/invoices/to-pay?status=paid', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPaidInvoicesList(data);
      } else {
        setPaidInvoicesList([]);
      }
    } catch (error) {
      console.error('Error fetching paid invoices:', error);
      setPaidInvoicesList([]);
    }
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

    if (!file.type.startsWith('image/')) {
      setPaymentSubmitError('Please upload an image file (JPG, PNG, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setPaymentSubmitError('File size must be less than 10MB');
      return;
    }

    try {
      setPaymentSubmitError(null);
      const resizedImage = await resizeImage(file, 1024, 1024, 0.8);
      setPaymentData(prev => ({ ...prev, receiptImage: resizedImage }));
    } catch (error) {
      console.error('Error processing image:', error);
      setPaymentSubmitError('Failed to process image. Please try another file.');
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
          receipt_url: paymentData.receiptImage || null
        })
      });

      if (response.ok) {
        setShowPaymentSubmitModal(false);
        setSelectedInvoice(null);
        setPaymentData({ paymentMethod: 'bank_transfer', transactionId: '', notes: '', receiptImage: '' });
        setPaymentSubmitError(null);
        setSuccessMessage('Payment submitted successfully! The system admin will review and confirm your payment.');
        setShowSuccessModal(true);
        await fetchInvoicesToPay();
        await fetchPaidInvoices();
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

  // Open payment submit modal
  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({ paymentMethod: 'bank_transfer', transactionId: '', notes: '', receiptImage: '' });
    setPaymentSubmitError(null);
    setShowPaymentSubmitModal(true);
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
    fetchPaidInvoices();
    fetchManagers();
    fetchRestaurants();
    fetchSubscriptions();
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
        const data = await managerRes.json();
        const transformed = data.map((user: any) => ({
          id: user.id.toString(),
          fullName: user.full_name || user.username,
          email: user.email,
          role: user.role,
          companyName: user.company_name || 'Restaurant Manager'
        }));
        allManagers = [...allManagers, ...transformed];
      }

      if (foodcourtRes.ok) {
        const data = await foodcourtRes.json();
        const transformed = data.map((user: any) => ({
          id: user.id.toString(),
          fullName: user.full_name || user.username,
          email: user.email,
          role: user.role,
          companyName: user.company_name || 'Foodcourt Manager'
        }));
        allManagers = [...allManagers, ...transformed];
      }

      if (brandRes.ok) {
        const data = await brandRes.json();
        const transformed = data.map((user: any) => ({
          id: user.id.toString(),
          fullName: user.full_name || user.username,
          email: user.email,
          role: user.role,
          companyName: user.company_name || 'Brand Manager'
        }));
        allManagers = [...allManagers, ...transformed];
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
          admin_id: restaurant.admin_id?.toString() || restaurant.managerId?.toString() || '',
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

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/subscriptions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      } else {
        console.warn('Subscription API not available');
        setSubscriptions([]);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setSubscriptions([]);
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
    console.log('Available managers:', managers);
    console.log('Available restaurants:', restaurants);

    const filteredManagers = managers.filter(manager =>
      (manager.fullName && manager.fullName.toLowerCase().includes(query.toLowerCase())) ||
      (manager.companyName && manager.companyName.toLowerCase().includes(query.toLowerCase()))
    );

    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

    console.log('Filtered managers:', filteredManagers);
    console.log('Filtered restaurants:', filteredRestaurants);

    setSearchResults({
      managers: filteredManagers.slice(0, 5),
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

    const filteredManagers = managers.filter(manager =>
      (manager.fullName && manager.fullName.toLowerCase().includes(query.toLowerCase())) ||
      (manager.companyName && manager.companyName.toLowerCase().includes(query.toLowerCase()))
    );

    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

    setEditSearchResults({
      managers: filteredManagers.slice(0, 5),
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
      const manager = managers.find(m => m.id === restaurant.admin_id);
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
      const manager = managers.find(m => m.id === restaurant.admin_id);
      setNewInvoice({
        ...newInvoice,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        managerId: restaurant.admin_id,
        managerName: manager ? manager.fullName : '',
        companyName: restaurant.name
      });
    }
  };

  const fetchCompanySettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setCompanySettings(data);
      } else {
        // Try to load from adminSettings localStorage
        const adminSettings = localStorage.getItem('adminSettings');
        let companyLogo = '';
        if (adminSettings) {
          try {
            const parsed = JSON.parse(adminSettings);
            companyLogo = parsed.companyLogo || parsed.logo || '';
          } catch (e) {
            console.error('Error parsing adminSettings:', e);
          }
        }

        // Use default company settings - should not reach here if API works
        console.warn('Company settings not found in API response');
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
          companyLogo: companyLogo
        });
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);

      // Try to load from adminSettings localStorage
      const adminSettings = localStorage.getItem('adminSettings');
      let companyLogo = '';
      if (adminSettings) {
        try {
          const parsed = JSON.parse(adminSettings);
          companyLogo = parsed.companyLogo || parsed.logo || '';
        } catch (e) {
          console.error('Error parsing adminSettings:', e);
        }
      }

      console.error('Failed to load company settings from API');
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
        companyLogo: companyLogo
      });
    }
  };

  // Generate invoice HTML content (shared for PDF, Print, Email)
  const generateInvoiceHTML = (invoice: Invoice) => {
    if (!companySettings) return '';

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
                ${companySettings.companyLogo ? `<img src="${companySettings.companyLogo}" alt="Company Logo" class="company-logo">` : ''}
                <div class="company-name">${companySettings.companyName || 'Company Name'}</div>
                <div class="company-details">
                    ${companySettings.address ? `${companySettings.address}<br>` : ''}
                    ${[companySettings.city, companySettings.state, companySettings.postalCode].filter(Boolean).join(', ')}${companySettings.city || companySettings.state || companySettings.postalCode ? '<br>' : ''}
                    ${companySettings.country ? `${companySettings.country}<br>` : ''}
                    ${companySettings.phone ? `Tel: ${companySettings.phone}<br>` : ''}
                    ${companySettings.email ? `Email: ${companySettings.email}` : ''}
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
                <div class="customer-name">${invoice.customerName || invoice.managerName || 'Customer'}</div>
                ${invoice.customerAddress ? `<div class="customer-details">${invoice.customerAddress}</div>` : ''}
                ${invoice.restaurantName ? `<div class="customer-details">Restaurant: ${invoice.restaurantName}</div>` : ''}
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

        ${companySettings.bankName ? `
        <div class="bank-section">
            <div class="bank-title">Payment Details</div>
            <div class="bank-details">
                <strong>Bank:</strong> ${companySettings.bankName}<br>
                <strong>Account Name:</strong> ${companySettings.bankAccountName || '-'}<br>
                <strong>Account Number:</strong> ${companySettings.bankAccount || '-'}
                ${companySettings.swiftCode ? `<br><strong>SWIFT Code:</strong> ${companySettings.swiftCode}` : ''}
            </div>
        </div>
        ` : ''}

        ${(companySettings.taxNumber || companySettings.registrationNumber) ? `
        <div class="registration-info">
            ${companySettings.registrationNumber ? `Reg No: ${companySettings.registrationNumber}` : ''}
            ${companySettings.registrationNumber && companySettings.taxNumber ? ' | ' : ''}
            ${companySettings.taxNumber ? `Tax No: ${companySettings.taxNumber}` : ''}
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
    if (!companySettings) {
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

      // What and Why: iframe 렌더링 완료 대기
      // - 150ms는 이미지/폰트 로딩에 불충분
      // - 폰트 로딩, 이미지 로딩, 레이아웃 완료를 순차적으로 대기
      await new Promise<void>(async (resolve) => {
        // 폰트 로딩 대기
        try {
          if ((iframeDoc as any).fonts?.ready) {
            await (iframeDoc as any).fonts.ready;
          }
        } catch { /* 폰트 API 미지원 시 무시 */ }

        // 이미지 로딩 대기
        const images = iframeDoc.querySelectorAll('img');
        await Promise.all(
          Array.from(images).map(img =>
            img.complete ? Promise.resolve() : new Promise(r => { img.onload = r; img.onerror = r; })
          )
        );

        // 레이아웃 안정화 대기
        setTimeout(resolve, 100);
      });

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
    if (!companySettings) {
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
      serviceDescription: ''
    });
    setSelectedTarget(null);
    setSearchQuery('');
    setShowSearchDropdown(false);
  };

  // Get unique months from invoices
  const monthsArray = invoices.map(invoice => {
    const date = new Date(invoice.issueDate);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  });
  const availableMonths = Array.from(new Set(monthsArray)).sort().reverse();

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.managerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus || (filterStatus === 'pending_payment' && (invoice.status === '' || !invoice.status));
    const matchesType = filterType === 'all' || invoice.type === filterType;

    let matchesMonth = true;
    if (filterMonth !== 'all') {
      const invoiceDate = new Date(invoice.issueDate);
      const invoiceMonth = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}`;
      matchesMonth = invoiceMonth === filterMonth;
    }

    return matchesSearch && matchesStatus && matchesType && matchesMonth;
  }).sort((a, b) => {
    // Sort by issue date descending (newest first)
    const dateA = new Date(a.issueDate).getTime();
    const dateB = new Date(b.issueDate).getTime();
    return dateB - dateA;
  });

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

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
      dueDate: invoice.dueDate,
      status: invoice.status,
      planType: invoice.planType,
      billingCycle: 'monthly', // Default, can be derived from planType
      description: invoice.items?.[0]?.description || '',
      payerType: invoice.payerType || 'restaurant',
      payerId: invoice.payerId || '',
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

      const invoiceData = {
        restaurant_id: selectedTarget.type === 'restaurant' ? (selectedTarget.data as Restaurant).id : null,
        manager_id: selectedTarget.type === 'manager' ? (selectedTarget.data as Manager).id : null,
        customer_name: customerName,
        customer_address: customerAddress,
        company_name: companyName,
        restaurant_name: restaurantName,
        type: 'manual',
        billing_period_start: billingPeriodStart.toISOString(),
        billing_period_end: billingPeriodEnd.toISOString(),
        due_date: new Date(newInvoice.dueDate).toISOString(),
        total_amount: total,
        status: 'draft',
        notes: description,
        issued_by: 1, // Current admin user ID
        issued_at: new Date().toISOString()
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

        <TabContainer>
          <Tab active={activeTab === 'to_pay'} onClick={() => handleTabChange('to_pay')}>
            Invoices to Pay ({invoicesToPay.filter(i => i.status === 'pending_payment' || i.status === 'overdue').length})
          </Tab>
          <Tab active={activeTab === 'paid'} onClick={() => handleTabChange('paid')}>
            Paid Invoices ({paidInvoicesList.length})
          </Tab>
          <Tab active={activeTab === 'issued'} onClick={() => handleTabChange('issued')}>
            Issued Invoices ({invoices.length})
          </Tab>
        </TabContainer>

        {activeTab === 'issued' && (
          <>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalInvoices}</StatValue>
            <StatLabel>Total Invoices</StatLabel>
            <StatDescription>All invoice records</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{paidInvoices}</StatValue>
            <StatLabel>Paid Invoices</StatLabel>
            <StatDescription>{totalInvoices > 0 ? Math.round((paidInvoices/totalInvoices)*100) : 0}% completed</StatDescription>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{overdueInvoices}</StatValue>
            <StatLabel>Overdue Invoices</StatLabel>
            <StatDescription>Requires attention</StatDescription>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatCurrency(totalRevenue)}</StatValue>
            <StatLabel>Total Revenue</StatLabel>
            <StatDescription>From paid invoices</StatDescription>
          </StatCard>
        </StatsGrid>

        <FilterBarWrapper>
          <FiltersLeft>
            <SearchInput
              placeholder="Search by invoice #, company, restaurant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending_payment">Pending Payment</option>
              <option value="payment_submitted">Payment Submitted</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </FilterSelect>

            <FilterSelect value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All Types</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </FilterSelect>

            <FilterSelect value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
              <option value="all">All Months</option>
              {availableMonths.map(month => {
                const [year, monthNum] = month.split('-');
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                                   'July', 'August', 'September', 'October', 'November', 'December'];
                const monthName = monthNames[parseInt(monthNum) - 1];
                return (
                  <option key={month} value={month}>
                    {monthName} {year}
                  </option>
                );
              })}
            </FilterSelect>
          </FiltersLeft>
          <FiltersRight>
            <Button variant="primary" onClick={handleCreateInvoice}>Create Invoice</Button>
          </FiltersRight>
        </FilterBarWrapper>

        <Table>
          <InvoiceTableHeader columns="1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)">
            <span className="col-invoice">Invoice</span>
            <span className="col-customer">Customer</span>
            <span className="col-period">Period</span>
            <span className="col-issued">Issued</span>
            <span className="col-due">Due</span>
            <span className="col-status">Status</span>
            <span className="col-amount">Amount</span>
            <span className="col-total">Total</span>
            <span className="col-actions">Actions</span>
          </InvoiceTableHeader>

          {filteredInvoices.map(invoice => (
            <InvoiceTableRow columns="1.6fr 1.3fr 1.2fr 0.9fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(180px, 220px)" key={invoice.id}>
              <MobileGrid>
                <MobileValue className="col-invoice">
                  <MobileLabel>Invoice</MobileLabel>
                  <InvoiceInfo>
                    <InvoiceNumber>
                      {invoice.invoiceNumber}
                      {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>AUTO</AutoBadge>}
                    </InvoiceNumber>
                    <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                  </InvoiceInfo>
                </MobileValue>

                <MobileValue className="col-customer">
                  <MobileLabel>Customer</MobileLabel>
                  <InvoiceInfo>
                    <InvoiceNumber>{invoice.customerName || invoice.restaurantName || 'Unknown'}</InvoiceNumber>
                    <CompanyName>{getPayerDisplay(invoice.payerType || 'restaurant')}</CompanyName>
                  </InvoiceInfo>
                </MobileValue>

                <MobileValue className="col-period">
                  <MobileLabel>Period</MobileLabel>
                  <div style={{ fontSize: '12px' }}>
                    {invoice.billingPeriod || '-'}
                  </div>
                </MobileValue>

                <MobileValue className="col-issued">
                  <MobileLabel>Issued</MobileLabel>
                  <div style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</div>
                </MobileValue>

                <MobileValue className="col-due">
                  <MobileLabel>Due</MobileLabel>
                  <div style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</div>
                </MobileValue>

                <MobileValue className="col-status">
                  <MobileLabel>Status</MobileLabel>
                  <div>
                    <StatusBadge status={invoice.status}>
                      {getStatusDisplay(invoice.status)}
                    </StatusBadge>
                  </div>
                </MobileValue>

                <MobileValue className="col-amount">
                  <MobileLabel>Amount</MobileLabel>
                  <Amount>{formatCurrency(invoice.amount, invoice.currency || 'USD')}</Amount>
                </MobileValue>

                <MobileValue className="col-total">
                  <MobileLabel>Total</MobileLabel>
                  <Amount highlight>{formatCurrency(invoice.total, invoice.currency || 'USD')}</Amount>
                </MobileValue>
              </MobileGrid>

              <ActionButtons className="col-actions">
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>
                      {invoice.status === 'draft' && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
                          <LocalActionButton onClick={() => handleSendInvoice(invoice)}>Send</LocalActionButton>
                        </>
                      )}
                      {/* 미결제 상태: 편집, 다운로드, 프린트, 이메일발송, 삭제 */}
                      {(invoice.status === 'pending_payment' || invoice.status === '' || !invoice.status) && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
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

                      {/* 결제정보 확인중 상태: 결제확인, 편집, 다운로드, 프린트, 이메일발송 */}
                      {invoice.status === 'payment_submitted' && (
                        <>
                          {invoice.hasPaymentInfo && (
                            <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>Confirm</LocalActionButton>
                          )}
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
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

                      {/* 연체 상태: 편집, 다운로드, 프린트, 이메일발송, 삭제 */}
                      {invoice.status === 'overdue' && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
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
                      {/* 취소됨 상태: View만 가능 */}
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
            </InvoiceTableRow>
          ))}

          {filteredInvoices.length === 0 && (
            <EmptyState>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No Invoices Found</div>
              <div style={{ fontSize: '14px' }}>
                {invoices.length === 0 ? 'Create your first invoice to get started' : 'Try adjusting your filters'}
              </div>
            </EmptyState>
          )}
        </Table>
          </>
        )}

        {activeTab === 'to_pay' && (
          <>
            <StatsGrid>
              <StatCard color="#D97706">
                <StatValue>{invoicesToPay.filter(i => i.status === 'pending_payment' || i.status === 'overdue').length}</StatValue>
                <StatLabel>To Pay</StatLabel>
                <StatDescription>Pending payment</StatDescription>
              </StatCard>
              <StatCard color="#2563EB">
                <StatValue>{invoicesToPay.filter(i => i.status === 'payment_submitted').length}</StatValue>
                <StatLabel>Submitted</StatLabel>
                <StatDescription>Awaiting confirmation</StatDescription>
              </StatCard>
              <StatCard color="#059669">
                <StatValue>{invoicesToPay.filter(i => i.status === 'paid').length}</StatValue>
                <StatLabel>Paid</StatLabel>
                <StatDescription>Payment confirmed</StatDescription>
              </StatCard>
              <StatCard color="#DC2626">
                <StatValue>{formatCurrency(invoicesToPay.filter(i => i.status !== 'paid' && i.status !== 'cancelled').reduce((sum, i) => sum + i.total, 0))}</StatValue>
                <StatLabel>Outstanding</StatLabel>
                <StatDescription>Total unpaid amount</StatDescription>
              </StatCard>
            </StatsGrid>

            <Table>
              <InvoiceTableHeader columns="1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)">
                <span>Invoice</span>
                <span>Restaurant</span>
                <span>Period</span>
                <span>Issued</span>
                <span>Due</span>
                <span>Status</span>
                <span>Amount</span>
                <span>Total</span>
                <span>Actions</span>
              </InvoiceTableHeader>

              {invoicesToPay.length > 0 ? (
                invoicesToPay.map(invoice => (
                  <InvoiceTableRow columns="1.5fr 1.2fr 1fr 0.8fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 160px)" key={invoice.id}>
                    <MobileGrid>
                      <MobileValue className="col-invoice">
                        <MobileLabel>Invoice</MobileLabel>
                        <InvoiceInfo>
                          <InvoiceNumber>
                            {invoice.invoiceNumber}
                            {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>AUTO</AutoBadge>}
                          </InvoiceNumber>
                          <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                        </InvoiceInfo>
                      </MobileValue>

                      <MobileValue className="col-customer">
                        <MobileLabel>Restaurant</MobileLabel>
                        <InvoiceInfo>
                          <InvoiceNumber>{invoice.restaurantName || invoice.customerName || 'Unknown'}</InvoiceNumber>
                        </InvoiceInfo>
                      </MobileValue>

                      <MobileValue className="col-period">
                        <MobileLabel>Period</MobileLabel>
                        <div style={{ fontSize: '12px' }}>
                          {invoice.billingPeriod || '-'}
                        </div>
                      </MobileValue>

                      <MobileValue className="col-issued">
                        <MobileLabel>Issued</MobileLabel>
                        <div style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</div>
                      </MobileValue>

                      <MobileValue className="col-due">
                        <MobileLabel>Due</MobileLabel>
                        <div style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</div>
                      </MobileValue>

                      <MobileValue className="col-status">
                        <MobileLabel>Status</MobileLabel>
                        <StatusBadge status={invoice.status}>
                          {getStatusDisplay(invoice.status)}
                        </StatusBadge>
                      </MobileValue>

                      <MobileValue className="col-amount">
                        <MobileLabel>Amount</MobileLabel>
                        <Amount>{formatCurrency(invoice.amount, invoice.currency || 'USD')}</Amount>
                      </MobileValue>

                      <MobileValue className="col-total">
                        <MobileLabel>Total</MobileLabel>
                        <Amount highlight>{formatCurrency(invoice.total, invoice.currency || 'USD')}</Amount>
                      </MobileValue>
                    </MobileGrid>

                    <ActionButtons className="col-actions">
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>

                      {/* Pay button for pending/overdue invoices */}
                      {(invoice.status === 'pending_payment' || invoice.status === 'overdue') && (
                        <LocalActionButton variant="primary" onClick={() => handlePayInvoice(invoice)}>Pay</LocalActionButton>
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
                    </ActionButtons>
                  </InvoiceTableRow>
                ))
              ) : (
                <EmptyState>No invoices to pay</EmptyState>
              )}
            </Table>
          </>
        )}

        {activeTab === 'paid' && (
          <>
            <Table>
              <InvoiceTableHeader columns="1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)">
                <span>Invoice</span>
                <span>Restaurant</span>
                <span>Period</span>
                <span>Paid Date</span>
                <span>Status</span>
                <span>Amount</span>
                <span>Total</span>
                <span>Actions</span>
              </InvoiceTableHeader>

              {paidInvoicesList.length > 0 ? (
                paidInvoicesList.sort((a, b) => new Date(b.paidDate || b.issueDate).getTime() - new Date(a.paidDate || a.issueDate).getTime()).map(invoice => (
                  <InvoiceTableRow columns="1.5fr 1.2fr 1fr 0.8fr 0.7fr 0.8fr 0.8fr minmax(120px, 140px)" key={invoice.id}>
                    <MobileGrid>
                      <MobileValue className="col-invoice">
                        <MobileLabel>Invoice</MobileLabel>
                        <InvoiceInfo>
                          <InvoiceNumber>
                            {invoice.invoiceNumber}
                            {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>AUTO</AutoBadge>}
                          </InvoiceNumber>
                          <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                        </InvoiceInfo>
                      </MobileValue>

                      <MobileValue className="col-customer">
                        <MobileLabel>Restaurant</MobileLabel>
                        <InvoiceInfo>
                          <InvoiceNumber>{invoice.restaurantName || invoice.customerName || 'Unknown'}</InvoiceNumber>
                        </InvoiceInfo>
                      </MobileValue>

                      <MobileValue className="col-period">
                        <MobileLabel>Period</MobileLabel>
                        <div style={{ fontSize: '12px' }}>
                          {invoice.billingPeriod || '-'}
                        </div>
                      </MobileValue>

                      <MobileValue className="col-issued">
                        <MobileLabel>Paid Date</MobileLabel>
                        <div style={{ fontSize: '13px' }}>{invoice.paidDate ? formatDate(invoice.paidDate) : formatDate(invoice.issueDate)}</div>
                      </MobileValue>

                      <MobileValue className="col-status">
                        <MobileLabel>Status</MobileLabel>
                        <StatusBadge status="paid">Paid</StatusBadge>
                      </MobileValue>

                      <MobileValue className="col-amount">
                        <MobileLabel>Amount</MobileLabel>
                        <Amount>{formatCurrency(invoice.amount, invoice.currency || 'USD')}</Amount>
                      </MobileValue>

                      <MobileValue className="col-total">
                        <MobileLabel>Total</MobileLabel>
                        <Amount highlight>{formatCurrency(invoice.total, invoice.currency || 'USD')}</Amount>
                      </MobileValue>
                    </MobileGrid>

                    <ActionButtons className="col-actions">
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>
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
                    </ActionButtons>
                  </InvoiceTableRow>
                ))
              ) : (
                <EmptyState>No paid invoices yet</EmptyState>
              )}
            </Table>
          </>
        )}

        {/* Payment Submit Modal */}
        {showPaymentSubmitModal && selectedInvoice && (
          <Modal onClick={() => setShowPaymentSubmitModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
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

                <FormGroup>
                  <FormLabel>Payment Method *</FormLabel>
                  <FormSelect
                    value={paymentData.paymentMethod}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="other">Other</option>
                  </FormSelect>
                </FormGroup>

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
                    disabled={!paymentData.paymentMethod || isSubmittingPayment || (!paymentData.transactionId && !paymentData.receiptImage)}
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
                  <FormLabel>Search Manager or Restaurant *</FormLabel>
                  <div style={{position: 'relative'}}>
                    <FormInput
                      type="text"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => setShowSearchDropdown(true)}
                      onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                      placeholder="Type to search for managers or restaurants"
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
                              const manager = managers.find(m => m.id === restaurant.admin_id);
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

                {newInvoice.invoiceCategory === 'others' && (
                  <FormGroup>
                    <FormLabel>Plan/Item</FormLabel>
                    <FormTextarea
                      value={newInvoice.customDescription || ''}
                      onChange={(e) => setNewInvoice({...newInvoice, customDescription: e.target.value})}
                      rows={3}
                    />
                  </FormGroup>
                )}

                {((newInvoice.invoiceCategory || 'service') === 'service' || newInvoice.invoiceCategory === 'consulting') && (
                  <FormGroup>
                    <FormLabel>Plan/Item</FormLabel>
                    <FormTextarea
                      value={newInvoice.serviceDescription || ''}
                      onChange={(e) => setNewInvoice({...newInvoice, serviceDescription: e.target.value})}
                      rows={3}
                    />
                  </FormGroup>
                )}
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(parseFloat(newInvoice.amount || '0'), operationSettings.currency)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(parseFloat(newInvoice.tax || '0'), operationSettings.currency)}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{formatCurrency(parseFloat(newInvoice.total || '0'), operationSettings.currency)}</strong></span>
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
        {showViewModal && selectedInvoice && (
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
                    {companySettings?.companyLogo ? (
                      <img src={companySettings.companyLogo} alt="Company Logo" style={{ maxHeight: '60px', marginBottom: '8px' }} />
                    ) : (
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#0A2540', marginBottom: '8px' }}>
                        {companySettings?.companyName || 'Company Name'}
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.6' }}>
                      {companySettings?.address && <div>{companySettings.address}</div>}
                      {(companySettings?.city || companySettings?.state || companySettings?.postalCode) && (
                        <div>{[companySettings?.city, companySettings?.state, companySettings?.postalCode].filter(Boolean).join(', ')}</div>
                      )}
                      {companySettings?.country && <div>{companySettings.country}</div>}
                      {companySettings?.phone && <div>Tel: {companySettings.phone}</div>}
                      {companySettings?.email && <div>Email: {companySettings.email}</div>}
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
                  {/* Bill To */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Bill To</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{selectedInvoice.customerName}</div>
                    {selectedInvoice.customerAddress && (
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{selectedInvoice.customerAddress}</div>
                    )}
                    {selectedInvoice.restaurantName && (
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Restaurant: {selectedInvoice.restaurantName}</div>
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
                {companySettings?.bankName && (
                  <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Payment Details</div>
                    <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                      <div><strong>Bank:</strong> {companySettings.bankName}</div>
                      <div><strong>Account Name:</strong> {companySettings.bankAccountName}</div>
                      <div><strong>Account Number:</strong> {companySettings.bankAccount}</div>
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                {(companySettings?.taxNumber || companySettings?.registrationNumber) && (
                  <div style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '16px' }}>
                    {companySettings?.registrationNumber && <span>Reg No: {companySettings.registrationNumber}</span>}
                    {companySettings?.registrationNumber && companySettings?.taxNumber && <span> | </span>}
                    {companySettings?.taxNumber && <span>Tax No: {companySettings.taxNumber}</span>}
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

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
                  <FormLabel>Search Manager or Restaurant *</FormLabel>
                  <div style={{position: 'relative'}}>
                    <FormInput
                      type="text"
                      value={editSearchQuery}
                      onChange={(e) => handleEditSearch(e.target.value)}
                      onFocus={() => setShowEditSearchDropdown(true)}
                      onBlur={() => setTimeout(() => setShowEditSearchDropdown(false), 200)}
                      placeholder="Type to search for managers or restaurants"
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
                              const manager = managers.find(m => m.id === restaurant.admin_id);
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
                    <span>{formatCurrency(parseFloat(editInvoice.amount || '0'), editInvoice.currency || 'USD')}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(parseFloat(editInvoice.tax || '0'), editInvoice.currency || 'USD')}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{formatCurrency(parseFloat(editInvoice.total || '0'), editInvoice.currency || 'USD')}</strong></span>
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
                  }}>Send Invoice to Manager</h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6B7280', 
                    marginBottom: '20px',
                    lineHeight: '1.6' 
                  }}>
                    Are you sure you want to send invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.managerName}</strong>?
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
                      <span style={{ color: '#6B7280' }}>Manager:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.managerName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Company:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.companyName}</span>
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
                <Button variant="primary" onClick={confirmSendInvoice}>
                  Send Invoice
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
                    Resend invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.managerName}</strong>?
                  </p>
                  <div style={{
                    background: '#FEF3C7',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #F59E0B',
                    fontSize: '13px',
                    color: '#92400E'
                  }}>
                    ℹ️ This will send another copy of the invoice to the manager's email.
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

export default FoodcourtInvoicesPage;