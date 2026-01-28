module.exports = {
  apps: [
    {
      name: 'dev-backend',
      script: './dev-backend/server.js',
      cwd: '/var/www',
      instances: 1,
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',  // 800MB 초과시 자동 재시작
      node_args: '--max-old-space-size=768',  // Node.js 힙 메모리 768MB
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
      script: './production-backend/server.js',
      cwd: '/var/www',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '800M',  // 800MB 초과시 자동 재시작
      node_args: '--max-old-space-size=768',  // Node.js 힙 메모리 768MB
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
