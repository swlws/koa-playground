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

export function sendMessageToSSEClient(client, message) {
  client.write(`data: ${JSON.stringify(message)}\n\n`);
}
