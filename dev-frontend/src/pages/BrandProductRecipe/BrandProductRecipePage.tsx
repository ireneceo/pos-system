import React, { useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, Content, TabContainer, Tab } from '../../components/UI';
import { useAuth } from '../../contexts/AuthContext';
import ProductRecipesTab from './ProductRecipesTab';
import ProductIngredientsTab from './ProductIngredientsTab';
import ProductRecipeCategoriesTab from './ProductRecipeCategoriesTab';
import ProductIngredientCategoriesTab from './ProductIngredientCategoriesTab';

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

type TabType = 'recipes' | 'ingredients' | 'recipe-categories' | 'ingredient-categories';

const BrandProductRecipePage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipesCount, setRecipesCount] = useState(0);
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [recipeCategoriesCount, setRecipeCategoriesCount] = useState(0);
  const [ingredientCategoriesCount, setIngredientCategoriesCount] = useState(0);
  const [ingredientCategoryRefreshKey, setIngredientCategoryRefreshKey] = useState(0);

  const activeTab = (searchParams.get('tab') as TabType) || 'recipes';
  const brandId = user?.brand_id;

  const handleTabChange = (tab: TabType) => {
    setSearchParams({ tab });
  };

  if (!brandId) {
    return (
      <MainLayout>
        <Container>
          <Header>
            <Title>Product Recipes</Title>
          </Header>
          <Content>
            <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
              Brand not found. Please log in with a brand account.
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
          <Title>Product Recipes</Title>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'recipes'} onClick={() => handleTabChange('recipes')}>
              Recipes
              <TabBadge>{recipesCount}</TabBadge>
            </Tab>
            <Tab active={activeTab === 'ingredients'} onClick={() => handleTabChange('ingredients')}>
              Ingredients
              <TabBadge>{ingredientsCount}</TabBadge>
            </Tab>
            <Tab active={activeTab === 'recipe-categories'} onClick={() => handleTabChange('recipe-categories')}>
              Recipe Categories
              <TabBadge>{recipeCategoriesCount}</TabBadge>
            </Tab>
            <Tab active={activeTab === 'ingredient-categories'} onClick={() => handleTabChange('ingredient-categories')}>
              Ingredient Categories
              <TabBadge>{ingredientCategoriesCount}</TabBadge>
            </Tab>
          </TabContainer>

          <div style={{ display: activeTab === 'recipes' ? 'block' : 'none' }}>
            <ProductRecipesTab onCountChange={setRecipesCount} />
          </div>
          <div style={{ display: activeTab === 'ingredients' ? 'block' : 'none' }}>
            <ProductIngredientsTab
              onCountChange={setIngredientsCount}
              categoryRefreshKey={ingredientCategoryRefreshKey}
            />
          </div>
          <div style={{ display: activeTab === 'recipe-categories' ? 'block' : 'none' }}>
            <ProductRecipeCategoriesTab onCountChange={setRecipeCategoriesCount} />
          </div>
          <div style={{ display: activeTab === 'ingredient-categories' ? 'block' : 'none' }}>
            <ProductIngredientCategoriesTab
              onCountChange={setIngredientCategoriesCount}
              onCategoryChange={() => setIngredientCategoryRefreshKey(k => k + 1)}
            />
          </div>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default BrandProductRecipePage;
