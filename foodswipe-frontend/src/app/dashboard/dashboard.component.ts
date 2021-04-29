import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { Meal } from '../meals/meal.interface';
import { MealsService } from '../meals/meals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  meals?: Meal[];
  subscription?: Subscription;

  constructor(
    private mealsService: MealsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.mealsService.mealList$.subscribe(meals => this.meals = meals);
    this.getRestaurantMeals();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getRestaurantMeals():void {
    const { id } = this.authService.restaurant$.getValue();
    this.mealsService.getRestaurantMeals(id);
  }
}
