import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams, useParams } from 'react-router-dom';
import { Container, Content } from '../../components/UI';
import PageHeader from '../../components/Common/PageHeader';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { Building2, ChevronDown } from 'lucide-react';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import RecipesTab from './RecipesTab';
import RecipeCategoriesTab from './RecipeCategoriesTab';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
// Mirrors BrandMenusPage layout: ActionRow + BrandSwitch chip-button + dropdown.
const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  @media (max-width: 480px) { gap: 8px; }
`;

const BrandSwitch = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  cursor: pointer;
  &:hover { border-color: #635BFF; }
  svg { width: 14px; height: 14px; color: #4B5563; }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div<{ $active?: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  color: ${p => p.$active ? '#635BFF' : '#0A2540'};
  background: ${p => p.$active ? '#F0EFFF' : 'white'};
  cursor: pointer;
  &:hover { background: #F0EFFF; }
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
  const { t } = useTranslation('recipes');
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
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const currentBrand = brands.find(b => b.id === selectedBrand);

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
      const token = getAuthToken();
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

  const pageTitle = user?.role === 'Brand General' || user?.role === 'Brand Manager'
    ? t('recipes:recipeManagementPage.brandRecipes', 'Brand Recipes')
    : t('recipes:recipeManagementPage.recipes');

  if (loading) {
    return (
      <Container>
        <PageHeader title={pageTitle} />
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>Loading...</div>
        </Content>
      </Container>
    );
  }

  if (user?.role === 'Brand General' && brands.length === 0) {
    return (
      <Container>
        <PageHeader title={pageTitle} />
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
            No brands found. Please create a brand first.
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title={pageTitle} />
      <Content>
        {user?.role === 'Brand General' && brands.length > 0 && (
          <ActionRow>
            {brands.length > 1 ? (
              <div style={{ position: 'relative' }}>
                <BrandSwitch type="button" onClick={() => setShowBrandDropdown(!showBrandDropdown)}>
                  <Building2 />
                  {currentBrand?.name || t('recipes:recipeManagementPage.selectBrand', 'Select Brand')}
                  <ChevronDown />
                </BrandSwitch>
                {showBrandDropdown && (
                  <Dropdown>
                    {brands.map(b => (
                      <DropdownItem
                        key={b.id}
                        $active={b.id === selectedBrand}
                        onClick={() => { handleBrandChange(b.id); setShowBrandDropdown(false); }}
                      >
                        {b.name}
                      </DropdownItem>
                    ))}
                  </Dropdown>
                )}
              </div>
            ) : (
              <BrandSwitch as="div" style={{ cursor: 'default' }}>
                <Building2 />
                {currentBrand?.name}
              </BrandSwitch>
            )}
            <div style={{ flex: 1 }} />
          </ActionRow>
        )}

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
  );
};

export default RecipeManagementPage;
