import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

import { Post } from "src/posts/post.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];
}