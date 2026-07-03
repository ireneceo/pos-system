package com.purplehere.pos.mobile

import android.annotation.SuppressLint
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/**
 * Resolves a printer NAME (printer_settings.address) to a transport — Android has
 * no OS print spooler, so this is the core gap fix (design §7-1). Two sources:
 *   - Network printers registered in-app: name -> host:port (SharedPreferences).
 *   - Bonded Bluetooth printers: name / MAC (BluetoothAdapter.bondedDevices).
 * A non-empty name that matches nothing = PRINTER_NOT_FOUND (no silent fallback,
 * §4 contract — the thefire BAR "success-looking non-print" lesson).
 */
sealed class PrintTarget {
    data class Lan(val host: String, val port: Int) : PrintTarget()
    data class Bt(val mac: String, val name: String) : PrintTarget()
}

class PrinterRegistry(private val context: Context) {
    private val prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

    data class NetPrinter(val name: String, val host: String, val port: Int)

    fun netPrinters(): List<NetPrinter> {
        val raw = prefs.getString(KEY_NET, "[]") ?: "[]"
        val arr = try { JSONArray(raw) } catch (e: Exception) { JSONArray() }
        val out = ArrayList<NetPrinter>()
        for (i in 0 until arr.length()) {
            val o = arr.optJSONObject(i) ?: continue
            val n = o.optString("name")
            val h = o.optString("host")
            val p = o.optInt("port", 9100)
            if (n.isNotEmpty() && h.isNotEmpty()) out.add(NetPrinter(n, h, p))
        }
        return out
    }

    fun saveNetPrinters(list: List<NetPrinter>) {
        val arr = JSONArray()
        list.forEach {
            arr.put(JSONObject().put("name", it.name).put("host", it.host).put("port", it.port))
        }
        prefs.edit().putString(KEY_NET, arr.toString()).apply()
    }

    fun defaultPrinterName(): String? =
        prefs.getString(KEY_DEFAULT, null)?.takeIf { it.isNotEmpty() }

    fun setDefaultPrinterName(name: String?) {
        prefs.edit().putString(KEY_DEFAULT, name ?: "").apply()
    }

    @SuppressLint("MissingPermission") // callers gate on BLUETOOTH_CONNECT (§7-4)
    fun bondedBtPrinters(): List<PrintTarget.Bt> {
        val mgr = context.getSystemService(Context.BLUETOOTH_SERVICE) as? BluetoothManager
        @Suppress("DEPRECATION")
        val adapter = mgr?.adapter ?: BluetoothAdapter.getDefaultAdapter() ?: return emptyList()
        return try {
            adapter.bondedDevices?.map { PrintTarget.Bt(it.address, it.name ?: it.address) } ?: emptyList()
        } catch (e: SecurityException) {
            emptyList()
        } catch (e: Exception) {
            emptyList()
        }
    }

    /** All printer NAMES for listPrinters (network + bonded BT), de-duplicated. */
    fun listNames(): List<String> {
        val names = LinkedHashSet<String>()
        netPrinters().forEach { names.add(it.name) }
        bondedBtPrinters().forEach { names.add(it.name) }
        return names.toList()
    }

    /**
     * Resolve a requested name to a transport.
     * ""  -> the registry default (null if none set).
     * miss -> null  (caller returns PRINTER_NOT_FOUND).
     */
    fun resolve(requested: String?): PrintTarget? {
        val name = (requested ?: "").trim()
        if (name.isEmpty()) {
            val def = defaultPrinterName() ?: return null
            if (def.trim().equals(name, ignoreCase = true)) return null // guard self-loop
            return resolve(def)
        }
        val lc = name.lowercase()
        netPrinters().firstOrNull { it.name.trim().lowercase() == lc }
            ?.let { return PrintTarget.Lan(it.host, it.port) }
        bondedBtPrinters().firstOrNull {
            it.name.trim().lowercase() == lc || it.mac.trim().lowercase() == lc
        }?.let { return it }
        return null
    }

    companion object {
        private const val PREFS = "purple_printers"
        private const val KEY_NET = "net_printers"
        private const val KEY_DEFAULT = "default_printer"
    }
}
