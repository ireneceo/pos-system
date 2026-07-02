'use strict';

// §6-3 OS-registered printer RAW ESC/POS (Windows only) — for named printers
// and the cash-drawer pulse. No native module (build/maintenance risk); instead
// a bundled PowerShell winspool helper (OpenPrinter -> StartDocPrinter RAW ->
// WritePrinter). Bytes go via a temp file; the script is written to temp at
// runtime so it works even from inside app.asar.
//
// On non-Windows (Mac dev, this Linux server) this is a stub: {ok:false,
// error:'WIN_ONLY'} — matching design §6-3.

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { app } = require('electron');
const { enqueue } = require('./serialQueue');
const printers = require('./printers');

const EXEC_TIMEOUT_MS = 15000;

const PS_SCRIPT = `param(
  [Parameter(Mandatory=$true)][string]$PrinterName,
  [Parameter(Mandatory=$true)][string]$FilePath
)
$ErrorActionPreference = 'Stop'
$sig = @'
using System;
using System.Runtime.InteropServices;
public class RawPrinterHelper {
  [StructLayout(LayoutKind.Sequential, CharSet=CharSet.Unicode)]
  public struct DOCINFO {
    [MarshalAs(UnmanagedType.LPWStr)] public string pDocName;
    [MarshalAs(UnmanagedType.LPWStr)] public string pOutputFile;
    [MarshalAs(UnmanagedType.LPWStr)] public string pDataType;
  }
  [DllImport("winspool.Drv", EntryPoint="OpenPrinterW", SetLastError=true, CharSet=CharSet.Unicode)]
  public static extern bool OpenPrinter(string src, out IntPtr hPrinter, IntPtr pd);
  [DllImport("winspool.Drv", EntryPoint="ClosePrinter", SetLastError=true)]
  public static extern bool ClosePrinter(IntPtr hPrinter);
  [DllImport("winspool.Drv", EntryPoint="StartDocPrinterW", SetLastError=true, CharSet=CharSet.Unicode)]
  public static extern bool StartDocPrinter(IntPtr hPrinter, int level, ref DOCINFO di);
  [DllImport("winspool.Drv", EntryPoint="EndDocPrinter", SetLastError=true)]
  public static extern bool EndDocPrinter(IntPtr hPrinter);
  [DllImport("winspool.Drv", EntryPoint="StartPagePrinter", SetLastError=true)]
  public static extern bool StartPagePrinter(IntPtr hPrinter);
  [DllImport("winspool.Drv", EntryPoint="EndPagePrinter", SetLastError=true)]
  public static extern bool EndPagePrinter(IntPtr hPrinter);
  [DllImport("winspool.Drv", EntryPoint="WritePrinter", SetLastError=true)]
  public static extern bool WritePrinter(IntPtr hPrinter, byte[] pBytes, int dwCount, out int dwWritten);
}
'@
Add-Type -TypeDefinition $sig
$bytes = [System.IO.File]::ReadAllBytes($FilePath)
$h = [IntPtr]::Zero
if (-not [RawPrinterHelper]::OpenPrinter($PrinterName, [ref]$h, [IntPtr]::Zero)) { throw "OpenPrinter failed" }
try {
  $di = New-Object RawPrinterHelper+DOCINFO
  $di.pDocName = "Purple POS Raw"
  $di.pDataType = "RAW"
  if (-not [RawPrinterHelper]::StartDocPrinter($h, 1, [ref]$di)) { throw "StartDocPrinter failed" }
  [RawPrinterHelper]::StartPagePrinter($h) | Out-Null
  $written = 0
  if (-not [RawPrinterHelper]::WritePrinter($h, $bytes, $bytes.Length, [ref]$written)) { throw "WritePrinter failed" }
  [RawPrinterHelper]::EndPagePrinter($h) | Out-Null
  [RawPrinterHelper]::EndDocPrinter($h) | Out-Null
} finally {
  [RawPrinterHelper]::ClosePrinter($h) | Out-Null
}
Write-Output "OK"
`;

let _scriptPath = null;
function ensureScript() {
  if (_scriptPath && fs.existsSync(_scriptPath)) return _scriptPath;
  _scriptPath = path.join(app.getPath('temp'), 'pp-rawprint.ps1');
  fs.writeFileSync(_scriptPath, PS_SCRIPT, 'utf8');
  return _scriptPath;
}

// Resolve '' to the OS default printer NAME (winspool needs a real name).
// A non-empty name not in the OS list is a hard PRINTER_NOT_FOUND (§4 contract).
async function resolveName(printerName) {
  if (!printerName) {
    const def = await printers.getDefaultPrinter();
    if (!def) return { ok: false, error: 'NO_DEFAULT_PRINTER' };
    return { ok: true, name: def };
  }
  const names = await printers.listPrinters();
  if (names.includes(printerName)) return { ok: true, name: printerName };
  return { ok: false, error: 'PRINTER_NOT_FOUND' };
}

function runPowerShell(printerName, dataFile) {
  return new Promise((resolve) => {
    const script = ensureScript();
    execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', script,
        '-PrinterName', printerName, '-FilePath', dataFile],
      { timeout: EXEC_TIMEOUT_MS, windowsHide: true },
      (err, stdout) => {
        if (err) return resolve({ ok: false, error: (err.killed ? 'TIMEOUT' : 'WINSPOOL_ERROR') });
        if (String(stdout).includes('OK')) return resolve({ ok: true });
        resolve({ ok: false, error: 'WINSPOOL_NO_OK' });
      }
    );
  });
}

async function doPrint(buffer, printerName) {
  if (process.platform !== 'win32') {
    return { ok: false, error: 'WIN_ONLY' };
  }
  const resolved = await resolveName(printerName || '');
  if (!resolved.ok) return { ok: false, error: resolved.error };

  const dataFile = path.join(app.getPath('temp'), `pp-raw-${process.pid}-${Date.now()}.bin`);
  try {
    fs.writeFileSync(dataFile, buffer);
    return await runPowerShell(resolved.name, dataFile);
  } catch (err) {
    return { ok: false, error: (err && err.message) || 'WINSPOOL_EXCEPTION' };
  } finally {
    try { fs.unlinkSync(dataFile); } catch (_) {}
  }
}

// Serialize per printer name so raw bytes stay ordered.
function printRawWindows(buffer, printerName) {
  return enqueue(`os:${printerName || '(default)'}`, () => doPrint(buffer, printerName));
}

module.exports = { printRawWindows };
