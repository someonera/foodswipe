import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { MealsModule } from 'src/meals/meals.module';
import { MealsService } from 'src/meals/meals.service';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    MealsModule,
    RestaurantsModule,
    TagsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, MealsService, RestaurantsModule],
  exports: [OrdersService],
})
export class OrdersModule {}
