import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserWithComment {
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

export class UserCommentDto extends CreateUserDto {
  @ApiProperty({
    type: UserWithComment,
    isArray: true,
    description: 'This is a required property',
    default: UserWithComment,
  })
  @IsNotEmpty()
  @IsArray()
  comments: UserWithComment[];
}
