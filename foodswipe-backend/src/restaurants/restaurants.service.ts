import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantCredentialsDto } from './dto/restaurant-credentials.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantRepository } from './restaurant.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantRepository)
    private readonly restaurantRepository: RestaurantRepository,
  ) {}
  register(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.restaurantRepository.register(createRestaurantDto);
  }

  login(credentialsDto: RestaurantCredentialsDto): Promise<Restaurant> {
    return this.restaurantRepository.login(credentialsDto);
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantRepository.updateRestaurant(id, updateRestaurantDto);
  }

  async deleteRestaurant(id: number): Promise<void> {
    return this.restaurantRepository.deleteRestaurant(id);
  }
}
