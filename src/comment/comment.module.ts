import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from 'src/database/entity/user.entity';
import { Movie } from 'src/database/entity/movie.entity';
import { Comment } from 'src/database/entity/movieComment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
