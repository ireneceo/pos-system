import styled from 'styled-components';

// This file contains POS-specific modal components only
// For base Modal components, import directly from '../UI/Modal'

// POS-specific styled components
export const RequiredStar = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

export const Section = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RadioGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
`;

export const RadioButton = styled.button<{ selected?: boolean }>`
  padding: 12px 16px;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid ${props => props.selected ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border, #B9C2CC)'};
  background: ${props => props.selected ? 'var(--pos-brand-tint, rgba(99, 91, 255, 0.1))' : 'var(--pos-control, white)'};
  color: ${props => props.selected ? 'var(--pos-brand, #635BFF)' : 'var(--pos-text, #1F2937)'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:hover {
    border-color: ${props => props.selected ? 'var(--pos-brand, #635BFF)' : 'var(--pos-border, #6B7280)'};
    background: ${props => props.selected ? 'var(--pos-brand-tint, rgba(99, 91, 255, 0.1))' : '#F9FAFB'};
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  min-height: 44px;
  border: 1px solid var(--pos-border, #C7CED6);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: var(--pos-surface-2, #F9FAFB);
    border-color: var(--pos-border, #6B7280);
  }
`;

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--pos-brand, #635BFF);
  cursor: pointer;
  border-radius: 4px;
`;

export const CheckboxText = styled.span`
  font-size: 14px;
  color: var(--pos-text, #1F2937);
  margin-left: 10px;
  flex: 1;
`;

export const CheckboxPrice = styled.span`
  font-size: 12px;
  color: var(--pos-text-muted, #4B5563);
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid var(--pos-border, #6B7280);
  background: var(--pos-control, white);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: var(--pos-surface-2, #F9FAFB);
    border-color: var(--pos-border, #6B7280);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: var(--pos-control, white);
      border-color: var(--pos-border, #6B7280);
    }
  }
`;

export const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: var(--pos-text, #1F2937);
`;

export const TotalSection = styled.div`
  border-top: 1px solid var(--pos-border, #C7CED6);
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: var(--pos-text, #1F2937);
`;

export const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--pos-text, #1F2937);
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

export const ProductIcon = styled.div`
  width: 48px;
  height: 48px;
  background: var(--pos-surface-2, #F1F4F8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const ProductDetails = styled.div``;

export const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: var(--pos-text, #1F2937);
  margin: 0 0 4px 0;
`;

export const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: var(--pos-text-muted, #4B5563);
  margin: 0;
`;
