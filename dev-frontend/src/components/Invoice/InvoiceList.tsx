import React from 'react';
import styled from 'styled-components';
import { Invoice, InvoiceListProps, CURRENCY_CONFIG } from './types';
import InvoiceStatusBadge from './InvoiceStatusBadge';

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 16px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  color: #374151;
  vertical-align: middle;
`;

const InvoiceNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const SubInfo = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const Amount = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.highlight ? '700' : '500'};
  color: #374151;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'success' | 'danger' | 'warning' | 'default' }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  border: 1px solid;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          border-color: #635BFF;
          &:hover { background: #5A51E6; }
        `;
      case 'success':
        return `
          background: #10B981;
          color: white;
          border-color: #059669;
          &:hover { background: #047857; }
        `;
      case 'danger':
        return `
          background: transparent;
          color: #DC2626;
          border-color: #FCA5A5;
          &:hover { background: #FEE2E2; }
        `;
      case 'warning':
        return `
          background: #F59E0B;
          color: white;
          border-color: #F59E0B;
          &:hover { background: #D97706; }
        `;
      default:
        return `
          background: white;
          color: #374151;
          border-color: #E5E7EB;
          &:hover { background: #F9FAFB; }
        `;
    }
  }}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6B7280;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
`;

const EmptyDesc = styled.div`
  font-size: 14px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6B7280;
`;

// Mobile responsive card view
const MobileCard = styled.div`
  display: none;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileLabel = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

const MobileValue = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const MobileActions = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E5E7EB;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const DesktopTable = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const InvoiceList: React.FC<InvoiceListProps> = ({
  mode,
  invoices,
  loading = false,
  onViewDetails,
  onSendInvoice,
  onConfirmPayment,
  onRejectPayment,
  onSubmitPayment,
  onDeleteInvoice,
  onCancelInvoice
}) => {
  const formatCurrency = (invoice: Invoice) => {
    const config = CURRENCY_CONFIG[invoice.currency] || CURRENCY_CONFIG.MYR;
    return `${config.symbol} ${invoice.total.toFixed(config.decimals)}`;
  };

  const renderActions = (invoice: Invoice) => {
    const actions: React.ReactNode[] = [];

    // View button - always available
    if (onViewDetails) {
      actions.push(
        <ActionButton key="view" onClick={() => onViewDetails(invoice)}>
          View
        </ActionButton>
      );
    }

    // Issuer actions
    if (mode === 'issuer' || mode === 'both') {
      // Draft: Send, Delete
      if (invoice.status === 'draft') {
        if (onSendInvoice) {
          actions.push(
            <ActionButton key="send" variant="primary" onClick={() => onSendInvoice(invoice)}>
              Send
            </ActionButton>
          );
        }
        if (onDeleteInvoice) {
          actions.push(
            <ActionButton key="delete" variant="danger" onClick={() => onDeleteInvoice(invoice)}>
              Delete
            </ActionButton>
          );
        }
      }

      // Payment Submitted: Confirm, Reject
      if (invoice.status === 'payment_submitted') {
        if (onConfirmPayment) {
          actions.push(
            <ActionButton key="confirm" variant="success" onClick={() => onConfirmPayment(invoice)}>
              Review Payment
            </ActionButton>
          );
        }
      }

      // Pending: Cancel (only for issuer)
      if (invoice.status === 'pending_payment' && onCancelInvoice) {
        actions.push(
          <ActionButton key="cancel" variant="danger" onClick={() => onCancelInvoice(invoice)}>
            Cancel
          </ActionButton>
        );
      }
    }

    // Payer actions
    if (mode === 'payer' || mode === 'both') {
      // Pending Payment: Submit Payment
      if ((invoice.status === 'pending_payment' || invoice.status === 'overdue') && onSubmitPayment) {
        actions.push(
          <ActionButton key="pay" variant="primary" onClick={() => onSubmitPayment(invoice)}>
            Pay Now
          </ActionButton>
        );
      }
    }

    return actions;
  };

  if (loading) {
    return <LoadingSpinner>Loading invoices...</LoadingSpinner>;
  }

  if (!invoices || invoices.length === 0) {
    return (
      <EmptyState>
        <EmptyIcon>📄</EmptyIcon>
        <EmptyTitle>No invoices found</EmptyTitle>
        <EmptyDesc>
          {mode === 'issuer'
            ? 'Create a new invoice to get started.'
            : mode === 'payer'
            ? 'You have no pending invoices to pay.'
            : 'No invoices available.'}
        </EmptyDesc>
      </EmptyState>
    );
  }

  return (
    <>
      {/* Mobile View */}
      {invoices.map(invoice => (
        <MobileCard key={invoice.id}>
          <MobileRow>
            <MobileLabel>Invoice</MobileLabel>
            <MobileValue style={{ fontWeight: 600 }}>{invoice.invoiceNumber}</MobileValue>
          </MobileRow>
          <MobileRow>
            <MobileLabel>{mode === 'payer' ? 'From' : 'To'}</MobileLabel>
            <MobileValue>
              {mode === 'payer'
                ? invoice.issuerName || 'System Admin'
                : invoice.payerName || invoice.restaurantName || 'N/A'}
            </MobileValue>
          </MobileRow>
          <MobileRow>
            <MobileLabel>Amount</MobileLabel>
            <MobileValue>{formatCurrency(invoice)}</MobileValue>
          </MobileRow>
          <MobileRow>
            <MobileLabel>Due Date</MobileLabel>
            <MobileValue>{new Date(invoice.dueDate).toLocaleDateString()}</MobileValue>
          </MobileRow>
          <MobileRow>
            <MobileLabel>Status</MobileLabel>
            <InvoiceStatusBadge status={invoice.status} size="small" />
          </MobileRow>
          <MobileActions>
            {renderActions(invoice)}
          </MobileActions>
        </MobileCard>
      ))}

      {/* Desktop View */}
      <DesktopTable>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Invoice</Th>
                {mode === 'payer' && <Th>From</Th>}
                {(mode === 'issuer' || mode === 'both') && <Th>To</Th>}
                <Th>Amount</Th>
                <Th>Issue Date</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <Td>
                    <InvoiceNumber>{invoice.invoiceNumber}</InvoiceNumber>
                    {invoice.type === 'automatic' && (
                      <SubInfo>Auto-generated</SubInfo>
                    )}
                  </Td>
                  {mode === 'payer' && (
                    <Td>
                      <div>{invoice.issuerName || 'System Admin'}</div>
                      <SubInfo>{invoice.issuerType?.replace('_', ' ').toUpperCase()}</SubInfo>
                    </Td>
                  )}
                  {(mode === 'issuer' || mode === 'both') && (
                    <Td>
                      <div>{invoice.payerName || invoice.restaurantName || 'N/A'}</div>
                      {invoice.payerType && (
                        <SubInfo>{invoice.payerType.replace('_', ' ')}</SubInfo>
                      )}
                    </Td>
                  )}
                  <Td>
                    <Amount highlight>{formatCurrency(invoice)}</Amount>
                  </Td>
                  <Td>{new Date(invoice.issueDate).toLocaleDateString()}</Td>
                  <Td>{new Date(invoice.dueDate).toLocaleDateString()}</Td>
                  <Td>
                    <InvoiceStatusBadge status={invoice.status} />
                  </Td>
                  <Td>
                    <ActionButtons>
                      {renderActions(invoice)}
                    </ActionButtons>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </DesktopTable>
    </>
  );
};

export default InvoiceList;
