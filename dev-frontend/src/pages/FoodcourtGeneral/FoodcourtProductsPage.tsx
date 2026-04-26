import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import FoodcourtProductsTab from './FoodcourtProductsTab';
import FoodcourtProductCategoriesTab from './FoodcourtProductCategoriesTab';
import FoodcourtProductOptionsTab from './FoodcourtProductOptionsTab';

type TabType = 'products' | 'categories' | 'options';

const FoodcourtProductsPage: React.FC = () => {
  const { t } = useTranslation(['foodcourt', 'common']);
  const [activeTab, handleTabChange] = useTabParam<TabType>('products');

  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [optionsCount, setOptionsCount] = useState(0);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);
  const [optionRefreshKey, setOptionRefreshKey] = useState(0);

  return (
    <Container>
      <Header>
        <Title>{t('foodcourt:products.title', 'Foodcourt Products')}</Title>
      </Header>

      <Content>
        <Tabs>
          <Tab active={activeTab === 'products'} onClick={() => handleTabChange('products')}>
            {t('foodcourt:products.tabs.products', 'Products')}
            <Badge count={productsCount} showZero />
          </Tab>
          <Tab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>
            {t('foodcourt:products.tabs.categories', 'Categories')}
            <Badge count={categoriesCount} showZero />
          </Tab>
          <Tab active={activeTab === 'options'} onClick={() => handleTabChange('options')}>
            {t('foodcourt:products.tabs.options', 'Option Groups')}
            <Badge count={optionsCount} showZero />
          </Tab>
        </Tabs>

        <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
          <FoodcourtProductsTab
            onCountChange={setProductsCount}
            categoryRefreshKey={categoryRefreshKey}
            optionRefreshKey={optionRefreshKey}
          />
        </div>
        <div style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
          <FoodcourtProductCategoriesTab
            onCountChange={setCategoriesCount}
            onCategoryChange={() => setCategoryRefreshKey(k => k + 1)}
          />
        </div>
        <div style={{ display: activeTab === 'options' ? 'block' : 'none' }}>
          <FoodcourtProductOptionsTab
            onCountChange={setOptionsCount}
            onChange={() => setOptionRefreshKey(k => k + 1)}
          />
        </div>
      </Content>
    </Container>
  );
};

export default FoodcourtProductsPage;
