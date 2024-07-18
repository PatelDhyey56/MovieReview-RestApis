import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718878127799 implements MigrationInterface {
  name = 'SchemaUpdate1718878127799';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_2542768a00b49aac004c86d93f3\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_2542768a00b49aac004c86d93f3\` FOREIGN KEY (\`photoId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
