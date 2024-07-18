import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CommonEntitys } from './common';
import { Comment } from './movieComment.entity';
import { MovieArtist } from './movieArtist.entity';
// import { Photo } from './photo.entity';
import { Tagged } from './tagged.entity';

export enum IndustryType {
  Bollywood = 'Bollywood',
  Hollywood = 'Hollywood',
  Japan = 'Japan',
  China = 'China',
  SouthKorea = 'South Korea',
  SouthIndia = 'South India',
}

@Entity()
export class Movie extends CommonEntitys {
  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @Column()
  playTime: string;

  @Column()
  discription: string;

  @Column({ type: 'enum', enum: IndustryType, nullable: false })
  industry: IndustryType;

  @ManyToMany(() => MovieArtist, (artist: MovieArtist) => artist.movies, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  artists: MovieArtist[];

  @OneToMany(() => Comment, (comment: Comment) => comment.movie, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  comments: Comment[];

  // @OneToMany(() => Photo, (photo: Photo) => photo.photo, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   eager: true,
  // })
  // photos: Photo[];

  @ManyToMany(() => Tagged, (tagged: Tagged) => tagged.tags, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tags: Tagged[];

  constructor(item: Partial<Movie>) {
    super(item);
    Object.assign(this, item);
  }
}
