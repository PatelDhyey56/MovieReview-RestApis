import { Entity, Column, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntitys } from './common';
import { MovieArtist } from './movieArtist.entity';
import { Movie } from './movie.entity';
import { Tag } from './tag.entity';

export enum TaggableType {
  Movie = 'Movie',
  MovieArtist = 'MovieArtist',
}

@Entity()
export class Tagged extends CommonEntitys {
  @Column()
  TaggableId: number;

  @Column()
  TagId: number;

  @ManyToOne(() => Tag, (tag: Tag) => tag.tagged)
  @JoinColumn({ name: 'TagId', referencedColumnName: 'id' })
  tag: Tag;

  @Column({ type: 'enum', enum: TaggableType, nullable: false })
  TaggableType: TaggableType;

  @ManyToMany(() => Movie, (movie: Movie) => movie.tags)
  @ManyToMany(() => MovieArtist, (movieArtist: MovieArtist) => movieArtist.tags)
  tags: (Movie | MovieArtist)[];

  constructor(item: Partial<Tagged>) {
    super(item);
    Object.assign(this, item);
  }
}
