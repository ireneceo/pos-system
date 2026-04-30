import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container, Header, Title, Content,
  StatsGrid, StatCard, StatValue, StatLabel,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell,
  DataTableHeaderCell, DataTableActions, DataTableEmpty,
  Modal, ModalButton, FormRow, FormGroup, FormLabel, FormInput
} from '../../components/UI';
import { FilterBar, SearchInput } from '../../components/Common/FilterComponents';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import AlertDialog from '../../components/Common/AlertDialog';
import ConfirmDialog from '../../components/Common/ConfirmDialog';
import { getAuthToken } from '../../utils/auth';
import { formatDate } from '../../utils/timezone';

interface StaffRow {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  phone: string | null;
  pin_code: string | null;
  createdAt?: string;
}

const SupplierStaffPage: React.FC = () => {
  const { t } = useTranslation(['supplier', 'common']);

  const [rows, setRows] = useState<StaffRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<StaffRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StaffRow | null>(null);
  const [alertDlg, setAlertDlg] = useState<{ title: string; message: string } | null>(null);

  const [form, setForm] = useState({
    username: '', email: '', password: '', full_name: '', phone: '', pin_code: ''
  });

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await fetch('/api/supplier/staff', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.code === 'MODULE_NOT_INCLUDED') {
          setAlertDlg({
            title: t('supplier:staff.upgradeRequiredTitle', 'Upgrade Required') as string,
            message: t('supplier:staff.upgradeRequiredMsg', 'Staff management requires an Advanced subscription plan.') as string
          });
        }
        setRows([]);
        return;
      }
      setRows(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      console.error('Failed to load staff:', err);
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.full_name || '').toLowerCase().includes(term) ||
      (r.username || '').toLowerCase().includes(term) ||
      (r.email || '').toLowerCase().includes(term)
    );
  }, [rows, search]);

  const stats = useMemo(() => {
    const total = rows.length;
    const admin = rows.filter(r => r.role === 'Supplier Admin').length;
    const staff = rows.filter(r => r.role === 'Supplier Staff').length;
    return { total, admin, staff };
  }, [rows]);

  const resetForm = () => setForm({ username: '', email: '', password: '', full_name: '', phone: '', pin_code: '' });

  const handleAdd = async () => {
    if (!form.username || !form.email || !form.password || !form.full_name) {
      setAlertDlg({
        title: t('supplier:staff.requiredTitle', 'Required Fields') as string,
        message: t('supplier:staff.requiredMsg', 'Username, email, password, and full name are required.') as string
      });
      return;
    }
    try {
      const token = getAuthToken();
      const res = await fetch('/api/supplier/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: data.message || 'Failed to add staff' });
        return;
      }
      resetForm();
      setAddOpen(false);
      await fetchStaff();
    } catch (err: any) {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: err?.message || 'Network error' });
    }
  };

  const handleEdit = async () => {
    if (!editTarget) return;
    try {
      const token = getAuthToken();
      const updates: any = {
        full_name: form.full_name,
        phone: form.phone,
        pin_code: form.pin_code
      };
      if (form.password) updates.password = form.password;
      const res = await fetch(`/api/supplier/staff/${editTarget.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: data.message || 'Failed to update' });
        return;
      }
      setEditTarget(null);
      resetForm();
      await fetchStaff();
    } catch (err: any) {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: err?.message || 'Network error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/supplier/staff/${target.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setAlertDlg({ title: t('common:error', 'Error') as string, message: data.message || 'Failed to delete' });
        return;
      }
      await fetchStaff();
    } catch (err: any) {
      setAlertDlg({ title: t('common:error', 'Error') as string, message: err?.message || 'Network error' });
    }
  };

  const openEdit = (row: StaffRow) => {
    setEditTarget(row);
    setForm({
      username: row.username,
      email: row.email,
      password: '',
      full_name: row.full_name || '',
      phone: row.phone || '',
      pin_code: row.pin_code || ''
    });
  };

  return (
    <Container>
      <Header>
        <div><Title>{t('supplier:staff.title', 'Staff')}</Title></div>
        <ThemedButton variant="primary" onClick={() => { resetForm(); setAddOpen(true); }}>
          + {t('supplier:staff.addStaff', 'Add Staff')}
        </ThemedButton>
      </Header>

      <Content>
        <StatsGrid>
          <StatCard color="#635BFF">
            <StatValue>{stats.total}</StatValue>
            <StatLabel>{t('supplier:staff.stats.total', 'Total Members')}</StatLabel>
          </StatCard>
          <StatCard color="#10B981">
            <StatValue>{stats.admin}</StatValue>
            <StatLabel>{t('supplier:staff.stats.admin', 'Admin')}</StatLabel>
          </StatCard>
          <StatCard color="#3B82F6">
            <StatValue>{stats.staff}</StatValue>
            <StatLabel>{t('supplier:staff.stats.staff', 'Staff')}</StatLabel>
          </StatCard>
        </StatsGrid>

        <FilterBar>
          <SearchInput
            type="text"
            placeholder={t('supplier:staff.filter.search', 'Search by name, username, or email') as string}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterBar>

        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('supplier:staff.table.name', 'Name')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:staff.table.username', 'Username')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:staff.table.email', 'Email')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:staff.table.role', 'Role')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('supplier:staff.table.joined', 'Joined')}</DataTableHeaderCell>
                <DataTableHeaderCell align="right" isActions>{t('supplier:staff.table.actions', 'Actions')}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6}><DataTableEmpty>...</DataTableEmpty></td></tr>
              ) : filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <DataTableEmpty>
                      <div style={{ color: '#6B7280' }}>{t('supplier:staff.empty', 'No staff yet. Add your first team member to delegate work.')}</div>
                    </DataTableEmpty>
                  </td>
                </tr>
              ) : (
                filteredRows.map(row => (
                  <DataTableRow key={row.id}>
                    <DataTableCell>{row.full_name || '-'}</DataTableCell>
                    <DataTableCell>{row.username}</DataTableCell>
                    <DataTableCell>{row.email}</DataTableCell>
                    <DataTableCell>{t(`supplier:staff.role.${row.role}`, row.role)}</DataTableCell>
                    <DataTableCell>{row.createdAt ? formatDate(row.createdAt) : '-'}</DataTableCell>
                    <DataTableCell align="right" mobileFullWidth>
                      <DataTableActions>
                        {row.role === 'Supplier Staff' ? (
                          <>
                            <ThemedButton size="small" variant="outline" onClick={() => openEdit(row)}>
                              {t('common:edit', 'Edit')}
                            </ThemedButton>
                            <ThemedButton size="small" variant="cancel" onClick={() => setDeleteTarget(row)}>
                              {t('common:delete', 'Delete')}
                            </ThemedButton>
                          </>
                        ) : (
                          <span style={{ color: '#9CA3AF', fontSize: 12 }}>{t('supplier:staff.ownerLabel', 'Owner')}</span>
                        )}
                      </DataTableActions>
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </tbody>
          </DataTable>
        </DataTableContainer>
      </Content>

      {/* Add Modal */}
      <Modal
        isOpen={addOpen}
        onClose={() => { setAddOpen(false); resetForm(); }}
        title={t('supplier:staff.addStaff', 'Add Staff') as string}
        footer={(
          <>
            <ModalButton onClick={() => { setAddOpen(false); resetForm(); }}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={handleAdd}>
              {t('common:save', 'Save')}
            </ModalButton>
          </>
        )}
      >
        <FormGroup>
          <FormLabel>{t('supplier:staff.form.fullName', 'Full Name')} *</FormLabel>
          <FormInput value={form.full_name} onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))} />
        </FormGroup>
        <FormRow>
          <FormGroup>
            <FormLabel>{t('supplier:staff.form.username', 'Username')} *</FormLabel>
            <FormInput value={form.username} onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))} placeholder="3-30 chars" />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('supplier:staff.form.email', 'Email')} *</FormLabel>
            <FormInput type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
          </FormGroup>
        </FormRow>
        <FormRow>
          <FormGroup>
            <FormLabel>{t('supplier:staff.form.password', 'Password')} *</FormLabel>
            <FormInput type="password" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min 8 chars" />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('supplier:staff.form.phone', 'Phone')}</FormLabel>
            <FormInput value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} />
          </FormGroup>
        </FormRow>
        <FormGroup>
          <FormLabel>{t('supplier:staff.form.pin', 'PIN (4 digits, optional)')}</FormLabel>
          <FormInput value={form.pin_code} onChange={(e) => setForm(p => ({ ...p, pin_code: e.target.value.replace(/\D/g, '').slice(0, 4) }))} maxLength={4} />
        </FormGroup>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editTarget}
        onClose={() => { setEditTarget(null); resetForm(); }}
        title={t('supplier:staff.editStaff', 'Edit Staff') as string}
        footer={(
          <>
            <ModalButton onClick={() => { setEditTarget(null); resetForm(); }}>
              {t('common:cancel', 'Cancel')}
            </ModalButton>
            <ModalButton variant="primary" onClick={handleEdit}>
              {t('common:save', 'Save')}
            </ModalButton>
          </>
        )}
      >
        <FormGroup>
          <FormLabel>{t('supplier:staff.form.username', 'Username')}</FormLabel>
          <FormInput value={form.username} disabled />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('supplier:staff.form.email', 'Email')}</FormLabel>
          <FormInput value={form.email} disabled />
        </FormGroup>
        <FormGroup>
          <FormLabel>{t('supplier:staff.form.fullName', 'Full Name')} *</FormLabel>
          <FormInput value={form.full_name} onChange={(e) => setForm(p => ({ ...p, full_name: e.target.value }))} />
        </FormGroup>
        <FormRow>
          <FormGroup>
            <FormLabel>{t('supplier:staff.form.phone', 'Phone')}</FormLabel>
            <FormInput value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} />
          </FormGroup>
          <FormGroup>
            <FormLabel>{t('supplier:staff.form.pin', 'PIN (4 digits)')}</FormLabel>
            <FormInput value={form.pin_code} onChange={(e) => setForm(p => ({ ...p, pin_code: e.target.value.replace(/\D/g, '').slice(0, 4) }))} maxLength={4} />
          </FormGroup>
        </FormRow>
        <FormGroup>
          <FormLabel>{t('supplier:staff.form.newPassword', 'New Password (leave blank to keep)')}</FormLabel>
          <FormInput type="password" value={form.password} onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Min 8 chars" />
        </FormGroup>
      </Modal>

      <AlertDialog
        isOpen={!!alertDlg}
        onClose={() => setAlertDlg(null)}
        title={alertDlg?.title || ''}
        message={alertDlg?.message || ''}
      />
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title={t('supplier:staff.deleteTitle', 'Remove Staff') as string}
        message={deleteTarget
          ? (t('supplier:staff.deleteConfirm', { name: deleteTarget.full_name || deleteTarget.username, defaultValue: 'Remove {{name}} from your team? This cannot be undone.' }) as string)
          : ''}
        confirmText={t('common:delete', 'Delete') as string}
        cancelText={t('common:cancel', 'Cancel') as string}
        variant="danger"
      />
    </Container>
  );
};

export default SupplierStaffPage;
