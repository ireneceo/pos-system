#!/bin/bash
# Memory monitoring and auto-optimization script

LOG_FILE="/var/www/logs/memory-monitor.log"
ALERT_THRESHOLD=85  # Alert if memory usage exceeds 85%

# Create log directory if it doesn't exist
mkdir -p /var/www/logs

# Get memory usage percentage
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.0f", $3/$2 * 100}')
SWAP_USAGE=$(free | grep Swap | awk '{printf "%.0f", $3/$2 * 100}')

# Log current status
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Memory: ${MEMORY_USAGE}% | Swap: ${SWAP_USAGE}%" >> $LOG_FILE

# If memory usage is high, take action
if [ $MEMORY_USAGE -gt $ALERT_THRESHOLD ] || [ $SWAP_USAGE -gt 50 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: High memory usage detected!" >> $LOG_FILE

    # Clear cache
    sync
    echo 3 > /proc/sys/vm/drop_caches

    # Restart MySQL if it's using too much swap
    MYSQL_SWAP=$(grep VmSwap /proc/$(pgrep mysqld)/status 2>/dev/null | awk '{print $2}')
    if [ ! -z "$MYSQL_SWAP" ] && [ $MYSQL_SWAP -gt 102400 ]; then  # More than 100MB swap
        echo "[$(date '+%Y-%m-%d %H:%M:%S')] Restarting MySQL due to high swap usage" >> $LOG_FILE
        systemctl restart mysql
    fi

    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Optimization complete" >> $LOG_FILE
fi

# Keep only last 1000 lines of log
tail -1000 $LOG_FILE > ${LOG_FILE}.tmp && mv ${LOG_FILE}.tmp $LOG_FILE
