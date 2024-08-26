package com.agropharm.service;

import com.agropharm.domain.Order;
import com.agropharm.repository.OrderItemRepository;
import com.agropharm.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    public Set<Order> getAll(){
        return new HashSet<>(orderRepository.findAll());
    }

}
