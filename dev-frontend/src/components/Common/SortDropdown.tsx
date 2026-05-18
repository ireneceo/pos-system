/**
 * SortDropdown — Unified sorting selector for menu / product list pages.
 *
 * Default order across the solution: newest first (createdAt desc).
 *
 * Usage:
 *   const [sortKey, setSortKey] = useState<SortKey>('newest');
 *   <SortDropdown value={sortKey} onChange={setSortKey} options={['newest','oldest','name_asc','price_asc']} />
 *   const sorted = sortItems(items, sortKey);
 */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown } from 'lucide-react';

export type SortKey =
  | 'newest'      // createdAt desc (default)
  | 'oldest'      // createdAt asc
  | 'name_asc'    // name A → Z
  | 'name_desc'   // name Z → A
  | 'price_asc'   // price low → high
  | 'price_desc'  // price high → low
  | 'category';   // by category then newest

interface Item {
  id: number | string;
  name?: string;
  price?: number | string | null;
  createdAt?: string;
  created_at?: string;
  category?: string | number | null;
  categoryId?: string | number | null;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 0 10px 0 12px;
  height: 40px;
  &:focus-within { border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  svg { width: 14px; height: 14px; color: #6B7C93; flex-shrink: 0; }
`;

const Select = styled.select`
  border: 0;
  background: transparent;
  font-size: 13px;
  color: #0A2540;
  font-weight: 500;
  padding: 0 4px 0 0;
  cursor: pointer;
  outline: 0;
  appearance: none;
  padding-right: 18px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%236B7C93' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0 center;
`;

interface Props {
  value: SortKey;
  onChange: (key: SortKey) => void;
  options?: SortKey[];  // limit choices (e.g. omit 'price' for non-priced lists)
}

const DEFAULT_OPTIONS: SortKey[] = ['newest', 'oldest', 'name_asc', 'name_desc', 'price_asc', 'price_desc', 'category'];

const SortDropdown: React.FC<Props> = ({ value, onChange, options = DEFAULT_OPTIONS }) => {
  const { t } = useTranslation('common');
  const labelFor: Record<SortKey, string> = {
    newest: t('sort.newest', 'Newest first'),
    oldest: t('sort.oldest', 'Oldest first'),
    name_asc: t('sort.nameAsc', 'Name A → Z'),
    name_desc: t('sort.nameDesc', 'Name Z → A'),
    price_asc: t('sort.priceAsc', 'Price low → high'),
    price_desc: t('sort.priceDesc', 'Price high → low'),
    category: t('sort.category', 'Group by category')
  };
  return (
    <Wrapper>
      <ArrowUpDown />
      <Select value={value} onChange={(e) => onChange(e.target.value as SortKey)} aria-label={t('sort.ariaLabel', 'Sort')}>
        {options.map(k => <option key={k} value={k}>{labelFor[k]}</option>)}
      </Select>
    </Wrapper>
  );
};

/**
 * Sort an array of items by the given key. Stable for items missing fields.
 */
export function sortItems<T extends Item>(items: T[], key: SortKey): T[] {
  const arr = [...items];
  const getCreatedAt = (x: T) => x.createdAt || x.created_at || '';
  const getPrice = (x: T) => Number(x.price || 0);
  const getName = (x: T) => String(x.name || '').toLowerCase();
  switch (key) {
    case 'newest':
      return arr.sort((a, b) => getCreatedAt(b).localeCompare(getCreatedAt(a)) || Number(b.id) - Number(a.id));
    case 'oldest':
      return arr.sort((a, b) => getCreatedAt(a).localeCompare(getCreatedAt(b)) || Number(a.id) - Number(b.id));
    case 'name_asc':
      return arr.sort((a, b) => getName(a).localeCompare(getName(b)));
    case 'name_desc':
      return arr.sort((a, b) => getName(b).localeCompare(getName(a)));
    case 'price_asc':
      return arr.sort((a, b) => getPrice(a) - getPrice(b) || Number(b.id) - Number(a.id));
    case 'price_desc':
      return arr.sort((a, b) => getPrice(b) - getPrice(a) || Number(b.id) - Number(a.id));
    case 'category': {
      const grp = (x: T) => String(x.categoryId || x.category || 'zz_uncategorized');
      return arr.sort((a, b) => grp(a).localeCompare(grp(b)) || (getCreatedAt(b).localeCompare(getCreatedAt(a))));
    }
    default:
      return arr;
  }
}

export default SortDropdown;
