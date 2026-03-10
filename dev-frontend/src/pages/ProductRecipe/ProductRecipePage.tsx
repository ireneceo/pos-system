import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button,
  Table,
  TableHeader,
  TableRow,
  MobileLabel,
  MobileValue,
  MobileGrid,
  ActionButtons,
  EmptyState
} from '../../components/UI';
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import { useAuth } from '../../contexts/AuthContext';
import { Modal, ModalButton, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect } from '../../components/UI/Modal';
import { useBrandCurrency } from '../../hooks/useBrandCurrency';
import { formatCurrency } from '../../utils/currency';
import { fetchAPI } from '../../utils/api';

interface ProductRecipeStatus {
  id: number;
  name: string;
  code: string | null;
  price: number;
  category: string;
  has_recipe: boolean;
  recipe_id: number | null;
  recipe_name: string | null;
  ingredient_cost: number;
  profit_margin: string | null;
}

interface Recipe {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  total_ingredient_cost: number;
  owner_type: 'brand' | 'restaurant';
}

interface Ingredient {
  id: number;
  name: string;
  unit: string;
  base_quantity: number;
  unit_cost: number;
  category: string;
  current_stock: number;
}

interface RecipeIngredient {
  id?: number;
  ingredient_id: number;
  ingredient_name?: string;
  quantity: number;
  unit: string;
  unit_cost?: number;
  total_cost?: number;
  notes?: string;
}

// Styled Components
const InfoBox = styled.div`
  background: #F0F9FF;
  border: 1px solid #BAE6FD;
  border-radius: 8px;
  padding: 12px 16px;
  color: #0369A1;
  font-size: 14px;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const StatusBadge = styled.span<{ hasRecipe: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  background: ${props => props.hasRecipe ? '#ECFDF5' : '#FEF3C7'};
  color: ${props => props.hasRecipe ? '#059669' : '#D97706'};
`;

const ProfitBadge = styled.span<{ profit: number }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background: ${props => {
    if (props.profit >= 60) return '#ECFDF5';
    if (props.profit >= 40) return '#FEF3C7';
    return '#FEE2E2';
  }};
  color: ${props => {
    if (props.profit >= 60) return '#059669';
    if (props.profit >= 40) return '#D97706';
    return '#DC2626';
  }};
`;

const ProductInfo = styled.div``;

const ProductName = styled.div`
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 4px;
`;

const ProductMeta = styled.div`
  font-size: 13px;
  color: #6B7280;
`;

const IngredientList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  margin: 16px 0;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #E5E7EB;

  &:last-child {
    border-bottom: none;
  }
`;

const IngredientInfo = styled.div`
  flex: 1;
`;

const AddIngredientRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 80px;
  gap: 12px;
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-top: 16px;
`;

const CostSummary = styled.div`
  background: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
`;

const CostRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;

  &:last-child {
    border-top: 1px solid #E5E7EB;
    margin-top: 8px;
    padding-top: 16px;
    font-weight: 600;
  }
`;

