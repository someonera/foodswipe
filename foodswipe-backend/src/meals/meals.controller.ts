import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Meal } from './entities/meal.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createMealDto: CreateMealDto): Promise<Meal> {
    return this.mealsService.create(createMealDto);
  }

  @Get()
  findAll(): Promise<Meal[]> {
    return this.mealsService.getMeals();
  }

  @Get('restaurants/:id')
  getRestaurantMeals(
    @Param('id', ParseIntPipe) id: number
  ): Promise<Meal[]> {
    return this.mealsService.getRestaurantMeals(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Meal> {
    return this.mealsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateMealDto: UpdateMealDto,
  ): Promise<Meal> {
    return this.mealsService.updateMeal(id, updateMealDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mealsService.deleteMeal(id);
  }
}
