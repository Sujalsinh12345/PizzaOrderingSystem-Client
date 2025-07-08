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
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
      <div class="card p-4 shadow-sm" style="max-width: 500px; width: 100%;">
        <div class="text-center mb-4">
          <div class="mx-auto mb-3" style="height: 48px; width: 48px; display: flex; align-items: center; justify-content: center;">
            <span class="fs-1">🍕</span>
          </div>
          <h2 class="h4 fw-bold text-dark mb-2">Create your account</h2>
          <p class="text-secondary mb-0">
            Or
            <a routerLink="/login" class="fw-semibold text-primary text-decoration-none">sign in to your existing account</a>
          </p>
        </div>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="firstName" class="form-label">First Name</label>
              <input id="firstName" name="firstName" type="text" formControlName="firstName" required class="form-control" placeholder="First Name" />
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label">Last Name</label>
              <input id="lastName" name="lastName" type="text" formControlName="lastName" required class="form-control" placeholder="Last Name" />
            </div>
            <div class="col-12">
              <label for="email" class="form-label">Email Address</label>
              <input id="email" name="email" type="email" formControlName="email" required class="form-control" placeholder="Email address" />
            </div>
            <div class="col-12">
              <label for="password" class="form-label">Password</label>
              <input id="password" name="password" type="password" formControlName="password" required class="form-control" placeholder="Password" />
            </div>
            <div class="col-12">
              <label for="phoneNumber" class="form-label">Phone Number</label>
              <input id="phoneNumber" name="phoneNumber" type="tel" formControlName="phoneNumber" required class="form-control" placeholder="Phone Number" />
            </div>
            <div class="col-12">
              <label for="address" class="form-label">Address</label>
              <input id="address" name="address" type="text" formControlName="address" required class="form-control" placeholder="Street Address" />
            </div>
            <div class="col-md-4">
              <label for="city" class="form-label">City</label>
              <input id="city" name="city" type="text" formControlName="city" required class="form-control" placeholder="City" />
            </div>
            <div class="col-md-4">
              <label for="state" class="form-label">State</label>
              <input id="state" name="state" type="text" formControlName="state" required class="form-control" placeholder="State" />
            </div>
            <div class="col-md-4">
              <label for="zipCode" class="form-label">ZIP Code</label>
              <input id="zipCode" name="zipCode" type="text" formControlName="zipCode" required class="form-control" placeholder="ZIP" />
            </div>
          </div>
          <div *ngIf="errorMessage" class="text-danger text-center my-3">
            {{ errorMessage }}
          </div>
          <div class="d-grid mt-3">
            <button type="submit" [disabled]="registerForm.invalid || isLoading" class="btn btn-primary">
              <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.registerCustomer(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
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