package com.agropharm.service;

import com.agropharm.domain.Address;
import com.agropharm.domain.Order;
import com.agropharm.domain.OrderItem;
import com.agropharm.domain.Product;
import com.agropharm.domain.enums.OrderStatus;
import com.agropharm.dto.OrderItemDTO;
import com.agropharm.dto.OrderRequestDTO;
import com.agropharm.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    UserRepository userRepository;

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

    public Set<Order> getAllOrdersByClientId(Integer clientId) {
        return orderRepository.findAllByClientId(clientId);
    }

    @Transactional
    public Order createOrder(OrderRequestDTO orderRequest) {
        Order order = new Order();
        order.setDate(new Timestamp(System.currentTimeMillis()));
        order.setStatus(OrderStatus.CREATED);
        order.setClient(userRepository.findByEmail(orderRequest.getClient().getEmail()));

        //Address address = addressRepository.getById(1);
        Address address = addressRepository.getById(orderRequest.getAddress().getId());

        if (address.getId() == null) {
            address = addressRepository.save(address);
        } else {
            address = addressRepository.findById(address.getId())
                    .orElseThrow(() -> new RuntimeException("Address not found"));
        }
        order.setAddress(address);

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDTO itemDTO : orderRequest.getOrderItems()) {
            OrderItem item = new OrderItem();
            item.setQuantity(itemDTO.getQuantity());

            Product product = productRepository.findById(itemDTO.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            item.setProduct(product);

            item.setOrder(order);

            orderItemRepository.save(item);
            orderItems.add(item);
        }
        order.setOrderItems(orderItems);
        System.out.println("\n\n ORDERAAAA \n" + order);

        return orderRepository.save(order);
    }

}
