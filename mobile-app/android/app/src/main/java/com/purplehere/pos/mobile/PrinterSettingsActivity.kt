package com.purplehere.pos.mobile

import android.app.Activity
import android.os.Bundle
import android.text.InputType
import android.view.Gravity
import android.view.View
import android.view.ViewGroup.LayoutParams.MATCH_PARENT
import android.view.ViewGroup.LayoutParams.WRAP_CONTENT
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.ScrollView
import android.widget.TextView
import android.widget.Toast

/**
 * Simple native printer-settings screen — the Android counterpart of the desktop
 * app's native printer setup (design §7-1). Android has no OS print spooler, so
 * network printers (name -> IP:port) are registered here and resolved by name by
 * NativePrintPlugin. Bonded Bluetooth printers appear automatically (read-only).
 *
 * Programmatic UI (no XML/resources) to keep the plugin self-contained.
 */
class PrinterSettingsActivity : Activity() {

    private lateinit var registry: PrinterRegistry
    private lateinit var listContainer: LinearLayout
    private lateinit var nameField: EditText
    private lateinit var hostField: EditText
    private lateinit var portField: EditText

    private val pad = 32

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        registry = PrinterRegistry(this)

        val scroll = ScrollView(this)
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(pad, pad, pad, pad)
        }
        scroll.addView(root)

        root.addView(title("Printer Setup"))
        root.addView(hint("Network printers are matched by name to the printer set in POS settings. Bluetooth printers paired in Android appear automatically."))

        // --- Add network printer form ---
        root.addView(sectionLabel("Add network printer"))
        nameField = field("Name (must match POS printer name)", InputType.TYPE_CLASS_TEXT)
        hostField = field("IP address (e.g. 192.168.0.50)", InputType.TYPE_CLASS_TEXT)
        portField = field("Port (default 9100)", InputType.TYPE_CLASS_NUMBER)
        root.addView(nameField)
        root.addView(hostField)
        root.addView(portField)
        root.addView(Button(this).apply {
            text = "Add"
            setOnClickListener { addPrinter() }
        })

        // --- Existing printers ---
        root.addView(sectionLabel("Printers"))
        listContainer = LinearLayout(this).apply { orientation = LinearLayout.VERTICAL }
        root.addView(listContainer)

        setContentView(scroll)
        renderList()
    }

    private fun addPrinter() {
        val name = nameField.text.toString().trim()
        val host = hostField.text.toString().trim()
        val port = portField.text.toString().trim().toIntOrNull() ?: 9100
        if (name.isEmpty() || host.isEmpty()) {
            toast("Name and IP address are required")
            return
        }
        val current = registry.netPrinters().toMutableList()
        current.removeAll { it.name.equals(name, ignoreCase = true) } // upsert by name
        current.add(PrinterRegistry.NetPrinter(name, host, port))
        registry.saveNetPrinters(current)
        nameField.text.clear(); hostField.text.clear(); portField.text.clear()
        renderList()
    }

    private fun renderList() {
        listContainer.removeAllViews()
        val net = registry.netPrinters()
        val bonded = registry.bondedBtPrinters()
        val default = registry.defaultPrinterName()

        if (net.isEmpty() && bonded.isEmpty()) {
            listContainer.addView(hint("No printers yet. Add a network printer above, or pair a Bluetooth printer in Android settings."))
            return
        }

        net.forEach { p ->
            val isDefault = p.name.equals(default, ignoreCase = true)
            listContainer.addView(row(
                label = "${p.name}  —  ${p.host}:${p.port}${if (isDefault) "  (default)" else ""}",
                onDefault = { registry.setDefaultPrinterName(p.name); renderList() },
                onDelete = {
                    val next = registry.netPrinters().filterNot { it.name.equals(p.name, ignoreCase = true) }
                    registry.saveNetPrinters(next)
                    if (isDefault) registry.setDefaultPrinterName(null)
                    renderList()
                }
            ))
        }
        bonded.forEach { bt ->
            val isDefault = bt.name.equals(default, ignoreCase = true)
            listContainer.addView(row(
                label = "${bt.name}  —  Bluetooth${if (isDefault) "  (default)" else ""}",
                onDefault = { registry.setDefaultPrinterName(bt.name); renderList() },
                onDelete = null // bonded BT is managed by Android, not deletable here
            ))
        }
    }

    // ---- tiny view helpers ----------------------------------------------------
    private fun title(t: String) = TextView(this).apply {
        text = t; textSize = 22f; setPadding(0, 0, 0, pad / 2)
    }

    private fun sectionLabel(t: String) = TextView(this).apply {
        text = t; textSize = 16f; setPadding(0, pad, 0, pad / 4)
    }

    private fun hint(t: String) = TextView(this).apply {
        text = t; textSize = 13f; alpha = 0.7f; setPadding(0, 4, 0, pad / 2)
    }

    private fun field(hintText: String, inputType: Int) = EditText(this).apply {
        hint = hintText; this.inputType = inputType
        layoutParams = LinearLayout.LayoutParams(MATCH_PARENT, WRAP_CONTENT)
    }

    private fun row(label: String, onDefault: () -> Unit, onDelete: (() -> Unit)?): View {
        val row = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(0, pad / 4, 0, pad / 4)
        }
        row.addView(TextView(this).apply {
            text = label; textSize = 15f
            layoutParams = LinearLayout.LayoutParams(0, WRAP_CONTENT, 1f)
        })
        row.addView(Button(this).apply {
            text = "Default"; setOnClickListener { onDefault() }
        })
        if (onDelete != null) {
            row.addView(Button(this).apply {
                text = "Delete"; setOnClickListener { onDelete() }
            })
        }
        return row
    }

    private fun toast(msg: String) = Toast.makeText(this, msg, Toast.LENGTH_SHORT).show()
}
