import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVideos1661610164342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE videos (
            id uuid DEFAULT uuid_generate_v4(),
            "url" VARCHAR(1000) NOT NULL,
            "source" VARCHAR(255) NOT NULL,
            "userId" uuid NOT NULL,
            "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            "deletedAt" TIMESTAMPTZ,
            CONSTRAINT videos_id_PK PRIMARY KEY (id),
            CONSTRAINT videos_users_FK FOREIGN KEY ("userId") REFERENCES users(id)
          )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE videos DROP CONSTRAINT videos_users_FK`,
    );
    await queryRunner.query(`DROP TABLE videos`);
  }
}
