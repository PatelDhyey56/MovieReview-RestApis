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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from 'src/database/entity/user.entity';
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
import { UpdateResult } from 'typeorm';
import { UserCommentDto } from './dto/userComment.dto';
import { errorResponce } from 'src/helpers/response.helper';
import { Public } from 'src/helpers/publicRoute';
import { Roles } from 'src/auth/role-permissin/role-permissin.decorator';
import { RolePermissinGuard } from 'src/auth/role-permissin/role-permissin.guard';

@ApiTags('user')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateUserDto,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User | errorResponce> {
    return this.userService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get()
  @ApiOkResponse({
    type: CreateUserDto,
    isArray: true,
  })
  @Roles(UserRole.Admin)
  @UseGuards(RolePermissinGuard)
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiSecurity('JWT-auth')
  @Get(':id')
  @ApiOkResponse({
    type: CreateUserDto,
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @ApiSecurity('JWT-auth')
  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateUserDto })
  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: UpdateResult,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | errorResponce> {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: UpdateResult,
  })
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.userService.remove(+id);
  }

  @ApiSecurity('JWT-auth')
  @Post('/comment')
  @ApiBody({ type: UserCommentDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: UserCommentDto,
  })
  userComment(
    @Body() userCommentDto: UserCommentDto,
  ): Promise<{ message: string }> {
    return this.userService.userComment(userCommentDto);
  }
}
