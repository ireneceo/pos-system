import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import SupplierProductsTab from './SupplierProductsTab';
import SupplierProductCategoriesTab from './SupplierProductCategoriesTab';
import SupplierProductOptionsTab from './SupplierProductOptionsTab';

type TabType = 'products' | 'categories' | 'options';

const SupplierProductsPage: React.FC = () => {
  const { t } = useTranslation('supplier');
  const [activeTab, handleTabChange] = useTabParam<TabType>('products');
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [optionsCount, setOptionsCount] = useState(0);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);
  const [optionRefreshKey, setOptionRefreshKey] = useState(0);

  return (
    <Container>
      <Header>
        <Title>{t('products.title', 'Product Catalog')}</Title>
      </Header>

      <Content>
        <Tabs>
          <Tab active={activeTab === 'products'} onClick={() => handleTabChange('products')}>
            {t('products.title', 'Products')}
            <Badge count={productsCount} showZero />
          </Tab>
          <Tab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>
            {t('products.categoryManagement', 'Categories')}
            <Badge count={categoriesCount} showZero />
          </Tab>
          <Tab active={activeTab === 'options'} onClick={() => handleTabChange('options')}>
            {t('products.optionGroups', 'Option Groups')}
            <Badge count={optionsCount} showZero />
          </Tab>
        </Tabs>

        <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
          <SupplierProductsTab
            onCountChange={setProductsCount}
            categoryRefreshKey={categoryRefreshKey}
            optionRefreshKey={optionRefreshKey}
          />
        </div>
        <div style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
          <SupplierProductCategoriesTab
            onCountChange={setCategoriesCount}
            onCategoryChange={() => setCategoryRefreshKey((k) => k + 1)}
          />
        </div>
        <div style={{ display: activeTab === 'options' ? 'block' : 'none' }}>
          <SupplierProductOptionsTab
            onCountChange={setOptionsCount}
            onOptionGroupChange={() => setOptionRefreshKey((k) => k + 1)}
          />
        </div>
      </Content>
    </Container>
  );
};

export default SupplierProductsPage;
