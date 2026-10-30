/**
 * 매장 «Profitability» — /restaurant/:restaurantId/profitability (설계 .claude/fable-design-20261029-brand-profitability.md §6-2)
 * 매장 관리자 · 오너(비교 화면에서 들어옴) · 브랜드(비교 화면에서 들어옴, 메뉴·주문 구성만 — Q1-A).
 * 탭 이름 = 질문: 어느 메뉴가 돈이 되나 / 손님은 어떻게 시키나 / 매출이 바뀌면 어떻게 되나 · 설정은 톱니 버튼.
 * 1단계: 인건비·임대가 들어간 «이번 달 얼마 남았나»(손익)와 «재료 차이»는 2·3단계.
 */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Header, Title, Content } from '../../components/UI/PageComponents';
import { TabContainer, Tab } from '../../components/UI/Tabs';
import { Button } from '../../components/UI/Button';
import DateRangeField from '../../components/Common/DateRangeField';
import { useAuth } from '../../contexts/AuthContext';
import { storeApi, periodQuery, Summary } from './profitabilityApi';
import { Grid, KpiCard, ReadinessBand, ErrorBox, Muted, Row, money, pctText, deltaPct, deltaPp, foodCostTone, trendToneUp, Tone } from './profitabilityUi';
import MenusTab from './tabs/MenusTab';
import MixTab from './tabs/MixTab';
import SimulatorTab from './tabs/SimulatorTab';
import SettingsTab from './tabs/SettingsTab';

const TABS = ['menus', 'mix', 'simulator', 'settings'] as const;
type TabKey = typeof TABS[number];
const MANAGE_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner'];

