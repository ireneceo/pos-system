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
      max_memory_restart: '512M',
      node_args: '--max-old-space-size=448',
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      error_file: '/var/www/logs/development/error.log',
      out_file: '/var/www/logs/development/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
