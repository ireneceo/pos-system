import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import ProductIngredientsTab from './ProductIngredientsTab';
import ProductIngredientCategoriesTab from './ProductIngredientCategoriesTab';
import { useTranslation } from 'react-i18next';

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

  &:hover { border-color: #CBD5E1; }
  &:focus { outline: none; border-color: #635BFF; }
`;

interface Brand { id: number; name: string; }
type TabType = 'ingredients' | 'ingredient-categories';

const BrandIngredientsPage: React.FC = () => {
  const { t } = useTranslation('brand');
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, handleTabParamChange] = useTabParam<TabType>('ingredients');
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [ingredientCategoriesCount, setIngredientCategoriesCount] = useState(0);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);

  const brandIdFromUrl = searchParams.get('brandId');
  const selectedBrand = brandIdFromUrl ? Number(brandIdFromUrl) : (brands.length > 0 ? brands[0].id : null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch('/api/brands', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setBrands(data);
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
    fetchBrands();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: TabType) => {
    handleTabParamChange(tab);
    if (selectedBrand) {
      setSearchParams(prev => { prev.set('tab', tab); prev.set('brandId', String(selectedBrand)); return prev; });
    }
  };

  if (loading) {
    return (
      <Container><Header><Title>{t('brand:brandIngredientsPage.ingredients')}</Title></Header>
        <Content><div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>{t('brand:brandIngredientsPage.loading')}</div></Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('brand:brandIngredientsPage.ingredients')}</Title>
        {brands.length > 0 && (
          <HeaderActions>
            <BrandSelect value={selectedBrand || ''} onChange={(e) => setSearchParams({ tab: activeTab, brandId: e.target.value })}>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </BrandSelect>
          </HeaderActions>
        )}
      </Header>
      <Content>
        <Tabs>
          <Tab active={activeTab === 'ingredients'} onClick={() => handleTabChange('ingredients')}>
            Ingredients <Badge count={ingredientsCount} showZero />
          </Tab>
          <Tab active={activeTab === 'ingredient-categories'} onClick={() => handleTabChange('ingredient-categories')}>
            Categories <Badge count={ingredientCategoriesCount} showZero />
          </Tab>
        </Tabs>
        {selectedBrand && (
          <>
            <div style={{ display: activeTab === 'ingredients' ? 'block' : 'none' }}>
              <ProductIngredientsTab brandId={selectedBrand} onCountChange={setIngredientsCount} categoryRefreshKey={categoryRefreshKey} />
            </div>
            <div style={{ display: activeTab === 'ingredient-categories' ? 'block' : 'none' }}>
              <ProductIngredientCategoriesTab brandId={selectedBrand} onCountChange={setIngredientCategoriesCount} onCategoryChange={() => setCategoryRefreshKey(k => k + 1)} />
            </div>
          </>
        )}
      </Content>
    </Container>
  );
};

export default BrandIngredientsPage;
