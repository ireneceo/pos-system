import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { printHTMLContent } from '../../utils/billPrint';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { formatCurrency, normalizeCurrencyCode, getCurrencySymbol } from '../../utils/currency';
import { formatAddressHtml, AppLocale } from '../../utils/formatAddress';
import InvoiceHistoryModal from '../../components/Invoice/InvoiceHistoryModal';
import { useStore } from '../../contexts/StoreContext';
import { formatDateTime } from '../../utils/timezone';
import { useAuth } from '../../contexts/AuthContext';
import SuspendedBanner from '../../components/Common/SuspendedBanner';
import { StatusMessage } from '../../components/UI/CommonStyles';
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
  Pagination,
  usePagination,
} from '../../components/UI';
import { SearchInput } from '../../components/Common/FilterComponents';
import { Tabs, Tab as CommonTab, Badge as TabBadge } from '../../components/Common/TabComponents';
import { renderIframeToPdf, INVOICE_PRINT_CSS } from '../../utils/invoicePdf';
import StripePaymentForm from '../../components/Invoice/StripePaymentForm';
import PayPalPaymentForm from '../../components/Invoice/PayPalPaymentForm';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';

import {
  Invoice,
  Manager,
  Restaurant,
  InvoiceCategory,
  CompanySettings,
  AdditionalChargeConfig,
  PaymentMethod,
  TabType,
} from './invoices/types';

import {
  FilterBarWrapper,
  FiltersRight,
  Button,
  InvoiceInfo,
  InvoiceNumber,
  CompanyName,
  AutoBadge,
  StatusBadge,
  LocalActionButton,
  LocalIconButton,
  IconSymbol,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  InvoiceSummary,
  SummaryRow,
} from './invoices/styles';

import BrandInvoiceViewModal from './invoices/BrandInvoiceViewModal';
import BrandInvoiceEditModal from './invoices/BrandInvoiceEditModal';
import BrandInvoiceCreateModal from './invoices/BrandInvoiceCreateModal';
import BrandInvoiceCategoryManager from './invoices/BrandInvoiceCategoryManager';
import SubscriptionPanel from '../../components/Payment/SubscriptionPanel';

