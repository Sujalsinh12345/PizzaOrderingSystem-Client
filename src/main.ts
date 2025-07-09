import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PizzaListComponent } from './components/pizza/pizza-list.component';
import { OrderListComponent } from './components/order/order-list.component';
import { AuthGuard } from './guards/auth.guard';
import { UserRole } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <div class="container-fluid min-vh-100 bg-light">
      <app-header></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class App { }

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customer/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { roles: [UserRole.Customer] } },
  { 
    path: 'employee/dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Employee] }
  },
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] }
  },
  { 
    path: 'pizzas', 
    component: PizzaListComponent
  },
  { 
    path: 'orders', 
    component: OrderListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin/pizzas', 
    component: PizzaListComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] }
  },
  { 
    path: 'admin/customers', 
    loadComponent: () => import('./components/admin/customer-management.component').then(c => c.CustomerManagementComponent),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] }
  },
  { 
    path: 'admin/employees', 
    loadComponent: () => import('./components/admin/employee-management.component').then(c => c.EmployeeManagementComponent),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] }
  },
  { 
    path: 'admin/toppings', 
    loadComponent: () => import('./components/admin/topping-management.component').then(c => c.ToppingManagementComponent),
    canActivate: [AuthGuard],
    data: { roles: [UserRole.Admin] }
  },
  { path: 'unauthorized', 
    loadComponent: () => import('./components/shared/unauthorized.component').then(c => c.UnauthorizedComponent)
  },
  { path: '**', redirectTo: '' }
];

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});