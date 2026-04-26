import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Container, Header, Title, Content,
  FormGroup, FormLabel, FormInput, FormSelect, FormTextArea
} from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import DateField from '../../components/Common/DateField';
import { getAuthToken } from '../../utils/auth';

type SellerType = 'system' | 'brand' | 'foodcourt' | 'supplier';

interface SellerOption {
  seller_id: number;
  seller_type: SellerType;
  seller_name: string;
  contract_id?: number | null;
  contract_status?: 'active' | 'requested' | 'rejected' | 'terminated' | null;
  product_count?: number;
  currency?: string;
}

interface SellerProductOption {
  id: number;                    // seller product id
  ingredient_id: number;
  product_name: string;
  unit?: string;
  unit_price: number | string;
  pack_size?: number | string | null;
  moq?: number | string | null;
}

interface IngredientOption {
  id: number;
  name: string;
  unit?: string;
  par_level?: number | string | null;
  current_stock?: number | string | null;
  suggested_quantity?: number | string | null;
}

interface OrderRow {
  rowKey: string;
  ingredient_id: number;
  ingredient_name: string;
  ingredient_unit?: string;
  seller_product_id: number | null;
  seller_product_options: SellerProductOption[];
  quantity: number;
  unit_price: number;
  par_suggested?: number | null;
}

const Subtitle = styled.div`
  color: #6B7280;
  font-size: 14px;
  margin-top: 4px;
`;

const Stepper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  flex-wrap: wrap;
`;

const StepDot = styled.div<{ active?: boolean; done?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${(p) => p.active ? '#0A2540' : p.done ? '#10B981' : '#9CA3AF'};
  font-weight: ${(p) => p.active ? 600 : 500};

  &::before {
    content: '';
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${(p) => p.active ? '#635BFF' : p.done ? '#10B981' : '#E6EBF1'};
    color: white;
    text-align: center;
    line-height: 24px;
    font-weight: 700;
    font-size: 12px;
  }
`;

const StepConnector = styled.div`
  flex: 1;
  min-width: 24px;
  height: 2px;
  background: #E6EBF1;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;

  h2 {
    margin: 0 0 4px;
    font-size: 18px;
    color: #0A2540;
  }
  p.hint {
    margin: 0 0 20px;
    font-size: 13px;
    color: #6B7280;
  }
`;

const SellerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
`;

const SellerCard = styled.button<{ selected?: boolean }>`
  text-align: left;
  background: white;
  border: 2px solid ${(p) => p.selected ? '#635BFF' : '#E6EBF1'};
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.15s;

  &:hover {
    border-color: ${(p) => p.selected ? '#635BFF' : '#9CA3AF'};
  }
`;

const TypeBadge = styled.span<{ variant?: SellerType }>`
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: ${(p) => {
    switch (p.variant) {
      case 'system': return '#EEF2FF';
      case 'brand': return '#ECFEFF';
      case 'foodcourt': return '#FEF3C7';
      case 'supplier': return '#DCFCE7';
      default: return '#F3F4F6';
    }
  }};
  color: ${(p) => {
    switch (p.variant) {
      case 'system': return '#3730A3';
      case 'brand': return '#0E7490';
      case 'foodcourt': return '#92400E';
      case 'supplier': return '#166534';
      default: return '#374151';
    }
  }};
`;

const ItemTable = styled.div`
  border: 1px solid #E6EBF1;
  border-radius: 10px;
  overflow: hidden;
`;

const ItemRow = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1.4fr 90px 110px 110px 60px;
  gap: 8px;
  padding: 10px 12px;
  align-items: center;
  border-bottom: 1px solid #F3F4F6;

  &:last-child { border-bottom: none; }
  &.header {
    background: #F8FAFC;
    font-size: 12px;
    font-weight: 600;
    color: #6B7280;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 6px;
    padding: 12px;
  }
`;

const SmallInput = styled.input`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 2px rgba(99, 91, 255, 0.1);
  }
`;

const SmallSelect = styled.select`
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #E6EBF1;
  border-radius: 6px;
  font-size: 13px;
  background: white;
`;

