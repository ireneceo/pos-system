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

interface SupportedCurrency {
  code: string;
  name: string;
  symbol: string;
}

interface SupportedCountry {
  code: string;
  name: string;
  currency: string;
  flag: string;
}

interface OptionGroup {
  id: number;
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  options: OptionItem[];
}

interface OptionItem {
  id?: number;
  name: string;
  price_adjustment: number;
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
  shipping_settings: any;
  prices: ProductPrice[];
  addons: any[] | null;
  sort_order: number;
  optionGroups?: OptionGroup[];
}

type TabType = 'products' | 'categories' | 'options';

// ─── Styled Components ───────────────────────────────────────────────────────

// -- Products Tab --
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
`;

const ProductCard = styled.div<{ isActive?: boolean; isHighlighted?: boolean }>`
  background: white;
  border-radius: 12px;
  border: 1px solid ${props => props.isHighlighted ? '#635BFF' : '#E6EBF1'};
  padding: 20px;
  transition: all 0.2s;
  opacity: ${props => props.isActive ? 1 : 0.6};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.isHighlighted ? '0 0 0 2px rgba(99, 91, 255, 0.3)' : 'none'};

  &:hover {
    box-shadow: ${props => props.isHighlighted
      ? '0 0 0 2px rgba(99, 91, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.08)'
      : '0 4px 12px rgba(0, 0, 0, 0.08)'};
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

const CardSpacer = styled.div`
  flex: 1;
  min-height: 12px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;
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

// -- Options Tab --
const OptionsGrid = styled.div`
  display: grid;
  gap: 16px;
`;

const OptionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
`;

const OptionCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const OptionCardInfo = styled.div`
  flex: 1;
`;

const OptionCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 8px 0;
`;

const OptionCardMeta = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const OptionTypeBadge = styled.span<{ type: 'required' | 'optional' }>`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  ${props => props.type === 'required' ? `
    background: #FEE2E2;
    color: #DC2626;
  ` : `
    background: #E0F2FE;
    color: #0369A1;
  `}
`;

const OptionCardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const OptionChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #F3F4F6;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`;

const OptionPrice = styled.span`
  margin-left: 6px;
  color: #6B7280;
  font-size: 12px;
`;

const OptionFormGroup = styled.div`
  margin-bottom: 20px;
`;

const OptionFormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

const OptionFormInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #635BFF;
  }
`;

const OptionFormCheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const OptionFormCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
`;

const OptionItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const OptionRemoveButton = styled.button`
  background: #FEE2E2;
  color: #DC2626;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #FECACA;
  }
`;

const OptionFormButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  ${props => {
    switch (props.variant) {
      case 'danger':
        return `
          background: #EF4444;
          color: white;
          &:hover { background: #DC2626; }
        `;
      case 'secondary':
        return `
          background: white;
          color: #6B7280;
          border: 1px solid #E5E7EB;
          &:hover { background: #F9FAFB; }
        `;
      default:
        return `
          background: #635BFF;
          color: white;
          &:hover { background: #5246ED; }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ─── Helpers ─────────────────────────────────────────────────────────────────

const NO_DECIMAL_CURRENCIES = ['KRW', 'JPY', 'VND', 'IDR', 'TWD'];

const formatPrice = (value: number, currency: string): string => {
  if (NO_DECIMAL_CURRENCIES.includes(currency)) {
    return Math.round(value).toLocaleString('en-US');
  }
  return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const getToken = () => localStorage.getItem('auth_token');

// ─── Main Page Component ─────────────────────────────────────────────────────

const SystemProductManagementPage: React.FC = () => {
  const [activeTab, handleTabChange] = useTabParam<TabType>('products');
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [optionsCount, setOptionsCount] = useState(0);
  const [categoryRefreshKey, setCategoryRefreshKey] = useState(0);
  const [optionRefreshKey, setOptionRefreshKey] = useState(0);

  return (
    <Container>
      <Header>
        <Title>System Products</Title>
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
          <Tab active={activeTab === 'options'} onClick={() => handleTabChange('options')}>
            Options
            <Badge count={optionsCount} showZero />
          </Tab>
        </Tabs>

        <div style={{ display: activeTab === 'products' ? 'block' : 'none' }}>
          <ProductsTab
            onCountChange={setProductsCount}
            categoryRefreshKey={categoryRefreshKey}
            optionRefreshKey={optionRefreshKey}
          />
        </div>
        <div style={{ display: activeTab === 'categories' ? 'block' : 'none' }}>
          <CategoriesTab
            onCountChange={setCategoriesCount}
            onCategoryChange={() => setCategoryRefreshKey(k => k + 1)}
          />
        </div>
        <div style={{ display: activeTab === 'options' ? 'block' : 'none' }}>
          <OptionsTab
            onCountChange={setOptionsCount}
            onOptionChange={() => setOptionRefreshKey(k => k + 1)}
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
  optionRefreshKey: number;
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
  addons: AddonForm[];
  prices: Record<string, { price: string; is_active: boolean }>;
  shipping_countries: string[];
  option_group_ids: number[];
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
  option_group_ids: [],
});

const ProductsTab: React.FC<ProductsTabProps> = ({ onCountChange, categoryRefreshKey, optionRefreshKey }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [supportedCurrencies, setSupportedCurrencies] = useState<SupportedCurrency[]>([]);
  const [supportedCountries, setSupportedCountries] = useState<SupportedCountry[]>([]);
  const [systemOptionGroups, setSystemOptionGroups] = useState<OptionGroup[]>([]);
  const [defaultCurrency, setDefaultCurrency] = useState('MYR');
  const [currencyFilter, setCurrencyFilter] = useState('');
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
  const [highlightedProductId, setHighlightedProductId] = useState<number | null>(null);

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
  }, [onCountChange]);

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
  }, []);

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
  }, []);

  const fetchDefaultCurrency = useCallback(async () => {
    try {
      const response = await fetch('/api/currencies/default');
      const data = await response.json();
      if (data.success) {
        setDefaultCurrency(data.defaultCurrency || 'MYR');
        setCurrencyFilter(data.defaultCurrency || 'MYR');
      }
    } catch (error) {
      console.error('Failed to fetch default currency:', error);
    }
  }, []);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch('/api/currencies/countries/supported');
      const data = await response.json();
      if (data.success) {
        setSupportedCountries(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  }, []);

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/system-product-option-groups', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setSystemOptionGroups(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch option groups:', error);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProducts(), fetchCategories(), fetchCurrencies(), fetchDefaultCurrency(), fetchCountries(), fetchOptionGroups()]);
      setLoading(false);
    };
    loadData();
  }, [fetchProducts, fetchCategories, fetchCurrencies, fetchDefaultCurrency, fetchCountries, fetchOptionGroups]);

  useEffect(() => {
    if (categoryRefreshKey > 0) {
      fetchCategories();
    }
  }, [categoryRefreshKey, fetchCategories]);

  useEffect(() => {
    if (optionRefreshKey > 0) {
      fetchOptionGroups();
    }
  }, [optionRefreshKey, fetchOptionGroups]);

  const getDisplayPrice = (product: Product, currency?: string): string => {
    if (!product.prices || product.prices.length === 0) return 'N/A';
    const cur = currency || currencyFilter || defaultCurrency;
    const match = product.prices.find(p => p.currency === cur && p.is_active);
    if (match) return `${cur} ${formatPrice(Number(match.price), cur)}`;
    const activePrice = product.prices.find(p => p.is_active);
    if (activePrice) return `${activePrice.currency} ${formatPrice(Number(activePrice.price), activePrice.currency)}`;
    const firstPrice = product.prices[0];
    return `${firstPrice.currency} ${formatPrice(Number(firstPrice.price), firstPrice.currency)}`;
  };

  const buildPricesMap = (prices: ProductPrice[]): Record<string, { price: string; is_active: boolean }> => {
    const map: Record<string, { price: string; is_active: boolean }> = {};
    prices.forEach(p => {
      map[p.currency] = { price: p.price.toString(), is_active: p.is_active };
    });
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
          max_quantity: a.max_quantity || 1,
          is_inquiry_only: a.is_inquiry_only || false,
        })),
        prices: buildPricesMap(product.prices || []),
        shipping_countries: product.shipping_countries || [],
        option_group_ids: product.optionGroups?.map(og => og.id) || [],
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
          option_group_ids: !formData.is_set ? formData.option_group_ids : [],
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
        await fetchProducts();
        // Highlight the new copy product
        if (data.data && data.data.id) {
          setHighlightedProductId(data.data.id);
          setTimeout(() => setHighlightedProductId(null), 3000);
        }
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

  const handleUpdateAddon = (productId: number, field: keyof AddonForm, value: string | number | boolean) => {
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

  // Option group helpers
  const handleOptionGroupToggle = (ogId: number) => {
    setFormData(prev => ({
      ...prev,
      option_group_ids: prev.option_group_ids.includes(ogId)
        ? prev.option_group_ids.filter(id => id !== ogId)
        : [...prev.option_group_ids, ogId]
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
          {supportedCurrencies.length > 1 && (
            <FilterSelect
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
            >
              {supportedCurrencies.map(cur => (
                <option key={cur.code} value={cur.code}>
                  {cur.code} ({cur.symbol})
                </option>
              ))}
            </FilterSelect>
          )}
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
              isHighlighted={highlightedProductId === product.id}
              onClick={() => handleOpenModal(product)}
            >
              <ProductHeader>
                <ProductImage src={product.image_url}>
                  {!product.image_url && (product.emoji || '📦')}
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
                      {product.shipping_countries.join(', ')}
                    </span>
                  </DetailRow>
                )}
              </ProductDetails>

              <CardSpacer />
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
                  const isNoDecimal = NO_DECIMAL_CURRENCIES.includes(cur.code);
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
                        step={isNoDecimal ? '1' : '0.01'}
                        min="0"
                        value={priceData.price}
                        onChange={(e) => handlePriceChange(cur.code, 'price', e.target.value)}
                        placeholder={isNoDecimal ? '0' : '0.00'}
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
                    option_group_ids: e.target.checked ? [] : formData.option_group_ids,
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
                          <span>{p.emoji || '📦'} {p.sku ? `${p.sku} ` : ''}{p.name}</span>
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
                          <span>{p.emoji || '📦'} {p.sku ? `${p.sku} ` : ''}{p.name}</span>
                          <span style={{ color: '#6B7280' }}>{getDisplayPrice(p)}</span>
                        </div>
                      ))
                    }
                  </div>
                </UIFormGroup>
              </>
            )}

            {/* Option Groups - only for non-set products */}
            {!formData.is_set && systemOptionGroups.length > 0 && (
              <>
                <SectionTitle>Option Groups</SectionTitle>
                <UIFormGroup>
                  <CheckboxGroup>
                    {systemOptionGroups.map(og => (
                      <CheckboxItem key={og.id}>
                        <input
                          type="checkbox"
                          checked={formData.option_group_ids.includes(og.id)}
                          onChange={() => handleOptionGroupToggle(og.id)}
                        />
                        <span>{og.name} ({og.options?.length || 0} options)</span>
                      </CheckboxItem>
                    ))}
                  </CheckboxGroup>
                </UIFormGroup>
              </>
            )}

            {/* Shipping */}
            <SectionTitle>Shipping</SectionTitle>
            <UIFormGroup>
              <FormLabel>Available Countries</FormLabel>
              {supportedCountries.length > 0 ? (
                <CheckboxGroup>
                  {supportedCountries.map(country => (
                    <CheckboxItem key={country.code}>
                      <input
                        type="checkbox"
                        checked={formData.shipping_countries.includes(country.code)}
                        onChange={() => handleShippingCountryToggle(country.code)}
                      />
                      <span>{country.flag} {country.name} ({country.currency})</span>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              ) : (
                <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '8px', color: '#6B7280', fontSize: '13px' }}>
                  No supported countries configured. Set up countries in System Settings first.
                </div>
              )}
            </UIFormGroup>

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
    '📦', '💻', '🖨️', '📱', '🖥️',
    '⌨️', '🖱️', '🔌', '🔋', '📷',
    '🎧', '🔊', '📺', '💽', '💾',
    '💿', '📀', '🧮', '📞', '📟',
    '📠', '📡', '🔧', '🔩', '⚙️',
    '🛠️', '🗜️', '🌐', '🔗', '📈',
    '📊', '📁', '📂', '📄', '📋',
    '📌', '📎', '📏', '📐', '✂️',
    '💳', '🏷️', '🛒', '🛵', '🚚',
    '🏢', '🏭', '🏪', '⚡', '🔍'
  ];

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
  }, [onCountChange]);

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
                {category.emoji || '📦'}
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

// ─── Options Tab ──────────────────────────────────────────────────────────────

interface OptionsTabProps {
  onCountChange: (count: number) => void;
  onOptionChange?: () => void;
}

const OptionsTab: React.FC<OptionsTabProps> = ({ onCountChange, onOptionChange }) => {
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<OptionGroup | null>(null);
  const [deletingGroupId, setDeletingGroupId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    is_required: false,
    options: [] as OptionItem[]
  });
  const [newOption, setNewOption] = useState({ name: '', price_adjustment: 0 });

  const fetchOptionGroups = useCallback(async () => {
    try {
      const token = getToken();
      const response = await fetch('/api/system-product-option-groups', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setOptionGroups(data.data);
          onCountChange(data.data.length);
        }
      }
    } catch (error) {
      console.error('Error fetching option groups:', error);
    } finally {
      setLoading(false);
    }
  }, [onCountChange]);

  useEffect(() => {
    fetchOptionGroups();
  }, [fetchOptionGroups]);

  const handleOpenModal = (group?: OptionGroup) => {
    if (group) {
      setEditingGroup(group);
      setFormData({
        name: group.name,
        is_required: group.is_required,
        options: group.options.map(o => ({ ...o }))
      });
    } else {
      setEditingGroup(null);
      setFormData({
        name: '',
        is_required: false,
        options: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingGroup(null);
    setFormData({ name: '', is_required: false, options: [] });
    setNewOption({ name: '', price_adjustment: 0 });
  };

  const handleAddOption = () => {
    if (!newOption.name.trim()) return;
    const priceAdj = isNaN(newOption.price_adjustment) ? 0 : newOption.price_adjustment;
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { name: newOption.name.trim(), price_adjustment: priceAdj }]
    }));
    setNewOption({ name: '', price_adjustment: 0 });
  };

  const handleRemoveOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim() || formData.options.length === 0) return;

    try {
      const token = getToken();
      const url = editingGroup
        ? `/api/system-product-option-groups/${editingGroup.id}`
        : '/api/system-product-option-groups';
      const method = editingGroup ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          is_required: formData.is_required,
          options: formData.options
        })
      });

      if (response.ok) {
        fetchOptionGroups();
        handleCloseModal();
        onOptionChange?.();
      }
    } catch (error) {
      console.error('Error saving option group:', error);
    }
  };

  const handleDeleteClick = (groupId: number) => {
    setDeletingGroupId(groupId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingGroupId) return;

    try {
      const token = getToken();
      const response = await fetch(`/api/system-product-option-groups/${deletingGroupId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        fetchOptionGroups();
        onOptionChange?.();
      } else {
        const data = await response.json();
        alert(data.message || data.error || 'Failed to delete option group');
      }
    } catch (error) {
      console.error('Error deleting option group:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeletingGroupId(null);
    }
  };

  const filteredGroups = optionGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#6B7280' }}>Loading...</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', marginTop: '24px' }}>
        <FilterBar style={{ marginBottom: 0 }}>
          <SearchInput
            type="text"
            placeholder="Search option groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterBar>
        <ThemedButton onClick={() => handleOpenModal()} style={{ flexShrink: 0 }}>
          Add Option Group
        </ThemedButton>
      </div>

      {filteredGroups.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No option groups yet</EmptyTitle>
          <EmptyDescription>
            Create option groups to add customizable options to your system products
          </EmptyDescription>
          <ThemedButton onClick={() => handleOpenModal()}>
            Add Option Group
          </ThemedButton>
        </EmptyState>
      ) : (
        <OptionsGrid>
          {filteredGroups.map(group => (
            <OptionCard key={group.id}>
              <OptionCardHeader>
                <OptionCardInfo>
                  <OptionCardTitle>{group.name}</OptionCardTitle>
                  <OptionCardMeta>
                    <OptionTypeBadge type={group.is_required ? 'required' : 'optional'}>
                      {group.is_required ? 'Required' : 'Optional'}
                    </OptionTypeBadge>
                    <span style={{ fontSize: '13px', color: '#6B7280' }}>
                      {group.options.length} options
                    </span>
                  </OptionCardMeta>
                </OptionCardInfo>
                <OptionCardActions>
                  <IconButton onClick={() => handleOpenModal(group)} title="Edit">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(group.id)} title="Delete">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </IconButton>
                </OptionCardActions>
              </OptionCardHeader>
              <OptionsList>
                {group.options.map((option, idx) => (
                  <OptionChip key={idx}>
                    {option.name}
                    {Number(option.price_adjustment) !== 0 && (
                      <OptionPrice>
                        {Number(option.price_adjustment) > 0 ? '+' : ''}{Number(option.price_adjustment).toFixed(2)}
                      </OptionPrice>
                    )}
                  </OptionChip>
                ))}
              </OptionsList>
            </OptionCard>
          ))}
        </OptionsGrid>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingGroup ? 'Edit Option Group' : 'New Option Group'}
      >
        <OptionFormGroup>
          <OptionFormLabel>Group Name</OptionFormLabel>
          <OptionFormInput
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Size, Grade, Packaging"
          />
        </OptionFormGroup>

        <OptionFormGroup>
          <OptionFormCheckboxGroup>
            <OptionFormCheckboxLabel>
              <input
                type="checkbox"
                checked={formData.is_required}
                onChange={(e) => setFormData({ ...formData, is_required: e.target.checked })}
              />
              Required Selection
            </OptionFormCheckboxLabel>
          </OptionFormCheckboxGroup>
        </OptionFormGroup>

        <OptionFormGroup>
          <OptionFormLabel>Options</OptionFormLabel>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <OptionFormInput
              type="text"
              value={newOption.name}
              onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
              placeholder="Option name"
              style={{ flex: 2 }}
            />
            <OptionFormInput
              type="number"
              value={newOption.price_adjustment}
              onChange={(e) => setNewOption({ ...newOption, price_adjustment: parseFloat(e.target.value) || 0 })}
              placeholder="Price adj."
              step="0.50"
              style={{ flex: 1 }}
            />
            <OptionFormButton type="button" variant="secondary" onClick={handleAddOption} disabled={!newOption.name.trim()}>
              Add
            </OptionFormButton>
          </div>

          {formData.options.map((option, idx) => (
            <OptionItemRow key={idx}>
              <div style={{ flex: 1 }}>
                <strong>{option.name}</strong>
                {Number(option.price_adjustment) !== 0 && (
                  <span style={{ marginLeft: '8px', color: '#6B7280' }}>
                    ({Number(option.price_adjustment) > 0 ? '+' : ''}{Number(option.price_adjustment).toFixed(2)})
                  </span>
                )}
              </div>
              <OptionRemoveButton onClick={() => handleRemoveOption(idx)}>x</OptionRemoveButton>
            </OptionItemRow>
          ))}
        </OptionFormGroup>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <OptionFormButton type="button" variant="secondary" onClick={handleCloseModal}>Cancel</OptionFormButton>
          <OptionFormButton type="button" onClick={handleSave} disabled={!formData.name.trim() || formData.options.length === 0}>
            {editingGroup ? 'Update' : 'Create'}
          </OptionFormButton>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Option Group"
      >
        <p>Are you sure you want to delete this option group? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <OptionFormButton type="button" variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancel</OptionFormButton>
          <OptionFormButton type="button" variant="danger" onClick={handleConfirmDelete}>Delete</OptionFormButton>
        </div>
      </Modal>
    </>
  );
};

export default SystemProductManagementPage;
