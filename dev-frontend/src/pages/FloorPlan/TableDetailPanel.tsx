import React from 'react';
import styled from 'styled-components';
import { FloorTable, TableStatusInfo, STATUS_COLORS } from './types';
import { formatCurrency } from '../../utils/currency';

interface TableDetailPanelProps {
  tableNumber: string;
  statusInfo: TableStatusInfo | undefined;
  tableInfo: FloorTable | undefined;
  currency: string;
  onClose: () => void;
  onNewOrder: () => void;
  onAddItems: () => void;
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
  onPayment: () => void;
  onNavigateToPOS: () => void;
}

// ─── Styled Components ───

const Panel = styled.div`
  width: 340px;
  min-width: 340px;
  background: white;
  border-left: 1px solid #E6EBF1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    position: absolute;
    inset: 0;
    z-index: 20;
  }
`;

const PanelHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TableTitle = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0A2540;
    margin: 0;
  }
`;

const TableMeta = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 12px;
  color: #6B7C93;
  font-weight: 500;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #6B7C93;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;

  &:hover { background: #F3F4F6; }
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  margin-top: 6px;
`;

const Section = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #F0F2F5;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

const ItemName = styled.span`
  color: #374151;
  font-weight: 500;
`;

const ItemQty = styled.span`
  color: #9CA3AF;
  font-size: 12px;
  margin-left: 4px;
`;

const ItemPrice = styled.span`
  color: #0A2540;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

const SummaryRow = styled.div<{ $bold?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: ${p => p.$bold ? '14px' : '12px'};
  color: ${p => p.$bold ? '#0A2540' : '#6B7C93'};
  font-weight: ${p => p.$bold ? '700' : '500'};
  padding: 3px 0;
`;

const ActionGroup = styled.div`
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
`;

const ActionBtn = styled.button<{ $variant: 'primary' | 'secondary' | 'success' | 'link' }>`
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${p => {
    switch (p.$variant) {
      case 'primary':
        return `background: #635BFF; color: white; &:hover { background: #5046E5; }`;
      case 'success':
        return `background: #059669; color: white; &:hover { background: #047857; }`;
      case 'secondary':
        return `background: #F3F4F6; color: #374151; border: 1px solid #E6EBF1; &:hover { background: #E5E7EB; }`;
      case 'link':
        return `background: none; color: #6B7C93; font-weight: 500; padding: 6px; &:hover { color: #374151; }`;
    }
  }}
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: #9CA3AF;

  p {
    margin: 8px 0 0;
    font-size: 13px;
  }
