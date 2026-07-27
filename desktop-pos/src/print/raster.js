'use strict';

// ESC/POS raster image encoder — turns a rendered ticket bitmap into GS v 0
// raster bytes that go out the ALREADY-PROVEN raw transport (rawWindows winspool /
// rawLan socket), the same path the kitchen order ticket prints on today.
//
// WHY (with MIN blank-bill saga, 2026-07-15): the HTML pixel path used
// webContents.print({silent,deviceName}) which hands the job to the Windows GDI
// PRINT DRIVER. Cheap POS-80 thermal drivers render that silent raster job as
// BLANK paper (the same driver prints fine from the Chrome dialog — a different
// code path). The fix is to stop trusting the driver: render the HTML in Chromium,
// capture the painted pixels, encode them as ESC/POS raster, and send the bytes
// straight to the printer firmware (GS v 0), which every thermal printer executes
// natively. Driver-independent, and Korean/logo come out because Chromium already
// rasterized them into the bitmap. Same principle QZ Tray's "pixel" mode used.
//
// Pure Node (no Electron) so it is unit-tested by test/print-units.js.

// ESC/POS control bytes.
const INIT = Buffer.from([0x1b, 0x40]);            // ESC @   — reset
const FEED = Buffer.from([0x0a, 0x0a, 0x0a, 0x0a]); // 4 line feeds before cut
const CUT = Buffer.from([0x1d, 0x56, 0x01]);        // GS V 1  — partial cut

// GS v 0 has a 16-bit height field, but many POS-80 firmwares choke on a single
// very tall raster (limited line buffer). Split into horizontal bands — the
// canonical approach used by escpos libraries.
const BAND_ROWS = 128;

// Decide whether one pixel prints (black dot). Input bitmap is Electron
// NativeImage.getBitmap(): tightly packed BGRA, 4 bytes/pixel, top-to-bottom.
// Transparent (low alpha) = paper white. Otherwise luminance threshold.
function isBlack(bmp, idx, threshold) {
  const b = bmp[idx];
  const g = bmp[idx + 1];
  const r = bmp[idx + 2];
  const a = bmp[idx + 3];
  if (a < 128) return false;                        // transparent → white
  const lum = (r * 299 + g * 587 + b * 114) / 1000; // Rec.601 luminance
  return lum < threshold;
}

// Encode a BGRA bitmap to GS v 0 raster command bytes (image only — no init/cut).
// bmp: Buffer (width*height*4, BGRA). Returns a Buffer of one or more banded
// `GS v 0` commands. widthBytes = ceil(width/8); each bit is one dot, MSB = left,
// bit set = black.
function encodeRaster(bmp, width, height, opts) {
  const threshold = (opts && opts.threshold) || 128;
  const widthBytes = Math.ceil(width / 8);
  const chunks = [];

  for (let y0 = 0; y0 < height; y0 += BAND_ROWS) {
    const rows = Math.min(BAND_ROWS, height - y0);
    const header = Buffer.from([
      0x1d, 0x76, 0x30, 0x00,          // GS v 0, m=0 (normal)
      widthBytes & 0xff, (widthBytes >> 8) & 0xff,
      rows & 0xff, (rows >> 8) & 0xff
    ]);
    const data = Buffer.alloc(widthBytes * rows, 0);
    for (let y = 0; y < rows; y++) {
      const srcRow = (y0 + y) * width * 4;
      const dstRow = y * widthBytes;
      for (let x = 0; x < width; x++) {
        if (isBlack(bmp, srcRow + x * 4, threshold)) {
          data[dstRow + (x >> 3)] |= (0x80 >> (x & 7));
        }
      }
    }
    chunks.push(header, data);
  }
  return Buffer.concat(chunks);
}

// Wrap already-encoded raster band bytes into a full print document:
// reset → image → feed → ONE partial cut.
//
// Split out (2026-07-27) because a tall ticket is captured in several slices and
// must still come out as a SINGLE receipt — concatenating whole documents would
// emit an INIT and a CUT between slices, tearing one bill into pieces.
function wrapRasterDocument(imageBytes) {
  return Buffer.concat([INIT, imageBytes, FEED, CUT]);
}

// Full print document from a single bitmap. This is what gets handed to
// rawWindows/rawLan, exactly like a raw ESC/POS text ticket.
function buildRasterDocument(bmp, width, height, opts) {
  return wrapRasterDocument(encodeRaster(bmp, width, height, opts));
}

// Printable dot width for a paper size. 80mm paper = 72mm print area = 576 dots
// at 203dpi (industry standard for POS-80). 58mm = 384 dots.
function dotsForWidthMm(widthMm) {
  return (Number(widthMm) || 80) >= 80 ? 576 : 384;
}

module.exports = { encodeRaster, buildRasterDocument, wrapRasterDocument, dotsForWidthMm, BAND_ROWS };
