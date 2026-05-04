/**
 * FoodcourtTradeInvoicesPage — wraps BrandTradeInvoicesPage with entityType='foodcourt'.
 *
 * The page's data source endpoint differs only by URL prefix:
 *   /api/foodcourt/trade-invoices  (this page)
 *   /api/brand/trade-invoices      (BrandTradeInvoicesPage)
 *
 * Same UI shape, same SOA/badge logic.
 */
import React from 'react';
import BrandTradeInvoicesPage from '../BrandGeneral/BrandTradeInvoicesPage';

const FoodcourtTradeInvoicesPage: React.FC = () => {
  return <BrandTradeInvoicesPage entityType="foodcourt" />;
};

export default FoodcourtTradeInvoicesPage;
