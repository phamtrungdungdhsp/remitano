import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { errorCode } from '~core/errors/error-code.error';
import { TestHelper } from '~core/tests/test.helper';
import { VideoInforInterface } from '~videos/interfaces/video-info.interface';
import { YoutubeAdapter } from '~videos/services/adapters/youtube.adapter';

describe('Youtube Adapter (unit)', () => {
  const testHelper = new TestHelper();
  let youtubeAdapter: YoutubeAdapter;

  beforeAll(async () => {
    await testHelper.initialize();
    youtubeAdapter =
      testHelper.moduleFixture.get<YoutubeAdapter>(YoutubeAdapter);
  });

  it('should return full information of video', async () => {
    const result = await youtubeAdapter.getFullInformationOfVideo(
      'https://www.youtube.com/watch?v=ECZVU4x6Xq0',
    );
    expect(result).toMatchObject({
      url: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
    });
  });

  it('should return error if entering invalid url', async () => {
    const result = () =>
      youtubeAdapter.getFullInformationOfVideo('https://www.youtube.com');
    expect(result()).rejects.toThrow(BadRequestException);
  });
});
