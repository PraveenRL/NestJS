import { IsString, IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsString()
  public title: string;

  @IsString()
  public content: string;

  @IsString({ each: true })
  @IsNotEmpty()
  paragraphs: string[];
}
