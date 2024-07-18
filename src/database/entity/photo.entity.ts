import { CommonEntitys } from './common';
import { Entity, Column } from 'typeorm';
// import { Movie } from './movie.entity';
// import { MovieArtist } from './movieArtist.entity';
// import { User } from './user.entity';

export enum PhotoType {
  User = 'User',
  Movie = 'Movie',
  MovieArtist = 'MovieArtist',
}

@Entity()
export class Photo extends CommonEntitys {
  @Column()
  PhotoUrl: string;

  @Column()
  photoId: number;

  @Column({ type: 'enum', enum: PhotoType, nullable: false })
  PhotoType: PhotoType;

  // @ManyToOne(() => Movie, (movie: Movie) => movie.photos)
  // @ManyToOne(
  //   () => MovieArtist,
  //   (movieArtist: MovieArtist) => movieArtist.photos,
  // )
  // @ManyToOne(() => User, (user: User) => user.photos)
  // photo: Movie | MovieArtist | User;

  constructor(item: Partial<Photo>) {
    super(item);
    Object.assign(this, item);
  }
}
