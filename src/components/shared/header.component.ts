import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="bg-white shadow-sm border-bottom">
      <div class="container-fluid px-4">
        <div class="d-flex justify-content-between align-items-center py-3">
          <!-- Logo and Brand -->
          <div class="d-flex align-items-center">
            <div class="me-3">
              <h1 class="h3 fw-bold text-primary m-0">🍕 PizzaExpress</h1>
            </div>
            
            <!-- Navigation Menu -->
            <nav class="d-none d-md-flex ms-4 gap-3" *ngIf="currentUser">
              <a routerLink="/customer/dashboard" 
                 routerLinkActive="border-bottom border-primary text-primary"
                 class="nav-link px-2 text-secondary">
                Dashboard
              </a>
              
              <a routerLink="/pizzas" 
                 routerLinkActive="border-bottom border-primary text-primary"
                 class="nav-link px-2 text-secondary">
                Pizzas
              </a>
              
              <a routerLink="/orders" 
                 routerLinkActive="border-bottom border-primary text-primary"
                 class="nav-link px-2 text-secondary">
                Orders
              </a>
              
              <!-- Admin Only Links -->
              <ng-container *ngIf="isAdmin()">
                <a routerLink="/admin/customers" 
                   routerLinkActive="border-bottom border-primary text-primary"
                   class="nav-link px-2 text-secondary">
                  Customers
                </a>
                <a routerLink="/admin/employees" 
                   routerLinkActive="border-bottom border-primary text-primary"
                   class="nav-link px-2 text-secondary">
                  Employees
                </a>
                <a routerLink="/admin/toppings" 
                   routerLinkActive="border-bottom border-primary text-primary"
                   class="nav-link px-2 text-secondary">
                  Toppings
                </a>
              </ng-container>
            </nav>
          </div>

          <!-- User Menu -->
          <div class="d-flex align-items-center gap-3">
            <ng-container *ngIf="currentUser; else authButtons">
              <div class="d-flex align-items-center gap-2">
                <span class="text-secondary">
                  Welcome, {{ currentUser.fname }} {{currentUser.lname}}
                </span>
                <span class="badge bg-primary text-white">
                  {{userRole}}
                </span>
                <button (click)="logout()" 
                        class="btn btn-link text-secondary">
                  Logout
                </button>
              </div>
            </ng-container>
            
            <ng-template #authButtons>
              <div class="d-flex gap-2">
                <a routerLink="/login" 
                   class="text-secondary">
                  Login
                </a>
                <a routerLink="/register" 
                   class="btn btn-primary">
                  Sign Up
                </a>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </header>
  `
})



export class HeaderComponent {
  currentUser: any = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  userRole: UserRole | null = null;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isEmployee(): boolean {
    return this.authService.isEmployee();
  }

  isCustomer(): boolean {
    return this.authService.isCustomer();
  }
}