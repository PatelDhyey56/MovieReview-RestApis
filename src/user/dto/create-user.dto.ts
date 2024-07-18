import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { UserRole } from 'src/database/entity/user.entity';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'Joi',
  })
  @IsNotEmpty({ message: 'Plese Provide FirstName' })
  @IsString()
  @Length(3, 20)
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'sharama',
  })
  @IsNotEmpty({ message: 'Plese Provide LastName' })
  @IsString()
  @Length(3, 20)
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: '8203456798',
  })
  @IsNotEmpty({ message: 'Plese Provide MoblieNo' })
  @IsString()
  @Length(10)
  mobileNo: string;

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

  @ApiPropertyOptional({
    enum: UserRole,
    default: UserRole.User,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
