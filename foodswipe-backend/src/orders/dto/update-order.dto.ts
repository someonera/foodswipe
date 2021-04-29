import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Tag } from 'src/tags/entities/tag.entity';
import { OrderStatus } from '../order-status.enum';

export class UpdateOrderDto {
  @IsNotEmpty()
  status: OrderStatus;

  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsOptional()
  tags: Tag[];
}
