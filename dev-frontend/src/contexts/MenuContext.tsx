import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import { getAuthToken } from '../utils/auth';
export interface SetMenuItem {
  menuItemId: number;
  name: string;
  quantity: number;
}

export interface MenuItem {
  id: string;
  code?: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description?: string;
  soldOut?: boolean;
  is_active?: boolean;
  image?: string;
  options?: MenuOption[];
  optionGroups?: string[];
  preparationTime?: number;
  is_set_menu?: boolean;
  set_items?: SetMenuItem[];
  set_groups?: any[] | null;  // 세트 v2 슬롯 (SET_MENU_REDESIGN)
  set_display_order?: number;
  recipe_id?: number | null;
  kitchen_station_id?: number | null;
  is_featured?: boolean;
  after_meal?: boolean;
  brand_menu_id?: number | null;
  brand_menu_locks_snapshot?: Record<string, boolean> | null;
  brand_menu_synced_version?: number | null;
  brand_menu_status?: 'in_sync' | 'pending_update' | 'unlinked' | null;
  takeaway_charge?: number;
  createdAt?: string | null;
}

export interface MenuOption {
  id: string;
  name: string;
  price: number;
  category: 'spice' | 'size' | 'extra' | 'preference';
}

export interface OptionGroup {
  id: string;
  name: string;
  required: boolean;
  multiple: boolean;
  options: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
  order: number;
  isActive?: boolean;
  kitchen_station_id?: number | null;
}

interface MenuContextType {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  optionGroups: OptionGroup[];
  isLoadingMenu: boolean;
  loadedCategories: Set<string>;
  getItemsByCategory: (categoryId: string) => MenuItem[];
  getItemById: (itemId: string) => MenuItem | undefined;
  loadMenuByCategory: (categoryId: string) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  addMenuItem: (item: MenuItem) => Promise<void>;
  removeMenuItem: (itemId: string) => Promise<void>;
  toggleItemSoldOut: (itemId: string) => Promise<void>;
  addCategory: (category: Omit<MenuCategory, 'id'> & { id?: string }) => Promise<void>;
  updateCategory: (categoryId: string, updates: Partial<MenuCategory>) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  reorderCategories: (categories: MenuCategory[]) => void;
  addOptionGroup: (group: OptionGroup) => Promise<void>;
  updateOptionGroup: (groupId: string, updates: Partial<OptionGroup>) => Promise<void>;
  deleteOptionGroup: (groupId: string) => Promise<void>;
  reloadMenu: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

// 기본 메뉴 카테고리 (DB에서 가져옴)
const DEFAULT_CATEGORIES: MenuCategory[] = [];

// 카테고리 캐시 키 생성 (레스토랑별로 구분)
const getCategoryCacheKey = (restaurantId: string | null) =>
  restaurantId ? `menu_categories_${restaurantId}` : null;

// 캐시된 카테고리 불러오기
const loadCachedCategories = (restaurantId: string | null): MenuCategory[] => {
  const cacheKey = getCategoryCacheKey(restaurantId);
  if (!cacheKey) return [];
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {

  }
  return [];
};

// 카테고리 캐시 저장
const saveCategoriesCache = (restaurantId: string | null, categories: MenuCategory[]) => {
  const cacheKey = getCategoryCacheKey(restaurantId);
  if (!cacheKey || categories.length === 0) return;
  try {
    localStorage.setItem(cacheKey, JSON.stringify(categories));
  } catch (e) {

  }
};

const DEFAULT_OPTION_GROUPS: OptionGroup[] = [];

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const location = useLocation();
  const [categories, setCategories] = useState<MenuCategory[]>(DEFAULT_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>(DEFAULT_OPTION_GROUPS);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const [loadedCategories, setLoadedCategories] = useState<Set<string>>(new Set());

  // Helper function to get fetch options with credentials
  const getFetchOptions = (options: RequestInit = {}): RequestInit => {
    const token = getAuthToken();
    return {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
      }
    };
  };

