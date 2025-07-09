import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { PizzaService } from '../../services/pizza.service';
import { UserRole, Order, Pizza } from '../../models/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <!-- Welcome Section -->
      <div class="mb-4">
        <h1 class="h2 fw-bold text-dark">
          Welcome back, {{ currentUser.fname }}!
        </h1>
        <p class="text-secondary">
          <span *ngIf="authService.isCustomer()">Ready to order some delicious pizza?</span>
          <span *ngIf="authService.isEmployee()">Here's what needs your attention today.</span>
          <span *ngIf="authService.isAdmin()">Here's your business overview.</span>
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm p-3 d-flex flex-row align-items-center">
            <div class="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
              <span class="text-primary fs-3">📦</span>
            </div>
            <div>
              <div class="small text-secondary">
                <span *ngIf="authService.isCustomer()">Your Orders</span>
                <span *ngIf="authService.isEmployee()">Pending Orders</span>
                <span *ngIf="authService.isAdmin()">Total Orders</span>
              </div>
              <div class="h4 fw-bold text-dark">{{ orderCount }}</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm p-3 d-flex flex-row align-items-center">
            <div class="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
              <span class="text-info fs-3">🍕</span>
            </div>
            <div>
              <div class="small text-secondary">Available Pizzas</div>
              <div class="h4 fw-bold text-dark">{{ pizzaCount }}</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3" *ngIf="authService.isCustomer()">
          <div class="card h-100 shadow-sm p-3 d-flex flex-row align-items-center">
            <div class="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
              <span class="text-success fs-3">💰</span>
            </div>
            <div>
              <div class="small text-secondary">Total Spent</div>
              <div class="h4 fw-bold text-dark">\${{ totalSpent }}</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3" *ngIf="authService.isAdmin()">
          <div class="card h-100 shadow-sm p-3 d-flex flex-row align-items-center">
            <div class="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
              <span class="text-success fs-3">💰</span>
            </div>
            <div>
              <div class="small text-secondary">Total Revenue</div>
              <div class="h4 fw-bold text-dark">\${{ totalRevenue }}</div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card h-100 shadow-sm p-3 d-flex flex-row align-items-center">
            <div class="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
              <span class="text-warning fs-3">⭐</span>
            </div>
            <div>
              <div class="small text-secondary">
                <span *ngIf="authService.isCustomer()">Favorite</span>
                <span *ngIf="!authService.isCustomer()">Popular</span>
                Pizza
              </div>
              <div class="h5 fw-bold text-dark">{{ popularPizza || 'Margherita' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="row g-4">
        <!-- Customer Quick Actions -->
        <div *ngIf="authService.isCustomer()" class="col-12 col-lg-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="h5 card-title mb-4">Quick Actions</h3>
              <div class="d-grid gap-2">
                <button routerLink="/pizzas" class="btn btn-primary">
                  Browse Pizzas
                </button>
                <button routerLink="/orders" class="btn btn-outline-secondary">
                  View My Orders
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Employee Quick Actions -->
        <div *ngIf="authService.isEmployee()" class="col-12 col-lg-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="h5 card-title mb-4">Quick Actions</h3>
              <div class="d-grid gap-2">
                <button routerLink="/orders" class="btn btn-primary">
                  Manage Orders
                </button>
                <button routerLink="/pizzas" class="btn btn-outline-secondary">
                  View Pizzas
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Quick Actions -->
        <div *ngIf="authService.isAdmin()" class="col-12 col-lg-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="h5 card-title mb-4">Management</h3>
              <div class="row g-2">
                <div class="col-6">
                  <button routerLink="/admin/pizzas" class="btn btn-primary w-100">
                    Manage Pizzas
                  </button>
                </div>
                <div class="col-6">
                  <button routerLink="/admin/toppings" class="btn btn-primary w-100">
                    Manage Toppings
                  </button>
                </div>
                <div class="col-6">
                  <button routerLink="/admin/employees" class="btn btn-outline-secondary w-100">
                    Manage Staff
                  </button>
                </div>
                <div class="col-6">
                  <button routerLink="/admin/customers" class="btn btn-outline-secondary w-100">
                    View Customers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="h5 card-title mb-4">
                <span *ngIf="authService.isCustomer()">Recent Orders</span>
                <span *ngIf="!authService.isCustomer()">Latest Orders</span>
              </h3>
              <div class="list-group">
                <div *ngFor="let order of recentOrders.slice(0, 3)" 
                     class="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <p class="mb-1 fw-medium text-dark">Order #{{ order.id }}</p>
                    <p class="mb-0 small text-secondary">{{ order.orderDate | date:'short' }}</p>
                  </div>
                  <div class="text-end">
                    <p class="mb-1 fw-medium text-dark">\${{ order.totalAmount }}</p>
                    <span [class]="getStatusClass(order.status)" 
                          class="badge rounded-pill">
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </div>
              
              <button routerLink="/orders" 
                      class="btn btn-link text-primary text-decoration-none p-0 mt-3">
                View All Orders →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  orderCount = 0;
  pizzaCount = 0;
  totalSpent = 0;
  totalRevenue = 0;
  popularPizza = '';
  recentOrders: Order[] = [];

  constructor(
    public authService: AuthService,
    private orderService: OrderService,
    private pizzaService: PizzaService
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit(): void {
    console.log(localStorage);
    console.log('Dashboard component initialized');
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load pizza count
    this.pizzaService.getAllPizzas().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.pizzaCount = response.data.length;
        }
      }
    });

    // Load orders based on user role
    if (this.authService.isCustomer()) {
      this.loadCustomerData();
    } else {
      this.loadStaffData();
    }
  }

  loadCustomerData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.id) {
      this.orderService.getCustomerOrders(currentUser.id).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.recentOrders = response.data;
            this.orderCount = this.recentOrders.length;
            this.totalSpent = this.recentOrders.reduce((sum, order) => sum + order.totalAmount, 0);
          }
        }
      });
    }
  }

  loadStaffData(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.recentOrders = response.data;
          this.orderCount = this.recentOrders.length;
          this.totalRevenue = this.recentOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        }
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'badge bg-warning text-dark';
      case 'Confirmed':
        return 'badge bg-primary';
      case 'Preparing':
      case 'Baking':
        return 'badge bg-info text-dark';
      case 'Ready':
      case 'Out_for_Delivery':
        return 'badge bg-secondary';
      case 'Delivered':
        return 'badge bg-success';
      case 'Cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-light text-dark';
    }
  }
}