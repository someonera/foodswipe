import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MealsService } from '../meals/meals.service';
import { CheckoutService } from './checkout.service';
import { Order } from './order.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  currentMealTitle?: string;
  checkOutForm: FormGroup;
  order: Order = {} as Order;

  constructor(
    private checkOutService: CheckoutService,
    private mealService: MealsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkOutForm = this.constructForm();
  }
  
  ngOnInit(): void {
    this.currentMealTitle = this.mealService.meal$.getValue().name;
    this.subscribeToForm();
  }

  private constructForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      streetNr: [0, Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      comments: '',
    });
  }
  private subscribeToForm(): void {
    this.checkOutForm.valueChanges.subscribe((form) => {
      this.order.customer_first_name = form.firstName;
      this.order.customer_last_name = form.lastName;
      this.order.customer_street = form.street;
      this.order.customer_street_nr = form.streetNr;
      this.order.customer_zip = form.zipCode;
      this.order.customer_city = form.city;
      this.order.comments = form.comments;
    });
  }
  postOrder(): void {
    // TODO router to order confirmation page
    const mealId = this.mealService.meal$.getValue().id;
    this.order.mealId = mealId;
    this.checkOutService.placeOrder(this.order);
    this.router.navigate(['confirm']);
  }
}
