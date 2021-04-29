import { IsNotEmpty, IsOptional } from "class-validator";
import { Tag } from "src/tags/entities/tag.entity";

export class GetMealDto {
  @IsOptional()
  @IsNotEmpty()
  tags: Tag[];
}