  // 메뉴 로드 함수를 별도로 분리 (useCallback으로 감싸서 안정적인 참조 유지)
  const loadMenuFromAPI = useCallback(async () => {
    try {
      // Skip API calls if no auth token (except for mobile pages which use slug-based API)
      const token = getAuthToken();
      const isMobilePage = window.location.pathname.includes('/mobile/');

      if (!token && !isMobilePage) {
        return;
      }

      // Get restaurantId from URL path (e.g., /restaurant/5/menu)
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const mobileIndex = pathParts.indexOf('mobile');

      let restaurantId = null;
      let slug = null;
      let url = null;

      if (restaurantIndex >= 0) {
        // Restaurant admin path: /restaurant/5/menu
        restaurantId = pathParts[restaurantIndex + 1];
        url = `/api/menu?restaurantId=${restaurantId}`;
      } else if (mobileIndex >= 0) {
        // Mobile path: /mobile/kdine-korean/menu
        slug = pathParts[mobileIndex + 1];
        url = `/api/mobile/menu/${slug}`;
      }

      // Skip loading if no restaurant context
      if (!restaurantId && !slug) {
        return;
      }

      const response = await fetch(url, {
        ...getFetchOptions()
      });

      if (!response.ok) {

        return;
      }

      const data = await response.json();

      if (data.success && data.data) {
        // 카테고리 추출 및 변환
        const categoryEmojis = ['🍔', '🍕', '🥤', '🍰', '🍜', '🥗', '🍣', '🌮'];

        const cats = data.data.categories.map((cat: any, idx: number) => {
          const categoryId = cat.id ? cat.id.toString() : cat.name.toLowerCase().replace(/\s+/g, '_');
          return {
            id: categoryId,
            name: cat.name,
            emoji: cat.emoji || categoryEmojis[idx % categoryEmojis.length],
            order: cat.displayOrder !== undefined ? cat.displayOrder : idx,
            isActive: cat.isActive !== undefined ? cat.isActive : true,
            kitchen_station_id: cat.kitchen_station_id || null
          };
        });

        setCategories(cats);
        // 카테고리 캐시 저장
        saveCategoriesCache(restaurantId, cats);

        // 메뉴 아이템 변환
        const items = data.data.items.map((item: any) => {
          // optionGroups가 문자열이면 JSON 파싱
          let parsedOptionGroups = [];
          if (item.optionGroups) {
            try {
              parsedOptionGroups = typeof item.optionGroups === 'string'
                ? JSON.parse(item.optionGroups)
                : item.optionGroups;
            } catch (e) {

              parsedOptionGroups = [];
            }
          }

          // 카테고리 ID 결정: categoryId를 문자열로 변환
          let categoryId = '';
          if (item.categoryId) {
            categoryId = item.categoryId.toString();
          } else if (item.category) {
            categoryId = item.category.toLowerCase().replace(/\s+/g, '_');
          }

          return {
            id: item.id.toString(),
            code: item.code || undefined,
            name: item.name,
            price: parseFloat(item.price),
            category: categoryId,
            description: item.description || '',
            emoji: item.emoji || '🍽️',  // API에서 받은 emoji 사용, 없으면 기본값
            soldOut: item.soldOut || false,
            image: item.image || undefined,
            options: item.options || [],
            optionGroups: parsedOptionGroups,
            preparationTime: item.preparationTime || 15,
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || undefined,
            set_groups: item.set_groups || undefined,
            set_display_order: item.set_display_order || 0,
            recipe_id: item.recipe_id || null,
            after_meal: item.after_meal || false,
            kitchen_station_id: item.kitchen_station_id || null,
            brand_menu_id: item.brand_menu_id || null,
            brand_menu_locks_snapshot: typeof item.brand_menu_locks_snapshot === 'string'
              ? (() => { try { return JSON.parse(item.brand_menu_locks_snapshot); } catch { return null; } })()
              : (item.brand_menu_locks_snapshot || null),
            brand_menu_synced_version: item.brand_menu_synced_version || null,
            brand_menu_status: item.brand_menu_status || null,
            takeaway_charge: item.takeaway_charge != null ? Number(item.takeaway_charge) : 0,
            createdAt: item.createdAt || item.created_at || null
          } as any;
        });

        // Sort items: newest first within each category
        items.sort((a: MenuItem, b: MenuItem) => {
          // Different categories - maintain category order
          if (a.category !== b.category) {
            return 0;
          }

          // Same category - set menus first
          if (a.is_set_menu && !b.is_set_menu) return -1;
          if (!a.is_set_menu && b.is_set_menu) return 1;

          // Both are set menus - sort by set_display_order
          if (a.is_set_menu && b.is_set_menu) {
            return (a.set_display_order || 0) - (b.set_display_order || 0);
          }

          // Both are regular menus - sort by ID descending (newest first)
          return parseInt(b.id) - parseInt(a.id);
        });

        setMenuItems(items);

        // Sync kitchenStationMenuMap to localStorage so billPrint.js
        // (POS / LiveOrders / FloorPlan kitchen ticket printing) can resolve
        // station names even when KDS page is not open on this device.
        // Previously KDS was the only writer — cashier devices that never
        // opened KDS had an empty map, so printed tickets had blank station
        // tags (2026-05-28 The Fire 매장 영업 1일차 critical 보고).
        try {
          const catStationMap = new Map<string, number>();
          cats.forEach((c: any) => {
            if (c.kitchen_station_id) catStationMap.set(String(c.id), c.kitchen_station_id);
          });
          const map: Record<string, number> = {};
          items.forEach((item: any) => {
            const sid = item.kitchen_station_id || catStationMap.get(String(item.category));
            if (sid) {
              map[item.name] = sid;
              if (item.code) map[`${item.code} ${item.name}`] = sid;
            }
          });
          if (Object.keys(map).length > 0) {
            localStorage.setItem('kitchenStationMenuMap', JSON.stringify(map));
          } else {
            localStorage.removeItem('kitchenStationMenuMap');
          }
        } catch { /* silent */ }
      } else {

      }
    } catch (error) {

    }
  }, []); // No dependencies - uses window.location directly

