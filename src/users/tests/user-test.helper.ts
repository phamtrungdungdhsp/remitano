import { faker } from '@faker-js/faker';
import { hashPassword } from '~core/helpers/bcrypt.helper';
import { TestHelper } from '~core/tests/test.helper';
import { SignUpDto } from '~users/http/dtos/sign-up.dto';
import { UserRepository } from '~users/repositories/user.repository';

export class UserTestHelper {
  userRepo: UserRepository;
  constructor(private testHelper: TestHelper) {
    this.userRepo = this.testHelper.app.get(UserRepository);
  }

  createBody(password?: string): SignUpDto {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: password ?? 'validpass1',
    };
  }

  async createOne() {
    const body = this.createBody();
    const user = await this.userRepo.save({
      ...body,
      password: await hashPassword(body.password),
    });
    return user;
  }
}
