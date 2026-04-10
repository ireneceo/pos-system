import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import CommentSection from '../../components/Common/CommentSection';
import { linkifyText } from '../../utils/linkify';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  ActionSection
} from '../../components/UI/PageComponents';
import {
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel
} from '../../components/UI/StatCard';
import { Modal as CommonModal } from '../../components/UI';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
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
  target_type: 'all' | 'role' | 'brand' | 'foodcourt' | 'restaurant' | 'individual';
  target_roles: string[] | null;
  brand_id: number | null;
  foodcourt_id: number | null;
  priority: 'normal' | 'important' | 'urgent';
  status: string;
  createdAt: string;
  recipients: Array<{
    id: number;
    restaurant_id: number | null;
    user_id: number | null;
    read_at: string | null;
    restaurant?: { id: number; name: string };
    user?: { id: number; name: string; full_name?: string; role: string };
  }>;
  category?: 'general' | 'guide';
  commentCount: number;
  attachments?: any[];
  brand?: { id: number; name: string } | null;
  foodcourt?: { id: number; name: string } | null;
  author?: { id: number; name: string; role: string };
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

const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
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
  gap: 20px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const NoticeCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transform: translateY(-2px);
  }
`;

const NoticeCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 12px;
`;

const NoticeCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NoticeCardTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NoticeCardContent = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  flex-shrink: 0;
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

const TargetBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: #EEF2FF;
  color: #4338CA;
  white-space: nowrap;
  margin-bottom: 16px;
`;

const NoticeCardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
`;

const MetaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NoticeCardBadges = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
`;

// Modal Styled Components

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
  box-sizing: border-box;

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
  box-sizing: border-box;

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
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F8F7FF;
  }

  input[type="checkbox"] {
    accent-color: #635BFF;
  }
`;

const RestaurantSearchInput = styled(FormInput)`
  margin-bottom: 8px;
`;

const RestaurantList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
`;

const RestaurantItem = styled.div<{ selected: boolean }>`
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #F3F4F6;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${props => props.selected ? '#F0EFFF' : 'transparent'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${props => props.selected ? '#F0EFFF' : '#F8FAFC'};
  }
`;

const RestaurantCheckbox = styled.input`
  accent-color: #635BFF;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const RestaurantName = styled.span`
  font-size: 14px;
  color: #0A2540;
`;

const SelectedCount = styled.div`
  font-size: 12px;
  color: #635BFF;
  font-weight: 500;
  margin-top: 6px;
`;

// View Modal Styled Components
const ViewSection = styled.div`
  margin-bottom: 24px;
`;

const ViewSectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const ViewNoticeTitle = styled.h3`
  font-size: 22px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const ViewNoticeMeta = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #6B7280;

  & > * {
    flex-shrink: 0;
  }
`;

const ViewNoticeContent = styled.div`
  font-size: 15px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
  white-space: pre-wrap;
`;

const RecipientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const RecipientBadge = styled.div<{ isRead?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: ${props => props.isRead ? '#F0FDF4' : '#F3F4F6'};
  border-radius: 16px;
  font-size: 12px;
  color: #374151;
  border: 1px solid ${props => props.isRead ? '#BBF7D0' : '#E5E7EB'};
`;

const RecipientRole = styled.span`
  font-size: 10px;
  color: #9CA3AF;
`;

const ReadStatus = styled.span<{ isRead?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => props.isRead ? '#10B981' : '#D1D5DB'};
  flex-shrink: 0;
`;


const DeleteButton = styled.button`
  padding: 8px 16px;
  background: transparent;
  color: #DC2626;
  border: 1px solid #FCA5A5;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #FEE2E2;
  }
`;

const ViewModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-top: 1px solid #E6EBF1;
`;

// ============================================================================
// Component
// ============================================================================

