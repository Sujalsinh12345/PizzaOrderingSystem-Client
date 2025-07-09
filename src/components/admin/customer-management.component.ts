import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/models';

@Component({
  selector: 'app-customer-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold text-dark">Customer Management</h1>
          <p class="text-secondary">Manage and view all registered customers</p>
        </div>
        <button (click)="showCreateForm = !showCreateForm" class="btn btn-primary">
          {{ showCreateForm ? 'Cancel' : 'Add Customer' }}
        </button>
      </div>
      <!-- Create/Edit Form -->
      <div *ngIf="showCreateForm || editingCustomer" class="card mb-4">
        <div class="card-body">
          <h3 class="h5 fw-semibold text-dark mb-3">
            {{ editingCustomer ? 'Edit Customer' : 'Add New Customer' }}
          </h3>
          <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" id="firstName" formControlName="firstName" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" id="lastName" formControlName="lastName" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="email" class="form-label">Email</label>
                <input type="email" id="email" formControlName="email" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="phoneNumber" class="form-label">Phone Number</label>
                <input type="tel" id="phoneNumber" formControlName="phoneNumber" class="form-control">
              </div>
              <div class="col-12">
                <label for="address" class="form-label">Address</label>
                <input type="text" id="address" formControlName="address" class="form-control">
              </div>
              <div class="col-md-4">
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" formControlName="city" class="form-control">
              </div>
              <div class="col-md-4">
                <label for="state" class="form-label">State</label>
                <input type="text" id="state" formControlName="state" class="form-control">
              </div>
              <div class="col-md-4">
                <label for="zipCode" class="form-label">ZIP Code</label>
                <input type="text" id="zipCode" formControlName="zipCode" class="form-control">
              </div>
            </div>
            <div class="d-flex gap-2 mt-3">
              <button type="submit" [disabled]="customerForm.invalid" class="btn btn-primary">
                {{ editingCustomer ? 'Update Customer' : 'Create Customer' }}
              </button>
              <button type="button" (click)="cancelForm()" class="btn btn-outline-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- Customer List -->
      <div class="card">
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead class="table-light">
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let customer of customers">
                <td>
                  <div class="fw-semibold text-dark">{{ customer.firstName }} {{ customer.lastName }}</div>
                  <div class="text-muted small">ID: {{ customer.id }}</div>
                </td>
                <td>
                  <div class="text-dark">{{ customer.email }}</div>
                  <div class="text-muted small">{{ customer.phoneNumber }}</div>
                </td>
                <td>
                  <div class="text-dark">{{ customer.address }}</div>
                  <!-- <div class="text-muted small">{{ customer.city }}, {{ customer.state }} {{ customer.zipCode }}</div> -->
                </td>
                <!-- <td>
                  <span class="badge" [ngClass]="customer.isActive ? 'bg-success' : 'bg-danger'">
                    {{ customer.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td> -->
                <td>
                  <button (click)="editCustomer(customer)" class="btn btn-link text-primary p-0 me-2">Edit</button>
                  <button (click)="deleteCustomer(customer)" class="btn btn-link text-danger p-0">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class CustomerManagementComponent implements OnInit {
  customers: Customer[] = [];
  customerForm: FormGroup;
  showCreateForm = false;
  editingCustomer: Customer | null = null;
  loading = true;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {
    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          this.customers = response.data;
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading customers:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      
      if (this.editingCustomer) {
        this.customerService.updateCustomer(this.editingCustomer.id!, customerData).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadCustomers();
              this.cancelForm();
            }
          },
          error: (error) => {
            console.error('Error updating customer:', error);
          }
        });
      } else {
        this.customerService.createCustomer(customerData).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadCustomers();
              this.cancelForm();
            }
          },
          error: (error) => {
            console.error('Error creating customer:', error);
          }
        });
      }
    }
  }

  editCustomer(customer: Customer): void {
    this.editingCustomer = customer;
    this.showCreateForm = false;
    this.customerForm.patchValue(customer);
  }

  deleteCustomer(customer: Customer): void {
    if (confirm(`Are you sure you want to delete ${customer.firstName} ${customer.lastName}?`)) {
      if (customer.id) {
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadCustomers();
            }
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
          }
        });
      }
    }
  }

  cancelForm(): void {
    this.showCreateForm = false;
    this.editingCustomer = null;
    this.customerForm.reset();
  }
}