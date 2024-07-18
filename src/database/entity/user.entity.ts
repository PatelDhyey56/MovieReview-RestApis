import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntitys } from './common';
import { Comment } from './movieComment.entity';
// import { Photo } from './photo.entity';

export enum UserRole {
  Admin = 'admin',
  Actor = 'Actor',
  Producer = 'Producer',
  User = 'User',
}

@Entity()
export class User extends CommonEntitys {
  @Column({ length: 20 })
  firstName: string;

  @Column({ length: 20 })
  lastName: string;

  @Column({ length: 10 })
  mobileNo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: UserRole;

  @OneToMany(() => Comment, (comment: Comment): User => comment.user, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  comments: Comment[];

  // @OneToMany(() => Photo, (photo: Photo) => photo.photo, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  //   eager: true,
  // })
  // photos: Photo[];

  constructor(item: Partial<User>) {
    super(item);
    Object.assign(this, item);
  }
}
