import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { BaseButton, StatusBadge as CommonStatusBadge } from '../../components/UI/CommonStyles';
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
  ActionButtons
} from '../../components/UI';
import { SearchInput } from '../../components/Common/FilterComponents';
import { Tabs, Tab as CommonTab, Badge as TabBadge } from '../../components/Common/TabComponents';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Invoice {
  id: string;
  invoiceNumber: string;
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

const PeriodFilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const DateButton = styled.button<{ active?: boolean }>`
  padding: 8px 16px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#0A2540'};
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: ${props => props.active ? '#635BFF' : '#F7F7FF'};
  }
`;

const DateInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

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
    background: #EF4444;
    color: white;
    border-color: #EF4444;
    padding: 6px 12px;

    &:hover {
      background: #DC2626;
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
    color: #374151;
    border-color: #D1D5DB;

    &:hover {
      background: #F9FAFB;
      border-color: #9CA3AF;
    }
  `}
`;

// Modal styled components
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
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #0A2540;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
  border-radius: 0 0 12px 12px;
`;

// Invoice Preview components
const InvoicePreview = styled.div`
  background: white;
  padding: 40px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E6EBF1;
`;

const CompanyLogo = styled.img`
  max-width: 180px;
  max-height: 60px;
  object-fit: contain;
`;

const InvoiceTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  text-align: right;
`;

const InvoiceMeta = styled.div`
  text-align: right;
  margin-top: 8px;
`;

const MetaItem = styled.p`
  margin: 4px 0;
  font-size: 13px;
  color: #6B7280;
`;

const InvoiceParties = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
`;

const PartySection = styled.div``;

const PartyTitle = styled.h3`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px 0;
`;

const PartyName = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const PartyDetail = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 2px 0;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;

  th {
    background: #F8FAFC;
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #E6EBF1;
  }

  th:last-child,
  td:last-child {
    text-align: right;
  }

  td {
    padding: 16px;
    font-size: 14px;
    color: #0A2540;
    border-bottom: 1px solid #E6EBF1;
  }
`;

const TotalSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalBox = styled.div`
  width: 280px;
`;

const TotalRow = styled.div<{ highlight?: boolean }>`
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

const TotalLabel = styled.span<{ highlight?: boolean }>`
  font-size: ${props => props.highlight ? '16px' : '14px'};
  color: ${props => props.highlight ? '#0A2540' : '#6B7280'};
  font-weight: ${props => props.highlight ? '600' : '400'};
`;

const TotalValue = styled.span<{ highlight?: boolean }>`
  font-size: ${props => props.highlight ? '20px' : '14px'};
  font-weight: ${props => props.highlight ? '700' : '500'};
  color: #0A2540;
`;

// Form components
const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

type TabType = 'all' | 'to_pay';
type PeriodType = 'week' | 'month' | 'year' | 'all';

const RestaurantInvoicesPage: React.FC = () => {
  const { operationSettings, restaurantId } = useStore();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  // States
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('month');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
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

  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentSubmitModal, setShowPaymentSubmitModal] = useState(false);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    transactionId: '',
    receiptImage: ''
  });
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentSubmitError, setPaymentSubmitError] = useState('');
  const [companySettings, setCompanySettings] = useState<CompanySettings | null>(null);
  const [currencyConfig, setCurrencyConfig] = useState<CurrencyConfig>({});

  // URL-based tab management
  const activeTab = (searchParams.get('tab') as TabType) || 'all';
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

  // Fetch all invoices for this restaurant
  const fetchAllInvoices = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token || !restaurantId) return;

      const response = await fetch(`/api/invoices/restaurant/${restaurantId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Transform data to match Invoice interface
        const invoices: Invoice[] = (data.data || data || []).map((inv: any) => ({
          id: inv.id?.toString() || '',
          invoiceNumber: inv.invoice_number || '',
          issueDate: inv.issued_at || inv.issue_date || '',
          dueDate: inv.due_date || '',
          paidDate: inv.paid_at || inv.paid_date || '',
          status: inv.status || '',
          currency: inv.currency || 'MYR',
          amount: parseFloat(inv.subtotal || inv.amount || 0),
          tax: parseFloat(inv.tax_amount || inv.tax || 0),
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
          categoryDisplayName: inv.category_display_name || '',
          issuerType: inv.issuer_type || 'system_admin',
          issuerName: inv.issuer_name || '',
          issuerInfo: inv.issuer_info || null,
          payerInfo: inv.payer_info || null
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
      const token = localStorage.getItem('auth_token');
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

  // Fetch payment methods
  const fetchPaymentMethods = async (currency: string) => {
    setLoadingPaymentMethods(true);
    try {
      const response = await fetch(`/api/admin/payment-settings/available/${currency}`);
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
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/submit-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentMethod: paymentData.paymentMethod,
          transactionId: paymentData.transactionId,
          receiptUrl: paymentData.receiptImage
        })
      });

      if (response.ok) {
        setShowPaymentSubmitModal(false);
        setPaymentData({ paymentMethod: '', transactionId: '', receiptImage: '' });
        await fetchAllInvoices();
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

  // Initial data fetch
  useEffect(() => {
    fetchAllInvoices();
    fetchInvoicesToPay();
    fetchCompanySettings();
    fetchCurrencyConfig();
  }, [restaurantId]);

  // Helper functions
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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

  const handlePayInvoice = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentSubmitError('');
    setPaymentData({ paymentMethod: '', transactionId: '', receiptImage: '' });
    await fetchPaymentMethods(invoice.currency || 'MYR');
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

  // Generate PDF
  const generateInvoicePDF = async (invoice: Invoice) => {
    const previewElement = document.getElementById('invoice-preview-pdf');
    if (!previewElement) {
      setSelectedInvoice(invoice);
      setShowViewModal(true);
      setTimeout(() => generateInvoicePDF(invoice), 500);
      return;
    }

    try {
      const canvas = await html2canvas(previewElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Print invoice
  const handlePrintInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Render invoice preview
  const renderInvoicePreview = (invoice: Invoice) => {
    const issuerInfo = invoice.issuerInfo;
    const payerInfo = invoice.payerInfo || (companySettings ? {
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
      <InvoicePreview id="invoice-preview-pdf">
        <InvoiceHeader>
          <div>
            {issuerInfo?.logoUrl ? (
              <CompanyLogo src={issuerInfo.logoUrl} alt="Company Logo" />
            ) : (
              <PartyName style={{ fontSize: '24px' }}>{issuerInfo?.name || 'Company Name'}</PartyName>
            )}
          </div>
          <div>
            <InvoiceTitle>INVOICE</InvoiceTitle>
            <InvoiceMeta>
              <MetaItem><strong>{invoice.invoiceNumber}</strong></MetaItem>
              <MetaItem>Issue Date: {formatDate(invoice.issueDate)}</MetaItem>
              <MetaItem>Due Date: {formatDate(invoice.dueDate)}</MetaItem>
            </InvoiceMeta>
          </div>
        </InvoiceHeader>

        <InvoiceParties>
          <PartySection>
            <PartyTitle>From</PartyTitle>
            <PartyName>{issuerInfo?.name || invoice.issuerName || 'Issuer'}</PartyName>
            {issuerInfo?.address && <PartyDetail>{issuerInfo.address}</PartyDetail>}
            {(issuerInfo?.city || issuerInfo?.state || issuerInfo?.postalCode) && (
              <PartyDetail>
                {[issuerInfo.city, issuerInfo.state, issuerInfo.postalCode].filter(Boolean).join(', ')}
              </PartyDetail>
            )}
            {issuerInfo?.country && <PartyDetail>{issuerInfo.country}</PartyDetail>}
            {issuerInfo?.email && <PartyDetail>{issuerInfo.email}</PartyDetail>}
            {issuerInfo?.phone && <PartyDetail>{issuerInfo.phone}</PartyDetail>}
            {issuerInfo?.taxId && <PartyDetail>Tax ID: {issuerInfo.taxId}</PartyDetail>}
          </PartySection>

          <PartySection>
            <PartyTitle>Bill To</PartyTitle>
            <PartyName>{payerInfo?.name || companySettings?.companyName || 'Customer'}</PartyName>
            {(payerInfo?.address || companySettings?.address) && (
              <PartyDetail>{payerInfo?.address || companySettings?.address}</PartyDetail>
            )}
            {(payerInfo?.city || payerInfo?.state || payerInfo?.postalCode || companySettings?.city) && (
              <PartyDetail>
                {[
                  payerInfo?.city || companySettings?.city,
                  payerInfo?.state || companySettings?.state,
                  payerInfo?.postalCode || companySettings?.postalCode
                ].filter(Boolean).join(', ')}
              </PartyDetail>
            )}
            {(payerInfo?.country || companySettings?.country) && (
              <PartyDetail>{payerInfo?.country || companySettings?.country}</PartyDetail>
            )}
            {(payerInfo?.email || companySettings?.email) && (
              <PartyDetail>{payerInfo?.email || companySettings?.email}</PartyDetail>
            )}
            {(payerInfo?.phone || companySettings?.phone) && (
              <PartyDetail>{payerInfo?.phone || companySettings?.phone}</PartyDetail>
            )}
          </PartySection>
        </InvoiceParties>

        <ItemsTable>
          <thead>
            <tr>
              <th>Description</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.unitPrice, invoice.currency || 'MYR')}</td>
                  <td>{formatCurrency(item.total, invoice.currency || 'MYR')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>{invoice.categoryDisplayName || invoice.planType || 'Service'}</td>
                <td>1</td>
                <td>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</td>
                <td>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</td>
              </tr>
            )}
          </tbody>
        </ItemsTable>

        <TotalSection>
          <TotalBox>
            <TotalRow>
              <TotalLabel>Subtotal</TotalLabel>
              <TotalValue>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</TotalValue>
            </TotalRow>
            {invoice.tax > 0 && (
              <TotalRow>
                <TotalLabel>Tax</TotalLabel>
                <TotalValue>{formatCurrency(invoice.tax, invoice.currency || 'MYR')}</TotalValue>
              </TotalRow>
            )}
            <TotalRow highlight>
              <TotalLabel highlight>Total</TotalLabel>
              <TotalValue highlight>{formatCurrency(invoice.total, invoice.currency || 'MYR')}</TotalValue>
            </TotalRow>
          </TotalBox>
        </TotalSection>
      </InvoicePreview>
    );
  };

  // Render table
  const renderInvoiceTable = (invoices: Invoice[], showPayButton: boolean = false) => (
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
          {invoices.length > 0 ? (
            invoices.map(invoice => (
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
                  <StatusBadge status={invoice.status}>
                    {getStatusDisplay(invoice.status)}
                  </StatusBadge>
                </DataTableCell>
                <DataTableCell data-label="Amount" align="right">
                  <DataTableAmount>{formatCurrency(invoice.amount, invoice.currency || 'MYR')}</DataTableAmount>
                </DataTableCell>
                <DataTableCell data-label="Total" align="right">
                  <DataTableAmount highlight>{formatCurrency(invoice.total, invoice.currency || 'MYR')}</DataTableAmount>
                </DataTableCell>
                <DataTableCell data-label="" mobileFullWidth>
                  <ActionButtons>
                    <LocalActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>
                      View
                    </LocalActionButton>

                    {/* Pay button for pending/overdue invoices */}
                    {showPayButton && (invoice.status === 'pending_payment' || invoice.status === 'overdue') && (
                      <LocalActionButton variant="success" onClick={() => handlePayInvoice(invoice)}>
                        Pay
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
                <DataTableEmpty>No invoices found</DataTableEmpty>
              </DataTableCell>
            </DataTableRow>
          )}
        </tbody>
      </DataTable>
    </DataTableContainer>
  );

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Invoices</Title>
        </Header>

        <Content>
          {/* Stats */}
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Invoices</StatLabel>
            </StatCard>
            <StatCard variant="warning">
              <StatValue>{stats.pending}</StatValue>
              <StatLabel>To Pay</StatLabel>
              <StatDescription>{formatCurrency(stats.pendingAmount, operationSettings?.defaultCurrency || 'MYR')}</StatDescription>
            </StatCard>
            <StatCard variant="info">
              <StatValue>{stats.confirming}</StatValue>
              <StatLabel>Confirming</StatLabel>
            </StatCard>
            <StatCard variant="success">
              <StatValue>{stats.paid}</StatValue>
              <StatLabel>Paid</StatLabel>
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
          <FilterBarWrapper>
            <FiltersLeft>
              <SearchInput
                placeholder="Search invoice, issuer, status..."
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
          </FilterBarWrapper>

          {/* Invoice Table */}
          {activeTab === 'all' && renderInvoiceTable(filteredAllInvoices, true)}
          {activeTab === 'to_pay' && renderInvoiceTable(filteredInvoicesToPay, true)}
        </Content>

        {/* View Invoice Modal */}
        {showViewModal && selectedInvoice && (
          <Modal onClick={() => setShowViewModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
              <ModalHeader>
                <ModalTitle>Invoice {selectedInvoice.invoiceNumber}</ModalTitle>
                <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                {renderInvoicePreview(selectedInvoice)}
              </ModalBody>
              <ModalFooter>
                {(selectedInvoice.status === 'pending_payment' || selectedInvoice.status === 'overdue') && (
                  <Button variant="success" onClick={() => {
                    setShowViewModal(false);
                    handlePayInvoice(selectedInvoice);
                  }}>
                    Pay Now
                  </Button>
                )}
                <Button onClick={() => generateInvoicePDF(selectedInvoice)}>
                  Download PDF
                </Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
                          cursor: 'pointer',
                          transition: 'border-color 0.2s'
                        }}>
                          {paymentData.receiptImage ? (
                            <div>
                              <img
                                src={paymentData.receiptImage}
                                alt="Receipt"
                                style={{ maxWidth: '200px', maxHeight: '200px', marginBottom: '8px', borderRadius: '8px' }}
                              />
                              <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#6B7280' }}>
                                Click to change image
                              </p>
                            </div>
                          ) : (
                            <div>
                              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 8px' }}>
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21,15 16,10 5,21"/>
                              </svg>
                              <p style={{ margin: '0', fontSize: '14px', color: '#6B7280' }}>
                                Click to upload receipt image
                              </p>
                              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#9CA3AF' }}>
                                Max 5MB, JPG/PNG
                              </p>
                            </div>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleReceiptImageUpload}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              opacity: 0,
                              cursor: 'pointer'
                            }}
                          />
                        </div>
                      </FormGroup>
                    );
                  }
                  return null;
                })()}

                {paymentSubmitError && (
                  <div style={{ padding: '12px', background: '#FEE2E2', borderRadius: '6px', marginTop: '16px' }}>
                    <p style={{ margin: 0, color: '#DC2626', fontSize: '13px' }}>{paymentSubmitError}</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowPaymentSubmitModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={handleSubmitPayment}
                  disabled={isSubmittingPayment || availablePaymentMethods.length === 0}
                >
                  {isSubmittingPayment ? 'Submitting...' : 'Submit Payment'}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </MainLayout>
  );
};

export default RestaurantInvoicesPage;
