import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../utils/currency';
import { formatDateTime } from '../../../utils/timezone';
import { getRestaurantDisplayName } from '../../../utils/restaurantDisplay';
import { Modal as CommonModal } from '../../../components/UI';
import DateField from '../../../components/Common/DateField';
import { Invoice, Manager, Restaurant, InvoiceCategory } from './types';
import {
  Button,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormRow,
  InvoiceSummary,
  SummaryRow,
} from './styles';

interface InvoiceEditModalProps {
  show: boolean;
  selectedInvoice: Invoice | null;
  editInvoice: any;
  setEditInvoice: (invoice: any) => void;
  editModificationReason: string;
  setEditModificationReason: (reason: string) => void;
  editSaveError: string | null;
  onSave: () => void;
  onClose: () => void;
  // Search
  editSearchQuery: string;
  onEditSearch: (query: string) => void;
  showEditSearchDropdown: boolean;
  onShowEditSearchDropdown: (show: boolean) => void;
  editSearchResults: { managers: Manager[]; restaurants: Restaurant[] };
  editSelectedTarget: { type: 'manager' | 'restaurant'; data: Manager | Restaurant } | null;
  onEditTargetSelect: (type: 'manager' | 'restaurant', data: Manager | Restaurant) => void;
  onClearEditTarget: () => void;
  // Data
  managers: Manager[];
  invoiceCategories: InvoiceCategory[];
  operationSettings: any;
  getChargesForCurrency: (currency: string) => Array<{ enabled: boolean; name: string; rate: number }>;
}

