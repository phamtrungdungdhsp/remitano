import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserStatus } from '~users/enums/user-status.enum';

export class CreateTableUser1661582721984 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users (
        id uuid DEFAULT uuid_generate_v4(),
        "firstName" VARCHAR(255),
        "lastName" VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password TEXT,
        status VARCHAR(255) DEFAULT '${UserStatus.ACTIVE}',
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        "deletedAt" TIMESTAMPTZ,
        CONSTRAINT users_id_PK PRIMARY KEY (id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
