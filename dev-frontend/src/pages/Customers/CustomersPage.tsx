import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useParams } from 'react-router-dom';
import { useCustomer, Customer } from '../../contexts/CustomerContext';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import CustomerModal from '../../components/Customer/CustomerModal';
import Modal, { ModalButton } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { formatPhoneForDisplay } from '../../utils/phoneUtils';
import { formatDateTime } from '../../utils/timezone';
import PageHeader from '../../components/Common/PageHeader';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// 스타일 컴포넌트
const CustomersContainer = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #F9FAFB;
  min-height: 100vh;
`;


const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  border: ${props => props.variant === 'primary' ? 'none' : '1px solid #C7CED6'};
  background: ${props => props.variant === 'primary' ? '#635BFF' : 'white'};
  color: ${props => props.variant === 'primary' ? 'white' : '#4B5563'};
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#5A51E6' : '#F4F6F9'};
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
  color: #4B5563;
  font-size: 16px;
  pointer-events: none;
`;

const SearchInputWithIcon = styled(SearchInput)`
  padding-left: 44px;
`;

const CustomersTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #C7CED6;
  overflow-x: auto;

  @media (max-width: 768px) {
    background: transparent;
    border: none;
    overflow: visible;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(140px, 1.5fr) 80px 80px 70px 100px 100px 140px 36px;
  gap: 12px;
  padding: 14px 20px;
  background: #F1F4F8;
  border-bottom: 1px solid #C7CED6;
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  align-items: center;

  & > span:nth-child(3) { text-align: center; }
  & > span:nth-child(4) { text-align: right; }
  & > span:nth-child(5) { text-align: right; }
  & > span:nth-child(6) { text-align: right; }
  & > span:nth-child(7) { text-align: center; }
  & > span:nth-child(8) { text-align: right; }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div<{ clickable?: boolean }>`
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(140px, 1.5fr) 80px 80px 70px 100px 100px 140px 36px;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #F4F6F9;
  align-items: center;
  transition: all 0.2s;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  & > *:nth-child(3) { text-align: center; justify-self: center; }
  & > *:nth-child(4) { text-align: right; }
  & > *:nth-child(5) { text-align: right; }
  & > *:nth-child(6) { text-align: right; }
  & > *:nth-child(7) { text-align: center; justify-self: center; }
  & > *:nth-child(8) { justify-self: end; }

  &:hover {
    background: ${props => props.clickable ? '#F1F4F8' : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileTableRow = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    background: white;
    border-radius: 8px;
    border: 1px solid #C7CED6;
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
  min-width: 0;
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
      default: return 'linear-gradient(135deg, #4B5563 0%, #374151 100%)';
    }
  }};
`;

const CustomerDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const CustomerName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CustomerMeta = styled.div`
  font-size: 12px;
  color: #4B5563;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
      case 'Silver': return '#F1F4F8';
      default: return '#DBEAFE';
    }
  }};
  color: ${props => {
    switch(props.tier) {
      case 'VIP': return '#92400E';
      case 'Gold': return '#D97706';
      case 'Silver': return '#4B5563';
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
`;

const DeleteButton = styled.button`
  padding: 6px;
  background: #F4F6F9;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;

  &:hover {
    background: #C7CED6;
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
  color: #4B5563;
  display: inline-block;
  line-height: 1;
`;



const EmptyStateText = styled.p`
  font-size: 16px;
  margin-bottom: 24px;
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
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #1F2937;
  font-weight: 500;
`;


const CustomersPage: React.FC = () => {
  const { t } = useTranslation('customers');
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
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [customerCoupons, setCustomerCoupons] = useState<{ available: any[]; history: any[] } | null>(null);
  const [loadingCoupons, setLoadingCoupons] = useState(false);
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

  const handleCustomerClick = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
    setCustomerCoupons(null);
    setLoadingCoupons(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/coupons/customer/${customer.id}?restaurant_id=${restaurantId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setCustomerCoupons(data.data);
    } catch { /* silent */ }
    setLoadingCoupons(false);
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
        setInfoModal({ open: true, title: t('customers:customersPage.deleteFailedTitle', 'Delete Failed'), message: data.message || t('customers:customersPage.deleteFailedMessage', 'Failed to delete customer.') });
      }
    } catch (error) {
      console.error('Delete customer error:', error);
      setInfoModal({ open: true, title: t('customers:customersPage.deleteFailedTitle', 'Delete Failed'), message: t('customers:customersPage.deleteFailedMessage', 'Failed to delete customer.') });
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
    return formatDateTime(dateString, null, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      <CustomersContainer>
        <PageHeader
          title="Customers"
          settingsHref={restaurantId ? `/restaurant/${restaurantId}/settings?tab=membership` : undefined}
          settingsLabel="Membership settings"
        >
          <Button onClick={handleAddCustomer} variant="primary">
            Add Customer
          </Button>
        </PageHeader>

        <Content>
          <FilterBar>
            <FilterSelect
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="all">{t('customers:customersPage.allTiers')}</option>
              <option value="Bronze">{t('customers:customersPage.bronze')}</option>
              <option value="Silver">{t('customers:customersPage.silver')}</option>
              <option value="Gold">{t('customers:customersPage.gold')}</option>
              <option value="VIP">{t('customers:customersPage.vip')}</option>
            </FilterSelect>

            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t('customers:customersPage.allStatus')}</option>
              <option value="active">{t('customers:customersPage.active')}</option>
              <option value="inactive">{t('customers:customersPage.inactive')}</option>
            </FilterSelect>

            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">{t('customers:customersPage.sortByName')}</option>
              <option value="joinDate">{t('customers:customersPage.sortByJoinDate')}</option>
              <option value="totalSpent">{t('customers:customersPage.sortByTotalSpent')}</option>
              <option value="totalOrders">{t('customers:customersPage.sortByOrders')}</option>
              <option value="points">{t('customers:customersPage.sortByPoints')}</option>
            </FilterSelect>

            <SearchContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInputWithIcon
                type="text"
                placeholder="Search customers by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchContainer>
          </FilterBar>

          <StatsGrid>
            <StatCard color="#635BFF">
              <StatLabel>{t('customers:customersPage.totalCustomers')}</StatLabel>
              <StatValue>{stats.totalCustomers}</StatValue>
            </StatCard>
            <StatCard color="#10B981">
              <StatLabel>{t('customers:customersPage.activeCustomers')}</StatLabel>
              <StatValue>{stats.activeCustomers}</StatValue>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatLabel>{t('customers:customersPage.vipMembers')}</StatLabel>
              <StatValue>{stats.vipCustomers}</StatValue>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatLabel>{t('customers:customersPage.avgOrdersPerCustomer')}</StatLabel>
              <StatValue>{stats.averageOrders}</StatValue>
            </StatCard>
          </StatsGrid>

          <CustomersTable>
            <TableHeader style={{ minWidth: '960px' }}>
              <span>{t('customers:customersPage.customer')}</span>
              <span>{t('customers:customersPage.contact')}</span>
              <span>{t('customers:customersPage.tier')}</span>
              <span>{t('customers:customersPage.points')}</span>
              <span>{t('customers:customersPage.orders')}</span>
              <span>{t('customers:customersPage.totalSpent')}</span>
              <span>{t('customers:customersPage.coupons')}</span>
              <span>{t('customers:customersPage.actions')}</span>
              <span></span>
            </TableHeader>
            
            {filteredCustomers.length === 0 ? (
              <EmptyState>
                <EmptyStateText>
                  {searchQuery || tierFilter !== 'all' || statusFilter !== 'all'
                    ? 'No customers match the current filters'
                    : 'No customers registered yet'}
                </EmptyStateText>
                {!(searchQuery || tierFilter !== 'all' || statusFilter !== 'all') && (
                  <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 16, textAlign: 'center', lineHeight: 1.6, maxWidth: 420 }}>
                    Customers are added automatically when they place an online order via the QR menu.<br />
                    You can also add them manually for in-store visitors.
                  </div>
                )}
                <Button variant="primary" onClick={handleAddCustomer}>
                  Add a customer manually
                </Button>
              </EmptyState>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="desktop-only" style={{ minWidth: '960px' }}>
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
                      
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', whiteSpace: 'nowrap' }}>
                          {formatPhoneForDisplay(customer.phone)}
                        </div>
                        {customer.email && (
                          <div style={{ fontSize: '12px', color: '#4B5563', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

                      <div style={{ fontSize: '12px', color: '#4B5563', lineHeight: '1.5' }}>
                        {customer.couponsAvailable > 0 && <div style={{ color: '#059669', fontWeight: 500 }}>{customer.couponsAvailable} available</div>}
                        {customer.couponsUsed > 0 && <div>{customer.couponsUsed} used</div>}
                        {customer.couponsAvailable === 0 && customer.couponsUsed === 0 && <div>—</div>}
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

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4B5563' }}>
                        <span>{customer.points} pts</span>
                        <span>{customer.totalOrders} orders</span>
                        <span style={{ color: '#059669', fontWeight: '600' }}>{formatCurrency(customer.totalSpent, selectedCurrency)}</span>
                      </div>
                      {(customer.couponsAvailable > 0 || customer.couponsUsed > 0) && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '12px' }}>
                          {customer.couponsAvailable > 0 && <span style={{ color: '#059669', fontWeight: 500 }}>{customer.couponsAvailable} coupons available</span>}
                          {customer.couponsUsed > 0 && <span style={{ color: '#4B5563' }}>{customer.couponsUsed} used</span>}
                        </div>
                      )}
                    </MobileTableRow>
                  ))}
                </div>
              </>
            )}
          </CustomersTable>
        </Content>

        {/* Customer Detail Modal */}
        {showDetailModal && (
        <Modal isOpen={true} onClose={() => setShowDetailModal(false)} title="Customer Details">
            
            {selectedCustomer && (
              <>
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
                  <DetailTitle>{t('customers:customersPage.contactInformation')}</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.phoneNumber')}</DetailLabel>
                      <DetailValue>{formatPhoneForDisplay(selectedCustomer.phone)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.emailAddress')}</DetailLabel>
                      <DetailValue>{selectedCustomer.email || 'Not provided'}</DetailValue>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>

                <DetailSection>
                  <DetailTitle>{t('customers:customersPage.accountStatistics')}</DetailTitle>
                  <DetailGrid>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.memberSince')}</DetailLabel>
                      <DetailValue>{formatDate(selectedCustomer.joinDate)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.lastOrder')}</DetailLabel>
                      <DetailValue>
                        {selectedCustomer.lastOrderDate ? formatDate(selectedCustomer.lastOrderDate) : 'No orders yet'}
                      </DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.totalOrders')}</DetailLabel>
                      <DetailValue>{selectedCustomer.totalOrders} orders</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.totalSpent')}</DetailLabel>
                      <DetailValue>{formatCurrency(selectedCustomer.totalSpent, selectedCurrency)}</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.loyaltyPoints')}</DetailLabel>
                      <DetailValue>{selectedCustomer.points.toLocaleString()} points</DetailValue>
                    </DetailItem>
                    <DetailItem>
                      <DetailLabel>{t('customers:customersPage.averageOrderValue')}</DetailLabel>
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
                    <DetailTitle>{t('customers:customersPage.favoriteItems')}</DetailTitle>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedCustomer.favoriteItems.map((itemId, index) => (
                        <span 
                          key={index}
                          style={{
                            padding: '4px 8px',
                            background: '#F1F4F8',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#4B5563'
                          }}
                        >
                          {itemId}
                        </span>
                      ))}
                    </div>
                  </DetailSection>
                )}

                <DetailSection>
                  <DetailTitle>{t('customers:customersPage.coupons')}</DetailTitle>
                  {loadingCoupons ? (
                    <div style={{ color: '#4B5563', fontSize: '14px' }}>{t('customers:customersPage.loading')}</div>
                  ) : customerCoupons ? (
                    <>
                      {customerCoupons.available.length > 0 && (
                        <div style={{ marginBottom: '16px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#059669', marginBottom: '8px' }}>
                            Available ({customerCoupons.available.length})
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {customerCoupons.available.map((c: any) => (
                              <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px' }}>
                                <div>
                                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#059669', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{c.code}</span>
                                  {c.name && <span style={{ fontSize: '12px', color: '#4B5563', marginLeft: '8px' }}>{c.name}</span>}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#1F2937' }}>
                                    {c.type === 'percentage' ? `${c.value}% off` : formatCurrency(c.value, selectedCurrency) + ' off'}
                                  </div>
                                  {c.min_order > 0 && <div style={{ fontSize: '11px', color: '#4B5563' }}>Min. {formatCurrency(c.min_order, selectedCurrency)}</div>}
                                  {c.per_user_limit && <div style={{ fontSize: '11px', color: '#4B5563' }}>{c.my_usage}/{c.per_user_limit} used</div>}
                                  {c.valid_until && <div style={{ fontSize: '11px', color: '#4B5563' }}>Until {formatDateTime(c.valid_until, null, { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {customerCoupons.history.length > 0 && (
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563', marginBottom: '8px' }}>
                            Used ({customerCoupons.history.length})
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {customerCoupons.history.map((h: any, i: number) => (
                              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', background: '#F1F4F8', border: '1px solid #C7CED6', borderRadius: '8px', fontSize: '13px' }}>
                                <div>
                                  <span style={{ fontWeight: 600, fontFamily: 'monospace' }}>{h.code}</span>
                                  <span style={{ color: '#4B5563', marginLeft: '8px' }}>#{h.order_number}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                  <span style={{ fontWeight: 600, color: '#DC2626' }}>-{formatCurrency(h.discount, selectedCurrency)}</span>
                                  <span style={{ color: '#6B7280', marginLeft: '8px', fontSize: '12px' }}>{formatDateTime(h.used_at, null, { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {customerCoupons.available.length === 0 && customerCoupons.history.length === 0 && (
                        <div style={{ color: '#4B5563', fontSize: '14px' }}>{t('customers:customersPage.noCouponsAvailableOrUsed')}</div>
                      )}
                    </>
                  ) : (
                    <div style={{ color: '#4B5563', fontSize: '14px' }}>{t('customers:customersPage.noCouponData')}</div>
                  )}
                </DetailSection>
              </>
            )}
        </Modal>
        )}

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
            <p style={{ color: '#4B5563', fontSize: '14px' }}>
              This will permanently remove the customer and all their data from the system. This action cannot be undone.
            </p>
          </div>
        </Modal>
      </CustomersContainer>

      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText={t('common:ok', 'OK')}
        type="info"
        singleButton
      />

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default CustomersPage;