const InvoiceEditModal: React.FC<InvoiceEditModalProps> = ({
  show,
  selectedInvoice,
  editInvoice,
  setEditInvoice,
  editModificationReason,
  setEditModificationReason,
  editSaveError,
  onSave,
  onClose,
  editSearchQuery,
  onEditSearch,
  showEditSearchDropdown,
  onShowEditSearchDropdown,
  editSearchResults,
  editSelectedTarget,
  onEditTargetSelect,
  onClearEditTarget,
  managers,
  invoiceCategories,
  operationSettings,
  getChargesForCurrency,
}) => {
  const { t } = useTranslation('admin');

  if (!show || !selectedInvoice || !editInvoice) return null;

  return (
    <CommonModal isOpen={true} onClose={onClose} title={`Edit Invoice - ${selectedInvoice.invoiceNumber}`} footer={<>{editSaveError && ( <div style={{ width: '100%', padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', color: '#DC2626', fontSize: '13px' }}> {editSaveError} </div> )} <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}><Button variant="secondary" onClick={onClose}> Cancel </Button><Button variant="primary" onClick={onSave}> Save Changes </Button></div></>}>

      <FormGroup>
        <FormLabel>Search Manager or Restaurant *</FormLabel>
        <div style={{position: 'relative'}}>
          <FormInput
            type="text"
            value={editSearchQuery}
            onChange={(e) => onEditSearch(e.target.value)}
            onFocus={() => onShowEditSearchDropdown(true)}
            onBlur={() => setTimeout(() => onShowEditSearchDropdown(false), 200)}
            placeholder="Type to search for managers or restaurants"
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
                      onClick={() => onEditTargetSelect('manager', manager)}
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
                        onClick={() => onEditTargetSelect('restaurant', restaurant)}
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
              onClick={onClearEditTarget}
              style={{
                background: 'none',
                border: 'none',
                color: '#6B7280',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px'
              }}
            >
              x
            </button>
          </div>
        )}
      </FormGroup>

      <FormRow>
        <FormGroup>
          <FormLabel>Amount ({editInvoice.currency || operationSettings.currency || 'MYR'})</FormLabel>
          <FormInput
            type="number"
            value={editInvoice.amount}
            onChange={(e) => {
              const amount = parseFloat(e.target.value) || 0;
              const discountVal = parseFloat(editInvoice.discountValue) || 0;
              const discountAmt = editInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : editInvoice.discountType === 'fixed' ? discountVal : 0;
              const afterDiscount = Math.max(0, amount - discountAmt);
              const editCharges = getChargesForCurrency(editInvoice.currency || '');
              const chargesTotal = editCharges
                .filter((c: any) => c.enabled && c.rate > 0)
                .reduce((sum: number, c: any) => sum + (afterDiscount * c.rate / 100), 0);
              const total = afterDiscount + chargesTotal;
              setEditInvoice({
                ...editInvoice,
                amount: e.target.value,
                tax: chargesTotal.toFixed(2),
                total: total.toFixed(2)
              });
            }}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('admin:invoicesPage.dueDate')}</FormLabel>
          <DateField
            value={editInvoice.dueDate}
            onChange={(v) => setEditInvoice({...editInvoice, dueDate: v})}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel>{t('admin:invoicesPage.discount')}</FormLabel>
          <FormSelect
            value={editInvoice.discountType}
            onChange={(e) => {
              const dtype = e.target.value as 'none' | 'percentage' | 'fixed';
              const amount = parseFloat(editInvoice.amount) || 0;
              const discountVal = dtype === 'none' ? 0 : (parseFloat(editInvoice.discountValue) || 0);
              const discountAmt = dtype === 'percentage' ? amount * (discountVal / 100) : dtype === 'fixed' ? discountVal : 0;
              const afterDiscount = Math.max(0, amount - discountAmt);
              const editCharges = getChargesForCurrency(editInvoice.currency || '');
              const chargesTotal = editCharges.filter((c: any) => c.enabled && c.rate > 0).reduce((sum: number, c: any) => sum + (afterDiscount * c.rate / 100), 0);
              const total = afterDiscount + chargesTotal;
              setEditInvoice({ ...editInvoice, discountType: dtype, discountValue: dtype === 'none' ? '' : editInvoice.discountValue, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
            }}
          >
            <option value="none">{t('admin:invoicesPage.noDiscount')}</option>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">{t('admin:invoicesPage.fixedAmount')}</option>
          </FormSelect>
        </FormGroup>
        {editInvoice.discountType !== 'none' && (
          <FormGroup>
            <FormLabel>{editInvoice.discountType === 'percentage' ? 'Discount (%)' : 'Discount Amount'}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              max={editInvoice.discountType === 'percentage' ? '100' : undefined}
              value={editInvoice.discountValue}
              onChange={(e) => {
                const amount = parseFloat(editInvoice.amount) || 0;
                const discountVal = parseFloat(e.target.value) || 0;
                const discountAmt = editInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : discountVal;
                const afterDiscount = Math.max(0, amount - discountAmt);
                const editCharges = getChargesForCurrency(editInvoice.currency || '');
                const chargesTotal = editCharges.filter((c: any) => c.enabled && c.rate > 0).reduce((sum: number, c: any) => sum + (afterDiscount * c.rate / 100), 0);
                const total = afterDiscount + chargesTotal;
                setEditInvoice({ ...editInvoice, discountValue: e.target.value, tax: chargesTotal.toFixed(2), total: total.toFixed(2) });
              }}
              placeholder="0"
            />
          </FormGroup>
        )}
        {editInvoice.discountType !== 'none' && (
          <FormGroup>
            <FormLabel>{t('admin:invoicesPage.discountReason')}</FormLabel>
            <FormInput
              type="text"
              value={editInvoice.discountReason}
              onChange={(e) => setEditInvoice({ ...editInvoice, discountReason: e.target.value })}
              placeholder="e.g. Loyalty discount"
            />
          </FormGroup>
        )}
      </FormRow>

      <FormGroup>
        <FormLabel>{t('admin:invoicesPage.invoiceCategory')}</FormLabel>
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
              <option value="service">{t('admin:invoicesPage.service')}</option>
              <option value="consulting">{t('admin:invoicesPage.consulting')}</option>
              <option value="others">{t('admin:invoicesPage.others')}</option>
            </>
          )}
        </FormSelect>
      </FormGroup>

      {/* Show item/description input for all non-subscription categories */}
      {(editInvoice.invoiceCategory || 'service') !== 'subscription' && (
        <FormGroup>
          <FormLabel>{t('admin:invoicesPage.itemdescription')}</FormLabel>
          <FormTextarea
            value={editInvoice.invoiceCategory === 'others' ? (editInvoice.customDescription || '') : (editInvoice.serviceDescription || '')}
            onChange={(e) => {
              if (editInvoice.invoiceCategory === 'others') {
                setEditInvoice({...editInvoice, customDescription: e.target.value});
              } else {
                setEditInvoice({...editInvoice, serviceDescription: e.target.value});
              }
            }}
            placeholder={`Enter ${editInvoice.invoiceCategory || 'service'} description...`}
            rows={2}
          />
        </FormGroup>
      )}

      <InvoiceSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>{editInvoice.currency ? formatCurrency(parseFloat(editInvoice.amount || '0'), editInvoice.currency) : '-'}</span>
        </SummaryRow>
        {editInvoice.discountType !== 'none' && parseFloat(editInvoice.discountValue || '0') > 0 && (() => {
          const amt = parseFloat(editInvoice.amount || '0');
          const dv = parseFloat(editInvoice.discountValue || '0');
          const da = editInvoice.discountType === 'percentage' ? amt * (dv / 100) : dv;
          return (
            <SummaryRow>
              <span style={{ color: '#DC2626' }}>Discount ({editInvoice.discountType === 'percentage' ? `${dv}%` : 'Fixed'}):</span>
              <span style={{ color: '#DC2626' }}>-{editInvoice.currency ? formatCurrency(da, editInvoice.currency) : da.toFixed(2)}</span>
            </SummaryRow>
          );
        })()}
        {getChargesForCurrency(editInvoice.currency || '').filter((c: any) => c.enabled && c.name && c.rate > 0).map((charge: any, idx: number) => {
          const amt = parseFloat(editInvoice.amount || '0');
          const dv = parseFloat(editInvoice.discountValue || '0');
          const da = editInvoice.discountType === 'percentage' ? amt * (dv / 100) : editInvoice.discountType === 'fixed' ? dv : 0;
          const afterDiscount = Math.max(0, amt - da);
          const chargeAmount = afterDiscount * charge.rate / 100;
          return (
            <SummaryRow key={idx}>
              <span>{charge.name} ({charge.rate}%):</span>
              <span>{editInvoice.currency ? formatCurrency(chargeAmount, editInvoice.currency) : '-'}</span>
            </SummaryRow>
          );
        })}
        <SummaryRow highlight>
          <span>Total:</span>
          <span><strong>{editInvoice.currency ? formatCurrency(parseFloat(editInvoice.total || '0'), editInvoice.currency) : '-'}</strong></span>
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

      {/* Previous Modification History */}
      {Array.isArray(selectedInvoice?.modificationHistory) && selectedInvoice.modificationHistory.length > 0 && (
        <div style={{ marginTop: '16px', padding: '12px', background: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#92400E', marginBottom: '8px' }}>{t('admin:invoicesPage.modificationHistory')}</div>
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

export default InvoiceEditModal;
