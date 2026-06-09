/**
 * Consolidated Order Ticket — dispatch (ADDITIVE).
 *
 * Prints the WHOLE order on ONE ticket (no per-station split) to a CONFIGURABLE
 * printer (e.g. a kitchen MAIN printer), independent of the existing per-station
 * kitchen tickets. Both can print for the same order.
 *
 * This file does NOT modify the existing print path. It only:
 *   - reuses EXPORTED helpers from billPrint.js (generators + connectQZTray +
 *     getPrinterSettings), and
 *   - drives the shared `qz-tray` singleton directly for the actual send,
 *     mirroring billPrint's own sendHTMLViaQZTray / sendViaQZTray exactly
 *     (same QZ config: 80mm, 203dpi, blackwhite, margins 0 / raw base64).
 *
 * Target printer comes from printerSettings.consolidatedOrderTicket:
 *   { enabled, method: 'qztray'|'browser', address, autoPrint }
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import qz from 'qz-tray';
import {
  connectQZTray,
  getPrinterSettings,
  generateHTMLKitchenTicket,
  generateKitchenTicketContent,
  printHTMLContent,
} from './billPrint';

const isLanIP = (a: string) => /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(a || '');

export interface ConsolidatedTicketConfig {
  enabled?: boolean;
  method?: 'qztray' | 'browser' | 'rawbt';
  address?: string;
  autoPrint?: boolean;
}

export function getConsolidatedTicketConfig(): ConsolidatedTicketConfig | null {
  try {
    const ps: any = getPrinterSettings();
    return (ps && ps.consolidatedOrderTicket) || null;
  } catch {
    return null;
  }
}

/**
 * Build the single consolidated ticket from the same printData the existing
 * poller builds (items already carry name/quantity/options/set_components/
 * stationName). noStationBox + showItemStations → one ticket, all items, with
 * inline station tags so staff still see where each item goes.
 */
function buildUnified(orderData: any) {
  return {
    ...orderData,
    groupLabel: 'ORDER',
    printedAt: 'ORDER',
    noStationBox: true,
    showItemStations: true,
  };
}

/**
 * Send the consolidated ticket to the configured printer.
 * Returns true on success, false on (handled) failure — never throws to caller.
 */
export async function printConsolidatedTicket(orderData: any, storeInfo: any): Promise<boolean> {
  try {
    const cfg = getConsolidatedTicketConfig();
    if (!cfg || !cfg.enabled) return false;
    const unified = buildUnified(orderData);
    const method = cfg.method || 'qztray';
    const addr = (cfg.address || '').trim();

    if (method === 'browser') {
      try { printHTMLContent(generateHTMLKitchenTicket(unified, storeInfo), 'Order Ticket'); return true; }
      catch (e) { console.error('[consolidatedTicket] browser print failed:', e); return false; }
    }

    // QZ Tray (also covers rawbt fallback to OS printer).
    const connected = await connectQZTray();
    if (!connected) { console.error('[consolidatedTicket] QZ Tray not connected'); return false; }

    if (isLanIP(addr)) {
      // LAN thermal printer — raw ESC/POS over TCP (mirror of sendViaQZTray).
      const [host, port] = addr.split(':');
      const config = qz.configs.create(null, { host, port: parseInt(port || '9100', 10), encoding: 'UTF-8' });
      const escpos = generateKitchenTicketContent(unified, storeInfo);
      const data = btoa(unescape(encodeURIComponent(escpos)));
      await qz.print(config, [{ type: 'raw', format: 'base64', data }]);
      return true;
    }

    // OS printer name (empty = this device's OS default) — HTML pixel (mirror of
    // sendHTMLViaQZTray: Korean/design safe; raw ESC/POS would corrupt Hangul).
    let resolved = addr;
    if (!resolved) {
      try { resolved = await qz.printers.getDefault(); } catch { /* non-fatal */ }
      if (!resolved) { console.error('[consolidatedTicket] no printer name + no OS default'); return false; }
    }
    const config = qz.configs.create(resolved, {
      size: { width: 80, height: null, units: 'mm' },
      units: 'mm',
      colorType: 'blackwhite',
      density: 203,
      orientation: 'portrait',
      margins: { top: 0, right: 0, bottom: 0, left: 0 },
    });
    await qz.print(config, [{ type: 'pixel', format: 'html', flavor: 'plain', data: generateHTMLKitchenTicket(unified, storeInfo) }]);
    return true;
  } catch (e) {
    console.error('[consolidatedTicket] print failed:', e);
    return false;
  }
}

/** Test print to the currently-configured consolidated printer (Settings → Test). */
export async function testConsolidatedPrinter(storeInfo: any): Promise<boolean> {
  const sample = {
    orderNumber: 'TEST-0000',
    tableNumber: 'TEST',
    orderType: 'dine-in',
    orderSource: 'pos',
    date: new Date(),
    items: [
      { menuItem: { name: 'Consolidated Ticket Test', price: 0 }, quantity: 1, options: [], stationName: null },
    ],
  };
  return printConsolidatedTicket(sample, storeInfo || {});
}
