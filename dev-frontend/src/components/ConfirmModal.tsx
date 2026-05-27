import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { ModalOverlay } from './UI/Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  // Information-only mode — hides the cancel button (single primary button only).
  singleButton?: boolean;
}

const Modal = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
  margin: auto 0;
`;

const Header = styled.div`
  padding: 24px;
  border-bottom: 1px solid #C7CED6;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const Message = styled.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
  margin: 0;
  white-space: pre-line;
  text-align: left;
`;

const Footer = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #C7CED6;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ variant: 'primary' | 'secondary'; type?: string }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => {
    switch (props.variant) {
      case 'primary': return 'none';
      default: return '1px solid #C7CED6';
    }
  }};
  background: ${props => {
    switch (props.variant) {
      case 'primary':
        return props.type === 'danger' ? '#DC2626' :
               props.type === 'warning' ? '#D97706' : '#635BFF';
      default: return 'white';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary': return 'white';
      default: return '#4B5563';
    }
  }};

  &:hover {
    background: ${props => {
      switch (props.variant) {
        case 'primary':
          return props.type === 'danger' ? '#B91C1C' :
                 props.type === 'warning' ? '#B45309' : '#5A51E6';
        default: return '#F1F4F8';
      }
    }};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  singleButton = false
}) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={handleOverlayClick} style={{ zIndex: 1100 }}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <Message>{message}</Message>
        </Header>

        <Footer>
          {!singleButton && (
            <Button variant="secondary" onClick={onCancel}>
              {cancelText}
            </Button>
          )}
          <Button variant="primary" type={type} onClick={onConfirm}>
            {confirmText}
          </Button>
        </Footer>
      </Modal>
    </ModalOverlay>,
    document.body
  );
};

export default ConfirmModal;