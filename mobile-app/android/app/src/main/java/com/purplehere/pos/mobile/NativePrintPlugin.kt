package com.purplehere.pos.mobile

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Base64
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.dantsu.escposprinter.EscPosPrinterCommands
import com.dantsu.escposprinter.connection.bluetooth.BluetoothConnection
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import java.io.ByteArrayOutputStream
import java.net.InetSocketAddress
import java.net.Socket
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ExecutorService
import java.util.concurrent.Executors
import kotlin.math.min

/**
 * Backs window.__NATIVE_PRINT for the Android POS app — the EXACT §4 contract
 * billPrint already feature-detects, so the remote web app prints natively with
 * ZERO frontend print changes (mirror of the Windows Electron main process).
 *
 * Never throws — every method resolves { ok, error? }. A printer NAME that
 * matches nothing = PRINTER_NOT_FOUND (no silent fallback to a default — §4,
 * the thefire BAR "success-looking non-print" lesson).
 *
 *  - printRaw  : pre-built ESC/POS bytes (base64) -> LAN socket or BT SPP.
 *  - printHtml : offscreen WebView -> bitmap -> ESC/POS raster (한글 보존).
 *  - openDrawer: 1B 70 00 64 64 pulse, routed like printRaw.
 *  - listPrinters / getDefaultPrinter : name registry (Android has no spooler).
 *
 * Setup (registering network printers, Bluetooth permission) is NOT part of §4 —
 * it lives on a separate, Android-only window.__NATIVE_PRINT_SETUP object that
 * only the web Settings page reads (design §8-2). Windows never sees it, so the
 * Windows behaviour is byte-identical. There is deliberately NO native settings
 * screen: printer settings are restaurant-admin-gated in the web app, and a
 * native screen would be a back door around that gate (design §8-1).
 *
 * Serialization (design §8-4-B1): one single-thread lane per DESTINATION
 * (lan:<host>:<port> / bt:<mac>), plus one shared "html" lane for RENDERING only.
 * printHtml renders on the html lane (WebView work must serialize) and then hands
 * the finished bytes to the destination lane. Rendering and sending must not share
 * a lane: a dead KITCHEN printer would otherwise block bill printing too, and a
 * raw job and an html job to the same printer could interleave on two connections.
 */
@CapacitorPlugin(
    name = "NativePrint",
    permissions = [
        Permission(alias = NativePrintPlugin.BT_ALIAS, strings = [Manifest.permission.BLUETOOTH_CONNECT])
    ]
)
class NativePrintPlugin : Plugin() {

    private val registry by lazy { PrinterRegistry(context) }
    private val lanes = ConcurrentHashMap<String, ExecutorService>()

    // ── §4 contract ────────────────────────────────────────────────────────────

    @PluginMethod
    fun printRaw(call: PluginCall) {
        val data = call.getString("data") ?: return ok(call, false, "BAD_DATA")
        val target = resolveTarget(call.getObject("target"))
            ?: return ok(call, false, "PRINTER_NOT_FOUND")
        val bytes = try {
            Base64.decode(data, Base64.DEFAULT)
        } catch (e: Exception) {
            return ok(call, false, "BAD_DATA")
        }
        send(call, target, bytes)
    }

    @PluginMethod
    fun openDrawer(call: PluginCall) {
        // billPrint passes the target object at the ROOT (not nested) — billPrint.js:255.
        val target = resolveTarget(call.data)
            ?: return ok(call, false, "PRINTER_NOT_FOUND")
        send(call, target, DRAWER_PULSE)
    }

    @PluginMethod
    fun printHtml(call: PluginCall) {
        val html = call.getString("html") ?: return ok(call, false, "BAD_HTML")
        val printerName = call.getString("printerName")
        val widthMm = call.getInt("widthMm") ?: 80
        val copies = (call.getInt("copies") ?: 1).coerceIn(1, 10)
        val target = registry.resolve(printerName)
            ?: return ok(call, false, "PRINTER_NOT_FOUND")
        val widthPx = if (widthMm in 1..69) 384 else 576 // 58mm=384, 80mm=576 @203dpi

        // Render on the shared html lane (one offscreen WebView at a time)…
        submit(LANE_HTML) {
            val payload = try {
                val bmp = OffscreenHtmlRenderer.render(context, html, widthPx, RENDER_TIMEOUT_MS)
                    ?: return@submit ok(call, false, "TIMEOUT")
                val bytes = rasterize(bmp, copies)
                bmp.recycle()
                bytes
            } catch (e: Exception) {
                return@submit ok(call, false, e.message ?: "RENDER_ERROR")
            }
            // …then hand the finished bytes to the DESTINATION lane, so a dead
            // printer stalls only its own queue (design §8-4-B1). The html lane is
            // FIFO, so call order is preserved into the destination lanes.
            send(call, target, payload)
        }
    }

