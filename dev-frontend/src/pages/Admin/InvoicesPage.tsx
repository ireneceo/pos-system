import React, { useState, useEffect, useCallback } from 'react';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
import { useSearchParams } from 'react-router-dom';
import { formatCurrency, getCurrencyDecimals, normalizeCurrencyCode, getCurrencySymbol } from '../../utils/currency';
import { formatAddressHtml, AppLocale } from '../../utils/formatAddress';
import InvoiceHistoryModal from '../../components/Invoice/InvoiceHistoryModal';
import { useStore } from '../../contexts/StoreContext';
import { formatDateTime } from '../../utils/timezone';
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
  ActionButtons,
  Modal as CommonModal,
} from '../../components/UI';
import { SearchInput } from '../../components/Common/FilterComponents';
import { Tabs, Tab as CommonTab, Badge as TabBadge } from '../../components/Common/TabComponents';
import { renderIframeToPdf, INVOICE_PRINT_CSS } from '../../utils/invoicePdf';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

// Split sub-components
import { Invoice, CurrencyConfig, Manager, Restaurant, InvoiceCategory, CompanySettings, TabType } from './invoices/types';
import {
  Button,
  InvoiceInfo,
  InvoiceNumber,
  CompanyName,
  AutoBadge,
  DemoBadge,
  DemoToggleLabel,
  StatusBadge,
  LocalActionButton,
  LocalIconButton,
  IconSymbol,
  CreateButtonArea,
  FormGroup,
  FormLabel,
  FormInput,
  InvoiceSummary,
  SummaryRow,
} from './invoices/styles';
import InvoiceViewModal from './invoices/InvoiceViewModal';
import InvoiceEditModal from './invoices/InvoiceEditModal';
import InvoiceCreateModal from './invoices/InvoiceCreateModal';
import InvoiceCategoryManager from './invoices/InvoiceCategoryManager';

