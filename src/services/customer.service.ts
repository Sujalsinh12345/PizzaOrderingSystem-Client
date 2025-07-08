import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Customer, ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private endpoint = 'customers';

  constructor(private apiService: ApiService) { }

  getAllCustomers(): Observable<ApiResponse<Customer[]>> {
    return this.apiService.get<Customer>(this.endpoint);
  }

  getCustomerById(id: number): Observable<ApiResponse<Customer>> {
    return this.apiService.getById<Customer>(this.endpoint, id);
  }

  createCustomer(customer: Customer): Observable<ApiResponse<Customer>> {
    return this.apiService.post<Customer>(this.endpoint, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<ApiResponse<Customer>> {
    return this.apiService.put<Customer>(this.endpoint, id, customer);
  }

  deleteCustomer(id: number): Observable<ApiResponse<Customer>> {
    return this.apiService.delete<Customer>(this.endpoint, id);
  }
}