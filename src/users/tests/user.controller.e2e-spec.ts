import { faker } from '@faker-js/faker';
import { isJWT } from 'class-validator';
import { errorCode } from '~core/errors/error-code.error';
import { TestHelper } from '~core/tests/test.helper';
import { UserEntity } from '~users/entities/user.entity';
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
      expect(body.message).toEqual(errorCode.user_has_existed);
    });
  });

  describe('POST /users/sign-in', () => {
    let testUser: UserEntity;
    beforeAll(async () => {
      testUser = await userTestHelper.createOne();
    });

    it('should return 400 if provding non-exist email', async () => {
      const { body } = await testHelper
        .post('/users/sign-in')
        .send({
          email: faker.internet.email(),
          password: 'validpass2',
        })
        .isBadRequestError();
      expect(body.message).toEqual(errorCode.email_not_found);
    });

    it('should return 400 if providing wrong password', async () => {
      const { body } = await testHelper
        .post('/users/sign-in')
        .send({
          email: testUser.email,
          password: 'validpass2',
        })
        .isBadRequestError();
      expect(body.message).toEqual(errorCode.password_is_wrong);
    });

    it('should sign-in successfully', async () => {
      const { body } = await testHelper
        .post('/users/sign-in')
        .send({
          email: testUser.email,
          password: 'validpass1',
        })
        .isOk();
      expect(isJWT(body.token)).toEqual(true);
      expect(body.data).toMatchObject({
        id: testUser.id,
        createdAt: new Date(testUser.createdAt).toISOString(),
        updatedAt: new Date(testUser.updatedAt).toISOString(),
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        status: UserStatus.ACTIVE,
      });
    });
  });
});
