/**
 * SupplierViewModal — 공급업체 상세 정보 read-only 모달.
 *
 * 모든 source(own / brand_shared / contract / brand_parent / foodcourt_parent / supplier_company) 의
 * 정보를 동일한 레이아웃으로 표시.
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../UI/Modal';
import { formatEntityAddress, AppLocale } from '../../utils/formatAddress';

const ViewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ViewRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ViewField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ViewLabel = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const ViewValue = styled.div`
  font-size: 14px;
  color: #0A2540;
  word-break: break-word;
`;

const ViewDivider = styled.div`
  height: 1px;
  background: #C7CED6;
`;

const ViewNote = styled.div`
  font-size: 13px;
  color: #4B5563;
  line-height: 1.5;
  padding: 12px;
  background: #F1F4F8;
  border-radius: 8px;
  margin-top: 8px;
`;

interface SupplierView {
  id?: number;
  code?: string | null;
  name?: string;
  contact_name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  business_number?: string | null;
  bank_name?: string | null;
  bank_account?: string | null;
  payment_terms?: string | null;
  notes?: string | null;
  is_active?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  supplier?: SupplierView | null;
  /** 출처별 안내 문구 (optional) */
  sourceNote?: string;
}

export default function SupplierViewModal({ isOpen, onClose, supplier, sourceNote }: Props) {
  const { t, i18n } = useTranslation(['suppliers', 'supplier', 'common']);
  const locale = (i18n.language as AppLocale) || 'en';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('suppliers:suppliersPage.supplierDetails', 'Supplier Details') as string}
      size="large"
      footer={<ModalButton variant="secondary" onClick={onClose}>{t('common:close', 'Close')}</ModalButton>}
    >
      {supplier && (
        <ViewSection>
          <ViewRow>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.supplierName', 'Supplier Name')}</ViewLabel>
              <ViewValue>{supplier.name || '-'}</ViewValue>
            </ViewField>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.code', 'Code')}</ViewLabel>
              <ViewValue>{supplier.code || '-'}</ViewValue>
            </ViewField>
          </ViewRow>

          <ViewDivider />

          <ViewRow>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.contactPerson', 'Contact Person')}</ViewLabel>
              <ViewValue>{supplier.contact_name || '-'}</ViewValue>
            </ViewField>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.phone', 'Phone')}</ViewLabel>
              <ViewValue>{supplier.phone || '-'}</ViewValue>
            </ViewField>
          </ViewRow>

          <ViewRow>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.email', 'Email')}</ViewLabel>
              <ViewValue>{supplier.email || '-'}</ViewValue>
            </ViewField>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.businessNumber', 'Business Number')}</ViewLabel>
              <ViewValue>{supplier.business_number || '-'}</ViewValue>
            </ViewField>
          </ViewRow>

          <ViewDivider />

          <ViewField>
            <ViewLabel>{t('suppliers:suppliersPage.address', 'Address')}</ViewLabel>
            <ViewValue>{formatEntityAddress(supplier as any, locale) || '-'}</ViewValue>
          </ViewField>

          <ViewRow>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.paymentTerms', 'Payment Terms')}</ViewLabel>
              <ViewValue>{supplier.payment_terms || '-'}</ViewValue>
            </ViewField>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.bankName', 'Bank Name')}</ViewLabel>
              <ViewValue>{supplier.bank_name || '-'}</ViewValue>
            </ViewField>
          </ViewRow>

          <ViewRow>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.bankAccount', 'Bank Account')}</ViewLabel>
              <ViewValue>{supplier.bank_account || '-'}</ViewValue>
            </ViewField>
            <ViewField>
              <ViewLabel>{t('suppliers:suppliersPage.notes', 'Notes')}</ViewLabel>
              <ViewValue style={{ whiteSpace: 'pre-line' }}>{supplier.notes || '-'}</ViewValue>
            </ViewField>
          </ViewRow>

          {sourceNote && <ViewNote>{sourceNote}</ViewNote>}
        </ViewSection>
      )}
    </Modal>
  );
}