  // 옵션 그룹 로드 함수 (useCallback으로 감싸서 안정적인 참조 유지)
  const loadOptionGroupsFromAPI = useCallback(async () => {
    try {

      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      // Skip loading if no restaurant context (e.g., admin pages, manager pages)
      if (!restaurantId) {
        return;
      }

      const url = `/api/option-groups?restaurantId=${restaurantId}`;

      const response = await fetch(url, {
        ...getFetchOptions()
      });

      if (!response.ok) {

        return;
      }

      const data = await response.json();

      if (data.success && data.data) {
        setOptionGroups(data.data);
      } else {

      }
    } catch (error) {

    }
  }, []); // No dependencies - uses window.location directly

  // 카테고리별 메뉴 로딩 함수 (POS Terminal 등에서 사용)
  const loadMenuByCategory = useCallback(async (categoryId: string) => {
    try {
      // 이미 로드된 카테고리는 스킵 (all 제외)
      if (categoryId !== 'all' && loadedCategories.has(categoryId)) {
        return;
      }

      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      if (!restaurantId) return;

      setIsLoadingMenu(true);

      // all이면 전체 로드, 아니면 카테고리별 로드
      const url = categoryId === 'all'
        ? `/api/menu?restaurantId=${restaurantId}`
        : `/api/menu?restaurantId=${restaurantId}&categoryId=${categoryId}`;

      const response = await fetch(url, { ...getFetchOptions() });

      if (!response.ok) {

        return;
      }

      const data = await response.json();

      if (data.success && data.data) {
        // 메뉴 아이템 변환
        const newItems = data.data.items.map((item: any) => {
          let parsedOptionGroups = [];
          if (item.optionGroups) {
            try {
              parsedOptionGroups = typeof item.optionGroups === 'string'
                ? JSON.parse(item.optionGroups)
                : item.optionGroups;
            } catch (e) {
              parsedOptionGroups = [];
            }
          }

          let catId = '';
          if (item.categoryId) {
            catId = item.categoryId.toString();
          } else if (item.category) {
            catId = item.category.toLowerCase().replace(/\s+/g, '_');
          }

          return {
            id: item.id.toString(),
            code: item.code || undefined,
            name: item.name,
            price: parseFloat(item.price),
            category: catId,
            description: item.description || '',
            emoji: item.emoji || '🍽️',
            soldOut: item.soldOut || false,
            image: item.image || undefined,
            options: item.options || [],
            optionGroups: parsedOptionGroups,
            preparationTime: item.preparationTime || 15,
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items || undefined,
            set_groups: item.set_groups || undefined,
            set_display_order: item.set_display_order || 0,
            recipe_id: item.recipe_id || null,
            after_meal: item.after_meal || false,
            takeaway_charge: item.takeaway_charge != null ? Number(item.takeaway_charge) : 0
          };
        });

        // 정렬
        newItems.sort((a: MenuItem, b: MenuItem) => {
          if (a.category !== b.category) return 0;
          if (a.is_set_menu && !b.is_set_menu) return -1;
          if (!a.is_set_menu && b.is_set_menu) return 1;
          if (a.is_set_menu && b.is_set_menu) {
            return (a.set_display_order || 0) - (b.set_display_order || 0);
          }
          return parseInt(a.id) - parseInt(b.id);
        });

        if (categoryId === 'all') {
          // 전체 로드 시 교체
          setMenuItems(newItems);
          setLoadedCategories(new Set(['all']));
        } else {
          // 카테고리별 로드 시 병합 (중복 제거)
          setMenuItems(prev => {
            const existingIds = new Set(prev.map(item => item.id));
            const uniqueNewItems = newItems.filter((item: MenuItem) => !existingIds.has(item.id));
            return [...prev, ...uniqueNewItems];
          });
          setLoadedCategories(prev => {
            const newSet = new Set(prev);
            newSet.add(categoryId);
            return newSet;
          });
        }
      }
    } catch (error) {

    } finally {
      setIsLoadingMenu(false);
    }
  }, [loadedCategories]);

