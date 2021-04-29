import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Meal } from './meal.interface';
@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private readonly baseUrl = 'http://localhost:8080/meals';
  readonly meal$ = new BehaviorSubject<Meal>({} as Meal);
  private mealList: Meal[] = [];
  readonly mealList$ = new BehaviorSubject<Meal[]>([]);

  private httpOptions = {
    headers: {
      'Content-Type' : 'application/json'
    },
  }

  constructor(
    private http: HttpClient,
  ) { }

  getNextMeal(): void {
    if (this.mealList.length < 3) this.fetchNewMeals();
    else {
      const nextMeal = this.mealList.shift();
      if (nextMeal) this.meal$.next(nextMeal);
    }
  }

  getMealById(id: number): void {
    this.http.get<Meal>(`${this.baseUrl}/${id}`)
      .subscribe(meal => {
        this.meal$.next(meal)
      });
  }

  createMeal(meal: Meal): void {
    let body = {
      name: meal.name,
      price: meal.price,
      image_url: meal.image_url!,
      description: meal.description,
      restaurantId: meal.restaurant.id,
    }
    console.log('REQ', body);
    this.http.post<Meal>(`${this.baseUrl}`, JSON.stringify(body) , this.httpOptions )
      .subscribe(meal => console.log(meal));
  }

  getRestaurantMeals(id: number):void {
    const meals = this.http.get<Meal[]>(`${this.baseUrl}/restaurants/${id}`);

    meals.subscribe(meals => this.mealList$.next(meals));
  }

  private fetchNewMeals(): void {
    this.http.get<Meal[]>(this.baseUrl)
      .pipe(
        catchError(this.handleError<Meal[]>('get meals', []))
      )
      .subscribe(newMeals => {
        this.mealList = [...this.mealList, ...newMeals];
        this.meal$.next(this.mealList.shift()!);
      });
  }
  
  updateMeal(meal: Meal): void {
    
    console.log(meal)
    this.http.patch<Meal>(`${this.baseUrl}/${meal.id}`, meal , this.httpOptions)
      .subscribe((remeal) => console.log(remeal));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
