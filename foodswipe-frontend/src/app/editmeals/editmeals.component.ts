import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { Meal } from '../meals/meal.interface';
import { MealsService } from '../meals/meals.service';
import { v4 as uuid } from 'uuid';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-editmeals',
  templateUrl: './editmeals.component.html',
  styleUrls: ['./editmeals.component.css']
})
export class EditMealsComponent implements OnInit, OnDestroy {

  mealToEdit?: Meal;
  mealSubscription?: Subscription;
  mealEditForm: FormGroup
  downloadURL: Observable<string> = new Observable<string>();
  private imageUrl: string = ''

  constructor(
    private mealsService: MealsService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private router: Router,
  ) {
    this.mealEditForm = this.constructForm();
  }

  ngOnInit(): void {
    console.log('hi')
    this.getMeal();
    this.mealSubscription = this.mealsService.meal$.subscribe((meal) => {
      this.mealToEdit = meal;
      this.imageUrl = meal.image_url ?? this.imageUrl;
      this.mealEditForm = this.constructForm();
    });
    
    this.downloadURL.subscribe((url) => {
      console.log('got new URL', url);
      this.imageUrl = url;
    });
  }

  ngOnDestroy(): void {
    this.mealSubscription?.unsubscribe();
    
  }

  getMeal(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      this.mealToEdit = {
        id: 0,
        name: '',
        description: '',
        price: 0.00,
        restaurant: this.authService.restaurant$.getValue()
      }
    } else {
      this.mealsService.getMealById(+id!);
    }
  }

  private constructForm(): FormGroup {
    return this.formBuilder.group({
      name: this.mealToEdit?.name ?? '',
      description: this.mealToEdit?.description ?? '',
      price: this.mealToEdit?.price ?? 0.00,
    });
  }

  submitChanges(): void {
    if(!this.mealToEdit) return;
    const { name, description, price } = this.mealEditForm.value;
    this.mealToEdit.name = name;
    this.mealToEdit.description = description;
    this.mealToEdit.price = price;
    this.mealToEdit.image_url = this.imageUrl;
    this.mealToEdit.restaurant = this.authService.restaurant$.getValue();
    console.log(this.mealToEdit);
    // TODO DRY
    const id = this.route.snapshot.paramMap.get('id');
    if (id === 'new') {
      // create new meal
      this.mealsService.createMeal(this.mealToEdit);
    } else {
      // update meal
      this.mealsService.updateMeal(this.mealToEdit);
    }
  }

  async uploadFile(event: any) {
    const file = event.target.files[0];

    const filePath = uuid();
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
    )
    .subscribe((snap) => {
      this.imageUrl = `https://firebasestorage.googleapis.com/v0/b/foodswipe-images.appspot.com/o/${snap?.ref.fullPath}?alt=media`;
      console.log(this.imageUrl);
    })
  }
}
