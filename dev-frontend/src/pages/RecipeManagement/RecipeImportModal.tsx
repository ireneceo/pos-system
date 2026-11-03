/**
 * 레시피 CSV 올리기 창 — 파일 고르기 → 미리보기(재료 고르기) → 결과 (2026-11-03 Fable 설계)
 *   설계: docs/RECIPE_MANAGEMENT_SYSTEM.md «CSV 업로드 + 표 보기» §1
 *   판정·저장은 전부 서버(services/recipeImport.js)가 한다. 이 창은 보여 주고 고르게 할 뿐이다.
 *   - CSV 형식 = 이 화면 «Download CSV» 와 같은 13열(그대로 고쳐 올리면 된다) · 빈 칸은 바꾸지 않는다.
 *   - 못 찾은·겹친 재료 이름은 레시피 폼의 재료 선택기와 **같은 목록**에서 고른다 → 서버에 다시 미리보기.
 *   - 확정은 서버가 같은 판정을 다시 해서 트랜잭션 하나로 넣는다. 되돌리기는 올린 묶음 단위.
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal, ModalButton,
  DataTableContainer, DataTable, DataTableHead, DataTableRow, DataTableCell, DataTableHeaderCell, DataTableStatus, DataTableEmpty
} from '../../components/UI';
import SearchableSelect from '../../components/Common/SearchableSelect';
import { downloadCSV, toCSVRow } from '../../utils/csvDownload';
import { getAuthToken } from '../../utils/auth';
import { formatQuantity } from '../../utils/unitConversion';
import { formatDateTime } from '../../utils/dateFormat';

/** 내려받기(RecipesTab handleDownloadCSV)와 같은 머리글 — 한쪽만 바꾸면 왕복이 깨진다 */
export const RECIPE_CSV_HEADERS = [
  'Recipe Name', 'Category', 'Source', 'Yield',
  'Ingredients', 'Recipe Summary', 'Instructions',
  'Prep Time (min)', 'Cook Time (min)',
  'Recipe Cost', 'Suggested Price',
  'Recipe Code', 'Active'
];

export interface ImportPickerOption {
  kind: 'ingredient' | 'stock_item' | 'brand_product';
  id: number;
  name: string;
  unit?: string;
  source?: string;
}

