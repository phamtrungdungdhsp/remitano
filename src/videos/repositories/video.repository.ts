import { CustomRepository } from '~core/decorators/typeorm-ex.decorator';
import { BaseRepository } from '~core/repositories/base.repository';
import { VideoEntity } from '~videos/entities/video.entity';

@CustomRepository(VideoEntity)
export class VideoRepository extends BaseRepository<VideoEntity> {}
