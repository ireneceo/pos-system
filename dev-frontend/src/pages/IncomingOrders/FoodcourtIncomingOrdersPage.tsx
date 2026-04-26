import React from 'react';
import IncomingOrdersView from './IncomingOrdersView';

/**
 * Foodcourt General — Incoming Orders.
 * Foodcourt acts as a seller for tenant restaurants ordering shared stock
 * (PurchaseOrder.seller_type = 'foodcourt').
 */
const FoodcourtIncomingOrdersPage: React.FC = () => (
  <IncomingOrdersView sellerScope="foodcourt" i18nNamespace="supplier" />
);

export default FoodcourtIncomingOrdersPage;
