import { callChatWithAI } from '../biz/ai/index.mjs';
import { getCachedSSEClient } from '../biz/sse/index.mjs';

/**
 * Chat with AI and send response via SSE
 * @param {*} ctx
 */
export function chatWithAI(ctx) {
  const uuid = ctx.headers['sse-uuid'];
  const client = getCachedSSEClient(uuid);

  const params = ctx.request.body;
  callChatWithAI(client, params.message);

  ctx.body = { code: 0, message: '' };
}
