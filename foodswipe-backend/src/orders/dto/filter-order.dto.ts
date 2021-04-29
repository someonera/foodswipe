import { IsNotEmpty, IsOptional } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class FilterOrderDto {
  @IsOptional()
  status: OrderStatus;

  @IsNotEmpty() // TODO: AUTH Refactor
  restaurantId: number;
}
