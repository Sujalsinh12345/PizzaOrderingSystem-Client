import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { AuthService } from '../../services/auth.service';
import { Pizza } from '../../models/models';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h2 fw-bold text-dark">Our Pizzas</h1>
          <p class="text-secondary">Choose from our delicious selection of handcrafted pizzas</p>
        </div>
        <button *ngIf="authService.isAdmin()" 
                routerLink="/admin/pizzas/create"
                class="btn btn-primary">
          Add New Pizza
        </button>
      </div>
      <div class="row g-4">
        <div *ngFor="let pizza of pizzas" class="col-12 col-md-6 col-lg-4">
          <div class="card h-100 shadow-sm">
            <img [src]="pizza.imageUrl || 'https://images.pexels.com/photos/845798/pexels-photo-845798.jpeg?auto=compress&cs=tinysrgb&w=800'" 
                 [alt]="pizza.name"
                 class="card-img-top" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h3 class="h5 fw-semibold text-dark">{{ pizza.name }}</h3>
                <div class="d-flex align-items-center gap-2">
                  <span *ngIf="pizza.isVegetarian" class="badge bg-success">Vegetarian</span>
                  <span [ngClass]="pizza.isAvailable ? 'badge bg-success' : 'badge bg-danger'">
                    {{ pizza.isAvailable ? 'Available' : 'Out of Stock' }}
                  </span>
                </div>
              </div>
              <p class="text-secondary mb-3">{{ pizza.description }}</p>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-muted small">
                  <div>Size: {{ pizza.size }}</div>
                  <div>Crust: {{ pizza.crust }}</div>
                </div>
                <div class="text-end">
                  <span class="h5 fw-bold text-primary">\${{ pizza.basePrice }}</span>
                  <div class="small text-muted">Base Price</div>
                </div>
              </div>
              <div class="d-flex gap-2 mt-auto">
                <button *ngIf="authService.isCustomer() && pizza.isAvailable" 
                        [routerLink]="['/customer/order', pizza.id]"
                        class="btn btn-primary flex-fill">
                  Order Now
                </button>
                <button *ngIf="authService.isAdmin()" 
                        [routerLink]="['/admin/pizzas/edit', pizza.id]"
                        class="btn btn-outline-primary flex-fill">
                  Edit
                </button>
                <button *ngIf="authService.isAdmin()" 
                        (click)="deletePizza(pizza)"
                        class="btn btn-danger flex-fill">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="pizzas.length === 0" class="text-center py-5">
        <div class="display-1 text-muted mb-3">🍕</div>
        <h3 class="h5 fw-medium text-dark mb-2">No pizzas available</h3>
        <p class="text-secondary">Check back later for delicious pizza options!</p>
      </div>
    </div>
  `
})
export class PizzaListComponent implements OnInit {
  pizzas: Pizza[] = [];
  loading = true;

  constructor(
    private pizzaService: PizzaService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    console.log('Loading pizzas...');
    this.loading = true;
    this.pizzaService.getAllPizzas().subscribe({
      next: (response) => {
        console.log('Pizzas loaded:', response);
        this.loading = false;
        if (response.success && response.data) {
          this.pizzas = response.data;
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading pizzas:', error);
      }
    });
  }

  deletePizza(pizza: Pizza): void {
    if (confirm(`Are you sure you want to delete ${pizza.name}?`)) {
      if (pizza.id) {
        this.pizzaService.deletePizza(pizza.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadPizzas();
            }
          },
          error: (error) => {
            console.error('Error deleting pizza:', error);
          }
        });
      }
    }
  }
}