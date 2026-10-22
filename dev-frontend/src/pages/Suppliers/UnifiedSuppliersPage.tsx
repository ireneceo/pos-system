/**
 * UnifiedSuppliersPage — 공급업체 통합 페이지.
 * 표준 Container > PageHeader > Content > Tabs 패턴 사용 (RecipeManagementPage / InvoicesPage 와 동일).
 *
 * 탭:
 *   - All Suppliers: 모든 source 통합 (own + brand_shared + contract + parent_brand + parent_foodcourt)
 *   - External:      직접 등록한 외부업체(솔루션 미가입) + brand 공유 — 계약 개념 없음
 *   - Contracts:     계약된 supplier_company (active SupplierContract)
 *   - Find:          **솔루션 가입** supplier 검색·계약신청 (외부업체는 여기 안 나온다)
 *   - All Products:  모든 공급처의 상품을 한 목록으로 — 검색·필터·상품 추가·내 아이템에 추가 (2026-10-15 Fable D5, AllSupplierProductsView)
 */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, Content } from '../../components/UI';
import PageHeader from '../../components/Common/PageHeader';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import AllSuppliersView from './AllSuppliersView';
import AllSupplierProductsView from './AllSupplierProductsView';
import MySuppliersPage from '../SupplierDirectory/MySuppliersPage';
import SupplierDirectoryPage from '../SupplierDirectory/SupplierDirectoryPage';
import { useAuth } from '../../contexts/AuthContext';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { getAuthToken } from '../../utils/auth';
import { getOwnerSupplierScope, setOwnerSupplierScope, OWNER_SUPPLIER_COMMON } from '../../utils/ownerPoScope';

type TabKey = 'all' | 'products' | 'direct' | 'contracts' | 'find';

const HostShell = styled.div`
  /* 자식 페이지(MySuppliersPage / SupplierDirectoryPage) 의 Container/Content padding 무력화.
     AllSuppliersView 마운트(.suppliers-direct-mount) 는 자체 padding 0 으로 wrapper Content padding 만 적용 — 영향 받지 않도록 :not() 제외.
     자식의 <Title> (h1) 은 wrapper PageHeader 와 중복이라 hide. */
  & > div:not(.suppliers-direct-mount) > div {
    padding: 0 !important;
    min-height: 0 !important;
    background: transparent !important;
  }
  & > div:not(.suppliers-direct-mount) > div > div {
    padding: 0 !important;
  }
  & h1 { display: none; }
`;

const ScopeBar = styled.div`
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 16px;
  & > span { font-size: 13px; font-weight: 600; color: #4B5563; }
`;
const ScopeHint = styled.div`font-size: 12px; color: #4B5563; flex-basis: 100%;`;