`;

// ─── Status helpers ───

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  preparing: 'Preparing',
  ready: 'Ready',
  served: 'Served',
  awaiting_payment: 'Awaiting Payment',
  outstanding: 'Outstanding',
  completed: 'Completed'
};

const getNextStatus = (current: string): { status: string; label: string } | null => {
  switch (current) {
    case 'pending': return { status: 'preparing', label: 'Start Preparing' };
    case 'preparing': return { status: 'ready', label: 'Mark Ready' };
    case 'ready': return { status: 'served', label: 'Mark Served' };
    case 'served': return { status: 'completed', label: 'Complete Order' };
    default: return null;
  }
};

// ─── Component ───

const TableDetailPanel: React.FC<TableDetailPanelProps> = ({
  tableNumber,
  statusInfo,
  tableInfo,
  currency,
  onClose,
  onNewOrder,
  onAddItems,
  onStatusChange,
  onPayment,
  onNavigateToPOS
}) => {
  const isOccupied = statusInfo && statusInfo.status !== 'available';
  const orderStatus = statusInfo?.orderStatus || '';
  const nextAction = getNextStatus(orderStatus);

  const statusColors = isOccupied
    ? STATUS_COLORS[statusInfo!.status]
    : STATUS_COLORS.available;

  return (
    <Panel>
      <PanelHeader>
        <TableTitle>
          <h3>Table {tableNumber}</h3>
          <TableMeta>
            {statusInfo?.guestCount ? (
              <span>{statusInfo.guestCount} guests</span>
            ) : tableInfo ? (
              <span>{tableInfo.seats} seats</span>
            ) : null}
            {isOccupied && <span>{statusInfo!.elapsedMinutes}min</span>}
          </TableMeta>
          <StatusBadge $color={statusColors.text} $bg={statusColors.bg}>
            {isOccupied ? (STATUS_LABELS[orderStatus] || statusInfo!.status) : 'Available'}
          </StatusBadge>
        </TableTitle>
        <CloseBtn onClick={onClose}>&times;</CloseBtn>
      </PanelHeader>

      {isOccupied ? (
        <>
          {/* Order Info */}
          <Section>
            <SectionTitle>
              Order {statusInfo!.orderNumber || ''}
              {statusInfo!.customerName && statusInfo!.customerName !== 'Walk-in Customer'
                ? ` — ${statusInfo!.customerName}`
                : ''}
            </SectionTitle>
            <ItemList>
              {statusInfo!.orderItems && statusInfo!.orderItems.length > 0 ? (
                statusInfo!.orderItems.map((item, idx) => (
                  <Item key={idx}>
                    <span>
                      <ItemName>{item.name}</ItemName>
                      <ItemQty>x{item.quantity}</ItemQty>
                    </span>
                    <ItemPrice>{formatCurrency(item.price * item.quantity, currency)}</ItemPrice>
                  </Item>
                ))
              ) : (
                <Item><ItemName style={{ color: '#9CA3AF' }}>No items</ItemName><span /></Item>
              )}
            </ItemList>
          </Section>

          {/* Summary */}
          <Section>
            <SummaryRow><span>Subtotal</span><span>{formatCurrency(statusInfo!.subtotal || 0, currency)}</span></SummaryRow>
            {(statusInfo!.discount || 0) > 0 && (
              <SummaryRow><span>Discount</span><span>-{formatCurrency(statusInfo!.discount || 0, currency)}</span></SummaryRow>
            )}
            {(statusInfo!.tax || 0) > 0 && (
              <SummaryRow><span>Tax</span><span>{formatCurrency(statusInfo!.tax || 0, currency)}</span></SummaryRow>
            )}
            {(statusInfo!.serviceCharge || 0) > 0 && (
              <SummaryRow><span>Service Charge</span><span>{formatCurrency(statusInfo!.serviceCharge || 0, currency)}</span></SummaryRow>
            )}
            <SummaryRow $bold>
              <span>Total</span>
              <span>{formatCurrency(statusInfo!.totalAmount, currency)}</span>
            </SummaryRow>
          </Section>

          {/* Actions */}
          <ActionGroup>
            {nextAction && statusInfo!.orderId && (
              <ActionBtn $variant="success" onClick={() => onStatusChange(statusInfo!.orderId!, nextAction.status)}>
                {nextAction.label}
              </ActionBtn>
            )}
            <ActionBtn $variant="primary" onClick={onAddItems}>
              + Add Items
            </ActionBtn>
            {statusInfo!.paymentStatus === 'pending' && (
              <ActionBtn $variant="secondary" onClick={onPayment}>
                Payment {formatCurrency(statusInfo!.totalAmount, currency)}
              </ActionBtn>
            )}
            <ActionBtn $variant="link" onClick={onNavigateToPOS}>
              Open in POS Terminal &#x2197;
            </ActionBtn>
          </ActionGroup>
        </>
      ) : (
        <>
          <EmptyState>
            <span style={{ fontSize: 40, opacity: 0.3 }}>&#x25CB;</span>
            <p>This table is available</p>
          </EmptyState>
          <ActionGroup>
            <ActionBtn $variant="primary" onClick={onNewOrder}>
              + New Order
            </ActionBtn>
            <ActionBtn $variant="link" onClick={onNavigateToPOS}>
              Open in POS Terminal &#x2197;
            </ActionBtn>
          </ActionGroup>
        </>
      )}
    </Panel>
  );
};

export default TableDetailPanel;
