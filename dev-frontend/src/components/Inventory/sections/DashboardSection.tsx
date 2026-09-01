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
  ActionButtons,
} from '../../UI';
import {
  BrandTag,
  InfoBox,
  SectionTitle,
  AlertCard,
  AlertInfo,
  AlertTitle,
  AlertDetail,
  ExpiryAlertCard,
  ExpiryBadge,
  UrgencyBadge,
  QuickActions,
  OrderInput,
  OrderButton,
} from '../styles';
import { formatCurrency } from '../../../utils/currency';
import { formatDate as formatDateTz } from '../../../utils/timezone';
import { formatStock } from '../utils';
import {
  IngredientStock,
  StockAlert,
  ReorderSuggestion,
  Summary,
  ExpiringItem,
  UnifiedStockItem,
} from '../types';

interface Props {
  summary: Summary | null;
  inventory: IngredientStock[];
  alerts: StockAlert[];
  suggestions: ReorderSuggestion[];
  expiringItems: ExpiringItem[];
  selectedCurrency: string;
  orderQuantities: { [key: string]: string };
  setOrderQuantities: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  onReceive: (ingredient: IngredientStock) => void;
  onWaste: (ingredient: IngredientStock) => void;
  onResolveAlert: (alertId: number) => void;
  onOrder: (item: UnifiedStockItem) => void;
  // 부족 알림에서 곧바로 발주 장바구니에 담기 위한 핸들러.
  // 담을 수 없는 상태(판매 재료 미연결)면 null 을 넘겨 버튼 대신 안내를 띄운다.
  onAddToPurchaseCart?: (ingredient: IngredientStock) => void;
  onGoToList: () => void;
  onGoToHistory: () => void;
  onGoToIngredientsPage: () => void;
}

const DashboardSection: React.FC<Props> = ({
  summary,
  inventory,
  alerts,
  suggestions,
  expiringItems,
  selectedCurrency,
  orderQuantities,
  setOrderQuantities,
  onReceive,
  onWaste,
  onResolveAlert,
  onOrder,
  onAddToPurchaseCart,
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
      <StatCard color="#D97706">
        <StatValue>{summary?.low_stock_count || 0}</StatValue>
        <StatLabel>Low Stock</StatLabel>
        <StatDescription>need attention</StatDescription>
      </StatCard>
      <StatCard color="#DC2626">
        <StatValue>{summary?.out_of_stock_count || 0}</StatValue>
        <StatLabel>Out of Stock</StatLabel>
        <StatDescription>urgent</StatDescription>
      </StatCard>
      <StatCard color="#7C3AED">
        <StatValue>{formatCurrency(summary?.monthly_loss || 0, selectedCurrency)}</StatValue>
        <StatLabel>Monthly Loss</StatLabel>
        <StatDescription>this month</StatDescription>
      </StatCard>
    </StatsGrid>

    {alerts.length > 0 && (
      <>
        <SectionTitle>Stock Alerts</SectionTitle>
        <div>
          {alerts.slice(0, 5).map(alert => (
            <AlertCard key={alert.id} type={alert.alert_type}>
              <AlertInfo>
                <AlertTitle>{alert.ingredient.name}</AlertTitle>
                <AlertDetail>
                  Current: {formatStock(alert.current_stock)} {alert.ingredient.unit} / Min: {formatStock(alert.min_stock)} {alert.ingredient.unit}
                </AlertDetail>
              </AlertInfo>
              <ActionButtons>
                {/* 부족한 걸 봤으면 그 자리에서 주문까지 되어야 한다 — 목록으로 되돌아가
                    같은 품목을 다시 찾게 만들지 않는다. 담기는 장바구니 방식(즉시 발주 아님)이라
                    여러 건을 모아 한 번에 보낼 수 있다. */}
                {onAddToPurchaseCart && (() => {
                  const ing = inventory.find(i => i.id === alert.ingredient_id);
                  const linkable = !!(ing as any)?.linked_ingredient_id;
                  return linkable ? (
                    <Button
                      variant="primary"
                      onClick={() => { if (ing) onAddToPurchaseCart(ing); }}
                      style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                      Add to Order
                    </Button>
                  ) : (
                    // 연결이 없으면 무엇을 얼마에 살지 정할 수 없다. 버튼을 비활성으로
                    // 남겨두면 왜 안 되는지 알 수 없으므로, 이유를 글로 보여준다.
                    <AlertDetail style={{ fontSize: '12px' }}>Link required</AlertDetail>
                  );
                })()}
                <Button
                  variant="primary"
                  onClick={() => {
                    const ing = inventory.find(i => i.id === alert.ingredient_id);
                    if (ing) onReceive(ing);
                  }}
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Receive
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => onResolveAlert(alert.id)}
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                >
                  Dismiss
                </Button>
              </ActionButtons>
            </AlertCard>
          ))}
        </div>
      </>
    )}

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

    {suggestions.length > 0 && (
      <>
        <SectionTitle>Reorder Suggestions</SectionTitle>
        <InfoBox>
          Calculated based on average daily usage over the last 30 days and supplier lead time.
        </InfoBox>
        <Table>
          <TableHeader columns="2fr 1fr 1fr 1fr 1fr 100px 150px">
            <span>Ingredient</span>
            <span>Current Stock</span>
            <span>Daily Usage</span>
            <span>Suggested Qty</span>
            <span className="col-cost">Est. Cost</span>
            <span>Urgency</span>
            <span>Order</span>
          </TableHeader>
          {suggestions.slice(0, 10).map(s => (
            <TableRow key={s.ingredient.id} columns="2fr 1fr 1fr 1fr 1fr 100px 150px">
              <div>
                {s.ingredient.name}
                {s.is_brand_shared && <BrandTag title="Stock item defined by your brand">Brand</BrandTag>}
              </div>
              <div>{formatStock(s.current_stock)} {s.ingredient.unit}</div>
              <div>{(parseFloat(String(s.avg_daily_usage)) || 0).toFixed(2)} {s.ingredient.unit}/day</div>
              <div style={{ fontWeight: 600 }}>{formatStock(s.suggested_qty)} {s.ingredient.unit}</div>
              <div className="col-cost">{formatCurrency(s.estimated_cost, selectedCurrency)}</div>
              <div>
                <UrgencyBadge level={s.urgency}>
                  {s.urgency.toUpperCase()}
                </UrgencyBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <OrderInput
                  type="number"
                  min="0"
                  step="1"
                  value={orderQuantities[s.ingredient.id] || s.suggested_qty}
                  onChange={(e) => setOrderQuantities(prev => ({
                    ...prev,
                    [s.ingredient.id]: e.target.value,
                  }))}
                  placeholder={String(s.suggested_qty)}
                />
                <OrderButton onClick={() => {
                  const ing = inventory.find(i => i.id === s.ingredient.id);
                  if (ing) {
                    onOrder({
                      id: ing.id,
                      name: ing.name,
                      code: ing.code,
                      image_url: ing.image_url,
                      category: ing.category,
                      current_stock: s.current_stock,
                      min_stock: s.min_stock,
                      min_order: ing.min_order || 0,
                      unit: ing.unit,
                      unit_cost: ing.unit_cost,
                      supplier_name: ing.supplier_name,
                      stock_status: ing.stock_status,
                      last_stock_take_at: ing.last_stock_take_at,
                      item_type: 'ingredient',
                      avg_daily_usage: s.avg_daily_usage,
                      prediction_confidence: ing.prediction_confidence,
                    });
                  }
                }}>
                  Order
                </OrderButton>
              </div>
            </TableRow>
          ))}
        </Table>
      </>
    )}

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
