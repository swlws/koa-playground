// redisEventBus.js
import { EventEmitter } from 'events';
import { createRedisClient } from './create-redis';

export class RedisEventEmitter extends EventEmitter {
  constructor(channel) {
    super();
    this.channel = channel;
    this.pub = createRedisClient();
    this.sub = createRedisClient();

    this.sub.subscribe(channel, (err) => {
      if (err) console.error(err);
    });

    this.sub.on('message', (ch, msg) => {
      if (ch === this.channel) {
        const { event, data } = JSON.parse(msg);
        this.emit(event, data);
      }
    });
  }

  emitEvent(event, data) {
    this.pub.publish(this.channel, JSON.stringify({ event, data }));
  }
}
