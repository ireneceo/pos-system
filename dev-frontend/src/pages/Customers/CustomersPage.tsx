import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { useCustomer, Customer } from '../../contexts/CustomerContext';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import CustomerModal from '../../components/Customer/CustomerModal';
import Modal, { ModalButton } from '../../components/UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { formatPhoneForDisplay } from '../../utils/phoneUtils';
import PageHeader from '../../components/common/PageHeader';

// 스타일 컴포넌트
const CustomersContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  min-height: 100vh;
`;


const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #E6EBF1'};
  background: ${props => props.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#6B7C93'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#5A51E6' : '#F6F9FC'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
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

const SearchContainer = styled.div`
  flex: 0 0 400px;
  max-width: 400px;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #6B7C93;
  font-size: 16px;
  pointer-events: none;
`;

const SearchInputWithIcon = styled(SearchInput)`
  padding-left: 44px;
`;

const CustomersTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 120px 100px 100px 120px 150px 40px;
  gap: 16px;
  padding: 16px 20px;
  background: #F8FAFC;
  border-bottom: 1px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const TableRow = styled.div<{ clickable?: boolean }>`
  display: grid;
  grid-template-columns: 1fr 1fr 120px 100px 100px 120px 150px 40px;
  gap: 16px;
  padding: 16px 20px;
  border-bottom: 1px solid #F6F9FC;
  align-items: center;
  transition: all 0.2s;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  &:hover {
    background: ${props => props.clickable ? '#F8FAFC' : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 16px;
  }
`;

const MobileTableRow = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    background: white;
    border-radius: 8px;
    border: 1px solid #E6EBF1;
    padding: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CustomerAvatar = styled.div<{ tier: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: white;
  background: ${props => {
    switch(props.tier) {
      case 'VIP': return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
      case 'Gold': return 'linear-gradient(135deg, #FFB800 0%, #FF8C00 100%)';
      case 'Silver': return 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)';
      default: return 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
    }
  }};
`;

const CustomerDetails = styled.div`
  flex: 1;
`;

const CustomerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
`;

const CustomerMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const LoyaltyBadge = styled.span<{ tier: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.tier) {
      case 'VIP': return '#FEF3C7';
      case 'Gold': return '#FDE68A';
      case 'Silver': return '#F3F4F6';
      default: return '#DBEAFE';
    }
  }};
  color: ${props => {
    switch(props.tier) {
      case 'VIP': return '#92400E';
      case 'Gold': return '#D97706';
      case 'Silver': return '#6B7280';
      default: return '#1E40AF';
    }
  }};
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.active ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
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

const DeleteButton = styled.button`
  padding: 6px;
  background: #F6F9FC;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #E6EBF1;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 6px;
    min-width: 30px;
    min-height: 30px;
  }
`;

const IconSymbol = styled.span`
  font-size: 14px;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;
  display: inline-block;
  line-height: 1;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7C93;
`;


const EmptyStateText = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
`;

const CustomerDetailModal = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 85vh;
  overflow: auto;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  padding: 24px 24px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #F1F5F9;
  margin-bottom: 0;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748B;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background: #F1F5F9;
    color: #475569;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const DetailSection = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 12px 0;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`;


const CustomersPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const {
    customers,
    searchCustomers,
    setShowCustomerModal,
    setCustomerModalMode,
    updateCustomer,
    reloadCustomers
  } = useCustomer();

  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');

  // 페이지 마운트 시 현재 레스토랑의 고객 목록 로드
  useEffect(() => {
    if (restaurantId) {
      reloadCustomers(restaurantId);
    }
  }, [restaurantId, reloadCustomers]);

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  // 필터링 및 정렬 로직
  useEffect(() => {
    let filtered = searchQuery ? searchCustomers(searchQuery) : customers;
    
    // 티어 필터
    if (tierFilter !== 'all') {
      filtered = filtered.filter(customer => customer.loyaltyTier === tierFilter);
    }
    
    // 상태 필터
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(customer => customer.isActive === isActive);
    }
    
    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        case 'totalOrders':
          return b.totalOrders - a.totalOrders;
        case 'points':
          return b.points - a.points;
        default:
          return 0;
      }
    });
    
    setFilteredCustomers(filtered);
  }, [customers, searchQuery, tierFilter, statusFilter, sortBy, searchCustomers]);

  // 통계 계산
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.isActive).length,
    vipCustomers: customers.filter(c => c.loyaltyTier === 'VIP').length,
    averageOrders: customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + c.totalOrders, 0) / customers.length) : 0
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const handleToggleStatus = async (customer: Customer) => {
    await updateCustomer(customer.id, { isActive: !customer.isActive });
  };

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!customerToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/customers/${customerToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // 성공 시 Context에서 고객 제거 (CustomerContext refresh 필요)
        window.location.reload(); // 임시로 리로드, 나중에 Context 업데이트 함수로 대체 가능
      } else {
        alert(data.message || 'Failed to delete customer');
      }
    } catch (error) {
      console.error('Delete customer error:', error);
      alert('Failed to delete customer');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
      setCustomerToDelete(null);
    }
  };

  const handleAddCustomer = () => {
    setCustomerModalMode('register');
    setShowCustomerModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <MainLayout>
      <CustomersContainer>
        <PageHeader title="Customers">
          <Button onClick={handleAddCustomer} variant="primary">
            + Add Customer
          </Button>
        </PageHeader>

        <Content>
          <FilterBar>
            <SearchContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInputWithIcon
                type="text"
                placeholder="Search customers by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>

            <FilterSelect
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="all">All Tiers</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="VIP">VIP</option>
            </FilterSelect>

            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>

            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="joinDate">Sort by Join Date</option>
              <option value="totalSpent">Sort by Total Spent</option>
              <option value="totalOrders">Sort by Orders</option>
              <option value="points">Sort by Points</option>
            </FilterSelect>
          </FilterBar>

          <StatsGrid>
            <StatCard color="#635BFF">
              <StatLabel>Total Customers</StatLabel>
              <StatValue>{stats.totalCustomers}</StatValue>
            </StatCard>
            <StatCard color="#10B981">
              <StatLabel>Active Customers</StatLabel>
              <StatValue>{stats.activeCustomers}</StatValue>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatLabel>VIP Members</StatLabel>
              <StatValue>{stats.vipCustomers}</StatValue>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatLabel>Avg Orders per Customer</StatLabel>
              <StatValue>{stats.averageOrders}</StatValue>
            </StatCard>
          </StatsGrid>

          <CustomersTable>
            <TableHeader className="desktop-only">
              <span>Customer</span>
              <span>Contact</span>
              <span>Tier</span>
              <span>Points</span>
              <span>Orders</span>
              <span>Total Spent</span>
              <span>Actions</span>
              <span></span>
            </TableHeader>
            
            {filteredCustomers.length === 0 ? (
              <EmptyState>
                <EmptyStateText>
                  {searchQuery || tierFilter !== 'all' || statusFilter !== 'all'
                    ? 'No customers found with the current filters'
                    : 'No customers registered yet'
                  }
                </EmptyStateText>
                <Button variant="primary" onClick={handleAddCustomer}>
                  Add First Customer
                </Button>
              </EmptyState>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="desktop-only">
                  {filteredCustomers.map(customer => (
                    <TableRow key={customer.id} clickable onClick={() => handleCustomerClick(customer)}>
                      <CustomerInfo>
                        <CustomerAvatar tier={customer.loyaltyTier}>
                          {getInitials(customer.name)}
                        </CustomerAvatar>
                        <CustomerDetails>
                          <CustomerName>{customer.name}</CustomerName>
                          <CustomerMeta>
                            Joined {formatDate(customer.joinDate)}
                            {customer.lastOrderDate && ` • Last order ${formatDate(customer.lastOrderDate)}`}
                          </CustomerMeta>
                        </CustomerDetails>
                      </CustomerInfo>
                      
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                          {formatPhoneForDisplay(customer.phone)}
                        </div>
                        {customer.email && (
                          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                            {customer.email}
                          </div>
                        )}
                      </div>
                      
                      <LoyaltyBadge tier={customer.loyaltyTier}>
                        {customer.loyaltyTier}
                      </LoyaltyBadge>
                      
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                        {customer.points.toLocaleString()}
                      </div>
                      
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>
                        {customer.totalOrders}
                      </div>
                      
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#059669' }}>
                        {formatCurrency(customer.totalSpent, selectedCurrency)}
                      </div>
                      
                      <ActionButtons onClick={(e) => e.stopPropagation()}>
                        <ActionButton onClick={() => handleCustomerClick(customer)}>
                          View
                        </ActionButton>
                        <ActionButton onClick={() => handleToggleStatus(customer)}>
                          {customer.isActive ? 'Deactivate' : 'Activate'}
                        </ActionButton>
                      </ActionButtons>

                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(customer);
                        }}
                        title="Delete customer"
                      >
                        <IconSymbol>✕</IconSymbol>
                      </DeleteButton>
                    </TableRow>
                  ))}
                </div>

                {/* Mobile Cards */}
                <div className="mobile-only">
                  {filteredCustomers.map(customer => (
                    <MobileTableRow key={customer.id} onClick={() => handleCustomerClick(customer)}>
                      <CustomerInfo style={{ marginBottom: '12px' }}>
                        <CustomerAvatar tier={customer.loyaltyTier}>
                          {getInitials(customer.name)}
                        </CustomerAvatar>
                        <CustomerDetails>
                          <CustomerName>{customer.name}</CustomerName>
                          <CustomerMeta>{formatPhoneForDisplay(customer.phone)}</CustomerMeta>
                        </CustomerDetails>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                          <DeleteButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(customer);
                            }}
                            title="Delete customer"
                            style={{ marginBottom: '4px' }}
                          >
                            <IconSymbol>✕</IconSymbol>
                          </DeleteButton>
                          <LoyaltyBadge tier={customer.loyaltyTier}>
                            {customer.loyaltyTier}
                          </LoyaltyBadge>
                          <StatusBadge active={customer.isActive}>
                            {customer.isActive ? 'Active' : 'Inactive'}
                          </StatusBadge>
                        </div>
                      </CustomerInfo>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6B7280' }}>
                        <span>{customer.points} pts</span>
                        <span>{customer.totalOrders} orders</span>
                        <span style={{ color: '#059669', fontWeight: '600' }}>{formatCurrency(customer.totalSpent, selectedCurrency)}</span>
                      </div>
                    </MobileTableRow>
                  ))}
                </div>
              </>
            )}
          </CustomersTable>
        </Content>

        {/* Customer Detail Modal */}
        <CustomerDetailModal isOpen={showDetailModal} onClick={() => setShowDetailModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Customer Details</ModalTitle>
              <CloseButton onClick={() => setShowDetailModal(false)}>×</CloseButton>
            </ModalHeader>
            
            {selectedCustomer && (
              <ModalBody>
                <DetailSection>
                  <CustomerInfo style={{ marginBottom: '16px' }}>
                    <CustomerAvatar tier={selectedCustomer.loyaltyTier}>
                      {getInitials(selectedCustomer.name)}
                    </CustomerAvatar>
                    <CustomerDetails>
                      <CustomerName style={{ fontSize: '18px', marginBottom: '4px' }}>
                        {selectedCustomer.name}
                      </CustomerName>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <LoyaltyBadge tier={selectedCustomer.loyaltyTier}>
                          {selectedCustomer.loyaltyTier}
                        </LoyaltyBadge>
                        <StatusBadge active={selectedCustomer.isActive}>
                          {selectedCustomer.isActive ? 'Active' : 'Inactive'}
                        </StatusBadge>
                      </div>
                    </CustomerDetails>
                  </CustomerInfo>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Contact Information</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Phone Number</DetailLabel>
                      <DetailValue>{formatPhoneForDisplay(selectedCustomer.phone)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Email Address</DetailLabel>
                      <DetailValue>{selectedCustomer.email || 'Not provided'}</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>Account Statistics</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>Member Since</DetailLabel>
                      <DetailValue>{formatDate(selectedCustomer.joinDate)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Last Order</DetailLabel>
                      <DetailValue>
                        {selectedCustomer.lastOrderDate ? formatDate(selectedCustomer.lastOrderDate) : 'No orders yet'}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Total Orders</DetailLabel>
                      <DetailValue>{selectedCustomer.totalOrders} orders</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Total Spent</DetailLabel>
                      <DetailValue>{formatCurrency(selectedCustomer.totalSpent, selectedCurrency)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Loyalty Points</DetailLabel>
                      <DetailValue>{selectedCustomer.points.toLocaleString()} points</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>Average Order Value</DetailLabel>
                      <DetailValue>
                        {formatCurrency(selectedCustomer.totalOrders > 0
                          ? (selectedCustomer.totalSpent / selectedCustomer.totalOrders)
                          : 0, selectedCurrency)}
                      </DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>

                {selectedCustomer.favoriteItems.length > 0 && (
                  <DetailSection>
                    <DetailTitle>Favorite Items</DetailTitle>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedCustomer.favoriteItems.map((itemId, index) => (
                        <span 
                          key={index}
                          style={{
                            padding: '4px 8px',
                            background: '#F3F4F6',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#6B7280'
                          }}
                        >
                          {itemId}
                        </span>
                      ))}
                    </div>
                  </DetailSection>
                )}

                <DetailSection>
                  <DetailTitle>Recent Activity</DetailTitle>
                  <div style={{ color: '#6B7280', fontSize: '14px', fontStyle: 'italic' }}>
                    Order history integration coming soon...
                  </div>
                </DetailSection>
              </ModalBody>
            )}
          </ModalContent>
        </CustomerDetailModal>

        <CustomerModal />

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => !isDeleting && setShowDeleteModal(false)}
          title="Delete Customer"
          footer={
            <>
              <ModalButton
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
              >
                Cancel
              </ModalButton>
              <ModalButton
                variant="danger"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </ModalButton>
            </>
          }
        >
          <div>
            <p style={{ marginBottom: '16px', color: '#1F2937' }}>
              Are you sure you want to delete <strong>{customerToDelete?.name}</strong>?
            </p>
            <p style={{ color: '#6B7280', fontSize: '14px' }}>
              This will permanently remove the customer and all their data from the system. This action cannot be undone.
            </p>
          </div>
        </Modal>
      </CustomersContainer>
      
      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </MainLayout>
  );
};

export default CustomersPage;