import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState as CategoryEmptyState } from '../../../components/UI/TableComponents';
import { Modal as CommonModal } from '../../../components/UI';
import ConfirmModal from '../../../components/ConfirmModal';
import { InvoiceCategory } from './types';
import {
  Button,
  CategoryGrid,
  CategoryCard,
  CategoryIcon,
  CategoryInfo,
  CategoryName,
  CategoryMeta,
  CategoryActions,
  CategoryStatusBadge,
  CategoryIconButton,
  HeaderRow,
  SectionTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
} from './styles';

interface BrandInvoiceCategoryManagerProps {
  invoiceCategories: InvoiceCategory[];
  showCategoryModal: boolean;
  setShowCategoryModal: (show: boolean) => void;
  editingCategory: InvoiceCategory | null;
  setEditingCategory: (category: InvoiceCategory | null) => void;
  categoryFormData: { name: string; code: string; description: string };
  setCategoryFormData: (data: { name: string; code: string; description: string }) => void;
  savingCategory: boolean;
  deleteCategoryModalOpen: boolean;
  setDeleteCategoryModalOpen: (open: boolean) => void;
  categoryToDelete: InvoiceCategory | null;
  setCategoryToDelete: (category: InvoiceCategory | null) => void;
  handleCloseCategoryModal: () => void;
  handleDeleteCategoryConfirm: () => void;
  handleSaveCategory: () => void;
}

const BrandInvoiceCategoryManager: React.FC<BrandInvoiceCategoryManagerProps> = ({
  invoiceCategories,
  showCategoryModal,
  setShowCategoryModal,
  editingCategory,
  setEditingCategory,
  categoryFormData,
  setCategoryFormData,
  savingCategory,
  deleteCategoryModalOpen,
  setDeleteCategoryModalOpen,
  categoryToDelete,
  setCategoryToDelete,
  handleCloseCategoryModal,
  handleDeleteCategoryConfirm,
  handleSaveCategory,
}) => {
  const { t } = useTranslation('brand');

  return (
    <>
      <div style={{ padding: '24px 0' }}>
        <HeaderRow>
          <div>
            <SectionTitle>{t('brand:brandInvoicesPage.invoiceCategories')}</SectionTitle>
            <p style={{ color: '#4B5563', fontSize: '14px', margin: '8px 0 0 0' }}>
              Manage invoice categories for organizing different types of charges.
            </p>
          </div>
          <Button variant="primary" onClick={() => {
            setEditingCategory(null);
            setCategoryFormData({ name: '', code: '', description: '' });
            setShowCategoryModal(true);
          }}>
            Add Category
          </Button>
        </HeaderRow>

        {invoiceCategories.length === 0 ? (
          <CategoryEmptyState>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0 0 8px 0' }}>{t('brand:brandInvoicesPage.noCategoriesYet')}</h4>
            <p style={{ fontSize: '14px', color: '#4B5563', margin: '0 0 16px 0' }}>{t('brand:brandInvoicesPage.createYourFirstInvoiceCategoryToOrganizeCharges')}</p>
            <Button variant="primary" onClick={() => {
              setEditingCategory(null);
              setCategoryFormData({ name: '', code: '', description: '' });
              setShowCategoryModal(true);
            }}>{t('brand:brandInvoicesPage.addCategory')}</Button>
          </CategoryEmptyState>
        ) : (
          <CategoryGrid>
            {invoiceCategories.map(category => (
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
                  <CategoryIconButton onClick={() => {
                    setEditingCategory(category);
                    setCategoryFormData({
                      name: category.name,
                      code: category.code,
                      description: category.description || ''
                    });
                    setShowCategoryModal(true);
                  }} title="Edit Category">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </CategoryIconButton>
                  <CategoryIconButton onClick={() => {
                    setCategoryToDelete(category);
                    setDeleteCategoryModalOpen(true);
                  }} title="Delete Category">
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
        <CommonModal isOpen={true} onClose={handleCloseCategoryModal} title={editingCategory ? 'Edit Category' : 'Add Category'} footer={<><Button variant="secondary" type="button" onClick={handleCloseCategoryModal}>{t('brand:brandInvoicesPage.cancel')}</Button><Button variant="primary" type="button" onClick={handleSaveCategory} disabled={savingCategory || !categoryFormData.name || !categoryFormData.code}> {savingCategory ? 'Saving...' : (editingCategory ? 'Update' : 'Create')} </Button></>}>

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
            <small style={{ color: '#4B5563', fontSize: '12px' }}>
              Unique identifier used in the system. Use lowercase letters and underscores.
            </small>
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('brand:brandInvoicesPage.description')}</FormLabel>
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
        onCancel={() => setDeleteCategoryModalOpen(false)}
        onConfirm={handleDeleteCategoryConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default BrandInvoiceCategoryManager;
