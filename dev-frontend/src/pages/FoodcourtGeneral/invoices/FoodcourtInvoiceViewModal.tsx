import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as CommonModal } from '../../../components/UI';
import { formatCurrency } from '../../../utils/currency';
import { formatDateTime } from '../../../utils/timezone';
import { getRestaurantDisplayName } from '../../../utils/restaurantDisplay';
import { Invoice, Manager, Restaurant, CompanySettings } from './types';
import {
  Button,
  StatusBadge,
  InvoiceSummary,
  SummaryRow,
  FormGroup,
  FormLabel,
  FormInput,
} from './styles';

interface FoodcourtInvoiceViewModalProps {
  invoice: Invoice;
  companySettings: CompanySettings | null;
  operationSettings: any;
  onClose: () => void;
  // Link account
  showLinkAccountModal: boolean;
  setShowLinkAccountModal: (v: boolean) => void;
  linkSearchQuery: string;
  setLinkSearchQuery: (v: string) => void;
  linkSearchResults: { managers: Manager[]; restaurants: Restaurant[] };
  setLinkSearchResults: (v: { managers: Manager[]; restaurants: Restaurant[] }) => void;
  showLinkSearchDropdown: boolean;
  setShowLinkSearchDropdown: (v: boolean) => void;
  handleLinkSearch: (query: string) => void;
  handleLinkAccount: (targetType: 'restaurant' | 'manager', targetData: Restaurant | Manager) => void;
}

