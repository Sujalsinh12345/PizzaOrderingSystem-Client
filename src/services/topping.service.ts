import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Topping, ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ToppingService {
  private endpoint = 'toppings';

  constructor(private apiService: ApiService) { }

  getAllToppings(): Observable<ApiResponse<Topping[]>> {
    return this.apiService.get<Topping>(this.endpoint);
  }

  getToppingById(id: number): Observable<ApiResponse<Topping>> {
    return this.apiService.getById<Topping>(this.endpoint, id);
  }

  createTopping(topping: Topping): Observable<ApiResponse<Topping>> {
    return this.apiService.post<Topping>(this.endpoint, topping);
  }

  updateTopping(id: number, topping: Topping): Observable<ApiResponse<Topping>> {
    return this.apiService.put<Topping>(this.endpoint, id, topping);
  }

  deleteTopping(id: number): Observable<ApiResponse<Topping>> {
    return this.apiService.delete<Topping>(this.endpoint, id);
  }

  getAvailableToppings(): Observable<ApiResponse<Topping[]>> {
    return this.apiService.get<Topping>(`${this.endpoint}/available`);
  }
}