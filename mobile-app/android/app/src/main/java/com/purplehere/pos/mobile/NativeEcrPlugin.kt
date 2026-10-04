package com.purplehere.pos.mobile

// 카드단말기 ECR 운반 (GHL, 2026-10-01 · /var/www/.claude/fable-design-20261001-ghl-ecr.md §3-5).
// Windows desktop-pos/src/ecr/exchange.js 와 같은 계약 — window.__NATIVE_ECR.{exchange, discover}.
// 이 파일은 프로토콜을 모른다: 서버가 만든 프레임 hex 를 단말기에 보내고 받은 바이트를 hex 로 돌려줄 뿐.
//
// HTTP 도 java.net.Socket 으로 직접 쓴다 — Android 9+ 의 평문 HTTP 차단(cleartext policy)은
// HttpURLConnection/OkHttp 에만 걸리고 원시 소켓에는 걸리지 않는다. 앱 전체 보안 설정을 풀지 않으려는 선택.
// 안전: 사설망 IPv4 만 허용(웹 페이지가 이 다리로 인터넷 아무 곳에나 요청하지 못하게).
// 연결 전 실패 = CONNECT_* (요청이 단말기에 닿지 않음 → 다시 찾아 같은 요청을 보내도 안전),
// 연결 뒤 무응답 = TIMEOUT (단말기가 처리했을 수 있음 → 다시 보내지 않는다).

import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.io.ByteArrayOutputStream
import java.net.ConnectException
import java.net.Inet4Address
import java.net.InetSocketAddress
import java.net.NetworkInterface
import java.net.Socket
import java.net.SocketTimeoutException
import java.util.concurrent.Callable
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

@CapacitorPlugin(name = "NativeEcr")
class NativeEcrPlugin : Plugin() {

    private val connectMs = 3000
    private val hexRe = Regex("^[0-9A-Fa-f]+$")

    private fun isPrivate(h: String): Boolean {
        val p = h.split(".")
        if (p.size != 4 || p.any { it.toIntOrNull() == null || it.toInt() !in 0..255 }) return false
        val a = p[0].toInt(); val b = p[1].toInt()
        return a == 10 || (a == 192 && b == 168) || (a == 172 && b in 16..31) || a == 127 || (a == 169 && b == 254)
    }

    private fun fail(error: String) = JSObject().apply { put("ok", false); put("error", error) }
    /** 읽을 수 없는 응답도 받은 바이트를 그대로 돌려준다(앞 600바이트) — 서버에 남겨 단말기 실제 형식을 확인한다(2026-10-04 BAD_RESPONSE 원인 실측). */
    private fun failRaw(error: String, raw: ByteArray) = fail(error).apply { if (raw.isNotEmpty()) put("rawHex", bytesToHex(raw.copyOfRange(0, minOf(raw.size, 600)))) }


    private fun hexToBytes(hex: String): ByteArray = ByteArray(hex.length / 2) { i -> hex.substring(i * 2, i * 2 + 2).toInt(16).toByte() }
    private fun bytesToHex(b: ByteArray): String = b.joinToString("") { "%02X".format(it) }

