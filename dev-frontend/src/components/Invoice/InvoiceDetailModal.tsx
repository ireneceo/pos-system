import React, { useRef } from 'react';
import styled from 'styled-components';
import { Invoice, STATUS_CONFIG, CURRENCY_CONFIG, CompanyInfo } from './types';

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: auto;
  padding: 40px 0;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 95%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7280;
  cursor: pointer;
  padding: 4px;
  line-height: 1;

  &:hover {
    color: #374151;
  }
`;

const InvoiceContainer = styled.div`
  padding: 32px;
  background: white;
`;

const InvoiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid #E5E7EB;
`;

const CompanySection = styled.div`
  flex: 1;
`;

const CompanyLogo = styled.img`
  max-width: 150px;
  max-height: 60px;
  object-fit: contain;
  margin-bottom: 12px;
`;

const CompanyName = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const CompanyDetail = styled.p`
  font-size: 13px;
  color: #6B7280;
  margin: 0;
  line-height: 1.6;
`;

const InvoiceInfo = styled.div`
  text-align: right;
`;

const InvoiceTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #635BFF;
  margin: 0 0 16px 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const InvoiceNumber = styled.div`
  font-size: 14px;
  color: #374151;
  margin-bottom: 4px;

  strong {
    color: #0A2540;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => STATUS_CONFIG[props.status as keyof typeof STATUS_CONFIG]?.bgColor || '#F3F4F6'};
  color: ${props => STATUS_CONFIG[props.status as keyof typeof STATUS_CONFIG]?.color || '#6B7280'};
  margin-top: 12px;
`;

const BillingSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
`;

const BillingBox = styled.div`
  background: #F8FAFC;
  border-radius: 8px;
  padding: 20px;
`;

const BillingLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const BillingName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const BillingDetail = styled.div`
  font-size: 13px;
  color: #6B7280;
  line-height: 1.6;
`;

const DatesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`;

const DateBox = styled.div`
  text-align: center;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
`;

const DateLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const DateValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const ItemsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: #0A2540;
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:first-child {
    border-radius: 8px 0 0 0;
  }

  &:last-child {
    border-radius: 0 8px 0 0;
    text-align: right;
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #F8FAFC;
  }
`;

const TableCell = styled.td`
  padding: 14px 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    text-align: right;
    font-weight: 500;
  }
`;

const SummarySection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
`;

const SummaryBox = styled.div`
  width: 300px;
`;

