import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Custom hook to manage tab state with URL parameters
 * Allows tabs to persist across page refreshes via URL query params
 *
 * @param defaultTab - The default tab to show if no URL param is present
 * @returns [activeTab, handleTabChange] - Current tab and tab change handler
 *
 * @example
 * const [activeTab, handleTabChange] = useTabParam('store');
 * <Tab active={activeTab === 'store'} onClick={() => handleTabChange('store')}>
 */
export function useTabParam<T extends string>(defaultTab: T): [T, (tab: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial tab from URL or use default
  const getInitialTab = useCallback((): T => {
    const tabFromUrl = searchParams.get('tab') as T;
    return tabFromUrl || defaultTab;
  }, [searchParams, defaultTab]);

  const [activeTab, setActiveTab] = useState<T>(getInitialTab());

  // Handle tab change and update URL
  const handleTabChange = useCallback((tab: T) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  }, [setSearchParams]);

  return [activeTab, handleTabChange];
}
