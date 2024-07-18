import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from 'src/database/entity/photo.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    try {
      return await this.photoRepository.save(createPhotoDto);
    } catch (err) {
      throw new NotFoundException('Photo not Created');
    }
  }

  async findAll(): Promise<Photo[]> {
    try {
      return await this.photoRepository.find();
    } catch (err) {
      throw new NotFoundException('Photos not Found');
    }
  }

  async findOne(id: number): Promise<Photo> {
    try {
      return await this.photoRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('Photo not Found');
    }
  }

  async update(
    id: number,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<UpdateResult> {
    try {
      return await this.photoRepository.update({ id }, updatePhotoDto);
    } catch (err) {
      throw new NotFoundException('Photo not Updeted');
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.photoRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('Photo not Deleted');
    }
  }
}
