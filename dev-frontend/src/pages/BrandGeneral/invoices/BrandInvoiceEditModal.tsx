import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as CommonModal } from '../../../components/UI';
import DateField from '../../../components/Common/DateField';
import { formatCurrency } from '../../../utils/currency';
import { formatDateTime } from '../../../utils/timezone';
import { getRestaurantDisplayName } from '../../../utils/restaurantDisplay';
import { Invoice, Manager, Restaurant, InvoiceCategory, AdditionalChargeConfig } from './types';
import {
  Button,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  InvoiceSummary,
  SummaryRow,
} from './styles';

interface BrandInvoiceEditModalProps {
  selectedInvoice: Invoice;
  editInvoice: any;
  setEditInvoice: (invoice: any) => void;
  editModificationReason: string;
  setEditModificationReason: (reason: string) => void;
  editSearchQuery: string;
  editSearchResults: { managers: Manager[]; restaurants: Restaurant[] };
  showEditSearchDropdown: boolean;
  setShowEditSearchDropdown: (show: boolean) => void;
  editSelectedTarget: { type: 'manager' | 'restaurant'; data: Manager | Restaurant } | null;
  setEditSelectedTarget: (target: { type: 'manager' | 'restaurant'; data: Manager | Restaurant } | null) => void;
  setEditSearchQuery: (query: string) => void;
  handleEditSearch: (query: string) => void;
  handleEditTargetSelect: (type: 'manager' | 'restaurant', data: Manager | Restaurant) => void;
  managers: Manager[];
  invoiceCategories: InvoiceCategory[];
  getChargesForCurrency: (currency: string) => AdditionalChargeConfig[];
  operationSettings: any;
  onClose: () => void;
  onSave: () => void;
}

