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
    <header class="nav-material">
      <div class="container-material">
        <div class="d-flex justify-content-between align-items-center py-3">
          <!-- Logo and Brand -->
          <div class="d-flex align-items-center">
            <div class="brand-section me-4">
              <div class="brand-logo">
                <span class="brand-icon">🍕</span>
              </div>
              <div class="brand-text">
                <h1 class="brand-title">PizzaExpress</h1>
                <p class="brand-subtitle">Delicious & Fresh</p>
              </div>
            </div>
            
            <!-- Navigation Menu -->
            <nav class="nav-menu d-none d-lg-flex ms-5" *ngIf="currentUser">
              <a *ngIf="userRole === 'Admin'" 
                routerLink="/admin/dashboard" 
                routerLinkActive="active"
                class="nav-link">
                <i class="nav-icon">📊</i>Dashboard</a>
              <a *ngIf="userRole === 'Employee'" 
                routerLink="/employee/dashboard" 
                routerLinkActive="active"
                class="nav-link">
                <i class="nav-icon">📊</i>Dashboard</a>
              <a  *ngIf="userRole === 'Customer'" 
                routerLink="/customer/dashboard" 
                routerLinkActive="active"
                class="nav-link">
                <i class="nav-icon">📊</i>Dashboard</a>
              
              
              <a routerLink="/pizzas" 
                 routerLinkActive="active"
                 class="nav-link">
                <i class="nav-icon">🍕</i>
                Pizzas
              </a>
              
              <a routerLink="/orders" 
                 routerLinkActive="active"
                 class="nav-link">
                <i class="nav-icon">📋</i>
                Orders
              </a>
              
              <!-- Admin Only Links -->
              <ng-container *ngIf="isAdmin()">
                <a routerLink="/admin/customers" 
                   routerLinkActive="active"
                   class="nav-link">
                  <i class="nav-icon">👥</i>
                  Customers
                </a>
                <a routerLink="/admin/employees" 
                   routerLinkActive="active"
                   class="nav-link">
                  <i class="nav-icon">👨‍💼</i>
                  Employees
                </a>
                <a routerLink="/admin/toppings" 
                   routerLinkActive="active"
                   class="nav-link">
                  <i class="nav-icon">🥬</i>
                  Toppings
                </a>
              </ng-container>
            </nav>
          </div>

          <!-- User Menu -->
          <div class="user-section">
            <ng-container *ngIf="currentUser; else authButtons">
              <div class="user-profile">
                <div class="user-info">
                  <div class="user-avatar">
                    <span class="avatar-text">{{ currentUser.fname?.charAt(0) }}{{ currentUser.lname?.charAt(0) }}</span>
                  </div>
                  <div class="user-details">
                    <span class="user-name">{{ currentUser.fname }} {{currentUser.lname}}</span>
                    <span class="user-role badge-material" [ngClass]="getRoleClass()">
                      {{userRole}}
                    </span>
                  </div>
                </div>
                <div class="user-actions">
                  <button (click)="logout()" 
                          class="btn-material btn-material-outline btn-sm">
                    <i class="btn-icon">🚪</i>
                    Logout
                  </button>
                </div>
              </div>
            </ng-container>
            
            <ng-template #authButtons>
              <div class="auth-buttons">
                <a routerLink="/login" 
                   class="btn-material btn-material-outline btn-sm me-2">
                  <i class="btn-icon">🔑</i>
                  Login
                </a>
                <a routerLink="/register" 
                   class="btn-material btn-material-primary btn-sm">
                  <i class="btn-icon">📝</i>
                  Sign Up
                </a>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .brand-section {
      display: flex;
      align-items: center;
    }
    
    .brand-logo {
      width: 48px;
      height: 48px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      box-shadow: var(--box-shadow);
    }
    
    .brand-icon {
      font-size: 24px;
    }
    
    .brand-text {
      display: flex;
      flex-direction: column;
    }
    
    .brand-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--primary-color);
      margin: 0;
      line-height: 1.2;
    }
    
    .brand-subtitle {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
      font-weight: 500;
    }
    
    .nav-menu {
      display: flex;
      gap: 8px;
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: var(--border-radius);
      text-decoration: none;
      color: var(--text-secondary);
      font-weight: 500;
      transition: var(--transition);
    }
    
    .nav-link:hover,
    .nav-link.active {
      color: var(--primary-color);
      background: rgba(25, 118, 210, 0.1);
      text-decoration: none;
    }
    
    .nav-icon {
      font-size: 16px;
    }
    
    .user-section {
      display: flex;
      align-items: center;
    }
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .user-avatar {
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 14px;
    }
    
    .user-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .user-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 14px;
    }
    
    .user-role {
      font-size: 10px;
      padding: 2px 8px;
    }
    
    .user-actions {
      display: flex;
      gap: 8px;
    }
    
    .auth-buttons {
      display: flex;
      gap: 8px;
    }
    
    .btn-icon {
      font-size: 14px;
      margin-right: 4px;
    }
    
    .btn-sm {
      padding: 8px 16px;
      font-size: 12px;
    }
    
    @media (max-width: 992px) {
      .nav-menu {
        display: none;
      }
      
      .brand-text {
        display: none;
      }
    }
    
    @media (max-width: 576px) {
      .user-details {
        display: none;
      }
      
      .auth-buttons {
        flex-direction: column;
        gap: 4px;
      }
    }
  `]
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
  
  getRoleClass(): string {
    switch(this.userRole) {
      case UserRole.Admin:
        return 'bg-danger';
      case UserRole.Employee:
        return 'bg-warning';
      case UserRole.Customer:
        return 'bg-success';
      default:
        return 'bg-secondary';
    }
  }
}