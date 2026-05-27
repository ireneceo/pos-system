import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal as CommonModal } from '../../../components/UI';
import DateField from '../../../components/Common/DateField';
import { formatCurrency } from '../../../utils/currency';
import { getRestaurantDisplayName } from '../../../utils/restaurantDisplay';
import { Manager, Restaurant, InvoiceCategory, AdditionalChargeConfig } from './types';
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

interface BrandInvoiceCreateModalProps {
  newInvoice: any;
  setNewInvoice: (invoice: any) => void;
  payerMode: 'member' | 'external';
  setPayerMode: (mode: 'member' | 'external') => void;
  externalPayer: { name: string; email: string; phone: string; company: string; address: string; tax_id: string };
  setExternalPayer: (payer: any) => void;
  selectedTarget: { type: 'manager' | 'restaurant'; data: Manager | Restaurant } | null;
  setSelectedTarget: (target: { type: 'manager' | 'restaurant'; data: Manager | Restaurant } | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: { managers: Manager[]; restaurants: Restaurant[] };
  showSearchDropdown: boolean;
  setShowSearchDropdown: (show: boolean) => void;
  handleSearch: (query: string) => void;
  selectTarget: (type: 'manager' | 'restaurant', data: Manager | Restaurant) => void;
  managers: Manager[];
  invoiceCategories: InvoiceCategory[];
  additionalCharges: AdditionalChargeConfig[];
  operationSettings: any;
  paymentMethodWarning: string | null;
  onClose: () => void;
  onSubmit: () => void;
  resetInvoiceForm: () => void;
}

const BrandInvoiceCreateModal: React.FC<BrandInvoiceCreateModalProps> = ({
  newInvoice,
  setNewInvoice,
  payerMode,
  setPayerMode,
  externalPayer,
  setExternalPayer,
  selectedTarget,
  setSelectedTarget,
  searchQuery,
  setSearchQuery,
  searchResults,
  showSearchDropdown,
  setShowSearchDropdown,
  handleSearch,
  selectTarget,
  managers,
  invoiceCategories,
  additionalCharges,
  operationSettings,
  paymentMethodWarning,
  onClose,
  onSubmit,
  resetInvoiceForm,
}) => {
  const { t } = useTranslation('brand');

  const handleClose = () => {
    onClose();
    resetInvoiceForm();
  };

  return (
    <CommonModal isOpen={true} onClose={handleClose} title="Create Invoice" footer={<><Button variant="secondary" onClick={handleClose}> Cancel </Button> {paymentMethodWarning && ( <div style={{ padding: '10px 16px', background: '#FEF3C7', border: '1px solid #F59E0B', borderRadius: '8px', fontSize: '13px', color: '#92400E', marginBottom: '12px', flex: '1 1 100%' }}> {paymentMethodWarning} </div> )} <Button variant="primary" onClick={onSubmit} disabled={payerMode === 'member' ? (!selectedTarget || !newInvoice.amount || !newInvoice.dueDate) : (!externalPayer.name || !externalPayer.email || !newInvoice.amount || !newInvoice.dueDate)} > Create Invoice </Button></>}>

      <FormGroup>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid ' + (payerMode === 'member' ? '#635BFF' : '#C7CED6'), borderRadius: '8px', cursor: 'pointer', background: payerMode === 'member' ? '#F0F0FF' : 'white', flex: 1 }}>
            <input type="radio" name="payerMode" value="member" checked={payerMode === 'member'} onChange={() => { setPayerMode('member'); setExternalPayer({ name: '', email: '', phone: '', company: '', address: '', tax_id: '' }); }} />
            Existing Member
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', border: '1px solid ' + (payerMode === 'external' ? '#635BFF' : '#C7CED6'), borderRadius: '8px', cursor: 'pointer', background: payerMode === 'external' ? '#F0F0FF' : 'white', flex: 1 }}>
            <input type="radio" name="payerMode" value="external" checked={payerMode === 'external'} onChange={() => { setPayerMode('external'); setSelectedTarget(null); setSearchQuery(''); }} />
            Non-Member
          </label>
        </div>

        {payerMode === 'member' ? (
          <>
            <FormLabel>Search Restaurant *</FormLabel>
            <div style={{position: 'relative'}}>
              <FormInput
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
                placeholder="Type to search for restaurants"
                required
              />
              {showSearchDropdown && (searchResults.managers.length > 0 || searchResults.restaurants.length > 0) && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'white',
                  border: '1px solid #C7CED6',
                  borderRadius: '8px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 1000,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                  {searchResults.managers.length > 0 && (
                    <div>
                      <div style={{padding: '8px 12px', background: '#F1F4F8', fontSize: '12px', fontWeight: '600', color: '#4B5563'}}>
                        MANAGERS
                      </div>
                      {searchResults.managers.map(manager => (
                        <div
                          key={manager.id}
                          onClick={() => selectTarget('manager', manager)}
                          style={{
                            padding: '12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #F1F4F8',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#F1F4F8'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                        >
                          <div style={{fontWeight: '500', color: '#0A2540'}}>{manager.fullName}</div>
                          <div style={{fontSize: '13px', color: '#4B5563'}}>{manager.companyName || manager.email}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.restaurants.length > 0 && (
                    <div>
                      <div style={{padding: '8px 12px', background: '#F1F4F8', fontSize: '12px', fontWeight: '600', color: '#4B5563'}}>
                        RESTAURANTS
                      </div>
                      {searchResults.restaurants.map(restaurant => {
                        const manager = managers.find(m => m.id === restaurant.admin_id);
                        return (
                          <div
                            key={restaurant.id}
                            onClick={() => selectTarget('restaurant', restaurant)}
                            style={{
                              padding: '12px',
                              cursor: 'pointer',
                              borderBottom: '1px solid #F1F4F8',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#F1F4F8'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
                          >
                            <div style={{fontWeight: '500', color: '#0A2540'}}>{getRestaurantDisplayName(restaurant)}</div>
                            <div style={{fontSize: '13px', color: '#4B5563'}}>Manager: {manager?.fullName || 'Unknown'}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
            {selectedTarget && (
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
                    {selectedTarget.type === 'manager'
                      ? (selectedTarget.data as Manager).fullName
                      : (selectedTarget.data as Restaurant).name}
                  </div>
                  <div style={{fontSize: '13px', color: '#4B5563'}}>
                    {selectedTarget.type === 'manager'
                      ? `${(selectedTarget.data as Manager).companyName} • Manager`
                      : `${(selectedTarget.data as Restaurant).address || 'No address'} • Restaurant`}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedTarget(null);
                    setSearchQuery('');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4B5563',
                    cursor: 'pointer',
                    fontSize: '18px',
                    lineHeight: '1',
                    padding: '4px'
                  }}
                  title="Remove selection"
                >
                  ×
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <FormLabel>{t('brand:brandInvoicesPage.nonmemberDetails')}</FormLabel>
            <FormRow>
              <FormGroup>
                <FormLabel>Name *</FormLabel>
                <FormInput type="text" value={externalPayer.name} onChange={(e) => setExternalPayer({...externalPayer, name: e.target.value})} placeholder="Full name" required />
              </FormGroup>
              <FormGroup>
                <FormLabel>Email *</FormLabel>
                <FormInput type="email" value={externalPayer.email} onChange={(e) => setExternalPayer({...externalPayer, email: e.target.value})} placeholder="Email address" required />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>{t('brand:brandInvoicesPage.phone')}</FormLabel>
                <FormInput type="text" value={externalPayer.phone} onChange={(e) => setExternalPayer({...externalPayer, phone: e.target.value})} placeholder="Phone number" />
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('brand:brandInvoicesPage.company')}</FormLabel>
                <FormInput type="text" value={externalPayer.company} onChange={(e) => setExternalPayer({...externalPayer, company: e.target.value})} placeholder="Company name" />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <FormLabel>{t('brand:brandInvoicesPage.address')}</FormLabel>
                <FormInput type="text" value={externalPayer.address} onChange={(e) => setExternalPayer({...externalPayer, address: e.target.value})} placeholder="Address" />
              </FormGroup>
              <FormGroup>
                <FormLabel>{t('brand:brandInvoicesPage.taxId')}</FormLabel>
                <FormInput type="text" value={externalPayer.tax_id} onChange={(e) => setExternalPayer({...externalPayer, tax_id: e.target.value})} placeholder="Tax ID" />
              </FormGroup>
            </FormRow>
          </>
        )}
      </FormGroup>
      <FormRow>
        <FormGroup>
          <FormLabel>Amount (RM) *</FormLabel>
          <FormInput
            type="number"
            step="0.01"
            min="0"
            value={newInvoice.amount}
            onChange={(e) => {
              const amount = parseFloat(e.target.value) || 0;
              const discountVal = parseFloat(newInvoice.discountValue) || 0;
              const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : newInvoice.discountType === 'fixed' ? discountVal : 0;
              const afterDiscount = Math.max(0, amount - discountAmt);
              const totalChargeRate = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + c.rate, 0);
              const tax = afterDiscount * (totalChargeRate / 100);
              const total = afterDiscount + tax;
              setNewInvoice({ ...newInvoice, amount: e.target.value, tax: tax.toFixed(2), total: total.toFixed(2) });
            }}
            placeholder="0.00"
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Due Date *</FormLabel>
          <DateField
            value={newInvoice.dueDate}
            onChange={(v) => setNewInvoice({...newInvoice, dueDate: v})}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <FormLabel>{t('brand:brandInvoicesPage.discount')}</FormLabel>
          <FormSelect
            value={newInvoice.discountType}
            onChange={(e) => {
              const dtype = e.target.value as 'none' | 'percentage' | 'fixed';
              const amount = parseFloat(newInvoice.amount) || 0;
              const discountVal = dtype === 'none' ? 0 : (parseFloat(newInvoice.discountValue) || 0);
              const discountAmt = dtype === 'percentage' ? amount * (discountVal / 100) : dtype === 'fixed' ? discountVal : 0;
              const afterDiscount = Math.max(0, amount - discountAmt);
              const totalChargeRate = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + c.rate, 0);
              const tax = afterDiscount * (totalChargeRate / 100);
              const total = afterDiscount + tax;
              setNewInvoice({ ...newInvoice, discountType: dtype, discountValue: dtype === 'none' ? '' : newInvoice.discountValue, tax: tax.toFixed(2), total: total.toFixed(2) });
            }}
          >
            <option value="none">{t('brand:brandInvoicesPage.noDiscount')}</option>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">{t('brand:brandInvoicesPage.fixedAmount')}</option>
          </FormSelect>
        </FormGroup>
        {newInvoice.discountType !== 'none' && (
          <FormGroup>
            <FormLabel>{newInvoice.discountType === 'percentage' ? 'Discount (%)' : 'Discount Amount'}</FormLabel>
            <FormInput
              type="number"
              step="0.01"
              min="0"
              max={newInvoice.discountType === 'percentage' ? '100' : undefined}
              value={newInvoice.discountValue}
              onChange={(e) => {
                const amount = parseFloat(newInvoice.amount) || 0;
                const discountVal = parseFloat(e.target.value) || 0;
                const discountAmt = newInvoice.discountType === 'percentage' ? amount * (discountVal / 100) : discountVal;
                const afterDiscount = Math.max(0, amount - discountAmt);
                const totalChargeRate = additionalCharges.filter(c => c.enabled && c.rate > 0).reduce((sum, c) => sum + c.rate, 0);
                const tax = afterDiscount * (totalChargeRate / 100);
                const total = afterDiscount + tax;
                setNewInvoice({ ...newInvoice, discountValue: e.target.value, tax: tax.toFixed(2), total: total.toFixed(2) });
              }}
              placeholder="0"
            />
          </FormGroup>
        )}
        {newInvoice.discountType !== 'none' && (
          <FormGroup>
            <FormLabel>{t('brand:brandInvoicesPage.discountReason')}</FormLabel>
            <FormInput
              type="text"
              value={newInvoice.discountReason}
              onChange={(e) => setNewInvoice({ ...newInvoice, discountReason: e.target.value })}
              placeholder="e.g. Loyalty discount"
            />
          </FormGroup>
        )}
      </FormRow>

      <FormGroup>
        <FormLabel>{t('brand:brandInvoicesPage.invoiceCategory')}</FormLabel>
        <FormSelect
          value={newInvoice.invoiceCategory || 'service'}
          onChange={(e) => setNewInvoice({...newInvoice, invoiceCategory: e.target.value})}
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

      {/* Show item/description input for all categories */}
      <FormGroup>
        <FormLabel>{t('brand:brandInvoicesPage.itemdescription')}</FormLabel>
        <FormTextarea
          value={newInvoice.invoiceCategory === 'others' ? (newInvoice.customDescription || '') : (newInvoice.serviceDescription || '')}
          onChange={(e) => {
            if (newInvoice.invoiceCategory === 'others') {
              setNewInvoice({...newInvoice, customDescription: e.target.value});
            } else {
              setNewInvoice({...newInvoice, serviceDescription: e.target.value});
            }
          }}
          placeholder={`Enter ${newInvoice.invoiceCategory || 'service'} description...`}
          rows={3}
        />
      </FormGroup>
      <InvoiceSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>{formatCurrency(parseFloat(newInvoice.amount || '0'), newInvoice.currency || operationSettings.currency)}</span>
        </SummaryRow>
        {newInvoice.discountType !== 'none' && parseFloat(newInvoice.discountValue || '0') > 0 && (() => {
          const amt = parseFloat(newInvoice.amount || '0');
          const dv = parseFloat(newInvoice.discountValue || '0');
          const discountAmt = newInvoice.discountType === 'percentage' ? amt * (dv / 100) : dv;
          return (
            <SummaryRow>
              <span style={{ color: '#15803D' }}>Discount{newInvoice.discountType === 'percentage' ? ` (${dv}%)` : ''}:</span>
              <span style={{ color: '#15803D' }}>-{formatCurrency(discountAmt, newInvoice.currency || operationSettings.currency)}</span>
            </SummaryRow>
          );
        })()}
        {additionalCharges.filter(c => c.enabled && c.rate > 0).map((charge, idx) => {
          const amt = parseFloat(newInvoice.amount || '0');
          const dv = parseFloat(newInvoice.discountValue || '0');
          const discountAmt = newInvoice.discountType === 'percentage' ? amt * (dv / 100) : newInvoice.discountType === 'fixed' ? dv : 0;
          const afterDiscount = Math.max(0, amt - discountAmt);
          const chargeAmount = afterDiscount * (charge.rate / 100);
          return (
            <SummaryRow key={idx}>
              <span>{charge.name} ({charge.rate}%):</span>
              <span>{formatCurrency(chargeAmount, newInvoice.currency || operationSettings.currency)}</span>
            </SummaryRow>
          );
        })}
        {additionalCharges.filter(c => c.enabled && c.rate > 0).length === 0 && (
          <SummaryRow>
            <span>Additional Charges:</span>
            <span>{formatCurrency(0, newInvoice.currency || operationSettings.currency)}</span>
          </SummaryRow>
        )}
        <SummaryRow highlight>
          <span>Total:</span>
          <span><strong>{formatCurrency(parseFloat(newInvoice.total || '0'), newInvoice.currency || operationSettings.currency)}</strong></span>
        </SummaryRow>
      </InvoiceSummary>

    </CommonModal>
  );
};

export default BrandInvoiceCreateModal;
