import { BadRequestException, Injectable } from '@nestjs/common';
import { hashPassword } from '~core/helpers/bcrypt.helper';
import { UserEntity } from '~users/entities/user.entity';
import { SignUpDto } from '~users/http/dtos/sign-up.dto';
import { UserRepository } from '~users/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async signUp(data: SignUpDto): Promise<UserEntity> {
    const existedEmail = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existedEmail) {
      throw new BadRequestException('User has existed');
    }
    const result = await this.userRepo.save({
      ...data,
      password: await hashPassword(data.password),
    });
    delete result.password;
    return result;
  }
}
