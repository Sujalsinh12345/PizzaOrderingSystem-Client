import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order, OrderStatus } from '../../models/models';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container py-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h2 fw-bold text-dark">Orders</h1>
          <p class="text-secondary">
            <span *ngIf="authService.isCustomer()">Your order history</span>
            <span *ngIf="authService.isEmployee()">Orders to manage</span>
            <span *ngIf="authService.isAdmin()">All orders in the system</span>
          </p>
        </div>
        <button 
          class="btn btn-outline-primary" 
          (click)="loadOrders()" 
          [disabled]="loading">
          <i class="fas fa-sync-alt me-2"></i>
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>
      
      <!-- Loading State -->
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-secondary">Loading orders...</p>
      </div>

      <!-- Orders List -->
      <div *ngIf="!loading" class="card shadow-sm">
        <div *ngIf="orders.length === 0" class="text-center py-5">
          <div class="text-muted">
            <i class="fas fa-inbox fa-3x mb-3"></i>
            <h5>No orders found</h5>
            <p class="text-secondary">
              <span *ngIf="authService.isCustomer()">You haven't placed any orders yet.</span>
              <span *ngIf="authService.isEmployee() || authService.isAdmin()">No orders in the system.</span>
            </p>
          </div>
        </div>
        
        <ul *ngIf="orders.length > 0" class="list-group list-group-flush">
          <li *ngFor="let order of orders" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="h5 fw-medium text-dark mb-1">
                      Order #{{ order.orderId || 'N/A' }}
                    </p>
                    <p class="small text-muted mb-0">
                      Customer ID: {{ order.customerId || 'N/A' }}<br>
                      Employee ID: {{ order.employeeId || 'N/A' }}<br>
                      Pizza ID: {{ order.pizzaId || 'N/A' }}
                    </p>
                  </div>
                  <div class="d-flex align-items-center gap-3">
                    <span class="badge rounded-pill px-3 py-2">
                      {{ order.orderStatus || 'N/A' }}
                    </span>
                    <span class="h5 fw-bold text-dark mb-0">
                      ₹{{ order.totalPrice || 'N/A' }}
                    </span>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="small text-secondary mb-1">
                    Order Date: {{ order.deliveryDateTime || 'N/A' }}
                  </p>
                  <p class="small text-secondary mb-1">
                    Delivery to: {{ deliveryAddress || 'N/A' }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  deliveryAddress: string = '';

  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    // Get address from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.deliveryAddress = user.address || '';
    }
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    
    if (this.authService.isCustomer()) {
      const currentUser = this.authService.getCurrentUser();
      console.log(localStorage.getItem('role'));

      if (localStorage.getItem('role') === 'Customer') {
        console.log("Fetching orders for customer ID:", currentUser.customerId);
        this.orderService.getCustomerOrders(currentUser.customerId).subscribe({
          next: (response) => {
            console.log("Customer orders response:", response);
            console.log("Response type:", typeof response);
            console.log("Response keys:", Object.keys(response));
            this.loading = false;
            if (response.success && response.data) {
              this.orders = response.data.map((o: any) => ({
                orderId: o.orderId || o.id || o.order_id,
                customerId: o.customerId || o.custId || o.customer_id,
                employeeId: o.employeeId || o.empId || o.employee_id,
                pizzaId: o.pizzaId || o.pizza_id,
                orderStatus: o.orderStatus || o.status,
                totalPrice: o.totalPrice || o.price,
                deliveryDateTime: o.deliveryDateTime || o.date || o.delivery_date
              }));
              console.log('Orders loaded:', this.orders);
            } else if (response.success && response.ord) {
              this.orders = response.ord.map((o: any) => ({
                orderId: o.orderId || o.id || o.order_id,
                customerId: o.customerId || o.custId || o.customer_id,
                employeeId: o.employeeId || o.empId || o.employee_id,
                pizzaId: o.pizzaId || o.pizza_id,
                orderStatus: o.orderStatus || o.status,
                totalPrice: o.totalPrice || o.price,
                deliveryDateTime: o.deliveryDateTime || o.date || o.delivery_date
              }));
              console.log('Orders loaded from ord field:', this.orders);
            } else if (response.success && response.order && typeof response.order === 'object' && !Array.isArray(response.order)) {
              // Handle single order object
              const o = response.order as any;
              this.orders = [{
                orderId: o.orderId || o.id || o.order_id,
                customerId: o.customerId || o.custId || o.customer_id,
                employeeId: o.employeeId || o.empId || o.employee_id,
                pizzaId: o.pizzaId || o.pizza_id,
                orderStatus: o.orderStatus || o.status,
                totalPrice: o.totalPrice || o.price,
                deliveryDateTime: o.deliveryDateTime || o.date || o.delivery_date
              }];
              console.log('Single order loaded:', this.orders);
            } else {
              console.log('No data found in response. Response structure:', response);
            }
          },
          error: (error) => {
            this.loading = false;
            console.error('Error loading customer orders:', error);
          }
        });
      }
    } else {
      this.orderService.getAllOrders().subscribe({
        next: (response) => {
          console.log("All orders response:", response);
          console.log("Response type:", typeof response);
          console.log("Response keys:", Object.keys(response));
          this.loading = false;
          if (response.success && response.data) {
            this.orders = response.data;
            console.log('All orders loaded:', this.orders);
          } else if (response.success && response.ord) {
            this.orders = response.ord;
            console.log('All orders loaded from ord field:', this.orders);
          } else {
            console.log('No data found in response. Response structure:', response);
          }
        },
        error: (error) => {
          this.loading = false;
          console.error('Error loading orders:', error);
        }
      });
    }
  }

  updateOrderStatus(order: Order, event: any): void {
    const newStatus = event.target.value as OrderStatus;
    if (order.orderId) {
      this.orderService.updateOrderStatus(order.orderId, newStatus).subscribe({
        next: (response) => {
          if (response.success) {
            order.orderStatus = newStatus;
          }
        },
        error: (error) => {
          console.error('Error updating order status:', error);
          // Reset the select to original value
          event.target.value = order.orderStatus;
        }
      });
    }
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'badge bg-warning text-dark';
      case OrderStatus.Confirmed:
        return 'badge bg-primary';
      case OrderStatus.Preparing:
      case OrderStatus.Baking:
        return 'badge bg-info text-dark';
      case OrderStatus.Ready:
      case OrderStatus.Out_for_Delivery:
        return 'badge bg-secondary';
      case OrderStatus.Delivered:
        return 'badge bg-success';
      case OrderStatus.Cancelled:
        return 'badge bg-danger';
      default:
        return 'badge bg-light text-dark';
    }
  }
}