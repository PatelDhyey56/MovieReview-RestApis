import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/database/entity/photo.entity';
import { MovieModule } from 'src/movie/movie.module';
import { MovieArtistModule } from 'src/movie-artist/movie-artist.module';
import { UserModule } from 'src/user/user.module';
import { photofindMiddleware } from './photofind.middleware';

@Module({
  imports: [
    UserModule,
    MovieModule,
    MovieArtistModule,
    TypeOrmModule.forFeature([Photo]),
  ],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(photofindMiddleware)
      .forRoutes(
        { path: 'photo', method: RequestMethod.POST },
        { path: 'photo/:id', method: RequestMethod.PUT },
      );
  }
}
