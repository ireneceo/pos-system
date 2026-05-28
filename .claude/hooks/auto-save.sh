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

# --no-verify: dead-man path must not block on slow/interactive pre-commit
# hooks. The commit is clearly labelled wip:auto-save so it can be reviewed
# and squashed/cleaned up afterward.
if git -c user.name='Claude AutoSave' -c user.email='autosave@local' \
      commit --no-verify -m "wip: auto-save $TIMESTAMP ($COUNT files, idle ${IDLE_SINCE}s)" >/dev/null 2>&1; then
  mkdir -p "$(dirname "$LOG_FILE")"
  echo "[$TIMESTAMP] auto-saved $COUNT files (idle=${IDLE_SINCE}s)" >> "$LOG_FILE"
fi

exit 0
