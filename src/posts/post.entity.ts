import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}