import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Pizza, ApiResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private endpoint = 'Pizzas';

  constructor(private apiService: ApiService) { }

  getAllPizzas(): Observable<ApiResponse<Pizza[]>> {
    return this.apiService.get<Pizza>(this.endpoint);
  }

  getPizzaById(id: number): Observable<ApiResponse<Pizza>> {
    return this.apiService.getById<Pizza>(this.endpoint, id);
  }

  createPizza(pizza: Pizza): Observable<ApiResponse<Pizza>> {
    return this.apiService.post<Pizza>(this.endpoint, pizza);
  }

  updatePizza(id: number, pizza: Pizza): Observable<ApiResponse<Pizza>> {
    return this.apiService.put<Pizza>(this.endpoint, id, pizza);
  }

  deletePizza(id: number): Observable<ApiResponse<Pizza>> {
    return this.apiService.delete<Pizza>(this.endpoint, id);
  }

  getAvailablePizzas(): Observable<ApiResponse<Pizza[]>> {
    return this.apiService.get<Pizza>(`${this.endpoint}/available`);
  }
}