package com.agropharm.service;

import com.agropharm.domain.*;
import com.agropharm.domain.enums.OrderStatus;
import com.agropharm.dto.OrderItemDTO;
import com.agropharm.dto.OrderRequestDTO;
import com.agropharm.repository.*;
import org.aspectj.weaver.ast.Or;
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

    public Order getById(Integer id){
        return orderRepository.getById(id);
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

    public void assignDeliverer(Integer orderId, User deliverer) throws Exception {
        Optional<Order> orderDB = orderRepository.findById(orderId);
        if (!orderDB.isPresent()) {
            throw new Exception("Order not found");
        }
        Order order = orderDB.get();
        order.setDeliverer(deliverer);
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
        User client = userRepository.findByEmail(orderRequest.getClient().getEmail());
        order.setClient(client);

        Address address;
        if (orderRequest.getAddress() != null) {
            Address newAddress = new Address();
            newAddress.setStreet(orderRequest.getAddress().getStreet());
            newAddress.setStreetNumber(orderRequest.getAddress().getStreetNumber());
            newAddress.setCity(orderRequest.getAddress().getCity());
            newAddress.setCountry(orderRequest.getAddress().getCountry());
            newAddress.setPostalCode(orderRequest.getAddress().getPostalCode());
            address = addressRepository.save(newAddress);
        } else {
            address = addressRepository.findById(client.getAddress().getId())
                    .orElseThrow(() -> new RuntimeException("Default address not found"));
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
