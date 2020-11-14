import { Exclude, Expose } from "class-transformer/decorators";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";

import { Address } from "src/user/address.entity";
import { Post } from "src/posts/post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  @Expose() //Expose in response
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()  //Remove in response
  public password: string;

  @OneToOne(() => Address, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  public address: Address;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];
}