import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from 'src/database/entity/movieComment.entity';
import { UpdateResult } from 'typeorm';
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
import { GetUser } from 'src/helpers/getUserIngo.helper';

@ApiTags('Comment')
@ApiSecurity('JWT-auth')
@ApiNotFoundResponse({
  description: 'Not Found',
})
@ApiBadRequestResponse({ description: 'Bad Request' })
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateCommentDto })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
    type: CreateCommentDto,
  })
  create(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser('id') usarId: number,
  ): Promise<Comment | string> {
    return this.commentService.create(createCommentDto, usarId);
  }

  @Get()
  @ApiOkResponse({
    type: CreateCommentDto,
    isArray: true,
  })
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateCommentDto,
  })
  findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(+id);
  }

  @Put(':id')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateCommentDto })
  @ApiCreatedResponse({
    description: 'Updated Succesfully',
    type: UpdateCommentDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser('id') userId: number,
  ): Promise<UpdateResult | string> {
    return this.commentService.update(+id, userId, updateCommentDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Deleted Succesfully',
    type: CreateCommentDto,
  })
  remove(@Param('id') id: string): Promise<UpdateResult> {
    return this.commentService.remove(+id);
  }
}
