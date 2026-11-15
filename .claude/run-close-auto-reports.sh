#!/bin/bash
# 운영에서 해결된 자동 오류 신고 닫기 (2026-11-15 Irene «권고대로») — 인자는 close-auto-reports.js 그대로 ([--apply] 번호@시각 …)
# 배포 전이라 운영에 스크립트가 없을 때 사본을 보내 실행한다. 배포 뒤에는 운영 dev-backend/scripts 에 있음.
F=close-auto-reports.js
scp /var/www/dev-backend/scripts/$F irene@87.106.78.146:/tmp/ && ssh irene@87.106.78.146 "cd /var/www/production-backend && BACKEND_DIR=/var/www/production-backend timeout 60 node /tmp/$F $*; rc=\$?; rm -f /tmp/$F; exit \$rc"
