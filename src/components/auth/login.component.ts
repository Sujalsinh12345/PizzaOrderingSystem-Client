// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { UserRole } from '../../models/models';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   template: `
//     <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
//       <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
//         <div class="text-center mb-4">
//           <div class="mx-auto mb-3" style="height: 48px; width: 48px; display: flex; align-items: center; justify-content: center;">
//             <span class="fs-1">🍕</span>
//           </div>
//           <h2 class="h4 fw-bold text-dark mb-2">Sign in to your account</h2>
//           <p class="text-secondary mb-0">
//             Or
//             <a routerLink="/register" class="fw-semibold text-primary text-decoration-none">create a new account</a>
//           </p>
//         </div>
//         <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
//           <div class="mb-3">
//             <label for="email" class="form-label">Email address</label>
//             <input id="email" name="email" type="email" formControlName="email" required class="form-control" placeholder="Email address" />
//           </div>
//           <div class="mb-3">
//             <label for="password" class="form-label">Password</label>
//             <input id="password" name="password" type="password" formControlName="password" required class="form-control" placeholder="Password" />
//           </div>
//           <div *ngIf="errorMessage" class="text-danger text-center mb-3">
//             {{ errorMessage }}
//           </div>
//           <div class="d-grid">
//             <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn btn-primary">
//               <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//               {{ isLoading ? 'Signing in...' : 'Sign in' }}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   `
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   isLoading = false;
//   errorMessage = '';

//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.loginForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]]
//     });
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       this.isLoading = true;
//       this.errorMessage = '';

//       this.authService.login(this.loginForm.value).subscribe({
//         next: (response) => {
//           this.isLoading = false;
//           if (response.success) {
//             // Redirect based on user role
//             switch (response.role) {
//               case UserRole.Admin:
//                 this.router.navigate(['/admin/dashboard']);
//                 break;
//               case UserRole.Employee:
//                 this.router.navigate(['/employee/dashboard']);
//                 break;
//               case UserRole.Customer:
//                 this.router.navigate(['/customer/dashboard']);
//                 break;
//               default:
//                 this.router.navigate(['/dashboard']);
//             }
//           } else {
//             this.errorMessage = response.message || 'Login failed';
//           }
//         },
//         error: (error) => {
//           this.isLoading = false;
//           this.errorMessage = 'Login failed. Please check your credentials.';
//           console.error('Login error:', error);
//         }
//       });
//     }
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
      <div class="card p-4 shadow-sm" style="max-width: 400px; width: 100%;">
        <div class="text-center mb-4">
          <div class="mx-auto mb-3" style="height: 48px; width: 48px; display: flex; align-items: center; justify-content: center;">
            <span class="fs-1">🍕</span>
          </div>
          <h2 class="h4 fw-bold text-dark mb-2">Sign in to your account</h2>
          <p class="text-secondary mb-0">
            Or
            <a routerLink="/register" class="fw-semibold text-primary text-decoration-none">create a new account</a>
          </p>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input id="email" name="email" type="email" formControlName="email" required class="form-control" placeholder="Email address" />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input id="password" name="password" type="password" formControlName="password" required class="form-control" placeholder="Password" />
          </div>
          <div class="mb-3">
            <label class="form-label">Select Role</label>
            <div>
              <label>
                <input type="radio" formControlName="role" value="Admin" required />
                Admin
                <br/>
              </label>
              &nbsp;
              <label>
                <input type="radio" formControlName="role" value="Employee" required />
                Employee
              </label>
              &nbsp;
              <label>
                <input type="radio" formControlName="role" value="Customer" required />
                Customer
              </label>
            </div>
          </div>
          <div *ngIf="errorMessage" class="text-danger text-center mb-3">
            {{ errorMessage }}
          </div>
          <div class="d-grid">
            <button type="submit" [disabled]="loginForm.invalid || isLoading" class="btn btn-primary">
              <span *ngIf="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
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
      role: ['', [Validators.required]]  // Add role control
    });
  }
  

  // onSubmit(): void {
  //   if (this.loginForm.valid) {
  //     this.isLoading = true;
  //     this.errorMessage = '';

  //     // Include the selected role in the login request
  //     const loginData = {
  //       ...this.loginForm.value,
  //       role: this.loginForm.value.role
  //     };

  //     console.log('Login data:', loginData);

  //     this.authService.login(loginData).subscribe({
  //       next: (response) => {
         
  //         this.isLoading = false;
  //         if (response.success) {
  //           console.log('Login successful:', response);
  //           // Redirect based on user role
  //           switch (response.role) {
  //             case UserRole.Admin:
  //               this.router.navigate(['/admin/dashboard']);
  //               break;
  //             case UserRole.Employee:
  //               this.router.navigate(['/employee/dashboard']);
  //               break;
  //             case UserRole.Customer:
  //               this.router.navigate(['/customer/dashboard']);
  //               break;
  //             default:
  //               this.router.navigate(['/dashboard']);
  //           }
  //         } else {
  //           this.errorMessage = response.message || 'Login failed';
  //         }
  //       },
  //       error: (error) => {
  //         this.isLoading = false;
  //         this.errorMessage = 'Login failed. Please check your credentials.';
  //         console.error('Login error:', error);
  //       }
  //     });
  //   }
  // }
     onSubmit(): void {
      if (this.loginForm.valid) {
      this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login response:', response);
        
        if (response.success) {
          console.log('Login successful:', response);
          this.router.navigate(['/customer/dashboard']);
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
