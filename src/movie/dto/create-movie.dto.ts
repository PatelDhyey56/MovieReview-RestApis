import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IndustryType } from 'src/database/entity/movie.entity';

export class CreateMovieDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'KGF',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: Date,
    description: 'This is a required property',
    default: '2010-06-18',
  })
  @IsNotEmpty()
  @IsString()
  releaseDate: Date;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: '180Min',
  })
  @IsNotEmpty()
  @IsString()
  playTime: string;

  @ApiProperty({
    enum: IndustryType,
    default: IndustryType.SouthIndia,
  })
  @IsEnum(IndustryType)
  industry: IndustryType;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'South India Movie',
  })
  @IsNotEmpty()
  @IsString()
  discription: string;
}
