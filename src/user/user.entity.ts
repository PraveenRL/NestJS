import { Exclude, Expose } from "class-transformer/decorators";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}