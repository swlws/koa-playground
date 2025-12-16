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

  // client 的唯一标识
  const uuid = ctx.request.query.uuid;
  cacheSSEClient(uuid, client);

  sendConnectedMessageToSSEClient(client);

  if (!global.__MOCK_STARTED__) {
    sendMockMessageToAllSSEClients();
    global.__MOCK_STARTED__ = true;
  }

  ctx.req.on('close', () => {
    console.log('connection closed');
    removeCachedSSEClient(uuid, client);
  });
}