const BrandInvoicesPage: React.FC = () => {
  const { t, i18n } = useTranslation('brand');
  const { operationSettings } = useStore();
  const { user, refreshUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [historyInvoice, setHistoryInvoice] = useState<any>(null);
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

  // Period filter handlers
  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setIsCustomDateRange(false);
    setDateRange(calculatePeriodDateRange(period));
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setIsCustomDateRange(true);
    setActivePeriod('all');
    setDateRange({ start, end });
  };

  // State for invoices to pay (from system admin)
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);
  const [paidInvoicesList, setPaidInvoicesList] = useState<Invoice[]>([]);

  // To Pay tab filters (separate from Issued tab)
  const [toPaySearchTerm, setToPaySearchTerm] = useState('');
  const [toPayActivePeriod, setToPayActivePeriod] = useState<PeriodType>('all');
  const [toPayIsCustomDateRange, setToPayIsCustomDateRange] = useState(false);
  const [toPayDateRange, setToPayDateRange] = useState(() => calculatePeriodDateRange('all'));

  const handleToPayPeriodChange = (period: PeriodType) => {
    setToPayActivePeriod(period);
    setToPayIsCustomDateRange(false);
    setToPayDateRange(calculatePeriodDateRange(period));
  };

  const handleToPayCalendarRangeSelect = (start: string, end: string) => {
    setToPayIsCustomDateRange(true);
    setToPayActivePeriod('all');
    setToPayDateRange({ start, end });
  };

  // Paid tab filters
  const [paidSearchTerm, setPaidSearchTerm] = useState('');
  const [paidActivePeriod, setPaidActivePeriod] = useState<PeriodType>('month');
  const [paidIsCustomDateRange, setPaidIsCustomDateRange] = useState(false);
  const [paidDateRange, setPaidDateRange] = useState(() => calculatePeriodDateRange('month'));

  const handlePaidPeriodChange = (period: PeriodType) => {
    setPaidActivePeriod(period);
    setPaidIsCustomDateRange(false);
    setPaidDateRange(calculatePeriodDateRange(period));
  };

  const handlePaidCalendarRangeSelect = (start: string, end: string) => {
    setPaidIsCustomDateRange(true);
    setPaidActivePeriod('all');
    setPaidDateRange({ start, end });
  };

  // Payment submission states
  const [showPaymentSubmitModal, setShowPaymentSubmitModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'bank_transfer',
    transactionId: '',
    notes: '',
    receiptImage: ''
  });
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [paymentSubmitError, setPaymentSubmitError] = useState<string | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentMethodWarning, setPaymentMethodWarning] = useState<string | null>(null);

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
  const [prefillContractId, setPrefillContractId] = useState<number | null>(null);
  const [showLinkAccountModal, setShowLinkAccountModal] = useState(false);
  const [linkSearchQuery, setLinkSearchQuery] = useState('');
  const [linkSearchResults, setLinkSearchResults] = useState<{managers: Manager[], restaurants: Restaurant[]}>({managers: [], restaurants: []});
  const [showLinkSearchDropdown, setShowLinkSearchDropdown] = useState(false);
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [, setCurrencyConfig] = useState<Record<string, any>>({});
  const [invoiceCategories, setInvoiceCategories] = useState<InvoiceCategory[]>([]);
  const [additionalChargesMap, setAdditionalChargesMap] = useState<{ [currency: string]: AdditionalChargeConfig[] }>({});
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
    currency: 'MYR',
    discountType: 'none' as 'none' | 'percentage' | 'fixed',
    discountValue: '',
    discountReason: ''
  });

  // Fetch invoices from API
  const fetchInvoices = async () => {
    try {
      const token = getAuthToken();
      if (!token) { setInvoices([]); return; }

      const response = await fetch('/api/invoices', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
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

  const fetchInvoicesToPay = async () => {
    try {
      const token = getAuthToken();
      if (!token) { setInvoicesToPay([]); return; }

      const response = await fetch('/api/invoices/to-pay', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        const data = await response.json();
        setInvoicesToPay(data);
        // Reflect server-side restoreSubscription right away (suspended → active).
        refreshUser();
      } else {
        setInvoicesToPay([]);
      }
    } catch (error) {
      console.error('Error fetching invoices to pay:', error);
      setInvoicesToPay([]);
    }
  };

  const fetchPaidInvoices = async () => {
    try {
      const token = getAuthToken();
      if (!token) { setPaidInvoicesList([]); return; }

      const response = await fetch('/api/invoices/to-pay?status=paid', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
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

  const handleSubmitPayment = async () => {
    if (!selectedInvoice) return;
    setPaymentSubmitError(null);
    setIsSubmittingPayment(true);

    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/submit-payment`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
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
        setSuccessMessage('Payment submitted successfully! The issuer will review and confirm your payment.');
        setShowSuccessModal(true);
        await fetchInvoicesToPay();
        await fetchPaidInvoices();
        window.dispatchEvent(new Event('refreshBadgeCounts'));
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

  const fetchPaymentMethods = async (currency: string, issuerType?: string, issuerId?: number | string) => {
    setLoadingPaymentMethods(true);
    try {
      let url = `/api/admin/payment-settings/available/${currency}`;
      if (issuerType === 'brand' && issuerId) {
        url = `/api/brands/${issuerId}/payment-settings/available/${currency}`;
      } else if (issuerType === 'foodcourt' && issuerId) {
        url = `/api/foodcourts/${issuerId}/payment-settings/available/${currency}`;
      }
      const token = getAuthToken();
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAvailablePaymentMethods(data.methods || []);
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

  const handleConfirmFreeInvoice = async (invoice: Invoice) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${invoice.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: JSON.stringify({ status: 'paid', paid_amount: 0, payment_notes: 'Free invoice - confirmed by recipient' })
      });
      if (response.ok) { fetchInvoices(); }
    } catch (error) {
      console.error('Failed to confirm free invoice:', error);
    }
  };

  const handlePayInvoice = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({ paymentMethod: '', transactionId: '', notes: '', receiptImage: '' });
    setShowPaymentSubmitModal(true);
    await fetchPaymentMethods(invoice.currency || 'MYR', invoice.issuerType, invoice.issuerId);
  };

  const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 800, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target?.result as string; };
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
        if (!ctx) { reject(new Error('Failed to get canvas context')); return; }
        ctx.drawImage(img, 0, 0, width, height);
        const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(resizedBase64);
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleReceiptImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { setPaymentSubmitError('Please upload an image file (JPG, PNG, etc.)'); return; }
    if (file.size > 10 * 1024 * 1024) { setPaymentSubmitError('File size must be less than 10MB'); return; }
    try {
      setPaymentSubmitError(null);
      const resizedImage = await resizeImage(file, 1024, 1024, 0.8);
      setPaymentData(prev => ({ ...prev, receiptImage: resizedImage }));
    } catch (error) {
      console.error('Error processing image:', error);
      setPaymentSubmitError('Failed to process image. Please try another file.');
    }
  };

  const fetchInvoiceCategories = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/invoices/categories/all', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) { setInvoiceCategories(data.data); }
      }
    } catch (error) {
      console.error('Error fetching invoice categories:', error);
    }
  }, []);

  const fetchBrandPaymentSettings = useCallback(async () => {
    if (!user?.brand_id) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/brands/${user.brand_id}/payment-settings`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const responseData = await response.json();
        const data = responseData.data || responseData;
        if (data.payment_settings?.additionalCharges) {
          const raw = data.payment_settings.additionalCharges;
          if (Array.isArray(raw)) { setAdditionalChargesMap({}); }
          else { setAdditionalChargesMap(raw); }
        }
      }
    } catch (error) {
      console.error('Error fetching brand payment settings:', error);
    }
  }, [user?.brand_id]);

  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
    setEditingCategory(null);
    setCategoryFormData({ name: '', code: '', description: '' });
  };

  // 2026-06-16: invoice 카테고리 생성/수정 핸들러가 누락돼 있어 [Create] 버튼이 동작하지 않던 것 수정.
  // 백엔드 POST/PUT /api/invoices/categories 는 정상(재현 201). 프론트 연결만 추가.
  const handleSaveCategory = async () => {
    if (savingCategory || !categoryFormData.name || !categoryFormData.code) return;
    setSavingCategory(true);
    try {
      const token = getAuthToken();
      const url = editingCategory
        ? `/api/invoices/categories/${editingCategory.id}`
        : '/api/invoices/categories';
      const response = await fetch(url, {
        method: editingCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: JSON.stringify({
          name: categoryFormData.name,
          code: categoryFormData.code,
          description: categoryFormData.description || null
        })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        handleCloseCategoryModal();
        fetchInvoiceCategories();
      } else {
        setSuccessMessage(data.message || data.error || 'Failed to save category');
        setShowSuccessModal(true);
      }
    } catch (error) {
      setSuccessMessage('Failed to save category');
      setShowSuccessModal(true);
    } finally {
      setSavingCategory(false);
    }
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
        setSuccessMessage(data.error || 'Failed to delete category');
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      setSuccessMessage('Failed to delete category. Please try again.');
      setShowSuccessModal(true);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchInvoicesToPay();
    fetchPaidInvoices();
    fetchManagers();
    fetchRestaurants();
    fetchCompanySettings();
    fetchCurrencyConfig();
    fetchInvoiceCategories();
    fetchBrandPaymentSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefill from ?contract_id=X&action=create — one-time invoice flow originated from ContractDetail
  useEffect(() => {
    const cid = searchParams.get('contract_id');
    const action = searchParams.get('action');
    if (!cid || action !== 'create') return;
    (async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/contracts/${cid}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (!data.success) return;
        const c = data.data;
        setPrefillContractId(Number(cid));
        if (c.restaurant_id) {
          setPayerMode('member');
          // selectedTarget will need restaurant object — defer to search-based selection
        } else {
          setPayerMode('external');
          setExternalPayer({
            name: c.applicant_contact_person || c.applicant_company_name || '',
            email: c.applicant_email || '',
            phone: c.applicant_phone || '',
            company: c.applicant_company_name || '',
            address: c.applicant_location || '',
            tax_id: c.applicant_business_registration || ''
          });
        }
        setShowCreateInvoiceModal(true);
        // Clean URL after prefilling so reload doesn't retrigger
        setSearchParams(prev => {
          const p = new URLSearchParams(prev);
          p.delete('contract_id'); p.delete('action');
          return p;
        }, { replace: true });
      } catch (e) { console.error('Prefill from contract failed:', e); }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChargesForCurrency = (currency: string) => {
    const code = normalizeCurrencyCode(currency);
    return additionalChargesMap[code] || additionalChargesMap[currency] || [];
  };

  const additionalCharges = getChargesForCurrency(newInvoice.currency);

  const fetchCurrencyConfig = async () => {
    try {
      const response = await fetch('/api/currencies/config');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.currencies) { setCurrencyConfig(data.currencies); }
      }
    } catch (error) {
      console.error('Error fetching currency config:', error);
    }
  };

  const fetchManagers = async () => {
    try {
      const token = getAuthToken();
      const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
      const [managerRes, foodcourtRes, brandRes] = await Promise.all([
        fetch('/api/users?role=Manager', { headers }),
        fetch('/api/users?role=Foodcourt_Manager', { headers }),
        fetch('/api/users?role=Brand_Manager', { headers })
      ]);

      let allManagers: Manager[] = [];
      for (const [res, defaultCompany] of [[managerRes, 'Restaurant Manager'], [foodcourtRes, 'Foodcourt Manager'], [brandRes, 'Brand Manager']] as [Response, string][]) {
        if (res.ok) {
          const response = await res.json();
          const users = response.success ? response.data : (Array.isArray(response) ? response : []);
          if (Array.isArray(users)) {
            const transformed = users.map((user: any) => ({
              id: user.id.toString(),
              fullName: user.full_name || user.username,
              email: user.email,
              role: user.role,
              companyName: user.company_name || defaultCompany
            }));
            allManagers = [...allManagers, ...transformed];
          }
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
      const token = getAuthToken();
      const response = await fetch('/api/restaurants', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        const data = await response.json();
        const transformedRestaurants = data.map((restaurant: any) => ({
          id: restaurant.id.toString(),
          name: restaurant.name,
          admin_id: restaurant.admin_id?.toString() || restaurant.managerId?.toString() || '',
          status: restaurant.status,
          address: restaurant.address || ''
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
    if (query.length < 2) { setSearchResults({managers: [], restaurants: []}); return; }
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults({ managers: [], restaurants: filteredRestaurants.slice(0, 5) });
  };

  const handleEditSearch = (query: string) => {
    setEditSearchQuery(query);
    setShowEditSearchDropdown(true);
    if (query.length < 2) { setEditSearchResults({managers: [], restaurants: []}); return; }
    const filteredRestaurants = restaurants.filter(restaurant =>
      restaurant.name && restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setEditSearchResults({ managers: [], restaurants: filteredRestaurants.slice(0, 5) });
  };

  const handleEditTargetSelect = (type: 'manager' | 'restaurant', data: Manager | Restaurant) => {
    setEditSelectedTarget({type, data});
    setEditSearchQuery(type === 'manager' ? (data as Manager).fullName : (data as Restaurant).name);
    setShowEditSearchDropdown(false);
    if (type === 'manager') {
      const manager = data as Manager;
      setEditInvoice({ ...editInvoice, managerId: manager.id, managerName: manager.fullName, companyName: manager.companyName || '', restaurantId: '', restaurantName: '' });
    } else {
      const restaurant = data as Restaurant;
      const manager = managers.find(m => m.id === restaurant.admin_id);
      setEditInvoice({ ...editInvoice, managerId: manager?.id || '', managerName: manager?.fullName || '', companyName: manager?.companyName || '', restaurantId: restaurant.id, restaurantName: restaurant.name });
    }
  };

  const checkBrandPaymentMethods = async (currency: string) => {
    try {
      const token = getAuthToken();
      const brandId = user?.brand_id;
      if (!brandId) return;
      const response = await fetch(`/api/brands/${brandId}/payment-settings/available/${currency}`, {
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
    if (type === 'manager') {
      const manager = data as Manager;
      const currency = operationSettings.currency || 'MYR';
      setNewInvoice({ ...newInvoice, managerId: manager.id, managerName: manager.fullName, companyName: manager.companyName || '', restaurantId: '', restaurantName: '', currency });
      await checkBrandPaymentMethods(currency);
    } else {
      const restaurant = data as Restaurant;
      const manager = managers.find(m => m.id === restaurant.admin_id);
      let currency = (restaurant as any).currency || 'MYR';
      if (currency === 'RM') currency = 'MYR';
      setNewInvoice({ ...newInvoice, restaurantId: restaurant.id, restaurantName: restaurant.name, managerId: restaurant.admin_id, managerName: manager ? manager.fullName : '', companyName: restaurant.name, currency });
      await checkBrandPaymentMethods(currency);
      // Prefill amount/description from active Brand contract's financial_terms
      // (system_monthly_fee for franchise subscription billing). Optional — silent
      // on failure so the user can fill manually if no contract is linked.
      try {
        const token = getAuthToken();
        const r = await fetch(`/api/contracts?restaurant_id=${restaurant.id}&stage=active`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (r.ok) {
          const j = await r.json();
          const list = j.data || j.contracts || j || [];
          const contract = Array.isArray(list) ? list[0] : null;
          const ft = contract?.financial_terms || {};
          const fee = Number(ft.system_monthly_fee) || 0;
          if (fee > 0) {
            const cnum = contract.contract_number || `#${contract.id}`;
            setNewInvoice(prev => ({
              ...prev,
              amount: String(fee),
              total: String(fee),
              description: `Monthly subscription — Contract ${cnum}`,
              invoiceCategory: 'subscription',
              billingCycle: 'monthly'
            }));
            setPrefillContractId(contract.id);
          }
        }
      } catch { /* prefill is best-effort */ }
    }
  };

  const fetchCompanySettings = async () => {
    try {
      const token = getAuthToken();
      const brandResponse = await fetch('/api/brands/company-info', {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      if (brandResponse.ok) {
        const brandData = await brandResponse.json();
        setCompanySettings({
          companyName: brandData.company_name || brandData.name || '',
          address: brandData.address || '', city: brandData.city || '', state: brandData.state || '',
          postalCode: brandData.postal_code || '', country: brandData.country || '',
          phone: brandData.phone || '', email: brandData.email || '', website: brandData.website || '',
          taxNumber: brandData.tax_no || '', registrationNumber: brandData.registration_no || '',
          companyLogo: brandData.logo_url || '',
          bankName: brandData.bank_name || '', bankAccount: brandData.bank_account || '',
          bankAccountName: brandData.bank_account_name || ''
        });
        return;
      }
      const response = await fetch('/api/admin/settings');
      if (response.ok) {
        const data = await response.json();
        setCompanySettings(data);
      } else {
        setCompanySettings({ companyName: '', address: '', city: '', state: '', postalCode: '', country: '', phone: '', email: '', website: '', taxNumber: '', registrationNumber: '', companyLogo: '' });
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);
      setCompanySettings({ companyName: '', address: '', city: '', state: '', postalCode: '', country: '', phone: '', email: '', website: '', taxNumber: '', registrationNumber: '', companyLogo: '' });
    }
  };

  // Generate invoice HTML content (shared for PDF, Print, Email)
  const generateInvoiceHTML = (invoice: Invoice) => {
    const isReceivedInvoice = activeTab === 'to_pay' || activeTab === 'paid';
    const hasIssuerInfo = !!invoice.issuerInfo;
    const displayCompany = hasIssuerInfo ? {
      companyName: invoice.issuerInfo?.name || companySettings?.companyName,
      companyLogo: invoice.issuerInfo?.logoUrl || companySettings?.companyLogo,
      address: invoice.issuerInfo?.address || companySettings?.address,
      city: invoice.issuerInfo?.city || companySettings?.city,
      state: invoice.issuerInfo?.state || companySettings?.state,
      postalCode: invoice.issuerInfo?.postalCode || companySettings?.postalCode,
      country: invoice.issuerInfo?.country || companySettings?.country,
      phone: invoice.issuerInfo?.phone || companySettings?.phone,
      email: invoice.issuerInfo?.email || companySettings?.email,
      bankName: invoice.issuerInfo?.bankName || companySettings?.bankName,
      bankAccount: invoice.issuerInfo?.bankAccount || companySettings?.bankAccount,
      bankAccountName: invoice.issuerInfo?.bankAccountName || companySettings?.bankAccountName,
      swiftCode: invoice.issuerInfo?.swiftCode || '',
      taxNumber: invoice.issuerInfo?.taxId || companySettings?.taxNumber,
      registrationNumber: invoice.issuerInfo?.businessRegistration || companySettings?.registrationNumber
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
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 24px; border-bottom: 2px solid #C7CED6; }
        .logo-section { flex: 1; max-width: 400px; }
        .company-logo { max-height: 60px; margin-bottom: 10px; }
        .company-name { font-size: 20px; font-weight: 700; color: #0A2540; margin-bottom: 8px; }
        .company-details { font-size: 13px; color: #4B5563; line-height: 1.6; }
        .invoice-title { text-align: right; }
        .invoice-label { font-size: 24px; font-weight: 700; color: #635BFF; margin-bottom: 8px; }
        .invoice-number { font-size: 16px; font-weight: 600; color: #0A2540; margin-bottom: 8px; }
        .invoice-status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
        .status-paid { background: #ECFDF5; color: #059669; }
        .status-pending { background: #FEF3C7; color: #D97706; }
        .status-submitted { background: #DBEAFE; color: #1E40AF; }
        .status-overdue { background: #FEE2E2; color: #DC2626; }
        .status-cancelled { background: #FEF2F2; color: #DC2626; }
        .status-draft { background: #F1F4F8; color: #4B5563; }
        .billing-info { display: flex; justify-content: space-between; margin-bottom: 24px; }
        .bill-to-section { flex: 1; }
        .section-label { font-size: 12px; font-weight: 600; color: #4B5563; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
        .customer-name { font-size: 15px; font-weight: 600; color: #0A2540; }
        .customer-details { font-size: 13px; color: #4B5563; margin-top: 4px; }
        .dates-section { text-align: right; }
        .date-row { display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 6px; font-size: 13px; }
        .date-label { color: #4B5563; }
        .date-value { color: #0A2540; font-weight: 500; min-width: 140px; }
        .items-section { margin-bottom: 24px; }
        .items-table { width: 100%; border-collapse: collapse; }
        .items-table th { text-align: left; padding: 12px 8px; font-size: 12px; font-weight: 600; color: #4B5563; text-transform: uppercase; border-bottom: 2px solid #C7CED6; }
        .items-table th.text-center { text-align: center; }
        .items-table th.text-right { text-align: right; }
        .items-table td { padding: 12px 8px; font-size: 14px; color: #1F2937; border-bottom: 1px solid #F1F4F8; }
        .items-table td.text-center { text-align: center; }
        .items-table td.text-right { text-align: right; white-space: nowrap; }
        .items-table th.text-right { white-space: nowrap; }
        .summary-section { display: flex; justify-content: flex-end; margin-bottom: 24px; }
        .summary-box { width: 280px; }
        .summary-row { display: flex; justify-content: space-between; padding: 8px 12px; font-size: 14px; white-space: nowrap; }
        .summary-row.subtotal { color: #4B5563; }
        .summary-row.tax { color: #4B5563; }
        .summary-row.total { background: #F1F4F8; border-radius: 6px; font-weight: 700; font-size: 16px; color: #0A2540; margin-top: 8px; }
        .bank-section { background: #F1F4F8; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
        .bank-title { font-size: 12px; font-weight: 600; color: #4B5563; margin-bottom: 8px; text-transform: uppercase; }
        .bank-details { font-size: 13px; color: #1F2937; line-height: 1.6; }
        .registration-info { font-size: 12px; color: #6B7280; text-align: center; margin-top: 16px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #C7CED6; text-align: center; }
        .footer-text { font-size: 12px; color: #4B5563; margin-bottom: 4px; }
        ${INVOICE_PRINT_CSS}
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div class="logo-section">
                ${displayCompany.companyLogo ? `<img src="${displayCompany.companyLogo}" alt="Company Logo" class="company-logo">` : ''}
                <div class="company-name" style="${displayCompany.companyLogo ? 'font-size: 14px;' : ''}">${displayCompany.companyName || 'Company Name'}</div>
                <div class="company-details">
                    ${formatAddressHtml({
                      address: displayCompany.address,
                      city: displayCompany.city,
                      state: displayCompany.state,
                      postal_code: displayCompany.postalCode,
                      country: displayCompany.country
                    }, (i18n.language as AppLocale) || 'en')}
                    ${displayCompany.phone ? `Tel: ${displayCompany.phone}<br>` : ''}
                    ${displayCompany.email ? `Email: ${displayCompany.email}` : ''}
                </div>
            </div>
            <div class="invoice-title">
                <div class="invoice-label">${t('brand:brandInvoicesPage.invoice')}</div>
                <div class="invoice-number">${invoice.invoiceNumber}</div>
                <span class="invoice-status ${getStatusClass(invoice.status)}">${getStatusText(invoice.status)}</span>
            </div>
        </div>
        <div class="billing-info">
            <div class="bill-to-section">
                <div class="section-label">${t('brand:brandInvoicesPage.billTo')}</div>
                ${isReceivedInvoice ? `
                <div class="customer-name">${companySettings?.companyName || 'Your Company'}</div>
                ${(() => {
                  const html = formatAddressHtml({
                    address: companySettings?.address,
                    city: companySettings?.city,
                    state: companySettings?.state,
                    postal_code: companySettings?.postalCode,
                    country: companySettings?.country
                  }, (i18n.language as AppLocale) || 'en');
                  return html ? `<div class="customer-details">${html.replace(/<br>$/, '')}</div>` : '';
                })()}
                ${companySettings?.email ? `<div class="customer-details">${companySettings.email}</div>` : ''}
                ` : `
                <div class="customer-name">${invoice.customerName || invoice.managerName || 'Customer'}</div>
                ${invoice.customerAddress ? `<div class="customer-details">${invoice.customerAddress}</div>` : ''}
                ${invoice.payerType === 'restaurant' && invoice.restaurantName && invoice.restaurantName !== 'Unknown' ? `<div class="customer-details">Restaurant: ${invoice.restaurantName}</div>` : ''}
                `}
            </div>
            <div class="dates-section">
                <div class="date-row"><span class="date-label">Billing Period:</span><span class="date-value">${invoice.billingPeriod || '-'}</span></div>
                <div class="date-row"><span class="date-label">Issue Date:</span><span class="date-value">${formatDate(invoice.issueDate)}</span></div>
                <div class="date-row"><span class="date-label">Due Date:</span><span class="date-value">${formatDate(invoice.dueDate)}</span></div>
                ${invoice.paidDate ? `<div class="date-row"><span class="date-label">Paid Date:</span><span class="date-value">${formatDate(invoice.paidDate)}</span></div>` : ''}
            </div>
        </div>
        <div class="items-section">
            <div class="section-label">${t('brand:brandInvoicesPage.items')}</div>
            <table class="items-table">
                <thead><tr><th>${t('brand:brandInvoicesPage.description')}</th><th class="text-center">${t('brand:brandInvoicesPage.qty')}</th><th class="text-right">${t('brand:brandInvoicesPage.unitPrice')}</th><th class="text-right">${t('brand:brandInvoicesPage.amount')}</th></tr></thead>
                <tbody>${invoice.items.map(item => `<tr><td>${item.description}</td><td class="text-center">${item.quantity}</td><td class="text-right">${formatCurrency(item.unitPrice, invoice.currency || 'MYR')}</td><td class="text-right">${formatCurrency(item.total, invoice.currency || 'MYR')}</td></tr>`).join('')}</tbody>
            </table>
        </div>
        <div class="summary-section">
            <div class="summary-box">
                <div class="summary-row subtotal"><span>Subtotal:</span><span>${formatCurrency(invoice.amount, invoice.currency || 'MYR')}</span></div>
                ${invoice.discountType && invoice.discountType !== 'none' && (invoice.discountAmount ?? 0) > 0 ? `<div class="summary-row tax" style="color: #15803D;"><span>Discount${invoice.discountType === 'percentage' ? ` (${invoice.discountValue}%)` : ''}:</span><span>-${formatCurrency(invoice.discountAmount!, invoice.currency || 'MYR')}</span></div>` : ''}
                ${(invoice.additionalCharges || []).map(charge => `<div class="summary-row tax"><span>${charge.name} (${charge.rate}%):</span><span>${formatCurrency(charge.amount, invoice.currency || 'MYR')}</span></div>`).join('')}
                <div class="summary-row total"><span>Total:</span><span>${formatCurrency(invoice.total, invoice.currency || 'MYR')}</span></div>
            </div>
        </div>
        ${displayCompany.bankName ? `<div class="bank-section"><div class="bank-title">${t('brand:brandInvoicesPage.paymentDetails')}</div><div class="bank-details"><strong>Bank:</strong> ${displayCompany.bankName}<br><strong>Account Name:</strong> ${displayCompany.bankAccountName || '-'}<br><strong>Account Number:</strong> ${displayCompany.bankAccount || '-'}${displayCompany.swiftCode ? `<br><strong>SWIFT Code:</strong> ${displayCompany.swiftCode}` : ''}</div></div>` : ''}
        ${(displayCompany.taxNumber || displayCompany.registrationNumber) ? `<div class="registration-info">${displayCompany.registrationNumber ? `Reg No: ${displayCompany.registrationNumber}` : ''}${displayCompany.registrationNumber && displayCompany.taxNumber ? ' | ' : ''}${displayCompany.taxNumber ? `Tax No: ${displayCompany.taxNumber}` : ''}</div>` : ''}
        <div class="footer"><div class="footer-text">${t('brand:brandInvoicesPage.thankYouForYourBusiness')}</div><div class="footer-text">${t('brand:brandInvoicesPage.thisIsAComputergeneratedInvoiceAndDoesNotRequireASignature')}</div></div>
    </div>
</body>
</html>`;
  };

  const generateInvoicePDF = async (invoice: Invoice) => {
    const hasCompanyInfo = ((activeTab === 'to_pay' || activeTab === 'paid') && invoice.issuerInfo) || companySettings;
    if (!hasCompanyInfo) { setSuccessMessage('Company settings not loaded. Please try again.'); setShowSuccessModal(true); return; }
    try {
      const invoiceHTML = generateInvoiceHTML(invoice);
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed'; iframe.style.left = '-10000px'; iframe.style.top = '-10000px';
      iframe.style.width = '800px'; iframe.style.height = '1200px'; iframe.style.visibility = 'hidden'; iframe.style.pointerEvents = 'none';
      document.body.appendChild(iframe);
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) { document.body.removeChild(iframe); throw new Error('Could not access iframe document'); }
      iframeDoc.open(); iframeDoc.write(invoiceHTML); iframeDoc.close();
      try { await renderIframeToPdf(iframe, `Invoice-${invoice.invoiceNumber}.pdf`); } finally { document.body.removeChild(iframe); }
    } catch (error) {
      console.error('Error generating PDF:', error);
      setSuccessMessage('Failed to generate PDF. Please try again.'); setShowSuccessModal(true);
    }
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    const hasCompanyInfo = ((activeTab === 'to_pay' || activeTab === 'paid') && invoice.issuerInfo) || companySettings;
    if (!hasCompanyInfo) { setSuccessMessage('Company settings not loaded. Please try again.'); setShowSuccessModal(true); return; }
    printHTMLContent(generateInvoiceHTML(invoice), `Invoice ${invoice.invoiceNumber}`);
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
    if (!emailInvoice || !emailRecipient) { setSuccessMessage('Please enter a valid email address.'); setShowSuccessModal(true); return; }
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${emailInvoice.id}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ recipientEmail: emailRecipient })
      });
      if (response.ok) {
        setSuccessMessage(`Invoice sent successfully to ${emailRecipient}`);
        setShowEmailModal(false); setEmailInvoice(null); setEmailRecipient('');
      } else {
        const data = await response.json();
        setSuccessMessage(data.message || data.error || 'Failed to send invoice email.');
      }
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error sending invoice email:', error);
      setSuccessMessage('Failed to send invoice email. Please try again.'); setShowSuccessModal(true);
    }
  };

  const resetInvoiceForm = () => {
    setNewInvoice({ managerId: '', managerName: '', companyName: '', restaurantId: '', restaurantName: '', amount: '', tax: '0', total: '0', description: '', dueDate: '', planType: 'professional', billingCycle: 'monthly', invoiceCategory: 'service', customDescription: '', serviceDescription: '', currency: 'MYR', discountType: 'none' as 'none' | 'percentage' | 'fixed', discountValue: '', discountReason: '' });
    setSelectedTarget(null); setSearchQuery(''); setShowSearchDropdown(false);
    setPayerMode('member'); setExternalPayer({ name: '', email: '', phone: '', company: '', address: '', tax_id: '' });
    setPrefillContractId(null);
  };

  const formatDate = (dateString: string) => {
    return formatDateTime(dateString, operationSettings, { year: 'numeric', month: '2-digit', day: '2-digit' });
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

  const getTypeDisplay = (type: string) => {
    switch(type) {
      case 'automatic': return 'Automatic';
      case 'manual': return 'Manual';
      default: return type || 'Manual';
    }
  };

  // Filtered invoices
  const filteredInvoices = invoices.filter(invoice => {
    const term = searchTerm.toLowerCase();
    const statusText = getStatusDisplay(invoice.status).toLowerCase();
    const typeText = getTypeDisplay(invoice.type || '').toLowerCase();
    const payerText = getPayerDisplay(invoice.payerType || '').toLowerCase();
    const matchesSearch = !searchTerm || (invoice.companyName || '').toLowerCase().includes(term) || (invoice.invoiceNumber || '').toLowerCase().includes(term) || (invoice.managerName || '').toLowerCase().includes(term) || (invoice.restaurantName || '').toLowerCase().includes(term) || statusText.includes(term) || typeText.includes(term) || payerText.includes(term) || (invoice.categoryDisplayName || '').toLowerCase().includes(term) || (invoice.planType || '').toLowerCase().includes(term);
    let matchesDateRange = true;
    if (dateRange.start && dateRange.end) {
      const invoiceDate = new Date(invoice.issueDate);
      const startDate = new Date(dateRange.start); const endDate = new Date(dateRange.end);
      startDate.setHours(0, 0, 0, 0); endDate.setHours(23, 59, 59, 999);
      matchesDateRange = invoiceDate >= startDate && invoiceDate <= endDate;
    }
    return matchesSearch && matchesDateRange;
  }).sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

  const allInvoices = [...invoices, ...invoicesToPay];
  const totalIssuedCount = invoices.length;
  const totalToPayCount = invoicesToPay.length;
  const overdueInvoices = allInvoices.filter(i => isInvoiceOverdue(i)).length;
  const pendingInvoices = allInvoices.filter(i => i.status === 'pending_payment' || i.status === 'payment_submitted').length;

  const filteredInvoicesToPay = invoicesToPay.filter(invoice => {
    if (!toPaySearchTerm) return true;
    const term = toPaySearchTerm.toLowerCase();
    const statusText = getStatusDisplay(invoice.status).toLowerCase();
    return (invoice.invoiceNumber || '').toLowerCase().includes(term) || (invoice.issuerName || '').toLowerCase().includes(term) || (invoice.restaurantName || '').toLowerCase().includes(term) || statusText.includes(term) || (invoice.categoryDisplayName || '').toLowerCase().includes(term) || (invoice.planType || '').toLowerCase().includes(term);
  }).sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());

  const filteredPaidInvoices = paidInvoicesList.filter(invoice => {
    const term = paidSearchTerm.toLowerCase();
    const matchesSearch = !paidSearchTerm || invoice.invoiceNumber.toLowerCase().includes(term) || (invoice.issuerName || '').toLowerCase().includes(term) || (invoice.restaurantName || '').toLowerCase().includes(term) || (invoice.categoryDisplayName || '').toLowerCase().includes(term) || (invoice.planType || '').toLowerCase().includes(term);
    let matchesDateRange = true;
    if (paidDateRange.start && paidDateRange.end) {
      const invoiceDate = new Date(invoice.paidDate || invoice.issueDate);
      const startDate = new Date(paidDateRange.start); const endDate = new Date(paidDateRange.end);
      startDate.setHours(0, 0, 0, 0); endDate.setHours(23, 59, 59, 999);
      matchesDateRange = invoiceDate >= startDate && invoiceDate <= endDate;
    }
    return matchesSearch && matchesDateRange;
  }).sort((a, b) => new Date(b.paidDate || b.issueDate).getTime() - new Date(a.paidDate || a.issueDate).getTime());

  const issuedPg = usePagination(filteredInvoices, 20);
  const toPayPg = usePagination(filteredInvoicesToPay, 20);
  const paidPg = usePagination(filteredPaidInvoices, 20);

  const handleCreateInvoice = () => { resetInvoiceForm(); setShowCreateInvoiceModal(true); };

  const handleLinkSearch = (query: string) => {
    setLinkSearchQuery(query);
    if (!query.trim()) { setLinkSearchResults({managers: [], restaurants: []}); return; }
    const q = query.toLowerCase();
    const filteredRestaurants = restaurants.filter(r => r.name.toLowerCase().includes(q) || (r.address && r.address.toLowerCase().includes(q))).slice(0, 5);
    setLinkSearchResults({managers: [], restaurants: filteredRestaurants});
  };

  const handleLinkAccount = async (targetType: 'restaurant' | 'manager', targetData: Restaurant | Manager) => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const linkData: any = { payer_type: 'restaurant' };
      if (targetType === 'restaurant') { linkData.restaurant_id = (targetData as Restaurant).id; }
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/link-account`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(linkData)
      });
      if (response.ok) {
        await fetchInvoices(); setShowLinkAccountModal(false); setShowViewModal(false);
        setSuccessMessage('Invoice linked to member account successfully.'); setShowSuccessModal(true);
      } else {
        const errorData = await response.json();
        setSuccessMessage(`Failed to link account: ${errorData.message || 'Unknown error'}`);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Error linking account:', error);
      setSuccessMessage('Error linking account. Please try again.');
      setShowSuccessModal(true);
    }
  };

  const handleViewInvoice = (invoice: Invoice) => { setSelectedInvoice(invoice); setShowViewModal(true); };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    const formatDateForInput = (dateStr: string | undefined) => { if (!dateStr) return ''; const date = new Date(dateStr); return date.toISOString().split('T')[0]; };
    setEditInvoice({
      managerId: invoice.managerId, managerName: invoice.managerName, companyName: invoice.companyName || '',
      restaurantId: invoice.restaurantId || '', restaurantName: invoice.restaurantName || '',
      amount: invoice.amount.toString(), tax: invoice.tax.toString(), total: invoice.total.toString(),
      dueDate: formatDateForInput(invoice.dueDate), status: invoice.status, planType: invoice.planType,
      billingCycle: 'monthly', description: invoice.items?.[0]?.description || '',
      payerType: invoice.payerType || 'restaurant', payerId: invoice.payerId || '',
      invoiceCategory: invoice.invoiceCategory || 'service', customDescription: invoice.customDescription || '',
      serviceDescription: invoice.serviceDescription || '', currency: invoice.currency || 'MYR', items: invoice.items
    });
    if (invoice.restaurantId) {
      const restaurant = restaurants.find(r => r.id === invoice.restaurantId);
      if (restaurant) { setEditSelectedTarget({type: 'restaurant', data: restaurant}); setEditSearchQuery(restaurant.name); }
    } else if (invoice.managerId) {
      const manager = managers.find(m => m.id === invoice.managerId);
      if (manager) { setEditSelectedTarget({type: 'manager', data: manager}); setEditSearchQuery(manager.fullName); }
    }
    setEditModificationReason(''); setShowEditModal(true);
  };

  const handleSendInvoice = (invoice: Invoice) => { setSelectedInvoice(invoice); setShowSendConfirmModal(true); };

  const confirmSendInvoice = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'pending_payment' })
      });
      if (response.ok) { await fetchInvoices(); setShowSendConfirmModal(false); setSelectedInvoice(null); }
      else {
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
    if (selectedInvoice.type === 'automatic' && !editModificationReason.trim()) { setSuccessMessage('Please enter a reason for modifying this invoice.'); setShowSuccessModal(true); return; }
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          amount: parseFloat(editInvoice.amount), tax: parseFloat(editInvoice.tax), total: parseFloat(editInvoice.total),
          dueDate: editInvoice.dueDate, status: editInvoice.status, payerType: editInvoice.payerType, payerId: editInvoice.payerId,
          items: editInvoice.items,
          discountType: editInvoice.discountType !== 'none' ? editInvoice.discountType : null,
          discountValue: editInvoice.discountType !== 'none' ? parseFloat(editInvoice.discountValue) || 0 : null,
          discountAmount: (() => { const amt = parseFloat(editInvoice.amount) || 0; const dv = parseFloat(editInvoice.discountValue) || 0; if (editInvoice.discountType === 'percentage') return amt * (dv / 100); if (editInvoice.discountType === 'fixed') return dv; return null; })(),
          discountReason: editInvoice.discountReason || null,
          subtotal: editInvoice.discountType !== 'none' ? parseFloat(editInvoice.amount) || 0 : null,
          additionalCharges: (() => { const amt = parseFloat(editInvoice.amount) || 0; const dv = parseFloat(editInvoice.discountValue) || 0; const da = editInvoice.discountType === 'percentage' ? amt * (dv / 100) : editInvoice.discountType === 'fixed' ? dv : 0; const afterDiscount = Math.max(0, amt - da); const editCharges = getChargesForCurrency(editInvoice.currency || ''); return editCharges.filter((c: any) => c.enabled && c.name && c.rate > 0).map((c: any) => ({ name: c.name, rate: c.rate, amount: Math.round(afterDiscount * c.rate / 100 * 100) / 100 })); })(),
          modificationReason: editModificationReason.trim() || undefined
        }),
      });
      if (response.ok) { await fetchInvoices(); setShowEditModal(false); setSelectedInvoice(null); setEditInvoice(null); setSuccessMessage('Invoice updated successfully!'); setShowSuccessModal(true); }
      else { const errorData = await response.json(); setSuccessMessage(`Failed to update invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true); }
    } catch (error) { console.error('Error updating invoice:', error); setSuccessMessage('Error updating invoice. Please try again.'); setShowSuccessModal(true); }
  };

  const handleSubmitInvoice = async () => {
    if (payerMode === 'member' && (!selectedTarget || !newInvoice.amount || !newInvoice.dueDate)) { setSuccessMessage('Please select a restaurant, enter amount, and set due date.'); setShowSuccessModal(true); return; }
    if (payerMode === 'external' && (!externalPayer.name || !externalPayer.email || !newInvoice.amount || !newInvoice.dueDate)) { setSuccessMessage('Please fill in name, email, amount, and due date.'); setShowSuccessModal(true); return; }
    try {
      const amount = parseFloat(newInvoice.amount);
      const discountVal = parseFloat(newInvoice.discountValue) || 0;
      const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : newInvoice.discountType === 'fixed' ? discountVal : 0;
      const afterDiscount = Math.max(0, amount - discountAmt);
      const calculatedCharges = additionalCharges.filter(charge => charge.enabled && charge.name && charge.rate > 0).map(charge => ({ name: charge.name, rate: charge.rate, amount: Math.round(afterDiscount * charge.rate / 100 * 100) / 100 }));
      const totalChargesAmount = calculatedCharges.reduce((sum, c) => sum + c.amount, 0);
      const total = afterDiscount + totalChargesAmount;
      let description = newInvoice.invoiceCategory === 'others' ? (newInvoice.customDescription || '') : (newInvoice.serviceDescription || '');
      let customerName = '', customerAddress = '', companyNameVal = '', restaurantName = '';
      if (payerMode === 'external') {
        customerName = externalPayer.name; companyNameVal = externalPayer.company || externalPayer.name;
        const addressParts = []; if (externalPayer.address) addressParts.push(externalPayer.address); if (externalPayer.phone) addressParts.push(`Phone: ${externalPayer.phone}`); if (externalPayer.email) addressParts.push(`Email: ${externalPayer.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget?.type === 'restaurant') {
        const restaurant = selectedTarget.data as Restaurant;
        customerName = restaurant.name; restaurantName = restaurant.name; companyNameVal = restaurant.name;
        const addressParts = []; if (restaurant.address) addressParts.push(restaurant.address); if (restaurant.phone) addressParts.push(`Phone: ${restaurant.phone}`); if (restaurant.email) addressParts.push(`Email: ${restaurant.email}`);
        customerAddress = addressParts.join('\n');
      } else if (selectedTarget?.type === 'manager') {
        const manager = selectedTarget.data as Manager;
        customerName = manager.fullName; companyNameVal = manager.companyName || manager.fullName;
        const addressParts = []; if (manager.companyName) addressParts.push(manager.companyName); if (manager.email) addressParts.push(`Email: ${manager.email}`);
        customerAddress = addressParts.join('\n');
      }
      let payerType = 'restaurant'; let payerId: number | null = null;
      if (payerMode === 'external') { payerType = 'external'; }
      else if (selectedTarget?.type === 'restaurant') { payerType = 'restaurant'; payerId = parseInt((selectedTarget.data as Restaurant).id); }
      const invoiceData: any = {
        restaurant_id: payerMode === 'external' ? null : (selectedTarget?.type === 'restaurant' ? (selectedTarget.data as Restaurant).id : null),
        customer_name: customerName, customer_address: customerAddress, company_name: companyNameVal, restaurant_name: restaurantName,
        type: 'manual', billing_period_start: null, billing_period_end: null, due_date: new Date(newInvoice.dueDate).toISOString(),
        total_amount: total, subtotal_before_discount: discountAmt > 0 ? amount : null,
        discount_type: newInvoice.discountType !== 'none' ? newInvoice.discountType : null, discount_value: discountAmt > 0 ? discountVal : null,
        discount_amount: discountAmt > 0 ? discountAmt : null, discount_reason: newInvoice.discountReason || null,
        currency: newInvoice.currency || 'MYR', status: 'draft', notes: description, issued_by: user?.id || 1,
        issued_at: new Date().toISOString(), issuer_type: 'brand', issuer_id: user?.brand_id || null,
        payer_type: payerType, payer_id: payerId, invoice_category: newInvoice.invoiceCategory || 'service',
        custom_description: newInvoice.invoiceCategory === 'others' ? newInvoice.customDescription : null,
        service_description: newInvoice.invoiceCategory !== 'others' ? newInvoice.serviceDescription : null,
        additional_charges: calculatedCharges,
        contract_id: prefillContractId || null
      };
      if (payerMode === 'external') {
        invoiceData.external_payer_name = externalPayer.name; invoiceData.external_payer_email = externalPayer.email;
        invoiceData.external_payer_phone = externalPayer.phone || null; invoiceData.external_payer_company = externalPayer.company || null;
        invoiceData.external_payer_address = externalPayer.address || null; invoiceData.external_payer_tax_id = externalPayer.tax_id || null;
      }
      const items = [{ item_type: newInvoice.invoiceCategory, description, calculation_method: 'fixed', fixed_amount: amount, calculated_amount: amount, tax_rate: 0, tax_amount: 0, total_amount: amount }];
      const token = getAuthToken();
      const response = await fetch('/api/invoices', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ invoice_data: invoiceData, items }) });
      if (response.ok) { await fetchInvoices(); setShowCreateInvoiceModal(false); resetInvoiceForm(); }
      else { const errorData = await response.json(); setSuccessMessage(`Failed to create invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true); }
    } catch (error) { console.error('Error creating invoice:', error); setSuccessMessage('Error creating invoice. Please try again.'); setShowSuccessModal(true); }
  };

  const handleConfirmPayment = (invoice: Invoice) => { setSelectedInvoice(invoice); setShowPaymentConfirmModal(true); };

  const handleMarkAsPaid = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'paid', paid_at: new Date().toISOString() })
      });
      if (response.ok) { await fetchInvoices(); setShowPaymentConfirmModal(false); setSelectedInvoice(null); window.dispatchEvent(new Event('refreshBadgeCounts')); }
      else { const errorData = await response.json(); setSuccessMessage(`Failed to update payment status: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true); }
    } catch (error) { console.error('Error updating payment status:', error); setSuccessMessage('Error updating payment status. Please try again.'); setShowSuccessModal(true); }
  };

  const confirmResendInvoice = () => { if (!selectedInvoice) return; setShowResendConfirmModal(false); setSelectedInvoice(null); };

  const handleDeleteInvoice = (invoice: Invoice) => { setSelectedInvoice(invoice); setShowDeleteConfirmModal(true); };

  const confirmCancelInvoice = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/status`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'cancelled' })
      });
      if (response.ok) { await fetchInvoices(); setShowCancelConfirmModal(false); setSelectedInvoice(null); window.dispatchEvent(new Event('refreshBadgeCounts')); }
      else { const errorData = await response.json(); setSuccessMessage(`Failed to cancel invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true); }
    } catch (error) { console.error('Error cancelling invoice:', error); setSuccessMessage('Error cancelling invoice. Please try again.'); setShowSuccessModal(true); }
  };

  const confirmDeleteInvoice = async () => {
    if (!selectedInvoice) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}`, {
        method: 'DELETE', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) { await fetchInvoices(); setShowDeleteConfirmModal(false); setSelectedInvoice(null); window.dispatchEvent(new Event('refreshBadgeCounts')); }
      else { const errorData = await response.json(); setSuccessMessage(`Failed to delete invoice: ${errorData.error || 'Unknown error'}`); setShowSuccessModal(true); }
    } catch (error) { console.error('Error deleting invoice:', error); setSuccessMessage('Error deleting invoice. Please try again.'); setShowSuccessModal(true); }
  };

  // Render helper for invoice action buttons
  const renderInvoiceActions = (invoice: Invoice, isToPayTab = false) => {
    if (isToPayTab) {
      return (
        <ActionButtons>
          <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>{t('brand:brandInvoicesPage.view')}</LocalActionButton>
          {(invoice.status === 'sent' || invoice.status === 'pending_payment' || invoice.status === 'overdue') && Number(invoice.total) > 0 && (
            <LocalActionButton variant="success" onClick={() => handlePayInvoice(invoice)}>{t('brand:brandInvoicesPage.pay')}</LocalActionButton>
          )}
          {(invoice.status === 'sent' || invoice.status === 'pending_payment' || invoice.status === 'overdue') && Number(invoice.total) === 0 && (
            <LocalActionButton variant="success" onClick={() => handleConfirmFreeInvoice(invoice)}>{t('brand:brandInvoicesPage.confirm')}</LocalActionButton>
          )}
          <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          </LocalActionButton>
          <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          </LocalActionButton>
          <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Email Invoice">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </LocalActionButton>
        </ActionButtons>
      );
    }

    // Issued tab actions
    const pdfBtn = <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>;
    const printBtn = <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></LocalActionButton>;
    const emailBtn = <LocalActionButton variant="email" onClick={() => handleOpenEmailModal(invoice)} title="Send Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></LocalActionButton>;
    const deleteBtn = <LocalIconButton onClick={() => handleDeleteInvoice(invoice)} title="Delete Invoice"><IconSymbol>×</IconSymbol></LocalIconButton>;

    return (
      <ActionButtons>
        <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>{t('brand:brandInvoicesPage.view')}</LocalActionButton>
        {invoice.status === 'draft' && (<><LocalActionButton onClick={() => handleEditInvoice(invoice)}>{t('brand:brandInvoicesPage.edit')}</LocalActionButton><LocalActionButton variant="success" onClick={() => handleSendInvoice(invoice)} title="Send Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22,2 15,22 11,13 2,9 22,2"/></svg></LocalActionButton>{deleteBtn}</>)}
        {(invoice.status === 'pending_payment' || invoice.status === '' || !invoice.status) && (<><LocalActionButton onClick={() => handleEditInvoice(invoice)}>{t('brand:brandInvoicesPage.edit')}</LocalActionButton>{pdfBtn}{printBtn}{emailBtn}{deleteBtn}</>)}
        {invoice.status === 'payment_submitted' && (<>{invoice.hasPaymentInfo && (<LocalActionButton variant="primary" onClick={() => handleConfirmPayment(invoice)}>{t('brand:brandInvoicesPage.confirm')}</LocalActionButton>)}{pdfBtn}{printBtn}{emailBtn}</>)}
        {invoice.status === 'overdue' && (<><LocalActionButton onClick={() => handleEditInvoice(invoice)}>{t('brand:brandInvoicesPage.edit')}</LocalActionButton>{pdfBtn}{printBtn}{emailBtn}{deleteBtn}</>)}
        {invoice.status === 'paid' && (<>{pdfBtn}{printBtn}</>)}
        {invoice.status === 'cancelled' && pdfBtn}
      </ActionButtons>
    );
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('brand:brandInvoicesPage.invoices')}</Title>
          <ActionSection></ActionSection>
        </Header>
        <Content>
          <SuspendedBanner />
          {user?.brand_id && (
            <SubscriptionPanel payerType="brand" payerId={user.brand_id} hideWhenEmpty />
          )}

        <StatsGrid>
          <StatCard color="#059669"><StatValue>{totalIssuedCount}</StatValue><StatLabel>{t('brand:brandInvoicesPage.issued')}</StatLabel><StatDescription>{t('brand:brandInvoicesPage.invoicesYouSent')}</StatDescription></StatCard>
          <StatCard color="#2563EB"><StatValue>{totalToPayCount}</StatValue><StatLabel>{t('brand:brandInvoicesPage.toPay')}</StatLabel><StatDescription>{t('brand:brandInvoicesPage.invoicesReceived')}</StatDescription></StatCard>
          <StatCard color="#F59E0B"><StatValue>{pendingInvoices}</StatValue><StatLabel>{t('brand:brandInvoicesPage.pending')}</StatLabel><StatDescription>{t('brand:brandInvoicesPage.awaitingPayment')}</StatDescription></StatCard>
          <StatCard color="#DC2626"><StatValue>{overdueInvoices}</StatValue><StatLabel>{t('brand:brandInvoicesPage.overdue')}</StatLabel><StatDescription>{t('brand:brandInvoicesPage.requiresAttention')}</StatDescription></StatCard>
        </StatsGrid>

        <Tabs>
          <CommonTab active={activeTab === 'to_pay'} onClick={() => handleTabChange('to_pay')}>Invoices to Pay<TabBadge count={invoicesToPay.filter(i => i.status === 'pending_payment' || i.status === 'overdue').length} variant="warning" /></CommonTab>
          <CommonTab active={activeTab === 'paid'} onClick={() => handleTabChange('paid')}>Paid Invoices<TabBadge count={paidInvoicesList.length} /></CommonTab>
          <CommonTab active={activeTab === 'issued'} onClick={() => handleTabChange('issued')}>Issued Invoices<TabBadge count={invoices.length} /></CommonTab>
          <CommonTab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>Categories<TabBadge count={invoiceCategories.length} /></CommonTab>
        </Tabs>

        {/* Issued Tab */}
        {activeTab === 'issued' && (
          <>
            <FilterBarWrapper>
              <DatePeriodFilter activePeriod={activePeriod} dateRange={dateRange} isCustomDateRange={isCustomDateRange} onPeriodChange={handlePeriodChange} onCalendarRangeSelect={handleCalendarRangeSelect}>
                <SearchInput placeholder="Search invoice, status, company, type..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </DatePeriodFilter>
              <FiltersRight><Button variant="primary" onClick={handleCreateInvoice}>{t('brand:brandInvoicesPage.createInvoice')}</Button></FiltersRight>
            </FilterBarWrapper>
            <DataTableContainer><DataTable><DataTableHead><tr>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.invoice')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.customer')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.period')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.issued')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.due')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.status')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('brand:brandInvoicesPage.amount')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('brand:brandInvoicesPage.total')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.actions')}</DataTableHeaderCell>
            </tr></DataTableHead><tbody>
              {issuedPg.pageItems.map(invoice => (
                <DataTableRow key={invoice.id}>
                  <DataTableCell data-label="Invoice" align="left"><InvoiceInfo><InvoiceNumber>{invoice.invoiceNumber}{invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>{t('brand:brandInvoicesPage.auto')}</AutoBadge>}</InvoiceNumber><CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName></InvoiceInfo></DataTableCell>
                  <DataTableCell data-label="Customer" align="left"><InvoiceInfo><InvoiceNumber>{invoice.externalPayerName || invoice.customerName || invoice.restaurantName || 'Unknown'}{invoice.payerType === 'external' && <span style={{ marginLeft: '6px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px', verticalAlign: 'middle' }}>{t('brand:brandInvoicesPage.nonmember')}</span>}</InvoiceNumber><CompanyName>{getPayerDisplay(invoice.payerType || 'restaurant')}</CompanyName></InvoiceInfo></DataTableCell>
                  <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>{invoice.billingPeriod || '-'}</DataTableCell>
                  <DataTableCell data-label="Issued" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</DataTableCell>
                  <DataTableCell data-label="Due" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</DataTableCell>
                  <DataTableCell data-label="Status" align="center"><StatusBadge status={getEffectiveStatus(invoice)}>{getStatusDisplay(getEffectiveStatus(invoice))}</StatusBadge>{invoice.isModified && (<button type="button" onClick={(e) => { e.stopPropagation(); setHistoryInvoice(invoice); }} title={t('invoiceHistory.viewTooltip', 'View modification history')} style={{ display: 'inline-block', marginLeft: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#B45309', background: '#FEF3C7', borderRadius: '4px', verticalAlign: 'middle', border: '1px solid #FDE68A', cursor: 'pointer' }}>{t('brand:brandInvoicesPage.modified')}</button>)}</DataTableCell>
                  <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('brand:brandInvoicesPage.free')}</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="" mobileFullWidth>{renderInvoiceActions(invoice)}</DataTableCell>
                </DataTableRow>
              ))}
              {filteredInvoices.length === 0 && (<DataTableRow><DataTableCell colSpan={9}><DataTableEmpty><div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{t('brand:brandInvoicesPage.noInvoicesFound')}</div><div style={{ fontSize: '14px' }}>{invoices.length === 0 ? 'Create your first invoice to get started' : 'Try adjusting your filters'}</div></DataTableEmpty></DataTableCell></DataTableRow>)}
            </tbody></DataTable></DataTableContainer>
            <Pagination page={issuedPg.page} totalPages={issuedPg.totalPages} total={issuedPg.total} pageSize={issuedPg.pageSize} onChange={issuedPg.setPage} label="invoices" />
          </>
        )}

        {/* To Pay Tab */}
        {activeTab === 'to_pay' && (
          <>
            <DatePeriodFilter activePeriod={toPayActivePeriod} dateRange={toPayDateRange} isCustomDateRange={toPayIsCustomDateRange} onPeriodChange={handleToPayPeriodChange} onCalendarRangeSelect={handleToPayCalendarRangeSelect}>
              <SearchInput placeholder="Search invoice, status, issuer..." value={toPaySearchTerm} onChange={(e) => setToPaySearchTerm(e.target.value)} />
            </DatePeriodFilter>
            <DataTableContainer><DataTable><DataTableHead><tr>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.invoice')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.issuer')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.period')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.issued')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.due')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.status')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('brand:brandInvoicesPage.amount')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('brand:brandInvoicesPage.total')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.actions')}</DataTableHeaderCell>
            </tr></DataTableHead><tbody>
              {filteredInvoicesToPay.length > 0 ? toPayPg.pageItems.map(invoice => (
                <DataTableRow key={invoice.id}>
                  <DataTableCell data-label="Invoice" align="left"><InvoiceInfo><InvoiceNumber>{invoice.invoiceNumber}{invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>{t('brand:brandInvoicesPage.auto')}</AutoBadge>}</InvoiceNumber><CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName></InvoiceInfo></DataTableCell>
                  <DataTableCell data-label="Issuer" align="left"><InvoiceInfo><InvoiceNumber>{invoice.issuerName || (invoice.issuerType === 'system_admin' ? 'System Admin' : invoice.issuerType === 'brand' ? 'Brand' : 'Foodcourt')}</InvoiceNumber><CompanyName>{invoice.restaurantName && invoice.restaurantName !== 'Unknown' ? `For: ${invoice.restaurantName}` : ''}</CompanyName></InvoiceInfo></DataTableCell>
                  <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>{invoice.billingPeriod || '-'}</DataTableCell>
                  <DataTableCell data-label="Issued" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.issueDate)}</DataTableCell>
                  <DataTableCell data-label="Due" align="center" style={{ fontSize: '13px' }}>{formatDate(invoice.dueDate)}</DataTableCell>
                  <DataTableCell data-label="Status" align="center"><StatusBadge status={getEffectiveStatus(invoice)}>{getStatusDisplay(getEffectiveStatus(invoice))}</StatusBadge>{invoice.isModified && (<button type="button" onClick={(e) => { e.stopPropagation(); setHistoryInvoice(invoice); }} title={t('invoiceHistory.viewTooltip', 'View modification history')} style={{ display: 'inline-block', marginLeft: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 600, color: '#B45309', background: '#FEF3C7', borderRadius: '4px', verticalAlign: 'middle', border: '1px solid #FDE68A', cursor: 'pointer' }}>{t('brand:brandInvoicesPage.modified')}</button>)}</DataTableCell>
                  <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('brand:brandInvoicesPage.free')}</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="" mobileFullWidth>{renderInvoiceActions(invoice, true)}</DataTableCell>
                </DataTableRow>
              )) : (<DataTableRow><DataTableCell colSpan={9}><DataTableEmpty>{t('brand:brandInvoicesPage.noInvoicesToPay')}</DataTableEmpty></DataTableCell></DataTableRow>)}
            </tbody></DataTable></DataTableContainer>
            <Pagination page={toPayPg.page} totalPages={toPayPg.totalPages} total={toPayPg.total} pageSize={toPayPg.pageSize} onChange={toPayPg.setPage} label="invoices" />
          </>
        )}

        {/* Paid Tab */}
        {activeTab === 'paid' && (
          <>
            <DatePeriodFilter activePeriod={paidActivePeriod} dateRange={paidDateRange} isCustomDateRange={paidIsCustomDateRange} onPeriodChange={handlePaidPeriodChange} onCalendarRangeSelect={handlePaidCalendarRangeSelect}>
              <SearchInput placeholder="Search invoice, issuer, restaurant..." value={paidSearchTerm} onChange={(e) => setPaidSearchTerm(e.target.value)} />
            </DatePeriodFilter>
            <DataTableContainer><DataTable><DataTableHead><tr>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.invoice')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.issuer')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.period')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.paidDate')}</DataTableHeaderCell>
              <DataTableHeaderCell align="center">{t('brand:brandInvoicesPage.status')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('brand:brandInvoicesPage.amount')}</DataTableHeaderCell>
              <DataTableHeaderCell align="right">{t('brand:brandInvoicesPage.total')}</DataTableHeaderCell>
              <DataTableHeaderCell align="left">{t('brand:brandInvoicesPage.actions')}</DataTableHeaderCell>
            </tr></DataTableHead><tbody>
              {filteredPaidInvoices.length > 0 ? paidPg.pageItems.map(invoice => (
                <DataTableRow key={invoice.id}>
                  <DataTableCell data-label="Invoice" align="left"><InvoiceInfo><InvoiceNumber>{invoice.invoiceNumber}{invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>{t('brand:brandInvoicesPage.auto')}</AutoBadge>}</InvoiceNumber><CompanyName>{invoice.categoryDisplayName || invoice.planType || 'Service'}</CompanyName></InvoiceInfo></DataTableCell>
                  <DataTableCell data-label="Issuer" align="left"><InvoiceInfo><InvoiceNumber>{invoice.issuerName || (invoice.issuerType === 'system_admin' ? 'System Admin' : invoice.issuerType === 'brand' ? 'Brand' : 'Foodcourt')}</InvoiceNumber><CompanyName>{invoice.restaurantName && invoice.restaurantName !== 'Unknown' ? `For: ${invoice.restaurantName}` : ''}</CompanyName></InvoiceInfo></DataTableCell>
                  <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>{invoice.billingPeriod || '-'}</DataTableCell>
                  <DataTableCell data-label="Paid" align="center" style={{ fontSize: '13px' }}>{invoice.paidDate ? formatDate(invoice.paidDate) : formatDate(invoice.issueDate)}</DataTableCell>
                  <DataTableCell data-label="Status" align="center"><StatusBadge status="paid">{t('brand:brandInvoicesPage.paid')}</StatusBadge></DataTableCell>
                  <DataTableCell data-label="Amount" align="right"><DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="Total" align="right"><DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('brand:brandInvoicesPage.free')}</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount></DataTableCell>
                  <DataTableCell data-label="" mobileFullWidth>
                    <ActionButtons>
                      <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>{t('brand:brandInvoicesPage.view')}</LocalActionButton>
                      <LocalActionButton onClick={() => generateInvoicePDF(invoice)} title="Download PDF"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg></LocalActionButton>
                      <LocalActionButton onClick={() => handlePrintInvoice(invoice)} title="Print Invoice"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,9 6,2 18,2 18,9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg></LocalActionButton>
                    </ActionButtons>
                  </DataTableCell>
                </DataTableRow>
              )) : (<DataTableRow><DataTableCell colSpan={8}><DataTableEmpty>{t('brand:brandInvoicesPage.noPaidInvoicesYet')}</DataTableEmpty></DataTableCell></DataTableRow>)}
            </tbody></DataTable></DataTableContainer>
            <Pagination page={paidPg.page} totalPages={paidPg.totalPages} total={paidPg.total} pageSize={paidPg.pageSize} onChange={paidPg.setPage} label="invoices" />
          </>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <BrandInvoiceCategoryManager
            invoiceCategories={invoiceCategories}
            showCategoryModal={showCategoryModal}
            setShowCategoryModal={setShowCategoryModal}
            editingCategory={editingCategory}
            setEditingCategory={setEditingCategory}
            categoryFormData={categoryFormData}
            setCategoryFormData={setCategoryFormData}
            savingCategory={savingCategory}
            deleteCategoryModalOpen={deleteCategoryModalOpen}
            setDeleteCategoryModalOpen={setDeleteCategoryModalOpen}
            categoryToDelete={categoryToDelete}
            setCategoryToDelete={setCategoryToDelete}
            handleCloseCategoryModal={handleCloseCategoryModal}
            handleDeleteCategoryConfirm={handleDeleteCategoryConfirm}
            handleSaveCategory={handleSaveCategory}
          />
        )}

        {/* Payment Submit Modal */}
        {showPaymentSubmitModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowPaymentSubmitModal(false)} title="Submit Payment" footer={<><div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}><Button variant="secondary" onClick={() => { setShowPaymentSubmitModal(false); setPaymentSubmitError(null); }}>{t('brand:brandInvoicesPage.cancel')}</Button> {paymentData.paymentMethod !== 'stripe' && paymentData.paymentMethod !== 'paypal' && ( <Button variant="success" onClick={handleSubmitPayment} disabled={!paymentData.paymentMethod || loadingPaymentMethods || isSubmittingPayment || (!paymentData.transactionId && !paymentData.receiptImage)} > {isSubmittingPayment ? 'Submitting...' : 'Submit Payment'} </Button> )} </div> {paymentSubmitError && ( <StatusMessage type="error" style={{ marginTop: '12px', wordBreak: 'break-word' }}> {paymentSubmitError} </StatusMessage> )}</>}>
            <div style={{ marginBottom: '20px', padding: '16px', background: '#F1F4F8', borderRadius: '8px' }}>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4B5563' }}>Invoice: <strong>{selectedInvoice.invoiceNumber}</strong></p>
              <p style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#0A2540' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency)}</p>
            </div>
            {loadingPaymentMethods ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#4B5563' }}>{t('brand:brandInvoicesPage.loadingPaymentMethods')}</div>
            ) : availablePaymentMethods.length === 0 ? (
              <div style={{ padding: '20px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '16px' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#92400E', fontSize: '15px' }}>Payment Not Available</p>
                {selectedInvoice.issuerType === 'system_admin' ? (
                  <p style={{ margin: 0, color: '#92400E', fontSize: '14px', lineHeight: '1.5' }}><strong>{t('brand:brandInvoicesPage.systemAdmin')}</strong> has not configured payment methods for <strong>{selectedInvoice.currency || 'MYR'}</strong> yet. Please contact the system administrator.</p>
                ) : (<><p style={{ margin: '0 0 12px 0', color: '#92400E', fontSize: '14px', lineHeight: '1.5' }}>No payment methods configured for <strong>{getCurrencySymbol(selectedInvoice.currency || 'MYR')}</strong>. Please set up your payment settings first.</p><button onClick={() => { setShowPaymentSubmitModal(false); window.location.href = '/pos/brand/payment-settings'; }} style={{ padding: '8px 16px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Go to Payment Settings</button></>)}
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <FormLabel>Payment Method *</FormLabel>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(availablePaymentMethods.length, 3)}, 1fr)`, gap: '10px', marginTop: '8px' }}>
                    {availablePaymentMethods.map(method => (
                      <button key={method.id} onClick={() => { setPaymentData(prev => ({ ...prev, paymentMethod: method.id })); setPaymentSubmitError(null); }}
                        style={{ padding: '12px 16px', minHeight: '44px', borderRadius: '8px', border: `1px solid ${paymentData.paymentMethod === method.id ? '#635BFF' : '#C7CED6'}`, background: paymentData.paymentMethod === method.id ? 'rgba(99, 91, 255, 0.1)' : 'white', color: paymentData.paymentMethod === method.id ? '#635BFF' : '#1F2937', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}>{method.name}</button>
                    ))}
                  </div>
                </div>
                {paymentData.paymentMethod === 'stripe' && selectedInvoice && (
                  <StripePaymentForm invoiceId={selectedInvoice.id} onSuccess={() => { setShowPaymentSubmitModal(false); setSelectedInvoice(null); setPaymentData({ paymentMethod: 'bank_transfer', transactionId: '', notes: '', receiptImage: '' }); setSuccessMessage('Payment submitted successfully! The issuer will review and confirm your payment.'); setShowSuccessModal(true); fetchInvoicesToPay(); fetchPaidInvoices(); window.dispatchEvent(new Event('refreshBadgeCounts')); }} onError={() => {}} />
                )}
                {/* 2026-07-07: PayPal render block was missing — selecting PayPal showed a blank area.
                    Mirrors the Stripe block so PayPal actually renders its checkout on this page. */}
                {paymentData.paymentMethod === 'paypal' && selectedInvoice && (
                  <PayPalPaymentForm invoiceId={selectedInvoice.id} onSuccess={() => { setShowPaymentSubmitModal(false); setSelectedInvoice(null); setPaymentData({ paymentMethod: 'bank_transfer', transactionId: '', notes: '', receiptImage: '' }); setSuccessMessage('Payment submitted successfully! The issuer will review and confirm your payment.'); setShowSuccessModal(true); fetchInvoicesToPay(); fetchPaidInvoices(); window.dispatchEvent(new Event('refreshBadgeCounts')); }} onError={() => {}} />
                )}
                {paymentData.paymentMethod === 'bank_transfer' && (() => { const m = availablePaymentMethods.find(m => m.id === 'bank_transfer'); return m ? (<div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', lineHeight: '1.8' }}><h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>{t('brand:brandInvoicesPage.bankTransferDetails')}</h4><p style={{ margin: '0' }}><strong>Bank:</strong> {m.bankName}</p><p style={{ margin: '0' }}><strong>Account Number:</strong> {m.accountNumber}</p><p style={{ margin: '0' }}><strong>Account Name:</strong> {m.accountName}</p></div>) : null; })()}
                {paymentData.paymentMethod === 'qr_payment' && (() => { const m = availablePaymentMethods.find(m => m.id === 'qr_payment'); return m ? (<div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}><h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>{t('brand:brandInvoicesPage.qrPayment')}</h4>{m.qrImage && <img src={m.qrImage} alt="Payment QR Code" style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #C7CED6', borderRadius: '8px' }} />}{m.qrDescription && <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#4B5563' }}>{m.qrDescription}</p>}</div>) : null; })()}
                {paymentData.paymentMethod && paymentData.paymentMethod !== 'stripe' && paymentData.paymentMethod !== 'paypal' && (
                  <>
                    <div style={{ padding: '12px 16px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: '#92400E', display: 'flex', alignItems: 'flex-start', gap: '8px' }}><span style={{ fontWeight: '600', flexShrink: 0 }}>*</span><span>{t('brand:brandInvoicesPage.pleaseProvideEitherA')}<strong>{t('brand:brandInvoicesPage.transactionIdReferenceNumber')}</strong> or upload a <strong>{t('brand:brandInvoicesPage.paymentReceiptImage')}</strong> to submit your payment.</span></div>
                    <FormGroup><FormLabel>{t('brand:brandInvoicesPage.transactionIdReferenceNumber')}</FormLabel><FormInput type="text" placeholder="Enter transaction ID or reference number" value={paymentData.transactionId} onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))} /></FormGroup>
                    <FormGroup><FormLabel>{t('brand:brandInvoicesPage.paymentReceiptImage')}</FormLabel><div style={{ border: '2px dashed #C7CED6', borderRadius: '8px', padding: '20px', textAlign: 'center', background: paymentData.receiptImage ? '#F0FDF4' : '#F9FAFB', cursor: 'pointer', position: 'relative' }}>{paymentData.receiptImage ? (<div><img src={paymentData.receiptImage} alt="Payment Receipt" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '12px' }} /><div><button type="button" onClick={() => setPaymentData(prev => ({ ...prev, receiptImage: '' }))} style={{ background: '#EF4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>{t('brand:brandInvoicesPage.removeImage')}</button></div></div>) : (<label style={{ cursor: 'pointer', display: 'block' }}><input type="file" accept="image/*" onChange={handleReceiptImageUpload} style={{ display: 'none' }} /><div style={{ color: '#4B5563', fontSize: '14px' }}><div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div><div>{t('brand:brandInvoicesPage.clickToUploadPaymentReceipt')}</div><div style={{ fontSize: '12px', marginTop: '4px' }}>{t('brand:brandInvoicesPage.supportsJpgPngMax5mb')}</div></div></label>)}</div></FormGroup>
                    <FormGroup><FormLabel>{t('brand:brandInvoicesPage.notesOptional')}</FormLabel><FormTextarea placeholder="Any additional information about the payment..." value={paymentData.notes} onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))} /></FormGroup>
                  </>
                )}
              </>
            )}
          </CommonModal>
        )}

        {/* Create Invoice Modal */}
        <InvoiceHistoryModal
          isOpen={!!historyInvoice}
          onClose={() => setHistoryInvoice(null)}
          invoiceNumber={historyInvoice?.invoiceNumber}
          history={historyInvoice?.modificationHistory || []}
        />

        {showCreateInvoiceModal && (
          <BrandInvoiceCreateModal
            newInvoice={newInvoice} setNewInvoice={setNewInvoice}
            payerMode={payerMode} setPayerMode={setPayerMode}
            externalPayer={externalPayer} setExternalPayer={setExternalPayer}
            selectedTarget={selectedTarget} setSelectedTarget={setSelectedTarget}
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            searchResults={searchResults} showSearchDropdown={showSearchDropdown} setShowSearchDropdown={setShowSearchDropdown}
            handleSearch={handleSearch} selectTarget={selectTarget} managers={managers}
            invoiceCategories={invoiceCategories} additionalCharges={additionalCharges}
            operationSettings={operationSettings} paymentMethodWarning={paymentMethodWarning}
            onClose={() => setShowCreateInvoiceModal(false)} onSubmit={handleSubmitInvoice} resetInvoiceForm={resetInvoiceForm}
          />
        )}

        {/* View Invoice Modal */}
        {showViewModal && selectedInvoice && (
          <BrandInvoiceViewModal
            invoice={selectedInvoice} companySettings={companySettings} operationSettings={operationSettings}
            formatDate={formatDate} getStatusDisplay={getStatusDisplay} onClose={() => setShowViewModal(false)}
            showLinkAccountModal={showLinkAccountModal} setShowLinkAccountModal={setShowLinkAccountModal}
            linkSearchQuery={linkSearchQuery} setLinkSearchQuery={setLinkSearchQuery}
            linkSearchResults={linkSearchResults} setLinkSearchResults={setLinkSearchResults}
            showLinkSearchDropdown={showLinkSearchDropdown} setShowLinkSearchDropdown={setShowLinkSearchDropdown}
            handleLinkSearch={handleLinkSearch} handleLinkAccount={handleLinkAccount}
          />
        )}

        {/* Edit Invoice Modal */}
        {showEditModal && selectedInvoice && editInvoice && (
          <BrandInvoiceEditModal
            selectedInvoice={selectedInvoice} editInvoice={editInvoice} setEditInvoice={setEditInvoice}
            editModificationReason={editModificationReason} setEditModificationReason={setEditModificationReason}
            editSearchQuery={editSearchQuery} editSearchResults={editSearchResults}
            showEditSearchDropdown={showEditSearchDropdown} setShowEditSearchDropdown={setShowEditSearchDropdown}
            editSelectedTarget={editSelectedTarget} setEditSelectedTarget={setEditSelectedTarget}
            setEditSearchQuery={setEditSearchQuery} handleEditSearch={handleEditSearch}
            handleEditTargetSelect={handleEditTargetSelect} managers={managers}
            invoiceCategories={invoiceCategories} getChargesForCurrency={getChargesForCurrency}
            operationSettings={operationSettings} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit}
          />
        )}

        {/* Send Invoice Confirmation Modal */}
        {showSendConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowSendConfirmModal(false)} title="Send Invoice" footer={<><Button variant="secondary" onClick={() => setShowSendConfirmModal(false)}> Cancel </Button><Button variant="success" onClick={confirmSendInvoice}> Confirm </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('brand:brandInvoicesPage.sendInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '20px', lineHeight: '1.6' }}>Are you sure you want to send invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.restaurantName || selectedInvoice.customerName}</strong>?</p>
              <div style={{ background: '#F1F4F8', padding: '16px', borderRadius: '8px', border: '1px solid #C7CED6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#4B5563' }}>Invoice:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#4B5563' }}>Recipient:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.managerName || selectedInvoice.restaurantName || selectedInvoice.customerName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#4B5563' }}>Company:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.customerName || selectedInvoice.restaurantName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#4B5563' }}>Amount:</span><span style={{ fontWeight: '600', color: '#059669' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span></div>
              </div>
            </div>
          </CommonModal>
        )}

        {/* Resend Invoice Confirmation Modal */}
        {showResendConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowResendConfirmModal(false)} title="Resend Invoice" footer={<><Button variant="secondary" onClick={() => setShowResendConfirmModal(false)}> Cancel </Button><Button variant="primary" onClick={confirmResendInvoice}> Resend Invoice </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('brand:brandInvoicesPage.resendInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '20px', lineHeight: '1.6' }}>Resend invoice <strong>{selectedInvoice.invoiceNumber}</strong> to <strong>{selectedInvoice.restaurantName || selectedInvoice.customerName}</strong>?</p>
              <div style={{ background: '#FEF3C7', padding: '12px', borderRadius: '6px', border: '1px solid #F59E0B', fontSize: '13px', color: '#92400E' }}>This will send another copy of the invoice to the restaurant's email.</div>
            </div>
          </CommonModal>
        )}

        {/* Cancel Invoice Confirmation Modal */}
        {showCancelConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowCancelConfirmModal(false)} title="Cancel Invoice" footer={<><Button variant="secondary" onClick={() => setShowCancelConfirmModal(false)}> Keep Invoice </Button><Button variant="primary" onClick={confirmCancelInvoice} style={{ background: '#EF4444', borderColor: '#EF4444' }} > Cancel Invoice </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('brand:brandInvoicesPage.cancelInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '20px', lineHeight: '1.6' }}>Are you sure you want to cancel invoice <strong>{selectedInvoice.invoiceNumber}</strong>?</p>
              <div style={{ background: '#FEE2E2', padding: '16px', borderRadius: '8px', border: '1px solid #FCA5A5', marginBottom: '16px' }}><p style={{ margin: 0, color: '#991B1B', fontSize: '14px', fontWeight: '500' }}><strong>This action cannot be undone</strong></p><p style={{ margin: '8px 0 0 0', color: '#7F1D1D', fontSize: '13px' }}>The invoice will be marked as cancelled and cannot be sent or processed for payment.</p></div>
              <div style={{ background: '#F1F4F8', padding: '16px', borderRadius: '8px', border: '1px solid #C7CED6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#4B5563' }}>Invoice:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.invoiceNumber}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ color: '#4B5563' }}>Manager:</span><span style={{ fontWeight: '500' }}>{selectedInvoice.managerName}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#4B5563' }}>Amount:</span><span style={{ fontWeight: '600', color: '#DC2626' }}>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span></div>
              </div>
            </div>
          </CommonModal>
        )}

        {/* Delete Invoice Confirmation Modal */}
        {showDeleteConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowDeleteConfirmModal(false)} title="Delete Invoice" footer={<><Button variant="secondary" onClick={() => setShowDeleteConfirmModal(false)}> Keep Invoice </Button><Button variant="primary" onClick={confirmDeleteInvoice} style={{ background: '#EF4444', borderColor: '#EF4444' }} > Delete Invoice </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '12px' }}>{t('brand:brandInvoicesPage.deleteInvoice')}</h3>
              <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.5' }}>Are you sure you want to permanently delete invoice <strong>#{selectedInvoice.invoiceNumber}</strong>?<br />This action cannot be undone.</p>
            </div>
          </CommonModal>
        )}

        {/* Payment Confirmation Modal */}
        {showPaymentConfirmModal && selectedInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowPaymentConfirmModal(false)} title={`Confirm Payment - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={() => setShowPaymentConfirmModal(false)}> Cancel </Button><Button variant="primary" onClick={handleMarkAsPaid}> Confirm Payment Received </Button></>}>
            <FormGroup>
              <FormLabel>{t('brand:brandInvoicesPage.paymentConfirmation')}</FormLabel>
              <InvoiceSummary>
                <SummaryRow><span>Manager:</span><span>{selectedInvoice.managerName}</span></SummaryRow>
                <SummaryRow><span>Company:</span><span>{selectedInvoice.companyName}</span></SummaryRow>
                <SummaryRow><span>Invoice Number:</span><span>{selectedInvoice.invoiceNumber}</span></SummaryRow>
                <SummaryRow><span>Due Date:</span><span>{formatDate(selectedInvoice.dueDate)}</span></SummaryRow>
                <SummaryRow highlight><span><strong>Payment Amount:</strong></span><span><strong>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</strong></span></SummaryRow>
              </InvoiceSummary>
            </FormGroup>
            {(selectedInvoice.paymentMethod || selectedInvoice.receiptUrl || selectedInvoice.transactionId) && (
              <FormGroup>
                <FormLabel>{t('brand:brandInvoicesPage.customersPaymentInformation')}</FormLabel>
                <div style={{ background: '#EFF6FF', border: '1px solid #3B82F6', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
                    {selectedInvoice.paymentMethod && (<p style={{ margin: '0 0 8px 0' }}><strong>Payment Method:</strong> {selectedInvoice.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : selectedInvoice.paymentMethod === 'qr_payment' ? 'QR Payment' : selectedInvoice.paymentMethod === 'stripe' ? 'Stripe' : selectedInvoice.paymentMethod === 'paypal' ? 'PayPal' : selectedInvoice.paymentMethod}</p>)}
                    {selectedInvoice.transactionId && (<p style={{ margin: '0 0 8px 0' }}><strong>Transaction ID:</strong> {selectedInvoice.transactionId}</p>)}
                  </div>
                  {selectedInvoice.receiptUrl && (<div style={{ marginTop: '12px' }}><p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>Payment Receipt:</p><div style={{ textAlign: 'center', background: 'white', padding: '12px', borderRadius: '8px' }}><img src={selectedInvoice.receiptUrl} alt="Payment Receipt" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => window.open(selectedInvoice.receiptUrl, '_blank')} /><p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4B5563' }}>{t('brand:brandInvoicesPage.clickImageToViewFullSize')}</p></div></div>)}
                </div>
              </FormGroup>
            )}
            <div style={{ background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', padding: '16px', margin: '16px 0' }}><p style={{ margin: 0, color: '#92400E', fontSize: '14px' }}><strong>{t('brand:brandInvoicesPage.confirmPaymentReceipt')}</strong><br />Only mark this invoice as paid if you have received and verified the payment. This action will update the invoice status to "Paid".</p></div>
            <FormGroup>
              <FormLabel>{t('brand:brandInvoicesPage.statusChange')}</FormLabel>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#1F2937', background: '#F1F4F8', padding: '12px', borderRadius: '6px' }}>Payment Submitted → Paid<br />Paid Date: {formatDateTime(new Date(), operationSettings, { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
            </FormGroup>
          </CommonModal>
        )}

        {/* Email Invoice Modal */}
        {showEmailModal && emailInvoice && (
          <CommonModal isOpen={true} onClose={() => setShowEmailModal(false)} title="Send Invoice via Email" footer={<><Button variant="secondary" onClick={() => { setShowEmailModal(false); setEmailInvoice(null); setEmailRecipient(''); }}> Cancel </Button><Button variant="primary" onClick={handleSendInvoiceEmail} disabled={!emailRecipient || !emailRecipient.includes('@')} > Send Email </Button></>}>
            <FormGroup>
              <FormLabel>{t('brand:brandInvoicesPage.invoice')}</FormLabel>
              <div style={{ padding: '12px', background: '#F1F4F8', borderRadius: '6px', marginBottom: '16px' }}><div style={{ fontWeight: '600', color: '#0A2540', marginBottom: '4px' }}>{emailInvoice.invoiceNumber}</div><div style={{ fontSize: '13px', color: '#4B5563' }}>{emailInvoice.customerName}</div><div style={{ fontSize: '14px', fontWeight: '600', color: '#635BFF', marginTop: '8px' }}>{formatCurrency(emailInvoice.total, emailInvoice.currency || 'MYR')}</div></div>
            </FormGroup>
            <FormGroup>
              <FormLabel>Recipient Email *</FormLabel>
              <FormInput type="email" value={emailRecipient} onChange={(e) => setEmailRecipient(e.target.value)} placeholder="Enter recipient email address" required style={{ maxWidth: '100%' }} />
              <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '4px' }}>{emailRecipient ? (<>Default email for {emailInvoice.payerType === 'restaurant' ? 'Restaurant' : emailInvoice.payerType === 'foodcourt_manager' ? 'Foodcourt Manager' : emailInvoice.payerType === 'brand_manager' ? 'Brand Manager' : 'Customer'}</>) : (<>Enter the {emailInvoice.payerType === 'restaurant' ? 'restaurant' : emailInvoice.payerType === 'foodcourt_manager' ? 'foodcourt manager' : emailInvoice.payerType === 'brand_manager' ? 'brand manager' : 'customer'} email address</>)}</div>
            </FormGroup>
            <div style={{ background: '#F0F9FF', border: '1px solid #0EA5E9', borderRadius: '8px', padding: '12px', marginTop: '16px' }}><p style={{ margin: 0, fontSize: '13px', color: '#0369A1' }}>The invoice will be sent to the recipient email address using the system email settings.</p></div>
          </CommonModal>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <CommonModal isOpen={true} onClose={() => setShowSuccessModal(false)} title="Success" footer={<><Button variant="primary" onClick={() => setShowSuccessModal(false)}> OK </Button></>}>
            <div style={{ textAlign: 'center', padding: '20px 0' }}><p style={{ fontSize: '16px', color: '#0A2540', marginBottom: '8px', fontWeight: '500' }}>{successMessage}</p></div>
          </CommonModal>
        )}

        </Content>
      </Container>
    </>
  );
};

export default BrandInvoicesPage;
