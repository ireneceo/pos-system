import React from 'react';
import styled from 'styled-components';
import { InvoiceStatus, STATUS_CONFIG } from './types';

interface Props {
  status: InvoiceStatus;
  size?: 'small' | 'medium' | 'large';
}

const Badge = styled.span<{ color: string; bgColor: string; size: string }>`
  display: inline-flex;
  align-items: center;
  padding: ${props => props.size === 'small' ? '2px 8px' : props.size === 'large' ? '6px 14px' : '4px 10px'};
  border-radius: 12px;
  font-size: ${props => props.size === 'small' ? '11px' : props.size === 'large' ? '14px' : '12px'};
  font-weight: 600;
  color: ${props => props.color};
  background: ${props => props.bgColor};
  white-space: nowrap;
`;

const InvoiceStatusBadge: React.FC<Props> = ({ status, size = 'medium' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending_payment;

  return (
    <Badge color={config.color} bgColor={config.bgColor} size={size}>
      {config.label}
    </Badge>
  );
};

export default InvoiceStatusBadge;
