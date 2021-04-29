import { Meal } from 'src/meals/entities/meal.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from '../order-status.enum';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  // transform to uuid later
  id: number;

  @Column({ default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ nullable: false })
  customer_first_name: string;

  @Column({ nullable: false })
  customer_last_name: string;

  @Column({ nullable: false })
  customer_street: string;

  @Column({ type: 'int', nullable: false })
  customer_street_nr: number;

  @Column({ type: 'int', nullable: false })
  customer_zip: string;

  @Column({ nullable: false })
  customer_city: string;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(() => Meal, (m) => m.orders, { eager: true })
  meal: Meal;

  @ManyToOne(() => Restaurant, (r) => r.orders, { eager: true })
  restaurant: Restaurant;
}
