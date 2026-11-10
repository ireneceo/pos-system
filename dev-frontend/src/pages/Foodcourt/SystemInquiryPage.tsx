import React, { useState, useEffect } from 'react';
import ClampText from '../../components/UI/ClampText';
import ConfirmModal from '../../components/ConfirmModal';
import styled from 'styled-components';
// 2026-11-10 전 역할 문의 통일: 머리·본문 껍데기는 공용(로컬 복사본이던 것)
import { Container, Header, Title, ActionSection, Content } from '../../components/UI/PageComponents';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { StatsGrid, StatCard, StatValue, StatLabel, Modal as CommonModal } from '../../components/UI';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../utils/timezone';
interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: number;
  userName: string;
  userEmail: string;
  userRole: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdAt: string;
  updatedAt: string;
  attachments?: any[];
}






// 상태 탭 글자 = 4개 언어에 있는 공용 키
const STATUS_TAB_KEY: Record<string, string> = { all: 'common:label.all', open: 'common:status.open', 'in-progress': 'common:status.inProgress', resolved: 'common:status.resolved', closed: 'common:status.closed' };
const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 20px;
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
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
    }
  ` : `
    background: white;
    color: #4B5563;
    border: 1px solid #C7CED6;

    &:hover {
      background: #F1F4F8;
      color: #0A2540;
      border-color: #64748B;
    }
  `}
`;

const TicketsGrid = styled.div`
  /* 2026-11-10 전 역할 문의 화면 통일: 12화면 같은 값 · 칸이 글 길이에 밀려 넓어지지 않게 minmax(0,1fr) */
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
`;

const TicketCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #C7CED6;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  min-width: 0;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`;

const TicketInfo = styled.div`
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
  word-break: normal;
`;

const TicketNumber = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #635BFF;
  margin-bottom: 8px;
`;

const TicketSubject = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const TicketMeta = styled.div`
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
`;

const StatusBadge = styled.span<{ status: string }>`
  flex-shrink: 0;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'open': return '#FEF3C7';
      case 'in-progress': return '#DBEAFE';
      case 'resolved': return '#ECFDF5';
      case 'closed': return '#F1F4F8';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#D97706';
      case 'in-progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#4B5563';
      default: return '#4B5563';
    }
  }};
`;

const PriorityBadge = styled.span<{ priority: string }>`
  flex-shrink: 0;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.priority) {
      case 'urgent': return '#FEE2E2';
      case 'high': return '#FED7AA';
      case 'medium': return '#FEF3C7';
      case 'low': return '#E0F2FE';
      default: return '#F1F4F8';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#0891B2';
      default: return '#4B5563';
    }
  }};
`;

const TicketDescription = styled.div`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F1F4F8;
  border-radius: 8px;
  border-left: 3px solid #C7CED6;
  /* 자르기·펼치기는 ClampText 가 맡는다 — 여기에도 clamp 를 두면 이중으로 잘려
     펼쳐도 안 보인다(2026-09-03 실브라우저에서 확인). 배경·여백만 남긴다. */
  text-overflow: ellipsis;
`;

const TicketFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F1F4F8;
  font-size: 12px;
  color: #4B5563;
  flex-wrap: wrap;
  gap: 8px;
`;

const CloseTicketButton = styled.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #6B7280;
  border-radius: 6px;
  background: #fff;
  color: #4B5563;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #C7CED6;
    color: #1F2937;
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
  border: 1px solid #C7CED6;
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
  border: 1px solid #C7CED6;
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

