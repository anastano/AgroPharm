package com.agropharm.service;

import com.agropharm.domain.Address;
import com.agropharm.domain.Admin;
import com.agropharm.domain.Client;
import com.agropharm.dto.RegistrationDTO;
import com.agropharm.repository.AddressRepository;
import com.agropharm.repository.AdminRepository;
import com.agropharm.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private RoleRepository roleRepository;

    public Admin create(RegistrationDTO registrationDTO) {
        Admin admin = new Admin();
        admin.setFirstName(registrationDTO.firstName);
        admin.setLastName(registrationDTO.lastName);
        admin.setEmail(registrationDTO.email);
        admin.setPhoneNumber(registrationDTO.phoneNumber);
        admin.setPassword(registrationDTO.password);
        admin.setSenior(registrationDTO.isSenior);

        Address address = new Address();
        address.setStreet(registrationDTO.street);
        address.setStreetNumber(registrationDTO.streetNumber);
        address.setCity(registrationDTO.city);
        address.setCountry(registrationDTO.country);
        address.setPostalCode(registrationDTO.postalCode);
        addressRepository.save(address);

        admin.setAddress(address);
        admin.setLastPasswordResetDate(new Timestamp(new Date().getTime()));
        admin.setRole(roleRepository.findByName("ADMIN"));
        return adminRepository.save(admin);
    }
}
