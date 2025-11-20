import React, { useState } from 'react';
import styled from 'styled-components';
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
  const [activeTab, setActiveTab] = useState<'recipes' | 'ingredients'>('recipes');
  const [recipesCount, setRecipesCount] = useState(0);
  const [ingredientsCount, setIngredientsCount] = useState(0);

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>Recipe</Title>
        </Header>

        <Content>
          <TabContainer>
            <Tab active={activeTab === 'recipes'} onClick={() => setActiveTab('recipes')}>
              Recipes
              <TabBadge>{recipesCount}</TabBadge>
            </Tab>
            <Tab active={activeTab === 'ingredients'} onClick={() => setActiveTab('ingredients')}>
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
