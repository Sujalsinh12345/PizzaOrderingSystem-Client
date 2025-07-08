import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Admin, ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private endpoint = 'admins';

  constructor(private apiService: ApiService) { }

  getAllAdmins(): Observable<ApiResponse<Admin[]>> {
    return this.apiService.get<Admin>(this.endpoint);
  }

  getAdminById(id: number): Observable<ApiResponse<Admin>> {
    return this.apiService.getById<Admin>(this.endpoint, id);
  }

  createAdmin(admin: Admin): Observable<ApiResponse<Admin>> {
    return this.apiService.post<Admin>(this.endpoint, admin);
  }

  updateAdmin(id: number, admin: Admin): Observable<ApiResponse<Admin>> {
    return this.apiService.put<Admin>(this.endpoint, id, admin);
  }

  deleteAdmin(id: number): Observable<ApiResponse<Admin>> {
    return this.apiService.delete<Admin>(this.endpoint, id);
  }
}