  // 초기 로드 및 레스토랑 변경 시 다시 로드
  useEffect(() => {
    // Extract restaurant ID or slug from URL
    const pathParts = location.pathname.split('/');
    const restaurantIndex = pathParts.indexOf('restaurant');
    const mobileIndex = pathParts.indexOf('mobile');
    const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;
    const slug = mobileIndex >= 0 ? pathParts[mobileIndex + 1] : null;

    // Only load if we're on a restaurant or mobile page
    if (restaurantId || slug) {
      // 캐시된 카테고리 먼저 로드 (즉시 탭 표시를 위해)
      if (restaurantId) {
        const cachedCategories = loadCachedCategories(restaurantId);
        if (cachedCategories.length > 0) {
          setCategories(cachedCategories);
        }
      }

      // API에서 최신 데이터 로드
      loadMenuFromAPI();
      if (restaurantId) {
        // Only load option groups for restaurant admin pages
        loadOptionGroupsFromAPI();
      }
    }
  }, [location.pathname, loadMenuFromAPI, loadOptionGroupsFromAPI]); // Include all dependencies

  // localStorage 사용 안함 - saveMenu 함수 제거됨

  const getItemsByCategory = (categoryId: string): MenuItem[] => {
    return menuItems.filter(item => item.category === categoryId);
  };

  const getItemById = (itemId: string): MenuItem | undefined => {
    return menuItems.find(item => item.id === itemId);
  };

