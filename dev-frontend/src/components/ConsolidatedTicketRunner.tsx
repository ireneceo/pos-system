/**
 * ConsolidatedTicketRunner — mounts the independent consolidated-order-ticket
 * poll loop app-wide (ADDITIVE; does not touch the existing print path).
 *
 * Renders nothing. The poller itself only does work when the restaurant has
 * printerSettings.consolidatedOrderTicket.{enabled,autoPrint} on; otherwise it
 * is a cheap no-op. Scoped to the logged-in restaurant (RA / Staff devices).
 */
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useConsolidatedTicketPoller } from '../hooks/useConsolidatedTicketPoller';

const ConsolidatedTicketRunner: React.FC = () => {
  const { user } = useAuth() as any;
  const { getStoreInfo } = useStore();
  const ridRaw = user?.restaurant_id ?? user?.restaurantId ?? null;
  const restaurantId = ridRaw != null && ridRaw !== '' ? Number(ridRaw) : null;

  useConsolidatedTicketPoller({
    restaurantId,
    enabled: !!restaurantId,
    getStoreInfo,
  });

  return null;
};

export default ConsolidatedTicketRunner;
