import React, { useEffect, useState } from 'react';
import { Container, Header, Title, Content } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import ProductRecipesTab from './ProductRecipesTab';
import ProductRecipeCategoriesTab from './ProductRecipeCategoriesTab';
import { useTranslation } from 'react-i18next';
import { fetchAPI } from '../../utils/api';

type TabType = 'recipes' | 'recipe-categories';

interface OwnedBrand {
  id: number;
  name: string;
}

// A Brand General can own MULTIPLE brands (Brand.owner_id === User.id pattern,
// not the legacy single User.brand_id field). The previous implementation
// blocked the page whenever User.brand_id was null even though the user
// might own brands via owner_id. We now resolve the user's brand list from
// /api/brands (which itself filters by owner_id for BG users) and show a
// brand selector when the user owns more than one. The selected brand id is
// passed down to child tabs so their queries filter to that brand.
const BrandProductRecipePage: React.FC = () => {
  const { t } = useTranslation('brand');
  const [activeTab, handleTabChange] = useTabParam<TabType>('recipes');
  const [recipesCount, setRecipesCount] = useState(0);
  const [recipeCategoriesCount, setRecipeCategoriesCount] = useState(0);
  const [recipeCategoryRefreshKey, setRecipeCategoryRefreshKey] = useState(0);

  const [brands, setBrands] = useState<OwnedBrand[] | null>(null);
  // 활성 브랜드는 Brand Menus 와 같은 localStorage 키('bg.selectedBrandId')를 공유 — 두 화면이 다른 브랜드를
  // 가리켜 'Linked Recipe' 드롭다운이 비던 문제 방지. 한 곳에서 브랜드를 바꾸면 다른 곳도 같은 브랜드를 본다.
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(() => {
    const saved = localStorage.getItem('bg.selectedBrandId');
    return saved ? Number(saved) : null;
  });
  const pickBrand = (id: number | null) => {
    setSelectedBrandId(id);
    if (id != null) localStorage.setItem('bg.selectedBrandId', String(id));
  };
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res: any = await fetchAPI('/api/brands');
        if (cancelled) return;
        const list: OwnedBrand[] = ((Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [])).map((b: any) => ({
          id: b.id, name: b.name
        }));
        setBrands(list);
        // 저장된 브랜드가 소유 목록에 있으면 유지, 없으면 첫 브랜드로(키 동기화).
        if (list.length > 0) {
          setSelectedBrandId(prev => {
            const valid = prev != null && list.some(b => b.id === prev) ? prev : list[0].id;
            localStorage.setItem('bg.selectedBrandId', String(valid));
            return valid;
          });
        }
      } catch (e: any) {
        if (!cancelled) setLoadError(e?.message || 'Failed to load brands');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loadError) {
    return (
      <Container>
        <Header><Title>{t('brand:brandProductRecipePage.productRecipes')}</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#DC2626' }}>
            {loadError}
          </div>
        </Content>
      </Container>
    );
  }

  if (brands === null) {
    return (
      <Container>
        <Header><Title>{t('brand:brandProductRecipePage.productRecipes')}</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
            {t('brand:brandProductRecipePage.loading', 'Loading…')}
          </div>
        </Content>
      </Container>
    );
  }

  if (brands.length === 0) {
    return (
      <Container>
        <Header><Title>{t('brand:brandProductRecipePage.productRecipes')}</Title></Header>
        <Content>
          <div style={{ textAlign: 'center', padding: '40px', color: '#4B5563' }}>
            {t(
              'brand:brandProductRecipePage.noBrand',
              'No brand is associated with this account. Please contact System Admin.'
            )}
          </div>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>{t('brand:brandProductRecipePage.productRecipes')}</Title>
        {brands.length > 1 && (
          <select
            aria-label={t('brand:brandProductRecipePage.brandSelector', 'Brand') as string}
            value={selectedBrandId ?? ''}
            onChange={(e) => pickBrand(parseInt(e.target.value, 10))}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #C7CED6',
              fontSize: 14,
              background: 'white',
              cursor: 'pointer'
            }}
          >
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        )}
      </Header>
      <Content>
        <Tabs>
          <Tab active={activeTab === 'recipes'} onClick={() => handleTabChange('recipes')}>
            {t('brand:brandProductRecipePage.recipes', 'Recipes')} <Badge count={recipesCount} showZero />
          </Tab>
          <Tab active={activeTab === 'recipe-categories'} onClick={() => handleTabChange('recipe-categories')}>
            {t('brand:brandProductRecipePage.recipeCategories', 'Recipe Categories')} <Badge count={recipeCategoriesCount} showZero />
          </Tab>
        </Tabs>

        <div style={{ display: activeTab === 'recipes' ? 'block' : 'none' }}>
          <ProductRecipesTab
            brandId={selectedBrandId}
            onCountChange={setRecipesCount}
            categoryRefreshKey={recipeCategoryRefreshKey}
          />
        </div>
        <div style={{ display: activeTab === 'recipe-categories' ? 'block' : 'none' }}>
          <ProductRecipeCategoriesTab
            brandId={selectedBrandId}
            onCountChange={setRecipeCategoriesCount}
            onCategoryChange={() => setRecipeCategoryRefreshKey(k => k + 1)}
          />
        </div>
      </Content>
    </Container>
  );
};

export default BrandProductRecipePage;
