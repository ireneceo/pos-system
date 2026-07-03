package com.purplehere.pos.mobile

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Build
import android.util.Base64
import android.webkit.WebView
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.dantsu.escposprinter.EscPosPrinterCommands
import com.dantsu.escposprinter.connection.bluetooth.BluetoothConnection
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.WebViewListener
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import java.io.ByteArrayOutputStream
import java.net.Socket
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.math.min

/**
 * Backs window.__NATIVE_PRINT for the Android POS app (design §7). This is the
 * exact §4 contract billPrint already feature-detects, so the remote web app
 * prints natively with ZERO frontend changes — the mirror of the Windows
 * Electron main process.
 *
 * Never throws — every method resolves { ok, error? }. A printer NAME that
 * matches nothing = PRINTER_NOT_FOUND (no silent fallback — §7-1, the thefire
 * BAR "success-looking non-print" lesson).
 *
 *  - printRaw  : pre-built ESC/POS bytes (base64) -> LAN socket or BT SPP.
 *  - printHtml : offscreen WebView -> bitmap -> ESC/POS raster (한글 보존, §7-2).
 *  - openDrawer: 1B 70 00 64 64 pulse, routed like printRaw (§7-3).
 *  - listPrinters / getDefaultPrinter : name registry (§7-1).
 *
 * Serialization (§7-3): one single-thread lane per destination
 * (html / lan:<host> / bt:<mac>) — printers run in parallel, jobs to the same
 * printer run in order (mirrors the Windows serialQueue / QZ single-queue).
 */
@CapacitorPlugin(
    name = "NativePrint",
    permissions = [
        Permission(alias = "bluetooth", strings = [Manifest.permission.BLUETOOTH_CONNECT])
    ]
)
class NativePrintPlugin : Plugin() {

    private val registry by lazy { PrinterRegistry(context) }
    private val lanes = ConcurrentHashMap<String, ExecutorService>()

    override fun load() {
        super.load()
        // Bonded-only (no scan) — request BLUETOOTH_CONNECT once on API 31+.
        ensureBtPermissionRequested()
        // The remote page loads via Capacitor; the IIFE nativePrintBridge.js is
        // NOT auto-run (§7-5) — inject it on every page load (idempotent).
        try {
            bridge.addWebViewListener(object : WebViewListener() {
                override fun onPageLoaded(webView: WebView) {
                    injectBridge(webView)
                }
            })
        } catch (e: Exception) { /* non-fatal */ }
    }

    // ---- printRaw: pre-built ESC/POS bytes to a resolved destination ----------
    @PluginMethod
    fun printRaw(call: PluginCall) {
        val data = call.getString("data") ?: return ok(call, false, "BAD_DATA")
        val target = resolveTarget(call.getObject("target"))
            ?: return ok(call, false, "PRINTER_NOT_FOUND")
        submit(laneKey(target)) {
            try {
                writeRaw(target, Base64.decode(data, Base64.DEFAULT))
                ok(call, true, null)
            } catch (e: SecurityException) {
                ok(call, false, "BT_PERMISSION")
            } catch (e: Exception) {
                ok(call, false, e.message ?: "WRITE_ERROR")
            }
        }
    }

    // ---- openDrawer: drawer-kick pulse, same routing as printRaw --------------
    @PluginMethod
    fun openDrawer(call: PluginCall) {
        // billPrint passes the target object at the ROOT (not nested).
        val target = resolveTarget(call.data)
            ?: return ok(call, false, "PRINTER_NOT_FOUND")
        submit(laneKey(target)) {
            try {
                writeRaw(target, byteArrayOf(0x1B, 0x70, 0x00, 0x64, 0x64))
                ok(call, true, null)
            } catch (e: SecurityException) {
                ok(call, false, "BT_PERMISSION")
            } catch (e: Exception) {
                ok(call, false, e.message ?: "WRITE_ERROR")
            }
        }
    }

    // ---- printHtml: HTML -> offscreen bitmap -> ESC/POS raster ----------------
    @PluginMethod
    fun printHtml(call: PluginCall) {
        val html = call.getString("html") ?: return ok(call, false, "BAD_HTML")
        val printerName = call.getString("printerName")
        val widthMm = call.getInt("widthMm") ?: 80
        val copies = (call.getInt("copies") ?: 1).coerceIn(1, 10)
        val target = registry.resolve(printerName)
            ?: return ok(call, false, "PRINTER_NOT_FOUND")
        val widthPx = if (widthMm in 1..69) 384 else 576 // 58mm=384, 80mm=576 @203dpi
        submit("html") {
            try {
                val bmp = OffscreenHtmlRenderer.render(context, html, widthPx, TIMEOUT_MS)
                    ?: return@submit ok(call, false, "TIMEOUT")
                val payload = rasterize(bmp, copies)
                bmp.recycle()
                writeRaw(target, payload)
                ok(call, true, null)
            } catch (e: SecurityException) {
                ok(call, false, "BT_PERMISSION")
            } catch (e: Exception) {
                ok(call, false, e.message ?: "PRINT_ERROR")
            }
        }
    }

    // ---- registry-backed discovery -------------------------------------------
    @PluginMethod
    fun listPrinters(call: PluginCall) {
        ensureBtPermissionRequested()
        val arr = JSArray()
        registry.listNames().forEach { arr.put(it) }
        val r = JSObject(); r.put("printers", arr); call.resolve(r)
    }

