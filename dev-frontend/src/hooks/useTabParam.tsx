import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook to manage tab state with URL parameters
 * Allows tabs to persist across page refreshes via URL query params
 *
 * The URL is the single source of truth — `activeTab` is derived from
 * `searchParams.get('tab')` on every render. This guarantees that an
 * external URL change (e.g. clicking a sidebar 2-depth item that points
 * to `?tab=payment`) immediately reflects in the page content without
 * the previous stale-`useState` bug.
 *
 * @param defaultTab - The default tab to show if no URL param is present
 * @returns [activeTab, handleTabChange] - Current tab and tab change handler
 */
export function useTabParam<T extends string>(defaultTab: T): [T, (tab: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive — re-evaluated on every render so external URL changes propagate.
  const activeTab = (searchParams.get('tab') as T) || defaultTab;

  // Use functional setSearchParams to preserve any other query params on the URL
  // (e.g. `?picker=1` on mobile, `?ref=xyz` on landing).
  const handleTabChange = useCallback((tab: T) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('tab', tab);
      return next;
    });
  }, [setSearchParams]);

  return [activeTab, handleTabChange];
}
