import { VideoInforInterface } from './video-info.interface';

export interface VideoInterface {
  getFullInformationOfVideo(
    url: string,
  ):
    | Pick<VideoInforInterface, 'url' | 'title' | 'description'>
    | Promise<Pick<VideoInforInterface, 'url' | 'title' | 'description'>>;

  cacheVideoInfo(id: string, payload: VideoInforInterface): void;
}
