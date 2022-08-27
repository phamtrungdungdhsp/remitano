import { VideoInforInterface } from './video-info.interface';

export interface VideoInterface {
  getFullInformationOfVideo(
    url: string,
  ): VideoInforInterface | Promise<VideoInforInterface>;

  cacheVideoInfo(id: string, payload: VideoInforInterface): void;
}