  const updateMenuItem = async (updatedItem: MenuItem) => {
    try {
      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      // API 호출
      const requestBody = {
        code: updatedItem.code,
        name: updatedItem.name,
        price: updatedItem.price,
        category: updatedItem.category,
        description: updatedItem.description,
        image: updatedItem.image,
        emoji: updatedItem.emoji,
        soldOut: updatedItem.soldOut,
        optionGroups: updatedItem.optionGroups,
        is_set_menu: updatedItem.is_set_menu,
        set_items: updatedItem.set_items,
        set_groups: updatedItem.set_groups,
        set_display_order: updatedItem.set_display_order,
        recipe_id: updatedItem.recipe_id || null,
        after_meal: updatedItem.after_meal ?? false,
        takeaway_charge: updatedItem.takeaway_charge ?? 0,
        directIngredients: (updatedItem as any).directIngredients || undefined
      };

      const url = restaurantId
        ? `/api/menu/product/${updatedItem.id}?restaurantId=${restaurantId}`
        : `/api/menu/product/${updatedItem.id}`;

      const response = await fetch(url, {
        method: 'PUT',
        ...getFetchOptions(),
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to update menu item');
      }

      // API 응답에서 실제 저장된 데이터 가져오기
      const responseData = await response.json();
      const savedItem = responseData.data;

      // 성공 시 로컬 상태 업데이트
      // API 응답 데이터와 updatedItem을 병합 (image가 누락될 수 있으므로)
      const mergedItem: MenuItem = {
        ...updatedItem,
        ...(savedItem && {
          id: String(savedItem.id),
          name: savedItem.name,
          price: parseFloat(savedItem.price),
          category: savedItem.category,
          description: savedItem.description || '',
          emoji: savedItem.emoji || updatedItem.emoji,
          soldOut: savedItem.soldOut || false,
          // image는 savedItem에 있으면 사용, 없으면 updatedItem 유지
          image: savedItem.image || updatedItem.image,
          optionGroups: savedItem.option_groups ? JSON.parse(savedItem.option_groups) : updatedItem.optionGroups,
          is_set_menu: savedItem.is_set_menu || false,
          set_items: savedItem.set_items || updatedItem.set_items,
          set_display_order: savedItem.set_display_order || 0,
          recipe_id: savedItem.recipe_id || null
        })
      };

      const newItems = menuItems.map(item =>
        item.id === updatedItem.id ? mergedItem : item
      );
      setMenuItems(newItems);
    } catch (error) {

      throw error;
    }
  };

  const addMenuItem = async (newItem: MenuItem) => {
    try {
      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      // API 호출
      const requestBody = {
        code: newItem.code,
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        description: newItem.description,
        image: newItem.image,
        emoji: newItem.emoji,
        optionGroups: newItem.optionGroups,
        is_set_menu: newItem.is_set_menu,
        set_items: newItem.set_items,
        set_groups: newItem.set_groups,
        set_display_order: newItem.set_display_order,
        recipe_id: newItem.recipe_id || null,
        after_meal: newItem.after_meal ?? false,
        takeaway_charge: newItem.takeaway_charge ?? 0,
        directIngredients: (newItem as any).directIngredients || undefined,
        ...(restaurantId && { restaurant_id: restaurantId })
      };

      const response = await fetch('/api/menu/product', {
        method: 'POST',
        ...getFetchOptions(),
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to add menu item');
      }

      // API 응답에서 실제 생성된 데이터 가져오기
      const responseData = await response.json();
      const createdItem = responseData.data
        ? { ...responseData.data, id: String(responseData.data.id) }
        : { ...newItem, id: String(responseData.data?.id || newItem.id) };

      // 성공 시 로컬 상태 업데이트 (최신 아이템이 맨 앞에 오도록)
      const newItems = [createdItem, ...menuItems];
      setMenuItems(newItems);
    } catch (error) {

      throw error;
    }
  };

  const removeMenuItem = async (itemId: string) => {
    try {
      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      const url = restaurantId
        ? `/api/menu/product/${itemId}?restaurantId=${restaurantId}`
        : `/api/menu/product/${itemId}`;

      // API 호출
      const response = await fetch(url, {
        method: 'DELETE',
        ...getFetchOptions()
      });

      if (!response.ok) {
        throw new Error('Failed to delete menu item');
      }

      // 성공 시 로컬 상태 업데이트
      const newItems = menuItems.filter(item => item.id !== itemId);
      setMenuItems(newItems);

    } catch (error) {

      throw error;
    }
  };

  const toggleItemSoldOut = async (itemId: string) => {
    try {
      const item = menuItems.find(i => i.id === itemId);
      if (!item) return;

      const updatedItem = { ...item, soldOut: !item.soldOut };

      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      const url = restaurantId
        ? `/api/menu/product/${itemId}?restaurantId=${restaurantId}`
        : `/api/menu/product/${itemId}`;

      // API 호출
      const response = await fetch(url, {
        method: 'PUT',
        ...getFetchOptions(),
        body: JSON.stringify({
          name: updatedItem.name,
          price: updatedItem.price,
          category: updatedItem.category,
          description: updatedItem.description,
          image: updatedItem.image,
          soldOut: updatedItem.soldOut
        })
      });

      if (!response.ok) {
        throw new Error('Failed to toggle sold out status');
      }

      // 성공 시 로컬 상태 업데이트
      const newItems = menuItems.map(i =>
        i.id === itemId ? updatedItem : i
      );
      setMenuItems(newItems);
    } catch (error) {

      throw error;
    }
  };

  const addCategory = async (category: Omit<MenuCategory, 'id'> & { id?: string }) => {
    try {
      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      if (!restaurantId) {
        throw new Error('Restaurant ID not found in URL');
      }

      // API 호출
      const response = await fetch(`/api/categories?restaurantId=${restaurantId}`, {
        method: 'POST',
        ...getFetchOptions(),
        body: JSON.stringify({
          name: category.name,
          emoji: category.emoji || '🍽️',
          description: `Category: ${category.name}`
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.error || 'Failed to add category');
      }

      // 성공 시 메뉴 전체 다시 로드 (DB와 동기화)
      await loadMenuFromAPI();

    } catch (error) {

      throw error;
    }
  };

  const updateCategory = async (categoryId: string, updates: Partial<MenuCategory>) => {
    try {
      const oldCategory = categories.find(cat => cat.id === categoryId);
      if (!oldCategory) {
        throw new Error('Category not found');
      }

      // Get restaurantId from URL path
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      if (!restaurantId) {
        throw new Error('Restaurant ID not found in URL');
      }

      // API 호출 - 카테고리 업데이트 (이름, 이모지, 설명 등)
      const response = await fetch(`/api/categories/id/${categoryId}?restaurantId=${restaurantId}`, {
        method: 'PUT',
        ...getFetchOptions(),
        body: JSON.stringify({
          name: updates.name,
          emoji: updates.emoji,
          description: updates.name ? `Category: ${updates.name}` : undefined
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.error || 'Failed to update category');
      }

      // 성공 시 메뉴 전체 다시 로드 (DB와 동기화)
      await loadMenuFromAPI();

    } catch (error) {

      throw error;
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      const category = categories.find(cat => cat.id === categoryId);
      if (!category) {
        throw new Error('Category not found');
      }

      // API 호출 - 카테고리 삭제 (제품들은 Uncategorized로 이동)
      const response = await fetch(`/api/categories/${category.name}`, {
        method: 'DELETE',
        ...getFetchOptions()
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      // 성공 시 메뉴 전체 다시 로드 (DB와 동기화)
      await loadMenuFromAPI();

    } catch (error) {

      throw error;
    }
  };

  const reorderCategories = async (newCategories: MenuCategory[]) => {

    try {
      // Update local state immediately for responsiveness
      setCategories(newCategories);

      // Get restaurantId from URL
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      if (!restaurantId) {

        return;
      }

      const token = getAuthToken();

      const payload = { categories: newCategories };

      // Save to backend
      const url = `/api/categories/reorder?restaurantId=${restaurantId}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
          throw new Error(`Failed to reorder categories: ${response.status}`);
      }

      await response.json();

    } catch (error) {

      // Reload to get correct order from backend
      await loadMenuFromAPI();
    }
  };

  const addOptionGroup = async (group: OptionGroup) => {
    try {
      // Get restaurantId from URL
      const pathParts = window.location.pathname.split('/');
      const restaurantIndex = pathParts.indexOf('restaurant');
      const restaurantId = restaurantIndex >= 0 ? pathParts[restaurantIndex + 1] : null;

      const response = await fetch('/api/option-groups', {
        method: 'POST',
        ...getFetchOptions(),
        body: JSON.stringify({
          name: group.name,
          required: group.required,
          multiple: group.multiple,
          options: group.options,
          restaurant_id: restaurantId
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.error || 'Failed to create option group');
      }

      const result = await response.json();
      if (result.success && result.data) {

        // 성공 시 옵션 그룹 전체 다시 로드 (DB와 동기화)
        await loadOptionGroupsFromAPI();

      }
    } catch (error) {

      throw error;
    }
  };

  const updateOptionGroup = async (groupId: string, updates: Partial<OptionGroup>) => {
    try {
      const group = optionGroups.find(g => g.id === groupId);
      if (!group) {
        throw new Error('Option group not found');
      }

      const updatedGroup = { ...group, ...updates };

      const response = await fetch(`/api/option-groups/${groupId}`, {
        method: 'PUT',
        ...getFetchOptions(),
        body: JSON.stringify({
          name: updatedGroup.name,
          required: updatedGroup.required,
          multiple: updatedGroup.multiple,
          options: updatedGroup.options
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.error || 'Failed to update option group');
      }

      const result = await response.json();
      if (result.success && result.data) {

        // 성공 시 옵션 그룹 전체 다시 로드 (DB와 동기화)
        await loadOptionGroupsFromAPI();

      }
    } catch (error) {

      throw error;
    }
  };

  const deleteOptionGroup = async (groupId: string) => {
    try {
      const response = await fetch(`/api/option-groups/${groupId}`, {
        method: 'DELETE',
        ...getFetchOptions()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(errorData.error || 'Failed to delete option group');
      }

      // 성공 시 옵션 그룹 전체 다시 로드 (DB와 동기화)
      await loadOptionGroupsFromAPI();

    } catch (error) {

      throw error;
    }
  };

  return (
    <MenuContext.Provider value={{
      categories,
      menuItems,
      optionGroups,
      isLoadingMenu,
      loadedCategories,
      getItemsByCategory,
      getItemById,
      loadMenuByCategory,
      updateMenuItem,
      addMenuItem,
      removeMenuItem,
      toggleItemSoldOut,
      addCategory,
      updateCategory,
      deleteCategory,
      reorderCategories,
      addOptionGroup,
      updateOptionGroup,
      deleteOptionGroup,
      reloadMenu: loadMenuFromAPI
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuContext;