const NoticesPage: React.FC = () => {
  const { t } = useTranslation('admin');
  const { user } = useAuth();
  // Data states
  const [notices, setNotices] = useState<Notice[]>([]);
  const [metadata, setMetadata] = useState<NoticeMetadata | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  // UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'guide'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [showSendModal, setShowSendModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [sending, setSending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', content: '', priority: 'normal' as 'normal' | 'important' | 'urgent' });

  // New notice form states
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    target_type: 'all' as string,
    target_roles: [] as string[],
    restaurant_ids: [] as number[],
    priority: 'normal' as string,
    category: 'general' as string
  });
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);

  const getAuthHeaders = useCallback(() => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }, []);

  // Fetch unread comment counts
  const fetchUnreadCounts = async (noticeList: any[]) => {
    if (noticeList.length === 0) return;
    try {
      const token = getAuthToken();
      const ids = noticeList.map((n: any) => n.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=notice&entity_ids=${ids}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const map: Record<string, { total_comments: number; unread_count: number }> = {};
          data.data.forEach((item: any) => { map[item.entity_id] = { total_comments: Number(item.total_comments), unread_count: Number(item.unread_count) }; });
          setUnreadCounts(map);
        }
      }
    } catch (e) { /* silent */ }
  };

  // Fetch sent notices
  const fetchNotices = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/sent', {
        headers: getAuthHeaders(),
        cache: 'no-store'
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        const noticeArray = Array.isArray(data) ? data : [];
        setNotices(noticeArray);
        fetchUnreadCounts(noticeArray);
      }
    } catch (error) {
      // Silent error handling
    }
  }, [getAuthHeaders]);

  // Fetch metadata
  const fetchMetadata = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/metadata', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const result = await response.json();
        setMetadata(result.data || result);
      }
    } catch (error) {
      // Silent error handling
    }
  }, [getAuthHeaders]);

  useEffect(() => {
    fetchNotices();
    fetchMetadata();
  }, [fetchNotices, fetchMetadata]);

  // Computed stats
  const totalSent = notices.length;
  const thisMonth = notices.filter(n => {
    const noticeDate = new Date(n.createdAt);
    const now = new Date();
    return noticeDate.getMonth() === now.getMonth() && noticeDate.getFullYear() === now.getFullYear();
  }).length;
  const importantCount = notices.filter(n => n.priority === 'important').length;
  const urgentCount = notices.filter(n => n.priority === 'urgent').length;

  // Filtered and sorted notices
  const filteredNotices = notices
    .filter(notice => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
      const matchesCategory = categoryFilter === 'all' || (notice.category || 'general') === categoryFilter;
      return matchesSearch && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Format date
  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get target display text
  const getTargetDisplay = (notice: Notice): string => {
    switch (notice.target_type) {
      case 'all':
        return 'All Users';
      case 'role':
        return notice.target_roles ? notice.target_roles.join(', ') : 'By Role';
      case 'brand':
        return notice.brand ? `Brand: ${notice.brand.name}` : 'Brand';
      case 'foodcourt':
        return notice.foodcourt ? `Foodcourt: ${notice.foodcourt.name}` : 'Foodcourt';
      case 'restaurant':
        return 'Selected Restaurants';
      case 'individual':
        return 'Individual';
      default:
        return notice.target_type;
    }
  };

  // Get recipient count
  const getRecipientCount = (notice: Notice): number => {
    return notice.recipients ? notice.recipients.length : 0;
  };

  // Handle send notice
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

      if (newNotice.target_type === 'role' && newNotice.target_roles.length > 0) {
        body.target_roles = newNotice.target_roles;
      }

      if (newNotice.target_type === 'restaurant' && newNotice.restaurant_ids.length > 0) {
        body.restaurant_ids = newNotice.restaurant_ids;
      }

      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setShowSendModal(false);
        resetNewNoticeForm();
        await fetchNotices();
      }
    } catch (error) {
      // Silent error handling
    } finally {
      setSending(false);
    }
  };

  // Handle delete notice
  const handleDeleteNotice = async (noticeId: number) => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        setShowViewModal(false);
        setSelectedNotice(null);
        fetchNotices();
      }
    } catch (error) {
      // Silent error handling
    }
  };

  // Open view modal
  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setShowViewModal(true);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  // Toggle role checkbox
  const handleRoleToggle = (role: string) => {
    setNewNotice(prev => ({
      ...prev,
      target_roles: prev.target_roles.includes(role)
        ? prev.target_roles.filter(r => r !== role)
        : [...prev.target_roles, role]
    }));
  };

  // Toggle restaurant selection
  const handleRestaurantToggle = (restaurantId: number) => {
    setNewNotice(prev => ({
      ...prev,
      restaurant_ids: prev.restaurant_ids.includes(restaurantId)
        ? prev.restaurant_ids.filter(id => id !== restaurantId)
        : [...prev.restaurant_ids, restaurantId]
    }));
  };

  // Reset form
  const resetNewNoticeForm = () => {
    setNewNotice({
      title: '',
      content: '',
      target_type: 'all',
      target_roles: [],
      restaurant_ids: [],
      priority: 'normal',
      category: 'general'
    });
    setRestaurantSearch('');
    setNewAttachments([]);
  };

  // Filter restaurants by search
  const filteredRestaurants = metadata?.restaurants?.filter(r =>
    r.name.toLowerCase().includes(restaurantSearch.toLowerCase())
  ) || [];

  const roleOptions = [
    'Brand General',
    'Foodcourt General',
    'Restaurant Owner',
    'Restaurant Admin',
    'Staff'
  ];

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <Container>
      <Header>
        <Title>{t('admin:noticesPage.notices')}</Title>
        <ActionSection>
          <Button variant="primary" onClick={() => setShowSendModal(true)}>
            New Notice
          </Button>
        </ActionSection>
      </Header>

      <Content>
        {/* Stats */}
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{totalSent}</StatValue>
            <StatLabel>{t('admin:noticesPage.totalSent')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{thisMonth}</StatValue>
            <StatLabel>{t('admin:noticesPage.thisMonth')}</StatLabel>
          </StatCard>
          <StatCard color="#F59E0B">
            <StatValue>{importantCount}</StatValue>
            <StatLabel>{t('admin:noticesPage.important')}</StatLabel>
          </StatCard>
          <StatCard color="#EF4444">
            <StatValue>{urgentCount}</StatValue>
            <StatLabel>{t('admin:noticesPage.urgent')}</StatLabel>
          </StatCard>
        </StatsGrid>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {(['all', 'general', 'guide'] as const).map(cat => (
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
              {cat === 'all' ? 'All' : cat === 'general' ? 'General' : 'Guide'}
            </button>
          ))}
        </div>

        {/* Filters */}
        <FiltersContainer>
          <FilterSelect
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">{t('admin:noticesPage.allPriorities')}</option>
            <option value="normal">{t('admin:noticesPage.normal')}</option>
            <option value="important">{t('admin:noticesPage.important')}</option>
            <option value="urgent">{t('admin:noticesPage.urgent')}</option>
          </FilterSelect>
          <FilterSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
          >
            <option value="newest">{t('admin:noticesPage.newestFirst')}</option>
            <option value="oldest">{t('admin:noticesPage.oldestFirst')}</option>
          </FilterSelect>
          <SearchInput
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FiltersContainer>

        {/* Notices List */}
        {filteredNotices.length === 0 ? (
          <EmptyState>
            <h3>{t('admin:noticesPage.noNoticesFound')}</h3>
            <p>
              {notices.length === 0
                ? 'Create your first notice by clicking "New Notice" above.'
                : 'No notices match your current filters.'}
            </p>
          </EmptyState>
        ) : (
          <NoticesGrid>
            {filteredNotices.map(notice => (
              <NoticeCard key={notice.id} onClick={() => handleViewNotice(notice)} style={notice.category === 'guide' ? { borderLeft: '4px solid #10B981' } : undefined}>
                <NoticeCardHeader>
                  <NoticeCardInfo>
                    <NoticeCardTitle>{notice.title}</NoticeCardTitle>
                  </NoticeCardInfo>
                  <NoticeCardBadges>
                    {notice.category === 'guide' && (
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{t('admin:noticesPage.guide')}</span>
                    )}
                    <PriorityBadge priority={notice.priority}>
                      {notice.priority}
                    </PriorityBadge>
                  </NoticeCardBadges>
                </NoticeCardHeader>

                <NoticeCardContent>
                  {notice.content}
                </NoticeCardContent>

                <TargetBadge>
                  {getTargetDisplay(notice)}
                </TargetBadge>

                <NoticeCardMeta>
                  <MetaLeft>
                    <MetaItem>{formatDateShort(notice.createdAt)}</MetaItem>
                  </MetaLeft>
                  <MetaRight>
                    <MetaItem>
                      {getRecipientCount(notice)} recipient{getRecipientCount(notice) !== 1 ? 's' : ''}
                    </MetaItem>
                    <MetaItem>
                      {notice.commentCount || 0} comment{(notice.commentCount || 0) !== 1 ? 's' : ''}
                      {unreadCounts[String(notice.id)]?.unread_count > 0 && (
                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>
                          {unreadCounts[String(notice.id)].unread_count} new
                        </span>
                      )}
                    </MetaItem>
                  </MetaRight>
                </NoticeCardMeta>
              </NoticeCard>
            ))}
          </NoticesGrid>
        )}
      </Content>

      {/* ====================================================================== */}
      {/* Send Notice Modal */}
      {/* ====================================================================== */}
      {showSendModal && (
        <CommonModal isOpen={true} onClose={() => { setShowSendModal(false); resetNewNoticeForm(); }} title="New Notice" maxWidth="720px" footer={<><Button variant="secondary" onClick={() => { setShowSendModal(false); resetNewNoticeForm(); }}>{t('admin:noticesPage.cancel')}</Button><Button variant="primary" onClick={handleSendNotice} disabled={sending || !newNotice.title.trim() || !newNotice.content.trim()}>{sending ? 'Sending...' : 'Send Notice'}</Button></>}>
              <FormGroup>
                <FormLabel>{t('admin:noticesPage.targetType')}</FormLabel>
                <FormSelect
                  value={newNotice.target_type}
                  onChange={(e) => setNewNotice(prev => ({
                    ...prev,
                    target_type: e.target.value,
                    target_roles: [],
                    restaurant_ids: []
                  }))}
                >
                  <option value="all">{t('admin:noticesPage.allUsers')}</option>
                  <option value="role">{t('admin:noticesPage.byRole')}</option>
                  <option value="restaurant">{t('admin:noticesPage.selectRestaurants')}</option>
                </FormSelect>
              </FormGroup>

              {/* By Role: multi-checkboxes */}
              {newNotice.target_type === 'role' && (
                <FormGroup>
                  <FormLabel>{t('admin:noticesPage.selectRoles')}</FormLabel>
                  <CheckboxGroup>
                    {roleOptions.map(role => (
                      <CheckboxLabel key={role}>
                        <input
                          type="checkbox"
                          checked={newNotice.target_roles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                        />
                        {role}
                      </CheckboxLabel>
                    ))}
                  </CheckboxGroup>
                </FormGroup>
              )}

              {/* Select Restaurants: searchable list */}
              {newNotice.target_type === 'restaurant' && (
                <FormGroup>
                  <FormLabel>{t('admin:noticesPage.selectRestaurants')}</FormLabel>
                  <RestaurantSearchInput
                    type="text"
                    placeholder="Search restaurants..."
                    value={restaurantSearch}
                    onChange={(e) => setRestaurantSearch(e.target.value)}
                  />
                  <RestaurantList>
                    {filteredRestaurants.length === 0 ? (
                      <div style={{ padding: '16px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
                        No restaurants found
                      </div>
                    ) : (
                      filteredRestaurants.map(restaurant => (
                        <RestaurantItem
                          key={restaurant.id}
                          selected={newNotice.restaurant_ids.includes(restaurant.id)}
                          onClick={() => handleRestaurantToggle(restaurant.id)}
                        >
                          <RestaurantCheckbox
                            type="checkbox"
                            checked={newNotice.restaurant_ids.includes(restaurant.id)}
                            onChange={() => handleRestaurantToggle(restaurant.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <RestaurantName>{restaurant.name}</RestaurantName>
                        </RestaurantItem>
                      ))
                    )}
                  </RestaurantList>
                  {newNotice.restaurant_ids.length > 0 && (
                    <SelectedCount>
                      {newNotice.restaurant_ids.length} restaurant{newNotice.restaurant_ids.length !== 1 ? 's' : ''} selected
                    </SelectedCount>
                  )}
                </FormGroup>
              )}

              <FormGroup>
                <FormLabel>{t('admin:noticesPage.title')}</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Enter notice title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('admin:noticesPage.content')}</FormLabel>
                <FormTextArea
                  placeholder="Enter notice content..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice(prev => ({ ...prev, content: e.target.value }))}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{t('admin:noticesPage.attachments')}</FormLabel>
                <FileUpload
                  files={newAttachments}
                  onChange={setNewAttachments}
                  maxFiles={5}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: '16px' }}>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>{t('admin:noticesPage.category')}</FormLabel>
                  <FormSelect
                    value={newNotice.category}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="general">{t('admin:noticesPage.general')}</option>
                    <option value="guide">{t('admin:noticesPage.guide')}</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>{t('admin:noticesPage.priority')}</FormLabel>
                  <FormSelect
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, priority: e.target.value }))}
                  >
                    <option value="normal">{t('admin:noticesPage.normal')}</option>
                    <option value="important">{t('admin:noticesPage.important')}</option>
                    <option value="urgent">{t('admin:noticesPage.urgent')}</option>
                  </FormSelect>
                </FormGroup>
              </div>
        </CommonModal>
      )}

      {/* ====================================================================== */}
      {/* View Notice Modal */}
      {showViewModal && selectedNotice && (
        <CommonModal
          isOpen={true}
          onClose={() => { setShowViewModal(false); setSelectedNotice(null); setIsEditing(false); }}
          title={isEditing ? 'Edit Notice' : 'Notice Details'}
          size="large"
          footer={
            isEditing ? (
              <>
                <Button variant="secondary" onClick={() => setIsEditing(false)}>{t('admin:noticesPage.cancel')}</Button>
                <Button variant="primary" onClick={async () => {
                  try {
                    const res = await fetch(`/api/notices/${selectedNotice.id}`, {
                      method: 'PUT',
                      headers: { ...getAuthHeaders(), 'Content-Type': 'application/json' },
                      body: JSON.stringify(editForm)
                    });
                    if ((await res.json()).success) {
                      setIsEditing(false);
                      setSelectedNotice({ ...selectedNotice, ...editForm });
                      fetchNotices();
                    }
                  } catch (e) { console.error(e); }
                }}>{t('admin:noticesPage.save')}</Button>
              </>
            ) : (
              <>
                {String(selectedNotice.author_id) === String(user?.id) && (
                  <Button variant="primary" onClick={() => {
                    setEditForm({ title: selectedNotice.title, content: selectedNotice.content, priority: selectedNotice.priority });
                    setIsEditing(true);
                  }}>{t('admin:noticesPage.edit')}</Button>
                )}
                <DeleteButton onClick={() => handleDeleteNotice(selectedNotice.id)}>{t('admin:noticesPage.deleteNotice')}</DeleteButton>
                <Button variant="secondary" onClick={() => { setShowViewModal(false); setSelectedNotice(null); }}>{t('admin:noticesPage.close')}</Button>
              </>
            )
          }
        >
          {isEditing ? (
            <ViewSection>
              <FormGroup>
                <FormLabel>{t('admin:noticesPage.title')}</FormLabel>
                <FormInput value={editForm.title} onChange={(e: any) => setEditForm({ ...editForm, title: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('admin:noticesPage.content')}</FormLabel>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  style={{ width: '100%', minHeight: '200px', padding: '12px', borderRadius: '8px', border: '1px solid #E6EBF1', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('admin:noticesPage.priority')}</FormLabel>
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({ ...editForm, priority: e.target.value as 'normal' | 'important' | 'urgent' })}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #E6EBF1', fontSize: '14px' }}
                >
                  <option value="normal">{t('admin:noticesPage.normal')}</option>
                  <option value="important">{t('admin:noticesPage.important')}</option>
                  <option value="urgent">{t('admin:noticesPage.urgent')}</option>
                </select>
              </FormGroup>
            </ViewSection>
          ) : (
            <>
              <ViewSection>
                <ViewNoticeTitle>{selectedNotice.title}</ViewNoticeTitle>
                <ViewNoticeMeta>
                  <PriorityBadge priority={selectedNotice.priority}>
                    {selectedNotice.priority}
                  </PriorityBadge>
                  <TargetBadge>{getTargetDisplay(selectedNotice)}</TargetBadge>
                  <span>{formatDateTime(selectedNotice.createdAt)}</span>
                </ViewNoticeMeta>
                <ViewNoticeContent>
                  {selectedNotice.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                  ))}
                </ViewNoticeContent>
                {selectedNotice?.attachments && selectedNotice.attachments.length > 0 && (
                  <AttachmentList attachments={selectedNotice.attachments} />
                )}
              </ViewSection>

              <ViewSection>
                <ViewSectionTitle>
                  Recipients ({getRecipientCount(selectedNotice)})
                </ViewSectionTitle>
                {selectedNotice.recipients && selectedNotice.recipients.length > 0 ? (
                  <RecipientsList>
                    {selectedNotice.recipients.map(recipient => (
                      <RecipientBadge key={recipient.id} isRead={!!recipient.read_at}>
                        <ReadStatus isRead={!!recipient.read_at} title={recipient.read_at ? 'Read' : 'Unread'} />
                        {recipient.restaurant
                          ? recipient.restaurant.name
                          : recipient.user
                            ? (recipient.user.full_name || recipient.user.name)
                            : `#${recipient.id}`}
                        {recipient.user && recipient.user.role && (
                          <RecipientRole>{recipient.user.role}</RecipientRole>
                        )}
                      </RecipientBadge>
                    ))}
                  </RecipientsList>
                ) : (
                  <div style={{ fontSize: '14px', color: '#9CA3AF' }}>{t('admin:noticesPage.noRecipientsDataAvailable')}</div>
                )}
              </ViewSection>

              <CommentSection
                entityType="notice"
                entityId={String(selectedNotice.id)}
                currentUserId={user?.id}
                onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(selectedNotice.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })}
              />
            </>
          )}
        </CommonModal>
      )}
    </Container>
  );
};

export default NoticesPage;
