import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { CreateMovieArtistDto } from './create-movie-artist.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateArtistWithMovieDto extends CreateMovieArtistDto {
  @ApiProperty({
    type: CreateMovieDto,
    isArray: true,
    description: 'This is a required property',
    default: CreateMovieDto,
  })
  @IsNotEmpty()
  @IsArray()
  movies: CreateMovieDto[];
}
