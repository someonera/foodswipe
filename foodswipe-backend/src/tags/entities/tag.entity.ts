import { Meal } from 'src/meals/entities/meal.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @ManyToMany(() => Meal, (m) => m.tags, { eager: false })
  meals: Meal[];
}
