import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RedisStore } from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';
import { EnvironmentVariables } from '../interfaces/environment-variables.interface';

export async function bootstrapSession(
  app: NestExpressApplication,
  config: ConfigService<EnvironmentVariables>
) {
  const redisClient = createClient({
    socket: {
      host: config.get('REDIS_HOST') ?? 'redis',
      port: config.get<number>('REDIS_PORT') ?? 6379,
    },
    password: config.get('REDIS_PASSWORD') ?? undefined,
    database: config.get<number>('REDIS_DB') ?? 0,
  });

  await redisClient.connect();

  const store = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
  });

  app.use(
    session({
      store: store,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: 'keyboard cat',
    })
  );
}
