/* Print-route regression gate — QZ Tray spy.
 *
 * Aliased in place of the real `qz-tray` when bundling billPrint.js for the gate
 * (scripts/print-route-guard/run.js). Records the transport calls billPrint.js
 * would make to a real QZ Tray, as normalized strings on window.__LOG, instead of
 * opening a websocket / hitting a printer. Lets the WEB (non-native) QZ path be
 * observed end-to-end with no QZ Tray and no paper.
 *
 * DO NOT ship in the app bundle — this file exists only for the gate.
 */
let active = false;
const qz = {
  websocket: {
    isActive: () => active,
    connect: async () => { active = true; return true; },
    disconnect: async () => { active = false; return true; },
  },
  api: { getVersion: async () => '2.2.5', setPromiseType: () => {}, setSha256Type: () => {} },
  security: { setCertificatePromise: () => {}, setSignaturePromise: () => {}, setSignatureAlgorithm: () => {} },
  configs: {
    create: (name, opts) => ({ __printerName: name === null ? null : name, __opts: opts || null }),
  },
  print: async (config, payloads) => {
    try {
      const name = config && config.__printerName;
      const opts = config && config.__opts;
      const types = (payloads || []).map(p => p && p.type);
      let s;
      if (types.indexOf('pixel') >= 0) s = 'qzPixel:' + (name || '');
      else if (types.indexOf('raw') >= 0) s = (opts && opts.host) ? ('qzRaw:' + opts.host) : ('qzRaw(drawer):' + (name || ''));
      else s = 'qzUnknown:' + (name || '');
      (window.__LOG = window.__LOG || []).push(s);
    } catch (e) { /* ignore */ }
    return true;
  },
  printers: {
    find: async () => ['POS-80C', 'KITCHEN 1', 'KITCHEN 2', 'BAR'],
    getDefault: async () => 'OS-DEFAULT',
  },
};
export default qz;
