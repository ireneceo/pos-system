import { useState, useCallback } from 'react';
import { IngredientStock } from '../types';
import { AuthFetch } from './useAuthFetch';

/**
 * 준비된 재고 «만들기» (2026-09-17 Fable 판정)
 *
 * 준비 재료는 사는 물건이 아니라 **만드는 물건**이라 «입고» 대신 «만들기» 를 쓴다.
 * 한 번 확인하면 서버가 한 트랜잭션에서 원재료를 빼고, 준비 재료를 늘리고, 장부와 원가까지 맞춘다.
 * 화면은 그 전에 «무엇이 얼마나 빠지는지» 를 미리 보여 주기만 한다.
 */
export interface ProduceConsumeRow {
  ingredient_id: number;
  name: string;
  unit: string;
  needed: number;
  current_stock: number;
  short_by: number;
}

export interface ProducePreview {
  ingredient: { id: number; name: string; unit: string };
  recipe: { id: number; name: string; yield_amount: number; yield_unit: string };
  batches: number;
  expected_yield: number;
  consumes: ProduceConsumeRow[];
  has_shortage: boolean;
}

interface Params {
  restaurantId?: number;
  authFetch: AuthFetch;
  onDone: () => void;
  /** 오류 문구 번역기 — 훅에 한글을 박으면 4개 언어 화면에서 한국어가 샌다 */
  t: (key: string, fallback: string) => string;
}

export function useProduceModal({ restaurantId, authFetch, onDone, t }: Params) {
  const [isOpen, setIsOpen] = useState(false);
  const [ingredient, setIngredient] = useState<IngredientStock | null>(null);
  const [batches, setBatches] = useState('1');
  const [actualYield, setActualYield] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [preview, setPreview] = useState<ProducePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPreview = useCallback(async (ingredientId: number, count: number) => {
    if (!restaurantId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch(
        `/api/restaurants/${restaurantId}/inventory/produce-preview?ingredient_id=${ingredientId}&batches=${count}`
      );
      const body = await res.json();
      if (body?.success) {
        setPreview(body.data);
        // 실제로 나온 양의 기본값 = 수율 × 판수. 사람이 고칠 수 있다.
        setActualYield(String(body.data?.expected_yield ?? ''));
      } else {
        setError(body?.message || t('inventory:produce.previewFailed', '미리보기를 불러오지 못했습니다'));
      }
    } catch (e: any) {
      setError(e?.message || t('inventory:produce.previewFailed', '미리보기를 불러오지 못했습니다'));
    } finally {
      setLoading(false);
    }
  }, [restaurantId, authFetch, t]);

  const open = useCallback((ing: IngredientStock) => {
    setIngredient(ing);
    setBatches('1');
    setActualYield('');
    setExpiryDate('');
    setPreview(null);
    setError(null);
    setIsOpen(true);
    loadPreview(ing.id, 1);
  }, [loadPreview]);

  const close = useCallback(() => {
    setIsOpen(false);
    setIngredient(null);
    setPreview(null);
    setError(null);
  }, []);

  const changeBatches = useCallback((value: string) => {
    setBatches(value);
    const n = Number(value);
    if (ingredient && n > 0) loadPreview(ingredient.id, n);
  }, [ingredient, loadPreview]);

  const confirm = useCallback(async () => {
    if (!restaurantId || !ingredient || saving) return;
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch(`/api/restaurants/${restaurantId}/inventory/produce`, {
        method: 'POST',
        body: JSON.stringify({
          ingredient_id: ingredient.id,
          batches: Number(batches) || 1,
          actual_yield: actualYield === '' ? undefined : Number(actualYield),
          expiry_date: expiryDate || undefined,
        }),
      });
      const body = await res.json();
      if (!res.ok || !body?.success) {
        setError(body?.message || t('inventory:produce.failed', '만들기에 실패했습니다'));
        return;
      }
      close();
      onDone();
    } catch (e: any) {
      setError(e?.message || t('inventory:produce.failed', '만들기에 실패했습니다'));
    } finally {
      setSaving(false);
    }
  }, [restaurantId, ingredient, batches, actualYield, expiryDate, authFetch, close, onDone, saving, t]);

  return {
    isOpen, ingredient, batches, actualYield, expiryDate, preview, loading, saving, error,
    open, close, confirm,
    setBatches: changeBatches,
    setActualYield,
    setExpiryDate,
  };
}
