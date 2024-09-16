import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Notification } from './model/notifications.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getUserNotifications(): Observable<Notification[]>{
    return this.http.get<Notification[]>(environment.apiHost + 'notifications/user');
  } 
  
  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(environment.apiHost + `notifications/read/${notificationId}`, {});
  }

}
