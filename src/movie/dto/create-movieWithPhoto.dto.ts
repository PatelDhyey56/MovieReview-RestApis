import { CreateMovieDto } from './create-movie.dto';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PhotoType } from 'src/database/entity/photo.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieWithPhoto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'https://photo.jpg',
  })
  @IsNotEmpty()
  @IsString()
  PhotoUrl: string;

  @ApiProperty({
    enum: PhotoType,
    default: 'Movie',
  })
  @IsEnum(PhotoType)
  PhotoType: PhotoType;
}

export class CreateMoviePhoto extends CreateMovieDto {
  photos: CreateMovieWithPhoto[];
}
