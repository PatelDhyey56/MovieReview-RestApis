import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'joisharma123@gmail.com',
  })
  @IsNotEmpty({ message: 'Plese Provide Email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'Dev@123',
  })
  @IsNotEmpty({ message: 'Plese Provide Password' })
  @IsString()
  password: string;
}
