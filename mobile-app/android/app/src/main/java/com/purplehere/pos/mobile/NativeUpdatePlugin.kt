package com.purplehere.pos.mobile

// 앱 자가 업데이트 (2026-10-04 · /var/www/.claude/fable-design-20261004-android-update.md §5-1)
// Irene 「바꿔. 업데이트 뜨게 해.」 — 웹 배너가 window.__NATIVE_UPDATE.install({url, sha256, size}) 를 부른다.
// 순서: 같은 host(https)만 → cacheDir 로 다운로드 → 크기·sha256 확인(틀리면 파일 삭제) →
//       설치 권한(SDK26+) 없으면 설정 화면을 열고 NEEDS_INSTALL_PERMISSION → FileProvider 로 설치 시트.
// 항상 resolve({ok, error?}) — throw 하지 않는다(ECR·인쇄 브릿지와 같은 계약 버릇).

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import androidx.core.content.FileProvider
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.io.File
import java.net.HttpURLConnection
import java.net.URL
import java.security.MessageDigest
import java.util.concurrent.Executors
import java.util.concurrent.atomic.AtomicBoolean

@CapacitorPlugin(name = "NativeUpdate")
class NativeUpdatePlugin : Plugin() {

    private val executor = Executors.newSingleThreadExecutor()
    private val busy = AtomicBoolean(false)
    private val tag = "NativeUpdate"

    private fun result(ok: Boolean, error: String? = null) = JSObject().apply { put("ok", ok); if (error != null) put("error", error) }

    private fun canInstallNow(): Boolean =
        Build.VERSION.SDK_INT < Build.VERSION_CODES.O || context.packageManager.canRequestPackageInstalls()

    @PluginMethod
    fun canInstall(call: PluginCall) {
        call.resolve(JSObject().apply { put("granted", canInstallNow()) })
    }

    @PluginMethod
    fun install(call: PluginCall) {
        val url = call.getString("url") ?: ""
        val sha = (call.getString("sha256") ?: "").lowercase()
        val size = call.data.optLong("size", -1L)   // getLong 은 Long 인스턴스만 — org.json 은 int 범위를 Integer 로 준다(Fable 게이트 2026-10-04)
        if (!busy.compareAndSet(false, true)) { call.resolve(result(false, "BUSY")); return }
        executor.execute {
            try { call.resolve(runInstall(url, sha, size)) }
            catch (e: Exception) { Log.w(tag, "install failed: ${e.message}"); call.resolve(result(false, "INSTALL_FAILED")) }
            finally { busy.set(false) }
        }
    }

    private fun runInstall(url: String, sha: String, size: Long): JSObject {
        // ① 앱이 연 서버와 같은 host·https 만 — 웹 페이지가 이 다리로 아무 파일이나 설치시키지 못하게(상수 금지: 설정에서 읽는다)
        val appHost = try { Uri.parse(bridge.config.serverUrl ?: "").host } catch (e: Exception) { null }
        val u = try { URL(url) } catch (e: Exception) { return result(false, "BAD_URL") }
        if (u.protocol != "https" || appHost.isNullOrEmpty() || u.host != appHost || !u.path.matches(Regex("^/desktop/PurplePOS-\\d+\\.\\d+\\.\\d+\\.apk$"))) {
            Log.w(tag, "BAD_URL $url (app host $appHost)"); return result(false, "BAD_URL")
        }
        if (!sha.matches(Regex("^[0-9a-f]{64}$")) || size <= 0) return result(false, "BAD_FEED")

        // ② 다운로드 — cacheDir/updates/ 를 비우고 새로
        val dir = File(context.cacheDir, "updates"); dir.deleteRecursively(); dir.mkdirs()
        val file = File(dir, "PurplePOS-update.apk")
        Log.i(tag, "download $url")
        val conn = (u.openConnection() as HttpURLConnection).apply { connectTimeout = 10000; readTimeout = 30000; instanceFollowRedirects = true }
        try {
            if (conn.responseCode != 200) { Log.w(tag, "HTTP ${conn.responseCode}"); return result(false, "DOWNLOAD_FAILED") }
            val md = MessageDigest.getInstance("SHA-256")
            var total = 0L
            conn.inputStream.use { input -> file.outputStream().use { out ->
                val buf = ByteArray(64 * 1024)
                while (true) { val n = input.read(buf); if (n < 0) break; out.write(buf, 0, n); md.update(buf, 0, n); total += n }
            } }
            // ③ 크기·sha256 — 틀리면 파일을 지우고 설치 시트를 띄우지 않는다
            if (total != size) { file.delete(); Log.w(tag, "SIZE_MISMATCH $total != $size"); return result(false, "SIZE_MISMATCH") }
            val got = md.digest().joinToString("") { "%02x".format(it) }
            if (got != sha) { file.delete(); Log.w(tag, "SHA_MISMATCH"); return result(false, "SHA_MISMATCH") }
        } catch (e: Exception) {
            file.delete(); Log.w(tag, "download error ${e.message}"); return result(false, "DOWNLOAD_FAILED")
        } finally { conn.disconnect() }

        // ④ 설치 권한 (Android 8+ 는 앱별 «이 출처 허용»)
        if (!canInstallNow()) {
            Log.i(tag, "needs install permission")
            val i = Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:${context.packageName}")).addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            try { context.startActivity(i) } catch (e: ActivityNotFoundException) { /* 설정 화면이 없는 기기 — 아래 오류로 */ }
            return result(false, "NEEDS_INSTALL_PERMISSION")
        }

        // ⑤ 설치 시트
        return try {
            val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)
            val i = Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/vnd.android.package-archive")
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION)
            context.startActivity(i)
            Log.i(tag, "installer opened")
            result(true)
        } catch (e: ActivityNotFoundException) { result(false, "NO_INSTALLER") }
    }
}
