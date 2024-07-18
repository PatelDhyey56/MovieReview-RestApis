import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: '#500',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: '#500 Cr Collection',
  })
  @IsNotEmpty()
  @IsString()
  discription: string;
}
