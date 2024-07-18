import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UpdateResult } from 'typeorm';
import { Tag } from 'src/database/entity/tag.entity';
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
import { UserRole } from 'src/database/entity/user.entity';
import { Roles } from 'src/auth/role-permissin/role-permissin.decorator';
import { RolePermissinGuard } from 'src/auth/role-permissin/role-permissin.guard';

@ApiTags('Tag')
@ApiSecurity('JWT-auth')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateTagDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateTagDto,
  })
  @ApiOkResponse({
    type: CreateTagDto,
  })
  @Roles(UserRole.Admin, UserRole.Actor, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }

  @Get()
  @ApiOkResponse({
    type: CreateTagDto,
    isArray: true,
  })
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateTagDto,
  })
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOkResponse({
    type: CreateTagDto,
  })
  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: UpdateResult,
  })
  @Roles(UserRole.Admin, UserRole.Actor, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<UpdateResult> {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.Actor, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  @ApiOkResponse({
    description: 'Deleted Succesfully',
    type: UpdateResult,
  })
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.tagService.remove(+id);
  }
}
