module.exports = {
  apps: [
    {
      name: 'dev-backend',
      script: './dev-backend/server.js',
      cwd: '/var/www',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',  // 메모리 제한 축소
      node_args: '--max-old-space-size=384',  // Node.js 힙 메모리 제한
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
      instances: 1,  // 2 -> 1로 축소 (메모리 절약 ~100MB)
      exec_mode: 'fork',  // cluster -> fork (단일 인스턴스)
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',  // 메모리 제한 축소
      node_args: '--max-old-space-size=384',  // Node.js 힙 메모리 제한
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
