import React from 'react';
import IncomingOrdersView from '../IncomingOrders/IncomingOrdersView';

/**
 * Supplier-side Incoming Orders (Sprint 4).
 * Buyers send POs with seller_type='supplier'; supplier confirms/ships/rejects.
 *
 * This page is a thin wrapper around the shared IncomingOrdersView so that
 * Supplier Admin, Brand General, and Foodcourt General all use the same
 * confirm/ship/reject flow with role-appropriate i18n + namespace.
 */
const SupplierOrdersPage: React.FC = () => {
  return (
    <IncomingOrdersView
      sellerScope="supplier"
      i18nNamespace="supplier"
    />
  );
};

export default SupplierOrdersPage;
