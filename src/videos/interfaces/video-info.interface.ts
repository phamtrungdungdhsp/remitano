import { UserEntity } from '~users/entities/user.entity';

export interface VideoInforInterface {
  id?: string;
  userId?: string;
  userEmail?: string;
  url: string;
  title: string;
  description: string;
  sharedBy?: UserEntity;
}