const BrandInvoiceEditModal: React.FC<BrandInvoiceEditModalProps> = ({
  selectedInvoice,
  editInvoice,
  setEditInvoice,
  editModificationReason,
  setEditModificationReason,
  editSearchQuery,
  editSearchResults,
  showEditSearchDropdown,
  setShowEditSearchDropdown,
  editSelectedTarget,
  setEditSelectedTarget,
  setEditSearchQuery,
  handleEditSearch,
  handleEditTargetSelect,
  managers,
  invoiceCategories,
  getChargesForCurrency,
  operationSettings,
  onClose,
  onSave,
}) => {
  const { t } = useTranslation('brand');

  return (
    <CommonModal isOpen={true} onClose={onClose} title={`Edit Invoice - ${selectedInvoice.invoiceNumber}`} footer={<><Button variant="secondary" onClick={onClose}> Cancel </Button><Button variant="primary" onClick={onSave}> Save Changes </Button></>}>

      <FormGroup>
        <FormLabel>Search Restaurant *</FormLabel>
        <div style={{position: 'relative'}}>
          <FormInput
            type="text"
            value={editSearchQuery}
            onChange={(e) => handleEditSearch(e.target.value)}
            onFocus={() => setShowEditSearchDropdown(true)}
            onBlur={() => setTimeout(() => setShowEditSearchDropdown(false), 200)}
            placeholder="Type to search for restaurants"
            required
          />
          {showEditSearchDropdown && (editSearchResults.managers.length > 0 || editSearchResults.restaurants.length > 0) && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              border: '1px solid #E6EBF1',
              borderRadius: '8px',
              maxHeight: '300px',
              overflowY: 'auto',
              zIndex: 1000,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}>
              {editSearchResults.managers.length > 0 && (
                <div>
                  <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                    MANAGERS
                  </div>
                  {editSearchResults.managers.map(manager => (
                    <div
                      key={manager.id}
                      onClick={() => handleEditTargetSelect('manager', manager)}
                      style={{
                        padding: '12px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #F3F4F6',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <div style={{fontWeight: '500', color: '#0A2540'}}>{manager.fullName}</div>
                      <div style={{fontSize: '13px', color: '#6B7280'}}>{manager.companyName || manager.email}</div>
                    </div>
                  ))}
                </div>
              )}
              {editSearchResults.restaurants.length > 0 && (
                <div>
                  <div style={{padding: '8px 12px', background: '#F8FAFC', fontSize: '12px', fontWeight: '600', color: '#6B7280'}}>
                    RESTAURANTS
                  </div>
                  {editSearchResults.restaurants.map(restaurant => {
                    const manager = managers.find(m => m.id === restaurant.admin_id);
                    return (
                      <div
                        key={restaurant.id}
                        onClick={() => handleEditTargetSelect('restaurant', restaurant)}
                        style={{
                          padding: '12px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #F3F4F6',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                      >
                        <div style={{fontWeight: '500', color: '#0A2540'}}>{getRestaurantDisplayName(restaurant)}</div>
                        <div style={{fontSize: '13px', color: '#6B7280'}}>
                          {manager ? `Manager: ${manager.fullName}` : 'No manager assigned'} • {restaurant.address || 'No address'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
        {editSelectedTarget && (
          <div style={{
            marginTop: '8px',
            padding: '12px',
            background: '#F0F7FF',
            border: '1px solid #B3D9FF',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{fontWeight: '500', color: '#0A2540'}}>
                {editSelectedTarget.type === 'manager'
                  ? (editSelectedTarget.data as Manager).fullName
                  : (editSelectedTarget.data as Restaurant).name}
              </div>
              <div style={{fontSize: '13px', color: '#6B7280'}}>
                {editSelectedTarget.type === 'manager'
                  ? `${(editSelectedTarget.data as Manager).companyName} • Manager`
                  : `${(editSelectedTarget.data as Restaurant).address || 'No address'} • Restaurant`}
              </div>
            </div>
            <button
              onClick={() => {
                setEditSelectedTarget(null);
                setEditSearchQuery('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px'
              }}
            >
              ×
            </button>
          </div>
        )}
      </FormGroup>

      <FormRow>
        <FormGroup>
          <FormLabel>{t('brand:brandInvoicesPage.amountRm')}</FormLabel>
          <FormInput
            type="number"
            value={editInvoice.amount}
            onChange={(e) => {
              const amount = parseFloat(e.target.value) || 0;
              const editCharges = getChargesForCurrency(editInvoice.currency || '');
              const totalChargeRate = editCharges
                .filter(c => c.enabled && c.rate > 0)
                .reduce((sum, c) => sum + c.rate, 0);
              const tax = amount * (totalChargeRate / 100);
              const total = amount + tax;
              setEditInvoice({
                ...editInvoice,
                amount: e.target.value,
                tax: tax.toFixed(2),
                total: total.toFixed(2)
              });
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('brand:brandInvoicesPage.dueDate')}</FormLabel>
          <DateField
            value={editInvoice.dueDate}
            onChange={(v) => setEditInvoice({...editInvoice, dueDate: v})}
          />
        </FormGroup>
      </FormRow>

      <FormGroup>
        <FormLabel>{t('brand:brandInvoicesPage.status')}</FormLabel>
        <FormSelect
          value={editInvoice.status}
          onChange={(e) => setEditInvoice({...editInvoice, status: e.target.value})}
        >
          <option value="draft">{t('brand:brandInvoicesPage.draft')}</option>
          <option value="pending_payment">{t('brand:brandInvoicesPage.pendingPayment')}</option>
          <option value="payment_submitted">{t('brand:brandInvoicesPage.paymentSubmitted')}</option>
          <option value="paid">{t('brand:brandInvoicesPage.paid')}</option>
          <option value="overdue">{t('brand:brandInvoicesPage.overdue')}</option>
          <option value="cancelled">{t('brand:brandInvoicesPage.cancelled')}</option>
        </FormSelect>
      </FormGroup>
      <FormGroup>
        <FormLabel>{t('brand:brandInvoicesPage.invoiceCategory')}</FormLabel>
        <FormSelect
          value={editInvoice.invoiceCategory || 'service'}
          onChange={(e) => setEditInvoice({...editInvoice, invoiceCategory: e.target.value})}
        >
          {invoiceCategories.length > 0 ? (
            invoiceCategories
              .filter(cat => cat.code !== 'subscription')
              .map(cat => (
                <option key={cat.id} value={cat.code}>{cat.name}</option>
              ))
          ) : (
            <>
              <option value="service">{t('brand:brandInvoicesPage.service')}</option>
              <option value="consulting">{t('brand:brandInvoicesPage.consulting')}</option>
              <option value="others">{t('brand:brandInvoicesPage.others')}</option>
            </>
          )}
        </FormSelect>
      </FormGroup>

      {editInvoice.invoiceCategory === 'others' && (
        <FormGroup>
          <FormLabel>{t('brand:brandInvoicesPage.planitem')}</FormLabel>
          <FormTextarea
            value={editInvoice.customDescription || ''}
            onChange={(e) => setEditInvoice({...editInvoice, customDescription: e.target.value})}
            rows={3}
          />
        </FormGroup>
      )}

      {((editInvoice.invoiceCategory || 'service') === 'service' || editInvoice.invoiceCategory === 'consulting') && (
        <FormGroup>
          <FormLabel>{t('brand:brandInvoicesPage.planitem')}</FormLabel>
          <FormTextarea
            value={editInvoice.serviceDescription || ''}
            onChange={(e) => setEditInvoice({...editInvoice, serviceDescription: e.target.value})}
            rows={3}
          />
        </FormGroup>
      )}

      <InvoiceSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>{formatCurrency(parseFloat(editInvoice.amount || '0'), editInvoice.currency || 'MYR')}</span>
        </SummaryRow>
        {getChargesForCurrency(editInvoice.currency || '').filter(c => c.enabled && c.rate > 0).map((charge, idx) => {
          const chargeAmount = parseFloat(editInvoice.amount || '0') * (charge.rate / 100);
          return (
            <SummaryRow key={idx}>
              <span>{charge.name} ({charge.rate}%):</span>
              <span>{formatCurrency(chargeAmount, editInvoice.currency || 'MYR')}</span>
            </SummaryRow>
          );
        })}
        <SummaryRow highlight>
          <span>Total:</span>
          <span><strong>{formatCurrency(parseFloat(editInvoice.total || '0'), editInvoice.currency || 'MYR')}</strong></span>
        </SummaryRow>
      </InvoiceSummary>

      {/* Modification Reason */}
      <FormGroup style={{ marginTop: '16px' }}>
        <FormLabel>Modification Reason {selectedInvoice?.type === 'automatic' && <span style={{ color: '#EF4444' }}>*</span>}</FormLabel>
        <FormTextarea
          value={editModificationReason}
          onChange={(e) => setEditModificationReason(e.target.value)}
          placeholder="Enter reason for modification..."
          rows={2}
        />
      </FormGroup>

      {Array.isArray(selectedInvoice?.modificationHistory) && selectedInvoice.modificationHistory.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#92400E', marginBottom: '8px' }}>{t('brand:brandInvoicesPage.modificationHistory')}</div>
          {(selectedInvoice.modificationHistory as any[]).map((mod: any, idx: number) => {
            const ts = mod.modified_at || mod.timestamp;
            const who = mod.modified_by_name || (mod.reason === 'payment_settings_updated' ? 'System (payment settings)' : mod.reason === 'subscription_updated' ? 'System (subscription)' : 'System');
            const isLast = idx >= (selectedInvoice.modificationHistory as any[]).length - 1;
            return (
            <div key={idx} style={{ fontSize: '12px', color: '#78350F', marginBottom: isLast ? '0' : '8px', paddingBottom: isLast ? '0' : '8px', borderBottom: isLast ? 'none' : '1px solid #FDE68A' }}>
              <div style={{ fontWeight: 500 }}>{ts ? formatDateTime(ts, operationSettings) : ''}{who ? ` - ${who}` : ''}</div>
              {mod.reason && <div style={{ marginTop: '2px' }}>Reason: {mod.reason}</div>}
              {mod.changes && typeof mod.changes === 'object' && Object.keys(mod.changes).length > 0 && (
                <div style={{ marginTop: '2px', color: '#92400E' }}>
                  {Object.entries(mod.changes).map(([field, change]: [string, any]) => (
                    <span key={field} style={{ marginRight: '8px' }}>{field}: {String(change?.from)} → {String(change?.to)}</span>
                  ))}
                </div>
              )}
              {!mod.changes && (mod.before || mod.after) && (
                <div style={{ marginTop: '2px', color: '#92400E' }}>
                  {mod.before?.total_amount !== undefined && mod.after?.total_amount !== undefined && (
                    <span style={{ marginRight: '8px' }}>total: {String(mod.before.total_amount)} → {String(mod.after.total_amount)}</span>
                  )}
                </div>
              )}
            </div>
            );
          })}
        </div>
      )}

    </CommonModal>
  );
};

export default BrandInvoiceEditModal;
