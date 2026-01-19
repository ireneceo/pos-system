// Invoice Types for Unified Billing System

export type InvoiceStatus = 'draft' | 'pending_payment' | 'payment_submitted' | 'paid' | 'overdue' | 'cancelled';
export type IssuerType = 'system_admin' | 'brand' | 'foodcourt';
export type PayerType = 'restaurant' | 'brand' | 'foodcourt';
export type PaymentProvider = 'stripe' | 'paypal' | 'bank_transfer' | 'qr_payment';
export type InvoiceCategory = 'subscription' | 'service' | 'rent' | 'consulting' | 'others';

export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
  taxAmount?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  // Issuer info
  issuerType: IssuerType;
  issuerId?: string;
  issuerName?: string;
  // Payer info
  payerType?: PayerType;
  payerId?: string;
  payerName?: string;
  // Restaurant info (legacy support)
  restaurantId?: string;
  restaurantName?: string;
  // Dates
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  paymentSubmittedAt?: string;
  confirmedAt?: string;
  // Amounts
  currency: string;
  amount: number;
  tax: number;
  total: number;
  // Status
  status: InvoiceStatus;
  type?: 'automatic' | 'manual';
  category?: InvoiceCategory;
  // Items
  items: InvoiceItem[];
  // Payment info
  paymentMethod?: string;
  paymentProvider?: PaymentProvider;
  paymentIntentId?: string;
  receiptUrl?: string;
  // Confirmation
  confirmedBy?: string;
  rejectionReason?: string;
  // Additional
  notes?: string;
  billingPeriod?: string;
  planType?: string;
}

export interface InvoiceListProps {
  mode: 'issuer' | 'payer' | 'both';
  invoices: Invoice[];
  loading?: boolean;
  onViewDetails?: (invoice: Invoice) => void;
  onSendInvoice?: (invoice: Invoice) => void;
  onConfirmPayment?: (invoice: Invoice) => void;
  onRejectPayment?: (invoice: Invoice, reason: string) => void;
  onSubmitPayment?: (invoice: Invoice) => void;
  onDeleteInvoice?: (invoice: Invoice) => void;
  onCancelInvoice?: (invoice: Invoice) => void;
}

export interface InvoicePaymentModalProps {
  isOpen: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onSubmit: (paymentData: PaymentSubmitData) => Promise<void>;
  paymentSettings?: PaymentSettings;
}

export interface PaymentSubmitData {
  invoiceId: string;
  paymentMethod: string;
  paymentProvider?: PaymentProvider;
  paymentIntentId?: string;
  receiptUrl?: string;
  notes?: string;
}

export interface PaymentConfirmModalProps {
  isOpen: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onConfirm: (notes?: string) => Promise<void>;
  onReject: (reason: string) => Promise<void>;
}

export interface PaymentSettings {
  currencies: string[];
  defaultCurrency: string;
  stripe?: {
    enabled: boolean;
    publicKey?: string;
  };
  paypal?: {
    enabled: boolean;
    clientId?: string;
  };
  bankTransfer?: {
    enabled?: boolean;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    swiftCode?: string;
  };
  qrPayment?: {
    enabled?: boolean;
    qrCodeUrl?: string;
  };
}

export interface InvoiceSettings {
  invoicePrefix: string;
  paymentTerms: number;
  taxRate: number;
  autoGenerate: boolean;
  autoSendEmail: boolean;
}

// Status badge configuration
export const STATUS_CONFIG: Record<InvoiceStatus, { label: string; color: string; bgColor: string }> = {
  draft: { label: 'Draft', color: '#6B7280', bgColor: '#F3F4F6' },
  pending_payment: { label: 'Pending', color: '#D97706', bgColor: '#FEF3C7' },
  payment_submitted: { label: 'Submitted', color: '#2563EB', bgColor: '#DBEAFE' },
  paid: { label: 'Paid', color: '#059669', bgColor: '#D1FAE5' },
  overdue: { label: 'Overdue', color: '#DC2626', bgColor: '#FEE2E2' },
  cancelled: { label: 'Cancelled', color: '#4B5563', bgColor: '#E5E7EB' }
};

// Currency configuration
export const CURRENCY_CONFIG: Record<string, { symbol: string; name: string; decimals: number }> = {
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', decimals: 2 },
  USD: { symbol: '$', name: 'US Dollar', decimals: 2 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', decimals: 2 },
  JPY: { symbol: '¥', name: 'Japanese Yen', decimals: 0 },
  THB: { symbol: '฿', name: 'Thai Baht', decimals: 2 },
  KRW: { symbol: '₩', name: 'Korean Won', decimals: 0 }
};
