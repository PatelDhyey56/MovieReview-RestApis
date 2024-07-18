import { PartialType } from '@nestjs/swagger';
import { CreateTaggedDto } from './create-tagged.dto';

export class UpdateTaggedDto extends PartialType(CreateTaggedDto) {}
