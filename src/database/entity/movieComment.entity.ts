import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CommonEntitys } from './common';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Comment extends CommonEntitys {
  @Column()
  comment: string;

  @Column()
  userId: number;

  @Column()
  movieId: number;

  @ManyToOne(() => User, (user: User): Comment[] => user.comments)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Movie, (movie: Movie): Comment[] => movie.comments)
  @JoinColumn()
  movie: Movie;

  constructor(item: Partial<Comment>) {
    super(item);
    Object.assign(this);
  }
}
