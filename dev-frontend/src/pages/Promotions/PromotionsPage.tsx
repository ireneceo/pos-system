import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { TabContainer, Tab } from '../../components/UI';

// 스타일 컴포넌트 (대시보드 스타일가이드 준수)
const PromotionsContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    height: auto;
    min-height: 56px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
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
`;

const Content = styled.main`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// TabContainer and Tab components now imported from ../../components/UI

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

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 0;
  color: #6B7C93;
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
`;

const TableCell = styled.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  
  input {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
  }
`;

// 타입 정의
type TabType = 'coupons' | 'discounts';

interface Coupon {
  id: number;
  code: string;
  name: string;
  discount: string;
  validUntil: string;
  used: number;
  limit: number | null;
  status: 'active' | 'inactive' | 'expired';
}

interface DiscountPolicy {
  id: number;
  name: string;
  discount: string;
  requiresApproval: boolean;
  status: 'active' | 'inactive';
}

const PromotionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('coupons');
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [discountPolicies, setDiscountPolicies] = useState<DiscountPolicy[]>([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [editingDiscount, setEditingDiscount] = useState<DiscountPolicy | null>(null);
  
  // 쿠폰 폼 상태
  const [couponForm, setCouponForm] = useState({
    code: '',
    name: '',
    discountType: 'percentage',
    discountValue: '',
    validUntil: '',
    limit: '',
    description: ''
  });
  
  // 할인 정책 폼 상태
  const [discountForm, setDiscountForm] = useState({
    name: '',
    discountType: 'percentage',
    discountValue: '',
    requiresApproval: false,
    description: ''
  });
  
  // 초기 데이터 로드
  React.useEffect(() => {
    const initialCoupons: Coupon[] = [
      {
        id: 1,
        code: 'SUMMER2025',
        name: 'Summer Special',
        discount: '10%',
        validUntil: '2025-08-31',
        used: 45,
        limit: 100,
        status: 'active'
      },
      {
        id: 2,
        code: 'NEWUSER',
        name: 'New Customer',
        discount: 'RM 5',
        validUntil: '2025-12-31',
        used: 120,
        limit: null,
        status: 'active'
      }
    ];
    
    const initialDiscounts: DiscountPolicy[] = [
      {
        id: 1,
        name: 'Staff Discount',
        discount: '20%',
        requiresApproval: false,
        status: 'active'
      },
      {
        id: 2,
        name: 'VIP Customer',
        discount: '15%',
        requiresApproval: true,
        status: 'active'
      }
    ];
    
    setCoupons(initialCoupons);
    setDiscountPolicies(initialDiscounts);
  }, []);
  
  // 쿠폰 관리 함수들
  const handleCreateCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: '',
      name: '',
      discountType: 'percentage',
      discountValue: '',
      validUntil: '',
      limit: '',
      description: ''
    });
    setShowCouponModal(true);
  };
  
  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      name: coupon.name,
      discountType: coupon.discount.includes('%') ? 'percentage' : 'fixed',
      discountValue: coupon.discount.replace(/[%RM\s]/g, ''),
      validUntil: coupon.validUntil,
      limit: coupon.limit?.toString() || '',
      description: ''
    });
    setShowCouponModal(true);
  };
  
  const handleSaveCoupon = () => {
    const discountText = couponForm.discountType === 'percentage' 
      ? `${couponForm.discountValue}%` 
      : `RM ${couponForm.discountValue}`;
    
    const newCoupon: Coupon = {
      id: editingCoupon?.id || Date.now(),
      code: couponForm.code,
      name: couponForm.name,
      discount: discountText,
      validUntil: couponForm.validUntil,
      used: editingCoupon?.used || 0,
      limit: couponForm.limit ? parseInt(couponForm.limit) : null,
      status: 'active'
    };
    
    if (editingCoupon) {
      setCoupons(coupons.map(c => c.id === editingCoupon.id ? newCoupon : c));
    } else {
      setCoupons([...coupons, newCoupon]);
    }
    
    setShowCouponModal(false);
  };
  
  const handleToggleCouponStatus = (id: number) => {
    setCoupons(coupons.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' | 'expired' }
        : c
    ));
  };
  
  // 할인 정책 관리 함수들
  const handleCreateDiscount = () => {
    setEditingDiscount(null);
    setDiscountForm({
      name: '',
      discountType: 'percentage',
      discountValue: '',
      requiresApproval: false,
      description: ''
    });
    setShowDiscountModal(true);
  };
  
  const handleEditDiscount = (discount: DiscountPolicy) => {
    setEditingDiscount(discount);
    setDiscountForm({
      name: discount.name,
      discountType: discount.discount.includes('%') ? 'percentage' : 'fixed',
      discountValue: discount.discount.replace(/[%RM\s]/g, ''),
      requiresApproval: discount.requiresApproval,
      description: ''
    });
    setShowDiscountModal(true);
  };
  
  const handleSaveDiscount = () => {
    const discountText = discountForm.discountType === 'percentage' 
      ? `${discountForm.discountValue}%` 
      : `RM ${discountForm.discountValue}`;
    
    const newDiscount: DiscountPolicy = {
      id: editingDiscount?.id || Date.now(),
      name: discountForm.name,
      discount: discountText,
      requiresApproval: discountForm.requiresApproval,
      status: 'active'
    };
    
    if (editingDiscount) {
      setDiscountPolicies(discountPolicies.map(d => d.id === editingDiscount.id ? newDiscount : d));
    } else {
      setDiscountPolicies([...discountPolicies, newDiscount]);
    }
    
    setShowDiscountModal(false);
  };
  
  const handleToggleDiscountStatus = (id: number) => {
    setDiscountPolicies(discountPolicies.map(d => 
      d.id === id 
        ? { ...d, status: d.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : d
    ));
  };

  return (
    <MainLayout>
      <PromotionsContainer>
        <Header>
          <HeaderTitle>Promotions Management</HeaderTitle>
          <HeaderActions>
            {activeTab === 'coupons' && (
              <Button primary onClick={handleCreateCoupon}>+ Create Coupon</Button>
            )}
            {activeTab === 'discounts' && (
              <Button primary onClick={handleCreateDiscount}>+ Add Discount Policy</Button>
            )}
          </HeaderActions>
        </Header>

      <Content>
        <TabContainer>
          <Tab 
            active={activeTab === 'coupons'} 
            onClick={() => setActiveTab('coupons')}
          >
            Coupons (Mobile)
          </Tab>
          <Tab 
            active={activeTab === 'discounts'} 
            onClick={() => setActiveTab('discounts')}
          >
            Discount Policies (POS)
          </Tab>
        </TabContainer>

        {activeTab === 'coupons' && (
          <SectionCard>
            <SectionTitle>Active Coupons</SectionTitle>
            {coupons.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Code</TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Discount</TableHeader>
                    <TableHeader>Valid Until</TableHeader>
                    <TableHeader>Usage</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(coupon => (
                    <tr key={coupon.id}>
                      <TableCell style={{ fontWeight: 600 }}>{coupon.code}</TableCell>
                      <TableCell>{coupon.name}</TableCell>
                      <TableCell>{coupon.discount}</TableCell>
                      <TableCell>{coupon.validUntil}</TableCell>
                      <TableCell>
                        {coupon.used} / {coupon.limit || '∞'}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={coupon.status}>
                          {coupon.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton onClick={() => handleEditCoupon(coupon)}>Edit</ActionButton>
                          <ActionButton onClick={() => handleToggleCouponStatus(coupon.id)}>
                            {coupon.status === 'active' ? 'Deactivate' : 'Activate'}
                          </ActionButton>
                        </ActionButtons>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>
                <EmptyStateText>No coupons created yet</EmptyStateText>
                <Button primary onClick={handleCreateCoupon}>Create Your First Coupon</Button>
              </EmptyState>
            )}
          </SectionCard>
        )}

        {activeTab === 'discounts' && (
          <SectionCard>
            <SectionTitle>Discount Policies</SectionTitle>
            {discountPolicies.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Policy Name</TableHeader>
                    <TableHeader>Discount</TableHeader>
                    <TableHeader>Approval Required</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {discountPolicies.map(policy => (
                    <tr key={policy.id}>
                      <TableCell style={{ fontWeight: 600 }}>{policy.name}</TableCell>
                      <TableCell>{policy.discount}</TableCell>
                      <TableCell>{policy.requiresApproval ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <StatusBadge status={policy.status}>
                          {policy.status}
                        </StatusBadge>
                      </TableCell>
                      <TableCell>
                        <ActionButtons>
                          <ActionButton onClick={() => handleEditDiscount(policy)}>Edit</ActionButton>
                          <ActionButton onClick={() => handleToggleDiscountStatus(policy.id)}>
                            {policy.status === 'active' ? 'Deactivate' : 'Activate'}
                          </ActionButton>
                        </ActionButtons>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>
                <EmptyStateText>No discount policies created yet</EmptyStateText>
                <Button primary onClick={handleCreateDiscount}>Create Your First Policy</Button>
              </EmptyState>
            )}
          </SectionCard>
        )}
      </Content>
      
      {/* 쿠폰 생성/편집 모달 */}
      <Modal isOpen={showCouponModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editingCoupon ? 'Edit Coupon' : 'Create New Coupon'}</ModalTitle>
            <CloseButton onClick={() => setShowCouponModal(false)}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Coupon Code</Label>
              <Input
                type="text"
                value={couponForm.code}
                onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                placeholder="e.g., SUMMER2025"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Coupon Name</Label>
              <Input
                type="text"
                value={couponForm.name}
                onChange={(e) => setCouponForm({ ...couponForm, name: e.target.value })}
                placeholder="e.g., Summer Special Discount"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Discount Type</Label>
              <Select
                value={couponForm.discountType}
                onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (RM)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Discount Value</Label>
              <Input
                type="number"
                value={couponForm.discountValue}
                onChange={(e) => setCouponForm({ ...couponForm, discountValue: e.target.value })}
                placeholder={couponForm.discountType === 'percentage' ? '10' : '5.00'}
                step={couponForm.discountType === 'percentage' ? '1' : '0.01'}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Valid Until</Label>
              <Input
                type="date"
                value={couponForm.validUntil}
                onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Usage Limit (optional)</Label>
              <Input
                type="number"
                value={couponForm.limit}
                onChange={(e) => setCouponForm({ ...couponForm, limit: e.target.value })}
                placeholder="Leave empty for unlimited use"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description (optional)</Label>
              <TextArea
                value={couponForm.description}
                onChange={(e) => setCouponForm({ ...couponForm, description: e.target.value })}
                placeholder="Describe when and how this coupon can be used..."
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowCouponModal(false)}>Cancel</Button>
            <Button primary onClick={handleSaveCoupon}>
              {editingCoupon ? 'Update Coupon' : 'Create Coupon'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* 할인 정책 생성/편집 모달 */}
      <Modal isOpen={showDiscountModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{editingDiscount ? 'Edit Discount Policy' : 'Create New Discount Policy'}</ModalTitle>
            <CloseButton onClick={() => setShowDiscountModal(false)}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label>Policy Name</Label>
              <Input
                type="text"
                value={discountForm.name}
                onChange={(e) => setDiscountForm({ ...discountForm, name: e.target.value })}
                placeholder="e.g., Staff Discount"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Discount Type</Label>
              <Select
                value={discountForm.discountType}
                onChange={(e) => setDiscountForm({ ...discountForm, discountType: e.target.value })}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (RM)</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Discount Value</Label>
              <Input
                type="number"
                value={discountForm.discountValue}
                onChange={(e) => setDiscountForm({ ...discountForm, discountValue: e.target.value })}
                placeholder={discountForm.discountType === 'percentage' ? '20' : '10.00'}
                step={discountForm.discountType === 'percentage' ? '1' : '0.01'}
              />
            </FormGroup>
            
            <FormGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={discountForm.requiresApproval}
                  onChange={(e) => setDiscountForm({ ...discountForm, requiresApproval: e.target.checked })}
                />
                Requires manager approval
              </CheckboxLabel>
            </FormGroup>
            
            <FormGroup>
              <Label>Description (optional)</Label>
              <TextArea
                value={discountForm.description}
                onChange={(e) => setDiscountForm({ ...discountForm, description: e.target.value })}
                placeholder="Describe when this discount policy applies..."
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowDiscountModal(false)}>Cancel</Button>
            <Button primary onClick={handleSaveDiscount}>
              {editingDiscount ? 'Update Policy' : 'Create Policy'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PromotionsContainer>
    </MainLayout>
  );
};

export default PromotionsPage;