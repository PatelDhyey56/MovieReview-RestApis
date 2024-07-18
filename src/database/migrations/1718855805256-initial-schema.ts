import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1718855805256 implements MigrationInterface {
  name = 'SchemaUpdate1718855805256';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`photo\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`PhotoUrl\` varchar(255) NOT NULL, \`PhotoType\` varchar(255) NOT NULL, \`photoId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tagged\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`TaggableId\` int NOT NULL, \`TaggableType\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_artist\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`contectNo\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('Actor', 'Producer', 'Writer', 'VedioEditer', 'VoiceArtist') NOT NULL DEFAULT 'Actor', UNIQUE INDEX \`IDX_015cead855ed5be3a5760cf433\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`releaseDate\` datetime NOT NULL, \`playTime\` varchar(255) NOT NULL, \`industry\` varchar(255) NOT NULL, \`discription\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`comment\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`comment\` varchar(255) NOT NULL, \`userId\` int NOT NULL, \`movieId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(20) NOT NULL, \`lastName\` varchar(20) NOT NULL, \`mobileNo\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'Actor', 'Producer', 'User') NOT NULL DEFAULT 'User', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tag\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`discription\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_artist_movies_movie\` (\`movieArtistId\` int NOT NULL, \`movieId\` int NOT NULL, INDEX \`IDX_6ae38927cad15ac79a98402f14\` (\`movieArtistId\`), INDEX \`IDX_2b35a2f9e3a51a54cf5108c9cc\` (\`movieId\`), PRIMARY KEY (\`movieArtistId\`, \`movieId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_artist_tags_tagged\` (\`movieArtistId\` int NOT NULL, \`taggedId\` int NOT NULL, INDEX \`IDX_95cd637b6ec3ff2cf84fdece3d\` (\`movieArtistId\`), INDEX \`IDX_1de42136ea5543b333db6e6a89\` (\`taggedId\`), PRIMARY KEY (\`movieArtistId\`, \`taggedId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`movie_tags_tagged\` (\`movieId\` int NOT NULL, \`taggedId\` int NOT NULL, INDEX \`IDX_b08bf7d704747e9060d80ccdb7\` (\`movieId\`), INDEX \`IDX_4d0a0f9be81b9e6efe26a98de1\` (\`taggedId\`), PRIMARY KEY (\`movieId\`, \`taggedId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_2542768a00b49aac004c86d93f3\` FOREIGN KEY (\`photoId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_aea4918c888422550a85e257894\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_movies_movie\` ADD CONSTRAINT \`FK_6ae38927cad15ac79a98402f141\` FOREIGN KEY (\`movieArtistId\`) REFERENCES \`movie_artist\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_movies_movie\` ADD CONSTRAINT \`FK_2b35a2f9e3a51a54cf5108c9cc0\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_tags_tagged\` ADD CONSTRAINT \`FK_95cd637b6ec3ff2cf84fdece3de\` FOREIGN KEY (\`movieArtistId\`) REFERENCES \`movie_artist\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_tags_tagged\` ADD CONSTRAINT \`FK_1de42136ea5543b333db6e6a89d\` FOREIGN KEY (\`taggedId\`) REFERENCES \`tagged\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_tags_tagged\` ADD CONSTRAINT \`FK_b08bf7d704747e9060d80ccdb7b\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_tags_tagged\` ADD CONSTRAINT \`FK_4d0a0f9be81b9e6efe26a98de16\` FOREIGN KEY (\`taggedId\`) REFERENCES \`tagged\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`movie_tags_tagged\` DROP FOREIGN KEY \`FK_4d0a0f9be81b9e6efe26a98de16\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_tags_tagged\` DROP FOREIGN KEY \`FK_b08bf7d704747e9060d80ccdb7b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_tags_tagged\` DROP FOREIGN KEY \`FK_1de42136ea5543b333db6e6a89d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_tags_tagged\` DROP FOREIGN KEY \`FK_95cd637b6ec3ff2cf84fdece3de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_movies_movie\` DROP FOREIGN KEY \`FK_2b35a2f9e3a51a54cf5108c9cc0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`movie_artist_movies_movie\` DROP FOREIGN KEY \`FK_6ae38927cad15ac79a98402f141\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_aea4918c888422550a85e257894\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_2542768a00b49aac004c86d93f3\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4d0a0f9be81b9e6efe26a98de1\` ON \`movie_tags_tagged\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b08bf7d704747e9060d80ccdb7\` ON \`movie_tags_tagged\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_tags_tagged\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_1de42136ea5543b333db6e6a89\` ON \`movie_artist_tags_tagged\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_95cd637b6ec3ff2cf84fdece3d\` ON \`movie_artist_tags_tagged\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_artist_tags_tagged\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_2b35a2f9e3a51a54cf5108c9cc\` ON \`movie_artist_movies_movie\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6ae38927cad15ac79a98402f14\` ON \`movie_artist_movies_movie\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_artist_movies_movie\``);
    await queryRunner.query(`DROP TABLE \`tag\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`comment\``);
    await queryRunner.query(`DROP TABLE \`movie\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_015cead855ed5be3a5760cf433\` ON \`movie_artist\``,
    );
    await queryRunner.query(`DROP TABLE \`movie_artist\``);
    await queryRunner.query(`DROP TABLE \`tagged\``);
    await queryRunner.query(`DROP TABLE \`photo\``);
  }
}
