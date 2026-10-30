// @ts-check
/**
 * 2026-10-30 Irene «영수증이나 인보이스를 업로드하면 재업로드 기능이 나와야 해. 그래서 재업로드하면 이전 거
 *   그냥 삭제하면 될 것 같아. 삭제도 가능해야 하지 않아?»
 *   발주 상세 «Re-upload / delete» · 발주 목록 «영수증 보기» → 파일 관리 창(열기·다시 올리기·삭제).
 * 데모 매장 38 · 외부 업체 발주 PO-R38-20261022-002 — 끝나면 인보이스·영수증·결제 상태를 처음 값으로 되돌린다.
 */
const { test, expect } = require('@playwright/test');
const fs = require('fs');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');

const Q = (sql, rep) => sequelize.query(sql, { replacements: rep, type: sequelize.QueryTypes.SELECT });
const W = (sql, rep) => sequelize.query(sql, { replacements: rep });
let ra, po, orig, origFiles;
const PDF = { name: 'check-invoice.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 e2e') };
const diskOf = (u) => '/var/www' + u;

test.beforeAll(async () => {
  [ra] = await Q("SELECT id FROM users WHERE email = 'demo-restaurant@purplehere.com'");
  [po] = await Q(`SELECT p.id, p.po_number FROM purchase_orders p JOIN restaurants r ON r.id = p.entity_id AND r.is_demo = 1
    WHERE p.po_number = 'PO-R38-20261022-002' AND p.entity_type = 'restaurant' LIMIT 1`);
  if (po) [orig] = await Q('SELECT external_invoice_url, external_invoice_filename, external_invoice_uploaded_at, receipt_url, receipt_filename, receipt_uploaded_at, payment_status FROM purchase_orders WHERE id = :p', { p: po.id });
  // 처음 올리기가 서버에서 «옛 파일 삭제» 를 일으킨다 — 이 발주가 원래 가리키던 파일은 바이트를 들고 있다가 끝에 되돌린다
  //   (2026-10-30 Fable 게이트: DB 만 되돌리면 데모 링크가 빈 파일을 가리킨 채 남았다)
  origFiles = {};
  for (const u of [orig?.external_invoice_url, orig?.receipt_url]) {
    if (u && fs.existsSync(diskOf(u))) origFiles[u] = fs.readFileSync(diskOf(u));
  }
});
test.afterAll(async () => {
  if (po && orig) {
    await W(`UPDATE purchase_orders SET external_invoice_url = :a, external_invoice_filename = :b, external_invoice_uploaded_at = :c,
      receipt_url = :d, receipt_filename = :e, receipt_uploaded_at = :f, payment_status = :g WHERE id = :p`,
    { a: orig.external_invoice_url, b: orig.external_invoice_filename, c: orig.external_invoice_uploaded_at, d: orig.receipt_url,
      e: orig.receipt_filename, f: orig.receipt_uploaded_at, g: orig.payment_status, p: po.id });
    for (const [u, bytes] of Object.entries(origFiles || {})) {
      if (!fs.existsSync(diskOf(u))) fs.writeFileSync(diskOf(u), bytes);
    }
  }
  await sequelize.close().catch(() => {});
});

const login = async (page) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const token = jwt.sign({ userId: ra.id }, process.env.JWT_SECRET, { expiresIn: '15m' });
  await page.context().addInitScript((t) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Admin');
  }, token);
  return errors;
};
const row = async () => (await Q('SELECT external_invoice_url, receipt_url FROM purchase_orders WHERE id = :p', { p: po.id }))[0];

