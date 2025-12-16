import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/common/MobileLayout';
import { useMobileOrder } from '../contexts/MobileOrderContext';
import { useMenu } from '../../contexts/MenuContext';
import { formatCurrency } from '../../utils/currency';

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

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const CategorySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 4px;
`;

const CategoryEmoji = styled.span`
  font-size: 20px;
`;

const CategoryTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0;
`;

const CategoryCount = styled.span`
  font-size: 13px;
  color: #9CA3AF;
  margin-left: auto;
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

  const { categories, menuItems, getItemsByCategory } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadMenu = async () => {
    if (!slug) return;

    setIsLoading(true);
    try {
      // Load restaurant info by slug
      const response = await fetch(`/api/restaurants/slug/${slug}`);
      if (response.ok) {
        const result = await response.json();
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

      // Menu data is now loaded from MenuContext
      console.log('MenuPage - Using unified menu data:', { categoriesCount: categories.length, itemsCount: menuItems.length });
      setSelectedCategory('all');
    } catch (error) {
      setError('Failed to load menu');
      console.error('Error loading menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : getItemsByCategory(selectedCategory);

  // Group items by category for "All" view
  const groupedItemsByCategory = useMemo(() => {
    if (selectedCategory !== 'all') return null;

    const grouped: { category: typeof categories[0]; items: typeof menuItems }[] = [];
    const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

    sortedCategories.forEach(category => {
      const categoryItems = menuItems.filter(item => item.category_id === category.id);
      if (categoryItems.length > 0) {
        grouped.push({ category, items: categoryItems });
      }
    });

    // Also include items without category (if any)
    const uncategorizedItems = menuItems.filter(item => !item.category_id);
    if (uncategorizedItems.length > 0) {
      grouped.push({
        category: { id: 'uncategorized', name: 'Other', emoji: '📦', order: 999 } as any,
        items: uncategorizedItems
      });
    }

    return grouped;
  }, [selectedCategory, categories, menuItems]);

  const handleItemClick = useCallback((item: any) => {
    navigate(`/mobile/${slug}/item/${item.id}`);
  }, [navigate, slug]);

  const handleCartClick = useCallback(() => {
    navigate(`/mobile/${slug}/cart`);
  }, [navigate, slug]);

  // Render a single menu item card
  const renderMenuItemCard = useCallback((item: any) => (
    <MenuItemCard
      key={item.id}
      onClick={() => handleItemClick(item)}
      style={{ position: 'relative' }}
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
            {item.set_items.map((si: any) => `${si.name} x${si.quantity}`).join(', ')}
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
      
      <CategoryTabs>
        <CategoryTab
          active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
        >
          All Items
        </CategoryTab>
        {categories
          .slice()
          .sort((a, b) => a.order - b.order)
          .map(category => (
          <CategoryTab
            key={category.id}
            active={selectedCategory === category.id}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.emoji} {category.name}
          </CategoryTab>
        ))}
      </CategoryTabs>
      
      {filteredItems.length > 0 ? (
        selectedCategory === 'all' && groupedItemsByCategory ? (
          // Show items grouped by category with headers
          <MenuContainer>
            {groupedItemsByCategory.map(({ category, items }) => (
              <CategorySection key={category.id}>
                <CategoryHeader>
                  <CategoryEmoji>{category.emoji}</CategoryEmoji>
                  <CategoryTitle>{category.name}</CategoryTitle>
                  <CategoryCount>{items.length} items</CategoryCount>
                </CategoryHeader>
                <MenuGrid>
                  {items.map(renderMenuItemCard)}
                </MenuGrid>
              </CategorySection>
            ))}
          </MenuContainer>
        ) : (
          // Show flat grid for specific category
          <MenuGrid>
            {filteredItems.map(renderMenuItemCard)}
          </MenuGrid>
        )
      ) : (
        <EmptyState>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V12C2 16.5 4.23 20.68 7.62 23.15L12 24L16.38 23.15C19.77 20.68 22 16.5 22 12V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12V16M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p>No items available in this category</p>
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