import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Container, Header, Title, Content, OrderControls } from '../../components/UI';
import { Tabs, Tab, Badge } from '../../components/Common/TabComponents';
import { useTabParam } from '../../hooks/useTabParam';
import { EmptyState } from '../../components/UI/TableComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI/Modal';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import ConfirmModal from '../../components/ConfirmModal';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: number;
  name: string;
  emoji: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  product_count?: number;
}

interface ProductPrice {
  id?: number;
  currency: string;
  price: number;
  is_active: boolean;
}

interface SetItem {
  productId: number;
  name: string;
  quantity: number;
  role_label: string;
}

interface AddonForm {
  productId: number;
  name: string;
  addon_label: string;
  max_quantity: number;
  is_inquiry_only: boolean;
}

interface AddonAPI {
  id: number;
  set_product_id: number;
  addon_product_id: number;
  addon_label: string;
  max_quantity: number;
  is_inquiry_only: boolean;
  sort_order: number;
  addonProduct?: {
    id: number;
    name: string;
    sku: string;
    emoji: string | null;
    image_url: string | null;
  };
}

interface SupportedCurrency {
  code: string;
  name: string;
  symbol: string;
}

interface ShippingSetting {
  country_code: string;
  shipping_fee: number;
  free_shipping_threshold: number;
  estimated_days: string;
}

interface Product {
  id: number;
  category_id: number | null;
  category?: Category;
  name: string;
  description: string | null;
  sku: string | null;
  image_url: string | null;
  emoji: string | null;
  is_active: boolean;
  is_set: boolean;
  set_items: SetItem[] | null;
  set_group: string | null;
  set_tier: string | null;
  set_use_case: string | null;
  set_setup_items: string[] | null;
  is_recommended: boolean;
  shipping_countries: string[] | null;
  shipping_settings: ShippingSetting[] | null;
  prices: ProductPrice[];
  addons: Addon[] | null;
  sort_order: number;
}

type TabType = 'products' | 'categories';

const COUNTRIES = [
  { code: 'MY', name: 'Malaysia', currency: 'MYR' },
  { code: 'SG', name: 'Singapore', currency: 'SGD' },
  { code: 'KR', name: 'South Korea', currency: 'KRW' },
  { code: 'JP', name: 'Japan', currency: 'JPY' },
  { code: 'TH', name: 'Thailand', currency: 'THB' },
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'AU', name: 'Australia', currency: 'AUD' },
];

// ─── Styled Components ───────────────────────────────────────────────────────

// -- Products Tab --
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const ProductCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid #E6EBF1;
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
    border-color: #635BFF;
  }
`;

const ProductHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const ProductImage = styled.div<{ src?: string | null }>`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${props => props.src ? `url(${props.src}) center/cover` : '#F3F4F6'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductSku = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-bottom: 4px;
`;

const ProductCategory = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
`;

const ProductDetails = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #6B7280;
`;

const PriceValue = styled.span`
  color: #059669;
  font-weight: 600;
  font-size: 16px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #E6EBF1;
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.variant === 'danger' ? '#FEE2E2' : '#E6EBF1'};
  background: ${props => props.variant === 'danger' ? '#FEF2F2' : '#F9FAFB'};
  color: ${props => props.variant === 'danger' ? '#DC2626' : '#374151'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.variant === 'danger' ? '#FEE2E2' : '#F3F4F6'};
    border-color: ${props => props.variant === 'danger' ? '#FECACA' : '#D1D5DB'};
  }
`;

const CopyButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F9FAFB;
  color: #374151;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #F3F4F6; border-color: #D1D5DB; }
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid ${props => props.isActive ? '#D1FAE5' : '#FEE2E2'};
  background: ${props => props.isActive ? '#ECFDF5' : '#FEF2F2'};
  color: ${props => props.isActive ? '#059669' : '#DC2626'};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${props => props.isActive ? '#D1FAE5' : '#FEE2E2'};
  }
`;

const SetBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #667eea;
  color: white;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`;

const SetItemsSummary = styled.div`
  font-size: 11px;
  color: #667eea;
  margin-top: 4px;
  line-height: 1.4;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #374151;
  cursor: pointer;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    border-color: #635BFF;
  }

  input:checked + span {
    color: #635BFF;
    font-weight: 500;
  }
`;

const EmptyTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin: 0 0 20px 0;
`;

// -- Categories Tab --
const CategoryContainer = styled.div`
  margin-top: 24px;
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const CategoryCard = styled.div<{ isActive?: boolean }>`
  background: white;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  opacity: ${props => props.isActive !== false ? 1 : 0.6};

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const CategoryIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 4px;
`;

const CategoryMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #6B7280;
`;

const CategoryDescription = styled.div`
  font-size: 13px;
  color: #6B7280;
  margin-top: 4px;
`;

