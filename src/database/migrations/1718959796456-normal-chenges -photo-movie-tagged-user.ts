import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718959796456 implements MigrationInterface {
  name = 'SchemaUpdate1718959796456';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`FK_2542768a00b49aac004c86d93f3\` ON \`photo\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tagged\` DROP COLUMN \`TaggableType\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tagged\` ADD \`TaggableType\` enum ('Movie', 'MovieArtist') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`industry\``);
    await queryRunner.query(
      `ALTER TABLE \`movie\` ADD \`industry\` enum ('Bollywood', 'Hollywood', 'Japan', 'China', 'South Korea', 'South India') NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`mobileNo\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`mobileNo\` varchar(10) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`PhotoType\``);
    await queryRunner.query(
      `ALTER TABLE \`photo\` ADD \`PhotoType\` enum ('User', 'Movie', 'MovieArtist') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`photo\` DROP COLUMN \`PhotoType\``);
    await queryRunner.query(
      `ALTER TABLE \`photo\` ADD \`PhotoType\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`mobileNo\``);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`mobileNo\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`movie\` DROP COLUMN \`industry\``);
    await queryRunner.query(
      `ALTER TABLE \`movie\` ADD \`industry\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tagged\` DROP COLUMN \`TaggableType\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tagged\` ADD \`TaggableType\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX \`FK_2542768a00b49aac004c86d93f3\` ON \`photo\` (\`photoId\`)`,
    );
  }
}
