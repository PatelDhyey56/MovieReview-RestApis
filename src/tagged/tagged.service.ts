import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaggedDto } from './dto/create-tagged.dto';
import { UpdateTaggedDto } from './dto/update-tagged.dto';
import { Tagged } from 'src/database/entity/tagged.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaggedService {
  constructor(
    @InjectRepository(Tagged)
    private taggedRepository: Repository<Tagged>,
  ) {}

  async create(createTaggedDto: CreateTaggedDto): Promise<Tagged> {
    try {
      return await this.taggedRepository.save(createTaggedDto);
    } catch (err) {
      throw new NotFoundException('Tagged not Created');
    }
  }

  async findAll(): Promise<Tagged[]> {
    try {
      return await this.taggedRepository.find();
    } catch (err) {
      throw new NotFoundException('Taggeds not Found');
    }
  }

  async findOne(id: number): Promise<Tagged> {
    try {
      return await this.taggedRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('Tagged not Found');
    }
  }

  async update(
    id: number,
    updateTaggedDto: UpdateTaggedDto,
  ): Promise<UpdateResult> {
    try {
      return await this.taggedRepository.update({ id }, updateTaggedDto);
    } catch (err) {
      throw new NotFoundException('Tagged not Updeted');
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      return await this.taggedRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('Tagged not Deleted');
    }
  }
}