const FoodcourtInvoiceViewModal: React.FC<FoodcourtInvoiceViewModalProps> = ({
  invoice,
  companySettings,
  operationSettings,
  onClose,
  showLinkAccountModal,
  setShowLinkAccountModal,
  linkSearchQuery,
  setLinkSearchQuery,
  linkSearchResults,
  setLinkSearchResults,
  showLinkSearchDropdown,
  setShowLinkSearchDropdown,
  handleLinkSearch,
  handleLinkAccount,
}) => {
  const { t } = useTranslation('foodcourt');

  const formatDate = (dateString: string) => {
    return formatDateTime(dateString, operationSettings, { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'draft': return 'Draft';
      case 'pending_payment': return 'Pending';
      case 'payment_submitted': return 'Payment Submitted';
      case 'paid': return 'Paid';
      case 'overdue': return 'Overdue';
      case 'cancelled': return 'Cancelled';
      case '': case null: case undefined: return 'Pending';
      default: return status;
    }
  };

  return (
    <>
      <CommonModal isOpen={true} onClose={onClose} title="Invoice Details" size="large" footer={<><Button variant="secondary" onClick={onClose}>{t('foodcourt:foodcourtInvoicesPage.close')}</Button></>}>

        {/* Invoice Header with Company Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '24px', borderBottom: '2px solid #E5E7EB' }}>
          <div style={{ flex: '0 0 55%' }}>
            {companySettings?.companyLogo && (
              <img src={companySettings.companyLogo} alt="Company Logo" style={{ maxHeight: '60px', marginBottom: '8px' }} />
            )}
            <div style={{ fontSize: companySettings?.companyLogo ? '16px' : '20px', fontWeight: '700', color: '#0A2540', marginBottom: '8px' }}>
              {companySettings?.companyName || 'Company Name'}
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.6' }}>
              {companySettings?.address && <div>{companySettings.address}</div>}
              {(companySettings?.city || companySettings?.state || companySettings?.postalCode) && (
                <div>{[companySettings?.city, companySettings?.state, companySettings?.postalCode].filter(Boolean).join(', ')}</div>
              )}
              {companySettings?.country && <div>{companySettings.country}</div>}
              {companySettings?.phone && <div>Tel: {companySettings.phone}</div>}
              {companySettings?.email && <div>Email: {companySettings.email}</div>}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#635BFF', marginBottom: '8px' }}>{t('foodcourt:foodcourtInvoicesPage.invoice')}</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#0A2540' }}>{invoice.invoiceNumber}</div>
            <StatusBadge status={invoice.status} style={{ marginTop: '8px' }}>
              {getStatusDisplay(invoice.status)}
            </StatusBadge>
            {invoice.isModified && (
              <span style={{ display: 'inline-block', marginTop: '4px', padding: '2px 8px', fontSize: '11px', fontWeight: 600, color: '#B45309', background: '#FEF3C7', borderRadius: '4px' }}>{t('foodcourt:foodcourtInvoicesPage.modified')}</span>
            )}
          </div>
        </div>

        {/* Bill To + Dates Section (Side by Side) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          {/* Bill To */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>{t('foodcourt:foodcourtInvoicesPage.billTo')}</div>
            {invoice.payerType === 'external' ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{invoice.externalPayerName || invoice.customerName}</div>
                  <span style={{ padding: '2px 8px', fontSize: '11px', fontWeight: 600, color: '#7C3AED', background: '#EDE9FE', borderRadius: '4px' }}>{t('foodcourt:foodcourtInvoicesPage.nonmember')}</span>
                </div>
                {invoice.externalPayerCompany && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Company: {invoice.externalPayerCompany}</div>
                )}
                {invoice.externalPayerEmail && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Email: {invoice.externalPayerEmail}</div>
                )}
                {invoice.externalPayerPhone && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Phone: {invoice.externalPayerPhone}</div>
                )}
                {invoice.externalPayerAddress && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{invoice.externalPayerAddress}</div>
                )}
                {invoice.externalPayerTaxId && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Tax ID: {invoice.externalPayerTaxId}</div>
                )}
                <button
                  onClick={() => { setShowLinkAccountModal(true); setLinkSearchQuery(''); setLinkSearchResults({managers: [], restaurants: []}); }}
                  style={{ marginTop: '10px', padding: '6px 14px', fontSize: '12px', fontWeight: 600, color: '#635BFF', background: '#F0F0FF', border: '1px solid #635BFF', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Link to Member Account
                </button>
              </>
            ) : (
              <>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#0A2540' }}>{invoice.customerName}</div>
                {invoice.customerAddress && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{invoice.customerAddress}</div>
                )}
                {invoice.restaurantName && (
                  <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>Restaurant: {invoice.restaurantName}</div>
                )}
              </>
            )}
          </div>
          {/* Dates */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: '#6B7280' }}>Billing Period:</span>
              <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{invoice.billingPeriod || '-'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: '#6B7280' }}>Issue Date:</span>
              <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(invoice.issueDate)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ color: '#6B7280' }}>Due Date:</span>
              <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(invoice.dueDate)}</span>
            </div>
            {invoice.paidDate && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' }}>
                <span style={{ color: '#6B7280' }}>Paid Date:</span>
                <span style={{ color: '#0A2540', fontWeight: '500', minWidth: '140px' }}>{formatDate(invoice.paidDate)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '12px', textTransform: 'uppercase' }}>{t('foodcourt:foodcourtInvoicesPage.items')}</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>{t('foodcourt:foodcourtInvoicesPage.description')}</th>
                <th style={{ textAlign: 'center', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>{t('foodcourt:foodcourtInvoicesPage.qty')}</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>{t('foodcourt:foodcourtInvoicesPage.unitPrice')}</th>
                <th style={{ textAlign: 'right', padding: '12px 8px', fontSize: '12px', fontWeight: '600', color: '#6B7280' }}>{t('foodcourt:foodcourtInvoicesPage.amount')}</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151' }}>{item.description}</td>
                  <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(item.unitPrice, invoice.currency || 'MYR')}</td>
                  <td style={{ padding: '12px 8px', fontSize: '14px', color: '#374151', textAlign: 'right', whiteSpace: 'nowrap' }}>{formatCurrency(item.total, invoice.currency || 'MYR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ width: '280px' }}>
            <InvoiceSummary>
              <SummaryRow>
                <span>Subtotal:</span>
                <span>{formatCurrency(invoice.subtotalBeforeDiscount || invoice.amount, invoice.currency || 'MYR')}</span>
              </SummaryRow>
              {invoice.discountType && invoice.discountType !== 'none' && (invoice.discountAmount ?? 0) > 0 && (
                <SummaryRow>
                  <span style={{color: '#15803D'}}>Discount{invoice.discountType === 'percentage' ? ` (${invoice.discountValue}%)` : ''}:</span>
                  <span style={{color: '#15803D'}}>-{formatCurrency(invoice.discountAmount!, invoice.currency || 'MYR')}</span>
                </SummaryRow>
              )}
              {(invoice.additionalCharges || []).map((charge: any, idx: number) => (
                <SummaryRow key={idx}>
                  <span>{charge.name} ({charge.rate}%):</span>
                  <span>{formatCurrency(charge.amount, invoice.currency || 'MYR')}</span>
                </SummaryRow>
              ))}
              {(invoice.additionalCharges || []).length === 0 && invoice.tax > 0 && (
                <SummaryRow>
                  <span>Tax:</span>
                  <span>{formatCurrency(invoice.tax, invoice.currency || 'MYR')}</span>
                </SummaryRow>
              )}
              <SummaryRow highlight>
                <span>Total:</span>
                <span><strong>{formatCurrency(invoice.total, invoice.currency || 'MYR')}</strong></span>
              </SummaryRow>
            </InvoiceSummary>
          </div>
        </div>

        {/* Bank Details (prefer issuerInfo from payment settings) */}
        {(() => {
          const bankName = invoice.issuerInfo?.bankName || companySettings?.bankName;
          const bankAccount = invoice.issuerInfo?.bankAccount || companySettings?.bankAccount;
          const bankAccountName = invoice.issuerInfo?.bankAccountName || companySettings?.bankAccountName;
          const swiftCode = invoice.issuerInfo?.swiftCode || companySettings?.swiftCode;
          if (!bankName) return null;
          return (
            <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', marginBottom: '8px', textTransform: 'uppercase' }}>{t('foodcourt:foodcourtInvoicesPage.paymentDetails')}</div>
              <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                <div><strong>Bank:</strong> {bankName}</div>
                <div><strong>Account Name:</strong> {bankAccountName || '-'}</div>
                <div><strong>Account Number:</strong> {bankAccount || '-'}</div>
                {swiftCode && <div><strong>SWIFT Code:</strong> {swiftCode}</div>}
              </div>
            </div>
          );
        })()}

        {/* Registration Info */}
        {(companySettings?.taxNumber || companySettings?.registrationNumber) && (
          <div style={{ fontSize: '12px', color: '#9CA3AF', textAlign: 'center', marginTop: '16px' }}>
            {companySettings?.registrationNumber && <span>Reg No: {companySettings.registrationNumber}</span>}
            {companySettings?.registrationNumber && companySettings?.taxNumber && <span> | </span>}
            {companySettings?.taxNumber && <span>Tax No: {companySettings.taxNumber}</span>}
          </div>
        )}

        {/* Modification History in View Modal */}
        {invoice.isModified && Array.isArray(invoice.modificationHistory) && invoice.modificationHistory.length > 0 && (
          <div style={{ marginTop: '20px', padding: '16px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: '#92400E', marginBottom: '12px' }}>{t('foodcourt:foodcourtInvoicesPage.modificationHistory')}</div>
            {(invoice.modificationHistory as any[]).map((mod: any, idx: number) => {
              const ts = mod.modified_at || mod.timestamp;
              const who = mod.modified_by_name || (mod.reason === 'payment_settings_updated' ? 'System (payment settings)' : mod.reason === 'subscription_updated' ? 'System (subscription)' : 'System');
              const isLast = idx >= (invoice.modificationHistory as any[]).length - 1;
              return (
                <div key={idx} style={{ fontSize: '12px', color: '#78350F', marginBottom: isLast ? '0' : '10px', paddingBottom: isLast ? '0' : '10px', borderBottom: isLast ? 'none' : '1px solid #FDE68A' }}>
                  <div style={{ fontWeight: 500 }}>{ts ? formatDateTime(ts, operationSettings) : ''}{who ? ` - ${who}` : ''}</div>
                  {mod.reason && <div style={{ marginTop: '3px' }}>Reason: {mod.reason}</div>}
                  {mod.changes && typeof mod.changes === 'object' && Object.keys(mod.changes).length > 0 && (
                    <div style={{ marginTop: '3px', color: '#92400E' }}>
                      {Object.entries(mod.changes).map(([field, change]: [string, any]) => (
                        <div key={field}>{field}: {String(change?.from)} → {String(change?.to)}</div>
                      ))}
                    </div>
                  )}
                  {!mod.changes && (mod.before || mod.after) && (
                    <div style={{ marginTop: '3px', color: '#92400E' }}>
                      {mod.before?.total_amount !== undefined && mod.after?.total_amount !== undefined && (
                        <div>total: {String(mod.before.total_amount)} → {String(mod.after.total_amount)}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </CommonModal>

      {/* Link Account Modal */}
      {showLinkAccountModal && (
        <CommonModal isOpen={true} onClose={() => setShowLinkAccountModal(false)} title="Link to Member Account" footer={<Button variant="secondary" onClick={() => setShowLinkAccountModal(false)}>{t('foodcourt:foodcourtInvoicesPage.cancel')}</Button>}>
          <FormGroup>
            <FormLabel>Search Restaurant *</FormLabel>
            <div style={{position: 'relative'}}>
              <FormInput
                type="text"
                value={linkSearchQuery}
                onChange={(e) => handleLinkSearch(e.target.value)}
                onFocus={() => setShowLinkSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowLinkSearchDropdown(false), 200)}
                placeholder="Type to search for restaurants"
              />
              {showLinkSearchDropdown && linkSearchResults.restaurants.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid #E6EBF1', borderRadius: '8px', maxHeight: '300px', overflowY: 'auto', zIndex: 1000, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <div>
                    <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>{t('foodcourt:foodcourtInvoicesPage.restaurants')}</div>
                    {linkSearchResults.restaurants.map(restaurant => (
                      <div key={restaurant.id} onClick={() => handleLinkAccount('restaurant', restaurant)} style={{ padding: '12px', cursor: 'pointer', borderBottom: '1px solid #F3F4F6' }} onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                        <div style={{fontWeight: '500', color: '#0A2540'}}>{getRestaurantDisplayName(restaurant)}</div>
                        <div style={{fontSize: '13px', color: '#6B7280'}}>{restaurant.address || 'No address'}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: '12px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', fontSize: '13px', color: '#92400E' }}>
              This will convert the non-member invoice to a member invoice and link it to the selected restaurant.
            </div>
          </FormGroup>
        </CommonModal>
      )}
    </>
  );
};

export default FoodcourtInvoiceViewModal;