test('발주 상세: 인보이스 다시 올리기 → 옛 파일 삭제 · 삭제 → 칸 비움', async ({ page }) => {
  test.skip(!ra || !po, '데모 RA 또는 발주 없음');
  const errors = await login(page);
  let first = orig.external_invoice_url;
  if (!first) {
    // 인보이스가 없을 때만 — 첫 인보이스는 기존 «Upload Inv.» 길(목록)로 올린다(있으면 그 칸 대신 «Invoice» 버튼이라 input 이 없다)
    await page.goto('/pos/purchase-orders/history', { waitUntil: 'domcontentloaded' });
    const listRow = page.locator('tr', { hasText: po.po_number }).first();
    await listRow.waitFor({ timeout: 30000 });
    await listRow.locator('input[type=file]').first().setInputFiles(PDF);
    await expect.poll(async () => (await row()).external_invoice_url, { timeout: 15000 }).not.toBeNull();
    first = (await row()).external_invoice_url;
  }

  await page.goto(`/pos/purchase-orders/${po.id}`, { waitUntil: 'domcontentloaded' });
  await page.getByTestId('po-detail-invoice-manage').click({ timeout: 30000 });
  await expect(page.getByText('Re-uploading replaces this file and deletes the old one.')).toBeVisible();
  await page.getByTestId('po-file-input').setInputFiles({ ...PDF, name: 'check-invoice-2.pdf' });
  await expect.poll(async () => (await row()).external_invoice_url, { timeout: 15000 }).not.toBe(first);
  const second = (await row()).external_invoice_url;
  expect(fs.existsSync(diskOf(first))).toBe(false);
  expect(fs.existsSync(diskOf(second))).toBe(true);

  await page.getByTestId('po-detail-invoice-manage').click({ timeout: 15000 });
  await page.getByTestId('po-file-delete').click();
  await expect(page.getByText('The invoice file will be deleted. Prices and totals already checked stay as they are.')).toBeVisible();
  await page.getByTestId('po-file-delete-confirm').click();
  await expect.poll(async () => (await row()).external_invoice_url, { timeout: 15000 }).toBeNull();
  expect(fs.existsSync(diskOf(second))).toBe(false);
  await expect(page.getByTestId('po-detail-invoice-manage')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('발주 목록: 영수증 보기 → 다시 올리기 · 삭제', async ({ page }) => {
  test.skip(!ra || !po, '데모 RA 또는 발주 없음');
  await W("UPDATE purchase_orders SET payment_status = 'paid' WHERE id = :p", { p: po.id });
  const errors = await login(page);
  await page.goto('/pos/purchase-orders/history', { waitUntil: 'domcontentloaded' });
  const listRow = page.locator('tr', { hasText: po.po_number }).first();
  await listRow.waitFor({ timeout: 30000 });
  // 첫 영수증 — 기존 «영수증 첨부» 버튼(동적 file input)
  const chooser = page.waitForEvent('filechooser');
  await listRow.getByRole('button', { name: 'Attach receipt' }).click();
  await (await chooser).setFiles({ ...PDF, name: 'check-receipt.pdf' });
  await expect.poll(async () => (await row()).receipt_url, { timeout: 15000 }).not.toBeNull();
  const first = (await row()).receipt_url;

  await listRow.getByRole('button', { name: 'View receipt' }).click({ timeout: 15000 });
  await expect(page.getByText('Attached receipt')).toBeVisible();
  await page.getByTestId('po-file-input').setInputFiles({ ...PDF, name: 'check-receipt-2.pdf' });
  await expect.poll(async () => (await row()).receipt_url, { timeout: 15000 }).not.toBe(first);
  expect(fs.existsSync(diskOf(first))).toBe(false);
  const second = (await row()).receipt_url;

  await listRow.getByRole('button', { name: 'View receipt' }).click({ timeout: 15000 });
  await page.getByTestId('po-file-delete').click();
  await page.getByTestId('po-file-delete-confirm').click();
  await expect.poll(async () => (await row()).receipt_url, { timeout: 15000 }).toBeNull();
  expect(fs.existsSync(diskOf(second))).toBe(false);
  await expect(listRow.getByRole('button', { name: 'Attach receipt' })).toBeVisible();
  expect(errors).toEqual([]);
});
