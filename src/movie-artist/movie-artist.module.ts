import { Module } from '@nestjs/common';
import { MovieArtistService } from './movie-artist.service';
import { MovieArtistController } from './movie-artist.controller';
import { MovieArtist } from 'src/database/entity/movieArtist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MovieArtist])],
  controllers: [MovieArtistController],
  providers: [MovieArtistService],
  exports: [MovieArtistService],
})
export class MovieArtistModule {}
