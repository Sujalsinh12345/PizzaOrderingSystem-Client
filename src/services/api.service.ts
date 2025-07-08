import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'https://localhost:7167/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
  }

  get<T>(endpoint: string): Observable<ApiResponse<T[]>> {
    return this.http.get<ApiResponse<T[]>>(`${this.API_URL}/${endpoint}`, {
      headers: this.getHeaders()
    });
  }

  getById<T>(endpoint: string, id: number): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.API_URL}/${endpoint}/${id}`, {
      headers: this.getHeaders()
    });
  }

  post<T>(endpoint: string, data: any): Observable<ApiResponse<T>> {
    return this.http.post<ApiResponse<T>>(`${this.API_URL}/${endpoint}`, data, {
      headers: this.getHeaders()
    });
  }

  put<T>(endpoint: string, id: number, data: any): Observable<ApiResponse<T>> {
    return this.http.put<ApiResponse<T>>(`${this.API_URL}/${endpoint}/${id}`, data, {
      headers: this.getHeaders()
    });
  }

  delete<T>(endpoint: string, id: number): Observable<ApiResponse<T>> {
    return this.http.delete<ApiResponse<T>>(`${this.API_URL}/${endpoint}/${id}`, {
      headers: this.getHeaders()
    });
  }
}