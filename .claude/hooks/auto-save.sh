#!/usr/bin/env bash
# Auto-save dead-man for /var/www
#
# Two modes:
#   stop  — Claude Stop hook fires after every Claude response.
#           Records activity timestamp. No commit (keeps active-session
#           git history clean — user can structure real commits manually).
#   timer — Cron entry, runs every 5 min. Auto-commits ONLY when:
#             • Claude has been silent > 30 min (idle / SSH dropped / sleeping)
#             • Repo has uncommitted work
#             • Last commit was > 30 min ago (don't pile on a fresh manual commit)
#
# Why this split: auto-commit during active work clutters git log with
# wip noise; auto-commit only when nobody is around saves work without
# disrupting normal workflow.

set -u

ACTIVITY_FILE="/tmp/.claude-last-activity"
LOG_FILE="/var/www/.claude/auto-save.log"
REPO="/var/www"
IDLE_THRESHOLD_SEC=1800       # 30 min — dead-man trigger
MIN_COMMIT_INTERVAL_SEC=1800  # 30 min — don't override fresh manual commits
MODE="${1:-stop}"
NOW=$(date +%s)

# ─── stop mode: just timestamp activity ───────────────────────────────
if [ "$MODE" = "stop" ]; then
  echo "$NOW" > "$ACTIVITY_FILE"
  exit 0
fi

# ─── timer mode: dead-man auto-commit ─────────────────────────────────
[ "$MODE" = "timer" ] || exit 0

cd "$REPO" 2>/dev/null || exit 0

# Skip if no uncommitted work
[ -n "$(git status --porcelain 2>/dev/null)" ] || exit 0

# Skip if Claude has been active in last 30 min
ACTIVITY_TS=$(cat "$ACTIVITY_FILE" 2>/dev/null || echo 0)
IDLE_SINCE=$((NOW - ACTIVITY_TS))
[ "$IDLE_SINCE" -ge "$IDLE_THRESHOLD_SEC" ] || exit 0

# Skip if last commit is very recent (user mid-workflow)
LAST_COMMIT=$(git log -1 --format=%ct 2>/dev/null || echo 0)
ELAPSED=$((NOW - LAST_COMMIT))
[ "$ELAPSED" -ge "$MIN_COMMIT_INTERVAL_SEC" ] || exit 0

# Stage everything, then defensively unstage sensitive paths
git add -A 2>/dev/null
git reset HEAD -- \
  '.env' '.env.local' '.env.development' '.env.production' \
  '*.pem' '*.key' '*credentials*' '*secret*' \
  2>/dev/null || true

# Nothing staged after exclusions?
[ -n "$(git diff --cached --name-only)" ] || exit 0

TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')

# ─── Staleness guard: code saved but session-state narrative untouched ────────
# Root cause this fixes: the dead-man git-commits work files but NEVER writes the
# session-state.md narrative — that update relies on Claude running /저장 etc,
# which a silently-ended session skips. Result: HEAD has the new code, but the
# "진행 중 / 남음" narrative is stale and the next /개발시작 trusts it.
#
# So: when this commit carries real work files while session-state.md itself was
# NOT updated, stamp a loud, self-replacing banner at the very top of
# session-state.md. /개발시작 always reads that file first, so the gap surfaces
# immediately. We never fabricate narrative — only flag it with the changed-file
# list for git-HEAD reconciliation. When session-state IS updated, strip the banner.
SS=".claude/session-state.md"
STAGED=$(git diff --cached --name-only)
WORK=$(printf '%s\n' "$STAGED" | grep -vxE '\.claude/session-state\.md|\.claude/auto-save\.log|\.claude/settings\.local\.json' || true)
SS_STAGED=$(printf '%s\n' "$STAGED" | grep -xE '\.claude/session-state\.md' || true)
if [ -f "$SS" ]; then
  TMP=$(mktemp)
  # Both paths buffer the body (everything after the title line, minus any old
  # banner and the leading blank lines) so the result round-trips exactly to the
  # original on strip and never accumulates blank lines on repeated re-stamps.
  if [ -n "$WORK" ] && [ -z "$SS_STAGED" ]; then
    # narrative stale → (re)stamp banner with the changed work files
    FILES=$(printf '%s\n' "$WORK" | sed 's#.*/##' | head -12 | paste -sd', ' -)
    awk -v ts="$TIMESTAMP" -v idle="$IDLE_SINCE" -v files="$FILES" '
      NR==1 { title=$0; next }
      /<!-- AUTOSAVE-STALE-BANNER -->/ { skip=1; next }
      /<!-- \/AUTOSAVE-STALE-BANNER -->/ { skip=0; next }
      skip { next }
      !started && $0 ~ /^[[:space:]]*$/ { next }
      { started=1; body = body $0 "\n" }
      END {
        printf "%s\n\n", title;
        print "<!-- AUTOSAVE-STALE-BANNER -->";
        print "> **[AUTO-SAVE STALE] (" ts ", idle " idle "s)** — narrative 가 마지막 편집된 이후 작업 파일이 변경됐는데 narrative 가 미갱신 상태로 자동저장됨. /개발시작 진입 시 git HEAD 와 대조해 진행/완료를 정정하고 이 블록을 삭제할 것.";
        print "> 변경된 작업 파일: " files;
        print "<!-- /AUTOSAVE-STALE-BANNER -->";
        printf "\n%s", body;
      }
    ' "$SS" > "$TMP"
    if [ -s "$TMP" ] && head -1 "$TMP" | grep -q 'Purple POS'; then
      mv "$TMP" "$SS" && git add "$SS"
    else
      rm -f "$TMP"
    fi
  elif [ -n "$SS_STAGED" ] && grep -q 'AUTOSAVE-STALE-BANNER' "$SS"; then
    # session-state was updated → narrative fresh → strip any leftover banner
    awk '
      NR==1 { title=$0; next }
      /<!-- AUTOSAVE-STALE-BANNER -->/ { skip=1; next }
      /<!-- \/AUTOSAVE-STALE-BANNER -->/ { skip=0; next }
      skip { next }
      !started && $0 ~ /^[[:space:]]*$/ { next }
      { started=1; body = body $0 "\n" }
      END { printf "%s\n\n%s", title, body }
    ' "$SS" > "$TMP"
    if [ -s "$TMP" ] && head -1 "$TMP" | grep -q 'Purple POS'; then
      mv "$TMP" "$SS" && git add "$SS"
    else
      rm -f "$TMP"
    fi
  else
    rm -f "$TMP"
  fi
  COUNT=$(git diff --cached --name-only | wc -l | tr -d ' ')
fi

# --no-verify: dead-man path must not block on slow/interactive pre-commit
# hooks. The commit is clearly labelled wip:auto-save so it can be reviewed
# and squashed/cleaned up afterward.
if git -c user.name='Claude AutoSave' -c user.email='autosave@local' \
      commit --no-verify -m "wip: auto-save $TIMESTAMP ($COUNT files, idle ${IDLE_SINCE}s)" >/dev/null 2>&1; then
  mkdir -p "$(dirname "$LOG_FILE")"
  echo "[$TIMESTAMP] auto-saved $COUNT files (idle=${IDLE_SINCE}s)" >> "$LOG_FILE"
fi

exit 0
