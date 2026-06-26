/**
 * Brand Menus — BG main page.
 *
 * Manages menu templates that BG pushes to franchise restaurants.
 * Each card shows: image, name, recommended price, category, lock badge (🔒N),
 * distribution summary (synced/pending/unlinked counts).
 *
 * Distinct from BrandProducts (BG's supply catalog). Names follow the Brand Menu
 * terminology — never "Product" in this domain.
 */
import React, { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Lock, Building2, Edit2, Copy, Trash2, Send, ChevronDown, UtensilsCrossed, Clock, Info, ArrowRight, Target, GripVertical } from 'lucide-react';
import PageHeader from '../../components/Common/PageHeader';
import { Modal as CommonModal, FormGroup as UIFormGroup, FormLabel, FormInput, FormSelect, FormTextArea } from '../../components/UI';
import SearchableSelect from '../../components/Common/SearchableSelect';
import SetMenuBuilder from '../../components/MenuManagement/SetMenuBuilder';
import { SetGroup } from '../../utils/setMenu';
import { SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
import ListControlsBar from '../../components/Common/ListControlsBar';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ImageUploadDropzone from '../../components/Common/ImageUploadDropzone';
import { getAuthToken } from '../../utils/auth';
import { formatCurrency } from '../../utils/currency';
import BrandMenuCategoriesPage from './BrandMenuCategoriesPage';
import BrandMenuOptionGroupsPage from './BrandMenuOptionGroupsPage';
import ConfirmModal from '../../components/ConfirmModal';
import AutoSaveField from '../../components/Common/AutoSaveField';
import SortDropdown, { SortKey, sortItems } from '../../components/Common/SortDropdown';

type Tab = 'menus' | 'categories' | 'options' | 'settings';

interface MenuSettings {
  default_distribution_mode: 'auto' | 'manual';
  default_locks: { name: boolean; price: boolean; category: boolean; image: boolean; options: boolean };
  default_push_target: 'all' | 'selected';
  default_scope: 'all' | 'selected';
  // 브랜드 전체 — 켜면 산하 모든 매장이 브랜드 메뉴 순서를 따르고 매장이 못 바꿈 (메뉴별 토글 대체)
  enforce_menu_order: boolean;
}

const SettingsCard = styled.div`
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  @media (max-width: 768px) { padding: 16px; }
`;

const IntroCard = styled.div`
  background: linear-gradient(135deg, #F8F7FF 0%, #FFFFFF 100%);
  border: 1px solid #E6E3FF;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  @media (max-width: 768px) { padding: 16px; }
`;

const IntroTitle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
  svg { width: 16px; height: 16px; color: #635BFF; }
`;

const IntroBody = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #374151;
`;

const Glossary = styled.dl`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 6px 12px;
  margin: 12px 0 0 0;
  font-size: 12px;
  dt { color: #635BFF; font-weight: 600; }
  dd { color: #4B5563; margin: 0; }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2px 0;
    dt { margin-top: 6px; }
  }
`;

const WarningBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 10px 12px;
  margin-top: 10px;
  font-size: 12px;
  color: #92400E;
  line-height: 1.5;
  svg { width: 14px; height: 14px; color: #D97706; flex-shrink: 0; margin-top: 1px; }
`;

const ScenarioHint = styled.div`
  font-size: 11px;
  color: #635BFF;
  background: #F0EFFF;
  border-radius: 6px;
  padding: 6px 10px;
  margin-top: 6px;
  line-height: 1.5;
  display: inline-block;
`;

const SettingsSectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px 0;
`;

const SettingsSectionHint = styled.p`
  font-size: 12px;
  color: #4B5563;
  margin: 0 0 16px 0;
`;

const ToggleRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #F1F4F8;
  cursor: pointer;
  &:last-child { border-bottom: 0; }
  @media (max-width: 480px) { gap: 8px; }
`;

const ToggleInfo = styled.div`
  flex: 1;
  font-size: 13px;
  color: #0A2540;
  strong { font-weight: 500; }
  div { font-size: 12px; color: #4B5563; margin-top: 2px; }
`;

const Switch = styled.input`
  appearance: none;
  width: 36px;
  height: 20px;
  border-radius: 999px;
  background: #C7CED6;
  position: relative;
  cursor: pointer;
  transition: background 0.15s;
  flex-shrink: 0;
  &:checked { background: #635BFF; }
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: transform 0.15s;
  }
  &:checked::after { transform: translateX(16px); }
`;

const RadioRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 8px;
  font-size: 13px;
  color: #0A2540;
  &:hover { border-color: #635BFF; }
  input { accent-color: #635BFF; margin-top: 2px; flex-shrink: 0; }
  @media (max-width: 480px) { padding: 10px; }
`;

const TabBar = styled.div`
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #C7CED6;
  margin-bottom: 20px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar { display: none; }
`;

const TabBtn = styled.button<{ $active: boolean }>`
  background: transparent;
  border: 0;
  border-bottom: 2px solid ${p => p.$active ? '#635BFF' : 'transparent'};
  color: ${p => p.$active ? '#635BFF' : '#4B5563'};
  font-size: 14px;
  font-weight: ${p => p.$active ? 600 : 500};
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.15s;
  margin-bottom: -1px;
  white-space: nowrap;
  flex-shrink: 0;
  &:hover { color: #635BFF; }
`;

const HelperCard = styled.div`
  background: linear-gradient(135deg, #F8F7FF 0%, #FFFFFF 100%);
  border: 1px solid #E6E3FF;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 20px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  @media (max-width: 768px) { padding: 16px; gap: 12px; }
`;

const HelperIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #F0EFFF;
  color: #635BFF;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  svg { width: 18px; height: 18px; }
`;

const HelperTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #0A2540;
  margin-bottom: 6px;
`;

const HelperList = styled.ol`
  margin: 0 0 12px 0;
  padding-left: 20px;
  color: #374151;
  font-size: 13px;
  line-height: 1.7;
  li { margin-bottom: 2px; }
`;

const HelperLink = styled.button`
  background: transparent;
  border: 0;
  padding: 0;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  &:hover { text-decoration: underline; }
  svg { width: 12px; height: 12px; }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #F9FAFB;
`;

const Content = styled.main`
  padding: 24px 32px;
  @media (max-width: 768px) { padding: 16px; }
`;

const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  @media (max-width: 480px) { gap: 8px; }
`;

const BrandPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  color: #0A2540;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover { border-color: #635BFF; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const Card = styled.div<{ $dragging?: boolean; $dragOver?: boolean }>`
  background: white;
  border: 1px solid ${p => p.$dragOver ? '#635BFF' : '#C7CED6'};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.15s, box-shadow 0.15s, opacity 0.15s;
  opacity: ${p => p.$dragging ? 0.4 : 1};
  box-shadow: ${p => p.$dragOver ? '0 0 0 2px rgba(99,91,255,0.35)' : 'none'};
  &:hover { border-color: #635BFF; box-shadow: 0 2px 8px rgba(99, 91, 255, 0.06); }
`;

// 메뉴 순서 드래그 핸들 — 'Menu order(manual)' 정렬에서만 노출
const DragHandle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  color: #9CA3AF;
  cursor: grab;
  padding: 2px;
  margin-bottom: -6px;
  &:active { cursor: grabbing; }
  svg { width: 18px; height: 18px; }
  &:hover { color: #635BFF; }
`;

// 드래그 안내 배너
const ReorderHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4338CA;
  background: #F0EFFF;
  border: 1px solid #C7D2FE;
  border-radius: 8px;
  padding: 10px 14px;
  margin-top: 16px;
  svg { width: 15px; height: 15px; flex-shrink: 0; }
`;

const CardImage = styled.div<{ $src?: string | null }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${p => p.$src ? `url(${p.$src})` : '#F4F5F8'} center/cover no-repeat;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6B7280;
  svg { width: 32px; height: 32px; }
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0;
  line-height: 1.3;
  min-width: 0;
  flex: 1;
  word-break: break-word;
  overflow-wrap: anywhere;
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #4B5563;
`;

const LockBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #F0EFFF;
  color: #635BFF;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: help;
  svg { width: 12px; height: 12px; }
`;

const DistributionLine = styled.div`
  font-size: 12px;
  color: #4B5563;
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
`;

const DistItem = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${p => p.$color};
  font-weight: 500;
`;

const DistDot = styled.span<{ $bg: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.$bg};
  display: inline-block;
`;

const CardActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  border-top: 1px solid #F1F4F8;
  padding-top: 12px;
`;

const IconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 10px;
  background: transparent;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  color: #4B5563;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 0;
  white-space: nowrap;
  &:hover { border-color: #635BFF; color: #635BFF; }
  svg { width: 14px; height: 14px; flex-shrink: 0; }
`;

const EmptyState = styled.div`
  background: white;
  border: 1px dashed #C7CED6;
  border-radius: 12px;
  padding: 64px 24px;
  text-align: center;
  color: #4B5563;
  font-size: 14px;
  margin-top: 16px;
`;

const BrandSwitch = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #0A2540;
  cursor: pointer;
  &:hover { border-color: #635BFF; }
  svg { width: 14px; height: 14px; color: #4B5563; }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 100%;
  background: white;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div<{ $active?: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  color: ${p => p.$active ? '#635BFF' : '#0A2540'};
  background: ${p => p.$active ? '#F0EFFF' : 'white'};
  cursor: pointer;
  &:hover { background: #F0EFFF; }
`;

interface Brand { id: number; name: string; }
interface BrandMenu {
  id: number; brand_id: number; category_id: number | null;
  name: string; description: string | null;
  image_url: string | null; emoji: string | null;
  recommended_price: number; currency: string;
  version: number; distribution_mode: 'auto' | 'manual';
  scope_mode?: 'all' | 'selected';
  locks: { name: boolean; price: boolean; category: boolean; image: boolean; options: boolean; set_items?: boolean };
  is_set_menu?: boolean;
  set_items?: Array<{ brand_menu_id: number; name: string; quantity: number }> | null;
  category?: { id: number; name: string; emoji: string | null } | null;
  recipe?: { id: number; name: string; code: string } | null;
  distribution: { in_sync: number; pending_update: number; unlinked: number };
}

const authHeaders = () => {
  const t = getAuthToken();
  return t ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` } : { 'Content-Type': 'application/json' };
};

const BrandMenusPage: React.FC = () => {
  const { t } = useTranslation(['brand', 'common']);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab) || 'menus';
  const [tab, setTab] = useState<Tab>(
    initialTab === 'categories' || initialTab === 'options' || initialTab === 'settings' ? initialTab : 'menus'
  );

  const switchTab = (next: Tab) => {
    setTab(next);
    if (next === 'menus') {
      searchParams.delete('tab');
    } else {
      searchParams.set('tab', next);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(() => {
    const saved = localStorage.getItem('bg.selectedBrandId');
    return saved ? Number(saved) : null;
  });
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [menus, setMenus] = useState<BrandMenu[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>('newest');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMenu, setEditingMenu] = useState<BrandMenu | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pushConfirm, setPushConfirm] = useState<{ menuId: number; menuName: string } | null>(null);
  const [pushPicker, setPushPicker] = useState<{ menuId: number; menuName: string } | null>(null);
  const [scopePicker, setScopePicker] = useState<{ menuId: number; menuName: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ menuId: number; menuName: string } | null>(null);
  const [pushResult, setPushResult] = useState<{ menuId: number; pushed: number; created: number; updated: number } | null>(null);
  const [copyTarget, setCopyTarget] = useState<{ menuId: number; menuName: string } | null>(null);
  const [copyToBrandId, setCopyToBrandId] = useState<number | null>(null);
  const [copyIncludeLocks, setCopyIncludeLocks] = useState(false);
  const [copying, setCopying] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [menuSettings, setMenuSettings] = useState<MenuSettings | null>(null);
  const [listCategories, setListCategories] = useState<Array<{ id: number; name: string }>>([]);

  // Load categories for the brand-menu list filter dropdown.
  useEffect(() => {
    if (!selectedBrandId) { setListCategories([]); return; }
    (async () => {
      try {
        const r = await fetch(`/api/brand-menu-categories?brand_id=${selectedBrandId}`, { headers: authHeaders() });
        if (!r.ok) return;
        const j = await r.json();
        setListCategories((j.data || []).map((x: any) => ({ id: x.id, name: x.name })));
      } catch { /* silent */ }
    })();
  }, [selectedBrandId]);

  // Load brands BG owns
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/brands?owner=me', { headers: authHeaders() });
        if (!r.ok) return;
        const j = await r.json();
        const list: Brand[] = (Array.isArray(j.data) ? j.data : Array.isArray(j) ? j : []).map((b: any) => ({ id: b.id, name: b.name }));
        setBrands(list);
        if (!selectedBrandId && list.length > 0) {
          setSelectedBrandId(list[0].id);
          localStorage.setItem('bg.selectedBrandId', String(list[0].id));
        }
      } catch (e) { /* silent */ }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMenus = useCallback(async () => {
    if (!selectedBrandId) return;
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({ brand_id: String(selectedBrandId) });
      if (searchQuery) qs.set('search', searchQuery);
      if (categoryFilter) qs.set('category_id', categoryFilter);
      const r = await fetch(`/api/brand-menus?${qs}`, { headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Failed to load');
      setMenus(j.data || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load menus');
    } finally {
      setLoading(false);
    }
  }, [selectedBrandId, searchQuery, categoryFilter]);

  useEffect(() => { loadMenus(); }, [loadMenus]);

  // 브랜드 메뉴 순서 — 'Menu order(manual)' 정렬일 때 카드를 드래그해 재정렬. sort_order 0..N 저장.
  // lock_sort_order(설정 enforce_menu_order) 켜진 메뉴는 push 시 이 순서가 매장에 강제됨.
  const reorderBrandInFlight = useRef(false);
  const [dragId, setDragId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);

  const persistBrandOrder = async (orderedIds: number[]) => {
    if (reorderBrandInFlight.current || !selectedBrandId) return;
    reorderBrandInFlight.current = true;
    try {
      await fetch('/api/brand-menus/reorder/bulk', {
        method: 'PUT', headers: authHeaders(),
        body: JSON.stringify({ brand_id: selectedBrandId, order: orderedIds })
      });
      await loadMenus();
    } catch { /* silent */ }
    finally { reorderBrandInFlight.current = false; }
  };

  const handleDropOnMenu = async (targetId: number) => {
    const src = dragId;
    setDragId(null); setOverId(null);
    if (src == null || src === targetId) return;
    const sorted = sortItems(menus.map(m => ({ ...m, price: m.recommended_price, display_order: (m as any).sort_order })), 'custom');
    const ids = sorted.map(m => Number(m.id));
    const from = ids.indexOf(src);
    const to = ids.indexOf(targetId);
    if (from < 0 || to < 0) return;
    const [moved] = ids.splice(from, 1);
    ids.splice(to, 0, moved);
    await persistBrandOrder(ids);
  };

  // Cache brand-level menu defaults so handlePushClick can decide which modal to open.
  useEffect(() => {
    if (!selectedBrandId) { setMenuSettings(null); return; }
    (async () => {
      try {
        const r = await fetch(`/api/brand-menus/settings?brand_id=${selectedBrandId}`, { headers: authHeaders() });
        const j = await r.json();
        if (r.ok && j.success) setMenuSettings(j.data);
      } catch { /* silent — fallback to 'all' */ }
    })();
  }, [selectedBrandId]);

  const handleBrandChange = (id: number) => {
    setSelectedBrandId(id);
    localStorage.setItem('bg.selectedBrandId', String(id));
    setShowBrandDropdown(false);
  };

  const handlePushClick = (menu: BrandMenu) => {
    // Branch by Settings tab → default_push_target
    if (menuSettings?.default_push_target === 'selected') {
      setPushPicker({ menuId: menu.id, menuName: menu.name });
    } else {
      setPushConfirm({ menuId: menu.id, menuName: menu.name });
    }
  };

  const performPush = async (menuId: number, restaurantIds: number[] | 'all') => {
    try {
      const r = await fetch(`/api/brand-menus/${menuId}/push`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ restaurant_ids: restaurantIds })
      });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Push failed');
      const d = j.data || {};
      setPushResult({ menuId, pushed: d.pushed || 0, created: d.created || 0, updated: d.updated || 0 });
      loadMenus();
    } catch (e: any) {
      setError(e?.message || 'Failed to push');
    }
  };

  const confirmPush = async () => {
    if (!pushConfirm) return;
    const { menuId } = pushConfirm;
    setPushConfirm(null);
    await performPush(menuId, 'all');
  };

  const handleDeleteClick = (menuId: number, menuName: string) => setDeleteConfirm({ menuId, menuName });

  const confirmCopy = async () => {
    if (!copyTarget || !copyToBrandId) return;
    setCopying(true);
    try {
      const r = await fetch(`/api/brand-menus/${copyTarget.menuId}/copy`, {
        method: 'POST', headers: authHeaders(),
        body: JSON.stringify({ target_brand_id: copyToBrandId, include_locks: copyIncludeLocks })
      });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Copy failed');
      setCopyTarget(null); setCopyToBrandId(null); setCopyIncludeLocks(false);
      // If copied to current brand list, refresh
      if (copyToBrandId === selectedBrandId) loadMenus();
    } catch (e: any) {
      setError(e?.message || 'Failed to copy');
    } finally {
      setCopying(false);
    }
  };

  // Duplicate within the SAME brand (convenience — works even with a single brand).
  const confirmDuplicate = async () => {
    if (!copyTarget) return;
    setDuplicating(true);
    try {
      const r = await fetch(`/api/brand-menus/${copyTarget.menuId}/duplicate`, {
        method: 'POST', headers: authHeaders(), body: JSON.stringify({})
      });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Duplicate failed');
      setCopyTarget(null); setCopyToBrandId(null); setCopyIncludeLocks(false);
      loadMenus();
    } catch (e: any) {
      setError(e?.message || 'Failed to duplicate');
    } finally {
      setDuplicating(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    const { menuId } = deleteConfirm;
    setDeleteConfirm(null);
    try {
      const r = await fetch(`/api/brand-menus/${menuId}`, { method: 'DELETE', headers: authHeaders() });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Delete failed');
      loadMenus();
    } catch (e: any) {
      setError(e?.message || 'Failed to delete');
    }
  };

  const lockCount = (m: BrandMenu) => Object.values(m.locks || {}).filter(Boolean).length;
  const currentBrand = useMemo(() => brands.find(b => b.id === selectedBrandId), [brands, selectedBrandId]);

  return (
    <Container>
      <PageHeader title={t('brand:brandMenusPage.title', 'Brand Menus')} />
      <Content>
        {/* Top row: brand selector (shared across all tabs) */}
        <ActionRow>
          {brands.length > 1 && (
            <div style={{ position: 'relative' }}>
              <BrandSwitch onClick={() => setShowBrandDropdown(!showBrandDropdown)} type="button">
                <Building2 />
                {currentBrand?.name || t('brand:brandMenusPage.selectBrand', 'Select Brand')}
                <ChevronDown />
              </BrandSwitch>
              {showBrandDropdown && (
                <Dropdown>
                  {brands.map(b => (
                    <DropdownItem key={b.id} $active={b.id === selectedBrandId} onClick={() => handleBrandChange(b.id)}>
                      {b.name}
                    </DropdownItem>
                  ))}
                </Dropdown>
              )}
            </div>
          )}
          {brands.length === 1 && currentBrand && (
            <BrandSwitch as="div" style={{ cursor: 'default' }}>
              <Building2 />
              {currentBrand.name}
            </BrandSwitch>
          )}
          <div style={{ flex: 1 }} />
        </ActionRow>

        {/* Tab navigation */}
        <TabBar>
          <TabBtn type="button" $active={tab === 'menus'} onClick={() => switchTab('menus')}>
            {t('brand:brandMenusPage.tabMenus', 'Menus')}
          </TabBtn>
          <TabBtn type="button" $active={tab === 'categories'} onClick={() => switchTab('categories')}>
            {t('brand:brandMenusPage.tabCategories', 'Categories')}
          </TabBtn>
          <TabBtn type="button" $active={tab === 'options'} onClick={() => switchTab('options')}>
            {t('brand:brandMenusPage.tabOptions', 'Option Groups')}
          </TabBtn>
          <TabBtn type="button" $active={tab === 'settings'} onClick={() => switchTab('settings')}>
            {t('brand:brandMenusPage.tabSettings', 'Settings')}
          </TabBtn>
        </TabBar>

        {tab === 'categories' && <BrandMenuCategoriesPage brandId={selectedBrandId} />}
        {tab === 'options' && <BrandMenuOptionGroupsPage brandId={selectedBrandId} />}
        {tab === 'settings' && <MenuSettingsTab brandId={selectedBrandId} brandName={currentBrand?.name || ''} />}

        {tab === 'menus' && (
        <>
        <ListControlsBar>
          <SearchInput
            type="text"
            placeholder={t('brand:brandMenusPage.searchPlaceholder', 'Search by name...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {listCategories.length > 0 && (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                height: 40, padding: '0 12px', borderRadius: 8,
                border: '1px solid #C7CED6', background: 'white', color: '#0A2540',
                fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', minWidth: 160
              }}
              aria-label={t('brand:brandMenusPage.filterCategory', 'Filter by category') as string}
            >
              <option value="">{t('brand:brandMenusPage.allCategories', 'All Categories')}</option>
              {listCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          )}
          <SortDropdown value={sortKey} onChange={setSortKey} options={['custom', 'newest', 'oldest', 'name_asc', 'name_desc', 'price_asc', 'price_desc', 'category']} />
          <div data-controls-trailing>
            <ThemedButton variant="primary" onClick={() => setShowAddModal(true)} disabled={!selectedBrandId}>
              {t('brand:brandMenusPage.addMenu', 'Add Brand Menu')}
            </ThemedButton>
          </div>
        </ListControlsBar>

        {error && (
          <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{error}</div>
        )}

        {loading && menus.length === 0 ? (
          <EmptyState>{t('common:label.loading', 'Loading...')}</EmptyState>
        ) : menus.length === 0 ? (
          <>
          <HelperCard>
            <HelperIcon><Info /></HelperIcon>
            <div style={{ flex: 1 }}>
              <HelperTitle>{t('brand:brandMenusPage.helperTitle', 'How Brand Menus work')}</HelperTitle>
              <HelperList>
                <li>{t('brand:brandMenusPage.helperStep1', 'Create Categories (e.g. Mains, Drinks) — under the Categories tab.')}</li>
                <li>{t('brand:brandMenusPage.helperStep2', 'Create Option Groups (e.g. Size, Spice Level) — under the Option Groups tab.')}</li>
                <li>{t('brand:brandMenusPage.helperStep3', 'Add Brand Menus and link them to categories & option groups.')}</li>
                <li>{t('brand:brandMenusPage.helperStep4', 'Push to franchise restaurants. Locked fields cannot be edited by restaurants.')}</li>
              </HelperList>
              <HelperLink type="button" onClick={() => switchTab('settings')}>
                {t('brand:brandMenusPage.helperMenuSettings', 'Open menu settings')} <ArrowRight />
              </HelperLink>
            </div>
          </HelperCard>
          <EmptyState>
            <UtensilsCrossed style={{ width: 32, height: 32, color: '#6B7280', marginBottom: 8 }} />
            <div style={{ fontWeight: 500, color: '#0A2540', marginBottom: 4 }}>
              {t('brand:brandMenusPage.emptyTitle', 'No brand menus yet')}
            </div>
            <div>
              {t('brand:brandMenusPage.emptyDesc', 'Create menu templates here and push them to franchise restaurants.')}
            </div>
          </EmptyState>
          </>
        ) : (
          <>
          {sortKey === 'custom' ? (
            <ReorderHint>
              <GripVertical />
              {t('brand:brandMenusPage.reorderHint', 'Drag the handle (top-left of each card) to set the menu order. If "Lock menu order" is on in Settings, restaurants display menus in this exact order.')}
            </ReorderHint>
          ) : (
            <ReorderHint style={{ background: '#F9FAFB', borderColor: '#E5E7EB', color: '#6B7280' }}>
              <Info />
              {t('brand:brandMenusPage.reorderSwitchHint', 'To arrange the menu order, switch the sort above to "Menu order (manual)" — then drag cards to reorder.')}
            </ReorderHint>
          )}
          <Grid>
            {sortItems(menus.map(m => ({ ...m, price: m.recommended_price, display_order: (m as any).sort_order })), sortKey).map(m => (
              <Card key={m.id}
                $dragging={dragId === m.id}
                $dragOver={overId === m.id && dragId !== null && dragId !== m.id}
                onDragOver={sortKey === 'custom' ? (e) => { e.preventDefault(); if (overId !== m.id) setOverId(m.id); } : undefined}
                onDrop={sortKey === 'custom' ? (e) => { e.preventDefault(); handleDropOnMenu(m.id); } : undefined}
              >
                {sortKey === 'custom' && (
                  <DragHandle
                    draggable
                    onDragStart={(e) => { setDragId(m.id); e.dataTransfer.effectAllowed = 'move'; }}
                    onDragEnd={() => { setDragId(null); setOverId(null); }}
                    title={t('brand:brandMenusPage.dragToReorder', 'Drag to reorder') as string}
                  >
                    <GripVertical />
                  </DragHandle>
                )}
                <CardImage $src={m.image_url}>
                  {!m.image_url && (m.emoji
                    ? <span style={{ fontSize: '48px', lineHeight: 1 }}>{m.emoji}</span>
                    : <UtensilsCrossed />)}
                </CardImage>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <CardTitle>{m.name}</CardTitle>
                  {lockCount(m) > 0 && (
                    <LockBadge title={t('brand:brandMenusPage.lockBadgeHint', { count: lockCount(m), defaultValue: `${lockCount(m)} field(s) locked — franchise restaurants cannot edit these` })}>
                      <Lock />{lockCount(m)}
                    </LockBadge>
                  )}
                </div>
                <CardRow>
                  <span style={{ fontWeight: 600, color: '#0A2540' }}>{formatCurrency(Number(m.recommended_price), m.currency || 'MYR')}</span>
                  <span>{m.category?.name || '—'}</span>
                </CardRow>
                <DistributionLine title={t('brand:brandMenusPage.distributionHint', 'Synced (green) = restaurants on the latest version · Pending (orange) = has older version, needs push · Unlinked (grey) = restaurant has its own version, brand updates ignored')}>
                  <DistItem $color={m.distribution.in_sync > 0 ? '#10B981' : '#6B7280'}>
                    <DistDot $bg={m.distribution.in_sync > 0 ? '#10B981' : '#6B7280'} />
                    {m.distribution.in_sync}
                  </DistItem>
                  {m.distribution.pending_update > 0 && (
                    <DistItem $color="#F59E0B">
                      <Clock style={{ width: 11, height: 11 }} />
                      {m.distribution.pending_update}
                    </DistItem>
                  )}
                  {m.distribution.unlinked > 0 && (
                    <DistItem $color="#4B5563">
                      <DistDot $bg="#6B7280" />
                      {m.distribution.unlinked}
                    </DistItem>
                  )}
                  <span style={{ color: '#6B7280', marginLeft: 'auto' }}>v{m.version}</span>
                </DistributionLine>
                <CardActions>
                  <IconBtn type="button" onClick={() => setEditingMenu(m)} title={t('common:button.edit')}>
                    <Edit2 /> {t('common:button.edit')}
                  </IconBtn>
                  <IconBtn type="button" onClick={() => setScopePicker({ menuId: m.id, menuName: m.name })} title={t('brand:brandMenusPage.scopeTitle', 'Which restaurants this menu applies to')}>
                    <Target /> {m.scope_mode === 'selected'
                      ? t('brand:brandMenusPage.scopeSelected', 'Scope: Selected')
                      : t('brand:brandMenusPage.scopeAll', 'Scope: All')}
                  </IconBtn>
                  <IconBtn type="button" onClick={() => handlePushClick(m)} title={t('brand:brandMenusPage.pushToAllNow', 'Push to All Now')}>
                    <Send /> {t('brand:brandMenusPage.push', 'Push')}
                  </IconBtn>
                  <IconBtn type="button" onClick={() => setCopyTarget({ menuId: m.id, menuName: m.name })} title={t('brand:brandMenusPage.copyToBrand', 'Copy to another brand')}>
                    <Copy />
                  </IconBtn>
                  <IconBtn type="button" onClick={() => handleDeleteClick(m.id, m.name)} title={t('common:button.delete')} style={{ marginLeft: 'auto' }}>
                    <Trash2 />
                  </IconBtn>
                </CardActions>
              </Card>
            ))}
          </Grid>
          </>
        )}

        {showAddModal && (
          <BrandMenuEditModal
            brandId={selectedBrandId!}
            brands={brands}
            onClose={() => setShowAddModal(false)}
            onSaved={() => { setShowAddModal(false); loadMenus(); }}
          />
        )}
        {editingMenu && (
          <BrandMenuEditModal
            brandId={editingMenu.brand_id}
            menu={editingMenu}
            brands={brands}
            onClose={() => setEditingMenu(null)}
            onSaved={() => { setEditingMenu(null); loadMenus(); }}
          />
        )}
        </>
        )}

        {pushPicker && (
          <PushPickerModal
            menuId={pushPicker.menuId}
            menuName={pushPicker.menuName}
            onClose={() => setPushPicker(null)}
            onConfirm={async (ids) => {
              const id = pushPicker.menuId;
              setPushPicker(null);
              await performPush(id, ids);
            }}
          />
        )}

        {scopePicker && (
          <ScopePickerModal
            menuId={scopePicker.menuId}
            menuName={scopePicker.menuName}
            onClose={() => setScopePicker(null)}
            onSaved={() => { setScopePicker(null); loadMenus(); }}
          />
        )}

        <ConfirmModal
          isOpen={!!pushConfirm}
          type="info"
          title={t('brand:brandMenusPage.confirmPushTitle', 'Push to franchise restaurants')}
          message={t('brand:brandMenusPage.confirmPushMessage', {
            name: pushConfirm?.menuName || '',
            defaultValue: `Push "${pushConfirm?.menuName}" to all franchise restaurants? Linked restaurants will receive the latest version.`
          })}
          confirmText={t('brand:brandMenusPage.pushNow', 'Push Now')}
          cancelText={t('common:button.cancel', 'Cancel')}
          onConfirm={confirmPush}
          onCancel={() => setPushConfirm(null)}
        />

        <ConfirmModal
          isOpen={!!deleteConfirm}
          type="danger"
          title={t('brand:brandMenusPage.confirmDeleteTitle', 'Delete brand menu')}
          message={t('brand:brandMenusPage.confirmDelete', {
            name: deleteConfirm?.menuName || '',
            defaultValue: `Delete "${deleteConfirm?.menuName}"? Linked restaurant products will be soft-unlinked but preserved.`
          })}
          confirmText={t('common:button.delete', 'Delete')}
          cancelText={t('common:button.cancel', 'Cancel')}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteConfirm(null)}
        />

        {copyTarget && (
          <CommonModal
            isOpen={true}
            onClose={() => { setCopyTarget(null); setCopyToBrandId(null); setCopyIncludeLocks(false); }}
            title={t('brand:brandMenusPage.copyMenuTitle', { name: copyTarget.menuName, defaultValue: `Copy "${copyTarget.menuName}" to another brand` })}
            footer={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: 8 }}>
                <ThemedButton variant="secondary" onClick={confirmDuplicate} disabled={duplicating || copying}>
                  {duplicating ? t('common:label.saving', 'Saving...') : t('brand:brandMenusPage.duplicateHere', 'Duplicate in this brand')}
                </ThemedButton>
                <div style={{ display: 'flex', gap: 8 }}>
                  <ThemedButton variant="cancel" onClick={() => { setCopyTarget(null); setCopyToBrandId(null); setCopyIncludeLocks(false); }}>
                    {t('common:button.cancel')}
                  </ThemedButton>
                  <ThemedButton variant="primary" onClick={confirmCopy}
                    disabled={!copyToBrandId || copying || duplicating || copyToBrandId === selectedBrandId}>
                    {copying ? t('common:label.saving', 'Saving...') : t('brand:brandMenusPage.copyAction', 'Copy Menu')}
                  </ThemedButton>
                </div>
              </div>
            }
          >
            <div style={{ padding: '10px 12px', background: '#F8F7FF', border: '1px solid #E6E3FF', borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#374151' }}>
              {t('brand:brandMenusPage.copyIntro', 'A new draft will be created in the target brand. Categories and recipes stay with the original brand — re-link in the target brand if needed.')}
            </div>
            <UIFormGroup>
              <FormLabel>{t('brand:brandMenusPage.copyTargetBrand', 'Target brand')} *</FormLabel>
              <FormSelect value={copyToBrandId || ''} onChange={(e) => setCopyToBrandId(Number(e.target.value) || null)}>
                <option value="">— {t('brand:brandMenusPage.copyTargetBrandPlaceholder', 'Select a different brand')} —</option>
                {brands.filter(b => b.id !== selectedBrandId).map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </FormSelect>
              {brands.filter(b => b.id !== selectedBrandId).length === 0 && (
                <div style={{ fontSize: 12, color: '#6B7280', marginTop: 6 }}>
                  {t('brand:brandMenusPage.copyOnlyOneBrandDuplicate', 'You only have one brand — use "Duplicate in this brand" below to make an editable copy here.')}
                </div>
              )}
            </UIFormGroup>
            <UIFormGroup style={{ marginTop: 16 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer', fontSize: 13, color: '#0A2540' }}>
                <input type="checkbox" checked={copyIncludeLocks} onChange={(e) => setCopyIncludeLocks(e.target.checked)} style={{ marginTop: 3, accentColor: '#635BFF' }} />
                <span>
                  <strong>{t('brand:brandMenusPage.copyIncludeLocks', 'Carry over field locks')}</strong>
                  <div style={{ fontSize: 11, color: '#4B5563', marginTop: 2 }}>
                    {t('brand:brandMenusPage.copyIncludeLocksHint', 'If on, locked fields (name/price/image/etc.) stay locked on the copy. Otherwise the copy starts with no locks so you can edit freely.')}
                  </div>
                </span>
              </label>
            </UIFormGroup>
          </CommonModal>
        )}

        <ConfirmModal
          isOpen={!!pushResult}
          type="info"
          singleButton
          title={t('brand:brandMenusPage.pushResultTitle', 'Push complete')}
          message={t('brand:brandMenusPage.pushResultMessage', {
            pushed: pushResult?.pushed || 0,
            created: pushResult?.created || 0,
            updated: pushResult?.updated || 0,
            defaultValue: `Pushed to ${pushResult?.pushed || 0} restaurants — ${pushResult?.created || 0} created, ${pushResult?.updated || 0} updated.`
          })}
          confirmText={t('common:button.ok', 'OK')}
          onConfirm={() => setPushResult(null)}
          onCancel={() => setPushResult(null)}
        />
      </Content>
    </Container>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Edit modal (Create + Edit unified)
// ──────────────────────────────────────────────────────────────────────────
// ── Option group chip components (mirrored from RA MenuManagement for visual parity) ──
const OptionGroupSelectStyled = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  cursor: pointer;
  transition: all 0.15s;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;
const SelectedChipsContainer = styled.div`
  display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; min-height: 36px;
`;
const OptionGroupChip = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 12px; background: #F0F4FF; border: 1px solid #C7D2FE;
  border-radius: 20px; font-size: 13px; color: #4338CA;
`;
const ChipOrderBadge = styled.span`
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; background: #635BFF; color: white;
  border-radius: 50%; font-size: 11px; font-weight: 600;
`;
const ChipName = styled.span` font-weight: 500; `;
const ChipBadge = styled.span<{ type: 'required' | 'optional' }>`
  font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500;
  ${p => p.type === 'required' ? 'background:#FEE2E2; color:#DC2626;' : 'background:#DCFCE7; color:#16A34A;'}
`;
const ChipRemoveButton = styled.button`
  display: inline-flex; align-items: center; justify-content: center;
  width: 18px; height: 18px; background: transparent; border: 0;
  cursor: pointer; color: #4B5563; border-radius: 50%; padding: 0;
  transition: all 0.15s;
  &:hover { background: #E0E7FF; color: #4338CA; }
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const Section = styled.div`
  background: #F9FAFB;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  padding: 16px;
`;

const SectionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #4B5563;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
  &:last-child { margin-bottom: 0; }
`;

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #0A2540;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  color: #0A2540;
  background: white;
  box-sizing: border-box;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  color: #0A2540;
  cursor: pointer;
`;

const LockRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #F1F4F8;
  &:last-child { border-bottom: none; }
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  cursor: pointer;
  input { opacity: 0; width: 0; height: 0; }
  span {
    position: absolute; inset: 0; background: #64748B; border-radius: 20px;
    transition: 0.15s;
    &::before {
      content: ''; position: absolute; left: 3px; bottom: 3px;
      width: 14px; height: 14px; background: white; border-radius: 50%; transition: 0.15s;
    }
  }
  input:checked + span { background: #635BFF; }
  input:checked + span::before { transform: translateX(16px); }
`;

interface ModalProps {
  brandId: number;
  brands: Brand[];
  menu?: BrandMenu;
  onClose: () => void;
  onSaved: () => void;
}

const BrandMenuEditModal: React.FC<ModalProps> = ({ brandId, brands, menu, onClose, onSaved }) => {
  const { t } = useTranslation(['brand', 'common']);
  const isEdit = !!menu;
  const [name, setName] = useState(menu?.name || '');
  const [description, setDescription] = useState(menu?.description || '');
  const [price, setPrice] = useState(String(menu?.recommended_price ?? '0'));
  const [emoji, setEmoji] = useState(menu?.emoji || '');
  const [imageUrl, setImageUrl] = useState(menu?.image_url || '');
  const [categoryId, setCategoryId] = useState<string>(menu?.category_id ? String(menu.category_id) : '');
  // Locks + distribution_mode are no longer set per-menu — they follow the brand
  // defaults configured in the Settings tab. Backend fills them on create.
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [recipes, setRecipes] = useState<Array<{ id: number; name: string }>>([]);
  const [recipeId, setRecipeId] = useState<string>(menu?.recipe?.id ? String(menu.recipe.id) : '');
  const [optionGroups, setOptionGroups] = useState<Array<{ id: number; name: string; is_required: boolean; max_select: number }>>([]);
  const [selectedOptionGroupIds, setSelectedOptionGroupIds] = useState<number[]>([]);
  // 식후 제공(디저트 등) 등록 플래그 — 매장 Product 와 동일
  const [afterMeal, setAfterMeal] = useState<boolean>(!!(menu as any)?.after_meal);
  const [setOnly, setSetOnly] = useState<boolean>(!!(menu as any)?.set_only);
  // 순서 고정은 메뉴별 토글에서 브랜드 전체 설정(Settings 탭 enforce_menu_order)으로 이동 — 여기서는 다루지 않음
  // Set menu support — mirrors Restaurant Product (is_set_menu + set_items[])
  const [isSetMenu, setIsSetMenu] = useState<boolean>(!!menu?.is_set_menu);
  // v2 세트 슬롯 — 매장과 동일한 SetMenuBuilder 사용 (구성품 product_id = brand_menu_id)
  const [setGroups, setSetGroups] = useState<SetGroup[]>(() => {
    const sg = (menu as any)?.set_groups;
    if (Array.isArray(sg) && sg.length > 0) return sg;
    // 브랜드 레거시 set_items({brand_menu_id,name,quantity}) → 단일 fixed 슬롯
    const si = (menu as any)?.set_items;
    if (Array.isArray(si) && si.length > 0) {
      return [{
        id: 'legacy', label: 'Set', type: 'fixed' as const,
        items: si.filter((i: any) => i?.brand_menu_id != null)
          .map((i: any) => ({ product_id: Number(i.brand_menu_id), qty: i.quantity != null ? Number(i.quantity) : 1, upcharge: 0 }))
      }];
    }
    return [];
  });
  const [allBrandMenus, setAllBrandMenus] = useState<Array<{ id: string; name: string; optionGroups?: string[] }>>([]);
  // #11c 크로스셀 — 추천으로 연결할 다른 브랜드메뉴(저장 시 가맹점 동기화)
  const [selectedRecommendationIds, setSelectedRecommendationIds] = useState<number[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Load supporting data
  useEffect(() => {
    (async () => {
      try {
        const [c, og, r] = await Promise.all([
          fetch(`/api/brand-menu-categories?brand_id=${brandId}`, { headers: authHeaders() }).then(r => r.ok ? r.json() : { data: [] }),
          fetch(`/api/brand-menu-option-groups?brand_id=${brandId}`, { headers: authHeaders() }).then(r => r.ok ? r.json() : { data: [] }),
          fetch(`/api/product-recipes?brand_id=${brandId}`, { headers: authHeaders() }).then(r => r.ok ? r.json() : { data: [] })
        ]);
        setCategories((c.data || []).map((x: any) => ({ id: x.id, name: x.name })));
        setOptionGroups((og.data || []).map((x: any) => ({ id: x.id, name: x.name, is_required: !!x.is_required, max_select: x.max_select || 1 })));
        setRecipes((r.data || []).map((x: any) => ({ id: x.id, name: x.name })));
        // Load other brand menus for set-menu picker (exclude current menu, exclude other sets — sets can't nest sets)
        try {
          const mr = await fetch(`/api/brand-menus?brand_id=${brandId}`, { headers: authHeaders() });
          if (mr.ok) {
            const mj = await mr.json();
            const allMenus = Array.isArray(mj.data) ? mj.data : [];
            setAllBrandMenus(allMenus
              .filter((m: any) => !m.is_set_menu && (!menu || m.id !== menu.id))
              .map((m: any) => ({ id: String(m.id), name: m.name, optionGroups: (m.optionGroups || []).map((g: any) => String(g.id)) })));
          }
        } catch (e) { /* silent */ }
      } catch (e) { /* silent */ }
    })();
  }, [brandId, menu]);

  // Load existing menu's option groups
  useEffect(() => {
    if (!menu) return;
    (async () => {
      try {
        const r = await fetch(`/api/brand-menus/${menu.id}`, { headers: authHeaders() });
        if (!r.ok) return;
        const j = await r.json();
        const ogs = j.data?.optionGroups || [];
        setSelectedOptionGroupIds(ogs.map((g: any) => g.id));
      } catch (e) { /* silent */ }
    })();
  }, [menu]);

  // #11c 크로스셀 — 기존 추천 연결 로드
  useEffect(() => {
    if (!menu) return;
    (async () => {
      try {
        const r = await fetch(`/api/brand-menus/${menu.id}/recommendations`, { headers: authHeaders() });
        if (!r.ok) return;
        const j = await r.json();
        if (Array.isArray(j.data)) setSelectedRecommendationIds(j.data.map((x: any) => Number(x.recommended_brand_menu_id)).filter((n: number) => Number.isFinite(n)));
      } catch (e) { /* silent */ }
    })();
  }, [menu]);

  const handleSave = async () => {
    if (!name.trim()) { setSaveError(t('brand:brandMenusPage.errors.nameRequired', 'Name is required')); return; }
    if (!categoryId) { setSaveError(t('brand:brandMenusPage.errors.categoryRequired', 'Category is required')); return; }
    setSaving(true);
    setSaveError(null);
    try {
      const body: any = {
        brand_id: brandId, name: name.trim(), description: description || null,
        emoji: emoji || null, image_url: imageUrl || null,
        recommended_price: parseFloat(price) || 0,
        category_id: categoryId ? parseInt(categoryId, 10) : null,
        product_recipe_id: recipeId ? parseInt(recipeId, 10) : null,
        // distribution_mode + lock_* are omitted on purpose — the backend fills
        // them from brand.menu_settings defaults (Settings tab is the single source).
        option_group_ids: selectedOptionGroupIds,
        after_meal: afterMeal,
        set_only: setOnly,
        is_set_menu: isSetMenu,
        // v2 슬롯 저장 + 레거시 set_items 는 set_groups 구성품에서 파생(하위호환 표시용)
        set_groups: isSetMenu ? setGroups : null,
        set_items: isSetMenu
          ? setGroups.flatMap(g => (g.items || []).map(it => {
              const bm = allBrandMenus.find(m => String(m.id) === String(it.product_id));
              return { brand_menu_id: Number(it.product_id), name: bm?.name || `#${it.product_id}`, quantity: it.qty != null ? Number(it.qty) : 1 };
            }))
          : null
      };
      const url = isEdit ? `/api/brand-menus/${menu!.id}` : '/api/brand-menus';
      const method = isEdit ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(body) });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Save failed');
      // #11c 크로스셀 — 메뉴 저장 성공 후 추천 연결 저장(가맹점 동기화는 백엔드가 처리). 세트메뉴는 추천 대상 아님.
      const savedId = isEdit ? menu!.id : (j.data?.id ?? j.data?.menu?.id);
      if (savedId && !isSetMenu) {
        try {
          await fetch(`/api/brand-menus/${savedId}/recommendations`, {
            method: 'PUT', headers: authHeaders(),
            body: JSON.stringify({ recommended_brand_menu_ids: selectedRecommendationIds })
          });
        } catch (e) { /* 추천 저장 실패는 메뉴 저장을 막지 않음 */ }
      }
      onSaved();
    } catch (e: any) {
      setSaveError(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <CommonModal
      isOpen={true}
      onClose={onClose}
      title={isEdit ? `${t('common:button.edit')} — ${menu!.name}` : t('brand:brandMenusPage.addMenu', 'Add Brand Menu')}
      footer={
        <>
          <ThemedButton variant="cancel" onClick={onClose}>{t('common:button.cancel')}</ThemedButton>
          <ThemedButton variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? t('common:label.saving', 'Saving...') : (isEdit ? t('common:button.save') : t('common:button.create'))}
          </ThemedButton>
        </>
      }
    >
      {saveError && (
        <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{saveError}</div>
      )}

      {isEdit && (
        <div style={{ padding: '10px 12px', background: '#F8F7FF', border: '1px solid #E6E3FF', borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#374151', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>
            {t('brand:brandMenusPage.version', 'Version')}: <strong style={{ color: '#0A2540' }}>v{menu!.version}</strong> ·{' '}
            {t('brand:brandMenusPage.syncedTo', { count: menu!.distribution.in_sync, total: menu!.distribution.in_sync + menu!.distribution.pending_update + menu!.distribution.unlinked, defaultValue: `Synced to ${menu!.distribution.in_sync} restaurants` })}
          </span>
          <span style={{ color: '#635BFF' }}>{t('brand:brandMenusPage.brandDefaultsHint', 'Field locks and push mode follow the brand defaults set in the Settings tab.')}</span>
        </div>
      )}

      <UIFormGroup>
        <FormLabel>{t('brand:brandMenusPage.name', 'Name')} *</FormLabel>
        <FormInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Soju Set" />
      </UIFormGroup>

      <UIFormGroup>
        <FormLabel>{t('brand:brandMenusPage.recommendedPrice', 'Recommended Price (RM)')} *</FormLabel>
        <FormInput type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)}
          onFocus={(e: any) => { if (parseFloat(e.target.value) === 0) e.target.select(); }} />
      </UIFormGroup>

      <UIFormGroup>
        <FormLabel>{t('brand:brandMenusPage.category', 'Category')} *</FormLabel>
        <SearchableSelect
          options={categories.map(c => ({ value: c.id, label: c.name }))}
          value={categoryId ? Number(categoryId) : null}
          onChange={(v) => setCategoryId(v != null ? String(v) : '')}
          placeholder={t('brand:brandMenusPage.selectCategoryPlaceholder', 'Select Category') as string}
          noOptionsMessage={t('brand:brandMenusPage.noCategoriesYet', 'No categories yet') as string}
          allowClear={false}
        />
      </UIFormGroup>

      <UIFormGroup>
        <FormLabel>{t('brand:brandMenusPage.emoji', 'Emoji')}</FormLabel>
        <FormInput type="text" value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} placeholder="🍶" />
      </UIFormGroup>

      <UIFormGroup>
        <FormLabel>{t('brand:brandMenusPage.description', 'Description')}</FormLabel>
        <FormTextArea value={description} onChange={(e) => setDescription(e.target.value)}
          placeholder={t('brand:brandMenusPage.descriptionPlaceholder', 'Brief description of this menu...') as string} />
      </UIFormGroup>

      <ImageUploadDropzone
        value={imageUrl}
        onChange={setImageUrl}
        label={t('brand:brandMenusPage.image', 'Image') as string}
        helpText={t('brand:brandMenusPage.imageHelp', 'Upload an image for this brand menu (auto-compressed)')}
        showRemoveButton={true}
      />

      <UIFormGroup style={{ marginTop: 24 }}>
        <FormLabel>{t('brand:brandMenusPage.linkedRecipe', 'Linked Recipe (optional)')}</FormLabel>
        <SearchableSelect
          options={recipes.map(r => ({ value: r.id, label: r.name }))}
          value={recipeId ? Number(recipeId) : null}
          onChange={(v) => setRecipeId(v != null ? String(v) : '')}
          placeholder={t('brand:brandMenusPage.selectRecipePlaceholder', 'Select Recipe') as string}
          noOptionsMessage={t('brand:brandMenusPage.noRecipesYet', 'No recipes yet') as string}
        />
      </UIFormGroup>

      <UIFormGroup style={{ marginTop: 24 }}>
        <FormLabel>
          {t('brand:brandMenusPage.optionGroups', 'Option Groups')}
          {selectedOptionGroupIds.length > 0 && ` (${selectedOptionGroupIds.length} ${t('common:selected', 'selected')})`}
        </FormLabel>
        {optionGroups.length === 0 ? (
          <div style={{ fontSize: 13, color: '#6B7280', padding: '10px 14px', border: '1px dashed #C7CED6', borderRadius: 8 }}>
            {t('brand:brandMenusPage.noOptionGroups', 'No option groups available — create in the Option Groups tab.')}
          </div>
        ) : (
          <>
            <SearchableSelect
              options={optionGroups
                .filter(g => !selectedOptionGroupIds.includes(g.id))
                .map(g => ({
                  value: g.id,
                  label: g.name,
                  subLabel: `${g.is_required ? t('brand:brandMenusPage.required', 'Required') : t('brand:brandMenusPage.optional', 'Optional')} · ${g.max_select > 1 ? t('brand:brandMenusPage.multi', 'Multi') : t('brand:brandMenusPage.single', 'Single')}`
                }))}
              value={null}
              onChange={(v) => {
                if (v == null) return;
                const id = Number(v);
                if (id && !selectedOptionGroupIds.includes(id)) {
                  setSelectedOptionGroupIds([...selectedOptionGroupIds, id]);
                }
              }}
              placeholder={t('brand:brandMenusPage.selectOptionGroupToAdd', 'Select option group to add...') as string}
              noOptionsMessage={t('brand:brandMenusPage.allOptionGroupsAdded', 'All option groups already added') as string}
              allowClear={false}
            />
            <SelectedChipsContainer>
              {selectedOptionGroupIds.map((groupId, index) => {
                const group = optionGroups.find(g => g.id === groupId);
                if (!group) return null;
                return (
                  <OptionGroupChip key={groupId}>
                    <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                    <ChipName>{group.name}</ChipName>
                    <ChipBadge type={group.is_required ? 'required' : 'optional'}>
                      {group.is_required ? t('brand:brandMenusPage.required', 'Required') : t('brand:brandMenusPage.optional', 'Optional')}
                    </ChipBadge>
                    <ChipRemoveButton
                      onClick={() => setSelectedOptionGroupIds(selectedOptionGroupIds.filter(id => id !== groupId))}
                      title={t('common:button.remove', 'Remove') as string}
                    >
                      ×
                    </ChipRemoveButton>
                  </OptionGroupChip>
                );
              })}
            </SelectedChipsContainer>
          </>
        )}
      </UIFormGroup>

      {/* #11c 크로스셀 — 추천 메뉴 연결(저장 시 가맹점 동기화). 세트메뉴는 대상 아님. */}
      {!isSetMenu && (
      <UIFormGroup style={{ marginTop: 24 }}>
        <FormLabel>
          {t('brand:brandMenusPage.recommendMenus', { defaultValue: 'Recommended add-ons' })}
          {selectedRecommendationIds.length > 0 && ` (${selectedRecommendationIds.length})`}
        </FormLabel>
        <div style={{ fontSize: 13, color: '#6B7280', margin: '-2px 0 10px' }}>
          {t('brand:brandMenusPage.recommendMenusHint', { defaultValue: 'Suggested to customers after they add this item. Synced to all linked restaurants on save.' })}
        </div>
        {allBrandMenus.length === 0 ? (
          <div style={{ fontSize: 13, color: '#6B7280', padding: '10px 14px', border: '1px dashed #C7CED6', borderRadius: 8 }}>
            {t('brand:brandMenusPage.noOtherMenus', { defaultValue: 'No other menus available to recommend yet.' })}
          </div>
        ) : (
          <>
            <SearchableSelect
              options={allBrandMenus
                .filter(m => !selectedRecommendationIds.includes(Number(m.id)))
                .map(m => ({ value: Number(m.id), label: m.name }))}
              value={null}
              onChange={(v) => {
                if (v == null) return;
                const id = Number(v);
                if (id && !selectedRecommendationIds.includes(id)) {
                  setSelectedRecommendationIds([...selectedRecommendationIds, id]);
                }
              }}
              placeholder={t('brand:brandMenusPage.selectMenuToRecommend', { defaultValue: 'Select a menu to recommend...' }) as string}
              noOptionsMessage={t('brand:brandMenusPage.allMenusAdded', { defaultValue: 'All menus already added' }) as string}
              allowClear={false}
            />
            <SelectedChipsContainer>
              {selectedRecommendationIds.map((mid, index) => {
                const m = allBrandMenus.find(x => Number(x.id) === mid);
                return (
                  <OptionGroupChip key={mid}>
                    <ChipOrderBadge>{index + 1}</ChipOrderBadge>
                    <ChipName>{m ? m.name : `#${mid}`}</ChipName>
                    <ChipRemoveButton
                      onClick={() => setSelectedRecommendationIds(selectedRecommendationIds.filter(id => id !== mid))}
                      title={t('common:button.remove', 'Remove') as string}
                    >
                      ×
                    </ChipRemoveButton>
                  </OptionGroupChip>
                );
              })}
            </SelectedChipsContainer>
          </>
        )}
      </UIFormGroup>
      )}

      <UIFormGroup style={{ marginTop: 24 }}>
        <FormLabel style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={afterMeal}
            onChange={(e) => setAfterMeal(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          <span>{t('brand:brandMenusPage.afterMeal', { defaultValue: 'After meal — serve after the main course (e.g. dessert)' })}</span>
        </FormLabel>
      </UIFormGroup>

      {!isSetMenu && (
      <UIFormGroup>
        <FormLabel style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={setOnly}
            onChange={(e) => setSetOnly(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          <span>{t('brand:brandMenusPage.setOnly', { defaultValue: 'Set menu use only — not sold separately (hidden from POS & mobile ordering at restaurants)' })}</span>
        </FormLabel>
      </UIFormGroup>
      )}

      <UIFormGroup style={{ marginTop: 24 }}>
        <FormLabel style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={isSetMenu}
            onChange={(e) => setIsSetMenu(e.target.checked)}
            style={{ width: 16, height: 16, cursor: 'pointer' }}
          />
          <span>{t('brand:brandMenusPage.setMenu', 'Set Menu (consists of multiple items)')}</span>
        </FormLabel>
        {isSetMenu && (
          <div style={{ marginTop: 12, padding: 12, background: '#F8F7FF', border: '1px solid #E6E3FF', borderRadius: 8 }}>
            <SetMenuBuilder
              value={setGroups}
              onChange={setSetGroups}
              menuItems={allBrandMenus as any}
              optionGroups={optionGroups.map(g => ({ id: String(g.id), name: g.name, required: g.is_required, multiple: (g.max_select || 1) > 1 })) as any}
              formatCurrency={(v: number) => formatCurrency(v, (menu as any)?.currency || 'MYR')}
            />
          </div>
        )}
      </UIFormGroup>
    </CommonModal>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Menu Settings tab — brand-level defaults applied to new menus
// ──────────────────────────────────────────────────────────────────────────
const MenuSettingsTab: React.FC<{ brandId: number | null; brandName: string }> = ({ brandId, brandName }) => {
  const { t } = useTranslation(['brand', 'common']);
  const [settings, setSettings] = useState<MenuSettings | null>(null);
  const [restaurantCount, setRestaurantCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  // Always-fresh ref so AutoSaveField onSave (debounced) reads the latest state, not a stale closure.
  const settingsRef = useRef<MenuSettings | null>(null);
  settingsRef.current = settings;

  useEffect(() => {
    if (!brandId) { setSettings(null); return; }
    (async () => {
      setLoading(true);
      try {
        const [sRes, rRes] = await Promise.all([
          fetch(`/api/brand-menus/settings?brand_id=${brandId}`, { headers: authHeaders() }),
          fetch(`/api/brands/${brandId}/restaurants`, { headers: authHeaders() })
        ]);
        const sJson = await sRes.json();
        if (!sRes.ok || !sJson.success) throw new Error(sJson.message || 'Load failed');
        setSettings(sJson.data);
        if (rRes.ok) {
          const rJson = await rRes.json();
          setRestaurantCount(Array.isArray(rJson.data) ? rJson.data.length : 0);
        }
        setErr(null);
      } catch (e: any) {
        setErr(e?.message || 'Load failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [brandId]);

  const persist = useCallback(async () => {
    if (!brandId || !settingsRef.current) return;
    const r = await fetch(`/api/brand-menus/settings`, {
      method: 'PUT', headers: authHeaders(),
      body: JSON.stringify({ brand_id: brandId, settings: settingsRef.current })
    });
    const j = await r.json();
    if (!r.ok || !j.success) throw new Error(j.message || 'Save failed');
  }, [brandId]);

  if (!brandId) {
    return <EmptyState>{t('brand:brandMenusPage.selectBrandFirst', 'Select a brand first')}</EmptyState>;
  }
  if (loading || !settings) {
    return <EmptyState>{t('common:label.loading', 'Loading...')}</EmptyState>;
  }

  const lockKeys: Array<keyof MenuSettings['default_locks']> = ['name', 'price', 'category', 'image', 'options'];
  const lockLabels: Record<string, string> = {
    name: t('brand:brandMenusPage.lockLabelName', 'Menu name'),
    price: t('brand:brandMenusPage.lockLabelPrice', 'Recommended price'),
    category: t('brand:brandMenusPage.lockLabelCategory', 'Category'),
    image: t('brand:brandMenusPage.lockLabelImage', 'Image'),
    options: t('brand:brandMenusPage.lockLabelOptions', 'Option groups')
  };

  const lockScenarios: Record<string, string> = {
    name: t('brand:brandMenusPage.lockScenario.name', 'When ON: every franchise sees the exact menu name you set here. They cannot rename it (e.g. localize, abbreviate, or add suffixes).'),
    price: t('brand:brandMenusPage.lockScenario.price', 'When ON: franchises must sell at the price you set. Useful for brand-wide promotions. Leave OFF if rent/labor differs by location.'),
    category: t('brand:brandMenusPage.lockScenario.category', 'When ON: the menu always appears under the same category at every restaurant. Helps menu structure stay consistent.'),
    image: t('brand:brandMenusPage.lockScenario.image', 'When ON: every restaurant displays the official brand photo. Recommended for visual consistency.'),
    options: t('brand:brandMenusPage.lockScenario.options', 'When ON: option groups (e.g. Size, Add-ons) and their prices stay identical across all restaurants.')
  };

  return (
    <div>
      {err && (
        <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>{err}</div>
      )}

      <IntroCard>
        <IntroTitle>
          <Info />
          {t('brand:brandMenusPage.settingsIntroTitle', { name: brandName, defaultValue: `Defaults for new menus${brandName ? ` — ${brandName}` : ''}` })}
        </IntroTitle>
        <IntroBody>
          {t('brand:brandMenusPage.settingsIntroBody', 'These values are pre-filled every time you create a new menu in the Menus tab. You can still change them per menu in the edit dialog. Settings save automatically.')}
        </IntroBody>
        <Glossary>
          <dt>{t('brand:brandMenusPage.glossaryPushTerm', 'Push')}</dt>
          <dd>{t('brand:brandMenusPage.glossaryPushDef', 'Send this brand menu to franchise restaurant menus so customers can see and order it.')}</dd>
          <dt>{t('brand:brandMenusPage.glossarySyncTerm', 'Sync')}</dt>
          <dd>{t('brand:brandMenusPage.glossarySyncDef', 'After a push, the restaurant menu mirrors the brand version. "Synced v3" means the restaurant has the latest version 3.')}</dd>
          <dt>{t('brand:brandMenusPage.glossaryLockTerm', 'Lock')}</dt>
          <dd>{t('brand:brandMenusPage.glossaryLockDef', 'Restaurant admins cannot edit locked fields after sync. Useful for prices, brand name, and brand photos.')}</dd>
        </Glossary>
      </IntroCard>

      <SettingsCard>
        <SettingsSectionTitle>{t('brand:brandMenusPage.settingsDistributionTitle', 'How changes reach restaurants')}</SettingsSectionTitle>
        <SettingsSectionHint>
          {t('brand:brandMenusPage.settingsDistributionHint', 'When you edit a brand menu (price, name, image), should the change wait, or roll out instantly?')}
        </SettingsSectionHint>
        <RadioRow>
          <AutoSaveField onSave={persist} type="toggle">
            <input type="radio" name="distmode" checked={settings.default_distribution_mode === 'manual'}
              onChange={() => setSettings({ ...settings, default_distribution_mode: 'manual' })} />
          </AutoSaveField>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{t('brand:brandMenusPage.distributionManual', 'Manual — review before sending')}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{t('brand:brandMenusPage.distributionManualHint', 'Your edits stay on the brand side. Restaurants see a "pending update" badge until you click Push on the menu card.')}</div>
            <ScenarioHint>{t('brand:brandMenusPage.distributionManualScenario', 'Recommended for most brands — gives you a chance to batch changes before they go live.')}</ScenarioHint>
          </div>
        </RadioRow>
        <RadioRow>
          <AutoSaveField onSave={persist} type="toggle">
            <input type="radio" name="distmode" checked={settings.default_distribution_mode === 'auto'}
              onChange={() => setSettings({ ...settings, default_distribution_mode: 'auto' })} />
          </AutoSaveField>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{t('brand:brandMenusPage.distributionAuto', 'Auto — push as you save')}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{t('brand:brandMenusPage.distributionAutoHint', 'Every save instantly updates all linked restaurants. No manual push needed.')}</div>
            {settings.default_distribution_mode === 'auto' && (
              <WarningBox>
                <Info />
                <span>{t('brand:brandMenusPage.distributionAutoWarning', 'Heads up: every edit reaches all your franchise restaurants the moment you click Save. Use Manual if you want a confirmation step.')}</span>
              </WarningBox>
            )}
          </div>
        </RadioRow>
      </SettingsCard>

      <SettingsCard>
        <SettingsSectionTitle>{t('brand:brandMenusPage.settingsLocksTitle', 'What franchises cannot change')}</SettingsSectionTitle>
        <SettingsSectionHint>
          {t('brand:brandMenusPage.settingsLocksHint', 'Pre-check the fields that should stay identical across every restaurant. These become the starting locks for any new menu — you can still override per menu later.')}
        </SettingsSectionHint>
        {lockKeys.map(k => (
          <ToggleRow key={k}>
            <ToggleInfo>
              <strong>{lockLabels[k]}</strong>
              <div>{lockScenarios[k]}</div>
            </ToggleInfo>
            <AutoSaveField onSave={persist} type="toggle">
              <Switch type="checkbox" role="switch" aria-checked={settings.default_locks[k]}
                checked={settings.default_locks[k]}
                onChange={(e) => setSettings({ ...settings, default_locks: { ...settings.default_locks, [k]: e.target.checked } })} />
            </AutoSaveField>
          </ToggleRow>
        ))}
      </SettingsCard>

      <SettingsCard>
        <SettingsSectionTitle>{t('brand:brandMenusPage.settingsMenuOrderTitle', 'Menu display order')}</SettingsSectionTitle>
        <SettingsSectionHint>
          {t('brand:brandMenusPage.settingsMenuOrderHint', 'Controls whether restaurants keep your menu arrangement. This applies to ALL menus in this brand at once.')}
        </SettingsSectionHint>
        <ToggleRow>
          <ToggleInfo>
            <strong>{t('brand:brandMenusPage.enforceMenuOrder', 'Lock menu order across all restaurants')}</strong>
            <div>{t('brand:brandMenusPage.enforceMenuOrderHint', 'When ON: every restaurant displays menus in the order you set under the Menus tab (switch the sort to "Menu order" and drag the cards), and restaurants cannot reorder them. When OFF: each restaurant arranges its own menu order freely.')}</div>
          </ToggleInfo>
          <AutoSaveField onSave={persist} type="toggle">
            <Switch type="checkbox" role="switch" aria-checked={settings.enforce_menu_order}
              checked={settings.enforce_menu_order}
              onChange={(e) => setSettings({ ...settings, enforce_menu_order: e.target.checked })} />
          </AutoSaveField>
        </ToggleRow>
      </SettingsCard>

      <SettingsCard>
        <SettingsSectionTitle>{t('brand:brandMenusPage.settingsPushTargetTitle', 'Who receives the menu when you click Push')}</SettingsSectionTitle>
        <SettingsSectionHint>
          {t('brand:brandMenusPage.settingsPushTargetHint', 'Each menu card has a Push button. Decide what happens when you click it.')}
        </SettingsSectionHint>
        <RadioRow>
          <AutoSaveField onSave={persist} type="toggle">
            <input type="radio" name="pushtarget" checked={settings.default_push_target === 'all'}
              onChange={() => setSettings({ ...settings, default_push_target: 'all' })} />
          </AutoSaveField>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{t('brand:brandMenusPage.pushTargetAll', 'Send to all restaurants')}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{t('brand:brandMenusPage.pushTargetAllHint', 'A short "Are you sure?" confirm appears, then the menu rolls out to every restaurant under this brand.')}</div>
            <ScenarioHint>{t('brand:brandMenusPage.pushTargetAllScenario', 'Best when every restaurant should always serve every menu (single-concept brand).')}</ScenarioHint>
          </div>
        </RadioRow>
        <RadioRow>
          <AutoSaveField onSave={persist} type="toggle">
            <input type="radio" name="pushtarget" checked={settings.default_push_target === 'selected'}
              onChange={() => setSettings({ ...settings, default_push_target: 'selected' })} />
          </AutoSaveField>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{t('brand:brandMenusPage.pushTargetSelected', 'Pick restaurants each time')}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{t('brand:brandMenusPage.pushTargetSelectedHint', 'Clicking Push opens a dialog listing your franchise restaurants. You tick the ones that receive this menu (e.g. only Seoul stores get a regional special).')}</div>
            <ScenarioHint>{t('brand:brandMenusPage.pushTargetSelectedScenario', 'Best when some menus are seasonal, regional, or test-launched at a single location first.')}</ScenarioHint>
          </div>
        </RadioRow>
      </SettingsCard>

      <SettingsCard>
        <SettingsSectionTitle>{t('brand:brandMenusPage.settingsScopeTitle', 'Default scope for new menus')}</SettingsSectionTitle>
        <SettingsSectionHint>
          {t('brand:brandMenusPage.settingsScopeHint', 'Scope = which restaurants a menu applies to. A new menu starts with this setting; you can change it per menu via the Scope button.')}
        </SettingsSectionHint>
        <RadioRow>
          <AutoSaveField onSave={persist} type="toggle">
            <input type="radio" name="defscope" checked={settings.default_scope === 'all'}
              onChange={() => setSettings({ ...settings, default_scope: 'all' })} />
          </AutoSaveField>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{t('brand:brandMenusPage.scopeDefaultAll', 'Apply to all restaurants')}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{t('brand:brandMenusPage.scopeDefaultAllHint', 'New menus apply to every restaurant under this brand (and ones added later). Best for uniform, single-concept brands.')}</div>
          </div>
        </RadioRow>
        <RadioRow>
          <AutoSaveField onSave={persist} type="toggle">
            <input type="radio" name="defscope" checked={settings.default_scope === 'selected'}
              onChange={() => setSettings({ ...settings, default_scope: 'selected' })} />
          </AutoSaveField>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 500 }}>{t('brand:brandMenusPage.scopeDefaultSelected', 'Start with no restaurants')}</div>
            <div style={{ fontSize: 12, color: '#4B5563' }}>{t('brand:brandMenusPage.scopeDefaultSelectedHint', 'New menus apply nowhere until you pick restaurants in the Scope dialog. Best for brands that trial items at a flagship store first.')}</div>
          </div>
        </RadioRow>
      </SettingsCard>
    </div>
  );
};

// ──────────────────────────────────────────────────────────────────────────
// Push picker — restaurant selector for "Choose each time" mode
// ──────────────────────────────────────────────────────────────────────────
interface DistributionRow {
  restaurant_id: number;
  restaurant_name: string;
  branch_name: string | null;
  link_status: 'in_sync' | 'pending_update' | 'unlinked' | 'never_synced';
  synced_version: number | null;
  in_scope?: boolean;       // §14 적용범위 안인지
  scope_active?: boolean;   // retracted 여부 (false=숨김+보존)
  ra_active?: boolean | null;  // RA 활성화 여부
}

const PickerRow = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: border-color 0.15s;
  &:hover { border-color: #635BFF; }
  input { accent-color: #635BFF; flex-shrink: 0; }
`;

const StatusBadge = styled.span<{ $color: string; $bg: string }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 500;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  white-space: nowrap;
`;

const PushPickerModal: React.FC<{
  menuId: number;
  menuName: string;
  onClose: () => void;
  onConfirm: (ids: number[]) => void;
}> = ({ menuId, menuName, onClose, onConfirm }) => {
  const { t } = useTranslation(['brand', 'common']);
  const [rows, setRows] = useState<DistributionRow[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/brand-menus/${menuId}/distribution`, { headers: authHeaders() });
        const j = await r.json();
        if (!r.ok || !j.success) throw new Error(j.message || 'Load failed');
        setRows(j.data || []);
        // Pre-select restaurants that are not yet in_sync (sensible default).
        const pre = new Set<number>((j.data || [])
          .filter((x: DistributionRow) => x.link_status !== 'in_sync')
          .map((x: DistributionRow) => x.restaurant_id));
        setSelected(pre);
      } catch (e: any) {
        setErr(e?.message || 'Load failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [menuId]);

  const toggle = (rid: number) => {
    const next = new Set(selected);
    if (next.has(rid)) next.delete(rid); else next.add(rid);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === rows.length) setSelected(new Set());
    else setSelected(new Set(rows.map(r => r.restaurant_id)));
  };

  const statusBadge = (s: DistributionRow['link_status'], v: number | null) => {
    if (s === 'in_sync') return <StatusBadge $color="#059669" $bg="#ECFDF5">{t('brand:brandMenusPage.statusSynced', { v, defaultValue: `Synced v${v}` })}</StatusBadge>;
    if (s === 'pending_update') return <StatusBadge $color="#92400E" $bg="#FEF3C7">{t('brand:brandMenusPage.statusPending', 'Pending update')}</StatusBadge>;
    if (s === 'unlinked') return <StatusBadge $color="#4B5563" $bg="#F1F4F8">{t('brand:brandMenusPage.statusUnlinked', 'Unlinked')}</StatusBadge>;
    return <StatusBadge $color="#4B5563" $bg="#F1F4F8">{t('brand:brandMenusPage.statusNeverSynced', 'Never synced')}</StatusBadge>;
  };

  return (
    <CommonModal
      isOpen={true}
      onClose={onClose}
      title={t('brand:brandMenusPage.pushPickerTitle', { name: menuName, defaultValue: `Push "${menuName}" to selected restaurants` })}
      footer={
        <>
          <ThemedButton variant="cancel" onClick={onClose}>{t('common:button.cancel', 'Cancel')}</ThemedButton>
          <ThemedButton variant="primary" onClick={() => onConfirm(Array.from(selected))} disabled={selected.size === 0}>
            {t('brand:brandMenusPage.pushNSelected', { count: selected.size, defaultValue: `Push to ${selected.size} selected` })}
          </ThemedButton>
        </>
      }
    >
      {err && <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{err}</div>}
      <div style={{
        background: '#F8F7FF', border: '1px solid #E6E3FF', borderRadius: 8,
        padding: '10px 12px', marginBottom: 12, fontSize: 12, color: '#374151', lineHeight: 1.5
      }}>
        {t('brand:brandMenusPage.pushPickerIntro', 'Tick the restaurants that should receive this menu. The status badge on the right shows whether the restaurant already has the latest version.')}
        <div style={{ marginTop: 6, display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11 }}>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#10B981', marginRight: 4 }}></span>{t('brand:brandMenusPage.legendSynced', 'Synced — already up to date')}</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#F59E0B', marginRight: 4 }}></span>{t('brand:brandMenusPage.legendPending', 'Pending — has an older version')}</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#6B7280', marginRight: 4 }}></span>{t('brand:brandMenusPage.legendNever', 'Never synced — first push')}</span>
        </div>
      </div>
      {loading ? (
        <div style={{ padding: 24, textAlign: 'center', color: '#4B5563' }}>{t('common:label.loading', 'Loading...')}</div>
      ) : rows.length === 0 ? (
        <div style={{ padding: 24, textAlign: 'center', color: '#4B5563' }}>
          {t('brand:brandMenusPage.pushPickerEmpty', 'No franchise restaurants under this brand yet. Add restaurants in All Brands or Franchise tab first.')}
        </div>
      ) : (
        <>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', fontSize: 13, fontWeight: 500, color: '#0A2540', marginBottom: 8, cursor: 'pointer' }}>
            <input type="checkbox" checked={selected.size === rows.length} onChange={toggleAll} style={{ accentColor: '#635BFF' }} />
            {selected.size === rows.length
              ? t('brand:brandMenusPage.deselectAll', 'Deselect all')
              : t('brand:brandMenusPage.selectAll', { count: rows.length, defaultValue: `Select all (${rows.length})` })}
          </label>
          {rows.map(r => (
            <PickerRow key={r.restaurant_id}>
              <input type="checkbox" checked={selected.has(r.restaurant_id)} onChange={() => toggle(r.restaurant_id)} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#0A2540' }}>{r.restaurant_name}</div>
                {r.branch_name && <div style={{ fontSize: 12, color: '#4B5563' }}>{r.branch_name}</div>}
              </div>
              {statusBadge(r.link_status, r.synced_version)}
            </PickerRow>
          ))}
        </>
      )}
    </CommonModal>
  );
};

// 적용범위(Scope) 설정 모달 — 이 메뉴가 "어느 매장에 적용되는지"(BG 결정). §14
// 활성화(RA is_active)와 별개: 범위에 넣으면 그 매장에 상품 생성(비활성), 빼면 숨김+보존.
const ScopePickerModal: React.FC<{
  menuId: number;
  menuName: string;
  onClose: () => void;
  onSaved: () => void;
}> = ({ menuId, menuName, onClose, onSaved }) => {
  const { t } = useTranslation(['brand', 'common']);
  const [rows, setRows] = useState<DistributionRow[]>([]);
  const [mode, setMode] = useState<'all' | 'selected'>('all');
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [sr, dr] = await Promise.all([
          fetch(`/api/brand-menus/${menuId}/scope`, { headers: authHeaders() }),
          fetch(`/api/brand-menus/${menuId}/distribution`, { headers: authHeaders() })
        ]);
        const sj = await sr.json(); const dj = await dr.json();
        if (!sr.ok || !sj.success) throw new Error(sj.message || 'Load failed');
        setMode(sj.data?.scope_mode === 'selected' ? 'selected' : 'all');
        setSelected(new Set<number>(sj.data?.restaurant_ids || []));
        if (dr.ok && dj.success) setRows(dj.data || []);
      } catch (e: any) {
        setErr(e?.message || 'Load failed');
      } finally {
        setLoading(false);
      }
    })();
  }, [menuId]);

  const toggle = (rid: number) => {
    const next = new Set(selected);
    if (next.has(rid)) next.delete(rid); else next.add(rid);
    setSelected(next);
  };

  const save = async () => {
    setSaving(true); setErr(null);
    try {
      const r = await fetch(`/api/brand-menus/${menuId}/scope`, {
        method: 'PUT', headers: authHeaders(),
        body: JSON.stringify({ scope_mode: mode, restaurant_ids: mode === 'selected' ? Array.from(selected) : [] })
      });
      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || 'Save failed');
      onSaved();
    } catch (e: any) {
      setErr(e?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <CommonModal
      isOpen={true}
      onClose={onClose}
      title={t('brand:brandMenusPage.scopeModalTitle', { name: menuName, defaultValue: `Where does "${menuName}" apply?` })}
      footer={
        <>
          <ThemedButton variant="cancel" onClick={onClose}>{t('common:button.cancel', 'Cancel')}</ThemedButton>
          <ThemedButton variant="primary" onClick={save} disabled={saving || (mode === 'selected' && selected.size === 0)}>
            {saving ? t('common:label.saving', 'Saving...') : t('common:button.save', 'Save')}
          </ThemedButton>
        </>
      }
    >
      {err && <div style={{ padding: 12, background: '#FEE2E2', color: '#DC2626', borderRadius: 8, marginBottom: 12, fontSize: 13 }}>{err}</div>}
      <div style={{ background: '#F8F7FF', border: '1px solid #E6E3FF', borderRadius: 8, padding: '10px 12px', marginBottom: 16, fontSize: 12, color: '#374151', lineHeight: 1.5 }}>
        {t('brand:brandMenusPage.scopeIntro', 'Scope decides WHICH restaurants carry this menu. Each restaurant then turns it on/off itself (activation). Removing a restaurant from scope hides the menu there but keeps its data — re-add to restore.')}
      </div>

      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 0', cursor: 'pointer', fontSize: 14, color: '#0A2540' }}>
        <input type="radio" name="scopeMode" checked={mode === 'all'} onChange={() => setMode('all')} style={{ marginTop: 3, accentColor: '#635BFF' }} />
        <span>
          <strong>{t('brand:brandMenusPage.scopeAllLabel', 'All restaurants')}</strong>
          <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>{t('brand:brandMenusPage.scopeAllHint', 'Every restaurant under this brand — including ones added later — carries this menu.')}</div>
        </span>
      </label>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '10px 0', cursor: 'pointer', fontSize: 14, color: '#0A2540' }}>
        <input type="radio" name="scopeMode" checked={mode === 'selected'} onChange={() => setMode('selected')} style={{ marginTop: 3, accentColor: '#635BFF' }} />
        <span>
          <strong>{t('brand:brandMenusPage.scopeSelectedLabel', 'Selected restaurants only')}</strong>
          <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>{t('brand:brandMenusPage.scopeSelectedHint', 'Only the restaurants you tick. Good for trialling a new item at a flagship store first.')}</div>
        </span>
      </label>

      {mode === 'selected' && (
        <div style={{ marginTop: 12, borderTop: '1px solid #E6EBF1', paddingTop: 12 }}>
          {loading ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#4B5563' }}>{t('common:label.loading', 'Loading...')}</div>
          ) : rows.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: '#4B5563' }}>
              {t('brand:brandMenusPage.pushPickerEmpty', 'No franchise restaurants under this brand yet. Add restaurants in All Brands or Franchise tab first.')}
            </div>
          ) : (
            rows.map(r => (
              <PickerRow key={r.restaurant_id}>
                <input type="checkbox" checked={selected.has(r.restaurant_id)} onChange={() => toggle(r.restaurant_id)} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#0A2540' }}>{r.restaurant_name}</div>
                  {r.branch_name && <div style={{ fontSize: 12, color: '#4B5563' }}>{r.branch_name}</div>}
                </div>
                {r.in_scope && r.scope_active === false && (
                  <StatusBadge $color="#92400E" $bg="#FEF3C7">{t('brand:brandMenusPage.scopeRetracted', 'Hidden — preserved')}</StatusBadge>
                )}
              </PickerRow>
            ))
          )}
        </div>
      )}
    </CommonModal>
  );
};

export default BrandMenusPage;
