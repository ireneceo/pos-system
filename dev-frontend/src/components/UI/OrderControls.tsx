import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OrderButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #E5E7EB;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #F9FAFB;
    border-color: #D1D5DB;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
    color: #6B7280;
  }
`;

interface OrderControlsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  disableUp?: boolean;
  disableDown?: boolean;
}

export const OrderControls: React.FC<OrderControlsProps> = ({
  onMoveUp,
  onMoveDown,
  disableUp = false,
  disableDown = false
}) => {
  return (
    <Container>
      <OrderButton
        onClick={onMoveUp}
        disabled={disableUp}
        title="Move up"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 14l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </OrderButton>
      <OrderButton
        onClick={onMoveDown}
        disabled={disableDown}
        title="Move down"
      >
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </OrderButton>
    </Container>
  );
};

export default OrderControls;
