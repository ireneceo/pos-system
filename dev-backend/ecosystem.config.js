module.exports = {
  apps: [
    {
      name: 'dev-backend',
      script: './server.js',
      cwd: '/var/www/dev-backend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_restarts: 10,
      min_uptime: 5000,
      restart_delay: 4000,
      watch: false,
      max_memory_restart: '1G',
      kill_timeout: 5000,
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      error_file: '/var/www/logs/development/error.log',
      out_file: '/var/www/logs/development/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'production-backend',
      script: './server.js',
      cwd: '/var/www/production-backend',
      // 2026-11-08 현재 운영 실제값 = fork 1개(pm2 jlist 실측). 프로세스를 늘리려면 먼저:
      //   ① 스케줄러 주인 가드(utils/schedulerOwner) ② 소켓 Redis 어댑터(services/socketService)
      //   ③ 요청 제한 저장소 공유(rate-limit 메모리 → Redis) ④ DB pool 20×N + planq < max_connections
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      error_file: '/var/www/logs/production/error.log',
      out_file: '/var/www/logs/production/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
