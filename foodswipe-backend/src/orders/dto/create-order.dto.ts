import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Tag } from 'src/tags/entities/tag.entity';
export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  mealId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  customer_first_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  customer_last_name: string;

  @IsNotEmpty()
  @IsString()
  customer_street: string;

  @IsNotEmpty()
  customer_street_nr: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10) // TODO: Zipcode validation
  @IsNumberString()
  customer_zip: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(85)
  customer_city: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  comments: string;

}
