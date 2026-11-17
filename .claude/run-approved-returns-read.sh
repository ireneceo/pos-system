#!/bin/bash
# 운영 «승인됐는데 안 빠진 옛 반품» 읽기 전용 (2026-11-17 · 쓰기 없음)
F=oneoff-read-approved-returns-cn-20261117.js
scp /var/www/.claude/$F irene@87.106.78.146:/tmp/ && ssh irene@87.106.78.146 "cd /var/www/production-backend && timeout 60 node /tmp/$F; rm -f /tmp/$F"
