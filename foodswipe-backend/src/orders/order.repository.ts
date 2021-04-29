import {
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { FilterOrderDto } from './dto/filter-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(
    createOrderDto: CreateOrderDto,
    meal: Meal,
    restaurant: Restaurant,
  ): Promise<{
    orderId: number;
    status: OrderStatus;
    mealId: number;
    restaurantId: number;
  }> {
    const newOrder = new Order();
    newOrder.restaurant = restaurant;
    newOrder.meal = meal;

    // not looping through dto, since it has the id's but not the entities themselves
    const {
      customer_first_name,
      customer_last_name,
      customer_city,
      customer_street,
      customer_street_nr,
      customer_zip,
    } = createOrderDto;

    newOrder.customer_first_name = customer_first_name;
    newOrder.customer_last_name = customer_last_name;
    newOrder.customer_city = customer_city;
    newOrder.customer_street = customer_street;
    newOrder.customer_street_nr = customer_street_nr;
    newOrder.customer_zip = customer_zip;
    newOrder.comments = createOrderDto.comments
      ? createOrderDto.comments
      : null;
    try {
      await newOrder.save();
      // TODO: DTO for return type??
      return {
        orderId: newOrder.id,
        status: newOrder.status,
        restaurantId: restaurant.id,
        mealId: meal.id,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error 2');
    }
  }

  async getOrders(filterOrderDto: FilterOrderDto): Promise<Order[]> {
    const query = this.createQueryBuilder('order');
    const { status, restaurantId } = filterOrderDto;
    query.andWhere('order.restaurantId = :restaurantId', { restaurantId });

    if (status) {
      query.andWhere('order.status = :status', { status });
    }
    try {
      const orders = await query.getMany();
      return orders;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateOrderStatus(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { id, status, restaurantId } = updateOrderDto;
    const orderUpdated = await Order.findOne({ id });
    const restaurant = await orderUpdated.restaurant;

    if (!orderUpdated)
      throw new NotFoundException(`could not find order with id: ${id}`);
    if (restaurant.id !== restaurantId)
      throw new UnauthorizedException('Restaurant must be owner of order');

    orderUpdated.status = status;

    try {
      await orderUpdated.save();
      return orderUpdated;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async cancelOrder(id: number): Promise<void> {
    const order = await Order.findOne(id);

    if (!order)
      throw new NotFoundException(`Could not find order with id: ${id}`);

    order.status = OrderStatus.CANCELED;

    try {
      await order.save();
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }
}
