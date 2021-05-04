import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MealRepository } from './meal.repository';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { RestaurantRepository } from '../restaurants/restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MealRepository]), RestaurantsModule],
  controllers: [MealsController],
  providers: [
    MealsService,
    RestaurantsService,
    MealRepository,
    RestaurantRepository,
  ],
  exports: [MealsService, MealRepository],
})
export class MealsModule {}
