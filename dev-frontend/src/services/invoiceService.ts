import axios from 'axios';
import { Invoice, PaymentSubmitData, PaymentSettings, InvoiceSettings } from '../components/Invoice/types';

const API_BASE = '/api';

// Transform backend invoice to frontend format
const transformInvoice = (data: any): Invoice => ({
  id: data.id?.toString() || data.id,
  invoiceNumber: data.invoiceNumber || data.invoice_number,
  issuerType: data.issuerType || data.issuer_type || 'system_admin',
  issuerId: data.issuerId?.toString() || data.issuer_id?.toString(),
  issuerName: data.issuerName,
  payerType: data.payerType || data.payer_type,
  payerId: data.payerId?.toString() || data.payer_id?.toString(),
  payerName: data.payerName || data.customerName,
  restaurantId: data.restaurantId?.toString() || data.restaurant_id?.toString(),
  restaurantName: data.restaurantName,
  issueDate: data.issueDate || data.issued_at || data.createdAt,
  dueDate: data.dueDate || data.due_date,
  paidDate: data.paidDate || data.paid_at,
  paymentSubmittedAt: data.paymentSubmittedAt || data.payment_submitted_at,
  confirmedAt: data.confirmedAt || data.confirmed_at,
  currency: data.currency || 'MYR',
  amount: parseFloat(data.amount || 0),
  tax: parseFloat(data.tax || 0),
  total: parseFloat(data.total || data.total_amount || 0),
  status: data.status || 'pending_payment',
  type: data.type,
  category: data.invoiceCategory || data.invoice_category,
  items: data.items || [],
  paymentMethod: data.paymentMethod || data.payment_method,
  paymentProvider: data.paymentProvider || data.payment_provider,
  paymentIntentId: data.paymentIntentId || data.payment_intent_id,
  receiptUrl: data.receiptUrl || data.receipt_url,
  confirmedBy: data.confirmedBy?.toString() || data.confirmed_by?.toString(),
  rejectionReason: data.rejectionReason || data.rejection_reason,
  notes: data.notes || data.payment_notes,
  billingPeriod: data.billingPeriod,
  planType: data.planType
});

// Invoice APIs
export const invoiceService = {
  // Get all invoices (for System Admin)
  getAllInvoices: async (): Promise<Invoice[]> => {
    const response = await axios.get(`${API_BASE}/invoices`);
    return (response.data || []).map(transformInvoice);
  },

  // Get invoices for a restaurant
  getRestaurantInvoices: async (restaurantId: string): Promise<Invoice[]> => {
    const response = await axios.get(`${API_BASE}/invoices/restaurant/${restaurantId}`);
    return (response.data || []).map(transformInvoice);
  },

  // Get invoices issued by entity (for Brand/Foodcourt)
  getIssuedInvoices: async (issuerType: string, issuerId: string): Promise<Invoice[]> => {
    const response = await axios.get(`${API_BASE}/invoices/issued-by/${issuerType}/${issuerId}`);
    return (response.data || []).map(transformInvoice);
  },

  // Get invoices to pay (for payer role)
  getInvoicesToPay: async (): Promise<Invoice[]> => {
    const response = await axios.get(`${API_BASE}/invoices/to-pay`);
    return (response.data || []).map(transformInvoice);
  },

  // Get single invoice
  getInvoice: async (id: string): Promise<{ invoice: Invoice; items: any[] }> => {
    const response = await axios.get(`${API_BASE}/invoices/${id}`);
    return {
      invoice: transformInvoice(response.data.invoice),
      items: response.data.items || []
    };
  },

  // Create invoice
  createInvoice: async (invoiceData: any, items: any[]): Promise<Invoice> => {
    const response = await axios.post(`${API_BASE}/invoices`, {
      invoice_data: invoiceData,
      items
    });
    return transformInvoice(response.data.invoice);
  },

  // Update invoice status
  updateInvoiceStatus: async (id: string, status: string): Promise<void> => {
    await axios.patch(`${API_BASE}/invoices/${id}/status`, { status });
  },

  // Submit payment
  submitPayment: async (data: PaymentSubmitData): Promise<Invoice> => {
    const response = await axios.post(`${API_BASE}/invoices/${data.invoiceId}/submit-payment`, {
      payment_method: data.paymentMethod,
      payment_provider: data.paymentProvider,
      payment_intent_id: data.paymentIntentId,
      receipt_url: data.receiptUrl,
      notes: data.notes
    });
    return transformInvoice(response.data.invoice);
  },

  // Confirm payment (for issuer)
  confirmPayment: async (id: string, notes?: string): Promise<Invoice> => {
    const response = await axios.post(`${API_BASE}/invoices/${id}/confirm-payment`, { notes });
    return transformInvoice(response.data.invoice);
  },

  // Reject payment (for issuer)
  rejectPayment: async (id: string, reason: string): Promise<Invoice> => {
    const response = await axios.post(`${API_BASE}/invoices/${id}/reject-payment`, { reason });
    return transformInvoice(response.data.invoice);
  },

  // Delete invoice
  deleteInvoice: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE}/invoices/${id}`);
  },

  // Record payment (legacy)
  recordPayment: async (id: string, paymentData: any): Promise<Invoice> => {
    const response = await axios.post(`${API_BASE}/invoices/${id}/payment`, paymentData);
    return transformInvoice(response.data.invoice);
  }
};

// Brand Payment Settings APIs
export const brandService = {
  getPaymentSettings: async (brandId: string): Promise<{
    payment_settings: PaymentSettings;
    invoice_settings: InvoiceSettings;
    supported_currencies: string[];
  }> => {
    const response = await axios.get(`${API_BASE}/brands/${brandId}/payment-settings`);
    return response.data.data;
  },

  updatePaymentSettings: async (brandId: string, data: {
    payment_settings?: PaymentSettings;
    invoice_settings?: InvoiceSettings;
    supported_currencies?: string[];
  }): Promise<void> => {
    await axios.put(`${API_BASE}/brands/${brandId}/payment-settings`, data);
  },

  getSubscription: async (brandId: string): Promise<{
    subscription_status: string;
    subscription_start: string | null;
    subscription_end: string | null;
    plan_type: string | null;
  }> => {
    const response = await axios.get(`${API_BASE}/brands/${brandId}/subscription`);
    return response.data.data;
  }
};

// Foodcourt Payment Settings APIs
export const foodcourtService = {
  getPaymentSettings: async (foodcourtId: string): Promise<{
    payment_settings: PaymentSettings;
    invoice_settings: InvoiceSettings;
    supported_currencies: string[];
  }> => {
    const response = await axios.get(`${API_BASE}/foodcourts/${foodcourtId}/payment-settings`);
    return response.data.data;
  },

  updatePaymentSettings: async (foodcourtId: string, data: {
    payment_settings?: PaymentSettings;
    invoice_settings?: InvoiceSettings;
    supported_currencies?: string[];
  }): Promise<void> => {
    await axios.put(`${API_BASE}/foodcourts/${foodcourtId}/payment-settings`, data);
  },

  getSubscription: async (foodcourtId: string): Promise<{
    subscription_status: string;
    subscription_start: string | null;
    subscription_end: string | null;
    plan_type: string | null;
  }> => {
    const response = await axios.get(`${API_BASE}/foodcourts/${foodcourtId}/subscription`);
    return response.data.data;
  }
};

export default invoiceService;
