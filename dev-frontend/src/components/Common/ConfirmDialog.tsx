import React from 'react';
import { Modal, ModalButton as Button } from '../UI/Modal';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info'
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return '!';
      case 'warning':
        return '!';
      case 'info':
      default:
        return 'i';
    }
  };

  const getConfirmButtonVariant = () => {
    switch (variant) {
      case 'danger':
      case 'warning':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {cancelText}
      </Button>
      <Button variant={getConfirmButtonVariant()} onClick={onConfirm}>
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      zIndex={1100}
    >
      <div style={{ textAlign: 'center', padding: '32px 0' }}>
        <div style={{ fontSize: '56px', marginBottom: '24px' }}>{getIcon()}</div>
        <p style={{ fontSize: '16px', color: '#374151', lineHeight: '1.6', margin: '0' }}>
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;