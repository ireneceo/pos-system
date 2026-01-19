import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import {
  InvoiceList,
  InvoicePaymentModal,
  PaymentConfirmModal,
  Invoice,
  PaymentSubmitData,
  PaymentSettings
} from '../../components/Invoice';
import { invoiceService, brandService } from '../../services/invoiceService';
import { useStore } from '../../contexts/StoreContext';

const Container = styled.div`
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #E5E7EB;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -2px;
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #635BFF;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E5E7EB;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #6B7280;
`;

const Content = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  overflow: hidden;
`;

const ContentHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border: none;

    &:hover {
      background: #5A51E6;
    }
  ` : `
    background: white;
    color: #374151;
    border: 1px solid #E5E7EB;

    &:hover {
      background: #F9FAFB;
    }
  `}
`;

const ContentBody = styled.div`
  padding: 0;
`;

const BrandInvoicesPage: React.FC = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState<'issued' | 'to_pay'>('issued');
  const [issuedInvoices, setIssuedInvoices] = useState<Invoice[]>([]);
  const [invoicesToPay, setInvoicesToPay] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings | undefined>();

  // Modal states
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Brand ID - 실제로는 user context나 API에서 가져와야 함
  const brandId = user?.brand_id?.toString() || '1';

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch invoices issued by this brand
      const issued = await invoiceService.getIssuedInvoices('brand', brandId);
      setIssuedInvoices(issued);

      // Fetch invoices this brand needs to pay
      const toPay = await invoiceService.getInvoicesToPay();
      setInvoicesToPay(toPay);

      // Fetch payment settings
      const settings = await brandService.getPaymentSettings(brandId);
      setPaymentSettings(settings.payment_settings);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  }, [brandId]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Stats calculations
  const issuedStats = {
    total: issuedInvoices.length,
    pending: issuedInvoices.filter(i => i.status === 'pending_payment').length,
    submitted: issuedInvoices.filter(i => i.status === 'payment_submitted').length,
    paid: issuedInvoices.filter(i => i.status === 'paid').length
  };

  const toPayStats = {
    total: invoicesToPay.length,
    pending: invoicesToPay.filter(i => i.status === 'pending_payment' || i.status === 'overdue').length,
    submitted: invoicesToPay.filter(i => i.status === 'payment_submitted').length,
    paid: invoicesToPay.filter(i => i.status === 'paid').length
  };

  // Handlers
  const handleViewDetails = (invoice: Invoice) => {
    // TODO: Open details modal or navigate to detail page
    console.log('View details:', invoice);
  };

  const handleSendInvoice = async (invoice: Invoice) => {
    if (window.confirm('Send this invoice to the recipient?')) {
      try {
        await invoiceService.updateInvoiceStatus(invoice.id, 'pending_payment');
        fetchInvoices();
      } catch (error) {
        console.error('Error sending invoice:', error);
        alert('Failed to send invoice');
      }
    }
  };

  const handleConfirmPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setConfirmModalOpen(true);
  };

  const handleSubmitPayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setPaymentModalOpen(true);
  };

  const handleDeleteInvoice = async (invoice: Invoice) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoiceService.deleteInvoice(invoice.id);
        fetchInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Failed to delete invoice');
      }
    }
  };

  const handleCancelInvoice = async (invoice: Invoice) => {
    if (window.confirm('Are you sure you want to cancel this invoice?')) {
      try {
        await invoiceService.updateInvoiceStatus(invoice.id, 'cancelled');
        fetchInvoices();
      } catch (error) {
        console.error('Error cancelling invoice:', error);
        alert('Failed to cancel invoice');
      }
    }
  };

  const handlePaymentSubmit = async (data: PaymentSubmitData) => {
    await invoiceService.submitPayment(data);
    fetchInvoices();
  };

  const handlePaymentConfirm = async (notes?: string) => {
    if (selectedInvoice) {
      await invoiceService.confirmPayment(selectedInvoice.id, notes);
      fetchInvoices();
    }
  };

  const handlePaymentReject = async (reason: string) => {
    if (selectedInvoice) {
      await invoiceService.rejectPayment(selectedInvoice.id, reason);
      fetchInvoices();
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Invoice Management</Title>
        </Header>

        <TabContainer>
          <Tab active={activeTab === 'issued'} onClick={() => setActiveTab('issued')}>
            Invoices Issued ({issuedStats.total})
          </Tab>
          <Tab active={activeTab === 'to_pay'} onClick={() => setActiveTab('to_pay')}>
            Invoices to Pay ({toPayStats.pending})
          </Tab>
        </TabContainer>

        {activeTab === 'issued' ? (
          <>
            <StatsGrid>
              <StatCard>
                <StatValue>{issuedStats.total}</StatValue>
                <StatLabel>Total Issued</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue style={{ color: '#D97706' }}>{issuedStats.pending}</StatValue>
                <StatLabel>Pending Payment</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue style={{ color: '#2563EB' }}>{issuedStats.submitted}</StatValue>
                <StatLabel>Payment Submitted</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue style={{ color: '#059669' }}>{issuedStats.paid}</StatValue>
                <StatLabel>Paid</StatLabel>
              </StatCard>
            </StatsGrid>

            <Content>
              <ContentHeader>
                <ContentTitle>Invoices Issued to Restaurants</ContentTitle>
                <Button variant="primary">Create Invoice</Button>
              </ContentHeader>
              <ContentBody>
                <InvoiceList
                  mode="issuer"
                  invoices={issuedInvoices}
                  loading={loading}
                  onViewDetails={handleViewDetails}
                  onSendInvoice={handleSendInvoice}
                  onConfirmPayment={handleConfirmPayment}
                  onDeleteInvoice={handleDeleteInvoice}
                  onCancelInvoice={handleCancelInvoice}
                />
              </ContentBody>
            </Content>
          </>
        ) : (
          <>
            <StatsGrid>
              <StatCard>
                <StatValue>{toPayStats.total}</StatValue>
                <StatLabel>Total Received</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue style={{ color: '#DC2626' }}>{toPayStats.pending}</StatValue>
                <StatLabel>To Pay</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue style={{ color: '#2563EB' }}>{toPayStats.submitted}</StatValue>
                <StatLabel>Payment Submitted</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue style={{ color: '#059669' }}>{toPayStats.paid}</StatValue>
                <StatLabel>Paid</StatLabel>
              </StatCard>
            </StatsGrid>

            <Content>
              <ContentHeader>
                <ContentTitle>Invoices from System Admin</ContentTitle>
              </ContentHeader>
              <ContentBody>
                <InvoiceList
                  mode="payer"
                  invoices={invoicesToPay}
                  loading={loading}
                  onViewDetails={handleViewDetails}
                  onSubmitPayment={handleSubmitPayment}
                />
              </ContentBody>
            </Content>
          </>
        )}

        {/* Payment Modal */}
        <InvoicePaymentModal
          isOpen={paymentModalOpen}
          invoice={selectedInvoice}
          onClose={() => {
            setPaymentModalOpen(false);
            setSelectedInvoice(null);
          }}
          onSubmit={handlePaymentSubmit}
          paymentSettings={paymentSettings}
        />

        {/* Confirm Payment Modal */}
        <PaymentConfirmModal
          isOpen={confirmModalOpen}
          invoice={selectedInvoice}
          onClose={() => {
            setConfirmModalOpen(false);
            setSelectedInvoice(null);
          }}
          onConfirm={handlePaymentConfirm}
          onReject={handlePaymentReject}
        />
      </Container>
    </MainLayout>
  );
};

export default BrandInvoicesPage;
