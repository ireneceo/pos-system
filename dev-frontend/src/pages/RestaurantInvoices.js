import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RestaurantInvoices.css';

function RestaurantInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
    overdue: 0
  });

  // Assume we get restaurant ID from context or props
  const restaurantId = 1; // Replace with actual restaurant ID from auth context

  useEffect(() => {
    fetchInvoices();
  }, [filter, dateRange]);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`/api/invoices/restaurant/${restaurantId}`);
      let filteredInvoices = response.data;

      // Apply status filter
      if (filter !== 'all') {
        filteredInvoices = filteredInvoices.filter(inv => inv.status === filter);
      }

      // Apply date range filter
      if (dateRange.start && dateRange.end) {
        filteredInvoices = filteredInvoices.filter(inv => {
          const invoiceDate = new Date(inv.created_at);
          const startDate = new Date(dateRange.start);
          const endDate = new Date(dateRange.end);
          return invoiceDate >= startDate && invoiceDate <= endDate;
        });
      }

      setInvoices(filteredInvoices);
      calculateStats(filteredInvoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const calculateStats = (invoiceList) => {
    const stats = {
      total: invoiceList.length,
      paid: 0,
      pending: 0,
      overdue: 0,
      totalAmount: 0,
      paidAmount: 0,
      pendingAmount: 0
    };

    const today = new Date();
    
    invoiceList.forEach(invoice => {
      stats.totalAmount += parseFloat(invoice.total_amount);
      
      if (invoice.status === 'paid') {
        stats.paid++;
        stats.paidAmount += parseFloat(invoice.total_amount);
      } else if (invoice.status === 'sent' || invoice.status === 'draft') {
        const dueDate = new Date(invoice.due_date);
        if (dueDate < today) {
          stats.overdue++;
        } else {
          stats.pending++;
        }
        stats.pendingAmount += parseFloat(invoice.total_amount);
      }
    });

    setStats(stats);
  };

  const fetchInvoiceDetails = async (invoiceId) => {
    try {
      const response = await axios.get(`/api/invoices/${invoiceId}`);
      setSelectedInvoice(response.data);
    } catch (error) {
      console.error('Error fetching invoice details:', error);
    }
  };

  const markAsPaid = async (invoiceId) => {
    if (!window.confirm('Mark this invoice as paid?')) return;
    
    try {
      const response = await axios.patch(`/api/invoices/${invoiceId}/status`, {
        status: 'paid',
        paid_at: new Date()
      });
      
      if (response.data.success) {
        alert('Invoice marked as paid successfully!');
        fetchInvoices();
        setSelectedInvoice(null);
      }
    } catch (error) {
      console.error('Error updating invoice status:', error);
      alert('Failed to update invoice status');
    }
  };

  const downloadInvoice = (invoice) => {
    // Generate PDF or download invoice
    const invoiceData = {
      number: invoice.invoice_number,
      date: invoice.issued_at,
      dueDate: invoice.due_date,
      amount: invoice.total_amount,
      items: selectedInvoice?.items || []
    };
    
    // Convert to JSON and download
    const dataStr = JSON.stringify(invoiceData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `invoice_${invoice.invoice_number}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      draft: 'badge-secondary',
      sent: 'badge-primary',
      paid: 'badge-success',
      overdue: 'badge-danger',
      cancelled: 'badge-dark'
    };
    return `badge ${statusClasses[status] || 'badge-secondary'}`;
  };

  const getStatusLabel = (invoice) => {
    if (invoice.status === 'paid') return 'paid';
    if (invoice.status === 'cancelled') return 'cancelled';
    if (invoice.status === 'sent' || invoice.status === 'draft') {
      const today = new Date();
      const dueDate = new Date(invoice.due_date);
      if (dueDate < today) return 'overdue';
      return invoice.status;
    }
    return invoice.status;
  };

  return (
    <div className="restaurant-invoices">
      <div className="header">
        <h1>My Invoices</h1>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Invoices</div>
          </div>
          <div className="stat-card success">
            <div className="stat-value">{stats.paid}</div>
            <div className="stat-label">Paid</div>
          </div>
          <div className="stat-card warning">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card danger">
            <div className="stat-value">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Status Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-control">
            <option value="all">All Invoices</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Date Range:</label>
          <div className="date-range">
            <input 
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="form-control"
            />
            <span>to</span>
            <input 
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="form-control"
            />
          </div>
        </div>
        <div className="filter-group">
          <label>&nbsp;</label>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setFilter('all');
              setDateRange({ start: '', end: '' });
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="amount-summary">
        <div className="summary-item">
          <span className="summary-label">Total Amount:</span>
          <span className="summary-value">${stats.totalAmount?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-item success">
          <span className="summary-label">Paid:</span>
          <span className="summary-value">${stats.paidAmount?.toFixed(2) || '0.00'}</span>
        </div>
        <div className="summary-item warning">
          <span className="summary-label">Pending:</span>
          <span className="summary-value">${stats.pendingAmount?.toFixed(2) || '0.00'}</span>
        </div>
      </div>

      <div className="invoice-grid">
        {invoices.map(invoice => {
          const status = getStatusLabel(invoice);
          return (
            <div 
              key={invoice.id} 
              className={`invoice-card ${status}`}
              onClick={() => fetchInvoiceDetails(invoice.id)}
            >
              <div className="invoice-card-header">
                <h3>{invoice.invoice_number}</h3>
                <span className={getStatusBadge(status)}>
                  {status}
                </span>
              </div>
              <div className="invoice-card-body">
                <div className="invoice-info">
                  <span className="label">Period:</span>
                  <span className="value">
                    {new Date(invoice.billing_period_start).toLocaleDateString()} - 
                    {new Date(invoice.billing_period_end).toLocaleDateString()}
                  </span>
                </div>
                <div className="invoice-info">
                  <span className="label">Due Date:</span>
                  <span className="value">{new Date(invoice.due_date).toLocaleDateString()}</span>
                </div>
                <div className="invoice-info">
                  <span className="label">Amount:</span>
                  <span className="value amount">${invoice.total_amount}</span>
                </div>
              </div>
              <div className="invoice-card-footer">
                <span className="invoice-type">{invoice.type}</span>
                <span className="invoice-date">
                  Issued: {new Date(invoice.issued_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="modal">
          <div className="modal-content large">
            <div className="modal-header">
              <h2>Invoice {selectedInvoice.invoice?.invoice_number}</h2>
              <button className="close" onClick={() => setSelectedInvoice(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="invoice-detail-header">
                <div className="invoice-detail-info">
                  <h3>Invoice Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Invoice Number:</span>
                    <span className="detail-value">{selectedInvoice.invoice?.invoice_number}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={getStatusBadge(getStatusLabel(selectedInvoice.invoice))}>
                      {getStatusLabel(selectedInvoice.invoice)}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{selectedInvoice.invoice?.type}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Issued Date:</span>
                    <span className="detail-value">
                      {new Date(selectedInvoice.invoice?.issued_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="invoice-detail-info">
                  <h3>Billing Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Billing Period:</span>
                    <span className="detail-value">
                      {new Date(selectedInvoice.invoice?.billing_period_start).toLocaleDateString()} - 
                      {new Date(selectedInvoice.invoice?.billing_period_end).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Due Date:</span>
                    <span className="detail-value">
                      {new Date(selectedInvoice.invoice?.due_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Total Amount:</span>
                    <span className="detail-value amount">
                      ${selectedInvoice.invoice?.total_amount}
                    </span>
                  </div>
                  {selectedInvoice.invoice?.paid_amount > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Paid Amount:</span>
                      <span className="detail-value amount success">
                        ${selectedInvoice.invoice?.paid_amount}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="invoice-items-section">
                <h3>Invoice Items</h3>
                <table className="items-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Calculation</th>
                      <th>Amount</th>
                      <th>Tax</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.description}</td>
                        <td>{item.item_type.replace('_', ' ')}</td>
                        <td>
                          {item.calculation_method === 'fixed' && 'Fixed'}
                          {item.calculation_method === 'percentage' && `${item.percentage_rate}%`}
                          {item.calculation_method === 'combined' && `Min $${item.minimum_amount} or ${item.percentage_rate}%`}
                        </td>
                        <td>${item.calculated_amount}</td>
                        <td>${item.tax_amount} ({item.tax_rate}%)</td>
                        <td className="amount">${item.total_amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="text-right">
                        <strong>Total:</strong>
                      </td>
                      <td className="amount">
                        <strong>${selectedInvoice.invoice?.total_amount}</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {selectedInvoice.invoice?.notes && (
                <div className="invoice-notes">
                  <h3>Notes</h3>
                  <p>{selectedInvoice.invoice.notes}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              {selectedInvoice.invoice?.status !== 'paid' && selectedInvoice.invoice?.status !== 'cancelled' && (
                <button 
                  className="btn btn-success"
                  onClick={() => markAsPaid(selectedInvoice.invoice.id)}
                >
                  Mark as Paid
                </button>
              )}
              <button 
                className="btn btn-primary"
                onClick={() => downloadInvoice(selectedInvoice.invoice)}
              >
                Download Invoice
              </button>
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

export default RestaurantInvoices;