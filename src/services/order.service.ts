import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order, OrderStatus, ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private endpoint = 'orders';

  constructor(private apiService: ApiService) { }

  getAllOrders(): Observable<ApiResponse<Order[]>> {
    return this.apiService.get<Order>(this.endpoint);
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.apiService.getById<Order>(this.endpoint, id);
  }

  createOrder(order: Order): Observable<ApiResponse<Order>> {
    return this.apiService.post<Order>(this.endpoint, order);
  }

  updateOrder(id: number, order: Order): Observable<ApiResponse<Order>> {
    return this.apiService.put<Order>(this.endpoint, id, order);
  }

  deleteOrder(id: number): Observable<ApiResponse<Order>> {
    return this.apiService.delete<Order>(this.endpoint, id);
  }

  updateOrderStatus(id: number, status: OrderStatus): Observable<ApiResponse<Order>> {
    return this.apiService.put<Order>(`${this.endpoint}/status`, id, { status });
  }

  getCustomerOrders(customerId: number): Observable<ApiResponse<Order[]>> {
    return this.apiService.get<Order>(`${this.endpoint}/customer/${customerId}`);
  }

  getEmployeeOrders(employeeId: number): Observable<ApiResponse<Order[]>> {
    return this.apiService.get<Order>(`${this.endpoint}/employee/${employeeId}`);
  }
}