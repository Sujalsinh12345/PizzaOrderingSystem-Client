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
    <div class="dashboard-container">
      <div class="container-material">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <div class="welcome-content">
            <h1 class="welcome-title">
              Welcome back, {{ currentUser.fname }}!
            </h1>
            <p class="welcome-subtitle">
              <span *ngIf="authService.isCustomer()">Ready to order some delicious pizza?</span>
              <span *ngIf="authService.isEmployee()">Here's what needs your attention today.</span>
              <span *ngIf="authService.isAdmin()">Here's your business overview.</span>
            </p>
          </div>
          <div class="welcome-avatar">
            <span class="avatar-text">{{ currentUser.fname?.charAt(0) }}{{ currentUser.lname?.charAt(0) }}</span>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card material-card">
            <div class="stat-icon orders-icon">
              <i class="icon">📦</i>
            </div>
            <div class="stat-content">
              <div class="stat-label">
                <span *ngIf="authService.isCustomer()">Your Orders</span>
                <span *ngIf="authService.isEmployee()">Pending Orders</span>
                <span *ngIf="authService.isAdmin()">Total Orders</span>
              </div>
              <div class="stat-value">{{ orderCount }}</div>
            </div>
          </div>

          <div class="stat-card material-card">
            <div class="stat-icon pizzas-icon">
              <i class="icon">🍕</i>
            </div>
            <div class="stat-content">
              <div class="stat-label">Available Pizzas</div>
              <div class="stat-value">{{ pizzaCount }}</div>
            </div>
          </div>

          <div class="stat-card material-card" *ngIf="authService.isCustomer()">
            <div class="stat-icon money-icon">
              <i class="icon">💰</i>
            </div>
            <div class="stat-content">
              <div class="stat-label">Total Spent</div>
              <div class="stat-value">\₹{{ totalSpent }}</div>
            </div>
          </div>

          <div class="stat-card material-card" *ngIf="authService.isAdmin()">
            <div class="stat-icon revenue-icon">
              <i class="icon">💰</i>
            </div>
            <div class="stat-content">
              <div class="stat-label">Total Revenue</div>
              <div class="stat-value">\₹{{ totalRevenue }}</div>
            </div>
          </div>

          <div class="stat-card material-card">
            <div class="stat-icon popular-icon">
              <i class="icon">⭐</i>
            </div>
            <div class="stat-content">
              <div class="stat-label">
                <span *ngIf="authService.isCustomer()">Favorite</span>
                <span *ngIf="!authService.isCustomer()">Popular</span>
                Pizza
              </div>
              <div class="stat-value">{{ popularPizza || 'Margherita' }}</div>
            </div>
          </div>
        </div>

        <!-- Quick Actions and Recent Orders -->
        <div class="dashboard-content">
          <!-- Quick Actions -->
          <div class="actions-section">
            <!-- Customer Quick Actions -->
            <div *ngIf="authService.isCustomer()" class="actions-card material-card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="title-icon">⚡</i>
                  Quick Actions
                </h3>
              </div>
              <div class="card-content">
                <div class="actions-grid">
                  <button routerLink="/pizzas" class="btn-material btn-material-primary">
                    <i class="btn-icon">🍕</i>
                    Browse Pizzas
                  </button>
                  <button routerLink="/orders" class="btn-material btn-material-outline">
                    <i class="btn-icon">📋</i>
                    View My Orders
                  </button>
                </div>
              </div>
            </div>

            <!-- Employee Quick Actions -->
            <div *ngIf="authService.isEmployee()" class="actions-card material-card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="title-icon">⚡</i>
                  Quick Actions
                </h3>
              </div>
              <div class="card-content">
                <div class="actions-grid">
                  <button routerLink="/orders" class="btn-material btn-material-primary">
                    <i class="btn-icon">📋</i>
                    Manage Orders
                  </button>
                  <button routerLink="/pizzas" class="btn-material btn-material-outline">
                    <i class="btn-icon">🍕</i>
                    View Pizzas
                  </button>
                </div>
              </div>
            </div>

            <!-- Admin Quick Actions -->
            <div *ngIf="authService.isAdmin()" class="actions-card material-card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="title-icon">⚙️</i>
                  Management
                </h3>
              </div>
              <div class="card-content">
                <div class="admin-actions-grid">
                  <button routerLink="/admin/pizzas" class="btn-material btn-material-primary">
                    <i class="btn-icon">🍕</i>
                    Manage Pizzas
                  </button>
                  <button routerLink="/admin/toppings" class="btn-material btn-material-primary">
                    <i class="btn-icon">🥬</i>
                    Manage Toppings
                  </button>
                  <button routerLink="/admin/employees" class="btn-material btn-material-outline">
                    <i class="btn-icon">👨‍💼</i>
                    Manage Staff
                  </button>
                  <button routerLink="/admin/customers" class="btn-material btn-material-outline">
                    <i class="btn-icon">👥</i>
                    View Customers
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="orders-section">
            <div class="orders-card material-card">
              <div class="card-header">
                <h3 class="card-title">
                  <i class="title-icon">📋</i>
                  <span *ngIf="authService.isCustomer()">Recent Orders</span>
                  <span *ngIf="!authService.isCustomer()">Latest Orders</span>
                </h3>
              </div>
              <div class="card-content">
                <div class="orders-list">
                  <div *ngFor="let order of recentOrders.slice(0, 3)" 
                       class="order-item">
                    <div class="order-info">
                      <div class="order-header">
                        <h4 class="order-number">Order #{{ order.orderId }}</h4>
                        <span [class]="getStatusClass(order.orderStatus)" 
                              class="status-badge">
                          {{ order.orderStatus}}
                        </span>
                      </div>
                      <p class="order-date">{{ order.deliveryDateTime | date:'short' }}</p>
                    </div>
                    <div class="order-amount">
                      <span class="amount">\₹{{ order.totalPrice }}</span>
                    </div>
                  </div>
                  
                  <div *ngIf="recentOrders.length === 0" class="empty-orders">
                    <i class="empty-icon">📋</i>
                    <p class="empty-text">No orders yet</p>
                  </div>
                </div>
                
                <div class="card-footer">
                  <button routerLink="/orders" 
                          class="btn-material btn-material-outline btn-sm">
                    <i class="btn-icon">👁️</i>
                    View All Orders
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem 0;
      min-height: 100vh;
    }
    
    .welcome-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
      border-radius: var(--border-radius);
      color: white;
    }
    
    .welcome-content {
      flex: 1;
    }
    
    .welcome-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .welcome-subtitle {
      font-size: 1.125rem;
      opacity: 0.9;
      margin-bottom: 0;
    }
    
    .welcome-avatar {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 700;
      backdrop-filter: blur(10px);
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
    
    .stat-card {
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .orders-icon {
      background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    }
    
    .pizzas-icon {
      background: linear-gradient(135deg, #17a2b8, #20c997);
    }
    
    .money-icon {
      background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .revenue-icon {
      background: linear-gradient(135deg, #28a745, #20c997);
    }
    
    .popular-icon {
      background: linear-gradient(135deg, #ffc107, #fd7e14);
    }
    
    .stat-icon .icon {
      font-size: 1.5rem;
      color: white;
    }
    
    .stat-content {
      flex: 1;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 0.25rem;
    }
    
    .stat-value {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    
    .dashboard-content {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 2rem;
    }
    
    .actions-card,
    .orders-card {
      height: fit-content;
    }
    
    .card-header {
      padding: 1.5rem 1.5rem 0;
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 1.5rem;
    }
    
    .card-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
    
    .title-icon {
      font-size: 1.125rem;
    }
    
    .card-content {
      padding: 0 1.5rem 1.5rem;
    }
    
    .actions-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .admin-actions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: var(--border-radius);
      background: #fafafa;
    }
    
    .order-info {
      flex: 1;
    }
    
    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .order-number {
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0;
    }
    
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .order-date {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
    }
    
    .order-amount {
      text-align: right;
    }
    
    .amount {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    .empty-orders {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
    }
    
    .empty-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }
    
    .empty-text {
      font-size: 1.125rem;
      margin: 0;
    }
    
    .card-footer {
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
      text-align: center;
    }
    
    @media (max-width: 992px) {
      .dashboard-content {
        grid-template-columns: 1fr;
      }
      
      .welcome-section {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .welcome-title {
        font-size: 2rem;
      }
      
      .stats-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }
      
      .admin-actions-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .stat-card {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
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
          } else if (response.success && response.ord) {
            this.recentOrders = response.ord;
          } else if (response.success && response.order && typeof response.order === 'object' && !Array.isArray(response.order)) {
            this.recentOrders = [response.order];
          } else {
            this.recentOrders = [];
          }
          this.orderCount = this.recentOrders.length;
          this.totalSpent = this.recentOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        }
      });
    }
  }

  loadStaffData(): void {
    this.orderService.getAllOrders().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.recentOrders = response.data;
        } else if (response.success && response.ord) {
          this.recentOrders = response.ord;
        } else if (response.success && response.order && typeof response.order === 'object' && !Array.isArray(response.order)) {
          this.recentOrders = [response.order];
        } else {
          this.recentOrders = [];
        }
        this.orderCount = this.recentOrders.length;
        this.totalRevenue = this.recentOrders.reduce((sum, order) => sum + order.totalPrice, 0);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'badge-material bg-warning';
      case 'Confirmed':
        return 'badge-material bg-primary';
      case 'Preparing':
      case 'Baking':
        return 'badge-material bg-info';
      case 'Ready':
      case 'Out_for_Delivery':
        return 'badge-material bg-secondary';
      case 'Delivered':
        return 'badge-material bg-success';
      case 'Cancelled':
        return 'badge-material bg-danger';
      default:
        return 'badge-material bg-light';
    }
  }
}