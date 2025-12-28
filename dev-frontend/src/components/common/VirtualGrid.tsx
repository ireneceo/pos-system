import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';

interface VirtualGridProps<T> {
  /** Array of items to render */
  items: T[];
  /** Function to render each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Number of items to render initially (default: 24) */
  initialCount?: number;
  /** Number of items to load on each scroll (default: 16) */
  loadMoreCount?: number;
  /** Optional key extractor for items */
  keyExtractor?: (item: T, index: number) => string | number;
  /** Optional empty state component */
  emptyComponent?: ReactNode;
  /** Optional loading indicator */
  loadingComponent?: ReactNode;
  /** Grid column minimum width (default: 140px) */
  minColumnWidth?: string;
  /** Grid gap (default: 16px) */
  gap?: string;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
  /** Additional content to render at the end (e.g., Add button) */
  footerContent?: ReactNode;
}

const GridContainer = styled.div<{ $minColumnWidth: string; $gap: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${props => props.$minColumnWidth}, 1fr));
  gap: ${props => props.$gap};
  width: 100%;
`;

const LoadMoreTrigger = styled.div`
  grid-column: 1 / -1;
  height: 20px;
  width: 100%;
`;

/**
 * VirtualGrid - Progressive rendering grid component
 *
 * Renders items in a responsive grid layout with progressive loading.
 * Use this for any grid with 30+ items (menu items, products, cards, etc.)
 *
 * @example
 * <VirtualGrid
 *   items={menuItems}
 *   renderItem={(item) => <MenuCard key={item.id}>{item.name}</MenuCard>}
 *   minColumnWidth="280px"
 *   gap="16px"
 *   initialCount={20}
 *   loadMoreCount={15}
 *   footerContent={<AddNewCard />}
 * />
 */
function VirtualGrid<T>({
  items,
  renderItem,
  initialCount = 24,
  loadMoreCount = 16,
  keyExtractor,
  emptyComponent,
  loadingComponent,
  minColumnWidth = '140px',
  gap = '16px',
  className,
  style,
  footerContent
}: VirtualGridProps<T>) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Reset visible count when items array reference changes (new data)
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [items, initialCount]);

  // Intersection Observer for progressive loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => Math.min(prev + loadMoreCount, items.length));
        }
      },
      { threshold: 0.1 }
    );

    const trigger = loadMoreTriggerRef.current;
    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
      observer.disconnect();
    };
  }, [loadMoreCount, items.length]);

  if (items.length === 0 && !footerContent) {
    return <>{emptyComponent}</> || null;
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <GridContainer
      $minColumnWidth={minColumnWidth}
      $gap={gap}
      className={className}
      style={style}
    >
      {visibleItems.map((item, index) => (
        <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}

      {footerContent}

      {hasMore && (
        <LoadMoreTrigger ref={loadMoreTriggerRef}>
          {loadingComponent}
        </LoadMoreTrigger>
      )}
    </GridContainer>
  );
}

export default VirtualGrid;