export default function UnifiedSuppliersPage() {
  const { t } = useTranslation(['supplier', 'common']);
  const [tab, setTab] = useTabParam<TabKey>('all');
  const { user } = useAuth();
  // 소속 매장 없는 오너 — 자기 이름으로 등록한 외부 업체만 관리한다(소유 매장들이 같이 씀, §H-3).
  //   계약·가입 공급업체 찾기는 매장이 하는 일이라 오너 화면에는 두지 않는다(서버도 오너에게 그 라우트를 열지 않는다).
  const isOwnerAccount = user?.role === 'Restaurant Owner' && !(user as any)?.restaurantId && !(user as any)?.restaurant_id;
  // 2026-10-22 Fable 설계 owner-supplier-management §3-E — 오너는 범위를 고른다: «내 공통 업체» | 소유 매장 하나.
  //   매장을 고르면 그 매장 관리자와 같은 5탭(서버가 그 매장으로 전환해 받는다). 재고아이템 연결은 서버가 계속 막는다.
  const [ownerRestaurants, setOwnerRestaurants] = useState<Array<{ id: number; name: string }>>([]);
  const [scope, setScopeState] = useState<number>(() => (isOwnerAccount ? getOwnerSupplierScope() : OWNER_SUPPLIER_COMMON));
  useEffect(() => {
    if (!isOwnerAccount) return;
    let alive = true;
    fetch('/api/owner/restaurants', { headers: { Authorization: `Bearer ${getAuthToken()}` } })
      .then(r => r.json())
      .then(j => {
        if (!alive) return;
        const list = (Array.isArray(j?.data) ? j.data : []).map((r: any) => ({ id: Number(r.id), name: String(r.name) }));
        setOwnerRestaurants(list);
        const keep = getOwnerSupplierScope();
        if (keep && !list.some((r: { id: number }) => r.id === keep)) { setOwnerSupplierScope(OWNER_SUPPLIER_COMMON); setScopeState(OWNER_SUPPLIER_COMMON); }
      })
      .catch(() => { if (alive) setOwnerRestaurants([]); });
    return () => { alive = false; };
  }, [isOwnerAccount]);
  const changeScope = (v: number) => { setOwnerSupplierScope(v); setScopeState(v > 0 ? v : OWNER_SUPPLIER_COMMON); };
  // 공통 범위만 오너 전용 화면(외부 업체 하나) — 매장 범위는 매장 관리자 화면 그대로
  const isOwner = isOwnerAccount && scope === OWNER_SUPPLIER_COMMON;

  return (
    <Container>
      <PageHeader title={t('supplier:nav.suppliers', 'Suppliers') as string} />
      <Content>
        {isOwnerAccount && (
          <ScopeBar>
            <span>{t('supplier:ownerScope.label', 'Manage suppliers for')}</span>
            <div style={{ width: 300, maxWidth: '100%' }}>
              <SearchableSelect
                options={[
                  { value: OWNER_SUPPLIER_COMMON, label: t('supplier:ownerScope.common', 'My shared suppliers (all my restaurants)') as string },
                  ...ownerRestaurants.map(r => ({ value: r.id, label: r.name })),
                ]}
                value={scope}
                onChange={(v) => { const n = Number(v); changeScope(Number.isFinite(n) ? n : OWNER_SUPPLIER_COMMON); }}
              />
            </div>
            <ScopeHint>
              {isOwner
                ? t('supplier:ownerScope.commonHint', 'Suppliers here are used by all your restaurants. Each restaurant can turn one off for itself.')
                : t('supplier:ownerScope.storeHint', 'You are managing this restaurant\'s suppliers, products, prices and contracts. Linking to stock items stays with the restaurant manager.')}
            </ScopeHint>
          </ScopeBar>
        )}
        {!isOwner && <Tabs>
          <Tab active={tab === 'all'} onClick={() => setTab('all')}>
            {t('supplier:nav.allSuppliers', 'All Suppliers')}
          </Tab>
          {/* 업체마다 들어가지 않고 전체 상품을 한 번에 (2026-10-15 Irene).
              소속 매장 없는 오너는 숨긴다 — 서버 카탈로그(/api/supplier-catalog)가 오너에게 열려 있지 않다(403). 오너는 업체 상세에서 상품을 관리한다. */}
          <Tab active={tab === 'products'} onClick={() => setTab('products')}>
            {t('supplier:nav.allProducts', 'All Products')}
          </Tab>
          <Tab active={tab === 'direct'} onClick={() => setTab('direct')}>
            {t('supplier:nav.direct', 'External')}
          </Tab>
          <Tab active={tab === 'contracts'} onClick={() => setTab('contracts')}>
            {t('supplier:nav.contracts', 'Contracts')}
          </Tab>
          <Tab active={tab === 'find'} onClick={() => setTab('find')}>
            {t('supplier:nav.findSuppliers', 'Find Suppliers')}
          </Tab>
        </Tabs>}
        <HostShell key={`scope-${scope}`}>
          {/* All / Direct — AllSuppliersView 단일 list (suppliers-direct-mount class 로 HostShell padding 무력화 제외)
              Contracts / Find — 자식 페이지 그대로 (Container/Content padding 무력화 적용) */}
          {(tab === 'all' || isOwner) && <div className="suppliers-direct-mount"><AllSuppliersView /></div>}
          {!isOwner && tab === 'products' && <div className="suppliers-direct-mount"><AllSupplierProductsView /></div>}
          {!isOwner && tab === 'direct' && (
            <div className="suppliers-direct-mount">
              <AllSuppliersView sources={['own', 'external', 'owner_shared', 'brand_shared', 'brand_parent', 'foodcourt_parent']} />
            </div>
          )}
          {!isOwner && (
            <>
              <div style={{ display: tab === 'contracts' ? 'block' : 'none' }}>
                <MySuppliersPage />
              </div>
              <div style={{ display: tab === 'find' ? 'block' : 'none' }}>
                <SupplierDirectoryPage />
              </div>
            </>
          )}
        </HostShell>
      </Content>
    </Container>
  );
}
