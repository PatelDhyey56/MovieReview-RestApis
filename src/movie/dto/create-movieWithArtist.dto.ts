import { CreateMovieArtistDto } from 'src/movie-artist/dto/create-movie-artist.dto';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreaeMovieWithArtistDto extends CreateMovieDto {
  @ApiProperty({
    type: CreateMovieArtistDto,
    isArray: true,
    description: 'This is a required property',
    default: CreateMovieArtistDto,
  })
  @IsNotEmpty({ message: 'Plese Provide Title' })
  @IsArray()
  artists: CreateMovieArtistDto[];
}
