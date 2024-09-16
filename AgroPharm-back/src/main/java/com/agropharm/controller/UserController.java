package com.agropharm.controller;

import com.agropharm.domain.User;
import com.agropharm.dto.ProductDTO;
import com.agropharm.dto.RegistrationDTO;
import com.agropharm.dto.UserDTO;
import com.agropharm.mapper.DTOUtils;
import com.agropharm.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Set;

@RestController
@RequestMapping(value = "api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private SellerService sellerService;
    @Autowired
    private DelivererService delivererService;
    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    public ResponseEntity<Set<UserDTO>> getAll() {
        Set<UserDTO> usetDTOS = (Set<UserDTO>) new DTOUtils().convertToDtos(userService.getAll(), new UserDTO());
        return new ResponseEntity<>(usetDTOS, HttpStatus.OK);
    }

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

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationDTO registrationDTO) {
        switch (registrationDTO.userType.toLowerCase()) {
            case "admin":
                adminService.create(registrationDTO);
                break;
            case "seller":
                sellerService.create(registrationDTO);
                break;
            case "deliverer":
                delivererService.create(registrationDTO);
                break;
            case "client":
                clientService.create(registrationDTO);
                break;
            default:
                return ResponseEntity.badRequest().body("Invalid user type");
        }
        return new ResponseEntity<>("User successfully registered", HttpStatus.OK);
    }

}