    @PluginMethod
    fun listPrinters(call: PluginCall) {
        val arr = JSArray()
        registry.listNames().forEach { arr.put(it) }
        val r = JSObject(); r.put("printers", arr); call.resolve(r)
    }

    @PluginMethod
    fun getDefaultPrinter(call: PluginCall) {
        val r = JSObject(); r.put("name", registry.defaultPrinterName()); call.resolve(r)
    }

    /** §4 shape (matches the Windows preload): platform / appVersion / printers / defaultPrinter. */
    @PluginMethod
    fun diagnostics(call: PluginCall) {
        val arr = JSArray()
        registry.listNames().forEach { arr.put(it) }
        val r = JSObject()
        r.put("platform", "android")
        r.put("available", true)
        // Single source of truth = build.gradle versionName. A hardcoded constant
        // here drifts from the APK the store actually runs (the 2026-07-13 desktop
        // CTA drift, same class).
        r.put("appVersion", BuildConfig.VERSION_NAME)
        r.put("printers", arr)
        r.put("defaultPrinter", registry.defaultPrinterName())
        r.put("btPermission", btPermissionState()) // additive, Android-only
        call.resolve(r)
    }

    // ── Android-only setup surface (window.__NATIVE_PRINT_SETUP, design §8-2) ──
    // Not part of §4. The web Settings page is the ONLY consumer, so the existing
    // restaurant-admin role gate and the printer-settings wipe locks still hold.

    @PluginMethod
    fun getSetupState(call: PluginCall) {
        val net = JSArray()
        registry.netPrinters().forEach {
            net.put(JSObject().apply { put("name", it.name); put("host", it.host); put("port", it.port) })
        }
        val bonded = JSArray()
        registry.bondedBtPrinters().forEach {
            bonded.put(JSObject().apply {
                put("name", it.name); put("mac", it.mac); put("likelyPrinter", it.likelyPrinter)
            })
        }
        val r = JSObject()
        r.put("platform", "android")
        r.put("btPermission", btPermissionState())
        r.put("net", net)
        r.put("bonded", bonded)
        r.put("defaultPrinter", registry.defaultPrinterName())
        call.resolve(r)
    }

    @PluginMethod
    fun addNetPrinter(call: PluginCall) {
        val name = (call.getString("name") ?: "").trim()
        val host = (call.getString("host") ?: "").trim()
        val port = call.getInt("port") ?: 9100
        if (name.isEmpty()) return ok(call, false, "NAME_REQUIRED")
        if (host.isEmpty()) return ok(call, false, "HOST_REQUIRED")
        if (port !in 1..65535) return ok(call, false, "BAD_PORT")
        // Upsert by name (case-insensitive) — resolve() matches case-insensitively,
        // so two rows differing only in case would be an unresolvable ambiguity.
        val kept = registry.netPrinters().filterNot { it.name.trim().equals(name, ignoreCase = true) }
        registry.saveNetPrinters(kept + PrinterRegistry.NetPrinter(name, host, port))
        ok(call, true, null)
    }

    @PluginMethod
    fun removeNetPrinter(call: PluginCall) {
        val name = (call.getString("name") ?: "").trim()
        if (name.isEmpty()) return ok(call, false, "NAME_REQUIRED")
        val kept = registry.netPrinters().filterNot { it.name.trim().equals(name, ignoreCase = true) }
        registry.saveNetPrinters(kept)
        // Never leave the default pointing at a printer that no longer exists —
        // resolve("") would then return null and every default-printer job would
        // fail PRINTER_NOT_FOUND with no visible cause.
        if (registry.defaultPrinterName()?.trim().equals(name, ignoreCase = true)) {
            registry.setDefaultPrinterName(null)
        }
        ok(call, true, null)
    }

    @PluginMethod
    fun setDefaultPrinter(call: PluginCall) {
        val name = call.getString("name")?.trim()
        if (name.isNullOrEmpty()) {
            registry.setDefaultPrinterName(null)
            return ok(call, true, null)
        }
        if (registry.resolve(name) == null) return ok(call, false, "PRINTER_NOT_FOUND")
        registry.setDefaultPrinterName(name)
        ok(call, true, null)
    }