const SystemInquiryPage: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useTabParam<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [infoModal, setInfoModal] = useState<{ open: boolean; title: string; message: string }>({ open: false, title: '', message: '' });
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState<string>('open');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    category: 'general'
  });
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const currentUserId = user?.id || '4';

  useEffect(() => {
    if (user) {
      fetchTickets();
      const interval = setInterval(fetchTickets, 10000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchTickets = async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/support-tickets?customerId=${currentUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const ticketsData = data.success ? data.data : (Array.isArray(data) ? data : []);
        setTickets(ticketsData);
        fetchUnreadCounts(ticketsData);
      }
    } catch (error) {
      console.error('Error fetching support tickets:', error);
    }
  };

  const fetchUnreadCounts = async (ticketList: SupportTicket[]) => {
    if (ticketList.length === 0) return;
    try {
      const token = getAuthToken();
      const ids = ticketList.map(t => t.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${ids}`, {
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
    } catch (e) { console.error('Error fetching unread counts:', e); }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    // 옛 주소(?tab=active 등) 로 들어와도 빈 목록이 되지 않게 모르는 값은 «전체»
    const matchesStatus = activeTab === 'all' || !['open', 'in-progress', 'resolved', 'closed'].includes(activeTab) || ticket.status === activeTab;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
  const closedTickets = tickets.filter(t => t.status === 'closed').length;

  const formatDateTime = (dateString: string) => {
    return formatDateTimeTz(dateString, null);
  };

  const handleCreateTicket = () => {
    setShowCreateModal(true);
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDetailStatus(ticket.status);
    setShowViewModal(true);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleStatusChange = async () => {
    if (!selectedTicket) return;
    try {
      const token = getAuthToken();
      const response = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: detailStatus })
      });
      if (response.ok) {
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: detailStatus as SupportTicket['status'] } : t));
        setSelectedTicket(prev => prev ? { ...prev, status: detailStatus as SupportTicket['status'] } : prev);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCloseTicketFromModal = async () => {
    if (!selectedTicket) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'closed' })
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => t.id === selectedTicket.id ? { ...t, status: 'closed' as SupportTicket['status'] } : t));
        setShowViewModal(false);
        setSelectedTicket(null);
        window.dispatchEvent(new Event('refreshBadgeCounts'));
      }
    } catch (err) { /* silent */ }
  };

  const handleSubmitTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim()) {
      setInfoModal({ open: true, title: 'Required Fields', message: 'Please fill in all required fields.' });
      return;
    }

    try {
      const ticketData = {
        subject: newTicket.subject,
        description: newTicket.description,
        priority: newTicket.priority,
        category: newTicket.category,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      const token = getAuthToken();
      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(ticketData)
      });

      if (response.ok) {
        await fetchTickets();
        setNewTicket({
          subject: '',
          description: '',
          priority: 'medium',
          category: 'general'
        });
        setNewAttachments([]);
        setShowCreateModal(false);
      } else {
        setInfoModal({ open: true, title: 'Submission Failed', message: 'Failed to create ticket. Please try again.' });
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      setInfoModal({ open: true, title: 'Submission Failed', message: 'Error creating ticket. Please try again.' });
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>{t('common:systemInquiryPage.systemInquiry')}</Title>
          <ActionSection>
            <Button variant="primary" onClick={handleCreateTicket}>{t('common:systemInquiryPage.newInquiry')}</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>{t('common:systemInquiryPage.totalTickets')}</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>{t('common:systemInquiryPage.openTickets')}</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>{t('common:systemInquiryPage.inProgress')}</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>{t('common:systemInquiryPage.resolved')}</StatLabel>
            </StatCard>
          </StatsGrid>
          {/* 2026-11-10 전 역할 문의 통일: 보내는 쪽 = RA 시스템 문의와 같은 상태 탭 5개(이전 Active/Closed 두 탭) */}
          <Tabs>
            {(['all', 'open', 'in-progress', 'resolved', 'closed'] as const).map(st => (
              <Tab key={st} active={activeTab === st} onClick={() => setActiveTab(st)}>
                {t(STATUS_TAB_KEY[st])} <Badge count={st === 'all' ? tickets.length : tickets.filter(tk => tk.status === st).length} showZero />
              </Tab>
            ))}
          </Tabs>

          <FilterBar>
            <SearchInput
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">{t('common:systemInquiryPage.allPriority')}</option>
              <option value="urgent">{t('common:systemInquiryPage.urgent')}</option>
              <option value="high">{t('common:systemInquiryPage.high')}</option>
              <option value="medium">{t('common:systemInquiryPage.medium')}</option>
              <option value="low">{t('common:systemInquiryPage.low')}</option>
            </FilterSelect>
            <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">{t('common:systemInquiryPage.allCategories')}</option>
              <option value="technical">{t('common:systemInquiryPage.technical')}</option>
              <option value="billing">{t('common:systemInquiryPage.billing')}</option>
              <option value="feature-request">{t('common:systemInquiryPage.featureRequest')}</option>
              <option value="bug-report">{t('common:systemInquiryPage.bugReport')}</option>
              <option value="general">{t('common:systemInquiryPage.general')}</option>
            </FilterSelect>
          </FilterBar>

          <TicketsGrid>
            {filteredTickets.map(ticket => (
              <TicketCard key={ticket.id} style={{ cursor: 'pointer' }} onClick={() => handleViewTicket(ticket)}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                    <TicketSubject>{ticket.subject}</TicketSubject>
                    <TicketMeta>
                      <span>Category: {ticket.category}</span>
                    </TicketMeta>
                  </TicketInfo>
                  <BadgeContainer>
                    <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                    <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                  </BadgeContainer>
                </TicketHeader>

                <TicketDescription as="div">
                  <ClampText
                    text={ticket.description}
                    moreLabel={t('common:showMore')}
                    lessLabel={t('common:showLess')}
                  />
                </TicketDescription>

                <TicketFooter>
                  <span>Created: {formatDateTime(ticket.createdAt)}</span>
                  {unreadCounts[ticket.id] && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Comments {unreadCounts[ticket.id].total_comments}
                      {unreadCounts[ticket.id].unread_count > 0 && (
                        <span style={{ background: '#EF4444', color: 'white', borderRadius: '10px', padding: '1px 7px', fontSize: '11px', fontWeight: 600 }}>
                          {unreadCounts[ticket.id].unread_count} new
                        </span>
                      )}
                    </span>
                  )}
                  {(ticket.status === 'open' || ticket.status === 'in-progress') && (
                    <CloseTicketButton
                      onClick={(e) => {
                        e.stopPropagation();
                        (async () => {
                          try {
                            const token = getAuthToken();
                            const response = await fetch(`/api/support-tickets/${ticket.id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                              body: JSON.stringify({ status: 'closed' })
                            });
                            if (response.ok) {
                              setTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, status: 'closed' as SupportTicket['status'] } : t));
                              window.dispatchEvent(new Event('refreshBadgeCounts'));
                            }
                          } catch (err) { /* silent */ }
                        })();
                      }}
                      style={{ marginLeft: 'auto' }}
                    >
                      Close
                    </CloseTicketButton>
                  )}
                </TicketFooter>
              </TicketCard>
            ))}

            {filteredTickets.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#4B5563',
                gridColumn: '1 / -1'
              }}>
                <h3 style={{ color: '#1F2937', margin: '0 0 4px', fontSize: 14, fontWeight: 600 }}>{t('common:systemInquiryPage.noTicketsYet')}</h3>
                <p style={{ margin: 0, fontSize: 14 }}>Click "New Inquiry" to submit your first support ticket to system administrator.</p>
              </div>
            )}
          </TicketsGrid>

          {/* Create Ticket Modal */}
          {showCreateModal && (
            <CommonModal
              isOpen={true}
              onClose={() => setShowCreateModal(false)}
              title="Create System Inquiry"
              footer={
                <>
                  <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmitTicket}
                    disabled={!newTicket.subject.trim() || !newTicket.description.trim()}
                  >
                    Submit Inquiry
                  </Button>
                </>
              }
            >
                  <FormGroup>
                    <FormLabel>Subject *</FormLabel>
                    <FormInput
                      type="text"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      placeholder="Brief description of your inquiry"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormLabel>Description *</FormLabel>
                    <FormTextArea
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      placeholder="Detailed description of your inquiry..."
                      required
                    />
                  </FormGroup>
                  <div>
                    <FormLabel>{t('common:systemInquiryPage.attachments')}</FormLabel>
                    <FileUpload
                      files={newAttachments}
                      onChange={setNewAttachments}
                      maxFiles={5}
                    />
                  </div>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>{t('common:systemInquiryPage.priority')}</FormLabel>
                      <FormSelect
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as any})}
                      >
                        <option value="low">{t('common:systemInquiryPage.low')}</option>
                        <option value="medium">{t('common:systemInquiryPage.medium')}</option>
                        <option value="high">{t('common:systemInquiryPage.high')}</option>
                        <option value="urgent">{t('common:systemInquiryPage.urgent')}</option>
                      </FormSelect>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel>{t('common:systemInquiryPage.category')}</FormLabel>
                      <FormSelect
                        value={newTicket.category}
                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      >
                        <option value="general">{t('common:systemInquiryPage.general')}</option>
                        <option value="technical">{t('common:systemInquiryPage.technicalIssue')}</option>
                        <option value="billing">{t('common:systemInquiryPage.billing')}</option>
                        <option value="feature-request">{t('common:systemInquiryPage.featureRequest')}</option>
                        <option value="bug-report">{t('common:systemInquiryPage.bugReport')}</option>
                      </FormSelect>
                    </FormGroup>
                  </FormRow>
              </CommonModal>
          )}

          {/* View Ticket Detail Modal */}
          {showViewModal && selectedTicket && (
            <CommonModal
              isOpen={true}
              onClose={() => setShowViewModal(false)}
              title="Inquiry Details"
              footer={selectedTicket.status !== 'closed' ? (
                <Button variant="primary" onClick={handleCloseTicketFromModal}>{t('common:systemInquiryPage.closeTicket', 'Close Ticket')}</Button>
              ) : undefined}
            >
                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('common:systemInquiryPage.ticketNumber')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>{selectedTicket.ticketNumber}</div>
                      </div>
                      <div>
                        <FormLabel>{t('common:systemInquiryPage.status')}</FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FormSelect value={detailStatus} onChange={(e) => setDetailStatus(e.target.value)} style={{ flex: 1 }}>
                            <option value="open">{t('common:systemInquiryPage.open')}</option>
                            <option value="in-progress">{t('common:systemInquiryPage.inProgress')}</option>
                            <option value="resolved">{t('common:systemInquiryPage.resolved')}</option>
                            <option value="closed">{t('common:systemInquiryPage.closed')}</option>
                          </FormSelect>
                          {detailStatus !== selectedTicket.status && (
                            <Button variant="primary" onClick={handleStatusChange} style={{ padding: '10px 20px' }}>{t('common:systemInquiryPage.save')}</Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>{t('common:systemInquiryPage.priority')}</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge>
                        </div>
                      </div>
                      <div>
                        <FormLabel>{t('common:systemInquiryPage.category')}</FormLabel>
                        <div style={{ padding: '8px 0', color: '#1F2937', textTransform: 'capitalize' }}>{selectedTicket.category.replace('-', ' ')}</div>
                      </div>
                    </div>
                    <div>
                      <FormLabel>{t('common:systemInquiryPage.subject')}</FormLabel>
                      <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>{selectedTicket.subject}</div>
                    </div>
                    <div>
                      <FormLabel>{t('common:systemInquiryPage.description')}</FormLabel>
                      <div style={{ padding: '12px', backgroundColor: '#F1F4F8', borderRadius: '8px', border: '1px solid #C7CED6', minHeight: '80px', whiteSpace: 'pre-wrap', lineHeight: '1.5', color: '#1F2937' }}>
                        {selectedTicket.description}
                      </div>
                    </div>
                    {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                      <AttachmentList attachments={selectedTicket.attachments} />
                    )}
                    <div>
                      <FormLabel>{t('common:systemInquiryPage.created')}</FormLabel>
                      <div style={{ padding: '8px 0', color: '#4B5563' }}>{formatDateTime(selectedTicket.createdAt)}</div>
                    </div>
                  </div>
                  <CommentSection entityType="support_ticket" entityId={selectedTicket.id} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; if (next[selectedTicket.id]) next[selectedTicket.id] = { ...next[selectedTicket.id], unread_count: 0 }; return next; })} />
              </CommonModal>
          )}
        </Content>
      </Container>

      <ConfirmModal
        isOpen={infoModal.open}
        title={infoModal.title}
        message={infoModal.message}
        onConfirm={() => setInfoModal({ open: false, title: '', message: '' })}
        onCancel={() => setInfoModal({ open: false, title: '', message: '' })}
        confirmText="OK"
        type="info"
        singleButton
      />
    </>
  );
};

export default SystemInquiryPage;
