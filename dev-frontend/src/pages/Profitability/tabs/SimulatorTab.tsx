/**
 * «매출이 바뀌면 어떻게 되나» — 손익 시뮬레이터 v1 (설계 §3-9 · §6-2)
 * 기준값은 최근 12주 실적(서버) · 계산은 브라우저(utils/profitSim — 저장 없음).
 * 1단계: 인건비는 여기서 직원 수 × 시간 × 시급으로 넣는다(출퇴근·시급 연결은 2단계) · 임대·로열티 등은 설정의 운영비 규칙.
 */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/UI/Button';
import { DataTableContainer, DataTable, DataTableHead, DataTableHeaderCell, DataTableRow, DataTableCell } from '../../../components/UI/DataTable';
import { getCurrencySymbol } from '../../../utils/currency';
import { storeApi, SimBaseline } from '../profitabilityApi';
import { simulate, breakEven, contributionRate, CostRule, SimInput } from '../../../utils/profitSim';
import { Card, CardTitle, Muted, Row, ErrorBox, Dot, EstimateTag, COLORS, money, pctText, Tone } from '../profitabilityUi';

interface Props { restaurantId: string; currency: string; onOpenSettings: () => void }

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 380px) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`;
const Knob = styled.label`
  display: grid;
  grid-template-columns: 1fr 104px;
  gap: 4px 10px;
  align-items: center;
  font-size: 13px;
  color: #374151;
  margin-bottom: 12px;
  & input[type='range'] { grid-column: 1 / -1; width: 100%; accent-color: ${COLORS.primary}; min-height: 28px; }
`;
const NumInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  text-align: right;
  font-variant-numeric: tabular-nums;
  min-height: 36px;
  box-sizing: border-box;
`;
const Big = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: ${COLORS.ink};
  font-variant-numeric: tabular-nums;
  margin: 4px 0;
`;
const Section = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${COLORS.muted};
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin: 14px 0 8px;
`;

interface KnobProps { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string }
const KnobField: React.FC<KnobProps> = ({ label, value, min, max, step, onChange, suffix }) => (
  <Knob>
    <span>{label}{suffix ? ` (${suffix})` : ''}</span>
    <NumInput type="number" inputMode="decimal" value={Number.isFinite(value) ? value : 0} min={min} step={step}
      onChange={e => onChange(Math.max(min, Number(e.target.value) || 0))} aria-label={label} />
    <input type="range" min={min} max={Math.max(max, value)} step={step} value={value} onChange={e => onChange(Number(e.target.value))} aria-label={label} />
  </Knob>
);

const r1 = (v: number) => Math.round(v * 10) / 10;
/** 빼는 비용 표시 — 0 이면 «−0.00» 이 아니라 0 */
const minus = (v: number) => (v > 0 ? -v : 0);
const r2 = (v: number) => Math.round(v * 100) / 100;

