import React, { useState } from 'react';
import { Modal, ModalButton as Button, FormLabel as Label } from '../UI/Modal';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #C7CED6;
  border-radius: 8px;
  transition: all 0.15s;
  text-align: center;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #6B7280;
  }
`;

const ErrorMessage = styled.div`
  color: #FF6B6B;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

const Helper = styled.div`
  color: #4B5563;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
`;

interface NumberInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  label: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  confirmText?: string;
  cancelText?: string;
}

const NumberInputModal: React.FC<NumberInputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  label,
  placeholder = '',
  min = 0,
  max,
  step = 1,
  suffix = '',
  confirmText = 'Apply',
  cancelText = 'Cancel'
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty string
    if (newValue === '') {
      setValue('');
      setError('');
      return;
    }
    
    // Only allow numbers and decimal point
    if (!/^\d*\.?\d*$/.test(newValue)) {
      return;
    }
    
    const numValue = parseFloat(newValue);
    
    if (!isNaN(numValue)) {
      if (numValue < min) {
        setError(`Minimum value is ${min}${suffix}`);
      } else if (max !== undefined && numValue > max) {
        setError(`Maximum value is ${max}${suffix}`);
      } else {
        setError('');
      }
    }
    
    setValue(newValue);
  };

  const handleConfirm = () => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= min && (max === undefined || numValue <= max)) {
      onConfirm(value);
      setValue('');
      setError('');
      onClose();
    }
  };

  const handleClose = () => {
    setValue('');
    setError('');
    onClose();
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={handleClose}>
        {cancelText}
      </Button>
      <Button
        variant="primary"
        onClick={handleConfirm}
        disabled={!value || !!error || parseFloat(value) < min}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      footer={footer}
    >
      <div>
        <Label>{label}</Label>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !error && value) {
              handleConfirm();
            }
          }}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {!error && max !== undefined && (
          <Helper>Enter a value between {min}{suffix} and {max}{suffix}</Helper>
        )}
      </div>
    </Modal>
  );
};

export default NumberInputModal;