    /** 단말기 1회 왕복. 항상 {ok,…} 를 돌려준다(throw 없음). */
    private fun exchangeJob(host: String, port: Int, transport: String, payloadHex: String, timeoutMs: Int): JSObject {
        if (!isPrivate(host)) return fail("HOST_NOT_ALLOWED")
        if (port !in 1..65535) return fail("BAD_PORT")
        if (payloadHex.isEmpty() || payloadHex.length % 2 != 0 || payloadHex.length > 20000 || !hexRe.matches(payloadHex)) return fail("BAD_PAYLOAD")
        if (transport !in listOf("http-hex", "tcp-hex", "tcp-bin")) return fail("BAD_TRANSPORT")
        val total = timeoutMs.coerceIn(1000, 180000)
        val sock = Socket()
        try {
            try {
                sock.connect(InetSocketAddress(host, port), minOf(connectMs, total))
            } catch (e: SocketTimeoutException) { return fail("CONNECT_TIMEOUT") }
            catch (e: ConnectException) { return fail("CONNECT_REFUSED") }
            catch (e: Exception) { return fail("CONNECT_FAILED") }
            sock.soTimeout = total
            val out = sock.getOutputStream()
            val inp = sock.getInputStream()
            val upper = payloadHex.uppercase()
            return if (transport == "http-hex") {
                val body = upper.toByteArray(Charsets.US_ASCII)
                val head = "POST / HTTP/1.1\r\nHost: $host:$port\r\nContent-Type: text/plain\r\nContent-Length: ${body.size}\r\nConnection: close\r\n\r\n"
                out.write(head.toByteArray(Charsets.US_ASCII)); out.write(body); out.flush()
                val buf = ByteArrayOutputStream()
                val chunk = ByteArray(4096)
                while (true) {
                    // 무응답 TIMEOUT 이어도 받은 바이트가 있으면 함께 남긴다(단말기가 연결을 안 닫는 경우 진단)
                    val n = try { inp.read(chunk) } catch (e: SocketTimeoutException) { return failRaw("TIMEOUT", buf.toByteArray()) }
                    if (n < 0) break
                    buf.write(chunk, 0, n)
                    if (buf.size() > 200000) return fail("TOO_LARGE")
                }
                val raw = buf.toByteArray()
                val resBody = EcrHttp.body(raw) ?: return failRaw("BAD_RESPONSE", raw)
                val bodyText = String(resBody, Charsets.ISO_8859_1).filterNot { it.isWhitespace() }
                when {
                    bodyText.isNotEmpty() && bodyText.length % 2 == 0 && hexRe.matches(bodyText) ->
                        JSObject().apply { put("ok", true); put("responseHex", bodyText.uppercase()) }
                    resBody.isNotEmpty() && resBody[0].toInt() == 0x02 ->
                        JSObject().apply { put("ok", true); put("responseHex", bytesToHex(resBody)) }
                    else -> failRaw("BAD_RESPONSE", raw)
                }
            } else {
                out.write(if (transport == "tcp-bin") hexToBytes(upper) else upper.toByteArray(Charsets.US_ASCII)); out.flush()
                val acc = ByteArrayOutputStream()
                val chunk = ByteArray(4096)
                while (true) {
                    val n = try { inp.read(chunk) } catch (e: SocketTimeoutException) { return fail("TIMEOUT") }
                    if (n < 0) return fail("CLOSED")
                    acc.write(chunk, 0, n)
                    if (acc.size() > 200000) return fail("TOO_LARGE")
                    val frames = if (transport == "tcp-bin") acc.toByteArray()
                        else String(acc.toByteArray(), Charsets.US_ASCII).filterNot { it.isWhitespace() }.let { if (it.length % 2 == 0 && hexRe.matches(it)) hexToBytes(it) else ByteArray(0) }
                    // 완성된 STX..ETX 프레임을 앞에서부터 꺼낸다. 데이터 0 인 ACK 프레임은 결과가 아니다.
                    var p = 0
                    while (p < frames.size) {
                        var s = -1
                        for (k in p until frames.size) if (frames[k].toInt() == 0x02) { s = k; break }
                        if (s < 0 || frames.size < s + 10) break
                        val len = ((frames[s + 8].toInt() and 0xff) shl 8) or (frames[s + 9].toInt() and 0xff)
                        val end = s + 10 + len + 2
                        if (frames.size <= end) break
                        if (frames[end].toInt() != 0x03) { p = s + 1; continue }
                        val isAck = len == 0 && frames[s + 7].toInt() == 0 && (frames[s + 6].toInt() and 0xff) != 0xC3
                        // PayHere Direct 는 결과 전에 Notify(C2 — 카드 넣음·PIN·처리 중)를 보낸다. 결과가 아니다 → 다음 프레임을 기다린다.
                        val isNotify = (frames[s + 6].toInt() and 0xff) == 0xC2
                        if (isAck || isNotify) { p = end + 1; continue }
                        return JSObject().apply { put("ok", true); put("responseHex", bytesToHex(frames.copyOfRange(s, end + 1))) }
                    }
                }
                @Suppress("UNREACHABLE_CODE") fail("NET_ERROR")
            }
        } catch (e: Exception) {
            return fail("NET_ERROR")
        } finally {
            try { sock.close() } catch (_: Exception) {}
        }
    }

    @PluginMethod
    fun exchange(call: PluginCall) {
        val host = call.getString("host") ?: ""
        val port = call.getInt("port") ?: 0
        val transport = call.getString("transport") ?: ""
        val payload = call.getString("payloadHex") ?: ""
        val timeout = call.getInt("timeoutMs") ?: 120000
        Thread { call.resolve(exchangeJob(host, port, transport, payload, timeout)) }.start()
    }

