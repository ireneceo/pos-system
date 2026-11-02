package com.purplehere.pos.mobile

import android.annotation.SuppressLint
import android.app.Activity
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Color
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
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
 * Hard-won rules here:
 *  1. EVERY exit path must count the latch down. A path that returns without releasing it
 *     doesn't fail — it hangs the caller for the full timeout and then reports TIMEOUT,
 *     which reads like a printer problem and sends you hunting in the wrong place.
 *  2. An unattached WebView's measuredHeight is routinely 0 even after onPageFinished:
 *     the height only settles once content layout has run. Fall back to contentHeight
 *     (CSS px × scale), and retry briefly before giving up — never print a blank page.
 *  3. NEVER schedule with View.postDelayed() here. On a view that is not attached to a
 *     window, View.postDelayed() parks the runnable in the view's HandlerActionQueue
 *     and only runs it on attach. Post to the main looper instead.
 *  4. (2026-11-02, Fable design .claude/fable-design-20261102-android-raster.md) A WebView
 *     that is NOT attached to a window draws WHITE. Chromium gives an unattached/invisible
 *     view no compositor tile budget (logcat: «tile memory limits exceeded, some content may
 *     not draw» at every render) — height was right, ink was 0.0%, and the job still came
 *     back {ok:true}. So: attach to the activity content at index 0 — ON screen, behind the main
 *     WebView (off-screen translationX still blanked every other ticket; never INVISIBLE/alpha 0),
 *     wait for postVisualStateCallback (Chromium's guarantee that
 *     the next draw contains this DOM), draw, detach, destroy.
 *  5. A bitmap with (almost) no dark pixels is a FAILURE (BLANK_RENDER), never paper.
 */
object OffscreenHtmlRenderer {

    private const val TAG = "NativePrint"
    private val ui = Handler(Looper.getMainLooper())

    /** Either a bitmap or an error code (TIMEOUT / NO_WINDOW / VISUAL_STATE_TIMEOUT / BLANK_RENDER / RENDER_ERROR). */
    class Result(val bitmap: Bitmap?, val error: String?)

    fun render(activity: Activity?, html: String, widthPx: Int, timeoutMs: Long): Result {
        if (activity == null || activity.isFinishing || activity.isDestroyed) return Result(null, "NO_WINDOW")
        val latch = CountDownLatch(1)
        val ref = AtomicReference<Result?>(null)
        ui.post {
            try {
                renderOnUi(activity, html, widthPx, ref, latch)
            } catch (e: Exception) {
                Log.w(TAG, "render setup failed: ${e.message}")
                ref.compareAndSet(null, Result(null, "RENDER_ERROR"))
                latch.countDown()
            }
        }
        return try {
            if (latch.await(timeoutMs, TimeUnit.MILLISECONDS)) ref.get() ?: Result(null, "RENDER_ERROR")
            else Result(null, "TIMEOUT")
        } catch (e: InterruptedException) {
            Result(null, "TIMEOUT")
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun renderOnUi(
        activity: Activity,
        html: String,
        widthPx: Int,
        ref: AtomicReference<Result?>,
        latch: CountDownLatch
    ) {
        val wv = WebView(activity)
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
                attempt(activity, view, widthPx, ref, latch, 0)
            }
        }
        wv.layout(0, 0, widthPx, 1)
        wv.loadDataWithBaseURL(null, html, "text/html", "UTF-8", null)
    }

