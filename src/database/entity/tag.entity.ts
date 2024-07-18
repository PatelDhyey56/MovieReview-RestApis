import { Entity, Column, OneToMany } from 'typeorm';
import { CommonEntitys } from './common';
import { Tagged } from './tagged.entity';

@Entity()
export class Tag extends CommonEntitys {
  @Column({ length: 20 })
  name: string;

  @Column({ nullable: true })
  discription: string;

  @OneToMany(() => Tagged, (tagged: Tagged) => tagged.tag, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  tagged: Tagged[];
  constructor(item: Partial<Tag>) {
    super(item);
    Object.assign(this, item);
  }
}
