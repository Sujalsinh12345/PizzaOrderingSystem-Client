import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { Pizza } from '../../models/models';

@Component({
  selector: 'app-pizza-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-5">
      <div class="card shadow-sm p-4 mx-auto" style="max-width: 500px;">
        <h2 class="mb-4">{{ isEditMode ? 'Edit Pizza' : 'Add New Pizza' }}</h2>
        <form (ngSubmit)="onSubmit()" #pizzaForm="ngForm">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input class="form-control" name="name" [(ngModel)]="pizza.name" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Category</label>
            <input class="form-control" name="category" [(ngModel)]="pizza.category" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Small Price</label>
            <input type="number" class="form-control" name="smallPrice" [(ngModel)]="pizza.smallPrice" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Medium Price</label>
            <input type="number" class="form-control" name="mediumPrice" [(ngModel)]="pizza.mediumPrice" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Large Price</label>
            <input type="number" class="form-control" name="largePrice" [(ngModel)]="pizza.largePrice" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Image URL</label>
            <input class="form-control" name="imageUrl" [(ngModel)]="pizza.imageUrl" />
          </div>
          <button class="btn btn-primary w-100" [disabled]="loading">
            {{ loading ? 'Saving...' : 'Save' }}
          </button>
        </form>
      </div>
    </div>
  `
})
export class PizzaFormComponent implements OnInit {
  pizza: Pizza = {
    name: '',
    category: '',
    smallPrice: 0,
    mediumPrice: 0,
    largePrice: 0,
    imageUrl: ''
  };
  isEditMode = false;
  loading = false;

  constructor(
    private pizzaService: PizzaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pizzaId = this.route.snapshot.paramMap.get('pizzaId');
    if (pizzaId) {
      this.isEditMode = true;
      this.loading = true;
      this.pizzaService.getPizzaById(+pizzaId).subscribe({
        next: (response) => {
          console.log('Edit pizza response:', response); // Debug log
          if (response.success && response.pizza) {
            this.pizza = response.pizza;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.loading = true;
    if (this.isEditMode && this.pizza.pizzaId) {
      this.pizzaService.updatePizza(this.pizza.pizzaId, this.pizza).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.router.navigate(['/admin/pizzas']);
          }
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.pizzaService.createPizza(this.pizza).subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success) {
            this.router.navigate(['/admin/pizzas']);
          }
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }
} 