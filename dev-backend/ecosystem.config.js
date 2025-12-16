module.exports = {
  apps: [
    {
      name: 'dev-backend',
      script: './server.js',
      cwd: '/var/www/dev-backend',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
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
      instances: 2,
      exec_mode: 'cluster',
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
