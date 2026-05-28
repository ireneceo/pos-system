import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { printHTMLContent } from '../../utils/billPrint';
import { useSearchParams, useParams } from 'react-router-dom';
import { formatCurrency, getCurrencySymbol } from '../../utils/currency';
import { formatAddressHtml, formatAddressLines, AppLocale } from '../../utils/formatAddress';
import SuspendedBanner from '../../components/Common/SuspendedBanner';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { BaseButton, StatusBadge as CommonStatusBadge } from '../../components/UI/CommonStyles';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import {
  Container,
  Header,
  Title,
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
  Modal as CommonModal
} from '../../components/UI';
import { SearchInput } from '../../components/Common/FilterComponents';
import { Tabs, Tab as CommonTab, Badge as TabBadge } from '../../components/Common/TabComponents';
import HostedCheckoutLauncher from '../../components/Payment/HostedCheckoutLauncher';
import SubscriptionPanel from '../../components/Payment/SubscriptionPanel';
import ApplyCreditModal from '../../components/Referral/ApplyCreditModal';
import { renderIframeToPdf, INVOICE_PRINT_CSS } from '../../utils/invoicePdf';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import AlertDialog from '../../components/Common/AlertDialog';
// ConfirmDialog removed (only used by old SoaBundleRow Pay All)
interface AdditionalCharge {
  name: string;
  rate: number;
  amount: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'draft' | 'sent' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled' | '';
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
  invoiceCategory?: 'subscription' | 'service' | 'consulting' | 'trade' | 'soa' | 'others';
  parentSoaInvoiceId?: number | null;
  customDescription?: string;
  serviceDescription?: string;
  categoryDisplayName?: string;
  issuerType?: 'system_admin' | 'brand' | 'foodcourt';
  issuerId?: number | string;
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
  additionalCharges?: AdditionalCharge[];
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
  discountReason?: string;
  subtotalBeforeDiscount?: number;
}

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
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
  companyLogo?: string;
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  swiftCode?: string;
}

// Styled Components

const Button = styled(BaseButton)``;

const InvoiceInfo = styled.div``;

const InvoiceNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const CompanyName = styled.div`
  font-size: 13px;
  color: #4B5563;
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

const StatusBadge = styled(CommonStatusBadge)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
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

    &:hover {
      background: #4B45C6;
    }
  ` : props.variant === 'success' ? `
    background: #10B981;
    color: white;
    border-color: #10B981;
    padding: 6px 12px;

    &:hover {
      background: #059669;
    }
  ` : props.variant === 'danger' ? `
    background: #FEF2F2;
    color: #EF4444;
    border-color: #EF4444;
    padding: 6px 12px;

    &:hover {
      background: #FEE2E2;
    }
  ` : props.variant === 'email' ? `
    background: white;
    color: #3B82F6;
    border-color: #3B82F6;

    &:hover {
      background: #EFF6FF;
    }
  ` : `
    background: white;
    color: #1F2937;
    border-color: #6B7280;

    &:hover {
      background: #F9FAFB;
      border-color: #6B7280;
    }
  `}
