import styled from 'styled-components';
import { BaseButton, StatusBadge as CommonStatusBadge } from '../../../components/UI/CommonStyles';

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

export const DemoBadge = styled.span`
  display: inline-block;
  background: #F59E0B;
  color: white;
  font-size: 9px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 3px;
  vertical-align: middle;
  margin-left: 4px;
`;

export const DemoToggleLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #4B5563;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;

  input {
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
`;

// StatusBadge 컴포넌트는 CommonStatusBadge로 교체됨
export const StatusBadge = styled(CommonStatusBadge)`
  white-space: normal;
  line-height: 1.3;
`;

export const LocalActionButton = styled.button<{ variant?: 'primary' | 'danger' | 'email' | 'cancel' | 'success' }>`
  padding: 5px 8px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;

    &:hover {
      background: #5A51E6;
    }
  ` : props.variant === 'success' ? `
    background: #10B981;
    color: white;
    border-color: #10B981;

    &:hover {
      background: #059669;
    }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;

    &:hover {
      background: #FEE2E2;
    }
  ` : props.variant === 'email' ? `
    background: #F1F4F8;
    color: #4B5563;
    border-color: #C7CED6;
    padding: 5px;

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

// Category Card Components (Recipe style)
export const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

export const CategoryCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.isActive !== false ? 1 : 0.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

export const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F1F4F8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: #635BFF;
  flex-shrink: 0;
`;

export const CategoryInfo = styled.div`
  flex: 1;
`;

export const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CategoryMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #4B5563;
`;

export const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const CategoryStatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.active ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
`;

export const CategoryIconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #C7CED6;
  background: #F4F6F9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #4B5563;
    transition: color 0.15s;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

// FilterControls and FilterRow now come from DatePeriodFilter

export const CreateButtonArea = styled.div`
  margin-left: auto;

  @media (max-width: 600px) {
    margin-left: 0;
    width: 100%;
    order: 99;

    button {
      width: 100%;
    }
  }
`;

// DateButton, DateRangePickerWrapper, DateRangeTrigger now come from DatePeriodFilter


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
  max-width: 100%;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  box-sizing: border-box;
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
