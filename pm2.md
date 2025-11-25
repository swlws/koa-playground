# PM2

## 🚀 使用命令

✔ 自动部署（可选）

支持 pm2 deploy production 一键上线。

生产环境启动：

```bash
pm2 start ecosystem.config.js --env production
```

热重载（上线时用）：

```bash
pm2 reload api-server
```

查看日志：

```bash
pm2 logs api-server
```