    @PluginMethod
    fun getDefaultPrinter(call: PluginCall) {
        val r = JSObject(); r.put("name", registry.defaultPrinterName()); call.resolve(r)
    }

    /** Opens the native printer-setup screen (§7-1). Entry point is native — no
     *  web changes (§4). See report note: final entry-point UX is Fable's call. */
    @PluginMethod
    fun openPrinterSettings(call: PluginCall) {
        try {
            val intent = android.content.Intent(context, PrinterSettingsActivity::class.java)
            intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
            ok(call, true, null)
        } catch (e: Exception) {
            ok(call, false, e.message ?: "OPEN_ERROR")
        }
    }

    @PluginMethod
    fun diagnostics(call: PluginCall) {
        val arr = JSArray()
        registry.listNames().forEach { arr.put(it) }
        val r = JSObject()
        r.put("platform", "android")
        r.put("available", true)
        r.put("version", "0.1.0")
        r.put("btPermission", hasBtConnect())
        r.put("printers", arr)
        call.resolve(r)
    }

    // ---- internals ------------------------------------------------------------

    /** Build ESC/POS raster from a receipt bitmap: init + <=256px strips + cut. */
    private fun rasterize(bmp: Bitmap, copies: Int): ByteArray {
        val out = ByteArrayOutputStream()
        repeat(copies) {
            out.write(byteArrayOf(0x1B, 0x40))          // ESC @ (init)
            var y = 0
            while (y < bmp.height) {
                val h = min(256, bmp.height - y)
                val strip = Bitmap.createBitmap(bmp, 0, y, bmp.width, h)
                out.write(EscPosPrinterCommands.bitmapToBytes(strip, false)) // GS v 0 raster
                if (strip != bmp) strip.recycle()
                y += h
            }
            out.write(byteArrayOf(0x0A, 0x0A, 0x0A))     // feed
            out.write(byteArrayOf(0x1D, 0x56, 0x42, 0x00)) // GS V B 0 (partial cut)
        }
        return out.toByteArray()
    }

    private fun writeRaw(t: PrintTarget, bytes: ByteArray) {
        when (t) {
            is PrintTarget.Lan ->
                Socket(t.host, t.port).use { s ->
                    s.getOutputStream().apply { write(bytes); flush() }
                }
            is PrintTarget.Bt -> {
                if (!hasBtConnect()) throw SecurityException("BT_PERMISSION")
                val adapter = btAdapter() ?: throw Exception("BT_UNAVAILABLE")
                val device = adapter.getRemoteDevice(t.mac)
                val conn = BluetoothConnection(device)
                try {
                    conn.connect()
                    conn.write(bytes)
                    conn.send()
                } finally {
                    try { conn.disconnect() } catch (e: Exception) { /* ignore */ }
                }
            }
        }
    }

    /**
     * lan  -> Lan(host, port) direct (raw IP path, §7-1).
     * bt   -> explicit mac, else name lookup in the registry.
     * os / else -> name lookup in the registry (miss = null -> PRINTER_NOT_FOUND).
     */
    private fun resolveTarget(obj: JSObject?): PrintTarget? {
        if (obj == null) return null
        return when (obj.getString("kind")) {
            "lan" -> {
                val host = obj.getString("host") ?: return null
                val port = obj.getInteger("port") ?: 9100
                PrintTarget.Lan(host, port)
            }
            "bt" -> {
                val mac = obj.getString("mac") ?: obj.getString("address")
                if (mac != null) PrintTarget.Bt(mac, obj.getString("name") ?: mac)
                else registry.resolve(obj.getString("name") ?: obj.getString("printerName"))
            }
            else -> registry.resolve(obj.getString("printerName") ?: obj.getString("name"))
        }
    }

    private fun laneKey(t: PrintTarget): String = when (t) {
        is PrintTarget.Lan -> "lan:${t.host}:${t.port}"
        is PrintTarget.Bt -> "bt:${t.mac}"
    }

    private fun submit(key: String, work: () -> Unit) {
        lanes.getOrPut(key) { Executors.newSingleThreadExecutor() }.execute(work)
    }

    private fun injectBridge(webView: WebView) {
        try {
            val js = context.assets.open("public/nativePrintBridge.js")
                .bufferedReader(Charsets.UTF_8).use { it.readText() }
            webView.post { webView.evaluateJavascript(js, null) }
        } catch (e: Exception) { /* asset missing -> web app still works, just no native print */ }
    }

    private fun btAdapter(): BluetoothAdapter? {
        val mgr = context.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager
        @Suppress("DEPRECATION")
        return mgr?.adapter ?: BluetoothAdapter.getDefaultAdapter()
    }

    private fun hasBtConnect(): Boolean {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true
        return ContextCompat.checkSelfPermission(
            context, Manifest.permission.BLUETOOTH_CONNECT
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun ensureBtPermissionRequested() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !hasBtConnect()) {
            try {
                ActivityCompat.requestPermissions(
                    activity, arrayOf(Manifest.permission.BLUETOOTH_CONNECT), BT_PERM_CODE
                )
            } catch (e: Exception) { /* activity gone */ }
        }
    }

    private fun ok(call: PluginCall, success: Boolean, error: String?) {
        val r = JSObject()
        r.put("ok", success)
        if (error != null) r.put("error", error)
        call.resolve(r)
    }

    companion object {
        private const val TIMEOUT_MS = 20_000L
        private const val BT_PERM_CODE = 0xB7
    }
}
