import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmptyState } from '../../components/UI/TableComponents';
import { useParams } from 'react-router-dom';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { Modal as CommonModal } from '../../components/UI';
import { StatsGrid, StatCard, StatValue, StatLabel } from '../../components/UI/StatCard';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import AttachmentList from '../../components/Common/AttachmentList';
import CommentSection from '../../components/Common/CommentSection';
import { linkifyText } from '../../utils/linkify';
import { useAuth } from '../../contexts/AuthContext';
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
  target_type: string;
  priority: 'normal' | 'important' | 'urgent';
  status: string;
  createdAt: string;
  category?: 'general' | 'guide' | 'updates';
  commentCount: number;
  attachments?: any[];
  author?: any;
  read_at?: string | null;
}

// ============================================================================
// Styled Components
// ============================================================================

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  align-items: center;

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

const NoticeCard = styled.div<{ isUnread?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  ${props => props.isUnread && `
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

const NoticeCardInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const NoticeTitle = styled.div<{ isUnread?: boolean }>`
  font-size: 16px;
  font-weight: ${props => props.isUnread ? '700' : '600'};
  color: #0A2540;
  margin-bottom: 8px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UnreadDot = styled.div`
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  background: #635BFF;
`;

const NoticeContentPreview = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoticeCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #6B7280;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AuthorRoleBadge = styled.span<{ role: string }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    const r = props.role.toLowerCase();
    if (r.includes('admin') || r.includes('system')) return '#E0F2FE';
    if (r.includes('brand')) return '#F3E8FF';
    if (r.includes('foodcourt')) return '#FEF3C7';
    return '#F3F4F6';
  }};
  color: ${props => {
    const r = props.role.toLowerCase();
    if (r.includes('admin') || r.includes('system')) return '#0891B2';
    if (r.includes('brand')) return '#7C3AED';
    if (r.includes('foodcourt')) return '#D97706';
    return '#6B7280';
  }};
`;

const NoticeCardBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
  flex-shrink: 0;
`;

const PriorityBadge = styled.span<{ priority: string }>`
  padding: 4px 12px;
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

const CommentCountBadge = styled.span`
  font-size: 12px;
  color: #6B7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const DateText = styled.span`
  font-size: 12px;
  color: #9CA3AF;
`;



const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;

    &:hover {
      background: #5A51E6;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #6B7280;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Notice Detail styled components
const NoticeDetailSection = styled.div`
  margin-bottom: 24px;
`;

const NoticeDetailLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const NoticeDetailContent = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.7;
  white-space: pre-wrap;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  min-height: 80px;
`;

const NoticeFromInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const NoticeFromAvatar = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 50%;
  background: #635BFF;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
`;

const NoticeFromDetails = styled.div`
  flex: 1;
`;

const NoticeFromName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 2px;
`;

const NoticeFromRole = styled.div`
  font-size: 12px;
  color: #6B7280;
`;

const DetailMetaRow = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

const DetailMetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailMetaLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #6B7C93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DetailMetaValue = styled.span`
  font-size: 14px;
  color: #374151;
`;


const LoadingText = styled.div`
  text-align: center;
  padding: 40px 20px;
  font-size: 14px;
  color: #6B7280;
