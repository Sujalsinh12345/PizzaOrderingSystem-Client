import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-material">
        <div class="hero-content">
          <div class="container-material">
            <div class="hero-text">
              <h1 class="hero-title">
                Welcome to 
                <span class="hero-highlight">PizzaExpress</span>
              </h1>
              <p class="hero-subtitle">
                Delicious handcrafted pizzas delivered fresh to your door. 
                Experience the perfect blend of traditional recipes and modern convenience.
              </p>
              <div class="hero-actions">
                <ng-container *ngIf="!authService.isAuthenticated()">
                  <button routerLink="/register" class="btn-material btn-material-primary btn-lg">
                    <i class="btn-icon">🚀</i>
                    Get Started
                  </button>
                  <button routerLink="/login" class="btn-material btn-material-outline btn-lg">
                    <i class="btn-icon">🔑</i>
                    Sign In
                  </button>
                </ng-container>
                
                <ng-container *ngIf="authService.isAuthenticated()">
                  <button routerLink="/pizzas" class="btn-material btn-material-primary btn-lg">
                    <i class="btn-icon">🍕</i>
                    Order Now
                  </button>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section section-padding">
        <div class="container-material">
          <div class="section-header text-center">
            <h2 class="section-title">Why Choose PizzaExpress?</h2>
            <p class="section-subtitle">We're committed to delivering the best pizza experience</p>
          </div>
          <div class="features-grid">
            <div class="feature-card material-card">
              <div class="feature-icon">
                <span class="icon">🍕</span>
              </div>
              <h3 class="feature-title">Fresh Ingredients</h3>
              <p class="feature-description">
                We use only the finest, freshest ingredients sourced locally whenever possible.
              </p>
            </div>
            <div class="feature-card material-card">
              <div class="feature-icon">
                <span class="icon">🚚</span>
              </div>
              <h3 class="feature-title">Fast Delivery</h3>
              <p class="feature-description">
                Hot, delicious pizza delivered to your door in 30 minutes or less, guaranteed.
              </p>
            </div>
            <div class="feature-card material-card">
              <div class="feature-icon">
                <span class="icon">⭐</span>
              </div>
              <h3 class="feature-title">Top Rated</h3>
              <p class="feature-description">
                Rated #1 pizza delivery service by our customers for three years running.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Pizzas Preview -->
      <section class="pizzas-section section-padding">
        <div class="container-material">
          <div class="section-header text-center">
            <h2 class="section-title">Our Popular Pizzas</h2>
            <p class="section-subtitle">Handcrafted with love, delivered with care</p>
          </div>
          <div class="pizzas-grid">
            <div class="pizza-card material-card">
              <div class="pizza-image">
                <img src="https://images.pexels.com/photos/845798/pexels-photo-845798.jpeg?auto=compress&cs=tinysrgb&w=400" 
                     alt="Margherita Pizza" />
              </div>
              <div class="pizza-content">
                <h3 class="pizza-title">Classic Margherita</h3>
                <p class="pizza-description">
                  Fresh mozzarella, basil, and our signature 
                </p>
                <div class="pizza-price">
                  <span class="price">₹400</span>
                </div>
              </div>
            </div>
            <div class="pizza-card material-card">
              <div class="pizza-image">
                <img src="https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=400" 
                     alt="Pepperoni Pizza" />
              </div>
              <div class="pizza-content">
                <h3 class="pizza-title">Pepperoni Supreme</h3>
                <p class="pizza-description">
                  Premium pepperoni with extra cheese
                </p>
                <div class="pizza-price">
                  <span class="price">₹300</span>
                </div>
              </div>
            </div>
            <div class="pizza-card material-card">
              <div class="pizza-image">
                <img src="https://images.pexels.com/photos/4394612/pexels-photo-4394612.jpeg?auto=compress&cs=tinysrgb&w=400" 
                     alt="Veggie Pizza" />
              </div>
              <div class="pizza-content">
                <h3 class="pizza-title">Garden Veggie</h3>
                <p class="pizza-description">
                  Fresh vegetables, bell peppers, and olives
                </p>
                <div class="pizza-price">
                  <span class="price">₹199</span>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center mt-5">
            <button routerLink="/pizzas" class="btn-material btn-material-primary btn-lg">
              <i class="btn-icon">🍕</i>
              View All Pizzas
            </button>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="cta-section">
        <div class="container-material text-center">
          <h2 class="cta-title">Ready to Order?</h2>
          <p class="cta-subtitle">Join thousands of satisfied customers and taste the difference.</p>
          <ng-container *ngIf="!authService.isAuthenticated()">
            <button routerLink="/register" class="btn-material btn-material-primary btn-lg">
              <i class="btn-icon">📝</i>
              Sign Up Now
            </button>
          </ng-container>
          <ng-container *ngIf="authService.isAuthenticated()">
            <button routerLink="/pizzas" class="btn-material btn-material-primary btn-lg">
              <i class="btn-icon">🍕</i>
              Order Your Pizza
            </button>
          </ng-container>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: 100vh;
    }
    
    .hero-content {
      position: relative;
      z-index: 2;
    }
    
    .hero-text {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    .hero-highlight {
      color: var(--accent-color);
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2.5rem;
      opacity: 0.9;
      line-height: 1.6;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn-lg {
      padding: 16px 32px;
      font-size: 16px;
    }
    
    .section-header {
      margin-bottom: 4rem;
    }
    
    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .section-subtitle {
      font-size: 1.125rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      text-align: center;
      padding: 2rem;
      text-align: center;
    }
    
    .feature-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      box-shadow: var(--box-shadow);
    }
    
    .feature-icon .icon {
      font-size: 2rem;
    }
    
    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 1rem;
    }
    
    .feature-description {
      color: var(--text-secondary);
      line-height: 1.6;
    }
    
    .pizzas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }
    
    .pizza-card {
      overflow: hidden;
    }
    
    .pizza-image {
      height: 250px;
      overflow: hidden;
    }
    
    .pizza-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .pizza-card:hover .pizza-image img {
      transform: scale(1.05);
    }
    
    .pizza-content {
      padding: 1.5rem;
    }
    
    .pizza-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .pizza-description {
      color: var(--text-secondary);
      margin-bottom: 1rem;
      line-height: 1.5;
    }
    
    .pizza-price {
      text-align: center;
    }
    
    .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .cta-section {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
      color: white;
      padding: 5rem 0;
      text-align: center;
    }
    
    .cta-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    
    .cta-subtitle {
      font-size: 1.125rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .btn-icon {
      margin-right: 0.5rem;
    }
    
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.125rem;
      }
      
      .section-title {
        font-size: 2rem;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .features-grid,
      .pizzas-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {
  constructor(public authService: AuthService) { }
}