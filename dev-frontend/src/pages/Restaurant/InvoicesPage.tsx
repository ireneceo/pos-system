import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSearchParams, useParams } from 'react-router-dom';
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
  const { operationSettings } = useStore();
  const { user } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get restaurantId from URL or user's restaurant_id
  const restaurantId = urlRestaurantId ? parseInt(urlRestaurantId) : user?.restaurant_id;

  // States
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activePeriod, setActivePeriod] = useState<PeriodType>('all');
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);
  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    // Default to 'all' - wide date range
    return {
      start: '2000-01-01',
      end: formatDate(today)
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
          issuerInfo: inv.issuerInfo || inv.issuer_info || null,
          payerInfo: inv.payerInfo || inv.payer_info || null
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
  }, [restaurantId, user?.restaurant_id]);

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
                ${issuerInfo?.logoUrl ? `<img src="${issuerInfo.logoUrl}" alt="Company Logo" class="company-logo">` : ''}
                <div class="company-name" style="${issuerInfo?.logoUrl ? 'font-size: 14px;' : ''}">${issuerInfo?.name || invoice.issuerName || 'Issuer'}</div>
                <div class="company-details">
                    ${issuerInfo?.address ? `${issuerInfo.address}<br>` : ''}
                    ${[issuerInfo?.city, issuerInfo?.state, issuerInfo?.postalCode].filter(Boolean).join(', ')}${issuerInfo?.city || issuerInfo?.state || issuerInfo?.postalCode ? '<br>' : ''}
                    ${issuerInfo?.country ? `${issuerInfo.country}<br>` : ''}
                    ${issuerInfo?.phone ? `Tel: ${issuerInfo.phone}<br>` : ''}
                    ${issuerInfo?.email ? `Email: ${issuerInfo.email}` : ''}
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
                <div class="customer-name">${payerCompany?.name || companySettings?.companyName || 'Your Company'}</div>
                ${payerCompany?.address || companySettings?.address ? `<div class="customer-details">${payerCompany?.address || companySettings?.address}</div>` : ''}
                ${[payerCompany?.city || companySettings?.city, payerCompany?.state || companySettings?.state, payerCompany?.postalCode || companySettings?.postalCode].filter(Boolean).length > 0 ? `<div class="customer-details">${[payerCompany?.city || companySettings?.city, payerCompany?.state || companySettings?.state, payerCompany?.postalCode || companySettings?.postalCode].filter(Boolean).join(', ')}</div>` : ''}
                ${payerCompany?.country || companySettings?.country ? `<div class="customer-details">${payerCompany?.country || companySettings?.country}</div>` : ''}
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
                ${invoice.tax > 0 ? `
                <div class="summary-row tax">
                    <span>Tax:</span>
                    <span>${formatCurrency(invoice.tax, invoice.currency || 'MYR')}</span>
                </div>
                ` : ''}
                <div class="summary-row total">
                    <span>Total:</span>
                    <span>${formatCurrency(invoice.total, invoice.currency || 'MYR')}</span>
                </div>
            </div>
        </div>

        ${issuerInfo?.bankName ? `
        <div class="bank-section">
            <div class="bank-title">Payment Details</div>
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
            <div class="footer-text">Thank you for your business!</div>
            <div class="footer-text">This is a computer-generated invoice and does not require a signature.</div>
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
    }
  };

  // Print invoice - prints directly without opening modal
  const handlePrintInvoice = (invoice: Invoice) => {
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

  // Email invoice handler
  const handleEmailInvoice = async (invoice: Invoice) => {
    // Get issuer email for sending
    const issuerEmail = invoice.issuerInfo?.email;
    if (issuerEmail) {
      const subject = encodeURIComponent(`Regarding Invoice ${invoice.invoiceNumber}`);
      const body = encodeURIComponent(`Dear ${invoice.issuerInfo?.name || 'Sir/Madam'},\n\nI am writing regarding Invoice ${invoice.invoiceNumber}.\n\nBest regards`);
      window.open(`mailto:${issuerEmail}?subject=${subject}&body=${body}`, '_blank');
    } else {
      alert('No email address available for the issuer.');
    }
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

                    {/* Email */}
                    <LocalActionButton variant="email" onClick={() => handleEmailInvoice(invoice)} title="Email Issuer">
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
          <Modal onClick={() => setShowViewModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
              <ModalHeader>
                <ModalTitle>Invoice Details</ModalTitle>
                <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                {/* Invoice Header with Issuer Info */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #E5E7EB' }}>
                  <div>
                    {issuerInfo?.logoUrl && (
                      <img src={issuerInfo.logoUrl} alt="Company Logo" style={{ maxHeight: '60px', marginBottom: '8px' }} />
                    )}
                    <div style={{ fontSize: issuerInfo?.logoUrl ? '14px' : '20px', fontWeight: '700', color: '#0A2540', marginBottom: '8px' }}>
                      {issuerInfo?.name || selectedInvoice.issuerName || 'Issuer'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.6' }}>
                      {issuerInfo?.address && <div>{issuerInfo.address}</div>}
                      {(issuerInfo?.city || issuerInfo?.state || issuerInfo?.postalCode) && (
                        <div>{[issuerInfo?.city, issuerInfo?.state, issuerInfo?.postalCode].filter(Boolean).join(', ')}</div>
                      )}
                      {issuerInfo?.country && <div>{issuerInfo.country}</div>}
                      {issuerInfo?.phone && <div>Tel: {issuerInfo.phone}</div>}
                      {issuerInfo?.email && <div>Email: {issuerInfo.email}</div>}
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

                {/* Bill To + Dates Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Bill To</div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{payerCompany?.name || companySettings?.companyName || 'Your Company'}</div>
                    {(payerCompany?.address || companySettings?.address) && (
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{payerCompany?.address || companySettings?.address}</div>
                    )}
                    {(payerCompany?.city || payerCompany?.state || payerCompany?.postalCode || companySettings?.city) && (
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>
                        {[payerCompany?.city || companySettings?.city, payerCompany?.state || companySettings?.state, payerCompany?.postalCode || companySettings?.postalCode].filter(Boolean).join(', ')}
                      </div>
                    )}
                    {(payerCompany?.country || companySettings?.country) && (
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{payerCompany?.country || companySettings?.country}</div>
                    )}
                    {(payerCompany?.email || companySettings?.email) && (
                      <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>{payerCompany?.email || companySettings?.email}</div>
                    )}
                  </div>
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
                      {selectedInvoice.items && selectedInvoice.items.length > 0 ? (
                        selectedInvoice.items.map((item, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #F3F4F6' }}>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151' }}>{item.description}</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>{formatCurrency(item.unitPrice, selectedInvoice.currency || 'MYR')}</td>
                            <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>{formatCurrency(item.total, selectedInvoice.currency || 'MYR')}</td>
                          </tr>
                        ))
                      ) : (
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151' }}>{selectedInvoice.categoryDisplayName || selectedInvoice.planType || 'Service'}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'center' }}>1</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>{formatCurrency(selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</td>
                          <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right' }}>{formatCurrency(selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Summary */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
                  <div style={{ width: '280px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '14px', color: '#6B7280' }}>
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedInvoice.amount, selectedInvoice.currency || 'MYR')}</span>
                    </div>
                    {selectedInvoice.tax > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '14px', color: '#6B7280' }}>
                        <span>Tax:</span>
                        <span>{formatCurrency(selectedInvoice.tax, selectedInvoice.currency || 'MYR')}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontSize: '16px', fontWeight: '700', color: '#0A2540', background: '#F8FAFC', borderRadius: '6px', marginTop: '8px' }}>
                      <span>Total:</span>
                      <span>{formatCurrency(selectedInvoice.total, selectedInvoice.currency || 'MYR')}</span>
                    </div>
                  </div>
                </div>

                {/* Bank Details (from issuer) */}
                {issuerInfo?.bankName && (
                  <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>Payment Details</div>
                    <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                      <div><strong>Bank:</strong> {issuerInfo.bankName}</div>
                      <div><strong>Account Name:</strong> {issuerInfo.bankAccountName || '-'}</div>
                      <div><strong>Account Number:</strong> {issuerInfo.bankAccount || '-'}</div>
                      {issuerInfo.swiftCode && <div><strong>SWIFT Code:</strong> {issuerInfo.swiftCode}</div>}
                    </div>
                  </div>
                )}

                {/* Registration Info */}
                {(issuerInfo?.taxId || issuerInfo?.businessRegistration) && (
                  <div style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '16px' }}>
                    {issuerInfo?.businessRegistration && <span>Reg No: {issuerInfo.businessRegistration}</span>}
                    {issuerInfo?.businessRegistration && issuerInfo?.taxId && <span> | </span>}
                    {issuerInfo?.taxId && <span>Tax No: {issuerInfo.taxId}</span>}
                  </div>
                )}
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
                <Button onClick={() => handlePrintInvoice(selectedInvoice)}>
                  Print
                </Button>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          );
        })()}

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
