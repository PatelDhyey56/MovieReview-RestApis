import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntitys } from './common';
import { Movie } from './movie.entity';
// import { Photo } from './photo.entity';
import { Tagged } from './tagged.entity';

export enum artistRole {
  Actor = 'Actor',
  Producer = 'Producer',
  Writer = 'Writer',
  VedioEditer = 'VedioEditer',
  VoiceArtist = 'VoiceArtist',
}

@Entity()
export class MovieArtist extends CommonEntitys {
  @Column()
  name: string;

  @Column()
  contectNo: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ type: 'enum', enum: artistRole, default: artistRole.Actor })
  role: artistRole;

  @ManyToMany(() => Movie, (movie: Movie) => movie.artists)
  @JoinTable()
  movies: Movie[];

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

  constructor(item: Partial<MovieArtist>) {
    super(item);
    Object.assign(this, item);
  }
}
