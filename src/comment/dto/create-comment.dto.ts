import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'Good Movie :)',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    default: 1,
  })
  @IsNumberString()
  movieId: number;
}