`;

// Form components
const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

type TabType = 'all' | 'to_pay';

// SoaGroup interface + SoaBundleRow component removed in B1 재설계 (2026-04-30) —
// SOA is now a real Invoice record (invoice_category='soa') rendered inline in the main DataTable
// with a purple SOA badge. See docs/INVOICE_SYSTEM.md "11. SOA 재설계".

const RestaurantInvoicesPage: React.FC = () => {
  const { t, i18n } = useTranslation('settings');
  const { operationSettings } = useStore();
  const { user, refreshUser } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get restaurantId from URL or user's restaurant_id
  const restaurantId = urlRestaurantId ? parseInt(urlRestaurantId) : user?.restaurant_id;

  // States
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('month'));

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showApplyCreditModal, setShowApplyCreditModal] = useState(false);
  const [showPaymentSubmitModal, setShowPaymentSubmitModal] = useState(false);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [confirmingInvoiceId, setConfirmingInvoiceId] = useState<string | null>(null);
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    transactionId: '',
    receiptImage: '',
    notes: ''
  });
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentSubmitError, setPaymentSubmitError] = useState('');
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [, setCurrencyConfig] = useState<CurrencyConfig>({});

  // URL-based tab management
  const activeTab = (searchParams.get('tab') as TabType) || 'all';
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

  // SOA derived view (/soa/current) removed in B1 재설계 — SOA is now a real Invoice record
  // and appears in the regular invoices list. Pay button visibility is driven by `parentSoaInvoiceId`.

  // Fetch all invoices for this restaurant
  const fetchAllInvoices = async () => {
    try {
      const token = getAuthToken();
      // Use restaurantId from StoreContext, or fall back to user's restaurant_id for Restaurant Admin
      const targetRestaurantId = restaurantId || user?.restaurant_id;
      if (!token || !targetRestaurantId) return;

      const response = await fetch(`/api/invoices/restaurant/${targetRestaurantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Transform data to match Invoice interface
        const invoices: Invoice[] = (Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []).map((inv: any) => ({
          id: inv.id?.toString() || '',
          invoiceNumber: inv.invoice_number || '',
          issueDate: inv.issued_at || inv.issue_date || '',
          dueDate: inv.due_date || '',
          paidDate: inv.paid_at || inv.paid_date || '',
          status: inv.status || '',
          currency: inv.currency || 'MYR',
          amount: parseFloat(inv.subtotal || inv.amount || 0),
          // Tax now lives in additional_charges (Path B canonical). Sum charge amounts;
          // legacy `tax_amount` column was retired so we keep it as a final fallback only.
          tax: parseFloat(
            (Array.isArray(inv.additional_charges)
              ? inv.additional_charges.reduce((s: number, c: any) => s + (parseFloat(c?.amount) || 0), 0)
              : 0) || inv.tax_amount || inv.tax || 0
          ),
          total: parseFloat(inv.total_amount || inv.total || 0),
          items: inv.items || [],
          billingPeriod: inv.billing_period_start && inv.billing_period_end
            ? `${formatDate(inv.billing_period_start)} - ${formatDate(inv.billing_period_end)}`
            : '',
          planType: inv.category_display_name || inv.plan_type || 'Service',
          paymentMethod: inv.payment_method || '',
          transactionId: inv.transaction_id || '',
          receiptUrl: inv.receipt_url || '',
          hasPaymentInfo: !!inv.transaction_id || !!inv.receipt_url,
          type: inv.type || 'manual',
          payerType: inv.payer_type || 'restaurant',
          payerId: inv.payer_id?.toString() || '',
          invoiceCategory: inv.invoice_category || '',
          parentSoaInvoiceId: inv.parent_soa_invoice_id || null,
          categoryDisplayName: inv.category_display_name || '',
          issuerType: inv.issuer_type || inv.issuerType || 'system_admin',
          issuerId: inv.issuer_id || inv.issuerId || null,
          issuerName: inv.issuer_name || inv.issuerName || '',
          issuerInfo: inv.issuerInfo || inv.issuer_info || null,
          payerInfo: inv.payerInfo || inv.payer_info || null,
          discountType: inv.discount_type || inv.discountType || 'none',
          discountValue: parseFloat(inv.discount_value || inv.discountValue || 0),
          discountAmount: parseFloat(inv.discount_amount || inv.discountAmount || 0),
          discountReason: inv.discount_reason || inv.discountReason || null,
          subtotalBeforeDiscount: parseFloat(inv.subtotal || inv.subtotalBeforeDiscount || 0) || undefined,
          additionalCharges: inv.additional_charges || inv.additionalCharges || []
        }));
        setAllInvoices(invoices);
      }
    } catch (error) {
      console.error('Error fetching all invoices:', error);
    }
  };

  // Fetch invoices to pay
  const fetchInvoicesToPay = async () => {
    try {
      const token = getAuthToken();
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
        // Pull fresh user state so SuspendedBanner / ProtectedRoute react
        // immediately after an overdue invoice is paid (restoreSubscription
        // flips restaurant.status server-side).
        refreshUser();
      } else {
        setInvoicesToPay([]);
      }
    } catch (error) {
      console.error('Error fetching invoices to pay:', error);
      setInvoicesToPay([]);
    }
  };

  // Fetch company settings
  const fetchCompanySettings = async () => {
    if (!restaurantId) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/restaurants/${restaurantId}/company-info`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setCompanySettings({
            companyName: data.data.company_name || '',
            address: data.data.address || '',
            city: data.data.city || '',
            state: data.data.state || '',
            postalCode: data.data.postal_code || '',
            country: data.data.country || '',
            phone: data.data.phone || '',
            email: data.data.email || '',
            website: data.data.website || '',
            taxNumber: data.data.tax_number || '',
            registrationNumber: data.data.registration_number || '',
            companyLogo: data.data.logo_url || '',
            bankName: data.data.bank_name || '',
            bankAccount: data.data.bank_account || '',
            bankAccountName: data.data.bank_account_name || '',
            swiftCode: data.data.swift_code || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching company settings:', error);
    }
  };

  // Fetch currency config
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

  // Fetch payment methods based on invoice issuer
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
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    } finally {
      setLoadingPaymentMethods(false);
    }
  };

  // Submit payment
  const handleSubmitPayment = async () => {
    if (!selectedInvoice) return;

    // Validation
    if (!paymentData.transactionId && !paymentData.receiptImage) {
      setPaymentSubmitError('Please provide either a Transaction ID or upload a Receipt Image');
      return;
    }

    setIsSubmittingPayment(true);
    setPaymentSubmitError('');

    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/submit-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          payment_method: paymentData.paymentMethod,
          transaction_id: paymentData.transactionId,
          notes: paymentData.notes || null,
          receipt_url: paymentData.receiptImage || null
        })
      });

      if (response.ok) {
        setShowPaymentSubmitModal(false);
        setPaymentData({ paymentMethod: '', transactionId: '', receiptImage: '', notes: '' });
        await fetchAllInvoices();
        await fetchInvoicesToPay();
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

  // Initial data fetch
  useEffect(() => {
    fetchAllInvoices();
    fetchInvoicesToPay();
    fetchCompanySettings();
    fetchCurrencyConfig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId, user?.restaurant_id]);

  // Helper functions
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    const tz = operationSettings?.timeZone || 'Asia/Kuala_Lumpur';
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: tz });
  };

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
    const statusMap: { [key: string]: string } = {
      'draft': 'Draft',
      'pending_payment': 'Pending',
      'payment_submitted': 'Confirming',
      'paid': 'Paid',
      'overdue': 'Overdue',
      'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
  };

  // Filter invoices based on search and date
  const filterInvoices = (invoices: Invoice[]) => {
    return invoices.filter(invoice => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        invoice.invoiceNumber?.toLowerCase().includes(searchLower) ||
        invoice.issuerName?.toLowerCase().includes(searchLower) ||
        invoice.status?.toLowerCase().includes(searchLower) ||
        invoice.categoryDisplayName?.toLowerCase().includes(searchLower);

      // Date filter
      const invoiceDate = new Date(invoice.issueDate);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      endDate.setHours(23, 59, 59, 999);
      const matchesDate = invoiceDate >= startDate && invoiceDate <= endDate;

      return matchesSearch && matchesDate;
    });
  };

  const filteredAllInvoices = filterInvoices(allInvoices);
  const filteredInvoicesToPay = filterInvoices(invoicesToPay);

  // Calculate stats
  const stats = {
    total: allInvoices.length,
    pending: allInvoices.filter(i => i.status === 'pending_payment' || i.status === 'overdue').length,
    confirming: allInvoices.filter(i => i.status === 'payment_submitted').length,
    paid: allInvoices.filter(i => i.status === 'paid').length,
    totalAmount: allInvoices.reduce((sum, i) => sum + (i.total || 0), 0),
    pendingAmount: allInvoices.filter(i => i.status === 'pending_payment' || i.status === 'overdue').reduce((sum, i) => sum + (i.total || 0), 0)
  };

  // Handlers
  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleConfirmFreeInvoice = async (invoice: Invoice) => {
    if (confirmingInvoiceId) return;
    setConfirmingInvoiceId(invoice.id);
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${invoice.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          status: 'paid',
          paid_amount: 0,
          payment_notes: 'Free invoice - confirmed by recipient'
        })
      });
      if (response.ok) {
        await fetchAllInvoices();
        setShowViewModal(false);
      }
    } catch (error) {
      console.error('Failed to confirm free invoice:', error);
    } finally {
      setConfirmingInvoiceId(null);
    }
  };

  const handlePayInvoice = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentSubmitError('');
    setPaymentData({ paymentMethod: '', transactionId: '', receiptImage: '', notes: '' });
    await fetchPaymentMethods(invoice.currency || 'MYR', invoice.issuerType, invoice.issuerId);
    setShowPaymentSubmitModal(true);
  };

  // Handle receipt image upload
  const handleReceiptImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPaymentSubmitError('Image size must be less than 5MB');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      setPaymentData(prev => ({ ...prev, receiptImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // Generate Invoice HTML for PDF/Print (Restaurant Admin is always the receiver)
  const generateInvoiceHTML = (invoice: Invoice) => {
    // Restaurant Admin receives invoices, so:
    // - issuerInfo = who sent the invoice (From)
    // - payerInfo/companySettings = Restaurant (Bill To)
    const issuerInfo = invoice.issuerInfo;
    const payerCompany = invoice.payerInfo || (companySettings ? {
      name: companySettings.companyName,
      address: companySettings.address,
      city: companySettings.city,
      state: companySettings.state,
      postalCode: companySettings.postalCode,
      country: companySettings.country,
      phone: companySettings.phone,
      email: companySettings.email,
      taxId: companySettings.taxNumber,
      businessRegistration: companySettings.registrationNumber
    } : null);

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
                ${issuerInfo?.logoUrl ? `<img src="${issuerInfo.logoUrl}" alt="Company Logo" class="company-logo">` : ''}
                <div class="company-name" style="${issuerInfo?.logoUrl ? 'font-size: 14px;' : ''}">${issuerInfo?.name || invoice.issuerName || 'Issuer'}</div>
                <div class="company-details">
                    ${formatAddressHtml({
                      address: issuerInfo?.address,
                      city: issuerInfo?.city,
                      state: issuerInfo?.state,
                      postal_code: issuerInfo?.postalCode,
                      country: issuerInfo?.country
                    }, (i18n.language as AppLocale) || 'en')}
                    ${issuerInfo?.phone ? `Tel: ${issuerInfo.phone}<br>` : ''}
                    ${issuerInfo?.email ? `Email: ${issuerInfo.email}` : ''}
                </div>
            </div>
            <div class="invoice-title">
                <div class="invoice-label">${t('settings:invoicesPage.invoice')}</div>
                <div class="invoice-number">${invoice.invoiceNumber}</div>
                <span class="invoice-status ${getStatusClass(invoice.status)}">${getStatusText(invoice.status)}</span>
            </div>
        </div>

        <div class="billing-info">
            <div class="bill-to-section">
                <div class="section-label">${t('settings:invoicesPage.billTo')}</div>
                <div class="customer-name">${payerCompany?.name || companySettings?.companyName || 'Your Company'}</div>
                ${(() => {
                  const html = formatAddressHtml({
                    address: payerCompany?.address || companySettings?.address,
                    city: payerCompany?.city || companySettings?.city,
                    state: payerCompany?.state || companySettings?.state,
                    postal_code: payerCompany?.postalCode || companySettings?.postalCode,
                    country: payerCompany?.country || companySettings?.country
                  }, (i18n.language as AppLocale) || 'en');
                  return html ? `<div class="customer-details">${html.replace(/<br>$/, '')}</div>` : '';
                })()}
                ${payerCompany?.email || companySettings?.email ? `<div class="customer-details">${payerCompany?.email || companySettings?.email}</div>` : ''}
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
            <div class="section-label">${t('settings:invoicesPage.items')}</div>
            <table class="items-table">
                <thead>
                    <tr>
                        <th>${t('settings:invoicesPage.description')}</th>
                        <th class="text-center">${t('settings:invoicesPage.qty')}</th>
                        <th class="text-right">${t('settings:invoicesPage.unitPrice')}</th>
                        <th class="text-right">${t('settings:invoicesPage.amount')}</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoice.items && invoice.items.length > 0 ? invoice.items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td class="text-center">${item.quantity}</td>
                        <td class="text-right">${formatCurrency(item.unitPrice, invoice.currency || 'MYR')}</td>
                        <td class="text-right">${formatCurrency(item.total, invoice.currency || 'MYR')}</td>
                    </tr>
                    `).join('') : `
                    <tr>
                        <td>${invoice.categoryDisplayName || invoice.planType || 'Service'}</td>
                        <td class="text-center">1</td>
                        <td class="text-right">${formatCurrency(invoice.amount, invoice.currency || 'MYR')}</td>
                        <td class="text-right">${formatCurrency(invoice.amount, invoice.currency || 'MYR')}</td>
                    </tr>
                    `}
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
                ${invoice.discountReason ? `<div style="font-size: 11px; color: #4B5563; padding: 0 12px 6px; text-align: right;">${invoice.discountReason}</div>` : ''}
                ` : ''}
                ${(invoice.additionalCharges || []).map(charge => `
                <div class="summary-row tax">
                    <span>${charge.name} (${charge.rate}%):</span>
                    <span>${formatCurrency(charge.amount, invoice.currency || 'MYR')}</span>
                </div>
                `).join('')}
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${Number(invoice.total) === 0 ? '<span style="color: #10B981; font-weight: 600;">Free</span>' : formatCurrency(invoice.total, invoice.currency || 'MYR')}</span>
                </div>
            </div>
        </div>

        ${issuerInfo?.bankName ? `
        <div class="bank-section">
            <div class="bank-title">${t('settings:invoicesPage.paymentDetails')}</div>
            <div class="bank-details">
                <strong>Bank:</strong> ${issuerInfo.bankName}<br>
                <strong>Account Name:</strong> ${issuerInfo.bankAccountName || '-'}<br>
                <strong>Account Number:</strong> ${issuerInfo.bankAccount || '-'}
                ${issuerInfo.swiftCode ? `<br><strong>SWIFT Code:</strong> ${issuerInfo.swiftCode}` : ''}
            </div>
        </div>
        ` : ''}

        ${(issuerInfo?.taxId || issuerInfo?.businessRegistration) ? `
        <div class="registration-info">
            ${issuerInfo.businessRegistration ? `Reg No: ${issuerInfo.businessRegistration}` : ''}
            ${issuerInfo.businessRegistration && issuerInfo.taxId ? ' | ' : ''}
            ${issuerInfo.taxId ? `Tax No: ${issuerInfo.taxId}` : ''}
        </div>
        ` : ''}

        <div class="footer">
            <div class="footer-text">${t('settings:invoicesPage.thankYouForYourBusiness')}</div>
            <div class="footer-text">${t('settings:invoicesPage.thisIsAComputergeneratedInvoiceAndDoesNotRequireASignature')}</div>
        </div>
    </div>
</body>
</html>`;
  };

  // Generate PDF - downloads directly without opening modal
  const generateInvoicePDF = async (invoice: Invoice) => {
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

      try {
        await renderIframeToPdf(iframe, `Invoice-${invoice.invoiceNumber}.pdf`);
      } finally {
        document.body.removeChild(iframe);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Print invoice via hidden iframe — popup-blocker proof, no extra clicks.
  const handlePrintInvoice = (invoice: Invoice) => {
    printHTMLContent(generateInvoiceHTML(invoice), `Invoice ${invoice.invoiceNumber}`);
  };

  // Render invoice preview

  // Render table
  const renderInvoiceTable = (invoices: Invoice[], showPayButton: boolean = false) => (
    <DataTableContainer>
      <DataTable>
        <DataTableHead>
          <tr>
            <DataTableHeaderCell align="left">{t('settings:invoicesPage.invoice')}</DataTableHeaderCell>
            <DataTableHeaderCell align="left">{t('settings:invoicesPage.issuer')}</DataTableHeaderCell>
            <DataTableHeaderCell align="center">{t('settings:invoicesPage.period')}</DataTableHeaderCell>
            <DataTableHeaderCell align="center">{t('settings:invoicesPage.issued')}</DataTableHeaderCell>
            <DataTableHeaderCell align="center">{t('settings:invoicesPage.due')}</DataTableHeaderCell>
            <DataTableHeaderCell align="center">{t('settings:invoicesPage.status')}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('settings:invoicesPage.amount')}</DataTableHeaderCell>
            <DataTableHeaderCell align="right">{t('settings:invoicesPage.total')}</DataTableHeaderCell>
            <DataTableHeaderCell align="left">{t('settings:invoicesPage.actions')}</DataTableHeaderCell>
          </tr>
        </DataTableHead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map(invoice => (
              <DataTableRow key={invoice.id}>
                <DataTableCell data-label="Invoice" align="left">
                  <InvoiceInfo>
                    <InvoiceNumber>
                      {invoice.invoiceCategory === 'soa' && (
                        <span style={{
                          background: '#EEF2FF', color: '#635BFF',
                          fontSize: 10, fontWeight: 700, padding: '2px 6px',
                          borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.4,
                          marginRight: 6
                        }}>SOA</span>
                      )}
                      {invoice.invoiceNumber}
                      {invoice.type === 'automatic' && <AutoBadge style={{ marginLeft: '6px' }}>{t('settings:invoicesPage.auto')}</AutoBadge>}
                    </InvoiceNumber>
                    <CompanyName>
                      {invoice.invoiceCategory === 'soa'
                        ? t('settings:invoicesPage.soaSummary', 'Monthly Statement of Account')
                        : (invoice.categoryDisplayName || invoice.planType || 'Service')}
                    </CompanyName>
                  </InvoiceInfo>
                </DataTableCell>
                <DataTableCell data-label="Issuer" align="left">
                  <InvoiceInfo>
                    <InvoiceNumber>
                      {invoice.issuerName || (invoice.issuerType === 'system_admin' ? 'System Admin' : invoice.issuerType === 'brand' ? 'Brand' : 'Foodcourt')}
                    </InvoiceNumber>
                  </InvoiceInfo>
                </DataTableCell>
                <DataTableCell data-label="Period" align="center" style={{ fontSize: '12px' }}>
                  {invoice.billingPeriod || '-'}
                </DataTableCell>
                <DataTableCell data-label="Issued" align="center" style={{ fontSize: '13px' }}>
                  {formatDate(invoice.issueDate)}
                </DataTableCell>
                <DataTableCell data-label="Due" align="center" style={{ fontSize: '13px' }}>
                  {formatDate(invoice.dueDate)}
                </DataTableCell>
                <DataTableCell data-label="Status" align="center">
                  <StatusBadge status={getEffectiveStatus(invoice)}>
                    {getStatusDisplay(getEffectiveStatus(invoice))}
                  </StatusBadge>
                </DataTableCell>
                <DataTableCell data-label="Amount" align="right">
                  <DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount>
                </DataTableCell>
                <DataTableCell data-label="Total" align="right">
                  <DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('settings:invoicesPage.free')}</span> : formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount>
                </DataTableCell>
                <DataTableCell data-label="" mobileFullWidth>
                  <ActionButtons>
                    <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>
                      View
                    </LocalActionButton>

                    {/* Pay button — hidden if invoice is bundled into a SOA (parent_soa_invoice_id) → pay via SOA only */}
                    {showPayButton && !invoice.parentSoaInvoiceId && (invoice.status === 'sent' || invoice.status === 'pending_payment' || invoice.status === 'overdue') && Number(invoice.total) > 0 && (
                      <LocalActionButton variant="success" onClick={() => handlePayInvoice(invoice)}>
                        {invoice.invoiceCategory === 'soa' ? 'Pay All' : 'Pay'}
                      </LocalActionButton>
                    )}

                    {/* SOA child indicator — replaces Pay button for bundled invoices */}
                    {showPayButton && invoice.parentSoaInvoiceId && (
                      <span style={{ fontSize: 11, color: '#6B7280', alignSelf: 'center' }}>
                        Pay via SOA
                      </span>
                    )}

                    {/* Confirm button for free invoices */}
                    {showPayButton && !invoice.parentSoaInvoiceId && (invoice.status === 'sent' || invoice.status === 'pending_payment' || invoice.status === 'overdue') && Number(invoice.total) === 0 && (
                      <LocalActionButton variant="success" onClick={() => handleConfirmFreeInvoice(invoice)} disabled={confirmingInvoiceId === invoice.id}>
                        {confirmingInvoiceId === invoice.id ? 'Confirming...' : 'Confirm'}
                      </LocalActionButton>
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
                </DataTableCell>
              </DataTableRow>
            ))
          ) : (
            <DataTableRow>
              <DataTableCell colSpan={9}>
                <DataTableEmpty>{t('settings:invoicesPage.noInvoicesFound')}</DataTableEmpty>
              </DataTableCell>
            </DataTableRow>
          )}
        </tbody>
      </DataTable>
    </DataTableContainer>
  );

  return (
    <>
      <Container>
        <Header>
          <Title>{t('settings:invoicesPage.invoices')}</Title>
        </Header>

        <Content>
          <SuspendedBanner />
          {/* Active subscriptions + Customer Portal entry */}
          {restaurantId && (
            <SubscriptionPanel payerType="restaurant" payerId={restaurantId} hideWhenEmpty />
          )}
          {/* Stats */}
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.total}</StatValue>
              <StatLabel>{t('settings:invoicesPage.totalInvoices')}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.pending}</StatValue>
              <StatLabel>{t('settings:invoicesPage.toPay')}</StatLabel>
              <StatDescription>{formatCurrency(stats.pendingAmount, operationSettings?.currency || 'MYR')}</StatDescription>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{stats.confirming}</StatValue>
              <StatLabel>{t('settings:invoicesPage.confirming')}</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.paid}</StatValue>
              <StatLabel>{t('settings:invoicesPage.paid')}</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Tabs */}
          <Tabs>
            <CommonTab active={activeTab === 'all'} onClick={() => handleTabChange('all')}>
              All Invoices<TabBadge count={allInvoices.length} />
            </CommonTab>
            <CommonTab active={activeTab === 'to_pay'} onClick={() => handleTabChange('to_pay')}>
              Invoices to Pay<TabBadge count={invoicesToPay.filter(i => i.status === 'pending_payment' || i.status === 'overdue' || i.status === 'payment_submitted').length} variant="warning" />
            </CommonTab>
          </Tabs>

          {/* Filters */}
          <DatePeriodFilter
            activePeriod={activePeriod}
            dateRange={dateRange}
            isCustomDateRange={isCustomDateRange}
            onPeriodChange={handlePeriodChange}
            onCalendarRangeSelect={handleCalendarRangeSelect}
          >
            <SearchInput
              placeholder="Search invoice, issuer, status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </DatePeriodFilter>

          {/* SOA invoices appear inline in the regular list (B1 재설계) — purple badge in invoice number column.
              결제 흐름: 월결제(monthly_soa) 계약이면 SOA 인보이스에 Pay All 버튼이 뜨고, child trade invoices 는 'Pay via SOA' 표시. */}

          {/* Invoice Table — SOA child 는 자동 hide */}
          {/* SOA child invoices NOT hidden — all invoices shown. Pay button hidden on children when parent_soa_invoice_id exists (B1 재설계). */}
          {activeTab === 'all' && renderInvoiceTable(filteredAllInvoices, true)}
          {activeTab === 'to_pay' && renderInvoiceTable(filteredInvoicesToPay, true)}
        </Content>

        {/* View Invoice Modal - BrandGeneral Style */}
        {showViewModal && selectedInvoice && (() => {
          // Restaurant Admin always receives invoices, so issuerInfo = From, payerInfo/companySettings = Bill To
          const issuerInfo = selectedInvoice.issuerInfo;
          const payerCompany = selectedInvoice.payerInfo || (companySettings ? {
            name: companySettings.companyName,
            address: companySettings.address,
            city: companySettings.city,
            state: companySettings.state,
            postalCode: companySettings.postalCode,
            country: companySettings.country,
            phone: companySettings.phone,
            email: companySettings.email,
            taxId: companySettings.taxNumber,
            businessRegistration: companySettings.registrationNumber
          } : null);

          return (
          <CommonModal
            isOpen={true}
            onClose={() => setShowViewModal(false)}
            title="Invoice Details"
            size="large"
            footer={
              <>
                {(selectedInvoice.status === 'sent' || selectedInvoice.status === 'pending_payment' || selectedInvoice.status === 'overdue') && Number(selectedInvoice.total) > 0 && (
                  <>
                    <Button variant="secondary" onClick={() => setShowApplyCreditModal(true)}>
                      Apply Referral Credit
                    </Button>
                    <Button variant="success" onClick={() => {
                      setShowViewModal(false);
                      handlePayInvoice(selectedInvoice);
                    }}>
                      Pay Now
                    </Button>
                  </>
                )}
                {(selectedInvoice.status === 'sent' || selectedInvoice.status === 'pending_payment' || selectedInvoice.status === 'overdue') && Number(selectedInvoice.total) === 0 && (
                  <Button variant="success" onClick={() => handleConfirmFreeInvoice(selectedInvoice)} disabled={!!confirmingInvoiceId}>
                    {confirmingInvoiceId ? 'Confirming...' : 'Confirm'}
                  </Button>
                )}
                <Button onClick={() => generateInvoicePDF(selectedInvoice)}>
                  Download PDF
                </Button>
                <Button onClick={() => handlePrintInvoice(selectedInvoice)}>
                  Print
                </Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              </>
            }
          >
                {/* Invoice Header with Issuer Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #C7CED6' }}>
                  <div style={{ flex: '0 0 55%' }}>
                    {issuerInfo?.logoUrl && (
                      <img src={issuerInfo.logoUrl} alt="Company Logo" style={{ maxHeight: '60px', marginBottom: '8px' }} />
                    )}
                    <div style={{ fontSize: issuerInfo?.logoUrl ? '16px' : '20px', fontWeight: '700', color: '#0A2540', marginBottom: '8px' }}>
                      {issuerInfo?.name || selectedInvoice.issuerName || 'Issuer'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.6' }}>
                      {formatAddressLines({
                        address: issuerInfo?.address,
                        city: issuerInfo?.city,
                        state: issuerInfo?.state,
                        postal_code: issuerInfo?.postalCode,
                        country: issuerInfo?.country
                      }, (i18n.language as AppLocale) || 'en').map((line, idx) => (
                        <div key={idx}>{line}</div>
                      ))}
                      {issuerInfo?.phone && <div>Tel: {issuerInfo.phone}</div>}
                      {issuerInfo?.email && <div>Email: {issuerInfo.email}</div>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#635BFF', marginBottom: '8px' }}>{t('settings:invoicesPage.invoice')}</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>{selectedInvoice.invoiceNumber}</div>
                    <StatusBadge status={selectedInvoice.status} style={{ marginTop: '8px' }}>
                      {getStatusDisplay(selectedInvoice.status)}
                    </StatusBadge>
                  </div>
                </div>

                {/* Bill To + Dates Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '8px', textTransform: 'uppercase' }}>{t('settings:invoicesPage.billTo')}</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{payerCompany?.name || companySettings?.companyName || 'Your Company'}</div>
                    {formatAddressLines({
                      address: payerCompany?.address || companySettings?.address,
                      city: payerCompany?.city || companySettings?.city,
                      state: payerCompany?.state || companySettings?.state,
                      postal_code: payerCompany?.postalCode || companySettings?.postalCode,
                      country: payerCompany?.country || companySettings?.country
                    }, (i18n.language as AppLocale) || 'en').map((line, idx) => (
                      <div key={idx} style={{ fontSize: '13px', color: '#4B5563', marginTop: idx === 0 ? '4px' : '2px' }}>{line}</div>
                    ))}
                    {(payerCompany?.email || companySettings?.email) && (
                      <div style={{ fontSize: '13px', color: '#4B5563', marginTop: '2px' }}>{payerCompany?.email || companySettings?.email}</div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ color: '#4B5563' }}>Billing Period:</span>
                      <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{selectedInvoice.billingPeriod || '-'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ color: '#4B5563' }}>Issue Date:</span>
                      <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(selectedInvoice.issueDate)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                      <span style={{ color: '#4B5563' }}>Due Date:</span>
                      <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(selectedInvoice.dueDate)}</span>
                    </div>
                    {selectedInvoice.paidDate && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                        <span style={{ color: '#4B5563' }}>Paid Date:</span>
                        <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(selectedInvoice.paidDate)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Table */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '12px', textTransform: 'uppercase' }}>{t('settings:invoicesPage.items')}</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #C7CED6' }}>
                        <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#4B5563' }}>{t('settings:invoicesPage.description')}</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#4B5563' }}>{t('settings:invoicesPage.qty')}</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#4B5563' }}>{t('settings:invoicesPage.unitPrice')}</th>
                        <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#4B5563' }}>{t('settings:invoicesPage.amount')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                        selectedInvoice.items.map((item, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #F1F4F8' }}>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937' }}>{item.description}</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937', textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(item.unitPrice, selectedInvoice.currency || 'MYR')}</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(item.total, selectedInvoice.currency || 'MYR')}</td>
                          </tr>
                        ))
                      ) : (
                        <tr style={{ borderBottom: '1px solid #F1F4F8' }}>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937' }}>{selectedInvoice.categoryDisplayName || selectedInvoice.planType || 'Service'}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937', textAlign: 'center' }}>1</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#1F2937', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <div style={{ width: '280px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '14px', color: '#4B5563' }}>
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedInvoice.subtotalBeforeDiscount || selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</span>
                    </div>
                    {selectedInvoice.discountType && selectedInvoice.discountType !== 'none' && selectedInvoice.discountAmount > 0 && (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '14px', color: '#15803D' }}>
                          <span>Discount{selectedInvoice.discountType === 'percentage' ? ` (${selectedInvoice.discountValue}%)` : ''}:</span>
                          <span>-{formatCurrency(selectedInvoice.discountAmount, selectedInvoice.currency || 'MYR')}</span>
                        </div>
                        {selectedInvoice.discountReason && (
                          <div style={{ padding: '0 12px 6px', fontSize: '11px', color: '#4B5563', textAlign: 'right' }}>
                            {selectedInvoice.discountReason}
                          </div>
                        )}
                      </>
                    )}
                    {(selectedInvoice.additionalCharges || []).map((charge: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '14px', color: '#4B5563' }}>
                        <span>{charge.name} ({charge.rate}%):</span>
                        <span>{formatCurrency(charge.amount, selectedInvoice.currency || 'MYR')}</span>
                      </div>
                    ))}
                    {(selectedInvoice.additionalCharges || []).length === 0 && selectedInvoice.tax > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '14px', color: '#4B5563' }}>
                        <span>Tax:</span>
                        <span>{formatCurrency(selectedInvoice.tax, selectedInvoice.currency || 'MYR')}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '16px', fontWeight: '700', color: '#0A2540', background: '#F1F4F8', borderRadius: '6px', marginTop: '8px' }}>
                      <span>Total:</span>
                      <span>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Details (from issuer) */}
                {issuerInfo?.bankName && (
                  <div style={{ background: '#F1F4F8', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#4B5563', marginBottom: '8px', textTransform: 'uppercase' }}>{t('settings:invoicesPage.paymentDetails')}</div>
                    <div style={{ fontSize: '13px', color: '#1F2937', lineHeight: '1.6' }}>
                      <div><strong>Bank:</strong> {issuerInfo.bankName}</div>
                      <div><strong>Account Name:</strong> {issuerInfo.bankAccountName || '-'}</div>
                      <div><strong>Account Number:</strong> {issuerInfo.bankAccount || '-'}</div>
                      {issuerInfo.swiftCode && <div><strong>SWIFT Code:</strong> {issuerInfo.swiftCode}</div>}
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                {(issuerInfo?.taxId || issuerInfo?.businessRegistration) && (
                  <div style={{ fontSize: '12px', color: '#6B7280', textAlign: 'center', marginTop: '16px' }}>
                    {issuerInfo?.businessRegistration && <span>Reg No: {issuerInfo.businessRegistration}</span>}
                    {issuerInfo?.businessRegistration && issuerInfo?.taxId && <span> | </span>}
                    {issuerInfo?.taxId && <span>Tax No: {issuerInfo.taxId}</span>}
                  </div>
                )}
          </CommonModal>
          );
        })()}

        {/* Payment Submit Modal */}
        {showPaymentSubmitModal && selectedInvoice && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowPaymentSubmitModal(false)}
            title="Submit Payment"
            footer={
              <>
                <Button variant="secondary" onClick={() => setShowPaymentSubmitModal(false)}>
                  Cancel
                </Button>
                {paymentData.paymentMethod && paymentData.paymentMethod !== 'stripe' && paymentData.paymentMethod !== 'paypal' && (
                <Button
                  variant="success"
                  onClick={handleSubmitPayment}
                  disabled={isSubmittingPayment || availablePaymentMethods.length === 0}
                >
                  {isSubmittingPayment ? 'Submitting...' : 'Submit Payment'}
                </Button>
                )}
              </>
            }
          >
                <div style={{ marginBottom: '20px', padding: '16px', background: '#F1F4F8', borderRadius: '8px' }}>
                  <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#4B5563' }}>Invoice: <strong>{selectedInvoice.invoiceNumber}</strong></p>
                  <p style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#0A2540' }}>
                    {formatCurrency(selectedInvoice.total, selectedInvoice.currency)}
                  </p>
                </div>

                <div style={{ marginBottom: '16px', padding: '12px 14px', background: '#F1F0FF', border: '1px solid #D4D0FF', borderRadius: '8px', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>
                  <div style={{ fontWeight: 600, color: '#635BFF', marginBottom: 4 }}>How payment works</div>
                  <div style={{ fontSize: 12.5 }}>
                    <strong>Card / PayPal</strong> — paid instantly when you complete checkout.<br />
                    <strong>Bank transfer</strong> — make the transfer using the merchant's account info, then submit the transaction reference (and optionally a receipt). The invoice issuer reviews and confirms it (usually within a few hours during business days).
                  </div>
                </div>

                {loadingPaymentMethods ? (
                  <div style={{ textAlign: 'center', padding: '20px', color: '#4B5563' }}>{t('settings:invoicesPage.loadingPaymentMethods')}</div>
                ) : availablePaymentMethods.length === 0 ? (
                  <div style={{ padding: '20px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '16px' }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#92400E', fontSize: '15px' }}>
                      Payment Not Available
                    </p>
                    <p style={{ margin: 0, color: '#92400E', fontSize: '14px', lineHeight: '1.5' }}>
                      <strong>{selectedInvoice.issuerName || (selectedInvoice.issuerType === 'brand' ? 'Brand' : selectedInvoice.issuerType === 'foodcourt' ? 'Foodcourt' : 'System Admin')}</strong> has not configured payment methods for <strong>{getCurrencySymbol(selectedInvoice.currency || 'MYR')}</strong> yet. Please contact the invoice issuer to set up payment options.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Payment Method Selection */}
                    <div style={{ marginBottom: '20px' }}>
                      <FormLabel>Payment Method *</FormLabel>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(100px, 1fr))`, gap: '8px', marginTop: '8px' }}>
                        {availablePaymentMethods.map(method => {
                          const isSelected = paymentData.paymentMethod === method.id;
                          return (
                            <button
                              key={method.id}
                              onClick={() => { setPaymentData(prev => ({ ...prev, paymentMethod: method.id })); setPaymentSubmitError(''); }}
                              style={{
                                padding: '12px 16px', minHeight: '44px',
                                borderRadius: '8px',
                                border: `1px solid ${isSelected ? '#635BFF' : '#C7CED6'}`,
                                background: isSelected ? 'rgba(99, 91, 255, 0.1)' : 'white',
                                color: isSelected ? '#635BFF' : '#1F2937',
                                fontSize: '14px', fontWeight: '500',
                                cursor: 'pointer', transition: 'all 0.15s',
                                textAlign: 'center'
                              }}
                            >
                              {method.name}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Stripe / PayPal — hosted Checkout redirect */}
                    {(paymentData.paymentMethod === 'stripe' || paymentData.paymentMethod === 'paypal') && selectedInvoice && (
                      <HostedCheckoutLauncher
                        invoice={selectedInvoice}
                        gateway={paymentData.paymentMethod as 'stripe' | 'paypal'}
                      />
                    )}

                    {/* Bank Transfer Details */}
                    {paymentData.paymentMethod === 'bank_transfer' && (() => {
                      const m = availablePaymentMethods.find(m => m.id === 'bank_transfer');
                      return m ? (
                        <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', lineHeight: '1.8' }}>
                          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>{t('settings:invoicesPage.bankTransferDetails')}</h4>
                          <p style={{ margin: '0' }}><strong>Bank:</strong> {m.bankName}</p>
                          <p style={{ margin: '0' }}><strong>Account Number:</strong> {m.accountNumber}</p>
                          <p style={{ margin: '0' }}><strong>Account Name:</strong> {m.accountName}</p>
                        </div>
                      ) : null;
                    })()}

                    {/* QR Payment Details */}
                    {paymentData.paymentMethod === 'qr_payment' && (() => {
                      const m = availablePaymentMethods.find(m => m.id === 'qr_payment');
                      return m ? (
                        <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: '8px', marginBottom: '16px', textAlign: 'center' }}>
                          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#1E40AF' }}>{t('settings:invoicesPage.qrPayment')}</h4>
                          {m.qrImage && <img src={m.qrImage} alt="Payment QR Code" style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #C7CED6', borderRadius: '8px' }} />}
                          {m.qrDescription && <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#4B5563' }}>{m.qrDescription}</p>}
                        </div>
                      ) : null;
                    })()}

                    {/* Manual payment fields (bank_transfer, qr_payment only) — hosted Stripe/PayPal redirect handles itself */}
                    {paymentData.paymentMethod && paymentData.paymentMethod !== 'stripe' && paymentData.paymentMethod !== 'paypal' && (
                      <>
                        <div style={{ padding: '12px 16px', background: '#FEF3C7', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', color: '#92400E', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                          <span style={{ fontWeight: '600', flexShrink: 0 }}>*</span>
                          <span>{t('settings:invoicesPage.pleaseProvideEitherA')}<strong>{t('settings:invoicesPage.transactionIdReferenceNumber')}</strong> or upload a <strong>{t('settings:invoicesPage.paymentReceiptImage')}</strong> to submit your payment.</span>
                        </div>
                        <FormGroup>
                          <FormLabel>{t('settings:invoicesPage.transactionIdReferenceNumber')}</FormLabel>
                          <FormInput type="text" placeholder="Enter transaction ID or reference number" value={paymentData.transactionId} onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))} />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>{t('settings:invoicesPage.notesOptional')}</FormLabel>
                          <textarea
                            placeholder="Any additional information about the payment..."
                            value={paymentData.notes}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                            style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: '1px solid #C7CED6', borderRadius: '6px', fontSize: '14px', minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' }}
                          />
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>{t('settings:invoicesPage.paymentReceiptImage')}</FormLabel>
                          <div style={{ border: '2px dashed #C7CED6', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer', position: 'relative' }}>
                            {paymentData.receiptImage ? (
                              <div>
                                <img src={paymentData.receiptImage} alt="Receipt" style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '8px', borderRadius: '8px' }} />
                                <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#4B5563' }}>{t('settings:invoicesPage.clickToChangeImage')}</p>
                              </div>
                            ) : (
                              <div>
                                <p style={{ margin: '0', fontSize: '14px', color: '#4B5563' }}>{t('settings:invoicesPage.clickToUploadReceiptImage')}</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6B7280' }}>{t('settings:invoicesPage.max5mbJpgpng')}</p>
                              </div>
                            )}
                            <input type="file" accept="image/*" onChange={handleReceiptImageUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />
                          </div>
                        </FormGroup>
                      </>
                    )}
                  </>
                )}

                {paymentSubmitError && (
                  <div style={{ padding: '12px', background: '#FEE2E2', borderRadius: '6px', marginTop: '16px' }}>
                    <p style={{ margin: 0, color: '#DC2626', fontSize: '13px' }}>{paymentSubmitError}</p>
                  </div>
                )}
          </CommonModal>
        )}
      </Container>
      <AlertDialog
        isOpen={!!alertDlg}
        onClose={() => setAlertDlg(null)}
        title={alertDlg?.title || ''}
        message={alertDlg?.message || ''}
      />
      {showApplyCreditModal && selectedInvoice && (
        <ApplyCreditModal
          invoice={{
            id: selectedInvoice.id,
            invoice_number: selectedInvoice.invoice_number,
            total_amount: selectedInvoice.total,
            paid_amount: selectedInvoice.paid_amount,
            currency: selectedInvoice.currency,
            status: selectedInvoice.status
          }}
          onClose={() => setShowApplyCreditModal(false)}
          onApplied={() => {
            setShowApplyCreditModal(false);
            setShowViewModal(false);
            fetchInvoicesToPay();
          }}
        />
      )}
    </>
  );
};

export default RestaurantInvoicesPage;
