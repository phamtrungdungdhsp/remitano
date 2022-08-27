import { BadRequestException, Injectable } from '@nestjs/common';
import { errorCode } from '~core/errors/error-code.error';
import { comparePassword, hashPassword } from '~core/helpers/bcrypt.helper';
import { signToken } from '~core/helpers/jwt.helper';
import { UserEntity } from '~users/entities/user.entity';
import { UserStatus } from '~users/enums/user-status.enum';
import { SignInDto } from '~users/http/dtos/sign-in.dto';
import { SignUpDto } from '~users/http/dtos/sign-up.dto';
import { TokenInterface } from '~users/interfaces/token.interface';
import { UserRepository } from '~users/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async signUp(data: SignUpDto): Promise<UserEntity> {
    const existedEmail = await this.userRepo.findOne({
      where: { email: data.email },
    });
    if (existedEmail) {
      throw new BadRequestException(errorCode.user_has_existed);
    }
    const result = await this.userRepo.save({
      ...data,
      password: await hashPassword(data.password),
    });
    delete result.password;
    return result;
  }

  async signIn({ email, password }: SignInDto): Promise<TokenInterface> {
    const user = await this.userRepo.findOne({
      where: { email },
      select: [
        'id',
        'firstName',
        'lastName',
        'status',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!user) {
      throw new BadRequestException(errorCode.email_not_found);
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException(errorCode.password_is_wrong);
    }
    delete user.password;

    if (user.status === UserStatus.BLOCKED) {
      throw new BadRequestException(errorCode.account_blocked);
    }

    const token = signToken({ id: user.id, email: user.email });
    return {
      token,
      data: user,
    };
  }
}
