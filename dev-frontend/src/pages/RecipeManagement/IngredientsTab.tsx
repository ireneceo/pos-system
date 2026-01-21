import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormRow as UIFormRow } from '../../components/UI/Modal';
import ConfirmModal from '../../components/ConfirmModal';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';

interface IngredientsTabProps {
  brandId: number | null;
  restaurantId?: number | null;
  onCountChange: (count: number) => void;
  categoryRefreshKey?: number;
}

interface IngredientCategory {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  name: string;
  description: string | null;
  emoji: string | null;
  display_order: number;
  is_active: boolean;
}

interface Supplier {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  code: string | null;
  name: string;
  contact_name: string | null;
  phone: string | null;
  is_active: boolean;
}

interface Ingredient {
  id: number;
  brand_id: number | null;
  restaurant_id: number | null;
  owner_type: 'brand' | 'restaurant';
  ingredient_category_id: number | null;
  ingredientCategory?: IngredientCategory;
  brand_product_id: number | null;
  code: string | null;
  name: string;
  image_url: string | null;
  category: string;
  unit: string;
  base_quantity: number;
  unit_cost: number;
  supplier_name: string | null;
  supplier_id: number | null;
  supplier?: Supplier;
  is_active: boolean;
  min_stock?: number;
  current_stock?: number;
  track_stock?: boolean;
}

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 24px;
  align-items: start;
`;

const IngredientCard = styled.div<{ isActive?: boolean }>`
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

const IngredientHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

const IngredientName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const IngredientCategoryBadge = styled.div`
  display: inline-block;
  padding: 4px 8px;
  background: #F0F4FF;
  color: #635BFF;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BrandBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #FEF3C7;
  color: #92400E;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`;

const TrackStockBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: #D1FAE5;
  color: #065F46;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
`;

const StockToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #F9FAFB;
  border-radius: 6px;
  margin-top: 12px;
`;

const StockToggleLabel = styled.span`
  font-size: 13px;
  color: #6B7280;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #D1D5DB;
    border-radius: 22px;
    transition: 0.3s;

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 3px;
      bottom: 3px;
      background: white;
      border-radius: 50%;
      transition: 0.3s;
    }
  }

  input:checked + span {
    background: #10B981;
  }

  input:checked + span:before {
    transform: translateX(18px);
  }

  input:disabled + span {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const IngredientInfo = styled.div`
  margin: 12px 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #F3F4F6;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
