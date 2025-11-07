module.exports = {
  apps: [{
    name: 'pos-dev-backend',
    script: './server.js',
    cwd: '/var/www/dev-backend',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    kill_timeout: 5000,
    wait_ready: true,
    listen_timeout: 10000,
    env: {
      NODE_ENV: 'development',
      PORT: 3001
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    // Health check 설정
    health_check_grace_period: 3000,
    // PM2 Plus 모니터링 (선택사항)
    pmx: true
  }]
};
