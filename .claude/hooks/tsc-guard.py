#!/usr/bin/env python3
"""tsc-guard — PurpleHere 작업방이 프론트 타입 검사(tsc)를 메모리 자리표 없이 직접 치면 막는다 (2026-11-19).

왜: 작업방들이 `npx tsc --noEmit -p . | grep 내파일` 을 자리표 없이 쳤고, 기본 힙(2GB)에서 tsc 가 죽으며(SIGABRT)
    매번 2.3GB 기록 파일을 남겼다 — 2026-11-17~18 다섯 번 · 디스크 11GB. 서버 공용 검사(mem-slot-guard)는
    `tsc -b/--build` 만 막아 `--noEmit` 은 통과했다.
정식 길: `cd /var/www/dev-frontend && npm run typecheck [-- 파일이름…]`
    = dev-backend/scripts/check-type-baseline.js (자리표 purple-typecheck · 힙 3584MB · 증분 캐시 · 기준선 대조 · 파일별 오류 출력).
통과: 명령에 `mem-slot run` 이 있음 · check-type-baseline · tsc -v/--version/--help/--init/--showConfig.
입력: 표준입력으로 명령 글. 막을 것이면 종료 1, 아니면 0. 검사 자체 오류는 0(작업방을 세우지 않음).
"""
import re, sys

HEREDOC = re.compile(r"<<-?\s*(['\"]?)([A-Za-z_][\w-]*)\1")

def strip_quotes(s):
    out, q, i = [], None, 0
    while i < len(s):
        c = s[i]
        if q:
            if c == "\\" and q == '"':
                i += 2; continue
            if c == q:
                q = None; out.append(" ")
        elif c in "'\"":
            q = c
        else:
            out.append(c)
        i += 1
    return "".join(out)

def strip_heredocs(s):
    out, end = [], None
    for ln in s.split("\n"):
        if end is not None:
            if ln.strip() == end:
                end = None
            continue
        out.append(ln)
        m = None
        for m in HEREDOC.finditer(strip_quotes(ln)):
            pass
        if m:
            end = m.group(2)
    return "\n".join(out)

# 명령이 시작되는 자리 뒤의 tsc (mem-slot-guard 와 같은 시작 규칙)
START = r"(?:^|[;&|(\n]|\bthen\b|\bdo\b|\bexec\b|\bnpx\s+(?:--?\S+\s+)*|\b(?:yarn|pnpm)\s+(?:exec\s+)?|\bnpm\s+exec\s+(?:--\s+)?|\btime\s|\btimeout\s+(?:-\S+\s+)*\S+\s|\bnice\s(?:-n\s*-?\d+\s)?|\benv\s|\w+=\S*\s)\s*"
TSC = re.compile(START + r"(?:\S*/)?tsc(?=\s|$|[;&|)])(?P<rest>[^;&|)\n]*)")
HARMLESS = re.compile(r"(?:^|\s)(?:-v|--version|-h|--help|--init|--showConfig)(?=\s|$)")

def blocked(raw):
    if "mem-slot run" in raw or "check-type-baseline" in raw:
        return False
    cmd = strip_quotes(strip_heredocs(raw))
    for m in TSC.finditer(cmd):
        if not HARMLESS.search(m.group("rest")):
            return True
    return False

if __name__ == "__main__":
    try:
        sys.exit(1 if blocked(sys.stdin.read()) else 0)
    except Exception:
        sys.exit(0)
