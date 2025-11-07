import React from 'react';
import { Modal, ModalButton as Button } from '../UI/Modal';

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
  variant?: 'success' | 'error' | 'warning' | 'info';
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText = 'OK',
  variant = 'info'
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return '✓';
      case 'error':
        return '×';
      case 'warning':
        return '!';
      case 'info':
      default:
        return 'i';
    }
  };

  const footer = (
    <Button onClick={onClose} style={{ maxWidth: '200px', margin: '0 auto' }}>
      {buttonText}
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
        <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: '1.5' }}>
          {message}
        </p>
      </div>
    </Modal>
  );
};

export default AlertDialog;