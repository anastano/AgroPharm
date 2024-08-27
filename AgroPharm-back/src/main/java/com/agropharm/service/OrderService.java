package com.agropharm.service;

import com.agropharm.domain.Order;
import com.agropharm.domain.enums.OrderStatus;
import com.agropharm.repository.OrderItemRepository;
import com.agropharm.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
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

    public void updateOrderStatus(Integer orderId, OrderStatus orderStatus) throws Exception {
        Optional<Order> orderDB = orderRepository.findById(orderId);
        if (!orderDB.isPresent()) {
            throw new Exception("Order not found");
        }
        Order order = orderDB.get();
        order.setStatus(orderStatus);
        orderRepository.save(order);
    }


}
