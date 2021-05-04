import { Test, TestingModule } from '@nestjs/testing';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { Meal } from './entities/meal.entity';
import { RestaurantRepository } from '../restaurants/restaurant.repository';
import { MealRepository } from './meal.repository';

describe('MealsController', () => {
  let mealsController: MealsController;
  let mealsService: MealsService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MealsController],
      providers: [MealsService, MealRepository, RestaurantRepository],
    }).compile();

    mealsService = await moduleRef.resolve(MealsService)
    mealsController = await moduleRef.resolve(MealsController);

  });

  it('should be defined', () => {
    expect(mealsController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of meals', async () => {
      const result : Meal[] = []

      jest.spyOn(mealsService, 'getMeals').mockImplementation(async () => result)

      expect(await mealsController.findAll()).toBe(result)
    })
  })

});
