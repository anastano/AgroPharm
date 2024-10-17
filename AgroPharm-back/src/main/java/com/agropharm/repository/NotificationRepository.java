package com.agropharm.repository;

import com.agropharm.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(Integer userId);

}
