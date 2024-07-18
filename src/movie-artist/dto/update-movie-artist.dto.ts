import { PartialType } from '@nestjs/swagger';
import { CreateMovieArtistDto } from './create-movie-artist.dto';

export class UpdateMovieArtistDto extends PartialType(CreateMovieArtistDto) {}
