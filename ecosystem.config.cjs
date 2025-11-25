/**
 * 生产级别 PM2 配置文件
 * 支持：多进程集群、分环境变量、日志分离、内存保护、健康检查等
 */
module.exports = {
  apps: [
    {
      // 进程名称（推荐全小写）
      name: 'api-server',

      // 主入口文件
      script: './src/app.mjs',

      /**
       * Instance 配置
       * max = 使用所有 CPU 核心
       **/
      instances: '1', // max
      exec_mode: 'cluster', // cluster/fork

      /**
       * 生产环境禁止 watch
       **/
      watch: false,

      /**
       * 内存超限自动重启，防止内存泄漏
       **/
      max_memory_restart: '1G',

      /**
       * 环境变量
       */
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: 3000,
      },

      /**
       * 日志配置：强烈推荐放入项目 logs 目录，方便运维收集
       **/
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

      /**
       * 健康检查（可选）
       * 应用必须在启动完成后输出 "ready" 字样，PM2 才认为成功
       **/
      wait_ready: false,
      listen_timeout: 8000,
      kill_timeout: 3000,

      /**
       * 进程挂掉自动重启（默认就是 true）
       */
      autorestart: true,

      /**
       * 最大重启次数（防止重启风暴）
       */
      max_restarts: 10,

      /**
       * 关闭控制台颜色，避免日志被污染
       */
      disable_logs_color: false,
    },
  ],

  /**
   * PM2 自动化部署（可选）
   */
  deploy: {
    production: {
      user: 'root',
      host: 'YOUR_SERVER',
      ref: 'origin/main',
      repo: 'git@github.com:your/repo.git',
      path: '/var/www/api-server',
      'post-deploy':
        'npm install --production && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
