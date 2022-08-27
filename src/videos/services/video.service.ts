import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { errorCode } from '~core/errors/error-code.error';
import { VideoAdapter } from '~videos/enums/adapter.enum';
import { VideoInforInterface } from '~videos/interfaces/video-info.interface';
import { VideoRepository } from '~videos/repositories/video.repository';
import { YoutubeAdapter } from './adapters/youtube.adapter';

@Injectable()
export class VideoService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private videoRepo: VideoRepository,
  ) {}

  async shareVideo(userId: string, url: string): Promise<VideoInforInterface> {
    const source = this.getSourceFromUrl(url);
    if (source === VideoAdapter.UNKNOWN) {
      throw new BadRequestException(errorCode.unknown_adapter);
    }
    const component = this.getAdapter(source);
    const info = await component.getFullInformationOfVideo(url);
    const video = await this.videoRepo.save({ userId, url, source });
    return {
      id: video.id,
      userId,
      ...info,
    };
  }

  private getAdapter(source: VideoAdapter) {
    switch (source) {
      case VideoAdapter.YOUTUBE:
        return new YoutubeAdapter(this.cacheManager);
    }
  }

  private getSourceFromUrl(url: string): VideoAdapter {
    const link = new URL(url);
    if (link.hostname.includes('youtube.com')) {
      return VideoAdapter.YOUTUBE;
    }
    return VideoAdapter.UNKNOWN;
  }
}
