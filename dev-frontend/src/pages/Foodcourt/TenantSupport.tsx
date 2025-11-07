import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';

const Container = styled.div`
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  background: white;
  padding: 32px;
  border-bottom: 1px solid #E6EBF1;
  margin-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
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
  font-size: 32px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #6B7280;
  margin: 8px 0 0;
`;

const TabContainer = styled.div`
  background: white;
  border-radius: 16px 16px 0 0;
  border: 1px solid #E6EBF1;
  border-bottom: none;
  margin-bottom: 0;
`;

const TabList = styled.div`
  display: flex;
  gap: 0;
  padding: 0 24px;
`;

const Tab = styled.button<{ active?: boolean }>`
  padding: 16px 24px;
  border: none;
  background: ${props => props.active ? '#635BFF' : 'transparent'};
  color: ${props => props.active ? 'white' : '#6B7280'};
  border-radius: 12px 12px 0 0;
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  top: 1px;

  &:hover {
    background: ${props => props.active ? '#635BFF' : '#F3F4F6'};
    color: ${props => props.active ? 'white' : '#374151'};
  }
`;

const ContentSection = styled.div`
  background: white;
  border-radius: 0 16px 16px 16px;
  padding: 32px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;


const RequestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`;

const RequestCard = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  background: white;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  gap: 12px;
`;

const RequestTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  flex: 1;
`;

