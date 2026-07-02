package com.purplehere.pos.mobile

// SKELETON — Capacitor plugin backing window.__NATIVE_PRINT (§4 contract).
// Implemented during A1 (needs JDK + Android SDK). Mirrors the Electron main
// process: LAN socket + USB/Bluetooth ESC/POS + HTML raster. Never throws —
// returns { ok, error? }; PRINTER_NOT_FOUND on a name miss (no silent fallback).

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.net.Socket
import android.util.Base64

@CapacitorPlugin(name = "NativePrint")
class NativePrintPlugin : Plugin() {

    // printRaw LAN: java.net.Socket -> host:port (9100), write decoded bytes.
    // (USB Host API / Bluetooth SPP paths added for kind='usb'|'bt'.)
    @PluginMethod
    fun printRaw(call: PluginCall) {
        val data = call.getString("data") ?: return ok(call, false, "BAD_DATA")
        val target = call.getObject("target")
        val kind = target?.getString("kind")
        try {
            when (kind) {
                "lan" -> {
                    val host = target.getString("host") ?: return ok(call, false, "BAD_TARGET")
                    val port = target.getInteger("port") ?: 9100
                    val bytes = Base64.decode(data, Base64.DEFAULT)
                    Socket(host, port).use { s -> s.getOutputStream().apply { write(bytes); flush() } }
                    ok(call, true, null)
                }
                // "usb", "bt" -> UsbManager / BluetoothSocket ESC/POS (RawBT replacement) — TODO A1
                else -> ok(call, false, "TARGET_NOT_IMPLEMENTED")
            }
        } catch (e: Exception) { ok(call, false, e.message ?: "LAN_ERROR") }
    }

    // openDrawer: ESC p 0 100 100 pulse to the target (same bytes as billPrint).
    @PluginMethod fun openDrawer(call: PluginCall) { /* build 1B 70 00 64 64, route like printRaw — TODO A1 */ ok(call, false, "TODO") }

    // printHtml: offscreen WebView -> bitmap -> ESC/POS raster, or PrintManager — TODO A1
    @PluginMethod fun printHtml(call: PluginCall) { ok(call, false, "TODO") }

    // listPrinters: paired BT + connected USB (+ optional network discovery) — TODO A1
    @PluginMethod fun listPrinters(call: PluginCall) { val r = com.getcapacitor.JSObject(); r.put("printers", com.getcapacitor.JSArray()); call.resolve(r) }
    @PluginMethod fun getDefaultPrinter(call: PluginCall) { val r = com.getcapacitor.JSObject(); r.put("name", null as String?); call.resolve(r) }
    @PluginMethod fun diagnostics(call: PluginCall) { val r = com.getcapacitor.JSObject(); r.put("platform", "android"); call.resolve(r) }

    private fun ok(call: PluginCall, success: Boolean, error: String?) {
        val r = com.getcapacitor.JSObject(); r.put("ok", success); if (error != null) r.put("error", error); call.resolve(r)
    }
}
