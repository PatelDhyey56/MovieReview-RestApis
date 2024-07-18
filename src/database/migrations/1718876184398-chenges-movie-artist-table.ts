import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718876184398 implements MigrationInterface {
  name = 'SchemaUpdate1718876184398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`movie_artists_movie_artist\` (\`movieId\` int NOT NULL, \`movieArtistId\` int NOT NULL, INDEX \`IDX_ee92bf70efc098f02195970fdd\` (\`movieId\`), INDEX \`IDX_901a9fddf1799d1dc720ef8e7e\` (\`movieArtistId\`), PRIMARY KEY (\`movieId\`, \`movieArtistId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artists_movie_artist\` ADD CONSTRAINT \`FK_ee92bf70efc098f02195970fdd9\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artists_movie_artist\` ADD CONSTRAINT \`FK_901a9fddf1799d1dc720ef8e7e5\` FOREIGN KEY (\`movieArtistId\`) REFERENCES \`movie_artist\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie_artists_movie_artist\` DROP FOREIGN KEY \`FK_901a9fddf1799d1dc720ef8e7e5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artists_movie_artist\` DROP FOREIGN KEY \`FK_ee92bf70efc098f02195970fdd9\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_901a9fddf1799d1dc720ef8e7e\` ON \`movie_artists_movie_artist\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ee92bf70efc098f02195970fdd\` ON \`movie_artists_movie_artist\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_artists_movie_artist\``);
  }
}
