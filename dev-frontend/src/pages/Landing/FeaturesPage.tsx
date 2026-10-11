import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateHowToSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';
import { useTranslation } from 'react-i18next';

// ─── Types ───
// 글자는 전부 landing.json 에 있다 — 키: featuresPage.<탭>.<code>.title|desc|p1..pN, 탭: featuresPage.tab.<탭>.label|heading|description
interface FeatureItem {
  code: string;
  points: number;
  category: 'basic' | 'advanced';
  images: string[];
}

interface RoleTab {
  key: string;
  features: FeatureItem[];
}

// ─── Styled Components ───
const PageContainer = styled.div`
  background: #F9FAFB;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  min-height: 160px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 32px 20px;
    min-height: 140px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 0 8px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  max-width: 600px;
  margin: 6px auto 0;
  line-height: 1.5;
  word-break: keep-all;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 8px;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const TabBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 12px 24px;
  border: 2px solid ${props => props.active ? '#635BFF' : '#C7CED6'};
  background: ${props => props.active ? '#635BFF' : 'white'};
  color: ${props => props.active ? 'white' : '#425466'};
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #635BFF;
    ${props => !props.active && 'background: #F8F9FF;'}
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;

const RoleHeading = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 12px 0;
  text-align: left;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 19px;
  }
`;

const RoleDescription = styled.p`
  font-size: 15px;
  color: #4B5563;
  margin: 0 0 36px;
  text-align: left;
  line-height: 1.7;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const CategoryLabel = styled.div<{ variant: string }>`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-bottom: 2px solid #C7CED6;
  color: ${props => props.variant === 'advanced' ? '#7C3AED' : '#0A2540'};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 24px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 32px;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid #C7CED6;
  overflow: hidden;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    border-color: #635BFF;
  }
`;

const ImageSlider = styled.div`
  position: relative;
  background: #C7CED6;
  padding: 16px;
  cursor: pointer;
`;

const SliderImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #D9DEE3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const SliderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
`;

const SliderPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ADB5BD;
  font-size: 14px;
`;

const SliderControls = styled.div`
  position: absolute;
  bottom: 8px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 6px;
`;

const SliderDot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.5)'};
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  padding: 0;
`;

const SliderArrow = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 8px;' : 'right: 8px;'}
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.85);
  color: #0A2540;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);

  ${SliderImageWrapper}:hover & {
    opacity: 1;
  }
`;

const CardBody = styled.div`
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FeatureBadge = styled.span<{ variant: 'basic' | 'advanced' }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 8px;
  align-self: flex-start;
  background: ${props => props.variant === 'advanced' ? '#F3E8FF' : '#ECFDF5'};
  color: ${props => props.variant === 'advanced' ? '#7C3AED' : '#059669'};
`;

const FeatureTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
`;

const FeatureDescription = styled.p`
  font-size: 14px;
  color: #4B5563;
  line-height: 1.5;
  margin: 0 0 16px 0;
`;

const FeaturePoints = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const FeaturePoint = styled.li`
  font-size: 13px;
  color: #1F2937;
  padding: 4px 0;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10B981;
    font-weight: bold;
  }
`;

// Lightbox
const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LightboxImage = styled.img`
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.15);
`;

const LightboxClose = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

const LightboxArrow = styled.button<{ direction: 'left' | 'right' }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 16px;' : 'right: 16px;'}
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.2);
  color: white;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;

  &:hover {
    background: rgba(255,255,255,0.3);
  }
`;

const LightboxCaption = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  z-index: 10001;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
  padding: 60px 20px;
  color: white;
  border-radius: 16px;
`;

const CTATitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

const CTASubtitle = styled.p`
  font-size: 16px;
  opacity: 0.9;
  margin: 0 0 24px 0;
`;

