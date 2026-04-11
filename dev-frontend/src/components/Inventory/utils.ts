import { StockStatus } from './types';

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
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    return date.toLocaleDateString();
  } catch {
    return '-';
  }
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
