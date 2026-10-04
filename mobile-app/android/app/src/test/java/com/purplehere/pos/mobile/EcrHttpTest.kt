package com.purplehere.pos.mobile

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

/** 단말기 HTTP 응답 본문 해석 — 길이·chunked·헤더 없음(2026-10-04 운영 BAD_RESPONSE 대비). */
class EcrHttpTest {
    private val frame = "02000B010C01C30000003B5003"
    private fun b(s: String) = s.toByteArray(Charsets.ISO_8859_1)
    private fun s(x: ByteArray?) = x?.toString(Charsets.ISO_8859_1)

    @Test fun contentLength() {
        assertEquals(frame, s(EcrHttp.body(b("HTTP/1.1 200 OK\r\nContent-Length: 26\r\n\r\n${frame}EXTRA"))))
    }
    @Test fun chunked() {
        val raw = "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n10\r\n${frame.substring(0, 16)}\r\nA\r\n${frame.substring(16)}\r\n0\r\n\r\n"
        assertEquals(frame, s(EcrHttp.body(b(raw))))
    }
    @Test fun plainUntilClose() {
        assertEquals(frame, s(EcrHttp.body(b("HTTP/1.1 200 OK\r\nConnection: close\r\n\r\n$frame"))))
    }
    @Test fun noHeaders() {
        assertNull(EcrHttp.body(b(frame)))
    }
}
