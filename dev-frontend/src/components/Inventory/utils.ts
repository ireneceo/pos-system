import { StockStatus } from './types';
import { formatDate as formatDateTz } from '../../utils/timezone';

export const calculateStockStatus = (currentStock: number, minStock: number): StockStatus => {
  if (currentStock <= 0) return 'out_of_stock';
  if (currentStock <= minStock) return 'low_stock';
  return 'normal';
};

export const formatStock = (value: number | string | null | undefined): string => {
  const num = typeof value === 'string' ? parseFloat(value) : (value ?? 0);
  if (isNaN(num)) return '0.00';
  return num.toFixed(2);
};

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '-';
  return formatDateTz(dateString, null) || '-';
};

export const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'out_of_stock': return 'Out of Stock';
    case 'low_stock': return 'Low Stock';
    default: return 'Normal';
  }
};

export const getConfidenceLabel = (confidence: string): string => {
  switch (confidence) {
    case 'high': return 'High';
    case 'medium': return 'Medium';
    case 'low': return 'Low';
    default: return 'No Data';
  }
};

export const UNIT_OPTIONS = [
  { value: 'piece', label: 'Piece' },
  { value: 'box', label: 'Box' },
  { value: 'pack', label: 'Pack' },
  { value: 'roll', label: 'Roll' },
  { value: 'bag', label: 'Bag' },
  { value: 'set', label: 'Set' },
  { value: 'bundle', label: 'Bundle' },
  { value: 'case', label: 'Case' },
  { value: 'carton', label: 'Carton' },
  { value: 'pallet', label: 'Pallet' },
  { value: 'bottle', label: 'Bottle' },
  { value: 'can', label: 'Can' },
  { value: 'jar', label: 'Jar' },
  { value: 'tube', label: 'Tube' },
  { value: 'container', label: 'Container' },
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'g', label: 'Gram (g)' },
  { value: 'L', label: 'Liter (L)' },
  { value: 'ml', label: 'Milliliter (ml)' },
  { value: 'm', label: 'Meter (m)' },
  { value: 'cm', label: 'Centimeter (cm)' },
  { value: 'pair', label: 'Pair' },
  { value: 'dozen', label: 'Dozen' },
  { value: 'sheet', label: 'Sheet' },
  { value: 'ream', label: 'Ream' }
];

export const EMPTY_GENERAL_STOCK_FORM = {
  name: '',
  code: '',
  image_url: '',
  stock_unit: 'piece',
  unit_cost: '',
  category: '',
  current_stock: '',
  min_stock: '',
  min_order: '',
  supplier_id: ''
};

// 재료 분류(ingredients.category ENUM — 고정 종류 8개)를 화면 말로 (2026-11-18 실제 테스트 «한국어인데 other·produce·meat 영어»).
//   매장이 만든 분류 이름이 아니라 정해진 종류라 번역한다. 모르는 값은 그대로 보인다.
type TLike = (key: string, defaultValue?: string, opts?: Record<string, unknown>) => string;
const CATEGORY_DEFAULTS: Record<string, string> = {
  produce: 'Produce', meat: 'Meat', seafood: 'Seafood', dairy: 'Dairy',
  dry_goods: 'Dry Goods', spices: 'Spices', beverages: 'Beverages', other: 'Other',
};
export const categoryLabel = (category: string | null | undefined, t: TLike): string => {
  if (!category) return '';
  const def = CATEGORY_DEFAULTS[category];
  return def ? t(`inventory:category.${category}`, def) : category;
};

// 재고 기록 «메모» 칸 — 사람이 쓴 메모가 없을 때 서버가 넣는 고정 영어 문구만 화면 말로 바꾼다.
//   (routes/inventory-core.js 'Stock received' · 'Manual adjustment' · 발주 받기 'PO <번호> receive' 등)
//   사람이 쓴 메모·모르는 문구는 그대로 둔다.
export const historyNoteLabel = (notes: string | null | undefined, t: TLike): string => {
  if (!notes) return '-';
  const s = notes.trim();
  if (s === 'Stock received') return t('inventory:history.note.stockReceived', 'Stock received');
  if (s === 'Manual adjustment') return t('inventory:history.note.manualAdjustment', 'Manual adjustment');
  let m = s.match(/^PO (\S+) (receive|mark-received|auto-received|direct-purchase)$/);
  if (m) {
    const how: Record<string, string> = {
      'receive': 'Received', 'mark-received': 'Marked received', 'auto-received': 'Auto-received', 'direct-purchase': 'Direct purchase',
    };
    const key = m[2] === 'mark-received' ? 'markReceived' : m[2] === 'auto-received' ? 'autoReceived' : m[2] === 'direct-purchase' ? 'directPurchase' : 'received';
    return t(`inventory:history.note.po.${key}`, `PO {{po}} — ${how[m[2]]}`, { po: m[1] });
  }
  m = s.match(/^Return #(\d+) approved — buyer stock reversal$/);
  if (m) return t('inventory:history.note.returnApproved', 'Return #{{id}} approved — stock taken back out', { id: m[1] });
  m = s.match(/^Deducted via FIFO from (\d+) batch\(es\)$/);
  if (m) return t('inventory:history.note.fifo', 'Deducted from {{n}} batch(es), oldest first', { n: m[1] });
  return notes;
};
