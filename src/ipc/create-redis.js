import Redis from 'ioredis';

export function createRedisClient() {
  return new Redis({
    host: '127.0.0.1',
    port: 6379,
    password: '',
    retryStrategy(times) {
      // 重连策略，可选
      return Math.min(times * 50, 2000);
    },
  });
}
