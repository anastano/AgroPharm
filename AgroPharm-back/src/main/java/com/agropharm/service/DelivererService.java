package com.agropharm.service;

import com.agropharm.domain.Address;
import com.agropharm.domain.Deliverer;
import com.agropharm.domain.Seller;
import com.agropharm.dto.RegistrationDTO;
import com.agropharm.repository.AddressRepository;
import com.agropharm.repository.DelivererRepository;
import com.agropharm.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class DelivererService {
    @Autowired
    private DelivererRepository delivererRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AddressRepository addressRepository;

    public Deliverer create(RegistrationDTO registrationDTO) {
        Deliverer deliverer = new Deliverer();
        deliverer.setFirstName(registrationDTO.firstName);
        deliverer.setLastName(registrationDTO.lastName);
        deliverer.setEmail(registrationDTO.email);
        deliverer.setPhoneNumber(registrationDTO.phoneNumber);
        deliverer.setPassword(registrationDTO.password);
        deliverer.setEnabled(true);

        Address address = new Address();
        address.setStreet(registrationDTO.street);
        address.setStreetNumber(registrationDTO.streetNumber);
        address.setCity(registrationDTO.city);
        address.setCountry(registrationDTO.country);
        address.setPostalCode(registrationDTO.postalCode);
        addressRepository.save(address);

        deliverer.setAddress(address);
        deliverer.setLastPasswordResetDate(new Timestamp(new Date().getTime()));
        deliverer.setRole(roleRepository.findByName("DELIVERER"));
        return delivererRepository.save(deliverer);
    }

}
