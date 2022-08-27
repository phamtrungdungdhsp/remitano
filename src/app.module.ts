import { Module } from '@nestjs/common';
import { throttlerConfig } from '~config/throttler.config';
import { UserModule } from '~users/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [databaseConfig, throttlerConfig, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
