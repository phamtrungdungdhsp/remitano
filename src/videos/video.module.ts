import { Module } from '@nestjs/common';
import { AuthModule } from '~auth/auth.module';
import { cacheConfig } from '~config/cache.config';
import { TypeOrmExModule } from '~typeorm-ex';
import { UserModule } from '~users/user.module';
import { VideoEntity } from './entities/video.entity';
import { VideoController } from './http/controllers/video.controller';
import { VideoRepository } from './repositories/video.repository';
import { VideoService } from './services/video.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  exports: [],
  imports: [
    cacheConfig,
    TypeOrmExModule.forCustomRepository([VideoEntity, VideoRepository]),
    AuthModule,
    UserModule,
  ],
})
export class VideoModule {}
