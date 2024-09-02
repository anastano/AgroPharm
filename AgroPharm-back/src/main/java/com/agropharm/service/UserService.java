package com.agropharm.service;

import com.agropharm.domain.Client;
import com.agropharm.domain.Order;
import com.agropharm.domain.User;
import com.agropharm.repository.ClientRepository;
import com.agropharm.repository.UserRepository;
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
}
