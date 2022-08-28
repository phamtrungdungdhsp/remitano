import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser } from '~auth/decorators/current-user.decorator';
import { AuthGuard } from '~auth/http/guards/auth.guard';
import { UserEntity } from '~users/entities/user.entity';
import { VideoService } from '~videos/services/video.service';
import { ShareVideoDto } from '../dtos/share-video.dto';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @ApiOperation({
    description: 'Share a video',
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('token')
  @Post()
  @HttpCode(HttpStatus.OK)
  shareVideo(@CurrentUser() user: UserEntity, @Body() videoDto: ShareVideoDto) {
    return this.videoService.shareVideo(user.id, videoDto.url);
  }
}