interface Candidate { kind: ImportPickerOption['kind']; id: number; name: string; unit?: string; source?: string }
interface PreviewLine {
  raw: string; name: string; quantity: number | null; unit: string | null; notes: string;
  status: 'ok' | 'ambiguous' | 'not_found' | 'duplicate' | 'invalid';
  kind: string | null; id: number | null; matched_name: string | null; candidates: Candidate[]; error: string | null;
}
interface PreviewRow {
  line: number; action: 'Create' | 'Update' | 'Unchanged' | 'Skip' | 'Error'; reason: string;
  name: string; code: string; category_name: string; category_new: boolean; ingredients: PreviewLine[]; changes: string[];
}
interface PreviewData {
  rows: PreviewRow[];
  summary: { create: number; update: number; unchanged: number; skip: number; error: number; new_categories: number };
  total_rows: number;
  new_categories: string[];
}
interface HistoryRow {
  batch_id: string; file_name: string | null; total_rows: number; created: number; updated: number;
  skipped: number; failed: number; status: 'completed' | 'undone'; created_at: string;
}
interface ExecuteResult {
  batch_id: string; created: number; updated: number; categories_created: number;
  not_imported: { line: number; name: string; action: string; reason: string }[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** `/api/brands/:id/recipes/import` 또는 `/api/restaurants/:id/recipes/import` */
  apiBase: string;
  /** 레시피 폼의 재료 선택기와 같은 목록 */
  pickerOptions: ImportPickerOption[];
  /** 선택기 목록이 도착했는가 — false 면 파일 고르기·가져오기를 잠근다(레시피 목록 속도 2026-11-03: 목록은 뒤에 받는다) */
  pickerReady?: boolean;
  /** 저장·되돌리기 뒤 목록 다시 읽기 */
  onChanged: () => void;
  /** 날짜·시간 표시 타임존(매장 설정) */
  timeZone?: string;
}

const norm = (v: string) => String(v || '').trim().replace(/\s+/g, ' ').toLowerCase();
const ACTION_VARIANT: Record<PreviewRow['action'], 'success' | 'info' | 'default' | 'warning' | 'error'> = {
  Create: 'success', Update: 'info', Unchanged: 'default', Skip: 'warning', Error: 'error'
};

const RecipeImportModal: React.FC<Props> = ({ isOpen, onClose, apiBase, pickerOptions, pickerReady = true, onChanged, timeZone }) => {
  const { t } = useTranslation(['recipes']);
  const [step, setStep] = useState<'pick' | 'preview' | 'done'>('pick');
  const [file, setFile] = useState<File | null>(null);
  const [matching, setMatching] = useState<Record<string, { kind: string; id: number }>>({});
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [result, setResult] = useState<ExecuteResult | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [undoArmed, setUndoArmed] = useState<string | null>(null);
  const [undoMessage, setUndoMessage] = useState('');

  const authHeaders = (): Record<string, string> => {
    const token = getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const loadHistory = useCallback(async () => {
    try {
      const r = await fetch(`${apiBase}/history`, { headers: authHeaders() });
      const j = await r.json();
      if (j?.success && Array.isArray(j.data)) setHistory(j.data);
    } catch { /* 기록은 보조 정보 — 실패해도 올리기는 된다 */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase]);

  useEffect(() => {
    if (!isOpen) return;
    setStep('pick'); setFile(null); setMatching({}); setPreview(null); setResult(null);
    setError(''); setUndoArmed(null); setUndoMessage('');
    loadHistory();
  }, [isOpen, loadHistory]);

  const send = async (path: 'preview' | 'execute', f: File, m: Record<string, { kind: string; id: number }>) => {
    const fd = new FormData();
    fd.append('file', f);
    fd.append('matching', JSON.stringify(m));
    const r = await fetch(`${apiBase}/${path}`, { method: 'POST', headers: authHeaders(), body: fd });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.success) throw new Error(j?.message || j?.error?.message || `Upload failed (${r.status})`);
    return j.data;
  };

  const runPreview = async (f: File, m: Record<string, { kind: string; id: number }>) => {
    setBusy(true); setError('');
    try {
      setPreview(await send('preview', f, m));
      setStep('preview');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    e.target.value = '';
    if (!f) return;
    setFile(f); setMatching({});
    runPreview(f, {});
  };

  const choose = (name: string, value: string | number | null) => {
    if (!file) return;
    const next = { ...matching };
    if (value == null || value === '') delete next[norm(name)];
    else {
      const [kind, id] = String(value).split(':');
      next[norm(name)] = { kind, id: Number(id) };
    }
    setMatching(next);
    runPreview(file, next);
  };

  const importCount = preview ? preview.summary.create + preview.summary.update : 0;

  const runExecute = async () => {
    if (!file || !importCount) return;
    setBusy(true); setError('');
    try {
      setResult(await send('execute', file, matching));
      setStep('done');
      onChanged();
      loadHistory();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const runUndo = async (batchId: string) => {
    if (undoArmed !== batchId) { setUndoArmed(batchId); return; }
    setBusy(true); setError(''); setUndoMessage('');
    try {
      const r = await fetch(`${apiBase}/${encodeURIComponent(batchId)}/undo`, { method: 'POST', headers: authHeaders() });
      const j = await r.json().catch(() => null);
      if (!r.ok || !j?.success) throw new Error(j?.message || `Undo failed (${r.status})`);
      const d = j.data;
      let msg = t('recipes:recipeImport.undoDone', 'Undone — {{deleted}} removed · {{restored}} restored', { deleted: d.deleted, restored: d.restored });
      if (d.skipped?.length) msg += ` · ${t('recipes:recipeImport.undoSkipped', '{{count}} not undone (changed after the import): {{names}}', { count: d.skipped.length, names: d.skipped.map((s: any) => s.name).join(', ') })}`;
      setUndoMessage(msg);
      setUndoArmed(null);
      onChanged();
      loadHistory();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const downloadTemplate = () => downloadCSV(toCSVRow(RECIPE_CSV_HEADERS), 'recipes_template.csv');

  const optionList = useMemo(() => pickerOptions.map((o) => ({
    value: `${o.kind}:${o.id}`,
    label: o.name,
    subLabel: [o.unit, o.source].filter(Boolean).join(' · ')
  })), [pickerOptions]);

  const fmtDate = (iso: string) => formatDateTime(iso, timeZone);

  const actionLabel = (a: PreviewRow['action']) => ({
    Create: t('recipes:recipeImport.actCreate', 'New'),
    Update: t('recipes:recipeImport.actUpdate', 'Update'),
    Unchanged: t('recipes:recipeImport.actUnchanged', 'Unchanged'),
    Skip: t('recipes:recipeImport.actSkip', 'Skip'),
    Error: t('recipes:recipeImport.actError', 'Error')
  }[a]);

  const historyBlock = (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>{t('recipes:recipeImport.recent', 'Recent uploads')}</div>
      {history.length === 0 ? (
        <DataTableEmpty>{t('recipes:recipeImport.noHistory', 'No uploads yet')}</DataTableEmpty>
      ) : (
        <DataTableContainer>
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell align="left">{t('recipes:recipeImport.colDate', 'Date')}</DataTableHeaderCell>
                <DataTableHeaderCell align="left">{t('recipes:recipeImport.colFile', 'File')}</DataTableHeaderCell>
                <DataTableHeaderCell>{t('recipes:recipeImport.colResult', 'Result')}</DataTableHeaderCell>
                <DataTableHeaderCell isActions>{''}</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <tbody>
              {history.map((h) => (
                <DataTableRow key={h.batch_id}>
                  <DataTableCell align="left">{fmtDate(h.created_at)}</DataTableCell>
                  <DataTableCell align="left">{h.file_name || '—'}</DataTableCell>
                  <DataTableCell>
                    {t('recipes:recipeImport.historyCounts', '{{created}} new · {{updated}} updated', { created: h.created, updated: h.updated })}
                  </DataTableCell>
                  <DataTableCell>
                    {h.status === 'undone' ? (
                      <DataTableStatus variant="default">{t('recipes:recipeImport.undone', 'Undone')}</DataTableStatus>
                    ) : (
                      <ModalButton type="button" variant={undoArmed === h.batch_id ? 'danger' : 'secondary'} disabled={busy} onClick={() => runUndo(h.batch_id)}>
                        {undoArmed === h.batch_id ? t('recipes:recipeImport.confirmUndo', 'Confirm undo') : t('recipes:recipeImport.undo', 'Undo')}
                      </ModalButton>
                    )}
                  </DataTableCell>
                </DataTableRow>
              ))}
            </tbody>
          </DataTable>
        </DataTableContainer>
      )}
    </div>
  );

  const ingredientCell = (row: PreviewRow) => {
    if (!row.ingredients.length) return <span style={{ color: '#6B7280' }}>—</span>;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 240 }}>
        {row.ingredients.map((l, i) => {
          const qty = l.quantity != null ? `${formatQuantity(l.quantity)}${l.unit ? ` ${l.unit}` : ''}` : '';
          const needsPick = l.status === 'ambiguous' || l.status === 'not_found';
          const picked = matching[norm(l.name)];
          return (
            <div key={i} style={{ fontSize: 13 }}>
              <div style={{ color: l.status === 'ok' ? '#0A2540' : '#B91C1C' }}>
                {l.status === 'ok' || l.matched_name ? <>{l.matched_name || l.name}{qty ? ` · ${qty}` : ''}{l.notes ? ` (${l.notes})` : ''}</> : l.raw}
                {l.status === 'not_found' && ` — ${t('recipes:recipeImport.notFound', 'not found')}`}
                {l.status === 'ambiguous' && ` — ${t('recipes:recipeImport.several', 'several matches')}`}
                {(l.status === 'duplicate' || l.status === 'invalid') && l.error && ` — ${l.error}`}
              </div>
              {(needsPick || picked) && (
                <div style={{ marginTop: 4 }}>
                  <SearchableSelect
                    options={l.status === 'ambiguous'
                      ? l.candidates.map((c) => ({ value: `${c.kind}:${c.id}`, label: c.name, subLabel: [c.unit, c.source].filter(Boolean).join(' · ') }))
                      : optionList}
                    value={picked ? `${picked.kind}:${picked.id}` : null}
                    onChange={(v) => choose(l.name, v)}
                    placeholder={t('recipes:recipeImport.chooseIngredient', 'Choose ingredient for «{{name}}»', { name: l.name }) as string}
                    allowClear
                    disabled={busy}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const footer = step === 'pick' ? (
    <ModalButton type="button" variant="secondary" onClick={onClose}>{t('recipes:recipeImport.close', 'Close')}</ModalButton>
  ) : step === 'preview' ? (
    <>
      <ModalButton type="button" variant="secondary" disabled={busy} onClick={() => { setStep('pick'); setPreview(null); setFile(null); setMatching({}); }}>
        {t('recipes:recipeImport.back', 'Choose another file')}
      </ModalButton>
      <ModalButton type="button" variant="primary" disabled={busy || !importCount || !pickerReady} onClick={runExecute}>
        {t('recipes:recipeImport.importBtn', 'Import {{count}} recipes', { count: importCount })}
      </ModalButton>
    </>
  ) : (
    <ModalButton type="button" variant="primary" onClick={onClose}>{t('recipes:recipeImport.close', 'Close')}</ModalButton>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('recipes:recipeImport.title', 'Upload recipes (CSV)')} size="large" maxWidth="1100px" footer={footer}>
      {error && (
        <div role="alert" style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 12 }}>
          {error}
        </div>
      )}
      {undoMessage && (
        <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', color: '#047857', borderRadius: 8, padding: '10px 12px', fontSize: 13, marginBottom: 12 }}>
          {undoMessage}
        </div>
      )}

      {step === 'pick' && (
        <div>
          <ul style={{ margin: '0 0 16px', paddingLeft: 18, fontSize: 14, color: '#374151', lineHeight: 1.7 }}>
            <li>{t('recipes:recipeImport.hintSame', 'If the columns match the downloaded CSV, you can upload it as is.')}</li>
            <li>{t('recipes:recipeImport.hintBlank', 'Empty cells are not changed.')}</li>
            <li>{t('recipes:recipeImport.hintMatch', 'A row with a Recipe Code updates that recipe; without a code, a recipe with the same name is updated; otherwise a new recipe is made.')}</li>
            <li>{t('recipes:recipeImport.hintIngredients', 'Ingredients: «Name quantity unit (note); …». Only ingredients already in your list are used — new ingredients are never created.')}</li>
            <li>{t('recipes:recipeImport.hintLimits', 'Up to 500 rows · 2 MB. Nothing is saved until you press Import.')}</li>
          </ul>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'inline-flex' }}>
              <input type="file" accept=".csv,text/csv" onChange={onFile} disabled={busy || !pickerReady} style={{ display: 'none' }} data-testid="recipe-import-file" />
              <span style={{
                display: 'inline-flex', alignItems: 'center', padding: '10px 18px', borderRadius: 8, background: (busy || !pickerReady) ? '#A5A0FF' : '#635BFF',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: (busy || !pickerReady) ? 'wait' : 'pointer'
              }}>
                {busy ? t('recipes:recipeImport.checking', 'Checking…')
                  : !pickerReady ? t('recipes:recipesTab.loadingIngredients', 'Loading ingredients… You can save once the list is ready.')
                  : t('recipes:recipeImport.chooseFile', 'Choose CSV file')}
              </span>
            </label>
            <ModalButton type="button" variant="secondary" onClick={downloadTemplate}>
              {t('recipes:recipeImport.template', 'Download template')}
            </ModalButton>
          </div>
          {historyBlock}
        </div>
      )}

      {step === 'preview' && preview && (
        <div>
          <div style={{ fontSize: 14, color: '#0A2540', marginBottom: 6, fontWeight: 600 }}>
            {file?.name} — {t('recipes:recipeImport.summary', '{{create}} new · {{update}} updated · {{unchanged}} unchanged · {{skip}} skipped · {{error}} errors', preview.summary)}
          </div>
          {preview.new_categories.length > 0 && (
            <div style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>
              {t('recipes:recipeImport.newCats', 'New categories will be added: {{names}}', { names: preview.new_categories.join(', ') })}
            </div>
          )}
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>
            {t('recipes:recipeImport.errorNote', 'Rows marked Error or Skip are not imported. Choose the missing ingredients to fix those rows.')}
          </div>
          <DataTableContainer>
            <DataTable>
              <DataTableHead>
                <tr>
                  <DataTableHeaderCell>{t('recipes:recipeImport.colLine', 'Line')}</DataTableHeaderCell>
                  <DataTableHeaderCell>{t('recipes:recipeImport.colAction', 'Action')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('recipes:recipeImport.colRecipe', 'Recipe')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('recipes:recipeImport.colCategory', 'Category')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('recipes:recipeImport.colIngredients', 'Ingredients')}</DataTableHeaderCell>
                  <DataTableHeaderCell align="left">{t('recipes:recipeImport.colReason', 'Reason')}</DataTableHeaderCell>
                </tr>
              </DataTableHead>
              <tbody>
                {preview.rows.map((r) => (
                  <DataTableRow key={r.line}>
                    <DataTableCell>{r.line}</DataTableCell>
                    <DataTableCell><DataTableStatus variant={ACTION_VARIANT[r.action]}>{actionLabel(r.action)}</DataTableStatus></DataTableCell>
                    <DataTableCell align="left" style={{ minWidth: 150 }}>
                      <div style={{ fontWeight: 600 }}>{r.name || '—'}</div>
                      {r.code && <div style={{ fontSize: 12, color: '#6B7280' }}>{r.code}</div>}
                    </DataTableCell>
                    <DataTableCell align="left">
                      {r.category_name || '—'}
                      {r.category_new && <div style={{ fontSize: 12, color: '#6B7280' }}>{t('recipes:recipeImport.newCategory', 'new category')}</div>}
                    </DataTableCell>
                    <DataTableCell align="left">{ingredientCell(r)}</DataTableCell>
                    <DataTableCell align="left" style={{ minWidth: 200, maxWidth: 320, fontSize: 13, color: r.action === 'Error' ? '#B91C1C' : '#374151' }}>{r.reason || '—'}</DataTableCell>
                  </DataTableRow>
                ))}
              </tbody>
            </DataTable>
          </DataTableContainer>
        </div>
      )}

      {step === 'done' && result && (
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#0A2540', marginBottom: 6 }}>
            {t('recipes:recipeImport.doneTitle', 'Imported')} — {t('recipes:recipeImport.historyCounts', '{{created}} new · {{updated}} updated', { created: result.created, updated: result.updated })}
          </div>
          {result.categories_created > 0 && (
            <div style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>
              {t('recipes:recipeImport.catsCreated', '{{count}} new categories added', { count: result.categories_created })}
            </div>
          )}
          {result.not_imported.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t('recipes:recipeImport.notImported', 'Not imported')}</div>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#374151' }}>
                {result.not_imported.map((n) => (
                  <li key={n.line}>{t('recipes:recipeImport.colLine', 'Line')} {n.line} · {n.name || '—'} · {actionLabel(n.action as PreviewRow['action'])} — {n.reason}</li>
                ))}
              </ul>
            </div>
          )}
          <div style={{ marginTop: 16 }}>
            <ModalButton type="button" variant={undoArmed === result.batch_id ? 'danger' : 'secondary'} disabled={busy || !!undoMessage} onClick={() => runUndo(result.batch_id)}>
              {undoArmed === result.batch_id ? t('recipes:recipeImport.confirmUndo', 'Confirm undo') : t('recipes:recipeImport.undoImport', 'Undo this import')}
            </ModalButton>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RecipeImportModal;
