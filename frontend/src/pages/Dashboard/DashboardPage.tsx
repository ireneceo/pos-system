import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #FAFBFC;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background: #FAFBFC;
  border-right: 1px solid #E6EBF1;
  z-index: 1000;

  @media (max-width: 768px) {
    transform: translateX(-100%);
    transition: transform 0.3s;
  }
`;

const SidebarHeader = styled.div`
  padding: 24px 16px;
  border-bottom: 1px solid #E6EBF1;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const OrderText = styled.span`
  color: #0A2540;
`;

const HereText = styled.span`
  color: #635BFF;
  font-style: italic;
`;

const SidebarNav = styled.nav`
  padding: 8px 0;
`;

const NavSection = styled.div`
  margin-bottom: 24px;
`;

const NavTitle = styled.div`
  color: #8898AA;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 16px;
  margin-bottom: 8px;
`;

const NavItem = styled.a<{ active?: boolean; hasPending?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  color: #6B7C93;
  text-decoration: none;
  transition: all 0.15s;
  font-size: 14px;
  font-weight: 500;
  position: relative;

  &:hover {
    background: #F6F9FC;
    color: #0A2540;
  }

  ${props => props.active && `
    background: #F0F4FF;
    color: #635BFF;
    border-right: 2px solid #635BFF;
  `}

  ${props => props.hasPending && `
    &::after {
      content: '';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: #FF6B6B;
      border-radius: 50%;
      animation: blink 1s infinite;
    }
  `}

  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`;

