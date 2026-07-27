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

const { EXEC_TIMEOUT_MS } = require('./budget');

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

# ── Post-send condition probe (2026-07-27) ───────────────────────────────────
# WritePrinter succeeding only proves the SPOOLER accepted the bytes — it says
# nothing about paper. Out-of-paper / open cover / offline all returned a clean
# "OK" before, so the app reported a printed ticket that never existed on paper.
#
# This probe runs AFTER the write and only ever ADDS a warning line. It must
# never block or fail the job:
#   * CLAUDE.md forbids reintroducing a printer-availability GATE (the qzHasPrinter
#     incident blocked even manual printing).
#   * Once the bytes are spooled the job really does print when paper is refilled,
#     so turning this into a failure would make the poller re-arm and DUPLICATE.
# Therefore: print first, warn second. Unknown/unsupported status stays silent —
# most cheap POS-80 drivers report nothing, and a false alarm is its own harm.
#
# The probe is also HARD-BOUNDED (Fable C1): it shares this process's execFile
# deadline, and a sluggish WMI service could otherwise push an ALREADY-SPOOLED
# job past that deadline, get us killed, and make the app report a failure for a
# ticket that had already printed — which the poller would then reprint.
# 2 seconds, then we give up on the probe and leave the job reported as plain OK.
try {
  $probe = Start-Job -ScriptBlock {
    param($n)
    Get-CimInstance -ClassName Win32_Printer -ErrorAction Stop |
      Where-Object { $_.Name -eq $n } |
      Select-Object -First 1 DetectedErrorState, WorkOffline
  } -ArgumentList $PrinterName
  $pr = $null
  if (Wait-Job $probe -Timeout 2) { $pr = Receive-Job $probe }
  Remove-Job $probe -Force -ErrorAction SilentlyContinue
  if ($pr) {
    $warn = $null
    switch ([int]$pr.DetectedErrorState) {
      3 { $warn = 'LOW_PAPER' }
      4 { $warn = 'NO_PAPER' }
      7 { $warn = 'DOOR_OPEN' }
      8 { $warn = 'PAPER_JAM' }
      9 { $warn = 'OFFLINE' }
      11 { $warn = 'OUTPUT_BIN_FULL' }
    }
    if (-not $warn -and $pr.WorkOffline -eq $true) { $warn = 'OFFLINE' }
    if ($warn) { Write-Output ("WARN:" + $warn) }
  }
} catch { }
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
// Name matching is delegated to printers.matchPrinterName so the winspool leg and
// the raster/GDI leg can never disagree about which device a setting points at.
async function resolveName(printerName) {
  if (!printerName) {
    const def = await printers.getDefaultPrinter();
    if (!def) return { ok: false, error: 'NO_DEFAULT_PRINTER' };
    return { ok: true, name: def };
  }
  const names = await printers.listPrinters();
  const m = printers.matchPrinterName(names, printerName);
  if (m.ok) return { ok: true, name: m.name, matchedBy: m.matchedBy };
  return { ok: false, error: m.error, requested: m.requested, available: m.available };
}

// Stdout parsing + exec-result interpretation live in ./psResult (pure, unit-tested).
// interpretExec also keeps stderr's first line, which used to be dropped on the
// floor — a winspool failure reached the shop as a bare "WINSPOOL_ERROR" with no
// reason, undiagnosable remotely.
const { interpretExec } = require('./psResult');

function runPowerShell(printerName, dataFile) {
  return new Promise((resolve) => {
    const script = ensureScript();
    execFile(
      'powershell.exe',
      ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-File', script,
        '-PrinterName', printerName, '-FilePath', dataFile],
      { timeout: EXEC_TIMEOUT_MS, windowsHide: true },
      (err, stdout, stderr) => resolve(interpretExec(err, stdout, stderr))
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
