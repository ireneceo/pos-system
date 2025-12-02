import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { useAuth } from '../../contexts/AuthContext';
import { API_BASE_URL } from '../../config/api';
import { formatCurrency } from '../../utils/currency';

interface Invoice {
  id: string;
  invoiceNumber: string;
  restaurantId: string;
  restaurantName: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  amount: number;
  tax: number;
  total: number;
  items: InvoiceItem[];
  billingPeriod: string;
  planType: string;
  restaurantManager?: string;
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

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
  transition: all 0.2s;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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

const Amount = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.highlight ? '700' : '500'};
  color: ${props => props.highlight ? '#059669' : '#374151'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
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

// Data Table (matching StaffManagementPage)
const DataTable = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 200px;
  gap: 16px;
  padding: 16px 24px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr 200px;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #F3F4F6;
  align-items: center;
  transition: all 0.2s;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
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
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #9CA3AF;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #F3F4F6;
    color: #6B7280;
  }
`;

const ModalBody = styled.div`
  padding: 0 24px 24px 24px;
  max-height: 400px;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 24px;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
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
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [showCreateInvoiceModal, setShowCreateInvoiceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [editInvoice, setEditInvoice] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'bank_transfer',
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: '',
    receiptFile: null as File | null
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

  useEffect(() => {
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
    
    if (user) {
      fetchInvoices();
    }
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
    return new Date(dateString).toLocaleDateString('en-MY');
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
    if (window.confirm(`Send invoice ${invoice.invoiceNumber} to ${invoice.restaurantName}?`)) {
      setInvoices(invoices.map(inv => 
        inv.id === invoice.id 
          ? { ...inv, status: 'sent' as const }
          : inv
      ));
      alert(`Invoice ${invoice.invoiceNumber} has been sent to ${invoice.restaurantName}`);
    }
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
    alert('Invoice updated successfully!');
  };

  const handleSubmitInvoice = () => {
    if (!newInvoice.restaurantName || !newInvoice.amount || !newInvoice.dueDate) {
      alert('Please fill in all required fields.');
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
    alert('Invoice created successfully!');
  };

  const handlePayInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentData({
      paymentMethod: 'bank_transfer',
      transactionId: '',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: '',
      receiptFile: null
    });
    setShowPaymentModal(true);
  };

  const handleSubmitPayment = () => {
    if (!selectedInvoice) return;
    
    // 둘 중 하나는 반드시 있어야 함
    if (!paymentData.transactionId && !paymentData.receiptFile) {
      alert('Please provide either a Transaction ID/Reference Number OR upload a payment receipt.');
      return;
    }

    // 먼저 결제 모달을 닫고 확인 모달을 표시
    setShowPaymentModal(false);
    setTimeout(() => {
      setShowPaymentConfirmModal(true);
    }, 100);
  };

  const handleConfirmPayment = async () => {
    if (!selectedInvoice) return;

    try {
      // 실제 API 호출
      const response = await fetch(`${API_BASE_URL}/api/invoices/${selectedInvoice.id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method: paymentData.paymentMethod,
          transaction_id: paymentData.transactionId,
          payment_date: paymentData.paymentDate,
          notes: paymentData.notes,
          receipt_url: paymentData.receiptFile ? 'uploaded_receipt_url' : null
        })
      });

      if (response.ok) {
        await response.json();

        // 로컬 상태 업데이트
        const updatedInvoice = {
          ...selectedInvoice,
          status: 'paid' as const,
          paidDate: paymentData.paymentDate
        };

        setInvoices(invoices.map(inv => 
          inv.id === selectedInvoice.id ? updatedInvoice : inv
        ));
      } else {
        throw new Error('API call failed');
      }
      
      // 모든 모달 닫기
      setShowPaymentModal(false);
      setShowPaymentConfirmModal(false);
      setSelectedInvoice(null);
      setPaymentData({
        paymentMethod: 'bank_transfer',
        transactionId: '',
        paymentDate: new Date().toISOString().split('T')[0],
        notes: '',
        receiptFile: null
      });
      
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Error processing payment. Please try again.');
    }
  };

  const handleMarkAsOverdue = (invoice: Invoice) => {
    if (window.confirm(`Mark invoice ${invoice.invoiceNumber} as overdue?`)) {
      setInvoices(invoices.map(inv => 
        inv.id === invoice.id 
          ? { ...inv, status: 'overdue' as const }
          : inv
      ));
      alert(`Invoice ${invoice.invoiceNumber} marked as overdue`);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Restaurant Invoice Management</Title>
          <ActionSection>
            <Button variant="secondary" onClick={handleExportInvoices}>Export</Button>
            <Button variant="primary" onClick={handleCreateInvoice}>Create Invoice</Button>
          </ActionSection>
        </Header>
        <Content>

        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalInvoices}</StatValue>
            <StatLabel>Total Invoices</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{paidInvoices}</StatValue>
            <StatLabel>Paid Invoices</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{overdueInvoices}</StatValue>
            <StatLabel>Overdue Invoices</StatLabel>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{formatCurrency(totalRevenue)}</StatValue>
            <StatLabel>Total Revenue</StatLabel>
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
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
            <option value="cancelled">Cancelled</option>
          </FilterSelect>

          <FilterSelect value={filterMonth} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterMonth(e.target.value)}>
            <option value="all">All Months</option>
            <option value="2025-01">January 2025</option>
            <option value="2024-12">December 2024</option>
            <option value="2024-11">November 2024</option>
          </FilterSelect>
        </FilterBar>

        <DataTable>
          <TableHeader>
            <span>Invoice</span>
            <span>Restaurant</span>
            <span>Issue Date</span>
            <span>Due Date</span>
            <span>Status</span>
            <span>Amount</span>
            <span>Total</span>
            <span>Actions</span>
          </TableHeader>

          {filteredInvoices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No invoices found
              </div>
              <div style={{ fontSize: '14px' }}>
                Try adjusting your filters or create a new invoice
              </div>
            </div>
          ) : (
            filteredInvoices.map(invoice => (
              <TableRow key={invoice.id}>
                <InvoiceInfo>
                  <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                  <CompanyName>{invoice.planType}</CompanyName>
                </InvoiceInfo>

                <InvoiceInfo>
                  <InvoiceNumber>{invoice.restaurantName}</InvoiceNumber>
                  <CompanyName>{invoice.restaurantManager}</CompanyName>
                </InvoiceInfo>

                <div style={{ fontSize: '14px', color: '#374151' }}>
                  {formatDate(invoice.issueDate)}
                </div>

                <div style={{ fontSize: '14px', color: '#374151' }}>
                  {formatDate(invoice.dueDate)}
                </div>

                <StatusBadge status={invoice.status}>
                  {invoice.status}
                </StatusBadge>

                <Amount>{formatCurrency(invoice.amount)}</Amount>

                <Amount highlight>{formatCurrency(invoice.total)}</Amount>

                <ActionButtons>
                  <ActionButton variant="primary" onClick={() => handleViewInvoice(invoice)}>View</ActionButton>
                  {invoice.status === 'draft' && (
                    <>
                      <ActionButton onClick={() => handleEditInvoice(invoice)}>Edit</ActionButton>
                      <ActionButton onClick={() => handleSendInvoice(invoice)}>Send</ActionButton>
                    </>
                  )}
                  {invoice.status === 'sent' && (
                    <>
                      <ActionButton variant="primary" onClick={() => handlePayInvoice(invoice)}>Pay Now</ActionButton>
                      <ActionButton onClick={() => handleMarkAsOverdue(invoice)}>Mark Overdue</ActionButton>
                    </>
                  )}
                  {invoice.status === 'overdue' && (
                    <ActionButton variant="primary" onClick={() => handlePayInvoice(invoice)}>Pay Now</ActionButton>
                  )}
                  {invoice.status === 'paid' && (
                    <ActionButton onClick={() => window.print()}>Print Receipt</ActionButton>
                  )}
                </ActionButtons>
              </TableRow>
            ))
          )}
        </DataTable>

        {/* Create Invoice Modal */}
        {showCreateInvoiceModal && (
          <Modal onClick={() => setShowCreateInvoiceModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Create New Invoice</ModalTitle>
                <CloseButton onClick={() => setShowCreateInvoiceModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
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
                    <FormLabel>Restaurant Manager</FormLabel>
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
                    <FormLabel>Plan Type</FormLabel>
                    <FormSelect
                      value={newInvoice.planType}
                      onChange={(e) => setNewInvoice({...newInvoice, planType: e.target.value})}
                    >
                      <option value="Basic Plan">Basic Plan</option>
                      <option value="Professional Plan">Professional Plan</option>
                      <option value="Enterprise Plan">Enterprise Plan</option>
                    </FormSelect>
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>Description</FormLabel>
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
                      <span>RM {parseFloat(newInvoice.amount || '0').toFixed(2)}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Tax (6%):</span>
                      <span>RM {(parseFloat(newInvoice.amount || '0') * 0.06).toFixed(2)}</span>
                    </SummaryRow>
                    <SummaryRow highlight>
                      <span><strong>Total:</strong></span>
                      <span><strong>RM {(parseFloat(newInvoice.amount || '0') * 1.06).toFixed(2)}</strong></span>
                    </SummaryRow>
                  </InvoiceSummary>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowCreateInvoiceModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSubmitInvoice}
                  disabled={!newInvoice.restaurantName || !newInvoice.amount || !newInvoice.dueDate}
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
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Invoice Details - {selectedInvoice.invoiceNumber}</ModalTitle>
                <CloseButton onClick={() => setShowViewModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Invoice Number</FormLabel>
                    <div>{selectedInvoice.invoiceNumber}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Status</FormLabel>
                    <StatusBadge status={selectedInvoice.status}>
                      {selectedInvoice.status}
                    </StatusBadge>
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Restaurant</FormLabel>
                    <div>{selectedInvoice.restaurantName}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Manager</FormLabel>
                    <div>{selectedInvoice.restaurantManager}</div>
                  </FormGroup>
                </FormRow>
                <FormRow>
                  <FormGroup>
                    <FormLabel>Issue Date</FormLabel>
                    <div>{selectedInvoice.issueDate}</div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Due Date</FormLabel>
                    <div>{selectedInvoice.dueDate}</div>
                  </FormGroup>
                </FormRow>
                <FormGroup>
                  <FormLabel>Items</FormLabel>
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} style={{ padding: '8px', background: '#F8FAFC', borderRadius: '4px', marginBottom: '8px' }}>
                      {item.description} - RM {item.total.toFixed(2)}
                    </div>
                  ))}
                </FormGroup>
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>RM {selectedInvoice.amount.toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>RM {selectedInvoice.tax.toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>RM {selectedInvoice.total.toFixed(2)}</strong></span>
                  </SummaryRow>
                </InvoiceSummary>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => window.print()}>
                  Print Invoice
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Payment Confirmation Modal */}
        {showPaymentConfirmModal && selectedInvoice && (
          <Modal onClick={() => {
            setShowPaymentConfirmModal(false);
            setTimeout(() => {
              setShowPaymentModal(true);
            }, 100);
          }}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Confirm Payment</ModalTitle>
                <CloseButton onClick={() => {
                  setShowPaymentConfirmModal(false);
                  setTimeout(() => {
                    setShowPaymentModal(true);
                  }, 100);
                }}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
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
                        RM {selectedInvoice.total.toFixed(2)}
                      </span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Payment Date:</span>
                      <span>{paymentData.paymentDate}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Method:</span>
                      <span>Bank Transfer</span>
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
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => {
                  setShowPaymentConfirmModal(false);
                  setTimeout(() => {
                    setShowPaymentModal(true);
                  }, 100);
                }}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleConfirmPayment}>
                  Confirm Payment
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Payment Modal */}
        {showPaymentModal && selectedInvoice && (
          <Modal onClick={() => setShowPaymentModal(false)}>
            <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Record Payment - {selectedInvoice.invoiceNumber}</ModalTitle>
                <CloseButton onClick={() => setShowPaymentModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Invoice Details</FormLabel>
                  <InvoiceSummary>
                    <SummaryRow>
                      <span>Restaurant:</span>
                      <span>{selectedInvoice.restaurantName}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Manager:</span>
                      <span>{selectedInvoice.restaurantManager}</span>
                    </SummaryRow>
                    <SummaryRow>
                      <span>Due Date:</span>
                      <span>{formatDate(selectedInvoice.dueDate)}</span>
                    </SummaryRow>
                    <SummaryRow highlight>
                      <span><strong>Amount Due:</strong></span>
                      <span><strong>{formatCurrency(selectedInvoice.total)}</strong></span>
                    </SummaryRow>
                  </InvoiceSummary>
                </FormGroup>
                
                <FormRow>
                  <FormGroup>
                    <FormLabel>Payment Method</FormLabel>
                    <div style={{
                      padding: '12px 16px',
                      background: '#F8FAFC',
                      border: '1px solid #E6EBF1',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      Bank Transfer
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Payment Date *</FormLabel>
                    <FormInput
                      type="date"
                      value={paymentData.paymentDate}
                      onChange={(e) => setPaymentData({...paymentData, paymentDate: e.target.value})}
                      required
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </FormGroup>
                </FormRow>
                
                <div style={{ 
                  background: '#F0F9FF', 
                  border: '1px solid #0EA5E9', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  margin: '16px 0' 
                }}>
                  <p style={{ margin: '0 0 8px 0', color: '#0369A1', fontSize: '14px', fontWeight: '600' }}>
                    Bank Transfer Payment Verification
                  </p>
                  <p style={{ margin: 0, color: '#0369A1', fontSize: '13px' }}>
                    Please provide at least ONE of the following as proof of your bank transfer:
                    <br />• Transaction ID/Reference Number from your bank
                    <br />• Screenshot/Photo of the transfer receipt
                  </p>
                </div>
                
                <FormGroup>
                  <FormLabel>Transaction ID / Reference Number *</FormLabel>
                  <FormInput
                    type="text"
                    value={paymentData.transactionId}
                    onChange={(e) => setPaymentData({...paymentData, transactionId: e.target.value})}
                    placeholder="Enter transaction ID or reference number"
                  />
                  <FormHelp>Required if no receipt is uploaded</FormHelp>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Upload Receipt (Optional) *</FormLabel>
                  <FormInput
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setPaymentData({...paymentData, receiptFile: file});
                    }}
                  />
                  <FormHelp>Upload bank transfer receipt if no transaction ID is provided</FormHelp>
                  {paymentData.receiptFile && (
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '8px', 
                      background: '#F0F9FF', 
                      border: '1px solid #0EA5E9', 
                      borderRadius: '4px',
                      fontSize: '14px',
                      color: '#0369A1'
                    }}>
                      File selected: {paymentData.receiptFile.name}
                    </div>
                  )}
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Payment Notes</FormLabel>
                  <FormTextArea
                    value={paymentData.notes}
                    onChange={(e) => setPaymentData({...paymentData, notes: e.target.value})}
                    placeholder="Add any additional notes about this payment"
                    rows={3}
                  />
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleSubmitPayment}
                  disabled={!paymentData.transactionId && !paymentData.receiptFile}
                >
                  Record Payment
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
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </FormSelect>
                </FormGroup>
                <InvoiceSummary>
                  <SummaryRow>
                    <span>Subtotal:</span>
                    <span>RM {parseFloat(editInvoice.amount || 0).toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Tax (6%):</span>
                    <span>RM {parseFloat(editInvoice.tax || 0).toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow highlight>
                    <span>Total:</span>
                    <span><strong>RM {parseFloat(editInvoice.total || 0).toFixed(2)}</strong></span>
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
        </Content>
      </Container>
    </MainLayout>
  );
};

export default ManagerInvoicesPage;