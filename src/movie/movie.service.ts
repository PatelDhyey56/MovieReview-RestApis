import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from 'src/database/entity/movie.entity';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreaeMovieWithArtistDto } from './dto/create-movieWithArtist.dto';
import { MovieArtist } from 'src/database/entity/movieArtist.entity';
import { CreateMovieArtistDto } from 'src/movie-artist/dto/create-movie-artist.dto';
import { Photo, PhotoType } from 'src/database/entity/photo.entity';
import {
  CreateMoviePhoto,
  CreateMovieWithPhoto,
} from './dto/create-movieWithPhoto.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    private entityManeger: EntityManager,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      return await this.movieRepository.save(createMovieDto);
    } catch (err) {
      throw new NotFoundException('Movie not Created');
    }
  }

  async findAll(): Promise<Movie[]> {
    try {
      return await this.movieRepository.find();
    } catch (err) {
      throw new NotFoundException('Movies not Found');
    }
  }

  async findOne(id: number): Promise<Movie> {
    try {
      return await this.movieRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('Movie not Found');
    }
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<UpdateResult> {
    try {
      return await this.movieRepository.update({ id }, updateMovieDto);
    } catch (err) {
      throw new NotFoundException('Movie not Updated');
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.movieRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('Movie not Deletd');
    }
  }

  async MoviewithArtist(
    createMovieArtistWithMovieDto: CreaeMovieWithArtistDto,
  ): Promise<Movie> {
    try {
      const artists: MovieArtist[] = createMovieArtistWithMovieDto.artists.map(
        (aetist: CreateMovieArtistDto): MovieArtist => new MovieArtist(aetist),
      );

      const movie = new Movie({
        ...createMovieArtistWithMovieDto,
        artists,
      });
      return await this.movieRepository.save(movie);
    } catch (err) {
      throw new NotFoundException('Movie not Created With Movie-Artist');
    }
  }
  async MoviewithPhoto(
    createMoviePhoto: CreateMoviePhoto,
  ): Promise<{ message: string }> {
    try {
      const { title, releaseDate, playTime, industry, discription } =
        createMoviePhoto;

      await this.entityManeger.transaction(
        async (transactionalEntityManager: EntityManager): Promise<void> => {
          const movie = await transactionalEntityManager.save(
            new Movie({ title, releaseDate, playTime, industry, discription }),
          );

          const photoObj: Photo[] = createMoviePhoto.photos.map(
            (photo: CreateMovieWithPhoto): Photo =>
              new Photo({
                ...photo,
                photoId: movie.id,
                PhotoType: PhotoType.Movie,
              }),
          );

          await transactionalEntityManager.save(photoObj);
        },
      );
      return { message: 'data added Successfully' };
    } catch (err) {
      throw new NotFoundException('Movie not Created With Photos');
    }
  }

  async MoviewithPhotos(id: number): Promise<Photo[]> {
    try {
      return await this.entityManeger.find(Photo, {
        where: {
          photoId: id,
          PhotoType: PhotoType.Movie,
        },
      });
    } catch (err) {
      throw new NotFoundException('Photos not Found');
    }
  }
}
