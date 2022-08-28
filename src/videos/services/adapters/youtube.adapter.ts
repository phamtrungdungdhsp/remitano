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

  async getFullInformationOfVideo(
    url: string,
  ): Promise<
    Pick<VideoInforInterface, 'url' | 'title' | 'description' | 'iframeUrl'>
  > {
    try {
      const { videoDetails } = await ytdl.getBasicInfo(url);
      return {
        url,
        iframeUrl: videoDetails.embed.iframeUrl,
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

  async getVideosInfo(videos: VideoEntity[]): Promise<VideoInforInterface[]> {
    const result: VideoInforInterface[] = [];
    for (const video of videos) {
      let target: Pick<
        VideoInforInterface,
        'url' | 'title' | 'description' | 'iframeUrl'
      >;
      const cacheData: string = await this.cacheManager.get(
        `${VIDEO_ID}_${video.id}`,
      );
      if (cacheData) {
        target = JSON.parse(cacheData);
      } else {
        target = await this.getFullInformationOfVideo(video.url);
      }
      const payload: VideoInforInterface = {
        id: video.id,
        title: target.title,
        description: target.description,
        url: video.url,
        iframeUrl: target.iframeUrl,
        userEmail: video.user.email,
        userId: video.userId,
        createdAt: video.createdAt,
      };
      result.push(payload);
      await this.cacheVideoInfo(video.id, payload);
    }
    return result;
  }
}
