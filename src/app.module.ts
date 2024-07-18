import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { CommentModule } from './comment/comment.module';
import { MovieArtistModule } from './movie-artist/movie-artist.module';
import { AuthModule } from './auth/auth.module';
import { PhotoModule } from './photo/photo.module';
import { TagModule } from './tag/tag.module';
import { TaggedModule } from './tagged/tagged.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    MovieModule,
    MovieArtistModule,
    PhotoModule,
    CommentModule,
    TagModule,
    TaggedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
