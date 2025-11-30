import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  restaurant: string;
  registeredDate: string;
  lastVisit: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points: number;
}

const Container = styled.div`
  min-height: 100vh;
  background: #FAFBFC;
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

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Content = styled.div`
  padding: 32px;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  border-bottom: 2px solid #E6EBF1;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #F1F5F9;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: #F8FAFC;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 16px 12px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: 16px 12px;
  font-size: 14px;
  color: #374151;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'active': return '#DEF7EC';
      case 'inactive': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'active': return '#065F46';
      case 'inactive': return '#991B1B';
      default: return '#374151';
    }
  }};
`;

const TierBadge = styled.span<{ tier: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  background: ${props => {
    switch (props.tier) {
      case 'platinum': return '#ECFDF5';
      case 'gold': return '#FFFBEB';
      case 'silver': return '#F8FAFC';
      case 'bronze': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.tier) {
      case 'platinum': return '#065F46';
      case 'gold': return '#92400E';
      case 'silver': return '#475569';
      case 'bronze': return '#991B1B';
      default: return '#374151';
    }
  }};
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6B7C93;
  font-size: 14px;
`;

const ManagerCustomersPage: React.FC = () => {
  // const { } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');

  // Load customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);

        // TODO: Get restaurant ID from user context or manager's assigned restaurants
        // For now, using restaurant ID 1 as placeholder
        const restaurantId = 1;

        const response = await fetch(`/api/customers/${restaurantId}`);
        const result = await response.json();

        if (result.success) {
          const apiCustomers = (result.data || result).map((item: any) => ({
            id: item.customer.id,
            name: item.customer.name,
            phone: item.customer.phone,
            email: item.customer.email || '',
            restaurant: '', // Restaurant name should be fetched separately
            registeredDate: item.first_order_at ? new Date(item.first_order_at).toISOString().split('T')[0] : '',
            lastVisit: item.last_order_at ? new Date(item.last_order_at).toISOString().split('T')[0] : '',
            totalOrders: item.total_orders || 0,
            totalSpent: parseFloat(item.total_spent || 0),
            status: (item.last_order_at && new Date(item.last_order_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) ? 'active' : 'inactive',
            tier: item.loyalty_tier?.toLowerCase() || 'bronze',
            points: item.points || 0
          }));

          console.log('ManagerCustomersPage - Loaded customers from API:', apiCustomers.length);
          setCustomers(apiCustomers);
        } else {
          console.error('ManagerCustomersPage - Failed to load customers:', result.error);
          setCustomers([]);
        }
      } catch (error) {
        console.error('ManagerCustomersPage - Error loading customers:', error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesTier = tierFilter === 'all' || customer.tier === tierFilter;
    const matchesRestaurant = selectedRestaurant === 'all' || customer.restaurant === selectedRestaurant;

    return matchesSearch && matchesStatus && matchesTier && matchesRestaurant;
  });

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = customers.length > 0 ? totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0) : 0;

  return (
    <MainLayout>
      <Container>
        <Header>
          <HeaderContent>
            <PageTitle>Customer Management</PageTitle>
          </HeaderContent>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{totalCustomers}</StatValue>
              <StatLabel>Total Customers</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{activeCustomers}</StatValue>
              <StatLabel>Active Customers</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>RM {totalRevenue.toLocaleString()}</StatValue>
              <StatLabel>Total Revenue</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>RM {avgOrderValue.toFixed(2)}</StatValue>
              <StatLabel>Avg Order Value</StatLabel>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <SearchInput
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </FilterSelect>
            <FilterSelect value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
              <option value="all">All Tiers</option>
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </FilterSelect>
            <FilterSelect value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)}>
              <option value="all">All Restaurants</option>
              <option value="Korean BBQ House">Korean BBQ House</option>
              <option value="Nasi Lemak Wangi">Nasi Lemak Wangi</option>
              <option value="Seoul Garden BBQ">Seoul Garden BBQ</option>
            </FilterSelect>
          </FilterBar>

          <TableContainer>
            {loading ? (
              <LoadingText>Loading customers...</LoadingText>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Customer</TableHeaderCell>
                    <TableHeaderCell>Contact</TableHeaderCell>
                    <TableHeaderCell>Restaurant</TableHeaderCell>
                    <TableHeaderCell>Orders</TableHeaderCell>
                    <TableHeaderCell>Total Spent</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Tier</TableHeaderCell>
                    <TableHeaderCell>Points</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{customer.name}</div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>
                            Joined: {new Date(customer.registeredDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div style={{ marginBottom: '4px' }}>{customer.phone}</div>
                          <div style={{ fontSize: '12px', color: '#6B7280' }}>{customer.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.restaurant}</TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>RM {customer.totalSpent.toLocaleString()}</TableCell>
                      <TableCell>
                        <StatusBadge status={customer.status}>{customer.status}</StatusBadge>
                      </TableCell>
                      <TableCell>
                        <TierBadge tier={customer.tier}>{customer.tier}</TierBadge>
                      </TableCell>
                      <TableCell>{customer.points.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            )}
          </TableContainer>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default ManagerCustomersPage;