const InvoicesPage: React.FC = () => {
  const { t, i18n } = useTranslation('admin');
  const { operationSettings } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [historyInvoice, setHistoryInvoice] = useState<Invoice | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
  const [showSendConfirmModal, setShowSendConfirmModal] = useState(false);
  const [showResendConfirmModal, setShowResendConfirmModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showRevertConfirmModal, setShowRevertConfirmModal] = useState(false);
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
  const [savingCategory] = useState(false);
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
      const token = getAuthToken();
      if (!token) {
        setInvoices([]);
        return;
      }

      const response = await fetch(`/api/invoices${includeDemo ? '?includeDemo=true' : ''}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const invoicesData = await response.json();
        setInvoices(invoicesData);
      } else {
        setInvoices([]);
      }
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setInvoices([]);
    }
  };

  // Fetch invoice categories from API
  const fetchInvoiceCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
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

  const handleDeleteCategoryClick = (category: InvoiceCategory) => {
    setCategoryToDelete(category);
    setDeleteCategoryModalOpen(true);
  };

  const handleDeleteCategoryConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const token = getAuthToken();
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
        setSuccessMessage(data.error || 'Failed to delete category. Please try again.'); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      setSuccessMessage('Failed to delete category. Please try again.'); setShowSuccessModal(true);
    }
  };

  const handleToggleCategoryActive = async (category: InvoiceCategory) => {
    try {
      const token = getAuthToken();
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
      const token = getAuthToken();
      const response = await fetch('/api/admin/payment-settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.additionalCharges) {
          if (Array.isArray(data.additionalCharges)) {
            setAdditionalChargesMap({});
          } else {
            setAdditionalChargesMap(data.additionalCharges);
          }
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
      const token = getAuthToken();
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

  // Get additionalCharges for a specific currency from the map
  const getChargesForCurrency = (currency: string) => {
    const code = normalizeCurrencyCode(currency);
    return additionalChargesMap[code] || additionalChargesMap[currency] || [];
  };

  const additionalCharges = getChargesForCurrency(newInvoice.currency);

  const fetchCurrencyConfig = async () => {
    try {
      const configRes = await fetch('/api/currencies/config');
      if (configRes.ok) {
        const data = await configRes.json();
        if (data.success && data.currencies) {
          setCurrencyConfig(data.currencies);
        }
      }
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
      const token = getAuthToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

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

      setManagers(allManagers);
    } catch (error) {
      console.error('Error fetching managers:', error);
      setManagers([]);
    }
  };

  const fetchRestaurants = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/restaurants', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
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
      } else {
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

    const filteredManagers = managers.filter(manager =>
      (manager.fullName && manager.fullName.toLowerCase().includes(query.toLowerCase())) ||
      (manager.companyName && manager.companyName.toLowerCase().includes(query.toLowerCase()))
    );

    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

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
      const token = getAuthToken();
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

    const token = getAuthToken();
    let currency = 'USD';

    if (type === 'manager') {
      const manager = data as Manager;

      try {
        const userRes = await fetch(`/api/users/${manager.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          const user = userData.success ? userData.data : userData;

          if (user.brand_id) {
            const brandRes = await fetch(`/api/brands/${user.brand_id}/payment-settings`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (brandRes.ok) {
              const brandData = await brandRes.json();
              const bData = brandData.data || brandData;
              const defaultCurrency = bData.payment_settings?.defaultCurrency;
              const supported = bData.supported_currencies;
              if (defaultCurrency) currency = defaultCurrency;
              else if (supported && supported.length > 0) currency = supported[0];
            }
          } else if (user.foodcourt_id) {
            const foodcourtRes = await fetch(`/api/foodcourts/${user.foodcourt_id}/payment-settings`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (foodcourtRes.ok) {
              const foodcourtData = await foodcourtRes.json();
              const fData = foodcourtData.data || foodcourtData;
              const defaultCurrency = fData.payment_settings?.defaultCurrency;
              const supported = fData.supported_currencies;
              if (defaultCurrency) currency = defaultCurrency;
              else if (supported && supported.length > 0) currency = supported[0];
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
        const adminSettings = localStorage.getItem('adminSettings');
        let companyLogo = '';
        if (adminSettings) {
          try {
            const parsed = JSON.parse(adminSettings);
            companyLogo = parsed.companyLogo || parsed.logo || '';
          } catch (e) { /* ignore */ }
        }
        setCompanySettings({
          companyName: '', address: '', city: '', state: '', postalCode: '', country: '',
          phone: '', email: '', website: '', taxNumber: '', registrationNumber: '', companyLogo
        });
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);
      const adminSettings = localStorage.getItem('adminSettings');
      let companyLogo = '';
      if (adminSettings) {
        try {
          const parsed = JSON.parse(adminSettings);
          companyLogo = parsed.companyLogo || parsed.logo || '';
        } catch (e) { /* ignore */ }
      }
      setCompanySettings({
        companyName: '', address: '', city: '', state: '', postalCode: '', country: '',
        phone: '', email: '', website: '', taxNumber: '', registrationNumber: '', companyLogo
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
        .items-table td.text-right { text-align: right; white-space: nowrap; }
        .items-table th.text-right { white-space: nowrap; }
        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }
        .summary-box { width: 280px; }
        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; white-space: nowrap; }
        .summary-row.subtotal { color: #6B7280; }
        .summary-row.tax { color: #6B7280; }
        .summary-row.total { background: #F8FAFC; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }
        .bank-section { background: #F8FAFC; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
        .bank-title { font-size: 12px; font-weight: 600; color: #6B7280; margin-bottom: 8px; text-transform: uppercase; }
        .bank-details { font-size: 13px; color: #374151; line-height: 1.6; }
        .registration-info { font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 16px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center; }
        .footer-text { font-size: 12px; color: #6B7280; margin-bottom: 4px; }
        ${INVOICE_PRINT_CSS}
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo-section">
                ${companySettings.companyLogo ? `<img src="${companySettings.companyLogo}" alt="Company Logo" class="company-logo">` : ''}
                <div class="company-name">${companySettings.companyName || 'Company Name'}</div>
                <div class="company-details">
                    ${formatAddressHtml({
                      address: companySettings.address,
                      city: companySettings.city,
                      state: companySettings.state,
                      postal_code: companySettings.postalCode,
                      country: companySettings.country
                    }, (i18n.language as AppLocale) || 'en')}
                    ${companySettings.phone ? `Tel: ${companySettings.phone}<br>` : ''}
                    ${companySettings.email ? `Email: ${companySettings.email}` : ''}
                </div>
            </div>
            <div class="invoice-title">
                <div class="invoice-label">${t('admin:invoicesPage.invoice')}</div>
                <div class="invoice-number">${invoice.invoiceNumber}</div>
                <span class="invoice-status ${getStatusClass(invoice.status)}">${getStatusText(invoice.status)}</span>
            </div>
        </div>
        <div class="billing-info">
            <div class="bill-to-section">
                <div class="section-label">${t('admin:invoicesPage.billTo')}</div>
                <div class="customer-name">${invoice.customerName || invoice.managerName || 'Customer'}</div>
                ${invoice.customerAddress ? `<div class="customer-details">${invoice.customerAddress}</div>` : ''}
                ${invoice.restaurantName ? `<div class="customer-details">Restaurant: ${invoice.restaurantName}</div>` : ''}
            </div>
            <div class="dates-section">
                <div class="date-row"><span class="date-label">Billing Period:</span><span class="date-value">${invoice.billingPeriod || '-'}</span></div>
                <div class="date-row"><span class="date-label">Issue Date:</span><span class="date-value">${formatDate(invoice.issueDate)}</span></div>
                <div class="date-row"><span class="date-label">Due Date:</span><span class="date-value">${formatDate(invoice.dueDate)}</span></div>
                ${invoice.paidDate ? `<div class="date-row"><span class="date-label">Paid Date:</span><span class="date-value">${formatDate(invoice.paidDate)}</span></div>` : ''}
            </div>
        </div>
        <div class="items-section">
            <div class="section-label">${t('admin:invoicesPage.items')}</div>
            <table class="items-table">
                <thead><tr><th>${t('admin:invoicesPage.description')}</th><th class="text-center">${t('admin:invoicesPage.qty')}</th><th class="text-right">${t('admin:invoicesPage.unitPrice')}</th><th class="text-right">${t('admin:invoicesPage.amount')}</th></tr></thead>
                <tbody>
                    ${invoice.items.map(item => `<tr><td>${item.description}</td><td class="text-center">${item.quantity}</td><td class="text-right">${formatCurrency(item.unitPrice, invoice.currency || 'MYR')}</td><td class="text-right">${formatCurrency(item.total, invoice.currency || 'MYR')}</td></tr>`).join('')}
                </tbody>
            </table>
        </div>
        <div class="summary-section">
            <div class="summary-box">
                <div class="summary-row subtotal"><span>Subtotal:</span><span>${formatCurrency(invoice.amount, invoice.currency || 'MYR')}</span></div>
                ${invoice.discountType && invoice.discountType !== 'none' && invoice.discountAmount && invoice.discountAmount > 0 ? `<div class="summary-row tax" style="color: #15803D;"><span>Discount${invoice.discountType === 'percentage' ? ` (${invoice.discountValue}%)` : ''}:</span><span>-${formatCurrency(invoice.discountAmount, invoice.currency || 'MYR')}</span></div>${invoice.discountReason ? `<div style="font-size: 11px; color: #6B7280; padding: 0 12px 6px; text-align: right;">${invoice.discountReason}</div>` : ''}` : ''}
                ${(invoice.additionalCharges || []).map(charge => `<div class="summary-row tax"><span>${charge.name} (${charge.rate}%):</span><span>${formatCurrency(charge.amount, invoice.currency || 'MYR')}</span></div>`).join('')}
                <div class="summary-row total"><span>Total:</span><span>${formatCurrency(invoice.total, invoice.currency || 'MYR')}</span></div>
            </div>
        </div>
        ${(() => {
          const bankName = invoice.issuerInfo?.bankName || companySettings.bankName;
          const bankAccount = invoice.issuerInfo?.bankAccount || companySettings.bankAccount;
          const bankAccountName = invoice.issuerInfo?.bankAccountName || companySettings.bankAccountName;
          const swiftCode = invoice.issuerInfo?.swiftCode || companySettings.swiftCode;
          if (!bankName) return '';
          return `<div class="bank-section"><div class="bank-title">${t('admin:invoicesPage.paymentDetails')}</div><div class="bank-details"><strong>Bank:</strong> ${bankName}<br><strong>Account Name:</strong> ${bankAccountName || '-'}<br><strong>Account Number:</strong> ${bankAccount || '-'}${swiftCode ? `<br><strong>SWIFT Code:</strong> ${swiftCode}` : ''}</div></div>`;
        })()}
        ${(companySettings.taxNumber || companySettings.registrationNumber) ? `<div class="registration-info">${companySettings.registrationNumber ? `Reg No: ${companySettings.registrationNumber}` : ''}${companySettings.registrationNumber && companySettings.taxNumber ? ' | ' : ''}${companySettings.taxNumber ? `Tax No: ${companySettings.taxNumber}` : ''}</div>` : ''}
        <div class="footer"><div class="footer-text">${t('admin:invoicesPage.thankYouForYourBusiness')}</div><div class="footer-text">${t('admin:invoicesPage.thisIsAComputergeneratedInvoiceAndDoesNotRequireASignature')}</div></div>
    </div>
</body>
</html>`;
  };

  const generateInvoicePDF = async (invoice: Invoice) => {
    if (!companySettings) {
      setSuccessMessage('Company settings not loaded. Please try again.');
      setShowSuccessModal(true);
      return;
    }
    try {
      const invoiceHTML = generateInvoiceHTML(invoice);
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.left = '-10000px';
      iframe.style.top = '-10000px';
      iframe.style.width = '800px';
      iframe.style.height = '1200px';
      iframe.style.visibility = 'hidden';
      iframe.style.pointerEvents = 'none';
      document.body.appendChild(iframe);
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        document.body.removeChild(iframe);
        throw new Error('Could not access iframe document');
      }
      iframeDoc.open();
      iframeDoc.write(invoiceHTML);
      iframeDoc.close();
      try {
        await renderIframeToPdf(iframe, `Invoice-${invoice.invoiceNumber}.pdf`);
      } finally {
        document.body.removeChild(iframe);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSuccessMessage('Failed to generate PDF. Please try again.');
      setShowSuccessModal(true);
    }
  };

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
      setTimeout(() => { printWindow.print(); }, 250);
    }
  };

  const handleOpenEmailModal = async (invoice: Invoice) => {
    setEmailInvoice(invoice);
    let defaultEmail = '';
    if (invoice.payerType === 'restaurant' && invoice.restaurantId) {
      const restaurant = restaurants.find(r => r.id === invoice.restaurantId);
      if (restaurant?.email) defaultEmail = restaurant.email;
    } else if (invoice.payerType === 'foodcourt_manager' || invoice.payerType === 'brand_manager') {
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager?.email) defaultEmail = manager.email;
    }
    if (!defaultEmail && invoice.managerId) {
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager?.email) defaultEmail = manager.email;
    }
    setEmailRecipient(defaultEmail);
    setShowEmailModal(true);
  };

  const handleSendInvoiceEmail = async () => {
    if (!emailInvoice || !emailRecipient) {
      setSuccessMessage('Please enter a valid email address.');
      setShowSuccessModal(true);
      return;
    }
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${emailInvoice.id}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ recipientEmail: emailRecipient })
      });
      if (response.ok) {
        setSuccessMessage(`Invoice sent successfully to ${emailRecipient}`);
        setShowEmailModal(false);
        setEmailInvoice(null);
        setEmailRecipient('');
      } else {
        const data = await response.json();
        setSuccessMessage(data.message || data.error || 'Failed to send invoice email.');
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
      managerId: '', managerName: '', companyName: '', restaurantId: '', restaurantName: '',
      amount: '', tax: '0', total: '0', description: '', dueDate: '', planType: 'professional',
      billingCycle: 'monthly', invoiceCategory: 'service', customDescription: '', serviceDescription: '',
      currency: '', discountType: 'none' as 'none' | 'percentage' | 'fixed', discountValue: '', discountReason: ''
    });
    setSelectedTarget(null);
    setSearchQuery('');
    setShowSearchDropdown(false);
    setPayerMode('member');
    setExternalPayer({ name: '', email: '', phone: '', company: '', address: '', tax_id: '' });
  };

  const isInvoiceOverdue = (invoice: Invoice): boolean => {
    if (invoice.status !== 'pending_payment') return false;
    const now = new Date();
    const dueDate = new Date(invoice.dueDate);
    return dueDate < now;
  };

  const getEffectiveStatus = (invoice: Invoice): 'draft' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled' | 'active' | 'inactive' | '' => {
    if (isInvoiceOverdue(invoice)) return 'overdue';
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
                         statusText.includes(term) || typeText.includes(term) ||
                         planTypeText.includes(term) || categoryText.includes(term) ||
                         customerName.includes(term) || payerTypeText.includes(term) ||
                         (invoice.billingPeriod || '').toLowerCase().includes(term);

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
    let comparison = 0;
    switch (sortField) {
      case 'invoiceNumber': comparison = a.invoiceNumber.localeCompare(b.invoiceNumber); break;
      case 'companyName': comparison = (a.companyName || '').localeCompare(b.companyName || ''); break;
      case 'issueDate': comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime(); break;
      case 'dueDate': comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(); break;
      case 'amount': comparison = a.total - b.total; break;
      case 'status': comparison = (a.status || '').localeCompare(b.status || ''); break;
      default: comparison = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
    }
    return sortDirection === 'desc' ? -comparison : comparison;
  });

  const handleSort = (field: 'invoiceNumber' | 'companyName' | 'issueDate' | 'dueDate' | 'amount' | 'status') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'dueDate' || field === 'amount' ? 'desc' : 'asc');
    }
  };

  const getSortIndicator = (field: string) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const overdueInvoices = invoices.filter(i => isInvoiceOverdue(i)).length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

  const formatDate = (dateString: string) => {
    return formatDateTime(dateString, operationSettings, { year: 'numeric', month: '2-digit', day: '2-digit' });
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
      const token = getAuthToken();
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
        setSuccessMessage(`Failed to link account: ${errorData.message || 'Unknown error'}`); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error linking account:', error);
      setSuccessMessage('Error linking account. Please try again.'); setShowSuccessModal(true);
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setEditInvoice({
      managerId: invoice.managerId, managerName: invoice.managerName,
      companyName: invoice.companyName || '', restaurantId: invoice.restaurantId || '',
      restaurantName: invoice.restaurantName || '',
      amount: (invoice.subtotalBeforeDiscount || invoice.amount).toString(),
      tax: invoice.tax.toString(), total: invoice.total.toString(),
      dueDate: invoice.dueDate ? invoice.dueDate.split('T')[0] : '', status: invoice.status,
      planType: invoice.planType, billingCycle: 'monthly',
      description: invoice.items?.[0]?.description || '',
      payerType: invoice.payerType || 'restaurant', payerId: invoice.payerId || '',
      items: invoice.items,
      currency: invoice.currency || operationSettings.currency || 'MYR',
      discountType: invoice.discountType || 'none',
      discountValue: invoice.discountValue ? invoice.discountValue.toString() : '',
      discountReason: invoice.discountReason || '',
      invoiceCategory: invoice.invoiceCategory || 'service',
      customDescription: invoice.customDescription || '',
      serviceDescription: invoice.serviceDescription || ''
    });
    if (invoice.restaurantId) {
      const restaurant = restaurants.find(r => r.id === invoice.restaurantId);
      if (restaurant) { setEditSelectedTarget({type: 'restaurant', data: restaurant}); setEditSearchQuery(restaurant.name); }
    } else if (invoice.managerId) {
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager) { setEditSelectedTarget({type: 'manager', data: manager}); setEditSearchQuery(manager.fullName); }
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
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'pending_payment' })
      });
      if (response.ok) {
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
    if (selectedInvoice.type === 'automatic' && !editModificationReason.trim()) {
      setEditSaveError('Please enter a reason for modifying this invoice.');
      return;
    }
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          amount: parseFloat(editInvoice.amount), tax: parseFloat(editInvoice.tax),
          total: parseFloat(editInvoice.total), dueDate: editInvoice.dueDate,
          payerType: editInvoice.payerType, payerId: editInvoice.payerId,
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
          amount: parseFloat(editInvoice.amount), tax: parseFloat(editInvoice.tax),
          total: parseFloat(editInvoice.total), dueDate: editInvoice.dueDate,
          status: editInvoice.status, payerType: editInvoice.payerType,
          payerId: editInvoice.payerId, items: editInvoice.items
        };
        setInvoices(invoices.map(inv => inv.id === selectedInvoice.id ? updatedInvoice : inv));
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
      setSuccessMessage('Please select a manager/restaurant, enter amount, and set due date.'); setShowSuccessModal(true);
      return;
    }
    if (payerMode === 'external' && (!externalPayer.name || !externalPayer.email || !newInvoice.amount || !newInvoice.dueDate)) {
      setSuccessMessage('Please fill in name, email, amount, and due date.'); setShowSuccessModal(true);
      return;
    }
    try {
      const amount = parseFloat(newInvoice.amount);
      const discountVal = parseFloat(newInvoice.discountValue) || 0;
      const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : newInvoice.discountType === 'fixed' ? discountVal : 0;
      const afterDiscount = Math.max(0, amount - discountAmt);
      const calculatedCharges = additionalCharges
        .filter(charge => charge.enabled && charge.name && charge.rate > 0)
        .map(charge => ({ name: charge.name, rate: charge.rate, amount: Math.round(afterDiscount * charge.rate / 100 * 100) / 100 }));
      const totalChargesAmount = calculatedCharges.reduce((sum, c) => sum + c.amount, 0);
      const total = afterDiscount + totalChargesAmount;

      let description = '';
      if (newInvoice.invoiceCategory === 'others') description = newInvoice.customDescription || '';
      else description = newInvoice.serviceDescription || '';

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
        const addressParts = [];
        if (restaurant.address) addressParts.push(restaurant.address);
        if (restaurant.phone) addressParts.push(`Phone: ${restaurant.phone}`);
        if (restaurant.email) addressParts.push(`Email: ${restaurant.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget?.type === 'manager') {
        const manager = selectedTarget.data as Manager;
        customerName = manager.fullName;
        companyName = manager.companyName || manager.fullName;
        const addressParts = [];
        if (manager.companyName) addressParts.push(manager.companyName);
        if (manager.email) addressParts.push(`Email: ${manager.email}`);
        customerAddress = addressParts.join('\n');
      }

      let payerType = 'restaurant';
      if (payerMode === 'external') {
        payerType = 'external';
      } else if (selectedTarget?.type === 'manager') {
        const manager = selectedTarget.data as Manager;
        if (manager.role === 'Brand General' || manager.role === 'Brand Manager') payerType = 'brand_manager';
        else if (manager.role === 'Foodcourt General' || manager.role === 'Foodcourt Manager') payerType = 'foodcourt_manager';
      }

      const invoiceData: any = {
        restaurant_id: payerMode === 'external' ? null : (selectedTarget?.type === 'restaurant' ? (selectedTarget.data as Restaurant).id : null),
        payer_type: payerType,
        payer_id: payerMode === 'external' ? null : (selectedTarget?.type === 'manager' ? (selectedTarget.data as Manager).id : null),
        type: 'manual', billing_period_start: null, billing_period_end: null,
        due_date: new Date(newInvoice.dueDate).toISOString(),
        total_amount: total,
        subtotal_before_discount: discountAmt > 0 ? amount : null,
        discount_type: newInvoice.discountType !== 'none' ? newInvoice.discountType : null,
        discount_value: discountAmt > 0 ? discountVal : null,
        discount_amount: discountAmt > 0 ? discountAmt : null,
        discount_reason: newInvoice.discountReason || null,
        currency: newInvoice.currency || 'MYR', status: 'draft',
        notes: `${companyName}\n${customerName}\n${customerAddress}\n\n${description}`,
        issued_by: 1, issued_at: new Date().toISOString(), issuer_type: 'system_admin',
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
        item_type: newInvoice.invoiceCategory, description: description,
        calculation_method: 'fixed', fixed_amount: amount, calculated_amount: amount,
        tax_rate: 0, tax_amount: 0, total_amount: amount
      }];

      const token = getAuthToken();
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ invoice_data: invoiceData, items: items })
      });

      if (response.ok) {
        await fetchInvoices();
        setShowCreateInvoiceModal(false);
        resetInvoiceForm();
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to create invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      setSuccessMessage('Error creating invoice. Please try again.'); setShowSuccessModal(true);
    }
  };

  const handleConfirmPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentConfirmModal(true);
  };

  const handleMarkAsPaid = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'paid', paid_at: new Date().toISOString() })
      });
      if (response.ok) {
        await fetchInvoices();
        setShowPaymentConfirmModal(false);
        setSelectedInvoice(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to update payment status: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      setSuccessMessage('Error updating payment status. Please try again.'); setShowSuccessModal(true);
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

  const handleCancelInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowCancelConfirmModal(true);
  };

  const handleRevertToDraft = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowRevertConfirmModal(true);
  };

  const confirmRevertToDraft = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'draft' })
      });
      if (response.ok) {
        await fetchInvoices();
        setShowRevertConfirmModal(false);
        setSelectedInvoice(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSuccessMessage(`Failed to revert invoice: ${errorData.error?.message || errorData.error || 'Unknown error'}`); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error reverting invoice to draft:', error);
      setSuccessMessage('Error reverting invoice. Please try again.'); setShowSuccessModal(true);
    }
  };

  const confirmCancelInvoice = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'cancelled' })
      });
      if (response.ok) {
        await fetchInvoices();
        setShowCancelConfirmModal(false);
        setSelectedInvoice(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to cancel invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error cancelling invoice:', error);
      setSuccessMessage('Error cancelling invoice. Please try again.'); setShowSuccessModal(true);
    }
  };

  const confirmDeleteInvoice = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        await fetchInvoices();
        setShowDeleteConfirmModal(false);
        setSelectedInvoice(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to delete invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      setSuccessMessage('Error deleting invoice. Please try again.'); setShowSuccessModal(true);
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:invoicesPage.invoices')}</Title>
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
            <StatLabel>{t('admin:invoicesPage.totalInvoices')}</StatLabel>
            <StatDescription>{t('admin:invoicesPage.allInvoiceRecords')}</StatDescription>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{paidInvoices}</StatValue>
            <StatLabel>{t('admin:invoicesPage.paidInvoices')}</StatLabel>
            <StatDescription>{totalInvoices > 0 ? Math.round((paidInvoices/totalInvoices)*100) : 0}% completed</StatDescription>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{overdueInvoices}</StatValue>
            <StatLabel>{t('admin:invoicesPage.overdueInvoices')}</StatLabel>
            <StatDescription>{t('admin:invoicesPage.requiresAttention')}</StatDescription>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatCurrency(totalRevenue)}</StatValue>
            <StatLabel>{t('admin:invoicesPage.totalRevenue')}</StatLabel>
            <StatDescription>{t('admin:invoicesPage.fromPaidInvoices')}</StatDescription>
          </StatCard>
        </StatsGrid>

        <Tabs>
          <CommonTab active={activeTab === 'invoices'} onClick={() => handleTabChange('invoices')}>{t('admin:invoicesPage.invoices')}</CommonTab>
          <CommonTab active={activeTab === 'payment_submitted'} onClick={() => handleTabChange('payment_submitted')}>
            Payment Submitted
            <TabBadge count={invoices.filter(i => i.status === 'payment_submitted').length} variant="danger" />
          </CommonTab>
          <CommonTab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>{t('admin:invoicesPage.invoiceCategories')}</CommonTab>
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
              <Button variant="primary" onClick={handleCreateInvoice}>{t('admin:invoicesPage.createInvoice')}</Button>
            </CreateButtonArea>
        </DatePeriodFilter>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left" style={{ cursor: 'pointer' }} onClick={() => handleSort('invoiceNumber')}>Invoice{getSortIndicator('invoiceNumber')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left" style={{ cursor: 'pointer' }} onClick={() => handleSort('companyName')}>Customer{getSortIndicator('companyName')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('admin:invoicesPage.period')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center">{t('admin:invoicesPage.issued')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort('dueDate')}>Due{getSortIndicator('dueDate')}</DataTableHeaderCell>
                <DataTableHeaderCell align="center" style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>Status{getSortIndicator('status')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" style={{ cursor: 'pointer' }} onClick={() => handleSort('amount')}>Amount{getSortIndicator('amount')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right">{t('admin:invoicesPage.total')}</DataTableHeaderCell>
                <DataTableHeaderCell isActions>{t('admin:invoicesPage.actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {filteredInvoices.map(invoice => (
                <DataTableRow key={invoice.id}>
                  <DataTableCell data-label="Invoice" align="left">
                    <InvoiceInfo>
                      <InvoiceNumber>
                        {invoice.invoiceNumber}
                        {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>{t('admin:invoicesPage.auto')}</AutoBadge>}
                      </InvoiceNumber>
                      <CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName>
                    </InvoiceInfo>
                  </DataTableCell>
                  <DataTableCell data-label="Customer" align="left">
                    <InvoiceInfo>
                      <InvoiceNumber>
                        {invoice.customerName || invoice.restaurantName || invoice.externalPayerName || '\u2014'}
                        {invoice.isDemo && <DemoBadge>{t('admin:invoicesPage.demo')}</DemoBadge>}
                        {invoice.payerType === 'external' && <span style={{ marginLeft: '6px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px', verticalAlign: 'middle' }}>{t('admin:invoicesPage.nonmember')}</span>}
                      </InvoiceNumber>
                      <CompanyName>
                        {invoice.payerType === 'external' ? 'Non-Member' : getPayerDisplay(invoice.payerType || 'restaurant')}
                      </CompanyName>
                      {invoice.hardwareQuoteNumber && (
                        <div>
                          <a href={`/pos/admin/hardware-quotes?search=${invoice.hardwareQuoteNumber}`} style={{ fontSize: '11px', color: '#635BFF', textDecoration: 'none' }}>
                            {invoice.hardwareQuoteNumber} &rarr;
                          </a>
                        </div>
                      )}
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
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setHistoryInvoice(invoice); }}
                        title={t('invoiceHistory.viewTooltip', 'View modification history')}
                        style={{ display: 'inline-block', marginLeft: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#B45309', background: '#FEF3C7', borderRadius: '4px', verticalAlign: 'middle', border: '1px solid #FDE68A', cursor: 'pointer' }}
                      >{t('admin:invoicesPage.modified')}</button>
                    )}
                  </DataTableCell>
                  <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('admin:invoicesPage.free')}</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="" mobileFullWidth>
                    <ActionButtons>
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>{t('admin:invoicesPage.view')}</LocalActionButton>
                      {invoice.status === 'draft' && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>{t('admin:invoicesPage.edit')}</LocalActionButton>
                          <LocalActionButton variant="success" onClick={() => handleSendInvoice(invoice)} title="Send Invoice">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg>
                          </LocalActionButton>
                          <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice"><IconSymbol>&times;</IconSymbol></LocalIconButton>
                        </>
                      )}
                      {(invoice.status === 'pending_payment' || invoice.status === '' || !invoice.status) && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>{t('admin:invoicesPage.edit')}</LocalActionButton>
                          {Number(invoice.total) === 0 && <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>{t('admin:invoicesPage.markPaid')}</LocalActionButton>}
                          <LocalActionButton onClick={() => handleRevertToDraft(invoice)} title={t('admin:invoicesPage.revertHint', 'Revert to draft to edit or resend')}>{t('admin:invoicesPage.revertToDraft', 'Revert to Draft')}</LocalActionButton>
                          <LocalActionButton variant="cancel" onClick={() => handleCancelInvoice(invoice)} title={t('admin:invoicesPage.cancelInvoiceTooltip', 'Mark as cancelled (preserved for records)')}>{t('admin:invoicesPage.cancel', 'Cancel')}</LocalActionButton>
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></LocalActionButton>
                          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Send Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></LocalActionButton>
                          <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice"><IconSymbol>&times;</IconSymbol></LocalIconButton>
                        </>
                      )}
                      {invoice.status === 'payment_submitted' && (
                        <>
                          {invoice.hasPaymentInfo && <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>{t('admin:invoicesPage.confirm')}</LocalActionButton>}
                          <LocalActionButton variant="cancel" onClick={() => handleCancelInvoice(invoice)} title={t('admin:invoicesPage.cancelInvoiceTooltip', 'Mark as cancelled (preserved for records)')}>{t('admin:invoicesPage.cancel', 'Cancel')}</LocalActionButton>
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></LocalActionButton>
                          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Resend Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></LocalActionButton>
                        </>
                      )}
                      {invoice.status === 'overdue' && (
                        <>
                          <LocalActionButton onClick={() => handleEditInvoice(invoice)}>{t('admin:invoicesPage.edit')}</LocalActionButton>
                          {Number(invoice.total) === 0 && <LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>{t('admin:invoicesPage.markPaid')}</LocalActionButton>}
                          <LocalActionButton onClick={() => handleRevertToDraft(invoice)} title={t('admin:invoicesPage.revertHint', 'Revert to draft to edit or resend')}>{t('admin:invoicesPage.revertToDraft', 'Revert to Draft')}</LocalActionButton>
                          <LocalActionButton variant="cancel" onClick={() => handleCancelInvoice(invoice)} title={t('admin:invoicesPage.cancelInvoiceTooltip', 'Mark as cancelled (preserved for records)')}>{t('admin:invoicesPage.cancel', 'Cancel')}</LocalActionButton>
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></LocalActionButton>
                          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Resend Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></LocalActionButton>
                          <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice"><IconSymbol>&times;</IconSymbol></LocalIconButton>
                        </>
                      )}
                      {invoice.status === 'paid' && (
                        <>
                          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>
                          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></LocalActionButton>
                        </>
                      )}
                      {invoice.status === 'cancelled' && (
                        <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>
                      )}
                    </ActionButtons>
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>

          {filteredInvoices.length === 0 && (
            <DataTableEmpty>
              <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{t('admin:invoicesPage.noInvoicesFound')}</div>
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
                    <DataTableHeaderCell align="left">{t('admin:invoicesPage.invoice')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{t('admin:invoicesPage.customer')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('admin:invoicesPage.paymentMethod')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{t('admin:invoicesPage.submittedDate')}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{t('admin:invoicesPage.amount')}</DataTableHeaderCell>
                    <DataTableHeaderCell isActions>{t('admin:invoicesPage.actions')}</DataTableHeaderCell>
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
                            {invoice.customerName || invoice.restaurantName || invoice.externalPayerName || '\u2014'}
                            {invoice.payerType === 'external' && <span style={{ marginLeft: '6px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px', verticalAlign: 'middle' }}>{t('admin:invoicesPage.nonmember')}</span>}
                          </InvoiceNumber>
                          <CompanyName>{invoice.companyName || getPayerDisplay(invoice.payerType || 'restaurant')}</CompanyName>
                        </InvoiceInfo>
                      </DataTableCell>
                      <DataTableCell data-label="Payment Method" align="center">
                        {invoice.paymentMethod || '-'}
                      </DataTableCell>
                      <DataTableCell data-label="Submitted" align="center">
                        {invoice.paidDate ? formatDate(invoice.paidDate) : '-'}
                      </DataTableCell>
                      <DataTableCell data-label="Amount" align="right">
                        <DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('admin:invoicesPage.free')}</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount>
                      </DataTableCell>
                      <DataTableCell data-label="" mobileFullWidth>
                        <ActionButtons>
                          <LocalActionButton onClick={() => handleViewInvoice(invoice)}>{t('admin:invoicesPage.view')}</LocalActionButton>
                          <LocalActionButton variant="primary" onClick={() => {
                            setSelectedInvoice(invoice);
                            setShowPaymentConfirmModal(true);
                          }}>{t('admin:invoicesPage.confirmPayment')}</LocalActionButton>
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
          <InvoiceCategoryManager
            invoiceCategories={invoiceCategories}
            showCategoryModal={showCategoryModal}
            editingCategory={editingCategory}
            categoryFormData={categoryFormData}
            setCategoryFormData={setCategoryFormData}
            savingCategory={savingCategory}
            onOpenCategoryModal={handleOpenCategoryModal}
            onCloseCategoryModal={handleCloseCategoryModal}
            deleteCategoryModalOpen={deleteCategoryModalOpen}
            categoryToDelete={categoryToDelete}
            onDeleteCategoryClick={handleDeleteCategoryClick}
            onDeleteCategoryConfirm={handleDeleteCategoryConfirm}
            onDeleteCategoryCancel={() => setDeleteCategoryModalOpen(false)}
            onToggleCategoryActive={handleToggleCategoryActive}
          />
        )}

        {/* Modification History Modal */}
        <InvoiceHistoryModal
          isOpen={!!historyInvoice}
          onClose={() => setHistoryInvoice(null)}
          invoiceNumber={historyInvoice?.invoiceNumber}
          history={(historyInvoice as any)?.modificationHistory || []}
        />

        {/* Create Invoice Modal */}
        <InvoiceCreateModal
          show={showCreateInvoiceModal}
          onClose={() => { setShowCreateInvoiceModal(false); resetInvoiceForm(); }}
          onSubmit={handleSubmitInvoice}
          newInvoice={newInvoice}
          setNewInvoice={setNewInvoice}
          payerMode={payerMode}
          setPayerMode={setPayerMode}
          externalPayer={externalPayer}
          setExternalPayer={setExternalPayer}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          showSearchDropdown={showSearchDropdown}
          onShowSearchDropdown={setShowSearchDropdown}
          searchResults={searchResults}
          selectedTarget={selectedTarget}
          onSelectTarget={selectTarget}
          onClearTarget={() => { setSelectedTarget(null); setSearchQuery(''); }}
          managers={managers}
          invoiceCategories={invoiceCategories}
          additionalCharges={additionalCharges}
          paymentMethodWarning={paymentMethodWarning}
        />

        {/* View Invoice Modal */}
        <InvoiceViewModal
          show={showViewModal}
          invoice={selectedInvoice}
          companySettings={companySettings}
          operationSettings={operationSettings}
          onClose={() => setShowViewModal(false)}
          formatDate={formatDate}
          showLinkAccountModal={showLinkAccountModal}
          onOpenLinkAccountModal={() => { setShowLinkAccountModal(true); setLinkSearchQuery(''); setLinkSearchResults({managers: [], restaurants: []}); }}
          onCloseLinkAccountModal={() => setShowLinkAccountModal(false)}
          linkSearchQuery={linkSearchQuery}
          onLinkSearch={handleLinkSearch}
          showLinkSearchDropdown={showLinkSearchDropdown}
          onShowLinkSearchDropdown={setShowLinkSearchDropdown}
          linkSearchResults={linkSearchResults}
          onLinkAccount={handleLinkAccount}
        />

        {/* Edit Invoice Modal */}
        <InvoiceEditModal
          show={showEditModal}
          selectedInvoice={selectedInvoice}
          editInvoice={editInvoice}
          setEditInvoice={setEditInvoice}
          editModificationReason={editModificationReason}
          setEditModificationReason={setEditModificationReason}
          editSaveError={editSaveError}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
          editSearchQuery={editSearchQuery}
          onEditSearch={handleEditSearch}
          showEditSearchDropdown={showEditSearchDropdown}
          onShowEditSearchDropdown={setShowEditSearchDropdown}
          editSearchResults={editSearchResults}
          editSelectedTarget={editSelectedTarget}
          onEditTargetSelect={handleEditTargetSelect}
          onClearEditTarget={() => { setEditSelectedTarget(null); setEditSearchQuery(''); }}
          managers={managers}
          invoiceCategories={invoiceCategories}
          operationSettings={operationSettings}
          getChargesForCurrency={getChargesForCurrency}
        />

        {/* Payment Confirmation Modal */}
        {showPaymentConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowPaymentConfirmModal(false)} title={`Confirm Payment - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={() => setShowPaymentConfirmModal(false)}> Cancel </Button><Button variant="primary" onClick={handleMarkAsPaid}> Confirm Payment Received </Button></>}>
            <FormGroup>
              <FormLabel>{t('admin:invoicesPage.invoiceSummary')}</FormLabel>
              <InvoiceSummary>
                <SummaryRow><span>Customer:</span><span>{selectedInvoice.customerName || selectedInvoice.managerName}</span></SummaryRow>
                <SummaryRow><span>Company:</span><span>{selectedInvoice.companyName}</span></SummaryRow>
                <SummaryRow><span>Invoice Number:</span><span>{selectedInvoice.invoiceNumber}</span></SummaryRow>
                <SummaryRow><span>Due Date:</span><span>{formatDate(selectedInvoice.dueDate)}</span></SummaryRow>
                <SummaryRow highlight><span><strong>Payment Amount:</strong></span><span><strong>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</strong></span></SummaryRow>
              </InvoiceSummary>
            </FormGroup>
            {selectedInvoice.hasPaymentInfo && (
              <FormGroup>
                <FormLabel>{t('admin:invoicesPage.customersPaymentInformation')}</FormLabel>
                <div style={{ background: '#EFF6FF', border: '1px solid #3B82F6', borderRadius: '8px', padding: '16px' }}>
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
                    {selectedInvoice.transactionId && <p style={{ margin: '0 0 8px 0' }}><strong>Transaction ID:</strong> {selectedInvoice.transactionId}</p>}
                  </div>
                  {selectedInvoice.receiptUrl && (
                    <div style={{ marginTop: '12px' }}>
                      <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>Payment Receipt:</p>
                      <div style={{ textAlign: 'center', background: 'white', padding: '12px', borderRadius: '8px' }}>
                        <img src={selectedInvoice.receiptUrl} alt="Payment Receipt" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => window.open(selectedInvoice.receiptUrl, '_blank')} />
                        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#6B7280' }}>Click image to view full size</p>
                      </div>
                    </div>
                  )}
                </div>
              </FormGroup>
            )}
            <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', padding: '16px', margin: '16px 0' }}>
              <p style={{ margin: 0, color: '#92400E', fontSize: '14px' }}>
                <strong>{t('admin:invoicesPage.confirmPaymentReceipt')}</strong><br />
                Only mark this invoice as paid if you have received and verified the payment.
                This action will update the invoice status to "Paid".
              </p>
            </div>
            <FormGroup>
              <FormLabel>{t('admin:invoicesPage.statusChange')}</FormLabel>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#374151', background: '#F8FAFC', padding: '12px', borderRadius: '6px' }}>
                Payment Submitted &rarr; Paid<br />
                Paid Date: {formatDateTime(new Date(), operationSettings, { year: 'numeric', month: '2-digit', day: '2-digit' })}
              </div>
            </FormGroup>
          </CommonModal>
        )}

        {/* Send Invoice Confirmation Modal */}
        {showSendConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowSendConfirmModal(false)} title="Send Invoice" footer={<><Button variant="secondary" onClick={() => setShowSendConfirmModal(false)}> Cancel </Button><Button variant="success" onClick={confirmSendInvoice}> Confirm </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('admin:invoicesPage.sendInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>
                Are you sure you want to send invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.managerName || selectedInvoice.customerName}</strong>?
              </p>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6B7280' }}>Invoice:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6B7280' }}>Recipient:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.managerName || selectedInvoice.customerName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6B7280' }}>Company:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.customerName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280' }}>Amount:</span><span style={{ fontWeight: '600', color: '#059669' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span></div>
              </div>
            </div>
          </CommonModal>
        )}

        {/* Resend Invoice Confirmation Modal */}
        {showResendConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowResendConfirmModal(false)} title="Resend Invoice" footer={<><Button variant="secondary" onClick={() => setShowResendConfirmModal(false)}> Cancel </Button><Button variant="primary" onClick={confirmResendInvoice}> Resend Invoice </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('admin:invoicesPage.resendInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>
                Resend invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.managerName}</strong>?
              </p>
              <div style={{ background: '#FEF3C7', padding: '12px', borderRadius: '6px', border: '1px solid #F59E0B', fontSize: '13px', color: '#92400E' }}>
                This will send another copy of the invoice to the manager's email.
              </div>
            </div>
          </CommonModal>
        )}

        {/* Revert to Draft Confirmation Modal */}
        {showRevertConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowRevertConfirmModal(false)} title={t('admin:invoicesPage.revertToDraft', 'Revert to Draft')} footer={<><Button variant="secondary" onClick={() => setShowRevertConfirmModal(false)}>{t('common:cancel', 'Cancel')}</Button><Button variant="primary" onClick={confirmRevertToDraft}>{t('admin:invoicesPage.revertToDraft', 'Revert to Draft')}</Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('admin:invoicesPage.revertToDraft', 'Revert to Draft')}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>
                {t('admin:invoicesPage.revertConfirm', 'Revert invoice')} <strong>{selectedInvoice.invoiceNumber}</strong> {t('admin:invoicesPage.revertConfirmTail', 'back to draft?')}
              </p>
              <div style={{ background: '#EEF2FF', padding: '16px', borderRadius: '8px', border: '1px solid #C7D2FE', marginBottom: '16px' }}>
                <p style={{ margin: 0, color: '#3730A3', fontSize: '14px', fontWeight: '500' }}>{t('admin:invoicesPage.revertHint', 'The invoice will be editable again. Invoice number is preserved, and the change is recorded in modification history.')}</p>
              </div>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6B7280' }}>{t('admin:invoicesPage.invoice', 'Invoice')}:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280' }}>{t('admin:invoicesPage.amount', 'Amount')}:</span><span style={{ fontWeight: '600' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span></div>
              </div>
            </div>
          </CommonModal>
        )}

        {/* Cancel Invoice Confirmation Modal */}
        {showCancelConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowCancelConfirmModal(false)} title="Cancel Invoice" footer={<><Button variant="secondary" onClick={() => setShowCancelConfirmModal(false)}> Keep Invoice </Button><Button variant="primary" onClick={confirmCancelInvoice} style={{ background: '#EF4444', borderColor: '#EF4444' }} > Cancel Invoice </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('admin:invoicesPage.cancelInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px', lineHeight: '1.6' }}>
                Are you sure you want to cancel invoice <strong>{selectedInvoice.invoiceNumber}</strong>?
              </p>
              <div style={{ background: '#FEE2E2', padding: '16px', borderRadius: '8px', border: '1px solid #FCA5A5', marginBottom: '16px' }}>
                <p style={{ margin: 0, color: '#991B1B', fontSize: '14px', fontWeight: '500' }}><strong>Warning: This action cannot be undone</strong></p>
                <p style={{ margin: '8px 0 0 0', color: '#7F1D1D', fontSize: '13px' }}>The invoice will be marked as cancelled and cannot be sent or processed for payment.</p>
              </div>
              <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '8px', border: '1px solid #E6EBF1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6B7280' }}>Invoice:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#6B7280' }}>Manager:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.managerName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#6B7280' }}>Amount:</span><span style={{ fontWeight: '600', color: '#DC2626' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span></div>
              </div>
            </div>
          </CommonModal>
        )}

        {/* Delete Invoice Confirmation Modal */}
        {showDeleteConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowDeleteConfirmModal(false)} title="Delete Invoice" footer={<><Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}> Keep Invoice </Button><Button variant="primary" onClick={confirmDeleteInvoice} style={{ background: '#EF4444', borderColor: '#EF4444' }} > Delete Invoice </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('admin:invoicesPage.deleteInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5' }}>
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
              <FormLabel>{t('admin:invoicesPage.invoice')}</FormLabel>
              <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '6px', marginBottom: '16px' }}>
                <div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>{emailInvoice.invoiceNumber}</div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>{emailInvoice.customerName}</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#635BFF', marginTop: '8px' }}>{formatCurrency(emailInvoice.total, emailInvoice.currency || 'MYR')}</div>
              </div>
            </FormGroup>
            <FormGroup>
              <FormLabel>Recipient Email *</FormLabel>
              <FormInput type="email" value={emailRecipient} onChange={(e) => setEmailRecipient(e.target.value)} placeholder="Enter recipient email address" required style={{ maxWidth: '100%' }} />
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
                {emailRecipient ? (
                  <>Default email for {emailInvoice.payerType === 'restaurant' ? 'Restaurant' : emailInvoice.payerType === 'foodcourt_manager' ? 'Foodcourt Manager' : emailInvoice.payerType === 'brand_manager' ? 'Brand Manager' : 'Customer'}</>
                ) : (
                  <>Enter the {emailInvoice.payerType === 'restaurant' ? 'restaurant' : emailInvoice.payerType === 'foodcourt_manager' ? 'foodcourt manager' : emailInvoice.payerType === 'brand_manager' ? 'brand manager' : 'customer'} email address</>
                )}
              </div>
            </FormGroup>
            <div style={{ background: '#F0F9FF', border: '1px solid #0EA5E9', borderRadius: '8px', padding: '12px', marginTop: '16px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#0369A1' }}>The invoice will be sent to the recipient email address using the system email settings.</p>
            </div>
          </CommonModal>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Success" footer={<><Button variant="primary" onClick={() => setShowSuccessModal(false)}> OK </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: '16px', color: '#0A2540', marginBottom: '8px', fontWeight: '500' }}>{successMessage}</p>
            </div>
          </CommonModal>
        )}

        </Content>
      </Container>
    </>
  );
};

export default InvoicesPage;
