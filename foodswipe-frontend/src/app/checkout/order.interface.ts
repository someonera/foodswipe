export interface Order {
  id?: number;
  mealId: number;
  customer_first_name: string;
  customer_last_name: string;
  customer_street: string;
  customer_street_nr: number;
  customer_zip: string;
  customer_city: string;
  comments?: string;
  status?: string;
}
