import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Header, Title, Content, Button, ActionSection } from '../../components/UI/PageComponents';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { Tabs, Tab, Badge as TabBadge } from '../../components/Common/TabComponents';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useTabParam } from '../../hooks/useTabParam';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import CommentSection from '../../components/Common/CommentSection';
import { linkifyText } from '../../utils/linkify';
import { Modal as CommonModal } from '../../components/UI';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDateTime as tzFormatDateTime, formatDate as tzFormatDate } from '../../utils/timezone';
// ============================================================================
// TypeScript Interfaces
// ============================================================================

interface Notice {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  author_role: string;
  target_type: string;
  target_roles: string[] | null;
  brand_id: number | null;
  foodcourt_id: number | null;
  priority: 'normal' | 'important' | 'urgent';
  status: string;
  createdAt: string;
  recipients: any[];
  category?: 'general' | 'guide' | 'updates';
  commentCount: number;
  attachments?: any[];
  brand?: any;
  foodcourt?: any;
  author?: any;
  read_at?: string | null;
}

interface NoticeMetadata {
  canSend: boolean;
  targetOptions: Array<{ value: string; label: string }>;
  restaurants: Array<{ id: number; name: string }>;
  brands: Array<{ id: number; name: string }>;
  foodcourts: Array<{ id: number; name: string }>;
}

// ============================================================================
// Styled Components
// ============================================================================

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: flex-start;
  background: transparent;
  border: none;
  padding: 0;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 12px;

    > * {
      width: 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
    }
  }
`;

const NoticesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const NoticeCard = styled.div<{ unread?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${props => props.unread && `
    border-left: 4px solid #635BFF;
  `}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const NoticeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`;

const NoticeInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
  margin-top: 8px;
`;

const NoticeTitleText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const NoticeMeta = styled.div`
  font-size: 13px;
  color: #6B7C93;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.priority) {
      case 'urgent': return '#FEE2E2';
      case 'important': return '#FEF3C7';
      default: return '#E3E8EE';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'urgent': return '#991B1B';
      case 'important': return '#92400E';
      default: return '#6B7280';
    }
  }};
`;

const NoticePreview = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 12px;
`;

const NoticeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`;

const CommentCount = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6B7C93;
`;

const RecipientInfo = styled.span`
  color: #6B7C93;
  font-size: 12px;
`;

// ============================================================================
// Modal Styled Components
// ============================================================================


// ============================================================================
// Form Styled Components
// ============================================================================

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #6B7C93;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
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

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: all 0.15s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 120px;
  transition: all 0.15s;
  font-family: inherit;

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

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ============================================================================
// Multi-Select Restaurant Checkbox Styled Components
// ============================================================================

const CheckboxList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 8px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  transition: background 0.1s;

  &:hover {
    background: #F8FAFC;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`;

const SelectAllRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #E6EBF1;
`;

const SelectAllButton = styled.button`
  background: none;
  border: none;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const SelectedCount = styled.span`
  font-size: 13px;
  color: #6B7C93;
`;

// ============================================================================
// View Notice Modal Styled Components
// ============================================================================

const NoticeDetailContent = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  margin-bottom: 24px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`;

const NoticeDetailMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #6B7C93;
`;

const NoticeDetailMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RecipientsSection = styled.div`
  margin-bottom: 24px;
`;

const RecipientsSectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const RecipientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const RecipientTag = styled.span`
  padding: 4px 10px;
  background: #EEF2FF;
  color: #4338CA;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;


const DeleteNoticeButton = styled.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`;

const ViewModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// ============================================================================
// NoticesPage Component
// ============================================================================

const NoticesPage: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();

  // Data state
  const [receivedNotices, setReceivedNotices] = useState<Notice[]>([]);
  const [sentNotices, setSentNotices] = useState<Notice[]>([]);
  const [metadata, setMetadata] = useState<NoticeMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  // Tab & filter state
  const [activeTab, setActiveTab] = useTabParam<'received' | 'sent'>('received');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'guide' | 'updates'>('all');
  const [authorRoleFilter, setAuthorRoleFilter] = useState('all');

  // New Notice modal state
  const [showNewModal, setShowNewModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    target_type: '',
    foodcourt_id: '',
    restaurant_ids: [] as number[],
    priority: 'normal' as 'normal' | 'important' | 'urgent',
    category: 'general' as string
  });
  const [sending, setSending] = useState(false);

  // View Notice modal state
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);

  const token = getAuthToken();
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Fetch unread comment counts
  const fetchUnreadCounts = async (noticeList: any[]) => {
    if (noticeList.length === 0) return;
    try {
      const tkn = getAuthToken();
      const ids = noticeList.map((n: any) => n.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${ids}`, {
        headers: { 'Authorization': `Bearer ${tkn}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const map: Record<string, { total_comments: number; unread_count: number }> = {};
          data.data.forEach((item: any) => { map[item.entity_id] = { total_comments: Number(item.total_comments), unread_count: Number(item.unread_count) }; });
          setUnreadCounts(prev => ({ ...prev, ...map }));
        }
      }
    } catch (e) { /* silent */ }
  };

  // ============================================================================
  // Data Fetching
  // ============================================================================

  const fetchMetadata = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/metadata', { headers });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMetadata(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchReceived = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/received', { headers });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setReceivedNotices(data.data);
          fetchUnreadCounts(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching received notices:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSent = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/sent', { headers });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSentNotices(data.data);
          fetchUnreadCounts(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching sent notices:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchMetadata(), fetchReceived(), fetchSent()]);
    setLoading(false);
  }, [fetchMetadata, fetchReceived, fetchSent]);

  useEffect(() => {
    if (user) {
      fetchAll();
    }
  }, [user, fetchAll]);

  // ============================================================================
  // Filtering
  // ============================================================================

  const filterNotices = (notices: Notice[], isSent: boolean = false) => {
    return notices.filter(n => {
      const matchesSearch = !searchQuery ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.author_name?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = !priorityFilter || n.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || (n.category || 'general') === categoryFilter;
      const matchesAuthorRole = authorRoleFilter === 'all' || isSent || n.author_role === authorRoleFilter;
      return matchesSearch && matchesPriority && matchesCategory && matchesAuthorRole;
    });
  };

  const filteredReceived = filterNotices(receivedNotices, false);
  const filteredSent = filterNotices(sentNotices, true);
  const displayedNotices = activeTab === 'received' ? filteredReceived : filteredSent;

  // ============================================================================
  // Stats Computation
  // ============================================================================

  const receivedStats = {
    total: receivedNotices.length,
    unread: receivedNotices.filter(n => !n.read_at).length,
    important: receivedNotices.filter(n => n.priority === 'important').length,
    urgent: receivedNotices.filter(n => n.priority === 'urgent').length
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const sentStats = {
    total: sentNotices.length,
    thisMonth: sentNotices.filter(n => {
      const d = new Date(n.createdAt);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length,
    important: sentNotices.filter(n => n.priority === 'important').length,
    urgent: sentNotices.filter(n => n.priority === 'urgent').length
  };

  // ============================================================================
  // New Notice Handlers
  // ============================================================================

  const handleOpenNewModal = () => {
    setNewNotice({
      title: '',
      content: '',
      target_type: metadata?.targetOptions?.[0]?.value || 'foodcourt',
      foodcourt_id: metadata?.foodcourts?.[0]?.id?.toString() || '',
      restaurant_ids: [],
      priority: 'normal',
      category: 'general'
    });
    setShowNewModal(true);
  };

  const handleSendNotice = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim()) return;

    setSending(true);
    try {
      const body: any = {
        title: newNotice.title,
        content: newNotice.content,
        target_type: newNotice.target_type,
        priority: newNotice.priority,
        category: newNotice.category,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      if (newNotice.target_type === 'foodcourt') {
        body.foodcourt_id = parseInt(newNotice.foodcourt_id);
      } else if (newNotice.target_type === 'restaurant') {
        body.restaurant_ids = newNotice.restaurant_ids;
      }

      const response = await fetch('/api/notices', {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setShowNewModal(false);
        setNewAttachments([]);
        setActiveTab('sent');
        await Promise.all([fetchSent(), fetchReceived()]);
      } else {
        console.error('Failed to send notice');
      }
    } catch (error) {
      console.error('Error sending notice:', error);
    }
    setSending(false);
  };

  // ============================================================================
  // View Notice Handlers
  // ============================================================================

  const handleViewNotice = async (notice: Notice) => {
    setSelectedNotice(notice);
    setShowViewModal(true);

    try {
      // Fetch full notice detail (marks as read)
      const noticeRes = await fetch(`/api/notices/${notice.id}`, { headers });
      if (noticeRes.ok) {
        const noticeData = await noticeRes.json();
        if (noticeData.success) {
          setSelectedNotice(noticeData.data);
        }
      }

      // Refresh received list to update read status
      fetchReceived();
      window.dispatchEvent(new Event('refreshBadgeCounts'));
    } catch (error) {
      console.error('Error fetching notice detail:', error);
    }
  };

  const handleDeleteNotice = async (noticeId: number) => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: 'DELETE',
        headers
      });

      if (response.ok) {
        setShowViewModal(false);
        setSelectedNotice(null);
        await Promise.all([fetchSent(), fetchReceived()]);
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  // ============================================================================
  // Utility Functions
  // ============================================================================

  const formatDateTime = (dateString: string) => {
    return tzFormatDateTime(dateString, null);
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return tzFormatDate(dateString, null);
  };

  const getRecipientSummary = (notice: Notice): string => {
    if (notice.target_type === 'foodcourt' && notice.foodcourt) {
      return `Foodcourt: ${notice.foodcourt.name}`;
    }
    if (notice.target_type === 'restaurant' && notice.recipients) {
      const restaurantRecipients = notice.recipients.filter((r: any) => r.restaurant);
      if (restaurantRecipients.length === 1) {
        return `Restaurant: ${restaurantRecipients[0].restaurant.name}`;
      }
      return `${restaurantRecipients.length} restaurants`;
    }
    if (notice.target_type === 'all') return 'All Users';
    if (notice.target_type === 'role') return `Roles: ${notice.target_roles?.join(', ') || 'N/A'}`;
    return '';
  };

  // Multi-select restaurant helpers
  const handleToggleRestaurant = (id: number) => {
    setNewNotice(prev => ({
      ...prev,
      restaurant_ids: prev.restaurant_ids.includes(id)
        ? prev.restaurant_ids.filter(r => r !== id)
        : [...prev.restaurant_ids, id]
    }));
  };

  const handleSelectAllRestaurants = () => {
    if (!metadata) return;
    const allIds = metadata.restaurants.map(r => r.id);
    const allSelected = allIds.every(id => newNotice.restaurant_ids.includes(id));
    setNewNotice(prev => ({
      ...prev,
      restaurant_ids: allSelected ? [] : allIds
    }));
  };

  // ============================================================================
  // Render
  // ============================================================================

  if (loading) {
    return (
      <Container>
        <Header>
          <Title>{t('common:noticesPage.notices')}</Title>
        </Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7C93' }}>
            Loading...
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('common:noticesPage.notices')}</Title>
        <ActionSection>
          {metadata?.canSend && (
            <Button variant="primary" onClick={handleOpenNewModal}>{t('common:noticesPage.newNotice')}</Button>
          )}
        </ActionSection>
      </Header>

      <Content>
        {/* Tabs */}
        <Tabs>
          <Tab active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
            Received<TabBadge count={receivedNotices.length} showZero />
          </Tab>
          <Tab active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
            Sent<TabBadge count={sentNotices.length} showZero />
          </Tab>
        </Tabs>

        {/* Stats */}
        {activeTab === 'received' ? (
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{receivedStats.total}</StatValue>
              <StatLabel>{t('common:noticesPage.totalReceived')}</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{receivedStats.unread}</StatValue>
              <StatLabel>{t('common:noticesPage.unread')}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{receivedStats.important}</StatValue>
              <StatLabel>{t('common:noticesPage.important')}</StatLabel>
            </StatCard>
            <StatCard color="#EF4444">
              <StatValue>{receivedStats.urgent}</StatValue>
              <StatLabel>{t('common:noticesPage.urgent')}</StatLabel>
            </StatCard>
          </StatsGrid>
        ) : (
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{sentStats.total}</StatValue>
              <StatLabel>{t('common:noticesPage.totalSent')}</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{sentStats.thisMonth}</StatValue>
              <StatLabel>{t('common:noticesPage.thisMonth')}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{sentStats.important}</StatValue>
              <StatLabel>{t('common:noticesPage.important')}</StatLabel>
            </StatCard>
            <StatCard color="#EF4444">
              <StatValue>{sentStats.urgent}</StatValue>
              <StatLabel>{t('common:noticesPage.urgent')}</StatLabel>
            </StatCard>
          </StatsGrid>
        )}

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {(['all', 'general', 'guide', 'updates'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: '6px 16px',
                borderRadius: '20px',
                border: categoryFilter === cat ? '1.5px solid #635BFF' : '1px solid #E6EBF1',
                background: categoryFilter === cat ? '#F0EFFF' : 'white',
                color: categoryFilter === cat ? '#635BFF' : '#6B7280',
                fontSize: '13px',
                fontWeight: categoryFilter === cat ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {cat === 'all' ? 'All' : cat === 'general' ? 'General' : cat === 'guide' ? 'Guide' : 'Updates'}
            </button>
          ))}
        </div>

        {/* Filters */}
        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {activeTab === 'received' && (
            <FilterSelect
              value={authorRoleFilter}
              onChange={(e) => setAuthorRoleFilter(e.target.value)}
            >
              <option value="all">{t('common:noticesPage.allSenders')}</option>
              <option value="System Admin">{t('common:noticesPage.systemAdmin')}</option>
              <option value="Brand General">{t('common:noticesPage.brandGeneral')}</option>
              <option value="Foodcourt General">{t('common:noticesPage.foodcourtGeneral')}</option>
              <option value="Restaurant Owner">{t('common:noticesPage.restaurantOwner')}</option>
            </FilterSelect>
          )}
          <FilterSelect
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">{t('common:noticesPage.allPriorities')}</option>
            <option value="normal">{t('common:noticesPage.normal')}</option>
            <option value="important">{t('common:noticesPage.important')}</option>
            <option value="urgent">{t('common:noticesPage.urgent')}</option>
          </FilterSelect>
        </FilterBar>

        {/* Notice Cards */}
        <NoticesGrid>
          {displayedNotices.map(notice => {
            const isUnread = activeTab === 'received' && !notice.read_at;
            return (
              <NoticeCard
                key={notice.id}
                unread={isUnread}
                onClick={() => handleViewNotice(notice)}
                style={notice.category === 'guide' ? { borderLeft: '4px solid #10B981' } : undefined}
              >
                <NoticeHeader>
                  <NoticeInfo>
                    {isUnread && <UnreadDot />}
                    <div>
                      <NoticeTitleText>{notice.title}</NoticeTitleText>
                      <NoticeMeta>
                        <span>From: {notice.author_name || notice.author?.full_name || 'Unknown'}</span>
                        <span>{notice.author_role || notice.author?.role || ''}</span>
                        {activeTab === 'sent' && (
                          <RecipientInfo>To: {getRecipientSummary(notice)}</RecipientInfo>
                        )}
                      </NoticeMeta>
                    </div>
                  </NoticeInfo>
                  <BadgeContainer>
                    {notice.category === 'guide' && (
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{t('common:noticesPage.guide')}</span>
                    )}
                    {notice.category === 'updates' && (
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#EDE9FE', color: '#5B21B6' }}>Updates</span>
                    )}
                    <PriorityBadge priority={notice.priority}>{notice.priority}</PriorityBadge>
                  </BadgeContainer>
                </NoticeHeader>

                <NoticePreview>{notice.content}</NoticePreview>

                <NoticeFooter>
                  <span>{formatDateShort(notice.createdAt)}</span>
                  {notice.commentCount > 0 && (
                    <CommentCount>
                      {notice.commentCount} comment{notice.commentCount !== 1 ? 's' : ''}
                      {unreadCounts[String(notice.id)]?.unread_count > 0 && (
                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>
                          {unreadCounts[String(notice.id)].unread_count} new
                        </span>
                      )}
                    </CommentCount>
                  )}
                </NoticeFooter>
              </NoticeCard>
            );
          })}

          {displayedNotices.length === 0 && (
            <EmptyState>
              <h3>{t('common:noticesPage.noNoticesFound')}</h3>
              <p>
                {activeTab === 'received'
                  ? 'You have no received notices yet.'
                  : 'You have not sent any notices yet. Click "New Notice" to send one.'}
              </p>
            </EmptyState>
          )}
        </NoticesGrid>
      </Content>

      {/* ================================================================== */}
      {/* New Notice Modal */}
      {/* ================================================================== */}
      {showNewModal && (
        <CommonModal isOpen={true} onClose={() => setShowNewModal(false)} title="New Notice" footer={<><Button variant="secondary" onClick={() => setShowNewModal(false)}>{t('common:noticesPage.cancel')}</Button><Button variant="primary" onClick={handleSendNotice} disabled={sending || !newNotice.title.trim() || !newNotice.content.trim() || (newNotice.target_type === 'select_restaurants' && newNotice.restaurant_ids.length === 0) || (newNotice.target_type === 'restaurant' && newNotice.restaurant_ids.length === 0)}>{sending ? 'Sending...' : 'Send Notice'}</Button></>}>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="Notice title"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Content *</FormLabel>
                <FormTextArea
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                  placeholder="Write your notice content here..."
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('common:noticesPage.attachments')}</FormLabel>
                <FileUpload
                  files={newAttachments}
                  onChange={setNewAttachments}
                  maxFiles={5}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Target *</FormLabel>
                <FormSelect
                  value={newNotice.target_type}
                  onChange={(e) => setNewNotice({
                    ...newNotice,
                    target_type: e.target.value,
                    foodcourt_id: e.target.value === 'foodcourt' ? (metadata?.foodcourts?.[0]?.id?.toString() || '') : '',
                    restaurant_ids: []
                  })}
                >
                  {metadata?.targetOptions?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              {/* Foodcourt selector */}
              {newNotice.target_type === 'foodcourt' && metadata?.foodcourts && metadata.foodcourts.length > 0 && (
                <FormGroup>
                  <FormLabel>{t('common:noticesPage.selectFoodcourt')}</FormLabel>
                  <FormSelect
                    value={newNotice.foodcourt_id}
                    onChange={(e) => setNewNotice({ ...newNotice, foodcourt_id: e.target.value })}
                  >
                    {metadata.foodcourts.map(fc => (
                      <option key={fc.id} value={fc.id}>{fc.name}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
              )}

              {/* Restaurant multi-select */}
              {(newNotice.target_type === 'select_restaurants' || newNotice.target_type === 'restaurant') && metadata?.restaurants && (
                <FormGroup>
                  <FormLabel>{t('common:noticesPage.selectRestaurants')}</FormLabel>
                  <SelectAllRow>
                    <SelectedCount>
                      {newNotice.restaurant_ids.length} of {metadata.restaurants.length} selected
                    </SelectedCount>
                    <SelectAllButton onClick={handleSelectAllRestaurants}>
                      {newNotice.restaurant_ids.length === metadata.restaurants.length ? 'Deselect All' : 'Select All'}
                    </SelectAllButton>
                  </SelectAllRow>
                  <CheckboxList>
                    {metadata.restaurants.map(r => (
                      <CheckboxItem key={r.id}>
                        <input
                          type="checkbox"
                          checked={newNotice.restaurant_ids.includes(r.id)}
                          onChange={() => handleToggleRestaurant(r.id)}
                        />
                        {r.name}
                      </CheckboxItem>
                    ))}
                    {metadata.restaurants.length === 0 && (
                      <div style={{ padding: '12px', textAlign: 'center', color: '#9CA3AF', fontSize: '13px' }}>
                        No restaurants available
                      </div>
                    )}
                  </CheckboxList>
                </FormGroup>
              )}

              <FormRow>
                <FormGroup>
                  <FormLabel>{t('common:noticesPage.category')}</FormLabel>
                  <FormSelect
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value })}
                  >
                    <option value="general">{t('common:noticesPage.general')}</option>
                    <option value="guide">{t('common:noticesPage.guide')}</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup>
                  <FormLabel>{t('common:noticesPage.priority')}</FormLabel>
                  <FormSelect
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as any })}
                  >
                    <option value="normal">{t('common:noticesPage.normal')}</option>
                    <option value="important">{t('common:noticesPage.important')}</option>
                    <option value="urgent">{t('common:noticesPage.urgent')}</option>
                  </FormSelect>
                </FormGroup>
              </FormRow>
        </CommonModal>
      )}

      {/* ================================================================== */}
      {/* View Notice Modal */}
      {/* ================================================================== */}
      {showViewModal && selectedNotice && (
        <CommonModal isOpen={true} onClose={() => { setShowViewModal(false); setSelectedNotice(null); }} title={selectedNotice.title} size="large" footer={<>{selectedNotice.category === 'guide' && (<button onClick={async () => { try { const res = await fetch(`/api/work-manuals/from-notice/${selectedNotice.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAuthToken()}` }, body: JSON.stringify({}) }); if ((await res.json()).success) { setShowViewModal(false); setSelectedNotice(null); } } catch (e) { /* silent */ } }} style={{ padding: '8px 16px', background: '#F0EFFF', color: '#635BFF', border: '1px solid #635BFF', borderRadius: '6px', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Send to Work Manuals</button>)}{String(selectedNotice.author_id) === String(user?.id) && (<ViewModalActions><DeleteNoticeButton onClick={() => handleDeleteNotice(selectedNotice.id)}>{t('common:noticesPage.deleteNotice')}</DeleteNoticeButton></ViewModalActions>)}</>}>
              {/* Notice metadata */}
              <NoticeDetailMeta>
                <NoticeDetailMetaItem>
                  From: <strong style={{ marginLeft: '4px' }}>{selectedNotice.author_name || selectedNotice.author?.full_name || 'Unknown'}</strong>
                </NoticeDetailMetaItem>
                <NoticeDetailMetaItem>
                  {selectedNotice.author_role || selectedNotice.author?.role || ''}
                </NoticeDetailMetaItem>
                <NoticeDetailMetaItem>
                  {formatDateTime(selectedNotice.createdAt)}
                </NoticeDetailMetaItem>
                <PriorityBadge priority={selectedNotice.priority}>
                  {selectedNotice.priority}
                </PriorityBadge>
              </NoticeDetailMeta>

              {/* Notice content */}
              <NoticeDetailContent>
                {selectedNotice.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                ))}
              </NoticeDetailContent>

              {/* Attachments */}
              {selectedNotice?.attachments && selectedNotice.attachments.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <AttachmentList attachments={selectedNotice.attachments} />
                </div>
              )}

              {/* Recipients (for sent notices) */}
              {String(selectedNotice.author_id) === String(user?.id) && selectedNotice.recipients && selectedNotice.recipients.length > 0 && (
                <RecipientsSection>
                  <RecipientsSectionTitle>{t('common:noticesPage.recipients')}</RecipientsSectionTitle>
                  <RecipientsList>
                    {selectedNotice.recipients.map((r: any, idx: number) => (
                      <RecipientTag key={idx}>
                        {r.restaurant?.name || r.user?.name || `Recipient ${idx + 1}`}
                      </RecipientTag>
                    ))}
                  </RecipientsList>
                </RecipientsSection>
              )}

              {/* Comments Section */}
              <CommentSection
                entityType="notice"
                entityId={String(selectedNotice.id)}
                currentUserId={user?.id}
                onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(selectedNotice.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })}
              />
        </CommonModal>
      )}
    </Container>
  );
};

export default NoticesPage;
