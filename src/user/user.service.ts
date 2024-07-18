import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCommentDto, UserWithComment } from './dto/userComment.dto';
import { Comment } from 'src/database/entity/movieComment.entity';
import * as argon2 from 'argon2';
import { errorResponce } from 'src/helpers/response.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private entityManeger: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | errorResponce> {
    try {
      const password: string = await argon2.hash(createUserDto.password);
      return await this.userRepository.save({ ...createUserDto, password });
    } catch (err) {
      throw new NotFoundException('user not Created');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (err) {
      throw new NotFoundException('users not Found');
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('user not Found');
    }
  }

  async findEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (err) {
      throw new NotFoundException('user not Found by Email');
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult | errorResponce> {
    try {
      const password: string = await argon2.hash(updateUserDto.password);
      return await this.userRepository.update(
        { id },
        { ...updateUserDto, password },
      );
    } catch (err) {
      throw new NotFoundException('user not Updeted');
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      return await this.userRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('user not Deleted');
    }
  }

  async userComment(
    userCommentDto: UserCommentDto,
  ): Promise<{ message: string }> {
    try {
      const { firstName, lastName, mobileNo, email, password } = userCommentDto;
      await this.entityManeger.transaction(
        async (transactionalEntityManager: EntityManager): Promise<void> => {
          const user = await transactionalEntityManager.save(
            new User({ firstName, lastName, mobileNo, email, password }),
          );

          const commentObj: Comment[] = userCommentDto.comments.map(
            (comment: UserWithComment): Comment =>
              new Comment({ ...comment, userId: user.id }),
          );
          await transactionalEntityManager.save(commentObj);
        },
      );
      return { message: 'data added Successfully' };
    } catch (err) {
      throw new NotFoundException('user not Created With Comment');
    }
  }
}
