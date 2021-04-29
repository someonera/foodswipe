import { OrderStatus } from "./order-status.enum";

export interface OrderResult {
  orderId: number;
  status: OrderStatus;
  restaurantId: number;
  mealId: number;
}