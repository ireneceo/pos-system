import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useAuth } from '../../contexts/AuthContext';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import CommentSection from '../../components/Common/CommentSection';
import { linkifyText } from '../../utils/linkify';
import { Modal as CommonModal, StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI';
import { Tabs, Tab, Badge as TabBadge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';

import { getAuthToken } from '../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../utils/timezone';
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

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 0;
  height: 80px;
  min-height: 80px;
  max-height: 80px;
  box-sizing: border-box;
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

const Content = styled.div`
  padding: 32px;
  background: #F9FAFB;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ActionSection = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          &:hover {
            background: #5A51E6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
          }
          &:disabled {
            background: #6B7280;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
        `;
      case 'danger':
        return `
          background: #FEE2E2;
          color: #DC2626;
          &:hover {
            background: #FECACA;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: white;
          color: #4B5563;
          border: 1px solid #C7CED6;
          &:hover {
            background: #F1F4F8;
            color: #0A2540;
            border-color: #64748B;
          }
        `;
    }
  }}
`;



const FiltersContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 320px;
  max-width: 480px;
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #6B7280;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 1024px) {
    min-width: 280px;
    max-width: 400px;
  }

  @media (max-width: 768px) {
    min-width: 240px;
    max-width: 320px;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 12px 16px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  min-width: 140px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 600px) {
    width: 100%;
    min-width: 100%;
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

const NoticeCard = styled.div<{ unread?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;

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

const NoticeTextInfo = styled.div`
  flex: 1;
`;

const NoticeTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`;

const NoticeMeta = styled.div`
  font-size: 13px;
  color: #4B5563;
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
  padding: 6px 12px;
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
      default: return '#4B5563';
    }
  }};
`;

const NoticePreview = styled.div`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin-top: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoticeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #F1F4F8;
  font-size: 12px;
  color: #4B5563;
  flex-wrap: wrap;
  gap: 8px;
`;

const CommentCount = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #4B5563;
`;

const RecipientInfo = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

// Modal

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
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

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1F2937;
  cursor: pointer;
  margin-bottom: 12px;

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
    cursor: pointer;
  }
`;

const RestaurantCheckboxList = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 8px;
`;

const RestaurantCheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  color: #1F2937;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #F1F4F8;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: #635BFF;
    cursor: pointer;
  }
`;

// View Modal
const NoticeContentBox = styled.div`
  font-size: 14px;
  color: #1F2937;
  line-height: 1.8;
  padding: 20px;
  background: #F1F4F8;
  border-radius: 8px;
  border-left: 3px solid #C7CED6;
  white-space: pre-wrap;
  margin-bottom: 24px;
`;

const NoticeDetailMeta = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  font-size: 13px;
  color: #4B5563;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const MetaLabel = styled.span`
  font-weight: 600;
  color: #4B5563;
`;

const MetaValue = styled.span`
  color: #0A2540;
`;


const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #DC2626;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.15s;

  &:hover {
    background: #FEE2E2;
  }
`;

const RecipientsTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const RecipientTag = styled.span`
  padding: 4px 10px;
  background: #F0F0FF;
  color: #635BFF;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`;

// ============================================================================
// Component
// ============================================================================

const NoticesPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useTabParam<'received' | 'sent'>('received');
  const [receivedNotices, setReceivedNotices] = useState<Notice[]>([]);
  const [sentNotices, setSentNotices] = useState<Notice[]>([]);
  const [metadata, setMetadata] = useState<NoticeMetadata | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'guide' | 'updates'>('all');
  const [authorRoleFilter, setAuthorRoleFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // New notice modal
  const [showNewModal, setShowNewModal] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    content: '',
    priority: 'normal' as 'normal' | 'important' | 'urgent',
    category: 'general' as string,
    allRestaurants: true,
    selectedRestaurantIds: [] as number[]
  });
  const [sending, setSending] = useState(false);

  // View modal
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewNotice, setViewNotice] = useState<Notice | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);

  const token = getAuthToken();

  const apiHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // Fetch unread comment counts
  const fetchUnreadCounts = async (noticeList: any[]) => {
    if (noticeList.length === 0) return;
    try {
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
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMetadata(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching notice metadata:', error);
    }
  }, [token]);

  const fetchReceivedNotices = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/received', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
  }, [token]);

  const fetchSentNotices = useCallback(async () => {
    try {
      const response = await fetch('/api/notices/sent', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
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
  }, [token]);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchMetadata(), fetchReceivedNotices(), fetchSentNotices()]);
    setLoading(false);
  }, [fetchMetadata, fetchReceivedNotices, fetchSentNotices]);

  useEffect(() => {
    if (user) {
      fetchAll();
      const interval = setInterval(fetchAll, 30000);
      return () => clearInterval(interval);
    }
  }, [user, fetchAll]);

  // ============================================================================
  // View Notice
  // ============================================================================

  const handleViewNotice = async (notice: Notice) => {
    try {
      const response = await fetch(`/api/notices/${notice.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setViewNotice(data.data);
          setShowViewModal(true);
          // Update read status in received list
          if (activeTab === 'received') {
            setReceivedNotices(prev =>
              prev.map(n => n.id === notice.id ? { ...n, read_at: new Date().toISOString() } : n)
            );
          }
          window.dispatchEvent(new Event('refreshBadgeCounts'));
        }
      }
    } catch (error) {
      console.error('Error fetching notice detail:', error);
    }
  };

  // ============================================================================
  // Send Notice
  // ============================================================================

  const handleSendNotice = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim()) return;

    const restaurantIds = newNotice.allRestaurants
      ? (metadata?.restaurants || []).map(r => r.id)
      : newNotice.selectedRestaurantIds;

    if (restaurantIds.length === 0) return;

    setSending(true);
    try {
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify({
          title: newNotice.title,
          content: newNotice.content,
          target_type: 'restaurant',
          restaurant_ids: restaurantIds,
          priority: newNotice.priority,
          category: newNotice.category,
          attachments: newAttachments.length > 0 ? newAttachments : undefined
        })
      });

      if (response.ok) {
        setNewNotice({
          title: '',
          content: '',
          priority: 'normal',
          category: 'general',
          allRestaurants: true,
          selectedRestaurantIds: []
        });
        setNewAttachments([]);
        setShowNewModal(false);
        await fetchSentNotices();
        setActiveTab('sent');
      }
    } catch (error) {
      console.error('Error sending notice:', error);
    } finally {
      setSending(false);
    }
  };

  // ============================================================================
  // Delete Notice
  // ============================================================================

  const handleDeleteNotice = async (noticeId: number) => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setSentNotices(prev => prev.filter(n => n.id !== noticeId));
        if (viewNotice?.id === noticeId) {
          setShowViewModal(false);
          setViewNotice(null);
        }
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
    }
  };

  // ============================================================================
  // Helpers
  // ============================================================================

  const formatDateTime = (dateString: string) => {
    return formatDateTimeTz(dateString, null);
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date().getTime();
    const then = new Date(dateString).getTime();
    const diffMs = now - then;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDateTime(dateString);
  };

  const toggleRestaurantSelection = (restaurantId: number) => {
    setNewNotice(prev => {
      const ids = prev.selectedRestaurantIds.includes(restaurantId)
        ? prev.selectedRestaurantIds.filter(id => id !== restaurantId)
        : [...prev.selectedRestaurantIds, restaurantId];
      return { ...prev, selectedRestaurantIds: ids };
    });
  };

  // ============================================================================
  // Filtered Data
  // ============================================================================

  const currentNotices = activeTab === 'received' ? receivedNotices : sentNotices;

  const filteredNotices = currentNotices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notice.author_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (notice.content || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    const matchesCategory = categoryFilter === 'all' || (notice.category || 'general') === categoryFilter;
    const matchesAuthorRole = authorRoleFilter === 'all' || activeTab === 'sent' || notice.author_role === authorRoleFilter;
    return matchesSearch && matchesPriority && matchesCategory && matchesAuthorRole;
  });

  // Stats
  const totalReceived = receivedNotices.length;
  const unreadCount = receivedNotices.filter(n => !n.read_at).length;
  const totalSent = sentNotices.length;
  const urgentCount = [...receivedNotices, ...sentNotices].filter(n => n.priority === 'urgent').length;

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <>
      <Container>
        <Header>
          <Title>{'Notices'}</Title>
          <ActionSection>
            <Button variant="primary" onClick={() => setShowNewModal(true)}>{'New Notice'}</Button>
          </ActionSection>
        </Header>

        <Content>
          {/* Stats */}
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{totalReceived}</StatValue>
              <StatLabel>{'Received'}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{unreadCount}</StatValue>
              <StatLabel>{'Unread'}</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{totalSent}</StatValue>
              <StatLabel>{'Sent'}</StatLabel>
            </StatCard>
            <StatCard color="#EF4444">
              <StatValue>{urgentCount}</StatValue>
              <StatLabel>{'Urgent'}</StatLabel>
            </StatCard>
          </StatsGrid>

          {/* Tabs */}
          <Tabs>
            <Tab active={activeTab === 'received'} onClick={() => setActiveTab('received')}>
              Received<TabBadge count={totalReceived} showZero />
            </Tab>
            <Tab active={activeTab === 'sent'} onClick={() => setActiveTab('sent')}>
              Sent<TabBadge count={totalSent} showZero />
            </Tab>
          </Tabs>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {(['all', 'general', 'guide', 'updates'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: categoryFilter === cat ? '1.5px solid #635BFF' : '1px solid #C7CED6',
                  background: categoryFilter === cat ? '#F0EFFF' : 'white',
                  color: categoryFilter === cat ? '#635BFF' : '#4B5563',
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
          <FiltersContainer>
            <SearchInput
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {activeTab === 'received' && (
              <FilterSelect
                value={authorRoleFilter}
                onChange={(e) => setAuthorRoleFilter(e.target.value)}
              >
                <option value="all">{'All Senders'}</option>
                <option value="System Admin">{'System Admin'}</option>
                <option value="Brand General">{'Brand General'}</option>
                <option value="Foodcourt General">{'Foodcourt General'}</option>
                <option value="Restaurant Owner">{'Multi-Restaurant Owner'}</option>
              </FilterSelect>
            )}
            <FilterSelect
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">{'All Priority'}</option>
              <option value="normal">{'Normal'}</option>
              <option value="important">{'Important'}</option>
              <option value="urgent">{'Urgent'}</option>
            </FilterSelect>
          </FiltersContainer>

          {/* Notice Cards */}
          <NoticesGrid>
            {filteredNotices.map(notice => (
              <NoticeCard
                key={notice.id}
                unread={activeTab === 'received' && !notice.read_at}
                onClick={() => handleViewNotice(notice)}
                style={notice.category === 'guide' ? { borderLeft: '4px solid #10B981' } : undefined}
              >
                <NoticeHeader>
                  <NoticeInfo>
                    {activeTab === 'received' && !notice.read_at && <UnreadDot />}
                    <NoticeTextInfo>
                      <NoticeTitle>{notice.title}</NoticeTitle>
                      <NoticeMeta>
                        {activeTab === 'received' && (
                          <span>From: {notice.author?.full_name || notice.author_name}</span>
                        )}
                        {activeTab === 'received' && notice.author_role && (
                          <span>{notice.author_role}</span>
                        )}
                        {activeTab === 'sent' && notice.recipients && (
                          <span>
                            To: {notice.recipients.length} recipient{notice.recipients.length !== 1 ? 's' : ''}
                          </span>
                        )}
                        <span>{formatRelativeTime(notice.createdAt)}</span>
                      </NoticeMeta>
                    </NoticeTextInfo>
                  </NoticeInfo>
                  <BadgeContainer>
                    {notice.category === 'guide' && (
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{'Guide'}</span>
                    )}
                    {notice.category === 'updates' && (
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#EDE9FE', color: '#5B21B6' }}>Updates</span>
                    )}
                    <PriorityBadge priority={notice.priority}>{notice.priority}</PriorityBadge>
                  </BadgeContainer>
                </NoticeHeader>

                <NoticePreview>{notice.content}</NoticePreview>

                <NoticeFooter>
                  <span>{formatDateTime(notice.createdAt)}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
                    {activeTab === 'sent' && (
                      <DeleteButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotice(notice.id);
                        }}
                      >
                        Delete
                      </DeleteButton>
                    )}
                  </div>
                </NoticeFooter>
              </NoticeCard>
            ))}

            {filteredNotices.length === 0 && !loading && (
              <EmptyState>
                <h3>
                  {activeTab === 'received' ? 'No received notices' : 'No sent notices'}
                </h3>
                <p>
                  {activeTab === 'received'
                    ? 'You have no notices at this time. New notices will appear here.'
                    : 'You have not sent any notices yet. Click "New Notice" to send one to your restaurants.'}
                </p>
              </EmptyState>
            )}
          </NoticesGrid>
        </Content>
      </Container>

      {/* ================================================================== */}
      {/* New Notice Modal */}
      {/* ================================================================== */}
      {showNewModal && (
        <CommonModal isOpen={true} onClose={() => setShowNewModal(false)} title="New Notice" footer={<><Button variant="secondary" onClick={() => setShowNewModal(false)}>{'Cancel'}</Button><Button variant="primary" onClick={handleSendNotice} disabled={sending || !newNotice.title.trim() || !newNotice.content.trim() || (!newNotice.allRestaurants && newNotice.selectedRestaurantIds.length === 0)}>{sending ? 'Sending...' : 'Send Notice'}</Button></>}>
              <FormGroup>
                <FormLabel>Title *</FormLabel>
                <FormInput
                  type="text"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Notice title"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Content *</FormLabel>
                <FormTextArea
                  value={newNotice.content}
                  onChange={(e) => setNewNotice(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your notice content here..."
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>{'Attachments'}</FormLabel>
                <FileUpload
                  files={newAttachments}
                  onChange={setNewAttachments}
                  maxFiles={5}
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: '16px' }}>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>{'Category'}</FormLabel>
                  <FormSelect
                    value={newNotice.category}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="general">{'General'}</option>
                    <option value="guide">{'Guide'}</option>
                  </FormSelect>
                </FormGroup>
                <FormGroup style={{ flex: 1 }}>
                  <FormLabel>{'Priority'}</FormLabel>
                  <FormSelect
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice(prev => ({ ...prev, priority: e.target.value as any }))}
                  >
                    <option value="normal">{'Normal'}</option>
                    <option value="important">{'Important'}</option>
                    <option value="urgent">{'Urgent'}</option>
                  </FormSelect>
                </FormGroup>
              </div>

              <FormGroup>
                <FormLabel>{'Target Restaurants'}</FormLabel>
                <CheckboxRow>
                  <input
                    type="checkbox"
                    checked={newNotice.allRestaurants}
                    onChange={(e) => setNewNotice(prev => ({
                      ...prev,
                      allRestaurants: e.target.checked,
                      selectedRestaurantIds: e.target.checked ? [] : prev.selectedRestaurantIds
                    }))}
                  />
                  All Owned Restaurants
                </CheckboxRow>

                {!newNotice.allRestaurants && metadata && metadata.restaurants.length > 0 && (
                  <RestaurantCheckboxList>
                    {metadata.restaurants.map(restaurant => (
                      <RestaurantCheckboxItem key={restaurant.id}>
                        <input
                          type="checkbox"
                          checked={newNotice.selectedRestaurantIds.includes(restaurant.id)}
                          onChange={() => toggleRestaurantSelection(restaurant.id)}
                        />
                        {restaurant.name}
                      </RestaurantCheckboxItem>
                    ))}
                  </RestaurantCheckboxList>
                )}

                {!newNotice.allRestaurants && newNotice.selectedRestaurantIds.length > 0 && (
                  <RecipientInfo style={{ marginTop: '8px', display: 'block' }}>
                    {newNotice.selectedRestaurantIds.length} restaurant{newNotice.selectedRestaurantIds.length !== 1 ? 's' : ''} selected
                  </RecipientInfo>
                )}
              </FormGroup>
        </CommonModal>
      )}

      {/* ================================================================== */}
      {/* View Notice Modal */}
      {/* ================================================================== */}
      {showViewModal && viewNotice && (
        <CommonModal isOpen={true} onClose={() => { setShowViewModal(false); setViewNotice(null); }} title={viewNotice.title} size="large" footer={<>{viewNotice.category === 'guide' && (<Button variant="secondary" onClick={async () => { try { const res = await fetch(`/api/work-manuals/from-notice/${viewNotice.id}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAuthToken()}` }, body: JSON.stringify({}) }); const data = await res.json(); if (data.success) { setShowViewModal(false); setViewNotice(null); navigate('/pos/owner/work-manuals'); } else { console.error('Send to Work Manuals failed:', data); } } catch (e) { console.error('Send to Work Manuals error:', e); } }}>Send to Work Manuals</Button>)}<Button variant="secondary" onClick={() => { setShowViewModal(false); setViewNotice(null); }}>{'Close'}</Button></>}>
              <NoticeDetailMeta>
                <MetaItem>
                  <MetaLabel>From:</MetaLabel>
                  <MetaValue>{viewNotice.author?.full_name || viewNotice.author_name}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Role:</MetaLabel>
                  <MetaValue>{viewNotice.author?.role || viewNotice.author_role}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Date:</MetaLabel>
                  <MetaValue>{formatDateTime(viewNotice.createdAt)}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Priority:</MetaLabel>
                  <PriorityBadge priority={viewNotice.priority}>{viewNotice.priority}</PriorityBadge>
                </MetaItem>
              </NoticeDetailMeta>

              {/* Recipients (for sent notices) */}
              {viewNotice.recipients && viewNotice.recipients.length > 0 && (
                <FormGroup>
                  <FormLabel>{'Recipients'}</FormLabel>
                  <RecipientsTagList>
                    {viewNotice.recipients.map((r: any, idx: number) => (
                      <RecipientTag key={idx}>
                        {r.restaurant?.name || r.user?.name || `Recipient #${idx + 1}`}
                      </RecipientTag>
                    ))}
                  </RecipientsTagList>
                </FormGroup>
              )}

              <NoticeContentBox>
                {viewNotice.content.split('\n').map((line, i) => (
                  <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                ))}
              </NoticeContentBox>

              {/* Attachments */}
              {viewNotice?.attachments && viewNotice.attachments.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <AttachmentList attachments={viewNotice.attachments} />
                </div>
              )}

              {/* Delete (only for notices the user authored) */}
              {viewNotice.author_id === Number(user?.id) && (
                <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteNotice(viewNotice.id)}
                  >
                    Delete Notice
                  </Button>
                </div>
              )}

              {/* Comments Section */}
              <CommentSection
                entityType="notice"
                entityId={String(viewNotice.id)}
                currentUserId={user?.id}
                onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; const key = String(viewNotice.id); if (next[key]) next[key] = { ...next[key], unread_count: 0 }; return next; })}
              />
        </CommonModal>
      )}
    </>
  );
};

export default NoticesPage;
