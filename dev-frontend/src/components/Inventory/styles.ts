import styled from 'styled-components';
import { TableHeader, TableRow } from '../UI';

export const InfoBox = styled.div`
  background: #F0F4FF;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 12px 16px;
  color: #635BFF;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 24px 0 16px 0;
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${props => {
    switch (props.status) {
      case 'out_of_stock':
        return 'background: #FEE2E2; color: #DC2626;';
      case 'low_stock':
        return 'background: #FEF3C7; color: #D97706;';
      default:
        return 'background: #ECFDF5; color: #059669;';
    }
  }}
`;

export const AlertCard = styled.div<{ type: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => props.type === 'out_of_stock' ? '#FEF2F2' : '#FFFBEB'};
  border: 1px solid ${props => props.type === 'out_of_stock' ? '#FECACA' : '#FED7AA'};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const AlertInfo = styled.div`
  flex: 1;
`;

export const AlertTitle = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

export const AlertDetail = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

export const StockItemImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #F3F4F6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StockItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StockItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StockItemCode = styled.span`
  font-size: 11px;
  color: #9CA3AF;
  font-family: monospace;
`;

export const UrgencyBadge = styled.span<{ level: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;

  ${props => {
    switch (props.level) {
      case 'critical':
        return 'background: #EF4444; color: white;';
      case 'high':
        return 'background: #F59E0B; color: white;';
      default:
        return 'background: #10B981; color: white;';
    }
  }}
`;

export const ExpiryAlertCard = styled.div<{ urgency: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: ${props => {
    switch (props.urgency) {
      case 'expired': return '#FEF2F2';
      case 'critical': return '#FEF2F2';
      case 'warning': return '#FFFBEB';
      default: return '#F0F9FF';
    }
  }};
  border: 1px solid ${props => {
    switch (props.urgency) {
      case 'expired': return '#FECACA';
      case 'critical': return '#FECACA';
      case 'warning': return '#FED7AA';
      default: return '#BAE6FD';
    }
  }};
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ExpiryBadge = styled.span<{ urgency: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;

  ${props => {
    switch (props.urgency) {
      case 'expired':
        return 'background: #7F1D1D; color: white;';
      case 'critical':
        return 'background: #EF4444; color: white;';
      case 'warning':
        return 'background: #F59E0B; color: white;';
      default:
        return 'background: #10B981; color: white;';
    }
  }}
`;

export const ConfidenceBadge = styled.span<{ level: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;

  ${props => {
    switch (props.level) {
      case 'high':
        return 'background: #ECFDF5; color: #059669;';
      case 'medium':
        return 'background: #FEF3C7; color: #D97706;';
      case 'low':
        return 'background: #FEE2E2; color: #DC2626;';
      default:
        return 'background: #F3F4F6; color: #6B7280;';
    }
  }}
`;

export const SettingsButton = styled.button`
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  padding: 6px 12px;
  cursor: pointer;
  color: #6B7280;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

export const IngredientName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

export const IngredientMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

/*
 * Inventory tables share the same 9-column desktop layout:
 *   Item · Status · Current · Min · Unit Cost · Supplier · Last Stock Take · Order · Actions
 *
 * At mid-widths (1024-1280px) the desktop grid is too cramped, so we collapse to
 * 5 visible columns (Item / Status / Current / Order / Actions) and widen Actions
 * so the 4 action buttons fit on a single row instead of stacking vertically.
 *
 * We use class-based selectors (.col-min, .col-cost, .col-supplier, .col-last)
 * because nth-child cannot reach MobileValue items nested inside MobileGrid
 * (which uses display: contents).
 */
export const InventoryTableHeader = styled(TableHeader)`
  @media (max-width: 1280px) {
    grid-template-columns: 2.5fr 1fr 1fr 150px 280px;

    & .col-min,
    & .col-cost,
    & .col-supplier,
    & .col-last {
      display: none;
    }
  }
`;

export const InventoryTableRow = styled(TableRow)`
  @media (max-width: 1280px) {
    grid-template-columns: 2.5fr 1fr 1fr 150px 280px;

    & .col-min,
    & .col-cost,
    & .col-supplier,
    & .col-last {
      display: none;
    }
  }
`;

export const EditableStock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.15s;

  &:hover {
    background: #F3F4F6;
  }
`;

export const InlineStockInput = styled.input`
  width: 80px;
  padding: 4px 8px;
  border: 1px solid #635BFF;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.2);
  }
`;

export const OrderInput = styled.input`
  width: 70px;
  padding: 4px 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 13px;
  text-align: right;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

export const OrderButton = styled.button`
  padding: 6px 12px;
  background: #F0FDF4;
  color: #16A34A;
  border: 1px solid #16A34A;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #DCFCE7;
  }
`;

export const DeleteButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #FEE2E2;
  background: #FEF2F2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  color: #DC2626;

  &:hover {
    background: #FEE2E2;
    border-color: #FECACA;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const EditButton = styled.button`
  padding: 6px 12px;
  background: #F3F4F6;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #E5E7EB;
    color: #0A2540;
    border-color: #D1D5DB;
  }
`;
