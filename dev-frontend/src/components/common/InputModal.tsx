import React, { useState } from 'react';
import Modal, { ModalButton, FormLabel } from '../UI/Modal';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #625CF6;
    box-shadow: 0 0 0 3px rgba(98, 92, 246, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  transition: all 0.15s;
  resize: vertical;
  min-height: 100px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #625CF6;
    box-shadow: 0 0 0 3px rgba(98, 92, 246, 0.1);
  }

  &::placeholder {
    color: #9CA3AF;
  }
`;

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  multiline?: boolean;
  confirmText?: string;
  cancelText?: string;
}

const InputModal: React.FC<InputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  label,
  placeholder = '',
  defaultValue = '',
  multiline = false,
  confirmText = 'Save',
  cancelText = 'Cancel'
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim());
      setValue('');
    }
  };

  const footer = (
    <>
      <ModalButton variant="secondary" onClick={onClose}>
        {cancelText}
      </ModalButton>
      <ModalButton onClick={handleConfirm} disabled={!value.trim()}>
        {confirmText}
      </ModalButton>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
    >
      <div>
        <FormLabel>{label}</FormLabel>
        {multiline ? (
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        ) : (
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoFocus
          />
        )}
      </div>
    </Modal>
  );
};

export default InputModal;