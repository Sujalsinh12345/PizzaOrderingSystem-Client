import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { AuthService } from '../../services/auth.service';
import { Pizza } from '../../models/models';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="pizza-list-container">
      <div class="container-material">
        <div class="page-header">
          <div class="header-content">
            <div class="header-text">
              <h1 class="page-title">Our Delicious Pizzas</h1>
              <p class="page-subtitle">Choose from our handcrafted selection of premium pizzas</p>
            </div>
            <div class="header-actions">
              <button *ngIf="authService.isAdmin()" 
                      routerLink="/admin/pizzas/create"
                      class="btn-material btn-material-primary">
                <i class="btn-icon">➕</i>
                Add New Pizza
              </button>
            </div>
          </div>
        </div>

        <div *ngIf="loading" class="loading-container">
          <div class="spinner-material"></div>
          <p class="loading-text">Loading delicious pizzas...</p>
        </div>

        <div *ngIf="!loading && pizzas.length > 0" class="pizzas-grid">
          <div *ngFor="let pizza of pizzas" class="pizza-card material-card">
            <div class="pizza-image-container">
              <img [src]="pizza.imageUrl || 'https://images.pexels.com/photos/845798/pexels-photo-845798.jpeg?auto=compress&cs=tinysrgb&w=800'" 
                   [alt]="pizza.name"
                   class="pizza-image" />
            </div>
            
            <div class="pizza-content">
              
              <div class="pizza-header">
                <h3 class="pizza-title">{{ pizza.name }}</h3>
               <div class="pizza-price">
                  <span class="price-amount">{{ pizza.smallPrice}}₹</span>
                  <span class="price-label">Small</span>
                  <span class="price-amount">{{ pizza.mediumPrice}}₹</span>
                  <span class="price-label">Medium</span> 
                  <span class="price-amount">{{ pizza.largePrice}}₹</span>
                  <span class="price-label">Large</span>
                </div>
              </div>
              
              
              
              <div class="pizza-actions">
                <button *ngIf="authService.isCustomer()" 
                        [routerLink]="['/customer/order', pizza.pizzaId]"
                        class="btn-material btn-material-primary">
                  <i class="btn-icon">🛒</i>
                  Order Now
                </button>
                <button *ngIf="authService.isAdmin()" 
                        [routerLink]="['/admin/pizzas/edit', pizza.pizzaId]"
                        class="btn-material btn-material-outline">
                  <i class="btn-icon">✏️</i>
                  Edit
                </button>
                <button *ngIf="authService.isAdmin()" 
                        (click)="deletePizza(pizza)"
                        class="btn-material btn-material-danger">
                  <i class="btn-icon">🗑️</i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="!loading && pizzas.length === 0" class="empty-state">
          <div class="empty-icon">🍕</div>
          <h3 class="empty-title">No Pizzas Available</h3>
          <p class="empty-description">Check back later for delicious pizza options!</p>
          <button *ngIf="authService.isAdmin()" 
                  routerLink="/admin/pizzas/create"
                  class="btn-material btn-material-primary">
            <i class="btn-icon">➕</i>
            Add First Pizza
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .pizza-list-container {
      padding: 2rem 0;
      min-height: 100vh;
    }
    
    .page-header {
      margin-bottom: 3rem;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 2rem;
    }
    
    .header-text {
      flex: 1;
    }
    
    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .page-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: 0;
    }
    
    .header-actions {
      flex-shrink: 0;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
    }
    
    .loading-text {
      margin-top: 1rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    
    .pizzas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .pizza-card {
      overflow: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .pizza-image-container {
      position: relative;
      height: 250px;
      overflow: hidden;
    }
    
    .pizza-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .pizza-card:hover .pizza-image {
      transform: scale(1.05);
    }
    
    .pizza-overlay {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .pizza-badges {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .badge-material {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      border-radius: 12px;
      color: white;
      backdrop-filter: blur(10px);
      background: rgba(0, 0, 0, 0.7);
    }
    
    .badge-icon {
      font-size: 0.875rem;
    }
    
    .pizza-content {
      padding: 1.5rem;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .pizza-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    
    .pizza-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
      flex: 1;
    }
    
    .pizza-price {
      text-align: right;
      flex-shrink: 0;
    }
    
    .price-amount {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .price-label {
      display: block;
      font-size: 0.75rem;
      color: var(--text-secondary);
      font-weight: 500;
    }
    
    .pizza-description {
      color: var(--text-secondary);
      margin-bottom: 1.5rem;
      line-height: 1.5;
      flex: 1;
    }
    
    .pizza-details {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    
    .detail-icon {
      font-size: 1rem;
    }
    
    .detail-text {
      font-weight: 500;
    }
    
    .pizza-actions {
      display: flex;
      gap: 0.75rem;
      margin-top: auto;
    }
    
    .pizza-actions .btn-material {
      flex: 1;
      justify-content: center;
    }
    
    .btn-material-danger {
      background: var(--danger-color);
      color: white;
    }
    
    .btn-material-danger:hover {
      background: #d32f2f;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
    }
    
    .empty-state {
      text-align: center;
      padding: 4rem 0;
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .empty-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .empty-description {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }
    
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
      }
      
      .page-title {
        font-size: 2rem;
      }
      
      .pizzas-grid {
        grid-template-columns: 1fr;
      }
      
      .pizza-actions {
        flex-direction: column;
      }
      
      .pizza-details {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
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
      if (pizza.pizzaId) {
        console.log(pizza)
        console.log(`Deleting pizza with ID: ${pizza.pizzaId}`);
        this.pizzaService.deletePizza(pizza.pizzaId).subscribe({
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