import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LandingLayout } from '../../components/Landing';
import SEOHead, { generateHowToSchema, generateBreadcrumbSchema } from '../../components/Common/SEOHead';

// ─── Types ───
interface FeatureItem {
  code: string;
  title: string;
  description: string;
  points: string[];
  category: 'basic' | 'advanced';
  images: string[];
}

interface RoleTab {
  key: string;
  label: string;
  heading: string;
  description: string;
  features: FeatureItem[];
}

// ─── Styled Components ───
const PageContainer = styled.div`
  background: #FAFBFC;
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
  border: 2px solid ${props => props.active ? '#635BFF' : '#E5E7EB'};
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
  color: #6B7C93;
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
  border-bottom: 2px solid #E6EBF1;
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
  border: 1px solid #E6EBF1;
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
  background: #F0F2F5;
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
  color: #6B7C93;
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
  color: #374151;
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
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
  // useTranslation moved to component level

  return (
      <ImageSlider>
        <SliderImageWrapper>
          <SliderPlaceholder>{'Screenshot coming soon'}</SliderPlaceholder>
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
    label: 'Restaurant',
    heading: 'Everything a restaurant needs to manage orders, menus, staff, and customers',
    description: 'From a powerful POS terminal and real-time kitchen display to staff scheduling, inventory tracking, and customer management — PurpleHere brings every aspect of restaurant operations into one seamless platform. Reduce manual work, minimize errors, and serve customers faster with tools built specifically for the food service industry. Whether you run a single cafe or a busy full-service restaurant, our system adapts to your workflow and scales with your growth.',
    features: [
      // Operations
      { code: 'dashboard', title: 'Dashboard', description: 'Real-time overview of sales, orders, and key metrics at a glance', points: ['Daily sales summary', 'Order statistics', 'Revenue trends', 'Quick notifications'], category: 'basic', images: getImages('dashboard', 2) },
      { code: 'live_orders', title: 'Live Orders', description: 'Real-time order tracking and status management', points: ['Real-time order queue', 'Status updates (Pending → Preparing → Ready)', 'Order details and modifications', 'Sound notifications for new orders'], category: 'basic', images: getImages('live_orders', 3) },
      { code: 'pos_terminal', title: 'POS Terminal', description: 'Fast and intuitive point-of-sale system for taking orders', points: ['Quick order entry with categories', 'Split bill & multiple payments', 'Discount and coupon application', 'Receipt printing & email'], category: 'basic', images: getImages('pos_terminal', 3) },
      { code: 'kitchen_display', title: 'Kitchen Display', description: 'Kitchen display system for streamlined order preparation', points: ['Color-coded order priorities', 'Preparation time tracking', 'Order bump when complete', 'Multi-station support'], category: 'basic', images: getImages('kitchen_display', 1) },
      { code: 'customer_display', title: 'Customer Display', description: 'Customer-facing screen showing order status and queue', points: ['Order status display', 'Queue number management', 'Branding customization', 'Multi-language support'], category: 'basic', images: getImages('customer_display', 1) },
      // Invoices & Reports
      { code: 'invoice_billing', title: 'Invoice & Billing', description: 'Invoice management, payment tracking, and billing history', points: ['Invoice list with status tracking', 'Multiple payment methods', 'Non-member invoice support', 'Payment history', 'Invoice settings & templates'], category: 'basic', images: getImages('invoice_billing', 3) },
      { code: 'reports', title: 'Reports & Analytics', description: 'Sales reports, revenue analytics, and business insights', points: ['Daily, weekly, monthly reports', 'Sales by category and item', 'Payment method breakdown', 'Export to CSV/Excel'], category: 'basic', images: getImages('reports', 6) },
      // Catalog
      { code: 'menu_management', title: 'Menu Management', description: 'Complete menu, category, and option management', points: ['Menu items with images & pricing', 'Category organization', 'Option groups & modifiers', 'Availability toggle'], category: 'basic', images: getImages('menu_management', 4) },
      // Organization
      { code: 'staff_management', title: 'Staff & Permission Management', description: 'Staff management with role-based permissions and PIN access', points: ['Staff accounts with PIN login', '6 permission groups', 'Role-based menu access', 'Staff activity tracking'], category: 'basic', images: getImages('staff_management', 2) },
      { code: 'customer_crm', title: 'Customer Management', description: 'Customer database and relationship management', points: ['Customer profiles', 'Order history per customer', 'Customer insights', 'Segmentation and filtering'], category: 'basic', images: getImages('customer_crm', 3) },
      { code: 'coupons', title: 'Coupon Management', description: 'Create and manage discount coupons and promotions', points: ['Percentage or fixed discounts', 'Minimum order requirements', 'Usage limits and expiry dates', 'Coupon performance tracking'], category: 'basic', images: getImages('coupons', 3) },
      { code: 'membership', title: 'Membership', description: 'Customer membership and loyalty program management', points: ['Membership tier management', 'Point accumulation & redemption', 'Member benefits & rewards', 'Membership analytics'], category: 'basic', images: getImages('membership', 0) },
      // Communication
      { code: 'notices', title: 'Notices', description: 'Receive system-wide announcements and notices', points: ['Notice feed with read status', 'Comment and discussion', 'Priority-based sorting', 'File attachments'], category: 'basic', images: getImages('notices', 2) },
      // Advanced
      { code: 'floor_plan', title: 'Floor Plan & Table Management', description: 'Visual floor plan editor with drag-and-drop table layout', points: ['Drag-and-drop floor plan editor', 'Table status tracking', 'Per-table QR code printing', 'QR session management with expiration', 'Real-time availability'], category: 'advanced', images: getImages('floor_plan', 4) },
      { code: 'mobile_ordering', title: 'Mobile Ordering', description: 'Let customers order directly from their phones via QR code', points: ['QR code table ordering', 'Session-based QR with auto-expiration', 'Digital menu with images', 'Real-time order tracking', 'Online payment integration'], category: 'advanced', images: getImages('mobile_ordering', 6) },
      { code: 'recipe_management', title: 'Recipe Management', description: 'Create and manage recipes with ingredient cost tracking', points: ['Recipe creation with steps', 'Ingredient mapping', 'Cost calculation per serving', 'Recipe versioning'], category: 'advanced', images: getImages('recipe_management', 3) },
      { code: 'ingredients', title: 'Ingredients', description: 'Ingredient catalog with cost and category tracking', points: ['Ingredient library', 'Category organization', 'Cost per unit tracking', 'Recipe linkage'], category: 'advanced', images: getImages('ingredients', 1) },
      { code: 'suppliers', title: 'Suppliers', description: 'Supplier directory with contact and purchase history', points: ['Supplier profiles', 'Contact details', 'Purchase tracking per supplier', 'Category filtering'], category: 'advanced', images: getImages('suppliers', 1) },
      { code: 'inventory_management', title: 'Inventory & Supplier Management', description: 'Stock tracking, supplier management, and inventory control', points: ['Real-time stock levels', 'Supplier database', 'Purchase tracking', 'Low stock alerts'], category: 'advanced', images: getImages('inventory_management', 4) },
      { code: 'advanced_inventory', title: 'Advanced Inventory', description: 'Advanced stock take, loss analysis, and order suggestions', points: ['Periodic stock take', 'Loss (shrinkage) analysis', 'Auto order suggestions', 'Expiry management'], category: 'advanced', images: getImages('advanced_inventory', 1) },
      { code: 'buyer_supplier_directory', title: 'Supplier Directory', description: 'Browse and search PurpleHere\'s supplier network with full product catalogs and pricing', points: ['Supplier search by category and region', 'Public profile and product catalog browse', 'Lead inquiry to suppliers', 'Saved suppliers shortlist'], category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', title: 'Supplier Contracts', description: 'Negotiate and manage per-supplier contracts with exclusivity terms and pricing', points: ['Active / draft / expired contracts', 'Per-line item pricing', 'Exclusivity & renewal terms', 'Active contract gates PO submission'], category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', title: 'Purchase Orders', description: 'Place purchase orders with suppliers and track full lifecycle (pending → confirmed → shipped → received)', points: ['Multi-supplier PO creation', 'Lifecycle tracking with carrier integration', 'Receive partial / full delivery', 'Returns and credit notes'], category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', title: 'Purchase Invoices', description: 'Receive trade invoices from suppliers automatically — payment tracking and SOA reconciliation', points: ['Auto-issued by supplier on PO receipt', 'Outstanding payable tracking', 'Per-supplier statements of account', 'Payment recording with reference'], category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
      { code: 'work_manuals', title: 'Work Manuals', description: 'Access work manuals shared by brand or foodcourt', points: ['Manual feed with search', 'Category filtering', 'Version tracking', 'Comment threads'], category: 'advanced', images: getImages('work_manuals', 1) },
      { code: 'system_inquiry', title: 'System Inquiry', description: 'Submit and track system support tickets', points: ['Create support tickets', 'Priority and category tagging', 'Status tracking', 'Communication thread'], category: 'advanced', images: getImages('system_inquiry', 4) },
      { code: 'operation_inquiry', title: 'Operation Inquiry', description: 'Communicate operational requests with Brand or Foodcourt management', points: ['Submit operational inquiries', 'Track request status', 'Two-way communication', 'Available for affiliated restaurants only'], category: 'advanced', images: getImages('operation_inquiry', 3) },
      { code: 'activity_logs', title: 'Change History', description: 'Track all changes made by team members for accountability', points: ['Activity audit trail', 'User-level tracking', 'Date range filtering', 'Change detail view'], category: 'advanced', images: getImages('activity_logs', 1) },
    ]
  },
  {
    key: 'brand',
    label: 'Brand',
    heading: 'Centralized control for franchise and multi-location brands',
    description: 'Monitor every outlet in real time, standardize menus and recipes across all locations, and manage subscriptions from a single dashboard. PurpleHere gives brand operators full visibility into sales performance, staff activity, and operational consistency — ensuring every franchise delivers the same quality your brand promises. With built-in invoice management, performance analytics, and multi-tier permission controls, scaling your brand has never been easier.',
    features: [
      // Operations
      { code: 'brand_dashboard', title: 'Dashboard', description: 'Centralized overview of all brand locations and performance', points: ['Multi-location sales overview', 'Performance at a glance', 'Trend analysis', 'Quick access to any outlet'], category: 'basic', images: getImages('brand_dashboard', 2) },
      { code: 'brand_franchise', title: 'Franchise Management & Map', description: 'Franchise contracts, applicants pipeline, and geographic map view', points: ['Contract lifecycle (applicant → active → archive)', 'Pipeline board for in-progress contracts', 'Interactive map with franchise / direct pins', 'Pin size scaled by 30-day sales', 'Territory radius from exclusivity terms'], category: 'basic', images: getImages('brand_franchise', 3) },
      // Management
      { code: 'brand_management', title: 'Brand Management', description: 'Manage brand information and global settings', points: ['Brand profile settings', 'Logo and branding', 'Global configurations', 'Brand-level controls'], category: 'basic', images: getImages('brand_management', 2) },
      { code: 'brand_restaurant_mgmt', title: 'Restaurant Management', description: 'Manage all restaurants under the brand', points: ['Restaurant list overview', 'Add/remove locations', 'Assign plans and modules', 'Monitor restaurant status'], category: 'basic', images: getImages('brand_restaurant_mgmt', 3) },
      { code: 'brand_admin_staff', title: 'Admin & Staff Management', description: 'Manage restaurant admins and staff across all brand locations', points: ['Admin assignment per restaurant', 'Admin overview across locations', 'Role management', 'Access control'], category: 'basic', images: getImages('brand_admin_staff', 4) },
      { code: 'brand_manager_mgmt', title: 'Manager Management', description: 'Create and manage brand managers with permission control', points: ['Brand manager accounts', 'Permission groups', 'Activity monitoring', 'Manager hierarchy'], category: 'basic', images: getImages('brand_manager_mgmt', 2) },
      // Invoices & Reports
      { code: 'brand_invoices', title: 'Invoice & Billing', description: 'Generate and manage invoices for franchise locations', points: ['Invoice generation', 'Non-member invoice support', 'Payment tracking', 'Billing history', 'Multiple payment methods'], category: 'basic', images: getImages('brand_invoices', 4) },
      { code: 'brand_reports', title: 'Reports', description: 'Comprehensive reporting across all brand locations', points: ['Consolidated sales reports', 'Location comparison', 'Revenue breakdown', 'Export capabilities'], category: 'basic', images: getImages('brand_reports', 5) },
      // Communication
      { code: 'brand_notices', title: 'Notice Management', description: 'Send announcements and notices to all brand restaurants', points: ['Broadcast to all locations', 'Targeted notices', 'Read receipts', 'Comment threads'], category: 'basic', images: getImages('brand_notices', 3) },
      // Advanced
      { code: 'brand_products', title: 'Product Management', description: 'Centralized product and menu management for the brand', points: ['Global product catalog', 'Menu standardization', 'Price management', 'Product distribution to outlets'], category: 'advanced', images: getImages('brand_products', 4) },
      { code: 'brand_recipes', title: 'Recipe Management', description: 'Standardized recipe management across all franchises', points: ['Central recipe database', 'Ingredient standardization', 'Cost tracking', 'Recipe distribution'], category: 'advanced', images: getImages('brand_recipes', 3) },
      { code: 'brand_product_recipes', title: 'Product Recipe Management', description: 'Link products to recipes for automated cost tracking', points: ['Product-recipe linking', 'Cost per product calculation', 'Margin analysis', 'Recipe assignment'], category: 'advanced', images: getImages('brand_product_recipes', 2) },
      { code: 'brand_ingredients', title: 'Ingredients', description: 'Brand-wide ingredient catalog shared across franchise locations', points: ['Standardized ingredient library', 'Cost per unit tracking', 'Category organization', 'Distribution to restaurants'], category: 'advanced', images: getImages('brand_ingredients', 0) },
      { code: 'brand_suppliers', title: 'Suppliers', description: 'Brand-level supplier directory and contract management', points: ['Approved supplier list', 'Contact management', 'Contract visibility', 'Category filtering'], category: 'advanced', images: getImages('brand_suppliers', 0) },
      { code: 'brand_inventory', title: 'Inventory & Supplier Management', description: 'Centralized inventory and supplier oversight across locations', points: ['Multi-location stock overview', 'Supplier database', 'Inventory alerts', 'Supply chain visibility'], category: 'advanced', images: getImages('brand_inventory', 3) },
      { code: 'buyer_supplier_directory', title: 'Supplier Directory', description: 'Browse and search PurpleHere\'s supplier network with full product catalogs and pricing', points: ['Supplier search by category and region', 'Public profile and product catalog browse', 'Lead inquiry to suppliers', 'Saved suppliers shortlist'], category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', title: 'Supplier Contracts', description: 'Negotiate and manage per-supplier contracts with exclusivity terms and pricing', points: ['Active / draft / expired contracts', 'Per-line item pricing', 'Exclusivity & renewal terms', 'Active contract gates PO submission'], category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', title: 'Purchase Orders', description: 'Place purchase orders with suppliers and track full lifecycle (pending → confirmed → shipped → received)', points: ['Multi-supplier PO creation', 'Lifecycle tracking with carrier integration', 'Receive partial / full delivery', 'Returns and credit notes'], category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', title: 'Purchase Invoices', description: 'Receive trade invoices from suppliers automatically — payment tracking and SOA reconciliation', points: ['Auto-issued by supplier on PO receipt', 'Outstanding payable tracking', 'Per-supplier statements of account', 'Payment recording with reference'], category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
      { code: 'brand_performance', title: 'Performance Analytics', description: 'Deep performance comparison across all brand locations', points: ['Location ranking', 'Sales comparison charts', 'Growth trends', 'Benchmark analysis'], category: 'advanced', images: getImages('brand_performance', 2) },
      { code: 'brand_system_inquiry', title: 'System Inquiry', description: 'System support and issue tracking', points: ['Support ticket creation', 'Priority management', 'Status tracking', 'Resolution history'], category: 'advanced', images: getImages('brand_system_inquiry', 3) },
      { code: 'brand_operation_inquiry', title: 'Inquiry Management', description: 'Manage operational inquiries from franchise restaurants', points: ['Inquiry queue management', 'Response and resolution', 'Category-based organization', 'Performance metrics'], category: 'advanced', images: getImages('brand_operation_inquiry', 2) },
      { code: 'brand_activity_logs', title: 'Change History', description: 'Track all changes across brand operations for accountability', points: ['Activity audit trail', 'User-level tracking', 'Date range filtering', 'Change detail view'], category: 'advanced', images: getImages('brand_activity_logs', 0) },
      { code: 'brand_work_manuals', title: 'Work Manuals', description: 'Centralized work manuals for franchise operations', points: ['Manual creation and editing', 'Category organization', 'Version tracking', 'Distribution to restaurants'], category: 'advanced', images: getImages('brand_work_manuals', 1) },
      { code: 'brand_plans', title: 'Subscription Plans', description: 'Create and manage subscription plans for franchise locations', points: ['Plan template creation', 'Module selection per plan', 'Pricing configuration', 'Plan assignment'], category: 'advanced', images: getImages('brand_plans', 3) },
      { code: 'brand_subscriptions', title: 'Subscription Management', description: 'Track and manage subscriptions for all franchisees', points: ['Subscription status overview', 'Billing cycle management', 'Renewal tracking', 'Usage monitoring'], category: 'advanced', images: getImages('brand_subscriptions', 2) },
      { code: 'brand_payment_settings', title: 'Payment Settings', description: 'Configure payment methods and billing for the brand', points: ['Payment gateway setup', 'Bank account configuration', 'Billing preferences', 'Tax settings'], category: 'advanced', images: getImages('brand_payment_settings', 2) },
    ]
  },
  {
    key: 'foodcourt',
    label: 'Foodcourt',
    heading: 'Complete management tools for food court operators',
    description: 'Oversee all tenant restaurants from one place — handle billing, manage inquiries, track real-time performance analytics, and streamline shared services effortlessly. PurpleHere simplifies the complexity of multi-tenant foodcourt operations with automated invoicing, centralized notice broadcasting, and detailed revenue breakdowns per tenant. Spend less time on admin work and more time growing your foodcourt business.',
    features: [
      // Operations
      { code: 'fc_dashboard', title: 'Dashboard', description: 'Foodcourt-wide overview with tenant performance summary', points: ['Tenant sales overview', 'Occupancy status', 'Revenue summary', 'Quick tenant access'], category: 'basic', images: getImages('fc_dashboard', 1) },
      { code: 'fc_tenancy', title: 'Tenancy Management & Map', description: 'Tenant contracts and geographic branch map', points: ['Contract lifecycle (applicant → active → archive)', 'Pipeline board for in-progress contracts', 'Interactive map with occupancy % per branch', 'Click branch to view tenant list', 'Auto-geocoded branch addresses'], category: 'basic', images: getImages('fc_tenancy', 2) },
      // Management
      { code: 'fc_management', title: 'Foodcourt Management', description: 'Manage foodcourt information and operations', points: ['Foodcourt profile', 'Operating hours', 'Facility management', 'Configuration settings'], category: 'basic', images: getImages('fc_management', 1) },
      { code: 'fc_branches', title: 'Branch Management & Unit Numbering', description: 'Multi-branch foodcourt support with flexible unit numbering', points: ['Multiple branches per foodcourt', 'Per-branch address & coordinates', 'Zone-based unit numbering (prefix + free-form)', 'Range notation: 01-20, A01-A10, P-2-01A-05A auto-expand', 'Contract-linked units protected from deletion'], category: 'basic', images: getImages('fc_branches', 1) },
      { code: 'fc_restaurant_mgmt', title: 'Restaurant Management', description: 'Manage tenant restaurants in the foodcourt', points: ['Tenant list overview', 'Add/remove tenants', 'Plan assignment', 'Tenant status monitoring'], category: 'basic', images: getImages('fc_restaurant_mgmt', 1) },
      { code: 'fc_admin_staff', title: 'Admin & Staff Management', description: 'Manage restaurant admins and staff across foodcourt tenants', points: ['Admin assignment', 'Admin overview', 'Access management', 'Role configuration'], category: 'basic', images: getImages('fc_admin_staff', 1) },
      { code: 'fc_manager_mgmt', title: 'Manager Management', description: 'Create and manage foodcourt managers with permissions', points: ['Manager accounts', 'Permission control', 'Activity tracking', 'Role assignment'], category: 'basic', images: getImages('fc_manager_mgmt', 0) },
      // Invoices & Reports
      { code: 'fc_invoices', title: 'Invoice & Billing', description: 'Generate invoices for foodcourt tenants', points: ['Tenant invoice generation', 'Non-member invoice support', 'Rent and service billing', 'Payment tracking', 'Billing history'], category: 'basic', images: getImages('fc_invoices', 1) },
      // Communication
      { code: 'fc_notices', title: 'Notice Management', description: 'Send notices and announcements to foodcourt tenants', points: ['Broadcast notices', 'Targeted communication', 'Read tracking', 'Attachment support'], category: 'basic', images: getImages('fc_notices', 1) },
      // Advanced
      { code: 'fc_floor_plan', title: 'Floor Plan & Store Management', description: 'Drag-and-drop visual floor plan with store placement and status overlay', points: ['Drag-and-drop store placement', '4 shape options (rectangle, rounded, circle, triangle)', 'Resize handles and undo/redo', 'Unplaced stores panel for new units', 'Click-to-view contract and tenant info'], category: 'advanced', images: getImages('fc_floor_plan', 0) },
      { code: 'fc_products', title: 'Product Management', description: 'Foodcourt-level product catalog (common service items, rental products)', points: ['Foodcourt-wide product catalog', 'Pricing and unit setup', 'Tenant-shared catalog', 'Active/inactive toggle'], category: 'advanced', images: getImages('fc_products', 0) },
      { code: 'fc_inventory', title: 'Inventory Management', description: 'Stock tracking for foodcourt-owned inventory', points: ['Common stock tracking', 'Low-stock alerts', 'Receipt and dispatch logs', 'Multi-branch inventory'], category: 'advanced', images: getImages('fc_inventory', 0) },
      { code: 'buyer_supplier_directory', title: 'Supplier Directory', description: 'Browse and search PurpleHere\'s supplier network with full product catalogs and pricing', points: ['Supplier search by category and region', 'Public profile and product catalog browse', 'Lead inquiry to suppliers', 'Saved suppliers shortlist'], category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', title: 'Supplier Contracts', description: 'Negotiate and manage per-supplier contracts with exclusivity terms and pricing', points: ['Active / draft / expired contracts', 'Per-line item pricing', 'Exclusivity & renewal terms', 'Active contract gates PO submission'], category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', title: 'Purchase Orders', description: 'Place purchase orders with suppliers and track full lifecycle (pending → confirmed → shipped → received)', points: ['Multi-supplier PO creation', 'Lifecycle tracking with carrier integration', 'Receive partial / full delivery', 'Returns and credit notes'], category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', title: 'Purchase Invoices', description: 'Receive trade invoices from suppliers automatically — payment tracking and SOA reconciliation', points: ['Auto-issued by supplier on PO receipt', 'Outstanding payable tracking', 'Per-supplier statements of account', 'Payment recording with reference'], category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
      { code: 'fc_stats', title: 'Statistics & Analytics', description: 'Sales and performance statistics across all tenants', points: ['Tenant comparison charts', 'Revenue analysis', 'Peak hours analysis', 'Growth trends'], category: 'advanced', images: getImages('fc_stats', 0) },
      { code: 'fc_customers', title: 'Customer Management', description: 'Shared customer database for the foodcourt', points: ['Customer profiles', 'Visit history', 'Spending patterns', 'Customer insights'], category: 'advanced', images: getImages('fc_customers', 0) },
      { code: 'fc_coupons', title: 'Coupon Management', description: 'Foodcourt-wide coupon and promotion management', points: ['Foodcourt promotions', 'Cross-tenant coupons', 'Usage tracking', 'Campaign management'], category: 'advanced', images: getImages('fc_coupons', 0) },
      { code: 'fc_system_inquiry', title: 'System Inquiry', description: 'System support for foodcourt operations', points: ['Support tickets', 'Issue categorization', 'Status tracking', 'Resolution management'], category: 'advanced', images: getImages('fc_system_inquiry', 1) },
      { code: 'fc_operation_inquiry', title: 'Inquiry Management', description: 'Handle operational inquiries from foodcourt tenants', points: ['Inquiry queue', 'Response management', 'Category filtering', 'Resolution tracking'], category: 'advanced', images: getImages('fc_operation_inquiry', 1) },
      { code: 'fc_plans', title: 'Subscription Plans', description: 'Create plans for foodcourt tenant subscriptions', points: ['Plan templates', 'Module selection', 'Pricing tiers', 'Plan assignment'], category: 'advanced', images: getImages('fc_plans', 1) },
      { code: 'fc_subscriptions', title: 'Subscription Management', description: 'Track and manage tenant subscriptions', points: ['Subscription overview', 'Billing management', 'Renewal tracking', 'Status monitoring'], category: 'advanced', images: getImages('fc_subscriptions', 1) },
      { code: 'fc_payment_settings', title: 'Payment Settings', description: 'Configure payment and billing for the foodcourt', points: ['Payment methods', 'Bank configuration', 'Billing preferences', 'Tax setup'], category: 'advanced', images: getImages('fc_payment_settings', 1) },
      { code: 'fc_work_manuals', title: 'Work Manuals', description: 'Shared work manuals for foodcourt tenants', points: ['Manual creation and editing', 'Category organization', 'Distribution to tenants', 'Version tracking'], category: 'advanced', images: getImages('fc_work_manuals', 1) },
      { code: 'fc_activity_logs', title: 'Change History', description: 'Track all changes across foodcourt operations for accountability', points: ['Activity audit trail', 'User-level tracking', 'Date range filtering', 'Change detail view'], category: 'advanced', images: getImages('fc_activity_logs', 0) },
    ]
  },
  {
    key: 'owner',
    label: 'Owner',
    heading: 'Financial oversight for multi-restaurant owners',
    description: 'Compare performance side by side, track financials across every location, and stay fully informed — all without interfering with day-to-day operations. PurpleHere gives restaurant owners a bird\'s-eye view of their entire portfolio with consolidated reports, invoice management, and performance benchmarking. Make data-driven decisions about your investments while your on-site teams handle the daily workflow independently.',
    features: [
      // Operations
      { code: 'owner_dashboard', title: 'Dashboard', description: 'Portfolio overview with multi-restaurant performance summary', points: ['All restaurants at a glance', 'Revenue summary', 'Performance overview', 'Quick navigation'], category: 'basic', images: getImages('owner_dashboard', 1) },
      { code: 'owner_restaurants', title: 'Restaurant Portfolio', description: 'View and manage all owned restaurants', points: ['Restaurant list', 'Status overview', 'Performance indicators', 'Quick access to details'], category: 'basic', images: getImages('owner_restaurants', 1) },
      // Invoices & Reports
      { code: 'owner_invoices', title: 'Invoice & Billing', description: 'Invoice management and payment for all owned restaurants', points: ['Consolidated invoices', 'Payment tracking', 'Billing history', 'Multi-restaurant billing'], category: 'basic', images: getImages('owner_invoices', 1) },
      // Communication
      { code: 'owner_notices', title: 'Notices', description: 'System notices and announcements', points: ['Notice feed', 'Read tracking', 'Comments', 'Attachments'], category: 'basic', images: getImages('owner_notices', 1) },
      // Advanced
      { code: 'owner_performance', title: 'Performance Analytics', description: 'Compare performance across all owned restaurants', points: ['Restaurant ranking', 'Sales comparison', 'Growth analysis', 'Benchmark reporting'], category: 'advanced', images: getImages('owner_performance', 1) },
      { code: 'owner_reports', title: 'Financial Reports', description: 'Financial and operational reports across portfolio', points: ['Revenue analysis', 'Expense tracking', 'Profit margins', 'Export capabilities'], category: 'advanced', images: getImages('owner_reports', 1) },
      { code: 'owner_system_inquiry', title: 'System Inquiry', description: 'System support for restaurant owner', points: ['Support tickets', 'Issue tracking', 'Priority management', 'Resolution history'], category: 'advanced', images: getImages('owner_system_inquiry', 1) },
      { code: 'owner_operation_inquiry', title: 'Operation Inquiry', description: 'Operational inquiries across owned restaurants', points: ['Operation requests', 'Multi-restaurant scope', 'Status tracking', 'Communication thread'], category: 'advanced', images: getImages('owner_operation_inquiry', 1) },
      { code: 'owner_work_manuals', title: 'Work Manuals', description: 'Access shared work manuals across the portfolio', points: ['Manual feed', 'Category filtering', 'Version tracking', 'Per-restaurant visibility'], category: 'advanced', images: getImages('owner_work_manuals', 1) },
      { code: 'owner_activity_logs', title: 'Change History', description: 'Track all changes across owned restaurants for accountability', points: ['Activity audit trail', 'User-level tracking', 'Date range filtering', 'Multi-restaurant scope'], category: 'advanced', images: getImages('owner_activity_logs', 0) },
    ]
  },
  {
    key: 'supplier',
    label: 'Supplier',
    heading: 'Sell to restaurants, brands and food courts — manage every B2B order in one portal',
    description: 'PurpleHere\'s Supplier Portal is the seller-side companion to the POS. Receive purchase orders from restaurants in real time, confirm and ship with carrier integration, and let trade invoices and statements of account flow automatically. From contracted exclusive deals to walk-in orders, your buyers see live pricing, you see live demand, and the paperwork settles itself. Built for distributors, wholesalers, and central kitchens supplying multiple F&B businesses on a single trusted platform.',
    features: [
      // Operations
      { code: 'supplier_dashboard', title: 'Dashboard', description: 'Eight KPI overview — pending/confirmed/shipped orders, revenue trend, outstanding receivables, active customers, low stock, monthly receipts', points: ['8 KPIs at a glance', '6-month revenue line chart', 'Alerts panel with deep links', 'Recent orders & trade invoices side by side', 'Subscription status'], category: 'basic', images: getImages('supplier_dashboard', 1) },
      { code: 'supplier_live_orders', title: 'Live Orders', description: 'Real-time incoming purchase orders from buyers with sound alerts and lifecycle actions', points: ['Socket.IO live arrival + chime', 'Confirm / Ship (carrier dropdown) / Reject', 'Carrier catalog with auto tracking URL (Lalamove, Grab, J&T, Ninja Van, Pos Laju)', 'Edit tracking after ship', 'Mark delivered → Buyer receives', 'Returns approve/reject with auto Credit Note'], category: 'basic', images: getImages('supplier_live_orders', 0) },
      { code: 'supplier_products', title: 'Product Catalog', description: 'Manage the seller catalog of ingredients you sell, with per-buyer pricing and unit conversion', points: ['Ingredient catalog you sell', 'Per-customer pricing', 'Unit conversion (case ↔ unit)', 'Active/inactive toggle'], category: 'basic', images: getImages('supplier_products', 1) },
      { code: 'supplier_inventory', title: 'Inventory & Transactions', description: 'Stock-level tracking with full transaction history (receive, adjust, ship, return)', points: ['Stock list with low-stock alerts', 'Transaction history tab', 'Auto-decrement on PO ship', 'Return reversal'], category: 'basic', images: getImages('supplier_inventory', 1) },
      { code: 'supplier_customers', title: 'Customers (Buyers)', description: 'Directory of restaurant, brand, and foodcourt customers with order history and AR balance', points: ['Buyer profiles', 'Per-customer order history', 'Outstanding receivable per customer', 'Activity timeline'], category: 'basic', images: getImages('supplier_customers', 1) },
      // Invoices & Reports
      { code: 'supplier_trade_invoices', title: 'Trade Invoices', description: 'B2B invoices auto-generated when buyers receive PO — no manual issuing', points: ['Auto-issue on PO receipt', 'Per-line item with received quantity', 'Tax + currency configurable', 'PDF + email delivery'], category: 'basic', images: getImages('supplier_trade_invoices', 0) },
      { code: 'supplier_soa', title: 'Statement of Account', description: 'Monthly Statement of Account auto-generated for every active buyer', points: ['Auto-runs on the 1st of each month', 'Open + paid invoices summary', 'Per-customer breakdown', 'Email delivery'], category: 'basic', images: getImages('supplier_soa', 0) },
      { code: 'supplier_invoices', title: 'Subscription Invoices', description: 'PurpleHere subscription invoices and payment tracking', points: ['Subscription invoice list', 'Payment status', 'Multiple payment methods', 'Billing history'], category: 'basic', images: getImages('supplier_invoices', 1) },
      // Communication
      { code: 'supplier_notices', title: 'Notices', description: 'System-wide announcements and notices feed', points: ['Notice feed with read status', 'Comment threads', 'Priority-based sorting', 'Attachments'], category: 'basic', images: getImages('supplier_notices', 1) },
      { code: 'supplier_system_inquiry', title: 'System Inquiry', description: 'Submit and track system support tickets', points: ['Create support tickets', 'Priority and category tagging', 'Status tracking', 'Communication thread'], category: 'basic', images: getImages('supplier_system_inquiry', 1) },
      // Advanced
      { code: 'supplier_contracts', title: 'Supply Contracts', description: 'Per-buyer contracts with exclusivity terms, item lists, and pricing — gates orders to active contracts only', points: ['Contract lifecycle (draft → active → expired)', 'Exclusivity terms (item/category/region)', 'Per-line item pricing', 'Auto-renewal options', 'Active contract gates PO submission'], category: 'advanced', images: getImages('supplier_contracts', 0) },
      { code: 'supplier_company_info', title: 'Company Info', description: 'Manage supplier company profile, registration, and tax details', points: ['Company profile & logo', 'Business registration number', 'Tax ID / SST', 'Address & contact'], category: 'advanced', images: getImages('supplier_company_info', 1) },
      { code: 'supplier_payment_settings', title: 'Payment Settings', description: 'Configure bank accounts and payment methods for receivables', points: ['Multiple bank accounts', 'QR pay setup', 'Default payment terms', 'Currency configuration'], category: 'advanced', images: getImages('supplier_payment_settings', 1) },
      { code: 'supplier_invoice_settings', title: 'Invoice Settings', description: 'Customize invoice templates, numbering, and tax rules', points: ['Custom logo & header', 'Numbering prefix per template', 'Tax rate presets', 'Multi-currency support'], category: 'advanced', images: getImages('supplier_invoice_settings', 1) },
      // Order management & fulfillment
      { code: 'supplier_orders', title: 'Order Management', description: 'Full purchase-order lifecycle tracking — pending, confirmed, shipped, delivered, returned', points: ['Order list with multi-status filter', 'Lifecycle action buttons', 'Per-buyer order history', 'Bulk export'], category: 'basic', images: getImages('supplier_orders', 0) },
      { code: 'supplier_shipping', title: 'Shipping & Delivery', description: 'Carrier integration with tracking URL generation and delivery confirmation', points: ['Carrier catalog (Lalamove, Grab, J&T, Ninja Van, Pos Laju)', 'Auto tracking URL', 'Edit tracking after ship', 'Webhook-based status updates'], category: 'basic', images: getImages('supplier_shipping', 0) },
      { code: 'supplier_directory', title: 'Directory Listing', description: 'Public supplier directory entry visible to PurpleHere buyers', points: ['Public profile with logo and category', 'Featured products', 'Service area listing', 'Lead inquiry form'], category: 'basic', images: getImages('supplier_directory', 0) },
      // Advanced supplier modules
      { code: 'supplier_admin_staff', title: 'Admin & Staff Management', description: 'Manage supplier admin and staff accounts with role-based permissions', points: ['Admin / Staff role separation', 'Permission grid', 'Activity tracking', 'Account activation control'], category: 'advanced', images: getImages('supplier_admin_staff', 1) },
      { code: 'supplier_performance', title: 'Performance Analytics', description: 'Sales, fulfillment, and customer-retention metrics for the supplier', points: ['Revenue trend by month', 'Fulfillment SLA per buyer', 'Top-buying customers', 'Repeat-order rate'], category: 'advanced', images: getImages('supplier_performance', 0) },
      { code: 'supplier_activity_logs', title: 'Change History', description: 'Audit trail of supplier-side changes for accountability', points: ['Per-record change diff', 'User-level tracking', 'Date range filter', 'Compliance export'], category: 'advanced', images: getImages('supplier_activity_logs', 0) },
      { code: 'supplier_multi_warehouse', title: 'Multi-Warehouse', description: 'Allocate inventory across multiple warehouses with per-warehouse stock', points: ['Multiple warehouse profiles', 'Per-warehouse stock levels', 'Inter-warehouse transfers', 'Per-buyer fulfillment routing'], category: 'advanced', images: getImages('supplier_multi_warehouse', 0) },
      // Procurement (Supplier 가 다른 공급업체에게서 매입)
      { code: 'buyer_supplier_directory', title: 'Supplier Directory (Procurement)', description: 'Browse and search other suppliers in the PurpleHere network when sourcing materials', points: ['Cross-supplier sourcing', 'Public profile and catalog browse', 'Lead inquiry workflow', 'Saved suppliers shortlist'], category: 'advanced', images: getImages('buyer_supplier_directory', 1) },
      { code: 'buyer_supplier_contracts', title: 'Procurement Contracts', description: 'Manage incoming-supply contracts with other suppliers — exclusivity terms and pricing', points: ['Active / draft / expired contracts', 'Per-line item pricing', 'Exclusivity & renewal terms', 'Active contract gates PO submission'], category: 'advanced', images: getImages('buyer_supplier_contracts', 1) },
      { code: 'buyer_purchase_orders', title: 'Procurement Orders', description: 'Place purchase orders with other suppliers and track the full lifecycle', points: ['Multi-supplier PO creation', 'Lifecycle tracking with carrier integration', 'Partial / full delivery receipt', 'Returns and credit notes'], category: 'advanced', images: getImages('buyer_purchase_orders', 1) },
      { code: 'buyer_purchase_invoices', title: 'Procurement Invoices', description: 'Receive trade invoices from upstream suppliers — payable tracking and SOA reconciliation', points: ['Auto-issued by supplier on PO receipt', 'Outstanding payable tracking', 'Per-supplier statements of account', 'Payment recording with reference'], category: 'advanced', images: getImages('buyer_purchase_invoices', 1) },
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
    return (
      <FeatureCard key={feature.code}>
        {validImages.length > 0 ? (
          <FeatureImageSlider images={validImages} title={feature.title} onOpenLightbox={openLightbox} />
        ) : (
          <ImageSlider>
            <SliderPlaceholder>{'Screenshot coming soon'}</SliderPlaceholder>
          </ImageSlider>
        )}
        <CardBody>
          <FeatureBadge variant={feature.category}>{feature.category}</FeatureBadge>
          <FeatureTitle>{feature.title}</FeatureTitle>
          <FeatureDescription>{feature.description}</FeatureDescription>
          <FeaturePoints>
            {feature.points.map((point, idx) => (
              <FeaturePoint key={idx}>{point}</FeaturePoint>
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
          <HeroTitle>{'Powerful Features for Every Need'}</HeroTitle>
          <HeroSubtitle>
            From multi-brand management to individual restaurant operations — explore all the tools that power your business.
          </HeroSubtitle>
        </HeroSection>

        <ContentSection>
          <TabBar>
            {ROLE_TABS.map(tab => (
              <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => setActiveTab(tab.key)}>
                {tab.label}
              </TabButton>
            ))}
          </TabBar>

          <RoleHeading>{activeRole.heading}</RoleHeading>
          <RoleDescription>{activeRole.description}</RoleDescription>

          {basicFeatures.length > 0 && (
            <>
              <CategoryLabel variant="basic">Basic Features ({basicFeatures.length})</CategoryLabel>
              <FeaturesGrid>
                {basicFeatures.map(renderFeatureCard)}
              </FeaturesGrid>
            </>
          )}

          {advancedFeatures.length > 0 && (
            <>
              <CategoryLabel variant="advanced">Advanced Features ({advancedFeatures.length})</CategoryLabel>
              <FeaturesGrid>
                {advancedFeatures.map(renderFeatureCard)}
              </FeaturesGrid>
            </>
          )}

          <CTASection>
            <CTATitle>{'Ready to Transform Your Business?'}</CTATitle>
            <CTASubtitle>
              {'Try our demo accounts or contact us to get started with PurpleHere'}
            </CTASubtitle>
            <CTAButton onClick={() => navigate('/demo')}>
              {'Try Demo Now'}
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
