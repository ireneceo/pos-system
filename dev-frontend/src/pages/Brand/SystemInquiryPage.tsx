import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import CommentSection from '../../components/Common/CommentSection';
import FileUpload, { AttachmentFile } from '../../components/Common/FileUpload';
import AttachmentList from '../../components/Common/AttachmentList';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { StatsGrid, StatCard, StatValue, StatLabel, Modal as CommonModal } from '../../components/UI';

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

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
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

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
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
    color: #6B7280;
    border: 1px solid #E6EBF1;

    &:hover {
      background: #F8FAFC;
      color: #0A2540;
      border-color: #CBD5E1;
    }
  `}
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
  color: #6B7C93;
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
      case 'closed': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'open': return '#D97706';
      case 'in-progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const PriorityBadge = styled.span<{ priority: string }>`
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
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.priority) {
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
  line-height: 1.6;
  margin: 16px 0;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
`;

const TicketFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #F3F4F6;
  font-size: 12px;
  color: #6B7280;
  flex-wrap: wrap;
  gap: 8px;
`;

const CloseTicketButton = styled.button`
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #D1D5DB;
  border-radius: 6px;
  background: #fff;
  color: #6B7280;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: #E5E7EB;
    color: #374151;
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

const SystemInquiryPage: React.FC = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [activeTab, setActiveTab] = useTabParam<'active' | 'closed'>('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
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

  const currentUserId = user?.id || '2';

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
      const token = localStorage.getItem('auth_token');
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
      const token = localStorage.getItem('auth_token');
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
    const matchesStatus = activeTab === 'active'
      ? (ticket.status === 'open' || ticket.status === 'in-progress')
      : (ticket.status === 'closed' || ticket.status === 'resolved');
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
    return new Date(dateString).toLocaleString('en-MY');
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
      const token = localStorage.getItem('auth_token');
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

  const handleSubmitTicket = async () => {
    if (!newTicket.subject.trim() || !newTicket.description.trim()) {
      alert('Please fill in all required fields.');
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

      const token = localStorage.getItem('auth_token');
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
        alert('Failed to create ticket. Please try again.');
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Error creating ticket. Please try again.');
    }
  };

  return (
    <>
      <Container>
        <Header>
          <Title>System Inquiry</Title>
          <ActionSection>
            <Button variant="primary" onClick={handleCreateTicket}>New Inquiry</Button>
          </ActionSection>
        </Header>
        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{totalTickets}</StatValue>
              <StatLabel>Total Tickets</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{openTickets}</StatValue>
              <StatLabel>Open Tickets</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{inProgressTickets}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{resolvedTickets}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
          </StatsGrid>

          <Tabs>
            <Tab active={activeTab === 'active'} onClick={() => setActiveTab('active')}>
              Active Tickets ({openTickets + inProgressTickets})
            </Tab>
            <Tab active={activeTab === 'closed'} onClick={() => setActiveTab('closed')}>
              Closed Tickets ({closedTickets + resolvedTickets})
            </Tab>
          </Tabs>

          <FilterBar>
            <FilterSelect value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="all">All Priority</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </FilterSelect>
            <FilterSelect value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="feature-request">Feature Request</option>
              <option value="bug-report">Bug Report</option>
              <option value="general">General</option>
            </FilterSelect>
            <SearchInput
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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

                <TicketDescription>{ticket.description}</TicketDescription>

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
                  {activeTab === 'active' && (
                    <CloseTicketButton
                      onClick={(e) => {
                        e.stopPropagation();
                        (async () => {
                          try {
                            const token = localStorage.getItem('auth_token');
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
                color: '#6B7280',
                gridColumn: '1 / -1'
              }}>
                <h3 style={{ color: '#374151', marginBottom: '8px' }}>No tickets yet</h3>
                <p>Click "New Inquiry" to submit your first support ticket to system administrator.</p>
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
                    <FormLabel>Attachments</FormLabel>
                    <FileUpload
                      files={newAttachments}
                      onChange={setNewAttachments}
                      maxFiles={5}
                    />
                  </div>
                  <FormRow>
                    <FormGroup>
                      <FormLabel>Priority</FormLabel>
                      <FormSelect
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value as any})}
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
                        onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                      >
                        <option value="technical">Technical Issue</option>
                        <option value="account">Account Management</option>
                        <option value="billing">Billing</option>
                        <option value="feature">Feature Request</option>
                        <option value="other">Other</option>
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
              footer={
                <Button variant="secondary" onClick={() => setShowViewModal(false)}>Close</Button>
              }
            >
                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Ticket Number</FormLabel>
                        <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>{selectedTicket.ticketNumber}</div>
                      </div>
                      <div>
                        <FormLabel>Status</FormLabel>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <FormSelect value={detailStatus} onChange={(e) => setDetailStatus(e.target.value)} style={{ flex: 1 }}>
                            <option value="open">Open</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                          </FormSelect>
                          {detailStatus !== selectedTicket.status && (
                            <Button variant="primary" onClick={handleStatusChange} style={{ padding: '10px 20px' }}>Save</Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <FormLabel>Priority</FormLabel>
                        <div style={{ padding: '8px 0' }}>
                          <PriorityBadge priority={selectedTicket.priority}>{selectedTicket.priority}</PriorityBadge>
                        </div>
                      </div>
                      <div>
                        <FormLabel>Category</FormLabel>
                        <div style={{ padding: '8px 0', color: '#374151', textTransform: 'capitalize' }}>{selectedTicket.category.replace('-', ' ')}</div>
                      </div>
                    </div>
                    <div>
                      <FormLabel>Subject</FormLabel>
                      <div style={{ padding: '8px 0', color: '#0A2540', fontWeight: '600' }}>{selectedTicket.subject}</div>
                    </div>
                    <div>
                      <FormLabel>Description</FormLabel>
                      <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E6EBF1', minHeight: '80px', whiteSpace: 'pre-wrap', lineHeight: '1.5', color: '#374151' }}>
                        {selectedTicket.description}
                      </div>
                    </div>
                    {selectedTicket?.attachments && selectedTicket.attachments.length > 0 && (
                      <AttachmentList attachments={selectedTicket.attachments} />
                    )}
                    <div>
                      <FormLabel>Created</FormLabel>
                      <div style={{ padding: '8px 0', color: '#6B7280' }}>{formatDateTime(selectedTicket.createdAt)}</div>
                    </div>
                  </div>
                  <CommentSection entityType="support_ticket" entityId={selectedTicket.id} currentUserId={user?.id} onMarkRead={() => setUnreadCounts(prev => { const next = { ...prev }; if (next[selectedTicket.id]) next[selectedTicket.id] = { ...next[selectedTicket.id], unread_count: 0 }; return next; })} />
              </CommonModal>
          )}
        </Content>
      </Container>
    </>
  );
};

export default SystemInquiryPage;