const SummaryRow = styled.div<{ total?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: ${props => props.total ? '18px' : '14px'};
  font-weight: ${props => props.total ? '700' : '400'};
  color: ${props => props.total ? '#0A2540' : '#6B7280'};
  border-top: ${props => props.total ? '2px solid #E5E7EB' : 'none'};
  margin-top: ${props => props.total ? '8px' : '0'};
  padding-top: ${props => props.total ? '16px' : '10px'};
`;

const BankSection = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
`;

const BankTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0369A1;
  margin-bottom: 12px;
`;

const BankGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;

const BankItem = styled.div`
  font-size: 13px;

  span {
    color: #6B7280;
  }

  strong {
    color: #0A2540;
    display: block;
    margin-top: 2px;
  }
`;

const NotesSection = styled.div`
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
`;

const NotesTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #92400E;
  margin-bottom: 8px;
`;

const NotesText = styled.div`
  font-size: 13px;
  color: #78350F;
  line-height: 1.6;
`;

const FooterSection = styled.div`
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid #E5E7EB;
  font-size: 12px;
  color: #9CA3AF;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #E5E7EB;
  background: #F9FAFB;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
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

interface InvoiceDetailModalProps {
  isOpen: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
}

const formatCurrency = (amount: number, currency: string = 'MYR'): string => {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG['MYR'];
  return `${config.symbol} ${amount.toFixed(config.decimals)}`;
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

const renderCompanyInfo = (company: CompanyInfo | undefined, defaultName: string): React.ReactNode => {
  if (!company) {
    return (
      <>
        <BillingName>{defaultName}</BillingName>
      </>
    );
  }

  return (
    <>
      <BillingName>{company.name || defaultName}</BillingName>
      <BillingDetail>
        {company.address && <>{company.address}<br /></>}
        {(company.city || company.state || company.postalCode) && (
          <>{[company.city, company.state, company.postalCode].filter(Boolean).join(', ')}<br /></>
        )}
        {company.country && <>{company.country}<br /></>}
        {company.phone && <>Tel: {company.phone}<br /></>}
        {company.email && <>Email: {company.email}<br /></>}
        {company.taxId && <>Tax ID: {company.taxId}</>}
      </BillingDetail>
    </>
  );
};

const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({
  isOpen,
  invoice,
  onClose,
  onPrint,
  onDownload
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  // Get issuer company info
  const issuerCompany = invoice.issuerCompany || {
    name: invoice.issuerName || 'System Admin',
    address: '',
    city: '',
    country: ''
  };

  // Get payer company info
  const payerCompany = invoice.payerCompany || {
    name: invoice.payerName || invoice.restaurantName || 'Customer',
    address: '',
    city: '',
    country: ''
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Invoice {invoice.invoiceNumber}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <InvoiceContainer ref={printRef}>
          {/* Header with Company Logo/Name and Invoice Info */}
          <InvoiceHeader>
            <CompanySection>
              {issuerCompany.logoUrl ? (
                <CompanyLogo src={issuerCompany.logoUrl} alt={issuerCompany.name} />
              ) : (
                <CompanyName>{issuerCompany.name}</CompanyName>
              )}
              <CompanyDetail>
                {issuerCompany.address && <>{issuerCompany.address}<br /></>}
                {(issuerCompany.city || issuerCompany.state || issuerCompany.postalCode) && (
                  <>{[issuerCompany.city, issuerCompany.state, issuerCompany.postalCode].filter(Boolean).join(', ')}<br /></>
                )}
                {issuerCompany.country && <>{issuerCompany.country}<br /></>}
                {issuerCompany.phone && <>Tel: {issuerCompany.phone}<br /></>}
                {issuerCompany.email && <>Email: {issuerCompany.email}</>}
              </CompanyDetail>
            </CompanySection>

            <InvoiceInfo>
              <InvoiceTitle>Invoice</InvoiceTitle>
              <InvoiceNumber>
                <strong>Invoice #:</strong> {invoice.invoiceNumber}
              </InvoiceNumber>
              {invoice.billingPeriod && (
                <InvoiceNumber>
                  <strong>Period:</strong> {invoice.billingPeriod}
                </InvoiceNumber>
              )}
              <StatusBadge status={invoice.status}>
                {STATUS_CONFIG[invoice.status]?.label || invoice.status}
              </StatusBadge>
            </InvoiceInfo>
          </InvoiceHeader>

          {/* Bill From / Bill To */}
          <BillingSection>
            <BillingBox>
              <BillingLabel>Bill From</BillingLabel>
              {renderCompanyInfo(issuerCompany, invoice.issuerName || 'Issuer')}
            </BillingBox>
            <BillingBox>
              <BillingLabel>Bill To</BillingLabel>
              {renderCompanyInfo(payerCompany, invoice.payerName || invoice.restaurantName || 'Customer')}
            </BillingBox>
          </BillingSection>

          {/* Dates */}
          <DatesSection>
            <DateBox>
              <DateLabel>Issue Date</DateLabel>
              <DateValue>{formatDate(invoice.issueDate)}</DateValue>
            </DateBox>
            <DateBox>
              <DateLabel>Due Date</DateLabel>
              <DateValue>{formatDate(invoice.dueDate)}</DateValue>
            </DateBox>
            <DateBox>
              <DateLabel>Paid Date</DateLabel>
              <DateValue>{invoice.paidDate ? formatDate(invoice.paidDate) : '-'}</DateValue>
            </DateBox>
          </DatesSection>

          {/* Items Table */}
          <ItemsTable>
            <thead>
              <tr>
                <TableHeader>Description</TableHeader>
                <TableHeader>Qty</TableHeader>
                <TableHeader>Unit Price</TableHeader>
                <TableHeader>Amount</TableHeader>
              </tr>
            </thead>
            <tbody>
              {invoice.items && invoice.items.length > 0 ? (
                invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.quantity || 1}</TableCell>
                    <TableCell>{formatCurrency(item.unitPrice || item.total, invoice.currency)}</TableCell>
                    <TableCell>{formatCurrency(item.total, invoice.currency)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center', color: '#9CA3AF' }}>
                    No items
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </ItemsTable>

          {/* Summary */}
          <SummarySection>
            <SummaryBox>
              <SummaryRow>
                <span>Subtotal</span>
                <span>{formatCurrency(invoice.amount, invoice.currency)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tax (6%)</span>
                <span>{formatCurrency(invoice.tax, invoice.currency)}</span>
              </SummaryRow>
              <SummaryRow total>
                <span>Total Due</span>
                <span>{formatCurrency(invoice.total, invoice.currency)}</span>
              </SummaryRow>
            </SummaryBox>
          </SummarySection>

          {/* Bank Details */}
          {issuerCompany.bankName && (
            <BankSection>
              <BankTitle>Payment Details</BankTitle>
              <BankGrid>
                <BankItem>
                  <span>Bank Name</span>
                  <strong>{issuerCompany.bankName}</strong>
                </BankItem>
                <BankItem>
                  <span>Account Number</span>
                  <strong>{issuerCompany.bankAccount || '-'}</strong>
                </BankItem>
                <BankItem>
                  <span>Account Name</span>
                  <strong>{issuerCompany.bankAccountName || '-'}</strong>
                </BankItem>
                {issuerCompany.swiftCode && (
                  <BankItem>
                    <span>SWIFT Code</span>
                    <strong>{issuerCompany.swiftCode}</strong>
                  </BankItem>
                )}
              </BankGrid>
            </BankSection>
          )}

          {/* Notes */}
          {invoice.notes && (
            <NotesSection>
              <NotesTitle>Notes</NotesTitle>
              <NotesText>{invoice.notes}</NotesText>
            </NotesSection>
          )}

          {/* Footer */}
          <FooterSection>
            Thank you for your business!
            <br />
            Invoice generated on {new Date().toLocaleDateString('en-MY')}
          </FooterSection>
        </InvoiceContainer>

        <ModalActions>
          <ActionButton onClick={onClose}>Close</ActionButton>
          {onDownload && (
            <ActionButton onClick={onDownload}>Download PDF</ActionButton>
          )}
          <ActionButton variant="primary" onClick={handlePrint}>Print</ActionButton>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

export default InvoiceDetailModal;
