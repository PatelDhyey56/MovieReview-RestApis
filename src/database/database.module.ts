import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (ConfigServic: ConfigService) => ({
        type: 'mysql',
        host: ConfigServic.getOrThrow('DB_HOST'),
        port: ConfigServic.getOrThrow('DB_PORT'),
        username: ConfigServic.getOrThrow('DB_USERNAME'),
        password: ConfigServic.getOrThrow('DB_PASSWORD'),
        database: ConfigServic.getOrThrow('DB_NAME'),
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        entities: [__dirname + '/entity/*.entity{.ts,.js}'],
        synchronize: false,
        // logging: true,
        cli: {
          migrationsDir: __dirname + './migrations/',
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
