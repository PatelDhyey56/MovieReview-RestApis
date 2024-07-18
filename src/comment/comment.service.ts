import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/database/entity/movieComment.entity';
import { EntityManager, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private entityManeger: EntityManager,
  ) {}
  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment | string> {
    try {
      return await this.commentRepository.save({
        comment: createCommentDto.comment,
        movieId: createCommentDto.movieId,
        userId,
      });
    } catch (err) {
      throw new NotFoundException('Comment not Created');
    }
  }

  async findAll(): Promise<Comment[]> {
    try {
      return await this.commentRepository.find();
    } catch (err) {
      throw new NotFoundException('Comments not Found');
    }
  }

  async findOne(id: number): Promise<Comment> {
    try {
      return await this.commentRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('Comment not Found');
    }
  }

  async update(
    id: number,
    userId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<UpdateResult | string> {
    try {
      return await this.commentRepository.update(
        { id },
        {
          comment: updateCommentDto.comment,
          movieId: updateCommentDto.movieId,
          userId,
        },
      );
    } catch (err) {
      throw new NotFoundException('Comment not Updated');
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      return await this.commentRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('Comment not Deleted');
    }
  }
}