const SearchBox = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const SearchResults = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #E6EBF1;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 8px 16px rgba(0,0,0,0.06);
`;

const SearchItem = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  border: none;
  background: white;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
  font-family: inherit;

  &:hover { background: #F8FAFC; }

  small { color: #6B7280; }
`;

const Subtotal = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  color: #0A2540;
  border-top: 1px solid #E6EBF1;
  background: #F8FAFC;
`;

const FooterBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const ErrorBox = styled.div`
  padding: 10px 14px;
  background: #FEF2F2;
  border: 1px solid #FCA5A5;
  border-radius: 8px;
  color: #DC2626;
  font-size: 13px;
  margin-bottom: 12px;
`;

const ReviewKv = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 8px 16px;
  font-size: 14px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const KvKey = styled.div`
  color: #6B7280;
  font-size: 13px;
`;

const KvValue = styled.div`
  color: #0A2540;
`;

const TotalsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: #F8FAFC;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  max-width: 320px;
  margin-left: auto;

  > div {
    display: flex;
    justify-content: space-between;
    color: #374151;
  }
  > div.total {
    border-top: 1px solid #E6EBF1;
    padding-top: 8px;
    margin-top: 4px;
    font-weight: 700;
    color: #0A2540;
    font-size: 16px;
  }
`;

