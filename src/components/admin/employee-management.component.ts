import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/models';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold text-dark">Employee Management</h1>
          <p class="text-secondary">Manage your team members and staff</p>
        </div>
        <button (click)="showCreateForm = !showCreateForm" class="btn btn-primary">
          {{ showCreateForm ? 'Cancel' : 'Add Employee' }}
        </button>
      </div>
      <!-- Create/Edit Form -->
      <div *ngIf="showCreateForm || editingEmployee" class="card mb-4">
        <div class="card-body">
          <h3 class="h5 fw-semibold text-dark mb-3">
            {{ editingEmployee ? 'Edit Employee' : 'Add New Employee' }}
          </h3>
          <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
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
              <!-- Removed position and salary fields -->
            </div>
            <div class="d-flex gap-2 mt-3">
              <button type="submit" [disabled]="employeeForm.invalid" class="btn btn-primary">
                {{ editingEmployee ? 'Update Employee' : 'Create Employee' }}
              </button>
              <button type="button" (click)="cancelForm()" class="btn btn-outline-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- Employee List -->
      <div class="card">
        <div class="table-responsive">
          <table class="table table-striped align-middle">
            <thead class="table-light">
              <tr>
                <th>Employee</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let employee of employees">
                <td>
                  <div class="fw-semibold text-dark">{{ employee.firstName }} {{ employee.lastName }}</div>
                  <div class="text-muted small">ID: {{ employee.employeeId || employee.id }}</div>
                </td>
                <td>
                  <div class="text-dark">{{ employee.email }}</div>
                  <div class="text-muted small">{{ employee.phoneNumber }}</div>
                </td>
                <td>
                  <button (click)="editEmployee(employee)" class="btn btn-link text-primary p-0 me-2">Edit</button>
                  <button (click)="deleteEmployee(employee)" class="btn btn-link text-danger p-0">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class EmployeeManagementComponent implements OnInit {
  employees: Employee[] = [];
  employeeForm: FormGroup;
  showCreateForm = false;
  editingEmployee: Employee | null = null;
  loading = true;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]]
      // Removed position and salary
    });
  }

  ngOnInit(): void {
    console.log('EmployeeManagementComponent initialized');
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Full employee API response:', response);
        let arr: Employee[] = [];
        if (Array.isArray(response)) {
          arr = response;
        } else if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          arr = response.data;
        } else if (response.employees && Array.isArray(response.employees) && response.employees.length > 0) {
          arr = response.employees;
        } else if (response.emp && Array.isArray(response.emp) && response.emp.length > 0) {
          arr = response.emp;
        } else if (response.ord && Array.isArray(response.ord) && response.ord.length > 0) {
          arr = response.ord;
        }
        this.employees = arr.map(e => ({
          ...e,
          firstName: e.firstName || e.fname || '',
          lastName: e.lastName || e.lname || '',
          phoneNumber: e.phoneNumber || e.phoneNo || ''
        }));
        console.log('Loaded employees:', this.employees);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading employees:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      
      if (this.editingEmployee) {
        const id = this.editingEmployee.employeeId || this.editingEmployee.id;
        this.employeeService.updateEmployee(id!, employeeData).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadEmployees();
              this.cancelForm();
            }
          },
          error: (error) => {
            console.error('Error updating employee:', error);
          }
        });
      } else {
        this.employeeService.createEmployee(employeeData).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadEmployees();
              this.cancelForm();
            }
          },
          error: (error) => {
            console.error('Error creating employee:', error);
          }
        });
      }
    }
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = employee;
    this.showCreateForm = false;
    this.employeeForm.patchValue({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber
    });
  }

  deleteEmployee(employee: Employee): void {
    const id = employee.employeeId || employee.id;
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      if (id) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadEmployees();
            }
          },
          error: (error) => {
            console.error('Error deleting employee:', error);
          }
        });
      }
    }
  }

  cancelForm(): void {
    this.showCreateForm = false;
    this.editingEmployee = null;
    this.employeeForm.reset();
  }
}