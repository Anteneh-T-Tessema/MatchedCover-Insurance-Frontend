module.exports = {
  apps: [
    {
      name: 'matched-cover-frontend',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_staging: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_TELEMETRY_DISABLED: 1
      },
      // Logging
      log_file: './logs/app.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      
      // Monitoring
      monitoring: false,
      
      // Auto restart
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      
      // Resource limits
      max_memory_restart: '1G',
      
      // Process management
      min_uptime: '10s',
      max_restarts: 5,
      
      // Health monitoring
      health_check_url: 'http://localhost:3000/api/system/health',
      health_check_grace_period: 3000
    }
  ],

  deploy: {
    development: {
      user: 'deploy',
      host: ['dev.matchedcover.com'],
      ref: 'origin/develop',
      repo: 'git@github.com:your-org/matched-cover-frontend.git',
      path: '/var/www/matched-cover-dev',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env development',
      'pre-setup': ''
    },

    staging: {
      user: 'deploy',
      host: ['staging.matchedcover.com'],
      ref: 'origin/staging',
      repo: 'git@github.com:your-org/matched-cover-frontend.git',
      path: '/var/www/matched-cover-staging',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env staging',
      'pre-setup': ''
    },

    production: {
      user: 'deploy',
      host: ['prod1.matchedcover.com', 'prod2.matchedcover.com'],
      ref: 'origin/main',
      repo: 'git@github.com:your-org/matched-cover-frontend.git',
      path: '/var/www/matched-cover-production',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
