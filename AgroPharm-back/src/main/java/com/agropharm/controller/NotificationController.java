package com.agropharm.controller;

import com.agropharm.domain.Notification;
import com.agropharm.domain.User;
import com.agropharm.service.NotificationService;
import com.agropharm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "api/notifications")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public ResponseEntity<List<Notification>> getUserNotifications(Principal principal) {
        User user = userService.getByEmail(principal.getName());
        List<Notification> notifications = notificationService.getNotificationsForUser(user.getEmail());
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    @PutMapping("/read/{notificationId}")
    public ResponseEntity<String> markNotificationAsRead(@PathVariable Integer notificationId) {
        notificationService.markAsRead(notificationId);
        return new ResponseEntity<>("{\"message\": \"Notification marked as read\"}", HttpStatus.OK);
    }

}
