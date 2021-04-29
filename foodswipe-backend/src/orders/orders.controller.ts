import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
import { OrderStatus } from './order-status.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{
    orderId: number;
    status: OrderStatus;
    mealId: number;
    restaurantId: number;
  }> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  getOrders(
    @Query('status', ValidationPipe) status: OrderStatus,
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    const filterOrderDto = new FilterOrderDto();
    filterOrderDto.status = status;
    filterOrderDto.restaurantId = restaurantId;
    return this.ordersService.getOrders(filterOrderDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch()
  update(
    @Query('status', ValidationPipe) status: OrderStatus,
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
    @Query('id', ParseIntPipe) id: number,
  ) {
    const updateOrderDto = new UpdateOrderDto();
    updateOrderDto.status = status;
    updateOrderDto.id = id;
    updateOrderDto.restaurantId = restaurantId;
    return this.ordersService.update(updateOrderDto);
  }

  @Delete(':id')
  async cancelOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.cancelOrder(id);
  }
}
