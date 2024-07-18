import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from 'src/database/entity/photo.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Photos')
@ApiSecurity('JWT-auth')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreatePhotoDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreatePhotoDto,
  })
  // @UseInterceptors(FileInterceptor('file', multerOptions))
  create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photoService.create(createPhotoDto);
  }

  @Get()
  @ApiOkResponse({
    type: CreatePhotoDto,
    isArray: true,
  })
  findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreatePhotoDto,
  })
  findOne(@Param('id') id: string): Promise<Photo> {
    return this.photoService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdatePhotoDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: UpdatePhotoDto,
  })
  update(
    @Param('id') id: string,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ): Promise<UpdateResult> {
    return this.photoService.update(+id, updatePhotoDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: DeleteResult,
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.photoService.remove(+id);
  }
}
