package com.agropharm.service;

import com.agropharm.domain.Notification;
import com.agropharm.domain.User;
import com.agropharm.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserService userService;

    public Notification createNotification(String title, String content, String userEmail) {
        User user = userService.getByEmail(userEmail);
        Notification notification = new Notification();
        notification.setTitle(title);
        notification.setContent(content);
        notification.setUser(user);
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsForUser(String userEmail) {
        User user = userService.getByEmail(userEmail);
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public void markAsRead(Integer notificationId) {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow();
        notification.setRead(true);
        notificationRepository.save(notification);
    }
}
