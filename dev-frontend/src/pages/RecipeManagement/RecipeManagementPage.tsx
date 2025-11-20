import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '../../components/Layout/MainLayout';
import { Container, Header, Title, Content, TabContainer, Tab } from '../../components/UI';
import RecipesTab from './RecipesTab';
import IngredientsTab from './IngredientsTab';

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

interface RecipeManagementPageProps {}

const RecipeManagementPage: React.FC<RecipeManagementPageProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipesCount, setRecipesCount] = useState(0);
  const [ingredientsCount, setIngredientsCount] = useState(0);

  const activeTab = (searchParams.get('tab') as 'recipes' | 'ingredients') || 'recipes';

  const handleTabChange = (tab: 'recipes' | 'ingredients') => {
    setSearchParams({ tab });
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Recipe</Title>
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
          </TabContainer>

          <div style={{ display: activeTab === 'recipes' ? 'block' : 'none' }}>
            <RecipesTab onCountChange={setRecipesCount} />
          </div>
          <div style={{ display: activeTab === 'ingredients' ? 'block' : 'none' }}>
            <IngredientsTab onCountChange={setIngredientsCount} />
          </div>
        </Content>
      </Container>
    </MainLayout>
  );
};

export default RecipeManagementPage;
