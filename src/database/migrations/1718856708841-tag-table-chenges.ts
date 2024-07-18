import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718856708841 implements MigrationInterface {
  name = 'SchemaUpdate1718856708841';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tagged\` ADD \`TagId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tagged\` ADD CONSTRAINT \`FK_43594948130af8ee523afbc0527\` FOREIGN KEY (\`TagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tagged\` DROP FOREIGN KEY \`FK_43594948130af8ee523afbc0527\``,
    );
    await queryRunner.query(`ALTER TABLE \`tagged\` DROP COLUMN \`TagId\``);
  }
}
