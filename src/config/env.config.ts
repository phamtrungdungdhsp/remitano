import * as dotenv from 'dotenv';

export const isTest = process.env.NODE_ENV === 'test';
dotenv.config();

export enum AppEnvEnums {
  LOCAL = 'local',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}

export const env = {
  ROOT_PATH: process.cwd() + (isTest ? '/src' : ''),
  APP_PORT: process.env.APP_PORT,
  APP_ENV: process.env.APP_ENV as AppEnvEnums,
  APP_NAME: 'Restaurant API',
  APP_PREFIX: process.env.APP_PREFIX || 'api',
  WHITELIST_DOMAINS: process.env.WHITELIST_DOMAINS.split(','),
  JSON_BODY_LIMIT: '1mb',
  DATABASE: {
    DRIVER: process.env.DATABASE_DRIVER,
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
  },
  THROTTLE: {
    TTL: Number(process.env.THROTTLE_TTL || 60),
    LIMIT: Number(process.env.THROTTLE_LIMIT || 60),
  },
};

export const isProduction = (): boolean =>
  env.APP_ENV === AppEnvEnums.PRODUCTION;
export const isLocal = (): boolean => env.APP_ENV === AppEnvEnums.LOCAL;
