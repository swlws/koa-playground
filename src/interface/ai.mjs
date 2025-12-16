import { callChatWithAI } from '../biz/ai/index.mjs';
import { getSSEClient } from '../biz/sse/index.mjs';

/**
 * Chat with AI and send response via SSE
 * @param {*} ctx
 */
export function chatWithAI(ctx) {
  const client = getSSEClient(ctx);
  const params = ctx.request.body;
  callChatWithAI(client, params.message);

  ctx.body = { code: 0, message: '' };
}
