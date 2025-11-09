import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export interface SetMenuItem {
  menuItemId: number;
  name: string;
  quantity: number;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  description?: string;
  soldOut?: boolean;
  image?: string;
  options?: MenuOption[];
  optionGroups?: string[];
  preparationTime?: number;
  is_set_menu?: boolean;
  set_items?: SetMenuItem[];
  set_display_order?: number;
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
}

interface MenuContextType {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  optionGroups: OptionGroup[];
  getItemsByCategory: (categoryId: string) => MenuItem[];
  getItemById: (itemId: string) => MenuItem | undefined;
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

// 기본 메뉴 옵션들
const DEFAULT_OPTIONS: MenuOption[] = [];

// POS에서 가져온 메뉴 데이터 (통합된 버전)
const DEFAULT_MENU_ITEMS: MenuItem[] = [];

// localStorage 사용 안함

const DEFAULT_OPTION_GROUPS: OptionGroup[] = [];

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const location = useLocation();
  const [categories, setCategories] = useState<MenuCategory[]>(DEFAULT_CATEGORIES);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>(DEFAULT_OPTION_GROUPS);

  // Helper function to get fetch options with credentials
  const getFetchOptions = (options: RequestInit = {}): RequestInit => {
    const token = localStorage.getItem('auth_token');
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
        console.error('Failed to load menu:', response.status);
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
            order: idx
          };
        });

        setCategories(cats);

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
              console.warn('Failed to parse optionGroups for item:', item.id, e);
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
            set_display_order: item.set_display_order || 0
          };
        });

        // Sort items: set menus first within each category
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

          // Both are regular menus - sort by ID (creation order)
          return parseInt(a.id) - parseInt(b.id);
        });

        setMenuItems(items);
      } else {
        console.warn('MenuContext - Invalid API response format');
      }
    } catch (error) {
      console.error('MenuContext - Failed to load menu from API:', error);
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
        console.error('Failed to load option groups:', response.status);
        return;
      }

      const data = await response.json();

      if (data.success && data.data) {
        setOptionGroups(data.data);
      } else {
        console.warn('MenuContext - Invalid option groups response:', data);
      }
    } catch (error) {
      console.error('MenuContext - Failed to load option groups from API:', error);
    }
  }, []); // No dependencies - uses window.location directly

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
        set_display_order: updatedItem.set_display_order
      };
      console.log('🔵 Updating menu item with data:', requestBody);

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
      const savedItem = responseData.data || updatedItem;

      // 성공 시 로컬 상태 업데이트 (API에서 받은 데이터 사용)
      const newItems = menuItems.map(item =>
        item.id === updatedItem.id ? { ...savedItem, id: String(savedItem.id) } : item
      );
      setMenuItems(newItems);
    } catch (error) {
      console.error('Failed to update menu item:', error);
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
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        description: newItem.description,
        image: newItem.image,
        emoji: newItem.emoji,
        optionGroups: newItem.optionGroups,
        is_set_menu: newItem.is_set_menu,
        set_items: newItem.set_items,
        set_display_order: newItem.set_display_order,
        ...(restaurantId && { restaurant_id: restaurantId })
      };
      console.log('🟢 Creating menu item with data:', requestBody);

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

      // 성공 시 로컬 상태 업데이트 (API에서 받은 데이터 사용)
      const newItems = [...menuItems, createdItem];
      setMenuItems(newItems);
    } catch (error) {
      console.error('Failed to add menu item:', error);
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
      console.log('Menu item deleted:', itemId);
    } catch (error) {
      console.error('Failed to delete menu item:', error);
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
      console.error('Failed to toggle sold out:', error);
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
        console.error('Failed to add category:', errorData);
        throw new Error(errorData.error || 'Failed to add category');
      }

      console.log('Category added on server:', category.name);

      // 성공 시 메뉴 전체 다시 로드 (DB와 동기화)
      await loadMenuFromAPI();
      console.log('Menu reloaded after category addition');
    } catch (error) {
      console.error('Failed to add category:', error);
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
        console.error('Failed to update category:', errorData);
        throw new Error(errorData.error || 'Failed to update category');
      }

      console.log('Category updated on server:', updates);

      // 성공 시 메뉴 전체 다시 로드 (DB와 동기화)
      await loadMenuFromAPI();
      console.log('Menu reloaded after category update');
    } catch (error) {
      console.error('Failed to update category:', error);
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

      console.log('Category deleted on server:', category.name);

      // 성공 시 메뉴 전체 다시 로드 (DB와 동기화)
      await loadMenuFromAPI();
      console.log('Menu reloaded after category deletion');
    } catch (error) {
      console.error('Failed to delete category:', error);
      throw error;
    }
  };

  const reorderCategories = (newCategories: MenuCategory[]) => {
    setCategories(newCategories);
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
        console.error('Failed to create option group:', errorData);
        throw new Error(errorData.error || 'Failed to create option group');
      }

      const result = await response.json();
      if (result.success && result.data) {
        console.log('Option group created:', result.data.id);

        // 성공 시 옵션 그룹 전체 다시 로드 (DB와 동기화)
        await loadOptionGroupsFromAPI();
        console.log('Option groups reloaded after creation');
      }
    } catch (error) {
      console.error('Failed to create option group:', error);
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
        console.error('Failed to update option group:', errorData);
        throw new Error(errorData.error || 'Failed to update option group');
      }

      const result = await response.json();
      if (result.success && result.data) {
        console.log('Option group updated:', groupId);

        // 성공 시 옵션 그룹 전체 다시 로드 (DB와 동기화)
        await loadOptionGroupsFromAPI();
        console.log('Option groups reloaded after update');
      }
    } catch (error) {
      console.error('Failed to update option group:', error);
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
        console.error('Failed to delete option group:', errorData);
        throw new Error(errorData.error || 'Failed to delete option group');
      }

      console.log('Option group deleted:', groupId);

      // 성공 시 옵션 그룹 전체 다시 로드 (DB와 동기화)
      await loadOptionGroupsFromAPI();
      console.log('Option groups reloaded after deletion');
    } catch (error) {
      console.error('Failed to delete option group:', error);
      throw error;
    }
  };

  return (
    <MenuContext.Provider value={{
      categories,
      menuItems,
      optionGroups,
      getItemsByCategory,
      getItemById,
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
