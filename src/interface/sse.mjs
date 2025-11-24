import {
  getSSEClient,
  cacheSSEClient,
  removeCachedSSEClient,
  sendMockMessageToAllSSEClients,
  sendConnectedMessageToSSEClient,
} from '../biz/sse/index.mjs';

const DEFAULT_SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
};

export function keepAliveConnection(ctx) {
  ctx.set(DEFAULT_SSE_HEADERS);
  ctx.status = 200;
  ctx.respond = false; // ⚠️ 必须添加

  const client = getSSEClient(ctx);

  cacheSSEClient(client);

  sendConnectedMessageToSSEClient(client);

  if (!global.__MOCK_STARTED__) {
    sendMockMessageToAllSSEClients();
    global.__MOCK_STARTED__ = true;
  }

  ctx.req.on('close', () => {
    console.log('connection closed');
    removeCachedSSEClient(client);
  });
}
