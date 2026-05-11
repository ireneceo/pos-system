import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MobileOrderProvider } from './contexts/MobileOrderContext';
import { CustomerProvider } from '../contexts/CustomerContext';
import { StaffProvider } from '../contexts/StaffContext';
import OrderTypePage from './pages/OrderTypePage';
import MenuPage from './pages/MenuPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import QRPaymentPage from './pages/QRPaymentPage';
import BankTransferPage from './pages/BankTransferPage';
import OnlinePaymentPage from './pages/OnlinePaymentPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OrdersPage from './pages/OrdersPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ReservationPage from './pages/ReservationPage';
import ReservationsListPage from './pages/ReservationsListPage';
import ReservationDetailPage from './pages/ReservationDetailPage';

const MobileApp: React.FC = () => {
  return (
    <CustomerProvider>
      <StaffProvider>
        <MobileOrderProvider>
      <Routes>
        <Route path="/:slug" element={<OrderTypePage />} />
        <Route path="/:slug/order-type" element={<OrderTypePage />} />
        <Route path="/:slug/menu" element={<MenuPage />} />
        <Route path="/:slug/item/:itemId" element={<ItemDetailPage />} />
        <Route path="/:slug/cart" element={<CartPage />} />
        <Route path="/:slug/payment" element={<PaymentPage />} />
        <Route path="/:slug/payment/qr" element={<QRPaymentPage />} />
        <Route path="/:slug/payment/bank-transfer" element={<BankTransferPage />} />
        <Route path="/:slug/payment/online" element={<OnlinePaymentPage />} />
        <Route path="/:slug/order/:orderId" element={<OrderTrackingPage />} />
        <Route path="/:slug/orders" element={<OrdersPage />} />
        <Route path="/:slug/account" element={<AccountPage />} />
        <Route path="/:slug/login" element={<LoginPage />} />
        <Route path="/:slug/register" element={<RegisterPage />} />
        <Route path="/:slug/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/:slug/reset-password" element={<ResetPasswordPage />} />
        <Route path="/:slug/reservation" element={<ReservationPage />} />
        <Route path="/:slug/reservations" element={<ReservationsListPage />} />
        <Route path="/:slug/reservations/:id" element={<ReservationDetailPage />} />
      </Routes>
        </MobileOrderProvider>
      </StaffProvider>
    </CustomerProvider>
  );
};

export default MobileApp;