    /** Measure (content height can still be 0 right after onPageFinished — retry a few frames),
     *  then attach off-screen and wait for the visual-state guarantee before drawing. */
    private fun attempt(
        activity: Activity,
        view: WebView,
        widthPx: Int,
        ref: AtomicReference<Result?>,
        latch: CountDownLatch,
        tries: Int
    ) {
        ui.postDelayed({
            try {
                view.measure(
                    View.MeasureSpec.makeMeasureSpec(widthPx, View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
                )
                val contentPx = (view.contentHeight * view.scale).roundToInt()
                val h = maxOf(view.measuredHeight, contentPx)
                if (h <= 0) {
                    if (tries < MAX_TRIES) {
                        attempt(activity, view, widthPx, ref, latch, tries + 1) // keep the latch held; retry
                        return@postDelayed
                    }
                    Log.w(TAG, "render: height still 0 after $MAX_TRIES tries — nothing to print")
                    finish(null, view, ref, latch, Result(null, "RENDER_ERROR"))
                    return@postDelayed
                }
                attachAndDraw(activity, view, widthPx, h, ref, latch)
            } catch (e: Exception) {
                Log.w(TAG, "render failed: ${e.message}")
                finish(null, view, ref, latch, Result(null, "RENDER_ERROR"))
            }
        }, if (tries == 0) FIRST_DELAY_MS else RETRY_DELAY_MS)
    }

    private fun attachAndDraw(
        activity: Activity,
        view: WebView,
        widthPx: Int,
        h: Int,
        ref: AtomicReference<Result?>,
        latch: CountDownLatch
    ) {
        if (activity.isFinishing || activity.isDestroyed) { finish(null, view, ref, latch, Result(null, "NO_WINDOW")); return }
        val root = activity.findViewById<ViewGroup>(android.R.id.content)
        if (root == null) { finish(null, view, ref, latch, Result(null, "NO_WINDOW")); return }
        // A-2 (Fable 설계 §3-2 비상 단계, 2026-11-02 실측): 화면 왼쪽 바깥(translationX)에 두면 Chromium 이
        // 뷰포트 밖이라 타일을 다 그리지 않아(«tile memory limits exceeded») 한 장 걸러 백지가 났다(V3 1/3·2b).
        // → 화면 안, index 0 = 메인 WebView 뒤(메인 WebView 가 가린다). 크기·가시성은 정상(VISIBLE).
        root.addView(view, 0, FrameLayout.LayoutParams(widthPx, h))

        var done = false
        val timeout = Runnable {
            if (done) return@Runnable
            done = true
            Log.w(TAG, "render: visual state callback did not arrive in ${VISUAL_TIMEOUT_MS}ms (screen off / app in background?)")
            finish(root, view, ref, latch, Result(null, "VISUAL_STATE_TIMEOUT"))
        }
        ui.postDelayed(timeout, VISUAL_TIMEOUT_MS)
        view.postVisualStateCallback(1L, object : WebView.VisualStateCallback() {
            override fun onComplete(requestId: Long) {
                if (done) return
                done = true
                ui.removeCallbacks(timeout)
                // One more frame so the attached view has been laid out by its parent.
                ui.post {
                    var result: Result
                    try {
                        val vh = if (view.height > 0) view.height else h
                        if (vh != h) Log.i(TAG, "render: parent laid out height=$vh (measured $h)")
                        val bmp = Bitmap.createBitmap(widthPx, vh, Bitmap.Config.ARGB_8888)
                        val canvas = Canvas(bmp)
                        canvas.drawColor(Color.WHITE)
                        view.draw(canvas)
                        val ink = inkRatio(bmp)
                        result = if (ink < MIN_INK) {
                            Log.w(TAG, "render blank: ink=${"%.4f".format(ink)} ${widthPx}x$vh")
                            bmp.recycle()
                            Result(null, "BLANK_RENDER")
                        } else {
                            Log.i(TAG, "render ok: ${widthPx}x$vh ink=${"%.3f".format(ink)}")
                            Result(bmp, null)
                        }
                    } catch (e: Exception) {
                        Log.w(TAG, "render draw failed: ${e.message}")
                        result = Result(null, "RENDER_ERROR")
                    }
                    finish(root, view, ref, latch, result)
                }
            }
        })
    }

    /** Detach (if attached) → destroy (after detach — WebView rule) → release the caller. */
    private fun finish(root: ViewGroup?, view: WebView, ref: AtomicReference<Result?>, latch: CountDownLatch, result: Result) {
        ref.compareAndSet(null, result)
        try { root?.removeView(view) } catch (e: Exception) { /* already gone */ }
        try { view.destroy() } catch (e: Exception) { /* already gone */ }
        latch.countDown()
    }

    /** Share of dark pixels (luma < 128). Any ticket with text is well over 1 %. */
    private fun inkRatio(bmp: Bitmap): Double {
        val w = bmp.width
        val h = bmp.height
        if (w <= 0 || h <= 0) return 0.0
        val row = IntArray(w)
        var dark = 0L
        for (y in 0 until h) {
            bmp.getPixels(row, 0, w, 0, y, w, 1)
            for (c in row) {
                val luma = (299 * ((c shr 16) and 0xff) + 587 * ((c shr 8) and 0xff) + 114 * (c and 0xff)) / 1000
                if (luma < 128) dark++
            }
        }
        return dark.toDouble() / (w.toLong() * h).toDouble()
    }

    private const val MAX_TRIES = 10            // ~1s of retries — layout settles in a frame or two
    private const val FIRST_DELAY_MS = 80L      // let fonts/layout settle after page finish
    private const val RETRY_DELAY_MS = 100L
    private const val VISUAL_TIMEOUT_MS = 5000L // no visual state → window not visible → fail, poller retries
    private const val MIN_INK = 0.002           // < 0.2 % dark pixels = blank page
}
