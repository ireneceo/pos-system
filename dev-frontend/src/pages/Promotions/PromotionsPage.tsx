import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { useStore } from '../../contexts/StoreContext';
import { formatCurrency } from '../../utils/currency';
import PageHeader from '../../components/Common/PageHeader';

// 스타일 컴포넌트
const CouponsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
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
    color: #6B7C93;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #F6F9FC;
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
  border: 1px solid #E6EBF1;
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  /* 정렬 규칙: 숫자/금액은 우측, 상태는 가운데, 액션은 우측 */
  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: right; } /* Min Order */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
`;

const TableCell = styled.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;

  /* 정렬 규칙: 숫자/금액은 우측, 상태는 가운데, 액션은 우측 */
  &:nth-child(3) { text-align: right; } /* Discount */
  &:nth-child(4) { text-align: right; } /* Min Order */
  &:nth-child(5) { text-align: center; } /* Valid Until */
  &:nth-child(6) { text-align: center; } /* Usage */
  &:nth-child(7) { text-align: center; } /* Status */
  &:nth-child(8) { text-align: right; } /* Actions */
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
          background: #F3F4F6;
          color: #6B7C93;
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
  color: #6B7C93;
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
    border-color: #C7D2FE;
  }

  &.danger:hover {
    background: #FEF2F2;
    color: #DC2626;
    border-color: #FECACA;
  }
`;

// 모달 스타일
const Modal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: auto;
  animation: slideUp 0.3s;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
  color: #6B7C93;
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
}

const CouponsPage: React.FC = () => {
  const { user } = useAuth();
  const { operationSettings } = useStore();
  const restaurantId = user?.restaurantId;
  const currency = operationSettings?.currency || 'MYR';
  const [coupons, setCoupons] = useState<Coupon[]>([]);
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
    valid_until: ''
  });
  const [formError, setFormError] = useState<string | null>(null);

  // 쿠폰 목록 로드
  useEffect(() => {
    if (restaurantId) {
      fetchCoupons();
    }
  }, [restaurantId]);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
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
      valid_until: ''
    });
    setFormError(null);
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
      valid_until: coupon.valid_until ? coupon.valid_until.split('T')[0] : ''
    });
    setFormError(null);
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
      const token = localStorage.getItem('auth_token');

      const payload = {
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
        is_active: true
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
      const token = localStorage.getItem('auth_token');
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

  const handleDeleteCoupon = async (coupon: Coupon) => {
    if (!window.confirm(`Are you sure you want to delete coupon "${coupon.code}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/coupons/${coupon.id}`,
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
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <>
      <CouponsContainer>
        <PageHeader title="Coupons">
          <Button primary onClick={handleCreateCoupon}>Create Coupon</Button>
        </PageHeader>

        <Content>
          <SectionCard>
            <SectionTitle>Coupon List</SectionTitle>

            {loading ? (
              <LoadingSpinner>Loading coupons...</LoadingSpinner>
            ) : error ? (
              <EmptyState>
                <EmptyStateText>{error}</EmptyStateText>
                <Button onClick={fetchCoupons}>Retry</Button>
              </EmptyState>
            ) : coupons.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Code</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Discount</TableHeader>
                    <TableHeader>Min Order</TableHeader>
                    <TableHeader>Valid Until</TableHeader>
                    <TableHeader>Usage</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(coupon => {
                    const status = getCouponStatus(coupon);
                    return (
                      <tr key={coupon.id}>
                        <TableCell style={{ fontWeight: 600 }}>{coupon.code}</TableCell>
                        <TableCell>{coupon.name || '-'}</TableCell>
                        <TableCell>{formatDiscount(coupon)}</TableCell>
                        <TableCell>
                          {coupon.min_order > 0 ? formatCurrency(coupon.min_order, currency) : '-'}
                        </TableCell>
                        <TableCell>{formatDate(coupon.valid_until)}</TableCell>
                        <TableCell>
                          {coupon.usage_count} / {coupon.usage_limit || '∞'}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={status}>
                            {status}
                          </StatusBadge>
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <EmptyState>
                <EmptyStateText>No coupons created yet</EmptyStateText>
                <Button primary onClick={handleCreateCoupon}>Create Your First Coupon</Button>
              </EmptyState>
            )}
          </SectionCard>
        </Content>

        {/* 쿠폰 생성/편집 모달 */}
        <Modal isOpen={showModal} onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
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
                <Label>Name</Label>
                <Input
                  type="text"
                  value={couponForm.name}
                  onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })}
                  placeholder="e.g., 10% Off Summer Sale"
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>Discount Type</Label>
                  <Select
                    value={couponForm.type}
                    onChange={(e) => setCouponForm({ ...couponForm, type: e.target.value as 'percentage' | 'fixed' })}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (RM)</option>
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
                  <Label>Min Order Amount</Label>
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
                <FormGroup>
                  <Label>Valid From</Label>
                  <Input
                    type="date"
                    value={couponForm.valid_from}
                    onChange={(e) => setCouponForm({ ...couponForm, valid_from: e.target.value })}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Valid Until</Label>
                  <Input
                    type="date"
                    value={couponForm.valid_until}
                    onChange={(e) => setCouponForm({ ...couponForm, valid_until: e.target.value })}
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Usage Limit</Label>
                <Input
                  type="number"
                  value={couponForm.usage_limit}
                  onChange={(e) => setCouponForm({ ...couponForm, usage_limit: e.target.value })}
                  placeholder="Unlimited"
                  min="1"
                />
              </FormGroup>

              <FormGroup>
                <Label>Description</Label>
                <TextArea
                  value={couponForm.description}
                  onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                  placeholder="Optional description..."
                />
              </FormGroup>

              {formError && <ErrorText>{formError}</ErrorText>}
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setShowModal(false)} disabled={saving}>Cancel</Button>
              <Button primary onClick={handleSaveCoupon} disabled={saving}>
                {saving ? 'Saving...' : (editingCoupon ? 'Update Coupon' : 'Create Coupon')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CouponsContainer>
    </>
  );
};

export default CouponsPage;
