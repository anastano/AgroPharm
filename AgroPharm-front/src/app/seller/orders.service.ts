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

  rejectOrder(orderId: number): Observable<any> {
    return this.http.post(environment.apiHost + `orders/reject/${orderId}`, {});
  }

  cancelOrder(orderId: number): Observable<any> {
    return this.http.post(environment.apiHost + `orders/cancel/${orderId}`, {});
  }

  colectOrderForDelivery(orderId: number): Observable<any> {
    return this.http.post(environment.apiHost + `orders/collect-for-delivery/${orderId}`, {});
  }

  markOrderCompletedSuccessfully(orderId: number): Observable<any> {
    return this.http.post(environment.apiHost + `orders/completed-success/${orderId}`, {});
  }

  markOrderCompletedUnsuccessfully(orderId: number): Observable<any> {
    return this.http.post(environment.apiHost + `orders/completed-notsuccess/${orderId}`, {});
  }

  getClientsOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(environment.apiHost + `orders/by-client`);
  }

  createOrder(orderRequest: any): Observable<any> {
    return this.http.post(environment.apiHost + `orders/create`, orderRequest);
  }

}