const SimulatorTab: React.FC<Props> = ({ restaurantId, currency, onOpenSettings }) => {
  const { t } = useTranslation('profitability');
  const [base, setBase] = useState<SimBaseline | null>(null);
  const [error, setError] = useState('');

  // 손잡이
  const [ticket, setTicket] = useState(0);
  const [perDay, setPerDay] = useState(0);
  const [openDays, setOpenDays] = useState(26);
  const [discount, setDiscount] = useState(0);
  const [rise, setRise] = useState(0);
  const [waste, setWaste] = useState(0);
  const [fee, setFee] = useState(0);
  const [baseFood, setBaseFood] = useState(35);
  const [shares, setShares] = useState<Record<string, number>>({});
  const [staff, setStaff] = useState(0);
  const [hours, setHours] = useState(208);
  const [rate, setRate] = useState(0);
  const [target, setTarget] = useState(5000);

  const reset = (b: SimBaseline) => {
    setTicket(r2(b.avg_ticket || 0));
    setPerDay(r1(b.orders_per_day || 0));
    setOpenDays(Math.min(31, Math.max(1, Math.round(b.open_days_per_month || 26))));
    setDiscount(r1(b.discount_pct || 0));
    setFee(r1(b.fee_pct || 0));
    setBaseFood(r1(b.food_cost_pct ?? b.targets.food_cost_pct));
    setRise(0); setWaste(0);
    const s: Record<string, number> = {};
    b.menus.forEach(m => { s[m.key] = r1(m.share_pct || 0); });
    setShares(s);
  };

  useEffect(() => {
    let live = true;
    storeApi<SimBaseline>(restaurantId, '/sim-baseline').then(r => {
      if (!live) return;
      if (!r.ok) { setError(r.message || t('errors.load', 'Could not load')); return; }
      setBase(r.data); reset(r.data);
    });
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  // 메뉴 판매비중 → 원가율(원가 모르는 메뉴·나머지는 기준 원가율로)
  const foodCost = useMemo(() => {
    if (!base) return baseFood;
    let used = 0; let sum = 0;
    base.menus.forEach(m => {
      const sh = Math.max(0, shares[m.key] ?? 0);
      used += sh;
      sum += sh * (m.food_cost_pct ?? baseFood);
    });
    const others = Math.max(0, 100 - used);
    return r1((sum + others * baseFood) / Math.max(100, used));
  }, [base, shares, baseFood]);

  const sales = r2(ticket * perDay * openDays);
  const labor = r2(staff * hours * rate);
  const rules: CostRule[] = (base?.cost_rules || []).map(c => ({ category: c.category, rule: c.rule, fixed_amount: c.fixed_amount, pct: c.pct }));
  const input: SimInput = { sales, discountPct: discount, foodCostPct: foodCost, ingredientRisePct: rise, wastePct: waste, feePct: fee, labor, rules };
  const c = contributionRate(input);
  const bep = breakEven(input);
  const goal = breakEven(input, target);
  const rentRule = (base?.cost_rules || []).find(r => r.category === 'rent' && r.rule === 'max');
  // 고정비가 하나도 없으면 손익분기 = 0 이 되어 «다 흑자» 처럼 보인다 — 숫자 대신 넣을 것을 보여 준다
  const noFixed = labor <= 0 && !rules.some(r => r.rule !== 'pct');

  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!base) return <Muted>{t('common.loading', 'Loading…')}</Muted>;

  const points = [30000, 40000, 50000, sales].filter((v, i, a) => v > 0 && a.indexOf(v) === i).sort((a, b) => a - b);
  const profitTone = (v: number): Tone => (v > 0 ? 'good' : v === 0 ? 'warn' : 'bad');
  const setSales = (v: number) => { if (ticket > 0 && openDays > 0) setPerDay(r1(v / ticket / openDays)); };

  return (
    <Layout>
      <Card>
        <Row style={{ justifyContent: 'space-between', marginBottom: 4 }}>
          <CardTitle style={{ margin: 0 }}>{t('sim.knobs', 'Assumptions')}</CardTitle>
          <Button variant="secondary" size="small" onClick={() => reset(base)}>↺ {t('sim.reset', 'Back to actuals')}</Button>
        </Row>
        <Muted>{t('sim.baseFrom', 'Filled from the last 12 weeks ({{start}} – {{end}}, {{n}} orders).', { start: base.window.start, end: base.window.end, n: base.orders })}</Muted>

        <Section>{t('sim.salesSection', 'Sales')}</Section>
        <KnobField label={t('sim.monthlySales', 'Monthly net sales')} suffix={getCurrencySymbol(currency)} value={sales} min={0} max={Math.max(100000, sales * 2)} step={500} onChange={setSales} />
        <KnobField label={t('sim.ticket', 'Average ticket')} suffix={getCurrencySymbol(currency)} value={ticket} min={0} max={Math.max(200, ticket * 2)} step={0.5} onChange={setTicket} />
        <KnobField label={t('sim.perDay', 'Orders per day')} value={perDay} min={0} max={Math.max(300, perDay * 2)} step={1} onChange={setPerDay} />
        <KnobField label={t('sim.openDays', 'Open days per month')} value={openDays} min={1} max={31} step={1} onChange={setOpenDays} />
        <KnobField label={t('sim.discount', 'Discount rate')} suffix="%" value={discount} min={0} max={50} step={0.5} onChange={setDiscount} />

        <Section>{t('sim.costSection', 'Food cost')}</Section>
        {base.menus.length > 0 && <Muted style={{ marginBottom: 8 }}>{t('sim.mixHint', 'Menu share of sales — moving them changes the food cost mix (menus without cost use the base rate).')}</Muted>}
        {base.menus.map(m => (
          <KnobField key={m.key} label={`${m.name} · ${m.food_cost_pct === null ? t('sim.noCost', 'no cost') : pctText(m.food_cost_pct)}`} suffix="%"
            value={shares[m.key] ?? 0} min={0} max={100} step={0.5} onChange={v => setShares(s => ({ ...s, [m.key]: v }))} />
        ))}
        <KnobField label={t('sim.baseFood', 'Base food cost (other menus)')} suffix="%" value={baseFood} min={0} max={100} step={0.5} onChange={setBaseFood} />
        <KnobField label={t('sim.rise', 'Ingredient price rise')} suffix="%" value={rise} min={-20} max={50} step={0.5} onChange={setRise} />
        <KnobField label={t('sim.waste', 'Average waste')} suffix="%" value={waste} min={0} max={30} step={0.5} onChange={setWaste} />
        <KnobField label={t('sim.fees', 'Payment & channel fees')} suffix="%" value={fee} min={0} max={40} step={0.1} onChange={setFee} />

        <Section>{t('sim.laborSection', 'Staff (monthly)')}</Section>
        <KnobField label={t('sim.staff', 'Staff')} value={staff} min={0} max={30} step={1} onChange={setStaff} />
        <KnobField label={t('sim.hours', 'Hours per person')} value={hours} min={0} max={320} step={4} onChange={setHours} />
        <KnobField label={t('sim.rate', 'Hourly cost')} suffix={getCurrencySymbol(currency)} value={rate} min={0} max={100} step={0.5} onChange={setRate} />
        <Muted>{t('sim.laborNote', 'Staff cost {{v}} / month. Linking attendance and pay rates comes in the next step.', { v: money(labor, currency) })}</Muted>

        <Section>{t('sim.rulesSection', 'Rent & other costs')}</Section>
        {rules.length === 0
          ? <Muted>{t('sim.noRules', 'No rent or cost rules yet — the result ignores them.')} <a href="#settings" onClick={e => { e.preventDefault(); onOpenSettings(); }} style={{ color: COLORS.primary, fontWeight: 600 }}>{t('readiness.linkRules', 'Add rules')}</a></Muted>
          : (base.cost_rules.map(r => (
            <Muted key={r.id}>{r.label || t(`cost.category.${r.category}`, r.category)} · {r.rule === 'fixed' ? money(r.fixed_amount, currency) : r.rule === 'pct' ? `${r.pct}%` : t('cost.maxOf', 'higher of {{a}} or {{p}}%', { a: money(r.fixed_amount, currency), p: r.pct })}</Muted>
          )))}
      </Card>

      <div>
        <Card>
          <CardTitle>{t('sim.bep', 'Break-even sales')}<EstimateTag>{t('tags.estimate', 'Estimate')}</EstimateTag></CardTitle>
          {noFixed ? (
            <Muted style={{ marginTop: 8 }}>{t('sim.needFixed', 'Enter staff cost (left) or add rent in Settings — break-even needs at least one fixed cost.')}</Muted>
          ) : (<>
          <Big>{bep.kind === 'ok' ? money(bep.sales, currency) : t('sim.impossible', 'Not reachable')}</Big>
          <Row gap={6}>
            <Dot tone={bep.kind === 'ok' ? (sales >= bep.sales ? 'good' : 'bad') : 'bad'} />
            <span style={{ fontSize: 13, color: '#374151' }}>
              {bep.kind === 'ok'
                ? (sales >= bep.sales
                  ? t('sim.above', 'Your {{s}} is {{d}} above break-even.', { s: money(sales, currency), d: money(sales - bep.sales, currency) })
                  : t('sim.below', 'Your {{s}} is {{d}} short of break-even.', { s: money(sales, currency), d: money(bep.sales - sales, currency) }))
                : t('sim.impossibleWhy', 'What is left per sale ({{c}}) does not cover the sales-based costs — no sales level breaks even.', { c: pctText(c * 100) })}
            </span>
          </Row>
          {bep.kind === 'ok' && ticket > 0 && openDays > 0 && (
            <Muted style={{ marginTop: 6 }}>{t('sim.ordersNeeded', 'About {{n}} orders a day at {{a}} per order.', { n: Math.ceil(bep.sales / ticket / openDays), a: money(ticket, currency) })}</Muted>
          )}
          {rentRule && bep.rentSwitch !== null && (
            <Muted style={{ marginTop: 6 }}>{t('sim.rentSwitch', 'Rent stays {{a}} up to {{s}} of sales, then {{p}}% of sales.', { a: money(rentRule.fixed_amount, currency), s: money(bep.rentSwitch, currency), p: rentRule.pct })}</Muted>
          )}
          </>)}
          <Muted style={{ marginTop: 6 }}>{t('sim.contributionRate', 'Left per sale after food cost, discount and fees: {{c}}', { c: pctText(c * 100) })}</Muted>
        </Card>

        <Card>
          <CardTitle>{t('sim.table', 'Expected monthly profit by sales')}</CardTitle>
          <DataTableContainer>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell align="left">{t('sim.colSales', 'Monthly sales')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('sim.colContribution', 'Contribution')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('sim.colLabor', 'Staff')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('sim.colRent', 'Rent')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('sim.colOther', 'Royalty & other')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="right">{t('sim.colProfit', 'Profit')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {points.map(p => {
                  const r = simulate(input, p);
                  return (
                    <DataTableRow key={p}>
                      <DataTableCell data-label={t('sim.colSales', 'Monthly sales')} mobileFullWidth>
                        <strong>{money(p, currency)}</strong>{p === sales && <EstimateTag>{t('sim.yours', 'your value')}</EstimateTag>}
                      </DataTableCell>
                      <DataTableCell data-label={t('sim.colContribution', 'Contribution')} align="right">{money(r.contribution, currency)}</DataTableCell>
                      <DataTableCell data-label={t('sim.colLabor', 'Staff')} align="right">{money(minus(r.labor), currency)}</DataTableCell>
                      <DataTableCell data-label={t('sim.colRent', 'Rent')} align="right">{money(minus(r.rent), currency)}</DataTableCell>
                      <DataTableCell data-label={t('sim.colOther', 'Royalty & other')} align="right">{money(minus(r.royalty + r.otherFixed), currency)}</DataTableCell>
                      <DataTableCell data-label={t('sim.colProfit', 'Profit')} align="right">
                        <Row gap={6} style={{ justifyContent: 'flex-end' }}><Dot tone={profitTone(r.operatingProfit)} /><strong>{money(r.operatingProfit, currency)}</strong></Row>
                      </DataTableCell>
                    </DataTableRow>
                  );
                })}
              </tbody>
            </DataTable>
          </DataTableContainer>
        </Card>

        <Card>
          <CardTitle>{t('sim.goal', 'Profit goal')}</CardTitle>
          <Knob style={{ maxWidth: 360 }}>
            <span>{t('sim.goalInput', 'Monthly profit amount I want')} ({getCurrencySymbol(currency)})</span>
            <NumInput type="number" inputMode="decimal" value={target} min={0} step={500} onChange={e => setTarget(Math.max(0, Number(e.target.value) || 0))} />
          </Knob>
          {goal.kind === 'ok'
            ? <Muted>{t('sim.goalNeed', 'Needs {{s}} a month — about {{n}} orders a day at {{a}}, or {{a2}} per order at today’s {{n2}} orders a day.', {
              s: money(goal.sales, currency),
              n: ticket > 0 ? Math.ceil(goal.sales / ticket / openDays) : '—',
              a: money(ticket, currency),
              a2: perDay > 0 ? money(goal.sales / perDay / openDays, currency) : '—',
              n2: perDay,
            })}</Muted>
            : <Muted>{t('sim.goalImpossible', 'Not reachable with these assumptions — lower costs or raise what is left per sale first.')}</Muted>}
        </Card>
      </div>
    </Layout>
  );
};

export default SimulatorTab;
