import React from 'react';
import IncomingOrdersView from './IncomingOrdersView';

/**
 * Brand General — Incoming Orders.
 * Brand HQ acts as a seller when its franchise restaurants order from it
 * (PurchaseOrder.seller_type = 'brand').
 */
const BrandIncomingOrdersPage: React.FC = () => (
  <IncomingOrdersView sellerScope="brand" i18nNamespace="supplier" />
);

export default BrandIncomingOrdersPage;
