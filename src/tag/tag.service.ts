import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/database/entity/tag.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    try {
      return await this.tagRepository.save(createTagDto);
    } catch (err) {
      throw new NotFoundException('Tag not Created');
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      return await this.tagRepository.find();
    } catch (err) {
      throw new NotFoundException('Tags not Found');
    }
  }

  async findOne(id: number): Promise<Tag> {
    try {
      return await this.tagRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('Tag not Found');
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<UpdateResult> {
    try {
      return await this.tagRepository.update({ id }, updateTagDto);
    } catch (err) {
      throw new NotFoundException('Tag not Updeted');
    }
  }

  async remove(id: number): Promise<UpdateResult> {
    try {
      return await this.tagRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('Tag not Deleted');
    }
  }
}
