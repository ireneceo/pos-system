import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import styled from 'styled-components';

interface VirtualListProps<T> {
  /** Array of items to render */
  items: T[];
  /** Function to render each item */
  renderItem: (item: T, index: number) => ReactNode;
  /** Number of items to render initially (default: 20) */
  initialCount?: number;
  /** Number of items to load on each scroll (default: 15) */
  loadMoreCount?: number;
  /** Optional key extractor for items */
  keyExtractor?: (item: T, index: number) => string | number;
  /** Optional empty state component */
  emptyComponent?: ReactNode;
  /** Optional loading indicator */
  loadingComponent?: ReactNode;
  /** Container className */
  className?: string;
  /** Container style */
  style?: React.CSSProperties;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadMoreTrigger = styled.div`
  height: 20px;
  width: 100%;
`;

/**
 * VirtualList - Progressive rendering list component
 *
 * Renders items progressively as user scrolls, improving initial load performance.
 * Use this for any list with 30+ items.
 *
 * @example
 * <VirtualList
 *   items={menuItems}
 *   renderItem={(item) => <MenuCard key={item.id}>{item.name}</MenuCard>}
 *   initialCount={20}
 *   loadMoreCount={15}
 * />
 */
function VirtualList<T>({
  items,
  renderItem,
  initialCount = 20,
  loadMoreCount = 15,
  keyExtractor,
  emptyComponent,
  loadingComponent,
  className,
  style
}: VirtualListProps<T>) {
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Reset visible count when items change significantly
  useEffect(() => {
    setVisibleCount(initialCount);
  }, [items.length > 0 ? items[0] : null, initialCount]);

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

  if (items.length === 0) {
    return <>{emptyComponent}</> || null;
  }

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <Container className={className} style={style}>
      {visibleItems.map((item, index) => (
        <React.Fragment key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem(item, index)}
        </React.Fragment>
      ))}

      {hasMore && (
        <LoadMoreTrigger ref={loadMoreTriggerRef}>
          {loadingComponent}
        </LoadMoreTrigger>
      )}
    </Container>
  );
}

export default VirtualList;