    /** Explicit, user-initiated BT permission request (design §8-3 — no context-free
     *  popup on first launch). Result comes back via @PermissionCallback. */
    @PluginMethod
    fun requestBtPermission(call: PluginCall) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S || hasBtConnect()) {
            val r = JSObject(); r.put("state", btPermissionState()); return call.resolve(r)
        }
        requestPermissionForAlias(BT_ALIAS, call, "btPermissionResult")
    }

    @PermissionCallback
    private fun btPermissionResult(call: PluginCall) {
        val r = JSObject(); r.put("state", btPermissionState()); call.resolve(r)
    }

    /** Pairing happens in the Android system settings (bonded-only, no scan → no
     *  location permission). We don't build our own scanner — OS work belongs to the OS. */
    @PluginMethod
    fun openSystemBluetoothSettings(call: PluginCall) {
        openIntent(call, Intent(Settings.ACTION_BLUETOOTH_SETTINGS))
    }

    /** For denied_forever: the OS won't prompt again, only app settings can undo it. */
    @PluginMethod
    fun openAppSettings(call: PluginCall) {
        val i = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
            .setData(Uri.fromParts("package", context.packageName, null))
        openIntent(call, i)
    }

    // ── internals ──────────────────────────────────────────────────────────────

    /** Queue bytes on the destination's lane and resolve the call with {ok,error}. */
    private fun send(call: PluginCall, target: PrintTarget, bytes: ByteArray) {
        submit(laneKey(target)) {
            try {
                writeRaw(target, bytes)
                ok(call, true, null)
            } catch (e: SecurityException) {
                ok(call, false, "BT_PERMISSION")
            } catch (e: Exception) {
                ok(call, false, e.message ?: "WRITE_ERROR")
            }
        }
    }

    /** ESC/POS raster from a receipt bitmap: init + <=256px strips + feed + cut. */
    private fun rasterize(bmp: Bitmap, copies: Int): ByteArray {
        val out = ByteArrayOutputStream()
        repeat(copies) {
            out.write(byteArrayOf(0x1B, 0x40))              // ESC @ (init)
            var y = 0
            while (y < bmp.height) {
                val h = min(256, bmp.height - y)
                val strip = Bitmap.createBitmap(bmp, 0, y, bmp.width, h)
                out.write(EscPosPrinterCommands.bitmapToBytes(strip, false)) // GS v 0 raster
                if (strip != bmp) strip.recycle()
                y += h
            }
            out.write(byteArrayOf(0x0A, 0x0A, 0x0A))        // feed
            out.write(byteArrayOf(0x1D, 0x56, 0x42, 0x00))  // GS V B 0 (partial cut)
        }
        return out.toByteArray()
    }

    private fun writeRaw(t: PrintTarget, bytes: ByteArray) {
        when (t) {
            is PrintTarget.Lan ->
                // Explicit connect timeout (§4: 5s connect / 10s write). Without it a
                // dead printer IP blocks its lane for the OS default (~2 minutes).
                Socket().use { s ->
                    s.connect(InetSocketAddress(t.host, t.port), CONNECT_TIMEOUT_MS)
                    s.soTimeout = WRITE_TIMEOUT_MS
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
     * lan -> Lan(host, port) direct (raw IP path — billPrint sends IP addresses this way).
     * bt  -> explicit mac, else name lookup in the registry.
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

    private fun openIntent(call: PluginCall, intent: Intent) {
        try {
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(intent)
            ok(call, true, null)
        } catch (e: Exception) {
            ok(call, false, e.message ?: "OPEN_ERROR")
        }
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

    /** granted | denied (will prompt again) | denied_forever (only app settings) | not_needed (<A12). */
    private fun btPermissionState(): String {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return "not_needed"
        if (hasBtConnect()) return "granted"
        val act = activity ?: return "denied"
        // Android has no "denied forever" flag: after a permanent denial the OS stops
        // showing the rationale, so !shouldShowRationale && !granted means the prompt
        // is dead and only app settings can undo it.
        val canPrompt = ActivityCompat.shouldShowRequestPermissionRationale(
            act, Manifest.permission.BLUETOOTH_CONNECT
        )
        return if (canPrompt) "denied" else "denied_forever"
    }

    private fun ok(call: PluginCall, success: Boolean, error: String?) {
        val r = JSObject()
        r.put("ok", success)
        if (error != null) r.put("error", error)
        call.resolve(r)
    }

    companion object {
        const val BT_ALIAS = "bluetooth"
        private const val LANE_HTML = "html"
        private const val RENDER_TIMEOUT_MS = 20_000L
        private const val CONNECT_TIMEOUT_MS = 5_000
        private const val WRITE_TIMEOUT_MS = 10_000
        private val DRAWER_PULSE = byteArrayOf(0x1B, 0x70, 0x00, 0x64, 0x64)
    }
}
