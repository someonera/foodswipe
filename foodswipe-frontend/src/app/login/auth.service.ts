import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from './restaurant.interface'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8080/restaurants';
  readonly restaurant$ = new BehaviorSubject<Restaurant>({} as Restaurant);
  private httpOptions = {
    headers: { 'Content-Type' : 'application/json '}
  };

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    const result = this.http.post<Restaurant>(
      `${this.baseUrl}/login`,
      { email, password },
      this.httpOptions,
    )
 
    result.subscribe(restaurant => this.restaurant$.next(restaurant));
  }
}
