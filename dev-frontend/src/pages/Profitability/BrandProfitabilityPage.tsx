/**
 * 브랜드 «Store Profitability» — /pos/brand/general/profitability (설계 §6-4)
 * 브랜드(소유 ∪ 배정) 고르기 → 그 브랜드 매장 비교 + 브랜드 평균. Brand Manager 는 금액 칸이 빠진 채 같은 화면·매장 화면을 본다(설계 §2).
 * «표준 원가 대비»(메뉴 × 매장) 탭은 3단계 · 브랜드 자체 판매 마진은 기존 화면으로 가는 링크만.
 */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { StandardSelect } from '../../components/UI/SelectComponents';
import DateRangeField from '../../components/Common/DateRangeField';
import { useAuth } from '../../contexts/AuthContext';
import { scopeApi, periodQuery, StoreRow } from './profitabilityApi';
import { ErrorBox, Muted, Row, COLORS } from './profitabilityUi';
import StoreComparison from './StoreComparison';

const BrandProfitabilityPage: React.FC = () => {
  const { t } = useTranslation('profitability');
  const { user } = useAuth();
  const isManager = user?.role === 'Brand Manager';
  const [brands, setBrands] = useState<Array<{ id: number; name: string }>>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [rows, setRows] = useState<StoreRow[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    scopeApi<Array<{ id: number; name: string }>>('/brands').then(r => {
      if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
      setBrands(r.data);
      const home = r.data.find(b => b.id === Number(user?.brand_id));
      setBrandId((home || r.data[0])?.id ?? null);
    });
  }, [t, user?.brand_id]);

  useEffect(() => {
    if (!brandId) return;
    let live = true;
    setRows(null);
    scopeApi<{ stores: StoreRow[] }>(`/brands/${brandId}/stores${periodQuery(start, end)}`).then(r => {
      if (!live) return;
      if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
      setError(''); setRows(r.data.stores);
    });
    return () => { live = false; };
  }, [brandId, start, end, t]);

  return (
    <Container>
      <Header><Title>{t('page.brandTitle', 'Profitability · Stores')}</Title></Header>
      <Content>
        <Row style={{ marginBottom: 12 }}>
          {brands.length > 1 && (
            <StandardSelect value={brandId ?? ''} onChange={e => setBrandId(Number(e.target.value))} aria-label={t('page.brand', 'Brand')} style={{ width: 'auto', minWidth: 180 }}>
              {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </StandardSelect>
          )}
          <Muted style={{ flex: 1 }}>{start ? '' : t('page.thisMonth', 'This month so far (each store’s time zone).')}</Muted>
          <div style={{ width: 300, maxWidth: '100%' }}><DateRangeField startDate={start} endDate={end} onChange={(s, e) => { setStart(s); setEnd(e || s); }} /></div>
        </Row>
        {error && <ErrorBox>{error}</ErrorBox>}
        {!rows && !error && <Muted>{t('common.loading', 'Loading…')}</Muted>}
        {rows && <StoreComparison rows={rows} linkable storeBase="/pos/brand/general/profitability/store" redacted={isManager} start={start} end={end} showAverage />}
        <Muted>
          {t('page.brandShare', 'Staff cost, rent and profit of a store appear here only when that store shares them (next step).')}{' '}
          <Link to="/pos/brand/general/reports" style={{ color: COLORS.primary, fontWeight: 600 }}>{t('page.brandOwnSales', 'Brand’s own sales & margins')}</Link>
        </Muted>
      </Content>
    </Container>
  );
};

export default BrandProfitabilityPage;
