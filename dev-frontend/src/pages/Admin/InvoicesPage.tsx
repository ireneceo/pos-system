import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { EmptyState as CategoryEmptyState } from '../../components/UI/TableComponents';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency, getCurrencyDecimals, normalizeCurrencyCode, getCurrencySymbol } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';
import { BaseButton, StatusBadge as CommonStatusBadge } from '../../components/UI/CommonStyles';
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
, Modal as CommonModal } from '../../components/UI';
import { SearchInput } from '../../components/Common/FilterComponents';
import { Tabs, Tab as CommonTab, Badge as TabBadge } from '../../components/Common/TabComponents';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface AdditionalCharge {
  name: string;
  rate: number;
  amount: number;
}

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
  payerType?: 'restaurant' | 'foodcourt_manager' | 'brand_manager' | 'external';
  payerId?: string;
  invoiceCategory?: 'subscription' | 'service' | 'consulting' | 'others';
  customDescription?: string;
  serviceDescription?: string;
  categoryDisplayName?: string;
  additionalCharges?: AdditionalCharge[];
  externalPayerName?: string;
  externalPayerEmail?: string;
  externalPayerPhone?: string;
  externalPayerCompany?: string;
  externalPayerAddress?: string;
  externalPayerTaxId?: string;
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
  discountReason?: string;
  subtotalBeforeDiscount?: number;
  isModified?: boolean;
  isDemo?: boolean;
  modificationHistory?: Array<{
    modified_at: string;
    modified_by: number;
    modified_by_name: string;
    changes: Record<string, { from: any; to: any }>;
    reason: string;
  }>;
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
  currency?: string;
}

interface Restaurant {
  id: string;
  name: string;
  admin_id: string;
  status: string;
  address?: string;
  phone?: string;
  email?: string;
  currency?: string;
}

// Subscription interface removed - not currently used

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

const DemoBadge = styled.span`
  display: inline-block;
  background: #F59E0B;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
  margin-left: 4px;
`;

const DemoToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #6B7280;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

// StatusBadge 컴포넌트는 CommonStatusBadge로 교체됨
const StatusBadge = styled(CommonStatusBadge)`
  white-space: normal;
  line-height: 1.3;
`;

const LocalActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'email' | 'cancel' | 'success' }>`
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;

    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'success' ? `
    background: #10B981;
    color: white;
    border-color: #10B981;

    &:hover {
      background: #059669;
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;

    &:hover {
      background: #FEE2E2;
    }
  ` : props.variant === 'email' ? `
    background: #F3F4F6;
    color: #6B7280;
    border-color: #E5E7EB;
    padding: 5px;

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

// FilterControls and FilterRow now come from DatePeriodFilter

const CreateButtonArea = styled.div`
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
    order: 99;

    button {
      width: 100%;
    }
  }
`;

// DateButton, DateRangePickerWrapper, DateRangeTrigger now come from DatePeriodFilter


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
  max-width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

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

type TabType = 'invoices' | 'payment_submitted' | 'categories';
// PeriodType imported from DatePeriodFilter

const InvoicesPage: React.FC = () => {
  const { operationSettings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
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
  const activeTab = (searchParams.get('tab') as TabType) || 'invoices';
  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  // Category management states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<InvoiceCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState({ name: '', code: '', description: '' });
  const [savingCategory, setSavingCategory] = useState(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<InvoiceCategory | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editInvoice, setEditInvoice] = useState<any>(null);
  const [editModificationReason, setEditModificationReason] = useState('');
  const [editSaveError, setEditSaveError] = useState<string | null>(null);
  const [editSearchQuery, setEditSearchQuery] = useState('');
  const [editSearchResults, setEditSearchResults] = useState<{managers: Manager[], restaurants: Restaurant[]}>({managers: [], restaurants: []});
  const [showEditSearchDropdown, setShowEditSearchDropdown] = useState(false);
  const [editSelectedTarget, setEditSelectedTarget] = useState<{type: 'manager' | 'restaurant', data: Manager | Restaurant} | null>(null);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  // subscriptions state removed - not currently used in UI
  const [searchResults, setSearchResults] = useState<{managers: Manager[], restaurants: Restaurant[]}>({managers: [], restaurants: []});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<{type: 'manager' | 'restaurant', data: Manager | Restaurant} | null>(null);
  const [payerMode, setPayerMode] = useState<'member' | 'external'>('member');
  const [externalPayer, setExternalPayer] = useState({ name: '', email: '', phone: '', company: '', address: '', tax_id: '' });
  const [showLinkAccountModal, setShowLinkAccountModal] = useState(false);
  const [linkSearchQuery, setLinkSearchQuery] = useState('');
  const [linkSearchResults, setLinkSearchResults] = useState<{managers: Manager[], restaurants: Restaurant[]}>({managers: [], restaurants: []});
  const [showLinkSearchDropdown, setShowLinkSearchDropdown] = useState(false);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [, setCurrencyConfig] = useState<CurrencyConfig>({});
  const [, setSupportedCurrencies] = useState<string[]>([]);
  const [invoiceCategories, setInvoiceCategories] = useState<InvoiceCategory[]>([]);
  const [additionalChargesMap, setAdditionalChargesMap] = useState<{ [currency: string]: Array<{ enabled: boolean; name: string; rate: number }> }>({});
  const [, setTaxSettings] = useState<{ enabled: boolean; rate: number; name: string }>({
    enabled: false,
    rate: 0,
    name: 'Tax'
  });
  const [paymentMethodWarning, setPaymentMethodWarning] = useState<string | null>(null);
  const [includeDemo, setIncludeDemo] = useState(false);
  const [generatingMissing, setGeneratingMissing] = useState(false);
  const [sortField, setSortField] = useState<'invoiceNumber' | 'companyName' | 'issueDate' | 'dueDate' | 'amount' | 'status'>('issueDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
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
    currency: '',
    discountType: 'none' as 'none' | 'percentage' | 'fixed',
    discountValue: '',
    discountReason: ''
  });

  // Calendar custom range handler
  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  // Period filter handler
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period));
  };

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

      const response = await fetch(`/api/invoices${includeDemo ? '?includeDemo=true' : ''}`, {
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

  // Fetch payment settings (additional charges including tax)
  const fetchPaymentSettings = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/admin/payment-settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        // Load additional charges — per-currency object or legacy array
        if (data.additionalCharges) {
          if (Array.isArray(data.additionalCharges)) {
            // Legacy flat array — treat as empty (no currency assignment)
            setAdditionalChargesMap({});
          } else {
            setAdditionalChargesMap(data.additionalCharges);
          }
          // taxSettings backward compat — find first enabled from any currency
          const allCharges = Array.isArray(data.additionalCharges)
            ? data.additionalCharges
            : Object.values(data.additionalCharges).flat();
          const firstEnabled = (allCharges as any[]).find((c: any) => c?.enabled);
          if (firstEnabled) {
            setTaxSettings({
              enabled: firstEnabled.enabled,
              rate: parseFloat(firstEnabled.rate) || 0,
              name: firstEnabled.name || 'Tax'
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching payment settings:', error);
    }
  };

  // Generate missing invoices (bulk)
  const handleGenerateMissingInvoices = async () => {
    setGeneratingMissing(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/invoices/generate-missing-bulk', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success) {
        setSuccessMessage(result.message);
        setShowSuccessModal(true);
        if (result.totalGenerated > 0) {
          fetchInvoices();
        }
      }
    } catch (error) {
      console.error('Error generating missing invoices:', error);
    } finally {
      setGeneratingMissing(false);
    }
  };

  // Fetch data on component mount and when demo toggle changes
  useEffect(() => {
    fetchInvoices();
    fetchManagers();
    fetchRestaurants();
    fetchCompanySettings();
    fetchCurrencyConfig();
    fetchInvoiceCategories();
    fetchPaymentSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [includeDemo]);

  // Get additionalCharges for a specific currency from the map (normalizes RM→MYR etc.)
  const getChargesForCurrency = (currency: string) => {
    const code = normalizeCurrencyCode(currency);
    return additionalChargesMap[code] || additionalChargesMap[currency] || [];
  };

  // Derive additionalCharges for the current new invoice currency
  const additionalCharges = getChargesForCurrency(newInvoice.currency);

  const fetchCurrencyConfig = async () => {
    try {
      // Fetch currency config
      const configRes = await fetch('/api/currencies/config');
      if (configRes.ok) {
        const data = await configRes.json();
        if (data.success && data.currencies) {
          setCurrencyConfig(data.currencies);
        }
      }

      // Fetch supported currencies
      const supportedRes = await fetch('/api/currencies/supported');
      if (supportedRes.ok) {
        const data = await supportedRes.json();
        if (data.success && data.data) {
          const currencies = data.data.map((c: { code: string }) => c.code);
          setSupportedCurrencies(currencies);
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

      // Fetch only General roles (Brand General, Foodcourt General)
      // Managers (Brand Manager, Foodcourt Manager) are support roles and don't receive invoices
      const [brandGeneralRes, foodcourtGeneralRes] = await Promise.all([
        fetch('/api/users?role=Brand General', { headers }),
        fetch('/api/users?role=Foodcourt General', { headers })
      ]);

      let allManagers: Manager[] = [];

      if (brandGeneralRes.ok) {
        const result = await brandGeneralRes.json();
        const data = result.success ? result.data : result;
        const transformed = data.map((user: any) => ({
          id: user.id.toString(),
          fullName: user.full_name || user.username,
          email: user.email,
          role: user.role,
          companyName: user.company_name || 'Brand General'
        }));
        allManagers = [...allManagers, ...transformed];
      }

      if (foodcourtGeneralRes.ok) {
        const result = await foodcourtGeneralRes.json();
        const data = result.success ? result.data : result;
        const transformed = data.map((user: any) => ({
          id: user.id.toString(),
          fullName: user.full_name || user.username,
          email: user.email,
          role: user.role,
          companyName: user.company_name || 'Foodcourt General'
        }));
        allManagers = [...allManagers, ...transformed];
      }

      console.log('Fetched managers (General only):', allManagers.length);
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
          address: restaurant.address || '',
          phone: restaurant.phone || '',
          email: restaurant.email || '',
          currency: restaurant.currency || 'MYR'
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

  // fetchSubscriptions removed - not currently used in UI

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

  const checkPaymentMethodsForCurrency = async (currency: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/admin/payment-settings/available/${currency}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (!data.methods || data.methods.length === 0) {
          setPaymentMethodWarning(`No payment methods configured for ${getCurrencySymbol(currency)}. Please set up payment methods in Payment Settings before sending this invoice.`);
          return;
        }
      }
    } catch (error) {
      console.error('Error checking payment methods:', error);
    }
    setPaymentMethodWarning(null);
  };

  const selectTarget = async (type: 'manager' | 'restaurant', data: Manager | Restaurant) => {
    setSelectedTarget({type, data});
    setShowSearchDropdown(false);
    setSearchQuery(type === 'manager' ? (data as Manager).fullName : (data as Restaurant).name);
    setPaymentMethodWarning(null);

    const token = localStorage.getItem('auth_token');
    let currency = 'USD'; // Default fallback if no currency configured

    // Auto-populate invoice data
    if (type === 'manager') {
      const manager = data as Manager;

      // Fetch currency from manager's brand or foodcourt
      try {
        const userRes = await fetch(`/api/users/${manager.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          const user = userData.success ? userData.data : userData;

          // Get currency from brand or foodcourt payment-settings
          if (user.brand_id) {
            const brandRes = await fetch(`/api/brands/${user.brand_id}/payment-settings`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (brandRes.ok) {
              const brandData = await brandRes.json();
              const data = brandData.data || brandData;
              // Use defaultCurrency from payment_settings first, then supported_currencies[0]
              const defaultCurrency = data.payment_settings?.defaultCurrency;
              const supported = data.supported_currencies;
              if (defaultCurrency) {
                currency = defaultCurrency;
              } else if (supported && supported.length > 0) {
                currency = supported[0];
              }
              console.log('Brand currency:', currency, 'defaultCurrency:', defaultCurrency, 'supported:', supported);
            }
          } else if (user.foodcourt_id) {
            const foodcourtRes = await fetch(`/api/foodcourts/${user.foodcourt_id}/payment-settings`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (foodcourtRes.ok) {
              const foodcourtData = await foodcourtRes.json();
              const data = foodcourtData.data || foodcourtData;
              // Use defaultCurrency from payment_settings first, then supported_currencies[0]
              const defaultCurrency = data.payment_settings?.defaultCurrency;
              const supported = data.supported_currencies;
              if (defaultCurrency) {
                currency = defaultCurrency;
              } else if (supported && supported.length > 0) {
                currency = supported[0];
              }
              console.log('Foodcourt currency:', currency, 'defaultCurrency:', defaultCurrency, 'supported:', supported);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching manager currency:', error);
      }

      setNewInvoice({
        ...newInvoice,
        managerId: manager.id,
        managerName: manager.fullName,
        companyName: manager.companyName || '',
        restaurantId: '',
        restaurantName: '',
        currency
      });
      await checkPaymentMethodsForCurrency(currency);
    } else {
      const restaurant = data as Restaurant;
      const manager = managers.find(m => m.id === restaurant.admin_id);

      // Fetch restaurant details to get currency
      try {
        const restRes = await fetch(`/api/restaurants/${restaurant.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (restRes.ok) {
          const restData = await restRes.json();
          currency = restData.currency || 'MYR';
        }
      } catch (error) {
        console.error('Error fetching restaurant currency:', error);
      }

      setNewInvoice({
        ...newInvoice,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        managerId: restaurant.admin_id,
        managerName: manager ? manager.fullName : '',
        companyName: restaurant.name,
        currency
      });
      await checkPaymentMethodsForCurrency(currency);
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
        .logo-section { flex: 1; max-width: 400px; }
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
                ${invoice.discountType && invoice.discountType !== 'none' && invoice.discountAmount > 0 ? `
                <div class="summary-row tax" style="color: #15803D;">
                    <span>Discount${invoice.discountType === 'percentage' ? ` (${invoice.discountValue}%)` : ''}:</span>
                    <span>-${formatCurrency(invoice.discountAmount, invoice.currency || 'MYR')}</span>
                </div>
                ` : ''}
                ${(invoice.additionalCharges || []).map(charge => `
                <div class="summary-row tax">
                    <span>${charge.name} (${charge.rate}%):</span>
                    <span>${formatCurrency(charge.amount, invoice.currency || 'MYR')}</span>
                </div>
                `).join('')}
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
      serviceDescription: '',
      currency: '',
      discountType: 'none' as 'none' | 'percentage' | 'fixed',
      discountValue: '',
      discountReason: ''
    });
    setSelectedTarget(null);
    setSearchQuery('');
    setShowSearchDropdown(false);
    setPayerMode('member');
    setExternalPayer({ name: '', email: '', phone: '', company: '', address: '', tax_id: '' });
  };

  // Helper functions for display (moved before filteredInvoices to avoid reference error)
  // Check if invoice is overdue based on due_date
  // Only pending_payment can be overdue (not paid, cancelled, draft, or payment_submitted)
  const isInvoiceOverdue = (invoice: Invoice): boolean => {
    // Only pending_payment status can become overdue
    if (invoice.status !== 'pending_payment') {
      return false;
    }
    const now = new Date();
    const dueDate = new Date(invoice.dueDate);
    return dueDate < now;
  };

  // Get effective status (considering overdue)
  const getEffectiveStatus = (invoice: Invoice): 'draft' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled' | 'active' | 'inactive' | '' => {
    if (isInvoiceOverdue(invoice)) {
      return 'overdue';
    }
    return invoice.status;
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
      case 'external': return 'Non-Member';
      default: return 'Restaurant Admin';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    // Universal search - searches all visible fields
    const term = searchTerm.toLowerCase();
    const statusText = getStatusDisplay(invoice.status).toLowerCase();
    const typeText = invoice.type === 'automatic' ? 'auto automatic' : 'manual';
    const planTypeText = (invoice.planType || '').toLowerCase();
    const categoryText = (invoice.categoryDisplayName || '').toLowerCase();
    const customerName = (invoice.customerName || invoice.restaurantName || '').toLowerCase();
    const payerTypeText = getPayerDisplay(invoice.payerType || 'restaurant').toLowerCase();

    const matchesSearch = !searchTerm ||
                         (invoice.companyName || '').toLowerCase().includes(term) ||
                         (invoice.invoiceNumber || '').toLowerCase().includes(term) ||
                         (invoice.managerName || '').toLowerCase().includes(term) ||
                         statusText.includes(term) ||
                         typeText.includes(term) ||
                         planTypeText.includes(term) ||
                         categoryText.includes(term) ||
                         customerName.includes(term) ||
                         payerTypeText.includes(term) ||
                         (invoice.billingPeriod || '').toLowerCase().includes(term);

    // Date range filter (based on issue date)
    let matchesDateRange = true;
    if (dateRange.start && dateRange.end) {
      const invoiceDate = new Date(invoice.issueDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      // Set time to start/end of day for accurate comparison
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      matchesDateRange = invoiceDate >= startDate && invoiceDate <= endDate;
    }

    return matchesSearch && matchesDateRange;
  }).sort((a, b) => {
    // Dynamic sorting based on sortField and sortDirection
    let comparison = 0;
    switch (sortField) {
      case 'invoiceNumber':
        comparison = a.invoiceNumber.localeCompare(b.invoiceNumber);
        break;
      case 'companyName':
        comparison = (a.companyName || '').localeCompare(b.companyName || '');
        break;
      case 'issueDate':
        comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
        break;
      case 'dueDate':
        comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        break;
      case 'amount':
        comparison = a.total - b.total;
        break;
      case 'status':
        comparison = (a.status || '').localeCompare(b.status || '');
        break;
      default:
        // Default: sort by issue date (newest first)
        comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
    }
    return sortDirection === 'desc' ? -comparison : comparison;
  });

  // Handle sort header click
  const handleSort = (field: 'invoiceNumber' | 'companyName' | 'issueDate' | 'dueDate' | 'amount' | 'status') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending for dates/amounts, ascending for text
      setSortField(field);
      setSortDirection(field === 'dueDate' || field === 'amount' ? 'desc' : 'asc');
    }
  };

  // Get sort indicator for header
  const getSortIndicator = (field: string) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const overdueInvoices = invoices.filter(i => isInvoiceOverdue(i)).length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY');
  };

  const handleCreateInvoice = () => {
    resetInvoiceForm();
    setShowCreateInvoiceModal(true);
  };

  const handleLinkSearch = (query: string) => {
    setLinkSearchQuery(query);
    if (!query.trim()) {
      setLinkSearchResults({managers: [], restaurants: []});
      return;
    }
    const q = query.toLowerCase();
    const filteredManagers = managers.filter(m =>
      m.fullName.toLowerCase().includes(q) || (m.companyName && m.companyName.toLowerCase().includes(q)) || m.email.toLowerCase().includes(q)
    ).slice(0, 5);
    const filteredRestaurants = restaurants.filter(r =>
      r.name.toLowerCase().includes(q) || (r.address && r.address.toLowerCase().includes(q))
    ).slice(0, 5);
    setLinkSearchResults({managers: filteredManagers, restaurants: filteredRestaurants});
  };

  const handleLinkAccount = async (targetType: 'restaurant' | 'manager', targetData: Restaurant | Manager) => {
    if (!selectedInvoice) return;
    try {
      const token = localStorage.getItem('auth_token');
      const linkData: any = {};
      if (targetType === 'restaurant') {
        linkData.restaurant_id = (targetData as Restaurant).id;
        linkData.payer_type = 'restaurant';
      } else {
        linkData.payer_id = (targetData as Manager).id;
        const manager = targetData as Manager;
        if (manager.role === 'Brand General' || manager.role === 'Brand Manager') {
          linkData.payer_type = 'brand_manager';
        } else if (manager.role === 'Foodcourt General' || manager.role === 'Foodcourt Manager') {
          linkData.payer_type = 'foodcourt_manager';
        } else {
          linkData.payer_type = 'restaurant';
        }
      }
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/link-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(linkData)
      });
      if (response.ok) {
        await fetchInvoices();
        setShowLinkAccountModal(false);
        setShowViewModal(false);
        setSuccessMessage('Invoice linked to member account successfully.');
        setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        alert(`Failed to link account: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error linking account:', error);
      alert('Error linking account. Please try again.');
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
      amount: (invoice.subtotalBeforeDiscount || invoice.amount).toString(),
      tax: invoice.tax.toString(),
      total: invoice.total.toString(),
      dueDate: invoice.dueDate ? invoice.dueDate.split('T')[0] : '',
      status: invoice.status,
      planType: invoice.planType,
      billingCycle: 'monthly',
      description: invoice.items?.[0]?.description || '',
      payerType: invoice.payerType || 'restaurant',
      payerId: invoice.payerId || '',
      items: invoice.items,
      currency: invoice.currency || operationSettings.currency || 'MYR',
      discountType: invoice.discountType || 'none',
      discountValue: invoice.discountValue ? invoice.discountValue.toString() : '',
      discountReason: invoice.discountReason || '',
      invoiceCategory: invoice.invoiceCategory || 'service',
      customDescription: invoice.customDescription || '',
      serviceDescription: invoice.serviceDescription || ''
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

    setEditModificationReason('');
    setEditSaveError(null);
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
        setSuccessMessage(`Failed to send invoice: ${errorData.error || 'Unknown error'}`);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      setSuccessMessage('Error sending invoice. Please try again.');
      setShowSuccessModal(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedInvoice || !editInvoice) return;

    setEditSaveError(null);

    // Require modification reason for automatic invoices
    if (selectedInvoice.type === 'automatic' && !editModificationReason.trim()) {
      setEditSaveError('Please enter a reason for modifying this invoice.');
      return;
    }

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
          payerType: editInvoice.payerType,
          payerId: editInvoice.payerId,
          items: editInvoice.items,
          discountType: editInvoice.discountType !== 'none' ? editInvoice.discountType : null,
          discountValue: editInvoice.discountType !== 'none' ? parseFloat(editInvoice.discountValue) || 0 : null,
          discountAmount: (() => {
            const amt = parseFloat(editInvoice.amount) || 0;
            const dv = parseFloat(editInvoice.discountValue) || 0;
            if (editInvoice.discountType === 'percentage') return amt * (dv / 100);
            if (editInvoice.discountType === 'fixed') return dv;
            return null;
          })(),
          discountReason: editInvoice.discountReason || null,
          subtotal: editInvoice.discountType !== 'none' ? parseFloat(editInvoice.amount) || 0 : null,
          additionalCharges: (() => {
            const amt = parseFloat(editInvoice.amount) || 0;
            const dv = parseFloat(editInvoice.discountValue) || 0;
            const da = editInvoice.discountType === 'percentage' ? amt * (dv / 100) : editInvoice.discountType === 'fixed' ? dv : 0;
            const afterDiscount = Math.max(0, amt - da);
            const editCharges = getChargesForCurrency(editInvoice.currency || '');
            return editCharges
              .filter((c: any) => c.enabled && c.name && c.rate > 0)
              .map((c: any) => ({ name: c.name, rate: c.rate, amount: Math.round(afterDiscount * c.rate / 100 * 100) / 100 }));
          })(),
          invoiceCategory: editInvoice.invoiceCategory,
          customDescription: editInvoice.customDescription,
          serviceDescription: editInvoice.serviceDescription,
          modificationReason: editModificationReason.trim() || undefined
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
        await fetchInvoices();
      } else {
        const errorData = await response.json();
        setEditSaveError(errorData.error || 'Failed to update invoice');
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
      setEditSaveError('Error updating invoice. Please try again.');
    }
  };

  const handleSubmitInvoice = async () => {
    if (payerMode === 'member' && (!selectedTarget || !newInvoice.amount || !newInvoice.dueDate)) {
      alert('Please select a manager/restaurant, enter amount, and set due date.');
      return;
    }
    if (payerMode === 'external' && (!externalPayer.name || !externalPayer.email || !newInvoice.amount || !newInvoice.dueDate)) {
      alert('Please fill in name, email, amount, and due date.');
      return;
    }

    try {
      const amount = parseFloat(newInvoice.amount);

      // Calculate discount
      const discountVal = parseFloat(newInvoice.discountValue) || 0;
      const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : newInvoice.discountType === 'fixed' ? discountVal : 0;
      const afterDiscount = Math.max(0, amount - discountAmt);

      // Calculate additional charges from payment settings (on discounted amount)
      const calculatedCharges = additionalCharges
        .filter(charge => charge.enabled && charge.name && charge.rate > 0)
        .map(charge => ({
          name: charge.name,
          rate: charge.rate,
          amount: Math.round(afterDiscount * charge.rate / 100 * 100) / 100
        }));

      const totalChargesAmount = calculatedCharges.reduce((sum, c) => sum + c.amount, 0);
      const total = afterDiscount + totalChargesAmount;

      // Prepare data for API
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

      if (payerMode === 'external') {
        customerName = externalPayer.name;
        companyName = externalPayer.company || externalPayer.name;
        const addressParts = [];
        if (externalPayer.address) addressParts.push(externalPayer.address);
        if (externalPayer.phone) addressParts.push(`Phone: ${externalPayer.phone}`);
        if (externalPayer.email) addressParts.push(`Email: ${externalPayer.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget?.type === 'restaurant') {
        const restaurant = selectedTarget.data as Restaurant;
        customerName = restaurant.name;
        companyName = restaurant.name;

        // Build full address from restaurant data
        const addressParts = [];
        if (restaurant.address) addressParts.push(restaurant.address);
        if (restaurant.phone) addressParts.push(`Phone: ${restaurant.phone}`);
        if (restaurant.email) addressParts.push(`Email: ${restaurant.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget?.type === 'manager') {
        const manager = selectedTarget.data as Manager;
        customerName = manager.fullName;
        companyName = manager.companyName || manager.fullName;

        // Build address from manager data
        const addressParts = [];
        if (manager.companyName) addressParts.push(manager.companyName);
        if (manager.email) addressParts.push(`Email: ${manager.email}`);
        customerAddress = addressParts.join('\n');
      }

      // Determine payer_type based on mode and manager's role
      let payerType = 'restaurant';
      if (payerMode === 'external') {
        payerType = 'external';
      } else if (selectedTarget?.type === 'manager') {
        const manager = selectedTarget.data as Manager;
        if (manager.role === 'Brand General' || manager.role === 'Brand Manager') {
          payerType = 'brand_manager';
        } else if (manager.role === 'Foodcourt General' || manager.role === 'Foodcourt Manager') {
          payerType = 'foodcourt_manager';
        }
      }

      const invoiceData: any = {
        restaurant_id: payerMode === 'external' ? null : (selectedTarget?.type === 'restaurant' ? (selectedTarget.data as Restaurant).id : null),
        payer_type: payerType,
        payer_id: payerMode === 'external' ? null : (selectedTarget?.type === 'manager' ? (selectedTarget.data as Manager).id : null),
        type: 'manual',
        billing_period_start: null,
        billing_period_end: null,
        due_date: new Date(newInvoice.dueDate).toISOString(),
        total_amount: total,
        subtotal_before_discount: discountAmt > 0 ? amount : null,
        discount_type: newInvoice.discountType !== 'none' ? newInvoice.discountType : null,
        discount_value: discountAmt > 0 ? discountVal : null,
        discount_amount: discountAmt > 0 ? discountAmt : null,
        discount_reason: newInvoice.discountReason || null,
        currency: newInvoice.currency || 'MYR',
        status: 'draft',
        notes: `${companyName}\n${customerName}\n${customerAddress}\n\n${description}`,
        issued_by: 1,
        issued_at: new Date().toISOString(),
        issuer_type: 'system_admin',
        invoice_category: newInvoice.invoiceCategory || 'service',
        additional_charges: calculatedCharges
      };

      if (payerMode === 'external') {
        invoiceData.external_payer_name = externalPayer.name;
        invoiceData.external_payer_email = externalPayer.email;
        invoiceData.external_payer_phone = externalPayer.phone || null;
        invoiceData.external_payer_company = externalPayer.company || null;
        invoiceData.external_payer_address = externalPayer.address || null;
        invoiceData.external_payer_tax_id = externalPayer.tax_id || null;
      }

      const items = [{
        item_type: newInvoice.invoiceCategory,
        description: description,
        calculation_method: 'fixed',
        fixed_amount: amount,
        calculated_amount: amount,
        tax_rate: 0,
        tax_amount: 0,
        total_amount: amount
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
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      } else {
        const errorData = await response.json();
        alert(`Failed to update payment status: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Error updating payment status. Please try again.');
    }
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
        window.dispatchEvent(new Event('refreshBadgeCounts'));
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
        window.dispatchEvent(new Event('refreshBadgeCounts'));
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
    <>
      <Container>
        <Header>
          <Title>Invoices</Title>
          <ActionSection>
            <Button
              variant="secondary"
              onClick={handleGenerateMissingInvoices}
              disabled={generatingMissing}
              style={{ opacity: generatingMissing ? 0.6 : 1 }}
            >
              {generatingMissing ? 'Generating...' : 'Generate Missing Invoices'}
            </Button>
          </ActionSection>
        </Header>
        <Content>

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

        <Tabs>
          <CommonTab active={activeTab === 'invoices'} onClick={() => handleTabChange('invoices')}>Invoices</CommonTab>
          <CommonTab active={activeTab === 'payment_submitted'} onClick={() => handleTabChange('payment_submitted')}>
            Payment Submitted
            <TabBadge count={invoices.filter(i => i.status === 'payment_submitted').length} variant="danger" />
          </CommonTab>
          <CommonTab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>Invoice Categories</CommonTab>
        </Tabs>

        {activeTab === 'invoices' && (
          <>
        <DatePeriodFilter
          activePeriod={activePeriod}
          dateRange={dateRange}
          isCustomDateRange={isCustomDateRange}
          onPeriodChange={handlePeriodChange}
          onCalendarRangeSelect={handleCalendarRangeSelect}
        >
            <SearchInput
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <DemoToggleLabel>
              <input
                type="checkbox"
                checked={includeDemo}
                onChange={(e) => setIncludeDemo(e.target.checked)}
              />
              Include Demo
            </DemoToggleLabel>

            <CreateButtonArea>
              <Button variant="primary" onClick={handleCreateInvoice}>Create Invoice</Button>
            </CreateButtonArea>
        </DatePeriodFilter>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left" style={{ cursor: 'pointer' }} onClick={() => handleSort('invoiceNumber')}>Invoice{getSortIndicator('invoiceNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left" style={{ cursor: 'pointer' }} onClick={() => handleSort('companyName')}>Customer{getSortIndicator('companyName')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Period</DataTableHeaderCell>
                <DataTableHeaderCell align="center">Issued</DataTableHeaderCell>
                <DataTableHeaderCell align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort('dueDate')}>Due{getSortIndicator('dueDate')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>Status{getSortIndicator('status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" style={{ cursor: 'pointer' }} onClick={() => handleSort('amount')}>Amount{getSortIndicator('amount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">Total</DataTableHeaderCell>
                <DataTableHeaderCell isActions>Actions</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <DataTableRow key={invoice.id}>
                  <DataTableCell data-label="Invoice" align="left">
                    <InvoiceInfo>
                      <InvoiceNumber>
                        {invoice.invoiceNumber}
                        {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>AUTO</AutoBadge>}
                      </InvoiceNumber>
                      <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                    </InvoiceInfo>
                  </DataTableCell>
                  <DataTableCell data-label="Customer" align="left">
                    <InvoiceInfo>
                      <InvoiceNumber>
                        {invoice.externalPayerName || invoice.customerName || invoice.restaurantName || 'Unknown'}
                        {invoice.isDemo && <DemoBadge>DEMO</DemoBadge>}
                        {invoice.payerType === 'external' && <span style={{ marginLeft: '6px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px', verticalAlign: 'middle' }}>Non-Member</span>}
                      </InvoiceNumber>
                      <CompanyName>{getPayerDisplay(invoice.payerType || 'restaurant')}</CompanyName>
                    </InvoiceInfo>
                  </DataTableCell>
                  <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>{invoice.billingPeriod || '-'}</DataTableCell>
                  <DataTableCell data-label="Issued" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</DataTableCell>
                  <DataTableCell data-label="Due" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</DataTableCell>
                  <DataTableCell data-label="Status" align="center">
                    <StatusBadge status={getEffectiveStatus(invoice)}>
                      {getStatusDisplay(getEffectiveStatus(invoice))}
                    </StatusBadge>
                    {invoice.isModified && (
                      <span style={{ display: 'inline-block', marginLeft: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#B45309', background: '#FEF3C7', borderRadius: '4px', verticalAlign: 'middle' }}>Modified</span>
                    )}
                  </DataTableCell>
                  <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>Free</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="" mobileFullWidth>
                    <ActionButtons>
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>
                      {invoice.status === 'draft' && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
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
                      {/* 미결제 상태: 편집, 다운로드, 프린트, 이메일발송, 삭제 */}
                      {(invoice.status === 'pending_payment' || invoice.status === '' || !invoice.status) && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
                          {Number(invoice.total) === 0 && (
                            <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>Mark Paid</LocalActionButton>
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

                      {/* 결제정보 확인중 상태: 결제확인, 다운로드, 프린트, 이메일발송 (편집불가) */}
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

                      {/* 연체 상태: 편집, 다운로드, 프린트, 이메일발송, 삭제 */}
                      {invoice.status === 'overdue' && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>Edit</LocalActionButton>
                          {Number(invoice.total) === 0 && (
                            <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>Mark Paid</LocalActionButton>
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
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>

          {filteredInvoices.length === 0 && (
            <DataTableEmpty>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No Invoices Found</div>
              <div style={{ fontSize: '14px' }}>
                {invoices.length === 0 ? 'Create your first invoice to get started' : 'Try adjusting your filters'}
              </div>
            </DataTableEmpty>
          )}
        </DataTableContainer>
          </>
        )}

        {activeTab === 'payment_submitted' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', margin: '0 0 8px 0' }}>
                Payment Confirmation Required
              </h3>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
                These invoices have payment submitted and are waiting for your confirmation.
              </p>
            </div>

            <DataTableContainer>
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">Invoice</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">Customer</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Payment Method</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">Submitted Date</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">Amount</DataTableHeaderCell>
                    <DataTableHeaderCell isActions>Actions</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {invoices.filter(i => i.status === 'payment_submitted').map(invoice => (
                    <DataTableRow key={invoice.id}>
                      <DataTableCell data-label="Invoice" align="left">
                        <InvoiceInfo>
                          <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                          <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                        </InvoiceInfo>
                      </DataTableCell>
                      <DataTableCell data-label="Customer" align="left">
                        <InvoiceInfo>
                          <InvoiceNumber>
                            {invoice.externalPayerName || invoice.customerName || invoice.restaurantName || 'Unknown'}
                            {invoice.payerType === 'external' && <span style={{ marginLeft: '6px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px', verticalAlign: 'middle' }}>Non-Member</span>}
                          </InvoiceNumber>
                          <CompanyName>{invoice.companyName}</CompanyName>
                        </InvoiceInfo>
                      </DataTableCell>
                      <DataTableCell data-label="Payment Method" align="center">
                        {invoice.paymentMethod || '-'}
                      </DataTableCell>
                      <DataTableCell data-label="Submitted" align="center">
                        {invoice.paidDate ? formatDate(invoice.paidDate) : '-'}
                      </DataTableCell>
                      <DataTableCell data-label="Amount" align="right">
                        <DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>Free</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount>
                      </DataTableCell>
                      <DataTableCell data-label="" mobileFullWidth>
                        <ActionButtons>
                          <LocalActionButton onClick={() => handleViewInvoice(invoice)}>View</LocalActionButton>
                          <LocalActionButton variant="primary" onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowPaymentConfirmModal(true);
                          }}>Confirm Payment</LocalActionButton>
                        </ActionButtons>
                      </DataTableCell>
                    </DataTableRow>
                  ))}
                </tbody>
              </DataTable>
              {invoices.filter(i => i.status === 'payment_submitted').length === 0 && (
                <DataTableEmpty>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                    No Pending Confirmations
                  </div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>
                    There are no invoices waiting for payment confirmation.
                  </div>
                </DataTableEmpty>
              )}
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
              <Button variant="primary" onClick={() => handleOpenCategoryModal()}>Add Category</Button>
            </HeaderRow>

            {invoiceCategories.length === 0 ? (
              <CategoryEmptyState>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0 0 8px 0' }}>No categories yet</h4>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>Create your first invoice category to get started.</p>
                <Button variant="primary" onClick={() => handleOpenCategoryModal()}>Add Category</Button>
              </CategoryEmptyState>
            ) : (
              <CategoryGrid>
                {invoiceCategories.map((category) => (
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
                      <CategoryIconButton
                        onClick={() => handleToggleCategoryActive(category)}
                        title={category.is_active ? 'Deactivate' : 'Activate'}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {category.is_active ? (
                            <>
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </>
                          ) : (
                            <>
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </>
                          )}
                        </svg>
                      </CategoryIconButton>
                      <CategoryIconButton onClick={() => handleOpenCategoryModal(category)} title="Edit Category">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </CategoryIconButton>
                      <CategoryIconButton onClick={() => handleDeleteCategoryClick(category)} title="Delete Category">
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

        {/* Category Modal */}
        {showCategoryModal && (
                    <CommonModal isOpen={true} onClose={handleCloseCategoryModal} title={editingCategory ? 'Edit Category' : 'Add Category'} footer={<><Button variant="secondary" type="button" onClick={handleCloseCategoryModal}>Cancel</Button><Button variant="primary" type="submit" disabled={savingCategory || !categoryFormData.name || !categoryFormData.code}> {savingCategory ? 'Saving...' : (editingCategory ? 'Update' : 'Create')} </Button></>}>

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
                
          </CommonModal>
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
                    <CommonModal isOpen={true} onClose={() => { setShowCreateInvoiceModal(false); resetInvoiceForm(); }} title="Create Invoice" footer={<>{paymentMethodWarning && ( <div style={{ padding: '10px 16px', background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', fontSize: '13px', color: '#92400E', marginBottom: '12px' }}> {paymentMethodWarning} </div> )} <Button variant="secondary" onClick={() => { setShowCreateInvoiceModal(false); resetInvoiceForm(); }}> Cancel </Button><Button variant="primary" onClick={handleSubmitInvoice} disabled={payerMode === 'member' ? (!selectedTarget || !newInvoice.amount || !newInvoice.dueDate) : (!externalPayer.name || !externalPayer.email || !newInvoice.amount || !newInvoice.dueDate)} > Create Invoice </Button></>}>

                <FormGroup>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid ' + (payerMode === 'member' ? '#635BFF' : '#E6EBF1'), borderRadius: '8px', cursor: 'pointer', background: payerMode === 'member' ? '#F0F0FF' : 'white', flex: 1 }}>
                      <input type="radio" name="payerMode" value="member" checked={payerMode === 'member'} onChange={() => { setPayerMode('member'); setExternalPayer({ name: '', email: '', phone: '', company: '', address: '', tax_id: '' }); }} />
                      Existing Member
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid ' + (payerMode === 'external' ? '#635BFF' : '#E6EBF1'), borderRadius: '8px', cursor: 'pointer', background: payerMode === 'external' ? '#F0F0FF' : 'white', flex: 1 }}>
                      <input type="radio" name="payerMode" value="external" checked={payerMode === 'external'} onChange={() => { setPayerMode('external'); setSelectedTarget(null); setSearchQuery(''); }} />
                      Non-Member
                    </label>
                  </div>

                  {payerMode === 'member' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <FormLabel>Non-Member Details</FormLabel>
                      <FormRow>
                        <FormGroup>
                          <FormLabel>Name *</FormLabel>
                          <FormInput type="text" value={externalPayer.name} onChange={(e) => setExternalPayer({...externalPayer, name: e.target.value})} placeholder="Full name" required />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Email *</FormLabel>
                          <FormInput type="email" value={externalPayer.email} onChange={(e) => setExternalPayer({...externalPayer, email: e.target.value})} placeholder="Email address" required />
                        </FormGroup>
                      </FormRow>
                      <FormRow>
                        <FormGroup>
                          <FormLabel>Phone</FormLabel>
                          <FormInput type="text" value={externalPayer.phone} onChange={(e) => setExternalPayer({...externalPayer, phone: e.target.value})} placeholder="Phone number" />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Company</FormLabel>
                          <FormInput type="text" value={externalPayer.company} onChange={(e) => setExternalPayer({...externalPayer, company: e.target.value})} placeholder="Company name" />
                        </FormGroup>
                      </FormRow>
                      <FormRow>
                        <FormGroup>
                          <FormLabel>Address</FormLabel>
                          <FormInput type="text" value={externalPayer.address} onChange={(e) => setExternalPayer({...externalPayer, address: e.target.value})} placeholder="Address" />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Tax ID</FormLabel>
                          <FormInput type="text" value={externalPayer.tax_id} onChange={(e) => setExternalPayer({...externalPayer, tax_id: e.target.value})} placeholder="Tax ID" />
                        </FormGroup>
                      </FormRow>
                    </>
                  )}
                </FormGroup>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Amount{newInvoice.currency ? ` (${getCurrencySymbol(newInvoice.currency)})` : ''} *</FormLabel>
                    <FormInput
                      type="number"
                      step={newInvoice.currency ? (getCurrencyDecimals(newInvoice.currency) === 0 ? '1' : '0.01') : '0.01'}
                      min="0"
                      value={newInvoice.amount}
                      onChange={(e) => {
                        const amount = parseFloat(e.target.value) || 0;
                        const discountVal = parseFloat(newInvoice.discountValue) || 0;
                        const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : newInvoice.discountType === 'fixed' ? discountVal : 0;
                        const afterDiscount = Math.max(0, amount - discountAmt);
                        const chargesTotal = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + (afterDiscount * c.rate / 100), 0);
                        const total = afterDiscount + chargesTotal;
                        setNewInvoice({ ...newInvoice, amount: e.target.value, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
                      }}
                      onBlur={(e) => {
                        if (e.target.value && newInvoice.currency) {
                          const decimals = getCurrencyDecimals(newInvoice.currency);
                          const amount = parseFloat(e.target.value) || 0;
                          const formattedAmount = amount.toFixed(decimals);
                          const discountVal = parseFloat(newInvoice.discountValue) || 0;
                          const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : newInvoice.discountType === 'fixed' ? discountVal : 0;
                          const afterDiscount = Math.max(0, amount - discountAmt);
                          const chargesTotal = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + (afterDiscount * c.rate / 100), 0);
                          const total = afterDiscount + chargesTotal;
                          setNewInvoice({ ...newInvoice, amount: formattedAmount, tax: chargesTotal.toFixed(decimals), total: total.toFixed(decimals) });
                        }
                      }}
                      placeholder={newInvoice.currency ? (getCurrencyDecimals(newInvoice.currency) === 0 ? '0' : '0.00') : '0.00'}
                      required
                      disabled={payerMode === 'member' && !selectedTarget}
                    />
                    {payerMode === 'member' && !selectedTarget && (
                      <span style={{fontSize: '12px', color: '#6B7C93', marginTop: '4px', display: 'block'}}>
                        Select a manager or restaurant first
                      </span>
                    )}
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

                <FormRow>
                  <FormGroup>
                    <FormLabel>Discount</FormLabel>
                    <FormSelect
                      value={newInvoice.discountType}
                      onChange={(e) => {
                        const dtype = e.target.value as 'none' | 'percentage' | 'fixed';
                        const amount = parseFloat(newInvoice.amount) || 0;
                        const discountVal = dtype === 'none' ? 0 : (parseFloat(newInvoice.discountValue) || 0);
                        const discountAmt = dtype === 'percentage' ? amount * (discountVal / 100) : dtype === 'fixed' ? discountVal : 0;
                        const afterDiscount = Math.max(0, amount - discountAmt);
                        const chargesTotal = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + (afterDiscount * c.rate / 100), 0);
                        const total = afterDiscount + chargesTotal;
                        setNewInvoice({ ...newInvoice, discountType: dtype, discountValue: dtype === 'none' ? '' : newInvoice.discountValue, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
                      }}
                    >
                      <option value="none">No Discount</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </FormSelect>
                  </FormGroup>
                  {newInvoice.discountType !== 'none' && (
                    <FormGroup>
                      <FormLabel>{newInvoice.discountType === 'percentage' ? 'Discount (%)' : 'Discount Amount'}</FormLabel>
                      <FormInput
                        type="number"
                        step="0.01"
                        min="0"
                        max={newInvoice.discountType === 'percentage' ? '100' : undefined}
                        value={newInvoice.discountValue}
                        onChange={(e) => {
                          const amount = parseFloat(newInvoice.amount) || 0;
                          const discountVal = parseFloat(e.target.value) || 0;
                          const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : discountVal;
                          const afterDiscount = Math.max(0, amount - discountAmt);
                          const chargesTotal = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + (afterDiscount * c.rate / 100), 0);
                          const total = afterDiscount + chargesTotal;
                          setNewInvoice({ ...newInvoice, discountValue: e.target.value, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
                        }}
                        placeholder="0"
                      />
                    </FormGroup>
                  )}
                  {newInvoice.discountType !== 'none' && (
                    <FormGroup>
                      <FormLabel>Discount Reason</FormLabel>
                      <FormInput
                        type="text"
                        value={newInvoice.discountReason}
                        onChange={(e) => setNewInvoice({ ...newInvoice, discountReason: e.target.value })}
                        placeholder="e.g. Loyalty discount"
                      />
                    </FormGroup>
                  )}
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

                {/* Show item/description input for all non-subscription categories */}
                {(newInvoice.invoiceCategory || 'service') !== 'subscription' && (
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
                      rows={2}
                    />
                  </FormGroup>
                )}
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{newInvoice.currency ? formatCurrency(parseFloat(newInvoice.amount || '0'), newInvoice.currency) : '-'}</span>
                  </SummaryRow>
                  {newInvoice.discountType !== 'none' && parseFloat(newInvoice.discountValue || '0') > 0 && (() => {
                    const amt = parseFloat(newInvoice.amount || '0');
                    const dv = parseFloat(newInvoice.discountValue || '0');
                    const discountAmt = newInvoice.discountType === 'percentage' ? amt * (dv / 100) : dv;
                    return (
                      <SummaryRow>
                        <span style={{ color: '#15803D' }}>Discount{newInvoice.discountType === 'percentage' ? ` (${dv}%)` : ''}:</span>
                        <span style={{ color: '#15803D' }}>-{newInvoice.currency ? formatCurrency(discountAmt, newInvoice.currency) : '-'}</span>
                      </SummaryRow>
                    );
                  })()}
                  {additionalCharges.filter(c => c.enabled && c.name && c.rate > 0).map((charge, idx) => {
                    const amt = parseFloat(newInvoice.amount || '0');
                    const dv = parseFloat(newInvoice.discountValue || '0');
                    const discountAmt = newInvoice.discountType === 'percentage' ? amt * (dv / 100) : newInvoice.discountType === 'fixed' ? dv : 0;
                    const afterDiscount = Math.max(0, amt - discountAmt);
                    const chargeAmount = afterDiscount * (charge.rate / 100);
                    return (
                      <SummaryRow key={idx}>
                        <span>{charge.name} ({charge.rate}%):</span>
                        <span>{newInvoice.currency ? formatCurrency(chargeAmount, newInvoice.currency) : '-'}</span>
                      </SummaryRow>
                    );
                  })}
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{newInvoice.currency ? formatCurrency(parseFloat(newInvoice.total || '0'), newInvoice.currency) : '-'}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>
              
          </CommonModal>
        )}

        {/* View Invoice Modal */}
        {showViewModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowViewModal(false)} title="Invoice Details" size="large" footer={<><Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button></>}>

                {/* Invoice Header with Company Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #E5E7EB' }}>
                  <div style={{ flex: '0 0 55%' }}>
                    {companySettings?.companyLogo && (
                      <img src={companySettings.companyLogo} alt="Company Logo" style={{ maxHeight: '60px', marginBottom: '8px' }} />
                    )}
                    <div style={{ fontSize: companySettings?.companyLogo ? '16px' : '20px', fontWeight: '700', color: '#0A2540', marginBottom: '8px' }}>
                      {companySettings?.companyName || 'Company Name'}
                    </div>
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
                    {selectedInvoice.isModified && (
                      <span style={{ display: 'inline-block', marginTop: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, color: '#B45309', background: '#FEF3C7', borderRadius: '4px' }}>Modified</span>
                    )}
                  </div>
                </div>

                {/* Bill To + Dates Section (Side by Side) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  {/* Bill To */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Bill To</div>
                    {selectedInvoice.payerType === 'external' ? (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{selectedInvoice.externalPayerName || selectedInvoice.customerName}</div>
                          <span style={{ padding: '2px 8px', fontSize: '11px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px' }}>Non-Member</span>
                        </div>
                        {selectedInvoice.externalPayerCompany && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Company: {selectedInvoice.externalPayerCompany}</div>
                        )}
                        {selectedInvoice.externalPayerEmail && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Email: {selectedInvoice.externalPayerEmail}</div>
                        )}
                        {selectedInvoice.externalPayerPhone && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Phone: {selectedInvoice.externalPayerPhone}</div>
                        )}
                        {selectedInvoice.externalPayerAddress && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{selectedInvoice.externalPayerAddress}</div>
                        )}
                        {selectedInvoice.externalPayerTaxId && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Tax ID: {selectedInvoice.externalPayerTaxId}</div>
                        )}
                        <button
                          onClick={() => { setShowLinkAccountModal(true); setLinkSearchQuery(''); setLinkSearchResults({managers: [], restaurants: []}); }}
                          style={{ marginTop: '10px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: '#635BFF', background: '#F0F0FF', border: '1px solid #635BFF', borderRadius: '6px', cursor: 'pointer' }}
                        >
                          Link to Member Account
                        </button>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{selectedInvoice.customerName}</div>
                        {selectedInvoice.customerAddress && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{selectedInvoice.customerAddress}</div>
                        )}
                        {selectedInvoice.payerType === 'restaurant' && selectedInvoice.restaurantName && selectedInvoice.restaurantName !== 'Unknown Restaurant' && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Restaurant: {selectedInvoice.restaurantName}</div>
                        )}
                        {selectedInvoice.companyName && selectedInvoice.companyName !== selectedInvoice.customerName && (
                          <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Company: {selectedInvoice.companyName}</div>
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
                        <span>{formatCurrency(selectedInvoice.subtotalBeforeDiscount || selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</span>
                      </SummaryRow>
                      {selectedInvoice.discountType && selectedInvoice.discountType !== 'none' && selectedInvoice.discountAmount > 0 && (
                        <SummaryRow>
                          <span style={{color: '#15803D'}}>Discount{selectedInvoice.discountType === 'percentage' ? ` (${selectedInvoice.discountValue}%)` : ''}:</span>
                          <span style={{color: '#15803D'}}>-{formatCurrency(selectedInvoice.discountAmount, selectedInvoice.currency || 'MYR')}</span>
                        </SummaryRow>
                      )}
                      {(selectedInvoice.additionalCharges || []).map((charge: any, idx: number) => (
                        <SummaryRow key={idx}>
                          <span>{charge.name} ({charge.rate}%):</span>
                          <span>{formatCurrency(charge.amount, selectedInvoice.currency || 'MYR')}</span>
                        </SummaryRow>
                      ))}
                      {(selectedInvoice.additionalCharges || []).length === 0 && selectedInvoice.tax > 0 && (
                        <SummaryRow>
                          <span>Tax:</span>
                          <span>{formatCurrency(selectedInvoice.tax, selectedInvoice.currency || 'MYR')}</span>
                        </SummaryRow>
                      )}
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

                {/* Modification History in View Modal */}
                {selectedInvoice.isModified && selectedInvoice.modificationHistory && selectedInvoice.modificationHistory.length > 0 && (
                  <div style={{ marginTop: '20px', padding: '16px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', marginBottom: '12px' }}>Modification History</div>
                    {selectedInvoice.modificationHistory.map((mod, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: '#78350F', marginBottom: idx < selectedInvoice.modificationHistory!.length - 1 ? '10px' : '0', paddingBottom: idx < selectedInvoice.modificationHistory!.length - 1 ? '10px' : '0', borderBottom: idx < selectedInvoice.modificationHistory!.length - 1 ? '1px solid #FDE68A' : 'none' }}>
                        <div style={{ fontWeight: 500 }}>{new Date(mod.modified_at).toLocaleString()} - {mod.modified_by_name}</div>
                        {mod.reason && <div style={{ marginTop: '3px' }}>Reason: {mod.reason}</div>}
                        {Object.keys(mod.changes).length > 0 && (
                          <div style={{ marginTop: '3px', color: '#92400E' }}>
                            {Object.entries(mod.changes).map(([field, change]) => (
                              <div key={field}>{field}: {String(change.from)} → {String(change.to)}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              
          </CommonModal>
        )}

        {/* Link Account Modal */}
        {showLinkAccountModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowLinkAccountModal(false)} title="Link to Member Account" footer={<Button variant="secondary" onClick={() => setShowLinkAccountModal(false)}>Cancel</Button>}>
            <FormGroup>
              <FormLabel>Search Member *</FormLabel>
              <div style={{position: 'relative'}}>
                <FormInput
                  type="text"
                  value={linkSearchQuery}
                  onChange={(e) => handleLinkSearch(e.target.value)}
                  onFocus={() => setShowLinkSearchDropdown(true)}
                  onBlur={() => setTimeout(() => setShowLinkSearchDropdown(false), 200)}
                  placeholder="Type to search for managers or restaurants"
                />
                {showLinkSearchDropdown && (linkSearchResults.managers.length > 0 || linkSearchResults.restaurants.length > 0) && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #E6EBF1', borderRadius: '8px', maxHeight: '300px', overflowY: 'auto', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    {linkSearchResults.managers.length > 0 && (
                      <div>
                        <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>MANAGERS</div>
                        {linkSearchResults.managers.map(manager => (
                          <div key={manager.id} onClick={() => handleLinkAccount('manager', manager)} style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid #F3F4F6' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                            <div style={{fontWeight: '500', color: '#0A2540'}}>{manager.fullName}</div>
                            <div style={{fontSize: '13px', color: '#6B7280'}}>{manager.companyName || manager.email} - {manager.role}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {linkSearchResults.restaurants.length > 0 && (
                      <div>
                        <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>RESTAURANTS</div>
                        {linkSearchResults.restaurants.map(restaurant => (
                          <div key={restaurant.id} onClick={() => handleLinkAccount('restaurant', restaurant)} style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid #F3F4F6' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                            <div style={{fontWeight: '500', color: '#0A2540'}}>{restaurant.name}</div>
                            <div style={{fontSize: '13px', color: '#6B7280'}}>{restaurant.address || 'No address'}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={{ marginTop: '12px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', fontSize: '13px', color: '#92400E' }}>
                This will convert the non-member invoice to a member invoice and link it to the selected account.
              </div>
            </FormGroup>
          </CommonModal>
        )}

        {/* Payment Confirmation Modal */}
        {showPaymentConfirmModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowPaymentConfirmModal(false)} title={`Confirm Payment - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={() => setShowPaymentConfirmModal(false)}> Cancel </Button><Button variant="primary" onClick={handleMarkAsPaid}> Confirm Payment Received </Button></>}>

                <FormGroup>
                  <FormLabel>Invoice Summary</FormLabel>
                  <InvoiceSummary>
                    <SummaryRow>
                      <span>Customer:</span>
                      <span>{selectedInvoice.customerName || selectedInvoice.managerName}</span>
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
                      <span><strong>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</strong></span>
                    </SummaryRow>
                  </InvoiceSummary>
                </FormGroup>

                {/* Customer's Payment Information */}
                {selectedInvoice.hasPaymentInfo && (
                  <FormGroup>
                    <FormLabel>Customer's Payment Information</FormLabel>
                    <div style={{
                      background: '#EFF6FF',
                      border: '1px solid #3B82F6',
                      borderRadius: '8px',
                      padding: '16px'
                    }}>
                      <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                        <p style={{ margin: '0 0 8px 0' }}>
                          <strong>Payment Method:</strong> {
                            selectedInvoice.paymentMethod === 'bank_transfer' ? 'Bank Transfer' :
                            selectedInvoice.paymentMethod === 'qr_payment' ? 'QR Payment' :
                            selectedInvoice.paymentMethod === 'stripe' ? 'Stripe' :
                            selectedInvoice.paymentMethod === 'paypal' ? 'PayPal' :
                            selectedInvoice.paymentMethod || 'Not specified'
                          }
                        </p>
                        {selectedInvoice.transactionId && (
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Transaction ID:</strong> {selectedInvoice.transactionId}
                          </p>
                        )}
                      </div>

                      {/* Receipt Image */}
                      {selectedInvoice.receiptUrl && (
                        <div style={{ marginTop: '12px' }}>
                          <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>Payment Receipt:</p>
                          <div style={{ textAlign: 'center', background: 'white', padding: '12px', borderRadius: '8px' }}>
                            <img
                              src={selectedInvoice.receiptUrl}
                              alt="Payment Receipt"
                              style={{
                                maxWidth: '100%',
                                maxHeight: '300px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => window.open(selectedInvoice.receiptUrl, '_blank')}
                            />
                            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>
                              Click image to view full size
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </FormGroup>
                )}

                <div style={{
                  background: '#FEF3C7',
                  border: '1px solid #F59E0B',
                  borderRadius: '8px',
                  padding: '16px',
                  margin: '16px 0'
                }}>
                  <p style={{ margin: 0, color: '#92400E', fontSize: '14px' }}>
                    <strong>Confirm Payment Receipt</strong><br />
                    Only mark this invoice as paid if you have received and verified the payment.
                    This action will update the invoice status to "Paid".
                  </p>
                </div>

                <FormGroup>
                  <FormLabel>Status Change</FormLabel>
                  <div style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#374151',
                    background: '#F8FAFC',
                    padding: '12px',
                    borderRadius: '6px'
                  }}>
                    Payment Submitted → Paid<br />
                    Paid Date: {new Date().toLocaleDateString('en-MY')}
                  </div>
                </FormGroup>
              
          </CommonModal>
        )}

        {/* Edit Invoice Modal */}
        {showEditModal && selectedInvoice && editInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title={`Edit Invoice - ${selectedInvoice.invoiceNumber}`} footer={<>{editSaveError && ( <div style={{ width: '100%', padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', color: '#DC2626', fontSize: '13px' }}> {editSaveError} </div> )} <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}><Button variant="secondary" onClick={() => setShowEditModal(false)}> Cancel </Button><Button variant="primary" onClick={handleSaveEdit}> Save Changes </Button></div></>}>

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
                    <FormLabel>Amount ({editInvoice.currency || operationSettings.currency || 'MYR'})</FormLabel>
                    <FormInput
                      type="number"
                      value={editInvoice.amount}
                      onChange={(e) => {
                        const amount = parseFloat(e.target.value) || 0;
                        const discountVal = parseFloat(editInvoice.discountValue) || 0;
                        const discountAmt = editInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : editInvoice.discountType === 'fixed' ? discountVal : 0;
                        const afterDiscount = Math.max(0, amount - discountAmt);
                        const editCharges = getChargesForCurrency(editInvoice.currency || '');
                        const chargesTotal = editCharges
                          .filter((c: any) => c.enabled && c.rate > 0)
                          .reduce((sum: number, c: any) => sum + (afterDiscount * c.rate / 100), 0);
                        const total = afterDiscount + chargesTotal;
                        setEditInvoice({
                          ...editInvoice,
                          amount: e.target.value,
                          tax: chargesTotal.toFixed(2),
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

                <FormRow>
                  <FormGroup>
                    <FormLabel>Discount</FormLabel>
                    <FormSelect
                      value={editInvoice.discountType}
                      onChange={(e) => {
                        const dtype = e.target.value as 'none' | 'percentage' | 'fixed';
                        const amount = parseFloat(editInvoice.amount) || 0;
                        const discountVal = dtype === 'none' ? 0 : (parseFloat(editInvoice.discountValue) || 0);
                        const discountAmt = dtype === 'percentage' ? amount * (discountVal / 100) : dtype === 'fixed' ? discountVal : 0;
                        const afterDiscount = Math.max(0, amount - discountAmt);
                        const editCharges = getChargesForCurrency(editInvoice.currency || '');
                        const chargesTotal = editCharges.filter((c: any) => c.enabled && c.rate > 0).reduce((sum: number, c: any) => sum + (afterDiscount * c.rate / 100), 0);
                        const total = afterDiscount + chargesTotal;
                        setEditInvoice({ ...editInvoice, discountType: dtype, discountValue: dtype === 'none' ? '' : editInvoice.discountValue, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
                      }}
                    >
                      <option value="none">No Discount</option>
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount</option>
                    </FormSelect>
                  </FormGroup>
                  {editInvoice.discountType !== 'none' && (
                    <FormGroup>
                      <FormLabel>{editInvoice.discountType === 'percentage' ? 'Discount (%)' : 'Discount Amount'}</FormLabel>
                      <FormInput
                        type="number"
                        step="0.01"
                        min="0"
                        max={editInvoice.discountType === 'percentage' ? '100' : undefined}
                        value={editInvoice.discountValue}
                        onChange={(e) => {
                          const amount = parseFloat(editInvoice.amount) || 0;
                          const discountVal = parseFloat(e.target.value) || 0;
                          const discountAmt = editInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : discountVal;
                          const afterDiscount = Math.max(0, amount - discountAmt);
                          const editCharges = getChargesForCurrency(editInvoice.currency || '');
                          const chargesTotal = editCharges.filter((c: any) => c.enabled && c.rate > 0).reduce((sum: number, c: any) => sum + (afterDiscount * c.rate / 100), 0);
                          const total = afterDiscount + chargesTotal;
                          setEditInvoice({ ...editInvoice, discountValue: e.target.value, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
                        }}
                        placeholder="0"
                      />
                    </FormGroup>
                  )}
                  {editInvoice.discountType !== 'none' && (
                    <FormGroup>
                      <FormLabel>Discount Reason</FormLabel>
                      <FormInput
                        type="text"
                        value={editInvoice.discountReason}
                        onChange={(e) => setEditInvoice({ ...editInvoice, discountReason: e.target.value })}
                        placeholder="e.g. Loyalty discount"
                      />
                    </FormGroup>
                  )}
                </FormRow>

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

                {/* Show item/description input for all non-subscription categories */}
                {(editInvoice.invoiceCategory || 'service') !== 'subscription' && (
                  <FormGroup>
                    <FormLabel>Item/Description</FormLabel>
                    <FormTextarea
                      value={editInvoice.invoiceCategory === 'others' ? (editInvoice.customDescription || '') : (editInvoice.serviceDescription || '')}
                      onChange={(e) => {
                        if (editInvoice.invoiceCategory === 'others') {
                          setEditInvoice({...editInvoice, customDescription: e.target.value});
                        } else {
                          setEditInvoice({...editInvoice, serviceDescription: e.target.value});
                        }
                      }}
                      placeholder={`Enter ${editInvoice.invoiceCategory || 'service'} description...`}
                      rows={2}
                    />
                  </FormGroup>
                )}

                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{editInvoice.currency ? formatCurrency(parseFloat(editInvoice.amount || '0'), editInvoice.currency) : '-'}</span>
                  </SummaryRow>
                  {editInvoice.discountType !== 'none' && parseFloat(editInvoice.discountValue || '0') > 0 && (() => {
                    const amt = parseFloat(editInvoice.amount || '0');
                    const dv = parseFloat(editInvoice.discountValue || '0');
                    const da = editInvoice.discountType === 'percentage' ? amt * (dv / 100) : dv;
                    return (
                      <SummaryRow>
                        <span style={{ color: '#DC2626' }}>Discount ({editInvoice.discountType === 'percentage' ? `${dv}%` : 'Fixed'}):</span>
                        <span style={{ color: '#DC2626' }}>-{editInvoice.currency ? formatCurrency(da, editInvoice.currency) : da.toFixed(2)}</span>
                      </SummaryRow>
                    );
                  })()}
                  {getChargesForCurrency(editInvoice.currency || '').filter((c: any) => c.enabled && c.name && c.rate > 0).map((charge: any, idx: number) => {
                    const amt = parseFloat(editInvoice.amount || '0');
                    const dv = parseFloat(editInvoice.discountValue || '0');
                    const da = editInvoice.discountType === 'percentage' ? amt * (dv / 100) : editInvoice.discountType === 'fixed' ? dv : 0;
                    const afterDiscount = Math.max(0, amt - da);
                    const chargeAmount = afterDiscount * charge.rate / 100;
                    return (
                      <SummaryRow key={idx}>
                        <span>{charge.name} ({charge.rate}%):</span>
                        <span>{editInvoice.currency ? formatCurrency(chargeAmount, editInvoice.currency) : '-'}</span>
                      </SummaryRow>
                    );
                  })}
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{editInvoice.currency ? formatCurrency(parseFloat(editInvoice.total || '0'), editInvoice.currency) : '-'}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>

                {/* Modification Reason */}
                <FormGroup style={{ marginTop: '16px' }}>
                  <FormLabel>Modification Reason {selectedInvoice?.type === 'automatic' && <span style={{ color: '#EF4444' }}>*</span>}</FormLabel>
                  <FormTextarea
                    value={editModificationReason}
                    onChange={(e) => setEditModificationReason(e.target.value)}
                    placeholder="Enter reason for modification..."
                    rows={2}
                  />
                </FormGroup>

                {/* Previous Modification History */}
                {selectedInvoice?.modificationHistory && selectedInvoice.modificationHistory.length > 0 && (
                  <div style={{ marginTop: '16px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#92400E', marginBottom: '8px' }}>Modification History</div>
                    {selectedInvoice.modificationHistory.map((mod, idx) => (
                      <div key={idx} style={{ fontSize: '12px', color: '#78350F', marginBottom: idx < selectedInvoice.modificationHistory!.length - 1 ? '8px' : '0', paddingBottom: idx < selectedInvoice.modificationHistory!.length - 1 ? '8px' : '0', borderBottom: idx < selectedInvoice.modificationHistory!.length - 1 ? '1px solid #FDE68A' : 'none' }}>
                        <div style={{ fontWeight: 500 }}>{new Date(mod.modified_at).toLocaleString()} - {mod.modified_by_name}</div>
                        {mod.reason && <div style={{ marginTop: '2px' }}>Reason: {mod.reason}</div>}
                        {Object.keys(mod.changes).length > 0 && (
                          <div style={{ marginTop: '2px', color: '#92400E' }}>
                            {Object.entries(mod.changes).map(([field, change]) => (
                              <span key={field} style={{ marginRight: '8px' }}>{field}: {String(change.from)} → {String(change.to)}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              
          </CommonModal>
        )}

        {/* Send Invoice Confirmation Modal */}
        {showSendConfirmModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowSendConfirmModal(false)} title="Send Invoice" footer={<><Button variant="secondary" onClick={() => setShowSendConfirmModal(false)}> Cancel </Button><Button variant="success" onClick={confirmSendInvoice}> Confirm </Button></>}>

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
                    Are you sure you want to send invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.managerName || selectedInvoice.customerName}</strong>?
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
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.managerName || selectedInvoice.customerName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#6B7280' }}>Company:</span>
                      <span style={{ fontWeight: '500' }}>{selectedInvoice.customerName}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#6B7280' }}>Amount:</span>
                      <span style={{ fontWeight: '600', color: '#059669' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span>
                    </div>
                  </div>
                </div>
              
          </CommonModal>
        )}

        {/* Resend Invoice Confirmation Modal */}
        {showResendConfirmModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowResendConfirmModal(false)} title="Resend Invoice" footer={<><Button variant="secondary" onClick={() => setShowResendConfirmModal(false)}> Cancel </Button><Button variant="primary" onClick={confirmResendInvoice}> Resend Invoice </Button></>}>

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
              
          </CommonModal>
        )}

        {/* Cancel Invoice Confirmation Modal */}
        {showCancelConfirmModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowCancelConfirmModal(false)} title="Cancel Invoice" footer={<><Button variant="secondary" onClick={() => setShowCancelConfirmModal(false)}> Keep Invoice </Button><Button variant="primary" onClick={confirmCancelInvoice} style={{ background: '#EF4444', borderColor: '#EF4444' }} > Cancel Invoice </Button></>}>

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
                      <span style={{ fontWeight: '600', color: '#DC2626' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span>
                    </div>
                  </div>
                </div>
              
          </CommonModal>
        )}

        {/* Delete Invoice Confirmation Modal */}
        {showDeleteConfirmModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowDeleteConfirmModal(false)} title="Delete Invoice" footer={<><Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}> Keep Invoice </Button><Button variant="primary" onClick={confirmDeleteInvoice} style={{ background: '#EF4444', borderColor: '#EF4444' }} > Delete Invoice </Button></>}>

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
              
          </CommonModal>
        )}

        {/* Email Invoice Modal */}
        {showEmailModal && emailInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowEmailModal(false)} title="Send Invoice via Email" footer={<><Button variant="secondary" onClick={() => { setShowEmailModal(false); setEmailInvoice(null); setEmailRecipient(''); }}> Cancel </Button><Button variant="primary" onClick={handleSendInvoiceEmail} disabled={!emailRecipient || !emailRecipient.includes('@')} > Send Email </Button></>}>

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
              
          </CommonModal>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
                    <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Success" footer={<><Button variant="primary" onClick={() => setShowSuccessModal(false)}> OK </Button></>}>

                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{
                    fontSize: '16px',
                    color: '#0A2540',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>{successMessage}</p>
                </div>
              
          </CommonModal>
        )}

        {/* Download Success Modal */}
        </Content>
      </Container>
    </>
  );
};

export default InvoicesPage;