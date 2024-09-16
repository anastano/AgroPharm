import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Notification } from '../model/notifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationService.getUserNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      this.notifications = this.notifications.map(notification =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification
      );
    });
  }
}