const NewPurchaseOrderPage: React.FC = () => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const prefSellerId = searchParams.get('sellerId');
  const prefSellerType = searchParams.get('sellerType');
  const prefItemsRaw = searchParams.get('items');

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [sellers, setSellers] = useState<SellerOption[]>([]);
  const [sellerLoading, setSellerLoading] = useState(true);
  const [sellerSearch, setSellerSearch] = useState('');
  const [selectedSeller, setSelectedSeller] = useState<SellerOption | null>(null);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [ingredientResults, setIngredientResults] = useState<IngredientOption[]>([]);
  const [ingredientFocused, setIngredientFocused] = useState(false);
  const [orderRows, setOrderRows] = useState<OrderRow[]>([]);

  const [expectedDate, setExpectedDate] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Step 1: load seller catalog
  const fetchSellerCatalog = useCallback(async () => {
    setSellerLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/seller-catalog', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSellers([]);
        return;
      }
      const list: SellerOption[] = Array.isArray(data.data) ? data.data : [];
      setSellers(list);

      // Pre-select if URL provided sellerId
      if (prefSellerId && prefSellerType) {
        const match = list.find(s =>
          String(s.seller_id) === prefSellerId && s.seller_type === prefSellerType
        );
        if (match) {
          setSelectedSeller(match);
          setStep(2);
        }
      }
    } catch (err) {
      console.error('Failed to fetch seller catalog:', err);
      setSellers([]);
    } finally {
      setSellerLoading(false);
    }
  }, [prefSellerId, prefSellerType]);

  useEffect(() => { fetchSellerCatalog(); }, [fetchSellerCatalog]);

  // Step 2: ingredient search (debounced via simple effect)
  useEffect(() => {
    if (!ingredientFocused) return;
    const term = ingredientSearch.trim();
    const handle = setTimeout(async () => {
      try {
        const token = getAuthToken();
        const params = new URLSearchParams();
        if (term) params.set('search', term);
        params.set('limit', '20');
        const res = await fetch(`/api/ingredients?${params.toString()}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && data.success) {
          const list = Array.isArray(data.data) ? data.data : (Array.isArray(data.ingredients) ? data.ingredients : []);
          setIngredientResults(list);
        }
      } catch (err) {
        console.error('Failed to search ingredients:', err);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [ingredientSearch, ingredientFocused]);

  // Fetch seller products for an ingredient when adding a row
  const fetchSellerProductsForIngredient = useCallback(async (ingredientId: number): Promise<SellerProductOption[]> => {
    if (!selectedSeller) return [];
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();
      params.set('ingredient_id', String(ingredientId));
      params.set('seller_id', String(selectedSeller.seller_id));
      params.set('seller_type', selectedSeller.seller_type);
      const res = await fetch(`/api/seller-catalog/products?${params.toString()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return Array.isArray(data.data) ? data.data : [];
      }
    } catch (err) {
      console.error('Failed to fetch seller products:', err);
    }
    return [];
  }, [selectedSeller]);

  const addRow = useCallback(async (ing: IngredientOption) => {
    const products = await fetchSellerProductsForIngredient(ing.id);
    const firstProduct = products[0];
    const par = ing.suggested_quantity != null ? Number(ing.suggested_quantity) : null;
    setOrderRows(prev => [
      ...prev,
      {
        rowKey: `r-${Date.now()}-${ing.id}`,
        ingredient_id: ing.id,
        ingredient_name: ing.name,
        ingredient_unit: ing.unit,
        seller_product_id: firstProduct ? firstProduct.id : null,
        seller_product_options: products,
        quantity: par && par > 0 ? par : 1,
        unit_price: firstProduct ? Number(firstProduct.unit_price) : 0,
        par_suggested: par
      }
    ]);
    setIngredientSearch('');
    setIngredientResults([]);
    setIngredientFocused(false);
  }, [fetchSellerProductsForIngredient]);

  // Apply prefilled items from URL once seller + ingredient catalog ready
  const [prefApplied, setPrefApplied] = useState(false);
  useEffect(() => {
    if (prefApplied || !selectedSeller || !prefItemsRaw) return;
    try {
      const decoded = decodeURIComponent(prefItemsRaw);
      const parsed: Array<{ ingredient_id: number; quantity: number }> = JSON.parse(decoded);
      if (!Array.isArray(parsed)) { setPrefApplied(true); return; }
      (async () => {
        for (const it of parsed) {
          const products = await fetchSellerProductsForIngredient(it.ingredient_id);
          const firstProduct = products[0];
          // Need ingredient name — fetch by id
          const token = getAuthToken();
          let name = `Ingredient #${it.ingredient_id}`;
          let unit = '';
          try {
            const res = await fetch(`/api/ingredients/${it.ingredient_id}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok && data.success && data.data) {
              name = data.data.name || name;
              unit = data.data.unit || '';
            }
          } catch { /* noop */ }
          setOrderRows(prev => [
            ...prev,
            {
              rowKey: `r-${Date.now()}-${it.ingredient_id}-${Math.random()}`,
              ingredient_id: it.ingredient_id,
              ingredient_name: name,
              ingredient_unit: unit,
              seller_product_id: firstProduct ? firstProduct.id : null,
              seller_product_options: products,
              quantity: Number(it.quantity) || 1,
              unit_price: firstProduct ? Number(firstProduct.unit_price) : 0,
              par_suggested: Number(it.quantity) || null
            }
          ]);
        }
      })();
      setPrefApplied(true);
    } catch (err) {
      console.error('Failed to parse prefilled items:', err);
      setPrefApplied(true);
    }
  }, [selectedSeller, prefItemsRaw, prefApplied, fetchSellerProductsForIngredient]);

  const updateRow = (rowKey: string, patch: Partial<OrderRow>) => {
    setOrderRows(prev => prev.map(r => r.rowKey === rowKey ? { ...r, ...patch } : r));
  };

  const removeRow = (rowKey: string) => {
    setOrderRows(prev => prev.filter(r => r.rowKey !== rowKey));
  };

  const onSelectProduct = (rowKey: string, productId: number) => {
    const row = orderRows.find(r => r.rowKey === rowKey);
    if (!row) return;
    const product = row.seller_product_options.find(p => p.id === productId);
    if (!product) {
      updateRow(rowKey, { seller_product_id: productId });
      return;
    }
    updateRow(rowKey, {
      seller_product_id: productId,
      unit_price: Number(product.unit_price)
    });
  };

  const subtotal = useMemo(() =>
    orderRows.reduce((sum, r) => sum + (r.quantity * r.unit_price), 0),
    [orderRows]
  );
  const tax = 0; // Tax handled at PO level on backend if applicable; UI shows 0 for now
  const total = subtotal + tax;

  const filteredSellers = useMemo(() => {
    const term = sellerSearch.trim().toLowerCase();
    if (!term) return sellers;
    return sellers.filter(s => (s.seller_name || '').toLowerCase().includes(term));
  }, [sellers, sellerSearch]);

  const goNext = () => {
    setError(null);
    if (step === 1) {
      if (!selectedSeller) {
        setError(t('new.errors.selectSeller') as string);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (orderRows.length === 0) {
        setError(t('new.errors.noItems') as string);
        return;
      }
      for (const r of orderRows) {
        if (!r.seller_product_id) {
          setError(t('new.errors.missingProduct') as string);
          return;
        }
        if (!(r.quantity > 0)) {
          setError(t('new.errors.invalidQty') as string);
          return;
        }
      }
      setStep(3);
    }
  };

  const goPrev = () => {
    setError(null);
    if (step > 1) setStep((step - 1) as 1 | 2 | 3);
  };

  const buildPayload = () => ({
    seller_id: selectedSeller!.seller_id,
    seller_type: selectedSeller!.seller_type,
    contract_id: selectedSeller!.contract_id || null,
    expected_delivery_date: expectedDate || null,
    delivery_address: deliveryAddress.trim() || null,
    notes: notes.trim() || null,
    items: orderRows.map(r => ({
      ingredient_id: r.ingredient_id,
      seller_product_id: r.seller_product_id,
      quantity: Number(r.quantity),
      unit_price: Number(r.unit_price)
    }))
  });

  const submitPO = async (mode: 'draft' | 'submit') => {
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/purchase-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(buildPayload())
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data?.message || (t('new.errors.createFailed') as string));
        setSubmitting(false);
        return;
      }
      const newId = data.data?.id;
      if (mode === 'submit' && newId) {
        const sres = await fetch(`/api/purchase-orders/${newId}/submit`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const sdata = await sres.json();
        if (!sres.ok || !sdata.success) {
          setError(sdata?.message || (t('new.errors.submitFailed') as string));
          setSubmitting(false);
          return;
        }
      }
      navigate(newId ? `/pos/purchase-orders/${newId}` : '/pos/purchase-orders');
    } catch (err) {
      console.error('Failed to create PO:', err);
      setError(t('new.errors.createFailed') as string);
      setSubmitting(false);
    }
  };

  const renderStepHeader = () => (
    <Stepper>
      <StepDot active={step === 1} done={step > 1}>{t('new.step.seller')}</StepDot>
      <StepConnector />
      <StepDot active={step === 2} done={step > 2}>{t('new.step.items')}</StepDot>
      <StepConnector />
      <StepDot active={step === 3}>{t('new.step.review')}</StepDot>
    </Stepper>
  );

  const renderStep1 = () => (
    <Card>
      <h2>{t('new.seller.title')}</h2>
      <p className="hint">{t('new.seller.subtitle')}</p>

      <FormGroup>
        <FormInput
          type="text"
          placeholder={t('new.seller.search') as string}
          value={sellerSearch}
          onChange={(e) => setSellerSearch(e.target.value)}
        />
      </FormGroup>

      {sellerLoading ? (
        <div style={{ padding: 24, textAlign: 'center', color: '#6B7280' }}>
          {t('list.loading')}
        </div>
      ) : filteredSellers.length === 0 ? (
        <div style={{
          padding: 32,
          textAlign: 'center',
          background: '#F8FAFC',
          border: '1px solid #E6EBF1',
          borderRadius: 10
        }}>
          <div style={{ fontWeight: 600, color: '#374151', marginBottom: 6 }}>
            {t('new.seller.noSellers')}
          </div>
          <div style={{ fontSize: 13, color: '#6B7280' }}>
            {t('new.seller.noSellersHint')}
          </div>
        </div>
      ) : (
        <SellerGrid>
          {filteredSellers.map(s => {
            const selected = selectedSeller?.seller_id === s.seller_id && selectedSeller?.seller_type === s.seller_type;
            return (
              <SellerCard
                key={`${s.seller_type}-${s.seller_id}`}
                type="button"
                selected={selected}
                onClick={() => setSelectedSeller(s)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <strong style={{ color: '#0A2540', fontSize: 15 }}>{s.seller_name}</strong>
                  <TypeBadge variant={s.seller_type}>{t(`new.seller.type.${s.seller_type}`)}</TypeBadge>
                </div>
                {s.product_count != null && (
                  <div style={{ fontSize: 12, color: '#6B7280' }}>
                    {t('list.suggestions.ingredient')}: {s.product_count}
                  </div>
                )}
                {s.seller_type === 'supplier' && (
                  <div style={{ fontSize: 12 }}>
                    <TypeBadge variant={s.contract_status === 'active' ? 'supplier' : 'foodcourt'}>
                      {s.contract_status === 'active' ? t('new.seller.contractActive') : t('new.seller.contractRequired')}
                    </TypeBadge>
                  </div>
                )}
              </SellerCard>
            );
          })}
        </SellerGrid>
      )}
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <h2>{t('new.items.title')}</h2>
      <p className="hint">{t('new.items.subtitle')}</p>

      <SearchBox>
        <FormInput
          type="text"
          placeholder={t('new.items.search') as string}
          value={ingredientSearch}
          onChange={(e) => setIngredientSearch(e.target.value)}
          onFocus={() => setIngredientFocused(true)}
          onBlur={() => setTimeout(() => setIngredientFocused(false), 200)}
        />
        {ingredientFocused && ingredientResults.length > 0 && (
          <SearchResults>
            {ingredientResults.map(ing => (
              <SearchItem
                key={ing.id}
                type="button"
                onMouseDown={(e) => { e.preventDefault(); addRow(ing); }}
              >
                <span>{ing.name}</span>
                <small>
                  {ing.unit && `${ing.unit}`}
                  {ing.suggested_quantity != null && Number(ing.suggested_quantity) > 0 &&
                    ` · ${t('new.items.parSuggested', { n: Number(ing.suggested_quantity).toFixed(2) })}`}
                </small>
              </SearchItem>
            ))}
          </SearchResults>
        )}
      </SearchBox>

      <ItemTable>
        <ItemRow className="header">
          <div>{t('new.items.ingredient')}</div>
          <div>{t('new.items.sellerProduct')}</div>
          <div>{t('new.items.quantity')}</div>
          <div>{t('new.items.unitPrice')}</div>
          <div>{t('new.items.lineTotal')}</div>
          <div></div>
        </ItemRow>
        {orderRows.length === 0 ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#6B7280', fontSize: 13 }}>
            {t('new.items.noItemsHint')}
          </div>
        ) : (
          orderRows.map(row => (
            <ItemRow key={row.rowKey}>
              <div>
                <strong style={{ fontSize: 13 }}>{row.ingredient_name}</strong>
                {row.ingredient_unit && (
                  <div style={{ fontSize: 11, color: '#6B7280' }}>{row.ingredient_unit}</div>
                )}
              </div>
              <div>
                {row.seller_product_options.length === 0 ? (
                  <span style={{ fontSize: 12, color: '#DC2626' }}>{t('new.items.noProductMatch')}</span>
                ) : (
                  <SmallSelect
                    value={row.seller_product_id ?? ''}
                    onChange={(e) => onSelectProduct(row.rowKey, Number(e.target.value))}
                  >
                    <option value="" disabled>{t('new.items.selectProduct')}</option>
                    {row.seller_product_options.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.product_name}
                        {p.pack_size ? ` (${p.pack_size}${p.unit || ''})` : ''}
                      </option>
                    ))}
                  </SmallSelect>
                )}
              </div>
              <div>
                <SmallInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={row.quantity}
                  onChange={(e) => updateRow(row.rowKey, { quantity: Number(e.target.value) })}
                />
              </div>
              <div>
                <SmallInput
                  type="number"
                  step="0.01"
                  min="0"
                  value={row.unit_price}
                  onChange={(e) => updateRow(row.rowKey, { unit_price: Number(e.target.value) })}
                />
              </div>
              <div style={{ textAlign: 'right', fontWeight: 600, color: '#0A2540' }}>
                {(row.quantity * row.unit_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div>
                <ThemedButton
                  size="small"
                  variant="danger-outline"
                  onClick={() => removeRow(row.rowKey)}
                >
                  ×
                </ThemedButton>
              </div>
            </ItemRow>
          ))
        )}
        <Subtotal>
          <span>{t('new.items.subtotal')}:</span>
          <span>{selectedSeller?.currency || 'MYR'} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </Subtotal>
      </ItemTable>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <h2>{t('new.review.title')}</h2>
      <p className="hint">{t('new.review.subtitle')}</p>

      <ReviewKv>
        <KvKey>{t('new.review.sellerInfo')}</KvKey>
        <KvValue>
          <strong>{selectedSeller?.seller_name}</strong>
          {selectedSeller && (
            <span style={{ marginLeft: 8 }}>
              <TypeBadge variant={selectedSeller.seller_type}>
                {t(`new.seller.type.${selectedSeller.seller_type}`)}
              </TypeBadge>
            </span>
          )}
        </KvValue>
      </ReviewKv>

      <ItemTable>
        <ItemRow className="header">
          <div>{t('new.items.ingredient')}</div>
          <div>{t('new.items.sellerProduct')}</div>
          <div>{t('new.items.quantity')}</div>
          <div>{t('new.items.unitPrice')}</div>
          <div>{t('new.items.lineTotal')}</div>
          <div></div>
        </ItemRow>
        {orderRows.map(row => {
          const product = row.seller_product_options.find(p => p.id === row.seller_product_id);
          return (
            <ItemRow key={row.rowKey}>
              <div>{row.ingredient_name}</div>
              <div>{product?.product_name || '-'}</div>
              <div>{row.quantity}</div>
              <div>{Number(row.unit_price).toFixed(2)}</div>
              <div style={{ textAlign: 'right', fontWeight: 600 }}>
                {(row.quantity * row.unit_price).toFixed(2)}
              </div>
              <div></div>
            </ItemRow>
          );
        })}
      </ItemTable>

      <div style={{ height: 20 }} />

      <FormGroup>
        <FormLabel>{t('new.review.expectedDelivery')}</FormLabel>
        <DateField value={expectedDate} onChange={setExpectedDate} />
      </FormGroup>

      <FormGroup>
        <FormLabel>{t('new.review.deliveryAddress')}</FormLabel>
        <FormTextArea
          rows={2}
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          placeholder={t('new.review.deliveryAddressPlaceholder') as string}
        />
      </FormGroup>

      <FormGroup>
        <FormLabel>{t('new.review.notes')}</FormLabel>
        <FormTextArea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={t('new.review.notesPlaceholder') as string}
        />
      </FormGroup>

      <TotalsBox>
        <div>
          <span>{t('new.review.subtotal')}</span>
          <span>{selectedSeller?.currency || 'MYR'} {subtotal.toFixed(2)}</span>
        </div>
        <div>
          <span>{t('new.review.tax')}</span>
          <span>{selectedSeller?.currency || 'MYR'} {tax.toFixed(2)}</span>
        </div>
        <div className="total">
          <span>{t('new.review.total')}</span>
          <span>{selectedSeller?.currency || 'MYR'} {total.toFixed(2)}</span>
        </div>
      </TotalsBox>
    </Card>
  );

  return (
    <Container>
      <Header>
        <div>
          <Title>{t('new.title')}</Title>
          <Subtitle>{t('new.stepLabel', { current: step, total: 3 })}</Subtitle>
        </div>
        <ThemedButton
          variant="outline"
          onClick={() => navigate('/pos/purchase-orders')}
        >
          {t('new.back')}
        </ThemedButton>
      </Header>

      <Content>
        {renderStepHeader()}

        {error && <ErrorBox>{error}</ErrorBox>}

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <FooterBar>
          <div>
            {step > 1 && (
              <ThemedButton variant="outline" onClick={goPrev} disabled={submitting}>
                {t('new.previous')}
              </ThemedButton>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {step < 3 && (
              <ThemedButton variant="primary" onClick={goNext}>
                {t('new.next')}
              </ThemedButton>
            )}
            {step === 3 && (
              <>
                <ThemedButton
                  variant="outline"
                  onClick={() => submitPO('draft')}
                  disabled={submitting}
                >
                  {submitting ? t('common.saving') : t('new.saveDraft')}
                </ThemedButton>
                <ThemedButton
                  variant="primary"
                  onClick={() => submitPO('submit')}
                  disabled={submitting}
                >
                  {submitting ? t('common.submitting') : t('new.submit')}
                </ThemedButton>
              </>
            )}
          </div>
        </FooterBar>
      </Content>
    </Container>
  );
};

export default NewPurchaseOrderPage;
