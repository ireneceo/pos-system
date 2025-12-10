import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 340px;
  overflow: hidden;
  animation: ${slideUp} 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div<{ type: string }>`
  padding: 24px 24px 16px;
  text-align: center;
  background: ${props => {
    switch (props.type) {
      case 'error': return '#FEF2F2';
      case 'success': return '#F0FDF4';
      case 'warning': return '#FFFBEB';
      default: return '#EFF6FF';
    }
  }};
`;

const IconCircle = styled.div<{ type: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
  background: ${props => {
    switch (props.type) {
      case 'error': return '#FEE2E2';
      case 'success': return '#DCFCE7';
      case 'warning': return '#FEF3C7';
      default: return '#DBEAFE';
    }
  }};

  svg {
    width: 28px;
    height: 28px;
    color: ${props => {
      switch (props.type) {
        case 'error': return '#DC2626';
        case 'success': return '#16A34A';
        case 'warning': return '#D97706';
        default: return '#2563EB';
      }
    }};
  }
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

const ModalBody = styled.div`
  padding: 16px 24px 24px;
  text-align: center;
`;

const Message = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary'; buttonType?: string }>`
  flex: 1;
  padding: 14px 20px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props => props.variant === 'secondary' ? `
    background: #F3F4F6;
    border: none;
    color: #4B5563;

    &:active {
      background: #E5E7EB;
    }
  ` : `
    background: ${(() => {
      switch (props.buttonType) {
        case 'error': return '#DC2626';
        case 'success': return '#16A34A';
        case 'warning': return '#D97706';
        default: return '#635BFF';
      }
    })()};
    border: none;
    color: white;

    &:active {
      opacity: 0.9;
    }
  `}
`;

// Icons
const ErrorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const SuccessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

interface MobileAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'error' | 'success' | 'warning' | 'info';
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

const MobileAlertModal: React.FC<MobileAlertModalProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  showCancel = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'error': return <ErrorIcon />;
      case 'success': return <SuccessIcon />;
      case 'warning': return <WarningIcon />;
      default: return <InfoIcon />;
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader type={type}>
          <IconCircle type={type}>
            {getIcon()}
          </IconCircle>
          <Title>{title}</Title>
        </ModalHeader>

        <ModalBody>
          <Message>{message}</Message>
        </ModalBody>

        <ButtonContainer>
          {showCancel && (
            <Button variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
          )}
          <Button buttonType={type} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

export default MobileAlertModal;

// Hook for easier usage
export const useMobileAlert = () => {
  const [alertState, setAlertState] = React.useState<{
    isOpen: boolean;
    type: 'error' | 'success' | 'warning' | 'info';
    title: string;
    message: string;
    onConfirm?: () => void;
    showCancel?: boolean;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    type: 'info',
    title: '',
    message: '',
  });

  const showAlert = (options: {
    type?: 'error' | 'success' | 'warning' | 'info';
    title: string;
    message: string;
    onConfirm?: () => void;
    showCancel?: boolean;
    confirmText?: string;
    cancelText?: string;
  }) => {
    setAlertState({
      isOpen: true,
      type: options.type || 'info',
      title: options.title,
      message: options.message,
      onConfirm: options.onConfirm,
      showCancel: options.showCancel,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
    });
  };

  const hideAlert = () => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  };

  const AlertComponent = () => (
    <MobileAlertModal
      isOpen={alertState.isOpen}
      onClose={hideAlert}
      type={alertState.type}
      title={alertState.title}
      message={alertState.message}
      onConfirm={alertState.onConfirm}
      showCancel={alertState.showCancel}
      confirmText={alertState.confirmText}
      cancelText={alertState.cancelText}
    />
  );

  return { showAlert, hideAlert, AlertComponent };
};
