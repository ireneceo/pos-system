/**
 * UnifiedSuppliersPage — 공급업체 통합 페이지.
 * 표준 Container > PageHeader > Content > Tabs 패턴 사용 (RecipeManagementPage / InvoicesPage 와 동일).
 *
 * 탭:
 *   - All Suppliers: 모든 source 통합 (own + brand_shared + contract + parent_brand + parent_foodcourt)
 *   - External:      직접 등록한 외부업체(솔루션 미가입) + brand 공유 — 계약 개념 없음
 *   - Contracts:     계약된 supplier_company (active SupplierContract)
 *   - Find:          **솔루션 가입** supplier 검색·계약신청 (외부업체는 여기 안 나온다)
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container, Content } from '../../components/UI';
import PageHeader from '../../components/Common/PageHeader';
import { Tabs, Tab } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import AllSuppliersView from './AllSuppliersView';
import MySuppliersPage from '../SupplierDirectory/MySuppliersPage';
import SupplierDirectoryPage from '../SupplierDirectory/SupplierDirectoryPage';

type TabKey = 'all' | 'direct' | 'contracts' | 'find';

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

export default function UnifiedSuppliersPage() {
  const { t } = useTranslation(['supplier', 'common']);
  const [tab, setTab] = useTabParam<TabKey>('all');

  return (
    <Container>
      <PageHeader title={t('supplier:nav.suppliers', 'Suppliers') as string} />
      <Content>
        <Tabs>
          <Tab active={tab === 'all'} onClick={() => setTab('all')}>
            {t('supplier:nav.allSuppliers', 'All Suppliers')}
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
        </Tabs>
        <HostShell>
          {/* All / Direct — AllSuppliersView 단일 list (suppliers-direct-mount class 로 HostShell padding 무력화 제외)
              Contracts / Find — 자식 페이지 그대로 (Container/Content padding 무력화 적용) */}
          {tab === 'all' && <div className="suppliers-direct-mount"><AllSuppliersView /></div>}
          {tab === 'direct' && (
            <div className="suppliers-direct-mount">
              <AllSuppliersView sources={['own', 'external', 'brand_shared', 'brand_parent', 'foodcourt_parent']} />
            </div>
          )}
          <div style={{ display: tab === 'contracts' ? 'block' : 'none' }}>
            <MySuppliersPage />
          </div>
          <div style={{ display: tab === 'find' ? 'block' : 'none' }}>
            <SupplierDirectoryPage />
          </div>
        </HostShell>
      </Content>
    </Container>
  );
}
