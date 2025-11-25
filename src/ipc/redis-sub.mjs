// redisSub.js
import { createRedisClient } from './create-redis';

const redis = createRedisClient();

// 订阅频道
redis.subscribe('my_channel', (err, count) => {
  if (err) {
    console.error('Subscribe failed:', err);
  } else {
    console.log(`Subscribed to ${count} channel(s).`);
  }
});

// 接收消息
redis.on('message', (channel, message) => {
  console.log('Received message:', channel, JSON.parse(message));
});
