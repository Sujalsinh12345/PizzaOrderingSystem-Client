import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserRole, Customer, Employee, Admin } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'https://localhost:7000/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  private userRoleSubject = new BehaviorSubject<UserRole | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (token && user && role) {
      this.currentUserSubject.next(JSON.parse(user));
      this.userRoleSubject.next(role as UserRole);
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('role', response.role);
            this.currentUserSubject.next(response.user);
            this.userRoleSubject.next(response.role);
          }
        })
      );
  }

  registerCustomer(customer: Customer): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/register/customer`, customer)
      .pipe(
        tap(response => {
          if (response.success && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('role', UserRole.Customer);
            this.currentUserSubject.next(response.user);
            this.userRoleSubject.next(UserRole.Customer);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.currentUserSubject.next(null);
    this.userRoleSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getUserRole(): UserRole | null {
    return this.userRoleSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUserRole() === UserRole.Admin;
  }

  isEmployee(): boolean {
    return this.getUserRole() === UserRole.Employee;
  }

  isCustomer(): boolean {
    return this.getUserRole() === UserRole.Customer;
  }
}