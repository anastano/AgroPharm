package com.agropharm.controller;

import com.agropharm.domain.User;
import com.agropharm.dto.UserDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO userDTO, Principal principal) {
        User user = userService.getByEmail(principal.getName());

        user.setFirstName(userDTO.firstName);
        user.setLastName(userDTO.lastName);
        user.setPhoneNumber(userDTO.phoneNumber);

        user.getAddress().setStreet(userDTO.address.street);
        user.getAddress().setStreetNumber(userDTO.address.streetNumber);
        user.getAddress().setCity(userDTO.address.city);
        user.getAddress().setCountry(userDTO.address.country);
        user.getAddress().setPostalCode(userDTO.address.postalCode);

        User updatedUser = userService.save(user);
        UserDTO updatedUserDTO = (UserDTO) new DTOUtils().convertToDto(updatedUser, new UserDTO());
        return new ResponseEntity<>(updatedUserDTO, HttpStatus.OK);
    }


}
