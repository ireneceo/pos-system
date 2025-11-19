import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../../components/Layout/MainLayout';
import { StatsGrid, StatCard, StatValue, StatLabel, StatTrend } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';

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

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
`;

const SupportCard = styled.div`
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

const SupportTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 16px 0;
`;

const SupportDescription = styled.p`
  color: #6B7280;
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const SupportFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;

  li {
    color: #374151;
    font-size: 14px;
    margin-bottom: 8px;
    padding-left: 24px;
    position: relative;
    line-height: 1.5;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #635BFF;
      font-weight: 700;
      font-size: 16px;
    }
  }
`;


const FranchiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const FranchiseCard = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FranchiseName = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 12px 0;
`;

const FranchiseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #F9FAFB;
  font-size: 14px;

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 12px;
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
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'excellent':
        return 'background: #DCFCE7; color: #166534;';
      case 'good':
        return 'background: #DBEAFE; color: #1E40AF;';
      case 'needs_improvement':
        return 'background: #FEF3C7; color: #92400E;';
      default:
        return 'background: #F3F4F6; color: #374151;';
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
    color: #635BFF;
    font-weight: bold;
    font-size: 18px;
    position: absolute;
    left: 8px;
  }
`;

const QuickActions = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  border: 1px solid #E6EBF1;
  margin-bottom: 24px;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const QuickActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    color: #635BFF;
    transform: translateY(-1px);
  }
`;

interface FranchiseData {
  id: string;
  name: string;
  owner: string;
  openDate: string;
  status: 'excellent' | 'good' | 'needs_improvement';
  monthlyRevenue: number;
  satisfaction: number;
  location: string;
  phone: string;
}

interface SupportStats {
  totalFranchises: number;
  excellentStores: number;
  needsSupport: number;
  avgSatisfaction: number;
  newFranchises: number;
}

const FranchiseSupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [franchises, setFranchises] = useState<FranchiseData[]>([]);
  const [stats, setStats] = useState<SupportStats>({
    totalFranchises: 0,
    excellentStores: 0,
    needsSupport: 0,
    avgSatisfaction: 0,
    newFranchises: 0
  });

  useEffect(() => {
    const fetchFranchiseData = async () => {
      try {
        const mockFranchises: FranchiseData[] = [
          {
            id: '1',
            name: 'K-DINE Gangnam Branch',
            owner: 'Kim Chul-su',
            openDate: '2023-03-15',
            status: 'excellent',
            monthlyRevenue: 18500000,
            satisfaction: 4.8,
            location: 'Seoul Gangnam-gu',
            phone: '02-1234-5678'
          },
          {
            id: '2',
            name: 'K-DINE Hongdae Branch',
            owner: 'Lee Young-hee',
            openDate: '2023-05-20',
            status: 'good',
            monthlyRevenue: 15200000,
            satisfaction: 4.6,
            location: 'Seoul Mapo-gu',
            phone: '02-2345-6789'
          },
          {
            id: '3',
            name: 'K-DINE Myeongdong Branch',
            owner: 'Park Min-su',
            openDate: '2023-08-10',
            status: 'needs_improvement',
            monthlyRevenue: 12800000,
            satisfaction: 4.2,
            location: 'Seoul Jung-gu',
            phone: '02-3456-7890'
          },
          {
            id: '4',
            name: 'K-DINE Jamsil Branch',
            owner: 'Jung Ha-na',
            openDate: '2023-11-01',
            status: 'good',
            monthlyRevenue: 14700000,
            satisfaction: 4.5,
            location: 'Seoul Songpa-gu',
            phone: '02-4567-8901'
          },
          {
            id: '5',
            name: 'K-DINE Busan Branch',
            owner: 'Yoon Seo-jun',
            openDate: '2024-01-15',
            status: 'good',
            monthlyRevenue: 13900000,
            satisfaction: 4.4,
            location: 'Busan Haeundae-gu',
            phone: '051-1234-5678'
          }
        ];

        setFranchises(mockFranchises);

        // Calculate stats
        const totalFranchises = mockFranchises.length;
        const excellentStores = mockFranchises.filter(f => f.status === 'excellent').length;
        const needsSupport = mockFranchises.filter(f => f.status === 'needs_improvement').length;
        const avgSatisfaction = mockFranchises.reduce((sum, f) => sum + f.satisfaction, 0) / mockFranchises.length;
        const newFranchises = mockFranchises.filter(f => new Date(f.openDate) > new Date('2023-12-01')).length;

        setStats({
          totalFranchises,
          excellentStores,
          needsSupport,
          avgSatisfaction,
          newFranchises
        });
      } catch (error) {
        console.error('Error fetching franchise data:', error);
      }
    };

    fetchFranchiseData();
  }, []);

  const supportPrograms = [
    {
      id: 1,
      title: 'New Franchise Opening Support',
      description: 'Comprehensive support program for successful opening of new franchises, providing step-by-step consulting from location selection to opening.',
      features: [
        'Professional location analysis and market research services',
        'Interior design and construction support according to brand guidelines',
        'Systematic initial staff training program operation',
        'Opening marketing and promotional support for successful launch'
      ]
    },
    {
      id: 2,
      title: 'Operational Efficiency Improvement Consulting',
      description: 'Provides customized consulting services to increase sales and improve operational efficiency of existing franchises.',
      features: [
        'Practical improvement solutions through precise sales analysis',
        'Systematic cost reduction strategy development and implementation support',
        'Service quality improvement through continuous staff training',
        'Service improvement solutions for enhanced customer satisfaction'
      ]
    },
    {
      id: 3,
      title: 'Marketing and Promotion Support',
      description: 'Establishes and supports the implementation of customized marketing strategies considering the characteristics and regional features of each franchise.',
      features: [
        'Regional customized marketing strategies reflecting market characteristics',
        'Seasonal and event-specific promotion planning and execution support',
        'Digital marketing utilizing social media and online platforms',
        'Systematic customer management through CRM system implementation'
      ]
    },
    {
      id: 4,
      title: 'Quality Management and Training System',
      description: 'Systematic quality management and training program for maintaining brand value and providing consistent service quality.',
      features: [
        'Brand standard maintenance through regular quality inspections',
        'Systematic staff training for service standardization',
        'Professional cooking methods and service training for new menu launches',
        'Thorough hygiene management system establishment and operational support'
      ]
    }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'needs_improvement': return 'Needs Improvement';
      default: return status;
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <div>
            <Title>Franchise Support</Title>
            <Subtitle>Comprehensive support system for successful brand franchise operations</Subtitle>
          </div>
          <ThemedButton variant="outline">Generate Support Report</ThemedButton>
        </Header>

        <Content>
          <StatsGrid>
            <StatCard>
              <StatValue>{stats.totalFranchises}</StatValue>
              <StatLabel>Total Franchises</StatLabel>
              <StatTrend trend="up">All brand locations</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.excellentStores}</StatValue>
              <StatLabel>Excellent Stores</StatLabel>
              <StatTrend trend="up">Top performing</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.needsSupport}</StatValue>
              <StatLabel>Needs Support</StatLabel>
              <StatTrend trend={stats.needsSupport > 0 ? "down" : "up"}>Improvement required</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.avgSatisfaction.toFixed(1)}</StatValue>
              <StatLabel>Average Satisfaction</StatLabel>
              <StatTrend trend="up">Out of 5.0</StatTrend>
            </StatCard>
            <StatCard>
              <StatValue>{stats.newFranchises}</StatValue>
              <StatLabel>New Openings</StatLabel>
              <StatTrend trend="up">Recent expansion</StatTrend>
            </StatCard>
          </StatsGrid>

          <QuickActions>
            <h3 style={{ marginBottom: '20px', color: '#0A2540', fontSize: '18px', fontWeight: '600' }}>Quick Actions</h3>
            <ActionGrid>
              <QuickActionButton>📋 New Franchise Application</QuickActionButton>
              <QuickActionButton>📊 Performance Analysis Report</QuickActionButton>
              <QuickActionButton>🎓 Training Schedule Management</QuickActionButton>
              <QuickActionButton>💰 Settlement & Commission</QuickActionButton>
              <QuickActionButton>📞 Emergency Support Request</QuickActionButton>
              <QuickActionButton>📈 Marketing Campaign</QuickActionButton>
            </ActionGrid>
          </QuickActions>

          <TabContainer>
            <TabList>
              <Tab
                active={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
              >
Support Programs
              </Tab>
              <Tab
                active={activeTab === 'franchises'}
                onClick={() => setActiveTab('franchises')}
              >
Franchise Status
              </Tab>
              <Tab
                active={activeTab === 'training'}
                onClick={() => setActiveTab('training')}
              >
Training Management
              </Tab>
            </TabList>
          </TabContainer>

          {activeTab === 'overview' && (
            <ContentSection>
              <SupportGrid>
                {supportPrograms.map((program) => (
                  <SupportCard key={program.id}>
                    <SupportTitle>{program.title}</SupportTitle>
                    <SupportDescription>{program.description}</SupportDescription>
                    <SupportFeatures>
                      {program.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </SupportFeatures>
                    <ThemedButton variant="primary">View Details</ThemedButton>
                  </SupportCard>
                ))}
              </SupportGrid>
            </ContentSection>
          )}

          {activeTab === 'franchises' && (
            <ContentSection>
              <h3 style={{ marginBottom: '24px', color: '#0A2540', fontSize: '20px', fontWeight: '600' }}>Franchise Status</h3>
              <FranchiseGrid>
                {franchises.map((franchise) => (
                  <FranchiseCard key={franchise.id}>
                    <FranchiseName>{franchise.name}</FranchiseName>
                    <FranchiseInfo>
                      <InfoLabel>Owner</InfoLabel>
                      <InfoValue>{franchise.owner}</InfoValue>
                    </FranchiseInfo>
                    <FranchiseInfo>
                      <InfoLabel>Location</InfoLabel>
                      <InfoValue>{franchise.location}</InfoValue>
                    </FranchiseInfo>
                    <FranchiseInfo>
                      <InfoLabel>Contact</InfoLabel>
                      <InfoValue>{franchise.phone}</InfoValue>
                    </FranchiseInfo>
                    <FranchiseInfo>
                      <InfoLabel>Opening Date</InfoLabel>
                      <InfoValue>{franchise.openDate}</InfoValue>
                    </FranchiseInfo>
                    <FranchiseInfo>
                      <InfoLabel>Monthly Revenue</InfoLabel>
                      <InfoValue>RM {(franchise.monthlyRevenue / 1000000).toFixed(1)}M</InfoValue>
                    </FranchiseInfo>
                    <FranchiseInfo>
                      <InfoLabel>Satisfaction</InfoLabel>
                      <InfoValue>{franchise.satisfaction}/5.0</InfoValue>
                    </FranchiseInfo>
                    <div style={{ marginTop: '12px' }}>
                      <StatusBadge status={franchise.status}>
                        {getStatusText(franchise.status)}
                      </StatusBadge>
                    </div>
                  </FranchiseCard>
                ))}
              </FranchiseGrid>
            </ContentSection>
          )}

          {activeTab === 'training' && (
            <ContentSection>
              <h3 style={{ marginBottom: '20px', color: '#0A2540', fontSize: '20px', fontWeight: '600' }}>Training Management System</h3>
              <SectionContent>
                <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '16px', marginBottom: '24px' }}>
                  Provides systematic and comprehensive training programs for improving the professionalism of franchise staff and maintaining brand value.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
                  <div>
                    <h4 style={{ color: '#0A2540', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>📚 Training Programs</h4>
                    <FeatureList>
                      <FeatureItem>New Employee Onboarding Training (2-week program)</FeatureItem>
                      <FeatureItem>Customer Service Quality Improvement Training</FeatureItem>
                      <FeatureItem>POS System and Digital Tools Usage</FeatureItem>
                      <FeatureItem>Food Hygiene and Safety Management Training</FeatureItem>
                      <FeatureItem>Brand Guidelines and Standard Service</FeatureItem>
                      <FeatureItem>Store Operation Efficiency Improvement Workshop</FeatureItem>
                    </FeatureList>
                  </div>

                  <div>
                    <h4 style={{ color: '#0A2540', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>🎯 Training Methods</h4>
                    <FeatureList>
                      <FeatureItem>Online Training Platform (24/7 access available)</FeatureItem>
                      <FeatureItem>Professional Instructor On-site Training</FeatureItem>
                      <FeatureItem>Headquarters Training Center Group Education</FeatureItem>
                      <FeatureItem>Monthly Regular Workshops and Seminars</FeatureItem>
                      <FeatureItem>Individual Guidance through Mentoring System</FeatureItem>
                      <FeatureItem>Practice-focused On-site Training Programs</FeatureItem>
                    </FeatureList>
                  </div>
                </div>

                <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #635BFF' }}>
                  <h4 style={{ color: '#0A2540', fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>📊 Training Performance Management</h4>
                  <p style={{ color: '#6B7280', lineHeight: 1.6, fontSize: '14px', margin: 0 }}>
                    All training courses include performance evaluation along with certificate issuance,
                    and continuous improvement is achieved through regular feedback.
                    Training completion status and performance are monitored in real-time to contribute to strengthening each franchise's capabilities.
                  </p>
                </div>
              </SectionContent>
            </ContentSection>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default FranchiseSupport;