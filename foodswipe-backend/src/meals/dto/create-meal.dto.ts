// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IsUrl,
} from 'class-validator';
import { Tag } from 'src/tags/entities/tag.entity';
export class CreateMealDto {
  @IsNotEmpty()
  @IsNumber()
  restaurantId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  // @IsUrl() // TODO: when img upload works
  image_url: string;

  @IsOptional()
  tags: Tag[];
}