const ProductRecipePage: React.FC = () => {
  const { user } = useAuth();
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const { defaultCurrency } = useBrandCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<string>('RM');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductRecipeStatus[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recipeFilter, setRecipeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  // Modals
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductRecipeStatus | null>(null);

  // Recipe management
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);

  // Add ingredient form
  const [newIngredientId, setNewIngredientId] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnit, setNewUnit] = useState('');

  const [saving, setSaving] = useState(false);

  const restaurantId = urlRestaurantId ? parseInt(urlRestaurantId, 10) : user?.restaurant_id;

  useEffect(() => {
    if (defaultCurrency) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency]);

  const fetchData = useCallback(async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);

      const response = await fetchAPI(`/api/restaurants/${restaurantId}/products/recipe-status`);
      if (response.success) {
        setProducts(response.data || []);

        // Extract unique categories
        const uniqueCategories: string[] = [];
        response.data.forEach((p: ProductRecipeStatus) => {
          if (p.category && !uniqueCategories.includes(p.category)) {
            uniqueCategories.push(p.category);
          }
        });
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchAvailableRecipes = async () => {
    try {
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/recipes/available`);
      if (response.success) {
        setAvailableRecipes(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/ingredients`);
      if (response.success) {
        setIngredients(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
    }
  };

  const fetchProductRecipe = async (productId: number) => {
    try {
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/products/${productId}/recipe`);
      if (response.success && response.data.recipe) {
        setRecipeIngredients(response.data.recipe.ingredients || []);
      } else {
        setRecipeIngredients([]);
      }
    } catch (error) {
      console.error('Failed to fetch product recipe:', error);
      setRecipeIngredients([]);
    }
  };

  const openRecipeModal = async (product: ProductRecipeStatus) => {
    setSelectedProduct(product);
    await fetchIngredients();
    if (product.has_recipe) {
      await fetchProductRecipe(product.id);
    } else {
      setRecipeIngredients([]);
    }
    setShowRecipeModal(true);
  };

  const openLinkModal = async (product: ProductRecipeStatus) => {
    setSelectedProduct(product);
    setSelectedRecipeId(product.recipe_id?.toString() || '');
    await fetchAvailableRecipes();
    setShowLinkModal(true);
  };

  const handleLinkRecipe = async () => {
    if (!selectedProduct) return;

    try {
      setSaving(true);
      const response = await fetchAPI(`/api/restaurants/${restaurantId}/products/${selectedProduct.id}/recipe`, {
        method: 'PUT',
        body: JSON.stringify({ recipe_id: selectedRecipeId ? parseInt(selectedRecipeId) : null })
      });

      if (response.success) {
        alert(selectedRecipeId ? 'Recipe linked successfully' : 'Recipe unlinked successfully');
        setShowLinkModal(false);
        fetchData();
      } else {
        alert(response.message || 'Failed to update recipe link');
      }
    } catch (error) {
      console.error('Failed to link recipe:', error);
      alert('Failed to update recipe link');
    } finally {
      setSaving(false);
    }
  };

  const addIngredient = () => {
    if (!newIngredientId || !newQuantity || !newUnit) return;

    const ingredient = ingredients.find(i => i.id === parseInt(newIngredientId));
    if (!ingredient) return;

    const quantity = parseFloat(newQuantity);
    // unit_cost는 base_quantity 기준이므로 단위당 비용 계산
    const baseQty = ingredient.base_quantity || 1;
    const costPerUnit = ingredient.unit_cost / baseQty;
    const newItem: RecipeIngredient = {
      ingredient_id: ingredient.id,
      ingredient_name: ingredient.name,
      quantity,
      unit: newUnit,
      unit_cost: costPerUnit,
      total_cost: costPerUnit * quantity
    };

    setRecipeIngredients([...recipeIngredients, newItem]);
    setNewIngredientId('');
    setNewQuantity('');
    setNewUnit('');
  };

  const removeIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const handleSaveRecipe = async () => {
    if (!selectedProduct) return;

    try {
      setSaving(true);

      if (selectedProduct.has_recipe && selectedProduct.recipe_id) {
        // Update existing recipe ingredients
        const response = await fetchAPI(`/api/restaurants/${restaurantId}/products/${selectedProduct.id}/recipe/ingredients`, {
          method: 'PUT',
          body: JSON.stringify({
            ingredients: recipeIngredients.map(ri => ({
              ingredient_id: ri.ingredient_id,
              quantity: ri.quantity,
              unit: ri.unit,
              notes: ri.notes
            }))
          })
        });

        if (response.success) {
          alert('Recipe updated successfully');
          setShowRecipeModal(false);
          fetchData();
        } else {
          alert(response.message || 'Failed to update recipe');
        }
      } else {
        // Create new recipe and link
        const response = await fetchAPI(`/api/restaurants/${restaurantId}/products/${selectedProduct.id}/recipe`, {
          method: 'POST',
          body: JSON.stringify({
            name: `${selectedProduct.name} Recipe`,
            ingredients: recipeIngredients.map(ri => ({
              ingredient_id: ri.ingredient_id,
              quantity: ri.quantity,
              unit: ri.unit,
              notes: ri.notes
            }))
          })
        });

        if (response.success) {
          alert('Recipe created and linked successfully');
          setShowRecipeModal(false);
          fetchData();
        } else {
          alert(response.message || 'Failed to create recipe');
        }
      }
    } catch (error) {
      console.error('Failed to save recipe:', error);
      alert('Failed to save recipe');
    } finally {
      setSaving(false);
    }
  };

  const calculateTotalCost = () => {
    return recipeIngredients.reduce((sum, ri) => sum + (ri.total_cost || 0), 0);
  };

  const filteredProducts = products.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.code?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRecipe = recipeFilter === 'all' ||
                         (recipeFilter === 'with' && item.has_recipe) ||
                         (recipeFilter === 'without' && !item.has_recipe);
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesRecipe && matchesCategory;
  });

  if (!restaurantId) {
    return (
      <>
        <Container>
          <EmptyState>
            <p>Restaurant not found. Please log in with a restaurant account.</p>
          </EmptyState>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        <Header>
          <Title>Product Recipes</Title>
          <ActionSection>
            <Button variant="secondary" onClick={() => window.location.href = `/restaurant/${restaurantId}/recipe-management`}>
              Manage Recipes
            </Button>
          </ActionSection>
        </Header>

        <Content>
          <InfoBox>
            Link recipes to your menu items to track ingredient costs and manage inventory deduction when products are sold.
          </InfoBox>

          <FilterBar>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect
              value={recipeFilter}
              onChange={(e) => setRecipeFilter(e.target.value)}
            >
              <option value="all">All Products</option>
              <option value="with">With Recipe</option>
              <option value="without">Without Recipe</option>
            </FilterSelect>
            <FilterSelect
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </FilterSelect>
          </FilterBar>

          {loading ? (
            <EmptyState>Loading...</EmptyState>
          ) : filteredProducts.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                No products found
              </div>
              <div style={{ fontSize: '14px' }}>
                Add products in the Menu page first.
              </div>
            </EmptyState>
          ) : (
            <Table>
              <TableHeader columns="2fr 1fr 1fr 1fr 1fr 150px">
                <span className="col-info">Product</span>
                <span className="col-price">Price</span>
                <span>Recipe Status</span>
                <span className="col-cost">Ingredient Cost</span>
                <span className="col-money">Profit Margin</span>
                <span className="col-action">Actions</span>
              </TableHeader>
              {filteredProducts.map(product => (
                <TableRow key={product.id} columns="2fr 1fr 1fr 1fr 1fr 150px">
                  <MobileGrid>
                    <MobileValue className="col-info">
                      <MobileLabel>Product</MobileLabel>
                      <ProductInfo>
                        <ProductName>{product.name}</ProductName>
                        <ProductMeta>{product.category} {product.code && `- ${product.code}`}</ProductMeta>
                      </ProductInfo>
                    </MobileValue>
                    <MobileValue className="col-price">
                      <MobileLabel>Price</MobileLabel>
                      <div style={{ fontWeight: 600, color: '#0A2540' }}>
                        {formatCurrency(product.price, selectedCurrency)}
                      </div>
                    </MobileValue>
                    <MobileValue>
                      <MobileLabel>Recipe Status</MobileLabel>
                      <StatusBadge hasRecipe={product.has_recipe}>
                        {product.has_recipe ? 'Linked' : 'No Recipe'}
                      </StatusBadge>
                    </MobileValue>
                    <MobileValue className="col-cost">
                      <MobileLabel>Ingredient Cost</MobileLabel>
                      <div style={{ color: product.has_recipe ? '#0A2540' : '#9CA3AF' }}>
                        {product.has_recipe ? formatCurrency(product.ingredient_cost, selectedCurrency) : '-'}
                      </div>
                    </MobileValue>
                    <MobileValue className="col-money">
                      <MobileLabel>Profit Margin</MobileLabel>
                      {product.profit_margin ? (
                        <ProfitBadge profit={parseFloat(product.profit_margin)}>
                          {product.profit_margin}%
                        </ProfitBadge>
                      ) : (
                        <span style={{ color: '#9CA3AF' }}>-</span>
                      )}
                    </MobileValue>
                  </MobileGrid>
                  <ActionButtons>
                    <Button
                      variant="primary"
                      onClick={() => openRecipeModal(product)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      {product.has_recipe ? 'Edit' : 'Create'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => openLinkModal(product)}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      Link
                    </Button>
                  </ActionButtons>
                </TableRow>
              ))}
            </Table>
          )}
        </Content>
      </Container>

      {/* Recipe Edit Modal */}
      <Modal
        isOpen={showRecipeModal}
        onClose={() => setShowRecipeModal(false)}
        title={`Recipe: ${selectedProduct?.name || ''}`}
        size="large"
      >
        {selectedProduct && (
          <>
            <InfoBox>
              Add ingredients required to make this product. Costs are calculated automatically.
            </InfoBox>

            <div style={{ marginBottom: '16px' }}>
              <strong>Product Price:</strong> {formatCurrency(selectedProduct.price, selectedCurrency)}
            </div>

            {recipeIngredients.length > 0 && (
              <IngredientList>
                {recipeIngredients.map((ri, index) => (
                  <IngredientRow key={index}>
                    <IngredientInfo>
                      <div style={{ fontWeight: 600 }}>{ri.ingredient_name}</div>
                      <div style={{ fontSize: '13px', color: '#6B7280' }}>
                        {ri.quantity} {ri.unit} x {formatCurrency(ri.unit_cost || 0, selectedCurrency)}
                      </div>
                    </IngredientInfo>
                    <div style={{ fontWeight: 600, marginRight: '16px' }}>
                      {formatCurrency(ri.total_cost || 0, selectedCurrency)}
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeIngredient(index)}
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                    >
                      Remove
                    </Button>
                  </IngredientRow>
                ))}
              </IngredientList>
            )}

            <AddIngredientRow>
              <FormSelect
                value={newIngredientId}
                onChange={(e) => {
                  setNewIngredientId(e.target.value);
                  const ing = ingredients.find(i => i.id === parseInt(e.target.value));
                  if (ing) setNewUnit(ing.unit);
                }}
              >
                <option value="">Select Ingredient</option>
                {ingredients.map(ing => {
                  const costPerUnit = ing.unit_cost / (ing.base_quantity || 1);
                  return (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({formatCurrency(costPerUnit, selectedCurrency)}/{ing.unit})
                    </option>
                  );
                })}
              </FormSelect>
              <FormInput
                type="number"
                step="0.01"
                min="0"
                placeholder="Quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
              <FormInput
                type="text"
                placeholder="Unit"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
              />
              <Button variant="primary" onClick={addIngredient}>
                Add
              </Button>
            </AddIngredientRow>

            <CostSummary>
              <CostRow>
                <span>Total Ingredient Cost:</span>
                <span>{formatCurrency(calculateTotalCost(), selectedCurrency)}</span>
              </CostRow>
              <CostRow>
                <span>Product Price:</span>
                <span>{formatCurrency(selectedProduct.price, selectedCurrency)}</span>
              </CostRow>
              <CostRow>
                <span>Profit Margin:</span>
                <span>
                  {selectedProduct.price > 0
                    ? `${((selectedProduct.price - calculateTotalCost()) / selectedProduct.price * 100).toFixed(1)}%`
                    : '0%'}
                </span>
              </CostRow>
            </CostSummary>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <ModalButton variant="secondary" onClick={() => setShowRecipeModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleSaveRecipe} disabled={saving}>
                {saving ? 'Saving...' : 'Save Recipe'}
              </ModalButton>
            </div>
          </>
        )}
      </Modal>

      {/* Link Recipe Modal */}
      <Modal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        title={`Link Recipe: ${selectedProduct?.name || ''}`}
        size="medium"
      >
        {selectedProduct && (
          <>
            <InfoBox>
              Select an existing recipe to link to this product, or choose "No Recipe" to remove the current link.
            </InfoBox>

            <UIFormGroup>
              <FormLabel>Select Recipe</FormLabel>
              <FormSelect
                value={selectedRecipeId}
                onChange={(e) => setSelectedRecipeId(e.target.value)}
              >
                <option value="">No Recipe</option>
                {availableRecipes.map(recipe => (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name} {recipe.owner_type === 'brand' ? '(Brand)' : ''} - {formatCurrency(recipe.total_ingredient_cost, selectedCurrency)}
                  </option>
                ))}
              </FormSelect>
            </UIFormGroup>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <ModalButton variant="secondary" onClick={() => setShowLinkModal(false)}>
                Cancel
              </ModalButton>
              <ModalButton variant="primary" onClick={handleLinkRecipe} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </ModalButton>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default ProductRecipePage;
