import { UserEntity } from '~users/entities/user.entity';

export interface TokenInterface {
  token: string;
  data: UserEntity;
}
