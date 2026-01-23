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
  border: 1px solid ${props => props.selected ? '#635BFF' : '#E6EBF1'};
  background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : 'white'};
  color: ${props => props.selected ? '#635BFF' : '#374151'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  text-align: center;

  &:hover {
    border-color: ${props => props.selected ? '#635BFF' : '#D1D5DB'};
    background: ${props => props.selected ? 'rgba(99, 91, 255, 0.1)' : '#F9FAFB'};
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
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }
`;

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #635BFF;
  cursor: pointer;
  border-radius: 4px;
`;

export const CheckboxText = styled.span`
  font-size: 14px;
  color: #374151;
  margin-left: 10px;
  flex: 1;
`;

export const CheckboxPrice = styled.span`
  font-size: 12px;
  color: #6B7280;
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
  border: 1px solid #D1D5DB;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F9FAFB;
    border-color: #9CA3AF;
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background: white;
      border-color: #D1D5DB;
    }
  }
`;

export const QuantityValue = styled.span`
  font-size: 18px;
  font-weight: 600;
  width: 40px;
  text-align: center;
  color: #1F2937;
`;

export const TotalSection = styled.div`
  border-top: 1px solid #E6EBF1;
  padding: 16px 0 0 0;
  margin: 16px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
`;

export const TotalPrice = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1F2937;
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
  background: #F3F4F6;
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
  color: #1F2937;
  margin: 0 0 4px 0;
`;

export const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
`;
