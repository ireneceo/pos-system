package com.purplehere.pos.mobile

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicReference
import kotlin.math.roundToInt

/**
 * Renders ticket/bill HTML to a bitmap off-screen (design §7-2) — the same principle as
 * QZ's HTML pixel mode, so 한글 and the ticket design survive on a thermal printer.
 *
 * WebView work must happen on the UI thread; callers are on a print lane worker, so we
 * hop to the main looper and block on a latch.
 *
 * Two hard-won rules here:
 *  1. EVERY exit path must count the latch down. A path that returns without releasing it
 *     doesn't fail — it hangs the caller for the full timeout and then reports TIMEOUT,
 *     which reads like a printer problem and sends you hunting in the wrong place.
 *  2. An unattached WebView's measuredHeight is routinely 0 even after onPageFinished:
 *     the height only settles once content layout has run. Fall back to contentHeight
 *     (CSS px × scale), and retry briefly before giving up — never print a blank page.
 *  3. NEVER schedule with View.postDelayed() here. On a view that is not attached to a
 *     window, View.postDelayed() parks the runnable in the view's HandlerActionQueue
 *     and only runs it on attach — which for an off-screen WebView never happens. The
 *     callback silently never fires, the latch is never released, and every HTML ticket
 *     dies on the 20s timeout with no error anywhere. (That is exactly what the V3 gate
 *     caught: raw/drawer printing worked, printHtml always TIMEOUTed.) Post to the main
 *     looper instead — it runs whether or not the view is attached.
 */
object OffscreenHtmlRenderer {

    private const val TAG = "NativePrint"
    private val ui = Handler(Looper.getMainLooper())

    fun render(context: Context, html: String, widthPx: Int, timeoutMs: Long): Bitmap? {
        val latch = CountDownLatch(1)
        val ref = AtomicReference<Bitmap?>(null)
        ui.post {
            try {
                renderOnUi(context, html, widthPx, ref, latch)
            } catch (e: Exception) {
                Log.w(TAG, "render setup failed: ${e.message}")
                latch.countDown()
            }
        }
        return try {
            if (latch.await(timeoutMs, TimeUnit.MILLISECONDS)) ref.get() else null
        } catch (e: InterruptedException) {
            null
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun renderOnUi(
        context: Context,
        html: String,
        widthPx: Int,
        ref: AtomicReference<Bitmap?>,
        latch: CountDownLatch
    ) {
        val wv = WebView(context)
        wv.settings.javaScriptEnabled = false // ticket HTML is static — deterministic layout
        wv.settings.loadWithOverviewMode = false
        wv.settings.useWideViewPort = false
        wv.setInitialScale(100)
        wv.setBackgroundColor(Color.WHITE)

        var finished = false

        wv.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String?) {
                if (finished) return
                finished = true
                Log.i(TAG, "render: page finished, measuring")
                attempt(view, widthPx, ref, latch, 0)
            }
        }
        wv.layout(0, 0, widthPx, 1)
        wv.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null)
    }

    /** Measure → draw. Content height can still be 0 right after onPageFinished, so retry
     *  a few frames before concluding there is nothing to print. */
    private fun attempt(
        view: WebView,
        widthPx: Int,
        ref: AtomicReference<Bitmap?>,
        latch: CountDownLatch,
        tries: Int
    ) {
        ui.postDelayed({
            var done = false
            try {
                view.measure(
                    View.MeasureSpec.makeMeasureSpec(widthPx, View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
                )
                // contentHeight is in CSS px — scale to device px. Either source may be 0
                // while layout settles, so take the larger.
                val contentPx = (view.contentHeight * view.scale).roundToInt()
                val h = maxOf(view.measuredHeight, contentPx)

                if (h <= 0) {
                    if (tries < MAX_TRIES) {
                        attempt(view, widthPx, ref, latch, tries + 1) // keep the latch held; retry
                        return@postDelayed
                    }
                    Log.w(TAG, "render: height still 0 after $MAX_TRIES tries — nothing to print")
                    done = true // give up, but NEVER silently: caller gets null -> RENDER_ERROR
                    return@postDelayed
                }

                view.layout(0, 0, widthPx, h)
                val bmp = Bitmap.createBitmap(widthPx, h, Bitmap.Config.ARGB_8888)
                val canvas = Canvas(bmp)
                canvas.drawColor(Color.WHITE)
                view.draw(canvas)
                ref.set(bmp)
                done = true
                Log.i(TAG, "render ok: ${widthPx}x$h (measured=${view.measuredHeight} content=$contentPx)")
            } catch (e: Exception) {
                Log.w(TAG, "render failed: ${e.message}")
                done = true
            } finally {
                // Only tear down + release when this attempt is terminal. A retry keeps the
                // WebView alive and the latch held.
                if (done) {
                    try { view.destroy() } catch (e: Exception) { /* already gone */ }
                    latch.countDown()
                }
            }
        }, if (tries == 0) FIRST_DELAY_MS else RETRY_DELAY_MS)
    }

    private const val MAX_TRIES = 10        // ~1s of retries — layout settles in a frame or two
    private const val FIRST_DELAY_MS = 80L  // let fonts/layout settle after page finish
    private const val RETRY_DELAY_MS = 100L
}
