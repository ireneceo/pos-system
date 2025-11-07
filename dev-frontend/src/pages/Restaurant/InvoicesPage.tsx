import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { FilterBar, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import Modal, { ModalButton, FormGroup, FormLabel, FormInput } from '../../components/UI/Modal';

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;

  @media (max-width: 768px) {
    padding: 20px;
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
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const InvoiceGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const InvoiceCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const InvoiceNumber = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'pending_payment': return '#FEF3C7';
      case 'payment_submitted': return '#DBEAFE';
      case 'paid': return '#ECFDF5';
      case 'overdue': return '#FEE2E2';
      case 'cancelled': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'pending_payment': return '#D97706';
      case 'payment_submitted': return '#1E40AF';
      case 'paid': return '#059669';
      case 'overdue': return '#DC2626';
      case 'cancelled': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const InvoiceDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div``;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  color: #0A2540;
  font-weight: 500;
`;

const AmountSection = styled.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
`;

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid #E6EBF1;
    font-weight: 600;
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'danger' ? `
    background: #DC2626;
    color: white;

    &:hover {
      background: #B91C1C;
    }
  ` : props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DropZone = styled.div<{ isDragging: boolean }>`
  border: 2px dashed ${props => props.isDragging ? '#635BFF' : '#E6EBF1'};
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  background: ${props => props.isDragging ? 'rgba(99, 91, 255, 0.05)' : '#F8FAFC'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    background: rgba(99, 91, 255, 0.03);
  }
`;

const PaymentMethodTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.active ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.active ? '#635BFF' : '#374151'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:hover {
    border-color: ${props => props.active ? '#635BFF' : '#D1D5DB'};
    background: ${props => props.active ? 'rgba(99, 91, 255, 0.1)' : '#F9FAFB'};
  }
`;

interface Invoice {
  id: string;
  invoiceNumber: string;
  planType: string;
  billingPeriod: string;
  amount: number;
  tax: number;
  total: number;
  status: 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  paidDate?: string;
}

const getStatusLabel = (status: string) => {
  switch(status) {
    case 'pending_payment': return 'Pending';
    case 'payment_submitted': return 'Verifying';
    case 'paid': return 'Paid';
    case 'overdue': return 'Overdue';
    case 'cancelled': return 'Cancelled';
    default: return status;
  }
};

const RestaurantInvoicesPage: React.FC = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [paymentNotes, setPaymentNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'receipt' | 'bank'>('receipt');
  const [bankName, setBankName] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, [user]);

  const fetchInvoices = async () => {
    console.log('🔍 fetchInvoices called, user:', user);
    console.log('🔍 user.restaurantId:', user?.restaurantId);
    console.log('🔍 user.role:', user?.role);
    console.log('🔍 user.name:', user?.name);

    if (!user?.restaurantId) {
      console.error('❌ No restaurantId found in user. User must be assigned to a restaurant.');
      console.log('❌ Current user object:', JSON.stringify(user, null, 2));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('✅ Fetching invoices for restaurant:', user.restaurantId);

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/restaurant/${user.restaurantId}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await response.json();
      console.log('📥 Invoice API response:', {
        status: response.status,
        dataLength: Array.isArray(data) ? data.length : 'not array'
      });
      console.log('📥 Raw invoice data:', data);

      if (response.ok) {
        const transformedInvoices = data.map((inv: any, index: number) => {
          console.log(`📝 Transforming invoice ${index + 1}:`, {
            id: inv.id,
            invoice_number: inv.invoice_number,
            status: inv.status,
            statusEmpty: inv.status === '',
            statusNull: inv.status === null,
            statusUndefined: inv.status === undefined
          });

          const normalizedStatus =
            !inv.status || inv.status.trim() === ''
              ? 'pending_payment'
              : inv.status.trim();

          return {
            id: inv.id.toString(),
            invoiceNumber: inv.invoice_number,
            planType: inv.plan_type || 'Subscription Plan',
            billingPeriod: `${new Date(inv.billing_period_start).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
            amount: parseFloat(inv.total_amount) - (parseFloat(inv.total_amount) * 0.06),
            tax: parseFloat(inv.total_amount) * 0.06,
            total: parseFloat(inv.total_amount),
            status: normalizedStatus,
            issueDate: new Date(inv.issued_at || inv.createdAt).toISOString().split('T')[0],
            dueDate: new Date(inv.due_date).toISOString().split('T')[0],
            paidDate: inv.paid_at ? new Date(inv.paid_at).toISOString().split('T')[0] : undefined,
          };
        });

        console.log('✅ Transformed invoices:', transformedInvoices);
        console.log(`✅ Total invoices: ${transformedInvoices.length}`);
        setInvoices(transformedInvoices);
      } else {
        console.error('❌ Failed to fetch invoices:', data);
      }
    } catch (error) {
      console.error('❌ Exception while fetching invoices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (filterStatus === 'all') return true;
    return invoice.status === filterStatus;
  });

  const handlePaymentSubmit = async () => {
    if (!selectedInvoice) {
      alert('No invoice selected');
      return;
    }

    // Validate based on payment method
    if (paymentMethod === 'receipt' && !receiptFile) {
      alert('Please upload a receipt file');
      return;
    }

    if (paymentMethod === 'bank' && (!bankName || !transactionId)) {
      alert('Please provide bank name and transaction ID');
      return;
    }

    try {
      const paymentData = {
        payment_method: 'bank_transfer',
        transaction_id: paymentMethod === 'bank' ? transactionId : `TXN-${Date.now()}`,
        payment_date: new Date().toISOString(),
        notes: paymentMethod === 'bank'
          ? `Bank: ${bankName}\nTransaction ID: ${transactionId}\n${paymentNotes}`
          : paymentNotes,
        receipt_url: receiptFile ? `receipt-${selectedInvoice.id}-${Date.now()}.pdf` : null
      };

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/invoices/${selectedInvoice.id}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(paymentData)
      });

      if (response.ok) {
        setShowPaymentModal(false);
        setReceiptFile(null);
        setPaymentNotes('');
        setBankName('');
        setTransactionId('');
        setPaymentMethod('receipt');
        setSelectedInvoice(null);
        alert('Payment submitted successfully! The invoice issuer will verify your payment within 24 hours.');
        fetchInvoices();
      } else {
        alert('Failed to submit payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment submission error:', error);
      alert('Failed to submit payment. Please try again.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setReceiptFile(file);
      } else {
        alert('Please upload an image or PDF file');
      }
    }
  };

  const handleDownloadPDF = async (invoice: Invoice) => {
    try {
      const token = localStorage.getItem('auth_token');

      // Fetch full invoice details
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      if (!response.ok) {
        alert('Failed to load invoice details');
        return;
      }

      // Fetch company settings (invoice issuer info)
      const settingsResponse = await fetch('/api/invoice-settings');
      let companySettings = null;
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json();
        companySettings = settingsData.data || settingsData;
      }

      // Generate invoice HTML
      const invoiceHTML = generateInvoiceHTML(invoice, companySettings);

      // Open in new window (no auto-print)
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
      }
    } catch (error) {
      console.error('Error downloading invoice:', error);
      alert('Failed to download invoice. Please try again.');
    }
  };

  const generateInvoiceHTML = (invoice: Invoice, companySettings: any) => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Invoice ${invoice.invoiceNumber}</title>
  <style>
    @media print {
      @page { margin: 20mm; }
      body { margin: 0; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #0A2540;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .invoice-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #635BFF;
    }
    .company-info h1 {
      margin: 0 0 10px 0;
      font-size: 28px;
      color: #635BFF;
    }
    .company-info p {
      margin: 4px 0;
      font-size: 14px;
      color: #6B7280;
    }
    .invoice-meta {
      text-align: right;
    }
    .invoice-number {
      font-size: 24px;
      font-weight: 700;
      color: #0A2540;
      margin-bottom: 10px;
    }
    .invoice-meta p {
      margin: 4px 0;
      font-size: 14px;
      color: #6B7280;
    }
    .bill-to {
      margin-bottom: 40px;
    }
    .bill-to h3 {
      margin: 0 0 12px 0;
      font-size: 14px;
      font-weight: 600;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .bill-to p {
      margin: 4px 0;
      font-size: 15px;
      color: #0A2540;
    }
    .bill-to strong {
      font-size: 16px;
      font-weight: 600;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    thead {
      background: #F8FAFC;
    }
    th {
      padding: 14px 12px;
      text-align: left;
      font-size: 12px;
      font-weight: 600;
      color: #6B7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #E6EBF1;
    }
    th:last-child, td:last-child {
      text-align: right;
    }
    td {
      padding: 16px 12px;
      font-size: 14px;
      color: #374151;
      border-bottom: 1px solid #F3F4F6;
    }
    tbody tr:hover {
      background: #F9FAFB;
    }
    .totals {
      margin-left: auto;
      width: 300px;
      margin-top: 20px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      font-size: 14px;
    }
    .totals-row.subtotal {
      color: #6B7280;
    }
    .totals-row.tax {
      color: #6B7280;
      padding-bottom: 12px;
      border-bottom: 1px solid #E6EBF1;
    }
    .totals-row.total {
      font-size: 18px;
      font-weight: 700;
      color: #0A2540;
      padding-top: 12px;
    }
    .footer {
      margin-top: 60px;
      padding-top: 20px;
      border-top: 1px solid #E6EBF1;
      text-align: center;
      font-size: 12px;
      color: #9CA3AF;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-pending {
      background: #FEF3C7;
      color: #92400E;
    }
    .status-paid {
      background: #D1FAE5;
      color: #065F46;
    }
    .status-overdue {
      background: #FEE2E2;
      color: #991B1B;
    }
    @media print {
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="invoice-header">
    <div class="company-info">
      <h1>${companySettings?.companyName || 'OrderHere Center'}</h1>
      <p>${companySettings?.address || ''}</p>
      ${companySettings?.city && companySettings?.state ? `<p>${companySettings.city}, ${companySettings.state} ${companySettings.postalCode || ''}</p>` : ''}
      ${companySettings?.phone ? `<p>Phone: ${companySettings.phone}</p>` : ''}
      <p>Email: ${companySettings?.email || 'support@orderhere.center'}</p>
      ${companySettings?.taxNumber ? `<p>Tax ID: ${companySettings.taxNumber}</p>` : ''}
    </div>
    <div class="invoice-meta">
      <div class="invoice-number">${invoice.invoiceNumber}</div>
      <p><strong>Issue Date:</strong> ${invoice.issueDate}</p>
      <p><strong>Due Date:</strong> ${invoice.dueDate}</p>
      ${invoice.paidDate ? `<p><strong>Paid Date:</strong> ${invoice.paidDate}</p>` : ''}
      <p><span class="status-badge status-${invoice.status === 'paid' ? 'paid' : invoice.status === 'overdue' ? 'overdue' : 'pending'}">
        ${invoice.status === 'pending_payment' ? 'Pending' : invoice.status === 'paid' ? 'Paid' : invoice.status === 'overdue' ? 'Overdue' : invoice.status}
      </span></p>
    </div>
  </div>

  <div class="bill-to">
    <h3>Bill To</h3>
    <p><strong>${user?.restaurantName || 'Restaurant'}</strong></p>
    <p>Plan: ${invoice.planType}</p>
    <p>Period: ${invoice.billingPeriod}</p>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="width: 100px;">Quantity</th>
        <th style="width: 120px;">Unit Price</th>
        <th style="width: 120px;">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <strong>${invoice.planType} - Monthly Subscription</strong><br>
          <span style="font-size: 12px; color: #6B7280;">Billing Period: ${invoice.billingPeriod}</span>
        </td>
        <td>1</td>
        <td>RM ${invoice.amount.toFixed(2)}</td>
        <td>RM ${invoice.amount.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div class="totals">
    <div class="totals-row subtotal">
      <span>Subtotal:</span>
      <span>RM ${invoice.amount.toFixed(2)}</span>
    </div>
    <div class="totals-row tax">
      <span>Tax (6%):</span>
      <span>RM ${invoice.tax.toFixed(2)}</span>
    </div>
    <div class="totals-row total">
      <span>Total Amount:</span>
      <span>RM ${invoice.total.toFixed(2)}</span>
    </div>
  </div>

  <div class="footer">
    <p>Thank you for your business!</p>
    <p>This is a computer-generated invoice. Generated on ${currentDate}</p>
  </div>

  <div class="no-print" style="margin-top: 40px; text-align: center;">
    <button onclick="window.print()" style="padding: 12px 24px; background: #635BFF; color: white; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
      Print Invoice
    </button>
    <button onclick="window.close()" style="padding: 12px 24px; background: white; color: #6B7280; border: 1px solid #E6EBF1; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; margin-left: 12px;">
      Close
    </button>
  </div>
</body>
</html>
    `;
  };

  const handleMarkAsPaid = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const formatCurrency = (amount: number) => `RM ${amount.toFixed(0)}`;

  const pendingCount = invoices.filter(i => i.status === 'pending_payment' || i.status === 'payment_submitted').length;
  const paidCount = invoices.filter(i => i.status === 'paid').length;
  const overdueCount = invoices.filter(i => i.status === 'overdue').length;
  const totalAmount = invoices.filter(i => i.status === 'pending_payment' || i.status === 'overdue').reduce((sum, i) => sum + i.total, 0);

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Invoices</Title>
        </Header>

        <Content>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px'}}>
            <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1', borderLeft: '4px solid #D97706'}}>
              <div style={{fontSize: '24px', fontWeight: '700', color: '#0A2540'}}>{pendingCount}</div>
              <div style={{fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Pending</div>
            </div>
            <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1', borderLeft: '4px solid #635BFF'}}>
              <div style={{fontSize: '24px', fontWeight: '700', color: '#0A2540'}}>{paidCount}</div>
              <div style={{fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Paid</div>
            </div>
            <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1', borderLeft: '4px solid #DC2626'}}>
              <div style={{fontSize: '24px', fontWeight: '700', color: '#0A2540'}}>{overdueCount}</div>
              <div style={{fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Overdue</div>
            </div>
            <div style={{background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #E6EBF1', borderLeft: '4px solid #8B5CF6'}}>
              <div style={{fontSize: '24px', fontWeight: '700', color: '#0A2540'}}>{formatCurrency(totalAmount)}</div>
              <div style={{fontSize: '13px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px'}}>Outstanding</div>
            </div>
          </div>

          <FilterBar>
          <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Invoices</option>
            <option value="pending_payment">Pending</option>
            <option value="payment_submitted">Verifying</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </FilterSelect>
        </FilterBar>

        {isLoading && (
          <div style={{textAlign: 'center', padding: '60px', color: '#6B7280'}}>Loading invoices...</div>
        )}

        {!isLoading && !user?.restaurantId && (
          <div style={{textAlign: 'center', padding: '60px'}}>
            <div style={{fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '10px'}}>
              No Restaurant Assigned
            </div>
            <div style={{fontSize: '14px', color: '#6B7280'}}>
              Your account is not assigned to a restaurant. Please contact your system administrator.
            </div>
          </div>
        )}

        {!isLoading && user?.restaurantId && filteredInvoices.length === 0 && (
          <div style={{textAlign: 'center', padding: '60px'}}>
            <div style={{fontSize: '18px', fontWeight: '600', color: '#0A2540', marginBottom: '10px'}}>
              No Invoices Found
            </div>
            <div style={{fontSize: '14px', color: '#6B7280'}}>
              Your restaurant doesn't have any invoices yet.
            </div>
          </div>
        )}

        {!isLoading && filteredInvoices.length > 0 && (
          <InvoiceGrid>
            {filteredInvoices.map(invoice => (
              <InvoiceCard key={invoice.id}>
                <InvoiceHeader>
                  <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                  <StatusBadge status={invoice.status}>{getStatusLabel(invoice.status)}</StatusBadge>
                </InvoiceHeader>

                <InvoiceDetails>
                  <DetailItem>
                    <DetailLabel>Plan</DetailLabel>
                    <DetailValue>{invoice.planType}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Billing Period</DetailLabel>
                    <DetailValue>{invoice.billingPeriod}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Issue Date</DetailLabel>
                    <DetailValue>{invoice.issueDate}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Due Date</DetailLabel>
                    <DetailValue>{invoice.dueDate}</DetailValue>
                  </DetailItem>
                  {invoice.paidDate && (
                    <DetailItem>
                      <DetailLabel>Paid Date</DetailLabel>
                      <DetailValue>{invoice.paidDate}</DetailValue>
                    </DetailItem>
                  )}
                </InvoiceDetails>

                <AmountSection>
                  <AmountRow>
                    <span>Subtotal:</span>
                    <span>{formatCurrency(invoice.amount)}</span>
                  </AmountRow>
                  <AmountRow>
                    <span>Tax (6%):</span>
                    <span>{formatCurrency(invoice.tax)}</span>
                  </AmountRow>
                  <AmountRow>
                    <span>Total:</span>
                    <span>{formatCurrency(invoice.total)}</span>
                  </AmountRow>
                </AmountSection>

                <ActionSection>
                  <Button variant="secondary" onClick={() => handleDownloadPDF(invoice)}>Invoice</Button>
                  {(invoice.status === 'pending_payment' || invoice.status === 'overdue') && (
                    <Button variant={invoice.status === 'overdue' ? 'danger' : 'primary'} onClick={() => handleMarkAsPaid(invoice)}>
                      {invoice.status === 'overdue' ? 'Pay Now' : 'Mark as Paid'}
                    </Button>
                  )}
                  {invoice.status === 'payment_submitted' && (
                    <div style={{fontSize: '13px', color: '#635BFF', fontStyle: 'italic', fontWeight: '500'}}>
                      Payment verification in progress...
                    </div>
                  )}
                </ActionSection>
              </InvoiceCard>
            ))}
          </InvoiceGrid>
        )}

        {showPaymentModal && selectedInvoice && (
          <Modal
            isOpen={showPaymentModal}
            onClose={() => {
              setShowPaymentModal(false);
              setReceiptFile(null);
              setBankName('');
              setTransactionId('');
              setPaymentMethod('receipt');
            }}
            title="Submit Payment Proof"
            size="medium"
            footer={
              <>
                <ModalButton variant="secondary" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </ModalButton>
                <ModalButton
                  variant="primary"
                  onClick={handlePaymentSubmit}
                  disabled={paymentMethod === 'receipt' ? !receiptFile : (!bankName || !transactionId)}
                >
                  Submit Payment
                </ModalButton>
              </>
            }
          >
            <div style={{background: 'rgba(99, 91, 255, 0.08)', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid rgba(99, 91, 255, 0.2)'}}>
              <h4 style={{margin: '0 0 8px 0', color: '#635BFF', fontWeight: '600'}}>Invoice: {selectedInvoice.invoiceNumber}</h4>
              <p style={{margin: '0', fontSize: '14px', color: '#0A2540', fontWeight: '500'}}>
                Total Amount: {formatCurrency(selectedInvoice.total)}
              </p>
            </div>

            <PaymentMethodTabs>
              <Tab active={paymentMethod === 'receipt'} onClick={() => setPaymentMethod('receipt')}>
                Upload Receipt
              </Tab>
              <Tab active={paymentMethod === 'bank'} onClick={() => setPaymentMethod('bank')}>
                Bank Transfer Info
              </Tab>
            </PaymentMethodTabs>

            {paymentMethod === 'receipt' ? (
              <>
                <FormGroup>
                  <FormLabel>Payment Receipt *</FormLabel>
                  <DropZone
                    isDragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input')?.click()}
                  >
                    {receiptFile ? (
                      <div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#635BFF', marginBottom: '4px'}}>
                          {receiptFile.name}
                        </div>
                        <div style={{fontSize: '12px', color: '#6B7280'}}>
                          {(receiptFile.size / 1024).toFixed(2)} KB
                        </div>
                        <div style={{fontSize: '12px', color: '#635BFF', marginTop: '8px', cursor: 'pointer'}}>
                          Click or drag to replace
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{fontSize: '14px', fontWeight: '600', color: '#0A2540', marginBottom: '4px'}}>
                          Drag & drop your receipt here
                        </div>
                        <div style={{fontSize: '12px', color: '#6B7280', marginBottom: '8px'}}>
                          or click to browse files
                        </div>
                        <div style={{fontSize: '11px', color: '#9CA3AF'}}>
                          Accepted: JPG, PNG, PDF (Max 5MB)
                        </div>
                      </div>
                    )}
                  </DropZone>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                    style={{ display: 'none' }}
                  />
                </FormGroup>
              </>
            ) : (
              <>
                <FormGroup>
                  <FormLabel>Bank Name *</FormLabel>
                  <FormInput
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g., Maybank, CIMB, Public Bank..."
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Transaction ID / Reference Number *</FormLabel>
                  <FormInput
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="e.g., TXN123456789"
                  />
                </FormGroup>
              </>
            )}

            <FormGroup>
              <FormLabel>Additional Notes (optional)</FormLabel>
              <FormInput
                as="textarea"
                value={paymentNotes}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPaymentNotes(e.target.value)}
                placeholder="Add any additional payment details..."
                rows={3}
                style={{ minHeight: '80px', resize: 'vertical' }}
              />
            </FormGroup>

            <div style={{background: 'rgba(99, 91, 255, 0.08)', padding: '12px', borderRadius: '6px', fontSize: '13px', color: '#635BFF', border: '1px solid rgba(99, 91, 255, 0.2)'}}>
              Info: Your payment will be verified within 24 hours after submission.
            </div>
          </Modal>
        )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default RestaurantInvoicesPage;
