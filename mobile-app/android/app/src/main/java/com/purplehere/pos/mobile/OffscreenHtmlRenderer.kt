package com.purplehere.pos.mobile

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.os.Handler
import android.os.Looper
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicReference

/**
 * Renders ticket/bill HTML to a bitmap off-screen (design §7-2) — the same
 * principle as QZ's HTML pixel mode, so 한글/design survive on the thermal
 * printer. WebView must run on the UI thread; callers are on a lane worker, so
 * we hop to the main looper and block with a latch (timeout -> null).
 */
object OffscreenHtmlRenderer {

    fun render(context: Context, html: String, widthPx: Int, timeoutMs: Long): Bitmap? {
        val latch = CountDownLatch(1)
        val ref = AtomicReference<Bitmap?>(null)
        Handler(Looper.getMainLooper()).post {
            try {
                renderOnUi(context, html, widthPx, ref, latch)
            } catch (e: Exception) {
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
        wv.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView, url: String?) {
                // Small delay so fonts/layout settle before measuring.
                view.postDelayed({
                    try {
                        view.measure(
                            View.MeasureSpec.makeMeasureSpec(widthPx, View.MeasureSpec.EXACTLY),
                            View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
                        )
                        val h = view.measuredHeight
                        if (h <= 0) {
                            return@postDelayed
                        }
                        view.layout(0, 0, widthPx, h)
                        val bmp = Bitmap.createBitmap(widthPx, h, Bitmap.Config.ARGB_8888)
                        val canvas = Canvas(bmp)
                        canvas.drawColor(Color.WHITE)
                        view.draw(canvas)
                        ref.set(bmp)
                    } catch (e: Exception) {
                        // leave ref null
                    } finally {
                        // Destroy the WebView on the UI thread — always-on POS tablet,
                        // so a leaked WebView per ticket would accumulate (§7-2).
                        try { view.destroy() } catch (e: Exception) { }
                        latch.countDown()
                    }
                }, 80)
            }
        }
        wv.layout(0, 0, widthPx, 1)
        wv.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null)
    }
}
