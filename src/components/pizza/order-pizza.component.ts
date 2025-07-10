import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';
import { ToppingService } from '../../services/topping.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Pizza, Topping } from '../../models/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-pizza',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container py-4">
      <h2 class="mb-4">Order Pizza</h2>
      <div *ngIf="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-secondary">Loading pizzas and toppings...</p>
      </div>
      <div *ngIf="!loading">
        <form (ngSubmit)="orderNow()" #orderForm="ngForm">
          <div class="mb-4">
            <h4>Select Pizza</h4>
            <div *ngFor="let pizza of pizzas" class="form-check">
              <input class="form-check-input" type="radio" name="pizza" [value]="pizza" [(ngModel)]="selectedPizza" ngModel required>
              <label class="form-check-label">
                {{ pizza.name }} (₹{{ pizza.smallPrice }} / ₹{{ pizza.mediumPrice }} / ₹{{ pizza.largePrice }})
              </label>
            </div>
          </div>
          <div class="mb-4">
            <h4>Select Toppings</h4>
            <div *ngFor="let topping of toppings" class="form-check">
              <input class="form-check-input" type="checkbox" [value]="topping" (change)="toggleTopping(topping, $event)">
              <label class="form-check-label">
                {{ topping.toppingName }} (₹{{ topping.smallPrice }})
              </label>
            </div>
          </div>
          <button type="button" class="btn btn-success" (click)="orderNow()" [disabled]="!selectedPizza">Order Now</button>
        </form>
      </div>
    </div>
  `
})
export class OrderPizzaComponent implements OnInit {
  pizzas: Pizza[] = [];
  toppings: Topping[] = [];
  selectedPizza: Pizza | null = null;
  selectedToppings: Topping[] = [];
  loading = true;

  constructor(
    private pizzaService: PizzaService,
    private toppingService: ToppingService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    Promise.all([
      this.pizzaService.getAllPizzas().toPromise(),
      this.toppingService.getAllToppings().toPromise()
    ]).then(([pizzaRes, toppingRes]) => {
      this.pizzas = (pizzaRes?.data || pizzaRes?.pizza || []);
      this.toppings = (toppingRes?.data || toppingRes?.toppings || toppingRes?.top || []);
      this.loading = false;
    });
  }

  toggleTopping(topping: Topping, event: any): void {
    if (event.target.checked) {
      this.selectedToppings.push(topping);
    } else {
      this.selectedToppings = this.selectedToppings.filter(t => t.toppingId !== topping.toppingId);
    }
  }

  orderNow(): void {
    console.log('OrderNow called');
    if (!this.selectedPizza) return;
    const user = this.authService.getCurrentUser();
    const order = {
      customerId: user.customerId || user.id,
      pizzaId: this.selectedPizza.pizzaId,
      toppings: this.selectedToppings.map(t => t.toppingId),
      totalPrice: this.selectedPizza.smallPrice + this.selectedToppings.reduce((sum, t) => sum + t.smallPrice, 0),
      orderStatus: 'Pending',
      deliveryDateTime: new Date()
    };
    console.log('Placing order:', order);
    this.orderService.createOrder(order as any).subscribe({
      next: (response) => {
        console.log('Order response:', response);
        if (response.success) {
          this.router.navigate(['/orders']);
        } else {
          alert('Order failed: ' + (response.message || 'Unknown error'));
        }
      },
      error: (error) => {
        console.error('Order error:', error);
        alert('Failed to place order.');
      }
    });
  }
} 