import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-vh-100 bg-light">
      <!-- Hero Section -->
      <div class="position-relative overflow-hidden">
        <div class="container py-5">
          <div class="text-center">
            <h1 class="display-3 fw-bold text-dark mb-4">
              Welcome to 
              <span class="text-primary">PizzaExpress</span>
            </h1>
            <p class="lead text-secondary mb-5 mx-auto" style="max-width: 700px;">
              Delicious handcrafted pizzas delivered fresh to your door. 
              Experience the perfect blend of traditional recipes and modern convenience.
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
              <ng-container *ngIf="!authService.isAuthenticated()">
                <button routerLink="/register" class="btn btn-primary btn-lg px-5 py-2">
                  Get Started
                </button>
                <button routerLink="/login" class="btn btn-outline-primary btn-lg px-5 py-2">
                  Sign In
                </button>
              </ng-container>
              
              <ng-container *ngIf="authService.isAuthenticated()">
                <button routerLink="/pizzas" class="btn btn-primary btn-lg px-5 py-2">
                  Order Now
                </button>
                <button routerLink="/dashboard" class="btn btn-outline-primary btn-lg px-5 py-2">
                  Go to Dashboard
                </button>
              </ng-container>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-5 bg-white">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="h2 fw-bold text-dark mb-3">Why Choose PizzaExpress?</h2>
            <p class="lead text-secondary">We're committed to delivering the best pizza experience</p>
          </div>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="text-center">
                <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 64px; height: 64px;">
                  <span class="fs-1">🍕</span>
                </div>
                <h3 class="h5 fw-semibold text-dark mb-2">Fresh Ingredients</h3>
                <p class="text-secondary">We use only the finest, freshest ingredients sourced locally whenever possible.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center">
                <div class="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 64px; height: 64px;">
                  <span class="fs-1">🚚</span>
                </div>
                <h3 class="h5 fw-semibold text-dark mb-2">Fast Delivery</h3>
                <p class="text-secondary">Hot, delicious pizza delivered to your door in 30 minutes or less, guaranteed.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center">
                <div class="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style="width: 64px; height: 64px;">
                  <span class="fs-1">⭐</span>
                </div>
                <h3 class="h5 fw-semibold text-dark mb-2">Top Rated</h3>
                <p class="text-secondary">Rated #1 pizza delivery service by our customers for three years running.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Pizzas Preview -->
      <div class="py-5 bg-light">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="h2 fw-bold text-dark mb-3">Our Popular Pizzas</h2>
            <p class="lead text-secondary">Handcrafted with love, delivered with care</p>
          </div>
          <div class="row g-4">
            <div class="col-md-4">
              <div class="card text-center h-100">
                <img src="https://images.pexels.com/photos/845798/pexels-photo-845798.jpeg?auto=compress&cs=tinysrgb&w=400" 
                     alt="Margherita Pizza" 
                     class="card-img-top" style="height: 192px; object-fit: cover;">
                <div class="card-body">
                  <h3 class="h5 fw-semibold text-dark mb-2">Classic Margherita</h3>
                  <p class="text-secondary mb-3">Fresh mozzarella, basil, and our signature tomato sauce</p>
                  <span class="h4 fw-bold text-primary">$14.99</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center h-100">
                <img src="https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=400" 
                     alt="Pepperoni Pizza" 
                     class="card-img-top" style="height: 192px; object-fit: cover;">
                <div class="card-body">
                  <h3 class="h5 fw-semibold text-dark mb-2">Pepperoni Supreme</h3>
                  <p class="text-secondary mb-3">Premium pepperoni with extra cheese and herbs</p>
                  <span class="h4 fw-bold text-primary">$16.99</span>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card text-center h-100">
                <img src="https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?auto=compress&cs=tinysrgb&w=400" 
                     alt="Veggie Pizza" 
                     class="card-img-top" style="height: 192px; object-fit: cover;">
                <div class="card-body">
                  <h3 class="h5 fw-semibold text-dark mb-2">Garden Veggie</h3>
                  <p class="text-secondary mb-3">Fresh vegetables, bell peppers, and olives</p>
                  <span class="h4 fw-bold text-primary">$15.99</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-5">
            <button routerLink="/pizzas" class="btn btn-primary btn-lg px-5 py-2">
              View All Pizzas
            </button>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="py-5 bg-primary">
        <div class="container text-center">
          <h2 class="h2 fw-bold text-white mb-3">Ready to Order?</h2>
          <p class="lead text-light mb-4">Join thousands of satisfied customers and taste the difference.</p>
          <ng-container *ngIf="!authService.isAuthenticated()">
            <button routerLink="/register" class="btn btn-light btn-lg px-5 py-2 fw-semibold text-primary">
              Sign Up Now
            </button>
          </ng-container>
          <ng-container *ngIf="authService.isAuthenticated()">
            <button routerLink="/pizzas" class="btn btn-light btn-lg px-5 py-2 fw-semibold text-primary">
              Order Your Pizza
            </button>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(public authService: AuthService) { }
}