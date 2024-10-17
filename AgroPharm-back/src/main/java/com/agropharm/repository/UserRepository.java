package com.agropharm.repository;

import com.agropharm.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
    List<User> findByRoleName(String roleName);

}
