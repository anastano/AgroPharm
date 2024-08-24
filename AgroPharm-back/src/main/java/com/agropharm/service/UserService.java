package com.agropharm.service;

import com.agropharm.domain.User;
import com.agropharm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getByEmail(String email){
        return this.userRepository.findByEmail(email);
    }
}
