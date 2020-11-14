import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Index } from "typeorm";

import { User } from "src/user/user.entity";
import { Category } from "src/categories/category.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column('text', { array: true, nullable: true })
  public paragraphs: string[];

  @Column({ nullable: true })
  public category?: string;

  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];
}