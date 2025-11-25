// redisPub.js
import Redis from 'ioredis';
import { createRedisClient } from './create-redis';

const redis = createRedisClient();

// 发布消息
function publish(channel, message) {
  redis.publish(channel, JSON.stringify(message));
}

// 模拟发送
setInterval(() => {
  publish('my_channel', { ts: Date.now(), text: 'Hello from process A' });
}, 2000);
