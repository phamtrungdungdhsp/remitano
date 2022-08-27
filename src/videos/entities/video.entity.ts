import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '~core/entities/base.entity';
import { UserEntity } from '~users/entities/user.entity';
import { VideoAdapter } from '~videos/enums/adapter.enum';

@Entity('videos')
export class VideoEntity extends BaseEntity {
  @Column()
  url: string;

  @Column()
  userId: string;

  @Column()
  source: VideoAdapter;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
