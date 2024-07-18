import { MovieArtist } from 'src/database/entity/movieArtist.entity';
import { CreateMovieArtistDto } from './dto/create-movie-artist.dto';
import { UpdateMovieArtistDto } from './dto/update-movie-artist.dto';
import { DeleteResult, EntityManager, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from 'src/database/entity/movie.entity';
import { CreateArtistWithMovieDto } from './dto/create-artistWithMovie.dto';
import { CreateMovieDto } from 'src/movie/dto/create-movie.dto';
import { CreateArtistPhoto } from './dto/artistWithPhoto.dto';
import { Photo, PhotoType } from 'src/database/entity/photo.entity';
import { CreateMovieWithPhoto } from 'src/movie/dto/create-movieWithPhoto.dto';

@Injectable()
export class MovieArtistService {
  constructor(
    @InjectRepository(MovieArtist)
    private movieArtistRepository: Repository<MovieArtist>,
    private entityManeger: EntityManager,
  ) {}
  async create(
    createMovieArtistDto: CreateMovieArtistDto,
  ): Promise<MovieArtist> {
    try {
      return await this.movieArtistRepository.save(createMovieArtistDto);
    } catch (err) {
      throw new NotFoundException('Movie-Artist not Created');
    }
  }

  async findAll(): Promise<MovieArtist[]> {
    try {
      return await this.movieArtistRepository.find();
    } catch (err) {
      throw new NotFoundException('Movie-Artists not Found');
    }
  }

  async findOne(id: number): Promise<MovieArtist> {
    try {
      return await this.movieArtistRepository.findOneByOrFail({ id });
    } catch (err) {
      throw new NotFoundException('Movie-Artist not Found');
    }
  }

  async update(
    id: number,
    updateMovieArtistDto: UpdateMovieArtistDto,
  ): Promise<UpdateResult> {
    try {
      return await this.movieArtistRepository.update(
        { id },
        updateMovieArtistDto,
      );
    } catch (err) {
      throw new NotFoundException('Movie-Artist not Updated');
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      return await this.movieArtistRepository.softDelete({ id });
    } catch (err) {
      throw new NotFoundException('Movie-Artist not Deleted');
    }
  }

  async ArtistWithMovie(
    createArtistWithMovieDto: CreateArtistWithMovieDto,
  ): Promise<{ message: string }> {
    try {
      //  const movies: Movie[] = createArtistWithMovieDto.movies.map(
      //    (movie: CreateMovieDto): Movie => new Movie(movie),
      //  );
      //  const movieArtist = new MovieArtist({
      //    ...createArtistWithMovieDto,
      //    movies,
      //  });
      //  console.log(MovieArtist);
      //  return await this.movieArtistRepository.save(movieArtist);

      const { name, contectNo, email, role } = createArtistWithMovieDto;
      await this.entityManeger.transaction(
        async (transactionalEntityManager: EntityManager): Promise<void> => {
          const user: MovieArtist = await transactionalEntityManager.save(
            new MovieArtist({ name, contectNo, email, role }),
          );
          await transactionalEntityManager.save(
            createArtistWithMovieDto.movies.map(
              (movie: CreateMovieDto): Movie =>
                new Movie({ ...movie, artists: [user] }),
            ),
          );
        },
      );
      return { message: 'data added Successfully' };
    } catch (err) {
      throw new NotFoundException('Movie-Artist not Created with Movie');
    }
  }

  async ArtistwithPhoto(
    createArtistPhoto: CreateArtistPhoto,
  ): Promise<{ message: string }> {
    try {
      const { name, contectNo, email, role } = createArtistPhoto;
      await this.entityManeger.transaction(
        async (transactionalEntityManager: EntityManager): Promise<void> => {
          const artist: MovieArtist = await transactionalEntityManager.save(
            new MovieArtist({ name, contectNo, email, role }),
          );

          const photoObj: Photo[] = createArtistPhoto.photos.map(
            (photo: CreateMovieWithPhoto): Photo =>
              new Photo({
                ...photo,
                photoId: artist.id,
                PhotoType: PhotoType.MovieArtist,
              }),
          );

          await transactionalEntityManager.save(photoObj);
        },
      );
      return { message: 'data added Successfully' };
    } catch (err) {
      throw new NotFoundException('Movie-Artist not Created With Photos');
    }
  }

  async ArtistwithPhotos(id: number): Promise<Photo[]> {
    try {
      return await this.entityManeger.find(Photo, {
        where: {
          photoId: id,
          PhotoType: PhotoType.MovieArtist,
        },
      });
    } catch (err) {
      throw new NotFoundException('Photos not Found');
    }
  }
}
