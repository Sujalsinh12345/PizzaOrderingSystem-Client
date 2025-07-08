import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5 px-3">
      <div class="card p-4 text-center mx-auto" style="max-width: 400px;">
        <div>
          <div class="display-1 text-danger mb-3">🚫</div>
          <h2 class="h3 fw-bold text-dark mb-2">Access Denied</h2>
          <p class="text-secondary mb-4">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          <div class="d-grid gap-3">
            <button routerLink="/dashboard" class="btn btn-primary w-100">
              Go to Dashboard
            </button>
            <button routerLink="/" class="btn btn-outline-primary w-100">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent { }