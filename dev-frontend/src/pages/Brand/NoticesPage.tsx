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
import ConfirmModal from '../../components/ConfirmModal';
import { Modal as CommonModal } from '../../components/UI';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// ============================================================================
// Interfaces
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
    border-left: 3px solid #635BFF;
  `}

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const NoticeCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
`;

const NoticeCardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #635BFF;
  flex-shrink: 0;
`;

const NoticeCardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-wrap: wrap;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
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

const RoleBadge = styled.span`
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  background: #EEF2FF;
  color: #4338CA;
`;

const NoticeCardPreview = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoticeCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #9CA3AF;
  flex-wrap: wrap;
  gap: 8px;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommentIcon = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #635BFF;
  font-weight: 500;
`;

// ============================================================================
// Modal Styled Components
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

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// ============================================================================
// Multi-Select Styled Components
// ============================================================================

const MultiSelectContainer = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
`;

const MultiSelectOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s;

  &:hover {
    background: #F8FAFC;
  }

  input {
    accent-color: #635BFF;
    width: 16px;
    height: 16px;
  }
`;

const SelectedCount = styled.div`
  font-size: 12px;
  color: #6B7C93;
  margin-top: 6px;
`;

// ============================================================================
// View Modal Styled Components
// ============================================================================

const ViewNoticeContent = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  padding: 20px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const ViewNoticeMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px;
  background: #FAFBFC;
  border-radius: 8px;
  font-size: 13px;
  color: #6B7C93;
`;

const MetaField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MetaFieldLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #9CA3AF;
`;

const MetaFieldValue = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

// ============================================================================
// Comments Styled Components
// ============================================================================


const DeleteNoticeButton = styled.button`
  background: none;
  border: 1px solid #FCA5A5;
  color: #DC2626;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
    border-color: #DC2626;
  }
`;

const ViewModalHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// ============================================================================
// Component
// ============================================================================

const NoticesPage: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useTabParam<'received' | 'sent'>('received');
  const [receivedNotices, setReceivedNotices] = useState<Notice[]>([]);
  const [sentNotices, setSentNotices] = useState<Notice[]>([]);
  const [metadata, setMetadata] = useState<NoticeMetadata | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'guide' | 'updates'>('all');
  const [authorRoleFilter, setAuthorRoleFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Create modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    target_type: '',
    brand_id: '' as string,
    restaurant_ids: [] as number[],
    priority: 'normal' as 'normal' | 'important' | 'urgent',
    category: 'general' as string
  });
  const [submitting, setSubmitting] = useState(false);
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);

  // View modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  // ConfirmModal states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingNoticeId, setDeletingNoticeId] = useState<number | null>(null);

  const getAuthHeaders = useCallback(() => {
    const token = getAuthToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
      const response = await fetch('/api/notices/metadata', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        setMetadata(data.data || data);
      }
    } catch (error) {
      console.error('Error fetching metadata:', error);
    }
  }, [getAuthHeaders]);

  const fetchReceivedNotices = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/received', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        const notices = data.data || data;
        const noticeArray = Array.isArray(notices) ? notices : [];
        setReceivedNotices(noticeArray);
        fetchUnreadCounts(noticeArray);
      }
    } catch (error) {
      console.error('Error fetching received notices:', error);
    }
  }, [getAuthHeaders]);

  const fetchSentNotices = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/sent', {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        const notices = data.data || data;
        const noticeArray = Array.isArray(notices) ? notices : [];
        setSentNotices(noticeArray);
        fetchUnreadCounts(noticeArray);
      }
    } catch (error) {
      console.error('Error fetching sent notices:', error);
    }
  }, [getAuthHeaders]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchMetadata(), fetchReceivedNotices(), fetchSentNotices()]);
    setLoading(false);
  }, [fetchMetadata, fetchReceivedNotices, fetchSentNotices]);

  useEffect(() => {
    if (user) {
      fetchAll();
    }
  }, [user, fetchAll]);

  // ============================================================================
  // Notice Detail & Comments
  // ============================================================================

  const fetchNoticeDetail = async (noticeId: number) => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        headers: getAuthHeaders()
      });
      if (response.ok) {
        const data = await response.json();
        const notice = data.data || data;
        setSelectedNotice(notice);
        // Re-fetch received to update read_at
        fetchReceivedNotices();
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      }
    } catch (error) {
      console.error('Error fetching notice detail:', error);
    }
  };

  const handleViewNotice = async (notice: Notice) => {
    setSelectedNotice(notice);
    setShowViewModal(true);
    await fetchNoticeDetail(notice.id);
  };

  // ============================================================================
  // Create Notice
  // ============================================================================

  const handleOpenCreateModal = () => {
    setNewNotice({
      title: '',
      content: '',
      target_type: '',
      brand_id: '',
      restaurant_ids: [],
      priority: 'normal',
      category: ''
    });
    setNewAttachments([]);
    setShowCreateModal(true);
  };

  const handleCreateNotice = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim() || !newNotice.target_type) {
      return;
    }

    setSubmitting(true);
    try {
      const body: any = {
        title: newNotice.title.trim(),
        content: newNotice.content.trim(),
        target_type: newNotice.target_type,
        priority: newNotice.priority,
        category: newNotice.category,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      if (newNotice.target_type === 'brand' && newNotice.brand_id) {
        body.brand_id = Number(newNotice.brand_id);
      }
      if (newNotice.target_type === 'select_restaurants' && newNotice.restaurant_ids.length > 0) {
        body.restaurant_ids = newNotice.restaurant_ids;
      }

      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setNewAttachments([]);
        setActiveTab('sent');
        fetchSentNotices();
      }
    } catch (error) {
      console.error('Error creating notice:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================================
  // Delete Notice
  // ============================================================================

  const handleDeleteNotice = (noticeId: number) => {
    setDeletingNoticeId(noticeId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteNotice = async () => {
    if (!deletingNoticeId) return;
    setShowDeleteConfirm(false);

    try {
      const response = await fetch(`/api/notices/${deletingNoticeId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (response.ok) {
        setShowViewModal(false);
        setSelectedNotice(null);
        fetchSentNotices();
        fetchReceivedNotices();
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    } finally {
      setDeletingNoticeId(null);
    }
  };

  // ============================================================================
  // Comments
  // ============================================================================

  // ============================================================================
  // Filtering
  // ============================================================================

  const currentNotices = activeTab === 'received' ? receivedNotices : sentNotices;

  const filteredNotices = currentNotices.filter(notice => {
    const matchesSearch = !searchQuery ||
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = !priorityFilter || notice.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || (notice.category || 'general') === categoryFilter;
    const matchesAuthorRole = authorRoleFilter === 'all' || activeTab === 'sent' || notice.author_role === authorRoleFilter;
    return matchesSearch && matchesPriority && matchesCategory && matchesAuthorRole;
  });

  // ============================================================================
  // Stats
  // ============================================================================

  const receivedTotal = receivedNotices.length;
  const receivedUnread = receivedNotices.filter(n => !n.read_at).length;
  const receivedImportant = receivedNotices.filter(n => n.priority === 'important').length;
  const receivedUrgent = receivedNotices.filter(n => n.priority === 'urgent').length;

  const sentTotal = sentNotices.length;
  const sentThisMonth = sentNotices.filter(n => {
    const now = new Date();
    const created = new Date(n.createdAt);
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;
  const sentImportant = sentNotices.filter(n => n.priority === 'important').length;
  const sentUrgent = sentNotices.filter(n => n.priority === 'urgent').length;

  // ============================================================================
  // Helpers
  // ============================================================================

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTargetLabel = (notice: Notice): string => {
    if (notice.target_type === 'brand' && notice.brand) {
      return `Brand: ${notice.brand.name || notice.brand.brand_name || 'Unknown'}`;
    }
    if (notice.target_type === 'select_restaurants') {
      const count = notice.recipients?.length || 0;
      return `${count} restaurant${count !== 1 ? 's' : ''}`;
    }
    if (notice.target_type === 'all') {
      return 'All';
    }
    if (notice.target_roles && notice.target_roles.length > 0) {
      return notice.target_roles.join(', ');
    }
    return notice.target_type || 'N/A';
  };

  const getReadCount = (notice: Notice): number => {
    if (!notice.recipients) return 0;
    return notice.recipients.filter((r: any) => r.read_at).length;
  };

  const getRecipientCount = (notice: Notice): number => {
    return notice.recipients?.length || 0;
  };


  const handleToggleRestaurant = (restaurantId: number) => {
    setNewNotice(prev => {
      const ids = prev.restaurant_ids.includes(restaurantId)
        ? prev.restaurant_ids.filter(id => id !== restaurantId)
        : [...prev.restaurant_ids, restaurantId];
      return { ...prev, restaurant_ids: ids };
    });
  };

  const isOwnNotice = (notice: Notice): boolean => {
    return String(notice.author_id) === String(user?.id);
  };

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <Container>
      <Header>
        <Title>{t('common:noticesPage.notices')}</Title>
        <ActionSection>
          <Button variant="primary" onClick={handleOpenCreateModal}>
            New Notice
          </Button>
        </ActionSection>
      </Header>

      <Content>
        {/* Tabs */}
        <Tabs>
          <Tab
            active={activeTab === 'received'}
            onClick={() => setActiveTab('received')}
          >
            Received<TabBadge count={receivedTotal} showZero />
          </Tab>
          <Tab
            active={activeTab === 'sent'}
            onClick={() => setActiveTab('sent')}
          >
            Sent<TabBadge count={sentTotal} showZero />
          </Tab>
        </Tabs>

        {/* Stats */}
        {activeTab === 'received' ? (
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{receivedTotal}</StatValue>
              <StatLabel>{t('common:noticesPage.totalReceived')}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{receivedUnread}</StatValue>
              <StatLabel>{t('common:noticesPage.unread')}</StatLabel>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{receivedImportant}</StatValue>
              <StatLabel>{t('common:noticesPage.important')}</StatLabel>
            </StatCard>
            <StatCard color="#EF4444">
              <StatValue>{receivedUrgent}</StatValue>
              <StatLabel>{t('common:noticesPage.urgent')}</StatLabel>
            </StatCard>
          </StatsGrid>
        ) : (
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{sentTotal}</StatValue>
              <StatLabel>{t('common:noticesPage.totalSent')}</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{sentThisMonth}</StatValue>
              <StatLabel>{t('common:noticesPage.thisMonth')}</StatLabel>
            </StatCard>
            <StatCard color="#8B5CF6">
              <StatValue>{sentImportant}</StatValue>
              <StatLabel>{t('common:noticesPage.important')}</StatLabel>
            </StatCard>
            <StatCard color="#EF4444">
              <StatValue>{sentUrgent}</StatValue>
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

        {/* Filter Bar */}
        <FilterBar>
          <SearchInput
            type="text"
            placeholder="Search notices..."
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
          {activeTab === 'received' && (
            <FilterSelect
              value={authorRoleFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthorRoleFilter(e.target.value)}
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPriorityFilter(e.target.value)}
          >
            <option value="">{t('common:noticesPage.allPriorities')}</option>
            <option value="normal">{t('common:noticesPage.normal')}</option>
            <option value="important">{t('common:noticesPage.important')}</option>
            <option value="urgent">{t('common:noticesPage.urgent')}</option>
          </FilterSelect>
        </FilterBar>

        {/* Notice Cards */}
        <NoticesGrid>
          {loading && filteredNotices.length === 0 && (
            <EmptyState>
              <p>{t('common:noticesPage.loadingNotices')}</p>
            </EmptyState>
          )}

          {!loading && filteredNotices.length === 0 && (
            <EmptyState>
              <h3>{t('common:noticesPage.noNoticesFound')}</h3>
              <p>
                {activeTab === 'received'
                  ? 'You have no received notices yet.'
                  : 'You have not sent any notices yet. Click "New Notice" to send one.'}
              </p>
            </EmptyState>
          )}

          {filteredNotices.map(notice => (
            <NoticeCard
              key={notice.id}
              unread={activeTab === 'received' && !notice.read_at}
              onClick={() => handleViewNotice(notice)}
              style={notice.category === 'guide' ? { borderLeft: '4px solid #10B981' } : undefined}
            >
              <NoticeCardHeader>
                <NoticeCardTitleRow>
                  {activeTab === 'received' && !notice.read_at && <UnreadDot />}
                  <NoticeCardTitle>{notice.title}</NoticeCardTitle>
                </NoticeCardTitleRow>
                <BadgeContainer>
                  {notice.category === 'guide' && (
                    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{t('common:noticesPage.guide')}</span>
                  )}
                  <PriorityBadge priority={notice.priority}>{notice.priority}</PriorityBadge>
                </BadgeContainer>
              </NoticeCardHeader>

              <NoticeCardPreview>{notice.content}</NoticeCardPreview>

              <NoticeCardFooter>
                <FooterLeft>
                  {activeTab === 'received' ? (
                    <>
                      <MetaItem>
                        {notice.author_name || 'Unknown'}
                        <RoleBadge>{notice.author_role || 'Admin'}</RoleBadge>
                      </MetaItem>
                    </>
                  ) : (
                    <>
                      <MetaItem>To: {getTargetLabel(notice)}</MetaItem>
                      <MetaItem>
                        {getReadCount(notice)}/{getRecipientCount(notice)} read
                      </MetaItem>
                    </>
                  )}
                </FooterLeft>
                <FooterRight>
                  {notice.commentCount > 0 && (
                    <CommentIcon>
                      {notice.commentCount} comment{notice.commentCount !== 1 ? 's' : ''}
                      {unreadCounts[String(notice.id)]?.unread_count > 0 && (
                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>
                          {unreadCounts[String(notice.id)].unread_count} new
                        </span>
                      )}
                    </CommentIcon>
                  )}
                  <MetaItem>{formatDate(notice.createdAt)}</MetaItem>
                </FooterRight>
              </NoticeCardFooter>
            </NoticeCard>
          ))}
        </NoticesGrid>
      </Content>

      {/* ================================================================== */}
      {/* Create Notice Modal                                                 */}
      {/* ================================================================== */}
      {showCreateModal && (
        <CommonModal isOpen={true} onClose={() => setShowCreateModal(false)} title="New Notice" maxWidth="720px" footer={<><Button variant="secondary" onClick={() => setShowCreateModal(false)}>{t('common:noticesPage.cancel')}</Button><Button variant="primary" onClick={handleCreateNotice} disabled={submitting || !newNotice.title.trim() || !newNotice.content.trim() || !newNotice.target_type || (newNotice.target_type === 'brand' && !newNotice.brand_id) || (newNotice.target_type === 'select_restaurants' && newNotice.restaurant_ids.length === 0)}>{submitting ? 'Sending...' : 'Send Notice'}</Button></>}>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  type="text"
                  placeholder="Enter notice title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Content *</FormLabel>
                <FormTextArea
                  placeholder="Enter notice content..."
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
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
                <FormLabel>Target Type *</FormLabel>
                <FormSelect
                  value={newNotice.target_type}
                  onChange={(e) => setNewNotice({
                    ...newNotice,
                    target_type: e.target.value,
                    brand_id: '',
                    restaurant_ids: []
                  })}
                >
                  <option value="">{t('common:noticesPage.selectTarget')}</option>
                  {metadata?.targetOptions?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  )) || (
                    <>
                      <option value="brand">{t('common:noticesPage.byBrand')}</option>
                      <option value="select_restaurants">{t('common:noticesPage.selectRestaurants')}</option>
                    </>
                  )}
                </FormSelect>
              </FormGroup>

              {/* Brand select */}
              {newNotice.target_type === 'brand' && metadata?.brands && (
                <FormGroup>
                  <FormLabel>Select Brand *</FormLabel>
                  <FormSelect
                    value={newNotice.brand_id}
                    onChange={(e) => setNewNotice({ ...newNotice, brand_id: e.target.value })}
                  >
                    <option value="">{t('common:noticesPage.chooseABrand')}</option>
                    {metadata.brands.map(brand => (
                      <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                  </FormSelect>
                </FormGroup>
              )}

              {/* Restaurant multi-select */}
              {newNotice.target_type === 'select_restaurants' && metadata?.restaurants && (
                <FormGroup>
                  <FormLabel>Select Restaurants *</FormLabel>
                  <MultiSelectContainer>
                    {metadata.restaurants.map(restaurant => (
                      <MultiSelectOption key={restaurant.id}>
                        <input
                          type="checkbox"
                          checked={newNotice.restaurant_ids.includes(restaurant.id)}
                          onChange={() => handleToggleRestaurant(restaurant.id)}
                        />
                        {restaurant.name}
                      </MultiSelectOption>
                    ))}
                    {metadata.restaurants.length === 0 && (
                      <div style={{ padding: '12px', color: '#9CA3AF', fontSize: '13px', textAlign: 'center' }}>
                        No restaurants available
                      </div>
                    )}
                  </MultiSelectContainer>
                  <SelectedCount>
                    {newNotice.restaurant_ids.length} restaurant{newNotice.restaurant_ids.length !== 1 ? 's' : ''} selected
                  </SelectedCount>
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
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as 'normal' | 'important' | 'urgent' })}
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
      {/* View Notice Modal                                                   */}
      {/* ================================================================== */}
      {showViewModal && selectedNotice && (
        <CommonModal isOpen={true} onClose={() => { setShowViewModal(false); setSelectedNotice(null); }} title={selectedNotice.title} size="large" headerActions={<ViewModalHeaderRight><PriorityBadge priority={selectedNotice.priority}>{selectedNotice.priority}</PriorityBadge>{isOwnNotice(selectedNotice) && (<DeleteNoticeButton onClick={() => handleDeleteNotice(selectedNotice.id)}>{t('common:noticesPage.delete')}</DeleteNoticeButton>)}</ViewModalHeaderRight>} footer={<>{selectedNotice.category === 'guide' && (<Button variant="secondary" onClick={async () => { try { const res = await fetch(`/api/work-manuals/from-notice/${selectedNotice.id}`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({}) }); if ((await res.json()).success) { setShowViewModal(false); setSelectedNotice(null); } } catch (e) { /* silent */ } }}>Send to Work Manuals</Button>)}<Button variant="secondary" onClick={() => { setShowViewModal(false); setSelectedNotice(null); }}>{t('common:noticesPage.close')}</Button></>}>
              {/* Meta info */}
              <ViewNoticeMeta>
                <MetaField>
                  <MetaFieldLabel>{t('common:noticesPage.from')}</MetaFieldLabel>
                  <MetaFieldValue>
                    {selectedNotice.author_name || selectedNotice.author?.full_name || 'Unknown'}{' '}
                    ({selectedNotice.author_role || selectedNotice.author?.role || 'N/A'})
                  </MetaFieldValue>
                </MetaField>
                <MetaField>
                  <MetaFieldLabel>{t('common:noticesPage.to')}</MetaFieldLabel>
                  <MetaFieldValue>{getTargetLabel(selectedNotice)}</MetaFieldValue>
                </MetaField>
                <MetaField>
                  <MetaFieldLabel>{t('common:noticesPage.date')}</MetaFieldLabel>
                  <MetaFieldValue>{formatDateTime(selectedNotice.createdAt)}</MetaFieldValue>
                </MetaField>
                {selectedNotice.recipients && selectedNotice.recipients.length > 0 && (
                  <MetaField>
                    <MetaFieldLabel>{t('common:noticesPage.readStatus')}</MetaFieldLabel>
                    <MetaFieldValue>
                      {getReadCount(selectedNotice)}/{getRecipientCount(selectedNotice)} read
                    </MetaFieldValue>
                  </MetaField>
                )}
              </ViewNoticeMeta>

              {/* Content */}
              <ViewNoticeContent>
                {selectedNotice.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                ))}
              </ViewNoticeContent>

              {selectedNotice?.attachments && selectedNotice.attachments.length > 0 && (
                <AttachmentList attachments={selectedNotice.attachments} />
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

      {/* Delete Notice Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Notice"
        message="Are you sure you want to delete this notice?"
        onConfirm={confirmDeleteNotice}
        onCancel={() => { setShowDeleteConfirm(false); setDeletingNoticeId(null); }}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </Container>
  );
};

export default NoticesPage;
