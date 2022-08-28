import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '~typeorm-ex';
import { UserEntity } from './entities/user.entity';
import { UserController } from './http/controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository, UserEntity])],
  exports: [UserService],
  controllers: [],
  providers: [UserService],
})
export class UserModule {}
