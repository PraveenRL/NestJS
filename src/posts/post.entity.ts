import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { User } from "src/user/user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  /*
  //* If null it wont return value to response
  @Transform(value => {
    if (value !== null) {
      return value;
    }
  })
  */
  public category?: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User;
}