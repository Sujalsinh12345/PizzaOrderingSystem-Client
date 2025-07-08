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
      </div>
      <div class="card shadow-sm">
        <ul class="list-group list-group-flush">
          <li *ngFor="let order of orders" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <p class="h5 fw-medium text-dark mb-1">
                      Order #{{ order.id }}
                    </p>
                    <p class="small text-muted mb-0" *ngIf="authService.isAdmin() && order.customer">
                      Customer: {{ order.customer.firstName }} {{ order.customer.lastName }}
                    </p>
                  </div>
                  <div class="d-flex align-items-center gap-3">
                    <span [ngClass]="getStatusClass(order.status)" class="badge rounded-pill px-3 py-2">
                      {{ order.status }}
                    </span>
                    <span class="h5 fw-bold text-dark mb-0">
                      \${{ order.totalAmount }}
                    </span>
                  </div>
                </div>
                <div class="mt-2">
                  <p class="small text-secondary mb-1">
                    Order Date: {{ order.orderDate | date:'medium' }}
                  </p>
                  <p class="small text-secondary mb-1">
                    Delivery to: {{ order.deliveryAddress }}
                  </p>
                  <p class="small text-secondary mb-1" *ngIf="order.specialInstructions">
                    Special Instructions: {{ order.specialInstructions }}
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

  constructor(
    private orderService: OrderService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    
    if (this.authService.isCustomer()) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser?.id) {
        this.orderService.getCustomerOrders(currentUser.id).subscribe({
          next: (response) => {
            this.loading = false;
            if (response.success && response.data) {
              this.orders = response.data;
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
          this.loading = false;
          if (response.success && response.data) {
            this.orders = response.data;
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
    if (order.id) {
      this.orderService.updateOrderStatus(order.id, newStatus).subscribe({
        next: (response) => {
          if (response.success) {
            order.status = newStatus;
          }
        },
        error: (error) => {
          console.error('Error updating order status:', error);
          // Reset the select to original value
          event.target.value = order.status;
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