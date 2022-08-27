import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { env } from './env.config';

export const cacheConfig = CacheModule.registerAsync({
  useFactory: () => ({
    isGlobal: true,
    store: redisStore,
    host: env.REDIS.HOST,
    port: env.REDIS.PORT,
    ttl: 300, // 5 minutes
  }),
});
