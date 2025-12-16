import { sendMessageToSSEClient } from '../sse/index.mjs';
import chatAI from './chat/index.mjs';

export function callChatWithAI(client, message) {
  const messages = [{ role: 'user', content: message }];
  chatAI.chat(messages).then((response) => {
    sendMessageToSSEClient(client, response);
  });
}
