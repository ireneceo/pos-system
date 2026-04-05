import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams, useParams } from 'react-router-dom';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import RecipesTab from './RecipesTab';
import RecipeCategoriesTab from './RecipeCategoriesTab';

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

type TabType = 'recipes' | 'recipe-categories';

interface RecipeManagementPageProps {}

const RecipeManagementPage: React.FC<RecipeManagementPageProps> = () => {
  const { user } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, handleTabParamChange] = useTabParam<TabType>('recipes');
  const [recipesCount, setRecipesCount] = useState(0);
  const [recipeCategoriesCount, setRecipeCategoriesCount] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [recipeCategoryRefreshKey, setRecipeCategoryRefreshKey] = useState(0);

  const brandIdFromUrl = searchParams.get('brandId');
  const selectedBrand = brandIdFromUrl ? Number(brandIdFromUrl) : (brands.length > 0 ? brands[0].id : null);

  useEffect(() => {
    if (user && user.role === 'Brand General') {
      fetchBrands();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // URL에 brandId가 없으면 첫 번째 브랜드를 URL에 설정
        if (data.length > 0 && !brandIdFromUrl) {
          setSearchParams({ tab: activeTab, brandId: String(data[0].id) });
        }
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: TabType) => {
    handleTabParamChange(tab);
    if (selectedBrand) {
      // Preserve brandId in URL when changing tabs
      setSearchParams(prev => {
        prev.set('tab', tab);
        prev.set('brandId', String(selectedBrand));
        return prev;
      });
    }
  };

  const handleBrandChange = (brandId: number) => {
    setSearchParams({ tab: activeTab, brandId: String(brandId) });
  };

  if (loading) {
    return (
      <>
        <Container>
          <Header>
            <Title>Recipes</Title>
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

  if (user?.role === 'Brand General' && brands.length === 0) {
    return (
      <>
        <Container>
          <Header>
            <Title>Recipes</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              No brands found. Please create a brand first.
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
          <Title>Recipes</Title>
          {user?.role === 'Brand General' && brands.length > 0 && (
            <HeaderActions>
              <BrandSelect
                value={selectedBrand || ''}
                onChange={(e) => handleBrandChange(Number(e.target.value))}
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
          <Tabs>
            <Tab active={activeTab === 'recipes'} onClick={() => handleTabChange('recipes')}>
              Recipes <Badge count={recipesCount} showZero />
            </Tab>
            <Tab active={activeTab === 'recipe-categories'} onClick={() => handleTabChange('recipe-categories')}>
              Recipe Categories <Badge count={recipeCategoriesCount} showZero />
            </Tab>
          </Tabs>

          {(selectedBrand || user?.role !== 'Brand General') && (
            <>
              <div style={{ display: activeTab === 'recipes' ? 'block' : 'none' }}>
                <RecipesTab brandId={selectedBrand} restaurantId={urlRestaurantId ? Number(urlRestaurantId) : null} onCountChange={setRecipesCount} categoryRefreshKey={recipeCategoryRefreshKey} />
              </div>
              <div style={{ display: activeTab === 'recipe-categories' ? 'block' : 'none' }}>
                <RecipeCategoriesTab brandId={selectedBrand} restaurantId={urlRestaurantId ? Number(urlRestaurantId) : null} onCountChange={setRecipeCategoriesCount} onCategoryChange={() => setRecipeCategoryRefreshKey(k => k + 1)} />
              </div>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default RecipeManagementPage;
