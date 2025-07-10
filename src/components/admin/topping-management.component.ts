import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToppingService } from '../../services/topping.service';
import { Topping } from '../../models/models';

@Component({
  selector: 'app-topping-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold text-dark">Topping Management</h1>
          <p class="text-secondary">Manage pizza toppings and their pricing</p>
        </div>
        <button (click)="showCreateForm = !showCreateForm" class="btn btn-primary">
          {{ showCreateForm ? 'Cancel' : 'Add Topping' }}
        </button>
      </div>
      <!-- Create/Edit Form -->
      <div *ngIf="showCreateForm || editingTopping" class="card mb-4">
        <div class="card-body">
          <h3 class="h5 fw-semibold text-dark mb-3">
            {{ editingTopping ? 'Edit Topping' : 'Add New Topping' }}
          </h3>
          <form [formGroup]="toppingForm" (ngSubmit)="onSubmit()">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="name" class="form-label">Topping Name</label>
                <input type="text" id="name" formControlName="name" class="form-control" placeholder="e.g., Pepperoni">
              </div>
              <div class="col-md-6">
                <label for="price" class="form-label">Price ($)</label>
                <input type="number" id="price" formControlName="price" min="0" step="0.01" class="form-control" placeholder="0.00">
              </div>
              <div class="col-12">
                <label for="description" class="form-label">Description</label>
                <textarea id="description" formControlName="description" rows="3" class="form-control" placeholder="Brief description of the topping"></textarea>
              </div>
              <div class="col-12">
                <label for="imageUrl" class="form-label">Image URL</label>
                <input type="url" id="imageUrl" formControlName="imageUrl" class="form-control" placeholder="https://example.com/image.jpg">
              </div>
              <div class="col-12">
                <!-- Removed available checkbox from form -->
              </div>
            </div>
            <div class="d-flex gap-2 mt-3">
              <button type="submit" [disabled]="toppingForm.invalid" class="btn btn-primary">
                {{ editingTopping ? 'Update Topping' : 'Create Topping' }}
              </button>
              <button type="button" (click)="cancelForm()" class="btn btn-outline-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- Topping Grid -->
      <div class="row g-4">
        <div *ngFor="let topping of toppings" class="col-12 col-md-6 col-lg-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h3 class="h5 fw-semibold text-dark mb-1">{{ topping.toppingName }}</h3>
                  <div class="mb-1">ID: {{ topping.toppingId }}</div>
                  <div class="mb-1">Small: ₹{{ topping.smallPrice }}</div>
                  <div class="mb-1">Medium: ₹{{ topping.mediumPrice }}</div>
                  <div class="mb-1">Large: ₹{{ topping.largePrice }}</div>
                  <div class="mb-1" *ngIf="topping.description">Description: {{ topping.description }}</div>
                  <div class="mb-1" *ngIf="topping.imageUrl">Image: <a [href]="topping.imageUrl" target="_blank">View</a></div>
                  <!-- Removed Available field -->
                </div>
              </div>
              <div class="d-flex gap-2">
                <button (click)="editTopping(topping)" class="btn btn-outline-primary flex-fill">Edit</button>
                <button (click)="deleteTopping(topping)" class="btn btn-outline-danger flex-fill">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div *ngIf="toppings.length === 0" class="text-center py-5">
        <div class="text-muted display-1 mb-3">🧄</div>
        <h3 class="h5 fw-semibold text-dark mb-2">No toppings available</h3>
        <p class="text-secondary">Add some delicious toppings to get started!</p>
      </div>
    </div>
  `
})
export class ToppingManagementComponent implements OnInit {
  toppings: Topping[] = [];
  toppingForm: FormGroup;
  showCreateForm = false;
  editingTopping: Topping | null = null;
  loading = true;

  constructor(
    private toppingService: ToppingService,
    private formBuilder: FormBuilder
  ) {
    this.toppingForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: ['']
      // Removed isAvailable
    });
  }

  ngOnInit(): void {
    console.log('ToppingManagementComponent initialized');
    this.loadToppings();
  }

  loadToppings(): void {
    this.loading = true;
    this.toppingService.getAllToppings().subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Full topping API response:', response);
        let arr: Topping[] = [];
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          arr = response.data;
        } else if (response.toppings && Array.isArray(response.toppings) && response.toppings.length > 0) {
          arr = response.toppings;
        } else if (response.top && Array.isArray(response.top) && response.top.length > 0) {
          arr = response.top;
        } else if (response.ord && Array.isArray(response.ord) && response.ord.length > 0) {
          arr = response.ord;
        }
        this.toppings = arr;
        console.log('Loaded toppings:', this.toppings);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading toppings:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.toppingForm.valid) {
      const toppingData = this.toppingForm.value;
      
      if (this.editingTopping) {
        this.toppingService.updateTopping(this.editingTopping.id!, toppingData).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadToppings();
              this.cancelForm();
            }
          },
          error: (error) => {
            console.error('Error updating topping:', error);
          }
        });
      } else {
        this.toppingService.createTopping(toppingData).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadToppings();
              this.cancelForm();
            }
          },
          error: (error) => {
            console.error('Error creating topping:', error);
          }
        });
      }
    }
  }

  editTopping(topping: Topping): void {
    this.editingTopping = topping;
    this.showCreateForm = false;
    this.toppingForm.patchValue(topping);
  }

  deleteTopping(topping: Topping): void {
    if (confirm(`Are you sure you want to delete ${topping.name}?`)) {
      if (topping.id) {
        this.toppingService.deleteTopping(topping.id).subscribe({
          next: (response) => {
            if (response.success) {
              this.loadToppings();
            }
          },
          error: (error) => {
            console.error('Error deleting topping:', error);
          }
        });
      }
    }
  }

  cancelForm(): void {
    this.showCreateForm = false;
    this.editingTopping = null;
    this.toppingForm.reset();
  }
}