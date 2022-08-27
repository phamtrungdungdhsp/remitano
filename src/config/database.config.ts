import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
export const databaseConfig = TypeOrmModule.forRootAsync({
  useFactory: () => {
    return config;
  },
});
