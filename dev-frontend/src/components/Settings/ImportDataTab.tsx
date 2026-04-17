import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getAuthToken } from '../../utils/auth';
import { formatDateTime as tzFormatDateTime } from '../../utils/timezone';
const Card = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #E6EBF1;
  padding: 24px;
  margin-bottom: 24px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #0A2540;
  margin: 0 0 4px;
`;

interface ImportDataTabProps {
  restaurantId?: string | number;
}

const ImportDataTab: React.FC<ImportDataTabProps> = ({ restaurantId }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<{ categories: number; menuItems: number; options: number; orders: number } | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [unmatchedItems, setUnmatchedItems] = useState<string[]>([]);
  const [menuList, setMenuList] = useState<{ id: number; name: string }[]>([]);
  const [matchMap, setMatchMap] = useState<Record<string, number>>({});
  const [applyingMatch, setApplyingMatch] = useState(false);

  // Load stats + history + menu list
  useEffect(() => {
    if (!restaurantId) return;
    const token = getAuthToken();
    const headers = { 'Authorization': `Bearer ${token}` };

    fetch(`/api/import/stats?restaurant_id=${restaurantId}`, { headers })
      .then(r => r.json()).then(d => { if (d.success) setStats(d.data); }).catch(() => {});
    fetch(`/api/import/history?restaurant_id=${restaurantId}`, { headers })
      .then(r => r.json()).then(d => { if (d.success) setHistory(d.data || []); }).catch(() => {});
    fetch(`/api/menu?restaurant_id=${restaurantId}&excludeImage=true`, { headers })
      .then(r => r.json()).then(d => {
        const items = d.data?.items || [];
        setMenuList(items.map((i: any) => ({ id: i.id, name: i.name })));
      }).catch(() => {});
  }, [restaurantId, result]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(null);
    setResult(null);
    setError('');
    setUnmatchedItems([]);

    const formData = new FormData();
    formData.append('file', f);
    formData.append('type', 'orders');

    try {
      const token = getAuthToken();
      const res = await fetch('/api/import/preview', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setPreview(data.data);
        setMapping(data.data.autoMapping || {});
      } else {
        setError(data.message || 'Failed to parse CSV');
      }
    } catch {
      setError('Failed to upload file');
    }
  };

  const handleImport = async () => {
    if (!file || !restaurantId) return;
    setImporting(true);
    setResult(null);
    setError('');
    setUnmatchedItems([]);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('mapping', JSON.stringify(mapping));
    formData.append('restaurant_id', restaurantId.toString());
    formData.append('format', preview?.format || 'summary');

    try {
      const token = getAuthToken();
      const res = await fetch('/api/import/execute-orders', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.data);
        // Collect unmatched item names
        if (data.data.unmatchedNames && data.data.unmatchedNames.length > 0) {
          setUnmatchedItems(data.data.unmatchedNames);
        }
      } else {
        setError(data.message || 'Import failed');
      }
    } catch {
      setError('Import request failed');
    } finally {
      setImporting(false);
    }
  };

  const handleApplyMatching = async () => {
    if (!result?.batchId || Object.keys(matchMap).length === 0) return;
    setApplyingMatch(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/import/apply-matching', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batch_id: result.batchId,
          restaurant_id: restaurantId,
          matching: matchMap
        })
      });
      const data = await res.json();
      if (data.success) {
        setUnmatchedItems([]);
        setMatchMap({});
        setResult((prev: any) => ({ ...prev, matched: (prev?.matched || 0) + data.data.matchedCount, unmatched: 0 }));
      }
    } catch { /* silent */ }
    setApplyingMatch(false);
  };

  const handleUndo = async (batchId: string) => {
    if (!window.confirm('Undo this import? All imported orders will be deleted.')) return;
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/import/undo/${batchId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setHistory(prev => prev.map(h => h.batch_id === batchId ? { ...h, status: 'undone' } : h));
        setResult({});
      }
    } catch { /* silent */ }
  };

  const resetState = () => {
    setFile(null);
    setPreview(null);
    setMapping({});
    setResult(null);
    setError('');
    setUnmatchedItems([]);
    setMatchMap({});
  };

  const mappedCount = Object.values(mapping).filter(v => v).length;

  return (
    <div>
      {/* Current Data Overview */}
      {stats && (
        <Card>
          <CardTitle>Current Data in Your Restaurant</CardTitle>
          <p style={{ color: '#6B7C93', fontSize: '13px', margin: '4px 0 16px' }}>
            Data currently registered in the system. Import will add order history to these.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {[
              { label: 'Categories', value: stats.categories, color: '#635BFF' },
              { label: 'Menu Items', value: stats.menuItems, color: '#10B981' },
              { label: 'Option Groups', value: stats.options, color: '#8B5CF6' },
              { label: 'Orders', value: stats.orders, color: '#F59E0B' },
            ].map(s => (
              <div key={s.label} style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E6EBF1', borderRadius: '8px', flex: '1', minWidth: '110px' }}>
                <div style={{ fontSize: '22px', fontWeight: 700, color: s.color }}>{s.value.toLocaleString()}</div>
                <div style={{ fontSize: '11px', color: '#6B7C93', marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Import Order History */}
      <Card>
        <CardTitle>Import Order History</CardTitle>
        <p style={{ color: '#6B7C93', margin: '4px 0 20px', fontSize: '14px', lineHeight: '1.6' }}>
          Upload order history from your previous POS system. The system will automatically match item names to your registered menu. Amounts are imported as-is from your CSV (no recalculation).
        </p>

        {/* Accepted formats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
          <div style={{ padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#065F46', marginBottom: '6px' }}>Summary Format</div>
            <div style={{ fontSize: '12px', color: '#047857', lineHeight: '1.6' }}>
              1 row = 1 order<br />
              Date, Total, Payment Method
            </div>
          </div>
          <div style={{ padding: '12px 16px', background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#075985', marginBottom: '6px' }}>Detail Format</div>
            <div style={{ fontSize: '12px', color: '#0369A1', lineHeight: '1.6' }}>
              1 row = 1 item<br />
              Date, Item Name, Qty, Price
            </div>
          </div>
        </div>

        {/* File Upload */}
        {!result && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: '40px 32px', border: '2px dashed #D1D5DB', borderRadius: '8px', cursor: 'pointer',
              background: file ? '#F5F3FF' : '#FAFBFC', borderColor: file ? '#635BFF' : '#D1D5DB'
            }}>
              <input type="file" accept=".csv" onChange={handleFileUpload} style={{ display: 'none' }} />
              <div style={{ fontSize: '14px', color: '#6B7280', textAlign: 'center' }}>
                {file ? (
                  <>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>📄</div>
                    <strong style={{ color: '#374151' }}>{file.name}</strong>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{(file.size / 1024).toFixed(1)} KB — Click to change</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>📤</div>
                    <strong style={{ color: '#374151' }}>Click to upload CSV file</strong>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>Any column order. Max 5MB.</div>
                  </>
                )}
              </div>
            </label>
          </div>
        )}

        {error && (
          <div style={{ padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', marginBottom: '16px', color: '#991B1B', fontSize: '13px' }}>
            {error}
          </div>
        )}

        {/* Preview + Mapping */}
        {preview && !result && (
          <>
            <div style={{ marginBottom: '16px', padding: '10px 14px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '6px', fontSize: '13px', color: '#065F46' }}>
              <strong>{preview.totalRows} rows</strong> found
              {preview.format === 'detail' && ' (detail format — items grouped into orders)'}
              {preview.format === 'summary' && ' (summary format — 1 row per order)'}
            </div>

            {/* Column Mapping */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '4px' }}>Column Mapping</div>
              <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 12px' }}>
                We auto-detected {mappedCount} columns. Adjust if needed.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '4px', alignItems: 'center', marginBottom: '8px', fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' as const }}>
                <div>Your CSV Column</div><div></div><div>System Field</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '8px', alignItems: 'center' }}>
                {preview.headers.map((header: string) => (
                  <React.Fragment key={header}>
                    <div style={{ fontSize: '13px', color: '#374151', fontWeight: 500, padding: '6px 0' }}>{header}</div>
                    <div style={{ color: mapping[header] ? '#10B981' : '#D1D5DB', fontSize: '16px' }}>→</div>
                    <select
                      value={mapping[header] || ''}
                      onChange={(e) => setMapping(prev => ({ ...prev, [header]: e.target.value }))}
                      style={{ padding: '6px 10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px', background: mapping[header] ? '#ECFDF5' : '#fff', color: mapping[header] ? '#065F46' : '#6B7280' }}
                    >
                      <option value="">-- Skip --</option>
                      <option value="date">Order Date</option>
                      <option value="total_amount">Total Amount</option>
                      <option value="payment_method">Payment Method</option>
                      <option value="order_type">Order Type</option>
                      <option value="item_name">Item Name</option>
                      <option value="quantity">Quantity</option>
                      <option value="unit_price">Unit Price</option>
                    </select>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Preview Table */}
            <div style={{ marginBottom: '20px', overflowX: 'auto' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>Data Preview</div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr>
                    {preview.headers.map((h: string) => (
                      <th key={h} style={{ padding: '8px 10px', background: mapping[h] ? '#F0FDF4' : '#F3F4F6', borderBottom: '2px solid #E5E7EB', textAlign: 'left', whiteSpace: 'nowrap', fontSize: '11px' }}>
                        {h}
                        {mapping[h] && <span style={{ display: 'block', fontSize: '10px', color: '#10B981', marginTop: '2px' }}>→ {mapping[h]}</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.rows.map((row: any, i: number) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                      {preview.headers.map((h: string) => (
                        <td key={h} style={{ padding: '6px 10px', borderBottom: '1px solid #F3F4F6', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row[h]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Warnings */}
            {!Object.values(mapping).includes('date') && (
              <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', marginBottom: '12px', fontSize: '13px', color: '#991B1B' }}>
                ⚠ "Order Date" is required. Please map one of your columns.
              </div>
            )}

            {/* Confirm */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={resetState} style={{ padding: '8px 16px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px', background: '#fff', color: '#6B7280', cursor: 'pointer' }}>
                Cancel
              </button>
              <button
                onClick={handleImport}
                disabled={importing || !Object.values(mapping).includes('date')}
                style={{
                  padding: '8px 24px', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer',
                  background: importing ? '#C4C1F7' : '#635BFF', color: '#fff',
                  opacity: !Object.values(mapping).includes('date') ? 0.5 : 1
                }}
              >
                {importing ? 'Importing...' : `Import ${preview.totalRows} Orders`}
              </button>
            </div>
          </>
        )}

        {/* Result */}
        {result && result.success !== undefined && (
          <div style={{ padding: '16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', marginBottom: unmatchedItems.length > 0 ? '0' : '0' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#065F46', marginBottom: '10px' }}>Import Complete</div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '14px', color: '#047857', marginBottom: '12px' }}>
              <div><strong>{result.success}</strong> orders imported</div>
              {result.failed > 0 && <div style={{ color: '#991B1B' }}><strong>{result.failed}</strong> failed</div>}
              {result.matched > 0 && <div><strong>{result.matched}</strong> items matched</div>}
              {(result.unmatched > 0 || unmatchedItems.length > 0) && <div style={{ color: '#92400E' }}><strong>{unmatchedItems.length || result.unmatched}</strong> items unmatched</div>}
            </div>
            <button onClick={resetState} style={{ padding: '6px 16px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px', background: '#fff', cursor: 'pointer', color: '#374151' }}>
              Import More
            </button>
          </div>
        )}
      </Card>

      {/* Unmatched Items — Menu Matching UI */}
      {unmatchedItems.length > 0 && (
        <Card>
          <CardTitle>Match Unrecognized Items</CardTitle>
          <p style={{ color: '#6B7C93', margin: '4px 0 16px', fontSize: '13px', lineHeight: '1.6' }}>
            These item names from your CSV didn't match any registered menu. Select the correct menu item for each, or leave as "Unknown" for items no longer on your menu.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '4px', alignItems: 'center', marginBottom: '8px', fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' as const }}>
            <div>CSV Item Name</div><div></div><div>Your Menu Item</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '8px', alignItems: 'center', marginBottom: '20px' }}>
            {unmatchedItems.map(name => (
              <React.Fragment key={name}>
                <div style={{ fontSize: '13px', color: '#374151', fontWeight: 500, padding: '6px 0' }}>{name}</div>
                <div style={{ color: matchMap[name] ? '#10B981' : '#D1D5DB', fontSize: '16px' }}>→</div>
                <select
                  value={matchMap[name] || ''}
                  onChange={(e) => setMatchMap(prev => ({ ...prev, [name]: parseInt(e.target.value) || 0 }))}
                  style={{ padding: '6px 10px', border: '1px solid #D1D5DB', borderRadius: '6px', fontSize: '13px', background: matchMap[name] ? '#ECFDF5' : '#fff' }}
                >
                  <option value="">-- Leave as Unknown --</option>
                  {menuList.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
              {Object.values(matchMap).filter(v => v).length} of {unmatchedItems.length} items matched
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setUnmatchedItems([])} style={{ padding: '6px 14px', fontSize: '13px', border: '1px solid #D1D5DB', borderRadius: '6px', background: '#fff', color: '#6B7280', cursor: 'pointer' }}>
                Skip
              </button>
              {Object.values(matchMap).some(v => v) && (
                <button
                  onClick={handleApplyMatching}
                  disabled={applyingMatch}
                  style={{ padding: '6px 20px', fontSize: '13px', fontWeight: 600, border: 'none', borderRadius: '6px', background: '#635BFF', color: '#fff', cursor: 'pointer' }}
                >
                  {applyingMatch ? 'Applying...' : 'Apply Matching'}
                </button>
              )}
            </div>
          </div>

          <div style={{ marginTop: '12px', padding: '10px 14px', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', fontSize: '12px', color: '#92400E', lineHeight: '1.6' }}>
            Don't see the right menu item? <span style={{ color: '#635BFF', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => navigate(restaurantId ? `/restaurant/${restaurantId}/menu` : '#')}>Add it in Menu Management</span> first, then come back here.
          </div>
        </Card>
      )}

      {/* Import History */}
      {history.filter(h => h.import_type === 'orders').length > 0 && (
        <Card>
          <CardTitle>Import History</CardTitle>
          <p style={{ color: '#6B7C93', fontSize: '13px', margin: '4px 0 16px' }}>
            Click "Undo" to remove all orders from a specific import.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E5E7EB' }}>Date</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E5E7EB' }}>File</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #E5E7EB' }}>Imported</th>
                  <th style={{ padding: '8px 12px', textAlign: 'right', borderBottom: '1px solid #E5E7EB' }}>Failed</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #E5E7EB' }}>Status</th>
                  <th style={{ padding: '8px 12px', textAlign: 'center', borderBottom: '1px solid #E5E7EB' }}></th>
                </tr>
              </thead>
              <tbody>
                {history.filter(h => h.import_type === 'orders').map((h: any) => (
                  <tr key={h.id}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F3F4F6', whiteSpace: 'nowrap' }}>{tzFormatDateTime(h.createdAt, null)}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F3F4F6', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{h.file_name || '-'}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F3F4F6', textAlign: 'right', color: '#059669', fontWeight: 600 }}>{h.success_count}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F3F4F6', textAlign: 'right', color: h.failed_count > 0 ? '#991B1B' : '#6B7280' }}>{h.failed_count}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F3F4F6', textAlign: 'center' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 600, background: h.status === 'completed' ? '#ECFDF5' : '#FEF2F2', color: h.status === 'completed' ? '#065F46' : '#991B1B' }}>
                        {h.status === 'completed' ? 'Active' : 'Undone'}
                      </span>
                    </td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid #F3F4F6', textAlign: 'center' }}>
                      {h.status === 'completed' && (
                        <button onClick={() => handleUndo(h.batch_id)} style={{ padding: '4px 12px', fontSize: '12px', border: '1px solid #D1D5DB', borderRadius: '4px', background: '#fff', color: '#6B7280', cursor: 'pointer' }}>
                          Undo
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ImportDataTab;
