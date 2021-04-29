import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Meal } from './meal.interface';
import { MealsService } from './meals.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit, OnDestroy{

  meals: Meal[] = [];
  private subscription?: Subscription;
  currentMeal?: Meal;
  latitude?: number;
  longitute?: number;
  shouldShowWarning: boolean = false;

  constructor(
    private readonly mealsService: MealsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getLocation();

    this.getMeals();
    this.subscription = this.mealsService.meal$.subscribe((meal) => this.currentMeal = meal);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


  getMeals(): void {
    this.mealsService.getNextMeal();
  }

  handleLike(): void {
    // TODO route check out with currentMeal pass
    this.router.navigate(['/checkout']);
  }

  handleDislike(): void {
    this.mealsService.getNextMeal();
    // TODO: once SQL pagination is a thing check size of meals and resize meals
  }

  private setUpSubscription(): void {

  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        if (position) {
          this.latitude = position.coords.latitude;
          this.longitute = position.coords.longitude;
        }
      },
        (error: GeolocationPositionError) => this.shouldShowWarning = true);
    } else {
     
    }
  }

}
