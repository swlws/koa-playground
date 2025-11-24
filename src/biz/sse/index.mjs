const clients = new Set();

export function getSSEClient(ctx) {
  return ctx.res;
}

export function cacheSSEClient(client) {
  clients.add(client);
}

export function removeCachedSSEClient(client) {
  clients.delete(client);
}

export function sendConnectedMessageToSSEClient(client) {
  client.write(`event: connected\n`);
  client.write(`data: {"msg":"hello"}\n\n`);
}

export function sendMessageToSSEClient(client, message) {
  client.write(`data: ${JSON.stringify(message)}\n\n`);
}

let mockStarted = false;

export function sendMockMessageToAllSSEClients() {
  if (mockStarted) return;
  mockStarted = true;

  setInterval(() => {
    clients.forEach((client) => {
      sendMessageToSSEClient(client, {
        message: 'mock message',
      });
    });
  }, 1000);
}
