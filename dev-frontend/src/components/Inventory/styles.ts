import styled from 'styled-components';
import { TableHeader, TableRow, MobileGrid, MobileLabel, MobileValue } from '../UI';

export const InfoBox = styled.div`
  background: #F0F4FF;
  border: 1px solid #C7CED6;
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
  color: #4B5563;
`;

export const StockItemImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #F1F4F8;
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
  color: #6B7280;
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
        return 'background: #F1F4F8; color: #4B5563;';
    }
  }}
`;

export const SettingsButton = styled.button`
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  padding: 6px 12px;
  cursor: pointer;
  color: #4B5563;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: #C7CED6;
    color: #0A2540;
    border-color: #6B7280;
  }
`;

export const QuickActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
`;

/** 재고 목록의 품목명. 이름이 길어 잘리면 무엇인지 알아볼 수 없다 —
 *  자르지 말고 2줄까지 접어서 전부 보여준다(2026-08-25 Irene 보고). */
export const IngredientName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.35;
`;

/** 브랜드 표준 재료 표식 — 재고는 매장별이지만 재료 정의는 브랜드 소유(읽기전용). */
export const BrandTag = styled.span`
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #F3F4F6;
  color: #4B5563;
  font-size: 10px;
  font-weight: 700;
  vertical-align: middle;
`;

export const IngredientMeta = styled.div`
  font-size: 13px;
  color: #4B5563;
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
// 1024–1280px is too narrow for the 9-column grid AND too wide to trigger the base
// card layout (≤1024) — so the header stayed a grid while rows half-collapsed, leaving the
// header misaligned with the data ("Actions" wrapping, columns not lining up). Fix: switch
// the inventory table to the CARD layout for the whole ≤1280 band (hide the header, stack
// each row with its MobileLabels) so header and rows always agree. The base ≤1024 rules
// still apply below that; this just raises the card breakpoint for inventory only.
export const InventoryTableHeader = styled(TableHeader)`
  @media (max-width: 1280px) {
    display: none;
  }
`;

export const InventoryTableRow = styled(TableRow)`
  @media (max-width: 1280px) {
    display: block;
    padding: 16px;

    /* Replicate the base ≤1024 card layout (2-up label/value pairs) at ≤1280 for inventory. */
    ${MobileGrid} {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    ${MobileValue} {
      flex: 1 1 calc(50% - 5px);
      min-width: 140px;
    }
    ${MobileLabel} {
      display: block;
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
    background: #F1F4F8;
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
  border: 1px solid #C7CED6;
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
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: #C7CED6;
    color: #0A2540;
    border-color: #6B7280;
  }
`;
