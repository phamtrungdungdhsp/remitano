import { randomUUID } from 'crypto';
import { DataSource } from 'typeorm';
import { env, isTest } from './env.config';

export const config = {
  type: env.DATABASE.CONNECT,
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USER,
  password: env.DATABASE.PASSWORD,
  database:
    env.DATABASE.NAME +
    (isTest
      ? `_${randomUUID({ disableEntropyCache: true }).replace(/-/g, '')}`
      : ''),
  entities: [`${env.ROOT_PATH}/**/*.entity.${isTest ? 'ts' : 'js'}`],
  synchronize: true,
  migrations: [
    `${env.ROOT_PATH}/dist/migrations/*.js`,
    `${env.ROOT_PATH}/**/databases/migrations/*${isTest ? 'ts' : 'js'}`,
  ],
  migrationsRun: true,
  dropSchema: isTest, // WARNING: must be careful at this option
  logging: false,
};

export default new DataSource(config);
