// ws.js

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

// -----------------------------------
// WebSocket 路由①：聊天室
// ws://localhost:3000/ws/chat
// -----------------------------------
function chatHandler(socket, req, wss) {
  socket.send(JSON.stringify({ message: 'Welcome to Chat WS!' }));

  socket.on('message', (msg) => {
    // 广播给所有连接
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            from: 'chat',
            data: msg.toString(),
          })
        );
      }
    });
  });
}

// -----------------------------------
// WebSocket 路由②：通知频道
// ws://localhost:3000/ws/notify
// -----------------------------------
function notifyHandler(socket, req) {
  socket.send(JSON.stringify({ message: 'Connected to Notify WS!' }));

  // 收到消息后，回声式返回
  socket.on('message', (msg) => {
    socket.send(
      JSON.stringify({
        from: 'notify',
        echo: msg.toString(),
      })
    );
  });
}
