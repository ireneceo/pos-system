import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const OrderButton = styled.button`
  /* 2026-09-13: 28×28 → 32×32. 사내 행 액션 기준(IconButton 32×32)이자 POS·태블릿 손가락 조작 기준. */
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #C7CED6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #F9FAFB;
    border-color: #6B7280;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
    color: #4B5563;
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
