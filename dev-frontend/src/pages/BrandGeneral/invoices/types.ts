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
  issuerInfo?: {
    name: string;
    logoUrl?: string;
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
  payerInfo?: {
    name: string;
    logoUrl?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    email?: string;
    taxId?: string;
    businessRegistration?: string;
  };
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

export interface AdditionalChargeConfig {
  enabled: boolean;
  name: string;
  rate: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  qrImage?: string;
  qrDescription?: string;
  publishableKey?: string;
  clientId?: string;
}

export type TabType = 'to_pay' | 'paid' | 'issued' | 'categories';
