/**
 * 오너 «Store Comparison» — /pos/owner/profitability (설계 §6-3)
 * 소유 매장(restaurant_managers ownership) × 같은 요약. 행을 누르면 그 매장 화면(메뉴·주문 구성·시뮬레이터·설정).
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import DateRangeField from '../../components/Common/DateRangeField';
import { scopeApi, periodQuery, StoreRow } from './profitabilityApi';
import { ErrorBox, Muted, Row } from './profitabilityUi';
import StoreComparison from './StoreComparison';

const OwnerProfitabilityPage: React.FC = () => {
  const { t } = useTranslation('profitability');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [rows, setRows] = useState<StoreRow[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let live = true;
    setRows(null);
    scopeApi<{ stores: StoreRow[] }>(`/owner/stores${periodQuery(start, end)}`).then(r => {
      if (!live) return;
      if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
      setError(''); setRows(r.data.stores);
    });
    return () => { live = false; };
  }, [start, end, t]);

  return (
    <Container>
      <Header><Title>{t('page.ownerTitle', 'Profitability · Store comparison')}</Title></Header>
      <Content>
        <Row style={{ marginBottom: 12 }}>
          <Muted style={{ flex: 1 }}>{start ? '' : t('page.thisMonth', 'This month so far (each store’s time zone).')}</Muted>
          <div style={{ width: 300, maxWidth: '100%' }}><DateRangeField startDate={start} endDate={end} onChange={(s, e) => { setStart(s); setEnd(e || s); }} /></div>
        </Row>
        {error && <ErrorBox>{error}</ErrorBox>}
        {!rows && !error && <Muted>{t('common.loading', 'Loading…')}</Muted>}
        {rows && <StoreComparison rows={rows} linkable storeBase="/pos/owner/profitability/store" start={start} end={end} />}
      </Content>
    </Container>
  );
};

export default OwnerProfitabilityPage;
