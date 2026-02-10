import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';


interface ContactInquiry {
  id: number;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  inquiry_type?: 'free_trial' | 'pricing' | 'demo' | 'support' | 'partnership' | 'other';
  interested_plan?: string;
  preferred_username?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  notes?: string;
  reply_message?: string;
  replied_by_name?: string;
  replied_at?: string;
  email_sent?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  new: number;
  in_progress: number;
  resolved: number;
}

const Container = styled.div`
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Content = styled.div`
  padding: 32px;
  background: #FAFBFC;
  min-height: calc(100vh - 120px);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #E6EBF1;
  border-left: 4px solid ${props => props.color || '#635BFF'};
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 250px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const InquiryGrid = styled.div`
  display: grid;
  gap: 20px;
`;

const InquiryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const InquiryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 16px;
`;

const InquiryInfo = styled.div`
  flex: 1;
`;

const InquiryName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const InquiryEmail = styled.div`
  font-size: 14px;
  color: #635BFF;
`;

const InquiryCompany = styled.div`
  font-size: 14px;
  color: #6B7280;
  margin-top: 4px;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.status) {
      case 'new': return '#FEF3C7';
      case 'in_progress': return '#DBEAFE';
      case 'resolved': return '#ECFDF5';
      case 'closed': return '#F3F4F6';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'new': return '#D97706';
      case 'in_progress': return '#1E40AF';
      case 'resolved': return '#059669';
      case 'closed': return '#6B7280';
      default: return '#6B7280';
    }
  }};
`;

const PlanBadge = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  background: #F0F4FF;
  color: #635BFF;
  margin-left: 8px;
`;

const InquiryTypeBadge = styled.span<{ type?: string }>`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  margin-left: 8px;
  background: ${props => {
    switch(props.type) {
      case 'free_trial': return '#ECFDF5';
      case 'pricing': return '#FEF3C7';
      case 'demo': return '#DBEAFE';
      case 'support': return '#FEE2E2';
      case 'partnership': return '#F3E8FF';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'free_trial': return '#059669';
      case 'pricing': return '#D97706';
      case 'demo': return '#1E40AF';
      case 'support': return '#DC2626';
      case 'partnership': return '#7C3AED';
      default: return '#6B7280';
    }
  }};
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 13px;
  color: #6B7280;
`;

const InquiryMessage = styled.div`
  font-size: 14px;
  color: #374151;
  line-height: 1.6;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 8px;
  border-left: 3px solid #E6EBF1;
  margin: 16px 0;
  white-space: pre-wrap;
`;

const ReplySection = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #ECFDF5;
  border-radius: 8px;
  border-left: 3px solid #10B981;
`;

const ReplyLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #059669;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const ReplyContent = styled.div`
  font-size: 14px;
  color: #065F46;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const ReplyMeta = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 8px;
`;

const InquiryMeta = styled.div`
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

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => props.variant === 'primary' ? `
    background: #635BFF;
    color: white;
    border-color: #635BFF;
    &:hover { background: #5A51E6; }
  ` : props.variant === 'danger' ? `
    background: transparent;
    color: #DC2626;
    border-color: #FCA5A5;
    &:hover { background: #FEE2E2; }
  ` : `
    background: transparent;
    color: #6B7280;
    border-color: #E6EBF1;
    &:hover { background: #F8FAFC; color: #0A2540; }
  `}
`;

// Modal styles
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #6B7C93;
  cursor: pointer;
  padding: 0;
  &:hover { color: #0A2540; }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const ModalFooter = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #E6EBF1;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6B7280;
`;

const ContactInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, in_progress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Reply modal state
  const [replyModal, setReplyModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const token = localStorage.getItem('auth_token');
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchTerm) params.append('search', searchTerm);

      const [inquiriesRes, statsRes] = await Promise.all([
        fetch(`/api/public/admin/inquiries?${params}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/public/admin/inquiries-stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (inquiriesRes.ok) {
        setInquiries(await inquiriesRes.json());
      }
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 10초 polling
  useEffect(() => {
    const interval = setInterval(() => loadData(true), 10000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleReply = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setReplyMessage('');
    setSendEmail(true);
    setReplyModal(true);
  };

  const submitReply = async () => {
    if (!selectedInquiry || !replyMessage.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/public/admin/inquiries/${selectedInquiry.id}/reply`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reply_message: replyMessage,
          send_email: sendEmail
        })
      });

      if (response.ok) {
        setReplyModal(false);
        loadData();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Failed to send reply');
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/public/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      loadData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      await fetch(`/api/public/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      loadData();
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPlan = (plan: string) => {
    if (!plan) return null;
    return plan.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatInquiryType = (type: string) => {
    const labels: Record<string, string> = {
      free_trial: 'Free Trial',
      pricing: 'Pricing',
      demo: 'Demo',
      support: 'Support',
      partnership: 'Partnership',
      other: 'Other'
    };
    return labels[type] || type;
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Contact Inquiries</Title>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard color="#635BFF">
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Total Inquiries</StatLabel>
            </StatCard>
            <StatCard color="#F59E0B">
              <StatValue>{stats.new}</StatValue>
              <StatLabel>New</StatLabel>
            </StatCard>
            <StatCard color="#3B82F6">
              <StatValue>{stats.in_progress}</StatValue>
              <StatLabel>In Progress</StatLabel>
            </StatCard>
            <StatCard color="#10B981">
              <StatValue>{stats.resolved}</StatValue>
              <StatLabel>Resolved</StatLabel>
            </StatCard>
          </StatsGrid>

          <FilterBar>
            <SearchInput
              placeholder="Search by name, email, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </FilterSelect>
          </FilterBar>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : inquiries.length === 0 ? (
            <EmptyState>No inquiries found</EmptyState>
          ) : (
            <InquiryGrid>
              {inquiries.map((inquiry) => (
                <InquiryCard key={inquiry.id}>
                  <InquiryHeader>
                    <InquiryInfo>
                      <InquiryName>
                        {inquiry.name}
                        {inquiry.inquiry_type && (
                          <InquiryTypeBadge type={inquiry.inquiry_type}>
                            {formatInquiryType(inquiry.inquiry_type)}
                          </InquiryTypeBadge>
                        )}
                        {inquiry.interested_plan && (
                          <PlanBadge>{formatPlan(inquiry.interested_plan)}</PlanBadge>
                        )}
                      </InquiryName>
                      <InquiryEmail>{inquiry.email}</InquiryEmail>
                      {inquiry.company_name && (
                        <InquiryCompany>{inquiry.company_name}</InquiryCompany>
                      )}
                      {inquiry.phone && (
                        <DetailRow>Phone: {inquiry.phone}</DetailRow>
                      )}
                      {inquiry.preferred_username && (
                        <DetailRow>Preferred Username: <strong>{inquiry.preferred_username}</strong></DetailRow>
                      )}
                    </InquiryInfo>
                    <StatusBadge status={inquiry.status}>
                      {inquiry.status.replace('_', ' ')}
                    </StatusBadge>
                  </InquiryHeader>

                  <InquiryMessage>{inquiry.message}</InquiryMessage>

                  {inquiry.reply_message && (
                    <ReplySection>
                      <ReplyLabel>
                        Reply {inquiry.email_sent && '(Email Sent)'}
                      </ReplyLabel>
                      <ReplyContent>{inquiry.reply_message}</ReplyContent>
                      <ReplyMeta>
                        Replied by {inquiry.replied_by_name} on {formatDate(inquiry.replied_at!)}
                      </ReplyMeta>
                    </ReplySection>
                  )}

                  <InquiryMeta>
                    <span>Received: {formatDate(inquiry.createdAt)}</span>
                    <ActionButtons>
                      {inquiry.status === 'new' && (
                        <ActionButton onClick={() => updateStatus(inquiry.id, 'in_progress')}>
                          Mark In Progress
                        </ActionButton>
                      )}
                      {!inquiry.reply_message && (
                        <ActionButton variant="primary" onClick={() => handleReply(inquiry)}>
                          Reply
                        </ActionButton>
                      )}
                      {inquiry.status !== 'closed' && inquiry.reply_message && (
                        <ActionButton onClick={() => updateStatus(inquiry.id, 'closed')}>
                          Close
                        </ActionButton>
                      )}
                      <ActionButton variant="danger" onClick={() => deleteInquiry(inquiry.id)}>
                        Delete
                      </ActionButton>
                    </ActionButtons>
                  </InquiryMeta>
                </InquiryCard>
              ))}
            </InquiryGrid>
          )}
        </Content>

        {/* Reply Modal */}
        {replyModal && selectedInquiry && (
          <Modal onClick={() => setReplyModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Reply to {selectedInquiry.name}</ModalTitle>
                <CloseButton onClick={() => setReplyModal(false)}>&times;</CloseButton>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <FormLabel>Original Message</FormLabel>
                  <InquiryMessage style={{ margin: 0 }}>
                    {selectedInquiry.message}
                  </InquiryMessage>
                </FormGroup>

                <FormGroup>
                  <FormLabel>Your Reply</FormLabel>
                  <FormTextArea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your reply here..."
                  />
                </FormGroup>

                <Checkbox>
                  <input
                    type="checkbox"
                    checked={sendEmail}
                    onChange={(e) => setSendEmail(e.target.checked)}
                  />
                  Send reply via email to {selectedInquiry.email}
                </Checkbox>
              </ModalBody>

              <ModalFooter>
                <ActionButton onClick={() => setReplyModal(false)}>
                  Cancel
                </ActionButton>
                <ActionButton
                  variant="primary"
                  onClick={submitReply}
                  disabled={submitting || !replyMessage.trim()}
                >
                  {submitting ? 'Sending...' : (sendEmail ? 'Send Reply & Email' : 'Save Reply')}
                </ActionButton>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </MainLayout>
  );
};

export default ContactInquiriesPage;
