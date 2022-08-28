import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { UserStatus } from '~users/enums/user-status.enum';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column({ default: UserStatus.ACTIVE })
  status: UserStatus;
}
