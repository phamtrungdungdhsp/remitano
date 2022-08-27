import { Module } from '@nestjs/common';
import { cacheConfig } from '~config/cache.config';
import { throttlerConfig } from '~config/throttler.config';
import { UserModule } from '~users/user.module';
import { VideoModule } from '~videos/video.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    databaseConfig,
    cacheConfig,
    throttlerConfig,
    UserModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
