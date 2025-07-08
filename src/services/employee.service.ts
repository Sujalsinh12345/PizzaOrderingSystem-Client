import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Employee, ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private endpoint = 'employees';

  constructor(private apiService: ApiService) { }

  getAllEmployees(): Observable<ApiResponse<Employee[]>> {
    return this.apiService.get<Employee>(this.endpoint);
  }

  getEmployeeById(id: number): Observable<ApiResponse<Employee>> {
    return this.apiService.getById<Employee>(this.endpoint, id);
  }

  createEmployee(employee: Employee): Observable<ApiResponse<Employee>> {
    return this.apiService.post<Employee>(this.endpoint, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<ApiResponse<Employee>> {
    return this.apiService.put<Employee>(this.endpoint, id, employee);
  }

  deleteEmployee(id: number): Observable<ApiResponse<Employee>> {
    return this.apiService.delete<Employee>(this.endpoint, id);
  }
}