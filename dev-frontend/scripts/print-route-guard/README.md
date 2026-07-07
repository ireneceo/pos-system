# Print-Route Guard 🖨️

Fail-closed regression gate for **auto-print routing** — proves every print route reaches
the correct printer/transport, up to the physical paper (the one thing code can't verify).

Sibling of `dev-backend/scripts/inspection` (structural DB invariants). This one exercises
the **frontend print dispatch** (`src/utils/billPrint.js`) — the store lifeline.

## What it does

Bundles the REAL `billPrint.js` with a QZ-Tray **spy** (records instead of printing), then
runs the exact dispatch entries the auto-print poller uses
(`printKitchenTicketViaRawBT` / `printBillViaRawBT`) across a matrix of configs, asserting
which transport call would hit the printer:

- **method**: browser (OS default) · qztray by printer **name** · qztray by **LAN-IP** · RawBT
- **printer**: bill · single kitchen · multi-station (KQ1 + BAR on different printers)
- **runtime**: native desktop app (`__NATIVE_PRINT`) · web (QZ Tray)
- **extras**: print copies (1–3) · emergency mode (kitchen→bill) · the `if(!address) return false`
  guard (empty qztray address must NOT phantom-print)

It observes the transport boundary only — no QZ Tray, no printer, no paper, no network
(local origin server + in-tmp webpack bundle). Deterministic.

## Run

```bash
cd /var/www/dev-frontend
node scripts/print-route-guard/run.js            # verbose (per-route table)
node scripts/print-route-guard/run.js --quiet     # summary + failures only (gate mode)
```

Exit 0 = all routes correct. Exit 1 = a route mis-routed / phantom / dropped → blocks deploy.

## Where it runs

- **Deploy gate 7/7** in `deploy-to-production.sh` (fail-closed; bypass only via `--skip-safety`).
- **`/검증` step 0-c** during development.

## Adding a route

"피드백 1건 = 루트 1개." When a print routing bug is found/fixed, add a case to
[`cases.js`](./cases.js) so the class of bug is frozen as a regression.

If you make a **deliberate** routing change, update the expected transport in `cases.js`
in the same commit (this gate has no `--bless`; the expectations ARE the contract).

## Files

- `run.js` — bundler + local server + Chromium runner + assertions
- `cases.js` — the route matrix (config → expected transport). Single source of the contract.
- `qz-spy.js` — fake `qz-tray` (records `qz.print` calls). Gate-only; never shipped.

Single truth: CLAUDE.md 🔒 print section + memories `reference_kitchen_print_pipeline`,
`reference_print_single_poller_architecture`.
