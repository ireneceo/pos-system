/**
 * SupplierFormModal — 공급업체 등록/수정 통합 모달.
 *
 * SuppliersPage, AllSuppliersView 등 모든 페이지에서 동일하게 사용.
 * Role 별 endpoint 자동 분기 (Restaurant Admin / Brand General / Foodcourt General).
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormRow, FormGroup, FormLabel, FormInput, FormTextArea } from '../UI/Modal';
import { AddressFields } from '../Form';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthToken } from '../../utils/auth';
import type { Address } from '../../utils/formatAddress';

export interface SupplierLike {
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
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (saved?: SupplierLike) => void;
  /** null 또는 undefined = 신규. 객체 = 수정 */
  supplier?: SupplierLike | null;
}

const empty: SupplierLike = {
  code: '', name: '', contact_name: '', phone: '', email: '',
  address: '', address_line_2: '', city: '', state: '', postal_code: '', country: 'MY',
  business_number: '', bank_name: '', bank_account: '', payment_terms: '', notes: '',
};

export default function SupplierFormModal({ isOpen, onClose, onSaved, supplier }: Props) {
  const { t } = useTranslation(['suppliers', 'supplier', 'common']);
  const { user } = useAuth();
  const [form, setForm] = useState<SupplierLike>(empty);
  const [saving, setSaving] = useState(false);

  const role = user?.role;
  const restaurantId = (user as any)?.restaurantId || (user as any)?.restaurant_id;
  const isRestaurant = role === 'Restaurant Admin' || role === 'Restaurant Owner';
  const isBrand = role === 'Brand General' || role === 'Brand Manager';

  useEffect(() => {
    if (!isOpen) return;
    if (supplier && supplier.id) {
      setForm({
        code: supplier.code || '',
        name: supplier.name || '',
        contact_name: supplier.contact_name || '',
        phone: supplier.phone || '',
        email: supplier.email || '',
        address: supplier.address || '',
        address_line_2: supplier.address_line_2 || '',
        city: supplier.city || '',
        state: supplier.state || '',
        postal_code: supplier.postal_code || '',
        country: (supplier.country || 'MY').toUpperCase(),
        business_number: supplier.business_number || '',
        bank_name: supplier.bank_name || '',
        bank_account: supplier.bank_account || '',
        payment_terms: supplier.payment_terms || '',
        notes: supplier.notes || '',
      });
    } else {
      setForm(empty);
    }
  }, [isOpen, supplier]);

  const resolveUrl = (): { url: string; method: 'POST' | 'PUT' } | null => {
    const id = supplier?.id;
    if (isBrand) {
      return { url: id ? `/api/suppliers/${id}` : '/api/suppliers', method: id ? 'PUT' : 'POST' };
    }
    if (isRestaurant && restaurantId) {
      return {
        url: id ? `/api/restaurants/${restaurantId}/suppliers/${id}` : `/api/restaurants/${restaurantId}/suppliers`,
        method: id ? 'PUT' : 'POST',
      };
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!form.name?.trim()) { alert('Supplier name is required'); return; }
    const target = resolveUrl();
    if (!target) { alert('No supplier endpoint for this role'); return; }
    setSaving(true);
    const token = getAuthToken();
    try {
      const res = await fetch(target.url, {
        method: target.method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      }).then(x => x.json());
      if (res.success) {
        onSaved(res.data);
        onClose();
      } else {
        alert(res.message || res.error || 'Failed to save');
      }
    } catch (e) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const isEdit = !!(supplier && supplier.id);
  const title = isEdit
    ? (t('suppliers:suppliersPage.editSupplier', 'Edit Supplier') as string)
    : (t('suppliers:suppliersPage.newSupplier', 'New Supplier') as string);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => !saving && onClose()}
      title={title}
      size="large"
      footer={
        <>
          <ModalButton variant="secondary" onClick={onClose} disabled={saving}>
            {t('common:cancel', 'Cancel')}
          </ModalButton>
          <ModalButton variant="primary" onClick={handleSubmit} disabled={saving || !form.name?.trim()}>
            {saving
              ? (t('common:saving', 'Saving...') as string)
              : isEdit ? (t('common:update', 'Update') as string) : (t('common:create', 'Create') as string)}
          </ModalButton>
        </>
      }
    >
      <FormRow>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.supplierName', 'Supplier Name')} *</FormLabel>
          <FormInput
            type="text"
            value={form.name || ''}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t('suppliers:suppliersPage.companyName', 'Company name') as string}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.code', 'Code')}</FormLabel>
          <FormInput
            type="text"
            value={form.code || ''}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            placeholder={t('suppliers:suppliersPage.internalCode', 'Internal code') as string}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.contactPerson', 'Contact Person')}</FormLabel>
          <FormInput
            type="text"
            value={form.contact_name || ''}
            onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
            placeholder={t('suppliers:suppliersPage.contactName', 'Contact name') as string}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.phone', 'Phone')}</FormLabel>
          <FormInput
            type="text"
            value={form.phone || ''}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder={t('suppliers:suppliersPage.phoneNumber', 'Phone number') as string}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.email', 'Email')}</FormLabel>
          <FormInput
            type="email"
            value={form.email || ''}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={t('suppliers:suppliersPage.emailAddress', 'Email address') as string}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.businessNumber', 'Business Number')}</FormLabel>
          <FormInput
            type="text"
            value={form.business_number || ''}
            onChange={(e) => setForm({ ...form, business_number: e.target.value })}
            placeholder={t('suppliers:suppliersPage.businessRegNumber', 'Business registration number') as string}
          />
        </FormGroup>
      </FormRow>

      <AddressFields
        value={{
          address: form.address || '',
          address_line_2: form.address_line_2 || '',
          city: form.city || '',
          state: form.state || '',
          postal_code: form.postal_code || '',
          country: form.country || 'MY',
        }}
        onChange={(a: Address) => setForm({
          ...form,
          address: a.address || '',
          address_line_2: a.address_line_2 || '',
          city: a.city || '',
          state: a.state || '',
          postal_code: a.postal_code || '',
          country: (a.country || form.country || 'MY').toUpperCase(),
        })}
        defaultCountry={form.country || 'MY'}
      />

      <FormRow>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.paymentTerms', 'Payment Terms')}</FormLabel>
          <FormInput
            type="text"
            value={form.payment_terms || ''}
            onChange={(e) => setForm({ ...form, payment_terms: e.target.value })}
            placeholder="e.g., Net 30, COD"
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.bankName', 'Bank Name')}</FormLabel>
          <FormInput
            type="text"
            value={form.bank_name || ''}
            onChange={(e) => setForm({ ...form, bank_name: e.target.value })}
            placeholder={t('suppliers:suppliersPage.bankNamePlaceholder', 'Bank name') as string}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('suppliers:suppliersPage.bankAccount', 'Bank Account')}</FormLabel>
          <FormInput
            type="text"
            value={form.bank_account || ''}
            onChange={(e) => setForm({ ...form, bank_account: e.target.value })}
            placeholder={t('suppliers:suppliersPage.accountNumber', 'Account number') as string}
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>{t('suppliers:suppliersPage.notes', 'Notes')}</FormLabel>
        <FormTextArea
          value={form.notes || ''}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder={t('suppliers:suppliersPage.additionalNotes', 'Additional notes...') as string}
          rows={3}
        />
      </FormGroup>
    </Modal>
  );
}