const NavIcon = styled.span<{ hasPending?: boolean }>`
  margin-right: 12px;
  font-size: 14px;
  width: 16px;
  text-align: center;
  transition: all 0.3s ease;
  display: inline-block;
  font-family: 'Lucida Console', 'Courier New', monospace;
  color: #6B7C93;

  ${props => props.hasPending && `
    animation: pulse 1.5s infinite;
  `}

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const MainContent = styled.div`
  margin-left: 220px;
  min-height: 100vh;
  background: #FAFBFC;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Header = styled.header`
  background: white;
  padding: 24px 32px;
  border-bottom: 1px solid #E6EBF1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0A2540;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.15s;
  cursor: pointer;

  &:hover {
    background: #F6F9FC;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  background: #635BFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.15s;

  ${UserInfo}:hover & {
    transform: scale(1.05);
  }
`;

const Content = styled.main`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  transition: all 0.15s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border-color: #C7D2FE;
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const StatTitle = styled.div`
  color: #6B7C93;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const StatChange = styled.div`
  font-size: 12px;
  color: #00D924;
  font-weight: 500;
`;

const QuickAccess = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 16px;
`;

const QuickButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const QuickBtn = styled.a`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: #0A2540;
  transition: all 0.15s;
  border: 1px solid #E6EBF1;
  cursor: pointer;

  &:hover {
    border-color: #C7D2FE;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const QuickBtnIcon = styled.div`
  color: #635BFF;
  font-size: 20px;
  margin-bottom: 12px;
`;

const QuickBtnTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0A2540;
`;

const QuickBtnDesc = styled.div`
  font-size: 12px;
  color: #6B7C93;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatusCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
`;

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 11px;
  color: #6B7C93;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const TableCell = styled.td`
  padding: 12px 0;
  text-align: left;
  border-bottom: 1px solid #F6F9FC;
  font-size: 13px;
  color: #0A2540;
`;

const StatusBadge = styled.span<{ status: 'pending' | 'cooking' | 'ready' }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;

  ${props => {
    switch(props.status) {
      case 'pending':
        return `
          background: #FFF4E6;
          color: #B45309;
        `;
      case 'cooking':
        return `
          background: #EFF6FF;
          color: #1D4ED8;
        `;
      case 'ready':
        return `
          background: #ECFDF5;
          color: #059669;
        `;
    }
  }}
`;

const StatusItem = styled.div`
  margin-bottom: 15px;
`;

const StatusLabel = styled.div`
  color: #6B7C93;
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const StatusValue = styled.div<{ color?: string; size?: string }>`
  color: ${props => props.color || '#0A2540'};
  font-weight: 600;
  font-size: ${props => props.size || 'inherit'};
`;

const DashboardPage: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState(8);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setPendingOrders(8);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      window.location.href = '/';
    }
  };

  const showQRCode = () => {
    alert('Mobile Order QR Code:\npos.orderhere.center/mobile\n\nCustomers can scan this QR code to place mobile orders.');
  };

  return (
    <DashboardContainer>
      {/* 사이드바 */}
      <Sidebar>
        <SidebarHeader>
          <Logo>
            <OrderText>order</OrderText><HereText>here</HereText>
          </Logo>
        </SidebarHeader>
        
        <SidebarNav>
          <NavSection>
            <NavItem href="#" active>
              <NavIcon>■</NavIcon>
              Dashboard
            </NavItem>
            <NavItem href="/live-orders" hasPending={pendingOrders > 0}>
              <NavIcon hasPending={pendingOrders > 0}>◉</NavIcon>
              Live Orders
            </NavItem>
          </NavSection>
          
          <NavSection>
            <NavTitle>System Access</NavTitle>
            <NavItem href="/pos-terminal">
              <NavIcon>▦</NavIcon>
              POS Terminal
            </NavItem>
            <NavItem href="/kitchen">
              <NavIcon>◐</NavIcon>
              Kitchen Display
            </NavItem>
            <NavItem href="/display">
              <NavIcon>□</NavIcon>
              Customer Display
            </NavItem>
            <NavItem href="/mobile">
              <NavIcon>◯</NavIcon>
              Mobile Order
            </NavItem>
          </NavSection>
          
          <NavSection>
            <NavTitle>Management</NavTitle>
            <NavItem href="/menu">
              <NavIcon>≡</NavIcon>
              Menu Management
            </NavItem>
            <NavItem href="/orders">
              <NavIcon>▤</NavIcon>
              Order Management
            </NavItem>
            <NavItem href="/sales">
              <NavIcon>▲</NavIcon>
              Sales Management
            </NavItem>
            <NavItem href="/customers">
              <NavIcon>◯</NavIcon>
              Customer Management
            </NavItem>
          </NavSection>
          
          <NavSection>
            <NavTitle>Settings</NavTitle>
            <NavItem href="/settings">
              <NavIcon>⚙</NavIcon>
              Store Settings
            </NavItem>
            <NavItem href="#" onClick={handleLogout}>
              <NavIcon>↩</NavIcon>
              Logout
            </NavItem>
          </NavSection>
        </SidebarNav>
      </Sidebar>

      {/* 메인 컨텐츠 */}
      <MainContent>
        <Header>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderActions>
            <UserInfo>
              <UserAvatar>A</UserAvatar>
              <span>Admin</span>
            </UserInfo>
          </HeaderActions>
        </Header>

        <Content>
          {/* 통계 카드 */}
          <StatsGrid>
            <StatCard>
              <StatHeader>
                <StatTitle>Today's Sales</StatTitle>
              </StatHeader>
              <StatValue>RM 12,500</StatValue>
              <StatChange>+12% from yesterday</StatChange>
            </StatCard>
            
            <StatCard>
              <StatHeader>
                <StatTitle>Total Orders</StatTitle>
              </StatHeader>
              <StatValue>156</StatValue>
              <StatChange>Avg order: RM 80.13</StatChange>
            </StatCard>
            
            <StatCard>
              <StatHeader>
                <StatTitle>Pending Orders</StatTitle>
              </StatHeader>
              <StatValue>8</StatValue>
              <StatChange>Avg wait: 12 min</StatChange>
            </StatCard>
            
            <StatCard>
              <StatHeader>
                <StatTitle>Customers</StatTitle>
              </StatHeader>
              <StatValue>124</StatValue>
              <StatChange>18 new customers</StatChange>
            </StatCard>
          </StatsGrid>

          {/* 빠른 접속 */}
          <QuickAccess>
            <SectionTitle>System Quick Access</SectionTitle>
            <QuickButtons>
              <QuickBtn href="/pos-terminal">
                <QuickBtnIcon>▦</QuickBtnIcon>
                <QuickBtnTitle>POS Terminal</QuickBtnTitle>
                <QuickBtnDesc>Order processing and payment</QuickBtnDesc>
              </QuickBtn>
              
              <QuickBtn href="/kitchen">
                <QuickBtnIcon>◐</QuickBtnIcon>
                <QuickBtnTitle>Kitchen Display</QuickBtnTitle>
                <QuickBtnDesc>Cooking status and order management</QuickBtnDesc>
              </QuickBtn>
              
              <QuickBtn href="/display">
                <QuickBtnIcon>□</QuickBtnIcon>
                <QuickBtnTitle>Customer Display</QuickBtnTitle>
                <QuickBtnDesc>Pickup number display screen</QuickBtnDesc>
              </QuickBtn>
              
              <QuickBtn onClick={showQRCode}>
                <QuickBtnIcon>◯</QuickBtnIcon>
                <QuickBtnTitle>Mobile Order QR</QuickBtnTitle>
                <QuickBtnDesc>Customer mobile ordering QR code</QuickBtnDesc>
              </QuickBtn>
            </QuickButtons>
          </QuickAccess>

          {/* 실시간 현황 */}
          <StatusGrid>
            <StatusCard>
              <SectionTitle>Live Order Status</SectionTitle>
              <OrdersTable>
                <thead>
                  <tr>
                    <TableHeader>Order #</TableHeader>
                    <TableHeader>Items</TableHeader>
                    <TableHeader>Status</TableHeader>
                    <TableHeader>Time</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>#001</TableCell>
                    <TableCell>Bulgogi Rice, Kimchi Stew</TableCell>
                    <TableCell><StatusBadge status="cooking">Cooking</StatusBadge></TableCell>
                    <TableCell>14:25</TableCell>
                  </tr>
                  <tr>
                    <TableCell>#002</TableCell>
                    <TableCell>Jajangmyeon, Sweet & Sour Pork</TableCell>
                    <TableCell><StatusBadge status="ready">Ready</StatusBadge></TableCell>
                    <TableCell>14:22</TableCell>
                  </tr>
                  <tr>
                    <TableCell>#003</TableCell>
                    <TableCell>Sushi Set</TableCell>
                    <TableCell><StatusBadge status="pending">Pending</StatusBadge></TableCell>
                    <TableCell>14:28</TableCell>
                  </tr>
                  <tr>
                    <TableCell>#004</TableCell>
                    <TableCell>Ramen, Gyoza</TableCell>
                    <TableCell><StatusBadge status="cooking">Cooking</StatusBadge></TableCell>
                    <TableCell>14:30</TableCell>
                  </tr>
                </tbody>
              </OrdersTable>
            </StatusCard>
            
            <StatusCard>
              <SectionTitle>Store Status</SectionTitle>
              <div style={{ marginTop: '20px' }}>
                <StatusItem>
                  <StatusLabel>
                    <span style={{ marginRight: '8px' }}>⚙</span>Operation Status
                  </StatusLabel>
                  <StatusValue color="#059669">● Open & Operating</StatusValue>
                </StatusItem>
                <StatusItem>
                  <StatusLabel>
                    <span style={{ marginRight: '8px' }}>◯</span>Staff on Duty
                  </StatusLabel>
                  <StatusValue>3 Staff Members</StatusValue>
                </StatusItem>
                <StatusItem>
                  <StatusLabel>
                    <span style={{ marginRight: '8px' }}>◐</span>Kitchen Status
                  </StatusLabel>
                  <StatusValue color="#059669">● Normal Operation</StatusValue>
                </StatusItem>
                <StatusItem>
                  <StatusLabel>
                    <span style={{ marginRight: '8px' }}>◉</span>Next Pickup
                  </StatusLabel>
                  <StatusValue color="#635BFF" size="18px">#002</StatusValue>
                </StatusItem>
              </div>
            </StatusCard>
          </StatusGrid>
        </Content>
      </MainContent>
    </DashboardContainer>
  );
};

export default DashboardPage;