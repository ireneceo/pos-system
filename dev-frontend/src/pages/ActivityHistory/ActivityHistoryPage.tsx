import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { BaseButton, StatusBadge } from '../../components/UI/CommonStyles';
import { FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';

const FilterSection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #E6EBF1;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
`;

const FilterInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.15s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const ActivityList = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F8FAFC;
  }
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ActivityInfo = styled.div`
  flex: 1;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #8898AA;
  margin-bottom: 4px;
`;

const ActivityUser = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ActivityDescription = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.5;
`;

const ActivityBadges = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const EntityBadge = styled(StatusBadge)`
  font-size: 11px;
  padding: 4px 10px;
`;

const EmptyState = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
`;

const PageInfo = styled.div`
  font-size: 14px;
  color: #6B7C93;
  margin: 0 16px;
`;

const LoadingState = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: #8898AA;
  font-size: 14px;
`;

interface ActivityLog {
  id: number;
  user_id: number;
  user_name: string;
  entity_type: string;
  entity_id: number;
  action_type: string;
  description: string;
  changes: any;
  created_at: string;
}

const ActivityHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  // Filters
  const [entityType, setEntityType] = useState('');
  const [actionType, setActionType] = useState('');
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const limit = 50;

  useEffect(() => {
    fetchActivityLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, entityType, actionType, userId, startDate, endDate]);

  const fetchActivityLogs = async () => {
    if (!user?.restaurantId) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });

      if (entityType) params.append('entity_type', entityType);
      if (actionType) params.append('action_type', actionType);
      if (userId) params.append('user_id', userId);
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);

      const response = await fetch(`/api/activity-logs/restaurant/${user.restaurantId}?${params}`);

      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
        setTotalPages(data.totalPages || 1);
        setTotalLogs(data.totalLogs || 0);
      } else {
        console.error('Failed to fetch activity logs');
        setLogs([]);
      }
    } catch (error) {
      console.error('Error fetching activity logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEntityTypeColor = (type: string): 'info' | 'success' | 'warning' | 'error' => {
    switch (type) {
      case 'menu_item': return 'info';
      case 'settings': return 'warning';
      case 'staff': return 'success';
      case 'category': return 'info';
      case 'order': return 'success';
      default: return 'info';
    }
  };

  const getActionTypeColor = (type: string): 'success' | 'info' | 'error' => {
    switch (type) {
      case 'create': return 'success';
      case 'update': return 'info';
      case 'delete': return 'error';
      default: return 'info';
    }
  };

  const formatEntityType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatActionType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleResetFilters = () => {
    setEntityType('');
    setActionType('');
    setUserId('');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const hasActiveFilters = entityType || actionType || userId || startDate || endDate;

  return (
    <>
      <Container>
        <Header>
          <Title>Activity History</Title>
        </Header>

        <Content>
          <FilterSection>
            <FilterGrid>
              <FilterGroup>
                <FilterLabel>Entity Type</FilterLabel>
                <FilterSelect value={entityType} onChange={(e) => { setEntityType(e.target.value); setCurrentPage(1); }}>
                  <option value="">All Types</option>
                  <option value="menu_item">Menu Item</option>
                  <option value="category">Category</option>
                  <option value="settings">Settings</option>
                  <option value="staff">Staff</option>
                  <option value="order">Order</option>
                  <option value="customer">Customer</option>
                  <option value="promotion">Promotion</option>
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Action Type</FilterLabel>
                <FilterSelect value={actionType} onChange={(e) => { setActionType(e.target.value); setCurrentPage(1); }}>
                  <option value="">All Actions</option>
                  <option value="create">Create</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                </FilterSelect>
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>Start Date</FilterLabel>
                <FilterInput
                  type="date"
                  value={startDate}
                  onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
                />
              </FilterGroup>

              <FilterGroup>
                <FilterLabel>End Date</FilterLabel>
                <FilterInput
                  type="date"
                  value={endDate}
                  onChange={(e) => { setEndDate(e.target.value); setCurrentPage(1); }}
                />
              </FilterGroup>
            </FilterGrid>

            {hasActiveFilters && (
              <div style={{ textAlign: 'right' }}>
                <BaseButton variant="secondary" size="small" onClick={handleResetFilters}>
                  Reset Filters
                </BaseButton>
              </div>
            )}
          </FilterSection>

          {loading ? (
            <LoadingState>Loading activity logs...</LoadingState>
          ) : logs.length === 0 ? (
            <ActivityList>
              <EmptyState>No activity logs found</EmptyState>
            </ActivityList>
          ) : (
            <>
              <ActivityList>
                {logs.map((log) => (
                  <ActivityItem key={log.id}>
                    <ActivityHeader>
                      <ActivityInfo>
                        <ActivityTime>{formatRelativeTime(log.created_at)}</ActivityTime>
                        <ActivityUser>{log.user_name}</ActivityUser>
                        <ActivityDescription>{log.description}</ActivityDescription>
                      </ActivityInfo>
                      <ActivityBadges>
                        <EntityBadge status={getEntityTypeColor(log.entity_type)}>
                          {formatEntityType(log.entity_type)}
                        </EntityBadge>
                        <EntityBadge status={getActionTypeColor(log.action_type)}>
                          {formatActionType(log.action_type)}
                        </EntityBadge>
                      </ActivityBadges>
                    </ActivityHeader>
                  </ActivityItem>
                ))}
              </ActivityList>

              <PaginationContainer>
                <BaseButton
                  variant="secondary"
                  size="small"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </BaseButton>
                <PageInfo>
                  Page {currentPage} of {totalPages} ({totalLogs} total logs)
                </PageInfo>
                <BaseButton
                  variant="secondary"
                  size="small"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </BaseButton>
              </PaginationContainer>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default ActivityHistoryPage;