    /** 이 기기 와이파이 대역(사설망, 최대 /22)에서 포트가 열려 있고 GHL Echo 형식으로 답하는 기기만 단말기로 본다. */
    @PluginMethod
    fun discover(call: PluginCall) {
        val port = call.getInt("port") ?: 33898
        val transport = call.getString("transport") ?: "http-hex"
        val probe = call.getString("probeHex") ?: ""
        if (probe.isEmpty() || !hexRe.matches(probe)) { call.resolve(fail("BAD_PROBE")); return }
        Thread {
            val hosts = LinkedHashSet<String>()
            try {
                for (ni in NetworkInterface.getNetworkInterfaces()) {
                    if (!ni.isUp || ni.isLoopback) continue
                    for (ia in ni.interfaceAddresses) {
                        val addr = ia.address as? Inet4Address ?: continue
                        val ip = addr.hostAddress ?: continue
                        if (!isPrivate(ip) || ip.startsWith("127.")) continue
                        var bits = ia.networkPrefixLength.toInt()
                        if (bits < 22) bits = 24
                        val o = ip.split(".").map { it.toLong() }
                        val base = (o[0] shl 24) or (o[1] shl 16) or (o[2] shl 8) or o[3]
                        val mask = (0xFFFFFFFFL shl (32 - bits)) and 0xFFFFFFFFL
                        val net0 = base and mask
                        val size = 1L shl (32 - bits)
                        for (i in 1 until size - 1) {
                            val h = net0 + i
                            if (h == base) continue
                            hosts.add("${(h shr 24) and 255}.${(h shr 16) and 255}.${(h shr 8) and 255}.${h and 255}")
                        }
                    }
                }
            } catch (_: Exception) {}
            // 2026-10-04 Irene 「자동잡히는 문제를 해결하라」: 실제 단말기(.112)를 놓치고 엉뚱한 기기(.120)를 잡았다.
            //   ① 연결 대기 0.4초 → 1.5초 — 와이파이 단말기는 0.4초 안에 응답하지 못할 수 있다.
            //   ② 보낸 프레임을 그대로 돌려준 기기는 단말기가 아니다(우리 요청도 Echo 모양이라 모양 검사만으로는 통과했다).
            //   ③ 연결된 기기마다 무엇이 돌아왔는지 probed 로 돌려준다 — 웹이 서버에 기록해 원인을 실측한다.
            val pool = Executors.newFixedThreadPool(64)
            val open = pool.invokeAll(hosts.take(1100).map { h ->
                Callable {
                    try { Socket().use { it.connect(InetSocketAddress(h, port), 1500) }; h } catch (_: Exception) { null }
                }
            }).mapNotNull { it.get() }
            pool.shutdown(); pool.awaitTermination(5, TimeUnit.SECONDS)
            val echoRe = Regex("^02[0-9A-F]{10}C3[0-9A-F]*03$")
            val probeUp = probe.uppercase()
            val found = JSArray()
            val probed = JSArray()
            for (h in open.sorted()) {
                val r = exchangeJob(h, port, transport, probe, 3000)
                val resp = (r.getString("responseHex") ?: "").uppercase()
                val reflected = resp == probeUp
                val ok = r.getBool("ok") == true && echoRe.matches(resp) && !reflected
                if (ok) found.put(h)
                probed.put(JSObject().apply {
                    put("host", h); put("ok", ok); put("reflected", reflected)
                    if (resp.isNotEmpty()) put("responseHex", resp.take(200)) else put("error", r.getString("error") ?: "NO_RESPONSE")
                    r.getString("rawHex")?.let { put("rawHex", it) }
                })
            }
            call.resolve(JSObject().apply { put("ok", true); put("hosts", found); put("scanned", hosts.size); put("probed", probed) })
        }.start()
    }
}

/** HTTP 응답 본문 해석 — 플러그인 밖 순수 함수(단위 테스트 EcrHttpTest). */
internal object EcrHttp {
    /** HTTP 응답 본문 — Content-Length 와 Transfer-Encoding: chunked 를 따른다(표준). 헤더 끝이 없으면 null. */
    fun body(raw: ByteArray): ByteArray? {
        val text = String(raw, Charsets.ISO_8859_1)
        val sep = text.indexOf("\r\n\r\n")
        if (sep < 0) return null
        val headers = text.substring(0, sep).lowercase()
        var body = raw.copyOfRange(sep + 4, raw.size)
        if (Regex("(^|\r\n)transfer-encoding:[^\r\n]*chunked").containsMatchIn(headers)) {
            val out = ByteArrayOutputStream()
            var p = 0
            while (p < body.size) {
                var e = p
                while (e + 1 < body.size && !(body[e] == '\r'.code.toByte() && body[e + 1] == '\n'.code.toByte())) e++
                if (e + 1 >= body.size) break
                val size = String(body, p, e - p, Charsets.ISO_8859_1).substringBefore(';').trim().toIntOrNull(16) ?: break
                if (size == 0) break
                val start = e + 2
                if (start + size > body.size) { out.write(body, start, body.size - start); break }
                out.write(body, start, size)
                p = start + size + 2
            }
            body = out.toByteArray()
        } else {
            Regex("""(^|\r\n)content-length:\s*(\d+)""").find(headers)?.groupValues?.get(2)?.toIntOrNull()?.let { n ->
                if (n in 0..body.size) body = body.copyOfRange(0, n)
            }
        }
        return body
    }
}
