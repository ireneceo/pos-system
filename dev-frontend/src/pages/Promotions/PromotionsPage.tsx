import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal as CommonModal } from '../../components/UI';
import { EmptyState } from '../../components/UI/TableComponents';
import { DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell, DataTableEmpty } from '../../components/UI/DataTable';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import PageHeader from '../../components/Common/PageHeader';
import DateRangeField from '../../components/Common/DateRangeField';
import ConfirmModal from '../../components/ConfirmModal';

import { getAuthToken } from '../../utils/auth';
import { formatDate as formatDateTz } from '../../utils/timezone';
// 스타일 컴포넌트
const CouponsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
  min-height: 100vh;
`;


const Button = styled.button<{ primary?: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: none;

  ${props => props.primary ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
      transform: translateY(-1px);
    }
  ` : `
    background: white;
    color: #4B5563;
    border: 1px solid #C7CED6;

    &:hover {
      background: #F4F6F9;
      border-color: #C7D2FE;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const SectionCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`;


const EmptyStateText = styled.p`
  font-size: 14px;
  margin-bottom: 24px;
`;

const StatusBadge = styled.span<{ status: 'active' | 'inactive' | 'expired' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${props => {
    switch(props.status) {
      case 'active':
        return `
          background: #ECFDF5;
          color: #059669;
        `;
      case 'inactive':
        return `
          background: #FEE2E2;
          color: #DC2626;
        `;
      case 'expired':
        return `
          background: #FEF2F2;
          color: #DC2626;
        `;
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  color: #4B5563;
  background: none;
  border: 1px solid #C7CED6;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F4F6F9;
    color: #0A2540;
    border-color: #C7D2FE;
  }

  &.danger:hover {
    background: #FEF2F2;
    color: #DC2626;
    border-color: #FECACA;
  }
`;


const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const ErrorText = styled.p`
  color: #DC2626;
  font-size: 13px;
  margin-top: 8px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  color: #4B5563;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #1F2937;
  cursor: pointer;

  input[type="radio"] {
    accent-color: #635BFF;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CheckboxLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid ${props => props.checked ? '#635BFF' : '#C7CED6'};
  border-radius: 6px;
  font-size: 13px;
  color: ${props => props.checked ? '#635BFF' : '#1F2937'};
  background: ${props => props.checked ? '#F4F3FF' : 'white'};
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
  }
`;

const CustomerSearchInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const CustomerList = styled.div`
  max-height: 180px;
  overflow-y: auto;
  border: 1px solid #C7CED6;
  border-radius: 8px;
`;

const CustomerItem = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 1px solid #F4F6F9;
  background: ${props => props.selected ? '#F4F3FF' : 'white'};
  transition: background 0.1s;

  &:hover {
    background: ${props => props.selected ? '#F4F3FF' : '#F4F6F9'};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CustomerItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CustomerItemName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
`;

const CustomerItemMeta = styled.div`
  font-size: 11px;
  color: #4B5563;
`;

const SelectedCount = styled.div`
  font-size: 12px;
  color: #4B5563;
  margin-top: 6px;
`;

const TargetBadge = styled.span`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F4F3FF;
  color: #635BFF;
`;

// 타입 정의
interface Coupon {
  id: number;
  code: string;
  name: string;
  description: string | null;
  type: 'percentage' | 'fixed';
  value: number;
  min_order: number;
  max_discount: number | null;
  usage_limit: number | null;
  usage_count: number;
  per_user_limit: number | null;
  valid_from: string | null;
  valid_until: string | null;
  is_active: boolean;
  applicable_order_types: string[] | null;
  target_type: 'all' | 'customers' | 'tiers';
  target_customer_ids: number[] | null;
  target_loyalty_tiers: string[] | null;
}

interface CustomerOption {
  id: number;
  name: string;
  phone: string;
  loyalty_tier: string;
}

const CouponsPage: React.FC = () => {
  const { user } = useAuth();
  const { operationSettings } = useStore();
  const restaurantId = user?.restaurantId;
  const currency = operationSettings?.currency || 'MYR';
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  // Map: coupon_id → array of External QR names that link to it (for "Linked to" badges)
  const [couponLinkedQRs, setCouponLinkedQRs] = useState<Record<number, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

  // 쿠폰 폼 상태
  const [couponForm, setCouponForm] = useState({
    code: '',
    name: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    min_order: '',
    max_discount: '',
    usage_limit: '',
    valid_from: '',
    valid_until: '',
    target_type: 'all' as 'all' | 'customers' | 'tiers',
    target_customer_ids: [] as number[],
    target_loyalty_tiers: [] as string[]
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [customerSearch, setCustomerSearch] = useState('');
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // 쿠폰 목록 로드
  useEffect(() => {
    if (restaurantId) {
      fetchCoupons();
      fetchCouponLinkedQRs();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  const fetchCouponLinkedQRs = async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}/coupons-linked-qrs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) return;
      const json = await res.json();
      setCouponLinkedQRs(json?.data?.byCouponId || {});
    } catch { /* ignore — badge optional */ }
  };

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/coupons?restaurantId=${restaurantId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const result = await response.json();
      if (result.success) {
        setCoupons(result.data);
      } else {
        setError(result.error || 'Failed to load coupons');
      }
    } catch (err) {
      setError('Failed to load coupons');
      console.error('Error fetching coupons:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    if (!restaurantId) return;
    try {
      setLoadingCustomers(true);
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/customers/${restaurantId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      const result = await response.json();
      if (result.success) {
        const data = result.data || [];
        setCustomers(data.map((c: any) => ({
          id: c.customer?.id || c.customer_id || c.id,
          name: c.customer?.name || c.name || '',
          phone: c.customer?.phone || c.phone || '',
          loyalty_tier: c.loyalty_tier || 'Bronze'
        })));
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoadingCustomers(false);
    }
  };

  const handleCreateCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: '',
      min_order: '',
      max_discount: '',
      usage_limit: '',
      valid_from: '',
      valid_until: '',
      target_type: 'all',
      target_customer_ids: [],
      target_loyalty_tiers: []
    });
    setCustomerSearch('');
    setFormError(null);
    fetchCustomers();
    setShowModal(true);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      name: coupon.name || '',
      description: coupon.description || '',
      type: coupon.type,
      value: coupon.value.toString(),
      min_order: coupon.min_order?.toString() || '',
      max_discount: coupon.max_discount?.toString() || '',
      usage_limit: coupon.usage_limit?.toString() || '',
      valid_from: coupon.valid_from ? coupon.valid_from.split('T')[0] : '',
      valid_until: coupon.valid_until ? coupon.valid_until.split('T')[0] : '',
      target_type: coupon.target_type || 'all',
      target_customer_ids: coupon.target_customer_ids || [],
      target_loyalty_tiers: coupon.target_loyalty_tiers || []
    });
    setCustomerSearch('');
    setFormError(null);
    fetchCustomers();
    setShowModal(true);
  };

  const handleSaveCoupon = async () => {
    // Validation
    if (!couponForm.code.trim()) {
      setFormError('Coupon code is required');
      return;
    }
    if (!couponForm.value || parseFloat(couponForm.value) <= 0) {
      setFormError('Discount value must be greater than 0');
      return;
    }

    try {
      setSaving(true);
      setFormError(null);
      const token = getAuthToken();

      const payload: any = {
        restaurant_id: restaurantId,
        code: couponForm.code.toUpperCase(),
        name: couponForm.name || null,
        description: couponForm.description || null,
        type: couponForm.type,
        value: parseFloat(couponForm.value),
        min_order: couponForm.min_order ? parseFloat(couponForm.min_order) : 0,
        max_discount: couponForm.max_discount ? parseFloat(couponForm.max_discount) : null,
        usage_limit: couponForm.usage_limit ? parseInt(couponForm.usage_limit) : null,
        valid_from: couponForm.valid_from || null,
        valid_until: couponForm.valid_until || null,
        is_active: true,
        target_type: couponForm.target_type,
        target_customer_ids: couponForm.target_type === 'customers' ? couponForm.target_customer_ids : null,
        target_loyalty_tiers: couponForm.target_type === 'tiers' ? couponForm.target_loyalty_tiers : null
      };

      const url = editingCoupon
        ? `${process.env.REACT_APP_API_URL}/api/coupons/${editingCoupon.id}`
        : `${process.env.REACT_APP_API_URL}/api/coupons`;

      const response = await fetch(url, {
        method: editingCoupon ? 'PUT' : 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setShowModal(false);
        fetchCoupons();
      } else {
        setFormError(result.error || 'Failed to save coupon');
      }
    } catch (err) {
      setFormError('Failed to save coupon');
      console.error('Error saving coupon:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (coupon: Coupon) => {
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/coupons/${coupon.id}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ is_active: !coupon.is_active })
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchCoupons();
      }
    } catch (err) {
      console.error('Error toggling coupon status:', err);
    }
  };

  const handleDeleteCoupon = (coupon: Coupon) => {
    setDeletingCoupon(coupon);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteCoupon = async () => {
    if (!deletingCoupon) return;
    setShowDeleteConfirm(false);
    try {
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/coupons/${deletingCoupon.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const result = await response.json();
      if (result.success) {
        fetchCoupons();
      }
    } catch (err) {
      console.error('Error deleting coupon:', err);
    }
    setDeletingCoupon(null);
  };

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.type === 'percentage') {
      return `${coupon.value}%`;
    }
    return formatCurrency(coupon.value, currency);
  };

  const getCouponStatus = (coupon: Coupon): 'active' | 'inactive' | 'expired' => {
    if (!coupon.is_active) return 'inactive';
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) return 'expired';
    if (coupon.usage_limit && coupon.usage_count >= coupon.usage_limit) return 'expired';
    return 'active';
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return formatDateTz(dateStr, operationSettings);
  };

  return (
    <>
      <CouponsContainer>
        <PageHeader title="Coupons">
          <Button primary onClick={handleCreateCoupon}>{'Create Coupon'}</Button>
        </PageHeader>

        <Content>
          <SectionCard>
            <SectionTitle>{'Coupon List'}</SectionTitle>

            {loading && coupons.length === 0 ? (
              <LoadingSpinner>{'Loading coupons...'}</LoadingSpinner>
            ) : error ? (
              <EmptyState>
                <EmptyStateText>{error}</EmptyStateText>
                <Button onClick={fetchCoupons}>{'Retry'}</Button>
              </EmptyState>
            ) : coupons.length > 0 ? (
              <DataTable>
                <DataTableHead>
                  <tr>
                    <DataTableHeaderCell align="left">{'Code'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="left">{'Name'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{'Discount'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Target'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Valid Until'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Usage'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="center">{'Status'}</DataTableHeaderCell>
                    <DataTableHeaderCell align="right">{'Actions'}</DataTableHeaderCell>
                  </tr>
                </DataTableHead>
                <tbody>
                  {coupons.map(coupon => {
                    const status = getCouponStatus(coupon);
                    return (
                      <DataTableRow key={coupon.id}>
                        <DataTableCell data-label="Code" style={{ fontWeight: 600 }}>
                          {coupon.code}
                          {(couponLinkedQRs[coupon.id] || []).length > 0 && (
                            <div style={{ marginTop: '4px', fontSize: '11px', fontWeight: 500, color: '#635BFF', background: '#F0F0FF', padding: '2px 8px', borderRadius: '10px', display: 'inline-block' }}>
                              Linked to: {couponLinkedQRs[coupon.id].join(', ')}
                            </div>
                          )}
                        </DataTableCell>
                        <DataTableCell data-label="Name">{coupon.name || '-'}</DataTableCell>
                        <DataTableCell data-label="Discount" align="right">{formatDiscount(coupon)}</DataTableCell>
                        <DataTableCell data-label="Target" align="center">
                          {coupon.target_type === 'all' ? (
                            <TargetBadge>{'All'}</TargetBadge>
                          ) : coupon.target_type === 'customers' ? (
                            <TargetBadge>{coupon.target_customer_ids?.length || 0} Customers</TargetBadge>
                          ) : coupon.target_type === 'tiers' ? (
                            <TargetBadge>{coupon.target_loyalty_tiers?.join(', ') || '-'}</TargetBadge>
                          ) : (
                            <TargetBadge>{'All'}</TargetBadge>
                          )}
                        </DataTableCell>
                        <DataTableCell data-label="Valid Until" align="center">{formatDate(coupon.valid_until)}</DataTableCell>
                        <DataTableCell data-label="Usage" align="center">
                          {coupon.usage_count} / {coupon.usage_limit || '∞'}
                        </DataTableCell>
                        <DataTableCell data-label="Status" align="center">
                          <StatusBadge status={status}>
                            {status}
                          </StatusBadge>
                        </DataTableCell>
                        <DataTableCell data-label="" align="right" mobileFullWidth>
                          <ActionButtons>
                            <ActionButton onClick={() => handleEditCoupon(coupon)}>
                              Edit
                            </ActionButton>
                            <ActionButton onClick={() => handleToggleStatus(coupon)}>
                              {coupon.is_active ? 'Deactivate' : 'Activate'}
                            </ActionButton>
                            <ActionButton
                              className="danger"
                              onClick={() => handleDeleteCoupon(coupon)}
                            >
                              Delete
                            </ActionButton>
                          </ActionButtons>
                        </DataTableCell>
                      </DataTableRow>
                    );
                  })}
                </tbody>
              </DataTable>
            ) : (
              <EmptyState>
                <EmptyStateText>{'No coupons created yet'}</EmptyStateText>
                <Button primary onClick={handleCreateCoupon}>{'Create Your First Coupon'}</Button>
              </EmptyState>
            )}
          </SectionCard>
        </Content>

        {/* 쿠폰 생성/편집 모달 */}
        {showModal && (
        <CommonModal isOpen={true} onClose={() => setShowModal(false)} title={editingCoupon ? 'Edit Coupon' : 'Create New Coupon'} footer={<><Button onClick={() => setShowModal(false)} disabled={saving}>{'Cancel'}</Button><Button primary onClick={handleSaveCoupon} disabled={saving}>{saving ? 'Saving...' : (editingCoupon ? 'Update Coupon' : 'Create Coupon')}</Button></>}>
              <FormGroup>
                <Label>Coupon Code *</Label>
                <Input
                  type="text"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g., SAVE10"
                />
              </FormGroup>

              <FormGroup>
                <Label>{'Name'}</Label>
                <Input
                  type="text"
                  value={couponForm.name}
                  onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })}
                  placeholder="e.g., 10% Off Summer Sale"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>{'Discount Type'}</Label>
                  <Select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as 'percentage' | 'fixed' })}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">{'Fixed Amount (RM)'}</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>Discount Value *</Label>
                  <Input
                    type="number"
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: e.target.value })}
                    placeholder={couponForm.type === 'percentage' ? '10' : '5.00'}
                    step={couponForm.type === 'percentage' ? '1' : '0.01'}
                    min="0"
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>{'Min Order Amount'}</Label>
                  <Input
                    type="number"
                    value={couponForm.min_order}
                    onChange={(e) => setCouponForm({ ...couponForm, min_order: e.target.value })}
                    placeholder="0"
                    step="0.01"
                    min="0"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Max Discount (for %)</Label>
                  <Input
                    type="number"
                    value={couponForm.max_discount}
                    onChange={(e) => setCouponForm({ ...couponForm, max_discount: e.target.value })}
                    placeholder="No limit"
                    step="0.01"
                    min="0"
                    disabled={couponForm.type !== 'percentage'}
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup style={{ gridColumn: 'span 2' }}>
                  <Label>{'Valid From — Valid Until'}</Label>
                  <DateRangeField
                    startDate={couponForm.valid_from}
                    endDate={couponForm.valid_until}
                    onChange={(start, end) => setCouponForm({ ...couponForm, valid_from: start, valid_until: end })}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>{'Usage Limit'}</Label>
                <Input
                  type="number"
                  value={couponForm.usage_limit}
                  onChange={(e) => setCouponForm({ ...couponForm, usage_limit: e.target.value })}
                  placeholder="Unlimited"
                  min="1"
                />
              </FormGroup>

              <FormGroup>
                <Label>{'Target Audience'}</Label>
                <RadioGroup>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="target_type"
                      checked={couponForm.target_type === 'all'}
                      onChange={() => setCouponForm({ ...couponForm, target_type: 'all', target_customer_ids: [], target_loyalty_tiers: [] })}
                    />
                    All Customers
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="target_type"
                      checked={couponForm.target_type === 'customers'}
                      onChange={() => setCouponForm({ ...couponForm, target_type: 'customers', target_loyalty_tiers: [] })}
                    />
                    Specific Customers
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="target_type"
                      checked={couponForm.target_type === 'tiers'}
                      onChange={() => setCouponForm({ ...couponForm, target_type: 'tiers', target_customer_ids: [] })}
                    />
                    Membership Tiers
                  </RadioLabel>
                </RadioGroup>

                {couponForm.target_type === 'customers' && (
                  <>
                    <CustomerSearchInput
                      type="text"
                      placeholder="Search customers by name or phone..."
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                    />
                    <CustomerList>
                      {loadingCustomers ? (
                        <CustomerItem>{'Loading customers...'}</CustomerItem>
                      ) : customers
                          .filter(c =>
                            c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                            c.phone.includes(customerSearch)
                          )
                          .map(c => {
                            const isSelected = couponForm.target_customer_ids.includes(c.id);
                            return (
                              <CustomerItem
                                key={c.id}
                                selected={isSelected}
                                onClick={() => {
                                  const ids = isSelected
                                    ? couponForm.target_customer_ids.filter(id => id !== c.id)
                                    : [...couponForm.target_customer_ids, c.id];
                                  setCouponForm({ ...couponForm, target_customer_ids: ids });
                                }}
                              >
                                <input type="checkbox" checked={isSelected} readOnly style={{ accentColor: '#635BFF' }} />
                                <CustomerItemInfo>
                                  <CustomerItemName>{c.name}</CustomerItemName>
                                  <CustomerItemMeta>{c.phone} · {c.loyalty_tier}</CustomerItemMeta>
                                </CustomerItemInfo>
                              </CustomerItem>
                            );
                          })
                      }
                      {!loadingCustomers && customers.filter(c =>
                        c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                        c.phone.includes(customerSearch)
                      ).length === 0 && (
                        <CustomerItem>{'No customers found'}</CustomerItem>
                      )}
                    </CustomerList>
                    <SelectedCount>
                      {couponForm.target_customer_ids.length} customer{couponForm.target_customer_ids.length !== 1 ? 's' : ''} selected
                    </SelectedCount>
                  </>
                )}

                {couponForm.target_type === 'tiers' && (
                  <CheckboxGroup>
                    {['Bronze', 'Silver', 'Gold', 'VIP'].map(tier => {
                      const isChecked = couponForm.target_loyalty_tiers.includes(tier);
                      return (
                        <CheckboxLabel key={tier} checked={isChecked}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              const tiers = isChecked
                                ? couponForm.target_loyalty_tiers.filter(t => t !== tier)
                                : [...couponForm.target_loyalty_tiers, tier];
                              setCouponForm({ ...couponForm, target_loyalty_tiers: tiers });
                            }}
                          />
                          {tier}
                        </CheckboxLabel>
                      );
                    })}
                  </CheckboxGroup>
                )}
              </FormGroup>

              <FormGroup>
                <Label>{'Description'}</Label>
                <TextArea
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  placeholder="Optional description..."
                />
              </FormGroup>

              {formError && <ErrorText>{formError}</ErrorText>}
        </CommonModal>
        )}
      </CouponsContainer>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Coupon"
        message={
          deletingCoupon && (couponLinkedQRs[deletingCoupon.id] || []).length > 0
            ? `Coupon "${deletingCoupon.code}" is linked to External QR(s): ${couponLinkedQRs[deletingCoupon.id].join(', ')}. Deleting will remove the partner discount from those QRs (orders made via those QRs will no longer auto-apply this discount). Continue?`
            : `Are you sure you want to delete coupon "${deletingCoupon?.code}"?`
        }
        onConfirm={confirmDeleteCoupon}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingCoupon(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default CouponsPage;
