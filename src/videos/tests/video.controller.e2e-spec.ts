import { AuthTestHelper } from '~auth/tests/auth-test.helper';
import { TestHelper } from '~core/tests/test.helper';
import { UserEntity } from '~users/entities/user.entity';

describe('VideoController(e2e)', () => {
  const testHelper = new TestHelper();
  let token: string;
  let user: UserEntity;
  let authTestHelper: AuthTestHelper;
  const youtubeLink = 'https://www.youtube.com/watch?v=ECZVU4x6Xq0';
  beforeAll(async () => {
    await testHelper.initialize();
    authTestHelper = testHelper.getTestHelperModule(AuthTestHelper);
    user = await authTestHelper.createOne();
    const { body } = await testHelper
      .post('/auth/sign-in')
      .send({
        email: user.email,
        password: 'validpass1',
      })
      .isOk();
    token = body.token;
  });

  afterAll(async () => {
    await testHelper.close();
  });

  describe('GET /videos', () => {
    beforeAll(async () => {
      await testHelper
        .post('/videos')
        .authenticate(token)
        .send({ url: youtubeLink })
        .isOk();
    });

    it('should return expected result', async () => {
      const { body: data } = await testHelper.get('/videos').isOk();
      expect(data.meta).toEqual({
        totalItems: expect.any(Number),
        itemCount: expect.any(Number),
        itemsPerPage: expect.any(Number),
        totalPages: expect.any(Number),
        currentPage: expect.any(Number),
      });

      for (const item of data.items) {
        expect(item).toEqual({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          url: expect.any(String),
          userEmail: expect.any(String),
          userId: expect.any(String),
          createdAt: expect.any(String),
        });
      }
    });
  });

  describe('POST /videos', () => {
    it('should return 400 error if providing invalid url', () => {
      return testHelper
        .post('/videos')
        .authenticate(token)
        .send({ url: 'https://www.youtube.com' })
        .isBadRequestError();
    });

    it('should share video successfully', async () => {
      const { body: data } = await testHelper
        .post('/videos')
        .authenticate(token)
        .send({ url: youtubeLink })
        .isOk();

      expect(data).toEqual({
        id: expect.any(String),
        userId: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        url: expect.any(String),
        createdAt: expect.any(String),
      });
    });
  });
});