`;

// ============================================================================
// Component
// ============================================================================

const NoticesPage: React.FC = () => {
  const { t } = useTranslation('settings');
  useParams<{ restaurantId: string }>();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'general' | 'guide' | 'updates'>('all');
  const [authorRoleFilter, setAuthorRoleFilter] = useState('all');

  // View Modal state
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [noticeDetail, setNoticeDetail] = useState<Notice | null>(null);

  // Unread counts for comment badges
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});
  const { user } = useAuth();

  const token = getAuthToken();

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
          setUnreadCounts(map);
        }
      }
    } catch (e) { /* silent */ }
  };

  // ── Fetch received notices ──────────────────────────────────────────
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/notices/received', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        const noticeArray = Array.isArray(data) ? data : [];
        setNotices(noticeArray);
        fetchUnreadCounts(noticeArray);
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fetch notice detail (marks as read) ─────────────────────────────
  const fetchNoticeDetail = async (noticeId: number) => {
    try {
      const response = await fetch(`/api/notices/${noticeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        setNoticeDetail(data);

        // Update the notice in the list to mark as read
        setNotices(prev =>
          prev.map(n =>
            n.id === noticeId ? { ...n, read_at: new Date().toISOString() } : n
          )
        );
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      }
    } catch (error) {
      console.error('Failed to fetch notice detail:', error);
    }
  };


  // ── Open view modal ─────────────────────────────────────────────────
  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setNoticeDetail(null);
    setShowViewModal(true);
    fetchNoticeDetail(notice.id);
  };

  // ── Close view modal ────────────────────────────────────────────────
  const handleCloseModal = () => {
    setShowViewModal(false);
    setSelectedNotice(null);
    setNoticeDetail(null);
  };

  // ── Filter notices ──────────────────────────────────────────────────
  const filteredNotices = notices.filter(notice => {
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || notice.priority === filterPriority;
    const matchesCategory = categoryFilter === 'all' || (notice.category || 'general') === categoryFilter;
    const matchesAuthorRole = authorRoleFilter === 'all' || notice.author_role === authorRoleFilter;
    return matchesSearch && matchesPriority && matchesCategory && matchesAuthorRole;
  });

  // ── Stats ───────────────────────────────────────────────────────────
  const totalReceived = notices.length;
  const unreadCount = notices.filter(n => !n.read_at).length;
  const importantCount = notices.filter(n => n.priority === 'important').length;
  const urgentCount = notices.filter(n => n.priority === 'urgent').length;

  // ── Helpers ─────────────────────────────────────────────────────────
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <Container>
      <Header>
        <Title>{t('settings:noticesPage.notices')}</Title>
      </Header>

      <Content>
        {/* Stats */}
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{totalReceived}</StatValue>
            <StatLabel>{t('settings:noticesPage.totalReceived')}</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{unreadCount}</StatValue>
            <StatLabel>{t('settings:noticesPage.unread')}</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{importantCount}</StatValue>
            <StatLabel>{t('settings:noticesPage.important')}</StatLabel>
          </StatCard>
          <StatCard color="#DC2626">
            <StatValue>{urgentCount}</StatValue>
            <StatLabel>{t('settings:noticesPage.urgent')}</StatLabel>
          </StatCard>
        </StatsGrid>

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
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={authorRoleFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAuthorRoleFilter(e.target.value)}
          >
            <option value="all">{t('settings:noticesPage.allSenders')}</option>
            <option value="System Admin">{t('settings:noticesPage.systemAdmin')}</option>
            <option value="Brand General">{t('settings:noticesPage.brandGeneral')}</option>
            <option value="Foodcourt General">{t('settings:noticesPage.foodcourtGeneral')}</option>
            <option value="Restaurant Owner">{t('settings:noticesPage.restaurantOwner')}</option>
          </FilterSelect>
          <FilterSelect
            value={filterPriority}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterPriority(e.target.value)}
          >
            <option value="all">{t('settings:noticesPage.allPriorities')}</option>
            <option value="normal">{t('settings:noticesPage.normal')}</option>
            <option value="important">{t('settings:noticesPage.important')}</option>
            <option value="urgent">{t('settings:noticesPage.urgent')}</option>
          </FilterSelect>
        </FilterBar>

        {/* Notices List */}
        {loading ? (
          <LoadingText>{t('settings:noticesPage.loadingNotices')}</LoadingText>
        ) : filteredNotices.length === 0 ? (
          <EmptyState>
            <h3>{t('settings:noticesPage.noNoticesFound')}</h3>
            <p>
              {searchTerm || filterPriority !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'You have no notices yet.'}
            </p>
          </EmptyState>
        ) : (
          <NoticesGrid>
            {filteredNotices.map(notice => {
              const isUnread = !notice.read_at;
              return (
                <NoticeCard
                  key={notice.id}
                  isUnread={isUnread}
                  onClick={() => handleViewNotice(notice)}
                  style={notice.category === 'guide' ? { borderLeft: '4px solid #10B981' } : undefined}
                >
                  <NoticeCardHeader>
                    <NoticeCardInfo>
                      <NoticeTitle isUnread={isUnread}>
                        {isUnread && <UnreadDot />}
                        {notice.title}
                      </NoticeTitle>
                      <NoticeContentPreview>
                        {truncateContent(notice.content)}
                      </NoticeContentPreview>
                      <NoticeCardMeta>
                        <AuthorInfo>
                          {notice.author_name}
                          <AuthorRoleBadge role={notice.author_role}>
                            {notice.author_role}
                          </AuthorRoleBadge>
                        </AuthorInfo>
                        <DateText>{formatDate(notice.createdAt)}</DateText>
                        {(notice.commentCount > 0) && (
                          <CommentCountBadge>
                            {notice.commentCount} {notice.commentCount === 1 ? 'comment' : 'comments'}
                            {unreadCounts[String(notice.id)]?.unread_count > 0 && (
                              <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600, marginLeft: '4px' }}>
                                {unreadCounts[String(notice.id)].unread_count} new
                              </span>
                            )}
                          </CommentCountBadge>
                        )}
                      </NoticeCardMeta>
                    </NoticeCardInfo>
                    <NoticeCardBadges>
                      {notice.category === 'guide' && (
                        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 600, background: '#D1FAE5', color: '#065F46' }}>{t('settings:noticesPage.guide')}</span>
                      )}
                      <PriorityBadge priority={notice.priority}>
                        {notice.priority}
                      </PriorityBadge>
                    </NoticeCardBadges>
                  </NoticeCardHeader>
                </NoticeCard>
              );
            })}
          </NoticesGrid>
        )}

        {/* View Notice Modal */}
        {showViewModal && selectedNotice && (
          <CommonModal
            isOpen={true}
            onClose={handleCloseModal}
            title="Notice Details"
            size="large"
            footer={
              <>
                {selectedNotice.category === 'guide' && (
                  <Button variant="secondary" onClick={async () => {
                    try {
                      const res = await fetch(`/api/work-manuals/from-notice/${selectedNotice.id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getAuthToken()}` },
                        body: JSON.stringify({ restaurant_id: restaurantId ? parseInt(restaurantId) : undefined })
                      });
                      if ((await res.json()).success) handleCloseModal();
                    } catch (e) { /* silent */ }
                  }}>
                    Send to Work Manuals
                  </Button>
                )}
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </>
            }
          >
                {/* Title & Priority */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', gap: '16px' }}>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#0A2540', lineHeight: '1.4', flex: 1 }}>
                    {selectedNotice.title}
                  </div>
                  <PriorityBadge priority={selectedNotice.priority}>
                    {selectedNotice.priority}
                  </PriorityBadge>
                </div>

                {/* From Info */}
                <NoticeDetailSection>
                  <NoticeDetailLabel>{t('settings:noticesPage.from')}</NoticeDetailLabel>
                  <NoticeFromInfo>
                    <NoticeFromAvatar>
                      {getInitial(noticeDetail?.author_name || selectedNotice.author_name)}
                    </NoticeFromAvatar>
                    <NoticeFromDetails>
                      <NoticeFromName>
                        {noticeDetail?.author_name || selectedNotice.author_name}
                      </NoticeFromName>
                      <NoticeFromRole>
                        {noticeDetail?.author_role || selectedNotice.author_role}
                      </NoticeFromRole>
                    </NoticeFromDetails>
                  </NoticeFromInfo>
                </NoticeDetailSection>

                {/* Meta: Date & Target */}
                <DetailMetaRow>
                  <DetailMetaItem>
                    <DetailMetaLabel>{t('settings:noticesPage.date')}</DetailMetaLabel>
                    <DetailMetaValue>
                      {formatDateTime(noticeDetail?.createdAt || selectedNotice.createdAt)}
                    </DetailMetaValue>
                  </DetailMetaItem>
                  <DetailMetaItem>
                    <DetailMetaLabel>{t('settings:noticesPage.priority')}</DetailMetaLabel>
                    <DetailMetaValue style={{ textTransform: 'capitalize' }}>
                      {noticeDetail?.priority || selectedNotice.priority}
                    </DetailMetaValue>
                  </DetailMetaItem>
                  <DetailMetaItem>
                    <DetailMetaLabel>{t('settings:noticesPage.status')}</DetailMetaLabel>
                    <DetailMetaValue style={{ textTransform: 'capitalize' }}>
                      {noticeDetail?.status || selectedNotice.status}
                    </DetailMetaValue>
                  </DetailMetaItem>
                </DetailMetaRow>

                {/* Content */}
                <NoticeDetailSection>
                  <NoticeDetailLabel>{t('settings:noticesPage.content')}</NoticeDetailLabel>
                  <NoticeDetailContent>
                    {(noticeDetail?.content || selectedNotice.content).split('\n').map((line: string, i: number) => (
                      <React.Fragment key={i}>{i > 0 && <br />}{linkifyText(line)}</React.Fragment>
                    ))}
                  </NoticeDetailContent>
                </NoticeDetailSection>

                {/* Attachments */}
                {(noticeDetail?.attachments || selectedNotice?.attachments) &&
                  (noticeDetail?.attachments || selectedNotice?.attachments || []).length > 0 && (
                  <NoticeDetailSection>
                    <NoticeDetailLabel>{t('settings:noticesPage.attachments')}</NoticeDetailLabel>
                    <AttachmentList attachments={noticeDetail?.attachments || selectedNotice?.attachments || []} />
                  </NoticeDetailSection>
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
      </Content>
    </Container>
  );
};

export default NoticesPage;
