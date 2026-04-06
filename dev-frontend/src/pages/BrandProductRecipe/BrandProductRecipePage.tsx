import React, { useState } from 'react';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { useAuth } from '../../contexts/AuthContext';
import ProductRecipesTab from './ProductRecipesTab';
import ProductRecipeCategoriesTab from './ProductRecipeCategoriesTab';

type TabType = 'recipes' | 'recipe-categories';

const BrandProductRecipePage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, handleTabChange] = useTabParam<TabType>('recipes');
  const [recipesCount, setRecipesCount] = useState(0);
  const [recipeCategoriesCount, setRecipeCategoriesCount] = useState(0);
  const [recipeCategoryRefreshKey, setRecipeCategoryRefreshKey] = useState(0);

  const brandId = user?.brand_id;

  if (!brandId) {
    return (
      <Container>
        <Header><Title>Product Recipes</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
            Brand not found. Please log in with a brand account.
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header><Title>Product Recipes</Title></Header>
      <Content>
        <Tabs>
          <Tab active={activeTab === 'recipes'} onClick={() => handleTabChange('recipes')}>
            Recipes <Badge count={recipesCount} showZero />
          </Tab>
          <Tab active={activeTab === 'recipe-categories'} onClick={() => handleTabChange('recipe-categories')}>
            Recipe Categories <Badge count={recipeCategoriesCount} showZero />
          </Tab>
        </Tabs>

        <div style={{ display: activeTab === 'recipes' ? 'block' : 'none' }}>
          <ProductRecipesTab onCountChange={setRecipesCount} categoryRefreshKey={recipeCategoryRefreshKey} />
        </div>
        <div style={{ display: activeTab === 'recipe-categories' ? 'block' : 'none' }}>
          <ProductRecipeCategoriesTab onCountChange={setRecipeCategoriesCount} onCategoryChange={() => setRecipeCategoryRefreshKey(k => k + 1)} />
        </div>
      </Content>
    </Container>
  );
};

export default BrandProductRecipePage;
