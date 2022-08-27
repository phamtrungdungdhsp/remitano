import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { VideoService } from '~videos/services/video.service';
import { ShareVideoDto } from '../dtos/share-video.dto';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @ApiOperation({
    description: 'Share a video',
  })
  @Post()
  shareVideo(@Body() videoDto: ShareVideoDto) {
    return this.videoService.shareVideo('a', videoDto.url);
  }
}
