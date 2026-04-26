import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  Modal as CommonModal
} from '../../components/UI';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../utils/timezone';

// ----- Types -----

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerRole: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature-request' | 'bug-report' | 'general';
  createdAt: string;
  updatedAt: string;
  attachments?: any[];
}

// ----- Styled -----

const FiltersContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const TicketsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const TicketCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
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
`;

const TicketNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const TicketSubject = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
  line-height: 1.4;
`;

const TicketBadges = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'open': return '#FEF3C7';
      case 'in-progress': return '#DBEAFE';
      case 'resolved': return '#ECFDF5';
      case 'closed': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'open': return '#D97706';
      case 'in-progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#6B7280';
      default: return '#6B7280';
    }
  }};
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
      case 'high': return '#FED7AA';
      case 'medium': return '#FEF3C7';
      case 'low': return '#E0F2FE';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#0891B2';
      default: return '#6B7280';
    }
  }};
`;

const TicketDescription = styled.div`
  font-size: 14px;
  color: #6B7280;
  line-height: 1.5;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`;

const TicketMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 12px;
`;

const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MetaLabel = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaValue = styled.span`
  color: #374151;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

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
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

// ----- Component -----

const SupplierSystemInquiryPage: React.FC = () => {
  const { t } = useTranslation('supplier');
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [detailStatus, setDetailStatus] = useState<SupportTicket['status']>('open');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'general' as SupportTicket['category']
  });
  const [newAttachments, setNewAttachments] = useState<AttachmentFile[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, { total_comments: number; unread_count: number }>>({});

  const fetchUnreadCounts = async (ticketList: SupportTicket[]) => {
    if (ticketList.length === 0) return;
    try {
      const token = getAuthToken();
      const ids = ticketList.map(t => t.id).join(',');
      const res = await fetch(`/api/comments/unread-counts?entity_type=support_ticket&entity_ids=${ids}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const map: Record<string, { total_comments: number; unread_count: number }> = {};
          data.data.forEach((item: any) => {
            map[item.entity_id] = {
              total_comments: Number(item.total_comments),
              unread_count: Number(item.unread_count)
            };
          });
          setUnreadCounts(map);
        }
      }
    } catch (e) {
      // silent
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch('/api/support-tickets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          const result = await response.json();
          const ticketsData = result.data || result;
          setTickets(Array.isArray(ticketsData) ? ticketsData : []);
          fetchUnreadCounts(Array.isArray(ticketsData) ? ticketsData : []);
        }
      } catch (error) {
        // silent
      }
    };

    fetchTickets();
    const interval = setInterval(fetchTickets, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.ticketNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesCategory = filterCategory === 'all' || ticket.category === filterCategory;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  const formatDateTime = (dateString: string) => formatDateTimeTz(dateString, null);

  const handleSubmitTicket = async () => {
    try {
      const token = getAuthToken();
      const payload = {
        customerId: user?.id || 'supplier-user',
        customerName: user?.name || 'Supplier',
        customerEmail: user?.email || 'supplier@company.com',
        customerRole: 'supplier',
        subject: newTicket.subject,
        description: newTicket.description,
        status: 'open',
        priority: newTicket.priority,
        category: newTicket.category,
        attachments: newAttachments.length > 0 ? newAttachments : undefined
      };

      const response = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        const created = result.data || result;
        setTickets(prev => [created, ...prev]);
        setShowCreateModal(false);
        setNewTicket({ subject: '', description: '', priority: 'medium', category: 'general' });
        setNewAttachments([]);
      }
    } catch (e) {
      // silent
    }
  };

  const handleViewTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setDetailStatus(ticket.status);
    setShowViewModal(true);
    window.dispatchEvent(new Event('refreshBadgeCounts'));
  };

  const handleCloseTicketFromModal = async () => {
    if (!selectedTicket) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/support-tickets/${selectedTicket.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'closed' })
      });
      if (res.ok) {
        setTickets(prev => prev.map(t => (t.id === selectedTicket.id ? { ...t, status: 'closed' } : t)));
        setShowViewModal(false);
        setSelectedTicket(null);
      }
    } catch (e) {
      // silent
    }
  };

  return (
    <Container>
      <Header>
        <Title>{t('menu.systemInquiry', 'System Inquiry')}</Title>
        <ActionSection>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create Ticket
          </Button>
        </ActionSection>
      </Header>
      <Content>
        <StatsGrid>
          <StatCard color="#059669">
            <StatValue>{totalTickets}</StatValue>
            <StatLabel>Total Tickets</StatLabel>
          </StatCard>
          <StatCard color="#D97706">
            <StatValue>{openTickets}</StatValue>
            <StatLabel>Open</StatLabel>
          </StatCard>
          <StatCard color="#2563EB">
            <StatValue>{inProgressTickets}</StatValue>
            <StatLabel>In Progress</StatLabel>
          </StatCard>
          <StatCard color="#7C3AED">
            <StatValue>{resolvedTickets}</StatValue>
            <StatLabel>Resolved</StatLabel>
          </StatCard>
        </StatsGrid>

        <FiltersContainer>
          <SearchInput
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </Select>
          <Select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
          <Select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="feature-request">Feature Request</option>
            <option value="bug-report">Bug Report</option>
            <option value="general">General</option>
          </Select>
        </FiltersContainer>

        <TicketsGrid>
          {filteredTickets.map(ticket => (
            <TicketCard key={ticket.id} onClick={() => handleViewTicket(ticket)}>
              <TicketHeader>
                <TicketInfo>
                  <TicketNumber>{ticket.ticketNumber}</TicketNumber>
                  <TicketSubject>{ticket.subject}</TicketSubject>
                </TicketInfo>
                <TicketBadges>
                  <StatusBadge status={ticket.status}>{ticket.status}</StatusBadge>
                  <PriorityBadge priority={ticket.priority}>{ticket.priority}</PriorityBadge>
                </TicketBadges>
              </TicketHeader>

              <TicketDescription>{ticket.description}</TicketDescription>

              <TicketMeta>
                <MetaItem>
                  <MetaLabel>Created</MetaLabel>
                  <MetaValue>{formatDateTime(ticket.createdAt)}</MetaValue>
                </MetaItem>
                <MetaItem>
                  <MetaLabel>Category</MetaLabel>
                  <MetaValue style={{ textTransform: 'capitalize' }}>
                    {ticket.category.replace('-', ' ')}
                  </MetaValue>
                </MetaItem>
                {unreadCounts[ticket.id] && (
                  <MetaItem>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      Comments {unreadCounts[ticket.id].total_comments}
                      {unreadCounts[ticket.id].unread_count > 0 && (
                        <span style={{
                          background: '#EF4444',
                          color: 'white',
                          borderRadius: '10px',
                          padding: '1px 7px',
                          fontSize: '11px',
                          fontWeight: 600
                        }}>
                          {unreadCounts[ticket.id].unread_count} new
                        </span>
                      )}
                    </span>
                  </MetaItem>
                )}
              </TicketMeta>
            </TicketCard>
          ))}

          {filteredTickets.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6B7280',
              gridColumn: '1 / -1'
            }}>
              <h3 style={{ color: '#374151', marginBottom: '8px' }}>No tickets yet</h3>
              <p>Click "Create Ticket" to submit your first support inquiry.</p>
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
                  disabled={!newTicket.subject || !newTicket.description}
                >
                  Create Ticket
                </Button>
              </>
            }
          >
            <FormGroup>
              <FormLabel>Subject *</FormLabel>
              <FormInput
                type="text"
                value={newTicket.subject}
                onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Enter ticket subject"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Description *</FormLabel>
              <FormTextArea
                value={newTicket.description}
                onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                placeholder="Describe the issue or request in detail..."
                rows={4}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Attachments</FormLabel>
              <FileUpload files={newAttachments} onChange={setNewAttachments} maxFiles={5} />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <FormLabel>Priority</FormLabel>
                <FormSelect
                  value={newTicket.priority}
                  onChange={e =>
                    setNewTicket({ ...newTicket, priority: e.target.value as SupportTicket['priority'] })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel>Category</FormLabel>
                <FormSelect
                  value={newTicket.category}
                  onChange={e =>
                    setNewTicket({ ...newTicket, category: e.target.value as SupportTicket['category'] })
                  }
                >
                  <option value="general">General</option>
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="bug-report">Bug Report</option>
                </FormSelect>
              </FormGroup>
            </FormRow>
          </CommonModal>
        )}

        {/* View Ticket Modal */}
        {showViewModal && selectedTicket && (
          <CommonModal
            isOpen={true}
            onClose={() => setShowViewModal(false)}
            title="Inquiry Details"
            size="large"
            footer={
              selectedTicket.status !== 'closed' ? (
                <Button variant="primary" onClick={handleCloseTicketFromModal}>
                  Close Ticket
                </Button>
              ) : undefined
            }
          >
            <div style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <FormLabel>Ticket Number</FormLabel>
                  <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: 600 }}>
                    {selectedTicket.ticketNumber}
                  </div>
                </div>
                <div>
                  <FormLabel>Status</FormLabel>
                  <div style={{ padding: '8px 0' }}>
                    <StatusBadge status={selectedTicket.status}>{selectedTicket.status}</StatusBadge>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <FormLabel>Priority</FormLabel>
                  <div style={{ padding: '8px 0' }}>
                    <PriorityBadge priority={selectedTicket.priority}>
                      {selectedTicket.priority}
                    </PriorityBadge>
                  </div>
                </div>
                <div>
                  <FormLabel>Category</FormLabel>
                  <div style={{ padding: '8px 0', color: '#374151', textTransform: 'capitalize' }}>
                    {selectedTicket.category.replace('-', ' ')}
                  </div>
                </div>
              </div>

              <div>
                <FormLabel>Subject</FormLabel>
                <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: 600 }}>
                  {selectedTicket.subject}
                </div>
              </div>

              <div>
                <FormLabel>Description</FormLabel>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E6EBF1',
                  minHeight: '100px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: '1.5',
                  color: '#374151'
                }}>
                  {selectedTicket.description}
                </div>
              </div>

              {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                <AttachmentList attachments={selectedTicket.attachments} />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <FormLabel>Created At</FormLabel>
                  <div style={{ padding: '8px 0', color: '#6B7280' }}>
                    {formatDateTime(selectedTicket.createdAt)}
                  </div>
                </div>
                <div>
                  <FormLabel>Last Updated</FormLabel>
                  <div style={{ padding: '8px 0', color: '#6B7280' }}>
                    {formatDateTime(selectedTicket.updatedAt)}
                  </div>
                </div>
              </div>

              <CommentSection
                entityType="support_ticket"
                entityId={selectedTicket.id}
                currentUserId={user?.id}
                onMarkRead={() =>
                  setUnreadCounts(prev => {
                    const next = { ...prev };
                    if (next[selectedTicket.id]) {
                      next[selectedTicket.id] = { ...next[selectedTicket.id], unread_count: 0 };
                    }
                    return next;
                  })
                }
              />
            </div>
          </CommonModal>
        )}
      </Content>
    </Container>
  );
};

export default SupplierSystemInquiryPage;
