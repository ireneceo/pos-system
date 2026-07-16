import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { postDeviceReport } from '../utils/printDiagnostics';

/**
 * PrintDeviceReporter — the missing "device → server" channel of the Print
 * Self-Diagnose system (docs/PRINT_SELF_DIAGNOSE_DESIGN.md §2-1).
 *
 * Mounted in App.tsx (a NON-protected file) so the print-guard fingerprints stay
 * 8/8 unchanged. It pushes a passive snapshot of this device every 90s (and once
 * right after a diagnostic run, via the `print-diag-ran` window event) so the
 * server/admin can tell which POS is alive, its app version, mode and role.
 *
 * 🔒 Read-only: buildDeviceReport() only reads localStorage / settings /
 * __NATIVE_PRINT / qz.websocket.isActive(). It never opens a QZ connection and
 * never touches the print pipeline. Every call is fire-and-forget.
 */
const REPORT_INTERVAL_MS = 90 * 1000;

const PrintDeviceReporter: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Only report when logged in AND bound to a restaurant (POS devices). Brand/
  // Foodcourt/System-Admin accounts without a restaurant context are skipped.
  const hasStoreContext = !!(isAuthenticated && user && (user.restaurantId || user.restaurant_id));

  useEffect(() => {
    if (!hasStoreContext) return;

    let cancelled = false;
    const tick = () => { if (!cancelled) void postDeviceReport(false); };

    // First report shortly after mount, then every 90s.
    const kickoff = setTimeout(tick, 3000);
    timerRef.current = setInterval(tick, REPORT_INTERVAL_MS);

    // Push once immediately after a diagnostic run so its fresh snapshot lands.
    const onDiagRan = () => { if (!cancelled) void postDeviceReport(true); };
    window.addEventListener('print-diag-ran', onDiagRan as EventListener);

    return () => {
      cancelled = true;
      clearTimeout(kickoff);
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('print-diag-ran', onDiagRan as EventListener);
    };
  }, [hasStoreContext]);

  return null;
};

export default PrintDeviceReporter;
