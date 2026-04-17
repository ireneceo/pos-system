import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState as CategoryEmptyState } from '../../../components/UI/TableComponents';
import { Modal as CommonModal } from '../../../components/UI';
import ConfirmModal from '../../../components/ConfirmModal';
import { InvoiceCategory } from './types';
import {
  Button,
  HeaderRow,
  SectionTitle,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryInfo,
  CategoryName,
  CategoryMeta,
  CategoryActions,
  CategoryStatusBadge,
  CategoryIconButton,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
} from './styles';

interface InvoiceCategoryManagerProps {
  invoiceCategories: InvoiceCategory[];
  // Category modal
  showCategoryModal: boolean;
  editingCategory: InvoiceCategory | null;
  categoryFormData: { name: string; code: string; description: string };
  setCategoryFormData: (data: { name: string; code: string; description: string }) => void;
  savingCategory: boolean;
  onOpenCategoryModal: (category?: InvoiceCategory) => void;
  onCloseCategoryModal: () => void;
  // Delete
  deleteCategoryModalOpen: boolean;
  categoryToDelete: InvoiceCategory | null;
  onDeleteCategoryClick: (category: InvoiceCategory) => void;
  onDeleteCategoryConfirm: () => void;
  onDeleteCategoryCancel: () => void;
  // Toggle
  onToggleCategoryActive: (category: InvoiceCategory) => void;
}

const InvoiceCategoryManager: React.FC<InvoiceCategoryManagerProps> = ({
  invoiceCategories,
  showCategoryModal,
  editingCategory,
  categoryFormData,
  setCategoryFormData,
  savingCategory,
  onOpenCategoryModal,
  onCloseCategoryModal,
  deleteCategoryModalOpen,
  categoryToDelete,
  onDeleteCategoryClick,
  onDeleteCategoryConfirm,
  onDeleteCategoryCancel,
  onToggleCategoryActive,
}) => {
  const { t } = useTranslation('admin');

  return (
    <>
      <div style={{ padding: '24px 0' }}>
        <HeaderRow>
          <div>
            <SectionTitle>{t('admin:invoicesPage.invoiceCategories')}</SectionTitle>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '8px 0 0 0' }}>
              Manage invoice categories for organizing different types of charges.
            </p>
          </div>
          <Button variant="primary" onClick={() => onOpenCategoryModal()}>{t('admin:invoicesPage.addCategory')}</Button>
        </HeaderRow>

        {invoiceCategories.length === 0 ? (
          <CategoryEmptyState>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0 0 8px 0' }}>{t('admin:invoicesPage.noCategoriesYet')}</h4>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px 0' }}>{t('admin:invoicesPage.createYourFirstInvoiceCategoryToGetStarted')}</p>
            <Button variant="primary" onClick={() => onOpenCategoryModal()}>{t('admin:invoicesPage.addCategory')}</Button>
          </CategoryEmptyState>
        ) : (
          <CategoryGrid>
            {invoiceCategories.map((category) => (
              <CategoryCard key={category.id} isActive={category.is_active}>
                <CategoryIcon>
                  {category.name.charAt(0).toUpperCase()}
                </CategoryIcon>
                <CategoryInfo>
                  <CategoryName>
                    {category.name}
                    <CategoryStatusBadge active={category.is_active}>
                      {category.is_active ? 'Active' : 'Inactive'}
                    </CategoryStatusBadge>
                  </CategoryName>
                  <CategoryMeta>
                    <span>Code: <strong>{category.code}</strong></span>
                    {category.description && <span>{category.description}</span>}
                  </CategoryMeta>
                </CategoryInfo>
                <CategoryActions>
                  <CategoryIconButton
                    onClick={() => onToggleCategoryActive(category)}
                    title={category.is_active ? 'Deactivate' : 'Activate'}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {category.is_active ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </>
                      ) : (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </>
                      )}
                    </svg>
                  </CategoryIconButton>
                  <CategoryIconButton onClick={() => onOpenCategoryModal(category)} title="Edit Category">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </CategoryIconButton>
                  <CategoryIconButton onClick={() => onDeleteCategoryClick(category)} title="Delete Category">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3,6 5,6 21,6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </CategoryIconButton>
                </CategoryActions>
              </CategoryCard>
            ))}
          </CategoryGrid>
        )}
      </div>

      {/* Category Modal */}
      {showCategoryModal && (
        <CommonModal isOpen={true} onClose={onCloseCategoryModal} title={editingCategory ? 'Edit Category' : 'Add Category'} footer={<><Button variant="secondary" type="button" onClick={onCloseCategoryModal}>{t('admin:invoicesPage.cancel')}</Button><Button variant="primary" type="submit" disabled={savingCategory || !categoryFormData.name || !categoryFormData.code}> {savingCategory ? 'Saving...' : (editingCategory ? 'Update' : 'Create')} </Button></>}>

          <FormGroup>
            <FormLabel>Name *</FormLabel>
            <FormInput
              value={categoryFormData.name}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
              placeholder="e.g., Hardware"
              required
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Code *</FormLabel>
            <FormInput
              value={categoryFormData.code}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, code: e.target.value })}
              placeholder="e.g., hardware"
              required
              disabled={editingCategory?.is_system}
            />
            <small style={{ color: '#6B7280', fontSize: '12px' }}>
              Unique identifier used in the system. Use lowercase letters and underscores.
            </small>
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('admin:invoicesPage.description')}</FormLabel>
            <FormTextarea
              value={categoryFormData.description}
              onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
              placeholder="Brief description of this category"
              rows={3}
            />
          </FormGroup>

        </CommonModal>
      )}

      {/* Delete Category Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteCategoryModalOpen}
        onCancel={onDeleteCategoryCancel}
        onConfirm={onDeleteCategoryConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default InvoiceCategoryManager;