`;

const IngredientActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 16px;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #635BFF;
          color: white;
          border: 1px solid #635BFF;
          &:hover {
            background: #4F46E5;
            transform: translateY(-1px);
          }
        `;
      case 'danger':
        return `
          background: #FEF2F2;
          border: 1px solid #EF4444;
          color: #EF4444;
          &:hover {
            background: #FEE2E2;
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: #F6F9FC;
          border: 1px solid #E6EBF1;
          color: #6B7280;
          &:hover {
            border-color: #635BFF;
            color: #635BFF;
            background: #F4F3FF;
            transform: translateY(-1px);
          }
        `;
    }
  }}

  &:active {
    transform: translateY(0);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
`;

const IngredientImageContainer = styled.div`
  width: 100%;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #F6F9FC;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IngredientImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 150px;
  border: 2px dashed #E6EBF1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  background: #F9FAFB;

  &:hover {
    border-color: #635BFF;
    background: #F4F3FF;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  text-align: center;
  color: #9CA3AF;
  font-size: 13px;
`;

const EmptyTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6B7280;
  margin-bottom: 24px;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const IngredientsTab: React.FC<IngredientsTabProps> = ({ brandId, restaurantId: propsRestaurantId, onCountChange, categoryRefreshKey }) => {
  const { user } = useAuth();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  // URL 파라미터의 restaurantId가 우선, 없으면 user.restaurant_id 사용
  const effectiveRestaurantId = propsRestaurantId || user?.restaurant_id || (user as any)?.restaurantId;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientCategories, setIngredientCategories] = useState<IngredientCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    image_url: '',
    ingredient_category_id: '',
    unit: '',
    base_quantity: '1',
    unit_cost: '',
    supplier_id: '' as string | number,
    min_stock: '0',
    track_stock: true
  });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; ingredientId: number | null; ingredientName: string }>({
    isOpen: false,
    ingredientId: null,
    ingredientName: ''
  });

  const isRestaurantAdmin = user?.role === 'Restaurant Admin';
  // Restaurant Admin은 자신의 재료만 수정/삭제 가능 (브랜드 재료는 읽기전용)
  const isItemReadOnly = (item: Ingredient) => isRestaurantAdmin && item.owner_type === 'brand';

  // Helper to get auth token
  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  // Parallel fetch all data for performance
  useEffect(() => {
    const fetchAllData = async () => {
      if (!brandId && !effectiveRestaurantId) return;

      setLoading(true);
      const token = getToken();
      const isBrandRole = user?.role === 'Brand General' || user?.role === 'Brand Manager';

      try {
        const promises: Promise<any>[] = [];

        // Build URLs based on role
        let ingredientsUrl = '', categoriesUrl = '', suppliersUrl = '';

        if (isBrandRole && brandId) {
          ingredientsUrl = `/api/brands/${brandId}/ingredients`;
          categoriesUrl = `/api/brands/${brandId}/ingredient-categories`;
          suppliersUrl = `/api/brands/${brandId}/suppliers`;
        } else if (isRestaurantAdmin && effectiveRestaurantId) {
          ingredientsUrl = `/api/restaurants/${effectiveRestaurantId}/ingredients`;
          categoriesUrl = `/api/restaurants/${effectiveRestaurantId}/ingredient-categories`;
          suppliersUrl = `/api/restaurants/${effectiveRestaurantId}/all-suppliers`;
        }

        // Fetch all in parallel
        if (ingredientsUrl) {
          promises.push(
            fetch(ingredientsUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(categoriesUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch(suppliersUrl, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
          );
          // 레스토랑 관리자일 경우 브랜드 재료도 함께 조회
          if (isRestaurantAdmin && effectiveRestaurantId) {
            promises.push(
              fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
            );
          }
        }

        const results = await Promise.all(promises);

        // Process ingredients
        if (results[0]?.success) {
          let allIngredients = Array.isArray(results[0].data) ? results[0].data : [];

          // 레스토랑 관리자일 경우 브랜드 재료 추가
          if (isRestaurantAdmin && results[3]?.success && Array.isArray(results[3].data)) {
            allIngredients = [...results[3].data, ...allIngredients]; // 브랜드 재료를 먼저 표시
          }

          setIngredients(allIngredients);
        }

        // Process categories
        if (results[1]?.success) {
          if (Array.isArray(results[1].data)) {
            setIngredientCategories(results[1].data.filter((c: IngredientCategory) => c.is_active));
          } else {
            const allCategories = [
              ...(results[1].data.own_categories || []),
              ...(results[1].data.brand_categories || [])
            ].filter((c: IngredientCategory) => c.is_active);
            setIngredientCategories(allCategories);
          }
        }

        // Process suppliers
        if (results[2]?.success) {
          if (Array.isArray(results[2].data)) {
            setSuppliers(results[2].data.filter((s: Supplier) => s.is_active));
          } else {
            const allSuppliers = [
              ...(results[2].data.brand_suppliers || []),
              ...(results[2].data.own_suppliers || [])
            ].filter((s: Supplier) => s.is_active);
            setSuppliers(allSuppliers);
          }
        }

      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [brandId, effectiveRestaurantId, user?.role, getToken, isRestaurantAdmin]);

  // 카테고리가 변경되면 카테고리 목록을 새로 가져옴
  useEffect(() => {
    if (categoryRefreshKey && (brandId || effectiveRestaurantId)) {
      fetchIngredientCategories();
    }
  }, [categoryRefreshKey]);

  const fetchIngredientCategories = async () => {
    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          url = `/api/brands/${brandId}/ingredient-categories`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (effectiveRestaurantId) {
          url = `/api/restaurants/${effectiveRestaurantId}/ingredient-categories`;
        }
      }

      if (!url) return;

      const token = getToken();
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        if (Array.isArray(data.data)) {
          setIngredientCategories(data.data.filter((c: IngredientCategory) => c.is_active));
        } else {
          const allCategories = [
            ...(data.data.own_categories || []),
            ...(data.data.brand_categories || [])
          ].filter((c: IngredientCategory) => c.is_active);
          setIngredientCategories(allCategories);
        }
      }
    } catch (error) {
      console.error('Failed to fetch ingredient categories:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const token = getToken();

      // Brand General/Manager
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (brandId) {
          const response = await fetch(`/api/brands/${brandId}/ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          if (data.success) {
            setIngredients(data.data);
          }
        }
      }
      // Restaurant Admin - 자체 재료 + 브랜드 재료 함께 조회
      else if (user?.role === 'Restaurant Admin' && effectiveRestaurantId) {
        const [ownRes, brandRes] = await Promise.all([
          fetch(`/api/restaurants/${effectiveRestaurantId}/ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json()),
          fetch(`/api/restaurants/${effectiveRestaurantId}/brand-ingredients`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }).then(r => r.json())
        ]);

        let allIngredients: Ingredient[] = [];
        if (brandRes.success && Array.isArray(brandRes.data)) {
          allIngredients = [...brandRes.data];
        }
        if (ownRes.success && Array.isArray(ownRes.data)) {
          allIngredients = [...allIngredients, ...ownRes.data];
        }
        setIngredients(allIngredients);
      }
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  const handleDeleteClick = (ingredient: Ingredient) => {
    setDeleteConfirm({
      isOpen: true,
      ingredientId: ingredient.id,
      ingredientName: ingredient.name
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.ingredientId) return;

    try {
      let url = '';
      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        url = `/api/brands/${brandId}/ingredients/${deleteConfirm.ingredientId}`;
      } else if (user?.role === 'Restaurant Admin') {
        url = `/api/restaurants/${effectiveRestaurantId}/ingredients/${deleteConfirm.ingredientId}`;
      }

      const token = getToken();
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();

      if (data.success) {
        setIngredients(prev => prev.filter(i => i.id !== deleteConfirm.ingredientId));
      } else {
        console.error('Delete failed:', data.error);
      }
    } catch (error) {
      console.error('Failed to delete ingredient:', error);
    } finally {
      setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, ingredientId: null, ingredientName: '' });
  };

  const handleOpenModal = (ingredient: Ingredient | null) => {
    if (ingredient) {
      setSelectedIngredient(ingredient);
      setFormData({
        code: ingredient.code || '',
        name: ingredient.name,
        image_url: ingredient.image_url || '',
        ingredient_category_id: ingredient.ingredient_category_id?.toString() || '',
        unit: ingredient.unit,
        base_quantity: ingredient.base_quantity?.toString() || '1',
        unit_cost: ingredient.unit_cost.toString(),
        supplier_id: ingredient.supplier_id || '',
        min_stock: ingredient.min_stock?.toString() || '0',
        track_stock: ingredient.track_stock || false
      });
    } else {
      setSelectedIngredient(null);
      setFormData({
        code: '',
        name: '',
        image_url: '',
        ingredient_category_id: '',
        unit: '',
        base_quantity: '1',
        unit_cost: '',
        supplier_id: '',
        min_stock: '0',
        track_stock: true
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIngredient(null);
    setFormData({
      code: '',
      name: '',
      image_url: '',
      ingredient_category_id: '',
      unit: '',
      base_quantity: '1',
      unit_cost: '',
      supplier_id: '',
      min_stock: '0',
      track_stock: true
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.ingredient_category_id || !formData.unit || !formData.unit_cost) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let url = '';
      const method = selectedIngredient ? 'PUT' : 'POST';

      if (user?.role === 'Brand General' || user?.role === 'Brand Manager') {
        if (selectedIngredient) {
          url = `/api/brands/${brandId}/ingredients/${selectedIngredient.id}`;
        } else {
          url = `/api/brands/${brandId}/ingredients`;
        }
      } else if (user?.role === 'Restaurant Admin') {
        if (selectedIngredient) {
          url = `/api/restaurants/${effectiveRestaurantId}/ingredients/${selectedIngredient.id}`;
        } else {
          url = `/api/restaurants/${effectiveRestaurantId}/ingredients`;
        }
      }

      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: formData.code,
          name: formData.name,
          image_url: formData.image_url || null,
          ingredient_category_id: formData.ingredient_category_id ? parseInt(formData.ingredient_category_id as string) : null,
          unit: formData.unit,
          supplier_id: formData.supplier_id ? Number(formData.supplier_id) : null,
          supplier_name: formData.supplier_id
            ? suppliers.find(s => s.id === Number(formData.supplier_id))?.name || ''
            : '',
          base_quantity: parseFloat(formData.base_quantity) || 1,
          unit_cost: parseFloat(formData.unit_cost),
          min_stock: parseInt(formData.min_stock) || 0,
          track_stock: formData.track_stock
        })
      });

      const data = await response.json();

      if (data.success) {
        handleCloseModal();
        fetchIngredients();
      } else {
        alert(data.error || '재료 저장 실패');
      }
    } catch (error) {
      console.error('Failed to save ingredient:', error);
    }
  };

  // Toggle track_stock directly from list
  const handleToggleTrackStock = async (ingredient: Ingredient, newValue: boolean) => {
    try {
      const token = localStorage.getItem('auth_token');
      let url: string;

      if (brandId) {
        url = `/api/brands/${brandId}/ingredients/${ingredient.id}`;
      } else {
        url = `/api/restaurants/${effectiveRestaurantId}/ingredients/${ingredient.id}`;
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          track_stock: newValue
        })
      });

      const data = await response.json();
      if (data.success) {
        // Update local state
        setIngredients(prev => prev.map(ing =>
          ing.id === ingredient.id ? { ...ing, track_stock: newValue } : ing
        ));
      }
    } catch (error) {
      console.error('Failed to toggle track_stock:', error);
    }
  };

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' ||
      ingredient.ingredient_category_id?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get categories for filter dropdown
  const filterCategories = [
    { id: 'all', name: 'All Categories' },
    ...ingredientCategories.map(c => ({ id: c.id.toString(), name: c.name }))
  ];

  // Update count when ingredients change
  useEffect(() => {
    onCountChange(ingredients.length);
  }, [ingredients.length, onCountChange]);

  return (
    <>
      <HeaderSection>
        <FilterBar style={{ marginBottom: 0, flex: 1 }}>
          <SearchInput
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {filterCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </FilterSelect>
        </FilterBar>

        <ThemedButton
          variant="primary"
          onClick={() => handleOpenModal(null)}
          style={{ whiteSpace: 'nowrap' }}
        >
          + New Ingredient
        </ThemedButton>
      </HeaderSection>

      {loading ? (
        <EmptyState>
          <EmptyTitle>Loading...</EmptyTitle>
        </EmptyState>
      ) : filteredIngredients.length === 0 ? (
        <EmptyState>
          <EmptyTitle>No ingredients found</EmptyTitle>
          <EmptyDescription>
            {searchTerm || selectedCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first ingredient to get started'}
          </EmptyDescription>
          {!searchTerm && selectedCategory === 'all' && (
            <ThemedButton
              variant="primary"
              onClick={() => handleOpenModal(null)}
            >
              + Create First Ingredient
            </ThemedButton>
          )}
        </EmptyState>
      ) : (
        <IngredientsGrid>
          {filteredIngredients.map(ingredient => (
            <IngredientCard key={ingredient.id} isActive={ingredient.is_active}>
              {ingredient.image_url && (
                <IngredientImageContainer>
                  <IngredientImage src={ingredient.image_url} alt={ingredient.name} />
                </IngredientImageContainer>
              )}
              <IngredientHeader>
                <div>
                  <IngredientName>
                    {ingredient.name}
                    {isRestaurantAdmin && ingredient.owner_type === 'brand' && (
                      <BrandBadge>Brand</BrandBadge>
                    )}
                    {ingredient.track_stock && (
                      <TrackStockBadge>Stock</TrackStockBadge>
                    )}
                  </IngredientName>
                  <IngredientCategoryBadge>
                    {ingredient.ingredientCategory?.emoji} {ingredient.ingredientCategory?.name || 'Uncategorized'}
                  </IngredientCategoryBadge>
                </div>
              </IngredientHeader>

              <IngredientInfo>
                <InfoRow>
                  <InfoLabel>Unit Cost</InfoLabel>
                  <InfoValue>{formatCurrency(Number(ingredient.unit_cost), selectedCurrency)}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Base Qty / Unit</InfoLabel>
                  <InfoValue>{Number(ingredient.base_quantity || 1)} {ingredient.unit}</InfoValue>
                </InfoRow>
                {(ingredient.supplier?.name || ingredient.supplier_name) && (
                  <InfoRow>
                    <InfoLabel>Supplier</InfoLabel>
                    <InfoValue>{ingredient.supplier?.name || ingredient.supplier_name}</InfoValue>
                  </InfoRow>
                )}
                {ingredient.code && (
                  <InfoRow>
                    <InfoLabel>Code</InfoLabel>
                    <InfoValue>{ingredient.code}</InfoValue>
                  </InfoRow>
                )}
              </IngredientInfo>

              {!isItemReadOnly(ingredient) && (
                <IngredientActions>
                  <ActionButton
                    variant="secondary"
                    onClick={() => handleOpenModal(ingredient)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => handleDeleteClick(ingredient)}
                  >
                    Delete
                  </ActionButton>
                </IngredientActions>
              )}
            </IngredientCard>
          ))}
        </IngredientsGrid>
      )}

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={selectedIngredient ? 'Edit Ingredient' : 'New Ingredient'}
        size="medium"
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UIFormGroup>
            <FormLabel>Image</FormLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="ingredient-image-upload"
            />
            <ImagePreview
              onClick={() => document.getElementById('ingredient-image-upload')?.click()}
            >
              {formData.image_url ? (
                <img src={formData.image_url} alt="Ingredient" />
              ) : (
                <ImagePlaceholder>Click to upload image</ImagePlaceholder>
              )}
            </ImagePreview>
          </UIFormGroup>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Ingredient Name *</FormLabel>
              <FormInput
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Rice"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Code</FormLabel>
              <FormInput
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="ING-001"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Category *</FormLabel>
              <FormSelect
                value={formData.ingredient_category_id}
                onChange={(e) => setFormData({ ...formData, ingredient_category_id: e.target.value })}
                required
              >
                <option value="">Select category...</option>
                {ingredientCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Supplier</FormLabel>
              <SearchableSelect
                options={suppliers.map(s => ({
                  value: s.id,
                  label: s.name,
                  subLabel: s.owner_type === 'brand' ? 'Brand' : undefined
                }))}
                value={formData.supplier_id || null}
                onChange={(val) => setFormData({ ...formData, supplier_id: val || '' })}
                placeholder="Select supplier..."
                noOptionsMessage="No suppliers found"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Base Quantity *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                min="0.01"
                value={formData.base_quantity}
                onChange={(e) => setFormData({ ...formData, base_quantity: e.target.value })}
                placeholder="1"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Unit *</FormLabel>
              <FormSelect
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
              >
                <option value="">Select unit...</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="piece">piece</option>
                <option value="pack">pack</option>
                <option value="can">can</option>
                <option value="bottle">bottle</option>
              </FormSelect>
            </UIFormGroup>
          </UIFormRow>

          <UIFormRow>
            <UIFormGroup>
              <FormLabel>Unit Cost ({selectedCurrency}) *</FormLabel>
              <FormInput
                type="number"
                step="0.01"
                value={formData.unit_cost}
                onChange={(e) => setFormData({ ...formData, unit_cost: e.target.value })}
                placeholder="0.00"
                required
              />
            </UIFormGroup>
            <UIFormGroup>
              <FormLabel>Minimum Stock</FormLabel>
              <FormInput
                type="number"
                value={formData.min_stock}
                onChange={(e) => setFormData({ ...formData, min_stock: e.target.value })}
                placeholder="0"
              />
            </UIFormGroup>
          </UIFormRow>

          <UIFormGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.track_stock}
                onChange={(e) => setFormData({ ...formData, track_stock: e.target.checked })}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#0A2540' }}>
                Track in Inventory Stock List
              </span>
            </label>
            <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', display: 'block' }}>
              Enable to include this ingredient in inventory stock management
            </span>
          </UIFormGroup>

          <ButtonGroup>
            <ModalButton type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </ModalButton>
            <ModalButton type="submit" variant="primary">
              {selectedIngredient ? 'Update Ingredient' : 'Create Ingredient'}
            </ModalButton>
          </ButtonGroup>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Delete Ingredient"
        message={`Are you sure you want to delete "${deleteConfirm.ingredientName}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default IngredientsTab;
