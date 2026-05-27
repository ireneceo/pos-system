import React from 'react';
import { Modal, ModalButton } from '../../UI/Modal';
import { DeleteTarget } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  target: DeleteTarget | null;
  onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<Props> = ({ isOpen, onClose, target, onConfirm }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Unlink from Inventory"
    size="small"
    footer={
      <>
        <ModalButton variant="secondary" onClick={onClose}>
          Cancel
        </ModalButton>
        <ModalButton variant="danger" onClick={onConfirm}>
          {target?.type === 'ingredient' ? 'Unlink' : 'Delete'}
        </ModalButton>
      </>
    }
  >
    {target && (
      <div style={{ padding: '8px 0', textAlign: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: '#0A2540' }}>
          {target.name}
        </div>
        <div style={{ fontSize: '14px', color: '#4B5563' }}>
          {target.type === 'ingredient'
            ? 'This will unlink the ingredient from inventory tracking. The ingredient itself will not be deleted from the Recipes page.'
            : 'This will permanently delete this general stock item.'}
        </div>
      </div>
    )}
  </Modal>
);

export default DeleteConfirmModal;
