import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditMealsComponent } from './editmeals/editmeals.component';
import { LoginComponent } from './login/login.component';
import { MealsComponent } from './meals/meals.component';
import { MealsService } from './meals/meals.service';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: 'swipe', component: MealsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '', redirectTo: '/swipe', pathMatch: 'full'},
  { path: 'confirm', component: ConfirmComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/orders', component: OrdersComponent },
  { path: 'dashboard/editmeal/:id', component: EditMealsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [MealsService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
