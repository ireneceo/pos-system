import React from 'react';
import {
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  StatDescription,
  Button,
  Table,
  TableHeader,
  TableRow,
} from '../../UI';
import {
  BrandTag,
  InfoBox,
  SectionTitle,
  AlertInfo,
  AlertTitle,
  AlertDetail,
  ExpiryAlertCard,
  ExpiryBadge,
  QuickActions,
} from '../styles';
import { formatCurrency } from '../../../utils/currency';
import { formatDate as formatDateTz } from '../../../utils/timezone';
import { formatStock } from '../utils';
import {
  IngredientStock,
  Summary,
  ExpiringItem,
} from '../types';

/**
 * 재고 대시보드 — 2026-11-10 Fable 설계 .claude/fable-design-20261110-stock-simple-reorder.md §2-5:
 *   Low Stock·Out of Stock 카드 · Stock Alerts · Reorder Suggestions 표를 없앴다. 바로 위 «발주할 것» 띠가
 *   같은 일을 한 기준(발주 기준 숫자)으로 하는데, 이 셋은 다른 기준(옛 Status · 30일 Urgency)으로 또 셌다.
 */
interface Props {
  summary: Summary | null;
  inventory: IngredientStock[];
  expiringItems: ExpiringItem[];
  selectedCurrency: string;
  onWaste: (ingredient: IngredientStock) => void;
  onGoToList: () => void;
  onGoToHistory: () => void;
  onGoToIngredientsPage: () => void;
}

const DashboardSection: React.FC<Props> = ({
  summary,
  inventory,
  expiringItems,
  selectedCurrency,
  onWaste,
  onGoToList,
  onGoToHistory,
  onGoToIngredientsPage,
}) => (
  <>
    <StatsGrid>
      <StatCard color="#059669">
        <StatValue>{summary?.total_items || 0}</StatValue>
        <StatLabel>Total Ingredients</StatLabel>
        <StatDescription>managed items</StatDescription>
      </StatCard>
      <StatCard color="#7C3AED">
        <StatValue>{formatCurrency(summary?.monthly_loss || 0, selectedCurrency)}</StatValue>
        <StatLabel>Monthly Loss</StatLabel>
        <StatDescription>this month</StatDescription>
      </StatCard>
    </StatsGrid>

    {expiringItems.length > 0 && (
      <>
        <SectionTitle>Expiring Items</SectionTitle>
        <div>
          {expiringItems.slice(0, 5).map(item => (
            <ExpiryAlertCard key={item.id} urgency={item.urgency}>
              <AlertInfo>
                <AlertTitle>
                  {item.ingredient_name}
                  {item.batch_number && (
                    <span style={{ fontSize: '12px', color: '#4B5563', marginLeft: '8px' }}>
                      Batch: {item.batch_number}
                    </span>
                  )}
                </AlertTitle>
                <AlertDetail>
                  {item.remaining_quantity} {item.unit} remaining • Expires: {formatDateTz(item.expiry_date, null)}
                </AlertDetail>
              </AlertInfo>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ExpiryBadge urgency={item.urgency}>
                  {item.urgency === 'expired' ? 'EXPIRED' :
                   item.urgency === 'critical' ? `${item.days_until_expiry}d LEFT` :
                   item.urgency === 'warning' ? `${item.days_until_expiry} DAYS` :
                   `${item.days_until_expiry} days`}
                </ExpiryBadge>
                <Button
                  variant="danger"
                  onClick={() => {
                    const ing = inventory.find(i => i.id === item.ingredient_id);
                    if (ing) onWaste(ing);
                  }}
                  style={{ padding: '6px 12px', fontSize: '12px' }}
                >
                  Dispose
                </Button>
              </div>
            </ExpiryAlertCard>
          ))}
        </div>
      </>
    )}

    {/* 입고 예정 — 이미 발주해서 오고 있는 것. 재주문 제안 바로 위에 둔다:
        "더 시켜라"를 보기 전에 "이미 시킨 게 있다"를 먼저 보게 해야 중복 발주가 안 난다.
        수량은 목록 화면이 쓰는 on_order_quantity 를 그대로 쓴다 — 여기서 다시 계산하면
        어떤 발주 상태를 '오는 중'으로 볼지가 두 곳으로 갈라져 목록의 "↧ N incoming" 과
        대시보드 숫자가 어긋난다. 정의는 백엔드 한 곳(inventory-core 의 ACTIVE_PO_STATUSES)뿐이다. */}
    {(() => {
      const incoming = inventory
        .filter(i => Number(i.on_order_quantity) > 0)
        .sort((a, b) => {
          const da = a.on_order_delivery_date;
          const db = b.on_order_delivery_date;
          // 도착일 잡힌 것부터. 날짜 없는 발주는 뒤로 보내되 목록에서 빼지는 않는다
          if (da && db) return da < db ? -1 : da > db ? 1 : 0;
          if (da) return -1;
          if (db) return 1;
          return String(a.name).localeCompare(String(b.name));
        });
      if (incoming.length === 0) return null;
      return (
        <>
          <SectionTitle>Incoming Stock</SectionTitle>
          <InfoBox>
            Already ordered and on the way. Check here before reordering to avoid ordering twice.
          </InfoBox>
          <Table>
            <TableHeader columns="2fr 1fr 1fr">
              <span>Ingredient</span>
              <span>Incoming</span>
              <span>Expected</span>
            </TableHeader>
            {incoming.slice(0, 10).map(item => (
              <TableRow key={item.id} columns="2fr 1fr 1fr">
                <div>
                  {item.name}
                  {item.is_brand_shared && <BrandTag title="Stock item defined by your brand">Brand</BrandTag>}
                </div>
                <div style={{ fontWeight: 600 }}>
                  {formatStock(item.on_order_quantity)} {item.unit}
                </div>
                <div>
                  {item.on_order_delivery_date ? formatDateTz(item.on_order_delivery_date, null) : '—'}
                </div>
              </TableRow>
            ))}
          </Table>
        </>
      );
    })()}

    <QuickActions>
      <Button
        variant="primary"
        onClick={() => {
          if (inventory.length === 0) {
            onGoToIngredientsPage();
          } else {
            onGoToList();
          }
        }}
      >
        Receive Stock
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          if (inventory.length === 0) {
            onGoToIngredientsPage();
          } else {
            onGoToList();
          }
        }}
      >
        Record Waste
      </Button>
      <Button variant="secondary" onClick={onGoToHistory}>
        View All Transactions
      </Button>
    </QuickActions>
  </>
);

export default DashboardSection;
