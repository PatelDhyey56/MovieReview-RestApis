import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { PhotoType } from 'src/database/entity/photo.entity';

export class CreatePhotoDto {
  @ApiProperty({
    type: String,
    // format: 'binary',
    description: 'This is a required property',
    default: 'https://photo.jpg',
  })
  @IsNotEmpty()
  @IsString()
  PhotoUrl: string;

  @ApiProperty({
    enum: PhotoType,
    default: PhotoType.Movie,
  })
  @IsEnum(PhotoType)
  PhotoType: PhotoType;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  photoId: number;
}
