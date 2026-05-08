// useTourProgress — per-tour completion state for walkthrough/coachmark system.
// Single GET on mount; PUT on each step change. Optimistic local state.

import { useCallback, useEffect, useState } from 'react';
import { getAuthToken } from '../utils/auth';

export interface TourState {
  completed?: boolean;
  skipped?: boolean;
  version?: number;
  last_seen?: string;
}

export type TourProgress = Record<string, TourState>;

export interface TourPatch {
  completed?: boolean;
  skipped?: boolean;
  version?: number;
}

const TOUR_START_EVENT = 'walkthrough:start';

/** Imperatively start a tour from anywhere (e.g. header button). */
export function startTour(tourKey: string) {
  window.dispatchEvent(new CustomEvent(TOUR_START_EVENT, { detail: { tourKey } }));
}

export function useTourProgress() {
  const [progress, setProgress] = useState<TourProgress>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const token = getAuthToken();
        if (!token) { setLoading(false); return; }
        const res = await fetch('/api/users/me/tutorial-progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) { if (!cancelled) setLoading(false); return; }
        const data = await res.json();
        if (!cancelled) {
          setProgress((data?.data && typeof data.data === 'object') ? data.data : {});
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const setStep = useCallback(async (tourKey: string, patch: TourPatch) => {
    // optimistic local
    setProgress(prev => ({
      ...prev,
      [tourKey]: { ...(prev[tourKey] || {}), ...patch, last_seen: new Date().toISOString() }
    }));
    try {
      const token = getAuthToken();
      if (!token) return;
      await fetch('/api/users/me/tutorial-progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tour_key: tourKey, ...patch })
      });
    } catch {
      // silent — local state already reflects user intent; server retry on next interaction
    }
  }, []);

  return { progress, loading, setStep };
}

/** Return value indicates whether a tour should auto-start for the current user. */
export function shouldAutoStart(state: TourState | undefined, version: number): boolean {
  if (!state) return true;
  if (state.completed === true) return false;
  if (state.skipped === true) return false;
  if (state.version !== undefined && state.version > version) return false;
  return true;
}

export { TOUR_START_EVENT };
