import styled from 'styled-components';
import { BaseButton, StatusBadge as CommonStatusBadge } from '../../../components/UI/CommonStyles';
import {
  TableHeader as CommonTableHeader,
  TableRow as CommonTableRow,
} from '../../../components/UI';

// FilterBar wrapper for full width layout
export const FilterBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FiltersRight = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;

    > button {
      width: 100%;
    }
  }
`;

// Button 컴포넌트는 BaseButton으로 교체됨
export const Button = styled(BaseButton)``;

export const InvoiceInfo = styled.div``;

export const InvoiceNumber = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

export const CompanyName = styled.div`
  font-size: 13px;
  color: #4B5563;
`;

export const AutoBadge = styled.span`
  display: inline-block;
  background: #10B981;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
`;

// StatusBadge 컴포넌트는 CommonStatusBadge로 교체됨
export const StatusBadge = styled(CommonStatusBadge)`
  max-width: 100px;
  white-space: normal;
  line-height: 1.3;
  text-align: center;
`;

export const Amount = styled.div<{ highlight?: boolean }>`
  font-weight: ${props => props.highlight ? '700' : '500'};
  color: #1F2937;
`;

export const LocalActionButton = styled.button<{ variant?: 'primary' | 'success' | 'danger' | 'email' | 'cancel' }>`
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'success' ? `
    background: #10B981;
    color: white;
    border-color: #10B981;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      background: #059669;
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      background: #FEE2E2;
    }
  ` : props.variant === 'email' ? `
    background: #F1F4F8;
    color: #4B5563;
    border-color: #C7CED6;

    &:hover {
      background: #C7CED6;
      color: #1F2937;
    }
  ` : props.variant === 'cancel' ? `
    background: #F4F6F9;
    color: #4B5563;
    border-color: #C7CED6;

    &:hover {
      background: #C7CED6;
      transform: translateY(-1px);
    }
  ` : `
    background: transparent;
    color: #4B5563;
    border-color: #C7CED6;
    padding: 6px 12px;
    min-width: auto;

    &:hover {
      border-color: #635BFF;
      color: #635BFF;
      background: #F4F3FF;
    }
  `}
`;

export const LocalIconButton = styled.button`
  padding: 6px;
  background: #F4F6F9;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #C7CED6;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const IconSymbol = styled.span`
  font-size: 16px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #4B5563;
  display: inline-block;
  line-height: 1;
`;


export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
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

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

export const InvoiceSummary = styled.div`
  background: #F1F4F8;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

export const SummaryRow = styled.div<{ highlight?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  white-space: nowrap;

  ${props => props.highlight ? `
    border-top: 1px solid #C7CED6;
    margin-top: 8px;
    padding-top: 16px;
    font-size: 16px;
  ` : ''}
`;

// 페이지별 반응형 테이블 헤더 (Invoices 전용)
// Header columns: Invoice(1), Customer(2), Period(3), Issued(4), Due(5), Status(6), Amount(7), Total(8), Actions(9)
export const InvoiceTableHeader = styled(CommonTableHeader)`
  /* 1400px 이하: Period, Issued 숨김 - 7개 칼럼 */
  @media (max-width: 1400px) {
    grid-template-columns: 1.6fr 1.3fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(140px, 180px) !important;
    & > span.col-period,
    & > span.col-issued {
      display: none;
    }
  }

  /* 1100px 이하: Period, Issued, Amount, Total 숨김 - 5개 칼럼 */
  @media (max-width: 1100px) {
    grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr minmax(130px, 160px) !important;
    & > span.col-period,
    & > span.col-issued,
    & > span.col-amount,
    & > span.col-total {
      display: none;
    }
  }

  /* 900px 이하: Period, Issued, Status, Amount, Total 숨김 - 4개 칼럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1.4fr 1.2fr 0.8fr minmax(120px, 150px) !important;
    & > span.col-period,
    & > span.col-issued,
    & > span.col-status,
    & > span.col-amount,
    & > span.col-total {
      display: none;
    }
  }
`;

// 페이지별 반응형 테이블 행 (Invoices 전용)
// 클래스명으로 칼럼을 식별하여 숨김 처리
export const InvoiceTableRow = styled(CommonTableRow)`
  /* 1400px 이하: Period, Issued 숨김 - 7개 칼럼 */
  @media (max-width: 1400px) {
    grid-template-columns: 1.6fr 1.3fr 0.9fr 0.7fr 0.8fr 0.8fr minmax(140px, 180px) !important;
    .col-period,
    .col-issued {
      display: none;
    }
  }

  /* 1100px 이하: Period, Issued, Amount, Total 숨김 - 5개 칼럼 */
  @media (max-width: 1100px) {
    grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr minmax(130px, 160px) !important;
    .col-period,
    .col-issued,
    .col-amount,
    .col-total {
      display: none;
    }
  }

  /* 900px 이하: Period, Issued, Status, Amount, Total 숨김 - 4개 칼럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1.4fr 1.2fr 0.8fr minmax(120px, 150px) !important;
    .col-period,
    .col-issued,
    .col-status,
    .col-amount,
    .col-total {
      display: none;
    }
  }
`;
