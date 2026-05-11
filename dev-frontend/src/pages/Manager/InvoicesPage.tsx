import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../config/api';
import { formatCurrency } from '../../utils/currency';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import ConfirmModal from '../../components/ConfirmModal';
import DateField from '../../components/Common/DateField';
import { useTranslation } from 'react-i18next';
import { getAuthToken } from '../../utils/auth';
import { formatDate as formatDateTz } from '../../utils/timezone';
import {
  DataTableContainer,
  DataTable,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
  DataTableCell,
  DataTableActions,
  DataTableEmpty,
  DataTableAmount
, Modal as CommonModal, StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  publishableKey?: string;
  clientId?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrImage?: string;
  qrDescription?: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  restaurantId: string;
  restaurantName: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'draft' | 'sent' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled';
  currency?: string;
  amount: number;
  tax: number;
  total: number;
  items: InvoiceItem[];
  billingPeriod: string;
  planType: string;
  restaurantManager?: string;
  paymentMethod?: string;
  hasPaymentInfo?: boolean;
  issuerType?: 'system_admin' | 'brand' | 'foodcourt';
  issuerId?: number | string;
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

const Container = styled.div`
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 0;
  }
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

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : props.variant === 'success' ? `
    background: #10B981;
    color: white;

    &:hover {
      background: #059669;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
  ` : `
    background: white;
    color: #6B7280;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}
`;


// Filter Bar (matching StaffManagementPage)
const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

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

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'paid': return '#ECFDF5';
      case 'sent': return '#DBEAFE';
      case 'draft': return '#F3F4F6';
      case 'overdue': return '#FEE2E2';
      case 'cancelled': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'paid': return '#059669';
      case 'sent': return '#1E40AF';
      case 'draft': return '#6B7280';
      case 'overdue': return '#DC2626';
      case 'cancelled': return '#DC2626';
      default: return '#6B7280';
    }
  }};
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'success' | 'danger' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

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
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    
    &:hover {
      background: #F8FAFC;
      color: #0A2540;
    }
  `}
`;

// 로컬 액션 버튼 그룹 (공통 DataTableActions와 동일 스타일)
const LocalActionButtons = styled(DataTableActions)`
  max-width: 160px;

  @media (max-width: 1024px) {
    max-width: none;
  }
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

const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormHelp = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
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

const ManagerInvoicesPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editInvoice, setEditInvoice] = useState<any>(null);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState<PaymentMethod[]>([]);
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: '',
    receiptImage: ''
  });
  const [newInvoice, setNewInvoice] = useState({
    restaurantId: '',
    restaurantName: '',
    restaurantManager: '',
    amount: '',
    description: '',
    dueDate: '',
    planType: 'professional'
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<Invoice | null>(null);
  const [confirmType, setConfirmType] = useState<string>('');
  const [inlineWarning, setInlineWarning] = useState<string>('');

  const fetchInvoices = async () => {
    try {
      // 실제 API 호출 - 현재 로그인한 매니저 ID 사용
      const managerId = user?.managerId || user?.id || '2';
      const response = await fetch(`${API_BASE_URL}/api/invoices/manager/${managerId}`);
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        console.error('Failed to fetch invoices from API');
        setInvoices([]);
      }
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
      setInvoices([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchInvoices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.restaurantManager?.toLowerCase().includes(searchTerm.toLowerCase() || '');
    const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
    const matchesMonth = filterMonth === 'all' || invoice.issueDate.includes(filterMonth);
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.status === 'paid').length;
  const overdueInvoices = invoices.filter(i => i.status === 'overdue').length;
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

  const formatDate = (dateString: string) => {
    return formatDateTz(dateString, null);
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
        sent: invoices.filter(inv => inv.status === 'sent').length,
        paid: invoices.filter(inv => inv.status === 'paid').length,
        overdue: invoices.filter(inv => inv.status === 'overdue').length,
        cancelled: invoices.filter(inv => inv.status === 'cancelled').length
      },
      invoices: invoices.map(invoice => ({
        invoiceNumber: invoice.invoiceNumber,
        restaurantName: invoice.restaurantName,
        restaurantManager: invoice.restaurantManager,
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
    link.download = `restaurant-invoices-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCreateInvoice = () => {
    setShowCreateInvoiceModal(true);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setEditInvoice({
      amount: invoice.amount.toString(),
      tax: invoice.tax.toString(),
      total: invoice.total.toString(),
      dueDate: invoice.dueDate,
      status: invoice.status,
      items: invoice.items
    });
    setShowEditModal(true);
  };

  const handleSendInvoice = (invoice: Invoice) => {
    setConfirmTarget(invoice);
    setConfirmType('send');
    setShowConfirmDialog(true);
  };

  const handleMarkAsOverdueClick = (invoice: Invoice) => {
    setConfirmTarget(invoice);
    setConfirmType('overdue');
    setShowConfirmDialog(true);
  };

  const executeConfirmAction = () => {
    if (!confirmTarget) return;
    setShowConfirmDialog(false);

    if (confirmType === 'send') {
      setInvoices(invoices.map(inv =>
        inv.id === confirmTarget.id
          ? { ...inv, status: 'sent' as const }
          : inv
      ));
    } else if (confirmType === 'overdue') {
      setInvoices(invoices.map(inv =>
        inv.id === confirmTarget.id
          ? { ...inv, status: 'overdue' as const }
          : inv
      ));
    }

    setConfirmTarget(null);
    setConfirmType('');
  };

  const handleSaveEdit = () => {
    if (!selectedInvoice || !editInvoice) return;

    const updatedInvoice = {
      ...selectedInvoice,
      amount: parseFloat(editInvoice.amount),
      tax: parseFloat(editInvoice.tax),
      total: parseFloat(editInvoice.total),
      dueDate: editInvoice.dueDate,
      status: editInvoice.status,
      items: editInvoice.items
    };

    setInvoices(invoices.map(inv => 
      inv.id === selectedInvoice.id ? updatedInvoice : inv
    ));
    
    setShowEditModal(false);
    setSelectedInvoice(null);
    setEditInvoice(null);
  };

  const handleSubmitInvoice = () => {
    if (!newInvoice.restaurantName || !newInvoice.amount || !newInvoice.dueDate) {
      setInlineWarning('Please fill in all required fields.');
      return;
    }

    const invoiceNumber = `INV-${new Date().getFullYear()}-M${String(invoices.length + 1).padStart(3, '0')}`;
    const amount = parseFloat(newInvoice.amount);
    const tax = amount * 0.06; // 6% tax
    const total = amount + tax;

    const newInvoiceRecord: Invoice = {
      id: `invoice-${Date.now()}`,
      invoiceNumber,
      restaurantId: newInvoice.restaurantId || `rest-${Date.now()}`,
      restaurantName: newInvoice.restaurantName,
      restaurantManager: newInvoice.restaurantManager,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate,
      status: 'draft',
      amount,
      tax,
      total,
      items: [{
        description: newInvoice.description || `${newInvoice.planType} Subscription`,
        quantity: 1,
        unitPrice: amount,
        total: amount
      }],
      billingPeriod: new Date().toISOString().slice(0, 7),
      planType: newInvoice.planType
    };

    setInvoices([newInvoiceRecord, ...invoices]);
    setShowCreateInvoiceModal(false);
    setNewInvoice({
      restaurantId: '',
      restaurantName: '',
      restaurantManager: '',
      amount: '',
      description: '',
      dueDate: '',
      planType: 'professional'
    });
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
        fetchInvoices();
      }
    } catch (error) {
      console.error('Failed to confirm free invoice:', error);
    }
  };

  const handlePayInvoice = async (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({
      paymentMethod: '',
      transactionId: '',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: '',
      receiptImage: ''
    });
    setInlineWarning('');
    await fetchPaymentMethods(invoice.currency || 'MYR', invoice.issuerType, invoice.issuerId);
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = () => {
    if (!selectedInvoice) return;

    if (!paymentData.paymentMethod) {
      setInlineWarning('Please select a payment method.');
      return;
    }

    // For non-online methods, require transaction ID or receipt
    if (paymentData.paymentMethod !== 'stripe' && paymentData.paymentMethod !== 'paypal') {
      if (!paymentData.transactionId && !paymentData.receiptImage) {
        setInlineWarning('Please provide either a Transaction ID/Reference Number OR upload a payment receipt.');
        return;
      }
    }

    setShowPaymentModal(false);
    setTimeout(() => {
      setShowPaymentConfirmModal(true);
    }, 100);
  };

  const handleConfirmPayment = async () => {
    if (!selectedInvoice) return;

    try {
      const token = getAuthToken();
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/submit-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: paymentData.paymentMethod,
          transaction_id: paymentData.transactionId,
          notes: paymentData.notes,
          receipt_url: paymentData.receiptImage || null
        })
      });

      if (response.ok) {
        // Refresh invoices from API
        const managerId = user?.managerId || user?.id || '2';
        const refreshResponse = await fetch(`${API_BASE_URL}/api/invoices/manager/${managerId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setInvoices(data);
        }
      } else {
        const errorData = await response.json();
        setInlineWarning(errorData.error || errorData.message || 'Failed to submit payment');
        return;
      }

      // 모든 모달 닫기
      setShowPaymentModal(false);
      setShowPaymentConfirmModal(false);
      setSelectedInvoice(null);
      setPaymentData({
        paymentMethod: '',
        transactionId: '',
        paymentDate: new Date().toISOString().split('T')[0],
        notes: '',
        receiptImage: ''
      });

    } catch (error) {
      console.error('Payment processing error:', error);
      setInlineWarning('Error processing payment. Please try again.');
    }
  };

  const handleMarkAsOverdue = (invoice: Invoice) => {
    handleMarkAsOverdueClick(invoice);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:invoicesPage.restaurantInvoiceManagement')}</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportInvoices}>{t('admin:invoicesPage.export')}</Button>
            <Button variant="primary" onClick={handleCreateInvoice}>{t('admin:invoicesPage.createInvoice')}</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalInvoices}</StatValue>
            <StatLabel>{t('admin:invoicesPage.totalInvoices')}</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{paidInvoices}</StatValue>
            <StatLabel>{t('admin:invoicesPage.paidInvoices')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{overdueInvoices}</StatValue>
            <StatLabel>{t('admin:invoicesPage.overdueInvoices')}</StatLabel>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatCurrency(totalRevenue)}</StatValue>
            <StatLabel>{t('admin:invoicesPage.totalRevenue')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search by invoice number, restaurant, or plan type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterSelect value={filterStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterStatus(e.target.value)}>
            <option value="all">{t('admin:invoicesPage.allStatus')}</option>
            <option value="draft">{t('admin:invoicesPage.draft')}</option>
            <option value="sent">{t('admin:invoicesPage.sent')}</option>
            <option value="paid">{t('admin:invoicesPage.paid')}</option>
            <option value="overdue">{t('admin:invoicesPage.overdue')}</option>
            <option value="cancelled">{t('admin:invoicesPage.cancelled')}</option>
          </FilterSelect>

          <FilterSelect value={filterMonth} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterMonth(e.target.value)}>
            <option value="all">{t('admin:invoicesPage.allMonths')}</option>
            <option value="2025-01">{t('admin:invoicesPage.january2025')}</option>
            <option value="2024-12">{t('admin:invoicesPage.december2024')}</option>
            <option value="2024-11">{t('admin:invoicesPage.november2024')}</option>
          </FilterSelect>
        </FilterBar>

        <DataTableContainer>
          {filteredInvoices.length === 0 ? (
            <DataTableEmpty>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No invoices found
              </div>
              <div style={{ fontSize: '14px' }}>
                Try adjusting your filters or create a new invoice
              </div>
            </DataTableEmpty>
          ) : (
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('admin:invoicesPage.invoice')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:invoicesPage.restaurant')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="center">{t('admin:invoicesPage.issueDate')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="center">{t('admin:invoicesPage.dueDate')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="center">{t('admin:invoicesPage.status')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:invoicesPage.amount')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('admin:invoicesPage.total')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('admin:invoicesPage.actions')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {filteredInvoices.map(invoice => (
                  <DataTableRow key={invoice.id}>
                    <DataTableCell data-label="Invoice" align="left">
                      <InvoiceInfo>
                        <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                        <CompanyName>{invoice.planType}</CompanyName>
                      </InvoiceInfo>
                    </DataTableCell>

                    <DataTableCell data-label="Restaurant" align="left">
                      <InvoiceInfo>
                        <InvoiceNumber>{invoice.restaurantName}</InvoiceNumber>
                        <CompanyName>{invoice.restaurantManager}</CompanyName>
                      </InvoiceInfo>
                    </DataTableCell>

                    <DataTableCell data-label="Issue Date" align="center">
                      {formatDate(invoice.issueDate)}
                    </DataTableCell>

                    <DataTableCell data-label="Due Date" align="center">
                      {formatDate(invoice.dueDate)}
                    </DataTableCell>

                    <DataTableCell data-label="Status" align="center">
                      <StatusBadge status={invoice.status}>
                        {invoice.status}
                      </StatusBadge>
                    </DataTableCell>

                    <DataTableCell data-label="Amount" align="right">
                      <DataTableAmount>{formatCurrency(invoice.amount)}</DataTableAmount>
                    </DataTableCell>

                    <DataTableCell data-label="Total" align="right">
                      <DataTableAmount highlight>{Number(invoice.total) === 0 ? <span style={{ color: '#10B981', fontWeight: 600 }}>{t('admin:invoicesPage.free')}</span> : formatCurrency(invoice.total)}</DataTableAmount>
                    </DataTableCell>

                    <DataTableCell data-label="" mobileFullWidth>
                      <LocalActionButtons>
                        <ActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>{t('admin:invoicesPage.view')}</ActionButton>
                        {invoice.status === 'draft' && (
                          <>
                            <ActionButton onClick={() => handleEditInvoice(invoice)}>{t('admin:invoicesPage.edit')}</ActionButton>
                            <ActionButton onClick={() => handleSendInvoice(invoice)}>{t('admin:invoicesPage.send')}</ActionButton>
                          </>
                        )}
                        {(invoice.status === 'sent' || invoice.status === 'pending_payment' || invoice.status === 'overdue') && (
                          <>
                            {Number(invoice.total) > 0 && <ActionButton variant="success" onClick={() => handlePayInvoice(invoice)}>{t('admin:invoicesPage.payNow')}</ActionButton>}
                            {Number(invoice.total) === 0 && <ActionButton variant="success" onClick={() => handleConfirmFreeInvoice(invoice)}>{t('admin:invoicesPage.confirm')}</ActionButton>}
                            {invoice.status === 'sent' && <ActionButton onClick={() => handleMarkAsOverdue(invoice)}>{t('admin:invoicesPage.markOverdue')}</ActionButton>}
                          </>
                        )}
                        {invoice.status === 'paid' && (
                          <ActionButton onClick={() => window.print()}>{t('admin:invoicesPage.printReceipt')}</ActionButton>
                        )}
                      </LocalActionButtons>
                    </DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          )}
        </DataTableContainer>

        {/* Create Invoice Modal */}
        {showCreateInvoiceModal && (
                    <CommonModal isOpen={true} onClose={() => setShowCreateInvoiceModal(false)} title="Create New Invoice" footer={<><Button variant="secondary" onClick={() => setShowCreateInvoiceModal(false)}> Cancel </Button><Button variant="primary" onClick={handleSubmitInvoice} disabled={!newInvoice.restaurantName || !newInvoice.amount || !newInvoice.dueDate} > Create Invoice </Button></>}>

                <FormRow>
                  <FormGroup>
                    <FormLabel>Restaurant Name *</FormLabel>
                    <FormInput
                      type="text"
                      value={newInvoice.restaurantName}
                      onChange={(e) => setNewInvoice({...newInvoice, restaurantName: e.target.value})}
                      placeholder="Enter restaurant name"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.restaurantManager')}</FormLabel>
                    <FormInput
                      type="text"
                      value={newInvoice.restaurantManager}
                      onChange={(e) => setNewInvoice({...newInvoice, restaurantManager: e.target.value})}
                      placeholder="Enter manager name"
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Amount (RM) *</FormLabel>
                    <FormInput
                      type="number"
                      step="0.01"
                      min="0"
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                      placeholder="0.00"
                      required
                    />
                    <FormHelp>Tax (6%) will be calculated automatically</FormHelp>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Due Date *</FormLabel>
                    <DateField
                      value={newInvoice.dueDate}
                      onChange={(v) => setNewInvoice({...newInvoice, dueDate: v})}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.planType')}</FormLabel>
                    <FormSelect
                      value={newInvoice.planType}
                      onChange={(e) => setNewInvoice({...newInvoice, planType: e.target.value})}
                    >
                      <option value="Basic Plan">{t('admin:invoicesPage.basicPlan')}</option>
                      <option value="Professional Plan">{t('admin:invoicesPage.professionalPlan')}</option>
                      <option value="Enterprise Plan">{t('admin:invoicesPage.enterprisePlan')}</option>
                    </FormSelect>
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>{t('admin:invoicesPage.description')}</FormLabel>
                  <FormTextArea
                    value={newInvoice.description}
                    onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                    placeholder="Enter invoice description (optional)"
                    rows={3}
                  />
                </FormGroup>
                {newInvoice.amount && (
                  <InvoiceSummary>
                    <SummaryRow>
                      <span>Subtotal:</span>
                      <span>{formatCurrency(parseFloat(newInvoice.amount || '0'), selectedCurrency)}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Tax (6%):</span>
                      <span>{formatCurrency(parseFloat(newInvoice.amount || '0') * 0.06, selectedCurrency)}</span>
                    </SummaryRow>
                    <SummaryRow highlight>
                      <span><strong>Total:</strong></span>
                      <span><strong>{formatCurrency(parseFloat(newInvoice.amount || '0') * 1.06, selectedCurrency)}</strong></span>
                    </SummaryRow>
                  </InvoiceSummary>
                )}
              
          </CommonModal>
        )}

        {/* View Invoice Modal */}
        {showViewModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowViewModal(false)} title={`Invoice Details - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={() => setShowViewModal(false)}> Close </Button><Button variant="primary" onClick={() => window.print()}> Print Invoice </Button></>}>

                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.invoiceNumber')}</FormLabel>
                    <div>{selectedInvoice.invoiceNumber}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.status')}</FormLabel>
                    <StatusBadge status={selectedInvoice.status}>
                      {selectedInvoice.status}
                    </StatusBadge>
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.restaurant')}</FormLabel>
                    <div>{selectedInvoice.restaurantName}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.manager')}</FormLabel>
                    <div>{selectedInvoice.restaurantManager}</div>
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.issueDate')}</FormLabel>
                    <div>{selectedInvoice.issueDate}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.dueDate')}</FormLabel>
                    <div>{selectedInvoice.dueDate}</div>
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>{t('admin:invoicesPage.items')}</FormLabel>
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} style={{ padding: '8px', background: '#F8FAFC', borderRadius: '4px', marginBottom: '8px' }}>
                      {item.description} - {formatCurrency(item.total, selectedCurrency)}
                    </div>
                  ))}
                </FormGroup>
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(selectedInvoice.subtotalBeforeDiscount || selectedInvoice.amount, selectedCurrency)}</span>
                  </SummaryRow>
                  {selectedInvoice.discountAmount && selectedInvoice.discountAmount > 0 && (
                    <SummaryRow>
                      <span style={{ color: '#059669' }}>
                        Discount{selectedInvoice.discountType === 'percentage' ? ` (${selectedInvoice.discountValue}%)` : ''}:
                      </span>
                      <span style={{ color: '#059669' }}>-{formatCurrency(selectedInvoice.discountAmount, selectedCurrency)}</span>
                    </SummaryRow>
                  )}
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(selectedInvoice.tax, selectedCurrency)}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{formatCurrency(selectedInvoice.total, selectedCurrency)}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>
              
          </CommonModal>
        )}

        {/* Payment Confirmation Modal */}
        {showPaymentConfirmModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => { setShowPaymentConfirmModal(false); setTimeout(() => { setShowPaymentModal(true); }, 100); }} title="Confirm Payment" footer={<><Button variant="secondary" onClick={() => { setShowPaymentConfirmModal(false); setTimeout(() => { setShowPaymentModal(true); }, 100); }}> Cancel </Button><Button variant="primary" onClick={handleConfirmPayment}> Confirm Payment </Button></>}>

                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#0A2540',
                    marginBottom: '8px',
                    margin: 0
                  }}>
                    Confirm Payment
                  </h3>
                  <p style={{ 
                    fontSize: '14px', 
                    color: '#6B7280', 
                    marginBottom: '24px',
                    margin: '8px 0 24px 0' 
                  }}>
                    Are you sure you want to process this payment?
                  </p>
                  
                  <InvoiceSummary>
                    <SummaryRow>
                      <span>Invoice:</span>
                      <span><strong>{selectedInvoice.invoiceNumber}</strong></span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Restaurant:</span>
                      <span>{selectedInvoice.restaurantName}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Payment Amount:</span>
                      <span style={{ color: '#059669', fontWeight: '600' }}>
                        {formatCurrency(selectedInvoice.total, selectedCurrency)}
                      </span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Payment Date:</span>
                      <span>{paymentData.paymentDate}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Method:</span>
                      <span>{availablePaymentMethods.find(m => m.id === paymentData.paymentMethod)?.name || paymentData.paymentMethod}</span>
                    </SummaryRow>
                  </InvoiceSummary>
                  
                  <div style={{
                    background: '#F0F9FF',
                    border: '1px solid #0EA5E9',
                    borderRadius: '8px',
                    padding: '12px',
                    marginTop: '16px',
                    fontSize: '13px',
                    color: '#0369A1'
                  }}>
                    Warning: This action will mark the invoice as PAID and cannot be easily undone.
                  </div>
                </div>
              
          </CommonModal>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowPaymentModal(false)} title={`Submit Payment - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={() => setShowPaymentModal(false)}> Cancel </Button><Button variant="success" onClick={handleSubmitPayment} disabled={!paymentData.paymentMethod || availablePaymentMethods.length === 0} > Submit Payment </Button></>}>

                <FormGroup>
                  <FormLabel>{t('admin:invoicesPage.invoiceDetails')}</FormLabel>
                  <InvoiceSummary>
                    <SummaryRow>
                      <span>Restaurant:</span>
                      <span>{selectedInvoice.restaurantName}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Due Date:</span>
                      <span>{formatDate(selectedInvoice.dueDate)}</span>
                    </SummaryRow>
                    <SummaryRow highlight>
                      <span><strong>Amount Due:</strong></span>
                      <span><strong>{formatCurrency(selectedInvoice.total, selectedInvoice.currency)}</strong></span>
                    </SummaryRow>
                  </InvoiceSummary>
                </FormGroup>

                <FormGroup>
                  <FormLabel>{t('admin:invoicesPage.paymentMethod')}</FormLabel>
                  {loadingPaymentMethods ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>{t('admin:invoicesPage.loadingPaymentMethods')}</div>
                  ) : availablePaymentMethods.length === 0 ? (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#EF4444', fontSize: '14px', background: '#FEF2F2', borderRadius: '8px' }}>
                      No payment methods configured by the invoice issuer.
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                      {availablePaymentMethods.map(method => {
                        const isSelected = paymentData.paymentMethod === method.id;
                        return (
                          <div key={method.id}
                            onClick={() => { setPaymentData(prev => ({ ...prev, paymentMethod: method.id })); setInlineWarning(''); }}
                            style={{
                              padding: '12px 8px', border: `1px solid ${isSelected ? '#635BFF' : '#E6EBF1'}`,
                              borderRadius: '8px', cursor: 'pointer', textAlign: 'center',
                              background: isSelected ? 'rgba(99,91,255,0.1)' : 'white',
                              transition: 'all 0.15s'
                            }}>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: isSelected ? '#635BFF' : '#374151' }}>{method.name}</div>
                            <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>{method.description}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FormGroup>

                {paymentData.paymentMethod === 'bank_transfer' && (() => {
                  const m = availablePaymentMethods.find(m => m.id === 'bank_transfer');
                  return m ? (
                    <div style={{ background: '#F0F9FF', border: '1px solid #0EA5E9', borderRadius: '8px', padding: '12px', margin: '8px 0' }}>
                      <p style={{ margin: 0, fontSize: '13px', color: '#0369A1' }}>
                        <strong>Bank:</strong> {m.bankName}<br/>
                        <strong>Account:</strong> {m.accountNumber}<br/>
                        <strong>Name:</strong> {m.accountName}
                      </p>
                    </div>
                  ) : null;
                })()}

                {paymentData.paymentMethod === 'qr_payment' && (() => {
                  const m = availablePaymentMethods.find(m => m.id === 'qr_payment');
                  return m ? (
                    <div style={{ textAlign: 'center', margin: '8px 0' }}>
                      <img src={m.qrImage} alt="QR Payment" style={{ maxWidth: '200px', borderRadius: '8px' }} />
                      {m.qrDescription && <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{m.qrDescription}</p>}
                    </div>
                  ) : null;
                })()}

                {paymentData.paymentMethod && paymentData.paymentMethod !== 'stripe' && paymentData.paymentMethod !== 'paypal' && (
                  <>
                    <FormGroup>
                      <FormLabel>{t('admin:invoicesPage.transactionIdReferenceNumber')}</FormLabel>
                      <FormInput
                        type="text"
                        value={paymentData.transactionId}
                        onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
                        placeholder="Enter transaction ID or reference number"
                      />
                    </FormGroup>

                    <FormGroup>
                      <FormLabel>{t('admin:invoicesPage.notesOptional')}</FormLabel>
                      <textarea
                        placeholder="Any additional information about the payment..."
                        value={paymentData.notes}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                        style={{ width: '100%', boxSizing: 'border-box', padding: '8px 12px', border: '1px solid #E6EBF1', borderRadius: '6px', fontSize: '14px', minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('admin:invoicesPage.paymentReceiptImage')}</FormLabel>
                      <div style={{ border: '2px dashed #E6EBF1', borderRadius: '8px', padding: '20px', textAlign: 'center', background: paymentData.receiptImage ? '#F0FDF4' : '#FAFBFC', cursor: 'pointer', position: 'relative' }}>
                        {paymentData.receiptImage ? (
                          <div>
                            <img src={paymentData.receiptImage} alt="Payment Receipt" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '12px' }} />
                            <div>
                              <button type="button" onClick={() => setPaymentData(prev => ({ ...prev, receiptImage: '' }))} style={{ background: '#EF4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>{t('admin:invoicesPage.removeImage')}</button>
                            </div>
                          </div>
                        ) : (
                          <label style={{ cursor: 'pointer', display: 'block' }}>
                            <input type="file" accept="image/*" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file || !file.type.startsWith('image/')) return;
                              if (file.size > 10 * 1024 * 1024) return;
                              const reader = new FileReader();
                              reader.onload = (ev) => { setPaymentData(prev => ({ ...prev, receiptImage: ev.target?.result as string })); };
                              reader.readAsDataURL(file);
                            }} style={{ display: 'none' }} />
                            <div style={{ color: '#6B7280', fontSize: '14px' }}>
                              <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
                              <div>{t('admin:invoicesPage.clickToUploadPaymentReceipt')}</div>
                              <div style={{ fontSize: '12px', marginTop: '4px' }}>{t('admin:invoicesPage.supportsJpgPngMax5mb')}</div>
                            </div>
                          </label>
                        )}
                      </div>
                    </FormGroup>
                  </>
                )}

                {inlineWarning && (
                  <div style={{ padding: '10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontSize: '13px', color: '#DC2626', marginTop: '8px' }}>
                    {inlineWarning}
                  </div>
                )}
              
          </CommonModal>
        )}

        {/* Edit Invoice Modal */}
        {showEditModal && selectedInvoice && editInvoice && (
                    <CommonModal isOpen={true} onClose={() => setShowEditModal(false)} title={`Edit Invoice - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={() => setShowEditModal(false)}> Cancel </Button><Button variant="primary" onClick={handleSaveEdit}> Save Changes </Button></>}>

                <FormRow>
                  <FormGroup>
                    <FormLabel>{t('admin:invoicesPage.amountRm')}</FormLabel>
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
                    <FormLabel>{t('admin:invoicesPage.dueDate')}</FormLabel>
                    <DateField
                      value={editInvoice.dueDate}
                      onChange={(v) => setEditInvoice({...editInvoice, dueDate: v})}
                    />
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>{t('admin:invoicesPage.status')}</FormLabel>
                  <FormSelect
                    value={editInvoice.status}
                    onChange={(e) => setEditInvoice({...editInvoice, status: e.target.value})}
                  >
                    <option value="draft">{t('admin:invoicesPage.draft')}</option>
                    <option value="sent">{t('admin:invoicesPage.sent')}</option>
                    <option value="paid">{t('admin:invoicesPage.paid')}</option>
                    <option value="overdue">{t('admin:invoicesPage.overdue')}</option>
                    <option value="cancelled">{t('admin:invoicesPage.cancelled')}</option>
                  </FormSelect>
                </FormGroup>
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(parseFloat(editInvoice.amount || 0), selectedCurrency)}</span>
                  </SummaryRow>
                  {selectedInvoice && selectedInvoice.discountAmount && selectedInvoice.discountAmount > 0 && (
                    <SummaryRow>
                      <span style={{ color: '#059669' }}>
                        Discount{selectedInvoice.discountType === 'percentage' ? ` (${selectedInvoice.discountValue}%)` : ''}:
                      </span>
                      <span style={{ color: '#059669' }}>-{formatCurrency(selectedInvoice.discountAmount, selectedCurrency)}</span>
                    </SummaryRow>
                  )}
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(parseFloat(editInvoice.tax || 0), selectedCurrency)}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>{formatCurrency(parseFloat(editInvoice.total || 0), selectedCurrency)}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>
              
          </CommonModal>
        )}
        </Content>
      </Container>

      {inlineWarning && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 8,
          padding: '12px 20px', color: '#DC2626', fontSize: 14, fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 12
        }}>
          <span>{inlineWarning}</span>
          <button onClick={() => setInlineWarning('')} style={{
            background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontWeight: 700, fontSize: 16
          }}>x</button>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirmDialog}
        title={confirmType === 'send' ? 'Send Invoice' : 'Mark as Overdue'}
        message={
          confirmType === 'send'
            ? `Send invoice ${confirmTarget?.invoiceNumber} to ${confirmTarget?.restaurantName}?`
            : `Mark invoice ${confirmTarget?.invoiceNumber} as overdue?`
        }
        onConfirm={executeConfirmAction}
        onCancel={() => { setShowConfirmDialog(false); setConfirmTarget(null); setConfirmType(''); }}
        confirmText={confirmType === 'send' ? 'Send' : 'Mark Overdue'}
        cancelText="Cancel"
        type={confirmType === 'send' ? 'info' : 'warning'}
      />
    </>
  );
};

export default ManagerInvoicesPage;