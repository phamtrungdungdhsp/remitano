import { AuthTestHelper } from '~auth/tests/auth-test.helper';
import { TestHelper } from '~core/tests/test.helper';
import { UserEntity } from '~users/entities/user.entity';

describe('VideoController(e2e)', () => {
  const testHelper = new TestHelper();
  let token: string;
  let user: UserEntity;
  let authTestHelper: AuthTestHelper;
  beforeAll(async () => {
    await testHelper.initialize();
    authTestHelper = testHelper.getTestHelperModule(AuthTestHelper);
    user = await authTestHelper.createOne();
  });

  afterAll(async () => {
    await testHelper.close();
  });

  describe('POST /videos', () => {
    beforeAll(async () => {
      const { body } = await testHelper
        .post('/auth/sign-in')
        .send({
          email: user.email,
          password: 'validpass1',
        })
        .isOk();
      token = body.token;
    });

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
        .send({ url: 'https://www.youtube.com/watch?v=CvyAxtpecPA' })
        .isOk();

      expect(data).toEqual({
        id: expect.any(String),
        userId: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        url: expect.any(String),
      });
    });
  });
});
