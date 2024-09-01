package com.agropharm.controller;

import com.agropharm.domain.User;
import com.agropharm.dto.UserDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(value = "api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/current-user")
    public ResponseEntity<UserDTO> getCurretUser(Principal current){
        User user = userService.getByEmail(current.getName());
        UserDTO userDTO = (UserDTO) new DTOUtils().convertToDto(user, new UserDTO());
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

}
