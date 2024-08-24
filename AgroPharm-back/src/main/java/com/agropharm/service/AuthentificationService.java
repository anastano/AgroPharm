package com.agropharm.service;

import com.agropharm.domain.User;
import com.agropharm.dto.LoginDTO;
import com.agropharm.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class AuthentificationService {

    @Autowired
    private UserRepository userRepository;

    public String getSaltedPassword(LoginDTO loginDTO){
        return loginDTO.getPassword() + this.userRepository.findByEmail(loginDTO.getEmail()).getId().toString();
    }
    //TODO: neki drugi salt koristi
}
