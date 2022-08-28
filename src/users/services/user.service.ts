import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions } from 'typeorm';
import { UserEntity } from '~users/entities/user.entity';
import { UserRepository } from '~users/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private userRepo: UserRepository,
  ) {}

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  findOneWithPassword(
    condition: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | null> {
    return this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('users')
      .where(condition.where)
      .addSelect('users.password')
      .getOne();
  }

  createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    return this.userRepo.save(data);
  }
}
