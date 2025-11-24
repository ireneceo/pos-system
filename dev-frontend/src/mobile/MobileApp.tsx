import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MobileOrderProvider } from './contexts/MobileOrderContext';
import { CustomerProvider } from '../contexts/CustomerContext';
import { StaffProvider } from '../contexts/StaffContext';
import OrderTypePage from './pages/OrderTypePage';
import DeliveryAddressPage from './pages/DeliveryAddressPage';
import MenuPage from './pages/MenuPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import QRPaymentPage from './pages/QRPaymentPage';
import BankTransferPage from './pages/BankTransferPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrdersPage from './pages/OrdersPage';

const MobileApp: React.FC = () => {
  return (
    <CustomerProvider>
      <StaffProvider>
        <MobileOrderProvider>
      <Routes>
        <Route path="/:slug" element={<OrderTypePage />} />
        <Route path="/:slug/order-type" element={<OrderTypePage />} />
        <Route path="/:slug/delivery-address" element={<DeliveryAddressPage />} />
        <Route path="/:slug/menu" element={<MenuPage />} />
        <Route path="/:slug/item/:itemId" element={<ItemDetailPage />} />
        <Route path="/:slug/cart" element={<CartPage />} />
        <Route path="/:slug/payment" element={<PaymentPage />} />
        <Route path="/:slug/payment/qr" element={<QRPaymentPage />} />
        <Route path="/:slug/payment/bank-transfer" element={<BankTransferPage />} />
        <Route path="/:slug/order/:orderId" element={<OrderTrackingPage />} />
        <Route path="/:slug/orders" element={<OrdersPage />} />
      </Routes>
        </MobileOrderProvider>
      </StaffProvider>
    </CustomerProvider>
  );
};

export default MobileApp;