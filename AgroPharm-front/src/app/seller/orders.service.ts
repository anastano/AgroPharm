import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Order } from './model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.apiHost + `orders/all`);
  }

  approveOrder(orderId: number): Observable<any> {
    return this.http.post(environment.apiHost + `orders/approve/${orderId}`, {});
  }

}