const CategoryActions = styled.div`
  display: flex;
  gap: 8px;
`;

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #E6EBF1;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
    transform: translateY(-1px);

    svg {
      color: #635BFF;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
    color: #6B7280;
    transition: color 0.15s;
  }
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => props.active ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.active ? '#059669' : '#DC2626'};
`;

const EmojiPicker = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  background: #F9FAFB;
  border-radius: 8px;
`;

const EmojiOption = styled.button<{ selected?: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background: ${props => props.selected ? '#E5E7EB' : 'white'};
  border: 1px solid ${props => props.selected ? '#9CA3AF' : '#E5E7EB'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.selected ? '#E5E7EB' : '#F3F4F6'};
  }
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 20px 0 12px 0;
  padding-top: 16px;
  border-top: 1px solid #E6EBF1;
`;

const RecommendedBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: #FEF3C7;
  color: #D97706;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 6px;
`;

// ─── Main Page Component ─────────────────────────────────────────────────────

const SystemProductManagementPage: React.FC = () => {
  const [activeTab, handleTabChange] = useTabParam<TabType>('products');
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);

  return (
    <Container>
      <Header>
        <Title>System Product Management</Title>
      </Header>

      <Content>
        <Tabs>
          <Tab active={activeTab === 'products'} onClick={() => handleTabChange('products')}>
            Products
            <Badge count={productsCount} showZero />
          </Tab>
          <Tab active={activeTab === 'categories'} onClick={() => handleTabChange('categories')}>
            Categories
            <Badge count={categoriesCount} showZero />
          </Tab>
        </Tabs>

        <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
          <ProductsTab
            onCountChange={setProductsCount}
            categoryRefreshKey={categoryRefreshKey}
          />
        </div>
        <div style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
          <CategoriesTab
            onCountChange={setCategoriesCount}
            onCategoryChange={() => setCategoryRefreshKey(k => k + 1)}
          />
        </div>
      </Content>
    </Container>
  );
};

// ─── Products Tab ─────────────────────────────────────────────────────────────

interface ProductsTabProps {
  onCountChange: (count: number) => void;
  categoryRefreshKey: number;
}

interface ProductFormData {
  name: string;
  description: string;
  sku: string;
  category_id: string;
  image_url: string;
  emoji: string;
  is_active: boolean;
  is_set: boolean;
  set_group: string;
  set_tier: string;
  set_use_case: string;
  set_setup_items: string;
  is_recommended: boolean;
  set_items: SetItem[];
  addons: Addon[];
  prices: Record<string, { price: string; is_active: boolean }>;
  shipping_countries: string[];
  shipping_settings: Record<string, { shipping_fee: string; free_shipping_threshold: string; estimated_days: string }>;
}

const getDefaultFormData = (): ProductFormData => ({
  name: '',
  description: '',
  sku: '',
  category_id: '',
  image_url: '',
  emoji: '',
  is_active: true,
  is_set: false,
  set_group: '',
  set_tier: '',
  set_use_case: '',
  set_setup_items: '',
  is_recommended: false,
  set_items: [],
  addons: [],
  prices: {},
  shipping_countries: [],
  shipping_settings: {},
});

