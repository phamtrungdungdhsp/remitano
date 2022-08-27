import { TestHelper } from '~core/tests/test.helper';
import { UserStatus } from '~users/enums/user-status.enum';
import { UserTestHelper } from './user-test.helper';

describe('UserController (e2e)', () => {
  const testHelper = new TestHelper();
  let userTestHelper: UserTestHelper;

  beforeAll(async () => {
    await testHelper.initialize();
    userTestHelper = testHelper.getTestHelperModule(UserTestHelper);
  });

  afterAll(async () => {
    await testHelper.close();
  });

  describe('POST /users/sign-up', () => {
    it('should return 422 error if the input is invalid', async () => {
      const payload = userTestHelper.createBody();
      await testHelper
        .post('/users/sign-up')
        .send({
          ...payload,
          password: '123',
        })
        .isValidateError();
    });

    it('should sign up successfully', async () => {
      const payload = userTestHelper.createBody();
      const { body } = await testHelper
        .post('/users/sign-up')
        .send(payload)
        .isCreated();
      expect(body.firstName).toEqual(payload.firstName);
      expect(body.lastName).toEqual(payload.lastName);
      expect(body.email).toEqual(payload.email);
      expect(body.status).toEqual(UserStatus.ACTIVE);
      expect(body.id).toEqual(expect.any(String));
    });

    it('should return 400 error if user has existed', async () => {
      const user = await userTestHelper.createOne();
      const payload = userTestHelper.createBody();
      const { body } = await testHelper
        .post('/users/sign-up')
        .send({
          ...payload,
          email: user.email,
        })
        .isBadRequestError();
      expect(body.message).toEqual('User has existed');
    });
  });
});
