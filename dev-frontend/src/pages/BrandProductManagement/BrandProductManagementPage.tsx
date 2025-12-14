import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, Content, TabContainer, Tab } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import BrandProductsTab from './BrandProductsTab';
import BrandProductCategoriesTab from './BrandProductCategoriesTab';

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

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const BrandSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  min-width: 200px;

  &:hover {
    border-color: #CBD5E1;
  }

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

interface Brand {
  id: number;
  name: string;
  code: string;
  logo_url?: string;
}

type TabType = 'products' | 'categories';

const BrandProductManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);

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
        if (data.length > 0) {
          setSelectedBrand(data[0].id);
        }
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
      <MainLayout>
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
      </MainLayout>
    );
  }

  if ((user?.role === 'Brand General' || user?.role === 'Brand Manager') && brands.length === 0) {
    return (
      <MainLayout>
        <Container>
          <Header>
            <Title>Product Management</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              No brands found. Please create a brand first.
            </div>
          </Content>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Product Management</Title>
          {(user?.role === 'Brand General' || user?.role === 'Brand Manager') && brands.length > 0 && (
            <HeaderActions>
              <BrandSelect
                value={selectedBrand || ''}
                onChange={(e) => setSelectedBrand(Number(e.target.value))}
              >
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </BrandSelect>
            </HeaderActions>
          )}
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
          </TabContainer>

          {selectedBrand && (
            <>
              <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
                <BrandProductsTab
                  brandId={selectedBrand}
                  onCountChange={setProductsCount}
                  categoryRefreshKey={categoryRefreshKey}
                />
              </div>
              <div style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
                <BrandProductCategoriesTab
                  brandId={selectedBrand}
                  onCountChange={setCategoriesCount}
                  onCategoryChange={() => setCategoryRefreshKey(k => k + 1)}
                />
              </div>
            </>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandProductManagementPage;
