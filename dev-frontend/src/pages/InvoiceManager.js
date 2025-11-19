import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './InvoiceManager.css';

function InvoiceManager() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [invoiceSettings, setInvoiceSettings] = useState({});
  const [newInvoice, setNewInvoice] = useState({
    restaurant_id: '',
    billing_period_start: '',
    billing_period_end: '',
    due_date: '',
    type: 'manual',
    status: 'draft',
    notes: ''
  });
  const [invoiceItems, setInvoiceItems] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchInvoices();
      fetchInvoiceSettings();
    }
  }, [selectedRestaurant]);

  const fetchRestaurants = async () => {
    try {
      // Simulate fetching restaurants - replace with actual API
      setRestaurants([
        { id: 1, name: 'Restaurant A' },
        { id: 2, name: 'Restaurant B' },
        { id: 3, name: 'Restaurant C' }
      ]);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`/api/invoices/restaurant/${selectedRestaurant}`);
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const fetchInvoiceSettings = async () => {
    try {
      const response = await axios.get(`/api/invoices/settings/${selectedRestaurant}`);
      setInvoiceSettings(response.data);
    } catch (error) {
      console.error('Error fetching invoice settings:', error);
    }
  };

  const fetchInvoiceDetails = async (invoiceId) => {
    try {
      const response = await axios.get(`/api/invoices/${invoiceId}`);
      setSelectedInvoice(response.data);
    } catch (error) {
      console.error('Error fetching invoice details:', error);
    }
  };

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, {
      item_type: 'solution_fee',
      description: '',
      calculation_method: 'fixed',
      fixed_amount: 0,
      percentage_rate: 0,
      minimum_amount: 0,
      tax_rate: invoiceSettings.tax_rate || 10
    }]);
  };

  const updateInvoiceItem = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index][field] = value;
    
    // Calculate amounts
    const item = updatedItems[index];
    if (item.calculation_method === 'fixed') {
      item.calculated_amount = parseFloat(item.fixed_amount) || 0;
    } else if (item.calculation_method === 'percentage') {
      item.calculated_amount = (parseFloat(item.base_amount) || 0) * (parseFloat(item.percentage_rate) || 0) / 100;
    } else if (item.calculation_method === 'combined') {
      const percentageAmount = (parseFloat(item.base_amount) || 0) * (parseFloat(item.percentage_rate) || 0) / 100;
      item.calculated_amount = Math.max(parseFloat(item.minimum_amount) || 0, percentageAmount);
    }
    
    item.tax_amount = item.calculated_amount * (parseFloat(item.tax_rate) || 0) / 100;
    item.total_amount = item.calculated_amount + item.tax_amount;
    
    setInvoiceItems(updatedItems);
  };

  const removeInvoiceItem = (index) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const createInvoice = async () => {
    try {
      const totalAmount = invoiceItems.reduce((sum, item) => sum + (item.total_amount || 0), 0);
      
      const invoiceData = {
        ...newInvoice,
        restaurant_id: selectedRestaurant,
        total_amount: totalAmount,
        issued_by: 1 // Current user ID - replace with actual
      };

      const response = await axios.post('/api/invoices', {
        invoice_data: invoiceData,
        items: invoiceItems
      });

      if (response.data.success) {
        alert('Invoice created successfully!');
        setShowCreateModal(false);
        setNewInvoice({
          restaurant_id: '',
          billing_period_start: '',
          billing_period_end: '',
          due_date: '',
          type: 'manual',
          status: 'draft',
          notes: ''
        });
        setInvoiceItems([]);
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice');
    }
  };

  const updateInvoiceStatus = async (invoiceId, status) => {
    try {
      const response = await axios.patch(`/api/invoices/${invoiceId}/status`, { status });
      if (response.data.success) {
        alert('Invoice status updated successfully!');
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error updating invoice status:', error);
      alert('Failed to update invoice status');
    }
  };

  const deleteInvoice = async (invoiceId) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;
    
    try {
      const response = await axios.delete(`/api/invoices/${invoiceId}`);
      if (response.data.success) {
        alert('Invoice deleted successfully!');
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Failed to delete invoice');
    }
  };

  const generateAutomaticInvoices = async () => {
    try {
      const response = await axios.post('/api/invoices/generate-automatic', {
        restaurant_id: selectedRestaurant
      });
      
      if (response.data.success) {
        alert('Automatic invoice generated successfully!');
        fetchInvoices();
      }
    } catch (error) {
      console.error('Error generating automatic invoice:', error);
      alert(error.response?.data?.error || 'Failed to generate automatic invoice');
    }
  };

  const updateSettings = async () => {
    try {
      const response = await axios.put(`/api/invoices/settings/${selectedRestaurant}`, invoiceSettings);
      if (response.data.success) {
        alert('Settings updated successfully!');
        setShowSettingsModal(false);
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      draft: 'badge-secondary',
      pending_payment: 'badge-primary',
      payment_submitted: 'badge-warning',
      paid: 'badge-success',
      overdue: 'badge-danger',
      cancelled: 'badge-dark'
    };
    return `badge ${statusClasses[status] || 'badge-secondary'}`;
  };

  const getStatusText = (status) => {
    const statusTexts = {
      draft: 'Draft',
      pending_payment: 'Pending',
      payment_submitted: 'Submitted',
      paid: 'Paid',
      overdue: 'Overdue',
      cancelled: 'Cancelled'
    };
    return statusTexts[status] || status;
  };

  return (
    <div className="invoice-manager">
      <div className="header">
        <h1>Invoice Management</h1>
        <div className="header-actions">
          <select 
            value={selectedRestaurant || ''} 
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="form-control"
          >
            <option value="">Select Restaurant</option>
            {restaurants.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          {selectedRestaurant && (
            <>
              <button className="btn btn-secondary" onClick={() => setShowSettingsModal(true)}>
                Settings
              </button>
              <button className="btn btn-info" onClick={generateAutomaticInvoices}>
                Generate Auto Invoice
              </button>
              <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                Create Invoice
              </button>
            </>
          )}
        </div>
      </div>

      {selectedRestaurant && (
        <div className="invoice-list">
          <table className="table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Period</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.invoice_number}</td>
                  <td>
                    {new Date(invoice.billing_period_start).toLocaleDateString()} - 
                    {new Date(invoice.billing_period_end).toLocaleDateString()}
                  </td>
                  <td>${invoice.total_amount}</td>
                  <td>{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td>
                    <span className={getStatusBadge(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </span>
                  </td>
                  <td>{invoice.type}</td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button
                        className="action-btn"
                        onClick={() => fetchInvoiceDetails(invoice.id)}
                        title="View Details"
                      >
                        View
                      </button>

                      {invoice.status === 'draft' && (
                        <>
                          <button
                            className="action-btn primary"
                            onClick={() => updateInvoiceStatus(invoice.id, 'pending_payment')}
                            title="Send Invoice"
                          >
                            Send
                          </button>
                          <button
                            className="action-btn warning"
                            onClick={() => updateInvoiceStatus(invoice.id, 'cancelled')}
                            title="Cancel Invoice"
                          >
                            Cancel
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => deleteInvoice(invoice.id)}
                            title="Delete Invoice"
                          >
                            ×
                          </button>
                        </>
                      )}

                      {invoice.status === 'pending_payment' && (
                        <>
                          <button
                            className="action-btn warning"
                            onClick={() => updateInvoiceStatus(invoice.id, 'payment_submitted')}
                            title="Mark Payment Submitted"
                          >
                            Payment Submitted
                          </button>
                          <button
                            className="action-btn success"
                            onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
                            title="Mark as Paid"
                          >
                            Mark Paid
                          </button>
                          <button
                            className="action-btn danger"
                            onClick={() => updateInvoiceStatus(invoice.id, 'overdue')}
                            title="Mark as Overdue"
                          >
                            Overdue
                          </button>
                        </>
                      )}

                      {invoice.status === 'payment_submitted' && (
                        <>
                          <button
                            className="action-btn success"
                            onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
                            title="Confirm Payment"
                          >
                            Confirm Payment
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => updateInvoiceStatus(invoice.id, 'pending_payment')}
                            title="Back to Pending"
                          >
                            Back to Pending
                          </button>
                        </>
                      )}

                      {invoice.status === 'overdue' && (
                        <>
                          <button
                            className="action-btn success"
                            onClick={() => updateInvoiceStatus(invoice.id, 'paid')}
                            title="Mark as Paid"
                          >
                            Mark Paid
                          </button>
                          <button
                            className="action-btn primary"
                            onClick={() => updateInvoiceStatus(invoice.id, 'pending_payment')}
                            title="Resend Invoice"
                          >
                            Resend
                          </button>
                        </>
                      )}

                      {invoice.status === 'paid' && (
                        <button
                          className="action-btn"
                          onClick={() => updateInvoiceStatus(invoice.id, 'pending_payment')}
                          title="Revert to Pending"
                        >
                          Revert
                        </button>
                      )}

                      {invoice.status === 'cancelled' && (
                        <button
                          className="action-btn delete"
                          onClick={() => deleteInvoice(invoice.id)}
                          title="Delete Invoice"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>Create New Invoice</h2>
              <button className="close" onClick={() => setShowCreateModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Billing Period Start</label>
                <input 
                  type="date"
                  value={newInvoice.billing_period_start}
                  onChange={(e) => setNewInvoice({...newInvoice, billing_period_start: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Billing Period End</label>
                <input 
                  type="date"
                  value={newInvoice.billing_period_end}
                  onChange={(e) => setNewInvoice({...newInvoice, billing_period_end: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input 
                  type="date"
                  value={newInvoice.due_date}
                  onChange={(e) => setNewInvoice({...newInvoice, due_date: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea 
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                  className="form-control"
                  rows="3"
                />
              </div>
              
              <h3>Invoice Items</h3>
              <button className="btn btn-sm btn-primary mb-3" onClick={addInvoiceItem}>
                Add Item
              </button>
              
              {invoiceItems.map((item, index) => (
                <div key={index} className="invoice-item">
                  <div className="row">
                    <div className="col-md-3">
                      <select 
                        value={item.item_type}
                        onChange={(e) => updateInvoiceItem(index, 'item_type', e.target.value)}
                        className="form-control"
                      >
                        <option value="solution_fee">Solution Fee</option>
                        <option value="rent_fixed">Rent (Fixed)</option>
                        <option value="rent_percentage">Rent (Percentage)</option>
                        <option value="rent_combined">Rent (Combined)</option>
                        <option value="management_fee">Management Fee</option>
                        <option value="utility">Utility</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input 
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-2">
                      <select 
                        value={item.calculation_method}
                        onChange={(e) => updateInvoiceItem(index, 'calculation_method', e.target.value)}
                        className="form-control"
                      >
                        <option value="fixed">Fixed</option>
                        <option value="percentage">Percentage</option>
                        <option value="combined">Combined</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      {item.calculation_method === 'fixed' && (
                        <input 
                          type="number"
                          placeholder="Amount"
                          value={item.fixed_amount}
                          onChange={(e) => updateInvoiceItem(index, 'fixed_amount', e.target.value)}
                          className="form-control"
                        />
                      )}
                      {item.calculation_method === 'percentage' && (
                        <>
                          <input 
                            type="number"
                            placeholder="Base Amount"
                            value={item.base_amount}
                            onChange={(e) => updateInvoiceItem(index, 'base_amount', e.target.value)}
                            className="form-control mb-1"
                          />
                          <input 
                            type="number"
                            placeholder="Rate %"
                            value={item.percentage_rate}
                            onChange={(e) => updateInvoiceItem(index, 'percentage_rate', e.target.value)}
                            className="form-control"
                          />
                        </>
                      )}
                      {item.calculation_method === 'combined' && (
                        <>
                          <input 
                            type="number"
                            placeholder="Minimum"
                            value={item.minimum_amount}
                            onChange={(e) => updateInvoiceItem(index, 'minimum_amount', e.target.value)}
                            className="form-control mb-1"
                          />
                          <input 
                            type="number"
                            placeholder="Rate %"
                            value={item.percentage_rate}
                            onChange={(e) => updateInvoiceItem(index, 'percentage_rate', e.target.value)}
                            className="form-control"
                          />
                        </>
                      )}
                    </div>
                    <div className="col-md-1">
                      <div className="text-right">
                        ${item.total_amount?.toFixed(2) || '0.00'}
                      </div>
                    </div>
                    <div className="col-md-1">
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => removeInvoiceItem(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="total-section">
                <h4>Total: ${invoiceItems.reduce((sum, item) => sum + (item.total_amount || 0), 0).toFixed(2)}</h4>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={createInvoice}>
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Invoice Settings</h2>
              <button className="close" onClick={() => setShowSettingsModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox"
                    checked={invoiceSettings.auto_generate}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, auto_generate: e.target.checked})}
                  /> Auto Generate Monthly Invoices
                </label>
              </div>
              {invoiceSettings.auto_generate && (
                <div className="form-group">
                  <label>Generation Day (1-28)</label>
                  <input 
                    type="number"
                    min="1"
                    max="28"
                    value={invoiceSettings.generation_day}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, generation_day: e.target.value})}
                    className="form-control"
                  />
                </div>
              )}
              <div className="form-group">
                <label>Payment Terms (days)</label>
                <input 
                  type="number"
                  value={invoiceSettings.payment_terms}
                  onChange={(e) => setInvoiceSettings({...invoiceSettings, payment_terms: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox"
                    checked={invoiceSettings.solution_fee_enabled}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, solution_fee_enabled: e.target.checked})}
                  /> Solution Fee Enabled
                </label>
              </div>
              {invoiceSettings.solution_fee_enabled && (
                <div className="form-group">
                  <label>Solution Fee Amount</label>
                  <input 
                    type="number"
                    value={invoiceSettings.solution_fee_amount}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, solution_fee_amount: e.target.value})}
                    className="form-control"
                  />
                </div>
              )}
              <div className="form-group">
                <label>
                  <input 
                    type="checkbox"
                    checked={invoiceSettings.rent_enabled}
                    onChange={(e) => setInvoiceSettings({...invoiceSettings, rent_enabled: e.target.checked})}
                  /> Rent Enabled
                </label>
              </div>
              {invoiceSettings.rent_enabled && (
                <>
                  <div className="form-group">
                    <label>Rent Type</label>
                    <select 
                      value={invoiceSettings.rent_type}
                      onChange={(e) => setInvoiceSettings({...invoiceSettings, rent_type: e.target.value})}
                      className="form-control"
                    >
                      <option value="fixed">Fixed Amount</option>
                      <option value="percentage">Percentage of Sales</option>
                      <option value="combined">Combined (Higher of Fixed or Percentage)</option>
                    </select>
                  </div>
                  {(invoiceSettings.rent_type === 'fixed' || invoiceSettings.rent_type === 'combined') && (
                    <div className="form-group">
                      <label>{invoiceSettings.rent_type === 'combined' ? 'Minimum Fixed Amount' : 'Fixed Amount'}</label>
                      <input 
                        type="number"
                        value={invoiceSettings.rent_type === 'combined' ? invoiceSettings.rent_minimum_amount : invoiceSettings.rent_fixed_amount}
                        onChange={(e) => setInvoiceSettings({
                          ...invoiceSettings, 
                          [invoiceSettings.rent_type === 'combined' ? 'rent_minimum_amount' : 'rent_fixed_amount']: e.target.value
                        })}
                        className="form-control"
                      />
                    </div>
                  )}
                  {(invoiceSettings.rent_type === 'percentage' || invoiceSettings.rent_type === 'combined') && (
                    <div className="form-group">
                      <label>Percentage Rate (%)</label>
                      <input 
                        type="number"
                        step="0.01"
                        value={invoiceSettings.rent_percentage_rate}
                        onChange={(e) => setInvoiceSettings({...invoiceSettings, rent_percentage_rate: e.target.value})}
                        className="form-control"
                      />
                    </div>
                  )}
                </>
              )}
              <div className="form-group">
                <label>Default Tax Rate (%)</label>
                <input 
                  type="number"
                  step="0.01"
                  value={invoiceSettings.tax_rate}
                  onChange={(e) => setInvoiceSettings({...invoiceSettings, tax_rate: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Invoice Number Prefix</label>
                <input 
                  type="text"
                  value={invoiceSettings.invoice_prefix}
                  onChange={(e) => setInvoiceSettings({...invoiceSettings, invoice_prefix: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Default Notes Template</label>
                <textarea 
                  value={invoiceSettings.notes_template}
                  onChange={(e) => setInvoiceSettings({...invoiceSettings, notes_template: e.target.value})}
                  className="form-control"
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowSettingsModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={updateSettings}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="modal">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>Invoice Details - {selectedInvoice.invoice?.invoice_number}</h2>
              <button className="close" onClick={() => setSelectedInvoice(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="invoice-details">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Invoice Number:</strong> {selectedInvoice.invoice?.invoice_number}</p>
                    <p><strong>Status:</strong> <span className={getStatusBadge(selectedInvoice.invoice?.status)}>{selectedInvoice.invoice?.status}</span></p>
                    <p><strong>Type:</strong> {selectedInvoice.invoice?.type}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Billing Period:</strong> {new Date(selectedInvoice.invoice?.billing_period_start).toLocaleDateString()} - {new Date(selectedInvoice.invoice?.billing_period_end).toLocaleDateString()}</p>
                    <p><strong>Due Date:</strong> {new Date(selectedInvoice.invoice?.due_date).toLocaleDateString()}</p>
                    <p><strong>Total Amount:</strong> ${selectedInvoice.invoice?.total_amount}</p>
                  </div>
                </div>
                
                <h3>Items</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Tax</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.item_type}</td>
                        <td>{item.description}</td>
                        <td>${item.calculated_amount}</td>
                        <td>${item.tax_amount}</td>
                        <td>${item.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {selectedInvoice.invoice?.notes && (
                  <div className="notes">
                    <h4>Notes</h4>
                    <p>{selectedInvoice.invoice.notes}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedInvoice(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvoiceManager;