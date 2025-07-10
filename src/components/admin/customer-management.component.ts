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
        <!-- Removed Add Customer button -->
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
              <!-- Removed state and zip code fields -->
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
                <!-- Removed Actions column -->
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let customer of customers">
                <td>
                  <div class="fw-semibold text-dark">{{ customer.firstName }} {{ customer.lastName }}</div>
                  <div class="text-muted small">ID: {{ customer.customerId }}</div>
                </td>
                <td>
                  <div class="text-dark">{{ customer.email }}</div>
                  <div class="text-muted small">{{ customer.phoneNumber }}</div>
                </td>
                <td>
                  <div class="text-dark">{{ customer.address }}</div>
                </td>
                <!-- Removed Actions buttons -->
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
      city: ['', [Validators.required]]
      // Removed state and zipCode
    });
  }

  ngOnInit(): void {
    console.log('CustomerManagementComponent initialized');
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Full customer API response:', response);
        let arr: Customer[] = [];
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          arr = response.data;
        } else if (response.customers && Array.isArray(response.customers) && response.customers.length > 0) {
          arr = response.customers;
        } else if (response.cust && Array.isArray(response.cust) && response.cust.length > 0) {
          arr = response.cust;
        } else if (response.ord && Array.isArray(response.ord) && response.ord.length > 0) {
          arr = response.ord;
        }
        this.customers = arr.map(c => ({
          ...c,
          firstName: c.firstName || c.fname || '',
          lastName: c.lastName || c.lname || '',
          phoneNumber: c.phoneNumber || c.phoneNo || ''
        }));
        console.log('Loaded customers:', this.customers);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading customers:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      // Map form fields to backend fields
      const formValue = this.customerForm.value;
      const customerData = {
        fname: formValue.firstName,
        lname: formValue.lastName,
        email: formValue.email,
        phoneNo: formValue.phoneNumber,
        address: formValue.address,
        city: formValue.city
      };
      if (this.editingCustomer) {
        const id = this.editingCustomer.customerId || this.editingCustomer.id;
        console.log('Updating customer:', id, customerData);
        this.customerService.updateCustomer(id!, customerData as any).subscribe({
          next: (response) => {
            console.log('Update response:', response);
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
        console.log('Creating customer:', customerData);
        this.customerService.createCustomer(customerData as any).subscribe({
          next: (response) => {
            console.log('Create response:', response);
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
    this.customerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
      city: customer.city
    });
  }

  deleteCustomer(customer: Customer): void {
    console.log('Customer to delete:', customer);
    const id = customer.customerId || customer.id;
    const displayName = (customer.firstName || customer['fname'] || 'Unknown') + ' ' + (customer.lastName || customer['lname'] || 'Unknown');
    if (confirm(`Are you sure you want to delete ${displayName}?`)) {
      if (id) {
        console.log('Deleting customer:', id);
        this.customerService.deleteCustomer(id).subscribe({
          next: (response) => {
            console.log('Delete response:', response);
            if (response.success) {
              this.loadCustomers();
            }
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
            if (error.status === 405) {
              alert('Delete operation is not allowed for this customer. Please check backend permissions or implementation.');
            } else {
              alert('An error occurred while deleting the customer.');
            }
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