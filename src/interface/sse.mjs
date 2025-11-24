import {
  getSSEClient,
  cacheSSEClient,
  removeCachedSSEClient,
  sendMessageToSSEClient,
} from '../biz/sse/index.mjs';

const DEFAULT_SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
};

export function keepAliveConnection(ctx) {
  ctx.set(DEFAULT_SSE_HEADERS);
  ctx.status = 200;

  const client = getSSEClient(ctx);

  cacheSSEClient(client);

  sendMessageToSSEClient(client, { msg: 'hello' });

  ctx.req.on('close', () => {
    removeCachedSSEClient(client);
  });
}
