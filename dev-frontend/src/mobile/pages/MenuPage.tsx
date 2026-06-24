import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Utensils, ShoppingBag, Clock, Truck, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';
import { getStoreOpenState } from '../utils/storeHours';

interface MenuCategory {
  id: string;
  name: string;
  emoji: string;
}

interface MenuItem {
  id: string;
  code?: string;
  name: string;
  price: number;
  categoryId: string;
  emoji?: string;
  image?: string;
  is_set_menu?: boolean;
  is_featured?: boolean;
  set_items?: Array<{ name: string; quantity: number }>;
  orderCount?: number;
  isAvailable?: boolean;
  schedule_unavailable?: boolean;
  schedule?: { start_time?: string | null; end_time?: string | null; days?: number[]; start_date?: string | null; end_date?: string | null };
}

interface PaginationInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
}

const StoreHeader = styled.div`
  background: white;
  padding: 14px 16px;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #C7CED6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
`;

const StoreName = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

const StoreBranch = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #4B5563;
  margin-top: 1px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StoreStatus = styled.span<{ isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: ${props => props.isOpen ? '#10B981' : '#6B7280'};
  font-weight: 500;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${props => props.isOpen ? '#10B981' : '#6B7280'};
  }
`;

// 운영시간 텍스트 — 뱃지 옆에 "9:00 AM – 10:00 PM" / 브레이크 표시 (#7)
const StoreHoursText = styled.span`
  font-size: 12px;
  color: #9CA3AF;
`;

// Cashless badge — 매장이 현금 결제 받지 않을 때 표시.
// 30년차 UX: 절제된 outlined pill, primary purple subtle. 이모지 X, 텍스트만.
const CashlessBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  background: #F0EFFF;
  border: 1px solid #DDD9FF;
  border-radius: 999px;
  color: #635BFF;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  white-space: nowrap;
  cursor: default;
`;

const StoreRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

// 캐시리스 안내 배너는 결제 화면(PaymentPage)으로 이동(#9). 메뉴에는 상단 작은 Cashless 뱃지만 둔다.