const PriorityBadge = styled.span<{ level: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;

  ${props => {
    switch (props.level) {
      case 'high':
        return 'background: #FEE2E2; color: #991B1B;';
      case 'medium':
        return 'background: #FEF3C7; color: #92400E;';
      case 'low':
        return 'background: #DCFCE7; color: #166534;';
      default:
        return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

const RequestInfo = styled.div`
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: #6B7280;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #0A2540;
  font-weight: 600;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;

  ${props => {
    switch (props.status) {
      case 'Approved':
        return 'background: #DCFCE7; color: #166534;';
      case 'In Progress':
        return 'background: #DBEAFE; color: #1E40AF;';
      case 'Under Review':
        return 'background: #FEF3C7; color: #92400E;';
      case 'Pending':
        return 'background: #FEE2E2; color: #991B1B;';
      default:
        return 'background: #F3F4F6; color: #374151;';
    }
  }}
`;

const RequestDescription = styled.p`
  color: #6B7280;
  font-size: 14px;
  line-height: 1.6;
  margin: 16px 0;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border-left: 3px solid #635BFF;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 20px;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' | 'success' }>`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          border-color: #635BFF;
          color: white;
          &:hover { background: #5A51E6; border-color: #5A51E6; }
        `;
      case 'success':
        return `
          background: #059669;
          border-color: #059669;
          color: white;
          &:hover { background: #047857; border-color: #047857; }
        `;
      default:
        return `
          background: white;
          border-color: #E6EBF1;
          color: #374151;
          &:hover { background: #F9FAFB; }
        `;
    }
  }}
`;

const SectionContent = styled.div`
  padding: 20px 0;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0;
`;

const FeatureItem = styled.li`
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: #6B7280;
  line-height: 1.6;

  &:before {
    content: '•';
    color: #7C3AED;
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    left: 8px;
  }
`;

const ActionBar = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  min-width: 300px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  @media (max-width: 768px) {
    min-width: auto;
    width: 100%;
  }
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }
`;

interface SupportRequest {
  id: string;
  title: string;
  storeName: string;
  owner: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  requestDate: string;
  status: 'Pending' | 'In Progress' | 'Under Review' | 'Approved' | 'Rejected';
  description: string;
  phone?: string;
}

const TenantSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'process'>('approve');

  useEffect(() => {
    const fetchSupportRequests = async () => {
      try {
        const mockRequests: SupportRequest[] = [
          {
            id: '1',
            title: 'POS System Error',
            storeName: 'K-DINE Gangnam Branch',
            owner: 'Kim Chul-su',
            priority: 'high',
            category: 'Technical Support',
            requestDate: '2024-01-15',
            status: 'In Progress',
            description: 'The POS system is intermittently freezing. There is disruption in order processing, requiring urgent support.',
            phone: '02-1234-5678'
          },
          {
            id: '2',
            title: 'Power Capacity Expansion Request',
            storeName: 'Delicious Chicken',
            owner: 'Lee Young-hee',
            priority: 'medium',
            category: 'Facility Support',
            requestDate: '2024-01-14',
            status: 'Under Review',
            description: 'Due to the introduction of new equipment, power capacity is insufficient. Requesting power expansion.',
            phone: '02-2345-6789'
          },
          {
            id: '3',
            title: 'Refrigerator Repair Request',
            storeName: 'Healthy Salad',
            owner: 'Park Min-su',
            priority: 'high',
            category: 'Facility Support',
            requestDate: '2024-01-13',
            status: 'Pending',
            description: 'The main refrigerator is broken, causing problems with food storage. Urgent repair is needed.',
            phone: '02-3456-7890'
          },
          {
            id: '4',
            title: 'Operating Hours Extension Approved Request',
            storeName: 'Premium Burger',
            owner: 'Jung Ha-na',
            priority: 'low',
            category: 'Operations Support',
            requestDate: '2024-01-12',
            status: 'Approved',
            description: 'We would like to extend weekend operating hours by 1 hour. Many customers have requested this, so please review.',
            phone: '02-4567-8901'
          },
          {
            id: '5',
            title: 'Drain Blockage Resolution Request',
            storeName: 'Asia Noodle',
            owner: 'Yoon Seo-jun',
            priority: 'medium',
            category: 'Facility Support',
            requestDate: '2024-01-11',
            status: 'In Progress',
            description: 'The kitchen drain is blocked and water is backing up. Urgent action is required.',
            phone: '02-5678-9012'
          }
        ];

        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching support requests:', error);
      }
    };

    fetchSupportRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const supportStats = {
    totalRequests: requests.length,
    urgentRequests: requests.filter(r => r.priority === 'high').length,
    inProgress: requests.filter(r => r.status === 'In Progress').length,
    completed: requests.filter(r => r.status === 'Approved').length,
    pending: requests.filter(r => r.status === 'Pending').length
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Urgent';
      case 'medium': return 'Normal';
      case 'low': return 'Low';
      default: return priority;
    }
  };

  const handleRequestAction = (request: SupportRequest, action: 'approve' | 'reject' | 'process') => {
    setSelectedRequest(request);
    setActionType(action);
    setShowConfirmModal(true);
  };

  const confirmAction = () => {
    if (selectedRequest && actionType) {
      let newStatus: typeof selectedRequest.status;
      switch (actionType) {
        case 'approve':
          newStatus = 'Approved';
          break;
        case 'reject':
          newStatus = 'Rejected';
          break;
        case 'process':
          newStatus = 'In Progress';
          break;
      }

      setRequests(prev => prev.map(req =>
        req.id === selectedRequest.id ? { ...req, status: newStatus } : req
      ));
    }
    setShowConfirmModal(false);
  };

  const getActionText = () => {
    switch (actionType) {
      case 'approve': return 'Approved';
      case 'reject': return 'Rejected';
      case 'process': return 'Start Process';
      default: return 'Process';
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Tenant Support</Title>
            <Subtitle>Foodcourt tenant request and support management</Subtitle>
          </div>
          <ThemedButton variant="outline">Export Support Report</ThemedButton>
        </Header>

        <Content>
          <TabContainer>
            <TabList>
              <Tab
                active={activeTab === 'requests'}
                onClick={() => setActiveTab('requests')}
              >
Support Request Management
              </Tab>
              <Tab
                active={activeTab === 'communication'}
                onClick={() => setActiveTab('communication')}
              >
Communication Management
              </Tab>
              <Tab
                active={activeTab === 'announcements'}
                onClick={() => setActiveTab('announcements')}
              >
Announcements
              </Tab>
            </TabList>
          </TabContainer>

          {activeTab === 'requests' && (
            <>
              <StatsGrid>
                <StatCard>
                  <StatValue>{supportStats.totalRequests}</StatValue>
                  <StatLabel>Total Requests</StatLabel>
                  <StatTrend trend="up">All support cases</StatTrend>
                </StatCard>
                <StatCard>
                  <StatValue>{supportStats.urgentRequests}</StatValue>
                  <StatLabel>Urgent Requests</StatLabel>
                  <StatTrend trend={supportStats.urgentRequests > 0 ? "down" : "up"}>High priority</StatTrend>
                </StatCard>
                <StatCard>
                  <StatValue>{supportStats.pending}</StatValue>
                  <StatLabel>Pending</StatLabel>
                  <StatTrend trend={supportStats.pending > 0 ? "down" : "up"}>Awaiting action</StatTrend>
                </StatCard>
                <StatCard>
                  <StatValue>{supportStats.inProgress}</StatValue>
                  <StatLabel>In Progress</StatLabel>
                  <StatTrend trend="up">Being processed</StatTrend>
                </StatCard>
                <StatCard>
                  <StatValue>{supportStats.completed}</StatValue>
                  <StatLabel>Completed</StatLabel>
                  <StatTrend trend="up">Successfully resolved</StatTrend>
                </StatCard>
              </StatsGrid>

              <ActionBar>
                <SearchInput
                  type="text"
                  placeholder="Search by request title, business name, owner name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FilterSelect
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">Urgent</option>
                  <option value="medium">Normal</option>
                  <option value="low">Low</option>
                </FilterSelect>
              </ActionBar>

              <ContentSection>
                <RequestGrid>
                  {filteredRequests.map((request) => (
                    <RequestCard key={request.id}>
                      <RequestHeader>
                        <RequestTitle>{request.title}</RequestTitle>
                        <PriorityBadge level={request.priority}>
                          {getPriorityText(request.priority)}
                        </PriorityBadge>
                      </RequestHeader>

                      <RequestInfo>
                        <InfoRow>
                          <InfoLabel>Business Name</InfoLabel>
                          <InfoValue>{request.storeName}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                          <InfoLabel>Owner</InfoLabel>
                          <InfoValue>{request.owner}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                          <InfoLabel>Contact</InfoLabel>
                          <InfoValue>{request.phone || '-'}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                          <InfoLabel>Category</InfoLabel>
                          <InfoValue>{request.category}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                          <InfoLabel>Request Date</InfoLabel>
                          <InfoValue>{request.requestDate}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                          <InfoLabel>Status</InfoLabel>
                          <InfoValue>
                            <StatusBadge status={request.status}>
                              {request.status}
                            </StatusBadge>
                          </InfoValue>
                        </InfoRow>
                      </RequestInfo>

                      <RequestDescription>
                        {request.description}
                      </RequestDescription>

                      <ActionButtons>
                        {request.status === 'Pending' && (
                          <>
                            <ActionButton
                              variant="success"
                              onClick={() => handleRequestAction(request, 'approve')}
                            >
                              Approve
                            </ActionButton>
                            <ActionButton
                              variant="primary"
                              onClick={() => handleRequestAction(request, 'process')}
                            >
                              Start Process
                            </ActionButton>
                          </>
                        )}
                        {request.status === 'Under Review' && (
                          <>
                            <ActionButton
                              variant="success"
                              onClick={() => handleRequestAction(request, 'approve')}
                            >
                              Approve
                            </ActionButton>
                            <ActionButton
                              variant="primary"
                              onClick={() => handleRequestAction(request, 'reject')}
                            >
                              Reject
                            </ActionButton>
                          </>
                        )}
                        <ActionButton variant="secondary">
                          View Details
                        </ActionButton>
                      </ActionButtons>
                    </RequestCard>
                  ))}
                </RequestGrid>
              </ContentSection>
            </>
          )}

          {activeTab === 'communication' && (
            <ContentSection>
              <h3 style={{ marginBottom: '20px', color: '#0A2540', fontSize: '20px', fontWeight: '600' }}>Tenant Communication Management</h3>
              <SectionContent>
                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '16px', marginBottom: '24px' }}>
                  Manages various channels for smooth communication with tenants and collects feedback.
                </p>
                <FeatureList>
                  <FeatureItem>Regular meeting schedule management and attendance monitoring</FeatureItem>
                  <FeatureItem>Tenant feedback collection and analysis system</FeatureItem>
                  <FeatureItem>Suggestion reception and processing status tracking</FeatureItem>
                  <FeatureItem>Quarterly satisfaction surveys and result analysis</FeatureItem>
                  <FeatureItem>Communication channel effectiveness evaluation</FeatureItem>
                  <FeatureItem>Conflict resolution and mediation process management</FeatureItem>
                </FeatureList>
              </SectionContent>
            </ContentSection>
          )}

          {activeTab === 'announcements' && (
            <ContentSection>
              <h3 style={{ marginBottom: '20px', color: '#0A2540', fontSize: '20px', fontWeight: '600' }}>Announcement Management</h3>
              <SectionContent>
                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '16px', marginBottom: '24px' }}>
                  Efficiently manages and delivers announcements to all foodcourt tenants.
                </p>
                <FeatureList>
                  <FeatureItem>Immediate notification of operational regulations and policy changes</FeatureItem>
                  <FeatureItem>Advance notice of facility inspections and regular maintenance schedules</FeatureItem>
                  <FeatureItem>Foodcourt event and promotion participation guidance</FeatureItem>
                  <FeatureItem>Emergency situation and contingency plan notification system</FeatureItem>
                  <FeatureItem>Industry trends and market information sharing</FeatureItem>
                  <FeatureItem>Training and workshop schedule guidance</FeatureItem>
                </FeatureList>
              </SectionContent>
            </ContentSection>
          )}

          {/* Confirmation Modal */}
          <ConfirmModal
            isOpen={showConfirmModal}
            title="Request Process"
            message={`Are you sure you want to ${getActionText().toLowerCase()} the request '${selectedRequest?.title}'?`}
            onConfirm={confirmAction}
            onCancel={() => setShowConfirmModal(false)}
            confirmText={getActionText()}
            cancelText="Cancel"
            type={actionType === 'reject' ? 'danger' : 'warning'}
          />
        </Content>
      </Container>
    </MainLayout>
  );
};

export default TenantSupport;