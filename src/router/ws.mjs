import { chatHandler, notifyHandler } from '../interface/ws.mjs';

// 用于区分不同 WebSocket 路径
function getWSPath(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  return url.pathname;
}

export const handleWsConnection = (socket, req, wss) => {
  const path = getWSPath(req);

  // ----------- ws 路由分发 -----------
  switch (path) {
    case '/ws/chat':
      return chatHandler(socket, req, wss);

    case '/ws/notify':
      return notifyHandler(socket, req, wss);

    default:
      socket.close();
  }
};
