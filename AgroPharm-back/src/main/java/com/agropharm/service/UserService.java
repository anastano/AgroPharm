package com.agropharm.service;

import com.agropharm.domain.*;
import com.agropharm.dto.RegistrationDTO;
import com.agropharm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private DelivererRepository delivererRepository;
    @Autowired
    private AddressRepository addressRepository;

    public User getByEmail(String email){
        return this.userRepository.findByEmail(email);
    }

    public void awardPenaltyPoints(Integer userId) throws Exception {
        Optional<Client> clientDB = clientRepository.findById(userId);
        if (!clientDB.isPresent()) {
            throw new Exception("Client not found");
        }
        Client client = clientDB.get();
        client.setPenaltyPoints(5);
        clientRepository.save(client);
    }

    public User save(User user){
        return userRepository.save(user);
    }

    public User createUser(RegistrationDTO userDTO) {
        User user;
        String userType = userDTO.userType;
        switch (userType) {
            case "admin":
                user = new Admin();
                ((Admin) user).setSenior(userDTO.isSenior);
                break;
            case "seller":
                user = new Seller();
                ((Seller) user).setEnabled(true);
                break;
            case "deliverer":
                user = new Deliverer();
                ((Deliverer) user).setEnabled(true);
                break;
            case "client":
                user = new Client();
                ((Client) user).setPenaltyPoints(0);
                ((Client) user).setEnabled(true);
                break;
            default:
                throw new IllegalArgumentException("Invalid user type");
        }

        user.setEmail(userDTO.email);
        user.setFirstName(userDTO.firstName);
        user.setLastName(userDTO.lastName);
        user.setPhoneNumber(userDTO.phoneNumber);

        Address address = new Address();
        address.setStreet(userDTO.street);
        address.setStreetNumber(userDTO.streetNumber);
        address.setCity(userDTO.city);
        address.setCountry(userDTO.country);
        address.setPostalCode(userDTO.postalCode);

        user.setAddress(address);

        user.setPassword(userDTO.password);

        userRepository.save(user);

        if (user instanceof Admin) {
            adminRepository.save((Admin) user);
        } else if (user instanceof Seller) {
            sellerRepository.save((Seller) user);
        } else if (user instanceof Deliverer) {
            delivererRepository.save((Deliverer) user);
        } else if (user instanceof Client) {
            clientRepository.save((Client) user);
        }

        return user;
    }
    
}
