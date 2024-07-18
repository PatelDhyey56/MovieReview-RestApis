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
import { TaggedService } from './tagged.service';
import { CreateTaggedDto } from './dto/create-tagged.dto';
import { UpdateTaggedDto } from './dto/update-tagged.dto';
import { UpdateResult } from 'typeorm';
import { Tagged } from 'src/database/entity/tagged.entity';

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

@ApiTags('Tagged')
@ApiSecurity('JWT-auth')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('tagged')
export class TaggedController {
  constructor(private readonly taggedService: TaggedService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateTaggedDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateTaggedDto,
  })
  @Roles(UserRole.Admin, UserRole.Actor, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  create(@Body() createTaggedDto: CreateTaggedDto): Promise<Tagged> {
    return this.taggedService.create(createTaggedDto);
  }

  @Get()
  @ApiOkResponse({
    type: CreateTaggedDto,
  })
  findAll(): Promise<Tagged[]> {
    return this.taggedService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateTaggedDto,
  })
  findOne(@Param('id') id: string): Promise<Tagged> {
    return this.taggedService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateTaggedDto })
  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: UpdateResult,
  })
  @Roles(UserRole.Admin, UserRole.Actor, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  update(
    @Param('id') id: string,
    @Body() updateTaggedDto: UpdateTaggedDto,
  ): Promise<UpdateResult> {
    return this.taggedService.update(+id, updateTaggedDto);
  }

  @Delete(':id')
  @ApiBody({ type: CreateTaggedDto })
  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: UpdateResult,
  })
  @Roles(UserRole.Admin, UserRole.Actor, UserRole.Producer)
  @UseGuards(RolePermissinGuard)
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.taggedService.remove(+id);
  }
}
