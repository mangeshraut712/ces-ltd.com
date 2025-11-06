import type { RedisConfigNodejs } from '@upstash/redis';
import { Redis } from '@upstash/redis';

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

let redisInstance: Redis | null = null;

if (redisUrl && redisToken) {
  const config: RedisConfigNodejs = {
    url: redisUrl,
    token: redisToken,
  };
  redisInstance = new Redis(config);
}

export const hasRedis = () => Boolean(redisInstance);

export async function redisGet<T>(key: string): Promise<T | null> {
  if (!redisInstance) {
    return null;
  }

  try {
    return (await redisInstance.get<T>(key)) ?? null;
  } catch (error) {
    console.warn('Redis GET failed:', error);
    return null;
  }
}

export async function redisSet<T>(key: string, value: T, ttlMs?: number) {
  if (!redisInstance) {
    return;
  }

  try {
    if (ttlMs && ttlMs > 0) {
      await redisInstance.set(key, value, { px: ttlMs });
    } else {
      await redisInstance.set(key, value);
    }
  } catch (error) {
    console.warn('Redis SET failed:', error);
  }
}

export async function redisDel(key: string) {
  if (!redisInstance) {
    return;
  }

  try {
    await redisInstance.del(key);
  } catch (error) {
    console.warn('Redis DEL failed:', error);
  }
}
