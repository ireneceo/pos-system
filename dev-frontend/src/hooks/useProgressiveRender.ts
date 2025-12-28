import { useState, useEffect, useRef, useCallback } from 'react';

interface UseProgressiveRenderOptions {
  /** Number of items to render initially (default: 20) */
  initialCount?: number;
  /** Number of items to load on each scroll (default: 15) */
  loadMoreCount?: number;
  /** Intersection observer threshold (default: 0.1) */
  threshold?: number;
}

interface UseProgressiveRenderResult<T> {
  /** Items currently visible (sliced from original array) */
  visibleItems: T[];
  /** Ref to attach to the load-more trigger element */
  loadMoreRef: React.RefObject<HTMLDivElement>;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Current count of visible items */
  visibleCount: number;
  /** Manually reset the visible count */
  reset: () => void;
  /** Manually load more items */
  loadMore: () => void;
}

/**
 * useProgressiveRender - Hook for progressive rendering of large lists
 *
 * Provides state and refs needed to implement progressive rendering
 * in any component. Use this when you need more control than VirtualList/VirtualGrid.
 *
 * @example
 * const { visibleItems, loadMoreRef, hasMore } = useProgressiveRender(items, {
 *   initialCount: 30,
 *   loadMoreCount: 20
 * });
 *
 * return (
 *   <div>
 *     {visibleItems.map(item => <Card key={item.id} />)}
 *     {hasMore && <div ref={loadMoreRef} />}
 *   </div>
 * );
 */
function useProgressiveRender<T>(
  items: T[],
  options: UseProgressiveRenderOptions = {}
): UseProgressiveRenderResult<T> {
  const {
    initialCount = 20,
    loadMoreCount = 15,
    threshold = 0.1
  } = options;

  const [visibleCount, setVisibleCount] = useState(initialCount);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Reset when items change (new search, filter, etc.)
  const reset = useCallback(() => {
    setVisibleCount(initialCount);
  }, [initialCount]);

  // Load more items manually
  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + loadMoreCount, items.length));
  }, [loadMoreCount, items.length]);

  // Auto-reset when items array reference changes
  useEffect(() => {
    reset();
  }, [items, reset]);

  // Intersection Observer for automatic progressive loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < items.length) {
          loadMore();
        }
      },
      { threshold }
    );

    const trigger = loadMoreRef.current;
    if (trigger) {
      observer.observe(trigger);
    }

    return () => {
      if (trigger) {
        observer.unobserve(trigger);
      }
      observer.disconnect();
    };
  }, [threshold, visibleCount, items.length, loadMore]);

  return {
    visibleItems: items.slice(0, visibleCount),
    loadMoreRef,
    hasMore: visibleCount < items.length,
    visibleCount,
    reset,
    loadMore
  };
}

export default useProgressiveRender;
