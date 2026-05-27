import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { BaseButton, StatusBadge } from '../../components/UI/CommonStyles';
import { FilterSelect } from '../../components/Common/FilterComponents';
import DatePeriodFilter, { PeriodType, calculatePeriodDateRange } from '../../components/Common/DatePeriodFilter';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';


import { getAuthToken } from '../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../utils/timezone';
const ActivityList = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid #C7CED6;
  transition: all 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #F1F4F8;
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
  color: #1F2937;
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


const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #C7CED6;
`;

const PageInfo = styled.div`
  font-size: 14px;
  color: #4B5563;
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
  username: string;
  full_name: string | null;
  entity_type: string;
  entity_id: string | null;
  entity_name: string | null;
  action_type: string;
  description: string;
  changes: any;
  created_at: string;
}

const ActivityHistoryPage: React.FC = () => {
  const { t } = useTranslation('admin');
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
  const [activePeriod, setActivePeriod] = useState<PeriodType>('all');
  const [dateRange, setDateRange] = useState(() => calculatePeriodDateRange('all'));
  const [isCustomDateRange, setIsCustomDateRange] = useState(false);

  const limit = 50;

  useEffect(() => {
    fetchActivityLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, entityType, actionType, userId, dateRange.start, dateRange.end]);

  const fetchActivityLogs = async () => {
    const authUser = user as any;
    const restId = authUser?.restaurantId || authUser?.restaurant_id;
    const uid = authUser?.id;

    if (!restId && !uid) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });

      if (entityType) params.append('entity_type', entityType);
      if (actionType) params.append('action_type', actionType);
      if (userId) params.append('user_id', userId);
      if (dateRange.start) params.append('start_date', dateRange.start);
      if (dateRange.end) params.append('end_date', dateRange.end);

      const token = getAuthToken();
      // Restaurant Admin/Staff: query by restaurant_id, others: query by user_id
      const apiPath = restId
        ? `/api/activity-logs/restaurant/${restId}`
        : `/api/activity-logs/user/${uid}`;
      const response = await fetch(`${apiPath}?${params}`, {
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        setLogs(data.logs || []);
        setTotalPages(data.pagination?.totalPages || data.totalPages || 1);
        setTotalLogs(data.pagination?.total || data.totalLogs || 0);
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

    return formatDateTimeTz(date, null);
  };

  const getEntityTypeColor = (type: string): 'info' | 'success' | 'warning' | 'error' => {
    switch (type) {
      case 'menu_item': return 'info';
      case 'settings': return 'warning';
      case 'staff': return 'success';
      case 'category': return 'info';
      case 'invoice': return 'warning';
      case 'table': return 'info';
      case 'promotion': return 'success';
      case 'order_item': return 'error';
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

  const handlePeriodChange = (period: PeriodType) => {
    setActivePeriod(period);
    setDateRange(calculatePeriodDateRange(period));
    setIsCustomDateRange(false);
    setCurrentPage(1);
  };

  const handleCalendarRangeSelect = (start: string, end: string) => {
    setDateRange({ start, end });
    setIsCustomDateRange(true);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setEntityType('');
    setActionType('');
    setUserId('');
    setActivePeriod('all');
    setDateRange(calculatePeriodDateRange('all'));
    setIsCustomDateRange(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = entityType || actionType || userId || activePeriod !== 'all' || isCustomDateRange;

  return (
    <>
      <Container>
        <Header>
          <Title>{t('admin:activityHistoryPage.activityHistory')}</Title>
        </Header>

        <Content>
          <DatePeriodFilter
            activePeriod={activePeriod}
            dateRange={dateRange}
            isCustomDateRange={isCustomDateRange}
            onPeriodChange={handlePeriodChange}
            onCalendarRangeSelect={handleCalendarRangeSelect}
          >
            <FilterSelect value={entityType} onChange={(e) => { setEntityType(e.target.value); setCurrentPage(1); }}>
              <option value="">{t('admin:activityHistoryPage.allTypes')}</option>
              <option value="menu_item">{t('admin:activityHistoryPage.menuItem')}</option>
              <option value="category">{t('admin:activityHistoryPage.category')}</option>
              <option value="settings">{t('admin:activityHistoryPage.settings')}</option>
              <option value="staff">{t('admin:activityHistoryPage.staff')}</option>
              <option value="invoice">{t('admin:activityHistoryPage.invoice')}</option>
              <option value="subscription">{t('admin:activityHistoryPage.subscription')}</option>
              <option value="table">{t('admin:activityHistoryPage.table')}</option>
              <option value="promotion">{t('admin:activityHistoryPage.promotion')}</option>
              <option value="order_item">{t('admin:activityHistoryPage.orderItem')}</option>
            </FilterSelect>
            <FilterSelect value={actionType} onChange={(e) => { setActionType(e.target.value); setCurrentPage(1); }}>
              <option value="">{t('admin:activityHistoryPage.allActions')}</option>
              <option value="create">{t('admin:activityHistoryPage.create')}</option>
              <option value="update">{t('admin:activityHistoryPage.update')}</option>
              <option value="delete">{t('admin:activityHistoryPage.delete')}</option>
            </FilterSelect>
            {hasActiveFilters && (
              <BaseButton variant="secondary" size="small" onClick={handleResetFilters}>
                Reset Filters
              </BaseButton>
            )}
          </DatePeriodFilter>

          {loading ? (
            <LoadingState>{t('admin:activityHistoryPage.loadingActivityLogs')}</LoadingState>
          ) : logs.length === 0 ? (
            <ActivityList>
              <EmptyState>{t('admin:activityHistoryPage.noActivityLogsFound')}</EmptyState>
            </ActivityList>
          ) : (
            <>
              <ActivityList>
                {logs.map((log) => (
                  <ActivityItem key={log.id}>
                    <ActivityHeader>
                      <ActivityInfo>
                        <ActivityTime>{formatRelativeTime(log.created_at)}</ActivityTime>
                        <ActivityUser>{log.full_name || log.username}</ActivityUser>
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
