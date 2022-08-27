import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { VideoInforInterface } from '~videos/interfaces/video-info.interface';
import { VideoInterface } from '~videos/interfaces/video.interface';
import ytdl from 'ytdl-core';
import { errorCode } from '~core/errors/error-code.error';
import { Cache } from 'cache-manager';
import { VIDEO_ID } from '~videos/constants/redis-key.constant';
import { VideoEntity } from '~videos/entities/video.entity';

@Injectable()
export class YoutubeAdapter implements VideoInterface {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async getFullInformationOfVideo(url: string): Promise<VideoInforInterface> {
    try {
      const { videoDetails } = await ytdl.getBasicInfo(url);
      return {
        url,
        title: videoDetails.title,
        description: videoDetails.description,
      };
    } catch (e) {
      throw new BadRequestException(errorCode.url_is_invalid);
    }
  }

  async cacheVideoInfo(
    id: string,
    payload: VideoInforInterface,
  ): Promise<void> {
    await this.cacheManager.set(`${VIDEO_ID}_${id}`, JSON.stringify(payload), {
      ttl: 300,
    });
  }

  async getVideosInfo(videos: VideoEntity[]): Promise<VideoEntity[]> {
    const result: VideoEntity[] = [];
    for (const video of videos) {
      let target: VideoInforInterface;
      const cacheData: string = await this.cacheManager.get(
        `${VIDEO_ID}_${video.id}`,
      );
      if (cacheData) {
        target = JSON.parse(cacheData);
      } else {
        target = await this.getFullInformationOfVideo(video.url);
      }
      video.title = target.title;
      video.description = target.description;
      result.push(video);
    }
    return result;
  }
}
