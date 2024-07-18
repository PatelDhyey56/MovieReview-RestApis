import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { artistRole } from 'src/database/entity/movieArtist.entity';

export class CreateMovieArtistDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'karanSharma',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: '7946310258',
  })
  @IsNotEmpty()
  @IsString()
  @Length(10)
  contectNo: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    default: 'karanSharma123@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    enum: artistRole,
    description: 'This is a required property',
    default: artistRole.Actor,
  })
  @IsEnum(artistRole)
  role: artistRole;
}
