import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { formatCurrency } from '../../utils/currency';

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
  padding: 16px;
  margin: 0 0 16px 0;
  border-bottom: 1px solid #E5E7EB;
  border-radius: 8px;
`;

const StoreName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 4px 0;
`;

const StoreStatus = styled.div<{ isOpen: boolean }>`
  font-size: 14px;
  color: ${props => props.isOpen ? '#10B981' : '#EF4444'};
  font-weight: 500;
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
  border: 1px solid #E6EBF1;
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
  background: #F6F9FC;
  border-radius: 50%;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.15s;

  &:hover {
    background: #E6EBF1;
  }
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  margin: 0 0 16px 0;
  padding: 0;
  border-bottom: 1px solid #E5E7EB;

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
  color: ${props => props.active ? '#635BFF' : '#6B7280'};
  border-bottom: 2px solid ${props => props.active ? '#635BFF' : 'transparent'};
  margin-bottom: -1px;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    color: ${props => props.active ? '#635BFF' : '#374151'};
  }

  &:active {
    transform: none;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`;

const MenuItemCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;

  &:active {
    transform: scale(0.98);
  }
`;

const ItemImage = styled.div<{ hasImage?: boolean }>`
  width: 100%;
  height: 120px;
  background: #F3F4F6;
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
  color: #6B7280;
  margin-top: 4px;
  line-height: 1.3;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #9CA3AF;
`;

const LoadingMore = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: #9CA3AF;
  font-size: 14px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #9CA3AF;

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

const MenuPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    currentStore,
    setCurrentStore,
    cartItems,
    currency,
    isLoading,
    setIsLoading,
    setError
  } = useMobileOrder();

  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]); // 검색용 전체 메뉴
  const [selectedCategory, setSelectedCategory] = useState<string>('');
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

  const loadTriggerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
              slug: result.data.slug,
              description: result.data.description || '',
              logo: result.data.logo_url || '',
              isOpen: result.data.status === 'active',
              openingHours: result.data.opening_hours || {}
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
            set_items: item.set_items
          }));

          // Append or replace items
          if (append) {
            setMenuItems(prev => [...prev, ...items]);
          } else {
            setMenuItems(items);
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
      is_set_menu: item.is_set_menu || false, set_items: item.set_items
    }));
  }, []);

  // Initial load — 첫 카테고리만 빠르게 표시 + 전체 메뉴 백그라운드 로드
  useEffect(() => {
    const init = async () => {
      if (!slug) return;
      setIsLoading(true);
      try {
        // 레스토랑 정보 + 카테고리 목록 (첫 카테고리 아이템 포함)
        const [storeRes, menuRes] = await Promise.all([
          fetch(`/api/restaurants/slug/${slug}`),
          fetch(`/api/mobile/menu/${slug}?page=1&limit=${ITEMS_PER_PAGE}`)
        ]);

        if (storeRes.ok) {
          const r = await storeRes.json();
          if (r.success && r.data) {
            setCurrentStore({
              id: r.data.id.toString(), name: r.data.name, slug: r.data.slug,
              description: r.data.description || '', logo: r.data.logo_url || '',
              isOpen: r.data.status === 'active', openingHours: r.data.opening_hours || {}
            });
          }
        }

        let firstCatId = '';
        if (menuRes.ok) {
          const r = await menuRes.json();
          if (r.success && r.data) {
            const cats = r.data.categories || [];
            setCategories(cats);

            if (cats.length > 0) {
              firstCatId = cats[0].id.toString();
              setSelectedCategory(cats[0].id);
              // 첫 카테고리 아이템만 먼저 표시
              const firstCatRes = await fetch(`/api/mobile/menu/${slug}?page=1&limit=${ITEMS_PER_PAGE}&categoryId=${firstCatId}`);
              if (firstCatRes.ok) {
                const cr = await firstCatRes.json();
                if (cr.success && cr.data) {
                  setMenuItems(transformItems(cr.data.items || []));
                }
              }
            }
          }
        }

        setIsLoading(false);

        // 백그라운드에서 전체 메뉴 로드 (검색용) + Featured/Popular
        const [allRes, featRes, popRes] = await Promise.all([
          fetch(`/api/mobile/menu/${slug}?page=1&limit=500`),
          fetch(`/api/mobile/featured/${slug}`),
          fetch(`/api/mobile/popular/${slug}`)
        ]);

        if (allRes.ok) {
          const r = await allRes.json();
          if (r.success && r.data) {
            setAllMenuItems(transformItems(r.data.items || []));
            // mobile_settings from menu API
            if (r.data.mobile_settings) {
              setMobileSettings(r.data.mobile_settings);
            }
          }
        }

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
      } catch (e) {
        setError('Failed to load menu');
        setIsLoading(false);
      }
    };
    init();
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [mobileSettings, featuredItems, popularItems]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle category change
  const handleCategoryChange = useCallback((categoryId: string) => {
    if (isSearchMode) {
      setIsSearchMode(false);
      setSearchQuery('');
    }
    setSelectedCategory(categoryId);
    setPagination(null);
    const catId = categoryId.toString();
    // allMenuItems 로드 완료 시 즉시 필터링, 아니면 API 호출
    if (allMenuItems.length > 0) {
      setMenuItems(allMenuItems.filter(item => item.categoryId === catId));
    } else {
      loadMenu(categoryId, 1, false);
    }
  }, [isSearchMode, allMenuItems, loadMenu]);

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
    navigate(`/mobile/${slug}/item/${item.id}`);
  }, [navigate, slug]);

  const handleCartClick = useCallback(() => {
    navigate(`/mobile/${slug}/cart`);
  }, [navigate, slug]);

  // Render a single menu item card
  const renderMenuItemCard = useCallback((item: MenuItem) => (
    <MenuItemCard
      key={item.id}
      onClick={() => handleItemClick(item)}
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
        {item.is_set_menu && item.set_items && item.set_items.length > 0 && (
          <SetItemsPreview>
            {item.set_items.map((si) => `${si.name} x${si.quantity}`).join(', ')}
          </SetItemsPreview>
        )}
      </ItemInfo>
    </MenuItemCard>
  ), [handleItemClick, currency]);

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
      cartItemCount={cartItems.length}
    >
      {currentStore && (
        <StoreHeader>
          <StoreName>{currentStore.name}</StoreName>
          <StoreStatus isOpen={currentStore.isOpen}>
            {currentStore.isOpen ? '✓ Open Now' : '✗ Closed'}
          </StoreStatus>
        </StoreHeader>
      )}

      <SearchSection>
        <SearchInputContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
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
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>{item.orderCount} sold</span>
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

      {cartItems.length > 0 && (
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
