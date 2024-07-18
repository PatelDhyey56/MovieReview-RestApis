import { CreateMovieArtistDto } from './create-movie-artist.dto';
import { CreateMovieWithPhoto } from 'src/movie/dto/create-movieWithPhoto.dto';

export class CreateArtistPhoto extends CreateMovieArtistDto {
  photos: CreateMovieWithPhoto[];
}
