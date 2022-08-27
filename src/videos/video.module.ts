import { Module } from '@nestjs/common';
import { cacheConfig } from '~config/cache.config';
import { TypeOrmExModule } from '~typeorm-ex';
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
  ],
})
export class VideoModule {}