const CTAButton = styled.button`
  background: white;
  color: #635BFF;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

// ─── Image Slider Component ───
const FeatureImageSlider: React.FC<{ images: string[]; title: string; onOpenLightbox: (images: string[], index: number, title: string) => void }> = ({ images, title, onOpenLightbox }) => {
  const { t } = useTranslation('landing');
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <ImageSlider>
        <SliderImageWrapper>
          <SliderPlaceholder>{t('landing:featuresPage.screenshotComingSoon')}</SliderPlaceholder>
        </SliderImageWrapper>
      </ImageSlider>
    );
  }

  return (
    <ImageSlider onClick={() => onOpenLightbox(images, current, title)}>
      <SliderImageWrapper>
        <SliderImage src={images[current]} alt={`${title} - ${current + 1}`} loading="lazy" />
        {images.length > 1 && (
          <>
            <SliderArrow direction="left" onClick={(e) => { e.stopPropagation(); setCurrent(c => c === 0 ? images.length - 1 : c - 1); }}>‹</SliderArrow>
            <SliderArrow direction="right" onClick={(e) => { e.stopPropagation(); setCurrent(c => c === images.length - 1 ? 0 : c + 1); }}>›</SliderArrow>
            <SliderControls>
              {images.map((_, i) => (
                <SliderDot key={i} active={i === current} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} />
              ))}
            </SliderControls>
          </>
        )}
      </SliderImageWrapper>
    </ImageSlider>
  );
};

// ─── Feature Data ───
const getImages = (code: string, count: number = 1): string[] => {
  return Array.from({ length: count }, (_, i) => `/images/features/dashboard/${code}_${i + 1}.webp`);
};

const ROLE_TABS: RoleTab[] = [
  {
    key: 'restaurant',
    features: [
      { code: 'dashboard', points: 4, category: 'basic', images: getImages('dashboard', 2) },
      { code: 'live_orders', points: 4, category: 'basic', images: getImages('live_orders', 3) },
      { code: 'pos_terminal', points: 4, category: 'basic', images: getImages('pos_terminal', 3) },
      { code: 'ewallet_qr', points: 3, category: 'basic', images: getImages('ewallet_qr', 0) },
      { code: 'kitchen_display', points: 4, category: 'basic', images: getImages('kitchen_display', 1) },
      { code: 'customer_display', points: 4, category: 'basic', images: getImages('customer_display', 1) },
      { code: 'offline_mode', points: 4, category: 'basic', images: getImages('offline_mode', 0) },
      { code: 'invoice_billing', points: 5, category: 'basic', images: getImages('invoice_billing', 3) },
      { code: 'reports', points: 4, category: 'basic', images: getImages('reports', 6) },
      { code: 'cash_management', points: 4, category: 'basic', images: getImages('cash_management', 0) },
      { code: 'menu_management', points: 4, category: 'basic', images: getImages('menu_management', 4) },
      { code: 'menu_categories', points: 3, category: 'basic', images: getImages('menu_categories', 0) },
      { code: 'staff_management', points: 4, category: 'basic', images: getImages('staff_management', 2) },
      { code: 'customer_crm', points: 4, category: 'basic', images: getImages('customer_crm', 3) },
      { code: 'coupons', points: 4, category: 'basic', images: getImages('coupons', 3) },
      { code: 'membership', points: 4, category: 'basic', images: getImages('membership', 0) },
      { code: 'notices', points: 4, category: 'basic', images: getImages('notices', 2) },
      { code: 'floor_plan', points: 5, category: 'advanced', images: getImages('floor_plan', 4) },
      { code: 'mobile_ordering', points: 5, category: 'advanced', images: getImages('mobile_ordering', 6) },
      { code: 'kiosk_mode', points: 4, category: 'advanced', images: getImages('kiosk_mode', 0) },
      { code: 'card_terminal', points: 3, category: 'advanced', images: getImages('card_terminal', 0) },
      { code: 'reservations', points: 6, category: 'advanced', images: getImages('reservations', 0) },
      { code: 'recipe_management', points: 4, category: 'advanced', images: getImages('recipe_management', 3) },
      { code: 'ingredients', points: 4, category: 'advanced', images: getImages('ingredients', 1) },
      { code: 'suppliers', points: 4, category: 'advanced', images: getImages('suppliers', 1) },
      { code: 'inventory_management', points: 4, category: 'advanced', images: getImages('inventory_management', 4) },
      { code: 'advanced_inventory', points: 4, category: 'advanced', images: getImages('advanced_inventory', 1) },
      { code: 'stock_ledger', points: 3, category: 'advanced', images: getImages('stock_ledger', 0) },
      { code: 'buyer_supplier_directory', points: 4, category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', points: 4, category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', points: 4, category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'po_owner_approval', points: 4, category: 'advanced', images: getImages('po_owner_approval', 0) },
      { code: 'buyer_purchase_invoices', points: 4, category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
      { code: 'invoice_check', points: 4, category: 'advanced', images: getImages('invoice_check', 0) },
      { code: 'work_manuals', points: 4, category: 'advanced', images: getImages('work_manuals', 1) },
      { code: 'system_inquiry', points: 4, category: 'advanced', images: getImages('system_inquiry', 4) },
      { code: 'operation_inquiry', points: 4, category: 'advanced', images: getImages('operation_inquiry', 3) },
      { code: 'activity_logs', points: 4, category: 'advanced', images: getImages('activity_logs', 1) },
    ]
  },
  {
    key: 'brand',
    features: [
      { code: 'brand_dashboard', points: 4, category: 'basic', images: getImages('brand_dashboard', 2) },
      { code: 'brand_franchise', points: 5, category: 'basic', images: getImages('brand_franchise', 3) },
      { code: 'brand_management', points: 4, category: 'basic', images: getImages('brand_management', 2) },
      { code: 'brand_restaurant_mgmt', points: 4, category: 'basic', images: getImages('brand_restaurant_mgmt', 3) },
      { code: 'brand_admin_staff', points: 4, category: 'basic', images: getImages('brand_admin_staff', 4) },
      { code: 'brand_manager_mgmt', points: 4, category: 'basic', images: getImages('brand_manager_mgmt', 2) },
      { code: 'brand_invoices', points: 5, category: 'basic', images: getImages('brand_invoices', 4) },
      { code: 'brand_reports', points: 4, category: 'basic', images: getImages('brand_reports', 5) },
      { code: 'brand_notices', points: 4, category: 'basic', images: getImages('brand_notices', 3) },
      { code: 'brand_menus', points: 5, category: 'basic', images: getImages('brand_menus', 3) },
      { code: 'brand_products', points: 4, category: 'advanced', images: getImages('brand_products', 4) },
      { code: 'brand_recipes', points: 4, category: 'advanced', images: getImages('brand_recipes', 3) },
      { code: 'brand_product_recipes', points: 4, category: 'advanced', images: getImages('brand_product_recipes', 2) },
      { code: 'brand_ingredients', points: 4, category: 'advanced', images: getImages('brand_ingredients', 0) },
      { code: 'brand_stock_sharing', points: 3, category: 'advanced', images: getImages('brand_stock_sharing', 0) },
      { code: 'brand_suppliers', points: 4, category: 'advanced', images: getImages('brand_suppliers', 0) },
      { code: 'brand_inventory', points: 4, category: 'advanced', images: getImages('brand_inventory', 3) },
      { code: 'buyer_supplier_directory', points: 4, category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', points: 4, category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', points: 4, category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', points: 4, category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
      { code: 'brand_performance', points: 4, category: 'advanced', images: getImages('brand_performance', 2) },
      { code: 'brand_system_inquiry', points: 4, category: 'advanced', images: getImages('brand_system_inquiry', 3) },
      { code: 'brand_operation_inquiry', points: 4, category: 'advanced', images: getImages('brand_operation_inquiry', 2) },
      { code: 'brand_activity_logs', points: 4, category: 'advanced', images: getImages('brand_activity_logs', 0) },
      { code: 'brand_work_manuals', points: 4, category: 'advanced', images: getImages('brand_work_manuals', 1) },
      { code: 'brand_plans', points: 4, category: 'advanced', images: getImages('brand_plans', 3) },
      { code: 'brand_subscriptions', points: 4, category: 'advanced', images: getImages('brand_subscriptions', 2) },
      { code: 'brand_payment_settings', points: 4, category: 'advanced', images: getImages('brand_payment_settings', 2) },
    ]
  },
  {
    key: 'foodcourt',
    features: [
      { code: 'fc_dashboard', points: 4, category: 'basic', images: getImages('fc_dashboard', 1) },
      { code: 'fc_tenancy', points: 5, category: 'basic', images: getImages('fc_tenancy', 2) },
      { code: 'fc_management', points: 4, category: 'basic', images: getImages('fc_management', 1) },
      { code: 'fc_branches', points: 5, category: 'basic', images: getImages('fc_branches', 1) },
      { code: 'fc_restaurant_mgmt', points: 4, category: 'basic', images: getImages('fc_restaurant_mgmt', 1) },
      { code: 'fc_admin_staff', points: 4, category: 'basic', images: getImages('fc_admin_staff', 1) },
      { code: 'fc_manager_mgmt', points: 4, category: 'basic', images: getImages('fc_manager_mgmt', 0) },
      { code: 'fc_invoices', points: 5, category: 'basic', images: getImages('fc_invoices', 1) },
      { code: 'fc_notices', points: 4, category: 'basic', images: getImages('fc_notices', 1) },
      { code: 'fc_floor_plan', points: 5, category: 'advanced', images: getImages('fc_floor_plan', 1) },
      { code: 'fc_products', points: 4, category: 'advanced', images: getImages('fc_products', 0) },
      { code: 'fc_inventory', points: 4, category: 'advanced', images: getImages('fc_inventory', 0) },
      { code: 'buyer_supplier_directory', points: 4, category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', points: 4, category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', points: 4, category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', points: 4, category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
      { code: 'fc_coupons', points: 4, category: 'advanced', images: getImages('fc_coupons', 0) },
      { code: 'fc_system_inquiry', points: 4, category: 'advanced', images: getImages('fc_system_inquiry', 1) },
      { code: 'fc_operation_inquiry', points: 4, category: 'advanced', images: getImages('fc_operation_inquiry', 1) },
      { code: 'fc_plans', points: 4, category: 'advanced', images: getImages('fc_plans', 1) },
      { code: 'fc_subscriptions', points: 4, category: 'advanced', images: getImages('fc_subscriptions', 1) },
      { code: 'fc_payment_settings', points: 4, category: 'advanced', images: getImages('fc_payment_settings', 1) },
      { code: 'fc_work_manuals', points: 4, category: 'advanced', images: getImages('fc_work_manuals', 1) },
      { code: 'fc_activity_logs', points: 4, category: 'advanced', images: getImages('fc_activity_logs', 0) },
    ]
  },
  {
    key: 'owner',
    features: [
      { code: 'owner_dashboard', points: 4, category: 'basic', images: getImages('owner_dashboard', 1) },
      { code: 'owner_restaurants', points: 4, category: 'basic', images: getImages('owner_restaurants', 1) },
      { code: 'owner_invoices', points: 4, category: 'basic', images: getImages('owner_invoices', 1) },
      { code: 'owner_po_approvals', points: 3, category: 'basic', images: getImages('owner_po_approvals', 0) },
      { code: 'owner_notices', points: 4, category: 'basic', images: getImages('owner_notices', 1) },
      { code: 'owner_performance', points: 4, category: 'advanced', images: getImages('owner_performance', 1) },
      { code: 'owner_reports', points: 4, category: 'advanced', images: getImages('owner_reports', 1) },
      { code: 'owner_system_inquiry', points: 4, category: 'advanced', images: getImages('owner_system_inquiry', 1) },
      { code: 'owner_operation_inquiry', points: 4, category: 'advanced', images: getImages('owner_operation_inquiry', 1) },
      { code: 'owner_work_manuals', points: 4, category: 'advanced', images: getImages('owner_work_manuals', 1) },
      { code: 'owner_activity_logs', points: 4, category: 'advanced', images: getImages('owner_activity_logs', 0) },
    ]
  },
  {
    key: 'supplier',
    features: [
      { code: 'supplier_dashboard', points: 5, category: 'basic', images: getImages('supplier_dashboard', 1) },
      { code: 'supplier_live_orders', points: 6, category: 'basic', images: getImages('supplier_live_orders', 1) },
      { code: 'supplier_products', points: 4, category: 'basic', images: getImages('supplier_products', 1) },
      { code: 'supplier_inventory', points: 4, category: 'basic', images: getImages('supplier_inventory', 1) },
      { code: 'supplier_customers', points: 4, category: 'basic', images: getImages('supplier_customers', 1) },
      { code: 'supplier_trade_invoices', points: 4, category: 'basic', images: getImages('supplier_trade_invoices', 1) },
      { code: 'supplier_soa', points: 4, category: 'basic', images: getImages('supplier_soa', 0) },
      { code: 'supplier_invoices', points: 4, category: 'basic', images: getImages('supplier_invoices', 1) },
      { code: 'supplier_notices', points: 4, category: 'basic', images: getImages('supplier_notices', 1) },
      { code: 'supplier_system_inquiry', points: 4, category: 'basic', images: getImages('supplier_system_inquiry', 1) },
      { code: 'supplier_contracts', points: 5, category: 'advanced', images: getImages('supplier_contracts', 1) },
      { code: 'supplier_company_info', points: 4, category: 'advanced', images: getImages('supplier_company_info', 1) },
      { code: 'supplier_payment_settings', points: 4, category: 'advanced', images: getImages('supplier_payment_settings', 1) },
      { code: 'supplier_invoice_settings', points: 4, category: 'advanced', images: getImages('supplier_invoice_settings', 1) },
      { code: 'supplier_orders', points: 4, category: 'basic', images: getImages('supplier_orders', 1) },
      { code: 'supplier_shipping', points: 4, category: 'basic', images: getImages('supplier_shipping', 0) },
      { code: 'supplier_directory', points: 4, category: 'basic', images: getImages('supplier_directory', 0) },
      { code: 'supplier_admin_staff', points: 4, category: 'advanced', images: getImages('supplier_admin_staff', 1) },
      { code: 'buyer_supplier_directory', points: 4, category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', points: 4, category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', points: 4, category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', points: 4, category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
    ]
  },
];

// ─── Main Component ───
// Tab is mirrored to URL hash (#restaurant / #brand / #foodcourt / #owner / #supplier)
// so individual tabs can be shared/bookmarked and the Back button works.
const VALID_TAB_KEYS = ROLE_TABS.map(t => t.key);
const readTabFromHash = (): string => {
  if (typeof window === 'undefined') return 'restaurant';
  const h = (window.location.hash || '').replace(/^#/, '').toLowerCase();
  return VALID_TAB_KEYS.includes(h) ? h : 'restaurant';
};

const FeaturesPage: React.FC = () => {
  const { t } = useTranslation('landing');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(readTabFromHash);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number; title: string } | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Sync hash → state on browser back/forward
  useEffect(() => {
    const onHashChange = () => setActiveTab(readTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Sync state → hash on tab click. `replaceState` so Back doesn't cycle through every tab toggle.
  useEffect(() => {
    const want = `#${activeTab}`;
    if (window.location.hash !== want) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${want}`);
    }
  }, [activeTab]);

  const activeRole = ROLE_TABS.find(t => t.key === activeTab)!;
  const basicFeatures = activeRole.features.filter(f => f.category === 'basic');
  const advancedFeatures = activeRole.features.filter(f => f.category === 'advanced');

  const openLightbox = useCallback((images: string[], index: number, title: string) => {
    const validImages = images.filter(img => !imageErrors.has(img));
    if (validImages.length > 0) {
      setLightbox({ images: validImages, index: Math.min(index, validImages.length - 1), title });
    }
  }, [imageErrors]);

  const handleImageError = useCallback((src: string) => {
    setImageErrors(prev => new Set([...Array.from(prev), src]));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') setLightbox(prev => prev ? { ...prev, index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1 } : null);
      if (e.key === 'ArrowRight') setLightbox(prev => prev ? { ...prev, index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1 } : null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const getValidImages = (feature: FeatureItem): string[] => {
    return feature.images.filter(img => !imageErrors.has(img));
  };

  const renderFeatureCard = (feature: FeatureItem) => {
    const validImages = getValidImages(feature);
    const base = `landing:featuresPage.${activeRole.key}.${feature.code}`;
    const title = t(`${base}.title`);
    return (
      <FeatureCard key={feature.code}>
        {validImages.length > 0 ? (
          <FeatureImageSlider images={validImages} title={title} onOpenLightbox={openLightbox} />
        ) : (
          <ImageSlider>
            <SliderPlaceholder>{t('landing:featuresPage.screenshotComingSoon')}</SliderPlaceholder>
          </ImageSlider>
        )}
        <CardBody>
          <FeatureBadge variant={feature.category}>{t(`landing:featuresPage.badge.${feature.category}`)}</FeatureBadge>
          <FeatureTitle>{title}</FeatureTitle>
          <FeatureDescription>{t(`${base}.desc`)}</FeatureDescription>
          <FeaturePoints>
            {Array.from({ length: feature.points }, (_, idx) => (
              <FeaturePoint key={idx}>{t(`${base}.p${idx + 1}`)}</FeaturePoint>
            ))}
          </FeaturePoints>
        </CardBody>
        {/* Hidden images for error detection */}
        {feature.images.map(img => (
          <img key={img} src={img} alt="" style={{ display: 'none' }} onError={() => handleImageError(img)} />
        ))}
      </FeatureCard>
    );
  };

  return (
    <LandingLayout>
      <SEOHead
        title="Features - Powerful POS Tools for Every Business"
        description="Explore PurpleHere's powerful features: POS terminal, menu management, real-time analytics, multi-branch support, kitchen display, and more."
        keywords="POS features, restaurant management features, kitchen display, menu management, order management, analytics"
        canonicalUrl="https://purplehere.com/features"
        jsonLd={[
          generateHowToSchema(),
          generateBreadcrumbSchema([
            { name: 'Home', url: 'https://purplehere.com' },
            { name: 'Features', url: 'https://purplehere.com/features' }
          ])
        ]}
      />
      <PageContainer>
        <HeroSection>
          <HeroTitle>{t('landing:featuresPage.powerfulFeaturesForEveryNeed')}</HeroTitle>
          <HeroSubtitle>
            {t('landing:featuresPage.heroSubtitle')}
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <TabBar>
            {ROLE_TABS.map(tab => (
              <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
                {t(`landing:featuresPage.tab.${tab.key}.label`)}
              </TabButton>
            ))}
          </TabBar>

          <RoleHeading>{t(`landing:featuresPage.tab.${activeRole.key}.heading`)}</RoleHeading>
          <RoleDescription>{t(`landing:featuresPage.tab.${activeRole.key}.description`)}</RoleDescription>

          {basicFeatures.length > 0 && (
            <>
              <CategoryLabel variant="basic">{t('landing:featuresPage.basicFeaturesCount', { count: basicFeatures.length })}</CategoryLabel>
              <FeaturesGrid>
                {basicFeatures.map(renderFeatureCard)}
              </FeaturesGrid>
            </>
          )}

          {advancedFeatures.length > 0 && (
            <>
              <CategoryLabel variant="advanced">{t('landing:featuresPage.advancedFeaturesCount', { count: advancedFeatures.length })}</CategoryLabel>
              <FeaturesGrid>
                {advancedFeatures.map(renderFeatureCard)}
              </FeaturesGrid>
            </>
          )}

          <CTASection>
            <CTATitle>{t('landing:featuresPage.readyToTransformYourBusiness')}</CTATitle>
            <CTASubtitle>
              {t('landing:featuresPage.tryOurDemoAccountsOrContactUsToGetStarte')}
            </CTASubtitle>
            <CTAButton onClick={() => navigate('/demo')}>
              {t('landing:featuresPage.tryDemoNow')}
            </CTAButton>
          </CTASection>
        </ContentSection>
      </PageContainer>

      {/* Lightbox */}
      {lightbox && (
        <LightboxOverlay onClick={() => setLightbox(null)}>
          <LightboxClose onClick={() => setLightbox(null)}>×</LightboxClose>
          {lightbox.images.length > 1 && (
            <LightboxArrow direction="left" onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, index: prev.index === 0 ? prev.images.length - 1 : prev.index - 1 } : null); }}>‹</LightboxArrow>
          )}
          <LightboxImage src={lightbox.images[lightbox.index]} alt={lightbox.title} onClick={(e) => e.stopPropagation()} />
          {lightbox.images.length > 1 && (
            <LightboxArrow direction="right" onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev ? { ...prev, index: prev.index === prev.images.length - 1 ? 0 : prev.index + 1 } : null); }}>›</LightboxArrow>
          )}
          <LightboxCaption>{lightbox.title} — {lightbox.index + 1} / {lightbox.images.length}</LightboxCaption>
        </LightboxOverlay>
      )}
    </LandingLayout>
  );
};

export default FeaturesPage;
