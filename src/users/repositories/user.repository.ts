import { CustomRepository } from '~core/decorators/typeorm-ex.decorator';
import { BaseRepository } from '~core/repositories/base.repository';
import { UserEntity } from '~users/entities/user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