const ProductsTab: React.FC<ProductsTabProps> = ({ onCountChange, categoryRefreshKey }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [supportedCurrencies, setSupportedCurrencies] = useState<SupportedCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(getDefaultFormData());
  const [setItemSearchQuery, setSetItemSearchQuery] = useState('');
  const [addonSearchQuery, setAddonSearchQuery] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  const fetchProducts = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/system-products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
        onCountChange(data.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch system products:', error);
    }
  }, [getToken, onCountChange]);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/system-product-categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, [getToken]);

  const fetchCurrencies = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/currencies/supported', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSupportedCurrencies(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch currencies:', error);
    }
  }, [getToken]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchCurrencies()]);
      setLoading(false);
    };
    loadData();
  }, [fetchProducts, fetchCategories, fetchCurrencies]);

  useEffect(() => {
    if (categoryRefreshKey > 0) {
      fetchCategories();
    }
  }, [categoryRefreshKey, fetchCategories]);

  const getDisplayPrice = (product: Product): string => {
    if (!product.prices || product.prices.length === 0) return 'N/A';
    const activePrice = product.prices.find(p => p.is_active);
    if (activePrice) return `${activePrice.currency} ${Number(activePrice.price).toFixed(2)}`;
    const firstPrice = product.prices[0];
    return `${firstPrice.currency} ${Number(firstPrice.price).toFixed(2)}`;
  };

  const buildPricesMap = (prices: ProductPrice[]): Record<string, { price: string; is_active: boolean }> => {
    const map: Record<string, { price: string; is_active: boolean }> = {};
    prices.forEach(p => {
      map[p.currency] = { price: p.price.toString(), is_active: p.is_active };
    });
    return map;
  };

  const buildShippingMap = (settings: any): Record<string, { shipping_fee: string; free_shipping_threshold: string; estimated_days: string }> => {
    const map: Record<string, { shipping_fee: string; free_shipping_threshold: string; estimated_days: string }> = {};
    if (!settings) return map;
    // Handle array format: [{country_code, shipping_fee, ...}]
    if (Array.isArray(settings)) {
      settings.forEach((s: any) => {
        map[s.country_code] = {
          shipping_fee: (s.shipping_fee || 0).toString(),
          free_shipping_threshold: (s.free_shipping_threshold || 0).toString(),
          estimated_days: s.estimated_days || '',
        };
      });
    } else if (typeof settings === 'object') {
      // Handle object format: {"MY": {delivery_fee, free_delivery_threshold, estimated_days}}
      Object.entries(settings).forEach(([cc, val]: [string, any]) => {
        map[cc] = {
          shipping_fee: (val.delivery_fee || val.shipping_fee || 0).toString(),
          free_shipping_threshold: (val.free_delivery_threshold || val.free_shipping_threshold || 0).toString(),
          estimated_days: val.estimated_days || '',
        };
      });
    }
    return map;
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description || '',
        sku: product.sku || '',
        category_id: product.category_id?.toString() || '',
        image_url: product.image_url || '',
        emoji: product.emoji || '',
        is_active: product.is_active,
        is_set: product.is_set || false,
        set_group: product.set_group || '',
        set_tier: product.set_tier || '',
        set_use_case: product.set_use_case || '',
        set_setup_items: (product.set_setup_items || []).join('\n'),
        is_recommended: product.is_recommended || false,
        set_items: product.set_items || [],
        addons: (product.addons || []).map((a: any) => ({
          productId: a.addon_product_id || a.productId,
          name: a.addonProduct?.name || a.name || '',
          addon_label: a.addon_label || '',
          max_quantity: a.max_quantity || 0,
          is_inquiry_only: a.is_inquiry_only || false,
        })),
        prices: buildPricesMap(product.prices || []),
        shipping_countries: product.shipping_countries || [],
        shipping_settings: buildShippingMap(product.shipping_settings),
      });
    } else {
      setEditingProduct(null);
      const defaultForm = getDefaultFormData();
      if (categories.length > 0) {
        defaultForm.category_id = categories[0].id.toString();
      }
      setFormData(defaultForm);
    }
    setSetItemSearchQuery('');
    setAddonSearchQuery('');
    setFormError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Product name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getToken();
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct
        ? `/api/system-products/${editingProduct.id}`
        : '/api/system-products';

      // Build prices array
      const pricesArray: { currency: string; price: number; is_active: boolean }[] = [];
      Object.entries(formData.prices).forEach(([currency, val]) => {
        const price = parseFloat(val.price);
        if (!isNaN(price) && price >= 0) {
          pricesArray.push({ currency, price, is_active: val.is_active });
        }
      });

      // Build shipping settings array
      const shippingSettingsArray: ShippingSetting[] = [];
      formData.shipping_countries.forEach(cc => {
        const s = formData.shipping_settings[cc];
        shippingSettingsArray.push({
          country_code: cc,
          shipping_fee: parseFloat(s?.shipping_fee || '0') || 0,
          free_shipping_threshold: parseFloat(s?.free_shipping_threshold || '0') || 0,
          estimated_days: s?.estimated_days || '',
        });
      });

      // Build setup items
      const setupItems = formData.set_setup_items
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          sku: formData.sku.trim() || null,
          category_id: formData.category_id ? parseInt(formData.category_id) : null,
          image_url: formData.image_url || null,
          emoji: formData.emoji || null,
          is_active: formData.is_active,
          is_set: formData.is_set,
          set_group: formData.is_set ? (formData.set_group || null) : null,
          set_tier: formData.is_set ? (formData.set_tier || null) : null,
          set_use_case: formData.is_set ? (formData.set_use_case.trim() || null) : null,
          set_setup_items: formData.is_set ? (setupItems.length > 0 ? setupItems : null) : null,
          is_recommended: formData.is_set ? formData.is_recommended : false,
          set_items: formData.is_set ? formData.set_items : null,
          addons: formData.is_set ? formData.addons.map(a => ({
            addon_product_id: a.productId,
            addon_label: a.addon_label,
            max_quantity: a.max_quantity,
            is_inquiry_only: a.is_inquiry_only,
          })) : null,
          prices: pricesArray,
          shipping_countries: formData.shipping_countries.length > 0 ? formData.shipping_countries : null,
          shipping_settings: shippingSettingsArray.length > 0 ? shippingSettingsArray : null,
        })
      });

      const data = await response.json();
      if (data.success) {
        handleCloseModal();
        fetchProducts();
      } else {
        setFormError(data.message || data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      setFormError('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyProduct = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getToken();
      const response = await fetch(`/api/system-products/${product.id}/copy`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
      } else {
        alert(data.message || data.error || 'Failed to copy product');
      }
    } catch (error) {
      console.error('Failed to copy product:', error);
    }
  };

  const handleToggleActive = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const token = getToken();
      const response = await fetch(`/api/system-products/${product.id}/toggle-active`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Failed to toggle product:', error);
    }
  };

  const handleDeleteClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      const token = getToken();
      const response = await fetch(`/api/system-products/${productToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setProductToDelete(null);
        fetchProducts();
      } else {
        alert(data.message || data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  // Set item helpers
  const handleAddSetItem = (productId: number) => {
    const p = products.find(pr => pr.id === productId);
    if (!p || p.is_set) return;

    const existing = formData.set_items.find(item => item.productId === productId);
    if (existing) {
      setFormData(prev => ({
        ...prev,
        set_items: prev.set_items.map(item =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        set_items: [...prev.set_items, { productId, name: p.name, quantity: 1, role_label: '' }]
      }));
    }
  };

  const handleRemoveSetItem = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      set_items: prev.set_items.filter(item => item.productId !== productId)
    }));
  };

  const handleUpdateSetItemQuantity = (productId: number, delta: number) => {
    setFormData(prev => ({
      ...prev,
      set_items: prev.set_items.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    }));
  };

  const handleUpdateSetItemLabel = (productId: number, role_label: string) => {
    setFormData(prev => ({
      ...prev,
      set_items: prev.set_items.map(item =>
        item.productId === productId ? { ...item, role_label } : item
      )
    }));
  };

  // Addon helpers
  const handleAddAddon = (productId: number) => {
    const p = products.find(pr => pr.id === productId);
    if (!p) return;

    const existing = formData.addons.find(a => a.productId === productId);
    if (existing) return;

    setFormData(prev => ({
      ...prev,
      addons: [...prev.addons, { productId, name: p.name, addon_label: '', max_quantity: 1, is_inquiry_only: false }]
    }));
  };

  const handleRemoveAddon = (productId: number) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.filter(a => a.productId !== productId)
    }));
  };

  const handleUpdateAddon = (productId: number, field: keyof Addon, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      addons: prev.addons.map(a =>
        a.productId === productId ? { ...a, [field]: value } : a
      )
    }));
  };

  // Price helpers
  const handlePriceChange = (currency: string, field: 'price' | 'is_active', value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [currency]: {
          ...(prev.prices[currency] || { price: '', is_active: true }),
          [field]: value,
        }
      }
    }));
  };

  // Shipping helpers
  const handleShippingCountryToggle = (countryCode: string) => {
    setFormData(prev => {
      const countries = prev.shipping_countries.includes(countryCode)
        ? prev.shipping_countries.filter(c => c !== countryCode)
        : [...prev.shipping_countries, countryCode];
      return { ...prev, shipping_countries: countries };
    });
  };

  const handleShippingSettingChange = (countryCode: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      shipping_settings: {
        ...prev.shipping_settings,
        [countryCode]: {
          ...(prev.shipping_settings[countryCode] || { shipping_fee: '0', free_shipping_threshold: '0', estimated_days: '' }),
          [field]: value,
        }
      }
    }));
  };

  // Filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || product.category_id?.toString() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
        Loading products...
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </FilterSelect>
        </FilterBar>
        <ThemedButton onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          Add Product
        </ThemedButton>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState>
          <EmptyTitle>
            {searchTerm || categoryFilter !== 'all' ? 'No products found' : 'No products yet'}
          </EmptyTitle>
          <EmptyDescription>
            {searchTerm || categoryFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Start by adding your first system product.'}
          </EmptyDescription>
          {!searchTerm && categoryFilter === 'all' && (
            <ThemedButton onClick={() => handleOpenModal()}>Add Product</ThemedButton>
          )}
        </EmptyState>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              isActive={product.is_active}
              onClick={() => handleOpenModal(product)}
            >
              <ProductHeader>
                <ProductImage src={product.image_url}>
                  {!product.image_url && (product.emoji || '\uD83D\uDCE6')}
                </ProductImage>
                <ProductInfo>
                  <ProductName>
                    {product.name}
                    {product.is_set && <SetBadge>SET</SetBadge>}
                    {product.is_recommended && <RecommendedBadge>Recommended</RecommendedBadge>}
                  </ProductName>
                  {product.sku && <ProductSku>SKU: {product.sku}</ProductSku>}
                  {product.category && (
                    <ProductCategory>
                      {product.category.emoji} {product.category.name}
                    </ProductCategory>
                  )}
                  {product.is_set && product.set_items && product.set_items.length > 0 && (
                    <SetItemsSummary>
                      Set: {product.set_items.map(si => `${si.name} x${si.quantity}`).join(', ')}
                    </SetItemsSummary>
                  )}
                </ProductInfo>
              </ProductHeader>

              <ProductDetails>
                <DetailRow>
                  <DetailLabel>Price</DetailLabel>
                  <PriceValue>{getDisplayPrice(product)}</PriceValue>
                </DetailRow>
                {product.is_set && product.set_group && (
                  <DetailRow>
                    <DetailLabel>Group</DetailLabel>
                    <span style={{ color: '#0A2540', fontWeight: 500 }}>{product.set_group}</span>
                  </DetailRow>
                )}
                {product.is_set && product.set_tier && (
                  <DetailRow>
                    <DetailLabel>Tier</DetailLabel>
                    <span style={{ color: '#0A2540', fontWeight: 500 }}>{product.set_tier}</span>
                  </DetailRow>
                )}
                {product.shipping_countries && product.shipping_countries.length > 0 && (
                  <DetailRow>
                    <DetailLabel>Ships to</DetailLabel>
                    <span style={{ color: '#0A2540', fontWeight: 500 }}>
                      {product.shipping_countries.map(cc => {
                        const c = COUNTRIES.find(co => co.code === cc);
                        return c ? c.code : cc;
                      }).join(', ')}
                    </span>
                  </DetailRow>
                )}
              </ProductDetails>

              <ProductActions onClick={(e) => e.stopPropagation()}>
                <ActionButton onClick={() => handleOpenModal(product)}>
                  Edit
                </ActionButton>
                <CopyButton onClick={(e) => handleCopyProduct(product, e)}>
                  Copy
                </CopyButton>
                <ToggleButton isActive={product.is_active} onClick={(e) => handleToggleActive(product, e)}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </ToggleButton>
                <ActionButton variant="danger" onClick={(e) => handleDeleteClick(product, e)}>
                  Delete
                </ActionButton>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingProduct ? 'Edit System Product' : 'Add System Product'}
          maxWidth="750px"
        >
          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <UIFormGroup>
                <FormLabel>Name *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Product name"
                  required
                />
              </UIFormGroup>
              <UIFormGroup>
                <FormLabel>SKU</FormLabel>
                <FormInput
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Auto-generated if empty"
                />
              </UIFormGroup>
            </div>

            <UIFormGroup>
              <FormLabel>Category</FormLabel>
              <FormSelect
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">No category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={2}
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Product Image</FormLabel>
              <ImageUploadDropzone
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url || '' })}
                label=""
                helpText="Upload a product image (max 2MB)"
              />
            </UIFormGroup>

            {/* Prices */}
            <SectionTitle>Pricing</SectionTitle>
            {supportedCurrencies.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {supportedCurrencies.map(cur => {
                  const priceData = formData.prices[cur.code] || { price: '', is_active: true };
                  return (
                    <div key={cur.code} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px', color: '#0A2540' }}>
                          {cur.code} ({cur.symbol})
                        </span>
                        <CheckboxLabel>
                          <input
                            type="checkbox"
                            checked={priceData.is_active}
                            onChange={(e) => handlePriceChange(cur.code, 'is_active', e.target.checked)}
                          />
                          Active
                        </CheckboxLabel>
                      </div>
                      <FormInput
                        type="number"
                        step="0.01"
                        min="0"
                        value={priceData.price}
                        onChange={(e) => handlePriceChange(cur.code, 'price', e.target.value)}
                        placeholder="0.00"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', color: '#6B7280', fontSize: '13px' }}>
                No supported currencies found. Configure currencies first.
              </div>
            )}

            {/* Set Product */}
            <SectionTitle>Set Configuration</SectionTitle>
            <UIFormGroup>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.is_set}
                  onChange={(e) => setFormData({
                    ...formData,
                    is_set: e.target.checked,
                    set_items: e.target.checked ? formData.set_items : [],
                    addons: e.target.checked ? formData.addons : [],
                  })}
                />
                Set Product (bundle multiple products)
              </CheckboxLabel>
            </UIFormGroup>

            {formData.is_set && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <UIFormGroup>
                    <FormLabel>Set Group</FormLabel>
                    <FormSelect
                      value={formData.set_group}
                      onChange={(e) => setFormData({ ...formData, set_group: e.target.value })}
                    >
                      <option value="">Select group</option>
                      <option value="tablet">Tablet</option>
                      <option value="monitor">Monitor</option>
                      <option value="custom">Custom</option>
                    </FormSelect>
                  </UIFormGroup>
                  <UIFormGroup>
                    <FormLabel>Set Tier</FormLabel>
                    <FormSelect
                      value={formData.set_tier}
                      onChange={(e) => setFormData({ ...formData, set_tier: e.target.value })}
                    >
                      <option value="">Select tier</option>
                      <option value="standard">Standard</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="premium">Premium</option>
                      <option value="custom">Custom</option>
                    </FormSelect>
                  </UIFormGroup>
                </div>

                <UIFormGroup>
                  <FormLabel>Use Case</FormLabel>
                  <FormInput
                    type="text"
                    value={formData.set_use_case}
                    onChange={(e) => setFormData({ ...formData, set_use_case: e.target.value })}
                    placeholder="e.g., Small cafe, Food truck, Full restaurant"
                  />
                </UIFormGroup>

                <UIFormGroup>
                  <CheckboxLabel>
                    <input
                      type="checkbox"
                      checked={formData.is_recommended}
                      onChange={(e) => setFormData({ ...formData, is_recommended: e.target.checked })}
                    />
                    Recommended Set
                  </CheckboxLabel>
                </UIFormGroup>

                <UIFormGroup>
                  <FormLabel>Setup Items (one per line)</FormLabel>
                  <FormTextArea
                    value={formData.set_setup_items}
                    onChange={(e) => setFormData({ ...formData, set_setup_items: e.target.value })}
                    placeholder={"POS app installation\nMenu setup\nStaff training"}
                    rows={3}
                  />
                </UIFormGroup>

                {/* Set Items */}
                <UIFormGroup>
                  <FormLabel>Set Items</FormLabel>
                  {formData.set_items.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      {formData.set_items.map(item => (
                        <div key={item.productId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#F9FAFB', borderRadius: '6px', marginBottom: '4px' }}>
                          <span style={{ flex: 1, fontSize: '14px' }}>{item.name}</span>
                          <input
                            type="text"
                            placeholder="Role label"
                            value={item.role_label}
                            onChange={(e) => handleUpdateSetItemLabel(item.productId, e.target.value)}
                            style={{ width: '120px', padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                          />
                          <button type="button" onClick={() => handleUpdateSetItemQuantity(item.productId, -1)} style={{ width: '28px', height: '28px', border: '1px solid #D1D5DB', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>-</button>
                          <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                          <button type="button" onClick={() => handleUpdateSetItemQuantity(item.productId, 1)} style={{ width: '28px', height: '28px', border: '1px solid #D1D5DB', borderRadius: '4px', background: 'white', cursor: 'pointer' }}>+</button>
                          <button type="button" onClick={() => handleRemoveSetItem(item.productId)} style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>x</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormInput
                    type="text"
                    placeholder="Search products to add..."
                    value={setItemSearchQuery}
                    onChange={(e) => setSetItemSearchQuery(e.target.value)}
                    style={{ marginBottom: '8px' }}
                  />
                  <div style={{ maxHeight: '200px', overflowY: 'auto', background: '#F9FAFB', borderRadius: '8px', padding: '8px' }}>
                    {products
                      .filter(p => !p.is_set && (editingProduct ? p.id !== editingProduct.id : true))
                      .filter(p => !setItemSearchQuery || p.name.toLowerCase().includes(setItemSearchQuery.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(setItemSearchQuery.toLowerCase())))
                      .map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleAddSetItem(p.id)}
                          style={{
                            padding: '8px 12px', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px',
                            background: formData.set_items.some(si => si.productId === p.id) ? '#EEF2FF' : 'white',
                            border: '1px solid #E5E7EB', fontSize: '13px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}
                        >
                          <span>{p.emoji || '\uD83D\uDCE6'} {p.sku ? `${p.sku} ` : ''}{p.name}</span>
                          <span style={{ color: '#6B7280' }}>{getDisplayPrice(p)}</span>
                        </div>
                      ))
                    }
                  </div>
                </UIFormGroup>

                {/* Addons */}
                <UIFormGroup>
                  <FormLabel>Addons</FormLabel>
                  {formData.addons.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      {formData.addons.map(addon => (
                        <div key={addon.productId} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: '#F9FAFB', borderRadius: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
                          <span style={{ flex: 1, fontSize: '14px', minWidth: '120px' }}>{addon.name}</span>
                          <input
                            type="text"
                            placeholder="Addon label"
                            value={addon.addon_label}
                            onChange={(e) => handleUpdateAddon(addon.productId, 'addon_label', e.target.value)}
                            style={{ width: '120px', padding: '4px 8px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                          />
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>Max:</span>
                            <input
                              type="number"
                              min="1"
                              value={addon.max_quantity}
                              onChange={(e) => handleUpdateAddon(addon.productId, 'max_quantity', parseInt(e.target.value) || 1)}
                              style={{ width: '50px', padding: '4px 6px', border: '1px solid #D1D5DB', borderRadius: '4px', fontSize: '12px' }}
                            />
                          </div>
                          <CheckboxLabel style={{ fontSize: '12px' }}>
                            <input
                              type="checkbox"
                              checked={addon.is_inquiry_only}
                              onChange={(e) => handleUpdateAddon(addon.productId, 'is_inquiry_only', e.target.checked)}
                            />
                            Inquiry only
                          </CheckboxLabel>
                          <button type="button" onClick={() => handleRemoveAddon(addon.productId)} style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>x</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FormInput
                    type="text"
                    placeholder="Search products to add as addon..."
                    value={addonSearchQuery}
                    onChange={(e) => setAddonSearchQuery(e.target.value)}
                    style={{ marginBottom: '8px' }}
                  />
                  <div style={{ maxHeight: '200px', overflowY: 'auto', background: '#F9FAFB', borderRadius: '8px', padding: '8px' }}>
                    {products
                      .filter(p => !p.is_set && (editingProduct ? p.id !== editingProduct.id : true))
                      .filter(p => !addonSearchQuery || p.name.toLowerCase().includes(addonSearchQuery.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(addonSearchQuery.toLowerCase())))
                      .filter(p => !formData.addons.some(a => a.productId === p.id))
                      .map(p => (
                        <div
                          key={p.id}
                          onClick={() => handleAddAddon(p.id)}
                          style={{
                            padding: '8px 12px', cursor: 'pointer', borderRadius: '6px', marginBottom: '2px',
                            background: 'white', border: '1px solid #E5E7EB', fontSize: '13px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                          }}
                        >
                          <span>{p.emoji || '\uD83D\uDCE6'} {p.sku ? `${p.sku} ` : ''}{p.name}</span>
                          <span style={{ color: '#6B7280' }}>{getDisplayPrice(p)}</span>
                        </div>
                      ))
                    }
                  </div>
                </UIFormGroup>
              </>
            )}

            {/* Shipping */}
            <SectionTitle>Shipping</SectionTitle>
            <UIFormGroup>
              <FormLabel>Available Countries</FormLabel>
              <CheckboxGroup>
                {COUNTRIES.map(country => (
                  <CheckboxItem key={country.code}>
                    <input
                      type="checkbox"
                      checked={formData.shipping_countries.includes(country.code)}
                      onChange={() => handleShippingCountryToggle(country.code)}
                    />
                    <span>{country.name} ({country.currency})</span>
                  </CheckboxItem>
                ))}
              </CheckboxGroup>
            </UIFormGroup>

            {formData.shipping_countries.length > 0 && (
              <UIFormGroup>
                <FormLabel>Shipping Settings per Country</FormLabel>
                {formData.shipping_countries.map(cc => {
                  const country = COUNTRIES.find(c => c.code === cc);
                  const settings = formData.shipping_settings[cc] || { shipping_fee: '0', free_shipping_threshold: '0', estimated_days: '' };
                  return (
                    <div key={cc} style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: '#0A2540', marginBottom: '8px' }}>
                        {country?.name || cc}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Shipping Fee ({country?.currency})</div>
                          <FormInput
                            type="number"
                            step="0.01"
                            min="0"
                            value={settings.shipping_fee}
                            onChange={(e) => handleShippingSettingChange(cc, 'shipping_fee', e.target.value)}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Free Shipping Threshold</div>
                          <FormInput
                            type="number"
                            step="0.01"
                            min="0"
                            value={settings.free_shipping_threshold}
                            onChange={(e) => handleShippingSettingChange(cc, 'free_shipping_threshold', e.target.value)}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Estimated Days</div>
                          <FormInput
                            type="text"
                            value={settings.estimated_days}
                            onChange={(e) => handleShippingSettingChange(cc, 'estimated_days', e.target.value)}
                            placeholder="e.g., 3-5"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </UIFormGroup>
            )}

            {/* Active */}
            <UIFormGroup style={{ marginBottom: 0, marginTop: '16px' }}>
              <CheckboxLabel>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
                Active
              </CheckboxLabel>
            </UIFormGroup>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <ModalButton type="button" onClick={handleCloseModal} disabled={isSubmitting}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
              </ModalButton>
            </div>

            {formError && (
              <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                background: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                color: '#DC2626',
                fontSize: '14px'
              }}>
                {formError}
              </div>
            )}
          </form>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

// ─── Categories Tab ───────────────────────────────────────────────────────────

interface CategoriesTabProps {
  onCountChange: (count: number) => void;
  onCategoryChange?: () => void;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({ onCountChange, onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    description: ''
  });

  const emojiOptions = [
    '\uD83D\uDCE6', '\uD83D\uDCBB', '\uD83D\uDDA8\uFE0F', '\uD83D\uDCF1', '\uD83D\uDDA5\uFE0F',
    '\u2328\uFE0F', '\uD83D\uDDB1\uFE0F', '\uD83D\uDD0C', '\uD83D\uDD0B', '\uD83D\uDCF7',
    '\uD83C\uDFA7', '\uD83D\uDD0A', '\uD83D\uDCFA', '\uD83D\uDCBD', '\uD83D\uDCBE',
    '\uD83D\uDCBF', '\uD83D\uDCC0', '\uD83E\uDDEE', '\uD83D\uDCDE', '\uD83D\uDCDF',
    '\uD83D\uDCE0', '\uD83D\uDCE1', '\uD83D\uDD27', '\uD83D\uDD29', '\u2699\uFE0F',
    '\uD83D\uDEE0\uFE0F', '\uD83D\uDDDC\uFE0F', '\uD83C\uDF10', '\uD83D\uDD17', '\uD83D\uDCC8',
    '\uD83D\uDCCA', '\uD83D\uDCC1', '\uD83D\uDCC2', '\uD83D\uDCC4', '\uD83D\uDCCB',
    '\uD83D\uDCCC', '\uD83D\uDCCE', '\uD83D\uDCCF', '\uD83D\uDCD0', '\u2702\uFE0F',
    '\uD83D\uDCB3', '\uD83C\uDFF7\uFE0F', '\uD83D\uDED2', '\uD83D\uDEF5', '\uD83D\uDE9A',
    '\uD83C\uDFE2', '\uD83C\uDFED', '\uD83C\uDFEA', '\u26A1', '\uD83D\uDD0D'
  ];

  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  const fetchCategories = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/system-product-categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
        onCountChange(data.data.length);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  }, [getToken, onCountChange]);

  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        emoji: category.emoji || '',
        description: category.description || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', emoji: '', description: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', emoji: '', description: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      const token = getToken();
      const method = editingCategory ? 'PUT' : 'POST';
      const url = editingCategory
        ? `/api/system-product-categories/${editingCategory.id}`
        : '/api/system-product-categories';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          emoji: formData.emoji || null,
          description: formData.description.trim() || null
        })
      });

      const data = await response.json();
      if (data.success) {
        handleCloseModal();
        fetchCategories();
        onCategoryChange?.();
      } else {
        alert(data.message || data.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save');
    }
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!categoryToDelete) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/system-product-categories/${categoryToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setCategoryToDelete(null);
        fetchCategories();
        onCategoryChange?.();
      } else {
        alert(data.message || data.error || 'Failed to delete');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete');
    }
  };

  const handleReorder = async (categoryId: number, direction: 'up' | 'down') => {
    try {
      const token = getToken();
      const response = await fetch(`/api/system-product-categories/${categoryId}/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ direction })
      });

      const data = await response.json();
      if (data.success) {
        fetchCategories();
      } else {
        alert(data.message || data.error || 'Failed to reorder');
      }
    } catch (error) {
      console.error('Failed to reorder category:', error);
    }
  };

  if (loading) {
    return (
      <CategoryContainer>
        <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
          Loading categories...
        </div>
      </CategoryContainer>
    );
  }

  return (
    <CategoryContainer>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <ThemedButton onClick={() => handleOpenModal()}>
          Add Category
        </ThemedButton>
      </div>

      {categories.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No categories yet</EmptyTitle>
          <EmptyDescription>Create your first product category to organize your system products.</EmptyDescription>
          <ThemedButton onClick={() => handleOpenModal()}>Add Category</ThemedButton>
        </EmptyState>
      ) : (
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={category.id} isActive={category.is_active}>
              <OrderControls
                onMoveUp={() => handleReorder(category.id, 'up')}
                onMoveDown={() => handleReorder(category.id, 'down')}
                disableUp={index === 0}
                disableDown={index === categories.length - 1}
              />

              <CategoryIcon>
                {category.emoji || '\uD83D\uDCE6'}
              </CategoryIcon>

              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
                <CategoryMeta>
                  <span>{category.product_count || 0} products</span>
                  <StatusBadge active={category.is_active}>
                    {category.is_active ? 'Active' : 'Inactive'}
                  </StatusBadge>
                </CategoryMeta>
                {category.description && (
                  <CategoryDescription>{category.description}</CategoryDescription>
                )}
              </CategoryInfo>

              <CategoryActions>
                <IconButton onClick={() => handleOpenModal(category)} title="Edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(category)} title="Delete">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    <line x1="10" y1="11" x2="10" y2="17"/>
                    <line x1="14" y1="11" x2="14" y2="17"/>
                  </svg>
                </IconButton>
              </CategoryActions>
            </CategoryCard>
          ))}
        </CategoryGrid>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          title={editingCategory ? 'Edit Category' : 'Add Category'}
        >
          <form onSubmit={handleSubmit}>
            <UIFormGroup>
              <FormLabel>Name *</FormLabel>
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Category name"
                required
              />
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Emoji</FormLabel>
              <EmojiPicker>
                {emojiOptions.map((emoji) => (
                  <EmojiOption
                    key={emoji}
                    type="button"
                    selected={formData.emoji === emoji}
                    onClick={() => setFormData({ ...formData, emoji })}
                  >
                    {emoji}
                  </EmojiOption>
                ))}
              </EmojiPicker>
            </UIFormGroup>

            <UIFormGroup>
              <FormLabel>Description</FormLabel>
              <FormTextArea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Category description (optional)"
                rows={3}
              />
            </UIFormGroup>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
              <ModalButton type="button" onClick={handleCloseModal}>
                Cancel
              </ModalButton>
              <ModalButton type="submit" variant="primary">
                {editingCategory ? 'Update' : 'Create'}
              </ModalButton>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onCancel={() => {
          setDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </CategoryContainer>
  );
};

export default SystemProductManagementPage;
