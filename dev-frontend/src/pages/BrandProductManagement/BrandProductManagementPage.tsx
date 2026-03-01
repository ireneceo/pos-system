import React, { useState, useEffect } from 'react';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import BrandProductsTab from './BrandProductsTab';
import BrandProductCategoriesTab from './BrandProductCategoriesTab';
import BrandProductOptionsTab from './BrandProductOptionsTab';

interface Brand {
  id: number;
  name: string;
  code: string;
  logo_url?: string;
}

type TabType = 'products' | 'categories' | 'options';

const BrandProductManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, handleTabChange] = useTabParam<TabType>('products');
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [optionsCount, setOptionsCount] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);
  const [optionRefreshKey, setOptionRefreshKey] = useState(0);

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
          <Tabs>
            <Tab active={activeTab === 'products'} onClick={() => handleTabChange('products')}>
              Products
              <Badge count={productsCount} showZero />
            </Tab>
            <Tab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>
              Categories
              <Badge count={categoriesCount} showZero />
            </Tab>
            <Tab active={activeTab === 'options'} onClick={() => handleTabChange('options')}>
              Options
              <Badge count={optionsCount} showZero />
            </Tab>
          </Tabs>

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
