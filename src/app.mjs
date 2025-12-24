import Koa from 'koa';
import cors from 'koa2-cors';
import koaBody from 'koa-body';
import koaStatic from 'koa-static';
import { WebSocketServer } from 'ws';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import router from './router/index.mjs';
import { handleWsConnection } from './router/ws.mjs';

const app = new Koa();

// 静态资源中间件（托管 public 目录）

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(koaStatic(path.join(__dirname, '../public')));

// --- 常用能力 ---
app.use(cors()); // 支持跨域
app.use(
  koaBody({
    multipart: true,
    formidable: {
      keepExtensions: true,
      maxFileSize: 200 * 1024 * 1024, // 200MB
    },
  })
); // 支持 JSON body / form-data / 文件上传

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 创建 HTTP Server
const server = http.createServer(app.callback());

// 挂载 WebSocket Server
const wss = new WebSocketServer({ server });

// 绑定 ws 路由（所有 ws 逻辑放在 wsHandlers 中）
wss.on('connection', (socket, req) => {
  handleWsConnection(socket, req, wss);
});

// 启动服务
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
