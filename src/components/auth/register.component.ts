import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <div class="register-card form-material">
        <div class="register-header">
          <div class="register-logo">
            <span class="logo-icon">🍕</span>
          </div>
          <h2 class="register-title">Join PizzaExpress</h2>
          <p class="register-subtitle">
            Create your account or 
            <a routerLink="/login" class="link-primary">sign in to your existing account</a>
          </p>
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">First Name</label>
              <div class="input-wrapper">
                <i class="input-icon">👤</i>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  formControlName="Fname" 
                  required 
                  class="form-control-material" 
                  placeholder="Enter your first name" 
                />
              </div>
              <div *ngIf="registerForm.get('Fname')?.invalid && registerForm.get('Fname')?.touched" 
                   class="error-message">
                First name is required
              </div>
            </div>
            
            <div class="form-group">
              <label for="lastName" class="form-label">Last Name</label>
              <div class="input-wrapper">
                <i class="input-icon">👤</i>
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  formControlName="Lname" 
                  required 
                  class="form-control-material" 
                  placeholder="Enter your last name" 
                />
              </div>
              <div *ngIf="registerForm.get('Lname')?.invalid && registerForm.get('Lname')?.touched" 
                   class="error-message">
                Last name is required
              </div>
            </div>
          </div>
          
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
                placeholder="Enter your email address" 
              />
            </div>
            <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" 
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
            <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" 
                 class="error-message">
              Password must be at least 6 characters long
            </div>
          </div>
          
          <div class="form-group">
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <div class="input-wrapper">
              <i class="input-icon">📞</i>
              <input 
                id="phoneNumber" 
                name="phoneNumber" 
                type="tel" 
                formControlName="PhoneNo" 
                required 
                class="form-control-material" 
                placeholder="Enter your phone number" 
              />
            </div>
            <div *ngIf="registerForm.get('PhoneNo')?.invalid && registerForm.get('PhoneNo')?.touched" 
                 class="error-message">
              Phone number is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="address" class="form-label">Address</label>
            <div class="input-wrapper">
              <i class="input-icon">🏠</i>
              <input 
                id="address" 
                name="address" 
                type="text" 
                formControlName="address" 
                required 
                class="form-control-material" 
                placeholder="Enter your street address" 
              />
            </div>
            <div *ngIf="registerForm.get('address')?.invalid && registerForm.get('address')?.touched" 
                 class="error-message">
              Address is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="city" class="form-label">City</label>
            <div class="input-wrapper">
              <i class="input-icon">🏙️</i>
              <input 
                id="city" 
                name="city" 
                type="text" 
                formControlName="city" 
                required 
                class="form-control-material" 
                placeholder="Enter your city" 
              />
            </div>
            <div *ngIf="registerForm.get('city')?.invalid && registerForm.get('city')?.touched" 
                 class="error-message">
              City is required
            </div>
          </div>
          
          <div *ngIf="errorMessage" class="alert-material alert-material-danger">
            <i class="alert-icon">⚠️</i>
            {{ errorMessage }}
          </div>
          
          <button 
            type="submit" 
            [disabled]="registerForm.invalid || isLoading" 
            class="btn-material btn-material-primary btn-lg w-100">
            <span *ngIf="isLoading" class="spinner-material me-2"></span>
            <i *ngIf="!isLoading" class="btn-icon">📝</i>
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>
        
        <div class="register-footer">
          <p class="text-center text-secondary">
            Already have an account? 
            <a routerLink="/login" class="link-primary">Sign in here</a>
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .register-card {
      width: 100%;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .register-logo {
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
    
    .register-title {
      font-size: 2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }
    
    .register-subtitle {
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
    
    .register-form {
      margin-bottom: 1.5rem;
    }
    
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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
    
    .register-footer {
      text-align: center;
      padding-top: 1.5rem;
      border-top: 1px solid #e0e0e0;
    }
    
    @media (max-width: 576px) {
      .register-container {
        padding: 1rem;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .register-title {
        font-size: 1.75rem;
      }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      Fname: ['', [Validators.required]],
      Lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      PhoneNo: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.authService.registerCustomer(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          console.log(response.success);
          this.isLoading = false;
          if (response.success) {
            console.log('Registration successful:', response);
            this.router.navigate(['/customer/dashboard']);
          } else {
            this.errorMessage = response.message || 'Registration failed';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed. Please try again.';
          console.error('Registration error:', error);
        }
      });
    }
  }
}
