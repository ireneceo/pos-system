export interface Invoice {
  id: string;
  invoiceNumber: string;
  managerId: string;
  managerName: string;
  companyName: string;
  customerName: string;
  customerAddress: string;
  restaurantId?: string;
  restaurantName?: string;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  status: 'draft' | 'sent' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled' | '';
  currency?: string;
  amount: number;
  tax: number;
  total: number;
  items: InvoiceItem[];
  billingPeriod: string;
  planType: string;
  paymentMethod?: string;
  transactionId?: string;
  receiptUrl?: string;
  hasPaymentInfo?: boolean;
  type?: 'automatic' | 'manual';
  payerType?: 'restaurant' | 'foodcourt_manager' | 'brand_manager' | 'external';
  payerId?: string;
  invoiceCategory?: 'subscription' | 'service' | 'consulting' | 'others';
  customDescription?: string;
  serviceDescription?: string;
  categoryDisplayName?: string;
  externalPayerName?: string;
  externalPayerEmail?: string;
  externalPayerPhone?: string;
  externalPayerCompany?: string;
  externalPayerAddress?: string;
  externalPayerTaxId?: string;
  issuerType?: 'system_admin' | 'brand' | 'foodcourt';
  issuerId?: number | string;
  issuerName?: string;
  discountType?: string;
  discountValue?: number;
  discountAmount?: number;
  discountReason?: string;
  subtotalBeforeDiscount?: number;
  additionalCharges?: Array<{ name: string; rate: number; amount: number }>;
  isModified?: boolean;
  modificationHistory?: Array<{
    modified_at: string;
    modified_by: number;
    modified_by_name: string;
    changes: Record<string, { from: any; to: any }>;
    reason: string;
  }>;
  issuerInfo?: {
    name?: string;
    logoUrl?: string | null;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    email?: string;
    website?: string;
    taxId?: string;
    businessRegistration?: string;
    bankName?: string;
    bankAccount?: string;
    bankAccountName?: string;
    swiftCode?: string;
  };
}

export interface CurrencyConfig {
  [code: string]: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Manager {
  id: string;
  fullName: string;
  email: string;
  role: string;
  companyName?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  admin_id: string;
  status: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Subscription {
  id: string;
  restaurant_id: string;
  plan_type: 'basic' | 'professional' | 'enterprise';
  status: 'Active' | 'Trial' | 'Expired' | 'Suspended' | 'Cancelled';
  billing_cycle: 'monthly' | 'annual';
  menu_limit: number;
  monthly_price: number;
  annual_price: number;
  start_date: string;
  end_date?: string;
}

export interface InvoiceCategory {
  id: number;
  name: string;
  code: string;
  description: string;
  display_order: number;
  is_system: boolean;
  is_active: boolean;
}

export interface CompanySettings {
  companyName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  taxNumber: string;
  registrationNumber: string;
  companyLogo?: string; // Company logo for invoices
  bankName?: string;
  bankAccount?: string;
  bankAccountName?: string;
  swiftCode?: string;
}

export type TabType = 'to_pay' | 'paid' | 'issued';
