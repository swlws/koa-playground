const clientMap = new Map();

export function getSSEClient(ctx) {
  return ctx.res;
}

export function cacheSSEClient(uuid, client) {
  clientMap.set(uuid, client);
}

export function getCachedSSEClient(uuid) {
  return clientMap.get(uuid);
}

export function removeCachedSSEClient(uuid) {
  clientMap.delete(uuid);
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
  // mockStarted = true;

  // setInterval(() => {
  //   clients.forEach((client) => {
  //     sendMessageToSSEClient(client, {
  //       message: 'mock message',
  //     });
  //   });
  // }, 1000);
}
