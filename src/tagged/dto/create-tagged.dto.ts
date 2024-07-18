import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';
import { TaggableType } from 'src/database/entity/tagged.entity';

export class CreateTaggedDto {
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  TaggableId: number;

  @ApiProperty({
    type: Number,
    description: 'This is a required property',
    default: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  TagId: number;

  @ApiProperty({
    description: 'This is a required property',
    enum: TaggableType,
    default: TaggableType.Movie,
  })
  @IsNotEmpty()
  @IsEnum(TaggableType)
  TaggableType: TaggableType;
}