const StoreProfitabilityPage: React.FC = () => {
  const { t } = useTranslation(['profitability', 'common']);
  const { restaurantId = '' } = useParams<{ restaurantId: string }>();
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();
  const role = user?.role || '';
  const canManage = MANAGE_ROLES.includes(role);
  const allowed: readonly TabKey[] = canManage ? TABS : ['menus', 'mix'];
  const asked = params.get('tab') as TabKey | null;
  const tab: TabKey = asked && allowed.includes(asked) ? asked : 'menus';

  const [start, setStart] = useState(params.get('start') || '');
  const [end, setEnd] = useState(params.get('end') || '');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState('');
  const [reload, setReload] = useState(0);

  const load = useCallback(async () => {
    setError('');
    const r = await storeApi<Summary>(restaurantId, `/summary${periodQuery(start, end)}`);
    if (!r.ok) {
      setSummary(null);
      setError(r.status === 403 ? t('errors.forbidden', 'You do not have access to this store’s profitability, or it is not in the plan.') : (r.message || t('errors.load', 'Could not load')));
      return;
    }
    setSummary(r.data);
    // 기간을 안 줬으면 서버가 매장 타임존의 이번 달로 채워 준다 — 그 값으로 날짜 칸을 맞춘다
    if (!start) setStart(r.data.period.start);
    if (!end) setEnd(r.data.period.end);
  }, [restaurantId, start, end, t]);
  useEffect(() => { load(); }, [load, reload]);

  const go = (k: TabKey) => {
    const next = new URLSearchParams(params);
    next.set('tab', k);
    setParams(next, { replace: true });
  };

  const backTo = role === 'Restaurant Owner' ? '/pos/owner/profitability' : (role === 'Brand General' || role === 'Brand Manager' ? '/pos/brand/general/profitability' : null);
  const cur = summary?.restaurant.currency || 'MYR';

  const kpis = (() => {
    if (!summary) return null;
    const s = summary;
    const salesD = deltaPct(s.net_sales, s.previous.net_sales);
    const conD = deltaPp(s.contribution_pct, s.previous.contribution_pct);
    const ticketD = deltaPct(s.avg_ticket, s.previous.avg_ticket);
    const salesTone: Tone = salesD.diff === null ? 'none' : salesD.diff >= 0 ? 'good' : salesD.diff > -10 ? 'warn' : 'bad';
    const prevLabel = t('kpi.vsPrevious', 'vs previous {{days}} days', { days: s.period.days });
    const noPrev = t('kpi.noPrevious', 'No sales in the previous {{days}} days to compare', { days: s.period.days });
    const fcTone = foodCostTone(s.food_cost_pct, s.targets.food_cost_pct);
    return (
      <Grid cols={4}>
        <KpiCard
          label={t('kpi.netSales', 'Net sales')}
          value={money(s.net_sales, cur)}
          tone={salesTone}
          why={salesD.diff === null ? noPrev : `${salesD.text} ${prevLabel} · ${t('kpi.orders', '{{n}} orders', { n: s.orders })}`}
        />
        <KpiCard
          label={t('kpi.contribution', 'Contribution margin')}
          tag={t('tags.estimate', 'Estimate')}
          value={pctText(s.contribution_pct)}
          tone={s.contribution_pct === null ? 'none' : trendToneUp(conD.diff)}
          why={s.contribution_pct === null
            ? t('kpi.noCost', 'No sold menu has a cost yet — link recipes to see what is left per sale')
            : `${t('kpi.leftAmount', '{{v}} left after food cost and fees', { v: money(s.contribution, cur) })} · ${conD.diff === null ? noPrev : `${conD.text} ${prevLabel}`} · ${t('kpi.onCosted', 'on {{pct}} of sales with known cost', { pct: pctText(s.costed_sales_pct) })}`}
        />
        <KpiCard
          label={t('kpi.foodCost', 'Food cost')}
          tag={t('kpi.theoretical', 'Theoretical')}
          value={pctText(s.food_cost_pct)}
          tone={fcTone}
          why={s.food_cost_pct === null
            ? t('kpi.noCost', 'No sold menu has a cost yet — link recipes to see what is left per sale')
            : t(fcTone === 'good' ? 'kpi.foodCostOk' : 'kpi.foodCostHigh', fcTone === 'good' ? 'Within target {{target}}% (current recipes)' : '{{diff}}%p above target {{target}}% (current recipes)', {
              target: s.targets.food_cost_pct, diff: Math.round(((s.food_cost_pct || 0) - s.targets.food_cost_pct) * 10) / 10,
            })}
        />
        <KpiCard
          label={t('kpi.avgTicket', 'Average ticket')}
          value={money(s.avg_ticket, cur)}
          tone={ticketD.diff === null ? 'none' : ticketD.diff >= 0 ? 'good' : ticketD.diff > -10 ? 'warn' : 'bad'}
          why={ticketD.diff === null ? noPrev : `${ticketD.text} ${prevLabel}`}
        />
      </Grid>
    );
  })();

  return (
    <Container>
      <Header>
        <Title>
          {t('page.title', 'Profitability')}{summary ? ` · ${summary.restaurant.name}` : ''}
        </Title>
      </Header>
      <Content>
        <Row style={{ marginBottom: 12 }}>
          {backTo && <Link to={backTo} style={{ color: '#635BFF', fontWeight: 600, fontSize: 13, textDecoration: 'none' }}>← {t('page.backToComparison', 'Store comparison')}</Link>}
          <div style={{ flex: 1 }} />
          <div style={{ width: 300, maxWidth: '100%' }}><DateRangeField startDate={start} endDate={end} onChange={(s, e) => { setStart(s); setEnd(e || s); }} /></div>
          {canManage && (
            <Button variant={tab === 'settings' ? 'primary' : 'secondary'} size="small" onClick={() => go('settings')} aria-label={t('tabs.settings', 'Settings')}>
              ⚙ {t('tabs.settings', 'Settings')}
            </Button>
          )}
        </Row>
        {error && <ErrorBox>{error}</ErrorBox>}
        {summary && (
          <>
            <ReadinessBand r={summary.readiness} restaurantId={restaurantId} showLinks={role === 'Restaurant Admin'} onOpenSettings={canManage ? () => go('settings') : undefined} />
            {kpis}
            <Muted style={{ marginBottom: 16 }}>
              {t('page.basis', 'Server totals for completed orders. Staff meals are a cost, not sales — excluded here.')}
              {summary.staff_meal && summary.staff_meal.orders > 0 && ` ${t('page.staffMeal', 'Staff meal orders: {{n}} · cost {{cost}}.', { n: summary.staff_meal.orders, cost: money(summary.staff_meal.cost, cur) })}`}
              {summary.financial_redacted && ` ${t('compare.redacted', 'Amounts are hidden for brand managers; ratios are shown.')}`}
              {summary.options_unknown_lines > 0 && ` ${t('page.optionsUnknown', '{{n}} lines had options with no ingredients linked (counted as 0).', { n: summary.options_unknown_lines })}`}
            </Muted>
            <TabContainer>
              <Tab active={tab === 'menus'} onClick={() => go('menus')}>{t('tabs.menusQ', 'Which menus make money?')}</Tab>
              <Tab active={tab === 'mix'} onClick={() => go('mix')}>{t('tabs.mixQ', 'How do customers order?')}</Tab>
              {canManage && <Tab active={tab === 'simulator'} onClick={() => go('simulator')}>{t('tabs.simulatorQ', 'What if sales change?')}</Tab>}
            </TabContainer>
            <div style={{ marginTop: 20 }}>
              {tab === 'menus' && <MenusTab restaurantId={restaurantId} start={start} end={end} currency={cur} canLinkRecipes={role === 'Restaurant Admin'} />}
              {tab === 'mix' && <MixTab restaurantId={restaurantId} start={start} end={end} currency={cur} />}
              {tab === 'simulator' && canManage && <SimulatorTab restaurantId={restaurantId} currency={cur} onOpenSettings={() => go('settings')} />}
              {tab === 'settings' && canManage && <SettingsTab restaurantId={restaurantId} currency={cur} timeZone={summary.restaurant.time_zone} onSaved={() => setReload(x => x + 1)} />}
            </div>
          </>
        )}
      </Content>
    </Container>
  );
};

export default StoreProfitabilityPage;
