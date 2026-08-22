import React, { useState, useEffect } from 'react';
import { EmptyState, Table, TableHeader, TableRow, MobileGrid, MobileLabel, MobileValue } from '../../UI';
import { getAuthToken } from '../../../utils/auth';
import { formatDateTime as formatDateTimeTz } from '../../../utils/timezone';
import { Transaction } from '../types';
import { formatStock } from '../utils';

interface Props {
  restaurantId?: number;
  isBrandGeneralMode: boolean;
}

const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'initial': return 'Initial Setup';
    case 'purchase': return 'Received';
    case 'order_deduct': return 'Order';
    case 'stock_take': return 'Stock Take';
    case 'waste': return 'Waste';
    case 'adjustment': return 'Adjustment';
    default: return type;
  }
};

const getTypeColor = (type: string): string => {
  switch (type) {
    case 'purchase':
    case 'initial':
      return '#059669';
    case 'order_deduct':
    case 'waste':
      return '#DC2626';
    case 'stock_take':
    case 'adjustment':
      return '#4B5563';
    default:
      return '#0A2540';
  }
};

const TransactionHistorySection: React.FC<Props> = ({ restaurantId, isBrandGeneralMode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = getAuthToken();
        // Brand mode: the Inventory tab lists ProductIngredient (brand stock item)
        // movements, so History must read the product-ingredient transaction log —
        // NOT /general-stock/transactions (that only covers general stock). Audit #23/#36.
        const endpoint = isBrandGeneralMode
          ? '/api/product-ingredients/transactions?limit=50'
          : `/api/restaurants/${restaurantId}/inventory/transactions?limit=50`;
        const res = await fetch(endpoint, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const response = await res.json();
        if (response.success) {
          setTransactions(response.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (restaurantId || isBrandGeneralMode) {
      fetchTransactions();
    }
  }, [restaurantId, isBrandGeneralMode]);

  if (loading) {
    return <EmptyState>Loading transactions...</EmptyState>;
  }

  if (transactions.length === 0) {
    return (
      <EmptyState>
        <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          No transactions recorded yet
        </div>
        <div style={{ fontSize: '14px' }}>
          Transactions will appear here when you receive or waste stock.
        </div>
      </EmptyState>
    );
  }

  return (
    <Table>
      <TableHeader columns="1.5fr 1.5fr 1fr 1fr 1fr 2fr">
        <span>Date</span>
        <span className="col-info">Ingredient</span>
        <span>Type</span>
        <span>Change</span>
        <span>After</span>
        <span className="col-info">Notes</span>
      </TableHeader>
      {transactions.map(t => (
        <TableRow key={t.id} columns="1.5fr 1.5fr 1fr 1fr 1fr 2fr">
          <MobileGrid>
            <MobileValue>
              <MobileLabel>Date</MobileLabel>
              <div style={{ fontSize: '14px', color: '#0A2540' }}>
                {formatDateTimeTz(t.created_at, null)}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Ingredient</MobileLabel>
              <div style={{ fontWeight: 600, color: '#0A2540' }}>
                {t.ingredient?.name || '-'}
              </div>
              {/* 출처 표시 — 브랜드 거래내역에는 브랜드 자신의 입고와 **산하 매장의 소비**가
                  한 표에 섞인다. 어디서 난 움직임인지 안 보이면 수량 부호를 오해한다. */}
              {(t as any).source_scope === 'restaurant' && (
                <div style={{ display: 'inline-block', marginTop: 3, fontSize: 10, padding: '1px 6px',
                  background: '#EEF2FF', color: '#3730A3', borderRadius: 999, fontWeight: 600 }}>
                  {(t as any).source_name || 'Store'}
                </div>
              )}
            </MobileValue>
            <MobileValue>
              <MobileLabel>Type</MobileLabel>
              <span style={{ color: getTypeColor(t.transaction_type), fontWeight: 600 }}>
                {getTypeLabel(t.transaction_type)}
              </span>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Change</MobileLabel>
              <div style={{
                color: parseFloat(String(t.quantity_change)) >= 0 ? '#059669' : '#DC2626',
                fontWeight: 600,
              }}>
                {parseFloat(String(t.quantity_change)) >= 0 ? '+' : ''}{formatStock(t.quantity_change)} {t.unit}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>After</MobileLabel>
              <div style={{ color: '#0A2540' }}>
                {formatStock(t.stock_after)} {t.unit}
              </div>
            </MobileValue>
            <MobileValue>
              <MobileLabel>Notes</MobileLabel>
              <div style={{ color: '#4B5563', fontSize: '13px' }}>
                {t.notes || '-'}
              </div>
            </MobileValue>
          </MobileGrid>
        </TableRow>
      ))}
    </Table>
  );
};

export default TransactionHistorySection;
