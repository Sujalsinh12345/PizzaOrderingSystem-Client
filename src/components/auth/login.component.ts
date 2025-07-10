import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRole} from '../../models/models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card form-material">
        <div class="login-header">
          <div class="login-logo">
            <span class="logo-icon">🍕</span>
          </div>
          <h2 class="login-title">Welcome Back</h2>
          <p class="login-subtitle">
            Sign in to your account or 
            <a routerLink="/register" class="link-primary">create a new account</a>
          </p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <div class="input-wrapper">
              <i class="input-icon">📧</i>
              <input 
                id="email" 
                name="email" 
                type="email" 
                formControlName="email" 
                required 
                class="form-control-material" 
                placeholder="Enter your email" 
              />
            </div>
            <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" 
                 class="error-message">
              Please enter a valid email address
            </div>
          </div>
          
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <div class="input-wrapper">
              <i class="input-icon">🔒</i>
              <input 
                id="password" 
                name="password" 
                type="password" 
                formControlName="password" 
                required 
                class="form-control-material" 
                placeholder="Enter your password" 
              />
            </div>
            <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" 
                 class="error-message">
              Password is required
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label">Select Role</label>
            <div class="role-selection">
              <label class="role-option">
                <input type="radio" formControlName="role" value="Admin" required />
                <span class="role-card">
                  <i class="role-icon">👑</i>
                  <span class="role-text">Admin</span>
                </span>
              </label>
              <label class="role-option">
                <input type="radio" formControlName="role" value="Employee" required />
                <span class="role-card">
                  <i class="role-icon">👨‍💼</i>
                  <span class="role-text">Employee</span>
                </span>
              </label>
              <label class="role-option">
                <input type="radio" formControlName="role" value="Customer" required />
                <span class="role-card">
                  <i class="role-icon">👤</i>
                  <span class="role-text">Customer</span>
                </span>
              </label>
            </div>
            <div *ngIf="loginForm.get('role')?.invalid && loginForm.get('role')?.touched" 
                 class="error-message">
              Please select a role
            </div>
          </div>
          
          <div *ngIf="errorMessage" class="alert-material alert-material-danger">
            <i class="alert-icon">⚠️</i>
            {{ errorMessage }}
          </div>
          
          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading" 
            class="btn-material btn-material-primary btn-lg w-100">
            <span *ngIf="isLoading" class="spinner-material me-2"></span>
            <i *ngIf="!isLoading" class="btn-icon">🔑</i>
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        
        <div class="login-footer">
          <p class="text-center text-secondary">
            Don't have an account? 
            <a routerLink="/register" class="link-primary">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .login-card {
      width: 100%;
      max-width: 450px;
      margin: 0 auto;
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .login-logo {
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
    
    .logo-icon {
      font-size: 2.5rem;
    }
    
    .login-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .login-subtitle {
      color: var(--text-secondary);
      margin-bottom: 0;
    }
    
    .link-primary {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
    }
    
    .link-primary:hover {
      text-decoration: underline;
    }
    
    .login-form {
      margin-bottom: 1.5rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: var(--text-primary);
    }
    
    .input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }
    
    .input-icon {
      position: absolute;
      left: 16px;
      font-size: 1.125rem;
      color: var(--text-secondary);
      z-index: 2;
    }
    
    .form-control-material {
      width: 100%;
      padding: 16px 16px 16px 48px;
      border: 2px solid #e0e0e0;
      border-radius: var(--border-radius);
      font-size: 1rem;
      transition: var(--transition);
      background: white;
    }
    
    .form-control-material:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
      outline: none;
    }
    
    .error-message {
      color: var(--danger-color);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    
    .role-selection {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    
    .role-option {
      cursor: pointer;
    }
    
    .role-option input[type="radio"] {
      display: none;
    }
    
    .role-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: var(--border-radius);
      background: white;
      transition: var(--transition);
      text-align: center;
    }
    
    .role-option input[type="radio"]:checked + .role-card {
      border-color: var(--primary-color);
      background: rgba(25, 118, 210, 0.05);
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
    }
    
    .role-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .role-text {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.875rem;
    }
    
    .alert-material {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    .alert-icon {
      font-size: 1.125rem;
    }
    
    .btn-lg {
      padding: 16px 32px;
      font-size: 1rem;
      font-weight: 600;
    }
    
    .login-footer {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
    }
    
    @media (max-width: 576px) {
      .login-container {
        padding: 1rem;
      }
      
      .role-selection {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }
      
      .login-title {
        font-size: 1.75rem;
      }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const role = this.loginForm.value.role;
      const loginCredentials = this.loginForm.value;

      let loginObservable;

      switch (role) {
        case UserRole.Customer:
          loginObservable = this.authService.loginAsCustomer(loginCredentials);
          break;
        case UserRole.Admin:
          console.log('admin:');
          loginObservable = this.authService.loginAsAdmin(loginCredentials);
          break;
        case UserRole.Employee:
          loginObservable = this.authService.loginAsEmployee(loginCredentials);
          break;
        default:
          this.isLoading = false;
          this.errorMessage = 'Invalid role selected';
          return;
      }

      loginObservable.subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login response:', response);

          if (response.success) {
            console.log('Login successful:', response);
            if (role === UserRole.Customer) {
              this.router.navigate(['/customer/dashboard']);
            } else if (role === UserRole.Admin) {
              this.router.navigate(['/admin/dashboard']);
            } else if (role === UserRole.Employee) {
              this.router.navigate(['/employee/dashboard']);
            }
          } else {
            this.errorMessage = response.message || 'Login failed';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      });
    }
  }
}
