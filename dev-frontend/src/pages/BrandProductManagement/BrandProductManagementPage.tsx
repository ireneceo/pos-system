import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Container, Header, Title, Content, TabContainer, Tab } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import BrandProductsTab from './BrandProductsTab';
import BrandProductCategoriesTab from './BrandProductCategoriesTab';
import BrandProductOptionsTab from './BrandProductOptionsTab';

const TabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  margin-left: 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
`;

interface Brand {
  id: number;
  name: string;
  code: string;
  logo_url?: string;
}

type TabType = 'products' | 'categories' | 'options';

const BrandProductManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [optionsCount, setOptionsCount] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);
  const [optionRefreshKey, setOptionRefreshKey] = useState(0);

  const activeTab = (searchParams.get('tab') as TabType) || 'products';

  useEffect(() => {
    if (user && (user.role === 'Brand General' || user.role === 'Brand Manager')) {
      fetchBrands();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBrands = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch('/api/brands', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  if (loading) {
    return (
      <>
        <Container>
          <Header>
            <Title>Product Management</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              Loading...
            </div>
          </Content>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <Title>Product Management</Title>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'products'} onClick={() => handleTabChange('products')}>
              Products
              <TabBadge>{productsCount}</TabBadge>
            </Tab>
            <Tab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>
              Categories
              <TabBadge>{categoriesCount}</TabBadge>
            </Tab>
            <Tab active={activeTab === 'options'} onClick={() => handleTabChange('options')}>
              Options
              <TabBadge>{optionsCount}</TabBadge>
            </Tab>
          </TabContainer>

          <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
            <BrandProductsTab
              brands={brands}
              onCountChange={setProductsCount}
              categoryRefreshKey={categoryRefreshKey}
              optionRefreshKey={optionRefreshKey}
            />
          </div>
          <div style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
            <BrandProductCategoriesTab
              onCountChange={setCategoriesCount}
              onCategoryChange={() => setCategoryRefreshKey(k => k + 1)}
            />
          </div>
          <div style={{ display: activeTab === 'options' ? 'block' : 'none' }}>
            <BrandProductOptionsTab
              onCountChange={setOptionsCount}
            />
          </div>
        </Content>
      </Container>
    </>
  );
};

export default BrandProductManagementPage;