// Order-type chip — shows current selection, tap to change.
// Subtle but discoverable (Stripe/Toast-style inline chip). Always visible so the
// affordance is consistent regardless of how the user landed on this page.
const OrderTypeChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 8px 6px 10px;
  background: #F0EFFF;
  border: 1px solid #DDD9FF;
  border-radius: 999px;
  color: #635BFF;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;

  &:hover { background: #E4E1FF; }
  &:active { transform: translateY(1px); }
  &:focus-visible { outline: 2px solid #635BFF; outline-offset: 2px; }

  .chip-icon { display: inline-flex; }
  .chip-icon svg { width: 14px; height: 14px; stroke-width: 2; }
  .chip-arrow { color: #635BFF; display: inline-flex; opacity: 0.7; }
`;

const SearchSection = styled.div`
  padding: 0 0 12px 0;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #C7CED6;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.15s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #635BFF;
    box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.1);
  }

  &::placeholder {
    color: #8898AA;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #8898AA;
  font-size: 16px;
  pointer-events: none;
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: #F4F6F9;
  border-radius: 50%;
  color: #4B5563;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;

  &:hover {
    background: #C7CED6;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin: 0 0 16px 0;
  padding: 0;
  border-bottom: 1px solid #C7CED6;
  /* Lock horizontal scroll — kills vertical wobble during pan. */
  touch-action: pan-x;
  overscroll-behavior-x: contain;
  overscroll-behavior-y: none;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryTab = styled.button<{ active: boolean }>`
  padding: 12px 0;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: ${props => props.active ? '#635BFF' : '#4B5563'};
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -1px;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: ${props => props.active ? '#635BFF' : '#1F2937'};
  }

  &:active {
    transform: none;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  /* 2-column is the mobile default. Force exactly 2 columns on phones so
     narrow Android viewports (~320px usable after system UI) don't collapse
     to 1 column the way minmax(160px) did. Wider screens get more columns. */
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (min-width: 520px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
`;

const MenuItemCard = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  overflow: hidden;
  /* 연회색 배경 위에서 흰 카드가 또렷이 떠 보이도록 그림자 + 옅은 테두리 강화 (#4) */
  border: 1px solid #E5E8EC;
  box-shadow: 0 2px 8px rgba(16, 24, 40, 0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 1px 4px rgba(16, 24, 40, 0.12);
  }
`;

const ItemImage = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: 120px;
  background: #F1F4F8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Lazy loading image component
const LazyImage: React.FC<{ src: string; alt: string; fallback: string }> = ({ src, alt, fallback }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imgRef.current) {
            imgRef.current.src = src;
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  if (hasError) {
    return <span>{fallback}</span>;
  }

  return (
    <img
      ref={imgRef}
      alt={alt}
      style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  );
};

const ItemInfo = styled.div`
  padding: 12px;
`;

const ItemName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
  line-height: 1.3;
`;

const ItemPrice = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #635BFF;
`;

const SetBadge = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  z-index: 1;
`;

const SetItemsPreview = styled.div`
  font-size: 11px;
  color: #4B5563;
  margin-top: 4px;
  line-height: 1.3;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #6B7280;
`;

const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #6B7280;
  font-size: 14px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #6B7280;

  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  p {
    font-size: 16px;
    margin: 0;
  }
`;

const FloatingCartButton = styled.button`
  position: fixed;
  bottom: 80px;
  right: 16px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(99, 91, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  z-index: 90;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const LoadTrigger = styled.div`
  height: 20px;
  width: 100%;
`;

const ITEMS_PER_PAGE = 20;

const ORDER_TYPE_I18N_KEY: Record<string, string> = {
  'dine-in': 'common:orderType.dineIn', 'dine_in': 'common:orderType.dineIn',
  'takeaway': 'common:orderType.takeaway',
  'pickup': 'common:orderType.pickup',
  'delivery': 'common:orderType.delivery'
};

const ORDER_TYPE_ICON: Record<string, React.ReactElement> = {
  'dine-in': <Utensils />, 'dine_in': <Utensils />,
  'takeaway': <ShoppingBag />,
  'pickup': <Clock />,
  'delivery': <Truck />
};

const MenuPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    currentStore,
    setCurrentStore,
    cartItems,
    currency,
    isLoading,
    setIsLoading,
    setError,
    orderType
  } = useMobileOrder();

  // Preserve table number across the picker round-trip so dine-in QR stays sticky.
  // localStorage (not sessionStorage) so it survives mobile tab eviction like the cart.
  const tableNumber = typeof window !== 'undefined' ? localStorage.getItem('tableNumber') : null;

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]); // 검색용 전체 메뉴
  // 2026-06-24: URL ?cat 으로 초기화한다. 그러지 않으면 상세→뒤로가기 시 popstate 가
  // ?cat=<탭> 엔트리로 정상 복원해도, 아래 URL 동기화 effect 가 마운트 시 초기값('')으로
  // 먼저 돌아 ?cat 을 지워버리고 → init() 이 빈 URL 을 읽어 featured 로 폴백, 탭이 리셋됐다.
  // (6/23 history.state 보존 fix 의 잔여 버그.) 초기값을 URL 에서 읽으면 effect 가 안 지운다.
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    try { return new URLSearchParams(window.location.search).get('cat') || ''; } catch { return ''; }
  });
  const [previousCategory, setPreviousCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Featured & Popular
  const [mobileSettings, setMobileSettings] = useState<{ show_featured: boolean; show_popular: boolean }>({ show_featured: true, show_popular: true });
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [popularItems, setPopularItems] = useState<(MenuItem & { orderCount?: number })[]>([]);
  const [showFeaturedTab, setShowFeaturedTab] = useState(false);
  // True once the background featured/popular fetch has finished. The "fall back to the
  // first category" guard must wait for this — otherwise, while those items are still
  // loading, shouldShow is briefly false and the default jumps off the (first) Featured/
  // Popular tab onto the 2nd tab. (Irene 2026-06-10: "들어가면 두번째 탭이 디폴트")
  const [featuredLoaded, setFeaturedLoaded] = useState(false);
  // 영업중 뱃지(#7)를 시간 흐름에 따라 갱신 — 1분마다 재평가 (open→break→closed 자동 전환)
  const [nowTick, setNowTick] = useState(0);

  const loadTriggerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 카테고리별 아이템 캐시 — 같은 카테고리를 다시 누를 때 네트워크 0
  const categoryCacheRef = useRef<Map<string, MenuItem[]>>(new Map());

  // Load initial menu data
  const loadMenu = useCallback(async (categoryId?: string, page: number = 1, append: boolean = false) => {
    if (!slug) return;

    if (page === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      // Load restaurant info by slug (only on first page)
      if (page === 1) {
        const storeResponse = await fetch(`/api/restaurants/slug/${slug}`);
        if (storeResponse.ok) {
          const result = await storeResponse.json();
          if (result.success && result.data) {
            setCurrentStore({
              id: result.data.id.toString(),
              name: result.data.name,
              branchName: result.data.branch_name || null,
              slug: result.data.slug,
              description: result.data.description || '',
              logo: result.data.logo_url || '',
              isOpen: result.data.status === 'active',
              openingHours: result.data.opening_hours || {},
              openingTime: result.data.operation_settings?.openingTime,
              closingTime: result.data.operation_settings?.closingTime,
              timeZone: result.data.operation_settings?.timeZone,
              breakTimes: result.data.operation_settings?.breakTimes || []
            });
          }
        }
      }

      // Load menu items with pagination
      let url = `/api/mobile/menu/${slug}?page=${page}&limit=${ITEMS_PER_PAGE}`;
      if (categoryId) {
        url += `&categoryId=${categoryId}`;
      }

      const menuResponse = await fetch(url);
      if (menuResponse.ok) {
        const result = await menuResponse.json();
        if (result.success && result.data) {
          // Set categories (only on first page)
          if (page === 1) {
            const cats = result.data.categories || [];
            setCategories(cats);
          }

          // Transform items
          const items: MenuItem[] = (result.data.items || []).map((item: any) => ({
            id: item.id.toString(),
            code: item.code,
            name: item.name,
            price: parseFloat(item.price),
            categoryId: item.categoryId?.toString() || '',
            emoji: item.emoji || '🍽️',
            image: item.image,
            is_set_menu: item.is_set_menu || false,
            set_items: item.set_items,
            isAvailable: item.isAvailable,
            schedule_unavailable: item.schedule_unavailable,
            schedule: item.schedule
          }));

          // Append or replace items
          if (append) {
            setMenuItems(prev => {
              const next = [...prev, ...items];
              if (categoryId) categoryCacheRef.current.set(categoryId.toString(), next);
              return next;
            });
          } else {
            setMenuItems(items);
            if (categoryId && page === 1) {
              categoryCacheRef.current.set(categoryId.toString(), items);
            }
          }

          // 검색용 전체 메뉴 캐시 (categoryId 없이 로드한 경우)
          if (!categoryId && page === 1) {
            setAllMenuItems(items);
          }

          // Set pagination info
          if (result.pagination) {
            setPagination(result.pagination);
          }
        }
      }
    } catch (error) {
      setError('Failed to load menu');
      console.error('Error loading menu:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [slug, setCurrentStore, setError, setIsLoading]);

  // 아이템 변환 헬퍼
  const transformItems = useCallback((items: any[]): MenuItem[] => {
    return items.map((item: any) => ({
      id: item.id.toString(), code: item.code, name: item.name,
      price: parseFloat(item.price), categoryId: item.categoryId?.toString() || '',
      emoji: item.emoji || '🍽️', image: item.image,
      is_set_menu: item.is_set_menu || false, set_items: item.set_items,
      isAvailable: item.isAvailable, schedule_unavailable: item.schedule_unavailable, schedule: item.schedule
    }));
  }, []);

  // Initial load — 첫 카테고리만 빠르게 표시 + 전체 메뉴 백그라운드 로드
  useEffect(() => {
    const init = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        // ────────────────────────────────────────────
        // 1단계: 카테고리 목록 + 첫 카테고리 아이템만 빠르게 로드
        // - store 정보 (작음)
        // - menu 첫 호출은 limit=1로 매우 작게 (categories만 필요)
        // - 첫 카테고리 결정 후 해당 카테고리 fetch
        // ────────────────────────────────────────────
        const [storeRes, catsRes] = await Promise.all([
          fetch(`/api/restaurants/slug/${slug}`),
          fetch(`/api/mobile/menu/${slug}?page=1&limit=1`)  // categories만 필요, items 1개만
        ]);

        if (storeRes.ok) {
          const r = await storeRes.json();
          if (r.success && r.data) {
            // Cashless 판정 — payment_settings.cash.enabled === false 또는 cash method 자체 미존재
            const ps = r.data.payment_settings || {};
            const cashMethod = ps.cash;
            const cashless = !!cashMethod && cashMethod.enabled === false;
            setCurrentStore({
              id: r.data.id.toString(), name: r.data.name, branchName: r.data.branch_name || null,
              slug: r.data.slug, description: r.data.description || '', logo: r.data.logo_url || '',
              isOpen: r.data.status === 'active', openingHours: r.data.opening_hours || {},
              // 영업중 뱃지(#7)용 — operation_settings 에서 운영시간/브레이크/타임존을 그대로 싣는다.
              openingTime: r.data.operation_settings?.openingTime,
              closingTime: r.data.operation_settings?.closingTime,
              timeZone: r.data.operation_settings?.timeZone,
              breakTimes: r.data.operation_settings?.breakTimes || [],
              cashless
            });
          }
        }

        let firstCatId = '';
        if (catsRes.ok) {
          const r = await catsRes.json();
          if (r.success && r.data) {
            const cats = r.data.categories || [];
            setCategories(cats);

            // mobile_settings는 첫 호출에서 받아서 즉시 적용 (Featured/Popular 탭 표시 결정용)
            if (r.data.mobile_settings) {
              setMobileSettings(r.data.mobile_settings);
            }

            if (cats.length > 0) {
              // URL ?cat= 우선 적용 (있고 valid 한 경우). 새로고침 시 탭 유지.
              const urlCat = new URLSearchParams(window.location.search).get('cat') || '';
              const validCatIds = new Set(cats.map((c: any) => c.id.toString()));
              const isUrlCatValid = urlCat && (validCatIds.has(urlCat) || urlCat === '__featured__');
              // 인기/추천 탭이 켜져 있으면(설정상) 그 탭을 기본 선택. URL ?cat= 가 있으면 그게 우선.
              // 실제 아이템이 0개면 아래 showFeaturedTab 효과가 첫 카테고리로 폴백시킨다.
              const ms = r.data.mobile_settings;
              const featuredDefault = !!(ms && (ms.show_featured || ms.show_popular));
              const useCat = isUrlCatValid ? urlCat : (featuredDefault ? '__featured__' : cats[0].id.toString());
              setSelectedCategory(useCat);
              // backend fetch: normal cat 이면 그 cat, featured 면 첫 normal cat 만 prefetch (cache용)
              firstCatId = (useCat === '__featured__') ? cats[0].id.toString() : useCat;
              const firstCatRes = await fetch(`/api/mobile/menu/${slug}?page=1&limit=${ITEMS_PER_PAGE}&categoryId=${firstCatId}`);
              if (firstCatRes.ok) {
                const cr = await firstCatRes.json();
                if (cr.success && cr.data) {
                  const firstItems = transformItems(cr.data.items || []);
                  // 항상 첫 카테고리 아이템을 채운다. featured 기본일 때도 채워두면,
                  // featured/popular 가 0개라 첫 카테고리로 폴백될 때 빈 화면이 안 뜬다.
                  // (featured 탭이 실제로 떠 있으면 menuItems 는 안 쓰이므로 무해 — 버그fix)
                  setMenuItems(firstItems);
                  categoryCacheRef.current.set(firstCatId, firstItems);
                }
              }
            }
          }
        }

        setIsLoading(false);

        // ────────────────────────────────────────────
        // 2단계 (백그라운드): Featured/Popular만
        // - 검색용 전체 메뉴(allMenuItems)는 사용자가 검색창 누를 때 lazy load
        // - limit=500 같은 무거운 호출 제거 → 초기 로딩 속도 대폭 개선
        // ────────────────────────────────────────────
        const [featRes, popRes] = await Promise.all([
          fetch(`/api/mobile/featured/${slug}`),
          fetch(`/api/mobile/popular/${slug}`)
        ]);

        // Featured items
        if (featRes.ok) {
          const fr = await featRes.json();
          if (fr.success && fr.data) {
            setFeaturedItems(transformItems(fr.data));
          }
        }

        // Popular items
        if (popRes.ok) {
          const pr = await popRes.json();
          if (pr.success && pr.data) {
            setPopularItems(pr.data.map((item: any) => ({
              ...transformItems([item])[0],
              orderCount: item.orderCount
            })));
          }
        }
        // Featured/Popular load done — now the fallback guard may run (see effect below).
        setFeaturedLoaded(true);
      } catch (e) {
        setError('Failed to load menu');
        setIsLoading(false);
        setFeaturedLoaded(true); // unblock the fallback guard even if the bg fetch errored
      }
    };
    init();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  // URL persistence — 탭 변경 시 ?cat= 갱신 (기존 쿼리 보존, replaceState 라 history 노이즈 0).
  // ⚠ 반드시 아래 useEffect / handleCategoryChange 보다 위에 선언 — TDZ 회피.
  const updateCatInUrl = useCallback((catId: string) => {
    try {
      const url = new URL(window.location.href);
      if (catId) url.searchParams.set('cat', catId); else url.searchParams.delete('cat');
      // 2026-06-23 (Irene): 기존 history.state 를 보존한다. 이전엔 {} 로 덮어써서 React Router 의
      // history key/state 가 지워지고, 상세→뒤로가기(navigate(-1)) 시 ?cat 복원이 깨져 탭이
      // 첫 카테고리로 리셋되던 버그. state 유지하면 뒤로가기 시 그 탭 그대로 복원된다.
      window.history.replaceState(window.history.state, '', url.toString());
    } catch { /* silent — URL API 미지원 환경 */ }
  }, []);

  // URL ?cat 동기화 — selectedCategory 변경(직접 클릭/검색 종료/Featured 자동/init 등) 모든 경로 커버.
  // 검색 모드 중에는 selectedCategory 가 '' 이라 URL cat 제거됨 (검색 종료 후 복원 시 재설정).
  useEffect(() => {
    if (!isLoading) updateCatInUrl(selectedCategory);
  }, [selectedCategory, isLoading, updateCatInUrl]);

  // 검색용 전체 메뉴 lazy load — 검색창에 처음 포커스/입력 시 한 번만
  const loadAllMenuItemsForSearch = useCallback(async () => {
    if (!slug || allMenuItems.length > 0) return;
    try {
      const res = await fetch(`/api/mobile/menu/${slug}?page=1&limit=500`);
      if (res.ok) {
        const r = await res.json();
        if (r.success && r.data) {
          setAllMenuItems(transformItems(r.data.items || []));
        }
      }
    } catch { /* silent */ }
  }, [slug, allMenuItems.length, transformItems]);

  // Determine if Featured tab should show
  useEffect(() => {
    const hasFeatured = mobileSettings.show_featured && featuredItems.length > 0;
    const hasPopular = mobileSettings.show_popular && popularItems.length > 0;
    const shouldShow = hasFeatured || hasPopular;
    setShowFeaturedTab(shouldShow);

    // If Featured tab should show and no category selected yet, select it
    if (shouldShow && !selectedCategory && !isSearchMode) {
      setSelectedCategory('__featured__');
    }
    // 폴백: 기본을 __featured__ 로 잡았는데 실제 featured/popular 아이템이 0개면
    // (설정만 켜져있고 데이터 없음) 첫 카테고리로 되돌린다 → 빈 탭 방지.
    // ⚠ featuredLoaded 가 true 일 때만 — 로딩 중(아이템 미도착)엔 shouldShow 가 잠깐 false 라
    // 폴백이 성급히 발동해 첫(Featured/Popular) 탭에서 2번째 탭으로 튀던 버그를 막는다.
    if (featuredLoaded && !shouldShow && selectedCategory === '__featured__' && !isSearchMode && categories.length > 0) {
      const firstId = categories[0].id.toString();
      setSelectedCategory(firstId);
      // init 이 featured 기본일 땐 menuItems 를 안 채웠으므로(featured 별도 렌더),
      // 폴백 시 캐시(init 이 첫 카테고리를 prefetch 해둠)에서 리스트를 채워준다 → 빈 리스트 방지.
      const cached = categoryCacheRef.current.get(firstId);
      if (cached) setMenuItems(cached);
    }
  }, [mobileSettings, featuredItems, popularItems, categories, featuredLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle category change — 탭 아래 리스트만 교체, 페이지 리로드 없음
  const handleCategoryChange = useCallback(async (categoryId: string) => {
    if (isSearchMode) {
      setIsSearchMode(false);
      setSearchQuery('');
    }
    setSelectedCategory(categoryId);
    updateCatInUrl(categoryId);
    setPagination(null);
    const catId = categoryId.toString();

    // Featured tab은 별도 렌더 (아이템 fetch 불필요)
    if (catId === '__featured__') return;

    // 1순위: 카테고리 캐시 — 재방문 시 네트워크 0
    const cached = categoryCacheRef.current.get(catId);
    if (cached) {
      setMenuItems(cached);
      return;
    }

    // 2순위: allMenuItems 로드 완료 시 즉시 필터링 (검색 이후)
    if (allMenuItems.length > 0) {
      const filtered = allMenuItems.filter(item => item.categoryId === catId);
      setMenuItems(filtered);
      categoryCacheRef.current.set(catId, filtered);
      return;
    }

    // 3순위: inline fetch — isLoading 건드리지 않음 (전체 페이지 loader 방지)
    try {
      const res = await fetch(`/api/mobile/menu/${slug}?page=1&limit=${ITEMS_PER_PAGE}&categoryId=${catId}`);
      if (res.ok) {
        const r = await res.json();
        if (r.success && r.data) {
          const items = transformItems(r.data.items || []);
          setMenuItems(items);
          categoryCacheRef.current.set(catId, items);
          if (r.pagination) setPagination(r.pagination);
        }
      }
    } catch { /* silent — 기존 리스트 유지 */ }
  }, [isSearchMode, allMenuItems, slug, transformItems]);

  // Idle prefetch — 다른 카테고리 데이터 + 썸네일을 백그라운드로 미리 적재.
  // 추가 only · requestIdleCallback 으로 메인 스레드 비점유 · 실패해도 기존 동작 그대로.
  useEffect(() => {
    if (!slug || categories.length === 0) return;
    const w = window as any;
    const idle: (cb: () => void) => any = typeof w.requestIdleCallback === 'function'
      ? (cb) => w.requestIdleCallback(cb, { timeout: 3000 })
      : (cb) => setTimeout(cb, 200);
    const cancelIdle: (h: any) => void = typeof w.cancelIdleCallback === 'function'
      ? (h) => w.cancelIdleCallback(h)
      : (h) => clearTimeout(h);

    let cancelled = false;
    const handles: any[] = [];
    const heldImages: HTMLImageElement[] = []; // GC 방지

    const prefetchOne = async (catId: string) => {
      if (cancelled) return;
      if (categoryCacheRef.current.has(catId)) return;
      try {
        const res = await fetch(`/api/mobile/menu/${slug}?page=1&limit=${ITEMS_PER_PAGE}&categoryId=${catId}`);
        if (!res.ok || cancelled) return;
        const r = await res.json();
        if (!r.success || !r.data || cancelled) return;
        const items = transformItems(r.data.items || []);
        categoryCacheRef.current.set(catId, items);
        items.forEach((item: MenuItem) => {
          if (item.image && !cancelled) {
            const img = new Image();
            img.src = item.image;
            heldImages.push(img);
          }
        });
      } catch { /* silent */ }
    };

    const queue = categories.map(c => c.id.toString());
    const runNext = () => {
      if (cancelled || queue.length === 0) return;
      const catId = queue.shift()!;
      prefetchOne(catId).finally(() => {
        if (!cancelled) handles.push(idle(runNext));
      });
    };
    handles.push(idle(runNext));

    return () => {
      cancelled = true;
      handles.forEach(h => { try { cancelIdle(h); } catch { /* noop */ } });
    };
  }, [slug, categories.length]); // eslint-disable-line react-hooks/exhaustive-deps

  // 검색어 입력 처리
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);

    if (query.trim()) {
      if (!isSearchMode) {
        setPreviousCategory(selectedCategory);
        setIsSearchMode(true);
        setSelectedCategory('');
      }
    } else {
      if (isSearchMode) {
        setIsSearchMode(false);
        const restoreCategory = previousCategory || categories[0]?.id || '';
        setSelectedCategory(restoreCategory);
        setPreviousCategory('');
        const catId = restoreCategory.toString();
        setMenuItems(allMenuItems.filter(item => item.categoryId === catId));
      }
    }
  }, [isSearchMode, selectedCategory, previousCategory, categories, allMenuItems]);

  // 검색 클리어
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    if (isSearchMode) {
      setIsSearchMode(false);
      const restoreCategory = previousCategory || categories[0]?.id || '';
      setSelectedCategory(restoreCategory);
      setPreviousCategory('');
      const catId = restoreCategory.toString();
      setMenuItems(allMenuItems.filter(item => item.categoryId === catId));
    }
  }, [isSearchMode, previousCategory, categories, allMenuItems]);

  // 검색 모드일 때 전체 메뉴에서 필터링
  const displayItems = isSearchMode
    ? allMenuItems.filter(item => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;
        return item.name.toLowerCase().includes(query) ||
          (item.code && item.code.toLowerCase().includes(query));
      })
    : menuItems;

  // Load more items (infinite scroll) — 검색 모드에서는 비활성화
  const loadMoreItems = useCallback(() => {
    if (!pagination?.hasMore || isLoadingMore || isSearchMode) return;

    const nextPage = pagination.page + 1;
    loadMenu(selectedCategory || undefined, nextPage, true);
  }, [pagination, isLoadingMore, isSearchMode, selectedCategory, loadMenu]);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && pagination?.hasMore && !isLoadingMore) {
          loadMoreItems();
        }
      },
      { rootMargin: '100px' }
    );

    if (loadTriggerRef.current) {
      observerRef.current.observe(loadTriggerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pagination?.hasMore, isLoadingMore, loadMoreItems]);

  const handleItemClick = useCallback((item: MenuItem) => {
    // Off-schedule items (display='disable') are shown greyed and not orderable.
    if (item.schedule_unavailable) return;
    // 상세 진입 전 현재 탭을 URL(?cat=)에 박아둔다 → 상세에서 뒤로가기 하면
    // 메뉴가 그 탭 그대로 복원된다 (#5/#6 통합). updateCatInUrl 은 replaceState.
    updateCatInUrl(selectedCategory);
    navigate(`/mobile/${slug}/item/${item.id}`);
  }, [navigate, slug, selectedCategory, updateCatInUrl]);

  // Localized "Available …" label for off-schedule (disabled) items.
  const formatScheduleLabel = useCallback((schedule?: MenuItem['schedule']) => {
    const dayShort = t('menu:menuPage.weekdayShortList', 'Su,Mo,Tu,We,Th,Fr,Sa').split(',');
    const parts: string[] = [];
    if (schedule && Array.isArray(schedule.days) && schedule.days.length > 0) {
      parts.push(schedule.days.slice().sort((a, b) => a - b).map(d => dayShort[d]).join(' '));
    }
    if (schedule?.start_time && schedule?.end_time) parts.push(`${schedule.start_time}–${schedule.end_time}`);
    if (schedule?.start_date || schedule?.end_date) parts.push(`${schedule?.start_date || ''}~${schedule?.end_date || ''}`);
    const when = parts.join(' · ');
    return when ? t('menu:menuPage.availableWhen', { defaultValue: 'Available {{when}}', when }) : t('menu:menuPage.unavailableNow', 'Currently unavailable');
  }, [t]);

  const handleCartClick = useCallback(() => {
    navigate(`/mobile/${slug}/cart`);
  }, [navigate, slug]);

  // 영업중 뱃지(#7) 1분 주기 재평가 — 운영시간 경계/브레이크 진입 시 자동 갱신
  useEffect(() => {
    const id = setInterval(() => setNowTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  // 매장 타임존 운영시간 기준 Open / On Break / Closed (nowTick 으로 분 단위 갱신)
  const storeOpenState = currentStore ? getStoreOpenState({
    openingTime: currentStore.openingTime,
    closingTime: currentStore.closingTime,
    timeZone: currentStore.timeZone,
    breakTimes: currentStore.breakTimes
  }) : null;
  // nowTick 을 참조해 1분마다 재계산되도록 (린트 unused 방지 겸)
  void nowTick;

  // Render a single menu item card
  const renderMenuItemCard = useCallback((item: MenuItem) => {
    const unavailable = item.schedule_unavailable === true;
    return (
      <MenuItemCard
        key={item.id}
        onClick={() => handleItemClick(item)}
        style={unavailable ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
      >
        {item.is_set_menu && <SetBadge>SET</SetBadge>}
        <ItemImage hasImage={!!item.image}>
          {item.image ? (
            <LazyImage src={item.image} alt={item.name} fallback={item.emoji || '🍽️'} />
          ) : (
            <span>{item.emoji || '🍽️'}</span>
          )}
        </ItemImage>
        <ItemInfo>
          <ItemName>{item.code ? `${item.code} ` : ''}{item.name}</ItemName>
          <ItemPrice>{formatCurrency(item.price, currency)}</ItemPrice>
          {unavailable && (
            <div style={{ fontSize: '11px', color: '#B45309', fontWeight: 600, marginTop: '4px' }}>
              {formatScheduleLabel(item.schedule)}
            </div>
          )}
          {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
            <SetItemsPreview>
              {item.set_items.map((si) => `${si.name} x${si.quantity}`).join(', ')}
            </SetItemsPreview>
          )}
        </ItemInfo>
      </MenuItemCard>
    );
  }, [handleItemClick, currency, formatScheduleLabel]);

  if (isLoading) {
    return (
      <MobileLayout title="Menu" currentPage="menu">
        <LoadingContainer>Loading menu...</LoadingContainer>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout
      title="Menu"
      currentPage="menu"
      contentBg="#F4F6F8"
      cartItemCount={cartItems.length}
    >
      {currentStore && (
        <StoreHeader>
          <StoreInfo>
            <StoreName>{currentStore.name}</StoreName>
            {currentStore.branchName && <StoreBranch>{currentStore.branchName}</StoreBranch>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <StoreStatus isOpen={storeOpenState?.status === 'open'}>
                {storeOpenState?.status === 'open'
                  ? t('common:storeBadge.openNow', { defaultValue: 'Open Now' })
                  : storeOpenState?.status === 'break'
                    ? t('common:storeBadge.onBreak', { defaultValue: 'On Break' })
                    : t('common:storeBadge.closed', { defaultValue: 'Closed' })}
              </StoreStatus>
              {storeOpenState?.hoursText && (
                <StoreHoursText>
                  {storeOpenState.hoursText}
                  {storeOpenState.breakText
                    ? ` · ${t('common:storeBadge.break', { defaultValue: 'Break' })} ${storeOpenState.breakText}`
                    : ''}
                </StoreHoursText>
              )}
              {currentStore.cashless && (
                <CashlessBadge title={t('common:storeBadge.cashlessHint', { defaultValue: 'This store does not accept cash payments' })}>
                  {t('common:storeBadge.cashless', { defaultValue: 'Cashless' })}
                </CashlessBadge>
              )}
            </div>
          </StoreInfo>
          {/* 레스토랑 이름 아래 Dine-in 칩 제거 — 주문방식은 상단 헤더 ContextChip 으로 일원화 */}
          {false && orderType && (
            <StoreRight>
              <OrderTypeChip
                type="button"
                aria-label={t('common:orderType.changeOrderType', { defaultValue: 'Change order type' })}
                onClick={() => {
                  // Force the picker even though pinned URL was the entry point.
                  const qs = tableNumber ? `?table=${encodeURIComponent(tableNumber)}&picker=1` : '?picker=1';
                  navigate(`/mobile/${slug}/order-type${qs}`);
                }}
              >
                <span className="chip-icon">{ORDER_TYPE_ICON[orderType]}</span>
                {t(ORDER_TYPE_I18N_KEY[orderType] || 'common:orderType.dineIn')}
                <span className="chip-arrow" aria-hidden="true"><ChevronRight style={{ width: 14, height: 14 }} /></span>
              </OrderTypeChip>
            </StoreRight>
          )}
        </StoreHeader>
      )}

      {/* 캐시리스 안내 배너는 결제 화면(PaymentPage)으로 이동(#9). 메뉴에는 상단 작은 Cashless 뱃지만 유지. */}

      <SearchSection>
        <SearchInputContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onFocus={loadAllMenuItemsForSearch}
            onChange={(e) => {
              loadAllMenuItemsForSearch();
              handleSearchChange(e.target.value);
            }}
          />
          {searchQuery && (
            <ClearSearchBtn onClick={handleClearSearch} title="Clear search">
              ×
            </ClearSearchBtn>
          )}
        </SearchInputContainer>
      </SearchSection>

      <CategoryTabs>
        {showFeaturedTab && (
          <CategoryTab
            active={selectedCategory === '__featured__' && !isSearchMode}
            onClick={() => { setSelectedCategory('__featured__'); if (isSearchMode) { setIsSearchMode(false); setSearchQuery(''); } }}
            style={selectedCategory === '__featured__' && !isSearchMode ? { color: '#635BFF', borderBottomColor: '#635BFF' } : {}}
          >
            Featured
          </CategoryTab>
        )}
        {categories.map(category => (
          <CategoryTab
            key={category.id}
            active={selectedCategory === category.id && !isSearchMode}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.emoji} {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>

      {/* Featured Tab Content */}
      {selectedCategory === '__featured__' && !isSearchMode ? (
        <div>
          {mobileSettings.show_featured && featuredItems.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>Featured</div>
              <MenuGrid>
                {featuredItems.map(renderMenuItemCard)}
              </MenuGrid>
            </div>
          )}
          {mobileSettings.show_popular && popularItems.length > 0 && (
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: '#0A2540', marginBottom: '12px' }}>Popular</div>
              <MenuGrid>
                {popularItems.map(item => (
                  <MenuItemCard key={item.id} onClick={() => handleItemClick(item)}>
                    {item.is_set_menu && <SetBadge>SET</SetBadge>}
                    <ItemImage hasImage={!!item.image}>
                      {item.image ? (
                        <LazyImage src={item.image} alt={item.name} fallback={item.emoji || '🍽️'} />
                      ) : (
                        <span>{item.emoji || '🍽️'}</span>
                      )}
                    </ItemImage>
                    <ItemInfo>
                      <ItemName>{item.code ? `${item.code} ` : ''}{item.name}</ItemName>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ItemPrice>{formatCurrency(item.price, currency)}</ItemPrice>
                        {item.orderCount && (
                          <span style={{ fontSize: '11px', color: '#4B5563' }}>{item.orderCount} sold</span>
                        )}
                      </div>
                    </ItemInfo>
                  </MenuItemCard>
                ))}
              </MenuGrid>
            </div>
          )}
          {featuredItems.length === 0 && popularItems.length === 0 && (
            <EmptyState><p>No featured or popular items available</p></EmptyState>
          )}
        </div>
      ) : displayItems.length > 0 ? (
        <>
          <MenuGrid>
            {displayItems.map(renderMenuItemCard)}
          </MenuGrid>

          {/* Infinite scroll trigger */}
          <LoadTrigger ref={loadTriggerRef} />

          {isLoadingMore && (
            <LoadingMore>Loading more...</LoadingMore>
          )}
        </>
      ) : (
        <EmptyState>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V16M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>{isSearchMode ? `No results for "${searchQuery}"` : 'No items available in this category'}</p>
        </EmptyState>
      )}

      {false && cartItems.length > 0 && (
        <FloatingCartButton onClick={handleCartClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          View Cart ({cartItems.length})
        </FloatingCartButton>
      )}
    </MobileLayout>
  );
};

export default MenuPage;
